# Changelog


_0.4.3 "Hajjah" (xx.08.2017)_

* ...

## 0.4.2 "Baraqish" (xx.08.2017)

* Added: SQL function LTRIM
* Added: SQL function RTRIM
* Better: Remove implicit any in type script definitioni
* Better: Out-of-the-box Webpack and Browserify compatibility without hacks
* Fix: Use created database id on foreign key check as default database

 
## 0.4.1 "Sayhut" (23.07.2017)

* Better: Performace on `distinct` selects 
* Better: Hashing for cashed SQLs 
* Fix: Case insensetive selects from EXCEL
* Fix: Select from empty EXCEL


#0.4.0 "Sanaa" (09.05.2017)
* **Breaking:** OFFSET will now skip the first N rows in a result set before starting to return any rows (before it would skip N-1)
* Add: Quartile aggregators (QUART, QUART2, QUART3)
* Add: Typescript definitoin now supports extensions
* Fix: Aggregate MEDIAN now working with ROLLUP
* Fix: Aggregate STDEV now working with ROLLUP
* Fix: SHOW COLUMNS works with the promise interface 
* Fix: SHOW INDEX works with the promise interface 

### 0.3.9 "Turua" (23.03.2017)
* Add: React native support
* Fix: CSV error when quote set to empty
* Fix: autoExt bug when not set for CSV on read

### 0.3.8 "Wanaka" (15.03.2017)

* Added: Lazy promise notation
* Added: Create user defined function via SQL statement
* Added: Create user defined aggretator via SQL statement 
* Added: Auto extension for filenames on read + write
* Fix: `.xlsx` can now be imported via browser "upload"
* Update: `xls.js` package not needed any more. Only `xlsx` package is needed. 

### 0.3.7 "Niau" (20.02.2017)

* Added: Last `S` in `VALUES` can be omitted when insterting (For the lazy ones)
* Added: The `VALUES` keyword is optional when insterting (For the very lazy ones)
* Fix: Multiple worksheet Excel with custom headers 


### 0.3.6 "Hipu" (24.01.2017)

* Addded: Support for "use strict" 
* Fix: Select.toString() had bugs
* Update: Better and faster deep compare of objects


### 0.3.5 "Maiao" (22.12.2016)
* Added: Import data through AngularJS controllers
* Added: Support for running in VM for nodeJS
* Fix: Typescript definition
* Fix: False negatives for deepequal'ing of extended primitives
* Fix: Double quotation marks in CSV output


### 0.3.4 "Fitii" (09.11.2016)
* Added: trigger `AFTER DELETE`
* Fix: `TRUNCATE TABLE` now works for local storage DB
* Fix: `JOIN` a sub select
* Removed: The `HELP` command (to save space) 


### 0.3.3 "Makemo" (13.10.2016)
* Add: support for VALUE inside checks
* Add: Conflate null and undefined
* Add: Load CSV data from a string
* Add: Warn when server side uses browser build of lib
* Update: typescript definition for native import 
* Update: filesaver.js updated to 1.3.2


### 0.3.2 "Maumu" (05.09.2016)
* Added: Postgres arrays like array[] and text[]
* Added: Allow non-reserved keywords as identifiers
* Fix: Empty tsv/csv files will no longer raise an error
* Fix: alasql.d.ts format
* Fix: Better way to find out if indexedDB is present
* Fix: `null = null` is (now) null, baby.
* Update: Column names first for RECORDSETS


### 0.3.1 "Taravao" (01.08.2016)
* Allow unknown functions to be defined on alasql.fn afterwards
* Easy access to AUTOINCREMENT values
* MEDIAN will ignore null values 
* STDEV will ignore null values


## Version 0.3.0 "Papeete" (25.07.2016)
* Breaking change: CSVs with header will now default have BOM added (for better utf8 support) 
* Added: Constraint names will now be exported in error message
* Added: Web worker now supports .promise notation
* Added: Postgres-specific aliases and fixes
* Added: Make converting to an unknown type result in a noop rather than an error
* Added: Support column types consisting of more than 2 words


