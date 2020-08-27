if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports != 'object') {
	describe('Test 171 - WebSQL', function () {
		if (false) {
			it('1. Create WebSQL database ', function (done) {
				alasql('create websql database test171', [], function (res) {
					assert(res == 1);
					done();
				});
			});

			it('2. Drop WebSQL dtatabse', function (done) {
				assert.throws(function () {
					alasql('drop websql database test171');
				}, Error);
				done();
			});

			it('3. Attach WebSQL database', function (done) {
				alasql('attach websql database test171', [], function (res) {
					assert(res == 1);
					done();
				});
			});

			it('4. Create table WebSQL', function (done) {
				alasql('create table cities (city varchar, population int)', [], function (res) {
					assert(res == 1);
					done();
				});
			});

			it('5. Select into WebSQL table', function (done) {
				var data = [
					{city: 'Tallinn', population: 399816},
					{city: 'Riga', population: 703260},
					{city: 'Vilnius', population: 557126},
				];
				alasql('select * into cities from ?', [], function (res) {
					assert(res == 1);
					done();
				});
			});

			it('6. Select data from WebSQL table', function (done) {
				alasql('select column city from cities order by population desc', [], function (res) {
					assert.deepEqual(res, ['Riga', 'Vilnius', 'Tallinn']);
					done();
				});
			});

			it('7. INSERT INTO WebSQL ', function (done) {
				alasql(
					'insert into cities values ("Helsinky",564373), ("Helsinky",593045), ("Stokholm",789024)',
					[],
					function (res) {
						assert(res == 3);
						done();
					}
				);
			});

			it('8. DELETE WebSQL ', function (done) {
				alasql('delete from cities where population < 600000', [], function (res) {
					assert(res == 4);
					done();
				});
			});

			it('8. UPDATE WebSQL ', function (done) {
				alasql('update cities set population = 1000000 where city like "S%"', [], function (res) {
					assert(res == 1);
					alasql('select column city from cities order by population desc', [], function (res) {
						assert.deepEqual(res, ['Riga', 'Stokholm']);
						done();
					});
				});
			});
		}
	});
}
