_AlaSQL is an open source project and we appreciate any and all contributions we can get. Please help out._

_Got a question? Ask on [Stack Overflow](http://stackoverflow.com/questions/ask?tags=AlaSQL) and tag with "alasql"._


[![Build status](https://api.travis-ci.org/agershun/alasql.svg)](https://travis-ci.org/agershun/alasql?123)
[![NPM downloads](http://img.shields.io/npm/dm/alasql.svg?style=flat&label=npm%20downloads)](https://npm-stat.com/charts.html?package=alasql)
[![ghit.me](https://ghit.me/badge.svg?repo=agershun/alasql)](https://ghit.me/repo/agershun/alasql)
[![Release](https://img.shields.io/github/release/agershun/alasql.svg?label=Last%20release&a)](https://www.npmjs.com/package/alasql)
[![Stars](https://img.shields.io/github/stars/agershun/alasql.svg?label=Github%20%E2%98%85&a)](https://github.com/agershun/alasql)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/agershun/alasql.svg)](http://isitmaintained.com/project/agershun/alasql "Average time to resolve an issue")
[![Coverage]( https://img.shields.io/codecov/c/github/agershun/alasql/develop.svg)](https://rawgit.com/agershun/alasql/develop/test/coverage/lcov-report/dist/alasql.fs.js.html)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/328/badge)](https://bestpractices.coreinfrastructure.org/projects/328)



# AlaSQL


_( [à la](http://en.wiktionary.org/wiki/%C3%A0_la) [SQL](http://en.wikipedia.org/wiki/SQL) ) [ælæ ɛskju:ɛl]_ - AlaSQL is a free and open source SQL database for Javascript with a strong focus on query speed and datasource flexibility for relational data, schemaless data, and graph data. It works in your browser, Node.js, IO.js and Cordova.

The library is designed for:

* Fast SQL data processing in-memory for BI and ERP applications on fat clients
* Easy ETL and option for persistency by data import / manipulation / export for several formats
* All major browsers, Node.js, and mobile applications

<div align="center"><a href="http://alasql.org"><img src="https://cloud.githubusercontent.com/assets/1063454/19309516/94f8007e-9085-11e6-810f-62fd60b42185.png" alt="AlaSQL logo" styl="max-width:80%"/></a>
</div>

We focus on [speed](https://github.com/agershun/alasql/wiki/Speed) by taking advantage of the dynamic nature of javascript when building up queries. Real world solutions demands flexibility regarding where data comes from and where it is to be stored. We focus on flexibility by making sure you can [import/export](https://github.com/agershun/alasql/wiki/Import-export) and query directly on data stored in Excel (both `xls` and `.xlsx`), CSV, JSON, TAB, IndexedDB, LocalStorage, and SQLite files.


The library brings you the comfort of a full database engine to your javascript app. No, really - its working towards a full database engine complying with [most of SQL-99](https://github.com/agershun/alasql/wiki/Supported-SQL-statements) spiced up with additional syntax for handling noSQL (schema less) data and graph networks.


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
// C) Promise notation + read from file example
alasql.promise('SELECT * FROM XLS("mydata.xls") WHERE lastname LIKE "A%" and city = "London" GROUP BY name ')
      .then(function(res){
           console.log(res); // output depends on mydata.xls
      }).catch(function(err){
           console.log('Does the file exists? there was an error:', err);
      });
```




```js
// D) Cheat and load your data directly

alasql("CREATE TABLE example1 (a INT, b INT)");

alasql.tables.example1.data = [               // Insert data directly from javascript object...
    {a:2,b:6},
    {a:3,b:4}
];

alasql("INSERT INTO example1 VALUES (1,5)");  // ...or you insert data with normal SQL

var res = alasql("SELECT * FROM example1 ORDER BY b DESC");

console.log(res); // [{a:2,b:6},{a:1,b:5},{a:3,b:4}]
```

jsFiddle with [example A)](http://jsfiddle.net/hguw3LLk/) and [example B)](http://jsfiddle.net/c1hbytf1/)

## Install


```bash
npm install --save alasql      # node
bower install --save alasql    # bower
import alasql from 'alasql';   # meteor
npm install -g alasql          # command line
```

For the browser: include [alasql.min.js](http://cdn.jsdelivr.net/alasql/latest/alasql.min.js)  

```html
<script src="http://cdn.jsdelivr.net/alasql/0.3/alasql.min.js"></script>
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

**All contributions are much welcome and greatly appreciated(!)** -
The project has never received any funding and is based on unpaid voluntary work: [We really (really) love pull requests](https://github.com/agershun/alasql/blob/develop/CONTRIBUTING.md)

AlaSQL project is very young and still in active development phase, therefore it <s>may</s> have [bugs](https://github.com/agershun/alasql/labels/%21%20Bug). 
Please, submit any bugs and suggestions [as an issue](https://github.com/agershun/alasql/issues/new). 

[![Known bugs](https://img.shields.io/github/issues-raw/agershun/alasql/!%20bug.svg?label=Known%20Bugs&maxAge=2592000)](https://github.com/agershun/alasql/issues?q=is%3Aissue+is%3Aopen+label%3A%22%21+Bug%22)


AlaSQL uses [Semantic Versioning](http://semver.org/) so please note that major version is zero (0.y.z) and the API can not be considered 100% stable. Consider this before using the library in production and please checkout the [limitations of the library](https://github.com/agershun/alasql#limitations)




## Performance
AlaSQL is very focused on speed and we make sure to use all the tricks we can find to make javascript spit out your results as quick as possible. For example:

* Queries are cached as compiled functions.
* Joined tables are pre-indexed
* ```WHERE``` expressions are pre-filtered for joins

The results are good. Check out AlaSQL vs. other javaScript SQL databases:

* **3x speed** [compared to SQL.js](http://jsperf.com/sql-js-vs-alasql-js/11) selecting with `SUM`, `JOIN`, and `GROUP BY`.

* **1x speed** [compared to WebSQL](http://jsperf.com/alasql-js-vs-websql/8) selecting with `SUM`, `JOIN`, and `GROUP BY` (in-memory operations for WebSQL - see [this discussion](https://github.com/agershun/alasql/issues/47))

* **2x speed** [compared to Linq](http://jsperf.com/alasql-vs-linq-on-groupby/3) for `GROUP BY` on 1,048,576 rows


See more [speed related info on the wiki](https://github.com/agershun/alasql/wiki/Speed)








## Features you might like




### Traditional SQL

Use "good old" SQL on your data with multiple levels of: `JOIN`, `VIEW`, `GROUP BY`, ```UNION```, ```PRIMARY KEY```, `ANY`, `ALL`, ```IN```, ```ROLLUP()```, ```CUBE()```, ```GROUPING SETS()```, ```CROSS APPLY```, ```OUTER APPLY```, ```WITH SELECT```, and subqueries. See the wiki to [compare supported features with SQL standards](https://github.com/agershun/alasql/wiki/SQL%20keywords).



### User defined functions in your SQL

You can use all benefits of SQL and JavaScript together by defining you own costume functions. Just add new functions to the alasql.fn object:


```js
alasql.fn.myfn = function(a,b) {
    return a*b+1;
}
var res = alasql('SELECT myfn(a,b) FROM one');
```

See more [in the wiki](https://github.com/agershun/alasql/wiki/User-Defined-Functions)


### Compiled statements and functions

```js
var ins = alasql.compile('INSERT INTO one VALUES (?,?)');
ins(1,10);
ins(2,20);
```

See more [in the wiki](https://github.com/agershun/alasql/wiki/Compile)


### Work directly on JSON data

Group your JavaScript array of objects by field and count number of records in each group:

```js
var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a',[data]);
console.log(res);
```
See more ideas of creative datamanipulation [in the wiki](https://github.com/agershun/alasql/wiki/Getting-started)







### AlaSQL works in the console - CLI

After globally installing AlaSQL `npm install alasql -g` you can access AlaSQL via the commandline  


```bash
> alasql "SET @data = @[{a:'1',b:?},{a:'2',b:?}]; SELECT a, b FROM @data;" 10 20
[ 1, [ { a: 1, b: 10 }, { a: 2, b: 20 } ] ]

> alasql "VALUE OF SELECT COUNT(*) as abc FROM TXT('README.md') WHERE LENGTH([0]) > ?" 140
// Number of lines with more than 140 characters in README.md
```

See more [in the wiki](https://github.com/agershun/alasql/wiki/AlaSQL-CLI)




### AlaSQL ♥ D3.js

AlaSQL plays nice with d3.js and gives you a convenient way to integrate a specific subset of your data vis the visual powers of d3. See more about [D3.js and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/d3.js)


### AlaSQL ♥ Excel

AlaSQL can export data to both [Excel 2003 (.xls)](https://github.com/agershun/alasql/wiki/XLS) and [Excel 2007 (.xlsx)](https://github.com/agershun/alasql/wiki/XLSX) with coloring of cells and other Excel formatting functions.  


### AlaSQL ♥ Meteor

Meteor is amazing. You can now query directly on your Meteor collections with SQL - simple and easy. See more about [Meteor and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Meteor)



### AlaSQL ♥ Angular.js

Angular is great. Besides using AlaSQL for normal data manipulation it works like a charm for exporting you present scope to Excel. See more about [Angular and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Angular.js)


### AlaSQL ♥ Google Maps

Pinpointing data on a map should be easy. AlaSQL is great to prepare source data for Google Maps from for example Excel or CSV making a one unit of work for fetching and identifying whats relevant. See more about [Google Maps and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Google-maps)



### AlaSQL ♥ Google Spreadsheets

AlaSQL can query data directly from a google spreadsheet. A good "partnership" for easy editing and powerfull data manipulation. See more about [Google Spreadsheets and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Google-maps)
















### AlaSQL supports plugins

AlaSQL supports plugins. To install the plugin you need to use the `REQUIRE` statement. See more [at the wiki](https://github.com/agershun/alasql/wiki/Plugins)







### Graphs

AlaSQL is a multi-paradigm database with support for graphs that can be searched or manipulated.


```js
// Who loves lovers of Alice?
var res = alasql('SEARCH / ANY(>> >> #Alice) name');
console.log(res) // ['Olga','Helen']
```

See more [at the wiki](https://github.com/agershun/alasql/wiki/GRAPH)





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
See test168 and test169 for examples

### Read SQLite database files

AlaSQL can read (not write) SQLite data files if you include [SQL.js](https://github.com/kripken/sql.js) library:
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

* Json objects - `{a:'1',b:@['1','2','3']}`
* Object propertires - `obj->property->subproperty`
* Object and arrays elements - ```obj->(a*1)```
* JavaScript functions - ```obj->valueOf()```
* SELECT VALUE, ROW, COLUMN, MATRIX to format results of query





### localStorage and DOM-storage (experimental)
You can use browser localStorage and [DOM-storage](https://github.com/node-browser-compat/dom-storage) as a data storage. Here is a sample:

```js
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

### CSV, TAB, TXT, and JSON files
You can import from and export to CSV, TAB, TXT, and JSON files directly from AlaSQL. Calls to files will always be [[async]] so the approach is to chain the queries if you have more than one:

```js
var tabFile = 'mydata.tab'

alasql.promise([
		"select * from txt('mytext.txt') where [0] like 'M%'",
		["select * from tab(?) order by [1]", [tabFile]],	// note how to pass parameter when promises are chained
		"select [3] as city,[4] as population from csv('cities.csv')",
		"select * from json('array.json')"
	]).then(function(results){
		console.log(results)
	}).catch(console.error)
```

### JSON-object

You can use JSON objects in your databases (do not forget use == and !== operators for deep comparision of objects):

```sql

alasql> SELECT VALUE {a:'1',b:'2'}

{a:1,b:2}

alasql> SELECT VALUE {a:'1',b:'2'} == {a:'1',b:'2'}

true

alasql> SELECT VALUE {a:'1',b:'2'}->b

2

alasql> SELECT VALUE {a:'1',b:(2*2)}->b

4

```

Try AlaSQL JSON objects in  Console [sample](http://alasql.org/console?drop table if exists one;create table one;insert into one values {a:@[1,2,3],c:{e:23}}, {a:@[{b:@[1,2,3]}]};select * from one)



### Alaserver - simple database server

Yes, you can even use AlaSQL as a very simple server for tests.

To run enter the command:
```
    alaserver [port]
```
then type in browser something like "<a href="http://127.0.0.1:1337/?SELECT VALUE 2*2">http://127.0.0.1:1337/?SELECT VALUE 2*2</a>"

Warning: Alaserver is not multi-thread, not concurrent, and not secured.

### Webpack and Browserify

When targeting the browser, several code bundlers like Webpack and Browserify will pick up modules you might not want.

Here's a list of modules that alasql requires
* fs
* cptable
* jszip
* xlsx
* xls
* cpexcel
* path
* es6-promise
* net
* tls

#### Webpack

There are several ways to handled alasql with webpack



##### IgnorePlugin

Ideal when you want to control which modules you want to import.

```js
var IgnorePlugin =  require("webpack").IgnorePlugin;

module.exports = {
  ...
  //Will ignore the modules fs, path, xlsx, xls
  plugins:[new IgnorePlugin(/(^fs$|cptable|jszip|xlsx|xls|^es6-promise$|^net$|^tls$|^forever-agent$|^tough-cookie$|cpexcel|^path$)/)]
};
```

##### module.noParse

As of alasql 0.3.5, you can simply tell webpack not to parse alasql, which avoids all the dynamic require warnings and avoids using eval/clashing with CSP with script-loader.  
[Read the webpack docs about noParse](https://webpack.github.io/docs/configuration.html#module-noparse)

```js
...
//Don't parse alasql
{module:noParse:[/alasql/]}
```


##### script-loader

If both of the solutions above fail to meet your requirements, you can load alasql with [script-loader](https://github.com/webpack/script-loader).

```js
//Load alasql in the global scope with script-loader
import "script!alasql"
```

This can cause issues if you have a CSP that doesn't allow eval.

#### Browserify

Read up on [excluding](https://github.com/substack/browserify-handbook#excluding), [ignoring](https://github.com/substack/browserify-handbook#ignoring), and [shimming](https://github.com/substack/browserify-handbook#shimming)

Example (using excluding)

```js
var browserify = require("browserify");
var b = browserify("./main.js").bundle();
//Will ignore the modules fs, path, xlsx, xls
["fs","path","xlsx",  ... , "xls"].map(ignore => b.ignore(ignore));
```

#### jQuery
Please remember to send the original event, and not the jQuery event, for elements. (use `event.originalEvent` instead of `myEvent`)


### Miss a feature?
Take charge and [add your idea](http://feathub.com/agershun/alasql/features/new) or [vote on your favorite feature](http://feathub.com/agershun/alasql) to be implemented:

[![Feature Requests](http://feathub.com/agershun/alasql?format=svg)](http://feathub.com/agershun/alasql)



## Limitations

Please be aware that AlaSQL ~~may~~ have [bugs](https://github.com/agershun/alasql/labels/Bug). Besides the bugs there are a number of limitations

0. AlaSQL has a (long) list of keywords that must be escaped if used for column names. When selecting a field named `key` please write ``` SELECT `key` FROM ... ``` instead. This is also the case for words like ``` `value` ```, ``` `read` ```, ``` `count` ```, ``` `by` ```, ``` `top` ```, ``` `path` ```, ``` `deleted` ```, ``` `work` ``` and ``` `offset` ```. Please consult the [full list of keywords](https://github.com/agershun/alasql/wiki/AlaSQL-Keywords).


0. It is Ok with select for 1000000 records or to join two tables by 10000 records in each (You can use streaming functions to work with longer datasources - see [test/test143.js](test/test143.js)) but be aware that the workload is multiplied so selecting from more than 8 tables with just 100 rows in each will show bad performance. This is one of our top priorities to make better.

0. Limited functionality for transactions (supports only for localStorage) - Sorry, transactions are limited, because AlaSQL started to use more complex approach for PRIMARY KEYS / FOREIGN KEYS. Transactions will be fully turned on again in future version.

0. A `(FULL) OUTER JOIN` and `RIGHT JOIN` on more than 2 tables will not give the expected results. `INNER JOIN` and `LEFT JOIN` are ok.

0. Please use alias when you want fields with same name from different tables (`SELECT a.id as a_id, b.id as b_id FROM ?`).

0. At the moment Alasql does not work with jszip 3.0.0 - please use version 2.x 


Probably, there are many of others. Please, help us to fix them by [submitting it as an issue](https://github.com/agershun/alasql/issues). Thank you!



## Bleeding edge

If you want to try the last development version of the library please download [this file](https://github.com/agershun/alasql/blob/develop/dist/alasql.fs.js) or visit the [testbench](https://rawgit.com/agershun/alasql/develop/test/testbench.html) to play around in the browser console. 

## Tests

#### Tests with Mocha
AlaSQL uses ```mocha``` for tests. Install mocha and run

```
    > npm test

```
or run [test/index.html](test/index.html) for tests in browser (Please serve via localhost with for example `http-server`).







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



### FileSaver

AlaSQL uses [FileSaver.js](https://github.com/eligrey/FileSaver.js/) library for saving files locally from the browser. Please be aware that it does not save files in Safari 8.0.




## License

MIT - see [MIT licence information](LICENSE)

## Main contributors

* [Andrey Gershun](http://github.com/agershun)
* [Mathias Rangel Wulff](https://twitter.com/rangelwulff)
* [Aubert Grégoire](https://github.com/gregaubert)

<!--[![Throughput Graph](https://graphs.waffle.io/agershun/alasql/throughput.svg)](https://waffle.io/agershun/alasql/metrics/throughput)-->



## Credits

Many thanks to Zach Carter for [Jison](http://zaach.github.io/jison/) parser generator, to the author of FileSaver.js, Andrew Kent for his [SQL Parser](https://github.com/forward/sql-parser),
authors of [XLSX](https://github.com/SheetJS/js-xlsx) library,
and other people for useful tools, which make our work much easier.

### Related projects that have inspired us

* [AlaX](http://github.com/agershun/alax) - Export to Excel with colors and formats
* [WebSQLShim](http://github.com/agershun/WebSQLShim) - WebSQL shim over IndexedDB (work in progress)
* [AlaMDX](http://github.com/agershun/alamdx) - JavaScript MDX OLAP library (work in progress)
* [Other similar projects](http://github.com/agershun/alasql/wiki/Similar-Projects.md) - list of databases on JavaScript



----
<a href="http://alasql.org"><img src="https://cloud.githubusercontent.com/assets/1063454/14003946/d6e5c076-f156-11e5-8238-e62d2a8d20dc.png" align="right" alt="AlaSQL logo"/></a>
© 2014-2016, Andrey Gershun (agershun@gmail.com) & M. Rangel Wulff (m@rawu.dk)
