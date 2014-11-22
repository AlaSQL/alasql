# Alasql.js - pure JavaScript client-side in-memory fast SQL-database 

Version: 0.0.23 Date: November 22, 2014 [Change log](CHANGELOG.md), [Release plan](RELEASES.md)

Alasql - '[à la SQL](http://en.wiktionary.org/wiki/%C3%A0_la)' - is a lightweight client-side in-memory SQL database designed to work in browser and Node.js. 

* Alasql was written with pure JavaScript and does not use browser WebSQL database. 
* Alasql is fully functional compact SQL server with JOINs, GROUPs, UNIONs, PRIMARY KEYs, ANY, ALL, IN, subqueries and very limited transactions support.
* Alasql supports ROLLUP(), CUBE() and GROUPING SETS() functions
* Alasql works with all modern versions of browsers Chrome, Firefox, IE, Safari, Opera, Node.js, and mobile iOS and Android.
* Alasql is fast, because it uses some optimization methods.

Check Alasql vs other JavaScript SQL databases: 
* [Alasql vs. WebSQL](http://jsperf.com/alasql-js-vs-websql)
* [Alasql vs. SQL.js](http://jsperf.com/sql-js-vs-alasql-js/4)

### Test Alasql in console
* [SQL Console](http://alasql.org/console/alaconsole.html)
* [Console source code](examples/console/alaconsole.html)

### Warning 
Alasql project is very young and still in active development phase, therefore it may have some bugs. Please, wait a little bit before start to use it in production. I am going to add more tests and clean the code before relaese more stable version 0.1.0 in the mid of November. 
Please, submit bugs and suggestions in [issue page]().

Sorry, transactions were temporary turned off in version 0.0.17, because we started to introduce more complex approach for PRIMARY KEYS / FOREIGN KEYS. I will turn transactions on again in one of the future version.

You can check [version-0.0.23](https://github.com/agershun/alasql/tree/version-0.0.23) branch for new experimental features of new version. 

### Documentation (draft)

The early prototype of documentation will be placed on [Alasql Wiki](https://github.com/agershun/alasql/wiki).

## Examples

Try Alasql in Fiddle: [sample 1](http://jsfiddle.net/38hj2uwy/10/), [sample 2](http://jsfiddle.net/38hj2uwy/6/), [sample 3](http://jsfiddle.net/6a06dqhc/3/), [sample 4](http://jsfiddle.net/606ksx2g/1/)

Other examples:
* [Sandbox](examples/sandbox.html)
* [Sieve of Eratosthenes](examples/prime.html)
* [World database](examples/console.html)
* [Hundred of small tests](test)

### What People Say about Alasql

* [People around the world about Alasql](PEOPLE.md)

## Presentations

* [Alasql.js - fast JavaScript in-memory SQL database](http://www.slideshare.net/AndreyGershun/alasqljsfast-javascript-inmemory-sql-database) (English)

## Installation

### In browser

Include file: [alasql.js](./alasql.js) to the page.

```html
  <script src="alasql.js"></script>  
  <script>
    alasql("CREATE TABLE test (language INT, hello STRING)");
    alasql("INSERT INTO test VALUES (1,'Hello!')");
    alasql("INSERT INTO test VALUES (2,'Aloha!')");
    alasql("INSERT INTO test VALUES (3,'Bonjour!')");
    console.table(alasql("SELECT * FROM test WHERE language > 1"));
  </script>

```
Try this sample in [Alasql console](http://alasql.org/console/alaconsole.html?CREATE TABLE test (language INT, hello STRING);INSERT INTO test VALUES (1,'Hello!');INSERT INTO test VALUES (2,'Aloha!');INSERT INTO test VALUES (3,'Bonjour!');SELECT * FROM test WHERE language > 1)

You can use alasql.js with define()/require() functions in browser as well, because it supports AMD and UMD:

```js
    require(['../../alasql.js'], function(alasql) {
        var test1 = [{a:1,b:2,c:3},{a:4,b:5,c:6},{a:7,b:8,c:9}];
        console.table(alasql('SELECT a, b*c AS bc FROM ? AS t',[test1]));
    });
```
Like in this sample you do not need to CREATE TABLE and INSERTS if you do not need constraints functionality.

### In Node.js

Use the following command for installation:
```
    npm install alasql
```
Then require alasql.js file:

```js
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
* INSERT INTO table \[ (field1, field2) \] VALUES (value1, value2), (value3, value4), ...
* INSERT INTO table SELECT subquery
* UPDATE table SET field = value1, field = value2 WHERE condition 
* DELETE FROM table WHERE condition 
* CREATE TABLE \[IF NOT EXISTS\] table (columns type PRIMARY KEY, constraints)
* ALTER TABLE
* DROP TABLE \[IF EXISTS\] table
* CREATE DATABASE, USE DATABASE, DROP DATABASE
* SHOW DATABASES / SHOW TABLES / SHOW COLUMNS / SHOW CRETE TABLE

Try all these statements in [Alasql console](http://alasql.org/console/alaconsole.html?help)

#### SELECT statement

Now Alasql.js supports following subset of SELECT syntax:

* SELECT column1, column2 AS alias3, FUNCTION(field4+field5) AS alias6, SUM(expression7) AS alias8, *, table2.*
* FROM table1, table2, (SELECT * FROM table3) alias
* LEFT / RIGHT / INNER / OUTER / ANTI / SEMI / CROSS JOIN table2 ON condition / USING columns
* WHERE condition
* GROUP BY column1, column2, ROLLUP(a,b), CUBE(c,d,e), GROUPING SETS(g,h)
* HAVING condition
* ORDER BY column1, column2 DESC, 
* LIMIT number [OFFSET number]
* UNION / UNION ALL select / INTERSECT / EXCEPT

#### Operators

* +, -, *, /, %, AND, OR, NOT, BETWEEN, NOT BETWEEN, EXISTS (Subquery), > ALL (subquery/array), > ANY/SOME (subquery / array), [NOT] IN (subquery / array), LIKE

#### Aggregators

* SUM()
* COUNT() 
* MIN()
* MAX()
* FIRST()
* LAST()
* Sorry, AVG still does not work

#### GROUP BY Grouping functions

* ROLLUP()
* CUBE()
* GROUPING SETS()
#### Functions

* ABS(), IIF(), IFNULL(), INSTR(), LOWER(), UPPER(), LCASE(), UCASE(), LEN(), LENGTH()

#### User-defined JavaScript functions

You can use all benefits of SQL and JavaScript togeather by defining user functions. Just add new functions to alasql.fn object:

```js
        alasql.fn.double = function(x){return x*2};        
        alasql.fn.sum10 = function(x,y) { return x+y*10; }
        db.exec('SELECT a, double(a) AS b, sum10(a,b) FROM test1');
```

User-defined functions are related to current database. You can define different functions in different databases. 

### alasql

alasql is a main variable of module. You can use it immediatly as default database

In browser:
```html
    <script src="alasql.js"></script>
    <script>
        alasql('CREATE TABLE one (two INT)');
    </script>
```
Try this sample in [Alasql console](http://alasql.org/console/alaconsole.html?CREATE TABLE one (two INT))


or in Node.js:
```js
    var alasql = require('alasql');
    alasql('CREATE TABLE one (two INT)');
```

Another approach is to create new database:

```js
    var mybase = new alasql.Database();
    mybase.exec('CREATE TABLE one (two INT)');
```
You can give a name to database and then access it from alasql:
```js
    var mybase = new alasql.Database('mybase');
    console.log(alasql.databases.mybase);
```

Each database can be used with the following methods:

```js
    var db = new alasql.Database() - create new alasql-database
    var res = db.exec("SELECT * FROM one") - executes SELECT query and returns array of objects 
```

Usually, alasql.js works synchronously, but you can use callback.

```js
    db.exec('SELECT * FROM test', [], function(res){
    	console.log(res);
    });
```

or you can use aexec() - promised version of exec (in this case you need to install [es6-promise](https://www.npmjs.org/package/es6-promise) module for Node.js) (this feature is experimental and may be removed in a future to reduce dependices):
```js
    db.aexec('SELECT * FROM test').then(function(res){
        console.log(res);
    });
```
You can use compile statements:
```js
    var insert = db.compile('INSERT INTO one (1,2)');
    insert();
```

You can use parameters in compiled statements:

```js
    var insert1 = db.compile('INSERT INTO one (?,?)');
    var insert2 = db.compile('INSERT INTO one ($a,$b)');
    var insert3 = db.compile('INSERT INTO one (:a,:b)');

    insert1([1,2]);
    insert2({a:1,b:2});
    insert3({a:3,b:4});

    db.exec('INSERT INTO one (?,?)',[5,6]);

```
You even can use param in FROM clause: 

```js
        var years = [
            {yearid: 2012}, {yearid: 2013},
            {yearid: 2014}, {yearid: 2015},
            {yearid: 2016},
        ];

        var res = alasql.queryArray('SELECT * FROM ? AS years ' +
            'WHERE yearid > ?', [years,2014]);

        // res == [2015,2016]
```
You can use array of arrays to make a query. In this case use square brackets for column name,
like \[1\] or table\[2\] (remember, all arrays in JavaScript start with 0):
```js
        var data = [
            [2014, 1, 1], [2015, 2, 1],
            [2016, 3, 1], [2017, 4, 2],
            [2018, 5, 3], [2019, 6, 3]
        ];
        var res = alasql('SELECT SUM([1]) FROM ? d WHERE [0]>2016', [data]);
```
Use alasql.queryArrayOfArrays() function to return array of arrays. In this case
you can specify array position of selected column with number or number in brackets:
```js
        var res = alasql.queryArrayOfArrays(
            'SELECT [1] AS 0,[1]+[2] AS [1] FROM ? d WHERE [0]>2016', [data]);
```
This feature can be used as filter for arrays. Compare:
```js
        // Same filter
        var res1 = alasql.queryArrayOfArrays('SELECT * FROM ? a WHERE [0]>2016', [data]);
        var res2 = data.filter(function(a){return a[0]>2016});

        // Complex filter with aggregating, grouping and sorting
        var res = alasql.queryArrayOfArrays(
            'SELECT [2] AS 0, SUM([1]) AS 1 FROM ? a WHERE a[0]>? GROUP BY [0] ORDER BY [1]', 
            [data, 2016]);

```

### Lower and Upper Case

By default, Alasql is case-insensitive to all standard keywords (like SELECT) and standard functions (like ABS()). All database names, table names, column names, and user-defined functions are case sensitive. 

JavaScript is case-sensitive language, so use the same CaSe for Alasql and JavaScript data.

Now you can use databases, tables, and columns with spaces inside square brackets:

```sql
    CREATE DATABASE [My Database];  -- BTW You can use comments in the SQL statements
    USE [My Database];              /* or comments like this */   
    CREATE TABLE [A.table] ([the-column] INT);
    INSERT INTO [A.table] VALUES (1),(2);
    SELECT [the-column] AS [AS] FROM [My Database];
```
Try this sample in [Alasql console](http://alasql.org/console/alaconsole.html?CREATE DATABASE [My Database];USE [My Database];CREATE TABLE [A.table] ([the-column] INT);INSERT INTO [A.table] VALUES (1),(2);SELECT [the-column] AS [AS] FROM [My Database])


### Transactions

There is a limited support of transactions (with tx.rollback() and tx.commit() functions):

```js
    db = new alasql.Database("mydb");
    db.transaction(function(tx) {
        tx.exec('SELECT COUNT(*) FROM students');
        tx.rollback();
    });     

```
Warning: Sorry, transactions now are temporary unavailable due some complexities with realization.

### SQL to JavaScript parser and compiler

You can use Alasql to parse to AST and compile SQL statements:

```js
    // Parse to AST
    var ast = alasql.parse("SELECT * FROM one");
    console.log(ast.toString()); // Print restored SQL statement

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

Compare it with Lodash and Underscore:
* [Alasql vs. Lodash vs. Underscore](http://jsperf.com/alasql-vs-lodash-sort/3) 

### Limitations

It is Ok with select for 1000000 records or 2 join two tables by 10000 records in each. 

### Tests

I use mocha for tests. Run mocha from command line:

```
    mocha
```
or run [test/main.html](test/main.html) in browser.


### Known Bugs

1. Dates comparing (sorting now is ok)
2. Transactions 
3. ORDER BY clause on three or more UNIONS ( [See example in Alasql console](http://alasql.org/console/alaconsole.html?select 10 as a union all select 20 as a union all select 30 as a order by a desc) )
4. AVG() does not work 
5. There are many of others. Please, [give me a chance](https://github.com/agershun/alasql/issues) to fix them. Thank you!
  
### Future Plans

Read my [to do](TODO.md) page


### Similar projects

* [Similar projects](SIMILAR.md) (SQL database, MDX/OLAP on JavaScript)

### Credits

Many thanks to Andrew Kent for his SQL Parser and other people for useful tools, which make our work much easier.

## License

(c) 2014, Andrey Gershun (agershun@gmail.com), [MIT licence information](LICENSE)

