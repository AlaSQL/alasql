if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 299 Parser Test', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test299;USE test299');
    done();
  });


  it('2.Tests',function(done){
    var res = alasql(' AUTO_INCREMENT');
    console.log(res);
//      console.log(2,res);
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test299');
    done();
  });
});
