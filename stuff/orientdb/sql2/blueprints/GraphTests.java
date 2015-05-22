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

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.orientechnologies.orient.core.index.OIndexException;
import com.orientechnologies.orient.core.metadata.schema.OType;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.orientechnologies.orient.core.storage.ORecordDuplicatedException;
import com.tinkerpop.blueprints.Direction;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Parameter;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import com.tinkerpop.blueprints.impls.orient.OrientVertexType;

public class GraphTests {

  public static final String URL = "memory:" + GraphTests.class.getSimpleName();

  @BeforeClass
  public static void beforeClass() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");
    g.drop();
  }

  @Test
  public void indexes() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");

    try {
      if (g.getVertexType("VC1") == null) {
        g.createVertexType("VC1");
      }
    } finally {
      g.shutdown();
    }
    g = new OrientGraph(URL, "admin", "admin");
    try {
      // System.out.println(g.getIndexedKeys(Vertex.class,true)); this will print VC1.p1
      if (g.getIndex("VC1.p1", Vertex.class) == null) {// this will return null. I do not know why
        g.createKeyIndex("p1", Vertex.class, new Parameter<String, String>("class", "VC1"), new Parameter<String, String>("type",
            "UNIQUE"), new Parameter<String, OType>("keytype", OType.STRING));
      }
    } catch (OIndexException e) {
      // ignore because the index may exist
    } finally {
      g.shutdown();
    }

    g = new OrientGraph(URL, "admin", "admin");
    String val1 = System.currentTimeMillis() + "";
    try {
      Vertex v = g.addVertex("class:VC1");
      v.setProperty("p1", val1);
    } finally {
      g.shutdown();
    }
    g = new OrientGraph(URL, "admin", "admin");
    try {
      Vertex v = g.addVertex("class:VC1");
      v.setProperty("p1", val1);
    } finally {
      try {
        g.shutdown();
        fail("must throw duplicate key here!");
      } catch (ORecordDuplicatedException e) {
        // ok
      }

    }
  }

  @Test
  public void testEmbeddedListAsVertexProperty() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");

    try {
      OrientVertexType vertexType = g.createVertexType("EmbeddedClass");
      vertexType.createProperty("embeddedList", OType.EMBEDDEDLIST);

      OrientVertex vertex = g.addVertex("class:EmbeddedClass");

      List<ODocument> embeddedList = new ArrayList<ODocument>();
      ODocument docOne = new ODocument();
      docOne.field("prop", "docOne");

      ODocument docTwo = new ODocument();
      docTwo.field("prop", "docTwo");

      embeddedList.add(docOne);
      embeddedList.add(docTwo);

      vertex.setProperty("embeddedList", embeddedList);

      final Object id = vertex.getId();

      g.shutdown();
      g = new OrientGraph(URL, "admin", "admin");

      vertex = g.getVertex(id);
      embeddedList = vertex.getProperty("embeddedList");

      docOne = embeddedList.get(0);
      Assert.assertEquals(docOne.field("prop"), "docOne");

      docTwo = embeddedList.get(1);
      Assert.assertEquals(docTwo.field("prop"), "docTwo");
    } finally {
      g.shutdown();
    }
  }

  @Test
  public void testGetEdgesUpdate() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");
    try {
      g.createVertexType("GetEdgesUpdate");
      g.createEdgeType("getEdgesUpdateEdge");

      OrientVertex vertexOne = g.addVertex("class:GetEdgesUpdate");

      OrientVertex vertexTwo = g.addVertex("class:GetEdgesUpdate");
      OrientVertex vertexThree = g.addVertex("class:GetEdgesUpdate");
      OrientVertex vertexFour = g.addVertex("class:GetEdgesUpdate");

      vertexOne.addEdge("getEdgesUpdateEdge", vertexTwo);
      vertexOne.addEdge("getEdgesUpdateEdge", vertexThree);
      vertexOne.addEdge("getEdgesUpdateEdge", vertexFour);

      g.commit();

      Iterable<Edge> iterable = vertexOne.getEdges(Direction.OUT, "getEdgesUpdateEdge");
      Iterator<Edge> iterator = iterable.iterator();

      int counter = 0;
      while (iterator.hasNext()) {
        iterator.next();
        counter++;
      }

      Assert.assertEquals(3, counter);

      iterable = vertexOne.getEdges(Direction.OUT, "getEdgesUpdateEdge");
      iterator = iterable.iterator();

      Edge deleteEdge = (Edge) iterator.next();

      Vertex deleteVertex = deleteEdge.getVertex(Direction.IN);
      deleteVertex.remove();

      g.commit();

      iterable = vertexOne.getEdges(Direction.OUT, "getEdgesUpdateEdge");
      iterator = iterable.iterator();

      counter = 0;
      while (iterator.hasNext()) {
        iterator.next();
        counter++;
      }

      Assert.assertEquals(2, counter);
    } finally {
      g.shutdown();
    }
  }

  @Test
  public void testBrokenVertex1() {
    OrientGraph g = new OrientGraph(URL, "admin", "admin");
    try {
      g.createVertexType("BrokenVertex1V");
      g.createEdgeType("BrokenVertex1E");

      OrientVertex vertexOne = g.addVertex("class:BrokenVertex1V");

      OrientVertex vertexTwo = g.addVertex("class:BrokenVertex1V");

      vertexOne.addEdge("BrokenVertex1E", vertexTwo);

      g.commit();

      g.command(new OCommandSQL("delete from " + vertexTwo.getRecord().getIdentity() + " unsafe")).execute();
      // g.command(new OCommandSQL("update BrokenVertex1E set out = null")).execute();

      g.shutdown();
      g = new OrientGraph(URL, "admin", "admin");
      Iterable<Vertex> iterable = g.command(new OCommandSQL("select from BrokenVertex1V")).execute();
      Iterator<Vertex> iterator = iterable.iterator();

      int counter = 0;
      while (iterator.hasNext()) {
        OrientVertex v = (OrientVertex) iterator.next();
        for (Vertex v1 : v.getVertices(Direction.OUT, "BrokenVertex1E")) {
          assertNotNull(((OrientVertex) v1).getRecord());
        }
      }

    } finally {
      g.shutdown();
    }
  }
}
