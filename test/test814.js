if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

var test = '814'; // insert test file number

describe('Test ' + test + ' - XXS or RCE from BRALITERAL', function () {
	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
		alasql('CREATE table i_am_a_table;');
		//alasql(`INSERT INTO i_am_a_table VALUES (1337);`);
		//alasql('INSERT INTO i_am_a_table VALUES (1337);')
	});

	after(function () {
		alasql('drop database test' + test);
	});

	const genPayload = command => `
	console.log(${JSON.stringify(command)})
	`;

	//

	it('A) Update SET', function () {
		assert.throws(()=>alasql( `UPDATE i_am_a_table SET [0'+${genPayload(">&2 echo UPDATE pwned $(whoami)")}+']=42;`))
	});

	it('B) Compare fields', function () {
		assert.throws(()=>alasql( `SELECT * from i_am_a_table where whatever=['+${genPayload(">&2 echo SELECT pwned $(whoami)")}+'];`))
	
		
	});

	it('C) Select field', function () {
		assert.throws(()=>alasql( `SELECT \`'+${genPayload(">&2 echo SELECT pwned again, back-quote works too. $(whoami)")}+'\` from i_am_a_table where 1;`))
	});


	it('D) Function name', function () {
		assert.throws(()=>alasql( `SELECT [whatever||${genPayload('>&2 echo calling function pwned')}||]('whatever');`))
	});


	
	
	/*
	it('C) Multiple statements in one string with callback', function (done) {
		// Please note that first parameter (here `done`) must be called if defined - and is needed when testing async code
		var sql = 'create table three (a int);';
		sql += 'insert into three values (1),(2),(3),(4),(5);';
		sql += 'select * from three;';
		alasql(sql, function (res) {
			assert.deepEqual(res, [1, 5, [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]]);
			done();
		});
	});
	*/
});
