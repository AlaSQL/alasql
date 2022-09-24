if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/restest278.json', {strict: false, ws: ''});
}

describe('Test 278 Errors catching', function() {
	it('1. Prepare databases', function(done) {
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS Atlas');
		alasql('SET AUTOCOMMIT OFF');
		alasql('ATTACH LOCALSTORAGE DATABASE Atlas AS MyAtlas');
		alasql('USE MyAtlas;');
		alasql('CREATE TABLE IF NOT EXISTS transactions (transid, payee, amount)');
		done();
	});

	it('2. Select from wrong database without errolog', function(done) {
		assert.throws(function() {
			alasql('SELECT * FROM addresses');
		}, Error);
		done();
	});

	it('2. Select from wrong database with errolog', function(done) {
		alasql.options.errorlog = true;
		alasql('SELECT * FROM addresses', [], function(res, err) {
			/// console.log(err);
			done();
		});
	});

	it('99. Drop databases', function(done) {
		alasql.options.errorlog = false;
		alasql('DETACH DATABASE MyAtlas');
		done();
	});
});
