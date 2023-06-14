if (typeof exports === 'object') {
	var assert = require('assert');
	var {unlink} = require('fs');
	var alasql = require('..');
} else {
	__dirname = '.';
}

(alasql.utils.isNode ? describe : describe.skip)('Test 815 date parsing options', function () {
	var now = new Date();
	var unixepoch = new Date(0);

	this.beforeAll(() => {
		unlink('test/test815.xlsx', () => {});
	});
	this.afterAll(() => {
		unlink('test/test815.xlsx', () => {});
	});

	it('1. stores date and retrieves date correctly', function (done) {
		alasql('CREATE TABLE dates (date datetime)');
		alasql('INSERT INTO dates (?)', [now]);
		alasql('INSERT INTO dates (?)', [unixepoch]);

		var res = alasql('SELECT * FROM dates');

		assert.deepEqual(res[0].date, now);
		assert.deepEqual(res[1].date, unixepoch);

		done();
	});
	it('2. XLSX parses date as number', function () {
		return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(function () {
			return alasql
				.promise('SELECT * FROM xlsx("test/test815.xlsx", {cellDates: false})')
				.then(function (res) {
					assert.equal(typeof res[0].date, 'number');
					assert.equal(typeof res[1].date, 'number');
				});
		});
	});
	it('3. XLSX parses date as date', function () {
		return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(function () {
			return alasql.promise('SELECT * FROM xlsx("test/test815.xlsx")').then(function (res) {
				assert.equal(res[0].date instanceof Date, true);
				assert.equal(res[1].date instanceof Date, true);
				// next assertion is like this since it is often off by 1 millisecond in CI.
				// this asserts that the time difference between now and alasql's date is less than 100 milliseconds
				assert.equal(res[0].date.getTime() - now.getTime() < 100, true);
				assert.equal(res[1].date.getTime() - unixepoch.getTime() < 100, true);
			});
		});
	});
});
