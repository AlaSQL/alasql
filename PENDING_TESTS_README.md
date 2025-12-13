# Pending Tests Analysis - Usage Guide

## Overview

This directory contains analysis documents for the 401 pending tests in the AlaSQL test suite. These documents help prioritize which tests to enable based on their impact on SQL-99 compliance.

## Files

### 1. PENDING_TESTS_ANALYSIS.md
**Format:** Markdown
**Use Case:** Human-readable comprehensive report

This document provides:
- Executive summary of all pending tests
- Tests grouped by theme/category
- Priority levels (1-7) for each category
- Impact assessment (CRITICAL, HIGH, MEDIUM, LOW)
- SQL-99 features covered by each category
- Detailed breakdown by test file
- Implementation strategy recommendations
- Summary statistics

### 2. pending_tests_analysis.csv
**Format:** CSV (Comma-Separated Values)
**Use Case:** Data analysis, spreadsheet tracking, filtering

Columns:
- `Category` - The theme/category of the test
- `Priority` - Numeric priority (1=highest, 7=lowest)
- `Impact` - Impact level (CRITICAL, HIGH, MEDIUM, LOW)
- `Test File` - The test file name (e.g., test259.js)
- `Test Description` - The test description from `it()` or `describe.skip()`
- `Describe Context` - The parent `describe()` block name
- `Line Number` - Line number in the test file
- `SQL-99 Features` - SQL-99 features this test covers

## Quick Start

### View the Analysis
```bash
# Read the markdown report
cat PENDING_TESTS_ANALYSIS.md | less

# Or open in your preferred editor
code PENDING_TESTS_ANALYSIS.md
```

### Work with CSV Data
```bash
# View in terminal
column -t -s',' pending_tests_analysis.csv | less -S

# Open in spreadsheet software
libreoffice pending_tests_analysis.csv
# or
open pending_tests_analysis.csv  # macOS with Excel

# Filter to high priority tests
grep ",HIGH," pending_tests_analysis.csv

# Count tests by priority
cut -d',' -f2 pending_tests_analysis.csv | sort | uniq -c
```

## Prioritization Guide

### Phase 1: SQL-99 Compliance (Priority 1)
**Count:** 6 tests | **Impact:** CRITICAL

Start here! These tests verify standard SQL syntax compliance:
- SQL logic tests (test259.js, test260.js)
- Standard SQL operators (test341.js)

### Phase 2: Essential SQL Features (Priority 2)
**Count:** 73 tests | **Impact:** HIGH

Core SQL functionality that most applications rely on:
- Constraints & Foreign Keys (39 tests)
- Set Operations: UNION, INTERSECT, EXCEPT (21 tests)
- Joins: FULL OUTER JOIN, CROSS JOIN (13 tests)

### Phase 3: Standard SQL Extensions (Priority 3-4)
**Count:** 85 tests | **Impact:** MEDIUM

Important but less critical SQL features:
- Advanced features: CTEs, PIVOT/UNPIVOT (55 tests)
- Triggers (1 test)
- Output formats (22 tests)
- Data types & functions (7 tests)

### Phase 4: Non-Standard & Optimization (Priority 5-7)
**Count:** 223 tests | **Impact:** LOW

Vendor-specific extensions and optimizations:
- Graph & Search extensions (88 tests)
- Storage engines (44 tests)
- Performance tests (12 tests)
- Edge cases & other (79 tests)

## How to Enable a Pending Test

1. **Locate the test file** using the analysis documents
2. **Open the test file** in your editor
3. **Find the skipped test** (search for `it.skip` or `describe.skip`)
4. **Change** `it.skip` to `it` or `describe.skip` to `describe`
5. **Run the test** to see if it passes:
   ```bash
   # Run specific test file
   yarn test-only -- test/test259.js
   
   # Or run all tests
   yarn test
   ```
6. **If it fails:**
   - Investigate why it's failing
   - Implement the missing feature
   - Or update the test if expectations are wrong
7. **Commit your changes** when the test passes

## Example Workflow

```bash
# 1. Start with Priority 1 tests
grep "^SQL Standards" pending_tests_analysis.csv

# 2. Enable first test in test259.js
vi test/test259.js
# Change line 18: it.skip('1. Sqllogic' -> it('1. Sqllogic'

# 3. Run the test
yarn test-only -- test/test259.js

# 4. If it passes, commit
git add test/test259.js
git commit -m "Enable test259.js: Sqllogic test"

# 5. Move to next test
```

## Updating the Analysis

If you enable tests or add new ones, regenerate the analysis:

```bash
# Run the analysis script (if provided)
node scripts/analyze_pending_tests.js

# Or manually update the markdown/CSV files
```

## Tips

1. **Start with Priority 1-2** tests for maximum SQL-99 compliance impact
2. **Group related tests** - enable all tests in a file at once if they're related
3. **Check for dependencies** - some tests may depend on features tested elsewhere
4. **Document issues** - if a test can't be enabled, document why in the test file
5. **Update analysis** - periodically regenerate to track progress

## Statistics

Last updated: 2025-12-13

For detailed statistics by priority, see the "Summary by Priority" table in [PENDING_TESTS_ANALYSIS.md](./PENDING_TESTS_ANALYSIS.md).

Quick summary:
- **Priority 1 (CRITICAL):** 6 tests (1.6%)
- **Priority 2 (HIGH):** 73 tests (18.9%)
- **Priority 3-4 (MEDIUM):** 85 tests (22.0%)
- **Priority 5-7 (LOW):** 223 tests (57.6%)
- **Total:** 387 unique test definitions (401 pending tests reported by Mocha)

## Questions?

For questions about specific tests or priorities, please:
1. Check the test file comments
2. Review the PENDING_TESTS_ANALYSIS.md document
3. Open an issue on GitHub with the test file and line number
