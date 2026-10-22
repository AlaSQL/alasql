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
| `src/20database.js` | `src/data/database.js` | `install(alasql, internal)`: the `Database` class, set on `alasql` | after query | the wrapper only | 98% |
| `src/23table.js` | `src/data/table.js` | `install(alasql, internal)`: the `Table` class, set on `alasql` | after database | the wrapper only | 96% |
| `src/24view.js` | `src/data/view.js` | `install(alasql, internal)`: the `View` class, set on `alasql` | after table | the wrapper only | 91% |
| `src/21transaction.js` | `src/data/transaction.js` | `install(alasql, internal)`: the `Transaction` class, set on `alasql` | after view | `var schemaChanged = internal.schemaChanged` | 94% |
| `src/55functions.js` | `src/functions/functions.js` | `install(alasql)`: the function node `yy.FuncValue`, `alasql.stdlib`, `alasql.stdfn`, the aggregates; exports `re_invalidFnNameChars` | after transaction | `import {und} from '../utils/helpers.js'`; `var yy = alasql.yy` | 98% |
| `src/61date.js` | `src/functions/date.js` | `install(alasql)`: the date functions on `alasql.stdfn`; exports `newDate` and `dateRegexp` | after functions | `var stdfn = alasql.stdfn` | 93% |
| `src/50expression.js` | `src/expression/expression.js` | `install(alasql)`: the expression classes and their compilers | after date | `import {escapeq, returnTrue} from '../utils/helpers.js'`, `import {re_invalidFnNameChars} from '../functions/functions.js'`; `var yy = alasql.yy` | 99% |
| `src/57case.js` | `src/expression/case.js` | `install(alasql)`: `yy.CaseValue` | after expression | `var yy = alasql.yy` | 96% |
| `src/58json.js` | `src/expression/json.js` | `install(alasql, internal)`: `yy.Json`; `internal.JSONtoJS`, `internal.JSONtoString` (they read `yy`) | after case | `var yy = alasql.yy`; the two `internal` lines | 93% |
| `src/59convert.js` | `src/expression/convert.js` | `install(alasql)`: `yy.Convert` and the CONVERT function | after json | `import {newDate} from '../functions/date.js'`; `var yy = alasql.yy` | 98% |
| `src/40select.js` | `src/select/select.js` | `install(alasql, internal)`: `yy.Select` and its compile and execute; `internal.modify` | after queryfn | `var Query = alasql.Query`, `var queryfn = internal.queryfn`, `var yy = alasql.yy`; the `internal` line | 99% |
| `src/41exists.js` | `src/select/exists.js` | `install(alasql)`: EXISTS | after select | `var yy = alasql.yy` | 95% |
| `src/420from.js` | `src/select/from.js` | `install(alasql, internal)`: the FROM compile; `internal.subqueryDatafn` | after exists | `import {returnTrue} from '../utils/helpers.js'`; `var yy = alasql.yy`; the `internal` line | 97% |
| `src/421join.js` | `src/select/join.js` | `install(alasql, internal)`: the JOIN compile | after from | `import {returnTrue, arrayIntersect} from '../utils/helpers.js'`; `var subqueryDatafn = internal.subqueryDatafn`, `var yy = alasql.yy` | 97% |
| `src/422where.js` | `src/select/where.js` | `install(alasql)`: the WHERE compile and the join optimisation | after join | `var yy = alasql.yy` | 99% |
| `src/43rollup.js` | `src/select/rollup.js` | `install(alasql, internal)`: ROLLUP, CUBE, GROUPING SETS; `internal.decartes` | after where | `import {escapeq} from '../utils/helpers.js'`; `var yy = alasql.yy`; the `internal` line | 95% |
| `src/423groupby.js` | `src/select/groupby.js` | `install(alasql, internal)`: the GROUP BY compile | after rollup | `import {arrayDiff, arrayUnion} from '../utils/helpers.js'`; `var decartes = internal.decartes`, `var yy = alasql.yy` | 99% |
| `src/424select.js` | `src/select/columns.js` | `install(alasql)`: the column list compile | after groupby | `import {cloneDeep, escapeq, n2u} from '../utils/helpers.js'`; `var yy = alasql.yy` | 99% |
| `src/425having.js` | `src/select/having.js` | `install(alasql)`: the HAVING compile | after columns | `var yy = alasql.yy` | 93% |
| `src/426orderby.js` | `src/select/orderby.js` | `install(alasql)`: the ORDER BY compile | after having | `var yy = alasql.yy` | 98% |
| `src/427pivot.js` | `src/select/pivot.js` | `install(alasql)`: PIVOT and UNPIVOT | after orderby | `import {cloneDeep} from '../utils/helpers.js'`; `var yy = alasql.yy` | 98% |
| `src/44defcols.js` | `src/select/defcols.js` | `install(alasql)`: the default columns | after pivot | `var yy = alasql.yy` | 97% |
| `src/45union.js` | `src/select/union.js` | `install(alasql)`: the set operations | after defcols | `var yy = alasql.yy` | 80% |
| `src/46apply.js` | `src/select/apply.js` | `install(alasql)`: APPLY | after union | `var yy = alasql.yy` | 83% |
| `src/47over.js` | `src/select/window.js` | `install(alasql)`: OVER | after apply | `var yy = alasql.yy` | 86% |
| `src/52linq.js` | `src/select/linq.js` | `install(alasql)`: the fluent interface | after window | `import {hash} from '../utils/helpers.js'`; `var yy = alasql.yy` | 97% |
| `src/30statements.js` | `src/engine/statements.js` | `install(alasql)`: `yy.Statements` | after yy | `var yy = alasql.yy` | 89% |
| `src/35search.js` | `src/graph/search.js` | `install(alasql, internal)`: `yy.Search` | after linq | `import {cloneDeep, distinctArray} from '../utils/helpers.js'`; `var yy = alasql.yy`, `var modify = internal.modify` | 99% |
| `src/60createtable.js` | `src/statements/createtable.js` | `install(alasql, internal)`: `yy.ColumnDef`, `yy.CreateTable`; `internal.indexColumnToJS` (it reads `yy`) | after search | `import {cloneDeep, hash} from '../utils/helpers.js'`; `var schemaChanged = internal.schemaChanged`, `var yy = alasql.yy`; the `internal` line | 99% |
| `src/62droptable.js` | `src/statements/droptable.js` | `install(alasql, internal)`: DROP TABLE and TRUNCATE TABLE | after createtable | `var schemaChanged = internal.schemaChanged`, `var yy = alasql.yy` | 95% |
| `src/63createvertex.js` | `src/graph/create.js` | `install(alasql)`: CREATE VERTEX, CREATE EDGE and CREATE GRAPH | after droptable | `import {extend} from '../utils/helpers.js'`; `var yy = alasql.yy` | 98% |
| `src/64altertable.js` | `src/statements/altertable.js` | `install(alasql, internal)`: ALTER TABLE | after graph/create | `var schemaChanged = internal.schemaChanged`, `var yy = alasql.yy` | 97% |
| `src/65createindex.js` | `src/statements/createindex.js` | `install(alasql, internal)`: CREATE INDEX and REINDEX | after altertable | `import {hash} from '../utils/helpers.js'`; `var schemaChanged = internal.schemaChanged`, `var yy = alasql.yy`, `var indexColumnToJS = internal.indexColumnToJS` | 93% |
| `src/66dropindex.js` | `src/statements/dropindex.js` | `install(alasql)`: DROP INDEX | after createindex | `var yy = alasql.yy` | 85% |
| `src/67withselect.js` | `src/statements/with.js` | `install(alasql)`: WITH (a commented-out CREATE VIEW execute and DROP VIEW stay in the file) | after dropindex | `var yy = alasql.yy`, `var Table = alasql.Table` | 98% |
| `src/68if.js` | `src/statements/if.js` | `install(alasql)`: IF | after with | `var yy = alasql.yy` | 94% |
| `src/69while.js` | `src/statements/while.js` | `install(alasql)`: WHILE, BEGIN END, BREAK and CONTINUE | after if | `var yy = alasql.yy` | 98% |
| `src/70insert.js` | `src/statements/insert.js` | `install(alasql, internal)`: INSERT | after while | `import {cloneDeep} from '../utils/helpers.js'`; `var yy = alasql.yy`, `var JSONtoJS = internal.JSONtoJS` | 98% |
| `src/71trigger.js` | `src/statements/trigger.js` | `install(alasql)`: CREATE TRIGGER and DROP TRIGGER | after insert | `var yy = alasql.yy` | 98% |
| `src/72delete.js` | `src/statements/delete.js` | `install(alasql)`: DELETE | after trigger | `import {cloneDeep} from '../utils/helpers.js'`; `var yy = alasql.yy` | 98% |
| `src/74update.js` | `src/statements/update.js` | `install(alasql)`: UPDATE and `yy.SetColumn` | after delete | `import {cloneDeep} from '../utils/helpers.js'`; `var yy = alasql.yy` | 97% |
| `src/75merge.js` | `src/statements/merge.js` | `install(alasql)`: MERGE | after update | `var yy = alasql.yy` | 94% |
| `src/76usedatabase.js` | `src/statements/databases.js` | `install(alasql, internal)`: CREATE, ATTACH, DETACH, USE and DROP DATABASE | after merge | `var schemaChanged = internal.schemaChanged`, `var yy = alasql.yy` | 97% |
| `src/77declare.js` | `src/statements/declare.js` | `install(alasql)`: DECLARE | after databases | `var yy = alasql.yy` | 96% |
| `src/78show.js` | `src/statements/show.js` | `install(alasql)`: SHOW | after declare | `var yy = alasql.yy` | 98% |
| `src/79set.js` | `src/statements/set.js` | `install(alasql)`: SET | after show | `var yy = alasql.yy` | 97% |
| `src/81commit.js` | `src/statements/commit.js` | `install(alasql)`: BEGIN, COMMIT and ROLLBACK TRANSACTION | after set | `var yy = alasql.yy` | 95% |
| `src/FileSaver.js` | `src/utils/filesaver.js` | `install(alasql, internal)`: FileSaver's `saveAs`, inside the same `if (utils.isBrowser && !utils.isWebWorker)` block that 97saveas.js opens in the legacy module, and the `alasql.utils.saveAs = saveAs` registration that 98finish.js held; `internal.saveAs` | after uncomment | `var utils = alasql.utils`; the `if` line, the registration and the closing brace; the `internal` line | 96% |
| `src/12pretty.js` | `src/console/pretty.js` | `install(alasql)`: `alasql.pretty`, `alasql.prettyflag` | after commit | nothing beyond the wrapper | 92% |
| `src/80console.js` | `src/console/console.js` | `install(alasql, internal)`: `alasql.con`, the console output | after pretty | `var utils = alasql.utils`, `var JSONtoString = internal.JSONtoString` | 98% |
| `src/821tsql.js` | `src/dialects/tsql.js` | `install(alasql)`: `OBJECT_ID` under `alasql.options.tsql` | after console | nothing beyond the wrapper | 95% |
| `src/822mysql.js` | `src/dialects/mysql.js` | `install(alasql)`: under `alasql.options.mysql` | after tsql | nothing beyond the wrapper | 95% |
| `src/823postgres.js` | `src/dialects/postgres.js` | `install(alasql)`: an empty `if (alasql.options.postgres)` | after mysql | nothing beyond the wrapper; two lines, under git's rename threshold, so git shows a deleted and a new file | stub |
| `src/824oracle.js` | `src/dialects/oracle.js` | `install(alasql)`: an empty `if (alasql.options.oracle)` | after postgres | as postgres.js | stub |
| `src/825sqlite.js` | `src/dialects/sqlite.js` | `install(alasql)`: an empty `if (alasql.options.sqlite)` | after oracle | as postgres.js | stub |
| `src/830into.js` | `src/formats/into.js` | `install(alasql)`: INTO SQL, TXT, TAB, CSV, JSON and HTML | after sqlite | `import {escapeqq} from '../utils/helpers.js'` | 98% |
| `src/831xls.js` | `src/formats/xls.js` | `install(alasql)`: INTO XLS | after into | `import {extend} from '../utils/helpers.js'` | 98% |
| `src/832xlsxml.js` | `src/formats/xlsxml.js` | `install(alasql)`: INTO XLSXML | after xls | `import {extend, hash} from '../utils/helpers.js'` | 99% |
| `src/833xlsx.js` | `src/formats/xlsx.js` | `install(alasql, internal)`: INTO XLSX | after xlsxml | `import {deepEqual} from '../utils/helpers.js'`; `var utils = alasql.utils`, `var getXLSX = internal.getXLSX`, `var saveAs = internal.saveAs` | 96% |
| `src/84from.js` | `src/formats/from.js` | `install(alasql, internal)`: FROM CSV, TXT, TAB, JSON, XLS, XLSX, HTML, FILE and the rest | after xlsx | `var getXLSX = internal.getXLSX` | 99% |
| `src/843xml.js` | `src/formats/xml.js` | `install(alasql)`: XML | after from | nothing beyond the wrapper | 98% |
| `src/844gexf.js` | `src/formats/gexf.js` | `install(alasql)`: GEXF | after xml | nothing beyond the wrapper | 83% |
| `src/86print.js` | `src/statements/print.js` | `install(alasql, internal)`: PRINT | after gexf | `var yy = alasql.yy`, `var JSONtoString = internal.JSONtoString` | 92% |
| `src/87source.js` | `src/statements/source.js` | `install(alasql)`: SOURCE | after print | `var yy = alasql.yy` | 89% |
| `src/88require.js` | `src/statements/require.js` | `install(alasql)`: REQUIRE | after source | `var yy = alasql.yy` | 96% |
| `src/89assert.js` | `src/statements/assert.js` | `install(alasql)`: ASSERT | after require | `import {deepEqual} from '../utils/helpers.js'`; `var yy = alasql.yy` | 83% |
| `src/91indexeddb.js` | `src/storage/indexeddb.js` | `install(alasql)`: the IndexedDB engine | after assert | nothing beyond the wrapper | 99% |
| `src/92localstorage.js` | `src/storage/localstorage.js` | `install(alasql)`: the localStorage engine | after indexeddb | `import {extend} from '../utils/helpers.js'` | 99% |
| `src/93sqljs.js` | `src/storage/sqljs.js` | `install(alasql)`: the sql.js engine | after localstorage | `var yy = alasql.yy` | 98% |
| `src/94filestorage.js` | `src/storage/filestorage.js` | `install(alasql, internal)`: the file storage engine | after sqljs | `import {extend} from '../utils/helpers.js'`; `var schemaChanged = internal.schemaChanged`, `var loadFile = alasql.utils.loadFile` | 97% |
| `src/99worker.js` | `src/worker/launcher.js` | `install(alasql)`: `alasql.worker`; installed by `src/index.js` under the condition of 97saveas.js, and called by the worker bundle between its head and tail | before finish, under `if (instance.utils.isBrowser && !instance.utils.isWebWorker)` | the wrapper | 97% |
| `src/99worker-start.js` | `src/worker/start.js` | the head of the worker bundle: the UMD head, the proxy `alasql` function, its promise interface; still concatenated by `build.js` (`src/generated/worker.js`), not a module | - | nothing | 100% |
| `src/99worker-finish.js` | `src/worker/finish.js` | the tail of the worker bundle; concatenated as above | - | nothing | 100% |
| `src/98finish.js` | `src/engine/finish.js` | `install(alasql)`: the browser warning and the default database | after every other module, before promise | `var utils = alasql.utils`, `var Database = alasql.Database`; the `};` of 97saveas.js and the UMD tail taken out, by hand (the codemod cuts a head, not a tail); CRLF endings kept | 77% |
| `src/97saveas.js` | removed in step 9 | its `if (utils.isBrowser && !utils.isWebWorker)` is written out in `src/index.js` around the launcher install; `src/utils/filesaver.js` has its own copy since step 8 | - | - | - |
| `src/05copyright.js` | `src/copyright.js` | the banner `build.js` puts at the top of every dist file; not a module | - | nothing | 100% |
| `src/56sprintf.js, src/826orientdb.js, src/839zip.js, src/85help.js` | removed in step 9 | no build included them (not in build.sh); last touched 2018 to 2022 | - | - | - |
| `src/18promise.js` | `src/engine/promise.js` | `install(alasql)`: `alasql.promise` and the global `Promise` check | after the legacy module, which makes `utils` | `var utils = alasql.utils` | 96% |

