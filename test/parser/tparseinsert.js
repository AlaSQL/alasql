//
// tselect01.js
// Test for select
//

if(typeof exports === 'object') {
	var assert = require("assert");
	var alasqlparser = require('../../parser/alasqlparser');
	alasqlparser.yy = require('../../parser/yy');
};

describe('SELECT', function(){
	it('Simple SELECT', function(done) {
		var sql = 'SELECT * FROM students';
		var ast = alasqlparser.parse(sql);
		assert.equals(sql, ast.toString());
		done();
	});
});

