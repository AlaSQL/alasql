/*
	Runs the dialect cases (test/dialect/) through alasql under the parity recorder, so that they
	are part of a recording. run.js starts it after the suite with PARITY_APPEND=1 and
	PARITY_TAG=dialect. It is not picked up by `bun test`.

	The cases are read the way test/dialect/run.js reads them: one statement per line in
	cases.sql (a "-- sqlite:" tail is SQLite's spelling and is dropped here), plus the generators
	in matrices/. Both engines load fixtures.sql first; here only alasql runs.
*/

require('./record.js');

const fs = require('fs');
const path = require('path');
const alasql = require('../..');

const dialect = path.join(__dirname, '..', 'dialect');

function statements(text) {
	return text
		.split('\n')
		.filter(l => !l.trim().startsWith('--'))
		.join('\n')
		.split(/;\s*$/m)
		.map(s => s.trim())
		.filter(Boolean);
}

function cases() {
	const list = [];
	for (const line of fs.readFileSync(path.join(dialect, 'cases.sql'), 'utf8').split('\n')) {
		const t = line.trim();
		if (!t || t.startsWith('--')) continue;
		list.push({sql: t.split(/\s+-- sqlite:\s+/)[0].trim()});
	}
	const dir = path.join(dialect, 'matrices');
	for (const f of fs.readdirSync(dir).sort()) {
		if (f.endsWith('.js')) list.push(...require(path.join(dir, f))());
	}
	return list;
}

alasql('CREATE DATABASE parity_dialect; USE parity_dialect');
for (const s of statements(fs.readFileSync(path.join(dialect, 'fixtures.sql'), 'utf8'))) {
	alasql(s);
}
let n = 0;
for (const c of cases()) {
	try {
		alasql(c.sql, c.params || []);
	} catch (e) {
		// the error is in the recording; the comparison is what matters
	}
	n++;
}
alasql('DROP DATABASE parity_dialect');
console.log('dialect corpus: ' + n + ' cases recorded');
