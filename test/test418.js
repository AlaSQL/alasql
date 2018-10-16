if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//var describe = require('mocha.parallel');
}

/*
	Test for issue #379
*/

var test = 418;

describe('Test ' + test + ' Load data from internet', function() {
	before(function(done) {
		alasql('CREATE DATABASE test' + test + '; USE test' + test);
		done();
	});

	after(function(done) {
		alasql('DROP DATABASE test' + test);
		done();
	});

	function testRequest(expected, url, headers, done) {
		var type = url
			.split('.')
			.pop()
			.toUpperCase();
		alasql(
			'VALUE OF SELECT COUNT(*) FROM ' + type + '("' + url + '",{headers:' + headers + '})',
			[],
			function(res) {
				assert.equal(res, expected);
				done();
			}
		);
	}

	describe('.xlsx from URL', function() {
		var url =
			'raw.githubusercontent.com/agershun/alasql/develop/test/test411.xlsx';

		it('Load http', function(done) {
			this.timeout(7000);
			testRequest(4, 'http://' + url, 'true', done);
		});

		it('Load https', function(done) {
			this.timeout(7000);
			testRequest(4, 'https://' + url, 'true', done);
		});
	});

	describe('.xls from URL', function() {
		var url =
			'raw.githubusercontent.com/agershun/alasql/develop/test/test168.xls';

		it('Load http', function(done) {
			this.timeout(5000);
			testRequest(5, 'http://' + url, 'true', done);
		});

		it('Load https', function(done) {
			this.timeout(5000);
			testRequest(5, 'https://' + url, 'true', done);
		});
	});

	describe('.json from URL', function() {
		var url =
			'raw.githubusercontent.com/agershun/alasql/develop/test/test157.json';

		it('Load http', function(done) {
			this.timeout(5000);
			testRequest(2, 'http://' + url, 'false', done);
		});

		it('Load https', function(done) {
			this.timeout(5000);
			testRequest(2, 'https://' + url, 'false', done);
		});
	});

	describe('.tab from URL', function() {
		var url =
			'raw.githubusercontent.com/agershun/alasql/develop/test/test157.tab';

		it('Load http', function(done) {
			this.timeout(5000);
			testRequest(5, 'http://' + url, 'false', done);
		});

		it('Load https', function(done) {
			this.timeout(5000);
			testRequest(5, 'https://' + url, 'false', done);
		});
	});

	describe('.txt from URL', function() {
		var url =
			'raw.githubusercontent.com/agershun/alasql/develop/test/test157.txt';

		it('Load http', function(done) {
			this.timeout(5000);
			testRequest(8, 'http://' + url, 'false', done);
		});

		it('Load https', function(done) {
			this.timeout(5000);
			testRequest(8, 'https://' + url, 'false', done);
		});
	});

	describe('.csv from URL', function() {
		var url =
			'raw.githubusercontent.com/agershun/alasql/develop/test/test157a.csv';

		it('Load http', function(done) {
			this.timeout(5000);
			testRequest(5, 'http://' + url, 'false', done);
		});

		it('Load https', function(done) {
			this.timeout(5000);
			testRequest(5, 'https://' + url, 'false', done);
		});
	});
});
