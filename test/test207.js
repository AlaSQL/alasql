if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 207 WHILE', function () {
	it('1. FALSE WHILE', function (done) {
		var res = alasql('WHILE FALSE SELECT VALUE 1; SELECT VALUE 2');
		//        console.log(res);
		assert.deepEqual(res, [[], 2]);
		done();
	});

	it('2. ONE WHILE ASYNC', function (done) {
		alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            ',
			[],
			function (res) {
				//                console.log("ASYNC:",res);
				assert.deepEqual(res, [1, [1, 1, 1]]);
				done();
			}
		);
	});

	it('3. ONE WHILE SYNC', function (done) {
		var res = alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            '
		);
		// console.log("SYNC:",res);
		assert.deepEqual(res, [1, [1, 1, 1]]);
		done();
	});
});
