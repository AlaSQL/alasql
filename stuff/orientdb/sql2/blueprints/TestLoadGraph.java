package com.orientechnologies.orient.graph.blueprints;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.junit.Test;

import com.orientechnologies.orient.graph.console.OInternalGraphImporter;

public class TestLoadGraph {

  private static final String INPUT_FILE = "src/test/resources/graph-example-2.xml";

  private String              inputFile  = INPUT_FILE;
  private String              dbURL;

  @Test
  public void testImport() throws IOException, FileNotFoundException {
    OInternalGraphImporter loadGraph = new OInternalGraphImporter();

    String storageType = System.getProperty("storageType");

    if (storageType == null)
      storageType = "memory";

    if (dbURL == null)
      dbURL = storageType + ":" + "target/databases/GratefulDeadConcerts";

    loadGraph.runImport(inputFile, dbURL);
  }
}
