if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 330 PROLOG', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test330; USE test330');
    alasql('REQUIRE PROLOG')
    done();
  });

  it('2. FACTS',function(done){

    var res = alasql(':-son(Alex,Larissa)');
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test330');
    done();
  });

});

