# Ledger of the conversion

One row per step of `context/roadmap-phase-1.md`: the size of every `dist` file in bytes and gzip (`run.js record` writes them to `recordings/<label>.sizes.json`), whether two builds in a row gave the same hashes (`build.js` prints a sha256 per file), and the benchmark against the previous row (`bun test/performance/vs-npm.js --base=<previous dist/alasql.fs.js> --target=dist/alasql.fs.js`; 100 is the previous build, develop against itself moves by about 2). `alasql-echo.js`, `alasql-prolog.js` and `alasql.d.ts` are copied and left out.

| Step | Commit | Built with | alasql.fs.js | alasql.js | alasql.min.js | alasql-worker.js | precompile/index.js | Same hashes twice | Benchmark |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 4.21.0, the reference | 38bf3c39 | build.sh | 840,681 / 167,149 | 840,681 / 167,158 | 520,504 / 113,536 | 3,950 / 1,888 | 4,656 / 1,671 | yes; the tarball on npm is the same file apart from the build string | 100, the base |
| 1. Bun build, zero files converted | cdff98f0 | build.js, Bun 1.4.3 | 895,182 / 134,258 | 890,572 / 133,798 | 523,895 / 113,127 | 4,093 / 1,924 | 5,446 / 1,811 | yes | 99 (Bun 98, Node 99) against 4.21.0, 3 runs, 172 cases; set-ops and coercion 19 and 11 percent faster on Bun, driven by single cases |
| 1b. esbuild instead of Bun.build, zero files converted | fix/bun-build | build.js, esbuild 0.28.2 | {f('alasql.fs.js')} | {f('alasql.js')} | {f('alasql.min.js')} | {f('alasql-worker.js')} | {f('precompile/index.js')} | yes | not run |

Notes

- Step 1: Bun prints the code again without comments and with its own indentation, so the unminified files are larger in bytes and smaller gzipped. The minified browser file grows by 0.65 percent, the worker by 143 bytes, the precompile module by Bun's CommonJS helpers.
- Step 1b: the maintainer chose esbuild (pinned in `yarn.lock`) over Bun.build (a binary outside the lockfile). `alasql.min.js` is 1,623 bytes over the 4.21.0 file: the ES module entry, the parser as its own module and the `install()` wrapper. The unminified files carry esbuild's `__name` calls (keepNames), which keep the `.name` of four functions and classes that esbuild would otherwise suffix.
