# Binding check

Does `bind.column()` name the same source as today's lookup? This is the check for the column binding of #2723.

A column reference is matched to a source while the JavaScript of a query is written, in `Column.toJS`. The plan of #2723 is a binding step that says once, for every reference, which source and which column it means, and code that only reads that. The binding is worked out already (`bind.scope` and `bind.column` in `src/engine/bind.js`), beside today's lookup, and is used nowhere yet. This check compares the two for every column reference that the suite compiles inside a SELECT.

```sh
yarn test-bind                  # build, run the suite, print the outcomes
bun test/bind/run.js            # the same on the dist folder as it is
bun test/bind/run.js --json     # the outcomes as JSON
```

## How it works

`Column.toJS` calls `bind.column()` for the scope of the SELECT that is being compiled, and then does today's lookup. When `alasql.yy.Column.onBind` is set, it is called with both. Nothing sets it outside this check.

`record.js` is a preload for `bun test` that sets it. It reads today's answer from the code the lookup wrote, and compares it with the binding. `run.js` runs the suite with the preload and counts the outcomes.

- `same` means the same source, or the same list of sources where the source is decided per row.
- `no source today` means the code reads the context itself, a group or the result row, so today's lookup named no source and there is nothing to compare.
- `differ` is listed with what each side said and the first reference that gave it.

## What it does not see

- A reference that no test compiles.
- A reference outside a SELECT, such as the SET of an UPDATE or a CHECK constraint. There is no scope there yet.
- `COUNT(*)` and the like. The star is no column reference.

## Reading the outcomes

The differences are the cases where today's lookup and the rules of `bind.column()` do not agree. They are listed in the pull request that added the check, and the next step of #2723 decides each of them before the generated code reads the binding. Until then the check reports them and does not fail.
