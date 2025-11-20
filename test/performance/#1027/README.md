# Performance Test for Issue #1027

## Issue Description
Users report performance issues when querying AlaSQL database with joins. Response times of several minutes occur when:
1. Loading JSON files into database tables (build time)
2. Creating tables with ~2500 total records across 3 tables
3. Running synchronous queries with 2 joins at runtime

## Root Cause
The performance issue is caused by regular indices (created with `CREATE INDEX`) not being updated when records are inserted via:
1. `INSERT` statements using `table.insert()` function
2. Direct data loading by pushing to `table.data` array

In `src/60createtable.js`, the `table.insert()` function only updates:
- Primary key indices (`table.pk`)
- Unique indices (`table.uk`)

But it does NOT update regular indices stored in `table.indices[hh]`.

## Performance Impact
Without working indices:
- Queries with joins perform full table scans (O(n*m) complexity)
- With 1000 records in each of 3 tables, a 2-join query does ~1M comparisons
- Performance degrades dramatically with larger datasets

With working indices:
- Index lookups are O(1) on average
- Query performance improves by orders of magnitude

## Test Files
- `test-join-performance.js` - Demonstrates the performance issue with both INSERT statements and direct data loading

## Running the Tests
```bash
# Run all tests
yarn test

# Run just this performance test
node node_modules/mocha/bin/mocha.js test/performance/#1027/test-join-performance.js
```

## Expected Behavior
After the fix:
- Queries should complete in milliseconds, not seconds
- Index optimization should work for both INSERT and direct data loading scenarios
