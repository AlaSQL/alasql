# To do

## RELEASES PLAN

#### Version 0.0.15 - "Battle for functionality"

* Sandbox for Website
* Dates parsing

#### Version 0.0.16 - "Battle for SQL-92"

* Fix Dates issues (comparision, ordering)
* Upper and lower case in tables, columns, and functions names issue
* Many-many SQL-92 Tests 
* Complaience with [SQL-92 specifications](http://savage.net.au/SQL/sql-92.bnf.html) where it is possible 
* Chrome/FireFox/Safari/IE/Chromium/Opera/Node.Js/Rhino/iOS/Android/Win8 compatibilty tests
* NULL, IS NULL
* SQL-errors 
* AVG()
* PIVOT like [T-SQL](http://technet.microsoft.com/en-us/library/ms177410(v=sql.105).aspx)
* Third UNION order issue
* Float numbers like 10e20
* INSERT DEFAULT VALUES
* Development environment (clean gulp code)

#### Version 0.0.17 - "Battle for Performance"

* Remove forEach loops
* EXPLAIN
* Optmization parameters
* Data types reolution for subqueries
* Indices
* Transactions

#### Version 0.0.18 - "Battle for Memory"

* Memory leaks
* Minification
* Persistence
* ALTER TABLE
* CONSTRAINTS, PRIMARY KEYS
* Triggers

#### Version 0.0.19 - "JavaScript Dao"

* JavaScript API clarification

#### Version 0.0.20 - "Battle with Bugs"

* Bug fixing release (alpha for 0.1)

### Version 0.1 - "First Pancake!"

### Version 0.2 - NoSQL supports

* JavaScript search like MongoDB

### Version 0.3 - OLAP + MDX

* Mini MDX parser
* JavaScript in-memory OLAP functionality (additional library)

## FEATURES TO BE IMPLEMENTED SOON

* BEGIN COMMIT ROLLBACK
* INSERT INTO test SELECT 'a' UNION ALL SELECT '10'
* AVG aggregator (http://www.w3schools.com/sql/sql_func_avg.asp)
* SELECT INTO table IN database FROM query [like this](http://www.w3schools.com/sql/sql_select_into.asp)
* Change grammar for LogicValues
* GO* Separate branch on github.com for development

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

PERSISTENCE

* WebSQL
* localStorage / sessionStorage
* IndexedDB
* lawnchair.js
* Serer synchronization JavaScript plugin (like [WebSqlSync](https://github.com/orbitaloop/WebSqlSync))

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
* Better parser and SQL-formatter

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
