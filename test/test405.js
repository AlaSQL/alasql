if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

if (typeof exports !== 'object') {
	describe('Test 405. IndexDB problem (issue #512)', function () {
		it('1. Parse SQL', function (done) {
			//      alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS geo;')
			alasql(
				'CREATE INDEXEDDB DATABASE IF NOT EXISTS geo;\
        ATTACH INDEXEDDB DATABASE geo; \
        USE geo; \
        DROP TABLE IF EXISTS cities; \
        CREATE TABLE cities;\
      ',
				[],
				function () {
					done();
				}
			);
		});

		// done();
	});
}
