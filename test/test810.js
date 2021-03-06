if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '810'; // insert test file number

describe('Test ' + test + ' - yy.Op for BETWEEN returning correct toString() result', function () {
	it('yy.Op.toString() returns correct value when op === BETWEEN', function () {
		var expectedResult = 'id BETWEEN 1 AND 3';

		var betweenOp = new alasql.yy.Op({
			left: new alasql.yy.Column({columnid: 'id'}),
			op: 'BETWEEN',
			right1: new alasql.yy.NumValue({value: 1}),
			right2: new alasql.yy.NumValue({value: 3}),
		});

		var result = betweenOp.toString();

		assert.equal(result, expectedResult);
	});

	it('yy.Op.toString() returns correct value when op === NOT BETWEEN', function () {
		var expectedResult = 'id NOT BETWEEN 1 AND 3';

		var betweenOp = new alasql.yy.Op({
			left: new alasql.yy.Column({columnid: 'id'}),
			op: 'NOT BETWEEN',
			right1: new alasql.yy.NumValue({value: 1}),
			right2: new alasql.yy.NumValue({value: 3}),
		});

		var result = betweenOp.toString();

		assert.equal(result, expectedResult);
	});
});
