var alasql = require("./dist/alasql-slim.js"),
assert = require("assert");
var BASIC = require("./tests/test-BASICS.js");
var CASE= require("./tests/test-CASE.js");
var OP = require("./tests/test-operators.js");
var JOINS = require("./tests/test-joins.js");
OP.test();
JOINS.test();
BASIC.test();
CASE.test();
