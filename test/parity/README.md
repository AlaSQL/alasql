# Parity check

Does a build behave the same as the published 4.21.0, or as the build before this change? The ES6 conversion (`context/roadmap-phase-1.md`, step 0) promises the same behaviour, and the suite alone cannot show that: it has 2,447 passing tests, 213 skipped, and the browser, worker, CLI and ESM paths are hardly covered. The reference is the published tarball, not a branch. The dialect test in `test/dialect/` stays what it is: alasql against SQLite, the reference engine.

```sh
yarn build-only
bun test/parity/run.js record ref --ref      # the published 4.21.0 in dist/, recorded, then dist/ rebuilt
bun test/parity/run.js record new            # the current dist/
bun test/parity/run.js compare ref new       # exit code 1 on any difference
node test/parity/smoke.js --node=$(which node)
```

Record the build before a change and the build after it, and compare. When a step claims "no behaviour change", the compare says so or shows the statement that changed.

## What a recording holds

One run of the whole suite (`bun test` with the usual preload plus `record.js`) and then the dialect cases, with every statement in order: the SQL, the parameters, the result or the error, and the source of every function the engine made with `new Function` while the statement ran. Statements are recorded at `alasql.dexec`, which every SQL string reaches, and at `alasql.compile` and the runs of the compiled statement. Beside it: the API surface (`api.js`, every property path reachable from `alasql` with its kind) and the bytes and gzip size of every `dist` file.

Compared in order, grouped by test file, because a statement depends on the ones before it. Results by their text, which keeps what JSON loses: `undefined`, `NaN`, `Date`, class names, key order. Generated code by its text, so a module that compiles differently shows up even when the result is the same. The engine's own functions are not compared; they change when code moves into modules.

Not recorded: the fluent interface (`alasql().From(…)`) and `yy.Select.exec`, which do not pass `dexec`; their generated code is still captured as a `code` record. The CLI test runs in a child process and is not recorded.

## Noise

Two recordings of one build must be identical, and they are: 76,999 statements, 0 differences (2026-10-21). Three things make that so.

- The recorder seeds `Math.random` and fixes the clock. `new Date()` and `Date.now()` give a fixed moment that holds still while a statement runs and moves one millisecond between statements and on reads from test code. Tests that build random data (test055, test056, test142) and tests that write today's date into a file (test815) then record the same values in both runs. Dates made from arguments are untouched.
- `compare.js` normalises the build string, ISO and SQL timestamps, epoch milliseconds, UUIDs and absolute paths. A statement that uses `NOW`, `GETDATE`, `RANDOM`, `NEWID` and friends, or whose parameters hold a `Date`, compares code only and is counted as volatile. Generated code with the same pieces in another order (`REQUIRE` of several files joins them in the order the reads finish) is counted as reordered, not as a difference.
- test1495 and test1889 delete alasql from `require.cache` and load it again. The recorder hooks the new instance from a `beforeEach`, so the files after them are recorded too. Without that, 379 of 532 files recorded no statements.

If the compare of two recordings of one build is not clean, fix the recorder or the normalisation before trusting a compare across builds. `PARITY_DEBUG=1` adds the stack to code records made outside a statement.

## Files

- `run.js`: `record <label> [--ref | --dist <dir>]` and `compare <a> <b>`. Recordings are in `recordings/`, the downloaded reference in `.ref/`; both are ignored by git.
- `record.js`: the recorder, loaded by `bun test --preload`. It hooks `alasql.dexec`, `alasql.compile` and `globalThis.Function`.
- `dialect-corpus.js`: runs the dialect cases through alasql under the recorder.
- `compare.js`: aligns and compares two recordings, the API snapshots and the sizes.
- `api.js`: `snapshot [dist]` and `compare a.json b.json`.
- `smoke.js`: the browser global in a `vm` sandbox, the worker file, the CLI, the ESM import, `alasql.min.js` under node, other node binaries (`--node=`), and `--pack`: `npm pack`, install in a temporary folder, then `require`, `import` and the CLI.

## Not covered

IndexedDB and localStorage in a real browser, React Native, sql.js, Meteor, the browser test runner (`test/browserTestRunner.js`) and `yarn test-perf`. The benchmark is its own check: `bun test/performance/bench.js --json` on both builds and `compare.js` there.
