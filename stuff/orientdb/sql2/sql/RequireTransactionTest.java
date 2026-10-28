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

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.orientechnologies.orient.core.exception.OTransactionException;
import com.orientechnologies.orient.graph.GraphTxAbstractTest;
import com.tinkerpop.blueprints.impls.orient.OrientGraph;

public class RequireTransactionTest {

  protected static OrientGraph graph;

  public static enum ENV {
    DEV, RELEASE, CI
  }

  public static ENV getEnvironment() {
    String envName = System.getProperty("orientdb.test.env", "dev").toUpperCase();
    ENV result = null;
    try {
      result = ENV.valueOf(envName);
    } catch (IllegalArgumentException e) {
    }

    if (result == null)
      result = ENV.DEV;

    return result;
  }

  public static String getStorageType() {
    if (getEnvironment().equals(ENV.DEV))
      return "memory";

    return "plocal";
  }

  @BeforeClass
  public static void beforeClass() {
    if (graph == null) {
      final String dbName = GraphTxAbstractTest.class.getSimpleName();
      final String storageType = getStorageType();
      final String buildDirectory = System.getProperty("buildDirectory", ".");
      graph = new OrientGraph(storageType + ":" + buildDirectory + "/" + dbName);
      graph.drop();
      graph = new OrientGraph(storageType + ":" + buildDirectory + "/" + dbName);
    }

  }

  @AfterClass
  public static void afterClass() throws Exception {
    graph.shutdown();
    graph = null;
  }

  @Test
  public void requireTxEnable() {
    graph.setAutoStartTx(false);
    graph.rollback();

    graph.setRequireTransaction(true);
    try {
      graph.addVertex(null);
      assertFalse(true);
    } catch (OTransactionException e) {
    }

    graph.begin();
    try {
      graph.addVertex(null);
      assertTrue(true);
    } catch (OTransactionException e) {
      assertFalse(true);
    }

    graph.commit();

    try {
      graph.addVertex(null);
      assertFalse(true);
    } catch (OTransactionException e) {
    }
  }
}
