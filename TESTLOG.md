# SQLlogictest results for AlaSQL 0.1.10

_2015-08-12T13:16:52.151Z_

This is a subset of the total 622 tests.
Results from 125 test files:

---- ---- ---- ---- ---- ---- ----
### 1/125 `test/evidence/in1.test`

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
INSERT INTO t5 SELECT * FROM t4

Cannot insert record, because it already exists in primary key index
```

```sql
INSERT INTO t4n SELECT * FROM t4

Cannot insert record, because it already exists in unique index
```

```sql
SELECT 4 IN t4n

Cannot read property 't4n' of undefined
```

#### ☓ Ran 214 tests as sqlite

* 115 failed
* 46% was OK

_Mimic postgresql_

`Halted`

_Mimic mssql_

`Halted`

_Mimic oracle_

`Halted`

_Mimic mysql_
```sql
CREATE TABLE t7(a TEXT, UNIQUE (a(1)))

Parse error on line 1:
...t7(a TEXT, UNIQUE (a(1)))
-----------------------^
Expecting 'EOF', 'WITH', 'COMMA', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'EQ', 'WHERE', 'DOT', 'UNION', 'INTERSECT', 'EXCEPT', 'FROM', 'INTO', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'GROUP', 'LIMIT', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'LPAR'
```

```sql
INSERT INTO t7 VALUES('b')

Cannot read property 'columns' of undefined
```

#### ☓ Ran 128 tests as mysql

* 54 failed
* 57% was OK

_Mimic Unspecified DB_
#### ☓ Ran 132 tests as Unspecified DB

* 43 failed
* 67% was OK

Time: 1697ms

---- ---- ---- ---- ---- ---- ----
### 2/125 `test/evidence/in2.test`

_Mimic sqlite_
```sql
SELECT 1 FROM t1 WHERE 1 IN (SELECT 1)

context is not defined
```

#### ☓ Ran 53 tests as sqlite

* 1 failed
* 98% was OK

_Mimic postgresql_
#### ☓ Ran 45 tests as postgresql

* 1 failed
* 97% was OK

_Mimic mssql_
#### ☓ Ran 45 tests as mssql

* 1 failed
* 97% was OK

_Mimic oracle_
#### ☓ Ran 45 tests as oracle

* 1 failed
* 97% was OK

_Mimic mysql_
#### ☓ Ran 45 tests as mysql

* 1 failed
* 97% was OK

_Mimic Unspecified DB_
#### ☓ Ran 53 tests as Unspecified DB

* 1 failed
* 98% was OK

Time: 886ms

---- ---- ---- ---- ---- ---- ----
### 3/125 `test/evidence/slt_lang_aggfunc.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
SELECT total(DISTINCT x) FROM t1

Unexpected token ,
```

```sql
SELECT group_concat(DISTINCT x) FROM t1 NOT INDEXED

Parse error on line 1:
...DISTINCT x) FROM t1 NOT INDEXED
-----------------------^
Expecting 'LITERAL', 'BRALITERAL', 'EOF', 'WITH', 'COMMA', 'AS', 'LPAR', 'RPAR', 'PIVOT', 'UNPIVOT', 'ORDER', 'WHERE', 'DOT', 'UNION', 'INTERSECT', 'EXCEPT', 'FROM', 'CROSS', 'OUTER', 'NATURAL', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'SEMI', 'ANTI', 'ON', 'USING', 'GROUP', 'LIMIT', 'END', 'ELSE', 'SEMICOLON', 'GO', got 'NOT'
```

```sql
SELECT count(DISTINCT *) FROM t1 WHERE y='false'

