if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 46', function() {
	describe('FROM as parameter', function(){

		var years = [
			{yearid: 2010},
			{yearid: 2011},
			{yearid: 2012},
			{yearid: 2013},
			{yearid: 2014},
			{yearid: 2015},
			{yearid: 2016},
			{yearid: 2017},
		];

		it('FROM array of objects', function(done){
			var res = alasql.queryArray('SELECT * FROM ? AS t WHERE t.yearid>?',[years,2014])
			assert.deepEqual([2015,2016,2017], res);
			done();
		});

	});
});
