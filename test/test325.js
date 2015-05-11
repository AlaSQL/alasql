if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 325 IDENTITY', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test325; USE test325');
    done();
  });

  it('2. CREATE TABLE with multiple constraints',function(done){

  alasql(function(){/*
    IF OBJECT_ID('dbo.Messages') IS NOT NULL DROP TABLE dbo.Messages;
    CREATE TABLE dbo.Messages
    (
      msgid  INT          NOT NULL IDENTITY ,
      msgts  DATETIME     NOT NULL DEFAULT(CURRENT_TIMESTAMP),
      msg    VARCHAR(MAX) NOT NULL,
      status VARCHAR(20)  NOT NULL DEFAULT('new'),
      CONSTRAINT PK_Messages 
        PRIMARY KEY NONCLUSTERED(msgid),
      CONSTRAINT UNQ_Messages_status_msgid 
        UNIQUE CLUSTERED(status, msg),
      CONSTRAINT CHK_Messages_status
        CHECK (status IN('new', 'open', 'done'))
    );
  */});
    done();
  });

  it('3. INSERT INTO',function(done){
    var res = alasql('INSERT INTO dbo.Messages (msgts, msg, status) \
      VALUES("2015.01.01","I love you!","new")');
    assert(res == 1);
    done();
  });

  it('4. INSERT INTO with NOT NULL violation',function(done){
    assert.throws(function(){
      var res = alasql('INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I do not love you!","not new")');
    },Error);
    done();
  });

  it('5. INSERT INTO with CHECK violation',function(done){
    assert.throws(function(){
      var res = alasql('INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I do not love you!","not new")');
    },Error);
    done();
  });

  it('6. INSERT INTO with UNIQUE violation',function(done){
    assert.throws(function(){
      var res = alasql('INSERT INTO dbo.Messages (msgts, msg, status) \
        VALUES("2015.01.01","I love you!","new")');
    },Error);
    done();
  });

    it('9. INSERT INTO with IDENTITY',function(done){
      console.log(69,alasql.tables.Messages.identities);
      console.log(69,alasql.tables.Messages.indices);
      var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
      console.log(res);
      done();
    });


  it('7. INSERT INTO with IDENTITY',function(done){
    var res = alasql('INSERT INTO dbo.Messages (msg, status) \
      VALUES("I hate you!","new")');
    assert(res == 1);
    done();
  });

  it('8. INSERT INTO with IDENTITY',function(done){
    var res = alasql('INSERT INTO dbo.Messages (msg, status) \
      VALUES("I hate you to much!","new")');
    assert(res == 1);
    done();
  });

  it('9. INSERT INTO with IDENTITY',function(done){
    var res = alasql('SELECT COLUMN msgid FROM dbo.Messages');
    console.log(res);
    done();
  });


  it('3. DROP DATABASE',function(done){
    alasql('DROP DATABASE test325');
    done();
  });

});

