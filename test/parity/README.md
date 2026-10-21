# Parity check

Does a build behave the same as the reference build, or as the build before this change? The ES6 conversion (`context/roadmap-phase-1.md`, step 0) promises the same behaviour, and the suite alone cannot show that: it has 2,447 passing tests, 213 skipped, and the browser, worker, CLI and ESM paths are hardly covered. The dialect test in `test/dialect/` stays what it is: alasql against SQLite, the reference engine.

```sh
yarn test-parity          # record the reference, record the current build, compare; exit code 1 on any difference
yarn test-parity-smoke    # the smokes, including --pack, on the node in PATH
```

`yarn test-parity` builds `dist/` and runs these three, with two savings: it records the reference only when no recording of it exists (`--if-missing`), and it records the current build with a single suite run (`--once`). When to run what is in `context/roadmap-phase-1.md`, "How much to verify, and when": the suite per commit, parity and the smokes on the tip of a step and after every merge of `develop`, the double run that finds unstable statements (`record new` without `--once`) as the last check of a step, and `git bisect run` when a tip fails. Run the three by hand to use another reference (below):

```sh
bun test/parity/run.js record ref --ref      # the published 4.21.0 in dist/, recorded, then dist/ rebuilt
bun test/parity/run.js record new            # the current dist/
bun test/parity/run.js compare ref new       # exit code 1 on any difference
```

Record the build before a change and the build after it, and compare. When a step claims "no behaviour change", the compare says so or shows the statement that changed.

## The reference

