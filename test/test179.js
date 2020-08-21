if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 179 - function in GROUP BY', function () {
	var authors = [
		{id: 1, name: 'adam'},
		{id: 2, name: 'bob'},
		{id: 3, name: 'charlie'},
	];

	var books = [
		{author_id: 1, title: 'Coloring for beginners'},
		{author_id: 1, title: 'Advanced coloring'},
		{author_id: 2, title: '50 Hikes in New England'},
		{author_id: 2, title: '50 Hikes in Illinois'},
		{author_id: 3, title: 'String Theory for Dummies'},
	];

	it('1. SELECT', function (done) {
		//        var res = alasql('SELECT authors.*, books.author_id, books.title FROM ? authors LEFT JOIN ? books \
		//        ON authors.id = books.author_id',[authors, books]);

		//        var res = alasql('SELECT authors.*, books.* FROM ? authors LEFT JOIN ? books \
		//        ON authors.id = books.author_id',[authors, books]);

		var res = alasql(
			'SELECT * FROM ? authors LEFT JOIN ? books \
        ON authors.id = books.author_id',
			[authors, books]
		);
		//        console.log(res);
		assert(res.length == 5);
		// assert.deepEqual(res, [
		//     { continent: 'Europe', 'COUNT(*)': 4 },
		//     { continent: 'Asia', 'COUNT(*)': 2 } ]
		// );
		//    console.log(res);
		done();
	});

	it('2. SELECT with JOIN', function (done) {
		var res = alasql(
			'SELECT authors.*, books.author_id, books.title FROM ? authors LEFT JOIN ? books \
        ON authors.id = books.author_id',
			[authors, books]
		);

		assert(res.length == 5);

		var res = alasql(
			'SELECT * FROM ? authors LEFT JOIN ? books \
        ON authors.id = books.author_id',
			[authors, books]
		);
		assert(res.length == 5);

		//        console.log(res);
		// assert.deepEqual(res, [
		//     { continent: 'Europe', 'COUNT(*)': 4 },
		//     { continent: 'Asia', 'COUNT(*)': 2 } ]
		// );
		//    console.log(res);
		done();
	});
});
