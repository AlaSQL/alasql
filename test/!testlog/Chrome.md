### Chrome 48
- `alasql@0.2.3-develop-1206`
- Failures: 61
- Passes 1063


```
duration: 11.78s
Test 127 SOURCE
1. Load and run statements ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at yy.Source.execute (http://localhost:7387/dist/alasql.js:15575:2)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test127.js:13:3)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
2. Test on loaded database ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test127.js:20:13)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
Test 128 ASSERT
1. Assert on SOURCE and run statements ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at yy.Source.execute (http://localhost:7387/dist/alasql.js:15575:2)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test128.js:15:3)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
Test 168a - read XLSX
1. Read XLSX file ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
2. Read XLSX file with Headers ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
3. Read XLSX file with Headers and range ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
4. Read XLSX file with Headers and sheet ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 168b - read XLS
1. Read XLS file ‣
Error: Uncaught Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
2. Read XLS file with Headers ‣
Error: Uncaught Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
3. Read XLS file with Headers and range ‣
Error: Uncaught Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
4. Read XLS file with Headers and sheet ‣
Error: Uncaught Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 172 - XLSX to array
1. Load XLSX file into array ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 198 - MS SQL compatibility
1. Create tables ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at yy.Source.execute (http://localhost:7387/dist/alasql.js:15575:2)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:12:9)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
2. Select ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at yy.Source.execute (http://localhost:7387/dist/alasql.js:15575:2)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:32:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
3. CROSS JOIN ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:40:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
4. ON ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:47:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
5. LEFT OUTER JOIN ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:55:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
6. LEFT OUTER JOIN ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:63:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
7. GROUP BY ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:72:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
8. HAVING ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:85:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
9. SELECT ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:99:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
10. ORDER BY ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:112:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
11. SELECT ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:128:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
12. TOP ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:142:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
17. UNION ALL ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:195:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
18. Complex Statement ‣
TypeError: Cannot read property 'columns' of undefined
    at http://localhost:7387/dist/alasql.js:8861:13
    at Array.forEach (native)
    at yy.Select.compileDefCols (http://localhost:7387/dist/alasql.js:8854:13)
    at yy.Select.compile (http://localhost:7387/dist/alasql.js:6777:23)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4265:38)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test198.js:218:19)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
99. Drop database ‣
Test 203 REQUIRE ASYNC
1. REQUIRE() ASYN ‣
2. REQUIRE SYNC ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at http://localhost:7387/dist/alasql.js:15620:4
    at Array.forEach (native)
    at yy.Require.execute (http://localhost:7387/dist/alasql.js:15619:14)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test203.js:24:9)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
Test 242 Multi-columns Excel file
1. Read multi-column file ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
2. Read multi-column file ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 271 RECORDSET and Excel tests
1. Open Excel and columns ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 286 CREATE UNIQUE INDEX
1. CREATE TABLE and FIRST INSERT ‣
2. Fill tables with data ‣
TypeError: test is not a function
    at Context.<anonymous> (http://localhost:7387/test286.js:29:14)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
3. DROP DATABASE ‣
Test 291 Promised version
1. CREATE DATABASE ‣
2. Promise ‣
TypeError: Promise is not a function
    at Function.alasql.promise (http://localhost:7387/dist/alasql.js:4423:12)
    at Context.<anonymous> (http://localhost:7387/test291.js:32:12)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
3. Promise Exception ‣
TypeError: Promise is not a function
    at Function.alasql.promise (http://localhost:7387/dist/alasql.js:4423:12)
    at Context.<anonymous> (http://localhost:7387/test291.js:43:12)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
4. DROP DATABASE ‣
Test 298 PLUG-IN TEST
1. CREATE DATABASE ‣
2.REQURE ECHO plugin ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at http://localhost:7387/dist/alasql.js:15635:5
    at Array.forEach (native)
    at yy.Require.execute (http://localhost:7387/dist/alasql.js:15632:16)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test298.js:23:15)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
99. DROP DATABASE ‣
Test 305 CREATE GRAPH
1. Create database ‣
2. CREATE GRAPH ‣
3. CREATE GRAPH ‣
4. CREATE GRAPH ‣
5. Search over graph ‣
6. Search over graph ‣
7. Search over graph ‣
8. Search over graph ‣
9a. Search over graph with >> ‣
9b. Search over graph with << ‣
10. CREATE GRAPH ‣
11. CREATE GRAPH ‣
12. CREATE GRAPH ‣
13. CREATE GRAPH ‣
14. CREATE GRAPH ‣
15. CREATE GRAPH ‣
16. Create database ‣
17. Create database ‣
18. Create graph from file ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test305.js:113:15)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
99. Drop database ‣
Test 306 XML reader
1. Read XML file / SEARCH like JSON ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:21:5)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
1a. Read XML file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:29:5)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
2. Read XML file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4249:11)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:39:5)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
3. Read XML file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:47:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
4. Read XML file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:55:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
5. Read XML file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:62:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
6a. Read GEFX file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:71:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
6b. Read GEFX file / SEARCH XML ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:81:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
7. Edges ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:89:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
7. SEARCH INTO ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at Object.utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at alasql.from.XML (http://localhost:7387/dist/alasql.js:15265:16)
    at doSearch (http://localhost:7387/dist/alasql.js:5337:58)
    at statement (http://localhost:7387/dist/alasql.js:5435:22)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4280:27)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test306.js:97:6)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
Test 330 PROLOG
"before all" hook ‣
Error: Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be changed for synchronous requests made from a document.
    at Error (native)
    at utils.loadFile (http://localhost:7387/dist/alasql.js:3331:34)
    at http://localhost:7387/dist/alasql.js:15635:5
    at Array.forEach (native)
    at yy.Require.execute (http://localhost:7387/dist/alasql.js:15632:16)
    at Function.alasql.dexec (http://localhost:7387/dist/alasql.js:4286:45)
    at Function.alasql.exec (http://localhost:7387/dist/alasql.js:4231:17)
    at alasql (http://localhost:7387/dist/alasql.js:120:18)
    at Context.<anonymous> (http://localhost:7387/test330.js:14:5)
    at callFn (http://localhost:7387/lib/mocha/mocha.js:4387:21)
Test 353 Compiled Promised Statements
1. CREATE DATABASE ‣
2. Compiled Sync ‣
3. Compiled Sync with Error ‣
5. Compiles Async ‣
7. Compile Promise ‣
TypeError: Promise is not a function
    at Function.statement.promise (http://localhost:7387/dist/alasql.js:4385:14)
    at Context.<anonymous> (http://localhost:7387/test353.js:70:8)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
5. Compile With Error ‣
TypeError: Promise is not a function
    at Function.statement.promise (http://localhost:7387/dist/alasql.js:4385:14)
    at Context.<anonymous> (http://localhost:7387/test353.js:79:8)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
99. DROP DATABASE ‣
373. Use functions in group by
1. Use functions from GROUP BY without alias ‣
AssertionError: [{"MONTH(fecha_Venta)":"NaN","Sales":0}] deepEqual [{"MONTH(fecha_Venta)":10,"Sales":12500},{"MONTH(fecha_Venta)":9,"Sales":25000}]
    at Context.<anonymous> (http://localhost:7387/test373.js:34:16)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
2. Use functions with alias from GROUP BY ‣
AssertionError: [{"mes":"NaN","Sales":0}] deepEqual [{"mes":10,"Sales":12500},{"mes":9,"Sales":25000}]
    at Context.<anonymous> (http://localhost:7387/test373.js:45:16)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
Test 395 SQLLOGICTEST SELECT 1
1. CREATE DATABASE ‣
2. Test inline ‣
3. Test from table ‣
4. Test like in command-line ‣
TypeError: Promise is not a function
    at Function.alasql.promise (http://localhost:7387/dist/alasql.js:4423:12)
    at Context.<anonymous> (http://localhost:7387/test395.js:36:12)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
5. More tests ‣
99. DROP DATABASE ‣
Test 418 Load data from internet
.xlsx from URL
Load http ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Load https ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
.xls from URL
Load http ‣
Error: Uncaught Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Load https ‣
Error: Uncaught Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 419 Load data from text file with default headers option
1. Load TXT ‣
2. Load CSV with {headers:true} ‣
3. Load CSV by default ‣
4. Load CSV with {headers:false} ‣
4. Load XLSX with {headers:true} ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
5. Load XLSX ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
6. Load XLSX with {headers:true} ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 420 Load data from XLSX without extra line
1. Load XLSX ‣
Error: Uncaught Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
    at global.onerror (http://localhost:7387/lib/mocha/mocha.js:5879:10)
Test 421 Test for JOINSTAR
1. Create tables ‣
2. OVERWRITE JOINSTAR ‣
3. JSON JOINSTAR ‣
TypeError: Cannot read property 'dbversion' of undefined
    at Context.<anonymous> (http://localhost:7387/test421.js:38:29)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)
4. UNDESCORE JOINSTAR ‣
TypeError: Cannot read property 'dbversion' of undefined
    at Context.<anonymous> (http://localhost:7387/test421.js:52:29)
    at Test.Runnable.run (http://localhost:7387/lib/mocha/mocha.js:4354:15)
    at Runner.runTest (http://localhost:7387/lib/mocha/mocha.js:4782:10)
    at http://localhost:7387/lib/mocha/mocha.js:4860:12
    at next (http://localhost:7387/lib/mocha/mocha.js:4707:14)
    at http://localhost:7387/lib/mocha/mocha.js:4717:7
    at next (http://localhost:7387/lib/mocha/mocha.js:4655:23)
    at http://localhost:7387/lib/mocha/mocha.js:4684:5
    at timeslice (http://localhost:7387/lib/mocha/mocha.js:5904:27)