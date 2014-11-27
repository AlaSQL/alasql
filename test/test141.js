if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 141 text as source', function() {

	it("1. Source as a string", function(done){
		alasql('CREATE DATABASE test141; use test141');


		var txt = "one\ntwo\nthree\nfour\nfive\nsix\r\nseven\neight\r\nnine\nten";
		var days = alasql('select column * from ? where len([0]) <= 3',[txt]);
		assert.deepEqual(days, ['one','two','six','ten']);

		var myfn = function(i) {
			if(i>3) return;
			return {a:i, b:i*i};
		};

		var res = alasql('select * from ?',[myfn]);
		assert.deepEqual(res, [ { a: 0, b: 0 }, { a: 1, b: 1 }, { a: 2, b: 4 }, { a: 3, b: 9 }]);

		var myfn2 = function(i) {
			if(i>3) return;
			return {a:i, b:i*i};
		};
		myfn2.dontcache = true;

		var res = alasql('select * from ?',[myfn2]);
		assert.deepEqual(res, [ { a: 0, b: 0 }, { a: 1, b: 1 }, { a: 2, b: 4 }, { a: 3, b: 9 }]);

		var myfn3 = function(i) {
			if(i>3) return;
			return {a:i, c:2*i};
		};

		var res = alasql('select a, b, t.c from ? left join ? t using a',[myfn,myfn3]);
		assert.deepEqual(res, [ { a: 0, b:0, c: 0 }, { a: 1, b:1, c: 2 }, 
			{ a: 2, b:4, c: 4 }, { a: 3, b:9, c: 6 }]);
		console.log(res);


		var res = alasql('select a, b, t.c from ? right join ? t using a',[myfn,myfn3]);
		assert.deepEqual(res, [ { a: 0, b:0, c: 0 }, { a: 1, b:1, c: 2 }, 
			{ a: 2, b:4, c: 4 }, { a: 3, b:9, c: 6 }]);

		done();
	});



	it("99. Drop database", function(done){
		alasql('DROP DATABASE test141');
		done();
	});
});
