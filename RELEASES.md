# Releases Plan

## Alasql Prioritites
1. Bugs, Speed, Memory Leaks, Better Code, Errors handling, Library Size, Compatibility (Browsers, Mobiles, SQLs)
2. Documentation, alasql.org website, Alasql promotion, Article, Coockbook, Tutorial
3. UNION bug, merge algorithms, utilities, Prettify, Console, Alacon, Functions in GROUP, HAVING and ORDER
4. Primary Key/Foreign Key/Unique Index/Autoincrement/Default
5. Transactions
6. PIVOT, UNPIVOT, GROUP BY TOTAL, DETAIL, GROUP BY HIERARCHY
7. WebSQL and pass-thru databases, better support of with IndexedDB and NeDB, WebWorkers
8. SYNC, optimiztic blocking
9. Linq, NoSQL, and MongoDB functions
10. Streams, cursors, if-then, while, Views, Comsole

## Next Versions

alasql("SELECT RECORDSET * FROM XLSX(?)",[recordset]);

Filters:
alasql("GROUP BY _ HAVING COUNT(*) > 2 WHERE _ < 100 ORDER BY _ DESC",[data]);

alasql("SELECT GROUP a, ARRAY(_) FROM ?",[data]); == _.groupBy(data,"a");



1. Upload XLSX() and CSV() file in browser

SELECT * FROM CSV("#multifiles",{upload:true});
SELECT * FROM CSV(".multifiles");
SELECT * FROM CSV("#multifiles");

* * - how to resolve unambigous column names?
* Short syntax: alasql('order by a,b',[a]);

> cat a.txt | alacon 'order by mid(_,1,5)' | cat

* Short syntax: alasql('SELECT COLUMN _ FROM ? ORDER BY a',[a]);

For browser:
    SELECT COLUMN _ FROM ?
For Node.js
    SELECT COLUMN _ FROM TXT()

* Short syntax: alasql('SELECT * FROM ? ORDER BY a',[a]);
* 

<button alasql-click='SELECT * FROM ? WHERE a = ? | src_items, test | items'>
<div ng-repeat="item in items | alasql: ORDER BY a,b">

* Angular Light Filter 
http://jsfiddle.net/agershun/pTT5x/5/

// Easy filter
alight.filters.alasql = function(exp, scope) {
    return function(value) {
        return alasql(exp,[value,scope]);
    }
}

<i al-repeat="it in [1,2,3,4,5,6,7,8,9] | alasql:WHERE _ <= :size">({{it}})</i>
<a al-alasql="items | SELECT * FROM XLSX('mydata.xlsx')">aaaa</a>

alasql("SELECT * FROM XLSX('#file',{upload:true})",[],function(res){
	console.log(res);
});

        var iel = document.createElement('input');
        iel.setAttribute('type','file');
        iel.style.width = "500px";
        iel.addEventListener('change', deptImportFileSelect.bind(this), false);



	function deptImportFileSelect (event) {
		var self = this;
//		console.log('deptImportFileSelect');
	}




* SELECT SUM(_) FROM ?
* SELECT q1._, q2._ AS q2_ FROM ? q1 JOIN ? q2 USING a
* SELECT * FROM ? WHERE a IN ?
* SELECT * FROM ? WHERE ? IN a
* SELECT TEXT _ FROM TXT('aaa.txt') WHERE LEN(_) > 20 ORDER BY _
* alacon bin + alaserver bin

### Version 0.0.33 - "WebSQL + Pretty + Bug Fixes" (priorities 1-2)

* WebSQL support
* Prettify() bugs
* alasql.org/console bugs (SOURCE and other commands)
* alasql.org redesign (add twitter + stories)
* master branch + CDN + dist/
* alacon + alaserver bin commands (test with npm install alasql -g)

Fix bugs in pretty()
====
1. alasql.parse("CREATE TABLE cities (city string, population number);INSERT INTO cities VALUES ('Rome',2863223), ('Paris',2249975), ('Berlin',3517424), ('Madrid',3041579);SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC").toString()

