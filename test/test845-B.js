if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

/*
  Test for issue #845 - Problem catching errors using the simple notation
*/

var test = '845-B';

if (typeof exports != 'object') {
	describe('Test ' + test + ' - Error handling with ATTACH IndexedDB', function () {
		it('1. Should catch error when attaching non-existent database with errorlog enabled', function (done) {
			alasql.options.errorlog = true;
			alasql('ATTACH INDEXEDDB DATABASE nonExistentDB845;', function (data, err) {
				assert(err, 'Error should be passed to callback');
				assert(
					err.message.includes('does not exist'),
					'Error message should indicate database does not exist'
				);
				alasql.options.errorlog = false;
				done();
			});
		});

		it('2. Should catch error using errorlog function', function (done) {
			var errorCaught = false;
			alasql.options.errorlog = function (err) {
				errorCaught = true;
				assert(err, 'Error should be passed to errorlog function');
			};
			alasql('ATTACH INDEXEDDB DATABASE nonExistentDB845b;', function (data, err) {
				assert(err, 'Error should also be passed to callback');
				alasql.options.errorlog = false;
				done();
			});
		});

		it('3. Should work when database exists', async function () {
			// First create a database
			await alasql.promise('DROP INDEXEDDB DATABASE IF EXISTS testDB845');
			await alasql.promise('CREATE INDEXEDDB DATABASE testDB845');

			// Now attach it with error handling enabled
			alasql.options.errorlog = true;
			const result = await new Promise((resolve, reject) => {
				alasql('ATTACH INDEXEDDB DATABASE testDB845;', function (data, err) {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});

			assert.equal(result, 1, 'Should successfully attach existing database');
			alasql.options.errorlog = false;

			// Cleanup
			await alasql.promise('DETACH DATABASE testDB845');
			await alasql.promise('DROP INDEXEDDB DATABASE testDB845');
		});
	});
}
