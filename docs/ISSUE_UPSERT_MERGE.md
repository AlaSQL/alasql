# Issue: UPSERT/MERGE Statement Not Implemented

## Summary
The MERGE statement syntax is parsed by AlaSQL (`src/75merge.js`) but the execution logic is not implemented. The `execute()` method simply returns `1` without performing any insert, update, or delete operations. Additionally, PostgreSQL-style `INSERT ... ON CONFLICT` (UPSERT) syntax is not supported.

## Current Behavior

```javascript
// MERGE statement is parsed but does nothing:
alasql(`
  MERGE INTO target AS t
  USING source AS s
  ON t.id = s.id
  WHEN MATCHED THEN UPDATE SET t.value = s.value
  WHEN NOT MATCHED THEN INSERT (id, value) VALUES (s.id, s.value)
`);

// Returns: 1 (but no actual operation performed)
```

```javascript
// PostgreSQL UPSERT syntax not supported:
alasql(`
  INSERT INTO users (id, name, email) 
  VALUES (1, 'John', 'john@example.com')
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email
`);

// Error: Parser doesn't recognize ON CONFLICT syntax
```

## Expected Behavior - MERGE Statement

### Example 1: Basic MERGE with INSERT and UPDATE
```javascript
// Setup
alasql('CREATE TABLE target (id INT, name STRING, value INT)');
alasql('CREATE TABLE source (id INT, name STRING, value INT)');
alasql('INSERT INTO target VALUES (1, "Alice", 100), (2, "Bob", 200)');
alasql('INSERT INTO source VALUES (2, "Bob", 250), (3, "Charlie", 300)');

// Merge operation
alasql(`
  MERGE INTO target AS t
  USING source AS s
  ON t.id = s.id
  WHEN MATCHED THEN 
    UPDATE SET t.value = s.value
  WHEN NOT MATCHED THEN 
    INSERT (id, name, value) VALUES (s.id, s.name, s.value)
`);

// Expected result in target table:
// [
//   {id: 1, name: 'Alice', value: 100},   // Unchanged (not in source)
//   {id: 2, name: 'Bob', value: 250},     // Updated (matched)
//   {id: 3, name: 'Charlie', value: 300}  // Inserted (not matched)
// ]
```

### Example 2: MERGE with DELETE
```javascript
alasql(`
  MERGE INTO target AS t
  USING source AS s
  ON t.id = s.id
  WHEN MATCHED THEN 
    UPDATE SET t.value = s.value
  WHEN NOT MATCHED BY SOURCE THEN 
    DELETE
`);

// Expected: Rows in target not in source are deleted
```

### Example 3: MERGE with Conditional Logic
```javascript
alasql(`
  MERGE INTO inventory AS inv
  USING shipment AS ship
  ON inv.product_id = ship.product_id
  WHEN MATCHED AND ship.quantity > 0 THEN
    UPDATE SET inv.stock = inv.stock + ship.quantity
  WHEN MATCHED AND ship.quantity = 0 THEN
    DELETE
  WHEN NOT MATCHED THEN
    INSERT (product_id, stock) VALUES (ship.product_id, ship.quantity)
`);
```

## Expected Behavior - PostgreSQL UPSERT (ON CONFLICT)

### Example 1: INSERT with UPDATE on Conflict
```javascript
alasql('CREATE TABLE users (id INT PRIMARY KEY, name STRING, email STRING, updated_at DATE)');

alasql(`
  INSERT INTO users (id, name, email, updated_at) 
  VALUES (1, 'John', 'john@example.com', NOW())
  ON CONFLICT (id) 
  DO UPDATE SET 
    email = EXCLUDED.email,
    updated_at = NOW()
`);

// If id=1 exists: Updates email and updated_at
// If id=1 doesn't exist: Inserts new row
```

### Example 2: INSERT with DO NOTHING on Conflict
```javascript
alasql(`
  INSERT INTO users (id, name, email) 
  VALUES (1, 'John', 'john@example.com')
  ON CONFLICT (id) DO NOTHING
`);

// If id=1 exists: No action taken
// If id=1 doesn't exist: Inserts new row
```

