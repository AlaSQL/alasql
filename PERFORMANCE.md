# Performance Tests

##JSPerf test

Compare alasql.js vs sql.js at [jsPerf](http://jsperf.com/sql-js-vs-alasql-js/3).

As we can see sql.js is optimized for Firefox (probably, because asm.js).

## Other tests

I compared three databases: 

* alasql.js
* sql.js
* WebSQL

The test is located in [test/perf.html](test/perf.html).

Three tests:
1. Open database and then create two tables: test1 and test2
2. Insert 1000 records into each of tables
3. Run comple select with JOIN, GROUP BY and ORDER BY

SQL statements:

```
	'DROP TABLE IF EXISTS test1',
	'DROP TABLE IF EXISTS test2',
	'CREATE TABLE test1 (one INT, two INT)',
	'CREATE TABLE test2 (two INT, three INT)'

	INSERT INTO test1 VALUES (x,y)  -- 1000 times
	INSERT INTO test2 VALUES (x,y)  -- 1000 times

	SELECT SUM(test1.one) AS sumone, test1.two, test2.three 
	  FROM test1 
	  JOIN test2 ON test1.two = test2.two 
	  WHERE test1.one > 5 
	  GROUP BY test1.two, test2.three 
	  ORDER BY three, sumone

```

Here are the results:

alasql.js
* 19 ms 
* 3803 ms for 'INSERT' or 7 ms if use JavaScript array.push()
* 63 ms

sql.js
* 187 ms
* 2086 ms
* 908 ms

WebSQL
* 37 ms
* 100 ms
* 168 ms

Results:

1. For creation of database and tables the difference is not so important
2. alasql is slower on direct INSERT if use string 'INSERT' statements, because of slow parsing. But alasql is fastest if You use JavaScript functions to fill array table.recs with data.
3. alasql is fastest for SELECT query on 1000 records.

When I increased number of records to 10000 in each of tables, WebSQL wins with 692 ms against 4 sec for alasql.js and 95 sec for sql.js.





