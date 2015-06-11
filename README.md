
# AlaSQL - a versatile javascript SQL database




[![bitHound Score](https://www.bithound.io/github/agershun/alasql/badges/score.svg)](https://www.bithound.io/github/agershun/alasql)       [![NPM downloads](http://img.shields.io/npm/dm/alasql.svg?style=flat&label=npm downloads)](https://npmjs.org/package/alasql)      ![Stars](https://img.shields.io/github/stars/agershun/alasql.svg?label=Github%20%E2%98%85)       ![Release](https://img.shields.io/github/release/agershun/alasql.svg?label=Last release)      ![NPM version](https://img.shields.io/npm/l/alasql.svg) 



AlaSQL - _([à la] (http://en.wiktionary.org/wiki/%C3%A0_la) [SQL](http://en.wikipedia.org/wiki/SQL)) [ælæ ɛskju:ɛl]_ - is a javascript SQL database library for both relational data and schemaless data with a strong foucus on query speed and flexibillity for datasources. It works in your browser, Node.js, IO.js and Apache Cordova.




We focus on [speed](speed) by taking advantage of the dynamic nature of javascript when building up queries. Real world solutions demand real world flexibility regarding where data comes from and where it is to be stored. We focus on flexibility by making sure you can [import/export](import+export) and query directly on data stored in your own JSON object, Excel files, localStorage, IndexedDB, and SQLite. 


The library brings you the comfort of a full database engine to your javascript app. No, really - its a full database engine complying with SQL-92 and spiced up with additional syntax for handling noSQL (schemaless) data. We are working towards helping projects porting from native databases by letting you specify either AlaSQL, Postgres, ORACLE, MSSQL, MySQL, or SQLite as flavor for the SQL behavior.  


----

> Get the file (CDN): [jsDelivr.com](http://www.jsdelivr.com/#!alasql)

> Documentation: [Github wiki](https://github.com/agershun/alasql/wiki)

> Feedback: [open an issue](https://github.com/agershun/alasql/issues/new)

> Website: [alasql.org](http://AlaSQL.org)

----


## Its easy - sweet!

For the browser AlaSQL is easy to use. 

Link to [alasql.min.js](http://cdn.jsdelivr.net/alasql/latest/alasql.min.js) and call 
`alasql()` with your SQL statements:

```html
<script src="//cdn.jsdelivr.net/alasql/0.1/alasql.min.js"></script> 

<script>
    
	alasql("CREATE TABLE cities (city string, population number)");
        
	alasql("INSERT INTO cities VALUES ('Rome',2863223), ('Paris',2249975), ('Berlin',3517424),  ('Madrid',3041579)");
        
	var res = alasql("SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC");
   
   // res now contains this object:
   // [{"city":"Madrid","population":3041579},{"city":"Rome","population":2863223},{"city":"Paris","population":2249975}] 	
   
</script>
```
Play with this example in [jsFiddle](http://jsfiddle.net/xxh13gLa/) 


----

### Node.js


[![NPM](https://nodei.co/npm/alasql.png)](https://nodei.co/npm/alasql/) [![NPM](https://nodei.co/npm-dl/alasql.png?months=6)](https://nodei.co/npm/alasql/)

For node its (also) easy to use. 
Install with npm

```
    npm install alasql
```

require the alasql.js file and go SQL-crazy


```js
    var alasql = require('alasql');

    var db = new alasql.Database();
    
    db.exec("CREATE TABLE test (a INT, b INT)");

    // You can insert data directly from javascript object
    db.tables.test.data = [   
        {a:3,b:4},
        {a:5,b:6},
    ];

    // or insert data with normal SQL 
    db.exec("INSERT INTO test VALUES (1,3)");
    
    var data = db.exec("SELECT * FROM test ORDER BY b DESC");
    // Data will now contain an array of objects (all 3 elements) 
    
    // to get the "a" of the first element
    console.log(data[0].a); // 5
    
```






## Why we are proud of AlaSQL?

* AlaSQL ♥ d3.js [see why](https://github.com/agershun/alasql/wiki/readme#d3js--alasql)
* AlaSQL ♥ Meteor [see why](https://github.com/agershun/alasql/wiki/readme#alasql-and-meteor)
* AlaSQL ♥ Angular.js [see why](https://github.com/agershun/alasql/wiki/readme#angularjs-and-alasqljs)
* AlaSQL ♥ Google Maps [see why](https://github.com/agershun/alasql/wiki/readme#google-maps--alasql)
* AlaSQL ♥ your JSON data [see why](https://github.com/agershun/alasql/wiki/readme#javascript-sugar)
* AlaSQL ♥ Google Spreadsheets [see why](https://github.com/agershun/alasql/wiki/readme#google-maps--alasql)
* Search paths in graph data
* Read and write Excel, CSV, TAB, JSON, and text files to/from the database
* Got some CPU intensive SQL? AlaSQL plays nice as a WebWorker
* AlaSQL works with all modern versions of browsers Chrome, Firefox, IE, Safari, Opera, Node.js, mobile iOS, Android and Apache Cordova.
* AlaSQL can to work directly with JavaScript objects and functions inside SQL and it can search JSON objects from your JavaScript and NoSQL databases
* User-defined JavaScript functions in your SQL (```SELECT myJSfunc(firstname, lastname) as name, seat, time FROM tableA```)
* AlaSQL supports file, IndexedDB, and localStorage (with AUTOCOMMIT ON and AUTOCOMMIT OFF modes) as persistent storage. 
* Use "good old" SQL with all* (expected) functionality including multiple levels of ```JOIN```, ```VIEW```, ```GROUP```, ```UNION```, ```PRIMARY KEY```, ```ANY```, ```ALL```, ```IN```, ```ROLLUP()```, ```CUBE()```, ```GROUPING SETS()```, ```CROSS APPLY```, ```OUTER APPLY```, ```WITH SELECT```, and subqueries. *[Not totally yet but its under development - see the list here](https://github.com/agershun/alasql/wiki/SQL%20keywords)


###Miss a feature? 
Take charge and [add your idea](http://feathub.com/agershun/alasql/features/new) or [vote on your favorite feature](http://feathub.com/agershun/alasql) to be implemented:

[![Feature Requests](http://feathub.com/agershun/alasql?format=svg)](http://feathub.com/agershun/alasql)


## Speed - We like it fast 
Thats why we make sure to use all the tricks we can find to make javascript spit out your results as quick as possible. Among other things we make sure that: 

* Queries are cached as compiled functions. 
* Joined tables are pre-indexed
* ```WHERE``` expressions are pre-filtered for joins

But dont take our word for it. Check out AlaSQL vs other JavaScript SQL databases: 

* [AlaSQL vs. WebSQL](http://jsperf.com/alasql-js-vs-websql/7) - Mixing `SELECT`, `SUM`, `JOIN`, and `GROUP BY` on fake data (in-memory opperations for both - see [this discussion](https://github.com/agershun/alasql/issues/47))
* [AlaSQL vs. SQL.js](http://jsperf.com/sql-js-vs-alasql-js/9) - Mixing `SELECT`, `SUM`, `JOIN`, and `GROUP BY` on fake data
* [AlaSQL vs. Linq](http://jsperf.com/alasql-vs-linq-on-groupby) - `GROUP BY` on 1,048,576 rows


See more [speed related info on the wiki](https://github.com/agershun/alasql/wiki/Speed) 








## Documentation 

* [AlaSQL Wiki](https://github.com/agershun/alasql/wiki)
* [AlaSQL User Manual](http://www.slideshare.net/AndreyGershun/alasql-manual-141220-1)
* [AlaSQL Coockbok](https://github.com/agershun/alasql/wiki/Data-manipulation) - Q&A, examples
* [StackOverflow AlaSQL Q&A](http://stackoverflow.com/questions/tagged/alasql)




----

#What is new?

## AlaSQL now supports plug-ins

Now AlaSQL supports plugins system. To install the plugin you need to use REQUIRE statement, like:

```js
    alasql('REQUIRE ECHO');
    var res = alasql('ECHO 123');  // Returns simply 123
```

You can use the same command in browser or include plugins directly:

```html
    <script src="alasql.min.js"></script>
    <script src="alasql-echo.js"></script>
```

The list of exsisting packages and how to build your own is on its way...

## AlaSQL and Meteor

Install AlaSQL for Meteor from the [official package](https://atmospherejs.com/agershun/alasql):

```
    meteor add agershun:alasql
```

AlaSQL supports Meteor collections. Sounds awesome but what is it? [Dj Walker-Morgan from compose.io](https://www.compose.io/articles/meteor-sql-and-other-databases/) puts it this way:

_This lets you turn..._

    return Robots.find({}, { sort: { introduced: 1 }} ); 
     
_into_

    return alasql('SELECT * FROM ? ORDER BY introduced',[Robots]);  

_which doesn't look like a huge jump, until you realise that this works in both the browser and the server and opens up a way to do JOIN, GROUP BY, UNION, DISTINCT and others._ 


It works on the client and the server side.

Now you can use Meteor Collections as arguments. To do it simply store alasql.min.js to the client/lib directory and then apply SQL to Meteor Collections: 

```js
    Template.body.helpers({
       tasks: function () {
         return alasql('SELECT * FROM ?',[Tasks]);
       }
    });
```

Or you can use with find() options with special METEOR() from-function:
```
    return alasql('SELECT * FROM ?',[Tasks]);
    return alasql('SELECT * FROM METEOR(?)',[Tasks]);
    return alasql('SELECT * FROM METEOR(?,?)',[Tasks,{text:"Hello world!"}]);
    return alasql('SELECT * FROM METEOR(?,{text:"Hello world!"})',[Tasks]);
```

### Search paths in graph

Now you can search graphs with SEARCH operator:

```javascript
    var res = alasql('CREATE GRAPH Pablo, Maxim, Alex, Napoleon, \
      Josephine,  Kate, Julia  {age:27}, Paloma, \
      #Pablo >loves> #Julia, #Maxim >> #Julia, #Alex >> #Kate, \
      #Kate >> #Julia, #Alex >> #Paloma, #Napoleon > "loves" > #Josephine, \
      #Josephine >"knows"> #Pablo');

    var res = alasql('SEARCH PATH(#Pablo) name FROM #Napoleon ');
    // returns ['loves','Josephine','knows','Pablo']
```
You can play with grpahs in AlaSQL in [this jsFiddle example](http://jsfiddle.net/fgzya692/2/).

### Documents and graphs paradigms

AlaSQL now is multi-paradigm database with support documents and graphs. Below you can find an example
how to create graph:

```js
    alasql('CREATE GRAPH #Olga, #Helen, #Pablo, #Andrey, #Alice, \
        #Olga >> #Pablo, #Helen >> #Andrey, \
        #Pablo >> #Alice, #Andrey >> #Alice');
```

and search over it with SEARCH operator:

```js
    // Whom loves Olga?
    alasql('SEARCH / #Olga >> name');
    // ['Pablo']

    // Whom loves Olga's love objects?
    alasql('SEARCH / #Olga >> >> name');
    // ['Alice']

    // Who loves lovers of Alice?
    alasql('SEARCH / ANY(>> >> #Alice) name');
    // ['Olga','Helen']

```

You also make searches over JSON object with SEARCH operator:

```js
    var data = {a:{a:{a:{a:{b:10}}}},b:20};
    var res = alasql('SEARCH a b FROM ?',[data]);
    var res = alasql('SEARCH (a)+ b FROM ?',[data]);
    var res = alasql('SEARCH (a a)+ b FROM ?',[data]);
    var res = alasql('SEARCH (a a a)+ b FROM ?',[data]);
    var res = alasql('SEARCH (/)+ b FROM ?',[data]);
    var res = alasql('SEARCH /+b FROM ?',[data]);
    var res = alasql('SEARCH a* b FROM ?',[data]);
    var res = alasql('SEARCH a+ b FROM ?',[data]);
    var res = alasql('SEARCH a? b WHERE(b>20) FROM ?',[data]);
```
Please see more examples in test300-test309.js. All these features will be documented soon.

### Version upgrade from 0.0.51 to 0.1.0

AlaSQL now is 6 month old and it can change minor release number from 0.0 to 0.1. 

As we decided earlier, we will change version number to 0.1 after cleaning some 
known bugs and problems (including [UNION CORRESPONDING](https://github.com/agershun/alasql/issues/75) issue and [IE9 file saving](https://github.com/agershun/alasql/issues/73)). 

The plans and priorities for development from version 0.1 to 0.2 will be:
* Wiki documentation
* Fixing bugs and clean the code
* Add graph- and document- database paradigm functionality
* Prepare to convert AlaSQL to modular structure (AlaSQL2)

Other areas of future improvements (please add and vote for new features on [Feathub](http://feathub.com/agershun/alasql)):
* Better Apache Cordova and other mobile frameworks support
* Improve export to XLS and XLSX (adding colors and LibreOffice support)
* Support key-value external storages and NoSQL databases
* Add some missing SQL functionality (constraints, foreign keys, etc.)

### AlaSQL export to Excel with colors (2)

Now AlaSQL can save files to Excel and LibreOffice formats with colors and other
Excel formatting functions. This function also work in IE9. This is a code sample:

```js
    var mystyle = {
      headers:true, 
      column: {style:{Font:{Bold:"1"}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    alasql('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[mystyle,data]);
```
See the working example in [jsFiddle](http://jsfiddle.net/95j0txwx/7/)


### AlaSQL export to Excel with colors (1)

Now AlaSQL can export data to XLS format with coloring cells

```js
    var opts = {
      headers: true,
      sheetid: 'My Birds',
      style:"background:#00ff00",
      columns: [
        {columnid:'a',title:'Albatroses',
          style:'background:red;font-size:20px',
          cell:{style:'background:blue'}
        },
        {columnid:'b',title:'Bird',cell:{
          style:function(value,sheet,row,column,rowidx,columnidx){
            return 'background'+(value==10?'brown':'white')
        }}},
        { 
          columnid: 'b', cell:{value:function(value){ return value * value}}
        }
      ]
    };

    var res = alasql('SELECT * INTO XLS("restest257a.xls",?) FROM ?',[opts,data]); 

```
Please, see the example with advanced color syntax [in jsFiddle](http://jsfiddle.net/agershun/95j0txwx/2/).

### AlaSQL and Google Spreadsheets (with Tabletop)

Now AlaSQL can read data (and make other manipulations like grouping, filtering, or saving to XLSX) directly from Google Spreadsheets. It uses wonderful [Tabletop library](https://github.com/jsoma/tabletop).

```html
<script src='../../console/tabletop.js'></script>
<script src='../../console/alasql.min.js'></script>
<div id="res"></div>
<script>
    var url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE&output=html';

    alasql('SELECT * INTO HTML("#res",{headers:true}) FROM TABLETOP(?) WHERE name < "D" ORDER BY category',[url]);
</script>
```

You can try this example [in jsFiddle](http://jsfiddle.net/ezy7rhhd/32).

### AlaSQL as a WebWorker

AlaSQL can work as a webworker. Include alasql-worker.js and that is it: AlaSQL will work as a webworker.

```html
    <script src="alasql-worker.min.js"></script>
    <script>
        var arr = [{a:1},{a:2},{a:1}];
        alasql('SELECT * FROM ?',[arr],function(data){
            console.log(data);
        });
    </script>    
```
Try the example [at jsFiddle](http://jsfiddle.net/agershun/oxv4rzzc/).

Another option - run alasql.worker() function:

```html
    <script src="alasql.min.js"></script>
    <script>
         alasql.worker();
         var res = alasql('select value 10',[],function(res){
              console.log(res);
         });
    </script>
```
Try this example [in jsFiddle](http://jsfiddle.net/agershun/rjwp8u48/3/).

Also you can use AlaSQL in webworker just simply load it as a script:

```js
    importScripts('alasql.min.js');
```

### Read and write Excel, CSV, TAB, JSON,  and text files to/from database

Now AlaSQL can work with files in XLS, XSLX, CSV, TAB, TXT, and JSON format

```js
    alasql('select * into one from csv("mydata.csv")');
    alasql('select Country, Name from xlsx("cities.xlsx",{headers:true, range:"B1:E10"})\
        where Population > 100000',
        [],function(data){
        console.log(data);
    });
```
See [test168](test/test168.js) - [test169](test/test169.js)

### d3.js + AlaSQL

AlaSQL can be used with d3.js to create diagrams, like the example below. Here AlaSQL
read Excel file with Olympic Prizes, group and sort rows by one of the axes, and then
take top 10 records and create a list with axe values:

```js
    function graph(axe) {
        alasql('SELECT TOP 10 '+axe+', SUM([Gold Medals]) AS Gold, \
            SUM([Silver Medals]) AS Silver, SUM([Bronze Medals]) AS Bronze \
            FROM XLSX("medals.xlsx",{headers:true}) \
            GROUP BY '+axe+' ORDER BY '+axe,[],function(data){

            d3.select("body")
            .append('ul')
            .data(data)
            .entry()
            .append('li')
            .text(function(d){return d[axe]});
        });
    }

    graph('Axe');

```

Try the [simple example](http://alasql.org/demo/005d3/) of AlaSQL + d3.js integration.


### Google Maps + AlaSQL
```js
    alasql("SELECT * FROM CSV("https://cdn.rawgit.com/albertyw/avenews/master/old/data/average-latitude-longitude-countries.csv",{headers:true})', [], function(country){
        var mapOptions = { zoom : 3, center : new google.maps.LatLng(40, 0),
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        for (i = 0; i < country.length; i++) {
            var opts = {
                strokeColor : '#000000',
                fillColor : ["red","green","blue","brown"][i%4],
                fillOpacity : 0.35,
                map : map,
                center : new google.maps.LatLng(country[i].Latitude,country[i].Longitude),
                radius : 100000
            };
            new google.maps.Circle(opts);
    });
```
Check [this example](http://alasql.org/demo/009geo) and [this example](http://jsfiddle.net/agershun/1o2xq1yh/2/) of integrations AlaSQL and Google Maps.

### ETL sample: CSV and IndexedDB database

Upload CSV file with headers to IndexedDB database, and then save only asian countries 
to Excel file:
```js
    alasql('ATTACH INDEXEDDB DATABASE geo; \
            CREATE TABLE IF NOT EXISTS geo.country; \
            SELECT * INTO geo.country FROM CSV("country.csv",{headers:true}); \
            SELECT * INTO XLSX("asia.xlsx") FROM geo.country WHERE continent_name = "Asia"');
```
See [the example](http://alasql.org/demo/001csv/). 

### Read SQLite database files

AlaSQL can work with SQLite data files on the top of with [SQL.js](https://github.com/kripken/sql.js) library:
```html
    <script src="alasql.js"></script>
    <script src="sql.js"></script>
    <script>
        alasql('ATTACH SQLITE DATABASE Chinook("Chinook_Sqlite.sqlite");\
            USE Chinook; \
            SELECT * FROM Genre',[],function(res){
                console.log("Genres:",res.pop());
        });
    </script>
```

See more detailed [the example](http://alasql.org/demo/004sqlite/).

### Angular.js and AlaSQL.js

You can use AlaSQL together with Angular.js framework:

```js
    $scope.exportData = function () {
        alasql('SELECT * INTO XLSX("john.xlsx",{headers:true}) FROM ?',[$scope.items]);
    };
```
See [simple example in jsFiddle](http://jsfiddle.net/agershun/00nfeq12/).

Other examples of AlaSQL and Angular.js integration: 

* [Calculating average of array](http://jsfiddle.net/agershun/she06Lq3/2/)

## Examples

Try AlaSQL in console:
* AlaSQL Console [http://alasql.org/console](http://alasql.org/console)
* [Console source code](console/index.html)
* [Alacon](alacon.js) - command-line AlaSQL console (to run: ```alacon "sql-statement" params...```)
* [Alaserver](alaserver.js) - very simple AlaSQL-server (to run: ```alaserver```, then 
type in browser "http://127.0.0.1:1337/?SELECT VALUE 2*2" )

Try AlaSQL in Fiddle: 
* Simple examples: [sample 1](http://jsfiddle.net/38hj2uwy/10/), [sample 2](http://jsfiddle.net/38hj2uwy/6/), [sample 3](http://jsfiddle.net/6a06dqhc/3/), [sample 4](http://jsfiddle.net/606ksx2g/1/), [sample 5](http://jsfiddle.net/agershun/38hj2uwy/40/)
* [IndexedDB example](http://jsfiddle.net/agershun/1t2rrr78/)
* [AlaSQL Sandbox](http://jsfiddle.net/czqfyhat/2/) - [source](examples/sandbox.html)
* [Sieve of Eratosthenes](http://jsfiddle.net/agershun/1u05op11/) - [source](examples/prime.html)

Other examples:
* [World database](http://alasql.org/console?source 'world.sql';select top 10 * from City) - [source](console/index.html)
* Mini-ETL: [upload CSV data to IndexedDB database](http://alasql.org/demo/001csv/)
* [More than 200 of AlaSQL tests](test)

### What People Say about AlaSQL?

* [What people around the world say about AlaSQL](PEOPLE.md)

### Presentations

* [AlaSQL.js - fast JavaScript in-memory SQL database](http://www.slideshare.net/AndreyGershun/alasqljsfast-javascript-inmemory-sql-database)
* [SQL and NoSQL in AlaSQL database](http://www.slideshare.net/AndreyGershun/sql-and-nosql-in-alasql)

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
Try this sample in [AlaSQL console](http://alasql.org/console?CREATE TABLE test (language INT, hello STRING);INSERT INTO test VALUES (1,'Hello!');INSERT INTO test VALUES (2,'Aloha!');INSERT INTO test VALUES (3,'Bonjour!');SELECT * FROM test WHERE language > 1)

You can use alasql.js with define()/require() functions in browser as well, because it supports AMD and UMD:

```js
    require(['../../alasql.js'], function(alasql) {
        var test1 = [{a:1,b:2,c:3},{a:4,b:5,c:6},{a:7,b:8,c:9}];
        console.table(alasql('SELECT a, b*c AS bc FROM ? AS t',[test1]));
    });
```
Like in this sample you do not need to CREATE TABLE and INSERTS if you do not need constraints functionality.


### Supported SQL statements

* SELECT TOP number columns INTO table FROM tableid1 JOIN tableid2 ON oncond WHERE cond GROUP BY v1,v2 HAVING cond ORDER BY a,b, LIMIT number OFFSET number
* INSERT INTO table \[ (field1, field2) \] VALUES (value1, value2), (value3, value4), ...
* INSERT INTO table SELECT subquery
* UPDATE table SET field = value1, field = value2 WHERE condition 
* DELETE FROM table WHERE condition 
* CREATE TABLE \[IF NOT EXISTS\] table (columns type PRIMARY KEY, constraints)
* ALTER TABLE ADD COLUMN / DROP COLUMN
* DROP TABLE \[IF EXISTS\] table
* CREATE DATABASE, USE DATABASE, DROP DATABASE
* SHOW DATABASES / SHOW TABLES / SHOW COLUMNS / SHOW CREATE TABLE
* SOURCE 'url-file.sql'
* ASSERT json-object
* Expression (like SELECT expression)

Try all these statements in [AlaSQL console](http://alasql.org/console?help)

#### SELECT statement

AlaSQL.js supports following subset of SELECT syntax:

* SELECT column1, column2 AS alias3, FUNCTION(field4+field5) AS alias6, SUM(expression7) AS alias8, *, table2.*
* TOP number
* FROM table1, table2, (SELECT * FROM table3) alias
* LEFT / RIGHT / INNER / OUTER / ANTI / SEMI / CROSS / NATURAL JOIN table2 ON condition / USING columns
* WHERE condition
* GROUP BY column1, column2, ROLLUP(a,b), CUBE(c,d,e), GROUPING SETS(g,h)
* HAVING condition
* ORDER BY column1, column2 DESC, 
* LIMIT number [OFFSET number]
* UNION / UNION ALL select / INTERSECT / EXCEPT

Operators:

* +, -, *, /, %, AND, OR, NOT, BETWEEN, NOT BETWEEN, EXISTS (Subquery), > ALL (subquery/array), > ANY/SOME (subquery / array), [NOT] IN (subquery / array), LIKE
* CAST (expression AS type)

Aggregators:

* SUM(), COUNT(), MIN(), MAX(), FIRST(), LAST(), AVG(), AGGR(), ARRAY(), REDUCE()

GROUP BY Grouping functions:

* ROLLUP(), CUBE(), GROUPING SETS()

Functions:

* ABS(), IIF(), IFNULL(), INSTR(), LOWER(), UPPER(), LCASE(), UCASE(), LEN(), LENGTH()
* GREATEST(), LEAST()

SELECT modifiers (non-standard SQL):
* SELECT VALUE - get single value
* SELECT ROW - get first row as an array
* SELECT COLUMN - get first column as an array
* SELECT MATRIX - get all results as an array of arrays

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
Try this sample in [AlaSQL console](http://alasql.org/console?CREATE TABLE one (two INT))


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

or you can use promise() - promised version of exec (in this case you need to install [es6-promise](https://www.npmjs.org/package/es6-promise) module for Node.js) (this feature is experimental and may be removed in a future to reduce dependices):
```js
    alasql.promise('SELECT * FROM test')
    }).then(function(res){
        // Process data
    }).catch(function(err){
        // Process errors
    });
```
You can use compile statements:
```js
    var insert = db.compile('INSERT INTO one (1,2)');
    insert();
```

You can use parameters in compiled and interpreted statements:

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

By default, AlaSQL is case-insensitive to all standard keywords (like SELECT) and standard functions (like ABS()). All database names, table names, column names, and user-defined functions are case sensitive. 

JavaScript is case-sensitive language, so use the same CaSe for AlaSQL and JavaScript data.

Now you can use databases, tables, and columns with spaces inside square brackets:

```sql
    CREATE DATABASE [My Database];  -- BTW You can use comments in the SQL statements
    USE [My Database];              /* or comments like this */   
    CREATE TABLE [A.table] ([the-column] INT);
    INSERT INTO [A.table] VALUES (1),(2);
    SELECT [the-column] AS [AS] FROM [My Database];
```
Try this sample in [AlaSQL console](http://alasql.org/console?CREATE DATABASE [My Database];USE [My Database];CREATE TABLE [A.table] ([the-column] INT);INSERT INTO [A.table] VALUES (1),(2);SELECT [the-column] AS [AS] FROM [My Database])


### JavaScript Sugar

AlaSQL extends "good old" SQL to make it closer to JavaScript. The "sugar" includes:

* Json objects - ``` {a:1,b:@[1,2,3]}
* Object propertires - ```obj->property->subproperty```
* Object and arrays elements - ```obj->(a*1)```
* JavaScript functions - ```obj->valueOf()```
* SELECT VALUE, ROW, COLUMN, MATRIX to format results of query

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

You can use AlaSQL to parse to AST and compile SQL statements:

```js
    // Parse to AST
    var ast = alasql.parse("SELECT * FROM one");
    console.log(ast.toString()); // Print restored SQL statement

    // Compile to JavaScript function with or without parameters
    var statement = alasql.compile("SELECT * FROM one WHERE a > ? AND b < ?");
    statement([1,5]);
```

AlaSQL uses wonderful [Jison](http://jison.org) parser to produce AST-tree.


### localStorage and DOM-storage
You can use browser localStorage and [DOM-storage](https://github.com/node-browser-compat/dom-storage) as a data storage. Here is a sample:

```
    alasql('CREATE localStorage DATABASE IF NOT EXISTS Atlas');
    alasql('ATTACH localStorage DATABASE Atlas AS MyAtlas');
    alasql('CREATE TABLE IF NOT EXISTS MyAtlas.City (city string, population number)');
    alasql('SELECT * INTO MyAtlas.City FROM ?',[[{city:'Vienna', population:1731000}, 
        {city:'Budapest', population:1728000}]]);
    var res = alasql('SELECT * FROM MyAtlas.City');
    console.log(res);
```

Try this sample in [jsFiddle](http://jsfiddle.net/agershun/x1gq3wf2/). Run this sample 
two or three times, and AlaSQL store more and more data in localStorage. Here, "Atlas" is 
the name of localStorage database, where "MyAtlas" is a memory AlaSQL database.

You can use localStorage in two modes: SET AUTOCOMMIT ON to immediate save data
to localStorage after each statement or SET AUTOCOMMIT OFF. In this case you need
to use COMMIT statement to save all data from in-memory mirror to localStorage.

### Work with CSV, TAB, TXT, and JSON files
You can use files in these formats directly from AlaSQL (in sync and async modes):

```js
    var res1 = alasq("select * from txt('mytext.txt') where [0] like 'M%'");
    var res2 = alasq("select * from tab('mydata.tab') order by [1]");
    var res3 = alasq("select [3] as city,[4] as population from csv('cities.csv')");
    
    alasq("select * from json('array.json')",[],function(res4){
        console.log(res4)
    });
```

See [test157.js](test/test157.js) as an example.

### JSON-object

You can use JSON objects in your databases (do not forget use == and !== operators for deep comparision of objects):

```sql

alasql> SELECT VALUE @{a:1,b:2}

{a:1,b:2}

alasql> SELECT VALUE @{a:1,b:2} == @{a:1,b:2}

true

alasql> SELECT VALUE @{a:1,b:2}->b

2

alasql> SELECT VALUE @{a:1,b:(2*2)}->b

4

```

Try AlaSQL JSON objects in  Console [sample](http://alasql.org/console?drop table if exists one;create table one;insert into one values @{a:@[1,2,3],c:{e:23}}, @{a:@[{b:@[1,2,3]}]};select * from one)

### Alacon - command-line utility

You can use AlaSQL from the command-line:
```sql
    > alacon "SELECT VALUE 1+1"
    2
    > alacon "SELECT VALUE 1+?" 2
    3
    > alacon "@{a:(1+?)}" 3
    4
```

### Alaserver - simple database server

Yes, you can even use AlaSQL as a very simple server for tests.

To run enter the command: 
```
    alaserver [port]
```
then type in browser something like "http://127.0.0.1:1337/?SELECT VALUE 2*2" 

Warning: Alaserver is not multi-thread, not concurent, and not secured.


### Performance

According the preliminary performance tests alasql.js is faster than [sql.js]() in 5 to 10 times on more than 1000 records tables, and 2 to 3 times to [WebSQL]() on different queries. 

AlaSQL has four different optimization algorithm:
* Caching of compiled queries
* Joins: Preindexation of joined table
* Joins: Prefiltering of WHERE expressions

Now optimization algorithm has some limitations and therefore "table1 JOIN table2 USING column1, column2" is faster than "table1 JOIN table2 ON table1.column1 = table2.column1 AND table1.column2 = table2.column2 ", but with one column it is ok.

### Limitations

It is Ok with select for 1000000 records or to join two tables by 10000 records in each. 
Now you can use streamming functions to work with longer datasources (see [test/test143.js](test/test143.js)).

## Tests

### Tests with Mocha
AlaSQL uses ```mocha``` for tests. Run mocha from command line in directory with tests:

```
    > cd test
    > mocha .
```
or run [test/index.html](test/index.html) for tests in browser.

### Tests with AlaSQL ASSERT from SQL

Now you can use AlaSQL [ASSERT](wiki/Assert)  operator to test results of previous operation:

```sql
    CREATE TABLE one (a INT);
    ASSERT 1;
    INSERT INTO one VALUES (1),(2),(3);
    ASSERT 3;
    SELECT * FROM one ORDER BY a DESC;
    ASSERT [{a:3},{a:2},{a:1}];
```

### SQLLOGICTEST

AlaSQL uses SQLLOGICTEST to test it compatibility aith SQL-92. The tests include about 140000 
different queries and statements.

Result for all test files without select4.test and select5.test in total on May 19, 2015 15:45

* tests - 138365
* parsed ok - 135205 (98%)
* run ok - 86330 (62%) <----- this is the most important number in the test
* time - 452s

See detailed information at [TESTLOG](TESTLOG.md).

### Warnings 
AlaSQL project is very young and still in active development phase, therefore it may have some bugs. Please, wait a little bit before start to use it in production. I am going to add more tests and clean the code before relaese more stable version 0.1.0. Please, submit any bugs and suggestions in [Issues page](https://github.com/agershun/alasql/issues).

You can check next version branches for new experimental features. 

## Known Bugs and Limitations

1. ORDER BY clause on three or more UNIONS ( [See example in AlaSQL console](http://alasql.org/console?select 10 as a union all select 20 as a union all select 30 as a order by a desc) )
2. Limited functionality for transactions (supports only for localStorage) - Sorry, transactions are limited, because AlaSQL started to use more complex approach for PRIMARY KEYS / FOREIGN KEYS. Transactions will be fully turned on again in one of the future version.


Probably, there are many of others. Please, [give me a chance](https://github.com/agershun/alasql/issues) to fix them. Thank you!
  


### FileSaver

AlaSQL includess [FileSaver.js](https://github.com/eligrey/FileSaver.js/) library inside for saving files locally from browser. Pleae be aware that it does not save files in Safari 8.0.




##Contributing

All contributions are much welcome and greatly appreciated(!). [Opening an issue](https://github.com/agershun/alasql/issues/new) and lets talk about your idea...

## License

MIT - see [MIT licence information](LICENSE)

## Main contributors

* [Andrey Gershun](http://github.com/agershun)
* [Mathias Rangel Wulff](https://twitter.com/rangelwulff)
* [Aubert Grégoire](https://github.com/gregaubert)

## Credits

Many thanks to Zach Carter for [Jison](http://zaach.github.io/jison/) parser generator, to the author of FileSaver.js, Andrew Kent for his [SQL Parser](https://github.com/forward/sql-parser), 
authors of [XLSX](https://github.com/SheetJS/js-xlsx) library,
and other people for useful tools, which make our work much easier.

### Related projects that have inspired us

* [AlaX](http://github.com/agershun/alax) - Export to Excel with colors and formats 
* [WebSQLShim](http://github.com/agershun/WebSQLShim) - WebSQL shim over IndexedDB (work in progress)
* [AlaMDX](http://github.com/agershun/alamdx) - JavaScript MDX OLAP library (work in progresss) 
* [Other similar projects](http://github.com/agershun/alasql/wiki/Similar-Projects.md) - list of databases on JavaScript

----

© 2014-2015, Andrey Gershun (agershun@gmail.com) & Mathias Rangel Wulff (mathiasrw@gmail.com)


See [the old readme](README_OLD) for reference