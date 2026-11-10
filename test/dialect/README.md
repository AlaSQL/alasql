# Dialect test

Runs SQL in alasql and in SQLite and compares the answers ([#2593](https://github.com/AlaSQL/alasql/issues/2593)). SQLite is the reference engine for v5: where the two differ, the difference is either intended and documented, or it is a fault to fix.

```sh
yarn build-only
bun test/dialect/run.js                        # check dist/alasql.fs.js
bun test/dialect/run.js path/to/alasql.fs.js   # check another build
bun test/dialect/run.js --list                 # also print every expected difference
bun test/dialect/run.js --update               # rewrite expected-differences after an intended change
```

It needs Bun: SQLite is `bun:sqlite`, so there is no dependency. It is not part of `bun test`.

## Files

- `fixtures.sql`: the tables. Both engines load them before the cases.
- `cases.sql`: one statement per line. Anyone can add a line. `-- sqlite: <sql>` after a line gives SQLite's spelling of the same question, for a function SQLite names differently (`GREATEST` is `max()` there).
- `matrices/`: one generator per area. Each returns a list of cases built from the dimensions in the area's issue: subqueries ([#2717](https://github.com/AlaSQL/alasql/issues/2717)), set operations ([#2718](https://github.com/AlaSQL/alasql/issues/2718)), ORDER BY ([#2720](https://github.com/AlaSQL/alasql/issues/2720)) and GROUP BY ([#2722](https://github.com/AlaSQL/alasql/issues/2722)). The comment at the top of each file says which cells are not covered yet.
- `expected-differences`: every case where alasql differs from SQLite today, with alasql's answer, SQLite's answer and why. A case without a reviewed reason says "Not reviewed yet."
- `run.js`: runs and compares.

## What passes and what fails

Answers are compared value by value in column order, so column names do not matter. `null` and `undefined` count as the same answer, `true` and `1` too, and numbers equal within rounding. Two errors count as the same answer. Rows of a statement without `ORDER BY` are compared in any order.

A case passes when alasql gives SQLite's answer, or when it is listed in `expected-differences` with exactly the answer alasql gives today. So the test also catches a change in a result that already differs from SQLite: that is what makes it a safety net for refactoring.

It fails when:

- a case differs from SQLite and is not listed;
- a listed case gives another alasql answer than the one recorded;
- a listed case now gives SQLite's answer (remove its entry);
- an entry is no longer a case.

After an intended change, run `--update` and review the diff of `expected-differences`. It keeps every `why`. An entry with `alasql: unstable` is not checked, because alasql's answer for it varies between runs in one process.

SQLite answers depend on the SQLite version (macOS Bun uses the system library; Linux Bun has its own). The version is in the file header. A different SQLite answer is reported as a note, not a failure.