SELECT TOP 10 *,*,*
  	FROM rrr
  	GROUP BY
  	ORDER BY;

 CREATE TABLE one (
 	one INT,
 	two STRING
 );

2. Prettify SQL output for Consolet;


## Other Functionality 

#### Version 0.0.33 - "OTHER FUNCTIONALITY"

* Syncing with server
* REGEXP_LIKE 
* IDENTITY (1,1) or AUTO_INCREMENT

Other databases support:
* NeDB
* LockiJS
* TaffyDB
* sessionStorage
* MongoDb and other key-value storages
* source as a function

#### Version 0.0.34 - Advanced "localStorage" support
* STORE SCHEMA
* STORE DATA

Answer on StackOverflow questions:
http://stackoverflow.com/questions/1878256/html5-localstorage-sql
http://stackoverflow.com/questions/14260127/is-there-a-free-lib-accessing-to-html5-database-sqlite


#### Version 0.0.33 - "Streamming"

* Select data from function on the stream (instreamfn())
* SELECT INTO the streamm function (outstreamfn()) - with group+order and without
* SELECT without stream

* SELECT FROM IndexedDB with Indexes
* IndexedDB INSERT/DELETE/UPDATE/SELECT INTO 
* SYNC SCHEMAS WITH INDEXEDDB
* PRIMARY/FOREIGN KEYS
* KEYS & IndexedDB


#### Version 0.0.35 - "CAST"

2. STANDARD DATATYPES WITH CAST FUNCTIONS
===
alasql.dbtypes = {};
alasql.dbtypes.INT = {
	jstyped: 'number',
	cast: function(value, dbtypeid) {}
};

alasql.dbtypes.DATE = {
	jstyped: 'object',
	jsclass: 'Date',
	cast: function(value, dbtypeid) {}
};


9. Compare function

if(!columns || columns.length == 0 || columns.dbtypeid == "JSON" ||
	columns.dbtypeid == "JSDATE"
) {
	s += 'if(typeof a=="object") a=a.valueOf();if(typeof b=="object") b=b.valueOf();';
}


10. Cast functions

CAST(a AS JSDATE)
CAST(a AS SQLDATE)

11. Date functions - realize only standard()!!!!
====

* NOW()	Returns the current date and time
* CURDATE()	Returns the current date
* CURTIME()	Returns the current time
* DATE()	Extracts the date part of a date or date/time expression
EXTRACT()	Returns a single part of a date/time
DATE_ADD()	Adds a specified time interval to a date
DATE_SUB()	Subtracts a specified time interval from a date
DATEDIFF()	Returns the number of days between two dates
DATE_FORMAT()	Displays date/time data in different formats

* GETDATE()	Returns the current date and time
DATEPART()	Returns a single part of a date/time
DATEADD()	Adds or subtracts a specified time interval from a date
DATEDIFF()	Returns the time between two dates
CONVERT()	Displays date/time data in different formats

