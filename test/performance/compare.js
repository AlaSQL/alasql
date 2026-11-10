/*
	Compare two bench.js --json outputs.
	  bun test/performance/compare.js base.json other.json
	Prints base, other and the ratio other/base per case. >1.00 means "other" is slower.
*/
const fs = require('fs');
const [baseFile, otherFile] = process.argv.slice(2);
if (!baseFile || !otherFile) {
	console.error('usage: compare.js base.json other.json');
	process.exit(1);
}
const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
const other = JSON.parse(fs.readFileSync(otherFile, 'utf8'));
const fmt = ms =>
	ms === null || ms === undefined
		? 'n/a'
		: ms >= 1
			? ms.toFixed(2) + ' ms'
			: (ms * 1000).toFixed(1) + ' us';
console.log(`base:  ${base.meta.dist} (${base.meta.runtime})`);
console.log(`other: ${other.meta.dist} (${other.meta.runtime})`);
console.log('case'.padEnd(34), 'base'.padStart(11), 'other'.padStart(11), 'ratio'.padStart(7));
for (const name of Object.keys({...base.results, ...other.results})) {
	const b = base.results[name];
	const o = other.results[name];
	const ratio = b && o ? (o / b).toFixed(2) : '-';
	console.log(name.padEnd(34), fmt(b).padStart(11), fmt(o).padStart(11), String(ratio).padStart(7));
}
