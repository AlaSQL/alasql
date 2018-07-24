if (typeof exports === 'object') {
  var assert = require('assert');
  var alasql = require('..');
}

// valid csv headers no data no newline character so should force a file read attempt
const TEST_NO_DATA = 'a, b, c, d';
const TEST_VALID_DATA = 'a, b, c, d\n1,2,3,4';
const BAD_FILE_PATH = '/tmp/largemargesentme.csv';
const BAD_URL = 'http://lzkdjf;zldkfj';

describe('Test PromiseExec', async function() {
  let res;

  it('A) csvload with no csv data, expect rejected promise', async function() {
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_NO_DATA]);
    } catch(e) {
      res = e;
    }
    assert.ok((res instanceof Error) === true, 'Expected exception');
  });
  it('B) csvload with valid data, expect array length 1', async function() {
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', [TEST_VALID_DATA]);
    } catch(e) {
      res = e;
    }
    assert.ok(res.length === 1, 'Expected array of size 1 returned');
  });
  it('C) csvload with bad file path, expect rejected promise', async function() {
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', BAD_FILE_PATH);
    } catch(e) {
      res = e;
    }
    assert.ok((res instanceof Error) === true, 'Expected exception');
  });
  it('D) csvload with bad URL, expect some kind of response', async function() {
    // ISPs deal with bad URL's differently.  Some will return a 400, while others won't do anything.
    // This is testing that the promise functionality doesn't swallow errors, so it should be OK to just test for
    // a non null response.
    try {
      res = await alasql.promise('SELECT * FROM CSV(?, {headers:true, separator:","})', BAD_URL);
    } catch(e) {
      res = e;
    }
    assert.ok(res !== undefined, 'Expected resppnse');
  });
});