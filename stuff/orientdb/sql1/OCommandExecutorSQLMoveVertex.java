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
package com.orientechnologies.orient.graph.sql;

import com.orientechnologies.common.types.OModifiableBoolean;
import com.orientechnologies.orient.core.command.OCommandDistributedReplicateRequest;
import com.orientechnologies.orient.core.command.OCommandRequest;
import com.orientechnologies.orient.core.command.OCommandRequestText;
import com.orientechnologies.orient.core.db.document.ODatabaseDocument;
import com.orientechnologies.orient.core.db.record.OIdentifiable;
import com.orientechnologies.orient.core.exception.OCommandExecutionException;
import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.metadata.schema.OClass;
import com.orientechnologies.orient.core.metadata.schema.OType;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.OCommandExecutorSQLSetAware;
import com.orientechnologies.orient.core.sql.OCommandParameters;
import com.orientechnologies.orient.core.sql.OCommandSQLParsingException;
import com.orientechnologies.orient.core.sql.OSQLEngine;
import com.orientechnologies.orient.core.sql.OSQLHelper;
import com.orientechnologies.orient.core.sql.functions.OSQLFunctionRuntime;
import com.tinkerpop.blueprints.impls.orient.OrientGraphNoTx;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * SQL MOVE VERTEX command.
 * 
 * @author Luca Garulli
 * 
 */
public class OCommandExecutorSQLMoveVertex extends OCommandExecutorSQLSetAware implements OCommandDistributedReplicateRequest {
  public static final String            NAME          = "MOVE VERTEX";
  private static final String           KEYWORD_MERGE = "MERGE";
  private String                        source        = null;
  private String                        clusterName;
  private String                        className;
  private OClass                        clazz;
  private LinkedHashMap<String, Object> fields;
  private ODocument                     merge;

  @SuppressWarnings("unchecked")
  public OCommandExecutorSQLMoveVertex parse(final OCommandRequest iRequest) {
    final ODatabaseDocument database = getDatabase();

    init((OCommandRequestText) iRequest);

    parserRequiredKeyword("MOVE");
    parserRequiredKeyword("VERTEX");

    source = parserRequiredWord(false, "Syntax error", " =><,\r\n");
    if (source == null)
      throw new OCommandSQLParsingException("Cannot find source");

    parserRequiredKeyword("TO");

    String temp = parseOptionalWord(true);

    while (temp != null) {
      if (temp.startsWith("CLUSTER:")) {
        if (className != null)
          throw new OCommandSQLParsingException("Cannot define multiple sources. Found both cluster and class.");

        clusterName = temp.substring("CLUSTER:".length());
        if (database.getClusterIdByName(clusterName) == -1)
          throw new OCommandSQLParsingException("Cluster '" + clusterName + "' was not found");

      } else if (temp.startsWith("CLASS:")) {
        if (clusterName != null)
          throw new OCommandSQLParsingException("Cannot define multiple sources. Found both cluster and class.");

        className = temp.substring("CLASS:".length());

        clazz = database.getMetadata().getSchema().getClass(className);

        if (clazz == null)
          throw new OCommandSQLParsingException("Class '" + className + "' was not found");

      } else if (temp.equals(KEYWORD_SET)) {
        fields = new LinkedHashMap<String, Object>();
        parseSetFields(clazz, fields);

      } else if (temp.equals(KEYWORD_MERGE)) {
        merge = parseJSON();

      }

      temp = parserOptionalWord(true);
      if (parserIsEnded())
        break;
    }

    return this;
  }

  /**
   * Executes the command and return the ODocument object created.
   */
  public Object execute(final Map<Object, Object> iArgs) {
    if (className == null && clusterName == null)
      throw new OCommandExecutionException("Cannot execute the command because it has not been parsed yet");

    OModifiableBoolean shutdownGraph = new OModifiableBoolean();
    final OrientGraphNoTx graph = OGraphCommandExecutorSQLFactory.getGraphNoTx(shutdownGraph);
    try {
      final Set<OIdentifiable> sourceRIDs = OSQLEngine.getInstance().parseRIDTarget(graph.getRawGraph(), source, context, iArgs);

      // CREATE EDGES
      final List<ODocument> result = new ArrayList<ODocument>(sourceRIDs.size());

      for (OIdentifiable from : sourceRIDs) {
        final OrientVertex fromVertex = graph.getVertex(from);
        if (fromVertex == null)
          continue;

        final ORID oldVertex = fromVertex.getIdentity().copy();
        final ORID newVertex = fromVertex.moveTo(className, clusterName);

        final ODocument newVertexDoc = newVertex.getRecord();

        if (fields != null) {
          // EVALUATE FIELDS
          for (Entry<String, Object> f : fields.entrySet()) {
            if (f.getValue() instanceof OSQLFunctionRuntime)
              fields.put(f.getKey(), ((OSQLFunctionRuntime) f.getValue()).getValue(newVertex.getRecord(), null, context));
          }

          OSQLHelper.bindParameters(newVertexDoc, fields, new OCommandParameters(iArgs), context);
        }

        if (merge != null)
          newVertexDoc.merge(merge, true, false);

        // SAVE CHANGES
        newVertexDoc.save();

        // PUT THE MOVE INTO THE RESULT
        result.add(new ODocument().field("old", oldVertex, OType.LINK).field("new", newVertex, OType.LINK));
      }

      return result;
    } finally {
      if (shutdownGraph.getValue())
        graph.shutdown(false);
    }
  }

  @Override
  public String getSyntax() {
    return "MOVE VERTEX <source> TO <destination> [SET [<field>=<value>]* [,]] [MERGE <JSON>]";
  }
}
