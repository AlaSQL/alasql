# Source map of the ES6 conversion

One row per numbered file that has moved (`context/roadmap.md`, "The source map"): where its code lives now, what the module exports, and what the wrap added. A fix made against the old file on `develop` is redone in the module this table names when the merge cannot carry it. The body of a moved file keeps its indentation until the end of Phase 1, so git sees the move; the similarity column is `git diff -M --stat` between the file before the move and the module after the wrap.

| Old file | Module | Exports | Installed | Added by the wrap | Similarity |
| --- | --- | --- | --- | --- | --- |
| `src/10start.js` | `src/engine/create.js` | `create()`: makes the alasql object (the main function, `version`, `build`, `debug`) | first; the UMD wrapper is written by `build.js` | the UMD head taken out; `export function create() {` and `return alasql`; the fluent interface reads `alasql.yy` instead of `yy`, because the object exists before the yy module is installed (3 lines) | 88% (the UMD head and the 3 lines on a 126-line file) |
| `src/17alasql.js` | `src/engine/core.js` | `install(alasql)`: the parser hookup, `parse`, the registries (`databases`, `engines`, `options`, `from`, `into`, `fn`, `aggr`, ...), `use`, `autoval`, `exec`, `dexec`, `drun`, `adrun`, `compile` | second, before the legacy module | `import makeParser from '../generated/parser.js'` and `var alasqlparser = makeParser(alasql)`: the grammar actions read `alasql.options`, `alasql.fn`, `alasql.aggr` and call `doubleq`, so the parser is made for the alasql object (see `build.js`, `parserModule`); `alasql.private.schemaChanged = schemaChanged` for the seven legacy files that call it | 98% |
| `src/28yy.js` | `src/engine/yy.js` | `install(alasql)`: the `yy` namespace of the syntax tree classes with `Base` and `compileParamValue`, set on `alasql.yy` and on the parser | third, after core and before the legacy module | `var alasqlparser = alasql.parser` | 95% |
| `src/15utility.js` | `src/utils/helpers.js` (the `utils` object, the string helpers, the array and object helpers, `like`, `glob`, `typeConverter`), `src/utils/env.js` (environment detection, `findAlaSQLPath`, `alasql.path`), `src/utils/fileio.js` (`cutbom`, `loadFile`, `loadBinaryFile`, `removeFile`, `deleteFile`, `autoExtFilename`, `fileExists`, `saveFile`), `src/utils/xlsx.js` (`getXLSX`) | `install(alasql)` each; the helpers also put `returnTrue`, `n2u` and `und` on `alasql.private` | helpers, env, fileio, xlsx after yy, before the legacy module | helpers: the wrapper and the three `alasql.private` lines; the others: see their rows | helpers 46%, so git does not see the move: a `develop` fix to `15utility.js` is a modify/delete conflict in the merge and is redone by hand in the module this row names (three such fixes since 4.20.0, all in `like`); `git merge -X find-renames=40%` carries it into `helpers.js` |
| `src/16comments.js` | `src/utils/uncomment.js` | `install(alasql)`: `alasql.utils.uncomment` | after xlsx, before the legacy module | the wrapper only | 98% |
| `src/25queryclass.js` | `src/data/query.js` | `install(alasql, internal)`: the `Query` and `Recordset` classes, set on `alasql` | after uncomment, before the legacy module | the wrapper only | 92% |
| `src/39dojoin.js` | `src/select/dojoin.js` | `install(alasql, internal)`: `doJoin` and `swapSources`; `internal.doJoin = doJoin` | after query | the wrapper and the `internal` line | 98% |
| `src/38query.js` | `src/select/queryfn.js` | `install(alasql, internal)`: `queryfn`, `queryfn2`, `queryfn3`, `doDistinct`, `doLimit`, `preIndex`; `internal.queryfn = queryfn` | after dojoin | `import {arrayUnionDeep, arrayExceptDeep, arrayIntersectDeep, cloneDeep, hash} from '../utils/helpers.js'`; `var yy = alasql.yy`, `var doJoin = internal.doJoin`, `var flatArray = alasql.utils.flatArray`; the `internal` line | 98% |
| `src/18promise.js` | `src/engine/promise.js` | `install(alasql)`: `alasql.promise` and the global `Promise` check | after the legacy module, which makes `utils` | `var utils = alasql.utils` | 96% |

## How one module reaches another's internals (decided 2026-10-22, step 4)

Every `install` takes a second parameter, `internal`: an object made in `src/index.js` beside the instance and passed to every install, the generated legacy module included. A module puts what other modules need on it (`internal.doJoin = doJoin`); a module installed later reads it at install (`var doJoin = internal.doJoin`). Where two modules need each other, the later one reads `internal.x` at the call instead. Nothing is added to the alasql object. The names that went on `alasql.private` before the decision (`schemaChanged`, `returnTrue`, `n2u`, `und`, `getXLSX`) move to `internal` in a follow-up; `alasql.private.externalXlsxLib` stays, it is in 4.21.0.

Plain imports are for stateless helpers the old code used by bare name, as `src/utils/helpers.js` exports them; a call through `alasql.utils.x` stays as it is, because a user's override of that function reaches the engine today.

38query.js and 39dojoin.js are step 6 files by the roadmap, converted early in step 4 because they hold the internals the mechanism was decided on.

Still in the legacy module: every file in `src/legacy.list`, in that order, wrapped by `build.js` into `src/generated/legacy.js` as `install(alasql)`.

Names the legacy files reach by bare name from converted modules (`tools/free-variables.js`), and how the legacy module binds them:

| Name | Declared by | Bound as |
| --- | --- | --- |
| `alasql` | `src/engine/create.js` | the `install(alasql)` parameter |
| `yy` | `src/engine/yy.js` | `var yy = alasql.yy` |
| `utils`, `cloneDeep`, `hash`, `extend`, `escapeq`, `deepEqual`, `distinctArray`, `arrayExceptDeep`, `arrayIntersectDeep`, `arrayUnionDeep`, `flatArray`, `arrayIntersect`, `arrayDiff`, `arrayUnion`, `escapeqq` | `src/utils/helpers.js` | `var utils = alasql.utils` and `var name = utils.name` (`escapeqq` is `utils.undoubleq`) |
| `returnTrue`, `n2u`, `und` | `src/utils/helpers.js` | `var name = alasql.private.name` |
| `schemaChanged` | `src/engine/core.js` | `var schemaChanged = alasql.private.schemaChanged` |
| `Query` | `src/data/query.js` | `var Query = alasql.Query` |
| `queryfn` | `src/select/queryfn.js` | `var queryfn = internal.queryfn` |

A converted module that needs the parser binds `var alasqlparser = alasql.parser` (yy.js); core.js makes it.

Bindings are `var`, not `const`: V8 checks a `const` of an enclosing scope for initialisation at every access from an inner function, and `yy` is read in every compile. Measured with the benchmark against the step 1 build: compile 10 to 25 percent slower on Node with `const` bindings, 10 percent faster with `var` (`test/parity/ledger.md`).

The generated parser (`src/alasqlparser.js`, jison output, unchanged) is wrapped by `build.js` into `src/generated/parser.js` as `makeParser(alasql)`, with a forwarder for every utility the grammar calls by bare name (`doubleq`), because the parser is made before the utilities are installed.
