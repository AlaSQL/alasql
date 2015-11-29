# SQLlogictest results for AlaSQL 0.2.1

_2015-11-29T01:16:15.693Z_

This is a subset of the total 622 tests.
Results from 125 test files:

---- ---- ---- ---- ---- ---- ----
### 1/125 [`test/evidence/in1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/in1.test)

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

Time: 187ms

---- ---- ---- ---- ---- ---- ----
### 2/125 [`test/evidence/in2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/in2.test)

_Mimic sqlite_

```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1)

context is not defined
```

#### ☓ Ran 53 tests as sqlite

* 1 failed
* 98% was OK

Time: 143ms

---- ---- ---- ---- ---- ---- ----
### 3/125 [`test/evidence/slt_lang_aggfunc.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_aggfunc.test)

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

Time: 41ms

---- ---- ---- ---- ---- ---- ----
### 4/125 [`test/evidence/slt_lang_createtrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_createtrigger.test)

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

Time: 14ms

---- ---- ---- ---- ---- ---- ----
### 5/125 [`test/evidence/slt_lang_createview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_createview.test)

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

Time: 22ms

---- ---- ---- ---- ---- ---- ----
### 6/125 [`test/evidence/slt_lang_dropindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_dropindex.test)

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

Time: 14ms

---- ---- ---- ---- ---- ---- ----
### 7/125 [`test/evidence/slt_lang_droptable.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_droptable.test)

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

Time: 13ms

---- ---- ---- ---- ---- ---- ----
### 8/125 [`test/evidence/slt_lang_droptrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_droptrigger.test)

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
### 9/125 [`test/evidence/slt_lang_dropview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_dropview.test)

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

Time: 16ms

---- ---- ---- ---- ---- ---- ----
### 10/125 [`test/evidence/slt_lang_reindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_reindex.test)

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

Time: 13ms

---- ---- ---- ---- ---- ---- ----
### 11/125 [`test/evidence/slt_lang_replace.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_replace.test)

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

Time: 28ms

---- ---- ---- ---- ---- ---- ----
### 12/125 [`test/evidence/slt_lang_update.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/evidence/slt_lang_update.test)

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
### 13/125 [`test/index/between/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/1/slt_good_0.test)

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

Time: 3602ms

---- ---- ---- ---- ---- ---- ----
### 14/125 [`test/index/between/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/10/slt_good_0.test)

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

Time: 3941ms

---- ---- ---- ---- ---- ---- ----
### 15/125 [`test/index/between/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/10/slt_good_1.test)

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

Time: 3510ms

---- ---- ---- ---- ---- ---- ----
### 16/125 [`test/index/between/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/10/slt_good_2.test)

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

Time: 3573ms

---- ---- ---- ---- ---- ---- ----
### 17/125 [`test/index/between/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/10/slt_good_3.test)

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

Time: 3822ms

---- ---- ---- ---- ---- ---- ----
### 18/125 [`test/index/between/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/10/slt_good_4.test)

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

Time: 3791ms

---- ---- ---- ---- ---- ---- ----
### 19/125 [`test/index/between/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/between/10/slt_good_5.test)

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

Time: 3601ms

---- ---- ---- ---- ---- ---- ----
### 20/125 [`test/index/commute/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_0.test)

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

Time: 2474ms

---- ---- ---- ---- ---- ---- ----
### 21/125 [`test/index/commute/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_1.test)

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

Time: 2487ms

---- ---- ---- ---- ---- ---- ----
### 22/125 [`test/index/commute/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_2.test)

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

Time: 2445ms

---- ---- ---- ---- ---- ---- ----
### 23/125 [`test/index/commute/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_3.test)

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

Time: 2456ms

---- ---- ---- ---- ---- ---- ----
### 24/125 [`test/index/commute/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_4.test)

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

Time: 2497ms

---- ---- ---- ---- ---- ---- ----
### 25/125 [`test/index/commute/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_5.test)

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

Time: 2394ms

---- ---- ---- ---- ---- ---- ----
### 26/125 [`test/index/commute/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_6.test)

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

Time: 2483ms

---- ---- ---- ---- ---- ---- ----
### 27/125 [`test/index/commute/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_7.test)

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

