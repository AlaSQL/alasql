if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
}

var test = '612'; // insert test file number

describe('Test ' + test + ' - INTO CSV', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		alasql('CREATE TABLE one (a INT, b VARCHAR)');
		alasql("INSERT INTO one VALUES (10, 'swoll')," + "(11, 'muscles')");
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
		fs.unlink('test612-0.csv', function (err) {});
		fs.unlink('test612-1.csv', function (err) {});
		fs.unlink('test612-2.csv', function (err) {});
		fs.unlink('test612-3.csv', function (err) {});
		fs.unlink('test612-4.csv', function (err) {});
	});

	it("With quote = '', single string value", function () {
		return alasql
			.promise("SELECT 'swing' AS `colname` INTO CSV('test612-0', {quote:''})")
			.then(function (state) {
				var filecontents = fs.readFileSync('test612-0.csv', 'utf8');
				// must include the BOM at the beginning
				assert(filecontents === '\ufeffcolname\r\nswing\r\n');
			});
	});

	it("With quote = '', single multiword string value", function () {
		return alasql
			.promise("SELECT 'swing out' AS `colname` INTO CSV('test612-1', {quote:''})")
			.then(function (state) {
				var filecontents = fs.readFileSync('test612-1.csv', 'utf8');
				// must include the BOM at the beginning
				assert(filecontents === '\ufeffcolname\r\nswing out\r\n');
			});
	});

	it("With quote = '', multiple rows", function () {
		return alasql
			.promise("SELECT a, b INTO CSV('test612-2', {quote:''}) FROM one")
			.then(function (state) {
				var filecontents = fs.readFileSync('test612-2.csv', 'utf8');
				// must include the BOM at the beginning
				assert(filecontents === '\ufeffa;b\r\n10;swoll\r\n11;muscles\r\n');
			});
	});

	it("With quote = '\\?', single multiword string value", function () {
		return alasql
			.promise("SELECT 'swing out' AS `colname` INTO CSV('test612-3', {quote:'?'})")
			.then(function (state) {
				var filecontents = fs.readFileSync('test612-3.csv', 'utf8');
				// must include the BOM at the beginning
				assert(filecontents === '\ufeff?colname?\r\n?swing out?\r\n');
			});
	});

	it("With quote = '\\?', single multiword string containing ?", function () {
		return alasql
			.promise("SELECT 'swing?out' AS `colname` INTO CSV('test612-4', {quote:'?'})")
			.then(function (state) {
				var filecontents = fs.readFileSync('test612-4.csv', 'utf8');
				// must include the BOM at the beginning
				assert(filecontents === '\ufeff?colname?\r\n?swing??out?\r\n');
			});
	});
});
