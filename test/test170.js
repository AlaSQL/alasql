if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports === 'object' && false) {

describe('Test 170 - INTO result variable', function() {
	it('1. Write TXT file into stdout', function(done) {
		var data = [{city: 'Rome', population: 3400000}, {city: 'Astana', population: 800000}];
		var res = alasql('select * into txt() from ?', [data], function(res) {
			assert(res == 'Rome\nAstana');
			done();
		});
	});

	it('2. Write CSV file into stdout', function(done) {
		var data = [{city: 'Rome', population: 3400000}, {city: 'Astana', population: 800000}];
		var res = alasql(
			'select * into csv({headers:true, utf8Bom:false}) from ?',
			[data],
			function(res) {
				assert.equal(res, '"city";"population"\r\n"Rome";3400000\r\n"Astana";800000\r\n');
				done();
			}
		);
	});
});
//}
