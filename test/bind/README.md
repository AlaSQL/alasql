# Binding check

Does `bind.column()` name the same source as today's lookup? This is the check for the column binding of #2723.

A column reference is matched to a source while the JavaScript of a query is written, in `Column.toJS`. The plan of #2723 is a binding step that says once, for every reference, which source and which column it means, and code that only reads that. The rules of the binding are written already (`bind.scope` and `bind.column` in `src/engine/bind.js`), and the generated code does not read it yet. So a query does not work it out. Only this check does, and it compares the binding with today's lookup for every column reference that the suite compiles inside a SELECT. It runs in CI as the job "Binding check of column references".

```sh
yarn test-bind                  # build, run the suite, print the outcomes
bun test/bind/run.js            # the same on the dist folder as it is
bun test/bind/run.js --json     # the outcomes as JSON
```

## How it works

When `alasql.yy.Column.onBind` is set, `Column.toJS` calls `bind.column()` for the scope of the SELECT that is being compiled, then does today's lookup, and calls `onBind` with both. The select list in `src/select/columns.js` does the same for a column that stands alone. Without `onBind` neither calls `bind.column()`. Nothing sets it outside this check and `test/test2723-B.js`. An error thrown by `bind.column()` is caught and handed to `onBind`, so it can not change what a test sees.

`record.js` is a preload for `bun test` that sets it. It reads today's answer from the code the lookup wrote, and compares it with the binding. `run.js` runs the suite with the preload and counts the outcomes.

- `same` means the same source, or the same list of sources where the source is decided per row.
- `no source today` means the code reads the context itself, a group or the result row, so today's lookup named no source and there is nothing to compare.
- `known case` is a difference that is one of the six cases below.
- `new difference` is any other difference.
- `bind.column threw` is an error in the binding itself.

Every outcome but `same` is listed with what each side said and the first reference that gave it.

## What it does not see

- A reference that no test compiles.
- A reference outside a SELECT, such as the SET of an UPDATE or a CHECK constraint. There is no scope there yet.
- `COUNT(*)` and the like. The star is no column reference.

## The known cases

These are the cases where today's lookup and the rules of `bind.column()` do not agree. The next step of #2723 decides each of them before the generated code reads the binding. `knownCase` in `record.js` holds the rule for each.

| Case | What it is                                                                                                                  | Today           | Binding                |
| ---- | --------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------- |
| 1a   | A bare name that the only table does not define                                                                             | that table      | unresolved             |
| 1b   | The same, where the name is an alias of the select list inside an aggregate in HAVING (#2878)                               | that table      | unresolved             |
| 2a   | A bare name that two tables define, as the argument of a function                                                           | the first table | ambiguous              |
| 2b   | The same, alone in the select list                                                                                          | the first table | ambiguous              |
| 2c   | The same, in the select list of a query with GROUP BY                                                                       | the first table | ambiguous              |
| 3    | A bare name in the select list of a query with GROUP BY, where the first table does not define it and another source has it | the first table | the source that has it |

The check sees the reference, its scope and the SQL text. It reads the alias of 1b and the function call of 2a from the text.

## When it fails

The exit code is 1 in these cases.

- `bind.column()` threw.
- A difference is not one of the known cases. Then either the change is wrong, or a new test compiles a reference that today's lookup and the binding answer differently. Such a case has to be decided, and listed here and in `knownCase`, before the check passes again.
- No reference was compared, which means `Column.onBind` is not called any more.
- The suite run crashed.

A failing test of the suite does not fail this check. The test job does that.
