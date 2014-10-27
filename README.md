alasql.js - pure JavaScript fast client-side SQL-database 
===
Version 0.0.2 Date: October 27, 2014 

alasql.js is a lightweight client-side SQL database designed to work in browser and Node.js. 
It uses [SQL Parser](https://github.com/forward/sql-parser) by Andrew Kent for parsing of SQL statements.

Installation
===

In browser - just save two files [alasql.js](lib/alasql.js) and [sql-parser.js](lib/sql-parser.js).

In Node.js use the following command:

  npm install alasql (Sorry, this is not realized yet. Just save these .js files)

In browser
==
```
  test.html
  =========
  <script src="sql-parser.js"></script>
  <script src="alasql.js"></script>	
  <script>
    var db = new alasql.Database();
    db.run("CREATE TABLE test (one INT, two NVARCHAR(MAX))");
    db.run("INSERT INTO test (1,2)");
    db.tables.test.recs.push({one:3,two:4}); // You can add values directly to array
    console.table(db.exec("SELECT * FROM test"));
  </script>

```
In Node.js
==
```
    var alasql = require('./lib/alasql.js');
    var db = new alasql.Database();
    db.run("CREATE TABLE test (one INT, two INT)");
    db.tables.test.recs = \[
        {one:3,two:4},
        {one:5,two:6},
    \];
    var res = db.exec("SELECT * FROM test ORDER BY two DESC");
    console.log(res[0].one);

```

Supported SQL statements
==
* SELECT conditions FROM tableid1 JOIN tableid2 ON oncond WHERE cond GROUP BY v1,v2 HAVING cond ORDER BY a,b, LIMIT number
* INSERT INTO table \[ (field1, field2) \] VALUES (value1, value2)
* UPDATE table SET field = value1, field = value2 WHERE condition (Not realized yet)
* DELETE FROM table WHERE condition (Not realized yet)
* CREATE TABLE \[IF NOT EXIST\] table
* DROP TABLE \[IF EXIST\] table
* ALTER TABLE table1 RENAME TO table2


SELECT statement
==

Now alasql supports following subset of SELECT syntax:

* SELECT field1, field2 AS alias3, FUNCTION(field4+field5) AS alias6, SUM(field7) AS alias8, *, table2.*
* FROM table1
* LEFT OUTER/INNER JOIN table2 ON condition
* WHERE condition
* GROUP BY field1, alias3
* HAVING condition
* ORDER BY field1, alias3
* LIMIT number

FUNCTIONS
==
* ABS
* MIN
* MAX
* some others

AGGREGATORS
==
* SUM()
* COUNT() 

Database methods
==

Each database can be used with the following sync methods:

* vat db = new Database() - create new alasql-database
* var res = db.exec(sql-statement) - executes SELECT query and returns array of objects 

Performance
===
alasql.js is faster than [sql.js]() and [WebSQL]() in 5 to 10 times on more than 10000 records queries. 

Limitations
==
It is ok with 1000000 records in memory of browser. 
10 millions is not ok.

Tests
==

I use mocha for tests. Just run mocha from command line:

```
  mocha
```


Credits
==
Many thanks to Andrew Kent for his SQL Parser and other people for other useful tools, which made our work much easier.

License
==

(c) 2014, Andrey Gershun (agershun@gmail.com), [MIT licance information](LICENSE)

