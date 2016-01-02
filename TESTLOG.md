# SQLlogictest results for AlaSQL 0.2.2-pre-develop+151231.53429

_2016-01-02T03:58:40.581Z_

This is a subset of the total 622 tests.
Results from 124 test files:

---- ---- ---- ---- ---- ---- ----
### 1/124 [`./test/evidence/in1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in1.test)

_Mimic sqlite_
#### ★ Ran 214 tests as sqlite

* 100% was OK

Time: 458ms

---- ---- ---- ---- ---- ---- ----
### 2/124 [`./test/evidence/in2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/in2.test)

_Mimic sqlite_
#### ★ Ran 53 tests as sqlite

* 100% was OK

Time: 279ms

---- ---- ---- ---- ---- ---- ----
### 3/124 [`./test/evidence/slt_lang_aggfunc.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_aggfunc.test)

_Mimic sqlite_

```sql
SELECT group_concat(DISTINCT x) FROM t1 NOT INDEXED

Parse error on line 1:
...DISTINCT x) FROM t1 NOT INDEXED
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'COMMA', 'AS', 'LPAR', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'DOT', 'UNION', 'INTERSECT', 'EXCEPT', 'FROM', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'NOT'
```


```sql
SELECT x FROM t1 WHERE x NOT NULL ORDER BY x

Parse error on line 1:
...FROM t1 WHERE x NOT NULL ORDER BY x
-----------------------^
Expecting 'IN', got 'NULL'
```


```sql
INSERT INTO t1 VALUES(1<<63,'true');

Parse error on line 1:
...RT INTO t1 VALUES(1<<63,'true');
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'LPAR', 'NUMBER', 'STRING', 'SHARP', 'DOLLAR', 'AT', 'COLON', 'NOT', 'IF', 'ALL', 'ANY', 'PLUS', 'STAR', 'QUESTION', 'CURRENT_TIMESTAMP', 'JAVASCRIPT', 'NEW', 'CAST', 'CONVERT', 'SUM', 'COUNT', 'MIN', 'MAX', 'AVG', 'FIRST', 'LAST', 'AGGR', 'ARRAY', 'TRUE', 'FALSE', 'NSTRING', 'NULL', 'EXISTS', 'BRAQUESTION', 'CASE', 'MINUS', 'SOME', 'ATLBRA', 'LCUR', got 'LT'
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 80 tests as sqlite

* 6 skipped
* 11 failed
* 78% was OK

Time: 283ms

---- ---- ---- ---- ---- ---- ----
### 4/124 [`./test/evidence/slt_lang_createtrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createtrigger.test)

_Mimic sqlite_
#### ★ Ran 26 tests as sqlite

* 100% was OK

Time: 56ms

---- ---- ---- ---- ---- ---- ----
### 5/124 [`./test/evidence/slt_lang_createview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_createview.test)

_Mimic sqlite_
#### ★ Ran 23 tests as sqlite

* 100% was OK

Time: 58ms

---- ---- ---- ---- ---- ---- ----
### 6/124 [`./test/evidence/slt_lang_dropindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropindex.test)

_Mimic sqlite_
#### ★ Ran 8 tests as sqlite

* 100% was OK

Time: 16ms

---- ---- ---- ---- ---- ---- ----
### 7/124 [`./test/evidence/slt_lang_droptable.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptable.test)

_Mimic sqlite_
#### ★ Ran 12 tests as sqlite

* 100% was OK

Time: 18ms

---- ---- ---- ---- ---- ---- ----
### 8/124 [`./test/evidence/slt_lang_droptrigger.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_droptrigger.test)

_Mimic sqlite_
#### ★ Ran 12 tests as sqlite

* 100% was OK

Time: 25ms

---- ---- ---- ---- ---- ---- ----
### 9/124 [`./test/evidence/slt_lang_dropview.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_dropview.test)

_Mimic sqlite_
#### ★ Ran 13 tests as sqlite

* 100% was OK

Time: 23ms

---- ---- ---- ---- ---- ---- ----
### 10/124 [`./test/evidence/slt_lang_reindex.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_reindex.test)

