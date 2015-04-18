if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

//if(typeof exports === 'object' && false) {

describe('Test 170 - stdin', function() {

	it("1. Write TXT file into stdout", function(done) {
		var data = [{city:'Rome', population:3400000}, {city:'Astana', population:800000}];
		alasql('select * into txt() from ?',[data],function(res){
			assert(res == 2);
			done();
		});
	});

	it("2. Write CSV file into stdout", function(done) {
		var data = [{city:'Rome', population:3400000}, {city:'Astana', population:800000}];
		alasql('select * into csv({headers:true}) from ?',[data],function(res){
			assert(res == 2);
			done();
		});
	});


});
//}

