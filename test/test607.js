if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
}

var test = '607'; // insert test file number

describe('Test '+test+' - TRUNCATE on Local Storage table', function() {

	before(function(){
		alasql('create LOCAL STORAGE database test'+test);
		alasql('ATTACH LOCALSTORAGE DATABASE test'+test);
		alasql('use test'+test);
		alasql('create table one (a int)');
		alasql('insert into one values (1),(2),(3),(4),(5)');
	});

	after(function(){
		alasql('drop database test'+test);
	});

	it('A) attempt TRUNCATE on table', function(){
		var res = alasql('TRUNCATE TABLE one');
		assert.equal(res, 1);
	});
});
