if (typeof exports === 'object') {
  var assert = require('assert');
  var alasql = require('..');
}

describe('mysql TIMESTAMPDIFF', function() {
  var res;
  var value;

  it('should return the difference in months between 2 dates when called with month as a unit', function() {
      alasql.options.mysql = true;
      res = alasql("SELECT TIMESTAMPDIFF(MONTH, '2018-04-01', '2018-05-01')");

      value = Object.keys(res[0])[0];
      assert(res[0][value], 1);
  });

  it('should return the difference in days between 2 dates when called with day as a unit', function() {
    alasql.options.mysql = true;
    res = alasql("SELECT TIMESTAMPDIFF(DAY, '2018-04-01', '2018-05-01')");

    value = Object.keys(res[0])[0];
    assert(res[0][value], 30);
  });

  it('should return the difference in years between 2 dates when called with year as a unit', function() {
    alasql.options.mysql = true;
    res = alasql("SELECT TIMESTAMPDIFF(YEAR, '2018-04-01', '2018-05-01')");

    value = Object.keys(res[0])[0];
    assert(res[0][value], 0);
  });
});