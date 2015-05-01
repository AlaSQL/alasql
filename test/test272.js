if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var _ = require('lodash');
} else {
	__dirname = '.';
};


describe('Test 272 REMOVE columns', function() {

  it('1. Remove columns', function(done) {
    var data = [{a:1,b:10,c:100},{a:2,b:20,c:200},];
    var res = alasql('SELECT RECORDSET * REMOVE COLUMN c FROM ?',[data]);
    var colres = _.pluck(res.columns,"columnid");
    assert.deepEqual(colres,["a","b"]);
    done();    
  });

  it('2. Remove columns', function(done) {
    var data = [{a:1,b:10,c:100},{a:2,b:20,c:200},];
    var res = alasql('SELECT RECORDSET * REMOVE COLUMNS c FROM ?',[data]);
    var colres = _.pluck(res.columns,"columnid");
    assert.deepEqual(colres,["a","b"]);
    done();    
  });

  it('3. Remove columns LIKE', function(done) {
    var data = [{a:1,b1:10,b2:100},{a:2,b1:20,b2:200},];
    var res = alasql('SELECT RECORDSET * REMOVE COLUMNS LIKE "%b" FROM ?',[data]);
    var colres = _.pluck(res.columns,"columnid");
    assert.deepEqual(colres,["a"]);
    done();    
  });

});


