package com.orientechnologies.orient.graph.sql;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import com.orientechnologies.orient.core.sql.filter.OSQLPredicate;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

@RunWith(JUnit4.class)
public class VertexPredicateTest {

  private static OrientGraph  graph;

  private static OrientVertex luca;
  private static OrientVertex bill;
  private static OrientVertex jay;
  private static OrientVertex steve;

  @BeforeClass
  public static void setUp() throws Exception {
    graph = new OrientGraph("memory:" + VertexPredicateTest.class.getSimpleName());
    graph.createEdgeType("Friend");

    luca = graph.addVertex(null, "name", "Luca");
    bill = graph.addVertex(null, "name", "Bill");
    luca.addEdge("Friend", bill);

    jay = graph.addVertex(null, "name", "Jay");
    bill.addEdge("Friend", jay);

    steve = graph.addVertex(null, "name", "Steve");
    jay.addEdge("Friend", steve);

    // GRAPH IS: luca -> bill -> jay -> steve
  }

  @AfterClass
  public static void tearDown() throws Exception {
    graph.drop();
  }

  @Test
  public void testPredicate() throws Exception {
    Iterable<OrientVertex> p1 = (Iterable<OrientVertex>) luca.execute(new OSQLPredicate("out()"));
    Assert.assertTrue(p1.iterator().hasNext());
    Assert.assertEquals(p1.iterator().next(), bill);

    Iterable<OrientVertex> p2 = (Iterable<OrientVertex>) luca.execute(new OSQLPredicate("out().out('Friend')"));
    Assert.assertTrue(p2.iterator().hasNext());
    Assert.assertEquals(p2.iterator().next(), jay);

    Iterable<OrientVertex> p3 = (Iterable<OrientVertex>) luca.execute(new OSQLPredicate("out().out('Friend').out('Friend')"));
    Assert.assertTrue(p3.iterator().hasNext());
    Assert.assertEquals(p3.iterator().next(), steve);

  }
}
