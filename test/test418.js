if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

/*
  Test for issue #379
*/

var test = 418;

describe('Test '+test+' Load data from internet', function() {

  before(function(){
    alasql('CREATE DATABASE test'+test+';USE test'+test);
  });

  after(function(){
    alasql('DROP DATABASE test'+test);
  });

  it('1. Load CSV',function(done){
    this.timeout(5000);
    alasql('VALUE OF SELECT COUNT(*) FROM CSV("http://alasql.org/demo/001csv/country.csv",{headers:true})',[],function(res){
      assert(res==249)
      done();
    });
	});

  it('2. Load XLS',function(done){
    this.timeout(5000);
    alasql('VALUE OF SELECT COUNT(*) FROM XLSX("http://alasql.org/demo/003xlsx/cities.xlsx",{headers:true})',[],function(res){
      assert(res==5);
      done();
    });
  });
});

