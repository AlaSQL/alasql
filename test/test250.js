if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};


describe('Test 250 Index problem', function() {

  it('1. IN ()',function(done){

    alasql(function(){/*
      CREATE TABLE tab0(pk INTEGER NOT NULL PRIMARY KEY, col0 INTEGER, col1 FLOAT, col2 TEXT, col3 INTEGER, col4 FLOAT, col5 TEXT);
      INSERT INTO tab0 VALUES(0,6,4.67,'wdbsg',4,2.89,'altmp');
      CREATE TABLE tab1(pk INTEGER NOT NULL PRIMARY KEY, col0 INTEGER, col1 FLOAT, col2 TEXT, col3 INTEGER, col4 FLOAT, col5 TEXT);
      CREATE INDEX idx_tab1_4 on tab1 (col4);
      INSERT INTO tab1 SELECT * FROM tab0;
      DELETE FROM tab1 WHERE col4 > 2.27;
      */});

    var res = alasql('SELECT * from tab1');
    console.log(res);


//  	assert(res == false);

    done();
  });

});

