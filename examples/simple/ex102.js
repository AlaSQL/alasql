
require(['../../alasql.js'], function(alasql) {
	alasql('CREATE TABLE test1 (a int, b int, c int)');
	alasql('INSERT INTO test1 VALUES (1,10,1)');
	console.log(alasql('SELECT * FROM test1'));
});
