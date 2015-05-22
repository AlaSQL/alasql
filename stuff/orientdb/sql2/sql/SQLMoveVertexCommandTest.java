/*
 *
 *  *  Copyright 2014 Orient Technologies LTD (info(at)orientechnologies.com)
 *  *
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  *  you may not use this file except in compliance with the License.
 *  *  You may obtain a copy of the License at
 *  *
 *  *       http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  *  distributed under the License is distributed on an "AS IS" BASIS,
 *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *  See the License for the specific language governing permissions and
 *  *  limitations under the License.
 *  *
 *  * For more information: http://www.orientechnologies.com
 *  
 */

package com.orientechnologies.orient.graph.sql;

import com.orientechnologies.orient.core.db.record.OIdentifiable;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.orientechnologies.orient.graph.GraphNoTxAbstractTest;
import com.tinkerpop.blueprints.impls.orient.OrientEdge;
import com.tinkerpop.blueprints.impls.orient.OrientEdgeType;
import com.tinkerpop.blueprints.impls.orient.OrientVertex;
import com.tinkerpop.blueprints.impls.orient.OrientVertexType;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;

public class SQLMoveVertexCommandTest extends GraphNoTxAbstractTest {
  private static OrientVertexType customer;
  private static OrientVertexType provider;
  private static OrientEdgeType   knows;
  private static int              customerGeniusCluster;

  @BeforeClass
  public static void setUp() throws Exception {
    if (graph.getVertexType("Customer") == null) {
      customer = (OrientVertexType) graph.createVertexType("Customer").setClusterSelection("default");
      customer.addCluster("Customer_genius");
      customerGeniusCluster = graph.getRawGraph().getClusterIdByName("Customer_genius");
    }

    if (graph.getVertexType("Provider") == null)
      provider = (OrientVertexType) graph.createVertexType("Provider").setClusterSelection("default");

    if (graph.getEdgeType("Knows") == null)
      knows = graph.createEdgeType("Knows");
  }

  @Test
  public void testMoveSingleRecordToAnotherCluster() {
    OrientVertex v1 = graph.addVertex("class:Customer").setProperties("name", "Jay1", "test",
        "testMoveSingleRecordToAnotherCluster");
    OrientVertex v2 = graph.addVertex("class:Customer").setProperties("name", "Jay2", "test",
        "testMoveSingleRecordToAnotherCluster");
    OrientVertex v3 = graph.addVertex("class:Customer").setProperties("name", "Jay3", "test",
        "testMoveSingleRecordToAnotherCluster");

    v1.addEdge("knows", v1); // SELF
    v1.addEdge("knows", v2);
    v1.addEdge("knows", v3);
    v2.addEdge("knows", v1);

    Assert.assertEquals(v1.getIdentity().getClusterId(), customer.getDefaultClusterId());

    Iterable<OrientVertex> result = graph.command(
        new OCommandSQL("MOVE VERTEX " + v1.getIdentity() + " TO CLUSTER:Customer_genius")).execute();

    // CHECK RESULT
    final ArrayList<OIdentifiable> newRids = new ArrayList<OIdentifiable>();
    int tot = 0;
    for (OrientVertex v : result) {
      tot++;
      ODocument fromTo = v.getRecord();
      OIdentifiable from = fromTo.field("old");
      OIdentifiable to = fromTo.field("new");

      newRids.add(to);

      // CHECK FROM
      Assert.assertEquals(from, v1.getIdentity());

      // CHECK DESTINATION
      Assert.assertEquals(to.getIdentity().getClusterId(), customerGeniusCluster);
      ODocument newDocument = to.getRecord();

      Assert.assertEquals(newDocument.field("name"), "Jay1");
      Assert.assertEquals(newDocument.field("test"), "testMoveSingleRecordToAnotherCluster");
    }
    Assert.assertEquals(tot, 1);

    Iterable<OrientEdge> result2 = graph.command(
        new OCommandSQL("SELECT FROM knows where out = " + v1.getIdentity() + " or in = " + v1.getIdentity())).execute();

    Assert.assertFalse(result2.iterator().hasNext());

  }

  @Test
  public void testMoveSingleRecordToAnotherClass() {
    ODocument doc = new ODocument("Customer").field("name", "Jay").field("test", "testMoveSingleRecordToAnotherClass").save();

    Assert.assertEquals(doc.getIdentity().getClusterId(), customer.getDefaultClusterId());

    Iterable<OrientVertex> result = graph.command(new OCommandSQL("MOVE VERTEX " + doc.getIdentity() + " TO CLASS:Provider"))
        .execute();

    // CHECK RESULT
    ODocument fromTo = result.iterator().next().getRecord();

    Assert.assertFalse(result.iterator().hasNext());

    OIdentifiable from = fromTo.field("old");
    OIdentifiable to = fromTo.field("new");

    // CHECK FROM
    Assert.assertEquals(from, doc.getIdentity());

    // CHECK DESTINATION
    Assert.assertEquals(to.getIdentity().getClusterId(), provider.getDefaultClusterId());
    ODocument newDocument = to.getRecord();
    Assert.assertEquals(newDocument.getClassName(), "Provider");

    Assert.assertEquals(newDocument.field("name"), "Jay");
    Assert.assertEquals(newDocument.field("test"), "testMoveSingleRecordToAnotherClass");
  }

