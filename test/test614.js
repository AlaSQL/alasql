if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '614'; // insert test file number

describe('Test ' + test + ' - Read data from columns irrespective of case in query', function () {
	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
		alasql.options.casesensitive = true;
	});

	describe('1) casesensitive option set to false, data will be present', function () {
		beforeEach(function () {
			alasql.options.casesensitive = false;
		});

		afterEach(function () {
			alasql.options.casesensitive = true;
		});

		it('A) Mixed case header with Camel case select', function (done) {
			alasql('SELECT Account FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (res) {
				// using lower case value of header text irrespective of the original case in file
				// because when casesensitive option is set to false alasql converts all header texts to lowercase
				assert.equal(res[0]['Account'.toLowerCase()], 12);
				done();
			});
		});

		it('B) UPPER case header and Lower case header with Camel case select', function (done) {
			alasql('SELECT Amount, Comments FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (
				res
			) {
				assert.equal(res[0]['Amount'.toLowerCase()], 500);
				assert.equal(res[0]['Comments'.toLowerCase()], 'present');
				done();
			});
		});
	});

	describe('2) casesensitive option has default value which is true, data will not be present', function () {
		it('A) Mixed case header, Upper case header and Lower case header with Camel case select', function (done) {
			alasql(
				'SELECT Account, Amount, Comments FROM XLSX("' + __dirname + '/test614.xlsx")',
				[],
				function (res) {
					// console.log(res[0]);
					assert.equal(res[0]['Account'], undefined);
					assert.equal(res[0]['Amount'], undefined);
					assert.equal(res[0]['Comments'], undefined);
					done();
				}
			);
		});
	});
});
