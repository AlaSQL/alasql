package com.orientechnologies.orient.graph.sql.functions;

import com.orientechnologies.orient.core.command.OBasicCommandContext;
import com.orientechnologies.orient.core.id.ORID;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class OSQLFunctionShortestPathTest {

  private OrientGraph              graph;
  private Vertex                   v1;
  private Vertex                   v2;
  private Vertex                   v3;
  private Vertex                   v4;
  private OSQLFunctionShortestPath function;

  @Before
  public void setUp() throws Exception {
    setUpDatabase();

    function = new OSQLFunctionShortestPath();
  }

  @After
  public void tearDown() throws Exception {
    graph.shutdown();
  }

  private void setUpDatabase() {
    graph = new OrientGraph("memory:OSQLFunctionShortestPath");

    v1 = graph.addVertex(null);
    v2 = graph.addVertex(null);
    v3 = graph.addVertex(null);
    v4 = graph.addVertex(null);

    v1.setProperty("node_id", "A");
    v2.setProperty("node_id", "B");
    v3.setProperty("node_id", "C");
    v4.setProperty("node_id", "D");

    Edge e1 = graph.addEdge(null, v1, v2, "Edge1");
    Edge e2 = graph.addEdge(null, v2, v3, "Edge1");
    Edge e3 = graph.addEdge(null, v1, v3, "Edge2");
    Edge e4 = graph.addEdge(null, v3, v4, "Edge1");
    graph.commit();
  }

  @Test
  public void testExecute() throws Exception {
    final List<ORID> result = function.execute(null, null, null, new Object[] { v1, v4 }, new OBasicCommandContext());

    assertEquals(3, result.size());
    assertEquals(v1.getId(), result.get(0));
    assertEquals(v3.getId(), result.get(1));
    assertEquals(v4.getId(), result.get(2));
  }

  @Test
  public void testExecuteOnlyEdge1() throws Exception {
    final List<ORID> result = function
        .execute(null, null, null, new Object[] { v1, v4, null, "Edge1" }, new OBasicCommandContext());

    assertEquals(4, result.size());
    assertEquals(v1.getId(), result.get(0));
    assertEquals(v2.getId(), result.get(1));
    assertEquals(v3.getId(), result.get(2));
    assertEquals(v4.getId(), result.get(3));
  }


}
