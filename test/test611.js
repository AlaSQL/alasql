if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '611'; // insert test file number

describe('Test ' + test + ' - SQL added user defined aggregation', function () {
	/*
	// How to implement the SUM plus number of rows aggregator
	alasql.aggr.sumPlusRows = function(value, accumulator, stage) {
	    if(stage == 1) {

	        // first call of aggregator - for first line
	        var newAccumulator =  value+1;
	        return newAccumulator;

	    } else if(stage == 2) {

	        // for every line in the group
	        accumulator = accumulator + value + 1;
	        return accumulator;

	    } else if(stage == 3) {

	        // Post production - please nota that value Will be undefined
	        return accumulator;  
	    }
	}
	*/
	var sumPlusRows =
		'function(a,b,c){if(1==c){var d=a+1;return d}return 2==c?b=b+a+1:3==c?b:void 0};';

	/*
	// How to implement the SUM minus number of rows aggregator
	alasql.aggr.sumMinusRows = function(value, accumulator, stage) {
	    if(stage == 1) {

	        // first call of aggregator - for first line
	        var newAccumulator =  value-1;
	        return newAccumulator;

	    } else if(stage == 2) {

	        // for every line in the group
	        accumulator = accumulator + value - 1;
	        return accumulator;

	    } else if(stage == 3) {

	        // Post production - please nota that value Will be undefined
	        return accumulator;  
	    }
	}
	*/

	var sumMinusRows =
		'function(a,b,c){if(1==c){var d=a-1;return d}return 2==c?b=b+a-1:3==c?b:void 0};';

	it.skip('A) Sync AGGREGATOR', function () {
		var res = alasql(
			'CREATE AGGREGATOR abc_A AS ``' +
				sumPlusRows +
				'``;select value abc_A(a) FROM @[{a:10},{a:100}]; CREATE AGGREGATOR abc_A AS ``' +
				sumMinusRows +
				'``;select value abc_A(a) FROM @[{a:10},{a:100}]'
		);
		assert.deepEqual(res, [1, 112, 1, 108]);
	});

	it('B) Async AGGREGATE', function (done) {
		//
		alasql([
			'CREATE AGGREGATOR abc_B AS ``' + sumPlusRows + '``',
			'SELECT VALUE abc_B(a) FROM @[{a:10},{a:100}]',
			'CREATE AGGREGATOR abc_B AS ``' + sumMinusRows + '``',
			'select VALUE abc_B(a) FROM @[{a:10},{a:100}]',
		]).then(function (res) {
			assert.deepEqual(res, [1, 112, 1, 108]);
			done();
		});
	});

	it.skip('C) Sync AGGREGATE', function () {
		var res = alasql(
			'CREATE AGGREGATE abc_C AS ``' +
				sumPlusRows +
				'``;select value abc_C(a) FROM @[{a:10},{a:100}]; CREATE AGGREGATE abc_C AS ``' +
				sumMinusRows +
				'``;select value abc_C(a) FROM @[{a:10},{a:100}]'
		);
		console.log(JSON.stringify(alasql.aggr, null, 4));
		assert.deepEqual(res, [1, 112, 1, 108]);
	});

	it('D) Async AGGREGATE', function (done) {
		//
		alasql([
			'CREATE AGGREGATE abc_D AS ``' + sumPlusRows + '``',
			'SELECT VALUE abc_D(a) FROM @[{a:10},{a:100}]',
			'CREATE AGGREGATE abc_D AS ``' + sumMinusRows + '``',
			'select value abc_D(a) FROM @[{a:10},{a:100}]',
		]).then(function (res) {
			assert.deepEqual(res, [1, 112, 1, 108]);
			done();
		});
	});
});
