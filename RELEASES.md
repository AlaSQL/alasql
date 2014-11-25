## RELEASES PLAN


#### Version 0.0.25 - "Alasql: SQL and NoSQL"

Persistence
* Save data
* Save Schema
* Restore Schema
* Restore data
* Rebuild indexes
* Transactions

* work over WebSQL select * into websql('two') from websql('one');
* Lawnchair interface... let's start with it!

* Primary Key
* Create Index

* @ deepCopy
* CREATE TABLE one;
* INSERT INTO one VALUES @{a:2}, ?
* SELECT @a FROM @[{a:[1,2]}]
* @a->2 - deepCopy

GROUP BY TOTAL(a, b)

options.result = RECORDSET, MATRIX
SELECT RECORDSET a
SELECT GROUP(a/b), SUM(a) FROM 

* Alaserver


#### Version 0.0.26 - "Alasql and AlanosQL - like MongoDB"


* SELECT {a:2} AS alpha FROM one WHERE {b:[2,3]}
* SELECT (a = 2) AS alpha FROM one WHERE b IN (2,3)
* one.find({b:[2,3]});

* INSERT INTO one VALUES {a:1}
* INSERT INTO one (a) VALUES (1)
* one.insert({a:1});

* INSERT INTO one VALUES {a:[1,2]} - NoSQL

* UPDATE one SET {a:2} WHERE {a:3}
* UPDATE one SET a=2 WHERE a=3
* one.update({a:2}, {a:3});

* DELETE FROM one WHERE {a:2}
* DELETE FROM one WHERE a=2
* remove({a:2})

* JSON - pseudo-function and from-function

#### Version 0.0.26 - "CAST and CONVERT"

* CAST with more type conversions (dates)
* Float numbers like 10e20
* xcolumns to ixcolumns for compatibility with Alfina
* Bugs

#### Version 0.0.27 - "CAST and CONVERT"

* more CAST functions

#### Version 0.0.28 - "ISO and JS Dates"

* Replace magic character '`' to CharCode(0) or something else similar Unicode?
* ISODATE and JSDATE for DATE and DATETIME
* Multiple line comments like /* comment newline comment */

#### Version 0.0.29 - "CSV and TAB - queries"

* select into csv('ala.csv',true/false)
* select into tab('ala.tab',true/false)
* select into xls('ala.xls') - add-on with sheetjs
* select into xlsx('ala.xlsx') - add-on
* select from csv('./ala.csv',true) 
* select from csv('./ala.csv')
* select from tab('./ala.txt')
* select from tab('./ala.txt',true)
* select from xlsx('./ala.xlsx')
* select from xls('./ala.xls')
* select from json('./ala.json')
* join csv('demo.csv') AS t
* a in csv('demo.csv')
* IMPORT TABLE FROM 'csv:aaa.txt?headers=true'

#### Version 0.0.30 - "NoSQL interface"

* inventory.find('inventory',{type:'food',$or:[{qty:{$gt:100}},{price:{$lt:9.95}}]}); 
* inventory.insert()
* inventory.update()
* inventory.remove()

Alternative
* alasql('SELECT * FROM ? WHERE {qty:[1,2]}', [data]);
alasql.compile('SELECT * FROM ? WHERE {qty:[1,?]}'); - ParamValue


#### Version 0.0.31 - "Chart plagin"

* AlaChart - plug-in with high-charts
DRAW AREACHART WITH
  AXIS BOTTOM
  AXIS LEFT
  GRID HORIZONTAL;


#### Version 0.0.33 - "ISO and JS Dates"

* Command line utility

#### Version 0.0.34 - "ISO and JS Date/Time Functions"

* DATE/DATETIME functions for ISODATE and JSDATE

#### Version 0.0.35 - "Primary Keys and Unique Indices"

* PRIMARY KEY
* CREATE UNIQUE INDEX
* DROP INDEX
* SHOW INDEX
* SHOW CREATE TABLE with INDEX
* INSERT with unique
* DELETE with unique
* UPDATE with unique
* NULL, IS NULL
* DEFAULT

#### Version 0.0.36 - "FOREIGN KEYS"

* FOREIGN KEY
* INSERT
* DELETE
* UPDATE

#### Version 0.0.40 - "CREATE INDEX"

* CREATE INDEX
* INSERT
* DELETE
* UPDATE

#### Version 0.0.45 - "CREATE VIEW"

* CREATE VIEW
* DROP VIEW
* SELECT with VIEW

#### Version 0.0.50 - "Tables, Views, Subqueries, ParamValues the same"

