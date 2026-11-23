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
- `same by the 4.x rule` means the binding says something else, and the 4.x rule of the place gives what today's lookup reads.
- `new difference` means neither the binding nor a 4.x rule gives what today's lookup reads.
- `bind.column or a 4.x rule threw` is an error in the binding itself.

Every outcome but `same` is listed with what each side said and the first reference that gave it.

## What it does not see

- A reference that no test compiles.
- A reference outside a SELECT, such as the SET of an UPDATE or a CHECK constraint. There is no scope there yet.
- `COUNT(*)` and the like. The star is no column reference.

## The 4.x rules

4.x does not read what the binding says in every place. Where it reads something else and queries rely on it, a 4.x rule in `src/engine/bind.js` says what, and `bind.read()` applies the rule of the place the reference stands in. `Column.toJS` hands that reading to `onBind` as well, and the check compares today's lookup with it. Like the binding, the rules only run when `Column.onBind` is set.

| Rule              | When                                                                                                                | What 4.x reads                                                                | Removed by                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `notOuter`        | A bare name that only a SELECT around this one has, in a correlated subquery. Every place                           | the only source of the inner SELECT, where the value is undefined, or nothing | #2644                                                                          |
| `onlyTable`       | A bare name that no source can have, in a SELECT with one source. Every place                                       | that source, and the value is undefined                                       | #3109, and #2878 for an alias of the select list inside an aggregate in HAVING |
| `firstTable`      | A bare name that two tables define, as the argument of a built-in function or in the select list of a grouped query | the first source of FROM, whether it defines the name or not                  | #2928                                                                          |
| `firstWithColumn` | A bare name that two tables define, alone in the select list of a query without grouping                            | the first source that has it                                                  | #2928                                                                          |

In a plain expression an ambiguous name is an error in 4.x too, so there is no rule for it.

`test/test-binding-matrix.js` runs every kind of column name in every place over several shapes of FROM, so that the check and the parity check see names and places that no other test has. `test/test2723-C.js` pins the results of these places with three tables, where the first table of FROM does not define the name.

A bare name in a grouped select list that only a later source has was a bug and is fixed (#3110).

## Places that write their code from the binding

Every column that is compiled inside a SELECT by a caller that passes the scope of the SELECT gets its generated code from the binding, with `bind.read` and `bind.write`. That is `Column.toJS` in `src/expression/expression.js` (`boundJS`), for WHERE, ON, expressions, group keys, aggregate arguments and the arguments of a built-in function, and `columnJS` in `src/select/columns.js` for a column alone in a select list, grouped or not. There the binding runs on every compile, not only in the test mode. Today's lookup stays as the fallback for what the binding does not write yet (`_`, a group, a column of an outer SELECT, a name that is unresolved or ambiguous after the rules) and for the case that the binding throws, so a mistake in it can not break a query.

In the test mode such a place runs the lookup as well and hands both codes to `onBind`. The check fails unless they are the same text, and the outcome says whether the code was written from the binding or fell back.

## When it fails

The exit code is 1 in these cases.

- `bind.column()` or a 4.x rule threw.
- The code a place wrote from the binding is not the code of today's lookup.
- Today's lookup reads something else than the binding with the 4.x rule of the place applied. Then either the change is wrong, or a new test compiles a reference that 4.x reads in a way no rule describes. Such a case has to be decided, and gets a rule in `bind.js` with the issue that removes it, before the check passes again.
- No reference was compared, which means `Column.onBind` is not called any more.
- The suite run crashed.

A failing test of the suite does not fail this check. The test job does that.
