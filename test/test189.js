if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	describe('Test 189 - SELECT INTO SQL()', function () {
		it('1. From ?', function (done) {
			var data = [
				{a: 1, b: 'Ten'},
				{a: 2, b: 'Twenty'},
				{a: 3, b: "Val's Deser"},
			];
			alasql(
				'SELECT * INTO SQL("' + __dirname + '/test189.sql",{tableid:"one"}) FROM ?',
				[data],
				function () {
					alasql(
						'CREATE DATABASE test189;\
	        	USE test189;\
	        	CREATE TABLE one; \
	        	SOURCE "' +
							__dirname +
							'/test189.sql"; \
	        	SELECT * FROM one',
						[],
						function (res) {
							assert.deepEqual(res.pop(), data);
							alasql('DROP DATABASE test189');
							done();
						}
					);
				}
			);
		});
	});
}
