package com.orientechnologies.orient.graph.blueprints;

import com.orientechnologies.orient.core.config.OGlobalConfiguration;
import com.orientechnologies.orient.server.OServer;
import com.orientechnologies.orient.server.OServerMain;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientGraphQuery;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

public class EdgeBug {

  private Vertex aVertex;
  private Vertex bVertex;
  private Vertex asubVertex;
  private Vertex bsubVertex;

  public static void main(String[] args) throws Exception {
    new EdgeBug().run();
  }

  public void run() throws Exception {
    OServer server = setupDatabase();
    try {
      setupClasses();
      populateDatabase();
      tryLabelQuery();
      runEdgeTest();
    } finally {
      server.shutdown();
    }
  }

  private OServer setupDatabase() throws Exception {
    OServer ret = OServerMain.create();
    ret.startup("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        + "<orient-server>"
        + "<network>"
        + "<protocols>"
        + "<protocol name=\"binary\" implementation=\"com.orientechnologies.orient.server.network.protocol.binary.ONetworkProtocolBinary\"/>"
        + "<protocol name=\"http\" implementation=\"com.orientechnologies.orient.server.network.protocol.http.ONetworkProtocolHttpDb\"/>"
        + "</protocols>" + "<listeners>" + "<listener ip-address=\"0.0.0.0\" port-range=\"2424-2430\" protocol=\"binary\"/>"
        + "<listener ip-address=\"0.0.0.0\" port-range=\"2480-2490\" protocol=\"http\"/>" + "</listeners>" + "</network>"
        + "<users>" + "<user name=\"root\" password=\"root\" resources=\"*\"/>" + "</users>" + "<storages>"
        + "<storage path=\"memory:temp\" name=\"temp\" userName=\"admin\" userPassword=\"admin\" loaded-at-startup=\"true\" />"
        + "</storages>" + "<properties>"
        + "<entry name=\"orientdb.www.path\" value=\"/Users/curtis/orientdb-graphed-1.3.0/www/\"/>"
        + "<entry name=\"orientdb.config.file\" value=\"/Users/curtis/orientdb-graphed-1.3.0/config/orientdb-server-config.xml\"/>"
        + "<entry name=\"server.cache.staticResources\" value=\"false\"/>" + "<entry name=\"log.console.level\" value=\"info\"/>"
        + "<entry name=\"log.file.level\" value=\"fine\"/>" + "</properties>" + "</orient-server>");
    return ret;
  }

  private void setupClasses() {
    OrientGraph db = new OrientGraph("memory:temp", "admin", "admin");
    db.createVertexType("rawCategory");
    db.createVertexType("rawField");
    db.commit();
    db.shutdown();
  }

  private void populateDatabase() {
    OrientGraph db = new OrientGraph("memory:temp", "admin", "admin");
    aVertex = db.addVertex("class:rawCategory");
    aVertex.setProperty("name", "a");
    bVertex = db.addVertex("class:rawCategory");
    bVertex.setProperty("name", "b");
    asubVertex = db.addVertex("class:rawField");
    asubVertex.setProperty("name", "asub");
    bsubVertex = db.addVertex("class:rawField");
    bsubVertex.setProperty("name", "bsub");
    asubVertex.addEdge("hasParent", aVertex);
    bsubVertex.addEdge("hasParent", bVertex);
    db.commit();
    db.shutdown();
  }

  private void tryLabelQuery() {
    OrientGraph db = new OrientGraph("memory:temp", "admin", "admin");
    Iterable<Vertex> vs = db.getVertices();
    for (Vertex v : vs) {
      System.out.println("GOT VERTEX: " + v);
    }
    Iterable<Vertex> rcs = ((OrientGraphQuery) db.query()).labels("rawCategory").vertices();
    if (!rcs.iterator().hasNext())
      System.out.println("??? Where are the rawCategory vertices?");
    else {
      for (Vertex rc : rcs) {
        System.out.println("GOT RC: " + rc);
      }
    }
    db.commit();
    db.shutdown();
  }

  private void runEdgeTest() {
    reparent(asubVertex, bVertex);
    reparent(asubVertex, aVertex);
    reparent(bsubVertex, aVertex);
    reparent(bsubVertex, bVertex);
    reparent(asubVertex, bVertex);
  }

  private void reparent(Vertex child, Vertex parent) {
    OrientGraph db = new OrientGraph("memory:temp", "admin", "admin");
    OrientVertex childVertex = db.getVertex(child.getId());
    Iterable<Edge> parentEdges = childVertex.getEdges(Direction.OUT, "hasParent");
    // remove original parent edge
    for (Edge parentEdge : parentEdges)
      parentEdge.remove();
    // get vertex again
    childVertex = db.getVertex(childVertex.getId());
    Vertex parentVertex = db.getVertex(parent.getId());
    // add new edge to b
    childVertex.addEdge("hasParent", parentVertex);
    db.commit();
  }
}