The published 4.21.0 tarball (`--ref`, the default) until a merge of `develop` brings a behaviour fix into the branch. From then on the reference is `develop` at the commit last merged forward, built with its own `build.sh`: `--ref <commit>` takes a sha, a branch or a tag, extracts it with `git archive` under `.ref/` and builds it there once. `--ref <version>` downloads any published version. Otherwise every merged 4.x fix shows up as a difference. The published tarball is not always the build of its tag: 4.20.1 on npm carries a dist built from `develop-a98910ff` that calls itself 4.20.0 (fixed by #2731 for later releases); the recording's `meta` line shows what was really recorded.

After a recording against another dist, `dist/` is rebuilt with the project's `build-only` script, so a new build script is used as soon as it exists.

## Does it catch anything?

Two checks, both run on 2026-10-21:

- **4.20.1 against 4.21.0** (`record old --ref 4.20.1`, `compare old ref`) shows the fixes between the two releases: 76,821 statements aligned, 65 result and 94 error differences, 504 statements with other generated code, 178 statements only in 4.21.0 (a test that fails on 4.20.1 stops before them), API paths 3 only in 4.20.1 and 8 only in 4.21.0. 111 files differ; 43 of the 53 test files added or changed between the releases are among them, and the 10 that are not were changed for `deepStrictEqual`, a restored test, or a performance fix with the same result. One result difference (test815, an xlsx serial date) is the fixed clock, which runs ahead by the number of statements before it and so differs when one build fails tests.
- **A test file that ran tests and recorded no statement fails the compare.** Every test writes a `test` record (from a `beforeEach` in the preload; `Bun.main` is the file). A file with tests and no statement means the hook was missing, unless `silent-files.txt` lists it with the reason (19 files: `alasql.parse` only, utilities only, the CLI in a child process, empty tests). In the first calibration 379 of 532 files recorded nothing in both runs and the compare passed; this is what makes that impossible now. A listed file that does record statements is reported, so the list stays honest.

## What a recording holds

One run of the whole suite (`bun test` with the usual preload plus `record.js`) and then the dialect cases, run twice (see Noise), with every statement in order: the SQL, the parameters, the result or the error, and the source of every function the engine made with `new Function` while the statement ran. Statements are recorded at `alasql.dexec`, which every SQL string reaches, and at `alasql.compile` and the runs of the compiled statement. Beside it: the API surface (`api.js`, every property path reachable from `alasql` with its kind) and the bytes and gzip size of every `dist` file.

Compared in order, grouped by test file, because a statement depends on the ones before it. Results by their text, which keeps what JSON loses: `undefined`, `NaN`, `Date`, class names, key order. Generated code by its text, so a module that compiles differently shows up even when the result is the same. The engine's own functions are not compared; they change when code moves into modules.

Not recorded: the fluent interface (`alasql().From(…)`) and `yy.Select.exec`, which do not pass `dexec`; their generated code is still captured as a `code` record. The CLI test runs in a child process and is not recorded.

## Noise

Two recordings of one build must be identical, and they are: 76,999 statements, 0 differences (2026-10-21). Three things make that so.

- The recorder seeds `Math.random` and fixes the clock. `new Date()` and `Date.now()` give a fixed moment that holds still while a statement runs and moves one millisecond between statements and on reads from test code. Tests that build random data (test055, test056, test142) and tests that write today's date into a file (test815) then record the same values in both runs. Dates made from arguments are untouched.
- `compare.js` normalises the build string, ISO and SQL timestamps, epoch milliseconds, UUIDs and absolute paths. A statement that uses `NOW`, `GETDATE`, `RANDOM`, `NEWID` and friends, or whose parameters hold a `Date`, compares code only and is counted as volatile. Generated code with the same pieces in another order (`REQUIRE` of several files joins them in the order the reads finish) is counted as reordered, not as a difference.
- test1495 and test1889 delete alasql from `require.cache` and load it again. The recorder hooks the new instance from a `beforeEach`, so the files after them are recorded too. Without that, 379 of 532 files recorded no statements.
- A statement with no test frame on the stack (a promise chain, `alasql([...])` in test611, a `REQUIRE` callback) belongs to the file whose tests bun is running, `Bun.main`. Before that, such statements were attributed to the previous file.

Two statements are not deterministic in the engine itself: the dialect cases `SELECT id, mix AS k FROM o UNION SELECT id, mix FROM o2 ORDER BY k DESC, id` and the same with `ORDER BY 2 DESC` sort a column of numbers, strings and `undefined` with a comparator that is not consistent for those pairs, and the runtime's sort then gives one of two orders, run by run, in the same process with the same statements before it (1 and 2 of 10 runs on 2026-10-21, Bun 1.4.3; the other 1,193 corpus statements were the same in all 10). So `record` runs the suite twice and writes the statements whose result or error differed to `<label>.unstable.json`; `compare` compares only their code and counts them as unstable. A recording states its own noise this way, instead of a guess from the SQL text. Two runs catch a statement that flips in 1 of 10 runs only in about one run in five, so a statement seen as unstable is written to `unstable-statements.txt`, which `compare` applies to every recording. `--once` skips the second run.

If the compare of two recordings of one build is not clean, fix the recorder or the normalisation before trusting a compare across builds. `PARITY_DEBUG=1` adds the stack to code records made outside a statement.

## Files

- `run.js`: `record <label> [--ref [<version>|<commit>] | --dist <dir>]` and `compare <a> <b>`. Recordings are in `recordings/`, the downloaded or built references in `.ref/`; both are ignored by git.
- `silent-files.txt`: the test files allowed to run tests without a statement, each with its reason.
- `unstable-statements.txt`: statements the engine answers differently run by run; only their code is compared.
- `api-allowed.txt`: API paths the conversion adds or changes on purpose, each with its reason; the compare reports them as allowed.
- `record.js`: the recorder, loaded by `bun test --preload`. It hooks `alasql.dexec`, `alasql.compile` and `globalThis.Function`.
- `dialect-corpus.js`: runs the dialect cases through alasql under the recorder.
- `compare.js`: aligns and compares two recordings, the API snapshots and the sizes.
- `api.js`: `snapshot [dist]` and `compare a.json b.json`.
- `smoke.js`: the browser global in a `vm` sandbox, the worker file, the CLI, the ESM import, `alasql.min.js` under node, other node binaries (`--node=`), and `--pack`: `npm pack`, install in a temporary folder, then `require`, `import` and the CLI.
- `same-body.js <old alasql.fs.js>`: is the bundled build (`build.js`) the same code as the concatenation `build.sh` made, apart from the wrapper? esbuild prints the code again, so it compares the generated legacy module with the old body, and the old body bundled by esbuild with the new output.
- `ledger.md`: bytes and gzip of every `dist` file per step of the conversion, the benchmark against the previous step, and whether two builds gave the same hashes.

## Not covered

IndexedDB and localStorage in a real browser, React Native, sql.js, Meteor, the browser test runner (`test/browserTestRunner.js`) and `yarn test-perf`. The benchmark is its own check: `bun test/performance/bench.js --json` on both builds and `compare.js` there.
