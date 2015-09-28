
[![bitHound Score](https://www.bithound.io/github/agershun/alasql/badges/score.svg?123)](https://www.bithound.io/github/agershun/alasql) 
[![Build status](https://api.travis-ci.org/agershun/alasql.svg)](https://travis-ci.org/agershun/alasql?123) 
[![NPM downloads](http://img.shields.io/npm/dm/alasql.svg?style=flat&label=npm%20downloads)](https://npmjs.org/package/alasql) 
[![Inline docs](http://inch-ci.org/github/agershun/alasql.svg?branch=develop)](http://inch-ci.org/github/agershun/alasql) 
![Stars](https://img.shields.io/github/stars/agershun/alasql.svg?label=Github%20%E2%98%85) 
![Release](https://img.shields.io/github/release/agershun/alasql.svg?label=Last%20release) 
![NPM version](https://img.shields.io/npm/l/alasql.svg) 



# AlaSQL


_( [à la] (http://en.wiktionary.org/wiki/%C3%A0_la) [SQL](http://en.wikipedia.org/wiki/SQL) ) [ælæ ɛskju:ɛl]_ - AlaSQL is an open source SQL database for Javascript with a strong foucus on query speed and datasource flexibillity for relational data, schemaless data, and graph data. It works in your browser, Node.js, IO.js and Cordova.

The library is designed for:

* Fast SQL based in-memory data processing for BI and ERP applications on fat clients
* Easy ETL and option for persistency by data import / manipulation / export for several formats
* All major browsers,  Node.js, and mobile applications

We focus on [speed](https://github.com/agershun/alasql/wiki/Speed) by taking advantage of the dynamic nature of javascript when building up queries. Real world solutions demands flexibility regarding where data comes from and where it is to be stored. We focus on flexibility by making sure you can [import/export](https://github.com/agershun/alasql/wiki/Import-export) and query directly on data stored in Excel (both `xls` and `.xlsx`), CSV, JSON, TAB, IndexedDB, LocalStorage, and SQLite files.


The library brings you the comfort of a full database engine to your javascript app. No, really - its working towards a full database engine complying with [most of SQL-99](https://github.com/agershun/alasql/wiki/Supported-SQL-statements) spiced up with additional syntax for handling noSQL (schema less) data and graph networks. To help porting from native databases you can specify the flavour for the SQL behaviour as either AlaSQL, T-SQL, MySQL, Postgres, ORACLE, SQLite, OrientDB. MSSQL is on its way. 


 
```js
// A) Traditional SQL
alasql("CREATE TABLE cities (city string, population number)");

alasql("INSERT INTO cities VALUES ('Rome',2863223),('Paris',2249975),('Berlin',3517424),('Madrid',3041579)");

var res = alasql("SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC");

console.log(res);  

/* 
[
  {
    "city": "Madrid",
    "population": 3041579
  },
  {
    "city": "Rome",
    "population": 2863223
  },
  {
    "city": "Paris",
    "population": 2249975
  }
]
*/	
```

```js
// B) SQL on array of objects
var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];

var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);    

console.log(res); // [{"a":1,"b":40},{"a":2,"b":20}]
```

```js
// C) Read from file 
alasql.promise('SELECT * FROM XLS("mydata.xls") WHERE lastname LIKE "A%" and city = "London" GROUP BY name ')
      .then(function(res){
           console.log(res); // output depends on mydata.xls
      }).catch(function(err){
           console.log('Does the file exists? there was an error:', err);
      });
```
    
jsFiddle with [example A)](http://jsfiddle.net/xxh13gLa/) and [example B)](http://jsfiddle.net/agershun/30to2rh8/1/)

## Install


```bash
npm install alasql --save     # npm
meteor add agershun:alasql    # meteor
bower install alasql --save   # bower
npm install -g alasql         # command line interface
```

For the browser: include [alasql.min.js](http://cdn.jsdelivr.net/alasql/latest/alasql.min.js)  

```html
<script src="http://cdn.jsdelivr.net/alasql/0.2/alasql.min.js"></script> 
```


## Get started

The wiki has a great section on [how to get started](https://github.com/agershun/alasql/wiki/Getting%20started) 

When you feel you got the grip you can check out the wiki section about [data manipulation](https://github.com/agershun/alasql/wiki/Data-manipulation) or getting inspired by the [list of Q&As](http://stackoverflow.com/questions/tagged/alasql)




* Documentation: [Github wiki](https://github.com/agershun/alasql/wiki)

* Library CDN: [jsDelivr.com](http://www.jsdelivr.com/#!alasql)

* Feedback: [Open an issue](https://github.com/agershun/alasql/issues/new)

* Try online: <a href="http://alasql.org/console?CREATE TABLE cities (city string, population number);INSERT INTO cities VALUES ('Rome',2863223), ('Paris',2249975),('Berlin',3517424), ('Madrid',3041579);SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC">Playground</a>

* Website: [alasql.org](http://AlaSQL.org)






## Please note
AlaSQL project is very young and still in active development phase, therefore it <s>may</s> have [bugs](https://github.com/agershun/alasql/labels/Bug). Please, submit any bugs and suggestions [as an issue](https://github.com/agershun/alasql/issues/new). AlaSQL uses [Semantic Versioning](http://semver.org/) so please note that major version is zero (0.y.z) and the API can not be considered 100% stable. Consider this before using the library in production.  


**All contributions are much welcome and greatly appreciated(!)** so just [open an issue](https://github.com/agershun/alasql/issues/new) and lets talk about your idea. 

Also: [we really (really) love pull requests](https://github.com/agershun/alasql/blob/develop/CONTRIBUTING.md)



## Peformance
AlaSQL is very focused on speed and we make sure to use all the tricks we can find to make javascript spit out your results as quick as possible. For example:

* Queries are cached as compiled functions. 
* Joined tables are pre-indexed
* ```WHERE``` expressions are pre-filtered for joins

The results are good. Check out AlaSQL vs. other javaScript SQL databases: 

* **2.5x speed** [compared to SQL.js](http://jsperf.com/sql-js-vs-alasql-js/11) selecting with `SUM`, `JOIN`, and `GROUP BY`.

* **3x speed** [compared to WebSQL](http://jsperf.com/alasql-js-vs-websql/8) selecting with `SUM`, `JOIN`, and `GROUP BY` (in-memory opperations for WebSQL - see [this discussion](https://github.com/agershun/alasql/issues/47))

* **2x speed** [compared to Linq](http://jsperf.com/alasql-vs-linq-on-groupby/3) for `GROUP BY` on 1,048,576 rows


See more [speed related info on the wiki](https://github.com/agershun/alasql/wiki/Speed) 








## Fetures you might like


### Traditional SQL

Use "good old" SQL on your data with multiple levels of: ```JOIN```, ```VIEW```, ```GROUP BY```, ```UNION```, ```PRIMARY KEY```, ```ANY```, ```ALL```, ```IN```, ```ROLLUP()```, ```CUBE()```, ```GROUPING SETS()```, ```CROSS APPLY```, ```OUTER APPLY```, ```WITH SELECT```, and subqueries. See the wiki to [compare supported features with SQL standarts](https://github.com/agershun/alasql/wiki/SQL%20keywords).



#### User-defined JavaScript functions

You can use all benefits of SQL and JavaScript togeather by defining user functions. Just add new functions to alasql.fn object:

```js
        alasql.fn.double = function(x){return x*2};        
        alasql.fn.sum10 = function(x,y) { return x+y*10; }
        db.exec('SELECT a, double(a) AS b, sum10(a,b) FROM test1');
```


### AlaSQL supports plugins

AlaSQL supports plugins. To install the plugin you need to use the `REQUIRE` statement. See more [at the wiki](https://github.com/agershun/alasql/wiki/Plugins)


### Graphs 

AlaSQL is a multi-paradigm database with support for graphs that can be searched or manipulated. 


```js
    // Who loves lovers of Alice?
    alasql('SEARCH / ANY(>> >> #Alice) name');
    // ['Olga','Helen']
```

See more [at the wiki](https://github.com/agershun/alasql/wiki/GRAPH)


### Export data to Excel

AlaSQL can export data to both [Excel 2003 (.xls)](https://github.com/agershun/alasql/wiki/XLS) and [Excel 2007 (.xlsx)](https://github.com/agershun/alasql/wiki/XLSX) with coloring of cells and other Excel formatting functions.  


### Work directly on JSON data

Group your JavaScript array of objects by field and count number of records in each group:

```js
    var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
    var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a',[data]);
    console.log(res);
```
See more ideas of creative datamanipulation [in the wiki](https://github.com/agershun/alasql/wiki/Getting-started) 














### AlaSQL ♥ D3.js

AlaSQL plays nice with d3.js and gives you a convinient way to integrate a specifik subset of your data vis the visual powers of d3. See more about [D3.js and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/d3.js)


### AlaSQL ♥ Meteor 

Meteor is amazing. You can now query directly on your Meteor collections with SQL - simple and easy. See more about [Meteor and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Meteor)



### AlaSQL ♥ Angular.js 

Angular is great. Besides using AlaSQL for normal data manipulation it works like a charm for exporting you present scope to Excel. See more about [Angular and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Angular.js)


### AlaSQL ♥ Google Maps 

Pinpointing data on a map should be easy. AlaSQL is great to prepare source data for Google Maps from for example Excel or CSV making a one unif of work for fetching and identifying whats relevant. See more about [Google Maps and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Google-maps)



### AlaSQL ♥ Google Spreadsheets

AlaSQL can query data directly from a google spreadsheet. A good "partnership" for easy editing and powerfull data manipulation. See more about [Google Spreadsheets and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Google-maps)






### Node and IO.js

To use AlaSQL with Node or IO.js install with npm

```
npm install alasql --save
```


> [![NPM](https://nodei.co/npm/alasql.png)](https://nodei.co/npm/alasql/) [![NPM](https://nodei.co/npm-dl/alasql.png?months=6)](https://nodei.co/npm/alasql/)



Require `alasql` and create a new database to start executing your SQL.


```js
var alasql = require('alasql');

var db = new alasql.Database();

db.exec("CREATE TABLE example (a INT, b INT)");

// You can insert data directly from javascript object...
db.tables.example1.data = [ 
    {a:5,b:6},
    {a:3,b:4}
];

// ...or you can insert data with normal SQL 
db.exec("INSERT INTO example1 VALUES (1,3)");

var res = db.exec("SELECT * FROM example1 ORDER BY b DESC");

// res now contains this array of objects:
// [{a:1,b:3},{a:3,b:4},{a:3,b:4}]
```



### Command line interfce (CLI)

You can access AlaSQL [from the comandline](https://github.com/agershun/alasql/wiki/Alacon) by installing from npm globally

```
npm install alasql -g
```

Now you can access `alasql` via the commandline

```
> alasql "SELECT * INTO json('my.json') from xlsx('cities.xlsx',{headers:true}) WHERE population > 20000000"
```

To get get value instead of a JSON you can prepend `VALUE` to the `SELECT`

`?` will be replaced with the corresponding n'th argument.

```
alasql "VALUE SELECT 20-?+?" 5 100
```

See more examples [at the wiki](https://github.com/agershun/alasql/wiki/Alacon) 










### AlaSQL as a WebWorker

AlaSQL can work as a webworker. Include alasql-worker.js and thats's it: AlaSQL will work as a webworker.

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
See test168 and test169

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





Most of SQL-99. Please [see the wiki](https://github.com/agershun/alasql/wiki/Supported-SQL-statements) for more info



### JavaScript Sugar

AlaSQL extends "good old" SQL to make it closer to JavaScript. The "sugar" includes:

* Json objects - ``` {a:1,b:@[1,2,3]}
* Object propertires - ```obj->property->subproperty```
* Object and arrays elements - ```obj->(a*1)```
* JavaScript functions - ```obj->valueOf()```
* SELECT VALUE, ROW, COLUMN, MATRIX to format results of query





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



### Alaserver - simple database server

Yes, you can even use AlaSQL as a very simple server for tests.

To run enter the command: 
```
    alaserver [port]
```
then type in browser something like "http://127.0.0.1:1337/?SELECT VALUE 2*2" 

Warning: Alaserver is not multi-thread, not concurent, and not secured.


### Miss a feature? 
Take charge and [add your idea](http://feathub.com/agershun/alasql/features/new) or [vote on your favorite feature](http://feathub.com/agershun/alasql) to be implemented:

[![Feature Requests](http://feathub.com/agershun/alasql?format=svg)](http://feathub.com/agershun/alasql)





## Tests

#### Tests with Mocha
AlaSQL uses ```mocha``` for tests. Install mocha and run

```
    > npm test

```
or run [test/index.html](test/index.html) for tests in browser.

#### Tests with AlaSQL ASSERT from SQL

Now you can use AlaSQL [ASSERT](wiki/Assert)  operator to test results of previous operation:

```sql
    CREATE TABLE one (a INT);
    ASSERT 1;
    INSERT INTO one VALUES (1),(2),(3);
    ASSERT 3;
    SELECT * FROM one ORDER BY a DESC;
    ASSERT [{a:3},{a:2},{a:1}];
```

#### SQLLOGICTEST

AlaSQL uses SQLLOGICTEST to test it compatibility with SQL-99. The tests include about 2.000.000 queries and statements.

The testruns can be found in the [testlog](TESTLOG.md).


## Known Bugs and Limitations

0. It is Ok with select for 1000000 records or to join two tables by 10000 records in each. 
Now you can use streamming functions to work with longer datasources (see [test/test143.js](test/test143.js)).


1. ORDER BY clause on three or more UNIONS ( [See example in AlaSQL console](http://alasql.org/console?select 10 as a union all select 20 as a union all select 30 as a order by a desc) )
2. Limited functionality for transactions (supports only for localStorage) - Sorry, transactions are limited, because AlaSQL started to use more complex approach for PRIMARY KEYS / FOREIGN KEYS. Transactions will be fully turned on again in future version.


Probably, there are many of others. Please, [give us a chance](https://github.com/agershun/alasql/issues) to fix them. Thank you!
  


### FileSaver

AlaSQL uses [FileSaver.js](https://github.com/eligrey/FileSaver.js/) library for saving files locally from the browser. Please be aware that it does not save files in Safari 8.0.




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

© 2014-2015, Andrey Gershun (agershun@gmail.com) & M. Rangel Wulff (m@rawu.dk)