if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2658'; // GROUP_CONCAT(x ORDER BY y) sorts by y

describe(`Test ${testId} - GROUP_CONCAT(x ORDER BY y)`, function () {
	const people = [
		{name: 'ann', age: 30, team: 'a'},
		{name: 'bob', age: 20, team: 'b'},
		{name: 'cid', age: 25, team: 'a'},
		{name: 'dan', age: 25, team: 'b'},
	];

	it('A) ORDER BY another column', function () {
		assert.strictEqual(
			alasql('SELECT VALUE GROUP_CONCAT(name ORDER BY age) FROM ?', [people]),
			'bob,cid,dan,ann'
		);
		assert.strictEqual(
			alasql('SELECT VALUE GROUP_CONCAT(name ORDER BY age DESC) FROM ?', [people]),
			'ann,cid,dan,bob'
		);
	});

	it('B) Several ORDER BY items', function () {
		assert.strictEqual(
			alasql('SELECT VALUE GROUP_CONCAT(name ORDER BY age, name DESC) FROM ?', [people]),
			'bob,dan,cid,ann'
		);
	});

	it('C) Per group, with a separator', function () {
		assert.deepStrictEqual(
			alasql(
				"SELECT team, GROUP_CONCAT(name ORDER BY age DESC SEPARATOR ';') AS n FROM ? GROUP BY team",
				[people]
			),
			[
				{team: 'a', n: 'ann;cid'},
				{team: 'b', n: 'dan;bob'},
			]
		);
	});

	it('D) ORDER BY the value itself and no ORDER BY, as before', function () {
		assert.strictEqual(
			alasql('SELECT VALUE GROUP_CONCAT(name ORDER BY name DESC) FROM ?', [people]),
			'dan,cid,bob,ann'
		);
		assert.strictEqual(
			alasql('SELECT VALUE GROUP_CONCAT(name) FROM ?', [people]),
			'ann,bob,cid,dan'
		);
		assert.strictEqual(
			alasql('SELECT VALUE GROUP_CONCAT(DISTINCT team ORDER BY team DESC) FROM ?', [people]),
			'b,a'
		);
	});
});
