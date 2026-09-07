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

describe('Test 210 LET clause', function () {
	it('2. evaluates LET assignments before WHERE and SELECT', function () {
		let params = [
			[
				{address: {city: {name: 'Paris', country: {name: 'France'}}}},
				{address: {city: {name: 'Berlin', country: {name: 'Germany'}}}},
			],
		];
		let res = alasql(
			'SELECT $city.name AS city, $country AS country \
			FROM ? AS profiles \
			LET $city = profiles.address.city, $country = $city.country.name \
			WHERE $country = "France"',
			params
		);

		assert.deepStrictEqual(res, [{city: 'Paris', country: 'France'}]);
		assert.strictEqual(params.city, undefined);
		assert.strictEqual(params.country, undefined);
	});
});
