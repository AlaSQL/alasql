if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
	var DOMStorage = require("dom-storage");
//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
};

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 405. IS NULL strange parser bug', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test405;USE test405');
    done();
  });


	it('2. Parse SQL', function(done){
      var res = alasql.parse('ROW OF SELECT NULL IS NOT NULL, 1 IS NOT NULL, NULL IS NULL, 1 IS NOT NULL');
      assert(res.statements[0].columns.length == 4);
      done();
    });

  it('2. Execute SQL', function(done){
      var res = alasql('ROW OF SELECT NULL IS NOT NULL, 1 IS NOT NULL, NULL IS NULL, 1 IS NOT NULL');
      //assert(res.length == 4);
      done();
    });
  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test405');
    done();
  });

});
