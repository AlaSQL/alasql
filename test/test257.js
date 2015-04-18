if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 257 INTO XL()', function() {

  it('1. INTO XL', function(done){
    var data = [{a:1},{a:2}];
    var res = alasql('SELECT * INTO XLS("restest257.xls") FROM ?',[data]); 
    console.log(res);
    done();
  });

});

