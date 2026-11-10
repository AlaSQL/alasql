if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1610'; // SOURCE and REQUIRE read files through alasql.utils.loadFile

describe(`Test ${testId} - SOURCE and REQUIRE read files through alasql.utils.loadFile`, function () {
	var original;
	var asked = [];
	var files = {
		'/virtual/script1610.sql': 'CREATE TABLE t1610 (a INT); INSERT INTO t1610 VALUES (1), (2);',
		'/virtual/plugin1610.js': 'alasql.fn.PLUGIN1610 = function () { return 42; };',
	};

	before(function () {
		original = alasql.utils.loadFile;
		// A replacement, as a test runner or an application could install
		alasql.utils.loadFile = function (path, asy, success, error) {
			asked.push(path);
			if (!(path in files)) return original.apply(this, arguments);
			success(files[path]);
		};
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql.utils.loadFile = original;
		alasql('drop database test' + testId);
	});

	it('A) SOURCE reads the file through the replacement', function () {
		alasql('SOURCE "/virtual/script1610.sql"');
		assert.ok(asked.includes('/virtual/script1610.sql'));
		assert.deepStrictEqual(alasql('SELECT * FROM t1610'), [{a: 1}, {a: 2}]);
	});

	it('B) REQUIRE reads the file through the replacement', function () {
		alasql('REQUIRE "/virtual/plugin1610.js"');
		assert.ok(asked.includes('/virtual/plugin1610.js'));
		assert.strictEqual(alasql('VALUE OF SELECT PLUGIN1610()'), 42);
	});
});
