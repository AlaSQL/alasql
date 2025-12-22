# Issue: Window Aggregate Functions (COUNT/MAX/MIN) Not Working with PARTITION BY

## Summary
Window aggregate functions like `COUNT()`, `MAX()`, and `MIN()` with `OVER (PARTITION BY ...)` clauses are parsed successfully but do not implement proper window function semantics. Instead of returning one row per input row with the windowed aggregate value, they collapse the result set to a single row with the overall aggregate.

## Current Behavior

```javascript
// Given test data:
var data = [
  {category: 'A', amount: 10},
  {category: 'A', amount: 20},
  {category: 'B', amount: 30},
  {category: 'B', amount: 40}
];

// Query with window function:
alasql('SELECT category, amount, COUNT(*) OVER (PARTITION BY category) AS cnt FROM ?', [data]);

// Current (INCORRECT) output:
[{category: undefined, amount: undefined, cnt: 4}]
// Returns single aggregated row, losing all detail
```

## Expected Behavior

```javascript
// Expected (CORRECT) output:
[
  {category: 'A', amount: 10, cnt: 2},  // Count of 'A' rows
  {category: 'A', amount: 20, cnt: 2},  // Count of 'A' rows
  {category: 'B', amount: 30, cnt: 2},  // Count of 'B' rows
  {category: 'B', amount: 40, cnt: 2}   // Count of 'B' rows
]
// Should return one row per input row with window aggregate
```

## Technical Details

### Working Reference
- `ROW_NUMBER() OVER (PARTITION BY ...)` works correctly (implemented in `src/424select.js` lines 514-529)
- Parser correctly recognizes `OVER` clause structure (`src/47over.js`)

### Problem Location
The issue appears to be in how aggregate functions interact with the OVER clause:
- **Parser**: `src/alasqlparser.jison` - correctly parses OVER clause
- **Compilation**: `src/424select.js` - needs window function execution logic
- **Aggregates**: `src/55functions.js` - aggregate functions don't check for OVER clause

### Root Cause
When an aggregate function (COUNT/MAX/MIN/SUM/AVG) has an OVER clause, it should:
1. Process all rows without grouping
2. Partition rows according to PARTITION BY columns
3. Calculate aggregate within each partition
4. Assign the partition's aggregate value to each row in that partition

Currently, the aggregate behavior treats it as a regular GROUP BY aggregate, collapsing rows.

## Affected Functions
- `COUNT(*) OVER (PARTITION BY ...)`
- `MAX(column) OVER (PARTITION BY ...)`
- `MIN(column) OVER (PARTITION BY ...)`
- `SUM(column) OVER (PARTITION BY ...)` (likely)
- `AVG(column) OVER (PARTITION BY ...)` (likely)

## Test Case

```javascript
describe('Window Aggregate Functions', function() {
  it('COUNT() OVER (PARTITION BY) should return per-row values', function(done) {
    var data = [
      {dept: 'Sales', emp: 'John', salary: 1000},
      {dept: 'Sales', emp: 'Jane', salary: 1200},
      {dept: 'IT', emp: 'Bob', salary: 1500},
      {dept: 'IT', emp: 'Alice', salary: 1600}
    ];
    
    var res = alasql(
      'SELECT dept, emp, COUNT(*) OVER (PARTITION BY dept) AS dept_count FROM ?',
      [data]
    );
    
    assert.deepEqual(res, [
      {dept: 'Sales', emp: 'John', dept_count: 2},
      {dept: 'Sales', emp: 'Jane', dept_count: 2},
      {dept: 'IT', emp: 'Bob', dept_count: 2},
      {dept: 'IT', emp: 'Alice', dept_count: 2}
    ]);
    done();
  });
  
  it('MAX() OVER (PARTITION BY) should return per-row values', function(done) {
    var res = alasql(
      'SELECT dept, emp, salary, MAX(salary) OVER (PARTITION BY dept) AS max_dept_salary FROM ?',
      [data]
    );
    
    assert.deepEqual(res, [
      {dept: 'Sales', emp: 'John', salary: 1000, max_dept_salary: 1200},
      {dept: 'Sales', emp: 'Jane', salary: 1200, max_dept_salary: 1200},
      {dept: 'IT', emp: 'Bob', salary: 1500, max_dept_salary: 1600},
      {dept: 'IT', emp: 'Alice', salary: 1600, max_dept_salary: 1600}
    ]);
    done();
  });
});
```

## Implementation Approach

1. Detect when an aggregate function has an OVER clause during compilation
2. Mark the SELECT as requiring window function processing
3. After main query execution, apply window function logic:
   - Partition result rows by PARTITION BY columns
   - Calculate aggregate for each partition
   - Add aggregate value to each row in partition
4. Handle ORDER BY within OVER clause for frame-aware aggregates

## References
- SQL:2003 Standard - Window Functions
- PostgreSQL Window Functions: https://www.postgresql.org/docs/current/tutorial-window.html
- Working implementation: `ROW_NUMBER()` in `src/424select.js`

## Priority
**High** - This is a core SQL feature that users expect to work when the syntax is accepted.

## Related Issues
- Issue #[original] - Request for window aggregate functions
- `ROW_NUMBER() OVER (PARTITION BY ...)` working correctly (can serve as template)
