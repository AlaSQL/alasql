// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';

if (typeof global !== 'undefined') {
	global.localStorage = new DOMStorage('./test381.json', {
		strict: false,
		ws: '',
	});
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 381 - PIVOT', () => {
	test('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test381;USE test381');
		done();
	});

	test('1. Create table', done => {
		var data = [
			{security: 'Preferred Stock', name: 'Robert', value: 5, date: '2014-1-3'},
			{security: 'Preferred Stock', name: 'Robert', value: 5, date: '2014-1-5'},
			{security: 'Common Stock', name: 'Bert', value: 20, date: '2014-1-6'},
			{
				security: 'Preferred Stock',
				name: 'Elizabeth',
				value: 10,
				date: '2014-1-6',
			},
			{security: 'Common Stock', name: 'Robert', value: 20, date: '2014-1-9'},
			{security: 'Preferred Stock', name: 'Bert', value: 20, date: '2014-1-11'},
			{
				security: 'Preferred Stock',
				name: 'Robert',
				value: 5,
				date: '2014-1-12',
			},
			{
				security: 'Preferred Stock',
				name: 'Robert',
				value: 15,
				date: '2014-1-12',
			},
			{security: 'Options', name: 'Bert', value: 10, date: '2014-1-13'},
			{
				security: 'Preferred Stock',
				name: 'Robert',
				value: 5,
				date: '2014-1-14',
			},
			{security: 'Options', name: 'Robert', value: 15, date: '2014-1-17'},
		];

		var res = alasql(
			'SELECT name, security, [value] \
	    			FROM ? PIVOT (SUM([value]) FOR security IN ([Preferred Stock],\
	    		    	[Common Stock],[Options]))',
			[data]
		);

		expect(res).toEqual([
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

	test('99. DROP DATABASE', done => {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test381');
		done();
	});
});
