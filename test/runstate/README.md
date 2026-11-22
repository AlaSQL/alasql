# Run-state check

Which code writes to a compiled query while a statement runs? This is the check of #2596.

A compiled SELECT keeps one `query` object, and one object per source in `query.sources`. The cache hands the same compiled statement to every run of the same SQL text, so whatever a run writes to these objects is shared with a run that goes on at the same time. The check finds every such write.

```sh
yarn test-runstate                      # build, run the suite, print the list
bun test/runstate/run.js                # the same on the dist folder as it is
bun test/runstate/run.js --json         # the list as JSON
bun test/runstate/run.js --compile      # also the writes a later compile makes to a finished query
```

## How it works

`record.js` is a preload for `bun test`. It wraps `Select.prototype.compile` on the builds the tests load. When a compile returns, the query object and its sources are changed in place, so that a write is recorded and then done as before.

- Every property becomes an accessor that records a write.
- A Proxy in the prototype chain records a write of a property that does not exist yet.
- An array or plain object that the compile made is handed out through a Proxy, so a write inside it is recorded too. Such a write is listed with `[]` (an array) or `.*` (an object) after the name. A Map, Set or WeakMap is handed out the same way.
- A write is counted as part of the compile while the query has not run yet, as the statement around a SELECT gives it its modifier right after compiling it. From the first run on every write is listed, also one made by a later compile.

`run.js` runs the suite with the preload and turns each place in `dist/alasql.fs.js` into a file and a line in `src/`. A place given as `generated code` is a function made with `new Function`.

Nothing in `src/` knows about the check, and no result changes while it records. The suite passes with it.

## What it does not see

- A write that no test reaches.
- `delete query.x`.
- A write inside a value that a run assigned. After `query.data = []` the rows pushed to that array are not listed, the assignment is.
- A write through a reference that a closure took to a nested array or object during the compile.
- Writes to the parsed statement (the `yy` nodes) and to the statement function (`statement.running`).

## Reading the list

Since step 2 of #2596 each run of a compiled SELECT has its own copy of the query object and of each source, one level deep. A write to those is the run's own and is not listed. So the list is expected to be empty, and the check ends with exit code 1 when it is not. It runs in CI as the job "Run-state check of compiled queries".

When the list is not empty, each line is a property, the place that writes it, and the first test file that made the write. One place is listed once, however often it runs. When several source lines have the same text, the nearest is given and the others follow in brackets.

The way to fix a line is to make the write land on the copy of the run. An assignment to the query or the source a run is given does that by itself. A list or a map the compile made must be copied for the run in `newRun` (`src/select/select.js`), as the copy is one level deep and a push would change the shared one. A value that the statement around a query sets for one run is passed as the fourth argument of the statement function.
