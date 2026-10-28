if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var _ = require('lodash');
} else {
	__dirname = '.';
};


describe('Test 271 RECORDSET and Excel tests', function() {

  it('1. Open Excel and columns', function(done) {
    var res = alasql('SELECT RECORDSET * FROM XLSX("test168.xlsx",{headers:true})',[],function(res){
    var colres = _.pluck(res.columns,"columnid");
      assert.deepEqual(colres,["City","Population"]);
      done();    
    });  
  });

});


