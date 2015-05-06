if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 309 # operator and graphs', function() {

  it('0. Create database ',function(done){
    alasql('CREATE DATABASE test309;USE test309');
    done();
  });


  it('1. SET selector',function(done){
    alasql('CREATE VERTEX #Andrey');
    var res = alasql('SELECT #Andrey');
    console.log(res);

//    assert.deepEqual(alasql.vars.q,[ 10, 20 ]);
    done();    
  });

  it('99. Drop database ',function(done){
    alasql('DROP DATABASE test309');
    done();
  });

});

