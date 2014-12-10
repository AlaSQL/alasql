if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 157 - json()', function() {

	it("1. Load data from jaon file into IndexedDB database", function(done){

		alasql("create indexeddb database if not exists test157; \
			attach indexeddb database test157; \
			use test157; \
			drop table if exists movies; \
			create table movies; \
			select * into movies from json('movies.json'); \
			select value count(*) from movies",[], function(res) {
				var num = res.pop();
				console.log('Number of movies in database:',num);
				assert(num = 1000);
				done();
		});

	});

	it("99. Drop database", function(done){
		alasql('detach database test157;\
				drop indexeddb database test157');
		done();
	});
});

//}

