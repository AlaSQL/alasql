package com.orientechnologies.orient.graph.sql;

import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.tinkerpop.blueprints.impls.orient.OrientEdge;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class TestDeleteEdge {

  @Test
  public void t() {
    final OrientGraph graph = new OrientGraph("memory:" + TestDeleteEdge.class.getSimpleName(), "admin", "admin");

    for (int i = 0; i < 10; i++) {
      OrientVertex v1 = graph.addVertex("class:TestVertex");
      OrientVertex v2 = graph.addVertex("class:TestVertex");
      OrientVertex v3 = graph.addVertex("class:TestVertex");
      OrientVertex v4 = graph.addVertex("class:TestVertex");

      Map<String, Object> p1 = new HashMap<String, Object>();
      p1.put("based_on", "0001");
      OrientEdge e1 = v1.addEdge(null, v2, "TestEdge", null, p1);
      e1.save();

      Map<String, Object> p2 = new HashMap<String, Object>();
      p2.put("based_on", "0002");
      OrientEdge e2 = v3.addEdge(null, v4, "TestEdge", null, p2);
      e2.save();

      graph.commit();

      graph.command(new OCommandSQL("delete edge TestEdge where based_on = '0001'")).execute();

      Iterable<OrientVertex> edges = graph.command(new OCommandSQL("select count(*) from TestEdge where based_on = '0001'"))
          .execute();
      assertTrue(edges.iterator().hasNext());
      assertEquals(edges.iterator().next().getProperty("count"), 0l);
    }

    graph.shutdown();
  }
}
