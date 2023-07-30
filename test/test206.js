if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 206 IF and BEGIN END', function () {
	it('1. IF BEGIN END', function (done) {
		var res = alasql('IF TRUE BEGIN SELECT VALUE 1; SELECT VALUE 2 END; SELECT VALUE 3');
		//        console.log(res);
		assert.deepEqual(res, [[1, 2], 3]);
		done();
	});

	it('2. IF FALSE BEGIN END', function (done) {
		var res = alasql('IF FALSE BEGIN SELECT VALUE 1; SELECT VALUE 2 END; SELECT VALUE 3');
		//        console.log(res);
		assert.deepEqual(res, [undefined, 3]);
		done();
	});

	it('3. IF TRUE THEN ELSE ', function (done) {
		var res = alasql('IF TRUE SELECT VALUE 1 ELSE SELECT VALUE 2');
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 1);
		done();
	});
	it('4. IF FALSE THEN ELSE ', function (done) {
		var res = alasql('IF FALSE SELECT VALUE 1 ELSE SELECT VALUE 2');
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 2);
		done();
	});

	it('5. Nested IFs ', function (done) {
		var res = alasql(
			'IF TRUE IF TRUE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 1);
		done();
	});

	it('6. Nested IFs ', function (done) {
		var res = alasql(
			'IF FALSE IF TRUE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 \
            ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 3);
		done();
	});

	it('7. Nested IFs ', function (done) {
		var res = alasql(
			'IF TRUE \
            IF FALSE SELECT VALUE 1 \
            ELSE SELECT VALUE 2 \
            ELSE SELECT VALUE 3'
		);
		//        console.log(res);
		//        assert.deepEqual(res,[ undefined, 3 ]);
		assert(res == 2);
		done();
	});
});