_Mimic sqlite_

```sql
REINDEX t1i1

Parse error on line 1:
REINDEX t1i1
--------^
Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'SEMICOLON', 'GO', got 'LITERAL'
```

_Fail found for statement setting up data so skipping rest of tests_

#### ☓ Ran 7 tests as sqlite

* 1 skipped
* 1 failed
* 71% was OK

Time: 17ms

---- ---- ---- ---- ---- ---- ----
### 11/124 [`./test/evidence/slt_lang_replace.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_replace.test)

_Mimic sqlite_
#### ★ Ran 14 tests as sqlite

* 100% was OK

Time: 26ms

---- ---- ---- ---- ---- ---- ----
### 12/124 [`./test/evidence/slt_lang_update.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/evidence/slt_lang_update.test)

_Mimic sqlite_
#### ★ Ran 27 tests as sqlite

* 100% was OK

Time: 45ms

---- ---- ---- ---- ---- ---- ----
### 13/124 [`./test/index/between/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/1/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10022 tests as sqlite

* 100% was OK

Time: 122212ms

---- ---- ---- ---- ---- ---- ----
### 14/124 [`./test/index/between/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 96277ms

---- ---- ---- ---- ---- ---- ----
### 15/124 [`./test/index/between/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10029 tests as sqlite

* 100% was OK

Time: 71541ms

---- ---- ---- ---- ---- ---- ----
### 16/124 [`./test/index/between/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 78843ms

---- ---- ---- ---- ---- ---- ----
### 17/124 [`./test/index/between/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 93565ms

---- ---- ---- ---- ---- ---- ----
### 18/124 [`./test/index/between/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 80384ms

---- ---- ---- ---- ---- ---- ----
### 19/124 [`./test/index/between/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/between/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 69644ms

---- ---- ---- ---- ---- ---- ----
### 20/124 [`./test/index/commute/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 28578ms

---- ---- ---- ---- ---- ---- ----
### 21/124 [`./test/index/commute/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10030 tests as sqlite

* 100% was OK

Time: 30478ms

---- ---- ---- ---- ---- ---- ----
### 22/124 [`./test/index/commute/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10037 tests as sqlite

* 100% was OK

Time: 30482ms

---- ---- ---- ---- ---- ---- ----
### 23/124 [`./test/index/commute/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 32184ms

---- ---- ---- ---- ---- ---- ----
### 24/124 [`./test/index/commute/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10030 tests as sqlite

* 100% was OK

Time: 31848ms

---- ---- ---- ---- ---- ---- ----
### 25/124 [`./test/index/commute/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 28880ms

---- ---- ---- ---- ---- ---- ----
### 26/124 [`./test/index/commute/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10036 tests as sqlite

* 100% was OK

Time: 33519ms

---- ---- ---- ---- ---- ---- ----
### 27/124 [`./test/index/commute/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 30230ms

---- ---- ---- ---- ---- ---- ----
### 28/124 [`./test/index/commute/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 35820ms

---- ---- ---- ---- ---- ---- ----
### 29/124 [`./test/index/commute/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/commute/10/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 34398ms

---- ---- ---- ---- ---- ---- ----
### 30/124 [`./test/index/delete/1/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/1/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10907 tests as sqlite

* 100% was OK

Time: 19339ms

---- ---- ---- ---- ---- ---- ----
### 31/124 [`./test/index/delete/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10730 tests as sqlite

* 100% was OK

Time: 18967ms

---- ---- ---- ---- ---- ---- ----
### 32/124 [`./test/index/delete/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10774 tests as sqlite

* 100% was OK

Time: 18995ms

---- ---- ---- ---- ---- ---- ----
### 33/124 [`./test/index/delete/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 9390 tests as sqlite

* 100% was OK

Time: 19451ms

---- ---- ---- ---- ---- ---- ----
### 34/124 [`./test/index/delete/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10065 tests as sqlite

* 100% was OK

Time: 19393ms

---- ---- ---- ---- ---- ---- ----
### 35/124 [`./test/index/delete/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10599 tests as sqlite

* 100% was OK

Time: 18995ms

