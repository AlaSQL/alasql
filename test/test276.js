if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var _ = require('lodash');
} else {
	__dirname = '.';
};


describe('Test 276 INFORMATION_SCHEMA', function() {

  it('1. Prepare databases', function(done) {
    alasql('CREATE DATABASE test276; USE test276');
    alasql('CREATE TABLE one (a INT, b NVARCHAR(10))');
    alasql('INSERT INTO one VALUES (1,"One"), (2,"Two"), (3,"Three"), (4,"Four")');

    alasql('CREATE VIEW view_one AS SELECT * FROM one WHERE a > 2');
    done();
  });

  it('2. INFORMATION_SCHEMA', function(done) {
    assert(alasql.databases.test276.tables.view_one);
    alasql('  IF EXISTS (SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS \
               WHERE TABLE_NAME = "view_one") DROP VIEW view_one');
    assert(!alasql.databases.test276.tables.view_one);
    done();    
  });

  it('99. Drop databases', function(done) {
    alasql('DROP DATABASE test276');
    done();
  });


});