Time: 2385ms

---- ---- ---- ---- ---- ---- ----
### 28/125 [`test/index/commute/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_8.test)

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

Time: 2539ms

---- ---- ---- ---- ---- ---- ----
### 29/125 [`test/index/commute/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/commute/10/slt_good_9.test)

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

Time: 2609ms

---- ---- ---- ---- ---- ---- ----
### 30/125 [`test/index/delete/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/1/slt_good_0.test)

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

Time: 1813ms

---- ---- ---- ---- ---- ---- ----
### 31/125 [`test/index/delete/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/10/slt_good_0.test)

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

Time: 1758ms

---- ---- ---- ---- ---- ---- ----
### 32/125 [`test/index/delete/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/10/slt_good_1.test)

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

Time: 1742ms

---- ---- ---- ---- ---- ---- ----
### 33/125 [`test/index/delete/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/10/slt_good_2.test)

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

Time: 1637ms

---- ---- ---- ---- ---- ---- ----
### 34/125 [`test/index/delete/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/10/slt_good_3.test)

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

Time: 1812ms

---- ---- ---- ---- ---- ---- ----
### 35/125 [`test/index/delete/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/10/slt_good_4.test)

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

Time: 1681ms

---- ---- ---- ---- ---- ---- ----
### 36/125 [`test/index/delete/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/delete/10/slt_good_5.test)

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

Time: 1728ms

---- ---- ---- ---- ---- ---- ----
### 37/125 [`test/index/in/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/in/10/slt_good_0.test)

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

Time: 3654ms

---- ---- ---- ---- ---- ---- ----
### 38/125 [`test/index/in/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/in/10/slt_good_1.test)

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

Time: 3694ms

---- ---- ---- ---- ---- ---- ----
### 39/125 [`test/index/in/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/in/10/slt_good_2.test)

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

Time: 3693ms

---- ---- ---- ---- ---- ---- ----
### 40/125 [`test/index/in/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/in/10/slt_good_3.test)

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

Time: 3567ms

---- ---- ---- ---- ---- ---- ----
### 41/125 [`test/index/in/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/in/10/slt_good_4.test)

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

Time: 3609ms

---- ---- ---- ---- ---- ---- ----
### 42/125 [`test/index/in/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/in/10/slt_good_5.test)

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

Time: 3751ms

---- ---- ---- ---- ---- ---- ----
### 43/125 [`test/index/orderby/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_0.test)

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

Time: 2427ms

---- ---- ---- ---- ---- ---- ----
### 44/125 [`test/index/orderby/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_1.test)

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

Time: 2504ms

---- ---- ---- ---- ---- ---- ----
### 45/125 [`test/index/orderby/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_2.test)

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

Time: 2515ms

---- ---- ---- ---- ---- ---- ----
### 46/125 [`test/index/orderby/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_3.test)

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

Time: 2561ms

---- ---- ---- ---- ---- ---- ----
### 47/125 [`test/index/orderby/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_4.test)

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
### 48/125 [`test/index/orderby/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_5.test)

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

Time: 2377ms

---- ---- ---- ---- ---- ---- ----
### 49/125 [`test/index/orderby/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_6.test)

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

Time: 2489ms

---- ---- ---- ---- ---- ---- ----
### 50/125 [`test/index/orderby/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_7.test)

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

Time: 2482ms

---- ---- ---- ---- ---- ---- ----
### 51/125 [`test/index/orderby/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_8.test)

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

Time: 2572ms

---- ---- ---- ---- ---- ---- ----
### 52/125 [`test/index/orderby/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby/10/slt_good_9.test)

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

Time: 2464ms

---- ---- ---- ---- ---- ---- ----
### 53/125 [`test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_0.test)

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
### 54/125 [`test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_1.test)

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

Time: 2510ms

---- ---- ---- ---- ---- ---- ----
### 55/125 [`test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_2.test)

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

Time: 2446ms

---- ---- ---- ---- ---- ---- ----
### 56/125 [`test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_3.test)

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

Time: 2444ms

---- ---- ---- ---- ---- ---- ----
### 57/125 [`test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_4.test)

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

