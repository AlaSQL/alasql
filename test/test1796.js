if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1796 Multi-line comments', function () {
	it('1. /* */ and -- style comments', function (done) {
		var res = alasql.utils.uncomment('one /* two \n three */ four \n five -- six\nseven');
		//        console.log(res);
		assert.equal(res, 'one  four \n five \nseven');
		done();
	});

	it('2. /* */', function (done) {
		var res = alasql.utils.uncomment('SELECT /* xxx */ VALUE /* blahblah \n tuturututu */ 1');
		// console.log(res);
		assert.equal(res, 'SELECT  VALUE  1');
		done();
	});
});
