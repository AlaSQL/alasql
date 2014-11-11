# Changelog

### 0.0.16 (11.11.2014)

* PRIMARY KEY and FOREIGN KEY parser
* Use array of arrays as parameter value for FROM clause, column names like \[2\] or table\[0\] 
* alasql.queryArrayOfArrays(), utils.arrayOfArrays()

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

### 0.0.7 (06.11.2014)

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


