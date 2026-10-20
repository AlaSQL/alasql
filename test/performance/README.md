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

## Historical numbers

`historical/` holds `bench.js --json` output for the latest patch of every minor release on npm, from 0.0.51 to 4.20.1, and for the `develop` baseline, on Bun and on Node. Versions before 0.2 do not run on Bun, so all their Bun values are `null`. The files are named `<version>.<runtime>.json` and `develop-<commit>.<runtime>.json`, and `compare.js` reads them directly:

```sh
bun test/performance/compare.js test/performance/historical/develop-787cb25d.bun.json /tmp/pr.json
```

`develop-787cb25d.*.json` is the baseline for the v5 conversion. Every later phase is compared against it.

Each file is the median of 5 separate `bench.js` runs, with the runs for all builds interleaved. `spread` is (max - min) / median across those runs. `meta.version` is the npm version. `meta.reportedVersion` is what `alasql.version` returns: most releases up to 4.20.1 were built before `yarn version` bumped `package.json`, so they report the previous version.

Measured 2026-10-20 (UTC) on an Apple M1 Pro (8 cores, 16 GB, macOS 15.8.1) with Bun 1.4.3 and Node 22.23.3. To compare with these files, run on the same machine and runtime. On any other setup, measure a fresh baseline first.

`results.html` shows these numbers across releases. Open it in a browser. Everything it shows comes from the JSON block `bench-data` near the end of the file; to update the page, replace that block.
