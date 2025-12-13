# Pending Tests Analysis

**Total Pending Tests Reported by Mocha:** 401

**Unique Test Definitions Analyzed:** 387

> **Note:** The difference between these numbers (14 tests) is due to `describe.skip()` blocks that contain multiple `it()` tests. When a describe block is skipped, all tests within it are counted as pending by Mocha, but our analysis counts the describe block once.

## Executive Summary

This document analyzes the 401 pending tests in the AlaSQL test suite and groups them by theme. Each category is prioritized based on its impact on bringing AlaSQL closer to full SQL-99 compliance.

## Priority Levels

- **CRITICAL (Priority 1)**: Core SQL-99 compliance and standard SQL syntax
- **HIGH (Priority 2)**: Essential SQL-99 features (joins, constraints, set operations)
- **MEDIUM (Priority 3-4)**: Standard but less critical features
- **LOW (Priority 5-7)**: Non-standard extensions, performance tests, edge cases

---

## SQL Standards Compliance

- **Count:** 6 tests
- **Priority:** 1
- **Impact:** CRITICAL
- **SQL-99 Features:** SQL logic tests, Standard SQL syntax

### Test Files (3 files)

#### test259.js
*Test 259 SqlLogic Parser Test #2*

- 1. Sqllogic (line 18)
- 99. Drop Database (line 45)

#### test260.js
*Test 260 SqlLogic Parser Test #3*

- 1. Sqllogic (line 9)
- 3. SELECT ALL (line 14)
- 99. Drop Database (line 53)

#### test341.js
*Test 341 Intellectual DOT operator*

- 3. SQL Standard way (line 32)

---

## Constraints & Foreign Keys

- **Count:** 39 tests
- **Priority:** 2
- **Impact:** HIGH
- **SQL-99 Features:** PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE, NOT NULL

### Test Files (5 files)

#### test324.js
*Test 324 Roads samples*

- 3. CREATE TABLE with constraints (line 41)
- 4. INSERT INTO table with constraints (line 59)
- 5. INSERT INTO table with same primary key (line 75)
- 6. INSERT INTO wrong NULL in NOT NULL column (line 88)
- 7. UPDATE wrong NULL in NOT NULL column (line 100)
- 8. UPDATE wrong NULL in NOT NULL column (line 107)
- 9. UPDATE wrong NULL in NOT NULL column (line 113)
- 10. INSERT INTO table with constraints violation (line 120)
- 11. INSERT INTO table with constraints violation (line 132)
- 12. UPDATE wrong NULL in NOT NULL column (line 143)
- 13. UPDATE table with constraints violation (line 149)

#### test325.js
*Test 325 IDENTITY*

- 2. CREATE TABLE with multiple constraints (line 14)
- 4. INSERT INTO with NOT NULL violation (line 49)
- 5. INSERT INTO with CHECK violation (line 60)
- 6. INSERT INTO with UNIQUE violation (line 71)
- 11. CHECK CONSTRAINT on column (line 117)

#### test326.js
*Test 326 FOREIGN KEYS*

- 1. CREATE DATABASE (line 9)
- 2. CREATE TABLES City (line 14)
- 3. INSERT VALUES INTO City (line 29)
- 4. CREATE TABLE Roads (line 51)
- 5. INSERT VALUES INTO Roads (line 68)
- 6. INSERT wrong FOREIGN KEY (line 99)
- 7. INSERT right FOREIGN KEY (line 110)
- 8. SELECT (line 123)
- 9. FOREIGN KEY DOT operator (line 130)
- 99. DROP DATABASE (line 143)

#### test327.js
*Test 327 FOREIGN KEYS*

- 1. CREATE DATABASE (line 9)
- 2. CREATE TABLES Parts (line 14)
- 3. INSERT VALUES INTO Parts (line 27)
- 4. CREATE TABLE BOM (line 53)
- 5. INSERT VALUES INTO BOM (line 88)
- 6. SELECT values from BOM (line 124)
- 7. INSERT duplicated key (line 136)
- 8. INSERT with wrong FOREIGN KEY (line 146)
- 8. INSERT with right FOREIGN KEY (line 156)
- 8. SELECT (line 167)
- 9. FOREIGN KEY DOT operator (line 173)
- 99. DROP DATABASE (line 182)

#### test341.js
*Test 341 Intellectual DOT operator*

- 5. FOREIGN KEY way (line 50)

