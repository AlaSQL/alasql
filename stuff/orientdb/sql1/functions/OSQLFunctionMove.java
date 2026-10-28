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
import com.orientechnologies.common.util.OCallable;
import com.orientechnologies.orient.core.command.OCommandContext;
import com.orientechnologies.orient.core.db.ODatabaseDocumentInternal;
import com.orientechnologies.orient.core.db.ODatabaseRecordThreadLocal;
import com.orientechnologies.orient.core.db.record.OIdentifiable;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.record.impl.ODocumentInternal;
import com.orientechnologies.orient.core.serialization.serializer.OStringSerializerHelper;
import com.orientechnologies.orient.core.sql.OSQLEngine;
import com.orientechnologies.orient.core.sql.functions.OSQLFunctionConfigurableAbstract;
import com.orientechnologies.orient.graph.sql.OGraphCommandExecutorSQLFactory;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Hi-level function to move inside a graph. Return the incoming connections. If the current element is a vertex, then will be
 * returned edges otherwise vertices.
 * 
 * @author Luca Garulli (l.garulli--at--orientechnologies.com)
 * 
 */
public abstract class OSQLFunctionMove extends OSQLFunctionConfigurableAbstract {
  public static final String NAME = "move";

  public OSQLFunctionMove() {
    super(NAME, 1, 2);
  }

  public OSQLFunctionMove(final String iName, final int iMin, final int iMax) {
    super(iName, iMin, iMax);
  }

  protected abstract Object move(final OrientBaseGraph graph, final OIdentifiable iRecord, final String[] iLabels);

  public String getSyntax() {
    return "Syntax error: " + name + "([<labels>])";
  }

  public Object execute(final Object iThis, final OIdentifiable iCurrentRecord, final Object iCurrentResult,
      final Object[] iParameters, final OCommandContext iContext) {
    final OModifiableBoolean shutdownFlag = new OModifiableBoolean();
    ODatabaseDocumentInternal curDb = ODatabaseRecordThreadLocal.INSTANCE.get();
    final OrientBaseGraph graph = OGraphCommandExecutorSQLFactory.getGraph(false, shutdownFlag);
    try {
      final String[] labels;
      if (iParameters != null && iParameters.length > 0 && iParameters[0] != null)
        labels = OMultiValue.array(iParameters, String.class, new OCallable<Object, Object>() {

          @Override
          public Object call(final Object iArgument) {
            return OStringSerializerHelper.getStringContent(iArgument);
          }
        });
      else
        labels = null;

      return OSQLEngine.foreachRecord(new OCallable<Object, OIdentifiable>() {
        @Override
        public Object call(final OIdentifiable iArgument) {
          return move(graph, iArgument, labels);
        }
      }, iThis, iContext);
    } finally {
      if (shutdownFlag.getValue())
        graph.shutdown(false);
      ODatabaseRecordThreadLocal.INSTANCE.set(curDb);
    }
  }

  protected Object v2v(final OrientBaseGraph graph, final OIdentifiable iRecord, final Direction iDirection, final String[] iLabels) {
    final ODocument rec = iRecord.getRecord();

    if (ODocumentInternal.getImmutableSchemaClass(rec) != null)
      if (ODocumentInternal.getImmutableSchemaClass(rec).isSubClassOf(OrientVertexType.CLASS_NAME)) {
        // VERTEX
        final OrientVertex vertex = graph.getVertex(rec);
        if (vertex != null)
          return vertex.getVertices(iDirection, iLabels);
      }

    return null;
  }

  protected Object v2e(final OrientBaseGraph graph, final OIdentifiable iRecord, final Direction iDirection, final String[] iLabels) {
    final ODocument rec = iRecord.getRecord();

    if (ODocumentInternal.getImmutableSchemaClass(rec) != null)
      if (ODocumentInternal.getImmutableSchemaClass(rec).isSubClassOf(OrientVertexType.CLASS_NAME)) {
        // VERTEX
        final OrientVertex vertex = graph.getVertex(rec);
        if (vertex != null)
          return vertex.getEdges(iDirection, iLabels);
      }

    return null;
  }

  protected Object e2v(final OrientBaseGraph graph, final OIdentifiable iRecord, final Direction iDirection, final String[] iLabels) {
    final ODocument rec = iRecord.getRecord();

    if (ODocumentInternal.getImmutableSchemaClass(rec) != null)
      if (ODocumentInternal.getImmutableSchemaClass(rec).isSubClassOf(OrientEdgeType.CLASS_NAME)) {
        // EDGE
        final OrientEdge edge = graph.getEdge(rec);
        if (edge != null) {
          if (Direction.BOTH.equals(iDirection)) {
            Set<Vertex> result = new HashSet<Vertex>();
            result.add(edge.getVertex(Direction.OUT));
            result.add(edge.getVertex(Direction.IN));
            return result;
          } else {
            final OrientVertex out = (OrientVertex) edge.getVertex(iDirection);
            return out;
          }
        }
      }

    return null;
  }
}
