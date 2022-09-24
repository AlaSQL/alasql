if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 260 SqlLogic Parser Test #3', function () {
	it.skip('1. Sqllogic', function (done) {
		alasql('CREATE DATABASE test260; USE test260');
		done();
	});

	it.skip('3. SELECT ALL', function (done) {
		done();
	});
	/*

 IF EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_NAME = 'view_1_tab0_153') DROP VIEW view_1_tab0_153

Cannot read property 'tables' of undefined




 CREATE VIEW view_1_tab0_157 AS SELECT pk, col0 FROM tab0 WHERE (col0 IN (SELECT col3 FROM tab0 WHERE ((col0 IS NULL) OR col3 > 5 OR col3 <= 50 OR col1 < 83.11))) OR col0 > 75

Cannot read property 'columns' of undefined




 DROP VIEW view_1_tab0_157

Can not drop table 'view_1_tab0_157', because it does not exist in the database.



SELECT ALL * FROM tab1 cor0 CROSS JOIN tab1, tab2 AS cor1 

SELECT DISTINCT * FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) IS NOT NULL, tab0 AS cor2 


SELECT CASE WHEN c>(SELECT avg(c) FROM t1) THEN a*2 ELSE b*10 END FROM t1 ORDER BY 1


SELECT CASE a+1 WHEN b THEN 111 WHEN c THEN 222 WHEN d THEN 333 WHEN e THEN 444 ELSE 555 END FROM t1 ORDER BY 1

SELECT (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b) FROM t1 WHERE (a>b-2 AND a<b+2) OR c>d ORDER BY 1

*/

	it.skip('99. Drop Database', function (done) {
		alasql('DROP DATABASE test260');
		done();
	});
});