---

## Set Operations (UNION/INTERSECT/EXCEPT)

- **Count:** 21 tests
- **Priority:** 2
- **Impact:** HIGH
- **SQL-99 Features:** UNION, INTERSECT, EXCEPT

### Test Files (4 files)

#### test316.js
*Test 316 UNION ALL*

- 2. Simple UNION ALL (line 18)

#### test322.js
*Test 322 UNION TEST*

- 1. CREATE DATABASE (line 9)
- 2. UNION ALL (line 14)
- 99. DROP DATABASE (line 53)

#### test338.js
*Test 338 EXTRACT*

- 2. EXCEPT (line 39)
- 3. EXCEPT (line 56)

#### test339.js
*Test 339 UNION EXTRACT INTERSECT*

- 1. CREATE DATABASE (line 9)
- 2. CREATE TABLE (line 15)
- 3. UNION (line 35)
- 4. UNION ALL (line 48)
- 5. EXCEPT (line 61)
- 6. INTERSECT (line 73)
- 7. INTERSECT (line 86)
- 8. UNION UNION (line 99)
- 9. UNION EXCEPT (line 114)
- 10. UNION EXCEPT (line 129)
- 11. UNION INTERSECT (line 144)
- 12. INTERSECT UNION (line 159)
- 13. UNION INTERSECT (line 174)
- 14. INTERSECT UNION (line 189)
- 99. DROP DATABASE (line 204)

---

## Joins

- **Count:** 13 tests
- **Priority:** 2
- **Impact:** HIGH
- **SQL-99 Features:** FULL OUTER JOIN, CROSS JOIN

### Test Files (4 files)

#### test259.js
*Test 259 SqlLogic Parser Test #2*

- 2. FROM JOIN / CROSS JOIN syntax  (line 22)

#### test270.js
*Test 270 RECORDSET tests*

- 16. JOIN params (line 187)
- 17. JOIN tables (line 194)
- 18. JOIN params (line 203)

#### test290.js
*Test 290 FROM Json*

- 3. JOINed source (line 21)

#### test407.js
*Test 407 - TWO JOINS*

- 1.3. INNER AND RIGHT (line 54)
- 1.4. INNER AND OUTER (line 67)
- 2.3. LEFT AND RIGHT (line 101)
- 2.4. LEFT AND OUTER (line 115)
- 3.3. RIGHT AND RIGHT (line 156)
- 3.4. RIGHT AND OUTER (line 169)
- 4.3. OUTER AND RIGHT (line 211)
- 4.4. OUTER AND OUTER (line 224)

---

## Triggers

- **Count:** 1 tests
- **Priority:** 3
- **Impact:** MEDIUM
- **SQL-99 Features:** BEFORE/AFTER/INSTEAD OF triggers

### Test Files (1 files)

#### test1119.js
- Test 1119 - Trigger callback parameter (line 6)

---

## Advanced SQL Features

- **Count:** 55 tests
- **Priority:** 3
- **Impact:** MEDIUM
- **SQL-99 Features:** WITH (CTEs), PIVOT/UNPIVOT, Window functions

### Test Files (8 files)

#### test270.js
*Test 270 RECORDSET tests*

- 4. Empty test on table with columns (line 46)
- 5. Test on empty table without column definitions (line 53)
- 6. Test on empty table without column definitions (line 60)
- 7. Test on empty table without column definitions (line 68)
- 8. Test on empty table without column definitions (line 75)
- 9. Test on empty table without column definitions (line 82)
- 9a. Test on table without column definitions (line 89)
- 9b. Test on table without column definitions (line 96)
- 9c. Test on table without column definitions (line 103)
- 9c1. Test on table without column definitions (line 110)
- 9d. Test on table without column definitions (line 117)
- 10. Array on param with * (line 124)
- 11. Array with column (line 131)
- 11a. Array with column (line 138)
- 11b. Array with column (line 145)
- 12. Array with column (line 152)
- 12a. Array with column (line 159)
- 13. Array with column from table (line 166)
- 14. Array with column in reversed order (line 173)
- 15. Array with column in reversed order (line 180)

#### test297.js
*Test 297 INSERT,DELETE,UDPATE with subqueries*

- 1. CREATE DATABASE (line 10)
- 2. DELETE (line 17)
- 3. UPDATE (line 23)
- 4. INSERT (line 34)
- 99. DROP DATABASE (line 47)

