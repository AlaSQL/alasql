if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
	var path = require('path');

	describe('Test 1400 - loading csv should parse numbers by default and using raw in the options would make all input load as string', function () {
		var filecontents;
		describe('with headers', () => {
			beforeEach(() => {
				filecontents = fs.readFileSync(path.resolve('test/test1400a.csv'), 'utf8');
			});

			it('should be able to load up raw values if option is passed', function () {
				const res = alasql('SELECT * FROM CSV(?, {headers:true, raw:true})', [filecontents]);
				assert.deepEqual(res, [
					{
						'Payment Method': 'Method 3',
						'Account Number': '07312512451',
						'Account Name': 'Account 3',
						'Corporate Account': 'False',
					},
					{
						'Payment Method': 'Method 4',
						'Account Number': '08831502151',
						'Account Name': 'Account 4',
						'Corporate Account': 'True',
					},
					{
						'Payment Method': 'Method 1',
						'Account Number': '51235123124',
						'Account Name': 'Account 1',
						'Corporate Account': 'True',
					},
					{
						'Payment Method': 'Method 2',
						'Account Number': '88311052124',
						'Account Name': 'Account 2',
						'Corporate Account': 'False',
					},
				]);
			});

			it('should be able to load up values and numerical values would be parsed', function () {
				const res2 = alasql('SELECT * FROM CSV(?, {headers:true})', [filecontents]);
				assert.deepEqual(res2, [
					{
						'Payment Method': 'Method 3',
						'Account Number': 7312512451,
						'Account Name': 'Account 3',
						'Corporate Account': 'False',
					},
					{
						'Payment Method': 'Method 4',
						'Account Number': 8831502151,
						'Account Name': 'Account 4',
						'Corporate Account': 'True',
					},
					{
						'Payment Method': 'Method 1',
						'Account Number': 51235123124,
						'Account Name': 'Account 1',
						'Corporate Account': 'True',
					},
					{
						'Payment Method': 'Method 2',
						'Account Number': 88311052124,
						'Account Name': 'Account 2',
						'Corporate Account': 'False',
					},
				]);
			});
		});

		describe('without headers', () => {
			var filecontents;
			beforeEach(() => {
				filecontents = fs.readFileSync(path.resolve('test/test1400b.csv'), 'utf8');
			});

			it('should be able to load up raw values without header', function () {
				const res = alasql('SELECT * FROM CSV(?, {headers:false, raw:true})', [filecontents]);
				assert.deepEqual(res, [
					{
						0: 'Method 3',
						1: '07312512451',
						2: 'Account 3',
						3: 'False',
					},
					{
						0: 'Method 4',
						1: '08831502151',
						2: 'Account 4',
						3: 'True',
					},
					{
						0: 'Method 1',
						1: '51235123124',
						2: 'Account 1',
						3: 'True',
					},
					{
						0: 'Method 2',
						1: '88311052124',
						2: 'Account 2',
						3: 'False',
					},
				]);
			});

			it('should be able to load up values without header and numerical values will be parsed', function () {
				const res2 = alasql('SELECT * FROM CSV(?, {headers:false})', [filecontents]);

				assert.deepEqual(res2, [
					{
						0: 'Method 3',
						1: 7312512451,
						2: 'Account 3',
						3: 'False',
					},
					{
						0: 'Method 4',
						1: 8831502151,
						2: 'Account 4',
						3: 'True',
					},
					{
						0: 'Method 1',
						1: 51235123124,
						2: 'Account 1',
						3: 'True',
					},
					{
						0: 'Method 2',
						1: 88311052124,
						2: 'Account 2',
						3: 'False',
					},
				]);
			});
		});
	});
}