Time: 2708ms

---- ---- ---- ---- ---- ---- ----
### 58/125 [`test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_5.test)

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

Time: 2491ms

---- ---- ---- ---- ---- ---- ----
### 59/125 [`test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_6.test)

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

Time: 3414ms

---- ---- ---- ---- ---- ---- ----
### 60/125 [`test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_7.test)

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

Time: 2285ms

---- ---- ---- ---- ---- ---- ----
### 61/125 [`test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_8.test)

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

Time: 2391ms

---- ---- ---- ---- ---- ---- ----
### 62/125 [`test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/orderby_nosort/10/slt_good_9.test)

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

Time: 2279ms

---- ---- ---- ---- ---- ---- ----
### 63/125 [`test/index/random/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_0.test)

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

Time: 2531ms

---- ---- ---- ---- ---- ---- ----
### 64/125 [`test/index/random/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_1.test)

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

Time: 2585ms

---- ---- ---- ---- ---- ---- ----
### 65/125 [`test/index/random/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_2.test)

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

Time: 2649ms

---- ---- ---- ---- ---- ---- ----
### 66/125 [`test/index/random/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_3.test)

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

Time: 2480ms

---- ---- ---- ---- ---- ---- ----
### 67/125 [`test/index/random/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_4.test)

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

Time: 2680ms

---- ---- ---- ---- ---- ---- ----
### 68/125 [`test/index/random/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_5.test)

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

Time: 2538ms

---- ---- ---- ---- ---- ---- ----
### 69/125 [`test/index/random/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_6.test)

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

Time: 2588ms

---- ---- ---- ---- ---- ---- ----
### 70/125 [`test/index/random/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_7.test)

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

Time: 2556ms

---- ---- ---- ---- ---- ---- ----
### 71/125 [`test/index/random/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_8.test)

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

Time: 2552ms

---- ---- ---- ---- ---- ---- ----
### 72/125 [`test/index/random/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/random/10/slt_good_9.test)

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

Time: 2523ms

---- ---- ---- ---- ---- ---- ----
### 73/125 [`test/index/view/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_0.test)

_Mimic sqlite_
Time: 2ms

---- ---- ---- ---- ---- ---- ----
### 74/125 [`test/index/view/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_1.test)

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

Time: 1486ms

---- ---- ---- ---- ---- ---- ----
### 75/125 [`test/index/view/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_2.test)

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

Time: 1516ms

---- ---- ---- ---- ---- ---- ----
### 76/125 [`test/index/view/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_3.test)

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

Time: 1401ms

---- ---- ---- ---- ---- ---- ----
### 77/125 [`test/index/view/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_4.test)

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

Time: 1526ms

---- ---- ---- ---- ---- ---- ----
### 78/125 [`test/index/view/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_5.test)

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

Time: 1449ms

---- ---- ---- ---- ---- ---- ----
### 79/125 [`test/index/view/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_6.test)

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

Time: 1328ms

---- ---- ---- ---- ---- ---- ----
### 80/125 [`test/index/view/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/index/view/10/slt_good_7.test)

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

Time: 1440ms

---- ---- ---- ---- ---- ---- ----
### 81/125 [`test/random/aggregates/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_0.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16275ms

---- ---- ---- ---- ---- ---- ----
### 82/125 [`test/random/aggregates/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_1.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 15387ms

---- ---- ---- ---- ---- ---- ----
### 83/125 [`test/random/aggregates/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_2.test)

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

Correct amount of values returned bug hash was different than expected.
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
SELECT * FROM tab2 cor0 WHERE NOT 33 * col0 IN ( + col1 + ( col2 ) + + col1 * - col2 * + + ( - col2 ), - col0, + - 64 )

Query was expected to return results (but did not) 
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

Time: 16056ms

---- ---- ---- ---- ---- ---- ----
### 84/125 [`test/random/aggregates/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_3.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16253ms

---- ---- ---- ---- ---- ---- ----
### 85/125 [`test/random/aggregates/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_4.test)

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

