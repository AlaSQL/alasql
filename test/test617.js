if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '617'; // insert test file number

describe(
	'Test ' + test + ' - Where LTRIM will remove leading whitespace characters in an expression.',
	function () {
		it('A) Will remove leading whitespace only', function () {
			var sql = "select LTRIM('      Hello World !') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], 'Hello World !');
		});

		it('B) Will NOT trim the trailing whitespace.', function () {
			var sql = "select LTRIM('      Hello World !     ') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], 'Hello World !     ');
		});

		it('C) Will change nothing if expression has no whitespace.', function () {
			var sql = "select LTRIM('Hello World !') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], 'Hello World !');
		});

		it('D) Will return undefined if null expression is passed in.', function () {
			var sql = 'select LTRIM(NULL) AS Result';
			var res = alasql(sql);
			assert.equal(res[0]['Result'], undefined);
		});
		it('E) Will change nothing if expression is using tabs.', function () {
			// char(9) = tabs;
			var sql = "select LTRIM(char(9) + 'Hello World !') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], '\t' + 'Hello World !');
		});
		it('F) Will remove only leading whitespace in expression and NOT the tabs', function () {
			// char(9) = tabs;
			var sql = "select LTRIM('  ' + char(9) + char(9) + 'Hello World !') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], '\t\t' + 'Hello World !');
		});
		it('G) Will change nothing if expression is using newlines.', function () {
			// char(10) = newline;
			var sql = "select LTRIM( char(10) + 'Hello World !') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], '\n' + 'Hello World !');
		});
		it('H) Will remove only leading whitespace in expression and NOT the newlines', function () {
			// char(10) = newline;
			var sql = "select LTRIM('  ' + char(10) + char(10) + 'Hello World !') AS Result";
			var res = alasql(sql);
			assert.equal(res[0]['Result'], '\n\n' + 'Hello World !');
		});
	}
);
