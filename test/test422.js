if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 422;

describe('Test ' + test + ' Test for JOINSTAR', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Create tables', function (done) {
		var ast = alasql.parse('SELECT * FROM table1 WHERE a = b AND a->fn(b->c) > 0');
		//console.log(JSON.stringify(ast.statements[0].where));
		done();
	});
});
