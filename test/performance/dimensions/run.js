/*
	Runs one dimension (a group of cases from this folder) inside bench.js.

	For every case:
	- Correctness gate: the first run's answer is reduced to a digest (row count and a hash of the
	  rows) and compared with the digest develop gave (expected.json). A build that answers
	  differently did other work, so its time is not recorded: the case is null with the status
	  "wrong answer". Without an expected digest the case is timed and marked "unchecked".
	- Iterations adapt to the speed of the build, so a round takes about TARGET ms. A first run
	  slower than SLOW ms is recorded as it is ("single run"), so a slow old release cannot hold up
	  the whole history.
	- Every answer goes into a sink, so the JIT cannot drop the work.
	- Cases with `heap: true` also record what one run leaves on the heap while its answer is
	  still held, in MB, between two full GCs (Node needs --expose-gc; history.js passes it).
	The data comes from a seeded generator, so every build and runtime gets the same rows.
*/

const TARGET = 25;
const SLOW = 3000;
const ROUNDS = 5;

const now = () => performance.now();
const canGc = typeof Bun !== 'undefined' || typeof global.gc === 'function';
const gc =
	typeof Bun !== 'undefined'
		? () => Bun.gc(true)
		: typeof global.gc === 'function'
			? global.gc
			: () => {};
const heapUsed = () => process.memoryUsage().heapUsed;

// Mulberry32: small, fast and the same on every runtime
function generator(name) {
	let s = 0;
	for (const ch of name) s = (Math.imul(s, 31) + ch.charCodeAt(0)) >>> 0;
	const rnd = () => {
		s = (s + 0x6d2b79f5) >>> 0;
		let t = s;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
	const int = n => Math.floor(rnd() * n);
	return {rnd, int, pick: list => list[int(list.length)]};
}

// ---- digest of an answer ----

function hash(str) {
	let h = 0x811c9dc5;
	for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 0x01000193) >>> 0;
	return h;
}
// null and undefined are the same answer, and numbers are compared to 10 significant digits
function norm(v) {
	if (v === null || v === undefined) return '';
	if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toPrecision(10);
	if (v instanceof Date) return 'D' + v.getTime();
	if (Array.isArray(v)) return '[' + v.map(norm).join(',') + ']';
	if (typeof v === 'object') return '{' + rowText(v) + '}';
	return String(v);
}
// A row without the keys that hold nothing, in key order
function rowText(r) {
	if (r === null || typeof r !== 'object') return norm(r);
	if (Array.isArray(r)) return r.map(norm).join('|');
	return Object.keys(r)
		.filter(k => r[k] !== null && r[k] !== undefined && !k.startsWith('$$'))
		.sort()
		.map(k => k + '=' + norm(r[k]))
		.join('|');
}
// Rows in any order, unless the case gives the columns whose order is the answer
function digest(res, c) {
	if (!Array.isArray(res)) return 'v:' + norm(res);
	if (c.countOnly) return res.length + ':';
	let h = 0;
	for (let i = 0; i < res.length; i++) {
		const r = res[i];
		if (c.ordered)
			h = (Math.imul(h, 31) + hash(c.ordered.map(k => norm(r && r[k])).join('|'))) >>> 0;
		else h = (h + hash(rowText(r))) >>> 0;
	}
	return res.length + ':' + h.toString(16);
}

const size = x => (Array.isArray(x) ? x.length : typeof x === 'number' ? x | 0 : x ? 1 : 0);
const median = xs => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const keyOf = (dim, c) => `${dim.group}: ${c.name}`;

// The cases of a dimension as bench.js --list shows them, with their extra metrics
function describe(dim) {
	const out = [];
	for (const c of dim.cases) {
		const key = keyOf(dim, c);
		const base = {name: key, group: dim.group, sql: c.show || c.sql || ''};
		out.push({...base, unit: 'ms', about: c.about || ''});
		if (c.heap)
			out.push({...base, name: key + ' [heap]', unit: 'MB', about: 'Heap growth during one run.'});
		if (c.extra)
			out.push({
				...base,
				name: `${key} [${c.extra.name}]`,
				unit: c.extra.unit,
				about: c.extra.about,
			});
	}
	return out;
}

// only: texts from --case=; a case runs when its name contains one of them
function run(alasql, dim, expected, only) {
	const ctx = dim.setup ? dim.setup(generator(dim.group), alasql) : {};
	const results = {};
	const status = {};
	const digests = {};
	let sink = 0;
	for (const c of dim.cases) {
		const key = keyOf(dim, c);
		if (only && only.length && !only.some(o => key.toLowerCase().includes(o))) continue;
		const params = c.params ? c.params(ctx) : [];
		const once = c.run ? () => c.run(alasql, ctx) : () => alasql(c.sql, params);
		try {
			if (c.init) c.init(alasql, ctx);
			if (c.prepare) c.prepare(alasql, ctx);
			const t0 = now();
			let res = once();
			const first = now() - t0;
			const d = digest(c.check ? c.check(alasql, ctx, res) : res, c);
			digests[key] = d;
			res = null;
			if (expected && key in expected && expected[key] !== d) {
				results[key] = null;
				status[key] = 'wrong answer';
				continue;
			}
			if (!expected || !(key in expected)) status[key] = 'unchecked';
			if (first > SLOW) {
				results[key] = first;
				status[key] = 'single run';
			} else {
				const iters = Math.max(
					1,
					Math.min(c.maxIters || 2000, Math.round(TARGET / Math.max(first, 0.001)))
				);
				// a slow case gets fewer rounds, so the whole history stays measurable in one night
				const rounds = [];
				for (let r = 0, n = first > 250 ? 3 : ROUNDS; r < n; r++) {
					let t = 0;
					for (let i = 0; i < iters; i++) {
						if (c.prepare) c.prepare(alasql, ctx);
						const s = now();
						const x = once();
						t += now() - s;
						sink ^= size(x);
					}
					rounds.push(t / iters);
				}
				results[key] = median(rounds);
			}
			if (c.heap) {
				// what one run leaves on the heap while its answer is still held (null without a GC to call)
				if (c.prepare) c.prepare(alasql, ctx);
				gc();
				const h0 = heapUsed();
				const x = once();
				gc();
				// below 0 means the GC also freed garbage from before the run: nothing was left over
				results[key + ' [heap]'] = canGc ? Math.max(0, (heapUsed() - h0) / 2 ** 20) : null;
				sink ^= size(x);
			}
			if (c.extra) results[`${key} [${c.extra.name}]`] = c.extra.value(alasql, ctx);
		} catch (e) {
			results[key] = null;
			status[key] =
				'error: ' +
				String((e && e.message) || e)
					.split('\n')[0]
					.slice(0, 120);
			if (c.heap) results[key + ' [heap]'] = null;
			if (c.extra) results[`${key} [${c.extra.name}]`] = null;
		}
	}
	return {results, status, digests, sink};
}

module.exports = {run, describe};
