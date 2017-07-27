if (typeof exports === 'object') {
    var assert = require("assert");
    var alasql = require('..');
}

var test = '616'; // insert test file number

describe('Test ' + test + ' - Foreign keys on created database', function () {
    it('Check foreign key on a created database', function (done) {
        var db = new alasql.Database();

        db.exec("CREATE TABLE Parent( ParentId integer, CONSTRAINT PK_Parent PRIMARY KEY(ParentId) )");
        db.exec("CREATE TABLE Child( ChildId integer, CONSTRAINT FK_Child_Parent FOREIGN KEY (ChildId) REFERENCES Parent(ParentId) )");
        db.exec("INSERT INTO Parent(ParentId) VALUES(1)");
        db.exec("INSERT INTO Child(ChildId) VALUES(1)");
        done();
    });
});