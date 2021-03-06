if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 193 - GROUP BY formula', function () {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	it('1. GROUP BY formula, SELECT with formula', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT COUNT(a+1)+1 AS b FROM ? GROUP BY a%2', [data]);
		assert.deepEqual(res, [{b: 5}, {b: 3}]);
		//        console.log('Result:',res);
		done();
	});

	it('2. PI calculation #1', function (done) {
		var res = alasql(
			'SELECT VALUE COUNT(*)*4/$[0] FROM \
            (SELECT RANDOM() AS x, RANDOM() AS y FROM RANGE(1,$[0])) WHERE x*x+y*y<1',
			[100000]
		);
		/// console.log('PI=',res);
		assert(3.1 < res && res < 3.2);
		done();
	});

	it('3. PI calculation #2', function (done) {
		var res = alasql(
			'SELECT VALUE COUNT(*)*4/$[0] FROM RANGE(1,$[0]) WHERE POWER(RANDOM(),2)+POWER(RANDOM(),2)<1',
			[100000]
		);
		//        console.log(res);
		assert(3.1 < res && res < 3.2);
		//        console.log('PI=',res);
		done();
	});
});
