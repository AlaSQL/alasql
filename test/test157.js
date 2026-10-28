if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {
describe('Test 157 - json()', function() {

	it("1. Load text data from file async", function(done){
		alasql('select * from json("test157.json")',[],function(res){
//			console.log(13,res);
			assert.deepEqual(res, [{a:1},{a:2}]);
			done();
		});
	});

	it("3. Load text file", function(done){
		alasql('select column * from txt("test157.txt") where [0] like "M%" order by [0]',[],function(res){
//			console.log(res);
			assert.deepEqual(res, ["Madrid","Milano","Minsk","Moscow"]);
			done();
		});
	});

	it("4. Load tab-separated file", function(done){
		alasql('select column * from tab("test157a.tab") where [1] > 100 order by [0]',[],function(res){
			assert.deepEqual(res, ["Astana","Tokyo","Vitebsk"]);
			done();
		});
	});

	it("5. Load tab-separated file", function(done){
		alasql('select column city from tab("test157b.tab", {headers:true}) where population > 100 order by city',[],function(res){
			assert.deepEqual(res, ["Astana","Tokyo","Vitebsk"]);
			done();
		});
	});


	it("6. Load CSV-file", function(done){
		alasql('select column * from csv("test157a.csv") where [1] > 100 order by [0]',[],function(res){
			assert.deepEqual(res, ["Astana","Tokyo","Vitebsk"]);
			done();
		});
	});

	it("7. Load CSV-file with headers", function(done){
		alasql('select column city from csv("test157b.csv",{headers:true}) where population > 100 order by city',[],function(res){
			assert.deepEqual(res, ["Astana","Tokyo","Vitebsk"]);
			done();
		});
	});

});