#### test325.js
*Test 325 IDENTITY*

- 7. INSERT INTO with IDENTITY (line 82)
- 8. INSERT INTO with IDENTITY (line 92)
- 9. INSERT INTO with IDENTITY (line 101)
- 10. INSERT INTO with IDENTITY (line 110)
- 13. SELECT with REMOVE COLUMNS (line 136)

#### test334.js
*Test 334 WITH CTE*

- 1. CREATE DATABASE (line 13)
- 2. Create table (line 19)
- 3. WITH SELECT (line 30)
- 99. DROP DATABASE (line 68)

#### test335.js
*Test 335 WITH RECURSIVE CTE*

- 1. CREATE DATABASE (line 13)
- 2. Create table (line 19)
- 3. WITH SELECT (line 50)
- 99. DROP DATABASE (line 77)

#### test355.js
*Test 355 PIVOT*

- 1. CREATE DATABASE (line 12)
- 2. Prepare Data (line 18)
- 3. Select Query (line 43)
- 4. Pivot Table ordered by PRODUCT (line 54)
- 5. Pivot Table ordered by CUST (line 69)
- 6. UnPivot Query (line 84)
- 99. DROP DATABASE (line 105)

#### test356.js
*Test 356 PIVOT*

- 1. CREATE DATABASE (line 9)
- 2. Prepare Data (line 15)
- 3. Select Query (line 45)
- 3. Select Query (line 67)
- 4. Select Query (line 78)
- 5. Select Query (line 89)
- 6. Select Query (line 100)
- 7. Select Query (line 111)
- 99. DROP DATABASE (line 122)

#### test404.js
*Test 404 OUTER JOIN*

- 5. Test FULL OUTER JOIN with 3 tables without workaround (line 97)

---

## Output Formats

- **Count:** 22 tests
- **Priority:** 3
- **Impact:** MEDIUM
- **SQL-99 Features:** INTO clause with various formats

### Test Files (4 files)

#### test269.js
*Test 269 options*

- 3. VALUE (line 46)
- 4. ROW (line 54)
- 5. COLUMN (line 62)
- 6. MATRIX (line 70)
- 6a. MATRIX (line 85)
- 7. RECORDSET (line 105)
- 8. INDEX (line 122)
- 9. TEXTSTRING (line 130)

#### test270.js
*Test 270 RECORDSET tests*

- 1. Create database (line 23)
- 2. Empty test on param throws error (line 33)
- 3. Empty test on param throws error (line 40)
- 3. VALUE (line 211)
- 4. ROW (line 219)
- 5. COLUMN (line 227)
- 6. MATRIX (line 236)
- 6a. MATRIX (line 246)
- 7. RECORDSET (line 258)
- 8. INDEX (line 273)
- 9. TEXTSTRING (line 281)
- 99. Drop phase (line 289)

#### test336.js
*Test 336 SLT test #4*

- 3. CREATE INDEX (line 51)

#### test343.js
*Test 343 Use params for $variables*

- 6. SELECT INTO $var (line 40)

---

## Data Types & Functions

- **Count:** 7 tests
- **Priority:** 4
- **Impact:** MEDIUM
- **SQL-99 Features:** ROUND, ASCII, Aggregate functions

### Test Files (3 files)

#### test2169.js
- Test 2169: Comprehensive verification of compileToJS functionality (line 41)

#### test360.js
*Test 360 AGGR function*

- 1. CREATE DATABASE (line 9)
- 2. Prepare Data (line 567)
- 2. Prepare Data (line 594)
- 99. DROP DATABASE (line 616)

#### test611.js
*Test 611 - SQL added user defined aggregation*

- A) Sync AGGREGATOR (line 58)
- C) Sync AGGREGATE (line 82)

---

## Storage & Persistence

- **Count:** 44 tests
- **Priority:** 5
- **Impact:** LOW
- **SQL-99 Features:** localStorage, IndexedDB (browser-specific)

### Test Files (40 files)

#### test066.js
*Test 66 - localStorage database*

- localStorage (line 7)

#### test067.js
*Test 67 - IndexedDB integration*

- localStorage (line 7)

#### test068.js
*Test 68 - Pass-through database*

- localStorage (line 7)

#### test069.js
*Test 69 - CSV and TAB database*

- localStorage (line 7)

#### test070.js
*Test 70 - Streams processing*

- localStorage (line 7)

