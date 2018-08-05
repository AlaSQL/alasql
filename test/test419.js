if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 419;

describe('Test ' + test + ' Load data from text file with default headers option', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Load TXT', function(done) {
		alasql('SELECT * FROM TXT("' + __dirname + '/test419a.txt")', [], function(res) {
			assert.deepEqual(res, [
				{'0': 'words,letters'},
				{'0': 'There,5'},
				{'0': 'are,3'},
				{'0': 'five,4'},
				{'0': 'lines,5'},
			]);
			done();
		});
	});

	it('2. Load CSV with {headers:true}', function(done) {
		alasql('SELECT * FROM CSV("' + __dirname + '/test419a.txt",{headers:true})', [], function(
			res
		) {
			assert.deepEqual(res, [
				{words: 'There', letters: 5},
				{words: 'are', letters: 3},
				{words: 'five', letters: 4},
				{words: 'lines', letters: 5},
			]);
			done();
		});
	});

	it('3. Load CSV by default', function(done) {
		alasql('SELECT * FROM CSV("' + __dirname + '/test419a.txt")', [], function(res) {
			assert.deepEqual(res, [
				{words: 'There', letters: 5},
				{words: 'are', letters: 3},
				{words: 'five', letters: 4},
				{words: 'lines', letters: 5},
			]);
			done();
		});
	});

	it('4. Load CSV with {headers:false}', function(done) {
		alasql('SELECT * FROM CSV("' + __dirname + '/test419a.txt",{headers:false})', [], function(
			res
		) {
			assert.deepEqual(res, [
				{'0': 'words', '1': 'letters'},
				{'0': 'There', '1': '5'},
				{'0': 'are', '1': '3'},
				{'0': 'five', '1': '4'},
				{'0': 'lines', '1': '5'},
			]);
			done();
		});
	});

	it('4. Load XLSX with {headers:true}', function(done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test419.xlsx",{headers:true})', [], function(
			res
		) {
			assert.deepEqual(res, [
				{words: 'don’t', letters: 1},
				{words: 'come', letters: 2},
				{words: 'easy', letters: 3},
			]);
			done();
		});
	});

	it('5. Load XLSX', function(done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test419.xlsx")', [], function(res) {
			assert.deepEqual(res, [
				{words: 'don’t', letters: 1},
				{words: 'come', letters: 2},
				{words: 'easy', letters: 3},
			]);
			done();
		});
	});

	it('6. Load XLSX with {headers:true}', function(done) {
		alasql('SELECT * FROM XLSX("' + __dirname + '/test419.xlsx",{headers:false})', [], function(
			res
		) {
			assert.deepEqual(res, [
				{A: 'words', B: 'letters'},
				{A: 'don’t', B: 1},
				{A: 'come', B: 2},
				{A: 'easy', B: 3},
			]);
			done();
		});
	});
});
