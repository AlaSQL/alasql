# The AlaSQL Wiki

* **The [[README]] section actually seeks to be helpful**

* **[[Getting started]] gives you inspiration on how to use the library**

* **We are proud of what [other people say](People) about the library**

### About AlaSQL

AlaSQL applys SQL opperations to JavaScript arrays and objects therefore the library can best be described as a JavaScript SQL database. 

The API is designed for:

* JavaScript [[data manipulation]] plus advanced filtering, grouping and joining
* Client-side SQL database with option for persistency (as Local Storage and Indexed DB)
* Fast data processing for BI and ERP applications on fat clients
* Easy ETL (extract, transfer, and loading) data to/from [CSV](Csv) and [XLSX](Xlsx) + others
* Works in all major browsers,  Node.js, and mobile applications


```js
// a) SQL on array of objects
var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];
var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);    
console.log(res);

// b) Async promise notation
alasql
      .promise('SELECT * FROM XLS("mydata.xls") GROUP BY name WHERE lastname LIKE "A%" and city = "London"')
      .then(function(res){
           console.log(res);
      }).catch(function(err){
           console.log('error:', err);
      });
```
    
Try example `a)` in [jsFiddle](http://jsfiddle.net/agershun/30to2rh8/1/).

Please make sure [[promise]] is supported if you are in the browser. 

### AlaSQL Q&A
* [Data manipulation](Data manipulation) - array filtering, grouping, ordering
* [Data import and export](Import-export) - [TXT](Txt), [CSV](Csv), [TSV/TAB](Tsv)/, [XLS](Xls), 
[XLSX](Xlsx), [HTML](Html), [JSON](Json) 
* [Search in JSON arrays and objects](JSON)
* SQL for [JavaScript frameworks and libraries](JavaScript Frameworks):
 * Platforms: [Apache Cordova](Apache Cordova), [Ionic](Ionic), [Windows 8](Windows 8)
 * Frameworks: [Angular.js](Angular.js), 
 * Maps and diagrams: [d3.js](d3.js), [Google Maps](Google maps)
 * Charts: [Highcharts.js](Highcharts.js), [Google Charts](Google Charts) 
 * Spreadsheets: [Microsoft Excel](XLSX), [Google Docs Spreadsheets](Google Spreadsheets) 
 * Grid: [Handsontable.js](Handsontable.js)
 * Formatting: [Numeral.js](Numeral.js), [Moment.js](Moment.js), [Sprintf.js](Sprintf.hs)
 * Applications: [Lotus Notes](http://blog.tcl-digitrade.com/blogs/tcl-digitrade-blog.nsf/dx/26.11.2015130651SMAG8A.htm)
* [SQL database](Sql database) - in-memory database + [AlaSQL FileStorage](FileStorage) persistence engine
* [SQL queries](SQL queries)
* [External databases](External databases) - [IndexedDB](IndexedDB), [Local Storage](LocalStorage), and [SQLite](SQLite) integration

### AlaSQL Documentation
* [[Install]]
* [Getting started](Getting started)
* [Supported SQL statements](Sql)
* [Functions](Functions)
* [JavaScript API](Api)
* [Webworker version](Webworker)
* [LINQ fluent interface](Fluent Interface)
* [Import and export functions](Import export)
* [Options](AlaSQL Options)
* [Errors processing](Errors)
* [Internal structure](Internal Structure)
* [Performance](Performance)
* [TypeScript](TypeScript)
* [SQL-99 compatibility](SQL-99), [SQL-99 keywords](SQL-keywords), [AlaSQL keywords](AlaSQL-Keywords)
* ["User Manual"](http://www.slideshare.net/AndreyGershun/alasql-manual-141220-1) - PowerPoint presentation
* SlideShare [AlaSQL.js - fast JavaScript in-memory SQL database](http://www.slideshare.net/AndreyGershun/alasqljsfast-javascript-inmemory-sql-database)
* SlideShare [SQL and NoSQL in AlaSQL database](http://www.slideshare.net/AndreyGershun/sql-and-nosql-in-alasql)
* [Quirky things](Quirky) about AlaSQL
* [[Error codes]]



### Command-Line Utilities
* [alacon](Alacon) - command-line utility for text and data files processing with SQL
* [alaserver](Alaserver) - simple SQL server based on AlaSQL

### Development 
* [How to setup environment for AlaSQL development?](How to setup environment for AlaSQL development)
* [How to assemble AlaSQL?](How to assemble AlaSQL)
* [How to prepare new release?](How to release)

### Sandbox
* [AlaSQL Console](http://alasql.org/console/alaconsole.html)

Unsure if AlaSQL fit your needs? Chekout the [other JavaScript SQL databases](Similar-Projects)
