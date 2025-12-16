# LIKE Pattern Case-Sensitivity Investigation

## Executive Summary

**The issue's claims are PARTIALLY CORRECT:**
- ✅ AlaSQL's LIKE operator is **case-insensitive** (confirmed)
- ⚠️ "Most SQL implementations" have case-**sensitive** LIKE (PARTIALLY true - varies by database)

## Current AlaSQL Behavior (Confirmed)

All LIKE variants in AlaSQL are **case-insensitive**:
- `LIKE` - case-insensitive
- `NOT LIKE` - case-insensitive  
- `ILIKE` - case-insensitive (PostgreSQL extension)
- `NOT ILIKE` - case-insensitive
- `~~` - case-insensitive (PostgreSQL operator)
- `~~*` - case-insensitive (PostgreSQL operator)
- `!~~` - case-insensitive (NOT LIKE)
- `!~~*` - case-insensitive (NOT LIKE)

**Implementation:** In `/home/runner/work/alasql/alasql/src/15utility.js`, line 1242, the regex is compiled with the `'i'` flag:
```javascript
patternCache[pattern] = RegExp(regexStr, 'i');  // 'i' flag makes it case-insensitive
```

**Parser Mapping:** In `/home/runner/work/alasql/alasql/src/alasqlparser.jison`:
- All variants (`ILIKE`, `~~`, `~~*`) map to the same `LIKE` token
- They all use the same `alasql.utils.like()` function

## Standard SQL Database Behavior

### Case-SENSITIVE by Default (Oracle, PostgreSQL without ILIKE)
**PostgreSQL:**
- `LIKE` is **case-sensitive**
- `ILIKE` is **case-insensitive** (PostgreSQL extension)
- Example: `'Apple' LIKE 'app%'` → `FALSE`
- Example: `'Apple' ILIKE 'app%'` → `TRUE`

**Oracle:**
- `LIKE` is **case-sensitive**
- Must use `UPPER()` or `LOWER()` for case-insensitive matching
- Example: `'Apple' LIKE 'app%'` → `FALSE`
- Example: `UPPER('Apple') LIKE UPPER('app%')` → `TRUE`

### Case-INSENSITIVE by Default (MySQL, SQL Server, SQLite)
**MySQL/MariaDB:**
- `LIKE` is **case-insensitive** with default collations (e.g., `utf8_general_ci`)
- Can be case-sensitive with binary collations (e.g., `utf8_bin`)
- Example with `utf8_general_ci`: `'Apple' LIKE 'app%'` → `TRUE`

**Microsoft SQL Server:**
- `LIKE` is typically **case-insensitive** (depends on collation)
- Most common collations are case-insensitive (e.g., `SQL_Latin1_General_CP1_CI_AS`)
- Example: `'Apple' LIKE 'app%'` → `TRUE` (with CI collation)

**SQLite:**
- `LIKE` is **case-insensitive** for ASCII characters (A-Z)
- `LIKE` is **case-sensitive** for non-ASCII characters
- `GLOB` is always case-sensitive
- Example: `'Apple' LIKE 'app%'` → `TRUE`

## Current Test Coverage

**Total tests:** 2083 passing
**LIKE usage in tests:** 136 occurrences across test files

**Key test files:**
- `test/test032.js` - LIKE, NOT LIKE and aliases (assumes case-insensitive)
- `test/test244.js` - Explicitly named "Case-insensitive LIKE" (tests current behavior)
- `test/test036.js`, `test/test198.js`, `test/test310.js` - Various LIKE uses

**Test Assumptions:**
The existing tests **expect and rely on case-insensitive behavior**. For example, in `test/test244.js`:
```javascript
var data = [{a: 'two'}, {a: 'THREE'}];
var res = alasql('SELECT b FROM ? WHERE a LIKE "T%"', [data]);
assert.deepEqual(res, [{b: 'second'}, {b: 'THIRD'}]);  // Matches both 'two' and 'THREE'
```

## Breaking Change Analysis

**IF we change LIKE to be case-sensitive:**

### PROS:
1. ✅ Aligns with PostgreSQL and Oracle (most standards-compliant databases)
2. ✅ More predictable behavior for users coming from these databases
3. ✅ Provides a semantic difference between `LIKE` and `ILIKE`

