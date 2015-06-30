if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};



describe('Test 361 IN (SELECT)', function() {
  
  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test361;USE test361');
    done();
  });

  it('2. TEST',function(done){
//    var res = alasql('select 1 where 1 in (select 1)');
    var res = alasql('recordset of select 1 in (select 1)');
    var res = alasql('=1 in (select 1)');
    var res = alasql('select 1 where 1 in (select 1)');
    console.log(res);
//    var res = alasql('select 2 where true');
//    console.log(1,res);
    done();
  });



  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test361');
    done();
  });

});
