# SQLlogictest results for alasql@0.2.2-pre-develop+151231.53429

_2015-12-31T14:27:57.305Z_

This is a subset of the total 622 tests.
Results from 125 test files:

---- ---- ---- ---- ---- ---- ----
### 1/125 [`./test/evidence/in1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in1.test)

_Mimic sqlite_

```sql
SELECT 1 IN t1

Cannot read property 't1' of undefined
```


```sql
SELECT 1 IN (SELECT * FROM t1)

context is not defined
```


```sql
SELECT 4 IN t4n

Cannot read property 't4n' of undefined
```


```sql
SELECT 2 NOT IN (SELECT * FROM t4n)

Expected: ["0"] but got ["1"]
```


```sql
SELECT 1 IN (2,3,4,null)

Expected: ["NULL"] but got ["0"]
```

#### ☓ Ran 214 tests as sqlite

* 143 failed
* 33% was OK

Time: 1954ms

---- ---- ---- ---- ---- ---- ----
### 2/125 [`./test/evidence/in2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in2.test)

_Mimic sqlite_

```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1)

context is not defined
```

#### ☓ Ran 53 tests as sqlite

* 1 failed
* 98% was OK

Time: 671ms

---- ---- ---- ---- ---- ---- ----
### 3/125 [`./test/evidence/slt_lang_aggfunc.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_aggfunc.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 81 tests as sqlite

* 76 skipped
* 1 failed
* 4% was OK

Time: 111ms

---- ---- ---- ---- ---- ---- ----
### 4/125 [`./test/evidence/slt_lang_createtrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createtrigger.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 28 tests as sqlite

* 23 skipped
* 1 failed
* 14% was OK

Time: 50ms

---- ---- ---- ---- ---- ---- ----
### 5/125 [`./test/evidence/slt_lang_createview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createview.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 25 tests as sqlite

* 20 skipped
* 1 failed
* 16% was OK

Time: 45ms

---- ---- ---- ---- ---- ---- ----
### 6/125 [`./test/evidence/slt_lang_dropindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropindex.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8 tests as sqlite

* 3 skipped
* 1 failed
* 50% was OK

Time: 24ms

---- ---- ---- ---- ---- ---- ----
### 7/125 [`./test/evidence/slt_lang_droptable.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptable.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12 tests as sqlite

* 7 skipped
* 1 failed
* 33% was OK

Time: 22ms

---- ---- ---- ---- ---- ---- ----
### 8/125 [`./test/evidence/slt_lang_droptrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptrigger.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 14 tests as sqlite

* 9 skipped
* 1 failed
* 28% was OK

Time: 29ms

---- ---- ---- ---- ---- ---- ----
### 9/125 [`./test/evidence/slt_lang_dropview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropview.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 13 tests as sqlite

* 8 skipped
* 1 failed
* 30% was OK

Time: 27ms

---- ---- ---- ---- ---- ---- ----
### 10/125 [`./test/evidence/slt_lang_reindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_reindex.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11 tests as sqlite

* 6 skipped
* 1 failed
* 36% was OK

Time: 21ms

---- ---- ---- ---- ---- ---- ----
### 11/125 [`./test/evidence/slt_lang_replace.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_replace.test)

_Mimic sqlite_

```sql
SELECT x, y FROM t1 WHERE x=4

Query was expected to return results (but did not) 
```

#### ☓ Ran 14 tests as sqlite

* 1 failed
* 92% was OK

Time: 87ms

---- ---- ---- ---- ---- ---- ----
### 12/125 [`./test/evidence/slt_lang_update.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_update.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i1 ON t1(x)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 27 tests as sqlite

* 22 skipped
* 1 failed
* 14% was OK

Time: 32ms

---- ---- ---- ---- ---- ---- ----
### 13/125 [`./test/index/between/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col4 BETWEEN 6.51 AND 4.36) AND ((((col4 > 1.61)))) OR (col0 > 5) AND col0 > 9 OR col1 > 4.37 OR (col3 <= 4 AND col3 < 3 AND col0 >= 6) AND col1 = 3.2

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col4 IN (5.85,5.95,6.30,0.0,1.27) AND (col4 IN (9.41,4.56,2.55,0.83,3.95,6.92) AND (col1 = 6.24)) OR col0 IN (SELECT col3 FROM tab0 WHERE (((((col0 IN (8,1) AND col0 IS NULL AND col1 < 9.21) AND col4 > 8.64 AND (col3 >= 9) OR col0 < 5)))))) AND (col1 < 7.95 OR col0 < 0) AND col3 >= 9 AND col0 < 2 OR col4 BETWEEN 1.13 AND 0.71 AND (col3 > 9) AND (col0 < 3)

context is not defined
```

#### ☓ Ran 10022 tests as sqlite

* 3396 failed
* 66% was OK

Time: 217263ms

---- ---- ---- ---- ---- ---- ----
### 14/125 [`./test/index/between/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 > 23 AND ((col0 <= 96)) OR (col3 >= 39) OR col1 < 11.32 AND col1 BETWEEN 5.32 AND 81.71 OR col0 <= 45 OR col4 >= 76.74 OR (col1 <= 49.6)

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col4 IN (SELECT col1 FROM tab0 WHERE (col1 > 13.14) AND (col3 < 54 AND col0 = 24) OR (col1 < 65.83 OR ((col1 BETWEEN 55.69 AND 90.94)) AND (col3 = 81) AND (col3 > 78)))

context is not defined
```


```sql
SELECT pk FROM tab4 WHERE ((((col1 < 41.89)) OR col0 IS NULL OR (col0 > 71) AND ( col0 >= 66 AND col0 <= 80) AND col4 > 41.10))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab1 WHERE col1 BETWEEN 57.68 AND 81.10

