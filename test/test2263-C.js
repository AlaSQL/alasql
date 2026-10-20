if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2263C'; // BREAK and CONTINUE outside a loop say so

describe(`Test ${testId} - BREAK and CONTINUE outside a loop`, function () {
	it('A) BREAK outside a loop', function () {
		assert.throws(() => alasql('BREAK'), /BREAK can only be used inside a WHILE loop/);
	});

	it('B) CONTINUE outside a loop, inside IF', function () {
		assert.throws(
			() => alasql('IF 1 = 1 CONTINUE'),
			/CONTINUE can only be used inside a WHILE loop/
		);
	});

	it('C) Inside a loop BREAK still ends the loop', function () {
		var res = alasql(
			'DECLARE @i INT; SET @i = 0; WHILE @i < 10 BEGIN SET @i = @i + 1; IF @i = 3 BREAK; END; SELECT @i AS i'
		);
		assert.deepStrictEqual(res[res.length - 1], [{i: 3}]);
	});
});
