/*
	Run-state recorder (#2596).

	A compiled SELECT keeps one `query` object, and each source of it one object in
	`query.sources`. They are shared by every run of the cached statement, so a write to them
	during a run is state that two runs at the same time overwrite. This preload records every
	such write while the suite runs. It is loaded by `bun test --preload` through run.js.

	How: Select.prototype.compile is wrapped on every alasql build the tests load. When it returns,
	the query object and its sources are instrumented in place:
	  - every own property becomes an accessor that records a write and then stores the value
	  - a Proxy is put in the prototype chain, so a write of a property that does not exist yet
	    is recorded too (and the property is then made an accessor as well)
	  - a plain array or object that was there when the compile ended is handed out through a
	    Proxy that records writes inside it (query.columns.push, query.xcolumns[x] = ...), and
	    so is a Map, Set or WeakMap (query.groupSources.set)
	A value that a run assigns (query.data = []) is stored as it is: what a run puts into its
	own value is not shared state, the assignment is.

	A write is a compile write while the query has not run yet: the compile itself, a parent
	that sets up its subquery, and the statement around a SELECT that gives it its modifier
	right after the compile. From the first run on every write is a run write, also one made
	by a later compile: the copy a run gets is planned at the first run. Only run writes are
	the list #2596 asks for.

	Since #2596 a run has its own copy of the compiled query and of each source, one level
	deep. A write to a copy is not recorded: it is the run's own. The copy is made by reading
	every property, so it gets the recording views of the lists and maps, and a push to a list
	that was not copied for the run is still recorded.

	Not seen: `delete query.x`, a write through a reference to a nested array or object that a
	closure took during the compile, and writes to the parsed statement (the yy nodes).

	Environment (set by run.js):
	  RUNSTATE_OUT   path of the recording, JSON lines, one line per distinct write. Required.
*/

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const out = process.env.RUNSTATE_OUT;
if (!out) throw new Error('RUNSTATE_OUT is not set. Run through test/runstate/run.js');
fs.mkdirSync(path.dirname(out), {recursive: true});
const fd = fs.openSync(out, 'w');

const builds = [
	[path.join(root, 'dist', 'alasql.fs.js'), 'fs'],
	[path.join(root, 'dist', 'alasql.js'), 'browser'],
];

const seen = new Map();
// the queries that have run at least once
const started = new WeakSet();
let off = 0;

// The first frames of the stack that are in a build, as "build:line:column"
const frameRe = /dist[\\/](alasql(?:\.fs)?\.js):(\d+):(\d+)/;
function where() {
	const limit = Error.stackTraceLimit;
	Error.stackTraceLimit = 30;
	const lines = (new Error().stack || '').split('\n').slice(1);
	Error.stackTraceLimit = limit;
	let generated = false;
	for (const line of lines) {
		if (line.includes(__filename)) continue;
		const m = line.match(frameRe);
		if (m) return (generated ? 'generated code called from ' : '') + m[1] + ':' + m[2] + ':' + m[3];
		// a frame outside the build before the first frame inside it: a function made with new Function
		generated = true;
	}
	return 'outside the build';
}

function testFile() {
	return typeof Bun !== 'undefined' && Bun.main ? path.basename(Bun.main) : '?';
}

function note(kind, prop, owner) {
	if (off) return;
	// a query that has not run yet is still being set up: the statement around it gives it its
	// modifier right after the compile
	const phase = started.has(owner) ? 'run' : 'compile';
	const at = where();
	const key = kind + '|' + prop + '|' + phase + '|' + at;
	const n = seen.get(key);
	if (n) return seen.set(key, n + 1);
	seen.set(key, 1);
	fs.writeSync(fd, JSON.stringify({kind, prop, phase, at, f: testFile()}) + '\n');
}

const isPlain = v => {
	if (!v || typeof v !== 'object') return false;
	const p = Object.getPrototypeOf(v);
	return p === Object.prototype || p === Array.prototype;
};

