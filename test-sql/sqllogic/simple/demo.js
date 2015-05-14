if(typeof exports === 'object') { 
 					var assert = require('assert'); 
 					var alasql = require('../../../dist/alasql.js'); 	
 				};
 				//alasql.options.modifier = 'COLUMN'; 
describe('SQLLOGICTEST', function(){



it('1. query',function(done){
console.log("SELECT 1 IN ( )");
var res = alasql("SELECT 1 IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('2. query',function(done){
console.log("SELECT 1 IN ( 2 )");
var res = alasql("SELECT 1 IN ( 2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('3. query',function(done){
console.log("SELECT 1 IN ( 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 )");
var res = alasql("SELECT 1 IN ( 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('4. query',function(done){
console.log("SELECT 1 NOT IN ( )");
var res = alasql("SELECT 1 NOT IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('5. query',function(done){
console.log("SELECT 1 NOT IN ( 2 )");
var res = alasql("SELECT 1 NOT IN ( 2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('6. query',function(done){
console.log("SELECT 1 NOT IN ( 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 )");
var res = alasql("SELECT 1 NOT IN ( 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('7. query',function(done){
console.log("SELECT null IN ( )");
var res = alasql("SELECT null IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('8. query',function(done){
console.log("SELECT null NOT IN ( )");
var res = alasql("SELECT null NOT IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('9. statement ok',function(done){
console.log("CREATE TABLE t1 ( x INTEGER )");
var res = alasql("CREATE TABLE t1 ( x INTEGER )")
assert(res==1);
done();
});

it('10. query',function(done){
console.log("SELECT 1 IN t1");
var res = alasql("SELECT 1 IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('11. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t1 )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('12. query',function(done){
console.log("SELECT 1 NOT IN t1");
var res = alasql("SELECT 1 NOT IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('13. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT * FROM t1 )");
var res = alasql("SELECT 1 NOT IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('14. query',function(done){
console.log("SELECT null IN t1");
var res = alasql("SELECT null IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('15. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t1 )");
var res = alasql("SELECT null IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('16. query',function(done){
console.log("SELECT null NOT IN t1");
var res = alasql("SELECT null NOT IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('17. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t1 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('18. statement ok',function(done){
console.log("CREATE TABLE t2 ( y INTEGER PRIMARY KEY )");
var res = alasql("CREATE TABLE t2 ( y INTEGER PRIMARY KEY )")
assert(res==1);
done();
});

it('19. query',function(done){
console.log("SELECT 1 IN t2");
var res = alasql("SELECT 1 IN t2")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('20. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t2 )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('21. query',function(done){
console.log("SELECT 1 NOT IN t2");
var res = alasql("SELECT 1 NOT IN t2")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('22. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT * FROM t2 )");
var res = alasql("SELECT 1 NOT IN ( SELECT * FROM t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('23. query',function(done){
console.log("SELECT null IN t2");
var res = alasql("SELECT null IN t2")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('24. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t2 )");
var res = alasql("SELECT null IN ( SELECT * FROM t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('25. query',function(done){
console.log("SELECT null NOT IN t2");
var res = alasql("SELECT null NOT IN t2")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('26. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t2 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('27. statement ok',function(done){
console.log("CREATE TABLE t3 ( z INTEGER UNIQUE )");
var res = alasql("CREATE TABLE t3 ( z INTEGER UNIQUE )")
assert(res==1);
done();
});

it('28. query',function(done){
console.log("SELECT 1 IN t3");
var res = alasql("SELECT 1 IN t3")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('29. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t3 )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t3 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('30. query',function(done){
console.log("SELECT 1 NOT IN t3");
var res = alasql("SELECT 1 NOT IN t3")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('31. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT * FROM t3 )");
var res = alasql("SELECT 1 NOT IN ( SELECT * FROM t3 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('32. query',function(done){
console.log("SELECT null IN t3");
var res = alasql("SELECT null IN t3")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('33. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t3 )");
var res = alasql("SELECT null IN ( SELECT * FROM t3 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('34. query',function(done){
console.log("SELECT null NOT IN t3");
var res = alasql("SELECT null NOT IN t3")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('35. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t3 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t3 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('36. query',function(done){
console.log("SELECT 1 IN ( SELECT x + y FROM t1 , t2 )");
var res = alasql("SELECT 1 IN ( SELECT x + y FROM t1 , t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('37. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT x + y FROM t1 , t2 )");
var res = alasql("SELECT 1 NOT IN ( SELECT x + y FROM t1 , t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('38. query',function(done){
console.log("SELECT null IN ( SELECT x + y FROM t1 , t2 )");
var res = alasql("SELECT null IN ( SELECT x + y FROM t1 , t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('39. query',function(done){
console.log("SELECT null NOT IN ( SELECT x + y FROM t1 , t2 )");
var res = alasql("SELECT null NOT IN ( SELECT x + y FROM t1 , t2 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('40. query',function(done){
console.log("SELECT 1 . 23 IN ( )");
var res = alasql("SELECT 1 . 23 IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('41. query',function(done){
console.log("SELECT 1 . 23 NOT IN ( )");
var res = alasql("SELECT 1 . 23 NOT IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('42. query',function(done){
console.log("SELECT 1 . 23 IN t1");
var res = alasql("SELECT 1 . 23 IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('43. query',function(done){
console.log("SELECT 1 . 23 IN ( SELECT * FROM t1 )");
var res = alasql("SELECT 1 . 23 IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('44. query',function(done){
console.log("SELECT 1 . 23 NOT IN t1");
var res = alasql("SELECT 1 . 23 NOT IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('45. query',function(done){
console.log("SELECT 1 . 23 NOT IN ( SELECT * FROM t1 )");
var res = alasql("SELECT 1 . 23 NOT IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('46. query',function(done){
console.log("SELECT ' hello ' IN ( )");
var res = alasql("SELECT ' hello ' IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('47. query',function(done){
console.log("SELECT ' hello ' NOT IN ( )");
var res = alasql("SELECT ' hello ' NOT IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('48. query',function(done){
console.log("SELECT ' hello ' IN t1");
var res = alasql("SELECT ' hello ' IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('49. query',function(done){
console.log("SELECT ' hello ' IN ( SELECT * FROM t1 )");
var res = alasql("SELECT ' hello ' IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('50. query',function(done){
console.log("SELECT ' hello ' NOT IN t1");
var res = alasql("SELECT ' hello ' NOT IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('51. query',function(done){
console.log("SELECT ' hello ' NOT IN ( SELECT * FROM t1 )");
var res = alasql("SELECT ' hello ' NOT IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('52. query',function(done){
console.log("SELECT x ' 303132 ' IN ( )");
var res = alasql("SELECT x ' 303132 ' IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('53. query',function(done){
console.log("SELECT x ' 303132 ' NOT IN ( )");
var res = alasql("SELECT x ' 303132 ' NOT IN ( )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('54. query',function(done){
console.log("SELECT x ' 303132 ' IN t1");
var res = alasql("SELECT x ' 303132 ' IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('55. query',function(done){
console.log("SELECT x ' 303132 ' IN ( SELECT * FROM t1 )");
var res = alasql("SELECT x ' 303132 ' IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('56. query',function(done){
console.log("SELECT x ' 303132 ' NOT IN t1");
var res = alasql("SELECT x ' 303132 ' NOT IN t1")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('57. query',function(done){
console.log("SELECT x ' 303132 ' NOT IN ( SELECT * FROM t1 )");
var res = alasql("SELECT x ' 303132 ' NOT IN ( SELECT * FROM t1 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('58. query',function(done){
console.log("SELECT 1 IN ( 2 , 3 , 4 )");
var res = alasql("SELECT 1 IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('59. query',function(done){
console.log("SELECT 1 NOT IN ( 2 , 3 , 4 )");
var res = alasql("SELECT 1 NOT IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('60. query',function(done){
console.log("SELECT ' a ' IN ( ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT ' a ' IN ( ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('61. query',function(done){
console.log("SELECT ' a ' NOT IN ( ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT ' a ' NOT IN ( ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('62. statement ok',function(done){
console.log("CREATE TABLE t4 ( a INTEGER UNIQUE )");
var res = alasql("CREATE TABLE t4 ( a INTEGER UNIQUE )")
assert(res==1);
done();
});

it('63. statement ok',function(done){
console.log("CREATE TABLE t5 ( b INTEGER PRIMARY KEY )");
var res = alasql("CREATE TABLE t5 ( b INTEGER PRIMARY KEY )")
assert(res==1);
done();
});

it('64. statement ok',function(done){
console.log("CREATE TABLE t6 ( c INTEGER )");
var res = alasql("CREATE TABLE t6 ( c INTEGER )")
assert(res==1);
done();
});

it('65. statement ok',function(done){
console.log("INSERT INTO t4 VALUES ( 2 )");
var res = alasql("INSERT INTO t4 VALUES ( 2 )")
assert(res==1);
done();
});

it('66. statement ok',function(done){
console.log("INSERT INTO t4 VALUES ( 3 )");
var res = alasql("INSERT INTO t4 VALUES ( 3 )")
assert(res==1);
done();
});

it('67. statement ok',function(done){
console.log("INSERT INTO t4 VALUES ( 4 )");
var res = alasql("INSERT INTO t4 VALUES ( 4 )")
assert(res==1);
done();
});

it('68. statement ok',function(done){
console.log("INSERT INTO t5 SELECT * FROM t4");
var res = alasql("INSERT INTO t5 SELECT * FROM t4")
assert(res==1);
done();
});

it('69. statement ok',function(done){
console.log("INSERT INTO t6 SELECT * FROM t4");
var res = alasql("INSERT INTO t6 SELECT * FROM t4")
assert(res==1);
done();
});

it('70. statement ok',function(done){
console.log("CREATE TABLE t4n ( a INTEGER UNIQUE )");
var res = alasql("CREATE TABLE t4n ( a INTEGER UNIQUE )")
assert(res==1);
done();
});

it('71. statement ok',function(done){
console.log("CREATE TABLE t6n ( c INTEGER )");
var res = alasql("CREATE TABLE t6n ( c INTEGER )")
assert(res==1);
done();
});

it('72. statement ok',function(done){
console.log("INSERT INTO t4n SELECT * FROM t4");
var res = alasql("INSERT INTO t4n SELECT * FROM t4")
assert(res==1);
done();
});

it('73. statement ok',function(done){
console.log("INSERT INTO t4n VALUES ( null )");
var res = alasql("INSERT INTO t4n VALUES ( null )")
assert(res==1);
done();
});

it('74. statement ok',function(done){
console.log("INSERT INTO t6n SELECT * FROM t4n");
var res = alasql("INSERT INTO t6n SELECT * FROM t4n")
assert(res==1);
done();
});

it('75. statement ok',function(done){
console.log("CREATE TABLE t7 ( a TEXT UNIQUE )");
var res = alasql("CREATE TABLE t7 ( a TEXT UNIQUE )")
assert(res==1);
done();
});

it('76. statement ok',function(done){
console.log("CREATE TABLE t7 ( a TEXT , UNIQUE ( a ( 1 ) ) )");
var res = alasql("CREATE TABLE t7 ( a TEXT , UNIQUE ( a ( 1 ) ) )")
assert(res==1);
done();
});

it('77. statement ok',function(done){
console.log("CREATE TABLE t8 ( c TEXT )");
var res = alasql("CREATE TABLE t8 ( c TEXT )")
assert(res==1);
done();
});

it('78. statement ok',function(done){
console.log("INSERT INTO t7 VALUES ( ' b ' )");
var res = alasql("INSERT INTO t7 VALUES ( ' b ' )")
assert(res==1);
done();
});

it('79. statement ok',function(done){
console.log("INSERT INTO t7 VALUES ( ' c ' )");
var res = alasql("INSERT INTO t7 VALUES ( ' c ' )")
assert(res==1);
done();
});

it('80. statement ok',function(done){
console.log("INSERT INTO t7 VALUES ( ' d ' )");
var res = alasql("INSERT INTO t7 VALUES ( ' d ' )")
assert(res==1);
done();
});

it('81. statement ok',function(done){
console.log("INSERT INTO t8 SELECT * FROM t7");
var res = alasql("INSERT INTO t8 SELECT * FROM t7")
assert(res==1);
done();
});

it('82. statement ok',function(done){
console.log("CREATE TABLE t7n ( a TEXT UNIQUE )");
var res = alasql("CREATE TABLE t7n ( a TEXT UNIQUE )")
assert(res==1);
done();
});

it('83. statement ok',function(done){
console.log("CREATE TABLE t7n ( a TEXT , UNIQUE ( a ( 1 ) ) )");
var res = alasql("CREATE TABLE t7n ( a TEXT , UNIQUE ( a ( 1 ) ) )")
assert(res==1);
done();
});

it('84. statement ok',function(done){
console.log("CREATE TABLE t8n ( c TEXT )");
var res = alasql("CREATE TABLE t8n ( c TEXT )")
assert(res==1);
done();
});

it('85. statement ok',function(done){
console.log("INSERT INTO t7n SELECT * FROM t7");
var res = alasql("INSERT INTO t7n SELECT * FROM t7")
assert(res==1);
done();
});

it('86. statement ok',function(done){
console.log("INSERT INTO t7n VALUES ( null )");
var res = alasql("INSERT INTO t7n VALUES ( null )")
assert(res==1);
done();
});

it('87. statement ok',function(done){
console.log("INSERT INTO t8n SELECT * FROM t7n");
var res = alasql("INSERT INTO t8n SELECT * FROM t7n")
assert(res==1);
done();
});

it('88. query',function(done){
console.log("SELECT 1 IN t4");
var res = alasql("SELECT 1 IN t4")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('89. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t4 )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('90. query',function(done){
console.log("SELECT 1 NOT IN t4");
var res = alasql("SELECT 1 NOT IN t4")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('91. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT * FROM t4 )");
var res = alasql("SELECT 1 NOT IN ( SELECT * FROM t4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('92. query',function(done){
console.log("SELECT 1 IN t5");
var res = alasql("SELECT 1 IN t5")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('93. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t5 )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t5 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('94. query',function(done){
console.log("SELECT 1 NOT IN t5");
var res = alasql("SELECT 1 NOT IN t5")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('95. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT * FROM t5 )");
var res = alasql("SELECT 1 NOT IN ( SELECT * FROM t5 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('96. query',function(done){
console.log("SELECT 1 IN t6");
var res = alasql("SELECT 1 IN t6")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('97. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t6 )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t6 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('98. query',function(done){
console.log("SELECT 1 NOT IN t6");
var res = alasql("SELECT 1 NOT IN t6")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('99. query',function(done){
console.log("SELECT 1 NOT IN ( SELECT * FROM t6 )");
var res = alasql("SELECT 1 NOT IN ( SELECT * FROM t6 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('100. query',function(done){
console.log("SELECT ' a ' IN t7");
var res = alasql("SELECT ' a ' IN t7")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('101. query',function(done){
console.log("SELECT ' a ' IN ( SELECT * FROM t7 )");
var res = alasql("SELECT ' a ' IN ( SELECT * FROM t7 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('102. query',function(done){
console.log("SELECT ' a ' NOT IN t7");
var res = alasql("SELECT ' a ' NOT IN t7")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('103. query',function(done){
console.log("SELECT ' a ' NOT IN ( SELECT * FROM t7 )");
var res = alasql("SELECT ' a ' NOT IN ( SELECT * FROM t7 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('104. query',function(done){
console.log("SELECT ' a ' IN t8");
var res = alasql("SELECT ' a ' IN t8")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('105. query',function(done){
console.log("SELECT ' a ' IN ( SELECT * FROM t8 )");
var res = alasql("SELECT ' a ' IN ( SELECT * FROM t8 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('106. query',function(done){
console.log("SELECT ' a ' NOT IN t8");
var res = alasql("SELECT ' a ' NOT IN t8")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('107. query',function(done){
console.log("SELECT ' a ' NOT IN ( SELECT * FROM t8 )");
var res = alasql("SELECT ' a ' NOT IN ( SELECT * FROM t8 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('108. query',function(done){
console.log("SELECT 2 IN ( 2 , 3 , 4 , null )");
var res = alasql("SELECT 2 IN ( 2 , 3 , 4 , null )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('109. query',function(done){
console.log("SELECT 3 NOT IN ( 2 , 3 , 4 , null )");
var res = alasql("SELECT 3 NOT IN ( 2 , 3 , 4 , null )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('110. query',function(done){
console.log("SELECT 4 IN ( 2 , 3 , 4 )");
var res = alasql("SELECT 4 IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('111. query',function(done){
console.log("SELECT 2 NOT IN ( 2 , 3 , 4 )");
var res = alasql("SELECT 2 NOT IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('112. query',function(done){
console.log("SELECT ' b ' IN ( ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT ' b ' IN ( ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('113. query',function(done){
console.log("SELECT ' c ' NOT IN ( ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT ' c ' NOT IN ( ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('114. query',function(done){
console.log("SELECT ' d ' IN ( ' b ' , ' c ' , null , ' d ' )");
var res = alasql("SELECT ' d ' IN ( ' b ' , ' c ' , null , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [1]);
assert.deepEqual(res.length, 1);
done();
});

it('115. query',function(done){
console.log("SELECT ' b ' NOT IN ( null , ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT ' b ' NOT IN ( null , ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(alasql.utils.flatArray(res), [0]);
assert.deepEqual(res.length, 1);
done();
});

it('116. query',function(done){
console.log("SELECT 2 IN t4");
var res = alasql("SELECT 2 IN t4")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('117. query',function(done){
console.log("SELECT 2 IN ( SELECT * FROM t4 )");
var res = alasql("SELECT 2 IN ( SELECT * FROM t4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('118. query',function(done){
console.log("SELECT 3 NOT IN t4");
var res = alasql("SELECT 3 NOT IN t4")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('119. query',function(done){
console.log("SELECT 3 NOT IN ( SELECT * FROM t4 )");
var res = alasql("SELECT 3 NOT IN ( SELECT * FROM t4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('120. query',function(done){
console.log("SELECT 4 IN t4n");
var res = alasql("SELECT 4 IN t4n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('121. query',function(done){
console.log("SELECT 4 IN ( SELECT * FROM t4n )");
var res = alasql("SELECT 4 IN ( SELECT * FROM t4n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('122. query',function(done){
console.log("SELECT 2 NOT IN t4n");
var res = alasql("SELECT 2 NOT IN t4n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('123. query',function(done){
console.log("SELECT 2 NOT IN ( SELECT * FROM t4n )");
var res = alasql("SELECT 2 NOT IN ( SELECT * FROM t4n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('124. query',function(done){
console.log("SELECT 2 IN t5");
var res = alasql("SELECT 2 IN t5")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('125. query',function(done){
console.log("SELECT 2 IN ( SELECT * FROM t5 )");
var res = alasql("SELECT 2 IN ( SELECT * FROM t5 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('126. query',function(done){
console.log("SELECT 3 NOT IN t5");
var res = alasql("SELECT 3 NOT IN t5")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('127. query',function(done){
console.log("SELECT 3 NOT IN ( SELECT * FROM t5 )");
var res = alasql("SELECT 3 NOT IN ( SELECT * FROM t5 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('128. query',function(done){
console.log("SELECT 2 IN t6");
var res = alasql("SELECT 2 IN t6")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('129. query',function(done){
console.log("SELECT 2 IN ( SELECT * FROM t6 )");
var res = alasql("SELECT 2 IN ( SELECT * FROM t6 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('130. query',function(done){
console.log("SELECT 3 NOT IN t6");
var res = alasql("SELECT 3 NOT IN t6")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('131. query',function(done){
console.log("SELECT 3 NOT IN ( SELECT * FROM t6 )");
var res = alasql("SELECT 3 NOT IN ( SELECT * FROM t6 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('132. query',function(done){
console.log("SELECT 4 IN t6n");
var res = alasql("SELECT 4 IN t6n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('133. query',function(done){
console.log("SELECT 4 IN ( SELECT * FROM t6n )");
var res = alasql("SELECT 4 IN ( SELECT * FROM t6n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('134. query',function(done){
console.log("SELECT 2 NOT IN t6n");
var res = alasql("SELECT 2 NOT IN t6n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('135. query',function(done){
console.log("SELECT 2 NOT IN ( SELECT * FROM t6n )");
var res = alasql("SELECT 2 NOT IN ( SELECT * FROM t6n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('136. query',function(done){
console.log("SELECT ' b ' IN t7");
var res = alasql("SELECT ' b ' IN t7")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('137. query',function(done){
console.log("SELECT ' b ' IN ( SELECT * FROM t7 )");
var res = alasql("SELECT ' b ' IN ( SELECT * FROM t7 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('138. query',function(done){
console.log("SELECT ' c ' NOT IN t7");
var res = alasql("SELECT ' c ' NOT IN t7")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('139. query',function(done){
console.log("SELECT ' c ' NOT IN ( SELECT * FROM t7 )");
var res = alasql("SELECT ' c ' NOT IN ( SELECT * FROM t7 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('140. query',function(done){
console.log("SELECT ' c ' IN t7n");
var res = alasql("SELECT ' c ' IN t7n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('141. query',function(done){
console.log("SELECT ' c ' IN ( SELECT * FROM t7n )");
var res = alasql("SELECT ' c ' IN ( SELECT * FROM t7n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('142. query',function(done){
console.log("SELECT ' d ' NOT IN t7n");
var res = alasql("SELECT ' d ' NOT IN t7n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('143. query',function(done){
console.log("SELECT ' d ' NOT IN ( SELECT * FROM t7n )");
var res = alasql("SELECT ' d ' NOT IN ( SELECT * FROM t7n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('144. query',function(done){
console.log("SELECT ' b ' IN t8");
var res = alasql("SELECT ' b ' IN t8")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('145. query',function(done){
console.log("SELECT ' b ' IN ( SELECT * FROM t8 )");
var res = alasql("SELECT ' b ' IN ( SELECT * FROM t8 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('146. query',function(done){
console.log("SELECT ' c ' NOT IN t8");
var res = alasql("SELECT ' c ' NOT IN t8")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('147. query',function(done){
console.log("SELECT ' c ' NOT IN ( SELECT * FROM t8 )");
var res = alasql("SELECT ' c ' NOT IN ( SELECT * FROM t8 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('148. query',function(done){
console.log("SELECT ' c ' IN t8n");
var res = alasql("SELECT ' c ' IN t8n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('149. query',function(done){
console.log("SELECT ' c ' IN ( SELECT * FROM t8n )");
var res = alasql("SELECT ' c ' IN ( SELECT * FROM t8n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('150. query',function(done){
console.log("SELECT ' d ' NOT IN t8n");
var res = alasql("SELECT ' d ' NOT IN t8n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('151. query',function(done){
console.log("SELECT ' d ' NOT IN ( SELECT * FROM t8n )");
var res = alasql("SELECT ' d ' NOT IN ( SELECT * FROM t8n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('152. query',function(done){
console.log("SELECT 1 IN ( 2 , 3 , 4 , null )");
var res = alasql("SELECT 1 IN ( 2 , 3 , 4 , null )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('153. query',function(done){
console.log("SELECT 1 NOT IN ( 2 , 3 , 4 , null )");
var res = alasql("SELECT 1 NOT IN ( 2 , 3 , 4 , null )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('154. query',function(done){
console.log("SELECT ' a ' IN ( ' b ' , ' c ' , null , ' d ' )");
var res = alasql("SELECT ' a ' IN ( ' b ' , ' c ' , null , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('155. query',function(done){
console.log("SELECT ' a ' NOT IN ( null , ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT ' a ' NOT IN ( null , ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('156. query',function(done){
console.log("SELECT 1 IN t4n");
var res = alasql("SELECT 1 IN t4n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('157. query',function(done){
console.log("SELECT 1 IN ( SELECT * FROM t4n )");
var res = alasql("SELECT 1 IN ( SELECT * FROM t4n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('158. query',function(done){
console.log("SELECT 5 NOT IN t4n");
var res = alasql("SELECT 5 NOT IN t4n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('159. query',function(done){
console.log("SELECT 5 NOT IN ( SELECT * FROM t4n )");
var res = alasql("SELECT 5 NOT IN ( SELECT * FROM t4n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('160. query',function(done){
console.log("SELECT 6 IN t6n");
var res = alasql("SELECT 6 IN t6n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('161. query',function(done){
console.log("SELECT 6 IN ( SELECT * FROM t6n )");
var res = alasql("SELECT 6 IN ( SELECT * FROM t6n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('162. query',function(done){
console.log("SELECT 7 NOT IN t6n");
var res = alasql("SELECT 7 NOT IN t6n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('163. query',function(done){
console.log("SELECT 7 NOT IN ( SELECT * FROM t6n )");
var res = alasql("SELECT 7 NOT IN ( SELECT * FROM t6n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('164. query',function(done){
console.log("SELECT ' a ' IN t7n");
var res = alasql("SELECT ' a ' IN t7n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('165. query',function(done){
console.log("SELECT ' a ' IN ( SELECT * FROM t7n )");
var res = alasql("SELECT ' a ' IN ( SELECT * FROM t7n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('166. query',function(done){
console.log("SELECT ' e ' NOT IN t7n");
var res = alasql("SELECT ' e ' NOT IN t7n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('167. query',function(done){
console.log("SELECT ' e ' NOT IN ( SELECT * FROM t7n )");
var res = alasql("SELECT ' e ' NOT IN ( SELECT * FROM t7n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('168. query',function(done){
console.log("SELECT ' f ' IN t8n");
var res = alasql("SELECT ' f ' IN t8n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('169. query',function(done){
console.log("SELECT ' f ' IN ( SELECT * FROM t8n )");
var res = alasql("SELECT ' f ' IN ( SELECT * FROM t8n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('170. query',function(done){
console.log("SELECT ' g ' NOT IN t8n");
var res = alasql("SELECT ' g ' NOT IN t8n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('171. query',function(done){
console.log("SELECT ' g ' NOT IN ( SELECT * FROM t8n )");
var res = alasql("SELECT ' g ' NOT IN ( SELECT * FROM t8n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('172. query',function(done){
console.log("SELECT null IN ( 2 , 3 , 4 , null )");
var res = alasql("SELECT null IN ( 2 , 3 , 4 , null )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('173. query',function(done){
console.log("SELECT null NOT IN ( 2 , 3 , 4 , null )");
var res = alasql("SELECT null NOT IN ( 2 , 3 , 4 , null )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('174. query',function(done){
console.log("SELECT null IN ( 2 , 3 , 4 )");
var res = alasql("SELECT null IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('175. query',function(done){
console.log("SELECT null NOT IN ( 2 , 3 , 4 )");
var res = alasql("SELECT null NOT IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('176. query',function(done){
console.log("SELECT null IN ( ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT null IN ( ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('177. query',function(done){
console.log("SELECT null NOT IN ( ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT null NOT IN ( ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('178. query',function(done){
console.log("SELECT null IN ( ' b ' , ' c ' , null , ' d ' )");
var res = alasql("SELECT null IN ( ' b ' , ' c ' , null , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('179. query',function(done){
console.log("SELECT null NOT IN ( null , ' b ' , ' c ' , ' d ' )");
var res = alasql("SELECT null NOT IN ( null , ' b ' , ' c ' , ' d ' )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('180. query',function(done){
console.log("SELECT null IN t4");
var res = alasql("SELECT null IN t4")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('181. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t4 )");
var res = alasql("SELECT null IN ( SELECT * FROM t4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('182. query',function(done){
console.log("SELECT null IN ( 2 , 3 , 4 )");
var res = alasql("SELECT null IN ( 2 , 3 , 4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('183. query',function(done){
console.log("SELECT null NOT IN t4");
var res = alasql("SELECT null NOT IN t4")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('184. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t4 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t4 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('185. query',function(done){
console.log("SELECT null IN t4n");
var res = alasql("SELECT null IN t4n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('186. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t4n )");
var res = alasql("SELECT null IN ( SELECT * FROM t4n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('187. query',function(done){
console.log("SELECT null NOT IN t4n");
var res = alasql("SELECT null NOT IN t4n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('188. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t4n )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t4n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('189. query',function(done){
console.log("SELECT null IN t5");
var res = alasql("SELECT null IN t5")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('190. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t5 )");
var res = alasql("SELECT null IN ( SELECT * FROM t5 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('191. query',function(done){
console.log("SELECT null NOT IN t5");
var res = alasql("SELECT null NOT IN t5")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('192. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t5 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t5 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('193. query',function(done){
console.log("SELECT null IN t6");
var res = alasql("SELECT null IN t6")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('194. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t6 )");
var res = alasql("SELECT null IN ( SELECT * FROM t6 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('195. query',function(done){
console.log("SELECT null NOT IN t6");
var res = alasql("SELECT null NOT IN t6")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('196. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t6 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t6 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('197. query',function(done){
console.log("SELECT null IN t6n");
var res = alasql("SELECT null IN t6n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('198. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t6n )");
var res = alasql("SELECT null IN ( SELECT * FROM t6n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('199. query',function(done){
console.log("SELECT null NOT IN t6n");
var res = alasql("SELECT null NOT IN t6n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('200. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t6n )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t6n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('201. query',function(done){
console.log("SELECT null IN t7");
var res = alasql("SELECT null IN t7")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('202. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t7 )");
var res = alasql("SELECT null IN ( SELECT * FROM t7 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('203. query',function(done){
console.log("SELECT null NOT IN t7");
var res = alasql("SELECT null NOT IN t7")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('204. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t7 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t7 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('205. query',function(done){
console.log("SELECT null IN t7n");
var res = alasql("SELECT null IN t7n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('206. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t7n )");
var res = alasql("SELECT null IN ( SELECT * FROM t7n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('207. query',function(done){
console.log("SELECT null NOT IN t7n");
var res = alasql("SELECT null NOT IN t7n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('208. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t7n )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t7n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('209. query',function(done){
console.log("SELECT null IN t8");
var res = alasql("SELECT null IN t8")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('210. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t8 )");
var res = alasql("SELECT null IN ( SELECT * FROM t8 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('211. query',function(done){
console.log("SELECT null NOT IN t8");
var res = alasql("SELECT null NOT IN t8")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('212. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t8 )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t8 )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('213. query',function(done){
console.log("SELECT null IN t8n");
var res = alasql("SELECT null IN t8n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('214. query',function(done){
console.log("SELECT null IN ( SELECT * FROM t8n )");
var res = alasql("SELECT null IN ( SELECT * FROM t8n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('215. query',function(done){
console.log("SELECT null NOT IN t8n");
var res = alasql("SELECT null NOT IN t8n")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

it('216. query',function(done){
console.log("SELECT null NOT IN ( SELECT * FROM t8n )");
var res = alasql("SELECT null NOT IN ( SELECT * FROM t8n )")
console.log(alasql.utils.flatArray(res));
assert.deepEqual(res.length, 1);
done();
});

});

