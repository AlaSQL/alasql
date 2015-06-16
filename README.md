

[![bitHound Score](https://www.bithound.io/github/agershun/alasql/badges/score.svg)](https://www.bithound.io/github/agershun/alasql)       [![NPM downloads](http://img.shields.io/npm/dm/alasql.svg?style=flat&label=npm downloads)](https://npmjs.org/package/alasql)      ![Stars](https://img.shields.io/github/stars/agershun/alasql.svg?label=Github%20%E2%98%85)       ![Release](https://img.shields.io/github/release/agershun/alasql.svg?label=Last release)      ![NPM version](https://img.shields.io/npm/l/alasql.svg) 


# AlaSQL






_([à la] (http://en.wiktionary.org/wiki/%C3%A0_la) [SQL](http://en.wikipedia.org/wiki/SQL)) [ælæ ɛskju:ɛl]_ - AlaSQL is a versatil javascript SQL database library for both relational data, schemaless data, and graph data with a strong foucus on query speed and flexibillity for datasources. It works in your browser, Node.js, IO.js and Apache Cordova.




We focus on [speed](speed) by taking advantage of the dynamic nature of javascript when building up queries. Real world solutions demands flexibility regarding where data comes from and where it is to be stored. We focus on flexibility by making sure you can [import/export](import+export) and query directly on data stored in your own JSON object, Excel files, localStorage, IndexedDB, and SQLite. 


The library brings you the comfort of a full database engine to your javascript app. No, really - its a full database engine complying with [most of SQL-99](https://github.com/agershun/alasql/wiki/SQL-99) spiced up with additional syntax for handling noSQL (schemaless) data and graph networks. To help porting from native databases you can specify the flavor for the SQL behavior as either AlaSQL, T-SQL, MySQL, Postgres, ORACLE, SQLite, OrientDB. MSSQL is on its way. 


----


> Website: [alasql.org](http://AlaSQL.org)


> Try online: <a href="http://alasql.org/console?CREATE TABLE cities (city string, population number);INSERT INTO cities VALUES ('Rome',2863223), ('Paris',2249975),('Berlin',3517424), ('Madrid',3041579);SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC">Playground</a>


> Feedback: [Open an issue](https://github.com/agershun/alasql/issues/new)


> Documentation: [Github wiki](https://github.com/agershun/alasql/wiki)


> Get the file (CDN): [jsDelivr.com](http://www.jsdelivr.com/#!alasql)

----


## How to use

For the browser: Include [alasql.min.js](http://cdn.jsdelivr.net/alasql/latest/alasql.min.js) and call 
`alasql()` with your SQL statements:

```html

<script src="//cdn.jsdelivr.net/alasql/0.1/alasql.min.js"></script> 

<script>
    
	alasql("CREATE TABLE cities (city string, population number)");
        
	alasql("INSERT INTO cities VALUES ('Rome',2863223), ('Paris',2249975), ('Berlin',3517424),  ('Madrid',3041579)");
        
	var res = alasql("SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC");
   
   // res now contains this array of object:
   // [{"city":"Madrid","population":3041579},{"city":"Rome","population":2863223},{"city":"Paris","population":2249975}] 	
   
</script>
```

Play with this example in [jsFiddle](http://jsfiddle.net/xxh13gLa/) 

----


### Bower

To use AlaSQL via bower install as normal

    bower install alasql


----

### Node.js or IO.js




For node install with npm

```
npm install alasql
```


> [![NPM](https://nodei.co/npm/alasql.png)](https://nodei.co/npm/alasql/) [![NPM](https://nodei.co/npm-dl/alasql.png?months=6)](https://nodei.co/npm/alasql/)



Require `alasql` and create a new database to start executing your SQL.


```js
var alasql = require('alasql');

var db = new alasql.Database();

db.exec("CREATE TABLE example (a INT, b INT)");

// You can insert data directly from javascript object...
db.tables.example.data = [ 
    {a:5,b:6},
    {a:3,b:4}
];

// ...or you can insert data with normal SQL 
db.exec("INSERT INTO example VALUES (1,3)");

var res = db.exec("SELECT * FROM example1 ORDER BY b DESC");

// res now contains this array of objects:
// [{a:1,b:3},{a:3,b:4},{a:3,b:4}]
```

Please checkout [Alacon](https://github.com/agershun/alasql/wiki/Alacon) if you want to access AlaSQL from the commandline.





## Peformance
AlaSQL is very focused on speed and we make sure to use all the tricks we can find to make javascript spit out your results as quick as possible. For example:

* Queries are cached as compiled functions. 
* Joined tables are pre-indexed
* ```WHERE``` expressions are pre-filtered for joins

The results are good. Check out AlaSQL vs. other javaScript SQL databases: 

* **2x speed** [compared to SQL.js](http://jsperf.com/sql-js-vs-alasql-js/9) selecting with `SUM`, `JOIN`, and `GROUP BY`.

* **2x speed** [compared to WebSQL](http://jsperf.com/alasql-js-vs-websql/7) selecting with `SUM`, `JOIN`, and `GROUP BY` (in-memory opperations for WebSQL - see [this discussion](https://github.com/agershun/alasql/issues/47))

* **1.5x speed** [compared to Linq](http://jsperf.com/alasql-vs-linq-on-groupby) for `GROUP BY` on 1,048,576 rows


See more [speed related info on the wiki](https://github.com/agershun/alasql/wiki/Speed) 








## Fetures you might like


### Traditional SQL

Use "good old" SQL on your data with multiple levels of: ```JOIN```, ```VIEW```, ```GROUP BY```, ```UNION```, ```PRIMARY KEY```, ```ANY```, ```ALL```, ```IN```, ```ROLLUP()```, ```CUBE()```, ```GROUPING SETS()```, ```CROSS APPLY```, ```OUTER APPLY```, ```WITH SELECT```, and subqueries. See the wiki to [compare supported features with SQL standarts](https://github.com/agershun/alasql/wiki/SQL%20keywords).



### AlaSQL ♥ your JSON data 

[see why](https://github.com/agershun/alasql/wiki/readme#javascript-sugar)




###Miss a feature? 
Take charge and [add your idea](http://feathub.com/agershun/alasql/features/new) or [vote on your favorite feature](http://feathub.com/agershun/alasql) to be implemented:

[![Feature Requests](http://feathub.com/agershun/alasql?format=svg)](http://feathub.com/agershun/alasql)










## Cases where you might find AlaSQL useful


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
























































##Contributing

All contributions are much welcome and greatly appreciated(!) just [open an issue](https://github.com/agershun/alasql/issues/new) and lets talk about your idea...

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