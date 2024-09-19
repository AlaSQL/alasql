if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}


describe('Test 1937 - CASE WHEN logic with type-insensitive comparison', function () {
	it('should correctly compare String objects and primitive strings in CASE WHEN', function (done) {
		const t1 = [
			{id: '1', a: new String('one')},
			{id: '2', a: new String('two')},
		];


		const res = alasql(
			`SELECT
			 CASE T1.a
       WHEN "one" THEN "True for 1"
       ELSE "False"
       END FROM ? T1`,
			[t1]
		);

		const expected = [
			{"CASE T1.a WHEN 'one' THEN 'True for 1' END": 'True for 1'},
			{"CASE T1.a WHEN 'one' THEN 'True for 1' END": 'False'}
		];

		assert.deepEqual(res, expected);
		done();
	});
});
