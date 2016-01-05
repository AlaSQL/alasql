if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
	var DOMStorage = require("dom-storage");
//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
};

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 399 || string concatenation', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test399;USE test399');
    done();
  });

	it('2. ||', function(done){
    var res = alasql('= "apple" || "watch"');
    assert(res,"applewatch");
    done();      
  });


  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test399');
    done();
  });


});
