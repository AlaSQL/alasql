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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;

import com.orientechnologies.orient.core.command.OCommandContext;
import com.orientechnologies.orient.core.db.ODatabaseRecordThreadLocal;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.db.record.OIdentifiable;
import com.orientechnologies.orient.core.metadata.schema.OClass;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.record.impl.ODocumentInternal;
import com.orientechnologies.orient.core.sql.functions.OSQLFunctionAbstract;
import com.orientechnologies.orient.graph.gremlin.OGremlinHelper;
import com.tinkerpop.blueprints.impls.orient.OrientBaseGraph;
import com.tinkerpop.blueprints.impls.orient.OrientEdge;
import com.tinkerpop.blueprints.impls.orient.OrientElementIterable;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

/**
 * Executes a GREMLIN expression as function of SQL engine.
 * 
 * @author Luca Garulli (l.garulli--at--orientechnologies.com)
 * 
 */
public class OSQLFunctionGremlin extends OSQLFunctionAbstract {
  public static final String NAME = "gremlin";
  private List<Object>       result;

  public OSQLFunctionGremlin() {
    super(NAME, 1, 1);
  }

  public Object execute(Object iThis, final OIdentifiable iCurrentRecord, Object iCurrentResult, final Object[] iParams,
      final OCommandContext iContext) {
    if (!(iCurrentRecord instanceof ODocument))
      // NOT DOCUMENT OR GRAPHDB? IGNORE IT
      return null;

    final ODatabaseDocumentTx db = OGremlinHelper.getGraphDatabase(ODatabaseRecordThreadLocal.INSTANCE.get());

    result = new ArrayList<Object>();

    OGremlinHelper.execute(db, (String) iParams[0], null, (Map) iContext.getVariables(), result,
        new OGremlinHelper.OGremlinCallback() {

          @Override
          public boolean call(ScriptEngine iEngine, OrientBaseGraph iGraph) {
            if (iCurrentRecord == null || !(iCurrentRecord instanceof ODocument))
              return false;

            final ODocument document = (ODocument) iCurrentRecord;
            OClass clazz =ODocumentInternal.getImmutableSchemaClass(document);
            if (clazz != null && clazz.isSubClassOf("E")) {
              // EDGE TYPE, CREATE THE BLUEPRINTS'S WRAPPER
              OrientEdge graphElement = (OrientEdge) new OrientElementIterable<OrientEdge>(iGraph, Arrays
                  .asList(new ODocument[] { document })).iterator().next();
              iEngine.getBindings(ScriptContext.ENGINE_SCOPE).put("current", graphElement);
              iEngine.getBindings(ScriptContext.ENGINE_SCOPE).put("it", graphElement); // FRAMES LIKE SYNTAX

            } else {

              // VERTEX TYPE, CREATE THE BLUEPRINTS'S WRAPPER
              OrientVertex graphElement = (OrientVertex) new OrientElementIterable<OrientVertex>(iGraph, Arrays
                  .asList(new ODocument[] { document })).iterator().next();
              iEngine.getBindings(ScriptContext.ENGINE_SCOPE).put("current", graphElement);
              iEngine.getBindings(ScriptContext.ENGINE_SCOPE).put("it", graphElement); // FRAMES LIKE SYNTAX
            }

            return true;
          }
        }, null);

    return result;
  }

  @Override
  public boolean aggregateResults() {
    return false;
  }

  public String getSyntax() {
    return "gremlin(<gremlin-expression>)";
  }

  @Override
  public boolean filterResult() {
    return true;
  }

  @Override
  public Object getResult() {
    return result;
  }
}
