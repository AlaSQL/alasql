if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 369 - CSV export with missing properties', function () {
	it('A) Export missing properties as empty fields', function () {
		var data = [
			{a: 1, b: 2, c: 3, d: 4},
			{a: 5, b: 6},
		];
		var res = alasql('SELECT * INTO CSV({headers:true, utf8Bom:false}) FROM ?', [data]);
		assert.deepStrictEqual(res, '"a";"b";"c";"d"\r\n1;2;3;4\r\n5;6;;\r\n');
	});

	it('B) Preserve an explicit undefined string', function () {
		var data = [{a: 'undefined'}];
		var res = alasql('SELECT * INTO CSV({headers:true, utf8Bom:false}) FROM ?', [data]);
		assert.deepStrictEqual(res, '"a"\r\n"undefined"\r\n');
	});
});
