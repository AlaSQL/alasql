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
	var profiles = [
		{address: {city: {name: 'Paris', country: {name: 'France'}}}},
		{address: {city: {name: 'Berlin', country: {name: 'Germany'}}}},
		{address: {city: {name: 'Lyon', country: {name: 'France'}}}},
	];

	it('2. evaluates LET assignments before WHERE and SELECT', function () {
		let params = [profiles];
		let res = alasql(
			'SELECT $city.name AS city, $country AS country \
			FROM ? AS profiles \
			LET $city = profiles.address.city, $country = $city.country.name \
			WHERE $country = "France"',
			params
		);

		assert.deepStrictEqual(res, [
			{city: 'Paris', country: 'France'},
			{city: 'Lyon', country: 'France'},
		]);
		assert.strictEqual(params.city, undefined);
		assert.strictEqual(params.country, undefined);
	});

	it('3. restores existing named parameters after LET', function () {
		let params = {profiles: profiles, country: 'existing'};
		let res = alasql(
			'SELECT $country AS country \
			FROM $profiles AS profiles \
			LET $country = profiles.address.city.country.name \
			WHERE $country = "Germany"',
			params
		);

		assert.deepStrictEqual(res, [{country: 'Germany'}]);
		assert.strictEqual(params.country, 'existing');
	});

	it('4. supports LET values in GROUP BY and HAVING', function () {
		let params = {profiles: profiles};
		let res = alasql(
			'SELECT $country AS country, COUNT(*) AS cnt \
			FROM $profiles AS profiles \
			LET $country = profiles.address.city.country.name \
			GROUP BY $country \
			HAVING COUNT(*) > 1 \
			ORDER BY $country',
			params
		);

		assert.deepStrictEqual(res, [{country: 'France', cnt: 2}]);
	});

	it('5. restores temporary @variables after LET', function () {
		let res = alasql(
			'SELECT @let210city.name AS city, @let210country AS country \
			FROM ? AS profiles \
			LET @let210city = profiles.address.city, @let210country = @let210city.country.name \
			WHERE @let210country = "France"',
			[profiles]
		);

		assert.deepStrictEqual(res, [
			{city: 'Paris', country: 'France'},
			{city: 'Lyon', country: 'France'},
		]);
		assert.strictEqual(alasql.vars.let210city, undefined);
		assert.strictEqual(alasql.vars.let210country, undefined);
	});
});
