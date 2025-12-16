# Issue Summary: LIKE Pattern Case-Sensitivity

## Claim Verification

**Issue Claim:** "In AlaSQL the LIKE pattern is case-insensitive, but that's not true for most SQL implementations."

**Finding:** The claim is **PARTIALLY CORRECT**.

### Part 1: AlaSQL's LIKE is case-insensitive ✅ CONFIRMED
```javascript
// Test evidence:
alasql('SELECT * FROM ? WHERE name LIKE ?', [[{name: 'Apple'}], 'app%']);
// Result: [{name: 'Apple'}]  ← Matches despite case difference
```

All LIKE variants are case-insensitive:
- `LIKE`, `NOT LIKE`, `ILIKE`, `NOT ILIKE`
- `~~`, `~~*`, `!~~`, `!~~*` (PostgreSQL operators)

**Implementation:** Line 1242 in `src/15utility.js` uses `RegExp(regexStr, 'i')` with case-insensitive flag.

### Part 2: "Most SQL implementations" are case-sensitive ⚠️ MISLEADING

**Case-Sensitive Databases:**
- PostgreSQL (LIKE only; ILIKE is case-insensitive)
- Oracle

**Case-Insensitive Databases:**
- MySQL/MariaDB (with default collations)
- Microsoft SQL Server (with default collations)
- SQLite (for ASCII characters)

**Reality:** The behavior is **split** across popular databases. Saying "most" are case-sensitive is not accurate when MySQL and SQL Server (very popular) default to case-insensitive.

## Is This a Bug?

**NO.** This is working as designed. AlaSQL's behavior matches:
- MySQL's default behavior
- SQL Server's typical behavior
- SQLite's ASCII behavior

## Should We Change It?

**NO - Not now.** Per the agent instructions:
> "We don't want to make breaking changes for now, if something was working before, we will fix it."

**Why not change:**
1. ❌ **Breaking change** - 136+ LIKE usages in tests expect case-insensitive
2. ❌ Existing user code relies on this behavior
3. ❌ Test file `test/test244.js` is explicitly named "Case-insensitive LIKE"
4. ✅ Current behavior matches MySQL/SQL Server (popular databases)
5. ✅ All 2083 tests pass with current implementation

## What Needs to Be Done

### For This Issue (Now):
**Document the behavior** - Make it clear in documentation that:
1. AlaSQL's `LIKE` operator is case-insensitive
2. This matches MySQL and SQL Server default behavior
3. For case-sensitive matching, users should:
   - Use exact comparisons: `column = 'exact'`
   - Or use helper functions: `UPPER(column) = UPPER(pattern)`
4. All LIKE variants (`ILIKE`, `~~`, etc.) behave the same (case-insensitive)

### For Future Major Release (v5.0+):
**Consider adding a configuration option:**
```javascript
alasql.options.caseSensitiveLike = false; // default: backward compatible
```

This would allow users to opt-in to case-sensitive behavior without breaking existing code.

## Detailed Findings

See `LIKE_CASE_SENSITIVITY_FINDINGS.md` for:
- Detailed database behavior comparison
- Test coverage analysis
- Implementation details
- Migration guide for future changes

## Test Results

Current implementation: **All 2083 tests passing**
```bash
yarn test
# 2083 passing (7s)
```

Verification script:
```bash
node test_like_behavior.js
```

## Conclusion

**Status:** Working as designed, no fix needed.

**Action:** Close issue as "Won't Fix" or "Working as Intended" with explanation, or create a documentation task to clarify the behavior.

**Future Enhancement:** Create a new issue for adding a configuration option in a future major version (v5.0+) to support both case-sensitive and case-insensitive modes.
