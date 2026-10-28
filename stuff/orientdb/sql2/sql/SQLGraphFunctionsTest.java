/*
 * Copyright 2010-2012 Luca Garulli (l.garulli--at--orientechnologies.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.orientechnologies.orient.graph.sql;

import java.util.List;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.id.ORecordId;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;
import com.orientechnologies.orient.graph.gremlin.OGremlinHelper;
import com.tinkerpop.blueprints.impls.orient.OrientEdge;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

@RunWith(JUnit4.class)
public class SQLGraphFunctionsTest {
  private static OrientGraph graph;

  public SQLGraphFunctionsTest() {
  }

	@BeforeClass
  public static void beforeClass() {
    String url = "memory:" + SQLGraphFunctionsTest.class.getSimpleName();
    graph = new OrientGraph(url);

    OrientVertex v1 = graph.addVertex(null, "name", "A");
    OrientVertex v2 = graph.addVertex(null, "name", "B");
    OrientVertex v3 = graph.addVertex(null, "name", "C");
    OrientVertex v4 = graph.addVertex(null, "name", "D-D");
    OrientVertex v5 = graph.addVertex(null, "name", "E");
    OrientVertex v6 = graph.addVertex(null, "name", "F");

    v1.addEdge("label", v2, null, null, "weight", 10);
    v2.addEdge("label", v3, null, null, "weight", 20);
    v3.addEdge("label", v4, null, null, "weight", 30);
    v4.addEdge("label", v5, null, null, "weight", 40);
    v5.addEdge("label", v6, null, null, "weight", 50);
    v5.addEdge("label", v1, null, null, "weight", 100);

    graph.commit();
  }


	@AfterClass
  public static void afterClass() {
    graph.shutdown();
  }

  @Test
  public void checkDijkstra() {
    String subquery = "select $current, $target, Dijkstra($current, $target , 'weight') as path from V let $target = ( select from V where name = \'C\' ) where 1 > 0";
    Iterable<OrientVertex> result = graph.command(new OSQLSynchQuery<OrientVertex>(subquery)).execute();
    Assert.assertTrue(result.iterator().hasNext());

    for (OrientVertex d : result) {
      System.out.println("Shortest path from " + ((OrientVertex) d.getProperty("$current")).getProperty("name") + " and "
          + ((Iterable<OrientVertex>) d.getProperty("$target")).iterator().next().getProperty("name") + " is: "
          + d.getProperty("path"));
    }
  }

  @Test
  public void checkMinusInString() {
    Iterable<OrientVertex> result = graph.command(new OCommandSQL("select expand( out()[name='D-D'] ) from V")).execute();
    Assert.assertTrue(result.iterator().hasNext());
  }

  @Test
  public void testGremlinTraversal() {
    OGremlinHelper.global().create();

    graph.setAutoStartTx(false);
    graph.commit();

    graph.command(new OCommandSQL("create class tc1 extends V")).execute();
    graph.command(new OCommandSQL("create class edge1 extends E")).execute();

    graph.setAutoStartTx(true);

    OrientVertex v1 = graph.command(new OCommandSQL("create vertex tc1 SET id='1', name='name1'")).execute();
    OrientVertex v2 = graph.command(new OCommandSQL("create vertex tc1 SET id='2', name='name2'")).execute();

    graph.commit();

    int tc1Id = graph.getRawGraph().getClusterIdByName("tc1");
    int edge1Id = graph.getRawGraph().getClusterIdByName("edge1");

    Iterable<OrientEdge> e = graph.command(
        new OCommandSQL("create edge edge1 from #" + tc1Id + ":0 to #" + tc1Id + ":1 set f='fieldValue';")).execute();
    graph.commit();

    List<ODocument> result = graph.getRawGraph().query(new OSQLSynchQuery<ODocument>("select gremlin('current.outE') from tc1"));

    Assert.assertEquals(2, result.size());

    ODocument firstItem = result.get(0);
    List<OrientEdge> firstResult = firstItem.field("gremlin");

    Assert.assertEquals(1, firstResult.size());
    OrientEdge edge = firstResult.get(0);
    Assert.assertEquals(new ORecordId(edge1Id, 0), (ORID) edge.getId());

    ODocument secondItem = result.get(1);
    List<OrientEdge> secondResult = secondItem.field("gremlin");
    Assert.assertTrue(secondResult.isEmpty());

    OGremlinHelper.global().destroy();
  }
}
