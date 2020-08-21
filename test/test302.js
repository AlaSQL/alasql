if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 302 CREATE CLASS ', function () {
	it.skip('1. CREATE CLASS', function (done) {
		alasql('CREATE DATABASE test302;USE test302');
		done();
	});

	it.skip('2. CREATE CLASS', function (done) {
		var res = alasql('CREATE CLASS Person');
		assert(res == 1);
		assert(alasql.databases.test302.tables.Person.isclass);
		done();
	});

	var italy, rome, milano, romeo, paola, peter, berlin, germany;

	it.skip('3. CREATE CLASS Country and City, INSERT data', function (done) {
		alasql('CREATE CLASS Country');
		italy = alasql('INSERT INTO Country VALUES {name:"Italy"}');
		germany = alasql('INSERT INTO Country VALUES {name:"Germany"}');

		alasql('CREATE CLASS City');
		rome = alasql('INSERT INTO City VALUES {name:"Rome",country:' + italy + '}');
		milano = alasql('INSERT INTO City VALUES {name:"Milano",country:' + italy + '}');
		berlin = alasql('INSERT INTO City VALUES {name:"Berlin",country:' + germany + '}');

		assert(alasql.databases.test302.tables.Person.isclass);
		done();
	});

	it.skip('4. INSERT INTO CLASS', function (done) {
		romeo = alasql('INSERT INTO Person VALUES {name:"Romeo",age:32, city:' + rome + '}');
		paola = alasql('INSERT INTO Person VALUES {name:"Paola",age:25, city:' + milano + '}');
		peter = alasql('INSERT INTO Person VALUES {name:"Peter",age:18, city:' + berlin + '}');
		//    assert(alasql.databases.test302.tables.Person.isclass);
		done();
	});

	it.skip('5. SET variable = (INSERT)', function (done) {
		alasql('SET @egypt = (INSERT INTO Country VALUES {name:"Egypt"})');
		alasql('SET @cairo = (INSERT INTO City VALUES {name:"Cairo", country:(@egypt)})');
		alasql('INSERT INTO Person VALUES {name:"Ali",city:(@cairo)}');
		done();
	});

	it.skip('6. SELECT !', function (done) {
		var res = alasql(
			'SELECT COLUMN DISTINCT city!country!name AS country\
           FROM Person ORDER BY country'
		);
		assert.deepEqual(res, ['Egypt', 'Germany', 'Italy']);
		done();
	});

	it.skip('7. SEARCH #', function (done) {
		var res = alasql('SEARCH DISTINCT(/ city!country!name) FROM Person');
		assert.deepEqual(res.sort(), ['Egypt', 'Germany', 'Italy']);
		done();
	});

	it.skip('8. SEARCH #', function (done) {
		var res = alasql('SEARCH DISTINCT(/ :Person city!country!name)');
		assert.deepEqual(res.sort(), ['Egypt', 'Germany', 'Italy']);

		var res = alasql('SEARCH ALL(/ :Person city!country!name) DISTINCT()');
		assert.deepEqual(res.sort(), ['Egypt', 'Germany', 'Italy']);

		done();
	});

	it.skip('9. SEARCH AS', function (done) {
		var res = alasql(
			'search / city as @c ! where(name like "M%") ex({city:name,country:(@c!country!name)}) FROM Person'
		);
		assert.deepEqual(res, [{city: 'Milano', country: 'Italy'}]);
		done();
	});

	it.skip('10. SEARCH TO', function (done) {
		var res = alasql('search / city to @c ! ex({city:name,num:len(@c)}) FROM Person');
		assert.deepEqual(res, [
			{city: 'Rome', num: 1},
			{city: 'Milano', num: 2},
			{city: 'Berlin', num: 3},
			{city: 'Cairo', num: 4},
		]);
		done();
	});

	it.skip('11. SEARCH EX JSON', function (done) {
		var res = alasql('search / city to @c ! @[name,len(@c)] FROM Person');
		assert.deepEqual(res, [
			['Rome', 1],
			['Milano', 2],
			['Berlin', 3],
			['Cairo', 4],
		]);
		done();
	});

	it.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test302');
		done();
	});
});
