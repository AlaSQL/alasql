if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

/*
  Test for issue #379
*/

var test = 424;

describe('Test '+test+' Arrow and DOT', function() {

  before(function(){
    alasql('CREATE DATABASE test'+test+';USE test'+test);
  });

  after(function(){
    alasql('DROP DATABASE test'+test);
  });


  it('1. Join tables',function(done){
    var res = alasql('={a:10}.a');
    assert(res==10);
    done();
  });

  it.skip('2. Join tables',function(done){
    var res = alasql('SELECT a.b FROM @[{a:{b:10}}]');
    console.log(res);
//    assert(res==10);
    done();
  });

});

