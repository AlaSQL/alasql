if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2812 - ORDER BY on a column with numbers and text', function () {
	before(function () {
		alasql('CREATE DATABASE test2812; USE test2812');
		alasql('CREATE TABLE o (id INTEGER, mix)');
		alasql("INSERT INTO o VALUES (1, 10), (2, '9'), (3, 'a'), (5, 2.5), (6, 'B')");
	});

	after(function () {
		alasql('DROP DATABASE test2812');
	});

	it('numbers come before text, whatever the input order', function () {
		var rows = alasql('SELECT * FROM o');
		for (var i = 0; i < 20; i++) {
			// Shuffle the input, the result must not change
			rows.sort(function () {
				return Math.random() - 0.5;
			});
			assert.deepEqual(alasql('SELECT COLUMN id FROM ? ORDER BY mix', [rows]), [5, 1, 2, 6, 3]);
			assert.deepEqual(
				alasql('SELECT COLUMN id FROM ? ORDER BY mix DESC', [rows]),
				[3, 6, 2, 1, 5]
			);
		}
	});

	it('a second key still orders equal values', function () {
		alasql("INSERT INTO o VALUES (7, 'a'), (8, 10)");
		assert.deepEqual(
			alasql('SELECT COLUMN id FROM o ORDER BY mix, id DESC'),
			[5, 8, 1, 2, 6, 7, 3]
		);
	});
});
