if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1936 - Check CURDATE', function () {
	it('CURDATE in SELECT - as Date', function () {
		alasql.options.dateAsString = false;
		let result = alasql(
			'SELECT CURDATE AS date1, CURRENT_DATE AS date2, CURDATE(), CURRENT_DATE()'
		);

		assert.ok(result[0]['date1'] instanceof Date);
		assert.ok(result[0]['date1'].getHours() === 0);
		assert.ok(result[0]['date1'].getMinutes() === 0);
		assert.ok(result[0]['date1'].getSeconds() === 0);

		assert.ok(result[0]['date2'] instanceof Date);
		assert.ok(result[0]['date2'].getHours() === 0);
		assert.ok(result[0]['date2'].getMinutes() === 0);
		assert.ok(result[0]['date2'].getSeconds() === 0);

		assert.ok(result[0]['CURDATE()'] instanceof Date);
		assert.ok(result[0]['CURDATE()'].getHours() === 0);
		assert.ok(result[0]['CURDATE()'].getMinutes() === 0);
		assert.ok(result[0]['CURDATE()'].getSeconds() === 0);

		assert.ok(result[0]['CURRENT_DATE()'] instanceof Date);
		assert.ok(result[0]['CURRENT_DATE()'].getHours() === 0);
		assert.ok(result[0]['CURRENT_DATE()'].getMinutes() === 0);
		assert.ok(result[0]['CURRENT_DATE()'].getSeconds() === 0);
	});

	it('CURDATE in SELECT - as String', function () {
		alasql.options.dateAsString = true;
		let result = alasql(
			'SELECT CURDATE AS date1, CURRENT_DATE AS date2, CURDATE(), CURRENT_DATE()'
		);

		assert.ok(typeof result[0]['date1'] === 'string');
		assert.ok(!result[0]['date1'].includes('00:00:00'));

		assert.ok(typeof result[0]['date2'] === 'string');
		assert.ok(!result[0]['date2'].includes('00:00:00'));

		assert.ok(typeof result[0]['CURDATE()'] === 'string');
		assert.ok(!result[0]['CURDATE()'].includes('00:00:00'));

		assert.ok(typeof result[0]['CURRENT_DATE()'] === 'string');
		assert.ok(!result[0]['CURRENT_DATE()'].includes('00:00:00'));
	});
});