#### test071.js
*Test 71 - WebWorker*

- localStorage (line 7)

#### test072.js
*Test 72 - Explain*

- localStorage (line 7)

#### test073.js
*Test 73 - Ajax*

- localStorage (line 7)

#### test074.js
*Test 74 - Natural Join*

- localStorage (line 7)

#### test075.js
*Test 75 - NULL, IS NULL*

- localStorage (line 7)

#### test076.js
*Test 76 - Phone Gap*

- localStorage (line 7)

#### test077.js
*Test 77 - Apache Cordova*

- localStorage (line 7)

#### test078.js
*Test 78 - WinJS*

- localStorage (line 7)

#### test079.js
*Test 79 - Prettify*

- localStorage (line 7)

#### test080.js
*Test 79 - Prettify*

- localStorage (line 7)

#### test081.js
*Test 81 - Hierarchies*

- localStorage (line 7)

#### test082.js
*Test 82 - MDX Parser*

- localStorage (line 7)

#### test083.js
*Test 83 - MDX SELECT*

- localStorage (line 7)

#### test084.js
*Test 84 - Sandbox*

- localStorage (line 7)

#### test085.js
*Test 85 - Mongo-like queries*

- localStorage (line 7)

#### test086.js
*Test 86 - DESCRIBE TABLE*

- localStorage (line 7)

#### test087.js
*Test 87 - EXPLAIN*

- localStorage (line 7)

#### test088.js
*Test 88 - AngularJS ng-alasql*

- localStorage (line 7)

#### test089.js
*Test 89 - d3 sample*

- localStorage (line 7)

#### test090.js
*Test 91 - Binary Operators: *, /, %, +, -, <<, >>, &, ^, |, ||*

- localStorage (line 7)

#### test091.js
*Test 91 - Binary Operators: *, /, %, +, -, <<, >>, &, ^, |, ||*

- localStorage (line 7)

#### test093.js
*Test 93 - COUNT (NON NULL) & COUNT DISTINCT*

- localStorage (line 7)

#### test094.js
*Test 94 - Persistence in Browser and Node*

- localStorage (line 7)

#### test095.js
*Test 95 - Transactions*

- localStorage (line 7)

#### test096.js
*Test 96 - CHECK*

- localStorage (line 7)

#### test097.js
*Test 97 - TRIGGERS (SQL & JavaScript Way)*

- localStorage (line 7)

#### test098.js
*Test 98 - UNIQUE*

- localStorage (line 7)

#### test099.js
*Test 100 - DataTypes*

- localStorage (line 7)

#### test100.js
*Test 100 - DataTypes*

- localStorage (line 7)

#### test101.js
*Test 101 - Oracle, MySQL, MSSQL, SQLite, Postgress mode*

- localStorage (line 7)

#### test102.js
*Test 102 - Execution Plan*

- localStorage (line 7)

#### test103.js
*Test 103 - FORMAT*

- localStorage (line 7)

#### test282.js
*Test 282 ADD COLUMN in LOCALSTORAGE*

- 1. CREATE DATABASE (line 9)
- 2. UNIQUE constraint (line 14)
- 99. DROP DATABASE (line 33)

#### test430.js
- 1. Tests unique keys in localstorage (line 28)

#### test604.js
- Test 604 - CREATE VIEW error with localStorage engine #604 (line 16)
- * Detach database (line 101)
- * Reattach database (line 106)

---

## Graph & Search

- **Count:** 88 tests
- **Priority:** 5
- **Impact:** LOW
- **SQL-99 Features:** Non-standard graph extensions

### Test Files (12 files)

#### test292.js
*Test 292 Nested searches*

- 1. CREATE DATABASE (line 9)
- 2. Search inside select (line 16)
- 3. SELECT inside SEARCH (line 22)
- 4. DROP DATABASE (line 28)

#### test301.js
*Test 301 Vertices and Edges*

- 1. CREATE DATABASE (line 9)
- 2. Create vertices (line 14)
- 3. Create vertices (line 29)
- 4. Create vertices (line 37)
- 5. Create vertices (line 43)
- 6. Create vertices (line 49)
- 4. +() and *() and NOT() (line 72)
- 3. Create edges (line 101)
- 3. Create edges (line 128)
- 4. Create edges (line 140)
- 9. DROP DATABASE (line 147)
- 10. CREATE DATABASE (line 152)
- 11. CREATE GRAPH (line 157)
- 19. DROP DATABASE (line 182)

