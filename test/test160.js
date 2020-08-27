if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports == 'object') {

if (false) {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test159.json', {strict: false, ws: ''});

	describe('Test 160 - load text file, csv, tab, and other functions', function () {
		it('1. Text file', function (done) {
			alasql(
				"select column * from txt('test160.txt') where [0] like 'M%' order by [0]",
				[],
				function (res) {
					assert(res, ['Madrid', 'Minsk', 'Mogadisho']);
					done();
				}
			);
		});

		it('2. TAB file without headers', function (done) {
			alasql(
				"select column [1] from tab('test160.tab') where [0] like 'M%' order by [1]",
				[],
				function (res) {
					assert(res, [10, 20, 30]);
					done();
				}
			);
		});

		it('3. TAB file with headers', function (done) {
			alasql(
				"select column population from tab('test160h.tab',{headers:true}) where city like 'M%' order by population",
				[],
				function (res) {
					assert(res, [10, 20, 30]);
					done();
				}
			);
		});

		it('4. CSV file without headers', function (done) {
			alasql(
				"select column [1] from csv('test160.csv') where [0] like 'M%' order by [1]",
				[],
				function (res) {
					assert(res, [10, 20, 30]);
					done();
				}
			);
		});

		it('5. CSV file with headers', function (done) {
			alasql(
				"select column population from csv('test160h.csv',{headers:true}) where city like 'M%' order by population",
				[],
				function (res) {
					assert(res, [10, 20, 30]);
					done();
				}
			);
		});

		it('6. CSV file with headers with semicolon', function (done) {
			alasql(
				"select column population from csv('test160hs.csv',{headers:true, separator:';'}) where city like 'M%' order by population",
				[],
				function (res) {
					assert(res, [10, 20, 30]);
					done();
				}
			);
		});

		it('4. CSV file without extension', function (done) {
			alasql(
				"select column [1] from csv('test160') where [0] like 'M%' order by [1]",
				[],
				function (res) {
					assert(res, [10, 20, 30]);
					done();
				}
			);
		});
	});
}
