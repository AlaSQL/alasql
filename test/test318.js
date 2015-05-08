if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 318 PATH in GRAPH', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test318; USE test318');
    done();
  });

  it('2. Simple graph',function(done){
    var res = alasql('CREATE GRAPH Pablo, Maxim, Alex, Napoleon, \
      Josephine,  Kate, Julia, Paloma, \
      #Pablo >loves> #Julia, #Maxim >> #Julia, #Alex >> #Kate, \
      #Kate >> #Julia, #Alex >> #Paloma, #Napoleon > "loves" > #Josephine, \
      #Josephine >"knows"> #Pablo');

    var res = alasql('SEARCH #Napoleon PATH(#Josephine) name');
    assert.deepEqual(res,['loves', 'Josephine']);


    var res = alasql('SEARCH #Napoleon PATH(#Josephine) EDGE name');
    assert.deepEqual(res,['loves']);
//    console.log(res);

    var res = alasql('SEARCH #Napoleon PATH(#Josephine) EDGE set(color="red")');
    assert.deepEqual(res,[alasql.databases[alasql.useid].objects[5]]);

    var res = alasql('SEARCH #Napoleon PATH(#Pablo) name');
    assert.deepEqual(res,['loves','Josephine','knows','Pablo']);

    var res = alasql('SEARCH (DISTINCT(#Napoleon PATH(#Julia) EDGE name)) ORDER BY(ASC)');
//console.log(res);
    assert.deepEqual(res,['knows','loves']);
    done();

  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test318');
    done();
  });
});

