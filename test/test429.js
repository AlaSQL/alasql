if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test429.json', {strict: false, ws: ''});
}

describe.skip('Test 429', function () {
	it('Localstorage DELETE with WHERE clause', function (done) {
		alasql('SET AUTOCOMMIT ON');
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ls429');
		alasql('ATTACH LOCALSTORAGE DATABASE ls429');
		alasql('CREATE TABLE IF NOT EXISTS ls429.one (str string)');
		alasql("INSERT INTO ls429.one VALUES ('a')");
		alasql("INSERT INTO ls429.one VALUES ('b')");
		alasql("DELETE FROM ls429.one WHERE str = 'a'");
		alasql("INSERT INTO ls429.one VALUES ('a')");
		alasql("DELETE FROM ls429.one WHERE str = 'b'");
		alasql("INSERT INTO ls429.one VALUES ('b')");
		alasql("DELETE FROM ls429.one WHERE str = 'a'");
		var res = alasql('SELECT * FROM ls429.one');
		assert.deepEqual(res, [{str: 'b'}]);
		done();
	});
});
