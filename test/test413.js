if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var data = [
	{
		Datum: 1441058400000,
		'Ticket-Kategorie': 'category2',
		'Ticket-Typ': 'type1',
		'Anzahl Bearbeitungen': 3,
	},
	{
		Datum: 1441058400000,
		'Ticket-Kategorie': 'category1',
		'Ticket-Typ': 'type4',
		'Anzahl Bearbeitungen': 126,
	},
	{
		Datum: 1441058400000,
		'Ticket-Kategorie': 'category1',
		'Ticket-Typ': 'type2',
		'Anzahl Bearbeitungen': 47,
	},
	{
		Datum: 1441058400000,
		'Ticket-Kategorie': 'category1',
		'Ticket-Typ': 'type3',
		'Anzahl Bearbeitungen': 85,
	},
	{
		Datum: 1441058400000,
		'Ticket-Kategorie': 'category1',
		'Ticket-Typ': 'type6',
		'Anzahl Bearbeitungen': 4,
	},
	{
		Datum: 1441144800000,
		'Ticket-Kategorie': 'category2',
		'Ticket-Typ': 'type3',
		'Anzahl Bearbeitungen': 2,
	},
	{
		Datum: 1441144800000,
		'Ticket-Kategorie': 'category1',
		'Ticket-Typ': 'type4',
		'Anzahl Bearbeitungen': 163,
	},
	{
		Datum: 1441144800000,
		'Ticket-Kategorie': 'category1',
		'Ticket-Typ': 'type2',
		'Anzahl Bearbeitungen': 30,
	},
];

describe('Test 413 CONCAT_WS (issue #429)', function() {
	it('2. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test413;USE test413');
		done();
	});

	it('3. Test CONCAT_WS', function(done) {
		var res = alasql(
			' SELECT CONCAT_WS(" ", "prepended string", `Ticket-Kategorie`,`Ticket-Typ`) as series_name FROM ?',
			[data]
		);
		//	console.log(res);
		assert.deepEqual(res, [
			{series_name: 'prepended string category2 type1'},
			{series_name: 'prepended string category1 type4'},
			{series_name: 'prepended string category1 type2'},
			{series_name: 'prepended string category1 type3'},
			{series_name: 'prepended string category1 type6'},
			{series_name: 'prepended string category2 type3'},
			{series_name: 'prepended string category1 type4'},
			{series_name: 'prepended string category1 type2'},
		]);

		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test413');
		done();
	});
});