Correct amount of values returned bug hash was different than expected.
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
SELECT - + CAST ( NULL AS INTEGER ) * - COUNT ( * ) FROM tab1 WHERE NOT + col1 IN ( - + col1, col0 * col1 * + col2 / + 88 )

Expected: ["NULL"] but got ["0"]
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

Time: 16380ms

---- ---- ---- ---- ---- ---- ----
### 86/125 [`test/random/aggregates/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_5.test)

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

Correct amount of values returned bug hash was different than expected.
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
SELECT DISTINCT - col2 * - - col2 + + CAST ( NULL AS INTEGER ) - - col1 / + - 48 * + col1 - + - 43 AS col2 FROM tab1

Expected: ["NULL"] but got ["-3438.021","-4581.021","-9173.021"]
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

Time: 15658ms

---- ---- ---- ---- ---- ---- ----
### 87/125 [`test/random/aggregates/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_6.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16155ms

---- ---- ---- ---- ---- ---- ----
### 88/125 [`test/random/aggregates/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_7.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16029ms

---- ---- ---- ---- ---- ---- ----
### 89/125 [`test/random/aggregates/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_8.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 15769ms

---- ---- ---- ---- ---- ---- ----
### 90/125 [`test/random/aggregates/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/aggregates/slt_good_9.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 17205ms

---- ---- ---- ---- ---- ---- ----
### 91/125 [`test/random/expr/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_0.test)

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
SELECT + 35 * + 91 * - - 45 + + ( - - 83 ) AS col2, 68 AS col2

Expected: ["143408","68"] but got ["68","68"]
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

* 1688 failed
* 83% was OK

Time: 17048ms

---- ---- ---- ---- ---- ---- ----
### 92/125 [`test/random/expr/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_1.test)

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

Time: 10954ms

---- ---- ---- ---- ---- ---- ----
### 93/125 [`test/random/expr/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_2.test)

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

Time: 16197ms

---- ---- ---- ---- ---- ---- ----
### 94/125 [`test/random/expr/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_3.test)

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

Time: 19858ms

---- ---- ---- ---- ---- ---- ----
### 95/125 [`test/random/expr/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_4.test)

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


```sql
SELECT ALL - 17 / + COUNT ( + 36 ) - - COUNT ( * ) + + CAST ( NULL AS INTEGER ) AS col2

Expected: ["NULL"] but got ["-16"]
```

#### ☓ Ran 10012 tests as sqlite

* 1911 failed
* 80% was OK

Time: 19728ms

---- ---- ---- ---- ---- ---- ----
### 96/125 [`test/random/expr/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_5.test)

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
SELECT - + 39 AS col2, - COUNT ( + 67 ) + + 55 AS col2

Expected: ["-39","54"] but got ["54"]
```


```sql
SELECT ALL + 65 AS col1, CASE + + 3 WHEN + + 8 THEN 69 ELSE NULL END col1

