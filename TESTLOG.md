# SQLlogictest results for AlaSQL 0.2.2-pre-develop+151231.53429

_2016-01-02T16:56:43.834Z_

This is a subset of the total 622 tests.
Results from 621 test files:

---- ---- ---- ---- ---- ---- ----
### 1/621 [`./test/evidence/in1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in1.test)

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

#### ☓ Ran 216 tests as sqlite

* 148 skipped
* 19 failed
* 22% was OK

Time: 321ms

---- ---- ---- ---- ---- ---- ----
### 2/621 [`./test/evidence/in2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in2.test)

_Mimic sqlite_

```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1,2)

No exception thrown
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 53 tests as sqlite

* 3 skipped
* 1 failed
* 92% was OK

Time: 393ms

---- ---- ---- ---- ---- ---- ----
### 3/621 [`./test/evidence/slt_lang_aggfunc.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_aggfunc.test)

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

Time: 76ms

---- ---- ---- ---- ---- ---- ----
### 4/621 [`./test/evidence/slt_lang_createtrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createtrigger.test)

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

Time: 27ms

---- ---- ---- ---- ---- ---- ----
### 5/621 [`./test/evidence/slt_lang_createview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createview.test)

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

Time: 37ms

---- ---- ---- ---- ---- ---- ----
### 6/621 [`./test/evidence/slt_lang_dropindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropindex.test)

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

Time: 22ms

---- ---- ---- ---- ---- ---- ----
### 7/621 [`./test/evidence/slt_lang_droptable.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptable.test)

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

Time: 19ms

---- ---- ---- ---- ---- ---- ----
### 8/621 [`./test/evidence/slt_lang_droptrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptrigger.test)

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

Time: 22ms

---- ---- ---- ---- ---- ---- ----
### 9/621 [`./test/evidence/slt_lang_dropview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropview.test)

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

Time: 24ms

---- ---- ---- ---- ---- ---- ----
### 10/621 [`./test/evidence/slt_lang_reindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_reindex.test)

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

Time: 20ms

---- ---- ---- ---- ---- ---- ----
### 11/621 [`./test/evidence/slt_lang_replace.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_replace.test)

_Mimic sqlite_
#### ★ Ran 14 tests as sqlite

* 100% was OK

Time: 55ms

---- ---- ---- ---- ---- ---- ----
### 12/621 [`./test/evidence/slt_lang_update.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_update.test)

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

Time: 45ms

---- ---- ---- ---- ---- ---- ----
### 13/621 [`./test/index/between/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT pk FROM tab0 WHERE ((col0 IN (SELECT col3 FROM tab0 WHERE (((col0 > 9 OR col3 IN (SELECT col0 FROM tab0 WHERE col1 < 4.40) OR col3 BETWEEN 6 AND 3) AND col1 IS NULL OR (col3 < 1 AND col3 < 2))) OR (col3 IS NULL) AND col0 > 3) OR col3 > 9))

Cannot read property '0' of undefined
```

#### ☓ Ran 10022 tests as sqlite

* 10 failed
* 99% was OK

Time: 142399ms

---- ---- ---- ---- ---- ---- ----
### 14/621 [`./test/index/between/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 124242ms

---- ---- ---- ---- ---- ---- ----
### 15/621 [`./test/index/between/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10029 tests as sqlite

* 40 failed
* 99% was OK

Time: 107726ms

---- ---- ---- ---- ---- ---- ----
### 16/621 [`./test/index/between/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 40 failed
* 99% was OK

Time: 113410ms

---- ---- ---- ---- ---- ---- ----
### 17/621 [`./test/index/between/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 129434ms

---- ---- ---- ---- ---- ---- ----
### 18/621 [`./test/index/between/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 126728ms

---- ---- ---- ---- ---- ---- ----
### 19/621 [`./test/index/between/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10031 tests as sqlite

* 50 failed
* 99% was OK

Time: 109327ms

---- ---- ---- ---- ---- ---- ----
### 20/621 [`./test/index/between/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10123 tests as sqlite

* 100% was OK

Time: 144451ms

---- ---- ---- ---- ---- ---- ----
### 21/621 [`./test/index/between/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10125 tests as sqlite

* 10 failed
* 99% was OK

Time: 187919ms

---- ---- ---- ---- ---- ---- ----
### 22/621 [`./test/index/between/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10121 tests as sqlite

* 10 failed
* 99% was OK

Time: 165579ms

---- ---- ---- ---- ---- ---- ----
### 23/621 [`./test/index/between/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10121 tests as sqlite

* 40 failed
* 99% was OK

Time: 187344ms

---- ---- ---- ---- ---- ---- ----
### 24/621 [`./test/index/between/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10125 tests as sqlite

* 50 failed
* 99% was OK

Time: 236347ms

---- ---- ---- ---- ---- ---- ----
### 25/621 [`./test/index/between/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 3792 tests as sqlite

* 11 failed
* 99% was OK

Time: 297092ms

---- ---- ---- ---- ---- ---- ----
### 26/621 [`./test/index/commute/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10034 tests as sqlite

* 10 failed
* 99% was OK

Time: 65965ms

---- ---- ---- ---- ---- ---- ----
### 27/621 [`./test/index/commute/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10030 tests as sqlite

* 100% was OK

Time: 67853ms

---- ---- ---- ---- ---- ---- ----
### 28/621 [`./test/index/commute/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 4261 tests as sqlite

* 10 failed
* 99% was OK

Time: 23525ms

---- ---- ---- ---- ---- ---- ----
### 29/621 [`./test/index/commute/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_11.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 74113ms

---- ---- ---- ---- ---- ---- ----
### 30/621 [`./test/index/commute/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_12.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 99550ms

---- ---- ---- ---- ---- ---- ----
### 31/621 [`./test/index/commute/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 30 failed
* 99% was OK

Time: 87243ms

---- ---- ---- ---- ---- ---- ----
### 32/621 [`./test/index/commute/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 10 failed
* 99% was OK

Time: 75349ms

---- ---- ---- ---- ---- ---- ----
### 33/621 [`./test/index/commute/10/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10030 tests as sqlite

* 10 failed
* 99% was OK

Time: 74047ms

---- ---- ---- ---- ---- ---- ----
### 34/621 [`./test/index/commute/10/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_16.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 86111ms

---- ---- ---- ---- ---- ---- ----
### 35/621 [`./test/index/commute/10/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_17.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 78860ms

---- ---- ---- ---- ---- ---- ----
### 36/621 [`./test/index/commute/10/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_18.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 72723ms

---- ---- ---- ---- ---- ---- ----
### 37/621 [`./test/index/commute/10/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_19.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 86371ms

---- ---- ---- ---- ---- ---- ----
### 38/621 [`./test/index/commute/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10037 tests as sqlite

* 100% was OK

Time: 85862ms

---- ---- ---- ---- ---- ---- ----
### 39/621 [`./test/index/commute/10/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 10 failed
* 99% was OK

Time: 80130ms

---- ---- ---- ---- ---- ---- ----
### 40/621 [`./test/index/commute/10/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_21.test)

_Mimic sqlite_
#### ★ Ran 10030 tests as sqlite

* 100% was OK

Time: 90023ms

---- ---- ---- ---- ---- ---- ----
### 41/621 [`./test/index/commute/10/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_22.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 77204ms

---- ---- ---- ---- ---- ---- ----
### 42/621 [`./test/index/commute/10/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_23.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 80204ms

---- ---- ---- ---- ---- ---- ----
### 43/621 [`./test/index/commute/10/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10033 tests as sqlite

* 10 failed
* 99% was OK

Time: 86824ms

---- ---- ---- ---- ---- ---- ----
### 44/621 [`./test/index/commute/10/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_25.test)

_Mimic sqlite_
#### ★ Ran 10030 tests as sqlite

* 100% was OK

Time: 80185ms

---- ---- ---- ---- ---- ---- ----
### 45/621 [`./test/index/commute/10/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_26.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 77793ms

---- ---- ---- ---- ---- ---- ----
### 46/621 [`./test/index/commute/10/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_27.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 91083ms

---- ---- ---- ---- ---- ---- ----
### 47/621 [`./test/index/commute/10/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_28.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 88898ms

---- ---- ---- ---- ---- ---- ----
### 48/621 [`./test/index/commute/10/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 10 failed
* 99% was OK

Time: 115511ms

---- ---- ---- ---- ---- ---- ----
### 49/621 [`./test/index/commute/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 76465ms

---- ---- ---- ---- ---- ---- ----
### 50/621 [`./test/index/commute/10/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 10 failed
* 99% was OK

Time: 77376ms

---- ---- ---- ---- ---- ---- ----
### 51/621 [`./test/index/commute/10/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_31.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 82572ms

---- ---- ---- ---- ---- ---- ----
### 52/621 [`./test/index/commute/10/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_32.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 87650ms

---- ---- ---- ---- ---- ---- ----
### 53/621 [`./test/index/commute/10/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_33.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 85437ms

---- ---- ---- ---- ---- ---- ----
### 54/621 [`./test/index/commute/10/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_34.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 85728ms

---- ---- ---- ---- ---- ---- ----
### 55/621 [`./test/index/commute/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10030 tests as sqlite

* 100% was OK

Time: 98260ms

---- ---- ---- ---- ---- ---- ----
### 56/621 [`./test/index/commute/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10032 tests as sqlite

* 10 failed
* 99% was OK

Time: 70730ms

---- ---- ---- ---- ---- ---- ----
### 57/621 [`./test/index/commute/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10036 tests as sqlite

* 20 failed
* 99% was OK

Time: 78738ms

---- ---- ---- ---- ---- ---- ----
### 58/621 [`./test/index/commute/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10034 tests as sqlite

* 10 failed
* 99% was OK

Time: 73519ms

---- ---- ---- ---- ---- ---- ----
### 59/621 [`./test/index/commute/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 82095ms

---- ---- ---- ---- ---- ---- ----
### 60/621 [`./test/index/commute/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10034 tests as sqlite

* 20 failed
* 99% was OK

Time: 82458ms

---- ---- ---- ---- ---- ---- ----
### 61/621 [`./test/index/commute/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10122 tests as sqlite

* 10 failed
* 99% was OK

Time: 83623ms

---- ---- ---- ---- ---- ---- ----
### 62/621 [`./test/index/commute/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10120 tests as sqlite

* 100% was OK

Time: 85335ms

---- ---- ---- ---- ---- ---- ----
### 63/621 [`./test/index/commute/100/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_10.test)

_Mimic sqlite_
#### ★ Ran 10124 tests as sqlite

* 100% was OK

Time: 122593ms

---- ---- ---- ---- ---- ---- ----
### 64/621 [`./test/index/commute/100/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10123 tests as sqlite

* 10 failed
* 99% was OK

Time: 67714ms

---- ---- ---- ---- ---- ---- ----
### 65/621 [`./test/index/commute/100/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10123 tests as sqlite

* 10 failed
* 99% was OK

Time: 64640ms

---- ---- ---- ---- ---- ---- ----
### 66/621 [`./test/index/commute/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10123 tests as sqlite

* 100% was OK

Time: 63188ms

---- ---- ---- ---- ---- ---- ----
### 67/621 [`./test/index/commute/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10121 tests as sqlite

* 10 failed
* 99% was OK

Time: 56152ms

---- ---- ---- ---- ---- ---- ----
### 68/621 [`./test/index/commute/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10124 tests as sqlite

* 30 failed
* 99% was OK

Time: 62335ms

---- ---- ---- ---- ---- ---- ----
### 69/621 [`./test/index/commute/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10121 tests as sqlite

* 100% was OK

Time: 49370ms

---- ---- ---- ---- ---- ---- ----
### 70/621 [`./test/index/commute/100/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10122 tests as sqlite

* 10 failed
* 99% was OK

Time: 45824ms

---- ---- ---- ---- ---- ---- ----
### 71/621 [`./test/index/commute/100/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10123 tests as sqlite

* 100% was OK

Time: 38161ms

---- ---- ---- ---- ---- ---- ----
### 72/621 [`./test/index/commute/100/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10122 tests as sqlite

* 10 failed
* 99% was OK

Time: 39070ms

---- ---- ---- ---- ---- ---- ----
### 73/621 [`./test/index/commute/100/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/100/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10123 tests as sqlite

* 100% was OK

Time: 34785ms

---- ---- ---- ---- ---- ---- ----
### 74/621 [`./test/index/commute/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 4741 tests as sqlite

* 100% was OK

Time: 69751ms

---- ---- ---- ---- ---- ---- ----
### 75/621 [`./test/index/commute/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10583 tests as sqlite

* 20 failed
* 99% was OK

Time: 177307ms

---- ---- ---- ---- ---- ---- ----
### 76/621 [`./test/index/commute/1000/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 11021 tests as sqlite

* 10 failed
* 99% was OK

Time: 171026ms

---- ---- ---- ---- ---- ---- ----
### 77/621 [`./test/index/commute/1000/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/1000/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 11025 tests as sqlite

* 100% was OK

Time: 267845ms

---- ---- ---- ---- ---- ---- ----
### 78/621 [`./test/index/delete/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10907 tests as sqlite

* 100% was OK

Time: 20450ms

---- ---- ---- ---- ---- ---- ----
### 79/621 [`./test/index/delete/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10730 tests as sqlite

* 100% was OK

Time: 20839ms

---- ---- ---- ---- ---- ---- ----
### 80/621 [`./test/index/delete/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10774 tests as sqlite

* 100% was OK

Time: 20413ms

---- ---- ---- ---- ---- ---- ----
### 81/621 [`./test/index/delete/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 9390 tests as sqlite

* 100% was OK

Time: 21059ms

---- ---- ---- ---- ---- ---- ----
### 82/621 [`./test/index/delete/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10065 tests as sqlite

* 100% was OK

Time: 20780ms

---- ---- ---- ---- ---- ---- ----
### 83/621 [`./test/index/delete/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10599 tests as sqlite

* 100% was OK

Time: 20477ms

---- ---- ---- ---- ---- ---- ----
### 84/621 [`./test/index/delete/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10353 tests as sqlite

* 100% was OK

Time: 19984ms

---- ---- ---- ---- ---- ---- ----
### 85/621 [`./test/index/delete/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 11145 tests as sqlite

* 100% was OK

Time: 20912ms

---- ---- ---- ---- ---- ---- ----
### 86/621 [`./test/index/delete/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10895 tests as sqlite

* 100% was OK

Time: 21235ms

---- ---- ---- ---- ---- ---- ----
### 87/621 [`./test/index/delete/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 11033 tests as sqlite

* 100% was OK

Time: 21158ms

---- ---- ---- ---- ---- ---- ----
### 88/621 [`./test/index/delete/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/100/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10942 tests as sqlite

* 100% was OK

Time: 21431ms

---- ---- ---- ---- ---- ---- ----
### 89/621 [`./test/index/delete/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1000/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 11924 tests as sqlite

* 100% was OK

Time: 25793ms

---- ---- ---- ---- ---- ---- ----
### 90/621 [`./test/index/delete/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1000/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 11838 tests as sqlite

* 100% was OK

Time: 21220ms

---- ---- ---- ---- ---- ---- ----
### 91/621 [`./test/index/delete/10000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10000/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 20347 tests as sqlite

* 100% was OK

Time: 38790ms

---- ---- ---- ---- ---- ---- ----
### 92/621 [`./test/index/in/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10035 tests as sqlite

* 30 failed
* 99% was OK

Time: 96242ms

---- ---- ---- ---- ---- ---- ----
### 93/621 [`./test/index/in/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10036 tests as sqlite

* 30 failed
* 99% was OK

Time: 95268ms

---- ---- ---- ---- ---- ---- ----
### 94/621 [`./test/index/in/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10035 tests as sqlite

* 100% was OK

Time: 90013ms

---- ---- ---- ---- ---- ---- ----
### 95/621 [`./test/index/in/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10037 tests as sqlite

* 100% was OK

Time: 85376ms

---- ---- ---- ---- ---- ---- ----
### 96/621 [`./test/index/in/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10038 tests as sqlite

* 30 failed
* 99% was OK

Time: 88160ms

---- ---- ---- ---- ---- ---- ----
### 97/621 [`./test/index/in/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10038 tests as sqlite

* 15 failed
* 99% was OK

Time: 84551ms

---- ---- ---- ---- ---- ---- ----
### 98/621 [`./test/index/in/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10128 tests as sqlite

* 30 failed
* 99% was OK

Time: 87854ms

---- ---- ---- ---- ---- ---- ----
### 99/621 [`./test/index/in/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10127 tests as sqlite

* 15 failed
* 99% was OK

Time: 94344ms

---- ---- ---- ---- ---- ---- ----
### 100/621 [`./test/index/in/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10128 tests as sqlite

* 15 failed
* 99% was OK

Time: 95453ms

---- ---- ---- ---- ---- ---- ----
### 101/621 [`./test/index/in/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10126 tests as sqlite

* 15 failed
* 99% was OK

Time: 92853ms

---- ---- ---- ---- ---- ---- ----
### 102/621 [`./test/index/in/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/100/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10127 tests as sqlite

