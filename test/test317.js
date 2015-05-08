if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 317 GRAPH', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test317; USE test317');
    done();
  });

  it('2. Simple graph',function(done){
    alasql('CREATE CLASS loves; CREATE CLASS hates');
    var res = alasql('CREATE GRAPH Pablo, Maxim, Alex, Kate, Julia, \
      #Pablo > loves > #Julia, #Maxim > loves > #Julia, #Alex > loves > #Kate, \
      #Kate > hates > #Julia');
    var res = alasql('SEARCH #Alex > :loves > AS @p1 < :hates < #Julia');
    console.log(res);


    done();

  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test317');
    done();
  });
});