Query was expected to return results (but did not) 
```

#### ☓ Ran 10033 tests as sqlite

* 5366 failed
* 46% was OK

Time: 280706ms

---- ---- ---- ---- ---- ---- ----
### 15/125 [`./test/index/between/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col4 BETWEEN 57.93 AND 43.23 OR ((col3 > 27) AND (col3 >= 59))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 = 46 OR col0 <= 11 AND (col3 < 66) AND col4 < 3.81 OR (col3 < 45) OR col3 = 24 OR col3 < 65 OR (((col1 IN (SELECT col4 FROM tab0 WHERE col3 = 93) OR col0 > 29) AND ((col3 > 65)) OR (col0 > 0) OR (col1 >= 6.23) AND (col0 < 32 AND col3 >= 67) AND (((col0 > 40)) OR col1 > 46.72) OR col1 < 73.29 AND (col0 IS NULL) AND col3 > 71 AND (col4 IS NULL))) AND col0 = 58 AND ((c…

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE col4 < 38.9 AND (col3 <= 61 OR col3 IN (86,41,43,31,41,69) AND (col1 IN (56.54,54.56) AND col0 IS NULL) OR ((col3 > 91 AND (col0 >= 11 AND (col3 >= 46)) AND col4 < 17.57)) OR (col0 >= 24) AND col3 > 26 OR (col3 > 37 OR col0 IS NULL) AND col3 <= 31 OR col0 = 92 OR ((col0 < 75 AND (col0 = 18) OR ((col0 > 44 OR col4 > 12.84) OR (col0 IS NULL)) AND ((col3 = 23) OR col4 IN (S…

Query was expected to return results (but did not) 
```

#### ☓ Ran 10029 tests as sqlite

* 5240 failed
* 47% was OK

Time: 198130ms

---- ---- ---- ---- ---- ---- ----
### 16/125 [`./test/index/between/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col3 < 42 AND ((col1 <= 42.72)) OR col3 BETWEEN 35 AND 41 AND col4 >= 38.48))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 = 58 AND (col3 BETWEEN 3 AND 52 AND col0 IN (SELECT col3 FROM tab0 WHERE ((col0 < 22 OR col3 >= 66 OR col3 > 41)))) AND (((col0 IN (91,11,67,84,35,45) AND col3 < 27)) AND ((col3 IN (75,51,70)) OR col0 > 19)) AND (((col0 > 68))) AND col0 IS NULL AND (col1 < 77.50 OR (col1 < 78.65) AND col4 < 54.80) OR col4 > 40.35

context is not defined
```


```sql
SELECT pk FROM tab4 WHERE col1 = 24.12 AND col1 >= 27.78 OR (col0 < 21 OR (col1 > 15.34)) OR (col3 < 66 OR (((col1 IN (13.68,87.75) OR (col3 >= 11 AND col0 >= 6 OR col4 < 0.93 OR (col3 <= 41) AND ((col3 <= 20 AND ((((col1 < 39.84)) AND (col3 IN (46,88)) OR (col3 > 12))) AND col4 >= 19.45 AND ((col0 < 51) AND col1 <= 81.3 OR (col3 > 27 OR col0 >= 12 OR (col3 >= 79 AND col4 >= 66.52 AND ((((((col0 …

Query was expected to return results (but did not) 
```

#### ☓ Ran 10032 tests as sqlite

* 5344 failed
* 46% was OK

Time: 175958ms

---- ---- ---- ---- ---- ---- ----
### 17/125 [`./test/index/between/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 <= 57 OR col1 IN (SELECT col4 FROM tab0 WHERE col3 = 43 AND col1 BETWEEN 62.29 AND 69.68 AND ((col0 >= 69 AND col0 IS NULL)) AND (col1 > 67.93 AND col3 > 99 OR col3 > 30 AND (col3 < 80) AND (col0 >= 88))) AND col3 < 78) OR col3 < 43

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE (col0 <= 57 OR col1 IN (SELECT col4 FROM tab1 WHERE col3 = 43 AND col1 BETWEEN 62.29 AND 69.68 AND ((col0 >= 69 AND col0 IS NULL)) AND (col1 > 67.93 AND col3 > 99 OR col3 > 30 AND (col3 < 80) AND (col0 >= 88))) AND col3 < 78) OR col3 < 43

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab4 WHERE col3 < 57 AND (col0 > 91 OR (( col0 >= 80 AND col0 <= 82))) OR (((col3 IS NULL))) OR ((col0 >= 24) OR (col4 <= 61.24)) OR col1 <= 35.13 OR (((col3 IS NULL) AND col0 >= 82 AND col3 <= 22 OR col0 IN (62,5,26,54,22,40) OR col0 > 14 OR col3 > 51 OR ((col1 IS NULL AND col0 < 68)) OR (((col0 > 59))) AND ((col4 IN (SELECT col1 FROM tab4 WHERE col0 <= 68 AND col4 > 57.68))) OR (…

Query was expected to return results (but did not) 
```

#### ☓ Ran 10032 tests as sqlite

* 5382 failed
* 46% was OK

Time: 210190ms

---- ---- ---- ---- ---- ---- ----
### 18/125 [`./test/index/between/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col1 > 7.83)) AND (((col0 BETWEEN 41 AND 20 AND col1 < 97.72 OR col0 >= 25 OR (col0 > 59)))) OR col3 >= 35

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE (((col0 BETWEEN 33 AND 1))))

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE (col1 <= 0.14 AND (col1 < 88.23 AND col0 BETWEEN 44 AND 86) AND col0 = 47 OR col3 <= 49 OR col3 > 11 AND (((col1 <= 44.92) OR col3 IN (42,13,27,55,69,60) AND col4 > 13.37 AND (col3 > 53) OR col0 IS NULL OR ((col0 >= 74)))) OR col1 < 17.22 AND col3 > 10 AND col3 > 34 AND ((col1 > 69.50)) OR ((col0 > 83)))

Query was expected to return results (but did not) 
```

#### ☓ Ran 10032 tests as sqlite

* 5214 failed
* 48% was OK

Time: 209339ms

---- ---- ---- ---- ---- ---- ----
### 19/125 [`./test/index/between/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col1 > 93.39)) AND col0 <= 43 OR col0 BETWEEN 55 AND 59 OR (((col3 < 6 OR col4 > 71.3)) AND col0 < 24 OR col1 > 74.36 OR col1 >= 19.10 AND col4 <= 52.51 OR (((col0 < 69) AND col1 IS NULL OR (col3 > 27) AND col1 < 51.86)) OR col0 IN (89) OR col3 = 80 OR col0 < 30 OR ((col1 = 70.19 OR ((col3 > 6 OR col3 < 97 OR ((col1 < 16.69)))) AND (col1 > 64.72 AND col0 >= 63))) OR (c…

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col4 < 53.2 OR (col3 IN (SELECT col0 FROM tab0 WHERE col3 >= 21)) OR col3 >= 24)) OR (col0 > 91) AND (col1 BETWEEN 12.41 AND 14.37) AND (col3 > 76) AND col1 <= 32.8 OR col1 < 61.7

context is not defined
```


```sql
SELECT pk FROM tab2 WHERE (( col0 >= 15 AND col0 <= 76)) OR ((col1 > 39.37) AND col3 >= 5 OR col3 = 79)

Query was expected to return results (but did not) 
```

#### ☓ Ran 10031 tests as sqlite

* 5320 failed
* 46% was OK

Time: 166897ms

---- ---- ---- ---- ---- ---- ----
### 20/125 [`./test/index/commute/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col1 < 71.25)) OR (col3 IN (53,42,27,44) OR (col3 IS NULL)) AND (col0 >= 42)

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((((col4 < 26.48))) AND col4 IN (SELECT col1 FROM tab0 WHERE (col3 < 55 OR ((col0 >= 53 AND (((((col0 > 8) AND (((col3 IN (SELECT col0 FROM tab0 WHERE col0 < 65 AND col1 > 42.32)) OR col1 IS NULL OR col3 > 84 OR (col4 IS NULL)) OR ((col0 <= 9))))) AND col0 IN (1))) OR col3 >= 2 OR ((col1 IS NULL)) AND col0 >= 55 OR col0 > 24 AND col0 > 63 OR col3 = 90))))) OR (col4 = 86.…

context is not defined
```


```sql
SELECT pk FROM tab3 WHERE col0 <= 13

Query was expected to return results (but did not) 
```

#### ☓ Ran 10034 tests as sqlite

* 6168 failed
* 38% was OK

Time: 67506ms

---- ---- ---- ---- ---- ---- ----
### 21/125 [`./test/index/commute/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE col1 BETWEEN 33.32 AND 54.30 AND (col3 < 29) OR col0 IN (SELECT col3 FROM tab0 WHERE col1 >= 86.23) AND (col4 < 42.46) OR col1 = 74.64

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE (col0 <= 12 AND (col3 IS NULL)) OR col0 < 68

Query was expected to return results (but did not) 
```

#### ☓ Ran 10030 tests as sqlite

* 6076 failed
* 39% was OK

Time: 71687ms

---- ---- ---- ---- ---- ---- ----
### 22/125 [`./test/index/commute/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col4 > 94.74

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col3 > 19 AND ((col4 >= 85.9) OR col4 > 25.21) OR col3 > 31 OR col3 > 94) AND (((col3 IN (SELECT col0 FROM tab0 WHERE col1 > 96.78 OR ((col0 BETWEEN 21 AND 0 AND ((col3 >= 86 OR (((col4 <= 66.71))) OR (((col4 = 16.26) OR col4 IS NULL)) AND ((col1 >= 74.85)) AND (col4 IS NULL) AND ((((col0 > 27))) AND col3 > 49 AND (col4 <= 29.6 AND col3 < 4) AND col0 BETWEEN 53 AND 43) …

context is not defined
```


```sql
SELECT pk FROM tab2 WHERE col3 IS NULL OR (((13 < col0 OR 87 > col0 AND (22.34 <= col4))) OR 65.67 < col1) OR (66 <= col3 AND 83 > col0)

Query was expected to return results (but did not) 
```

#### ☓ Ran 10037 tests as sqlite

* 5974 failed
* 40% was OK

Time: 73432ms

---- ---- ---- ---- ---- ---- ----
### 23/125 [`./test/index/commute/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col1 >= 93.90 OR (col0 > 5) OR col4 > 57.41 AND (col1 < 1.49) OR col0 < 59 OR col4 < 33.12 AND (col3 < 90 AND col3 >= 68) AND col3 >= 35

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col0 >= 8) OR (col0 IN (SELECT col3 FROM tab0 WHERE (((col4 < 80.50) OR (col0 >= 42 AND col1 < 22.93 OR (col0 > 31) AND col0 IS NULL) OR (col4 <= 77.12 AND col1 BETWEEN 27.91 AND 9.60) AND col3 < 16 AND ((col1 < 84.70)) AND (col4 > 58.11) AND ((col3 > 62 AND col0 < 16))))) AND (col3 > 93) OR col0 IS NULL) OR col3 <= 56 OR col0 BETWEEN 24 AND 36 OR col4 IN (18.24,84.20)

context is not defined
```

#### ☓ Ran 10032 tests as sqlite

* 6094 failed
* 39% was OK

Time: 77820ms

---- ---- ---- ---- ---- ---- ----
### 24/125 [`./test/index/commute/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col3 >= 5)

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col3 > 71) OR (((col1 IN (SELECT col4 FROM tab0 WHERE (col0 >= 47 OR col0 > 88 AND col3 <= 3 OR ((((col0 >= 82))) AND (col0 = 42 AND (col0 = 92 AND col0 < 54 OR col0 > 96)) AND col3 > 8 OR col4 > 35.19))) AND ((col0 > 33 AND (col0 <= 47 OR col0 < 70 AND (col3 > 74) AND col0 > 65 AND col1 > 59.56 OR (col4 < 70.94) OR (col4 >= 3.14) OR col3 IS NULL AND col1 < 22.22 AND ((…

context is not defined
```

#### ☓ Ran 10030 tests as sqlite

* 5648 failed
* 43% was OK

Time: 79330ms

---- ---- ---- ---- ---- ---- ----
### 25/125 [`./test/index/commute/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col1 > 17.98) OR ((col0 >= 40))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col1 IN (SELECT col4 FROM tab0 WHERE (col1 >= 3.89 OR (col3 >= 23 AND col1 > 10.55 OR col0 > 8) OR col3 > 54)) OR (col4 < 32.54 OR col3 < 89 AND col0 <= 44 OR col1 > 48.52 AND (((col0 < 84))))))

context is not defined
```


```sql
SELECT pk FROM tab3 WHERE (5.17 < col1)

Query was expected to return results (but did not) 
```

#### ☓ Ran 10032 tests as sqlite

* 5728 failed
* 42% was OK

Time: 75772ms

---- ---- ---- ---- ---- ---- ----
### 26/125 [`./test/index/commute/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col0 IS NULL) OR (col1 >= 7.87))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col3 = 15 AND col1 < 71.6)) AND (col0 >= 48) AND col1 > 48.67 OR (col3 >= 33) AND col3 IN (SELECT col0 FROM tab0 WHERE col3 IS NULL) AND col1 >= 99.23

context is not defined
```


```sql
SELECT pk FROM tab2 WHERE ((61.99 > col1))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab2 WHERE ((col0 < 99 OR col1 > 3.42 OR (((col0 >= 29 OR (col3 IS NULL) AND col0 >= 74 AND (col0 > 43 OR col0 <= 83 OR (col3 IS NULL)) AND col3 < 68))) OR col0 > 69 AND col3 IS NULL AND (col1 IN (88.53,10.38,62.27,54.12)) AND (col0 < 84) AND (col4 IN (2.6,70.84))) OR col0 >= 93 AND (((col0 > 27) OR (col1 IN (26.26,77.89,52.51,4.3,24.33,84.13) AND (col1 IS NULL) AND col0 <= 26 OR (…

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab4 WHERE (col4 > 8.3 OR col1 > 65.55 AND ((col4 IN (47.20,85.53,97.59) AND ((col3 < 34)))))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab1 WHERE col3 <= 19 OR col4 < 33.16

Query was expected to return results (but did not) 
```

#### ☓ Ran 10036 tests as sqlite

* 5316 failed
* 47% was OK

Time: 83162ms

---- ---- ---- ---- ---- ---- ----
### 27/125 [`./test/index/commute/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col1 >= 73.70 AND col0 >= 49 OR col4 < 43.15 OR ((col3 = 20 OR col0 < 48))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col1 = 35.92 AND col4 < 7.27)) AND col0 IN (SELECT col3 FROM tab0 WHERE ((col4 < 6.3 AND col0 >= 22))) OR ((col3 < 83 AND (col3 IS NULL AND (col0 > 86)) AND col1 <= 91.73 AND ((col3 IS NULL)) OR col4 IS NULL OR (col1 <= 61.73 OR (col1 IN (SELECT col4 FROM tab0 WHERE col0 > 75)) OR (((col4 IN (45.62,97.82,92.85,39.41) AND ((col0 < 71)) AND col3 > 50)) AND col1 > 30.30 O…

context is not defined
```

#### ☓ Ran 10034 tests as sqlite

* 5552 failed
* 44% was OK

Time: 74772ms

---- ---- ---- ---- ---- ---- ----
### 28/125 [`./test/index/commute/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col1 > 17.65

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (((col0 < 53 OR col0 IN (SELECT col3 FROM tab0 WHERE col4 >= 74.91) AND ((col0 > 54 AND ((col0 < 16 AND col4 IS NULL OR col3 < 91 AND col0 >= 12 OR col3 >= 14 OR col3 < 36 AND (((((col3 <= 26 AND (col3 IN (SELECT col0 FROM tab0 WHERE (col1 IS NULL AND col1 IN (74.63,32.73)))) OR (col1 IS NULL))) OR col3 < 99 OR col0 BETWEEN 74 AND 82))) AND (col0 > 36 AND ((col3 >= 15) A…

context is not defined
```


```sql
SELECT pk FROM tab4 WHERE 84.36 > col1

Query was expected to return results (but did not) 
```

#### ☓ Ran 10032 tests as sqlite

* 5792 failed
* 42% was OK

Time: 87631ms

---- ---- ---- ---- ---- ---- ----
### 29/125 [`./test/index/commute/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 > 29 AND (col3 <= 76) AND col3 <= 11 AND col1 > 15.46 OR col4 < 21.97 OR col4 IS NULL OR col3 > 18 OR (col3 IN (40,81,67)) OR col4 > 79.39

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 IN (SELECT col3 FROM tab0 WHERE col3 < 92)

context is not defined
```

#### ☓ Ran 10034 tests as sqlite

* 5438 failed
* 45% was OK

Time: 83890ms

---- ---- ---- ---- ---- ---- ----
### 30/125 [`./test/index/delete/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT ((col0 > 5 AND col4 < 1.46 AND col3 <= 3 AND (((col0 <= 2 AND ((col3 > 2 OR col1 IN (0.65,5.48,6.60) AND (col1 < 7.35) AND ((col3 < 0) OR (((col1 > 5.97)))) OR col1 >= 4.0))) AND col4 IN (1.62,7.48,3.46,8.30,1.17))) AND (col1 > 5.40) AND col4 = 2.53))

Query was expected to return results (but did not) 
```

#### ☓ Ran 10907 tests as sqlite

* 820 failed
* 92% was OK

Time: 45461ms

---- ---- ---- ---- ---- ---- ----
### 31/125 [`./test/index/delete/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT ((col0 > 68))

Query was expected to return results (but did not) 
```

#### ☓ Ran 10730 tests as sqlite

* 1348 failed
* 87% was OK

Time: 48259ms

---- ---- ---- ---- ---- ---- ----
### 32/125 [`./test/index/delete/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT (col1 > 22.17 OR (col0 > 6 AND col1 > 29.22) AND col0 <= 78 AND col0 < 65)

Query was expected to return results (but did not) 
```

#### ☓ Ran 10774 tests as sqlite

* 1316 failed
* 87% was OK

Time: 46624ms

---- ---- ---- ---- ---- ---- ----
### 33/125 [`./test/index/delete/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT (col0 > 82)

Query was expected to return results (but did not) 
```

#### ☓ Ran 9390 tests as sqlite

* 1164 failed
* 87% was OK

Time: 47474ms

---- ---- ---- ---- ---- ---- ----
### 34/125 [`./test/index/delete/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT (col1 < 58.33 OR (((col3 <= 45 AND col3 BETWEEN 34 AND 27 OR col0 >= 81 AND col1 = 84.30 OR (col0 > 6 OR (col3 <= 52) OR col1 < 43.21)) AND col3 > 52 OR col1 < 82.89 AND col0 >= 11 AND col3 < 62 OR ((col4 IS NULL)))))

Query was expected to return results (but did not) 
```

#### ☓ Ran 10065 tests as sqlite

* 1192 failed
* 88% was OK

Time: 46126ms

---- ---- ---- ---- ---- ---- ----
### 35/125 [`./test/index/delete/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT (col4 > 74.32)

Query was expected to return results (but did not) 
```

#### ☓ Ran 10599 tests as sqlite

* 1204 failed
* 88% was OK

Time: 46002ms

---- ---- ---- ---- ---- ---- ----
### 36/125 [`./test/index/delete/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE NOT (col0 >= 50)

Query was expected to return results (but did not) 
```

#### ☓ Ran 10353 tests as sqlite

* 1292 failed
* 87% was OK

Time: 48032ms

---- ---- ---- ---- ---- ---- ----
### 37/125 [`./test/index/in/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 > 27 OR col1 <= 41.57 AND col0 <= 46 OR (col3 IS NULL) OR col3 > 87) AND ((col1 IN (SELECT col4 FROM tab0 WHERE (col0 < 85 OR ((col4 <= 45.40)) OR (((col4 >= 8.27 AND col3 IN (25,17) OR col0 >= 0 OR col0 >= 74 OR col3 IN (47,25) AND col3 > 18 OR col4 >= 61.28 OR (col1 IN (97.94,69.95,11.4)) OR col3 = 64) AND col3 > 49 AND col3 <= 20 OR (((((col0 > 93) AND col3 IN (…

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE col4 > 12.48 OR (col1 IN (63.52,29.7,91.86,30.25,44.75,61.15) OR col4 >= 40.21 OR (col4 < 97.92)) AND col3 > 64

Query was expected to return results (but did not) 
```

#### ☓ Ran 10035 tests as sqlite

* 4866 failed
* 51% was OK

Time: 200437ms

---- ---- ---- ---- ---- ---- ----
### 38/125 [`./test/index/in/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 >= 80 AND col4 IN (61.72,91.69,75.89,68.74) OR (((((col4 >= 34.44 OR col0 IN (18,43,46,71,41) AND (col3 > 22)))) AND (col0 >= 55 OR (col3 > 10))) OR col3 IN (29,14,2,22,10,54) AND col1 > 40.1) AND (col4 > 38.77)

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col1 >= 88.39) OR col1 IN (SELECT col4 FROM tab0 WHERE col3 < 46) AND col1 IS NULL OR col0 IN (94,63,3,33,55) AND ((((col3 > 12)))) AND ((col0 <= 95)) OR col4 IS NULL AND (((((col3 > 40 OR (col3 IN (59,68,91,47,49,47) AND (col0 >= 36 AND col1 = 20.8 AND col1 > 88.32)) AND (col0 <= 10 OR col0 >= 60)))))) OR col4 > 16.23 OR col4 < 81.56 AND col3 < 76 AND col3 IS NULL OR (…

context is not defined
```

#### ☓ Ran 10036 tests as sqlite

* 4692 failed
* 53% was OK

Time: 200773ms

---- ---- ---- ---- ---- ---- ----
### 39/125 [`./test/index/in/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((((col3 IS NULL OR col3 > 23)) OR col3 IN (79,61,90,93) AND (col1 > 2.48) AND col3 > 98 OR (col1 >= 15.24)))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col1 IN (SELECT col4 FROM tab0 WHERE col3 > 94)) OR col3 > 37 AND (col1 IN (13.32,86.76))) AND col3 > 44

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE ((col3 IS NULL OR col0 IN (58,92,81,13,91,17))) OR col0 > 71

Query was expected to return results (but did not) 
```

#### ☓ Ran 10035 tests as sqlite

* 4803 failed
* 52% was OK

Time: 214087ms

---- ---- ---- ---- ---- ---- ----
### 40/125 [`./test/index/in/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 < 12 OR (col1 > 73.76 AND col4 > 27.56 AND col4 > 78.54) AND col0 > 17 AND (col4 <= 84.75 OR col0 >= 62 AND col0 < 85 AND col0 < 0 AND col0 > 20 OR col0 IS NULL AND (col4 >= 92.35 AND col3 < 85 OR col3 < 29) OR col0 < 70 AND ((col4 IN (63.71,22.52,17.76,39.58,18.13,96.18)))) OR (col0 > 83 AND col0 <= 47 OR col0 < 63 AND col0 > 79 OR ((col0 IN (SELECT col3 FROM tab0…

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE (col0 < 12 OR (col1 > 73.76 AND col4 > 27.56 AND col4 > 78.54) AND col0 > 17 AND (col4 <= 84.75 OR col0 >= 62 AND col0 < 85 AND col0 < 0 AND col0 > 20 OR col0 IS NULL AND (col4 >= 92.35 AND col3 < 85 OR col3 < 29) OR col0 < 70 AND ((col4 IN (63.71,22.52,17.76,39.58,18.13,96.18)))) OR (col0 > 83 AND col0 <= 47 OR col0 < 63 AND col0 > 79 OR ((col0 IN (SELECT col3 FROM tab1…

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab4 WHERE ((col1 >= 73.91 OR col3 >= 63 AND col0 <= 28 AND (col0 >= 11) OR col4 > 7.90 OR col0 > 94 OR (col4 = 44.79) AND col3 IS NULL)) OR ((col0 = 76 OR col0 = 60 OR col0 = 65 OR col0 = 46 OR col0 = 73) OR col4 >= 4.49) AND ((col4 <= 43.25))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 >= 49 OR col3 >= 54 OR ((col1 > 70.76)) AND col3 = 7 OR col1 = 65.88 AND ((col0 IN (59,76,63,78,38))) OR col0 IN (SELECT col3 FROM tab0 WHERE ((col4 = 34.83)) OR col3 = 13) AND col4 >= 74.70 AND col1 >= 88.51

context is not defined
```

#### ☓ Ran 10037 tests as sqlite

* 4776 failed
* 52% was OK

Time: 211946ms

---- ---- ---- ---- ---- ---- ----
### 41/125 [`./test/index/in/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE (col0 <= 20 OR col0 IN (SELECT col3 FROM tab0 WHERE col3 IS NULL AND ((col3 > 58)) AND ((col0 < 69)) OR ((((col3 < 73) OR col4 < 36.62) OR col3 >= 60)) OR ((col1 IN (36.28,52.39,78.56) OR (col4 <= 86.71))) AND col1 >= 27.26 AND col1 <= 96.67 OR col3 > 31 OR ((col3 > 8) AND ((col1 >= 2.94 AND (col0 >= 11) AND col3 < 44)))) OR col4 > 91.91 OR (col0 IS NULL) AND (col1 > 5.2…

context is not defined
```


```sql
SELECT pk FROM tab1 WHERE (col0 <= 20 OR col0 IN (SELECT col3 FROM tab1 WHERE col3 IS NULL AND ((col3 > 58)) AND ((col0 < 69)) OR ((((col3 < 73) OR col4 < 36.62) OR col3 >= 60)) OR ((col1 IN (36.28,52.39,78.56) OR (col4 <= 86.71))) AND col1 >= 27.26 AND col1 <= 96.67 OR col3 > 31 OR ((col3 > 8) AND ((col1 >= 2.94 AND (col0 >= 11) AND col3 < 44)))) OR col4 > 91.91 OR (col0 IS NULL) AND (col1 > 5.2…

Query was expected to return results (but did not) 
```

#### ☓ Ran 10038 tests as sqlite

* 4866 failed
* 51% was OK

Time: 206096ms

---- ---- ---- ---- ---- ---- ----
### 42/125 [`./test/index/in/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col0 IN (55,20,12,17))

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col4 > 87.16 OR ((col3 >= 36) OR col0 < 40 OR (col1 <= 26.97) OR (col3 IN (59,50,61,94,4,84)) AND col0 <= 59 OR (((col0 <= 44) AND col3 < 19 AND (col1 IS NULL) OR (col0 IN (51)) OR ((col1 <= 3.28 OR ((col1 < 96.29)) AND col3 = 31 AND (((((col3 >= 33))))) OR col0 >= 62)))) AND col0 >= 53 AND (((col1 IS NULL OR col0 > 5)))) OR col0 < 99 AND (((col3 < 19))) OR col1 = 38.60…

context is not defined
```


```sql
SELECT pk FROM tab4 WHERE col3 <= 94 OR ((col1 < 87.39 OR (col1 >= 81.54) AND col3 < 13 OR col0 < 43 AND (((col4 = 63.61 AND ((col1 < 39.33)) OR col3 < 88 OR col1 > 88.80 AND col0 >= 23 AND col3 <= 63 OR (col1 BETWEEN 70.31 AND 40.87) OR col1 >= 21.3 AND col3 > 69 OR col0 < 73 AND col1 <= 14.29 OR (col4 > 55.74) AND col3 < 31 AND (col3 >= 67 AND col3 > 6 OR col4 = 62.75 OR ((col3 = 30 OR col3 = 3…

Query was expected to return results (but did not) 
```

#### ☓ Ran 10038 tests as sqlite

* 4800 failed
* 52% was OK

Time: 228679ms

---- ---- ---- ---- ---- ---- ----
### 43/125 [`./test/index/orderby/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 > 221 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col3 < 204) AND col3 IN (SELECT col0 FROM tab0 WHERE col3 >= 218) AND col4 IN (SELECT col1 FROM tab0 WHERE (((((col3 IN (427) OR col3 <= 404)))) OR ((col0 IS NULL AND (col4 > 802.10 AND col0 = 651))) OR col3 BETWEEN 851 AND 573)) ORDER BY 1 DESC

context is not defined
```


```sql
SELECT pk FROM tab4 WHERE (col0 >= 291 AND (col4 IN (441.11,251.44,563.0,69.27,202.43,499.4)) OR col3 <= 693 AND col3 < 736 OR col0 IS NULL) ORDER BY 1

Query was expected to return results (but did not) 
```

#### ☓ Ran 10053 tests as sqlite

* 6192 failed
* 38% was OK

Time: 73505ms

---- ---- ---- ---- ---- ---- ----
### 44/125 [`./test/index/orderby/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col4 > 901.6) AND col0 >= 17 AND (col0 IS NULL) AND col0 < 649) AND (col3 > 960) OR (col3 > 58) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col3 <= 161) OR (col0 IN (SELECT col3 FROM tab0 WHERE (col1 > 857.76 OR (col1 >= 322.83) AND ((col4 > 795.47)) AND col0 >= 884 OR ((col3 > 853)) AND (col0 <= 291) AND (col1 <= 344.78 OR col3 > 697 AND ((col0 > 13 OR col0 < 76)) AND col4 IS NULL AND (col3 >= 434 AND col3 < 98 AND col3 BETWEEN 812 AND 2))) AND col0 >= 886)) OR ((col1 = 866.5 AND col1 >= 74.62 AND ((col0 …

context is not defined
```

#### ☓ Ran 10054 tests as sqlite

* 5748 failed
* 42% was OK

Time: 73273ms

---- ---- ---- ---- ---- ---- ----
### 45/125 [`./test/index/orderby/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col3 > 444) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk, col0 FROM tab3 WHERE col4 > 238.95 OR col3 > 121 AND (col3 < 969 AND col0 > 738 AND (col1 >= 812.75 OR col3 = 417 AND col1 > 206.79 AND (col4 < 431.61))) OR col0 <= 488 ORDER BY 1,2 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col0 < 262 OR (col0 <= 778 AND col0 >= 217 AND col4 IS NULL) AND col3 <= 204 OR col0 >= 31) AND (col0 < 751) AND (col1 = 369.16) OR (col1 IN (SELECT col4 FROM tab0 WHERE ((col3 IS NULL))) AND col0 IS NULL AND col0 > 521) OR col3 BETWEEN 552 AND 745) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10051 tests as sqlite

* 5772 failed
* 42% was OK

Time: 80993ms

---- ---- ---- ---- ---- ---- ----
### 46/125 [`./test/index/orderby/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col3 <= 505) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 >= 160 AND ((col1 = 94.47) OR col4 IN (SELECT col1 FROM tab0 WHERE col0 >= 17) OR (col4 IN (SELECT col1 FROM tab0 WHERE (col1 < 275.82))) OR ((col0 <= 913) AND col1 <= 968.52 AND col1 >= 515.44 AND (col0 > 289) AND ((((col4 <= 938.95)))) AND col0 = 252 AND col1 < 912.27 OR (col3 >= 299 AND ((col3 > 918 OR (((((col4 >= 461.61)) AND col0 > 146))))))) AND col0 > 499 AN…

context is not defined
```

#### ☓ Ran 10051 tests as sqlite

* 5736 failed
* 42% was OK

Time: 85711ms

---- ---- ---- ---- ---- ---- ----
### 47/125 [`./test/index/orderby/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col0 > 842 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 IN (SELECT col3 FROM tab0 WHERE (col3 = 877)) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10052 tests as sqlite

* 5460 failed
* 45% was OK

Time: 65861ms

---- ---- ---- ---- ---- ---- ----
### 48/125 [`./test/index/orderby/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 >= 264 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col1 IN (SELECT col4 FROM tab0 WHERE col1 > 660.38)) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10051 tests as sqlite

* 5556 failed
* 44% was OK

Time: 66488ms

---- ---- ---- ---- ---- ---- ----
### 49/125 [`./test/index/orderby/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (((((((col0 = 760) OR (col1 IS NULL) OR ((col3 < 689) OR (col0 BETWEEN 904 AND 557 AND col3 > 608 AND (col3 < 683 AND (col1 IS NULL)))) AND col0 > 942 OR (col0 <= 423) OR col3 < 914 AND (col3 > 960) AND col3 >= 620 OR col3 >= 316 OR col0 = 578 AND col0 > 632 OR col3 >= 174 AND col3 > 765 OR col4 < 550.49 OR col0 > 93))) AND col0 > 279) AND col0 < 488 AND (col4 = 299.14) …

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE ((col3 < 606) AND col3 < 289 AND (col0 IN (SELECT col3 FROM tab0 WHERE col3 < 507) OR col0 > 656) AND ((col3 >= 542) OR ((col1 > 553.64)))) OR col0 >= 981 ORDER BY 1 DESC

context is not defined
```


```sql
SELECT pk, col0 FROM tab4 WHERE (col3 = 854) AND col0 IS NULL OR col0 >= 323 AND col3 > 120 ORDER BY 1 DESC,2

Query was expected to return results (but did not) 
```

#### ☓ Ran 10048 tests as sqlite

* 6240 failed
* 37% was OK

Time: 80355ms

---- ---- ---- ---- ---- ---- ----
### 50/125 [`./test/index/orderby/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col4 < 975.28)) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col3 >= 598 OR (col3 IN (522,902,237,161,47,598) OR (col0 = 313) AND col0 < 839 OR (((col3 >= 24))) OR (col3 BETWEEN 441 AND 515) OR (((col1 >= 382.32) OR col3 < 351)) AND col0 < 967) AND col4 >= 817.48) AND col3 <= 778 OR (col0 >= 876 AND (col0 >= 664 AND col0 < 582) OR col0 >= 609 AND col0 IN (697,938) AND ((col1 > 340.76) AND col3 IS NULL AND col4 > 446.85 OR (col3 >…

context is not defined
```

#### ☓ Ran 10052 tests as sqlite

* 5880 failed
* 41% was OK

Time: 104507ms

---- ---- ---- ---- ---- ---- ----
### 51/125 [`./test/index/orderby/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (((col3 >= 420) OR col3 <= 614 OR col1 <= 720.18)) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (((((col0 IS NULL)))) AND col3 > 548 OR col0 >= 611 OR col1 IN (SELECT col4 FROM tab0 WHERE ((col0 > 617))) AND (col3 > 33 AND col3 = 992 AND ((col3 IN (715,661,944,639))) OR col4 = 529.36 AND ((col1 < 526.36)) OR (col0 IS NULL OR col1 <= 130.61) OR col3 <= 364 AND (col0 < 289) AND (((col0 < 904 AND (col4 < 785.83) OR col0 <= 34 AND (col0 <= 504) OR (col0 >= 545)))) AND …

context is not defined
```

#### ☓ Ran 10051 tests as sqlite

* 6192 failed
* 38% was OK

Time: 82377ms

---- ---- ---- ---- ---- ---- ----
### 52/125 [`./test/index/orderby/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 <= 736 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col1 > 256.15 AND col0 IN (SELECT col3 FROM tab0 WHERE col1 > 61.18 AND ((col3 >= 806))) AND (col3 < 623) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10050 tests as sqlite

* 6036 failed
* 39% was OK

Time: 78113ms

---- ---- ---- ---- ---- ---- ----
### 53/125 [`./test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col1 > 71.33 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col3 = 19 OR ((col0 >= 42)) AND col3 = 10 OR (col0 < 75) AND col0 IN (SELECT col3 FROM tab0 WHERE col0 >= 4 OR (col0 IS NULL)) AND col3 >= 25 OR ((col0 = 86)) AND col3 >= 7 AND (col4 IN (SELECT col1 FROM tab0 WHERE ((col4 < 6.77)) AND col4 <= 58.50 OR (col3 < 58 AND (col4 >= 94.0) AND col3 < 44 AND (col3 <= 90) AND ((((col4 >= 48.67)))) AND col4 IN (21.57,71.95,30.46) AN…

context is not defined
```

#### ☓ Ran 10053 tests as sqlite

* 5904 failed
* 41% was OK

Time: 75396ms

---- ---- ---- ---- ---- ---- ----
### 54/125 [`./test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE ((col1 > 88.0 AND ((col3 > 52 AND col4 > 15.54 AND col0 <= 8)) AND col0 = 66)) OR ((col4 >= 77.37)) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col4 IN (10.82,83.31,74.36,13.17,70.75,4.47) OR col3 < 54 OR col0 < 15 OR col3 > 84 AND (col3 < 49) OR ((col3 = 81) AND col3 < 80 AND col4 IS NULL AND col0 BETWEEN 62 AND 84 OR col3 >= 3 AND col1 < 22.36) AND col0 <= 10 AND (((col4 > 87.85)) AND col1 < 97.7)) OR col1 IN (SELECT col4 FROM tab0 WHERE col1 IS NULL) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10051 tests as sqlite

* 5808 failed
* 42% was OK

Time: 82617ms

---- ---- ---- ---- ---- ---- ----
### 55/125 [`./test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 < 21 OR col4 < 60.23 AND ((col3 > 55)) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE col0 > 49 AND (col1 BETWEEN 79.99 AND 97.43) OR col3 >= 66 AND ((col0 > 76)) OR col3 IN (48,19)) ORDER BY 1 DESC

context is not defined
```


```sql
SELECT pk FROM tab2 WHERE (((col3 > 4 OR (col4 > 16.2)))) OR col1 < 69.74 ORDER BY 1

Query was expected to return results (but did not) 
```

#### ☓ Ran 10052 tests as sqlite

* 5628 failed
* 44% was OK

Time: 74373ms

---- ---- ---- ---- ---- ---- ----
### 56/125 [`./test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col4 <= 7.70 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE ((col0 >= 35 AND col0 >= 95)) OR (col3 < 73))) AND col3 >= 92 OR (col0 <= 78) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10051 tests as sqlite

* 5736 failed
* 42% was OK

Time: 217111ms

---- ---- ---- ---- ---- ---- ----
### 57/125 [`./test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col1 BETWEEN 30.27 AND 73.0 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col3 IN (2,23,8,95,19) OR (col0 > 49 AND (col0 <= 8 AND col4 >= 96.56) OR col3 > 6 AND (col4 IN (SELECT col1 FROM tab0 WHERE ((col0 > 54))) AND ((col0 >= 59))) AND ((col1 <= 84.25 AND (col1 <= 65.92 AND col0 > 90)))) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10053 tests as sqlite

* 5916 failed
* 41% was OK

Time: 301617ms

---- ---- ---- ---- ---- ---- ----
### 58/125 [`./test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col1 BETWEEN 3.14 AND 7.38 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col3 IN (SELECT col0 FROM tab0 WHERE col3 >= 62) AND (col4 > 25.15) OR col3 > 20) ORDER BY 1 DESC

context is not defined
```


```sql
SELECT pk, col0 FROM tab4 WHERE col0 >= 67 ORDER BY 2 DESC

Query was expected to return results (but did not) 
```

#### ☓ Ran 10052 tests as sqlite

* 5352 failed
* 46% was OK

Time: 90202ms

---- ---- ---- ---- ---- ---- ----
### 59/125 [`./test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col3 >= 34) ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE col4 > 91.70) ORDER BY 1 DESC

context is not defined
```


```sql
SELECT pk, col0 FROM tab2 WHERE (col0 >= 71) ORDER BY 2

Query was expected to return results (but did not) 
```

#### ☓ Ran 10053 tests as sqlite

* 6348 failed
* 36% was OK

Time: 57832ms

---- ---- ---- ---- ---- ---- ----
### 60/125 [`./test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col4 > 49.52 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk, col0 FROM tab2 WHERE ((col4 <= 96.38)) ORDER BY 1

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE (col4 <= 37.74 AND ((col4 > 38.79 AND col3 < 7 AND (col1 <= 39.55 AND col0 < 90) OR col4 IN (SELECT col1 FROM tab0 WHERE col3 < 2) OR (((col0 IS NULL))) AND ((col0 > 20 OR col3 >= 5 AND col0 >= 77 AND ((col3 < 30) AND col3 < 86) AND col4 IS NULL)) OR (col0 < 60) OR col3 < 41 AND (col4 > 39.35)) OR col1 < 29.20 AND col0 < 78) OR col0 IS NULL AND (((col3 < 0 OR col0 >= 46)…

context is not defined
```

#### ☓ Ran 10052 tests as sqlite

* 4104 failed
* 59% was OK

Time: 65923ms

---- ---- ---- ---- ---- ---- ----
### 61/125 [`./test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE (col3 > 10) OR col1 <= 58.48 ORDER BY 1 DESC

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE (col0 > 57 AND (col3 > 61 OR ((col0 > 47 AND col3 >= 66)) AND (col0 > 62 OR col1 < 82.26)))) AND ((col0 <= 29 AND col3 > 13) OR col4 > 91.89) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10054 tests as sqlite

* 4548 failed
* 54% was OK

Time: 81413ms

---- ---- ---- ---- ---- ---- ----
### 62/125 [`./test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab1 WHERE col3 < 41 AND col1 < 34.22 AND (((((col3 IS NULL AND col4 = 49.2)) OR ((col0 BETWEEN 81 AND 76 AND (col3 < 40) OR col3 >= 27 OR col3 = 17 OR (col0 < 62) OR col0 >= 58 AND col3 < 33 AND (col4 < 62.91) AND col1 > 85.64))) OR (col3 < 87) OR col3 < 83 AND col3 >= 56 AND ((col0 > 40)) AND col3 < 52)) AND col3 > 18 OR (((col3 > 17) OR col0 < 21)) AND (col0 < 31 OR col0 >= 78 O…

Query was expected to return results (but did not) 
```


```sql
SELECT pk FROM tab0 WHERE col0 > 23 AND col3 IN (SELECT col0 FROM tab0 WHERE (col4 IN (87.49,43.86,39.83,73.23,60.73,8.41) OR col0 < 89 AND (col1 IN (SELECT col4 FROM tab0 WHERE (col4 > 21.30))) AND col0 < 96 OR col1 > 78.39)) ORDER BY 1 DESC

context is not defined
```

#### ☓ Ran 10055 tests as sqlite

* 3624 failed
* 63% was OK

Time: 64493ms

---- ---- ---- ---- ---- ---- ----
### 63/125 [`./test/index/random/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT col0 + + col0 AS col4 FROM tab1 AS cor0 WHERE NULL IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + col2 FROM tab0 AS cor0 WHERE col3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + + ( - - COUNT ( * ) ) FROM tab0 cor0 WHERE NULL <> col1

Expected: ["0"] but got ["10"]
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
SELECT + MAX ( - 59 ) FROM tab1 WHERE NOT + col4 IS NULL

Expected: ["-59"] but got ["NULL"]
```


```sql
SELECT + MIN ( ALL 65 ), + CAST ( NULL AS INTEGER ) AS col4 FROM tab0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```

#### ☓ Ran 10032 tests as sqlite

* 1514 failed
* 84% was OK

Time: 40831ms

---- ---- ---- ---- ---- ---- ----
### 64/125 [`./test/index/random/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL 65 * 26 FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT col2 col5 FROM tab0 WHERE NOT + col1 * col0 - - 45 = + 75

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT ( + + COUNT ( * ) ) AS col5 FROM tab1 WHERE + 30 IS NOT NULL

Expected: ["10"] but got ["0"]
```


```sql
SELECT + ( - - MIN ( DISTINCT + col0 ) ) FROM tab1 AS cor0 WHERE NOT - col3 IS NULL

Expected: ["98"] but got ["NULL"]
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
SELECT ALL CAST ( SUM ( ALL + col3 ) AS INTEGER ) FROM tab0 WHERE + - 4 > - col1

g is not defined
```


```sql
SELECT ALL + col2 FROM tab0 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```


```sql
SELECT + 82 + - CAST ( NULL AS INTEGER ), + MIN ( ALL + col0 ) + - + 63 FROM tab1 WHERE NOT ( ( NULL ) IS NOT NULL )

Expected: ["NULL","35"] but got ["82","NULL"]
```

#### ☓ Ran 10034 tests as sqlite

* 1582 failed
* 84% was OK

Time: 38861ms

---- ---- ---- ---- ---- ---- ----
### 65/125 [`./test/index/random/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT ALL - COUNT ( * ) FROM tab0 WHERE NOT CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
```


```sql
SELECT ALL - COUNT ( * ) FROM tab1 WHERE NOT CAST ( NULL AS REAL ) IS NOT NULL

Expected: ["-10"] but got ["0"]
```


```sql
SELECT - col3 col3 FROM tab0 WHERE NOT - CAST ( - + col3 AS INTEGER ) BETWEEN NULL AND col1

Query was expected to return results (but did not) 
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
SELECT ALL + MIN ( + ( - 35 ) ), 25 FROM tab1 AS cor0 WHERE NOT ( NULL ) = + col1 * col3

Expected: ["NULL","25"] but got ["25","NULL"]
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

#### ☓ Ran 10034 tests as sqlite

* 1546 failed
* 84% was OK

Time: 41079ms

---- ---- ---- ---- ---- ---- ----
### 66/125 [`./test/index/random/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 AS col0 FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + 46 * COUNT ( * ) FROM tab1 WHERE - col4 IS NOT NULL

Expected: ["460"] but got ["0"]
```


```sql
SELECT ALL col5 FROM tab0 AS cor0 WHERE + col4 * + col4 * + 24 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col3 AS col0 FROM tab0 AS cor0 WHERE NOT - CAST ( NULL AS REAL ) IS NOT NULL

Wrong conversion type
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
SELECT MIN ( ALL + - col0 ) FROM tab1 AS cor0 WHERE NOT - col3 * CAST ( - 83 AS INTEGER ) + + + 40 IS NULL

Expected: ["-659"] but got ["NULL"]
```


```sql
SELECT DISTINCT 83 * - 92 + CAST ( - CAST ( NULL AS INTEGER ) AS INTEGER ) AS col3, - CAST ( NULL AS INTEGER ) / col4 * + 52 AS col5 FROM tab0 AS cor0 WHERE col3 <= 81

Expected: ["NULL","NULL"] but got ["-7636","0"]
```

#### ☓ Ran 10034 tests as sqlite

* 1480 failed
* 85% was OK

Time: 40020ms

---- ---- ---- ---- ---- ---- ----
### 67/125 [`./test/index/random/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT - 49 FROM tab1 AS cor0 WHERE NULL IS NULL

Query was expected to return results (but did not) 
```


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
SELECT - CAST ( ( COUNT ( * ) ) AS INTEGER ) AS col1 FROM tab0 WHERE ( NOT col0 NOT BETWEEN + col4 AND + + col1 )

g is not defined
```


```sql
SELECT ALL + ( - MIN ( DISTINCT - 77 ) ) FROM tab1 WHERE NOT - 37 IS NULL

Expected: ["77"] but got ["NULL"]
```

#### ☓ Ran 10033 tests as sqlite

* 1531 failed
* 84% was OK

Time: 39583ms

---- ---- ---- ---- ---- ---- ----
### 68/125 [`./test/index/random/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT + + 60 AS col3, 29 AS col2 FROM tab1 WHERE col1 - col0 >= - col1

Query was expected to return results (but did not) 
```


```sql
SELECT + col2 AS col5 FROM tab0 WHERE NOT ( col0 ) * - - col4 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ( - CAST ( NULL AS INTEGER ) ) - - COUNT ( * ) FROM tab0 AS cor0 WHERE NULL < NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT - + COUNT ( * ) FROM tab1 AS cor0 WHERE + col5 IS NOT NULL

Expected: ["-10"] but got ["0"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT NULL NOT BETWEEN ( 72 + - + col4 + col3 ) AND - ( CAST ( NULL AS REAL ) )

Wrong conversion type
```


```sql
SELECT + MIN ( + col0 ) FROM tab1 WHERE col3 >= 63 * - col1

Expected: ["27"] but got ["NULL"]
```


```sql
SELECT + col2 col5 FROM tab0 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```

#### ☓ Ran 10034 tests as sqlite

* 1515 failed
* 84% was OK

Time: 38963ms

---- ---- ---- ---- ---- ---- ----
### 69/125 [`./test/index/random/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT - ( 36 ) * + + SUM ( ALL - col0 ) AS col5 FROM tab1 cor0 WHERE + col1 * + col4 IS NOT NULL

Expected: ["219672"] but got ["0"]
```


```sql
SELECT ALL + - CAST ( 18 AS INTEGER ) FROM tab1 WHERE NULL IS NULL

Query was expected to return results (but did not) 
```


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
SELECT DISTINCT 36 / COUNT ( * ) FROM tab1 WHERE NOT NULL IS NOT NULL

Expected: ["3"] but got ["NULL"]
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

#### ☓ Ran 10034 tests as sqlite

* 1556 failed
* 84% was OK

Time: 39517ms

---- ---- ---- ---- ---- ---- ----
### 70/125 [`./test/index/random/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL + col3 AS col5 FROM tab1 WHERE NOT + 15 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - ( - + ( - COUNT ( * ) ) ) col4 FROM tab1 WHERE NOT - 17 + + + 63 IS NULL

Expected: ["-10"] but got ["0"]
```


```sql
SELECT + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) FROM tab0 AS cor0 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - MAX ( - 7 ) AS col2 FROM tab1 AS cor0 WHERE NOT - 76 IS NULL

Expected: ["7"] but got ["NULL"]
```


```sql
SELECT ALL - MIN ( ALL + + 73 ) AS col4 FROM tab0 cor0 WHERE NOT 35 >= NULL

Expected: ["NULL"] but got ["-73"]
```


```sql
SELECT DISTINCT - COUNT ( * ) / + CAST ( NULL AS REAL ) AS col5 FROM tab0 WHERE NOT col0 + CAST ( col3 AS INTEGER ) <> 62 * - ( col1 * - col4 )

Wrong conversion type
```


```sql
SELECT ( + SUM ( col3 ) ) AS col5 FROM tab2 WHERE + + col0 * + CAST ( NULL AS INTEGER ) IS NULL

Expected: ["5016"] but got ["0"]
```


```sql
SELECT ALL col2 AS col5 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```


```sql
SELECT ALL + 37 AS col5 FROM tab4 AS cor0 WHERE NOT ( NULL ) IS NOT NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10031 tests as sqlite

* 1595 failed
* 84% was OK

Time: 40365ms

---- ---- ---- ---- ---- ---- ----
### 71/125 [`./test/index/random/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT ALL col0 * - col0 FROM tab1 WHERE col1 * col1 IS NOT NULL

Query was expected to return results (but did not) 
```


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
SELECT ALL COUNT ( * ) + - 54 + - + MAX ( + col3 ) FROM tab1 WHERE NOT - col1 IS NULL

Expected: ["-980"] but got ["NULL"]
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
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```

#### ☓ Ran 10032 tests as sqlite

* 1537 failed
* 84% was OK

Time: 39757ms

---- ---- ---- ---- ---- ---- ----
### 72/125 [`./test/index/random/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_9.test)

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
SELECT + COUNT ( * ) FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["10"] but got ["0"]
```


```sql
SELECT COUNT ( * ) * - CAST ( NULL AS INTEGER ) + - 76 AS col3 FROM tab0 AS cor0 WHERE NOT - ( col0 ) + - col0 IS NOT NULL

Expected: ["NULL"] but got ["-76"]
```


```sql
SELECT ALL 55 / ( COUNT ( * ) ) FROM tab1 cor0 WHERE col5 IS NOT NULL

Expected: ["5"] but got ["NULL"]
```


```sql
SELECT - + CAST ( - SUM ( DISTINCT - - CAST ( + 91 AS INTEGER ) ) AS INTEGER ), - 51 AS col0 FROM tab0 WHERE NOT NULL <= 60

g is not defined
```


```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```


```sql
SELECT + COUNT ( * ) / + - COUNT ( * ) FROM tab2 WHERE NULL IS NULL

Expected: ["-1"] but got ["NULL"]
```

#### ☓ Ran 10031 tests as sqlite

* 1632 failed
* 83% was OK

Time: 38942ms

---- ---- ---- ---- ---- ---- ----
### 73/125 [`./test/index/view/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_0.test)

_Mimic sqlite_
Time: 6ms

---- ---- ---- ---- ---- ---- ----
### 74/125 [`./test/index/view/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_2_tab0_153

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM tab1 WHERE NOT (col0 = 49)

Query was expected to return results (but did not) 
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

#### ☓ Ran 8137 tests as sqlite

* 7698 skipped
* 175 failed
* 3% was OK

Time: 4888ms

---- ---- ---- ---- ---- ---- ----
### 75/125 [`./test/index/view/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_2.test)

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
SELECT pk, col0 FROM tab1 WHERE col3 < 84

Query was expected to return results (but did not) 
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
CREATE VIEW view_1_tab0_367 AS SELECT pk, col0 FROM tab0 WHERE col3 IS NULL OR (((col0 < 64 AND (col0 BETWEEN 25 AND 41) AND (col4 >= 33.34) OR (col4 < 22.72 AND (col0 >= 61)) AND (col0 > 4) OR col0 >= 0 OR col0 >= 45 AND col3 IN (SELECT col0 FROM tab0 WHERE col3 > 42) AND col3 IS NULL AND col3 <= 75)))

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7465 tests as sqlite

* 1028 skipped
* 2625 failed
* 51% was OK

Time: 25714ms

---- ---- ---- ---- ---- ---- ----
### 76/125 [`./test/index/view/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_3.test)

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
SELECT pk, col0 FROM tab1 WHERE col3 = 22 OR (col0 <= 44 OR col3 >= 14 AND col0 <= 14) OR col1 IS NULL AND (col3 < 82 OR col4 IS NULL OR col3 > 4 AND col4 >= 63.44) AND col0 <= 78 OR (col0 >= 43) OR (col1 > 80.15) OR col3 IN (71,67,63) AND ((col4 > 77.87)) AND col0 < 92 OR ((col4 IS NULL)) OR col0 = 8 AND (col3 < 29 AND col0 < 99) AND col1 > 82.0 AND col0 < 61 AND col0 <= 27 AND col1 > 9.48 AND c…

Query was expected to return results (but did not) 
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

#### ☓ Ran 7271 tests as sqlite

* 4133 skipped
* 1392 failed
* 24% was OK

Time: 13537ms

---- ---- ---- ---- ---- ---- ----
### 77/125 [`./test/index/view/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_4.test)

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
SELECT pk, col0 FROM tab1 WHERE (col1 < 55.67)

Query was expected to return results (but did not) 
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
CREATE VIEW view_1_tab0_519 AS SELECT pk, col0 FROM tab0 WHERE (((col0 >= 39) OR (col1 < 88.77) AND (((col1 <= 79.45) AND col0 IN (83,70,92,44,74) AND col4 < 94.64 OR col0 > 49 AND (col3 >= 51 OR col0 > 38)) OR col0 < 10 OR col1 > 79.73 AND col3 > 53 AND col1 BETWEEN 24.95 AND 9.14 AND col3 < 51 OR col4 > 95.31 AND col3 >= 58 AND col3 >= 26) OR (((col3 > 15 OR (col0 = 45))) OR ((col1 < 47.23) OR …

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7563 tests as sqlite

* 223 skipped
* 2934 failed
* 58% was OK

Time: 27217ms

---- ---- ---- ---- ---- ---- ----
### 78/125 [`./test/index/view/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_5.test)

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
SELECT pk, col0 FROM tab1 WHERE ((col0 <= 62))

Query was expected to return results (but did not) 
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
SELECT pk, col0 FROM view_1_tab4_696 UNION ALL SELECT pk, col0 FROM view_2_tab4_696

Query was expected to return results (but did not) 
```


```sql
CREATE VIEW view_1_tab0_726 AS SELECT pk, col0 FROM tab0 WHERE col0 > 84 AND col4 <= 74.98 AND col1 IN (SELECT col4 FROM tab0 WHERE (col4 > 35.62) AND ((col3 > 33) AND (((((col3 > 1))) AND (col0 = 21 OR (((col3 > 79))) AND (col1 < 18.85) AND ((col3 > 26)) OR ((col3 > 73) AND col3 <= 84)))) OR ((((col3 <= 35))) AND col1 > 16.74) AND col4 <= 51.42 AND (col1 > 97.18)))

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7384 tests as sqlite

* 1143 skipped
* 2655 failed
* 48% was OK

Time: 24483ms

---- ---- ---- ---- ---- ---- ----
### 79/125 [`./test/index/view/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_6.test)

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
SELECT pk, col0 FROM tab1 WHERE col3 >= 49

Query was expected to return results (but did not) 
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
CREATE VIEW view_1_tab0_984 AS SELECT pk, col0 FROM tab0 WHERE (col0 > 42) AND ((col1 IS NULL)) OR ((((col3 > 72)))) OR (((col3 <= 90) AND ((col0 > 68)) AND (col0 IN (45,3,50,1) OR col4 < 9.99 OR col3 IN (76,97,24) AND col1 > 8.58 AND (col0 = 3) AND (col0 >= 50 AND col0 IN (SELECT col3 FROM tab0 WHERE ((col3 <= 60)))) OR (col0 > 40) OR col0 < 72) AND (col3 <= 99)) AND ((col3 IS NULL) OR ((((((col…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 6492 tests as sqlite

* 2753 skipped
* 1554 failed
* 33% was OK

Time: 15604ms

---- ---- ---- ---- ---- ---- ----
### 80/125 [`./test/index/view/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_7.test)

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
SELECT pk, col0 FROM tab1 WHERE (col3 > 2 AND col3 >= 92) AND col1 <= 41.49 OR col1 < 72.14

Query was expected to return results (but did not) 
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
CREATE VIEW view_1_tab0_1042 AS SELECT pk, col0 FROM tab0 WHERE ((col0 > 16 OR ((col0 < 9 OR col3 IN (SELECT col0 FROM tab0 WHERE (col0 < 94) AND col0 <= 61))) AND col3 = 18 OR col3 < 55 AND col3 IN (76,76) OR col3 >= 86 AND ((((((col0 < 9)))) AND col0 = 70 OR col1 IS NULL) AND (col3 IN (31,92,0))))) AND col1 > 29.45 OR col4 < 19.59

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7533 tests as sqlite

* 4593 skipped
* 1254 failed
* 22% was OK

Time: 12956ms

---- ---- ---- ---- ---- ---- ----
### 81/125 [`./test/random/aggregates/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_0.test)

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
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT col2 + + 76 / - ( - + col1 ) AS col1, 71 + col0 / + - CAST ( NULL AS INTEGER ) AS col2 FROM tab2

Expected: ["24","NULL","40","NULL","59","NULL"] but got ["24.490","NULL","40.987","NULL","59.134","NULL"]
```


```sql
SELECT 21 / - + 13 + col0 AS col2 FROM tab2 AS cor0

Expected: ["45","63","74"] but got ["44.385","62.385","73.385"]
```

#### ☓ Ran 10012 tests as sqlite

* 1588 failed
* 84% was OK

Time: 41393ms

---- ---- ---- ---- ---- ---- ----
### 82/125 [`./test/random/aggregates/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_1.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1374 failed
* 86% was OK

Time: 40820ms

---- ---- ---- ---- ---- ---- ----
### 83/125 [`./test/random/aggregates/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_2.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1508 failed
* 84% was OK

Time: 41464ms

---- ---- ---- ---- ---- ---- ----
### 84/125 [`./test/random/aggregates/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_3.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1666 failed
* 83% was OK

Time: 42818ms

---- ---- ---- ---- ---- ---- ----
### 85/125 [`./test/random/aggregates/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_4.test)

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
SELECT ALL + 45 / + col2 + 89 AS col0, 23 AS col1 FROM tab2 AS cor0

Expected: ["89","23","90","23","90","23"] but got ["89.776","23","90.125","23","90.957","23"]
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

#### ☓ Ran 10012 tests as sqlite

* 1688 failed
* 83% was OK

Time: 42773ms

---- ---- ---- ---- ---- ---- ----
### 86/125 [`./test/random/aggregates/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_5.test)

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
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
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

#### ☓ Ran 10012 tests as sqlite

* 1632 failed
* 83% was OK

Time: 41757ms

---- ---- ---- ---- ---- ---- ----
### 87/125 [`./test/random/aggregates/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_6.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1649 failed
* 83% was OK

Time: 42482ms

---- ---- ---- ---- ---- ---- ----
### 88/125 [`./test/random/aggregates/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_7.test)

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
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1634 failed
* 83% was OK

Time: 41919ms

---- ---- ---- ---- ---- ---- ----
### 89/125 [`./test/random/aggregates/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_8.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1634 failed
* 83% was OK

Time: 42293ms

---- ---- ---- ---- ---- ---- ----
### 90/125 [`./test/random/aggregates/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_9.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1565 failed
* 84% was OK

Time: 42459ms

---- ---- ---- ---- ---- ---- ----
### 91/125 [`./test/random/expr/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_0.test)

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
SELECT DISTINCT COUNT ( * ) - - ( + COUNT ( * ) ) AS col2, + 77 / 37 + + + 90, + CASE - - MAX ( - ( - + 45 ) ) WHEN - 14 * + - CASE - ( + 12 ) WHEN - COALESCE ( - 33, + 62, + - 72 + + 76 ) * + 41 THEN - ( - SUM ( ALL - ( + 56 ) ) ) * 89 END * + - 15 * + 74 THEN - 12 * 69 - CAST ( 16 AS INTEGER ) WHEN + 83 THEN NULL ELSE NULL END * 53 AS col2

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

#### ☓ Ran 10012 tests as sqlite

* 1839 failed
* 81% was OK

Time: 42780ms

---- ---- ---- ---- ---- ---- ----
### 92/125 [`./test/random/expr/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_1.test)

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

#### ☓ Ran 10012 tests as sqlite

* 1175 failed
* 88% was OK

Time: 28160ms

---- ---- ---- ---- ---- ---- ----
### 93/125 [`./test/random/expr/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_2.test)

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
SELECT + CASE + COUNT ( * ) WHEN + COALESCE ( + MAX ( DISTINCT - 17 ), 72 - + - 86 + + ( - CASE WHEN ( + CASE - 8 WHEN - 7 THEN NULL WHEN - 70 * + 18 THEN NULL ELSE 82 * + ( - - MIN ( + 47 ) ) + - SUM ( DISTINCT 97 ) END ) BETWEEN - 13 * + 57 AND - COUNT ( * ) * - 74 THEN 89 WHEN NOT - 12 >= NULL THEN NULL ELSE NULL END ) * - 27, 40 / 27 - + 34 ) THEN 89 WHEN - COUNT ( + 4 ) - CASE 90 WHEN ( - CO…

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

#### ☓ Ran 10012 tests as sqlite

* 1481 failed
* 85% was OK

Time: 38579ms

---- ---- ---- ---- ---- ---- ----
### 94/125 [`./test/random/expr/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_3.test)

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

#### ☓ Ran 10012 tests as sqlite

* 2064 failed
* 79% was OK

Time: 45794ms

---- ---- ---- ---- ---- ---- ----
### 95/125 [`./test/random/expr/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_4.test)

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
SELECT DISTINCT CAST ( NULL AS REAL ) + 37 AS col0

Wrong conversion type
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col1, CASE + COUNT ( * ) WHEN - - 5 THEN + - 71 * + 32 / - 55 END / + 90 * - - 55 * - + NULLIF ( + - SUM ( ALL + 39 ), - 42 )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 2064 failed
* 79% was OK

Time: 46012ms

---- ---- ---- ---- ---- ---- ----
### 96/125 [`./test/random/expr/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_5.test)

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
SELECT ( - 91 ) AS col0, - NULLIF ( + COUNT ( * ), ( + 67 ) * - CASE ( + COUNT ( * ) ) WHEN CASE + 85 WHEN + - 28 * - 66 THEN NULL WHEN + 94 THEN + 62 END + - 95 + CASE + + COALESCE ( - COALESCE ( 49, - ( - + ( + 72 ) ) / - + SUM ( 25 ), + 65, 15 * + NULLIF ( + - 36, + NULLIF ( NULLIF ( - COALESCE ( 39, - 76 / 65 ), - 69 ), - 64 ) - 89 ) ), COUNT ( * ), 95, + COALESCE ( + 43, 56 + 88 ) ) WHEN + 3…

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

#### ☓ Ran 10012 tests as sqlite

* 2085 failed
* 79% was OK

Time: 47749ms

---- ---- ---- ---- ---- ---- ----
### 97/125 [`./test/random/expr/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_6.test)

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
SELECT - 44 / - 97 - + + 36 + + 0 * 40 + + 15 * - MIN ( - 42 ) * + + 25 AS col1, - CASE - + 73 WHEN COALESCE ( - MAX ( ALL - - 70 ), + 94 * + COALESCE ( - 20, - 90 * - 32 + - 35 + - + 4, + 62 + - NULLIF ( + + ( 95 ), + 65 ), 26 ) * - 49 + + NULLIF ( 43, - 91 ) ) THEN - 62 * + 4 * + AVG ( 92 ) - - 7 + - 8 / 77 - - COUNT ( + + 39 ) - - MAX ( 56 ) WHEN 10 * 7 THEN NULL ELSE NULL END - 72

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

#### ☓ Ran 10012 tests as sqlite

* 2043 failed
* 79% was OK

Time: 46671ms

---- ---- ---- ---- ---- ---- ----
### 98/125 [`./test/random/expr/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_7.test)

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
SELECT ALL CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) col0, 32 + + 91 + - 95 + - NULLIF ( + CASE + 52 WHEN - + 61 + - + 37 THEN + - 27 - + - 74 / MAX ( ALL + 70 ) WHEN - 37 THEN NULL WHEN + 66 THEN NULL WHEN + ( + MIN ( DISTINCT 35 ) ) + + 29 * - 72 THEN - MIN ( DISTINCT + - ( - 20 ) ) * - + 53 END, - COALESCE ( + 84, 72 + - CASE - 84 WHEN + 41 THEN 21 WHEN ( - 50 ) THEN NULL WHEN - NULLIF ( …

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 2097 failed
* 79% was OK

Time: 45124ms

---- ---- ---- ---- ---- ---- ----
### 99/125 [`./test/random/expr/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_8.test)

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
SELECT 57 + + CASE + COUNT ( * ) WHEN - 80 THEN + + 58 END - - 44 * + + 74 / - 67 + ( - COUNT ( * ) ) * + 48, CAST ( NULL AS INTEGER ) + - 20 AS col1

Expected: ["NULL","NULL"] but got ["NULL","-20"]
```


```sql
SELECT CAST ( + - 17 AS INTEGER ) * + 6 + + + CAST ( + AVG ( 85 ) AS INTEGER ), + 4 * - - ( + + ( - + NULLIF ( + 80, + + 83 ) ) ) AS col1

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) + 7 + - CAST ( - 45 AS INTEGER ) - - - 61 + - - 1 - 74, + AVG ( - - CAST ( NULL AS INTEGER ) ) + 63 AS col2

Expected: ["NULL","NULL"] but got ["-82","63"]
```


```sql
SELECT ALL + 2 col0, ( 32 ) + - 3 + CASE - 81 WHEN - - 81 THEN 21 END + + 27 + + 93 AS col0

Expected: ["2","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 2139 failed
* 78% was OK

Time: 45259ms

---- ---- ---- ---- ---- ---- ----
### 100/125 [`./test/random/expr/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_9.test)

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
SELECT CASE - COALESCE ( + 2, - CAST ( NULL AS INTEGER ) ) WHEN + + 11 * - + 93 * 31 THEN 1 + + 71 WHEN - 72 THEN NULL END - - CASE WHEN ( NULL ) IS NOT NULL THEN NULL WHEN - 33 BETWEEN ( NULL ) AND - 14 THEN + 27 END - + 30 / - COALESCE ( 26, - NULLIF ( - 59, - COUNT ( * ) ) + + COUNT ( * ) + + 41 * 89 + 74 )

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

#### ☓ Ran 10012 tests as sqlite

* 2046 failed
* 79% was OK

Time: 45259ms

---- ---- ---- ---- ---- ---- ----
### 101/125 [`./test/random/groupby/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_0.test)

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
SELECT cor0.col2 * 85 FROM tab1 AS cor0 GROUP BY cor0.col1, cor0.col2, cor0.col0

Expected: ["3825","6035","680"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4287 failed
* 57% was OK

Time: 36708ms

---- ---- ---- ---- ---- ---- ----
### 102/125 [`./test/random/groupby/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_1.test)

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

#### ☓ Ran 10012 tests as sqlite

* 4144 failed
* 58% was OK

Time: 40797ms

---- ---- ---- ---- ---- ---- ----
### 103/125 [`./test/random/groupby/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_2.test)

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

#### ☓ Ran 10012 tests as sqlite

* 4198 failed
* 58% was OK

Time: 40564ms

---- ---- ---- ---- ---- ---- ----
### 104/125 [`./test/random/groupby/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_3.test)

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
SELECT 98 * cor0.col0 FROM tab2 cor0 GROUP BY cor0.col0

Expected: ["1470","8918","9016"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT - - ( + 8 ) + tab1.col0 FROM tab1 GROUP BY tab1.col0

Expected: ["30","36","90"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4465 failed
* 55% was OK

Time: 38980ms

---- ---- ---- ---- ---- ---- ----
### 105/125 [`./test/random/groupby/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_4.test)

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

#### ☓ Ran 10012 tests as sqlite

* 4369 failed
* 56% was OK

Time: 38443ms

---- ---- ---- ---- ---- ---- ----
### 106/125 [`./test/random/groupby/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_5.test)

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
SELECT ALL + cor0.col2 * NULLIF ( - cor0.col1, cor0.col1 ) FROM tab0 AS cor0 GROUP BY cor0.col2, cor0.col1

Expected: ["-1944","NULL","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT cor0.col1 * + CASE cor0.col0 / + cor0.col2 WHEN + cor0.col0 / cor0.col0 THEN cor0.col1 * + cor0.col1 WHEN cor0.col0 / - cor0.col0 THEN NULL END FROM tab2 AS cor0 GROUP BY cor0.col1, cor0.col0, cor0.col2

Expected: ["205379","68921","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT NULLIF ( cor0.col1, + cor0.col1 + + cor0.col1 ) AS col0 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["81","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4488 failed
* 55% was OK

Time: 38563ms

---- ---- ---- ---- ---- ---- ----
### 107/125 [`./test/random/groupby/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_6.test)

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

#### ☓ Ran 10012 tests as sqlite

* 4625 failed
* 53% was OK

Time: 37828ms

---- ---- ---- ---- ---- ---- ----
### 108/125 [`./test/random/groupby/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_7.test)

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
SELECT + 85 * + tab0.col1 FROM tab0, tab0 AS cor0 GROUP BY tab0.col1

Expected: ["0","6885"] but got ["NULL","NULL"]
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
SELECT DISTINCT - NULLIF ( + cor0.col1, cor0.col1 / - 16 ) FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["-81","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4547 failed
* 54% was OK

Time: 38914ms

---- ---- ---- ---- ---- ---- ----
### 109/125 [`./test/random/groupby/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_8.test)

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

#### ☓ Ran 10012 tests as sqlite

* 2975 failed
* 70% was OK

Time: 37743ms

---- ---- ---- ---- ---- ---- ----
### 110/125 [`./test/random/groupby/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_9.test)

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

#### ☓ Ran 10012 tests as sqlite

* 503 failed
* 94% was OK

Time: 36967ms

---- ---- ---- ---- ---- ---- ----
### 111/125 [`./test/random/select/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_0.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + 63 - 48 * col0 * + CAST ( NULL AS INTEGER ) FROM tab0 cor0

Expected: ["NULL"] but got ["63"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 cor0, tab2 AS cor1

27 results returned but expected 243
```


```sql
SELECT * FROM tab0 WHERE NOT ( - col2 * + col0 ) IN ( - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1572 failed
* 84% was OK

Time: 34851ms

---- ---- ---- ---- ---- ---- ----
### 112/125 [`./test/random/select/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_1.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
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

#### ☓ Ran 10012 tests as sqlite

* 1338 failed
* 86% was OK

Time: 35880ms

---- ---- ---- ---- ---- ---- ----
### 113/125 [`./test/random/select/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_2.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0, tab2 AS cor1, tab1, tab0 AS cor2

45 results returned but expected 3645
```


```sql
SELECT * FROM tab1 WHERE NOT ( col1 ) IN ( col2 + col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1291 failed
* 87% was OK

Time: 35609ms

---- ---- ---- ---- ---- ---- ----
### 114/125 [`./test/random/select/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_3.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * - ( + col2 ) * col2 + ( col1 * - col1 ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["-7396","-8281","-9409"]
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT + col1 IN ( col0 + col0 * col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1258 failed
* 87% was OK

Time: 36653ms

---- ---- ---- ---- ---- ---- ----
### 115/125 [`./test/random/select/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_4.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1

18 results returned but expected 54
```


```sql
SELECT ALL * FROM tab1 WHERE NOT + col0 NOT BETWEEN + col1 / - col2 AND col2

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * col0 + col1 col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["17","31","59"]
```

#### ☓ Ran 10011 tests as sqlite

* 1317 failed
* 86% was OK

Time: 36430ms

---- ---- ---- ---- ---- ---- ----
### 116/125 [`./test/random/select/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_5.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - col0 * + col1 AS col2 FROM tab2 WHERE NOT - col1 * tab2.col1 IN ( col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1323 failed
* 86% was OK

Time: 36321ms

---- ---- ---- ---- ---- ---- ----
### 117/125 [`./test/random/select/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_6.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
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

#### ☓ Ran 10012 tests as sqlite

* 1345 failed
* 86% was OK

Time: 36003ms

---- ---- ---- ---- ---- ---- ----
### 118/125 [`./test/random/select/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_7.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1283 failed
* 87% was OK

Time: 36207ms

---- ---- ---- ---- ---- ---- ----
### 119/125 [`./test/random/select/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_8.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
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

#### ☓ Ran 10012 tests as sqlite

* 1322 failed
* 86% was OK

Time: 36409ms

---- ---- ---- ---- ---- ---- ----
### 120/125 [`./test/random/select/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_9.test)

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
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab1 cor1, tab2 AS cor2

36 results returned but expected 972
```


```sql
SELECT * FROM tab1 WHERE NOT - col2 * col2 + - col1 IN ( col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10010 tests as sqlite

* 1295 failed
* 87% was OK

Time: 36963ms

---- ---- ---- ---- ---- ---- ----
### 121/125 [`./test/select1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select1.test)

_Mimic sqlite_
#### ✔ Ran 1031 tests as sqlite

* 100% was OK

Time: 14776ms

---- ---- ---- ---- ---- ---- ----
### 122/125 [`./test/select2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select2.test)

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

#### ☓ Ran 1031 tests as sqlite

* 104 failed
* 89% was OK

Time: 13358ms

---- ---- ---- ---- ---- ---- ----
### 123/125 [`./test/select3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select3.test)

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

#### ☓ Ran 3351 tests as sqlite

* 358 failed
* 89% was OK

Time: 45601ms

---- ---- ---- ---- ---- ---- ----
### 124/125 [`./test/select4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select4.test)

_Mimic sqlite_

```sql
SELECT * FROM t1

Correct amount of values returned but hash was different than expected.
```


```sql
CREATE INDEX t1i0 ON t1(a1,b1,c1,d1,e1,x1)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 3857 tests as sqlite

* 2838 skipped
* 10 failed
* 26% was OK

Time: 5661ms

---- ---- ---- ---- ---- ---- ----
### 125/125 [`./test/select5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select5.test)

_Mimic sqlite_

_(test stopped after 10 hours of no result from 125/125)_
