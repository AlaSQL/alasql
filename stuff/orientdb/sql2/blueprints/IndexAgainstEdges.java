/*
 *
 *  * Copyright 2010-2014 Orient Technologies LTD (info(at)orientechnologies.com)
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package com.orientechnologies.orient.graph.blueprints;

import com.orientechnologies.orient.core.metadata.schema.OClass;
import com.orientechnologies.orient.core.metadata.schema.OType;
import com.tinkerpop.blueprints.impls.orient.OrientEdge;
import com.tinkerpop.blueprints.impls.orient.OrientEdgeType;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import org.junit.Test;

import static org.junit.Assert.assertFalse;

public class IndexAgainstEdges {

  public static final String URL = "memory:" + IndexAgainstEdges.class.getSimpleName();

  @Test
  public void indexes() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");
    try {
      if (g.getVertexType("Profile") == null)
        g.createVertexType("Profile");
      if (g.getEdgeType("Friend") == null) {
        final OrientEdgeType f = g.createEdgeType("Friend");
        f.createProperty("in", OType.LINK);
        f.createProperty("out", OType.LINK);
        f.createIndex("Friend.in_out", OClass.INDEX_TYPE.UNIQUE, "in", "out");

      }

      OrientVertex luca = g.addVertex("class:Profile", "name", "Luca");
      OrientVertex jay = g.addVertex("class:Profile", "name", "Jay");
      OrientEdge friend = (OrientEdge) luca.addEdge("Friend", jay);

      assertFalse(friend.isLightweight());

    } finally {
      g.shutdown();
    }
  }
}
