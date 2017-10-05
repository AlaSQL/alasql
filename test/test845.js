if(typeof exports === 'object') {
	var assert = require("assert");
	Tabletop = require('tabletop'); // will error: Tabletop not found if var is removed; Why???
	var alasql = require('..');
}
var test = '845'; // insert test file number

describe('Test '+test+' - importing from Tabletop.js', function() {

	before(function(){

	});

	after(function(){

	});

	it('Empty strings should be read as empty strings, not 0', function(done){
        this.timeout(3000); // tabletops is slow
		var res = [];
		var test_spreadsheet = 'https://docs.google.com/spreadsheets/d/1KF0w8f0pvoetEDcnE3VNPiE7QLhtadMMcfxn7q2u11Y/edit?usp=sharing'
		alasql('select * from tabletop(?) ', [test_spreadsheet], function(res){
			assert.equal(String(res[0]['test_column_2']), "");
			done();
		});
	});
});