// A recording view of a plain array or object that the compile made
const views = new WeakMap();
function view(value, kind, name, owner) {
	let p = views.get(value);
	if (p) return p;
	const isArray = Array.isArray(value);
	const child = key => (isArray ? name + '[]' : name + '.*');
	p = new Proxy(value, {
		get(target, key, receiver) {
			const v = Reflect.get(target, key, receiver);
			if (typeof key === 'symbol' || !isPlain(v) || instrumented.has(v)) return v;
			const d = Reflect.getOwnPropertyDescriptor(target, key);
			// an invariant of Proxy: a property that cannot change must be given as it is
			if (d && !d.configurable && !d.writable) return v;
			return view(v, kind, child(key), owner);
		},
		set(target, key, v, receiver) {
			if (!(isArray && key === 'length')) note(kind, child(key), owner);
			return Reflect.set(target, key, v, target);
		},
		deleteProperty(target, key) {
			note(kind, child(key) + ' (delete)', owner);
			return Reflect.deleteProperty(target, key);
		},
	});
	views.set(value, p);
	return p;
}

// A recording view of a Map, Set or WeakMap that the compile made: its methods must run on the
// thing itself, so they are bound to it, and the ones that change it are recorded
const isKeyed = v => v instanceof Map || v instanceof Set || v instanceof WeakMap;
function keyedView(value, kind, name, owner) {
	let p = views.get(value);
	if (p) return p;
	p = new Proxy(value, {
		get(target, key) {
			const v = Reflect.get(target, key, target);
			if (typeof v !== 'function') return v;
			if (key !== 'set' && key !== 'add' && key !== 'delete' && key !== 'clear')
				return v.bind(target);
			return function () {
				note(kind, name + '.' + key + '()', owner);
				return v.apply(target, arguments);
			};
		},
	});
	views.set(value, p);
	return p;
}

const instrumented = new WeakSet();

function accessor(obj, key, value, kind, compiled, owner) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			if (!compiled) return value;
			if (isKeyed(value)) return keyedView(value, kind, key, owner);
			return isPlain(value) && !instrumented.has(value) ? view(value, kind, key, owner) : value;
		},
		set(v) {
			// an object that inherits from this one writes to itself
			if (this !== obj) {
				Object.defineProperty(this, key, {
					value: v,
					writable: true,
					enumerable: true,
					configurable: true,
				});
				return;
			}
			note(kind, key, owner);
			// a view that comes back (query.columns = query.columns) is stored as the thing itself
			compiled = false;
			value = v;
		},
	});
}

function instrument(obj, kind, owner) {
	if (!obj || typeof obj !== 'object' || instrumented.has(obj)) return;
	instrumented.add(obj);
	for (const key of Object.keys(obj)) {
		const d = Object.getOwnPropertyDescriptor(obj, key);
		if (!d.configurable || !('value' in d)) continue;
		accessor(obj, key, d.value, kind, true, owner);
	}
	// A write of a property the object does not have goes up the prototype chain and meets this
	// Proxy. Its target has the old prototype as its prototype, so instanceof still holds.
	const proto = Object.getPrototypeOf(obj);
	Object.setPrototypeOf(
		obj,
		new Proxy(Object.create(proto), {
			set(target, key, v, receiver) {
				if (receiver !== obj || typeof key === 'symbol')
					return Reflect.defineProperty(receiver, key, {
						value: v,
						writable: true,
						enumerable: true,
						configurable: true,
					});
				note(kind, key, owner);
				accessor(obj, key, v, kind, false, owner);
				return true;
			},
		})
	);
}

function instrumentQuery(query) {
	if (!query || instrumented.has(query)) return;
	off++;
	try {
		const sources = query.sources;
		instrument(query, 'query', query);
		if (Array.isArray(sources)) for (const s of sources) instrument(s, 'source', query);
	} finally {
		off--;
	}
}

function hook(alasql) {
	const Select = alasql.yy && alasql.yy.Select;
	if (!Select) return;
	const compile = Select.prototype.compile;
	Select.prototype.compile = function () {
		const statement = compile.apply(this, arguments);
		if (typeof statement !== 'function' || !statement.query) return statement;
		instrumentQuery(statement.query);
		// The statement the callers get marks the first run of its query
		const query = statement.query;
		const run = function () {
			started.add(query);
			return statement.apply(this, arguments);
		};
		Object.assign(run, statement);
		return run;
	};
}

const hooked = new WeakSet();
function hookCurrent() {
	for (const [file] of builds) {
		const m = require.cache[file];
		const instance = m && m.exports;
		if (typeof instance === 'function' && !hooked.has(instance)) {
			hooked.add(instance);
			hook(instance);
		}
	}
}
require(builds[0][0]);
require(builds[1][0]);
hookCurrent();
require('bun:test').beforeEach(hookCurrent);