## How one module reaches another's internals (decided 2026-10-22, step 4)

Every `install` takes a second parameter, `internal`: an object made in `src/index.js` beside the instance and passed to every install, the generated legacy module included. A module puts what other modules need on it (`internal.doJoin = doJoin`); a module installed later reads it at install (`var doJoin = internal.doJoin`). Where two modules need each other, the later one reads `internal.x` at the call instead. Nothing is added to the alasql object. The names that went on `alasql.private` before the decision (`schemaChanged`, `returnTrue`, `n2u`, `und`, `getXLSX`) move to `internal` in a follow-up; `alasql.private.externalXlsxLib` stays, it is in 4.21.0.

Plain imports are for stateless helpers the old code used by bare name, as `src/utils/helpers.js` exports them; a call through `alasql.utils.x` stays as it is, because a user's override of that function reaches the engine today.

38query.js and 39dojoin.js are step 6 files by the roadmap, converted early in step 4 because they hold the internals the mechanism was decided on; the other sixteen followed in step 6. Step 7 put the statements under `src/statements/`, the graph statements (SEARCH, CREATE VERTEX) under `src/graph/`, and `yy.Statements` beside `yy` in `src/engine/`. Step 8 put the console and `alasql.pretty` under `src/console/`, the dialect files under `src/dialects/`, INTO and FROM with the spreadsheet, XML and GEXF code under `src/formats/`, PRINT, SOURCE, REQUIRE and ASSERT under `src/statements/`, the storage engines under `src/storage/`, and FileSaver.js under `src/utils/`; after it the legacy module held 97saveas.js (the browser-only `if`), 99worker.js and 98finish.js. Step 9 converted those, removed the legacy generator with its tools, and left no numbered file in `src/`.

