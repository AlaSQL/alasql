if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '806'; // insert test file number

describe(
	'Test ' + test + ' - INSERT statement to string has parenthesis around values.',
	function () {
		it("Insert's toString() returns values within parenthesis", function () {
			var expectedToStringValue1 = "INSERT INTO test VALUES (555,'String',NULL,2.4)";
			var expectedToStringValue2 =
				"INSERT INTO cities VALUES ('Rome',2863223),('Paris',2249975),('Berlin',3517424),('Madrid',3041579)";

			var statements = alasql.parse(expectedToStringValue1 + ';' + expectedToStringValue2)
				.statements;

			assert.equal(statements[0].toString(), expectedToStringValue1);
			assert.equal(statements[1].toString(), expectedToStringValue2);
		});
	}
);
