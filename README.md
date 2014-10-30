# alasql.js - pure JavaScript client-side SQL-database 

Version: 0.0.4 Date: October 29, 2014 [Changelog](CHANGELOG.md) 

alasql.js - '[à la SQL](http://en.wiktionary.org/wiki/%C3%A0_la)' - is a lightweight client-side SQL database designed to work in browser and Node.js. It uses [SQL Parser](https://github.com/forward/sql-parser) by Andrew Kent for parsing of SQL statements.

alasql.js was written with pure JavaScript and does not use browser WebSQL database.

## Examples

Try alasql.js in [Fiddle](http://jsfiddle.net/agershun/38hj2uwy/3/)

Other examples:
* [Sandbox](examples/sandbox.html)
* [Sieve of Eratosthenes](examples/prime.html)


## Installation

### In browser

Include two files: [alasql.js](src/alasql.js) and [sql-parser.js](lib/sql-parser/sql-parser.js) to the page.

```
  <script src="sql-parser.js"></script>
  <script src="alasql.js"></script>	
  <script>
    var db = new alasql.Database();
    db.exec("CREATE TABLE test (one INT, two NVARCHAR(MAX))");
    db.exec("INSERT INTO test (1,2)");
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
    
    db.exec("CREATE TABLE test (one INT, two INT)");
    db.tables.test.recs = [
        {one:3,two:4},
        {one:5,two:6},
    ];
    var res = db.exec("SELECT * FROM test ORDER BY two DESC");
    console.log(res[0].one);

```

### Supported SQL statements

* SELECT fields FROM tableid1 JOIN tableid2 ON oncond WHERE cond GROUP BY v1,v2 HAVING cond ORDER BY a,b, LIMIT number
* INSERT INTO table \[ (field1, field2) \] VALUES (value1, value2)
* UPDATE table SET field = value1, field = value2 WHERE condition 
* DELETE FROM table WHERE condition 
* CREATE TABLE \[IF NOT EXISTS\] table
* DROP TABLE \[IF EXISTS\] table
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

Usually, alasql.js works synchronously, but you can use callback.

```
    db.exec('SELECT * FROM test', function(res){
    	console.log(res);
    });
```

### Performance

According the preliminary performance tests alasql.js is faster than [sql.js]() in 5 to 10 times on more than 1000 records tables, and compete [WebSQL]() on different queries. 

The preliminary [performance report](PERFORMANCE.md).

### Limitations

It is Ok with 1000000 records in memory of browser. 

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

## Similar projects (SQL database, MDX/OLAP on JavaScript)
SQL-database:
* [sql.js](https://github.com/kripken/sql.js) - port of SQLike to JavaScript
* [SequelSphere](http://www.sequelsphere.com/) - commercial SQL-database

LINQ realizations:
* [SQLike](http://www.thomasfrank.se/sqlike.html) - 
* [JSLINQ](http://jslinq.codeplex.com/)
* [JavaScriptSQL](http://javascriptsql.sourceforge.net/ARCH/en/index.html)
* [TrimQuery](https://code.google.com/p/trimpath/wiki/TrimQuery)
* [jlinq](http://www.hugoware.net/projects/jlinq)

Other:
* [dom-storage-query-language](https://code.google.com/p/dom-storage-query-language/)
* [kombai-js](https://code.google.com/p/kombai-js/)

JavaScript databases:
* [TaffyDB](http://www.taffydb.com/)
* [CrossFilter](https://github.com/square/crossfilter)
* [js-hypercube](https://github.com/thesmart/js-hypercube)
* [cubico](https://github.com/diegodayan/cubico)
* [SimpleMemolap](https://github.com/ajlopez/SimpleMemolap)

## Credits

Many thanks to Andrew Kent for his SQL Parser and other people for useful tools, which made our work much easier.

## License

(c) 2014, Andrey Gershun (agershun@gmail.com), [MIT licence information](LICENSE)

