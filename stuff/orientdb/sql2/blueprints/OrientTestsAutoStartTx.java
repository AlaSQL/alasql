package com.orientechnologies.orient.graph.blueprints;

import com.orientechnologies.orient.core.exception.OConcurrentModificationException;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientGraphFactory;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class OrientTestsAutoStartTx {
  private final static String STORAGE_ENGINE = "memory";
  private final static String DATABASE_URL   = STORAGE_ENGINE + ":" + OrientTestsAutoStartTx.class.getSimpleName();

  private final static String PROPERTY_NAME  = "pn";

  OrientGraphFactory          graphFactory;
  OrientGraph                 graph;

  @Before
  public void setUpGraph() {
    graphFactory = new OrientGraphFactory(DATABASE_URL);
    graph = graphFactory.getTx();
  }

  @After
  public void tearDownGraph() {
    graphFactory.drop();
  }

  @Test
  public void vertexObjectsAreInSyncWithMultipleVertexObjects() {
    final int firstValue = 0;
    final int secondValue = 1;

    OrientVertex firstVertexHandle = graph.addVertex(null, PROPERTY_NAME, firstValue);
    graph.commit();

    triggerException(graph);

    Object recordId = firstVertexHandle.getId();
    Vertex secondVertexHandle = graph.getVertex(recordId);
    secondVertexHandle.setProperty(PROPERTY_NAME, secondValue);
    graph.commit();

    Assert.assertEquals("Both queries should return " + secondValue, firstVertexHandle.getProperty(PROPERTY_NAME),
        secondVertexHandle.getProperty(PROPERTY_NAME));
  }

  @Test
  public void noOConcurrentModificationExceptionWithMultipleVertexObjects() {
    final int firstValue = 0;
    final int secondValue = 1;
    final int thirdValue = 2;

    OrientVertex firstVertexHandle = graph.addVertex(null, PROPERTY_NAME, firstValue);
    graph.commit();

    triggerException(graph);

    Object recordId = firstVertexHandle.getId();
    Vertex secondVertexHandle = graph.getVertex(recordId);
    secondVertexHandle.setProperty(PROPERTY_NAME, secondValue);
    graph.commit();

    try {
      firstVertexHandle.setProperty(PROPERTY_NAME, thirdValue);
      graph.commit();
    } catch (OConcurrentModificationException o) {
      Assert.fail("OConcurrentModificationException was thrown");
    }
  }

  @Test
  public void noOConcurrentModificationExceptionSettingAFixedValueWithMultipleVertexObjects() {
    final int fixedValue = 113;

    OrientVertex firstVertexHandle = graph.addVertex(null, PROPERTY_NAME, fixedValue);
    graph.commit();

    triggerException(graph);

    Object recordId = firstVertexHandle.getId();
    Vertex secondVertexHandle = graph.getVertex(recordId);
    secondVertexHandle.setProperty(PROPERTY_NAME, fixedValue);
    graph.commit();

    try {
      firstVertexHandle.setProperty(PROPERTY_NAME, fixedValue);
      graph.commit();
    } catch (OConcurrentModificationException o) {
      Assert.fail("OConcurrentModificationException was thrown");
    }
  }

  private void triggerException(OrientGraph graph) {
    graph.getVertices("some property", "some string").iterator().hasNext();
    graph.commit();
  }

}