Nothing is left in a legacy module: `src/legacy.list` and the generator in `build.js` went in step 9. The worker bundle is still a concatenation of `src/worker/start.js`, a call of the launcher module and `src/worker/finish.js` (`src/generated/worker.js`), because its head assigns undeclared names and was never strict.

Names the legacy files reached by bare name from converted modules (listed by `tools/free-variables.js`, removed with the generator in step 9), and how the legacy module binds them:

| Name | Declared by | Bound as |
| --- | --- | --- |
| `alasql` | `src/engine/create.js` | the `install(alasql)` parameter |
| `yy` | `src/engine/yy.js` | `var yy = alasql.yy` |
| `utils`, `cloneDeep`, `hash`, `extend`, `escapeq`, `deepEqual`, `distinctArray`, `arrayExceptDeep`, `arrayIntersectDeep`, `arrayUnionDeep`, `flatArray`, `arrayIntersect`, `arrayDiff`, `arrayUnion`, `escapeqq` | `src/utils/helpers.js` | `var utils = alasql.utils` and `var name = utils.name` (`escapeqq` is `utils.undoubleq`) |
| `escapeq`, `returnTrue`, `n2u`, `und` | `src/utils/helpers.js` | `import {escapeq, returnTrue, n2u, und} from '../utils/helpers.js'` (stateless, exported since step 5) |
| `modify` | `src/select/select.js` | `var modify = internal.modify` (35search.js until step 7) |
| `indexColumnToJS` | `src/statements/createtable.js` | `var indexColumnToJS = internal.indexColumnToJS` (65createindex.js until step 7) |
| `extend`, `distinctArray` | `src/utils/helpers.js` | on the same import line (stateless, exported since step 7) |
| `escapeqq` | `src/utils/helpers.js` | on the same import line (stateless, exported since step 8; it is `utils.undoubleq`) |
| `saveAs` | `src/utils/filesaver.js` | `var saveAs = internal.saveAs` (833xlsx.js until step 8); `src/utils/fileio.js` keeps its forwarder, since it installs first |
| `getXLSX` | `src/utils/xlsx.js` | `var getXLSX = internal.getXLSX` (833xlsx.js and 84from.js until step 8) |
| `loadFile` | `src/utils/fileio.js` | `var loadFile = alasql.utils.loadFile` (94filestorage.js until step 8), read once at install as the legacy module did |
| `arrayUnion`, `arrayDiff`, `arrayIntersect` | `src/utils/helpers.js` | on the same import line (stateless, exported since step 6) |
| `JSONtoJS`, `JSONtoString` | `src/expression/json.js` | `var JSONtoJS = internal.JSONtoJS`, `var JSONtoString = internal.JSONtoString` |
| `schemaChanged` | `src/engine/core.js` | `var schemaChanged = internal.schemaChanged` |
| `Query` | `src/data/query.js` | `var Query = alasql.Query` |
| `Database`, `Table` | `src/data/database.js`, `src/data/table.js` | `var Database = alasql.Database`, `var Table = alasql.Table` |
| `queryfn` | `src/select/queryfn.js` | `var queryfn = internal.queryfn` |

A converted module that needs the parser binds `var alasqlparser = alasql.parser` (yy.js); core.js makes it.

Bindings are `var`, not `const`: V8 checks a `const` of an enclosing scope for initialisation at every access from an inner function, and `yy` is read in every compile. Measured with the benchmark against the step 1 build: compile 10 to 25 percent slower on Node with `const` bindings, 10 percent faster with `var` (`test/parity/ledger.md`).

The generated parser (`src/alasqlparser.js`, jison output, unchanged) is wrapped by `build.js` into `src/generated/parser.js` as `makeParser(alasql)`, with a forwarder for every utility the grammar calls by bare name (`doubleq`), because the parser is made before the utilities are installed.
