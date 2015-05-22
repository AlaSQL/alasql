if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 343 Use params for $variables', function() {
  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test343;USE test343');
    done();
  });

  it('2. Simple get undefined',function(done){
    var res = alasql('=$a');
    assert.deepEqual(res,undefined);
    done();
  });

  it('3. Simple get from empty param {}',function(done){
    var res = alasql('=$a',{});
    assert.deepEqual(res,undefined);
    done();
  });

  it('4. Simple get from empty param {}',function(done){
    var params = {a:123};
    var res = alasql('=$a',params);
    assert.deepEqual(res,123);
    done();
  });

  it('5. Simple set to param',function(done){
    var params = {a:123};
    var res = alasql('SET $a = $a + 100',params);
    assert.deepEqual(params.a,223);
    done();
  });

  it('6. SELECT INTO $var',function(done){
    var params = {};
    params.data = [{v:1},{v:2},{v:3}];
    var res = alasql('SELECT * INTO $arr FROM $data',params);
    assert.deepEqual(params.arr,[{v:1},{v:2},{v:3}]);
    done();
  });

  it('6. SEARCH AS $var',function(done){
    var params = {};
    params.data = [{v:1},{v:2},{v:3}];
    var res = alasql('SEARCH /v AS $vres FROM $data',params);
    assert.deepEqual(params.vres,3);
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql.options.modifier = undefined;
    alasql('DROP DATABASE test343');
    done();
  });

});
