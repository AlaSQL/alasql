
// require(['../../alasql.js'], function(alasql) {
// 	alasql('CREATE TABLE test1 (a int, b int, c int)');
// 	alasql('INSERT INTO test1 VALUES (1,10,1)');
// 	console.log(alasql('SELECT * FROM test1'));
// });
    require(['../../alasql.js'], function(alasql) {
        var test1 = [{a:1,b:2,c:3},{a:4,b:5,c:6},{a:7,b:8,c:9}];
        console.table(alasql('SELECT a, b*c AS bc FROM ? AS t',[test1]));
    });
