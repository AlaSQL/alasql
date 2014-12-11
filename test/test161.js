if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports == 'object' && false) {

	var XLS = require('xlsjs');
	var XLSX = require('js-xlsx');

} else {
	// how to attach these files in browser?
}

if(false) {
describe('Test 161 - load and process Excel file', function() {

	it("1. Load Excel file", function(done){

		alasql("select country, population from xlsx('test161.xlsx',{sheet:'Sheet1',range:'A1:D5',headers:true}) where city like 'M%'", [], function(res){
			assert.deepEqual(res, [{country:'USA', population:12000000}, {country:'Spain', population:2500000}]);
			done();
		});

	});

	it("2. Create Excel file from SELECT query", function(done){
		var people = [{name:'Joan Watson', age: 42},{name:'Sherlok Holmes', age: 44}];

		alasql("select * into xlsx('test160res.xlsx') from ?", [people], function(res){
			// TODO - what to do in browser? try to save?
			// How to protect node.js (where to save these files?)
			assert(res, 2);
			done();
		});
	});

});

}

