if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 155 - InsexedDB INSERT', function() {

	it("1. Multiple lines async", function(done){
		alasql('DROP IndexedDB DATABASE IF EXISTS ag155;'+
			'CREATE IndexedDB DATABASE ag155;'+
			'ATTACH IndexedDB DATABASE ag155 AS test155;'+
			'CREATE TABLE test155.one;'+
			'INSERT INTO test155.one VALUES @{a:10};'+
			'', [], function(res){
		 	console.log(950, res);
			done();
		});
	});


});

}

