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

package com.orientechnologies.orient.graph;

import com.orientechnologies.common.io.OFileUtils;
import com.tinkerpop.blueprints.impls.orient.OrientGraphNoTx;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import java.io.File;

/**
 * Base class for tests against Non transactonal Graphs.
 * 
 * @author Luca Garulli
 */
public abstract class GraphNoTxAbstractTest {
  protected static OrientGraphNoTx graph;

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
    final String dbName = GraphNoTxAbstractTest.class.getSimpleName();
    final String storageType = getStorageType();
    final String buildDirectory = System.getProperty("buildDirectory", ".");

    OFileUtils.deleteRecursively(new File(buildDirectory + "/" + dbName));

    graph = new OrientGraphNoTx(storageType + ":" + buildDirectory + "/" + dbName);
  }

  @AfterClass
  public static void afterClass() throws Exception {
    graph.shutdown();
  }
}
