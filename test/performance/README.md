# Performance benchmark

`bench.js` runs queries against a built `alasql.fs.js` and prints the median time per query. It exists so that a pull request can be measured against `develop` before it is merged, so that the ES6 conversion can be checked against the 4.x baseline, and so that every release on npm can be measured the same way (`historical/`, `results.html`).

## Did develop get slower?

```sh
yarn test-perf                                        # about 7 minutes
yarn test-perf-ci                                     # about 2 minutes: --scale=0.5 --runs=2 --runtime=node --fail-above=105
```

It runs on whatever is in `dist/` (it does not build), downloads the latest release from npm, and runs every group on both builds, interleaved, on Bun and Node. It prints one number: the base build (npm latest) is 100, and the score is 100 times the geometric mean of target time divided by base time over all timed cases. 104 means the target takes about 4 percent longer; below 100 is faster. Below the score it prints the change per runtime and per dimension, and the cases that changed most, so a spike in one dimension shows even when the score barely moves.

How much to trust it, measured with develop against itself: the score moves by about 2, a dimension by up to about 10 percent (some small Bun cases more), single cases by up to 70 percent. So read the score first, then the marked dimensions, then the cases.

Options (see the top of `vs-npm.js`):

- `--base=<path>` and `--target=<path>`: the two builds (defaults: npm latest and `dist/alasql.fs.js`). With `--base` set to develop's build, it checks a PR; with both the same, it shows the noise.
- `--scale=<x>`: multiplies every loop in `bench.js` (0.5 runs half the queries; every case keeps at least 1 query per round and 3 rounds). `bench.js` reports in `queries` how many queries each case timed. Below 1 the score stays reliable but single cases do not, so dimensions are marked only from 25 percent.
- `--runs=<n>` (default 3), `--runtime=bun`, `node` or `bun,node`, `--group=<name>`.
- `--fail-above=<n>`: exit code 1 when the score is above n, for CI. `--json` prints the numbers.

It is not part of CI: on GitHub's shared runners the numbers are too noisy to fail a build on. Run it on a quiet machine.

Most of the time is starting a process per group and building its data, not the loops: 23 groups per build, runtime and run. So `--runs` and `--runtime` save more time than `--scale`.

## Comparing two builds

```sh
yarn build-only
bun test/performance/bench.js                                   # the core cases on the current build
bun test/performance/bench.js --all --json > /tmp/base.json     # every group, each in its own process

# in a worktree with the PR merged and built:
bun test/performance/bench.js path/to/pr/dist/alasql.fs.js --all --json > /tmp/pr.json
bun test/performance/compare.js /tmp/base.json /tmp/pr.json
```

Notes:

- Cases for syntax a build does not have (for example `LET` or `LAG() OVER`) print `n/a` instead of failing, so the same script runs on any branch.
- Numbers vary by machine and runtime; compare builds on the same machine in the same session. Differences under about 5% are noise.
- The script is not part of `bun test`; the test glob only matches `test/test[0-9]*` and `test/test-*`.
- `--group=<name>` runs one group, `--case=<text>` the cases whose name contains the text, and `--list` prints every case with its group.

## Groups

A case runs faster when it is alone in a process than after other cases: the JIT has seen fewer kinds of query. Measured on develop, LIKE and the cached tiny query take a quarter of the time on Bun when they run alone, and ORDER BY with LIMIT, scalar functions and LIKE about half on Node. So numbers only compare when they were measured with the same cases in the same process.

Every case belongs to a group, and each group runs in its own process. `core` holds the ten cases measured on every release since 2026-10-20; keep their order. The other groups are the dimensions below. Compare a case with the other cases of its group and along its own versions, not with a case of another group.

## Dimensions

Each dimension is one file in `dimensions/` (the order is in `dimensions/list.js`). A file holds its data generator, its cases and a short text on what it tests, why it matters and how to read it; `results.html` shows that text behind the `i` on every chart.

| Group              | What it measures                                                                 |
| ------------------ | -------------------------------------------------------------------------------- |
| `set-ops`          | Three-way UNION against UNION ALL, narrow and wide rows                          |
| `subquery`         | IN (subquery), correlated EXISTS and NOT IN with NULLs, against a JOIN           |
| `subquery-derived` | EXISTS over a derived table, the shape of #937, against a JOIN                   |
| `left-join`        | LEFT JOIN with 90 percent unmatched rows, alone and feeding a GROUP BY           |
| `sort`             | Full ORDER BY without LIMIT, one column and three mixed columns                  |
| `group-by`         | 50 against 25,000 groups, three-column keys, COUNT(DISTINCT)                     |
| `compile`          | `alasql.compile()` against ad-hoc calls, and the compile time of a complex query |
| `correlated`       | A correlated scalar subquery for 1,000 and 2,000 outer rows                      |
| `mutation`         | UPDATE and DELETE of 20 percent of the rows, and a scan after DELETE             |
| `boolean`          | The same WHERE with the cheap condition first and last                           |
| `join-chain`       | A four-table join from the selective table and from the largest one              |
| `window`           | ROW_NUMBER and a running SUM over 100 and 5,000 partitions                       |
| `cte`              | A CTE used once and twice, against computing it by hand                          |
| `json-path`        | Arrow paths in nested JSON against flat rows, and SEARCH                         |
| `udf`              | A user function in SELECT and ORDER BY, and how often ORDER BY calls it          |
| `output`           | COLUMN, MATRIX, ROLLUP against UNION ALL of GROUP BYs, and PIVOT                 |
| `index`            | Indexed and unindexed lookups, bulk INSERT and UPDATE                            |
| `constraints`      | Foreign key checks on INSERT, DELETE of referenced rows, an AFTER UPDATE trigger |
| `shapes`           | The same query on objects of one shape and of many shapes                        |
| `coercion`         | A number column compared with a string, and LIKE with several wildcards          |
| `memory`           | A CROSS JOIN of 4 million rows, and SELECT * on 100 columns                      |
| `export`           | CSV into a string and XLSX into a file                                           |

