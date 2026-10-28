package com.orientechnologies.orient.graph.blueprints;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.id.ORecordId;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientEdge;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientGraphQuery;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

public class BlueprintsTest {
  private static String      DB_URL = "memory:" + BlueprintsTest.class.getSimpleName();
  private static OrientGraph graph;

  public BlueprintsTest() {
  }

  @BeforeClass
  public static void before() {
    graph = new OrientGraph(DB_URL);
  }

  @AfterClass
  public static void after() {
    graph.drop();
    graph = null;
  }

  @Test
  public void testSubVertex() {
    if (graph.getVertexType("SubVertex") == null)
      graph.createVertexType("SubVertex");

    Vertex v = graph.addVertex("class:SubVertex");
    v.setProperty("key", "subtype");
    Assert.assertEquals(((OrientVertex) v).getRecord().getSchemaClass().getName(), "SubVertex");

    // TEST QUERY AGAINST SUB-TYPE IN TX
    Iterable<Vertex> vertices = ((OrientGraphQuery) graph.query()).labels("SubVertex").vertices();
    Assert.assertTrue(vertices.iterator().hasNext());
    Assert.assertEquals(vertices.iterator().next().getProperty("key"), "subtype");

    graph.commit();

    // TEST QUERY AGAINST SUB-TYPE NON IN TX
    vertices = ((OrientGraphQuery) graph.query()).labels("SubVertex").vertices();
    Assert.assertTrue(vertices.iterator().hasNext());
    Assert.assertEquals(vertices.iterator().next().getProperty("key"), "subtype");
  }

  @Test
  public void testSubEdge() {
    if (graph.getEdgeType("SubEdge") == null)
      graph.createEdgeType("SubEdge");
    if (graph.getVertexType("SubVertex") == null)
      graph.createVertexType("SubVertex");

    Vertex v1 = graph.addVertex("class:SubVertex");
    v1.setProperty("key", "subtype+subedge");
    Assert.assertEquals(((OrientVertex) v1).getRecord().getSchemaClass().getName(), "SubVertex");

    Vertex v2 = graph.addVertex("class:SubVertex");
    v2.setProperty("key", "subtype+subedge");
    Assert.assertEquals(((OrientVertex) v2).getRecord().getSchemaClass().getName(), "SubVertex");

    Edge e = graph.addEdge("class:SubEdge", v1, v2, null);
    e.setProperty("key", "subedge");
    Assert.assertEquals(((OrientEdge) e).getRecord().getSchemaClass().getName(), "SubEdge");

    graph.commit();
  }

  @Test
  public void testEdgePhysicalRemoval() {
    graph.command(new OCommandSQL("delete from e where name = 'forceCreationOfDocument'")).execute();

    Vertex v1 = graph.addVertex(null);
    Vertex v2 = graph.addVertex(null);
    OrientEdge e = graph.addEdge(null, v1, v2, "anyLabel");
    e.setProperty("key", "forceCreationOfDocument");

    Iterable<Edge> result = graph.command(new OSQLSynchQuery<Edge>("select from e where key = 'forceCreationOfDocument'"))
        .execute();
    Assert.assertTrue(result.iterator().hasNext());
    Assert.assertTrue(result.iterator().next() instanceof Edge);

    e.remove();
    graph.commit();

    result = graph.command(new OSQLSynchQuery<Edge>("select from e where key = 'forceCreationOfDocument'")).execute();
    Assert.assertFalse(result.iterator().hasNext());
  }

  @Test
  public void testQueryWithSpecialCharacters() {
    graph.setAutoStartTx(false);

    graph.addVertex(null).setProperty("name", "Jay");
    graph.addVertex(null).setProperty("name", "Smith's");
    graph.addVertex(null).setProperty("name", "Smith\"s");

    graph.commit(); // transaction not-reopened

    Assert.assertTrue(graph.getVertices("name", "Jay").iterator().hasNext());
    Assert.assertTrue(graph.getVertices("name", "Smith's").iterator().hasNext());
    Assert.assertTrue(graph.getVertices("name", "Smith\"s").iterator().hasNext());
  }

  @Test
  public void testInvalidVertexRID() {
    OrientVertex v = new OrientVertex(graph, new ORecordId("9:9999"));
    System.out.println(v);
  }

  @Test
  public void testInvalidEdgeRID() {
    try {
      OrientEdge e = graph.addEdge(null, new OrientVertex(graph, new ORecordId("9:9999")), new OrientVertex(graph, new ORecordId(
          "9:99999")), "E");
      Assert.assertTrue(false);
    } catch (IllegalArgumentException e) {
      Assert.assertTrue(true);
    }
  }

  @Test
  public void testSetEvenParams() {
    try {
      graph.addVertex(null, "name", "Luca", "surname");
      Assert.assertTrue(false);
    } catch (IllegalArgumentException e) {
      Assert.assertTrue(true);
    }
  }

  @Test
  public void testPersistentRIDAfterCommit() {
    Vertex v = graph.addVertex(null);
    v.setProperty("test", "value");
    graph.commit();
    // System.out.println(v.getId());
    Assert.assertTrue(((ORID) v.getId()).isPersistent());
  }
}