No exception thrown
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
Expecting 'LITERAL', 'BRALITERAL', 'LPAR', 'NUMBER', 'STRING', 'SHARP', 'DOLLAR', 'AT', 'COLON', 'NOT', 'ALL', 'ANY', 'PLUS', 'STAR', 'QUESTION', 'CURRENT_TIMESTAMP', 'JAVASCRIPT', 'NEW', 'CAST', 'CONVERT', 'SUM', 'COUNT', 'MIN', 'MAX', 'AVG', 'FIRST', 'LAST', 'AGGR', 'ARRAY', 'TRUE', 'FALSE', 'NSTRING', 'NULL', 'EXISTS', 'BRAQUESTION', 'CASE', 'MINUS', 'SOME', 'ATLBRA', 'LCUR', got 'LT'
```

#### ☓ Ran 80 tests as sqlite

* 27 failed
* 66% was OK

_Mimic postgresql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as postgresql

* 1 failed
* 80% was OK

_Mimic mssql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as mssql

* 1 failed
* 80% was OK

_Mimic oracle_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as oracle

* 1 failed
* 80% was OK

_Mimic mysql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as mysql

* 1 failed
* 80% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as Unspecified DB

* 1 failed
* 80% was OK

Time: 412ms

---- ---- ---- ---- ---- ---- ----
### 4/125 `test/evidence/slt_lang_createtrigger.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
CREATE TRIGGER t1r1 UPDATE ON t1 BEGIN SELECT 1; END;

Parse error on line 1:
CREATE TRIGGER t1r1 UPDATE ON t1 BE
---------------^
Expecting 'DATABASE', got 'LITERAL'
```

#### ☓ Ran 26 tests as sqlite

* 21 failed
* 19% was OK

_Mimic postgresql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as postgresql

* 1 failed
* 80% was OK

_Mimic mssql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as mssql

* 1 failed
* 80% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 26 tests as oracle

* 21 failed
* 19% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 26 tests as mysql

* 21 failed
* 19% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 26 tests as Unspecified DB

* 21 failed
* 19% was OK

Time: 182ms

---- ---- ---- ---- ---- ---- ----
### 5/125 `test/evidence/slt_lang_createview.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
DELETE FROM view1 WHERE x>0

No exception thrown
```

#### ☓ Ran 23 tests as sqlite

* 7 failed
* 69% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 15 tests as postgresql

* 4 failed
* 73% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 15 tests as mssql

* 2 failed
* 86% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 15 tests as oracle

* 4 failed
* 73% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 15 tests as mysql

* 4 failed
* 73% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 15 tests as Unspecified DB

* 4 failed
* 73% was OK

Time: 240ms

---- ---- ---- ---- ---- ---- ----
### 6/125 `test/evidence/slt_lang_dropindex.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
DROP INDEX t1i1;

No exception thrown
```

#### ☓ Ran 8 tests as sqlite

* 3 failed
* 62% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 8 tests as postgresql

* 3 failed
* 62% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 8 tests as mssql

* 3 failed
* 62% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 8 tests as oracle

* 3 failed
* 62% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 8 tests as mysql

* 3 failed
* 62% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 8 tests as Unspecified DB

* 3 failed
* 62% was OK

Time: 113ms

---- ---- ---- ---- ---- ---- ----
### 7/125 `test/evidence/slt_lang_droptable.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
DROP INDEX t1i1;

No exception thrown
```

#### ☓ Ran 12 tests as sqlite

* 2 failed
* 83% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 12 tests as postgresql

* 2 failed
* 83% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10 tests as mssql

* 2 failed
* 80% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 12 tests as oracle

* 2 failed
* 83% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 12 tests as mysql

* 2 failed
* 83% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 12 tests as Unspecified DB

* 2 failed
* 83% was OK

Time: 159ms

---- ---- ---- ---- ---- ---- ----
### 8/125 `test/evidence/slt_lang_droptrigger.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
CREATE TRIGGER t1r1 UPDATE ON t1 BEGIN SELECT 1; END;

Parse error on line 1:
CREATE TRIGGER t1r1 UPDATE ON t1 BE
---------------^
Expecting 'DATABASE', got 'LITERAL'
```

#### ☓ Ran 12 tests as sqlite

* 4 failed
* 66% was OK

_Mimic postgresql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as postgresql

* 1 failed
* 80% was OK

_Mimic mssql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as mssql

* 1 failed
* 80% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 12 tests as oracle

* 4 failed
* 66% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 12 tests as mysql

* 4 failed
* 66% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 12 tests as Unspecified DB

* 4 failed
* 66% was OK

Time: 132ms

---- ---- ---- ---- ---- ---- ----
### 9/125 `test/evidence/slt_lang_dropview.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