### 0.2.7 "Corinth" (30.05.2016)
* Added: Now supports Node 6.0 
* Added: Let .promise return all responses (not just last) 
* Change: Headers set as default true for INTO and FROM statements
* Fix: Back on track (for good) with supporting Meteor 
* Fix: Default tentative string to numbers conversion when reading data from google spreadsheets 
* Update: No need for empty params when async
* Update: Better hashing for cashing


### 0.2.6 "Frikes" (22.04.2016)
* Added: Progress callback
* Change: CLI defaults to pretty print (with option for compressed output as original)
* Fix: Declaring all variables
* Fix: Read XLSX files
* Fix: Selecting a view from localstorage 
* Fix: CREATE VIEW for localStorage engine 
* Fix: Better use for RequireJS
* Update: CLI output is guaranteed to be valid JSON 
* Update: Better error message for missing table or column
* Update: Typescript defenition for .promise
* Update: Empty params not needed for async calls


### 0.2.5 "Polychrono" (23.03.2016)
* Added: Promise chain of queries
* Fix: Remove leading whitespace from fields when importing csv files
* Fix: Set default option for XLSXML
* Fix: Use callbacks consistently 


### 0.2.4 "Exogi" (04.03.2016)
* Added: Central enviroment detection
* Added: SELECT * FROM ? GROUP BY a works as FIRST(*)
* Added: Better detection for browserify, phonegap and cordova
* Fix: CONCAT without space
* Fix: IE11: Reading Excel File
* Fix: Date handeling (in)dependent from locale