* 15 failed
* 99% was OK

Time: 99149ms

---- ---- ---- ---- ---- ---- ----
### 103/621 [`./test/index/in/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 11028 tests as sqlite

* 60 failed
* 99% was OK

Time: 405426ms

---- ---- ---- ---- ---- ---- ----
### 104/621 [`./test/index/in/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/1000/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 11024 tests as sqlite

* 100% was OK

Time: 314448ms

---- ---- ---- ---- ---- ---- ----
### 105/621 [`./test/index/orderby/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 30710ms

---- ---- ---- ---- ---- ---- ----
### 106/621 [`./test/index/orderby/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 28944ms

---- ---- ---- ---- ---- ---- ----
### 107/621 [`./test/index/orderby/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_10.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 32043ms

---- ---- ---- ---- ---- ---- ----
### 108/621 [`./test/index/orderby/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_11.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 28450ms

---- ---- ---- ---- ---- ---- ----
### 109/621 [`./test/index/orderby/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_12.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 30350ms

---- ---- ---- ---- ---- ---- ----
### 110/621 [`./test/index/orderby/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_13.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 31308ms

---- ---- ---- ---- ---- ---- ----
### 111/621 [`./test/index/orderby/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_14.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 26636ms

---- ---- ---- ---- ---- ---- ----
### 112/621 [`./test/index/orderby/10/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_15.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 36813ms

---- ---- ---- ---- ---- ---- ----
### 113/621 [`./test/index/orderby/10/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_16.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 32403ms

---- ---- ---- ---- ---- ---- ----
### 114/621 [`./test/index/orderby/10/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_17.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 38468ms

---- ---- ---- ---- ---- ---- ----
### 115/621 [`./test/index/orderby/10/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_18.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 35124ms

---- ---- ---- ---- ---- ---- ----
### 116/621 [`./test/index/orderby/10/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_19.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 26370ms

---- ---- ---- ---- ---- ---- ----
### 117/621 [`./test/index/orderby/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 32962ms

---- ---- ---- ---- ---- ---- ----
### 118/621 [`./test/index/orderby/10/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10052 tests as sqlite

* 60 failed
* 99% was OK

Time: 29490ms

---- ---- ---- ---- ---- ---- ----
### 119/621 [`./test/index/orderby/10/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_21.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 33579ms

---- ---- ---- ---- ---- ---- ----
### 120/621 [`./test/index/orderby/10/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_22.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 31675ms

---- ---- ---- ---- ---- ---- ----
### 121/621 [`./test/index/orderby/10/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_23.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 28569ms

---- ---- ---- ---- ---- ---- ----
### 122/621 [`./test/index/orderby/10/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_24.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 26654ms

---- ---- ---- ---- ---- ---- ----
### 123/621 [`./test/index/orderby/10/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_25.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 26376ms

---- ---- ---- ---- ---- ---- ----
### 124/621 [`./test/index/orderby/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 34083ms

---- ---- ---- ---- ---- ---- ----
### 125/621 [`./test/index/orderby/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 25752ms

---- ---- ---- ---- ---- ---- ----
### 126/621 [`./test/index/orderby/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 26397ms

---- ---- ---- ---- ---- ---- ----
### 127/621 [`./test/index/orderby/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10048 tests as sqlite

* 100% was OK

Time: 32532ms

---- ---- ---- ---- ---- ---- ----
### 128/621 [`./test/index/orderby/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 30050ms

---- ---- ---- ---- ---- ---- ----
### 129/621 [`./test/index/orderby/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 31625ms

---- ---- ---- ---- ---- ---- ----
### 130/621 [`./test/index/orderby/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 29449ms

---- ---- ---- ---- ---- ---- ----
### 131/621 [`./test/index/orderby/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10141 tests as sqlite

* 100% was OK

Time: 36929ms

---- ---- ---- ---- ---- ---- ----
### 132/621 [`./test/index/orderby/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10140 tests as sqlite

* 100% was OK

Time: 34609ms

---- ---- ---- ---- ---- ---- ----
### 133/621 [`./test/index/orderby/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10142 tests as sqlite

* 100% was OK

Time: 34492ms

---- ---- ---- ---- ---- ---- ----
### 134/621 [`./test/index/orderby/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/100/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10140 tests as sqlite

* 60 failed
* 99% was OK

Time: 34542ms

---- ---- ---- ---- ---- ---- ----
### 135/621 [`./test/index/orderby/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 11043 tests as sqlite

* 60 failed
* 99% was OK

Time: 240750ms

---- ---- ---- ---- ---- ---- ----
### 136/621 [`./test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 29477ms

---- ---- ---- ---- ---- ---- ----
### 137/621 [`./test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 33330ms

---- ---- ---- ---- ---- ---- ----
### 138/621 [`./test/index/orderby_nosort/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_10.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 38239ms

---- ---- ---- ---- ---- ---- ----
### 139/621 [`./test/index/orderby_nosort/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_11.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 28949ms

---- ---- ---- ---- ---- ---- ----
### 140/621 [`./test/index/orderby_nosort/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_12.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 29116ms

---- ---- ---- ---- ---- ---- ----
### 141/621 [`./test/index/orderby_nosort/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_13.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 30834ms

---- ---- ---- ---- ---- ---- ----
### 142/621 [`./test/index/orderby_nosort/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_14.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 26212ms

---- ---- ---- ---- ---- ---- ----
### 143/621 [`./test/index/orderby_nosort/10/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_15.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 31214ms

---- ---- ---- ---- ---- ---- ----
### 144/621 [`./test/index/orderby_nosort/10/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_16.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 31859ms

---- ---- ---- ---- ---- ---- ----
### 145/621 [`./test/index/orderby_nosort/10/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_17.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 31261ms

---- ---- ---- ---- ---- ---- ----
### 146/621 [`./test/index/orderby_nosort/10/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_18.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 34602ms

---- ---- ---- ---- ---- ---- ----
### 147/621 [`./test/index/orderby_nosort/10/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_19.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 30830ms

---- ---- ---- ---- ---- ---- ----
### 148/621 [`./test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 29064ms

---- ---- ---- ---- ---- ---- ----
### 149/621 [`./test/index/orderby_nosort/10/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_20.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 31239ms

---- ---- ---- ---- ---- ---- ----
### 150/621 [`./test/index/orderby_nosort/10/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_21.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 34959ms

---- ---- ---- ---- ---- ---- ----
### 151/621 [`./test/index/orderby_nosort/10/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_22.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 28449ms

---- ---- ---- ---- ---- ---- ----
### 152/621 [`./test/index/orderby_nosort/10/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_23.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 27400ms

---- ---- ---- ---- ---- ---- ----
### 153/621 [`./test/index/orderby_nosort/10/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_24.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 32373ms

---- ---- ---- ---- ---- ---- ----
### 154/621 [`./test/index/orderby_nosort/10/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_25.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 30262ms

---- ---- ---- ---- ---- ---- ----
### 155/621 [`./test/index/orderby_nosort/10/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_26.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 29435ms

---- ---- ---- ---- ---- ---- ----
### 156/621 [`./test/index/orderby_nosort/10/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_27.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 29347ms

---- ---- ---- ---- ---- ---- ----
### 157/621 [`./test/index/orderby_nosort/10/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_28.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 30240ms

---- ---- ---- ---- ---- ---- ----
### 158/621 [`./test/index/orderby_nosort/10/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_29.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 29618ms

---- ---- ---- ---- ---- ---- ----
### 159/621 [`./test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 30797ms

---- ---- ---- ---- ---- ---- ----
### 160/621 [`./test/index/orderby_nosort/10/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_30.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 32259ms

---- ---- ---- ---- ---- ---- ----
### 161/621 [`./test/index/orderby_nosort/10/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_31.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 33152ms

---- ---- ---- ---- ---- ---- ----
### 162/621 [`./test/index/orderby_nosort/10/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_32.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 27770ms

---- ---- ---- ---- ---- ---- ----
### 163/621 [`./test/index/orderby_nosort/10/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_33.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 33557ms

---- ---- ---- ---- ---- ---- ----
### 164/621 [`./test/index/orderby_nosort/10/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_34.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 33816ms

---- ---- ---- ---- ---- ---- ----
### 165/621 [`./test/index/orderby_nosort/10/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_35.test)

_Mimic sqlite_
#### ★ Ran 10049 tests as sqlite

* 100% was OK

Time: 33745ms

---- ---- ---- ---- ---- ---- ----
### 166/621 [`./test/index/orderby_nosort/10/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_36.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 40084ms

---- ---- ---- ---- ---- ---- ----
### 167/621 [`./test/index/orderby_nosort/10/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_37.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 33530ms

---- ---- ---- ---- ---- ---- ----
### 168/621 [`./test/index/orderby_nosort/10/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_38.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 35139ms

---- ---- ---- ---- ---- ---- ----
### 169/621 [`./test/index/orderby_nosort/10/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_39.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 37389ms

---- ---- ---- ---- ---- ---- ----
### 170/621 [`./test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 42388ms

---- ---- ---- ---- ---- ---- ----
### 171/621 [`./test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 31667ms

---- ---- ---- ---- ---- ---- ----
### 172/621 [`./test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 28933ms

---- ---- ---- ---- ---- ---- ----
### 173/621 [`./test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 32040ms

---- ---- ---- ---- ---- ---- ----
### 174/621 [`./test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 42912ms

---- ---- ---- ---- ---- ---- ----
### 175/621 [`./test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10055 tests as sqlite

* 100% was OK

Time: 32825ms

---- ---- ---- ---- ---- ---- ----
### 176/621 [`./test/index/orderby_nosort/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10149 tests as sqlite

* 100% was OK

Time: 47124ms

---- ---- ---- ---- ---- ---- ----
### 177/621 [`./test/index/orderby_nosort/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10141 tests as sqlite

* 100% was OK

Time: 40673ms

---- ---- ---- ---- ---- ---- ----
### 178/621 [`./test/index/orderby_nosort/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10142 tests as sqlite

* 100% was OK

Time: 35293ms

---- ---- ---- ---- ---- ---- ----
### 179/621 [`./test/index/orderby_nosort/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10143 tests as sqlite

* 100% was OK

Time: 34982ms

---- ---- ---- ---- ---- ---- ----
### 180/621 [`./test/index/orderby_nosort/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10141 tests as sqlite

* 100% was OK

Time: 39729ms

---- ---- ---- ---- ---- ---- ----
### 181/621 [`./test/index/orderby_nosort/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10142 tests as sqlite

* 100% was OK

Time: 33714ms

---- ---- ---- ---- ---- ---- ----
### 182/621 [`./test/index/orderby_nosort/100/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/100/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10144 tests as sqlite

* 100% was OK

Time: 41762ms

---- ---- ---- ---- ---- ---- ----
### 183/621 [`./test/index/orderby_nosort/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/1000/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 11040 tests as sqlite

* 100% was OK

Time: 289504ms

---- ---- ---- ---- ---- ---- ----
### 184/621 [`./test/index/orderby_nosort/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/1000/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 11043 tests as sqlite

* 100% was OK

Time: 152546ms

---- ---- ---- ---- ---- ---- ----
### 185/621 [`./test/index/random/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_0.test)

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

#### ☓ Ran 10032 tests as sqlite

* 790 failed
* 92% was OK

Time: 18081ms

---- ---- ---- ---- ---- ---- ----
### 186/621 [`./test/index/random/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col3 + - 41 + - col0 * + - 47 + + + col0 / 37 FROM tab1 WHERE NULL IS NULL

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT ALL + col2 FROM tab0 WHERE NOT - - 10 <= - + col4 - - col3

Expected: ["0","0","0","0"] but got ["hzanm","lktfw","mguub","mwyzu"]
```

#### ☓ Ran 10034 tests as sqlite

* 730 failed
* 92% was OK

Time: 19549ms

---- ---- ---- ---- ---- ---- ----
### 187/621 [`./test/index/random/10/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT col5 FROM tab0 WHERE ( 99 ) NOT BETWEEN ( NULL ) AND col1

Expected: ["0"] but got ["eapur","fgqwx","igtci","oggnp","plcxd","qbrdd","qqeza","rywts","shkjt","zsgry"]
```


```sql
SELECT ALL + col2 AS col2 FROM tab0 WHERE NOT ( + + col0 - + + col1 ) >= ( col1 )

Expected: ["0","0","0","0","0","0"] but got ["gaven","qlgja","qnpgu","xobsl","youok","yqgcu"]
```

#### ☓ Ran 10034 tests as sqlite

* 850 failed
* 91% was OK

Time: 18160ms

---- ---- ---- ---- ---- ---- ----
### 188/621 [`./test/index/random/10/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10031 tests as sqlite

* 790 failed
* 92% was OK

Time: 17955ms

---- ---- ---- ---- ---- ---- ----
### 189/621 [`./test/index/random/10/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT col1 * CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT col3 < + 71

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0","0","0"]
```


```sql
SELECT col5 AS col4 FROM tab0 AS cor0 WHERE col0 NOT BETWEEN ( NULL ) AND ( + col1 )

Expected: ["0","0","0","0","0","0"] but got ["akvhd","duptn","efltn","gwglv","nermp","qvevz","qxdmc","qywiw","ucstb","ukpjw"]
```

#### ☓ Ran 10033 tests as sqlite

* 860 failed
* 91% was OK

Time: 18059ms

---- ---- ---- ---- ---- ---- ----
### 190/621 [`./test/index/random/10/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT + col5 col3 FROM tab0 WHERE + col1 NOT BETWEEN - 96 AND col0

Expected: ["0","0","0","0","0","0"] but got ["hbwys","kxrzu","qbdwp","vruch","xarlb","ybarm"]
```


```sql
SELECT col5 AS col3 FROM tab0 WHERE NOT ( ( + 45 ) BETWEEN NULL AND col1 )

Expected: ["0"] but got ["hbwys","kxrzu","lkyfk","pavon","pfxqp","qbdwp","vruch","xarlb","ybarm","ziuqv"]
```


```sql
SELECT DISTINCT - ( - ( - + CAST ( NULL AS INTEGER ) ) ), CAST ( NULL AS INTEGER ) + + 80 AS col1 FROM tab0 AS cor0 WHERE NULL IS NULL

Expected: ["NULL","NULL"] but got ["0","80"]
```

#### ☓ Ran 10032 tests as sqlite

* 885 failed
* 91% was OK

Time: 17780ms

---- ---- ---- ---- ---- ---- ----
### 191/621 [`./test/index/random/10/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_14.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + col3 AS col5, 78 AS col5 FROM tab0 cor0 WHERE 35 + col0 IS NOT NULL

2 results returned but expected 20
```


```sql
SELECT ALL + col5 AS col3 FROM tab0 WHERE - + col1 NOT BETWEEN NULL AND - col3

Expected: ["0","0","0"] but got ["cnoua","dunwk","gxohz","jnwpl","kgygk","pfoxu","pgyvg","swdpn","tzczq","zdmee"]
```


```sql
SELECT + ( - - MAX ( DISTINCT - col0 ) ) - - 76 AS col4, 30 FROM tab0 AS cor0 WHERE ( NULL ) IN ( col3 )

Expected: ["NULL","30"] but got ["30","NULL"]
```

#### ☓ Ran 10031 tests as sqlite

* 815 failed
* 91% was OK

Time: 17860ms

---- ---- ---- ---- ---- ---- ----
### 192/621 [`./test/index/random/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT col5 FROM tab0 WHERE - ( - col1 ) <= + col0

Expected: ["0","0","0","0","0","0"] but got ["bqisj","gtdhg","mylwf","tlesg","vrkrw","ylzxx"]
```


```sql
SELECT - CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 WHERE NOT col4 > + + col1

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10034 tests as sqlite

* 910 failed
* 90% was OK

Time: 21430ms

---- ---- ---- ---- ---- ---- ----
### 193/621 [`./test/index/random/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT + col2 AS col1 FROM tab0 WHERE NOT col1 <= col4

Expected: ["0","0","0","0","0"] but got ["ayfdf","iiegz","kaetk","reayu","unszc"]
```


```sql
SELECT col5 col1 FROM tab0 AS cor0 WHERE NOT col0 < + col1

Expected: ["0","0"] but got ["hkqiq","wjfwi"]
```

#### ☓ Ran 10034 tests as sqlite

* 680 failed
* 93% was OK

Time: 18111ms

---- ---- ---- ---- ---- ---- ----
### 194/621 [`./test/index/random/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10033 tests as sqlite

* 735 failed
* 92% was OK

Time: 18384ms

---- ---- ---- ---- ---- ---- ----
### 195/621 [`./test/index/random/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT + col2 col5 FROM tab0 AS cor0 WHERE ( col4 ) BETWEEN col0 AND - 96 * - col3

Expected: ["0","0","0"] but got ["amwpr","ehefd","uxbns"]
```

#### ☓ Ran 10034 tests as sqlite

* 735 failed
* 92% was OK

Time: 17228ms

---- ---- ---- ---- ---- ---- ----
### 196/621 [`./test/index/random/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT + col2 FROM tab0 WHERE ( 60 + + col3 ) < ( + col0 )

