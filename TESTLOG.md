# SQLlogictest results for AlaSQL 0.2.1

_2015-11-29T19:39:22.889Z_

Results from 622 test files:

---- ---- ---- ---- ---- ---- ----
### 1/622 [`./test/evidence/in1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in1.test)

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
SELECT 1 NOT IN (SELECT * FROM t1)

Query was expected to return results (but did not) 
```


```sql
INSERT INTO t5 SELECT * FROM t4

Cannot insert record, because it already exists in primary key index
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 216 tests as sqlite

* 148 skipped
* 41 failed
* 12% was OK

Time: 186ms

---- ---- ---- ---- ---- ---- ----
### 2/622 [`./test/evidence/in2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in2.test)

_Mimic sqlite_

```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1)

context is not defined
```

#### ☓ Ran 53 tests as sqlite

* 1 failed
* 98% was OK

Time: 119ms

---- ---- ---- ---- ---- ---- ----
### 3/622 [`./test/evidence/slt_lang_aggfunc.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_aggfunc.test)

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

Time: 34ms

---- ---- ---- ---- ---- ---- ----
### 4/622 [`./test/evidence/slt_lang_createtrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createtrigger.test)

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

Time: 18ms

---- ---- ---- ---- ---- ---- ----
### 5/622 [`./test/evidence/slt_lang_createview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createview.test)

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

Time: 13ms

---- ---- ---- ---- ---- ---- ----
### 6/622 [`./test/evidence/slt_lang_dropindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropindex.test)

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

Time: 12ms

---- ---- ---- ---- ---- ---- ----
### 7/622 [`./test/evidence/slt_lang_droptable.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptable.test)

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

Time: 11ms

---- ---- ---- ---- ---- ---- ----
### 8/622 [`./test/evidence/slt_lang_droptrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptrigger.test)

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

Time: 11ms

---- ---- ---- ---- ---- ---- ----
### 9/622 [`./test/evidence/slt_lang_dropview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropview.test)

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

Time: 14ms

---- ---- ---- ---- ---- ---- ----
### 10/622 [`./test/evidence/slt_lang_reindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_reindex.test)

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

Time: 18ms

---- ---- ---- ---- ---- ---- ----
### 11/622 [`./test/evidence/slt_lang_replace.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_replace.test)

_Mimic sqlite_

```sql
REPLACE INTO t1 VALUES(2, 'replace')

Parse error on line 1:
REPLACE INTO t1 VALU
^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'EXPLAIN', 'EndTransaction', 'WITH', 'SEARCH', 'EQ', 'SET', 'IF', 'SELECT', 'JAVASCRIPT', 'UPDATE', 'DELETE', 'INSERT', 'CREATE', 'DROP', 'ALTER', 'RENAME', 'ATTACH', 'DETACH', 'USE', 'SHOW', 'HELP', 'SOURCE', 'ASSERT', 'COMMIT', 'ROLLBACK', 'BEGIN', 'WHILE', 'CONTINUE', 'BREAK', 'PRINT', 'REQUIRE', 'ECHO', 'DECLARE', 'TRUNCATE', 'MERGE', 'COLONDASH', 'QUESTIONDASH', 'CALL', 'SEMICOLON', 'GO', got 'REPLACE'
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 14 tests as sqlite

* 5 skipped
* 1 failed
* 57% was OK

Time: 31ms

---- ---- ---- ---- ---- ---- ----
### 12/622 [`./test/evidence/slt_lang_update.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_update.test)

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

Time: 17ms

---- ---- ---- ---- ---- ---- ----
### 13/622 [`./test/index/between/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10022 tests as sqlite

* 10014 skipped
* 1 failed
* 0% was OK

Time: 3733ms

---- ---- ---- ---- ---- ---- ----
### 14/622 [`./test/index/between/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 3548ms

---- ---- ---- ---- ---- ---- ----
### 15/622 [`./test/index/between/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10029 tests as sqlite

* 10012 skipped
* 1 failed
* 0% was OK

Time: 3661ms

---- ---- ---- ---- ---- ---- ----
### 16/622 [`./test/index/between/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 3691ms

---- ---- ---- ---- ---- ---- ----
### 17/622 [`./test/index/between/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 3974ms

---- ---- ---- ---- ---- ---- ----
### 18/622 [`./test/index/between/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 3793ms

---- ---- ---- ---- ---- ---- ----
### 19/622 [`./test/index/between/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10031 tests as sqlite

* 10014 skipped
* 1 failed
* 0% was OK

Time: 3634ms

---- ---- ---- ---- ---- ---- ----
### 20/622 [`./test/index/between/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10123 tests as sqlite

* 10016 skipped
* 1 failed
* 1% was OK

Time: 4158ms

---- ---- ---- ---- ---- ---- ----
### 21/622 [`./test/index/between/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10125 tests as sqlite

* 10018 skipped
* 1 failed
* 1% was OK

Time: 4013ms

---- ---- ---- ---- ---- ---- ----
### 22/622 [`./test/index/between/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10121 tests as sqlite

* 10014 skipped
* 1 failed
* 1% was OK

Time: 4179ms

---- ---- ---- ---- ---- ---- ----
### 23/622 [`./test/index/between/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10121 tests as sqlite

* 10014 skipped
* 1 failed
* 1% was OK

Time: 3910ms

---- ---- ---- ---- ---- ---- ----
### 24/622 [`./test/index/between/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10125 tests as sqlite

* 10018 skipped
* 1 failed
* 1% was OK

Time: 4036ms

---- ---- ---- ---- ---- ---- ----
### 25/622 [`./test/index/between/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 3792 tests as sqlite

* 2785 skipped
* 1 failed
* 26% was OK

Time: 2536ms

---- ---- ---- ---- ---- ---- ----
### 26/622 [`./test/index/commute/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10034 tests as sqlite

* 10017 skipped
* 1 failed
* 0% was OK

Time: 2448ms

---- ---- ---- ---- ---- ---- ----
### 27/622 [`./test/index/commute/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10030 tests as sqlite

* 10013 skipped
* 1 failed
* 0% was OK

Time: 2463ms

---- ---- ---- ---- ---- ---- ----
### 28/622 [`./test/index/commute/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_10.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 4261 tests as sqlite

* 4244 skipped
* 1 failed
* 0% was OK

Time: 1117ms

---- ---- ---- ---- ---- ---- ----
### 29/622 [`./test/index/commute/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_11.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2585ms

---- ---- ---- ---- ---- ---- ----
### 30/622 [`./test/index/commute/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_12.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10031 tests as sqlite

* 10014 skipped
* 1 failed
* 0% was OK

Time: 2640ms

---- ---- ---- ---- ---- ---- ----
### 31/622 [`./test/index/commute/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_13.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2908ms

---- ---- ---- ---- ---- ---- ----
### 32/622 [`./test/index/commute/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_14.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2667ms

---- ---- ---- ---- ---- ---- ----
### 33/622 [`./test/index/commute/10/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_15.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10030 tests as sqlite

* 10013 skipped
* 1 failed
* 0% was OK

Time: 2577ms

---- ---- ---- ---- ---- ---- ----
### 34/622 [`./test/index/commute/10/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_16.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2758ms

---- ---- ---- ---- ---- ---- ----
### 35/622 [`./test/index/commute/10/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_17.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10031 tests as sqlite

* 10014 skipped
* 1 failed
* 0% was OK

Time: 2556ms

---- ---- ---- ---- ---- ---- ----
### 36/622 [`./test/index/commute/10/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_18.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10034 tests as sqlite

* 10017 skipped
* 1 failed
* 0% was OK

Time: 2466ms

---- ---- ---- ---- ---- ---- ----
### 37/622 [`./test/index/commute/10/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_19.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10031 tests as sqlite

* 10014 skipped
* 1 failed
* 0% was OK

Time: 2615ms

---- ---- ---- ---- ---- ---- ----
### 38/622 [`./test/index/commute/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10037 tests as sqlite

* 10020 skipped
* 1 failed
* 0% was OK

Time: 2485ms

---- ---- ---- ---- ---- ---- ----
### 39/622 [`./test/index/commute/10/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_20.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2522ms

---- ---- ---- ---- ---- ---- ----
### 40/622 [`./test/index/commute/10/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_21.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10030 tests as sqlite

* 10013 skipped
* 1 failed
* 0% was OK

Time: 2544ms

---- ---- ---- ---- ---- ---- ----
### 41/622 [`./test/index/commute/10/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_22.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 2501ms

---- ---- ---- ---- ---- ---- ----
### 42/622 [`./test/index/commute/10/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_23.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 2614ms

---- ---- ---- ---- ---- ---- ----
### 43/622 [`./test/index/commute/10/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_24.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 2572ms

---- ---- ---- ---- ---- ---- ----
### 44/622 [`./test/index/commute/10/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_25.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10030 tests as sqlite

* 10013 skipped
* 1 failed
* 0% was OK

Time: 2531ms

---- ---- ---- ---- ---- ---- ----
### 45/622 [`./test/index/commute/10/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_26.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10031 tests as sqlite

* 10014 skipped
* 1 failed
* 0% was OK

Time: 2534ms

---- ---- ---- ---- ---- ---- ----
### 46/622 [`./test/index/commute/10/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_27.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 2669ms

---- ---- ---- ---- ---- ---- ----
### 47/622 [`./test/index/commute/10/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_28.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 2512ms

---- ---- ---- ---- ---- ---- ----
### 48/622 [`./test/index/commute/10/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_29.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2602ms

---- ---- ---- ---- ---- ---- ----
### 49/622 [`./test/index/commute/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2552ms

---- ---- ---- ---- ---- ---- ----
### 50/622 [`./test/index/commute/10/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_30.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2485ms

---- ---- ---- ---- ---- ---- ----
### 51/622 [`./test/index/commute/10/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_31.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10033 tests as sqlite

* 10016 skipped
* 1 failed
* 0% was OK

Time: 2523ms

---- ---- ---- ---- ---- ---- ----
### 52/622 [`./test/index/commute/10/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_32.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2601ms

---- ---- ---- ---- ---- ---- ----
### 53/622 [`./test/index/commute/10/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_33.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10034 tests as sqlite

* 10017 skipped
* 1 failed
* 0% was OK

Time: 2583ms

---- ---- ---- ---- ---- ---- ----
### 54/622 [`./test/index/commute/10/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_34.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2594ms

---- ---- ---- ---- ---- ---- ----
### 55/622 [`./test/index/commute/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10030 tests as sqlite

* 10013 skipped
* 1 failed
* 0% was OK

Time: 2537ms

---- ---- ---- ---- ---- ---- ----
### 56/622 [`./test/index/commute/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2449ms

---- ---- ---- ---- ---- ---- ----
### 57/622 [`./test/index/commute/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10036 tests as sqlite

* 10019 skipped
* 1 failed
* 0% was OK

Time: 2541ms

---- ---- ---- ---- ---- ---- ----
### 58/622 [`./test/index/commute/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10034 tests as sqlite

* 10017 skipped
* 1 failed
* 0% was OK

Time: 2514ms

---- ---- ---- ---- ---- ---- ----
### 59/622 [`./test/index/commute/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_8.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10032 tests as sqlite

* 10015 skipped
* 1 failed
* 0% was OK

Time: 2574ms

---- ---- ---- ---- ---- ---- ----
### 60/622 [`./test/index/commute/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_9.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10034 tests as sqlite

* 10017 skipped
* 1 failed
* 0% was OK

Time: 2633ms

---- ---- ---- ---- ---- ---- ----
### 61/622 [`./test/index/commute/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10122 tests as sqlite

* 10015 skipped
* 1 failed
* 1% was OK

Time: 2580ms

---- ---- ---- ---- ---- ---- ----
### 62/622 [`./test/index/commute/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10120 tests as sqlite

* 10013 skipped
* 1 failed
* 1% was OK

Time: 2489ms

---- ---- ---- ---- ---- ---- ----
### 63/622 [`./test/index/commute/100/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_10.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10124 tests as sqlite

* 10017 skipped
* 1 failed
* 1% was OK

Time: 2640ms

---- ---- ---- ---- ---- ---- ----
### 64/622 [`./test/index/commute/100/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_11.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10123 tests as sqlite

* 10016 skipped
* 1 failed
* 1% was OK

Time: 2601ms

---- ---- ---- ---- ---- ---- ----
### 65/622 [`./test/index/commute/100/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_12.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10123 tests as sqlite

* 10016 skipped
* 1 failed
* 1% was OK

Time: 2646ms

---- ---- ---- ---- ---- ---- ----
### 66/622 [`./test/index/commute/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10123 tests as sqlite

* 10016 skipped
* 1 failed
* 1% was OK

Time: 2783ms

---- ---- ---- ---- ---- ---- ----
### 67/622 [`./test/index/commute/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10121 tests as sqlite

* 10014 skipped
* 1 failed
* 1% was OK

Time: 2754ms

---- ---- ---- ---- ---- ---- ----
### 68/622 [`./test/index/commute/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10124 tests as sqlite

* 10017 skipped
* 1 failed
* 1% was OK

Time: 2835ms

---- ---- ---- ---- ---- ---- ----
### 69/622 [`./test/index/commute/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10121 tests as sqlite

* 10014 skipped
* 1 failed
* 1% was OK

Time: 2557ms

---- ---- ---- ---- ---- ---- ----
### 70/622 [`./test/index/commute/100/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10122 tests as sqlite

* 10015 skipped
* 1 failed
* 1% was OK

Time: 2592ms

---- ---- ---- ---- ---- ---- ----
### 71/622 [`./test/index/commute/100/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10123 tests as sqlite

* 10016 skipped
* 1 failed
* 1% was OK

Time: 3188ms

---- ---- ---- ---- ---- ---- ----
### 72/622 [`./test/index/commute/100/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_8.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10122 tests as sqlite

* 10015 skipped
* 1 failed
* 1% was OK

Time: 2939ms

---- ---- ---- ---- ---- ---- ----
### 73/622 [`./test/index/commute/100/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_9.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10123 tests as sqlite

* 10016 skipped
* 1 failed
* 1% was OK

Time: 3009ms

---- ---- ---- ---- ---- ---- ----
### 74/622 [`./test/index/commute/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 4741 tests as sqlite

* 3734 skipped
* 1 failed
* 21% was OK

Time: 2795ms

---- ---- ---- ---- ---- ---- ----
### 75/622 [`./test/index/commute/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10583 tests as sqlite

* 9576 skipped
* 1 failed
* 9% was OK

Time: 4357ms

---- ---- ---- ---- ---- ---- ----
### 76/622 [`./test/index/commute/1000/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11021 tests as sqlite

* 10014 skipped
* 1 failed
* 9% was OK

Time: 4443ms

---- ---- ---- ---- ---- ---- ----
### 77/622 [`./test/index/commute/1000/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11025 tests as sqlite

* 10018 skipped
* 1 failed
* 9% was OK

Time: 4042ms

---- ---- ---- ---- ---- ---- ----
### 78/622 [`./test/index/delete/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10907 tests as sqlite

* 10899 skipped
* 1 failed
* 0% was OK

Time: 2052ms

---- ---- ---- ---- ---- ---- ----
### 79/622 [`./test/index/delete/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10730 tests as sqlite

* 10713 skipped
* 1 failed
* 0% was OK

Time: 1979ms

---- ---- ---- ---- ---- ---- ----
### 80/622 [`./test/index/delete/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10774 tests as sqlite

* 10757 skipped
* 1 failed
* 0% was OK

Time: 1970ms

---- ---- ---- ---- ---- ---- ----
### 81/622 [`./test/index/delete/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 9390 tests as sqlite

* 9373 skipped
* 1 failed
* 0% was OK

Time: 1622ms

---- ---- ---- ---- ---- ---- ----
### 82/622 [`./test/index/delete/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10065 tests as sqlite

* 10048 skipped
* 1 failed
* 0% was OK

Time: 2058ms

---- ---- ---- ---- ---- ---- ----
### 83/622 [`./test/index/delete/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10599 tests as sqlite

* 10582 skipped
* 1 failed
* 0% was OK

Time: 2114ms

---- ---- ---- ---- ---- ---- ----
### 84/622 [`./test/index/delete/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10353 tests as sqlite

* 10336 skipped
* 1 failed
* 0% was OK

Time: 1919ms

---- ---- ---- ---- ---- ---- ----
### 85/622 [`./test/index/delete/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11145 tests as sqlite

* 11038 skipped
* 1 failed
* 0% was OK

Time: 1877ms

---- ---- ---- ---- ---- ---- ----
### 86/622 [`./test/index/delete/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10895 tests as sqlite

* 10788 skipped
* 1 failed
* 0% was OK

Time: 1841ms

---- ---- ---- ---- ---- ---- ----
### 87/622 [`./test/index/delete/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11033 tests as sqlite

* 10926 skipped
* 1 failed
* 0% was OK

Time: 1877ms

---- ---- ---- ---- ---- ---- ----
### 88/622 [`./test/index/delete/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10942 tests as sqlite

* 10835 skipped
* 1 failed
* 0% was OK

Time: 2056ms

---- ---- ---- ---- ---- ---- ----
### 89/622 [`./test/index/delete/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11924 tests as sqlite

* 10917 skipped
* 1 failed
* 8% was OK

Time: 3548ms

---- ---- ---- ---- ---- ---- ----
### 90/622 [`./test/index/delete/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1000/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11838 tests as sqlite

* 10831 skipped
* 1 failed
* 8% was OK

Time: 3461ms

---- ---- ---- ---- ---- ---- ----
### 91/622 [`./test/index/delete/10000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 20347 tests as sqlite

* 10340 skipped
* 1 failed
* 49% was OK

Time: 18325ms

---- ---- ---- ---- ---- ---- ----
### 92/622 [`./test/index/in/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10035 tests as sqlite

* 10018 skipped
* 1 failed
* 0% was OK

Time: 4169ms

---- ---- ---- ---- ---- ---- ----
### 93/622 [`./test/index/in/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10036 tests as sqlite

* 10019 skipped
* 1 failed
* 0% was OK

Time: 3937ms

---- ---- ---- ---- ---- ---- ----
### 94/622 [`./test/index/in/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10035 tests as sqlite

* 10018 skipped
* 1 failed
* 0% was OK

Time: 3813ms

---- ---- ---- ---- ---- ---- ----
### 95/622 [`./test/index/in/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10037 tests as sqlite

* 10020 skipped
* 1 failed
* 0% was OK

Time: 3752ms

---- ---- ---- ---- ---- ---- ----
### 96/622 [`./test/index/in/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10038 tests as sqlite

* 10021 skipped
* 1 failed
* 0% was OK

Time: 3913ms

---- ---- ---- ---- ---- ---- ----
### 97/622 [`./test/index/in/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10038 tests as sqlite

* 10021 skipped
* 1 failed
* 0% was OK

Time: 3964ms

---- ---- ---- ---- ---- ---- ----
### 98/622 [`./test/index/in/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10128 tests as sqlite

* 10021 skipped
* 1 failed
* 1% was OK

Time: 3774ms

---- ---- ---- ---- ---- ---- ----
### 99/622 [`./test/index/in/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10127 tests as sqlite

* 10020 skipped
* 1 failed
* 1% was OK

Time: 4107ms

---- ---- ---- ---- ---- ---- ----
### 100/622 [`./test/index/in/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10128 tests as sqlite

* 10021 skipped
* 1 failed
* 1% was OK

Time: 3985ms

---- ---- ---- ---- ---- ---- ----
### 101/622 [`./test/index/in/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10126 tests as sqlite

* 10019 skipped
* 1 failed
* 1% was OK

Time: 4301ms

---- ---- ---- ---- ---- ---- ----
### 102/622 [`./test/index/in/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10127 tests as sqlite

* 10020 skipped
* 1 failed
* 1% was OK

Time: 4133ms

---- ---- ---- ---- ---- ---- ----
### 103/622 [`./test/index/in/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11028 tests as sqlite

* 10021 skipped
* 1 failed
* 9% was OK

Time: 5627ms

---- ---- ---- ---- ---- ---- ----
### 104/622 [`./test/index/in/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/1000/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11024 tests as sqlite

* 10017 skipped
* 1 failed
* 9% was OK

Time: 5484ms

---- ---- ---- ---- ---- ---- ----
### 105/622 [`./test/index/orderby/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2469ms

---- ---- ---- ---- ---- ---- ----
### 106/622 [`./test/index/orderby/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10054 tests as sqlite

* 10037 skipped
* 1 failed
* 0% was OK

Time: 2500ms

---- ---- ---- ---- ---- ---- ----
### 107/622 [`./test/index/orderby/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_10.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2636ms

---- ---- ---- ---- ---- ---- ----
### 108/622 [`./test/index/orderby/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_11.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2416ms

---- ---- ---- ---- ---- ---- ----
### 109/622 [`./test/index/orderby/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_12.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2449ms

---- ---- ---- ---- ---- ---- ----
### 110/622 [`./test/index/orderby/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_13.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2471ms

---- ---- ---- ---- ---- ---- ----
### 111/622 [`./test/index/orderby/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_14.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2441ms

---- ---- ---- ---- ---- ---- ----
### 112/622 [`./test/index/orderby/10/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_15.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2660ms

---- ---- ---- ---- ---- ---- ----
### 113/622 [`./test/index/orderby/10/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_16.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10050 tests as sqlite

* 10033 skipped
* 1 failed
* 0% was OK

Time: 2582ms

---- ---- ---- ---- ---- ---- ----
### 114/622 [`./test/index/orderby/10/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_17.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10054 tests as sqlite

* 10037 skipped
* 1 failed
* 0% was OK

Time: 2783ms

---- ---- ---- ---- ---- ---- ----
### 115/622 [`./test/index/orderby/10/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_18.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2677ms

---- ---- ---- ---- ---- ---- ----
### 116/622 [`./test/index/orderby/10/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_19.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2313ms

---- ---- ---- ---- ---- ---- ----
### 117/622 [`./test/index/orderby/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2639ms

---- ---- ---- ---- ---- ---- ----
### 118/622 [`./test/index/orderby/10/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_20.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2554ms

---- ---- ---- ---- ---- ---- ----
### 119/622 [`./test/index/orderby/10/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_21.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2610ms

---- ---- ---- ---- ---- ---- ----
### 120/622 [`./test/index/orderby/10/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_22.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2485ms

---- ---- ---- ---- ---- ---- ----
### 121/622 [`./test/index/orderby/10/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_23.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2406ms

---- ---- ---- ---- ---- ---- ----
### 122/622 [`./test/index/orderby/10/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_24.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2331ms

---- ---- ---- ---- ---- ---- ----
### 123/622 [`./test/index/orderby/10/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_25.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2383ms

---- ---- ---- ---- ---- ---- ----
### 124/622 [`./test/index/orderby/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2494ms

---- ---- ---- ---- ---- ---- ----
### 125/622 [`./test/index/orderby/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2353ms

---- ---- ---- ---- ---- ---- ----
### 126/622 [`./test/index/orderby/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2372ms

---- ---- ---- ---- ---- ---- ----
### 127/622 [`./test/index/orderby/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10048 tests as sqlite

* 10031 skipped
* 1 failed
* 0% was OK

Time: 2494ms

---- ---- ---- ---- ---- ---- ----
### 128/622 [`./test/index/orderby/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2459ms

---- ---- ---- ---- ---- ---- ----
### 129/622 [`./test/index/orderby/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_8.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2596ms

---- ---- ---- ---- ---- ---- ----
### 130/622 [`./test/index/orderby/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_9.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10050 tests as sqlite

* 10033 skipped
* 1 failed
* 0% was OK

Time: 2454ms

---- ---- ---- ---- ---- ---- ----
### 131/622 [`./test/index/orderby/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10141 tests as sqlite

* 10034 skipped
* 1 failed
* 1% was OK

Time: 2670ms

---- ---- ---- ---- ---- ---- ----
### 132/622 [`./test/index/orderby/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10140 tests as sqlite

* 10033 skipped
* 1 failed
* 1% was OK

Time: 2580ms

---- ---- ---- ---- ---- ---- ----
### 133/622 [`./test/index/orderby/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10142 tests as sqlite

* 10035 skipped
* 1 failed
* 1% was OK

Time: 2459ms

---- ---- ---- ---- ---- ---- ----
### 134/622 [`./test/index/orderby/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10140 tests as sqlite

* 10033 skipped
* 1 failed
* 1% was OK

Time: 2450ms

---- ---- ---- ---- ---- ---- ----
### 135/622 [`./test/index/orderby/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11043 tests as sqlite

* 10036 skipped
* 1 failed
* 9% was OK

Time: 4093ms

---- ---- ---- ---- ---- ---- ----
### 136/622 [`./test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2842ms

---- ---- ---- ---- ---- ---- ----
### 137/622 [`./test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2763ms

---- ---- ---- ---- ---- ---- ----
### 138/622 [`./test/index/orderby_nosort/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_10.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 3139ms

---- ---- ---- ---- ---- ---- ----
### 139/622 [`./test/index/orderby_nosort/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_11.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2479ms

---- ---- ---- ---- ---- ---- ----
### 140/622 [`./test/index/orderby_nosort/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_12.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2323ms

---- ---- ---- ---- ---- ---- ----
### 141/622 [`./test/index/orderby_nosort/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_13.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2700ms

---- ---- ---- ---- ---- ---- ----
### 142/622 [`./test/index/orderby_nosort/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_14.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2399ms

---- ---- ---- ---- ---- ---- ----
### 143/622 [`./test/index/orderby_nosort/10/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_15.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10054 tests as sqlite

* 10037 skipped
* 1 failed
* 0% was OK

Time: 2530ms

---- ---- ---- ---- ---- ---- ----
### 144/622 [`./test/index/orderby_nosort/10/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_16.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2526ms

---- ---- ---- ---- ---- ---- ----
### 145/622 [`./test/index/orderby_nosort/10/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_17.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10050 tests as sqlite

* 10033 skipped
* 1 failed
* 0% was OK

Time: 2552ms

---- ---- ---- ---- ---- ---- ----
### 146/622 [`./test/index/orderby_nosort/10/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_18.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10050 tests as sqlite

* 10033 skipped
* 1 failed
* 0% was OK

Time: 2674ms

---- ---- ---- ---- ---- ---- ----
### 147/622 [`./test/index/orderby_nosort/10/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_19.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2851ms

---- ---- ---- ---- ---- ---- ----
### 148/622 [`./test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2365ms

---- ---- ---- ---- ---- ---- ----
### 149/622 [`./test/index/orderby_nosort/10/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_20.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2317ms

---- ---- ---- ---- ---- ---- ----
### 150/622 [`./test/index/orderby_nosort/10/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_21.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2379ms

---- ---- ---- ---- ---- ---- ----
### 151/622 [`./test/index/orderby_nosort/10/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_22.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10054 tests as sqlite

* 10037 skipped
* 1 failed
* 0% was OK

Time: 2476ms

---- ---- ---- ---- ---- ---- ----
### 152/622 [`./test/index/orderby_nosort/10/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_23.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2525ms

---- ---- ---- ---- ---- ---- ----
### 153/622 [`./test/index/orderby_nosort/10/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_24.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10054 tests as sqlite

* 10037 skipped
* 1 failed
* 0% was OK

Time: 2861ms

---- ---- ---- ---- ---- ---- ----
### 154/622 [`./test/index/orderby_nosort/10/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_25.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2505ms

---- ---- ---- ---- ---- ---- ----
### 155/622 [`./test/index/orderby_nosort/10/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_26.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 2281ms

---- ---- ---- ---- ---- ---- ----
### 156/622 [`./test/index/orderby_nosort/10/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_27.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2288ms

---- ---- ---- ---- ---- ---- ----
### 157/622 [`./test/index/orderby_nosort/10/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_28.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2365ms

---- ---- ---- ---- ---- ---- ----
### 158/622 [`./test/index/orderby_nosort/10/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_29.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10050 tests as sqlite

* 10033 skipped
* 1 failed
* 0% was OK

Time: 2221ms

---- ---- ---- ---- ---- ---- ----
### 159/622 [`./test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10051 tests as sqlite

* 10034 skipped
* 1 failed
* 0% was OK

Time: 2341ms

---- ---- ---- ---- ---- ---- ----
### 160/622 [`./test/index/orderby_nosort/10/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_30.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2687ms

---- ---- ---- ---- ---- ---- ----
### 161/622 [`./test/index/orderby_nosort/10/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_31.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2586ms

---- ---- ---- ---- ---- ---- ----
### 162/622 [`./test/index/orderby_nosort/10/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_32.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2511ms

---- ---- ---- ---- ---- ---- ----
### 163/622 [`./test/index/orderby_nosort/10/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_33.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10050 tests as sqlite

* 10033 skipped
* 1 failed
* 0% was OK

Time: 2643ms

---- ---- ---- ---- ---- ---- ----
### 164/622 [`./test/index/orderby_nosort/10/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_34.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2582ms

---- ---- ---- ---- ---- ---- ----
### 165/622 [`./test/index/orderby_nosort/10/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_35.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10049 tests as sqlite

* 10032 skipped
* 1 failed
* 0% was OK

Time: 2378ms

---- ---- ---- ---- ---- ---- ----
### 166/622 [`./test/index/orderby_nosort/10/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_36.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2554ms

---- ---- ---- ---- ---- ---- ----
### 167/622 [`./test/index/orderby_nosort/10/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_37.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2407ms

---- ---- ---- ---- ---- ---- ----
### 168/622 [`./test/index/orderby_nosort/10/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_38.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 2812ms

---- ---- ---- ---- ---- ---- ----
### 169/622 [`./test/index/orderby_nosort/10/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_39.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 3205ms

---- ---- ---- ---- ---- ---- ----
### 170/622 [`./test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 3204ms

---- ---- ---- ---- ---- ---- ----
### 171/622 [`./test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 3059ms

---- ---- ---- ---- ---- ---- ----
### 172/622 [`./test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10053 tests as sqlite

* 10036 skipped
* 1 failed
* 0% was OK

Time: 4246ms

---- ---- ---- ---- ---- ---- ----
### 173/622 [`./test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10052 tests as sqlite

* 10035 skipped
* 1 failed
* 0% was OK

Time: 3491ms

---- ---- ---- ---- ---- ---- ----
### 174/622 [`./test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_8.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10054 tests as sqlite

* 10037 skipped
* 1 failed
* 0% was OK

Time: 4395ms

---- ---- ---- ---- ---- ---- ----
### 175/622 [`./test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_9.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10055 tests as sqlite

* 10038 skipped
* 1 failed
* 0% was OK

Time: 7377ms

---- ---- ---- ---- ---- ---- ----
### 176/622 [`./test/index/orderby_nosort/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10149 tests as sqlite

* 10042 skipped
* 1 failed
* 1% was OK

Time: 6177ms

---- ---- ---- ---- ---- ---- ----
### 177/622 [`./test/index/orderby_nosort/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10141 tests as sqlite

* 10034 skipped
* 1 failed
* 1% was OK

Time: 3915ms

---- ---- ---- ---- ---- ---- ----
### 178/622 [`./test/index/orderby_nosort/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10142 tests as sqlite

* 10035 skipped
* 1 failed
* 1% was OK

Time: 4362ms

---- ---- ---- ---- ---- ---- ----
### 179/622 [`./test/index/orderby_nosort/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10143 tests as sqlite

* 10036 skipped
* 1 failed
* 1% was OK

Time: 3132ms

---- ---- ---- ---- ---- ---- ----
### 180/622 [`./test/index/orderby_nosort/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10141 tests as sqlite

* 10034 skipped
* 1 failed
* 1% was OK

Time: 2965ms

---- ---- ---- ---- ---- ---- ----
### 181/622 [`./test/index/orderby_nosort/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10142 tests as sqlite

* 10035 skipped
* 1 failed
* 1% was OK

Time: 2983ms

---- ---- ---- ---- ---- ---- ----
### 182/622 [`./test/index/orderby_nosort/100/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10144 tests as sqlite

* 10037 skipped
* 1 failed
* 1% was OK

Time: 3199ms

---- ---- ---- ---- ---- ---- ----
### 183/622 [`./test/index/orderby_nosort/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11040 tests as sqlite

* 10033 skipped
* 1 failed
* 9% was OK

Time: 4918ms

---- ---- ---- ---- ---- ---- ----
### 184/622 [`./test/index/orderby_nosort/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/1000/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11043 tests as sqlite

* 10036 skipped
* 1 failed
* 9% was OK

Time: 4682ms

---- ---- ---- ---- ---- ---- ----
### 185/622 [`./test/index/random/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12172 tests as sqlite

* 12155 skipped
* 1 failed
* 0% was OK

Time: 3959ms

---- ---- ---- ---- ---- ---- ----
### 186/622 [`./test/index/random/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12289 tests as sqlite

* 12272 skipped
* 1 failed
* 0% was OK

Time: 3312ms

---- ---- ---- ---- ---- ---- ----
### 187/622 [`./test/index/random/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_10.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12229 tests as sqlite

* 12212 skipped
* 1 failed
* 0% was OK

Time: 3032ms

---- ---- ---- ---- ---- ---- ----
### 188/622 [`./test/index/random/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_11.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12251 tests as sqlite

* 12234 skipped
* 1 failed
* 0% was OK

Time: 3148ms

---- ---- ---- ---- ---- ---- ----
### 189/622 [`./test/index/random/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_12.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12218 tests as sqlite

* 12201 skipped
* 1 failed
* 0% was OK

Time: 4005ms

---- ---- ---- ---- ---- ---- ----
### 190/622 [`./test/index/random/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_13.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12252 tests as sqlite

* 12235 skipped
* 1 failed
* 0% was OK

Time: 3501ms

---- ---- ---- ---- ---- ---- ----
### 191/622 [`./test/index/random/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_14.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12161 tests as sqlite

* 12144 skipped
* 1 failed
* 0% was OK

Time: 3756ms

---- ---- ---- ---- ---- ---- ----
### 192/622 [`./test/index/random/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12124 tests as sqlite

* 12107 skipped
* 1 failed
* 0% was OK

Time: 3400ms

---- ---- ---- ---- ---- ---- ----
### 193/622 [`./test/index/random/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12154 tests as sqlite

* 12137 skipped
* 1 failed
* 0% was OK

Time: 4407ms

---- ---- ---- ---- ---- ---- ----
### 194/622 [`./test/index/random/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12238 tests as sqlite

* 12221 skipped
* 1 failed
* 0% was OK

Time: 5339ms

---- ---- ---- ---- ---- ---- ----
### 195/622 [`./test/index/random/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 11869 tests as sqlite

* 11852 skipped
* 1 failed
* 0% was OK

Time: 6856ms

---- ---- ---- ---- ---- ---- ----
### 196/622 [`./test/index/random/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12044 tests as sqlite

* 12027 skipped
* 1 failed
* 0% was OK

Time: 4233ms

---- ---- ---- ---- ---- ---- ----
### 197/622 [`./test/index/random/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12071 tests as sqlite

* 12054 skipped
* 1 failed
* 0% was OK

Time: 4087ms

---- ---- ---- ---- ---- ---- ----
### 198/622 [`./test/index/random/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_8.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12117 tests as sqlite

* 12100 skipped
* 1 failed
* 0% was OK

Time: 3906ms

---- ---- ---- ---- ---- ---- ----
### 199/622 [`./test/index/random/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_9.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12091 tests as sqlite

* 12074 skipped
* 1 failed
* 0% was OK

Time: 3748ms

---- ---- ---- ---- ---- ---- ----
### 200/622 [`./test/index/random/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12028 tests as sqlite

* 11921 skipped
* 1 failed
* 0% was OK

Time: 6232ms

---- ---- ---- ---- ---- ---- ----
### 201/622 [`./test/index/random/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12178 tests as sqlite

* 12071 skipped
* 1 failed
* 0% was OK

Time: 4250ms

---- ---- ---- ---- ---- ---- ----
### 202/622 [`./test/index/random/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 2302 tests as sqlite

* 1295 skipped
* 1 failed
* 43% was OK

Time: 3728ms

---- ---- ---- ---- ---- ---- ----
### 203/622 [`./test/index/random/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 1061 tests as sqlite

* 54 skipped
* 1 failed
* 94% was OK

Time: 4944ms

---- ---- ---- ---- ---- ---- ----
### 204/622 [`./test/index/random/1000/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 1027 tests as sqlite

* 20 skipped
* 1 failed
* 97% was OK

Time: 4440ms

---- ---- ---- ---- ---- ---- ----
### 205/622 [`./test/index/random/1000/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 1033 tests as sqlite

* 26 skipped
* 1 failed
* 97% was OK

Time: 2065ms

---- ---- ---- ---- ---- ---- ----
### 206/622 [`./test/index/random/1000/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 1037 tests as sqlite

* 30 skipped
* 1 failed
* 97% was OK

Time: 2692ms

---- ---- ---- ---- ---- ---- ----
### 207/622 [`./test/index/random/1000/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 5003 tests as sqlite

* 3996 skipped
* 1 failed
* 20% was OK

Time: 4815ms

---- ---- ---- ---- ---- ---- ----
### 208/622 [`./test/index/random/1000/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 12951 tests as sqlite

* 11944 skipped
* 1 failed
* 7% was OK

Time: 5582ms

---- ---- ---- ---- ---- ---- ----
### 209/622 [`./test/index/random/1000/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 13012 tests as sqlite

* 12005 skipped
* 1 failed
* 7% was OK

Time: 7853ms

---- ---- ---- ---- ---- ---- ----
### 210/622 [`./test/index/random/1000/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_8.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 5631 tests as sqlite

* 4624 skipped
* 1 failed
* 17% was OK

Time: 4145ms

---- ---- ---- ---- ---- ---- ----
### 211/622 [`./test/index/view/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_0.test)

_Mimic sqlite_
Time: 1ms

---- ---- ---- ---- ---- ---- ----
### 212/622 [`./test/index/view/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8200 tests as sqlite

* 8183 skipped
* 1 failed
* 0% was OK

Time: 2379ms

---- ---- ---- ---- ---- ---- ----
### 213/622 [`./test/index/view/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8428 tests as sqlite

* 8411 skipped
* 1 failed
* 0% was OK

Time: 2220ms

---- ---- ---- ---- ---- ---- ----
### 214/622 [`./test/index/view/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7739 tests as sqlite

* 7722 skipped
* 1 failed
* 0% was OK

Time: 2186ms

---- ---- ---- ---- ---- ---- ----
### 215/622 [`./test/index/view/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8661 tests as sqlite

* 8644 skipped
* 1 failed
* 0% was OK

Time: 2500ms

---- ---- ---- ---- ---- ---- ----
### 216/622 [`./test/index/view/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8317 tests as sqlite

* 8300 skipped
* 1 failed
* 0% was OK

Time: 2390ms

---- ---- ---- ---- ---- ---- ----
### 217/622 [`./test/index/view/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_6.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7050 tests as sqlite

* 7033 skipped
* 1 failed
* 0% was OK

Time: 2537ms

---- ---- ---- ---- ---- ---- ----
### 218/622 [`./test/index/view/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_7.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7971 tests as sqlite

* 7954 skipped
* 1 failed
* 0% was OK

Time: 2406ms

---- ---- ---- ---- ---- ---- ----
### 219/622 [`./test/index/view/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8866 tests as sqlite

* 8759 skipped
* 1 failed
* 1% was OK

Time: 3481ms

---- ---- ---- ---- ---- ---- ----
### 220/622 [`./test/index/view/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_1.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8172 tests as sqlite

* 8065 skipped
* 1 failed
* 1% was OK

Time: 2782ms

---- ---- ---- ---- ---- ---- ----
### 221/622 [`./test/index/view/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_2.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8403 tests as sqlite

* 8296 skipped
* 1 failed
* 1% was OK

Time: 2488ms

---- ---- ---- ---- ---- ---- ----
### 222/622 [`./test/index/view/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_3.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7252 tests as sqlite

* 7145 skipped
* 1 failed
* 1% was OK

Time: 2264ms

---- ---- ---- ---- ---- ---- ----
### 223/622 [`./test/index/view/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_4.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7943 tests as sqlite

* 7836 skipped
* 1 failed
* 1% was OK

Time: 2530ms

---- ---- ---- ---- ---- ---- ----
### 224/622 [`./test/index/view/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_5.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8402 tests as sqlite

* 8295 skipped
* 1 failed
* 1% was OK

Time: 2656ms

---- ---- ---- ---- ---- ---- ----
### 225/622 [`./test/index/view/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/1000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7693 tests as sqlite

* 6686 skipped
* 1 failed
* 13% was OK

Time: 6528ms

---- ---- ---- ---- ---- ---- ----
### 226/622 [`./test/index/view/10000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10000/slt_good_0.test)

_Mimic sqlite_

```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 10712 tests as sqlite

* 705 skipped
* 1 failed
* 93% was OK

Time: 94936ms

---- ---- ---- ---- ---- ---- ----
### 227/622 [`./test/random/aggregates/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_0.test)

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
SELECT ALL - col2 + + + CAST ( NULL AS INTEGER ) AS col0, CAST ( - col0 AS REAL ) * - CAST ( NULL AS INTEGER ) + - col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-23","-51","-40","-77","-58","-67"]
```

#### ☓ Ran 10012 tests as sqlite

* 1462 failed
* 85% was OK

Time: 81584ms

---- ---- ---- ---- ---- ---- ----
### 228/622 [`./test/random/aggregates/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL col1, + col2 col1 FROM tab2

Expected: ["51","23","67","58","77","40"] but got ["23","23","40","40","58","58"]
```


```sql
SELECT ALL + MAX ( col0 ) FROM tab2 AS cor0 WHERE col2 * + CAST ( NULL AS REAL ) IS NULL

Expected: ["75"] but got ["NULL"]
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
SELECT 48 + + col2 AS col0, 47 + - + col2 + CAST ( NULL AS REAL ) + + col2 AS col0 FROM tab2 AS cor0

Expected: ["106","NULL","71","NULL","88","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + 36 / + - 21 AS col1, + CAST ( NULL AS INTEGER ) * + COUNT ( * ) AS col1 FROM tab2

Expected: ["NULL","NULL"] but got ["0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1268 failed
* 87% was OK

Time: 55848ms

---- ---- ---- ---- ---- ---- ----
### 229/622 [`./test/random/aggregates/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT - COUNT ( * ) / + 47 FROM tab2 WHERE NOT col2 NOT IN ( - 30 + + CAST ( col1 AS INTEGER ) * - CAST ( NULL AS REAL ) )

Expected: ["0"] but got ["-0.064"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) * - CAST ( - 49 AS INTEGER ) / col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - MAX ( + + CAST ( NULL AS INTEGER ) ) AS col1 FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab1 WHERE NOT col2 IN ( 35, + 27 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1 WHERE + 30 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT col2 / + col0, + CAST ( NULL AS REAL ) AS col1 FROM tab2

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["0.500","NULL","0.625","NULL","0.773","NULL"]
```


```sql
SELECT + CAST ( - + COUNT ( * ) AS INTEGER ) AS col0 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab1 cor0 LEFT OUTER JOIN tab2 AS cor1 ON NULL IS NOT NULL

6 results returned but expected 18
```


```sql
SELECT DISTINCT + SUM ( DISTINCT + col2 ), - MAX ( DISTINCT + - 11 ) FROM tab2 WHERE NULL = - 61 + + col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - MAX ( - col1 ) FROM tab0 AS cor0 WHERE NOT - 24 - + 79 IN ( + 97, + CAST ( ( - + col2 ) AS INTEGER ) * - - col0 )

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT - 55 * - col1 AS col0, col2 / CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["2805","NULL","3685","NULL","4235","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + MIN ( DISTINCT + col2 ) AS col2, + ( SUM ( + - col2 ) ) col2 FROM tab1 AS cor0

Expected: ["59","-223"] but got ["-223"]
```

#### ☓ Ran 10012 tests as sqlite

* 1523 failed
* 84% was OK

Time: 54483ms

---- ---- ---- ---- ---- ---- ----
### 230/622 [`./test/random/aggregates/slt_good_100.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_100.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - - 36 * - + col2 AS col2 FROM tab0 WHERE NOT + + col2 IN ( - - 41, - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ( - 34 ) + + 16 + + ( col2 ) / col0 / + 49 FROM tab0

Expected: ["-18","-18","-18"] but got ["-17.936","-17.979","-17.998"]
```


```sql
SELECT ALL - + CAST ( - AVG ( col1 ) AS INTEGER ) * - 2 col0 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT ( - 31 ) + + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL"] but got ["-31"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - CAST ( NULL AS INTEGER ) col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 LEFT JOIN tab2 AS cor1 ON NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + col0 * + 42 AS col2, - col0 * col0 / 19 AS col2, - 68 AS col1 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + COUNT ( * ) / + - CAST ( - MIN ( ALL - 13 ) AS INTEGER ) FROM tab2

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT col2 col2, CAST ( NULL AS REAL ) AS col2 FROM tab2

Expected: ["23","NULL","40","NULL","58","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ), - MAX ( + + 50 ) FROM tab0 AS cor0 WHERE NOT NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT col2 AS col0, col0 / + - CAST ( + ( CAST ( NULL AS INTEGER ) ) AS INTEGER ) AS col0 FROM tab1

Expected: ["59","NULL","68","NULL","96","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 JOIN tab2 AS cor1 ON NULL IS NULL, tab1 AS cor2

Parse error on line 1:
...cor1 ON NULL IS NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + 23 + - CAST ( NULL AS REAL ) - + + 67 * + + col2 col1, + col1 * + CAST ( NULL AS INTEGER ) + + - col0 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-15","NULL","-87","NULL","-97"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab0 WHERE NOT - col0 >= - 17

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1513 failed
* 84% was OK

Time: 54724ms

---- ---- ---- ---- ---- ---- ----
### 231/622 [`./test/random/aggregates/slt_good_101.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_101.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * col0 + - col0 / - col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0.531","1.338","1.441"]
```


```sql
SELECT 8 AS col0, + col2 + - col0 * - 62 AS col0 FROM tab1

Expected: ["8","3258","8","5329","8","5710"] but got ["3258","3258","5329","5329","5710","5710"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) * - col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT ALL - 20 * + CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + col1 * + 98 - col2 AS col1 FROM tab0 AS cor0 WHERE NOT + col0 IN ( - col1, + col2 * col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL CAST ( COUNT ( * ) AS INTEGER ) FROM tab0, tab2 AS cor0

g is not defined
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE ( NOT ( NULL IS NOT NULL ) )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - MIN ( - + col2 ) * + COUNT ( * ) AS col2 FROM tab0 WHERE NOT + 87 BETWEEN NULL AND - col2 + - col1

Expected: ["297"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab2 AS cor1 WHERE NOT ( ( NULL IS NOT NULL ) )

18 results returned but expected 54
```


```sql
SELECT - SUM ( + col0 ), SUM ( col1 ) FROM tab0 WHERE NOT ( + - col0 ) IS NOT NULL

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS REAL ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - - 48 / + 57 * col2 col2, + col0 + ( - ( col0 ) ) - CAST ( NULL AS REAL ) FROM tab1 AS cor0

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["0.009","NULL","0.012","NULL","0.014","NULL"]
```


```sql
SELECT - 70 + + ( col1 ) AS col1, ( - 64 ) AS col1 FROM tab1 cor0

Expected: ["-23","-64","-56","-64","-65","-64"] but got ["-64","-64","-64","-64","-64","-64"]
```

#### ☓ Ran 10012 tests as sqlite

* 1529 failed
* 84% was OK

Time: 50189ms

---- ---- ---- ---- ---- ---- ----
### 232/622 [`./test/random/aggregates/slt_good_102.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_102.test)

_Mimic sqlite_

```sql
SELECT ALL + COUNT ( * ) FROM tab1 cor0 WHERE NOT ( NULL ) >= col0

Expected: ["0"] but got ["3"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * + 65 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - COUNT ( * ) * - - CAST ( NULL AS INTEGER ) col0 FROM tab1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab2 WHERE col1 * - col1 / - col1 * + col2 * - CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT COUNT ( * ) / CAST ( + MAX ( + col1 ) AS INTEGER ) FROM tab0 AS cor0

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT + ( - - CAST ( + - COUNT ( * ) AS INTEGER ) ) FROM tab1 cor0

g is not defined
```


```sql
SELECT ALL col1 * + col1 col1, - 53 * - + ( + + col2 ) AS col1, col1 + - col0 col2 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT ( NOT NULL IS NULL )

18 results returned but expected 54
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ), - ( + col0 ) / - col2 AS col1 FROM tab0

Expected: ["NULL","0","NULL","8"] but got ["0","0.319","0","0.980","0","8.700"]
```


```sql
SELECT ALL - + 61 AS col0, CAST ( NULL AS REAL ) col0 FROM tab0 AS cor0

Expected: ["-61","NULL","-61","NULL","-61","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1430 failed
* 85% was OK

Time: 50269ms

---- ---- ---- ---- ---- ---- ----
### 233/622 [`./test/random/aggregates/slt_good_103.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_103.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + AVG ( ALL + CAST ( NULL AS INTEGER ) ) AS col2 FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + col0 AS col2 FROM tab2 AS cor0 WHERE NOT - ( + col0 ) + 49 BETWEEN col0 AND col0

Query was expected to return results (but did not) 
```


```sql
SELECT 55 * - SUM ( ALL 64 ) col0 FROM tab0 AS cor0 WHERE NOT + col1 - col0 IN ( col0 )

Expected: ["-10560"] but got ["0"]
```


```sql
SELECT ALL + 45 * - CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + CAST ( - + COUNT ( ALL - 16 ) AS INTEGER ) col2 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) col0 FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 cor1 WHERE ( - 43 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL 64 + MIN ( col0 ) * 42 AS col1 FROM tab2 AS cor0 WHERE NOT col2 * + CAST ( NULL AS INTEGER ) - + ( CAST ( NULL AS INTEGER ) + 66 ) IS NOT NULL

Expected: ["1996"] but got ["NULL"]
```


```sql
SELECT - + CAST ( NULL AS INTEGER ), + ( + 66 ) * CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT - ( SUM ( - - col2 ) ) col0, SUM ( DISTINCT - col0 ) FROM tab0 AS cor0 WHERE - col2 IS NULL

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1428 failed
* 85% was OK

Time: 44990ms

---- ---- ---- ---- ---- ---- ----
### 234/622 [`./test/random/aggregates/slt_good_104.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_104.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 64 / + + col0 FROM tab1

Expected: ["0","1"] but got ["0.703","0.753","1.255"]
```


```sql
SELECT + + SUM ( + - CAST ( NULL AS INTEGER ) ) / - 75 AS col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab0 WHERE NOT CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * ( - CAST ( NULL AS INTEGER ) ) + col1 FROM tab1 cor0 WHERE NOT ( NULL IS NOT NULL )

Expected: ["NULL","NULL","NULL"] but got ["14","47","5"]
```


```sql
SELECT DISTINCT - CAST ( MIN ( ALL col0 ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT * FROM tab2, tab2 AS cor0 WHERE NOT ( - 47 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT 86 * CAST ( NULL AS INTEGER ) AS col2, + CAST ( NULL AS REAL ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab2 AS cor1 WHERE 89 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT 4 - + - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["4","0","4","0","4","0"]
```


```sql
SELECT DISTINCT col2 * - 97 + + col2 AS col1 FROM tab2 AS cor0 WHERE - col1 NOT BETWEEN ( NULL ) AND ( - 56 )

Expected: ["-2208"] but got ["-2208","-3840","-5568"]
```


```sql
SELECT + + MAX ( - + col0 ) / 57 col2 FROM tab2 AS cor0 WHERE NOT + col1 * - ( - col1 ) + - col0 * - 56 + - + col0 BETWEEN + - ( + col2 ) + - col0 AND + - 51 * + col1 * + 53 * + 47 + + 27

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT 1 * + col0 AS col0, + col2 * - 68 + + + CAST ( NULL AS REAL ) AS col0 FROM tab0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1475 failed
* 85% was OK

Time: 40948ms

---- ---- ---- ---- ---- ---- ----
### 235/622 [`./test/random/aggregates/slt_good_105.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_105.test)

_Mimic sqlite_

```sql
SELECT ALL - - col0 / - 47 AS col0 FROM tab0 AS cor0

Expected: ["-1","-2","0"] but got ["-0.319","-1.851","-2.064"]
```


```sql
SELECT ALL + col2, + CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["59","NULL","68","NULL","96","NULL"] but got ["59","0","68","0","96","0"]
```


```sql
SELECT COUNT ( * ) * 60 * + CAST ( NULL AS INTEGER ) + + COUNT ( * ) FROM tab2

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT CAST ( - - SUM ( + ( - col0 ) ) AS INTEGER ) AS col0 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT ALL + 71 AS col0, ( - - CAST ( - CAST ( + MIN ( ALL - col2 ) AS INTEGER ) AS INTEGER ) ) AS col2 FROM tab1 AS cor0 WHERE NOT ( NULL ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT - col0 BETWEEN - col2 + 71 AND + col2 / + + col0 / - ( col0 ) + + + 46 + + col1 - col0 + - col2 * col0 / - 8

3 results returned but expected 9
```


```sql
SELECT ALL - COUNT ( DISTINCT + - 34 ) AS col2, COUNT ( * ) + MAX ( + CAST ( NULL AS REAL ) ) - + COUNT ( + + 64 ) AS col1 FROM tab1 AS cor0 WHERE NOT ( NULL ) NOT BETWEEN col1 AND col2

Expected: ["0","NULL"] but got ["-1","NULL"]
```


```sql
SELECT DISTINCT COUNT ( * ) * MIN ( ALL CAST ( + col0 AS INTEGER ) * + col0 ) FROM tab1 WHERE NOT + col2 * + ( - col1 ) IN ( col1 )

Expected: ["7803"] but got ["NULL"]
```


```sql
SELECT + col1 AS col0, CAST ( NULL AS REAL ) * - + 21 * + 77 AS col0 FROM tab0 cor0

Expected: ["1","NULL","21","NULL","81","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1528 failed
* 84% was OK

Time: 34732ms

---- ---- ---- ---- ---- ---- ----
### 236/622 [`./test/random/aggregates/slt_good_106.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_106.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 57 / 7 FROM tab0

Expected: ["8"] but got ["8.143"]
```


```sql
SELECT DISTINCT 23 AS col1 FROM tab1 WHERE NOT + col1 IN ( col0 + - col2 * + - 43 )

Query was expected to return results (but did not) 
```


```sql
SELECT - 56 AS col2, CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["-56","NULL","-56","NULL","-56","NULL"] but got ["-56","0","-56","0","-56","0"]
```


```sql
SELECT ALL + 34 * COUNT ( * ) - - 54 * - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["102"]
```


```sql
SELECT + CAST ( - + SUM ( DISTINCT 71 ) AS INTEGER ) - - - 82 AS col2, - 84 AS col2 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT 77 / - - 34 AS col2 FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 LEFT JOIN tab1 ON NULL BETWEEN NULL AND ( NULL )

6 results returned but expected 18
```


```sql
SELECT ALL + COUNT ( * ) / ( + CAST ( + MAX ( col0 ) AS INTEGER ) ) FROM tab2 AS cor0 WHERE NULL IS NULL

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT AVG ( DISTINCT + + CAST ( NULL AS INTEGER ) ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) col0, - col2 + CAST ( NULL AS INTEGER ) FROM tab1 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-59","0","-68","0","-96"]
```


```sql
SELECT DISTINCT + col0 / + col2 col2, CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["0","NULL","8","NULL"] but got ["0.319","0","0.980","0","8.700","0"]
```


```sql
SELECT col2 / col2 * CAST ( NULL AS REAL ) AS col0, col2 / col0 AS col1 FROM tab1

Expected: ["NULL","0","NULL","0","NULL","1"] but got ["NULL","0.694","NULL","0.747","NULL","1.882"]
```

#### ☓ Ran 10012 tests as sqlite

* 1442 failed
* 85% was OK

Time: 31105ms

---- ---- ---- ---- ---- ---- ----
### 237/622 [`./test/random/aggregates/slt_good_107.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_107.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + + MIN ( ALL col2 ) / - - COUNT ( * ) AS col0 FROM tab0 AS cor0

Expected: ["3"] but got ["3.333"]
```


```sql
SELECT ALL - CAST ( + - SUM ( - col1 ) AS INTEGER ) AS col2 FROM tab0

g is not defined
```


```sql
SELECT - SUM ( 1 ) FROM tab0 AS cor0 WHERE NOT NULL NOT IN ( - col1 )

Expected: ["NULL"] but got ["-3"]
```


```sql
SELECT ALL 62 col0, col1, ( - col1 ) * - col2 * ( + ( + col2 ) ) AS col0 FROM tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 WHERE NOT ( NOT - col1 * - + col2 * - col2 / col2 + + 61 NOT IN ( - - col1 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + CAST ( - - CAST ( NULL AS REAL ) AS INTEGER ) * col2 + + + col0 - - 75 * + - col2 * + col2 AS col0, 96 AS col1 FROM tab0

Expected: ["NULL","96","NULL","96","NULL","96"] but got ["-165660","96","-734978","96","-7413","96"]
```


```sql
SELECT ALL - MAX ( ALL - 87 ) AS col1, CAST ( NULL AS INTEGER ) AS col0 FROM tab0 WHERE - - col2 * - - col0 / + - 2 IS NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + + CAST ( NULL AS INTEGER ) * + col0 + col0 * + 90 + - col2 AS col0, CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["1303","0","7820","0","8631","0"]
```


```sql
SELECT ALL * FROM tab1 AS cor0 WHERE NOT - col0 BETWEEN col0 + - col2 AND col1 + col1

3 results returned but expected 9
```


```sql
SELECT - COUNT ( * ) / - CAST ( + SUM ( ALL - col1 ) AS INTEGER ) + - 4 * + COUNT ( * ) FROM tab2 AS cor0

Expected: ["-12"] but got ["NULL"]
```


```sql
SELECT MAX ( ALL ( - 9 ) ) / - 74 AS col2 FROM tab2 AS cor0

Expected: ["0"] but got ["0.122"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) col2, + col1 + col0 + - - col0 AS col2 FROM tab0 AS cor0

Expected: ["NULL","111","NULL","195"] but got ["111","111","195","195"]
```

#### ☓ Ran 10012 tests as sqlite

* 1377 failed
* 86% was OK

Time: 31077ms

---- ---- ---- ---- ---- ---- ----
### 238/622 [`./test/random/aggregates/slt_good_108.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_108.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - COUNT ( * ) / - 35 AS col2 FROM tab1, tab1 cor0

Expected: ["0"] but got ["0.257"]
```


```sql
SELECT * FROM tab1 WHERE NOT ( + - col1 ) IN ( + col2, col2 * col1 * ( + - 68 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - 88 + CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL"] but got ["-88"]
```


```sql
SELECT - CAST ( - MAX ( DISTINCT + col2 ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) / col1 + + + col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["51","85","91"]
```


```sql
SELECT ALL * FROM tab2, tab2 cor0 WHERE NOT - ( 34 ) = 73

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab1 cor0 WHERE NOT + col1 + + col1 * col1 BETWEEN col1 * + col1 - + col2 AND ( col1 )

3 results returned but expected 9
```


```sql
SELECT ALL + SUM ( ALL - - ( col0 ) ) AS col1, - CAST ( NULL AS INTEGER ) FROM tab2 WHERE NOT ( + col0 NOT BETWEEN + col1 AND NULL )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + + MAX ( DISTINCT - col2 ) + - COUNT ( * ) AS col0 FROM tab2 AS cor0 WHERE CAST ( NULL AS INTEGER ) / - 44 IS NULL

Expected: ["-26"] but got ["NULL"]
```


```sql
SELECT col1 * + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) - col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-46","0","-64","0","-75"]
```


```sql
SELECT ALL - COUNT ( * ) AS col1, 6 + + + 15 / CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["-3","NULL"] but got ["NULL"]
```


```sql
SELECT 12 / + - CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1508 failed
* 84% was OK

Time: 23525ms

---- ---- ---- ---- ---- ---- ----
### 239/622 [`./test/random/aggregates/slt_good_109.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_109.test)

_Mimic sqlite_

```sql
SELECT - 37 / + 90 + + ( col1 ) FROM tab1

Expected: ["14","47","5"] but got ["13.589","4.589","46.589"]
```


```sql
SELECT + SUM ( DISTINCT col1 ) FROM tab2 WHERE NOT - 80 IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col0, col2 AS col1 FROM tab1 AS cor0

Expected: ["NULL","59","NULL","68","NULL","96"] but got ["0","59","0","68","0","96"]
```


```sql
SELECT ALL CAST ( - - COUNT ( * ) AS INTEGER ) * 24 * - ( ( - - 63 ) ) AS col2 FROM tab2

g is not defined
```


```sql
SELECT * FROM tab1 AS cor0 WHERE NOT + ( - 23 ) BETWEEN ( + col0 ) AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) AS col2, COUNT ( * ) / CAST ( NULL AS REAL ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + MIN ( ALL - col0 ) AS col1 FROM tab1 cor0 WHERE - CAST ( NULL AS INTEGER ) + - CAST ( + 37 AS INTEGER ) + + + col0 IS NULL

Expected: ["-91"] but got ["NULL"]
```


```sql
SELECT DISTINCT + col0 * - + col1 * CAST ( NULL AS INTEGER ) * - + ( + CAST ( NULL AS INTEGER ) ) / + - CAST ( col1 AS INTEGER ) + col2 AS col0, 60 * - - col0 * ( - CAST ( NULL AS INTEGER ) ) * + - col0 + 74 * col2 FROM tab1 cor0

Expected: ["NULL","NULL"] but got ["59","4366","68","5032","96","7104"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 JOIN tab0 AS cor1 ON + 13 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT 75 + - - col1 AS col1, col1 FROM tab2

Expected: ["126","51","142","67","152","77"] but got ["51","51","67","67","77","77"]
```


```sql
SELECT + CAST ( NULL AS REAL ) + - - 18 AS col2, COUNT ( * ) col0 FROM tab0 WHERE ( + - CAST ( NULL AS INTEGER ) ) IS NULL

Expected: ["NULL","3"] but got ["NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1516 failed
* 84% was OK

Time: 20061ms

---- ---- ---- ---- ---- ---- ----
### 240/622 [`./test/random/aggregates/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_11.test)

_Mimic sqlite_

```sql
SELECT * FROM tab2 WHERE NOT - + col0 BETWEEN + col0 + + + col0 AND + 84

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + 30 * - CAST ( NULL AS INTEGER ) + - 69 + col1 AS col2, col2 AS col0 FROM tab1

Expected: ["NULL","59","NULL","68","NULL","96"] but got ["-22","68","-55","96","-64","59"]
```


```sql
SELECT - 18 / + 16 AS col0 FROM tab0 AS cor0

Expected: ["-1","-1","-1"] but got ["-1.125","-1.125","-1.125"]
```


```sql
SELECT DISTINCT + 92 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["NULL"] but got ["92"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) col1 FROM tab0, tab0 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ( - 56 ), + CAST ( - COUNT ( * ) AS INTEGER ) AS col2 FROM tab1

g is not defined
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col0, + col2 + - + col1 + + CAST ( NULL AS INTEGER ) + + col0 * 79 col2 FROM tab1

Expected: ["NULL","NULL"] but got ["0","4111","0","6769","0","7210"]
```


```sql
SELECT DISTINCT + + ( MIN ( ALL + col0 ) ) + COUNT ( * ) FROM tab0 WHERE NOT + 63 * col1 + - + ( col0 ) BETWEEN + col2 AND + col1

Expected: ["18"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 LEFT JOIN tab1 AS cor1 ON + 93 IS NOT NULL

18 results returned but expected 54
```

#### ☓ Ran 10012 tests as sqlite

* 1539 failed
* 84% was OK

Time: 17989ms

---- ---- ---- ---- ---- ---- ----
### 241/622 [`./test/random/aggregates/slt_good_110.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_110.test)

_Mimic sqlite_

```sql
SELECT 92 + - 90 AS col1, + ( + COUNT ( * ) ) AS col1 FROM tab1

Expected: ["2","3"] but got ["3"]
```


```sql
SELECT ALL - - CAST ( - COUNT ( * ) AS INTEGER ) - - 41 AS col0 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT - 53 AS col2, CAST ( NULL AS INTEGER ) * - ( col0 ) AS col1 FROM tab1 AS cor0

Expected: ["-53","NULL","-53","NULL","-53","NULL"] but got ["-53","0","-53","0","-53","0"]
```


```sql
SELECT - 1 * - + MIN ( DISTINCT col0 ) col2 FROM tab0 cor0 WHERE NOT - 39 + 68 NOT IN ( - col1, col2 * + col2 * col2, - + col1 )

Expected: ["NULL"] but got ["15"]
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col2 BETWEEN - - col1 AND ( 52 * 8 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 WHERE NOT 37 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + 5 / - col0 + - + col2 + - ( col1 ) + + 2 * - col2 AS col1, + CAST ( NULL AS REAL ) FROM tab2 AS cor0

Expected: ["-120","NULL","-197","NULL","-241","NULL"] but got ["-120.109","NULL","-197.078","NULL","-241.067","NULL"]
```


```sql
SELECT DISTINCT ( - ( MAX ( DISTINCT + col1 ) ) ) AS col1 FROM tab1 cor0 WHERE NOT - CAST ( NULL AS INTEGER ) * - + col2 IS NOT NULL

Expected: ["-47"] but got ["NULL"]
```


```sql
SELECT DISTINCT SUM ( ALL CAST ( NULL AS INTEGER ) ) AS col0, + COUNT ( + col0 ) / - CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL - COUNT ( - + 74 ) * - SUM ( DISTINCT - col1 ) + - CAST ( NULL AS INTEGER ) AS col2, + COUNT ( ALL - - col1 ) * + 78 + + 33 * - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["-198","234"]
```

#### ☓ Ran 10012 tests as sqlite

* 1482 failed
* 85% was OK

Time: 18347ms

---- ---- ---- ---- ---- ---- ----
### 242/622 [`./test/random/aggregates/slt_good_111.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_111.test)

_Mimic sqlite_

```sql
SELECT ALL CAST ( NULL AS INTEGER ) + + - ( - + col0 ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["51","85","91"]
```


```sql
SELECT col0 col2 FROM tab1 WHERE - + ( - col2 ) NOT BETWEEN NULL AND ( ( col0 ) )

Expected: ["51"] but got ["51","85","91"]
```


```sql
SELECT - MIN ( DISTINCT + col2 ) + 15 col0, COUNT ( * ) AS col1 FROM tab2 WHERE - CAST ( NULL AS INTEGER ) IS NOT NULL

Expected: ["NULL","0"] but got ["-8","3"]
```


```sql
SELECT ALL + - col2 + 25 FROM tab2 AS cor0 WHERE NOT col2 BETWEEN NULL AND - col2 + col0

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( COUNT ( * ) AS INTEGER ) col1 FROM tab0 WHERE - CAST ( NULL AS REAL ) NOT BETWEEN - col0 / col1 + 48 * col0 AND + col0 / ( col1 ) - + col1

g is not defined
```


```sql
SELECT DISTINCT + + 59 / - CAST ( MAX ( + + 62 ) AS INTEGER ) * SUM ( DISTINCT - col0 ) + + + 45 + - 79 FROM tab2 AS cor0

Expected: ["-34"] but got ["NULL"]
```


```sql
SELECT - 73 AS col0, 54 / + + AVG ( ALL + - CAST ( NULL AS INTEGER ) ) col0 FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1

Expected: ["-73","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + col1 AS col0, 7 AS col0, 68 - - 45 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 WHERE ( + 92 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL + + CAST ( NULL AS INTEGER ) * + COUNT ( * ) - - MIN ( ALL col2 ) + + ( - MAX ( 47 ) ) / - - COUNT ( ALL col0 ), MAX ( ALL + + CAST ( NULL AS INTEGER ) ) AS col1 FROM tab1 cor0

Expected: ["NULL","NULL"] but got ["43.333","0"]
```


```sql
SELECT + 90 + - col1 + ( 76 ) col2, + col2 / - + CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["145","NULL","165","NULL","85","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col0, + CAST ( NULL AS REAL ) FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT + col1 / + col0 + + col0 AS col2, + CAST ( NULL AS REAL ) * + col2 AS col1 FROM tab0 AS cor0

Expected: ["20","NULL","87","NULL","97","NULL"] but got ["20.400","NULL","87.241","NULL","97.010","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - - col0 AS col2, CAST ( NULL AS INTEGER ) * + + col2 + - 73 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-73","0","-73","0","-73"]
```

#### ☓ Ran 10012 tests as sqlite

* 1529 failed
* 84% was OK

Time: 17664ms

---- ---- ---- ---- ---- ---- ----
### 243/622 [`./test/random/aggregates/slt_good_112.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_112.test)

_Mimic sqlite_

```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col1 + CAST ( - + col0 AS INTEGER ) BETWEEN ( + col2 ) AND 47

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + 49 col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["49","49","49"]
```


```sql
SELECT DISTINCT + col1 - + + CAST ( NULL AS INTEGER ) / + - col0 FROM tab0 cor0

Expected: ["NULL"] but got ["1","21","81"]
```


```sql
SELECT DISTINCT + - 67 + 90 / + + col1 FROM tab0 AS cor0

Expected: ["-63","-66","23"] but got ["-62.714","-65.889","23"]
```


```sql
SELECT + CAST ( + ( - + MAX ( ALL + col2 ) ) AS INTEGER ) col0 FROM tab1

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ), - col1 + - - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-1","0","-21","0","-81"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 WHERE ( - 94 ) IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT MAX ( ALL + col0 ) AS col2 FROM tab2 cor0 WHERE NOT 1 + - col0 IN ( + + col0 )

Expected: ["75"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT ( 46 + ( 60 ) ) = ( - 64 * + 55 )

18 results returned but expected 54
```


```sql
SELECT DISTINCT + COUNT ( * ) AS col1, - CAST ( NULL AS REAL ) / - 77 AS col1 FROM tab2 AS cor0

Expected: ["3","NULL"] but got ["NULL"]
```


```sql
SELECT + - 75 - - - col0 + col0 / + col2 / CAST ( NULL AS REAL ) AS col2, 12 / col0 * + 37 FROM tab1 AS cor0

Expected: ["NULL","0","NULL","0","NULL","0"] but got ["NULL","4.879","NULL","5.224","NULL","8.706"]
```

#### ☓ Ran 10012 tests as sqlite

* 1438 failed
* 85% was OK

Time: 22551ms

---- ---- ---- ---- ---- ---- ----
### 244/622 [`./test/random/aggregates/slt_good_113.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_113.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( NULL AS INTEGER ) / 37 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL - 26 / + - 41 * col1 AS col2 FROM tab0

Expected: ["0","0","0"] but got ["0.008","0.030","0.634"]
```


```sql
SELECT SUM ( col2 ) FROM tab2 AS cor0 WHERE NOT NULL NOT BETWEEN NULL AND col2 * - col2 * + - 96 * - 74 / 1 + - col1

Expected: ["NULL"] but got ["121"]
```


```sql
SELECT * FROM tab2 WHERE NOT ( 89 * - 71 - - col2 ) IN ( col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE 56 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - + CAST ( NULL AS REAL ), + CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT DISTINCT + ( + CAST ( - COUNT ( * ) AS INTEGER ) ) FROM tab1 AS cor0

g is not defined
```


```sql
SELECT - ( + SUM ( ALL + + 69 ) ) AS col1, + 27 * ( - - ( + - ( CAST ( NULL AS REAL ) ) ) ) * + 57 - - ( ( - MAX ( ALL 72 ) ) ) - 98 col1 FROM tab2

Expected: ["-207","NULL"] but got ["NULL"]
```


```sql
SELECT MIN ( ALL - 53 ) AS col2 FROM tab2 WHERE NOT - ( - - col0 ) IN ( 1 * - col2 / + ( - col0 ) )

Expected: ["-53"] but got ["NULL"]
```


```sql
SELECT DISTINCT ( - + col2 ) * - CAST ( NULL AS INTEGER ) + + CAST ( - - col2 AS INTEGER ) AS col1, CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL"] but got ["10","0","47","0","99","0"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ), 74 - + - col2 + CAST ( NULL AS INTEGER ) * - col0 / - 46 AS col2 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","114","0","132","0","97"]
```

#### ☓ Ran 10012 tests as sqlite

* 1467 failed
* 85% was OK

Time: 24432ms

---- ---- ---- ---- ---- ---- ----
### 245/622 [`./test/random/aggregates/slt_good_114.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_114.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col1 / col2 - CAST ( 95 AS INTEGER ) FROM tab0

Expected: ["-93","-94","-95"] but got ["-92.900","-93.277","-94.990"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE + ( col0 ) * CAST ( NULL AS INTEGER ) + + col0 * - col1 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + ( CAST ( NULL AS INTEGER ) ) + - + CAST ( NULL AS INTEGER ) + + 34 AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["34","34","34"]
```


```sql
SELECT DISTINCT + - SUM ( DISTINCT - col1 ) FROM tab1 AS cor0 WHERE NOT NULL < col0

Expected: ["NULL"] but got ["66"]
```


```sql
SELECT DISTINCT - CAST ( - + COUNT ( * ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT col0 AS col0, - ( col1 ) + - col1 + + - 53 + + col0 - + col1 * + 70 - + 97, - col1 AS col0 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - MIN ( ALL - - ( col1 ) ) AS col1, 8 FROM tab2 AS cor0 WHERE - col0 BETWEEN ( + col0 ) AND col1

Expected: ["NULL","8"] but got ["8","NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT 86 IS NULL

18 results returned but expected 54
```


```sql
SELECT + MIN ( + - col2 ) * + 16 + + 45 AS col0 FROM tab0 WHERE + col0 + - col1 + - col0 + - col0 * - CAST ( - + 46 AS INTEGER ) * + + CAST ( NULL AS INTEGER ) IS NULL

Expected: ["-1539"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col0, col1 * CAST ( NULL AS REAL ) AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1469 failed
* 85% was OK

Time: 19745ms

---- ---- ---- ---- ---- ---- ----
### 246/622 [`./test/random/aggregates/slt_good_115.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_115.test)

_Mimic sqlite_

```sql
SELECT - MAX ( ALL col2 ) + + 33 * MAX ( - + ( - CAST ( NULL AS INTEGER ) ) ) FROM tab0

Expected: ["NULL"] but got ["-99"]
```


```sql
SELECT + ( ( + + 81 ) ) * - col2 * + CAST ( NULL AS INTEGER ) - col0 * col0 * 8 AS col1 FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["-16928","-32768","-45000"]
```


```sql
SELECT DISTINCT CAST ( MIN ( DISTINCT + col0 ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT col2 AS col0, col0 AS col0 FROM tab0

Expected: ["10","87","47","15","99","97"] but got ["15","15","87","87","97","97"]
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT + col1 BETWEEN col2 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + - ( - CAST ( NULL AS INTEGER ) ) FROM tab2 cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + - col0 * + CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) / - col2 AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT - 98 BETWEEN + 3 - 22 AND col1 + - col0

6 results returned but expected 9
```


```sql
SELECT CAST ( NULL AS REAL ) AS col1, col0 / + 76 FROM tab2

Expected: ["NULL","0","NULL","0","NULL","0"] but got ["NULL","0.605","NULL","0.842","NULL","0.987"]
```


```sql
SELECT + + MIN ( - col1 ) FROM tab0 WHERE NOT 52 BETWEEN col2 AND + + 60

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT ALL * FROM tab0 AS cor0 JOIN tab1 AS cor1 ON NULL NOT BETWEEN 35 AND NULL, tab2 AS cor2

Parse error on line 1:
... BETWEEN 35 AND NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1429 failed
* 85% was OK

Time: 18825ms

---- ---- ---- ---- ---- ---- ----
### 247/622 [`./test/random/aggregates/slt_good_116.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_116.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0 AS cor0 WHERE NOT + col1 * + 34 IN ( + 64 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + COUNT ( * ) AS col0 FROM tab0 AS cor0 WHERE col2 + col2 * col0 <> NULL

Expected: ["0"] but got ["3"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) + + + 59 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["59","59","59"]
```


```sql
SELECT + SUM ( DISTINCT - col1 ) AS col0 FROM tab2 cor0 WHERE + 57 IN ( - - col0 * 24 )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - + CAST ( MAX ( DISTINCT + + ( col0 ) ) AS INTEGER ) AS col0 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT 37 * 50 AS col2, + col0 * + - 87 AS col0, + col1 AS col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + 96 + - 62 + 15 AS col0, 45 AS col0 FROM tab2

Expected: ["49","45","49","45","49","45"] but got ["45","45","45","45","45","45"]
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab1 AS cor1 WHERE - 7 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT MAX ( ALL - - col1 ), SUM ( col2 ) * 5 AS col0 FROM tab2 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL ( + col2 ) / + - col2 + - - col1 AS col0, CAST ( NULL AS REAL ) FROM tab1 cor0

Expected: ["13","NULL","4","NULL","46","NULL"] but got ["13","NULL","46","NULL","4","NULL"]
```


```sql
SELECT + 65 * - col1 AS col2, + col1 / 11 + - col2 / - col0 * CAST ( NULL AS INTEGER ) AS col2 FROM tab1

Expected: ["-3055","NULL","-325","NULL","-910","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT - MIN ( - col1 ) + CAST ( NULL AS REAL ) AS col1, 20 FROM tab1 cor0

Expected: ["NULL","20"] but got ["20","NULL"]
```


```sql
SELECT MIN ( - - ( + + 10 ) ), MAX ( + - 39 ) AS col2 FROM tab0 WHERE NOT NULL <= + 43 / col2

Expected: ["NULL","NULL"] but got ["10","-39"]
```


```sql
SELECT DISTINCT + 51 AS col2, + col0 * + col0 * CAST ( NULL AS REAL ) * + - col1 / - col2 AS col2 FROM tab1

Expected: ["51","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1496 failed
* 85% was OK

Time: 21131ms

---- ---- ---- ---- ---- ---- ----
### 248/622 [`./test/random/aggregates/slt_good_117.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_117.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE NOT 48 * 0 + col0 BETWEEN - 25 AND + 91

Expected: ["97","1","99"] but got ["15","81","47","87","21","10","97","1","99"]
```


```sql
SELECT ALL + CAST ( + CAST ( NULL AS REAL ) AS INTEGER ) FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + CAST ( COUNT ( * ) AS INTEGER ) AS col0 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) / - + col0 + 75 AS col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["75"]
```


```sql
SELECT DISTINCT - col2 + + col0 FROM tab1 WHERE NOT - col0 BETWEEN ( 94 + + 87 ) AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT ( + 26 ) IS NULL

18 results returned but expected 54
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * - col1 / col0, - col0 + + - 30 AS col2, col2 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT MAX ( - col0 ) + + COUNT ( ALL + col1 ) FROM tab0 WHERE NOT - CAST ( NULL AS INTEGER ) IS NOT NULL

Expected: ["-12"] but got ["NULL"]
```


```sql
SELECT DISTINCT ( CAST ( NULL AS INTEGER ) ) / SUM ( DISTINCT - - col1 ) + - 15 AS col1, CAST ( NULL AS REAL ) + + COUNT ( * ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT - col2 * - 59 + 34 + CAST ( NULL AS INTEGER ) + - col2 + - col2 * + col1 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["3161","4258","782"]
```


```sql
SELECT ALL col0 AS col1, col1 / CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT 13 + col2 AS col0, CAST ( NULL AS REAL ) * - col1 * - + col1 col0 FROM tab0

Expected: ["112","NULL","23","NULL","60","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS REAL ) col2, CAST ( NULL AS INTEGER ) * 43 / + - col0 AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT ALL COUNT ( * ) AS col0, 60, MIN ( CAST ( NULL AS REAL ) ) * 10 AS col0 FROM tab0

Expected: ["3","60","NULL"] but got ["60","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1469 failed
* 85% was OK

Time: 20685ms

---- ---- ---- ---- ---- ---- ----
### 249/622 [`./test/random/aggregates/slt_good_118.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_118.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col2 / + + 65 AS col0 FROM tab0

Expected: ["0","1"] but got ["0.154","0.723","1.523"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + ( + 90 ) col0 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["90","90","90"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE NOT + col2 - - col1 BETWEEN - - col0 * + 49 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) / + COUNT ( * ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL 37 + - CAST ( ( + COUNT ( * ) ) AS INTEGER ) FROM tab1 cor0

g is not defined
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col2 FROM tab0 cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + col1 AS col1 FROM tab1 AS cor0 WHERE NOT ( + col0 ) > col1 * + col1

Expected: ["NULL","NULL"] but got ["14","47"]
```


```sql
SELECT DISTINCT COUNT ( * ) / + CAST ( MIN ( 34 ) AS INTEGER ) AS col1 FROM tab0

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM ( tab2 cor0 CROSS JOIN tab2 AS cor1 )

18 results returned but expected 54
```


```sql
SELECT col2 + - CAST ( NULL AS INTEGER ) AS col2, - col2 * + + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["10","0","47","0","99","0"]
```


```sql
SELECT - col0 / + CAST ( NULL AS INTEGER ) * - 2 AS col1, CAST ( - col2 AS INTEGER ) / 20 FROM tab2

Expected: ["NULL","-1","NULL","-2","NULL","-2"] but got ["NULL","-1.150","NULL","-2","NULL","-2.900"]
```


```sql
SELECT ALL - COUNT ( * ) / - CAST ( NULL AS INTEGER ) * 18 AS col0, 20 FROM tab1 AS cor0

Expected: ["NULL","20"] but got ["20","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1396 failed
* 86% was OK

Time: 25758ms

---- ---- ---- ---- ---- ---- ----
### 250/622 [`./test/random/aggregates/slt_good_119.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_119.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col0 AS col1, col0 * - CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["-51","NULL","-85","NULL","-91","NULL"] but got ["-51","0","-85","0","-91","0"]
```


```sql
SELECT ALL 6 / + 28 * - col0 * + - 42 FROM tab2

Expected: ["0","0","0"] but got ["0.000","0.000","0.000"]
```


```sql
SELECT * FROM tab2, tab2 cor0 WHERE + 10 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 WHERE NOT CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - MIN ( CAST ( NULL AS INTEGER ) ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), CAST ( + COUNT ( * ) AS INTEGER ) AS col2 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT DISTINCT - COUNT ( * ) / + - CAST ( AVG ( + col1 ) AS INTEGER ) * - 93 + - MIN ( - col1 ) AS col1 FROM tab1

Expected: ["47"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS REAL ), CAST ( NULL AS INTEGER ) * - col2 FROM tab0 WHERE NOT NULL IS NOT NULL

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 JOIN tab2 AS cor1 ON NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT - CAST ( NULL AS INTEGER ), + col0 - - col2 + + CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","144","0","147","0","159"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 INNER JOIN tab2 cor1 ON NOT NULL IS NULL, tab2 AS cor2

Parse error on line 1:
... ON NOT NULL IS NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL + 92 / col2 * - col1 AS col0, CAST ( NULL AS REAL ) AS col0 FROM tab0

Expected: ["-189","NULL","-81","NULL","0","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1472 failed
* 85% was OK

Time: 19256ms

---- ---- ---- ---- ---- ---- ----
### 251/622 [`./test/random/aggregates/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - col0 + + 64 AS col1, + 73 AS col1 FROM tab2 AS cor0 WHERE col2 IS NOT NULL

Expected: ["-11","73","0","73","18","73"] but got ["73","73"]
```


```sql
SELECT DISTINCT + col1 + + CAST ( NULL AS INTEGER ) - + col2 FROM tab0

Expected: ["NULL"] but got ["-98","11","34"]
```


```sql
SELECT col0, col1 + + CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["51","NULL","85","NULL","91","NULL"] but got ["51","14","85","5","91","47"]
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT 70 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + 15 - CAST ( + COUNT ( * ) AS INTEGER ) AS col1 FROM tab2

g is not defined
```


```sql
SELECT DISTINCT + - col0 FROM tab1 AS cor0 WHERE ( NOT ( NOT - col0 * - 45 NOT BETWEEN NULL AND - 92 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 JOIN tab1 AS cor1 ON NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL MIN ( - 98 ) AS col2 FROM tab1 WHERE NOT - 12 IN ( - col0 * 89 - - ( 78 ) * col1 )

Expected: ["-98"] but got ["NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS REAL ), COUNT ( * ) / + 50 AS col2 FROM tab2 AS cor0

Expected: ["NULL","0"] but got ["NULL","0.060"]
```


```sql
SELECT + MAX ( DISTINCT - col1 ), ( + - MAX ( - - 97 ) ) col0 FROM tab0 WHERE NOT - 44 + - 76 > NULL

Expected: ["NULL","NULL"] but got ["-1","-97"]
```


```sql
SELECT ALL - col1 - CAST ( NULL AS REAL ) AS col2 FROM tab0 WHERE ( + col1 ) NOT BETWEEN NULL AND + col2

Expected: ["NULL","NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT ALL + col2 * + + CAST ( NULL AS INTEGER ), col0 * + CAST ( NULL AS REAL ) AS col1 FROM tab2 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT + + CAST ( NULL AS INTEGER ), col2 * - + 89 * + col1 * + - col0 * + CAST ( NULL AS INTEGER ) * - 89 AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1523 failed
* 84% was OK

Time: 18945ms

---- ---- ---- ---- ---- ---- ----
### 252/622 [`./test/random/aggregates/slt_good_120.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_120.test)

_Mimic sqlite_

```sql
SELECT - 78 + + col0 * + CAST ( NULL AS INTEGER ), col2 FROM tab0

Expected: ["NULL","10","NULL","47","NULL","99"] but got ["-78","10","-78","47","-78","99"]
```


```sql
SELECT - 15 + COUNT ( * ) / 76 FROM tab0

Expected: ["-15"] but got ["-14.961"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1 WHERE ( + 27 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col1 * - 5 BETWEEN + 62 * col1 AND + col1

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) / + MAX ( DISTINCT - - col1 ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab0 cor1 WHERE NOT + 72 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( - COUNT ( * ) AS INTEGER ) AS col0 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT - COUNT ( * ) - - SUM ( - ( - 24 ) ) / - + CAST ( - + MIN ( + - col1 ) AS INTEGER ) FROM tab0

Expected: ["-3"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + - MAX ( + + col2 ), - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["-58","0"]
```


```sql
SELECT - + SUM ( col2 ) AS col0, MIN ( DISTINCT - ( - 37 ) ) FROM tab2 AS cor0 WHERE NOT col0 * + col2 IS NOT NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 JOIN tab0 AS cor1 ON NOT NULL IS NULL, tab0 AS cor2

Parse error on line 1:
... ON NOT NULL IS NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT 23 * + 15 * + - 99 AS col1, + MIN ( ALL col2 ) AS col1 FROM tab2 WHERE NOT ( - col0 ) <> + CAST ( - - col1 AS INTEGER ) * col1 * 50

Expected: ["-34155","NULL"] but got ["NULL"]
```


```sql
SELECT col1 + CAST ( NULL AS INTEGER ) + - col1 * + - col0 AS col0, + CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1469 failed
* 85% was OK

Time: 19270ms

---- ---- ---- ---- ---- ---- ----
### 253/622 [`./test/random/aggregates/slt_good_121.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_121.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + ( + 25 ) / + - COUNT ( * ) FROM tab0 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["-8"] but got ["-8.333"]
```


```sql
SELECT ( CAST ( NULL AS INTEGER ) ) / - col2 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL COUNT ( * ) * - ( - COUNT ( * ) ) * CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - COUNT ( * ) * + CAST ( - CAST ( NULL AS INTEGER ) AS INTEGER ) AS col1, + COUNT ( * ) * + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT col0 * - + CAST ( NULL AS INTEGER ) + - 27 + - col1 * - 50 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + ( - - col2 ) / + + 51 AS col0, 80 * - + 98, col2 FROM tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + CAST ( + - AVG ( DISTINCT - col2 ) AS INTEGER ) AS col0 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT + MAX ( + 15 ) AS col1 FROM tab2 cor0 WHERE NOT CAST ( NULL AS INTEGER ) + + col1 - + CAST ( - col1 AS INTEGER ) IS NOT NULL

Expected: ["15"] but got ["NULL"]
```


```sql
SELECT DISTINCT - AVG ( ALL + - 74 ) AS col2, 86 FROM tab0 WHERE 58 IS NULL

Expected: ["NULL","86"] but got ["86","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE ( 37 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL col2 col0, + CAST ( NULL AS REAL ) col0 FROM tab1

Expected: ["59","NULL","68","NULL","96","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1465 failed
* 85% was OK

Time: 27578ms

---- ---- ---- ---- ---- ---- ----
### 254/622 [`./test/random/aggregates/slt_good_122.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_122.test)

_Mimic sqlite_

```sql
SELECT ALL - SUM ( - col0 ) col0 FROM tab0 AS cor0 WHERE CAST ( NULL AS INTEGER ) <> CAST ( NULL AS INTEGER ) * CAST ( - 66 AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col2 FROM tab0 WHERE col1 / + col0 + col2 NOT IN ( + 3 )

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT * FROM tab1 AS cor0 WHERE - 35 + col2 / CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) - - + 51 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT 1 / + COUNT ( + + 84 ) FROM tab1

Expected: ["0"] but got ["0.333"]
```


```sql
SELECT ALL CAST ( - COUNT ( DISTINCT 80 ) AS INTEGER ) AS col1 FROM tab0 WHERE NOT + col0 / + col2 IS NULL

g is not defined
```


```sql
SELECT + CAST ( NULL AS REAL ), + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT + + SUM ( - + col2 ), SUM ( - col0 ) FROM tab2 WHERE + 74 + - col0 + 96 * - ( + col2 ) > - + col1 + - CAST ( NULL AS INTEGER ) + + - 80

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1 WHERE + ( + 94 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL CAST ( NULL AS REAL ), 72 / - ( + col2 ) col1 FROM tab0

Expected: ["NULL","-1","NULL","-7","NULL","0"] but got ["NULL","-0.727","NULL","-1.532","NULL","-7.200"]
```


```sql
SELECT + CAST ( NULL AS REAL ) * + - CAST ( NULL AS REAL ) / + ( - - COUNT ( * ) ) AS col1, 32 / - + COUNT ( * ) FROM tab0, tab2 AS cor0

Expected: ["NULL","-3"] but got ["NULL","-3.556"]
```


```sql
SELECT ( + 30 ) / CAST ( - SUM ( DISTINCT + col1 ) AS INTEGER ) * - 34 + ( - MAX ( col1 ) ) * + 31 AS col2 FROM tab1

Expected: ["-1457"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1485 failed
* 85% was OK

Time: 28229ms

---- ---- ---- ---- ---- ---- ----
### 255/622 [`./test/random/aggregates/slt_good_123.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_123.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab2 WHERE NOT - 71 IN ( + - 45 - - + col0, - 74, + col1, 80 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - COUNT ( * ) / 69 AS col2 FROM tab2 AS cor0 WHERE NOT NULL = 25

Expected: ["0"] but got ["-0.043"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - col1 + + col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["1","21","81"]
```


```sql
SELECT DISTINCT - + ( + AVG ( - 17 ) ) AS col2 FROM tab2 AS cor0 WHERE col2 NOT BETWEEN NULL AND NULL

Expected: ["NULL"] but got ["17"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT - 1 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL COUNT ( * ) / CAST ( COUNT ( * ) AS INTEGER ) FROM tab0

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT + + CAST ( - COUNT ( * ) AS INTEGER ) AS col1 FROM tab0 cor0

g is not defined
```


```sql
SELECT + - COUNT ( * ) AS col1, + CAST ( NULL AS REAL ) col1 FROM tab0 AS cor0

Expected: ["-3","NULL"] but got ["NULL"]
```


```sql
SELECT MAX ( + col1 ) AS col2, - SUM ( ALL - - col0 ) * + + 62 + - 56 * COUNT ( DISTINCT - + col1 ) - 55 FROM tab1 AS cor0 WHERE + col2 IS NULL

Expected: ["NULL","NULL"] but got ["NULL","-55"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT + 90 IS NULL

18 results returned but expected 54
```

#### ☓ Ran 10012 tests as sqlite

* 1510 failed
* 84% was OK

Time: 23996ms

---- ---- ---- ---- ---- ---- ----
### 256/622 [`./test/random/aggregates/slt_good_124.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_124.test)

_Mimic sqlite_

```sql
SELECT ALL - AVG ( DISTINCT + + 78 ) AS col0 FROM tab2 AS cor0 WHERE NOT + CAST ( NULL AS REAL ) * + + 20 / col1 + - 83 IS NULL

Expected: ["NULL"] but got ["-78"]
```


```sql
SELECT + 70 / - col2 AS col1 FROM tab2

Expected: ["-1","-1","-3"] but got ["-1.207","-1.750","-3.043"]
```


```sql
SELECT ALL + col2 * - - CAST ( NULL AS INTEGER ) * + col1 * + 18 + col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["46","64","75"]
```


```sql
SELECT CAST ( MAX ( - 35 ) AS INTEGER ) FROM tab2

g is not defined
```


```sql
SELECT + 71 / - col0 col0 FROM tab1 cor0 WHERE NOT - col0 + - 97 BETWEEN ( col2 ) AND - col2 * 62

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - 70 col1, - col2 * + col0 AS col1, 78 AS col2 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT col0, 19 * - col1 + + 85 col0, + 51 AS col0 FROM tab0

3 results returned but expected 9
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + + 81 * + ( - col2 ) * + col1 AS col0, - CAST ( NULL AS INTEGER ) + - + col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-249480","-77","-314766","-67","-95013","-51"]
```


```sql
SELECT ALL SUM ( CAST ( NULL AS INTEGER ) ) AS col2, - MAX ( ALL CAST ( NULL AS INTEGER ) ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) / - col2 AS col2, + 87 * + + col0 - - 35 * + col0 + - col2 / + ( + 9 ) + - col2 FROM tab0

Expected: ["NULL","10603","NULL","11724","NULL","1778"] but got ["NULL","10602.889","NULL","11724","NULL","1777.778"]
```


```sql
SELECT ALL - MIN ( - col1 ) AS col2 FROM tab1 AS cor0 WHERE NOT - 5 + + - 41 BETWEEN col1 AND NULL

Expected: ["47"] but got ["NULL"]
```


```sql
SELECT DISTINCT - COUNT ( * ) AS col1, COUNT ( * ) / CAST ( NULL AS REAL ) AS col1 FROM tab1 AS cor0

Expected: ["-3","NULL"] but got ["NULL"]
```


```sql
SELECT 32 AS col2, - CAST ( NULL AS REAL ) AS col2 FROM tab2

Expected: ["32","NULL","32","NULL","32","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1474 failed
* 85% was OK

Time: 19364ms

---- ---- ---- ---- ---- ---- ----
### 257/622 [`./test/random/aggregates/slt_good_125.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_125.test)

_Mimic sqlite_

```sql
SELECT - ( col1 ) - + ( 76 + + col2 ) / 40 FROM tab1

Expected: ["-18","-50","-8"] but got ["-18.300","-50.600","-8.375"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 WHERE NOT ( + 22 + 48 / col1 ) IN ( 3 * col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - col2 * + CAST ( NULL AS INTEGER ) * 44 + col2 * + 18 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["1782","180","846"]
```


```sql
SELECT COUNT ( * ) * - ( MAX ( ALL - CAST ( NULL AS INTEGER ) ) ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 cor1 WHERE ( + 72 * 65 IS NOT NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT CAST ( + ( + SUM ( ALL col1 ) ) AS INTEGER ) AS col2 FROM tab1 WHERE NULL IS NULL

g is not defined
```


```sql
SELECT DISTINCT * FROM tab2, tab1 cor0 WHERE ( + ( 86 ) ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) + - + 26, + col0 + + + col1 / + + 21 AS col0 FROM tab2

Expected: ["NULL","48","NULL","67","NULL","78"] but got ["NULL","48.429","NULL","67.667","NULL","78.190"]
```


```sql
SELECT col0 AS col2, col1 / - CAST ( NULL AS INTEGER ) AS col2 FROM tab1

Expected: ["51","NULL","85","NULL","91","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1516 failed
* 84% was OK

Time: 19633ms

---- ---- ---- ---- ---- ---- ----
### 258/622 [`./test/random/aggregates/slt_good_126.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_126.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - COUNT ( * ) / SUM ( + col2 ) FROM tab0

Expected: ["0"] but got ["-0.019"]
```


```sql
SELECT - 36 - + CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-36","-36","-36"]
```


```sql
SELECT DISTINCT - ( - CAST ( + - COUNT ( DISTINCT - 66 ) AS INTEGER ) ) AS col2 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT - - col0 FROM tab0 WHERE NOT col1 + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * COUNT ( * ) + + + COUNT ( * ) col1, - MAX ( 64 ) * + 56 FROM tab0

Expected: ["NULL","-3584"] but got ["3","-3584"]
```


```sql
SELECT * FROM tab0, tab1 AS cor0 WHERE NOT - - 23 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + MIN ( - 84 ) FROM tab2 AS cor0 WHERE NOT + 79 + + ( - col1 ) IN ( + col0, + col0 * + - col2 )

Expected: ["-84"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE - 10 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL - col2 AS col0, CAST ( NULL AS REAL ) + + col1 AS col0 FROM tab1 AS cor0

Expected: ["-59","NULL","-68","NULL","-96","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL ( - CAST ( NULL AS INTEGER ) ), - CAST ( NULL AS INTEGER ) / col1 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT + 70 * CAST ( NULL AS REAL ) * + AVG ( + - col1 ) AS col1, COUNT ( * ) FROM tab2 AS cor0 WHERE NOT NULL >= NULL

Expected: ["NULL","0"] but got ["NULL","3"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 LEFT OUTER JOIN tab0 AS cor1 ON NOT 1 IS NOT NULL, tab1 AS cor2

Parse error on line 1:
...ON NOT 1 IS NOT NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + SUM ( + 26 ) * - + ( + 36 ) AS col1, - MIN ( - 68 ) FROM tab1 WHERE + - col2 IS NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1482 failed
* 85% was OK

Time: 19995ms

---- ---- ---- ---- ---- ---- ----
### 259/622 [`./test/random/aggregates/slt_good_127.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_127.test)

_Mimic sqlite_

```sql
SELECT col2, 14 AS col2 FROM tab1

Expected: ["59","14","68","14","96","14"] but got ["14","14","14","14","14","14"]
```


```sql
SELECT ALL AVG ( ALL - CAST ( NULL AS INTEGER ) ) AS col2 FROM tab1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) / - 46 AS col2 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT col1 AS col2, - col0 / - col1 + - col0 AS col2, - - 39 * 84 + col1 + + col1 * + 30 AS col0 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + + ( - 93 ) AS col1 FROM tab2 AS cor0 WHERE NOT col2 IN ( - col1, + 18 * - col1 * 87 )

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( - + COUNT ( * ) AS INTEGER ) * + 99 AS col1 FROM tab1

g is not defined
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - + ( COUNT ( * ) ) + + - COUNT ( * ) / CAST ( + + AVG ( DISTINCT - col0 ) AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["-3"] but got ["NULL"]
```


```sql
SELECT ALL + col2 / + col1 AS col2, - ( - col0 ) / - col1 + CAST ( NULL AS REAL ) * - + col2 / + + 78 * - 73 - - col0 * - 69 AS col1 FROM tab0

Expected: ["0","NULL","0","NULL","99","NULL"] but got ["0.476","NULL","0.580","NULL","99","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1487 failed
* 85% was OK

Time: 20425ms

---- ---- ---- ---- ---- ---- ----
### 260/622 [`./test/random/aggregates/slt_good_128.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_128.test)

_Mimic sqlite_

```sql
SELECT ALL - SUM ( DISTINCT - - ( + 95 ) ) * 73 / + - SUM ( DISTINCT + 58 ) AS col0 FROM tab0

Expected: ["119"] but got ["119.569"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) / 96 col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) / - - 48 * 9 * col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - col1 FROM tab0 AS cor0 WHERE NOT col2 IN ( - - ( + col0 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col0, - CAST ( NULL AS REAL ) + col2 AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT CAST ( - - COUNT ( * ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT DISTINCT - - col1 / 8 + + 45, col0 AS col0, - col1 * - col2 AS col0 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT 33 IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) col1, CAST ( NULL AS INTEGER ) * + COUNT ( * ) + + - 63 AS col1 FROM tab1 cor0

Expected: ["NULL","NULL"] but got ["-63"]
```


```sql
SELECT ALL + MAX ( col0 ) FROM tab2 WHERE NOT + 77 BETWEEN - 67 AND CAST ( - col2 AS REAL )

Expected: ["75"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col0, + col2 * + col1 + + CAST ( NULL AS INTEGER ) * - + col0 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","210","0","3807","0","99"]
```

#### ☓ Ran 10012 tests as sqlite

* 1515 failed
* 84% was OK

Time: 19738ms

---- ---- ---- ---- ---- ---- ----
### 261/622 [`./test/random/aggregates/slt_good_129.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_129.test)

_Mimic sqlite_

```sql
SELECT ALL + - SUM ( 47 ) AS col1, + 39 * - COUNT ( * ) AS col1 FROM tab1 WHERE NULL IS NOT NULL

Expected: ["NULL","0"] but got ["0"]
```


```sql
SELECT - + 26 * - col1 * - 52 AS col0 FROM tab1 AS cor0 WHERE NOT CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT 50 / - col1 FROM tab1

Expected: ["-1","-10","-3"] but got ["-1.064","-10","-3.571"]
```


```sql
SELECT - - 96, + CAST ( NULL AS INTEGER ) * - CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["96","NULL","96","NULL","96","NULL"] but got ["96","0","96","0","96","0"]
```


```sql
SELECT ALL + - CAST ( + + MAX ( ALL - + 61 ) AS INTEGER ) FROM tab0 AS cor0

g is not defined
```


```sql
SELECT - col2, + 38 AS col1, col1 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - MIN ( col2 ) FROM tab1 WHERE NOT col2 IN ( + col1 )

Expected: ["-59"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM ( tab1 cor0 CROSS JOIN tab1 )

18 results returned but expected 54
```

#### ☓ Ran 802 tests as sqlite

* 114 failed
* 85% was OK

Time: 1710ms

---- ---- ---- ---- ---- ---- ----
### 262/622 [`./test/random/aggregates/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT ( + CAST ( + SUM ( + col2 ) AS INTEGER ) ) AS col2 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT col1 - - - col0 + + col1 * - 69 col1, + col1 AS col1, + - 34 AS col1 FROM tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - 31 * - CAST ( - - ( - col1 ) AS INTEGER ) - - - col0 + col1 + + + CAST ( NULL AS INTEGER ) - + + col1 + - col2 AS col2 FROM tab2 cor0

Expected: ["NULL"] but got ["-1650","-2210","-2491"]
```


```sql
SELECT DISTINCT - - ( + MIN ( DISTINCT - col0 ) ) / - ( + 4 ) AS col1, COUNT ( * ) AS col0 FROM tab0 AS cor0

Expected: ["24","3"] but got ["24.250","3"]
```


```sql
SELECT ALL * FROM tab0 AS cor0 WHERE NOT col1 IN ( + 87 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT col0 * 27, ( + - CAST ( NULL AS INTEGER ) ) + col2 + + 64 AS col0 FROM tab2 AS cor0

Expected: ["1242","NULL","1728","NULL","2025","NULL"] but got ["1242","87","1728","104","2025","122"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT CAST ( 30 AS INTEGER ) <= - 79

18 results returned but expected 54
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 INNER JOIN tab0 AS cor1 ON + + 44 IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...N + + 44 IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT - COUNT ( * ) / - 45, + COUNT ( * ) / - 37 * CAST ( NULL AS REAL ) - + + ( + MAX ( ALL - 91 ) ) col1 FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1

Expected: ["0","NULL"] but got ["0.200","NULL"]
```


```sql
SELECT - 95 / + CAST ( NULL AS INTEGER ) + + 82, - col0 + - + col1 * CAST ( NULL AS INTEGER ) + - col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","-144","NULL","-147","NULL","-159"]
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) * + col2 * - - col2 AS col1, + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) / + + col0 + + col1 * col2 col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","1344","0","295","0","3196"]
```


```sql
SELECT - COUNT ( + 59 ) / + CAST ( - COUNT ( DISTINCT col2 ) AS INTEGER ) FROM tab0 AS cor0

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT ALL + col0 AS col1, 27 - 63 / CAST ( NULL AS INTEGER ) AS col1 FROM tab2

Expected: ["46","NULL","64","NULL","75","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1412 failed
* 85% was OK

Time: 19995ms

---- ---- ---- ---- ---- ---- ----
### 263/622 [`./test/random/aggregates/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_14.test)

_Mimic sqlite_

```sql
SELECT + CAST ( + COUNT ( * ) AS INTEGER ) * + ( + 5 ) FROM tab2 AS cor0 CROSS JOIN tab2 cor1

g is not defined
```


```sql
SELECT ALL + 56 - - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["56","56","56"]
```


```sql
SELECT 11 / - 57 FROM tab0

Expected: ["0","0","0"] but got ["-0.193","-0.193","-0.193"]
```


```sql
SELECT ALL SUM ( ALL - 19 ) AS col1 FROM tab1 cor0 WHERE NOT + 82 IN ( + 57 + + col2, + col2 * + CAST ( NULL AS REAL ) + + col0 + - - col2 )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab2 WHERE NOT ( col0 ) IN ( - col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab0 cor0 JOIN tab0 AS cor1 ON NOT + 44 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 INNER JOIN tab2 AS cor1 ON NULL BETWEEN - ( + + 34 ) AND - 8, tab2 AS cor2

Parse error on line 1:
...- ( + + 34 ) AND - 8, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT COUNT ( * ) AS col1, COUNT ( * ) / - - CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["3","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT MIN ( col2 ) FROM tab2 WHERE NOT col0 IN ( 71 )

Expected: ["23"] but got ["NULL"]
```


```sql
SELECT DISTINCT + AVG ( + col1 ) * + COUNT ( * ) AS col1, CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1516 failed
* 84% was OK

Time: 20052ms

---- ---- ---- ---- ---- ---- ----
### 264/622 [`./test/random/aggregates/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_15.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - COUNT ( * ) + - 77 / 37 FROM tab0

Expected: ["-5"] but got ["-5.081"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + + ( + - 29 ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-29","-29","-29"]
```


```sql
SELECT DISTINCT col1 - + - col0 + - CAST ( NULL AS INTEGER ) * col0 AS col1 FROM tab1 cor0

Expected: ["NULL"] but got ["138","65","90"]
```


```sql
SELECT + col0 / col1 * col0 + + 52 FROM tab1 AS cor0 WHERE NOT col1 BETWEEN NULL AND + - 62

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( - + COUNT ( - - 0 ) AS INTEGER ) AS col2 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT ALL + 84 / 17 AS col1 FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ), ( CAST ( NULL AS INTEGER ) ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + 46 + + 38 / + CAST ( + COUNT ( * ) AS INTEGER ) - - COUNT ( - col0 ) AS col1 FROM tab0

Expected: ["61"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE 13 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + + col2 AS col2, 95 / - CAST ( NULL AS INTEGER ) * - col2 col2 FROM tab2 AS cor0

Expected: ["23","NULL","40","NULL","58","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - COUNT ( * ) AS col1, ( - MIN ( - + 95 ) ) AS col1 FROM tab2 AS cor0 WHERE NULL <= ( 40 )

Expected: ["0","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + COUNT ( * ) FROM tab1 AS cor0 WHERE NOT NULL > - col0

Expected: ["0"] but got ["3"]
```


```sql
SELECT + col0 + + col1 + CAST ( NULL AS REAL ), - col1 / + 52 col0 FROM tab2 AS cor0

Expected: ["NULL","-1","NULL","-1","NULL","0"] but got ["NULL","-0.981","NULL","-1.288","NULL","-1.481"]
```

#### ☓ Ran 10012 tests as sqlite

* 1509 failed
* 84% was OK

Time: 21361ms

---- ---- ---- ---- ---- ---- ----
### 265/622 [`./test/random/aggregates/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_16.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0 WHERE NOT - - col0 BETWEEN + col1 / col2 AND + + 84

Query was expected to return results (but did not) 
```


```sql
SELECT - col2 + + col0 / + col2 FROM tab0

Expected: ["-2","-47","-99"] but got ["-1.300","-46.681","-98.020"]
```


```sql
SELECT ALL + 20 / - col2 - + 54 AS col0, + 31, ( - - col2 ) AS col2 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * + + col1 AS col2 FROM tab0 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT col2 + + ( + CAST ( - 36 AS INTEGER ) ) + CAST ( NULL AS INTEGER ) * + 27 * + ( - col2 ) FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["23","32","60"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1 WHERE - 13 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + - ( + - ( CAST ( + COUNT ( * ) AS INTEGER ) ) ) AS col2 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ), + col1 + CAST ( NULL AS INTEGER ) - 37 + + - 62 + + col0 AS col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-34","0","-9","0","39"]
```


```sql
SELECT DISTINCT 95 + - 46 * - + 36 AS col1, - 69 / - CAST ( NULL AS INTEGER ) * + col1 * + col2 AS col1 FROM tab1

Expected: ["1751","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - col0 / CAST ( NULL AS INTEGER ) AS col1, + col1 / col2 * ( - - col1 ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","102","NULL","67","NULL","77"] but got ["NULL","113.087","NULL","148.225","NULL","77.397"]
```


```sql
SELECT DISTINCT - 52 + + col2 * + CAST ( NULL AS INTEGER ) AS col0, ( CAST ( NULL AS INTEGER ) ) + - col0 * - col2 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["-52","1058","-52","2560","-52","4350"]
```


```sql
SELECT DISTINCT - MAX ( + 71 ) * - + MIN ( DISTINCT col0 ) AS col1, + CAST ( NULL AS INTEGER ) FROM tab0 WHERE 1 * - 83 > + col1

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - COUNT ( * ) / + - COUNT ( * ) FROM tab0 WHERE NOT + - CAST ( NULL AS INTEGER ) / ( - col2 ) + + col2 * + + col0 IS NOT NULL

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT AVG ( + 22 ) AS col0, + 28 / + 78 FROM tab2 WHERE NOT - col1 IS NOT NULL

Expected: ["NULL","0"] but got ["NULL","0.359"]
```


```sql
SELECT DISTINCT col0 col0, 17 / - CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1444 failed
* 85% was OK

Time: 20742ms

---- ---- ---- ---- ---- ---- ----
### 266/622 [`./test/random/aggregates/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_17.test)

_Mimic sqlite_

```sql
SELECT + 16 / col2 AS col2 FROM tab2 AS cor0

Expected: ["0","0","0"] but got ["0.276","0.400","0.696"]
```


```sql
SELECT + MIN ( ALL col2 ) FROM tab1 WHERE NOT + 85 = NULL

Expected: ["NULL"] but got ["59"]
```


```sql
SELECT ALL - ( - col0 ) * + + CAST ( NULL AS INTEGER ) + - 31 AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-31","-31","-31"]
```


```sql
SELECT ALL * FROM tab1 cor0 WHERE NOT - 7 BETWEEN + 97 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL * FROM tab0 cor0 CROSS JOIN tab0 AS cor1 WHERE NOT ( NULL IS NOT NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - CAST ( SUM ( DISTINCT - + col0 ) AS INTEGER ) AS col2, 20 FROM tab1

g is not defined
```


```sql
SELECT + 31 / - + CAST ( + + COUNT ( * ) AS INTEGER ) AS col2, MIN ( 21 ) FROM tab1

Expected: ["-10","21"] but got ["NULL","21"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col2, MAX ( CAST ( NULL AS INTEGER ) ) AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT * FROM ( tab0 cor0 CROSS JOIN tab0 AS cor1 ) WHERE NOT - 54 IS NULL

18 results returned but expected 54
```

#### ☓ Ran 10012 tests as sqlite

* 1450 failed
* 85% was OK

Time: 20420ms

---- ---- ---- ---- ---- ---- ----
### 267/622 [`./test/random/aggregates/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_18.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) + - - COUNT ( * ) FROM tab1

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT ALL + + col1 + col2 + + col2 + col2 / 47 col0 FROM tab0 cor0

Expected: ["176","201","41"] but got ["176","201.106","41.213"]
```


```sql
SELECT ALL col2 * col0 AS col0 FROM tab2 AS cor0 WHERE NOT col1 * - ( - CAST ( - ( - col2 ) AS INTEGER ) ) IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL col0, 82 - - 37 AS col1, col0 * col2 AS col0 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + ( + ( - - CAST ( NULL AS INTEGER ) ) ) AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + ( CAST ( - COUNT ( * ) AS INTEGER ) ) AS col2 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 JOIN tab1 AS cor1 ON NULL IS NULL, tab1 AS cor2

Parse error on line 1:
...cor1 ON NULL IS NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col2 + - col0 + - + 74 * CAST ( NULL AS INTEGER ) * - 41 AS col1, - CAST ( NULL AS INTEGER ) * col2 FROM tab0

Expected: ["NULL","NULL"] but got ["-77","0","2","0","32","0"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) AS col0, - CAST ( NULL AS REAL ) col1 FROM tab1 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT ALL * FROM tab0 WHERE NOT ( NOT - 68 * col0 NOT BETWEEN - 84 AND ( col2 - col0 ) )

6 results returned but expected 9
```


```sql
SELECT ALL + ( - + 10 ) / COUNT ( * ) - + - COUNT ( * ) AS col2, CAST ( NULL AS REAL ) - - - COUNT ( * ) AS col1 FROM tab0

Expected: ["0","NULL"] but got ["-0.333","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col0, - 15 * - CAST ( NULL AS INTEGER ) AS col2 FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT col0 + - + col0 * + 7 - + 53 AS col0, col2 + + - CAST ( NULL AS REAL ) AS col0 FROM tab1

Expected: ["-359","NULL","-563","NULL","-599","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT - ( + + col2 ) AS col2, - col1 + CAST ( NULL AS REAL ) AS col2 FROM tab2

Expected: ["-23","NULL","-40","NULL","-58","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1462 failed
* 85% was OK

Time: 20015ms

---- ---- ---- ---- ---- ---- ----
### 268/622 [`./test/random/aggregates/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_19.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + 63 * 33 + - COUNT ( * ) * + - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["-2079"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) / + col2 + + col1 + + 47 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["114","124","98"]
```


```sql
SELECT col2 AS col1 FROM tab1 WHERE ( - - col0 ) * - col1 + + col1 + + - CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT col1 AS col2, col0 AS col2 FROM tab0 AS cor0

Expected: ["1","97","21","87","81","15"] but got ["15","15","87","87","97","97"]
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab2 cor1 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + + MIN ( DISTINCT - + CAST ( NULL AS REAL ) ) AS col0, 28 FROM tab0 AS cor0

Expected: ["NULL","28"] but got ["28","NULL"]
```


```sql
SELECT DISTINCT + MIN ( - + 19 ) + + 52 AS col2 FROM tab1 AS cor0 WHERE NOT col2 + + + 64 * - col1 BETWEEN col0 AND - col2

Expected: ["33"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 LEFT OUTER JOIN tab1 AS cor1 ON NULL IS NOT NULL

6 results returned but expected 18
```


```sql
SELECT DISTINCT - - CAST ( COUNT ( * ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT + col1 + CAST ( NULL AS REAL ) + - 84 AS col0, CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1507 failed
* 84% was OK

Time: 20272ms

---- ---- ---- ---- ---- ---- ----
### 269/622 [`./test/random/aggregates/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_2.test)

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
SELECT ALL * FROM tab2 cor0 CROSS JOIN tab2 cor1 WHERE ( NULL IS NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0 WHERE NOT + + 45 IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL + 10 AS col0, col0 * + - CAST ( NULL AS REAL ) * - CAST ( - + col0 AS INTEGER ) AS col0 FROM tab2

Expected: ["10","NULL","10","NULL","10","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) * ( - SUM ( col2 ) ) FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + AVG ( ALL - CAST ( NULL AS REAL ) ), 42 / + CAST ( NULL AS INTEGER ) - + SUM ( + - col1 ) FROM tab0

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1400 failed
* 86% was OK

Time: 21831ms

---- ---- ---- ---- ---- ---- ----
### 270/622 [`./test/random/aggregates/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_20.test)

_Mimic sqlite_

```sql
SELECT ALL + col1 * - ( - col1 ) * col0 - - + CAST ( + + col2 AS INTEGER ) + - 37 / + col0 + + - col1 * + 12 AS col0, + ( - + 53 ) + - col0 FROM tab0 AS cor0

Expected: ["184","-150","38125","-140","97488","-68"] but got ["183.619","-150","38124.575","-140","97487.533","-68"]
```


```sql
SELECT DISTINCT - col2 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab0 cor0

Expected: ["NULL"] but got ["-10","-47","-99"]
```


```sql
SELECT CAST ( - AVG ( ALL + CAST ( + ( col2 ) AS INTEGER ) ) AS INTEGER ) FROM tab2

g is not defined
```


```sql
SELECT ALL - CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - col1 / + + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * 80 + 9 / + - 32 FROM tab2 cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab0 cor0 WHERE ( NOT + 77 * 73 IN ( col0 * + col1 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT 89 IS NULL

18 results returned but expected 54
```


```sql
SELECT - 5 - - CAST ( NULL AS INTEGER ), + MIN ( ALL col1 ) * + COUNT ( * ) AS col2 FROM tab0 WHERE NOT NULL NOT IN ( - + col1 )

Expected: ["NULL","NULL"] but got ["-5","3"]
```


```sql
SELECT - AVG ( - ( 62 ) ) * + 46 AS col1, 60 * SUM ( - - col0 ) AS col0 FROM tab2 cor0 WHERE + 55 IS NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT MAX ( DISTINCT - col1 ) / - CAST ( COUNT ( * ) AS INTEGER ) AS col0 FROM tab1

Expected: ["1"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1468 failed
* 85% was OK

Time: 21601ms

---- ---- ---- ---- ---- ---- ----
### 271/622 [`./test/random/aggregates/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_21.test)

_Mimic sqlite_

```sql
SELECT - 31 / - 67 * - + col1 + - - 67 FROM tab2 AS cor0

Expected: ["67","67","67"] but got ["66.991","66.993","66.994"]
```


```sql
SELECT ALL * FROM tab1 WHERE NOT col1 BETWEEN + ( col0 ) AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) FROM tab1 WHERE NOT 46 - - 29 IS NULL

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT col2 * - CAST ( NULL AS INTEGER ) FROM tab0 WHERE NOT NULL IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - col1 AS col0, col0 AS col0, - 44 col1 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + CAST ( AVG ( DISTINCT + col1 ) AS INTEGER ) AS col2 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT 0 IS NULL

18 results returned but expected 54
```


```sql
SELECT 51 + - col2 * + + col0 AS col2, col1 * + col1 col2 FROM tab1

Expected: ["-4845","196","-4964","25","-6137","2209"] but got ["196","196","2209","2209","25","25"]
```


```sql
SELECT 2 * 20 + + - CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["40","0","40","0","40","0"]
```


```sql
SELECT DISTINCT - 52 col2, - CAST ( NULL AS REAL ) * - + col0 AS col2 FROM tab0

Expected: ["-52","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + COUNT ( * ) / CAST ( CAST ( + - SUM ( DISTINCT - ( - ( - col1 ) ) ) AS INTEGER ) AS INTEGER ) FROM tab0 AS cor0

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * - col0 AS col0 FROM tab0 WHERE col1 >= ( + col2 )

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1476 failed
* 85% was OK

Time: 20100ms

---- ---- ---- ---- ---- ---- ----
### 272/622 [`./test/random/aggregates/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_22.test)

_Mimic sqlite_

```sql
SELECT ALL - - 18 / CAST ( + - 87 AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT 50 AS col2 FROM tab0 WHERE NOT ( + col0 / col1 ) NOT BETWEEN col2 * + col0 * - col0 AND + + col1 + 90 + 61

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) + - col1 col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-14","-47","-5"]
```


```sql
SELECT DISTINCT - - 35 + - - col2 + - col1 AS col2, + 45 + 25 / col0 AS col1 FROM tab0 AS cor0

Expected: ["1","46","133","45","24","45"] but got ["133","45.258","1","46.667","24","45.287"]
```


```sql
SELECT + AVG ( - CAST ( NULL AS INTEGER ) ) - CAST ( + + MIN ( + col0 ) AS INTEGER ) FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - 32 + - ( CAST ( SUM ( - col1 ) AS INTEGER ) ) FROM tab1

g is not defined
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT + col1 * + col1 BETWEEN + - 47 + + + col2 AND - - col2

6 results returned but expected 9
```


```sql
SELECT COUNT ( * ) / + - CAST ( + SUM ( ALL + - 19 ) AS INTEGER ) + - 51 FROM tab2 AS cor0

Expected: ["-51"] but got ["NULL"]
```


```sql
SELECT + + 45 AS col1, CAST ( NULL AS REAL ) AS col1 FROM tab2 AS cor0

Expected: ["45","NULL","45","NULL","45","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT col0 * 5 AS col2, CAST ( NULL AS REAL ) col2 FROM tab0

Expected: ["435","NULL","485","NULL","75","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * - + 74 AS col0, + CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1524 failed
* 84% was OK

Time: 19973ms

---- ---- ---- ---- ---- ---- ----
### 273/622 [`./test/random/aggregates/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_23.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab2 AS cor0 JOIN tab0 AS cor1 ON NOT - 15 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + CAST ( AVG ( - - col1 ) AS INTEGER ) + + 8 * 52 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT + ( - col0 ) * - - col1 * + col0 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["-107916","-315392","-376875"]
```


```sql
SELECT DISTINCT col0 / + 90 AS col1 FROM tab1

Expected: ["0","1"] but got ["0.567","0.944","1.011"]
```


```sql
SELECT ALL ( - - MIN ( - CAST ( NULL AS INTEGER ) ) ), + 95 col2 FROM tab1

Expected: ["NULL","95"] but got ["0","95"]
```


```sql
SELECT DISTINCT * FROM tab2 WHERE NOT ( col0 ) BETWEEN NULL AND - col2 / - col0

Query was expected to return results (but did not) 
```


```sql
SELECT + 46 * + ( CAST ( NULL AS INTEGER ) ) - COUNT ( + col2 ) + + - COUNT ( - 64 ) AS col0, + 42 + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["-6","42"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) * + + col2 AS col1 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT - ( - + 84 ) * - 55 IS NULL

18 results returned but expected 54
```


```sql
SELECT 79 + - MAX ( + col0 ) AS col2 FROM tab2 WHERE NOT + col2 BETWEEN - col2 + 77 - - col1 + + col2 * + + 82 AND NULL

Expected: ["4"] but got ["NULL"]
```


```sql
SELECT COUNT ( * ) + - CAST ( + MIN ( ALL - col2 ) AS INTEGER ), + CAST ( NULL AS REAL ) AS col2 FROM tab2 AS cor0

Expected: ["61","NULL"] but got ["3","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 cor0 INNER JOIN tab1 AS cor1 ON NOT + 23 IS NULL, tab0 AS cor2

Parse error on line 1:
... ON NOT + 23 IS NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1447 failed
* 85% was OK

Time: 20782ms

---- ---- ---- ---- ---- ---- ----
### 274/622 [`./test/random/aggregates/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_24.test)

_Mimic sqlite_

```sql
SELECT - - COUNT ( DISTINCT + col2 ) + - CAST ( NULL AS INTEGER ) FROM tab0 cor0

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT - col0 AS col0, col1 col0 FROM tab1 AS cor0

Expected: ["-51","14","-85","5","-91","47"] but got ["14","14","47","47","5","5"]
```


```sql
SELECT - col1 + col0 + + col1 - col0, CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0 WHERE NOT - 99 * - - 94 + + - col2 IS NULL

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT + CAST ( + + COUNT ( DISTINCT + col0 ) AS INTEGER ) AS col0 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT ALL + 1 + - col0 FROM tab2 WHERE NOT - col1 IN ( col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * COUNT ( * ) AS col2, + MAX ( + - col0 ) FROM tab0 AS cor0 WHERE + col1 = NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT ( NOT NULL IS NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT COUNT ( - 71 ) / COUNT ( * ) col1, + 5 / + COUNT ( * ) AS col1 FROM tab2 AS cor0 WHERE NOT - col1 IN ( 26, 95 * + col2 )

Expected: ["1","1"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 cor1 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL ( - + CAST ( NULL AS INTEGER ) ) + + ( - + COUNT ( * ) ), MAX ( ALL - CAST ( NULL AS INTEGER ) ) FROM tab2 cor0

Expected: ["NULL","NULL"] but got ["-3","0"]
```


```sql
SELECT ALL col2 AS col0, + 22 + + col1 - + CAST ( NULL AS REAL ) AS col0 FROM tab0 AS cor0

Expected: ["10","NULL","47","NULL","99","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - col0 / - ( + 8 ), - 88 / + + CAST ( NULL AS INTEGER ) AS col2 FROM tab1

Expected: ["10","NULL","11","NULL","6","NULL"] but got ["10.625","NULL","11.375","NULL","6.375","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1449 failed
* 85% was OK

Time: 19233ms

---- ---- ---- ---- ---- ---- ----
### 275/622 [`./test/random/aggregates/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_25.test)

_Mimic sqlite_

```sql
SELECT - COUNT ( * ) + COUNT ( * ) / + 46 FROM tab1

Expected: ["-3"] but got ["-2.935"]
```


```sql
SELECT ALL - COUNT ( * ), CAST ( NULL AS INTEGER ) * - - 37 AS col1 FROM tab2

Expected: ["-3","NULL"] but got ["-3","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab1 cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - 96 + col2 * CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-96","-96","-96"]
```


```sql
SELECT + CAST ( - COUNT ( * ) AS INTEGER ) - - ( + 23 ) * + 62 AS col0 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT * FROM tab0 WHERE NOT col2 + + col0 IN ( col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab2 cor1 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT - MAX ( + + col1 ), + MAX ( DISTINCT - col0 ) AS col2 FROM tab0 AS cor0 WHERE NOT 78 = NULL

Expected: ["NULL","NULL"] but got ["-81","-15"]
```


```sql
SELECT MAX ( + col0 ) FROM tab1 WHERE NOT ( + col1 ) IN ( col0 )

Expected: ["91"] but got ["NULL"]
```


```sql
SELECT DISTINCT + ( CAST ( + + COUNT ( * ) AS INTEGER ) ) AS col1, + COUNT ( * ) / CAST ( NULL AS REAL ) AS col0 FROM tab0

Expected: ["3","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT ( - - 78 ) / ( - 20 ) * - col2 / - CAST ( NULL AS INTEGER ) / + col2 AS col0, + ( col0 ) / + + col1 FROM tab2 AS cor0

Expected: ["NULL","0","NULL","1"] but got ["NULL","0.831","NULL","0.902","NULL","1.119"]
```

#### ☓ Ran 10012 tests as sqlite

* 1549 failed
* 84% was OK

Time: 19807ms

---- ---- ---- ---- ---- ---- ----
### 276/622 [`./test/random/aggregates/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_26.test)

_Mimic sqlite_

```sql
SELECT + - col2 / + col0 * - 41 + + + 81 FROM tab2 AS cor0

Expected: ["81","81","81"] but got ["81.012","81.015","81.019"]
```


```sql
SELECT MIN ( - - 92 ) * CAST ( NULL AS INTEGER ) + 27 FROM tab2 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["NULL"] but got ["27"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * - col1 * - ( + col1 ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - ( - 17 ) FROM tab1 AS cor0 WHERE NOT 13 * - col2 + 87 * 34 IN ( col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( COUNT ( col1 ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE 16 / + 48 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + - COUNT ( * ) - + - MIN ( ALL 97 ) AS col2 FROM tab1 WHERE CAST ( NULL AS INTEGER ) IS NULL

Expected: ["94"] but got ["NULL"]
```


```sql
SELECT DISTINCT 30 * + col2 AS col1, - CAST ( NULL AS REAL ) AS col1 FROM tab0

Expected: ["1410","NULL","2970","NULL","300","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ), - 26 + + - CAST ( NULL AS INTEGER ) * + col1 * + - col2 AS col2 FROM tab1

Expected: ["NULL","NULL"] but got ["0","-26"]
```


```sql
SELECT ALL SUM ( + + col1 ) AS col1, 4 - - CAST ( NULL AS REAL ) AS col1 FROM tab1

Expected: ["66","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 LEFT JOIN tab1 AS cor1 ON NOT - 6 IS NOT NULL WHERE ( NULL ) IS NULL

6 results returned but expected 18
```


```sql
SELECT + 36 * - CAST ( NULL AS INTEGER ), - col2 / + col1 + - - CAST ( NULL AS REAL ) col2 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT DISTINCT col0 + + 53 + + + CAST ( NULL AS INTEGER ) * + - 61 + col0 + - col2 * - 53, col2 / - CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["3350","NULL","3839","NULL","5243","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col2, + CAST ( NULL AS INTEGER ) + + 67 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","67","0","67","0","67"]
```

#### ☓ Ran 10012 tests as sqlite

* 1498 failed
* 85% was OK

Time: 20573ms

---- ---- ---- ---- ---- ---- ----
### 277/622 [`./test/random/aggregates/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_27.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 / + + 70 FROM tab0

Expected: ["0","1"] but got ["0.214","1.243","1.386"]
```


```sql
SELECT ALL * FROM tab1 AS cor0 WHERE NOT + 24 * + 22 IN ( + 97 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - col2 * col0 * - CAST ( NULL AS INTEGER ) AS col2, + ( - + CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) ) + + 19 AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["19","19"]
```


```sql
SELECT DISTINCT + col2 + + 34 + - 62 * 80 * col1 * col0 * - + 96 - + col2 + CAST ( NULL AS INTEGER ) / - - 11 FROM tab1 AS cor0

Expected: ["NULL"] but got ["202368034","2036536354","339978274"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab2 cor1 WHERE ( NULL ) IS NULL

18 results returned but expected 54
```


```sql
SELECT + CAST ( COUNT ( DISTINCT - col1 ) AS INTEGER ) * - 24 FROM tab1

g is not defined
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * + - col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) - - col1, CAST ( NULL AS INTEGER ) col0 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["51","0","67","0","77","0"]
```


```sql
SELECT ALL 85, CAST ( col1 AS INTEGER ) * + col0 AS col2, - - 22 AS col2 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + MIN ( DISTINCT col2 ) FROM tab0 AS cor0 WHERE NOT col2 + col1 NOT BETWEEN - col2 AND ( + 42 + 98 )

Expected: ["10"] but got ["NULL"]
```


```sql
SELECT + COUNT ( * ) AS col1, CAST ( NULL AS REAL ) AS col1 FROM tab2

Expected: ["3","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1516 failed
* 84% was OK

Time: 19549ms

---- ---- ---- ---- ---- ---- ----
### 278/622 [`./test/random/aggregates/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_28.test)

_Mimic sqlite_

```sql
SELECT ALL + + 86 * - 61 * + ( + - MAX ( + + ( - + col1 ) ) ) FROM tab2 WHERE NOT CAST ( NULL AS INTEGER ) IS NULL

Expected: ["NULL"] but got ["-267546"]
```


```sql
SELECT DISTINCT col0 FROM tab2 AS cor0 WHERE NOT + col1 + + CAST ( col1 AS INTEGER ) IN ( - col2 * + col0 * - col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - - col1 AS col1, - col2 / + 98 FROM tab2 AS cor0

Expected: ["51","0","67","0","77","0"] but got ["51","-0.235","67","-0.592","77","-0.408"]
```


```sql
SELECT ALL - col0 AS col1, + col0 AS col1, col1 + - col2 * - + col2 * - col0 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * - - col0 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT CAST ( + + COUNT ( * ) AS INTEGER ) col2 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 cor1 WHERE 30 - - 54 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * + col2 - + col2, - CAST ( NULL AS INTEGER ) col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-10","0","-47","0","-99","0"]
```


```sql
SELECT MIN ( - col2 ) FROM tab1 AS cor0 WHERE NOT - 54 BETWEEN - ( - col2 ) + - col1 AND NULL

Expected: ["-96"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ), 42 * + 65 * MAX ( ALL CAST ( NULL AS INTEGER ) ) FROM tab0

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1533 failed
* 84% was OK

Time: 19962ms

---- ---- ---- ---- ---- ---- ----
### 279/622 [`./test/random/aggregates/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_29.test)

_Mimic sqlite_

```sql
SELECT CAST ( - COUNT ( * ) AS INTEGER ) col2 FROM tab1 cor0

g is not defined
```


```sql
SELECT ( + 23 ) / + col1 - 56 AS col0 FROM tab1

Expected: ["-52","-55","-56"] but got ["-51.400","-54.357","-55.511"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * - col0 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL - 4 * - MAX ( CAST ( NULL AS INTEGER ) ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT + + 26 BETWEEN + col0 AND ( 91 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col1, col0 + - - 95, + col2 * - col0 AS col0 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM ( tab1 AS cor0 CROSS JOIN tab1 AS cor1 ) WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT col1 / + 52, 41 * + - CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["0","NULL","1","NULL"] but got ["0.019","0","0.404","0","1.558","0"]
```


```sql
SELECT + - CAST ( NULL AS REAL ), col0 / col2 AS col0 FROM tab1 AS cor0

Expected: ["NULL","0","NULL","1","NULL","1"] but got ["NULL","0.531","NULL","1.338","NULL","1.441"]
```


```sql
SELECT 83 AS col2, CAST ( NULL AS REAL ) col2 FROM tab1

Expected: ["83","NULL","83","NULL","83","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * - col1 * + - CAST ( NULL AS REAL ) + + + col1 AS col1, col1 / + col0 FROM tab2

Expected: ["NULL","0","NULL","1"] but got ["NULL","0.893","NULL","1.109","NULL","1.203"]
```

#### ☓ Ran 10012 tests as sqlite

* 1516 failed
* 84% was OK

Time: 29015ms

---- ---- ---- ---- ---- ---- ----
### 280/622 [`./test/random/aggregates/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_3.test)

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
SELECT - COUNT ( * ) * + CAST ( NULL AS REAL ) AS col1, 1 FROM tab2 cor0

Expected: ["NULL","1"] but got ["1","NULL"]
```


```sql
SELECT 55 / + CAST ( NULL AS INTEGER ), col2 * 46 + col1 + + CAST ( NULL AS INTEGER ) + - col2 * - col0 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","2167","NULL","4477","NULL","7085"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) - + - col2, + CAST ( NULL AS INTEGER ) / - + 95 FROM tab0

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - COUNT ( * ) / - CAST ( + COUNT ( * ) AS INTEGER ) FROM tab2

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS REAL ) * - col2 AS col2, col0 / col1 AS col0 FROM tab0

Expected: ["NULL","0","NULL","4","NULL","97"] but got ["NULL","0.185","NULL","4.143","NULL","97"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col2, col1 + + CAST ( NULL AS INTEGER ) FROM tab2 WHERE NOT NULL IS NOT NULL

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","51","0","67","0","77"]
```

#### ☓ Ran 10012 tests as sqlite

* 1533 failed
* 84% was OK

Time: 27723ms

---- ---- ---- ---- ---- ---- ----
### 281/622 [`./test/random/aggregates/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_30.test)

_Mimic sqlite_

```sql
SELECT ALL 32 / + col2 - + - ( col1 ) + - 73 * col1 FROM tab2 cor0

Expected: ["-3671","-4824","-5544"] but got ["-3670.609","-4823.448","-5543.200"]
```


```sql
SELECT + 45 / 23 FROM tab0 WHERE col0 + - + col1 + - 72 * ( CAST ( NULL AS INTEGER ) * 26 ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL 42 + + CAST ( NULL AS INTEGER ) * col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["42","42","42"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab1 WHERE + col1 IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT 16 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + CAST ( + - COUNT ( * ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - ( + col0 ), - CAST ( NULL AS REAL ) * + col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT ALL ( - MAX ( col2 ) ) * + 37 AS col0 FROM tab0 WHERE NOT ( + - col0 / col0 ) IN ( - ( - col0 ) - + ( - 36 ) )

Expected: ["-3663"] but got ["NULL"]
```


```sql
SELECT + col1 col2, + col0 / - CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["14","NULL","47","NULL","5","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT + 74 IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + 92 + - col1 + - + 13, - CAST ( NULL AS REAL ) AS col0 FROM tab2

Expected: ["12","NULL","2","NULL","28","NULL"] but got ["12","NULL","28","NULL","2","NULL"]
```


```sql
SELECT DISTINCT - 58 + + MAX ( col0 ) AS col1, 39 FROM tab2 cor0 WHERE NOT col2 <> 26

Expected: ["NULL","39"] but got ["39","NULL"]
```


```sql
SELECT ( - + CAST ( NULL AS INTEGER ) ) / + COUNT ( + + 72 ) col0, + ( - + 71 ) * CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["NULL","NULL"] but got ["0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1477 failed
* 85% was OK

Time: 20272ms

---- ---- ---- ---- ---- ---- ----
### 282/622 [`./test/random/aggregates/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_31.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * - - col1 AS col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL col2 * - col1 + CAST ( NULL AS INTEGER ) / - 59 AS col1 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["-1344","-295","-3196"]
```


```sql
SELECT ALL - - 55 / - COUNT ( * ) FROM tab0 AS cor0

Expected: ["-18"] but got ["-18.333"]
```


```sql
SELECT DISTINCT - + col2 * col2 FROM tab1 WHERE + CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( COUNT ( - col0 ) AS INTEGER ) FROM tab0 AS cor0

g is not defined
```


```sql
SELECT DISTINCT + + col2 AS col1, - col0 AS col1, - + col0 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab2 AS cor1 WHERE NOT - 92 IS NULL

18 results returned but expected 54
```


```sql
SELECT - CAST ( NULL AS INTEGER ), - AVG ( ALL - col2 ) FROM tab1 WHERE + col1 IS NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL 83 + 86 / + MAX ( + 8 / - col2 + - col2 ) AS col0 FROM tab0 WHERE NOT ( 9 ) IN ( col1 )

Expected: ["75"] but got ["NULL"]
```


```sql
SELECT - - AVG ( ALL CAST ( NULL AS INTEGER ) ) * + MIN ( + 39 ), - SUM ( - col2 ) / + CAST ( + COUNT ( * ) AS INTEGER ) + - 10 AS col1 FROM tab1 AS cor0

Expected: ["NULL","64"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1549 failed
* 84% was OK

Time: 19971ms

---- ---- ---- ---- ---- ---- ----
### 283/622 [`./test/random/aggregates/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_32.test)

_Mimic sqlite_

```sql
SELECT ALL COUNT ( * ) / + 66 FROM tab0 AS cor0

Expected: ["0"] but got ["0.045"]
```


```sql
SELECT ALL + col0 + + - col0, CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT ALL - 4 + + col2 FROM tab2 AS cor0 WHERE NOT - col0 + + CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * + col2 AS col1 FROM tab1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + col1, col2 * - col1 * + + col2 AS col2, + col0 AS col2 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - 41 AS col1, CAST ( + MAX ( 9 ) AS INTEGER ) * + + 29 AS col2 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT DISTINCT COUNT ( * ) / COUNT ( * ) AS col2 FROM tab0 AS cor0 WHERE NOT + col0 BETWEEN col2 AND + 80 + + 9 / col1

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT DISTINCT 61 AS col0 FROM tab0 AS cor0 LEFT JOIN tab2 AS cor1 ON NOT NULL IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...NOT NULL IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - - AVG ( ALL + col2 ) AS col2, 76 FROM tab2 WHERE NOT - 11 IS NOT NULL

Expected: ["NULL","76"] but got ["76","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) / col0 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT 99 IS NULL

18 results returned but expected 54
```

#### ☓ Ran 10012 tests as sqlite

* 1510 failed
* 84% was OK

Time: 19704ms

---- ---- ---- ---- ---- ---- ----
### 284/622 [`./test/random/aggregates/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_33.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 13 * + + CAST ( NULL AS INTEGER ) * - 10 AS col1 FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + 92 * CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + col2 / + + col0 + + 17 FROM tab0 AS cor0

Expected: ["17","18","20"] but got ["17.115","18.021","20.133"]
```


```sql
SELECT + 97 + + col2 AS col0, col0, + - col1 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 cor0 WHERE NOT ( + 57 ) IN ( + col0 + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT ( - CAST ( COUNT ( * ) AS INTEGER ) ) AS col1 FROM tab0

g is not defined
```


```sql
SELECT ( + 56 ) AS col1, + CAST ( NULL AS REAL ) + col0 * + ( - col2 ) AS col1 FROM tab1

Expected: ["56","NULL","56","NULL","56","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT CAST ( + 61 AS INTEGER ) IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - + SUM ( 74 ) / + CAST ( - MAX ( ALL + col1 ) AS INTEGER ) FROM tab0 AS cor0

Expected: ["2"] but got ["NULL"]
```


```sql
SELECT DISTINCT col0 AS col1, - CAST ( NULL AS REAL ) AS col1 FROM tab0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 JOIN tab2 cor1 ON NOT NULL BETWEEN NULL AND NULL, tab1 AS cor2

Parse error on line 1:
...ETWEEN NULL AND NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * 63 + 75 AS col2, CAST ( NULL AS INTEGER ) FROM tab1, tab0 AS cor0

Expected: ["NULL","NULL"] but got ["75","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1561 failed
* 84% was OK

Time: 19874ms

---- ---- ---- ---- ---- ---- ----
### 285/622 [`./test/random/aggregates/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_34.test)

_Mimic sqlite_

```sql
SELECT + 54 / col2 FROM tab1 AS cor0

Expected: ["0","0","0"] but got ["0.563","0.794","0.915"]
```


```sql
SELECT col1 * + col0 + ( CAST ( NULL AS INTEGER ) ) FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["425","4277","714"]
```


```sql
SELECT DISTINCT + + SUM ( + 29 ) FROM tab0 AS cor0 WHERE col1 * - col0 / col2 = NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT - CAST ( + - COUNT ( * ) AS INTEGER ) + 66 FROM tab2

g is not defined
```


```sql
SELECT * FROM tab1 WHERE NOT - col2 IN ( + - 56 * 52, - 45, + 52, - - 75 * - + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT col1, - col2 / + CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["14","NULL","47","NULL","5","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - col0, col0 * - col2 + 10 col2, + col2 - 96 col2 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT 61 + + 13 IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) - + 92 AS col0, CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["-92","0"]
```


```sql
SELECT - ( COUNT ( * ) ) + + MIN ( DISTINCT - col0 ) AS col2 FROM tab2 cor0 WHERE NOT - col1 * - - col1 IN ( + - col1 )

Expected: ["-78"] but got ["NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) - col2, + CAST ( NULL AS INTEGER ) - + col0 / ( col0 ) AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-1"]
```

#### ☓ Ran 10012 tests as sqlite

* 1360 failed
* 86% was OK

Time: 20042ms

---- ---- ---- ---- ---- ---- ----
### 286/622 [`./test/random/aggregates/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_35.test)

_Mimic sqlite_

```sql
SELECT ( COUNT ( * ) ) FROM tab0 AS cor0 WHERE NOT - col1 * 94 - - CAST ( NULL AS INTEGER ) NOT BETWEEN ( col0 ) AND + 86

Expected: ["0"] but got ["3"]
```


```sql
SELECT ALL 93 AS col0, CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["93","NULL","93","NULL","93","NULL"] but got ["93","0","93","0","93","0"]
```


```sql
SELECT - - CAST ( + COUNT ( ALL + col0 ) AS INTEGER ) AS col1 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT + COUNT ( * ) AS col2, AVG ( + CAST ( NULL AS INTEGER ) ) AS col1 FROM tab1

Expected: ["3","NULL"] but got ["3","0"]
```


```sql
SELECT * FROM tab1 WHERE NOT + col1 / + col0 IN ( - 91 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * - 13 AS col1 FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM ( tab2 AS cor0 CROSS JOIN tab2 )

18 results returned but expected 54
```


```sql
SELECT DISTINCT - MAX ( - col1 ) / CAST ( + - COUNT ( * ) AS INTEGER ) AS col2 FROM tab2

Expected: ["-17"] but got ["NULL"]
```


```sql
SELECT - 82 col2, AVG ( 76 ) AS col2 FROM tab1 WHERE NOT + col1 IS NOT NULL

Expected: ["-82","NULL"] but got ["NULL"]
```


```sql
SELECT - col0 / + + col2, ( + - 79 ) / - + CAST ( NULL AS INTEGER ) + - col0 AS col1 FROM tab1

Expected: ["-1","NULL","-1","NULL","0","NULL"] but got ["-0.531","NULL","-1.338","NULL","-1.441","NULL"]
```


```sql
SELECT DISTINCT ( + + CAST ( NULL AS INTEGER ) ) * COUNT ( * ) AS col1, + CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1419 failed
* 85% was OK

Time: 18648ms

---- ---- ---- ---- ---- ---- ----
### 287/622 [`./test/random/aggregates/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_36.test)

_Mimic sqlite_

```sql
SELECT 89 / + col1 + - col2 FROM tab0 AS cor0

Expected: ["-10","-46","-6"] but got ["-10","-45.901","-5.762"]
```


```sql
SELECT DISTINCT + CAST ( ( - COUNT ( * ) ) AS INTEGER ) AS col0 FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

g is not defined
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) / col0 AS col1 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * - COUNT ( * ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL * FROM tab2, tab2 AS cor0 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col1 FROM tab1 WHERE NOT - col2 NOT BETWEEN + + ( - CAST ( + 19 AS INTEGER ) ) * + 26 AND ( + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM ( tab0 AS cor0 CROSS JOIN tab0 )

18 results returned but expected 54
```


```sql
SELECT DISTINCT + CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) / + + 5 / - 48 * + - 22 + + + SUM ( col2 ) FROM tab0

Expected: ["NULL","NULL"] but got ["0","156"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), CAST ( NULL AS REAL ) + - COUNT ( ( + col1 ) ) * + MIN ( ALL col1 ) AS col2 FROM tab2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - col0 + - col1 - 12 - + - col1, CAST ( NULL AS REAL ) AS col1 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-58","NULL","-76","NULL","-87","NULL"]
```


```sql
SELECT 39 + ( 30 + MAX ( ALL col2 ) ) FROM tab0 AS cor0 WHERE - col0 * CAST ( NULL AS INTEGER ) IS NULL AND ( 51 * 71 ) IS NOT NULL

Expected: ["168"] but got ["NULL"]
```


```sql
SELECT + 20 * 17 + + + 26 * + MIN ( DISTINCT - col0 ) col1, - 97 / - 70 FROM tab2 WHERE NULL <= + - col0

Expected: ["NULL","1"] but got ["NULL","1.386"]
```

#### ☓ Ran 10012 tests as sqlite

* 1430 failed
* 85% was OK

Time: 19467ms

---- ---- ---- ---- ---- ---- ----
### 288/622 [`./test/random/aggregates/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_37.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - SUM ( ALL CAST ( NULL AS INTEGER ) ) * - SUM ( 89 ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + - col1 - - col2 AS col0, col0 AS col0 FROM tab2 AS cor0

Expected: ["-28","46","-37","64","-9","75"] but got ["46","46","64","64","75","75"]
```


```sql
SELECT ALL 87 AS col1, + CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["87","NULL","87","NULL","87","NULL"] but got ["87","0","87","0","87","0"]
```


```sql
SELECT CAST ( - ( AVG ( col0 ) ) AS INTEGER ) AS col2 FROM tab0

g is not defined
```


```sql
SELECT * FROM tab1 WHERE NOT col2 BETWEEN ( NULL ) AND ( - 5 ) * + col1

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - MAX ( col1 ) col0 FROM tab2 AS cor0 WHERE NOT - col1 IN ( 84 + - col0 * + 20 )

Expected: ["-77"] but got ["NULL"]
```


```sql
SELECT - + col1 AS col0, col0 * + col0 + - + col0 AS col1, + - 18 AS col0 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 JOIN tab2 AS cor1 ON + 69 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT col0 * - col0 * + + CAST ( NULL AS REAL ), col1 * - ( + - CAST ( NULL AS INTEGER ) ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT ALL + - col1 AS col2, + CAST ( NULL AS REAL ) AS col2 FROM tab0 AS cor0

Expected: ["-1","NULL","-21","NULL","-81","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT 56 + CAST ( NULL AS INTEGER ) col0, - ( + SUM ( col1 ) ) * - 43 - - 83 FROM tab1 WHERE NULL = - col0 + - + ( - 39 ) / - 22

Expected: ["NULL","NULL"] but got ["56","83"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) + + - col0, 62 + - - col2 + - - col0 * - + CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["NULL","NULL"] but got ["NULL","102","NULL","120","NULL","85"]
```


```sql
SELECT DISTINCT col2 + + CAST ( NULL AS INTEGER ) * + + 36 FROM tab0

Expected: ["NULL"] but got ["10","47","99"]
```

#### ☓ Ran 10012 tests as sqlite

* 1426 failed
* 85% was OK

Time: 25825ms

---- ---- ---- ---- ---- ---- ----
### 289/622 [`./test/random/aggregates/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_38.test)

_Mimic sqlite_

```sql
SELECT - col0 / + 92 FROM tab1 AS cor0 WHERE NOT col2 BETWEEN + col2 AND - col2

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( COUNT ( + col0 ) AS INTEGER ) FROM tab1 AS cor0

g is not defined
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + - col2 * - 23 + col2 AS col2 FROM tab1 AS cor0 WHERE NULL IS NULL

Expected: ["NULL"] but got ["1416","1632","2304"]
```


```sql
SELECT ALL COUNT ( * ) FROM tab1 WHERE NOT NULL > NULL

Expected: ["0"] but got ["3"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - ( - + ( - + col0 ) ) * - 74 - col1 * - col1 + - + 7 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-6","434","6554"]
```


```sql
SELECT - col1 - - 97 * - + col0 * col1 * CAST ( NULL AS INTEGER ) AS col0, - CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT ALL * FROM ( tab2 AS cor0 CROSS JOIN tab2 AS cor1 ) WHERE NOT 20 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - MIN ( 32 ) AS col1 FROM tab1 WHERE NOT + - col2 + 72 + + ( + - col2 ) IN ( + 61 )

Expected: ["-32"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM ( tab2 cor0 CROSS JOIN tab2 cor1 )

18 results returned but expected 54
```


```sql
SELECT ALL MAX ( + ( - CAST ( NULL AS REAL ) ) ) + + COUNT ( * ) AS col1, - CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT 16 col2, CAST ( NULL AS REAL ) * col1 AS col2 FROM tab0

Expected: ["16","NULL","16","NULL","16","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) * col0 FROM tab1 AS cor0 WHERE + col0 NOT BETWEEN NULL AND col2

Expected: ["NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL - COUNT ( * ) AS col0, 85 + - - 20 / - + CAST ( NULL AS INTEGER ) + + COUNT ( * ) + + 45 AS col0 FROM tab1

Expected: ["-3","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1425 failed
* 85% was OK

Time: 24995ms

---- ---- ---- ---- ---- ---- ----
### 290/622 [`./test/random/aggregates/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_39.test)

_Mimic sqlite_

```sql
SELECT COUNT ( * ) / + 71 AS col1 FROM tab0 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["0"] but got ["0.042"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * + 7 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + 9 * ( CAST ( COUNT ( * ) AS INTEGER ) ) FROM tab1 WHERE NOT + col2 BETWEEN ( + col1 ) AND ( 99 / col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT col0 + - CAST ( NULL AS INTEGER ) * col1 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["46","64","75"]
```


```sql
SELECT DISTINCT + CAST ( - AVG ( DISTINCT + 98 ) AS INTEGER ) AS col2 FROM tab2

g is not defined
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab2 AS cor1 WHERE ( NULL ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT ( NULL ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) AS col1, CAST ( NULL AS REAL ) + + 10 * CAST ( NULL AS INTEGER ) * + MIN ( - col1 ) FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT SUM ( + CAST ( NULL AS INTEGER ) ) AS col2, CAST ( NULL AS INTEGER ) - - - SUM ( + 86 ) FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","-258"]
```


```sql
SELECT MIN ( ALL + 85 ) FROM tab2 WHERE NOT - col2 BETWEEN NULL AND ( col0 * - 64 )

Expected: ["85"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1481 failed
* 85% was OK

Time: 21711ms

---- ---- ---- ---- ---- ---- ----
### 291/622 [`./test/random/aggregates/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_4.test)

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
SELECT ALL col1, col1 / + 52 / - - CAST ( NULL AS REAL ) * + + ( 13 ) col1 FROM tab0

Expected: ["1","NULL","21","NULL","81","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
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

* 1560 failed
* 84% was OK

Time: 21330ms

---- ---- ---- ---- ---- ---- ----
### 292/622 [`./test/random/aggregates/slt_good_40.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_40.test)

_Mimic sqlite_

```sql
SELECT ALL - ( - - col0 ) AS col2, - CAST ( NULL AS INTEGER ) FROM tab1 cor0

Expected: ["-51","NULL","-85","NULL","-91","NULL"] but got ["-51","0","-85","0","-91","0"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * COUNT ( * ) AS col0 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT col0 / - - col2 + - 22 AS col0 FROM tab0

Expected: ["-14","-22"] but got ["-13.300","-21.020","-21.681"]
```


```sql
SELECT ALL CAST ( + COUNT ( * ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT ALL * FROM tab0 WHERE NOT + + 83 IN ( - col1, - ( - 17 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + 40 / 83 * + - col0 AS col0, CAST ( NULL AS REAL ) * - col1 * 80 AS col1 FROM tab2

Expected: ["0","NULL"] but got ["-22.169","NULL","-30.843","NULL","-36.145","NULL"]
```


```sql
SELECT DISTINCT + col1 * - + col0 * - col0 AS col1, col2 - - ( - - col1 ) AS col0, + - 63 AS col1 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL MIN ( DISTINCT - ( + col1 ) ) FROM tab1 WHERE NOT + col1 IN ( col2 )

Expected: ["-47"] but got ["NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ), SUM ( ALL - col0 ) / + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT * FROM tab0 AS cor0 LEFT JOIN tab0 AS cor1 ON NOT NULL < NULL

54 results returned but expected 18
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) col1, - CAST ( NULL AS INTEGER ) * COUNT ( * ) FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1463 failed
* 85% was OK

Time: 22058ms

---- ---- ---- ---- ---- ---- ----
### 293/622 [`./test/random/aggregates/slt_good_41.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_41.test)

_Mimic sqlite_

```sql
SELECT DISTINCT COUNT ( + col0 ) FROM tab0 AS cor0 WHERE NOT NULL < NULL

Expected: ["0"] but got ["3"]
```


```sql
SELECT ALL - 7 / col0 * - col2 AS col2 FROM tab2 WHERE NOT - 31 * + col0 / 20 IN ( + - col1, + col2, 96 * - - col2, - - col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + 18 * ( ( 11 ) ) + + CAST ( NULL AS INTEGER ) AS col1 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["198","198","198"]
```


```sql
SELECT + CAST ( COUNT ( * ) AS INTEGER ) * CAST ( NULL AS INTEGER ) AS col2 FROM tab1

g is not defined
```


```sql
SELECT DISTINCT + 73 * CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab2 cor1 WHERE NOT ( - 21 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + + 38 / - col2, col2 + - col2 / - CAST ( NULL AS INTEGER ) + - col1 - + + ( - 37 ) + + col2 / - col1 + - 42 / + + col0 AS col2 FROM tab2 AS cor0

Expected: ["-1","NULL","0","NULL","0","NULL"] but got ["-0.655","NULL","-0.950","NULL","-1.652","NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1 WHERE - 61 <= 45

18 results returned but expected 54
```


```sql
SELECT ALL + MIN ( - 81 ) * COUNT ( * ) AS col0, 70 FROM tab1 WHERE NOT + col0 IS NOT NULL

Expected: ["NULL","70"] but got ["70","NULL"]
```


```sql
SELECT COUNT ( * ) / + ( + CAST ( + COUNT ( - - col0 ) AS INTEGER ) ) col2 FROM tab0

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT DISTINCT + 78 AS col0, - col1 + + col2 + - ( + - CAST ( NULL AS REAL ) ) + - 72 AS col0 FROM tab2

Expected: ["78","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1355 failed
* 86% was OK

Time: 22866ms

---- ---- ---- ---- ---- ---- ----
### 294/622 [`./test/random/aggregates/slt_good_42.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_42.test)

_Mimic sqlite_

```sql
SELECT ALL + col2 + CAST ( NULL AS INTEGER ) / + + col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["10","47","99"]
```


```sql
SELECT DISTINCT COUNT ( col0 ) + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT DISTINCT + col1 / - 82 FROM tab1

Expected: ["0"] but got ["-0.061","-0.171","-0.573"]
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - + CAST ( + COUNT ( * ) AS INTEGER ) AS col2 FROM tab0 AS cor0 WHERE NOT ( col0 / col2 * + + col0 ) NOT BETWEEN ( 94 ) AND - - 69 * + 66

g is not defined
```


```sql
SELECT ALL - CAST ( NULL AS REAL ) / + - 50 * - - 32 AS col1, - CAST ( NULL AS INTEGER ) col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT - + 16 col0 FROM tab0 AS cor0 WHERE NOT - col0 IN ( + col1 + col1, col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT col2 * - col0 * col1 * - - CAST ( NULL AS INTEGER ), - CAST ( NULL AS INTEGER ) - - col0 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","46","0","64","0","75"]
```


```sql
SELECT DISTINCT 82 / + - col1 * + CAST ( NULL AS INTEGER ) col0, col1 / + col0 AS col1 FROM tab2 AS cor0

Expected: ["NULL","0","NULL","1"] but got ["NULL","0.893","NULL","1.109","NULL","1.203"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT - 14 IS NULL

18 results returned but expected 54
```


```sql
SELECT + ( - - col0 ) AS col2, CAST ( NULL AS REAL ) * - + col1 AS col2 FROM tab0 AS cor0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT col0 + 19 / - - 61 AS col0, + col1 - + CAST ( NULL AS REAL ) / + col2 + - col2 AS col2 FROM tab1

Expected: ["51","NULL","85","NULL","91","NULL"] but got ["51.311","NULL","85.311","NULL","91.311","NULL"]
```


```sql
SELECT ALL MAX ( col2 ), COUNT ( * ) + + CAST ( + COUNT ( * ) AS INTEGER ) + + ( + CAST ( AVG ( col2 ) AS INTEGER ) ) * - COUNT ( * ) col2 FROM tab2 AS cor0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - AVG ( DISTINCT + CAST ( NULL AS INTEGER ) ) + + 0 AS col0, COUNT ( * ) + - CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["NULL","NULL"] but got ["0","3"]
```

#### ☓ Ran 10012 tests as sqlite

* 1407 failed
* 85% was OK

Time: 21836ms

---- ---- ---- ---- ---- ---- ----
### 295/622 [`./test/random/aggregates/slt_good_43.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_43.test)

_Mimic sqlite_

```sql
SELECT ALL + col1 / - - col2 + + + col1 + - - col2 + - + col2 * - col1 AS col0 FROM tab0 AS cor0

Expected: ["199","243","3936"] but got ["199.010","243.100","3936.723"]
```


```sql
SELECT ALL - COUNT ( * ) + - - SUM ( DISTINCT + col1 ) AS col1 FROM tab1 WHERE ( ( NULL ) IS NOT NULL )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col1, - 10 * 22 * - - CAST ( NULL AS REAL ) AS col2 FROM tab0 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT + CAST ( - col0 AS INTEGER ) * - col0 - + 80 IN ( + col1, col2 + - col2, + - 30 - + 24 * col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - ( CAST ( NULL AS INTEGER ) ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE 92 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( MIN ( + 74 ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab2, tab1 AS cor0 WHERE ( + 77 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT CAST ( NULL AS REAL ), + MAX ( DISTINCT + - 64 ) + + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-64"]
```


```sql
SELECT + col2 / + - col0 AS col2, col2 / CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["-1","NULL","0","NULL","0","NULL"] but got ["-0.694","NULL","-0.747","NULL","-1.882","NULL"]
```


```sql
SELECT DISTINCT + ( - col1 ) * - col1 + + ( - col0 ) + col2 AS col1, - 87 / CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["3","NULL","364","NULL","6593","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + MIN ( ALL + col0 ) FROM tab2 WHERE NOT col2 * 43 IN ( + 38, ( + + col2 ), 92 + - + 76 )

Expected: ["46"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1449 failed
* 85% was OK

Time: 22167ms

---- ---- ---- ---- ---- ---- ----
### 296/622 [`./test/random/aggregates/slt_good_44.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_44.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 - col2 / + col1 AS col1 FROM tab0

Expected: ["-2","15","87"] but got ["-2","14.420","86.524"]
```


```sql
SELECT - col0 + CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-15","-87","-97"]
```


```sql
SELECT ALL + COUNT ( + 5 ) + - AVG ( ALL CAST ( NULL AS INTEGER ) ) AS col0 FROM tab2

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT * FROM tab1 WHERE NOT - 76 + + CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( + SUM ( ALL - 2 ) AS INTEGER ) AS col2, - ( - + CAST ( + - 99 AS INTEGER ) ), + 64 AS col1 FROM tab1

g is not defined
```


```sql
SELECT ALL * FROM tab0 cor0 CROSS JOIN tab0 cor1 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( NULL AS REAL ) AS col1, CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT + - col1 AS col1, CAST ( NULL AS REAL ) * col0 AS col1 FROM tab1 AS cor0

Expected: ["-14","NULL","-47","NULL","-5","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL CAST ( NULL AS REAL ) AS col1, CAST ( NULL AS INTEGER ) + + - COUNT ( DISTINCT - + CAST ( NULL AS REAL ) ) FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-1"]
```


```sql
SELECT DISTINCT - COUNT ( * ) / CAST ( + MIN ( - 49 ) AS INTEGER ) AS col0 FROM tab0

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT DISTINCT - - CAST ( NULL AS INTEGER ) + - + col2, CAST ( NULL AS INTEGER ) + - 19 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["-23","-19","-40","-19","-58","-19"]
```

#### ☓ Ran 10012 tests as sqlite

* 1480 failed
* 85% was OK

Time: 23102ms

---- ---- ---- ---- ---- ---- ----
### 297/622 [`./test/random/aggregates/slt_good_45.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_45.test)

_Mimic sqlite_

```sql
SELECT + + 95 / 43 + - 1 FROM tab0 AS cor0

Expected: ["1","1","1"] but got ["1.209","1.209","1.209"]
```


```sql
SELECT ALL * FROM tab0 WHERE NOT col1 * - col1 BETWEEN - col2 AND ( col0 * - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( COUNT ( * ) AS INTEGER ) * 39 FROM tab1

g is not defined
```


```sql
SELECT - ( CAST ( NULL AS INTEGER ) ) * + 78 col1 FROM tab1 cor0 CROSS JOIN tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col1 * + - CAST ( NULL AS INTEGER ) + 43 + - 55 AS col1, + 61 FROM tab1

Expected: ["NULL","61","NULL","61","NULL","61"] but got ["-12","61","-12","61","-12","61"]
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * - - col0 AS col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - COUNT ( * ) * ( MIN ( ALL col0 ) ) FROM tab1 WHERE + 70 * - CAST ( NULL AS REAL ) IS NULL

Expected: ["-153"] but got ["NULL"]
```


```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) / + - COUNT ( * ), 38 * CAST ( NULL AS INTEGER ) * - - COUNT ( * ) FROM tab1 cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 JOIN tab0 AS cor1 ON NOT - 46 IS NULL

18 results returned but expected 54
```


```sql
SELECT MAX ( ALL col0 ), SUM ( + - 91 ) FROM tab0 WHERE NULL > col0

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - CAST ( NULL AS REAL ), + COUNT ( * ) / - + CAST ( ( - - 71 ) AS INTEGER ) AS col1 FROM tab0 cor0

Expected: ["NULL","0"] but got ["NULL","-0.042"]
```

#### ☓ Ran 10012 tests as sqlite

* 1387 failed
* 86% was OK

Time: 23607ms

---- ---- ---- ---- ---- ---- ----
### 298/622 [`./test/random/aggregates/slt_good_46.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_46.test)

_Mimic sqlite_

```sql
SELECT + COUNT ( * ) - - 85 + + 45 / SUM ( DISTINCT + 43 ) FROM tab1 AS cor0

Expected: ["89"] but got ["89.047"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) - - - col2 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-10","-47","-99"]
```


```sql
SELECT ALL CAST ( + MAX ( - col2 ) AS INTEGER ) AS col1 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT 85 FROM tab1 AS cor0 WHERE NOT - 34 BETWEEN + + col0 AND CAST ( - + col2 AS INTEGER )

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( NULL AS INTEGER ) + ( + SUM ( CAST ( NULL AS INTEGER ) ) + + SUM ( ALL col0 ) ) AS col1 FROM tab1 WHERE NOT ( + 68 ) > 14 * col0

Expected: ["NULL"] but got ["227"]
```


```sql
SELECT + - col2 + - col0 AS col2, + CAST ( - col0 AS INTEGER ), - col1 AS col2 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT COUNT ( * ) AS col0, + COUNT ( * ) * + + MIN ( CAST ( NULL AS REAL ) ) * - + 72 * - COUNT ( * ) AS col0 FROM tab0, tab0 AS cor0

Expected: ["9","NULL"] but got ["NULL"]
```


```sql
SELECT 48 / + 38, CAST ( NULL AS REAL ) AS col2 FROM tab0

Expected: ["1","NULL","1","NULL","1","NULL"] but got ["1.263","NULL","1.263","NULL","1.263","NULL"]
```


```sql
SELECT + ( + ( 83 ) ) AS col0, 80 / + 91 - + + col1 + - CAST ( NULL AS REAL ) + CAST ( col0 AS INTEGER ) AS col0 FROM tab2 AS cor0

Expected: ["83","NULL","83","NULL","83","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL + MAX ( col1 ) * - 25 col2, 20 * CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT DISTINCT ( 69 ) / COUNT ( * ) - - 41 / - CAST ( + - COUNT ( * ) AS INTEGER ) FROM tab1

Expected: ["36"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab1 AS cor1 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```

#### ☓ Ran 10012 tests as sqlite

* 1465 failed
* 85% was OK

Time: 22896ms

---- ---- ---- ---- ---- ---- ----
### 299/622 [`./test/random/aggregates/slt_good_47.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_47.test)

_Mimic sqlite_

```sql
SELECT ALL - col2 + - 75 AS col0, + 42 * - col1 AS col0 FROM tab1 cor0

Expected: ["-134","-210","-143","-1974","-171","-588"] but got ["-1974","-1974","-210","-210","-588","-588"]
```


```sql
SELECT * FROM tab1 WHERE NOT - CAST ( NULL AS INTEGER ) * + + col2 + + + col2 * 61 * + + col0 - - + col0 / + col1 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + ( - + CAST ( NULL AS INTEGER ) ) AS col1 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT MAX ( + CAST ( NULL AS INTEGER ) ) + - 90 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-90"]
```


```sql
SELECT DISTINCT col1 * + - col2 AS col2, 75 AS col2, + ( - + CAST ( - - col1 AS INTEGER ) ) AS col2 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + CAST ( + + SUM ( DISTINCT col0 ) AS INTEGER ) + + 75 AS col1 FROM tab2

g is not defined
```


```sql
SELECT ALL ( - 54 ) AS col0, 63 * + COUNT ( * ) / CAST ( + COUNT ( * ) AS INTEGER ) * - COUNT ( * ) FROM tab0 cor0

Expected: ["-54","-189"] but got ["-54","NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col0, + col0 * - col2 * col1 + - col0 / + CAST ( NULL AS REAL ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ), - CAST ( NULL AS REAL ) FROM tab2 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 LEFT JOIN tab0 AS cor1 ON NULL > NULL, tab2 AS cor2

Parse error on line 1:
... cor1 ON NULL > NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab2 AS cor1 WHERE NOT + 77 IS NULL

18 results returned but expected 54
```


```sql
SELECT col0 AS col1, + ( - col2 ) / + + ( + ( CAST ( NULL AS INTEGER ) ) ) + - 3 AS col1 FROM tab1

Expected: ["51","NULL","85","NULL","91","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT col1 / - CAST ( NULL AS INTEGER ) AS col2, 42 / col1 AS col1 FROM tab0

Expected: ["NULL","0","NULL","2","NULL","42"] but got ["NULL","0.519","NULL","2","NULL","42"]
```


```sql
SELECT DISTINCT col1 AS col2, - 87 * CAST ( NULL AS REAL ) AS col2 FROM tab2

Expected: ["51","NULL","67","NULL","77","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1481 failed
* 85% was OK

Time: 23501ms

---- ---- ---- ---- ---- ---- ----
### 300/622 [`./test/random/aggregates/slt_good_48.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_48.test)

_Mimic sqlite_

```sql
SELECT col2 / - col1 + col0 AS col1 FROM tab1 cor0

Expected: ["45","74","90"] but got ["44.143","73.200","89.553"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * - - col2 AS col2 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL * FROM tab1 WHERE NOT - CAST ( 14 AS INTEGER ) IN ( - - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT + SUM ( - + col1 ) FROM tab2 AS cor0 WHERE NULL IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + CAST ( - COUNT ( * ) AS INTEGER ), - CAST ( NULL AS INTEGER ) col2 FROM tab2

g is not defined
```


```sql
SELECT ALL 10 AS col0, - col2 * - - col1 * + - 85 AS col0, - col0 + - 51 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab2 cor1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL MIN ( DISTINCT + CAST ( NULL AS INTEGER ) ) AS col0, - AVG ( DISTINCT ( + col1 ) ) AS col0 FROM tab0 WHERE NOT - - col0 NOT BETWEEN 4 * 53 / + col1 - - col2 AND - col2

Expected: ["NULL","NULL"] but got ["-34.333"]
```


```sql
SELECT SUM ( ALL + - col0 ) AS col0, 79 + + - MAX ( ( 58 ) ) FROM tab0 AS cor0 WHERE NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT + COUNT ( * ) AS col2, + CAST ( NULL AS REAL ) AS col1 FROM tab0 WHERE NOT - col0 BETWEEN - col2 / - col0 AND - col1 + + col0

Expected: ["3","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1386 failed
* 86% was OK

Time: 22202ms

---- ---- ---- ---- ---- ---- ----
### 301/622 [`./test/random/aggregates/slt_good_49.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_49.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + COUNT ( col2 ) + + COUNT ( * ) FROM tab0 cor0 WHERE NOT - col0 - - col2 BETWEEN + 54 AND NULL

Expected: ["6"] but got ["0"]
```


```sql
SELECT DISTINCT 91 FROM tab1 WHERE NOT col2 BETWEEN col2 + + 49 * + col0 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + COUNT ( * ) FROM tab2 cor0

Expected: ["NULL"] but got ["3"]
```


```sql
SELECT ALL + 28 * ( - + 91 ) * + 68 * + - CAST ( NULL AS INTEGER ) + 23 * + + ( + col1 ) + + 26 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["1199","1567","1797"]
```


```sql
SELECT DISTINCT CAST ( + COUNT ( * ) AS INTEGER ) / + 49 FROM tab0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 INNER JOIN tab0 AS cor1 ON ( NULL IS NULL )

18 results returned but expected 54
```


```sql
SELECT + ( - + 36 ) / 98 FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - 68 - + CAST ( NULL AS REAL ) AS col2, - CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) AS col1, - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + + col1 * + + col2 + + 60 + CAST ( NULL AS INTEGER ), col1 / 83 * + - 27 * - 57 + - - 3 - - col1 + + 80 - - col1 * CAST ( NULL AS INTEGER ) * + - col1 FROM tab1 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["1404","356.590","3256","1001.482","355","180.711"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS REAL ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT - COUNT ( - + 79 ) / - SUM ( ALL + ( + col0 ) ) AS col0 FROM tab2 AS cor0 WHERE NOT + CAST ( 76 AS INTEGER ) IN ( - col1 )

Expected: ["0"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1420 failed
* 85% was OK

Time: 28487ms

---- ---- ---- ---- ---- ---- ----
### 302/622 [`./test/random/aggregates/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_5.test)

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
SELECT - CAST ( AVG ( + col0 ) AS INTEGER ) FROM tab0 AS cor0

g is not defined
```


```sql
SELECT col0 * - + 59 * - - col1 col1, col0 * - col2 * 90 AS col2, ( - col1 ) AS col2 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col0 FROM tab2 AS cor0 WHERE NOT + 68 * - CAST ( col1 AS REAL ) - + 57 * - col1 IN ( + - 48, col2, + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - 75 * COUNT ( * ) col0, - CAST ( NULL AS INTEGER ) * - MIN ( CAST ( NULL AS REAL ) ) AS col0 FROM tab0

Expected: ["-225","NULL"] but got ["NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 LEFT JOIN tab1 AS cor1 ON NOT NULL IS NOT NULL, tab1 AS cor2

Parse error on line 1:
...NOT NULL IS NOT NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + + MAX ( col2 ) FROM tab0 AS cor0 WHERE NOT 38 BETWEEN NULL AND + col1

Expected: ["99"] but got ["NULL"]
```


```sql
SELECT + 44 + - col1 * - CAST ( NULL AS REAL ) AS col1, CAST ( NULL AS INTEGER ) * + 61 * - 71 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 cor0 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT - col2 col2, 83 + + col2 + - + 68 * + + CAST ( NULL AS REAL ) * + col0 * - col0 AS col2 FROM tab0 AS cor0

Expected: ["-10","NULL","-47","NULL","-99","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1498 failed
* 85% was OK

Time: 22777ms

---- ---- ---- ---- ---- ---- ----
### 303/622 [`./test/random/aggregates/slt_good_50.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_50.test)

_Mimic sqlite_

```sql
SELECT - + CAST ( + MAX ( ALL 60 ) AS INTEGER ) AS col0 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT DISTINCT - col1 / col0 / + col0 + - 60 AS col2 FROM tab1 AS cor0

Expected: ["-60"] but got ["-60.001","-60.005","-60.006"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) + - col1 - - - 97 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["-148","-164","-174"]
```


```sql
SELECT * FROM tab0 WHERE NOT + ( - 13 ) * 8 BETWEEN ( + + ( - - col1 ) ) AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + AVG ( col1 ) col1 FROM tab2 WHERE NOT ( NULL ) NOT BETWEEN NULL AND ( + 28 )

Expected: ["NULL"] but got ["65"]
```


```sql
SELECT ALL * FROM tab2 cor0 CROSS JOIN tab0 AS cor1 WHERE NOT + ( + 6 ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL 32 + - col0 AS col0, - 83 + col1 + - CAST ( NULL AS REAL ) AS col0 FROM tab2 AS cor0

Expected: ["-14","NULL","-32","NULL","-43","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL COUNT ( * ) / + CAST ( + - COUNT ( * ) AS INTEGER ) AS col2 FROM tab1

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - CAST ( 13 AS INTEGER ), + CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-13","0","-13","0","-13","0"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 JOIN tab2 AS cor1 ON NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + - SUM ( DISTINCT col0 ) col2, - CAST ( NULL AS REAL ) + - + CAST ( NULL AS INTEGER ) FROM tab2 WHERE NULL BETWEEN - 54 AND NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - MAX ( CAST ( NULL AS INTEGER ) ) AS col0, - CAST ( NULL AS INTEGER ) * - 46 FROM tab1

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1407 failed
* 85% was OK

Time: 23256ms

---- ---- ---- ---- ---- ---- ----
### 304/622 [`./test/random/aggregates/slt_good_51.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_51.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 16 + - + col2 * - CAST ( NULL AS INTEGER ) + - col0 / + col1 col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["14.881","15.098","15.169"]
```


```sql
SELECT - - CAST ( NULL AS INTEGER ) * + - 42 col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + - COUNT ( + col2 ) col0 FROM tab2 AS cor0 WHERE NOT - CAST ( NULL AS INTEGER ) * - + col0 < - col2

Expected: ["0"] but got ["-3"]
```


```sql
SELECT - ( - CAST ( - COUNT ( * ) AS INTEGER ) ) FROM tab0

g is not defined
```


```sql
SELECT * FROM tab0, tab0 AS cor0 WHERE NOT + 87 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT ( + 55 ) IS NULL

18 results returned but expected 54
```


```sql
SELECT * FROM tab1 WHERE NOT ( col2 ) IN ( col2 * col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT + MIN ( ALL + col1 ) FROM tab1 AS cor0 WHERE NOT col1 * + col1 / + + CAST ( - col0 AS REAL ) BETWEEN + 64 AND - + CAST ( NULL AS INTEGER )

Expected: ["5"] but got ["NULL"]
```


```sql
SELECT DISTINCT - + col1 / - + 40 - - CAST ( NULL AS INTEGER ) / + 96 AS col2, - CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0.025","0","0.525","0","2.025","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), - CAST ( NULL AS REAL ) + + col0 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT - MAX ( + + CAST ( - 73 AS INTEGER ) ) col1, - 84 * - MAX ( DISTINCT + CAST ( NULL AS REAL ) ) col2, 5 FROM tab0 cor0

Expected: ["73","NULL","5"] but got ["5","73","NULL"]
```


```sql
SELECT + CAST ( NULL AS REAL ) AS col0, 85 / + col1 AS col1 FROM tab1 cor0

Expected: ["NULL","1","NULL","17","NULL","6"] but got ["NULL","1.809","NULL","17","NULL","6.071"]
```


```sql
SELECT DISTINCT 58 AS col2, col1 * - CAST ( NULL AS REAL ) AS col2 FROM tab1 AS cor0

Expected: ["58","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT - col0 - - col2 + + CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL"] but got ["-17","-23","-24"]
```


```sql
SELECT 46 - + 33 + - col1 AS col1, - col1 / - + CAST ( NULL AS INTEGER ) + col2 / + col2 AS col1 FROM tab0

Expected: ["-68","NULL","-8","NULL","12","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1467 failed
* 85% was OK

Time: 23335ms

---- ---- ---- ---- ---- ---- ----
### 305/622 [`./test/random/aggregates/slt_good_52.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_52.test)

_Mimic sqlite_

```sql
SELECT ALL 77 * - + 18 * + COUNT ( * ) - + COUNT ( * ) * - 9 AS col0, COUNT ( * ) * 67 - 21 / - MAX ( - 35 ) col1 FROM tab1

Expected: ["-4131","201"] but got ["-4131","200.400"]
```


```sql
SELECT DISTINCT - 71 + col1 AS col0 FROM tab0 WHERE NOT - col1 BETWEEN - - 6 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + col0 * + - CAST ( - 3 AS REAL ) + - + col2 + - + CAST ( NULL AS INTEGER ) * - col1 AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-2","192","251"]
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT 54 + + + MAX ( CAST ( NULL AS INTEGER ) ) col2 FROM tab0

Expected: ["NULL"] but got ["54"]
```


```sql
SELECT ALL CAST ( - MIN ( + 36 ) AS INTEGER ) FROM tab0 AS cor0

g is not defined
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT ( NULL IS NOT NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + COUNT ( * ) + MIN ( ALL + col2 ) FROM tab1 WHERE NOT + 61 IN ( 4 - 58 )

Expected: ["62"] but got ["NULL"]
```


```sql
SELECT - 80 + + MAX ( DISTINCT col0 ) AS col0, COUNT ( * ) + + + CAST ( NULL AS REAL ) col0 FROM tab0 AS cor0

Expected: ["17","NULL"] but got ["NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - col2 AS col1, col1 + - ( + CAST ( NULL AS INTEGER ) ) + col0 * + + ( + col1 ) col1 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["2397","2397","5005","5005","5092","5092"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col0, + CAST ( NULL AS INTEGER ) col0 FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ), - 94 + + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-94"]
```


```sql
SELECT - col0 - CAST ( NULL AS REAL ) + 26 * col1 col2, - col0 / col1 * 40 * + + 9 FROM tab0

Expected: ["NULL","-1440","NULL","-34920","NULL","0"] but got ["NULL","-1491.429","NULL","-34920","NULL","-66.667"]
```

#### ☓ Ran 10012 tests as sqlite

* 1369 failed
* 86% was OK

Time: 21990ms

---- ---- ---- ---- ---- ---- ----
### 306/622 [`./test/random/aggregates/slt_good_53.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_53.test)

_Mimic sqlite_

```sql
SELECT ALL + col2 AS col0, - col2 AS col0 FROM tab0 AS cor0

Expected: ["10","-10","47","-47","99","-99"] but got ["-10","-10","-47","-47","-99","-99"]
```


```sql
SELECT DISTINCT - CAST ( - COUNT ( * ) AS INTEGER ) FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

g is not defined
```


```sql
SELECT + CAST ( NULL AS INTEGER ), col2 FROM tab2

Expected: ["NULL","23","NULL","40","NULL","58"] but got ["0","23","0","40","0","58"]
```


```sql
SELECT ALL * FROM tab2 WHERE NOT col2 * + col2 NOT BETWEEN + ( + - col2 ) - + + col1 AND 19 + col1 + + 50 * + 12

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + - col2 col2 FROM tab1 cor0

Expected: ["NULL"] but got ["-59","-68","-96"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE ( NULL ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - + 66 * + CAST ( NULL AS REAL ) * + 99, + COUNT ( * ) AS col0 FROM tab2 AS cor0 WHERE NULL NOT BETWEEN col0 + col1 * - col0 AND NULL

Expected: ["NULL","0"] but got ["NULL","3"]
```


```sql
SELECT + ( - COUNT ( * ) ) AS col1, 44 / - + CAST ( - COUNT ( * ) AS INTEGER ) FROM tab2

Expected: ["-3","14"] but got ["-3","NULL"]
```


```sql
SELECT DISTINCT col1 + + col0 + - CAST ( NULL AS REAL ) * + col0 / + col1 - col0 / + + 32 + - - col1 / - col0, - CAST ( NULL AS INTEGER ) + + col2 + + - 44 + col2 / - col2 / + CAST ( col1 AS INTEGER ) AS col2 FROM tab1

Expected: ["NULL","NULL"] but got ["NULL","-23","NULL","10","NULL","38"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE 60 * 8 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT col0 / ( + 41 ) col1, CAST ( NULL AS REAL ) * - - col1 * + - col2 / + col0 AS col1 FROM tab1 AS cor0

Expected: ["1","NULL","2","NULL","2","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col1, - ( CAST ( NULL AS INTEGER ) ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1499 failed
* 85% was OK

Time: 27121ms

---- ---- ---- ---- ---- ---- ----
### 307/622 [`./test/random/aggregates/slt_good_54.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_54.test)

_Mimic sqlite_

```sql
SELECT MAX ( ALL - + col2 ) * CAST ( AVG ( DISTINCT - col2 ) AS INTEGER ) FROM tab0 cor0

Expected: ["520"] but got ["0"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) col1 FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - - 30 * + - COUNT ( * ) - + + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["-90"]
```


```sql
SELECT ALL - col2 + + CAST ( NULL AS INTEGER ) / + + 21 * + + col1 AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-10","-47","-99"]
```


```sql
SELECT col0, + col0 * + col1 / + - CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM tab1 WHERE NOT + col2 * CAST ( col2 AS INTEGER ) IN ( - 43 + 9 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - CAST ( + - SUM ( + - col0 ) AS INTEGER ) AS col1 FROM tab1

g is not defined
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0 WHERE NOT + 45 IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + col2 / + col0 + ( - col2 ) + + 2 AS col0, - CAST ( NULL AS REAL ) * col2 AS col1 FROM tab1 AS cor0

Expected: ["-57","NULL","-66","NULL","-93","NULL"] but got ["-56.306","NULL","-65.253","NULL","-92.118","NULL"]
```


```sql
SELECT - MAX ( ALL - col1 ), 52 * + - MAX ( DISTINCT + 28 ) / 11 * COUNT ( * ) - - SUM ( col0 ) col0 FROM tab1 AS cor0 WHERE NOT NULL NOT BETWEEN NULL AND NULL

Expected: ["NULL","NULL"] but got ["5","-170.091"]
```


```sql
SELECT - COUNT ( 43 ) / - CAST ( COUNT ( * ) AS INTEGER ) FROM tab1

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ), - col0 * CAST ( NULL AS INTEGER ) * 60 + - 96 FROM tab2

Expected: ["NULL","NULL"] but got ["NULL","-96"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col1, CAST ( NULL AS INTEGER ) * 67 AS col1 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1460 failed
* 85% was OK

Time: 30570ms

---- ---- ---- ---- ---- ---- ----
### 308/622 [`./test/random/aggregates/slt_good_55.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_55.test)

_Mimic sqlite_

```sql
SELECT - CAST ( + + col2 AS INTEGER ) + 68 / + + 67 FROM tab1 AS cor0

Expected: ["-58","-67","-95"] but got ["-57.985","-66.985","-94.985"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * - 67 AS col2 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT ( NOT NULL IS NULL )

18 results returned but expected 54
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT CAST ( NULL AS INTEGER ) * + - 77 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL 62 * - col0 + - CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["-2852","-3968","-4650"]
```


```sql
SELECT ALL ( CAST ( + + COUNT ( * ) AS INTEGER ) ) AS col1 FROM tab0

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM ( tab0 AS cor0 CROSS JOIN tab0 AS cor1 )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) - + 96, - CAST ( NULL AS INTEGER ) FROM tab1 cor0

Expected: ["NULL","NULL"] but got ["-96","0"]
```


```sql
SELECT + 70 - + MIN ( - col0 ) FROM tab0 AS cor0 WHERE NOT col0 IN ( ( col1 ) * 1 )

Expected: ["167"] but got ["NULL"]
```


```sql
SELECT - + col1 col1, - CAST ( NULL AS REAL ) * - 84 AS col1 FROM tab0 cor0

Expected: ["-1","NULL","-21","NULL","-81","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT + col1 / - col2, + col0 FROM tab2

Expected: ["-1","64","-1","75","-2","46"] but got ["-1.155","75","-1.925","64","-2.217","46"]
```

#### ☓ Ran 10012 tests as sqlite

* 1417 failed
* 85% was OK

Time: 24883ms

---- ---- ---- ---- ---- ---- ----
### 309/622 [`./test/random/aggregates/slt_good_56.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_56.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - MIN ( CAST ( NULL AS INTEGER ) ) FROM ( tab0 AS cor0 CROSS JOIN tab2 AS cor1 )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + col2 AS col1, 40 * - + col1 col1 FROM tab0 AS cor0

Expected: ["10","-840","47","-3240","99","-40"] but got ["-3240","-3240","-40","-40","-840","-840"]
```


```sql
SELECT ALL - 67 + - CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-67","-67","-67"]
```


```sql
SELECT + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - - col1 * col0 + + ( + - 44 ) AS col0 FROM tab2 WHERE - CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ), + col0 / + 14 AS col0 FROM tab2

Expected: ["NULL","3","NULL","4","NULL","5"] but got ["NULL","3.286","NULL","4.571","NULL","5.357"]
```


```sql
SELECT DISTINCT + + COUNT ( * ) / CAST ( - + COUNT ( * ) AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( COUNT ( DISTINCT 43 ) AS INTEGER ) FROM tab2 WHERE NOT 61 NOT IN ( CAST ( NULL AS INTEGER ) )

g is not defined
```


```sql
SELECT DISTINCT * FROM ( tab2 AS cor0 CROSS JOIN tab2 AS cor1 ) WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL - col2 col0, col0 + - col1 * + ( + col2 ) + col1 * - + col1 * - CAST ( NULL AS REAL ) * col0 AS col0 FROM tab2 cor0

Expected: ["-23","NULL","-40","NULL","-58","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT - COUNT ( * ) + + - ( + 12 ) / + CAST ( NULL AS INTEGER ) col0, COUNT ( DISTINCT - - col2 ) / 35 FROM tab1

Expected: ["NULL","0"] but got ["NULL","0.086"]
```

#### ☓ Ran 10012 tests as sqlite

* 1427 failed
* 85% was OK

Time: 20970ms

---- ---- ---- ---- ---- ---- ----
### 310/622 [`./test/random/aggregates/slt_good_57.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_57.test)

_Mimic sqlite_

```sql
SELECT ALL col1 / + 82 + + 32 AS col1 FROM tab2 AS cor0

Expected: ["32","32","32"] but got ["32.622","32.817","32.939"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) + - COUNT ( * ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["-3"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) - col2 AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-10","-47","-99"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT - CAST ( NULL AS INTEGER ) * + 42 - - - 23 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - 13 - + CAST ( MAX ( + + 31 ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT ALL SUM ( + + col1 ) AS col2, ( 2 ) + MIN ( ALL + col1 ) AS col0 FROM tab2 AS cor0 WHERE NULL <= NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL MIN ( + col2 ) AS col1 FROM tab1 cor0 WHERE NOT ( - col1 ) IN ( + col2 * ( ( col1 ) ) )

Expected: ["59"] but got ["NULL"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 WHERE NOT 61 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / - 72 AS col1, CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0 WHERE NULL IS NOT NULL OR NOT ( NULL ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL - 97 - + + 20 / - - COUNT ( * ) / CAST ( NULL AS REAL ) AS col1, 44 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1

Expected: ["NULL","44"] but got ["44","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1444 failed
* 85% was OK

Time: 22012ms

---- ---- ---- ---- ---- ---- ----
### 311/622 [`./test/random/aggregates/slt_good_58.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_58.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col0, 12 FROM tab1 AS cor0

Expected: ["NULL","12"] but got ["0","12"]
```


```sql
SELECT DISTINCT + - COUNT ( * ) * - COUNT ( * ) + + - ( + + CAST ( + - 62 AS INTEGER ) ) FROM tab0 WHERE NULL NOT BETWEEN 79 + - col1 AND NULL

Expected: ["62"] but got ["71"]
```


```sql
SELECT 90 / col1 + col0 + - CAST ( NULL AS INTEGER ) + col1 * 11 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["198","322.286","907.111"]
```


```sql
SELECT DISTINCT 86 AS col0, col1 + + + 34 AS col2, col2 AS col0 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + CAST ( AVG ( + 82 ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col0 IS NOT NULL OR NOT + col1 IN ( - col1 / - col0, + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL col0 AS col0, col1 + - CAST ( NULL AS REAL ) AS col0 FROM tab2

Expected: ["46","NULL","64","NULL","75","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT 26 IS NULL

18 results returned but expected 54
```


```sql
SELECT - MAX ( ALL col1 ) FROM tab1 WHERE NOT ( 7 ) + col2 IN ( col2 )

Expected: ["-47"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col2, + CAST ( + - CAST ( NULL AS INTEGER ) AS INTEGER ) col1 FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) AS col0, - CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + COUNT ( * ) AS col1, + MIN ( ALL col0 ) AS col1 FROM tab0 cor0 WHERE ( NULL ) IS NOT NULL

Expected: ["0","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1378 failed
* 86% was OK

Time: 26204ms

---- ---- ---- ---- ---- ---- ----
### 312/622 [`./test/random/aggregates/slt_good_59.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_59.test)

_Mimic sqlite_

```sql
SELECT ALL - 15 * CAST ( + + COUNT ( * ) AS INTEGER ) AS col2 FROM tab2

g is not defined
```


```sql
SELECT ALL col2 / 22 / + col1 * + col0 col2 FROM tab1

Expected: ["0","0","0"] but got ["0.001","0.006","0.006"]
```


```sql
SELECT DISTINCT col2 + - - 93 + CAST ( NULL AS INTEGER ) + + - 14 FROM tab0 WHERE + col2 IS NOT NULL

Expected: ["NULL"] but got ["126","178","89"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - - col0 + + col1 col2 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["138","65","90"]
```


```sql
SELECT CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) * 39 * + 80 AS col0 FROM ( tab1 AS cor0 CROSS JOIN tab2 AS cor1 )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT ( NOT col1 NOT IN ( 59, + col0 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT - SUM ( + 7 ) AS col2, + CAST ( NULL AS REAL ) AS col2 FROM tab1

Expected: ["-21","NULL"] but got ["NULL"]
```


```sql
SELECT - SUM ( - + col1 ) + + COUNT ( - col0 ) / - + CAST ( - AVG ( DISTINCT - ( + + col1 ) ) AS INTEGER ) AS col1 FROM tab2

Expected: ["195"] but got ["NULL"]
```


```sql
SELECT ALL - + ( ( col1 ) ) / - col2 AS col2, CAST ( NULL AS REAL ) + + col1 AS col0 FROM tab0 AS cor0

Expected: ["0","NULL","1","NULL","2","NULL"] but got ["0.010","NULL","1.723","NULL","2.100","NULL"]
```


```sql
SELECT DISTINCT - + 71 / - - col0 AS col2, 78 + - - CAST ( NULL AS INTEGER ) * - col0 FROM tab0 AS cor0

Expected: ["-4","NULL","0","NULL"] but got ["-0.732","78","-0.816","78","-4.733","78"]
```


```sql
SELECT ALL + CAST ( NULL AS REAL ), - COUNT ( * ) + - + MIN ( CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) ) FROM tab1

Expected: ["NULL","NULL"] but got ["NULL","-3"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT - 27 > 76

18 results returned but expected 54
```


```sql
SELECT ALL * FROM tab1 cor0 JOIN tab0 cor1 ON NOT + + 44 IS NULL, tab2 AS cor2

Parse error on line 1:
...N NOT + + 44 IS NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1390 failed
* 86% was OK

Time: 24281ms

---- ---- ---- ---- ---- ---- ----
### 313/622 [`./test/random/aggregates/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_6.test)

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
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 WHERE + 33 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT ( - 38 ) / + col2 AS col0, col2 * - + CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["-3","NULL","0","NULL"] but got ["-0.384","0","-0.809","0","-3.800","0"]
```


```sql
SELECT - MAX ( DISTINCT - col2 ) / + 99 AS col2, CAST ( NULL AS REAL ) FROM tab2

Expected: ["0","NULL"] but got ["0.232","NULL"]
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

* 1524 failed
* 84% was OK

Time: 20061ms

---- ---- ---- ---- ---- ---- ----
### 314/622 [`./test/random/aggregates/slt_good_60.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_60.test)

_Mimic sqlite_

```sql
SELECT ALL - COUNT ( * ) / - 90 AS col1 FROM tab2 AS cor0

Expected: ["0"] but got ["0.033"]
```


```sql
SELECT - - CAST ( NULL AS INTEGER ), + col1 AS col0 FROM tab2 AS cor0

Expected: ["NULL","51","NULL","67","NULL","77"] but got ["0","51","0","67","0","77"]
```


```sql
SELECT + col0 * - col1 + + 99, col2 AS col1, + 40 / - col1 + 44 AS col1 FROM tab0 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + MIN ( - CAST ( NULL AS INTEGER ) ) FROM tab0 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - + 30 * + CAST ( - COUNT ( * ) AS INTEGER ) col1 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT * FROM tab1 cor0 WHERE NOT 99 + - 46 BETWEEN NULL AND + 30

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + 90 AS col0, - 56 / + CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["90","NULL","90","NULL","90","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) AS col0, SUM ( DISTINCT + 4 ) FROM tab1 WHERE ( 36 + col0 * + 27 ) > NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + COUNT ( * ) AS col0, COUNT ( * ) * ( + + 55 ) * + - COUNT ( * ) - - MIN ( - 19 ) / - 66 - - + 26 AS col0 FROM tab1 AS cor0 WHERE + col1 BETWEEN + + 53 * - 30 AND NULL

Expected: ["0","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col1, + col1 * - ( + + ( + - CAST ( NULL AS INTEGER ) ) ) AS col2 FROM tab0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + CAST ( + col2 AS INTEGER ) AS col2, CAST ( NULL AS REAL ) AS col2 FROM tab2 AS cor0

Expected: ["23","NULL","40","NULL","58","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + col0 * - col0 + + + col2 / + col2 * - CAST ( NULL AS REAL ), - 5 * - + col1 * + 1 * + col0 + - col2 * + 88 * - - col1 + - CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","-328941","NULL","-8227","NULL","-9345"]
```


```sql
SELECT ALL + col2 / col0 AS col2, - 82 * - CAST ( NULL AS REAL ) * col1 AS col1 FROM tab2

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["0.500","NULL","0.625","NULL","0.773","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1478 failed
* 85% was OK

Time: 19503ms

---- ---- ---- ---- ---- ---- ----
### 315/622 [`./test/random/aggregates/slt_good_61.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_61.test)

_Mimic sqlite_

```sql
SELECT + + col2 / col0 - + - 24 + - - col2 FROM tab1 AS cor0

Expected: ["121","83","92"] but got ["121.882","83.694","92.747"]
```


```sql
SELECT ALL col2 - + col0 + CAST ( NULL AS INTEGER ) * + + ( col2 ) + 79 * - 80 * - - col0 AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-549917","-613038","-94768"]
```


```sql
SELECT CAST ( COUNT ( * ) AS INTEGER ) * + 58 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab2 AS cor1 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 WHERE NOT + 34 * CAST ( NULL AS INTEGER ) + - col2 * col2 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT MIN ( CAST ( NULL AS INTEGER ) ) + - COUNT ( * ) * 86 FROM tab2

Expected: ["NULL"] but got ["-258"]
```


```sql
SELECT ALL COUNT ( * ) / - CAST ( - COUNT ( * ) AS INTEGER ) AS col2 FROM tab0

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ), col2 * - 24 - + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-1128","0","-2376","0","-240"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 LEFT JOIN tab2 AS cor1 ON NOT + 73 IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL - col1 * col2 AS col1, col1 + + col0 + + CAST ( NULL AS REAL ) AS col1 FROM tab0

Expected: ["-210","NULL","-3807","NULL","-99","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL - 30 / col0 AS col2, + CAST ( NULL AS REAL ) FROM tab2 AS cor0

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["-0.400","NULL","-0.469","NULL","-0.652","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1412 failed
* 85% was OK

Time: 19244ms

---- ---- ---- ---- ---- ---- ----
### 316/622 [`./test/random/aggregates/slt_good_62.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_62.test)

_Mimic sqlite_

```sql
SELECT ALL - COUNT ( * ) col0, 81 FROM tab0

Expected: ["-3","81"] but got ["81","-3"]
```


```sql
SELECT + CAST ( MIN ( - col0 ) AS INTEGER ) AS col0 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT + 87 + CAST ( + CAST ( NULL AS INTEGER ) AS REAL ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["87","87","87"]
```


```sql
SELECT + COUNT ( 1 ) * ( - COUNT ( ALL + - col2 ) ) AS col2, - MIN ( + CAST ( NULL AS INTEGER ) ) - MIN ( DISTINCT + ( + ( - col2 ) ) ) FROM tab1 cor0

Expected: ["-9","NULL"] but got ["-9","96"]
```


```sql
SELECT ALL * FROM tab1 WHERE NOT 73 + 91 IN ( + ( 52 ) )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col1 FROM tab1, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + col0 - - + 21 + - - CAST ( NULL AS INTEGER ), 95 / - col1 / - CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["106","0","112","0","72","0"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab0 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + COUNT ( * ) / - ( 75 ) * - 51 AS col0, + MAX ( CAST ( NULL AS REAL ) ) AS col1 FROM tab0

Expected: ["0","NULL"] but got ["0.001","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) AS col1, - col0 * CAST ( NULL AS INTEGER ) * + col1 FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + MAX ( col2 ) AS col2 FROM tab2 AS cor0 WHERE NOT + col2 IN ( + + col1 )

Expected: ["58"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) * - - col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT col0 AS col1, col1 AS col1 FROM tab1

Expected: ["51","14","85","5","91","47"] but got ["14","14","47","47","5","5"]
```

#### ☓ Ran 10012 tests as sqlite

* 1376 failed
* 86% was OK

Time: 19533ms

---- ---- ---- ---- ---- ---- ----
### 317/622 [`./test/random/aggregates/slt_good_63.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_63.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col1 AS col1, - col1 * CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["51","NULL","67","NULL","77","NULL"] but got ["51","0","67","0","77","0"]
```


```sql
SELECT - + col1 col0, col2 col0 FROM tab0 AS cor0

Expected: ["-1","99","-21","10","-81","47"] but got ["10","10","47","47","99","99"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col1, + SUM ( ALL 18 ) FROM tab2

Expected: ["NULL","54"] but got ["0","54"]
```


```sql
SELECT + 66 / 36 AS col2 FROM tab2 AS cor0 CROSS JOIN tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT - col0 IN ( col2 * ( + ( + 85 ) ) )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 cor1 WHERE NOT 58 IS NULL

18 results returned but expected 54
```


```sql
SELECT + MIN ( ALL + 66 ) AS col1, 77 FROM tab0 AS cor0 WHERE NOT NULL NOT BETWEEN - 27 AND + col1 + + col0

Expected: ["NULL","77"] but got ["77","NULL"]
```


```sql
SELECT DISTINCT CAST ( COUNT ( * ) AS INTEGER ) - - 51 FROM tab0

g is not defined
```


```sql
SELECT DISTINCT CAST ( - ( + - ( - 25 ) ) AS INTEGER ) / CAST ( + - col2 AS INTEGER ) col1, + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["0","NULL","1","NULL"] but got ["0.431","0","0.625","0","1.087","0"]
```


```sql
SELECT CAST ( + ( + CAST ( NULL AS INTEGER ) ) AS INTEGER ) AS col1, ( MIN ( ALL + col2 ) ) * - - 43 / CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT * FROM tab1 AS cor0 LEFT JOIN tab2 cor1 ON NULL IS NULL, tab1 AS cor2

Parse error on line 1:
...cor1 ON NULL IS NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL + CAST ( - 8 AS INTEGER ) / - + CAST ( - COUNT ( * ) AS INTEGER ) + + + ( - - MIN ( ALL col0 ) ) AS col0 FROM tab1 AS cor0

Expected: ["49"] but got ["NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), - col1 + - CAST ( NULL AS INTEGER ) FROM tab1 WHERE NOT NULL IS NOT NULL

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-14","0","-47","0","-5"]
```

#### ☓ Ran 10012 tests as sqlite

* 1355 failed
* 86% was OK

Time: 18729ms

---- ---- ---- ---- ---- ---- ----
### 318/622 [`./test/random/aggregates/slt_good_64.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_64.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 19 / 18 AS col0 FROM tab1

Expected: ["1"] but got ["1.056"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) / - 93 + 37 * 6 AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["222","222","222"]
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT 3 IN ( + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT ( - CAST ( NULL AS INTEGER ) ) FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + CAST ( - COUNT ( 26 ) AS INTEGER ) FROM tab2

g is not defined
```


```sql
SELECT ALL * FROM tab2, tab0 AS cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) AS col2 FROM tab0 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT + 65 * + MAX ( ALL + col2 * col1 ) AS col1 FROM tab0 WHERE ( NOT - col2 BETWEEN ( + 57 / 60 + col0 ) AND NULL )

Expected: ["247455"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0 WHERE NOT + 53 IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + - 42 + 73 AS col2, - CAST ( NULL AS REAL ) AS col2 FROM tab2 AS cor0

Expected: ["31","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL * FROM tab0 AS cor0 INNER JOIN tab1 AS cor1 ON NULL <> NULL, tab1 AS cor2

Parse error on line 1:
...cor1 ON NULL <> NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT 82 AS col2, + 40 + col1 + + + ( col2 ) / + + 44 * - col0 * CAST ( NULL AS INTEGER ) AS col2 FROM tab2

Expected: ["82","NULL","82","NULL","82","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ( - CAST ( NULL AS INTEGER ) ), CAST ( NULL AS INTEGER ) - MAX ( ALL + 37 ) AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["0","-37"]
```

#### ☓ Ran 10012 tests as sqlite

* 1439 failed
* 85% was OK

Time: 18800ms

---- ---- ---- ---- ---- ---- ----
### 319/622 [`./test/random/aggregates/slt_good_65.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_65.test)

_Mimic sqlite_

```sql
SELECT - ( - col2 ) / 73 FROM tab0 AS cor0

Expected: ["0","0","1"] but got ["0.137","0.644","1.356"]
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * - COUNT ( * ) / + 60 / COUNT ( * ) AS col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) col0 FROM tab1, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - col0 * + col1 + col2 AS col1 FROM tab0 AS cor0 WHERE ( col0 ) * - col0 + - 61 + + - CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + - 96 * - + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - CAST ( + SUM ( - col1 ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) AS col1, - col0 + - 75 / col2 / + col0 AS col0 FROM tab0 AS cor0

Expected: ["NULL","-15","NULL","-87","NULL","-97"] but got ["NULL","-15.106","NULL","-87.086","NULL","-97.008"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 WHERE 50 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT + - CAST ( NULL AS INTEGER ) AS col0, SUM ( - 14 ) col1 FROM tab0 WHERE col1 IS NULL

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT - MAX ( + 18 ) / - CAST ( MAX ( - + col0 ) AS INTEGER ) FROM tab0

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) + col1 AS col1, CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["51","0","67","0","77","0"]
```


```sql
SELECT COUNT ( * ) col1 FROM tab1 AS cor0 JOIN tab0 AS cor1 ON NOT NULL IS NULL, tab0 AS cor2

Parse error on line 1:
... ON NOT NULL IS NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1431 failed
* 85% was OK

Time: 19005ms

---- ---- ---- ---- ---- ---- ----
### 320/622 [`./test/random/aggregates/slt_good_66.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_66.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - COUNT ( ALL - col2 ) AS col0 FROM tab0 AS cor0 WHERE NOT col2 / - col1 NOT IN ( CAST ( - + col1 AS INTEGER ) )

Expected: ["0"] but got ["-3"]
```


```sql
SELECT + CAST ( - COUNT ( + col2 ) AS INTEGER ) FROM tab1 AS cor0

g is not defined
```


```sql
SELECT ALL - col1 - CAST ( NULL AS INTEGER ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-51","-67","-77"]
```


```sql
SELECT * FROM tab1 AS cor0 WHERE NOT 66 + ( col2 ) + - ( - 62 ) * col0 BETWEEN - col2 AND - + col1

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + 24 * COUNT ( * ) + + MAX ( DISTINCT - - col1 ) + - COUNT ( * ) + CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL"] but got ["116"]
```


```sql
SELECT ALL + col2 * - ( + col1 ) AS col2, + col1 AS col2, - col2 + - - 78 - + col1 * - - 64 col2 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 60 + ( - col0 ) / + + col2 col2, col2 / + col1 / col1 - CAST ( NULL AS REAL ) FROM tab2

Expected: ["58","NULL","59","NULL","59","NULL"] but got ["58.400","NULL","58.707","NULL","58","NULL"]
```


```sql
SELECT DISTINCT col0 / - 40, + col2 * + - CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["-1","NULL","-2","NULL"] but got ["-1.275","0","-2.125","0","-2.275","0"]
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab1 cor1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL MAX ( + + 21 ) * - 5 FROM tab1 WHERE NOT + col1 / - 50 IN ( col2 )

Expected: ["-105"] but got ["NULL"]
```


```sql
SELECT col2 AS col1, CAST ( NULL AS REAL ) col1 FROM tab1

Expected: ["59","NULL","68","NULL","96","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT + MAX ( 5 ) col1, - SUM ( DISTINCT - 43 ) + ( COUNT ( * ) ) AS col2 FROM tab0 cor0 WHERE NOT ( col1 ) IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1409 failed
* 85% was OK

Time: 18933ms

---- ---- ---- ---- ---- ---- ----
### 321/622 [`./test/random/aggregates/slt_good_67.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_67.test)

_Mimic sqlite_

```sql
SELECT + CAST ( NULL AS INTEGER ) AS col2, + col0 * - ( 81 ) FROM tab0

Expected: ["NULL","-1215","NULL","-7047","NULL","-7857"] but got ["0","-1215","0","-7047","0","-7857"]
```


```sql
SELECT 8 * + + COUNT ( * ) / + MIN ( + - ( - - col2 ) ) AS col0 FROM tab1

Expected: ["0"] but got ["-0.250"]
```


```sql
SELECT + 96 + COUNT ( * ) * + CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL"] but got ["96"]
```


```sql
SELECT ALL * FROM tab2 WHERE NOT ( 77 ) IN ( col1 + + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - MIN ( + 6 ) FROM tab1 WHERE NOT col0 * + - col1 + + 15 + - - 60 BETWEEN - + 74 * - col1 AND + col1

Expected: ["-6"] but got ["NULL"]
```


```sql
SELECT CAST ( + COUNT ( * ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT - col1, + CAST ( 46 AS INTEGER ) AS col1, - col1 AS col1 FROM tab0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT 71 * - 81 AS col1, CAST ( NULL AS REAL ) + + 85 - col2 - - col1 * col2 AS col1 FROM tab2

Expected: ["-5751","NULL","-5751","NULL","-5751","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE ( NOT NULL IS NOT NULL )

18 results returned but expected 54
```


```sql
SELECT - - 69 + + + col1 - - CAST ( NULL AS REAL ), - col2 - CAST ( NULL AS INTEGER ) / ( - - col0 ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","-59","NULL","-68","NULL","-96"]
```

#### ☓ Ran 10012 tests as sqlite

* 1483 failed
* 85% was OK

Time: 19130ms

---- ---- ---- ---- ---- ---- ----
### 322/622 [`./test/random/aggregates/slt_good_68.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_68.test)

_Mimic sqlite_

```sql
SELECT ALL - COUNT ( * ) * + COUNT ( * ), - 62 / 56 AS col0 FROM tab1

Expected: ["-9","-1"] but got ["-9","-1.107"]
```


```sql
SELECT DISTINCT + 52 * + - AVG ( DISTINCT + CAST ( NULL AS INTEGER ) ) + AVG ( - col1 ) FROM tab0

Expected: ["NULL"] but got ["-34.333"]
```


```sql
SELECT ALL - CAST ( MIN ( - col0 ) AS INTEGER ) + - 43 FROM tab2 WHERE NOT - col0 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + col0 * col0 + CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["225","7569","9409"]
```


```sql
SELECT CAST ( + - COUNT ( * ) AS INTEGER ) * - - 37 FROM tab1

g is not defined
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0 cor1 WHERE NOT ( NULL ) IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - col0 * 14 * - col2 / + col2 + col0 + col1 * + col2 * - col1 + + 26 * - - CAST ( NULL AS INTEGER ) AS col2, col2 AS col2, + - 73 * - - 41 AS col2 FROM tab1 AS cor0

3 results returned but expected 9
```


```sql
SELECT - CAST ( NULL AS REAL ) * - - col1, - 47 / col2 AS col1 FROM tab2

Expected: ["NULL","-1","NULL","-2","NULL","0"] but got ["NULL","-0.810","NULL","-1.175","NULL","-2.043"]
```


```sql
SELECT + MAX ( ALL - ( - col0 ) ) FROM tab2 AS cor0 WHERE NOT ( col2 ) BETWEEN 68 AND NULL

Expected: ["75"] but got ["NULL"]
```


```sql
SELECT ALL - 96 / + col1 + CAST ( NULL AS REAL ) AS col2, - CAST ( NULL AS INTEGER ) AS col2 FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) * ( + COUNT ( * ) ) col1 FROM tab0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + col1 + + + col1 AS col0, + col1 / + ( col0 ) * + 1 * + CAST ( NULL AS INTEGER ) - + col0 col0 FROM tab1

Expected: ["10","NULL","28","NULL","94","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1420 failed
* 85% was OK

Time: 18974ms

---- ---- ---- ---- ---- ---- ----
### 323/622 [`./test/random/aggregates/slt_good_69.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_69.test)

_Mimic sqlite_

```sql
SELECT + CAST ( - col0 AS INTEGER ) FROM tab1 AS cor0 WHERE NOT ( col0 + col1 * col1 ) BETWEEN NULL AND - col1 * ( + 84 )

Query was expected to return results (but did not) 
```


```sql
SELECT - COUNT ( * ) * 53 AS col0 FROM tab0 WHERE NOT - 33 NOT BETWEEN col2 + col0 AND col2

Expected: ["0"] but got ["-159"]
```


```sql
SELECT COUNT ( * ) * - CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL 71 + 71 AS col1, - CAST ( - + AVG ( col2 ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT col0 - - 44 * + CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["51","85","91"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1 WHERE - 26 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - MAX ( DISTINCT - ( col1 ) ) AS col0 FROM tab2 AS cor0 WHERE NOT col1 + + - 90 IN ( + col2 )

Expected: ["51"] but got ["NULL"]
```


```sql
SELECT DISTINCT + 78 * + CAST ( NULL AS INTEGER ), + ( CAST ( NULL AS INTEGER ) ) FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1388 failed
* 86% was OK

Time: 19482ms

---- ---- ---- ---- ---- ---- ----
### 324/622 [`./test/random/aggregates/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_7.test)

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
SELECT + MIN ( ALL + + col0 ) * COUNT ( DISTINCT - + col2 ) FROM tab1 WHERE NOT - + CAST ( NULL AS REAL ) IS NOT NULL

Expected: ["153"] but got ["NULL"]
```


```sql
SELECT - 34 + + COUNT ( * ) * 2 - - COUNT ( * ) AS col1, MAX ( + 82 ) AS col1 FROM tab1 AS cor0 WHERE NOT NULL BETWEEN ( NULL ) AND NULL

Expected: ["-34","NULL"] but got ["NULL"]
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

* 1506 failed
* 84% was OK

Time: 19053ms

---- ---- ---- ---- ---- ---- ----
### 325/622 [`./test/random/aggregates/slt_good_70.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_70.test)

_Mimic sqlite_

```sql
SELECT ALL CAST ( - AVG ( 48 ) AS INTEGER ) AS col1 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT + SUM ( - + col2 ) AS col2 FROM tab1 WHERE NOT + col0 * - 96 + + - CAST ( NULL AS INTEGER ) + - 49 IS NULL

Expected: ["NULL"] but got ["-223"]
```


```sql
SELECT + + COUNT ( CAST ( + col2 AS INTEGER ) ) AS col0, + 53 + - 77 AS col0 FROM tab0 AS cor0

Expected: ["3","-24"] but got ["-24"]
```


```sql
SELECT DISTINCT col2 AS col1, + CAST ( NULL AS INTEGER ) * - col1 FROM tab2 AS cor0

Expected: ["23","NULL","40","NULL","58","NULL"] but got ["23","0","40","0","58","0"]
```


```sql
SELECT DISTINCT + col2 + col2 / - - col1 AS col1, + col1 * - 94 AS col2, + + col2 col0 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 JOIN tab1 AS cor1 ON + - ( + CAST ( NULL AS INTEGER ) ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + SUM ( - col0 ) / - CAST ( + COUNT ( * ) AS INTEGER ) AS col0 FROM tab1

Expected: ["75"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0 WHERE - 83 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col0, - CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + - CAST ( - CAST ( NULL AS REAL ) AS INTEGER ) col0, - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT - col0 * CAST ( NULL AS INTEGER ) + + + 16 + - + col2 + col0, - col1 * + + CAST ( NULL AS REAL ) + + col0 * col1 * - + col2 + + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["33","NULL","39","NULL","40","NULL"]
```


```sql
SELECT - - 29 AS col0, CAST ( NULL AS REAL ) AS col0 FROM tab0 WHERE 62 IS NOT NULL

Expected: ["29","NULL","29","NULL","29","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), AVG ( ALL - + col2 ) - AVG ( col2 ) + + AVG ( ALL col2 ) AS col0 FROM tab2 AS cor0 WHERE NULL = - 30

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1448 failed
* 85% was OK

Time: 19141ms

---- ---- ---- ---- ---- ---- ----
### 326/622 [`./test/random/aggregates/slt_good_71.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_71.test)

_Mimic sqlite_

```sql
SELECT ALL - 3 AS col1, - 71 + CAST ( NULL AS INTEGER ) col0 FROM tab2

Expected: ["-3","NULL","-3","NULL","-3","NULL"] but got ["-3","-71","-3","-71","-3","-71"]
```


```sql
SELECT 65 / - col0 FROM tab1 AS cor0

Expected: ["-1","0","0"] but got ["-0.714","-0.765","-1.275"]
```


```sql
SELECT + col2 + - col1 AS col0 FROM tab0 WHERE NOT + 96 + - col2 * + col2 BETWEEN NULL AND - 69

Query was expected to return results (but did not) 
```


```sql
SELECT ALL SUM ( DISTINCT + 48 ) AS col0 FROM tab1 AS cor0 WHERE NOT ( NOT ( NOT ( col0 ) >= NULL ) )

Expected: ["NULL"] but got ["48"]
```


```sql
SELECT + + 15 + 7 / - 41 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( ( - COUNT ( * ) ) AS INTEGER ) - - - 68 AS col0 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT MIN ( DISTINCT + col0 ) FROM tab2 AS cor0 WHERE NOT - col2 BETWEEN ( 86 + + 27 ) AND + col2 * - 52

Expected: ["46"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0 cor1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT CAST ( NULL AS INTEGER ) - + CAST ( - col2 AS INTEGER ) * col1 + + 36 * - + 70, + ( + 25 ) + col2 + + CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-2310","35","-2421","124","1287","72"]
```


```sql
SELECT - CAST ( NULL AS REAL ) AS col0, - 92 / col2 FROM tab0 cor0

Expected: ["NULL","-1","NULL","-9","NULL","0"] but got ["NULL","-0.929","NULL","-1.957","NULL","-9.200"]
```

#### ☓ Ran 10012 tests as sqlite

* 1426 failed
* 85% was OK

Time: 19073ms

---- ---- ---- ---- ---- ---- ----
### 327/622 [`./test/random/aggregates/slt_good_72.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_72.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0 cor0 CROSS JOIN tab2 AS cor1 WHERE - 3 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL MAX ( ALL + - 64 ) * CAST ( + + SUM ( ALL - 96 ) AS INTEGER ) AS col0 FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["18432"] but got ["0"]
```


```sql
SELECT - 84 * - - col1 + - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-1764","-6804","-84"]
```


```sql
SELECT DISTINCT + - 7 AS col1, + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["-7","NULL"] but got ["-7","0"]
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT + col2 IN ( - col0 - - 14 )

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( - COUNT ( 89 ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT ALL col1 * + - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT col0 < 64

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + MIN ( - 66 ) AS col2 FROM tab2 WHERE NOT 19 + + col2 IN ( col2, - 29 )

Expected: ["-66"] but got ["NULL"]
```


```sql
SELECT * FROM tab0 AS cor0 JOIN tab0 AS cor1 ON - 83 = NULL, tab1 AS cor2

Parse error on line 1:
... cor1 ON - 83 = NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab1 cor1 WHERE ( 8 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT ( + 30 ) AS col2, - CAST ( NULL AS REAL ) AS col2 FROM tab0 AS cor0

Expected: ["30","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1402 failed
* 85% was OK

Time: 21436ms

---- ---- ---- ---- ---- ---- ----
### 328/622 [`./test/random/aggregates/slt_good_73.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_73.test)

_Mimic sqlite_

```sql
SELECT ALL MAX ( ALL + - CAST ( NULL AS INTEGER ) ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - - col2 - - ( - col0 ) AS col0, + col0 * + col0 AS col0 FROM tab1 AS cor0

Expected: ["-23","8281","-26","7225","45","2601"] but got ["2601","2601","7225","7225","8281","8281"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE + 62 * + CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( NULL AS INTEGER ) / + - ( 69 ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + CAST ( MAX ( + col0 ) AS INTEGER ) FROM tab1 AS cor0

g is not defined
```


```sql
SELECT col0 col0, - col0 AS col2, col2 AS col0 FROM tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 45 + COUNT ( - col2 ) * MAX ( + ( - ( - col1 ) ) ) FROM tab0 AS cor0 WHERE NOT + col1 IN ( 59 )

Expected: ["288"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 WHERE NOT ( NULL ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) col0, CAST ( NULL AS INTEGER ) + col1 FROM tab1 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","14","0","47","0","5"]
```


```sql
SELECT + col0 + - - 58 AS col0, - col0 * CAST ( NULL AS REAL ) AS col0 FROM tab2 AS cor0

Expected: ["104","NULL","122","NULL","133","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT 10 col1, + MAX ( DISTINCT - col0 ) - CAST ( NULL AS REAL ) AS col1 FROM tab2 AS cor0

Expected: ["10","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + MAX ( ALL 34 ) - + CAST ( NULL AS INTEGER ), 65 - - COUNT ( * ) * - - COUNT ( 0 ) - - CAST ( NULL AS INTEGER ) * - + COUNT ( * ) * + AVG ( - - col2 ) + 0 FROM tab2 cor0 WHERE + 91 IS NOT NULL

Expected: ["NULL","NULL"] but got ["34","74"]
```


```sql
SELECT DISTINCT 25 * + - MIN ( ALL 70 ) AS col2, 93 + + SUM ( ALL col0 ) AS col1 FROM tab2 cor0 WHERE - 33 IS NULL

Expected: ["NULL","NULL"] but got ["NULL","93"]
```


```sql
SELECT - + ( 1 ) - + + col2 / + 11, col2 + col2 / - CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["-1","NULL","-10","NULL","-5","NULL"] but got ["-1.909","NULL","-10","NULL","-5.273","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1408 failed
* 85% was OK

Time: 20148ms

---- ---- ---- ---- ---- ---- ----
### 329/622 [`./test/random/aggregates/slt_good_74.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_74.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col2 / + + 55 FROM tab0

Expected: ["0","1"] but got ["0.182","0.855","1.800"]
```


```sql
SELECT col0 AS col2, 31 AS col2, 50 / - col2 * - col1 - + ( + 27 ) FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT col2 AS col0, CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["10","NULL","47","NULL","99","NULL"] but got ["10","0","47","0","99","0"]
```


```sql
SELECT DISTINCT + COUNT ( * ), + CAST ( NULL AS INTEGER ) * - + COUNT ( * ) AS col1 FROM tab0

Expected: ["3","NULL"] but got ["3","0"]
```


```sql
SELECT + CAST ( COUNT ( * ) AS INTEGER ) AS col0 FROM tab2

g is not defined
```


```sql
SELECT ALL col2 FROM tab0 AS cor0 WHERE NOT CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT MIN ( col0 ) AS col0 FROM tab1 AS cor0 WHERE NOT ( col1 ) IN ( - col0 - + ( + 32 ) * - col0 )

Expected: ["51"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab2 WHERE NOT ( + 5 ) IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - COUNT ( * ) AS col2, + CAST ( NULL AS REAL ) AS col2 FROM tab2, tab2 AS cor0

Expected: ["-9","NULL"] but got ["NULL"]
```


```sql
SELECT - CAST ( NULL AS REAL ), - ( + CAST ( NULL AS INTEGER ) ) - + 81 - - col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","-14","NULL","-30","NULL","-4"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) col0, 84 * AVG ( 61 ) FROM tab2 AS cor0 WHERE NULL BETWEEN col0 AND col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL col0 * 41 AS col1, - CAST ( NULL AS REAL ) / - - col1 + - + col0 + - col0 - - col0 col1 FROM tab0

Expected: ["3567","NULL","3977","NULL","615","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1368 failed
* 86% was OK

Time: 19571ms

---- ---- ---- ---- ---- ---- ----
### 330/622 [`./test/random/aggregates/slt_good_75.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_75.test)

_Mimic sqlite_

```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + + col1 * - col1 + col0 / + + col2 + + 47 + - col2 FROM tab0

Expected: ["NULL"] but got ["-395.300","-52.020","-6560.681"]
```


```sql
SELECT DISTINCT col2 - + + col2 + col2 / + col0 FROM tab0

Expected: ["0","1","3"] but got ["0.115","1.021","3.133"]
```


```sql
SELECT + + ( CAST ( NULL AS INTEGER ) ) FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT 75 + - CAST ( COUNT ( * ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT - 90 FROM tab1 AS cor0 WHERE NOT ( 75 ) * + col1 IN ( - 13 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM ( tab2 cor0 CROSS JOIN tab2 cor1 )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT + col0 AS col1, + CAST ( NULL AS REAL ) / + 54 * - 78 col1 FROM tab1 AS cor0

Expected: ["51","NULL","85","NULL","91","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - MIN ( ALL - col2 ) * - COUNT ( * ) FROM tab0 AS cor0 WHERE NOT + 33 BETWEEN 92 AND + col0

Expected: ["-297"] but got ["NULL"]
```


```sql
SELECT + - 88 col0, + 87 * + 68 col1, + MIN ( - col1 ) AS col1 FROM tab0 AS cor0 WHERE NULL BETWEEN NULL AND ( NULL )

Expected: ["-88","5916","NULL"] but got ["-88","NULL"]
```


```sql
SELECT col1 / + ( + + 81 ) AS col0, ( - - CAST ( NULL AS REAL ) ) + - + col1 AS col2 FROM tab1

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["0.062","NULL","0.173","NULL","0.580","NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), AVG ( + CAST ( NULL AS INTEGER ) ) / - ( + - 89 ) / 99 * + ( - 60 ) / - 22 AS col0 FROM tab2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) * + col1 col0, 98 / + col0 FROM tab2

Expected: ["NULL","1","NULL","2"] but got ["NULL","1.307","NULL","1.531","NULL","2.130"]
```

#### ☓ Ran 10012 tests as sqlite

* 1468 failed
* 85% was OK

Time: 18961ms

---- ---- ---- ---- ---- ---- ----
### 331/622 [`./test/random/aggregates/slt_good_76.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_76.test)

_Mimic sqlite_

```sql
SELECT ALL + ( col2 ) / - col0 AS col2 FROM tab0

Expected: ["-1","-3","0"] but got ["-0.115","-1.021","-3.133"]
```


```sql
SELECT ALL - col0 * 55 FROM tab1 WHERE NOT + CAST ( NULL AS INTEGER ) * col0 - col2 * 97 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( - COUNT ( * ) AS INTEGER ) AS col1 FROM tab0 cor0

g is not defined
```


```sql
SELECT DISTINCT ( - 33 ) + + 83 + ( - - CAST ( NULL AS INTEGER ) ) AS col0 FROM tab1 AS cor0

Expected: ["NULL"] but got ["50"]
```


```sql
SELECT - - ( + - CAST ( NULL AS INTEGER ) ) + + 73 AS col1 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["73","73","73"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab1 cor1 WHERE ( NOT + - 24 / + 7 IS NULL )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col1, CAST ( NULL AS INTEGER ) AS col1 FROM tab0 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT col1 AS col0, col0 * + col1 * CAST ( NULL AS REAL ) + + col1 AS col0 FROM tab0

Expected: ["1","NULL","21","NULL","81","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM tab0 WHERE - col1 <= col0 / - 72

6 results returned but expected 9
```


```sql
SELECT DISTINCT - ( + CAST ( NULL AS INTEGER ) ) col2, + CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT COUNT ( * ) + - + 10 + - 38 * MIN ( - + 42 ) FROM tab2 AS cor0 WHERE + col2 + + CAST ( NULL AS REAL ) IS NULL

Expected: ["1589"] but got ["NULL"]
```


```sql
SELECT ALL + COUNT ( * ) + + + CAST ( NULL AS REAL ) AS col1, 64 FROM tab0

Expected: ["NULL","64"] but got ["64","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1427 failed
* 85% was OK

Time: 19090ms

---- ---- ---- ---- ---- ---- ----
### 332/622 [`./test/random/aggregates/slt_good_77.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_77.test)

_Mimic sqlite_

```sql
SELECT + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) AS col2 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - 67 + + - col0 / col2 AS col1 FROM tab2

Expected: ["-68","-68","-69"] but got ["-68.293","-68.600","-69"]
```


```sql
SELECT DISTINCT + + SUM ( DISTINCT - col1 ) AS col0 FROM tab2 AS cor0 WHERE NOT NULL > col2

Expected: ["NULL"] but got ["-195"]
```


```sql
SELECT * FROM tab0 cor0 WHERE ( NOT - CAST ( NULL AS INTEGER ) IS NOT NULL )

Query was expected to return results (but did not) 
```


```sql
SELECT + + 60 + - + SUM ( + - col2 ), COUNT ( * ) * - + MIN ( 12 ) col1 FROM tab1 WHERE NOT NULL BETWEEN NULL AND - col1 / + col1

Expected: ["NULL","NULL"] but got ["60","NULL"]
```


```sql
SELECT ALL CAST ( + COUNT ( + col2 ) AS INTEGER ) FROM tab2

g is not defined
```


```sql
SELECT + col1, 12 AS col0, - + col0 / + 99 + + 93 + - col1 * col1 - 73 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 95 / - 68 + - 21 AS col0, MAX ( - - col2 ) FROM tab1 WHERE NOT ( NOT - col0 > + col0 )

Expected: ["-22","NULL"] but got ["-22.397","NULL"]
```


```sql
SELECT DISTINCT 92 AS col2, 93 + + col2 + + + 63 * - CAST ( NULL AS REAL ) AS col2 FROM tab2

Expected: ["92","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - SUM ( + + col0 ), AVG ( ALL 69 ) AS col2 FROM tab1 WHERE NOT + col2 NOT BETWEEN - - 97 * + ( col2 ) AND - - col1

Expected: ["NULL","NULL"] but got ["-227","69"]
```


```sql
SELECT ALL + MIN ( ALL - 85 ) AS col2 FROM tab0 AS cor0 WHERE NOT ( - col1 ) BETWEEN col0 AND ( 55 - + col1 * + col0 )

Expected: ["-85"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab2 cor1 WHERE NOT ( NULL IS NOT NULL )

18 results returned but expected 54
```


```sql
SELECT col1 AS col0, CAST ( NULL AS REAL ) + + 63 * 6 AS col0 FROM tab1

Expected: ["14","NULL","47","NULL","5","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1437 failed
* 85% was OK

Time: 19677ms

---- ---- ---- ---- ---- ---- ----
### 333/622 [`./test/random/aggregates/slt_good_78.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_78.test)

_Mimic sqlite_

```sql
SELECT ALL + - col1 / col2 AS col2 FROM tab0 AS cor0

Expected: ["-1","-2","0"] but got ["-0.010","-1.723","-2.100"]
```


```sql
SELECT - + col2 + - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-23","-40","-58"]
```


```sql
SELECT DISTINCT + col0 * - col0 - + CAST ( NULL AS INTEGER ) + 16 * 65 * - 91 col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["-101865","-102921","-97241"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1 WHERE - CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * - CAST ( - MIN ( + col1 ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT * FROM tab1, tab1 cor0 WHERE NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT col0, - 5, - + 33 AS col0 FROM tab0

3 results returned but expected 9
```


```sql
SELECT + + col2 col0, + col0 + - 79 / + 27 * + CAST ( + col0 AS INTEGER ) * + + CAST ( NULL AS INTEGER ) * + ( - 41 ) AS col0 FROM tab2 cor0

Expected: ["23","NULL","40","NULL","58","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ( + COUNT ( * ) ) / + CAST ( + ( - + SUM ( + + 89 ) ) AS INTEGER ) * + + ( 17 ) FROM tab2

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT ALL - SUM ( col0 ), + MAX ( DISTINCT - col1 ) AS col2 FROM tab2 AS cor0 WHERE - 47 IS NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT + 95 / + 20 AS col2, - col1 * - 63 - col0 * + - col2 / - CAST ( NULL AS INTEGER ) + + + ( - col0 ) * + col0 AS col1 FROM tab2 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["4","NULL"] but got ["4.750","NULL"]
```


```sql
SELECT DISTINCT col0 AS col0, - CAST ( NULL AS REAL ) AS col0 FROM tab1

Expected: ["51","NULL","85","NULL","91","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1539 failed
* 84% was OK

Time: 19278ms

---- ---- ---- ---- ---- ---- ----
### 334/622 [`./test/random/aggregates/slt_good_79.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_79.test)

_Mimic sqlite_

```sql
SELECT + + COUNT ( * ) / 14 FROM tab2 AS cor0 CROSS JOIN tab0 cor1

Expected: ["0"] but got ["0.643"]
```


```sql
SELECT 82 col0, col0 / - + CAST ( NULL AS INTEGER ) AS col0 FROM tab2 AS cor0

Expected: ["82","NULL","82","NULL","82","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) / - MAX ( - + col2 ) + 83 FROM tab1 AS cor0

Expected: ["NULL"] but got ["83"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - 98 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["-98","-98","-98"]
```


```sql
SELECT 29 AS col1, CAST ( + COUNT ( ALL ( - CAST ( NULL AS INTEGER ) ) ) AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT - col1 * col2 IN ( - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab1 AS cor0 LEFT JOIN tab2 AS cor1 ON NOT NULL IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) + col2 AS col1, col2 * CAST ( NULL AS INTEGER ) / - 65 * - - col1 * + + ( - col1 ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0 WHERE NOT + 9 IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col1, CAST ( NULL AS INTEGER ) + - + col0 AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["0","-46","0","-64","0","-75"]
```


```sql
SELECT - col1 + + ( CAST ( + CAST ( NULL AS REAL ) AS INTEGER ) ) AS col2, col2 / + CAST ( NULL AS INTEGER ) col1 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["-51","NULL","-67","NULL","-77","NULL"]
```


```sql
SELECT ALL COUNT ( * ) / + CAST ( + + SUM ( col1 ) AS INTEGER ) FROM tab2 AS cor0

Expected: ["0"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1405 failed
* 85% was OK

Time: 19133ms

---- ---- ---- ---- ---- ---- ----
### 335/622 [`./test/random/aggregates/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_8.test)

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
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 AS cor1 WHERE ( 36 ) IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - 47 AS col1 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + 30 + col0 col0, - CAST ( NULL AS REAL ) AS col0 FROM tab0 AS cor0

Expected: ["117","NULL","127","NULL","45","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
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

* 1503 failed
* 84% was OK

Time: 19101ms

---- ---- ---- ---- ---- ---- ----
### 336/622 [`./test/random/aggregates/slt_good_80.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_80.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - col0 + CAST ( NULL AS INTEGER ), + col2 FROM tab0 AS cor0

Expected: ["NULL","10","NULL","47","NULL","99"] but got ["-15","47","-87","10","-97","99"]
```


```sql
SELECT - col0 / + + 79 + + col0 FROM tab0 AS cor0

Expected: ["15","86","96"] but got ["14.810","85.899","95.772"]
```


```sql
SELECT DISTINCT - CAST ( + MAX ( - col1 ) AS INTEGER ) AS col2 FROM tab0 WHERE NOT NULL NOT BETWEEN col2 AND + + 40

g is not defined
```


```sql
SELECT * FROM tab1 AS cor0 JOIN tab0 AS cor1 ON - 73 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT MIN ( ALL - col2 ) AS col0 FROM tab1 WHERE NOT - 64 NOT IN ( 90 + 53 )

Expected: ["NULL"] but got ["-96"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 WHERE NOT + ( + col2 ) BETWEEN 90 AND ( + + CAST ( 85 AS REAL ) / - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + MIN ( ALL - col1 ) col1, + MIN ( col2 ) * ( - COUNT ( * ) ) AS col1 FROM tab2 AS cor0 WHERE - 44 + col2 * - CAST ( - 90 AS INTEGER ) IS NULL

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 INNER JOIN tab2 AS cor1 ON NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - MIN ( - CAST ( NULL AS INTEGER ) ) + + - 72 AS col0, COUNT ( * ) col2, CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","3","NULL"] but got ["-72","3","0"]
```


```sql
SELECT MIN ( ( col1 ) ) + - COUNT ( CAST ( col1 AS INTEGER ) ) FROM tab1 AS cor0 WHERE NOT - 68 * - col2 * + col0 IN ( - - col2 * + col2 + + + 73 )

Expected: ["2"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1422 failed
* 85% was OK

Time: 19024ms

---- ---- ---- ---- ---- ---- ----
### 337/622 [`./test/random/aggregates/slt_good_81.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_81.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - COUNT ( * ) AS col0 FROM tab2 AS cor0 WHERE NOT ( NULL ) <> ( NULL )

Expected: ["0"] but got ["-3"]
```


```sql
SELECT ALL 5 / - col0 + + - CAST ( NULL AS INTEGER ) + 22 * - col0 * col2 + 88 AS col1 FROM tab1 WHERE NOT + col2 <= + - col0 * 55

Expected: ["NULL","NULL","NULL"] but got ["-107624.098","-110242.059","-136048.055"]
```


```sql
SELECT DISTINCT + ( + col0 ) + + CAST ( + CAST ( NULL AS INTEGER ) AS REAL ) AS col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["46","64","75"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT 35 * + - ( - col2 ) BETWEEN - col0 - CAST ( NULL AS REAL ) + col1 * col2 AND ( col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - 44 * CAST ( + COUNT ( 89 ) AS INTEGER ) + + CAST ( NULL AS INTEGER ) FROM tab1

g is not defined
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT col0 * - ( - col0 ) BETWEEN ( + CAST ( col0 AS REAL ) ) + - col2 AND ( col2 )

6 results returned but expected 9
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) + + + 40 AS col0 FROM tab2 AS cor0 CROSS JOIN tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + MIN ( col2 ) AS col1 FROM tab0 AS cor0 WHERE NOT 57 / 57 IN ( + col1 )

Expected: ["10"] but got ["NULL"]
```


```sql
SELECT DISTINCT col0 * - + 77 * - + CAST ( NULL AS REAL ), + ( - + CAST ( NULL AS INTEGER ) ) AS col1 FROM tab2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT * FROM tab0 AS cor0 JOIN tab2 AS cor1 ON NULL NOT BETWEEN NULL AND NULL, tab2 AS cor2

Parse error on line 1:
...ETWEEN NULL AND NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + col1 / - - col0 + + + col2 FROM tab2 AS cor0 WHERE NOT - 12 + + CAST ( col1 AS INTEGER ) BETWEEN + col0 AND + col1

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - 7 + + CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-7","-7","-7"]
```


```sql
SELECT ALL + 27 + + col2 + - CAST ( NULL AS INTEGER ) + + col2 + - 47 * - - 95 / - col0 + - 73 AS col2, CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["103.766","0","129.533","0","97.065","0"]
```


```sql
SELECT ALL + MIN ( - col1 ) AS col1, - CAST ( NULL AS INTEGER ) * + 98 AS col2 FROM tab1 WHERE NOT NULL <= + - col1

Expected: ["NULL","NULL"] but got ["-47","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1447 failed
* 85% was OK

Time: 19167ms

---- ---- ---- ---- ---- ---- ----
### 338/622 [`./test/random/aggregates/slt_good_82.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_82.test)

_Mimic sqlite_

```sql
SELECT + AVG ( CAST ( NULL AS INTEGER ) ) FROM tab2 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL 55 / - MIN ( ALL - col0 ) col0 FROM tab1 AS cor0

Expected: ["0"] but got ["0.604"]
```


```sql
SELECT col0 AS col0, CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["46","NULL","64","NULL","75","NULL"] but got ["46","0","64","0","75","0"]
```


```sql
SELECT ALL CAST ( ( - + COUNT ( * ) ) AS INTEGER ) AS col1 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT ALL * FROM tab2 WHERE NOT - col0 + + 26 IN ( col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT + CAST ( NULL AS REAL ) AS col1, - col2 / + col0 FROM tab1 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["NULL","-1","NULL","0","NULL","0"] but got ["NULL","-0.694","NULL","-0.747","NULL","-1.882"]
```


```sql
SELECT col2, + CAST ( NULL AS INTEGER ), - + col0 AS col0 FROM tab2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * col2, CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT ALL - SUM ( DISTINCT - col2 ), MIN ( - + 65 ) / + + COUNT ( * ) * + ( - COUNT ( * ) ) AS col1 FROM tab1 WHERE NOT - 75 IS NOT NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT SUM ( DISTINCT col1 ) * MIN ( DISTINCT col2 - col1 ) AS col0 FROM tab1 WHERE CAST ( NULL AS INTEGER ) * col2 / - 59 + + col2 IS NULL

Expected: ["1386"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM ( tab0 cor0 CROSS JOIN tab0 cor1 ) WHERE NULL IS NULL

18 results returned but expected 54
```

#### ☓ Ran 10012 tests as sqlite

* 1483 failed
* 85% was OK

Time: 19067ms

---- ---- ---- ---- ---- ---- ----
### 339/622 [`./test/random/aggregates/slt_good_83.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_83.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - AVG ( ALL CAST ( NULL AS INTEGER ) ) AS col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + col2 * 31 / + - 6 AS col2 FROM tab2 cor0

Expected: ["-118","-206","-299"] but got ["-118.833","-206.667","-299.667"]
```


```sql
SELECT - - CAST ( NULL AS INTEGER ) AS col0, col1 FROM tab2 AS cor0

Expected: ["NULL","51","NULL","67","NULL","77"] but got ["0","51","0","67","0","77"]
```


```sql
SELECT DISTINCT 31 + - CAST ( + ( + COUNT ( * ) ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT ALL col0 col0 FROM tab2 cor0 WHERE NOT - 65 * - - 39 BETWEEN - 81 * - + col0 + + 77 AND + col2 * col1

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 WHERE - 46 NOT IN ( 9 )

18 results returned but expected 54
```


```sql
SELECT ALL * FROM tab1, tab1 AS cor0 WHERE NOT + 47 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col0 + - CAST ( NULL AS INTEGER ), CAST ( NULL AS REAL ) FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["15","NULL","87","NULL","97","NULL"]
```


```sql
SELECT + AVG ( + - col1 ) AS col0, - SUM ( DISTINCT 76 ) FROM tab0 WHERE 38 + - - col1 IS NULL AND NOT NULL IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT DISTINCT - MIN ( + 88 ) - - 85 AS col2, MAX ( - col2 ) AS col1 FROM tab2 AS cor0 WHERE NOT NULL = col2

Expected: ["NULL","NULL"] but got ["-3","-23"]
```


```sql
SELECT DISTINCT MAX ( ALL col1 ) col1 FROM tab1 WHERE NOT ( + col1 ) BETWEEN + col0 AND NULL

Expected: ["47"] but got ["NULL"]
```


```sql
SELECT DISTINCT col1 AS col0, + 0 + + CAST ( NULL AS REAL ) AS col0 FROM tab2

Expected: ["51","NULL","67","NULL","77","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - col0 + + CAST ( NULL AS REAL ), col0 / col1 AS col0 FROM tab2 cor0

Expected: ["NULL","0","NULL","1"] but got ["NULL","0.831","NULL","0.902","NULL","1.119"]
```

#### ☓ Ran 10012 tests as sqlite

* 1481 failed
* 85% was OK

Time: 19595ms

---- ---- ---- ---- ---- ---- ----
### 340/622 [`./test/random/aggregates/slt_good_84.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_84.test)

_Mimic sqlite_

```sql
SELECT ALL + CAST ( NULL AS INTEGER ) / - - ( - col2 ) + - + 74 AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-74","-74","-74"]
```


```sql
SELECT DISTINCT col0 AS col1, - col2 / + 74 AS col2 FROM tab1

Expected: ["51","-1","85","0","91","0"] but got ["51","-1.297","85","-0.797","91","-0.919"]
```


```sql
SELECT * FROM tab2 WHERE + col0 + CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) col1 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - 70 * - 14 + ( - + SUM ( - CAST ( NULL AS INTEGER ) ) ) AS col2 FROM tab1 WHERE col1 / + 6 IS NOT NULL

Expected: ["NULL"] but got ["980"]
```


```sql
SELECT - 79 * - + CAST ( NULL AS REAL ), 6 + + ( - col0 ) / + - col1 AS col0 FROM tab1

Expected: ["NULL","23","NULL","7","NULL","9"] but got ["NULL","23","NULL","7.936","NULL","9.643"]
```


```sql
SELECT + col1 AS col1, CAST ( NULL AS REAL ) AS col1 FROM tab2 cor0

Expected: ["51","NULL","67","NULL","77","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT + CAST ( MAX ( - ( + col2 ) ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT ( + 18 ) IS NULL

18 results returned but expected 54
```


```sql
SELECT COUNT ( * ) * + COUNT ( * ) / - - CAST ( + CAST ( + COUNT ( - col1 ) AS INTEGER ) AS INTEGER ) - - 54 FROM tab1

Expected: ["57"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) / col2 AS col1, col0 / - col1 FROM tab2

Expected: ["NULL","-1","NULL","0"] but got ["NULL","-0.831","NULL","-0.902","NULL","-1.119"]
```


```sql
SELECT - + SUM ( DISTINCT col0 ) AS col1, - AVG ( ALL 44 ) AS col1 FROM tab1 AS cor0 WHERE NOT - 1 / - ( - 11 ) IS NOT NULL

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT - - col2 / - - 62 AS col0, CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["0","NULL","1","NULL"] but got ["0.161","0","0.758","0","1.597","0"]
```


```sql
SELECT + COUNT ( * ) AS col2, + 86 + - CAST ( NULL AS REAL ) AS col2 FROM tab0

Expected: ["3","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1484 failed
* 85% was OK

Time: 18991ms

---- ---- ---- ---- ---- ---- ----
### 341/622 [`./test/random/aggregates/slt_good_85.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_85.test)

_Mimic sqlite_

```sql
SELECT ALL - + COUNT ( * ) - + CAST ( NULL AS INTEGER ) + + 57 AS col2 FROM tab2 cor0

Expected: ["NULL"] but got ["54"]
```


```sql
SELECT - 60 AS col0, COUNT ( - - 95 ) AS col0 FROM tab0

Expected: ["-60","3"] but got ["3"]
```


```sql
SELECT - 38 + + CAST ( NULL AS INTEGER ) * + CAST ( - col0 AS INTEGER ) AS col2 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["-38","-38","-38"]
```


```sql
SELECT + 90 * + CAST ( NULL AS INTEGER ) + - 11 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab2 WHERE NOT 39 IN ( col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL CAST ( COUNT ( * ) AS INTEGER ) col2 FROM tab0 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1 WHERE 11 + 15 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - col1 / col0 * - + 61 AS col2, 18 - + + ( - 68 ) * + CAST ( NULL AS INTEGER ) AS col1 FROM tab2

Expected: ["0","NULL","61","NULL"] but got ["54.493","18","67.630","18","73.391","18"]
```


```sql
SELECT - COUNT ( * ) / CAST ( - COUNT ( * ) AS INTEGER ) AS col0 FROM tab0

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT DISTINCT - MIN ( - 52 ) + - MAX ( 98 ) * MIN ( DISTINCT + CAST ( NULL AS REAL ) ) AS col1, COUNT ( * ) AS col0 FROM tab0 AS cor0 WHERE NOT col2 > NULL

Expected: ["NULL","0"] but got ["NULL","3"]
```

#### ☓ Ran 10012 tests as sqlite

* 1417 failed
* 85% was OK

Time: 18665ms

---- ---- ---- ---- ---- ---- ----
### 342/622 [`./test/random/aggregates/slt_good_86.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_86.test)

_Mimic sqlite_

```sql
SELECT 42 / col0 - col2 FROM tab0

Expected: ["-10","-45","-99"] but got ["-44.200","-9.517","-98.567"]
```


```sql
SELECT ALL col0 AS col2 FROM tab2 WHERE NOT ( CAST ( NULL AS INTEGER ) ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * col0 AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT MIN ( DISTINCT ( + CAST ( + CAST ( col0 AS REAL ) AS INTEGER ) ) ) * + 31 AS col1 FROM tab1 WHERE NOT col1 NOT BETWEEN ( - col1 ) AND NULL

Expected: ["NULL"] but got ["1581"]
```


```sql
SELECT - CAST ( + - COUNT ( * ) AS INTEGER ) AS col1 FROM tab1 cor0

g is not defined
```


```sql
SELECT ALL COUNT ( ALL - 33 ) / - 9 + CAST ( - MAX ( ALL + + col1 ) AS INTEGER ) FROM tab1

Expected: ["-47"] but got ["-0.333"]
```


```sql
SELECT ALL * FROM tab0 cor0 CROSS JOIN tab1 cor1 WHERE 70 IS NOT NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 cor0 CROSS JOIN tab2 AS cor1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT MIN ( DISTINCT col0 ) * - COUNT ( * ) FROM tab2 WHERE NOT ( + 64 + - col2 * + 67 ) IN ( col2 * ( 27 ) )

Expected: ["-138"] but got ["NULL"]
```


```sql
SELECT - MIN ( DISTINCT + - col1 ) AS col1, 8 FROM tab0 AS cor0 WHERE NULL <> NULL

Expected: ["NULL","8"] but got ["8","NULL"]
```


```sql
SELECT - SUM ( DISTINCT - col0 ) AS col2, MAX ( ALL - - col2 ) FROM tab0 WHERE NOT NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT CAST ( NULL AS REAL ), - 50 / + col1 AS col2 FROM tab2

Expected: ["NULL","0","NULL","0","NULL","0"] but got ["NULL","-0.649","NULL","-0.746","NULL","-0.980"]
```


```sql
SELECT ALL col1, 5 / - CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["14","NULL","47","NULL","5","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT ALL CAST ( + MAX ( col2 ) AS INTEGER ), 80 - COUNT ( * ) + - 75 + CAST ( NULL AS INTEGER ) + 15 AS col1 FROM tab1 AS cor0 WHERE NULL <= NULL

Expected: ["NULL","NULL"] but got ["0","20"]
```

#### ☓ Ran 10012 tests as sqlite

* 1392 failed
* 86% was OK

Time: 18780ms

---- ---- ---- ---- ---- ---- ----
### 343/622 [`./test/random/aggregates/slt_good_87.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_87.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - COUNT ( * ) * SUM ( ALL 48 ) / 60 col2 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Expected: ["-64"] but got ["-64.800"]
```


```sql
SELECT ALL 6 + + CAST ( NULL AS INTEGER ) AS col1 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["6","6","6"]
```


```sql
SELECT * FROM tab0 WHERE NOT - + col1 IN ( + col1 + col2 + - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT + - MIN ( ALL + col2 ) FROM tab1 AS cor0 WHERE NOT - 49 + + col1 NOT BETWEEN - 59 AND NULL

Expected: ["NULL"] but got ["-59"]
```


```sql
SELECT DISTINCT + 46 / + + col0 AS col2, 46 + + CAST ( NULL AS INTEGER ) AS col2 FROM tab2 AS cor0

Expected: ["0","NULL","1","NULL"] but got ["46","46"]
```


```sql
SELECT ALL CAST ( + MAX ( - 36 ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT ALL 81 AS col2, + col0 AS col1, col1 + - 51 + - 87 * - + col2 AS col1 FROM tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 cor1 WHERE NULL IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT - - CAST ( NULL AS REAL ) AS col2, SUM ( - ( + CAST ( NULL AS INTEGER ) ) ) + COUNT ( * ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL"] but got ["NULL","3"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS INTEGER ) - + + col2 * + - 74 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","3478","0","7326","0","740"]
```


```sql
SELECT + COUNT ( * ) / + - CAST ( + COUNT ( * ) AS INTEGER ) col1 FROM tab0 AS cor0

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT DISTINCT - + COUNT ( * ) AS col0, COUNT ( * ) * CAST ( NULL AS REAL ) FROM tab2 AS cor0 WHERE NULL <> - col1

Expected: ["0","NULL"] but got ["-3","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1475 failed
* 85% was OK

Time: 19291ms

---- ---- ---- ---- ---- ---- ----
### 344/622 [`./test/random/aggregates/slt_good_88.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_88.test)

_Mimic sqlite_

```sql
SELECT DISTINCT ( + col1 ) / + 70 AS col0 FROM tab2

Expected: ["0","1"] but got ["0.729","0.957","1.100"]
```


```sql
SELECT 95, COUNT ( * ) * + ( + - CAST ( NULL AS INTEGER ) ) * + MAX ( 21 ) + 4 * 97 AS col2 FROM tab0

Expected: ["95","NULL"] but got ["95","388"]
```


```sql
SELECT * FROM tab1 WHERE NOT col1 IN ( - col1 * col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT + - CAST ( COUNT ( * ) AS INTEGER ) AS col1 FROM tab1 AS cor0

g is not defined
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) / + col1, col2 FROM tab2 AS cor0

Expected: ["NULL","23","NULL","40","NULL","58"] but got ["0","23","0","40","0","58"]
```


```sql
SELECT - ( + 38 ) + + COUNT ( * ) / - + CAST ( + + COUNT ( * ) AS INTEGER ) AS col2 FROM tab2

Expected: ["-39"] but got ["NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) + COUNT ( * ) AS col0, 86 / MAX ( ALL - + col0 ) FROM tab1 AS cor0

Expected: ["NULL","-1"] but got ["NULL","-1.686"]
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab0 cor1 WHERE 8 <> - + 26 + 50

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab0 cor1 WHERE - 51 NOT IN ( + 92 )

18 results returned but expected 54
```


```sql
SELECT + 2 + CAST ( NULL AS INTEGER ), + MAX ( - col0 ) AS col0 FROM tab1

Expected: ["NULL","-51"] but got ["2","-51"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ), - ( + CAST ( NULL AS INTEGER ) ) col1 FROM tab2 AS cor0 WHERE NOT NULL IS NOT NULL

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT ALL SUM ( DISTINCT - col2 ) AS col0, CAST ( NULL AS INTEGER ) col2 FROM tab0 AS cor0 WHERE NOT + col1 IS NOT NULL AND NULL > ( NULL )

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1509 failed
* 84% was OK

Time: 18869ms

---- ---- ---- ---- ---- ---- ----
### 345/622 [`./test/random/aggregates/slt_good_89.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_89.test)

_Mimic sqlite_

```sql
SELECT + + col2 + 58 * - - col1 + + col0 - - col0 / - + 76 FROM tab2 AS cor0

Expected: ["3027","4019","4570"] but got ["3026.395","4018.013","4569.158"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + 80 + - + COUNT ( * ) + COUNT ( * ) + - - 0 * + 24 * ( + 20 ) AS col0 FROM tab0

Expected: ["NULL"] but got ["80"]
```


```sql
SELECT ALL - col0 - + col0 + - col0 + + - CAST ( - CAST ( NULL AS INTEGER ) AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-261","-291","-45"]
```


```sql
SELECT + 40 FROM tab1 WHERE NOT - ( + - col0 ) BETWEEN NULL AND - col0

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( + COUNT ( col2 ) AS INTEGER ) FROM tab2 AS cor0

g is not defined
```


```sql
SELECT 64 / - CAST ( - - MAX ( + col2 ) AS INTEGER ) - 81 * + - COUNT ( * ) FROM tab0

Expected: ["243"] but got ["NULL"]
```


```sql
SELECT ALL col1 * - CAST ( NULL AS INTEGER ) + - + 25 - 31 * + - col1 AS col2, col0 * - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["2486","0","6","0","626","0"]
```


```sql
SELECT - - 58 / - 94 AS col0 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col0, + COUNT ( * ) * CAST ( NULL AS INTEGER ) * - - MIN ( ALL + col0 ) FROM tab1 AS cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 cor1 WHERE ( NULL ) IS NULL

18 results returned but expected 54
```


```sql
SELECT 98 AS col1, + AVG ( DISTINCT 53 ) + - - COUNT ( * ) AS col1 FROM tab1 AS cor0 WHERE NOT ( NULL ) IS NULL

Expected: ["98","NULL"] but got ["NULL"]
```


```sql
SELECT - + col2 AS col1, + CAST ( NULL AS REAL ) + - + ( + - 74 ) + + 60 AS col1 FROM tab1 AS cor0

Expected: ["-59","NULL","-68","NULL","-96","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1477 failed
* 85% was OK

Time: 19266ms

---- ---- ---- ---- ---- ---- ----
### 346/622 [`./test/random/aggregates/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_9.test)

_Mimic sqlite_

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
SELECT + CAST ( NULL AS INTEGER ), - CAST ( NULL AS REAL ) col1 FROM tab0 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT ALL - 14 AS col2, 94 AS col2, col2 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL 63 AS col0, CAST ( NULL AS REAL ) AS col0 FROM tab2

Expected: ["63","NULL","63","NULL","63","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
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

* 1398 failed
* 86% was OK

Time: 18850ms

---- ---- ---- ---- ---- ---- ----
### 347/622 [`./test/random/aggregates/slt_good_90.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_90.test)

_Mimic sqlite_

```sql
SELECT - + 25 * - CAST ( NULL AS INTEGER ) * + COUNT ( * ) + - COUNT ( DISTINCT col1 ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["-3"]
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) + + col0 AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["15","87","97"]
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT 19 IN ( - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - col0 + + 34 + + col2 / col1 AS col2 FROM tab1

Expected: ["-11","-40","-56"] but got ["-10.143","-39.200","-55.553"]
```


```sql
SELECT ALL - CAST ( COUNT ( * ) AS INTEGER ) * CAST ( NULL AS INTEGER ) * - 32 FROM tab1

g is not defined
```


```sql
SELECT + 48 + + + CAST ( NULL AS INTEGER ) FROM tab0, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + COUNT ( * ) AS col0, - CAST ( NULL AS REAL ) AS col0 FROM tab2 AS cor0

Expected: ["3","NULL"] but got ["NULL"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col1, col2 / + CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT + MIN ( DISTINCT + col0 ) FROM tab2 AS cor0 WHERE NOT ( - col0 ) IN ( ( - col2 ) + col1 )

Expected: ["46"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 LEFT JOIN tab1 AS cor1 ON ( ( - CAST ( NULL AS REAL ) ) ) <= 0

6 results returned but expected 18
```


```sql
SELECT + 53 col0, - CAST ( NULL AS REAL ) AS col0 FROM tab1

Expected: ["53","NULL","53","NULL","53","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1526 failed
* 84% was OK

Time: 19544ms

---- ---- ---- ---- ---- ---- ----
### 348/622 [`./test/random/aggregates/slt_good_91.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_91.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - - col1 * - CAST ( NULL AS INTEGER ) * + - 93 - col0 * col1 AS col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-1215","-1827","-97"]
```


```sql
SELECT + + col0 / 71 col2 FROM tab0 cor0

Expected: ["0","1","1"] but got ["0.211","1.225","1.366"]
```


```sql
SELECT - 84 * - - col0 + - col0 + - - 33 - - - CAST ( NULL AS INTEGER ) - + col2 / + 72 AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-3877.319","-5407.556","-6342.806"]
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT col1 + - col2 / col0 IN ( col0, col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - 71, CAST ( NULL AS INTEGER ) * - + CAST ( + + COUNT ( * ) AS REAL ) AS col2 FROM tab2

g is not defined
```


```sql
SELECT * FROM tab2 cor0 CROSS JOIN tab1 AS cor1 WHERE NOT 1 IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - MIN ( - col2 ) AS col0, ( + AVG ( col2 ) ) AS col0 FROM tab2 AS cor0 WHERE NULL <> + col0

Expected: ["NULL","NULL"] but got ["40.333"]
```


```sql
SELECT MIN ( ALL + + CAST ( - col0 AS INTEGER ) ) FROM tab2 cor0 WHERE NOT + col1 BETWEEN NULL AND + 62

Expected: ["-75"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 cor0 CROSS JOIN tab2 AS cor1 WHERE + 57 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT - 92 AS col1, 26 * - + ( + MIN ( - 77 ) ) AS col1 FROM tab1 WHERE NOT - col0 IS NOT NULL

Expected: ["-92","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1493 failed
* 85% was OK

Time: 19094ms

---- ---- ---- ---- ---- ---- ----
### 349/622 [`./test/random/aggregates/slt_good_92.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_92.test)

_Mimic sqlite_

```sql
SELECT ( - col2 ) / 98 AS col0 FROM tab0 AS cor0

Expected: ["-1","0","0"] but got ["-0.102","-0.480","-1.010"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab0 cor1 WHERE ( NULL ) IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * COUNT ( * ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * - CAST ( NULL AS INTEGER ) AS col1 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL col0 AS col1 FROM tab0 AS cor0 WHERE NOT - ( - col1 ) * col0 IN ( - col1 * 73 + + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT CAST ( - COUNT ( * ) AS INTEGER ) / + 74 AS col1 FROM tab2 cor0

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - col1 AS col0, - col1 * col1 + col2 * CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-1","0","-441","0","-6561"]
```


```sql
SELECT + CAST ( NULL AS REAL ) AS col0, COUNT ( * ) * - CAST ( NULL AS INTEGER ) * + COUNT ( * ) FROM tab2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 JOIN tab1 AS cor1 ON ( NULL ) IS NULL

18 results returned but expected 54
```


```sql
SELECT - MIN ( + col0 ) AS col2 FROM tab2 AS cor0 WHERE NOT + col2 BETWEEN + col1 AND - 21

Expected: ["-46"] but got ["NULL"]
```


```sql
SELECT ALL - - CAST ( NULL AS INTEGER ), - SUM ( - 4 ) FROM tab2 AS cor0 WHERE + 88 NOT BETWEEN + - CAST ( NULL AS INTEGER ) AND NULL

Expected: ["NULL","NULL"] but got ["0","12"]
```


```sql
SELECT SUM ( - col0 ) + + AVG ( ALL - - 30 ) AS col0, 17 FROM tab1 AS cor0 WHERE ( NOT ( - col1 * + 45 * + col0 < + + 1 ) )

Expected: ["NULL","17"] but got ["17","NULL"]
```


```sql
SELECT CAST ( 46 AS INTEGER ) / col0 * + - col0, col1 + - col1 + CAST ( NULL AS REAL ) AS col1 FROM tab1 cor0

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["-46","NULL","-46","NULL","-46","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1457 failed
* 85% was OK

Time: 19030ms

---- ---- ---- ---- ---- ---- ----
### 350/622 [`./test/random/aggregates/slt_good_93.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_93.test)

_Mimic sqlite_

```sql
SELECT - CAST ( NULL AS INTEGER ) + - col2 AS col2, col0 * + + col0 + - + 22 / - col1 AS col2 FROM tab1 cor0

Expected: ["NULL","2602","NULL","7229","NULL","8281"] but got ["2602.571","2602.571","7229.400","7229.400","8281.468","8281.468"]
```


```sql
SELECT - - col0 / + + col1 + col0 * + 1 + ( - 50 ) AS col0 FROM tab0 cor0

Expected: ["-35","144","41"] but got ["-34.815","144","41.143"]
```


```sql
SELECT ALL MIN ( DISTINCT - + CAST ( NULL AS INTEGER ) ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1 cor1 WHERE 37 IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL col2 - 54 * - - col1 * - col2 AS col1 FROM tab2 AS cor0 WHERE NOT col1 IN ( - col2 + + 23, col0 * - col1, + 17 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( + - MAX ( - 99 ) AS INTEGER ) AS col2, - 92 FROM tab2 cor0

g is not defined
```


```sql
SELECT - + CAST ( NULL AS INTEGER ), + 76 AS col1 FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT CAST ( NULL AS REAL ) AS col1, COUNT ( * ) AS col0 FROM tab0 WHERE NOT NULL >= - col1 - + col0

Expected: ["NULL","0"] but got ["NULL","3"]
```


```sql
SELECT ALL + + MIN ( DISTINCT - - 14 ) AS col1, - SUM ( DISTINCT 74 ) col0 FROM tab2 AS cor0 WHERE NULL BETWEEN col0 AND NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) AS col2, - CAST ( NULL AS INTEGER ) * - COUNT ( * ) - COUNT ( ALL ( - - col2 ) ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL"] but got ["-3"]
```


```sql
SELECT DISTINCT + + MAX ( - + col0 ) AS col1 FROM tab2 WHERE NOT - ( + col1 ) BETWEEN + 48 - + ( + col1 ) + - 28 * + - col2 AND + col2

Expected: ["-46"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1467 failed
* 85% was OK

Time: 18913ms

---- ---- ---- ---- ---- ---- ----
### 351/622 [`./test/random/aggregates/slt_good_94.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_94.test)

_Mimic sqlite_

```sql
SELECT 75 / - 30 FROM tab2

Expected: ["-2","-2","-2"] but got ["-2.500","-2.500","-2.500"]
```


```sql
SELECT + COUNT ( * ) * - CAST ( NULL AS INTEGER ) * + COUNT ( * ) * + COUNT ( * ) AS col0 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + col2 FROM tab2 AS cor0 WHERE NOT - col2 BETWEEN + col2 AND - CAST ( + - 22 AS INTEGER )

Query was expected to return results (but did not) 
```


```sql
SELECT col1 AS col1, - col0 - - - 57 AS col2, + + CAST ( NULL AS INTEGER ) * - - col2 + - + col0 AS col1 FROM tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - col0 * - CAST ( NULL AS INTEGER ) - + 47 + + 37 AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-10","-10","-10"]
```


```sql
SELECT ALL 33 * - CAST ( - + COUNT ( * ) AS INTEGER ) - + - 33 FROM tab1

g is not defined
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1 WHERE NOT - 13 IS NULL

18 results returned but expected 54
```


```sql
SELECT ALL - + MIN ( + col2 ) FROM tab1 WHERE NOT + col1 BETWEEN + col1 * 81 + - - 97 AND - 92

Expected: ["-59"] but got ["NULL"]
```


```sql
SELECT - + col0 / + 20, CAST ( NULL AS REAL ) col1 FROM tab0 AS cor0

Expected: ["-4","NULL","-4","NULL","0","NULL"] but got ["-0.750","NULL","-4.350","NULL","-4.850","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) + - + ( col2 ) col1 FROM tab2 cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","-23","0","-40","0","-58"]
```


```sql
SELECT DISTINCT + MIN ( + 24 ) / - ( - CAST ( NULL AS INTEGER ) ) AS col1, 47 FROM tab0

Expected: ["NULL","47"] but got ["47","NULL"]
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) AS col1, CAST ( NULL AS REAL ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 JOIN tab1 AS cor1 ON NULL IS NOT NULL, tab2 AS cor2

Parse error on line 1:
... ON NULL IS NOT NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - COUNT ( * ) + MIN ( + col1 ) - - AVG ( col0 ) * + COUNT ( - col1 ) col0, - SUM ( + col1 ) col2 FROM tab1 AS cor0 WHERE - col1 <= NULL

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT DISTINCT - 42 / + + ( - col2 ) - 44, ( - CAST ( NULL AS INTEGER ) ) AS col2 FROM tab0 AS cor0

Expected: ["-40","NULL","-44","NULL"] but got ["-39.800","0","-43.106","0","-43.576","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1449 failed
* 85% was OK

Time: 18913ms

---- ---- ---- ---- ---- ---- ----
### 352/622 [`./test/random/aggregates/slt_good_95.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_95.test)

_Mimic sqlite_

```sql
SELECT - ( + - CAST ( NULL AS INTEGER ) ) * - col2 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + col0 / - + col1 + col2 * + + col1 * - + ( - ( - + ( col2 ) ) ) * 80 AS col0 FROM tab2 AS cor0

Expected: ["-18031041","-2158320","-9856000"] but got ["-18031041.119","-2158320.902","-9856000.831"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE NOT 56 * + + CAST ( NULL AS INTEGER ) IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( + ( COUNT ( * ) ) AS INTEGER ) FROM tab2

g is not defined
```


```sql
SELECT ( + 25 ) * + AVG ( ALL - col1 ) * - CAST ( NULL AS INTEGER ) / - 82 FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - 6 FROM ( tab1 AS cor0 CROSS JOIN tab0 AS cor1 )

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - SUM ( ALL - 29 ) AS col2, CAST ( NULL AS INTEGER ) FROM tab1 WHERE NOT + + 0 * CAST ( NULL AS INTEGER ) * - col2 * + col2 + - 27 <> NULL

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT 37 AS col2, - col2 * - + col0 + col0 / + CAST ( NULL AS INTEGER ) AS col2 FROM tab2

Expected: ["37","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 3 + + MAX ( DISTINCT - 62 ) AS col0 FROM tab2 WHERE NOT ( - col2 ) BETWEEN col1 * - 9 + + 93 AND - col1

Expected: ["-59"] but got ["NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 cor0 CROSS JOIN tab0 cor1 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT 70 AS col1, CAST ( NULL AS REAL ) AS col1 FROM tab0

Expected: ["70","NULL","70","NULL","70","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) / - + ( - col1 ) AS col2, + CAST ( NULL AS INTEGER ) AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT + CAST ( CAST ( NULL AS INTEGER ) AS INTEGER ) * - + col2 AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1444 failed
* 85% was OK

Time: 18950ms

---- ---- ---- ---- ---- ---- ----
### 353/622 [`./test/random/aggregates/slt_good_96.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_96.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( - MIN ( 74 ) AS INTEGER ) FROM tab0

g is not defined
```


```sql
SELECT col2 * - + CAST ( NULL AS INTEGER ) - + col1 AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-14","-47","-5"]
```


```sql
SELECT DISTINCT * FROM tab2 WHERE - + col2 * - CAST ( NULL AS INTEGER ) IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + COUNT ( * ) + 53 AS col0 FROM tab2 WHERE NOT ( + 25 ) BETWEEN col0 + + col1 * 80 AND + col2 AND NOT ( NULL ) IS NOT NULL

Expected: ["56"] but got ["53"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE - 88 IS NOT NULL

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ( 93 ) * + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + ( + col2 ) / - CAST ( NULL AS INTEGER ), 5 * + CAST ( NULL AS INTEGER ) AS col0 FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```


```sql
SELECT MIN ( col1 ) / CAST ( - + COUNT ( * ) AS INTEGER ) AS col2, - COUNT ( * ) FROM tab1

Expected: ["-1","-3"] but got ["NULL","-3"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0 WHERE NOT NULL IS NOT NULL

18 results returned but expected 54
```


```sql
SELECT ALL ( + + CAST ( NULL AS INTEGER ) ) AS col0, - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```


```sql
SELECT DISTINCT 16 / - COUNT ( ALL col2 ) AS col2, CAST ( NULL AS REAL ) FROM tab1

Expected: ["-5","NULL"] but got ["-5.333","NULL"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) AS col1 FROM tab1 cor0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + col1 * - col1 AS col0, ( - CAST ( NULL AS REAL ) ) AS col0 FROM tab0

Expected: ["-1","NULL","-441","NULL","-6561","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1423 failed
* 85% was OK

Time: 18651ms

---- ---- ---- ---- ---- ---- ----
### 354/622 [`./test/random/aggregates/slt_good_97.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_97.test)

_Mimic sqlite_

```sql
SELECT DISTINCT MAX ( DISTINCT - col0 ) AS col0, + COUNT ( * ) col0 FROM tab2

Expected: ["-46","3"] but got ["3"]
```


```sql
SELECT * FROM tab2 cor0 WHERE NOT 35 IN ( - - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * + col2 + - col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-23","-40","-58"]
```


```sql
SELECT ALL - CAST ( + COUNT ( * ) AS INTEGER ) AS col2 FROM tab2 AS cor0

g is not defined
```


```sql
SELECT DISTINCT * FROM ( tab1 AS cor0 CROSS JOIN tab1 cor1 )

18 results returned but expected 54
```


```sql
SELECT - - SUM ( - CAST ( NULL AS INTEGER ) ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - 64 col0, CAST ( NULL AS REAL ) * - + col1 AS col0 FROM tab2 AS cor0

Expected: ["-64","NULL","-64","NULL","-64","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0 cor1 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + SUM ( + 51 ) / - COUNT ( * ) + 37 + MIN ( + + 78 ) + - 31 - + - 82 / - - CAST ( MAX ( ALL + col0 ) AS INTEGER ) AS col2 FROM tab2 AS cor0

Expected: ["34"] but got ["NULL"]
```


```sql
SELECT col2 / - col1, CAST ( NULL AS REAL ) AS col2 FROM tab0

Expected: ["-99","NULL","0","NULL","0","NULL"] but got ["-0.476","NULL","-0.580","NULL","-99","NULL"]
```


```sql
SELECT - SUM ( ALL col0 ) - + - COUNT ( * ) AS col0, - 52 + + AVG ( - col0 ) AS col1 FROM tab2 AS cor0 WHERE ( NOT + 47 + + 58 * + - col0 * + + col2 * + 94 + + col1 + - col0 IS NOT NULL )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col1, 91 + - col0 + + + 24 * CAST ( NULL AS INTEGER ) * 61 + + col0 AS col0 FROM tab1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","91","0","91","0","91"]
```

#### ☓ Ran 10012 tests as sqlite

* 1500 failed
* 85% was OK

Time: 19073ms

---- ---- ---- ---- ---- ---- ----
### 355/622 [`./test/random/aggregates/slt_good_98.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_98.test)

_Mimic sqlite_

```sql
SELECT - CAST ( NULL AS INTEGER ) + - 75 * + COUNT ( * ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["-225"]
```


```sql
SELECT ALL 48 / + + col1 + - - col1 FROM tab2 AS cor0

Expected: ["51","67","77"] but got ["51.941","67.716","77.623"]
```


```sql
SELECT - 88 * - CAST ( NULL AS INTEGER ) - col2 + - - 97 * + + ( + col2 ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["5664","6528","9216"]
```


```sql
SELECT DISTINCT - - CAST ( + - COUNT ( * ) AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1

g is not defined
```


```sql
SELECT ALL * FROM tab2 WHERE NOT - - col2 BETWEEN - ( + + col0 ) AND - + col1

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + ( - + col2 ) / 27 AS col2, CAST ( NULL AS INTEGER ) * + col2 FROM tab1

Expected: ["-2","NULL","-3","NULL"] but got ["-2.185","0","-2.519","0","-3.556","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + - - 31 + - - 88 col0 FROM tab1 cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1 WHERE NOT 58 IS NULL

18 results returned but expected 54
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 INNER JOIN tab2 AS cor1 ON NOT NULL IS NOT NULL, tab2 AS cor2

Parse error on line 1:
...NOT NULL IS NOT NULL, tab2 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - 58 AS col0, AVG ( ALL + 42 ) col0 FROM tab2 AS cor0 WHERE - col2 = 66

Expected: ["-58","NULL"] but got ["NULL"]
```


```sql
SELECT ALL col0 / - col2 AS col0, CAST ( NULL AS REAL ) AS col0 FROM tab2

Expected: ["-1","NULL","-1","NULL","-2","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT + + COUNT ( * ) / + - CAST ( COUNT ( * ) AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT - - COUNT ( * ) * - - 52 + - SUM ( - + col0 ) * - + 77, MIN ( DISTINCT 44 ) AS col2 FROM tab2 AS cor0 WHERE - col2 IS NULL

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL - 36 / 57 AS col1, - CAST ( NULL AS REAL ) FROM tab1

Expected: ["0","NULL","0","NULL","0","NULL"] but got ["-0.632","NULL","-0.632","NULL","-0.632","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1484 failed
* 85% was OK

Time: 18871ms

---- ---- ---- ---- ---- ---- ----
### 356/622 [`./test/random/aggregates/slt_good_99.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_99.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - ( + 47 ) * + - COUNT ( * ) * - MAX ( + col1 ) + - CAST ( + MIN ( - col1 ) AS INTEGER ) + 75 AS col1 FROM tab1 AS cor0

Expected: ["-6505"] but got ["-6552"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * col2 * + + col1 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + + 98 / COUNT ( DISTINCT - - col0 ) AS col1, + CAST ( NULL AS INTEGER ) * 60 FROM tab1 AS cor0

Expected: ["32","NULL"] but got ["32.667","0"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab1 AS cor1 WHERE + ( + 4 ) < 66

18 results returned but expected 54
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT + 60 BETWEEN NULL AND + 3

Query was expected to return results (but did not) 
```


```sql
SELECT col0, col2 + - 81 + col1 AS col0, - + col2 AS col0 FROM tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - CAST ( - COUNT ( * ) AS INTEGER ) AS col0 FROM tab2

g is not defined
```


```sql
SELECT - AVG ( DISTINCT - - col1 ) AS col2, 4 FROM tab2 WHERE NULL BETWEEN NULL AND - col2 * 43

Expected: ["NULL","4"] but got ["4","NULL"]
```


```sql
SELECT DISTINCT + 9 * - CAST ( NULL AS INTEGER ) + - ( - col1 ) * + col1 AS col2, + CAST ( NULL AS INTEGER ) * - col1 FROM tab1

Expected: ["NULL","NULL"] but got ["196","0","2209","0","25","0"]
```


```sql
SELECT DISTINCT - MAX ( DISTINCT 49 ) * COUNT ( * ) AS col2 FROM tab0 cor0 WHERE NOT col1 IN ( + ( col0 ) + + col0 * col0 )

Expected: ["-147"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ), - CAST ( NULL AS REAL ) FROM tab2

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","NULL","0","NULL","0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1453 failed
* 85% was OK

Time: 18976ms

---- ---- ---- ---- ---- ---- ----
### 357/622 [`./test/random/expr/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_0.test)

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
SELECT - 61 / + 21 - + ( + COUNT ( * ) ) * CAST ( NULL AS REAL ) * 12 * + 82 AS col2, + 83 * - CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL CAST ( - - CASE + 81 WHEN - 91 THEN + 37 END AS INTEGER ), + MAX ( ALL - - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT COUNT ( + + 75 ) / + - ( + 82 ) - 45 + 45 AS col1, 80 AS col1

Expected: ["0","80"] but got ["80"]
```


```sql
SELECT - + 46 AS col2, CASE 10 WHEN + 84 THEN 33 / + + 74 ELSE NULL END col2

Expected: ["-46","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1688 failed
* 83% was OK

Time: 20688ms

---- ---- ---- ---- ---- ---- ----
### 358/622 [`./test/random/expr/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT ALL CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
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
SELECT + 90 AS col2, CAST ( NULL AS REAL ) * + 60 AS col2

Expected: ["90","NULL"] but got ["NULL","NULL"]
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

* 1032 failed
* 89% was OK

Time: 12381ms

---- ---- ---- ---- ---- ---- ----
### 359/622 [`./test/random/expr/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - 4 / - 44 * - 32 AS col1

Expected: ["0"] but got ["-0.003"]
```


```sql
SELECT + CAST ( COALESCE ( - 1, + - 37, - 27 + - COUNT ( * ) ) AS INTEGER ) * - 41 * - 88 AS col1, 0 * + - CAST ( NULL AS REAL ) * 43

g is not defined
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / + + 67 AS col0, 24 + + CAST ( 35 AS INTEGER )

Expected: ["NULL","59"] but got ["0","59"]
```


```sql
SELECT ALL 32 + - 45 AS col1, 1 / - CASE 69 WHEN + - 24 THEN - 78 / - 0 WHEN + - CAST ( NULL AS REAL ) * - 95 THEN + - 77 - + - ( - - 46 ) END AS col1

Expected: ["-13","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL 83 / - 45 + - CASE WHEN NOT - 30 NOT BETWEEN + ( + - 21 ) / + 34 + 87 + + + 87 AND + + 75 / ( 37 ) + + - 59 + + + ( - COALESCE ( - CASE + + COUNT ( * ) WHEN CASE WHEN - ( 56 ) IS NULL THEN + COUNT ( * ) * + + NULLIF ( - 83, + CAST ( NULL AS INTEGER ) / + 60 * + 45 + - + 82 ) * + - 4 * - CASE - 29 WHEN + 78 * - CAST ( NULL AS INTEGER ) / - 64 THEN NULL WHEN 7 THEN + 65 - + - ( + 33 ) EN…

Cannot read property 'toString' of undefined
```


```sql
SELECT - SUM ( DISTINCT - 74 ) + - + 43 / - + 84, + ( COUNT ( * ) ) - + 53 + - + ( - + ( + 44 ) ) + - 39 / - 60 + - - 22 * - 28 * 80 + + COUNT ( * ) + - CAST ( NULL AS REAL ) * - 87 * - 98 * - 45 * - + MIN ( + 15 ) * - 46 - - - 14 - + 34 / + 3 * + ( + COUNT ( * ) ) * + COALESCE ( + MAX ( 46 ), NULLIF ( + 29, + ( - 55 ) + + CASE - MIN ( ALL 22 ) WHEN + 11 THEN 86 * + + 60 ELSE + 29 - ( - COALESCE …

Expected: ["74","NULL"] but got ["74.512","NULL"]
```


```sql
SELECT 61 + - + CAST ( NULL AS INTEGER ) + CAST ( NULL AS INTEGER ) + 54 * - 0 + - 9 + + 37 AS col0, CAST ( NULL AS INTEGER ) * - 92 AS col2

Expected: ["NULL","NULL"] but got ["89","0"]
```


```sql
SELECT ALL - 73 AS col2, + CAST ( NULL AS INTEGER ) * + 26, + NULLIF ( - CASE + + 80 WHEN 1 THEN - 79 WHEN + 52 THEN + 33 * 45 ELSE NULL END, + COALESCE ( 28, COALESCE ( 24, CAST ( 85 AS INTEGER ), + 66 + 21 ) + 52, - ( - 88 ) + 46 ) * 3 - COUNT ( * ) ) * + 34 col2

Expected: ["-73","NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - CASE WHEN + 36 NOT IN ( CAST ( NULL AS INTEGER ) ) THEN NULL ELSE + NULLIF ( - ( - NULLIF ( ( - 57 ), COUNT ( * ) ) ), CASE 34 WHEN + 3 * + 9 THEN + 98 / 49 + 76 ELSE NULL END - 83 ) + - COALESCE ( - 80, - 31 ) END AS col2

Expected: ["-23"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1915 failed
* 80% was OK

Time: 21502ms

---- ---- ---- ---- ---- ---- ----
### 360/622 [`./test/random/expr/slt_good_100.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_100.test)

_Mimic sqlite_

```sql
SELECT ALL + CAST ( NULL AS INTEGER ) * - 85 + - CAST ( + SUM ( + 31 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * - COALESCE ( + ( + 14 ), 51, + 33 ) + + COUNT ( * ) + 13 + + 15 * SUM ( - - 59 ) * - 56 * + 24

Expected: ["NULL"] but got ["-1189426"]
```


```sql
SELECT + 17 / + + 99 col0

Expected: ["0"] but got ["0.172"]
```


```sql
SELECT DISTINCT - - 51 * + 96 / + 44 + CASE - CASE 92 WHEN + 20 THEN + + 30 / ( + 26 ) + + 93 END WHEN NULLIF ( 16, + ( - + COUNT ( * ) ) ) THEN + 45 WHEN - COALESCE ( + - 30, - 29 * - 78, - 1 ) THEN NULL END AS col1, 25

Expected: ["NULL","25"] but got ["25","NULL"]
```


```sql
SELECT DISTINCT ( CAST ( NULL AS INTEGER ) ) + + + 27 AS col0, + 41 + CAST ( NULL AS INTEGER ) + ( NULLIF ( - 42, 62 ) ) - + + 93 + - - ( 68 ) AS col1

Expected: ["NULL","NULL"] but got ["27","-26"]
```


```sql
SELECT DISTINCT CASE WHEN ( CAST ( NULL AS INTEGER ) ) IS NOT NULL THEN NULL ELSE MIN ( 57 ) / + 20 END AS col2

Expected: ["2"] but got ["NULL"]
```


```sql
SELECT ALL + 60 AS col2, - ( + CASE WHEN - 25 > + 91 THEN - COALESCE ( 74, - CAST ( 61 AS INTEGER ) + 31, - - 40 ) WHEN + 4 * + + 56 / 13 * - 15 + + CAST ( NULLIF ( - 81, 5 ) AS REAL ) NOT BETWEEN 58 + - 72 AND + COUNT ( * ) THEN NULL END )

Cannot read property 'toString' of undefined
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - - 84 - + - CAST ( NULL AS INTEGER ), 29 / CASE + + 55 WHEN - COUNT ( * ) THEN NULL WHEN + SUM ( ALL - 87 ) THEN + 68 / + + ( 79 ) ELSE NULL END / - COUNT ( * )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL 20 col1, ( - CAST ( NULL AS REAL ) ) AS col1

Expected: ["20","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1951 failed
* 80% was OK

Time: 21372ms

---- ---- ---- ---- ---- ---- ----
### 361/622 [`./test/random/expr/slt_good_101.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_101.test)

_Mimic sqlite_

```sql
SELECT - COALESCE ( 14, 79 ) / + 3 AS col0

Expected: ["-4"] but got ["-4.667"]
```


```sql
SELECT 26 * + 61 * CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT - 74 AS col1, CASE + CAST ( NULL AS INTEGER ) WHEN - + COALESCE ( 56, + CAST ( NULL AS INTEGER ) ) THEN + COUNT ( + ( 2 ) ) END * ( + 93 ) AS col1

Expected: ["-74","NULL"] but got ["NULL"]
```


```sql
SELECT 61 * + CAST ( ( - COUNT ( * ) ) AS INTEGER )

g is not defined
```


```sql
SELECT - 91 * + - NULLIF ( 47, 83 / - COUNT ( * ) ) + CAST ( NULL AS REAL ) - COALESCE ( + - COUNT ( + ( - + 53 ) ), - - COALESCE ( - + 1, - - ( 96 ) ) ) + 57 * - NULLIF ( - - CAST ( 25 AS INTEGER ), - + 82 ), CAST ( NULL AS INTEGER ) + + COUNT ( * ) AS col0

Expected: ["NULL","NULL"] but got ["NULL","1"]
```


```sql
SELECT - COALESCE ( - 10, + 97 ) / - CAST ( NULL AS INTEGER ) * - 13 AS col0, ( - + 36 ) * + - 36 + + - 6 - + 23 * - + MAX ( ALL CAST ( NULL AS INTEGER ) ) AS col0

Expected: ["NULL","NULL"] but got ["1290"]
```


```sql
SELECT ALL 57 col2, - CAST ( NULL AS REAL ) + 23 AS col2

Expected: ["57","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + CASE WHEN - COUNT ( * ) BETWEEN 4 * - 25 + - + COUNT ( * ) AND + 83 THEN - 50 END AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + 52 * NULLIF ( - 20, ( CAST ( 26 AS INTEGER ) ) ) + - 43 - - 56 / - + 76 * + - CAST ( - + COUNT ( * ) AS INTEGER ) / COUNT ( DISTINCT 30 ) AS col0

Expected: ["-1083"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1908 failed
* 80% was OK

Time: 21914ms

---- ---- ---- ---- ---- ---- ----
### 362/622 [`./test/random/expr/slt_good_102.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_102.test)

_Mimic sqlite_

```sql
SELECT + 84 / + 27 + + - 92 - - CAST ( + 86 AS INTEGER ) * + - 7 + 5 + - 53 + 63 * CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL"] but got ["-738.889"]
```


```sql
SELECT + - 34 / - + 63 AS col2

Expected: ["0"] but got ["0.540"]
```


```sql
SELECT CAST ( - + COUNT ( * ) AS INTEGER ) * + 22 AS col1

g is not defined
```


```sql
SELECT + CASE WHEN NOT CASE - 42 WHEN 25 - - + CAST ( NULL AS INTEGER ) THEN + + 61 + 87 END BETWEEN 37 AND - - COUNT ( * ) THEN + 37 END + - 0 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL 0 + 95 + - ( 84 ) + + 38 / 64 * + - NULLIF ( - 12, - + 24 * - 85 ) AS col0, CASE - + 42 WHEN - ( - 38 ) THEN + 97 * + 23 END

Expected: ["11","NULL"] but got ["18.125","NULL"]
```


```sql
SELECT NULLIF ( + 33, 35 * - - 84 ) * COALESCE ( + COUNT ( * ), MAX ( ALL 17 ) * + 18, - 9 * - SUM ( DISTINCT - 17 ) ) / - CAST ( COUNT ( * ) AS INTEGER ), - 2 AS col0

Expected: ["-33","-2"] but got ["NULL","-2"]
```


```sql
SELECT ALL 28 * + - 0 / + - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT 13 * NULLIF ( + - 16, + 36 - - - COUNT ( * ) ) - + CAST ( NULL AS INTEGER ) + + COUNT ( * ) * - 90 + 35 AS col2, + NULLIF ( - CASE - ( + 82 ) WHEN 48 * + - 16 * - 53 * + SUM ( ALL + 75 ) THEN NULL ELSE + SUM ( DISTINCT ( - + CAST ( NULL AS INTEGER ) ) ) END, + - CAST ( 10 AS INTEGER ) ) + - + MAX ( - + 52 ) + + 68 * CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["-263","52"]
```


```sql
SELECT ALL - 74 col1, - 84 * - + CAST ( NULL AS INTEGER )

Expected: ["-74","NULL"] but got ["-74","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 2017 failed
* 79% was OK

Time: 21747ms

---- ---- ---- ---- ---- ---- ----
### 363/622 [`./test/random/expr/slt_good_103.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_103.test)

_Mimic sqlite_

```sql
SELECT - COUNT ( * ) * + - ( + 52 ) / + 77 + - 99 + ( - - NULLIF ( 86, + + COALESCE ( + - 84, - 91, + 76, - 48 ) ) ) - 79 * COALESCE ( MAX ( DISTINCT 26 ) + 36, - COUNT ( * ), 36 * 86 ) + 10 AS col2

Expected: ["-4901"] but got ["-4900.325"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col1, 28 * - 22

Expected: ["NULL","-616"] but got ["0","-616"]
```


```sql
SELECT 80 * - CAST ( - COUNT ( * ) AS INTEGER ) + - 59 + - ( + 15 ) col0

g is not defined
```


```sql
SELECT DISTINCT + - CASE - + 86 WHEN - NULLIF ( - 75, - 4 + - COUNT ( * ) * 26 * + 43 / - COUNT ( * ) + - + 26 - - 82 ) THEN - + ( 49 ) * 6 END AS col0, + SUM ( ALL - + 60 ) * + 25 + 82 * CAST ( 65 * + 26 + - MAX ( ALL 24 ) AS INTEGER ) AS col1

Expected: ["NULL","135112"] but got ["NULL","-1500"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) - - - COUNT ( * ), + SUM ( ALL - + ( + 76 ) ) * + 47 + + AVG ( ALL + NULLIF ( - - 21, + 43 * - + 27 ) ) + CASE 45 WHEN + 5 THEN NULL WHEN 76 / - 7 + - + ( 47 ) THEN + CASE - + SUM ( - 83 ) WHEN - COUNT ( * ) THEN 33 * - COUNT ( * ) WHEN - AVG ( 55 ) THEN 37 - NULLIF ( 18, 85 ) ELSE 47 END * - CASE + 3 / 62 WHEN 65 THEN 67 END WHEN 2 THEN NULL END / CAST ( NULL AS…

Expected: ["NULL","NULL"] but got ["-1","NULL"]
```


```sql
SELECT ( - COUNT ( * ) ) / - CAST ( + COUNT ( * ) AS INTEGER ) + 6

Expected: ["7"] but got ["NULL"]
```


```sql
SELECT ALL 76 + - 52 AS col0, - CASE WHEN 36 NOT BETWEEN - + SUM ( - 71 ) - 64 * - 79 AND NULL THEN 42 WHEN ( NULL NOT BETWEEN - MIN ( + + 42 ) - 85 - - CAST ( NULL AS INTEGER ) AND NULL ) THEN - 10 END * - - 69 + + 90 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 57 * - CAST ( NULL AS INTEGER ) * 40 + - COALESCE ( 25, + - 8 ), - COUNT ( * ) * AVG ( - - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["-25","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1926 failed
* 80% was OK

Time: 20966ms

---- ---- ---- ---- ---- ---- ----
### 364/622 [`./test/random/expr/slt_good_104.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_104.test)

_Mimic sqlite_

```sql
SELECT 83 + + - CAST ( - COALESCE ( 63, + AVG ( + 86 ) * - 86 / - - 48 ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT COUNT ( * ) * - + COUNT ( * ) AS col1, CAST ( NULL AS REAL ) col1

Expected: ["-1","NULL"] but got ["NULL"]
```


```sql
SELECT ALL COALESCE ( - + ( + + 67 ), - 64 * + MAX ( 70 ) + - - 91 ) + + CAST ( NULL AS INTEGER ) * - CAST ( 52 AS INTEGER ) + 40

Expected: ["NULL"] but got ["-27"]
```


```sql
SELECT 7 AS col2, - 33 - + 72 * + - 74 + - - 63 AS col2

Expected: ["7","5358"] but got ["5358","5358"]
```


```sql
SELECT ALL - 81 AS col2, CASE + ( + 92 ) WHEN + 59 THEN + 79 * - 18 / + 24 + - 76 - + 10 ELSE NULL END * CAST ( - 81 AS INTEGER ) AS col2

Expected: ["-81","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + ( - 56 ) / NULLIF ( - CAST ( NULL AS INTEGER ), - 61 ) AS col0, 20 + - COUNT ( * ) AS col0, - + 94 * - NULLIF ( 39, + 26 ) / - 55 + CAST ( NULL AS INTEGER ) - + 48

Expected: ["NULL","19","NULL"] but got ["19","-114.655"]
```


```sql
SELECT CASE WHEN NOT NULL > 46 THEN - 60 WHEN - 9 NOT BETWEEN + 67 AND NULL THEN + 43 / - ( 55 ) + + 67 * - NULLIF ( - 10 * + 54, COUNT ( * ) ) END - - COUNT ( * ) * 50 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT - 53 * + - ( - ( + + 3 ) ) / CAST ( + COUNT ( * ) AS INTEGER ) + COUNT ( * )

Expected: ["-158"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * + - 72 + + - 9 col2, + CASE - + 13 WHEN + 67 + + - 10 THEN + 48 ELSE NULL END + 43 - CAST ( NULL AS INTEGER ) * 37 * + 53 AS col0

Expected: ["NULL","NULL"] but got ["-9","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1931 failed
* 80% was OK

Time: 20803ms

---- ---- ---- ---- ---- ---- ----
### 365/622 [`./test/random/expr/slt_good_105.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_105.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 15 + - + ( - CAST ( NULL AS INTEGER ) ) AS col2, - 16 / 74

Expected: ["NULL","0"] but got ["15","-0.216"]
```


```sql
SELECT - 10 / - - 54 + + - ( - 15 )

Expected: ["15"] but got ["14.815"]
```


```sql
SELECT DISTINCT + - 72 AS col1, - CAST ( + - COUNT ( * ) AS INTEGER ) + + 53 * - 3

g is not defined
```


```sql
SELECT ALL - 44 + + 16 * + + CASE 32 WHEN - ( + COUNT ( * ) ) + 8 THEN NULL WHEN + 54 * - 22 - - 36 + - COUNT ( * ) + - 9 * - 58 + + 17 * - - 10 * 22 * - - NULLIF ( - 94, - - 10 ) THEN 33 * - + 79 END + + CASE WHEN NOT - 79 < NULL OR ( NULL ) NOT BETWEEN NULL AND + 19 THEN - ( ( 96 ) ) ELSE 99 END

Cannot read property 'toString' of undefined
```


```sql
SELECT ( - CASE - - SUM ( ALL + 26 ) WHEN - - 75 - + 32 THEN - + 58 WHEN - 87 THEN + 87 * 64 WHEN COUNT ( * ) THEN NULL ELSE NULL END ) + CAST ( - 58 AS INTEGER ) AS col1, 38

Expected: ["NULL","38"] but got ["38","NULL"]
```


```sql
SELECT ALL + 63 * + + AVG ( ALL CAST ( NULL AS INTEGER ) ), CAST ( NULL AS INTEGER ) + - 73 AS col0

Expected: ["NULL","NULL"] but got ["0","-73"]
```


```sql
SELECT + COUNT ( * ) / + CAST ( + AVG ( 90 ) AS INTEGER ) * - SUM ( - + 6 ) AS col0

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS REAL ) * + COUNT ( * ) * - 29 * 47 * 5 AS col1, CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - NULLIF ( + ( 44 ), - + 46 ) / 77 + + + 47 + - + 47

Expected: ["0"] but got ["-0.571"]
```

#### ☓ Ran 10012 tests as sqlite

* 1854 failed
* 81% was OK

Time: 20956ms

---- ---- ---- ---- ---- ---- ----
### 366/622 [`./test/random/expr/slt_good_106.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_106.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 37 + + + CAST ( NULL AS INTEGER ) * + MIN ( ALL NULLIF ( - - 23, - 7 ) ) * 18 AS col0

Expected: ["NULL"] but got ["37"]
```


```sql
SELECT + 54 * - 79 + 85 * - 47 AS col0, - COUNT ( * ) + + 80 col0

Expected: ["-8261","79"] but got ["79"]
```


```sql
SELECT DISTINCT - CAST ( - COUNT ( * ) AS INTEGER ) + - 23 * + 67 AS col0

g is not defined
```


```sql
SELECT + 80 + - - CASE - 70 WHEN - 92 THEN + - 29 * 17 + - 59 / - 54 + - CASE WHEN NOT + 8 BETWEEN NULL AND 39 / - MAX ( ALL + 45 ) THEN 37 * + 18 * + 37 ELSE NULL END ELSE NULL END, 76 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT 24 AS col0, CAST ( NULL AS REAL ) AS col0

Expected: ["24","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + - CASE WHEN NOT NULL > NULL THEN NULL ELSE - 63 END AS col2

Expected: ["63"] but got ["NULL"]
```


```sql
SELECT ( 39 ) - - + COALESCE ( - 99, - + 5, ( - + ( - + CAST ( NULL AS INTEGER ) ) ) * + 68 ) AS col2, 98 * - 95 + - COUNT ( * ) * - 19 * + CASE + CAST ( 83 AS REAL ) WHEN 88 * + 88 THEN 37 END col2

Expected: ["-60","NULL"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col0, CASE ( - 10 ) WHEN - COALESCE ( + - COALESCE ( + COUNT ( * ), + - 0 ), ( 33 ) * + 25 + 41 + NULLIF ( + 99, + - 52 + + 68 ) ) THEN + - COALESCE ( - + 59, COUNT ( ALL + + 41 ) * COUNT ( 28 ), - 52 + 71 ) * - 2 END / + 87 AS col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) / + 39 + ( SUM ( ALL + + 30 ) ) / + 37, + MAX ( - - CAST ( NULL AS INTEGER ) ) * - 73 - 92 + - 78

Expected: ["NULL","NULL"] but got ["0.811","-170"]
```

#### ☓ Ran 10012 tests as sqlite

* 1905 failed
* 80% was OK

Time: 21140ms

---- ---- ---- ---- ---- ---- ----
### 367/622 [`./test/random/expr/slt_good_107.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_107.test)

_Mimic sqlite_

```sql
SELECT ALL - 72 / 98 * - 98 / + 78 / - 57 AS col0

Expected: ["0"] but got ["-52.615"]
```


```sql
SELECT COUNT ( * ) * COALESCE ( - COALESCE ( - 92, - 98 * COUNT ( * ) * + 48 / 65 * + COUNT ( * ) / - 81 * + 92 ), COUNT ( * ) ) * - 2 * - + 17 * COUNT ( * ) + - AVG ( + 92 ) / + + SUM ( ALL 84 ) - + 91 - + CAST ( NULL AS INTEGER ) + + 88 + - ( - - 54 ) * 74 * + 69 * 55 * + 70 / + AVG ( ALL 8 ) + - MAX ( - 83 )

Expected: ["NULL"] but got ["-132688968.095"]
```


```sql
SELECT DISTINCT + 57 * - 52 * - 40 / + CAST ( + COUNT ( * ) AS INTEGER ) - + COUNT ( * ) AS col2

Expected: ["118559"] but got ["NULL"]
```


```sql
SELECT DISTINCT - 19 / - 40 * + COUNT ( * ) AS col1, 95 / + CASE + - COUNT ( * ) WHEN + 25 THEN NULL WHEN + 25 + + - 27 THEN + 46 END AS col0

Expected: ["0","NULL"] but got ["0.475","NULL"]
```


```sql
SELECT CAST ( COUNT ( * ) AS INTEGER ) + - 6

g is not defined
```


```sql
SELECT - CASE WHEN NOT ( 94 ) BETWEEN ( NULL ) AND AVG ( 22 ) THEN COUNT ( * ) ELSE 28 * - 6 END + + COUNT ( 84 )

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS REAL )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ), - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT 56 col0, CASE - ( 53 ) WHEN - 5 THEN ( 25 ) / - + 51 END col0

Expected: ["56","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 29 / 97

Expected: ["0"] but got ["0.299"]
```

#### ☓ Ran 10012 tests as sqlite

* 1912 failed
* 80% was OK

Time: 21101ms

---- ---- ---- ---- ---- ---- ----
### 368/622 [`./test/random/expr/slt_good_108.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_108.test)

_Mimic sqlite_

```sql
SELECT + COALESCE ( + + COUNT ( * ), + COUNT ( * ) * COUNT ( * ) * - + CASE 51 WHEN - 2 + 53 THEN NULL WHEN 54 / + 88 THEN + 93 * - - 96 * 31 * - 23 ELSE + - 7 + + + CAST ( NULL AS INTEGER ) / + + 2 END ) / - 4 AS col0

Expected: ["0"] but got ["-0.250"]
```


```sql
SELECT NULLIF ( - + CAST ( NULL AS INTEGER ), 98 ) AS col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( + NULLIF ( - 35, + AVG ( DISTINCT 75 ) ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - 91 + 37 AS col2, + CASE - 5 WHEN + + 63 THEN NULL WHEN - - MAX ( DISTINCT + + 7 ) THEN - COALESCE ( + - 46, - - 68 ) * + ( + NULLIF ( MIN ( 67 ), + - 51 ) ) END + 57

Expected: ["NULL","NULL"] but got ["37","NULL"]
```


```sql
SELECT MIN ( - 39 ) AS col1, + CASE + 69 WHEN 14 + + + 25 THEN + ( COUNT ( * ) ) WHEN - - 33 THEN + SUM ( + - 74 ) END AS col1

Expected: ["-39","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT 20 + + NULLIF ( + 37, + 37 + + NULLIF ( - 24, 2 + + ( 23 ) * + 16 ) * CAST ( NULL AS INTEGER ) )

Expected: ["57"] but got ["NULL"]
```


```sql
SELECT DISTINCT + - 62 + + 57 col1, - 11 + ( - CASE 76 WHEN - ( - 99 ) + + 72 THEN 21 * 40 ELSE NULL END ) * 24 AS col1

Expected: ["-5","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL + 97 - + 8 + + 67 + - CAST ( NULL AS INTEGER ), ( 57 ) + 1 + - CAST ( NULL AS INTEGER ) + + 45

Expected: ["NULL","NULL"] but got ["156","103"]
```


```sql
SELECT + - ( - + MAX ( - - 88 ) ) + + CASE WHEN - 21 NOT BETWEEN ( NULL ) AND + 8 / + 42 / + 21 - - + 46 THEN 31 END + + - 38 + + 63 + 30 + ( ( - 84 ) + - SUM ( 35 ) * 22 ) * ( 97 ) * - NULLIF ( + ( - 83 ) * SUM ( DISTINCT 29 + 33 ) + + 0 * - 74, + 28 ) AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT - 59 * ( - 72 ) - + 98 - + + 35 + + CAST ( NULL AS INTEGER ) * 90 + - + COUNT ( * )

Expected: ["NULL"] but got ["4114"]
```

#### ☓ Ran 10012 tests as sqlite

* 1886 failed
* 81% was OK

Time: 20962ms

---- ---- ---- ---- ---- ---- ----
### 369/622 [`./test/random/expr/slt_good_109.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_109.test)

_Mimic sqlite_

```sql
SELECT + - CAST ( + - 69 AS REAL ) - + CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL"] but got ["69"]
```


```sql
SELECT - 82 * - 57 - 88 / + COALESCE ( - + 96, + 22 ) AS col0

Expected: ["4674"] but got ["4674.917"]
```


```sql
SELECT 9 * 82 - - + CAST ( + + COALESCE ( 48, + MAX ( ALL - - 35 ) + + 29 ) AS INTEGER ) + - 85 + - 43 AS col2, CAST ( NULL AS INTEGER )

g is not defined
```


```sql
SELECT ALL - AVG ( DISTINCT - 44 ) + CAST ( NULL AS INTEGER ) + + 24 + - 21 * COALESCE ( + 65, + 81, - CAST ( - - 95 AS INTEGER ) + MAX ( DISTINCT + 95 ) * + 74 * + 67 ) + - 2 AS col1, - CAST ( NULL AS INTEGER ) * - - 27

Expected: ["NULL","NULL"] but got ["-1299","0"]
```


```sql
SELECT 84 + + NULLIF ( - CASE + - 45 WHEN + + COUNT ( * ) / - COUNT ( * ) THEN - 31 ELSE NULL END, 86 * 32 ) * - 7 * - 13 AS col1, + 71 + CASE + 48 WHEN + 79 THEN + + COALESCE ( - 5, - + COUNT ( * ) + + 58 ) / - COALESCE ( COUNT ( * ), + ( + - 33 ) - - - 32 - + + COUNT ( * ) - + + COUNT ( * ) + - 88 ) WHEN + 48 THEN NULL END AS col1

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT NULLIF ( + 6, - COUNT ( * ) ) * - + 82 * + ( + + CASE + COUNT ( * ) WHEN - 18 / 37 THEN - 24 WHEN + 72 * - 70 * - - 4 * 26 + + 8 + ( - ( + + 54 ) ) THEN + 90 ELSE NULL END ) + + ( 77 ) AS col1, 73

Expected: ["NULL","73"] but got ["73","NULL"]
```


```sql
SELECT - - CASE WHEN NULL NOT BETWEEN ( CASE - - 32 WHEN + COUNT ( 9 ) THEN + 48 WHEN - COUNT ( * ) * - 61 THEN NULL END ) AND ( - MIN ( 85 ) ) THEN 25 + ( - 45 + 61 / 16 ) ELSE - 37 * - 21 END + 28 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 40 / 5 / + - CASE WHEN NOT 45 <= NULL THEN NULL ELSE + 5 END

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT 27 AS col0, + 18 / - CAST ( NULL AS INTEGER ) AS col0

Expected: ["27","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1722 failed
* 82% was OK

Time: 20416ms

---- ---- ---- ---- ---- ---- ----
### 370/622 [`./test/random/expr/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_11.test)

_Mimic sqlite_

```sql
SELECT - 70 + - + COUNT ( * ) / - - 88 * 27

Expected: ["-70"] but got ["-70.000"]
```


```sql
SELECT ALL - ( + + 47 ) + + CAST ( - COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT - 58 col0, CAST ( NULL AS INTEGER ) / - 52 AS col0

Expected: ["-58","NULL"] but got ["0","0"]
```


```sql
SELECT + NULLIF ( + 76, - + 92 + - CASE + 82 WHEN 8 THEN 6 + 2 END * + ( - 74 ) + CASE WHEN NOT ( NULL ) NOT BETWEEN - - CAST ( NULL AS INTEGER ) AND - COUNT ( * ) / + 24 THEN NULL WHEN 48 * 88 / - + 64 BETWEEN ( 64 ) AND ( - CASE + 30 WHEN 66 THEN NULL ELSE 19 + 67 / - 70 END ) THEN ( - 96 ) ELSE NULL END + + 70 ) * 73 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT - - CASE + - 99 WHEN - 12 * 40 THEN NULL WHEN + 40 * COUNT ( * ) + - 19 - - CAST ( NULL AS INTEGER ) * 78 + + 11 THEN + 70 * - + 64 WHEN 66 THEN NULL ELSE NULL END + + 31 AS col0, 41

Expected: ["NULL","41"] but got ["41","NULL"]
```


```sql
SELECT ALL + 61 * + ( - + CAST ( NULL AS INTEGER ) ) * + MAX ( 92 ) AS col0, 26 + + - CASE - 28 WHEN 32 THEN NULL WHEN + 84 + COALESCE ( 73, NULLIF ( - 3, COUNT ( * ) ), + NULLIF ( + + CAST ( NULL AS INTEGER ), + + 40 ) ) - + 65 / + 48 * 30 THEN + 91 * + + 12 / - 63 + - 74 ELSE NULL END + + + 74 AS col2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 1 + 60 - + CAST ( + - 29 AS INTEGER ) / - SUM ( ALL - 36 ) - + 21 * + + CAST ( - 82 AS INTEGER ) + + 8 * - CASE WHEN NULL NOT IN ( - 46, + 75 * NULLIF ( - 16, CAST ( NULL AS INTEGER ) ) + + 4 ) THEN NULL ELSE + + 51 END, - 73 col0

Expected: ["1375","-73"] but got ["NULL","-73"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT 82 AS col0, - CAST ( NULL AS REAL ) AS col0

Expected: ["82","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1934 failed
* 80% was OK

Time: 21741ms

---- ---- ---- ---- ---- ---- ----
### 371/622 [`./test/random/expr/slt_good_110.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_110.test)

_Mimic sqlite_

```sql
SELECT - COUNT ( * ) * + COALESCE ( - - 1, 75 ) * ( + CAST ( NULL AS INTEGER ) )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL 88 / + 17

Expected: ["5"] but got ["5.176"]
```


```sql
SELECT - CAST ( + - COALESCE ( - 15, + COUNT ( + + 58 ), - 58 + + ( 60 ) * 56, + SUM ( - 24 ) + - 42 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL 50 AS col1, CASE + COUNT ( - 54 ) WHEN + - 47 THEN NULL WHEN - - 65 / - - 24 - 93 THEN 87 * - 61 WHEN + 77 THEN + 99 WHEN - 21 THEN NULL END AS col1

Expected: ["50","NULL"] but got ["NULL"]
```


```sql
SELECT - 49 * + CASE WHEN NOT NULL BETWEEN + 62 AND + + 89 * ( - - 65 ) * 31 THEN - + 34 * - 46 / - - MIN ( ALL - 57 ) ELSE - + 81 * + - MIN ( - 90 ) + - 38 * + 98 + - 78 END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT + + COUNT ( DISTINCT - 76 ) * + CASE WHEN ( NULL ) NOT IN ( 95 ) THEN NULL WHEN NOT + 40 >= + 4 * 29 THEN + COUNT ( * ) - + ( 90 ) * - 46 ELSE NULL END AS col2

Expected: ["4141"] but got ["NULL"]
```


```sql
SELECT 96 * CAST ( NULL AS INTEGER ), - COUNT ( * ) / CASE NULLIF ( + 95, - + 77 * + - 38 ) WHEN - 82 / - 26 / + + 17 THEN + 27 - + CAST ( NULL AS INTEGER ) WHEN 79 / + 70 THEN NULL ELSE NULL END * 2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 14 AS col0, + 0 + ( + + 14 ) + - 18 - - CASE - 2 WHEN - - 6 THEN NULL ELSE 47 END + 54 * + 26 * - 34 + + - 91 / + + CAST ( NULL AS INTEGER ) AS col0

Expected: ["14","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL - AVG ( ALL CAST ( NULL AS INTEGER ) ), - CAST ( NULL AS INTEGER ) * + - 56 + 39

Expected: ["NULL","NULL"] but got ["0","39"]
```

#### ☓ Ran 10012 tests as sqlite

* 1902 failed
* 81% was OK

Time: 21937ms

---- ---- ---- ---- ---- ---- ----
### 372/622 [`./test/random/expr/slt_good_111.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_111.test)

_Mimic sqlite_

```sql
SELECT - - 34 * + 25 * + MIN ( + 24 ) + - 42 / + 33 + + 39 * 52 / 44 + + + MIN ( + 2 ) + 29 * 4

Expected: ["20563"] but got ["20562.818"]
```


```sql
SELECT 97 * + CASE WHEN NOT + 48 NOT IN ( 82 * CAST ( NULL AS INTEGER ) ) THEN - ( + 84 ) + + 46 * + + 28 WHEN 30 * - 10 IS NOT NULL THEN NULL END * 71 + ( - 92 )

Expected: ["NULL"] but got ["8291856"]
```


```sql
SELECT CAST ( - CASE + - COUNT ( * ) WHEN 53 THEN - - MAX ( DISTINCT - + 59 ) * - COUNT ( - + 9 ) * - + 8 - CAST ( + - 6 AS INTEGER ) + - 32 ELSE 98 END AS INTEGER )

g is not defined
```


```sql
SELECT - 72 * + 79 * COUNT ( * ) * + CAST ( NULL AS INTEGER ) - 63, CASE + COUNT ( * ) WHEN + 4 THEN - 79 ELSE NULL END AS col1

Expected: ["NULL","NULL"] but got ["-63","NULL"]
```


```sql
SELECT CASE WHEN NOT ( 84 ) BETWEEN - 57 + - 87 / - 1 AND + - 83 + - 25 THEN - 58 * + 42 - + 76 + - + 97 ELSE - 52 END + + - ( + - 61 ) * + 75

Cannot read property 'toString' of undefined
```


```sql
SELECT 49 / 87, CAST ( NULL AS INTEGER ) + 22 + + - 81 + + CASE + ( 56 ) WHEN 0 + 30 THEN 58 * CAST ( NULL AS REAL ) ELSE NULL END * - 38 AS col2

Expected: ["0","NULL"] but got ["0.563","NULL"]
```


```sql
SELECT - - ( + CAST ( NULL AS INTEGER ) ), CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - + CAST ( 63 AS INTEGER ) * + - CASE - SUM ( + 1 ) WHEN + - COUNT ( * ) - 0 + - ( ( + COUNT ( + 9 ) ) ) / + SUM ( - 33 ) * + - 71 * - + 62 THEN + + 97 * COUNT ( * ) - + COUNT ( * ) WHEN + + 73 THEN + - 61 * + + 47 + - 72 ELSE NULL END + 57 + + - 55 AS col2

Expected: ["6050"] but got ["NULL"]
```


```sql
SELECT + 99 AS col0, CASE - 92 WHEN - 82 THEN 58 END AS col0

Expected: ["99","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1877 failed
* 81% was OK

Time: 23562ms

---- ---- ---- ---- ---- ---- ----
### 373/622 [`./test/random/expr/slt_good_112.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_112.test)

_Mimic sqlite_

```sql
SELECT ALL 21 / + 50 + MAX ( ALL + 72 ) * - 78 + - NULLIF ( + 12, + 38 - + COUNT ( ALL 79 ) ) AS col0

Expected: ["-5628"] but got ["-5627.580"]
```


```sql
SELECT ( - ( + - CAST ( NULL AS INTEGER ) ) ) * + 37 AS col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT 5 + - 63 + + 83 * + CAST ( - COUNT ( * ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT 26 col0, ( + 16 ) + - 57 * + CASE + 7 WHEN + 8 * + 74 * - 86 THEN - CASE + - COUNT ( * ) WHEN + - 40 * - 68 THEN + - 7 + 96 ELSE NULL END * - - 57 END AS col0

Expected: ["26","NULL"] but got ["NULL"]
```


```sql
SELECT - CAST ( NULL AS REAL ) + + - CASE + 59 WHEN 47 * - + ( + ( - COUNT ( * ) ) ) THEN 66 WHEN 72 THEN + COUNT ( * ) END col2, - CASE - 13 WHEN + + 39 * - ( + 93 ) + - 85 THEN NULL WHEN 44 + - 67 THEN NULL ELSE - CAST ( NULL AS INTEGER ) END AS col1

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT 24 + - 23 / + CAST ( - SUM ( DISTINCT + - CAST ( + + 32 AS REAL ) ) AS INTEGER ) * - - 47 + - COUNT ( * ) AS col0

Expected: ["23"] but got ["NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), - 38 + + + 6 + + 8 * - 22 * + 98 + + - CAST ( - CASE WHEN ( NULL ) BETWEEN + 71 AND NULL THEN + - 6 * - + 28 + 95 WHEN 26 IN ( + + 5, - 61, - 46, 76, + COUNT ( * ) * - - 91 ) THEN + 72 + + 3 END AS INTEGER )

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) + + 2 * + 67 * + COUNT ( * ), CAST ( NULL AS INTEGER ) + - + 4 + + CAST ( NULL AS INTEGER ) + 46 AS col2

Expected: ["NULL","NULL"] but got ["134","42"]
```

#### ☓ Ran 10012 tests as sqlite

* 1970 failed
* 80% was OK

Time: 21979ms

---- ---- ---- ---- ---- ---- ----
### 374/622 [`./test/random/expr/slt_good_113.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_113.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 10 * + 14 / - - CASE - - 27 WHEN + 26 + + 13 THEN NULL ELSE - - 0 + 99 * + 26 END

Expected: ["0"] but got ["0.054"]
```


```sql
SELECT + + ( - CAST ( NULL AS INTEGER ) ) + + 53

Expected: ["NULL"] but got ["53"]
```


```sql
SELECT ALL + 3 * CAST ( + AVG ( DISTINCT 84 ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT DISTINCT - - CASE + 88 WHEN + 7 / 22 THEN + - 35 * - MAX ( DISTINCT - CASE + 68 WHEN + + 62 / 57 THEN - 35 * + 62 END ) ELSE NULL END * - ( - - ( - 49 ) ) * 24 + - - 92 AS col2, + COUNT ( * ) / + 38 AS col1

Expected: ["NULL","0"] but got ["NULL","0.026"]
```


```sql
SELECT ALL - CASE + CAST ( + CASE 22 WHEN + COUNT ( ALL - 14 ) THEN COUNT ( * ) END AS INTEGER ) WHEN 27 THEN SUM ( - CAST ( 4 AS INTEGER ) ) ELSE 88 + 29 END / CASE WHEN ( 31 / 40 ) < + 12 THEN NULL WHEN NULL NOT BETWEEN 0 * - 91 + - 5 AND COUNT ( * ) THEN MIN ( ALL + 20 ) ELSE AVG ( ALL 63 ) END

Cannot read property 'toString' of undefined
```


```sql
SELECT + 62 * - - 10 - - ( CAST ( + + ( 96 ) AS INTEGER ) ) + - 47 / + 76 AS col0, + NULLIF ( COUNT ( * ), - + 38 * + - 19 ) / - CAST ( + COUNT ( * ) AS INTEGER ) + - COALESCE ( + 45, - - 76, 36 + - 66 )

Expected: ["716","-46"] but got ["715.382","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col1, CASE - 78 WHEN + + 51 + + 64 + - + ( + - 32 ) THEN - 67 END

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * + 43 * + 9 * 24 + + ( 78 ) AS col2, - MIN ( DISTINCT + CAST ( NULL AS INTEGER ) ) * + COUNT ( * ) AS col0

Expected: ["NULL","NULL"] but got ["78","0"]
```


```sql
SELECT ALL 66 col2, 54 * - CASE - - 57 WHEN - 29 THEN NULL WHEN - + 75 THEN 50 - CASE NULLIF ( - + 5, NULLIF ( - 17, 23 ) ) WHEN - 41 THEN NULL WHEN + 81 * + 53 THEN + + NULLIF ( - 15, - + 17 ) * - - 92 END END AS col2

Expected: ["66","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1883 failed
* 81% was OK

Time: 21331ms

---- ---- ---- ---- ---- ---- ----
### 375/622 [`./test/random/expr/slt_good_114.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_114.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - 48 * + 81 - - 56 * 28 - + CAST ( NULL AS INTEGER ), + 94 AS col1

Expected: ["NULL","94"] but got ["-2320","94"]
```


```sql
SELECT + 7 / - 92 * - + 38

Expected: ["0"] but got ["0.002"]
```


```sql
SELECT DISTINCT COALESCE ( ( - CAST ( - COUNT ( * ) AS INTEGER ) ), + 19, + 85 ) col0

g is not defined
```


```sql
SELECT DISTINCT AVG ( - - 39 ) / - CAST ( NULL AS INTEGER ) + 52 + + + COUNT ( * ) * + 61 AS col1, - COUNT ( * ) - - MAX ( + 97 ) + + - 83 / SUM ( + 45 )

Expected: ["NULL","95"] but got ["NULL","94.156"]
```


```sql
SELECT ALL - CASE WHEN NOT COALESCE ( 33, 49, - 81, - 10 ) NOT IN ( + 94, - AVG ( DISTINCT 78 ) + - COUNT ( * ) ) THEN NULL ELSE + 12 / - - 20 END * + 63 + - COUNT ( * ) AS col2

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT DISTINCT + 97 AS col2, CASE - + 87 WHEN 11 THEN NULL WHEN + 44 + - 24 THEN 12 ELSE NULL END * + 68 col2

Expected: ["97","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + + 46 + + 89 - - + 60 + ( - 73 ) / - + 95 AS col2

Expected: ["195"] but got ["195.768"]
```


```sql
SELECT DISTINCT - 98 * - 51 * - - 34 * + 64 * - CASE WHEN NULL BETWEEN NULL AND NULL THEN NULL ELSE + 23 END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col0, + NULLIF ( + 94, + 5 ) * + CAST ( NULL AS INTEGER ) + - 20 + 56 * - ( + ( - MIN ( DISTINCT 85 ) ) ) * - 40 AS col0

Expected: ["NULL","NULL"] but got ["-190420"]
```


```sql
SELECT - + MIN ( + 66 ) + + - CASE 37 WHEN + 75 / 25 * + 18 + AVG ( DISTINCT - - 25 ) THEN + + 65 ELSE NULL END - COUNT ( - 26 ) + - CASE + 75 WHEN 97 + 52 - + 53 * + CAST ( NULL AS REAL ) THEN NULL ELSE + COUNT ( * ) + 55 END, + CAST ( NULL AS INTEGER ) * + 13

Expected: ["NULL","NULL"] but got ["NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1929 failed
* 80% was OK

Time: 21181ms

---- ---- ---- ---- ---- ---- ----
### 376/622 [`./test/random/expr/slt_good_115.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_115.test)

_Mimic sqlite_

```sql
SELECT + 98 / + 45

Expected: ["2"] but got ["2.178"]
```


```sql
SELECT ALL 70 + + - ( - 3 ) * - - 89 + - 88 + 34 * 95 AS col1, CASE + CAST ( NULL AS REAL ) WHEN - 93 THEN NULL WHEN + + 5 THEN - 4 / + 1 * - COUNT ( DISTINCT 65 ) * + NULLIF ( + - 77, - 76 ) + - CASE - 91 WHEN - 41 * + + ( - 95 ) THEN NULL WHEN + - COUNT ( * ) * - COUNT ( * ) * 22 / - COUNT ( * ) - 93 + 23 THEN + - 12 + 85 END + + 65 * CAST ( NULL AS REAL ) ELSE NULL END AS col1

Expected: ["3479","NULL"] but got ["NULL"]
```


```sql
SELECT + 63 * - 53 - + 61 * COALESCE ( - + CAST ( + + 3 AS INTEGER ), + 63 * - 34 - - - AVG ( + 61 ) + - 58 ) * - CAST ( NULL AS INTEGER ) * COUNT ( * ) AS col1

Expected: ["NULL"] but got ["-3339"]
```


```sql
SELECT + 7 + NULLIF ( CAST ( + 92 AS INTEGER ), - 24 * CASE 7 WHEN 77 * ( CASE WHEN NULL BETWEEN + 88 AND ( NULL ) THEN + 49 * + CASE 9 / - 39 WHEN + 45 THEN NULL WHEN 17 THEN 22 + 11 END + 5 ELSE + 73 END ) THEN + NULLIF ( 15, 86 ) END ) AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT CAST ( + MIN ( - + 14 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL - 17 * - + CAST ( NULL AS INTEGER ) + + MAX ( - + 52 ) + + 63 * 1 AS col0, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["11","0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + 83 * + 95 * AVG ( + 50 ), ( - + 61 ) + 39 - - 68 + CASE - MAX ( - CAST ( + - 30 AS REAL ) ) WHEN - 59 + - 5 THEN AVG ( ( 5 ) ) ELSE NULL END

Expected: ["NULL","NULL"] but got ["394250","NULL"]
```


```sql
SELECT - ( - + 7 ) - COUNT ( * ) + SUM ( + - 96 ) + - 49 + + + 42 / CASE COUNT ( * ) + 23 / - 92 WHEN + COUNT ( ALL 91 ) THEN + 90 END

Expected: ["-139"] but got ["NULL"]
```


```sql
SELECT - 95 AS col1, CAST ( NULL AS REAL ) AS col1

Expected: ["-95","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1938 failed
* 80% was OK

Time: 20925ms

---- ---- ---- ---- ---- ---- ----
### 377/622 [`./test/random/expr/slt_good_116.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_116.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 79 + CAST ( MIN ( ALL + 2 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL + 60 + + 11 * 72 / + ( - 60 ) AS col2

Expected: ["47"] but got ["46.800"]
```


```sql
SELECT - - 16 + + - CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["16"]
```


```sql
SELECT 82 AS col1, - 11 * COUNT ( * ) * CASE 29 WHEN + COUNT ( DISTINCT - - 8 ) THEN - 25 ELSE NULL END col1

Expected: ["82","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT 17 AS col2, 55 - + - CASE + 1 WHEN - 44 THEN NULL WHEN - 66 THEN + NULLIF ( + NULLIF ( + ( + 98 ), + 1 ), 97 * 4 / 63 ) / - 43 + + ( 31 ) ELSE NULL END + - CAST ( + 72 AS REAL ) AS col2, - 95 + + ( + 85 ) + + - 5 / + 83 + - - ( - - 93 ) + 75 + - ( - CASE 49 WHEN 56 + 35 / - 99 + - 86 / - 55 THEN - 56 ELSE 48 * + 38 + 34 END ) col0

Expected: ["17","NULL","2016"] but got ["NULL","NULL","2015.940"]
```


```sql
SELECT - 14 + - 8 + MIN ( + 18 ) + 53 / CAST ( - 92 / - SUM ( 63 ) AS INTEGER )

Expected: ["49"] but got ["NULL"]
```


```sql
SELECT DISTINCT - 0 + - COUNT ( * ) * + CASE WHEN NOT ( + 85 ) BETWEEN ( NULL ) AND ( MAX ( DISTINCT - 50 ) * - 30 + 20 ) THEN NULL ELSE - COALESCE ( CAST ( + 6 AS INTEGER ), - 16 ) / 87 END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + 29 + 40 - + - CAST ( NULL AS REAL ) AS col0, 99 * + CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS INTEGER ) col1

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1875 failed
* 81% was OK

Time: 21306ms

---- ---- ---- ---- ---- ---- ----
### 378/622 [`./test/random/expr/slt_good_117.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_117.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + COUNT ( * ) / - - 9 * - 85 + - 93 + - 71 AS col0

Expected: ["-164"] but got ["-164.001"]
```


```sql
SELECT 69 * + NULLIF ( - 21, - - 89 ) + - 41 / - - COUNT ( * ) - MIN ( ALL CAST ( NULL AS INTEGER ) ) - + 2

Expected: ["NULL"] but got ["-1492"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), 13 + + 90 + + 25 + + 19 * - + 10 * - - ( + CAST ( 1 AS INTEGER ) ) * + NULLIF ( ( + - COUNT ( + 34 ) ), 21 * + 94 - + 19 ) + + CAST ( NULL AS REAL ) + + AVG ( 4 ) * 81

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT CAST ( - - COUNT ( DISTINCT + 25 ) AS INTEGER ) AS col1

g is not defined
```


```sql
SELECT ALL 76 / - 12 AS col2, - 72 * + - CASE - COUNT ( * ) WHEN + 22 THEN - 12 + COALESCE ( + 79, - 40, + 17 * ( 70 ) + - - 8 - + + COALESCE ( + 86, 13 ) - - 9 * + 27 * + 39 / - + CAST ( + NULLIF ( 1, - NULLIF ( - COUNT ( * ), - 7 * + + 31 + + - 33 ) ) AS INTEGER ) + 93 ) WHEN NULLIF ( - 51, 98 * + - ( CAST ( - 63 AS INTEGER ) ) ) THEN NULL END

Expected: ["-6","NULL"] but got ["-6.333","NULL"]
```


```sql
SELECT CASE WHEN NULL IS NOT NULL THEN + COUNT ( * ) WHEN NOT + COALESCE ( - 58, + 0, COUNT ( * ) ) BETWEEN - 84 AND COUNT ( * ) THEN + 70 ELSE NULL END

Cannot read property 'toString' of undefined
```


```sql
SELECT - COUNT ( * ) / - CAST ( + COUNT ( * ) AS INTEGER ) + - 9 + - 77, + 53 * 58 + 35 AS col1

Expected: ["-85","3109"] but got ["NULL","3109"]
```


```sql
SELECT DISTINCT + 76 + - + CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["76","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1805 failed
* 81% was OK

Time: 21346ms

---- ---- ---- ---- ---- ---- ----
### 379/622 [`./test/random/expr/slt_good_118.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_118.test)

_Mimic sqlite_

```sql
SELECT - - 85 * - + CAST ( NULL AS INTEGER ) + 47 + + 32 AS col2, 89 AS col0

Expected: ["NULL","89"] but got ["79","89"]
```


```sql
SELECT ( - + CAST ( + SUM ( - + 37 ) AS INTEGER ) )

g is not defined
```


```sql
SELECT DISTINCT - + 68 / - MAX ( 45 )

Expected: ["1"] but got ["1.511"]
```


```sql
SELECT 71 / + 45 AS col1, 88 - - - CASE + 88 WHEN 65 + 55 THEN + - 30 ELSE NULL END + 80 / + + 10

Expected: ["1","NULL"] but got ["1.578","NULL"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col2, CASE COUNT ( * ) WHEN - - COUNT ( * ) * - 90 + + NULLIF ( - COALESCE ( + - 36, + 84 + - 29 + - - 78 * - 8 * - + 64 * - + 26 ), COALESCE ( - 45, 48 * 96 * + MAX ( ALL 21 ) ) ) + + 33 + - ( 38 + 34 ) THEN 82 * 5 WHEN 63 + 51 * 43 THEN NULL END * 18 + - 16 * + COUNT ( * )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT + 6 * CASE WHEN + 19 NOT BETWEEN NULL AND - 6 THEN NULL ELSE - COUNT ( * ) END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - COUNT ( * ) / + NULLIF ( + CAST ( ( - COUNT ( * ) ) AS INTEGER ), - ( 56 ) * 94 ) AS col1

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT 27 + CAST ( NULL AS INTEGER ) * + COUNT ( * ), CAST ( - - 75 AS INTEGER ) + 48 * CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["27","75"]
```


```sql
SELECT - 66 col2, CAST ( NULL AS REAL ) AS col2

Expected: ["-66","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1949 failed
* 80% was OK

Time: 21672ms

---- ---- ---- ---- ---- ---- ----
### 380/622 [`./test/random/expr/slt_good_119.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_119.test)

_Mimic sqlite_

```sql
SELECT + 57 / - - ( - ( + + 5 ) ) AS col2

Expected: ["-11"] but got ["-11.400"]
```


```sql
SELECT 62 * 42 + - 66 + + 15 * + + CAST ( NULL AS INTEGER ) * 94 * - + 43 + + 91 * + COUNT ( * )

Expected: ["NULL"] but got ["2629"]
```


```sql
SELECT 90 + CASE + + 47 WHEN + 41 THEN + COUNT ( * ) * - - NULLIF ( - 68, + SUM ( + 46 ) * + 29 ) WHEN - - NULLIF ( - COUNT ( DISTINCT - 11 ), - 21 ) THEN NULL END AS col2, + 32 * + 32 * + COUNT ( ALL 48 ) * - 16 + + + ( CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["NULL","-16384"]
```


```sql
SELECT ALL 21 * CAST ( - + COUNT ( * ) AS INTEGER ) + 64 * 29

g is not defined
```


```sql
SELECT CAST ( NULL AS REAL ), + 84 / + 16 AS col1

Expected: ["NULL","5"] but got ["NULL","5.250"]
```


```sql
SELECT ALL + 36 + CASE WHEN NOT + 82 = ( NULL ) THEN NULL ELSE + 86 * + COUNT ( - 7 ) + - 29 END * 67 col1

Expected: ["3855"] but got ["NULL"]
```


```sql
SELECT ALL 42 - - + 98 + + + 64, + 68 - + + CASE WHEN 89 BETWEEN - 80 + 5 AND 21 THEN 74 END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col1, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + - 74 + 9 AS col0, CASE - 77 WHEN + - 95 THEN NULL WHEN 82 + + + 62 THEN - 13 - - COALESCE ( - 6, + 64 / - CASE + - 66 WHEN 9 + - CAST ( NULL AS INTEGER ) + - 50 * 82 THEN NULL ELSE 62 END, 92 ) END AS col0

Expected: ["-65","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 8938 tests as sqlite

* 1720 failed
* 80% was OK

Time: 19818ms

---- ---- ---- ---- ---- ---- ----
### 381/622 [`./test/random/expr/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 80 * - COALESCE ( + - 45, - - COUNT ( * ) + + 62 + - MAX ( - + 32 ) * + 63 + + 55 ), + 37 / - 46 * + - MAX ( ALL - 32 ) * 83 AS col0

Expected: ["3600","0"] but got ["3600","-0.000"]
```


```sql
SELECT + MAX ( DISTINCT - + 82 ) - - 80 - + CAST ( NULL AS INTEGER ), + 78 * - - 86 AS col1

Expected: ["NULL","6708"] but got ["-2","6708"]
```


```sql
SELECT + + 74 / - CAST ( + ( + + MIN ( + 96 ) ) AS INTEGER ), 46 AS col0

g is not defined
```


```sql
SELECT - - 96 * 11 * + CASE WHEN NOT + 84 NOT BETWEEN 27 / 0 AND COALESCE ( + 61, + AVG ( 81 ) / + 39 + COUNT ( * ) ) THEN - 69 WHEN NULL > ( - 15 ) THEN NULL ELSE NULL END AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT - 63 - COUNT ( * ) + + COUNT ( * ) * ( - 14 ) / 45 + + + 50 * 31 + - 90 + + - COUNT ( * ) * COUNT ( * ) / - 79 * + + 29 AS col2, SUM ( + 39 ) * ( + SUM ( - 2 ) ) * 43 - + 46 * + 87 * + - 10 + - AVG ( DISTINCT + CAST ( NULL AS REAL ) ) * + + CASE + 56 WHEN - CASE 39 WHEN 55 THEN 89 / 31 + 7 * + ( NULLIF ( - 15, 89 - 63 * - 78 ) ) ELSE NULL END * 58 THEN NULL WHEN - ( 81 ) + - 86 THEN NULL E…

Expected: ["1396","NULL"] but got ["1395.689","NULL"]
```


```sql
SELECT ALL - 71 - CAST ( NULL AS INTEGER ), - CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["-71","0"]
```


```sql
SELECT ALL - 96 AS col1, + CAST ( NULL AS REAL ) * 8 * ( + + 64 ) - + + 5 AS col1

Expected: ["-96","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL + 26 + - 96 + - CAST ( NULL AS REAL ) AS col1, - 66 + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","-66"]
```


```sql
SELECT - CASE - + 61 WHEN - + 3 * - 72 THEN NULL WHEN + 89 THEN + 82 ELSE + 88 END / - COALESCE ( + CAST ( NULL AS INTEGER ), + 63, + 81 ) + MAX ( 27 ) + + - 28

Expected: ["0"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1985 failed
* 80% was OK

Time: 21286ms

---- ---- ---- ---- ---- ---- ----
### 382/622 [`./test/random/expr/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT ALL - ( - + 37 ) AS col1, - CAST ( NULL AS INTEGER )

Expected: ["37","NULL"] but got ["37","0"]
```


```sql
SELECT ( + - 6 ) / + - 66 - + - COUNT ( * ) * + 17

Expected: ["17"] but got ["17.091"]
```


```sql
SELECT ALL + COUNT ( * ) * + + 25 + 37 + + 81 / 68, CASE + - COUNT ( * ) WHEN - + 26 THEN NULL WHEN + - 56 / 13 + ( 54 ) + 72 + 31 - + - COUNT ( * ) * - 67 * + 0 + - 67 - - 76 * 76 * - 36 THEN - 20 + - + ( + 42 ) - + 67 END col0

Expected: ["63","NULL"] but got ["63.191","NULL"]
```


```sql
SELECT + 59 + + + 4 + - + 95 + - + 98 AS col0, 77 + - + CASE WHEN - NULLIF ( + - 74, 92 ) BETWEEN 31 * + 52 * - + 84 + - 50 + - COUNT ( * ) AND - 76 * + 40 - ( + 34 ) THEN - 36 ELSE NULL END

Cannot read property 'toString' of undefined
```


```sql
SELECT + CAST ( + COUNT ( * ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT ALL - + 39 * - + 30 AS col1, CASE - 9 WHEN + 78 THEN + 39 WHEN - + 68 * ( + - 80 ) THEN + 32 + - - 84 ELSE NULL END col1

Expected: ["1170","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT CASE 75 WHEN - - 41 THEN 43 END AS col1, COUNT ( * ) + - ( + CAST ( NULL AS INTEGER ) ) / 87

Expected: ["NULL","NULL"] but got ["NULL","1"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + - 22 + + 73 AS col0, + 17 + + + MIN ( + - CAST ( NULL AS INTEGER ) ) + + + 10 + + 88 * + 79 AS col2

Expected: ["NULL","NULL"] but got ["51","6979"]
```


```sql
SELECT + COUNT ( * ) * + CASE WHEN NOT - COALESCE ( + 30, + ( + 65 ) + - COUNT ( * ) / + 0 + - + 45, + COUNT ( * ) / 80 ) < NULL THEN - 1 WHEN ( NULL ) NOT IN ( 71 ) THEN NULL ELSE - COUNT ( * ) - 85 END + - COUNT ( * ) / CAST ( 76 * COUNT ( * ) - 10 AS INTEGER )

Expected: ["-86"] but got ["NULL"]
```


```sql
SELECT COUNT ( * ) / + CAST ( ( - - 7 ) AS INTEGER ) AS col0

Expected: ["0"] but got ["0.143"]
```

#### ☓ Ran 10012 tests as sqlite

* 1540 failed
* 84% was OK

Time: 18568ms

---- ---- ---- ---- ---- ---- ----
### 383/622 [`./test/random/expr/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_14.test)

_Mimic sqlite_

```sql
SELECT + 4 / SUM ( ALL - 26 )

Expected: ["0"] but got ["-0.154"]
```


```sql
SELECT DISTINCT 67 + + 50 + + 0 - CAST ( NULL AS INTEGER ) * COUNT ( * )

Expected: ["NULL"] but got ["117"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * + 54, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL - 74 - + + CAST ( - COUNT ( + 82 ) AS INTEGER ) * - + 80, + ( - + 21 ) AS col2

g is not defined
```


```sql
SELECT ALL COALESCE ( + 62, - NULLIF ( + 38, - COALESCE ( - 15, 92 + 11 + - 40, + ( + - CASE + 4 WHEN + 28 / - - COUNT ( * ) * CASE - 94 WHEN - 98 THEN NULL ELSE - 54 END + + 68 * + COUNT ( * ) THEN NULL WHEN CASE - 76 WHEN 91 THEN + 72 END THEN ( 17 ) * + 96 WHEN + 57 THEN NULL END ) * 90 ) + 20 * ( + AVG ( DISTINCT - 7 ) * COUNT ( * ) + CASE WHEN + 5 IS NOT NULL THEN + 80 * 89 + COALESCE ( 29, …

Cannot read property 'toString' of undefined
```


```sql
SELECT MIN ( + + 69 ) * + - CAST ( NULL AS REAL ) col2, SUM ( - + 34 ) / + ( + 92 ) * - + 45 + 59 * - 88

Expected: ["NULL","-5192"] but got ["NULL","-5191.992"]
```


```sql
SELECT - MIN ( DISTINCT 99 ) / - - CAST ( NULL AS INTEGER ) - - + 86 * - MIN ( ALL ( - CAST ( + 93 AS INTEGER ) ) ), 0 * + + 98 + CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - NULLIF ( COALESCE ( + + CAST ( NULL AS INTEGER ), + 20 ), 0 ) AS col1

Expected: ["-20"] but got ["NULL"]
```


```sql
SELECT + - 71 AS col2, - 53 / + CAST ( NULL AS INTEGER ) * + + 74 AS col2

Expected: ["-71","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1984 failed
* 80% was OK

Time: 21154ms

---- ---- ---- ---- ---- ---- ----
### 384/622 [`./test/random/expr/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_15.test)

_Mimic sqlite_

```sql
SELECT - - COUNT ( * ) col0, + 43 AS col0

Expected: ["1","43"] but got ["43"]
```


```sql
SELECT COUNT ( * ) + + - AVG ( DISTINCT + - 86 ) * - - 22 + CAST ( NULL AS INTEGER ) - - 86

Expected: ["NULL"] but got ["1979"]
```


```sql
SELECT ALL - CAST ( + 72 AS INTEGER ) * - 37 AS col0, + CAST ( NULL AS REAL ) col0

Expected: ["2664","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - CASE WHEN NOT ( NOT + 61 NOT BETWEEN + 95 * + 46 AND - 46 * - - 50 + + - 85 ) THEN - 0 END + - NULLIF ( + - 47, 61 ) + + - 33 * + 48

Cannot read property 'toString' of undefined
```


```sql
SELECT 22 * CAST ( + COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT COALESCE ( 83, - 86 + 21 - + + 82 * - 17 ) - + CASE 15 WHEN 46 THEN + COUNT ( * ) * + + 90 + + 74 END + - 20 + + 91 * - 42, + 77 + - MAX ( - ( - + 5 ) ) + - 24 / ( + 57 ) AS col2

Expected: ["NULL","72"] but got ["NULL","71.579"]
```


```sql
SELECT 62 / CAST ( + - COUNT ( * ) AS INTEGER ) * - ( + 77 ) + - 7 * COALESCE ( NULLIF ( 11, - 3 * - 53 + + 66 * + COUNT ( * ) ), ( 62 ), 69 )

Expected: ["4697"] but got ["NULL"]
```


```sql
SELECT ALL + COALESCE ( + + 74, 36, + 97 ) + - 58 - + 59 + ( - CAST ( NULL AS INTEGER ) ) / - + 69 AS col1, - CASE - NULLIF ( + COALESCE ( - 45, + 48, + ( ( 54 ) ) ), - 71 ) WHEN COUNT ( * ) THEN - 75 WHEN + 70 THEN NULL ELSE NULL END * - 8

Expected: ["NULL","NULL"] but got ["-43","NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) * NULLIF ( - 86, - NULLIF ( - 90, + - COUNT ( + 16 ) + COUNT ( * ) * + + 63 * + 30 ) ) AS col1, CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1986 failed
* 80% was OK

Time: 21427ms

---- ---- ---- ---- ---- ---- ----
### 385/622 [`./test/random/expr/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_16.test)

_Mimic sqlite_

```sql
SELECT ALL 9 / - 58 AS col1

Expected: ["0"] but got ["-0.155"]
```


```sql
SELECT - 65 + - CAST ( NULL AS INTEGER ) * - 37 / - - 81

Expected: ["NULL"] but got ["-65"]
```


```sql
SELECT ALL + CAST ( - - SUM ( + 86 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL MIN ( DISTINCT 76 ) * - SUM ( DISTINCT CAST ( NULL AS INTEGER ) ) AS col2, - CAST ( NULL AS INTEGER ) + - 15 AS col2

Expected: ["NULL","NULL"] but got ["-15"]
```


```sql
SELECT + - 11 / + 9 AS col1, - CASE + COUNT ( + 73 ) WHEN + + SUM ( + 18 ) * - 21 THEN - 41 END

Expected: ["-1","NULL"] but got ["-1.222","NULL"]
```


```sql
SELECT - 20 * + 99 - - CASE WHEN + COALESCE ( - 65, - 99, - AVG ( ALL NULLIF ( + + 50, + 42 * + 88 ) ) + - 28 ) BETWEEN - 51 AND ( NULL ) THEN NULL WHEN NOT ( NOT ( NULL < NULL ) ) THEN - 3 END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT COUNT ( * ) + - - NULLIF ( + ( + 57 ), 57 + - MAX ( ALL + 96 + + 2 ) * CAST ( NULL AS INTEGER ) ) + + ( - 40 + - 96 * + 59 )

Expected: ["-5646"] but got ["NULL"]
```


```sql
SELECT DISTINCT - 81 - - + CASE 21 WHEN 29 THEN + COUNT ( * ) WHEN COUNT ( * ) * - 12 + + 55 THEN NULL ELSE NULL END + + 70 AS col1, - CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT 51 AS col0, CASE 87 WHEN - + 70 THEN 78 WHEN - - 15 THEN NULL END AS col0

Expected: ["51","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1921 failed
* 80% was OK

Time: 21771ms

---- ---- ---- ---- ---- ---- ----
### 386/622 [`./test/random/expr/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_17.test)

_Mimic sqlite_

```sql
SELECT + 91 / 32 / + 15 + CAST ( - - CAST ( + + ( + - 90 ) AS INTEGER ) AS INTEGER )

Expected: ["-90"] but got ["-89.810"]
```


```sql
SELECT + + 64 * CAST ( NULL AS INTEGER ) + 87 AS col1

Expected: ["NULL"] but got ["87"]
```


```sql
SELECT ALL + 16 - + 93 + - ( + CAST ( NULL AS INTEGER ) ) * 76 + + 62 + + 28 / - 97 * COUNT ( - 3 ) / - + AVG ( + - 45 ) - 77 * - 99 + 96 AS col2, + 37 * + - COALESCE ( NULLIF ( + 26, + 36 ), + 17, + 92 + 29 ), + 3 - ( - 64 ) + CAST ( NULL AS INTEGER ) - 28 + + COUNT ( * ) * + 77 AS col0

Expected: ["NULL","-962","NULL"] but got ["7691.010","-962","116"]
```


```sql
SELECT ALL - 67 * CAST ( - CASE + 52 WHEN ( COUNT ( ALL 17 ) ) * COUNT ( * ) THEN + 23 - - 88 ELSE NULL END AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT + COUNT ( * ) AS col0, - COUNT ( * ) * - 88 - + 13 - + COUNT ( * ) + - COUNT ( * ) + 33 / CAST ( NULL AS INTEGER ) AS col0

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + 67 * + - 21 * - + COUNT ( * ) / + CAST ( - COUNT ( * ) AS INTEGER ) AS col2

Expected: ["-1407"] but got ["NULL"]
```


```sql
SELECT ALL ( 9 ) * - - 17 + + 77 / - - 66 + CAST ( NULL AS INTEGER ) + + COUNT ( * ) AS col1, - CAST ( NULL AS REAL )

Expected: ["NULL","NULL"] but got ["155.167","NULL"]
```


```sql
SELECT ALL + 14 - + NULLIF ( - CASE WHEN NULL BETWEEN ( NULL ) AND ( + COUNT ( * ) ) THEN NULL ELSE + COALESCE ( + + 41, + - COUNT ( * ) + 99 ) - - - 10 END, + NULLIF ( - - 66, - 73 + + - ( + + CASE - COUNT ( * ) WHEN 26 / 78 - - 45 * 74 THEN 31 * 80 END ) ) * 20 ) + + COUNT ( * ) * + 21 * - 57

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + 31 AS col1, CASE - + 2 WHEN - - CAST ( NULL AS REAL ) THEN - 15 WHEN + 18 THEN NULL END AS col1

Expected: ["31","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 83 / - + 80

Expected: ["-1"] but got ["-1.038"]
```

#### ☓ Ran 10012 tests as sqlite

* 1940 failed
* 80% was OK

Time: 21476ms

---- ---- ---- ---- ---- ---- ----
### 387/622 [`./test/random/expr/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_18.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 55 * 70 / 95 AS col1

Expected: ["40"] but got ["40.526"]
```


```sql
SELECT + 34 * 92 + + COUNT ( * ) * - 80 col0, - 1 * + - CAST ( NULL AS INTEGER )

Expected: ["3048","NULL"] but got ["3048","0"]
```


```sql
SELECT 47 + + CAST ( + 69 - - AVG ( + 51 ) * 14 AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT DISTINCT CASE WHEN NOT 4 NOT BETWEEN - CASE + 23 WHEN - + CASE + 63 WHEN 13 THEN - + COUNT ( * ) * + COUNT ( ALL - 82 ) + - + 91 ELSE CASE + 97 WHEN ( + - SUM ( ALL - 37 ) ) + + NULLIF ( - 20, 42 - ( ( 79 ) ) * 9 ) * 21 THEN NULL ELSE - 74 - 41 END / + 21 END THEN - COUNT ( * ) ELSE 13 END AND + 11 + 35 THEN NULL WHEN NOT NULL IS NOT NULL THEN 45 END

Cannot read property 'toString' of undefined
```


```sql
SELECT + AVG ( DISTINCT - CAST ( NULL AS INTEGER ) ), + 64 + + + CAST ( NULL AS REAL )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT ALL - 27 AS col2, CASE 33 WHEN + 43 THEN NULL WHEN - ( - 21 ) THEN + 7 END * + - NULLIF ( - ( - ( + + COALESCE ( - ( - CAST ( NULL AS INTEGER ) ), - - ( 66 ) ) ) ), 44 + + COALESCE ( + 95, 17 + - 76 ) * - 90 ) * - COUNT ( * ) - 83 * 68 - + CASE - + COUNT ( - ( 86 ) ) WHEN + + COALESCE ( 75, + 50 ) THEN NULL ELSE - 68 END AS col2

Expected: ["-27","NULL"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) * + 56 + + 64 * 93 AS col2

Expected: ["NULL","NULL"] but got ["0","5952"]
```


```sql
SELECT ALL + 77 AS col0, CASE + 52 WHEN 60 THEN + - CAST ( NULL AS INTEGER ) * ( - 86 ) END AS col0

Expected: ["77","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT COUNT ( ALL + 84 ) * 66 / + + CAST ( - MAX ( ALL ( + - ( 55 ) ) ) AS INTEGER ) + 30

Expected: ["31"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1956 failed
* 80% was OK

Time: 20978ms

---- ---- ---- ---- ---- ---- ----
### 388/622 [`./test/random/expr/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_19.test)

_Mimic sqlite_

```sql
SELECT CAST ( + + COUNT ( * ) AS INTEGER ) - + COUNT ( * ) + - 39 * + 90 * - 52

Expected: ["182520"] but got ["182519"]
```


```sql
SELECT ALL + 48 - COUNT ( * ) * - CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL"] but got ["48"]
```


```sql
SELECT - 7 + - 15 * + 34 + + NULLIF ( - + CAST ( + ( + ( COUNT ( * ) ) ) AS INTEGER ), - 44 + COALESCE ( + 70, ( - 10 ) ) + 52 )

g is not defined
```


```sql
SELECT 41 + - - 73 - 11 + - 47 + CASE WHEN + + 30 IS NOT NULL AND NOT + CAST ( + 33 AS INTEGER ) / 32 * + 57 - COUNT ( * ) >= CASE + + CAST ( + CAST ( NULL AS INTEGER ) AS REAL ) WHEN - - COALESCE ( - 46, + + MIN ( - 61 ) * - 54, + 96 ) + 67 + SUM ( DISTINCT - 74 ) + - ( 1 ) THEN NULL WHEN - - 96 THEN 76 * 73 ELSE NULL END THEN NULL WHEN CASE + 10 WHEN + 46 + - + CASE + - 41 WHEN - + 60 THEN - 94…

Cannot read property 'toString' of undefined
```


```sql
SELECT CASE WHEN NOT COUNT ( DISTINCT 31 ) IS NOT NULL THEN + 73 * + COALESCE ( CASE + 21 WHEN 5 THEN 63 ELSE NULL END, - COUNT ( * ) ) WHEN NOT NULL <= NULL THEN NULL ELSE + 36 * - ( ( - 44 ) ) + + 83 END * + COUNT ( * ) AS col1

Expected: ["1667"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - + COUNT ( * ) AS col0, + NULLIF ( NULLIF ( - CAST ( NULL AS REAL ), - 79 * + 99 + 73 * + NULLIF ( 30, + 31 ) ), - 97 ) / 76 - - 42 * + 85 AS col0

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT + 34 - - 13 + - MAX ( ALL 3 ) * - - 45 * + CAST ( NULL AS INTEGER ) * + 57 * - SUM ( - 73 ), - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["47","0"]
```


```sql
SELECT DISTINCT MIN ( - 25 ) / - ( - + 86 ) + + 82 AS col2, - CASE - 0 WHEN - - CASE - 24 WHEN + 84 * - 41 THEN NULL ELSE COUNT ( + 23 ) END THEN - COUNT ( * ) * 49 * - 50 + + 93 WHEN - 72 * 10 THEN NULL ELSE NULL END + + 51

Expected: ["82","NULL"] but got ["81.709","NULL"]
```


```sql
SELECT ALL + - 65 AS col1, CASE 21 WHEN - + 58 THEN - 42 * 9 WHEN + 24 THEN - - 39 END AS col1

Expected: ["-65","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1918 failed
* 80% was OK

Time: 21124ms

---- ---- ---- ---- ---- ---- ----
### 389/622 [`./test/random/expr/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_2.test)

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
SELECT ALL - MAX ( - 84 ) + + + CAST ( NULL AS REAL ) AS col0, 10

Expected: ["NULL","10"] but got ["10","NULL"]
```


```sql
SELECT + CASE + COUNT ( * ) WHEN + COALESCE ( + MAX ( DISTINCT - 17 ), 72 - + - 86 + + ( - CASE WHEN ( + CASE - 8 WHEN - 7 THEN NULL WHEN - 70 * + 18 THEN NULL ELSE 82 * + ( - - MIN ( + 47 ) ) + - SUM ( DISTINCT 97 ) END ) BETWEEN - 13 * + 57 AND - COUNT ( * ) * - 74 THEN 89 WHEN NOT - 12 >= NULL THEN NULL ELSE NULL END ) * - 27, 40 / 27 - + 34 ) THEN 89 WHEN - COUNT ( + 4 ) - CASE 90 WHEN ( - CO…

Cannot read property 'toString' of undefined
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

* 1352 failed
* 86% was OK

Time: 17516ms

---- ---- ---- ---- ---- ---- ----
### 390/622 [`./test/random/expr/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_20.test)

_Mimic sqlite_

```sql
SELECT - CAST ( NULL AS INTEGER ) + + + COALESCE ( + 95, + MAX ( ALL + 16 ) ) * - COUNT ( * ) - + NULLIF ( 25, - COALESCE ( + - 75, + 50 ) + - 93 ) * + + ( + 11 ) * + 70, + 39 * 94 col1

Expected: ["NULL","3666"] but got ["-19345","3666"]
```


```sql
SELECT DISTINCT NULLIF ( + - COUNT ( * ), - + 40 * + 58 * + + 37 ) / MAX ( DISTINCT 31 ) - - 48 + - 37 - + 15 * 56

Expected: ["-829"] but got ["-829.032"]
```


```sql
SELECT - CAST ( COALESCE ( - ( + + 86 ), + 25 + - AVG ( + 39 ), - - 16 / COUNT ( * ) ) AS INTEGER ) * 92 col0

g is not defined
```


```sql
SELECT 48 * + 8 AS col1, + 95 + + + 99 * + 1 + - CASE + CAST ( NULL AS INTEGER ) WHEN - 58 THEN NULL WHEN + - 53 THEN NULL ELSE 71 * - 11 - 12 * - 81 / + 29 + - 27 + 89 + - + CAST ( - COUNT ( * ) AS INTEGER ) + + + 86 + COUNT ( - + 35 ) END + + CASE - + ( + SUM ( 45 ) ) WHEN - - CASE + 70 WHEN + 22 + SUM ( DISTINCT + - 72 ) + 39 THEN + ( 12 ) + 45 ELSE NULL END THEN NULLIF ( 25, + SUM ( ALL - 85 …

Expected: ["384","NULL"] but got ["NULL"]
```


```sql
SELECT + CASE SUM ( + CASE - 65 WHEN - 8 THEN + 98 WHEN 56 THEN NULL ELSE NULL END ) WHEN CAST ( NULL AS INTEGER ) THEN NULL ELSE + 20 * + CAST ( - + 19 AS INTEGER ) + - COUNT ( * ) + + COUNT ( * ) END + + 22 / - COALESCE ( - 33, MAX ( DISTINCT + 16 ), - + 14 ) AS col2, COUNT ( ALL - ( + + 76 ) ) AS col0

Expected: ["-380","1"] but got ["NULL","1"]
```


```sql
SELECT - - CAST ( NULL AS INTEGER ), + CAST ( NULL AS REAL ) AS col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT 31 - + CAST ( NULL AS INTEGER ), - 93 * - CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["31","0"]
```


```sql
SELECT ALL - CASE WHEN NULL NOT BETWEEN + 32 AND - 99 THEN - 47 ELSE + 25 END * 54 + 69

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 1951 failed
* 80% was OK

Time: 21677ms

---- ---- ---- ---- ---- ---- ----
### 391/622 [`./test/random/expr/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_21.test)

_Mimic sqlite_

```sql
SELECT + CASE 68 WHEN - 34 * - - COUNT ( DISTINCT + - 96 ) THEN MIN ( ALL - ( ( - 14 ) ) ) ELSE + - COUNT ( * ) + - 89 * - + CAST ( NULL AS INTEGER ) * + + 20 END * + 87 / 5 / + 43 + - + 57 * 61 * 64

Expected: ["NULL"] but got ["-222528.405"]
```


```sql
SELECT - MIN ( - 0 ) + - + ( + - 82 ) - - COUNT ( * ) / + 57

Expected: ["82"] but got ["82.018"]
```


```sql
SELECT DISTINCT CAST ( COUNT ( * ) AS REAL ) + - + 92 + - 50 - + + COALESCE ( 74, 24 ) * + CAST ( NULL AS REAL ) * + 85 AS col2

g is not defined
```


```sql
SELECT + 60 * - CASE + 96 WHEN + SUM ( ALL + + 14 ) THEN - 33 / - 19 END, 67 * 54 * + CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + 58 + + 55 * CAST ( NULL AS REAL ) + 54 + + 77 + AVG ( DISTINCT - 74 ) AS col2, 73

Expected: ["NULL","73"] but got ["73","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - - MIN ( ALL 9 ), - SUM ( DISTINCT CASE 93 WHEN 89 THEN - 84 * - 39 ELSE NULL END ) * - 7 AS col2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + COUNT ( * ) / - - COALESCE ( - ( + CAST ( NULL AS INTEGER ) ), - 17 + + + 22 ) * + + 42 * + + 48 - 20 - + COUNT ( * ) AS col2

Expected: ["-21"] but got ["NULL"]
```


```sql
SELECT ALL - CASE WHEN 86 BETWEEN - - AVG ( ALL - 94 ) - - 0 AND ( + + 20 * - - 22 / - 11 + 31 * - AVG ( - 46 ) + + 8 + CAST ( NULL AS INTEGER ) ) THEN - 43 * 92 END AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + 75 AS col0, 85 / - + CASE + + 91 WHEN 50 / 26 THEN - 11 ELSE NULL END * + 80 col0

Expected: ["75","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1950 failed
* 80% was OK

Time: 20929ms

---- ---- ---- ---- ---- ---- ----
### 392/622 [`./test/random/expr/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_22.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - - SUM ( 80 ) / - + 13 + CAST ( + COALESCE ( + 90, ( - CAST ( NULL AS INTEGER ) ) + + - COUNT ( * ) ) AS INTEGER )

Expected: ["84"] but got ["83.846"]
```


```sql
SELECT DISTINCT - 63 * - + CAST ( NULL AS INTEGER ) * - 99 AS col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT 54 * 98 / CASE WHEN + 72 NOT BETWEEN ( + 77 ) AND - 98 THEN + COUNT ( * ) ELSE NULL END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - - 94 - CAST ( - COUNT ( * ) AS INTEGER ) + - 61

g is not defined
```


```sql
SELECT - 19 AS col0, - CASE + COUNT ( * ) WHEN - 92 THEN + 12 END AS col0

Expected: ["-19","NULL"] but got ["NULL"]
```


```sql
SELECT + SUM ( ALL + 25 ) + - 94 + + ( - 4 ) / + + CAST ( AVG ( - 89 ) AS INTEGER ) + - - COUNT ( * ) / + 80 + + 50 * + 27

Expected: ["1281"] but got ["NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + + ( 72 ) / 16 AS col1, + CASE + 59 WHEN - - 24 THEN - CAST ( 8 AS INTEGER ) WHEN + + 72 + + + COUNT ( * ) THEN + 13 WHEN 37 * + 37 + - COUNT ( * ) * + 24 + 60 + - - MIN ( ALL + 77 ) THEN NULL ELSE NULL END col2

Expected: ["NULL","NULL"] but got ["4.500","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1880 failed
* 81% was OK

Time: 20799ms

---- ---- ---- ---- ---- ---- ----
### 393/622 [`./test/random/expr/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_23.test)

_Mimic sqlite_

```sql
SELECT - + 35 / - + 59 + + 31

Expected: ["31"] but got ["31.593"]
```


```sql
SELECT ALL + 9 col2, CASE COUNT ( * ) WHEN + 16 THEN - 53 + + 65 WHEN + 10 THEN NULL ELSE MAX ( DISTINCT - ( + CASE WHEN NOT ( NULL ) NOT BETWEEN CAST ( NULL AS INTEGER ) AND - COALESCE ( ( 22 ), 8 ) THEN + 10 + - 79 * 91 ELSE NULL END ) ) END * - 24

Cannot read property 'toString' of undefined
```


```sql
SELECT CASE + 55 WHEN - 4 THEN 97 * - 7 + - NULLIF ( - 30, + 32 ) WHEN 38 THEN 28 * 85 + - 98 * + MIN ( 59 ) ELSE + ( + CAST ( NULL AS INTEGER ) ) END col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL CAST ( + AVG ( ALL + - 2 ) AS INTEGER ) / + 44 + 12

g is not defined
```


```sql
SELECT DISTINCT + 16 + 47 + + - 54 + - 40 + + + 78 / + SUM ( ALL - - 31 ) * - CAST ( - COUNT ( * ) AS INTEGER ) + - CAST ( - NULLIF ( 66, 42 ) AS INTEGER )

Expected: ["37"] but got ["NULL"]
```


```sql
SELECT - - 45 + - - 94 + + 60 AS col1, CASE + 59 WHEN + + COUNT ( * ) / + 98 + + + 9 * - 52 THEN 35 END / 94 AS col1

Expected: ["199","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + - ( - CAST ( NULL AS INTEGER ) ), CAST ( NULL AS INTEGER ) * 84 * COUNT ( * ) * + 5 AS col0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL - - COUNT ( * ) * - ( + CAST ( - - 11 AS INTEGER ) ) + - CAST ( NULL AS INTEGER ) - - 73 + 91 * - COUNT ( * ) * 26 * + COUNT ( * ), 67 / + + CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["-2304","NULL"]
```


```sql
SELECT - 76 + - + 5 AS col2, + 43 + CAST ( NULL AS REAL ) col2

Expected: ["-81","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1927 failed
* 80% was OK

Time: 20946ms

---- ---- ---- ---- ---- ---- ----
### 394/622 [`./test/random/expr/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_24.test)

_Mimic sqlite_

```sql
SELECT + + 6 / - + 77

Expected: ["0"] but got ["-0.078"]
```


```sql
SELECT 84 + - + CAST ( NULL AS INTEGER ) - + - CAST ( ( 38 ) AS REAL ) AS col1

Expected: ["NULL"] but got ["122"]
```


```sql
SELECT CAST ( SUM ( + 87 ) AS INTEGER ) + 13 col2

g is not defined
```


```sql
SELECT 44 AS col1, - CASE + 45 WHEN - - 27 * - 25 * - 91 THEN COALESCE ( + 19, + 5, + - 46 + - 63 ) WHEN + COUNT ( DISTINCT + 34 ) * AVG ( ALL 96 ) THEN + COUNT ( * ) WHEN 67 / + SUM ( ALL - 65 ) THEN + 2 + COUNT ( * ) * 56 END AS col1

Expected: ["44","NULL"] but got ["NULL"]
```


```sql
SELECT - 29 / - - COALESCE ( + CAST ( NULL AS INTEGER ), 24 * ( + - 18 ) * - 2, - 57, - 97 ) + 20

Expected: ["20"] but got ["NULL"]
```


```sql
SELECT + + CASE - - 77 WHEN 27 THEN - + 41 WHEN 74 * 16 THEN NULL ELSE NULL END, - MIN ( + - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + 63 AS col1, + CASE 54 WHEN + 8 + - 38 THEN + + 25 * + + 46 + + 30 + + 12 ELSE NULL END AS col1

Expected: ["63","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + + 13 / - - COUNT ( * ), + CASE WHEN NOT + ( 39 ) BETWEEN 86 + SUM ( ALL 1 ) * + 57 + + 57 - - + 26 AND + + 95 THEN - CASE WHEN 3 < 28 THEN + + ( + 78 ) END ELSE NULL END / - - ( + SUM ( DISTINCT 73 ) ) - - 66 - + + MIN ( ALL 61 ) + - + ( - COUNT ( * ) ) * 43 * - 78 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 48 / 49 * - CAST ( NULL AS INTEGER ) * - 14 * + 21, ( CAST ( NULL AS INTEGER ) ) AS col2

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1723 failed
* 82% was OK

Time: 19429ms

---- ---- ---- ---- ---- ---- ----
### 395/622 [`./test/random/expr/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_25.test)

_Mimic sqlite_

```sql
SELECT + 13 + + 12 / - 23

Expected: ["13"] but got ["12.478"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - - 9 AS col1, ( 44 ) AS col1

Expected: ["NULL","44"] but got ["44","44"]
```


```sql
SELECT DISTINCT CAST ( - COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT + MIN ( + + 67 ), 63 / - CAST ( - COUNT ( * ) AS INTEGER ) AS col2

Expected: ["67","63"] but got ["67","NULL"]
```


```sql
SELECT CASE 7 WHEN 79 / - COUNT ( * ) + - - COUNT ( 91 ) + + + 95 + - 41 + - CASE - MIN ( DISTINCT + 90 ) WHEN - 14 + + 81 * 50 THEN 87 WHEN + + 96 THEN + + 13 WHEN - - 34 THEN NULL ELSE - - SUM ( DISTINCT 91 ) / ( - - 64 ) END * - + 7 THEN - 98 - - - CAST ( NULL AS INTEGER ) ELSE NULL END + 67 AS col1, 21

Expected: ["NULL","21"] but got ["21","NULL"]
```


```sql
SELECT DISTINCT + NULLIF ( - 97, + COUNT ( * ) * - 42 + + ( 36 ) + - COALESCE ( + 36, + - 1 ) + - 65 + - 13 * + - 31 * + + CAST ( NULL AS INTEGER ) ), CASE WHEN + 69 BETWEEN + + 58 * + NULLIF ( - + ( - - 71 ), - 40 ) * + + 81 * - 21 + + 89 - + 53 + + 2 AND NULL THEN - COUNT ( * ) END * COUNT ( * ) col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL 74 + + 51 - - - CAST ( NULL AS INTEGER ) * - 9, - ( - - CAST ( NULL AS INTEGER ) ) AS col1

Expected: ["NULL","NULL"] but got ["125","0"]
```


```sql
SELECT DISTINCT - - CAST ( NULL AS INTEGER ) AS col0, + CAST ( NULL AS REAL ) + - 66 AS col2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1723 failed
* 82% was OK

Time: 19586ms

---- ---- ---- ---- ---- ---- ----
### 396/622 [`./test/random/expr/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_26.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - 82 + + 56 / - + 27 AS col2

Expected: ["-84"] but got ["-84.074"]
```


```sql
SELECT ALL CAST ( + CASE - 46 WHEN - + 95 THEN 90 * - - 2 + - - 99 - - - 40 ELSE NULL END AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( + - COUNT ( * ) AS INTEGER ) col1

g is not defined
```


```sql
SELECT + - CASE WHEN NOT ( + AVG ( ALL + 41 ) BETWEEN + 49 + 6 + + 32 AND + 57 / - 19 ) THEN NULL ELSE - 4 * - - 63 / - + 62 END + - ( + - 3 ) - + 63 * + + 64 * + COUNT ( * ) + - 2 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT 17 / - - COALESCE ( CAST ( NULL AS INTEGER ), + 48 * 7 + - 37 ) + - 16 AS col1

Expected: ["-16"] but got ["NULL"]
```


```sql
SELECT ALL - CASE - ( - COALESCE ( + - 90, + CAST ( - 79 AS INTEGER ) ) ) WHEN 59 THEN NULL WHEN + 17 THEN - 42 ELSE NULL END * + 30 + - - COUNT ( * ) - - COUNT ( ALL + 7 ) + + 51 AS col2, 83

Expected: ["NULL","83"] but got ["83","NULL"]
```


```sql
SELECT DISTINCT 66 AS col2, CAST ( NULL AS REAL ) AS col2

Expected: ["66","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * + 33 AS col2, 44 / - - 51 / - CAST ( NULL AS INTEGER ) + - 79 + + 39 - - 52 * 78 * - 96 AS col2

Expected: ["NULL","NULL"] but got ["-389416","-389416"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * + + 13 + + + 79, CAST ( NULL AS REAL ) AS col2

Expected: ["NULL","NULL"] but got ["79","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1738 failed
* 82% was OK

Time: 19604ms

---- ---- ---- ---- ---- ---- ----
### 397/622 [`./test/random/expr/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_27.test)

_Mimic sqlite_

```sql
SELECT ALL 13 AS col1, 10 / 84

Expected: ["13","0"] but got ["13","0.119"]
```


```sql
SELECT ALL - MIN ( DISTINCT - 19 ) + + SUM ( DISTINCT 93 ) + + 48 + + + SUM ( DISTINCT + + 89 ) + + + CAST ( NULL AS INTEGER ) * - - CAST ( - COUNT ( * ) AS INTEGER ) * + - 97 * COUNT ( * )

Expected: ["NULL"] but got ["249"]
```


```sql
SELECT DISTINCT - CAST ( COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT DISTINCT - + 57 + - COUNT ( * ) + + 8 * - 46 col1, + 61 * + 79 + + CASE 36 WHEN 1 THEN NULL WHEN 97 THEN - - 26 END AS col1

Expected: ["-426","NULL"] but got ["NULL"]
```


```sql
SELECT - 99 / - 49 * + - CAST ( COUNT ( * ) AS INTEGER ) + - 29 + - 90 / - - 45 + - NULLIF ( + 31, - 98 * - 28 ) + - + 13 * - 41 * - 2 * + + COUNT ( * ) AS col2, - 8 * - 44 * - + CAST ( - + 17 AS INTEGER ) * + - COALESCE ( + 0, + 81 )

Expected: ["-1130","0"] but got ["NULL","0"]
```


```sql
SELECT CASE WHEN COUNT ( * ) BETWEEN - - ( + + 93 ) AND + - NULLIF ( + 36, + 80 ) * + 5 THEN - 31 ELSE NULL END, 84 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT - 61 / + 21 - + ( + COUNT ( * ) ) * CAST ( NULL AS REAL ) * 12 * + 82 AS col2, + 83 * - CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL CAST ( - - CASE + 81 WHEN - 91 THEN + 37 END AS INTEGER ), + MAX ( ALL - - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - + 46 AS col2, CASE 10 WHEN + 84 THEN 33 / + + 74 ELSE NULL END col2

Expected: ["-46","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1699 failed
* 83% was OK

Time: 20146ms

---- ---- ---- ---- ---- ---- ----
### 398/622 [`./test/random/expr/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_28.test)

_Mimic sqlite_

```sql
SELECT 27 + + COUNT ( * ) - + + 90 + + - 39 - 33 * CAST ( + + SUM ( - 31 ) AS INTEGER )

Expected: ["922"] but got ["-101"]
```


```sql
SELECT ALL 51 + CAST ( NULL AS INTEGER ) + - NULLIF ( 53, - ( COUNT ( * ) ) - - 89 ), 61 AS col0

Expected: ["NULL","61"] but got ["-2","61"]
```


```sql
SELECT + NULLIF ( + 7, CAST ( COUNT ( * ) AS INTEGER ) * 70 )

g is not defined
```


```sql
SELECT - NULLIF ( + SUM ( ALL + CAST ( NULL AS INTEGER ) ), - 62 / 16 + CAST ( ( - - NULLIF ( - 73, 50 + + - 55 + + 4 ) ) AS INTEGER ) - - - 91 ), CASE - COALESCE ( + 71, - 47, + 19 ) WHEN + - 22 / + - 11 THEN + CASE - - 54 WHEN + 83 THEN - 11 * + 80 ELSE 64 / - - 95 + 7 * NULLIF ( + 63 + CASE + ( 67 ) WHEN + 98 + + 2 THEN 29 + 72 END * 13, 56 * - COALESCE ( - COUNT ( * ), + 58, - 78, 24 * COUNT …

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - CASE WHEN 53 BETWEEN + 50 / 27 AND - 1 THEN + + ( - - COUNT ( * ) ) + + 26 + - + 65 + + ( - 59 ) + 41 * 48 + + + 42 END / - + COUNT ( * ), 0 * 35 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + - 38 + - COUNT ( * ) / - 82 AS col0, CASE + MIN ( DISTINCT - 97 ) WHEN + MIN ( ALL - 17 ) THEN 84 WHEN 28 THEN NULL ELSE NULL END

Expected: ["-38","NULL"] but got ["-37.988","NULL"]
```


```sql
SELECT - CASE COUNT ( * ) WHEN + 46 / + 30 THEN + + 13 END AS col1

Expected: ["-13"] but got ["NULL"]
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ) * - 64 col2, 95 - - - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","95"]
```

#### ☓ Ran 10012 tests as sqlite

* 1787 failed
* 82% was OK

Time: 19797ms

---- ---- ---- ---- ---- ---- ----
### 399/622 [`./test/random/expr/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_29.test)

_Mimic sqlite_

```sql
SELECT 47 / - 94

Expected: ["0"] but got ["-0.500"]
```


```sql
SELECT 80 * - 17 + 24 + AVG ( DISTINCT - + 20 ) * - 65 * - CAST ( NULL AS INTEGER ) + COALESCE ( COUNT ( * ), + 54 ) AS col0

Expected: ["NULL"] but got ["-1335"]
```


```sql
SELECT CAST ( COALESCE ( + SUM ( ALL 94 ), 5 ) AS INTEGER ) * 83 col2

g is not defined
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + - 22 + + 73 AS col0, + 17 + + + MIN ( + - CAST ( NULL AS INTEGER ) ) + + + 10 + + 88 * + 79 AS col2

Expected: ["NULL","NULL"] but got ["51","6979"]
```


```sql
SELECT - CASE + + 75 WHEN - 80 THEN + + 30 + - + 21 * + 37 END, + CAST ( NULL AS INTEGER ) + - 34 AS col1

Expected: ["NULL","NULL"] but got ["NULL","-34"]
```


```sql
SELECT ALL CAST ( - + COUNT ( * ) AS INTEGER ) AS col2, 29 * + CASE - 1 WHEN 97 THEN NULL WHEN 39 + + MAX ( DISTINCT - 88 ) * 19 * CASE - - 41 WHEN - 23 THEN NULL ELSE + + 40 END + COUNT ( * ) THEN + 29 - - 66 * + COUNT ( * ) END AS col1

Expected: ["-1","NULL"] but got ["0","NULL"]
```


```sql
SELECT - NULLIF ( + 55, - - ( 84 ) + + - 29 * - 66 ) * - 40 col1, - CASE + 84 WHEN 45 THEN + + 78 + - 11 + + 15 * - 99 / + - 72 WHEN 29 * + 64 THEN 52 END AS col1

Expected: ["2200","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ( + - CASE WHEN NULL BETWEEN NULL AND 93 THEN - CAST ( 90 AS INTEGER ) END ) AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT + COUNT ( * ) * + CASE WHEN NOT - COALESCE ( + 30, + ( + 65 ) + - COUNT ( * ) / + 0 + - + 45, + COUNT ( * ) / 80 ) < NULL THEN - 1 WHEN ( NULL ) NOT IN ( 71 ) THEN NULL ELSE - COUNT ( * ) - 85 END + - COUNT ( * ) / CAST ( 76 * COUNT ( * ) - 10 AS INTEGER )

Expected: ["-86"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1376 failed
* 86% was OK

Time: 17061ms

---- ---- ---- ---- ---- ---- ----
### 400/622 [`./test/random/expr/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_3.test)

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

* 1918 failed
* 80% was OK

Time: 21053ms

---- ---- ---- ---- ---- ---- ----
### 401/622 [`./test/random/expr/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_30.test)

_Mimic sqlite_

```sql
SELECT ALL 14 - + 61 * + + 94 + 93 + 87 / - 26

Expected: ["-5630"] but got ["-5630.346"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - - 97, - 28 - + - 62 + + COUNT ( * ) AS col0

Expected: ["NULL","35"] but got ["0","35"]
```


```sql
SELECT + + CAST ( - 51 AS INTEGER ) * - CAST ( - SUM ( + 27 ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT + COUNT ( * ) AS col2, - 72 * - 78 * - - 44 + COUNT ( * ) - CASE - 46 WHEN - 50 THEN NULL WHEN CAST ( ( + 20 ) AS INTEGER ) * - + COUNT ( * ) * 75 + + 2 THEN - 26 ELSE NULL END col2

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT + - 38 + AVG ( ALL + 92 ) + - 64 + - COUNT ( * ) - - COALESCE ( + - 40, - - 22 ) * CAST ( NULL AS INTEGER ) + - 78 * 1 * - 89 * 56, - 56 * + ( CAST ( NULL AS INTEGER ) ) * + 13 * + COUNT ( * ) * + - 67 AS col2

Expected: ["NULL","NULL"] but got ["388741","0"]
```


```sql
SELECT ALL 16 + 55 * - 78 + - - CAST ( NULL AS INTEGER ) - - COUNT ( * ) + - ( 90 ) + - COUNT ( * ) + COUNT ( DISTINCT + 84 ), 59 * - CASE - COUNT ( * ) WHEN + 80 + COALESCE ( + 15, + COALESCE ( - + COUNT ( * ), 6 ) + 58 * + COUNT ( * ) * - 77 * 0 * + 46, - 29 ) * - - ( + AVG ( DISTINCT 4 ) ) * - COUNT ( DISTINCT + 36 ) / - ( 24 ) + - COUNT ( * ) THEN + 38 END AS col2

Expected: ["NULL","NULL"] but got ["-4363","NULL"]
```


```sql
SELECT - 29 / - - COALESCE ( + CAST ( NULL AS INTEGER ), 24 * ( + - 18 ) * - 2, - 57, - 97 ) + 20

Expected: ["20"] but got ["NULL"]
```


```sql
SELECT ALL + 63 AS col1, + CASE 54 WHEN + 8 + - 38 THEN + + 25 * + + 46 + + 30 + + 12 ELSE NULL END AS col1

Expected: ["63","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + + 13 / - - COUNT ( * ), + CASE WHEN NOT + ( 39 ) BETWEEN 86 + SUM ( ALL 1 ) * + 57 + + 57 - - + 26 AND + + 95 THEN - CASE WHEN 3 < 28 THEN + + ( + 78 ) END ELSE NULL END / - - ( + SUM ( DISTINCT 73 ) ) - - 66 - + + MIN ( ALL 61 ) + - + ( - COUNT ( * ) ) * 43 * - 78 AS col0

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 1636 failed
* 83% was OK

Time: 18400ms

---- ---- ---- ---- ---- ---- ----
### 402/622 [`./test/random/expr/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_31.test)

_Mimic sqlite_

```sql
SELECT 20 / - - 96 + + + COUNT ( * ) AS col1

Expected: ["1"] but got ["1.208"]
```


```sql
SELECT - MIN ( - 37 ) / - 21 / CAST ( NULL AS INTEGER ) - - - 77 + 17 + 57 + + + 22 * ( - - 79 ) AS col1

Expected: ["NULL"] but got ["1735"]
```


```sql
SELECT ALL - 45 + - CAST ( - + COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL + CASE WHEN NOT NULL BETWEEN NULL AND 28 THEN 77 ELSE NULL END * + 55

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 65 AS col1, CASE 33 WHEN - + 16 * + + 88 + + 9 * - 98 THEN CASE 37 WHEN 53 / COUNT ( * ) THEN 75 WHEN - ( COALESCE ( 30, - COUNT ( * ) * + 94 - 38 ) ) THEN + 40 END WHEN 52 THEN - 46 WHEN - 56 THEN NULL WHEN + 50 THEN NULL ELSE NULL END + 88 col1

Expected: ["-65","NULL"] but got ["NULL"]
```


```sql
SELECT + MIN ( + + 67 ), 63 / - CAST ( - COUNT ( * ) AS INTEGER ) AS col2

Expected: ["67","63"] but got ["67","NULL"]
```


```sql
SELECT ALL 74 + + 51 - - - CAST ( NULL AS INTEGER ) * - 9, - ( - - CAST ( NULL AS INTEGER ) ) AS col1

Expected: ["NULL","NULL"] but got ["125","0"]
```


```sql
SELECT DISTINCT - - CAST ( NULL AS INTEGER ) AS col0, + CAST ( NULL AS REAL ) + - 66 AS col2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1665 failed
* 83% was OK

Time: 19291ms

---- ---- ---- ---- ---- ---- ----
### 403/622 [`./test/random/expr/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_32.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + - CAST ( NULL AS INTEGER ) + - + COUNT ( * ) * - 36

Expected: ["NULL"] but got ["36"]
```


```sql
SELECT DISTINCT COUNT ( * ) / - 87

Expected: ["0"] but got ["-0.011"]
```


```sql
SELECT ALL + CAST ( MAX ( + 20 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * + + 13 + + + 79, CAST ( NULL AS REAL ) AS col2

Expected: ["NULL","NULL"] but got ["79","NULL"]
```


```sql
SELECT + ( + - ( - CAST ( NULL AS INTEGER ) ) ) AS col2, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + - - CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - CASE WHEN NOT ( NULL ) NOT BETWEEN NULL AND + 44 THEN 5 END

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 1312 failed
* 86% was OK

Time: 13857ms

---- ---- ---- ---- ---- ---- ----
### 404/622 [`./test/random/expr/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_33.test)

_Mimic sqlite_

```sql
SELECT 17 + 76 / - COALESCE ( 21, COUNT ( * ) )

Expected: ["14"] but got ["13.381"]
```


```sql
SELECT DISTINCT + 53 + + CAST ( NULL AS INTEGER ) * - 23 AS col0

Expected: ["NULL"] but got ["53"]
```


```sql
SELECT + ( CASE + 53 WHEN + - 78 THEN + + 17 END ) / + CAST ( SUM ( - - ( - + CAST ( + - 67 AS INTEGER ) ) ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT ALL 39 * ( - - 70 ) + + CASE WHEN NOT ( 64 ) BETWEEN + + 96 AND ( 75 ) THEN NULL ELSE - 86 END + 9 * - ( + 17 + 10 )

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + 99 / + COALESCE ( - CAST ( NULL AS INTEGER ), - 9 + + + MIN ( DISTINCT + 21 ), - + COUNT ( * ) - COALESCE ( + COALESCE ( - - 19, - COUNT ( * ) ), + 68 ) * + 88 * + 89 )

Expected: ["8"] but got ["NULL"]
```


```sql
SELECT ALL - CASE - ( - COALESCE ( + - 90, + CAST ( - 79 AS INTEGER ) ) ) WHEN 59 THEN NULL WHEN + 17 THEN - 42 ELSE NULL END * + 30 + - - COUNT ( * ) - - COUNT ( ALL + 7 ) + + 51 AS col2, 83

Expected: ["NULL","83"] but got ["83","NULL"]
```


```sql
SELECT DISTINCT 66 AS col2, CAST ( NULL AS REAL ) AS col2

Expected: ["66","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * + 33 AS col2, 44 / - - 51 / - CAST ( NULL AS INTEGER ) + - 79 + + 39 - - 52 * 78 * - 96 AS col2

Expected: ["NULL","NULL"] but got ["-389416","-389416"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) * + + 13 + + + 79, CAST ( NULL AS REAL ) AS col2

Expected: ["NULL","NULL"] but got ["79","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1711 failed
* 82% was OK

Time: 19789ms

---- ---- ---- ---- ---- ---- ----
### 405/622 [`./test/random/expr/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_34.test)

_Mimic sqlite_

```sql
SELECT - + 30 + + - 62 / + 32 AS col1

Expected: ["-31"] but got ["-31.938"]
```


```sql
SELECT 60 * MAX ( ALL 2 ) + - SUM ( - - CAST ( NULL AS INTEGER ) )

Expected: ["NULL"] but got ["120"]
```


```sql
SELECT ALL CAST ( - - COUNT ( DISTINCT + ( + + 50 ) ) AS INTEGER )

g is not defined
```


```sql
SELECT 99 * + 50 * 8 * + - 29 * - 75 AS col1, 55 / CASE + 29 WHEN - 41 THEN 70 + COUNT ( * ) WHEN 48 + - 39 THEN NULL END AS col1

Expected: ["86130000","NULL"] but got ["NULL"]
```


```sql
SELECT ALL 71 + COUNT ( * ) * + - 10 / MAX ( ALL 56 ) * + CASE + CAST ( + COUNT ( * ) AS INTEGER ) WHEN COUNT ( * ) THEN + 67 * + 42 ELSE NULL END

Expected: ["71"] but got ["NULL"]
```


```sql
SELECT - CASE WHEN NOT 93 BETWEEN NULL AND ( NULL ) THEN - 48 + 93 END / 66 + 32

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL 50 * + CAST ( NULL AS INTEGER ) + - 9 AS col1, + CASE WHEN NOT 18 IS NOT NULL THEN NULL ELSE - - CAST ( NULL AS INTEGER ) / - - COUNT ( * ) END AS col1

Expected: ["NULL","NULL"] but got ["0"]
```


```sql
SELECT ALL - 75 AS col1, - 0 * + CAST ( NULL AS REAL ) + COALESCE ( 85, + 30 ) col1

Expected: ["-75","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS REAL ), 97 * COALESCE ( - 99, + CASE + + CAST ( NULL AS INTEGER ) WHEN + 2 THEN NULL ELSE - 22 END ) + + 64 + - 42 * + 24 - 83 * - - COUNT ( * ) / + 52 + - + 11 * - + CAST ( - CASE 12 WHEN + ( - + 87 ) THEN + COUNT ( * ) - 40 WHEN - COUNT ( * ) * + - 8 / + + 94 * + - COUNT ( * ) * - 56 THEN NULL ELSE + CASE COALESCE ( - 77, + + 65 + + ( 2 ) ) WHEN COUNT ( * ) THEN 68 WHEN - …

Expected: ["NULL","NULL"] but got ["NULL","-10548.596"]
```

#### ☓ Ran 10012 tests as sqlite

* 1804 failed
* 81% was OK

Time: 20218ms

---- ---- ---- ---- ---- ---- ----
### 406/622 [`./test/random/expr/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_35.test)

_Mimic sqlite_

```sql
SELECT ALL - COALESCE ( - - 65, - 54, - 92 ) / - 6 AS col0

Expected: ["10"] but got ["10.833"]
```


```sql
SELECT - CASE + ( 59 ) WHEN - 63 THEN NULL ELSE + + 30 * 54 * 99 * - - 28 - NULLIF ( ( + - 22 ), + 38 ) + - CAST ( NULL AS INTEGER ) + + - 12 + + + COALESCE ( - 22, - + 34 ) * 77 + + COUNT ( * ) END

Expected: ["NULL"] but got ["-4488957"]
```


```sql
SELECT ALL 1 + - CAST ( + NULLIF ( COUNT ( * ), 98 ) AS INTEGER ) col1

g is not defined
```


```sql
SELECT + 41 * 79 * + + 79 col2, - CASE - NULLIF ( + - 59, + 93 ) WHEN + + 95 + - COALESCE ( + 41, + 74 + 66 ) THEN - 8 + 55 END col2

Expected: ["255881","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), CAST ( NULL AS REAL ) * + + 56 * + MIN ( - - 87 ) + 9

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT + - 41 AS col1, + 62 + + CASE - + MAX ( ALL 0 ) WHEN + 34 THEN - + 51 * + COUNT ( * ) / 48 END * + 61 + 94 + 71 + 27 AS col1

Expected: ["-41","NULL"] but got ["NULL"]
```


```sql
SELECT + CASE WHEN NOT + 17 BETWEEN - 51 + + 65 * 83 AND + 17 * NULLIF ( CASE 92 WHEN + 45 * 46 + + 71 THEN 2 WHEN 12 * + 26 THEN NULL ELSE NULL END, - 33 * 23 + ( + NULLIF ( + CASE + NULLIF ( 25, ( + 76 ) ) WHEN - 19 THEN - 49 ELSE - MIN ( + 0 ) + + 38 END, + 79 * 81 + + ( 54 + 56 ) ) + + 62 * 49 ) ) THEN 38 ELSE - 86 END

Cannot read property 'toString' of undefined
```


```sql
SELECT - ( + CASE - + 30 WHEN + NULLIF ( - 23, - 53 ) THEN + NULLIF ( - COALESCE ( + 87, 54 / - 34 + + 98 - + MAX ( DISTINCT + CAST ( 32 AS INTEGER ) ) * 15 * - 58 * + 39 * + 27, 28 ), 49 ) + - CASE - + COUNT ( * ) WHEN ( + - 1 ) THEN 41 / - COUNT ( * ) ELSE NULL END * + + COUNT ( * ) + 87 ELSE - 20 * + + NULLIF ( + 44, - ( COALESCE ( COUNT ( * ), 23 + COUNT ( * ) ) ) * - 26 - - NULLIF ( CAST ( (…

Expected: ["51040"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1752 failed
* 82% was OK

Time: 20232ms

---- ---- ---- ---- ---- ---- ----
### 407/622 [`./test/random/expr/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_36.test)

_Mimic sqlite_

```sql
SELECT ALL 19 - + + 82 / + NULLIF ( - - 4, - COUNT ( * ) )

Expected: ["-1"] but got ["-1.500"]
```


```sql
SELECT - 89 * + - COUNT ( * ) AS col2, COUNT ( * ) * + - CAST ( NULL AS INTEGER )

Expected: ["89","NULL"] but got ["89","0"]
```


```sql
SELECT ALL - + 97 AS col2, 48 * - CASE + + 60 WHEN + COUNT ( 93 ) * + 51 * AVG ( 79 ) * + + 6 THEN - + 40 - - - 44 END, - 71 * + CAST ( NULL AS INTEGER ) + - 19

Expected: ["-97","NULL","NULL"] but got ["-97","NULL","-19"]
```


```sql
SELECT - CASE WHEN NOT NULL BETWEEN NULL AND 84 THEN + ( - ( 30 ) ) END

Cannot read property 'toString' of undefined
```


```sql
SELECT CAST ( + AVG ( - ( - 82 ) ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT - CASE - 66 WHEN 88 * + CASE + 2 WHEN + + 43 THEN NULL ELSE + 87 - + 67 END * + COALESCE ( + 67, + COALESCE ( - + 51, + - ( + CAST ( NULL AS INTEGER ) ), + MIN ( 94 ) ) ) + 75 / CASE - + 46 WHEN - 35 THEN + 0 - - 30 WHEN - 80 THEN NULL ELSE NULL END + 28 + + 82 * 56 + - 50 THEN - 50 * + 32 WHEN COUNT ( * ) THEN NULL WHEN - 43 THEN NULL WHEN + 10 * - - 52 + 76 * - - COUNT ( * ) THEN NULL EN…

Expected: ["NULL","-76"] but got ["NULL","-76.005"]
```


```sql
SELECT 41 * + 69 + - + 35 * 5 AS col0, - 93 / - + COALESCE ( + + CAST ( NULL AS INTEGER ), - COUNT ( * ) * + 59 ) - - 54 AS col1

Expected: ["2654","53"] but got ["2654","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1778 failed
* 82% was OK

Time: 20192ms

---- ---- ---- ---- ---- ---- ----
### 408/622 [`./test/random/expr/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_37.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * + 46, 77 col2

Expected: ["NULL","77"] but got ["0","77"]
```


```sql
SELECT DISTINCT CAST ( - - NULLIF ( 60, + AVG ( DISTINCT 81 ) ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT - ( ( CASE + 29 WHEN + + 91 THEN NULL ELSE - 13 / + 72 + 83 + + 38 END ) )

Expected: ["-121"] but got ["-120.819"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) - 11, CASE + 26 WHEN - 29 * + + ( + 25 ) + 64 - - 13 * 19 + + COUNT ( * ) THEN 58 ELSE NULL END * - - 65 - - 44 + + + 28 + + + AVG ( - - 97 )

Expected: ["NULL","NULL"] but got ["-11","NULL"]
```


```sql
SELECT + NULLIF ( + + NULLIF ( + ( + MAX ( DISTINCT - 0 ) ), + ( CAST ( NULL AS INTEGER ) ) * - - 69 ), ( + 54 ) + - COUNT ( * ) ) - - 88, COALESCE ( - + 65, - + 56 + ( + 55 ) / + + CAST ( + + COALESCE ( 8, COUNT ( * ) - + + 25 ) AS INTEGER ) * 5 + + - 42, 28 + 97 ) + + COUNT ( * ) AS col1

Expected: ["88","-64"] but got ["NULL","-64"]
```


```sql
SELECT ALL 37 + - CASE WHEN NOT ( COALESCE ( - 89, 88 ) - + 26 ) BETWEEN 83 AND NULL THEN 99 * - 73 END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT 37 AS col2, 50 / + CASE 9 WHEN 29 THEN + 78 ELSE NULL END col2

Expected: ["37","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL 75 / ( + MAX ( - + 2 ) ) * + 55 * 53 AS col0, 56 * + CAST ( NULL AS INTEGER ) * + + CASE + + ( 76 ) WHEN + 94 THEN + COUNT ( * ) + NULLIF ( 22, COUNT ( * ) ) WHEN + COUNT ( 33 ) THEN NULL END / - 6

Expected: ["-107855","NULL"] but got ["-109312.500","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1796 failed
* 82% was OK

Time: 20537ms

---- ---- ---- ---- ---- ---- ----
### 409/622 [`./test/random/expr/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_38.test)

_Mimic sqlite_

```sql
SELECT - 90 + + ( + 55 ) / + 13

Expected: ["-86"] but got ["-85.769"]
```


```sql
SELECT + AVG ( + CAST ( NULL AS INTEGER ) ) + - COUNT ( * )

Expected: ["NULL"] but got ["-1"]
```


```sql
SELECT - CASE WHEN ( NULL ) IS NOT NULL THEN NULL ELSE - CAST ( + + NULLIF ( + + COUNT ( * ), - 78 * 48 + 99 ) AS INTEGER ) END AS col1

g is not defined
```


```sql
SELECT DISTINCT - CASE WHEN 48 IN ( - 60, 50, + COALESCE ( 46, - 91 + + 11 ) * - ( + 48 ) ) THEN NULL WHEN NOT COUNT ( 74 ) * 99 BETWEEN ( + 2 ) AND ( - 16 * + 47 ) THEN COUNT ( * ) END * 26 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT CASE - - 7 WHEN - + 83 THEN - 63 * - - 37 ELSE NULL END * - + 19 * 99 * 40 + + COUNT ( * ), + 34 + - - NULLIF ( - COALESCE ( CAST ( NULL AS INTEGER ), + 85 * 87, - COALESCE ( 71, + COUNT ( * ) ) ), - 56 ) + - 14 * COUNT ( * ) AS col2

Expected: ["NULL","-7375"] but got ["NULL","20"]
```


```sql
SELECT ALL - 3 + 18 * + 97 + + 8 + + 91 * + + CAST ( NULL AS REAL ) + + ( + - 98 ), COUNT ( * ) * + CAST ( NULL AS INTEGER ) / - ( + MIN ( DISTINCT + 92 ) ) * 43 * 41 / + 97 + + COALESCE ( - - COUNT ( DISTINCT + - 15 ), - + 6 / 42, + 4 * + - COUNT ( * ) + 68 ) * + 34 AS col0

Expected: ["NULL","NULL"] but got ["NULL","34"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), 45 + ( - + 92 ) * + + CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["0","45"]
```


```sql
SELECT - 87 / - CAST ( + MAX ( DISTINCT + 14 ) AS INTEGER ) + - SUM ( DISTINCT - - 52 ) + + 37 col2

Expected: ["-9"] but got ["NULL"]
```


```sql
SELECT 93 AS col1, CAST ( NULL AS INTEGER ) - 64 + - 60 * - 95 * - 76 * 91 * CASE - + 71 WHEN - 14 * - CAST ( NULL AS INTEGER ) - + 79 THEN + - 15 END AS col1

Expected: ["93","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1847 failed
* 81% was OK

Time: 20348ms

---- ---- ---- ---- ---- ---- ----
### 410/622 [`./test/random/expr/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_39.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 8 / SUM ( ALL + 69 ) * + COUNT ( * ) * 89 - - 76 - - + COUNT ( - ( - + 20 ) ) * - - MAX ( ALL 24 ) * + COUNT ( * ) AS col2

Expected: ["100"] but got ["110.319"]
```


```sql
SELECT ALL NULLIF ( - - CAST ( NULL AS INTEGER ), + 11 ) * - CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL 59 AS col2, - ( CASE + SUM ( ALL + + 13 ) WHEN + + COUNT ( * ) / + 3 THEN - 47 * 36 * - 70 * AVG ( ALL ( - 61 ) ) * 77 WHEN + 33 + + CAST ( NULL AS INTEGER ) + - 87 + - COUNT ( * ) * - - 86 THEN NULL END ) + 78 * CASE 2 WHEN 84 THEN - CAST ( + 34 AS INTEGER ) * + 81 END * COUNT ( * ) AS col2

Expected: ["59","NULL"] but got ["NULL"]
```


```sql
SELECT CASE WHEN - 35 BETWEEN ( + - 7 * - - 35 + 53 + - ( COUNT ( * ) ) * 44 * + 47 ) AND ( NULL ) THEN - 43 WHEN NOT ( + 81 ) NOT IN ( ( + 19 ) ) THEN NULL END + - 96 * - 14 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - ( + CAST ( + - AVG ( ALL - 12 ) AS INTEGER ) ) AS col0

g is not defined
```


```sql
SELECT - 81 / + 25 + CASE 93 WHEN 97 * - 64 * + 59 THEN + - 40 * - 18 WHEN + 90 THEN NULL ELSE NULL END * + 10 * + 50, 30 - + MIN ( + CAST ( NULL AS INTEGER ) ) + + 43 * - CAST ( NULL AS INTEGER ) * + - 45 / - 4 + - 91 * - - 25 AS col0

Expected: ["NULL","NULL"] but got ["NULL","-2245"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) / - + 52, - CAST ( NULL AS INTEGER ) * + 85 * - + 39

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1835 failed
* 81% was OK

Time: 20246ms

---- ---- ---- ---- ---- ---- ----
### 411/622 [`./test/random/expr/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_4.test)

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
SELECT + 24 - + - CAST ( - - 71 AS INTEGER ) / + - 73 AS col2, - CAST ( NULL AS REAL ) + + 67 AS col2

Expected: ["24","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col1, CASE + COUNT ( * ) WHEN - - 5 THEN + - 71 * + 32 / - 55 END / + 90 * - - 55 * - + NULLIF ( + - SUM ( ALL + 39 ), - 42 )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1911 failed
* 80% was OK

Time: 21261ms

---- ---- ---- ---- ---- ---- ----
### 412/622 [`./test/random/expr/slt_good_40.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_40.test)

_Mimic sqlite_

```sql
SELECT 28 / + 41 + + ( 87 ) * 82

Expected: ["7134"] but got ["7134.683"]
```


```sql
SELECT 65 * CAST ( NULL AS INTEGER ) + 92

Expected: ["NULL"] but got ["92"]
```


```sql
SELECT ALL CAST ( SUM ( ALL + 48 ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT ALL - 28 + - + CASE - 83 WHEN COUNT ( * ) * NULLIF ( + NULLIF ( + 73, - 84 * - 36 ), - + 18 ) + COUNT ( * ) THEN - CAST ( NULL AS INTEGER ) ELSE NULL END AS col2, + COUNT ( * ) * + AVG ( ALL + 6 ) * + + COUNT ( * ) * - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) * - 50 AS col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - 3 / - - 31 * NULLIF ( + 69, + SUM ( - 84 ) + - 20 + 36 + - CAST ( NULL AS INTEGER ) * + ( - 58 ) * - NULLIF ( 17, - 12 ) ) / - - 21

Expected: ["0"] but got ["-0.029"]
```


```sql
SELECT ALL NULLIF ( 5, + COUNT ( * ) - + 46 ) * ( - 36 ) * - 88 + + CASE + + ( + 96 ) WHEN - 58 * + NULLIF ( - 43, CASE WHEN NULL BETWEEN ( NULL ) AND 53 THEN NULLIF ( + + AVG ( ALL 5 ), ( CASE - - 39 WHEN + 93 THEN NULL WHEN + CAST ( + ( + - 0 ) AS INTEGER ) THEN - COUNT ( * ) * - - 81 * - 7 ELSE NULL END ) * - 18 ) ELSE NULL END - 99 - 82 - - 80 + + 27 + - 72 + + + 62 ) THEN NULL ELSE + - CASE …

Cannot read property 'toString' of undefined
```


```sql
SELECT - 57 * - + COUNT ( * ) / CAST ( + COUNT ( * ) AS INTEGER ) AS col1

Expected: ["57"] but got ["NULL"]
```


```sql
SELECT ALL - COUNT ( * ) / + + 95, - 2 + - + 35 + CASE 96 WHEN - 97 * + 20 THEN 50 * 23 WHEN NULLIF ( 52, 44 - COUNT ( * ) ) THEN NULL END col2

Expected: ["0","NULL"] but got ["-0.011","NULL"]
```


```sql
SELECT ALL + 11 AS col0, CAST ( NULL AS REAL ) + - - 92 AS col0

Expected: ["11","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1819 failed
* 81% was OK

Time: 22387ms

---- ---- ---- ---- ---- ---- ----
### 413/622 [`./test/random/expr/slt_good_41.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_41.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + MIN ( DISTINCT - 72 ) / 63

Expected: ["-1"] but got ["-1.143"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col1, - 77 AS col0

Expected: ["NULL","-77"] but got ["0","-77"]
```


```sql
SELECT DISTINCT - 39 / - CAST ( - COALESCE ( + 34, + - 63 * 36 * + 23 - - COUNT ( * ), - - 93 * + 87 ) AS INTEGER )

g is not defined
```


```sql
SELECT CASE + 81 WHEN + - 18 * + - 63 / 96 * - ( 38 ) + + NULLIF ( - 79, 55 + - COUNT ( * ) * + - COUNT ( * ) ) THEN 34 ELSE NULL END AS col2, 30 / - 87 * 10 / 50 * - - 7

Expected: ["NULL","0"] but got ["NULL","-0.246"]
```


```sql
SELECT DISTINCT - 43 / + COALESCE ( + - CAST ( NULL AS INTEGER ), + - 55 * + ( + COUNT ( * ) ) * + + 25 ) * - MIN ( DISTINCT - 98 ) AS col2

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT ALL AVG ( ALL 43 ) * - CASE WHEN NULL <> ( 38 ) THEN - SUM ( ALL 88 ) WHEN - 48 BETWEEN ( 35 ) AND - CAST ( NULL AS INTEGER ) * + 92 THEN 13 - + 75 ELSE NULL END + - 4 * 55

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * - + 96, + ( - - AVG ( - CAST ( NULL AS INTEGER ) ) ) + CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) * + + 0 * - 22 + + 62 AS col0, CAST ( NULL AS REAL ) AS col1

Expected: ["NULL","NULL"] but got ["62","NULL"]
```


```sql
SELECT ALL - ( + 50 ) AS col2, - 47 * CASE + 55 WHEN + + 18 + + - NULLIF ( + 84, 45 ) + - - NULLIF ( 57, + 23 + + CAST ( NULL AS INTEGER ) ) + - 85 + + CAST ( 83 AS INTEGER ) THEN - - 6 + - 43 END col2

Expected: ["-50","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1793 failed
* 82% was OK

Time: 22573ms

---- ---- ---- ---- ---- ---- ----
### 414/622 [`./test/random/expr/slt_good_42.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_42.test)

_Mimic sqlite_

```sql
SELECT ALL + + CAST ( NULL AS INTEGER ) * + - SUM ( - COALESCE ( - 81, 55 + 5 + 53 ) ) + + + 56 AS col1

Expected: ["NULL"] but got ["56"]
```


```sql
SELECT DISTINCT COUNT ( * ) / - 34 AS col0

Expected: ["0"] but got ["-0.029"]
```


```sql
SELECT 33 * - COUNT ( * ) / + + CAST ( - COUNT ( * ) AS INTEGER ) + ( + + 1 ) AS col2

Expected: ["34"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( COUNT ( * ) AS INTEGER ) * + + 43 + - 96 AS col1

g is not defined
```


```sql
SELECT - + 81 / + - MIN ( ALL - 61 ) + + - CAST ( - 30 AS INTEGER ) col0, CAST ( NULL AS REAL ) AS col0

Expected: ["29","NULL"] but got ["NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) col0, + 80 + + NULLIF ( 89, 99 ) + CASE - - 87 WHEN + - NULLIF ( - + 14, - 17 ) * + 39 / + 67 - + 42 * + + 36 - - 24 * 63 THEN + 55 + + + COUNT ( * ) / - COUNT ( * ) + - ( + - 23 ) * 45 + - CAST ( 86 AS REAL ) END AS col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - CASE WHEN NOT - 60 BETWEEN + COUNT ( * ) AND + 47 + + 72 THEN - 52 END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 11 * - 65 * 55 col0, CAST ( NULL AS INTEGER ) * CASE 21 WHEN - + 95 / + + 21 THEN NULL WHEN 60 THEN 3 - + + 42 - 73 - + 64 END AS col0

Expected: ["39325","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1804 failed
* 81% was OK

Time: 23204ms

---- ---- ---- ---- ---- ---- ----
### 415/622 [`./test/random/expr/slt_good_43.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_43.test)

_Mimic sqlite_

```sql
SELECT ALL + 13 / + 96 AS col0, CAST ( NULL AS INTEGER )

Expected: ["0","NULL"] but got ["0.135","0"]
```


```sql
SELECT DISTINCT - 97 / - - ( + 74 )

Expected: ["-1"] but got ["-1.311"]
```


```sql
SELECT - - CAST ( SUM ( - 21 ) AS INTEGER )

g is not defined
```


```sql
SELECT + CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) - + 6

Expected: ["NULL"] but got ["-6"]
```


```sql
SELECT MAX ( + - CAST ( NULL AS REAL ) ) AS col0, 30

Expected: ["NULL","30"] but got ["30","NULL"]
```


```sql
SELECT ALL + ( - 79 ) * CAST ( NULL AS REAL ), CAST ( NULL AS INTEGER ) * + 79 * + MIN ( DISTINCT - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - + 16 / COALESCE ( CAST ( NULL AS INTEGER ), + 89, 13 ) AS col1

Expected: ["0"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1438 failed
* 85% was OK

Time: 15850ms

---- ---- ---- ---- ---- ---- ----
### 416/622 [`./test/random/expr/slt_good_44.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_44.test)

_Mimic sqlite_

```sql
SELECT 30 + - - 96 - - 4 + - + 77 + + 67 * + CAST ( NULL AS INTEGER ) / ( - + 58 )

Expected: ["NULL"] but got ["53"]
```


```sql
SELECT CAST ( - + COUNT ( * ) AS INTEGER ) AS col2

g is not defined
```


```sql
SELECT DISTINCT 64 + 63 / + 97 AS col1

Expected: ["64"] but got ["64.649"]
```


```sql
SELECT - 33 AS col0, + 29 * + + CASE - - ( - - 93 ) WHEN + 65 THEN NULL WHEN + 84 / + 29 * - 79 + 84 + + 76 + + ( - + 19 ) * - 36 + - ( + + 8 ) * - 30 / ( - 59 ) THEN 2 WHEN - 53 - 86 THEN NULL WHEN - 1 THEN + 98 * MAX ( 59 * 89 ) END * 10 AS col0

Expected: ["-33","NULL"] but got ["NULL"]
```


```sql
SELECT - CASE WHEN ( NULL ) BETWEEN ( + 99 ) AND - 35 + 46 THEN NULL ELSE + ( + 59 ) + 89 / - 89 END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 94 * 31 / + - CASE WHEN NULL <> 19 THEN NULL ELSE + 38 END AS col2

Expected: ["76"] but got ["NULL"]
```


```sql
SELECT - 91 + + 24 * + CAST ( NULL AS REAL ), - 58 / - 51 * + MIN ( ALL - - 87 ) + - 49 + - - 89 * + ( - CAST ( NULL AS INTEGER ) ) + - + ( - - MAX ( ALL + 57 ) ) * - - COUNT ( * ) AS col0

Expected: ["NULL","NULL"] but got ["NULL","-105.987"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - + 6 AS col1, 3 - - + CAST ( NULL AS INTEGER ) / NULLIF ( - 8, - 37 + - 87 ) AS col2

Expected: ["NULL","NULL"] but got ["-6","3"]
```


```sql
SELECT ALL 73 col1, + 95 + - + CASE + - 80 WHEN + + ( + 13 ) + + 31 + 60 * - + 25 THEN 23 + + 60 ELSE NULL END AS col1

Expected: ["73","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1837 failed
* 81% was OK

Time: 21857ms

---- ---- ---- ---- ---- ---- ----
### 417/622 [`./test/random/expr/slt_good_45.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_45.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 38 / + - 51 + + 86 * 5 + - 74 + + 84 / + 91 + COALESCE ( - + 81, 83 * - 37, + COUNT ( * ) ) * 90 col0

Expected: ["-6934"] but got ["-6933.822"]
```


```sql
SELECT - + 8 - - CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL"] but got ["-8"]
```


```sql
SELECT DISTINCT - 26 + - COALESCE ( + 93, + CAST ( + + COUNT ( * ) AS INTEGER ) ) + - 30 * - 52 - + 41 AS col1

g is not defined
```


```sql
SELECT + 99 * + 51 + + COUNT ( * ) + + 59 * + - 16 + 67 + + + CASE WHEN NULL > 89 THEN NULL WHEN NULL BETWEEN - COUNT ( * ) AND - 29 THEN + ( - 1 ) * + 64 / ( - + ( - - 27 ) ) * - - 16 - - - AVG ( DISTINCT + - 79 ) + 52 WHEN NOT 5 <= COUNT ( * ) THEN NULL END * + 75

Cannot read property 'toString' of undefined
```


```sql
SELECT 26 * + CASE + + CAST ( NULL AS INTEGER ) WHEN + + 31 THEN NULL WHEN + 90 * 68 - + 47 * - - 42 THEN - ( - COUNT ( * ) ) ELSE NULL END col1, - 95 / + CAST ( + 67 AS INTEGER )

Expected: ["NULL","-1"] but got ["NULL","-1.418"]
```


```sql
SELECT CASE - 20 WHEN 67 THEN - 76 / + 29 + - - COUNT ( DISTINCT - - 53 ) END * + COUNT ( * ), 36 + + 28 + 50 * + 98 + 99 + + + 34 + ( 13 ) + + CAST ( + NULLIF ( - - COUNT ( * ), - 12 + + 49 / 57 * - 87 ) AS INTEGER ) * - 6 * CAST ( NULL AS INTEGER ) * 97

Expected: ["NULL","NULL"] but got ["NULL","5110"]
```


```sql
SELECT + 80 AS col0, CAST ( NULL AS REAL ) AS col0

Expected: ["80","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 72 * CASE WHEN NOT NULL > ( NULL ) THEN NULL ELSE - 53 END AS col0

Expected: ["-3816"] but got ["NULL"]
```


```sql
SELECT DISTINCT + 17 * + + CAST ( NULL AS INTEGER ) / + CAST ( - 74 AS INTEGER ) * - + 54, - 23 * - + 99 * - CASE + 90 WHEN + 63 * + MIN ( - 32 ) * + CAST ( NULL AS REAL ) + - AVG ( ALL - 14 ) * - 89 THEN NULL ELSE - 97 END + 82 + + + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","220951"]
```


```sql
SELECT DISTINCT - 76 + + ( COUNT ( * ) ) / 62 AS col2

Expected: ["-76"] but got ["-75.984"]
```

#### ☓ Ran 10012 tests as sqlite

* 1867 failed
* 81% was OK

Time: 22245ms

---- ---- ---- ---- ---- ---- ----
### 418/622 [`./test/random/expr/slt_good_46.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_46.test)

_Mimic sqlite_

```sql
SELECT + - 40 + - CASE WHEN 36 + + 65 * + 55 IN ( 32 * SUM ( 13 ) + 61 / 8 ) THEN 95 WHEN NOT + CASE 19 WHEN 90 * + ( - 27 ) + 93 * + 2 THEN NULL WHEN + 32 * - 81 THEN 64 WHEN + ( CAST ( + AVG ( + 62 ) AS INTEGER ) ) * + 12 THEN NULL END NOT IN ( - 46 ) THEN NULL ELSE NULL END AS col0

g is not defined
```


```sql
SELECT CAST ( - 35 AS INTEGER ) / 39 - 86 * - 8 AS col2

Expected: ["688"] but got ["687.103"]
```


```sql
SELECT COALESCE ( MAX ( CAST ( NULL AS INTEGER ) ), 83 - + CASE + 60 WHEN + 43 - 67 THEN AVG ( 84 ) ELSE NULL END * COALESCE ( 9, 17 * - 72, + 99 + 88 ) ) * - 6 + + NULLIF ( + 95 + - 19 * COUNT ( * ), 9 )

Expected: ["NULL"] but got ["76"]
```


```sql
SELECT ALL + CASE WHEN NOT ( + COUNT ( * ) ) IN ( 77 - 5 ) THEN - 38 * + COUNT ( * ) END + MIN ( - 78 ) * ( + 7 )

Expected: ["-584"] but got ["NULL"]
```


```sql
SELECT ALL + 0 * - - 3 AS col0, - ( - ( - + 99 ) ) / - 17 * + CASE - 9 WHEN COUNT ( * ) THEN NULL WHEN 94 THEN ( ( COUNT ( * ) ) ) + CAST ( NULL AS INTEGER ) * + 71 END AS col0

Expected: ["0","NULL"] but got ["NULL"]
```


```sql
SELECT ALL 84 / + - 66 / - CAST ( NULL AS REAL ) + - 52 AS col2, + CAST ( NULL AS INTEGER ) + - + 21 + 88 + - 69 * - 16 * - 75 + - 73 * - - COUNT ( * ) * - 23 + COUNT ( * ) / - 31 * + 91

Expected: ["NULL","NULL"] but got ["NULL","-81054.000"]
```


```sql
SELECT DISTINCT + + 73 AS col2, - CAST ( NULL AS REAL ) AS col2

Expected: ["73","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + - 25 + - NULLIF ( - 56, + + CASE WHEN - CASE - + CAST ( - + 28 AS INTEGER ) WHEN - 17 * + MAX ( ALL + - 68 ) * 9 * - - CAST ( - + CAST ( NULL AS INTEGER ) AS INTEGER ) THEN - CAST ( + 54 AS INTEGER ) - + 95 ELSE NULL END BETWEEN ( - - 86 * + ( - 40 ) - 6 ) AND + 59 * + ( 29 ) THEN - 30 / + ( + AVG ( ALL 63 ) ) * + ( 45 * - 41 ) END ) + + MIN ( 57 + ( 21 ) )

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 9 + - CAST ( NULL AS INTEGER ) AS col2, + MAX ( + CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["-9","0"]
```


```sql
SELECT 5 + ( + - ( ( - 50 ) ) ) AS col1, 56 / + CAST ( NULL AS INTEGER ) - + 42 AS col1, CAST ( NULL AS REAL ) * - 4

Expected: ["55","NULL","NULL"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1793 failed
* 82% was OK

Time: 21296ms

---- ---- ---- ---- ---- ---- ----
### 419/622 [`./test/random/expr/slt_good_47.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_47.test)

_Mimic sqlite_

```sql
SELECT 65 / + 98

Expected: ["0"] but got ["0.663"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ), 58 AS col0

Expected: ["NULL","58"] but got ["0","58"]
```


```sql
SELECT ALL CAST ( ( NULLIF ( + CAST ( - 93 AS INTEGER ), + + CAST ( + 77 AS INTEGER ) * - 84 - + - 67 + + - 56 + + 78 * + + ( - 20 ) * CASE + ( + 10 ) WHEN + COUNT ( * ) THEN COUNT ( * ) + - 50 * + + MAX ( ALL + 76 ) WHEN 18 THEN NULL WHEN - COUNT ( * ) THEN NULL END ) ) AS INTEGER ) + - - 67 AS col0

g is not defined
```


```sql
SELECT DISTINCT - + COUNT ( * ) / + - 35, CAST ( NULL AS REAL ) AS col2

Expected: ["0","NULL"] but got ["0.029","NULL"]
```


```sql
SELECT - - CASE WHEN NOT 40 NOT BETWEEN - 96 * AVG ( - 74 ) AND NULL THEN - 47 ELSE - 11 END * - 12 + - 1 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL ( - - CASE ( - SUM ( DISTINCT + 91 ) ) WHEN + 92 + 3 THEN - COUNT ( * ) END ) * + 50 AS col2, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - 78 * 91 / - ( CAST ( COUNT ( * ) AS INTEGER ) ) * COUNT ( + - 21 ) + + - ( + COUNT ( * ) )

Expected: ["7097"] but got ["NULL"]
```


```sql
SELECT 59 AS col1, + 68 - + CAST ( NULL AS REAL ) + 92 col1

Expected: ["59","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1776 failed
* 82% was OK

Time: 22124ms

---- ---- ---- ---- ---- ---- ----
### 420/622 [`./test/random/expr/slt_good_48.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_48.test)

_Mimic sqlite_

```sql
SELECT ALL + CAST ( + 50 AS INTEGER ) / - SUM ( 6 )

Expected: ["-8"] but got ["-8.333"]
```


```sql
SELECT DISTINCT + ( ( CAST ( NULL AS INTEGER ) ) )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + + 35 col2, COUNT ( * ) / + 32 * + + CAST ( - + MAX ( + - 81 ) AS INTEGER ) * + 9 + - + 97 - 53 * ( 51 ) * - CASE - + 55 WHEN + CAST ( NULL AS INTEGER ) THEN - - MIN ( DISTINCT + + CAST ( NULL AS INTEGER ) ) ELSE COUNT ( * ) * COALESCE ( + 72, - - 40 * + + 34 * - + 81 * + 24 * - COUNT ( * ) * + COUNT ( * ) + - 16, + 81 * + - 47 + + 88 * - 53 ) END

Expected: ["35","194519"] but got ["35","NULL"]
```


```sql
SELECT DISTINCT - 68 / 98 + + 63 - - - 51 + CAST ( COUNT ( * ) AS REAL ) * 77 * + - CAST ( NULL AS INTEGER ) col1, + COALESCE ( 20, - 26 + - ( + - COALESCE ( 27, + ( - 92 ) ) ) ) col0

g is not defined
```


```sql
SELECT + 19 / - + NULLIF ( - 50, - COUNT ( DISTINCT - - 34 ) * - CASE + 37 WHEN - 49 + - 74 THEN NULL WHEN CAST ( NULL AS INTEGER ) * - 43 + - 59 + - ( - 38 ) * 1 + - COUNT ( * ) THEN - 64 / 77 + + - 18 ELSE NULL END + 5 ) + - MIN ( DISTINCT ( + CASE - 3 WHEN + ( + 98 ) THEN + 86 WHEN - 96 THEN NULL END ) ) * + 29 AS col1, - MIN ( DISTINCT ( + 8 ) ) * + COUNT ( * ) / - 32 AS col0

Expected: ["NULL","0"] but got ["NULL","0.250"]
```


```sql
SELECT - - 94 * + CAST ( NULL AS INTEGER ) + + - ( + + SUM ( DISTINCT - 16 ) ) + - 52 * 60 / + + NULLIF ( - 15, 5 ) AS col0, - CASE 51 WHEN + 12 / + COUNT ( * ) * CAST ( - - COUNT ( * ) AS INTEGER ) * 13 THEN NULL WHEN 63 * - 94 THEN 55 ELSE NULL END / - 84 + - + CASE + 31 WHEN 49 + 40 * 92 THEN - 58 / + 26 WHEN + 86 THEN NULL END

Expected: ["NULL","NULL"] but got ["224","NULL"]
```


```sql
SELECT + + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) * ( 47 ) AS col2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT 24 + CASE WHEN + NULLIF ( 12, + + ( - - 92 ) + - 44 + - CASE 32 WHEN + + 38 THEN + 95 * + - 30 + - 24 ELSE + CASE + ( - 99 ) WHEN 80 THEN + 32 END * 38 + + CASE + 52 - 31 * 58 WHEN 49 THEN + 92 + 4 END * 42 END ) BETWEEN ( NULL ) AND ( 20 * 3 ) THEN NULL WHEN + 15 IN ( 55 ) THEN NULL ELSE 75 + 97 END * - 65 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ( + 25 ) AS col2, 63 * - + 82 * CASE + 72 WHEN 89 THEN - + 53 + - 79 END * + 95 AS col2

Expected: ["25","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1884 failed
* 81% was OK

Time: 21611ms

---- ---- ---- ---- ---- ---- ----
### 421/622 [`./test/random/expr/slt_good_49.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_49.test)

_Mimic sqlite_

```sql
SELECT 60 * - 67 + + COUNT ( * ) AS col2, 95

Expected: ["-4019","95"] but got ["95","-4019"]
```


```sql
SELECT DISTINCT 29 + - - 43 + - 41 * - ( + 8 ) * CAST ( NULL AS INTEGER ) * + 5 AS col2

Expected: ["NULL"] but got ["72"]
```


```sql
SELECT 21 + - COUNT ( * ) - 76 + - - ( + + 27 ) + 9 * CASE WHEN - CAST ( NULL AS INTEGER ) BETWEEN + 98 + + + 68 AND + 3 * + COUNT ( * ) + - 64 * - 39 * - 32 / + COUNT ( * ) THEN NULL ELSE 62 / 10 END + ( - 60 ) + + - 50

Cannot read property 'toString' of undefined
```


```sql
SELECT 1 AS col0, CASE - + 46 WHEN - - 81 THEN 83 * - + 51 / + 61 * - - 91 + 93 * - COUNT ( * ) * 89 END AS col0

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT + + 94, CAST ( - AVG ( DISTINCT CAST ( NULL AS INTEGER ) ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ) * + + 20 + 53, CAST ( NULL AS INTEGER ) col0

Expected: ["NULL","NULL"] but got ["53","0"]
```


```sql
SELECT ALL - + CASE WHEN NOT - 74 IN ( + COALESCE ( + 50, - 13, 76 * + - 63 * 21 ) * + 78 * - 21 + + ( + 15 ), 64, + - 81 ) THEN - 25 + - + 10 END * 54 + + COUNT ( DISTINCT 56 ) * + COUNT ( * ) * - - 29 * - + 56

Expected: ["266"] but got ["NULL"]
```


```sql
SELECT ( 7 ) AS col1, 34 * + CAST ( NULL AS REAL ) col1

Expected: ["7","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col1, + CASE 26 WHEN - - 43 THEN - 78 * - MIN ( DISTINCT - + 25 ) * NULLIF ( + 18, + 38 * + ( + 19 ) * + + 75 ) * 34 * 11 + SUM ( - 49 ) * - + 3 * + NULLIF ( + AVG ( ALL 80 ), - 71 ) END

Expected: ["NULL","NULL"] but got ["0","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1854 failed
* 81% was OK

Time: 21948ms

---- ---- ---- ---- ---- ---- ----
### 422/622 [`./test/random/expr/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_5.test)

_Mimic sqlite_

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

* 1899 failed
* 81% was OK

Time: 22291ms

---- ---- ---- ---- ---- ---- ----
### 423/622 [`./test/random/expr/slt_good_50.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_50.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - CAST ( NULL AS INTEGER ) * 82

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - 64 / - + 11

Expected: ["5"] but got ["5.818"]
```


```sql
SELECT - + CAST ( + COUNT ( * ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT CASE WHEN NOT + 12 BETWEEN + ( - + 75 ) * - ( - + 78 ) + - - 40 + 19 AND CAST ( NULL AS REAL ) THEN + - 12 END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 53 / 66 * 44 * - - CAST ( NULL AS INTEGER ) AS col0, - 40 * + CASE + 66 WHEN - 97 THEN NULL WHEN - 65 + COUNT ( * ) * COUNT ( * ) * + 43 - 49 THEN + - 41 END

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT - - 98 AS col0, + ( + CASE 65 WHEN - COUNT ( * ) THEN NULL WHEN - - 96 THEN + 10 * + 19 * 67 + - ( - 60 ) * 23 + 78 END ) * - + 33 + - 34 AS col0

Expected: ["98","NULL"] but got ["NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - - 17 * - 99 * 16, 29 * - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT 52 col1, + 86 + CAST ( NULL AS REAL ) AS col1

Expected: ["52","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 22 / - CAST ( - 38 AS INTEGER ) * - 78 + + 20 - - CASE - 24 WHEN - - CASE - + COALESCE ( COUNT ( * ), - 78 + - 34 * + 44, SUM ( + - 92 ) ) WHEN + 79 + + CAST ( - CAST ( - 95 AS INTEGER ) AS INTEGER ) + + CASE - 39 WHEN - SUM ( ALL + 64 ) THEN 29 END * AVG ( ALL + 92 ) THEN NULL WHEN + - 65 THEN + 45 ELSE NULL END + 82 + - 21 / + 97 THEN NULL WHEN + COALESCE ( + MIN ( ALL - 91 ), + + ( + …

Expected: ["-657"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1839 failed
* 81% was OK

Time: 21591ms

---- ---- ---- ---- ---- ---- ----
### 424/622 [`./test/random/expr/slt_good_51.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_51.test)

_Mimic sqlite_

```sql
SELECT ALL + - 73 + - CAST ( NULL AS INTEGER ) + 19

Expected: ["NULL"] but got ["-54"]
```


```sql
SELECT ALL + - 57 / + + 27 AS col1

Expected: ["-2"] but got ["-2.111"]
```


```sql
SELECT ALL 21 + CAST ( NULL AS INTEGER ) AS col2, CASE 87 WHEN + 31 THEN - 8 WHEN - 3 THEN - 58 WHEN - - 59 THEN NULL END

Expected: ["NULL","NULL"] but got ["21","NULL"]
```


```sql
SELECT ALL - ( CASE WHEN + CAST ( 98 AS INTEGER ) BETWEEN + CAST ( NULL AS INTEGER ) * + ( 57 ) + + CAST ( - SUM ( + 89 ) AS REAL ) AND NULL THEN CASE COALESCE ( ( 71 ), + - COALESCE ( 11, + - CAST ( NULL AS INTEGER ), CASE 16 WHEN 70 THEN + 72 ELSE - 48 * + 52 END + 89 ) ) WHEN + + 23 THEN - + 30 END ELSE NULL END ) AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT + COUNT ( * ) AS col2, - 3 + - + ( - - 70 ) / COALESCE ( + COUNT ( * ), + - 11 * 97 ) + - + CASE + CASE COUNT ( * ) WHEN - + 38 * + - 26 THEN - + 14 * ( + 56 ) ELSE NULL END WHEN - CAST ( + 44 AS INTEGER ) + - - 28 + + - 51 * - 9 THEN ( - 73 ) + 14 END AS col2

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( + MIN ( DISTINCT 28 ) AS INTEGER ) * NULLIF ( + + 2, + ( CASE + ( + 33 ) WHEN + + 52 / - + 90 THEN + + 44 END ) ) / + + 41 AS col2

g is not defined
```


```sql
SELECT - COUNT ( * ) AS col0, 80 / - NULLIF ( + CAST ( COUNT ( * ) AS INTEGER ), - 21 / COUNT ( * ) + - 98 )

Expected: ["-1","-80"] but got ["-1","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col0, + 76 * CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1810 failed
* 81% was OK

Time: 22450ms

---- ---- ---- ---- ---- ---- ----
### 425/622 [`./test/random/expr/slt_good_52.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_52.test)

_Mimic sqlite_

```sql
SELECT ALL - + 50 + 53 AS col0, ( - CAST ( - - COUNT ( * ) AS INTEGER ) ) * + 15 AS col2

g is not defined
```


```sql
SELECT ALL 98 / + + 41 AS col2

Expected: ["2"] but got ["2.390"]
```


```sql
SELECT + - 35 + - + CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["-35"]
```


```sql
SELECT COUNT ( * ) - ( + 44 ) + - COUNT ( * ) AS col2, - 41 * - CASE 48 WHEN + 21 * - + CASE - + COUNT ( * ) WHEN - 3 THEN + - 7 * + + ( + 69 ) END * 30 - 35 THEN + 46 END AS col2

Expected: ["-44","NULL"] but got ["NULL"]
```


```sql
SELECT + 33 * + - CASE - 23 WHEN + 11 THEN - 0 + + CAST ( NULL AS INTEGER ) WHEN - 77 THEN NULL END AS col2, + 61 + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","61"]
```


```sql
SELECT - COUNT ( * ) * + - ( + 46 ) / - 55 * CAST ( - COUNT ( * ) * 12 AS INTEGER )

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT - 21 * - COALESCE ( - 5, 79, + AVG ( - 25 ) / + COUNT ( * ) + - 39 + + - 2 + CASE - + 51 WHEN - - 25 * 40 + - CASE WHEN 64 IS NOT NULL THEN NULL WHEN - 25 BETWEEN NULL AND 36 + 23 THEN NULL ELSE + 79 + CASE 48 + + ( - 0 - ( 33 ) * 68 ) WHEN + ( 90 ) - 95 * - 87 THEN NULL WHEN + 53 * 34 THEN 95 ELSE CAST ( + 83 AS INTEGER ) + + 72 END END THEN - 95 * 36 - + 20 ELSE NULL END + - 53 ) * - ( +…

Cannot read property 'toString' of undefined
```


```sql
SELECT - + 4 / + 38 + + + 19 - + - 39 + - COUNT ( * ) + CAST ( NULL AS INTEGER ) / - COUNT ( * ) + 96 * - 91 + - 97, - 82 + 69 * + ( CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["-8776.105","-82"]
```


```sql
SELECT + 52 * - - 49 * + 38 AS col1, + 52 + - + CAST ( NULL AS REAL ) AS col1

Expected: ["96824","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1919 failed
* 80% was OK

Time: 21527ms

---- ---- ---- ---- ---- ---- ----
### 426/622 [`./test/random/expr/slt_good_53.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_53.test)

_Mimic sqlite_

```sql
SELECT 52 * 75 / + 95 AS col2, SUM ( DISTINCT + 67 ) + + + 29 + - 62 * - 97 * - + 80 AS col1

Expected: ["41","-481024"] but got ["41.053","-481024"]
```


```sql
SELECT ALL CASE + 75 WHEN - 57 THEN NULL ELSE - + CASE - 36 WHEN + NULLIF ( ( + - ( - 61 ) ), 36 ) THEN - + AVG ( 61 ) ELSE 74 + + 28 + 1 - 71 + - + COUNT ( * ) + - 41 END END + - 80 * CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL"] but got ["10"]
```


```sql
SELECT SUM ( + 36 ) * + NULLIF ( + - 37, 58 ) * + 60 * + 5 + + CAST ( NULL AS INTEGER ) + 70 * NULLIF ( 22, 27 ) + - 44, AVG ( 3 ) / - + SUM ( ALL - CASE 83 WHEN 2 THEN 9 + + 3 * - 73 ELSE NULL END ) * COUNT ( * ) + COUNT ( * )

Expected: ["NULL","NULL"] but got ["-398104","NULL"]
```


```sql
SELECT DISTINCT COALESCE ( - CAST ( MIN ( 31 ) AS INTEGER ), 82 - - - 45 ) + - - 23 + - 31 * 93 * - 52 * 42 * + ( - - 19 ) col0

g is not defined
```


```sql
SELECT 24 * - - ( + - 85 ) * CASE WHEN NOT ( NULL ) NOT BETWEEN - CAST ( - - 55 AS INTEGER ) AND + COALESCE ( 75, + + 79 ) * - AVG ( ALL - 25 ) THEN + 81 ELSE - + 40 END + 40

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL 42 - + COALESCE ( - + 94, + SUM ( COALESCE ( 86, - 89 * - 66 + + + 17 / + + 92, - COALESCE ( 45, - 8, CAST ( - 79 AS INTEGER ) + + ( + 0 ), + 8 ) ) ) + + + 41 ) AS col1, + ( - + CASE - + 22 WHEN 27 * - COUNT ( * ) THEN - 79 - - + 45 WHEN + 92 / + + 69 * + - 21 THEN - CAST ( - 94 AS INTEGER ) END ) AS col1

Expected: ["136","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT 64 / COUNT ( * ) + - 61 + + CAST ( NULL AS INTEGER ) + + + 28 * ( - 4 ) * + MAX ( + 86 ) + 75 AS col1, - MAX ( ALL + 20 ) - - CASE + 10 WHEN + + 28 THEN - 2 / 95 WHEN - 60 * - 97 THEN NULL ELSE CAST ( NULL AS INTEGER ) + COUNT ( * ) END + COUNT ( * ) AS col0

Expected: ["NULL","NULL"] but got ["-9554","-18"]
```


```sql
SELECT + 49 + CASE - 0 WHEN - CAST ( NULL AS INTEGER ) THEN NULL ELSE 15 END AS col0

Expected: ["64"] but got ["NULL"]
```


```sql
SELECT 3 AS col2, CAST ( NULL AS REAL ) AS col2

Expected: ["3","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 58 + - - 44 / + 86

Expected: ["58"] but got ["58.512"]
```

#### ☓ Ran 10012 tests as sqlite

* 1834 failed
* 81% was OK

Time: 21824ms

---- ---- ---- ---- ---- ---- ----
### 427/622 [`./test/random/expr/slt_good_54.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_54.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 51, + CAST ( NULL AS INTEGER ) AS col2

Expected: ["51","NULL"] but got ["51","0"]
```


```sql
SELECT + COUNT ( * ) / MIN ( DISTINCT - 41 ) * 88

Expected: ["0"] but got ["-2.146"]
```


```sql
SELECT DISTINCT 55, CAST ( + COUNT ( * ) AS INTEGER ) * + 89 col0

g is not defined
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS INTEGER ) - - 35 AS col0

Expected: ["NULL","NULL"] but got ["0","35"]
```


```sql
SELECT - ( - - CAST ( NULL AS REAL ) ) + + 13 col0, + 96 + - ( + CAST ( + CAST ( NULL AS INTEGER ) AS INTEGER ) ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","96"]
```


```sql
SELECT ALL + CASE WHEN NOT SUM ( + - 68 ) = NULL THEN NULL ELSE 21 END AS col1

Expected: ["21"] but got ["NULL"]
```


```sql
SELECT ALL 38 + 47 * - + 90 - - CASE WHEN NOT NULL BETWEEN NULL AND 61 THEN + NULLIF ( - 1, - 90 - + COALESCE ( - ( 72 ), - 3, 56 / 75 - 28 ) * COUNT ( * ) ) * - 4 ELSE ( 0 ) END

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 1455 failed
* 85% was OK

Time: 16152ms

---- ---- ---- ---- ---- ---- ----
### 428/622 [`./test/random/expr/slt_good_55.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_55.test)

_Mimic sqlite_

```sql
SELECT + 5 / - 43 AS col2

Expected: ["0"] but got ["-0.116"]
```


```sql
SELECT + 54 - - 6 + CAST ( NULL AS INTEGER ) / + COALESCE ( - + 81, CAST ( NULL AS INTEGER ) + + 49 ) col1

Expected: ["NULL"] but got ["60"]
```


```sql
SELECT - CAST ( - COUNT ( * ) AS INTEGER ) * + 5 + 80 + - 41 col0

g is not defined
```


```sql
SELECT + 93 + + 87 * - - CASE - + 71 WHEN - 15 * 76 THEN - + CAST ( NULL AS INTEGER ) END * 32 + 7 * COUNT ( * ) + 38 AS col0, + CAST ( NULL AS INTEGER ) + - 37 + - 53 * + 81 + + + 93

Expected: ["NULL","NULL"] but got ["NULL","-4237"]
```


```sql
SELECT + ( + + NULLIF ( - COUNT ( ALL - CAST ( NULL AS INTEGER ) ), - 14 ) ) AS col1, - CASE + 63 WHEN + - 85 THEN - 42 - - COUNT ( * ) * - - COALESCE ( + 80, + + 99, 28 * + 37 + + 69 ) END / - 26 AS col0

Expected: ["0","NULL"] but got ["-1","NULL"]
```


```sql
SELECT 45 * + CAST ( NULL AS INTEGER ) col0, CAST ( NULL AS INTEGER ) + + 50 * + - MIN ( 71 ) AS col2

Expected: ["NULL","NULL"] but got ["0","-3550"]
```


```sql
SELECT + - COALESCE ( - NULLIF ( - 33, + CASE WHEN - 89 NOT BETWEEN - + COALESCE ( + + 64, + 48 ) * + - 14 + + 11 + COALESCE ( 39, COUNT ( * ), 98 * ( + 87 ) + 36 ) * 79 AND 28 THEN COUNT ( * ) + - ( 87 + 71 ) END - 15 / ( 14 ) ), 27, SUM ( 28 ) ) + 34

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - 23 * 6 + - ( - ( - 61 ) ) col1, CAST ( NULL AS REAL ) AS col1

Expected: ["-199","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT + CASE WHEN CAST ( NULL AS INTEGER ) IS NULL THEN + + 34 * + COUNT ( * ) ELSE NULL END col1

Expected: ["34"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1939 failed
* 80% was OK

Time: 22487ms

---- ---- ---- ---- ---- ---- ----
### 429/622 [`./test/random/expr/slt_good_56.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_56.test)

_Mimic sqlite_

```sql
SELECT - 61 * + CAST ( COUNT ( DISTINCT 4 ) AS INTEGER ) AS col1

g is not defined
```


```sql
SELECT ALL - CAST ( - COUNT ( * ) AS INTEGER ) + + 31 * - MAX ( 19 ) * + 82 * + CASE - COUNT ( * ) WHEN ( + + CAST ( + 38 AS INTEGER ) ) THEN + ( 19 ) WHEN + 2 + + 40 THEN NULL ELSE - 37 + + CAST ( + 29 AS INTEGER ) * - CAST ( NULL AS INTEGER ) END + 26 + + 98

Expected: ["NULL"] but got ["1787150"]
```


```sql
SELECT DISTINCT MAX ( - 91 ) / + 42 - - 60 + + COUNT ( * ) + 3

Expected: ["62"] but got ["61.833"]
```


```sql
SELECT 73 col0, + 8 + - COALESCE ( + COUNT ( * ), - 81 + COUNT ( * ) ) - + CAST ( NULL AS REAL ) AS col0

Expected: ["73","NULL"] but got ["NULL"]
```


```sql
SELECT CASE WHEN NOT - 49 BETWEEN - ( - COALESCE ( - ( ( 22 ) ), - MAX ( 11 ) ) ) AND 78 + - 94 THEN NULL WHEN ( NULL ) NOT IN ( ( 60 ) ) THEN 50 / 26 ELSE 53 * - 71 + 40 END + 61 * + 19

Cannot read property 'toString' of undefined
```


```sql
SELECT + MAX ( + 86 ) / CAST ( COUNT ( * ) / - 14 + + 41 AS INTEGER ) + 63 / 17

Expected: ["5"] but got ["NULL"]
```


```sql
SELECT ALL - MIN ( DISTINCT + - 11 ) * CAST ( NULL AS INTEGER ) * + + NULLIF ( 51, 54 ) * + 71 + - - COUNT ( * ) - - - 9 - + + 30 * + + 81 * 70 * - - 15 + + 4, CASE - ( 59 ) WHEN + CAST ( NULL AS INTEGER ) + 29 THEN NULL WHEN + 93 * + - CASE 46 WHEN + + 48 THEN + COUNT ( * ) WHEN - + 95 THEN NULL END + - CAST ( NULL AS INTEGER ) THEN + 54 ELSE NULL END AS col1

Expected: ["NULL","NULL"] but got ["-2551504","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1873 failed
* 81% was OK

Time: 23112ms

---- ---- ---- ---- ---- ---- ----
### 430/622 [`./test/random/expr/slt_good_57.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_57.test)

_Mimic sqlite_

```sql
SELECT - + 31 / 46

Expected: ["0"] but got ["-0.674"]
```


```sql
SELECT ALL - - CAST ( NULL AS INTEGER ) + - ( - 84 ) + - 65 + - 13 * + 4 + - 13 AS col2

Expected: ["NULL"] but got ["-46"]
```


```sql
SELECT ALL 94 * + CAST ( + CASE + + ( + 29 ) WHEN - 69 THEN - 13 WHEN - 52 THEN NULL ELSE - CASE + 50 WHEN COUNT ( * ) THEN - 80 * 69 END * + 66 END AS INTEGER )

g is not defined
```


```sql
SELECT ALL - 71 AS col2, CASE + MAX ( ALL 23 ) WHEN + 31 + - + 21 THEN 14 ELSE NULL END * + COUNT ( * ) AS col2

Expected: ["-71","NULL"] but got ["NULL"]
```


```sql
SELECT - - 98 * + + NULLIF ( + AVG ( ALL ( - COALESCE ( - 11, + 92, - + 44 * + ( + 58 ) + 41, + - 91 ) ) ), 11 ), CAST ( NULL AS INTEGER ) / - + COUNT ( * )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + COUNT ( * ) + - CAST ( NULL AS INTEGER ) AS col1, 97 - - + AVG ( - + 50 ) + - + CAST ( NULL AS INTEGER ) + - - 36 AS col2

Expected: ["NULL","NULL"] but got ["1","83"]
```


```sql
SELECT DISTINCT - 97 - + CASE WHEN + 83 >= NULL THEN COALESCE ( ( - COUNT ( * ) ), 40 * 0, + 42 ) + AVG ( 14 ) WHEN NOT - 46 / + 1 NOT BETWEEN MIN ( ALL - 40 ) - ( COUNT ( * ) ) * - COUNT ( * ) AND NULL THEN NULL END + + COALESCE ( - 83, 4 + + 8, COUNT ( * ) ) * - 97 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - COUNT ( * ) * CASE WHEN NULL NOT IN ( + 55, - 6 ) THEN NULL ELSE + 74 + + 47 END AS col2

Expected: ["-121"] but got ["NULL"]
```


```sql
SELECT DISTINCT - 22 AS col1, + 85 + 41 + + CASE + 22 WHEN 96 THEN NULL WHEN - 94 THEN + ( 59 ) * - 42 - + 10 END AS col1

Expected: ["-22","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1841 failed
* 81% was OK

Time: 22859ms

---- ---- ---- ---- ---- ---- ----
### 431/622 [`./test/random/expr/slt_good_58.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_58.test)

_Mimic sqlite_

```sql
SELECT + 82 + + + 32 / 65 col1

Expected: ["82"] but got ["82.492"]
```


```sql
SELECT DISTINCT NULLIF ( 18, + 77 ) * - 45 + - - CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["-810"]
```


```sql
SELECT DISTINCT - + 56 * COALESCE ( + CAST ( + COUNT ( * ) AS INTEGER ), + 21 ) AS col1

g is not defined
```


```sql
SELECT ALL + 40, - CASE WHEN NOT + 26 BETWEEN + - 95 * + 70 / - + 96 AND - ( + - 84 ) THEN NULL WHEN + 7 BETWEEN ( + NULLIF ( + 97, + - 26 * + 45 * 0 ) ) AND NULL THEN - 34 ELSE NULL END col1

Cannot read property 'toString' of undefined
```


```sql
SELECT 86 AS col0, + ( - 50 ) + - + ( + CASE + 77 WHEN CAST ( + 14 AS INTEGER ) THEN + 89 WHEN - 81 * - 25 THEN NULL END ) - + 21 * COUNT ( DISTINCT - 32 ) AS col0

Expected: ["86","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS REAL ) * 88, COUNT ( * ) / CAST ( + + MIN ( - 8 ) AS INTEGER ) col2

Expected: ["NULL","0"] but got ["NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / - - 61 AS col1, + NULLIF ( CAST ( NULL AS REAL ), + + 80 ) * + + 36

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ), + 97 + - CAST ( NULL AS INTEGER ) - + 93 AS col0

Expected: ["NULL","NULL"] but got ["0","4"]
```


```sql
SELECT - MIN ( ALL + 40 ) / - + CAST ( - MIN ( - - 20 ) AS INTEGER ) + - - 21 AS col2

Expected: ["19"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1815 failed
* 81% was OK

Time: 22907ms

---- ---- ---- ---- ---- ---- ----
### 432/622 [`./test/random/expr/slt_good_59.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_59.test)

_Mimic sqlite_

```sql
SELECT ALL - 41 / - 55 + + COUNT ( * )

Expected: ["1"] but got ["1.745"]
```


```sql
SELECT ALL + 58 * + CAST ( NULL AS INTEGER ) + - 96

Expected: ["NULL"] but got ["-96"]
```


```sql
SELECT 63 * CAST ( - COUNT ( * ) AS INTEGER ), 48 AS col0

g is not defined
```


```sql
SELECT - CASE WHEN NOT ( NULL ) BETWEEN NULL AND - 50 THEN NULL ELSE + - 87 END col1

Cannot read property 'toString' of undefined
```


```sql
SELECT + COUNT ( ALL + + 19 ) * ( 30 ) * + ( + - CAST ( MAX ( ALL + 6 ) AS INTEGER ) ) AS col2, - NULLIF ( CAST ( NULL AS INTEGER ), + COUNT ( * ) ) * + 90 / + - CAST ( NULL AS INTEGER )

Expected: ["-180","NULL"] but got ["0","NULL"]
```


```sql
SELECT + MAX ( + + 32 ) + - 63 / - + 91 + + CAST ( NULL AS REAL ), + 95 * - CAST ( NULL AS INTEGER ) - 66

Expected: ["NULL","NULL"] but got ["NULL","-66"]
```


```sql
SELECT ALL 85 * 56 * + 49 AS col2, CAST ( NULL AS REAL ) * 40 AS col2

Expected: ["233240","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - - 84 * - 91 * + ( 50 ) - - - 34 * + NULLIF ( - + ( + 25 ), + - 93 - - 4 ) + + 21 + - 97 / + CAST ( - COUNT ( * ) AS INTEGER ) + + + 67 - + 98 / COUNT ( ALL + 15 ) col2

Expected: ["-381263"] but got ["NULL"]
```


```sql
SELECT 14 * + - 33 + - 85 * - + CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) / + NULLIF ( 87, + 60 ) * - 64 AS col1

Expected: ["NULL","NULL"] but got ["-462","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1841 failed
* 81% was OK

Time: 21618ms

---- ---- ---- ---- ---- ---- ----
### 433/622 [`./test/random/expr/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_6.test)

_Mimic sqlite_

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
SELECT + CASE AVG ( ALL 99 ) WHEN - COUNT ( * ) + + + 55 + - ( - 21 ) THEN NULL ELSE CAST ( NULL AS INTEGER ) END + - - COALESCE ( + 25, ( - + 0 ) * - 22, 93 ) + - + 29 * + 92

Expected: ["NULL"] but got ["-2643"]
```


```sql
SELECT DISTINCT - 69 + + CAST ( NULL AS INTEGER ) AS col1, - 40 - - 10 * + 5 AS col0, + SUM ( ALL CAST ( NULL AS INTEGER ) ) * + 74

Expected: ["NULL","10","NULL"] but got ["-69","10","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1873 failed
* 81% was OK

Time: 46413ms

---- ---- ---- ---- ---- ---- ----
### 434/622 [`./test/random/expr/slt_good_60.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_60.test)

_Mimic sqlite_

```sql
SELECT ALL - 89 * + CAST ( - COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT + COUNT ( DISTINCT - CAST ( - ( + CAST ( NULL AS INTEGER ) ) AS INTEGER ) ) AS col2

Expected: ["0"] but got ["1"]
```


```sql
SELECT 36 * + 74 * CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT 69 / - 21 - + + AVG ( 47 ) + + CASE + 57 WHEN COUNT ( * ) + + COUNT ( * ) THEN - + ( + 4 ) END + + 20 AS col0, CAST ( NULL AS INTEGER ) + - 28 + + COUNT ( * ) AS col0

Expected: ["NULL","NULL"] but got ["-27"]
```


```sql
SELECT DISTINCT - 52 / + + 16 + 73 * + 6 + 28 / - ( + CASE 1 WHEN ( - 58 ) THEN - + 40 WHEN - NULLIF ( + - COALESCE ( 78, - + COUNT ( * ) / + + 13 * + 54 + - - 76 ), + 41 ) / 68 THEN - - 58 * + - COUNT ( * ) + + 20 END ) AS col2

Expected: ["435"] but got ["NULL"]
```


```sql
SELECT ALL - CASE + MAX ( DISTINCT - ( - + 3 ) ) WHEN COALESCE ( - - 93, + 87, - + COALESCE ( - 51, 42 + - 82 + - NULLIF ( 39, + - 11 ) ) * - 4 - + 32 ) THEN - 6 - + 31 END * 89 AS col0, 97

Expected: ["NULL","97"] but got ["97","NULL"]
```


```sql
SELECT 26 * - CAST ( NULL AS REAL ), CAST ( NULL AS INTEGER ) * 16 + - CAST ( 25 AS REAL ) AS col1

Expected: ["NULL","NULL"] but got ["NULL","-25"]
```


```sql
SELECT DISTINCT 11 + - COUNT ( * ) + SUM ( ALL + 48 ) + - + COUNT ( * ) / NULLIF ( - 48, 50 * + + 34 * + CASE WHEN NULL IS NOT NULL THEN NULL WHEN NULL NOT BETWEEN ( + COALESCE ( 5, - 53 ) ) AND 93 THEN - 4 END + + MAX ( DISTINCT COALESCE ( - 51, 39, + 27 ) ) * + 40 ) + + 57 / - 77 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT 91 AS col2, 90 * - - CASE 22 WHEN CAST ( NULL AS INTEGER ) * 60 THEN - 52 WHEN + 94 * - 13 THEN NULL END - 61 * + 19 AS col2

Expected: ["91","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1857 failed
* 81% was OK

Time: 53314ms

---- ---- ---- ---- ---- ---- ----
### 435/622 [`./test/random/expr/slt_good_61.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_61.test)

_Mimic sqlite_

```sql
SELECT DISTINCT NULLIF ( + SUM ( ( ( + 5 ) ) ), + 66 + - ( + 85 ) ) / - - 87 + + 13 * + 47

Expected: ["611"] but got ["611.057"]
```


```sql
SELECT DISTINCT - - 51 + + - CAST ( - + COUNT ( 49 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL - ( - + ( CAST ( NULL AS INTEGER ) ) ) AS col1, - 31 - - + 48

Expected: ["NULL","17"] but got ["0","17"]
```


```sql
SELECT - 86 + - + 69 + 30 * - 39 + - - 45 AS col2, CASE WHEN NOT ( NULL ) NOT BETWEEN - COALESCE ( + 91, - - 2 ) AND AVG ( ALL ( 40 ) ) THEN - 3 + 82 END + - 69 col1

Cannot read property 'toString' of undefined
```


```sql
SELECT 25 * - + 78 * CASE - 71 WHEN 5 THEN - COUNT ( * ) END AS col2, 91

Expected: ["NULL","91"] but got ["91","NULL"]
```


```sql
SELECT DISTINCT + 58 * + COUNT ( * ) + AVG ( ALL - ( + CAST ( NULL AS INTEGER ) ) ) AS col0, CAST ( NULL AS INTEGER ) * COUNT ( * ) AS col2

Expected: ["NULL","NULL"] but got ["58","0"]
```


```sql
SELECT ALL - CAST ( NULL AS REAL ), + CAST ( + + CAST ( NULL AS INTEGER ) AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT - 79 AS col0, + CASE - - 28 WHEN + 13 THEN - + 3 - + CAST ( NULL AS INTEGER ) ELSE NULL END col0

Expected: ["-79","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + CASE WHEN NOT ( 30 ) >= NULL THEN NULL ELSE 2 END * + 48 + + + 83 * 97 + 12

Expected: ["8159"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1860 failed
* 81% was OK

Time: 52497ms

---- ---- ---- ---- ---- ---- ----
### 436/622 [`./test/random/expr/slt_good_62.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_62.test)

_Mimic sqlite_

```sql
SELECT + 14 / + 60

Expected: ["0"] but got ["0.233"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * 19

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - CASE + - 58 WHEN 81 * + 23 * CASE WHEN - COUNT ( * ) < NULL THEN - - NULLIF ( - COALESCE ( + 75, 97 ), 61 - - 50 * 6 ) + NULLIF ( 3 + 69 * 42, 60 + - 80 ) WHEN NOT ( - 17 * COUNT ( * ) + COUNT ( * ) ) NOT BETWEEN ( 23 ) AND ( - 51 ) THEN + MAX ( DISTINCT 51 ) END + 54 * + 9 THEN 43 + CAST ( NULL AS INTEGER ) * 46 WHEN NULLIF ( - 14, - 98 ) THEN NULL WHEN CASE 87 WHEN COALESCE ( 65, COUNT…

Cannot read property 'toString' of undefined
```


```sql
SELECT 20 * 25 * + - CAST ( - - 10 AS INTEGER ) * - 59 + NULLIF ( - CAST ( - + ( + COALESCE ( - - CASE + - COUNT ( * ) WHEN - + 2 * + ( + - 31 ) THEN NULL ELSE + 96 END, - 96 * - 70, 21 * - 34 ) ) AS INTEGER ), - CAST ( NULL AS INTEGER ) ) + + 59 * 0 AS col0

g is not defined
```


```sql
SELECT - NULLIF ( - 54, - COUNT ( 43 ) / + - 58 * - 16 - + 70 ) * + CAST ( NULL AS INTEGER ) AS col2, + NULLIF ( - CAST ( - - CASE + AVG ( ALL - - 5 ) WHEN - 72 / 94 THEN - 32 END AS INTEGER ), + - 28 ) * + + ( - + 75 ) - + 57 * + 8 + + COALESCE ( 59, - 2 * ( COUNT ( 62 ) ), 38 )

Expected: ["NULL","NULL"] but got ["0","-397"]
```


```sql
SELECT + AVG ( + - ( + 74 ) ) + - 86 * + - CAST ( NULL AS INTEGER ) AS col2, COUNT ( * ) + - + CASE - 68 WHEN - 66 THEN + + 21 WHEN - SUM ( DISTINCT - 28 ) THEN NULL END + 12 * + + 46

Expected: ["NULL","NULL"] but got ["-74","NULL"]
```


```sql
SELECT 79 * + + 18 + + - COUNT ( * ) / - CAST ( MAX ( 57 ) AS INTEGER ) AS col1

Expected: ["1422"] but got ["NULL"]
```


```sql
SELECT ALL ( - CASE 58 WHEN + 62 THEN + - 81 WHEN - NULLIF ( 19, 42 / + 94 + + 89 + + + 67 ) * - - 50 THEN 57 END ) AS col0, ( 40 ) / + 99 AS col2

Expected: ["NULL","0"] but got ["NULL","0.404"]
```


```sql
SELECT ALL - 29 AS col0, CASE + 8 WHEN - + 25 THEN - 15 ELSE NULL END * - - 28 AS col0

Expected: ["-29","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1900 failed
* 81% was OK

Time: 49222ms

---- ---- ---- ---- ---- ---- ----
### 437/622 [`./test/random/expr/slt_good_63.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_63.test)

_Mimic sqlite_

```sql
SELECT CAST ( NULL AS INTEGER ) / 76

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT 52 / 72 * - COALESCE ( + 14, - COUNT ( * ) * - 38 ) AS col0

Expected: ["0"] but got ["-10.111"]
```


```sql
SELECT ALL 65 + - CAST ( + COUNT ( * ) AS INTEGER ) + + 37 * + CAST ( NULL AS INTEGER )

g is not defined
```


```sql
SELECT + - 98 * - + COUNT ( * ) + - NULLIF ( 49, + + 51 * + MAX ( - - 58 ) - CAST ( NULL AS INTEGER ) ) + 80 / CAST ( - + MAX ( - 41 ) AS INTEGER ) * - 73 + - - 63 * - + 86

Expected: ["-5442"] but got ["NULL"]
```


```sql
SELECT ALL + ( - - COUNT ( * ) ) / CASE WHEN NOT ( NOT - - ( ( - ( - COUNT ( * ) ) ) ) NOT BETWEEN NULL AND - 57 ) THEN + 5 / + + COUNT ( * ) + 35 + + 91 WHEN ( 48 ) + 82 IS NULL THEN NULL ELSE + CASE + ( 52 ) WHEN 4 THEN NULL WHEN - 0 + 85 THEN NULL ELSE 52 END END + - 77 * 76 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - CASE 93 WHEN 25 THEN - 23 WHEN + - COUNT ( * ) THEN 45 END AS col2, 97

Expected: ["NULL","97"] but got ["97","NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * - COUNT ( * ) + + MAX ( ALL + 49 ) - - CASE + 19 WHEN - + 5 - 9 + + 22 - - - 72 THEN NULL ELSE - 1 * - 57 - + - 84 - - + 24 * - - 86 END + - 37 / + - 75 AS col0, 7 AS col2, - + COUNT ( * ) + - 43 * CASE - COUNT ( * ) WHEN - COALESCE ( - 97, - 11, + - COALESCE ( 95, + MIN ( ( 18 ) ), 65 ) ) * - 1 THEN NULLIF ( - ( + 11 ), - 4 ) * COUNT ( * ) + 47 WHEN 28 …

Expected: ["NULL","7","NULL"] but got ["NULL","7"]
```


```sql
SELECT + 97 + CAST ( NULL AS INTEGER ), - MAX ( - - CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["97","0"]
```


```sql
SELECT 77 AS col2, 51 + 23 AS col0, - 76 AS col0

Expected: ["77","74","-76"] but got ["77","-76","-76"]
```

#### ☓ Ran 10012 tests as sqlite

* 1858 failed
* 81% was OK

Time: 59153ms

---- ---- ---- ---- ---- ---- ----
### 438/622 [`./test/random/expr/slt_good_64.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_64.test)

_Mimic sqlite_

```sql
SELECT + CAST ( + - COUNT ( * ) AS INTEGER ) * - SUM ( ALL 20 ) + 33 + - 11 - 8 + - 74 + + 93

Expected: ["53"] but got ["33"]
```


```sql
SELECT 45 + - 10 * CASE + CAST ( NULL AS INTEGER ) WHEN 30 - CAST ( - COUNT ( * ) AS INTEGER ) / + - 27 THEN + NULLIF ( + 21, 3 * 39 - 33 ) WHEN + ( + CAST ( NULL AS REAL ) ) THEN NULL END AS col2

g is not defined
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) AS col1, 68 * - 62 + - 89

Expected: ["NULL","-4305"] but got ["0","-4305"]
```


```sql
SELECT ALL + 16 + - 65 * + CAST ( NULL AS INTEGER ) AS col0, - CASE - - 72 WHEN + 50 THEN - + 14 WHEN + 42 * + - CASE - 1 WHEN 19 THEN NULL WHEN CASE + COUNT ( * ) WHEN 52 * + 83 THEN 33 WHEN + 0 THEN NULL ELSE NULL END - 19 THEN - COUNT ( DISTINCT + 38 ) END THEN NULL END + 43

Expected: ["NULL","NULL"] but got ["16","NULL"]
```


```sql
SELECT DISTINCT + ( + - COUNT ( * ) ) / - COALESCE ( CAST ( NULL AS INTEGER ), + 97 + 71 / + 9 * 77 ) + 91 * - 88 * - ( - 16 ) * - + 44 col2

Expected: ["5637632"] but got ["NULL"]
```


```sql
SELECT ALL + CASE WHEN NOT NULL IS NOT NULL THEN + CAST ( - 81 AS INTEGER ) WHEN NOT NULL NOT BETWEEN NULL AND 15 * 92 - - 64 THEN NULL ELSE NULL END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT 16 - - + 65 + - CAST ( + COUNT ( * ) AS INTEGER ) + + 76 + 11 * + 36 AS col0, 39 - - 37 - + CASE + 13 WHEN COUNT ( * ) + - 2 * + + 2 THEN + 60 * - CASE - 47 WHEN + + 57 + - - 21 THEN - + COUNT ( * ) * + - 13 ELSE - 45 END - 41 * + 39 WHEN + + CAST ( NULL AS INTEGER ) THEN NULL ELSE NULL END AS col0

Expected: ["552","NULL"] but got ["NULL"]
```


```sql
SELECT ALL 7 / - CAST ( NULL AS INTEGER ) AS col1, + CAST ( NULL AS INTEGER ) * + - 30 AS col1

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1909 failed
* 80% was OK

Time: 38606ms

---- ---- ---- ---- ---- ---- ----
### 439/622 [`./test/random/expr/slt_good_65.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_65.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + ( ( - - CAST ( NULL AS INTEGER ) ) ) AS col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT COUNT ( * ) / - + 86 AS col1

Expected: ["0"] but got ["-0.012"]
```


```sql
SELECT ALL + + CAST ( + SUM ( + 36 ) AS INTEGER )

g is not defined
```


```sql
SELECT + + COUNT ( ALL - 96 ) / + CAST ( - COUNT ( * ) AS INTEGER )

Expected: ["-1"] but got ["NULL"]
```


```sql
SELECT ALL + CASE WHEN NULL NOT BETWEEN NULL AND NULL THEN ( + 62 ) END

Cannot read property 'toString' of undefined
```


```sql
SELECT + - CAST ( NULL AS INTEGER ), - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - CAST ( NULL AS REAL ) col1, + ( - CAST ( NULL AS INTEGER ) ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + - 14 / - 71 * 35 col2, COALESCE ( - 94, - 30 * - + 34, - CAST ( NULL AS INTEGER ) ) * 63 * + 40 / + CAST ( NULL AS INTEGER ) AS col2

Expected: ["0","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1547 failed
* 84% was OK

Time: 35373ms

---- ---- ---- ---- ---- ---- ----
### 440/622 [`./test/random/expr/slt_good_66.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_66.test)

_Mimic sqlite_

```sql
SELECT 80 / + 92

Expected: ["0"] but got ["0.870"]
```


```sql
SELECT 57 AS col1, 52 * - + 35, + CAST ( NULL AS REAL ) AS col1

Expected: ["57","-1820","NULL"] but got ["NULL","-1820","NULL"]
```


```sql
SELECT - 82 AS col1, - 56 - + CAST ( NULL AS INTEGER ) + + MAX ( - + 6 )

Expected: ["-82","NULL"] but got ["-82","-62"]
```


```sql
SELECT + CAST ( COUNT ( ALL + + ( - 95 ) ) AS INTEGER )

g is not defined
```


```sql
SELECT 51 * 90 + + CASE - 42 WHEN + COUNT ( * ) THEN NULL WHEN + 21 THEN - + CAST ( NULL AS INTEGER ) ELSE NULL END AS col0, 59

Expected: ["NULL","59"] but got ["59","NULL"]
```


```sql
SELECT + CASE + 59 WHEN + 76 + - - 52 + ( - 68 ) * 91 THEN 58 END + - + 94 * 13 col2, NULLIF ( + + COALESCE ( - SUM ( - - 73 ), - 11 ), + 87 ) * CAST ( NULL AS INTEGER ) + - + 20

Expected: ["NULL","NULL"] but got ["NULL","-20"]
```


```sql
SELECT ALL CASE - ( - 50 ) WHEN + CAST ( - + COALESCE ( - 25, 24, - 56 / 64 + 73 ) AS INTEGER ) THEN 63 * - 57 WHEN - 94 * 53 THEN + 49 / 21 END - CASE WHEN ( 37 ) NOT BETWEEN - NULLIF ( - 39, 25 ) AND ( NULL ) THEN NULL WHEN - COUNT ( * ) IS NOT NULL THEN - 68 - 55 ELSE NULL END AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT COALESCE ( + ( + 15 ), + COUNT ( * ) * 83 + + - ( 20 ) ) * - 31 + CASE WHEN NOT - AVG ( + 92 ) IN ( 47 ) THEN NULLIF ( 70, SUM ( 28 ) ) END / ( + 79 * - NULLIF ( - 18 * 17, - 17 ) + - 17 ) AS col1

Expected: ["-465"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1890 failed
* 81% was OK

Time: 47079ms

---- ---- ---- ---- ---- ---- ----
### 441/622 [`./test/random/expr/slt_good_67.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_67.test)

_Mimic sqlite_

```sql
SELECT 78, + 75 / + 81 + - 26 col0

Expected: ["78","-26"] but got ["78","-25.074"]
```


```sql
SELECT 2 + - CAST ( NULL AS INTEGER ) * - 35

Expected: ["NULL"] but got ["2"]
```


```sql
SELECT ALL - 85 + + ( 0 ) - - 3 - + COUNT ( * ) / + CAST ( + COUNT ( * ) AS INTEGER ) - 87 + + COUNT ( * ) * - COUNT ( * ) * - MIN ( ALL COALESCE ( + 21, + - 89, + 1 * - 2 ) ) / 2 AS col2

Expected: ["-160"] but got ["NULL"]
```


```sql
SELECT ALL CAST ( - COUNT ( * ) AS INTEGER ) + + 13 AS col2

g is not defined
```


```sql
SELECT - 67 - + MAX ( + 45 ) - + CASE 66 WHEN 9 THEN - 59 END + + - 64 * + + 97 AS col0, 36

Expected: ["NULL","36"] but got ["36","NULL"]
```


```sql
SELECT DISTINCT - + 12 * 7 * + + CAST ( NULL AS INTEGER ) + 68 + + - 77, 97 / - ( - ( - 98 ) ) * + - COUNT ( * ) AS col1, - - CASE + COUNT ( * ) WHEN MAX ( 60 ) / - - 62 + 50 - 88 THEN + 2 END

Expected: ["NULL","0","NULL"] but got ["-9","0.990","NULL"]
```


```sql
SELECT ALL + CASE WHEN NOT SUM ( - + 52 ) NOT BETWEEN 87 AND - + 97 + + ( - 49 ) THEN - 12 + - COUNT ( DISTINCT - 8 + CASE NULLIF ( 26, + ( 89 ) * 5 ) WHEN - CAST ( + 3 AS INTEGER ) THEN - 93 WHEN - 71 + ( 35 ) THEN NULL ELSE 89 END ) ELSE NULL END

Cannot read property 'toString' of undefined
```


```sql
SELECT - ( + CAST ( NULL AS INTEGER ) ) AS col0, - ( MAX ( ALL + CAST ( NULL AS INTEGER ) ) ) * - - 52

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT 94 AS col1, + 69 * + 83 / - + CAST ( NULL AS INTEGER ) + - 43 AS col1

Expected: ["94","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1890 failed
* 81% was OK

Time: 31118ms

---- ---- ---- ---- ---- ---- ----
### 442/622 [`./test/random/expr/slt_good_68.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_68.test)

_Mimic sqlite_

```sql
SELECT + + 16 * - 90 + - - COUNT ( * ) / + 39

Expected: ["-1440"] but got ["-1439.974"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - 64 AS col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL COUNT ( + + 7 ) / + 15 * - + CAST ( AVG ( DISTINCT - 87 ) AS INTEGER ) * - - 61 AS col0

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT + - CASE CAST ( - COUNT ( * ) AS INTEGER ) WHEN 0 THEN + CAST ( COUNT ( * ) AS INTEGER ) ELSE - 93 END

g is not defined
```


```sql
SELECT DISTINCT - 67 * + CASE + + CASE WHEN 69 BETWEEN 12 AND 4 / + 13 - + AVG ( 27 ) + 45 THEN - 16 END WHEN 27 * 73 * + 80 + + NULLIF ( + 7, + 65 ) + - 54 + NULLIF ( + COALESCE ( + + 55, - 89 * 53 / ( - + 53 ) ), 88 ) * 34 - - 27 + 51 * - 50 THEN + 47 * - 50 ELSE MIN ( - 86 ) END + - COUNT ( * ) * 78 AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + 59 + + 98 + - + CAST ( NULL AS INTEGER ) + ( - CASE - 94 WHEN + 24 THEN + COUNT ( - 26 ) ELSE - - 60 END ) * - 78 AS col0, + 37 + - CASE 93 WHEN + ( 16 ) * + 58 * - 36 + + COUNT ( * ) + + - 56 * 48 * + 2 * + + SUM ( ALL + + 68 ) * - + 17 * + NULLIF ( - - 4, + - 61 + 16 + + 22 + - COUNT ( * ) / - COALESCE ( - + 73, + SUM ( DISTINCT - 85 ) * 17 + - 22 * - 68, + CAST ( 82 AS INTEGER ) /…

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT ALL - 97 * 28 AS col2, CAST ( NULL AS REAL ) AS col2

Expected: ["-2716","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL + COUNT ( * ) * - 42 * 45 - 2 + + - CAST ( NULL AS INTEGER ), - 95 + + COUNT ( * ) + + 70 * - + 51 * - SUM ( CASE ( 26 ) WHEN 13 THEN NULL WHEN 89 THEN NULL WHEN 58 * - 86 THEN 6 END ) + + COALESCE ( COUNT ( - 40 ), + CAST ( NULL AS REAL ) + + 40 ) * 90

Expected: ["NULL","NULL"] but got ["-1892","-4"]
```


```sql
SELECT DISTINCT - 72 - + + 41 / - + 36 AS col2, + COUNT ( + 57 ) * + 86 * - 9 * CASE 20 WHEN + 12 THEN + 59 + - 93 END + - 3

Expected: ["-71","NULL"] but got ["-70.861","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1788 failed
* 82% was OK

Time: 35917ms

---- ---- ---- ---- ---- ---- ----
### 443/622 [`./test/random/expr/slt_good_69.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_69.test)

_Mimic sqlite_

```sql
SELECT 89 / + - 12

Expected: ["-7"] but got ["-7.417"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) + - ( - - 82 ) col2

Expected: ["NULL"] but got ["-82"]
```


```sql
SELECT 33 / CAST ( - + COUNT ( 27 ) AS INTEGER )

g is not defined
```


```sql
SELECT + - CASE 11 WHEN + CAST ( NULL AS REAL ) THEN 9 * - 33 ELSE NULL END, 38 / - - MIN ( + 44 ) * - - 37 col0

Expected: ["NULL","0"] but got ["NULL","0.023"]
```


```sql
SELECT CASE - COUNT ( * ) WHEN + - 24 THEN - 37 WHEN - 39 / 34 THEN + NULLIF ( + 14, - SUM ( ALL + - 53 ) + + - COUNT ( * ) - 30 * - CAST ( NULL AS REAL ) ) END AS col1

Expected: ["14"] but got ["NULL"]
```


```sql
SELECT 18 * + CASE WHEN NOT 19 NOT BETWEEN NULL AND NULL THEN + COUNT ( * ) + 36 ELSE 38 * + 86 END AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), + CASE - COUNT ( * ) WHEN 28 / + 84 + - + CASE - 36 WHEN - 8 THEN + - 17 WHEN + 73 THEN NULL ELSE NULL END * NULLIF ( - CASE - 81 WHEN 4 * + 64 + - 41 * 30 THEN + 41 ELSE NULL END, 29 ) THEN 46 + CASE + CASE ( - 52 ) WHEN + 4 - 2 THEN NULL ELSE + COUNT ( ALL + 22 ) * ( - 32 ) END WHEN - 69 * - ( - 99 ) THEN NULL WHEN + 15 + - 6 * + 47 THEN 79 ELSE + 90 EN…

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + + ( + CAST ( NULL AS INTEGER ) ) AS col0, + MIN ( + CAST ( NULL AS INTEGER ) ) * + CASE COUNT ( * ) WHEN MIN ( ALL + 73 ) / NULLIF ( + 74, 84 ) * 10 THEN NULL ELSE - + 25 END

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1893 failed
* 81% was OK

Time: 57082ms

---- ---- ---- ---- ---- ---- ----
### 444/622 [`./test/random/expr/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_7.test)

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

* 1912 failed
* 80% was OK

Time: 57169ms

---- ---- ---- ---- ---- ---- ----
### 445/622 [`./test/random/expr/slt_good_70.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_70.test)

_Mimic sqlite_

```sql
SELECT ALL CAST ( NULL AS INTEGER ) * 52 / - + ( 13 ) AS col1, COUNT ( * ) AS col1

Expected: ["NULL","1"] but got ["1"]
```


```sql
SELECT DISTINCT 52 / + 42 AS col2, + 3 AS col1

Expected: ["1","3"] but got ["1.238","3"]
```


```sql
SELECT - CAST ( + MIN ( - 85 ) AS INTEGER )

g is not defined
```


```sql
SELECT + 37 AS col0, COALESCE ( - + COUNT ( * ), - COALESCE ( - 65, - 40 + 29 + + - 25 + - 71 * + - COUNT ( * ) / + 78 / - 51 ) * 27 + - - 72 ) / CASE + CASE - + 68 WHEN 58 + ( 57 ) / + 55 / 36 THEN + CAST ( 34 AS INTEGER ) WHEN - COALESCE ( 29, 60 + + 66 ) THEN NULL ELSE - CAST ( COUNT ( * ) AS INTEGER ) * - 56 END WHEN ( AVG ( - 3 ) ) THEN - COUNT ( * ) WHEN + 9 THEN 61 END AS col0

Expected: ["37","NULL"] but got ["NULL"]
```


```sql
SELECT 8 AS col0, - 26 - - - 85 + + + 56 * + CASE 78 WHEN + 57 THEN + - 71 WHEN + 33 THEN NULL END * - + 32 col0

Expected: ["8","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 52 / - 9 * CAST ( NULL AS INTEGER ) col2, COUNT ( * ) + - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","1"]
```


```sql
SELECT CASE WHEN ( NOT ( - 38 BETWEEN COUNT ( * ) + + 1 AND AVG ( 66 ) - 52 ) ) THEN - MIN ( ALL ( + 54 ) ) WHEN NULL NOT BETWEEN NULL AND ( NULL ) THEN NULL END / 49 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT - 68 + - + 1 + + COUNT ( * ) * - 71 * - 19 - - CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["1280","0"]
```


```sql
SELECT DISTINCT + CASE + 17 WHEN + - ( + COALESCE ( + MIN ( - 87 ), COUNT ( * ) + AVG ( ALL 86 ), - 76 ) ) THEN NULL WHEN SUM ( ALL 3 ) + CASE + 53 WHEN 63 THEN - 22 WHEN - MAX ( DISTINCT 69 ) THEN - NULLIF ( + 21, + MAX ( + 31 ) ) + 11 * - 59 END THEN + 97 WHEN 17 THEN + 86 / + 23 END AS col0

Expected: ["3"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1845 failed
* 81% was OK

Time: 40661ms

---- ---- ---- ---- ---- ---- ----
### 446/622 [`./test/random/expr/slt_good_71.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_71.test)

_Mimic sqlite_

```sql
SELECT ALL + COUNT ( * ) AS col0, 4

Expected: ["1","4"] but got ["4","1"]
```


```sql
SELECT + + COUNT ( * ) + CAST ( NULL AS INTEGER ) * + + 23 * + + 40 + 61 + + MIN ( ALL - + 31 ) AS col2

Expected: ["NULL"] but got ["31"]
```


```sql
SELECT + 75 * ( + - CAST ( + SUM ( - 42 ) AS INTEGER ) )

g is not defined
```


```sql
SELECT - 23 / 15 + + - 15 AS col1, + 2 AS col1, - ( - - CAST ( NULL AS REAL ) ) AS col0

Expected: ["-16","2","NULL"] but got ["2","2","NULL"]
```


```sql
SELECT NULLIF ( CASE + + 57 WHEN 85 THEN - 59 * 70 WHEN 53 THEN - 87 ELSE NULL END, - COALESCE ( CAST ( - + 47 AS INTEGER ), 11, + - 77 ) / + - 7 ) + CAST ( + 84 AS INTEGER ) AS col1, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - 66 + + COUNT ( * ) + + ( + 74 ) * - 42 AS col1, - 3 / + CAST ( - MAX ( - 86 ) AS INTEGER ) - + - 68 + 54

Expected: ["-3173","122"] but got ["-3173","NULL"]
```


```sql
SELECT - 15 / + CASE WHEN NOT NULL IN ( - CASE 96 WHEN + CAST ( - 0 AS INTEGER ) * + ( + CAST ( 65 AS INTEGER ) - + 87 ) + - 51 THEN NULL ELSE 26 * + CAST ( COUNT ( * ) AS INTEGER ) END ) THEN NULL WHEN NULL NOT BETWEEN + CAST ( NULL AS REAL ) + + 34 AND ( 24 - 71 ) THEN 89 - 36 * COUNT ( ALL - COALESCE ( 23, + 32 ) ) END * + 68 + 27

Cannot read property 'toString' of undefined
```


```sql
SELECT 81 + ( + + CAST ( NULL AS INTEGER ) ) AS col1, - CAST ( NULL AS INTEGER ) / + 13

Expected: ["NULL","NULL"] but got ["81","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1840 failed
* 81% was OK

Time: 36201ms

---- ---- ---- ---- ---- ---- ----
### 447/622 [`./test/random/expr/slt_good_72.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_72.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - 66 / 9 / + - 79

Expected: ["0"] but got ["0.093"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * - 91 * - 22

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( + AVG ( DISTINCT + - 5 ) AS INTEGER ) * + + 91 AS col0, 87 + + + 56 + 1 * - + 10 / + 84

g is not defined
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ), - 99 * CASE + SUM ( + 13 ) WHEN + 93 + - - 88 THEN CASE + 45 WHEN - 2 + 64 * - 64 THEN NULL ELSE + - NULLIF ( + ( + COUNT ( * ) ), - 52 ) * ( + + 53 ) + 85 + - 97 END WHEN + - 35 THEN + CAST ( NULL AS REAL ) * - + 77 END

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT + CASE 36 WHEN - - 90 THEN - 44 ELSE NULL END, 49 + - - 99 / 38 AS col1

Expected: ["NULL","51"] but got ["NULL","51.605"]
```


```sql
SELECT - 83 * 6 * + - CASE WHEN COUNT ( * ) NOT BETWEEN + - COALESCE ( SUM ( DISTINCT 74 ), + 80, CAST ( - - 17 AS INTEGER ) ) AND - + 58 * - - 46 THEN 21 + + 78 END * 2

Cannot read property 'toString' of undefined
```


```sql
SELECT - - CASE + 72 WHEN + 72 + + CAST ( NULL AS INTEGER ) THEN NULL WHEN + 22 * - 96 + - - 97 THEN + CAST ( - - 43 AS INTEGER ) + - 40 ELSE + 64 END * 40 AS col1

Expected: ["2560"] but got ["NULL"]
```


```sql
SELECT + 79 * + + 75 + + CAST ( NULL AS INTEGER ) + COUNT ( * ) AS col2, + 94 * 49 + - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["5926","4606"]
```


```sql
SELECT DISTINCT - ( + 30 ) - 58 AS col1, + 37 * + 68 * - ( 67 ) / CAST ( NULL AS INTEGER ) * - 8 - - + 80 + - ( 45 ) AS col1

Expected: ["-88","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1904 failed
* 80% was OK

Time: 37985ms

---- ---- ---- ---- ---- ---- ----
### 448/622 [`./test/random/expr/slt_good_73.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_73.test)

_Mimic sqlite_

```sql
SELECT ALL - 58 + - + 65 * + CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL"] but got ["-58"]
```


```sql
SELECT ALL COUNT ( * ) / + 79 AS col2, - 64 / + COUNT ( * ) + - - MIN ( + NULLIF ( - + CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) * - ( + 37 ) ) ) + + 43 * COUNT ( * ) - 43 + 18 AS col0

Expected: ["0","NULL"] but got ["0.013","NULL"]
```


```sql
SELECT ALL + COUNT ( * ) + - + COUNT ( * ) AS col0, + 92 * + - 29 col0

Expected: ["0","-2668"] but got ["-2668"]
```


```sql
SELECT CASE - SUM ( - 39 ) WHEN + - 84 THEN + - 32 WHEN 93 THEN 6 ELSE NULL END AS col2, + 18 - 43 + - CAST ( NULL AS INTEGER ) * + 77 + - 22 + + 82 AS col2

Expected: ["NULL","NULL"] but got ["35"]
```


```sql
SELECT ALL - NULLIF ( CAST ( - COALESCE ( - - COUNT ( * ), - 38 * + 74 - - 34 * 70 * + 39 ) AS INTEGER ), - 79 ) * 71 AS col1

g is not defined
```


```sql
SELECT ALL CASE WHEN NOT + 14 BETWEEN NULL AND + COUNT ( * ) / + COUNT ( * ) * - 86 * + - 15 * - - COALESCE ( - ( - - 34 ), - 60, + - 71 * - + COUNT ( * ) * - 72 * COUNT ( * ) ) THEN + + 89 ELSE NULL END * - 1 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT - CASE WHEN NOT - COUNT ( * ) IN ( ( - 10 ) - + - NULLIF ( - - 86, - - COUNT ( * ) ) + 21 + - COALESCE ( - + ( - 85 ), - 4, + COUNT ( * ) ) * - MAX ( + 10 ), + 82 + - 31 ) THEN 63 WHEN CAST ( NULL AS INTEGER ) IS NULL THEN NULL END / 65 col2

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT 66 * 95 AS col1, + CASE ( - 82 ) WHEN + CAST ( + - 79 AS INTEGER ) + 62 + 8 + + 33 * 11 THEN 67 END AS col1

Expected: ["6270","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 93 * - COUNT ( * ) * + - CASE ( + - 26 ) WHEN - + 41 * - CAST ( + + 8 AS INTEGER ) + - - 82 THEN - 11 END * - 92 AS col1, COUNT ( * ) + + + 61 + - - CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","62"]
```


```sql
SELECT - CAST ( - CAST ( NULL AS REAL ) AS INTEGER ) AS col0, 61 AS col2, - + CAST ( NULL AS INTEGER ) + ( - CAST ( NULL AS REAL ) ) AS col2

Expected: ["NULL","61","NULL"] but got ["0","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1881 failed
* 81% was OK

Time: 35523ms

---- ---- ---- ---- ---- ---- ----
### 449/622 [`./test/random/expr/slt_good_74.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_74.test)

_Mimic sqlite_

```sql
SELECT ALL + - 17 / - 55 + - 25 - - 28 AS col2, 53 AS col1

Expected: ["3","53"] but got ["3.309","53"]
```


```sql
SELECT + 13 * + 99 AS col2, + AVG ( ALL CAST ( NULL AS INTEGER ) )

Expected: ["1287","NULL"] but got ["1287","0"]
```


```sql
SELECT ALL COUNT ( * ) AS col1, NULLIF ( + CASE + + 4 WHEN 46 * MAX ( - 9 ) THEN 92 END, + 22 ) AS col1

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + - COALESCE ( + - COALESCE ( - 60, + 41 / + 24 + + CAST ( + CAST ( + ( + 52 ) AS REAL ) AS INTEGER ), + - 1 / + 67 + + - 52 * + 7 + - CAST ( - COUNT ( + 90 ) AS INTEGER ) ), 53 ) * - 93 - + 3 * + + 47

g is not defined
```


```sql
SELECT CASE WHEN NOT NULL >= CAST ( NULL AS INTEGER ) THEN NULL ELSE + CAST ( + 28 AS INTEGER ) + - - 42 END + - COUNT ( * ) - - - COUNT ( * ) * - MAX ( DISTINCT - 96 ) col0

Expected: ["-27"] but got ["NULL"]
```


```sql
SELECT ALL - CAST ( NULL AS REAL ) * + + 25 + + + 14 AS col0, + 11 - - COALESCE ( - 49, - CAST ( - 60 AS INTEGER ) * - 46, - 28 * 18 + 62 ) * + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","11"]
```


```sql
SELECT ALL + - MIN ( DISTINCT + - 64 ) * + 50 + CASE 24 WHEN 12 THEN NULL WHEN + 99 + 93 + - + 5 + 35 * 2 / - - 94 * 13 - - 88 * - - CASE WHEN NOT NULL <= - 25 THEN NULL WHEN NOT 88 NOT BETWEEN 76 AND + 22 THEN - 48 ELSE NULL END THEN + 59 * - 18 END col1

Cannot read property 'toString' of undefined
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * + COUNT ( * ), CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + 3 AS col2, - CASE - 98 WHEN - 15 THEN - + CAST ( COUNT ( * ) AS INTEGER ) / + + 59 WHEN - 72 THEN + 7 ELSE NULL END AS col2

Expected: ["3","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1943 failed
* 80% was OK

Time: 35420ms

---- ---- ---- ---- ---- ---- ----
### 450/622 [`./test/random/expr/slt_good_75.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_75.test)

_Mimic sqlite_

```sql
SELECT - + 33 / - 14 AS col2

Expected: ["2"] but got ["2.357"]
```


```sql
SELECT ALL ( 29 ) * 58 * 47 / - COALESCE ( - 44, - COUNT ( * ) * - ( + 19 ) + - - 71, 92 ) + - 38 + + COUNT ( * ) - - 68 * - 96 - - CAST ( NULL AS INTEGER ) - + - 38 * - 28

Expected: ["NULL"] but got ["-5832.318"]
```


```sql
SELECT DISTINCT + + ( - CAST ( + COUNT ( * ) AS INTEGER ) ) * + ( + 72 ) / - + 14

g is not defined
```


```sql
SELECT + 59 AS col1, - 6 AS col0, CASE + COUNT ( * ) WHEN + 89 THEN + 18 * - MIN ( ALL 49 ) END AS col0

Expected: ["59","-6","NULL"] but got ["59","NULL"]
```


```sql
SELECT + 7 + - 55 + + 9 / + 5 + - 2 + + + 45 + 48 + - 58 * 77 / 60 * - + COUNT ( * ) / CAST ( - COUNT ( * ) AS INTEGER )

Expected: ["-30"] but got ["NULL"]
```


```sql
SELECT + ( CASE WHEN NULL BETWEEN - 3 AND 66 + + 92 THEN COUNT ( * ) END )

Cannot read property 'toString' of undefined
```


```sql
SELECT + - MAX ( ALL - - 63 ) * - - 50 * - CAST ( + CASE WHEN NULL IS NOT NULL AND NOT ( NULL ) > - - 17 THEN + 7 END AS REAL ) + + + 52, - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT 75 col1, + 74 * - 17 + + CASE 61 WHEN ( + 86 ) THEN + CAST ( 99 AS INTEGER ) * + - 15 WHEN 77 THEN NULL END * - 66 * - 56 AS col1

Expected: ["75","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 15 * - CAST ( NULL AS INTEGER ) + + - NULLIF ( + + 6, - 89 - - 82 ) + 61, 20 * CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["55","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1915 failed
* 80% was OK

Time: 33881ms

---- ---- ---- ---- ---- ---- ----
### 451/622 [`./test/random/expr/slt_good_76.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_76.test)

_Mimic sqlite_

```sql
SELECT ALL + 23 + + CAST ( NULL AS INTEGER ) col0

Expected: ["NULL"] but got ["23"]
```


```sql
SELECT DISTINCT - 46 * 67 + 35 AS col0, 50 AS col0

Expected: ["-3047","50"] but got ["50","50"]
```


```sql
SELECT DISTINCT - + CAST ( COUNT ( * ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT ALL - CAST ( NULL AS REAL ), + CAST ( + + CAST ( NULL AS INTEGER ) AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) / + 96 AS col1, + CAST ( NULL AS INTEGER ) * + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL COUNT ( * ) / - CAST ( + MIN ( 44 ) AS INTEGER )

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT DISTINCT COUNT ( * ) AS col1, + 62 + + CAST ( NULL AS REAL ) AS col1

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + 53 / + 71 + - 80 AS col2, 92 - - - ( + CASE + 72 WHEN - 27 THEN - 98 WHEN CAST ( NULL AS INTEGER ) + + - NULLIF ( + 93, - 11 * - 62 ) THEN NULL ELSE NULL END ) AS col2

Expected: ["-80","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 29 * - CASE WHEN + 89 IS NOT NULL THEN + 63 / - 97 / + 81 + + 41 + - + COUNT ( + + 32 ) * - 48 WHEN NOT ( NULL ) NOT BETWEEN ( - 61 ) AND NULL THEN 43 - - 16 END * + + 47 + CASE + 76 WHEN + 99 THEN + 16 / + - 52 WHEN 22 * + + 54 - + 15 + COALESCE ( 64, CASE 54 WHEN - 23 / 22 THEN + 54 ELSE NULL END ) THEN NULL END

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 1538 failed
* 84% was OK

Time: 25356ms

---- ---- ---- ---- ---- ---- ----
### 452/622 [`./test/random/expr/slt_good_77.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_77.test)

_Mimic sqlite_

```sql
SELECT ALL 29 / 20

Expected: ["1"] but got ["1.450"]
```


```sql
SELECT ALL CASE + NULLIF ( + - 63, - 7 * - 49 + - 50 + 4 - - 7 * + - ( 71 ) * - ( 29 ) / - + 45 + + + 82 + - 87 * - 68 + + 90 ) WHEN 7 THEN NULL WHEN + + 50 THEN - 27 WHEN SUM ( + 13 ) + + 27 * - MAX ( + 21 ) THEN NULL END AS col0, 86

Expected: ["NULL","86"] but got ["86","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) - 2 + ( + - 69 )

Expected: ["NULL"] but got ["-71"]
```


```sql
SELECT DISTINCT - + CAST ( + COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL - 7 / + COALESCE ( + CAST ( NULL AS INTEGER ), - - COUNT ( * ) * - + 92 ) - - 8

Expected: ["8"] but got ["NULL"]
```


```sql
SELECT ALL + + CASE WHEN NOT - 90 > NULL THEN - + COALESCE ( COALESCE ( 40, 89 * 57 + 53, 54 + + 20 - - 40 * NULLIF ( + 71, + COALESCE ( + 21, - 30 ) ), + 17 ), + AVG ( - 91 ) ) WHEN NULL NOT BETWEEN NULL AND 67 THEN COUNT ( * ) * + 94 - + 90 * + 56 ELSE NULL END AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT CAST ( NULL AS REAL ) AS col2, + CAST ( NULL AS INTEGER ) + - - 21 AS col0

Expected: ["NULL","NULL"] but got ["NULL","21"]
```


```sql
SELECT CAST ( NULL AS REAL ) AS col0, + COUNT ( * ) * - CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["0"]
```


```sql
SELECT ALL - 54 AS col2, 70 + COALESCE ( + + 58, + 80 ) + 93 * - 76 * CAST ( NULL AS REAL ) AS col2

Expected: ["-54","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1848 failed
* 81% was OK

Time: 33100ms

---- ---- ---- ---- ---- ---- ----
### 453/622 [`./test/random/expr/slt_good_78.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_78.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * + - 42

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL 67 AS col1, - 25 + + 83 + + + 93 / + - 41 + 93

Expected: ["67","149"] but got ["67","148.732"]
```


```sql
SELECT ALL - CAST ( - COALESCE ( - ( + 57 ), + 30 - - 63 + - 63 * COUNT ( * ) * 39, + - 58 ) AS INTEGER ) / NULLIF ( + 96, + CAST ( 45 AS INTEGER ) ) - - 43 AS col0

g is not defined
```


```sql
SELECT CAST ( NULL AS INTEGER ), + CAST ( NULL AS INTEGER ) * - MIN ( - 84 ) col0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + 1 AS col0, + 35 + + ( - CASE WHEN NOT ( + CAST ( ( - 42 ) AS REAL ) ) IS NULL THEN NULL WHEN COUNT ( * ) BETWEEN ( NULL ) AND + COALESCE ( ( - 92 ), 86 ) THEN CAST ( 66 AS INTEGER ) END )

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT - + 89 / - 26 * CAST ( COUNT ( * ) AS INTEGER ) / - COUNT ( * ) * + COUNT ( * ) + - 15 * + 62 - - 17

Expected: ["-916"] but got ["NULL"]
```


```sql
SELECT ALL + 3 * + 1 + 89 + + + COUNT ( * ) + 82 AS col1, - CASE + CASE 52 WHEN - - ( - COUNT ( * ) ) * ( - + COUNT ( * ) ) * NULLIF ( + MIN ( DISTINCT - 69 ), + 52 + - 22 ) THEN NULL ELSE - COUNT ( * ) + + ( - COUNT ( ALL 14 ) ) END WHEN - - 87 * - 8 THEN - + 39 WHEN - 72 THEN NULL END / + 45 AS col1

Expected: ["175","NULL"] but got ["NULL"]
```


```sql
SELECT 24 * + MIN ( + NULLIF ( + 63, + 71 ) ) + + AVG ( ALL CAST ( NULL AS INTEGER ) ) + - MIN ( 37 ), + 72 * - CASE + ( + SUM ( DISTINCT + 51 ) ) WHEN 93 * + 49 THEN + 44 WHEN 4 * ( - 72 ) + - 69 THEN NULL ELSE NULL END + 37 AS col1

Expected: ["NULL","NULL"] but got ["1475","NULL"]
```


```sql
SELECT ALL 99 / + + 20

Expected: ["4"] but got ["4.950"]
```

#### ☓ Ran 10012 tests as sqlite

* 1870 failed
* 81% was OK

Time: 32774ms

---- ---- ---- ---- ---- ---- ----
### 454/622 [`./test/random/expr/slt_good_79.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_79.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 73, 21 / - CASE + COALESCE ( - 10, ( + + COALESCE ( 77, - 55 ) ), + COUNT ( * ) + 28 ) WHEN + 82 * 44 + - 75 + - 80 / 98 THEN + 27 ELSE 35 END * + 41 AS col1

Expected: ["73","0"] but got ["73","-0.015"]
```


```sql
SELECT + 21 - + CAST ( - MAX ( + - 58 ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT ALL + 74 * COUNT ( + 45 ) * + + 63 * - CAST ( NULL AS INTEGER ) + - 62 - - 66 * + 94 / + ( 85 )

Expected: ["NULL"] but got ["10.988"]
```


```sql
SELECT + 83 + + + 41 + CASE + 68 WHEN + 10 / - 92 THEN NULL WHEN + 82 + - COUNT ( * ) / - - 99 * - 4 THEN COUNT ( * ) END + + 20 * ( + 90 ) * - + 67 - - 72 * + 77 * - + 10 AS col2, 23

Expected: ["NULL","23"] but got ["23","NULL"]
```


```sql
SELECT DISTINCT CASE WHEN NOT CAST ( NULL AS INTEGER ) NOT BETWEEN COUNT ( * ) + + 18 + - 23 + + - 18 AND 1 THEN 15 END AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + ( + + 79 ) * - 48 + + CASE WHEN NOT + 81 IN ( + 76 + + 11 ) THEN + 40 ELSE NULL END AS col0

Expected: ["-3752"] but got ["NULL"]
```


```sql
SELECT DISTINCT - 28 + - 38 AS col2, CASE - 33 WHEN - 89 THEN 13 ELSE NULL END AS col2

Expected: ["-66","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + + 79 AS col1, CAST ( NULL AS INTEGER ) * - SUM ( - + 96 ) AS col0, + - 86

Expected: ["NULL","NULL","-86"] but got ["79","0","-86"]
```


```sql
SELECT 91 / - ( + CAST ( NULL AS INTEGER ) ) AS col1, + MIN ( ALL - - CAST ( NULL AS INTEGER ) ) + 22 AS col0

Expected: ["NULL","NULL"] but got ["NULL","22"]
```

#### ☓ Ran 10012 tests as sqlite

* 1919 failed
* 80% was OK

Time: 31451ms

---- ---- ---- ---- ---- ---- ----
### 455/622 [`./test/random/expr/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_8.test)

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
SELECT COALESCE ( 8, - 90 ) * + 74, + CASE - COUNT ( * ) WHEN + - CASE WHEN - 50 NOT BETWEEN + ( - 5 ) + 1 * - 15 AND COUNT ( * ) THEN - 87 * + 60 END THEN NULL WHEN + 17 THEN 0 * CAST ( - CAST ( 8 AS INTEGER ) AS INTEGER ) END / 82 + - 48 * - 21 AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT COUNT ( * ) / - COALESCE ( + + CAST ( NULL AS INTEGER ), + - 93 + - + 11 * + 76 ), 24 / ( 29 )

Expected: ["0","0"] but got ["NULL","0.828"]
```


```sql
SELECT - 34 * CAST ( NULL AS REAL ) AS col2, 30 * + CAST ( NULL AS INTEGER ) + + 83 + + 67

Expected: ["NULL","NULL"] but got ["NULL","150"]
```


```sql
SELECT DISTINCT - CASE 14 WHEN 17 + 74 THEN NULL ELSE CASE 63 WHEN + 61 THEN 95 * - - COUNT ( * ) * COUNT ( * ) - + 76 ELSE NULL END + - + 2 + 90 - 20 - - 39 / + 45 * - 43 END col2, 38

Expected: ["NULL","38"] but got ["38","NULL"]
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

* 1966 failed
* 80% was OK

Time: 34559ms

---- ---- ---- ---- ---- ---- ----
### 456/622 [`./test/random/expr/slt_good_80.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_80.test)

_Mimic sqlite_

```sql
SELECT + 87 * + + NULLIF ( 21, - 40 * 93 / 67 ) + + + COUNT ( * ) * + - 25 - + ( - CAST ( + - AVG ( DISTINCT + ( + + 37 ) ) AS INTEGER ) ) + 15 col2

Expected: ["1780"] but got ["1817"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + 47 AS col0

Expected: ["NULL"] but got ["47"]
```


```sql
SELECT DISTINCT CAST ( - COUNT ( + 42 ) AS INTEGER ) + + COALESCE ( 50, + 50 ) / - + 96

g is not defined
```


```sql
SELECT - 3 * - CAST ( NULL AS INTEGER ) * - 28, - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + + 79 AS col0, + 57 * NULLIF ( + 32, + + 96 + + CAST ( NULL AS REAL ) ) * - CASE - + 35 WHEN MAX ( ALL - 41 ) THEN MIN ( ALL + CAST ( + CAST ( + - 14 AS INTEGER ) AS INTEGER ) ) * + 57 + + - 68 WHEN + - 42 THEN - 56 END col0

Expected: ["79","NULL"] but got ["NULL"]
```


```sql
SELECT 13 + + + 43 + - 81 / ( - CASE - COUNT ( * ) WHEN CASE WHEN NOT + 69 BETWEEN ( 12 ) AND + CAST ( NULL AS INTEGER ) / + 41 THEN NULL ELSE - 51 + ( - 36 ) END * + 28 THEN NULL WHEN CAST ( - CAST ( NULL AS INTEGER ) AS INTEGER ) THEN + 92 ELSE 84 + + MAX ( 68 ) END )

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT ( COUNT ( * ) ) + + 74 * + 15 col2, + NULLIF ( + - CASE + COUNT ( DISTINCT + 77 ) WHEN CASE + CAST ( NULL AS INTEGER ) WHEN - CAST ( NULL AS INTEGER ) THEN NULL WHEN 84 + 32 * 53 THEN COUNT ( * ) END / + 63 THEN NULL WHEN COUNT ( * ) THEN - 73 - + 47 END, - 38 * 33 ) AS col0

Expected: ["1111","120"] but got ["1111","NULL"]
```


```sql
SELECT - 15 * - CAST ( NULL AS INTEGER ) AS col0, CASE + 56 WHEN + COUNT ( ALL - 28 ) THEN - 17 * + CAST ( NULL AS INTEGER ) WHEN - + 79 + + 53 THEN NULL END AS col2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 58 * 86 AS col0, 3 / CASE 35 WHEN - - 70 THEN - 18 WHEN + 19 + 17 THEN NULL END AS col0

Expected: ["4988","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 25, MIN ( ALL - - 58 ) + CAST ( + MAX ( ALL + + 86 ) AS INTEGER ) - - COUNT ( * ) * + ( - - 78 ) AS col1

Expected: ["25","222"] but got ["25","136"]
```

#### ☓ Ran 10012 tests as sqlite

* 1885 failed
* 81% was OK

Time: 31808ms

---- ---- ---- ---- ---- ---- ----
### 457/622 [`./test/random/expr/slt_good_81.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_81.test)

_Mimic sqlite_

```sql
SELECT ALL 83 / + CAST ( - ( + COUNT ( DISTINCT + - 13 ) ) AS INTEGER )

g is not defined
```


```sql
SELECT DISTINCT + - 91 AS col1, 41 * 89 * 33 / + 49 AS col2

Expected: ["-91","2457"] but got ["-91","2457.490"]
```


```sql
SELECT - 8 - + + 85, - CAST ( NULL AS INTEGER ) * + + AVG ( ALL - 3 ) + - + COALESCE ( 27, AVG ( ALL - 73 ) ) + + 68 AS col1

Expected: ["-93","NULL"] but got ["-93","41"]
```


```sql
SELECT DISTINCT + 11 / - 55 AS col2, - 56 * - CASE + 59 WHEN 71 / - SUM ( DISTINCT + - 15 ) + - - 39 THEN - ( CAST ( + COUNT ( * ) AS INTEGER ) ) / + COUNT ( * ) - + + ( + AVG ( DISTINCT - - 58 ) ) END AS col2

Expected: ["0","NULL"] but got ["NULL"]
```


```sql
SELECT 16 + + CAST ( NULL AS REAL ), + CAST ( NULL AS INTEGER ) + ( 23 ), CASE + ( + ( - 0 ) ) WHEN + 27 THEN + 57 ELSE NULL END AS col0

Expected: ["NULL","NULL","NULL"] but got ["NULL","23","NULL"]
```


```sql
SELECT DISTINCT + NULLIF ( 94, + CASE WHEN ( NULL ) BETWEEN + - 85 AND ( - CAST ( NULL AS REAL ) ) THEN + - 65 END * 30 )

Cannot read property 'toString' of undefined
```


```sql
SELECT 7 / - 75 AS col2, CASE + - CAST ( NULL AS INTEGER ) WHEN 26 THEN + 12 END AS col2

Expected: ["0","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - 25 + CASE 55 WHEN - - 22 - - MIN ( ALL + 24 ) + - 3 + - - SUM ( ALL - 57 ) - 90 THEN - 33 + - + 75 + - 78 + 0 - - 50 ELSE NULL END AS col2, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT MAX ( - - CAST ( NULL AS INTEGER ) ) * - CAST ( NULL AS INTEGER ) + 91 AS col0, - ( - - CAST ( NULL AS INTEGER ) ) + - 4 * - - COALESCE ( CAST ( NULL AS INTEGER ), 21 ) * + 30 col2

Expected: ["NULL","NULL"] but got ["91","0"]
```


```sql
SELECT + 40, CAST ( NULL AS INTEGER ) AS col0

Expected: ["40","NULL"] but got ["40","0"]
```


```sql
SELECT DISTINCT + + 54 / COALESCE ( + NULLIF ( - CAST ( NULL AS INTEGER ), + COUNT ( * ) * + - 25 ), - 81 * + - 82 )

Expected: ["0"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1902 failed
* 81% was OK

Time: 33618ms

---- ---- ---- ---- ---- ---- ----
### 458/622 [`./test/random/expr/slt_good_82.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_82.test)

_Mimic sqlite_

```sql
SELECT ( - 62 ) col2, + 15 - - 94 AS col2

Expected: ["-62","109"] but got ["109","109"]
```


```sql
SELECT DISTINCT CAST ( - - COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL 73 * CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + COALESCE ( - 59, - COUNT ( * ), + 69 ) * - ( - - NULLIF ( 0, - CAST ( NULL AS INTEGER ) ) ) + 15

Expected: ["15"] but got ["NULL"]
```


```sql
SELECT - CASE WHEN ( NULL BETWEEN 59 AND ( + 22 ) ) THEN 48 ELSE 91 END

Cannot read property 'toString' of undefined
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * - 54 col2, - ( + 51 ) * + + 11 + - - 13 * - COUNT ( * ) + + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","-574"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) + - - 18, COUNT ( + 5 ) / - ( - 61 ) + + CASE + 45 WHEN + 47 THEN + - MIN ( DISTINCT + + 89 ) ELSE NULL END AS col0

Expected: ["NULL","NULL"] but got ["18","NULL"]
```


```sql
SELECT ALL + 66 AS col2, - CASE + + 15 WHEN - 55 THEN + 61 WHEN COUNT ( + 23 ) THEN COUNT ( * ) * - 72 END AS col2

Expected: ["66","NULL"] but got ["NULL"]
```


```sql
SELECT ALL 34 AS col0, - CASE - 29 WHEN - + ( 36 ) + + 11 + - 97 - + + 86 THEN - 52 * + 46 END AS col0

Expected: ["34","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1936 failed
* 80% was OK

Time: 53243ms

---- ---- ---- ---- ---- ---- ----
### 459/622 [`./test/random/expr/slt_good_83.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_83.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 59 * + + COUNT ( * ) + 2 * + 74 AS col0, - 41 * - 3 + - + COUNT ( * ) + COUNT ( - + 61 ) + 67 + + + NULLIF ( 53, - 94 ) * - + COALESCE ( - ( + + 10 ), + COUNT ( * ) * - 77 * - + 38 * + 37 + - - 22 * + - 45 * + 29 - + + 62 ) / - 1 + 47 + ( - 83 ) * - COUNT ( - 52 ) AS col0

Expected: ["207","-210"] but got ["-210"]
```


```sql
SELECT CASE - + 55 WHEN + 44 THEN NULL ELSE + + 12 + + 10 + - - 81 END * + 9 + + 68 + + CAST ( NULL AS INTEGER ), 63 - 52 col0

Expected: ["NULL","11"] but got ["995","11"]
```


```sql
SELECT ALL - CAST ( SUM ( 80 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL 7 AS col1, 61 - - CASE 2 WHEN + 33 - 65 THEN + COUNT ( * ) WHEN + - 43 - - + 70 - 15 * + 96 * 65 * - + 80 / - 25 * - - COUNT ( * ) THEN NULL ELSE NULL END + + 64 + + 71 * + + ( - COUNT ( * ) ) / - CASE - 36 WHEN 30 THEN NULL ELSE 57 + - ( - 61 ) * - + 51 END * + 66 * - 71 - + NULLIF ( + NULLIF ( + 66, - 1 ), + 86 * 82 ) AS col1

Expected: ["7","NULL"] but got ["NULL"]
```


```sql
SELECT - CASE WHEN NOT + 0 BETWEEN + MIN ( ALL CASE 3 WHEN 84 THEN - 60 * 42 ELSE NULL END ) * 55 AND + 34 THEN + 19 + - 10 WHEN NULL <= ( NULL ) THEN COUNT ( * ) ELSE CAST ( NULL AS INTEGER ) END + + 1 * - 6

Cannot read property 'toString' of undefined
```


```sql
SELECT - + 53 / + MIN ( + 13 ) + + CASE CAST ( NULL AS INTEGER ) WHEN - 93 / + 39 / + 16 * 32 * - - CAST ( NULL AS INTEGER ) * - 88 THEN NULL ELSE 29 END + - + 54 / ( - NULLIF ( + 68, - 92 * + SUM ( DISTINCT 95 ) * 67 / - 43 + - 73 + - 69 + + 58 * - 22 * 25 + - 5 * - CAST ( NULL AS INTEGER ) + + 29 * - - ( + 51 ) ) ) * COUNT ( * ) + + + 14 * + - 65 + 37

Expected: ["-848"] but got ["NULL"]
```


```sql
SELECT ALL 87 * - ( CAST ( NULL AS INTEGER ) ), + CASE - 33 WHEN - SUM ( DISTINCT + 67 ) THEN + - ( - CASE + 97 WHEN - + 79 THEN 78 END ) * + 10 / - 46 WHEN + 27 THEN NULL END * + + 66 AS col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 6 * - CAST ( NULL AS INTEGER ), + CAST ( + + ( - 16 ) AS INTEGER ) * - COUNT ( * ) / + 33 + CAST ( NULL AS INTEGER ) + - - 87 * + CAST ( - 3 AS INTEGER ) - + + 95 + - 47 AS col1

Expected: ["NULL","NULL"] but got ["0","-402.515"]
```


```sql
SELECT - 75 AS col1, - CAST ( NULL AS REAL ) + + + 74 AS col1, + + 44

Expected: ["-75","NULL","44"] but got ["NULL","NULL","44"]
```

#### ☓ Ran 10012 tests as sqlite

* 1859 failed
* 81% was OK

Time: 42331ms

---- ---- ---- ---- ---- ---- ----
### 460/622 [`./test/random/expr/slt_good_84.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_84.test)

_Mimic sqlite_

```sql
SELECT ALL - 83 / - 12

Expected: ["6"] but got ["6.917"]
```


```sql
SELECT ALL + + 2 * + + 28 * - - CAST ( NULL AS INTEGER ) * 24 + + 71

Expected: ["NULL"] but got ["71"]
```


```sql
SELECT + CAST ( - AVG ( ALL - 11 ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT + 32 + - + MAX ( - CAST ( NULL AS REAL ) ) AS col0, 27

Expected: ["NULL","27"] but got ["27","NULL"]
```


```sql
SELECT 49 AS col1, + CAST ( NULL AS REAL ) col1

Expected: ["49","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + 57 * CASE WHEN NOT ( NULL ) NOT BETWEEN - 49 AND - - COUNT ( * ) * - COUNT ( * ) * - COALESCE ( - - 53, - NULLIF ( + AVG ( + 14 ), + 57 + - + COUNT ( * ) + - - ( 20 ) + + 75 / 66 ) ) + - + COALESCE ( 36, - COALESCE ( - 46, + - CASE - ( + 57 ) WHEN + 95 THEN NULL WHEN + CASE + - 33 WHEN - 28 THEN - 36 + - 52 END THEN 48 * + 4 * - 84 + 34 + - 90 END ) * NULLIF ( 83, - CAST ( + - COALESCE (…

Cannot read property 'toString' of undefined
```


```sql
SELECT - NULLIF ( + ( - 0 ), + ( CAST ( NULL AS INTEGER ) ) ) AS col1

Expected: ["0"] but got ["NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * - 62, - CAST ( NULL AS REAL )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT + ( + 48 ) * - + 98 + + 59 + 13 / - 15 + 70 * + + 7 * - COUNT ( * ) + + + 75 / 63 + + 34 + - + 6 + - 2 * + 12 + COUNT ( * ) AS col0

Expected: ["-5129"] but got ["-5129.676"]
```

#### ☓ Ran 10012 tests as sqlite

* 1833 failed
* 81% was OK

Time: 41508ms

---- ---- ---- ---- ---- ---- ----
### 461/622 [`./test/random/expr/slt_good_85.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_85.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 9 / + 92 + - 43 * - + COUNT ( * ) * - 98

Expected: ["-4214"] but got ["-4213.902"]
```


```sql
SELECT ALL 26 * + 14 + + - 9 * - CAST ( NULL AS INTEGER ) * + + 83 + - 82 + 78 * 55 AS col2

Expected: ["NULL"] but got ["4572"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col2, COUNT ( * ) / + CASE - 28 WHEN - 68 THEN 80 WHEN + 37 THEN NULL WHEN - 67 THEN - 1 ELSE NULL END

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 98 + + 54 * CAST ( - + COUNT ( * ) AS INTEGER ) - 18 + + 34 / 2 - 4 col1

g is not defined
```


```sql
SELECT ALL - 7 * + 42 + - + 64 / + + ( - 74 ) AS col2, CAST ( NULL AS REAL ) AS col0

Expected: ["-294","NULL"] but got ["-293.135","NULL"]
```


```sql
SELECT ALL - 84 AS col0, CASE - 33 WHEN + + 31 THEN - CAST ( 9 AS REAL ) END AS col0

Expected: ["-84","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col1, - CAST ( NULL AS INTEGER ) * - - COUNT ( * ) - + + 71 AS col2

Expected: ["NULL","NULL"] but got ["0","-71"]
```


```sql
SELECT + - ( - + COUNT ( * ) ) - CASE WHEN NOT ( NULL ) NOT BETWEEN + 70 AND + MAX ( ALL + + ( + 2 ) ) + - + 74 THEN + 11 ELSE NULL END AS col1

Cannot read property 'toString' of undefined
```


```sql
SELECT - - CASE WHEN NOT - 9 IN ( + 59 - + SUM ( DISTINCT - + ( - 5 ) ) ) THEN - 53 WHEN ( 17 * + 60 ) NOT IN ( + 45 * 9 + 60 ) OR + ( COUNT ( * ) ) * + 19 IS NULL THEN NULL ELSE NULL END

Expected: ["-53"] but got ["NULL"]
```


```sql
SELECT ALL 12 / - - 63 + - COALESCE ( + - 21, + COUNT ( * ) ) + 55 + - - MIN ( ALL + 12 ) AS col2

Expected: ["88"] but got ["88.190"]
```

#### ☓ Ran 10012 tests as sqlite

* 1892 failed
* 81% was OK

Time: 44780ms

---- ---- ---- ---- ---- ---- ----
### 462/622 [`./test/random/expr/slt_good_86.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_86.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 64 * ( - + 83 ) + - 88 + + + COUNT ( * ) * - 77 / 55 AS col1

Expected: ["-5401"] but got ["-5401.400"]
```


```sql
SELECT ALL + 30 + CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["30"]
```


```sql
SELECT + 65 * + 50 * + - MIN ( ALL - ( + 16 ) ) + CAST ( NULL AS INTEGER ) + - 10 + - 93, + CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["51897","0"]
```


```sql
SELECT ALL 37 * 65 + - 66 * CAST ( AVG ( - CAST ( NULL AS INTEGER ) ) AS INTEGER ) * + ( + COALESCE ( + 22, - 4 + 68 ) ) + - 61 AS col1

g is not defined
```


```sql
SELECT ALL NULLIF ( ( - CASE - 78 WHEN + + COUNT ( * ) THEN - + 84 - - + 81 END ), 44 ) AS col2, 44

Expected: ["NULL","44"] but got ["44","NULL"]
```


```sql
SELECT 51 * + - CASE WHEN NOT 1 BETWEEN - MIN ( - NULLIF ( - 96, 11 ) ) AND ( COUNT ( * ) ) THEN COUNT ( DISTINCT - 90 ) ELSE NULL END col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) + + + 83 + 10 AS col0, CASE - 86 WHEN - + 24 - 95 / - COUNT ( ALL 74 ) THEN - - 25 * + COALESCE ( 2, - 42 ) ELSE NULL END

Expected: ["NULL","NULL"] but got ["93","NULL"]
```


```sql
SELECT ALL + - MIN ( - + 93 ) * - NULLIF ( 0, + CAST ( NULL AS INTEGER ) * - 32 ) * - MIN ( - 70 ) - - 23 + - 25 AS col0

Expected: ["-2"] but got ["NULL"]
```


```sql
SELECT ALL + 13 col1, + 39 * - ( + 90 ) / + - CAST ( NULL AS INTEGER ) col1

Expected: ["13","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - 81 + CAST ( - COUNT ( * ) AS INTEGER ) AS col2

g is not defined
```

#### ☓ Ran 10012 tests as sqlite

* 1772 failed
* 82% was OK

Time: 49938ms

---- ---- ---- ---- ---- ---- ----
### 463/622 [`./test/random/expr/slt_good_87.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_87.test)

_Mimic sqlite_

```sql
SELECT - + 82 / + 97

Expected: ["0"] but got ["-0.845"]
```


```sql
SELECT + 40 * + CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( - MIN ( - 52 ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ), - CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL + COUNT ( * ) / CAST ( + COUNT ( * ) AS INTEGER ) AS col1

Expected: ["1"] but got ["NULL"]
```


```sql
SELECT + 71 AS col1, - CAST ( NULL AS REAL ) AS col1

Expected: ["71","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT - - CAST ( NULL AS INTEGER ), CASE 2 WHEN - - 11 THEN + - 26 ELSE NULL END + - CASE - 39 WHEN 42 THEN - 29 * - 75 WHEN 43 * 60 THEN NULL ELSE - 13 + 92 END

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 94 * COUNT ( * ) / + 77 AS col0, - CASE + - 59 WHEN + 81 THEN - - 47 + COALESCE ( 76, - 97 ) WHEN - 3 THEN CAST ( 92 AS INTEGER ) + 59 WHEN + 61 THEN NULL END AS col0

Expected: ["1","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1594 failed
* 84% was OK

Time: 28785ms

---- ---- ---- ---- ---- ---- ----
### 464/622 [`./test/random/expr/slt_good_88.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_88.test)

_Mimic sqlite_

```sql
SELECT 66 * - ( - 51 ) * + 9 + CAST ( NULL AS INTEGER ) + - 68 - - 59 + - 8 * - + 43 + + COUNT ( * ) AS col0

Expected: ["NULL"] but got ["30630"]
```


```sql
SELECT DISTINCT - SUM ( ALL 2 ) * - 92 + + 94 - - ( - COUNT ( * ) ) / + 48 - 15 col0

Expected: ["263"] but got ["262.979"]
```


```sql
SELECT ALL + 80 * + 85 + + CAST ( + - COUNT ( * ) AS INTEGER ) * + 9 AS col2

g is not defined
```


```sql
SELECT 80 + COUNT ( * ) * 93 * - NULLIF ( 6, + COUNT ( 33 ) ) - - CASE WHEN NOT 17 NOT BETWEEN - 91 - - 31 AND 36 THEN - + 3 ELSE NULL END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + CASE - + 44 WHEN 51 * - 55 - + + 99 * - ( - 28 ) * - + 88 THEN 40 ELSE NULL END, 84 * - + CAST ( NULL AS INTEGER ) / + 18

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + 0 + - COALESCE ( - CASE - 81 WHEN - 57 THEN NULL WHEN 91 THEN NULL WHEN - 82 * COALESCE ( + 86, 40 ) THEN NULL ELSE 48 / - CAST ( NULL AS INTEGER ) + + 16 * 43 END, 57 ) + - 69 / - 81 col0

Expected: ["-57"] but got ["NULL"]
```


```sql
SELECT ALL CASE 45 WHEN 49 THEN COUNT ( * ) ELSE NULL END AS col1, 52

Expected: ["NULL","52"] but got ["52","NULL"]
```


```sql
SELECT + + CASE + 30 WHEN + - 65 THEN NULL ELSE 78 END / + 99 + + 0

Expected: ["0"] but got ["0.788"]
```


```sql
SELECT ALL 80 AS col2, + CASE - 98 WHEN 50 THEN + - 29 WHEN - + 24 / + 61 * - 43 THEN NULL END AS col2

Expected: ["80","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL AVG ( - - 41 ) + - - 2 * 48 * - - NULLIF ( + NULLIF ( CAST ( NULL AS INTEGER ), + 84 * + 66 + + + COUNT ( * ) + - 18 ), ( - 35 ) + 61 ) * 61 AS col0, CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["41","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1920 failed
* 80% was OK

Time: 43729ms

---- ---- ---- ---- ---- ---- ----
### 465/622 [`./test/random/expr/slt_good_89.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_89.test)

_Mimic sqlite_

```sql
SELECT ALL + + ( - 63 ) * CAST ( NULL AS INTEGER ) * - 28 * AVG ( - - 65 ) / - 65 + + 98 * + 80

Expected: ["NULL"] but got ["7840"]
```


```sql
SELECT ALL 75 * + CAST ( NULL AS INTEGER ) * ( - + 42 ), + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + COALESCE ( + - ( 51 ), 10 * - + 5 - + - 48 ) / - + 7 - - + 54 AS col1

Expected: ["61"] but got ["61.286"]
```


```sql
SELECT - CAST ( - MIN ( + 22 ) AS INTEGER ) AS col1

g is not defined
```


```sql
SELECT CASE - + 76 WHEN + 7 THEN - - 30 END + + - 8 * ( - - 71 ) + COUNT ( * ) AS col2, + 34 / 84

Expected: ["NULL","0"] but got ["NULL","0.405"]
```


```sql
SELECT ALL + 38 * - - 77 AS col2, + 62 / + - CAST ( NULL AS INTEGER ) AS col2

Expected: ["2926","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL - 0 * 71 + CAST ( NULL AS INTEGER ) AS col0, 0 + + + CASE + 94 WHEN + 89 * + + CAST ( 35 AS INTEGER ) THEN - 28 END * - COUNT ( * )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT - - CASE WHEN NOT - + 21 BETWEEN + + CAST ( NULL AS INTEGER ) AND NULL OR NOT + + 78 * ( + 77 ) * - 87 - + - 18 * - 28 * 4 + - + CASE - 1 WHEN + - 80 THEN - 15 WHEN 22 * ( + 38 ) + + - 64 + - CASE + 33 WHEN + - COUNT ( * ) THEN - COUNT ( ALL ( 6 ) ) END THEN NULL WHEN - 27 + + + 59 * - 87 * + NULLIF ( + 60, + SUM ( ALL - 15 ) / + 46 + - 83 ) THEN NULL END + - 89 * 98 IS NULL THEN 73 END

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + 47 col2, 4 * - ( + 8 ) + - 16 + - 42 + SUM ( ALL - - 67 ) * ( + CASE - + SUM ( + + 41 ) WHEN + - 41 * - - 71 THEN NULL WHEN + COUNT ( * ) THEN COUNT ( * ) ELSE NULL END ) + - - 52 col2, - - 26 - 94 + - CASE - + 20 WHEN - + CAST ( NULL AS INTEGER ) THEN CAST ( NULL AS INTEGER ) * - 43 + + - CAST ( NULL AS INTEGER ) * - + 3 + + + 13 WHEN - 29 / - 38 + + + CASE 90 WHEN - 41 THEN - 77 * …

Expected: ["47","NULL","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT + COALESCE ( + 17, + 23 ) * 5 + + - CASE WHEN NOT NULL > NULL THEN + CASE WHEN NOT + 3 IS NULL THEN NULL ELSE ( NULLIF ( NULLIF ( COUNT ( * ), - MIN ( ALL 2 ) ), - COALESCE ( + MAX ( ALL 12 ), 23 * 61, - COUNT ( * ) ) ) ) END WHEN NULL < ( COUNT ( * ) ) THEN NULL ELSE 17 * 10 END col2

Expected: ["-85"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1844 failed
* 81% was OK

Time: 44775ms

---- ---- ---- ---- ---- ---- ----
### 466/622 [`./test/random/expr/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_9.test)

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
SELECT ALL + 52 * COUNT ( * ) * - 13 * + 26 * - CAST ( NULL AS INTEGER ) AS col1, + 39 * ( + - CAST ( NULL AS REAL ) )

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT + ( + + 12 ) + - + 36 + - 83 * - 12 * ( - 71 ) * + CAST ( NULL AS INTEGER ) * + AVG ( DISTINCT + ( + 21 ) ) * 16 + - 97, CAST ( NULL AS INTEGER ) * - 90 AS col2

Expected: ["NULL","NULL"] but got ["-121","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1899 failed
* 81% was OK

Time: 31622ms

---- ---- ---- ---- ---- ---- ----
### 467/622 [`./test/random/expr/slt_good_90.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_90.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 87 / + - 33 + - - 77 AS col2

Expected: ["75"] but got ["74.364"]
```


```sql
SELECT ALL COUNT ( * ) / + - MIN ( ( - 7 ) ) * - 70 + - - 98 + MIN ( ALL 43 ) * 36 * + - 0 - + + CAST ( NULL AS INTEGER ) + + - NULLIF ( + 75, + 17 ) / - SUM ( + 84 ) AS col0

Expected: ["NULL"] but got ["98.891"]
```


```sql
SELECT ALL + 6 * + 21 * 76 - - + 49 AS col0, 92 + CASE - + COUNT ( * ) WHEN - COUNT ( * ) * 13 - + 63 * + + 60 * + 20 + - - 56 THEN COUNT ( * ) WHEN CAST ( + COUNT ( * ) AS INTEGER ) THEN - - 51 + - 41 ELSE NULL END + + + 44 + 51 * + 67 * 43 AS col0

Expected: ["9625","NULL"] but got ["NULL"]
```


```sql
SELECT + - CAST ( COUNT ( * ) AS INTEGER ) + + 43 + + 65 * 85 + + 58

g is not defined
```


```sql
SELECT - CASE WHEN NOT 26 IN ( + 95 ) THEN - NULLIF ( 63, + COUNT ( * ) ) * MIN ( DISTINCT 12 ) WHEN NOT ( COUNT ( * ) - 68 * + 98 ) IS NULL THEN NULL ELSE NULL END * + 51

Expected: ["38556"] but got ["NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + 40 - + 58 + - 49 * - + 82 + - 7 * + + ( - + CAST ( NULL AS REAL ) ), - AVG ( 26 ) * + 9 * - CAST ( NULL AS INTEGER ) / 56 * - 15

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + 83 + 0 * - CASE WHEN NOT + NULLIF ( - 5, - 71 * 0 + - - 57 ) BETWEEN - 72 AND ( 54 * - COUNT ( * ) + 86 ) THEN NULL WHEN NOT ( - ( - CAST ( NULL AS INTEGER ) ) ) NOT BETWEEN + 11 / COUNT ( * ) AND - 43 THEN - COUNT ( * ) * + NULLIF ( CAST ( NULL AS INTEGER ), 16 + 8 ) + + 93 END

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 1911 failed
* 80% was OK

Time: 36258ms

---- ---- ---- ---- ---- ---- ----
### 468/622 [`./test/random/expr/slt_good_91.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_91.test)

_Mimic sqlite_

```sql
SELECT - CASE + - 1 WHEN CAST ( NULL AS INTEGER ) THEN - 64 ELSE - + 18 + + ( 90 ) / - 14 + - 60 END AS col1

Expected: ["84"] but got ["84.429"]
```


```sql
SELECT ALL + + 59 + CAST ( NULL AS INTEGER ) - + 73 / + + 14 col2

Expected: ["NULL"] but got ["53.786"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + 26 AS col1, CAST ( NULL AS INTEGER ) col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + 49 * CASE ( ( - 89 ) ) WHEN - - 55 THEN NULL WHEN - COUNT ( * ) THEN - ( 25 ) ELSE NULL END AS col2, 33

Expected: ["NULL","33"] but got ["33","NULL"]
```


```sql
SELECT - CAST ( COALESCE ( CASE COUNT ( * ) WHEN 58 THEN NULL WHEN + ( + 76 ) THEN 40 WHEN 91 THEN - 91 * + COUNT ( * ) ELSE NULL END, - 85 ) AS INTEGER ) * - 14 + - 27 / 53 AS col2

g is not defined
```


```sql
SELECT ALL + CAST ( NULL AS REAL ) AS col2, + 90 - 45 + - ( - 36 ) * - SUM ( ALL - CASE 96 WHEN + 28 * 84 + - 71 * + 27 THEN + 62 * - NULLIF ( - 72, 46 ) END / - 91 + 31 * - 97 ) AS col1

Expected: ["NULL","NULL"] but got ["NULL","45"]
```


```sql
SELECT DISTINCT - - ( - - CASE WHEN NOT + 87 BETWEEN NULL AND ( NULL ) THEN + 33 END )

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL 66 AS col0, 57 - - CASE 41 WHEN - 95 - - 18 THEN - + 93 ELSE NULL END AS col0

Expected: ["66","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 33 / ( + CAST ( COUNT ( * ) AS INTEGER ) ) + - COUNT ( * ) / + 26 AS col2

Expected: ["33"] but got ["NULL"]
```


```sql
SELECT + 55 / 78 + + NULLIF ( + + COALESCE ( - - 82, 35 * + 40, + 19 ), + 7 ) * + - 49 * - + 75

Expected: ["301350"] but got ["301350.705"]
```

#### ☓ Ran 10012 tests as sqlite

* 1896 failed
* 81% was OK

Time: 51533ms

---- ---- ---- ---- ---- ---- ----
### 469/622 [`./test/random/expr/slt_good_92.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_92.test)

_Mimic sqlite_

```sql
SELECT COALESCE ( - 92, - COUNT ( * ) * COUNT ( * ) * + 9 ) / - 68

Expected: ["1"] but got ["1.353"]
```


```sql
SELECT 67 * - CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + - 40 * + CAST ( - ( + + COUNT ( * ) ) AS INTEGER ) AS col0

g is not defined
```


```sql
SELECT DISTINCT - CASE WHEN NOT + COALESCE ( + CAST ( ( 16 ) AS INTEGER ), + 92 + - 66, CAST ( NULL AS INTEGER ) * - 47 ) NOT BETWEEN NULLIF ( 98, 67 ) * + 63 AND COUNT ( * ) + 21 THEN CASE 84 WHEN + 36 THEN NULLIF ( 2, - ( 57 ) ) + 72 * 16 WHEN - CAST ( NULL AS INTEGER ) THEN NULL END END col2

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL COUNT ( * ) AS col2, CASE + COUNT ( * ) WHEN 94 THEN 38 END AS col2

Expected: ["1","NULL"] but got ["NULL"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) col2, + 46 + - - CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","46"]
```


```sql
SELECT DISTINCT COUNT ( * ) + + 69 / CAST ( + + MIN ( 45 ) AS INTEGER ) + + + 48 * + 31 col1

Expected: ["1490"] but got ["NULL"]
```


```sql
SELECT ALL - 11 / - ( - CAST ( NULL AS REAL ) ) + - ( + + COUNT ( * ) ), + COUNT ( * ) * - - CAST ( NULL AS INTEGER ) * - CAST ( ( - 37 ) AS INTEGER )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT ALL + 8 AS col0, 32 * ( + COALESCE ( + - 41, 66 ) ) / + - CAST ( NULL AS INTEGER ) * - 97 * + 6 + - + 41 + - - 50 AS col0

Expected: ["8","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1953 failed
* 80% was OK

Time: 32701ms

---- ---- ---- ---- ---- ---- ----
### 470/622 [`./test/random/expr/slt_good_93.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_93.test)

_Mimic sqlite_

```sql
SELECT ALL - 25 / 11

Expected: ["-2"] but got ["-2.273"]
```


```sql
SELECT ALL - 98 * - ( 70 ) * + CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + 94 * CAST ( + NULLIF ( + + 66, - COUNT ( * ) ) AS INTEGER ) * - CAST ( NULL AS INTEGER )

g is not defined
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / 49 + - 27 + CASE WHEN NOT 32 BETWEEN - 37 + - 51 AND - ( + 3 ) / COUNT ( * ) THEN NULL WHEN 80 + MAX ( + ( 47 ) ) >= + 28 * 8 THEN + 29 + 81 ELSE NULL END - - 25 * + 34 * + COUNT ( * ) col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + + 68 * + COUNT ( * ) * - 50 + + + CAST ( NULL AS INTEGER ) AS col0, + CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["-3400","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ), CASE 21 WHEN CASE + 11 WHEN 9 THEN + 2 + + 60 END / - 0 + 93 THEN + + ( + - 69 ) END AS col2

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 18 / 31, CASE - - 1 WHEN + 74 * 49 THEN NULL WHEN - 25 THEN 26 + 77 WHEN - 80 THEN 27 END * + 32 AS col1

Expected: ["0","NULL"] but got ["0.581","NULL"]
```


```sql
SELECT 84 * + ( - 6 ) AS col2, + CAST ( NULL AS REAL ) + + 8 AS col2

Expected: ["-504","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT 75 + - - CASE WHEN NOT ( NULL ) >= 4 THEN NULL WHEN NOT 24 IN ( 77 * + AVG ( + 27 ) + 72 * 4 ) THEN + 91 + - ( 2 + + ( 55 ) ) / + 18 END AS col2

Expected: ["163"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1911 failed
* 80% was OK

Time: 39052ms

---- ---- ---- ---- ---- ---- ----
### 471/622 [`./test/random/expr/slt_good_94.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_94.test)

_Mimic sqlite_

```sql
SELECT - MIN ( DISTINCT - 33 ) * - 19 + - + 3 / - 39

Expected: ["-627"] but got ["-626.923"]
```


```sql
SELECT ALL - + 13 + + CAST ( NULL AS INTEGER ) - - + 94

Expected: ["NULL"] but got ["81"]
```


```sql
SELECT + 16 + - 24 AS col1, 24 / - AVG ( DISTINCT - + 34 ) * 20 * + CASE + 27 WHEN 24 THEN NULL WHEN + 51 * - COUNT ( * ) THEN NULL WHEN - CAST ( 69 AS INTEGER ) THEN NULLIF ( + 87, CAST ( NULL AS INTEGER ) ) ELSE NULL END + 45 AS col1

Expected: ["-8","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT 35 - + + 66 * 92 + - ( - - CAST ( + MIN ( DISTINCT - 53 ) AS INTEGER ) ) AS col2

g is not defined
```


```sql
SELECT - CASE WHEN + 88 NOT BETWEEN - 13 AND - CAST ( - 77 AS INTEGER ) / 50 - - 89 + + 31 * + 65 THEN NULLIF ( - 49, + + 71 ) END

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * + 85 AS col2, CAST ( NULL AS INTEGER ) AS col0

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - CASE COUNT ( * ) WHEN ( COUNT ( * ) ) / + 60 - + - COUNT ( - 16 ) THEN - 57 - + 28 WHEN - 42 THEN CASE + 62 WHEN 22 / - 98 + - 69 * - COUNT ( * ) THEN - 86 WHEN + ( + 13 ) THEN NULL WHEN - 86 THEN + 88 * 82 WHEN 94 * + 28 + + COUNT ( * ) THEN NULL ELSE + 81 * 49 + + 84 * - 70 END END AS col0

Expected: ["85"] but got ["NULL"]
```


```sql
SELECT + CASE 87 WHEN 17 - - - NULLIF ( + COUNT ( * ), 10 + 31 ) THEN + 20 ELSE NULL END - - 76 AS col0, 19 + - + 8, + + 26 - + 69 - - NULLIF ( - - 95, - + 39 ) / CAST ( NULL AS REAL ) AS col0

Expected: ["NULL","11","NULL"] but got ["NULL","11"]
```


```sql
SELECT 59 col2, CASE - 75 WHEN 56 THEN + 53 WHEN - - ( + CAST ( + - 44 AS INTEGER ) ) * + + CAST ( NULL AS INTEGER ) THEN ( - 20 ) * - - 19 * + 75 * + 43 END * - + 98 AS col2

Expected: ["59","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1898 failed
* 81% was OK

Time: 32448ms

---- ---- ---- ---- ---- ---- ----
### 472/622 [`./test/random/expr/slt_good_95.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_95.test)

_Mimic sqlite_

```sql
SELECT DISTINCT ( + 13 ) - - 79 AS col0, CAST ( NULL AS INTEGER ) AS col1

Expected: ["92","NULL"] but got ["92","0"]
```


```sql
SELECT ALL 50 / + - ( + + 6 )

Expected: ["-8"] but got ["-8.333"]
```


```sql
SELECT CASE + CAST ( ( - + CASE + 1 WHEN - - CASE - + 31 WHEN 86 THEN NULL ELSE + 3 + + + 75 + 85 * - 17 + - CAST ( NULL AS INTEGER ) - + 89 END + - + 42 THEN NULL ELSE COUNT ( * ) * 64 END ) AS INTEGER ) WHEN - 25 THEN CAST ( NULL AS INTEGER ) WHEN + ( 10 ) THEN NULL END AS col0

g is not defined
```


```sql
SELECT ALL - + CAST ( + - COUNT ( * ) AS INTEGER ), COUNT ( * ) + - 86 + - - 20 + + CAST ( NULL AS REAL ) * - 6 * - CAST ( - - 3 AS INTEGER ) * - 4 AS col0

Expected: ["1","NULL"] but got ["0","NULL"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ), + CASE - - 48 WHEN + 39 - + - COUNT ( * ) THEN - + 50 + - 70 WHEN + 28 + + - 4 THEN NULL ELSE NULL END * - - 85 * + COUNT ( * ) AS col1

Expected: ["NULL","NULL"] but got ["0","NULL"]
```


```sql
SELECT 36 + - + 42 + - CASE WHEN NULL BETWEEN NULL AND NULL THEN - 35 END + + - 64 AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT + 31 + CASE - - 29 WHEN + 17 + + 42 THEN NULL WHEN - - 19 * + - CASE - NULLIF ( - 32, COUNT ( * ) + - - 69 ) WHEN + + 72 THEN + 3 ELSE + 73 - - 18 + 58 + + 91 END - + 96 THEN 46 + + COALESCE ( + ( 49 ), 63 * CAST ( - 28 AS INTEGER ) ) * - 44 WHEN 29 THEN 37 END AS col1

Expected: ["68"] but got ["NULL"]
```


```sql
SELECT 81 AS col2, - CASE + 29 WHEN 5 THEN NULL WHEN - 11 THEN + 92 WHEN - ( - + 77 ) THEN NULL ELSE NULL END * 5 AS col2

Expected: ["81","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) + - 34 * - + COUNT ( * ) col2, - 73 + + + CAST ( NULL AS INTEGER ) * - - 92

Expected: ["NULL","NULL"] but got ["34","-73"]
```

#### ☓ Ran 10012 tests as sqlite

* 1939 failed
* 80% was OK

Time: 30773ms

---- ---- ---- ---- ---- ---- ----
### 473/622 [`./test/random/expr/slt_good_96.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_96.test)

_Mimic sqlite_

```sql
SELECT + + 66 / 58 * 71 * - 5 AS col2

Expected: ["-355"] but got ["-403.966"]
```


```sql
SELECT ALL 30 * CAST ( NULL AS INTEGER ) - + 47 AS col0

Expected: ["NULL"] but got ["-47"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - - 79 + - 43 / CAST ( CASE - 3 WHEN + 99 THEN NULL ELSE + COUNT ( * ) * + - MAX ( ALL + 10 ) END AS INTEGER ) * - - 36 - + 96

g is not defined
```


```sql
SELECT COALESCE ( + 98, + MIN ( + 74 ) ) * - + 49 + COUNT ( ALL - 63 ) - + 32 * CASE CAST ( 78 AS INTEGER ) WHEN - - 28 * 9 + - - CASE WHEN NOT 40 > NULL THEN NULL WHEN + 3 BETWEEN + 8 + + 74 AND ( NULL ) THEN COUNT ( * ) + + ( - NULLIF ( + + 48, ( - + 26 ) ) ) * 43 * + + 67 * - - 97 * + 60 ELSE - CAST ( NULL AS INTEGER ) END + - COALESCE ( ( + ( 84 ) ), - 12, - 99 ) + + 32 THEN NULL WHEN + 39 TH…

Cannot read property 'toString' of undefined
```


```sql
SELECT DISTINCT + 78 col0, ( COUNT ( * ) ) / + + CASE + - 59 WHEN + 91 * + + 52 * - - COALESCE ( 29, - COUNT ( DISTINCT - - 33 ) + - 86 * 90, - 5 - 84 ) THEN 24 END * 23 + - 46 * 14 AS col0

Expected: ["78","NULL"] but got ["NULL"]
```


```sql
SELECT - 28 - - ( + + 54 ) / - CAST ( - SUM ( ALL ( 81 ) ) AS INTEGER ) * - - 48 * 96 + - - 49 - + COUNT ( * ) / + 9 + - 60 + 56 + COALESCE ( + 37, - - 41 ) * - ( + - 71 ) + - 53 * + 2

Expected: ["2538"] but got ["NULL"]
```


```sql
SELECT - CASE - COUNT ( * ) WHEN 69 + + 44 + + + 29 * - ( - 27 ) + + + 38 + + + 52 THEN - 46 WHEN + - COUNT ( * ) * + + COUNT ( * ) THEN NULL ELSE NULL END, + CAST ( NULL AS INTEGER ) * COUNT ( * ) * - ( 48 )

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) AS col2, CAST ( NULL AS INTEGER )

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1854 failed
* 81% was OK

Time: 29342ms

---- ---- ---- ---- ---- ---- ----
### 474/622 [`./test/random/expr/slt_good_97.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_97.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 90 col1, 64 AS col1

Expected: ["90","64"] but got ["64","64"]
```


```sql
SELECT + 4 * + - CAST ( - COUNT ( * ) AS INTEGER ) - + - 22

g is not defined
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) col0, - AVG ( - + CAST ( NULL AS INTEGER ) ) AS col2

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT + 1 * - COUNT ( * ) * + - 98 * - ( CAST ( NULL AS INTEGER ) ) + - 47 AS col1

Expected: ["NULL"] but got ["-47"]
```


```sql
SELECT ALL - ( - CASE WHEN NOT 43 IS NULL THEN NULL WHEN NOT ( NULL ) BETWEEN 56 / 17 + - 50 AND 28 * + 61 + + 0 THEN + - 8 END ) AS col2

Cannot read property 'toString' of undefined
```


```sql
SELECT + 37 AS col2, - 15 + - CASE - 20 WHEN - 85 THEN NULL WHEN - - 42 + - 67 THEN - 81 + + 69 WHEN + ( - COUNT ( * ) ) THEN COALESCE ( 86, - 68 ) END + 40 AS col2

Expected: ["37","NULL"] but got ["NULL"]
```


```sql
SELECT DISTINCT - CASE COUNT ( * ) WHEN - - COUNT ( * ) + 29 / - 40 * - ( - - CASE 37 WHEN - + MIN ( + 39 ) / CASE + + ( + - 12 ) WHEN - 23 + - 19 THEN NULL WHEN - 12 * - ( SUM ( 84 ) ) THEN 5 ELSE - - 57 - - - 61 END THEN NULL WHEN + CASE + 92 WHEN - 72 / - - COUNT ( * ) THEN NULL WHEN + - SUM ( + 57 ) THEN NULL WHEN + SUM ( DISTINCT - + 88 ) + 44 * + ( 3 ) THEN 95 END THEN NULL ELSE 48 END ) TH…

Expected: ["79"] but got ["NULL"]
```


```sql
SELECT ALL - 64 * CASE + - 89 WHEN 66 / COUNT ( * ) THEN + + COUNT ( * ) END col2, CASE - + 44 WHEN + 22 THEN - 9 END * 23 * - - 34 AS col2

Expected: ["NULL","NULL"] but got ["NULL"]
```


```sql
SELECT + 7 * + 13 AS col2, - ( - CASE 24 WHEN + 85 THEN NULL WHEN + 7 THEN COALESCE ( + ( 42 ), - 63 ) END ) AS col2

Expected: ["91","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT - 38 + + 71 + - 75 - 2 + + 87 + 22 * + + CASE + 82 WHEN - 4 THEN + - COUNT ( + 61 ) WHEN CAST ( NULL AS INTEGER ) THEN NULL ELSE NULL END * 65 col1, 21 + + + 62 * 73 * - CAST ( NULL AS INTEGER ) / - 80, + + 61 / - CAST ( NULL AS REAL ) AS col2

Expected: ["NULL","NULL","NULL"] but got ["NULL","21","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1895 failed
* 81% was OK

Time: 28393ms

---- ---- ---- ---- ---- ---- ----
### 475/622 [`./test/random/expr/slt_good_98.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_98.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 40 / - - 17 AS col2

Expected: ["2"] but got ["2.353"]
```


```sql
SELECT + COUNT ( * ) AS col2, - CAST ( NULL AS INTEGER ) AS col2

Expected: ["1","NULL"] but got ["0"]
```


```sql
SELECT - 2 + + + CAST ( - COUNT ( * ) AS INTEGER )

g is not defined
```


```sql
SELECT ALL CAST ( NULL AS REAL ) * - COUNT ( * ), - AVG ( DISTINCT - CAST ( NULL AS INTEGER ) ) AS col2

Expected: ["NULL","NULL"] but got ["NULL","0"]
```


```sql
SELECT DISTINCT + CASE WHEN NOT + CAST ( NULL AS INTEGER ) IS NULL THEN NULL ELSE + 26 END col2

Expected: ["26"] but got ["NULL"]
```


```sql
SELECT ALL COUNT ( * ) - + CAST ( NULL AS REAL ) AS col0, 84

Expected: ["NULL","84"] but got ["84","NULL"]
```


```sql
SELECT - CASE WHEN NULL NOT BETWEEN ( NULL ) AND 53 THEN - - 50 WHEN NULL IS NULL THEN NULL END / + 15

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) AS col1, AVG ( CAST ( NULL AS INTEGER ) )

Expected: ["NULL","NULL"] but got ["0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1637 failed
* 83% was OK

Time: 29985ms

---- ---- ---- ---- ---- ---- ----
### 476/622 [`./test/random/expr/slt_good_99.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_99.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - MAX ( - 57 ) + 16 + + 44 / - + CASE - 95 WHEN 84 + 9 + + 81 * + 48 + + 37 THEN NULL WHEN - ( - + 82 ) THEN NULL ELSE 42 + - - 88 END * + 36 + + 41 * COUNT ( * ) + + 45

Expected: ["159"] but got ["158.991"]
```


```sql
SELECT ALL + ( + CAST ( NULL AS INTEGER ) ) AS col2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( - COUNT ( * ) AS INTEGER ) * + - 55 + - 66

g is not defined
```


```sql
SELECT ALL + + COUNT ( * ) / 25 + 85 + + + 98 + - 27 * 98 * - - SUM ( - 27 ) + + 79 / + + 94 * + + CAST ( - - ( - COUNT ( * ) ) AS INTEGER )

Expected: ["71625"] but got ["NULL"]
```


```sql
SELECT ALL + 94 AS col1, ( - 51 ) - - 87 * + 99 * - - AVG ( - 2 ) * + - 75 / - 86 * + + CASE - + 13 WHEN - ( - 81 ) THEN + - COUNT ( * ) WHEN - 51 * - 13 THEN NULL END AS col1

Expected: ["94","NULL"] but got ["NULL"]
```


```sql
SELECT 83 - + 10 + - + 68 + + 19 - + CAST ( - ( + - 17 ) AS INTEGER ) * MIN ( 57 ) * + 46 + - - ( ( 90 ) ) + + 64 + + - NULLIF ( - 1, + - 3 ) * - + 69 + CASE WHEN NOT - SUM ( + 48 ) NOT BETWEEN ( - 53 ) AND - 29 * - COUNT ( * ) THEN COUNT ( * ) WHEN NOT NULL IS NOT NULL THEN - 41 * ( COUNT ( * ) * - 62 ) END AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT CAST ( NULL AS REAL ) + COUNT ( * ) AS col1, 68 + ( 73 ) + + CAST ( NULL AS INTEGER ) + - - COALESCE ( + + 29, 43 + + MAX ( - - CAST ( NULL AS INTEGER ) ) * + CASE ( + - 69 ) WHEN + 0 THEN - 87 END, + 80 * + 84 ) AS col1

Expected: ["NULL","NULL"] but got ["170"]
```


```sql
SELECT 4 AS col0, + CAST ( NULL AS REAL ) AS col0

Expected: ["4","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT COUNT ( * ) * - 18 * - CAST ( NULL AS INTEGER ) + COUNT ( * ) col2, 17 + COUNT ( * ) + - COALESCE ( 13, - 15 + 62 ) + + CASE - 85 + 82 * + 81 WHEN 61 * + 60 THEN 41 / - 49 END * 19 AS col2

Expected: ["NULL","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1914 failed
* 80% was OK

Time: 47125ms

---- ---- ---- ---- ---- ---- ----
### 477/622 [`./test/random/groupby/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_0.test)

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
SELECT DISTINCT - ( cor0.col1 ) FROM tab1 AS cor0 GROUP BY cor0.col0, cor0.col1

Expected: ["-44","-57","-6"] but got ["NULL"]
```


```sql
SELECT ALL cor0.col1 AS col1 FROM tab2 AS cor0 GROUP BY col1 HAVING NOT ( cor0.col1 ) IS NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 4255 failed
* 57% was OK

Time: 30120ms

---- ---- ---- ---- ---- ---- ----
### 478/622 [`./test/random/groupby/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_1.test)

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
SELECT DISTINCT + 22 * + cor0.col2 AS col1 FROM tab1 AS cor0 GROUP BY col2

Expected: ["1562","176","990"] but got ["NULL"]
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

* 4111 failed
* 58% was OK

Time: 32556ms

---- ---- ---- ---- ---- ---- ----
### 479/622 [`./test/random/groupby/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 AS col2, + col0 + - col1 AS col2 FROM tab0 GROUP BY col1, col0

Expected: ["26","26","43","-38","83","83"] but got ["-38","26","83"]
```


```sql
SELECT DISTINCT + + col0 FROM tab0 cor0 GROUP BY col2, col0 HAVING NOT + col2 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT + col1 AS col1 FROM tab1 AS cor0 WHERE NOT - col1 BETWEEN ( - col0 ) AND NULL GROUP BY col1

Expected: ["57"] but got ["NULL"]
```


```sql
SELECT DISTINCT col0 AS col1, col0, col0 AS col1 FROM tab0 cor0 GROUP BY col0

6 results returned but expected 9
```

#### ☓ Ran 10012 tests as sqlite

* 284 failed
* 97% was OK

Time: 29052ms

---- ---- ---- ---- ---- ---- ----
### 480/622 [`./test/random/groupby/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_11.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col2 col0 FROM tab1 AS cor0 GROUP BY col2 HAVING NOT ( NOT col2 IS NOT NULL )

Query was expected to return results (but did not) 
```


```sql
SELECT + col2 * col1 AS col0, - col1 AS col0 FROM tab1 AS cor0 GROUP BY col2, col1

Expected: ["2565","-57","3124","-44","48","-6"] but got ["-44","-57","-6"]
```


```sql
SELECT + col1 AS col2, col1 * col1 - - + col1, - col1 AS col2 FROM tab1 AS cor0 GROUP BY col1

6 results returned but expected 9
```


```sql
SELECT - + CAST ( NULL AS INTEGER ) col0 FROM tab1 AS cor0 GROUP BY col1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + col2 + + ( + col2 ) FROM tab2 AS cor0 WHERE - CAST ( NULL AS INTEGER ) IS NULL GROUP BY col2

Expected: ["116","158","174"] but got ["NULL"]
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0 GROUP BY col0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + col2, ( + col2 ) AS col1 FROM tab1 AS cor0 WHERE NOT 65 NOT BETWEEN - col0 + - col1 AND 78 GROUP BY col2

Expected: ["45","45","71","71","8","8"] but got ["NULL","NULL"]
```


```sql
SELECT - - 67 + - + col1 AS col0, CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0 GROUP BY col1

Expected: ["-14","NULL","67","NULL"] but got ["0","0"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ), + ( - - col0 ) AS col0, + col0 FROM tab2 GROUP BY col0, col2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col0 + - col1 * - + CAST ( NULL AS REAL ) * - col0 FROM tab2 GROUP BY col0, col1 HAVING NOT + 55 NOT BETWEEN + col0 AND + 77

Expected: ["NULL"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT + CASE WHEN NOT NULL NOT BETWEEN NULL AND NULL THEN - col1 ELSE NULL END FROM tab2 GROUP BY col0

Cannot read property 'toString' of undefined
```

#### ☓ Ran 10012 tests as sqlite

* 769 failed
* 92% was OK

Time: 33337ms

---- ---- ---- ---- ---- ---- ----
### 481/622 [`./test/random/groupby/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT - col0 FROM tab1 AS cor0 WHERE NOT - 48 * - 90 IN ( + + 87 ) GROUP BY col0

Expected: ["-22","-28","-82"] but got ["NULL"]
```


```sql
SELECT ALL + col2 + - + ( - 41 ) - - - col1 col1, 7 FROM tab1 cor0 GROUP BY col2, col1

Expected: ["29","7","43","7","68","7"] but got ["7","29","7","43","7","68"]
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0 GROUP BY col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab2 GROUP BY col2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL - 75 + CAST ( - 81 AS INTEGER ) AS col2 FROM tab1 GROUP BY col1, col2 HAVING + col2 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL 20 + + 77 + - - CAST ( NULL AS INTEGER ), CAST ( NULL AS INTEGER ) * - 88 FROM tab1 GROUP BY col0 HAVING NOT NULL IS NOT NULL

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["97","0","97","0","97","0"]
```


```sql
SELECT ALL + col1 * - col0 * CASE WHEN NULL = + col2 THEN NULL ELSE col0 END + + col1 FROM tab0 AS cor0 GROUP BY col0, col1

Expected: ["-149688","0","0"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT + - col2 AS col1, col2 FROM tab0 WHERE NOT + - col1 IN ( - - 38, + 41, CAST ( + + col1 AS INTEGER ) ) GROUP BY col2, col2

Expected: ["-24","24"] but got ["NULL","NULL"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) FROM tab0 GROUP BY col1 HAVING + 79 IS NOT NULL

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT - 74 AS col1, col0 * + 6, - + 87 AS col1 FROM tab2 GROUP BY col1, col0 HAVING NOT NULL IS NOT NULL

6 results returned but expected 9
```


```sql
SELECT DISTINCT - - col1 - - col0 * + CAST ( NULL AS INTEGER ) * col0, CASE - 55 WHEN + 36 THEN NULL WHEN - + col0 THEN NULL WHEN - 29 THEN - + col1 WHEN + 19 THEN NULL ELSE NULL END AS col1 FROM tab0 AS cor0 WHERE ( NULL ) IS NULL GROUP BY col2, col1, col0

Expected: ["NULL","NULL"] but got ["0","NULL","81","NULL"]
```


```sql
SELECT ALL col2 + + col2 col0, col2 * col2 AS col2, 87 FROM tab2 GROUP BY col2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + ( - - col2 ) + col2 + - col2 * + - col2 + + + 61 * - CAST ( NULL AS INTEGER ) AS col0 FROM tab2 cor0 WHERE NOT - col0 + + ( + - 18 ) + + - CAST ( NULL AS REAL ) IS NOT NULL GROUP BY col2

Expected: ["NULL","NULL","NULL"] but got ["NULL"]
```


```sql
SELECT - col0 / - CAST ( NULL AS INTEGER ) + col0 - + 52 AS col0, 69 FROM tab2 AS cor0 GROUP BY col0, col1

Expected: ["NULL","69","NULL","69","NULL","69"] but got ["69","NULL","69","NULL","69","NULL"]
```


```sql
SELECT ALL col2 + col2 - - 43 * + - COUNT ( * ) / CASE + CAST ( NULL AS INTEGER ) WHEN - - COALESCE ( - + 59, col1 / col1 * + COUNT ( ALL + - 40 ) * - 52, - - CASE WHEN col1 NOT BETWEEN NULL AND NULL THEN NULL ELSE 33 + + col0 / 65 END * col2 ) * - col2 + col0 THEN - COUNT ( * ) WHEN col0 THEN NULL END FROM tab2 GROUP BY col0, col2 HAVING ( col0 ) BETWEEN ( CAST ( NULL AS INTEGER ) ) AND NULLIF (…

Cannot read property 'toString' of undefined
```


```sql
SELECT + ( NULLIF ( - cor0.col1, col1 ) ) FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col1

Expected: ["-81","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1317 failed
* 86% was OK

Time: 30970ms

---- ---- ---- ---- ---- ---- ----
### 482/622 [`./test/random/groupby/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT ALL + cor0.col2 - + cor0.col2 FROM tab0 AS cor0 GROUP BY cor0.col2

Expected: ["0","0","0"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT cor0.col0 + - ( - cor0.col0 ) FROM tab1 AS cor0 GROUP BY cor0.col1, col0

Expected: ["164","44","56"] but got ["NULL"]
```


```sql
SELECT ALL 97 * + 3 + - cor0.col1 AS col0 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["210","291"] but got ["NULL","NULL"]
```


```sql
SELECT ALL col2 / 60 FROM tab0 AS cor0 GROUP BY col0, cor0.col2

Expected: ["0","0","1"] but got ["0.400","0.633","1.317"]
```


```sql
SELECT DISTINCT NULLIF ( + cor0.col2 * cor0.col1, - cor0.col1 ) + - 31 * cor0.col2 + - col1 col2 FROM tab0 cor0 GROUP BY cor0.col1, cor0.col2

Expected: ["1119","NULL"] but got ["NULL"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) + - 3 FROM tab0 AS cor0 GROUP BY cor0.col2

Expected: ["NULL","NULL","NULL"] but got ["-3","-3","-3"]
```


```sql
SELECT NULLIF ( - cor0.col1, cor0.col1 ) FROM tab0 AS cor0 GROUP BY col1

Expected: ["-81","NULL"] but got ["NULL","NULL"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab2 cor0 GROUP BY cor0.col1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT + cor1.col1 AS col0 FROM tab0 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor1.col1, cor0.col2

Correct amount of values returned but hash was different than expected.
```

#### ☓ Ran 3182 tests as sqlite

* 1244 failed
* 60% was OK

Time: 6646ms

---- ---- ---- ---- ---- ---- ----
### 483/622 [`./test/random/groupby/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_2.test)

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

* 4160 failed
* 58% was OK

Time: 21599ms

---- ---- ---- ---- ---- ---- ----
### 484/622 [`./test/random/groupby/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_3.test)

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
SELECT tab1.col2 FROM tab0 AS cor0 CROSS JOIN tab1 GROUP BY tab1.col2 HAVING NOT tab1.col2 IS NULL

Query was expected to return results (but did not) 
```


```sql
SELECT cor1.col1 + - cor0.col1 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor0.col1, cor1.col1

Expected: ["-41","-59","-61","20","22","40"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4441 failed
* 55% was OK

Time: 20198ms

---- ---- ---- ---- ---- ---- ----
### 485/622 [`./test/random/groupby/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_4.test)

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


```sql
SELECT DISTINCT cor0.col2 / - cor0.col2 FROM tab0 AS cor0 GROUP BY col2

Expected: ["-1"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4336 failed
* 56% was OK

Time: 21293ms

---- ---- ---- ---- ---- ---- ----
### 486/622 [`./test/random/groupby/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_5.test)

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

* 4462 failed
* 55% was OK

Time: 20916ms

---- ---- ---- ---- ---- ---- ----
### 487/622 [`./test/random/groupby/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_6.test)

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

* 4573 failed
* 54% was OK

Time: 22754ms

---- ---- ---- ---- ---- ---- ----
### 488/622 [`./test/random/groupby/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_7.test)

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

* 4505 failed
* 55% was OK

Time: 21325ms

---- ---- ---- ---- ---- ---- ----
### 489/622 [`./test/random/groupby/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_8.test)

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
SELECT DISTINCT + col1 * + cor0.col1 AS col2 FROM tab2 AS cor0 GROUP BY cor0.col1

Expected: ["1681","3481","3721"] but got ["NULL"]
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

* 2955 failed
* 70% was OK

Time: 21429ms

---- ---- ---- ---- ---- ---- ----
### 490/622 [`./test/random/groupby/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT col1 AS col1 FROM tab1 GROUP BY col1 HAVING col1 IS NOT NULL

Query was expected to return results (but did not) 
```


```sql
SELECT col0, - col0 AS col0 FROM tab0 AS cor0 GROUP BY col0, col2

Expected: ["26","-26","43","-43","83","-83"] but got ["-26","-43","-83"]
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
SELECT ALL col2 AS col1, - AVG ( - col2 ) AS col1, - col2 AS col1 FROM tab0 AS cor0 GROUP BY col2

3 results returned but expected 9
```

#### ☓ Ran 10012 tests as sqlite

* 500 failed
* 95% was OK

Time: 20634ms

---- ---- ---- ---- ---- ---- ----
### 491/622 [`./test/random/select/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_0.test)

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
SELECT * FROM tab0 WHERE NOT ( - col2 * + col0 ) IN ( - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1507 failed
* 84% was OK

Time: 18751ms

---- ---- ---- ---- ---- ---- ----
### 492/622 [`./test/random/select/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_1.test)

_Mimic sqlite_

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


```sql
SELECT DISTINCT + col1 / ( + col2 ) FROM tab0 AS cor0

Expected: ["1","2","97"] but got ["1.110","2.606","97"]
```

#### ☓ Ran 10012 tests as sqlite

* 1252 failed
* 87% was OK

Time: 20427ms

---- ---- ---- ---- ---- ---- ----
### 493/622 [`./test/random/select/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 / + ( ( cor0.col2 ) ) AS col0 FROM tab0 AS cor0

Expected: ["0","1","35"] but got ["0.727","1.085","35"]
```


```sql
SELECT - col2 + + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-26","-27","-38"]
```


```sql
SELECT + 50 / + tab0.col2 AS col0 FROM tab0, tab2 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + col0 col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["3","64","80"]
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0, tab0 AS cor1, tab2 AS cor2

36 results returned but expected 972
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - col0 + - col2 FROM tab1 WHERE NOT col0 BETWEEN col1 AND - col2

Query was expected to return results (but did not) 
```


```sql
SELECT + col1 * CAST ( NULL AS INTEGER ) + col0 - - col2 AS col2 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["171","36","57"]
```

#### ☓ Ran 10011 tests as sqlite

* 1188 failed
* 88% was OK

Time: 20638ms

---- ---- ---- ---- ---- ---- ----
### 494/622 [`./test/random/select/slt_good_100.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_100.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab0, tab2 cor0, tab0 AS cor1, tab1, tab1 AS cor2

45 results returned but expected 3645
```


```sql
SELECT ALL + 69 FROM tab1 AS cor0 CROSS JOIN tab1, tab0 cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 cor1, tab2 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col2 / + 51 + + col0 FROM tab2 AS cor0

Expected: ["7","78","79"] but got ["7.529","78.510","79.745"]
```


```sql
SELECT col1 * + CAST ( NULL AS INTEGER ) + 30 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["30","30","30"]
```


```sql
SELECT DISTINCT - col0 * - CAST ( NULL AS INTEGER ) - - col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["86","91","97"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + + 63 AS col2 FROM tab2, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT + col1 * + col2 BETWEEN ( col0 * col2 ) AND col2

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1302 failed
* 86% was OK

Time: 22056ms

---- ---- ---- ---- ---- ---- ----
### 495/622 [`./test/random/select/slt_good_101.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_101.test)

_Mimic sqlite_

```sql
SELECT + ( col0 ) + - CAST ( NULL AS INTEGER ) col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["3","64","80"]
```


```sql
SELECT - col1 - col2 / + col0 AS col2 FROM tab2 AS cor0

Expected: ["-17","-34","-59"] but got ["-17.481","-34.857","-59.333"]
```


```sql
SELECT + cor3.col2 AS col0 FROM tab1 cor0 CROSS JOIN tab0, tab1 AS cor1, tab2 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL * FROM tab2, tab0, tab0 cor0, tab1 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + 93 + col0 * CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["93"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 WHERE NOT col2 BETWEEN ( cor0.col2 ) AND - col2 * col2 * + col1

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab1 cor0, tab1, tab2 cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1319 failed
* 86% was OK

Time: 21762ms

---- ---- ---- ---- ---- ---- ----
### 496/622 [`./test/random/select/slt_good_102.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_102.test)

_Mimic sqlite_

```sql
SELECT * FROM tab2 WHERE NOT + col1 IN ( - col2 * col2 * - col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT col0 + - ( col0 + tab2.col2 ) * + CAST ( NULL AS INTEGER ) * + col0 FROM tab2

Expected: ["NULL"] but got ["7","78","79"]
```


```sql
SELECT DISTINCT col2 / cor0.col0 + 11 col0 FROM tab0 AS cor0

Expected: ["11","12"] but got ["11.029","11.921","12.375"]
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab2, tab2 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) * 5 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT cor0.col1 * 71 / 92 AS col0 FROM tab1, tab1 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab0 AS cor1, tab0, tab2 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1321 failed
* 86% was OK

Time: 21831ms

---- ---- ---- ---- ---- ---- ----
### 497/622 [`./test/random/select/slt_good_103.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_103.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + + cor0.col1 + col0 / ( + col0 * ( - cor0.col0 ) ) FROM tab1 AS cor0

Expected: ["10","13","26"] but got ["12.988","25.667","9.984"]
```


```sql
SELECT ALL * FROM tab1, tab0 AS cor0, tab0 AS cor1, tab2, tab0 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - cor1.col1 FROM tab1 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL + 37 - - col1 * - CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["37","37","37"]
```


```sql
SELECT DISTINCT + col0 + + CAST ( NULL AS INTEGER ) * + 34 + + col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["14","156","158"]
```


```sql
SELECT DISTINCT * FROM tab1, tab2 cor0, tab1 AS cor1, tab0, tab1 AS cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT col2 IN ( col0 / - col2 + + col0 * col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1324 failed
* 86% was OK

Time: 25758ms

---- ---- ---- ---- ---- ---- ----
### 498/622 [`./test/random/select/slt_good_104.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_104.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col0 + + tab1.col2 + CAST ( NULL AS INTEGER ) * + 57 FROM tab1

Expected: ["NULL"] but got ["121","176","57"]
```


```sql
SELECT ALL + col0 / 37 + col2 * - col0 AS col2 FROM tab0 cor0

Expected: ["-35","-7296","-792"] but got ["-34.054","-7295.595","-791.351"]
```


```sql
SELECT cor0.col2 + - CAST ( NULL AS INTEGER ) * col0 AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["54","57","96"]
```


```sql
SELECT cor0.col2 * - 5 FROM tab1 cor0 CROSS JOIN tab0, tab0 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - cor0.col0 - - CAST ( NULL AS INTEGER ) AS col1 FROM tab0, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab0 WHERE NOT + col1 + + col1 IN ( tab0.col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0, tab0 AS cor1, tab2, tab0 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1320 failed
* 86% was OK

Time: 21172ms

---- ---- ---- ---- ---- ---- ----
### 499/622 [`./test/random/select/slt_good_105.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_105.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 / 73 FROM tab2

Expected: ["0","1"] but got ["0.096","1.068","1.082"]
```


```sql
SELECT - ( + 90 ) + cor1.col0 / 90 AS col0 FROM tab0, tab2 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 WHERE NOT ( col1 + col1 ) IN ( + tab2.col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) FROM tab0 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT col0 * + CAST ( NULL AS INTEGER ) * + tab2.col0 AS col2 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab2, tab2 AS cor1, tab1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab0 cor0, tab2 cor1, tab0 AS cor2

36 results returned but expected 972
```


```sql
SELECT DISTINCT + ( - 99 ) / - col2 FROM tab0 AS cor0

Expected: ["1","3","99"] but got ["1.207","3","99"]
```

#### ☓ Ran 10010 tests as sqlite

* 1316 failed
* 86% was OK

Time: 21336ms

---- ---- ---- ---- ---- ---- ----
### 500/622 [`./test/random/select/slt_good_106.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_106.test)

_Mimic sqlite_

```sql
SELECT ALL + - cor1.col2 / 14 AS col2 FROM tab2 AS cor0 CROSS JOIN tab1 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col1 + + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["86","91","97"]
```


```sql
SELECT cor0.col1 / col0 + col1 * - col1 FROM tab2 AS cor0

Expected: ["-289","-3481","-957"] but got ["-288.785","-3480.244","-956.571"]
```


```sql
SELECT ALL tab0.col2 * 10 + cor0.col1 FROM tab2, tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + col1 FROM tab2 WHERE NOT ( + col2 ) IN ( + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * col2 * col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab2 cor1, tab1, tab0 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1297 failed
* 87% was OK

Time: 21663ms

---- ---- ---- ---- ---- ---- ----
### 501/622 [`./test/random/select/slt_good_107.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_107.test)

_Mimic sqlite_

```sql
SELECT CAST ( NULL AS INTEGER ) - 91 AS col1 FROM tab0, tab2 AS cor0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT tab0.col1 * col2 + - CAST ( NULL AS INTEGER ) + col1 FROM tab0

Expected: ["NULL"] but got ["194","2924","7553"]
```


```sql
SELECT DISTINCT - ( col2 ) / col0 AS col2 FROM tab2

Expected: ["-3","0"] but got ["-0.333","-0.481","-3.857"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) - + 85 col0 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-85","-85","-85"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab2 AS cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab1 cor1, tab2, tab2 cor2

45 results returned but expected 3645
```


```sql
SELECT ALL - col2 AS col1 FROM tab1 WHERE NOT ( col0 + + col2 + col2 ) IN ( + col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1314 failed
* 86% was OK

Time: 22708ms

---- ---- ---- ---- ---- ---- ----
### 502/622 [`./test/random/select/slt_good_108.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_108.test)

_Mimic sqlite_

```sql
SELECT - - ( col2 ) / col1 AS col2 FROM tab1 AS cor0

Expected: ["2","5","7"] but got ["2.077","5.700","7.385"]
```


```sql
SELECT ALL col0 + + 3 * - col2 * - CAST ( NULL AS INTEGER ) + 97 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["121","132","186"]
```


```sql
SELECT cor0.col2 / - ( - 49 ) AS col1 FROM tab0, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + 2 * tab2.col0 + CAST ( NULL AS INTEGER ) / + col1 col0 FROM tab2

Expected: ["NULL"] but got ["14","156","158"]
```


```sql
SELECT + cor0.col1 FROM tab2 cor0 CROSS JOIN tab2, tab0 cor1, tab1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 cor1, tab1, t
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL * FROM tab0 WHERE NOT ( col2 ) IN ( + col0 + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab2 cor0, tab0 cor1, tab1, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10011 tests as sqlite

* 1274 failed
* 87% was OK

Time: 22989ms

---- ---- ---- ---- ---- ---- ----
### 503/622 [`./test/random/select/slt_good_109.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_109.test)

_Mimic sqlite_

```sql
SELECT * FROM tab1, tab2 AS cor0 CROSS JOIN tab0, tab2 cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 cor1, tab0 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * + ( - col2 ) AS col2 FROM tab1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - 76 / + cor0.col0 FROM tab2, tab0 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col1 / 59 - + col0 AS col2 FROM tab2 AS cor0

Expected: ["-7","-77","-79"] but got ["-6.475","-77","-78.712"]
```


```sql
SELECT ALL - - cor0.col2 + - CAST ( NULL AS INTEGER ) * - 31 col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["26","27","38"]
```


```sql
SELECT - col0 FROM tab1 WHERE NOT col0 + col1 / - col1 + + tab1.col2 IN ( col1 * + tab1.col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab0 cor0, tab1 AS cor1, tab1, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10011 tests as sqlite

* 1276 failed
* 87% was OK

Time: 24129ms

---- ---- ---- ---- ---- ---- ----
### 504/622 [`./test/random/select/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_11.test)

_Mimic sqlite_

```sql
SELECT ALL col1 / 77 - col0 col0 FROM tab0

Expected: ["-23","-34","-88"] but got ["-22.883","-33.740","-87.818"]
```


```sql
SELECT ALL - col1 + CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-86","-91","-97"]
```


```sql
SELECT DISTINCT cor0.col1 * CAST ( NULL AS INTEGER ) * + col2 + col1 / col0 AS col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0.215","0.756","4.429"]
```


```sql
SELECT + tab1.col0 / + cor0.col0 FROM tab1, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 29 FROM tab1 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL col0 FROM tab1 WHERE NOT - col1 + + col1 IN ( col0 + - col2 - + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab1 AS cor1, tab2 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1245 failed
* 87% was OK

Time: 20353ms

---- ---- ---- ---- ---- ---- ----
### 505/622 [`./test/random/select/slt_good_110.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_110.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * col2 FROM tab0 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT - ( col2 ) + - col2 / col1 AS col0 FROM tab2 AS cor0

Expected: ["-26","-27","-40"] but got ["-26.441","-27.871","-40.235"]
```


```sql
SELECT - - 58 + 34 FROM tab2 cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab2 cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL cor0.col0 + col2 * CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["24","35","89"]
```


```sql
SELECT ALL * FROM tab1 WHERE NOT col1 BETWEEN col2 AND ( NULL )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab1 cor0, tab0 cor1, tab2, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10009 tests as sqlite

* 1306 failed
* 86% was OK

Time: 21315ms

---- ---- ---- ---- ---- ---- ----
### 506/622 [`./test/random/select/slt_good_111.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_111.test)

_Mimic sqlite_

```sql
SELECT - col2 * - 70 + tab0.col1 / col0 + 50 * col1 AS col0 FROM tab0

Expected: ["10291","4922","6613"] but got ["10291.022","4922.771","6613.583"]
```


```sql
SELECT ALL * FROM tab0 WHERE NOT ( + col0 ) IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT + + col0 + - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["3","64","80"]
```


```sql
SELECT ALL + - cor1.col2 / - ( + cor1.col1 ) AS col0 FROM tab0 AS cor0 CROSS JOIN tab1 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) + + col2 - - col1 AS col2 FROM tab1

Expected: ["NULL"] but got ["109","67","80"]
```


```sql
SELECT ALL ( + 21 ) FROM tab0 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab0 cor1, tab0 cor2

36 results returned but expected 972
```

#### ☓ Ran 10011 tests as sqlite

* 1357 failed
* 86% was OK

Time: 23577ms

---- ---- ---- ---- ---- ---- ----
### 507/622 [`./test/random/select/slt_good_112.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_112.test)

_Mimic sqlite_

```sql
SELECT col1 / ( + 63 ) FROM tab1 AS cor0

Expected: ["0","0","0"] but got ["0.159","0.206","0.413"]
```


```sql
SELECT DISTINCT - cor0.col2 + CAST ( NULL AS INTEGER ) AS col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-26","-27","-38"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) + 2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["2","2","2"]
```


```sql
SELECT ALL + tab1.col1 / 79 AS col0 FROM tab1, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL cor0.col0 AS col0 FROM tab1 AS cor0 CROSS JOIN tab2, tab1 AS cor1, tab1, tab0 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab2 cor0, tab1 cor1, tab2 AS cor2

36 results returned but expected 972
```


```sql
SELECT ALL * FROM tab1 WHERE NOT - col0 IN ( tab1.col0 * + col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1315 failed
* 86% was OK

Time: 22209ms

---- ---- ---- ---- ---- ---- ----
### 508/622 [`./test/random/select/slt_good_113.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_113.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 97 + - col1 / - 75 AS col1 FROM tab2 AS cor0

Expected: ["97"] but got ["97.227","97.413","97.787"]
```


```sql
SELECT col0 * + CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + 76 FROM tab1, tab2 AS cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL 94 / - cor0.col0 FROM tab1, tab0 AS cor0, tab0 AS cor1, tab2 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * col2 + - col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-24","-35","-89"]
```


```sql
SELECT * FROM tab1 WHERE NOT + col2 - col2 BETWEEN col0 / col0 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab0, tab2 cor0, tab2 cor1

36 results returned but expected 972
```

#### ☓ Ran 10011 tests as sqlite

* 1226 failed
* 87% was OK

Time: 21187ms

---- ---- ---- ---- ---- ---- ----
### 509/622 [`./test/random/select/slt_good_114.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_114.test)

_Mimic sqlite_

```sql
SELECT - 40 * cor0.col2 - CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-2160","-2280","-3840"]
```


```sql
SELECT - 15 + col0 / 99 FROM tab1 AS cor0

Expected: ["-15","-15","-15"] but got ["-14.192","-14.354","-14.970"]
```


```sql
SELECT * FROM tab1, tab0 cor0, tab0 cor1, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) / + 42 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab1 WHERE NOT col0 IN ( + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + cor0.col2 + + cor1.col2 / tab2.col0 AS col2 FROM tab2, tab0 AS cor0, tab2 AS cor1

27 results returned but expected 9
```

#### ☓ Ran 10012 tests as sqlite

* 1264 failed
* 87% was OK

Time: 20933ms

---- ---- ---- ---- ---- ---- ----
### 510/622 [`./test/random/select/slt_good_115.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_115.test)

_Mimic sqlite_

```sql
SELECT ALL + + 32 / col1 AS col0 FROM tab0 AS cor0

Expected: ["0","0","0"] but got ["0.330","0.352","0.372"]
```


```sql
SELECT 82 + col1 * CAST ( NULL AS INTEGER ) * col1 col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["82","82","82"]
```


```sql
SELECT tab0.col1 / 28 AS col2 FROM tab0, tab1 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab0, tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT - - col1 * CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab1 AS cor1, tab0 cor2

36 results returned but expected 972
```


```sql
SELECT DISTINCT col2 AS col0 FROM tab0 WHERE NOT col0 / - col2 IN ( col0 + - col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1318 failed
* 86% was OK

Time: 19000ms

---- ---- ---- ---- ---- ---- ----
### 511/622 [`./test/random/select/slt_good_116.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_116.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + col1 / ( col2 * - col1 ) AS col1 FROM tab1 AS cor0

Expected: ["0"] but got ["0.010","0.018","0.019"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + - ( col1 ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-10","-13","-26"]
```


```sql
SELECT ALL + - cor1.col1 / cor0.col2 AS col1 FROM tab0 AS cor0 CROSS JOIN tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) + - cor0.col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-86","-91","-97"]
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab1, tab1 AS cor1 WHERE NOT NULL NOT BETWEEN NULL AND ( NULL )

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1 WHERE
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab1 WHERE NOT col1 * - col2 - col1 IN ( tab1.col0 * + col1 / + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0 CROSS JOIN tab0 cor1

27 results returned but expected 243
```


```sql
SELECT ALL + + col1 + col1 / - col2 FROM tab1 AS cor0

Expected: ["10","13","26"] but got ["12.865","25.519","9.825"]
```

#### ☓ Ran 10010 tests as sqlite

* 1333 failed
* 86% was OK

Time: 16874ms

---- ---- ---- ---- ---- ---- ----
### 512/622 [`./test/random/select/slt_good_117.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_117.test)

_Mimic sqlite_

```sql
SELECT ALL + col0 / + 21 AS col2 FROM tab2 AS cor0

Expected: ["0","3","3"] but got ["0.333","3.714","3.762"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) / + col1 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + col0 * col2 + CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL"] but got ["162","3648","7680"]
```


```sql
SELECT ALL - cor1.col1 - CAST ( NULL AS INTEGER ) AS col0 FROM tab2 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL cor1.col2 AS col0 FROM tab2 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL * FROM tab0 WHERE NOT ( + col2 * + col1 ) IN ( + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab2, tab1 cor0, tab1 cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1406 failed
* 85% was OK

Time: 16265ms

---- ---- ---- ---- ---- ---- ----
### 513/622 [`./test/random/select/slt_good_118.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_118.test)

_Mimic sqlite_

```sql
SELECT - col2 - + CAST ( - col1 AS INTEGER ) / + col2 AS col0 FROM tab0 AS cor0

Expected: ["-31","-81","96"] but got ["-30.394","-80.890","96"]
```


```sql
SELECT DISTINCT + cor1.col0 * + 68 AS col1 FROM tab0 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + 50 * + tab0.col2 + col2 * CAST ( NULL AS INTEGER ) / 19 AS col2 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["1650","4100","50"]
```


```sql
SELECT DISTINCT cor0.col0 * + cor0.col0 - - CAST ( NULL AS INTEGER ) * + 88 FROM tab0, tab0 AS cor0

Expected: ["NULL"] but got ["1225","576","7921"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / + 17 AS col0 FROM tab0, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT col1 * col1 * - col1 FROM tab0 WHERE NOT col0 IN ( col1 + - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab0 cor1, tab1, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1325 failed
* 86% was OK

Time: 17426ms

---- ---- ---- ---- ---- ---- ----
### 514/622 [`./test/random/select/slt_good_119.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_119.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col2 / + col0 FROM tab2 cor0

Expected: ["-3","0"] but got ["-0.333","-0.481","-3.857"]
```


```sql
SELECT + + col1 * - cor0.col1 + - CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-7396","-8281","-9409"]
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab0, tab2 AS cor1, tab0 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab0, tab0 AS cor0, tab1 AS cor1, tab1, tab0 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab0, tab0 AS cor0, tab0 cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab2 cor1, tab2, tab1 AS cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT - col2 FROM tab1 WHERE NOT col0 BETWEEN ( + col1 + col2 ) AND NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10010 tests as sqlite

* 1320 failed
* 86% was OK

Time: 17376ms

---- ---- ---- ---- ---- ---- ----
### 515/622 [`./test/random/select/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT - col1 / col2 AS col0 FROM tab0

Expected: ["-1","-2","-97"] but got ["-1.110","-2.606","-97"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab1 AS cor1, tab1, tab1 cor2

45 results returned but expected 3645
```


```sql
SELECT ALL * FROM tab0, tab0 AS cor0, tab1 AS cor1, tab1, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT cor0.col1 AS col0 FROM tab2 AS cor0 CROSS JOIN tab0, tab1 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + - CAST ( NULL AS INTEGER ) + - col2 AS col1 FROM tab1 AS cor0

Expected: ["NULL"] but got ["-54","-57","-96"]
```


```sql
SELECT * FROM tab0 WHERE NOT + col2 - tab0.col1 IN ( col0 * col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1160 failed
* 88% was OK

Time: 18156ms

---- ---- ---- ---- ---- ---- ----
### 516/622 [`./test/random/select/slt_good_120.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_120.test)

_Mimic sqlite_

```sql
SELECT ALL - + col2 - - col0 / col1 AS col2 FROM tab0 AS cor0

Expected: ["-1","-33","-82"] but got ["-0.639","-32.721","-81.022"]
```


```sql
SELECT ALL - 75 / tab2.col1 AS col2 FROM tab2, tab2 AS cor0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + col0 * - CAST ( NULL AS INTEGER ) / + tab1.col0 + col2 + 92 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["146","149","188"]
```


```sql
SELECT cor1.col2 AS col0 FROM tab0 cor0 CROSS JOIN tab0, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE col0 >= ( NULL ) OR NOT + col2 * col1 IN ( + col1 / - col1 - - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + col0 * + col2 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["35","7298","792"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab0 AS cor1, tab1, tab0 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1285 failed
* 87% was OK

Time: 16948ms

---- ---- ---- ---- ---- ---- ----
### 517/622 [`./test/random/select/slt_good_121.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_121.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - 59 / col2 AS col0 FROM tab1 AS cor0

Expected: ["-1","0"] but got ["-0.615","-1.035","-1.093"]
```


```sql
SELECT ALL - col0 + CAST ( NULL AS INTEGER ) * col2 AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-24","-35","-89"]
```


```sql
SELECT DISTINCT - col2 + - CAST ( NULL AS INTEGER ) AS col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-26","-27","-38"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - col0 * col1 * + tab2.col2 FROM tab2 WHERE NOT ( col2 ) IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT cor1.col2 AS col1 FROM tab2 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab0, tab1 cor0, tab0 AS cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1281 failed
* 87% was OK

Time: 2953885ms

---- ---- ---- ---- ---- ---- ----
### 518/622 [`./test/random/select/slt_good_122.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_122.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col1 / + col0 + col2 FROM tab1 AS cor0

Expected: ["57","62","96"] but got ["57.156","62.667","96.162"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab1, tab1 cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 cor1, tab2 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + - col2 * + CAST ( NULL AS INTEGER ) AS col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col0 FROM tab2, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["3","64","80"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab2 AS cor1, tab2, tab1 cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE NOT + col1 - - col0 * + col1 IN ( col1 * col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1329 failed
* 86% was OK

Time: 22067ms

---- ---- ---- ---- ---- ---- ----
### 519/622 [`./test/random/select/slt_good_123.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_123.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col2 / col1 col1 FROM tab0 AS cor0

Expected: ["0"] but got ["-0.010","-0.384","-0.901"]
```


```sql
SELECT ALL - col1 * tab2.col0 * CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ) * col0 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT - cor0.col1 / + 11 AS col2 FROM tab2, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 0 AS col2 FROM tab2 AS cor0 CROSS JOIN tab0, tab0 AS cor1, tab1 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT col0 / col1 BETWEEN + col0 * col0 AND + col0 - - col2

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab2 cor0, tab2 cor1, tab2, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1311 failed
* 86% was OK

Time: 17891ms

---- ---- ---- ---- ---- ---- ----
### 520/622 [`./test/random/select/slt_good_124.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_124.test)

_Mimic sqlite_

```sql
SELECT + 56 / col2 - - col0 FROM tab1 cor0

Expected: ["4","64","80"] but got ["4.037","64.982","80.583"]
```


```sql
SELECT DISTINCT ( + col2 ) * col0 + CAST ( NULL AS INTEGER ) * col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["35","7298","792"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + cor0.col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["10","13","26"]
```


```sql
SELECT ALL * FROM tab1, tab1 cor0, tab2, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + tab1.col1 AS col2 FROM tab1 WHERE NOT + col0 IN ( - col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0, tab0 cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 cor1, tab2 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab0 cor0, tab0, tab0 cor1

36 results returned but expected 972
```

#### ☓ Ran 2865 tests as sqlite

* 364 failed
* 87% was OK

Time: 5245ms

---- ---- ---- ---- ---- ---- ----
### 521/622 [`./test/random/select/slt_good_125.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_125.test)

_Mimic sqlite_
#### ✔ Ran 12 tests as sqlite

* 100% was OK

Time: 20ms

---- ---- ---- ---- ---- ---- ----
### 522/622 [`./test/random/select/slt_good_126.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_126.test)

_Mimic sqlite_
#### ✔ Ran 12 tests as sqlite

* 100% was OK

Time: 14ms

---- ---- ---- ---- ---- ---- ----
### 523/622 [`./test/random/select/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 1 / - cor0.col0 AS col0 FROM tab0, tab0 AS cor0

Expected: ["0"] but got ["-0.011","-0.029","-0.042"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + 49 col1 FROM tab0

Expected: ["NULL"] but got ["49"]
```


```sql
SELECT ALL col1 * - CAST ( NULL AS INTEGER ) AS col2 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT 12 * + 15 AS col1 FROM tab0 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab2 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab1, tab0 AS cor0, tab0 AS cor1, tab2, tab1 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1 cor0, tab2 AS cor1, tab0 cor2

36 results returned but expected 972
```


```sql
SELECT col1 / col0 FROM tab2 WHERE NOT - col2 BETWEEN ( col2 * + col1 ) AND NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1216 failed
* 87% was OK

Time: 3210779ms

---- ---- ---- ---- ---- ---- ----
### 524/622 [`./test/random/select/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_14.test)

_Mimic sqlite_

```sql
SELECT + - col1 / + col2 + + col0 FROM tab1 cor0

Expected: ["3","64","80"] but got ["2.519","63.825","79.865"]
```


```sql
SELECT * FROM tab0, tab2 AS cor0, tab0 AS cor1, tab2, tab1 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT 57 - + ( + col1 * - CAST ( NULL AS INTEGER ) ) col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["57","57","57"]
```


```sql
SELECT DISTINCT + col2 + + CAST ( NULL AS INTEGER ) / - col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["1","33","82"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab2, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab2 cor0, tab2, tab2 cor1

36 results returned but expected 972
```


```sql
SELECT + col2 + col1 + + col2 FROM tab2 AS cor0 WHERE NOT col2 IN ( col1 * - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1204 failed
* 87% was OK

Time: 17092ms

---- ---- ---- ---- ---- ---- ----
### 525/622 [`./test/random/select/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_15.test)

_Mimic sqlite_

```sql
SELECT * FROM tab0, tab1 AS cor0, tab2 cor1, tab2 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + 81 + col2 / 38 FROM tab1 AS cor0

Expected: ["82","82","83"] but got ["82.421","82.500","83.526"]
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab1, tab2 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + + cor0.col1 * - CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT * FROM tab2 WHERE NOT col1 IN ( + col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - - CAST ( NULL AS INTEGER ) + - col2 AS col0 FROM tab1 AS cor0

Expected: ["NULL"] but got ["-54","-57","-96"]
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab0 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1189 failed
* 88% was OK

Time: 16898ms

---- ---- ---- ---- ---- ---- ----
### 526/622 [`./test/random/select/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_16.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - cor0.col0 / col1 - + cor0.col1 FROM tab0 AS cor0

Expected: ["-86","-91","-97"] but got ["-86.279","-91.978","-97.361"]
```


```sql
SELECT ALL - cor0.col0 / 75 col1 FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - cor0.col0 AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-7","-78","-79"]
```


```sql
SELECT ALL + 94 / - tab0.col2 FROM tab0, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 CROSS JOIN tab1 AS cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab0, tab1 cor1

36 results returned but expected 972
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT + col1 IN ( + col2 + col1 + col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1203 failed
* 87% was OK

Time: 3208751ms

---- ---- ---- ---- ---- ---- ----
### 527/622 [`./test/random/select/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_17.test)

_Mimic sqlite_

```sql
SELECT - + CAST ( NULL AS INTEGER ) + 99 * col0 AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["2376","3465","8811"]
```


```sql
SELECT - + col0 + col2 / + col1 FROM tab2 AS cor0

Expected: ["-7","-77","-78"] but got ["-6.129","-76.765","-77.559"]
```


```sql
SELECT + 28 + - cor0.col1 / + 8 AS col0 FROM tab0, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab0 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + col0 - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL"] but got ["24","35","89"]
```


```sql
SELECT DISTINCT * FROM tab1, tab0, tab2 AS cor0, tab1 AS cor1

36 results returned but expected 972
```


```sql
SELECT col0 * + col0 FROM tab1 WHERE NOT col0 * + col1 + - col0 * - col2 NOT BETWEEN ( - col0 ) AND ( + col2 * + col2 + + col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1222 failed
* 87% was OK

Time: 15499ms

---- ---- ---- ---- ---- ---- ----
### 528/622 [`./test/random/select/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_18.test)

_Mimic sqlite_

```sql
SELECT * FROM tab1, tab2 AS cor0 CROSS JOIN tab2, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL + col2 * col1 / - 27 FROM tab2

Expected: ["-23","-31","-56"] but got ["-23.926","-31","-56.815"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * + col1 * - col0 AS col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL * FROM tab1, tab0 AS cor0, tab0 cor1, tab2 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - col0 * - CAST ( NULL AS INTEGER ) AS col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab0 WHERE NOT + col0 * col1 IN ( col0 + - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0, tab2 AS cor1, tab0 AS cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1210 failed
* 87% was OK

Time: 16490ms

---- ---- ---- ---- ---- ---- ----
### 529/622 [`./test/random/select/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_19.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0, tab0 AS cor1, tab1 cor2

36 results returned but expected 972
```


```sql
SELECT - col0 - col2 / + col0 AS col0 FROM tab0 AS cor0

Expected: ["-25","-35","-89"] but got ["-25.375","-35.029","-89.921"]
```


```sql
SELECT ALL * FROM tab2, tab0 cor0, tab1, tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - cor0.col1 + + col2 * + CAST ( NULL AS INTEGER ) AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT - cor0.col1 AS col1 FROM tab1, tab0 AS cor0 CROSS JOIN tab0, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + ( - col2 ) AS col1 FROM tab0

Expected: ["NULL"] but got ["-1","-33","-82"]
```


```sql
SELECT col2 AS col2 FROM tab1 WHERE col0 IN ( - col0 / tab1.col1 + + col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1205 failed
* 87% was OK

Time: 16621ms

---- ---- ---- ---- ---- ---- ----
### 530/622 [`./test/random/select/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_2.test)

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

* 1213 failed
* 87% was OK

Time: 3209312ms

---- ---- ---- ---- ---- ---- ----
### 531/622 [`./test/random/select/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_20.test)

_Mimic sqlite_

```sql
SELECT ALL - cor0.col1 / - 12 col2 FROM tab0, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1, tab0 AS cor0, tab0 cor1

36 results returned but expected 972
```


```sql
SELECT DISTINCT cor0.col1 / + col0 FROM tab2 AS cor0

Expected: ["0","4"] but got ["0.215","0.756","4.429"]
```


```sql
SELECT DISTINCT - - CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL col1 * + 84 - - ( tab1.col0 + CAST ( NULL AS INTEGER ) ) FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["1172","2187","904"]
```


```sql
SELECT ALL - tab1.col1 FROM tab0, tab1 AS cor0 CROSS JOIN tab1, tab1 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT col2 * col2 FROM tab0 AS cor0 WHERE NOT col1 * col2 * - cor0.col2 BETWEEN col2 AND NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1193 failed
* 88% was OK

Time: 16955ms

---- ---- ---- ---- ---- ---- ----
### 532/622 [`./test/random/select/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_21.test)

_Mimic sqlite_

```sql
SELECT + 94 / - col2 + col1 + 9 FROM tab0 AS cor0

Expected: ["12","93","99"] but got ["12","92.152","98.854"]
```


```sql
SELECT ALL - col1 * CAST ( NULL AS INTEGER ) AS col1 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT * FROM tab2, tab1 cor0, tab1 AS cor1, tab1, tab1 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab2 cor0 CROSS JOIN tab1, tab1 AS cor1, tab2 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT col2 FROM tab2 WHERE NOT - col0 BETWEEN col2 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab2 AS cor1, tab2, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1245 failed
* 87% was OK

Time: 15985ms

---- ---- ---- ---- ---- ---- ----
### 533/622 [`./test/random/select/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_22.test)

_Mimic sqlite_

```sql
SELECT ALL cor1.col2 AS col0 FROM tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col1 + - CAST ( NULL AS INTEGER ) * 41 FROM tab1

Expected: ["NULL"] but got ["10","13","26"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + - col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-86","-91","-97"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col2 FROM tab1, tab2 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - - col2 / + col1 + + cor0.col0 / 24 AS col0 FROM tab0 AS cor0

Expected: ["1","1","3"] but got ["1.384","1.469","4.609"]
```


```sql
SELECT ALL * FROM tab1 WHERE NOT col1 * col0 * col0 IN ( - col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab0 AS cor0, tab0, tab1 cor1

36 results returned but expected 972
```

#### ☓ Ran 10010 tests as sqlite

* 1235 failed
* 87% was OK

Time: 3207383ms

---- ---- ---- ---- ---- ---- ----
### 534/622 [`./test/random/select/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_23.test)

_Mimic sqlite_

```sql
SELECT col2 - - tab2.col0 / + tab2.col1 AS col1 FROM tab2

Expected: ["27","27","42"] but got ["27.226","27.322","42.647"]
```


```sql
SELECT ALL + - col0 * ( + cor0.col0 ) + + col2 * + CAST ( NULL AS INTEGER ) AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-49","-6084","-6241"]
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab0, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL * FROM tab2, tab1, tab0 AS cor0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT 20 + + col1 * CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["20"]
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab0, tab0 cor1

36 results returned but expected 972
```


```sql
SELECT * FROM tab1 AS cor0 WHERE NOT col0 + col2 IN ( + col0 - + cor0.col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1254 failed
* 87% was OK

Time: 17807ms

---- ---- ---- ---- ---- ---- ----
### 535/622 [`./test/random/select/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_24.test)

_Mimic sqlite_

```sql
SELECT col1 / - 43 + + col0 * tab2.col2 FROM tab2

Expected: ["189","2027","3002"] but got ["188.279","2026.628","3001.605"]
```


```sql
SELECT ALL - col1 + cor0.col0 * + CAST ( NULL AS INTEGER ) * 34 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ) * col1 + - col1 * + col0 AS col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-2064","-3395","-8099"]
```


```sql
SELECT DISTINCT - cor0.col2 FROM tab0 AS cor0 CROSS JOIN tab1, tab0 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab2 cor1, tab2, tab1 AS cor2

45 results returned but expected 3645
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab0, tab0 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT col1 FROM tab2 WHERE NOT - col1 BETWEEN col2 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT col2 / col1 col1 FROM tab1

Expected: ["2","5","7"] but got ["2.077","5.700","7.385"]
```

#### ☓ Ran 10011 tests as sqlite

* 1219 failed
* 87% was OK

Time: 17194ms

---- ---- ---- ---- ---- ---- ----
### 536/622 [`./test/random/select/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_25.test)

_Mimic sqlite_

```sql
SELECT + - 18 - - col2 * col2 * - CAST ( NULL AS INTEGER ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-18","-18","-18"]
```


```sql
SELECT - tab2.col0 AS col1 FROM tab2 WHERE NOT - col1 * col2 IN ( + col1 * col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT - col2 / + col1 AS col0 FROM tab2

Expected: ["-2","0","0"] but got ["-0.441","-0.871","-2.235"]
```


```sql
SELECT * FROM tab2, tab2 cor0, tab2 AS cor1, tab1, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + col0 * - CAST ( NULL AS INTEGER ) + - 92 AS col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-92"]
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab1 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab0, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1192 failed
* 88% was OK

Time: 3207213ms

---- ---- ---- ---- ---- ---- ----
### 537/622 [`./test/random/select/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_26.test)

_Mimic sqlite_

```sql
SELECT + CAST ( col0 AS INTEGER ) / - col2 + ( - col1 ) - + col1 AS col0 FROM tab1 AS cor0

Expected: ["-21","-26","-52"] but got ["-21.123","-26.833","-52.056"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) - 98 FROM tab1 cor0

Expected: ["NULL"] but got ["-98"]
```


```sql
SELECT - col2 * col1 - col1 * + col0 * - CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-1248","-1404","-570"]
```


```sql
SELECT * FROM tab0, tab0 AS cor0, tab0 cor1, tab1, tab1 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + cor1.col1 * - 97 AS col0 FROM tab2 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab0, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL tab0.col2 * - tab0.col0 FROM tab0 WHERE NOT - col2 - - col2 BETWEEN col0 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab1 cor0, tab1 AS cor1, tab1 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1229 failed
* 87% was OK

Time: 16753ms

---- ---- ---- ---- ---- ---- ----
### 538/622 [`./test/random/select/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_27.test)

_Mimic sqlite_

```sql
SELECT ALL - cor0.col1 / col0 + col0 FROM tab0 AS cor0

Expected: ["21","33","88"] but got ["20.417","32.229","87.978"]
```


```sql
SELECT ALL * FROM tab2, tab1 AS cor0, tab1 cor1, tab1, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - cor1.col0 * + 21 FROM tab2 cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + col1 * - col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-1248","-1404","-570"]
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0, tab1, tab1 cor1

36 results returned but expected 972
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT - col0 IN ( + tab0.col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * 45 AS col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1165 failed
* 88% was OK

Time: 16666ms

---- ---- ---- ---- ---- ---- ----
### 539/622 [`./test/random/select/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_28.test)

_Mimic sqlite_

```sql
SELECT + ( - cor0.col1 ) + 93 / - col1 FROM tab1 AS cor0

Expected: ["-19","-20","-29"] but got ["-19.300","-20.154","-29.577"]
```


```sql
SELECT ALL * FROM tab2, tab1, tab0 AS cor0, tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT ( - tab0.col0 + - CAST ( NULL AS INTEGER ) * ( col1 ) ) FROM tab0

Expected: ["NULL"] but got ["-24","-35","-89"]
```


```sql
SELECT - 54 FROM tab0 AS cor0 CROSS JOIN tab2, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + tab0.col2 + col1 * CAST ( NULL AS INTEGER ) / + col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["1","33","82"]
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab1 AS cor1, tab2 AS cor2

36 results returned but expected 972
```


```sql
SELECT * FROM tab1 cor0 WHERE NOT - col2 IN ( cor0.col2 / - cor0.col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1205 failed
* 87% was OK

Time: 17019ms

---- ---- ---- ---- ---- ---- ----
### 540/622 [`./test/random/select/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_29.test)

_Mimic sqlite_

```sql
SELECT col2 * - ( + col1 ) + col0 / - col1 - 86 AS col2 FROM tab0 AS cor0

Expected: ["-183","-2924","-7548"] but got ["-183.361","-2924.279","-7548.978"]
```


```sql
SELECT ( cor0.col1 + - cor2.col0 ) AS col0 FROM tab1 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT CAST ( - 33 AS INTEGER ) - col1 * + CAST ( NULL AS INTEGER ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-33","-33","-33"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) + + col0 * - col0 col0 FROM tab1 AS cor0

Expected: ["NULL"] but got ["-4096","-6400","-9"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1, tab2 cor0, tab2 AS cor1

36 results returned but expected 972
```


```sql
SELECT * FROM tab2, tab2 AS cor0, tab2 cor1, tab0, tab1 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + tab2.col0 * col2 AS col1 FROM tab2 WHERE NOT ( + col0 * - col1 ) IN ( tab2.col0 + col1 * col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT - col2 / + col1 AS col2 FROM tab1 AS cor0

Expected: ["-2","-5","-7"] but got ["-2.077","-5.700","-7.385"]
```

#### ☓ Ran 10012 tests as sqlite

* 1281 failed
* 87% was OK

Time: 3207446ms

---- ---- ---- ---- ---- ---- ----
### 541/622 [`./test/random/select/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_3.test)

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

* 1161 failed
* 88% was OK

Time: 16138ms

---- ---- ---- ---- ---- ---- ----
### 542/622 [`./test/random/select/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_30.test)

_Mimic sqlite_

```sql
SELECT CAST ( NULL AS INTEGER ) AS col1 FROM tab2, tab2 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - - col1 + - col2 / + col0 FROM tab0 AS cor0

Expected: ["85","91","97"] but got ["84.625","90.079","96.971"]
```


```sql
SELECT ( col0 ) + cor0.col1 * - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["7","78","79"]
```


```sql
SELECT ALL * FROM tab0, tab0 cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - col2 FROM tab2 WHERE NOT col0 IN ( - col2 / - col0 + + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + ( col0 ) + ( - col2 ) * - col2 FROM tab1

Expected: ["NULL"] but got ["2919","3313","9296"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab1 cor1, tab0 AS cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1324 failed
* 86% was OK

Time: 16643ms

---- ---- ---- ---- ---- ---- ----
### 543/622 [`./test/random/select/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_31.test)

_Mimic sqlite_

```sql
SELECT + col2 + + col2 / col1 AS col0 FROM tab2 AS cor0

Expected: ["26","27","40"] but got ["26.441","27.871","40.235"]
```


```sql
SELECT DISTINCT + + CAST ( NULL AS INTEGER ) * cor0.col2 col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * + col0 * - col0 + 48 AS col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["48","48","48"]
```


```sql
SELECT ALL - tab1.col0 / 51 AS col2 FROM tab1, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab2, tab0 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab1, tab1 cor0, tab1 AS cor1

36 results returned but expected 972
```


```sql
SELECT ALL * FROM tab1 AS cor0 WHERE NOT - col1 * - col1 IN ( col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1253 failed
* 87% was OK

Time: 3208113ms

---- ---- ---- ---- ---- ---- ----
### 544/622 [`./test/random/select/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_32.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col0 + + CAST ( 60 AS INTEGER ) / + col0 AS col0 FROM tab1

Expected: ["-64","-80","17"] but got ["-63.063","-79.250","17"]
```


```sql
SELECT ALL - + CAST ( NULL AS INTEGER ) * - col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) FROM tab2, tab2 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab2, tab0 AS cor0, tab2 cor1, tab2 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab0, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab0 AS cor1, tab0, tab0 cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT - col1 AS col1 FROM tab2 WHERE NOT ( col2 ) IN ( - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1259 failed
* 87% was OK

Time: 16897ms

---- ---- ---- ---- ---- ---- ----
### 545/622 [`./test/random/select/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_33.test)

_Mimic sqlite_

```sql
SELECT ALL + - cor0.col2 + - CAST ( NULL AS INTEGER ) * 58 AS col2 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["-1","-33","-82"]
```


```sql
SELECT col1 + - 77 / col0 AS col0 FROM tab1 AS cor0

Expected: ["1","13","9"] but got ["0.333","12.037","8.797"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * cor1.col0 FROM tab0, tab1 AS cor0, tab2 cor1, tab2 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT cor0.col2 AS col0 FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col1 * - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT col2 * col2 + col1 * col0 AS col1 FROM tab0 WHERE NOT ( - col0 ) IN ( col0 * tab0.col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab0 cor1, tab2, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1270 failed
* 87% was OK

Time: 16552ms

---- ---- ---- ---- ---- ---- ----
### 546/622 [`./test/random/select/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_34.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col1 + 14 / - col0 + - col1 FROM tab1 AS cor0

Expected: ["-4","0"] but got ["-0.175","-0.219","-4.667"]
```


```sql
SELECT col0 + - col1 * CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["7","78","79"]
```


```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab2, tab2 AS cor1, tab2 AS cor2, tab1 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab2, tab0, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * col0 - + cor0.col1 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT DISTINCT * FROM tab1, tab0 AS cor0, tab2 cor1, tab2, tab2 AS cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT + col1 AS col0 FROM tab0 WHERE NOT ( col0 ) IN ( + col2 + col2 * col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1271 failed
* 87% was OK

Time: 3209361ms

---- ---- ---- ---- ---- ---- ----
### 547/622 [`./test/random/select/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_35.test)

_Mimic sqlite_

```sql
SELECT ALL ( 17 ) / col0 FROM tab2

Expected: ["0","0","2"] but got ["0.215","0.218","2.429"]
```


```sql
SELECT + col1 + - ( - col0 ) * + CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["86","91","97"]
```


```sql
SELECT * FROM tab2, tab2 AS cor0, tab2 cor1, tab0, tab1 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + col2 + + col1 * + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["26","27","38"]
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT col1 + - col2 * - col2 IN ( col1 + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab0, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab1, tab2 cor0, tab0 AS cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1236 failed
* 87% was OK

Time: 16507ms

---- ---- ---- ---- ---- ---- ----
### 548/622 [`./test/random/select/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_36.test)

_Mimic sqlite_

```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab2, tab1 cor1, tab0, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 cor1, tab0, t
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - col2 / col0 AS col1 FROM tab0

Expected: ["-1","0","0"] but got ["-0.029","-0.921","-1.375"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) col0 FROM tab0, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) * - col1 + col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["26","27","38"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) AS col0 FROM tab2, tab2 AS cor0 CROSS JOIN tab1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab1, tab0 AS cor0, tab1 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT ( col1 + + col2 ) BETWEEN - cor0.col2 AND ( NULL ) OR NOT + col0 IN ( col1 + col2 - col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1308 failed
* 86% was OK

Time: 16916ms

---- ---- ---- ---- ---- ---- ----
### 549/622 [`./test/random/select/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_37.test)

_Mimic sqlite_

```sql
SELECT DISTINCT ( col2 ) + + cor0.col2 / + cor0.col0 FROM tab0 AS cor0

Expected: ["1","34","82"] but got ["1.029","34.375","82.921"]
```


```sql
SELECT DISTINCT * FROM tab2, tab1 cor0, tab1, tab1 AS cor1

36 results returned but expected 972
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + col1 AS col1 FROM tab2 cor0

Expected: ["NULL"] but got ["17","31","59"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * col2 + col1 * col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["2064","3395","8099"]
```


```sql
SELECT + cor0.col1 * tab0.col1 FROM tab2, tab0 AS cor0 CROSS JOIN tab0, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab0, tab0 cor0, tab2 cor1, tab2 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 WHERE NOT - col1 IN ( col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1196 failed
* 88% was OK

Time: 17034ms

---- ---- ---- ---- ---- ---- ----
### 550/622 [`./test/random/select/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_38.test)

_Mimic sqlite_

```sql
SELECT col0 / - col2 + col2 AS col2 FROM tab0

Expected: ["-34","33","81"] but got ["-34","32.273","80.915"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + + 52 AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["52","52","52"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) - + col1 AS col0 FROM tab2 cor0

Expected: ["NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT ALL * FROM tab1, tab2 AS cor0 CROSS JOIN tab0, tab1 cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 cor1, tab0 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab1 AS cor0 WHERE NOT ( - col2 + col1 + - col1 ) IN ( col2 ) OR - col1 * col0 <= NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col1 FROM tab0, tab2 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0, tab1 AS cor1, tab0, tab2 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1233 failed
* 87% was OK

Time: 2919298ms

---- ---- ---- ---- ---- ---- ----
### 551/622 [`./test/random/select/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_39.test)

_Mimic sqlite_

```sql
SELECT + + col1 * CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - col0 + CAST ( col0 AS INTEGER ) / col2 FROM tab0 AS cor0

Expected: ["-24","-88","0"] but got ["-23.273","-87.915","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) col0 FROM tab2, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - 24 * + cor0.col1 * 41 FROM tab0 AS cor0 CROSS JOIN tab1, tab2 AS cor1, tab2 AS cor2, tab2 cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) / - tab0.col1 FROM tab0, tab2, tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab1 AS cor1, tab1, tab2 cor2

45 results returned but expected 3645
```


```sql
SELECT * FROM tab1 WHERE NOT - col0 * + col1 IN ( col0 / col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10010 tests as sqlite

* 1225 failed
* 87% was OK

Time: 19955ms

---- ---- ---- ---- ---- ---- ----
### 552/622 [`./test/random/select/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_4.test)

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
SELECT + col2 / - col0 + col2 + + col2 AS col2 FROM tab0 AS cor0

Expected: ["164","2","65"] but got ["1.971","163.079","64.625"]
```

#### ☓ Ran 10011 tests as sqlite

* 1222 failed
* 87% was OK

Time: 17080ms

---- ---- ---- ---- ---- ---- ----
### 553/622 [`./test/random/select/slt_good_40.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_40.test)

_Mimic sqlite_

```sql
SELECT - col2 / 47 + col0 * - col2 * + col2 FROM tab0 AS cor0

Expected: ["-26136","-35","-598437"] but got ["-26136.702","-35.021","-598437.745"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / - col1 AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT - col0 + + CAST ( NULL AS INTEGER ) + col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-34","-7","9"]
```


```sql
SELECT ALL - cor1.col1 / - ( + cor1.col2 ) AS col1 FROM tab2, tab2 AS cor0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT cor0.col1 AS col0 FROM tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab2, tab2 AS cor0, tab1 cor1

36 results returned but expected 972
```


```sql
SELECT + col0 AS col2 FROM tab2 WHERE NOT ( col1 ) BETWEEN NULL AND - col0 + - col0

Query was expected to return results (but did not) 
```

#### ☓ Ran 10010 tests as sqlite

* 1229 failed
* 87% was OK

Time: 17881ms

---- ---- ---- ---- ---- ---- ----
### 554/622 [`./test/random/select/slt_good_41.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_41.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 83 / - col1 FROM tab1

Expected: ["-3","-6","-8"] but got ["-3.192","-6.385","-8.300"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) + cor0.col1 AS col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["17","31","59"]
```


```sql
SELECT * FROM tab0, tab0 cor0, tab2, tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0 CROSS JOIN tab0, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - col2 * CAST ( NULL AS INTEGER ) + - col2 + + col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-28","-47","-83"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab0 AS cor1, tab1, tab0 AS cor2

45 results returned but expected 3645
```


```sql
SELECT * FROM tab1 WHERE NOT col2 * + col0 IN ( col1 + col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10010 tests as sqlite

* 1219 failed
* 87% was OK

Time: 17750ms

---- ---- ---- ---- ---- ---- ----
### 555/622 [`./test/random/select/slt_good_42.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_42.test)

_Mimic sqlite_

```sql
SELECT + col2 / 50 AS col0 FROM tab2 AS cor0

Expected: ["0","0","0"] but got ["0.520","0.540","0.760"]
```


```sql
SELECT DISTINCT - col2 + - CAST ( - col2 + col1 * + CAST ( NULL AS INTEGER ) AS REAL ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + - CAST ( NULL AS INTEGER ) * 86 + col1 * + 90 AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["7740","8190","8730"]
```


```sql
SELECT * FROM tab0, tab2 AS cor0 CROSS JOIN tab2, tab1, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab2, tab1 AS cor0, tab1 AS cor1

36 results returned but expected 972
```


```sql
SELECT * FROM tab2 WHERE NOT - col2 IN ( col0 * + col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1286 failed
* 87% was OK

Time: 17258ms

---- ---- ---- ---- ---- ---- ----
### 556/622 [`./test/random/select/slt_good_43.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_43.test)

_Mimic sqlite_

```sql
SELECT ALL col2 * 24 / col0 + col1 * - 3 AS col2 FROM tab0

Expected: ["-225","-251","-291"] but got ["-225","-250.888","-290.314"]
```


```sql
SELECT - + 21 + - col2 * - col2 * - col1 + cor0.col2 * - CAST ( NULL AS INTEGER ) * col2 col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-118","-611905","-93675"]
```


```sql
SELECT DISTINCT col2 + + CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL"] but got ["26","27","38"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab1, tab0 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col0 FROM tab1, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + tab0.col0 * + col1 + col0 * + tab0.col0 * - col1 FROM tab0 WHERE NOT col2 + tab0.col0 IN ( col1 / col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab1 cor0, tab2 AS cor1, tab1, tab2 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1205 failed
* 87% was OK

Time: 16834ms

---- ---- ---- ---- ---- ---- ----
### 557/622 [`./test/random/select/slt_good_44.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_44.test)

_Mimic sqlite_

```sql
SELECT ALL + + col2 / + col0 AS col2 FROM tab0 AS cor0

Expected: ["0","0","1"] but got ["0.029","0.921","1.375"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * col1 + - col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-54","-57","-96"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) AS col0 FROM tab2, tab0 AS cor0 CROSS JOIN tab1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab1, tab0 cor0, tab0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab2, tab1 AS cor1, tab0, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab0 cor1, tab2, tab0 cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT col0 * - col0 IN ( col1 * + col1 * + col0 + - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1242 failed
* 87% was OK

Time: 17577ms

---- ---- ---- ---- ---- ---- ----
### 558/622 [`./test/random/select/slt_good_45.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_45.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab2, tab1, tab0 AS cor0, tab1 cor1

36 results returned but expected 972
```


```sql
SELECT - cor0.col2 / cor0.col1 AS col2 FROM tab1 AS cor0

Expected: ["-2","-5","-7"] but got ["-2.077","-5.700","-7.385"]
```


```sql
SELECT ALL + + col2 * col2 * - CAST ( NULL AS INTEGER ) + col2 + col0 * - col1 col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-24","-583","-944"]
```


```sql
SELECT ALL * FROM tab1, tab0 cor0, tab0 AS cor1, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + cor0.col0 * col1 col2 FROM tab0 cor0

Expected: ["NULL"] but got ["2064","3395","8099"]
```


```sql
SELECT * FROM tab0, tab1 AS cor0 CROSS JOIN tab1, tab2 cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 cor1, tab1 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab2 WHERE NOT ( + col1 + + col0 * col0 ) IN ( + col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1243 failed
* 87% was OK

Time: 17230ms

---- ---- ---- ---- ---- ---- ----
### 559/622 [`./test/random/select/slt_good_46.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_46.test)

_Mimic sqlite_

```sql
SELECT + cor0.col1 * + col0 + - col1 / + col0 + 99 FROM tab0 AS cor0

Expected: ["2160","3492","8197"] but got ["2159.417","3491.229","8196.978"]
```


```sql
SELECT + col2 + - col1 * + CAST ( NULL AS INTEGER ) / 71 AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["26","27","38"]
```


```sql
SELECT - 52 / cor0.col1 FROM tab1, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + cor0.col0 + + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["3","64","80"]
```


```sql
SELECT * FROM tab1 WHERE NOT col0 IN ( col1 * col1 * tab1.col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab0 cor0, tab1 AS cor1, tab0, tab1 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1263 failed
* 87% was OK

Time: 17185ms

---- ---- ---- ---- ---- ---- ----
### 560/622 [`./test/random/select/slt_good_47.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_47.test)

_Mimic sqlite_

```sql
SELECT ALL + col2 / - 16 FROM tab0 AS cor0

Expected: ["-2","-5","0"] but got ["-0.063","-2.063","-5.125"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 WHERE NOT - col0 IN ( cor0.col2 ) OR - col2 IN ( - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab2 cor1, tab1 AS cor2

36 results returned but expected 972
```


```sql
SELECT 37 / 34 AS col1 FROM tab0, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * col2 AS col1 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - 12 AS col0 FROM tab1 AS cor0 CROSS JOIN tab0, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col2 * CAST ( NULL AS INTEGER ) + 69 FROM tab0

Expected: ["NULL"] but got ["69"]
```

#### ☓ Ran 10011 tests as sqlite

* 1249 failed
* 87% was OK

Time: 17448ms

---- ---- ---- ---- ---- ---- ----
### 561/622 [`./test/random/select/slt_good_48.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_48.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 81 / - col1 FROM tab0

Expected: ["0"] but got ["-0.835","-0.890","-0.942"]
```


```sql
SELECT * FROM tab0 AS cor0 WHERE NOT col1 BETWEEN col1 * col0 * + col1 + + col1 * + col0 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) AS col2 FROM tab2, tab1 AS cor0, tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT + cor0.col1 + + CAST ( NULL AS INTEGER ) * - ( - col0 ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["86","91","97"]
```


```sql
SELECT DISTINCT col2 * - CAST ( NULL AS INTEGER ) * + col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0 CROSS JOIN tab1, tab0, tab2 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0, tab2 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab0 cor1, tab2, tab2 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1258 failed
* 87% was OK

Time: 17547ms

---- ---- ---- ---- ---- ---- ----
### 562/622 [`./test/random/select/slt_good_49.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_49.test)

_Mimic sqlite_

```sql
SELECT ALL - 81 / col0 AS col0 FROM tab1

Expected: ["-1","-1","-27"] but got ["-1.012","-1.266","-27"]
```


```sql
SELECT ALL + + CAST ( NULL AS INTEGER ) + - ( cor0.col1 ) * - ( cor0.col0 ) FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["1040","640","78"]
```


```sql
SELECT DISTINCT + - col2 * - CAST ( NULL AS INTEGER ) - cor0.col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["-54","-57","-96"]
```


```sql
SELECT ALL * FROM tab1 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab1 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL 9 / cor0.col1 FROM tab2, tab1 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1, tab0 cor0, tab2 AS cor1, tab0 AS cor2

36 results returned but expected 972
```


```sql
SELECT DISTINCT col0 AS col1 FROM tab1 WHERE NOT ( - col2 ) IN ( col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1236 failed
* 87% was OK

Time: 18055ms

---- ---- ---- ---- ---- ---- ----
### 563/622 [`./test/random/select/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_5.test)

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

* 1232 failed
* 87% was OK

Time: 18396ms

---- ---- ---- ---- ---- ---- ----
### 564/622 [`./test/random/select/slt_good_50.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_50.test)

_Mimic sqlite_

```sql
SELECT ALL 57 / + col0 AS col0 FROM tab2 AS cor0

Expected: ["0","0","8"] but got ["0.722","0.731","8.143"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) - 0 AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab0, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + col0 * col2 + CAST ( NULL AS INTEGER ) * col0 - - col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["2054","216","3040"]
```


```sql
SELECT * FROM tab2, tab2 AS cor0, tab2 cor1, tab1 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL tab2.col0 * tab2.col2 AS col0 FROM tab2 WHERE NOT col0 BETWEEN col0 * col1 + col0 AND col1

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab2 AS cor1, tab2, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1300 failed
* 87% was OK

Time: 17481ms

---- ---- ---- ---- ---- ---- ----
### 565/622 [`./test/random/select/slt_good_51.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_51.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col0 + + cor0.col0 / + ( col1 ) AS col1 FROM tab0 cor0

Expected: ["-24","-35","-89"] but got ["-23.721","-34.639","-88.022"]
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) col1 FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL * FROM tab2, tab1 AS cor0, tab0 cor1, tab0, tab0 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - col0 + CAST ( NULL AS INTEGER ) * col1 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["-3","-64","-80"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2, tab2 cor1, tab0, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 cor1, tab0, t
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab0 cor0 CROSS JOIN tab0 AS cor1

27 results returned but expected 243
```


```sql
SELECT DISTINCT - col1 * + col1 * + col2 + + col2 * col1 * + col2 FROM tab0 WHERE NOT + col0 IN ( col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1232 failed
* 87% was OK

Time: 17519ms

---- ---- ---- ---- ---- ---- ----
### 566/622 [`./test/random/select/slt_good_52.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_52.test)

_Mimic sqlite_

```sql
SELECT ALL - + cor0.col0 / 95 AS col1 FROM tab1 AS cor0

Expected: ["0","0","0"] but got ["-0.032","-0.674","-0.842"]
```


```sql
SELECT ALL - - 23 + + col1 * - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["23","23","23"]
```


```sql
SELECT 14 col2 FROM tab1 cor0 CROSS JOIN tab2, tab0 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) / - 81 AS col2 FROM tab1, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - tab2.col1 - CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT DISTINCT col2 FROM tab0 WHERE NOT ( - col0 ) IN ( col2 / col1 + col2 / col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab2 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10010 tests as sqlite

* 1288 failed
* 87% was OK

Time: 16809ms

---- ---- ---- ---- ---- ---- ----
### 567/622 [`./test/random/select/slt_good_53.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_53.test)

_Mimic sqlite_

```sql
SELECT col2 + col0 + - col0 / col2 FROM tab1

Expected: ["120","176","57"] but got ["119.877","175.167","56.944"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1 cor0, tab1 AS cor1, tab0 cor2

36 results returned but expected 972
```


```sql
SELECT + - cor0.col0 * col1 * - col1 + - CAST ( NULL AS INTEGER ) FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["13520","2028","6400"]
```


```sql
SELECT DISTINCT + col1 / - col1 + CAST ( NULL AS INTEGER ) + - ( col0 ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["-4","-65","-81"]
```


```sql
SELECT ALL cor0.col1 AS col0 FROM tab0 AS cor0 CROSS JOIN tab2, tab1 AS cor1, tab2 AS cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT 81 / + 97 col2 FROM tab0, tab2 AS cor0, tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 WHERE NOT col2 IN ( + tab1.col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1258 failed
* 87% was OK

Time: 15955ms

---- ---- ---- ---- ---- ---- ----
### 568/622 [`./test/random/select/slt_good_54.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_54.test)

_Mimic sqlite_

```sql
SELECT col0 + col0 / + 58 FROM tab1

Expected: ["3","65","81"] but got ["3.052","65.103","81.379"]
```


```sql
SELECT - 75 / 67 AS col2 FROM tab2 AS cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL CAST ( + 43 AS INTEGER ) / + col1 + + CAST ( NULL AS INTEGER ) / col2 AS col1 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["0.443","0.473","0.500"]
```


```sql
SELECT DISTINCT - + col1 + - CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT + cor1.col2 FROM tab1 AS cor0 CROSS JOIN tab2, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL col2 FROM tab1 WHERE NOT col1 IN ( + col0 * + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab1, tab2 AS cor0, tab0 cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1332 failed
* 86% was OK

Time: 16150ms

---- ---- ---- ---- ---- ---- ----
### 569/622 [`./test/random/select/slt_good_55.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_55.test)

_Mimic sqlite_

```sql
SELECT - col1 + col1 + col0 * CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - cor0.col0 / 6 AS col2 FROM tab1, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - col0 * - col0 - col0 / - col1 AS col0 FROM tab0 AS cor0

Expected: ["1225","576","7921"] but got ["1225.361","576.279","7921.978"]
```


```sql
SELECT DISTINCT col1 * - col1 + + CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["-289","-3481","-961"]
```


```sql
SELECT ALL cor2.col2 AS col2 FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab2 AS cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0, tab1 AS cor1, tab2 cor2

36 results returned but expected 972
```


```sql
SELECT * FROM tab0 WHERE NOT - col0 IN ( + col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10009 tests as sqlite

* 1281 failed
* 87% was OK

Time: 15739ms

---- ---- ---- ---- ---- ---- ----
### 570/622 [`./test/random/select/slt_good_56.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_56.test)

_Mimic sqlite_

```sql
SELECT - col0 / col2 AS col0 FROM tab1

Expected: ["-1","0","0"] but got ["-0.056","-0.833","-1.123"]
```


```sql
SELECT DISTINCT - CAST ( - col0 AS INTEGER ) * + cor0.col1 + - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["1343","217","4602"]
```


```sql
SELECT ALL + tab0.col0 * CAST ( NULL AS INTEGER ) col1 FROM tab0, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - tab2.col0 * CAST ( NULL AS INTEGER ) FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL * FROM tab2 AS cor0 WHERE NOT col0 * col1 IN ( + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT cor1.col1 FROM tab0 AS cor0 CROSS JOIN tab1, tab2 cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab2 AS cor1, tab2, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1203 failed
* 87% was OK

Time: 15851ms

---- ---- ---- ---- ---- ---- ----
### 571/622 [`./test/random/select/slt_good_57.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_57.test)

_Mimic sqlite_

```sql
SELECT + col1 / col0 FROM tab0 cor0

Expected: ["1","2","3"] but got ["1.022","2.771","3.583"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) / + 63 + col0 * col1 + col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["2150","3492","8190"]
```


```sql
SELECT + + col2 + 98 * + cor0.col1 + CAST ( NULL AS INTEGER ) * cor0.col2 * + col2 AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["8461","9000","9507"]
```


```sql
SELECT ALL * FROM tab0, tab1 cor0 CROSS JOIN tab2, tab1 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab2, tab0, tab0 AS cor0, tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab1 WHERE NOT col0 * - col2 IN ( col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab0 cor1, tab2 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1306 failed
* 86% was OK

Time: 15620ms

---- ---- ---- ---- ---- ---- ----
### 572/622 [`./test/random/select/slt_good_58.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_58.test)

_Mimic sqlite_

```sql
SELECT CAST ( NULL AS INTEGER ) - col2 * col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-1","-1089","-6724"]
```


```sql
SELECT DISTINCT ( col2 ) / + col0 + ( - ( + col1 ) ) AS col0 FROM tab2 AS cor0

Expected: ["-17","-28","-59"] but got ["-16.519","-27.143","-58.667"]
```


```sql
SELECT ALL 21 / + cor1.col0 AS col0 FROM tab1, tab1 AS cor0, tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab0 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * cor0.col2 col0 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab1 WHERE NOT col1 * - col0 + col1 BETWEEN col1 AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0, tab2 AS cor1, tab1, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1281 failed
* 87% was OK

Time: 15573ms

---- ---- ---- ---- ---- ---- ----
### 573/622 [`./test/random/select/slt_good_59.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_59.test)

_Mimic sqlite_

```sql
SELECT ALL col2 / + tab0.col1 - + col1 / col0 AS col2 FROM tab0

Expected: ["-1","-2","-3"] but got ["-0.121","-2.761","-3.200"]
```


```sql
SELECT DISTINCT * FROM tab1, tab2 cor0, tab1 cor1, tab2, tab2 AS cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT - ( - col0 ) * col0 + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0

Expected: ["NULL"] but got ["4096","6400","9"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) - + cor0.col0 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-3","-64","-80"]
```


```sql
SELECT ALL 9 AS col2 FROM tab2 cor0 CROSS JOIN tab1, tab0 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT CAST ( NULL AS INTEGER ) / cor1.col1 FROM tab2 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab1 WHERE NOT ( - col2 ) IN ( + col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1296 failed
* 87% was OK

Time: 15613ms

---- ---- ---- ---- ---- ---- ----
### 574/622 [`./test/random/select/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_6.test)

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

* 1228 failed
* 87% was OK

Time: 15075ms

---- ---- ---- ---- ---- ---- ----
### 575/622 [`./test/random/select/slt_good_60.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_60.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col0 / col2 AS col0 FROM tab1 AS cor0

Expected: ["0","1"] but got ["0.056","0.833","1.123"]
```


```sql
SELECT col1 + + col0 * - col2 + col0 * ( - col2 + CAST ( NULL AS INTEGER ) ) / col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["-190","-3695","-7763"]
```


```sql
SELECT + cor0.col2 / cor0.col1 FROM tab0, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT ( ( - col2 ) ) * CAST ( NULL AS INTEGER ) + 29 * + tab0.col2 * col1 FROM tab0

Expected: ["NULL"] but got ["216398","2813","82302"]
```


```sql
SELECT ALL col2 FROM tab2 WHERE NOT - col2 IN ( col1 + tab2.col1 * col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - cor0.col2 FROM tab1 cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab0 cor0, tab2 AS cor1, tab1, tab2 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10011 tests as sqlite

* 1287 failed
* 87% was OK

Time: 15709ms

---- ---- ---- ---- ---- ---- ----
### 576/622 [`./test/random/select/slt_good_61.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_61.test)

_Mimic sqlite_

```sql
SELECT + CAST ( NULL AS INTEGER ) * + 69 AS col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + col1 + CAST ( - 56 AS INTEGER ) / + col1 AS col0 FROM tab1 AS cor0

Expected: ["24","5","9"] but got ["23.846","4.400","8.692"]
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) AS col0 FROM tab0 cor0 CROSS JOIN tab1 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) FROM tab1, tab0 AS cor0, tab2 AS cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT + col0 AS col0 FROM tab2 WHERE NOT col0 IN ( col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1 cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab2 AS cor1, tab2 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1281 failed
* 87% was OK

Time: 15149ms

---- ---- ---- ---- ---- ---- ----
### 577/622 [`./test/random/select/slt_good_62.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_62.test)

_Mimic sqlite_

```sql
SELECT - col1 / - col0 AS col2 FROM tab0

Expected: ["1","2","3"] but got ["1.022","2.771","3.583"]
```


```sql
SELECT ALL + + col1 + + CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["86","91","97"]
```


```sql
SELECT + cor0.col2 / + 85 AS col0 FROM tab2, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + + col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["24","35","89"]
```


```sql
SELECT * FROM tab1 WHERE NOT + col1 + col2 * col0 IN ( - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab0, tab2 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab0 AS cor1, tab1 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1234 failed
* 87% was OK

Time: 15534ms

---- ---- ---- ---- ---- ---- ----
### 578/622 [`./test/random/select/slt_good_63.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_63.test)

_Mimic sqlite_

```sql
SELECT - col0 + col2 + + col2 / - 2 FROM tab1 cor0

Expected: ["-32","-35","24"] but got ["-32","-35.500","24"]
```


```sql
SELECT ALL - cor1.col0 col2 FROM tab0 cor0 CROSS JOIN tab2, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * + 63 AS col1 FROM tab2, tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - cor0.col2 * CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT ALL + + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab2 WHERE NOT + col2 + col2 + col1 IN ( - tab2.col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab2 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1301 failed
* 87% was OK

Time: 15499ms

---- ---- ---- ---- ---- ---- ----
### 579/622 [`./test/random/select/slt_good_64.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_64.test)

_Mimic sqlite_

```sql
SELECT cor0.col1 / + 34 + 84 / + cor0.col0 FROM tab0 AS cor0

Expected: ["2","4","5"] but got ["3.620","5.253","6.029"]
```


```sql
SELECT ALL - cor1.col1 AS col0 FROM tab1, tab2 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * - col0 + col0 + - col2 AS col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["-20","41","52"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * - col1 * - tab2.col2 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT cor0.col0 * + CAST ( NULL AS INTEGER ) FROM tab1, tab2 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE NOT - col2 + col2 IN ( col2 * + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab1 AS cor1, tab1, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10011 tests as sqlite

* 1259 failed
* 87% was OK

Time: 16018ms

---- ---- ---- ---- ---- ---- ----
### 580/622 [`./test/random/select/slt_good_65.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_65.test)

_Mimic sqlite_

```sql
SELECT ALL col0 / 82 AS col0 FROM tab0

Expected: ["0","0","1"] but got ["0.293","0.427","1.085"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) + 88 col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["88","88","88"]
```


```sql
SELECT DISTINCT + 35 + - col0 + CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["NULL"] but got ["-54","0","11"]
```


```sql
SELECT ALL * FROM tab1, tab1 cor0, tab1 AS cor1, tab0, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col0 FROM tab2 WHERE NOT - col1 BETWEEN ( col2 / col1 ) AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab1, tab1 AS cor1, tab2 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab1 AS cor1, tab1, tab1 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10011 tests as sqlite

* 1285 failed
* 87% was OK

Time: 15927ms

---- ---- ---- ---- ---- ---- ----
### 581/622 [`./test/random/select/slt_good_66.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_66.test)

_Mimic sqlite_

```sql
SELECT ALL - cor0.col2 / cor0.col0 + col0 * - 21 FROM tab1 AS cor0

Expected: ["-1344","-1681","-81"] but got ["-1344.891","-1681.200","-81"]
```


```sql
SELECT + col1 - CAST ( NULL AS INTEGER ) AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["17","31","59"]
```


```sql
SELECT ALL + 6 AS col1 FROM tab2, tab1 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col2 + CAST ( NULL AS INTEGER ) * col2 AS col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["1","33","82"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT col1 col0 FROM tab1 WHERE NOT col0 BETWEEN col1 AND col2

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab1 cor1, tab0, tab2 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1262 failed
* 87% was OK

Time: 15690ms

---- ---- ---- ---- ---- ---- ----
### 582/622 [`./test/random/select/slt_good_67.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_67.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab1 AS cor2, tab1 cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - - col1 * - ( + col1 ) + col0 / + 98 AS col2 FROM tab2 AS cor0

Expected: ["-289","-3481","-961"] but got ["-288.194","-3480.204","-960.929"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) + 48 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["48","48","48"]
```


```sql
SELECT DISTINCT + col0 + - col0 * CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["7","78","79"]
```


```sql
SELECT * FROM tab1, tab2 AS cor0, tab1 cor1, tab0, tab0 AS cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab1 WHERE NOT + col0 + - col1 * + col0 + col2 IN ( - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab1 AS cor0, tab0 AS cor1, tab0, tab2 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1240 failed
* 87% was OK

Time: 15553ms

---- ---- ---- ---- ---- ---- ----
### 583/622 [`./test/random/select/slt_good_68.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_68.test)

_Mimic sqlite_

```sql
SELECT - CAST ( NULL AS INTEGER ) + col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["7","78","79"]
```


```sql
SELECT * FROM tab1 cor0 CROSS JOIN tab0, tab2 AS cor1, tab1 cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) col0 FROM tab1, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + col2 / + col0 + + col2 * + col1 FROM tab0

Expected: ["2839","7462","97"] but got ["2839.375","7462.921","97.029"]
```


```sql
SELECT DISTINCT + col0 * + col2 * CAST ( NULL AS INTEGER ) + - col2 * col1 AS col0 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-2838","-7462","-97"]
```


```sql
SELECT + col1 AS col0 FROM tab1 WHERE NOT col0 * col0 * - col2 IN ( + tab1.col2 + - col2 * col0 + - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2 WHERE NOT col1 * + col0 + - col1 BETWEEN - col2 AND - col2 + col1

6 results returned but expected 9
```

#### ☓ Ran 10011 tests as sqlite

* 1263 failed
* 87% was OK

Time: 15710ms

---- ---- ---- ---- ---- ---- ----
### 584/622 [`./test/random/select/slt_good_69.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_69.test)

_Mimic sqlite_

```sql
SELECT + CAST ( NULL AS INTEGER ) * col2 * cor0.col2 AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - col2 / 70 + col1 AS col2 FROM tab1 AS cor0

Expected: ["10","12","26"] but got ["11.629","25.229","9.186"]
```


```sql
SELECT + cor0.col1 FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL CAST ( NULL AS INTEGER ) col0 FROM tab0, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) + - col1 FROM tab2 cor0

Expected: ["NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT DISTINCT - col1 + tab2.col1 FROM tab2 WHERE NOT col0 IN ( col1 + + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab2 AS cor1, tab1 cor2

36 results returned but expected 972
```

#### ☓ Ran 10010 tests as sqlite

* 1280 failed
* 87% was OK

Time: 15736ms

---- ---- ---- ---- ---- ---- ----
### 585/622 [`./test/random/select/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_7.test)

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

* 1202 failed
* 87% was OK

Time: 14965ms

---- ---- ---- ---- ---- ---- ----
### 586/622 [`./test/random/select/slt_good_70.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_70.test)

_Mimic sqlite_

```sql
SELECT + col2 / + col0 + - CAST ( + ( + col2 ) AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["-36","-57","-95"] but got ["-36","-56.109","-94.800"]
```


```sql
SELECT DISTINCT 40 FROM tab2 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) + - col1 FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["-17","-31","-59"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) col2 FROM tab0, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * cor0.col1 / + col2 AS col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab1, tab0 cor0, tab2 AS cor1

36 results returned but expected 972
```


```sql
SELECT ALL - tab1.col2 * - col1 * + col0 AS col1 FROM tab1 WHERE NOT ( - col1 - + col0 ) BETWEEN + col0 + + col1 AND NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1328 failed
* 86% was OK

Time: 15689ms

---- ---- ---- ---- ---- ---- ----
### 587/622 [`./test/random/select/slt_good_71.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_71.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( - 72 AS INTEGER ) / - col2 FROM tab0 cor0

Expected: ["-2","-72","0"] but got ["-0.878","-2.182","-72"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) + 67 AS col1 FROM tab2, tab2 AS cor0

Expected: ["NULL"] but got ["67"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) + - cor0.col0 + cor0.col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-19","-62","24"]
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab0, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col0 FROM tab1, tab2 AS cor0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab1 WHERE NOT - col0 IN ( + col2 + tab1.col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab2 AS cor0, tab2 AS cor1, tab1, tab0 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1279 failed
* 87% was OK

Time: 15892ms

---- ---- ---- ---- ---- ---- ----
### 588/622 [`./test/random/select/slt_good_72.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_72.test)

_Mimic sqlite_

```sql
SELECT - col2 + 4 / - col0 AS col1 FROM tab0 AS cor0

Expected: ["-1","-33","-82"] but got ["-1.114","-33.167","-82.045"]
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) / + col2 AS col0 FROM tab2

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS REAL ) col1 FROM tab0 AS cor0 CROSS JOIN tab1, tab0 cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 cor1, tab1 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT tab0.col0 * CAST ( NULL AS INTEGER ) AS col1 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab2 cor1, tab2 cor2

36 results returned but expected 972
```


```sql
SELECT ALL * FROM tab0, tab2 AS cor0 CROSS JOIN tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT * FROM tab1 WHERE NOT col2 * col0 + + col1 + + col1 * col2 IN ( tab1.col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1320 failed
* 86% was OK

Time: 16128ms

---- ---- ---- ---- ---- ---- ----
### 589/622 [`./test/random/select/slt_good_73.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_73.test)

_Mimic sqlite_

```sql
SELECT ALL col0 + 64 / col1 AS col2 FROM tab1 AS cor0

Expected: ["5","70","84"] but got ["5.462","70.400","84.923"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) / col1 + col1 AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["10","13","26"]
```


```sql
SELECT ALL + 6 / + cor1.col0 FROM tab1, tab2 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - col1 * - CAST ( NULL AS INTEGER ) * col2 FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab1, tab2 AS cor1, tab1 AS cor2, tab1 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL * FROM tab1 WHERE NOT + col1 / + col0 IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab0 AS cor0, tab0 AS cor1, tab1, tab2 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10010 tests as sqlite

* 1317 failed
* 86% was OK

Time: 16001ms

---- ---- ---- ---- ---- ---- ----
### 590/622 [`./test/random/select/slt_good_74.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_74.test)

_Mimic sqlite_

```sql
SELECT col1 / col2 + col2 AS col2 FROM tab0

Expected: ["35","83","98"] but got ["35.606","83.110","98"]
```


```sql
SELECT * FROM tab0 AS cor0 CROSS JOIN tab0, tab0 AS cor1, tab1 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * col0 + - col0 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-7","-78","-79"]
```


```sql
SELECT * FROM tab1, tab0 cor0, tab0 AS cor1, tab2, tab0 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + ( - col0 ) * - col2 - CAST ( NULL AS INTEGER ) FROM tab2 AS cor0

Expected: ["NULL"] but got ["-189","-2028","-3002"]
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col1 + col2 IN ( col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab1 AS cor0, tab0 cor1, tab0, tab1 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1268 failed
* 87% was OK

Time: 15773ms

---- ---- ---- ---- ---- ---- ----
### 591/622 [`./test/random/select/slt_good_75.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_75.test)

_Mimic sqlite_

```sql
SELECT + col0 + tab0.col2 / - tab0.col1 FROM tab0

Expected: ["24","35","89"] but got ["23.616","34.990","88.099"]
```


```sql
SELECT col1 * - col2 * - col0 col0 FROM tab1 AS cor0 WHERE NOT ( + col0 ) IN ( - cor0.col1 * col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) * col2 col1 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * tab0.col2 FROM tab0, tab2 cor0, tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT + col0 * CAST ( NULL AS INTEGER ) * cor0.col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT - 17 FROM tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab1 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab0 cor0, tab0 AS cor1, tab2, tab0 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1241 failed
* 87% was OK

Time: 15536ms

---- ---- ---- ---- ---- ---- ----
### 592/622 [`./test/random/select/slt_good_76.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_76.test)

_Mimic sqlite_

```sql
SELECT + col0 * - tab1.col0 + + col2 / col1 FROM tab1

Expected: ["-4091","-6393","-7"] but got ["-4090.300","-6.923","-6392.615"]
```


```sql
SELECT 57 col0 FROM tab0 AS cor0 CROSS JOIN tab0, tab2 AS cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * - col2 + cor0.col0 AS col1 FROM tab1 AS cor0

Expected: ["NULL"] but got ["3","64","80"]
```


```sql
SELECT - col1 * - CAST ( NULL AS INTEGER ) FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT * FROM tab0 WHERE NOT col0 / - col2 + + tab0.col0 IN ( - col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + 80 / - cor0.col2 FROM tab2, tab1 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2, tab1 cor0, tab1, tab0 cor1

36 results returned but expected 972
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab0, tab2 cor1, tab0 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 cor1, tab0 co
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1317 failed
* 86% was OK

Time: 15133ms

---- ---- ---- ---- ---- ---- ----
### 593/622 [`./test/random/select/slt_good_77.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_77.test)

_Mimic sqlite_

```sql
SELECT + col2 * col2 / - 36 + + col0 AS col1 FROM tab2 AS cor0

Expected: ["-13","39","60"] but got ["-13.250","38.889","59.222"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) * col0 AS col2 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + cor0.col0 / + cor1.col1 AS col0 FROM tab0, tab1 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT col2 * - col2 + + CAST ( NULL AS INTEGER ) FROM tab1

Expected: ["NULL"] but got ["-2916","-3249","-9216"]
```


```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab1, tab1 cor1, tab0, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 cor1, tab0, t
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0, tab2 AS cor1, tab1 cor2

36 results returned but expected 972
```


```sql
SELECT ALL col2 + col0 AS col2 FROM tab1 WHERE NOT - col0 + - col1 IN ( - tab1.col1 / col0 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1291 failed
* 87% was OK

Time: 15032ms

---- ---- ---- ---- ---- ---- ----
### 594/622 [`./test/random/select/slt_good_78.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_78.test)

_Mimic sqlite_

```sql
SELECT col0 + - CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["3","64","80"]
```


```sql
SELECT ( - col0 ) / - col1 + 33 FROM tab0

Expected: ["33","33","33"] but got ["33.279","33.361","33.978"]
```


```sql
SELECT DISTINCT + + col1 * CAST ( NULL AS INTEGER ) * - col0 AS col2 FROM tab2 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL + cor0.col0 AS col2 FROM tab2 AS cor0 CROSS JOIN tab1, tab0 AS cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0, tab1 AS cor1, tab0 cor2

36 results returned but expected 972
```


```sql
SELECT ALL - 92 / 11 FROM tab1, tab0 cor0, tab2, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL col1 - col1 * col0 AS col0 FROM tab2 WHERE NOT ( col0 * col0 * col1 ) IN ( - tab2.col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1269 failed
* 87% was OK

Time: 14687ms

---- ---- ---- ---- ---- ---- ----
### 595/622 [`./test/random/select/slt_good_79.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_79.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col0 * col2 / col1 AS col0 FROM tab1

Expected: ["364","590","6"] but got ["364.800","590.769","6.231"]
```


```sql
SELECT * FROM tab2 WHERE NOT col0 * + col1 IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL + + CAST ( NULL AS INTEGER ) + + col0 AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["7","78","79"]
```


```sql
SELECT ALL - 87 FROM tab1 AS cor0 CROSS JOIN tab0, tab2 AS cor1, tab2 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab0, tab0 cor0, tab1, tab2 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - CAST ( NULL AS INTEGER ) * 64 + col0 FROM tab2 AS cor0

Expected: ["NULL"] but got ["7","78","79"]
```


```sql
SELECT DISTINCT * FROM tab2, tab0 cor0, tab1 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1268 failed
* 87% was OK

Time: 14919ms

---- ---- ---- ---- ---- ---- ----
### 596/622 [`./test/random/select/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_8.test)

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
SELECT - col2 + col0 + - col1 * + col2 FROM tab2 WHERE NOT col2 + - col1 + + col0 BETWEEN col2 + + col2 AND ( - col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1230 failed
* 87% was OK

Time: 14208ms

---- ---- ---- ---- ---- ---- ----
### 597/622 [`./test/random/select/slt_good_80.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_80.test)

_Mimic sqlite_

```sql
SELECT cor0.col0 + + CAST ( NULL AS INTEGER ) AS col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["24","35","89"]
```


```sql
SELECT - col2 + col0 / - col2 AS col2 FROM tab0 AS cor0

Expected: ["-33","-36","-83"] but got ["-33.727","-36","-83.085"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) col1 FROM tab2

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT cor1.col2 AS col0 FROM tab0 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL - ( 11 ) / - tab0.col0 AS col1 FROM tab0, tab0 cor0, tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2, tab0 cor0, tab1 cor1, tab2 cor2

36 results returned but expected 972
```


```sql
SELECT * FROM tab2 AS cor0 WHERE NOT col2 IN ( - col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1306 failed
* 86% was OK

Time: 14863ms

---- ---- ---- ---- ---- ---- ----
### 598/622 [`./test/random/select/slt_good_81.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_81.test)

_Mimic sqlite_

```sql
SELECT ALL + col0 + + CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["24","35","89"]
```


```sql
SELECT DISTINCT - tab1.col1 + 57 / + col1 + tab1.col0 col0 FROM tab1

Expected: ["-21","59","71"] but got ["-20.808","59.700","71.385"]
```


```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab0, tab1 cor1, tab2 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 cor1, tab2 co
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL * FROM tab1, tab1 AS cor0, tab1 cor1, tab2, tab2 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab2 cor1, tab1, tab1 AS cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + col2 * cor0.col0 AS col1 FROM tab1 AS cor0

Expected: ["NULL"] but got ["162","3648","7680"]
```


```sql
SELECT * FROM tab1 WHERE NOT col0 BETWEEN + col1 + col1 AND col0

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1289 failed
* 87% was OK

Time: 15971ms

---- ---- ---- ---- ---- ---- ----
### 599/622 [`./test/random/select/slt_good_82.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_82.test)

_Mimic sqlite_

```sql
SELECT + col0 + - CAST ( NULL AS INTEGER ) / cor0.col2 AS col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["7","78","79"]
```


```sql
SELECT DISTINCT - col1 * + col0 * CAST ( col1 AS INTEGER ) - col1 / col0 FROM tab1 AS cor0

Expected: ["-13520","-2036","-6400"] but got ["-13520.163","-2036.667","-6400.156"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) / tab2.col0 FROM tab2, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * col1 + + col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["1","33","82"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) FROM tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab1 cor1, tab0, tab0 cor2

45 results returned but expected 3645
```


```sql
SELECT ALL * FROM tab2 WHERE NOT col0 * - tab2.col1 IN ( col2 - - col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1240 failed
* 87% was OK

Time: 15854ms

---- ---- ---- ---- ---- ---- ----
### 600/622 [`./test/random/select/slt_good_83.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_83.test)

_Mimic sqlite_

```sql
SELECT cor0.col0 * CAST ( NULL AS INTEGER ) * cor0.col1 + col1 - + ( col2 ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["53","9","96"]
```


```sql
SELECT - col0 * ( + 95 ) / col1 + - ( - col2 ) - col1 FROM tab2 AS cor0

Expected: ["-158","-25","-420"] but got ["-158.593","-25.452","-420.471"]
```


```sql
SELECT DISTINCT col0 * col1 * - CAST ( NULL AS INTEGER ) + - col0 AS col1 FROM tab2

Expected: ["NULL"] but got ["-7","-78","-79"]
```


```sql
SELECT ALL - 83 FROM tab0 AS cor0 CROSS JOIN tab2, tab2 AS cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab2
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + col0 AS col0 FROM tab2 WHERE NOT col0 * + col1 IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) - 15 AS col1 FROM tab0, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1, tab2 AS cor0, tab1 cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1300 failed
* 87% was OK

Time: 15735ms

---- ---- ---- ---- ---- ---- ----
### 601/622 [`./test/random/select/slt_good_84.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_84.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col0 * col2 + + col0 / col1 AS col2 FROM tab1 AS cor0

Expected: ["-162","-3642","-7674"] but got ["-161.885","-3641.600","-7673.846"]
```


```sql
SELECT ALL - col1 * col2 + CAST ( NULL AS INTEGER ) AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-2838","-7462","-97"]
```


```sql
SELECT ALL 35 / - tab2.col1 FROM tab2, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1 AS cor0 CROSS JOIN tab0, tab2 cor1, tab1, tab0 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab2 cor1, tab1, t
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT col2 * - tab0.col0 * - CAST ( NULL AS INTEGER ) FROM tab0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab2, tab1 AS cor0, tab0 cor1, tab0, tab0 cor2

45 results returned but expected 3645
```


```sql
SELECT ALL col2 + tab2.col1 FROM tab2 WHERE NOT + col1 IN ( - col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1311 failed
* 86% was OK

Time: 15876ms

---- ---- ---- ---- ---- ---- ----
### 602/622 [`./test/random/select/slt_good_85.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_85.test)

_Mimic sqlite_

```sql
SELECT - - ( + 62 ) / col1 + 11 FROM tab0 AS cor0

Expected: ["11","11","11"] but got ["11.639","11.681","11.721"]
```


```sql
SELECT * FROM tab1 WHERE NOT col2 IN ( col1 * col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - 59 * cor0.col2 * - CAST ( NULL AS INTEGER ) FROM tab2, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL * FROM tab2 AS cor0 CROSS JOIN tab2, tab1 AS cor1 WHERE NULL BETWEEN NULL AND NULL

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1 WHERE
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - - CAST ( NULL AS INTEGER ) * 34 FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) + + col2 AS col1 FROM tab0 AS cor0

Expected: ["NULL"] but got ["1","33","82"]
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab0 cor1, tab1 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1315 failed
* 86% was OK

Time: 16256ms

---- ---- ---- ---- ---- ---- ----
### 603/622 [`./test/random/select/slt_good_86.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_86.test)

_Mimic sqlite_

```sql
SELECT - tab1.col2 / - 99 FROM tab1

Expected: ["0","0","0"] but got ["0.545","0.576","0.970"]
```


```sql
SELECT ALL + CAST ( NULL AS INTEGER ) col1 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT 56 FROM tab2, tab1 AS cor0 CROSS JOIN tab1, tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT 68 + - col1 * CAST ( NULL AS INTEGER ) AS col0 FROM tab1 cor0

Expected: ["NULL"] but got ["68"]
```


```sql
SELECT * FROM tab0 WHERE NOT col2 + col1 IN ( col2 * col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col2 FROM tab2, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab1 cor0, tab0 cor1, tab2 AS cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1260 failed
* 87% was OK

Time: 16007ms

---- ---- ---- ---- ---- ---- ----
### 604/622 [`./test/random/select/slt_good_87.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_87.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col2 / + 81 FROM tab2 AS cor0

Expected: ["0"] but got ["-0.321","-0.333","-0.469"]
```


```sql
SELECT * FROM tab2 cor0 CROSS JOIN tab2, tab2 cor1, tab2 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 cor1, tab2 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT 69 * col0 * CAST ( NULL AS INTEGER ) col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT + 92 / - 33 FROM tab2, tab0 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0 CROSS JOIN tab1 cor1

27 results returned but expected 243
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) + - 51 AS col1 FROM tab2

Expected: ["NULL"] but got ["-51"]
```


```sql
SELECT - col1 * col1 col0 FROM tab1 WHERE NOT col0 BETWEEN ( col1 ) AND tab1.col2 * col2

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1263 failed
* 87% was OK

Time: 15755ms

---- ---- ---- ---- ---- ---- ----
### 605/622 [`./test/random/select/slt_good_88.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_88.test)

_Mimic sqlite_

```sql
SELECT ALL - + cor0.col0 / col2 AS col1 FROM tab1 AS cor0

Expected: ["-1","0","0"] but got ["-0.056","-0.833","-1.123"]
```


```sql
SELECT + CAST ( NULL AS INTEGER ) * col0 + col2 FROM tab2 cor0

Expected: ["NULL","NULL","NULL"] but got ["26","27","38"]
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) - - 14 AS col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["14"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) - 17 FROM tab1, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col0 * + tab0.col2 + col0 * + col2 FROM tab0 WHERE NOT - tab0.col2 - - col2 * col2 IN ( col1 * tab0.col0 - col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT - cor1.col1 FROM tab1 AS cor0 CROSS JOIN tab1, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab0, tab1 AS cor0, tab0 cor1, tab1 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1311 failed
* 86% was OK

Time: 15794ms

---- ---- ---- ---- ---- ---- ----
### 606/622 [`./test/random/select/slt_good_89.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_89.test)

_Mimic sqlite_

```sql
SELECT + cor0.col2 / + 96 AS col2 FROM tab0 AS cor0

Expected: ["0","0","0"] but got ["0.010","0.344","0.854"]
```


```sql
SELECT DISTINCT tab0.col1 * CAST ( NULL AS INTEGER ) AS col1 FROM tab0, tab0 AS cor0, tab2 AS cor1

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + 54 AS col2 FROM tab0 cor0 CROSS JOIN tab2, tab2 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + 52 / - cor0.col2 col1 FROM tab2, tab1 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL - cor0.col0 + - CAST ( NULL AS INTEGER ) FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["-3","-64","-80"]
```


```sql
SELECT DISTINCT + + 65 + - col0 * CAST ( NULL AS INTEGER ) AS col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["65"]
```


```sql
SELECT DISTINCT * FROM tab2 WHERE NOT - col2 IN ( col0 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab1, tab2 AS cor0, tab2 cor1, tab2 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1289 failed
* 87% was OK

Time: 15810ms

---- ---- ---- ---- ---- ---- ----
### 607/622 [`./test/random/select/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_9.test)

_Mimic sqlite_

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

* 1202 failed
* 87% was OK

Time: 15218ms

---- ---- ---- ---- ---- ---- ----
### 608/622 [`./test/random/select/slt_good_90.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_90.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + 86 / + col2 FROM tab1 cor0

Expected: ["0","1"] but got ["0.896","1.509","1.593"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) * ( col0 ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) AS col0 FROM tab0 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT ALL - cor0.col1 / ( - cor0.col0 ) AS col0 FROM tab2, tab1 cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT - 86 FROM tab0 AS cor0 CROSS JOIN tab1, tab0 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab0 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT * FROM tab2 WHERE NOT - col0 IN ( col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab1 cor1, tab2, tab2 cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1279 failed
* 87% was OK

Time: 15679ms

---- ---- ---- ---- ---- ---- ----
### 609/622 [`./test/random/select/slt_good_91.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_91.test)

_Mimic sqlite_

```sql
SELECT + + col1 + col2 / 86 FROM tab2 cor0

Expected: ["17","31","59"] but got ["17.442","31.314","59.302"]
```


```sql
SELECT DISTINCT * FROM tab0, tab2 AS cor0, tab1 AS cor1, tab2, tab2 cor2

45 results returned but expected 3645
```


```sql
SELECT ALL + + 85 / - tab1.col2 FROM tab0, tab2, tab1 AS cor0, tab1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + cor0.col2 * CAST ( NULL AS INTEGER ) * - col2 - + col2 col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-26","-27","-38"]
```


```sql
SELECT DISTINCT - cor0.col2 * - CAST ( NULL AS INTEGER ) + + col2 * + cor0.col1 AS col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["1248","1404","570"]
```


```sql
SELECT DISTINCT * FROM tab2 cor0 CROSS JOIN tab1, tab2 cor1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 cor1, tab1 AS
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 WHERE NOT ( + col0 + col1 ) IN ( col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1257 failed
* 87% was OK

Time: 15717ms

---- ---- ---- ---- ---- ---- ----
### 610/622 [`./test/random/select/slt_good_92.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_92.test)

_Mimic sqlite_

```sql
SELECT ALL 64 / 94 AS col2 FROM tab2, tab0 cor0, tab1 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT col2 / + col0 - - col2 * col1 * cor0.col1 FROM tab2 AS cor0

Expected: ["10982","25950","90506"] but got ["10982.481","25950.857","90506.333"]
```


```sql
SELECT + col1 * col1 + CAST ( NULL AS INTEGER ) + + ( + col0 ) * cor0.col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["3748","7849","838"]
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab2 AS cor1, tab0 AS cor2

36 results returned but expected 972
```


```sql
SELECT DISTINCT + CAST ( NULL AS INTEGER ) * - col1 AS col1 FROM tab0 cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT + cor1.col2 AS col2 FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT + col0 FROM tab0 WHERE NOT ( col2 ) BETWEEN col1 * tab0.col2 AND ( NULL )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1367 failed
* 86% was OK

Time: 15630ms

---- ---- ---- ---- ---- ---- ----
### 611/622 [`./test/random/select/slt_good_93.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_93.test)

_Mimic sqlite_

```sql
SELECT ALL col0 / - cor0.col2 + 90 col1 FROM tab0 AS cor0

Expected: ["55","89","90"] but got ["55","88.915","89.273"]
```


```sql
SELECT + + CAST ( NULL AS INTEGER ) * - col1 + col2 AS col0 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["1","33","82"]
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab1, tab1 AS cor1, tab0 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT CAST ( NULL AS INTEGER ) + + ( cor0.col1 ) AS col1 FROM tab2, tab1 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - col0 + + CAST ( NULL AS INTEGER ) * col1 / col0 FROM tab1 AS cor0

Expected: ["NULL"] but got ["-3","-64","-80"]
```


```sql
SELECT tab0.col0 - col0 FROM tab0 WHERE NOT ( - col2 ) IN ( + col0 * col0 + - col2 * col2 + col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab1 cor0, tab0 AS cor1, tab0, tab0 AS cor2

45 results returned but expected 3645
```

#### ☓ Ran 10012 tests as sqlite

* 1261 failed
* 87% was OK

Time: 15970ms

---- ---- ---- ---- ---- ---- ----
### 612/622 [`./test/random/select/slt_good_94.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_94.test)

_Mimic sqlite_

```sql
SELECT + - 13 + col1 * - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-13","-13","-13"]
```


```sql
SELECT + + 3 / col2 AS col2 FROM tab1 AS cor0

Expected: ["0","0","0"] but got ["0.031","0.053","0.056"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) + - 20 AS col0 FROM tab1, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * + col2 + col1 AS col0 FROM tab1 cor0

Expected: ["NULL"] but got ["10","13","26"]
```


```sql
SELECT * FROM tab1, tab0 AS cor0 CROSS JOIN tab0, tab0 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT ALL col1 AS col1 FROM tab1 WHERE NOT col1 BETWEEN NULL AND - col0 * - col0

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0, tab1, tab0 cor1

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1312 failed
* 86% was OK

Time: 15843ms

---- ---- ---- ---- ---- ---- ----
### 613/622 [`./test/random/select/slt_good_95.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_95.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col0 / col1 - + 8 AS col2 FROM tab0 AS cor0

Expected: ["-8"] but got ["-7.022","-7.639","-7.721"]
```


```sql
SELECT 62 * - tab0.col1 + - CAST ( NULL AS INTEGER ) AS col0 FROM tab0

Expected: ["NULL","NULL","NULL"] but got ["-5332","-5642","-6014"]
```


```sql
SELECT DISTINCT - + CAST ( NULL AS INTEGER ) * - col2 + col1 + + col2 col2 FROM tab1 AS cor0

Expected: ["NULL"] but got ["109","67","80"]
```


```sql
SELECT + cor0.col2 / cor0.col1 FROM tab2, tab2 AS cor0, tab1 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab2, tab0 cor1, tab0 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 cor1, tab0 co
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT * FROM tab2, tab0 cor0, tab1 cor1, tab0, tab1 AS cor2

45 results returned but expected 3645
```


```sql
SELECT ALL * FROM tab2 WHERE NOT ( col2 ) IN ( col0 + col0 * - col0 - - col2 * tab2.col2 * col2 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10011 tests as sqlite

* 1278 failed
* 87% was OK

Time: 15784ms

---- ---- ---- ---- ---- ---- ----
### 614/622 [`./test/random/select/slt_good_96.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_96.test)

_Mimic sqlite_

```sql
SELECT - col1 / 22 FROM tab2

Expected: ["-1","-2","0"] but got ["-0.773","-1.409","-2.682"]
```


```sql
SELECT + - CAST ( NULL AS INTEGER ) FROM tab1 cor0 CROSS JOIN tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 WHERE NOT ( - col1 ) IN ( - col0 ) OR NULL BETWEEN NULL AND NULL

Query was expected to return results (but did not) 
```


```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + + 94 AS col2 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["94","94","94"]
```


```sql
SELECT 27 FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT + cor0.col0 * CAST ( NULL AS INTEGER ) FROM tab0 AS cor0

Expected: ["NULL"] but got ["0"]
```


```sql
SELECT DISTINCT * FROM tab0, tab0 cor0, tab0 AS cor1, tab0 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1223 failed
* 87% was OK

Time: 15756ms

---- ---- ---- ---- ---- ---- ----
### 615/622 [`./test/random/select/slt_good_97.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_97.test)

_Mimic sqlite_

```sql
SELECT + - col1 * + col2 + col0 + + col0 / cor0.col2 FROM tab0 AS cor0

Expected: ["-27","-2814","-7372"] but got ["-27","-2813.273","-7371.915"]
```


```sql
SELECT cor0.col2 * CAST ( NULL AS INTEGER ) + - col2 * col1 * 99 FROM tab1 cor0

Expected: ["NULL","NULL","NULL"] but got ["-123552","-138996","-56430"]
```


```sql
SELECT ALL + cor0.col0 AS col0 FROM tab0 AS cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT DISTINCT CAST ( NULL AS INTEGER ) * col1 + col0 AS col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["24","35","89"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) AS col0 FROM tab2, tab2 AS cor0, tab0 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab0, tab0 AS cor0, tab2 AS cor1, tab1, tab0 cor2

45 results returned but expected 3645
```


```sql
SELECT DISTINCT + col0 * - col2 - - col0 FROM tab2 WHERE NOT ( - col1 * col2 ) IN ( + col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1305 failed
* 86% was OK

Time: 16083ms

---- ---- ---- ---- ---- ---- ----
### 616/622 [`./test/random/select/slt_good_98.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_98.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col1 - + CAST ( NULL AS INTEGER ) AS col1 FROM tab1

Expected: ["NULL"] but got ["10","13","26"]
```


```sql
SELECT - col1 / ( + col0 ) - - col2 col1 FROM tab0 AS cor0

Expected: ["-1","30","81"] but got ["-1.771","29.417","80.978"]
```


```sql
SELECT DISTINCT * FROM tab0 cor0 CROSS JOIN tab2, tab2 AS cor1, tab1 AS cor2, tab0 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT - - cor0.col1 + - CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["10","13","26"]
```


```sql
SELECT * FROM tab1, tab1 cor0, tab0 AS cor1, tab0 cor2

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT * FROM tab1, tab1 cor0, tab0 AS cor1, tab2, tab2 cor2

45 results returned but expected 3645
```


```sql
SELECT ALL col0 * - col0 AS col2 FROM tab2 WHERE NOT col2 * col0 IN ( tab2.col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1263 failed
* 87% was OK

Time: 15749ms

---- ---- ---- ---- ---- ---- ----
### 617/622 [`./test/random/select/slt_good_99.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_99.test)

_Mimic sqlite_

```sql
SELECT DISTINCT ( + tab1.col1 ) / + 96 + col0 * - col2 FROM tab1

Expected: ["-162","-3648","-7680"] but got ["-161.729","-3647.896","-7679.865"]
```


```sql
SELECT ALL + col2 * + CAST ( NULL AS INTEGER ) + + col2 * + col2 * col1 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["611884","93654","97"]
```


```sql
SELECT ALL 9 col1 FROM tab2 AS cor0 CROSS JOIN tab2, tab1 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```


```sql
SELECT 80 / - 39 FROM tab1, tab1 cor0, tab2 AS cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT - + col1 + + CAST ( NULL AS INTEGER ) + + 56 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-30","-35","-41"]
```


```sql
SELECT DISTINCT * FROM tab2 WHERE NOT - col2 IN ( + col1 * col1 )

Query was expected to return results (but did not) 
```


```sql
SELECT DISTINCT * FROM tab2, tab2 cor0, tab1 AS cor1, tab2 cor2

36 results returned but expected 972
```

#### ☓ Ran 10012 tests as sqlite

* 1259 failed
* 87% was OK

Time: 15941ms

---- ---- ---- ---- ---- ---- ----
### 618/622 [`./test/select1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select1.test)

_Mimic sqlite_
#### ✔ Ran 1031 tests as sqlite

* 100% was OK

Time: 6523ms

---- ---- ---- ---- ---- ---- ----
### 619/622 [`./test/select2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select2.test)

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

Time: 5833ms

---- ---- ---- ---- ---- ---- ----
### 620/622 [`./test/select3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select3.test)

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

Time: 20219ms

---- ---- ---- ---- ---- ---- ----
### 621/622 [`./test/select4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select4.test)

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

Time: 2377ms

---- ---- ---- ---- ---- ---- ----
### 622/622 [`./test/select5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select5.test)

_Mimic sqlite_

(script died)