#### test302.js
*Test 302 CREATE CLASS *

- 1. CREATE CLASS (line 9)
- 2. CREATE CLASS (line 14)
- 3. CREATE CLASS Country and City, INSERT data (line 23)
- 4. INSERT INTO CLASS (line 37)
- 5. SET variable = (INSERT) (line 45)
- 6. SELECT ! (line 52)
- 7. SEARCH # (line 61)
- 8. SEARCH # (line 67)
- 9. SEARCH AS (line 77)
- 10. SEARCH TO (line 85)
- 11. SEARCH EX JSON (line 96)
- 99. DROP DATABASE (line 107)

#### test304.js
*Test 304 SEARCH over JSON*

- 0. Create database  (line 9)
- 1. INSTANCEOF selector (line 14)
- 2. CLASS() selector (line 34)
- 3. PLUS selector (line 44)
- 4. STAR and QUESTION selector (line 67)
- 5. STAR and QUESTION selectors in GRAPHS (line 81)
- 6. STAR and QUESTION selectors in GRAPHS (line 105)
- 99. Create database  (line 117)

#### test308.js
*Test 308 sub SEARCH*

- 1. Create database  (line 9)
- 2. SET selector (line 14)
- 3. SUM and other aggregators (line 24)
- 4. SUM with nested selector (line 51)
- 5. Complex SUM with tree selector (line 58)
- 6. SUM over graph (line 65)
- 7. SUM over graph (line 77)
- 8. SUM over graph (line 83)
- 9. SUM over graph (line 89)
- 10. SUM over graph (line 95)
- 11. SUM over graph (line 108)
- 99. Drop database  (line 123)

#### test311.js
*Test 311 Special SEARCHors*

- 0. Create database  (line 9)
- 1. SEARCH DISTINCT, UNION ALL, and other selectors (line 14)
- 99. Drop database  (line 61)

#### test316.js
*Test 316 UNION ALL*

- 1. SEARCH DISTINCT (line 9)

#### test317.js
*Test 317 GRAPH*

- 1. CREATE DATABASE (line 9)
- 2. Simple graph (line 14)
- 3. Simple graph (line 27)
- 4. Simple graph (line 33)
- 5. Simple graph (line 39)
- 6. Simple graph (line 45)
- 7. Simple graph (line 51)
- 99. DROP DATABASE (line 63)

#### test322.js
*Test 322 UNION TEST*

- 3. SEARCH UNION (line 45)

#### test337.js
*Test 337 SEARCH 8 queens*

- 1. CREATE DATABASE (line 14)
- 2. SEARCH RANGE (line 19)
- 3. SEARCH ^  (line 31)
- 4. SEARCH /  (line 43)
- 5. SEARCH WHERE  (line 55)
- 6. SEARCH AS and RETURN  (line 65)
- 7. SEARCH ROW (line 80)
- 8. SEARCH TO (line 95)
- 9. SEARCH SET variable (line 116)
- 10. SEARCH REPEAT (line 128)
- 11. SEARCH REPEAT (line 138)
- 12. SEARCH REPEAT (line 150)
- 13. SEARCH REPEAT (line 158)
- 14. SEARCH REPEAT (line 168)
- 15. SEARCH REPEAT with index (line 180)
- 16. SEARCH REPEAT with index (line 192)
- 19. SEARCH 8 queens (line 205)
- 17. SEARCH REPEAT with index (line 241)
- 90. SEARCH 8 queens (line 260)
- 99. DROP DATABASE (line 280)

#### test343.js
*Test 343 Use params for $variables*

- 6. SEARCH AS $var (line 48)

#### test346.js
*Test 337 SEARCH 8 queens*

- 1. CREATE DATABASE (line 14)
- 2. SEARCH 8 queens (line 19)
- 2. SEARCH 8 queens (line 75)
- 99. DROP DATABASE (line 99)

---

## Performance & Optimization

- **Count:** 12 tests
- **Priority:** 6
- **Impact:** LOW
- **SQL-99 Features:** Performance tests

### Test Files (3 files)

#### test324.js
*Test 324 Roads samples*

- 1. CREATE DATABASE (line 9)
- 2. OBJECT_ID() (line 14)
- 3. DROP DATABASE (line 31)
- 2. CREATE DATABASE (line 36)
- 14. CURRENT_TIMESTAMP (line 158)
- 19. DROP DATABASE (line 164)
- 20. Full example (line 169)

