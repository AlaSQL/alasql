# Source map of the ES6 conversion

One row per numbered file that has moved (`context/roadmap.md`, "The source map"): where its code lives now, what the module exports, and what the wrap added. A fix made against the old file on `develop` is redone in the module this table names when the merge cannot carry it. The body of a moved file keeps its indentation until the end of Phase 1, so git sees the move; the similarity column is `git diff -M --stat` between the file before the move and the module after the wrap.

| Old file | Module | Exports | Installed | Added by the wrap | Similarity |
| --- | --- | --- | --- | --- | --- |
| `src/10start.js` | `src/engine/create.js` | `create()`: makes the alasql object (the main function, `version`, `build`, `debug`) | first; the UMD wrapper is written by `build.js` | the UMD head taken out; `export function create() {` and `return alasql`; the fluent interface reads `alasql.yy` instead of `yy`, because the object exists before the yy module is installed (3 lines) | 88% (the UMD head and the 3 lines on a 126-line file) |

Still in the legacy module: every file in `src/legacy.list`, in that order, wrapped by `build.js` into `src/generated/legacy.js` as `install(alasql)`.

Names the legacy files reach by bare name from converted modules (`tools/free-variables.js`), and how the legacy module binds them:

| Name | Declared by | Bound as |
| --- | --- | --- |
| `alasql` | `src/engine/create.js` | the `install(alasql)` parameter |
