if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {
describe('Test 157 - json()', function () {
	it('1. Load text data from file async', function (done) {
		alasql('select * from json("' + __dirname + '/test157.json")', [], function (res) {
			//			console.log(13,res);
			assert.deepEqual(res, [{a: 1}, {a: 2}]);
			done();
		});
	});

	it('2. Load text file', function (done) {
		alasql(
			'select column * from txt("' + __dirname + '/test157.txt") where [0] like "M%" order by [0]',
			[],
			function (res) {
				//			console.log(res);
				assert.deepEqual(res, ['Madrid', 'Milano', 'Minsk', 'Moscow']);
				done();
			}
		);
	});

	it('3. Load tab-separated file', function (done) {
		alasql(
			'select column * from tab("' +
				__dirname +
				'/test157a.tab",{headers:false}) where [1] > 100 order by [0]',
			[],
			function (res) {
				assert.deepEqual(res, ['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});

	it('4. Load tab-separated file', function (done) {
		alasql(
			'select column city from tab("' +
				__dirname +
				'/test157b.tab", {headers:true}) where population > 100 order by city',
			[],
			function (res) {
				assert.deepEqual(res, ['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});

	it('5. Load CSV-file', function (done) {
		alasql(
			'select column * from csv("' +
				__dirname +
				'/test157a.csv",{headers:false}) where [1] > 100 order by [0]',
			[],
			function (res) {
				assert.deepEqual(res, ['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});

	it('6. Load CSV-file with headers', function (done) {
		alasql(
			'select column city from csv("' +
				__dirname +
				'/test157b.csv",{headers:true}) where population > 100 order by city',
			[],
			function (res) {
				assert.deepEqual(res, ['Astana', 'Tokyo', 'Vitebsk']);
				done();
			}
		);
	});
});
