package com.orientechnologies.orient.graph.sql.functions;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.orientechnologies.orient.core.command.OBasicCommandContext;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

public class OSQLFunctionDijkstraTest {

  private OrientGraph          graph;
  private Vertex               v1;
  private Vertex               v2;
  private Vertex               v3;
  private Vertex               v4;
  private OSQLFunctionDijkstra functionDijkstra;

  @Before
  public void setUp() throws Exception {
    setUpDatabase();

    functionDijkstra = new OSQLFunctionDijkstra();
  }

  @After
  public void tearDown() throws Exception {
    graph.shutdown();
  }

  private void setUpDatabase() {
    graph = new OrientGraph("memory:OSQLFunctionDijkstraTest");
		graph.createEdgeType("weight");

    v1 = graph.addVertex(null);
    v2 = graph.addVertex(null);
    v3 = graph.addVertex(null);
    v4 = graph.addVertex(null);

    v1.setProperty("node_id", "A");
    v2.setProperty("node_id", "B");
    v3.setProperty("node_id", "C");
    v4.setProperty("node_id", "D");

    Edge e1 = graph.addEdge(null, v1, v2, "weight");
    e1.setProperty("weight", 1.0f);

    Edge e2 = graph.addEdge(null, v2, v3, "weight");
    e2.setProperty("weight", 1.0f);
    Edge e3 = graph.addEdge(null, v1, v3, "weight");
    e3.setProperty("weight", 100.0f);
    Edge e4 = graph.addEdge(null, v3, v4, "weight");
    e4.setProperty("weight", 1.0f);
    graph.commit();
  }

  @Test
  public void testExecute() throws Exception {
    final List<OrientVertex> result = functionDijkstra.execute(null, null, null, new Object[] { v1, v4, "'weight'" },
        new OBasicCommandContext());

    assertEquals(4, result.size());
    assertEquals(v1, result.get(0));
    assertEquals(v2, result.get(1));
    assertEquals(v3, result.get(2));
    assertEquals(v4, result.get(3));
  }
}
