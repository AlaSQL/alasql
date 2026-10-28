if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 300 SEARCH', function() {

  var catalog = { 
    Europe: {
      fruits: [
        {fruit:'Apple'},
        {fruit:'Peach'},          
      ]
    },
    Asia: {
        fruit:'Pineapple'          
    },
    Africa: {
        fruit:'Banana'          
    }
  };

  it('1. Search fruits',function(done){
    var res = alasql('SEARCH Europe FROM ?',[catalog]);
    assert.deepEqual(res, [{fruits: [
        {fruit:'Apple'},
        {fruit:'Peach'},          
      ]}]);
    done();    
  });
if(false) {
  it('2. Search fruits',function(done){
    var res = alasql('SEARCH * fruit FROM ?',[catalog]);
    assert.deepEqual(res, [{fruit:'Apple'}, {fruit:'Peach'},{fruit:'Pineapple'}, {fruit:'Banana'}]);
    done();    
  });

  it('3. Search fruits',function(done){
    var res = alasql('SEARCH * fruit="Apple" FROM ?',[catalog]);
    assert.deepEqual(res, [{fruit:'Apple'}]);
    done();    
  });
}

});

