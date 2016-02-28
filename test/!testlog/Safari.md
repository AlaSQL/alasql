### Safari 9
- `alasql@0.2.3-develop-1206`
- Failures: 79
- Passes 1045


```
duration: 22.60s
Test 127 SOURCE
1. Load and run statements ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
execute@http://localhost:7387/dist/alasql.js:15575:10
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test127.js:13:9
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
2. Test on loaded database ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test127.js:20:19
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 128 ASSERT
1. Assert on SOURCE and run statements ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
execute@http://localhost:7387/dist/alasql.js:15575:10
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test128.js:15:9
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 154 - IndexedDB test
1. Create Database and Table ‣
timeout of 2000ms exceeded
http://localhost:7387/lib/mocha/mocha.js:4295:28
Test 168a - read XLSX
1. Read XLSX file ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
2. Read XLSX file with Headers ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
3. Read XLSX file with Headers and range ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
4. Read XLSX file with Headers and sheet ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 168b - read XLS
1. Read XLS file ‣
Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
2. Read XLS file with Headers ‣
Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
3. Read XLS file with Headers and range ‣
Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
4. Read XLS file with Headers and sheet ‣
Unsupported file (http://localhost:7387/lib/xlsx/xls.core.min.js:7)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 172 - XLSX to array
1. Load XLSX file into array ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 198 - MS SQL compatibility
1. Create tables ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
execute@http://localhost:7387/dist/alasql.js:15575:10
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:12:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
2. Select ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
execute@http://localhost:7387/dist/alasql.js:15575:10
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:32:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
3. CROSS JOIN ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:40:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. ON ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:47:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
5. LEFT OUTER JOIN ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:55:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
6. LEFT OUTER JOIN ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:63:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
7. GROUP BY ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:72:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
8. HAVING ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:85:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
9. SELECT ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:99:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
10. ORDER BY ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:112:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
11. SELECT ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:128:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
12. TOP ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:142:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
17. UNION ALL ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:195:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
18. Complex Statement ‣
undefined is not an object (evaluating 'table.columns')
http://localhost:7387/dist/alasql.js:8861:13
forEach@[native code]
compileDefCols@http://localhost:7387/dist/alasql.js:8854:20
compile@http://localhost:7387/dist/alasql.js:6777:37
dexec@http://localhost:7387/dist/alasql.js:4265:45
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test198.js:218:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. Drop database ‣
Test 202 GETTIME and CAST
1. GETDATE() ‣
2. CONVERT(,,110) ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test202.js:20:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 203 REQUIRE ASYNC
1. REQUIRE() ASYN ‣
2. REQUIRE SYNC ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
http://localhost:7387/dist/alasql.js:15620:12
forEach@[native code]
execute@http://localhost:7387/dist/alasql.js:15619:21
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test203.js:24:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 212: CONVERT dates with style
1. CONVERT DATES ‣
2. CONVERT DATE TO STRING ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:72:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
3. CONVERT JAVASCRIPT DATE TO STRING ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:80:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. CONVERT JAVASCRIPT DATE TO STRING ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:87:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
5. CONVERT DATE TO STRING FROM TABLE ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:99:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
6. CONVERT DATE TO STRING FROM TABLE ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:112:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
7. CONVERT DATE TO STRING FROM TABLE ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:125:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
8. CONVERT DATE TO STRING FROM TABLE without columns ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:138:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
9. CONVERT DATE TO STRING FROM TABLE without columns ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test212.js:151:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 232 Errors handling
1. Prepare database ‣
2. Throw error ‣
3. Log error async ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test232.js:29:19
exec@http://localhost:7387/dist/alasql.js:4227:7
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test232.js:28:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. Log error sync ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test232.js:37:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. DROP ‣
Test 242 Multi-columns Excel file
1. Read multi-column file ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
2. Read multi-column file ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 271 RECORDSET and Excel tests
1. Open Excel and columns ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 286 CREATE UNIQUE INDEX
1. CREATE TABLE and FIRST INSERT ‣
2. Fill tables with data ‣
test is not a function. (In 'test(M)', 'test' is 430)
http://localhost:7387/test286.js:29:18
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
3. DROP DATABASE ‣
Test 291 Promised version
1. CREATE DATABASE ‣
2. Promise ‣
undefined is not a constructor (evaluating 'new Promise')
promise@http://localhost:7387/dist/alasql.js:4423:23
http://localhost:7387/test291.js:32:19
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
3. Promise Exception ‣
undefined is not a constructor (evaluating 'new Promise')
promise@http://localhost:7387/dist/alasql.js:4423:23
http://localhost:7387/test291.js:43:19
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. DROP DATABASE ‣
Test 298 PLUG-IN TEST
1. CREATE DATABASE ‣
2.REQURE ECHO plugin ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
http://localhost:7387/dist/alasql.js:15635:13
forEach@[native code]
execute@http://localhost:7387/dist/alasql.js:15632:23
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test298.js:23:21
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
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
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test305.js:113:21
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. Drop database ‣
Test 306 XML reader
1. Read XML file / SEARCH like JSON ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:21:11
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
1a. Read XML file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:29:11
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
2. Read XML file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4249:20
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:39:11
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
3. Read XML file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:47:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. Read XML file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:55:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
5. Read XML file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:62:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
6a. Read GEFX file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:71:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
6b. Read GEFX file / SEARCH XML ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:81:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
7. Edges ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:89:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
7. SEARCH INTO ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
XML@http://localhost:7387/dist/alasql.js:15265:24
doSearch@http://localhost:7387/dist/alasql.js:5337:63
doSearch@[native code]
statement@http://localhost:7387/dist/alasql.js:5435:22
dexec@http://localhost:7387/dist/alasql.js:4280:36
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test306.js:97:12
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 330 PROLOG
"before all" hook ‣
InvalidAccessError: DOM Exception 15
loadFile@http://localhost:7387/dist/alasql.js:3331:20
http://localhost:7387/dist/alasql.js:15635:13
forEach@[native code]
execute@http://localhost:7387/dist/alasql.js:15632:23
dexec@http://localhost:7387/dist/alasql.js:4286:52
exec@http://localhost:7387/dist/alasql.js:4231:22
alasql@http://localhost:7387/dist/alasql.js:120:22
http://localhost:7387/test330.js:14:11
callFn@http://localhost:7387/lib/mocha/mocha.js:4387:25
run@http://localhost:7387/lib/mocha/mocha.js:4380:13
next@http://localhost:7387/lib/mocha/mocha.js:4667:13
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 353 Compiled Promised Statements
1. CREATE DATABASE ‣
2. Compiled Sync ‣
3. Compiled Sync with Error ‣
5. Compiles Async ‣
7. Compile Promise ‣
undefined is not a constructor (evaluating 'new Promise')
promise@http://localhost:7387/dist/alasql.js:4385:25
http://localhost:7387/test353.js:70:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
5. Compile With Error ‣
undefined is not a constructor (evaluating 'new Promise')
promise@http://localhost:7387/dist/alasql.js:4385:25
http://localhost:7387/test353.js:79:15
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. DROP DATABASE ‣
373. Use functions in group by
1. Use functions from GROUP BY without alias ‣
[{"MONTH(fecha_Venta)":"NaN","Sales":0}] deepEqual [{"MONTH(fecha_Venta)":10,"Sales":12500},{"MONTH(fecha_Venta)":9,"Sales":25000}]
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
deepEqual@http://localhost:7387/lib/assert/assert.js:244:9
http://localhost:7387/test373.js:34:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
2. Use functions with alias from GROUP BY ‣
[{"mes":"NaN","Sales":0}] deepEqual [{"mes":10,"Sales":12500},{"mes":9,"Sales":25000}]
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
deepEqual@http://localhost:7387/lib/assert/assert.js:244:9
http://localhost:7387/test373.js:45:25
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
Test 392 Observable (issue #499)
1. CREATE DATABASE ‣
2. Prepare test data ‣
Array.observe is not a function. (In 'Array.observe(alasql.databases.test392.tables.one.data,function(args){
//      test++;
//      console.log('changed',arguments);
    })', 'Array.observe' is undefined)
http://localhost:7387/test392.js:27:18
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. DROP DATABASE ‣
Test 395 SQLLOGICTEST SELECT 1
1. CREATE DATABASE ‣
2. Test inline ‣
3. Test from table ‣
4. Test like in command-line ‣
undefined is not a constructor (evaluating 'new Promise')
promise@http://localhost:7387/dist/alasql.js:4423:23
http://localhost:7387/test395.js:36:19
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
5. More tests ‣
99. DROP DATABASE ‣
Test 400 Trigger with INSERTED
1. CREATE DATABASE ‣
2. Create table and trigger ‣
3. Insert ‣
[[100,"undefined"],[200,"undefined"]] deepEqual [[100,2016],[200,2016]]
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
deepEqual@http://localhost:7387/lib/assert/assert.js:244:9
http://localhost:7387/test400.js:31:21
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. DROP DATABASE ‣
Test 408 - DATEADD() and DATEDIFF()
1. CREATE DATABASE ‣
2. DATEDIFF() ‣
[{"Duration":"undefined"}] deepEqual [{"Duration":1}]
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
deepEqual@http://localhost:7387/lib/assert/assert.js:244:9
http://localhost:7387/test408.js:32:21
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
3. DATEDIFF() ‣
"undefined" deepEqual -1
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
deepEqual@http://localhost:7387/lib/assert/assert.js:244:9
http://localhost:7387/test408.js:43:21
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. DATEADD() ‣
4. DATE_ADD() MySQL-style ‣
false == true
AssertionError@http://localhost:7387/lib/assert/assert.js:151:30
fail@http://localhost:7387/lib/assert/assert.js:198:34
ok@http://localhost:7387/lib/assert/assert.js:218:19
http://localhost:7387/test408.js:83:11
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
99. DROP DATABASE ‣
Test 419 Load data from text file with default headers option
1. Load TXT ‣
2. Load CSV with {headers:true} ‣
3. Load CSV by default ‣
4. Load CSV with {headers:false} ‣
4. Load XLSX with {headers:true} ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
5. Load XLSX ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
6. Load XLSX with {headers:true} ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 420 Load data from XLSX without extra line
1. Load XLSX ‣
Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
onerror@http://localhost:7387/lib/mocha/mocha.js:5879:19
Test 421 Test for JOINSTAR
1. Create tables ‣
2. OVERWRITE JOINSTAR ‣
3. JSON JOINSTAR ‣
undefined is not an object (evaluating 'alasql.databases.test421.dbversion')
http://localhost:7387/test421.js:38:29
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27
4. UNDESCORE JOINSTAR ‣
undefined is not an object (evaluating 'alasql.databases.test421.dbversion')
http://localhost:7387/test421.js:52:29
run@http://localhost:7387/lib/mocha/mocha.js:4354:19
runTest@http://localhost:7387/lib/mocha/mocha.js:4782:13
http://localhost:7387/lib/mocha/mocha.js:4860:19
next@http://localhost:7387/lib/mocha/mocha.js:4707:16
http://localhost:7387/lib/mocha/mocha.js:4717:11
next@http://localhost:7387/lib/mocha/mocha.js:4655:25
http://localhost:7387/lib/mocha/mocha.js:4684:9
timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:27