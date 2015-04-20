if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 302 CREATE CLASS ', function() {

  it('1. CREATE CLASS',function(done){
    alasql('CREATE DATABASE test302;USE test302');
    done();
  });

  it('2. CREATE CLASS',function(done){
    var res = alasql('CREATE CLASS Person');
    assert(res == 1);
    assert(alasql.databases.test302.tables.Person.isclass)
    done();    
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test302');
    done();
  });


});

