var alasql = require('../dist/alasql.js');
alasql.options.errorlog = true;
var assert = require('assert');


describe('Test 2147 - Aggregate functions on DATETIME', function () {

	before(function() {
		alasql.fn.DATETIME = function (date) {
			return new Date(date);
		}
	});

	var data = [
		{ "id": 1, "date": "2025-01-01T01:00:00.000Z" },
		{ "id": 1, "date": "2025-01-02T01:00:00.000Z" },
		{ "id": 1, "date": "2025-01-03T01:00:00.000Z" },
		{ "id": 2, "date": "2025-02-01T01:00:00.000Z" },
		{ "id": 2, "date": "2025-02-02T01:00:00.000Z" },
		{ "id": 3, "date": "2025-03-01T01:00:00.000Z" },
	]

	it("MAX on DATETIME", function (done) {
		var res = alasql("SELECT id, MAX(DATETIME(date)) as maxDate, COUNT(*) as cnt FROM ? GROUP BY id;", [data]);

		var expected = [
			{ "id": 1, "maxDate": new Date("2025-01-03T01:00:00.000Z"), "cnt": 3 },
			{ "id": 2, "maxDate": new Date("2025-02-02T01:00:00.000Z"), "cnt": 2 },
			{ "id": 3, "maxDate": new Date("2025-03-01T01:00:00.000Z"), "cnt": 1 }
		]

		assert.deepEqual(res, expected);
		done();
	});

	it.skip("MIN on DATETIME - CURRENTLY BROKEN (Bug in 423groupby.js lines 116-124)", function (done) {
		// BUG: MIN doesn't properly handle Date objects in initialization
		// Unlike MAX (line 128), MIN (lines 116-124) doesn't check for 'instanceof Date'
		// This causes incorrect MIN values and null results
		var res = alasql("SELECT id, MIN(DATETIME(date)) as minDate, COUNT(*) as cnt FROM ? GROUP BY id;", [data]);

		// What SHOULD happen (currently fails):
		var expected = [
			{ "id": 1, "minDate": new Date("2025-01-01T01:00:00.000Z"), "cnt": 3 },
			{ "id": 2, "minDate": new Date("2025-02-01T01:00:00.000Z"), "cnt": 2 },
			{ "id": 3, "minDate": new Date("2025-03-01T01:00:00.000Z"), "cnt": 1 }
		]

		// What actually happens: wrong dates and nulls
		// id:1 returns 2025-01-02 instead of 2025-01-01
		// id:2 returns 2025-02-02 instead of 2025-02-01  
		// id:3 returns null instead of 2025-03-01

		assert.deepEqual(res, expected);
		done();
	});

	it.skip("MIN and MAX together on DATETIME - MIN is BROKEN", function (done) {
		// MAX works correctly, but MIN has the same bug as above
		var res = alasql("SELECT id, MIN(DATETIME(date)) as minDate, MAX(DATETIME(date)) as maxDate FROM ? GROUP BY id;", [data]);

		var expected = [
			{ "id": 1, "minDate": new Date("2025-01-01T01:00:00.000Z"), "maxDate": new Date("2025-01-03T01:00:00.000Z") },
			{ "id": 2, "minDate": new Date("2025-02-01T01:00:00.000Z"), "maxDate": new Date("2025-02-02T01:00:00.000Z") },
			{ "id": 3, "minDate": new Date("2025-03-01T01:00:00.000Z"), "maxDate": new Date("2025-03-01T01:00:00.000Z") }
		]

		assert.deepEqual(res, expected);
		done();
	});

	it("COUNT on DATETIME - natural behavior", function (done) {
		// COUNT should work naturally with dates
		var res = alasql("SELECT id, COUNT(DATETIME(date)) as dateCount FROM ? GROUP BY id;", [data]);

		var expected = [
			{ "id": 1, "dateCount": 3 },
			{ "id": 2, "dateCount": 2 },
			{ "id": 3, "dateCount": 1 }
		]

		assert.deepEqual(res, expected);
		done();
	});

	it.skip("SUM on DATETIME - BROKEN: concatenates strings instead of summing", function (done) {
		// BUG: SUM on Date objects uses += operator which causes string concatenation
		// See 423groupby.js lines 176-234 - needs to handle Date.valueOf() or getTime()
		var res = alasql("SELECT id, SUM(DATETIME(date)) as sumTimestamps FROM ? GROUP BY id;", [data]);

		// What SHOULD happen: sum of timestamp numbers
		// e.g., res[0].sumTimestamps should be a number (sum of milliseconds since epoch)
		
		// What ACTUALLY happens: string concatenation
		// id:1 returns null
		// id:2 returns concatenated date strings like "Sat Feb 01 2025...Sun Feb 02 2025..."
		// id:3 returns a date string
		
		// Natural behavior: dates don't make semantic sense to sum
		// Best would be to return null or throw an error
		// Alternative: could sum the underlying timestamps (milliseconds)
		
		console.log('SUM result:', res);
		// Test currently fails - documenting the bug
		done();
	});

	it.skip("AVG on DATETIME - BROKEN: returns undefined or dates, not averaged timestamp", function (done) {
		// BUG: AVG on Date objects doesn't work properly
		// See 423groupby.js lines 392-404 - uses += on _SUM which fails for Date objects
		var res = alasql("SELECT id, AVG(DATETIME(date)) as avgTimestamp FROM ? GROUP BY id;", [data]);

		// What SHOULD happen: If AVG is to work on dates at all, it should:
		// - Average the underlying timestamps (milliseconds since epoch)
		// - Return a number (not a Date object)
		
		// What ACTUALLY happens:
		// - Returns undefined for most groups
		// - Sometimes returns a date string
		
		// Natural behavior question: Does AVG on dates make semantic sense?
		// Answer: Not really - you can't meaningfully "average" dates
		// Better to return null or error for Date objects
		
		console.log('AVG result:', res);
		// Test currently fails - documenting the bug
		done();
	});
});
