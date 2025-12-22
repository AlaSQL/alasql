if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test Window Functions - Feature Check', function () {
	before(function () {
		alasql('CREATE DATABASE test_wf_check;USE test_wf_check');
		alasql('CREATE TABLE test_data (category STRING, amount INT)');
		alasql('INSERT INTO test_data VALUES ("A", 10), ("A", 20), ("B", 30), ("B", 40)');
	});

	after(function () {
		alasql('DROP DATABASE test_wf_check');
	});

	it('1. ROW_NUMBER() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount) AS rn FROM test_data'
			);
			console.log('ROW_NUMBER() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('ROW_NUMBER() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('2. COUNT() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, COUNT(*) OVER (PARTITION BY category) AS cnt FROM test_data'
			);
			console.log('COUNT() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('COUNT() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('3. MAX() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, MAX(amount) OVER (PARTITION BY category) AS max_amt FROM test_data'
			);
			console.log('MAX() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('MAX() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('4. MIN() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, MIN(amount) OVER (PARTITION BY category) AS min_amt FROM test_data'
			);
			console.log('MIN() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('MIN() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('5. LEAD() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, LEAD(amount) OVER (PARTITION BY category ORDER BY amount) AS next_amt FROM test_data'
			);
			console.log('LEAD() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('LEAD() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('6. LAG() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, LAG(amount) OVER (PARTITION BY category ORDER BY amount) AS prev_amt FROM test_data'
			);
			console.log('LAG() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('LAG() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('7. FIRST_VALUE() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, FIRST_VALUE(amount) OVER (PARTITION BY category ORDER BY amount) AS first_amt FROM test_data'
			);
			console.log('FIRST_VALUE() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('FIRST_VALUE() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('8. LAST_VALUE() OVER (PARTITION BY)', function (done) {
		try {
			var res = alasql(
				'SELECT category, amount, LAST_VALUE(amount) OVER (PARTITION BY category ORDER BY amount) AS last_amt FROM test_data'
			);
			console.log('LAST_VALUE() OVER (PARTITION BY) - WORKS:', res);
			done();
		} catch (e) {
			console.log('LAST_VALUE() OVER (PARTITION BY) - ERROR:', e.message);
			done();
		}
	});

	it('9. CONCAT_WS()', function (done) {
		try {
			var res = alasql('SELECT CONCAT_WS("-", category, amount) AS combined FROM test_data');
			console.log('CONCAT_WS() - WORKS:', res);
			done();
		} catch (e) {
			console.log('CONCAT_WS() - ERROR:', e.message);
			done();
		}
	});

	it('10. CONCAT_WS() with GROUP BY', function (done) {
		try {
			var res = alasql(
				'SELECT category, CONCAT_WS(",", amount) AS amounts FROM test_data GROUP BY category'
			);
			console.log('CONCAT_WS() with GROUP BY - WORKS:', res);
			done();
		} catch (e) {
			console.log('CONCAT_WS() with GROUP BY - ERROR:', e.message);
			done();
		}
	});
});
