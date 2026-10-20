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
