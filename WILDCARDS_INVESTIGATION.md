# LIKE Wildcards Investigation

## Question from @mathiasrw
"Did you look at the second claim that ? and _ is not working?"

## Answer: YES, both wildcards ARE working correctly! ✅

### Standard SQL LIKE Wildcards

SQL LIKE patterns support two wildcards:
1. **`%`** - Matches zero or more characters (like `*` in glob patterns)
2. **`_`** - Matches exactly ONE character (like `?` in glob patterns)

**Note:** SQL uses `_` (underscore), not `?` (question mark) for single-character matching.

### AlaSQL Implementation

Both wildcards are correctly implemented in `src/15utility.js`:

```javascript
// Line 1222-1223: % wildcard
else if (currentChar === '%') {
    regexStr += '[\\s\\S]*';  // Matches any sequence of characters
}

// Line 1226-1227: _ wildcard  
else if (currentChar === '_') {
    regexStr += '.';  // Matches exactly one character
}
```

### Verification Tests

I ran comprehensive tests to verify both wildcards work correctly:

#### Test 1: `%` Wildcard (Multi-character)
```javascript
Pattern: 'App%'
Data: ['Apple', 'Apples', 'Application', 'Cat']
Matches: ['Apple', 'Apples', 'Application'] ✓
```

#### Test 2: `_` Wildcard (Single character)
```javascript
Pattern: '_at'
Data: ['Cat', 'Bat', 'Hat', 'at', 'tats']
Matches: ['Cat', 'Bat', 'Hat'] ✓
```

#### Test 3: Multiple `_` Wildcards
```javascript
Pattern: 'A__'  (A followed by exactly 2 characters)
Data: ['A', 'AB', 'ABC', 'ABCD']
Matches: ['ABC'] ✓
```

#### Test 4: Mix of `%` and `_`
```javascript
Pattern: 'A__%'  (A followed by at least 2 characters)
Data: ['A', 'AB', 'ABC', 'ABCD', 'Apple']
Matches: ['ABC', 'ABCD', 'Apple'] ✓
```

#### Test 5: Case Insensitivity with Wildcards
```javascript
Pattern: 'app%' (lowercase)
Data: ['Apple', 'APPLES', 'application']
Matches: ['Apple', 'APPLES', 'application'] ✓

Pattern: '_AT' (uppercase)
Data: ['cat', 'bat', 'HAT']
Matches: ['cat', 'bat', 'HAT'] ✓
```

### Existing Test Coverage

The wildcards are already tested in the test suite:

**test/test032.js:**
```javascript
// Test with % wildcard
var sql = "SELECT COUNT(a) FROM test32 WHERE a LIKE '4%'";
// Result: 4 (matches 4, 44, 404, 444)

// Test with _ wildcard
var sql = "SELECT a FROM test32 WHERE a LIKE '_4_'";
// Result: 444 (matches any 3-digit number with 4 in middle)

// Test with mixed wildcards
var sql = "SELECT a FROM test32 WHERE a LIKE '%2_4'";
// Result: 1234 (matches numbers ending with 2?4 pattern)
```

**test/test295.js:**
```javascript
SELECT name, price FROM products WHERE name LIKE 'P__ %';
// Pattern: P followed by exactly 2 chars, then space, then anything
```

### Pattern Examples

| Pattern | Regex | Matches | Doesn't Match |
|---------|-------|---------|---------------|
| `A%` | `/^A[\\s\\S]*$/i` | A, AB, Apple, ANYTHING | Banana |
| `%A` | `/^[\\s\\S]*A$/i` | A, BA, PIZZA | AB, Apple |
| `_A` | `/^.A$/i` | BA, CA, 1A | A, AAA |
| `A_` | `/^A.$/i` | AB, A1, AZ | A, ABC |
| `_4_` | `/^.4.$/i` | 444, a4b, X4Y | 4, 44, 404* |
| `%4%` | `/^[\\s\\S]*4[\\s\\S]*$/i` | 4, 444, 1234, a4b | 123, abc |

*Note: '404' does NOT match '_4_' because:
- First character: '4' (matches `_`)
- Second character: '0' (needs to match literal '4') ❌ FAILS
- Third character: '4' (would match `_`)

### Conclusion

✅ **Both wildcards are working correctly:**
- `%` matches zero or more characters
- `_` matches exactly one character
- Both work with case-insensitive matching (the 'i' flag)
- All existing tests pass (2083 passing)

**There is no issue with wildcards in AlaSQL's LIKE implementation.**

### SQL Standard vs Glob Patterns

For reference, different pattern matching systems use different characters:

| System | Multi-char | Single-char |
|--------|------------|-------------|
| **SQL LIKE** | `%` | `_` |
| Glob/Shell | `*` | `?` |
| Regex | `.*` | `.` |

AlaSQL correctly implements SQL LIKE wildcards (`%` and `_`), not glob wildcards (`*` and `?`).
