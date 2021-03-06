if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test381.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 381 - PIVOT', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test381;USE test381');
		done();
	});

	it('1. Create table', function (done) {
		var data = [
			{security: 'Preferred Stock', name: 'Robert', value: 5, date: '2014-1-3'},
			{security: 'Preferred Stock', name: 'Robert', value: 5, date: '2014-1-5'},
			{security: 'Common Stock', name: 'Bert', value: 20, date: '2014-1-6'},
			{security: 'Preferred Stock', name: 'Elizabeth', value: 10, date: '2014-1-6'},
			{security: 'Common Stock', name: 'Robert', value: 20, date: '2014-1-9'},
			{security: 'Preferred Stock', name: 'Bert', value: 20, date: '2014-1-11'},
			{security: 'Preferred Stock', name: 'Robert', value: 5, date: '2014-1-12'},
			{security: 'Preferred Stock', name: 'Robert', value: 15, date: '2014-1-12'},
			{security: 'Options', name: 'Bert', value: 10, date: '2014-1-13'},
			{security: 'Preferred Stock', name: 'Robert', value: 5, date: '2014-1-14'},
			{security: 'Options', name: 'Robert', value: 15, date: '2014-1-17'},
		];

		var res = alasql(
			'SELECT name, security, [value] \
	    			FROM ? PIVOT (SUM([value]) FOR security IN ([Preferred Stock],\
	    		    	[Common Stock],[Options]))',
			[data]
		);

		assert.deepEqual(res, [
			{
				name: 'Robert',
				'Preferred Stock': 35,
				'Common Stock': 20,
				Options: 15,
			},
			{
				name: 'Bert',
				'Common Stock': 20,
				'Preferred Stock': 20,
				Options: 10,
			},
			{name: 'Elizabeth', 'Preferred Stock': 10},
		]);

		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test381');
		done();
	});
});
