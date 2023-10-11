if (typeof exports === 'object') {
    var assert = require('assert');
    var alasql = require('..');
}

describe('Test 1810 - XSS', function () {
	const data = [{ a: 1 }];

    it('Where', function () {
			const run = () => alasql(`Select a from ? where a->valueOf("]),alert(1)]);function g(){};//")`, [data]);
			assert.throws(run, Error, "ReferenceError: g is not defined");
    });

    it('Rownum', function () {
			const res = alasql(`SELECT * FROM (SELECT ROWNUM(": alert(2)}////") FROM ?)`, [data]);
			assert.deepEqual(res, [{"ROWNUM(': alert(2)}////')": 1}]);
    });

    it('SUM', function () {
			const res = alasql(`SELECT 'a'->[SUM("+alert(3)+")] AS 'A' FROM ?`, [data]);
			assert.deepEqual(res, []);
    });
});
