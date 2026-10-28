if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var _ = require('lodash');
} else {
	__dirname = '.';
};


describe('Test 273 Source columns detextion', function() {

  var emptydata = [];
  var data1 = [{a:1,b:10},{a:2,b:20},{a:3,b:30}];
  var data2 = [{b:10,c:100},{b:20,c:200},{b:40,c:400}];

  it('1. Create database', function(done) {
    alasql('CREATE DATABASE test273; USE test273');
    alasql('CREATE TABLE one(a INT, b INT)');
    alasql('CREATE TABLE two(b INT, c INT)');
    done();    
  });


  it('2. Empty test on table with columns', function(done) {
    alasql.options.modifier = 'RECORDSET';
    var res = alasql('SELECT * FROM one');
    var colres = _.pluck(res.columns,'columnid');
    assert.deepEqual(colres, ["a","b"]);
    alasql.options.modifier = undefined;
    done();    
  });

  it('3. Star and other column', function(done) {
    alasql.options.modifier = 'RECORDSET';
    var res = alasql('SELECT *,a FROM one');
    var colres = _.pluck(res.columns,'columnid');
    assert.deepEqual(colres, ["a","b","a"]);

    var res = alasql('SELECT a,*,a FROM one');
    var colres = _.pluck(res.columns,'columnid');
    assert.deepEqual(colres, ["a","a","b","a"]);
    alasql.options.modifier = undefined;
    done();    
  });

  it('4. Subquery', function(done) {
    var res = alasql('SELECT RECORDSET * FROM (SELECT * FROM one)');
    var colres = _.pluck(res.columns,'columnid');
    assert.deepEqual(colres, ["a","b"]);
    done();    
  });

  it('5. JOIN subquery', function(done) {
    var res = alasql('SELECT RECORDSET t.*,s.* FROM (SELECT * FROM one) t \
      JOIN one s USING a');
    var colres = _.pluck(res.columns,'columnid');
    assert.deepEqual(colres, ["a","b","a","b"]);
    done();    
  });

  it('99. Drop database', function(done) {
    delete alasql.options.modifier;    
    alasql('DROP DATABASE test273');
    done();    
  });

});