### CONS:
1. ❌ **BREAKING CHANGE** - Will break existing user code
2. ❌ Requires updating all 136+ test cases
3. ❌ Diverges from MySQL/SQL Server behavior (which many users may expect)
4. ❌ Current test suite explicitly validates case-insensitive behavior
5. ❌ AlaSQL has been case-insensitive since inception - users rely on this

## Recommendations

Given the instruction: "We don't want to make breaking changes for now, if something was working before, we will fix it."

### Option 1: KEEP CURRENT BEHAVIOR (Recommended)
**Status Quo:**
- Keep `LIKE` as case-insensitive
- Document this behavior clearly
- This is **NOT** broken - it works as designed and matches MySQL/SQL Server

**Rationale:**
1. Current behavior is consistent and well-tested
2. Matches popular databases (MySQL, SQL Server, SQLite for ASCII)
3. No user code breaks
4. The issue's claim that "most SQL implementations" are case-sensitive is misleading - MySQL and SQL Server (very popular) are case-insensitive by default

### Option 2: ADD CONFIGURATION OPTION (Future Enhancement)
**For a future major version**, consider adding:
```javascript
alasql.options.caseSensitiveLike = false; // default: keep current behavior
```

This would allow users to opt-in to case-sensitive behavior without breaking existing code.

### Option 3: MAKE ILIKE DISTINCT (Low Impact Change)
Since `ILIKE` is already supposed to be explicitly case-insensitive in PostgreSQL:
- Keep `LIKE` as case-insensitive (current behavior)
- Keep `ILIKE` as case-insensitive (no change)
- Document that both are case-insensitive in AlaSQL

This maintains backward compatibility while being honest about behavior.

## Detailed Implementation Guide (If Change Needed in Future)

If in a future major version we decide to make LIKE case-sensitive:

### Changes Required:

1. **Update `/home/runner/work/alasql/alasql/src/15utility.js`** (line 1242):
   ```javascript
   // Current (case-insensitive):
   patternCache[pattern] = RegExp(regexStr, 'i');
   
   // Change to (case-sensitive):
   patternCache[pattern] = RegExp(regexStr);
   ```

2. **Add separate function for ILIKE** in same file:
   ```javascript
   var ilike = (utils.ilike = function (pattern, value, escape = '') {
       // Use the existing like() function but force case-insensitive
       return like(pattern, value, escape); // Could use 'i' flag version
   });
   ```

3. **Update `/home/runner/work/alasql/alasql/src/50expression.js`** (line 360-361):
   ```javascript
   // Add handling for ILIKE separately from LIKE
   } else if (this.op === 'LIKE' || this.op === 'NOT LIKE') {
       s = `(${this.op === 'NOT LIKE' ? '!' : ''}alasql.utils.like(${rightJS()}, ${leftJS()}${this.escape ? `, ${ref(this.escape)}` : ''}))`;
   } else if (this.op === 'ILIKE' || this.op === 'NOT ILIKE') {
       s = `(${this.op === 'NOT ILIKE' ? '!' : ''}alasql.utils.ilike(${rightJS()}, ${leftJS()}${this.escape ? `, ${ref(this.escape)}` : ''}))`;
   ```

4. **Update parser** to distinguish ILIKE from LIKE (create separate tokens)

5. **Update ALL test files** (136+ occurrences) to:
   - Use `ILIKE` where case-insensitive matching is desired
   - Use exact case matches with `LIKE`
   - Or wrap columns/patterns with `UPPER()` or `LOWER()`

6. **Add migration guide** for users

## Conclusion

**Current Status:** AlaSQL's LIKE is case-insensitive and **this is working as designed**.

**Recommendation:** **NO CHANGES NEEDED NOW**. The current behavior:
- Is well-documented in tests
- Matches popular databases (MySQL, SQL Server, SQLite)
- Is not "wrong" - just different from PostgreSQL/Oracle
- Would be breaking to change

**Future Consideration:** For a major version release (v5.0+), consider adding a configuration option to let users choose case-sensitive or case-insensitive behavior, with clear documentation about the default.

## Testing Evidence

Run this test to verify current behavior:
```bash
node test_like_behavior.js
```

All 2083 existing tests pass with current implementation:
```bash
yarn test
# 2083 passing (7s)
```