#### ☓ Ran 13 tests as sqlite

* 1 failed
* 92% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 13 tests as postgresql

* 1 failed
* 92% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 13 tests as mssql

* 1 failed
* 92% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 13 tests as oracle

* 1 failed
* 92% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 13 tests as mysql

* 1 failed
* 92% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 13 tests as Unspecified DB

* 1 failed
* 92% was OK

Time: 198ms

---- ---- ---- ---- ---- ---- ----
### 10/125 `test/evidence/slt_lang_reindex.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
REINDEX t1i1

Parse error on line 1:
REINDEX t1i1
--------^
Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'SEMICOLON', 'GO', got 'LITERAL'
```

#### ☓ Ran 7 tests as sqlite

* 2 failed
* 71% was OK

_Mimic postgresql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as postgresql

* 1 failed
* 80% was OK

_Mimic mssql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as mssql

* 1 failed
* 80% was OK

_Mimic oracle_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as oracle

* 1 failed
* 80% was OK

_Mimic mysql_
`setThreshold not implemented`

`Halted`

#### ☓ Ran 5 tests as mysql

* 1 failed
* 80% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 7 tests as Unspecified DB

* 2 failed
* 71% was OK

Time: 101ms

---- ---- ---- ---- ---- ---- ----
### 11/125 `test/evidence/slt_lang_replace.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT OR REPLACE INTO t1 VALUES(2, 'insert or replace')

Parse error on line 1:
INSERT OR REPLACE INTO t1 V
-------^
Expecting 'LITERAL', 'BRALITERAL', 'INTO', got 'OR'
```

```sql
REPLACE INTO t1 VALUES(2, 'replace')