### Example 3: Conditional UPSERT
```javascript
alasql(`
  INSERT INTO users (id, name, email, login_count) 
  VALUES (1, 'John', 'john@example.com', 1)
  ON CONFLICT (id) 
  DO UPDATE SET 
    login_count = users.login_count + 1,
    last_login = NOW()
  WHERE users.email = EXCLUDED.email
`);
```

## Use Cases

### 1. Synchronizing Data
```javascript
// Sync external data with local cache
alasql(`
  MERGE INTO local_cache AS local
  USING external_data AS ext
  ON local.product_id = ext.product_id
  WHEN MATCHED THEN UPDATE SET local.price = ext.price, local.updated = NOW()
  WHEN NOT MATCHED THEN INSERT VALUES (ext.product_id, ext.price, NOW())
`);
```

### 2. Maintaining User Sessions
```javascript
// Insert new session or update existing
alasql(`
  INSERT INTO sessions (user_id, session_token, last_seen)
  VALUES (?, ?, NOW())
  ON CONFLICT (user_id)
  DO UPDATE SET session_token = EXCLUDED.session_token, last_seen = NOW()
`, [userId, token]);
```

### 3. Deduplication
```javascript
// Keep only the latest record
alasql(`
  INSERT INTO unique_events (event_id, data, timestamp)
  VALUES (?, ?, NOW())
  ON CONFLICT (event_id) DO NOTHING
`, [eventId, data]);
```

## Implementation Status

### Currently Parsed (src/75merge.js)
- ✅ MERGE INTO ... USING ... ON ...
- ✅ WHEN MATCHED / NOT MATCHED clauses
- ✅ BY TARGET / BY SOURCE qualifiers
- ✅ INSERT / UPDATE / DELETE actions
- ✅ toString() method generates SQL

### Not Implemented
- ❌ Execute method (returns hardcoded `1`)
- ❌ Actual merge logic
- ❌ ON CONFLICT syntax (not in parser)
- ❌ DO UPDATE / DO NOTHING actions
- ❌ EXCLUDED table reference

## Implementation Requirements

### For MERGE Statement

#### 1. Execute Logic in src/75merge.js
```javascript
yy.Merge.prototype.execute = function(databaseid, params, cb) {
  // 1. Resolve target and source tables
  // 2. Execute join on ON condition
  // 3. Classify rows:
  //    - Matched: exists in both target and source
  //    - Not matched by target: in source only
  //    - Not matched by source: in target only
  // 4. For each classification, execute appropriate WHEN clause
  // 5. Return count of affected rows
};
```

#### 2. Handle Multiple WHEN Clauses
- Process in order specified
- Stop at first matching WHEN clause per row
- Support optional AND conditions

#### 3. Action Execution
- **UPDATE**: Modify matching rows in target table
- **INSERT**: Add new rows to target table
- **DELETE**: Remove rows from target table

### For PostgreSQL UPSERT (ON CONFLICT)

#### 1. Parser Updates (src/alasqlparser.jison)
```
InsertStatement:
  INSERT INTO table ...
  [ON CONFLICT (columns) DO UPDATE SET ... | DO NOTHING]
```

#### 2. New Conflict Resolution Logic
- Check for constraint violations (PRIMARY KEY, UNIQUE)
- On conflict:
  - DO NOTHING: Skip insert
  - DO UPDATE: Execute UPDATE with EXCLUDED table reference
- EXCLUDED table: Access to values from INSERT statement

#### 3. Integration with INSERT (src/70insert.js)
- Detect ON CONFLICT clause
- Catch constraint violation
- Execute conflict resolution action

## Test Cases

