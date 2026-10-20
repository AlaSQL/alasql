# Performance Test for Issue #1027

## Issue Description
Users report performance issues when querying AlaSQL database with joins. Response times of several minutes occur when:
1. Loading JSON files into database tables (build time)
2. Creating tables with ~2500 total records across 3 tables
3. Running synchronous queries with 2 joins at runtime

## Root Cause
The performance issue was caused by regular indices (created with `CREATE INDEX`) not being updated when records are inserted via:
1. `INSERT` statements using `table.insert()` function
2. Direct data loading by pushing to `table.data` array

In `src/60createtable.js`, the `table.insert()` function only updated:
- Primary key indices (`table.pk`)
- Unique indices (`table.uk`)

But it did NOT update regular indices stored in `table.indices[hh]`.

## Performance Impact
Without working indices:
- Queries with joins perform full table scans (O(n*m) complexity)
- With 1000 records in each of 3 tables, a 2-join query does ~1M comparisons
- Performance degrades dramatically with larger datasets

With working indices:
- Index lookups are O(1) on average
- Query performance improves by orders of magnitude

## Fix Implemented
The fix updates regular indices during INSERT operations by iterating through all index definitions in `table.inddefs` and adding the inserted record to the appropriate index bucket.

## Test Files

### Performance Comparison Test (Recommended)
**`perf-comparison.js`** - Unified test that compares both loading methods side-by-side:
- Uses functions to run the same setup twice
- Tests both INSERT statements and direct table.data.push()
- Prints clear comparison showing indices are populated differently
- Can run individual tests or both with command line flags

Run it with:
```bash
# Compare both methods
node test/performance/#1027/perf-comparison.js both
# or just:
node test/performance/#1027/perf-comparison.js

# Test INSERT method only
node test/performance/#1027/perf-comparison.js insert

# Test direct loading only
node test/performance/#1027/perf-comparison.js direct
```

### Individual Performance Tests
These scripts test each method separately:

- `perf-join-index.js` - Tests join performance with indices using INSERT statements
- `perf-direct-load.js` - Tests the scenario of loading data directly via table.data.push()

Run them with:
```bash
node test/performance/#1027/perf-join-index.js
node test/performance/#1027/perf-direct-load.js
```

### Correctness Tests (Mocha)
The main test file `test/test1027.js` uses mocha to verify:
- Indices are created and populated correctly
- Indices are updated during INSERT operations
- Composite indices work correctly
- JOIN queries use indices properly
- Multiple indices on the same table work

Run with the full test suite:
```bash
yarn test
```

## Expected Behavior
After the fix:
- INSERT statements properly maintain indices during data loading
- Queries complete in milliseconds with either loading method
- Direct data loading builds indices on-the-fly during first query
- Both methods produce identical results with similar query performance
