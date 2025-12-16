# LIKE Pattern Case-Sensitivity Investigation

This directory contains the findings from investigating the LIKE operator case-sensitivity issue.

## Documents

1. **ISSUE_SUMMARY.md** - Quick summary of findings and recommendations
2. **LIKE_CASE_SENSITIVITY_FINDINGS.md** - Detailed technical analysis

## Quick Answer

**Question:** Is AlaSQL's case-insensitive LIKE operator a bug?

**Answer:** NO. It's working as designed and matches MySQL/SQL Server behavior.

**Recommendation:** Document the behavior clearly. No code changes needed now.

## For Maintainers

Based on the instruction "We don't want to make breaking changes for now", the recommendation is:

**SHORT TERM (This Issue):**
- Close as "Working as Intended" 
- Add documentation clarifying that LIKE is case-insensitive in AlaSQL
- Explain this matches MySQL and SQL Server default behavior

**LONG TERM (Future v5.0+):**
- Consider adding a configuration option: `alasql.options.caseSensitiveLike`
- Create a new feature request issue for this enhancement
- Would allow users to choose behavior without breaking existing code

## Test Evidence

All 2083 tests pass with current case-insensitive implementation.
136+ test cases rely on case-insensitive LIKE behavior.

See documents for full details.
