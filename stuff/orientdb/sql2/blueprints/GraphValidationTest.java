/*
 *
 *  * Copyright 2010-2014 Orient Technologies LTD (info(at)orientechnologies.com)
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package com.orientechnologies.orient.graph.blueprints;

import org.junit.Before;
import org.junit.Test;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.exception.OValidationException;
import com.orientechnologies.orient.core.metadata.schema.OClass;
import com.orientechnologies.orient.core.metadata.schema.OSchema;
import com.orientechnologies.orient.core.metadata.schema.OType;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.impls.orient.OrientEdgeType;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientGraphFactory;
import com.tinkerpop.blueprints.impls.orient.OrientGraphNoTx;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import com.tinkerpop.blueprints.impls.orient.OrientVertexType;

public class GraphValidationTest {

  public static final String URL = "memory:" + GraphValidationTest.class.getSimpleName();

  @Before
  public void beforeMethod() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");
    g.drop();
  }

  @Test
  public void testValidationOnVertices() {
    OrientGraphNoTx g1 = new OrientGraphNoTx(URL, "admin", "admin");
    try {
      final OrientVertexType validationTestType = g1.createVertexType("ValidationTest");
      validationTestType.createEdgeProperty(Direction.OUT, "Connection").setMandatory(true);
      validationTestType.createEdgeProperty(Direction.IN, "Connection").setMandatory(true);

      final OrientEdgeType connectionType = g1.createEdgeType("Connection");
      connectionType.createProperty("in", OType.LINK, validationTestType).setMandatory(true);
      connectionType.createProperty("out", OType.LINK, validationTestType).setMandatory(true);
    } finally {
      g1.shutdown();
    }

    OrientGraph g2 = new OrientGraph(URL, "admin", "admin");
    try {
      OrientVertex vertex1 = g2.addTemporaryVertex("ValidationTest");
      OrientVertex vertex2 = g2.addTemporaryVertex("ValidationTest");
      OrientVertex vertex3 = g2.addTemporaryVertex("ValidationTest");
      OrientVertex vertex4 = g2.addTemporaryVertex("ValidationTest");

      vertex1.addEdge("Connection", vertex2);
      vertex2.addEdge("Connection", vertex3);
      vertex3.addEdge("Connection", vertex4);
      vertex4.addEdge("Connection", vertex1);

      g2.commit();

    } finally {
      g2.shutdown();
    }
  }

  @Test
  public void ok() {
    setupSchema();
    final OrientGraphNoTx graphNoTx = new OrientGraphNoTx(URL, "admin", "admin");
    try {

      graphNoTx.addVertex("class:M", "name", "n0");
      try {
        graphNoTx.addVertex("class:M");
        throw new RuntimeException("Schema problem was not detected!");
      } catch (Throwable e) {
        // This is what happens => OK
        System.out.println("This is the Message I want to see: \n" + e);
      }

      graphNoTx.commit();
    } finally {
      graphNoTx.shutdown();
    }
  }

  @Test
  public void fail() {
    setupSchema();
    final OrientGraphFactory orientGraphFactory = new OrientGraphFactory(URL, "admin", "admin").setupPool(1, 10);
    OrientGraph graph = orientGraphFactory.getTx();
    try {

      graph.addVertex("class:M", "name", "n0");
      try {
        graph.addVertex("class:M");
        graph.commit();
        // This is what happens => not OK?
        throw new RuntimeException("Schema problem was not detected!");
      } catch (OValidationException e) {
        System.out.println("This is the Message I want to see: \n" + e);
      }

    } finally {
      graph.shutdown();
    }
  }

  private void setupSchema() {
    OrientGraphNoTx graphNoTx = new OrientGraphNoTx(URL, "admin", "admin");
    try {

      ODatabaseDocumentTx database = graphNoTx.getRawGraph();
      OSchema oScchema = database.getMetadata().getSchema();

      oScchema.getClass("V").setStrictMode(true);
      oScchema.getClass("E").setStrictMode(true);

      OrientVertexType CmVertexBaseType = graphNoTx.createVertexType("CmVertexBase", "V");
      CmVertexBaseType.setStrictMode(true);

      OrientVertexType CmEdgeBaseType = graphNoTx.createVertexType("CmEdgeBase", "V");
      CmEdgeBaseType.setStrictMode(true);

      OClass mOClass = database.getMetadata().getSchema().createClass("M", database.getMetadata().getSchema().getClass("V"));
      mOClass.createProperty("name", OType.STRING).setMandatory(true).setNotNull(true);
      mOClass.setStrictMode(true);

      graphNoTx.commit();
    } finally {
      graphNoTx.shutdown();
    }
  }

}
