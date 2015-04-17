if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 256 INTO() in result and into params array', function() {

  it('1. INTO param', function(done){
    var data = [{a:1},{a:2}];
    var resdata = [{a:0}];
    var res = alasql('SELECT * INTO ? FROM ?',[resdata,data]); 
    assert(res == 2);
    assert.deepEqual(resdata, [ { a: 0 }, { a: 1 }, { a: 2 } ]);
    done();
  });

  it('2. INTO TXT result', function(done){
    var data = [{a:1},{a:2}];
    var res = alasql('SELECT * INTO TXT() FROM ?',[data]); 
    assert(res == '1\n2')
    done();
  });

  it('3. INTO SQL result', function(done){
    var data = [{a:1},{a:2}];
    var res = alasql('SELECT * INTO SQL() FROM ?',[data]); 
    console.log(res);
    assert(res == '1\n2')
    done();
  });


});

