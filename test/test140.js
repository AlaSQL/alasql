if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 140 JavaScript Functions', function () {
	it('1. Simple Date functions', function (done) {
		alasql('CREATE DATABASE test140; use test140');

		var res = alasql('SELECT * FROM ?', [[{d: new Date(2014, 0, 1)}, {d: new Date(2015, 11, 31)}]]);
		assert(res.length == 2);
		assert(res[0].d.getFullYear); // be aware This can cause same year for both data here depending on locale settings

		var res = alasql('SELECT COLUMN d->getFullYear() FROM ?', [
			[{d: new Date(2014, 6, 1)}, {d: new Date(2015, 6, 31)}],
		]);
		assert.deepEqual(res, [2014, 2015]);

		var res = alasql('SELECT d->getFullYear() AS d FROM ?', [
			[{d: new Date(2014, 6, 1)}, {d: new Date(2015, 6, 31)}],
		]);
		assert.deepEqual(res, [{d: 2014}, {d: 2015}]);

		done();
	});

	it('2. Simple String functions', function (done) {
		var res = alasql('SELECT COLUMN d->substr(e) FROM ?', [
			[
				{d: 'abcd', e: 1},
				{d: 'ABCD', e: 2},
			],
		]);
		assert.deepEqual(res, ['bcd', 'CD']);

		var res = alasql('SELECT COLUMN d->substr(e,e) FROM ?', [
			[
				{d: 'abcd', e: 1},
				{d: 'ABCD', e: 2},
			],
		]);
		assert.deepEqual(res, ['b', 'CD']);

		done();
	});

	it('3. NEW keyword', function (done) {
		alasql.fn.Date = Date;

		var res = alasql('SELECT VALUE new Date(2014,6,1)');
		assert(res.getFullYear() == 2014);

		var res = alasql('SELECT VALUE new Date(2014,6,1)->getFullYear()');
		assert(res == 2014);

		done();
	});

	it('4. Create table with Date', function (done) {
		alasql.fn.Date = Date;

		alasql('CREATE TABLE one (d Date)');

		alasql('INSERT INTO one VALUES (new Date(2014,6,1)), (new Date(2015,6,2))');

		var res = alasql('SELECT COLUMN d->getFullYear() FROM one');
		assert.deepEqual(res, [2014, 2015]);

		var res = alasql('SELECT COLUMN d->getFullYear() FROM one WHERE d === new Date(2015,6,1)');
		assert.deepEqual(res, []);

		var res = alasql('SELECT COLUMN d->getFullYear() FROM one WHERE d === new Date(2015,6,2)');
		assert.deepEqual(res, [2015]);
		done();
	});

	it('5. Create table with default conversion Date', function (done) {
		alasql('CREATE TABLE two (d DATE)');

		alasql('INSERT INTO two VALUES ("2014-06-01"), ("2015-06-02")');

		var res = alasql('SELECT COLUMN d FROM two');
		assert.deepEqual(res, ['2014-06-01', '2015-06-02']);
		//		assert.deepEqual(res,[2014,2015]);
		//		console.log(res);

		var res = alasql('SELECT COLUMN d FROM two');
		assert.deepEqual(res, ['2014-06-01', '2015-06-02']);
		done();
	});

	it('6. Create table with default conversion Date', function (done) {
		alasql('CREATE TABLE three (d Date)');

		alasql('INSERT INTO three VALUES ("2014-06-01"), ("2015-06-02")');

		var res = alasql('SELECT COLUMN d->getFullYear() FROM three');
		assert.deepEqual(res, [2014, 2015]);
		done();
	});

	it('7. Create table with default conversion Date', function (done) {
		delete alasql.fn.Date;
		alasql('CREATE TABLE four (d Date)');

		alasql('INSERT INTO four VALUES ("2014-06-02"), ("2015-06-03")');

		var res = alasql('SELECT COLUMN YEAR(d) FROM four');
		assert.deepEqual(res, [2014, 2015]);

		var res = alasql('SELECT COLUMN MONTH(d) FROM four');
		assert.deepEqual(res, [6, 6]);

		var res = alasql('SELECT COLUMN DAY(d) FROM four');
		assert.deepEqual(res, [new Date('2014-06-02').getDate(), new Date('2014-06-03').getDate()]);

		//		console.log(res);
		var res = alasql('SELECT COLUMN d FROM four');
		assert.deepEqual(res, ['2014-06-02', '2015-06-03']);

		done();
	});

	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test140');
		done();
	});
});