---- ---- ---- ---- ---- ---- ----
### 36/124 [`./test/index/delete/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/delete/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10353 tests as sqlite

* 100% was OK

Time: 19316ms

---- ---- ---- ---- ---- ---- ----
### 37/124 [`./test/index/in/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10035 tests as sqlite

* 100% was OK

Time: 102867ms

---- ---- ---- ---- ---- ---- ----
### 38/124 [`./test/index/in/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10036 tests as sqlite

* 100% was OK

Time: 101731ms

---- ---- ---- ---- ---- ---- ----
### 39/124 [`./test/index/in/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10035 tests as sqlite

* 100% was OK

Time: 94975ms

---- ---- ---- ---- ---- ---- ----
### 40/124 [`./test/index/in/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10037 tests as sqlite

* 100% was OK

Time: 90481ms

---- ---- ---- ---- ---- ---- ----
### 41/124 [`./test/index/in/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10038 tests as sqlite

* 100% was OK

Time: 91475ms

---- ---- ---- ---- ---- ---- ----
### 42/124 [`./test/index/in/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/in/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10038 tests as sqlite

* 100% was OK

Time: 90232ms

---- ---- ---- ---- ---- ---- ----
### 43/124 [`./test/index/orderby/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 30435ms

---- ---- ---- ---- ---- ---- ----
### 44/124 [`./test/index/orderby/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 30740ms

---- ---- ---- ---- ---- ---- ----
### 45/124 [`./test/index/orderby/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 34495ms

---- ---- ---- ---- ---- ---- ----
### 46/124 [`./test/index/orderby/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 36259ms

---- ---- ---- ---- ---- ---- ----
### 47/124 [`./test/index/orderby/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 26572ms

---- ---- ---- ---- ---- ---- ----
### 48/124 [`./test/index/orderby/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 27184ms

---- ---- ---- ---- ---- ---- ----
### 49/124 [`./test/index/orderby/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10048 tests as sqlite

* 100% was OK

Time: 38101ms

---- ---- ---- ---- ---- ---- ----
### 50/124 [`./test/index/orderby/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 37173ms

---- ---- ---- ---- ---- ---- ----
### 51/124 [`./test/index/orderby/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 35942ms

---- ---- ---- ---- ---- ---- ----
### 52/124 [`./test/index/orderby/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby/10/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10050 tests as sqlite

* 100% was OK

Time: 34142ms

---- ---- ---- ---- ---- ---- ----
### 53/124 [`./test/index/orderby_nosort/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 33502ms

---- ---- ---- ---- ---- ---- ----
### 54/124 [`./test/index/orderby_nosort/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 37939ms

---- ---- ---- ---- ---- ---- ----
### 55/124 [`./test/index/orderby_nosort/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 32128ms

---- ---- ---- ---- ---- ---- ----
### 56/124 [`./test/index/orderby_nosort/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10051 tests as sqlite

* 100% was OK

Time: 34765ms

---- ---- ---- ---- ---- ---- ----
### 57/124 [`./test/index/orderby_nosort/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 41424ms

---- ---- ---- ---- ---- ---- ----
### 58/124 [`./test/index/orderby_nosort/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 31553ms

---- ---- ---- ---- ---- ---- ----
### 59/124 [`./test/index/orderby_nosort/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10053 tests as sqlite

* 100% was OK

Time: 26559ms

---- ---- ---- ---- ---- ---- ----
### 60/124 [`./test/index/orderby_nosort/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10052 tests as sqlite

* 100% was OK

Time: 31070ms

---- ---- ---- ---- ---- ---- ----
### 61/124 [`./test/index/orderby_nosort/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10054 tests as sqlite

* 100% was OK

Time: 40659ms

---- ---- ---- ---- ---- ---- ----
### 62/124 [`./test/index/orderby_nosort/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/orderby_nosort/10/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10055 tests as sqlite

* 100% was OK

Time: 32428ms

---- ---- ---- ---- ---- ---- ----
### 63/124 [`./test/index/random/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 17146ms

---- ---- ---- ---- ---- ---- ----
### 64/124 [`./test/index/random/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 17247ms

