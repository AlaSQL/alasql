if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 49 - Insert with primary key (not realized yet!)', function() {
	describe('INSERT WITH PRIMARY KEY', function(){

		it('1: INSERT ONE COLUMN PRIMARY KEY: NOT REALIZED YET!!!', function(done){

			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
			alasql('INSERT INTO one VALUES (1,1)');
			alasql('INSERT INTO one VALUES (2,2)');

			// Check primarykey
			// CHeck indices
			// Check primarykey.keyfn, key.fns

			done();
		});

		it('2: THROWS ERROR WHEN INSERT two same values: THIS FUNCTION IS NOT REALIZED YET!', function(done){

			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
			alasql('INSERT INTO one VALUES (1,1)');

//			assert.throws(function() {
//				alasql('INSERT INTO one VALUES (2,2)');
//			}, Error );

			done();
		});

		it('3: Delete row with primary key: NOT REALIZED YET!!!', function(done){

			alasql('DROP TABLE IF EXISTS one');
			alasql('CREATE TABLE one (a INT PRIMARY KEY, b INT)');
			alasql('INSERT INTO one VALUES (1,1)');
			alasql('INSERT INTO one VALUES (2,2)');
			alasql('INSERT INTO one VALUES (3,3)');
			alasql('DELETE FROM one WHERE a = 1');
			var res = alasql.queryValue('SELECT COUNT(*) FROM one');
			assert.equal(2,res);
			// Check primary key
			done();
		});
	});
});
