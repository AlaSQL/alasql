if (typeof exports === 'object') {
  var assert = require('assert');
  var alasql = require('..');
  //var from84 = require('../src/84from');
}

// valid csv headers no data no newline character so should force a file read attempt
const TEST_NO_DATA = 'a, b, c, d';
const TEST_VALID_DATA = 'a, b, c, d\n1,2,3,4';

describe('Test PromiseExec', async function() {
  let res;

  it('A) PromiseExec with no csv data, expect rejected promise', async function() {
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_NO_DATA]);
    } catch(e) {
      res = e;
    }
    assert.ok((res instanceof Error) === true, 'Expected exception');
  });
  it('B) PromiseExec with valid data, expect array length 1', async function() {
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_VALID_DATA]);
    } catch(e) {
      res = e;
    }
    assert.ok(res.length === 1, 'Expected array of size 1 returned');
  });
  it('C) PromiseExec with valid data, expect rejected promise', async function() {
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_VALID_DATA]);
    } catch(e) {
      res = e;
    }
    assert.ok(res.length === 1, 'Expected array of size 1 returned');
  });
});