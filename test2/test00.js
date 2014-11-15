if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 00', function() {
	it('Single statement', function(done){
		alasql('create database test00');
		done();
	});
});