---- ---- ---- ---- ---- ---- ----
### 65/124 [`./test/index/random/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 17429ms

---- ---- ---- ---- ---- ---- ----
### 66/124 [`./test/index/random/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 17415ms

---- ---- ---- ---- ---- ---- ----
### 67/124 [`./test/index/random/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10033 tests as sqlite

* 100% was OK

Time: 17347ms

---- ---- ---- ---- ---- ---- ----
### 68/124 [`./test/index/random/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 16554ms

---- ---- ---- ---- ---- ---- ----
### 69/124 [`./test/index/random/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10034 tests as sqlite

* 100% was OK

Time: 16804ms

---- ---- ---- ---- ---- ---- ----
### 70/124 [`./test/index/random/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 17030ms

---- ---- ---- ---- ---- ---- ----
### 71/124 [`./test/index/random/10/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10032 tests as sqlite

* 100% was OK

Time: 18424ms

---- ---- ---- ---- ---- ---- ----
### 72/124 [`./test/index/random/10/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/random/10/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10031 tests as sqlite

* 100% was OK

Time: 16911ms

---- ---- ---- ---- ---- ---- ----
### 73/124 [`./test/index/view/10/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_0.test)

_Mimic sqlite_
Time: 5ms

---- ---- ---- ---- ---- ---- ----
### 74/124 [`./test/index/view/10/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 7135 tests as sqlite

* 100% was OK

Time: 13874ms

---- ---- ---- ---- ---- ---- ----
### 75/124 [`./test/index/view/10/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 7333 tests as sqlite

* 100% was OK

Time: 14174ms

---- ---- ---- ---- ---- ---- ----
### 76/124 [`./test/index/view/10/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 6734 tests as sqlite

* 100% was OK

Time: 14732ms

---- ---- ---- ---- ---- ---- ----
### 77/124 [`./test/index/view/10/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 7536 tests as sqlite

* 100% was OK

Time: 13449ms

---- ---- ---- ---- ---- ---- ----
### 78/124 [`./test/index/view/10/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 7237 tests as sqlite

* 100% was OK

Time: 13853ms

---- ---- ---- ---- ---- ---- ----
### 79/124 [`./test/index/view/10/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 6135 tests as sqlite

* 100% was OK

Time: 15682ms

---- ---- ---- ---- ---- ---- ----
### 80/124 [`./test/index/view/10/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/index/view/10/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 6936 tests as sqlite

* 100% was OK

Time: 14130ms

---- ---- ---- ---- ---- ---- ----
### 81/124 [`./test/random/aggregates/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...+ ( 90 ) IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1 failed
* 99% was OK

Time: 16973ms

---- ---- ---- ---- ---- ---- ----
### 82/124 [`./test/random/aggregates/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 16248ms

---- ---- ---- ---- ---- ---- ----
### 83/124 [`./test/random/aggregates/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 16543ms

---- ---- ---- ---- ---- ---- ----
### 84/124 [`./test/random/aggregates/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 17189ms

---- ---- ---- ---- ---- ---- ----
### 85/124 [`./test/random/aggregates/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 16965ms

---- ---- ---- ---- ---- ---- ----
### 86/124 [`./test/random/aggregates/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT * FROM tab2 AS cor0 LEFT JOIN tab1 AS cor1 ON NOT NULL IS NOT NULL, tab1 AS cor2

Parse error on line 1:
...NOT NULL IS NOT NULL, tab1 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 2 failed
* 99% was OK

Time: 17273ms

---- ---- ---- ---- ---- ---- ----
### 87/124 [`./test/random/aggregates/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 17365ms

---- ---- ---- ---- ---- ---- ----
### 88/124 [`./test/random/aggregates/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab1 AS cor0 LEFT JOIN tab1 cor1 ON NOT 86 IS NOT NULL, tab0 AS cor2

