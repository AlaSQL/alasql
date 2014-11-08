# Alasql.js - pure JavaScript client-side in-memory fast SQL-database 

Version: 0.0.14 Date: November 7, 2014 [Changelog](CHANGELOG.md) 

Alasql - '[à la SQL](http://en.wiktionary.org/wiki/%C3%A0_la)' - is a lightweight client-side in-memory SQL database designed to work in browser and Node.js. 

* Alasql was written with pure JavaScript and does not use browser WebSQL database. 
* Alasql is fully functional compact sql server with JOINs, GROUPs, UNIONs, ANY, ALL, IN, subqueries and very limited transactions support.
* Alasql supports ROLLUP(), CUBE() and GROUPING SETS() functions
* Alasql works with all modern versions of browsers (Chrome, Firefox, IE, Safari), Node.js, and mobile iOS and Android.
* Alasql is fast, because it uses some optimization methods.

Check Alasql vs other JavaScript databases: 
* [Alabase vs. WebSQL](http://jsperf.com/alasql-js-vs-websql)
* [Alabase vs. SQL.js](http://jsperf.com/sql-js-vs-alasql-js/4)

Warning: Alasql project is very young and still in active development phase, therefore it may has some bugs. Please, wait a little bit before start to use it in production. I am going to add more tests and clean 
the code before relaese more stable version 0.1.0 in the mid of November.

## Examples

Try Alasql in Fiddle: [sample 1](http://jsfiddle.net/38hj2uwy/6/), [sample 2](http://jsfiddle.net/6a06dqhc/3/), [sample 3](http://jsfiddle.net/606ksx2g/1/)


Other examples:
* [Sandbox](examples/sandbox.html)
* [Sieve of Eratosthenes](examples/prime.html)

## Installation

### In browser

Include file: [alasql.js](./alasql.js) to the page.

```
  <script src="alasql.js"></script>  
  <script>
    alasql.exec("CREATE TABLE test (language INT, hello STRING)");
    alasql.exec("INSERT INTO test VALUES (1,'Hello!')");
    alasql.exec("INSERT INTO test VALUES (2,'Aloha!')");
    alasql.exec("INSERT INTO test VALUES (3,'Bonjour!')");
    console.table(alasql.exec("SELECT * FROM test WHERE language > 1"));
  </script>

```

You can use alasql.js with define()/require() functions in browser as well, because it supports AMD and UMD.

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
    db.tables.test.data = [   // You can mix SQL and JavaScript
        {one:3,two:4},
        {one:5,two:6},
    ];
    var res = db.exec("SELECT * FROM test ORDER BY two DESC");
    console.log(res[0].one);

```

### Supported SQL statements

* SELECT fields FROM tableid1 JOIN tableid2 ON oncond WHERE cond GROUP BY v1,v2 HAVING cond ORDER BY a,b, LIMIT number OFFSET number
* INSERT INTO table \[ (field1, field2) \] VALUES (value1, value2)
* UPDATE table SET field = value1, field = value2 WHERE condition 
* DELETE FROM table WHERE condition 
* CREATE TABLE \[IF NOT EXISTS\] table
* DROP TABLE \[IF EXISTS\] table

#### SELECT statement

Now Alasql.js supports following subset of SELECT syntax:

* SELECT column1, column2 AS alias3, FUNCTION(field4+field5) AS alias6, SUM(expression7) AS alias8, *, table2.*
* FROM table1, table2, (SELECT * FROM table3) alias
* LEFT / RIGHT / INNER  JOIN table2 ON condition / USING columns
* WHERE condition
* GROUP BY column1, column2, ROLLUP(a,b), CUBE(c,d,e), GROUPING SETS(g,h)
* HAVING condition
* ORDER BY column1, column2 DESC, 
* LIMIT number [OFFSET number]
* UNION / UNION ALL select / INTERSECT / EXCEPT

#### Operators

* +, -, *, /, %, AND, OR, NOT, BETWEEN, NOT BETWEEN, EXISTS (Subquery), > ALL (subquery), > ANY/SOME (subquery)

#### Functions

* ABS
* IIF
* IFNULL
* INSTR
* LOWER
* UPPER

#### Aggregators

* SUM()
* COUNT() 
* MIN()
* MAX()
* FIRST()
* LAST()
* Sorry, AVG still does not work

#### Grouping functions

* ROLLUP()
* CUBE()
* GROUPING SETS()


#### User-defined JavaScript functions

You can use all benefits of SQL and JavaScript togeather by defining user functions. Just add new functions
to alasql.userlib object:

```
        alasql.userlib.DOUBLE = function(x){return x*2};        
        db.exec('SELECT a, DOUBLE(a) AS b FROM test1');
```
Now Alasql supports only one parameter for functions. Hope I fix this soon.

### alasql

alasql is a main variable of module. You can use it immediatly as default database

In browser:
```
    <script src="alasql.js"></script>
    <script>
        alasql.exec('CREATE TABLE one (two INT)');
    </script>
```

or in Node.js:
```
    var alasql = require('alasql');
    alasql.exec('CREATE TABLE one (two INT)');
```

Another approach is to create new database:

```
    var mybase = new alasql Database();
    mybase.exec('CREATE TABLE one (two INT)');
```
You can give a name to database and then access it from alasql:
```
    var mybase = new alasql Database('mybase');
    console.log(alasql.databases.mybase);
```

Each database can be used with the following methods:

* vat db = new alasql.Database() - create new alasql-database
* var res = db.exec("sql-statement") - executes SELECT query and returns array of objects 

Usually, alasql.js works synchronously, but you can use callback.

```
    db.exec('SELECT * FROM test', function(res){
    	console.log(res);
    });
```

or you can use aexec() - promised version of exec (in this case you need to install [es6-promise](https://www.npmjs.org/package/es6-promise) module for Node.js) (this feature is experimental and may be removed in a future to reduce dependices):
```
    db.aexec('SELECT * FROM test').then(function(res){
        console.log(res);
    });
```
You can use compile statements:
```
    var insert = db.compile('INSERT INTO one (1,2)');
    insert();
```

You can use parameters in compiled statements:

```
    var insert1 = db.compile('INSERT INTO one (?,?)');
    var insert2 = db.compile('INSERT INTO one ($a,$b)');
    var insert3 = db.compile('INSERT INTO one (:a,:b)');

    insert1([1,2]);
    insert2({a:1,b:2});
    insert3({a:3,b:4});

    db.exec('INSERT INTO one (?,?)',[5,6]);

```

### Transactions

There is a limited support of transactions (with tx.rollback() and tx.commit() functions):

```
    db = new alasql.Database("mydb");
    db.transaction(function(tx) {
        tx.exec('SELECT COUNT(*) FROM students');
        tx.rollback();
    });     

```

### SQL to JavaScript parser and compiler

You can use Alasql to parse to AST and compile SQL statements:

```
    // Parse to AST
    var ast = alasql.parse("SELECT * FROM one");

    // Compile to JavaScript function with or without parameters
    var statement = alasql.compile("SELECT * FROM one WHERE a > ? AND b < ?");
    statement([1,5]);
```

Alasql uses wonderful [Jison](jison.org) parser to produce AST-tree.


### Performance

According the preliminary performance tests alasql.js is faster than [sql.js]() in 5 to 10 times on more than 1000 records tables, and 2 to 3 times to [WebSQL]() on different queries. 

Alasql has four different optimization algorithm:
* Caching of compiled queries
* Joins: Preindexation of joined table
* Joins: Prefiltering of WHERE expressions

Now optimization algorithm has some limitations and therefore "table1 JOIN table2 USING column1, column2" is faster than "table1 JOIN table2 ON table1.column1 = table2.column1 AND table1.column2 = table2.column2 ", but with one column it is ok.

### Limitations

It is Ok with select for 1000000 records or 2 join two tables by 10000 records in each. 

### Tests

I use mocha for tests. Run mocha from command line:

```
    mocha
```
or run [test/main.html](test/main.html) in browser.


### Known Bugs

1. Semicolon with multiple statements
2. ORDER BY clause on three or more UNIONS
3. AVG() does not work
4. There are many of others. Please, [give me a chance](https://github.com/agershun/alasql/issues) to fix them  
### Future Plans

Read my [to do](TODO.md) page

## Similar projects (SQL database, MDX/OLAP on JavaScript)
SQL-database:
* [sql.js](https://github.com/kripken/sql.js) - port of SQLike to JavaScript
* [SequelSphere](http://www.sequelsphere.com/) - commercial SQL-database
* [Datamanip](https://github.com/RossKor/datamanip.js)
* [jsonQ.js](https://github.com/emasstudio/jsonQ.js)
* [SQittle](https://github.com/moxley/sqittle)
* [SQLinJS](https://github.com/nuxy/SQLinJS)
* [jQuery-SQL-Emulator](https://github.com/maciakl/jQuery-SQL-Emulator)

LINQ realizations:
* [SQLike](http://www.thomasfrank.se/sqlike.html) - 
* [JSLINQ](http://jslinq.codeplex.com/)
* [JavaScriptSQL](http://javascriptsql.sourceforge.net/ARCH/en/index.html)
* [TrimQuery](https://code.google.com/p/trimpath/wiki/TrimQuery)
* [jlinq](http://www.hugoware.net/projects/jlinq)
* [jSQL](https://github.com/PaulGuo/jSQL)

Other:
* [dom-storage-query-language](https://code.google.com/p/dom-storage-query-language/)
* [kombai-js](https://code.google.com/p/kombai-js/)

JavaScript databases:
* [SearchJS](https://github.com/deitch/searchjs)
* [TaffyDB](http://www.taffydb.com/)
* [River](https://github.com/andykent/river)
* [CrossFilter](https://github.com/square/crossfilter)
* [js-hypercube](https://github.com/thesmart/js-hypercube)
* [cubico](https://github.com/diegodayan/cubico)
* [SimpleMemolap](https://github.com/ajlopez/SimpleMemolap)

## Other

* [Press about Alasql](PRESS.md)

## Credits

Many thanks to Andrew Kent for his SQL Parser and other people for useful tools, which made our work much easier.

## License

(c) 2014, Andrey Gershun (agershun@gmail.com), [MIT licence information](LICENSE)

