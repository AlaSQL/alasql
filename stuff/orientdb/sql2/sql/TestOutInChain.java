package com.orientechnologies.orient.graph.sql;

import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientGraphNoTx;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class TestOutInChain {

  @BeforeClass
  public static void before() {
    // generate schema
    OrientGraphNoTx graph = new OrientGraphNoTx("memory:" + TestOutInChain.class.getSimpleName(), "admin", "admin");
    graph.command(new OCommandSQL("create class User extends V")).execute();
    graph.command(new OCommandSQL("create class Car extends V")).execute();
    graph.command(new OCommandSQL("create class Owns extends E")).execute();
    graph.shutdown();
  }

  @Test
  public void t() {
    OrientGraph graph = new OrientGraph("memory:" + TestOutInChain.class.getSimpleName(), "admin", "admin");

    Vertex vUser = graph.addVertex("class:User");
    Vertex vCar = graph.addVertex("class:Car");
    graph.addEdge("class:Owns", vUser, vCar, null);

    graph.commit();

    Iterable<Vertex> res = graph.command(new OCommandSQL("select expand( out('Owns') ) from User")).execute();
    assertTrue(res.iterator().hasNext());
    assertEquals("Car", res.iterator().next().getProperty("@class").toString());

    Iterable<Vertex> resEdge = graph.command(new OCommandSQL("select expand( inE('Owns') ) from Car")).execute();
    assertTrue(resEdge.iterator().hasNext());

    // when out('Owns') is executed we have Car vertex (see above)
    // after that inE('Owns') should return Owns edge (see above)
    // but test fails
    resEdge = graph.command(new OCommandSQL("select expand( out('Owns').inE('Owns') ) from User")).execute();
    assertTrue(resEdge.iterator().hasNext());// assertion error here
		graph.shutdown();
  }
}
