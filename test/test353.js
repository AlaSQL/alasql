if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 353 Compiled Promised Statements', function() {
  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test353;USE test353');
    done();
  });

  it('2. Compiled Sync',function(done){
    var data = [{a:1},{a:2}];
    var st = alasql.compile('SELECT * FROM ?');
    var res = st([data]);
    assert.deepEqual(res,data);
    done();
  });

  it('3. Compiles Async',function(done){
    var data = [{a:1},{a:2}];
    var st = alasql.compile('SELECT * FROM ?');
    st([data],function(res){
      assert.deepEqual(res,data);
      done();
    });
  });



  it('4. Compile Promise',function(done){
    var data = [{a:1},{a:2}];
    var st = alasql.compile('SELECT * FROM ?');
    st.promise([data]).then(function(res){
      assert.deepEqual(res,data);
      done();
    });
  });


  it('99. DROP DATABASE',function(done){
    alasql.options.modifier = undefined;
    alasql('DROP DATABASE test353');
    done();
  });

});
