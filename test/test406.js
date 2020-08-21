if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 406. Complex SEARCH', function () {
	var data = {
		'10': {},
		'12': {
			'20': {
				value: 1,
				id: 1,
			},
			'100': {
				value: 12,
				id: 1,
			},
		},
		'14': {
			'100': {
				value: 14,
				id: 2,
			},
		},
		'16': {},
		'18': {},
		'20': {
			'100': {
				value: 23,
				id: 1,
			},
			'150': {
				value: 56,
				id: 3,
			},
		},
	};

	it('1. Parse complex JSON', function (done) {
		//      alasql('CREATE INDEXEDDB DATABASE IF NOT EXISTS geo;')
		if (typeof exports == 'object') {
			var res = alasql(
				'SEARCH KEYS() AS @a EX($0->(_)) AS @b \
        KEYS() AS @c EX(@b->(_)) AS @e \
        {a:(@a),c:(@c), [value]:(@e->[value]), id:(@e->id)} \
        INTO XLSX("' +
					__dirname +
					'/restest406.xlsx",{headers:true}) FROM $0',
				[data]
			);
			assert(res == 1);
		}
		var res = alasql(
			'SEARCH KEYS() AS @a EX($0->(_)) AS @b \
        KEYS() AS @c EX(@b->(_)) AS @e \
        {a:(@a),c:(@c), [value]:(@e->[value]), id:(@e->id)} \
        FROM $0',
			[data]
		);
		assert.deepEqual(res, [
			{a: '12', c: '20', value: 1, id: 1},
			{a: '12', c: '100', value: 12, id: 1},
			{a: '14', c: '100', value: 14, id: 2},
			{a: '20', c: '100', value: 23, id: 1},
			{a: '20', c: '150', value: 56, id: 3},
		]);

		var res = alasql(
			'SEARCH KEYS() AS @a EX($0->(_)) AS @b \
        KEYS() AS @c EX(@b->(_)) AS @e \
        RETURN(@a AS a,@c AS c, @e->[value] AS [value], @e->id AS id) \
        FROM $0',
			[data]
		);
		assert.deepEqual(res, [
			{a: '12', c: '20', value: 1, id: 1},
			{a: '12', c: '100', value: 12, id: 1},
			{a: '14', c: '100', value: 14, id: 2},
			{a: '20', c: '100', value: 23, id: 1},
			{a: '20', c: '150', value: 56, id: 3},
		]);

		done();
	});

	it('2. With OF()', function (done) {
		var data1 = {
			'1': 10,
			'2': 20,
		};

		var res = alasql('SEARCH OF(@a) \
        RETURN(@a AS [key],_ AS [value]) \
        FROM ?', [
			data1,
		]);
		assert.deepEqual(res, [
			{key: '1', value: 10},
			{key: '2', value: 20},
		]);
		//      console.log(res);

		var res = alasql(
			'SEARCH OF(@a) OF(@c) \
        RETURN(@a AS a,@c AS c, _->[value] AS [value], _->id AS id) \
        FROM ?',
			[data]
		);
		assert.deepEqual(res, [
			{a: '12', c: '20', value: 1, id: 1},
			{a: '12', c: '100', value: 12, id: 1},
			{a: '14', c: '100', value: 14, id: 2},
			{a: '20', c: '100', value: 23, id: 1},
			{a: '20', c: '150', value: 56, id: 3},
		]);

		done();
	});

	// done();
});
