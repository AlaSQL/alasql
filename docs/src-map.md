# Source map of the ES6 conversion

One row per numbered file that has moved (`context/roadmap.md`, "The source map"): where its code lives now, what the module exports, and what the wrap added. A fix made against the old file on `develop` is redone in the module this table names when the merge cannot carry it. The body of a moved file keeps its indentation until the end of Phase 1, so git sees the move; the similarity column is `git diff -M --stat` between the file before the move and the module after the wrap.

| Old file | Module | Exports | Installed | Added by the wrap | Similarity |
| --- | --- | --- | --- | --- | --- |
| `src/10start.js` | `src/engine/create.js` | `create()`: makes the alasql object (the main function, `version`, `build`, `debug`) | first; the UMD wrapper is written by `build.js` | the UMD head taken out; `export function create() {` and `return alasql`; the fluent interface reads `alasql.yy` instead of `yy`, because the object exists before the yy module is installed (3 lines) | 88% (the UMD head and the 3 lines on a 126-line file) |
| `src/17alasql.js` | `src/engine/core.js` | `install(alasql)`: the parser hookup, `parse`, the registries (`databases`, `engines`, `options`, `from`, `into`, `fn`, `aggr`, ...), `use`, `autoval`, `exec`, `dexec`, `drun`, `adrun`, `compile` | second, before the legacy module | `import makeParser from '../generated/parser.js'` and `const alasqlparser = makeParser(alasql)`: the grammar actions read `alasql.options`, `alasql.fn`, `alasql.aggr` and call `doubleq`, so the parser is made for the alasql object (see `build.js`, `parserModule`); `alasql.private.schemaChanged = schemaChanged` for the seven legacy files that call it | 98% |
| `src/28yy.js` | `src/engine/yy.js` | `install(alasql)`: the `yy` namespace of the syntax tree classes with `Base` and `compileParamValue`, set on `alasql.yy` and on the parser | third, after core and before the legacy module | `const alasqlparser = alasql.parser` | 95% |

Still in the legacy module: every file in `src/legacy.list`, in that order, wrapped by `build.js` into `src/generated/legacy.js` as `install(alasql)`.

Names the legacy files reach by bare name from converted modules (`tools/free-variables.js`), and how the legacy module binds them:

| Name | Declared by | Bound as |
| --- | --- | --- |
| `alasql` | `src/engine/create.js` | the `install(alasql)` parameter |
| `yy` | `src/engine/yy.js` | `const {yy} = alasql` |
| `schemaChanged` | `src/engine/core.js` | `const {schemaChanged} = alasql.private` |

A converted module that needs the parser binds `const alasqlparser = alasql.parser` (yy.js); core.js makes it.

The generated parser (`src/alasqlparser.js`, jison output, unchanged) is wrapped by `build.js` into `src/generated/parser.js` as `makeParser(alasql)`, with a forwarder for every utility the grammar calls by bare name (`doubleq`), because the parser is made before the utilities are installed.
