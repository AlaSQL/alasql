# To do

URGENT BUGS OR FEATURES

* SELECT COUNT(*)

REFACTORING

* Change recs => data
* flds => fields
* fldid => id


Optimization

* Replace join recursion with loop (may be faster) [like here](http://architects.dzone.com/articles/sql-execution-plans-javascript)
* Optimizations for joins and subqueries
 * SELECT * FROM g WHERE f(without any other tables than g)
 * SELECT * WHERE f AND f AND f AND g(with other tables)
 * SELECT * FROM f JOIN g ON f1 = g2 AND F1(f) = G1(g) AND F2(not g) = G2(not f) 
 * FOREIGN KEY JOINS
 * WHERE f < const (or <=, >, >=)
 * WHERE a AND b
 * WHERE a OR b
 * ORDER BY WITH index
* Optimization of WHERE and JOINS with indices 
* Indices with hash
* Dirty data and indices update
* Code refactoring
* Performance tests and optimization
* Minimize size
* Indices with insert/delete/update procedure
* EXPLAIN QUERY PLAN (like [SQLite does](https://www.sqlite.org/eqp.html))
* Faster INSERT statement parser (now it is very slow)
* Combine selectwhere and groupfn functions

SELECT AND OTHER SQL STATEMENTS

* Fast join of single value with indices (PRIMARY KEY)
* Aggregators and functions
* Multiple FROM (cartesian multiplication)
* SubQueries
* UNION
* Query with parameters
* RIGHT JOIN, FULL OUTER JOIN
* SQLite compatibility: functions
* Constrains, Foreign Keys, Primary key, cascade delete and update
* Types, NULL, NOT NULL
* Database.schema.table.field
* Constrains
* Keys
* Null not null
* Primary key
* Rowversion, rowversion on insert, delete
* JavaScript functions
* Identity 1,1, unique fields
* SELECT TOP
* SELECT INTO table FROM query
* FETCH 
* Case operator
* Multiple statements with ';'
* Databases
* Transactions
* Views (?)

BUGS

* Fix 'STAR BUG' and some other minor sql-parser issues
* Date comparison 
* Tableid and fields to lowercase
* Aggregators without groups
* 'SELECT wrongfield FROM table' gives something wrong 
* LEFT JOIN - empty fields for non existing tables


DEVELOPMENT

* Gulp.js/Minifiication/package with 'sql-parser'

REALIZATION

* WebWorkers
* Redis, levelDB, IndexDB, localStorage for persistence 
* Persistence
* Split parsing, compilation, and execution functions
* JSon sql definition
* Compile to asm.js
* Executor
* Compiled procedures
* Compiled statements
* alasql2js compiler

ANYDATABASE
* Any database
* Node.js server
* Pass-thru database

COMPATIBILITY

* Compatibility
* Test with ie and Firefox browsers
* Tests for different browsers (IE!!!)
* Crossfilter, lodash and underscore speed comparision
* Cover WebSQL and Sql.js with own functions (for simple migrating)

OTHER NEEDED FUNCTIONALITY (MORE THAN SQL)

* OLAP
 * Pivot operator
* Totals (this is non-SQL functionality, but required)
* Running totals 
* Hierarchy totals
* Totals with insert/delete/update procedure

MDX
* MDX parser
* MDX processor

SAMPLES

* Modify [W3C SQL demo database](http://www.w3schools.com/w3Database.js) to work with alasql.js

OTHER

* It does not use websql 
* Create site alasql.org
