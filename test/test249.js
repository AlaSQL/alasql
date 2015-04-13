if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};


describe('Test 249 - NULL as null', function() {

  it('1. Simple NULL value',function(done){
  	var res = alasql('SELECT VALUE NULL');
  	assert(res === null);

    done();
  });

});

