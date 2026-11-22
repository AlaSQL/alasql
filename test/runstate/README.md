# Run-state check

Which code writes to a compiled query while a statement runs? This is the first step of #2596.

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
- An array or plain object that the compile made is handed out through a Proxy, so a write inside it is recorded too. Such a write is listed with `[]` (an array) or `.*` (an object) after the name.

`run.js` runs the suite with the preload and turns each place in `dist/alasql.fs.js` into a file and a line in `src/`. A place given as `generated code` is a function made with `new Function`.

Nothing in `src/` knows about the check, and no result changes while it records. The suite passes with it.

## What it does not see

- A write that no test reaches.
- `delete query.x`.
- A write inside a value that a run assigned. After `query.data = []` the rows pushed to that array are not listed, the assignment is.
- A write through a reference that a closure took to a nested array or object during the compile.
- Writes to the parsed statement (the `yy` nodes) and to the statement function (`statement.running`).

## Reading the list

Each line is a property, the place that writes it, and the first test file that made the write. One place is listed once, however often it runs. When several source lines have the same text, the nearest is given and the others follow in brackets.

The list is the work list for the next step of #2596, where each run gets its own object. After that step the list is expected to be empty.
