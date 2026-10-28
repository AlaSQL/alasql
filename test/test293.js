if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
};


describe('Test 293 SLT#1', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test293;USE test293');

    done();
  });

  it('2. CREATE TABLES',function(done){
  alasql(function(){/*
    CREATE TABLE t1(a INTEGER, b INTEGER, c INTEGER, d INTEGER, e INTEGER);
    INSERT INTO t1(e,c,b,d,a) VALUES(103,102,100,101,104);
    INSERT INTO t1(a,c,d,e,b) VALUES(107,106,108,109,105);
    INSERT INTO t1(e,d,b,a,c) VALUES(110,114,112,111,113);
    INSERT INTO t1(d,c,e,a,b) VALUES(116,119,117,115,118);
    INSERT INTO t1(c,d,b,e,a) VALUES(123,122,124,120,121);
    INSERT INTO t1(a,d,b,e,c) VALUES(127,128,129,126,125);
    INSERT INTO t1(e,c,a,d,b) VALUES(132,134,131,133,130);
    INSERT INTO t1(a,d,b,e,c) VALUES(138,136,139,135,137);
    INSERT INTO t1(e,c,d,a,b) VALUES(144,141,140,142,143);
    INSERT INTO t1(b,a,e,d,c) VALUES(145,149,146,148,147);
    INSERT INTO t1(b,c,a,d,e) VALUES(151,150,153,154,152);
    INSERT INTO t1(c,e,a,d,b) VALUES(155,157,159,156,158);
    INSERT INTO t1(c,b,a,d,e) VALUES(161,160,163,164,162);
    INSERT INTO t1(b,d,a,e,c) VALUES(167,169,168,165,166);
    INSERT INTO t1(d,b,c,e,a) VALUES(171,170,172,173,174);
    INSERT INTO t1(e,c,a,d,b) VALUES(177,176,179,178,175);
    INSERT INTO t1(b,e,a,d,c) VALUES(181,180,182,183,184);
    INSERT INTO t1(c,a,b,e,d) VALUES(187,188,186,189,185);
    INSERT INTO t1(d,b,c,e,a) VALUES(190,194,193,192,191);
    INSERT INTO t1(a,e,b,d,c) VALUES(199,197,198,196,195);
    INSERT INTO t1(b,c,d,a,e) VALUES(200,202,203,201,204);
    INSERT INTO t1(c,e,a,b,d) VALUES(208,209,205,206,207);
    INSERT INTO t1(c,e,a,d,b) VALUES(214,210,213,212,211);
    INSERT INTO t1(b,c,a,d,e) VALUES(218,215,216,217,219);
    INSERT INTO t1(b,e,d,a,c) VALUES(223,221,222,220,224);
    INSERT INTO t1(d,e,b,a,c) VALUES(226,227,228,229,225);
    INSERT INTO t1(a,c,b,e,d) VALUES(234,231,232,230,233);
    INSERT INTO t1(e,b,a,c,d) VALUES(237,236,239,235,238);
    INSERT INTO t1(e,c,b,a,d) VALUES(242,244,240,243,241);
    INSERT INTO t1(e,d,c,b,a) VALUES(246,248,247,249,245);

  */});
    done();
  });


var q1,q2;

  it('3. SELECT 1 - no modifier',function(done){
    alasql.options.modifier = undefined;
    
    var res = alasql('SELECT CASE WHEN c>(SELECT avg(c) FROM t1) \
      THEN a*2 ELSE b*10 END FROM t1 ORDER BY 1');
    //console.log(res);
    assert.deepEqual(res.length,30);
    q1 = res;
    var rs = res.map(function(d){return d[Object.keys(d)[0]]+'\n'}).join('');
    // var rs = res.data.map(function(d){return d[res.columns[0].columnid]+'\n'}).join('');
//    console.log('char1',rs.length);
    rhash = md5(rs);
    assert.deepEqual(rhash,'3c13dee48d9356ae19af2515e05e6b54');
    done();
  });


  it('4. SELECT 1 - RECORDSET',function(done){
    alasql.options.modifier = 'RECORDSET';

    var res = alasql('SELECT CASE WHEN c>(SELECT avg(c) FROM t1) \
      THEN a*2 ELSE b*10 END FROM t1 ORDER BY 1');
    //console.log(res);
    q2 = res.data;
    assert.deepEqual(res.data.length,30);
    var rs = res.data.map(function(d){return d[res.columns[0].columnid]+'\n'}).join('');
//    console.log('char2',rs.length);
    rhash = md5(rs);
    assert.deepEqual(rhash,'3c13dee48d9356ae19af2515e05e6b54');
    done();
  });

  it('5. SELECT 1',function(done){
    alasql.options.modifier = undefined;
    var res = alasql('SELECT 1');
    assert.deepEqual(res,[ { '1': 1 } ]);
//    console.log(res);

    var res = alasql('SELECT avg(c) FROM t1');
    assert.deepEqual(res,[ { 'AVG(c)': 174.36666666666667 } ]);
//    console.log(res);
//console.log('***')
if(false) {
    alasql.options.modifier = "RECORDSET";
    var res = alasql('SELECT (SELECT avg(c) FROM t1)');
//console.log('<<<')
    console.log(res);

    alasql.options.modifier = "RECORDSET";
    var res = alasql('SELECT (SELECT avg(c) FROM t1)');
    console.log(res);
}
    done();
  });

if(false) {


  it('4. SELECT 1',function(done){
    q1 = alasql.utils.flatArray(q1);
    q2 = alasql.utils.flatArray(q2);
    q1.forEach(function(q,idx){console.log(q1[idx],q2[idx])});
    done();
  });
}
if(false) {
  it('4. SELECT 2',function(done){
//    alasql.options.modifier = 'RECORDSET';
    var res = alasql(function(){/*
      SELECT a+b*2+c*3+d*4+e*5,
             (a+b+c+d+e)/5
        FROM t1
       ORDER BY 1,2
    */});
    assert.deepEqual(res.length,60); // Why 60?
    var rs = res.map(function(d){return d[Object.keys(d)[0]]+'\n'}).join('');
    rhash = md5(rs);
    assert.deepEqual(rhash,'808146289313018fce25f1a280bd8c30');
    done();
  });

  it('5. SELECT 3',function(done){
//    alasql.options.modifier = 'RECORDSET';
    var res = alasql(function(){/*
SELECT a+b*2+c*3+d*4+e*5,
       CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222
        WHEN a<b+3 THEN 333 ELSE 444 END,
       abs(b-c),
       (a+b+c+d+e)/5,
       a+b*2+c*3
  FROM t1
 WHERE (e>c OR e<d)
   AND d>e
   AND EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b)
 ORDER BY 4,2,1,3,5
    */});
    assert.deepEqual(res.length,80); // Why 60?
    var rs = res.map(function(d){return d[Object.keys(d)[0]]+'\n'}).join('');
    rhash = md5(rs);
    assert.deepEqual(rhash,'f588aa173060543daffc54d07638516f');
    done();
  });
};

  it('4. DROP DATABASE',function(done){
    alasql('DROP DATABASE test293');
    alasql.options.modifier = undefined;
    done();
  });
});
