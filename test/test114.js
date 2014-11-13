if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
	var zt = require('../lib/zt/zt.js');
};

describe('Test 114 - RANDOM()', function() {

		var ast = alasql.parse('select random(), random(), random(100), random(100)');
		console.log(ast.toString());
		console.log(ast);

	it('Select random values', function(done) {
		var res = alasql.matrix('select random() AS 0, random() AS 1, random(100) AS 2, random(100) AS 3 from ? a',[[1]]);
		assert(res[0].length == 4);
		assert(res[0][0] < 1);
		assert(res[0][1] < 1);
		done();
	});

	it('Create table with default constraint', function() {
		alasql('create database rnd');
		alasql('use rnd');
		alasql('create table one (a int default random(100))');
		alasql('insert into one values (10)');
		var res = alasql.queryValue('select count(*) from one');
		assert(res == 0);
		done();		
	});


		console.log(alasql('select count(*) from one'));


	it('Fill with random values', function() {
		for(var i=0; i<1000; i++) {
			alasql('insert into one default values');	
		}
		var res = alasql.value('select count(*) from one');
		assert(res == 1000);

		// Big random numbers
		var res = alasql.value('select sum(a) from one');
		assert(res >= 0 && res <= 1000*100);
		done();
	});

});
