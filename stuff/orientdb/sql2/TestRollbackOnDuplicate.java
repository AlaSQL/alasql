package com.orientechnologies.orient.graph;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.orientechnologies.orient.core.command.script.OCommandScript;
import com.orientechnologies.orient.core.db.document.ODatabaseDocument;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.metadata.schema.OClass;
import com.orientechnologies.orient.core.metadata.schema.OClass.INDEX_TYPE;
import com.orientechnologies.orient.core.metadata.schema.OType;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;
import com.orientechnologies.orient.core.storage.ORecordDuplicatedException;

public class TestRollbackOnDuplicate {

  @Test
  public void testDuplicateRollback() {
    ODatabaseDocument db = new ODatabaseDocumentTx("memory:" + TestRollbackOnDuplicate.class.getSimpleName());
    try {
      db.create();
      db.getMetadata().getSchema().createClass("E");
      OClass V = db.getMetadata().getSchema().createClass("V");
      OClass clazz = db.getMetadata().getSchema().createClass("Test");
      clazz.setSuperClass(V);
      clazz.createProperty("id", OType.STRING).createIndex(INDEX_TYPE.UNIQUE);
      try {
        db.command(
            new OCommandScript(
                "sql",
                "BEGIN \n LET a = create vertex Test SET id = \"12345678\" \n LET b = create vertex Test SET id = \"4kkrPhGe\" \n LET c =create vertex Test SET id = \"4kkrPhGe\" \n RETURN $b \n COMMIT"))
            .execute();
      } catch (ORecordDuplicatedException ex) {

      }
      List<ODocument> res = db.query(new OSQLSynchQuery("select from Test"));
      Assert.assertEquals(res.size(), 0);
    } finally {
      db.drop();
    }
  }

}