### MERGE Tests
```javascript
describe('MERGE Statement', function() {
  beforeEach(function() {
    alasql('CREATE TABLE target (id INT PRIMARY KEY, value INT)');
    alasql('CREATE TABLE source (id INT, value INT)');
  });
  
  it('should insert non-matched rows', function(done) {
    alasql('INSERT INTO source VALUES (1, 100), (2, 200)');
    alasql(`
      MERGE INTO target AS t
      USING source AS s ON t.id = s.id
      WHEN NOT MATCHED THEN INSERT VALUES (s.id, s.value)
    `);
    var res = alasql('SELECT * FROM target ORDER BY id');
    assert.deepEqual(res, [{id: 1, value: 100}, {id: 2, value: 200}]);
    done();
  });
  
  it('should update matched rows', function(done) {
    alasql('INSERT INTO target VALUES (1, 100)');
    alasql('INSERT INTO source VALUES (1, 200)');
    alasql(`
      MERGE INTO target AS t
      USING source AS s ON t.id = s.id
      WHEN MATCHED THEN UPDATE SET t.value = s.value
    `);
    var res = alasql('SELECT * FROM target');
    assert.equal(res[0].value, 200);
    done();
  });
  
  it('should handle both matched and not matched', function(done) {
    alasql('INSERT INTO target VALUES (1, 100)');
    alasql('INSERT INTO source VALUES (1, 200), (2, 300)');
    var affected = alasql(`
      MERGE INTO target AS t
      USING source AS s ON t.id = s.id
      WHEN MATCHED THEN UPDATE SET t.value = s.value
      WHEN NOT MATCHED THEN INSERT VALUES (s.id, s.value)
    `);
    var res = alasql('SELECT * FROM target ORDER BY id');
    assert.deepEqual(res, [{id: 1, value: 200}, {id: 2, value: 300}]);
    assert.equal(affected, 2); // 1 update + 1 insert
    done();
  });
});
```

### UPSERT Tests
```javascript
describe('INSERT ... ON CONFLICT (UPSERT)', function() {
  beforeEach(function() {
    alasql('CREATE TABLE users (id INT PRIMARY KEY, name STRING, email STRING)');
  });
  
  it('should insert when no conflict', function(done) {
    alasql(`
      INSERT INTO users (id, name, email) VALUES (1, 'John', 'john@test.com')
      ON CONFLICT (id) DO NOTHING
    `);
    var res = alasql('SELECT * FROM users');
    assert.equal(res.length, 1);
    assert.equal(res[0].name, 'John');
    done();
  });
  
  it('should do nothing on conflict with DO NOTHING', function(done) {
    alasql('INSERT INTO users VALUES (1, "John", "john@test.com")');
    alasql(`
      INSERT INTO users (id, name, email) VALUES (1, 'Jane', 'jane@test.com')
      ON CONFLICT (id) DO NOTHING
    `);
    var res = alasql('SELECT * FROM users');
    assert.equal(res.length, 1);
    assert.equal(res[0].name, 'John'); // Unchanged
    done();
  });
  
  it('should update on conflict with DO UPDATE', function(done) {
    alasql('INSERT INTO users VALUES (1, "John", "john@test.com")');
    alasql(`
      INSERT INTO users (id, name, email) VALUES (1, 'John', 'newemail@test.com')
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email
    `);
    var res = alasql('SELECT * FROM users');
    assert.equal(res[0].email, 'newemail@test.com'); // Updated
    done();
  });
});
```

## Implementation Priority
**Medium** - While UPSERT is a common pattern, it can be worked around with explicit INSERT/UPDATE logic. However, having native support would significantly improve usability.

## References
- SQL:2003 Standard - MERGE statement
- PostgreSQL Documentation: https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT
- PostgreSQL UPSERT Tutorial: https://www.postgresqltutorial.com/postgresql-upsert/
- MS SQL Server MERGE: https://learn.microsoft.com/en-us/sql/t-sql/statements/merge-transact-sql
- Existing parser: `src/75merge.js` (needs execute implementation)
- Test reference: `test/test236.js` (incomplete test)

## Workaround (Current)
Users can achieve UPSERT behavior using separate INSERT and UPDATE:
```javascript
// Check if exists
var exists = alasql('SELECT * FROM users WHERE id = ?', [id]);
if (exists.length > 0) {
  // Update
  alasql('UPDATE users SET email = ? WHERE id = ?', [email, id]);
} else {
  // Insert
  alasql('INSERT INTO users VALUES (?, ?, ?)', [id, name, email]);
}
```

This workaround is verbose and not transaction-safe in concurrent scenarios.