#### test338.js
*Test 338 EXTRACT*

- 2. SAMPLE (line 19)

#### test345.js
*Test 345 Speed test*

- 1. CREATE DATABASE (line 11)
- 2. TEST (line 16)
- 3. TEST (line 27)
- 99. DROP DATABASE (line 75)

---

## Edge Cases

- **Count:** 2 tests
- **Priority:** 6
- **Impact:** LOW
- **SQL-99 Features:** Edge case handling

### Test Files (1 files)

#### test343.js
*Test 343 Use params for $variables*

- 3. Simple get from empty param {} (line 20)
- 4. Simple get from empty param {} (line 26)

---

## Other

- **Count:** 77 tests
- **Priority:** 7
- **Impact:** LOW
- **SQL-99 Features:** Miscellaneous features

### Test Files (32 files)

#### test064.js
*Test 64 - Console*

- Console (line 7)

#### test065.js
*Test 65 - Cursors*

- CURSOR (line 7)

#### test117.js
*Test 117 - Table name resolution*

- 2. One table (line 26)
- 3. One table (line 32)
- 4. One table (line 38)

#### test1889.js
- Test 1889 - Ensure utils.isNode handles node and non-Node environments (line 6)

#### test204.js
*Test 204 PRINT*

- 1. PRINT() (line 9)

#### test210.js
*Test 210 WHILE BREAK CONTINUE*

- 1. WHILE BREAK (line 12)

#### test269.js
*Test 269 options*

- 1. Create database (line 28)
- 2. by default (line 33)
- 99. Drop phase (line 138)

#### test290.js
*Test 290 FROM Json*

- 1. CREATE DATABASE (line 9)
- 2. SELECT (line 14)
- 3. DROP DATABASE (line 33)

#### test295.js
*Test 295 TestDatabase*

- 1. CREATE DATABASE (line 10)
- 2. CREATE TABLES (line 19)
- 3. CREATE TABLES (line 220)
- 4. DROP DATABASE (line 339)

#### test296.js
*Test 296 TestDatabase*

- 1. CREATE DATABASE (line 10)
- 2. CREATE TABLES (line 19)
- 4. DROP DATABASE (line 371)
- 4. DROP DATABASE (line 376)
- 4. DROP DATABASE (line 381)
- 4. DROP DATABASE (line 398)

#### test299.js
*Test 299 Parser Test*

- 1. CREATE DATABASE (line 9)
- 2.Tests (line 14)
- 99. DROP DATABASE (line 21)

#### test325.js
*Test 325 IDENTITY*

- 1. CREATE DATABASE (line 9)
- 3. INSERT INTO (line 39)
- 12. DEFAULT() (line 127)
- 99. DROP DATABASE (line 145)

#### test329.js
*Test 329 PROLOG*

- 1. CREATE DATABASE (line 9)
- 2. FACTS (line 14)
- 3. RULES (line 21)
- 4. QUERY (line 27)
- 5. Expression statement (line 34)
- 99. DROP DATABASE (line 40)

#### test336.js
*Test 336 SLT test #4*

- 1. CREATE DATABASE (line 13)
- 2. Create table (line 19)
- 3. INSERT some data (line 36)
- 99. DROP DATABASE (line 67)

#### test338.js
*Test 338 EXTRACT*

- 1. CREATE DATABASE (line 14)
- 3. DROP TABLES (line 75)
- 99. DROP DATABASE (line 90)

#### test340.js
*Test 340 SET PARAMS*

- 1. CREATE DATABASE (line 9)
- 2. SET PARAMS (line 14)
- 3. Change params property (line 35)
- 99. DROP DATABASE (line 41)

#### test341.js
*Test 341 Intellectual DOT operator*

- 1. CREATE DATABASE (line 9)
- 2. Create tables (line 14)
- 4. JavaScript way (line 38)
- 5. JavaScript way (line 44)
- 6. Object reference (line 56)
- 99. DROP DATABASE (line 63)

#### test343.js
*Test 343 Use params for $variables*

- 1. CREATE DATABASE (line 9)
- 2. Simple get undefined (line 14)
- 5. Simple set to param (line 33)
- 99. DROP DATABASE (line 56)

#### test357.js
*Test 357 Test*

- 1. CREATE DATABASE (line 9)
- 2. Prepare Data (line 15)
- 3. Select Query (line 35)
- 99. DROP DATABASE (line 48)

