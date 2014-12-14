if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 172 - XLSX to array', function() {

	it("1. Load XLSX file into array", function(done) {
		var data = [];
		alasql('select * into ? from xlsx("test168xlsx")',[data],function(res){
			assert(res == 1);
			done();
		});
	});

});

//};

