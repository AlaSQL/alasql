if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 318 PATH in GRAPH', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test318; USE test318');
		var res = alasql(
			'CREATE GRAPH Pablo, Maxim, Alex, Napoleon, \
      Josephine,  Kate, Julia  {age:27}, Paloma, \
      #Pablo >loves> #Julia, #Maxim >> #Julia, #Alex >> #Kate, \
      #Kate >> #Julia, #Alex >> #Paloma, #Napoleon > "loves" > #Josephine, \
      #Josephine >"knows"> #Pablo'
		);
		done();
	});

	it('2. Simple graph', function(done) {
		var res = alasql('SEARCH PATH(#Josephine) name FROM #Napoleon ');
		assert.deepEqual(res, ['loves', 'Josephine']);
		done();
	});

	it('3. Simple graph', function(done) {
		var res = alasql('SEARCH PATH(#Josephine) EDGE name FROM #Napoleon');
		assert.deepEqual(res, ['loves']);
		//    console.log(res);
		done();
	});

	it('4. Simple graph', function(done) {
		var res = alasql('SEARCH PATH(#Josephine) EDGE set(color="red") FROM #Napoleon');
		assert.deepEqual(res, [alasql.databases[alasql.useid].objects[5]]);
		done();
	});

	it('5. Simple graph', function(done) {
		var res = alasql('SEARCH PATH(#Pablo) name FROM #Napoleon ');
		assert.deepEqual(res, ['loves', 'Josephine', 'knows', 'Pablo']);
		done();
	});

	it('6. Simple graph', function(done) {
		var res = alasql('SEARCH DISTINCT(PATH(#Julia) EDGE name) ORDER BY() FROM #Napoleon');
		assert.deepEqual(res, ['knows', 'loves']);
		var res = alasql('SEARCH DISTINCT(PATH(#Julia) EDGE name) ORDER BY(ASC) FROM #Napoleon');
		assert.deepEqual(res, ['knows', 'loves']);
		var res = alasql('SEARCH DISTINCT(PATH(#Julia) EDGE name) ORDER BY(DESC) FROM #Napoleon');
		assert.deepEqual(res, ['loves', 'knows']);
		done();
	});

	it('7. Simple graph', function(done) {
		var res = alasql('SEARCH PATH(age) name FROM #Napoleon ');
		assert.deepEqual(res, ['loves', 'Josephine', 'knows', 'Pablo', 'loves', 'Julia']);

		done();
	});

	it('8. D3() selector', function(done) {
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test318');
		done();
	});
});