#### test361.js
*Test 361 IN (SELECT)*

- 2. Gives correct results (line 28)

#### test392.js
*Test 392 Observable (issue #499)*

- 2. Prepare test data (line 19)

#### test409.js
*Test 409 Backup and restore database*

- 2. CREATE DATABASE (line 50)

#### test414.js
*Test *

- 5. Test (line 46)

#### test416.js
*Test *

- 2. Test (line 45)

#### test417.js
*Test *

- 2. Test inserr (line 31)

#### test418.js
*.json from URL*

- .tab from URL (line 84)

#### test424.js
*Test *

- 2. DOT inside SELECT (line 27)
- 5. DOT inside SELECT (line 48)

#### test429.js
- Test 429 (line 11)

#### test430.js
- Test  (line 9)

#### test604.js
- * Reselect from table (line 112)
- * Reselect from view (line 117)

#### test612.js
- Test 612 - INTO CSV (line 7)

#### test815.js
- Test 815 date parsing options (line 9)

---

## Recommendations

Based on the analysis above, here is the recommended prioritization for enabling pending tests:

### Phase 1: Critical SQL-99 Compliance (Priority 1)
**Impact:** CRITICAL - Essential for SQL-99 compliance

- **SQL Standards Compliance** (6 tests)
  - Focus: SQL logic tests, Standard SQL syntax

### Phase 2: Essential SQL Features (Priority 2)
**Impact:** HIGH - Core SQL functionality

- **Constraints & Foreign Keys** (39 tests)
  - Focus: PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE, NOT NULL
- **Set Operations (UNION/INTERSECT/EXCEPT)** (21 tests)
  - Focus: UNION, INTERSECT, EXCEPT
- **Joins** (13 tests)
  - Focus: FULL OUTER JOIN, CROSS JOIN

### Phase 3: Standard SQL Extensions (Priority 3-4)
**Impact:** MEDIUM - Important but not critical

- **Triggers** (1 tests)
  - Focus: BEFORE/AFTER/INSTEAD OF triggers
- **Advanced SQL Features** (55 tests)
  - Focus: WITH (CTEs), PIVOT/UNPIVOT, Window functions
- **Output Formats** (22 tests)
  - Focus: INTO clause with various formats
- **Data Types & Functions** (7 tests)
  - Focus: ROUND, ASCII, Aggregate functions

### Phase 4: Non-Standard & Performance (Priority 5-7)
**Impact:** LOW - Nice to have, vendor-specific

- **Storage & Persistence** (44 tests)
  - Focus: localStorage, IndexedDB (browser-specific)
- **Graph & Search** (88 tests)
  - Focus: Non-standard graph extensions
- **Performance & Optimization** (12 tests)
  - Focus: Performance tests
- **Edge Cases** (2 tests)
  - Focus: Edge case handling
- **Other** (77 tests)
  - Focus: Miscellaneous features

## Implementation Strategy

1. **Start with Phase 1** (6 tests)
   - Review SQL logic tests to identify missing SQL-99 features
   - Implement core SQL syntax compliance
   
2. **Move to Phase 2** (73 tests)
   - Implement set operations (UNION, INTERSECT, EXCEPT)
   - Complete constraint and foreign key support
   - Fix FULL OUTER JOIN and other join types
   
3. **Address Phase 3** (85 tests)
   - Implement CTEs (WITH clause)
   - Add trigger support
   - Expand function library
   
4. **Finally Phase 4** (223 tests)
   - Graph/search extensions
   - Storage engine improvements
   - Performance optimizations

## Summary by Priority

| Priority | Impact | Test Count | Percentage |
|----------|--------|------------|------------|
| 1 | CRITICAL | 6 | 1.6% |
| 2 | HIGH | 73 | 18.9% |
| 3 | MEDIUM | 78 | 20.2% |
| 4 | MEDIUM | 7 | 1.8% |
| 5 | LOW | 132 | 34.1% |
| 6 | LOW | 14 | 3.6% |
| 7 | LOW | 77 | 19.9% |

**Note:** Tests marked as `it.skip()` or `describe.skip()` need to be reviewed individually to determine:
1. Whether the feature is implemented but tests are outdated
2. Whether the feature needs to be implemented
3. Whether the test expectations are correct

Many of these tests may already pass once enabled, while others may require significant implementation work.
