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

describe('Test 385 - Nested Search (issue #495)', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test385;USE test385');
		done();
	});

	it('2. Create table issue - one statement', function(done) {
		// Source data

		var data1 = [
			{
				_id: '2mA82CTSeeTrvMxfR',
				playlists: [
					{
						name: 'Electro',
						songs: [
							{
								id: 'dMEwEdkoPLw',
								name: 'Moe Shop - You Look So Good',
								position: '1',
							},
							{
								id: 'S927n1xUkAM',
								name: 'Vexento - Magenta',
								position: '2',
							},
						],
					},
				],
			},
		];

		// Result data

		var data2 = [
			{
				_id: '2mA82CTSeeTrvMxfR',
				playlists: [
					{
						name: 'Electro',
						songs: [
							{
								id: 'dMEwEdkoPLw',
								name: 'Moe Shop - You Look So Good',
								position: '2',
							},
							{
								id: 'S927n1xUkAM',
								name: 'Vexento - Magenta',
								position: '1',
							},
						],
					},
				],
			},
		];

		alasql('SEARCH /playlists/songs/WHERE(id=$1) SET(position=$2) FROM $0', [
			data1,
			'S927n1xUkAM',
			'1',
		]);
		alasql('SEARCH /playlists/songs/WHERE(id=$1) SET(position=$2) FROM $0', [
			data1,
			'dMEwEdkoPLw',
			'2',
		]);

		assert.deepEqual(data1, data2);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test385');
		done();
	});
});
