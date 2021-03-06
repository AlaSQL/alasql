if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports != 'object') {
	describe('Test 154 - IndexedDB test', function () {
		it('1. Create Database and Table', function (done) {
			alasql('DROP IndexedDB DATABASE IF EXISTS ag154', [], function (res1) {
				assert(res1 == 1 || res1 == 0);
				alasql('CREATE IndexedDB DATABASE ag154', [], function (res2) {
					assert(res2 == 1);
					alasql('SHOW IndexedDB DATABASES', [], function (res3) {
						var found = false;
						res3.forEach(function (d) {
							found = found || d.databaseid == 'ag154';
						});
						assert(found);
						alasql('ATTACH IndexedDB DATABASE ag154', [], function (res4) {
							assert(res4 == 1);
							alasql('CREATE TABLE ag154.one', [], function (res5) {
								assert(res5 == 1);
								alasql('SHOW TABLES FROM ag154', [], function (res6) {
									assert(res6.length == 1);
									assert(res6[0].tableid == 'one');
									// console.log(997,res);

									alasql('DROP TABLE ag154.one', [], function (res7) {
										// console.log(998,res);
										assert(res7 == 1);
										alasql('SHOW TABLES FROM ag154', [], function (res8) {
											// console.log(999,res);
											assert(res8.length == 0);
											// console.log(alasql.databases.ag154);
											alasql('DETACH DATABASE ag154;DROP IndexedDB DATABASE ag154', [], function (
												res9
											) {
												assert(res9[0] == 1);
												assert(res9[1] == 1);
												//											console.log(res);
												done();
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}
