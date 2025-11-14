// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 317 GRAPH', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test317; USE test317');
		done();
	});

	test.skip('2. Simple graph', function (done) {
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

	test.skip('3. Simple graph', function (done) {
		var res = alasql('SEARCH > "loves" > name FROM #Alex');
		assert.deepEqual(res, ['Kate', 'Paloma']);
		done();
	});

	test.skip('4. Simple graph', function (done) {
		var res = alasql('SEARCH / VERTEX AS @p OR(<,>) @p name');
		assert.deepEqual(res, ['Pablo', 'Maxim', 'Alex', 'Kate', 'Julia', 'Paloma']);
		done();
	});

	test.skip('5. Simple graph', function (done) {
		var res = alasql('SEARCH / VERTEX AS @p AND(<,>) @p name');
		assert.deepEqual(res, ['Kate']);
		done();
	});

	test.skip('6. Simple graph', function (done) {
		var res = alasql('SEARCH / VERTEX AS @p AND(<"loves",<"hates") @p name');
		assert.deepEqual(res, ['Julia']);
		done();
	});

	test.skip('7. Simple graph', function (done) {
		var res = alasql('SEARCH DISTINCT(/ VERTEX AS @p < OR("loves","hates") @p name)');
		assert.deepEqual(res, ['Kate', 'Julia', 'Paloma']);

		var res = alasql('SEARCH / VERTEX AS @p IF(< OR("loves","hates") <) name');
		assert.deepEqual(res, ['Kate', 'Julia', 'Paloma']);

		var res = alasql('SEARCH / VERTEX AS @p IF(< OR("loves","hates")) name');
		assert.deepEqual(res, ['Kate', 'Julia', 'Paloma']);
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test317');
		done();
	});
});
