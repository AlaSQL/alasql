/*
	The API surface of a build: every property path reachable from the alasql object, with its
	kind (function and its number of parameters, class name, primitive value). Two snapshots
	compared tell when a module forgot to register something, or registered it differently.

	  bun test/parity/api.js snapshot [dist/alasql.fs.js] > api.json
	  bun test/parity/api.js compare a.json b.json

	The walk stops at the global object, at depth 8, and does not call getters. Values of
	version and build are left out, so two releases compare equal when nothing else changed.
*/

const fs = require('fs');
const path = require('path');

const MAX_DEPTH = 8;
const NO_VALUE = new Set(['version', 'build']);
const SKIP_FN_PROPS = new Set(['length', 'name', 'arguments', 'caller']);

function kind(v, name) {
	if (v === null) return 'null';
	const t = typeof v;
	if (t === 'function') return 'function/' + v.length;
	if (t === 'object') {
		if (Array.isArray(v)) return 'Array/' + v.length;
		const c = v.constructor && v.constructor.name;
		return c || 'object';
	}
	if (NO_VALUE.has(name)) return t;
	if (t === 'string') return 'string:' + JSON.stringify(v.length > 60 ? v.slice(0, 60) + '…' : v);
	return t + ':' + String(v);
}

function snapshot(alasql) {
	const out = {};
	const seen = new Map();
	const stop = new Set([globalThis, Object.prototype, Function.prototype, Array.prototype]);
	if (typeof process !== 'undefined') stop.add(process);
	seen.set(alasql, 'alasql');
	const queue = [['alasql', alasql, 0]];
	while (queue.length) {
		const [p, v, d] = queue.shift();
		const isFn = typeof v === 'function';
		for (const name of Object.getOwnPropertyNames(v).sort()) {
			if (isFn && SKIP_FN_PROPS.has(name)) continue;
			const desc = Object.getOwnPropertyDescriptor(v, name);
			const key = p + '.' + name;
			if (!('value' in desc)) {
				out[key] = (desc.get ? 'get' : '') + (desc.set ? 'set' : '');
				continue;
			}
			const x = desc.value;
			out[key] = kind(x, name);
			if (x && (typeof x === 'object' || typeof x === 'function')) {
				if (stop.has(x)) continue;
				if (seen.has(x)) {
					out[key] += ' = ' + seen.get(x);
					continue;
				}
				seen.set(x, key);
				if (d < MAX_DEPTH) queue.push([key, x, d + 1]);
			}
		}
	}
	return out;
}

function compare(a, b) {
	const onlyA = [];
	const onlyB = [];
	const changed = [];
	for (const k of Object.keys(a)) {
		if (!(k in b)) onlyA.push(k);
		else if (a[k] !== b[k]) changed.push([k, a[k], b[k]]);
	}
	for (const k of Object.keys(b)) if (!(k in a)) onlyB.push(k);
	return {onlyA, onlyB, changed, total: Object.keys(a).length};
}

module.exports = {snapshot, compare};

if (require.main === module) {
	const [cmd, x, y] = process.argv.slice(2);
	if (cmd === 'snapshot') {
		const dist = path.resolve(x || path.join(__dirname, '..', '..', 'dist', 'alasql.fs.js'));
		process.stdout.write(JSON.stringify(snapshot(require(dist)), null, 1) + '\n');
	} else if (cmd === 'compare') {
		const r = compare(
			JSON.parse(fs.readFileSync(x, 'utf8')),
			JSON.parse(fs.readFileSync(y, 'utf8'))
		);
		console.log(
			`api: ${r.total} paths; only in a: ${r.onlyA.length}; only in b: ${r.onlyB.length}; changed: ${r.changed.length}`
		);
		for (const k of r.onlyA) console.log('  only in a: ' + k);
		for (const k of r.onlyB) console.log('  only in b: ' + k);
		for (const [k, va, vb] of r.changed) console.log(`  changed: ${k}: ${va} -> ${vb}`);
		process.exit(r.onlyA.length + r.onlyB.length + r.changed.length ? 1 : 0);
	} else {
		console.error('usage: api.js snapshot [dist] | compare a.json b.json');
		process.exit(2);
	}
}
