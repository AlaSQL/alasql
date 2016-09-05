# Testlog for AlaSQL

List of final results from [different test runs](https://github.com/agershun/alasql/tree/develop/test/!testlog/) to keep track on progres.  


## SQLlogic

The Sqllogictest was developed by [the SQLite team](https://www.sqlite.org/sqllogictest/doc/trunk/about.wiki) 
to verify that SQL database engine computes correct results by comparing the results to identical queries from other SQL database engines. The full test consists of roughly 6 million SQL statements.

### Node 
* Total tested: 1,007,187
* Failed tests: 114,412
* Skipped tests: 53,316
* Assumed still OK: 676,454
* Final score: 90 % was OK

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/SQLlogic.md)

### Chakra
It has not yet been possible to run the SQLlogic tests on the Chrakra engine. 


## Regression test
The [regression tests for AlaSQL](https://github.com/agershun/alasql/tree/develop/test/) consists of more than 1000 test casescovering [![Coverage]( https://img.shields.io/codecov/c/github/agershun/alasql/develop.svg)](https://rawgit.com/agershun/alasql/develop/test/coverage/lcov-report/dist/alasql.fs.js.html) of the functionality in the library. By executing `npm run test:only` the regression test will run via node. By executing `npm run test:browser` it will run in a browser. 


### Chrome 48
- `alasql@0.2.3-develop-1206`
- Failures: 61
- Passes 1063

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/Chrome.md)

_It needs more investigations, but as Chrome uses the same V8 engine as Node the errors are likely caused by how some of the tests loads or stores test data. The amount of Chrome errors will be therefor (probably) also be represented in other browsers._ 

### Safari 9
- `alasql@0.2.3-develop-1206`
- Failures: 79
- Passes 1045

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/Safari.md)


### Firefox 42
- `alasql@0.2.3-develop-1206`
- Failures: 80
- Passes 1044

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/Firefox.md)

### Edge
- `alasql@0.2.3-develop-1206`
- Failures: 81
- Passes 1034


### Chakra v6.0.0-pre5
- `alasql@0.2.3-develop-1216`
-  1364 passing (2m)
-  66 pending
-  22 failing

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/Chakra.md)


### Node
- `alasql@0.2.3-detached.from.b496c74-69`
- 1386 passing (9s)
- 66 pending
  
The regression test is ran everytime the library is compiled from `src/` to `dist/` and must always be 100% OK before releaseing a new version. 

If 100% of the regression test is OK for [the lats commit](https://travis-ci.org/agershun/alasql/builds) this will be green: 

[![Build status](https://api.travis-ci.org/agershun/alasql.svg)](https://travis-ci.org/agershun/alasql?123)
