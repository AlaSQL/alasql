if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1106 - Correlated subquery with grouping', function () {
	before(function () {
		alasql('CREATE DATABASE test1106');
		alasql('USE test1106');
		alasql('CREATE TABLE scores (team STRING, name STRING, score INT)');
		alasql(
			'INSERT INTO scores VALUES ("A", "alice", 10), ("A", "alice", 5), ("A", "bob", 5), ("C", "charlie", 10)'
		);
	});

	after(function () {
		alasql('DROP DATABASE test1106');
	});

	it('resolves the outer row in a grouped scalar subquery', function () {
		var result = alasql(
			'SELECT team, name, SUM(score) AS personal_score, (SELECT SUM(score) FROM scores AS i WHERE i.team = o.team) AS group_score FROM scores AS o GROUP BY name'
		);

		assert.deepStrictEqual(result, [
			{team: 'A', name: 'alice', personal_score: 15, group_score: 20},
			{team: 'A', name: 'bob', personal_score: 5, group_score: 20},
			{team: 'C', name: 'charlie', personal_score: 10, group_score: 10},
		]);
	});
});
