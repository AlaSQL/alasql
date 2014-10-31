# To do

URGENT BUGS OR FEATURES TO BE IMPLEMENTED

* 'STAR' bug
* SELECT COUNT(*)
* ROLLUP() AND CUBE(), GROUPING() [GROUPING SETS()](http://technet.microsoft.com/en-us/library/bb522495(v=sql.105).aspx)
* GROUP BY ALL

CODE REFACTORING

* Change recs => data
* flds => fields
* fldid => id
* Parser


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
* Compare algorithms with [SQLike](http://www.thomasfrank.se/SQLike/) and other JS databases
* Add ROLLUP and CUBE functionality
* Add permutations for CUBE
* Semi-joins (for outer joins) 
* Put from table into joins list. Create new joinorder list with semi joins and flipped right joins.
* Expand outer join to N tables (not only two)
* USING clause (http://docs.oracle.com/javadb/10.6.2.1/ref/rrefsqljusing.html) and optimization
* INSERT INTO SELECT statement
* BETWEEN

SELECT AND OTHER SQL STATEMENTS

* Fast join of single value with indices (PRIMARY KEY)
* Aggregators and functions
* Multiple FROM (cartesian multiplication)
* SubQueries
* UNION
* Query with parameters
* RIGHT JOIN, FULL OUTER JOIN
* CROSS-JOIN (http://docs.oracle.com/javadb/10.6.2.1/ref/rrefsqljcrossjoin.html#rrefsqljcrossjoin)
* ANTI-JOINS, SEMI-JOINS
* WHERE EXISTS
* NATURAL JOIN (http://docs.oracle.com/javadb/10.6.2.1/ref/rrefsqljnaturaljoin.html#rrefsqljnaturaljoin)
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
* Cursors
* SQLite compatibility: functions
* SQL-standards - check [this](https://www.sequelsphere.com/dbdocs/supported-sql/)
* SQL-functions - check [this](https://www.sequelsphere.com/docs/latest/doc/Supported%20SQL%20Functions.html)

BUGS

* Fix 'STAR BUG' and some other minor sql-parser issues ()
* Date comparison 
* Tableid and fields to lowercase
* Aggregators without groups
* 'SELECT wrongfield FROM table' gives something wrong 
* LEFT JOIN - empty fields for non existing tables
* Change order od ORDER BY and LIMIT processing
* Change order of groupfn() and selectfn(), and check havingfn vs selectfn


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
* Realize SQLite functions (from [documentation](http://kripken.github.io/sql.js/documentation/))
* Test with ie and Firefox browsers
* Tests for different browsers (IE!!!)
* Crossfilter, lodash and underscore speed comparision
* Cover WebSQL and Sql.js with own functions (for simple migrating)
* Be compatible with w3school (http://www.w3schools.com/sql/default.asp)
* Oracle syntax (http://docs.oracle.com/javadb/10.6.2.1/ref/rrefclauses.html)

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
* Console [like](http://www.moxleystratton.com/files/sqittle.html) 
* One more [sample](http://yradtsevich.github.io/pure-js-websql/test/index.html)
* Create tutorial database on https://github.com/txje/js-sql-tutorial for best console

OTHER

* It does not use websql 
* Create site alasql.org
