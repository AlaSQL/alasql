if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 210 WHILE BREAK CONTINUE', function () {
	/** @todo Add CONTINUE operator */

	// please let done depend on output
	it.skip('1. WHILE BREAK', function (done) {
		alasql(
			'SET @i = 1; \
            WHILE @i < 5 \
            BEGIN \
                -- PRINT 1,@i, @i*10;\
                SET @i = @i + 1;\
                IF @i % 2 = 0 CONTINUE; \
                -- PRINT "ODD"\
                ;\
             END',
			[],
			function () {
				/// console.log('ok');
				done();
			}
		);
	});
});
