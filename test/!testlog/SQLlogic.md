# SQLlogictest results for AlaSQL 

`2016-03-02T22:42:10.170Z target: alasql@0.2.3-develop-1206`

This is a subset of the total 622 tests.
Results from 190 test files:

---- ---- ---- ---- ---- ---- ----
### 1/190 [`./test/evidence/in1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in1.test)

_Mimic sqlite_

```sql
SELECT 1 IN t1

Cannot read property 't1' of undefined
```


```sql
INSERT INTO t5 SELECT * FROM t4

Cannot insert record, because it already exists in primary key index
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 216 tests as _sqlite_

* 148 skipped
* 19 failed
* 22% was OK

Time: 374.918ms

---- ---- ---- ---- ---- ---- ----
### 2/190 [`./test/evidence/in2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in2.test)

_Mimic sqlite_

```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)

Expected to get an error but did not
```

#### ☓ Ran 53 tests as _sqlite_

* 4 failed
* 92% was OK

Time: 410.068ms

---- ---- ---- ---- ---- ---- ----
### 3/190 [`./test/evidence/slt_lang_aggfunc.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_aggfunc.test)

_Mimic sqlite_

```sql
SELECT avg(DISTINCT x) FROM t1

Expected: ["0"] but got ["0.500"]
```


```sql
SELECT total(DISTINCT x) FROM t1

Unexpected token ,
```


```sql
SELECT avg(y) FROM t1

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT sum(y) FROM t1

Expected: ["0"] but got ["truefalseNULLtruetrue"]
```


```sql
SELECT sum(DISTINCT y) FROM t1

Expected: ["0"] but got ["truefalseNULL"]
```


```sql
SELECT count(DISTINCT *) FROM t1 WHERE y='false'

Expected to get an error but did not
```


```sql
SELECT sum(x) FROM t1 WHERE y='null'

Expected: ["NULL"] but got ["0"]
```

#### ☓ Ran 80 tests as _sqlite_

* 37 failed
* 53% was OK

Time: 323.993ms

---- ---- ---- ---- ---- ---- ----
### 4/190 [`./test/evidence/slt_lang_createtrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createtrigger.test)

_Mimic sqlite_

```sql
CREATE TRIGGER t1r1 UPDATE ON t1 BEGIN SELECT 1; END;

Expected to get an error but did not
```


```sql
DROP TRIGGER t1r1

Cannot read property 'beforeinsert' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 26 tests as _sqlite_

* 9 skipped
* 2 failed
* 57% was OK

Time: 76.481ms

---- ---- ---- ---- ---- ---- ----
### 5/190 [`./test/evidence/slt_lang_createview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createview.test)

_Mimic sqlite_

```sql
SELECT x FROM view1

Expected: ["1"] but got ["NULL"]
```


```sql
DELETE FROM view1 WHERE x>0

Expected to get an error but did not
```

#### ☓ Ran 23 tests as _sqlite_

* 8 failed
* 65% was OK

Time: 72.627ms

---- ---- ---- ---- ---- ---- ----
### 6/190 [`./test/evidence/slt_lang_dropindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropindex.test)

_Mimic sqlite_

```sql
DROP INDEX t1i1;

Expected to get an error but did not
```

#### ☓ Ran 8 tests as _sqlite_

* 2 failed
* 75% was OK

Time: 35.251ms

---- ---- ---- ---- ---- ---- ----
### 7/190 [`./test/evidence/slt_lang_droptable.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptable.test)

_Mimic sqlite_

```sql
DROP INDEX t1i1;

Expected to get an error but did not
```

#### ☓ Ran 12 tests as _sqlite_

* 1 failed
* 91% was OK

Time: 43.566ms

---- ---- ---- ---- ---- ---- ----
### 8/190 [`./test/evidence/slt_lang_droptrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptrigger.test)

_Mimic sqlite_

```sql
DROP TRIGGER t1r1

Cannot read property 'beforeinsert' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12 tests as _sqlite_

* 5 skipped
* 1 failed
* 50% was OK

Time: 43.149ms

---- ---- ---- ---- ---- ---- ----
### 9/190 [`./test/evidence/slt_lang_dropview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropview.test)

_Mimic sqlite_

```sql
SELECT x FROM view2

Expected: ["0"] but got ["NULL"]
```

#### ☓ Ran 13 tests as _sqlite_

* 1 failed
* 92% was OK

Time: 74.767ms

---- ---- ---- ---- ---- ---- ----
### 10/190 [`./test/evidence/slt_lang_reindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_reindex.test)

#### ★ Assuming all 7 tests still passes as _sqlite_

Time: 0.712ms

---- ---- ---- ---- ---- ---- ----
### 11/190 [`./test/evidence/slt_lang_replace.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_replace.test)

#### ★ Assuming all 14 tests still passes as _sqlite_

Time: 2.216ms

---- ---- ---- ---- ---- ---- ----
### 12/190 [`./test/evidence/slt_lang_update.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_update.test)

_Mimic sqlite_

```sql
UPDATE t1 SET z='foo'

Expected to get an error but did not
```

#### ☓ Ran 27 tests as _sqlite_

* 2 failed
* 92% was OK

Time: 129.408ms

---- ---- ---- ---- ---- ---- ----
### 13/190 [`./test/index/between/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((col0 IN (SELECT col3 FROM tab0 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab0 WHERE col1 < 4.40) OR col3 BETWEEN 6 AND 3) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```

#### ☓ Ran 10,022 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 167923.376ms

---- ---- ---- ---- ---- ---- ----
### 14/190 [`./test/index/between/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_0.test)

#### ★ Assuming all 10,033 tests still passes as _sqlite_

Time: 0.683ms

---- ---- ---- ---- ---- ---- ----
### 15/190 [`./test/index/between/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col4 < 28.47 AND col1 IN (SELECT col4 FROM tab0 WHERE (((col3 = 64 OR (((col3 IN (SELECT col0 FROM tab0 WHERE col3 BETWEEN 85 AND 52 OR (((col3 < 20)) AND col3 > 60)))))) AND col1 = 95.83)))