  @Test
  public void testMoveMultipleRecordToAnotherCluster() {
    new ODocument("Customer").field("name", "Jay").field("workedOn", "Amiga").save();
    new ODocument("Customer").field("name", "Steve").field("workedOn", "Mac").save();
    new ODocument("Customer").field("name", "Bill").field("workedOn", "Ms-Dos").save();
    new ODocument("Customer").field("name", "Tim").field("workedOn", "Amiga").save();

    Iterable<OrientVertex> result = graph.command(
        new OCommandSQL("MOVE VERTEX (select from Customer where workedOn = 'Amiga') TO CLUSTER:Customer_genius")).execute();

    // CHECK RESULT
    int tot = 0;
    for (OrientVertex v : result) {
      tot++;
      ODocument fromTo = v.getRecord();
      OIdentifiable from = fromTo.field("old");
      OIdentifiable to = fromTo.field("new");

      // CHECK FROM
      Assert.assertEquals(from.getIdentity().getClusterId(), customer.getDefaultClusterId());

      // CHECK DESTINATION
      Assert.assertEquals(to.getIdentity().getClusterId(), customerGeniusCluster);
      ODocument newDocument = to.getRecord();
      Assert.assertEquals(newDocument.getClassName(), "Customer");

      Assert.assertEquals(newDocument.field("workedOn"), "Amiga");
    }

    Assert.assertEquals(tot, 2);

  }

  @Test
  public void testMoveMultipleRecordToAnotherClass() {
    new ODocument("Customer").field("name", "Luca").field("city", "Rome").save();
    new ODocument("Customer").field("name", "Jill").field("city", "Austin").save();
    new ODocument("Customer").field("name", "Marco").field("city", "Rome").save();
    new ODocument("Customer").field("name", "XXX").field("city", "Athens").save();

    Iterable<OrientVertex> result = graph.command(
        new OCommandSQL("MOVE VERTEX (select from Customer where city = 'Rome') TO CLASS:Provider")).execute();

    // CHECK RESULT
    int tot = 0;
    for (OrientVertex v : result) {
      tot++;
      ODocument fromTo = v.getRecord();
      OIdentifiable from = fromTo.field("old");
      OIdentifiable to = fromTo.field("new");

      // CHECK FROM
      Assert.assertEquals(from.getIdentity().getClusterId(), customer.getDefaultClusterId());

      // CHECK DESTINATION
      Assert.assertEquals(to.getIdentity().getClusterId(), provider.getDefaultClusterId());
      ODocument newDocument = to.getRecord();
      Assert.assertEquals(newDocument.getClassName(), "Provider");

      Assert.assertEquals(newDocument.field("city"), "Rome");
    }

    Assert.assertEquals(tot, 2);
  }

  @Test
  public void testMoveMultipleRecordToAnotherClassInTx() {
    new ODocument("Customer").field("name", "Luca").field("city", "Rome").save();
    new ODocument("Customer").field("name", "Jill").field("city", "Austin").save();
    new ODocument("Customer").field("name", "Marco").field("city", "Rome").save();
    new ODocument("Customer").field("name", "XXX").field("city", "Athens").save();

    Iterable<OrientVertex> result = graph.command(
        new OCommandSQL("MOVE VERTEX (select from Customer where city = 'Rome') TO CLASS:Provider")).execute();

    // CHECK RESULT
    int tot = 0;
    for (OrientVertex v : result) {
      tot++;
      ODocument fromTo = v.getRecord();
      OIdentifiable from = fromTo.field("old");
      OIdentifiable to = fromTo.field("new");

      // CHECK FROM
      Assert.assertEquals(from.getIdentity().getClusterId(), customer.getDefaultClusterId());

      // CHECK DESTINATION
      Assert.assertEquals(to.getIdentity().getClusterId(), provider.getDefaultClusterId());
      ODocument newDocument = to.getRecord();
      Assert.assertEquals(newDocument.getClassName(), "Provider");

      Assert.assertEquals(newDocument.field("city"), "Rome");
    }

    Assert.assertEquals(tot, 2);
  }

  @Test
  public void testMoveMultipleRecordToAnotherClassInTxSettingProperties() {
    new ODocument("Customer").field("name", "Luca").field("city", "Rome").save();
    new ODocument("Customer").field("name", "Jill").field("city", "Austin").save();
    new ODocument("Customer").field("name", "Marco").field("city", "Rome").save();
    new ODocument("Customer").field("name", "XXX").field("city", "Athens").save();

    Iterable<OrientVertex> result = graph.command(
        new OCommandSQL("MOVE VERTEX (select from Customer where city = 'Rome') TO CLASS:Provider SET a='test3', b=5")).execute();

    // CHECK RESULT
    int tot = 0;
    for (OrientVertex v : result) {
      tot++;
      ODocument fromTo = v.getRecord();
      OIdentifiable from = fromTo.field("old");
      OIdentifiable to = fromTo.field("new");

      // CHECK FROM
      Assert.assertEquals(from.getIdentity().getClusterId(), customer.getDefaultClusterId());

      // CHECK DESTINATION
      Assert.assertEquals(to.getIdentity().getClusterId(), provider.getDefaultClusterId());
      ODocument newDocument = to.getRecord();
      Assert.assertEquals(newDocument.getClassName(), "Provider");

      Assert.assertEquals(newDocument.field("city"), "Rome");
      Assert.assertEquals(newDocument.field("a"), "test3");
      Assert.assertEquals(newDocument.field("b"), 5);
    }

    Assert.assertEquals(tot, 2);
  }
}
