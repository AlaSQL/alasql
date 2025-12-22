# Issue: Window Offset Functions (LEAD/LAG/FIRST_VALUE/LAST_VALUE) Not Implemented

## Summary
Window offset functions `LEAD()`, `LAG()`, `FIRST_VALUE()`, and `LAST_VALUE()` are not implemented in AlaSQL. These are essential SQL:2003 standard window functions that allow accessing rows relative to the current row within a partition.

## Current Behavior

```javascript
// Attempting to use LEAD():
alasql('SELECT category, amount, LEAD(amount) OVER (PARTITION BY category ORDER BY amount) AS next_amt FROM data');

// Error: alasql.fn.LEAD is not a function
```

The same error occurs for `LAG()`, `FIRST_VALUE()`, and `LAST_VALUE()`.

## Expected Behavior

### LEAD() - Access Next Row Value
```javascript
var data = [
  {category: 'A', amount: 10},
  {category: 'A', amount: 20},
  {category: 'A', amount: 30},
  {category: 'B', amount: 40}
];

alasql('SELECT category, amount, LEAD(amount) OVER (PARTITION BY category ORDER BY amount) AS next_amt FROM ?', [data]);

// Expected output:
[
  {category: 'A', amount: 10, next_amt: 20},   // Next in partition
  {category: 'A', amount: 20, next_amt: 30},   // Next in partition
  {category: 'A', amount: 30, next_amt: null}, // Last in partition
  {category: 'B', amount: 40, next_amt: null}  // Last in partition
]
```

### LAG() - Access Previous Row Value
```javascript
alasql('SELECT category, amount, LAG(amount) OVER (PARTITION BY category ORDER BY amount) AS prev_amt FROM ?', [data]);

// Expected output:
[
  {category: 'A', amount: 10, prev_amt: null}, // First in partition
  {category: 'A', amount: 20, prev_amt: 10},   // Previous in partition
  {category: 'A', amount: 30, prev_amt: 20},   // Previous in partition
  {category: 'B', amount: 40, prev_amt: null}  // First in partition
]
```

### FIRST_VALUE() - Access First Row in Window
```javascript
alasql('SELECT category, amount, FIRST_VALUE(amount) OVER (PARTITION BY category ORDER BY amount) AS first_amt FROM ?', [data]);

// Expected output:
[
  {category: 'A', amount: 10, first_amt: 10}, // First in partition
  {category: 'A', amount: 20, first_amt: 10}, // First in partition
  {category: 'A', amount: 30, first_amt: 10}, // First in partition
  {category: 'B', amount: 40, first_amt: 40}  // First in partition
]
```

### LAST_VALUE() - Access Last Row in Window
```javascript
alasql('SELECT category, amount, LAST_VALUE(amount) OVER (PARTITION BY category ORDER BY amount) AS last_amt FROM ?', [data]);

// Expected output (with proper frame specification):
[
  {category: 'A', amount: 10, last_amt: 30}, // Last in partition
  {category: 'A', amount: 20, last_amt: 30}, // Last in partition
  {category: 'A', amount: 30, last_amt: 30}, // Last in partition
  {category: 'B', amount: 40, last_amt: 40}  // Last in partition
]
```

## Use Cases

### 1. Calculate Period-over-Period Change
```javascript
// Calculate month-over-month sales change
alasql(`
  SELECT 
    month, 
    sales,
    sales - LAG(sales) OVER (ORDER BY month) AS mom_change,
    (sales - LAG(sales) OVER (ORDER BY month)) / LAG(sales) OVER (ORDER BY month) * 100 AS mom_pct
  FROM monthly_sales
`);
```

### 2. Find Next Event Time
```javascript
// Find time until next customer visit
alasql(`
  SELECT 
    customer_id,
    visit_date,
    LEAD(visit_date) OVER (PARTITION BY customer_id ORDER BY visit_date) AS next_visit,
    DATEDIFF(day, visit_date, LEAD(visit_date) OVER (PARTITION BY customer_id ORDER BY visit_date)) AS days_until_next
  FROM customer_visits
`);
```

### 3. Compare with Baseline
```javascript
// Compare each employee salary to department min/max
alasql(`
  SELECT 
    dept,
    emp_name,
    salary,
    FIRST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary) AS dept_min,
    LAST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS dept_max
  FROM employees
`);
```

## Function Signatures

### LEAD(expression [, offset [, default]]) OVER (...)
- `expression`: Column or expression to retrieve from the lead row
- `offset`: Number of rows forward (default: 1)
- `default`: Value to return when lead row doesn't exist (default: NULL)

