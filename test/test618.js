if (typeof exports === 'object') {
    var assert = require("assert");
    var alasql = require('..');
}

var test = '618'; // insert test file number

describe('Test ' + test + ' - Where RTRIM will remove leading whitespace characters in an expression.', function() {

    it('A) Will remove trailing whitespace only', function() {
        var sql = "select RTRIM('Hello World !      ')";
        var res = alasql(sql);
        assert.equal(res[0][Object.keys(res[0])[0]], 'Hello World !');
    });

    it('B) Will NOT trim the leading whitespace.', function() {
        var sql = "select RTRIM('      Hello World !     ')";
        var res = alasql(sql);
        assert.equal(res[0][Object.keys(res[0])[0]], '      Hello World !');
    });

    it('C) Will change nothing if expression has no whitespace.', function() {
        var sql = "select RTRIM('Hello World !')";
        var res = alasql(sql);
        assert.equal(res[0][Object.keys(res[0])[0]], 'Hello World !');
    });

    it('D) Will return undefined if null expression is passed in.', function() {
        var sql = "select RTRIM(NULL)";
        var res = alasql(sql);
        assert.equal(res[0][Object.keys(res[0])[0]], undefined);
    });
});