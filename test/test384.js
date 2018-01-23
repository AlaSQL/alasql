if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test381.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 384 - NOT NULL error when copying from another table issue #471', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test384;USE test384');
		done();
	});

	it('3. Create table issue - many statements', function(done) {
		alasql.options.modifier = 'MATRIX';
		alasql('CREATE TABLE tab3 (pk INTEGER NOT NULL)');
		alasql('CREATE TABLE tab4 (pk INTEGER NOT NULL)');
		alasql('INSERT INTO tab3 VALUES(3)');
		alasql('INSERT INTO tab4 SELECT * FROM tab3');

		var res = alasql('SELECT * FROM tab3');
		assert.deepEqual(res, [[3]]);

		done();
	});

	if (false) {
		it('2. Create table issue - one statement', function(done) {
			alasql.options.modifier = 'MATRIX';
			alasql(function() {
				/*
      CREATE TABLE tab0 (pk INTEGER NOT NULL);
      CREATE TABLE tab1 (pk INTEGER NOT NULL);
      INSERT INTO tab0 VALUES(3);
      INSERT INTO tab1 SELECT * FROM tab0;
    */
			});

			var res = alasql('SELECT * FROM tab3');
			assert.deepEqual(res, [[3]]);

			done();
		});
	}

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test384');
		done();
	});
});
