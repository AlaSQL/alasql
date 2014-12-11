if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
	var DOMStorage = require("dom-storage")
	global.localStorage = new DOMStorage("./test162.json", { strict: false, ws: '' });
} else {
	__dirname = '.';
};


if(typeof exports === 'object' && false) {

describe('Test 167 - database in database', function() {

	it("1. Temporary tables", function(done) {
		var res = alasql('insert into #city values {city:"Oslo"}, {city:"Helsinki"}');
		assert.deepEqual(alasql.temp.city,[{city:'Oslo'},{city:"Helsinki"}]);

		var res = alasql('select * from #city where city like "Os%"');
		assert.deepEqual(res,[{city:'Oslo'}]);

		var res = alasql('select * into #sweden_capital from #city where city like "Os%"');
		assert(res,1);
		assert.deepEqual(alasql.templ.sweden_capital,[{city:'Oslo'}]);

		// TODO - finish the test
		done();
	});

});

}

