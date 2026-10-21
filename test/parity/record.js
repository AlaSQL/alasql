/*
	Parity recorder (context/roadmap-phase-1.md, step 0).

	Loaded by `bun test --preload` through run.js. It patches the alasql builds the tests load
	(dist/alasql.fs.js and dist/alasql.js) so that every statement is written, in order, to a
	recording: the SQL, the parameters, the result or the error, and the source of every function
	the engine made with `new Function` while the statement ran. Two recordings are compared with
	compare.js. The recorder never changes a result: every hook calls the original and returns
	its value.

	Hooks:
	  alasql.dexec        every SQL string reaches it: alasql(), alasql.exec, alasql.promise,
	                      db.exec, transactions. One record per call, plus one when its callback fires.
	                      Hooked on every instance, also one a test reloads through require.cache.
	  alasql.compile      one record for the compile, one per run of the returned statement.
	  globalThis.Function the generated query code. A source is attached to the statement that
	                      is running; a source made outside any statement (the fluent interface,
	                      a library) gets a record of its own.

	Environment (set by run.js):
	  PARITY_OUT     path of the recording, JSON lines. Required.
	  PARITY_APPEND  "1" appends to the recording (the dialect corpus runs after the suite).
	  PARITY_TAG     the file name used for records made outside test/test*.js.
	  PARITY_DEBUG   "1" adds the stack to code records made outside a statement.

	Record fields: i sequence, k kind (exec, cb, compile, run, code), f test file, b build
	(fs or browser), sql, p parameters, r result, e error, c code hashes, of the exec a cb
	belongs to. Sources are in <recording>.codes.jsonl, one {h, a} line per sha1, written as they
	are first seen (an exit handler does not run under bun test).
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..', '..');
const out = process.env.PARITY_OUT;
if (!out) throw new Error('PARITY_OUT is not set. Run through test/parity/run.js');
fs.mkdirSync(path.dirname(out), {recursive: true});
const append = process.env.PARITY_APPEND === '1';
const fd = fs.openSync(out, append ? 'a' : 'w');
const codesFd = fs.openSync(out.replace(/\.jsonl$/, '') + '.codes.jsonl', append ? 'a' : 'w');
const codes = new Set();
const stack = [];
let seq = 0;

const LIMIT = {p: 20000, r: 200000};

const sha1 = s => crypto.createHash('sha1').update(s).digest('hex');

// One text for any value. Keeps what JSON loses: undefined, NaN, Infinity, Date, class names,
// key order. Cycles and depth are bounded.
function text(v, seen, depth) {
	seen = seen || new Set();
	depth = depth || 0;
	if (v === undefined) return 'undefined';
	if (v === null) return 'null';
	const t = typeof v;
	if (t === 'number') return Number.isFinite(v) ? JSON.stringify(v) : String(v);
	if (t === 'string') return JSON.stringify(v);
	if (t === 'boolean') return String(v);
	if (t === 'bigint') return v + 'n';
	if (t === 'symbol') return v.toString();
	if (t === 'function') return '[Function ' + (v.name || 'anonymous') + '/' + v.length + ']';
	if (v instanceof Date) return 'Date(' + (isNaN(v) ? 'invalid' : v.toISOString()) + ')';
	if (v instanceof RegExp) return String(v);
	if (v instanceof Error) return 'Error(' + v.name + ': ' + v.message + ')';
	if (seen.has(v)) return '[Circular]';
	if (depth > 60) return '[Deep]';
	seen.add(v);
	let s;
	if (Array.isArray(v)) {
		const parts = [];
		for (let i = 0; i < v.length; i++) parts.push(i in v ? text(v[i], seen, depth + 1) : '<hole>');
		s = '[' + parts.join(',') + ']';
	} else if (v instanceof Map) {
		s = 'Map(' + text(Array.from(v.entries()), seen, depth + 1) + ')';
	} else if (v instanceof Set) {
		s = 'Set(' + text(Array.from(v), seen, depth + 1) + ')';
	} else if (ArrayBuffer.isView(v)) {
		s = v.constructor.name + '[' + Array.from(v).join(',') + ']';
	} else {
		const keys = Object.keys(v);
		s = '{' + keys.map(k => JSON.stringify(k) + ':' + text(v[k], seen, depth + 1)).join(',') + '}';
		const c = v.constructor && v.constructor.name;
		if (c && c !== 'Object') s = c + s;
	}
	seen.delete(v);
	return s;
}

function capped(s, max) {
	return s.length <= max ? s : s.slice(0, max) + ' <cut sha1:' + sha1(s) + ' len:' + s.length + '>';
}

// The test file that made the call, read from the stack
const fileRe = /[\\/]test[\\/](test[^\\/:)]*\.js)/;
function testFile() {
	const limit = Error.stackTraceLimit;
	Error.stackTraceLimit = 50;
	const s = new Error().stack || '';
	Error.stackTraceLimit = limit;
	const m = s.match(fileRe);
	return m ? m[1] : null;
}
// The file of the last statement, for code made in an asynchronous callback (REQUIRE, a file
// source): no test frame is on the stack then
let lastFile = process.env.PARITY_TAG || '?';
function currentFile() {
	const f = testFile();
	if (f) lastFile = f;
	return f || lastFile;
}

function write(rec) {
	fs.writeSync(fd, JSON.stringify(rec) + '\n');
}

function begin(kind, build, sql, params) {
	const rec = {i: seq++, k: kind, f: currentFile(), b: build, sql: String(sql), c: []};
	if (params !== undefined) rec.p = capped(text(params), LIMIT.p);
	if (!stack.length) clock += 1;
	stack.push(rec);
	return rec;
}

function end(rec, result, error) {
	if (stack[stack.length - 1] === rec) stack.pop();
	else stack.splice(stack.indexOf(rec), 1);
	if (error !== undefined) rec.e = text(error);
	else rec.r = capped(text(result), LIMIT.r);
	write(rec);
}

function callback(rec, result, error) {
	const cb = {i: seq++, k: 'cb', of: rec.i, f: rec.f, b: rec.b, sql: rec.sql};
	if (error !== undefined && error !== null) cb.e = text(error);
	else cb.r = capped(text(result), LIMIT.r);
	write(cb);
}

function wrapCallback(rec, cb) {
	if (typeof cb !== 'function') return cb;
	return function (res, err) {
		callback(rec, res, err);
		return cb.apply(this, arguments);
	};
}

// ---- deterministic randomness ----

// Tests that build their data with Math.random (test055, test056, test142, ...) would differ
// between two runs of the same build. A seeded generator (mulberry32) makes the two runs equal,
// so their results compare too.
let seed = 0x5eed1234;
Math.random = function () {
	seed = (seed + 0x6d2b79f5) | 0;
	let t = seed;
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// A fixed clock: new Date() without arguments and Date.now() give a fixed moment. It holds still
// while a statement runs (test202 expects NOW() and GETDATE() in one row to be the same instant,
// as a real clock gives within a millisecond) and moves one millisecond per statement and per
// read from test code. NOW(), temp table names (UPDATE ? uses Date.now()) and dates written into
// test files are then the same in two runs, also on different days. Dates made from arguments
// are untouched, and instances are real Dates.
const RealDate = Date;
let clock = RealDate.UTC(2026, 9, 21, 12, 0, 0);
const tick = () => (stack.length ? clock : (clock += 1));
function FixedDate() {
	if (!new.target) return RealDate();
	return arguments.length ? new RealDate(...arguments) : new RealDate(tick());
}
FixedDate.prototype = RealDate.prototype;
RealDate.prototype.constructor = FixedDate;
Object.setPrototypeOf(FixedDate, RealDate);
FixedDate.now = tick;
globalThis.Date = FixedDate;

// ---- generated code ----

const NativeFunction = Function;
function RecordingFunction() {
	const args = Array.from(arguments).map(String);
	const key = sha1(JSON.stringify(args));
	if (!codes.has(key)) {
		codes.add(key);
		fs.writeSync(codesFd, JSON.stringify({h: key, a: args}) + '\n');
	}
	const top = stack[stack.length - 1];
	if (top) top.c.push(key);
	else {
		const rec = {i: seq++, k: 'code', f: currentFile(), c: [key]};
		if (process.env.PARITY_DEBUG) rec.st = (new Error().stack || '').split('\n').slice(2, 12);
		write(rec);
	}
	return NativeFunction.apply(null, arguments);
}
RecordingFunction.prototype = NativeFunction.prototype;
Object.setPrototypeOf(RecordingFunction, NativeFunction);
globalThis.Function = RecordingFunction;

// ---- the engine ----

function hook(alasql, build) {
	const dexec = alasql.dexec;
	alasql.dexec = function (databaseid, sql, params, cb, scope) {
		const rec = begin('exec', build, sql, params);
		try {
			const r = dexec.call(this, databaseid, sql, params, wrapCallback(rec, cb), scope);
			end(rec, r);
			return r;
		} catch (e) {
			end(rec, undefined, e);
			throw e;
		}
	};

	const compile = alasql.compile;
	alasql.compile = function (sql, databaseid) {
		const rec = begin('compile', build, sql);
		let statement;
		try {
			statement = compile.call(this, sql, databaseid);
			end(rec, '[statement]');
		} catch (e) {
			end(rec, undefined, e);
			throw e;
		}
		// A Proxy keeps the statement's properties live (tests read statement.query after a
		// recompile) and records every run, also through .promise
		const proxy = new Proxy(statement, {
			apply(target, thisArg, args) {
				const run = begin('run', build, sql, args[0]);
				const a = args.slice();
				a[1] = wrapCallback(run, a[1]);
				try {
					const r = Reflect.apply(target, thisArg, a);
					end(run, r);
					return r;
				} catch (e) {
					end(run, undefined, e);
					throw e;
				}
			},
			get(target, prop, receiver) {
				if (prop === 'promise') {
					return function (params) {
						return new Promise(function (resolve, reject) {
							proxy(params, function (data, err) {
								if (err) reject(err);
								else resolve(data);
							});
						});
					};
				}
				return Reflect.get(target, prop, receiver);
			},
		});
		return proxy;
	};
	return alasql;
}

// test1495 and test1889 delete alasql from require.cache and load it again, which makes a new,
// unhooked instance that every later file gets. A beforeEach from the preload runs before every
// test in every file and hooks an instance it has not seen.
const builds = [
	[path.join(root, 'dist', 'alasql.fs.js'), 'fs'],
	[path.join(root, 'dist', 'alasql.js'), 'browser'],
];
const hooked = new WeakSet();
function hookCurrent() {
	for (const [file, build] of builds) {
		const m = require.cache[file];
		const instance = m && m.exports;
		if (typeof instance === 'function' && !hooked.has(instance)) {
			hooked.add(instance);
			hook(instance, build);
		}
	}
}
const fsBuild = require(builds[0][0]);
require(builds[1][0]);
hookCurrent();
try {
	require('bun:test').beforeEach(hookCurrent);
} catch (e) {
	// not under bun test (the dialect corpus): nothing reloads alasql there
}

if (!append) {
	write({
		k: 'meta',
		version: fsBuild.version,
		build: fsBuild.build,
		bun: typeof Bun !== 'undefined' ? Bun.version : undefined,
		node: process.version,
		date: new Date().toISOString(),
		dist: fs.realpathSync(path.join(root, 'dist')),
	});
}