Cannot read property '0' of undefined
```

#### ☓ Ran 10,029 tests as _sqlite_

* 40 failed
* 99% was OK

Time: 134590.828ms

---- ---- ---- ---- ---- ---- ----
### 16/190 [`./test/index/between/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col3 < 32) AND ((((col3 <= 73 AND col0 < 84 OR col0 >= 3 AND (((col4 < 22.55) OR col0 <= 88 AND (col4 <= 26.20) OR col3 < 9) AND col0 >= 80 AND col0 = 25 AND (((col3 = 9)))) OR (col3 <= 96) AND col1 < 20.30 AND col3 > 2 OR (col4 >= 34.97 OR ((col1 > 27.35))) AND ((col4 < …

Cannot read property '0' of undefined
```

#### ☓ Ran 10,032 tests as _sqlite_

* 40 failed
* 99% was OK

Time: 149871.154ms

---- ---- ---- ---- ---- ---- ----
### 17/190 [`./test/index/between/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_3.test)

#### ★ Assuming all 10,032 tests still passes as _sqlite_

Time: 0.804ms

---- ---- ---- ---- ---- ---- ----
### 18/190 [`./test/index/between/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_4.test)

#### ★ Assuming all 10,032 tests still passes as _sqlite_

Time: 0.539ms

---- ---- ---- ---- ---- ---- ----
### 19/190 [`./test/index/between/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((col3 < 49 AND (col4 >= 2.37 AND col3 <= 34 OR (col0 > 45 AND col3 IN (84,55,60,5,10,51) AND col3 > 44)) AND ((col4 BETWEEN 85.7 AND 68.3 AND col0 > 12) OR col3 >= 61 AND col1 < 44.10 OR ((((col1 <= 88.54)) AND col3 BETWEEN 50 AND 64) AND col0 < 7) OR ((col0 > 68)) AND co…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,031 tests as _sqlite_

* 50 failed
* 99% was OK

Time: 155861.705ms

---- ---- ---- ---- ---- ---- ----
### 20/190 [`./test/index/between/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_0.test)

#### ★ Assuming all 10,123 tests still passes as _sqlite_

Time: 0.490ms

---- ---- ---- ---- ---- ---- ----
### 21/190 [`./test/index/between/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 < 732) OR (col4 IN (SELECT col1 FROM tab0 WHERE (((col3 IN (SELECT col0 FROM tab0 WHERE col4 > 814.80) AND col0 IS NULL AND ((col4 >= 266.93) OR col3 < 534) AND (col0 > 608) AND (col0 <= 34) AND col0 < 942)) OR col3 BETWEEN 616 AND 482)) AND col4 > 307.71 AND col0 > …

Cannot read property '0' of undefined
```

#### ☓ Ran 10,125 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 151890.105ms

---- ---- ---- ---- ---- ---- ----
### 22/190 [`./test/index/between/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (((((((col1 IN (SELECT col4 FROM tab0 WHERE ((col3 <= 554) AND col0 BETWEEN 735 AND 859 AND col0 IN (SELECT col3 FROM tab0 WHERE (col1 >= 36.15))) AND ((((col1 <= 171.81))))) AND col4 < 379.48 OR col4 IS NULL AND col1 >= 914.18 OR col3 >= 324 OR ((col4 > 84.85 AND col0 >= …

Cannot read property '0' of undefined
```

#### ☓ Ran 10,121 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 126129.676ms

---- ---- ---- ---- ---- ---- ----
### 23/190 [`./test/index/between/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col4 IN (SELECT col1 FROM tab0 WHERE col3 IN (808,18,855,768,767,23) AND ((col0 > 394 AND col1 = 993.11 AND col3 < 701 AND col3 >= 317 OR ((col0 <= 101 OR col0 < 928)) AND (col3 IN (SELECT col0 FROM tab0 WHERE ((col3 >= 671) OR col0 > 775) AND ((((col0 <= 903 OR (col0 > 9)…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,121 tests as _sqlite_

* 40 failed
* 99% was OK

Time: 122345.323ms

---- ---- ---- ---- ---- ---- ----
### 24/190 [`./test/index/between/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE col4 IN (SELECT col1 FROM tab0 WHERE (((((((col3 BETWEEN 320 AND 970 AND col3 <= 223) OR col4 <= 829.17) AND (col3 >= 651 AND (col3 < 768 OR col0 > 379 OR ((col0 <= 960 OR ((((col4 >= 450.22 AND (col0 = 332 AND col3 < 129)) OR (col1 IN…

Cannot read property '1' of undefined
```

#### ☓ Ran 10,125 tests as _sqlite_

* 50 failed
* 99% was OK

Time: 132924.637ms

---- ---- ---- ---- ---- ---- ----
### 25/190 [`./test/index/between/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1000/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col0 > 2377 OR ((col1 > 2834.62)) AND (col0 IS NULL OR (col4 < 7463.98 AND (col3 <= 1805)) OR ((col3 >= 5222))) AND col0 <= 9495 AND col3 IN (SELECT col0 FROM tab0 WHERE col1 >= 6814.64 OR (col1 > 7430.5) AND col3 > 6478 OR col3 < 2867 AND col1 > 1953.89 AND (col3 >= 2268 …

Cannot read property '0' of undefined
```

#### ☓ Ran 3,792 tests as _sqlite_

* 11 failed
* 99% was OK

Time: 178928.434ms

---- ---- ---- ---- ---- ---- ----
### 26/190 [`./test/index/commute/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((((col4 < 26.48))) AND col4 IN (SELECT col1 FROM tab0 WHERE (col3 < 55 OR ((col0 >= 53 AND (((((col0 > 8) AND (((col3 IN (SELECT col0 FROM tab0 WHERE col0 < 65 AND col1 > 42.32)) OR col1 IS NULL OR col3 > 84 OR (col4 IS NULL)) OR ((col0 <= 9))))) AND col0 IN (1))) OR col3…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,034 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 43058.518ms

---- ---- ---- ---- ---- ---- ----
### 27/190 [`./test/index/commute/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_1.test)

#### ★ Assuming all 10,030 tests still passes as _sqlite_

Time: 0.630ms

---- ---- ---- ---- ---- ---- ----
### 28/190 [`./test/index/commute/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_2.test)

#### ★ Assuming all 10,037 tests still passes as _sqlite_

Time: 0.454ms

---- ---- ---- ---- ---- ---- ----
### 29/190 [`./test/index/commute/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_3.test)

#### ★ Assuming all 10,032 tests still passes as _sqlite_

Time: 0.591ms

---- ---- ---- ---- ---- ---- ----
### 30/190 [`./test/index/commute/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_4.test)

#### ★ Assuming all 10,030 tests still passes as _sqlite_

Time: 0.507ms

---- ---- ---- ---- ---- ---- ----
### 31/190 [`./test/index/commute/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col3 <= 88 OR col0 IN (SELECT col3 FROM tab0 WHERE col3 IS NULL AND col3 >= 88 AND col0 = 0 AND (col0 IS NULL) AND col3 <= 25 AND (col4 > 37.85) OR (col1 IN (SELECT col4 FROM tab0 WHERE (col4 IN (92.81,73.37,41.28,48.15,77.90)) OR (col0 > 11) AND col3 >= 77 AND col1 IN (89…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,032 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 42261.598ms

---- ---- ---- ---- ---- ---- ----
### 32/190 [`./test/index/commute/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col3 >= 22 AND col3 IS NULL OR (col0 <= 92 AND (col3 IN (82,73,69,28,90,98) OR ((col0 > 53))) AND col3 > 41) AND col1 < 7.43 AND ((col0 > 45)) AND col1 >= 86.98 OR col4 IN (98.61) AND col0 < 82 OR col3 IN (SELECT col0 FROM tab0 WHERE ((((col3 <= 2) OR col4 > 64.95 OR (col3…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,036 tests as _sqlite_

* 20 failed
* 99% was OK

Time: 54077.228ms

---- ---- ---- ---- ---- ---- ----
### 33/190 [`./test/index/commute/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col1 > 33.14 OR (((col3 > 73 OR (col3 IN (63,42)))) AND ((((col0 IN (SELECT col3 FROM tab0 WHERE (col3 < 37) AND col0 > 24 OR (col1 IN (SELECT col4 FROM tab0 WHERE col1 > 49.28) OR col3 > 9))) OR col3 > 51 OR (col1 > 52.62)))) OR col0 IS NULL) OR ((((col4 = 81.75) OR (col0…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,034 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 49686.498ms

---- ---- ---- ---- ---- ---- ----
### 34/190 [`./test/index/commute/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_8.test)

#### ★ Assuming all 10,032 tests still passes as _sqlite_

Time: 0.564ms

---- ---- ---- ---- ---- ---- ----
### 35/190 [`./test/index/commute/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col4 IN (SELECT col1 FROM tab0 WHERE ((col0 IN (SELECT col3 FROM tab0 WHERE col3 >= 39) AND col0 <= 84)))) AND col4 <= 14.38

Cannot read property '0' of undefined
```

#### ☓ Ran 10,034 tests as _sqlite_

* 20 failed
* 99% was OK

Time: 54926.741ms

---- ---- ---- ---- ---- ---- ----
### 36/190 [`./test/index/commute/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col4 < 749.14 AND (col3 >= 449 AND ((col3 = 703)) AND col0 > 373) AND (col3 < 160) AND col0 > 859 AND col1 BETWEEN 47.53 AND 235.98 AND col0 < 447 OR col3 <= 639 OR col1 IN (SELECT col4 FROM tab0 WHERE col4 > 401.5 AND ((col4 < 922.12 AND ((col0 > 154) AND (col1 IN (SELECT…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,122 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 52875.294ms

---- ---- ---- ---- ---- ---- ----
### 37/190 [`./test/index/commute/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_1.test)

#### ★ Assuming all 10,120 tests still passes as _sqlite_

Time: 0.585ms

---- ---- ---- ---- ---- ---- ----
### 38/190 [`./test/index/commute/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_2.test)

#### ★ Assuming all 10,123 tests still passes as _sqlite_

Time: 0.503ms

---- ---- ---- ---- ---- ---- ----
### 39/190 [`./test/index/commute/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col0 IN (SELECT col3 FROM tab0 WHERE ((((((((col3 < 927) OR col0 BETWEEN 727 AND 937 OR col0 = 89))))) AND col0 BETWEEN 817 AND 967) OR col3 IN (SELECT col0 FROM tab0 WHERE col0 < 797)))

Cannot read property '0' of undefined
```

#### ☓ Ran 10,121 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 49706.702ms

---- ---- ---- ---- ---- ---- ----
### 40/190 [`./test/index/commute/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col0 >= 640 OR ((col3 IN (SELECT col0 FROM tab0 WHERE (col3 IN (SELECT col0 FROM tab0 WHERE (col1 < 98.26)) OR (col3 < 181) AND col4 < 574.65) OR (col1 <= 733.28)) AND col0 > 357) AND (((col0 >= 686))) AND col3 = 476 AND col3 > 153 AND ((col0 < 909)) AND ((col0 > 631 AND (…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,124 tests as _sqlite_

* 30 failed
* 99% was OK

Time: 49337.578ms

---- ---- ---- ---- ---- ---- ----
### 41/190 [`./test/index/commute/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_5.test)

#### ★ Assuming all 10,121 tests still passes as _sqlite_

Time: 0.708ms

---- ---- ---- ---- ---- ---- ----
### 42/190 [`./test/index/commute/100/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col1 >= 775.92 OR (col3 < 898 AND (col4 IN (SELECT col1 FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE col4 < 552.87)) AND ((col0 <= 166)) AND col3 IS NULL AND col3 <= 883 OR col4 >= 1.64 AND (((col0 <= 832) OR (col3 <= 130))))) OR col1 > 641.85 AND (((col4 < 803.30)…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,122 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 48630.094ms

---- ---- ---- ---- ---- ---- ----
### 43/190 [`./test/index/commute/100/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_7.test)

#### ★ Assuming all 10,123 tests still passes as _sqlite_

Time: 0.671ms

---- ---- ---- ---- ---- ---- ----
### 44/190 [`./test/index/commute/100/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 = 783) AND col0 >= 334 OR ((col0 > 336 OR col1 < 601.60 AND ((((((col4 > 896.38)) AND col3 > 417)) OR (col4 > 98.79 AND (((col0 >= 184) AND (col4 > 480.55 OR col0 > 561 AND col0 >= 133 AND (col0 < 937))) OR col3 > 684 OR col3 > 499 AND col0 < 895)) AND ((col0 < 706))…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,122 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 46535.595ms

---- ---- ---- ---- ---- ---- ----
### 45/190 [`./test/index/commute/100/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_9.test)

#### ★ Assuming all 10,123 tests still passes as _sqlite_

Time: 0.926ms

---- ---- ---- ---- ---- ---- ----
### 46/190 [`./test/index/commute/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_0.test)

#### ★ Assuming all 4,741 tests still passes as _sqlite_

Time: 0.621ms

---- ---- ---- ---- ---- ---- ----
### 47/190 [`./test/index/commute/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((((col0 IN (SELECT col3 FROM tab0 WHERE col3 = 7862 OR (col0 > 7104) AND col3 IN (SELECT col0 FROM tab0 WHERE ((col4 < 3774.80))) OR col0 >= 4545 OR (col3 > 1867) AND col1 >= 3341.69 AND col1 <= 8546.42 AND col0 <= 6797 AND col0 = 9644 AND (col3 IN (8505,121,8833,5588,941…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,583 tests as _sqlite_

* 20 failed
* 99% was OK

Time: 210970.311ms

---- ---- ---- ---- ---- ---- ----
### 48/190 [`./test/index/commute/1000/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE col1 < 444.10)) AND col4 >= 7680.91)

Cannot read property '0' of undefined
```

#### ☓ Ran 11,021 tests as _sqlite_

* 10 failed
* 99% was OK

Time: 241341.138ms

---- ---- ---- ---- ---- ---- ----
### 49/190 [`./test/index/commute/1000/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_3.test)

#### ★ Assuming all 11,025 tests still passes as _sqlite_

Time: 0.636ms

---- ---- ---- ---- ---- ---- ----
### 50/190 [`./test/index/delete/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1/slt_good_0.test)

#### ★ Assuming all 10,907 tests still passes as _sqlite_

Time: 0.508ms

---- ---- ---- ---- ---- ---- ----
### 51/190 [`./test/index/delete/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_0.test)

#### ★ Assuming all 10,730 tests still passes as _sqlite_

Time: 0.561ms

---- ---- ---- ---- ---- ---- ----
### 52/190 [`./test/index/delete/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_1.test)

#### ★ Assuming all 10,774 tests still passes as _sqlite_

Time: 0.771ms

---- ---- ---- ---- ---- ---- ----
### 53/190 [`./test/index/delete/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_2.test)

#### ★ Assuming all 9,390 tests still passes as _sqlite_

Time: 0.683ms

---- ---- ---- ---- ---- ---- ----
### 54/190 [`./test/index/delete/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_3.test)

#### ★ Assuming all 10,065 tests still passes as _sqlite_

Time: 0.573ms

---- ---- ---- ---- ---- ---- ----
### 55/190 [`./test/index/delete/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_4.test)

#### ★ Assuming all 10,599 tests still passes as _sqlite_

Time: 0.532ms

---- ---- ---- ---- ---- ---- ----
### 56/190 [`./test/index/delete/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_5.test)

#### ★ Assuming all 10,353 tests still passes as _sqlite_

Time: 0.531ms

---- ---- ---- ---- ---- ---- ----
### 57/190 [`./test/index/delete/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_0.test)

#### ★ Assuming all 11,145 tests still passes as _sqlite_

Time: 0.526ms

---- ---- ---- ---- ---- ---- ----
### 58/190 [`./test/index/delete/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_1.test)

#### ★ Assuming all 10,895 tests still passes as _sqlite_

Time: 0.522ms

---- ---- ---- ---- ---- ---- ----
### 59/190 [`./test/index/delete/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_2.test)

#### ★ Assuming all 11,033 tests still passes as _sqlite_

Time: 0.531ms

---- ---- ---- ---- ---- ---- ----
### 60/190 [`./test/index/delete/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_3.test)

#### ★ Assuming all 10,942 tests still passes as _sqlite_

Time: 0.489ms

---- ---- ---- ---- ---- ---- ----
### 61/190 [`./test/index/delete/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1000/slt_good_0.test)

#### ★ Assuming all 11,924 tests still passes as _sqlite_

Time: 0.497ms

---- ---- ---- ---- ---- ---- ----
### 62/190 [`./test/index/delete/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1000/slt_good_1.test)

#### ★ Assuming all 11,838 tests still passes as _sqlite_

Time: 0.502ms

---- ---- ---- ---- ---- ---- ----
### 63/190 [`./test/index/delete/10000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10000/slt_good_0.test)

#### ★ Assuming all 20,347 tests still passes as _sqlite_

Time: 0.505ms

---- ---- ---- ---- ---- ---- ----
### 64/190 [`./test/index/in/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col3 > 31 OR col3 <= 49 AND (col0 IN (SELECT col3 FROM tab0 WHERE col3 IN (74,13,49,39,67) OR col4 >= 87.31 OR col1 <= 89.41 AND col0 > 12 AND (col3 < 4 OR col0 <= 52 OR col1 > 0.4 AND col3 > 5 AND col0 = 86 OR ((((col0 = 83 OR (((col0 IN (77) OR ((col1 > 51.39)) AND col3 …

Cannot read property '0' of undefined
```

#### ☓ Ran 10,035 tests as _sqlite_

* 30 failed
* 99% was OK

Time: 144440.940ms

---- ---- ---- ---- ---- ---- ----
### 65/190 [`./test/index/in/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((col0 IN (SELECT col3 FROM tab0 WHERE (col3 IN (SELECT col0 FROM tab0 WHERE col1 > 74.44))) AND ((col3 IN (73,90)) OR col4 > 54.25 OR (col0 IN (58,68,2) AND col0 = 51 OR col1 > 30.12)))) OR col3 < 34

Cannot read property '0' of undefined
```

#### ☓ Ran 10,036 tests as _sqlite_

* 30 failed
* 99% was OK

Time: 152115.194ms

---- ---- ---- ---- ---- ---- ----
### 66/190 [`./test/index/in/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_2.test)

#### ★ Assuming all 10,035 tests still passes as _sqlite_

Time: 2.670ms

---- ---- ---- ---- ---- ---- ----
### 67/190 [`./test/index/in/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_3.test)

#### ★ Assuming all 10,037 tests still passes as _sqlite_

Time: 0.496ms

---- ---- ---- ---- ---- ---- ----
### 68/190 [`./test/index/in/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col0 = 32 AND col0 > 66 AND ((col0 IS NULL)) OR (col4 <= 40.93) AND ((col3 <= 55)) OR ((col3 > 88)) OR ((col3 < 42) AND col0 < 32 OR (col3 > 72) AND col3 IN (99,86,86,87,87,11) AND (((col0 > 51)))) OR ((col4 < 3.44)) OR (col1 IN (92.43) OR ((col3 = 32))) AND (((col3 = 23))…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,038 tests as _sqlite_

* 30 failed
* 99% was OK

Time: 166027.555ms

---- ---- ---- ---- ---- ---- ----
### 69/190 [`./test/index/in/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col4 IN (SELECT col1 FROM tab0 WHERE ((col0 > 26)) AND ((((col0 IN (24,73,85,15,54,8))) AND col0 = 39 AND col3 <= 66 AND col4 < 93.31 OR (col0 IS NULL) AND ((((col1 IS NULL) OR col0 = 49) OR (col0 IS NULL AND ((col4 >= 38.72 OR col0 >= 43)) OR col0 IS NULL AND col4 >= 21.…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,038 tests as _sqlite_

* 15 failed
* 99% was OK

Time: 141128.858ms

---- ---- ---- ---- ---- ---- ----
### 70/190 [`./test/index/in/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE (((col4 IN (SELECT col1 FROM tab0 WHERE ((col0 >= 975))) OR col1 BETWEEN 323.0 AND 982.34 OR (((col0 IN (251,821,693,586,116) AND col0 IN (810,408) AND (col1 > 722.50 AND col4 < 359.60)))) AND col4 <= 244.64 AND col1 > 83.19) OR col0 IS…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,128 tests as _sqlite_

* 30 failed
* 99% was OK

Time: 140060.862ms

---- ---- ---- ---- ---- ---- ----
### 71/190 [`./test/index/in/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col4 > 945.15 AND col0 <= 745 AND (col3 < 668 OR col3 IN (SELECT col0 FROM tab0 WHERE (col3 = 227) AND (col3 = 758) AND col4 >= 234.80 OR (col0 IS NULL) OR (col0 IN (455,424,243,331,768)) AND col4 < 813.43 OR col0 > 392 OR col1 BETWEEN 990.61 AND 364.96 OR col0 <= 886 AND…

Cannot read property '1' of undefined
```

#### ☓ Ran 10,127 tests as _sqlite_

* 15 failed
* 99% was OK

Time: 158119.052ms

---- ---- ---- ---- ---- ---- ----
### 72/190 [`./test/index/in/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col1 >= 196.55 AND ((((col0 <= 274)) AND col0 > 676 OR (((col0 < 747 AND (col1 < 448.35)))) OR (col3 IN (SELECT col0 FROM tab0 WHERE col3 > 612) AND (col0 IN (84,102,155,846)) AND (col3 < 664)) OR col0 >= 909 OR (col0 = 936) AND (col4 >= 226.22))) AND col0 <= 835 OR col1 …

Cannot read property '1' of undefined
```

#### ☓ Ran 10,128 tests as _sqlite_

* 15 failed
* 99% was OK

Time: 141331.968ms

---- ---- ---- ---- ---- ---- ----
### 73/190 [`./test/index/in/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (((((((col0 <= 382))) AND col4 IN (SELECT col1 FROM tab0 WHERE (col0 <= 332 OR (((col1 < 576.83)) OR col1 <= 724.21 OR col0 BETWEEN 587 AND 730 OR (col3 > 794 AND col1 IN (SELECT col4 FROM tab0 WHERE col1 IN (0.79,673.92,13.18,990.13) AND col4 >= 532.39))))))))) AND (((col…

Cannot read property '0' of undefined
```

#### ☓ Ran 10,126 tests as _sqlite_

* 15 failed
* 99% was OK

Time: 137484.701ms

---- ---- ---- ---- ---- ---- ----
### 74/190 [`./test/index/in/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 > 793) AND col3 < 242 AND (((((col0 IS NULL AND col3 < 254)) AND ((col0 >= 221) OR col3 < 269 AND (col3 IS NULL) AND (((col3 = 922) AND col0 <= 264 AND (col0 <= 157) AND col0 > 495) AND (col3 < 188)) AND ((col4 = 842.46) OR col3 >= 851 OR col4 IN (SELECT col1 FROM ta…

Cannot read property '1' of undefined
```

#### ☓ Ran 10,127 tests as _sqlite_

* 15 failed
* 99% was OK

Time: 148817.868ms

---- ---- ---- ---- ---- ---- ----
### 75/190 [`./test/index/in/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/1000/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (((col4 >= 6897.58 AND col0 IN (7530,4312)) AND col1 <= 494.83 AND (col3 > 7877 OR col0 > 8556) OR (col3 IN (SELECT col0 FROM tab0 WHERE ((((col1 >= 3878.9)) AND col0 <= 9103 OR col3 = 6252 OR col3 > 30 AND (col0 < 8923 AND col4 = 8696.1 AND col3 IS NULL) AND (col0 <= 9125…

Cannot read property '0' of undefined
```

#### ☓ Ran 11,028 tests as _sqlite_

* 60 failed
* 99% was OK

Time: 590981.883ms

---- ---- ---- ---- ---- ---- ----
### 76/190 [`./test/index/in/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/1000/slt_good_1.test)

#### ★ Assuming all 11,024 tests still passes as _sqlite_

Time: 0.442ms

---- ---- ---- ---- ---- ---- ----
### 77/190 [`./test/index/orderby/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_0.test)

#### ★ Assuming all 10,053 tests still passes as _sqlite_

Time: 0.376ms

---- ---- ---- ---- ---- ---- ----
### 78/190 [`./test/index/orderby/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_1.test)

#### ★ Assuming all 10,054 tests still passes as _sqlite_

Time: 0.472ms

---- ---- ---- ---- ---- ---- ----
### 79/190 [`./test/index/orderby/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_2.test)

#### ★ Assuming all 10,051 tests still passes as _sqlite_

Time: 0.475ms

---- ---- ---- ---- ---- ---- ----
### 80/190 [`./test/index/orderby/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_3.test)

#### ★ Assuming all 10,051 tests still passes as _sqlite_

Time: 0.475ms

---- ---- ---- ---- ---- ---- ----
### 81/190 [`./test/index/orderby/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_4.test)

#### ★ Assuming all 10,052 tests still passes as _sqlite_

Time: 0.483ms

---- ---- ---- ---- ---- ---- ----
### 82/190 [`./test/index/orderby/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_5.test)

#### ★ Assuming all 10,051 tests still passes as _sqlite_

Time: 0.483ms

---- ---- ---- ---- ---- ---- ----
### 83/190 [`./test/index/orderby/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_6.test)

#### ★ Assuming all 10,048 tests still passes as _sqlite_

Time: 0.494ms

---- ---- ---- ---- ---- ---- ----
### 84/190 [`./test/index/orderby/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_7.test)

#### ★ Assuming all 10,052 tests still passes as _sqlite_

Time: 0.542ms

---- ---- ---- ---- ---- ---- ----
### 85/190 [`./test/index/orderby/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_8.test)

#### ★ Assuming all 10,051 tests still passes as _sqlite_

Time: 0.490ms

---- ---- ---- ---- ---- ---- ----
### 86/190 [`./test/index/orderby/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_9.test)

#### ★ Assuming all 10,050 tests still passes as _sqlite_

Time: 0.551ms

---- ---- ---- ---- ---- ---- ----
### 87/190 [`./test/index/orderby/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_0.test)

#### ★ Assuming all 10,141 tests still passes as _sqlite_

Time: 0.526ms

---- ---- ---- ---- ---- ---- ----
### 88/190 [`./test/index/orderby/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_1.test)

#### ★ Assuming all 10,140 tests still passes as _sqlite_

Time: 3.485ms

---- ---- ---- ---- ---- ---- ----
### 89/190 [`./test/index/orderby/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_2.test)

#### ★ Assuming all 10,142 tests still passes as _sqlite_

Time: 0.509ms

---- ---- ---- ---- ---- ---- ----
### 90/190 [`./test/index/orderby/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((col1 IN (SELECT col4 FROM tab0 WHERE (col3 IN (SELECT col0 FROM tab0 WHERE col1 > 474.87)) AND col3 > 159))) ORDER BY 1 DESC

Cannot read property '0' of undefined
```

#### ☓ Ran 10,140 tests as _sqlite_

* 60 failed
* 99% was OK

Time: 58860.415ms

---- ---- ---- ---- ---- ---- ----
### 91/190 [`./test/index/orderby/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/1000/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((((col1 <= 7103.46 AND col0 > 2211 AND col0 > 4703 AND col3 <= 2105 AND col4 > 1731.51 OR (col0 > 3287) AND col3 <= 5111 AND col4 >= 8249.41 AND ((col3 <= 6788) AND ((col4 IS NULL) OR col0 >= 4782 OR col0 IN (SELECT col3 FROM tab0 WHERE col1 IN (SELECT col4 FROM tab0 WHER…

Cannot read property '0' of undefined
```

#### ☓ Ran 11,043 tests as _sqlite_

* 60 failed
* 99% was OK

Time: 395240.137ms

---- ---- ---- ---- ---- ---- ----
### 92/190 [`./test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_0.test)

#### ★ Assuming all 10,053 tests still passes as _sqlite_

Time: 0.745ms

---- ---- ---- ---- ---- ---- ----
### 93/190 [`./test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_1.test)

#### ★ Assuming all 10,051 tests still passes as _sqlite_

Time: 0.645ms

---- ---- ---- ---- ---- ---- ----
### 94/190 [`./test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_2.test)

#### ★ Assuming all 10,052 tests still passes as _sqlite_

Time: 0.623ms

---- ---- ---- ---- ---- ---- ----
### 95/190 [`./test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_3.test)

#### ★ Assuming all 10,051 tests still passes as _sqlite_

Time: 0.675ms

---- ---- ---- ---- ---- ---- ----
### 96/190 [`./test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_4.test)

#### ★ Assuming all 10,053 tests still passes as _sqlite_

Time: 0.668ms

---- ---- ---- ---- ---- ---- ----
### 97/190 [`./test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_5.test)

#### ★ Assuming all 10,052 tests still passes as _sqlite_

Time: 0.653ms

---- ---- ---- ---- ---- ---- ----
### 98/190 [`./test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_6.test)

#### ★ Assuming all 10,053 tests still passes as _sqlite_

Time: 0.681ms

---- ---- ---- ---- ---- ---- ----
### 99/190 [`./test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_7.test)

#### ★ Assuming all 10,052 tests still passes as _sqlite_

Time: 0.675ms

---- ---- ---- ---- ---- ---- ----
### 100/190 [`./test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_8.test)

#### ★ Assuming all 10,054 tests still passes as _sqlite_

Time: 0.658ms

---- ---- ---- ---- ---- ---- ----
### 101/190 [`./test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_9.test)

#### ★ Assuming all 10,055 tests still passes as _sqlite_

Time: 0.653ms

---- ---- ---- ---- ---- ---- ----
### 102/190 [`./test/index/orderby_nosort/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_0.test)

#### ★ Assuming all 10,149 tests still passes as _sqlite_

Time: 0.665ms

---- ---- ---- ---- ---- ---- ----
### 103/190 [`./test/index/orderby_nosort/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_1.test)

#### ★ Assuming all 10,141 tests still passes as _sqlite_

Time: 0.685ms

---- ---- ---- ---- ---- ---- ----
### 104/190 [`./test/index/orderby_nosort/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_2.test)

#### ★ Assuming all 10,142 tests still passes as _sqlite_

Time: 0.617ms

---- ---- ---- ---- ---- ---- ----
### 105/190 [`./test/index/orderby_nosort/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_3.test)

#### ★ Assuming all 10,143 tests still passes as _sqlite_

Time: 0.618ms

---- ---- ---- ---- ---- ---- ----
### 106/190 [`./test/index/orderby_nosort/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_4.test)

#### ★ Assuming all 10,141 tests still passes as _sqlite_

Time: 0.674ms

---- ---- ---- ---- ---- ---- ----
### 107/190 [`./test/index/orderby_nosort/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_5.test)

#### ★ Assuming all 10,142 tests still passes as _sqlite_

Time: 5.408ms

---- ---- ---- ---- ---- ---- ----
### 108/190 [`./test/index/orderby_nosort/100/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_6.test)

#### ★ Assuming all 10,144 tests still passes as _sqlite_

Time: 0.669ms

---- ---- ---- ---- ---- ---- ----
### 109/190 [`./test/index/orderby_nosort/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/1000/slt_good_0.test)

#### ★ Assuming all 11,040 tests still passes as _sqlite_

Time: 0.602ms

---- ---- ---- ---- ---- ---- ----
### 110/190 [`./test/index/orderby_nosort/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/1000/slt_good_1.test)

#### ★ Assuming all 11,043 tests still passes as _sqlite_

Time: 0.659ms

---- ---- ---- ---- ---- ---- ----
### 111/190 [`./test/index/random/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT + col2 FROM tab0 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + + ( - - COUNT ( * ) ) FROM tab0 cor0 WHERE NULL <> col1

Expected: ["0"] but got ["10"]
```


```sql
SELECT + col0 AS col0 FROM tab0 WHERE NOT + col0 IN ( - 67 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL AVG ( ALL col3 ) FROM tab0 WHERE ( NULL ) NOT IN ( - 87 * + 98 )

Expected: ["NULL"] but got ["411.800"]
```


```sql
SELECT * FROM tab0 WHERE - - CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT DISTINCT 62 - - + CAST ( COUNT ( ALL col1 ) AS INTEGER ) FROM tab0 cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT col2 AS col4 FROM tab0 WHERE - col1 > - 75

Expected: ["0"] but got ["ijika"]
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - 49 + + MIN ( - col0 ) FROM tab0 WHERE NOT ( NOT + 99 NOT BETWEEN ( - + ( + col1 ) ) AND - col4 * - 99 * - col3 )

Expected: ["-953"] but got ["NULL"]
```

#### ☓ Ran 10,032 tests as _sqlite_

* 790 failed
* 92% was OK

Time: 25958.462ms

---- ---- ---- ---- ---- ---- ----
### 112/190 [`./test/index/random/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT col2 col5 FROM tab0 WHERE NOT + col1 * col0 - - 45 = + 75

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - 42 AS col2 FROM tab0 cor0 WHERE NOT CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) col1, + COUNT ( * ) * + 7 col2 FROM tab0 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","70"] but got ["0","70"]
```


```sql
SELECT 11 AS col0 FROM tab0 AS cor0 WHERE ( + 22 ) = ( CAST ( + col0 AS REAL ) )

Wrong conversion type
```


```sql
SELECT ( 92 ) AS col5, COUNT ( * ) FROM tab0 AS cor0 WHERE NOT ( - col3 ) > ( NULL )

Expected: ["92","0"] but got ["92","10"]
```


```sql
SELECT ALL CAST ( SUM ( ALL + col3 ) AS INTEGER ) FROM tab0 WHERE + - 4 > - col1

g is not defined
```


```sql
SELECT ALL + col2 FROM tab0 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```


```sql
SELECT - 43 * MAX ( ALL - 96 * + col3 ) FROM tab0 WHERE NOT ( - col1 ) IN ( + ( 36 ) )

Expected: ["445824"] but got ["NULL"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 730 failed
* 92% was OK

Time: 23774.490ms

---- ---- ---- ---- ---- ---- ----
### 113/190 [`./test/index/random/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT ALL - COUNT ( * ) FROM tab0 WHERE NOT CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT - col3 col3 FROM tab0 WHERE NOT - CAST ( - + col3 AS INTEGER ) BETWEEN NULL AND col1

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + COUNT ( * ) * 11 AS col3 FROM tab0 AS cor0 WHERE NOT NULL > NULL

Expected: ["0"] but got ["110"]
```


```sql
SELECT ALL col5 FROM tab0 AS cor0 WHERE NOT col1 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col2 FROM tab0 WHERE NULL IS NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + 31 + - MIN ( - 42 ) FROM tab0 cor0 WHERE NOT - col3 * + col3 * + + col0 + + col4 BETWEEN col1 AND NULL

Expected: ["73"] but got ["NULL"]
```


```sql
SELECT col5 FROM tab0 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT + CAST ( - SUM ( - col3 ) AS INTEGER ) col3 FROM tab0 WHERE + ( col3 ) NOT IN ( - 44 + col1 * + + col4, 39 )

g is not defined
```


```sql
SELECT - 45 FROM tab0 AS cor0 WHERE NOT + col1 * 41 / + + 82 BETWEEN - col3 AND ( - + ( - 64 ) )

10 results returned but expected 9
```

#### ☓ Ran 10,034 tests as _sqlite_

* 910 failed
* 90% was OK

Time: 30782.601ms

---- ---- ---- ---- ---- ---- ----
### 114/190 [`./test/index/random/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT ALL col5 FROM tab0 AS cor0 WHERE + col4 * + col4 * + 24 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - COUNT ( * ) * 9 FROM tab0 WHERE NOT NULL <= ( + col1 )

Expected: ["0"] but got ["-90"]
```


```sql
SELECT + col3 AS col0 FROM tab0 AS cor0 WHERE NOT - CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT ALL CAST ( + COUNT ( * ) AS INTEGER ) FROM tab0 AS cor0 WHERE NOT 25 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + col2 AS col1 FROM tab0 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT DISTINCT CAST ( - COUNT ( * ) AS INTEGER ) + - 63 AS col0 FROM tab0 WHERE NULL NOT IN ( 71 )

g is not defined
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) col1 FROM tab0 AS cor0 WHERE NOT - 89 IS NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT col5 col1 FROM tab0 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```


```sql
SELECT DISTINCT 83 * - 92 + CAST ( - CAST ( NULL AS INTEGER ) AS INTEGER ) AS col3, - CAST ( NULL AS INTEGER ) / col4 * + 52 AS col5 FROM tab0 AS cor0 WHERE col3 <= 81

Expected: ["NULL","NULL"] but got ["-7636","0"]
```


```sql
SELECT - MIN ( DISTINCT col0 ) + 54 FROM tab0 WHERE NOT ( col1 + + col3 * + col0 ) IN ( col0 )

Expected: ["-130"] but got ["NULL"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 680 failed
* 93% was OK

Time: 34027.421ms

---- ---- ---- ---- ---- ---- ----
### 115/190 [`./test/index/random/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT ALL + col5 FROM tab0 AS cor0 WHERE ( NULL ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT CAST ( NULL AS INTEGER ), ( + COUNT ( * ) ) FROM tab0 WHERE NOT + 26 IS NULL

Expected: ["NULL","10"] but got ["0","10"]
```


```sql
SELECT DISTINCT COUNT ( * ) FROM tab0 WHERE NOT ( - 12 ) <= NULL

Expected: ["0"] but got ["10"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT - col3 - ( - ( - col1 ) ) NOT IN ( - 78 + - 95 * CAST ( NULL AS REAL ) )

Wrong conversion type
```


```sql
SELECT ALL CAST ( - COUNT ( * ) AS INTEGER ) AS col4 FROM tab0 cor0 WHERE col0 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( ( COUNT ( * ) ) AS INTEGER ) AS col1 FROM tab0 WHERE ( NOT col0 NOT BETWEEN + col4 AND + + col1 )

g is not defined
```


```sql
SELECT DISTINCT + MAX ( + col3 ) FROM tab0 AS cor0 WHERE NOT col1 NOT BETWEEN - + col3 + col3 AND + col0

Expected: ["922"] but got ["NULL"]
```

#### ☓ Ran 10,033 tests as _sqlite_

* 735 failed
* 92% was OK

Time: 30780.078ms

---- ---- ---- ---- ---- ---- ----
### 116/190 [`./test/index/random/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT + col2 AS col5 FROM tab0 WHERE NOT ( col0 ) * - - col4 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - 81 FROM tab0 WHERE NOT col0 IN ( - 9 + + 10 * - + 68, col4 )

Query was expected to return results (but did not) 
```


```sql
SELECT ( - CAST ( NULL AS INTEGER ) ) - - COUNT ( * ) FROM tab0 AS cor0 WHERE NULL < NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT NULL NOT BETWEEN ( 72 + - + col4 + col3 ) AND - ( CAST ( NULL AS REAL ) )

Wrong conversion type
```


```sql
SELECT + - COUNT ( * ) AS col4 FROM tab0 AS cor0 WHERE 64 / col0 NOT BETWEEN - col1 AND + + CAST ( NULL AS INTEGER )

Expected: ["0"] but got ["-10"]
```


```sql
SELECT + col2 col5 FROM tab0 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 735 failed
* 92% was OK

Time: 26956.169ms

---- ---- ---- ---- ---- ---- ----
### 117/190 [`./test/index/random/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT SUM ( DISTINCT + + 90 ) AS col3 FROM tab0 AS cor0 WHERE NULL IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + col3 - col3 col5 FROM tab0 WHERE NOT CAST ( NULL AS REAL ) IS NULL

Wrong conversion type
```


```sql
SELECT ALL col2 AS col2 FROM tab0 WHERE 80 * 48 - - 91 > - col4

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT 36 / COUNT ( * ) FROM tab0 WHERE NOT NULL IS NOT NULL

Expected: ["3"] but got ["3.600"]
```


```sql
SELECT ALL ( - col0 ) - 31 - - 80 FROM tab0 AS cor0 WHERE NOT col4 / 6 IN ( + col1 / - + col0 * - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT + CAST ( COUNT ( * ) AS INTEGER ) FROM tab0 WHERE NOT ( col4 ) <= NULL

g is not defined
```


```sql
SELECT + col2 FROM tab0 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT col2 FROM tab0 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```

#### ☓ Ran 10,034 tests as _sqlite_

* 780 failed
* 92% was OK

Time: 32424.967ms

---- ---- ---- ---- ---- ---- ----
### 118/190 [`./test/index/random/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) FROM tab0 AS cor0 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col2 AS col0 FROM tab0 AS cor0 WHERE ( ( CAST ( NULL AS INTEGER ) ) ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - MIN ( ALL + + 73 ) AS col4 FROM tab0 cor0 WHERE NOT 35 >= NULL

Expected: ["NULL"] but got ["-73"]
```


```sql
SELECT + COUNT ( * ) col3 FROM tab0 AS cor0 WHERE col4 * + col1 <> NULL

Expected: ["0"] but got ["10"]
```


```sql
SELECT DISTINCT - COUNT ( * ) / + CAST ( NULL AS REAL ) AS col5 FROM tab0 WHERE NOT col0 + CAST ( col3 AS INTEGER ) <> 62 * - ( col1 * - col4 )

Wrong conversion type
```


```sql
SELECT DISTINCT + - MAX ( DISTINCT + col3 ) AS col2, + ( + COUNT ( * ) ) + + 71 FROM tab0 WHERE NOT + 13 * CAST ( NULL AS INTEGER ) IS NOT NULL

Expected: ["-972","81"] but got ["NULL","71"]
```


```sql
SELECT ALL col2 AS col5 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```

#### ☓ Ran 10,031 tests as _sqlite_

* 675 failed
* 93% was OK

Time: 44008.973ms

---- ---- ---- ---- ---- ---- ----
### 119/190 [`./test/index/random/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0 AS cor0 WHERE NOT CAST ( NULL AS REAL ) IS NOT NULL AND 57 + col3 + + col0 * + 36 * col4 > NULL

Wrong conversion type
```


```sql
SELECT SUM ( col3 ) AS col4 FROM tab0 WHERE NOT - 85 + ( + CAST ( NULL AS INTEGER ) ) NOT IN ( col3 * 49 )

Expected: ["NULL"] but got ["5614"]
```


```sql
SELECT ALL COUNT ( * ) AS col4 FROM tab0 WHERE NOT ( + - col1 ) BETWEEN col3 * + col0 + - - col3 AND ( - + col4 + + + col0 )

Expected: ["10"] but got ["0"]
```


```sql
SELECT col5 FROM tab0 AS cor0 WHERE NOT ( col0 - col4 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col5 AS col5 FROM tab0 AS cor0 WHERE + col4 NOT BETWEEN NULL AND + col3

Expected: ["0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","swsmt","texha","ttvlt","vzeio","ylxxs","zwzyz"]
```


```sql
SELECT + - CAST ( COUNT ( * ) AS INTEGER ) FROM tab0 AS cor0 WHERE NOT 75 * - 78 * + - ( ( - + 46 ) ) IS NULL

g is not defined
```


```sql
SELECT - col0 col3 FROM tab0 WHERE NOT - col3 IN ( + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT - MAX ( ALL + + 78 ) FROM tab0 AS cor0 WHERE NOT + 18 BETWEEN col1 + - ( col1 ) + + ( col1 ) * - - col1 AND 17 * + col0

Expected: ["-78"] but got ["NULL"]
```


```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```

#### ☓ Ran 10,032 tests as _sqlite_

* 745 failed
* 92% was OK

Time: 30956.048ms

---- ---- ---- ---- ---- ---- ----
### 120/190 [`./test/index/random/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + + 86 + - col3 AS col0 FROM tab0 cor0 WHERE NOT + 70 * - - 75 - - 75 BETWEEN - col3 + - col4 AND + + col3 * - + col3

Query was expected to return results (but did not) 
```


```sql
SELECT col2 col3 FROM tab0 AS cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 66 FROM tab0 AS cor0 WHERE NOT NULL NOT IN ( CAST ( NULL AS REAL ) * - 13, 98 )

Wrong conversion type
```


```sql
SELECT COUNT ( * ) * - CAST ( NULL AS INTEGER ) + - 76 AS col3 FROM tab0 AS cor0 WHERE NOT - ( col0 ) + - col0 IS NOT NULL

Expected: ["NULL"] but got ["-76"]
```


```sql
SELECT ALL 55 / ( COUNT ( * ) ) FROM tab0 cor0 WHERE col5 IS NOT NULL

Expected: ["5"] but got ["5.500"]
```


```sql
SELECT - + CAST ( - SUM ( DISTINCT - - CAST ( + 91 AS INTEGER ) ) AS INTEGER ), - 51 AS col0 FROM tab0 WHERE NOT NULL <= 60

g is not defined
```


```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```

#### ☓ Ran 10,031 tests as _sqlite_

* 740 failed
* 92% was OK

Time: 26967.472ms

---- ---- ---- ---- ---- ---- ----
### 121/190 [`./test/index/random/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/100/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL + 52 / + 95 FROM tab0 WHERE + col4 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - + COUNT ( * ) AS col3 FROM tab0 AS cor0 WHERE ( NULL ) NOT IN ( + + col4, col0 + col3 * - 24 )

Expected: ["0"] but got ["-100"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE col4 * + col1 + - col3 + - 64 + - col4 BETWEEN col1 + + - CAST ( + - col4 AS REAL ) AND - - CAST ( NULL AS INTEGER )

Wrong conversion type
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col3 FROM tab0 AS cor0 WHERE NOT - col3 IN ( + - 29 * 82 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - + COUNT ( * ) * + + 51 AS col2, - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NULL <> - col0

Expected: ["0","NULL"] but got ["-5100","0"]
```


```sql
SELECT ALL + CAST ( COUNT ( ALL col0 ) AS INTEGER ) col3 FROM tab0 WHERE NULL IS NULL

g is not defined
```


```sql
SELECT col2 AS col0 FROM tab0 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```


```sql
SELECT col0 * + - 7 FROM tab0 WHERE CAST ( col0 AS INTEGER ) NOT BETWEEN NULL AND + col3

100 results returned but expected 55
```

#### ☓ Ran 10,123 tests as _sqlite_

* 715 failed
* 92% was OK

Time: 34562.483ms

---- ---- ---- ---- ---- ---- ----
### 122/190 [`./test/index/random/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT + col5 AS col1 FROM tab0 AS cor0 WHERE ( - 0 ) BETWEEN 6 * - col4 AND ( + col0 * - - col1 - 48 )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + + 77 AS col2, - COUNT ( * ) FROM tab0 cor0 WHERE NOT NULL NOT BETWEEN col4 AND NULL

Expected: ["77","0"] but got ["77","-100"]
```


```sql
SELECT + 92 * + - 75 FROM tab0 AS cor0 WHERE NOT + ( + - col0 ) IN ( - + ( + + 81 ) + + col3 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab0 WHERE + + CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT DISTINCT + - MAX ( DISTINCT + col3 ) AS col2, + ( + COUNT ( * ) ) + + 71 FROM tab0 WHERE NOT + 13 * CAST ( NULL AS INTEGER ) IS NOT NULL

Expected: ["-9951","171"] but got ["NULL","71"]
```


```sql
SELECT - COUNT ( * ) * AVG ( DISTINCT + col3 ) AS col3 FROM tab0 WHERE NOT NULL <= + + col3

Expected: ["NULL"] but got ["-531399"]
```


```sql
SELECT col5 col5 FROM tab0 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```


```sql
SELECT + col5 AS col5 FROM tab0 AS cor0 WHERE + col4 NOT BETWEEN NULL AND + col3

100 results returned but expected 42
```


```sql
SELECT + - CAST ( COUNT ( * ) AS INTEGER ) FROM tab0 AS cor0 WHERE NOT 75 * - 78 * + - ( ( - + 46 ) ) IS NULL

g is not defined
```

#### ☓ Ran 10,123 tests as _sqlite_

* 655 failed
* 93% was OK

Time: 41092.423ms

---- ---- ---- ---- ---- ---- ----
### 123/190 [`./test/index/random/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0 AS cor0 WHERE col4 * + col1 + - col3 + - 64 + - col4 BETWEEN col1 + + - CAST ( + - col4 AS REAL ) AND - - CAST ( NULL AS INTEGER )

Wrong conversion type
```


```sql
SELECT ALL - col0 * - CAST ( NULL AS INTEGER ) AS col5 FROM tab0 WHERE - 72 NOT BETWEEN 37 AND NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - COUNT ( * ) AS col1 FROM tab0 WHERE NOT NULL > col4

Expected: ["0"] but got ["-1000"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col3 FROM tab0 AS cor0 WHERE NOT - col3 IN ( + - 29 * 82 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - + COUNT ( * ) * + + 51 AS col2, - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NULL <> - col0

Expected: ["0","NULL"] but got ["-51000","0"]
```

#### ☓ Ran 2,067 tests as _sqlite_

* 70 failed
* 96% was OK

Time: 17277.403ms

---- ---- ---- ---- ---- ---- ----
### 124/190 [`./test/index/random/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0 AS cor0 WHERE ( NOT NULL <> + col4 / CAST ( - col0 AS REAL ) )

Wrong conversion type
```

#### ☓ Ran 1,056 tests as _sqlite_

* 5 failed
* 99% was OK

Time: 2634.214ms

---- ---- ---- ---- ---- ---- ----
### 125/190 [`./test/index/random/1000/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_2.test)

#### ★ Assuming all 1,027 tests still passes as _sqlite_

Time: 0.415ms

---- ---- ---- ---- ---- ---- ----
### 126/190 [`./test/index/random/1000/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_3.test)

#### ★ Assuming all 1,033 tests still passes as _sqlite_

Time: 0.499ms

---- ---- ---- ---- ---- ---- ----
### 127/190 [`./test/index/random/1000/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0 cor0 WHERE NOT ( NOT ( - CAST ( NULL AS REAL ) + + col0 NOT IN ( - - col0 * - col3 ) ) )

Wrong conversion type
```

#### ☓ Ran 1,032 tests as _sqlite_

* 5 failed
* 99% was OK

Time: 2253.505ms

---- ---- ---- ---- ---- ---- ----
### 128/190 [`./test/index/random/1000/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT + COUNT ( * ) AS col5 FROM tab0 WHERE NOT - ( 3 ) + col4 NOT BETWEEN NULL AND col0

Expected: ["0"] but got ["1000"]
```


```sql
SELECT ALL 72 FROM tab0 WHERE + - col1 * - - ( - col0 ) / + col4 - + col3 + + col0 + + 62 * CAST ( NULL AS INTEGER ) * col0 * - col4 + + 91 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL col2 FROM tab0 AS cor0 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * + + 42 * - col4 AS col3 FROM tab0 cor0 WHERE NOT NULL IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT 15 FROM tab0 cor0 WHERE ( 92 ) <= col0 / + + CAST ( NULL AS REAL ) + 77

Wrong conversion type
```


```sql
SELECT ALL + CAST ( COUNT ( ALL col0 ) AS INTEGER ) col3 FROM tab0 WHERE NULL IS NULL

g is not defined
```

#### ☓ Ran 4,333 tests as _sqlite_

* 265 failed
* 93% was OK

Time: 31491.780ms

---- ---- ---- ---- ---- ---- ----
### 129/190 [`./test/index/random/1000/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col1 - 9 * + ( + + CAST ( NULL AS INTEGER ) ) * - 41 * + + 35 FROM tab0 WHERE NOT - 70 IS NULL

Expected: ["NULL"] but got ["1001.490","101.350","1023.170","1029.400","1040.530","1041.320","105.910","1052.610","1055.210","1061.720","1077.130","1088.150","1134.630","1136.530","1141.510","1142.310","1145.470","1184.360","1189.950","119.510","1195.480","1196.280","1202.190","121.600","1210.330",…
```


```sql
SELECT ALL - 42 + + col0 AS col1, 66 AS col0 FROM tab0 AS cor0 WHERE NOT CAST ( 78 AS INTEGER ) * 42 * + 24 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + + col2 FROM tab0 WHERE col0 <= + + col4 * - + CAST ( NULL AS REAL ) + + 67

Wrong conversion type
```


```sql
SELECT + 89 FROM tab0 WHERE + - col0 NOT BETWEEN + + 45 + - + col4 AND NULL

1000 results returned but expected 491
```


```sql
SELECT - MIN ( + col4 ) AS col3 FROM tab0 AS cor0 WHERE ( NULL ) IS NULL

Expected: ["-61"] but got ["-61.500"]
```


```sql
SELECT - 74 * 61 FROM tab0 AS cor0 WHERE NOT 1 IN ( 78 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL * FROM tab0 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```

#### ☓ Ran 11,021 tests as _sqlite_

* 725 failed
* 93% was OK

Time: 92801.739ms

---- ---- ---- ---- ---- ---- ----
### 130/190 [`./test/index/random/1000/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT MAX ( col4 ) FROM tab0 AS cor0 WHERE NOT NULL <> NULL

Expected: ["NULL"] but got ["9994.100"]
```


```sql
SELECT ALL + ( - - CAST ( - + COUNT ( * ) AS INTEGER ) ) AS col5 FROM tab0 WHERE NOT NULL IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab0 WHERE + + CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT + col5 FROM tab0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - COUNT ( 41 ) FROM tab0 AS cor0 WHERE NULL NOT BETWEEN + 41 AND - 82

Expected: ["0"] but got ["-1000"]
```


```sql
SELECT 36 FROM tab0 WHERE - col3 + col0 NOT BETWEEN NULL AND ( + - col0 )

1000 results returned but expected 762
```


```sql
SELECT DISTINCT + 42 / + COUNT ( ALL + col1 ) AS col1 FROM tab0 AS cor0 WHERE NOT CAST ( NULL AS INTEGER ) IS NOT NULL

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT ALL col2 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```

#### ☓ Ran 11,022 tests as _sqlite_

* 780 failed
* 92% was OK

Time: 94189.728ms

---- ---- ---- ---- ---- ---- ----
### 131/190 [`./test/index/random/1000/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 / - - col3 + + - col0 FROM tab0 AS cor0 WHERE NOT NULL IS NOT NULL

1000 results returned but expected 967
```


```sql
SELECT ALL ( + + col0 ) FROM tab0 AS cor0 WHERE NOT col4 IN ( + - col1 * - + 58, + col4 * - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT + ( - MAX ( - 10 ) ) * + + 59 AS col3 FROM tab0 AS cor0 WHERE NOT NULL < ( NULL )

Expected: ["NULL"] but got ["590"]
```


```sql
SELECT col3 AS col1 FROM tab0 WHERE NOT 2 * + col0 + + CAST ( NULL AS REAL ) + - 93 >= + 40

Wrong conversion type
```


```sql
SELECT DISTINCT - - COUNT ( * ) FROM tab0 AS cor0 WHERE NOT NULL <= col4 * + + col3 + + - col0 + - + col4

Expected: ["0"] but got ["1000"]
```


```sql
SELECT ALL + CAST ( col3 AS INTEGER ) * col3 + - ( + col0 ) / - col3 AS col2 FROM tab0 WHERE ( NULL ) IS NULL

Correct amount of values returned but hash was different than expected.
```

#### ☓ Ran 4,841 tests as _sqlite_

* 310 failed
* 93% was OK

Time: 34256.400ms

---- ---- ---- ---- ---- ---- ----
### 132/190 [`./test/index/view/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_0.test)

_Mimic sqlite_
Time: 5.718ms

---- ---- ---- ---- ---- ---- ----
### 133/190 [`./test/index/view/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_2_tab0_153

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_154 UNION SELECT pk, col0 FROM view_2_tab0_154

10 results returned but expected 20
```


```sql
SELECT * FROM view_3_tab0_154

Expected: ["1","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_155

Expected: ["6","0"] but got ["NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_157 AS SELECT pk, col0 FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE ((col0 IS NULL) OR col3 > 5 OR col3 <= 50 OR col1 < 83.11))) OR col0 > 75

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8,137 tests as _sqlite_

* 7,698 skipped
* 91 failed
* 4% was OK

Time: 3651.216ms

---- ---- ---- ---- ---- ---- ----
### 134/190 [`./test/index/view/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab0_302

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_2_tab0_302

Expected: ["4","11","7","70"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_302 UNION SELECT pk, col0 FROM view_2_tab0_302

4 results returned but expected 20
```


```sql
SELECT * FROM view_3_tab0_302

Expected: ["0","1","2","3","5","6","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
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
SELECT pk, col0 FROM view_2_tab0_306

Expected: ["4","11"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_308

Expected: ["2","3","5","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_322

Expected: ["6"] but got ["NULL"]
```


```sql
CREATE VIEW view_1_tab0_367 AS SELECT pk, col0 FROM tab0 WHERE col3 IS NULL OR (((col0 < 64 AND (col0 BETWEEN 25 AND 41) AND (col4 >= 33.34) OR (col4 < 22.72 AND (col0 >= 61)) AND (col0 > 4) OR col0 >= 0 OR col0 >= 45 AND col3 IN (SELECT col0 FROM tab0 WHERE col3 > 42) AND col3 IS NULL AND col3 <= …

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,465 tests as _sqlite_

* 1,028 skipped
* 1,361 failed
* 67% was OK

Time: 20921.613ms

---- ---- ---- ---- ---- ---- ----
### 135/190 [`./test/index/view/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab0_376

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_376 UNION SELECT pk, col0 FROM view_2_tab0_376

2 results returned but expected 20
```


```sql
SELECT pk, col0 FROM view_1_tab0_377

Expected: ["1","72","5","85","8","94","9","95"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_377

Expected: ["1","5","8","9"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_378

Expected: ["2","52"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_378

Expected: ["2"] but got ["NULL"]
```


```sql
SELECT * FROM view_3_tab0_385

Expected: ["0","2","3","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_387

Expected: ["0","60","1","72","9","95"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_387

Expected: ["2","3","4","5","6","7","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_405

Expected: ["2","6","7"] but got ["NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_408 AS SELECT pk, col0 FROM tab0 WHERE col3 IS NULL AND (((((col1 < 63.79))) OR col0 >= 35 AND col4 > 76.20 AND col0 = 84 OR col0 <= 76 AND col3 IN (SELECT col0 FROM tab0 WHERE col4 = 39.20 AND col3 <= 5)))

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,271 tests as _sqlite_

* 4,133 skipped
* 716 failed
* 33% was OK

Time: 9178.581ms

---- ---- ---- ---- ---- ---- ----
### 136/190 [`./test/index/view/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab0_444

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_2_tab0_444

Expected: ["1","65","5","67"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_444 UNION SELECT pk, col0 FROM view_2_tab0_444

4 results returned but expected 20
```


```sql
SELECT * FROM view_3_tab0_444

Expected: ["0","2","3","4","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_446

Expected: ["1","65"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_447

Expected: ["3"] but got ["NULL"]
```


```sql
SELECT * FROM view_3_tab0_448

Expected: ["2","3","4","8","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_462

Expected: ["3","6","7","52","8","29"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_462

Expected: ["3","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_463

Expected: ["0","1","2","5","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_519 AS SELECT pk, col0 FROM tab0 WHERE (((col0 >= 39) OR (col1 < 88.77) AND (((col1 <= 79.45) AND col0 IN (83,70,92,44,74) AND col4 < 94.64 OR col0 > 49 AND (col3 >= 51 OR col0 > 38)) OR col0 < 10 OR col1 > 79.73 AND col3 > 53 AND col1 BETWEEN 24.95 AND 9.14 AND col3 < 51 OR…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,563 tests as _sqlite_

* 223 skipped
* 1,526 failed
* 76% was OK

Time: 18873.399ms

---- ---- ---- ---- ---- ---- ----
### 137/190 [`./test/index/view/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab0_660

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_2_tab0_660

Expected: ["2","85","3","93"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_660 UNION SELECT pk, col0 FROM view_2_tab0_660

4 results returned but expected 20
```


```sql
SELECT * FROM view_3_tab0_660

Expected: ["0","1","4","5","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_661

Expected: ["0","48","2","85","3","93"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_661

Expected: ["0","2","3"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_662

Expected: ["2","3"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_677

Expected: ["0","2","3","4","5","7","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_687

Expected: ["8"] but got ["NULL"]
```


```sql
CREATE VIEW view_1_tab0_726 AS SELECT pk, col0 FROM tab0 WHERE col0 > 84 AND col4 <= 74.98 AND col1 IN (SELECT col4 FROM tab0 WHERE (col4 > 35.62) AND ((col3 > 33) AND (((((col3 > 1))) AND (col0 = 21 OR (((col3 > 79))) AND (col1 < 18.85) AND ((col3 > 26)) OR ((col3 > 73) AND col3 <= 84)))) OR ((((c…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,384 tests as _sqlite_

* 1,143 skipped
* 1,371 failed
* 65% was OK

Time: 18483.443ms

---- ---- ---- ---- ---- ---- ----
### 138/190 [`./test/index/view/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab0_946

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_946 UNION SELECT pk, col0 FROM view_2_tab0_946

10 results returned but expected 20
```


```sql
SELECT * FROM view_3_tab0_946

Expected: ["1","2","5","6","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_948

Expected: ["7","71"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_952

Expected: ["1","35","3","18","7","71","9","0"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_952

Expected: ["0","2","4","5","6","8"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_961

Expected: ["0","1","2","4","5","6","7"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_963

Expected: ["8"] but got ["NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_970

Expected: ["0","87","3","18"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_975

Expected: ["3","7","9"] but got ["NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_984 AS SELECT pk, col0 FROM tab0 WHERE (col0 > 42) AND ((col1 IS NULL)) OR ((((col3 > 72)))) OR (((col3 <= 90) AND ((col0 > 68)) AND (col0 IN (45,3,50,1) OR col4 < 9.99 OR col3 IN (76,97,24) AND col1 > 8.58 AND (col0 = 3) AND (col0 >= 50 AND col0 IN (SELECT col3 FROM tab0 WH…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 6,492 tests as _sqlite_

* 2,753 skipped
* 806 failed
* 45% was OK

Time: 10329.724ms

---- ---- ---- ---- ---- ---- ----
### 139/190 [`./test/index/view/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab0_1009

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_2_tab0_1009

Expected: ["0","71","5","97"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_1009 UNION SELECT pk, col0 FROM view_2_tab0_1009

4 results returned but expected 20
```


```sql
SELECT * FROM view_3_tab0_1009

Expected: ["1","2","3","4","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_1013

Expected: ["2","89","4","92","5","97"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_1013

Expected: ["0","1","3","6","7","8","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_2_tab0_1023

Expected: ["3","5"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_1027

Expected: ["6"] but got ["NULL"]
```


```sql
SELECT * FROM view_3_tab0_1031

Expected: ["1","3","6","7","9"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_1035

Expected: ["3","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_1042 AS SELECT pk, col0 FROM tab0 WHERE ((col0 > 16 OR ((col0 < 9 OR col3 IN (SELECT col0 FROM tab0 WHERE (col0 < 94) AND col0 <= 61))) AND col3 = 18 OR col3 < 55 AND col3 IN (76,76) OR col3 >= 86 AND ((((((col0 < 9)))) AND col0 = 70 OR col1 IS NULL) AND (col3 IN (31,92,0)))…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,533 tests as _sqlite_

* 4,593 skipped
* 646 failed
* 30% was OK

Time: 8954.524ms

---- ---- ---- ---- ---- ---- ----
### 140/190 [`./test/index/view/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_77 UNION SELECT pk, col0 FROM view_2_tab0_77

150 results returned but expected 200
```


```sql
SELECT * FROM view_3_tab0_84

Expected: ["1","26","29","4","81","94"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_93 AS SELECT pk, col0 FROM tab0 WHERE col4 < 813.50 AND col0 >= 561 AND (col4 >= 32.37 AND col0 IN (SELECT col3 FROM tab0 WHERE (col0 > 117))) AND (col1 < 303.87) OR col1 = 218.35

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8,623 tests as _sqlite_

* 6,893 skipped
* 677 failed
* 12% was OK

Time: 6891.356ms

---- ---- ---- ---- ---- ---- ----
### 141/190 [`./test/index/view/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_226 UNION SELECT pk, col0 FROM view_2_tab0_226

112 results returned but expected 200
```


```sql
SELECT pk, col0 FROM view_2_tab0_229

Expected: ["30","84","86","184"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_232

Expected: ["19","869","81","978","83","803"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_232

Expected: ["19","81","83"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_250

Expected: ["18","24"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_271

Expected: ["93"] but got ["NULL"]
```

#### ☓ Ran 7,122 tests as _sqlite_

* 2,876 failed
* 59% was OK

Time: 27506.299ms

---- ---- ---- ---- ---- ---- ----
### 142/190 [`./test/index/view/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_523 UNION SELECT pk, col0 FROM view_2_tab0_523

64 results returned but expected 200
```


```sql
CREATE VIEW view_1_tab0_534 AS SELECT pk, col0 FROM tab0 WHERE col0 < 152 OR (((col1 >= 904.26) AND ((col0 > 91))) OR col1 > 173.50 OR col3 < 641 AND col0 > 612 OR ((((col1 <= 635.91) OR col1 <= 876.74 OR col1 > 329.50 AND ((((((col3 < 593) OR ((col3 IN (447,628) OR (col3 = 133 OR col1 <= 679.69 OR…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8,235 tests as _sqlite_

* 7,008 skipped
* 457 failed
* 9% was OK

Time: 8172.180ms

---- ---- ---- ---- ---- ---- ----
### 143/190 [`./test/index/view/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_597

Expected: ["69","996"] but got ["NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_597 UNION SELECT pk, col0 FROM view_2_tab0_597

198 results returned but expected 200
```


```sql
SELECT * FROM view_3_tab0_597

Expected: ["69"] but got ["NULL"]
```


```sql
CREATE VIEW view_1_tab0_602 AS SELECT pk, col0 FROM tab0 WHERE col0 IN (SELECT col3 FROM tab0 WHERE col0 >= 795) OR col3 >= 543 OR col3 > 991 AND (((col3 < 927 OR (col3 < 430)) AND (col0 > 590) OR (col0 >= 449 AND col4 > 729.35 OR (((col3 >= 745 AND col0 IN (376,260))) AND col0 = 742 OR ((col3 < 40…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,174 tests as _sqlite_

* 6,548 skipped
* 207 failed
* 5% was OK

Time: 4415.686ms

---- ---- ---- ---- ---- ---- ----
### 144/190 [`./test/index/view/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_799 UNION SELECT pk, col0 FROM view_2_tab0_799

36 results returned but expected 200
```


```sql
SELECT pk, col0 FROM view_1_tab0_804

Expected: ["11","576","47","71"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_804

Expected: ["11","47"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_813

Expected: ["49"] but got ["NULL"]
```


```sql
SELECT * FROM view_3_tab0_817

Expected: ["23","34","36","67","68","8","91"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_837

Expected: ["54","65","74","76","96"] but got ["NULL","NULL","NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_869 AS SELECT pk, col0 FROM tab0 WHERE (((col0 > 796 OR ((((col0 < 642)) AND (((((col1 < 435.47 AND col0 = 220)) AND (col0 > 695) AND col3 > 66 AND (col4 > 262.50))) OR col0 > 828 AND ((col0 >= 606 AND col1 <= 821.18)) OR (col0 > 561) AND col4 < 21.23 OR col0 <= 506 AND col3…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 6,935 tests as _sqlite_

* 108 skipped
* 2,712 failed
* 59% was OK

Time: 27502.419ms

---- ---- ---- ---- ---- ---- ----
### 145/190 [`./test/index/view/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_870 UNION SELECT pk, col0 FROM view_2_tab0_870

16 results returned but expected 200
```


```sql
SELECT * FROM view_3_tab0_876

Expected: ["2","27","51","57","6","64","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM view_1_tab0_879

Expected: ["29","638","43","152","46","772","51","862"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_879

Expected: ["29","43","46","51"] but got ["NULL","NULL","NULL","NULL"]
```


```sql
SELECT pk, col0 FROM tab1 WHERE col1 < 85.65 OR col0 <= 401 AND col1 > 37.94 OR (col3 < 42) UNION SELECT pk, col0 FROM tab1 WHERE NOT (col1 < 85.65 OR col0 <= 401 AND col1 > 37.94 OR (col3 < 42))

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM tab1 WHERE col4 = 495.61 UNION SELECT pk, col0 FROM tab1 WHERE NOT (col4 = 495.61)

Correct amount of values returned but hash was different than expected.
```


```sql
CREATE VIEW view_1_tab0_901 AS SELECT pk, col0 FROM tab0 WHERE col4 BETWEEN 290.87 AND 700.72 AND col3 IS NULL AND col0 < 835 OR (((col0 IS NULL)) AND (col3 = 615)) OR col0 >= 743 AND col1 = 720.37 OR col0 IN (SELECT col3 FROM tab0 WHERE (((col4 <= 711.96 AND (col0 < 686) OR col0 > 628 OR (col3 >= …

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,949 tests as _sqlite_

* 4,823 skipped
* 1,217 failed
* 24% was OK

Time: 11864.560ms

---- ---- ---- ---- ---- ---- ----
### 146/190 [`./test/index/view/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/1000/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_739 UNION SELECT pk, col0 FROM view_2_tab0_739

1824 results returned but expected 2000
```


```sql
CREATE VIEW view_1_tab0_742 AS SELECT pk, col0 FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE (col1 < 3863.93))) OR ((col0 >= 5861) AND col0 >= 2066)

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7,630 tests as _sqlite_

* 6,203 skipped
* 167 failed
* 16% was OK

Time: 16687.166ms

---- ---- ---- ---- ---- ---- ----
### 147/190 [`./test/index/view/10000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10000/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM view_1_tab0_1 UNION SELECT pk, col0 FROM view_2_tab0_1

6920 results returned but expected 20000
```

#### ☓ Ran 10,622 tests as _sqlite_

* 271 failed
* 97% was OK

Time: 1541433.391ms

---- ---- ---- ---- ---- ---- ----
### 148/190 [`./test/random/aggregates/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 20 / - 97 FROM tab0

Expected: ["0"] but got ["-0.206"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) / - 0 col0 FROM tab0 AS cor0 WHERE NOT ( - CAST ( NULL AS INTEGER ) ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT MIN ( DISTINCT col1 ) * - + AVG ( DISTINCT + ( - + CAST ( NULL AS INTEGER ) ) ) AS col2, COUNT ( ALL - col0 ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","3"] but got ["3"]
```


```sql
SELECT DISTINCT - col1 AS col2, col2 AS col2 FROM tab1 WHERE - - CAST ( + - col1 AS REAL ) NOT BETWEEN - col0 AND NULL

Wrong conversion type
```


```sql
SELECT DISTINCT + CAST ( ( + SUM ( - 14 ) ) AS INTEGER ) AS col0 FROM tab1

g is not defined
```


```sql
SELECT ALL + col0 AS col1, + CAST ( NULL AS INTEGER ) + + col2 FROM tab0 AS cor0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["15","47","87","10","97","99"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1, tab0 AS cor0 WHERE NOT ( NULL ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT + col1 * CAST ( NULL AS INTEGER ) + + 67 AS col2 FROM tab2 WHERE ( + + col2 ) <= ( 42 )

Expected: ["NULL","NULL"] but got ["67","67"]
```


```sql
SELECT + MIN ( - 82 ) AS col0 FROM tab2 WHERE - + 5 * + col1 / - CAST ( NULL AS INTEGER ) IS NULL

Expected: ["-82"] but got ["NULL"]
```


```sql
SELECT ALL MIN ( ALL + 80 ) AS col2, 27 FROM tab2 cor0 WHERE NOT ( NULL ) BETWEEN + 95 + + 63 AND + 0

Expected: ["NULL","27"] but got ["27","NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...+ ( 90 ) IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'EXCEP…
```


```sql
SELECT col2 + + 76 / - ( - + col1 ) AS col1, 71 + col0 / + - CAST ( NULL AS INTEGER ) AS col2 FROM tab2

Expected: ["24","NULL","40","NULL","59","NULL"] but got ["24.490","NULL","40.987","NULL","59.134","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,588 failed
* 84% was OK

Time: 27497.945ms

---- ---- ---- ---- ---- ---- ----
### 149/190 [`./test/random/aggregates/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL col1, + col2 col1 FROM tab2

Expected: ["51","23","67","58","77","40"] but got ["23","23","40","40","58","58"]
```


```sql
SELECT + ( CAST ( NULL AS REAL ) ) - col0 AS col1 FROM tab1

Wrong conversion type
```


```sql
SELECT ALL - 19 * CAST ( + - CAST ( NULL AS INTEGER ) AS INTEGER ) * 44 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT - - CAST ( MAX ( ALL + col1 ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT ALL - MAX ( - CAST ( NULL AS INTEGER ) ) col0 FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL * FROM ( tab2 AS cor0 CROSS JOIN tab2 AS cor1 )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 16 AS col0 FROM tab0 WHERE NOT + 71 * + + CAST ( NULL AS INTEGER ) * - 24 + - ( - col2 ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL MAX ( DISTINCT + col2 ) FROM tab0 AS cor0 WHERE NOT - 85 * col0 + col0 BETWEEN - 82 AND NULL

Expected: ["99"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + 36 / + - 21 AS col1, + CAST ( NULL AS INTEGER ) * + COUNT ( * ) AS col1 FROM tab2

Expected: ["NULL","NULL"] but got ["0"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,374 failed
* 86% was OK

Time: 23702.189ms

---- ---- ---- ---- ---- ---- ----
### 150/190 [`./test/random/aggregates/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT CAST ( + SUM ( ALL - 37 ) AS INTEGER ) AS col2 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT DISTINCT + - SUM ( + CAST ( NULL AS INTEGER ) ) + - 23 AS col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-23"]
```


```sql
SELECT + - 40 / + + col2 AS col2 FROM tab2 AS cor0

Expected: ["-1","-1","0"] but got ["-0.690","-1","-1.739"]
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT + - col0 + + + col1 IN ( 37 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) + 77 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["77","77","77"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) * - 52 * - col1 * + 92 AS col1 FROM tab1

Wrong conversion type
```


```sql
SELECT ALL * FROM tab2 cor0 CROSS JOIN tab2 cor1 WHERE ( NULL IS NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0 WHERE NOT + + 45 IS NULL

18 results returned but expected 54
```


```sql
SELECT - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) * ( - SUM ( col2 ) ) FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + CAST ( NULL AS REAL ) * AVG ( col0 ) AS col2 FROM tab1

Wrong conversion type
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,508 failed
* 84% was OK

Time: 27568.464ms

---- ---- ---- ---- ---- ---- ----
### 151/190 [`./test/random/aggregates/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT ALL 57 - + CAST ( NULL AS INTEGER ) + - + col2 AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-42","10","47"]
```


```sql
SELECT ALL + 54 / 64 AS col0 FROM tab1 AS cor0

Expected: ["0","0","0"] but got ["0.844","0.844","0.844"]
```


```sql
SELECT ALL - CAST ( + MAX ( DISTINCT - col2 ) AS INTEGER ) AS col2 FROM tab2 WHERE NOT ( NULL ) NOT IN ( + col0 / + col1 / - - 59 * 70 / col0 )

g is not defined
```


```sql
SELECT DISTINCT COUNT ( * ) * + - CAST ( NULL AS REAL ) AS col0 FROM tab2

Wrong conversion type
```


```sql
SELECT + col2 + + col1, col2 * + - 52 * - col1 AS col0, - - ( + 43 ) / - ( + col2 ) + col0 - + col1 + + col0 * 87 AS col1 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL 73 * + SUM ( - 22 ) * + 80 AS col0, + 1 + + + 83 * CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["-385440","NULL"] but got ["-385440","1"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE ( NOT ( NOT - 57 + + 29 NOT BETWEEN + 93 AND + ( + col2 ) ) )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM ( tab1 AS cor0 CROSS JOIN tab1 AS cor1 ) WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT col0 * + + CAST ( NULL AS INTEGER ) AS col2, - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT 55 / + CAST ( NULL AS INTEGER ), col2 * 46 + col1 + + CAST ( NULL AS INTEGER ) + - col2 * - col0 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","2167","NULL","4477","NULL","7085"]
```


```sql
SELECT ALL - COUNT ( * ) / - CAST ( + COUNT ( * ) AS INTEGER ) FROM tab2

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col2, col1 + + CAST ( NULL AS INTEGER ) FROM tab2 WHERE NOT NULL IS NOT NULL

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","51","0","67","0","77"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,666 failed
* 83% was OK

Time: 24754.996ms

---- ---- ---- ---- ---- ---- ----
### 152/190 [`./test/random/aggregates/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 63 / col1 AS col2 FROM tab2

Expected: ["0","1"] but got ["0.818","0.940","1.235"]
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) AS col1, col0 - + 58 FROM tab2 AS cor0

Expected: ["NULL","-12","NULL","17","NULL","6"] but got ["0","-12","0","17","0","6"]
```


```sql
SELECT - - col2 * col0 + + - 40, CAST ( NULL AS REAL ) AS col0 FROM tab2 AS cor0

Wrong conversion type
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) col1 FROM tab1 AS cor0 CROSS JOIN tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( + COUNT ( DISTINCT + - col2 ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT ALL + col2 FROM tab2 WHERE NOT - col0 + col0 BETWEEN - col0 AND ( - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT MIN ( 38 ) AS col2 FROM tab1 WHERE NOT - col1 NOT BETWEEN NULL AND ( NULL )

Expected: ["NULL"] but got ["38"]
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0 WHERE 46 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT + + COUNT ( * ) AS col1, MIN ( - - 79 ) AS col1 FROM tab1 WHERE NOT NULL IS NULL

Expected: ["0","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + + CAST ( NULL AS INTEGER ), ( - col2 ) * + ( + CAST ( NULL AS INTEGER ) ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT col1 AS col1, + 34 / + CAST ( NULL AS INTEGER ) + col2 * - - col1 * + 65 col1 FROM tab2

Expected: ["51","NULL","67","NULL","77","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) / - col1 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL - MAX ( ALL - - col1 ) AS col0 FROM tab2 WHERE NOT ( col0 ) + 87 IN ( - + 12, - 20, - - col0 )

Expected: ["-77"] but got ["NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,688 failed
* 83% was OK

Time: 27128.507ms

---- ---- ---- ---- ---- ---- ----
### 153/190 [`./test/random/aggregates/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT + COUNT ( * ) + - COUNT ( * ) + - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT col2, 95 AS col2 FROM tab0

Expected: ["10","95","47","95","99","95"] but got ["95","95","95","95","95","95"]
```


```sql
SELECT ALL - col0 * + 64 * - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT - CAST ( + col1 AS REAL ) * col2 + CAST ( NULL AS INTEGER ), 92 AS col2 FROM tab0

Wrong conversion type
```


```sql
SELECT - CAST ( AVG ( + col0 ) AS INTEGER ) FROM tab0 AS cor0

g is not defined
```


```sql
SELECT col0 * - + 59 * - - col1 col1, col0 * - col2 * 90 AS col2, ( - col1 ) AS col2 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - - col2 AS col2 FROM tab0 WHERE NOT - + ( col1 ) IN ( col1 * - + 99 + + col1, + 70 / 67, col1 * - col2, + - col2 + + col1 - + + col1, - col0, col2 + + + 94, - + 28 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab2 AS cor0 LEFT JOIN tab1 AS cor1 ON NOT NULL IS NOT NULL, tab1 AS cor2

Parse error on line 1:
...NOT NULL IS NOT NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'EXCEP…
```


```sql
SELECT - MIN ( + col1 ) AS col0, 84 FROM tab1 AS cor0 WHERE NOT ( - 48 ) IS NOT NULL

Expected: ["NULL","84"] but got ["84","NULL"]
```


```sql
SELECT DISTINCT + + MAX ( col2 ) FROM tab0 AS cor0 WHERE NOT 38 BETWEEN NULL AND + col1

Expected: ["99"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 cor0 WHERE NULL IS NULL

18 results returned but expected 54
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,632 failed
* 83% was OK

Time: 25460.919ms

---- ---- ---- ---- ---- ---- ----
### 154/190 [`./test/random/aggregates/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT DISTINCT COUNT ( * ) / + 45 AS col1, 95 FROM tab0

Expected: ["0","95"] but got ["95","0.067"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT ( + col0 - + - col1 + ( col0 ) + CAST ( NULL AS INTEGER ) * 18 ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL COUNT ( * ) + - CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * 8 AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ( + CAST ( COUNT ( * ) AS INTEGER ) ) * + CAST ( NULL AS INTEGER ) / - - 78 FROM tab0

g is not defined
```


```sql
SELECT ALL - CAST ( NULL AS REAL ) - + + 63 - + 61 + + 36 + - col0 - 18 FROM tab1

Wrong conversion type
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE + 33 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT ( - 38 ) / + col2 AS col0, col2 * - + CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["-3","NULL","0","NULL"] but got ["-0.384","0","-0.809","0","-3.800","0"]
```


```sql
SELECT DISTINCT MAX ( ALL - 6 ) FROM tab2 WHERE NOT - col1 BETWEEN 33 + - 90 AND NULL

Expected: ["-6"] but got ["NULL"]
```


```sql
SELECT * FROM tab1 cor0 LEFT JOIN tab0 AS cor1 ON NOT NULL < ( NULL )

54 results returned but expected 18
```


```sql
SELECT DISTINCT 9 + COUNT ( * ) AS col2, AVG ( DISTINCT + + col2 ) col2, - MAX ( col2 ) AS col0 FROM tab2 AS cor0 WHERE NOT 13 IS NOT NULL

Expected: ["9","NULL","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,649 failed
* 83% was OK

Time: 28017.738ms

---- ---- ---- ---- ---- ---- ----
### 155/190 [`./test/random/aggregates/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + col2 + col1 / - + 86 AS col1 FROM tab1 AS cor0

Expected: ["-59","-68","-96"] but got ["-59.058","-68.547","-96.163"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + col1 + - 68 + col0 * + col2 AS col2 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["1041","2569","4349"]
```


```sql
SELECT col0 FROM tab0 AS cor0 WHERE NOT col2 BETWEEN 88 * - col1 AND - col2

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab2 cor0 LEFT OUTER JOIN tab2 AS cor1 ON NOT - + 94 = NULL

54 results returned but expected 18
```


```sql
SELECT ALL - 11 + + CAST ( NULL AS REAL ) FROM tab1 AS cor0

Wrong conversion type
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) / + ( + 58 ) FROM tab2 AS cor0 CROSS JOIN tab0 cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1 cor1 WHERE - 70 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( + MAX ( - 43 ) AS INTEGER ) FROM tab0 AS cor0 WHERE NOT NULL >= ( - col1 ) + col2

g is not defined
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 WHERE NOT + 87 < - - 14 + + 1 * col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col1, + col0 + - - col2 * + CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","15","0","87","0","97"]
```


```sql
SELECT - 34 + + COUNT ( * ) * 2 - - COUNT ( * ) AS col1, MAX ( + 82 ) AS col1 FROM tab1 AS cor0 WHERE NOT NULL BETWEEN ( NULL ) AND NULL

Expected: ["-34","NULL"] but got ["NULL"]
```


```sql
SELECT + + SUM ( DISTINCT col0 ) / + - CAST ( - COUNT ( * ) AS INTEGER ) + - 82 + - + COUNT ( * ) FROM tab1 AS cor0

Expected: ["-10"] but got ["NULL"]
```


```sql
SELECT - + COUNT ( * ) * - + 68 - + SUM ( DISTINCT col0 ) col2, + MAX ( DISTINCT col2 ) AS col2 FROM tab2 WHERE NOT NULL IS NULL

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 LEFT JOIN tab1 cor1 ON NOT 86 IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...N NOT 86 IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ARROW', 'DOT', 'ORDER', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'GTGT', 'LTLT', 'NOT', 'UNION', 'INTERSECT', 'EXCEP…
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,634 failed
* 83% was OK

Time: 40163.199ms

---- ---- ---- ---- ---- ---- ----
### 156/190 [`./test/random/aggregates/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - COUNT ( * ) FROM tab1 WHERE NOT - CAST ( - col0 AS INTEGER ) IN ( col2, + col2 )

Expected: ["-3"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 WHERE NOT col2 BETWEEN NULL AND - + col1

Query was expected to return results (but did not) 
```


```sql
SELECT - 25 * + CAST ( + + COUNT ( ALL - 61 ) AS INTEGER ) AS col2 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT ALL + ( - AVG ( - CAST ( NULL AS INTEGER ) ) ) + - ( - 23 ) FROM tab0

Expected: ["NULL"] but got ["23"]
```


```sql
SELECT ALL CAST ( - - col1 AS INTEGER ) / col1 + + col0 + - + CAST ( NULL AS INTEGER ) * - + col2 AS col0 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["16","88","98"]
```


```sql
SELECT COUNT ( * ) / - 3, - 4 / CAST ( + + AVG ( DISTINCT col2 ) AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["-1","0"] but got ["-1","NULL"]
```


```sql
SELECT DISTINCT col2 + col2 AS col1 FROM tab2 WHERE NOT - 89 * CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT 61 AS col1, col1 AS col1 FROM tab1 AS cor0

Expected: ["61","14","61","47","61","5"] but got ["14","14","47","47","5","5"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE ( 36 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - 47 AS col1 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + + col2 - - CAST ( NULL AS INTEGER ) + + 20, CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["119","0","30","0","67","0"]
```


```sql
SELECT DISTINCT + 6 * - 31 + col1 AS col1, + 34 / - CAST ( NULL AS INTEGER ) col1 FROM tab1 AS cor0

Expected: ["-139","NULL","-172","NULL","-181","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,634 failed
* 83% was OK

Time: 36466.707ms

---- ---- ---- ---- ---- ---- ----
### 157/190 [`./test/random/aggregates/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab1 WHERE ( CAST ( NULL AS REAL ) IS NOT NULL )

Wrong conversion type
```


```sql
SELECT ALL - + 1 * - col0 + - - 96 * ( + + 92 ) - 81 / - - ( + col0 ) AS col0 FROM tab0 AS cor0

Expected: ["8842","8919","8929"] but got ["8841.600","8918.069","8928.165"]
```


```sql
SELECT - CAST ( COUNT ( * ) AS INTEGER ) * + CAST ( NULL AS INTEGER ) * + MIN ( ALL - 45 ) AS col1 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + - col0 AS col0, CAST ( NULL AS INTEGER ) * + col1 AS col1 FROM tab0 AS cor0

Expected: ["-15","NULL","-87","NULL","-97","NULL"] but got ["-15","0","-87","0","-97","0"]
```


```sql
SELECT DISTINCT - + 86 + - - CAST ( - - COUNT ( * ) AS INTEGER ) FROM tab0 AS cor0

g is not defined
```


```sql
SELECT ALL * FROM tab1 WHERE NOT col2 IN ( - ( col1 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - 14 AS col2, 94 AS col2, col2 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM ( tab0 AS cor0 CROSS JOIN tab0 cor1 ) WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) + 3 AS col0 FROM tab2 WHERE + + col2 - - - ( + col1 ) - - col2 <> col0 + + - col1

Expected: ["NULL","NULL"] but got ["3","3"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,565 failed
* 84% was OK

Time: 34915.089ms

---- ---- ---- ---- ---- ---- ----
### 158/190 [`./test/random/expr/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT 20 / - - 96 + CAST ( 90 AS INTEGER ) AS col2

Expected: ["90"] but got ["90.208"]
```


```sql
SELECT - MAX ( ALL + CAST ( NULL AS INTEGER ) )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT 67 * + 85 * - CAST ( - SUM ( - 52 ) AS INTEGER ) col2

g is not defined
```


```sql
SELECT ALL 25 * + COUNT ( * ) + - 0 - + - 6 + + - ( + + CASE + CAST ( + + 38 AS REAL ) WHEN 3 THEN NULL WHEN + 42 THEN NULL WHEN - 80 THEN NULL ELSE 14 END ) AS col1, - 31 AS col0

Wrong conversion type
```


```sql
SELECT DISTINCT COUNT ( * ) - - ( + COUNT ( * ) ) AS col2, + 77 / 37 + + + 90, + CASE - - MAX ( - ( - + 45 ) ) WHEN - 14 * + - CASE - ( + 12 ) WHEN - COALESCE ( - 33, + 62, + - 72 + + 76 ) * + 41 THEN - ( - SUM ( ALL - ( + 56 ) ) ) * 89 END * + - 15 * + 74 THEN - 12 * 69 - CAST ( 16 AS INTEGER ) WH…

Expected: ["2","92","NULL"] but got ["NULL","92.081"]
```


```sql
SELECT - 37 AS col0, + MAX ( + - 74 ) * + - 55 / CAST ( - COUNT ( * ) AS INTEGER ) + 48 - - 10 + + 31 * - 27 * - 89 * - + 35

Expected: ["-37","-2611267"] but got ["-37","NULL"]
```


```sql
SELECT SUM ( + 73 ) * - CASE WHEN NOT ( NOT 27 BETWEEN 15 AND - NULLIF ( - 63, - 28 + + 76 ) ) THEN NULL ELSE + 77 * + 69 END / - CAST ( - 69 AS INTEGER ) AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL CAST ( - - CASE + 81 WHEN - 91 THEN + 37 END AS INTEGER ), + MAX ( ALL - - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - 80 + - CASE - CASE + COUNT ( * ) WHEN - 92 THEN 44 ELSE - 5 + + 36 END WHEN + 95 THEN + + 70 + - 38 WHEN 17 THEN 50 END * + ( 86 ) AS col0, - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - + 46 AS col2, CASE 10 WHEN + 84 THEN 33 / + + 74 ELSE NULL END col2

Expected: ["-46","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,839 failed
* 81% was OK

Time: 39115.517ms

---- ---- ---- ---- ---- ---- ----
### 159/190 [`./test/random/expr/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( NULL AS REAL )

Wrong conversion type
```


```sql
SELECT ALL COUNT ( * ) AS col0, - 83 AS col0

Expected: ["1","-83"] but got ["-83"]
```


```sql
SELECT CAST ( - COUNT ( ALL 73 ) AS INTEGER )

g is not defined
```


```sql
SELECT - CASE WHEN NOT NULL BETWEEN NULL AND NULL THEN 17 ELSE NULL END + + 12

Cannot read property 'toString' of undefined
```


```sql
SELECT CAST ( NULL AS INTEGER ), - COUNT ( * ) + - - CAST ( NULL AS INTEGER ) + + - CAST ( 14 AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","-15"]
```


```sql
SELECT + MIN ( + + 67 ), 63 / - CAST ( - COUNT ( * ) AS INTEGER ) AS col2

Expected: ["67","63"] but got ["67","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,175 failed
* 88% was OK

Time: 19132.749ms

---- ---- ---- ---- ---- ---- ----
### 160/190 [`./test/random/expr/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT + 62 / + SUM ( - 80 ) * + + 23 + + 38 + CAST ( + 31 AS INTEGER ) * + COUNT ( DISTINCT - 54 ) * + ( + 88 + - CAST ( 95 - COUNT ( * ) * 18 AS INTEGER ) )

Expected: ["379"] but got ["2765.966"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ), - 9 AS col0

Expected: ["NULL","-9"] but got ["0","-9"]
```


```sql
SELECT - ( - CAST ( + - SUM ( DISTINCT - - 53 ) AS INTEGER ) )

g is not defined
```


```sql
SELECT - CAST ( NULL AS REAL )

Wrong conversion type
```


```sql
SELECT + CASE + COUNT ( * ) WHEN + COALESCE ( + MAX ( DISTINCT - 17 ), 72 - + - 86 + + ( - CASE WHEN ( + CASE - 8 WHEN - 7 THEN NULL WHEN - 70 * + 18 THEN NULL ELSE 82 * + ( - - MIN ( + 47 ) ) + - SUM ( DISTINCT 97 ) END ) BETWEEN - 13 * + 57 AND - COUNT ( * ) * - 74 THEN 89 WHEN NOT - 12 >= NULL T…

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 76 / + ( - - 64 ), - ( - COUNT ( * ) ) + + CASE - 49 WHEN - 8 THEN + + ( + COALESCE ( - 57, + 78, + 48 ) ) * + - CAST ( 44 AS INTEGER ) + - + 5 END col1

Expected: ["-1","NULL"] but got ["-1.188","NULL"]
```


```sql
SELECT DISTINCT CASE WHEN NOT COUNT ( * ) IN ( + 75 ) THEN ( 79 ) WHEN + 9 IS NOT NULL THEN NULL END

Expected: ["79"] but got ["NULL"]
```


```sql
SELECT + + 14 * 93 + + CAST ( NULL AS INTEGER ) * + 60 col0, CASE - 49 WHEN + NULLIF ( + - 64, ( + 20 ) ) * + 13 / COUNT ( * ) THEN 85 / - - COUNT ( DISTINCT - 96 ) + - 38 ELSE NULL END

Expected: ["NULL","NULL"] but got ["1302","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), - COUNT ( * ) + - - CAST ( NULL AS INTEGER ) + + - CAST ( 14 AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","-15"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,481 failed
* 85% was OK

Time: 30900.084ms

---- ---- ---- ---- ---- ---- ----
### 161/190 [`./test/random/expr/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT 0 AS col2, 27 AS col2

Expected: ["0","27"] but got ["27","27"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * 60 AS col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT - - COUNT ( * ), 43 + CAST ( NULL AS REAL ) AS col0

Wrong conversion type
```


```sql
SELECT + 29 * - NULLIF ( + 80, + CAST ( + NULLIF ( + - 4, - + COUNT ( * ) ) AS INTEGER ) * - 44 * - ( COALESCE ( 0, + 36 * 1 ) ) ) AS col1

g is not defined
```


```sql
SELECT 30 / COALESCE ( - COALESCE ( + + CAST ( NULL AS INTEGER ), 86 + + 46 ), - - 46 )

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT 6 * - 8 * CASE - MAX ( ALL - + 82 ) WHEN + COUNT ( * ) THEN + CASE WHEN NOT COUNT ( * ) BETWEEN 77 AND ( ( + COUNT ( - 48 ) ) ) THEN NULL WHEN NULL IS NULL THEN NULL ELSE - 98 END * 3 WHEN + 75 * COUNT ( * ) THEN NULL END * 62

Cannot read property 'toString' of undefined
```


```sql
SELECT 24 - - - CASE - + 7 WHEN - COUNT ( * ) THEN + SUM ( DISTINCT 34 ) WHEN + + 14 THEN + 3 / + 91 END col2, 1 * - CAST ( NULL AS INTEGER ) / - + 66, 61 col1

Expected: ["NULL","NULL","61"] but got ["NULL","0","61"]
```


```sql
SELECT - + 55 / + - 69, + 81 * 68 + + - ( CASE + 72 WHEN - 90 * + 85 + - COALESCE ( 84, - + ( + COUNT ( * ) ) + 60, + 25 / 41 ) THEN + - 72 * 22 - - 36 - - + 93 WHEN 15 THEN - 38 END ) * 22 AS col0

Expected: ["0","NULL"] but got ["0.797","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ), ( + CAST ( NULL AS INTEGER ) ) + + 79, - - 10 AS col1

Expected: ["NULL","NULL","10"] but got ["0","79","10"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,064 failed
* 79% was OK

Time: 32655.393ms

---- ---- ---- ---- ---- ---- ----
### 162/190 [`./test/random/expr/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT + ( - ( - 91 ) ) / - 94 * + - 88 AS col1

Expected: ["0"] but got ["0.011"]
```


```sql
SELECT + - 87 / - - 47 + + 6 + - CAST ( + COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT + + 43 + - CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL"] but got ["43"]
```


```sql
SELECT DISTINCT COALESCE ( + 51, + COUNT ( * ) / CASE WHEN NOT NULL NOT IN ( 95, 16, - CASE - 72 WHEN - 83 THEN - 70 * + + CAST ( NULL AS REAL ) / + + 81 WHEN CAST ( + COUNT ( * ) AS REAL ) THEN + - 13 ELSE NULL END * + 74 * + COUNT ( * ) ) THEN 69 END + 27 ) AS col0

Wrong conversion type
```


```sql
SELECT - CASE WHEN NOT + CASE + AVG ( ALL + + 26 ) WHEN ( + 47 ) + CAST ( + 26 AS INTEGER ) - - COUNT ( * ) * - COALESCE ( - - 44, + ( 80 ) ) + + + 47 THEN - 2 ELSE NULL END BETWEEN NULL AND - COUNT ( * ) THEN + + 25 WHEN 92 + + + COUNT ( * ) <= ( + ( + 40 ) + 67 ) THEN NULL END * - 82 + 89

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + MAX ( + CAST ( NULL AS INTEGER ) ), - 10 + - + SUM ( DISTINCT + 37 ) + - CAST ( NULL AS INTEGER ) + 89 * 62 AS col0

Expected: ["NULL","NULL"] but got ["0","5471"]
```


```sql
SELECT ALL 38 * - COALESCE ( 52, - + 49 / - 55 * + + 18, NULLIF ( + + 67, - + 39 ) ) / ( + COALESCE ( CAST ( NULL AS INTEGER ), + COUNT ( * ) ) ) AS col0

Expected: ["-1976"] but got ["NULL"]
```


```sql
SELECT ALL - 55 AS col1, - MAX ( ALL - 3 ) / MIN ( ALL + 53 ) * + CASE - - 47 WHEN - + 13 THEN AVG ( ALL - NULLIF ( 1, + + NULLIF ( - 69, 37 + 95 + - 77 ) ) ) ELSE NULL END * - 92 - 65 + - 51 * - 61 * 37 - COUNT ( * ) col1

Expected: ["-55","NULL"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col1, CASE + COUNT ( * ) WHEN - - 5 THEN + - 71 * + 32 / - 55 END / + 90 * - - 55 * - + NULLIF ( + - SUM ( ALL + 39 ), - 42 )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,064 failed
* 79% was OK

Time: 40076.832ms

---- ---- ---- ---- ---- ---- ----
### 163/190 [`./test/random/expr/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT 89 * + CASE 39 WHEN + - 14 THEN NULL ELSE - + ( - COUNT ( * ) ) - - - 28 END * - - CAST ( - 86 AS INTEGER ) - - CASE + AVG ( + 89 ) WHEN - CAST ( - 27 AS REAL ) THEN - 76 + + CAST ( NULL AS INTEGER ) + + - 31 + 22 * - 82 * + + COUNT ( - + ( + - ( 29 ) ) ) ELSE - 0 END + 94

Wrong conversion type
```


```sql
SELECT - 79 / 44 + + + 90 col1

Expected: ["89"] but got ["88.205"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * + 9

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL CASE + - 88 WHEN - COALESCE ( - CAST ( - 37 AS INTEGER ), + 62 ) - + COUNT ( * ) / 56 THEN - 58 WHEN 41 THEN NULL END, 82 / 81 AS col0

Expected: ["NULL","1"] but got ["NULL","1.012"]
```


```sql
SELECT ALL - CAST ( + ( + COUNT ( * ) ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT + CAST ( - + CASE WHEN NOT 4 NOT BETWEEN COUNT ( * ) AND NULL THEN + 22 END AS REAL ) * 73 * - 59 / - MAX ( DISTINCT - 71 )

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + MAX ( + - ( + 1 ) ) * 34 + + - CAST ( NULL AS INTEGER ) AS col1, + COUNT ( DISTINCT - 24 ) / 41 + 68 * - CASE + 74 + - 34 * 20 WHEN 67 THEN NULL WHEN MIN ( + 97 ) + CAST ( - 84 - + 15 AS INTEGER ) * 27 THEN 56 ELSE NULL END

Expected: ["NULL","NULL"] but got ["-34","NULL"]
```


```sql
SELECT ( - 91 ) AS col0, - NULLIF ( + COUNT ( * ), ( + 67 ) * - CASE ( + COUNT ( * ) ) WHEN CASE + 85 WHEN + - 28 * - 66 THEN NULL WHEN + 94 THEN + 62 END + - 95 + CASE + + COALESCE ( - COALESCE ( 49, - ( - + ( + 72 ) ) / - + SUM ( 25 ), + 65, 15 * + NULLIF ( + - 36, + NULLIF ( NULLIF ( - COALESCE …

Expected: ["-91","-1"] but got ["-91","NULL"]
```


```sql
SELECT + NULLIF ( - CAST ( NULL AS INTEGER ), ( - 87 ) / + COUNT ( * ) * - 62 * - 63 / + + 33 ) * 38, + CAST ( NULL AS INTEGER ) * + COUNT ( * ) / + 52, + CAST ( NULL AS INTEGER ) + - NULLIF ( SUM ( ALL - - 73 ), + 53 - + 93 * - 72 + NULLIF ( - 49, + CAST ( NULL AS INTEGER ) ) + 30 ) col2

Expected: ["NULL","NULL","NULL"] but got ["0","0","-73"]
```


```sql
SELECT CASE ( - CASE - + ( + 60 ) WHEN - COALESCE ( - 43, + 42 ) + - - 23 THEN + - COUNT ( * ) ELSE - 44 * + 52 END ) WHEN - 44 THEN - 73 END + + COUNT ( * ) AS col0, CAST ( NULL AS INTEGER ) * + 82 AS col0

Expected: ["NULL","NULL"] but got ["0"]
```


```sql
SELECT ALL + 65 AS col1, CASE + + 3 WHEN + + 8 THEN 69 ELSE NULL END col1

Expected: ["65","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,085 failed
* 79% was OK

Time: 41577.278ms

---- ---- ---- ---- ---- ---- ----
### 164/190 [`./test/random/expr/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT ALL + 77 + - 25 + COALESCE ( 17, COUNT ( * ), - NULLIF ( + 14, + - ( - 78 ) * - COUNT ( * ) ) ) + CAST ( NULL AS REAL ) AS col2

Wrong conversion type
```


```sql
SELECT 64 / - - 90 + + 22 * + ( - 0 ) AS col1

Expected: ["0"] but got ["0.711"]
```


```sql
SELECT 64 - + - CASE + 33 WHEN + 80 * 8 * - - 62 + + 88 + - + 5 * 63 / 11 THEN - + COALESCE ( - 93, - 63 ) ELSE NULL END + - - 51 - + + 99 AS col1, 79 AS col1

Expected: ["NULL","79"] but got ["79","79"]
```


```sql
SELECT + + 92 * NULLIF ( COALESCE ( + - 44, 60 * + 41 ), - - 77 ) * 82 * CAST ( NULLIF ( COUNT ( * ), - 7 * - 79 + + + 35 ) AS INTEGER ) + + + 48

g is not defined
```


```sql
SELECT 6 + - + 0 * + 51 / + ( CASE WHEN + 76 BETWEEN - 93 * + + CAST ( - - 7 AS INTEGER ) * 71 * + + 10 - + AVG ( DISTINCT - 95 ) AND - 61 THEN - - 39 WHEN 73 BETWEEN 8 AND - ( 25 ) + 86 THEN + COUNT ( * ) * AVG ( 33 ) END ) * 89 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col1, CASE - 45 WHEN 29 THEN + - COUNT ( * ) WHEN + 74 THEN NULL END AS col1

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT - 44 / - 97 - + + 36 + + 0 * 40 + + 15 * - MIN ( - 42 ) * + + 25 AS col1, - CASE - + 73 WHEN COALESCE ( - MAX ( ALL - - 70 ), + 94 * + COALESCE ( - 20, - 90 * - 32 + - 35 + - + 4, + 62 + - NULLIF ( + + ( 95 ), + 65 ), 26 ) * - 49 + + NULLIF ( 43, - 91 ) ) THEN - 62 * + 4 * + AVG ( 92 ) - - 7…

Expected: ["15714","NULL"] but got ["15714.454","NULL"]
```


```sql
SELECT + COALESCE ( - MAX ( + - 18 ), - - ( + COALESCE ( 15, - SUM ( ALL - + 6 ) ) ) ) / - - ( CAST ( + + MIN ( ALL - 30 ) AS INTEGER ) )

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT DISTINCT - 69 + + CAST ( NULL AS INTEGER ) AS col1, - 40 - - 10 * + 5 AS col0, + SUM ( ALL CAST ( NULL AS INTEGER ) ) * + 74

Expected: ["NULL","10","NULL"] but got ["-69","10","0"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,043 failed
* 79% was OK

Time: 36745.464ms

---- ---- ---- ---- ---- ---- ----
### 165/190 [`./test/random/expr/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL - 83 / - 36 AS col1

Expected: ["2"] but got ["2.306"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - + 40 col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - MIN ( + - 66 ) * + + 86 + + - SUM ( + 97 ) - - + 4 * ( + MAX ( - 8 ) ) * CASE 6 WHEN CAST ( + + 22 AS REAL ) THEN - 82 WHEN - 14 THEN NULL END AS col0

Wrong conversion type
```


```sql
SELECT - 33 AS col0, 3 / + COUNT ( * ) + - CASE - 63 WHEN + + 43 * + COUNT ( * ) THEN + 77 * + ( 69 ) WHEN - + ( + 24 ) + + 83 * - - 92 THEN + 91 END + - - 12 * + 64 col0

Expected: ["-33","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT CASE WHEN NOT NULLIF ( 11, - 27 ) BETWEEN - 40 + + 42 AND - CASE CAST ( + 34 AS INTEGER ) WHEN ( 22 ) + + 40 THEN - 15 * 68 ELSE - 4 * 78 END THEN 72 END / COALESCE ( + 58, + MIN ( - 44 ) ) AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT 27 col1, - CASE - + 30 WHEN + 37 THEN NULL WHEN + 0 + 2 * - 60 THEN + ( 95 ) / COALESCE ( - 40, 57 / - 17 ) WHEN - 64 - - 98 THEN NULL ELSE NULL END AS col1

Expected: ["27","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL + 99 * + CAST ( - + COUNT ( ALL - 18 ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT ALL - COUNT ( * ) + - CAST ( NULL AS INTEGER ), 33 * + CAST ( - 13 AS INTEGER ) * + + CAST ( NULL AS INTEGER ) / + + 12 * - 39

Expected: ["NULL","NULL"] but got ["-1","0"]
```


```sql
SELECT ALL CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) col0, 32 + + 91 + - 95 + - NULLIF ( + CASE + 52 WHEN - + 61 + - + 37 THEN + - 27 - + - 74 / MAX ( ALL + 70 ) WHEN - 37 THEN NULL WHEN + 66 THEN NULL WHEN + ( + MIN ( DISTINCT 35 ) ) + + 29 * - 72 THEN - MIN ( DISTINCT + - ( - 20 ) ) * - + 53…

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,097 failed
* 79% was OK

Time: 36333.747ms

---- ---- ---- ---- ---- ---- ----
### 166/190 [`./test/random/expr/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT 48 / + + 76 + + - 81 + - 78 + + - 92

Expected: ["-251"] but got ["-250.368"]
```


```sql
SELECT ALL - ( - - CAST ( COUNT ( * ) AS INTEGER ) ) + 92

g is not defined
```


```sql
SELECT ALL - 85 * - CAST ( NULL AS INTEGER ) AS col2, 26

Expected: ["NULL","26"] but got ["0","26"]
```


```sql
SELECT DISTINCT - 58 + + CAST ( NULL AS REAL ) - - 6 + + COUNT ( DISTINCT - 58 ) * + 23 * - COUNT ( * ) + 11 AS col2

Wrong conversion type
```


```sql
SELECT COALESCE ( 8, - 90 ) * + 74, + CASE - COUNT ( * ) WHEN + - CASE WHEN - 50 NOT BETWEEN + ( - 5 ) + 1 * - 15 AND COUNT ( * ) THEN - 87 * + 60 END THEN NULL WHEN + 17 THEN 0 * CAST ( - CAST ( 8 AS INTEGER ) AS INTEGER ) END / 82 + - 48 * - 21 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT COUNT ( * ) / - COALESCE ( + + CAST ( NULL AS INTEGER ), + - 93 + - + 11 * + 76 ), 24 / ( 29 )

Expected: ["0","0"] but got ["NULL","0.828"]
```


```sql
SELECT DISTINCT - CASE 14 WHEN 17 + 74 THEN NULL ELSE CASE 63 WHEN + 61 THEN 95 * - - COUNT ( * ) * COUNT ( * ) - + 76 ELSE NULL END + - + 2 + 90 - 20 - - 39 / + 45 * - 43 END col2, 38

Expected: ["NULL","38"] but got ["38","NULL"]
```


```sql
SELECT ALL - - 54 / - - COALESCE ( + 56, - ( + 13 ), - 5 + - 84 * - COUNT ( * ) + - 93 ) + 54 + MAX ( ALL - - ( - 57 ) ) AS col1

Expected: ["-3"] but got ["-2.036"]
```


```sql
SELECT 57 + + CASE + COUNT ( * ) WHEN - 80 THEN + + 58 END - - 44 * + + 74 / - 67 + ( - COUNT ( * ) ) * + 48, CAST ( NULL AS INTEGER ) + - 20 AS col1

Expected: ["NULL","NULL"] but got ["NULL","-20"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + 7 + - CAST ( - 45 AS INTEGER ) - - - 61 + - - 1 - 74, + AVG ( - - CAST ( NULL AS INTEGER ) ) + 63 AS col2

Expected: ["NULL","NULL"] but got ["-82","63"]
```


```sql
SELECT ALL + 2 col0, ( 32 ) + - 3 + CASE - 81 WHEN - - 81 THEN 21 END + + 27 + + 93 AS col0

Expected: ["2","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,139 failed
* 78% was OK

Time: 30396.966ms

---- ---- ---- ---- ---- ---- ----
### 167/190 [`./test/random/expr/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT - NULLIF ( 52, 73 ) / - 38 AS col1

Expected: ["1"] but got ["1.368"]
```


```sql
SELECT ALL 8 + - CAST ( NULL AS INTEGER ) * ( - 85 ) AS col0

Expected: ["NULL"] but got ["8"]
```


```sql
SELECT 22 col1, 35 * + CASE 28 WHEN 4 THEN NULL WHEN - 57 THEN 46 END * + 57 / - 91 AS col1

Expected: ["22","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL - 53, 56 * ( + ( + ( - CAST ( NULL AS REAL ) ) ) ) + - + 68 - - - MIN ( - - ( - 69 ) ) * - 98 + + MAX ( + 97 ) * CASE - 4 WHEN - 23 * 97 + COUNT ( DISTINCT 40 ) THEN 80 WHEN 54 * 2 THEN - 96 ELSE - MAX ( 94 ) END AS col1

Wrong conversion type
```


```sql
SELECT ALL + CAST ( + ( COUNT ( * ) ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL + COUNT ( * ) AS col1, 53 / CASE - 61 WHEN 73 + COUNT ( * ) THEN COUNT ( * ) * - 10 + - - 16 + + + 38 / COUNT ( DISTINCT 78 ) + + 15 + 1 WHEN - + 91 THEN + COUNT ( * ) + 49 END + 14 / 6 col1

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT CASE - COALESCE ( + 2, - CAST ( NULL AS INTEGER ) ) WHEN + + 11 * - + 93 * 31 THEN 1 + + 71 WHEN - 72 THEN NULL END - - CASE WHEN ( NULL ) IS NOT NULL THEN NULL WHEN - 33 BETWEEN ( NULL ) AND - 14 THEN + 27 END - + 30 / - COALESCE ( 26, - NULLIF ( - 59, - COUNT ( * ) ) + + COUNT ( * ) + + 41…

Cannot read property 'toString' of undefined
```


```sql
SELECT + + 74 col0, CASE WHEN NOT NULL >= ( NULL ) THEN NULL ELSE 80 END * - 68

Expected: ["74","-5440"] but got ["74","NULL"]
```


```sql
SELECT - 12 * + ( - CAST ( NULL AS INTEGER ) ) AS col0, + CASE MAX ( - 48 ) WHEN 20 * - 45 THEN COUNT ( * ) WHEN - 8 THEN 60 ELSE NULL END AS col0

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT + ( + + 12 ) + - + 36 + - 83 * - 12 * ( - 71 ) * + CAST ( NULL AS INTEGER ) * + AVG ( DISTINCT + ( + 21 ) ) * 16 + - 97, CAST ( NULL AS INTEGER ) * - 90 AS col2

Expected: ["NULL","NULL"] but got ["-121","0"]
```


```sql
SELECT + + COUNT ( * ) col1, 41 AS col1

Expected: ["1","41"] but got ["41"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,046 failed
* 79% was OK

Time: 34360.426ms

---- ---- ---- ---- ---- ---- ----
### 168/190 [`./test/random/groupby/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT - tab1.col0 * 84 + + 38 AS col2 FROM tab1 GROUP BY tab1.col0

Expected: ["-1810","-2314","-6850"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col2, cor0.col0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - + cor0.col1 FROM tab0, tab0 cor0 GROUP BY cor0.col1

Expected: ["-81","0"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + cor0.col1 FROM tab2 cor0 GROUP BY cor0.col1

Expected: ["41","59","61"] but got ["NULL"]
```


```sql
SELECT ALL 59 / 26 FROM tab2 AS cor0 GROUP BY cor0.col0

Expected: ["2","2","2"] but got ["2.269","2.269","2.269"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 GROUP BY cor0.col2, cor0.col2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 GROUP BY col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col2 FROM tab0 GROUP BY tab0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS REAL ) FROM tab2 cor0 GROUP BY cor0.col1

Wrong conversion type
```


```sql
SELECT ALL cor0.col1 AS col1 FROM tab2 AS cor0 GROUP BY col1 HAVING NOT ( cor0.col1 ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + cor0.col2 - + 33 FROM tab0 AS cor0 GROUP BY col2

Expected: ["-9","46","5"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,287 failed
* 57% was OK

Time: 23856.100ms

---- ---- ---- ---- ---- ---- ----
### 169/190 [`./test/random/groupby/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT 47 / + cor0.col1 FROM tab1 AS cor0 GROUP BY col1

Expected: ["0","1","7"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + cor0.col1 AS col2 FROM tab0 AS cor0 GROUP BY col1, cor0.col0

Expected: ["0","81"] but got ["NULL"]
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) AS col1 FROM tab2 GROUP BY col0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + cor0.col1 + + ( col1 ) AS col1 FROM tab0 AS cor0 GROUP BY col1

Expected: ["0","162"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - NULLIF ( + cor0.col2 * cor0.col1, - cor0.col1 ) + - 31 * cor0.col2 - - col1 col2 FROM tab0 cor0 GROUP BY cor0.col1, cor0.col2

Expected: ["-2607","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 GROUP BY col0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - CAST ( NULL AS REAL ) AS col1 FROM tab1, tab1 AS cor0, tab1 AS cor1 GROUP BY cor1.col1

Wrong conversion type
```


```sql
SELECT DISTINCT 2 / + 19 FROM tab1 AS cor0 GROUP BY col0

Expected: ["0"] but got ["0.105"]
```


```sql
SELECT + cor1.col0 * cor1.col0 FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor1.col0, cor0.col2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - cor0.col1 AS col1 FROM tab2 AS cor0 GROUP BY col1 HAVING NOT ( cor0.col1 ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT 69 * cor0.col0 FROM tab2 cor0 GROUP BY col0

Expected: ["1035","6279","6348"] but got ["NULL"]
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) * 11 FROM tab0, tab2 AS cor0 GROUP BY tab0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL 86 + cor1.col0 FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor0.col1, cor1.col0

Expected: ["112","112","129","129","169","169"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL CASE - cor0.col1 WHEN cor0.col1 THEN NULL ELSE cor0.col1 END FROM tab0 cor0 GROUP BY cor0.col1

Expected: ["81","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT cor1.col0 - + cor0.col0 * cor0.col0 AS col1 FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor0.col0, cor1.col0

1 results returned but expected 9
```


```sql
SELECT NULLIF ( cor0.col1, cor0.col1 * 4 + - col1 ) * + cor0.col0 AS col1 FROM tab0 AS cor0 GROUP BY cor0.col0, cor0.col1, cor0.col1

Expected: ["3483","NULL","NULL"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,144 failed
* 58% was OK

Time: 25302.928ms

---- ---- ---- ---- ---- ---- ----
### 170/190 [`./test/random/groupby/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT ALL - ( 50 ) + tab1.col2 AS col1 FROM tab1 GROUP BY col2

Expected: ["-42","-5","21"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + cor0.col1 AS col0 FROM tab2 AS cor0 GROUP BY cor0.col1, cor0.col1, cor0.col1

Expected: ["41","59","61"] but got ["NULL"]
```


```sql
SELECT - 66 + cor0.col1 FROM tab0 AS cor0 GROUP BY col1

Expected: ["-66","15"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - 70 / - 15 + col1 AS col2 FROM tab0 GROUP BY tab0.col1

Expected: ["4","85"] but got ["4.667","85.667"]
```


```sql
SELECT NULLIF ( + col1, cor0.col1 * - ( cor0.col1 ) ) AS col2 FROM tab0 cor0 GROUP BY cor0.col1, cor0.col0

Expected: ["81","NULL","NULL"] but got ["0","0","81"]
```


```sql
SELECT ALL CAST ( NULL AS REAL ) FROM tab1, tab0 cor0 GROUP BY cor0.col1

Wrong conversion type
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) col2 FROM tab0 AS cor0 GROUP BY cor0.col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0 GROUP BY cor0.col1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + cor0.col2 col1 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor0.col1, cor0.col2, cor1.col1

Expected: ["58","58","79","79","87","87"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL + cor1.col2 AS col2 FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor1.col2, cor0.col1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - tab2.col2 FROM tab2 GROUP BY tab2.col2 HAVING + col2 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - cor0.col2 * - cor1.col0 col2 FROM tab0 AS cor0 CROSS JOIN tab1 cor1 GROUP BY cor0.col2, cor1.col0

1 results returned but expected 9
```


```sql
SELECT + cor0.col1 - + NULLIF ( cor0.col1, COALESCE ( - cor0.col1, - cor0.col0, cor0.col1 + 52 ) ) FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col0

Expected: ["0","NULL","NULL"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,198 failed
* 58% was OK

Time: 25928.172ms

---- ---- ---- ---- ---- ---- ----
### 171/190 [`./test/random/groupby/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT 49 - - col2 * cor0.col1 FROM tab0 AS cor0 GROUP BY col1, cor0.col2

Expected: ["1993","49","49"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + tab1.col2 AS col1 FROM tab1 GROUP BY col2

Expected: ["45","71","8"] but got ["NULL"]
```


```sql
SELECT 82 * cor0.col1 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["0","6642"] but got ["NULL","NULL"]
```


```sql
SELECT + 82 / 87 FROM tab0 GROUP BY tab0.col2

Expected: ["0","0","0"] but got ["0.943","0.943","0.943"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + 92 AS col2 FROM tab1 AS cor0 GROUP BY cor0.col0, cor0.col0

Expected: ["NULL"] but got ["92"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab1 GROUP BY col1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT CASE cor0.col0 WHEN cor0.col2 * + cor0.col2 THEN cor0.col2 WHEN - 42 / cor0.col2 + cor0.col0 THEN + ( - cor0.col0 ) WHEN - col2 + - cor0.col0 THEN NULL END + NULLIF ( + cor0.col2, + cor0.col0 ) FROM tab0 cor0 GROUP BY cor0.col0, col2

Expected: ["53","NULL","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL - cor1.col1 + cor0.col0 AS col1 FROM tab1 AS cor0 CROSS JOIN tab2 cor1 GROUP BY cor1.col1, cor0.col0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT CAST ( NULL AS REAL ) AS col1 FROM tab2 AS cor0 GROUP BY cor0.col2

Wrong conversion type
```


```sql
SELECT tab1.col2 FROM tab0 AS cor0 CROSS JOIN tab1 GROUP BY tab1.col2 HAVING NOT tab1.col2 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT cor1.col1 + - cor0.col1 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor0.col1, cor1.col1

Expected: ["-41","-59","-61","20","22","40"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - 26 + tab0.col0 AS col0 FROM tab0 GROUP BY tab0.col0

Expected: ["0","17","57"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + tab0.col2 / tab0.col2 FROM tab0 GROUP BY tab0.col2

Expected: ["1"] but got ["NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,465 failed
* 55% was OK

Time: 26527.602ms

---- ---- ---- ---- ---- ---- ----
### 172/190 [`./test/random/groupby/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT ALL - - ( - tab0.col0 ) FROM tab0 GROUP BY tab0.col0

Expected: ["-26","-43","-83"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - 35 FROM tab1 AS cor0 GROUP BY cor0.col0

Expected: ["NULL","NULL","NULL"] but got ["-35","-35","-35"]
```


```sql
SELECT DISTINCT - cor0.col0 * - cor0.col0 AS col1 FROM tab1 cor0 GROUP BY col0

Expected: ["484","6724","784"] but got ["NULL"]
```


```sql
SELECT ALL cor0.col1 + col1 AS col2 FROM tab0 cor0 GROUP BY cor0.col1

Expected: ["0","162"] but got ["NULL","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor1.col0, cor0.col2, cor1.col1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 12 / 68 FROM tab2 GROUP BY tab2.col2

Expected: ["0","0","0"] but got ["0.176","0.176","0.176"]
```


```sql
SELECT ALL - col1 * - CAST ( NULL AS INTEGER ) AS col0 FROM tab0 GROUP BY tab0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT NULLIF ( + 79, + cor0.col2 ) AS col1 FROM tab0 AS cor0 GROUP BY cor0.col2, cor0.col2, cor0.col1

Expected: ["79","79","NULL"] but got ["79","79","79"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) FROM tab1 AS cor0 GROUP BY col1

Wrong conversion type
```


```sql
SELECT + cor1.col1 AS col1 FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor0.col2, cor1.col1

Expected: ["0","0","0","81","81","81"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT tab1.col1 AS col2 FROM tab1 GROUP BY tab1.col1 HAVING NOT ( tab1.col1 ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - + NULLIF ( tab0.col1, + 29 / - 88 ) AS col0 FROM tab0 GROUP BY tab0.col1

Expected: ["-81","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,369 failed
* 56% was OK

Time: 26061.075ms

---- ---- ---- ---- ---- ---- ----
### 173/190 [`./test/random/groupby/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT ALL + tab2.col1 col2 FROM tab2 GROUP BY col1

Expected: ["41","59","61"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT ALL + cor0.col1 AS col2 FROM tab0 AS cor0 GROUP BY cor0.col1, col1

Expected: ["0","81"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - 0 / - cor0.col2 FROM tab2 cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor0.col2

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 GROUP BY col1, cor0.col1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT 3 / + 5 AS col0 FROM tab0 AS cor0 GROUP BY cor0.col0

Expected: ["0","0","0"] but got ["0.600","0.600","0.600"]
```


```sql
SELECT - - CAST ( NULL AS REAL ) AS col2 FROM tab1 GROUP BY tab1.col2

Wrong conversion type
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col1 FROM tab0 GROUP BY tab0.col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - col1 * - CAST ( NULL AS INTEGER ) + - 97 FROM tab0 GROUP BY tab0.col1

Expected: ["NULL","NULL"] but got ["-97","-97"]
```


```sql
SELECT ALL - 90 / - cor1.col0 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor0.col2, cor1.col0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - tab0.col1 AS col2 FROM tab0 GROUP BY tab0.col1 HAVING NOT + tab0.col1 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + cor1.col1 AS col1 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor1.col1, cor0.col2

Expected: ["0","0","0","81","81","81"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) FROM tab2 cor0 GROUP BY cor0.col1, cor0.col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + cor0.col2 * NULLIF ( - cor0.col1, cor0.col1 ) FROM tab0 AS cor0 GROUP BY cor0.col2, cor0.col1

Expected: ["-1944","NULL","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT cor0.col1 * + CASE cor0.col0 / + cor0.col2 WHEN + cor0.col0 / cor0.col0 THEN cor0.col1 * + cor0.col1 WHEN cor0.col0 / - cor0.col0 THEN NULL END FROM tab2 AS cor0 GROUP BY cor0.col1, cor0.col0, cor0.col2

Expected: ["205379","68921","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + cor0.col0 AS col2 FROM tab2 AS cor0 GROUP BY cor0.col0, cor0.col1

Expected: ["15","91","92"] but got ["NULL"]
```


```sql
SELECT DISTINCT NULLIF ( cor0.col1, + cor0.col1 + + cor0.col1 ) AS col0 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["81","NULL"] but got ["NULL"]
```


```sql
SELECT ALL cor0.col2 + col2 AS col1 FROM tab0 cor0 GROUP BY cor0.col1, cor0.col2

Expected: ["158","48","76"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,488 failed
* 55% was OK

Time: 27797.941ms

---- ---- ---- ---- ---- ---- ----
### 174/190 [`./test/random/groupby/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 * - cor0.col0 + cor0.col0 AS col0 FROM tab0 AS cor0 GROUP BY cor0.col0

Expected: ["-1806","-650","-6806"] but got ["NULL"]
```


```sql
SELECT ALL - cor0.col1 AS col0 FROM tab2 AS cor0 GROUP BY col0, cor0.col1, cor0.col1

Expected: ["-41","-59","-61"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT ALL + cor0.col1 * - cor0.col1 FROM tab0 cor0 GROUP BY cor0.col1

Expected: ["-6561","0"] but got ["NULL","NULL"]
```


```sql
SELECT + 92 / + 53 FROM tab2 GROUP BY tab2.col2

Expected: ["1","1","1"] but got ["1.736","1.736","1.736"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab0 cor0 GROUP BY cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab2 cor1 GROUP BY cor1.col1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - CAST ( NULL AS REAL ) FROM tab1 AS cor0 GROUP BY cor0.col0, cor0.col2

Wrong conversion type
```


```sql
SELECT - cor1.col2 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor1.col2, cor0.col0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col1 FROM tab2 AS cor0 GROUP BY cor0.col1, cor0.col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + tab1.col1 FROM tab1 GROUP BY tab1.col1 HAVING tab1.col1 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + cor0.col0 / + cor0.col0 AS col0 FROM tab2 AS cor0 GROUP BY cor0.col0

Expected: ["1"] but got ["NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,625 failed
* 53% was OK

Time: 24104.629ms

---- ---- ---- ---- ---- ---- ----
### 175/190 [`./test/random/groupby/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL + col2 * - cor0.col1 FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col2

Expected: ["-1944","0","0"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT - cor0.col1 AS col2 FROM tab2, tab0 AS cor0 GROUP BY cor0.col1

Expected: ["-81","0"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT cor0.col2 + - cor0.col2 + + cor0.col1 AS col0 FROM tab2 AS cor0 GROUP BY cor0.col2, cor0.col1, cor0.col2

Expected: ["41","59","61"] but got ["NULL"]
```


```sql
SELECT - ( + cor0.col1 * CAST ( NULL AS REAL ) ) + + 69 * col1 AS col2 FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col2

Wrong conversion type
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) AS col1 FROM tab0, tab0 AS cor0, tab0 AS cor1 GROUP BY cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 GROUP BY cor0.col0, col2, cor0.col1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * - 66 FROM tab0 AS cor0 GROUP BY cor0.col2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 GROUP BY cor0.col0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( - cor0.col1 AS INTEGER ) FROM tab1 AS cor0 GROUP BY cor0.col1

Expected: ["-44","-57","-6"] but got ["0","0","0"]
```


```sql
SELECT + cor1.col1 AS col2 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor1.col1, cor0.col2

Expected: ["0","0","0","81","81","81"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT + NULLIF ( - COALESCE ( - cor0.col2, cor0.col1 ), 79 ) / cor0.col2 FROM tab0 cor0 GROUP BY cor0.col2, cor0.col1

Expected: ["1","1","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT ALL tab0.col0 FROM tab0 GROUP BY tab0.col0 HAVING NOT tab0.col0 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT NULLIF ( cor0.col1, - cor0.col1 ) * - col1 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["-6561","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL - tab0.col2 * + 1 AS col0 FROM tab0 GROUP BY col2

Expected: ["-24","-38","-79"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT - NULLIF ( + cor0.col1, cor0.col1 / - 16 ) FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["-81","NULL"] but got ["NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 4,547 failed
* 54% was OK

Time: 29897.149ms

---- ---- ---- ---- ---- ---- ----
### 176/190 [`./test/random/groupby/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT - tab2.col2 / - tab2.col2 AS col1 FROM tab2 GROUP BY col2

Expected: ["1","1","1"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + col1 * cor0.col1 AS col2 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["0","6561"] but got ["NULL"]
```


```sql
SELECT - cor0.col1 * - cor0.col1 FROM tab0 AS cor0 GROUP BY col1

Expected: ["0","6561"] but got ["NULL","NULL"]
```


```sql
SELECT - NULLIF ( cor0.col0, + 26 ) FROM tab0 AS cor0 GROUP BY cor0.col2, cor0.col0

Expected: ["-43","-83","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT + - CAST ( NULL AS REAL ) * + tab0.col2 AS col0 FROM tab0 GROUP BY tab0.col2

Wrong conversion type
```


```sql
SELECT 65 / 40 AS col1 FROM tab1 GROUP BY tab1.col0

Expected: ["1","1","1"] but got ["1.625","1.625","1.625"]
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) AS col0 FROM tab1 GROUP BY tab1.col1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT tab2.col2 FROM tab2 GROUP BY tab2.col2 HAVING NOT ( tab2.col2 ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0 GROUP BY cor0.col0, cor0.col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - 58 * tab0.col0 FROM tab0 GROUP BY tab0.col0

Expected: ["-1508","-2494","-4814"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * 22 AS col0 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL cor0.col2 + - 98 AS col2 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor0.col2, cor1.col2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT cor0.col2 * - ( + cor0.col2 ) AS col2 FROM tab2 cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor1.col1, cor0.col2

Expected: ["-3364","-3364","-6241","-6241","-7569","-7569"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 2,975 failed
* 70% was OK

Time: 24642.162ms

---- ---- ---- ---- ---- ---- ----
### 177/190 [`./test/random/groupby/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT col1 AS col1 FROM tab1 GROUP BY col1 HAVING col1 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT col0, - col0 AS col0 FROM tab0 AS cor0 GROUP BY col0, col2

Expected: ["26","-26","43","-43","83","-83"] but got ["26","43","83"]
```


```sql
SELECT DISTINCT + cor0.col0 * 74 FROM tab0 AS cor0 GROUP BY cor0.col0

Expected: ["1924","3182","6142"] but got ["NULL"]
```


```sql
SELECT + cor0.col2 * 38 AS col1 FROM tab2, tab0 AS cor0 GROUP BY cor0.col2

Expected: ["1444","3002","912"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT 67 + 43 * cor0.col1 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["3550","67"] but got ["NULL","NULL"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 GROUP BY cor0.col0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT * FROM tab1 cor0 GROUP BY cor0.col0, cor0.col2, cor0.col1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * 93 FROM tab1 AS cor0 GROUP BY cor0.col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( NULL AS REAL ) * ( + cor0.col0 ) FROM tab2 AS cor0 GROUP BY cor0.col1, cor0.col2, cor0.col0

Wrong conversion type
```


```sql
SELECT ALL col2 AS col1, - AVG ( - col2 ) AS col1, - col2 AS col1 FROM tab0 AS cor0 GROUP BY col2

3 results returned but expected 9
```

#### ☓ Ran 10,012 tests as _sqlite_

* 503 failed
* 94% was OK

Time: 25792.024ms

---- ---- ---- ---- ---- ---- ----
### 178/190 [`./test/random/select/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0 cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0

18 results returned but expected 54
```


```sql
SELECT - col2 / - col0 - + 69 AS col0 FROM tab1 AS cor0

Expected: ["-51","-68","-69"] but got ["-51","-67.800","-68.109"]
```


```sql
SELECT DISTINCT + col0 + col1 / CAST ( NULL AS REAL ) + - col1 FROM tab1 AS cor0

Wrong conversion type
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT + 63 - 48 * col0 * + CAST ( NULL AS INTEGER ) FROM tab0 cor0

Expected: ["NULL"] but got ["63"]
```


```sql
SELECT * FROM tab0 WHERE NOT ( - col2 * + col0 ) IN ( - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,572 failed
* 84% was OK

Time: 25338.036ms

---- ---- ---- ---- ---- ---- ----
### 179/190 [`./test/random/select/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL col2 + - CAST ( NULL AS REAL ) AS col1 FROM tab1 AS cor0

Wrong conversion type
```


```sql
SELECT - col2 + + ( 69 ) / - col2 FROM tab1 AS cor0

Expected: ["-55","-58","-96"] but got ["-55.278","-58.211","-96.719"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 cor0, tab0 AS cor1

27 results returned but expected 243
```


```sql
SELECT + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) FROM tab0, tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab0, tab1, tab2 AS cor0, tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT col0 FROM tab1 WHERE NOT ( col0 ) IN ( + col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,338 failed
* 86% was OK

Time: 23577.029ms

---- ---- ---- ---- ---- ---- ----
### 180/190 [`./test/random/select/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col2 * + tab0.col1 + - col0 / - col1 FROM tab0

Expected: ["2838","7462","97"] but got ["2838.279","7462.978","97.361"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + + col2 + col0 AS col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["171","36","57"]
```


```sql
SELECT CAST ( col1 AS REAL ) + - tab1.col0 FROM tab1

Wrong conversion type
```


```sql
SELECT * FROM tab1, tab0 AS cor0, tab0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * col0 AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL 86 FROM tab2 cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0, tab2 AS cor1, tab1, tab0 AS cor2

45 results returned but expected 3645
```


```sql
SELECT * FROM tab1 WHERE NOT ( col1 ) IN ( col2 + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) - - col2 * - col2 * + 3 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["-2028","-2187","-4332"]
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,291 failed
* 87% was OK

Time: 24792.810ms

---- ---- ---- ---- ---- ---- ----
### 181/190 [`./test/random/select/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT 40 + ( - col2 ) * CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["40","40","40"]
```


```sql
SELECT ALL cor0.col0 + 94 / col2 FROM tab1 AS cor0

Expected: ["4","65","80"] but got ["4.741","65.649","80.979"]
```


```sql
SELECT DISTINCT * FROM tab2, tab1 AS cor0, tab0, tab2 AS cor1

36 results returned but expected 972
```


```sql
SELECT + CAST ( NULL AS REAL ) * col2 AS col2 FROM tab1 AS cor0

Wrong conversion type
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col1 FROM tab2, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * - ( + col2 ) * col2 + ( col1 * - col1 ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["-7396","-8281","-9409"]
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT + col1 IN ( col0 + col0 * col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,011 tests as _sqlite_

* 1,258 failed
* 87% was OK

Time: 23681.307ms

---- ---- ---- ---- ---- ---- ----
### 182/190 [`./test/random/select/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) * - col1 col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + 60 / ( tab0.col0 + 64 ) FROM tab0

Expected: ["0","0","0"] but got ["0.392","0.606","0.682"]
```


```sql
SELECT ALL * FROM tab1, tab1 cor0, tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col2 * + CAST ( col0 AS REAL ) + + col1 AS col0 FROM tab1 cor0

Wrong conversion type
```


```sql
SELECT DISTINCT - col2 * - CAST ( NULL AS INTEGER ) AS col2 FROM tab2 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab2, tab1 AS cor1, tab0 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1

18 results returned but expected 54
```


```sql
SELECT ALL * FROM tab1 WHERE NOT + col0 NOT BETWEEN + col1 / - col2 AND col2

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,011 tests as _sqlite_

* 1,317 failed
* 86% was OK

Time: 25007.940ms

---- ---- ---- ---- ---- ---- ----
### 183/190 [`./test/random/select/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0, tab0 cor0, tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + col1 / - 99 AS col1 FROM tab0

Expected: ["0"] but got ["-0.869","-0.919","-0.980"]
```


```sql
SELECT CAST ( 24 + - col2 AS REAL ) AS col0 FROM tab2

Wrong conversion type
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab0 cor1

18 results returned but expected 54
```


```sql
SELECT + col1 - - CAST ( NULL AS INTEGER ) * col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["10","13","26"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + + col2 * col1 / 84 FROM tab2 AS cor0

Expected: ["NULL"] but got ["18.262","7.690","9.964"]
```


```sql
SELECT ALL * FROM tab0, tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT ALL - col0 * + col1 AS col2 FROM tab2 WHERE NOT - col1 * tab2.col1 IN ( col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,323 failed
* 86% was OK

Time: 30203.790ms

---- ---- ---- ---- ---- ---- ----
### 184/190 [`./test/random/select/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT + col0 / - col1 + - ( - col2 ) col0 FROM tab2 AS cor0

Expected: ["25","27","34"] but got ["24.678","26.774","33.353"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab1, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT col2 + + col2 / + CAST ( NULL AS REAL ) FROM tab0

Wrong conversion type
```


```sql
SELECT ALL 43 FROM tab0 AS cor0 CROSS JOIN tab1, tab2 AS cor1, tab1 AS cor2, tab1 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0, tab0 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + 35 FROM tab2 AS cor0

Expected: ["NULL"] but got ["35"]
```


```sql
SELECT ALL tab2.col1 * tab2.col0 FROM tab2 WHERE NOT ( + col0 ) IN ( col1 + + col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,345 failed
* 86% was OK

Time: 22792.686ms

---- ---- ---- ---- ---- ---- ----
### 185/190 [`./test/random/select/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col2 * cor0.col0 * col0 IN ( cor0.col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - col0 / col2 FROM tab0 AS cor0

Expected: ["-1","-35","0"] but got ["-0.727","-1.085","-35"]
```


```sql
SELECT ALL * FROM tab0, tab1 AS cor0, tab0 AS cor1, tab1 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab2 AS cor1, tab0 AS cor2

36 results returned but expected 972
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + cor0.col2 AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["1","33","82"]
```


```sql
SELECT - + cor0.col1 / CAST ( - col1 AS REAL ) FROM tab2 AS cor0

Wrong conversion type
```


```sql
SELECT DISTINCT col0 + CAST ( NULL AS INTEGER ) / col0 FROM tab0 cor0

Expected: ["NULL"] but got ["24","35","89"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,283 failed
* 87% was OK

Time: 36043.689ms

---- ---- ---- ---- ---- ---- ----
### 186/190 [`./test/random/select/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT col0 / col2 AS col1 FROM tab0

Expected: ["0","1","35"] but got ["0.727","1.085","35"]
```


```sql
SELECT ALL * FROM tab0, tab1 AS cor0, tab0 cor1, tab2 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - 77 + - col2 * CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["-77","-77","-77"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab1, tab2 AS cor1

36 results returned but expected 972
```


```sql
SELECT - 46 col1 FROM tab1 cor0 CROSS JOIN tab2, tab0 cor1, tab2 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 cor1, tab2 co
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'S…
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) - + col0 FROM tab0

Expected: ["NULL"] but got ["-24","-35","-89"]
```


```sql
SELECT ALL + CAST ( - col0 AS REAL ) * col2 * ( col0 ) col0 FROM tab0

Wrong conversion type
```


```sql
SELECT - col2 + col0 + - col1 * + col2 FROM tab2 WHERE NOT col2 + - col1 + + col0 BETWEEN col2 + + col2 AND ( - col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,012 tests as _sqlite_

* 1,322 failed
* 86% was OK

Time: 24202.927ms

---- ---- ---- ---- ---- ---- ----
### 187/190 [`./test/random/select/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT + ( - col0 ) + - col2 * CAST ( - 77 AS REAL ) FROM tab1 AS cor0

Wrong conversion type
```


```sql
SELECT + col0 / col2 + + col1 FROM tab0 cor0

Expected: ["132","86","92"] but got ["132","86.727","92.085"]
```


```sql
SELECT ALL * FROM tab0, tab2, tab1 cor0, tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + 91 * + cor0.col1 * - 95 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-146965","-267995","-510055"]
```


```sql
SELECT - cor0.col0 + + CAST ( NULL AS INTEGER ) FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["-24","-35","-89"]
```


```sql
SELECT * FROM tab1, tab1 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', …
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab1 cor1, tab2 AS cor2

36 results returned but expected 972
```


```sql
SELECT * FROM tab1 WHERE NOT - col2 * col2 + - col1 IN ( col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10,010 tests as _sqlite_

* 1,295 failed
* 87% was OK

Time: 27512.752ms

---- ---- ---- ---- ---- ---- ----
### 188/190 [`./test/select1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select1.test)

#### ★ Assuming all 1,031 tests still passes as _sqlite_

Time: 0.675ms

---- ---- ---- ---- ---- ---- ----
### 189/190 [`./test/select2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select2.test)

_Mimic sqlite_

```sql
SELECT a, (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b), a+b*2+c*3+d*4+e*5, d FROM t1 WHERE a IS NULL

Expected: ["NULL","1","NULL","114","NULL","18","NULL","207"] but got ["NULL","18","NULL","207","NULL","1","NULL","114"]
```


```sql
SELECT e, a, (SELECT count(*) FROM t1 AS x WHERE x.c>t1.c AND x.d<t1.d) FROM t1 WHERE EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b) AND d NOT BETWEEN 110 AND 150

60 results returned but expected 42
```


```sql
SELECT (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b), c-d, CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222 WHEN a<b+3 THEN 333 ELSE 444 END, a+b*2+c*3+d*4+e*5, a-b, CASE WHEN c>(SELECT avg(c) FROM t1) THEN a*2 ELSE b*10 END, b FROM t1

Correct amount of values returned but hash was different than expected.
```

#### ☓ Ran 1,031 tests as _sqlite_

* 104 failed
* 89% was OK

Time: 11224.017ms

---- ---- ---- ---- ---- ---- ----
### 190/190 [`./test/select3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select3.test)

_Mimic sqlite_

```sql
SELECT d-e, c-d, (a+b+c+d+e)/5 FROM t1 WHERE d NOT BETWEEN 110 AND 150 OR e+d BETWEEN a+b-10 AND c+130 OR b>c

81 results returned but expected 72
```


```sql
SELECT (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b), CASE a+1 WHEN b THEN 111 WHEN c THEN 222 WHEN d THEN 333 WHEN e THEN 444 ELSE 555 END, a+b*2+c*3+d*4+e*5, a-b, abs(a), d FROM t1 WHERE (c<=d-2 OR c>=d+2) OR c BETWEEN b-2 AND d+2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT e FROM t1 WHERE b>c AND d NOT BETWEEN 110 AND 150 AND a>b

Expected: ["197","227","230"] but got ["157","165","197","227","230","NULL"]
```


```sql
SELECT c FROM t1 WHERE (a>b-2 AND a<b+2) AND d NOT BETWEEN 110 AND 150

Expected: ["184","195","225"] but got ["155","166","184","195","225"]
```

#### ☓ Ran 3,351 tests as _sqlite_

* 358 failed
* 89% was OK

Time: 41612.974ms

-----------------------------

## Final result

* Total tested: 1,007,187
* Failed tests: 114,412
* Skipped tests: 53,316
* Assumed still OK: 676,454
* Final score: 90 % was OK

Total script time: 8254745.990ms

_Please note that repetetive errors are not always printed again_

