# SQLlogictest results for AlaSQL 

`2016-09-23T04:20:05.093Z target: alasql@0.3.2`

This is a subset of the total 622 tests.
Results from 620 test files:

---- ---- ---- ---- ---- ---- ----
### 1/620 [`./test/evidence/in1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/in1.test)

_Mimic sqlite_

```sql
SELECT null IN ()

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT null NOT IN ()

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT 1 IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT 1 NOT IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT null IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT null IN (SELECT * FROM t1)

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT null NOT IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT null NOT IN (SELECT * FROM t1)

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT 1 IN t2

Cannot read property 't2' of undefined
```


```sql
SELECT 1 NOT IN t2

Cannot read property 't2' of undefined
```


```sql
SELECT null IN t2

Cannot read property 't2' of undefined
```


```sql
SELECT null IN (SELECT * FROM t2)

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT null NOT IN t2

Cannot read property 't2' of undefined
```


```sql
SELECT null NOT IN (SELECT * FROM t2)

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT 1 IN t3

Cannot read property 't3' of undefined
```


```sql
SELECT 1 NOT IN t3

Cannot read property 't3' of undefined
```


```sql
SELECT null IN t3

Cannot read property 't3' of undefined
```


```sql
SELECT null IN (SELECT * FROM t3)

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT null NOT IN t3

Cannot read property 't3' of undefined
```


```sql
SELECT null NOT IN (SELECT * FROM t3)

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT null IN (SELECT x+y FROM t1,t2)

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT 'hello' NOT IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT x'303132' IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT x'303132' NOT IN t1

Cannot read property 't1' of undefined
```


```sql
INSERT INTO t5 SELECT * FROM t4

Cannot insert record, because it already exists in primary key index
```

_Fail found in statement setting up data so skipping rest of tests_

#### ☓ Ran 217 tests as _sqlite_

* 149 skipped
* 29 failed
* 17% was OK


---- ---- ---- ---- ---- ---- ----
### 2/620 [`./test/evidence/in2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/in2.test)

_Mimic sqlite_

```sql
SELECT 1 FROM t1 WHERE NULL NOT IN ()

Query was expected to return results (but did not) 
```


```sql
SELECT 1 FROM t1 WHERE 1 IN ( NULL, 1 )

Query was expected to return results (but did not) 
```


```sql
SELECT 1 FROM t1 WHERE 1.0 IN ( NULL, 1.0 )

Query was expected to return results (but did not) 
```


```sql
SELECT 1 FROM t1 WHERE '1' IN ( NULL, '1' )

Query was expected to return results (but did not) 
```


```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)

Expected to get an error but did not
```


```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT x,y FROM t1)

Expected to get an error but did not
```


```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT * FROM t1)

Expected to get an error but did not
```


```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT min(x),max(x) FROM t1)

Expected to get an error but did not
```

#### ☓ Ran 53 tests as _sqlite_

* 8 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 3/620 [`./test/evidence/slt_lang_aggfunc.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_aggfunc.test)

_Mimic sqlite_

```sql
SELECT avg(DISTINCT x) FROM t1

Expected: ["0"] but got ["0.500"]
```


```sql
SELECT total(DISTINCT x) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT group_concat(DISTINCT x) FROM t1 NOT INDEXED

alasql.fn.group_concat is not a function
```


```sql
SELECT avg(x) FROM t1

Expected: ["1"] but got ["1.250"]
```


```sql
SELECT sum(y) FROM t1

Expected: ["0"] but got ["truefalseNULLtruetrue"]
```


```sql
SELECT total(y) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT group_concat(y) FROM t1

alasql.fn.group_concat is not a function
```


```sql
SELECT sum(DISTINCT y) FROM t1

Expected: ["0"] but got ["truefalseNULL"]
```


```sql
SELECT total(DISTINCT y) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT group_concat(DISTINCT y) FROM t1

alasql.fn.group_concat is not a function
```


```sql
SELECT avg(DISTINCT x) FROM t1

Expected: ["1.000"] but got ["1"]
```


```sql
SELECT group_concat(x) FROM t1 NOT INDEXED

alasql.fn.group_concat is not a function
```


```sql
SELECT group_concat(DISTINCT x) FROM t1 NOT INDEXED

alasql.fn.group_concat is not a function
```


```sql
SELECT group_concat(x,':') FROM t1 NOT INDEXED

alasql.fn.group_concat is not a function
```


```sql
SELECT group_concat(x) FROM t1 NOT INDEXED

alasql.fn.group_concat is not a function
```


```sql
SELECT group_concat(DISTINCT x) FROM t1 NOT INDEXED

alasql.fn.group_concat is not a function
```


```sql
SELECT total(x) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT total(DISTINCT x) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT sum(x) FROM t1 WHERE y='null'

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT sum(DISTINCT x) FROM t1 WHERE y='null'

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT total(x) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT total(DISTINCT x) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT sum(x) FROM t1

Expected: ["9.000"] but got ["9"]
```


```sql
SELECT sum(DISTINCT x) FROM t1

Expected: ["7.000"] but got ["7"]
```


```sql
SELECT total(x) FROM t1

alasql.fn.total is not a function
```


```sql
SELECT total(DISTINCT x) FROM t1

alasql.fn.total is not a function
```

#### ☓ Ran 80 tests as _sqlite_

* 37 failed
* 53% was OK


---- ---- ---- ---- ---- ---- ----
### 4/620 [`./test/evidence/slt_lang_createtrigger.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_createtrigger.test)

_Mimic sqlite_

```sql
DROP TRIGGER t1r1

Cannot read property 'beforeinsert' of undefined
```

_Fail found in statement setting up data so skipping rest of tests_

#### ☓ Ran 27 tests as _sqlite_

* 10 skipped
* 2 failed
* 55% was OK


---- ---- ---- ---- ---- ---- ----
### 5/620 [`./test/evidence/slt_lang_createview.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_createview.test)

_Mimic sqlite_
#### ☓ Ran 23 tests as _sqlite_

* 8 failed
* 65% was OK


---- ---- ---- ---- ---- ---- ----
### 6/620 [`./test/evidence/slt_lang_dropindex.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_dropindex.test)

_Mimic sqlite_
#### ☓ Ran 8 tests as _sqlite_

* 2 failed
* 75% was OK


---- ---- ---- ---- ---- ---- ----
### 7/620 [`./test/evidence/slt_lang_droptable.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_droptable.test)

_Mimic sqlite_
#### ☓ Ran 12 tests as _sqlite_

* 1 failed
* 91% was OK


---- ---- ---- ---- ---- ---- ----
### 8/620 [`./test/evidence/slt_lang_droptrigger.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_droptrigger.test)

_Mimic sqlite_
_Fail found in statement setting up data so skipping rest of tests_

#### ☓ Ran 13 tests as _sqlite_

* 6 skipped
* 1 failed
* 46% was OK


---- ---- ---- ---- ---- ---- ----
### 9/620 [`./test/evidence/slt_lang_dropview.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_dropview.test)

_Mimic sqlite_
#### ☓ Ran 13 tests as _sqlite_

* 1 failed
* 92% was OK


---- ---- ---- ---- ---- ---- ----
### 10/620 [`./test/evidence/slt_lang_reindex.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_reindex.test)

_Mimic sqlite_

#### ★ Assuming all 7 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 11/620 [`./test/evidence/slt_lang_replace.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_replace.test)

_Mimic sqlite_

#### ★ Assuming all 14 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 12/620 [`./test/evidence/slt_lang_update.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/evidence/slt_lang_update.test)

_Mimic sqlite_
#### ☓ Ran 27 tests as _sqlite_

* 2 failed
* 92% was OK


---- ---- ---- ---- ---- ---- ----
### 13/620 [`./test/index/between/1/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/1/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab0 WHERE col1 IN (SELECT col4 FROM tab0 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab0 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab0 WHERE col1 IN (SELECT col4 FROM tab0 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab1 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab1 WHERE col1 IN (SELECT col4 FROM tab1 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab1 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab1 WHERE col1 IN (SELECT col4 FROM tab1 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab2 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab2 WHERE col1 IN (SELECT col4 FROM tab2 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab2 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab2 WHERE col1 IN (SELECT col4 FROM tab2 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab3 WHERE col1 IN (SELECT col4 FROM tab3 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab3 WHERE col1 IN (SELECT col4 FROM tab3 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab4 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab4 WHERE col1 IN (SELECT col4 FROM tab4 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab4 WHERE (col0 IS NULL) AND ((col0 IN (SELECT col3 FROM tab4 WHERE col1 IN (SELECT col4 FROM tab4 WHERE col4 > 4.43) OR col3 = 7 AND ((col3 >= 2)) AND col4 IN (4.79,4.35,6.77,0.17,8.22) OR (col0 < 8) AND (col0 >= 6) AND col3 >= 8 AND col3 <= 7 AND col3 < 3 AND col3 IS NULL AND col3…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE col3 > 9 AND col3 IN (SELECT col0 FROM tab3 WHERE (col1 IN (SELECT col4 FROM tab3 WHERE ((col4 <= 6.41)) AND (((col0 >= 6 AND (((col4 > 4.0 OR (col3 BETWEEN 3 AND 0) OR col3 > 3 OR (col3 < 2)) AND col0 IN (SELECT col3 FROM tab3 WHERE col3 BETWEEN 5 AND 5 AND col3 <= 3) AND…

