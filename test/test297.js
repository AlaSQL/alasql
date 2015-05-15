if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
};


describe('Test 297 INSERT,DELETE,UDPATE with subqueries', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test297;USE test297');
    alasql('CREATE TABLE one(a INT, b INT)');
    alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30)')
    done();
  });

  it('2. DELETE',function(done){
    var res = alasql('DELETE FROM one WHERE a = (SELECT MAX(a) FROM one)');
    console.log(res);
    assert.deepEqual(res,1);
    done();
  });


  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test297');
    done();
  });
});
