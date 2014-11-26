if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 56 - Error in WHERE and preIndex with ParamValue', function() {
	var q = [];
	for(var i=0; i<100000; i++){
		q.push({a:i, b:(Math.random()*1000)|0});
	}

	it('SELECT - order by "', function(done){
		var w = alasql("SELECT q.* FROM ? q ORDER BY b", [q]);
		assert(w.length == 100000);
		done();
	});

});
