if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + './restest267.json', {strict: false, ws: ''});
}

describe('Test 269 options', function() {
	var data1 = [{a: 1, b: 10}, {a: 2, b: 20}, {a: 3, b: 30}];
	var data2 = [{b: 10, c: 100}, {b: 20, c: 200}, {b: 40, c: 400}];

	it.skip('1. Create database', function(done) {
		alasql('CREATE DATABASE test269; USE test269');
		done();
	});

	it.skip('2. by default', function(done) {
		alasql.options.modifier = undefined;
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, [
			{a: 1, b: 10, c: 100},
			{a: 2, b: 20, c: 200},
			{a: 3, b: 30},
			{b: 40, c: 400},
		]);

		done();
	});

	it.skip('3. VALUE', function(done) {
		alasql.options.modifier = 'VALUE';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, 1);

		done();
	});

	it.skip('4. ROW', function(done) {
		alasql.options.modifier = 'ROW';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, [1, 10, 100]);

		done();
	});

	it.skip('5. COLUMN', function(done) {
		alasql.options.modifier = 'COLUMN';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, [1, 2, 3, undefined]);

		done();
	});

	it.skip('6. MATRIX', function(done) {
		alasql.options.modifier = 'MATRIX';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		//console.log(res);
		// Wrong with reduced rows
		assert.deepEqual(res, [
			[1, 10, 100],
			[2, 20, 200],
			[3, 30, undefined],
			[undefined, 40, 400],
		]);

		done();
	});

	it.skip('6a. MATRIX', function(done) {
		alasql.options.modifier = 'MATRIX';
		//    alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b \
      ORDER BY a', [
			data1,
			data2,
		]);
		console.log(res);
		// Wrong with reduced rows
		assert.deepEqual(res, [
			[undefined, 40, 400],
			[1, 10, 100],
			[2, 20, 200],
			[3, 30, undefined],
		]);

		done();
	});

	it.skip('7. RECORDSET', function(done) {
		alasql.options.modifier = 'RECORDSET';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		//console.log(res);
		// Wrong with reduced rows
		assert.deepEqual(res, {
			data: [{a: 1, b: 10, c: 100}, {a: 2, b: 20, c: 200}, {a: 3, b: 30}, {b: 40, c: 400}],
			columns: [{columnid: 'a'}, {columnid: 'b'}, {columnid: 'c'}],
		});
		done();
	});

	it.skip('8. INDEX', function(done) {
		alasql.options.modifier = 'INDEX';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, {'1': 10, '2': 20, '3': 30, undefined: 40});

		done();
	});

	it.skip('9. TEXTSTRING', function(done) {
		alasql.options.modifier = 'TEXTSTRING';
		var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b', [data1, data2]);
		assert.deepEqual(res, '1\n2\n3\n');

		done();
	});

	it.skip('99. Drop phase', function(done) {
		delete alasql.options.modifier;
		alasql('DROP DATABASE test269');
		done();
	});
});
