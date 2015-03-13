if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};


describe('Test 245 Square brackets and JavaScript', function() {

  it('1. Square brackets',function(done){

    var data = [{'[one]':1},{'[one]':2}];

    var res = alasql('SELECT COLUMN `[one]` FROM ?',[data]);

    //console.log(res);
    assert.deepEqual(res,
      [1,2]      
    );
    done();
  });


  it('2. JavaScript',function(done){

    var data = [
        {a:"Warsaw"},
        {a:"Berlin"},
        {a: "Paris"},
        {a: "London"},
        {a: "MOSCOW"},
        {a: "KYIV"},
        {a: "MINSK"}
    ];

    var res = alasql('SELECT VALUE ``1+1``',[data]);
    //console.log(res);

    assert(res,
      2
    );
    done();

  });

});

