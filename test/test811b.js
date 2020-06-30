if (typeof exports === 'object') {
    var assert = require('assert');
    var alasql = require('../dist/alasql');
}

Number.prototype.addView = String.prototype.addView811b = function(x){
	this.view = x;
	return this;
  }

describe('Test 811b - object comparisson', function() {
    before(function() {
        alasql('CREATE DATABASE test811b;USE test811b');
    });

    after(function() {
        alasql.options.convertData = function (d) { return d; };
        alasql('DROP DATABASE test811');
    });


    var t2 = [
        {o: new Pair("One", "<div>One</div>"), b: new Pair(3, "$1"), s: "One"},
        {o: new Pair("Two", "<strong>Two</strong>"), b: new Pair(2, "$2"), s: "Two"},
        {o: new Pair("", "<span></span>"), b: new Pair(0, "$3"), s: ""},
        {o: new Pair("Three", "<span>One</span>"), b: new Pair(1, "$4"), s: "Three"}
    ];


    it('1. WHERE filter', function(done) {
        var res = alasql('SELECT *, T1.v->toFixed(2) fixed, T1.v + 2 summ FROM ? T1 WHERE T1.o = "One"', [t1]);

        assert.equal(res.length, 2);
        assert.equal(res[0].fixed.valueOf(), "1.00");
        assert.equal(res[0].summ.valueOf(), 3);
        done();
    });

    it('2. JOIN', function(done) {
        var res = alasql('SELECT * FROM ? T1 OUTER JOIN ? T2 ON T1.o = T2.o', [t1, t2]);

        assert.equal(res.length, 5);
        done();
    });

    it('3. Aggregate', function(done) {
        var res = alasql('SELECT MAX(v) AS v FROM ?', [t1]);

        assert.equal(res[0].v.valueOf(), 4);
        done();
    });

    it('4. GROUP BY', function(done) {
        var res = alasql('SELECT o, MAX(v) AS v FROM ? GROUP BY o', [t1]);

        assert.equal(res.length, 3);
        assert.equal(res[0].v.valueOf(), 4);
        done();
    });

    it('5. ORDER BY', function(done) {
        var res = alasql('SELECT * FROM ? ORDER BY v DESC', [t1]);

        assert.equal(res[0].v.valueOf(), 4);
        assert.equal(res[3].v.valueOf(), 1);
        done();
    });

    it('6. Having', function(done) {
        var res = alasql('SELECT o, SUM(v) AS v FROM ? GROUP BY o HAVING FIRST(o) = "One"', [t1]);

        assert.equal(res.length, 1);
        assert.equal(res[0].v.valueOf(), 5);
        done();
    });

    it('7. JOIN >', function(done) {
        var res = alasql('SELECT * FROM ? T1 JOIN ? T2 ON T1.v > T2.b', [t1, t2]);

        assert.equal(res.length, 10);
        done();
    });

    it('8. JOIN USING', function(done) {
        var res = alasql('SELECT * FROM ? AS T1 JOIN ? AS T2 USING o', [t1, t2]);

        assert.equal(res.length, 4);
        done();
    });
});
