if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
	var path = require('path');
}

let testId = '2639'; // INTO XLS without options throws

describe(`Test ${testId} - INTO XLS without an options object`, function () {
	const file = path.join(__dirname, 'restest' + testId + '.xls');

	after(function () {
		if (fs.existsSync(file)) fs.unlinkSync(file);
	});

	it('A) Writes the file with the default sheet and headers', function () {
		const res = alasql('SELECT * INTO XLS("' + file + '") FROM ?', [[{name: 'x', n: 1}]]);
		assert.strictEqual(res, 1);
		const out = fs.readFileSync(file, 'utf8');
		assert.ok(out.includes('<th'), 'has a header row');
		assert.ok(out.includes('>name<'), 'has the column title');
		assert.ok(out.includes('>x<'), 'has the value');
	});

	it('B) Options still decide the header row', function () {
		alasql('SELECT * INTO XLS("' + file + '", ?) FROM ?', [{headers: false}, [{name: 'x'}]]);
		assert.ok(!fs.readFileSync(file, 'utf8').includes('<th'), 'no header row');
		alasql('SELECT * INTO XLS("' + file + '", ?) FROM ?', [{headers: true}, [{name: 'x'}]]);
		assert.ok(fs.readFileSync(file, 'utf8').includes('<th'), 'header row');
	});
});
