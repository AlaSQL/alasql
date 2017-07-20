if (typeof exports === 'object') {
    var assert = require("assert");
    var alasql = require('..');
}

var test = '614'; // insert test file number

describe('Test ' + test + ' - Read data from column irrespective of case in query', function () {

    before(function () {
        alasql('create database test' + test);
        alasql('use test' + test);
        alasql.options.casesensitive = false;
    });

    after(function () {
        alasql('drop database test' + test);
        alasql.options.casesensitive = true;
    });

    it('1) Read Data and Check Value', function (done) {
        alasql('SELECT Account FROM XLSX("' + __dirname + '/test614.xlsx")', [], function (res) {
            assert.equal(res[0]['Account'.toLowerCase()], 12);
            done();
        });
    });

});