### 0.2.3 "Spetses" (01.02.2016)
* Changed: New fast way to calculate aggregators (some parameters changed)
* Added: User defined aggregators
* Fixed: Remove empty Last line in TXT and XLSX
* Changed: {headers:true} now is default option
* Fixed: option.joinstar flag for SELECT * FROM a,b
* Added: EXP() function, ^ now is XOR, ~ binary NOT
* Added: REPLACE() string function (see issue #560)
* Added: NEWID(), UUID() and GEN_RANDOM_UUID() functions for GUID
* Added: DEFAULT for column can be a function (e.g. DEFAULT NEWID())


### 0.2.2 "Mitilini" (15.01.2016)
* Fix: SELECT can use functions from GROUP BY list
* Fix: Bug in NUMERIC type conversion
* Added: functions CEIL/CEILING and FLOOR
* Added: CONCAT to the list of standard functions
* Fix: Bug with primary key after DELETE all
* Fix: Added String() to UPPER() and LOWER() functions 
* Added: PIVOT and UNPIVOT functionality
* Added: REPLACE INTO command (see issue #467)
* Added: ON UPDATE - column constraint
* Fix: COLLATE and UNIQUE KEY words for CREATE TABLE (see issue #452)
* Fix: Added params to SEARCH WHERE function
* Added: TRIGGERs
* Fix: Bug with MATRIX modifier
* Fix: Bug with undefined content variable with IN operation (issue #501)
* Fix: Bug with wrong realizaion of REPLACE INTO (issue #505)
* Added: >>,<<,&,| - binary operations
* Added: || - string concatenation (issue #514)
* Added: GLOB operator
* Fix: >> for binary operation and graphs collisions
* Added: SELECT * FROM INSERTED (for T-SQL like triggers)
* Fix: Added DEFAULT clause to INSERT SELECT statement
* Added: expression NOT NULL operator (issue #507)
* Added and Fix: REINDEX and fixed CREATE INDEX (issues #509, #470)
* Fixed: browser tests, IndexedDB tests, DROP TABLE callback for external engines
* Added: DATETIME2 type for compatibility with T-SQL
* Added: DATEADD() and DATEDIFF() functions in T-SQL style
* Added: CONCAT_WS() function
* Added: OF() selector for SEARCH statement

### 0.2.1 "Rodos" (28.09.2015)
* Added: AlaSQL CLI: Support for --version flag
* Added: AlaSQL CLI: support for CLI exit code 
* Added: AlaSQL CLI: Missing file now won't throw exception (but log error text) nor if its a folder
* Added: Support for using _ as a single wildcard in LIKE queries
* Added: Support for FETCH NEXT syntax in queries (MSSQL/T-SQL)
* Added: SUBSTR() alias for MID() function (for SQLite compatibility)
* Added: LIKE ESCAPE functionality
* Added: REGEXP operator (like MySQL) and REGEXP_LIKE() function (like in Oracle)
* Added: INSERT OR REPLACE VALUE, INSERT OR REPLACE SELECT
* Added: Read Blob as parameter for from-functions like XLS()
* Fix: .CSV files made Excel 2013 compliant 
* Fix: misbehavour related to 'NOT' and '=' predecession
* Fix: alasql running from cordova on iOS


## Version 0.2.0 "Athens" (13.07.2015)
The purpose of this release were hard work on:
* Documentation
* Resolving bugs
* Refactoring code
 
Minor verison updated to sync lib, Meteor and npm version

### 0.1.11 "San Remo" (03.06.2015)
* Code partially refactored with help of bitHound 
* New directory 'partners' added
* Added file for codecomplexity.com

### 0.1.10 "Genova" (31.05.2015 - 02.06.2015)
* CALL procedure() statement
* bitHound advices
* bower.json file updated

### 0.1.9 "Torino" (29.05.2015 - 31.05.2015)
* SERIAL data type added
* Changed package.json
* Sample application AlaSQL Codex (alasql.org/codex)
* Changed type conversion procedure for INTEGER, JSON and other types
* TypeScript definition file: alasql.d.ts

### 0.1.8 "Pisa" (22.05.2015 - 28.05.2015)
* SELECT FROM syntax
* Export to multiple sheets workbook
* SQL-99 features list
* Changed README.md
* PEOPLE.md moved to wiki
* VALUE OF SELECT operator
* bitHound file

### 0.1.7 "Parma" (17.05.2015 - 22.05.2015)
* Fixed BETWEEN AND and AND parsing priority bug (KPI1:95%)
* Fixed SUM() with NULL(undefined) values
* SLT tests run
* select1.test passed 100%
* Set jsdoc environment
* Added 'var y' and functions for NULL and undefined conversions
* Fixed AVG() aggregator for NULL elements
* New gulp commands: 'gulp doc' and 'gulp console'
* Some jsDoc documentation tag added
* Expression statement ( = 2*2 )

### 0.1.6 "Palermo" (13.05.2015 - 17.05.2015)
* SET NOCOUNT OFF (for CREATE and INSERT)
* ROWNUM() and ROW_NUMBER() functions
* Promised version of alasql() - alasql.async() (based on es6-promises)
* SELECT * FROM Json
* SEARCH COMMA selector
* Fixed bug with ORDER BY 1,2,3
* Added subqueries for INSERT/DELETE/UPDATE
* First 'official' ECHO plugin released (REQUIRE ECHO)
* New catalogs added for future plugins
* Meteor package 'agershun:alasql'
* Changed readFile and readBinaryFile to read data from Meteor server
* Added alasql.path
* Test program improved

### 0.1.5 "San Marino" (12.05.2015 - 12.05.2015)
* Added Meteor package (agershun:alasql) - still does not work - skeleton
* Northwind test database - test for speed and SQL
* Added w3 database (Northwind analogue)
* Fixed FOREIGN KEY problem

### 0.1.4 "Napoli" (09.05.2015 - 11.05.2015)
* Convert Meteor/Mongo collections on the fly 
* Added METEOR() from-function
* Fixed $[0] -> $0 for parameters
* utils/2ch.js - utility for minification of AlaSQL (calculate size of economy)
* d3 graph path samples
* alasql.options.autovertex flag - create vertices if not found
* EQ() selector
* LIKE selector
* RETURNS selector - return record with columns like in SELECT
* ALL() and ANY() selectors
* Added CREATE TABLE column UNIQUE constraint on INSERT/DELETE/UPDATE
* Added OBJECT_ID() function (like in T-SQL)
* Added parts and optional for specific database compatibility
* Changed REFERENCES syntax
* dbo always as default database (for some compatibility with T-SQL)
* NOT NULL check on INSERT/UPDATE
* CHECK constraint (for whole table)
* CURRENT_TIMESTAMP function
* UNIQUE constraint (whole table)
* VARCHAR(MAX)
* CHECK constraint for columns
* FOREIGN KEYS for columns and tables

### 0.1.3 "Vaticano" (08.05.2015 - 09.05.2015)
* Check for null values for SEARCH
* ORDER BY for SEARCH operator
* Brackets for SEARCH selectors (WITH() selector)
* SEARCH DISTINCT, UNION ALL, UNION selectors
* Added simple PATH() selector

### 0.1.2 "Firenze" (06.05.2015 - 07.05.2015)
* Simple compilation of SEARCH operator
* SUM(),COUNT(),MIN(),MAX(),FIRST(),LAST() search aggregators
* # operator, CREATE VERTEX #
* SEARCH # - start with object
* SERCH smth # - test for object
* SEARCH VALUE - leave only one first object in the result
* Bug in browser version (no global object)
* Changed Bower
* CREATE GRAPH
* Minor changes in SEARCH over XML syntax
* New tests added

### 0.1.1 "Milano" (03.05.2015 - 04.05.2015)
* XLSXML() into- function with colors
* $$hashKey - remove Angular's key
* CREATE VERTEX, CREATE EDGE
* SEARCH objects
* SEARCH graph
* "name" as name for graph vertices and edges
* Added INSTANCEOF selector
* Added CLASS selector
* * selector, + selector, ? selector, !selector for SEARCH in JSON and graphs
* XML() from function
* SEARCH INTO functions

## 0.1.0 (aka 0.0.52) "Venice" (02.05.2015 - 03.05.2015)
* Added INFORMATION_SCHEMA from variable
* Fixed localstorage dropTable with AUTOCOMMIT OFF
* STD() function added, STDEV(),STEDEVP(),VAR(),VARP()
* DISTINCT and ALL with custom aggregators (like STD(DISTINCT a))
* UNION problem fixed
* IE9 - save plain text and XLS()

### 0.0.51 "Rimini" (23.04.2015 - 02.05.2015)
* alasql.options.modifier flag added
* alasql.options.columnlookup flag added
* SELECT * REMOVE COLUMNS a,b 
* SELECT * REMOVE COLUMNS LIKE 'b%' 
* Remove columns from .columns schema
* Custom aggregators - added additional calls (init and in the cycle)
* Added MEDIAN() aggregator

### 0.0.50 "Seoul" (21.04.2015 - 22.04.2015)
* CREATE VERTEX and CREATE EDGE syntax
* Fixed MIN and MAX functions and aggregators #93
* Found UPDATE bug with column/columnid
* Fixed bug with valueOf in comparision

### 0.0.49 "Beijing" (19.04.2015 - 21.04.2015)
* CREATE CLASS
* INSERT INTO class
* INSERT INTO class returns inserted value
* # operator
* Classes support
* Tests with SEARCH syntax and tests for CREATE EDGE and CREATE VERTES
* Fixed bug with leaking to global.key

### 0.0.48 "Amsterdam" (18.04.2015 - 19.04.2015)
* Fixed bug indexedDB.webGetDatabaseNames in Firefox
* Some bugs from Sqllogictest fixed (see test258)
* Bower package registered
* Fixed CASE bonding query to this error

### 0.0.47 "Antalya" (16.04.2015 - 18.04.2015)
* Added CORRESPONDING keyword to the grammas
* Fixed export to Excel - with data types
* New version of FileSaver is updated
* New INTO XLS() function with colors(!)
* Added params parameter to intoallfn()
* master and develop branches fixed

### 0.0.46 "Cape Town" (14.04.2015 - 14.04.2015)
* Cleaned 'test' directory
* Fixed problem with tests
* Fixed bug with localStorage DELETE FROM (without WHERE)

### 0.0.45 "Rio de Janeiro" (13.04.2015 - 13.04.2015)
* Changed CRLF for alacon.js and alaserver.js to LF

### 0.0.44 "Roma" (02.04.2015 - 13.04.2015)
* Added params to SQLite attached database: alasql('ATTACH SQLITE DATABASE a(?)',[event],cb);
* Root directory was cleaned
* Gulp version is updated
* Fixed bug with (SELECT) and EXISTS() in SELECTS with GROUP BY

### 0.0.43 "The Wall" (25.03.2015 - 01.04.2015)
* Created "develop" branch for git-flow
* Fixed GREATEST and LEAST() bugs
* Added flags {sourcefilename: "aaa", range:"B4"} to INTO XLSX() function
* CREATE TABLE one(two,three) - without coulmn types

### 0.0.42 "Robin" (17.03.2015 - 25.03.2015)
* MAX() and MIN() math functions renamed to GREATEST() and LEAST()
* ORDER BY 2,1
* :: casting operator
* UNARY PLUS
* NOT LIKE
* NOT\sLIKE and NOT\sBETWEEN for multiple spaces
* Removed "Test238"

### 0.0.41 "Eagle" (12.03.2015 - 17.03.2015)
* `column` for column names
* ``JavaScript expression`` for JavaScript
* Changed package.json (main:alasql.js)

### 0.0.40 "Sapsan" (24.01.2015 - 06.03.2015)

* IF EXISTS() and subqueries
* MERGE syntax
* alasql('#sql1');
* alasql(document.querySelector('#sql'));
* alasql(function(){/* SELECT 100 */}); for multiline SQL statements
* SELECT one.a,one.b INTO "one.xlsx" FROM "one.json" AS one
* Cut first BOM character when reading text files in UTF-8
* LIKE is case-insensitive

### 0.0.39 "Everest" (17.01.2015 - 23.01.2015)

* `JavaScript()` expressions and statements SELECT `Math.random()*100`
* Added conversion to number for strings like: ' 123 '
* Fixed from HTML() function (childNodes -> children)
* CREATE FILE DATABASE IF NOT EXISTS "filename.json"
* DROP FILE DATABASE IF EXISTS "filename.json"
* SELECT a->(1+1) - show ( and ) in toString() function
* CROSS APPLY and OUTER APPLY (!)
* Float numbers like 10e20
* SELECT COLUMN a+(SELECT MAX(b) FROM one) FROM one - SELECT in Expressions
* Turned off WHERE optimization (due some problem with indices)
* OVER PARTITION and OVER ORDER syntax
* NIST SQL Example Tests passed (except constrains and subquery in delete)
* Errors handling
* SET ERRORLOG ON/OFF (trap errors)
* COALESCE() function skips NaN values as well as NULL
* SET CACHE ON/OFF - turn on/off SQL statements caching
* loadFileFrom('#selector') - to read data from HTML <tag> 

### 0.0.38 "Elbrus" (17.01.2015 - 17.01.2015)

* Additional wrapper for FileSaver to work with R and V8 (http://cran.r-project.org/web/packages/V8/vignettes/v8_intro.html)
* Fixed ROLLUP, CUBE and GROUPING SETS()
* Added Apache Cordova for Windows 8 support


### 0.0.37 "Ararat" (09.01.2015 - 16.01.2015)

* Added test for "? IN @(?)"
* Convert  -> correct DATE("20141008")
* TRUNCATE TABLE table;
* Fixed bug when COUNT and SUM() aggregators shows 'undefined' with zero groups
* test-sql tests for compatibility with other databases
* SELECT TEXT -> SELECT TEXTSTRING (do not conflict with TEXT data type)
* Fixed bug: different databases for different FROM and JOIN parts
* Google Spreadsheet integration with Tabletop (https://github.com/jsoma/tabletop) FROM-function: alasql('SELECT * FROM TABLETOP(?)',[url]);
* Changed worker() method
* DECLARE with multiple variable definitions and initial value (DECLARE @one int = 123)
* SET a->property->0->(1+1) = 100
* Views: CREATE VIEW, DROP VIEW, SELECT FROM VIEW, JOIN VIEW
* Multi line comments /* */
* WITH SELECT statement
* Appach Cordova loadFile and saveFile procedures
* Test Alasql with Cordova on iPhone, iOS emulator, and Android emulator, Windows 8
* Fixed bug with npm install (bin directory)
* Fixed bug in localStorage with local variable
* fileExists() function
* FILESTORAGE engine for Node.js and Apach Cordova


### 0.0.36 "Happy New Year" (23.12.2014 - 08.01.2015)

* REDUCE Aggregator for custom aggregators
* LINQ functions (fluent interface):
 * alasql() or alasql(data)
 * From()
 * Where()
 * OrderBy()
 * GroupBy()
 * Having()
 * Select()
 * Top()
* RANGE(1,10) - from function => [1,2,3,4,5,6,7,8,9,10]
* HTML-from and into functions
* Clean root directory
* GO keyword as semicolon
* global alasql => var alasql
* SELECT * INTO SQL() FROM ? - into-function for generating INSERTS
* SELECT TOP 10 PERCENT * FROM ?
* ORDER BY _ - fixed
* ORDER BY formula (ORDER BY MID(a,2,1))
* GROUP BY formula (GROUP BY MID(a,1,1))
* HAVING with formulas (HAVING COUNT(*)>1)
* Fixed COUNT(*) and COUNT(expression)
* COUNT(DISTINCT all)
* Subquery SELECT (SELECT)
* IF expr statement 
* OBJECT_ID(tableid) function
* IS NULL and IS NOT NULL operators
* SET option value (ON/OFF)
* OVER PARTITION ORDER BY syntax
* SET option ON/OFF (alasql.options.autocommit)
* SUM(DISTINCT a)
* Create table column NULL constraint syntax
* WebWorker (alasql-worker.js)
* GETDATE() returns date 
* PRINT statement
* Tests renumbered and fixed
* REQUIRE 'plugin.js'
* alasql.worker("../alasql.js", ["plugins.js",...], callback)
* @localvariable
* SET @localvariable = expression
* WHILE, CONTINUE, BREAK, BEGIN END syntax
* WHILE statement
* alasql.worker() - run WebWorker
* alasql-worker.js - library to run webworker
* FROM @localvariable
* SELECT INTO @localvariable
* CONVERT(type,value,style)
* Fixed multiple same aggregators bug
* DECLARE @locarvariable type

### 0.0.35 (14.12.2014 - 22.12.2014)

* Added [?] array conversion
* ARRAY Aggregator (http://stackoverflow.com/questions/15887900/group-objects-by-property-in-javascript?rq=1)
* _ column for whole record
* SELECT INDEX
* SELECT RECORDSET
* SELECT TEXTSTRING

### 0.0.34 (14.12.2014 - 20.12.2014)

* New User Manual written
* Remove $$hashKey field for Angular.js integration
* New CSV and TAB parser with separators and quotes
* Fixed USING bug
* Fixed HAVING bug
* INTO JSON function() 

### 0.0.33 (12.12.2014 - 14.12.2014)

* SQL.js engine adapter (to real SQLite database)

### 0.0.32 (12.12.2014 - 14.12.2014)

* Read XLS and XLSX files (with xlsx package)
* AT is no longer required for json-objects @{}
* Stdin and stdout functions for Alacon (INTO TXT() FROM TXT())

### 0.0.31 (10.12.2014 - 11.12.2014)

* INSERT and DELETE for IndexedDB
* New tests for FROM and INTO functions
* UPDATE for IndexedDB
* DOM-storage support for Node.js (test159.js)


### 0.0.30 (03.12.2014 - 09.12.2014)

* Async version (except streamming)
* Fixed a hundred bugs after changes to async/sync version
* IndexedDB support (except INSERT/DELETE/UPDATE)
* DOM-Storage support (pull request #15)
* Grammar for STORE/RESTORE commands (for key-value storages)

### 0.0.29 (29.11.2014 - 02.12.2014)

* INSERT/DELETE/UPDATE for localStorage AUTOCOMMIT ON mode
* ROLLBACK for localStorage bug

### 0.0.28 (29.11.2014 - 01.12.2014)

* SET AUTOCOMMIT ON|OFF 
* localStorage in AUTOCIMMIT ON mode (without INSERT/DELETE/UPDATE)
* localStorage in AUTOCIMMIT OF mode (simple COMMIT)

### 0.0.27 (27.11.2014 - 29.11.2014)

* Function as a source of data for FROM ? AND JOIN ?
* Virtualization of source
* Query as a source in joins
* Multiple databases
* SELECT * INTO into-function() FROM from-function() 


### 0.0.26 (26.11.2014 - 26.11.2014)

* Show time in ms in Alasql Console
* JSON Object functions like d->getFullYear()
* JavaScript Dates
* SQL DATE functions
* alasql.stdfn() - runtime library
* CREATE TABLE AND INSERT with Date
* new Date()

### 0.0.25 (23.11.2014 - 25.11.2014)

* CAST(expression AS type)
* CONVERT(type, expression)
* alasql.options.datetimeformat = 'sql' / 'javascript' for CAST
* loadFile works in Node.js (changes some tests)
* SELECT VALUE
* SELECT ROW
* SELECT COLUMN
* SELECT MATRIX
* JSON(json-object)
* == and !== for deepEqual
* alacon - alasql console (to run: node alacon sql params...)
* Json property operator - JSON({a:1,b:[2,3]})->b->1 => 2
* Alaserver - server for Alasql

### 0.0.24 (23.11.2014 - 23.11.2014)

* Fixed LIKE operator (added ^ and $)
* Changed LOAD to SOURCE (like in MySQL)
* ASSERT operator
* JSON parser for ASSERT operator
* Fixed LIKE bug (need more attention)
* Fixed bug with default column names

### 0.0.23 (22.11.2014 - 22.11.2014)

* LOAD 'url.sql' - load and execute sql statements
* HELP - help on Alasql commands

### 0.0.22 (20.11.2014 - 22.11.2014)

* SELECT UNIQUE
* SELECT MINUS SELECT
* RENAME TABLE table TO literal
* ALTER TABLE table RENAME COLUMN column TO column
* ALTER TABLE table DROP COLUMN column
* Double quoter sign '' and \\' translates into '
* Test with World and Neptuno databases for compatibility
* alasql.test(), alasql.log(), alasql.write(), alasql.writep()
* Console

### 0.0.21 (19.11.2014 - 20.11.2014)

* SELECT a AS q, b w FROM one - AS is not required
* Comments '--' and '/* */' - single line
* Double quote sign in the string 'Bon''appetite'
* Compatibility with World Database (http://dev.mysql.com/doc/world-setup/en/index.html)
 * `literal` in backquotes like literal in square brackets [literal]
 * Additional grammar for ENGINE, CHARSET, etc. and other keywords for World database

### 0.0.20 (19.11.2014)

* SHOW DATABASES
* SHOW TABLES
* SHOW COLUMNS
* SHOW INDIEX (not fully)
* CREATE VIEW syntax
* Case-sensivity

### 0.0.19 (19.11.2014 - 19.11.2014)

* User-defined functions are database specific.
* Names in [brackets]

### 0.0.18 (15.11.2014 - 18.11.2014)

* Added more tests
* Some minor bugs

### 0.0.17 (13.11.2014 - 14.11.2014)

* Changed approach to execute and compilations
* Broke transactions (to be reviewed)

### 0.0.16 (11.11.2014 - 12.11.2014)

* PRIMARY KEY and FOREIGN KEY parser
* Use array of arrays as parameter value for FROM clause, column names like \[2\] or table\[0\] 
* alasql.queryArrayOfArrays(), utils.arrayOfArrays()
* PRIMARY KEY ON inseert, delete, update with one or multiple keys
* Fixed Uppercase and LowerCase problem
* CREATE DATABASE, USE DATABASE, DROP DATABASE
* CROSS and NATURAL JOINs
* RANDOM
* INSERT INTO table DEFAULT VALUES
* CREATE TABLE table (column type DEFAULT value)


### 0.0.15 (10.11.2014)

* alasql.userlib replaces with alasql.fn
* Fixed gulpfile.js
* CommonJS/AMD/UMD and require.js test
* alasql(sql, params, callback) function
* SELECT * FROM one AS t
* alasql('SELECT * FROM ? AS t', [data]); - array as subquery


### 0.0.14.5 (10.11.2014)

* valueOf() instead +Date();
* Date tests added
* INSERT date

### 0.0.14.4 (10.11.2014)

* Negative numbers 
* Float numbers
* Strings with single and double quaters
* CASE WHEN THEN END
* ROUND, MID

### 0.0.14.3 (09.11.2014)

* RIGHT / OUTER / SEMI / ANTI Joins!

### 0.0.14.2 (07.11.2014-08.11.2014)

* Added more tests

### 0.0.14.1 (07.11.2014-08.11.2014)

* Added more tests
* Minor bugs fixed
* Database.queryArray method()

### 0.0.14 (07.11.2014-08.11.2014)

* SELECT INTERSECT, EXCEPT
* BETWEEN, NOT BETWEEN
* Fixed problem wuth source.srcwherefn and query.wherefn
* IN (Subquery), NOT IN(Subquery) - IN(array)
* alasql.parser.parse renamed to alasql.parse
* Reduced AST tree in case of srcwherefn and wherefn optimizations in joins
* % (MODULO) operator (9%7 == 2)
* Fix 'undefined' column if alias is not exists
* x > ALL (subquery), x > SOME/ANY (subquery)
* Check if table exists in the database
* Multiple user defined functions arguments, like TRIPLE(a,b,c)
* SELECT TOP (as well as SELECT query LIMIT OFFSET)
* Fixed ALTER TABLE RENAME TO statement
* LEN(), UCASE(), LCASE(), UPPER(), LOWER(), NOW()
* Simple matching with LIKE '%day%'
* INSERT INTO test VALUES('a'),('10'),('20'),('c'),('30'),('d');
* SELECT INTO table SELECT query

### 0.0.13 (06.11.2014)

* FIRST(), LAST()
* Minor bugs with EXISTS 

### 0.0.12 (06.11.2014)

* SELECT * FROM test WHERE EXISTS(SELECT * FROM test2 WHERE test1.a = test2.a)
* User-defined functions (alasql.usrlib)

### 0.0.11 (06.11.2014)

* SELECT * FROM (SELECT * FROM test) t

### 0.0.10 (06.11.2014)

* SELECT UNION
* Started SQL tests

### 0.0.9 (06.11.2014)

* ROLLUP, CUBE, GROUPING SETS support

### 0.0.8 (06.11.2014)

* Minor bugs

### 0.0.7 (06.11.2014)

* WHERE column = expression optmization (creare index)

### 0.0.6 (04.11.2014)

* Developed new parser based on Jison
* Use Gulp for development platform
* Where optimization
* New names for fields => columns and recs => data

#### 0.0.5 (30.10.2014)

* Changed order of LIMIT and ORDER BY processing

#### Version 0.0.4 (28.10.2014-29.10.2014)

* Added /test/main.html mocha browser tests
* Added PERFORMANCE.md and perf.html tests
* StringValue.toJS()
* Added callback to Database.exec
* Sieve of Eratosthenes example
* Remove generation of recs after select in case of group by (for memory optimization)
* Added conversion for type MONEY for INSERT statement 

#### Versions 0.0.1 - 0.0.3 (25.10.2014-27.10.2014)

* First version of Alasql

