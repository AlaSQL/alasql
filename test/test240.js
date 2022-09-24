if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test239.json', {strict: false, ws: ''});
}

describe('Test 240 DELETE TEST', function() {
	it('1. Create dtabase', function(done) {
		alasql(function() {
			/*

    SET AUTOCOMMIT OFF;
    DROP localStorage DATABASE IF EXISTS ls240;
    CREATE localStorage DATABASE IF NOT EXISTS ls240;
    ATTACH LOCALSTORAGE DATABASE ls240 AS test240; 
    USE test240;

    CREATE TABLE IF NOT EXISTS one (a int, b string);
    
    INSERT INTO one VALUES (1,"Moscow"), (2, "Kyiv"), (3,"Minsk");
    
    */
		});

		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [{a: 1, b: 'Moscow'}, {a: 2, b: 'Kyiv'}, {a: 3, b: 'Minsk'}]);

		//    var res = alasql('COMMIT TRANSACTION');

		alasql('DELETE FROM one WHERE a = 3');

		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [{a: 1, b: 'Moscow'}, {a: 2, b: 'Kyiv'}]);

		alasql('DELETE FROM one WHERE 1=1');

		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, []);

		//	console.log(res);
		done();
	});

	it('8.Drop localStorage table', function(done) {
		alasql('DETACH DATABASE test240');
		alasql('DROP LOCALSTORAGE DATABASE ls240');
		done();
	});
});
