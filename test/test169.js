if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
	var dirname = __dirname.replace(/\\/g,"/");
} else {
	dirname = '.';
};

//if(typeof exports === 'object' && false) {

describe('Test 169 - select into TXT, CSV, XLSX', function() {

	it("0. Write TXT file", function(done) {
		alasql('create database test169;use test169');
		alasql('create table one (a string, b string)');
		alasql('insert into one values ("Hello","Warsaw"), ("World!","Quito")');
		done();		
	});

if(typeof exports == 'object') {

	it("1. Write TXT file", function(done) {
		alasql('select * into txt("'+dirname+'/test169.txt") from one',[],function(res){
			assert(res == 2);
			done();		
		});
	});

	it("2. Write TAB file", function(done) {
		alasql('select * into tab("'+dirname+'/test169a.tab") from one',[],function(res){
			assert(res == 2);
			done();		
		});
	});

	it("3. Write TAB file with headers", function(done) {
		alasql('select * into tab("'+dirname+'/test169b.tab",{headers:true}) from one',[],function(res){
			assert(res == 2);
			done();		
		});
	});

	it("4. Write CSV file with headers", function(done) {
		alasql('select * into csv("'+dirname+'/test169a.csv",{headers:true}) from one',[],function(res){
			assert(res == 2);
			done();		
		});
	});

	it("5. Write XLSX file with headers", function(done) {
		alasql('select * into xlsx("'+dirname+'/test169a.xlsx",{headers:true}) from one',[],function(res){
			assert(res == 2);
			done();		
		});
	});

};

	it("99. Drop database", function(done) {
		alasql('drop database test169');
		done();
	});	

});
//}