* Single parent class for tables, views, subqueries, paramvalues with data 
* Use parameter arrays and subqueries in JOIN clause

#### Version 0.0.55 - "Types"

* Type resolutions
* AVG()
* Third UNION order issue
* Change xcolumns to ixcolumns for compatibility with Alfina (?)
* Analyze results of SELECT with statement.query.columns...
* LOAD JSON url TO table (json)
* More test databases


#### Version 0.0.60 - "Dates and JSDates"

* JSDate option flag
* Dates parsing in SELECT and UPDATE
* Fix Dates issues (comparision, ordering)

#### Version 0.0.65 - "Errors"

* SQL-errors handling

#### Version 0.0.70 - "Battle for SQL-92"

* Many-many SQL-92 Tests 
* Complience with [SQL-92 specifications](http://savage.net.au/SQL/sql-92.bnf.html) where it is possible 
* Chrome/FireFox/Safari/IE/Chromium/Opera/Node.Js/Rhino/iOS/Android/Win8 compatibilty tests
* Development environment (clean gulp code)

#### Version 0.0.75 - "Pivot"

* PIVOT like [T-SQL](http://technet.microsoft.com/en-us/library/ms177410(v=sql.105).aspx)

#### Version 0.0.80 - "Transactions"

* Transactions

#### Version 0.0.85 - "Battle for Performance"

* Remove forEach loops
* Optmization parameters


#### Version 0.0.90 - "Explain Why"
* EXPLAIN


#### Version 0.0.95 - "Persistence"
* Persistence

#### Version 0.0.100 - "Less bugs"
* More tests less bugs

#### Version 0.0.105 - "Battle for Memory"

* Memory leaks

#### Version 0.0.110 - "Battle for Memory"
* Minification

#### Version 0.0.115 - "JavaScript API"

* JavaScript API clarification

#### Version 0.0.119 - "Load on fly"

* SELECT * FROM csv('./world.txt')


#### Version 0.0.120 - "JQuery plugin"

* $.alasql(sql, params) plugin

#### Version 0.0.121 - "Angular plugin"

* AngularJS plugin 

#### Version 0.0.122 - "Sync Over Browsers"

* WebSQL compatibility

#### Version 0.0.123 - "Sync WebSQL"

* WebSQL compatibility

#### Version 0.0.124 - "WinJS"

* WinJS plugin

#### Version 0.0.125 - "Alasql over IndexedDB and other key-valye"

* IndexedDB
* MongoDB
* localStorage



#### Version 0.0.126 - "SQL parser, prettifier, and generator, SQL query builder"

* SQL prettify
* SQL query builder
* SQL parser


#### Version 0.0.127 - "SQL parser, prettifier, and generator, SQL query builder"

* Pass-thru SQL to server or custom driver


#### Version 0.0.128 - "MongoDB like queries"

* Pass-thru SQL to server or custom driver


#### Version 0.0.129 - "Pass-thru databases"

* Pass-thru SQL to server or custom driver


#### Version 0.0.132 - AlaChartSQL

* Demo with charts and SQL (compare to https://github.com/paulasmuth/fnordmetric)

#### Version 0.0.133 - AlaTextSQL

* Utility for OS command line query and text processing

#### Version 0.0.134 - Alasql-Cli

* alasql '1+1'
* alasql 'select * from ? order by [0] desc' -csv mydata.txt

#### Version 0.0.135 - MDX SELECT

* Merge with Alamdx 
* mdx select Measures.qty on rows from sales

#### Version 0.0.136 - Hierarchy Group By

* GROUP BY HIERARCHY(deptid)

#### Version 0.0.137 - Aggregator Functions

* SELECT SUM(amt) AS amt, SUM(qty) AS qty, AGGR(amt/qty) AS average FROM one GROUP BY deptid 

#### Version 0.0.138 - Total on top/bottom and group with details

* SELECT WITH TOTAL GROUP BY deptid, DETAILS()


#### Version 0.0.138 - "Battle with Bugs 1"

* Bug fixing release (alpha for 0.1)
* More tests

#### Version 0.0.140 - "Battle with Bugs 2"

* Bug fixing release (beta for 0.1)
* More tests

#### Version 0.0.145 - "Battle with Bugs 3"

* Bug fixing release (gamma for 0.1)
* More tests

#### Version 0.0.150 - "Battle with Bugs 3"

* Bug fixing release (delta for 0.1)
* More tests

#### Version 0.1.0 - "First Pancake!"


