if (typeof exports === 'object') {
    var assert = require('assert');
    var alasql = require('..');
} else {
    __dirname = '.';
}

describe.only('Test 833 date parsing options', function () {
    var now = new Date();
    it('1. stores date and retrieves date correctly', function (done) {
        alasql('CREATE TABLE dates (date datetime)');
        alasql('INSERT INTO dates (?)', [now]);

        var res = alasql('SELECT * FROM dates');

        assert.deepEqual(res[0].date, now);

        done()
    });
    it('2. XLSX parses date as number', function () {
        return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(function () {
            return alasql.promise('SELECT * FROM xlsx("test/test815.xlsx")').then(
                function (res) {
                    assert.equal(typeof res[0].date, "number");
                }
            )
        });
    });
    it('3. XLSX parses date as date', function () {
        return alasql.promise('SELECT * INTO XLSX("test/test815.xlsx") FROM dates').then(function () {
            return alasql.promise('SELECT * FROM xlsx("test/test815.xlsx", {XLSXopts: {cellDates: true}})').then(
                function (res) {
                    assert.deepEqual(res[0].date, now);
                }
            )
        });
    });
});
