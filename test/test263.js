if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

if(typeof exports == 'object') {

describe('Test 263 MIN and MAX: aggregators and functions', function() {

  it('1. Test', function(done) {

    var data = [{a:1,b:3},{a:2,b:1},{a:2,b:3},{a:8,b:1}];
    var res = alasql('SELECT MAX(MAX(a),MIN(a)), MIN(MAX(a),MIN(a)) FROM ?', [data]);
    assert.deepEqual(res,[ { 'MAX(MAX(a),MIN(a))': 8, 'MIN(MAX(a),MIN(a))': 1 } ]);
    done();    
  });


});

}

