if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 324 Roads samples', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test324; USE test324');
    done();
  });

  it('2. OBJECT_ID()',function(done){
    alasql('CREATE TABLE dbo.Employees(id INT, name STRING)');
    alasql('INSERT INTO dbo.Employees VALUES (1,"Tomas"),(2,"Lisa")');
    assert.deepEqual(alasql('SELECT * FROM dbo.Employees'),
      [ { id: 1, name: 'Tomas' }, { id: 2, name: 'Lisa' } ]
    );
    assert.deepEqual(alasql('SELECT VALUE OBJECT_ID("dbo.Employees")'),'test324.Employees');
    var res = alasql('IF OBJECT_ID("dbo.Employees") IS NOT NULL\
      DROP TABLE dbo.Employees;');
    assert(!alasql.databases.dbo.tables.Employees);
    assert.deepEqual(res,1); 
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test324');
    done();
  });
});

