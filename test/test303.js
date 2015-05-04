if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 303 SEARCH over JSON', function() {

  it('1. Simple Search Primitives',function(done){
    var res = alasql('SEARCH FROM TRUE');
    assert.deepEqual(res, true);
    var res = alasql('SEARCH FROM 1');
    assert.deepEqual(res, 1);
    var res = alasql('SEARCH FROM "John"');
    assert.deepEqual(res, "John");
    var res = alasql('SEARCH FROM {a:1}');
    assert.deepEqual(res, {a:1});
    var res = alasql('SEARCH FROM @[1,2,3]');
    assert.deepEqual(res, [1,2,3]);
    done();    
  });

  it('2. PROP() Selector',function(done){
    var res = alasql('SEARCH name FROM {name:"John"}');
    assert.deepEqual(res, ["John"]);

    var res = alasql('SEARCH location city FROM {name:"John",location:{city:"Milan",country:"Italy"}}');
    assert.deepEqual(res, ["Milan"]);

    var res = alasql('SEARCH 2 FROM @[10,20,30]');
    assert.deepEqual(res, [30]);

    done();    
  });

  it('3. Basic Selector',function(done){
    alasql.srch.DOUBLE = function(val,args) {
      return {status: 1, values: [val*2]};
    };
    var res = alasql('SEARCH DOUBLE() FROM 1');
    assert.deepEqual(res, [2]);

    alasql.srch.TRIPLE = function(val,args) {
      return {status: 1, values: [val,val*2,val*3]};
    };
    var res = alasql('SEARCH TRIPLE() FROM 2');
    assert.deepEqual(res, [2,4,6]);

    done();    
  });

});