Parse error on line 1:
...N NOT 86 IS NOT NULL, tab0 AS cor2
-----------------------^
Expecting 'EOF', 'WITH', 'RPAR', 'PIVOT', 'UNPIVOT', 'IN', 'LIKE', 'ORDER', 'ARROW', 'CARET', 'EQ', 'WHERE', 'SLASH', 'EXCLAMATION', 'MODULO', 'GT', 'LT', 'NOT', 'UNION', 'INTERSECT', 'EXCEPT', 'AND', 'OR', 'PLUS', 'STAR', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'REGEXP', 'NOT_LIKE', 'MINUS', 'GE', 'LE', 'EQEQ', 'EQEQEQ', 'NE', 'NEEQEQ', 'NEEQEQEQ', 'BETWEEN', 'NOT_BETWEEN', 'IS', 'DOUBLECOLON', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 1 failed
* 99% was OK

Time: 17251ms

---- ---- ---- ---- ---- ---- ----
### 89/124 [`./test/random/aggregates/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 16887ms

---- ---- ---- ---- ---- ---- ----
### 90/124 [`./test/random/aggregates/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/aggregates/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 17007ms

---- ---- ---- ---- ---- ---- ----
### 91/124 [`./test/random/expr/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 18997ms

---- ---- ---- ---- ---- ---- ----
### 92/124 [`./test/random/expr/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 11168ms

---- ---- ---- ---- ---- ---- ----
### 93/124 [`./test/random/expr/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 16281ms

---- ---- ---- ---- ---- ---- ----
### 94/124 [`./test/random/expr/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 20123ms

---- ---- ---- ---- ---- ---- ----
### 95/124 [`./test/random/expr/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 20424ms

---- ---- ---- ---- ---- ---- ----
### 96/124 [`./test/random/expr/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 20519ms

---- ---- ---- ---- ---- ---- ----
### 97/124 [`./test/random/expr/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 20593ms

---- ---- ---- ---- ---- ---- ----
### 98/124 [`./test/random/expr/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 20019ms

---- ---- ---- ---- ---- ---- ----
### 99/124 [`./test/random/expr/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 20228ms

---- ---- ---- ---- ---- ---- ----
### 100/124 [`./test/random/expr/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/expr/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 19747ms

---- ---- ---- ---- ---- ---- ----
### 101/124 [`./test/random/groupby/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_0.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15429ms

---- ---- ---- ---- ---- ---- ----
### 102/124 [`./test/random/groupby/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_1.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15671ms

---- ---- ---- ---- ---- ---- ----
### 103/124 [`./test/random/groupby/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_2.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15357ms

---- ---- ---- ---- ---- ---- ----
### 104/124 [`./test/random/groupby/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_3.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15622ms

---- ---- ---- ---- ---- ---- ----
### 105/124 [`./test/random/groupby/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_4.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15868ms

---- ---- ---- ---- ---- ---- ----
### 106/124 [`./test/random/groupby/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_5.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15836ms

---- ---- ---- ---- ---- ---- ----
### 107/124 [`./test/random/groupby/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_6.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15997ms

---- ---- ---- ---- ---- ---- ----
### 108/124 [`./test/random/groupby/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_7.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15601ms

---- ---- ---- ---- ---- ---- ----
### 109/124 [`./test/random/groupby/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_8.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 14924ms

---- ---- ---- ---- ---- ---- ----
### 110/124 [`./test/random/groupby/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/groupby/slt_good_9.test)

_Mimic sqlite_
#### ★ Ran 10012 tests as sqlite

* 100% was OK

Time: 15068ms

---- ---- ---- ---- ---- ---- ----
### 111/124 [`./test/random/select/slt_good_0.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_0.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 107 failed
* 98% was OK

Time: 13043ms

---- ---- ---- ---- ---- ---- ----
### 112/124 [`./test/random/select/slt_good_1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_1.test)

_Mimic sqlite_

```sql
SELECT * FROM tab1 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 99 failed
* 99% was OK

Time: 13635ms

---- ---- ---- ---- ---- ---- ----
### 113/124 [`./test/random/select/slt_good_2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_2.test)

_Mimic sqlite_

```sql
SELECT ALL 86 FROM tab2 cor0 CROSS JOIN tab2, tab2 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab2 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 88 failed
* 99% was OK

Time: 13778ms

---- ---- ---- ---- ---- ---- ----
### 114/124 [`./test/random/select/slt_good_3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_3.test)

