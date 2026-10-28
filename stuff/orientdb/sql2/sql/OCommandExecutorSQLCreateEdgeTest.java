package com.orientechnologies.orient.graph.sql;

import com.orientechnologies.orient.core.Orient;
import com.orientechnologies.orient.core.command.script.OCommandScript;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.core.metadata.schema.OSchema;
import com.orientechnologies.orient.core.record.impl.ODocument;
import com.orientechnologies.orient.core.sql.OCommandSQL;
import com.orientechnologies.orient.core.sql.query.OSQLSynchQuery;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.HashMap;
import java.util.List;

/**
 * @author Artem Orobets (enisher-at-gmail.com)
 */
@RunWith(JUnit4.class)
public class OCommandExecutorSQLCreateEdgeTest {

  private ODatabaseDocumentTx db;
  private ODocument           owner1;
  private ODocument           owner2;

  @Before
  public void setUp() throws Exception {
    db = Orient.instance().getDatabaseFactory()
        .createDatabase("graph", "memory:" + OCommandExecutorSQLCreateEdgeTest.class.getSimpleName());

    if (db.exists()) {
      db.open("admin", "admin");
      db.drop();
    }

    db.create();

    final OSchema schema = db.getMetadata().getSchema();
    schema.createClass("Owner", schema.getClass("V"));
    schema.createClass("link", schema.getClass("E"));

    owner1 = new ODocument("Owner");
    owner1.field("id", 1);
    owner1.save();
    owner2 = new ODocument("Owner");
    owner2.field("id", 2);
    owner2.save();
  }

  @After
  public void tearDown() throws Exception {
    db.drop();

    db = null;
    owner1 = null;
    owner2 = null;
  }

  @Test
  public void testParametersBinding() throws Exception {
    db.command(new OCommandSQL("CREATE EDGE link from " + owner1.getIdentity() + " TO " + owner2.getIdentity() + " SET foo = ?"))
        .execute("123");

    final List<ODocument> list = db.query(new OSQLSynchQuery<Object>("SELECT FROM link"));

    Assert.assertEquals(list.size(), 1);
    Assert.assertEquals(list.get(0).field("foo"), "123");
  }

  @Test
  public void testSubqueryParametersBinding() throws Exception {
    final HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("foo", "bar");
    params.put("fromId", 1);
    params.put("toId", 2);

    db.command(
        new OCommandSQL(
            "CREATE EDGE link from (select from Owner where id = :fromId) TO (select from Owner where id = :toId) SET foo = :foo"))
        .execute(params);

    final List<ODocument> list = db.query(new OSQLSynchQuery<Object>("SELECT FROM link"));

    Assert.assertEquals(list.size(), 1);
    final ODocument edge = list.get(0);
    Assert.assertEquals(edge.field("foo"), "bar");
    Assert.assertEquals(edge.field("out"), owner1.getIdentity());
    Assert.assertEquals(edge.field("in"), owner2.getIdentity());
  }

  @Test
  public void testEdgeConstraints() {
    db.command(
        new OCommandScript("sql", "create class E2 extends E;" + "create property E2.x LONG;" + "create property E2.in LINK;"
            + "alter property E2.in MANDATORY=true;" + "create property E2.out LINK;" + "alter property E2.out MANDATORY=true;"
            + "create class E1 extends E;" + "create property E1.x LONG;" + "alter property E1.x MANDATORY=true;"
            + "create property E1.in LINK;" + "alter property E1.in MANDATORY=true;" + "create property E1.out LINK;"
            + "alter property E1.out MANDATORY=true;" + "create class FooType extends V;" + "create property FooType.name STRING;"
            + "alter property FooType.name MANDATORY=true;")).execute();

    db.command(
        new OCommandScript("sql", "let $v1 = create vertex FooType content {'name':'foo1'};"
            + "let $v2 = create vertex FooType content {'name':'foo2'};" + "create edge E1 from $v1 to $v2 content {'x':22};"
            + "create edge E1 from $v1 to $v2 set x=22;" + "create edge E2 from $v1 to $v2 content {'x':345};")).execute();
  }
}
