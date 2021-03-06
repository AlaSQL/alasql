if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 156 - match()', function () {
	it('1. Multiple lines async', function (done) {
		alasql(
			'CREATE DATABASE test156; USE test156;' +
				'CREATE TABLE one (a string);' +
				'INSERT INTO one VALUES ("Moscow"), ("Frankfurt"), ("Paris");' +
				'SELECT * FROM one WHERE a->match(?)' +
				'',
			['Moscow'],
			function (res) {
				//		 	console.log(res[4]);
				assert.deepEqual(res[4], [{a: 'Moscow'}]);
				done();
			}
		);
	});

	//https://docs.oracle.com/cd/B19306_01/appdev.102/b14251/adfns_regexp.htm
	if (false) {
		it('2. RegExp like Oracle functions', function (done) {
			alasql('SELECT * FROM one WHERE REGEXP_LIKE(a,"Mos")');
			assert.deepEqual(res, [{a: 'Moscow'}]);

			alasql(
				'SELECT VALUE REGEXP_REPLACE(a,"Moscow","London") FROM one WHERE REGEXP_LIKE(a,"Mos.*")'
			);
			assert(res == 'London');

			alasql('SELECT VALUE REGEXP_INSTR(a,"osco") FROM one WHERE REGEXP_LIKE(a,"Mos.*")');
			assert(res == 2);

			alasql('SELECT VALUE REGEXP_SUBSTR(a,"osco") FROM one WHERE REGEXP_LIKE(a,"Mos.*")');
			assert(res == 'osco');

			done();
		});

		it('3. Criterias for WHERE like MongoDB', function (done) {
			alasql('SELECT * FROM one WHERE CRITERIA(@{a:"Moscow"})');
			assert.deepEqual(res, [{a: 'Moscow'}]);

			alasql('SELECT * FROM one WHERE CRITERIA(@{a:?})', ['Moscow']);
			assert.deepEqual(res, [{a: 'Moscow'}]);

			// Do we really need this?
			alasql('SELECT * FROM one WHERE CRITERIA(?)', [{a: 'Moscow'}]);
			assert.deepEqual(res, [{a: 'Moscow'}]);

			done();
		});
	}

	it('99. Drop database', function (done) {
		alasql('drop database test156');
		done();
	});
});

//}