_Mimic sqlite_

```sql
SELECT DISTINCT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10011 tests as sqlite

* 70 failed
* 99% was OK

Time: 13897ms

---- ---- ---- ---- ---- ---- ----
### 115/124 [`./test/random/select/slt_good_4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_4.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab1 cor0 CROSS JOIN tab2, tab1 AS cor1, tab0 AS cor2, tab2 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab1 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10011 tests as sqlite

* 88 failed
* 99% was OK

Time: 13950ms

---- ---- ---- ---- ---- ---- ----
### 116/124 [`./test/random/select/slt_good_5.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_5.test)

_Mimic sqlite_

```sql
SELECT ALL * FROM tab0, tab0 AS cor0 CROSS JOIN tab2, tab0 AS cor1, tab0 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 AS cor1, tab0
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 85 failed
* 99% was OK

Time: 14068ms

---- ---- ---- ---- ---- ---- ----
### 117/124 [`./test/random/select/slt_good_6.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_6.test)

_Mimic sqlite_

```sql
SELECT ALL 43 FROM tab0 AS cor0 CROSS JOIN tab1, tab2 AS cor1, tab1 AS cor2, tab1 AS cor3

Parse error on line 1:
...cor0 CROSS JOIN tab1, tab2 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 86 failed
* 99% was OK

Time: 14034ms

---- ---- ---- ---- ---- ---- ----
### 118/124 [`./test/random/select/slt_good_7.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_7.test)

_Mimic sqlite_

```sql
SELECT * FROM tab2 AS cor0 CROSS JOIN tab0, tab1 AS cor1, tab1, tab1 AS cor2

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1, tab1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 95 failed
* 99% was OK

Time: 14181ms

---- ---- ---- ---- ---- ---- ----
### 119/124 [`./test/random/select/slt_good_8.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_8.test)

_Mimic sqlite_

```sql
SELECT - 46 col1 FROM tab1 cor0 CROSS JOIN tab2, tab0 cor1, tab2 cor2

Parse error on line 1:
...cor0 CROSS JOIN tab2, tab0 cor1, tab2 co
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10012 tests as sqlite

* 84 failed
* 99% was OK

Time: 14501ms

---- ---- ---- ---- ---- ---- ----
### 120/124 [`./test/random/select/slt_good_9.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/random/select/slt_good_9.test)

_Mimic sqlite_

```sql
SELECT * FROM tab1, tab1 AS cor0 CROSS JOIN tab0, tab1 AS cor1

Parse error on line 1:
...cor0 CROSS JOIN tab0, tab1 AS cor1
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'AS', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'UNION', 'INTERSECT', 'EXCEPT', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'OFFSET', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'COMMA'
```

#### ☓ Ran 10010 tests as sqlite

* 89 failed
* 99% was OK

Time: 14385ms

---- ---- ---- ---- ---- ---- ----
### 121/124 [`./test/select1.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select1.test)

_Mimic sqlite_
#### ★ Ran 1031 tests as sqlite

* 100% was OK

Time: 5445ms

---- ---- ---- ---- ---- ---- ----
### 122/124 [`./test/select2.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select2.test)

_Mimic sqlite_
#### ★ Ran 1031 tests as sqlite

* 100% was OK

Time: 4738ms

---- ---- ---- ---- ---- ---- ----
### 123/124 [`./test/select3.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select3.test)

_Mimic sqlite_
#### ★ Ran 3351 tests as sqlite

* 100% was OK

Time: 17596ms

---- ---- ---- ---- ---- ---- ----
### 124/124 [`./test/select4.test`](https://github.com/mathiasrw/alasql-logictest/blob/master/sqllogic/./test/select4.test)

_Mimic sqlite_
#### ★ Ran 3857 tests as sqlite

* 100% was OK

Time: 25439ms

-----------------------------

## Final result

* Skipped tests: 7
* Failed tests: 907
* Total tested: 1064228
* Final score: 99 % was OK

Total script time: 3289740ms

_Please note that repetetive errors are not always printed again_

