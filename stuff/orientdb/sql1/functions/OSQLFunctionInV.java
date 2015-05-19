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

import com.orientechnologies.orient.core.db.record.OIdentifiable;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.impls.orient.OrientBaseGraph;

/**
 * Gets the incoming Vertex of current Edge.
 * 
 * @author Luca Garulli (l.garulli--at--orientechnologies.com)
 * 
 */
public class OSQLFunctionInV extends OSQLFunctionMove {
  public static final String NAME = "inV";

  public OSQLFunctionInV() {
    super(NAME, 0, -1);
  }

  @Override
  protected Object move(final OrientBaseGraph graph, final OIdentifiable iRecord, final String[] iLabels) {
    return e2v(graph, iRecord, Direction.IN, iLabels);
  }
}
