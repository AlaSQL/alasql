# alasql.js - pure JavaScript client-side SQL-database 

Version: 0.0.3 Date: October 28, 2014 [Changelog](CHANGELOG.md) 

alasql.js - '[à la SQL](http://en.wiktionary.org/wiki/%C3%A0_la)' - is a lightweight client-side SQL database designed to work in browser and Node.js. It uses [SQL Parser](https://github.com/forward/sql-parser) by Andrew Kent for parsing of SQL statements.

Try it in [Fiddle](http://jsfiddle.net/agershun/38hj2uwy/3/)

## Installation

### In browser

Just add two files [alasql.js](lib/alasql.js) and [sql-parser.js](lib/sql-parser.js) to the page.

```
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

You can use alasql.js with define()/require() functions as well, because it supports UMD.

### In Node.js

Use the following command for installation:
```
    npm install alasql
```
Then require alasql.js file:

```
    var alasql = require('alasql');
    var db = new alasql.Database();
    db.run("CREATE TABLE test (one INT, two INT)");
    db.tables.test.recs = [
        {one:3,two:4},
        {one:5,two:6},
    ];
    var res = db.exec("SELECT * FROM test ORDER BY two DESC");
    console.log(res[0].one);

```

### Supported SQL statements

* SELECT conditions FROM tableid1 JOIN tableid2 ON oncond WHERE cond GROUP BY v1,v2 HAVING cond ORDER BY a,b, LIMIT number
* INSERT INTO table \[ (field1, field2) \] VALUES (value1, value2)
* UPDATE table SET field = value1, field = value2 WHERE condition 
* DELETE FROM table WHERE condition 
* CREATE TABLE \[IF NOT EXIST\] table
* DROP TABLE \[IF EXIST\] table
* ALTER TABLE table1 RENAME TO table2


#### SELECT statement

Now alasql.js supports following subset of SELECT syntax:

* SELECT field1, field2 AS alias3, FUNCTION(field4+field5) AS alias6, SUM(field7) AS alias8, *, table2.*
* FROM table1
* LEFT OUTER/INNER JOIN table2 ON condition
* WHERE condition
* GROUP BY field1, alias3
* HAVING condition
* ORDER BY field1, alias3
* LIMIT number

#### Functions

* ABS
* MIN
* MAX
* some others (to be continued)

#### Aggregators

* SUM()
* COUNT() 

### Database methods

Each database can be used with the following methods:

* vat db = new Database() - create new alasql-database
* var res = db.exec(sql-statement) - executes SELECT query and returns array of objects 

alasql.js works synchronously.

### Performance

According the preliminary performance tests alasql.js is faster than [sql.js]() in 5 to 10 times on more than 1000 records tables, and compete [WebSQL]() on different queries. 

The preliminary [performance report](PERFORMANCE.md).

### Limitations

It is ok with 1000000 records in memory of browser. 

### Tests

I use mocha for tests. Run mocha from command line:

```
    mocha
```
or run [test/main.html](test/main.html) in browser.


### Known Bugs

1. There is a '[STAR bug](https://github.com/forward/sql-parser/issues/6)' in sql-parser, therefore
it is still impossible to use multiplication function.
2. There are many others... 

### Future Plans

Read my [to do](TODO.md) page

## Credits

Many thanks to Andrew Kent for his SQL Parser and other people for useful tools, which made our work much easier.

## License

(c) 2014, Andrey Gershun (agershun@gmail.com), [MIT licence information](LICENSE)

