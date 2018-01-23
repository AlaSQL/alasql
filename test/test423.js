if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 423;

describe('Test ' + test + ' Merge', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('2. Join tables', function(done) {
		var res1 = [
			{
				inspecteur: 'Jan',
				keuring: [
					{keuring: 'Keuring 03', inspecteur: 'Jan', date: '2016-01-22'},
					{keuring: 'Keuring 04', inspecteur: 'Jan', date: '2016-01-20'},
					{keuring: 'Keuring 01', inspecteur: 'Jan', date: '2016-01-18'},
				],
			},
			{
				inspecteur: 'Piet',
				keuring: [{keuring: 'Keuring 02', inspecteur: 'Piet', date: '2016-01-20'}],
			},
		];
		var res2 = [
			{
				inspecteur: 'Jan',
				keuring: [
					{date: '2016-01-18'},
					{date: '2016-01-19'},
					{date: '2016-01-20'},
					{date: '2016-01-21'},
					{date: '2016-01-22'},
					{date: '2016-01-18'},
					{date: '2016-01-19'},
					{date: '2016-01-20'},
					{date: '2016-01-21'},
					{date: '2016-01-22'},
					{date: '2016-01-18'},
					{date: '2016-01-19'},
					{date: '2016-01-20'},
					{date: '2016-01-21'},
					{date: '2016-01-22'},
				],
			},
			{
				inspecteur: 'Piet',
				keuring: [
					{date: '2016-01-18'},
					{date: '2016-01-19'},
					{date: '2016-01-20'},
					{date: '2016-01-21'},
					{date: '2016-01-22'},
				],
			},
		];
		//    var res = alasql('SELECT a.inspecteur, a.keuring->concat(b.keuring) AS keuring FROM ? AS a OUTER JOIN ? as b USING inspecteur',[data1,data2]);

		//    var res = alasql('SELECT a.inspecteur, IIF(LEN(a.keuring)>0,a.keuring,b.keuring) AS keuring FROM ? AS a LEFT JOIN ? as b USING inspecteur',[data2,data1]);

		var res = alasql(
			'SELECT a.inspecteur, a.keuring AS akeuring, b.keuring AS bkeuring FROM ? AS a OUTER JOIN ? b USING inspecteur',
			[res1, res2]
		);

		res.forEach(function(d) {
			d.keuring = alasql(
				'SELECT (a.[date] OR b.[date]) AS [date],\
         (a.[inspecteur] OR b.[inspecteur]) AS inspecteur,\
         (a.keuring OR b.keuring) AS keuring \
         FROM ? AS a OUTER JOIN ? AS b USING [date]',
				[d.akeuring || [], d.bkeuring || []]
			);
			delete d.akeuring;
			delete d.bkeuring;
		});

		//console.log(JSON.stringify(res));

		// var rres = alasql('SELECT a.inspecteur,  \
		//         (SELECT (aa.[date] OR bb.[date]) AS [date],\
		//          (aa.[inspecteur] OR bb.[inspecteur]) AS inspecteur,\
		//          (aa.keuring OR bb.keuring) AS keuring \
		//          FROM a.keuring AS aa OUTER JOIN b.keuring AS bb USING [date]) AS keuring \
		//   FROM ? AS a OUTER JOIN ? b USING inspecteur',[res1,res2]);

		//     console.log(JSON.stringify(rres));

		done();
	});
});
