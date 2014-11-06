console.log('SPEED TESTS FROM http://www.sqlite.org/speed.html');

var zt = require('../../lib/zt/zt.js');
var alasql = require('../../alasql');

var db = new alasql.Database();

console.log('test 1');
zt('TEST1 - 1000 INSERTs', 1, function(){
//	alasql.exec('CREATE TABLE t1(a INTEGER, b INTEGER, c VARCHAR(100))');
// TODO: VARCHAR(100) syntax
	db.exec('CREATE TABLE t1(a INTEGER, b INTEGER, c STRING)');
	for(var i=0;i<1000;i++) {
		db.exec('INSERT INTO t1 VALUES ('+i+', '+(i*i*i%100000)+",'bla-blah-blah')");
	}
});

console.log('test 2');
zt('TEST2 - 25000 INSERTs in a transaction',function(){
// TODO: BEGIN AND COMMIT sql statements
// TODO: Fast insert parser (may be separate parser)
	db.transaction(function(){
		db.exec('CREATE TABLE t2 (a INTEGER, b INTEGER, c STRING)');
		for(var i=0;i<25000;i++) {
			db.exec('INSERT INTO t2 VALUES ('+i+', '+(i*i*i%100000)+",'bla-blah-blah')");
		};		
	});
});

console.log('test 3');
zt('TEST3 - 25000 INSERTs into an indexed table',function(){
// TODO: Indexies
	db.exec('CREATE TABLE t3 (a INTEGER, b INTEGER, c STRING)');
	for(var i=0;i<25000;i++) {
		db.exec('INSERT INTO t3 VALUES ('+i+', '+(i*i*i%100000)+",'bla-blah-blah')");
	};		
});

console.log('test 4');
zt('TEST4 - 100 SELECTs without an index',function(){
// TODO AVG
	db.transaction(function(){
		for(var i=0;i<100;i++) {
			db.exec('SELECT COUNT(*), SUM(b) FROM t2 WHERE b>='+(i*100)+' AND b<'+(i*100+1000));
		};
	});
});
console.log('test 5');
console.log('test 6');
console.log('test 7');

console.log('test 8');
zt('TEST8 - 1000 UPDATEs without an index',function(){
// TODO AVG
	db.transaction(function(){
		for(var i=0;i<100;i++) {
			db.exec('UPDATE t1 SET b=b*2 WHERE b>='+(i*10)+' AND b<'+(i*10+10));
		};
	});
});

console.log('test 9');
zt('TEST9 - 1000 UPDATEs without an index',function(){
// TODO AVG
	db.transaction(function(){
		for(var i=0;i<25000;i++) {
			db.exec('UPDATE t2 SET b='+(i*i*i%100000)+' WHERE a='+i);
		};
	});
});

console.log('test 10');
console.log('test 11');
console.log('test 12');

console.log('test 13');
zt('TEST13 - DELETE with an index',function(){
	db.exec('DELETE FROM t2 WHERE a>10 AND a<20000');
});

console.log('test 14');
console.log('test 15');

console.log('test 16');
zt('TEST16 - DROP TABLE',function(){
	db.exec('DROP TABLE t1');
	db.exec('DROP TABLE t2');
	db.exec('DROP TABLE t3');
});

zt.log();