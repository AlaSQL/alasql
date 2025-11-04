describe.skip('Test 2155 - ROUND should return null for null input', function () {
	it('ROUND(null) should return null, not undefined or 0', function (done) {
		var res = alasql('SELECT ROUND(null) as r FROM ?', [[{id: 1}]]);

		assert.strictEqual(res[0].r, null, 'ROUND(null) should return null');
		done();
	});

	it('ROUND("123.4") should return 123', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['123.4']);

		assert.strictEqual(res[0].r, 123, 'ROUND("123.4") should round to 123');
		done();
	});

	it('ROUND("abc") should return null', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['abc']);

		assert.strictEqual(res[0].r, null, 'ROUND("abc") should return null for non-numeric');
		done();
	});

	it('ROUND("") should return null', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['']);

		assert.strictEqual(res[0].r, null, 'ROUND("") should return null for empty string');
		done();
	});

	it('ROUND("0") should return 0', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['0']);

		assert.strictEqual(res[0].r, 0, 'ROUND("0") should return 0');
		done();
	});

	it('ROUND("null") should return null', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['null']);

		assert.strictEqual(res[0].r, null, 'ROUND("null") should return null for string "null"');
		done();
	});

	it('ROUND("  ") should return null', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['  ']);

		assert.strictEqual(res[0].r, null, 'ROUND("  ") should return null for whitespace');
		done();
	});

	it('ROUND("00") should return 0', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['00']);

		assert.strictEqual(res[0].r, 0, 'ROUND("00") should return 0 for variant zero');
		done();
	});

	it('ROUND("0.0") should return 0', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['0.0']);

		assert.strictEqual(res[0].r, 0, 'ROUND("0.0") should return 0 for decimal zero');
		done();
	});

	it('ROUND("0 ") should return 0', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['0 ']);

		assert.strictEqual(res[0].r, 0, 'ROUND("0 ") should return 0 for spaced zero');
		done();
	});

	it('SUM(ROUND(null)) should return null when all values are null', function (done) {
		var data = [{a: null}, {a: null}];

		var res = alasql('SELECT SUM(ROUND(a)) as sum_a FROM ?', [data]);

		assert.strictEqual(res[0].sum_a, null, 'SUM of all ROUND(null) should be null');
		done();
	});

	it('ROUND with mix of null and numbers', function (done) {
		var data = [{a: null}, {a: 5.7}, {a: null}, {a: 3.2}];

		var res = alasql('SELECT SUM(ROUND(a)) as sum_a FROM ?', [data]);

		assert.strictEqual(res[0].sum_a, 9, 'SUM(ROUND(a)) should sum only non-null values');
		done();
	});

	it('ROUND(string) should return null', function (done) {
		var res = alasql('SELECT ROUND(?) as r', ['XYZ']);

		assert.strictEqual(res[0].r, null, 'ROUND of non-numeric string should return null');
		done();
	});

	it('SUM(ROUND(string)) should return null when all values are strings', function (done) {
		var data = [{e: 'XYZ1'}, {e: 'XYZ2'}];

		var res = alasql('SELECT SUM(ROUND(e)) as sum_e FROM ?', [data]);

		assert.strictEqual(res[0].sum_e, null, 'SUM of all ROUND(string) should be null');
		done();
	});
});