Parse error on line 1:
REPLACE INTO t1 VALUES(2, 'r
--------^
Expecting 'EOF', 'COMMA', 'LPAR', 'RPAR', 'END', 'ELSE', 'COLONDASH', 'SEMICOLON', 'GO', got 'INTO'
```

#### ☓ Ran 14 tests as sqlite

* 4 failed
* 71% was OK

_Mimic postgresql_

`Halted`

_Mimic mssql_

`Halted`

_Mimic oracle_

`Halted`

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10 tests as mysql

* 2 failed
* 80% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 14 tests as Unspecified DB

* 4 failed
* 71% was OK

Time: 131ms

---- ---- ---- ---- ---- ---- ----
### 12/125 `test/evidence/slt_lang_update.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
CREATE INDEX t1i1 ON t1(x)

string is not a function
```

```sql
UPDATE t1 SET z='foo'

No exception thrown
```

#### ☓ Ran 27 tests as sqlite

* 3 failed
* 88% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 27 tests as postgresql

* 3 failed
* 88% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 27 tests as mssql

* 3 failed
* 88% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 27 tests as oracle

* 3 failed
* 88% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 27 tests as mysql

* 3 failed
* 88% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 27 tests as Unspecified DB

* 3 failed
* 88% was OK

Time: 436ms

---- ---- ---- ---- ---- ---- ----
### 13/125 `test/index/between/1/slt_good_0.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE (col4 IN (5.85,5.95,6.30,0.0,1.27) AND (col4 IN (9.41,4.56,2.55,0.83,3.95,6.92) AND (col1 = 6.24)) OR col0 IN (SELECT col3 FROM tab0 WHERE (((((col0 IN (8,1) AND col0 IS NULL AND col1 < 9.21) AND col4 > 8.64 AND (col3 >= 9) OR col0 < 5)))))) AND (col1 < 7.95 OR col0 < 0) AND col3 >= 9 AND col0 < 2 OR col4 BETWEEN 1.13 AND 0.71 AND (col3 > 9) AND (col0 < 3)

context is not defined
```

#### ☓ Ran 10022 tests as sqlite

* 88 failed
* 99% was OK

_Mimic postgresql_
`setThreshold not implemented`
```sql
SELECT pk FROM tab0 WHERE ((((col0 < 5)) OR col3 > 9 AND col3 <= 0 AND (((col3 >= 6) OR (((col1 >= 6.24 AND col1 <= 5.91))) AND col3 = 9 AND (col0 >= 0) OR (col3 IS NULL))) OR ((col3 >= 6) AND (col3 IN (SELECT col0 FROM tab0 WHERE col1 > 2.88)) AND col1 = 0.51)) AND col3 IN (7,5,2,3,7))

context is not defined
```

#### ☓ Ran 10022 tests as postgresql

* 88 failed
* 99% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10022 tests as mssql

* 88 failed
* 99% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 10022 tests as oracle

* 88 failed
* 99% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10022 tests as mysql

* 88 failed
* 99% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 10022 tests as Unspecified DB

* 88 failed
* 99% was OK

Time: 3681080ms

---- ---- ---- ---- ---- ---- ----
### 14/125 `test/index/between/10/slt_good_0.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE col4 IN (SELECT col1 FROM tab0 WHERE (col1 > 13.14) AND (col3 < 54 AND col0 = 24) OR (col1 < 65.83 OR ((col1 BETWEEN 55.69 AND 90.94)) AND (col3 = 81) AND (col3 > 78)))

context is not defined
```

#### ☓ Ran 10033 tests as sqlite

* 106 failed
* 98% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 10027 tests as postgresql

* 106 failed
* 98% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10033 tests as mssql

* 106 failed
* 98% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 10033 tests as oracle

* 106 failed
* 98% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10033 tests as mysql

* 106 failed
* 98% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 10033 tests as Unspecified DB

* 106 failed
* 98% was OK

Time: 4455270ms

---- ---- ---- ---- ---- ---- ----
### 15/125 `test/index/between/10/slt_good_1.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE col0 = 46 OR col0 <= 11 AND (col3 < 66) AND col4 < 3.81 OR (col3 < 45) OR col3 = 24 OR col3 < 65 OR (((col1 IN (SELECT col4 FROM tab0 WHERE col3 = 93) OR col0 > 29) AND ((col3 > 65)) OR (col0 > 0) OR (col1 >= 6.23) AND (col0 < 32 AND col3 >= 67) AND (((col0 > 40)) OR col1 > 46.72) OR col1 < 73.29 AND (col0 IS NULL) AND col3 > 71 AND (col4 IS NULL))) AND col0 = 58 AND ((col1 = 62.35)) OR (col1 < 23.37 AND col4 < 16.53 OR col1 IS NULL AND col3 < 34) OR ((col0 IS NULL) AND (col0 >= 54) OR (col3 <= 68 OR ((col4 > 81.10))) OR (((((col3 < 89))) OR col3 <= 24 OR col3 >= 35 AND (((col3 >= 64 OR col3 IS NULL)) AND (col1 >= 77.50)) AND ((col1 IS NULL OR col3 > 52) AND col1 <= 15.10)) OR (((col3 < 22)) OR ((col1 IN (51.53,28.36,45.1,14.14,61.41))) AND (col0 IN (79,52)) AND (col1 >= 17.36) OR (col3 <= 85 AND col3 >= 99 AND (col4 BETWEEN 98.55 AND 60.32 AND (col3 < 9)) AND col0 <= 84 AND col3 <= 44 AND (col4 BETWEEN 98.70 AND 58.66) OR ((col3 > 98) AND col0 < 7) OR col4 IS NULL OR col4 IS NULL AND (col3 > 81) OR col0 < 56))) OR (((((col0 > 38))) OR (col3 < 74) OR ((col1 >= 42.63 AND (col0 > 96 OR col4 < 49.67 OR col3 = 77 OR (col1 IS NULL) AND ((((((col3 > 91)) OR col3 < 66 OR (col3 <= 1) OR col3 >= 17)))) OR (col1 = 83.87) OR (((col1 >= 43.32) AND col1 BETWEEN 18.63 AND 97.66 AND col0 > 78) OR col4 > 30.68 AND col0 >= 10)) OR (col4 < 84.61)))))) OR (((col0 > 37)))

context is not defined
```

#### ☓ Ran 10029 tests as sqlite

* 124 failed
* 98% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 10019 tests as postgresql

* 124 failed
* 98% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10029 tests as mssql

* 124 failed
* 98% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 10029 tests as oracle

* 124 failed
* 98% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10029 tests as mysql

* 124 failed
* 98% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 10029 tests as Unspecified DB

* 124 failed
* 98% was OK

Time: 4166102ms

---- ---- ---- ---- ---- ---- ----
### 16/125 `test/index/between/10/slt_good_2.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE col0 = 58 AND (col3 BETWEEN 3 AND 52 AND col0 IN (SELECT col3 FROM tab0 WHERE ((col0 < 22 OR col3 >= 66 OR col3 > 41)))) AND (((col0 IN (91,11,67,84,35,45) AND col3 < 27)) AND ((col3 IN (75,51,70)) OR col0 > 19)) AND (((col0 > 68))) AND col0 IS NULL AND (col1 < 77.50 OR (col1 < 78.65) AND col4 < 54.80) OR col4 > 40.35

context is not defined
```

#### ☓ Ran 10032 tests as sqlite

* 132 failed
* 98% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as postgresql

* 132 failed
* 98% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as mssql

* 132 failed
* 98% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as oracle

* 132 failed
* 98% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as mysql

* 132 failed
* 98% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as Unspecified DB

* 132 failed
* 98% was OK

Time: 4567204ms

---- ---- ---- ---- ---- ---- ----
### 17/125 `test/index/between/10/slt_good_3.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE (col0 <= 57 OR col1 IN (SELECT col4 FROM tab0 WHERE col3 = 43 AND col1 BETWEEN 62.29 AND 69.68 AND ((col0 >= 69 AND col0 IS NULL)) AND (col1 > 67.93 AND col3 > 99 OR col3 > 30 AND (col3 < 80) AND (col0 >= 88))) AND col3 < 78) OR col3 < 43

context is not defined
```

#### ☓ Ran 10032 tests as sqlite

* 138 failed
* 98% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as postgresql

* 138 failed
* 98% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as mssql

* 138 failed
* 98% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as oracle

* 138 failed
* 98% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as mysql

* 138 failed
* 98% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as Unspecified DB

* 138 failed
* 98% was OK

Time: 4848710ms

---- ---- ---- ---- ---- ---- ----
### 18/125 `test/index/between/10/slt_good_4.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE col3 IN (SELECT col0 FROM tab0 WHERE (((col0 BETWEEN 33 AND 1))))

context is not defined
```

#### ☓ Ran 10032 tests as sqlite

* 114 failed
* 98% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 10020 tests as postgresql

* 114 failed
* 98% was OK

_Mimic mssql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as mssql

* 114 failed
* 98% was OK

_Mimic oracle_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as oracle

* 114 failed
* 98% was OK

_Mimic mysql_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as mysql

* 114 failed
* 98% was OK

_Mimic Unspecified DB_
`setThreshold not implemented`
#### ☓ Ran 10032 tests as Unspecified DB

* 114 failed
* 98% was OK

Time: 5054554ms

---- ---- ---- ---- ---- ---- ----
### 19/125 `test/index/between/10/slt_good_5.test`

_Mimic sqlite_
`setThreshold not implemented`
```sql
INSERT INTO tab1 SELECT * FROM tab0

Wrong NULL value in NOT NULL column pk
```

```sql
SELECT pk FROM tab0 WHERE ((col4 < 53.2 OR (col3 IN (SELECT col0 FROM tab0 WHERE col3 >= 21)) OR col3 >= 24)) OR (col0 > 91) AND (col1 BETWEEN 12.41 AND 14.37) AND (col3 > 76) AND col1 <= 32.8 OR col1 < 61.7

context is not defined
```

#### ☓ Ran 10031 tests as sqlite

* 132 failed
* 98% was OK

_Mimic postgresql_
`setThreshold not implemented`
#### ☓ Ran 10023 tests as postgresql

* 132 failed
* 98% was OK

_Mimic mssql_
`setThreshold not implemented`