How a dimension is measured (`dimensions/run.js`):

- **Correctness gate.** The first run's answer becomes a digest (row count and a hash of the rows) and is compared with develop's digest in `expected.json`. A build that answers differently did other work, so it is not timed and shows as "wrong answer". After an intended change of an answer, record develop again: `bun test/performance/bench.js --group=<name> --record`.
- **Seeded data and a sink.** Every dimension builds its rows with a seeded generator, so every build and runtime gets the same data, and every answer goes into a sink so the JIT cannot drop the work.
- **Adaptive iterations.** A round takes about 25 ms; a case that is slower than 3 seconds on a build is timed once ("single run"), so a slow old release cannot stall the history. Cases slower than 250 ms get 3 rounds instead of 5.
- **Warm, with one cold case.** Cases run warm, so they measure execution. Compile time has its own cases: the core cases for parse and a tiny cache miss, and `compile: cold compile, complex query` for a large query on one-row tables.
- **Heap.** Cases marked so also record what one run leaves on the heap while its answer is held, in MB, between two full GCs. Node needs `--expose-gc` for it; `history.js`, `vs-npm.js` and `bench.js --all` pass it.

Some sizes are smaller than the plan for these dimensions asked, because develop is too slow at full size: UNION compares every row with every row (#2744), and the correlated EXISTS and scalar subqueries scan the inner table per outer row. The texts of those dimensions say so.

## Historical numbers

`historical/` holds `bench.js --json` output for every release on npm that can run the benchmark, from 0.0.16 to 4.20.1 (198 releases), and for the `develop` baseline, on Bun and on Node. Left out: the three 0.0.1-4.x prereleases and 0.0.3 to 0.0.15, which cannot read `FROM ?`, and 1.7.1, which was published without a build. Versions before 0.2.3 do not run on Bun, so all their Bun values are `null`; a case a version cannot run is `null` too, and `status` says why ("wrong answer", "error: ...", "does not load", "single run"). The files are named `<version>.<runtime>.json` and `develop-<commit>.<runtime>.json`, and `compare.js` reads them directly:

```sh
bun test/performance/compare.js test/performance/historical/develop-787cb25d.bun.json /tmp/pr.json
```

`develop-787cb25d.*.json` is the baseline for the v5 conversion. Every later phase is compared against it.

The core cases in each file are the median of 5 separate `bench.js` runs, with the runs for all builds interleaved; the dimensions use 3 runs. `spread` is (max - min) / median across those runs. `meta.version` is the npm version and `meta.released` its date on npm. `meta.reportedVersion` is what `alasql.version` returns: most releases up to 4.20.1 were built before `yarn version` bumped `package.json`, so they report the previous version. `measured` says when and how each group was measured, when it differs from `meta` (a group added later, or measured again).

Measured on an Apple M1 Pro (8 cores, 16 GB, macOS 15.8.1) with Bun 1.4.3 and Node 22.23.3: the core cases on 2026-10-20 (UTC), the dimensions later (see `measured`). To compare with these files, run on the same machine and runtime. On any other setup, measure a fresh baseline first.

### Adding numbers

`history.js` downloads the releases from npm (into `~/.cache/alasql-history`, outside the repository), runs `bench.js` on them and merges the medians into `historical/`. It leaves every other group in a file as it is. Old releases that miss a dependency get only that module installed, in the version they declare. A release that cannot load on a runtime gets `null` for that runtime.

```sh
# a new dimension on every release and on develop:
node test/performance/history.js run --group=<name> --develop --runs=3
# a new release, every group:
node test/performance/history.js run --versions=new
# measure some versions again:
node test/performance/history.js run --group=core --versions=4.17.0,4.17.1
node test/performance/history.js page   # then rebuild results.html
```

One run of every dimension takes about 30 seconds per build and runtime, so all 198 releases with 3 runs take about 10 hours; the core cases take about 2 hours. Keep the machine idle meanwhile. An interrupted run continues where it stopped when started again with the same options. The options are listed at the top of `history.js`.

`results.html` shows these numbers across releases. Open it in a browser. Everything it shows comes from the JSON block `bench-data` near the end of the file. `history.js page` rebuilds its groups, cases and builds from `historical/` and `bench.js`, and keeps the rest of the block, so titles, stories, method text and case labels are edited in the block itself. Each dimension has its own section; the speed index and the tiles at the top use only the core cases. The `i` on a chart opens it larger with what the case tests, and `results.html#case=<case name>` links to that view. At the bottom, "Copy LLM recap" copies a Markdown summary: the dimensions, their cases and SQL, and the big jumps.
