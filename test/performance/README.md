# Performance benchmark

`bench.js` runs a fixed set of queries against a built `alasql.fs.js` and prints the median time per query. It exists so that a pull request can be measured against `develop` before it is merged, and so that the ES6 conversion can be checked against the 4.x baseline.

```sh
yarn build-only
bun test/performance/bench.js                                   # current build
bun test/performance/bench.js --json > /tmp/base.json

# in a worktree with the PR merged and built:
bun test/performance/bench.js path/to/pr/dist/alasql.fs.js --json > /tmp/pr.json
bun test/performance/compare.js /tmp/base.json /tmp/pr.json
```

Notes:

- Cases for syntax a build does not have (for example `LET` or `LAG() OVER`) print `n/a` instead of failing, so the same script runs on any branch.
- Numbers vary by machine and runtime; compare builds on the same machine in the same session. Differences under about 5% are noise.
- The script is not part of `bun test`; the test glob only matches `test/test[0-9]*` and `test/test-*`.
- `--group=<name>` runs one group of cases, `--case=<text>` the cases whose name contains the text, and `--list` prints the cases with their groups.

## Groups

A case runs faster when it is alone in a process than after other cases: the JIT has seen fewer kinds of query. Measured on develop, LIKE and the cached tiny query take a quarter of the time on Bun when they run alone, and ORDER BY with LIMIT, scalar functions and LIKE about half on Node. So numbers only compare when they were measured with the same cases in the same process.

Every case in `bench.js` belongs to a group, and `history.js` runs each group in its own process. The cases in `historical/` since 2026-10-20 are the group `core`; keep their order. A new case gets its own group by default (the group name is the case name), so it runs alone. Compare a case only along its own versions, not with a case of another group.

## Historical numbers

`historical/` holds `bench.js --json` output for every release on npm that can run the benchmark, from 0.0.16 to 4.20.1 (198 releases), and for the `develop` baseline, on Bun and on Node. Left out: the three 0.0.1-4.x prereleases and 0.0.3 to 0.0.15, which cannot read `FROM ?`, and 1.7.1, which was published without a build. Versions before 0.2.3 do not run on Bun, so all their Bun values are `null`; a case a version cannot run is `null` too. The files are named `<version>.<runtime>.json` and `develop-<commit>.<runtime>.json`, and `compare.js` reads them directly:

```sh
bun test/performance/compare.js test/performance/historical/develop-787cb25d.bun.json /tmp/pr.json
```

`develop-787cb25d.*.json` is the baseline for the v5 conversion. Every later phase is compared against it.

Each file is the median of 5 separate `bench.js` runs, with the runs for all builds interleaved. `spread` is (max - min) / median across those runs. `meta.version` is the npm version and `meta.released` its date on npm. `meta.reportedVersion` is what `alasql.version` returns: most releases up to 4.20.1 were built before `yarn version` bumped `package.json`, so they report the previous version. `measured` says when and how each group was measured, when it differs from `meta` (a group added later, or measured again).

Measured 2026-10-20 (UTC) on an Apple M1 Pro (8 cores, 16 GB, macOS 15.8.1) with Bun 1.4.3 and Node 22.23.3. To compare with these files, run on the same machine and runtime. On any other setup, measure a fresh baseline first.

### Adding numbers

`history.js` downloads the releases from npm (into `~/.cache/alasql-history`), runs `bench.js` on them and merges the medians into `historical/`. It leaves every other group in a file as it is. Old releases that miss a dependency get only that module installed. A release that cannot load on a runtime gets `null` for that runtime.

```sh
# a new case (here with the group "union 100k") on every release and on develop:
node test/performance/history.js run --group="union 100k" --develop
# a new release, every group:
node test/performance/history.js run --versions=new
# measure some versions again:
node test/performance/history.js run --group=core --versions=4.17.0,4.17.1
node test/performance/history.js page   # then rebuild results.html
```

All 198 releases take about 20 minutes per group with a fast case (5 runs, both runtimes); keep the machine idle meanwhile. An interrupted run continues where it stopped when started again with the same options. The options are listed at the top of `history.js`.

`results.html` shows these numbers across releases. Open it in a browser. Everything it shows comes from the JSON block `bench-data` near the end of the file. `history.js page` rebuilds its cases and builds from `historical/` and keeps the rest of the block, so titles, stories, method text and case labels are edited in the block itself. A case from a group other than `core` gets a note on its chart and is left out of the index. At the bottom, "Copy LLM recap" copies a Markdown summary: the cases, their SQL and the big jumps.
