package com.orientechnologies.orient.graph;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientGraphFactory;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;

public class ODatabaseFailDueCloseTest {

  private static OrientGraphFactory pool;

  @BeforeClass
  public static void setup() {
    createGraph();

    pool = new OrientGraphFactory("memory:temp", "admin", "admin").setupPool(1, 10);
    ODatabaseDocumentTx db = pool.getDatabase();
    try {
      OrientGraph graph = new OrientGraph(db);
      fillTheGraph(graph);
    } finally {
      db.close();
    }
  }

  private static void createGraph() {
    OrientGraph g = new OrientGraph("memory:temp", "admin", "admin");
    g.shutdown();
  }

  private static void fillTheGraph(OrientGraph graph) {
    OrientVertex riccardo = createPerson(graph, "riccardo", 32);
    OrientVertex luca = createPerson(graph, "luca", 40);
    OrientVertex luigi = createPerson(graph, "luigi", 30);

    OrientVertex milano = createCity(graph, "milano", 1332516);
    OrientVertex roma = createCity(graph, "roma", 1332516);
    OrientVertex unknown = createCity(graph, "unknown", -1);

    riccardo.addEdge("lives", milano);
    luca.addEdge("lives", roma);
    luigi.addEdge("lives", unknown);
  }

  private static OrientVertex createPerson(OrientGraph graph, String localName, int age) {
    OrientVertex a = graph.addVertex("class:Person");
    a.setProperties("localName", localName, "age", age);
    return a;
  }

  private static OrientVertex createCity(OrientGraph graph, String localName, int population) {
    OrientVertex a = graph.addVertex("class:City");
    a.setProperties("localName", localName, "population", population);
    return a;
  }

  @Test()
  public void test1() {
    ODatabaseDocumentTx db = pool.getDatabase();
    try {

      String queryText = "SELECT @rid as rid, localName FROM Person WHERE ( 'milano' IN out('lives').localName OR 'roma' IN out('lives').localName ) ORDER BY age ASC";
      OSQLSynchQuery<ODocument> query = new OSQLSynchQuery<ODocument>(queryText);
      List<ODocument> results = db.query(query);
      assertNotNull(results);
      assertTrue(results.size() > 0);

    } finally {
      db.close();
    }
  }

  @Test
  public void test2() {
    ODatabaseDocumentTx db = pool.getDatabase();
    try {

      String queryText = "SELECT @rid as rid, localName FROM Person WHERE age > 30";
      OSQLSynchQuery<ODocument> query = new OSQLSynchQuery<ODocument>(queryText);
      List<ODocument> results = db.query(query);
      assertNotNull(results);
      assertTrue(results.size() > 0);

    } finally {
      db.close();
    }
  }
}