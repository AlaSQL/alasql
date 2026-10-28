/*
 *
 *  *  Copyright 2014 Orient Technologies LTD (info(at)orientechnologies.com)
 *  *
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  *  you may not use this file except in compliance with the License.
 *  *  You may obtain a copy of the License at
 *  *
 *  *       http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  *  distributed under the License is distributed on an "AS IS" BASIS,
 *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *  See the License for the specific language governing permissions and
 *  *  limitations under the License.
 *  *
 *  * For more information: http://www.orientechnologies.com
 *
 */
package com.orientechnologies.orient.graph.sql.functions;

import com.orientechnologies.common.collection.OMultiValue;
import com.orientechnologies.common.types.OModifiableBoolean;
import com.orientechnologies.orient.core.command.OCommandContext;
import com.orientechnologies.orient.core.db.ODatabaseDocumentInternal;
import com.orientechnologies.orient.core.db.ODatabaseRecordThreadLocal;
import com.orientechnologies.orient.core.db.record.OIdentifiable;
import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.record.ORecord;
import com.orientechnologies.orient.core.sql.OSQLHelper;
import com.orientechnologies.orient.core.sql.functions.math.OSQLFunctionMathAbstract;
import com.orientechnologies.orient.graph.sql.OGraphCommandExecutorSQLFactory;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientBaseGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

import java.util.*;

/**
 * Shortest path algorithm to find the shortest path from one node to another node in a directed graph.
 * 
 * @author Luca Garulli (l.garulli--at--orientechnologies.com)
 * 
 */
public class OSQLFunctionShortestPath extends OSQLFunctionMathAbstract {
  public static final String   NAME     = "shortestPath";

  protected static final float DISTANCE = 1f;

  public OSQLFunctionShortestPath() {
    super(NAME, 2, 4);
  }

  public List<ORID> execute(Object iThis, final OIdentifiable iCurrentRecord, Object iCurrentResult, final Object[] iParams,
      final OCommandContext iContext) {
    final OModifiableBoolean shutdownFlag = new OModifiableBoolean();
    ODatabaseDocumentInternal curDb = ODatabaseRecordThreadLocal.INSTANCE.get();
    final OrientBaseGraph graph = OGraphCommandExecutorSQLFactory.getGraph(false, shutdownFlag);
    try {
      final ORecord record = (ORecord) (iCurrentRecord != null ? iCurrentRecord.getRecord() : null);

      Object source = iParams[0];
      if (OMultiValue.isMultiValue(source)) {
        if (OMultiValue.getSize(source) > 1)
          throw new IllegalArgumentException("Only one sourceVertex is allowed");
        source = OMultiValue.getFirstValue(source);
      }
      OrientVertex sourceVertex = graph.getVertex(OSQLHelper.getValue(source, record, iContext));

      Object dest = iParams[1];
      if (OMultiValue.isMultiValue(dest)) {
        if (OMultiValue.getSize(dest) > 1)
          throw new IllegalArgumentException("Only one destinationVertex is allowed");
        dest = OMultiValue.getFirstValue(dest);
      }
      OrientVertex destinationVertex = graph.getVertex(OSQLHelper.getValue(dest, record, iContext));

      if (sourceVertex.equals(destinationVertex)) {
        final List<ORID> result = new ArrayList<ORID>(1);
        result.add(destinationVertex.getIdentity());
        return result;
      }

      Direction direction = Direction.BOTH;
      if (iParams.length > 2 && iParams[2] != null) {
        direction = Direction.valueOf(iParams[2].toString().toUpperCase());
      }
      Object edgeType = null;
      if (iParams.length > 3) {
        edgeType = iParams[3];
      }

      final ArrayDeque<OrientVertex> queue = new ArrayDeque<OrientVertex>();
      final Set<ORID> visited = new HashSet<ORID>();
      final Map<ORID, ORID> previouses = new HashMap<ORID, ORID>();

      queue.add(sourceVertex);
      visited.add(sourceVertex.getIdentity());

      OrientVertex current;
      while (!queue.isEmpty()) {
        current = queue.poll();

        Iterable<Vertex> neighbors;
        if (edgeType == null) {
          neighbors = current.getVertices(direction);
        } else {
          neighbors = current.getVertices(direction, new String[] { "" + edgeType });
        }
        for (Vertex neighbor : neighbors) {
          final OrientVertex v = (OrientVertex) neighbor;
          final ORID neighborIdentity = v.getIdentity();

          if (!visited.contains(neighborIdentity)) {

            previouses.put(neighborIdentity, current.getIdentity());

            if (destinationVertex.equals(neighbor))
              return computePath(previouses, neighborIdentity);

            queue.offer(v);
            visited.add(neighborIdentity);
          }

        }
      }

      return new ArrayList<ORID>();
    } finally {
      if (shutdownFlag.getValue())
        graph.shutdown(false);
      ODatabaseRecordThreadLocal.INSTANCE.set(curDb);
    }
  }

  public String getSyntax() {
    return "shortestPath(<sourceVertex>, <destinationVertex>, [<direction>, [ <edgeTypeAsString> ]])";
  }

  private List<ORID> computePath(final Map<ORID, ORID> distances, final ORID neighbor) {
    final List<ORID> result = new ArrayList<ORID>();

    ORID current = neighbor;
    while (current != null) {
      result.add(0, current);

      current = distances.get(current);
    }

    return result;
  }
}
