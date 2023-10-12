if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1810 - XSS', function () {
	const data = [{a: 1}];

	it('Where', function () {
		const run = () => alasql(`Select a
							  from ?
							  where a->valueOf("]),alert(1)]);function g(){};//")`, [data]);
		assert.throws(run, Error, "ReferenceError: g is not defined");
	});

	it('Rownum', function () {
		const res = alasql(`SELECT *
						FROM (SELECT ROWNUM(": alert(2)}////") FROM ?)`, [data]);
		assert.deepEqual(res, [{"ROWNUM(': alert(2)}////')": 1}]);
	});

	it('SUM', function () {
		const res = alasql(`SELECT 'a'->[SUM("+alert(3)+")] AS 'A'
						FROM ?`, [data]);
		assert.deepEqual(res, [{"'A'": undefined}]);
	});

	it('ABS SUM', function () {
		const res = alasql(`SELECT ABS(SUM(1)) as "]+alert(4)////"
						FROM ?`, [data]);
		assert.deepEqual(res, [{"']+alert(4)////'": 1}]);
	});

	it('ABS SUM quote', function () {
		const res = alasql(`SELECT ABS(SUM(1)) as "']+alert(4)////"
						FROM ?`, [data]);
		assert.deepEqual(res, [{"'']+alert(4)////'": 1}]);
	});

	it('Select quotes', function () {
		const res = alasql(`SELECT "']+alert(4)////", '"]+alert(4)////'
						FROM ?`, [data]);
		assert.deepEqual(res, [{
			"'']+alert(4)////'": "']+alert(4)////",
			[`'"]+alert(4)////'`]: '"]+alert(4)////'
		}]);
	});

	it('@var', function () {
		const res = alasql(`
		SET @x = "']+alert(4)////";
		SET @y = '"]+alert(4)////';
		 SELECT @x, @y, ABS(SUM(1)) as "']+alert(4)////" FROM ?
		 where @x != @y
		 GROUP BY @x, @y
		 ORDER BY @x, @y`, [data]);
		assert.deepEqual(res, [
			1,
			1,
			[
				{
					"'']+alert(4)////'": 1,
					'@x': "']+alert(4)////",
					'@y': '"]+alert(4)////'
				}
			]
		]);
	});

	it('Join', function () {
		const res = alasql(`SELECT *, "']+alert(4)////", '"]+alert(4)////'
						FROM ?
								 JOIN ? as X
									  ON a != '"]+alert(4)////' and a != "']+alert(4)////"`, [data, data]);
		assert.deepEqual(res, [
			{
				"'']+alert(4)////'": "']+alert(4)////",
				[`'"]+alert(4)////'`]: '"]+alert(4)////',
				a: 1
			}
		]);
	});


});
