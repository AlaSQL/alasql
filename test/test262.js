if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	describe('Test 262 Leaking of "key" variable to global scope', function() {
		it('1. Sqllogic', function(done) {
			mytable = [{name: 'Hello'}, {name: 'Wolrd'}];

			assert(typeof global.key == 'undefined'); // undefined

			// To catch
			if (false) {
				Object.defineProperty(global, 'key', {
					get: function() {
						assert(false);
					},
					set: function(newValue) {
						assert(false);
					},
				});
			}

			alasql('SELECT * FROM ?', [mytable]);
			assert(typeof global.key == 'undefined'); // undefined

			done();
		});
	});
}
