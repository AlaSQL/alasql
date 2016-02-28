# Testlog for AlaSQL

List of final results from [different test runs](https://github.com/agershun/alasql/tree/develop/test/!testlog/) to keep track on progres.  


## SQLlogic

The Sqllogictest was developed by [the SQLite team](https://www.sqlite.org/sqllogictest/doc/trunk/about.wiki) 
to verify that SQL database engine computes correct results by comparing the results to identical queries from other SQL database engines. Consists of roughly 6 million SQL statements.

### Node 
* Total tested: 4,632,007
* Failed tests: 688,764
* Skipped tests: 53,316
* Assumed still OK: 1,309,487
* Final score: 87 % was OK

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/SQLlogic.md)

### Chakra
It has not yet been possible to run the SQLlogic tests on the Chrakra engine. 


## Regression test
The [regression tests for AlaSQL](https://github.com/agershun/alasql/tree/develop/test/) consists of more than 1000 test cases (hopefully) covering all of the functionality in the library. By executing `npm run test:only` the regression test will run via node. By executing `npm run test:browser` it will run in a browser. 




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


### Chakra
- `alasql@0.2.3-develop-1206`
- Failures: 80
- Passes 1044

See full result [here](https://github.com/agershun/alasql/tree/develop/test/!testlog/Chakra.md)


### Node
The regression test is used everytime the library is compiled from `src/` to `dist/` and must always have 100% OK before releaseing a new version. 

See last result [here](https://travis-ci.org/agershun/alasql/builds). 

If 100% OK this will be green: 

[![Build status](https://api.travis-ci.org/agershun/alasql.svg)](https://travis-ci.org/agershun/alasql?123)