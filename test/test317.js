if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 317 GRAPH', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test317; USE test317');
		done();
	});

	it.skip('2. Simple graph', function(done) {
		alasql('CREATE CLASS loves; CREATE CLASS hates');
		var res = alasql(
			'CREATE GRAPH Pablo, Maxim, Alex, Kate, Julia, Paloma, \
      #Pablo > "loves" > #Julia, #Maxim > "loves" > #Julia, #Alex > "loves" > #Kate, \
      #Kate > "hates" > #Julia, #Alex > "loves" > #Paloma'
		);
		//    var res = alasql('SEARCH #Alex > "loves" > AS @p1 < "hates" < #Julia');
		//    var res = alasql('SEARCH #Alex > "loves" > AS @p < "hates" < #Julia @p');
		//    var res = alasql('SEARCH #Alex > "loves" > AS @p > "hates" > #Julia @p');
		done();
	});

	it.skip('3. Simple graph', function(done) {
		var res = alasql('SEARCH > "loves" > name FROM #Alex');
		assert.deepEqual(res, ['Kate', 'Paloma']);
		done();
	});

	it.skip('4. Simple graph', function(done) {
		var res = alasql('SEARCH / VERTEX AS @p OR(<,>) @p name');
		assert.deepEqual(res, ['Pablo', 'Maxim', 'Alex', 'Kate', 'Julia', 'Paloma']);
		done();
	});

	it.skip('5. Simple graph', function(done) {
		var res = alasql('SEARCH / VERTEX AS @p AND(<,>) @p name');
		assert.deepEqual(res, ['Kate']);
		done();
	});

	it.skip('6. Simple graph', function(done) {
		var res = alasql('SEARCH / VERTEX AS @p AND(<"loves",<"hates") @p name');
		assert.deepEqual(res, ['Julia']);
		done();
	});

	it.skip('7. Simple graph', function(done) {
		var res = alasql('SEARCH DISTINCT(/ VERTEX AS @p < OR("loves","hates") @p name)');
		assert.deepEqual(res, ['Kate', 'Julia', 'Paloma']);

		var res = alasql('SEARCH / VERTEX AS @p IF(< OR("loves","hates") <) name');
		assert.deepEqual(res, ['Kate', 'Julia', 'Paloma']);

		var res = alasql('SEARCH / VERTEX AS @p IF(< OR("loves","hates")) name');
		assert.deepEqual(res, ['Kate', 'Julia', 'Paloma']);
		done();
	});

	it.skip('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test317');
		done();
	});
});
