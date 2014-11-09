# To do

## RELEASES PLAN

#### Version 0.0.15 - "Battle for functionality"

* Tests
* INSERT INTO test SELECT 'a' UNION ALL SELECT '10'
* CASE
* Sandbox for Website
* MID(), ROUND(), FORMAT(), 

#### Version 0.0.16 - "Battle for SQL"

* Fix Dates issues
* SQL-errors 
* Many-many SQL/92 Tests
* Chrome/FireFox/Safari/IE/Chromium/Node.Js/Rhino/iOS/Android/Win8 compatibilty tests
* AVG()
* NULL, IS NULL
* PIVOT

#### Version 0.0.17 - "Battle for Performance"

* Remove forEach loops
* EXPLAIN
* Indices
* Transactions

#### Version 0.0.18 - "Battle for Memory"

* Memory leaks
* Persistence
* ALTER TABLE
* CONSTRAINTS, PRIMARY KEYS
* Triggers

#### Version 0.0.19 - "Battle with Bugs"

### Version 0.1.0 - "First Pancake!"

### Version 0.2.0 - NoSQL supports

* Like MongoDB search

### Version 0.3.0 - OLAP + MDX

* MDX parser

## FEATURES TO BE IMPLEMENTED SOON

### THEN

* FULL OUTER JOIN
* CASE operator
* AVG aggregator (http://www.w3schools.com/sql/sql_func_avg.asp)
* LIKE '%a%'
* SELECT INTO table IN database FROM query [like this](http://www.w3schools.com/sql/sql_select_into.asp)
* BEGIN COMMIT ROLLBACK
* Change grammar for LogicValues
* GO* Separate branch on github.com for development
* PIVOT

Optimization

* WHERE multiple optimization
* Performance Tests based on SQLite [tests](http://www.sqlite.org/speed.html)
* Pass [SQL Logic Test](http://www.sqlite.org/sqllogictest/doc/trunk/about.wiki)
* Optimization for EXISTS subqueries (check if column is from outer select)
* Replace join recursion with loop (may be faster) [like here](http://architects.dzone.com/articles/sql-execution-plans-javascript)
* Optimizations for joins and subqueries
* SELECT * FROM f JOIN g ON f1 = g2 AND F1(f) = G1(g) AND F2(not g) = G2(not f) 
* FOREIGN KEY JOINS
* WHERE a OR b optimization
* ORDER BY WITH index
* Optimization of WHERE and JOINS with indices 
* Indices with hash
* Dirty data and indices update
* Code refactoring
* Performance tests and optimization
* Minimize size
* Indices with insert/delete/update procedure
* EXPLAIN QUERY PLAN (like [SQLite does](https://www.sqlite.org/eqp.html))
* Combine selectwhere and groupfn functions
* Semi-joins (for outer joins) 
* Expand outer join to N tables (not only two)
* INSERT INTO SELECT statement

SELECT AND OTHER SQL STATEMENTS

* Fast join of single value with indices (PRIMARY KEY)
* GROUP BY ALL
* FULL OUTER JOIN
* ANTI-JOINS, SEMI-JOINS
* [NATURAL JOIN](http://docs.oracle.com/javadb/10.6.2.1/ref/rrefsqljnaturaljoin.html#rrefsqljnaturaljoin)
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
* Views (?)
* Cursors
* SQLite compatibility: functions
* SQL-standards - check [this](https://www.sequelsphere.com/dbdocs/supported-sql/)
* SQL-functions - check [this](https://www.sequelsphere.com/docs/latest/doc/Supported%20SQL%20Functions.html)

BUGS

* Tableid and fields to lowercase
* Aggregators without groups
* 'SELECT wrongfield FROM table' gives something wrong 
* Change order of groupfn() and selectfn(), and check havingfn vs selectfn


DEVELOPMENT

* Minifiication

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
* Be compatible with [w3school](http://www.w3schools.com/sql/default.asp)
* [Oracle syntax](http://docs.oracle.com/javadb/10.6.2.1/ref/rrefclauses.html)
* Check [SQL BNF](http://www.contrib.andrew.cmu.edu/~shadow/sql/sql2bnf.aug92.txt)

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

* Check for compatibility with [W3C SQL demo database](http://www.w3schools.com/w3Database.js)
* Console [like](http://www.moxleystratton.com/files/sqittle.html) 
* One more [sample](http://yradtsevich.github.io/pure-js-websql/test/index.html)
* Create tutorial database on https://github.com/txje/js-sql-tutorial for best console

OTHER

* Create site alasql.org
