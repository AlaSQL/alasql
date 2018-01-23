if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage(__dirname + '/restest267.json', {strict: false, ws: ''});
}

describe('Test 267 LocalStorage test', function() {
	it('1. First pass', function(done) {
		var data = [{name: 'first'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	it('2. Second pass', function(done) {
		var data = [{name: 'second'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	it('3. Detach', function(done) {
		alasql('DETACH DATABASE db');
		done();
	});

	it('4. Third pass', function(done) {
		var data = [{name: 'third'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	it('5. Fifth pass', function(done) {
		var data = [{name: 'fifth'}];
		alasql('CREATE localStorage DATABASE IF NOT EXISTS db');
		alasql('ATTACH localStorage DATABASE db');
		alasql('USE db');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('SELECT * INTO test FROM ?', [data]);
		var res = alasql('SELECT * FROM test');
		/// console.log(res);
		done();
	});

	it('6. Drop phase', function(done) {
		alasql('DETACH DATABASE db');
		alasql('DROP LOCALSTORAGE DATABASE db');
		done();
	});

	it('7. Second phase phase', function(done) {
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS test267');
		alasql('ATTACH LOCALSTORAGE DATABASE test267');
		alasql('USE test267');
		alasql('CREATE TABLE IF NOT EXISTS test');
		alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS test267');
		alasql('ATTACH LOCALSTORAGE DATABASE test267');
		alasql('USE test267');
		alasql('CREATE TABLE IF NOT EXISTS test');
		done();
	});

	it('8. Drop phase', function(done) {
		//    alasql('DETACH DATABASE db1');
		//    alasql('DROP LOCALSTORAGE DATABASE db1');
		done();
	});
});