ADDDATE()	Adds dates
ADDTIME()	Adds time
CONVERT_TZ()	Converts from one timezone to another
CURDATE()	Returns the current date
CURRENT_DATE(), CURRENT_DATE	Synonyms for CURDATE()
CURRENT_TIME(), CURRENT_TIME	Synonyms for CURTIME()
CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP	Synonyms for NOW()
CURTIME()	Returns the current time
DATE_ADD()	Adds two dates
DATE_FORMAT()	Formats date as specified
DATE_SUB()	Subtracts two dates
* DATE()	Extracts the date part of a date or datetime expression
DATEDIFF()	Subtracts two dates
* DAY()	Synonym for DAYOFMONTH()
DAYNAME()	Returns the name of the weekday
* DAYOFMONTH()	Returns the day of the month (1-31)
* DAYOFWEEK()	Returns the weekday index of the argument
* DAYOFYEAR()	Returns the day of the year (1-366)
EXTRACT	Extracts part of a date
FROM_DAYS()	Converts a day number to a date
FROM_UNIXTIME()	Formats date as a UNIX timestamp
* HOUR()	Extracts the hour
LAST_DAY	Returns the last day of the month for the argument
LOCALTIME(), LOCALTIME	Synonym for NOW()
LOCALTIMESTAMP, LOCALTIMESTAMP()	Synonym for NOW()
MAKEDATE()	Creates a date from the year and day of year
MAKETIME	MAKETIME()
MICROSECOND()	Returns the microseconds from argument
* MINUTE()	Returns the minute from the argument
* MONTH()	Return the month from the date passed
MONTHNAME()	Returns the name of the month
* NOW()	Returns the current date and time
PERIOD_ADD()	Adds a period to a year-month
PERIOD_DIFF()	Returns the number of months between periods
* QUARTER()	Returns the quarter from a date argument
SEC_TO_TIME()	Converts seconds to 'HH:MM:SS' format
* SECOND()	Returns the second (0-59)
STR_TO_DATE()	Converts a string to a date
SUBDATE()	When invoked with three arguments a synonym for DATE_SUB()
SUBTIME()	Subtracts times
SYSDATE()	Returns the time at which the function executes
TIME_FORMAT()	Formats as time
TIME_TO_SEC()	Returns the argument converted to seconds
* TIME()	Extracts the time portion of the expression passed
TIMEDIFF()	Subtracts time
TIMESTAMP()	With a single argument, this function returns the date or datetime expression. With two arguments, the sum of the arguments
TIMESTAMPADD()	Adds an interval to a datetime expression
TIMESTAMPDIFF()	Subtracts an interval from a datetime expression
TO_DAYS()	Returns the date argument converted to days
UNIX_TIMESTAMP()	Returns a UNIX timestamp
UTC_DATE()	Returns the current UTC date
UTC_TIME()	Returns the current UTC time
UTC_TIMESTAMP()	Returns the current UTC date and time
* WEEK()	Returns the week number
* WEEKDAY()	Returns the weekday index
* WEEKOFYEAR()	Returns the calendar week of the date (1-53)
* YEAR()	Returns the year
* YEARWEEK()	Returns the year and week

5. Data types

JavaScript
===
string
number
boolean
object

JavaScript Subtype
==
Date
Array

Other
==
INT, etc.


jstypeid
==


15. PERSISTENCE
====

Adapters
Memory


Node
==
Redis, Memcached, Key-Values


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


#### Version 0.0.26 - "Alasql and AlanosQL - like MongoDB"


* SELECT {a:2} AS alpha FROM one FIND {b:[2,3]}
* SELECT (a = 2) AS alpha FROM one WHERE b IN (2,3)
* one.find({b:[2,3]});

* one.insert({a:1});

* UPDATE one SET {a:2} WHERE {a:3}
* UPDATE one SET a=2 WHERE a=3
* one.update({a:2}, {a:3});

* DELETE FROM one FIND {a:2}
* DELETE FROM one WHERE a=2
* remove({a:2})

* JSON - pseudo-function and from-function

### LINQ Syntax

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

#### Version 0.0.30 - "NoSQL interface"

* inventory.find('inventory',{type:'food',$or:[{qty:{$gt:100}},{price:{$lt:9.95}}]}); 
* inventory.insert()
* inventory.update()
* inventory.remove()

#### Version 0.0.31 - "Linq interface"

* select().into().from().groupby().orderby().where()

#### Version 0.0.32 - "Promised version"

Alternative
* alasql('SELECT * FROM ? WHERE {qty:[1,2]}', [data]);
alasql.compile('SELECT * FROM ? WHERE {qty:[1,?]}'); - ParamValue


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


#### Version 0.0.120 - "JQuery plugin"

* $.alasql(sql, params) plugin

#### Version 0.0.121 - "Angular plugin"

* AngularJS plugin 

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

#### Version 0.0.128 - "LINQ like queries"

* Pass-thru SQL to server or custom driver


#### Version 0.0.132 - AlaChartSQL

* Demo with charts and SQL (compare to https://github.com/paulasmuth/fnordmetric)

#### Version 0.0.133 - AlaTextSQL

* Utility for OS command line query and text processing

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