Expected: ["0","0","0","0","0"] but got ["gvttq","qvahk","tgsmz","zfxgo","zkoew"]
```


```sql
SELECT col2 FROM tab0 WHERE + col0 * + col0 + - col4 * col3 <= ( + col1 + col4 * - 0 ) OR ( + 57 * + col0 ) = NULL

Expected: ["0","0"] but got ["naijw","wodwv"]
```

#### ☓ Ran 10034 tests as sqlite

* 780 failed
* 92% was OK

Time: 17708ms

---- ---- ---- ---- ---- ---- ----
### 197/621 [`./test/index/random/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL col2 AS col5 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0"] but got ["hmsci"]
```

#### ☓ Ran 10031 tests as sqlite

* 675 failed
* 93% was OK

Time: 17686ms

---- ---- ---- ---- ---- ---- ----
### 198/621 [`./test/index/random/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT + col5 AS col5 FROM tab0 AS cor0 WHERE + col4 NOT BETWEEN NULL AND + col3

Expected: ["0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","swsmt","texha","ttvlt","vzeio","ylxxs","zwzyz"]
```


```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE col4 NOT BETWEEN - ( - 32 ) AND - CAST ( - col1 AS INTEGER )

Expected: ["0","0","0","0","0"] but got ["apjmo","dubev","ithfo","ktnfz","vzeio"]
```

#### ☓ Ran 10032 tests as sqlite

* 745 failed
* 92% was OK

Time: 17977ms

---- ---- ---- ---- ---- ---- ----
### 199/621 [`./test/index/random/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT col5 AS col1 FROM tab0 AS cor0 WHERE + 80 + col4 > - - col1 + col3

Expected: ["0","0"] but got ["axwip","klkhp"]
```

#### ☓ Ran 10031 tests as sqlite

* 740 failed
* 92% was OK

Time: 17676ms

---- ---- ---- ---- ---- ---- ----
### 200/621 [`./test/index/random/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/100/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT col2 AS col0 FROM tab0 WHERE NOT - - col0 >= 54 + 23

Expected: ["0"] but got ["qckcw"]
```

#### ☓ Ran 10123 tests as sqlite

* 715 failed
* 92% was OK

Time: 23188ms

---- ---- ---- ---- ---- ---- ----
### 201/621 [`./test/index/random/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT col5 col5 FROM tab0 WHERE NOT ( ( col1 ) ) >= + ( - 80 ) * - 31 - col0

Expected: ["0","0","0","0"] but got ["kjkvp","rrlwc","uhpvq","ydhme"]
```

#### ☓ Ran 10123 tests as sqlite

* 655 failed
* 93% was OK

Time: 25476ms

---- ---- ---- ---- ---- ---- ----
### 202/621 [`./test/index/random/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 2067 tests as sqlite

* 70 failed
* 96% was OK

Time: 12233ms

---- ---- ---- ---- ---- ---- ----
### 203/621 [`./test/index/random/1000/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 1056 tests as sqlite

* 5 failed
* 99% was OK

Time: 1827ms

---- ---- ---- ---- ---- ---- ----
### 204/621 [`./test/index/random/1000/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 1027 tests as sqlite

* 100% was OK

Time: 1617ms

---- ---- ---- ---- ---- ---- ----
### 205/621 [`./test/index/random/1000/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 1033 tests as sqlite

* 100% was OK

Time: 1660ms

---- ---- ---- ---- ---- ---- ----
### 206/621 [`./test/index/random/1000/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 1032 tests as sqlite

* 5 failed
* 99% was OK

Time: 1680ms

---- ---- ---- ---- ---- ---- ----
### 207/621 [`./test/index/random/1000/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 4333 tests as sqlite

* 265 failed
* 93% was OK

Time: 22006ms

---- ---- ---- ---- ---- ---- ----
### 208/621 [`./test/index/random/1000/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0 AS cor0 WHERE ( col3 ) IN ( + col0 )

Expected: ["750","79","2150","0","79","1716","0"] but got ["750","79","2150.540","kuzlf","79","1716.500","wqnrb"]
```


```sql
SELECT ALL - MAX ( + CAST ( + CAST ( NULL AS REAL ) AS INTEGER ) ) * - 20 AS col1 FROM tab2 AS cor0 WHERE NOT col4 * + 92 + - col3 + + - 37 + - 63 * - + col0 = NULL

Wrong conversion type
```

#### ☓ Ran 11021 tests as sqlite

* 725 failed
* 93% was OK

Time: 63417ms

---- ---- ---- ---- ---- ---- ----
### 209/621 [`./test/index/random/1000/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT ALL col2 FROM tab0 WHERE - + col3 BETWEEN - 72 AND 50 + + 78

Expected: ["0","0","0","0","0"] but got ["ernxs","orpfh","pirjf","tbpkm","zphbq"]
```

#### ☓ Ran 11022 tests as sqlite

* 780 failed
* 92% was OK

Time: 61921ms

---- ---- ---- ---- ---- ---- ----
### 210/621 [`./test/index/random/1000/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/1000/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 4841 tests as sqlite

* 310 failed
* 93% was OK

Time: 25325ms

---- ---- ---- ---- ---- ---- ----
### 211/621 [`./test/index/view/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_0.test)

_Mimic sqlite_
Time: 8ms

---- ---- ---- ---- ---- ---- ----
### 212/621 [`./test/index/view/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_1.test)

_Mimic sqlite_

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
* 91 failed
* 4% was OK

Time: 2298ms

---- ---- ---- ---- ---- ---- ----
### 213/621 [`./test/index/view/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_2.test)

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
SELECT pk, col0 FROM view_2_tab0_305

