if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 319 PATH in GRAPH', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test319; USE test319');
    done();
  });

  it('2. Simple graph',function(done){
    alasql('CREATE CLASS Person');
    var res = alasql('CREATE GRAPH :Peson {age:35} AS @p1, \
      :Peson {age:40} AS @p2, \
      @p1 > "is older than" > @p2');

    var res = alasql('SEARCH @p1 PATH(@p2) EDGE name');
    assert.deepEqual(res,['is older than']);

    done();

  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test319');
    done();
  });
});

