
# Please note: this is a test site for the documentation


<p align="middle"><a href="http://alasql.org"><img src="https://cloud.githubusercontent.com/assets/1063454/14003948/d6e811aa-f156-11e5-90c0-12c7b9809f3c.png" Qalign="right" alt="AlaSQL logo" width="50%" height="50%" style="margin:0 0 20px 20px;"/></a>
</p>
# AlaSQL 

_( [à la](http://en.wiktionary.org/wiki/%C3%A0_la) [SQL](http://en.wikipedia.org/wiki/SQL) ) [ælæ ɛskju:ɛl]_ - AlaSQL is an open source SQL database for Javascript with a strong focus on query speed and datasource flexibility for relational data, schemaless data, and graph data. [Read more about the library in the readme](https://github.com/agershun/alasql/wiki/readme)

Please note that the AlaSQL project is very young and still in active development phase and the API can not be considered 100% stable. Consider this before using the library in production. 

All contributions are much welcome and greatly appreciated. The project has never received any funding and is based on unpaid voluntary work: [We really (really) love pull requests](https://github.com/agershun/alasql/blob/develop/CONTRIBUTING.md). 

{!https://raw.githubusercontent.com/wiki/agershun/alasql/readme.md!}
123
{!SQL.md!}

## Documentation

This documentation is devided into 4 sections

* Overview (what you are reading right now)
* SQL related 
* Javascript related 
* Bonus areas

As AlaSQL merge aspects of Javascript and SQL some features will be mentioned en both sections.


## How to install


```console
npm install --save alasql      # node
meteor add agershun:alasql     # meteor
bower install --save alasql    # bower
npm install -g alasql          # command line
```

For the browser: include [alasql.min.js](http://cdn.jsdelivr.net/alasql/latest/alasql.min.js)  

```html
<script src="http://cdn.jsdelivr.net/alasql/0.2/alasql.min.js"></script>
```

## Short introduction




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
then type in browser something like "http://127.0.0.1:1337/?SELECT VALUE 2*2"

Warning: Alaserver is not multi-thread, not concurrent, and not secured.




## Limitations

Please be aware that AlaSQL ~~may~~ have [bugs](https://github.com/agershun/alasql/labels/Bug). Besides the bugs there are a number of limitations

0. AlaSQL has a (long) list of keywords that must be escaped if used for column names. When selecting a field named `key` please write ``` SELECT `key` FROM ... ``` instead. This is also the case for words like ``` `value` ```, ``` `read` ```, ``` `count` ```, ``` `by` ```, ``` `top` ```, ``` `path` ```, ``` `deleted` ```, ``` `work` ``` and ``` `offset` ```. Please consult the [full list of keywords](https://github.com/agershun/alasql/wiki/AlaSQL-Keywords).


0. It is Ok with select for 1000000 records or to join two tables by 10000 records in each (You can use streaming functions to work with longer datasources - see [test/test143.js](test/test143.js)) but be aware that the workload is multiplied so selecting from more than 8 tables with just 100 rows in each will show bad performance. This is one of our top priorities to make better.

0. Limited functionality for transactions (supports only for localStorage) - Sorry, transactions are limited, because AlaSQL started to use more complex approach for PRIMARY KEYS / FOREIGN KEYS. Transactions will be fully turned on again in future version.

0. A `(FULL) OUTER JOIN` and `RIGHT JOIN` on more than 2 tables will not give the expected results. `INNER JOIN` and `LEFT JOIN` are ok.

0. Please use alias for field names with the same name (`SELECT a.id as a_id, b.id as b_id FORM ?`).

Probably, there are many of others. Please, help us to fix them by [submitting it as an issue](https://github.com/agershun/alasql/issues). Thank you!



{!footer.md!}