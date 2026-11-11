if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2631 - MODE over Date values', function () {
	var rows = ['2024-05-05', '2024-05-05', '2024-05-05', '2024-01-02', '2024-01-02'];

	it('A) equal dates are counted together', function () {
		var res = alasql('SELECT VALUE MODE(d) FROM ?', [
			rows.map(function (s) {
				return {d: new Date(s)};
			}),
		]);
		assert(res instanceof Date);
		assert.strictEqual(res.getTime(), new Date('2024-05-05').getTime());
	});

	it('B) a tie gives the smallest date', function () {
		var res = alasql('SELECT VALUE MODE(d) FROM ?', [
			[{d: new Date('2024-03-01')}, {d: new Date('2024-02-01')}],
		]);
		assert.strictEqual(res.getTime(), new Date('2024-02-01').getTime());
	});

	it('C) dates in a group', function () {
		var data = [
			{g: 1, d: new Date('2024-01-01')},
			{g: 1, d: new Date('2024-05-05')},
			{g: 1, d: new Date('2024-05-05')},
		];
		var res = alasql('SELECT g, MODE(d) AS m FROM ? GROUP BY g', [data]);
		assert.strictEqual(res[0].m.getTime(), new Date('2024-05-05').getTime());
	});

	it('D) strings and numbers still work', function () {
		var strings = rows.map(function (s) {
			return {s: s};
		});
		assert.strictEqual(alasql('SELECT VALUE MODE(s) FROM ?', [strings]), '2024-05-05');
		assert.strictEqual(
			alasql('SELECT VALUE MODE(x) FROM ?', [[{x: 1}, {x: 2}, {x: 2}, {x: null}]]),
			2
		);
	});
});
