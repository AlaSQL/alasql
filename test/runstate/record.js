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
	    Proxy that records writes inside it (query.columns.push, query.xcolumns[x] = ...)
	A value that a run assigns (query.data = []) is stored as it is: what a run puts into its
	own value is not shared state, the assignment is.

	A write is a compile write while a Select.compile is the innermost frame (a parent that
	sets up its subquery), else a run write. Only run writes are the list #2596 asks for.

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

// 'compile' or 'run' per frame that is on the stack now
const frames = [];
const seen = new Map();
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

function note(kind, prop) {
	if (off) return;
	const phase = frames[frames.length - 1] === 'compile' ? 'compile' : 'run';
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
function view(value, kind, name) {
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
			return view(v, kind, child(key));
		},
		set(target, key, v, receiver) {
			if (!(isArray && key === 'length')) note(kind, child(key));
			return Reflect.set(target, key, v, target);
		},
		deleteProperty(target, key) {
			note(kind, child(key) + ' (delete)');
			return Reflect.deleteProperty(target, key);
		},
	});
	views.set(value, p);
	return p;
}

const instrumented = new WeakSet();

function accessor(obj, key, value, kind, compiled) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			return compiled && isPlain(value) && !instrumented.has(value)
				? view(value, kind, key)
				: value;
		},
		set(v) {
			note(kind, key);
			// a view that comes back (query.columns = query.columns) is stored as the thing itself
			compiled = false;
			value = v;
		},
	});
}

function instrument(obj, kind) {
	if (!obj || typeof obj !== 'object' || instrumented.has(obj)) return;
	instrumented.add(obj);
	for (const key of Object.keys(obj)) {
		const d = Object.getOwnPropertyDescriptor(obj, key);
		if (!d.configurable || !('value' in d)) continue;
		accessor(obj, key, d.value, kind, true);
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
				note(kind, key);
				accessor(obj, key, v, kind, false);
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
		instrument(query, 'query');
		if (Array.isArray(sources)) for (const s of sources) instrument(s, 'source');
	} finally {
		off--;
	}
}

function hook(alasql) {
	const Select = alasql.yy && alasql.yy.Select;
	if (!Select) return;
	const compile = Select.prototype.compile;
	Select.prototype.compile = function () {
		frames.push('compile');
		let statement;
		try {
			statement = compile.apply(this, arguments);
		} finally {
			frames.pop();
		}
		if (typeof statement !== 'function' || !statement.query) return statement;
		instrumentQuery(statement.query);
		// The statement the callers get marks a run, so that a compile inside a run (a subquery
		// compiled late, a nested alasql() call) and the run around it are told apart
		const run = function () {
			frames.push('run');
			try {
				return statement.apply(this, arguments);
			} finally {
				frames.pop();
			}
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
