# To do

### Future Plans

1. Aggregators and functions

Optimization

* Replace join recursion with loop (may be faster) [like here](http://architects.dzone.com/articles/sql-execution-plans-javascript)
* Optimizations for joins and subqueries
 * SELECT * FROM g WHERE f(without any other tables than g)
 * SELECT * WHERE f AND f AND f AND g(with other tables)
 * SELECT * FROM f JOIN g ON f1 = g2 AND F1(f) = G1(g) AND F2(not g) = G2(not f) 
* Optimization of WHERE and JOINS with indices 
* Indices with hash
* Dirty data and indices update
* Code refactoring
* Performance tests and optimization
* Minimize size

SELECT AND OTHER SQL STATEMENTS

* SubQueries
* UNION
* Query with parameters
* RIGHT INNER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN
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
* FETCH 
* Case operator
* Multiple statements with ';'
* Databases
* Transactions

OLAP

* Pivot operator
* MDX 

BUGS

* Fix 'STAR BUG' and some other minor sql-parser issues
* Date comparison 
* Tableid and fields to lowercase


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

OTHER

* It does not use websql 
* Create site alasql.org