### LAG(expression [, offset [, default]]) OVER (...)
- `expression`: Column or expression to retrieve from the lag row
- `offset`: Number of rows backward (default: 1)
- `default`: Value to return when lag row doesn't exist (default: NULL)

### FIRST_VALUE(expression) OVER (...)
- `expression`: Column or expression to retrieve from first row in window frame

### LAST_VALUE(expression) OVER (...)
- `expression`: Column or expression to retrieve from last row in window frame
- **Note**: Requires proper frame specification (ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)

## Implementation Requirements

### 1. Parser Updates
Add function tokens to `src/alasqlparser.jison`:
```
LEAD | LAG | FIRST_VALUE | LAST_VALUE
```

### 2. Function Registration
Register functions in `src/55functions.js` or similar:
```javascript
stdlib.LEAD = function() { /* placeholder */ };
stdlib.LAG = function() { /* placeholder */ };
stdlib.FIRST_VALUE = function() { /* placeholder */ };
stdlib.LAST_VALUE = function() { /* placeholder */ };
```

### 3. Window Function Execution
Implement in `src/424select.js` or new `src/window-functions.js`:
- Detect offset functions during compilation
- After partitioning and ordering:
  - For LEAD: Access row at current_index + offset
  - For LAG: Access row at current_index - offset
  - For FIRST_VALUE: Access row at partition_start
  - For LAST_VALUE: Access row at partition_end (or frame_end)
- Handle default values when offset exceeds partition bounds

### 4. ORDER BY Requirement
These functions require ORDER BY in the OVER clause:
```javascript
// Should work:
LEAD(amount) OVER (PARTITION BY category ORDER BY date)

// Should error or warn:
LEAD(amount) OVER (PARTITION BY category)  // No ORDER BY
```

## Test Cases

```javascript
describe('Window Offset Functions', function() {
  var data = [
    {id: 1, category: 'A', value: 100, seq: 1},
    {id: 2, category: 'A', value: 200, seq: 2},
    {id: 3, category: 'A', value: 300, seq: 3},
    {id: 4, category: 'B', value: 150, seq: 1},
    {id: 5, category: 'B', value: 250, seq: 2}
  ];
  
  it('LEAD() with default offset of 1', function(done) {
    var res = alasql(
      'SELECT id, value, LEAD(value) OVER (PARTITION BY category ORDER BY seq) AS next_value FROM ?',
      [data]
    );
    assert.equal(res[0].next_value, 200);
    assert.equal(res[1].next_value, 300);
    assert.equal(res[2].next_value, null);
    done();
  });
  
  it('LAG() with custom offset', function(done) {
    var res = alasql(
      'SELECT id, value, LAG(value, 2) OVER (PARTITION BY category ORDER BY seq) AS prev_value_2 FROM ?',
      [data]
    );
    assert.equal(res[2].prev_value_2, 100); // Row 3 looks back 2 rows to row 1
    done();
  });
  
  it('LEAD() with default value', function(done) {
    var res = alasql(
      'SELECT id, value, LEAD(value, 1, 0) OVER (PARTITION BY category ORDER BY seq) AS next_value FROM ?',
      [data]
    );
    assert.equal(res[2].next_value, 0); // Default value instead of null
    done();
  });
  
  it('FIRST_VALUE() returns first in partition', function(done) {
    var res = alasql(
      'SELECT id, value, FIRST_VALUE(value) OVER (PARTITION BY category ORDER BY seq) AS first FROM ?',
      [data]
    );
    assert.equal(res[0].first, 100);
    assert.equal(res[1].first, 100);
    assert.equal(res[2].first, 100);
    done();
  });
  
  it('LAST_VALUE() with full frame', function(done) {
    var res = alasql(
      'SELECT id, value, LAST_VALUE(value) OVER (PARTITION BY category ORDER BY seq ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last FROM ?',
      [data]
    );
    assert.equal(res[0].last, 300);
    assert.equal(res[1].last, 300);
    assert.equal(res[2].last, 300);
    done();
  });
});
```

## Implementation Priority
**Medium-High** - These are commonly used window functions in standard SQL and are expected by users familiar with PostgreSQL, SQL Server, and other modern databases.

## References
- SQL:2003 Standard - Window Functions
- PostgreSQL Window Functions: https://www.postgresql.org/docs/current/functions-window.html
- Existing implementation: `ROW_NUMBER()` can serve as a template for window function mechanics
- Parser already supports OVER clause structure (`src/47over.js`)

## Related Issues
- Issue #[original] - Request for window functions including LEAD/LAG
- Window aggregate functions issue (COUNT/MAX/MIN OVER)
