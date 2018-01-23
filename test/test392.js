if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on this article:

*/

describe('Test 392 Observable (issue #499)', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test392;USE test392');
		done();
	});

	it.skip('2. Prepare test data', function(done) {
		//    var test = 0;

		alasql('CREATE TABLE one (a INT, b STRING)');

		Array.observe(alasql.databases.test392.tables.one.data, function(args) {
			//      test++;
			//      console.log('changed',arguments);
		});

		alasql('INSERT INTO one VALUES (10,"Ten")');
		alasql('UPDATE one SET a = 20 WHERE a = 10');
		alasql('DELETE FROM one WHERE a = 20');

		//console.log(test);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test392');
		done();
	});
});