Expected: ["6","56","7","70","8","75"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_305

Expected: ["0","1","2","3","4","5","9"] but got ["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]
```


```sql
SELECT * FROM view_3_tab0_316

Expected: ["6","7","8"] but got ["NULL","NULL","NULL"]
```


```sql
CREATE VIEW view_1_tab0_367 AS SELECT pk, col0 FROM tab0 WHERE col3 IS NULL OR (((col0 < 64 AND (col0 BETWEEN 25 AND 41) AND (col4 >= 33.34) OR (col4 < 22.72 AND (col0 >= 61)) AND (col0 > 4) OR col0 >= 0 OR col0 >= 45 AND col3 IN (SELECT col0 FROM t…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7465 tests as sqlite

* 1028 skipped
* 1361 failed
* 67% was OK

Time: 13401ms

---- ---- ---- ---- ---- ---- ----
### 214/621 [`./test/index/view/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_3.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_408 AS SELECT pk, col0 FROM tab0 WHERE col3 IS NULL AND (((((col1 < 63.79))) OR col0 >= 35 AND col4 > 76.20 AND col0 = 84 OR col0 <= 76 AND col3 IN (SELECT col0 FROM tab0 WHERE col4 = 39.20 AND col3 <= 5)))

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7271 tests as sqlite

* 4133 skipped
* 716 failed
* 33% was OK

Time: 6431ms

---- ---- ---- ---- ---- ---- ----
### 215/621 [`./test/index/view/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM view_1_tab2_480 UNION ALL SELECT pk, col0 FROM view_2_tab2_480

Correct amount of values returned but hash was different than expected.
```


```sql
CREATE VIEW view_1_tab0_519 AS SELECT pk, col0 FROM tab0 WHERE (((col0 >= 39) OR (col1 < 88.77) AND (((col1 <= 79.45) AND col0 IN (83,70,92,44,74) AND col4 < 94.64 OR col0 > 49 AND (col3 >= 51 OR col0 > 38)) OR col0 < 10 OR col1 > 79.73 AND col3 > 5…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7563 tests as sqlite

* 223 skipped
* 1526 failed
* 76% was OK

Time: 12746ms

---- ---- ---- ---- ---- ---- ----
### 216/621 [`./test/index/view/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_5.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_726 AS SELECT pk, col0 FROM tab0 WHERE col0 > 84 AND col4 <= 74.98 AND col1 IN (SELECT col4 FROM tab0 WHERE (col4 > 35.62) AND ((col3 > 33) AND (((((col3 > 1))) AND (col0 = 21 OR (((col3 > 79))) AND (col1 < 18.85) AND ((col3 …

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7384 tests as sqlite

* 1143 skipped
* 1371 failed
* 65% was OK

Time: 11425ms

---- ---- ---- ---- ---- ---- ----
### 217/621 [`./test/index/view/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_6.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_984 AS SELECT pk, col0 FROM tab0 WHERE (col0 > 42) AND ((col1 IS NULL)) OR ((((col3 > 72)))) OR (((col3 <= 90) AND ((col0 > 68)) AND (col0 IN (45,3,50,1) OR col4 < 9.99 OR col3 IN (76,97,24) AND col1 > 8.58 AND (col0 = 3) AND…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 6492 tests as sqlite

* 2753 skipped
* 806 failed
* 45% was OK

Time: 7323ms

---- ---- ---- ---- ---- ---- ----
### 218/621 [`./test/index/view/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_7.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_1042 AS SELECT pk, col0 FROM tab0 WHERE ((col0 > 16 OR ((col0 < 9 OR col3 IN (SELECT col0 FROM tab0 WHERE (col0 < 94) AND col0 <= 61))) AND col3 = 18 OR col3 < 55 AND col3 IN (76,76) OR col3 >= 86 AND ((((((col0 < 9)))) AND c…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7533 tests as sqlite

* 4593 skipped
* 646 failed
* 30% was OK

Time: 5959ms

---- ---- ---- ---- ---- ---- ----
### 219/621 [`./test/index/view/100/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_0.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_93 AS SELECT pk, col0 FROM tab0 WHERE col4 < 813.50 AND col0 >= 561 AND (col4 >= 32.37 AND col0 IN (SELECT col3 FROM tab0 WHERE (col0 > 117))) AND (col1 < 303.87) OR col1 = 218.35

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8623 tests as sqlite

* 6893 skipped
* 677 failed
* 12% was OK

Time: 4971ms

---- ---- ---- ---- ---- ---- ----
### 220/621 [`./test/index/view/100/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT pk, col0 FROM tab1 WHERE (col1 IN (344.84,326.40,509.8,263.0)) UNION SELECT pk, col0 FROM tab1 WHERE NOT ((col1 IN (344.84,326.40,509.8,263.0)))

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT pk, col0 FROM tab3 WHERE (((col3 <= 275) AND (col3 > 343) OR col3 <= 418) OR col1 IS NULL OR col0 = 469 AND col3 IN (894,78,357))

Correct amount of values returned but hash was different than expected.
```

#### ☓ Ran 7122 tests as sqlite

* 2876 failed
* 59% was OK

Time: 17636ms

---- ---- ---- ---- ---- ---- ----
### 221/621 [`./test/index/view/100/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_2.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_534 AS SELECT pk, col0 FROM tab0 WHERE col0 < 152 OR (((col1 >= 904.26) AND ((col0 > 91))) OR col1 > 173.50 OR col3 < 641 AND col0 > 612 OR ((((col1 <= 635.91) OR col1 <= 876.74 OR col1 > 329.50 AND ((((((col3 < 593) OR ((col…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 8235 tests as sqlite

* 7008 skipped
* 457 failed
* 9% was OK

Time: 3884ms

---- ---- ---- ---- ---- ---- ----
### 222/621 [`./test/index/view/100/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_3.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_602 AS SELECT pk, col0 FROM tab0 WHERE col0 IN (SELECT col3 FROM tab0 WHERE col0 >= 795) OR col3 >= 543 OR col3 > 991 AND (((col3 < 927 OR (col3 < 430)) AND (col0 > 590) OR (col0 >= 449 AND col4 > 729.35 OR (((col3 >= 745 AND…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7174 tests as sqlite

* 6548 skipped
* 207 failed
* 5% was OK

Time: 2556ms

---- ---- ---- ---- ---- ---- ----
### 223/621 [`./test/index/view/100/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_4.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_869 AS SELECT pk, col0 FROM tab0 WHERE (((col0 > 796 OR ((((col0 < 642)) AND (((((col1 < 435.47 AND col0 = 220)) AND (col0 > 695) AND col3 > 66 AND (col4 > 262.50))) OR col0 > 828 AND ((col0 >= 606 AND col1 <= 821.18)) OR (co…

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 6935 tests as sqlite

* 108 skipped
* 2712 failed
* 59% was OK

Time: 17181ms

---- ---- ---- ---- ---- ---- ----
### 224/621 [`./test/index/view/100/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/100/slt_good_5.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_901 AS SELECT pk, col0 FROM tab0 WHERE col4 BETWEEN 290.87 AND 700.72 AND col3 IS NULL AND col0 < 835 OR (((col0 IS NULL)) AND (col3 = 615)) OR col0 >= 743 AND col1 = 720.37 OR col0 IN (SELECT col3 FROM tab0 WHERE (((col4 <= …

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7949 tests as sqlite

* 4823 skipped
* 1217 failed
* 24% was OK

Time: 7782ms

---- ---- ---- ---- ---- ---- ----
### 225/621 [`./test/index/view/1000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/1000/slt_good_0.test)

_Mimic sqlite_

```sql
CREATE VIEW view_1_tab0_742 AS SELECT pk, col0 FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE (col1 < 3863.93))) OR ((col0 >= 5861) AND col0 >= 2066)

Cannot read property 'columns' of undefined
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7630 tests as sqlite

* 6203 skipped
* 167 failed
* 16% was OK

Time: 9696ms

---- ---- ---- ---- ---- ---- ----
### 226/621 [`./test/index/view/10000/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10000/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10622 tests as sqlite

* 271 failed
* 97% was OK

Time: 1091859ms

---- ---- ---- ---- ---- ---- ----
### 227/621 [`./test/random/aggregates/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL + col0 AS col1, + CAST ( NULL AS INTEGER ) + + col2 FROM tab0 AS cor0

Expected: ["15","NULL","87","NULL","97","NULL"] but got ["15","47","87","10","97","99"]
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

#### ☓ Ran 10012 tests as sqlite

* 1588 failed
* 84% was OK

Time: 18315ms

---- ---- ---- ---- ---- ---- ----
### 228/621 [`./test/random/aggregates/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1374 failed
* 86% was OK

Time: 17431ms

---- ---- ---- ---- ---- ---- ----
### 229/621 [`./test/random/aggregates/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_10.test)

_Mimic sqlite_

```sql
SELECT - 55 * - col1 AS col0, col2 / CAST ( NULL AS INTEGER ) AS col0 FROM tab2

Expected: ["2805","NULL","3685","NULL","4235","NULL"] but got ["NULL","NULL","NULL","NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1656 failed
* 83% was OK

Time: 18412ms

---- ---- ---- ---- ---- ---- ----
### 230/621 [`./test/random/aggregates/slt_good_100.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_100.test)

_Mimic sqlite_

```sql
SELECT DISTINCT col2 AS col0, col0 / + - CAST ( + ( CAST ( NULL AS INTEGER ) ) AS INTEGER ) AS col0 FROM tab1

Expected: ["59","NULL","68","NULL","96","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1635 failed
* 83% was OK

Time: 18274ms

---- ---- ---- ---- ---- ---- ----
### 231/621 [`./test/random/aggregates/slt_good_101.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_101.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1677 failed
* 83% was OK

Time: 18262ms

---- ---- ---- ---- ---- ---- ----
### 232/621 [`./test/random/aggregates/slt_good_102.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_102.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1550 failed
* 84% was OK

Time: 18462ms

---- ---- ---- ---- ---- ---- ----
### 233/621 [`./test/random/aggregates/slt_good_103.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_103.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1568 failed
* 84% was OK

Time: 18352ms

---- ---- ---- ---- ---- ---- ----
### 234/621 [`./test/random/aggregates/slt_good_104.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_104.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1607 failed
* 83% was OK

Time: 18199ms

---- ---- ---- ---- ---- ---- ----
### 235/621 [`./test/random/aggregates/slt_good_105.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_105.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1667 failed
* 83% was OK

Time: 18412ms

---- ---- ---- ---- ---- ---- ----
### 236/621 [`./test/random/aggregates/slt_good_106.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_106.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1571 failed
* 84% was OK

Time: 18558ms

---- ---- ---- ---- ---- ---- ----
### 237/621 [`./test/random/aggregates/slt_good_107.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_107.test)

_Mimic sqlite_

```sql
SELECT ALL - col2 / + ( - + col1 ) * + 9 + - 13 FROM tab2

Expected: ["-13","-13","-13"] but got ["-12.904","-12.942","-12.950"]
```

#### ☓ Ran 10012 tests as sqlite

* 1519 failed
* 84% was OK

Time: 18390ms

---- ---- ---- ---- ---- ---- ----
### 238/621 [`./test/random/aggregates/slt_good_108.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_108.test)

_Mimic sqlite_

```sql
SELECT 12 / + - CAST ( NULL AS INTEGER ) AS col0, CAST ( NULL AS INTEGER ) AS col2 FROM tab0

Expected: ["NULL","NULL","NULL","NULL","NULL","NULL"] but got ["NULL","0","NULL","0","NULL","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1643 failed
* 83% was OK

Time: 18549ms

---- ---- ---- ---- ---- ---- ----
### 239/621 [`./test/random/aggregates/slt_good_109.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_109.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1629 failed
* 83% was OK

Time: 18682ms

---- ---- ---- ---- ---- ---- ----
### 240/621 [`./test/random/aggregates/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1661 failed
* 83% was OK

Time: 18983ms

---- ---- ---- ---- ---- ---- ----
### 241/621 [`./test/random/aggregates/slt_good_110.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_110.test)

_Mimic sqlite_

```sql
SELECT ALL + col0 / + 18 + - 75 + + ( + - col0 ) * col2 FROM tab2 AS cor0

Expected: ["-1131","-2632","-4421"] but got ["-1130.444","-2631.444","-4420.833"]
```


```sql
SELECT DISTINCT - CAST ( + + COUNT ( * ) AS INTEGER ) AS col1 FROM tab0 AS cor0

g is not defined
```

#### ☓ Ran 10012 tests as sqlite

* 1613 failed
* 83% was OK

Time: 18558ms

---- ---- ---- ---- ---- ---- ----
### 242/621 [`./test/random/aggregates/slt_good_111.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_111.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1651 failed
* 83% was OK

Time: 18571ms

---- ---- ---- ---- ---- ---- ----
### 243/621 [`./test/random/aggregates/slt_good_112.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_112.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1566 failed
* 84% was OK

Time: 18494ms

---- ---- ---- ---- ---- ---- ----
### 244/621 [`./test/random/aggregates/slt_good_113.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_113.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1598 failed
* 84% was OK

Time: 18772ms

---- ---- ---- ---- ---- ---- ----
### 245/621 [`./test/random/aggregates/slt_good_114.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_114.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1582 failed
* 84% was OK

Time: 18746ms

---- ---- ---- ---- ---- ---- ----
### 246/621 [`./test/random/aggregates/slt_good_115.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_115.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1565 failed
* 84% was OK

Time: 18630ms

---- ---- ---- ---- ---- ---- ----
### 247/621 [`./test/random/aggregates/slt_good_116.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_116.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1618 failed
* 83% was OK

Time: 18728ms

---- ---- ---- ---- ---- ---- ----
### 248/621 [`./test/random/aggregates/slt_good_117.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_117.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1611 failed
* 83% was OK

Time: 18542ms

---- ---- ---- ---- ---- ---- ----
### 249/621 [`./test/random/aggregates/slt_good_118.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_118.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1508 failed
* 84% was OK

Time: 18252ms

---- ---- ---- ---- ---- ---- ----
### 250/621 [`./test/random/aggregates/slt_good_119.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_119.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1602 failed
* 83% was OK

Time: 18397ms

---- ---- ---- ---- ---- ---- ----
### 251/621 [`./test/random/aggregates/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1646 failed
* 83% was OK

Time: 18551ms

---- ---- ---- ---- ---- ---- ----
### 252/621 [`./test/random/aggregates/slt_good_120.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_120.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1601 failed
* 84% was OK

Time: 18560ms

---- ---- ---- ---- ---- ---- ----
### 253/621 [`./test/random/aggregates/slt_good_121.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_121.test)

_Mimic sqlite_

```sql
SELECT - col2 col1, col0 AS col1 FROM tab0 cor0

Expected: ["-10","87","-47","15","-99","97"] but got ["15","15","87","87","97","97"]
```

#### ☓ Ran 10012 tests as sqlite

* 1582 failed
* 84% was OK

Time: 19842ms

---- ---- ---- ---- ---- ---- ----
### 254/621 [`./test/random/aggregates/slt_good_122.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_122.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1628 failed
* 83% was OK

Time: 19380ms

---- ---- ---- ---- ---- ---- ----
### 255/621 [`./test/random/aggregates/slt_good_123.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_123.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1644 failed
* 83% was OK

Time: 18807ms

---- ---- ---- ---- ---- ---- ----
### 256/621 [`./test/random/aggregates/slt_good_124.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_124.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1605 failed
* 83% was OK

Time: 18618ms

---- ---- ---- ---- ---- ---- ----
### 257/621 [`./test/random/aggregates/slt_good_125.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_125.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1669 failed
* 83% was OK

Time: 18743ms

---- ---- ---- ---- ---- ---- ----
### 258/621 [`./test/random/aggregates/slt_good_126.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_126.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1599 failed
* 84% was OK

Time: 18471ms

---- ---- ---- ---- ---- ---- ----
### 259/621 [`./test/random/aggregates/slt_good_127.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_127.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1629 failed
* 83% was OK

Time: 18589ms

---- ---- ---- ---- ---- ---- ----
### 260/621 [`./test/random/aggregates/slt_good_128.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_128.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1645 failed
* 83% was OK

Time: 18607ms

---- ---- ---- ---- ---- ---- ----
### 261/621 [`./test/random/aggregates/slt_good_129.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_129.test)

_Mimic sqlite_
#### ☓ Ran 802 tests as sqlite

* 132 failed
* 83% was OK

Time: 1525ms

---- ---- ---- ---- ---- ---- ----
### 262/621 [`./test/random/aggregates/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1532 failed
* 84% was OK

Time: 18306ms

---- ---- ---- ---- ---- ---- ----
### 263/621 [`./test/random/aggregates/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1667 failed
* 83% was OK

Time: 18594ms

---- ---- ---- ---- ---- ---- ----
### 264/621 [`./test/random/aggregates/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1625 failed
* 83% was OK

Time: 18844ms

---- ---- ---- ---- ---- ---- ----
### 265/621 [`./test/random/aggregates/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_16.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 95 + - 46 * - + 36 AS col1, - 69 / - CAST ( NULL AS INTEGER ) * + col1 * + col2 AS col1 FROM tab1

Expected: ["1751","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1574 failed
* 84% was OK

Time: 18768ms

---- ---- ---- ---- ---- ---- ----
### 266/621 [`./test/random/aggregates/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_17.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1565 failed
* 84% was OK

Time: 18676ms

---- ---- ---- ---- ---- ---- ----
### 267/621 [`./test/random/aggregates/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_18.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1583 failed
* 84% was OK

Time: 18841ms

---- ---- ---- ---- ---- ---- ----
### 268/621 [`./test/random/aggregates/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1643 failed
* 83% was OK

Time: 18727ms

---- ---- ---- ---- ---- ---- ----
### 269/621 [`./test/random/aggregates/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT - - 74 * 99 * - 64 - 84 * + CAST ( NULL AS INTEGER ) + + col2 + + 90 / col0 FROM tab0 cor0

Expected: ["NULL","NULL","NULL"] but got ["-468764.072","-468811","-468852.966"]
```

#### ☓ Ran 10012 tests as sqlite

* 1508 failed
* 84% was OK

Time: 18336ms

---- ---- ---- ---- ---- ---- ----
### 270/621 [`./test/random/aggregates/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1606 failed
* 83% was OK

Time: 18710ms

---- ---- ---- ---- ---- ---- ----
### 271/621 [`./test/random/aggregates/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1591 failed
* 84% was OK

Time: 19179ms

---- ---- ---- ---- ---- ---- ----
### 272/621 [`./test/random/aggregates/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_22.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1661 failed
* 83% was OK

Time: 18822ms

---- ---- ---- ---- ---- ---- ----
### 273/621 [`./test/random/aggregates/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_23.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - + COUNT ( * ) AS col2, + CAST ( NULL AS INTEGER ) AS col1 FROM tab1 AS cor0

Expected: ["-3","NULL"] but got ["-3","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1601 failed
* 84% was OK

Time: 18802ms

---- ---- ---- ---- ---- ---- ----
### 274/621 [`./test/random/aggregates/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1587 failed
* 84% was OK

Time: 18438ms

---- ---- ---- ---- ---- ---- ----
### 275/621 [`./test/random/aggregates/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_25.test)

_Mimic sqlite_

```sql
SELECT DISTINCT ( - - 78 ) / ( - 20 ) * - col2 / - CAST ( NULL AS INTEGER ) / + col2 AS col0, + ( col0 ) / + + col1 FROM tab2 AS cor0

Expected: ["NULL","0","NULL","1"] but got ["NULL","0.831","NULL","0.902","NULL","1.119"]
```


```sql
SELECT ALL 88 / - + COUNT ( * ) FROM tab0

Expected: ["-29"] but got ["-29.333"]
```

#### ☓ Ran 10012 tests as sqlite

* 1691 failed
* 83% was OK

Time: 18809ms

---- ---- ---- ---- ---- ---- ----
### 276/621 [`./test/random/aggregates/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_26.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col2 / col1 AS col2 FROM tab0 cor0

Expected: ["-99","0"] but got ["-0.476","-0.580","-99"]
```

#### ☓ Ran 10012 tests as sqlite

* 1613 failed
* 83% was OK

Time: 18743ms

---- ---- ---- ---- ---- ---- ----
### 277/621 [`./test/random/aggregates/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1634 failed
* 83% was OK

Time: 18512ms

---- ---- ---- ---- ---- ---- ----
### 278/621 [`./test/random/aggregates/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1659 failed
* 83% was OK

Time: 18871ms

---- ---- ---- ---- ---- ---- ----
### 279/621 [`./test/random/aggregates/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1653 failed
* 83% was OK

Time: 18873ms

---- ---- ---- ---- ---- ---- ----
### 280/621 [`./test/random/aggregates/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1666 failed
* 83% was OK

Time: 18812ms

---- ---- ---- ---- ---- ---- ----
### 281/621 [`./test/random/aggregates/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1615 failed
* 83% was OK

Time: 18706ms

---- ---- ---- ---- ---- ---- ----
### 282/621 [`./test/random/aggregates/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_31.test)

_Mimic sqlite_

```sql
SELECT ALL - col2 / - col1 + 44 col1 FROM tab2 AS cor0

Expected: ["44","44","44"] but got ["44.451","44.519","44.866"]
```

#### ☓ Ran 10012 tests as sqlite

* 1691 failed
* 83% was OK

Time: 18664ms

---- ---- ---- ---- ---- ---- ----
### 283/621 [`./test/random/aggregates/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1635 failed
* 83% was OK

Time: 18635ms

---- ---- ---- ---- ---- ---- ----
### 284/621 [`./test/random/aggregates/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_33.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1681 failed
* 83% was OK

Time: 18554ms

---- ---- ---- ---- ---- ---- ----
### 285/621 [`./test/random/aggregates/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1501 failed
* 85% was OK

Time: 18130ms

---- ---- ---- ---- ---- ---- ----
### 286/621 [`./test/random/aggregates/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_35.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1539 failed
* 84% was OK

Time: 18004ms

---- ---- ---- ---- ---- ---- ----
### 287/621 [`./test/random/aggregates/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_36.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1546 failed
* 84% was OK

Time: 18005ms

---- ---- ---- ---- ---- ---- ----
### 288/621 [`./test/random/aggregates/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_37.test)

_Mimic sqlite_

```sql
SELECT ALL - 93 AS col0, CAST ( NULL AS INTEGER ) AS col0 FROM tab1 AS cor0

Expected: ["-93","NULL","-93","NULL","-93","NULL"] but got ["0","0","0","0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1573 failed
* 84% was OK

Time: 18938ms

---- ---- ---- ---- ---- ---- ----
### 289/621 [`./test/random/aggregates/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_38.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1565 failed
* 84% was OK

Time: 18663ms

---- ---- ---- ---- ---- ---- ----
### 290/621 [`./test/random/aggregates/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_39.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1597 failed
* 84% was OK

Time: 18487ms

---- ---- ---- ---- ---- ---- ----
### 291/621 [`./test/random/aggregates/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1688 failed
* 83% was OK

Time: 18803ms

---- ---- ---- ---- ---- ---- ----
### 292/621 [`./test/random/aggregates/slt_good_40.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_40.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1597 failed
* 84% was OK

Time: 18438ms

---- ---- ---- ---- ---- ---- ----
### 293/621 [`./test/random/aggregates/slt_good_41.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_41.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1464 failed
* 85% was OK

Time: 18132ms

---- ---- ---- ---- ---- ---- ----
### 294/621 [`./test/random/aggregates/slt_good_42.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_42.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col1 col0 FROM tab0 WHERE NOT - - col2 >= - - 31 * CAST ( + - col1 AS REAL )

Wrong conversion type
```

#### ☓ Ran 10012 tests as sqlite

* 1530 failed
* 84% was OK

Time: 18395ms

---- ---- ---- ---- ---- ---- ----
### 295/621 [`./test/random/aggregates/slt_good_43.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_43.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1572 failed
* 84% was OK

Time: 18349ms

---- ---- ---- ---- ---- ---- ----
### 296/621 [`./test/random/aggregates/slt_good_44.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_44.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1597 failed
* 84% was OK

Time: 18338ms

---- ---- ---- ---- ---- ---- ----
### 297/621 [`./test/random/aggregates/slt_good_45.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_45.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1531 failed
* 84% was OK

Time: 18456ms

---- ---- ---- ---- ---- ---- ----
### 298/621 [`./test/random/aggregates/slt_good_46.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_46.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + - ( - 25 ) / + 59 + COUNT ( * ) AS col0 FROM tab1 AS cor0 WHERE NULL NOT BETWEEN NULL AND - 1 + col0

Expected: ["0"] but got ["3.424"]
```


```sql
SELECT - COUNT ( * ) * - + 83 AS col1, 26 FROM tab0

Expected: ["249","26"] but got ["26","249"]
```

#### ☓ Ran 10012 tests as sqlite

* 1606 failed
* 83% was OK

Time: 18255ms

---- ---- ---- ---- ---- ---- ----
### 299/621 [`./test/random/aggregates/slt_good_47.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_47.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1605 failed
* 83% was OK

Time: 18550ms

---- ---- ---- ---- ---- ---- ----
### 300/621 [`./test/random/aggregates/slt_good_48.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_48.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1514 failed
* 84% was OK

Time: 18246ms

---- ---- ---- ---- ---- ---- ----
### 301/621 [`./test/random/aggregates/slt_good_49.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_49.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1539 failed
* 84% was OK

Time: 18235ms

---- ---- ---- ---- ---- ---- ----
### 302/621 [`./test/random/aggregates/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1632 failed
* 83% was OK

Time: 18435ms

---- ---- ---- ---- ---- ---- ----
### 303/621 [`./test/random/aggregates/slt_good_50.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_50.test)

_Mimic sqlite_

```sql
SELECT + col1 * col0 + col1 FROM tab1 WHERE NOT - col1 BETWEEN col0 AND NULL

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1543 failed
* 84% was OK

Time: 18396ms

---- ---- ---- ---- ---- ---- ----
### 304/621 [`./test/random/aggregates/slt_good_51.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_51.test)

_Mimic sqlite_

```sql
SELECT ALL ( - CAST ( NULL AS INTEGER ) ) + col1 - - + col1 + CAST ( + col1 AS REAL ) * 5 AS col2 FROM tab1

Wrong conversion type
```

#### ☓ Ran 10012 tests as sqlite

* 1585 failed
* 84% was OK

Time: 18301ms

---- ---- ---- ---- ---- ---- ----
### 305/621 [`./test/random/aggregates/slt_good_52.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_52.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1491 failed
* 85% was OK

Time: 18859ms

---- ---- ---- ---- ---- ---- ----
### 306/621 [`./test/random/aggregates/slt_good_53.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_53.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1596 failed
* 84% was OK

Time: 19012ms

---- ---- ---- ---- ---- ---- ----
### 307/621 [`./test/random/aggregates/slt_good_54.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_54.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1558 failed
* 84% was OK

Time: 18486ms

---- ---- ---- ---- ---- ---- ----
### 308/621 [`./test/random/aggregates/slt_good_55.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_55.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1521 failed
* 84% was OK

Time: 18617ms

---- ---- ---- ---- ---- ---- ----
### 309/621 [`./test/random/aggregates/slt_good_56.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_56.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab1 AS cor0 WHERE NOT col1 BETWEEN ( - col2 ) AND - col1 * col1

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1544 failed
* 84% was OK

Time: 18352ms

---- ---- ---- ---- ---- ---- ----
### 310/621 [`./test/random/aggregates/slt_good_57.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_57.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1569 failed
* 84% was OK

Time: 18501ms

---- ---- ---- ---- ---- ---- ----
### 311/621 [`./test/random/aggregates/slt_good_58.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_58.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1477 failed
* 85% was OK

Time: 18443ms

---- ---- ---- ---- ---- ---- ----
### 312/621 [`./test/random/aggregates/slt_good_59.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_59.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1519 failed
* 84% was OK

Time: 18351ms

---- ---- ---- ---- ---- ---- ----
### 313/621 [`./test/random/aggregates/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT DISTINCT 9 + COUNT ( * ) AS col2, AVG ( DISTINCT + + col2 ) col2, - MAX ( col2 ) AS col0 FROM tab2 AS cor0 WHERE NOT 13 IS NOT NULL

Expected: ["9","NULL","NULL"] but got ["NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1649 failed
* 83% was OK

Time: 18949ms

---- ---- ---- ---- ---- ---- ----
### 314/621 [`./test/random/aggregates/slt_good_60.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_60.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1610 failed
* 83% was OK

Time: 18567ms

---- ---- ---- ---- ---- ---- ----
### 315/621 [`./test/random/aggregates/slt_good_61.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_61.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1533 failed
* 84% was OK

Time: 18561ms

---- ---- ---- ---- ---- ---- ----
### 316/621 [`./test/random/aggregates/slt_good_62.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_62.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1496 failed
* 85% was OK

Time: 18519ms

---- ---- ---- ---- ---- ---- ----
### 317/621 [`./test/random/aggregates/slt_good_63.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_63.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1467 failed
* 85% was OK

Time: 18852ms

---- ---- ---- ---- ---- ---- ----
### 318/621 [`./test/random/aggregates/slt_good_64.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_64.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1567 failed
* 84% was OK

Time: 23292ms

---- ---- ---- ---- ---- ---- ----
### 319/621 [`./test/random/aggregates/slt_good_65.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_65.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1558 failed
* 84% was OK

Time: 23276ms

---- ---- ---- ---- ---- ---- ----
### 320/621 [`./test/random/aggregates/slt_good_66.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_66.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1534 failed
* 84% was OK

Time: 23605ms

---- ---- ---- ---- ---- ---- ----
### 321/621 [`./test/random/aggregates/slt_good_67.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_67.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1602 failed
* 83% was OK

Time: 23351ms

---- ---- ---- ---- ---- ---- ----
### 322/621 [`./test/random/aggregates/slt_good_68.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_68.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1543 failed
* 84% was OK

Time: 21150ms

---- ---- ---- ---- ---- ---- ----
### 323/621 [`./test/random/aggregates/slt_good_69.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_69.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1505 failed
* 84% was OK

Time: 23150ms

---- ---- ---- ---- ---- ---- ----
### 324/621 [`./test/random/aggregates/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1634 failed
* 83% was OK

Time: 21912ms

---- ---- ---- ---- ---- ---- ----
### 325/621 [`./test/random/aggregates/slt_good_70.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_70.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1578 failed
* 84% was OK

Time: 21692ms

---- ---- ---- ---- ---- ---- ----
### 326/621 [`./test/random/aggregates/slt_good_71.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_71.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1566 failed
* 84% was OK

Time: 21656ms

---- ---- ---- ---- ---- ---- ----
### 327/621 [`./test/random/aggregates/slt_good_72.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_72.test)

_Mimic sqlite_

```sql
SELECT + CAST ( - ( COUNT ( * ) ) AS INTEGER ) FROM tab2 WHERE NULL IS NULL

g is not defined
```

#### ☓ Ran 10012 tests as sqlite

* 1538 failed
* 84% was OK

Time: 23688ms

---- ---- ---- ---- ---- ---- ----
### 328/621 [`./test/random/aggregates/slt_good_73.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_73.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1552 failed
* 84% was OK

Time: 21309ms

---- ---- ---- ---- ---- ---- ----
### 329/621 [`./test/random/aggregates/slt_good_74.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_74.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1476 failed
* 85% was OK

Time: 21315ms

---- ---- ---- ---- ---- ---- ----
### 330/621 [`./test/random/aggregates/slt_good_75.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_75.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1603 failed
* 83% was OK

Time: 21467ms

---- ---- ---- ---- ---- ---- ----
### 331/621 [`./test/random/aggregates/slt_good_76.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_76.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1567 failed
* 84% was OK

Time: 21576ms

---- ---- ---- ---- ---- ---- ----
### 332/621 [`./test/random/aggregates/slt_good_77.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_77.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1557 failed
* 84% was OK

Time: 20689ms

---- ---- ---- ---- ---- ---- ----
### 333/621 [`./test/random/aggregates/slt_good_78.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_78.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1678 failed
* 83% was OK

Time: 18813ms

---- ---- ---- ---- ---- ---- ----
### 334/621 [`./test/random/aggregates/slt_good_79.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_79.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1536 failed
* 84% was OK

Time: 18681ms

---- ---- ---- ---- ---- ---- ----
### 335/621 [`./test/random/aggregates/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1634 failed
* 83% was OK

Time: 18557ms

---- ---- ---- ---- ---- ---- ----
### 336/621 [`./test/random/aggregates/slt_good_80.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_80.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab1 AS cor0 WHERE NULL = + 88 + - CAST ( NULL AS REAL )

Wrong conversion type
```

#### ☓ Ran 10012 tests as sqlite

* 1568 failed
* 84% was OK

Time: 18458ms

---- ---- ---- ---- ---- ---- ----
### 337/621 [`./test/random/aggregates/slt_good_81.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_81.test)

_Mimic sqlite_

```sql
SELECT 8 / col2 - col0 AS col2 FROM tab1

Expected: ["-51","-85","-91"] but got ["-50.917","-84.864","-90.882"]
```

#### ☓ Ran 10012 tests as sqlite

* 1563 failed
* 84% was OK

Time: 18511ms

---- ---- ---- ---- ---- ---- ----
### 338/621 [`./test/random/aggregates/slt_good_82.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_82.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1621 failed
* 83% was OK

Time: 18651ms

---- ---- ---- ---- ---- ---- ----
### 339/621 [`./test/random/aggregates/slt_good_83.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_83.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1614 failed
* 83% was OK

Time: 18869ms

---- ---- ---- ---- ---- ---- ----
### 340/621 [`./test/random/aggregates/slt_good_84.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_84.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1621 failed
* 83% was OK

Time: 18616ms

---- ---- ---- ---- ---- ---- ----
### 341/621 [`./test/random/aggregates/slt_good_85.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_85.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1517 failed
* 84% was OK

Time: 18517ms

---- ---- ---- ---- ---- ---- ----
### 342/621 [`./test/random/aggregates/slt_good_86.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_86.test)

_Mimic sqlite_

```sql
SELECT + col0 + - 44 AS col0 FROM tab1 WHERE NOT + 26 + 32 BETWEEN + + col0 + + + col2 AND ( - col0 / + col0 * + col2 )

Query was expected to return results (but did not) 
```


```sql
SELECT - CAST ( NULL AS INTEGER ) / + - 91 AS col0 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1532 failed
* 84% was OK

Time: 18962ms

---- ---- ---- ---- ---- ---- ----
### 343/621 [`./test/random/aggregates/slt_good_87.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_87.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1620 failed
* 83% was OK

Time: 19056ms

---- ---- ---- ---- ---- ---- ----
### 344/621 [`./test/random/aggregates/slt_good_88.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_88.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1625 failed
* 83% was OK

Time: 19133ms

---- ---- ---- ---- ---- ---- ----
### 345/621 [`./test/random/aggregates/slt_good_89.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_89.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1601 failed
* 84% was OK

Time: 18936ms

---- ---- ---- ---- ---- ---- ----
### 346/621 [`./test/random/aggregates/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1565 failed
* 84% was OK

Time: 18986ms

---- ---- ---- ---- ---- ---- ----
### 347/621 [`./test/random/aggregates/slt_good_90.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_90.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + COUNT ( * ) * - 91, 93 AS col2 FROM tab2 cor0 WHERE NOT NULL < col2

Expected: ["0","93"] but got ["-273","93"]
```

#### ☓ Ran 10012 tests as sqlite

* 1643 failed
* 83% was OK

Time: 18952ms

---- ---- ---- ---- ---- ---- ----
### 348/621 [`./test/random/aggregates/slt_good_91.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_91.test)

_Mimic sqlite_

```sql
SELECT + col2 * - + 27 + + 16 - + col1 AS col0, col0 FROM tab0 AS cor0

Expected: ["-1334","15","-2658","97","-275","87"] but got ["15","15","87","87","97","97"]
```

#### ☓ Ran 10012 tests as sqlite

* 1630 failed
* 83% was OK

Time: 18821ms

---- ---- ---- ---- ---- ---- ----
### 349/621 [`./test/random/aggregates/slt_good_92.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_92.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1607 failed
* 83% was OK

Time: 18546ms

---- ---- ---- ---- ---- ---- ----
### 350/621 [`./test/random/aggregates/slt_good_93.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_93.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1581 failed
* 84% was OK

Time: 18811ms

---- ---- ---- ---- ---- ---- ----
### 351/621 [`./test/random/aggregates/slt_good_94.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_94.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1578 failed
* 84% was OK

Time: 19099ms

---- ---- ---- ---- ---- ---- ----
### 352/621 [`./test/random/aggregates/slt_good_95.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_95.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1586 failed
* 84% was OK

Time: 20179ms

---- ---- ---- ---- ---- ---- ----
### 353/621 [`./test/random/aggregates/slt_good_96.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_96.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1549 failed
* 84% was OK

Time: 18867ms

---- ---- ---- ---- ---- ---- ----
### 354/621 [`./test/random/aggregates/slt_good_97.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_97.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1633 failed
* 83% was OK

Time: 19312ms

---- ---- ---- ---- ---- ---- ----
### 355/621 [`./test/random/aggregates/slt_good_98.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_98.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1644 failed
* 83% was OK

Time: 18887ms

---- ---- ---- ---- ---- ---- ----
### 356/621 [`./test/random/aggregates/slt_good_99.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_99.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1573 failed
* 84% was OK

Time: 19268ms

---- ---- ---- ---- ---- ---- ----
### 357/621 [`./test/random/expr/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT SUM ( + 73 ) * - CASE WHEN NOT ( NOT 27 BETWEEN 15 AND - NULLIF ( - 63, - 28 + + 76 ) ) THEN NULL ELSE + 77 * + 69 END / - CAST ( - 69 AS INTEGER ) AS col0

Cannot read property 'toString' of undefined
```


```sql
SELECT ALL + NULLIF ( - 45, - ( 97 ) ) - + CASE ( - 78 ) WHEN + - 37 * - 37 + + 76 + - 80 * - + CAST ( - 18 AS INTEGER ) + + 46 - + MIN ( - 53 ) THEN 97 * - + 31 END + + 54 * - COUNT ( * ) AS col2, - COUNT ( * ) / + 68 AS col0

Expected: ["NULL","0"] but got ["NULL","-0.015"]
```

#### ☓ Ran 10012 tests as sqlite

* 1839 failed
* 81% was OK

Time: 19780ms

---- ---- ---- ---- ---- ---- ----
### 358/621 [`./test/random/expr/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1175 failed
* 88% was OK

Time: 12748ms

---- ---- ---- ---- ---- ---- ----
### 359/621 [`./test/random/expr/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2060 failed
* 79% was OK

Time: 21111ms

---- ---- ---- ---- ---- ---- ----
### 360/621 [`./test/random/expr/slt_good_100.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_100.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2110 failed
* 78% was OK

Time: 21123ms

---- ---- ---- ---- ---- ---- ----
### 361/621 [`./test/random/expr/slt_good_101.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_101.test)

_Mimic sqlite_

```sql
SELECT - 26 * CAST ( NULL AS INTEGER ) + COUNT ( 83 )

Expected: ["NULL"] but got ["1"]
```

#### ☓ Ran 10012 tests as sqlite

* 2061 failed
* 79% was OK

Time: 21005ms

---- ---- ---- ---- ---- ---- ----
### 362/621 [`./test/random/expr/slt_good_102.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_102.test)

_Mimic sqlite_

```sql
SELECT - CAST ( NULL AS INTEGER ) / NULLIF ( + 32, + 70 ) + + COUNT ( * ) - + + 27 * - CAST ( + 84 AS INTEGER ) / + - 92

Expected: ["NULL"] but got ["-23.652"]
```

#### ☓ Ran 10012 tests as sqlite

* 2190 failed
* 78% was OK

Time: 20970ms

---- ---- ---- ---- ---- ---- ----
### 363/621 [`./test/random/expr/slt_good_103.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_103.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2064 failed
* 79% was OK

Time: 21001ms

---- ---- ---- ---- ---- ---- ----
### 364/621 [`./test/random/expr/slt_good_104.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_104.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2069 failed
* 79% was OK

Time: 20628ms

---- ---- ---- ---- ---- ---- ----
### 365/621 [`./test/random/expr/slt_good_105.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_105.test)

_Mimic sqlite_

```sql
SELECT ALL 66 / - COUNT ( * ) / COUNT ( * ) - MAX ( 96 ) / 74

Expected: ["-67"] but got ["-67.297"]
```

#### ☓ Ran 10012 tests as sqlite

* 2007 failed
* 79% was OK

Time: 20925ms

---- ---- ---- ---- ---- ---- ----
### 366/621 [`./test/random/expr/slt_good_106.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_106.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2066 failed
* 79% was OK

Time: 20930ms

---- ---- ---- ---- ---- ---- ----
### 367/621 [`./test/random/expr/slt_good_107.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_107.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2081 failed
* 79% was OK

Time: 20644ms

---- ---- ---- ---- ---- ---- ----
### 368/621 [`./test/random/expr/slt_good_108.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_108.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2030 failed
* 79% was OK

Time: 23356ms

---- ---- ---- ---- ---- ---- ----
### 369/621 [`./test/random/expr/slt_good_109.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_109.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1863 failed
* 81% was OK

Time: 22177ms

---- ---- ---- ---- ---- ---- ----
### 370/621 [`./test/random/expr/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2096 failed
* 79% was OK

Time: 27254ms

---- ---- ---- ---- ---- ---- ----
### 371/621 [`./test/random/expr/slt_good_110.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_110.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2056 failed
* 79% was OK

Time: 24538ms

---- ---- ---- ---- ---- ---- ----
### 372/621 [`./test/random/expr/slt_good_111.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_111.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2043 failed
* 79% was OK

Time: 22172ms

---- ---- ---- ---- ---- ---- ----
### 373/621 [`./test/random/expr/slt_good_112.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_112.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2093 failed
* 79% was OK

Time: 21221ms

---- ---- ---- ---- ---- ---- ----
### 374/621 [`./test/random/expr/slt_good_113.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_113.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2035 failed
* 79% was OK

Time: 20983ms

---- ---- ---- ---- ---- ---- ----
### 375/621 [`./test/random/expr/slt_good_114.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_114.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2088 failed
* 79% was OK

Time: 21235ms

---- ---- ---- ---- ---- ---- ----
### 376/621 [`./test/random/expr/slt_good_115.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_115.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2096 failed
* 79% was OK

Time: 20860ms

---- ---- ---- ---- ---- ---- ----
### 377/621 [`./test/random/expr/slt_good_116.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_116.test)

_Mimic sqlite_

```sql
SELECT 59 / - 45 AS col2

Expected: ["-1"] but got ["-1.311"]
```


```sql
SELECT + COUNT ( * ) - + 73 - + 14 / 61 AS col0, - 14 * - 54 AS col0

Expected: ["-72","756"] but got ["756"]
```

#### ☓ Ran 10012 tests as sqlite

* 2038 failed
* 79% was OK

Time: 21083ms

---- ---- ---- ---- ---- ---- ----
### 378/621 [`./test/random/expr/slt_good_117.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_117.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1964 failed
* 80% was OK

Time: 20861ms

---- ---- ---- ---- ---- ---- ----
### 379/621 [`./test/random/expr/slt_good_118.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_118.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2093 failed
* 79% was OK

Time: 21249ms

---- ---- ---- ---- ---- ---- ----
### 380/621 [`./test/random/expr/slt_good_119.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_119.test)

_Mimic sqlite_

```sql
SELECT - - CAST ( NULL AS INTEGER ) + - 23 * 77

Expected: ["NULL"] but got ["-1771"]
```

#### ☓ Ran 8938 tests as sqlite

* 1838 failed
* 79% was OK

Time: 18508ms

---- ---- ---- ---- ---- ---- ----
### 381/621 [`./test/random/expr/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2133 failed
* 78% was OK

Time: 21056ms

---- ---- ---- ---- ---- ---- ----
### 382/621 [`./test/random/expr/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1659 failed
* 83% was OK

Time: 18499ms

---- ---- ---- ---- ---- ---- ----
### 383/621 [`./test/random/expr/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2130 failed
* 78% was OK

Time: 20992ms

---- ---- ---- ---- ---- ---- ----
### 384/621 [`./test/random/expr/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2139 failed
* 78% was OK

Time: 21043ms

---- ---- ---- ---- ---- ---- ----
### 385/621 [`./test/random/expr/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2077 failed
* 79% was OK

Time: 21111ms

---- ---- ---- ---- ---- ---- ----
### 386/621 [`./test/random/expr/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_17.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2095 failed
* 79% was OK

Time: 21029ms

---- ---- ---- ---- ---- ---- ----
### 387/621 [`./test/random/expr/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_18.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2118 failed
* 78% was OK

Time: 21177ms

---- ---- ---- ---- ---- ---- ----
### 388/621 [`./test/random/expr/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2089 failed
* 79% was OK

Time: 20954ms

---- ---- ---- ---- ---- ---- ----
### 389/621 [`./test/random/expr/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1481 failed
* 85% was OK

Time: 17416ms

---- ---- ---- ---- ---- ---- ----
### 390/621 [`./test/random/expr/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2096 failed
* 79% was OK

Time: 20727ms

---- ---- ---- ---- ---- ---- ----
### 391/621 [`./test/random/expr/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2097 failed
* 79% was OK

Time: 20651ms

---- ---- ---- ---- ---- ---- ----
### 392/621 [`./test/random/expr/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_22.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2025 failed
* 79% was OK

Time: 20605ms

---- ---- ---- ---- ---- ---- ----
### 393/621 [`./test/random/expr/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_23.test)

_Mimic sqlite_

```sql
SELECT ALL ( + + CAST ( + 99 AS INTEGER ) ) - + MIN ( ALL + - 66 ) * - COALESCE ( + - 25, - 56 + - 65 + 76, - ( + + SUM ( ALL - 76 ) ), - 32 * 90 / - 7 ) * 53 - - COUNT ( DISTINCT 13 ) + - 56 * + CAST ( NULL AS INTEGER ) col0

Expected: ["NULL"] but got ["87550"]
```

#### ☓ Ran 10012 tests as sqlite

* 2067 failed
* 79% was OK

Time: 20553ms

---- ---- ---- ---- ---- ---- ----
### 394/621 [`./test/random/expr/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1860 failed
* 81% was OK

Time: 19337ms

---- ---- ---- ---- ---- ---- ----
### 395/621 [`./test/random/expr/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_25.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1872 failed
* 81% was OK

Time: 19645ms

---- ---- ---- ---- ---- ---- ----
### 396/621 [`./test/random/expr/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_26.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1876 failed
* 81% was OK

Time: 19460ms

---- ---- ---- ---- ---- ---- ----
### 397/621 [`./test/random/expr/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_27.test)

_Mimic sqlite_

```sql
SELECT ALL - ( - 74 ) + + CAST ( NULL AS INTEGER ) AS col1

Expected: ["NULL"] but got ["74"]
```

#### ☓ Ran 10012 tests as sqlite

* 1857 failed
* 81% was OK

Time: 20040ms

---- ---- ---- ---- ---- ---- ----
### 398/621 [`./test/random/expr/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1924 failed
* 80% was OK

Time: 19881ms

---- ---- ---- ---- ---- ---- ----
### 399/621 [`./test/random/expr/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_29.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1476 failed
* 85% was OK

Time: 16951ms

---- ---- ---- ---- ---- ---- ----
### 400/621 [`./test/random/expr/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_3.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2064 failed
* 79% was OK

Time: 21147ms

---- ---- ---- ---- ---- ---- ----
### 401/621 [`./test/random/expr/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1765 failed
* 82% was OK

Time: 18516ms

---- ---- ---- ---- ---- ---- ----
### 402/621 [`./test/random/expr/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_31.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1808 failed
* 81% was OK

Time: 19010ms

---- ---- ---- ---- ---- ---- ----
### 403/621 [`./test/random/expr/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1469 failed
* 85% was OK

Time: 13987ms

---- ---- ---- ---- ---- ---- ----
### 404/621 [`./test/random/expr/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_33.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1852 failed
* 81% was OK

Time: 19284ms

---- ---- ---- ---- ---- ---- ----
### 405/621 [`./test/random/expr/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1969 failed
* 80% was OK

Time: 19595ms

---- ---- ---- ---- ---- ---- ----
### 406/621 [`./test/random/expr/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_35.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1902 failed
* 81% was OK

Time: 19889ms

---- ---- ---- ---- ---- ---- ----
### 407/621 [`./test/random/expr/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_36.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1929 failed
* 80% was OK

Time: 20156ms

---- ---- ---- ---- ---- ---- ----
### 408/621 [`./test/random/expr/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_37.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1954 failed
* 80% was OK

Time: 20542ms

---- ---- ---- ---- ---- ---- ----
### 409/621 [`./test/random/expr/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_38.test)

_Mimic sqlite_

```sql
SELECT ALL + 45 + + 60 + + 47 - 77 * + + 0 - 1 * 44 / + 89 + - CASE 92 WHEN CAST ( 16 AS INTEGER ) THEN NULL WHEN 86 THEN + 63 ELSE + + NULLIF ( + + 37, - 40 ) END + - 42 * - 77 * - ( 61 ) AS col2

Expected: ["-197159"] but got ["-197159.494"]
```

#### ☓ Ran 10012 tests as sqlite

* 1990 failed
* 80% was OK

Time: 20201ms

---- ---- ---- ---- ---- ---- ----
### 410/621 [`./test/random/expr/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_39.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1993 failed
* 80% was OK

Time: 20289ms

---- ---- ---- ---- ---- ---- ----
### 411/621 [`./test/random/expr/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2064 failed
* 79% was OK

Time: 21000ms

---- ---- ---- ---- ---- ---- ----
### 412/621 [`./test/random/expr/slt_good_40.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_40.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1984 failed
* 80% was OK

Time: 20610ms

---- ---- ---- ---- ---- ---- ----
### 413/621 [`./test/random/expr/slt_good_41.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_41.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1945 failed
* 80% was OK

Time: 20245ms

---- ---- ---- ---- ---- ---- ----
### 414/621 [`./test/random/expr/slt_good_42.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_42.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1939 failed
* 80% was OK

Time: 21904ms

---- ---- ---- ---- ---- ---- ----
### 415/621 [`./test/random/expr/slt_good_43.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_43.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1588 failed
* 84% was OK

Time: 14832ms

---- ---- ---- ---- ---- ---- ----
### 416/621 [`./test/random/expr/slt_good_44.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_44.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1974 failed
* 80% was OK

Time: 21576ms

---- ---- ---- ---- ---- ---- ----
### 417/621 [`./test/random/expr/slt_good_45.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_45.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2019 failed
* 79% was OK

Time: 19921ms

---- ---- ---- ---- ---- ---- ----
### 418/621 [`./test/random/expr/slt_good_46.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_46.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1945 failed
* 80% was OK

Time: 20021ms

---- ---- ---- ---- ---- ---- ----
### 419/621 [`./test/random/expr/slt_good_47.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_47.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1925 failed
* 80% was OK

Time: 20110ms

---- ---- ---- ---- ---- ---- ----
### 420/621 [`./test/random/expr/slt_good_48.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_48.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2038 failed
* 79% was OK

Time: 20431ms

---- ---- ---- ---- ---- ---- ----
### 421/621 [`./test/random/expr/slt_good_49.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_49.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2006 failed
* 79% was OK

Time: 20546ms

---- ---- ---- ---- ---- ---- ----
### 422/621 [`./test/random/expr/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT ALL + 28 / + - ( - ( - 81 ) )

Expected: ["0"] but got ["-0.346"]
```

#### ☓ Ran 10012 tests as sqlite

* 2085 failed
* 79% was OK

Time: 21153ms

---- ---- ---- ---- ---- ---- ----
### 423/621 [`./test/random/expr/slt_good_50.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_50.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1998 failed
* 80% was OK

Time: 20323ms

---- ---- ---- ---- ---- ---- ----
### 424/621 [`./test/random/expr/slt_good_51.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_51.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1968 failed
* 80% was OK

Time: 20582ms

---- ---- ---- ---- ---- ---- ----
### 425/621 [`./test/random/expr/slt_good_52.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_52.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2064 failed
* 79% was OK

Time: 20208ms

---- ---- ---- ---- ---- ---- ----
### 426/621 [`./test/random/expr/slt_good_53.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_53.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1981 failed
* 80% was OK

Time: 19761ms

---- ---- ---- ---- ---- ---- ----
### 427/621 [`./test/random/expr/slt_good_54.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_54.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1612 failed
* 83% was OK

Time: 14763ms

---- ---- ---- ---- ---- ---- ----
### 428/621 [`./test/random/expr/slt_good_55.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_55.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2081 failed
* 79% was OK

Time: 20357ms

---- ---- ---- ---- ---- ---- ----
### 429/621 [`./test/random/expr/slt_good_56.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_56.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2014 failed
* 79% was OK

Time: 20415ms

---- ---- ---- ---- ---- ---- ----
### 430/621 [`./test/random/expr/slt_good_57.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_57.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2000 failed
* 80% was OK

Time: 20311ms

---- ---- ---- ---- ---- ---- ----
### 431/621 [`./test/random/expr/slt_good_58.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_58.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1952 failed
* 80% was OK

Time: 20433ms

---- ---- ---- ---- ---- ---- ----
### 432/621 [`./test/random/expr/slt_good_59.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_59.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1977 failed
* 80% was OK

Time: 19945ms

---- ---- ---- ---- ---- ---- ----
### 433/621 [`./test/random/expr/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2043 failed
* 79% was OK

Time: 20932ms

---- ---- ---- ---- ---- ---- ----
### 434/621 [`./test/random/expr/slt_good_60.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_60.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2007 failed
* 79% was OK

Time: 20574ms

---- ---- ---- ---- ---- ---- ----
### 435/621 [`./test/random/expr/slt_good_61.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_61.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2025 failed
* 79% was OK

Time: 20721ms

---- ---- ---- ---- ---- ---- ----
### 436/621 [`./test/random/expr/slt_good_62.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_62.test)

_Mimic sqlite_

```sql
SELECT ALL - CAST ( NULL AS INTEGER ) + + + 42 + - 42 * - 17

Expected: ["NULL"] but got ["756"]
```

#### ☓ Ran 10012 tests as sqlite

* 2045 failed
* 79% was OK

Time: 20653ms

---- ---- ---- ---- ---- ---- ----
### 437/621 [`./test/random/expr/slt_good_63.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_63.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2002 failed
* 80% was OK

Time: 20958ms

---- ---- ---- ---- ---- ---- ----
### 438/621 [`./test/random/expr/slt_good_64.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_64.test)

_Mimic sqlite_

```sql
SELECT - 47 / + 7

Expected: ["-6"] but got ["-6.714"]
```


```sql
SELECT ALL - CAST ( NULL AS REAL ) + MAX ( DISTINCT + 99 )

Wrong conversion type
```

#### ☓ Ran 10012 tests as sqlite

* 2056 failed
* 79% was OK

Time: 31351ms

---- ---- ---- ---- ---- ---- ----
### 439/621 [`./test/random/expr/slt_good_65.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_65.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1716 failed
* 82% was OK

Time: 19266ms

---- ---- ---- ---- ---- ---- ----
### 440/621 [`./test/random/expr/slt_good_66.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_66.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2062 failed
* 79% was OK

Time: 22613ms

---- ---- ---- ---- ---- ---- ----
### 441/621 [`./test/random/expr/slt_good_67.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_67.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2033 failed
* 79% was OK

Time: 22279ms

---- ---- ---- ---- ---- ---- ----
### 442/621 [`./test/random/expr/slt_good_68.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_68.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1977 failed
* 80% was OK

Time: 23985ms

---- ---- ---- ---- ---- ---- ----
### 443/621 [`./test/random/expr/slt_good_69.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_69.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2019 failed
* 79% was OK

Time: 22013ms

---- ---- ---- ---- ---- ---- ----
### 444/621 [`./test/random/expr/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2097 failed
* 79% was OK

Time: 27333ms

---- ---- ---- ---- ---- ---- ----
### 445/621 [`./test/random/expr/slt_good_70.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_70.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2000 failed
* 80% was OK

Time: 25809ms

---- ---- ---- ---- ---- ---- ----
### 446/621 [`./test/random/expr/slt_good_71.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_71.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1994 failed
* 80% was OK

Time: 22312ms

---- ---- ---- ---- ---- ---- ----
### 447/621 [`./test/random/expr/slt_good_72.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_72.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2050 failed
* 79% was OK

Time: 29038ms

---- ---- ---- ---- ---- ---- ----
### 448/621 [`./test/random/expr/slt_good_73.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_73.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2032 failed
* 79% was OK

Time: 21936ms

---- ---- ---- ---- ---- ---- ----
### 449/621 [`./test/random/expr/slt_good_74.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_74.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2078 failed
* 79% was OK

Time: 23211ms

---- ---- ---- ---- ---- ---- ----
### 450/621 [`./test/random/expr/slt_good_75.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_75.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2056 failed
* 79% was OK

Time: 28211ms

---- ---- ---- ---- ---- ---- ----
### 451/621 [`./test/random/expr/slt_good_76.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_76.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1709 failed
* 82% was OK

Time: 15884ms

---- ---- ---- ---- ---- ---- ----
### 452/621 [`./test/random/expr/slt_good_77.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_77.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1988 failed
* 80% was OK

Time: 25308ms

---- ---- ---- ---- ---- ---- ----
### 453/621 [`./test/random/expr/slt_good_78.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_78.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2030 failed
* 79% was OK

Time: 26137ms

---- ---- ---- ---- ---- ---- ----
### 454/621 [`./test/random/expr/slt_good_79.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_79.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2066 failed
* 79% was OK

Time: 28529ms

---- ---- ---- ---- ---- ---- ----
### 455/621 [`./test/random/expr/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2139 failed
* 78% was OK

Time: 26518ms

---- ---- ---- ---- ---- ---- ----
### 456/621 [`./test/random/expr/slt_good_80.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_80.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2050 failed
* 79% was OK

Time: 27030ms

---- ---- ---- ---- ---- ---- ----
### 457/621 [`./test/random/expr/slt_good_81.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_81.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2042 failed
* 79% was OK

Time: 21142ms

---- ---- ---- ---- ---- ---- ----
### 458/621 [`./test/random/expr/slt_good_82.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_82.test)

_Mimic sqlite_

```sql
SELECT DISTINCT COUNT ( * ) * - 16 / - 45

Expected: ["0"] but got ["0.356"]
```

#### ☓ Ran 10012 tests as sqlite

* 2104 failed
* 78% was OK

Time: 26989ms

---- ---- ---- ---- ---- ---- ----
### 459/621 [`./test/random/expr/slt_good_83.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_83.test)

_Mimic sqlite_

```sql
SELECT - + COUNT ( * ) / + 29 + + 71 - - 9 AS col0

Expected: ["80"] but got ["79.966"]
```

#### ☓ Ran 10012 tests as sqlite

* 1995 failed
* 80% was OK

Time: 22293ms

---- ---- ---- ---- ---- ---- ----
### 460/621 [`./test/random/expr/slt_good_84.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_84.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1992 failed
* 80% was OK

Time: 24316ms

---- ---- ---- ---- ---- ---- ----
### 461/621 [`./test/random/expr/slt_good_85.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_85.test)

_Mimic sqlite_

```sql
SELECT + + 52 / + 80 + + 13 + + 97 * - ( + ( + 20 ) * 53 ) AS col0

Expected: ["-102807"] but got ["-102806.350"]
```


```sql
SELECT 37 + + + CAST ( NULL AS INTEGER )

Expected: ["NULL"] but got ["37"]
```

#### ☓ Ran 10012 tests as sqlite

* 2033 failed
* 79% was OK

Time: 27192ms

---- ---- ---- ---- ---- ---- ----
### 462/621 [`./test/random/expr/slt_good_86.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_86.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1906 failed
* 80% was OK

Time: 21267ms

---- ---- ---- ---- ---- ---- ----
### 463/621 [`./test/random/expr/slt_good_87.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_87.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1739 failed
* 82% was OK

Time: 15513ms

---- ---- ---- ---- ---- ---- ----
### 464/621 [`./test/random/expr/slt_good_88.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_88.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2085 failed
* 79% was OK

Time: 21317ms

---- ---- ---- ---- ---- ---- ----
### 465/621 [`./test/random/expr/slt_good_89.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_89.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - CAST ( NULL AS REAL ) + - 4

Wrong conversion type
```

#### ☓ Ran 10012 tests as sqlite

* 2004 failed
* 79% was OK

Time: 22991ms

---- ---- ---- ---- ---- ---- ----
### 466/621 [`./test/random/expr/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2046 failed
* 79% was OK

Time: 28349ms

---- ---- ---- ---- ---- ---- ----
### 467/621 [`./test/random/expr/slt_good_90.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_90.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2060 failed
* 79% was OK

Time: 27018ms

---- ---- ---- ---- ---- ---- ----
### 468/621 [`./test/random/expr/slt_good_91.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_91.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2050 failed
* 79% was OK

Time: 27097ms

---- ---- ---- ---- ---- ---- ----
### 469/621 [`./test/random/expr/slt_good_92.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_92.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2097 failed
* 79% was OK

Time: 22915ms

---- ---- ---- ---- ---- ---- ----
### 470/621 [`./test/random/expr/slt_good_93.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_93.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2047 failed
* 79% was OK

Time: 22990ms

---- ---- ---- ---- ---- ---- ----
### 471/621 [`./test/random/expr/slt_good_94.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_94.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2058 failed
* 79% was OK

Time: 22814ms

---- ---- ---- ---- ---- ---- ----
### 472/621 [`./test/random/expr/slt_good_95.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_95.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2074 failed
* 79% was OK

Time: 23607ms

---- ---- ---- ---- ---- ---- ----
### 473/621 [`./test/random/expr/slt_good_96.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_96.test)

_Mimic sqlite_

```sql
SELECT + 17 / + 36

Expected: ["0"] but got ["0.472"]
```

#### ☓ Ran 10012 tests as sqlite

* 2024 failed
* 79% was OK

Time: 23881ms

---- ---- ---- ---- ---- ---- ----
### 474/621 [`./test/random/expr/slt_good_97.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_97.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2033 failed
* 79% was OK

Time: 24736ms

---- ---- ---- ---- ---- ---- ----
### 475/621 [`./test/random/expr/slt_good_98.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_98.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1793 failed
* 82% was OK

Time: 18268ms

---- ---- ---- ---- ---- ---- ----
### 476/621 [`./test/random/expr/slt_good_99.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_99.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 2071 failed
* 79% was OK

Time: 23235ms

---- ---- ---- ---- ---- ---- ----
### 477/621 [`./test/random/groupby/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_0.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 4287 failed
* 57% was OK

Time: 19080ms

---- ---- ---- ---- ---- ---- ----
### 478/621 [`./test/random/groupby/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT cor0.col1 * 93 FROM tab1 AS cor0 GROUP BY cor0.col1

Expected: ["4092","5301","558"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4144 failed
* 58% was OK

Time: 19024ms

---- ---- ---- ---- ---- ---- ----
### 479/621 [`./test/random/groupby/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 284 failed
* 97% was OK

Time: 17237ms

---- ---- ---- ---- ---- ---- ----
### 480/621 [`./test/random/groupby/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_11.test)

_Mimic sqlite_

```sql
SELECT - + 5 / 17 / CAST ( NULL AS INTEGER ) col1 FROM tab0 AS cor0 GROUP BY col2, col1 HAVING NOT - + col2 + col1 < - col1 * + 81 * - 57 * - col1

Expected: ["NULL"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 873 failed
* 91% was OK

Time: 19943ms

---- ---- ---- ---- ---- ---- ----
### 481/621 [`./test/random/groupby/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_12.test)

_Mimic sqlite_

```sql
SELECT + CAST ( NULL AS INTEGER ) / + col1 AS col0 FROM tab1 AS cor0 WHERE NOT + 56 BETWEEN - - 14 + col2 * - + col1 / - col1 * + - col1 AND - ( + col1 ) + + col2 GROUP BY col1, col1

Expected: ["NULL","NULL","NULL"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 1446 failed
* 85% was OK

Time: 21730ms

---- ---- ---- ---- ---- ---- ----
### 482/621 [`./test/random/groupby/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_13.test)

_Mimic sqlite_
#### ☓ Ran 3182 tests as sqlite

* 1259 failed
* 60% was OK

Time: 5465ms

---- ---- ---- ---- ---- ---- ----
### 483/621 [`./test/random/groupby/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 4198 failed
* 58% was OK

Time: 16847ms

---- ---- ---- ---- ---- ---- ----
### 484/621 [`./test/random/groupby/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT - cor0.col2 col0 FROM tab0 AS cor0 GROUP BY cor0.col1, cor0.col2, cor0.col1

Expected: ["-24","-38","-79"] but got ["NULL","NULL","NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 4465 failed
* 55% was OK

Time: 16791ms

---- ---- ---- ---- ---- ---- ----
### 485/621 [`./test/random/groupby/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 4369 failed
* 56% was OK

Time: 17159ms

---- ---- ---- ---- ---- ---- ----
### 486/621 [`./test/random/groupby/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 4488 failed
* 55% was OK

Time: 17047ms

---- ---- ---- ---- ---- ---- ----
### 487/621 [`./test/random/groupby/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 4625 failed
* 53% was OK

Time: 16711ms

---- ---- ---- ---- ---- ---- ----
### 488/621 [`./test/random/groupby/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_7.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 4547 failed
* 54% was OK

Time: 17144ms

---- ---- ---- ---- ---- ---- ----
### 489/621 [`./test/random/groupby/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT ALL + cor0.col0 FROM tab1 cor0 GROUP BY cor0.col0, cor0.col2

Expected: ["22","28","82"] but got ["NULL","NULL","NULL"]
```


```sql
SELECT DISTINCT cor0.col2 + 26 FROM tab0 AS cor0 GROUP BY cor0.col2

Expected: ["105","50","64"] but got ["NULL"]
```

#### ☓ Ran 10012 tests as sqlite

* 2975 failed
* 70% was OK

Time: 16732ms

---- ---- ---- ---- ---- ---- ----
### 490/621 [`./test/random/groupby/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_9.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 503 failed
* 94% was OK

Time: 16363ms

---- ---- ---- ---- ---- ---- ----
### 491/621 [`./test/random/select/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1572 failed
* 84% was OK

Time: 15832ms

---- ---- ---- ---- ---- ---- ----
### 492/621 [`./test/random/select/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_1.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1338 failed
* 86% was OK

Time: 17429ms

---- ---- ---- ---- ---- ---- ----
### 493/621 [`./test/random/select/slt_good_10.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_10.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1287 failed
* 87% was OK

Time: 17437ms

---- ---- ---- ---- ---- ---- ----
### 494/621 [`./test/random/select/slt_good_100.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_100.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1441 failed
* 85% was OK

Time: 17841ms

---- ---- ---- ---- ---- ---- ----
### 495/621 [`./test/random/select/slt_good_101.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_101.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1435 failed
* 85% was OK

Time: 17706ms

---- ---- ---- ---- ---- ---- ----
### 496/621 [`./test/random/select/slt_good_102.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_102.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1458 failed
* 85% was OK

Time: 17782ms

---- ---- ---- ---- ---- ---- ----
### 497/621 [`./test/random/select/slt_good_103.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_103.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1457 failed
* 85% was OK

Time: 17663ms

---- ---- ---- ---- ---- ---- ----
### 498/621 [`./test/random/select/slt_good_104.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_104.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1433 failed
* 85% was OK

Time: 17792ms

---- ---- ---- ---- ---- ---- ----
### 499/621 [`./test/random/select/slt_good_105.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_105.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1443 failed
* 85% was OK

Time: 18527ms

---- ---- ---- ---- ---- ---- ----
### 500/621 [`./test/random/select/slt_good_106.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_106.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1415 failed
* 85% was OK

Time: 18068ms

---- ---- ---- ---- ---- ---- ----
### 501/621 [`./test/random/select/slt_good_107.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_107.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1454 failed
* 85% was OK

Time: 18998ms

---- ---- ---- ---- ---- ---- ----
### 502/621 [`./test/random/select/slt_good_108.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_108.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1399 failed
* 86% was OK

Time: 19457ms

---- ---- ---- ---- ---- ---- ----
### 503/621 [`./test/random/select/slt_good_109.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_109.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1408 failed
* 85% was OK

Time: 17685ms

---- ---- ---- ---- ---- ---- ----
### 504/621 [`./test/random/select/slt_good_11.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_11.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1340 failed
* 86% was OK

Time: 16726ms

---- ---- ---- ---- ---- ---- ----
### 505/621 [`./test/random/select/slt_good_110.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_110.test)

_Mimic sqlite_
#### ☓ Ran 10009 tests as sqlite

* 1415 failed
* 85% was OK

Time: 18269ms

---- ---- ---- ---- ---- ---- ----
### 506/621 [`./test/random/select/slt_good_111.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_111.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1476 failed
* 85% was OK

Time: 18102ms

---- ---- ---- ---- ---- ---- ----
### 507/621 [`./test/random/select/slt_good_112.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_112.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1452 failed
* 85% was OK

Time: 18352ms

---- ---- ---- ---- ---- ---- ----
### 508/621 [`./test/random/select/slt_good_113.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_113.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1365 failed
* 86% was OK

Time: 18094ms

---- ---- ---- ---- ---- ---- ----
### 509/621 [`./test/random/select/slt_good_114.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_114.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1393 failed
* 86% was OK

Time: 20167ms

---- ---- ---- ---- ---- ---- ----
### 510/621 [`./test/random/select/slt_good_115.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_115.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1445 failed
* 85% was OK

Time: 21164ms

---- ---- ---- ---- ---- ---- ----
### 511/621 [`./test/random/select/slt_good_116.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_116.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1466 failed
* 85% was OK

Time: 20115ms

---- ---- ---- ---- ---- ---- ----
### 512/621 [`./test/random/select/slt_good_117.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_117.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1524 failed
* 84% was OK

Time: 21658ms

---- ---- ---- ---- ---- ---- ----
### 513/621 [`./test/random/select/slt_good_118.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_118.test)

_Mimic sqlite_

```sql
SELECT col0 / col1 + + col2 * col1 FROM tab2

Expected: ["1535","650","837"] but got ["1535.322","650.647","837.226"]
```

#### ☓ Ran 10012 tests as sqlite

* 1447 failed
* 85% was OK

Time: 20541ms

---- ---- ---- ---- ---- ---- ----
### 514/621 [`./test/random/select/slt_good_119.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_119.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1441 failed
* 85% was OK

Time: 18990ms

---- ---- ---- ---- ---- ---- ----
### 515/621 [`./test/random/select/slt_good_12.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_12.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1256 failed
* 87% was OK

Time: 19096ms

---- ---- ---- ---- ---- ---- ----
### 516/621 [`./test/random/select/slt_good_120.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_120.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1434 failed
* 85% was OK

Time: 19869ms

---- ---- ---- ---- ---- ---- ----
### 517/621 [`./test/random/select/slt_good_121.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_121.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1397 failed
* 86% was OK

Time: 19836ms

---- ---- ---- ---- ---- ---- ----
### 518/621 [`./test/random/select/slt_good_122.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_122.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1464 failed
* 85% was OK

Time: 20985ms

---- ---- ---- ---- ---- ---- ----
### 519/621 [`./test/random/select/slt_good_123.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_123.test)

_Mimic sqlite_

```sql
SELECT + cor1.col2 * + CAST ( NULL AS INTEGER ) FROM tab0 AS cor0 CROSS JOIN tab0 cor1

Correct amount of values returned but hash was different than expected.
```


```sql
SELECT DISTINCT col0 / + tab2.col1 col1 FROM tab2

Expected: ["0","1","4"] but got ["0.226","1.322","4.647"]
```

#### ☓ Ran 10012 tests as sqlite

* 1443 failed
* 85% was OK

Time: 20410ms

---- ---- ---- ---- ---- ---- ----
### 520/621 [`./test/random/select/slt_good_124.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_124.test)

_Mimic sqlite_
#### ☓ Ran 2865 tests as sqlite

* 396 failed
* 86% was OK

Time: 5363ms

---- ---- ---- ---- ---- ---- ----
### 521/621 [`./test/random/select/slt_good_125.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_125.test)

_Mimic sqlite_
#### ★ Ran 12 tests as sqlite

* 100% was OK

Time: 20ms

---- ---- ---- ---- ---- ---- ----
### 522/621 [`./test/random/select/slt_good_126.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_126.test)

_Mimic sqlite_
#### ★ Ran 12 tests as sqlite

* 100% was OK

Time: 20ms

---- ---- ---- ---- ---- ---- ----
### 523/621 [`./test/random/select/slt_good_13.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_13.test)

_Mimic sqlite_

```sql
SELECT col2 + - CAST ( NULL AS INTEGER ) AS col2 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["26","27","38"]
```

#### ☓ Ran 10012 tests as sqlite

* 1314 failed
* 86% was OK

Time: 19180ms

---- ---- ---- ---- ---- ---- ----
### 524/621 [`./test/random/select/slt_good_14.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_14.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1300 failed
* 87% was OK

Time: 19646ms

---- ---- ---- ---- ---- ---- ----
### 525/621 [`./test/random/select/slt_good_15.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_15.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1280 failed
* 87% was OK

Time: 18732ms

---- ---- ---- ---- ---- ---- ----
### 526/621 [`./test/random/select/slt_good_16.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_16.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1295 failed
* 87% was OK

Time: 19586ms

---- ---- ---- ---- ---- ---- ----
### 527/621 [`./test/random/select/slt_good_17.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_17.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1327 failed
* 86% was OK

Time: 20048ms

---- ---- ---- ---- ---- ---- ----
### 528/621 [`./test/random/select/slt_good_18.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_18.test)

_Mimic sqlite_

```sql
SELECT - col1 * col1 + + col2 / col0 AS col1 FROM tab1 WHERE col2 + - col2 <> - tab1.col0

Expected: ["-100","-168","-658"] but got ["-167.800","-658","-99.109"]
```

#### ☓ Ran 10012 tests as sqlite

* 1335 failed
* 86% was OK

Time: 19182ms

---- ---- ---- ---- ---- ---- ----
### 529/621 [`./test/random/select/slt_good_19.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_19.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1306 failed
* 86% was OK

Time: 20595ms

---- ---- ---- ---- ---- ---- ----
### 530/621 [`./test/random/select/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_2.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1291 failed
* 87% was OK

Time: 18999ms

---- ---- ---- ---- ---- ---- ----
### 531/621 [`./test/random/select/slt_good_20.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_20.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1299 failed
* 87% was OK

Time: 18791ms

---- ---- ---- ---- ---- ---- ----
### 532/621 [`./test/random/select/slt_good_21.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_21.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1347 failed
* 86% was OK

Time: 19926ms

---- ---- ---- ---- ---- ---- ----
### 533/621 [`./test/random/select/slt_good_22.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_22.test)

_Mimic sqlite_

```sql
SELECT + col0 + - 99 / - 45 FROM tab2 AS cor0

Expected: ["80","81","9"] but got ["80.200","81.200","9.200"]
```


```sql
SELECT col2 / col0 + - 29 AS col1 FROM tab2 cor0

Expected: ["-26","-29","-29"] but got ["-25.143","-28.519","-28.667"]
```

#### ☓ Ran 10010 tests as sqlite

* 1324 failed
* 86% was OK

Time: 19652ms

---- ---- ---- ---- ---- ---- ----
### 534/621 [`./test/random/select/slt_good_23.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_23.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1346 failed
* 86% was OK

Time: 20401ms

---- ---- ---- ---- ---- ---- ----
### 535/621 [`./test/random/select/slt_good_24.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_24.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1321 failed
* 86% was OK

Time: 20497ms

---- ---- ---- ---- ---- ---- ----
### 536/621 [`./test/random/select/slt_good_25.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_25.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1313 failed
* 86% was OK

Time: 20186ms

---- ---- ---- ---- ---- ---- ----
### 537/621 [`./test/random/select/slt_good_26.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_26.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1349 failed
* 86% was OK

Time: 20383ms

---- ---- ---- ---- ---- ---- ----
### 538/621 [`./test/random/select/slt_good_27.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_27.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1287 failed
* 87% was OK

Time: 21114ms

---- ---- ---- ---- ---- ---- ----
### 539/621 [`./test/random/select/slt_good_28.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_28.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1306 failed
* 86% was OK

Time: 21494ms

---- ---- ---- ---- ---- ---- ----
### 540/621 [`./test/random/select/slt_good_29.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_29.test)

_Mimic sqlite_

```sql
SELECT + - col2 + + 24 / col1 FROM tab0 cor0

Expected: ["-1","-33","-82"] but got ["-0.753","-32.721","-81.736"]
```

#### ☓ Ran 10012 tests as sqlite

* 1405 failed
* 85% was OK

Time: 19953ms

---- ---- ---- ---- ---- ---- ----
### 541/621 [`./test/random/select/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT ALL - cor0.col1 + - CAST ( NULL AS INTEGER ) AS col0 FROM tab0, tab2 AS cor0

Correct amount of values returned but hash was different than expected.
```

#### ☓ Ran 10011 tests as sqlite

* 1258 failed
* 87% was OK

Time: 19582ms

---- ---- ---- ---- ---- ---- ----
### 542/621 [`./test/random/select/slt_good_30.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_30.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1409 failed
* 85% was OK

Time: 19864ms

---- ---- ---- ---- ---- ---- ----
### 543/621 [`./test/random/select/slt_good_31.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_31.test)

_Mimic sqlite_

```sql
SELECT cor0.col2 + - col2 * + CAST ( NULL AS INTEGER ) / + col1 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["54","57","96"]
```

#### ☓ Ran 10012 tests as sqlite

* 1382 failed
* 86% was OK

Time: 20698ms

---- ---- ---- ---- ---- ---- ----
### 544/621 [`./test/random/select/slt_good_32.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_32.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1354 failed
* 86% was OK

Time: 20482ms

---- ---- ---- ---- ---- ---- ----
### 545/621 [`./test/random/select/slt_good_33.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_33.test)

_Mimic sqlite_

```sql
SELECT CAST ( NULL AS INTEGER ) + - 35 FROM tab0 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["-35","-35","-35"]
```

#### ☓ Ran 10012 tests as sqlite

* 1384 failed
* 86% was OK

Time: 19632ms

---- ---- ---- ---- ---- ---- ----
### 546/621 [`./test/random/select/slt_good_34.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_34.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1385 failed
* 86% was OK

Time: 19458ms

---- ---- ---- ---- ---- ---- ----
### 547/621 [`./test/random/select/slt_good_35.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_35.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1344 failed
* 86% was OK

Time: 20136ms

---- ---- ---- ---- ---- ---- ----
### 548/621 [`./test/random/select/slt_good_36.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_36.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1438 failed
* 85% was OK

Time: 20551ms

---- ---- ---- ---- ---- ---- ----
### 549/621 [`./test/random/select/slt_good_37.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_37.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1300 failed
* 87% was OK

Time: 20974ms

---- ---- ---- ---- ---- ---- ----
### 550/621 [`./test/random/select/slt_good_38.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_38.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1339 failed
* 86% was OK

Time: 20077ms

---- ---- ---- ---- ---- ---- ----
### 551/621 [`./test/random/select/slt_good_39.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_39.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1334 failed
* 86% was OK

Time: 20822ms

---- ---- ---- ---- ---- ---- ----
### 552/621 [`./test/random/select/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_4.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1317 failed
* 86% was OK

Time: 18613ms

---- ---- ---- ---- ---- ---- ----
### 553/621 [`./test/random/select/slt_good_40.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_40.test)

_Mimic sqlite_

```sql
SELECT CAST ( NULL AS INTEGER ) + + col2 * tab1.col1 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["1248","1404","570"]
```

#### ☓ Ran 10010 tests as sqlite

* 1324 failed
* 86% was OK

Time: 18214ms

---- ---- ---- ---- ---- ---- ----
### 554/621 [`./test/random/select/slt_good_41.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_41.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1362 failed
* 86% was OK

Time: 19164ms

---- ---- ---- ---- ---- ---- ----
### 555/621 [`./test/random/select/slt_good_42.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_42.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1431 failed
* 85% was OK

Time: 18628ms

---- ---- ---- ---- ---- ---- ----
### 556/621 [`./test/random/select/slt_good_43.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_43.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1317 failed
* 86% was OK

Time: 18454ms

---- ---- ---- ---- ---- ---- ----
### 557/621 [`./test/random/select/slt_good_44.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_44.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1341 failed
* 86% was OK

Time: 19380ms

---- ---- ---- ---- ---- ---- ----
### 558/621 [`./test/random/select/slt_good_45.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_45.test)

_Mimic sqlite_

```sql
SELECT ALL col0 + CAST ( NULL AS INTEGER ) AS col2 FROM tab1 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["3","64","80"]
```

#### ☓ Ran 10012 tests as sqlite

* 1346 failed
* 86% was OK

Time: 19114ms

---- ---- ---- ---- ---- ---- ----
### 559/621 [`./test/random/select/slt_good_46.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_46.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1389 failed
* 86% was OK

Time: 18896ms

---- ---- ---- ---- ---- ---- ----
### 560/621 [`./test/random/select/slt_good_47.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_47.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1374 failed
* 86% was OK

Time: 18949ms

---- ---- ---- ---- ---- ---- ----
### 561/621 [`./test/random/select/slt_good_48.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_48.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + col0 * tab2.col2 / col1 col0 FROM tab2

Expected: ["176","34","6"] but got ["176.588","34.373","6.097"]
```

#### ☓ Ran 10012 tests as sqlite

* 1375 failed
* 86% was OK

Time: 19536ms

---- ---- ---- ---- ---- ---- ----
### 562/621 [`./test/random/select/slt_good_49.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_49.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1342 failed
* 86% was OK

Time: 18273ms

---- ---- ---- ---- ---- ---- ----
### 563/621 [`./test/random/select/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_5.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1323 failed
* 86% was OK

Time: 17291ms

---- ---- ---- ---- ---- ---- ----
### 564/621 [`./test/random/select/slt_good_50.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_50.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1405 failed
* 85% was OK

Time: 17473ms

---- ---- ---- ---- ---- ---- ----
### 565/621 [`./test/random/select/slt_good_51.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_51.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1362 failed
* 86% was OK

Time: 17388ms

---- ---- ---- ---- ---- ---- ----
### 566/621 [`./test/random/select/slt_good_52.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_52.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1428 failed
* 85% was OK

Time: 17550ms

---- ---- ---- ---- ---- ---- ----
### 567/621 [`./test/random/select/slt_good_53.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_53.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1370 failed
* 86% was OK

Time: 17238ms

---- ---- ---- ---- ---- ---- ----
### 568/621 [`./test/random/select/slt_good_54.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_54.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1459 failed
* 85% was OK

Time: 17400ms

---- ---- ---- ---- ---- ---- ----
### 569/621 [`./test/random/select/slt_good_55.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_55.test)

_Mimic sqlite_

```sql
SELECT DISTINCT - col0 * col2 + cor0.col2 / col2 - CAST ( NULL AS INTEGER ) * col2 FROM tab0 AS cor0

Expected: ["NULL"] but got ["-34","-7297","-791"]
```

#### ☓ Ran 10009 tests as sqlite

* 1391 failed
* 86% was OK

Time: 18928ms

---- ---- ---- ---- ---- ---- ----
### 570/621 [`./test/random/select/slt_good_56.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_56.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1322 failed
* 86% was OK

Time: 18972ms

---- ---- ---- ---- ---- ---- ----
### 571/621 [`./test/random/select/slt_good_57.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_57.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1442 failed
* 85% was OK

Time: 20210ms

---- ---- ---- ---- ---- ---- ----
### 572/621 [`./test/random/select/slt_good_58.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_58.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1411 failed
* 85% was OK

Time: 22476ms

---- ---- ---- ---- ---- ---- ----
### 573/621 [`./test/random/select/slt_good_59.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_59.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1418 failed
* 85% was OK

Time: 20720ms

---- ---- ---- ---- ---- ---- ----
### 574/621 [`./test/random/select/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_6.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1345 failed
* 86% was OK

Time: 19527ms

---- ---- ---- ---- ---- ---- ----
### 575/621 [`./test/random/select/slt_good_60.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_60.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1421 failed
* 85% was OK

Time: 18984ms

---- ---- ---- ---- ---- ---- ----
### 576/621 [`./test/random/select/slt_good_61.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_61.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1417 failed
* 85% was OK

Time: 21533ms

---- ---- ---- ---- ---- ---- ----
### 577/621 [`./test/random/select/slt_good_62.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_62.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1353 failed
* 86% was OK

Time: 18051ms

---- ---- ---- ---- ---- ---- ----
### 578/621 [`./test/random/select/slt_good_63.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_63.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1421 failed
* 85% was OK

Time: 18497ms

---- ---- ---- ---- ---- ---- ----
### 579/621 [`./test/random/select/slt_good_64.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_64.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1367 failed
* 86% was OK

Time: 19762ms

---- ---- ---- ---- ---- ---- ----
### 580/621 [`./test/random/select/slt_good_65.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_65.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1400 failed
* 86% was OK

Time: 20732ms

---- ---- ---- ---- ---- ---- ----
### 581/621 [`./test/random/select/slt_good_66.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_66.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1377 failed
* 86% was OK

Time: 18746ms

---- ---- ---- ---- ---- ---- ----
### 582/621 [`./test/random/select/slt_good_67.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_67.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1354 failed
* 86% was OK

Time: 28068ms

---- ---- ---- ---- ---- ---- ----
### 583/621 [`./test/random/select/slt_good_68.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_68.test)

_Mimic sqlite_

```sql
SELECT DISTINCT + tab1.col1 / + tab1.col2 + col0 FROM tab1

Expected: ["3","64","80"] but got ["3.481","64.175","80.135"]
```

#### ☓ Ran 10011 tests as sqlite

* 1386 failed
* 86% was OK

Time: 18971ms

---- ---- ---- ---- ---- ---- ----
### 584/621 [`./test/random/select/slt_good_69.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_69.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1403 failed
* 85% was OK

Time: 19192ms

---- ---- ---- ---- ---- ---- ----
### 585/621 [`./test/random/select/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT - CAST ( NULL AS INTEGER ) * + col1 FROM tab2 AS cor0

Expected: ["NULL","NULL","NULL"] but got ["0","0","0"]
```

#### ☓ Ran 10012 tests as sqlite

* 1283 failed
* 87% was OK

Time: 19015ms

---- ---- ---- ---- ---- ---- ----
### 586/621 [`./test/random/select/slt_good_70.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_70.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1449 failed
* 85% was OK

Time: 17895ms

---- ---- ---- ---- ---- ---- ----
### 587/621 [`./test/random/select/slt_good_71.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_71.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1400 failed
* 86% was OK

Time: 19713ms

---- ---- ---- ---- ---- ---- ----
### 588/621 [`./test/random/select/slt_good_72.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_72.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1437 failed
* 85% was OK

Time: 20150ms

---- ---- ---- ---- ---- ---- ----
### 589/621 [`./test/random/select/slt_good_73.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_73.test)

_Mimic sqlite_
#### ☓ Ran 10010 tests as sqlite

* 1433 failed
* 85% was OK

Time: 20425ms

---- ---- ---- ---- ---- ---- ----
### 590/621 [`./test/random/select/slt_good_74.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_74.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1400 failed
* 86% was OK

Time: 20134ms

---- ---- ---- ---- ---- ---- ----
### 591/621 [`./test/random/select/slt_good_75.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_75.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1336 failed
* 86% was OK

Time: 27383ms

---- ---- ---- ---- ---- ---- ----
### 592/621 [`./test/random/select/slt_good_76.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_76.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1440 failed
* 85% was OK

Time: 21983ms

---- ---- ---- ---- ---- ---- ----
### 593/621 [`./test/random/select/slt_good_77.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_77.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1415 failed
* 85% was OK

Time: 19059ms

---- ---- ---- ---- ---- ---- ----
### 594/621 [`./test/random/select/slt_good_78.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_78.test)

_Mimic sqlite_

```sql
SELECT - + col2 / cor0.col1 FROM tab2 AS cor0

Expected: ["-2","0","0"] but got ["-0.441","-0.871","-2.235"]
```

#### ☓ Ran 10011 tests as sqlite

* 1395 failed
* 86% was OK

Time: 18622ms

---- ---- ---- ---- ---- ---- ----
### 595/621 [`./test/random/select/slt_good_79.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_79.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1395 failed
* 86% was OK

Time: 18547ms

---- ---- ---- ---- ---- ---- ----
### 596/621 [`./test/random/select/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_8.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1322 failed
* 86% was OK

Time: 17598ms

---- ---- ---- ---- ---- ---- ----
### 597/621 [`./test/random/select/slt_good_80.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_80.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1423 failed
* 85% was OK

Time: 27678ms

---- ---- ---- ---- ---- ---- ----
### 598/621 [`./test/random/select/slt_good_81.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_81.test)

_Mimic sqlite_

```sql
SELECT ALL 68 * col0 + col1 * CAST ( NULL AS INTEGER ) AS col2 FROM tab1

Expected: ["NULL","NULL","NULL"] but got ["204","4352","5440"]
```

#### ☓ Ran 10012 tests as sqlite

* 1406 failed
* 85% was OK

Time: 25664ms

---- ---- ---- ---- ---- ---- ----
### 599/621 [`./test/random/select/slt_good_82.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_82.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1379 failed
* 86% was OK

Time: 23288ms

---- ---- ---- ---- ---- ---- ----
### 600/621 [`./test/random/select/slt_good_83.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_83.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1430 failed
* 85% was OK

Time: 19323ms

---- ---- ---- ---- ---- ---- ----
### 601/621 [`./test/random/select/slt_good_84.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_84.test)

_Mimic sqlite_
#### ☓ Ran 10011 tests as sqlite

* 1451 failed
* 85% was OK

Time: 20887ms

---- ---- ---- ---- ---- ---- ----
### 602/621 [`./test/random/select/slt_good_85.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_85.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1433 failed
* 85% was OK

Time: 24330ms

---- ---- ---- ---- ---- ---- ----
### 603/621 [`./test/random/select/slt_good_86.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_86.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1378 failed
* 86% was OK

Time: 19911ms

---- ---- ---- ---- ---- ---- ----
### 604/621 [`./test/random/select/slt_good_87.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_87.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1377 failed
* 86% was OK

Time: 19149ms

---- ---- ---- ---- ---- ---- ----
### 605/621 [`./test/random/select/slt_good_88.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_88.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1429 failed
* 85% was OK

Time: 23807ms

---- ---- ---- ---- ---- ---- ----
### 606/621 [`./test/random/select/slt_good_89.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_89.test)

_Mimic sqlite_

```sql
SELECT ALL col0 / ( 22 ) FROM tab2

Expected: ["0","3","3"] but got ["0.318","3.545","3.591"]
```

#### ☓ Ran 10012 tests as sqlite

* 1404 failed
* 85% was OK

Time: 24711ms

---- ---- ---- ---- ---- ---- ----
### 607/621 [`./test/random/select/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT + col1 / col0 col1 FROM tab0 AS cor0

Expected: ["1","2","3"] but got ["1.022","2.771","3.583"]
```

#### ☓ Ran 10010 tests as sqlite

* 1295 failed
* 87% was OK

Time: 21837ms

---- ---- ---- ---- ---- ---- ----
### 608/621 [`./test/random/select/slt_good_90.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_90.test)

_Mimic sqlite_

```sql
SELECT col1 FROM tab0 WHERE NOT ( - col1 ) IN ( col1 )

Query was expected to return results (but did not) 
```

#### ☓ Ran 10012 tests as sqlite

* 1375 failed
* 86% was OK

Time: 24522ms

---- ---- ---- ---- ---- ---- ----
### 609/621 [`./test/random/select/slt_good_91.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_91.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1371 failed
* 86% was OK

Time: 22592ms

---- ---- ---- ---- ---- ---- ----
### 610/621 [`./test/random/select/slt_good_92.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_92.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1485 failed
* 85% was OK

Time: 25382ms

---- ---- ---- ---- ---- ---- ----
### 611/621 [`./test/random/select/slt_good_93.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_93.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1389 failed
* 86% was OK

Time: 22207ms

---- ---- ---- ---- ---- ---- ----
### 612/621 [`./test/random/select/slt_good_94.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_94.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1435 failed
* 85% was OK

Time: 21607ms

---- ---- ---- ---- ---- ---- ----
### 613/621 [`./test/random/select/slt_good_95.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_95.test)

_Mimic sqlite_

```sql
SELECT - ( col0 ) / col1 + + col1 + + tab1.col0 FROM tab1

Expected: ["29","68","87"] but got ["28.885","67.600","86.846"]
```

#### ☓ Ran 10011 tests as sqlite

* 1399 failed
* 86% was OK

Time: 22598ms

---- ---- ---- ---- ---- ---- ----
### 614/621 [`./test/random/select/slt_good_96.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_96.test)

_Mimic sqlite_

```sql
SELECT ALL - col2 / cor0.col0 AS col0 FROM tab0 cor0

Expected: ["-1","0","0"] but got ["-0.029","-0.921","-1.375"]
```

#### ☓ Ran 10012 tests as sqlite

* 1324 failed
* 86% was OK

Time: 23975ms

---- ---- ---- ---- ---- ---- ----
### 615/621 [`./test/random/select/slt_good_97.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_97.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1412 failed
* 85% was OK

Time: 22802ms

---- ---- ---- ---- ---- ---- ----
### 616/621 [`./test/random/select/slt_good_98.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_98.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1404 failed
* 85% was OK

Time: 22704ms

---- ---- ---- ---- ---- ---- ----
### 617/621 [`./test/random/select/slt_good_99.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_99.test)

_Mimic sqlite_
#### ☓ Ran 10012 tests as sqlite

* 1382 failed
* 86% was OK

Time: 22996ms

---- ---- ---- ---- ---- ---- ----
### 618/621 [`./test/select1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select1.test)

_Mimic sqlite_
#### ★ Ran 1031 tests as sqlite

* 100% was OK

Time: 7967ms

---- ---- ---- ---- ---- ---- ----
### 619/621 [`./test/select2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select2.test)

_Mimic sqlite_

```sql
SELECT a, (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b), a+b*2+c*3+d*4+e*5, d FROM t1 WHERE a IS NULL

Expected: ["NULL","1","NULL","114","NULL","18","NULL","207"] but got ["NULL","18","NULL","207","NULL","1","NULL","114"]
```

#### ☓ Ran 1031 tests as sqlite

* 104 failed
* 89% was OK

Time: 7177ms

---- ---- ---- ---- ---- ---- ----
### 620/621 [`./test/select3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select3.test)

_Mimic sqlite_

```sql
SELECT CASE a+1 WHEN b THEN 111 WHEN c THEN 222 WHEN d THEN 333 WHEN e THEN 444 ELSE 555 END, a+b*2+c*3, c-d, e FROM t1 WHERE (a>b-2 AND a<b+2) AND a>b AND d NOT BETWEEN 110 AND 150 ORDER BY 2,4,3

20 results returned but expected 12
```

#### ☓ Ran 3351 tests as sqlite

* 358 failed
* 89% was OK

Time: 27667ms

---- ---- ---- ---- ---- ---- ----
### 621/621 [`./test/select4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select4.test)

_Mimic sqlite_

```sql
CREATE INDEX t1i0 ON t1(a1,b1,c1,d1,e1,x1)

rightfns is not a function
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 3857 tests as sqlite

* 2838 skipped
* 10 failed
* 26% was OK

Time: 3136ms

-----------------------------

## Final result

* Skipped tests: 56317
* Failed tests: 688726
* Total tested: 5945362
* Final score: 87 % was OK

Total script time: 21219236ms

_Please note that repetetive errors are not always printed again_
