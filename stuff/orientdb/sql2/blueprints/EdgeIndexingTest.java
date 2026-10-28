package com.orientechnologies.orient.graph.blueprints;

import com.orientechnologies.orient.core.metadata.schema.OClass;
import com.orientechnologies.orient.core.metadata.schema.OType;
import com.orientechnologies.orient.core.storage.ORecordDuplicatedException;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import org.junit.Assert;
import org.junit.Test;

/**
 * @author Andrey Lomakin (a.lomakin-at-orientechnologies.com)
 * @since 1/30/14
 */
public class EdgeIndexingTest {

  /**
   * Test that "in_vertex" has edges to only single "out_vertex" but we may have several edges to single "out_vertex".
   */
  @Test
  public void testOutLinksUniqueness() {
    final String url = "memory:" + this.getClass().getSimpleName();
    OrientGraph graph = new OrientGraph(url);
    graph.drop();

    graph = new OrientGraph(url);
    graph.setUseLightweightEdges(true);
    graph.createEdgeType("link");
    graph.setAutoStartTx(false);

    OClass outVertexType = graph.createVertexType("IndexedOutVertex");
    outVertexType.createProperty("out_link", OType.LINKBAG);
    outVertexType.createIndex("uniqueLinkIndex", "unique", "out_link");

    graph.setAutoStartTx(true);

    Vertex vertexOutOne = graph.addVertex("class:IndexedOutVertex");

    Vertex vertexInOne = graph.addVertex(null);
    Vertex vertexInTwo = graph.addVertex(null);

    vertexOutOne.addEdge("link", vertexInOne);
    vertexOutOne.addEdge("link", vertexInTwo);
    graph.commit();

    Vertex vertexOutTwo = graph.addVertex("class:IndexedOutVertex");
    vertexOutTwo.addEdge("link", vertexInTwo);

    try {
      graph.commit();

      // in vertex can be linked by only one out vertex.
      Assert.fail();
    } catch (ORecordDuplicatedException e) {
    }

    graph.drop();
  }

  /**
   * Test that "in_vertex" has edges to only single "out_vertex" but we may have several edges to single "out_vertex".
   */
  @Test
  public void testOutLinksUniquenessTwo() {
    final String url = "memory:" + this.getClass().getSimpleName();
    OrientGraph graph = new OrientGraph(url);
    graph.drop();

    graph = new OrientGraph(url);
    graph.setUseLightweightEdges(true);
    graph.createEdgeType("link");
    graph.setAutoStartTx(false);

    OClass outVertexType = graph.createVertexType("IndexedOutVertex");
    outVertexType.createProperty("out_link", OType.LINKBAG);
    outVertexType.createIndex("uniqueLinkIndex", "unique", "out_link");

    graph.setAutoStartTx(true);

    Vertex vertexOutOne = graph.addVertex("class:IndexedOutVertex");

    Vertex vertexInOne = graph.addVertex(null);
    Vertex vertexInTwo = graph.addVertex(null);

    vertexOutOne.addEdge("link", vertexInOne);
    vertexOutOne.addEdge("link", vertexInTwo);

    Vertex vertexOutTwo = graph.addVertex("class:IndexedOutVertex");
    vertexOutTwo.addEdge("link", vertexInTwo);

    try {
      graph.commit();

      // in vertex can be linked by only one out vertex.
      Assert.fail();
    } catch (ORecordDuplicatedException e) {
    }

    graph.drop();
  }

  /**
   * Test that "out_vertex" has edges to only single "in_vertex" but we may have several edges to single "in_vertex".
   */
  @Test
  public void testOutLinksUniquenessThree() {
    final String url = "memory:" + this.getClass().getSimpleName();

    OrientGraph graph = new OrientGraph(url, "admin", "admin", false);
    graph.drop();

    graph = new OrientGraph(url, "admin", "admin", false);
    graph.setUseLightweightEdges(true);

    graph.createEdgeType("link");

    OClass inVertexType = graph.createVertexType("IndexedInVertex");
    inVertexType.createProperty("in_link", OType.LINKBAG);
    inVertexType.createIndex("uniqueLinkIndex", "unique", "in_link");

    graph.setAutoStartTx(true);

    Vertex vertexOutOne = graph.addVertex(null);

    Vertex vertexInOne = graph.addVertex("class:IndexedInVertex");
    Vertex vertexInTwo = graph.addVertex("class:IndexedInVertex");

    vertexOutOne.addEdge("link", vertexInOne);
    vertexOutOne.addEdge("link", vertexInTwo);

    try {
      graph.commit();
      Assert.fail();
      // in vertex can be linked by only one out vertex.
    } catch (ORecordDuplicatedException e) {
    }

    graph.drop();
  }

  /**
   * Test that "out_vertex" has singe and only single edge to "in_vertex". This only possible if edges are not lightweight edges.
   */
  @Test
  public void testOutLinksUniquenessFour() {
    final String url = "memory:" + this.getClass().getSimpleName();

    OrientGraph graph = new OrientGraph(url, "admin", "admin", false);
    graph.drop();

    graph = new OrientGraph(url, "admin", "admin", false);

    OClass edgeType = graph.createEdgeType("link");

    edgeType.createProperty("in", OType.LINK);
    edgeType.createProperty("out", OType.LINK);
    edgeType.createIndex("uniqueLinkIndex", "unique", "in", "out");

    graph.setAutoStartTx(true);

    Vertex vertexOutOne = graph.addVertex(null);

    Vertex vertexInOne = graph.addVertex(null);
    Vertex vertexInTwo = graph.addVertex(null);

    vertexOutOne.addEdge("link", vertexInOne);
    vertexOutOne.addEdge("link", vertexInTwo);
    vertexOutOne.addEdge("link", vertexInOne);

    try {
      graph.commit();
      Assert.fail();
      // in vertex can be linked by only one out vertex.
    } catch (ORecordDuplicatedException e) {
    }

    graph.drop();
  }
}
