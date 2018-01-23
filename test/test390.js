if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on this article:

*/

describe('Test 390 Export nested array to XLSX', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test390;USE test390');
		done();
	});

	it('2. Prepare tables', function(done) {
		var data = [
			{
				a: 'test',
				b: [
					{
						c: 'test1',
						d: 'test2',
					},
					{c: 'test2', d: 'test1'},
				],
			},
			{
				a: 'testB',
				b: [
					{
						c: 'test3',
						d: 'test4',
					},
					{c: 'test5', d: 'test6'},
				],
			},
		];
		if (typeof exports === 'object') {
			var res = alasql(
				'SEARCH / AS @p b / CLONEDEEP() SET(a=@p->a) INTO XLSX("' +
					__dirname +
					'/restest390a.xlsx",{headers:true}) FROM ?',
				[data]
			);
			assert(res == 1);
		}
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test390');
		done();
	});
});
