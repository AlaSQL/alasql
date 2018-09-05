if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 625', function() {
	it('1. Get sheet by position 0', function(done) {
		alasql.promise('select * from xlsx("test625.xlsx",{sheetid:0})')
		.then(function(data){
			assert.equal(data[0]['Data'], 'In.Sheet1');
			done();
		});
	  });
	it('2. Get sheet by position 3', function(done) {
		alasql.promise('select * from xlsx("test625.xlsx",{sheetid:3})')
		.then(function(data){
			assert.equal(data[0]['Data'], 'In.Unknown');
			done();
		});
  	});
});
