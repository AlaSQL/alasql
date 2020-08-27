if (typeof exports === 'object') {
    var assert = require('assert');
    var alasql = require('..');
} else {
    __dirname = '.';
}

describe('Test 811 - String / Number objects', function () {
    before(function () {
        alasql('CREATE DATABASE test811;USE test811');
    });

    after(function () {
        alasql.options.modifier = undefined;
        alasql('DROP DATABASE test811');
    });

    it('1. MEDIAN()', function (done) {
        var t1 = [
            {value: new Number(5)},
            {value: new Number(6)},
            {value: new Number(9)},
            {value: new Number(1)},
        ];

        var res = alasql('SELECT MEDIAN(`value`) AS `median` FROM ?',[t1]);

        var expected = [{median: 5.5}];

        assert.deepEqual(res, expected);
        done();
    });

    it('2. DISTINCT()', function (done) {
        var t1 = [
            {name: new String("A")},
            {name: new String("B")},
            {name: new String("B")},
            {name: new String("A")},
        ];

        var res = alasql('SELECT ARRAY(DISTINCT(SELECT `name` FROM ?)) AS `array` FROM ?',[t1, t1]);

        assert.equal(res[0].array, "A");
        done();
    });

    it('3. Inner Select', function (done) {
        var t1 = [
            {Email: new String("A")},
            {Email: new String("B")}
        ];
        var t2 = [
            {Email: new String("A"), Study: new String("s1")},
            {Email: new String("B"), Study: new String("s2")},
            {Email: new String("B"), Study: new String("s3")}
        ];
        var t3 = [
            {Name: new String("n1"), ID: new String("s1")},
            {Name: new String("n2"), ID: new String("s2")},
            {Name: new String("n3"), ID: new String("s3")}
        ];
        alasql('CREATE TABLE T1 (Email string)');
        alasql.tables['T1'].data = t1;

        alasql('CREATE TABLE T2 (Email string, Study string)');
        alasql.tables['T2'].data = t2;
        alasql('CREATE TABLE T3 (Name string, ID string)');
        alasql.tables['T3'].data = t3;

        var res = alasql('SELECT T2.`Study`, (SELECT T3.`Name` FROM T3 JOIN T2 WHERE T2.`Study` === T3.`ID`) AS `Focus` ' +
            'FROM T1 LEFT JOIN T2 ON T1.`Email` === T2.`Email`');

        assert.equal(res.length, 3);
        assert.equal(res[0].Study, "s1");
        assert.equal(res[1].Study, "s2");
        assert.equal(res[2].Study, "s3");
        assert.equal(res[0].Focus, "n1");
        assert.equal(res[1].Focus, "n1");
        assert.equal(res[2].Focus, "n1");
        done();
    });
});