Cannot read property '1' of undefined
```


```sql
SELECT pk FROM tab3 WHERE col3 > 9 AND col3 IN (SELECT col0 FROM tab3 WHERE (col1 IN (SELECT col4 FROM tab3 WHERE ((col4 <= 6.41)) AND (((col0 >= 6 AND (((col4 > 4.0 OR ((col3 >= 3 AND col3 <= 0)) OR col3 > 3 OR (col3 < 2)) AND col0 IN (SELECT col3 FROM tab3 WHERE (col3 >= 5 AND col3 <= 5) AND col3…

Cannot read property '1' of undefined
```


```sql
SELECT pk FROM tab4 WHERE col3 > 9 AND col3 IN (SELECT col0 FROM tab4 WHERE (col1 IN (SELECT col4 FROM tab4 WHERE ((col4 <= 6.41)) AND (((col0 >= 6 AND (((col4 > 4.0 OR (col3 BETWEEN 3 AND 0) OR col3 > 3 OR (col3 < 2)) AND col0 IN (SELECT col3 FROM tab4 WHERE col3 BETWEEN 5 AND 5 AND col3 <= 3) AND…

Cannot read property '1' of undefined
```


```sql
SELECT pk FROM tab4 WHERE col3 > 9 AND col3 IN (SELECT col0 FROM tab4 WHERE (col1 IN (SELECT col4 FROM tab4 WHERE ((col4 <= 6.41)) AND (((col0 >= 6 AND (((col4 > 4.0 OR ((col3 >= 3 AND col3 <= 0)) OR col3 > 3 OR (col3 < 2)) AND col0 IN (SELECT col3 FROM tab4 WHERE (col3 >= 5 AND col3 <= 5) AND col3…

Cannot read property '1' of undefined
```


```sql
SELECT pk FROM tab0 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab0 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND col0 BETWEEN 4 AND 0 OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 > 3.49…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab0 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab0 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND (col0 >= 4 AND col0 <= 0) OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 >…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab1 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab1 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND col0 BETWEEN 4 AND 0 OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 > 3.49…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab1 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab1 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND (col0 >= 4 AND col0 <= 0) OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 >…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab2 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab2 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND col0 BETWEEN 4 AND 0 OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 > 3.49…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab2 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab2 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND (col0 >= 4 AND col0 <= 0) OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 >…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab3 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND col0 BETWEEN 4 AND 0 OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 > 3.49…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab3 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND (col0 >= 4 AND col0 <= 0) OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 >…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab4 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab4 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND col0 BETWEEN 4 AND 0 OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 > 3.49…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab4 WHERE ((col3 <= 4 AND ((((col3 IS NULL) OR (col3 < 9 AND col3 IN (SELECT col0 FROM tab4 WHERE col1 <= 8.23 AND col1 > 5.14 OR (col4 <= 8.72) AND col3 = 0 AND (col1 < 0.76) AND (col0 >= 4 AND col0 <= 0) OR col4 > 6.20 OR ((col1 IS NULL AND ((col4 >= 8.13) AND col0 < 5) AND col4 >…

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab1 WHERE ((col0 IN (SELECT col3 FROM tab1 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab1 WHERE col1 < 4.40) OR col3 BETWEEN 6 AND 3) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab1 WHERE ((col0 IN (SELECT col3 FROM tab1 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab1 WHERE col1 < 4.40) OR (col3 >= 6 AND col3 <= 3)) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab2 WHERE ((col0 IN (SELECT col3 FROM tab2 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab2 WHERE col1 < 4.40) OR col3 BETWEEN 6 AND 3) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab2 WHERE ((col0 IN (SELECT col3 FROM tab2 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab2 WHERE col1 < 4.40) OR (col3 >= 6 AND col3 <= 3)) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE ((col0 IN (SELECT col3 FROM tab3 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab3 WHERE col1 < 4.40) OR col3 BETWEEN 6 AND 3) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab3 WHERE ((col0 IN (SELECT col3 FROM tab3 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab3 WHERE col1 < 4.40) OR (col3 >= 6 AND col3 <= 3)) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab4 WHERE ((col0 IN (SELECT col3 FROM tab4 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab4 WHERE col1 < 4.40) OR col3 BETWEEN 6 AND 3) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```


```sql
SELECT pk FROM tab4 WHERE ((col0 IN (SELECT col3 FROM tab4 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab4 WHERE col1 < 4.40) OR (col3 >= 6 AND col3 <= 3)) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```

#### ☓ Ran 10,022 tests as _sqlite_

* 50 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 14/620 [`./test/index/between/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/10/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 15/620 [`./test/index/between/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/10/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,029 tests as _sqlite_

* 100 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 16/620 [`./test/index/between/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/10/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 80 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 17/620 [`./test/index/between/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/10/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 40 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 18/620 [`./test/index/between/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 50 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 19/620 [`./test/index/between/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,031 tests as _sqlite_

* 90 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 20/620 [`./test/index/between/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,123 tests as _sqlite_

* 70 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 21/620 [`./test/index/between/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/100/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,125 tests as _sqlite_

* 70 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 22/620 [`./test/index/between/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/100/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,121 tests as _sqlite_

* 80 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 23/620 [`./test/index/between/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,121 tests as _sqlite_

* 90 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 24/620 [`./test/index/between/100/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,125 tests as _sqlite_

* 90 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 25/620 [`./test/index/between/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/between/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 3,792 tests as _sqlite_

* 41 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 26/620 [`./test/index/commute/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,034 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 27/620 [`./test/index/commute/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,030 tests as _sqlite_

* 50 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 28/620 [`./test/index/commute/10/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 4,261 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 29/620 [`./test/index/commute/10/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 30/620 [`./test/index/commute/10/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10,031 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 31/620 [`./test/index/commute/10/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 40 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 32/620 [`./test/index/commute/10/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 50 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 33/620 [`./test/index/commute/10/slt_good_15.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10,030 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 34/620 [`./test/index/commute/10/slt_good_16.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_16.test)

_Mimic sqlite_

#### ★ Assuming all 10,032 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 35/620 [`./test/index/commute/10/slt_good_17.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_17.test)

_Mimic sqlite_

#### ★ Assuming all 10,031 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 36/620 [`./test/index/commute/10/slt_good_18.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_18.test)

_Mimic sqlite_
#### ☓ Ran 10,034 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 37/620 [`./test/index/commute/10/slt_good_19.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10,031 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 38/620 [`./test/index/commute/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,037 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 39/620 [`./test/index/commute/10/slt_good_20.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 40 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 40/620 [`./test/index/commute/10/slt_good_21.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10,030 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 41/620 [`./test/index/commute/10/slt_good_22.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_22.test)

_Mimic sqlite_

#### ★ Assuming all 10,033 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 42/620 [`./test/index/commute/10/slt_good_23.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_23.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 43/620 [`./test/index/commute/10/slt_good_24.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 44/620 [`./test/index/commute/10/slt_good_25.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_25.test)

_Mimic sqlite_
#### ☓ Ran 10,030 tests as _sqlite_

* 40 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 45/620 [`./test/index/commute/10/slt_good_26.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_26.test)

_Mimic sqlite_

#### ★ Assuming all 10,031 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 46/620 [`./test/index/commute/10/slt_good_27.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 47/620 [`./test/index/commute/10/slt_good_28.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 48/620 [`./test/index/commute/10/slt_good_29.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 49/620 [`./test/index/commute/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_3.test)

_Mimic sqlite_

#### ★ Assuming all 10,032 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 50/620 [`./test/index/commute/10/slt_good_30.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 51/620 [`./test/index/commute/10/slt_good_31.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_31.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 52/620 [`./test/index/commute/10/slt_good_32.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 53/620 [`./test/index/commute/10/slt_good_33.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_33.test)

_Mimic sqlite_
#### ☓ Ran 10,034 tests as _sqlite_

* 40 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 54/620 [`./test/index/commute/10/slt_good_34.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 50 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 55/620 [`./test/index/commute/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,030 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 56/620 [`./test/index/commute/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,032 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 57/620 [`./test/index/commute/10/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10,036 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 58/620 [`./test/index/commute/10/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10,034 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 59/620 [`./test/index/commute/10/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_8.test)

_Mimic sqlite_

#### ★ Assuming all 10,032 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 60/620 [`./test/index/commute/10/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/10/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10,034 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 61/620 [`./test/index/commute/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,122 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 62/620 [`./test/index/commute/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,120 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 63/620 [`./test/index/commute/100/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10,124 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 64/620 [`./test/index/commute/100/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,123 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 65/620 [`./test/index/commute/100/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10,123 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 66/620 [`./test/index/commute/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,123 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 67/620 [`./test/index/commute/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,121 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 68/620 [`./test/index/commute/100/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,124 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 69/620 [`./test/index/commute/100/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,121 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 70/620 [`./test/index/commute/100/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10,122 tests as _sqlite_

* 30 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 71/620 [`./test/index/commute/100/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10,123 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 72/620 [`./test/index/commute/100/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10,122 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 73/620 [`./test/index/commute/100/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/100/slt_good_9.test)

_Mimic sqlite_

#### ★ Assuming all 10,123 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 74/620 [`./test/index/commute/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/1000/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 4,741 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 75/620 [`./test/index/commute/1000/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/1000/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,583 tests as _sqlite_

* 20 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 76/620 [`./test/index/commute/1000/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/1000/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 11,021 tests as _sqlite_

* 40 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 77/620 [`./test/index/commute/1000/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/commute/1000/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 11,025 tests as _sqlite_

* 10 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 78/620 [`./test/index/delete/1/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/1/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 10,907 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 79/620 [`./test/index/delete/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 10,730 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 80/620 [`./test/index/delete/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 10,774 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 81/620 [`./test/index/delete/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 9,390 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 82/620 [`./test/index/delete/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10/slt_good_3.test)

_Mimic sqlite_

#### ★ Assuming all 10,065 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 83/620 [`./test/index/delete/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10/slt_good_4.test)

_Mimic sqlite_

#### ★ Assuming all 10,599 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 84/620 [`./test/index/delete/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10/slt_good_5.test)

_Mimic sqlite_

#### ★ Assuming all 10,353 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 85/620 [`./test/index/delete/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/100/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 11,145 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 86/620 [`./test/index/delete/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/100/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 10,895 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 87/620 [`./test/index/delete/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/100/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 11,033 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 88/620 [`./test/index/delete/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/100/slt_good_3.test)

_Mimic sqlite_

#### ★ Assuming all 10,942 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 89/620 [`./test/index/delete/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/1000/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 11,924 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 90/620 [`./test/index/delete/1000/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/1000/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 11,838 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 91/620 [`./test/index/delete/10000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/delete/10000/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 20,347 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 92/620 [`./test/index/in/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/10/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,035 tests as _sqlite_

* 45 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 93/620 [`./test/index/in/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/10/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,036 tests as _sqlite_

* 120 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 94/620 [`./test/index/in/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/10/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,035 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 95/620 [`./test/index/in/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/10/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,037 tests as _sqlite_

* 105 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 96/620 [`./test/index/in/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,038 tests as _sqlite_

* 75 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 97/620 [`./test/index/in/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,038 tests as _sqlite_

* 120 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 98/620 [`./test/index/in/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,128 tests as _sqlite_

* 90 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 99/620 [`./test/index/in/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/100/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,127 tests as _sqlite_

* 15 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 100/620 [`./test/index/in/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/100/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,128 tests as _sqlite_

* 90 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 101/620 [`./test/index/in/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,126 tests as _sqlite_

* 45 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 102/620 [`./test/index/in/100/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,127 tests as _sqlite_

* 120 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 103/620 [`./test/index/in/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 11,028 tests as _sqlite_

* 105 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 104/620 [`./test/index/in/1000/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/in/1000/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 11,024 tests as _sqlite_

* 45 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 105/620 [`./test/index/orderby/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 106/620 [`./test/index/orderby/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 10,054 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 107/620 [`./test/index/orderby/10/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_10.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 108/620 [`./test/index/orderby/10/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_11.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 109/620 [`./test/index/orderby/10/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_12.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 110/620 [`./test/index/orderby/10/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10,051 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 111/620 [`./test/index/orderby/10/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_14.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 112/620 [`./test/index/orderby/10/slt_good_15.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_15.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 113/620 [`./test/index/orderby/10/slt_good_16.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10,050 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 114/620 [`./test/index/orderby/10/slt_good_17.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_17.test)

_Mimic sqlite_

#### ★ Assuming all 10,054 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 115/620 [`./test/index/orderby/10/slt_good_18.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_18.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 116/620 [`./test/index/orderby/10/slt_good_19.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_19.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 117/620 [`./test/index/orderby/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 118/620 [`./test/index/orderby/10/slt_good_20.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10,052 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 119/620 [`./test/index/orderby/10/slt_good_21.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_21.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 120/620 [`./test/index/orderby/10/slt_good_22.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_22.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 121/620 [`./test/index/orderby/10/slt_good_23.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_23.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 122/620 [`./test/index/orderby/10/slt_good_24.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_24.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 123/620 [`./test/index/orderby/10/slt_good_25.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_25.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 124/620 [`./test/index/orderby/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_3.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 125/620 [`./test/index/orderby/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_4.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 126/620 [`./test/index/orderby/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_5.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 127/620 [`./test/index/orderby/10/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_6.test)

_Mimic sqlite_

#### ★ Assuming all 10,048 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 128/620 [`./test/index/orderby/10/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_7.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 129/620 [`./test/index/orderby/10/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_8.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 130/620 [`./test/index/orderby/10/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/10/slt_good_9.test)

_Mimic sqlite_

#### ★ Assuming all 10,050 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 131/620 [`./test/index/orderby/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/100/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 10,141 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 132/620 [`./test/index/orderby/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/100/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 10,140 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 133/620 [`./test/index/orderby/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/100/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 10,142 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 134/620 [`./test/index/orderby/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,140 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 135/620 [`./test/index/orderby/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 11,043 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 136/620 [`./test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 137/620 [`./test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 138/620 [`./test/index/orderby_nosort/10/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10,051 tests as _sqlite_

* 120 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 139/620 [`./test/index/orderby_nosort/10/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_11.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 140/620 [`./test/index/orderby_nosort/10/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_12.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 141/620 [`./test/index/orderby_nosort/10/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_13.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 142/620 [`./test/index/orderby_nosort/10/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_14.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 143/620 [`./test/index/orderby_nosort/10/slt_good_15.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_15.test)

_Mimic sqlite_

#### ★ Assuming all 10,054 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 144/620 [`./test/index/orderby_nosort/10/slt_good_16.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10,053 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 145/620 [`./test/index/orderby_nosort/10/slt_good_17.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_17.test)

_Mimic sqlite_

#### ★ Assuming all 10,050 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 146/620 [`./test/index/orderby_nosort/10/slt_good_18.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_18.test)

_Mimic sqlite_

#### ★ Assuming all 10,050 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 147/620 [`./test/index/orderby_nosort/10/slt_good_19.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10,053 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 148/620 [`./test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 149/620 [`./test/index/orderby_nosort/10/slt_good_20.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_20.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 150/620 [`./test/index/orderby_nosort/10/slt_good_21.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_21.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 151/620 [`./test/index/orderby_nosort/10/slt_good_22.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_22.test)

_Mimic sqlite_

#### ★ Assuming all 10,054 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 152/620 [`./test/index/orderby_nosort/10/slt_good_23.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_23.test)

_Mimic sqlite_

#### ★ Assuming all 10,051 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 153/620 [`./test/index/orderby_nosort/10/slt_good_24.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10,054 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 154/620 [`./test/index/orderby_nosort/10/slt_good_25.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_25.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 155/620 [`./test/index/orderby_nosort/10/slt_good_26.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_26.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 156/620 [`./test/index/orderby_nosort/10/slt_good_27.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10,051 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 157/620 [`./test/index/orderby_nosort/10/slt_good_28.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_28.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 158/620 [`./test/index/orderby_nosort/10/slt_good_29.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_29.test)

_Mimic sqlite_

#### ★ Assuming all 10,050 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 159/620 [`./test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,051 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 160/620 [`./test/index/orderby_nosort/10/slt_good_30.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10,052 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 161/620 [`./test/index/orderby_nosort/10/slt_good_31.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_31.test)

_Mimic sqlite_
#### ☓ Ran 10,052 tests as _sqlite_

* 120 failed
* 98% was OK


---- ---- ---- ---- ---- ---- ----
### 162/620 [`./test/index/orderby_nosort/10/slt_good_32.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_32.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 163/620 [`./test/index/orderby_nosort/10/slt_good_33.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_33.test)

_Mimic sqlite_

#### ★ Assuming all 10,050 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 164/620 [`./test/index/orderby_nosort/10/slt_good_34.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_34.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 165/620 [`./test/index/orderby_nosort/10/slt_good_35.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_35.test)

_Mimic sqlite_

#### ★ Assuming all 10,049 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 166/620 [`./test/index/orderby_nosort/10/slt_good_36.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_36.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 167/620 [`./test/index/orderby_nosort/10/slt_good_37.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_37.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 168/620 [`./test/index/orderby_nosort/10/slt_good_38.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_38.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 169/620 [`./test/index/orderby_nosort/10/slt_good_39.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_39.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 170/620 [`./test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_4.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 171/620 [`./test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_5.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 172/620 [`./test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_6.test)

_Mimic sqlite_

#### ★ Assuming all 10,053 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 173/620 [`./test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_7.test)

_Mimic sqlite_

#### ★ Assuming all 10,052 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 174/620 [`./test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10,054 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 175/620 [`./test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/10/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10,055 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 176/620 [`./test/index/orderby_nosort/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,149 tests as _sqlite_

* 60 failed
* 99% was OK


---- ---- ---- ---- ---- ---- ----
### 177/620 [`./test/index/orderby_nosort/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 10,141 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 178/620 [`./test/index/orderby_nosort/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 10,142 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 179/620 [`./test/index/orderby_nosort/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_3.test)

_Mimic sqlite_

#### ★ Assuming all 10,143 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 180/620 [`./test/index/orderby_nosort/100/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_4.test)

_Mimic sqlite_

#### ★ Assuming all 10,141 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 181/620 [`./test/index/orderby_nosort/100/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_5.test)

_Mimic sqlite_

#### ★ Assuming all 10,142 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 182/620 [`./test/index/orderby_nosort/100/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/100/slt_good_6.test)

_Mimic sqlite_

#### ★ Assuming all 10,144 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 183/620 [`./test/index/orderby_nosort/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/1000/slt_good_0.test)

_Mimic sqlite_

#### ★ Assuming all 11,040 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 184/620 [`./test/index/orderby_nosort/1000/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/orderby_nosort/1000/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 11,043 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 185/620 [`./test/index/random/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT + col2 FROM tab0 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col2 FROM tab1 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col2 FROM tab2 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col2 FROM tab3 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col2 FROM tab4 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + + + ( 2 ) AS col3 FROM tab0 AS cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + + + ( 2 ) AS col3 FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + + + ( 2 ) AS col3 FROM tab2 AS cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab0 WHERE + col0 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab1 WHERE + col0 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab2 WHERE + col0 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab3 WHERE + col0 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab4 WHERE + col0 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab0 WHERE - 78 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col2 FROM tab1 WHERE - 78 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 FROM tab0 cor0 WHERE NOT + ( - + 23 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 FROM tab1 cor0 WHERE NOT + ( - + 23 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 FROM tab2 cor0 WHERE NOT + ( - + 23 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 FROM tab3 cor0 WHERE NOT + ( - + 23 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 FROM tab4 cor0 WHERE NOT + ( - + 23 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - col3 / col0 AS col0 FROM tab2 AS cor0 WHERE NOT 53 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - col3 / col0 AS col0 FROM tab3 AS cor0 WHERE NOT 53 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT 62 - - + CAST ( COUNT ( ALL col1 ) AS INTEGER ) FROM tab0 cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT DISTINCT 62 - - + CAST ( COUNT ( ALL col1 ) AS INTEGER ) FROM tab1 cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT DISTINCT 62 - - + CAST ( COUNT ( ALL col1 ) AS INTEGER ) FROM tab2 cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT DISTINCT 62 - - + CAST ( COUNT ( ALL col1 ) AS INTEGER ) FROM tab3 cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT DISTINCT 62 - - + CAST ( COUNT ( ALL col1 ) AS INTEGER ) FROM tab4 cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT col2 AS col4 FROM tab0 WHERE - col1 > - 75

Expected: ["0"] but got ["ijika"]
```


```sql
SELECT col2 AS col4 FROM tab1 WHERE - col1 > - 75

Expected: ["0"] but got ["ijika"]
```


```sql
SELECT col2 AS col4 FROM tab2 WHERE - col1 > - 75

Expected: ["0"] but got ["ijika"]
```


```sql
SELECT col2 AS col4 FROM tab3 WHERE - col1 > - 75

Expected: ["0"] but got ["ijika"]
```


```sql
SELECT col2 AS col4 FROM tab4 WHERE - col1 > - 75

Expected: ["0"] but got ["ijika"]
```


```sql
SELECT ALL col5 AS col2 FROM tab0 cor0 WHERE ( + - col1 ) IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col5 AS col2 FROM tab2 cor0 WHERE ( + - col1 ) IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col5 FROM tab0 cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col5 FROM tab1 cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col5 FROM tab2 cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col5 FROM tab3 cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 AS col0 FROM tab1 WHERE NOT col4 + + col0 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 AS col0 FROM tab3 WHERE NOT col4 + + col0 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - 8 AS col5, + 0 * - col0 * 57 - + col3 AS col5 FROM tab4 AS cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab1 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab2 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab3 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab4 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + + col2 AS col0 FROM tab1 WHERE NOT col0 * col0 IS NULL

Correct amount of values returned but hash was different than expected.
```

#### ☓ Ran 10,032 tests as _sqlite_

* 570 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 186/620 [`./test/index/random/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL + col2 FROM tab0 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```


```sql
SELECT ALL + col2 FROM tab1 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```


```sql
SELECT ALL + col2 FROM tab2 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```


```sql
SELECT ALL + col2 FROM tab3 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```


```sql
SELECT ALL + col2 FROM tab4 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 625 failed
* 93% was OK


---- ---- ---- ---- ---- ---- ----
### 187/620 [`./test/index/random/10/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT ALL + col2 AS col2 FROM tab0 WHERE NOT ( + + col0 - + + col1 ) >= ( col1 )

Expected: ["0","0","0","0","0","0"] but got ["gaven","qlgja","qnpgu","xobsl","youok","yqgcu"]
```


```sql
SELECT ALL + col2 AS col2 FROM tab1 WHERE NOT ( + + col0 - + + col1 ) >= ( col1 )

Expected: ["0","0","0","0","0","0"] but got ["gaven","qlgja","qnpgu","xobsl","youok","yqgcu"]
```


```sql
SELECT ALL + col2 AS col2 FROM tab2 WHERE NOT ( + + col0 - + + col1 ) >= ( col1 )

Expected: ["0","0","0","0","0","0"] but got ["gaven","qlgja","qnpgu","xobsl","youok","yqgcu"]
```


```sql
SELECT ALL + col2 AS col2 FROM tab3 WHERE NOT ( + + col0 - + + col1 ) >= ( col1 )

Expected: ["0","0","0","0","0","0"] but got ["gaven","qlgja","qnpgu","xobsl","youok","yqgcu"]
```


```sql
SELECT ALL + col2 AS col2 FROM tab4 WHERE NOT ( + + col0 - + + col1 ) >= ( col1 )

Expected: ["0","0","0","0","0","0"] but got ["gaven","qlgja","qnpgu","xobsl","youok","yqgcu"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 630 failed
* 93% was OK


---- ---- ---- ---- ---- ---- ----
### 188/620 [`./test/index/random/10/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,031 tests as _sqlite_

* 605 failed
* 93% was OK


---- ---- ---- ---- ---- ---- ----
### 189/620 [`./test/index/random/10/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT col1 * CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT col3 < + 71

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0","0","0"]
```


```sql
SELECT col1 * CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 WHERE NOT col3 < + 71

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0","0","0"]
```


```sql
SELECT col1 * CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 WHERE NOT col3 < + 71

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0","0","0"]
```


```sql
SELECT col1 * CAST ( NULL AS INTEGER ) FROM tab3 AS cor0 WHERE NOT col3 < + 71

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0","0","0"]
```


```sql
SELECT col1 * CAST ( NULL AS INTEGER ) FROM tab4 AS cor0 WHERE NOT col3 < + 71

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0","0","0"]
```

#### ☓ Ran 10,033 tests as _sqlite_

* 630 failed
* 93% was OK


---- ---- ---- ---- ---- ---- ----
### 190/620 [`./test/index/random/10/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT + col5 col3 FROM tab0 WHERE + col1 NOT BETWEEN - 96 AND col0

Expected: ["0","0","0","0","0","0"] but got ["hbwys","kxrzu","qbdwp","vruch","xarlb","ybarm"]
```


```sql
SELECT + col5 col3 FROM tab1 WHERE + col1 NOT BETWEEN - 96 AND col0

Expected: ["0","0","0","0","0","0"] but got ["hbwys","kxrzu","qbdwp","vruch","xarlb","ybarm"]
```


```sql
SELECT + col5 col3 FROM tab2 WHERE + col1 NOT BETWEEN - 96 AND col0

Expected: ["0","0","0","0","0","0"] but got ["hbwys","kxrzu","qbdwp","vruch","xarlb","ybarm"]
```


```sql
SELECT + col5 col3 FROM tab3 WHERE + col1 NOT BETWEEN - 96 AND col0

Expected: ["0","0","0","0","0","0"] but got ["hbwys","kxrzu","qbdwp","vruch","xarlb","ybarm"]
```


```sql
SELECT + col5 col3 FROM tab4 WHERE + col1 NOT BETWEEN - 96 AND col0

Expected: ["0","0","0","0","0","0"] but got ["hbwys","kxrzu","qbdwp","vruch","xarlb","ybarm"]
```


```sql
SELECT col5 AS col3 FROM tab0 WHERE NOT ( ( + 45 ) BETWEEN NULL AND col1 )

Expected: ["0"] but got ["hbwys","kxrzu","lkyfk","pavon","pfxqp","qbdwp","vruch","xarlb","ybarm","ziuqv"]
```


```sql
SELECT col5 AS col3 FROM tab1 WHERE NOT ( ( + 45 ) BETWEEN NULL AND col1 )

Expected: ["0"] but got ["hbwys","kxrzu","lkyfk","pavon","pfxqp","qbdwp","vruch","xarlb","ybarm","ziuqv"]
```


```sql
SELECT col5 AS col3 FROM tab2 WHERE NOT ( ( + 45 ) BETWEEN NULL AND col1 )

Expected: ["0"] but got ["hbwys","kxrzu","lkyfk","pavon","pfxqp","qbdwp","vruch","xarlb","ybarm","ziuqv"]
```


```sql
SELECT col5 AS col3 FROM tab3 WHERE NOT ( ( + 45 ) BETWEEN NULL AND col1 )

Expected: ["0"] but got ["hbwys","kxrzu","lkyfk","pavon","pfxqp","qbdwp","vruch","xarlb","ybarm","ziuqv"]
```


```sql
SELECT col5 AS col3 FROM tab4 WHERE NOT ( ( + 45 ) BETWEEN NULL AND col1 )

Expected: ["0"] but got ["hbwys","kxrzu","lkyfk","pavon","pfxqp","qbdwp","vruch","xarlb","ybarm","ziuqv"]
```


```sql
SELECT DISTINCT - ( - ( - + CAST ( NULL AS INTEGER ) ) ), CAST ( NULL AS INTEGER ) + + 80 AS col1 FROM tab0 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","80"]
```


```sql
SELECT DISTINCT - ( - ( - + CAST ( NULL AS INTEGER ) ) ), CAST ( NULL AS INTEGER ) + + 80 AS col1 FROM tab1 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","80"]
```


```sql
SELECT DISTINCT - ( - ( - + CAST ( NULL AS INTEGER ) ) ), CAST ( NULL AS INTEGER ) + + 80 AS col1 FROM tab2 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","80"]
```


```sql
SELECT DISTINCT - ( - ( - + CAST ( NULL AS INTEGER ) ) ), CAST ( NULL AS INTEGER ) + + 80 AS col1 FROM tab3 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","80"]
```


```sql
SELECT DISTINCT - ( - ( - + CAST ( NULL AS INTEGER ) ) ), CAST ( NULL AS INTEGER ) + + 80 AS col1 FROM tab4 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","80"]
```

#### ☓ Ran 10,032 tests as _sqlite_

* 700 failed
* 93% was OK


---- ---- ---- ---- ---- ---- ----
### 191/620 [`./test/index/random/10/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_14.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + col3 AS col5, 78 AS col5 FROM tab0 cor0 WHERE 35 + col0 IS NOT NULL

2 results returned but expected 20
```


```sql
SELECT DISTINCT - + col3 AS col5, 78 AS col5 FROM tab1 cor0 WHERE 35 + col0 IS NOT NULL

2 results returned but expected 20
```


```sql
SELECT DISTINCT - + col3 AS col5, 78 AS col5 FROM tab2 cor0 WHERE 35 + col0 IS NOT NULL

2 results returned but expected 20
```


```sql
SELECT DISTINCT - + col3 AS col5, 78 AS col5 FROM tab3 cor0 WHERE 35 + col0 IS NOT NULL

2 results returned but expected 20
```


```sql
SELECT DISTINCT - + col3 AS col5, 78 AS col5 FROM tab4 cor0 WHERE 35 + col0 IS NOT NULL

2 results returned but expected 20
```


```sql
SELECT + ( - - MAX ( DISTINCT - col0 ) ) - - 76 AS col4, 30 FROM tab0 AS cor0 WHERE ( NULL ) IN ( col3 )

Expected: ["NULL","30"] but got ["30","NULL"]
```


```sql
SELECT + ( - - MAX ( DISTINCT - col0 ) ) - - 76 AS col4, 30 FROM tab1 AS cor0 WHERE ( NULL ) IN ( col3 )

Expected: ["NULL","30"] but got ["30","NULL"]
```


```sql
SELECT + ( - - MAX ( DISTINCT - col0 ) ) - - 76 AS col4, 30 FROM tab2 AS cor0 WHERE ( NULL ) IN ( col3 )

Expected: ["NULL","30"] but got ["30","NULL"]
```


```sql
SELECT + ( - - MAX ( DISTINCT - col0 ) ) - - 76 AS col4, 30 FROM tab3 AS cor0 WHERE ( NULL ) IN ( col3 )

Expected: ["NULL","30"] but got ["30","NULL"]
```


```sql
SELECT + ( - - MAX ( DISTINCT - col0 ) ) - - 76 AS col4, 30 FROM tab4 AS cor0 WHERE ( NULL ) IN ( col3 )

Expected: ["NULL","30"] but got ["30","NULL"]
```

#### ☓ Ran 10,031 tests as _sqlite_

* 660 failed
* 93% was OK


---- ---- ---- ---- ---- ---- ----
### 192/620 [`./test/index/random/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT col5 FROM tab0 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT col5 FROM tab1 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT col5 FROM tab2 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT col5 FROM tab3 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT col5 FROM tab4 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab3 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab4 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 760 failed
* 92% was OK


---- ---- ---- ---- ---- ---- ----
### 193/620 [`./test/index/random/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT + col2 AS col1 FROM tab0 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT + col2 AS col1 FROM tab1 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT + col2 AS col1 FROM tab2 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT + col2 AS col1 FROM tab3 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT + col2 AS col1 FROM tab4 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT col5 col1 FROM tab0 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```


```sql
SELECT col5 col1 FROM tab1 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```


```sql
SELECT col5 col1 FROM tab2 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```


```sql
SELECT col5 col1 FROM tab3 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```


```sql
SELECT col5 col1 FROM tab4 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 535 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 194/620 [`./test/index/random/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,033 tests as _sqlite_

* 520 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 195/620 [`./test/index/random/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT + col2 col5 FROM tab0 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```


```sql
SELECT + col2 col5 FROM tab1 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```


```sql
SELECT + col2 col5 FROM tab2 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```


```sql
SELECT + col2 col5 FROM tab3 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```


```sql
SELECT + col2 col5 FROM tab4 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 570 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 196/620 [`./test/index/random/10/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT + col2 FROM tab0 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT + col2 FROM tab1 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT + col2 FROM tab2 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT + col2 FROM tab3 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT + col2 FROM tab4 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT col2 FROM tab0 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```


```sql
SELECT col2 FROM tab1 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```


```sql
SELECT col2 FROM tab2 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```


```sql
SELECT col2 FROM tab3 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```


```sql
SELECT col2 FROM tab4 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 600 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 197/620 [`./test/index/random/10/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL col2 AS col5 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```


```sql
SELECT ALL col2 AS col5 FROM tab1 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```


```sql
SELECT ALL col2 AS col5 FROM tab2 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```


```sql
SELECT ALL col2 AS col5 FROM tab3 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```


```sql
SELECT ALL col2 AS col5 FROM tab4 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```

#### ☓ Ran 10,031 tests as _sqlite_

* 520 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 198/620 [`./test/index/random/10/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```


```sql
SELECT col5 AS col1 FROM tab1 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```


```sql
SELECT col5 AS col1 FROM tab2 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```


```sql
SELECT col5 AS col1 FROM tab3 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```


```sql
SELECT col5 AS col1 FROM tab4 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```

#### ☓ Ran 10,032 tests as _sqlite_

* 600 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 199/620 [`./test/index/random/10/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```


```sql
SELECT col5 AS col1 FROM tab1 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```


```sql
SELECT col5 AS col1 FROM tab2 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```


```sql
SELECT col5 AS col1 FROM tab3 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```


```sql
SELECT col5 AS col1 FROM tab4 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```

#### ☓ Ran 10,031 tests as _sqlite_

* 590 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 200/620 [`./test/index/random/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/100/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT col2 AS col0 FROM tab0 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```


```sql
SELECT col2 AS col0 FROM tab1 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```


```sql
SELECT col2 AS col0 FROM tab2 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```


```sql
SELECT col2 AS col0 FROM tab3 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```


```sql
SELECT col2 AS col0 FROM tab4 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```

#### ☓ Ran 10,123 tests as _sqlite_

* 570 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 201/620 [`./test/index/random/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT col5 col5 FROM tab0 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```


```sql
SELECT col5 col5 FROM tab1 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```


```sql
SELECT col5 col5 FROM tab2 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```


```sql
SELECT col5 col5 FROM tab3 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```


```sql
SELECT col5 col5 FROM tab4 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```

#### ☓ Ran 10,123 tests as _sqlite_

* 470 failed
* 95% was OK


---- ---- ---- ---- ---- ---- ----
### 202/620 [`./test/index/random/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 2,067 tests as _sqlite_

* 60 failed
* 97% was OK


---- ---- ---- ---- ---- ---- ----
### 203/620 [`./test/index/random/1000/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_1.test)

_Mimic sqlite_

#### ★ Assuming all 1,056 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 204/620 [`./test/index/random/1000/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_2.test)

_Mimic sqlite_

#### ★ Assuming all 1,027 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 205/620 [`./test/index/random/1000/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_3.test)

_Mimic sqlite_

#### ★ Assuming all 1,033 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 206/620 [`./test/index/random/1000/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_4.test)

_Mimic sqlite_

#### ★ Assuming all 1,032 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 207/620 [`./test/index/random/1000/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 4,333 tests as _sqlite_

* 205 failed
* 95% was OK


---- ---- ---- ---- ---- ---- ----
### 208/620 [`./test/index/random/1000/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```


```sql
SELECT ALL * FROM tab1 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```


```sql
SELECT ALL * FROM tab3 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```


```sql
SELECT ALL * FROM tab4 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```

#### ☓ Ran 11,021 tests as _sqlite_

* 545 failed
* 95% was OK


---- ---- ---- ---- ---- ---- ----
### 209/620 [`./test/index/random/1000/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL col2 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```


```sql
SELECT ALL col2 FROM tab1 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```


```sql
SELECT ALL col2 FROM tab2 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```


```sql
SELECT ALL col2 FROM tab3 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```


```sql
SELECT ALL col2 FROM tab4 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```

#### ☓ Ran 11,022 tests as _sqlite_

* 560 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 210/620 [`./test/index/random/1000/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/random/1000/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 4,841 tests as _sqlite_

* 240 failed
* 95% was OK


---- ---- ---- ---- ---- ---- ----
### 211/620 [`./test/index/view/10/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_0.test)

_Mimic sqlite_

---- ---- ---- ---- ---- ---- ----
### 212/620 [`./test/index/view/10/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT * FROM view_3_tab0_154

Expected: ["1","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_154

Expected: ["1","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_154

Expected: ["1","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_154

Expected: ["1","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_154

Expected: ["1","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_155

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_155

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_155

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_155

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_155

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_156

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_156

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_156

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_156

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_156

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_160

Expected: ["1","95","4","84","7","65","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_160

Expected: ["1","4","7","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_160

Expected: ["1","95","4","84","7","65","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_160

Expected: ["1","4","7","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_160

Expected: ["1","95","4","84","7","65","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_160

Expected: ["1","4","7","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_160

Expected: ["1","95","4","84","7","65","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_160

Expected: ["1","4","7","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_160

Expected: ["1","95","4","84","7","65","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_160

Expected: ["1","4","7","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_162

Expected: ["5","58","6","0"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_162

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_162

Expected: ["5","58","6","0"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_162

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_162

Expected: ["5","58","6","0"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_162

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_162

Expected: ["5","58","6","0"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_162

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_162

Expected: ["5","58","6","0"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_162

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_163

Expected: ["0","2","3","4","5"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_163

Expected: ["0","2","3","4","5"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_163

Expected: ["0","2","3","4","5"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_163

Expected: ["0","2","3","4","5"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_163

Expected: ["0","2","3","4","5"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_165

Expected: ["6","0","7","65","8","47","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_165

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_165

Expected: ["6","0","7","65","8","47","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_165

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_165

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_165

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_165

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_169

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_169

Expected: ["0","2","3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_169

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_169

Expected: ["0","2","3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_169

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_169

Expected: ["0","2","3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_169

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_169

Expected: ["0","2","3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_169

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_169

Expected: ["0","2","3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_170

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_172

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_172

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_172

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_172

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_172

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_175

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_175

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_175

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_175

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_175

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_176

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_176

Expected: ["1","95"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_179

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_179

Expected: ["1","4","9"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_179

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_179

Expected: ["1","4","9"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_179

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_179

Expected: ["1","4","9"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_179

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_179

Expected: ["1","4","9"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_179

Expected: ["1","95","4","84","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_179

Expected: ["1","4","9"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_181

Expected: ["1","2","3","4","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_181

Expected: ["1","2","3","4","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_183

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_183

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_184

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_184

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_184

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_184

Expected: ["8","47"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_185

Expected: ["0","2","3","5","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_185

Expected: ["0","2","3","5","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_185

Expected: ["0","2","3","5","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_185

Expected: ["0","2","3","5","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_185

Expected: ["0","2","3","5","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_186

Expected: ["5","58","6","0","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_186

Expected: ["0","1","2","3","4","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_186

Expected: ["5","58","6","0","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_186

Expected: ["0","1","2","3","4","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_186

Expected: ["5","58","6","0","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_186

Expected: ["0","1","2","3","4","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_186

Expected: ["5","58","6","0","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_186

Expected: ["0","1","2","3","4","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_186

Expected: ["5","58","6","0","9","88"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_186

Expected: ["0","1","2","3","4","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_191

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_191

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_191

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_191

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_191

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_191

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_191

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_191

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_191

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_191

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_193

Expected: ["2","22","8","47"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_193

Expected: ["2","22","8","47"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_193

Expected: ["2","22","8","47"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_196

Expected: ["0","30","2","22","6","0"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_196

Expected: ["1","3","4","5","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_196

Expected: ["0","30","2","22","6","0"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_196

Expected: ["1","3","4","5","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_196

Expected: ["0","30","2","22","6","0"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_196

Expected: ["1","3","4","5","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_196

Expected: ["0","30","2","22","6","0"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_196

Expected: ["1","3","4","5","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_196

Expected: ["1","3","4","5","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_203

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_203

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_203

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_203

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_203

Expected: ["1","95","9","88"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_203

Expected: ["0","2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_206

Expected: ["0","1","2","3","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_206

Expected: ["0","1","2","3","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_209

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_209

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_209

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_209

Expected: ["0","1","2","3","4","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_209

Expected: ["5","58","6","0"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_213

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_218

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_218

Expected: ["0","1","2","3","5","6","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_218

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_218

Expected: ["0","1","2","3","5","6","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_218

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_218

Expected: ["0","1","2","3","5","6","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_218

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_218

Expected: ["0","1","2","3","5","6","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_218

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_218

Expected: ["0","1","2","3","5","6","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_221

Expected: ["0","2","3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_222

Expected: ["2","22","3","45","4","84","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_222

Expected: ["2","22","3","45","4","84","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_222

Expected: ["2","22","3","45","4","84","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_222

Expected: ["2","22","3","45","4","84","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_222

Expected: ["2","22","3","45","4","84","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_223

Expected: ["4","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_223

Expected: ["4","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_223

Expected: ["4","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_223

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_223

Expected: ["4","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_223

Expected: ["4","84","7","65","8","47"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_223

Expected: ["4","7","8"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 7,135 tests as _sqlite_

* 1,620 failed
* 77% was OK


---- ---- ---- ---- ---- ---- ----
### 213/620 [`./test/index/view/10/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_2_tab0_302

Expected: ["4","11","7","70"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_302

Expected: ["0","1","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_302

Expected: ["4","11","7","70"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_302

Expected: ["0","1","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_302

Expected: ["4","11","7","70"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_302

Expected: ["0","1","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_302

Expected: ["4","11","7","70"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_302

Expected: ["0","1","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_302

Expected: ["4","11","7","70"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_302

Expected: ["0","1","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_304

Expected: ["4","11","8","75"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_304

Expected: ["0","1","2","3","5","6","7","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_304

Expected: ["4","11","8","75"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_304

Expected: ["0","1","2","3","5","6","7","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_304

Expected: ["4","11","8","75"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_304

Expected: ["0","1","2","3","5","6","7","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_304

Expected: ["4","11","8","75"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_304

Expected: ["0","1","2","3","5","6","7","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_304

Expected: ["4","11","8","75"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_304

Expected: ["0","1","2","3","5","6","7","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_305

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_305

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_305

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_305

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_305

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_305

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_305

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_305

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_305

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_305

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_306

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_306

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_306

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_306

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_306

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_307

Expected: ["0","8","1","6","2","3"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_307

Expected: ["3","4","5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_307

Expected: ["0","8","1","6","2","3"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_307

Expected: ["3","4","5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_307

Expected: ["0","8","1","6","2","3"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_307

Expected: ["3","4","5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_307

Expected: ["0","8","1","6","2","3"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_307

Expected: ["3","4","5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_307

Expected: ["0","8","1","6","2","3"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_307

Expected: ["3","4","5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_308

Expected: ["2","3","5","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_308

Expected: ["2","3","5","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_308

Expected: ["2","3","5","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_308

Expected: ["2","3","5","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_308

Expected: ["2","3","5","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_312

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_312

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_313

Expected: ["5","47","6","56"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_313

Expected: ["5","6"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_313

Expected: ["5","47","6","56"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_313

Expected: ["5","6"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_313

Expected: ["5","47","6","56"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_313

Expected: ["5","6"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_313

Expected: ["5","47","6","56"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_313

Expected: ["5","6"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_313

Expected: ["5","47","6","56"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_313

Expected: ["5","6"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_316

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_316

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_316

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_316

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_316

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_321

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_321

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_321

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_321

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_321

Expected: ["0","8"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_322

Expected: ["6","56"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_324

Expected: ["3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_324

Expected: ["3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_324

Expected: ["3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_324

Expected: ["3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_324

Expected: ["3","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_328

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_328

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_331

Expected: ["1","6","5","47","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_331

Expected: ["1","5","6","7"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_331

Expected: ["1","6","5","47","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_331

Expected: ["1","5","6","7"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_331

Expected: ["1","6","5","47","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_331

Expected: ["1","5","6","7"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_331

Expected: ["1","6","5","47","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_331

Expected: ["1","5","6","7"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_331

Expected: ["1","6","5","47","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_331

Expected: ["1","5","6","7"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_333

Expected: ["3","53","6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_333

Expected: ["3","53","6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_333

Expected: ["3","53","6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_333

Expected: ["3","53","6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_333

Expected: ["3","53","6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_334

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_334

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_334

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_335

Expected: ["1","6","4","11","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_335

Expected: ["1","6","4","11","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_335

Expected: ["1","6","4","11","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_335

Expected: ["1","6","4","11","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_335

Expected: ["1","6","4","11","6","56","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_337

Expected: ["5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_338

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_338

Expected: ["1","4","7"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_338

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_338

Expected: ["1","4","7"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_338

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_338

Expected: ["1","4","7"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_338

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_338

Expected: ["1","4","7"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab4_338

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_338

Expected: ["1","4","7"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_341

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_341

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_341

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_341

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_341

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_341

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_341

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_342

Expected: ["2","3"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_342

Expected: ["2","3"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_343

Expected: ["0","1","2","4","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab4_348

Expected: ["1","6","2","3"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_351

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_351

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_351

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_351

Expected: ["6","7","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_354

Expected: ["1","4","6","7"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_357

Expected: ["1","6","2","3"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_357

Expected: ["1","6","2","3"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab1_358

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab1_358

Expected: ["0","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab2_358

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab2_358

Expected: ["0","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab3_358

Expected: ["1","6","4","11","7","70"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab3_358

Expected: ["0","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab4_358

Expected: ["0","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_359

Expected: ["3","53"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_371

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab1_371

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab2_371

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_371

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab3_374

Expected: ["1","6","6","56"] but got ["NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 7,333 tests as _sqlite_

* 1,595 failed
* 78% was OK


---- ---- ---- ---- ---- ---- ----
### 214/620 [`./test/index/view/10/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 6,734 tests as _sqlite_

* 1,555 failed
* 76% was OK


---- ---- ---- ---- ---- ---- ----
### 215/620 [`./test/index/view/10/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 7,536 tests as _sqlite_

* 1,580 failed
* 79% was OK


---- ---- ---- ---- ---- ---- ----
### 216/620 [`./test/index/view/10/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 7,237 tests as _sqlite_

* 1,565 failed
* 78% was OK


---- ---- ---- ---- ---- ---- ----
### 217/620 [`./test/index/view/10/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 6,135 tests as _sqlite_

* 1,415 failed
* 76% was OK


---- ---- ---- ---- ---- ---- ----
### 218/620 [`./test/index/view/10/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 6,936 tests as _sqlite_

* 1,570 failed
* 77% was OK


---- ---- ---- ---- ---- ---- ----
### 219/620 [`./test/index/view/100/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 7,726 tests as _sqlite_

* 3,141 failed
* 59% was OK


---- ---- ---- ---- ---- ---- ----
### 220/620 [`./test/index/view/100/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/100/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 7,122 tests as _sqlite_

* 2,876 failed
* 59% was OK


---- ---- ---- ---- ---- ---- ----
### 221/620 [`./test/index/view/100/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/100/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 7,323 tests as _sqlite_

* 2,891 failed
* 60% was OK


---- ---- ---- ---- ---- ---- ----
### 222/620 [`./test/index/view/100/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 6,322 tests as _sqlite_

* 2,506 failed
* 60% was OK


---- ---- ---- ---- ---- ---- ----
### 223/620 [`./test/index/view/100/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 6,923 tests as _sqlite_

* 2,761 failed
* 60% was OK


---- ---- ---- ---- ---- ---- ----
### 224/620 [`./test/index/view/100/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/100/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 7,322 tests as _sqlite_

* 2,946 failed
* 59% was OK


---- ---- ---- ---- ---- ---- ----
### 225/620 [`./test/index/view/1000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 6,823 tests as _sqlite_

* 2,431 failed
* 64% was OK


---- ---- ---- ---- ---- ---- ----
### 227/620 [`./test/random/aggregates/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL + col0 AS col1, + CAST ( NULL AS INTEGER ) + + col2 FROM tab0 AS cor0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["15","47","87","10","97","99"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * - - 78 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) * col2 + + - col0 + + col1 + col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["1","21","81"]
```


```sql
SELECT + 86 - CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["86","86","86"]
```


```sql
SELECT - - CAST ( NULL AS INTEGER ) * + 59 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL col2 * + col2 * - CAST ( NULL AS INTEGER ) * - 67 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) AS col1 FROM tab0 WHERE + col2 / + + 60 - + col2 + + col2 + - 84 + col1 * - col2 IS NOT NULL

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) + col1 AS col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["14","47","5"]
```


```sql
SELECT ALL - 84 * - + CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) - - 44 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["44","44","44"]
```


```sql
SELECT ALL + col0 + + CAST ( NULL AS INTEGER ) / + CAST ( - CAST ( + 65 AS INTEGER ) AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["51","85","91"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * + 15 col1 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT col0 * + - col1 - - col1 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["-420","-4230","-700"]
```


```sql
SELECT - - col1 + + - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["1","21","81"]
```


```sql
SELECT + col0 + + ( CAST ( NULL AS INTEGER ) ) / - col1 * col1 + + + col2 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["144","147","159"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - + 19 * - + col0 - + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + - 18 * + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + 5 * + - CAST ( NULL AS INTEGER ) / + col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT col2 * col1 col1, 75 * - + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["1173","NULL","3080","NULL","3886","NULL"] but got ["1173","0","3080","0","3886","0"]
```


```sql
SELECT + 65 + CAST ( NULL AS INTEGER ) + + 56 FROM tab1 AS cor0 WHERE NOT ( - col1 * + col1 * + - ( - 5 ) IS NULL )

Expected: ["NULL","NULL","NULL"] but got ["121","121","121"]
```


```sql
SELECT + col2 * - 98 + + + col1 * + - CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["-2254","-3920","-5684"]
```


```sql
SELECT ( - CAST ( NULL AS INTEGER ) ) * + + 70 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * 72 AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL - col1 * - + col2, + CAST ( NULL AS INTEGER ) AS col0 FROM tab2 AS cor0

Expected: ["1173","NULL","3080","NULL","3886","NULL"] but got ["1173","0","3080","0","3886","0"]
```


```sql
SELECT ALL + col1 / - + col1 + + CAST ( NULL AS INTEGER ) + - 90 + col2 / + col2 AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-90","-90","-90"]
```


```sql
SELECT ALL 45 * - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL col1 * col0 * - + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...+ ( 90 ) IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'EXCEP…
```


```sql
SELECT - + 12 * - CAST ( NULL AS INTEGER ) - + + 35 + - col2 * + col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-1379","-3231","-330"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) - + - col2 AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["23","40","58"]
```


```sql
SELECT + col0 + - - col2, CAST ( NULL AS INTEGER ) col2 FROM tab1 AS cor0

Expected: ["144","NULL","147","NULL","159","NULL"] but got ["144","0","147","0","159","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * - col0 col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT col2 + + 76 / - ( - + col1 ) AS col1, 71 + col0 / + - CAST ( NULL AS INTEGER ) AS col2 FROM tab2

Expected: ["24","NULL","40","NULL","59","NULL"] but got ["24.490","NULL","40.987","NULL","59.134","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,451 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 228/620 [`./test/random/aggregates/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT 48 + + col2 AS col0, 47 + - + col2 + CAST ( NULL AS REAL ) + + col2 AS col0 FROM tab2 AS cor0

Expected: ["106","NULL","71","NULL","88","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,271 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 229/620 [`./test/random/aggregates/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,516 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 230/620 [`./test/random/aggregates/slt_good_100.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_100.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col2 AS col0, col0 / + - CAST ( + ( CAST ( NULL AS INTEGER ) ) AS INTEGER ) AS col0 FROM tab1

Expected: ["59","NULL","68","NULL","96","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + 23 + - CAST ( NULL AS REAL ) - + + 67 * + + col2 col1, + col1 * + CAST ( NULL AS INTEGER ) + + - col0 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-15","NULL","-87","NULL","-97"]
```


```sql
SELECT DISTINCT col2 + + 39 / + col2 - - col0 + + col1 + - col0 AS col1, + col1 / + CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["100","NULL","128","NULL","34","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + - col1 * + CAST ( NULL AS INTEGER ) + + col2 * - col0, CAST ( NULL AS REAL ) * col2 + + col1 + + 5 AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["-1058","NULL","-2560","NULL","-4350","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,511 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 231/620 [`./test/random/aggregates/slt_good_101.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_101.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,536 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 232/620 [`./test/random/aggregates/slt_good_102.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_102.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,425 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 233/620 [`./test/random/aggregates/slt_good_103.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_103.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,435 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 226/620 [`./test/index/view/10000/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/index/view/10000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,622 tests as _sqlite_

* 271 failed
* 97% was OK


---- ---- ---- ---- ---- ---- ----
### 234/620 [`./test/random/aggregates/slt_good_104.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_104.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,483 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 235/620 [`./test/random/aggregates/slt_good_105.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_105.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,528 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 236/620 [`./test/random/aggregates/slt_good_106.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_106.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,439 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 237/620 [`./test/random/aggregates/slt_good_107.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_107.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,369 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 238/620 [`./test/random/aggregates/slt_good_108.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_108.test)

_Mimic sqlite_

```sql
SELECT 12 / + - CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,506 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 239/620 [`./test/random/aggregates/slt_good_109.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_109.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,519 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 240/620 [`./test/random/aggregates/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,536 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 241/620 [`./test/random/aggregates/slt_good_110.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_110.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,467 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 242/620 [`./test/random/aggregates/slt_good_111.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_111.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,517 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 243/620 [`./test/random/aggregates/slt_good_112.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_112.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,431 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 244/620 [`./test/random/aggregates/slt_good_113.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_113.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,458 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 245/620 [`./test/random/aggregates/slt_good_114.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_114.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,457 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 246/620 [`./test/random/aggregates/slt_good_115.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_115.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,429 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 247/620 [`./test/random/aggregates/slt_good_116.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_116.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 51 AS col2, + col0 * + col0 * CAST ( NULL AS REAL ) * + - col1 / - col2 AS col2 FROM tab1

Expected: ["51","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,485 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 248/620 [`./test/random/aggregates/slt_good_117.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_117.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,463 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 249/620 [`./test/random/aggregates/slt_good_118.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_118.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,390 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 250/620 [`./test/random/aggregates/slt_good_119.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_119.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,473 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 251/620 [`./test/random/aggregates/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,527 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 252/620 [`./test/random/aggregates/slt_good_120.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_120.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,455 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 253/620 [`./test/random/aggregates/slt_good_121.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_121.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,463 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 254/620 [`./test/random/aggregates/slt_good_122.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_122.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,479 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 255/620 [`./test/random/aggregates/slt_good_123.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_123.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,507 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 256/620 [`./test/random/aggregates/slt_good_124.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_124.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,466 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 257/620 [`./test/random/aggregates/slt_good_125.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_125.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,512 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 258/620 [`./test/random/aggregates/slt_good_126.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_126.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,482 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 259/620 [`./test/random/aggregates/slt_good_127.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_127.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,462 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 260/620 [`./test/random/aggregates/slt_good_128.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_128.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,522 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 261/620 [`./test/random/aggregates/slt_good_129.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_129.test)

_Mimic sqlite_
#### ☓ Ran 802 tests as _sqlite_

* 113 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 262/620 [`./test/random/aggregates/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,403 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 263/620 [`./test/random/aggregates/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,511 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 264/620 [`./test/random/aggregates/slt_good_15.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,502 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 265/620 [`./test/random/aggregates/slt_good_16.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,439 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 266/620 [`./test/random/aggregates/slt_good_17.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_17.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,447 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 267/620 [`./test/random/aggregates/slt_good_18.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_18.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,454 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 268/620 [`./test/random/aggregates/slt_good_19.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,506 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 269/620 [`./test/random/aggregates/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,397 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 270/620 [`./test/random/aggregates/slt_good_20.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,464 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 271/620 [`./test/random/aggregates/slt_good_21.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,474 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 272/620 [`./test/random/aggregates/slt_good_22.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_22.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,524 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 273/620 [`./test/random/aggregates/slt_good_23.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_23.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,439 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 274/620 [`./test/random/aggregates/slt_good_24.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,442 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 275/620 [`./test/random/aggregates/slt_good_25.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_25.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,543 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 276/620 [`./test/random/aggregates/slt_good_26.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_26.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,495 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 277/620 [`./test/random/aggregates/slt_good_27.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,517 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 278/620 [`./test/random/aggregates/slt_good_28.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,520 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 279/620 [`./test/random/aggregates/slt_good_29.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,502 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 280/620 [`./test/random/aggregates/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,523 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 281/620 [`./test/random/aggregates/slt_good_30.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,471 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 282/620 [`./test/random/aggregates/slt_good_31.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_31.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,539 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 283/620 [`./test/random/aggregates/slt_good_32.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,505 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 284/620 [`./test/random/aggregates/slt_good_33.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_33.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,559 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 285/620 [`./test/random/aggregates/slt_good_34.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,359 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 286/620 [`./test/random/aggregates/slt_good_35.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_35.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,405 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 287/620 [`./test/random/aggregates/slt_good_36.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_36.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,421 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 288/620 [`./test/random/aggregates/slt_good_37.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_37.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,420 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 289/620 [`./test/random/aggregates/slt_good_38.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_38.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,418 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 290/620 [`./test/random/aggregates/slt_good_39.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_39.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,473 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 291/620 [`./test/random/aggregates/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,543 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 292/620 [`./test/random/aggregates/slt_good_40.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_40.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 40 / 83 * + - col0 AS col0, CAST ( NULL AS REAL ) * - col1 * 80 AS col1 FROM tab2

Expected: ["0","NULL"] but got ["-22.169","NULL","-30.843","NULL","-36.145","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,452 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 293/620 [`./test/random/aggregates/slt_good_41.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_41.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,338 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 294/620 [`./test/random/aggregates/slt_good_42.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_42.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,413 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 295/620 [`./test/random/aggregates/slt_good_43.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_43.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,446 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 296/620 [`./test/random/aggregates/slt_good_44.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_44.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,477 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 297/620 [`./test/random/aggregates/slt_good_45.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_45.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,390 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 298/620 [`./test/random/aggregates/slt_good_46.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_46.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,459 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 299/620 [`./test/random/aggregates/slt_good_47.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_47.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,466 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 300/620 [`./test/random/aggregates/slt_good_48.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_48.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,376 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 301/620 [`./test/random/aggregates/slt_good_49.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_49.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,413 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 302/620 [`./test/random/aggregates/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,499 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 303/620 [`./test/random/aggregates/slt_good_50.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_50.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,413 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 304/620 [`./test/random/aggregates/slt_good_51.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_51.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,463 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 305/620 [`./test/random/aggregates/slt_good_52.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_52.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,367 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 306/620 [`./test/random/aggregates/slt_good_53.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_53.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,482 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 307/620 [`./test/random/aggregates/slt_good_54.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_54.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,459 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 308/620 [`./test/random/aggregates/slt_good_55.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_55.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,415 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 309/620 [`./test/random/aggregates/slt_good_56.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_56.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,426 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 310/620 [`./test/random/aggregates/slt_good_57.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_57.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,455 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 311/620 [`./test/random/aggregates/slt_good_58.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_58.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,381 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 312/620 [`./test/random/aggregates/slt_good_59.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_59.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,384 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 313/620 [`./test/random/aggregates/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 9 + COUNT ( * ) AS col2, AVG ( DISTINCT + + col2 ) col2, - MAX ( col2 ) AS col0 FROM tab2 AS cor0 WHERE NOT 13 IS NOT NULL

Expected: ["9","NULL","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,523 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 314/620 [`./test/random/aggregates/slt_good_60.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_60.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,479 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 315/620 [`./test/random/aggregates/slt_good_61.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_61.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,402 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 316/620 [`./test/random/aggregates/slt_good_62.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_62.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,380 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 317/620 [`./test/random/aggregates/slt_good_63.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_63.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,351 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 318/620 [`./test/random/aggregates/slt_good_64.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_64.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,437 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 319/620 [`./test/random/aggregates/slt_good_65.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_65.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,427 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 320/620 [`./test/random/aggregates/slt_good_66.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_66.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,406 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 321/620 [`./test/random/aggregates/slt_good_67.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_67.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,479 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 322/620 [`./test/random/aggregates/slt_good_68.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_68.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,427 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 323/620 [`./test/random/aggregates/slt_good_69.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_69.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,399 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 324/620 [`./test/random/aggregates/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,505 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 325/620 [`./test/random/aggregates/slt_good_70.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_70.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,442 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 326/620 [`./test/random/aggregates/slt_good_71.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_71.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,429 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 327/620 [`./test/random/aggregates/slt_good_72.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_72.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,404 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 328/620 [`./test/random/aggregates/slt_good_73.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_73.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,394 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 329/620 [`./test/random/aggregates/slt_good_74.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_74.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,364 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 330/620 [`./test/random/aggregates/slt_good_75.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_75.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,456 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 331/620 [`./test/random/aggregates/slt_good_76.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_76.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,418 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 332/620 [`./test/random/aggregates/slt_good_77.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_77.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,441 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 333/620 [`./test/random/aggregates/slt_good_78.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_78.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,534 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 334/620 [`./test/random/aggregates/slt_good_79.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_79.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,406 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 335/620 [`./test/random/aggregates/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,506 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 336/620 [`./test/random/aggregates/slt_good_80.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_80.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,423 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 337/620 [`./test/random/aggregates/slt_good_81.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_81.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,435 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 338/620 [`./test/random/aggregates/slt_good_82.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_82.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,478 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 339/620 [`./test/random/aggregates/slt_good_83.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_83.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,459 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 340/620 [`./test/random/aggregates/slt_good_84.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_84.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,488 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 341/620 [`./test/random/aggregates/slt_good_85.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_85.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,412 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 342/620 [`./test/random/aggregates/slt_good_86.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_86.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,387 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 343/620 [`./test/random/aggregates/slt_good_87.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_87.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,464 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 344/620 [`./test/random/aggregates/slt_good_88.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_88.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,511 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 345/620 [`./test/random/aggregates/slt_good_89.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_89.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,469 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 346/620 [`./test/random/aggregates/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,393 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 347/620 [`./test/random/aggregates/slt_good_90.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_90.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,520 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 348/620 [`./test/random/aggregates/slt_good_91.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_91.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,488 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 349/620 [`./test/random/aggregates/slt_good_92.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_92.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,460 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 350/620 [`./test/random/aggregates/slt_good_93.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_93.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,462 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 351/620 [`./test/random/aggregates/slt_good_94.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_94.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,443 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 352/620 [`./test/random/aggregates/slt_good_95.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_95.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,444 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 353/620 [`./test/random/aggregates/slt_good_96.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_96.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,408 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 354/620 [`./test/random/aggregates/slt_good_97.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_97.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,494 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 355/620 [`./test/random/aggregates/slt_good_98.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_98.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,482 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 356/620 [`./test/random/aggregates/slt_good_99.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/aggregates/slt_good_99.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,440 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 357/620 [`./test/random/expr/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT SUM ( + 73 ) * - CASE WHEN NOT ( NOT 27 BETWEEN 15 AND - NULLIF ( - 63, - 28 + + 76 ) ) THEN NULL ELSE + 77 * + 69 END / - CAST ( - 69 AS INTEGER ) AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT CASE WHEN COUNT ( * ) BETWEEN - - ( + + 93 ) AND + - NULLIF ( + 36, + 80 ) * + 5 THEN - 31 ELSE NULL END, 84 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT 36 * - ( + 47 ) * ( + 10 ) * + 21 * 27 + CASE WHEN + 83 BETWEEN - - 43 AND NULL THEN + 15 * ( - 94 ) / + - 59 - + 45 END + 2 * - AVG ( DISTINCT 83 ) AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT 72 + - CAST ( + COUNT ( * ) AS INTEGER ), CASE WHEN - 74 BETWEEN + 85 AND 54 / - 81 + 33 * 91 + + + MIN ( DISTINCT + 79 ) THEN - 94 / + CASE 5 WHEN + 8 * 17 THEN 82 END + + - 55 ELSE NULL END AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + CASE - CASE + 3 WHEN - 95 THEN 5 ELSE NULL END WHEN - CASE WHEN 16 NOT BETWEEN 23 * + CAST ( NULL AS REAL ) AND CASE - 93 WHEN NULLIF ( + COUNT ( * ), 98 - + 96 ) + 82 * 37 THEN + 97 + - COUNT ( * ) WHEN 97 * - COUNT ( * ) THEN NULL END / 24 THEN - 13 + + 15 * + 52 WHEN ( + 64 ) >…

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT CASE WHEN 20 NOT BETWEEN + + COALESCE ( + + 51, 2, - 19 + - + 29 + COUNT ( * ) / + COALESCE ( - + AVG ( 15 ), + CAST ( 56 AS INTEGER ) * - CAST ( 44 * + 52 + 62 AS INTEGER ) - 75 * - 43 ) ) * ( 59 - 94 ) AND + CASE + COUNT ( * ) WHEN - 2 THEN + 57 WHEN COUNT ( * ) THEN + 10 ELSE - 6…

Cannot read property 'toString' of undefined
```


```sql
SELECT - CASE WHEN NOT NULL NOT BETWEEN + 61 AND + 78 * - 57 + + CASE + 77 WHEN - 49 THEN NULL WHEN - 60 THEN + 16 WHEN 73 + + 89 + - 57 THEN + - 70 * - + 16 END THEN - + ( ( - AVG ( ALL 49 ) ) ) * + 48 - - 79 * - CAST ( NULL AS INTEGER ) END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + ( - 43 ) + + 66 / - CASE WHEN NOT ( - SUM ( + 60 ) * - 24 ) NOT BETWEEN NULL AND + MIN ( DISTINCT - 98 ) THEN NULL WHEN NOT NULL IS NULL THEN 6 + - 45 ELSE NULL END AS col2

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,687 failed
* 83% was OK


---- ---- ---- ---- ---- ---- ----
### 358/620 [`./test/random/expr/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT - CASE WHEN NOT NULL BETWEEN NULL AND NULL THEN 17 ELSE NULL END + + 12

Cannot read property 'toString' of undefined
```


```sql
SELECT ( + - CASE WHEN NULL BETWEEN NULL AND 93 THEN - CAST ( 90 AS INTEGER ) END ) AS col1

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,032 failed
* 89% was OK


---- ---- ---- ---- ---- ---- ----
### 359/620 [`./test/random/expr/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,913 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 360/620 [`./test/random/expr/slt_good_100.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_100.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,949 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 361/620 [`./test/random/expr/slt_good_101.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_101.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,907 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 362/620 [`./test/random/expr/slt_good_102.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_102.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 2,016 failed
* 79% was OK


---- ---- ---- ---- ---- ---- ----
### 363/620 [`./test/random/expr/slt_good_103.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_103.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,924 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 364/620 [`./test/random/expr/slt_good_104.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_104.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,930 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 365/620 [`./test/random/expr/slt_good_105.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_105.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,854 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 366/620 [`./test/random/expr/slt_good_106.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_106.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,905 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 367/620 [`./test/random/expr/slt_good_107.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_107.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,912 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 368/620 [`./test/random/expr/slt_good_108.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_108.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,885 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 369/620 [`./test/random/expr/slt_good_109.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_109.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,722 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 370/620 [`./test/random/expr/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,934 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 371/620 [`./test/random/expr/slt_good_110.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_110.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,900 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 372/620 [`./test/random/expr/slt_good_111.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_111.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,876 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 373/620 [`./test/random/expr/slt_good_112.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_112.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,970 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 374/620 [`./test/random/expr/slt_good_113.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_113.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,884 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 375/620 [`./test/random/expr/slt_good_114.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_114.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,929 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 376/620 [`./test/random/expr/slt_good_115.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_115.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,939 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 377/620 [`./test/random/expr/slt_good_116.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_116.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,876 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 378/620 [`./test/random/expr/slt_good_117.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_117.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,805 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 379/620 [`./test/random/expr/slt_good_118.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_118.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,949 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 380/620 [`./test/random/expr/slt_good_119.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_119.test)

_Mimic sqlite_
#### ☓ Ran 8,938 tests as _sqlite_

* 1,720 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 381/620 [`./test/random/expr/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,985 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 382/620 [`./test/random/expr/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,540 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 383/620 [`./test/random/expr/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,985 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 384/620 [`./test/random/expr/slt_good_15.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,985 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 385/620 [`./test/random/expr/slt_good_16.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,919 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 386/620 [`./test/random/expr/slt_good_17.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_17.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,939 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 387/620 [`./test/random/expr/slt_good_18.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_18.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,956 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 388/620 [`./test/random/expr/slt_good_19.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,918 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 389/620 [`./test/random/expr/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,350 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 390/620 [`./test/random/expr/slt_good_20.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,952 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 391/620 [`./test/random/expr/slt_good_21.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,950 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 392/620 [`./test/random/expr/slt_good_22.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_22.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,880 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 393/620 [`./test/random/expr/slt_good_23.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_23.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,927 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 394/620 [`./test/random/expr/slt_good_24.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,723 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 395/620 [`./test/random/expr/slt_good_25.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_25.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,723 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 396/620 [`./test/random/expr/slt_good_26.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_26.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,737 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 397/620 [`./test/random/expr/slt_good_27.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,698 failed
* 83% was OK


---- ---- ---- ---- ---- ---- ----
### 398/620 [`./test/random/expr/slt_good_28.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,787 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 399/620 [`./test/random/expr/slt_good_29.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,376 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 400/620 [`./test/random/expr/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,918 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 401/620 [`./test/random/expr/slt_good_30.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,636 failed
* 83% was OK


---- ---- ---- ---- ---- ---- ----
### 402/620 [`./test/random/expr/slt_good_31.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_31.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,665 failed
* 83% was OK


---- ---- ---- ---- ---- ---- ----
### 403/620 [`./test/random/expr/slt_good_32.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,312 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 404/620 [`./test/random/expr/slt_good_33.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_33.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,710 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 405/620 [`./test/random/expr/slt_good_34.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,804 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 406/620 [`./test/random/expr/slt_good_35.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_35.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,753 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 407/620 [`./test/random/expr/slt_good_36.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_36.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,779 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 408/620 [`./test/random/expr/slt_good_37.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_37.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,795 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 409/620 [`./test/random/expr/slt_good_38.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_38.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,848 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 410/620 [`./test/random/expr/slt_good_39.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_39.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,834 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 411/620 [`./test/random/expr/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,911 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 412/620 [`./test/random/expr/slt_good_40.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_40.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,818 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 413/620 [`./test/random/expr/slt_good_41.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_41.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,794 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 414/620 [`./test/random/expr/slt_good_42.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_42.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,803 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 415/620 [`./test/random/expr/slt_good_43.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_43.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,438 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 416/620 [`./test/random/expr/slt_good_44.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_44.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,837 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 417/620 [`./test/random/expr/slt_good_45.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_45.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,866 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 418/620 [`./test/random/expr/slt_good_46.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_46.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,793 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 419/620 [`./test/random/expr/slt_good_47.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_47.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,776 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 420/620 [`./test/random/expr/slt_good_48.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_48.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,885 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 421/620 [`./test/random/expr/slt_good_49.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_49.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,852 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 422/620 [`./test/random/expr/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,900 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 423/620 [`./test/random/expr/slt_good_50.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_50.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,840 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 424/620 [`./test/random/expr/slt_good_51.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_51.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,810 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 425/620 [`./test/random/expr/slt_good_52.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_52.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,915 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 426/620 [`./test/random/expr/slt_good_53.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_53.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,833 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 427/620 [`./test/random/expr/slt_good_54.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_54.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,455 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 428/620 [`./test/random/expr/slt_good_55.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_55.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,938 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 429/620 [`./test/random/expr/slt_good_56.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_56.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,871 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 430/620 [`./test/random/expr/slt_good_57.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_57.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,839 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 431/620 [`./test/random/expr/slt_good_58.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_58.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,815 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 432/620 [`./test/random/expr/slt_good_59.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_59.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,839 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 433/620 [`./test/random/expr/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,873 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 434/620 [`./test/random/expr/slt_good_60.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_60.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,858 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 435/620 [`./test/random/expr/slt_good_61.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_61.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,860 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 436/620 [`./test/random/expr/slt_good_62.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_62.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,899 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 437/620 [`./test/random/expr/slt_good_63.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_63.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,856 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 438/620 [`./test/random/expr/slt_good_64.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_64.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,909 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 439/620 [`./test/random/expr/slt_good_65.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_65.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,547 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 440/620 [`./test/random/expr/slt_good_66.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_66.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,891 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 441/620 [`./test/random/expr/slt_good_67.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_67.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,889 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 442/620 [`./test/random/expr/slt_good_68.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_68.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,789 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 443/620 [`./test/random/expr/slt_good_69.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_69.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,894 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 444/620 [`./test/random/expr/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,911 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 445/620 [`./test/random/expr/slt_good_70.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_70.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,845 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 446/620 [`./test/random/expr/slt_good_71.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_71.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,840 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 447/620 [`./test/random/expr/slt_good_72.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_72.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,904 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 448/620 [`./test/random/expr/slt_good_73.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_73.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,877 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 449/620 [`./test/random/expr/slt_good_74.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_74.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,941 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 450/620 [`./test/random/expr/slt_good_75.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_75.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,914 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 451/620 [`./test/random/expr/slt_good_76.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_76.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,538 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 452/620 [`./test/random/expr/slt_good_77.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_77.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,848 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 453/620 [`./test/random/expr/slt_good_78.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_78.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,868 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 454/620 [`./test/random/expr/slt_good_79.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_79.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,919 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 455/620 [`./test/random/expr/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,965 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 456/620 [`./test/random/expr/slt_good_80.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_80.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,886 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 457/620 [`./test/random/expr/slt_good_81.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_81.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,901 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 458/620 [`./test/random/expr/slt_good_82.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_82.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,935 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 459/620 [`./test/random/expr/slt_good_83.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_83.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,859 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 460/620 [`./test/random/expr/slt_good_84.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_84.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,833 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 461/620 [`./test/random/expr/slt_good_85.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_85.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,893 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 462/620 [`./test/random/expr/slt_good_86.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_86.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,771 failed
* 82% was OK


---- ---- ---- ---- ---- ---- ----
### 463/620 [`./test/random/expr/slt_good_87.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_87.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,594 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 464/620 [`./test/random/expr/slt_good_88.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_88.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,920 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 465/620 [`./test/random/expr/slt_good_89.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_89.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,844 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 466/620 [`./test/random/expr/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,899 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 467/620 [`./test/random/expr/slt_good_90.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_90.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,909 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 468/620 [`./test/random/expr/slt_good_91.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_91.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,895 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 469/620 [`./test/random/expr/slt_good_92.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_92.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,953 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 470/620 [`./test/random/expr/slt_good_93.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_93.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,912 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 471/620 [`./test/random/expr/slt_good_94.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_94.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,898 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 472/620 [`./test/random/expr/slt_good_95.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_95.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,937 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 473/620 [`./test/random/expr/slt_good_96.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_96.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,854 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 474/620 [`./test/random/expr/slt_good_97.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_97.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,894 failed
* 81% was OK


---- ---- ---- ---- ---- ---- ----
### 475/620 [`./test/random/expr/slt_good_98.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_98.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,636 failed
* 83% was OK


---- ---- ---- ---- ---- ---- ----
### 476/620 [`./test/random/expr/slt_good_99.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/expr/slt_good_99.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,913 failed
* 80% was OK


---- ---- ---- ---- ---- ---- ----
### 477/620 [`./test/random/groupby/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,255 failed
* 57% was OK


---- ---- ---- ---- ---- ---- ----
### 478/620 [`./test/random/groupby/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,112 failed
* 58% was OK


---- ---- ---- ---- ---- ---- ----
### 479/620 [`./test/random/groupby/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 305 failed
* 96% was OK


---- ---- ---- ---- ---- ---- ----
### 480/620 [`./test/random/groupby/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 815 failed
* 91% was OK


---- ---- ---- ---- ---- ---- ----
### 481/620 [`./test/random/groupby/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT + ( - - col2 ) + col2 + - col2 * + - col2 + + + 61 * - CAST ( NULL AS INTEGER ) AS col0 FROM tab2 cor0 WHERE NOT - col0 + + ( + - 18 ) + + - CAST ( NULL AS REAL ) IS NOT NULL GROUP BY col2

Expected: ["NULL","NULL","NULL"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) / + col1 AS col0 FROM tab1 AS cor0 WHERE NOT + 56 BETWEEN - - 14 + col2 * - + col1 / - col1 * + - col1 AND - ( + col1 ) + + col2 GROUP BY col1, col1

Expected: ["NULL","NULL","NULL"] but got ["NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,393 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 482/620 [`./test/random/groupby/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 3,182 tests as _sqlite_

* 1,244 failed
* 60% was OK


---- ---- ---- ---- ---- ---- ----
### 483/620 [`./test/random/groupby/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,161 failed
* 58% was OK


---- ---- ---- ---- ---- ---- ----
### 484/620 [`./test/random/groupby/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,442 failed
* 55% was OK


---- ---- ---- ---- ---- ---- ----
### 485/620 [`./test/random/groupby/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,336 failed
* 56% was OK


---- ---- ---- ---- ---- ---- ----
### 486/620 [`./test/random/groupby/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,462 failed
* 55% was OK


---- ---- ---- ---- ---- ---- ----
### 487/620 [`./test/random/groupby/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,573 failed
* 54% was OK


---- ---- ---- ---- ---- ---- ----
### 488/620 [`./test/random/groupby/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 4,505 failed
* 55% was OK


---- ---- ---- ---- ---- ---- ----
### 489/620 [`./test/random/groupby/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 2,960 failed
* 70% was OK


---- ---- ---- ---- ---- ---- ----
### 490/620 [`./test/random/groupby/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/groupby/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 506 failed
* 94% was OK


---- ---- ---- ---- ---- ---- ----
### 491/620 [`./test/random/select/slt_good_0.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab0 AS cor2, tab0 cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab0, tab2 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab0, tab1 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab1, tab0 cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab0, tab1 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```


```sql
SELECT * FROM tab1, tab0 AS cor0 CROSS JOIN tab2, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab0, tab2 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab0, tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab0, tab2 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab2 cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab2, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab0, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab2, tab2 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab2, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab2, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab2 cor0 CROSS JOIN tab0, tab2 AS cor1, tab2 AS cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab1 AS cor2, tab1 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab1, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab2, tab1 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1, tab1 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,507 failed
* 84% was OK


---- ---- ---- ---- ---- ---- ----
### 492/620 [`./test/random/select/slt_good_1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + 96 FROM tab1 cor0 CROSS JOIN tab1, tab1 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab0, tab2 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab2, tab1 AS cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT + 59 FROM tab1 AS cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2, tab1 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1, tab0 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab0, tab1 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT cor0.col1 FROM tab1 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab1, tab2 AS cor0 CROSS JOIN tab0, tab0 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT - 88 + - 5 AS col1 FROM tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab0, tab0 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'AN…
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1, tab1 AS cor1 WHERE NOT ( NULL ) < NULL

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1 WHERE
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0, tab2 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab0, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0, tab0 AS cor1, tab2 cor2, tab1 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab0, tab2 cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 cor1, tab2 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,252 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 493/620 [`./test/random/select/slt_good_10.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,190 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 494/620 [`./test/random/select/slt_good_100.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_100.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,303 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 495/620 [`./test/random/select/slt_good_101.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_101.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,321 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 496/620 [`./test/random/select/slt_good_102.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_102.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,323 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 497/620 [`./test/random/select/slt_good_103.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_103.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,324 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 498/620 [`./test/random/select/slt_good_104.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_104.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,320 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 499/620 [`./test/random/select/slt_good_105.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_105.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,316 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 500/620 [`./test/random/select/slt_good_106.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_106.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,298 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 501/620 [`./test/random/select/slt_good_107.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_107.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,314 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 502/620 [`./test/random/select/slt_good_108.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_108.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,274 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 503/620 [`./test/random/select/slt_good_109.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_109.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,277 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 504/620 [`./test/random/select/slt_good_11.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,245 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 505/620 [`./test/random/select/slt_good_110.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_110.test)

_Mimic sqlite_
#### ☓ Ran 10,009 tests as _sqlite_

* 1,306 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 506/620 [`./test/random/select/slt_good_111.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_111.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,358 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 507/620 [`./test/random/select/slt_good_112.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_112.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,316 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 508/620 [`./test/random/select/slt_good_113.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_113.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,227 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 509/620 [`./test/random/select/slt_good_114.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_114.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,267 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 510/620 [`./test/random/select/slt_good_115.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_115.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,323 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 511/620 [`./test/random/select/slt_good_116.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_116.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,334 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 512/620 [`./test/random/select/slt_good_117.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_117.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,406 failed
* 85% was OK


---- ---- ---- ---- ---- ---- ----
### 513/620 [`./test/random/select/slt_good_118.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_118.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,327 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 514/620 [`./test/random/select/slt_good_119.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_119.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,320 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 515/620 [`./test/random/select/slt_good_12.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,160 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 516/620 [`./test/random/select/slt_good_120.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_120.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,289 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 517/620 [`./test/random/select/slt_good_121.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_121.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,283 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 518/620 [`./test/random/select/slt_good_122.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_122.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,331 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 519/620 [`./test/random/select/slt_good_123.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_123.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,312 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 520/620 [`./test/random/select/slt_good_124.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_124.test)

_Mimic sqlite_
#### ☓ Ran 2,865 tests as _sqlite_

* 365 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 521/620 [`./test/random/select/slt_good_125.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_125.test)

_Mimic sqlite_

#### ★ Assuming all 12 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 522/620 [`./test/random/select/slt_good_126.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_126.test)

_Mimic sqlite_

#### ★ Assuming all 12 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 523/620 [`./test/random/select/slt_good_13.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,216 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 524/620 [`./test/random/select/slt_good_14.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,205 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 525/620 [`./test/random/select/slt_good_15.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,189 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 526/620 [`./test/random/select/slt_good_16.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,205 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 527/620 [`./test/random/select/slt_good_17.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_17.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,222 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 528/620 [`./test/random/select/slt_good_18.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_18.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,211 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 529/620 [`./test/random/select/slt_good_19.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,205 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 530/620 [`./test/random/select/slt_good_2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,213 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 531/620 [`./test/random/select/slt_good_20.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,194 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 532/620 [`./test/random/select/slt_good_21.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,247 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 533/620 [`./test/random/select/slt_good_22.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_22.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,236 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 534/620 [`./test/random/select/slt_good_23.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_23.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,258 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 535/620 [`./test/random/select/slt_good_24.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,219 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 536/620 [`./test/random/select/slt_good_25.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_25.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,192 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 537/620 [`./test/random/select/slt_good_26.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_26.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,231 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 538/620 [`./test/random/select/slt_good_27.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,165 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 539/620 [`./test/random/select/slt_good_28.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,205 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 540/620 [`./test/random/select/slt_good_29.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,281 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 541/620 [`./test/random/select/slt_good_3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,161 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 542/620 [`./test/random/select/slt_good_30.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,325 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 543/620 [`./test/random/select/slt_good_31.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_31.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,253 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 544/620 [`./test/random/select/slt_good_32.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,260 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 545/620 [`./test/random/select/slt_good_33.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_33.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,270 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 546/620 [`./test/random/select/slt_good_34.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,271 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 547/620 [`./test/random/select/slt_good_35.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_35.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,236 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 548/620 [`./test/random/select/slt_good_36.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_36.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,308 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 549/620 [`./test/random/select/slt_good_37.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_37.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,197 failed
* 88% was OK


---- ---- ---- ---- ---- ---- ----
### 550/620 [`./test/random/select/slt_good_38.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_38.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,234 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 551/620 [`./test/random/select/slt_good_39.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_39.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,225 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 552/620 [`./test/random/select/slt_good_4.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,224 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 553/620 [`./test/random/select/slt_good_40.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_40.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,229 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 554/620 [`./test/random/select/slt_good_41.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_41.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,219 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 555/620 [`./test/random/select/slt_good_42.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_42.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,287 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 556/620 [`./test/random/select/slt_good_43.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_43.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,206 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 557/620 [`./test/random/select/slt_good_44.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_44.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,243 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 558/620 [`./test/random/select/slt_good_45.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_45.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,244 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 559/620 [`./test/random/select/slt_good_46.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_46.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,265 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 560/620 [`./test/random/select/slt_good_47.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_47.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,250 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 561/620 [`./test/random/select/slt_good_48.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_48.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,259 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 562/620 [`./test/random/select/slt_good_49.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_49.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,238 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 563/620 [`./test/random/select/slt_good_5.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,233 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 564/620 [`./test/random/select/slt_good_50.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_50.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,300 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 565/620 [`./test/random/select/slt_good_51.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_51.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,232 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 566/620 [`./test/random/select/slt_good_52.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_52.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,291 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 567/620 [`./test/random/select/slt_good_53.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_53.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,259 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 568/620 [`./test/random/select/slt_good_54.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_54.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,332 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 569/620 [`./test/random/select/slt_good_55.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_55.test)

_Mimic sqlite_
#### ☓ Ran 10,009 tests as _sqlite_

* 1,281 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 570/620 [`./test/random/select/slt_good_56.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_56.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,203 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 571/620 [`./test/random/select/slt_good_57.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_57.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,307 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 572/620 [`./test/random/select/slt_good_58.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_58.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,281 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 573/620 [`./test/random/select/slt_good_59.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_59.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,296 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 574/620 [`./test/random/select/slt_good_6.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,229 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 575/620 [`./test/random/select/slt_good_60.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_60.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,288 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 576/620 [`./test/random/select/slt_good_61.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_61.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,281 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 577/620 [`./test/random/select/slt_good_62.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_62.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,234 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 578/620 [`./test/random/select/slt_good_63.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_63.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,303 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 579/620 [`./test/random/select/slt_good_64.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_64.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,260 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 580/620 [`./test/random/select/slt_good_65.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_65.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,286 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 581/620 [`./test/random/select/slt_good_66.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_66.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,265 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 582/620 [`./test/random/select/slt_good_67.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_67.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,242 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 583/620 [`./test/random/select/slt_good_68.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_68.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,263 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 584/620 [`./test/random/select/slt_good_69.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_69.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,281 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 585/620 [`./test/random/select/slt_good_7.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,202 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 586/620 [`./test/random/select/slt_good_70.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_70.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,329 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 587/620 [`./test/random/select/slt_good_71.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_71.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,282 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 588/620 [`./test/random/select/slt_good_72.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_72.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,321 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 589/620 [`./test/random/select/slt_good_73.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_73.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,318 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 590/620 [`./test/random/select/slt_good_74.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_74.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,270 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 591/620 [`./test/random/select/slt_good_75.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_75.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,242 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 592/620 [`./test/random/select/slt_good_76.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_76.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,319 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 593/620 [`./test/random/select/slt_good_77.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_77.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,291 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 594/620 [`./test/random/select/slt_good_78.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_78.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,269 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 595/620 [`./test/random/select/slt_good_79.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_79.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,269 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 596/620 [`./test/random/select/slt_good_8.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,233 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 597/620 [`./test/random/select/slt_good_80.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_80.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,307 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 598/620 [`./test/random/select/slt_good_81.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_81.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,289 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 599/620 [`./test/random/select/slt_good_82.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_82.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,241 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 600/620 [`./test/random/select/slt_good_83.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_83.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,301 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 601/620 [`./test/random/select/slt_good_84.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_84.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,314 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 602/620 [`./test/random/select/slt_good_85.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_85.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,315 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 603/620 [`./test/random/select/slt_good_86.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_86.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,263 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 604/620 [`./test/random/select/slt_good_87.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_87.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,263 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 605/620 [`./test/random/select/slt_good_88.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_88.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,311 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 606/620 [`./test/random/select/slt_good_89.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_89.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,290 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 607/620 [`./test/random/select/slt_good_9.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10,010 tests as _sqlite_

* 1,202 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 608/620 [`./test/random/select/slt_good_90.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_90.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,281 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 609/620 [`./test/random/select/slt_good_91.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_91.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,259 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 610/620 [`./test/random/select/slt_good_92.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_92.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,369 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 611/620 [`./test/random/select/slt_good_93.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_93.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,264 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 612/620 [`./test/random/select/slt_good_94.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_94.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,314 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 613/620 [`./test/random/select/slt_good_95.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_95.test)

_Mimic sqlite_
#### ☓ Ran 10,011 tests as _sqlite_

* 1,280 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 614/620 [`./test/random/select/slt_good_96.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_96.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,223 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 615/620 [`./test/random/select/slt_good_97.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_97.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,308 failed
* 86% was OK


---- ---- ---- ---- ---- ---- ----
### 616/620 [`./test/random/select/slt_good_98.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_98.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,263 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 617/620 [`./test/random/select/slt_good_99.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/random/select/slt_good_99.test)

_Mimic sqlite_
#### ☓ Ran 10,012 tests as _sqlite_

* 1,263 failed
* 87% was OK


---- ---- ---- ---- ---- ---- ----
### 618/620 [`./test/select1.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/select1.test)

_Mimic sqlite_

#### ★ Assuming all 1,031 tests still passes as _sqlite_


---- ---- ---- ---- ---- ---- ----
### 619/620 [`./test/select2.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/select2.test)

_Mimic sqlite_

```sql
SELECT a, (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b), a+b*2+c*3+d*4+e*5, d FROM t1 WHERE a IS NULL

Expected: ["NULL","1","NULL","114","NULL","18","NULL","207"] but got ["NULL","18","NULL","207","NULL","1","NULL","114"]
```

#### ☓ Ran 1,031 tests as _sqlite_

* 152 failed
* 85% was OK


-----------------------------

## Final result

* `alasql@0.3.2`
* Total tested: 5,043,908
* Failed tests: 653,686
* Skipped tests: 165
* Assumed still OK: 887,332
* Final score: 88 % was OK

Total script time: 3449687.116ms

_Please note that repetetive errors are not always printed again_

---- ---- ---- ---- ---- ---- ----
### 620/620 [`./test/select3.test`](https://github.com/alasql/alasql-logictest/blob/master/test/./test/select3.test)

_Mimic sqlite_
#### ☓ Ran 3,351 tests as _sqlite_

* 306 failed
* 90% was OK


-----------------------------

## Final result

* `alasql@0.3.2`
* Total tested: 5,047,259
* Failed tests: 653,992
* Skipped tests: 165
* Assumed still OK: 887,332
* Final score: 88 % was OK


_Please note that repetetive errors are not always printed again_
