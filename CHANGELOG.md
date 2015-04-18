# Changelog

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
* StringValue.toJavaScript()
* Added callback to Database.exec
* Sieve of Eratosthenes example
* Remove generation of recs after select in case of group by (for memory optimization)
* Added conversion for type MONEY for INSERT statement 

#### Versions 0.0.1 - 0.0.3 (25.10.2014-27.10.2014)

* First version of Alasql

