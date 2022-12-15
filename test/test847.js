if (typeof exports === 'object') {
	// var assert = require('assert');
	var alasql = require('..');
}

describe('Test 847 - Testing backtick call function', function () {
	it('Should create a table', function (done) {
		const table = {
			name: 'Midnight_Calls',
			columns: [
				{name: 'id', type: 'INT'},
				{name: 'track_name', type: 'STRING'},
				{name: 'author', type: 'STRING'},
			],
		};
		alasql`CREATE TABLE ${table.name} (${table.columns.map(
			(item) => `${item.name} ${item.type}`
		)})`;
		done();
	});
});