Expected: ["65","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1899 failed
* 81% was OK

Time: 19876ms

---- ---- ---- ---- ---- ---- ----
### 97/125 [`test/random/expr/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_6.test)

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
SELECT DISTINCT - 69 + + CAST ( NULL AS INTEGER ) AS col1, - 40 - - 10 * + 5 AS col0, + SUM ( ALL CAST ( NULL AS INTEGER ) ) * + 74

Expected: ["NULL","10","NULL"] but got ["-69","10","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1873 failed
* 81% was OK

Time: 19425ms

---- ---- ---- ---- ---- ---- ----
### 98/125 [`test/random/expr/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_7.test)

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


```sql
SELECT ALL + - 68 + - - 45 + - 98 / 10 * - 82 col1

Expected: ["715"] but got ["780.600"]
```

#### ☓ Ran 10012 tests as sqlite

* 1912 failed
* 80% was OK

Time: 19311ms

---- ---- ---- ---- ---- ---- ----
### 99/125 [`test/random/expr/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_8.test)

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

Time: 19296ms

---- ---- ---- ---- ---- ---- ----
### 100/125 [`test/random/expr/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/expr/slt_good_9.test)

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

Time: 19910ms

---- ---- ---- ---- ---- ---- ----
### 101/125 [`test/random/groupby/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT - tab1.col0 * 84 + + 38 AS col2 FROM tab1 GROUP BY tab1.col0

Expected: ["-1810","-2314","-6850"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT * FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col2, cor0.col0

Correct amount of values returned bug hash was different than expected.
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
SELECT ALL cor0.col1 AS col1 FROM tab2 AS cor0 GROUP BY col1 HAVING NOT ( cor0.col1 ) IS NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 4255 failed
* 57% was OK

Time: 15948ms

---- ---- ---- ---- ---- ---- ----
### 102/125 [`test/random/groupby/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_1.test)

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

Correct amount of values returned bug hash was different than expected.
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

* 4111 failed
* 58% was OK

Time: 16232ms

---- ---- ---- ---- ---- ---- ----
### 103/125 [`test/random/groupby/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_2.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16239ms

---- ---- ---- ---- ---- ---- ----
### 104/125 [`test/random/groupby/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_3.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16473ms

---- ---- ---- ---- ---- ---- ----
### 105/125 [`test/random/groupby/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_4.test)

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

Correct amount of values returned bug hash was different than expected.
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

#### ☓ Ran 10012 tests as sqlite

* 4336 failed
* 56% was OK

Time: 16325ms

---- ---- ---- ---- ---- ---- ----
### 106/125 [`test/random/groupby/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_5.test)

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

Correct amount of values returned bug hash was different than expected.
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
SELECT DISTINCT cor0.col1 * + col1 FROM tab1 AS cor0 GROUP BY cor0.col1

Expected: ["1936","3249","36"] but got ["NULL"]
```


```sql
SELECT DISTINCT NULLIF ( cor0.col1, + cor0.col1 + + cor0.col1 ) AS col0 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["81","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4462 failed
* 55% was OK

Time: 16877ms

---- ---- ---- ---- ---- ---- ----
### 107/125 [`test/random/groupby/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_6.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16557ms

---- ---- ---- ---- ---- ---- ----
### 108/125 [`test/random/groupby/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_7.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 16562ms

---- ---- ---- ---- ---- ---- ----
### 109/125 [`test/random/groupby/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_8.test)

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
SELECT + CAST ( NULL AS INTEGER ) * 22 AS col0 FROM tab0 AS cor0 GROUP BY cor0.col1

Expected: ["NULL","NULL"] but got ["0","0"]
```


```sql
SELECT ALL cor0.col2 + - 98 AS col2 FROM tab1 AS cor0 CROSS JOIN tab2 AS cor1 GROUP BY cor0.col2, cor1.col2

Correct amount of values returned bug hash was different than expected.
```


```sql
SELECT cor0.col2 * - ( + cor0.col2 ) AS col2 FROM tab2 cor0 CROSS JOIN tab0 AS cor1 GROUP BY cor1.col1, cor0.col2

Expected: ["-3364","-3364","-6241","-6241","-7569","-7569"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 2955 failed
* 70% was OK

Time: 16095ms

---- ---- ---- ---- ---- ---- ----
### 110/125 [`test/random/groupby/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/groupby/slt_good_9.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 15989ms

---- ---- ---- ---- ---- ---- ----
### 111/125 [`test/random/select/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0 cor0 CROSS JOIN tab2 AS cor1

Correct amount of values returned bug hash was different than expected.
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

Time: 14592ms

---- ---- ---- ---- ---- ---- ----
### 112/125 [`test/random/select/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_1.test)

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

Correct amount of values returned bug hash was different than expected.
```


```sql
SELECT col0 FROM tab1 WHERE NOT ( col0 ) IN ( + col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1252 failed
* 87% was OK

Time: 15044ms

---- ---- ---- ---- ---- ---- ----
### 113/125 [`test/random/select/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_2.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 14881ms

---- ---- ---- ---- ---- ---- ----
### 114/125 [`test/random/select/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_3.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 15411ms

---- ---- ---- ---- ---- ---- ----
### 115/125 [`test/random/select/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_4.test)

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

Correct amount of values returned bug hash was different than expected.
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

#### ☓ Ran 10011 tests as sqlite

* 1222 failed
* 87% was OK

Time: 15936ms

---- ---- ---- ---- ---- ---- ----
### 116/125 [`test/random/select/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0, tab0 cor0, tab2 cor1

Correct amount of values returned bug hash was different than expected.
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

Time: 15270ms

---- ---- ---- ---- ---- ---- ----
### 117/125 [`test/random/select/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT + col0 / - col1 + - ( - col2 ) col0 FROM tab2 AS cor0

Expected: ["25","27","34"] but got ["24.678","26.774","33.353"]
```


```sql
SELECT CAST ( NULL AS INTEGER ) FROM tab1, tab1 AS cor0

Correct amount of values returned bug hash was different than expected.
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

Time: 15246ms

---- ---- ---- ---- ---- ---- ----
### 118/125 [`test/random/select/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_7.test)

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

Correct amount of values returned bug hash was different than expected.
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

Time: 15086ms

---- ---- ---- ---- ---- ---- ----
### 119/125 [`test/random/select/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT col0 / col2 AS col1 FROM tab0

Expected: ["0","1","35"] but got ["0.727","1.085","35"]
```


```sql
SELECT ALL * FROM tab0, tab1 AS cor0, tab0 cor1, tab2 cor2

Correct amount of values returned bug hash was different than expected.
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

Time: 15096ms

---- ---- ---- ---- ---- ---- ----
### 120/125 [`test/random/select/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/random/select/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT + col0 / col2 + + col1 FROM tab0 cor0

Expected: ["132","86","92"] but got ["132","86.727","92.085"]
```


```sql
SELECT ALL * FROM tab0, tab2, tab1 cor0, tab1

Correct amount of values returned bug hash was different than expected.
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

Time: 15471ms

---- ---- ---- ---- ---- ---- ----
### 121/125 [`test/select1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/select1.test)

_Mimic sqlite_
#### ✔ Ran 1031 tests as sqlite

* 100% was OK

Time: 6605ms

---- ---- ---- ---- ---- ---- ----
### 122/125 [`test/select2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/select2.test)

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

Correct amount of values returned bug hash was different than expected.
```

#### ☓ Ran 1031 tests as sqlite

* 104 failed
* 89% was OK

Time: 5906ms

---- ---- ---- ---- ---- ---- ----
### 123/125 [`test/select3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/select3.test)

_Mimic sqlite_

```sql
SELECT d-e, c-d, (a+b+c+d+e)/5 FROM t1 WHERE d NOT BETWEEN 110 AND 150 OR e+d BETWEEN a+b-10 AND c+130 OR b>c

81 results returned but expected 72
```


```sql
SELECT (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b), CASE a+1 WHEN b THEN 111 WHEN c THEN 222 WHEN d THEN 333 WHEN e THEN 444 ELSE 555 END, a+b*2+c*3+d*4+e*5, a-b, abs(a), d FROM t1 WHERE (c<=d-2 OR c>=d+2) OR c BETWEEN b-2 AND d+2

Correct amount of values returned bug hash was different than expected.
```


```sql
SELECT e FROM t1 WHERE b>c AND d NOT BETWEEN 110 AND 150 AND a>b

Expected: ["197","227","230"] but got ["157","165","197","227","230","NULL"]
```


```sql
SELECT c, CASE WHEN c>(SELECT avg(c) FROM t1) THEN a*2 ELSE b*10 END, a+b*2+c*3+d*4, c-d FROM t1 WHERE (e>a AND e<b) OR d NOT BETWEEN 110 AND 150 OR (e>c OR e<d)

112 results returned but expected 96
```


```sql
SELECT c FROM t1 WHERE (a>b-2 AND a<b+2) AND d NOT BETWEEN 110 AND 150

Expected: ["184","195","225"] but got ["155","166","184","195","225"]
```

#### ☓ Ran 3351 tests as sqlite

* 358 failed
* 89% was OK

Time: 20191ms

---- ---- ---- ---- ---- ---- ----
### 124/125 [`test/select4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/select4.test)

_Mimic sqlite_

```sql
SELECT * FROM t1

Correct amount of values returned bug hash was different than expected.
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

Time: 2363ms

---- ---- ---- ---- ---- ---- ----
### 125/125 [`test/select5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/test/select5.test)

_Mimic sqlite_
