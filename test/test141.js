if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 141 text as source', function() {

	it("1. Source as a string", function(done){
		alasql('CREATE DATABASE test141; use test141');


		var txt = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten";
		var res = alasql('select * from ? where len([0]) <= 3',[txt]);
		console.log(res);

		var res = alasql('select text * from ? where [0]->length > 3',[txt]);
		console.log(res);

		done();
	});



	it("99. Drop database", function(done){
		alasql('DROP DATABASE test141');
		done();
	});
});
