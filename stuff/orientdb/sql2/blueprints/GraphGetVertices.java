/*
 *
 *  * Copyright 2014 Orient Technologies.
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

import com.orientechnologies.orient.core.metadata.schema.OType;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.orient.OrientGraphNoTx;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import com.tinkerpop.blueprints.impls.orient.OrientVertexType;
import org.junit.Test;

import java.util.Iterator;

import static org.junit.Assert.assertEquals;

/**
 * @author Gabriele Ponzi
 * @email gabriele.ponzi@gmail.com
 *
 */

public class GraphGetVertices {

  @Test
  public void test() {

    Iterator<Vertex> iterator = null;
    OrientGraphNoTx graph = new OrientGraphNoTx("memory:/TestDB", "admin", "admin");
    OrientVertexType personType = graph.createVertexType("Person");
    personType.createProperty("person_id", OType.STRING);
    personType.createProperty("name", OType.STRING);

    // Adding 3 vertices to the orient graph

    OrientVertex p1 = graph.addVertex("class:Person");
    p1.setProperty("person_id", "01");
    p1.setProperty("name", "Gabriel");

    OrientVertex p2 = graph.addVertex("class:Person");
    p2.setProperty("person_id", "02");
    p2.setProperty("name", "Daniel");

    OrientVertex p3 = graph.addVertex("class:Person");
    p3.setProperty("person_id", "03");
    p3.setProperty("name", "Emanuel");

    /*
     * CASE 1 GetVertices call without indexes, query on one key and one value
     */

    // String key and value
    String[] singleKey = { "person_id" };
    String[] singleValue = { "01" };

    iterator = graph.getVertices("Person", singleKey, singleValue).iterator();

    int resultsAmount = 0;
    while (iterator.hasNext()) {
      iterator.next();
      resultsAmount++;
    }

    assertEquals(1, resultsAmount);

    iterator = graph.getVertices("Person", singleKey, singleValue).iterator();

    Vertex firstVertex = iterator.next();
    assertEquals(firstVertex.getProperty("person_id"), "01");
    assertEquals(firstVertex.getProperty("name"), "Gabriel");

    /*
     * CASE 2 GetVertices call with index built on a single property, query on one key and one value
     */

    // Defining an index (unique_hash_index) on a single property
    String statement = "create index Person.pkey on Person (person_id) unique_hash_index";
    OCommandSQL sqlCommand = new OCommandSQL(statement);
    graph.getRawGraph().command(sqlCommand).execute();

    // String key and value
    singleValue[0] = "02";

    iterator = graph.getVertices("Person", singleKey, singleValue).iterator();

    resultsAmount = 0;
    while (iterator.hasNext()) {
      iterator.next();
      resultsAmount++;
    }

    assertEquals(1, resultsAmount);

    iterator = graph.getVertices("Person", singleKey, singleValue).iterator();

    firstVertex = iterator.next();
    assertEquals(firstVertex.getProperty("person_id"), "02");
    assertEquals(firstVertex.getProperty("name"), "Daniel");

    /*
     * CASE 3 GetVertices call with index built on two properties (composite key), query on two key and two values in order to test
     * "composite key behaviour"
     */

    // Dropping precedent index and defining a new index (unique_hash_index) on two properties
    graph.dropIndex("Person.pkey");
    statement = "create index Person.pkey on Person (person_id,name) unique_hash_index";
    sqlCommand = new OCommandSQL(statement);
    graph.getRawGraph().command(sqlCommand).execute();

    // String key and value
    String[] keys = { "person_id", "name" };
    String[] values = { "03", "Emanuel" };

    iterator = graph.getVertices("Person", keys, values).iterator();

    resultsAmount = 0;
    while (iterator.hasNext()) {
      iterator.next();
      resultsAmount++;
    }

    assertEquals(1, resultsAmount);

    iterator = graph.getVertices("Person", keys, values).iterator();

    firstVertex = iterator.next();
    assertEquals(firstVertex.getProperty("person_id"), "03");
    assertEquals(firstVertex.getProperty("name"), "Emanuel");

    graph.createVertexType("PersonDummy");

    Iterator<Vertex> personDummy = graph.getVertices("PersonDummy", singleKey, singleValue).iterator();

    resultsAmount = 0;
    while (personDummy.hasNext()) {
      personDummy.next();
      resultsAmount++;
    }
    assertEquals(0, resultsAmount);

  }

}
