if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '608'; // insert test file number

describe('Test ' + test + ' - Select.toString() ', function () {
	// From http://jsfiddle.net/ndxbxrme/eyLy4zy9/3/

	var tests = [
		{
			description: '1: Alias ommited from table join',
			sql:
				'SELECT i.name AS itemName, f.name FROM items AS i LEFT JOIN feeds AS f ON i.fid = f.id WHERE f.id = $0',
		},
		{
			description: '2: Joined Select',
			sql:
				'SELECT i.name AS itemName, f.name FROM items AS i LEFT JOIN (SELECT * FROM feeds) AS f ON i.fid = f.id WHERE f.id = $0',
		},
		{
			description: '3: Distinct goes missing',
			sql: 'SELECT DISTINCT i.name AS itemName FROM items',
		},
		{
			description: '4: UniOp weirdness',
			sql: 'SELECT DISTINCT (i.name) AS itemName FROM items',
		},
	];

	var runTest = function (test) {
		it(test.description, function () {
			var ast = alasql.parse(test.sql);
			var astSql = ast.statements[0].toString();
			assert.equal(astSql, test.sql);
		});
	};

	tests.forEach(runTest);
});
