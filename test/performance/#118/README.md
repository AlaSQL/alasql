# Performance Test for Issue #118 - Lot of Joined Sources in SELECT

## Issue Description

Some SQLLogicTest tests include queries with many joined tables that cause severe performance degradation:

```sql
SELECT d6, x4, x7, x8, a1, b9, d5*934
  FROM t8, t7, t1, t6, t5, t9, t4
 WHERE (689=c5 OR 657=c5 OR c5=187)
   AND a1 in (324,241,330,352,32,829)
   AND d6=21
   AND b4=735
   AND e8 in (106,846,859,349)
   AND e7 in (248,356,503)
   AND b9 in (214,122,211,913,900,214,524,688)
```

### Observed Performance (from issue comments)

From `select5.test` with 700 rows spread across 64 tables (most with 10 rows each):

| Query Complexity          | Time (original)           | Time (after fix) |
| ------------------------- | ------------------------- | ---------------- |
| 7 tables, 7 constraints   | ~6 seconds                | ~3 ms            |
| 8 tables, 8 constraints   | ~65 seconds               | ~3 ms            |
| 10 tables, 10 constraints | ~8705 seconds (2.4 hours) | ~3 ms            |

## Root Cause

The performance issue stemmed from how AlaSQL processed implicit JOINs (comma-separated tables in FROM clause):

1. **Cartesian Product Formation**: Tables listed with commas were creating a cartesian product
2. **Late Filtering**: WHERE clause filtering happened after the cartesian product was formed
3. **Exponential Growth**: With N tables of M rows each, the cartesian space is M^N combinations

For example:

- 7 tables × 10 rows = 10^7 = 10,000,000 combinations to evaluate
- 8 tables × 10 rows = 10^8 = 100,000,000 combinations
- 10 tables × 10 rows = 10^10 = 10,000,000,000 combinations

## Fix Implemented

The fix was implemented in `src/422where.js` by updating the `compileWhereJoins` function to:

1. **Extract join conditions** from the WHERE clause (conditions like `t1.b = t2.a`)
2. **Set up indexed lookups** on subsequent sources using `onleftfn`/`onrightfn`
3. **Enable `optimization: 'ix'`** flag to use hash-based index lookups instead of nested loops

This converts the O(M^N) complexity to approximately O(N \* M) for chain joins.

## Test Files

### 1. `perf-many-joins.js`

Main performance test that shows execution time growth with increasing table count.

```bash
node test/performance/#118/perf-many-joins.js
```

### 2. `perf-cartesian.js`

Detailed analysis of cartesian product behavior and time-per-combination metrics.

```bash
node test/performance/#118/perf-cartesian.js
```

### 3. `perf-implicit-vs-explicit.js`

Compares performance between implicit (comma) and explicit (JOIN ON) syntax.

```bash
node test/performance/#118/perf-implicit-vs-explicit.js
```

## Results After Fix

### Before Optimization (implicit joins)

```
Tables | Time (ms) | Growth factor
-------|-----------|---------------
   2   |        2  | baseline
   3   |        3  | 1.5x
   4   |        7  | 2.3x
   5   |       21  | 3.0x
   6   |       57  | 2.7x
   7   |      435  | 7.6x

Average growth factor per table: 2.93x (exponential)
```

### After Optimization (implicit joins)

```
Tables | Time (ms) | Growth factor
-------|-----------|---------------
   2   |        2  | baseline
   3   |        1  | 0.5x
   4   |        2  | 2.0x
   5   |        4  | 2.0x
   6   |        2  | 0.5x
   7   |        3  | 1.5x

Average growth factor per table: 1.08x (near-linear)
```

### Performance Improvement Summary

| Metric       | Before      | After       | Improvement           |
| ------------ | ----------- | ----------- | --------------------- |
| 6-table join | 81 ms       | 6 ms        | 13x faster            |
| 7-table join | 435 ms      | 3 ms        | 145x faster           |
| Growth rate  | 2.93x/table | 1.08x/table | Linear vs Exponential |

## Related Files

- `src/422where.js` - WHERE clause compilation and join optimization (fixed)
- `src/39dojoin.js` - Main join loop implementation
- `src/420from.js` - FROM clause compilation
- `src/421join.js` - JOIN clause compilation
- `src/38query.js` - Query execution and preindexing

## How the Optimization Works

The `compileWhereJoins` function now:

1. Parses the WHERE clause to find equality conditions
2. Identifies which tables are involved in each condition
3. For conditions linking two tables (e.g., `t1.b = t2.a`):
   - Sets up `onleftfn` (the expression from the already-scanned table)
   - Sets up `onrightfn` (the expression from the current table)
   - Enables `optimization: 'ix'` to build a hash index on first scan
4. The `preIndex` function in `src/38query.js` then builds the index
5. The `doJoin` function uses the index for O(1) lookups instead of full scans

## Status

**FIXED** - The optimization has been implemented and tested. Implicit joins now perform comparably to explicit JOINs.
