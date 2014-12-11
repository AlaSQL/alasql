if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {
describe('Test 157 - json()', function() {

	it("1. Load text data from file async", function(done){
		alasql('select * from json("test157.json")',[],function(res){
//			console.log(res);
			assert.deepEqual(res, [{a:1},{a:2}]);
			done();
		});
	});


	it("2. Load text data from file sync ", function(done){
		var res = alasql('select * from json("test157.json")');
		assert.deepEqual(res, [{a:1},{a:2}]);
		done();
	});

	it("3. Load text file", function(done){
		alasql('select column * from txt("test157.txt") where [0] like "M%" order by [0]',[],function(res){
//			console.log(res);
			assert.deepEqual(res, ["Madrid","Milano","Minsk","Moscow"]);
			done();
		});
	});

	it("4. Load tab-separated file", function(done){
		alasql('select column * from tab("test157.tab") where [1] > 100 order by [0]',[],function(res){
			assert.deepEqual(res, ["Astana","Tokyo","Vitebsk"]);
			done();
		});
	});

	it("5. Load CSV-file", function(done){
		alasql('select column * from csv("test157a.csv") where [1] > 100 order by [0]',[],function(res){
			assert.deepEqual(res, ["Astana","Tokyo","Vitebsk"]);
			done();
		});
	});


});


