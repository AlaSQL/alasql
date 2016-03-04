### Chakra v6.0.0-pre5

```
  Running tests on alasql@0.2.3-develop-1216

  Environment detected: {
    "alasqlPath": "C:\\Users\\mrw\\git\\alasql\\dist",
    "isBrowser": false,
    "isCordova": false,
    "isMeteor": false,
    "isMeteorClient": false,
    "isMeteorServer": false,
    "isNode": true,
    "isWebWorker": false
}


  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ...............aN-aN-NaN
....................[ 1, 'aN-aN-NaN' ]
.....................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ........................................................
  ....................................................

  1364 passing (20s)
  66 pending
  22 failing

  1) Test 202 GETTIME and CAST 2. CONVERT(,,110):

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test202.js:20:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  2) Test 212: CONVERT dates with style 2. CONVERT DATE TO STRING:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:72:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  3) Test 212: CONVERT dates with style 3. CONVERT JAVASCRIPT DATE TO STRING:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:80:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  4) Test 212: CONVERT dates with style 4. CONVERT JAVASCRIPT DATE TO STRING:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:87:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  5) Test 212: CONVERT dates with style 5. CONVERT DATE TO STRING FROM TABLE:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:99:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  6) Test 212: CONVERT dates with style 6. CONVERT DATE TO STRING FROM TABLE:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:112:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  7) Test 212: CONVERT dates with style 7. CONVERT DATE TO STRING FROM TABLE:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:125:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  8) Test 212: CONVERT dates with style 8. CONVERT DATE TO STRING FROM TABLE without columns:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:138:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  9) Test 212: CONVERT dates with style 9. CONVERT DATE TO STRING FROM TABLE without columns:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test212.js:151:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  10) Test 232 Errors handling 3. Log error async:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test232.js:29:13)
     at alasql.exec (C:\Users\mrw\git\alasql\dist\alasql.js:4227:5)
     at alasql (C:\Users\mrw\git\alasql\dist\alasql.js:120:4)
     at Anonymous function (C:\Users\mrw\git\alasql\test\test232.js:28:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  11) Test 232 Errors handling 4. Log error sync:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test232.js:37:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  12) Test 238 Test from string and into string 1. JSON:
     Error: ENOENT: no such file or directory, open 'C:\Usersmrwgitalasql	est\test238.json'
     at fs.openSync (fs.js:620:3)
     at fs.writeFileSync (fs.js:1284:3)
     at utils.saveFile (C:\Users\mrw\git\alasql\dist\alasql.js:3517:13)
     at alasql.into.JSON (C:\Users\mrw\git\alasql\dist\alasql.js:13945:2)
     at Function code (Function code:1:7)
     at queryfn3 (C:\Users\mrw\git\alasql\dist\alasql.js:6227:3)
     at queryfn (C:\Users\mrw\git\alasql\dist\alasql.js:5942:3)
     at statement (C:\Users\mrw\git\alasql\dist\alasql.js:6944:3)
     at alasql.dexec (C:\Users\mrw\git\alasql\dist\alasql.js:4280:4)
     at alasql.exec (C:\Users\mrw\git\alasql\dist\alasql.js:4231:3)
     at alasql (C:\Users\mrw\git\alasql\dist\alasql.js:120:4)
     at Anonymous function (C:\Users\mrw\git\alasql\test\test238.js:17:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  13) Test 238 Test from string and into string 2. CSV() and AS:
     Error: ENOENT: no such file or directory, open 'C:\Usersmrwgitalasql	est\restest238a.csv'
     at fs.openSync (fs.js:620:3)
     at fs.writeFileSync (fs.js:1284:3)
     at utils.saveFile (C:\Users\mrw\git\alasql\dist\alasql.js:3517:13)
     at alasql.into.CSV (C:\Users\mrw\git\alasql\dist\alasql.js:14018:2)
     at Function code (Function code:1:7)
     at queryfn3 (C:\Users\mrw\git\alasql\dist\alasql.js:6227:3)
     at queryfn (C:\Users\mrw\git\alasql\dist\alasql.js:5942:3)
     at statement (C:\Users\mrw\git\alasql\dist\alasql.js:6944:3)
     at alasql.dexec (C:\Users\mrw\git\alasql\dist\alasql.js:4280:4)
     at alasql.exec (C:\Users\mrw\git\alasql\dist\alasql.js:4231:3)
     at alasql (C:\Users\mrw\git\alasql\dist\alasql.js:120:4)
     at Anonymous function (C:\Users\mrw\git\alasql\test\test238.js:25:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  14) Test 238 Test from string and into string 3. XLSX:
     Error: ENOENT: no such file or directory, open 'C:\Usersmrwgitalasql	est\restest238b.xlsx'
     at fs.openSync (fs.js:620:3)
     at fs.writeFileSync (fs.js:1284:3)
     at write_zip_type (C:\Users\mrw\git\alasql\node_modules\xlsx\xlsx.js:11412:16)
     at writeSync (C:\Users\mrw\git\alasql\node_modules\xlsx\xlsx.js:11421:12)
     at writeFileSync (C:\Users\mrw\git\alasql\node_modules\xlsx\xlsx.js:11436:2)
     at saveWorkbook (C:\Users\mrw\git\alasql\dist\alasql.js:14843:5)
     at doExport (C:\Users\mrw\git\alasql\dist\alasql.js:14742:3)
     at alasql.into.XLSX (C:\Users\mrw\git\alasql\dist\alasql.js:14715:3)
     at Function code (Function code:1:7)
     at queryfn3 (C:\Users\mrw\git\alasql\dist\alasql.js:6227:3)
     at queryfn (C:\Users\mrw\git\alasql\dist\alasql.js:5942:3)
     at statement (C:\Users\mrw\git\alasql\dist\alasql.js:6944:3)
     at alasql.dexec (C:\Users\mrw\git\alasql\dist\alasql.js:4280:4)
     at alasql.exec (C:\Users\mrw\git\alasql\dist\alasql.js:4231:3)
     at alasql (C:\Users\mrw\git\alasql\dist\alasql.js:120:4)
     at Anonymous function (C:\Users\mrw\git\alasql\test\test238.js:33:9)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  15) Test 242 Multi-columns Excel file 1. Read multi-column file:
     Uncaught Error: ENOENT: no such file or directory, open 'C:\Usersmrwgitalasql	est\test242.xlsx'
     at Anonymous function (C:\Users\mrw\git\alasql\dist\alasql.js:3397:25)
     at readFileAfterOpen (fs.js:360:5)

  16) Test 242 Multi-columns Excel file 2. Read multi-column file:
     Uncaught Error: ENOENT: no such file or directory, open 'C:\Usersmrwgitalasql	est\test242.xlsx'
     at Anonymous function (C:\Users\mrw\git\alasql\dist\alasql.js:3397:25)
     at readFileAfterOpen (fs.js:360:5)

  17) Test 293 SLT#1 3. SELECT 1 - no modifier:
     TypeError: Function expected
     at Anonymous function (C:\Users\mrw\git\alasql\test\test293.js:73:5)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  18) Test 293 SLT#1 4. SELECT 1 - RECORDSET:
     TypeError: Function expected
     at Anonymous function (C:\Users\mrw\git\alasql\test\test293.js:89:5)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  19) Test 392 Observable (issue #499) 2. Prepare test data:
     TypeError: Object doesn't support property or method 'observe'
     at Anonymous function (C:\Users\mrw\git\alasql\test\test392.js:27:5)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  20) Test 400 Trigger with INSERTED 3. Insert:

      AssertionError: [ [ 100, undefined ], [ 200, undefined ] ] deepEqual [ [ 100, 2016 ], [ 200, 2016 ] ]
      + expected - actual

       [
         [
           100
      -    [undefined]
      +    2016
         ]
         [
           200
      -    [undefined]
      +    2016
         ]
       ]
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test400.js:31:5)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  21) Test 408 - DATEADD() and DATEDIFF() 3. DATEDIFF():
     AssertionError: undefined deepEqual -1
     at Anonymous function (C:\Users\mrw\git\alasql\test\test408.js:43:5)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)

  22) Test 408 - DATEADD() and DATEDIFF() 4. DATE_ADD() MySQL-style:

      AssertionError: false == true
      + expected - actual

      -false
      +true
      
     at Anonymous function (C:\Users\mrw\git\alasql\test\test408.js:83:5)
     at callFnAsync (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:306:5)
     at Runnable.prototype.run (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runnable.js:261:7)
     at Runner.prototype.runTest (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:421:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:528:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:341:7)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:351:7)
     at next (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:285:5)
     at Anonymous function (C:\Users\mrw\AppData\Roaming\npm\node_modules\mocha\lib\runner.js:319:5)



