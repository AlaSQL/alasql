if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var _ = require('lodash');
} else {
	__dirname = '.';
};


describe('Test 281 UNIQUE Columns (for Meteor-Postgres)', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test281;USE test281');
    done();
  });


  it('2. UNIQUE constraint',function(done){
    alasql('CREATE TABLE usersTable (id INT, name NVARCHAR(255) NOT NULL UNIQUE)');
    alasql('INSERT INTO usersTable VALUES (1,"Andrey")');
    alasql('INSERT INTO usersTable VALUES (2,"Kate")');
    done();
  });

  it('3. Shoud be the error here with UNIQUE constraint',function(done){
    assert.throws(function(){
      alasql('INSERT INTO usersTable VALUES (3,"Andrey")');
    },Error);
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test281');
    done();
  });
});


