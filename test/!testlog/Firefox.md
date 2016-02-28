
### Firefox 42

    - `alasql@0.2.3-develop-1206`
    - Failures: 80
    - Passes 1044



```

    duration: 23.29s

    Test 127 SOURCE
        1. Load and run statements
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Source.prototype.execute@http://localhost:7387/dist/alasql.js:15575:1
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test127.js:13:3
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        2. Test on loaded database
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test127.js:20:13
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 128 ASSERT
        1. Assert on SOURCE and run statements
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Source.prototype.execute@http://localhost:7387/dist/alasql.js:15575:1
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test128.js:15:3
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 154 - IndexedDB test
        1. Create Database and Table
        ‣

        AbortError (http://localhost:7387/dist/alasql.js:15826)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 155 - InsexedDB INSERT
        1. Multiple lines async
        ‣

        AbortError (http://localhost:7387/dist/alasql.js:15826)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 168a - read XLSX
        1. Read XLSX file
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        2. Read XLSX file with Headers
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        3. Read XLSX file with Headers and range
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        4. Read XLSX file with Headers and sheet
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 168b - read XLS
        1. Read XLS file
        ‣

        uncaught exception: Unsupported file (:0)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        2. Read XLS file with Headers
        ‣

        uncaught exception: Unsupported file (:0)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        3. Read XLS file with Headers and range
        ‣

        uncaught exception: Unsupported file (:0)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        4. Read XLS file with Headers and sheet
        ‣

        uncaught exception: Unsupported file (:0)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 172 - XLSX to array
        1. Load XLSX file into array
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 198 - MS SQL compatibility
        1. Create tables
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Source.prototype.execute@http://localhost:7387/dist/alasql.js:15575:1
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:12:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        2. Select
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Source.prototype.execute@http://localhost:7387/dist/alasql.js:15575:1
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:32:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. CROSS JOIN
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:40:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. ON
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:47:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        5. LEFT OUTER JOIN
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:55:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        6. LEFT OUTER JOIN
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:63:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        7. GROUP BY
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:72:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        8. HAVING
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:85:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        9. SELECT
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:99:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        10. ORDER BY
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:112:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        11. SELECT
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:128:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        12. TOP
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:142:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        17. UNION ALL
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:195:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        18. Complex Statement
        ‣

        table is undefined
        yy.Select.prototype.compileDefCols/<@http://localhost:7387/dist/alasql.js:8861:1
        yy.Select.prototype.compileDefCols@http://localhost:7387/dist/alasql.js:8854:3
        yy.Select.prototype.compile@http://localhost:7387/dist/alasql.js:6777:18
        alasql.dexec@http://localhost:7387/dist/alasql.js:4265:20
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test198.js:218:19
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. Drop database
        ‣
    Test 202 GETTIME and CAST
        1. GETDATE()
        ‣
        2. CONVERT(,,110)
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test202.js:20:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 203 REQUIRE ASYNC
        1. REQUIRE() ASYN
        ‣
        2. REQUIRE SYNC
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Require.prototype.execute/<@http://localhost:7387/dist/alasql.js:15620:1
        yy.Require.prototype.execute@http://localhost:7387/dist/alasql.js:15619:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test203.js:24:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 207 WHILE
        1. FALSE WHILE
        ‣
        2. ONE WHILE ASYNC
        ‣

        loop is not defined
        yy.While.prototype.execute@http://localhost:7387/dist/alasql.js:12286:3
        adrunone@http://localhost:7387/dist/alasql.js:4362:5
        yy.SetVariable.prototype.execute@http://localhost:7387/dist/alasql.js:13399:13
        adrunone@http://localhost:7387/dist/alasql.js:4362:5
        alasql.adrun@http://localhost:7387/dist/alasql.js:4367:2
        alasql.dexec@http://localhost:7387/dist/alasql.js:4292:4
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test207.js:18:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. ONE WHILE SYNC
        ‣
    Test 212: CONVERT dates with style
        1. CONVERT DATES
        ‣
        2. CONVERT DATE TO STRING
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:72:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. CONVERT JAVASCRIPT DATE TO STRING
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:80:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. CONVERT JAVASCRIPT DATE TO STRING
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:87:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        5. CONVERT DATE TO STRING FROM TABLE
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:99:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        6. CONVERT DATE TO STRING FROM TABLE
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:112:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        7. CONVERT DATE TO STRING FROM TABLE
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:125:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        8. CONVERT DATE TO STRING FROM TABLE without columns
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:138:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        9. CONVERT DATE TO STRING FROM TABLE without columns
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test212.js:151:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 232 Errors handling
        1. Prepare database
        ‣
        2. Throw error
        ‣
        3. Log error async
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test232.js:29:13
        alasql.exec@http://localhost:7387/dist/alasql.js:4227:5
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test232.js:28:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. Log error sync
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test232.js:37:9
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. DROP
        ‣
    Test 242 Multi-columns Excel file
        1. Read multi-column file
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        2. Read multi-column file
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 271 RECORDSET and Excel tests
        1. Open Excel and columns
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 286 CREATE UNIQUE INDEX
        1. CREATE TABLE and FIRST INSERT
        ‣
        2. Fill tables with data
        ‣

        test is not a function
        @http://localhost:7387/test286.js:29:14
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. DROP DATABASE
        ‣
    Test 291 Promised version
        1. CREATE DATABASE
        ‣
        2. Promise
        ‣

        Promise is not a constructor
        alasql.promise@http://localhost:7387/dist/alasql.js:4423:1
        @http://localhost:7387/test291.js:32:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. Promise Exception
        ‣

        Promise is not a constructor
        alasql.promise@http://localhost:7387/dist/alasql.js:4423:1
        @http://localhost:7387/test291.js:43:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. DROP DATABASE
        ‣
    Test 298 PLUG-IN TEST
        1. CREATE DATABASE
        ‣
        2.REQURE ECHO plugin
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Require.prototype.execute/<@http://localhost:7387/dist/alasql.js:15635:1
        yy.Require.prototype.execute@http://localhost:7387/dist/alasql.js:15632:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test298.js:23:15
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. DROP DATABASE
        ‣
    Test 305 CREATE GRAPH
        1. Create database
        ‣
        2. CREATE GRAPH
        ‣
        3. CREATE GRAPH
        ‣
        4. CREATE GRAPH
        ‣
        5. Search over graph
        ‣
        6. Search over graph
        ‣
        7. Search over graph
        ‣
        8. Search over graph
        ‣
        9a. Search over graph with >>
        ‣
        9b. Search over graph with <<
        ‣
        10. CREATE GRAPH
        ‣
        11. CREATE GRAPH
        ‣
        12. CREATE GRAPH
        ‣
        13. CREATE GRAPH
        ‣
        14. CREATE GRAPH
        ‣
        15. CREATE GRAPH
        ‣
        16. Create database
        ‣
        17. Create database
        ‣
        18. Create graph from file
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test305.js:113:15
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. Drop database
        ‣
    Test 306 XML reader
        1. Read XML file / SEARCH like JSON
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:21:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        1a. Read XML file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:29:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        2. Read XML file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4249:1
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:39:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. Read XML file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:47:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. Read XML file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:55:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        5. Read XML file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:62:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        6a. Read GEFX file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:71:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        6b. Read GEFX file / SEARCH XML
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:81:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        7. Edges
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:89:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        7. SEARCH INTO
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        alasql.from.XML@http://localhost:7387/dist/alasql.js:15265:1
        doSearch@http://localhost:7387/dist/alasql.js:5337:14
        yy.Search.prototype.compile/statement@http://localhost:7387/dist/alasql.js:5435:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4280:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test306.js:97:6
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 330 PROLOG
        "before all" hook
        ‣

        A parameter or an operation is not supported by the underlying object
        utils.loadFile@http://localhost:7387/dist/alasql.js:3331:17
        yy.Require.prototype.execute/<@http://localhost:7387/dist/alasql.js:15635:1
        yy.Require.prototype.execute@http://localhost:7387/dist/alasql.js:15632:3
        alasql.dexec@http://localhost:7387/dist/alasql.js:4286:27
        alasql.exec@http://localhost:7387/dist/alasql.js:4231:10
        alasql@http://localhost:7387/dist/alasql.js:120:11
        @http://localhost:7387/test330.js:14:5
        callFn@http://localhost:7387/lib/mocha/mocha.js:4387:18
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4380:7
        next@http://localhost:7387/lib/mocha/mocha.js:4667:5
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 353 Compiled Promised Statements
        1. CREATE DATABASE
        ‣
        2. Compiled Sync
        ‣
        3. Compiled Sync with Error
        ‣
        5. Compiles Async
        ‣
        7. Compile Promise
        ‣

        Promise is not a constructor
        alasql.compile/statement.promise@http://localhost:7387/dist/alasql.js:4385:1
        @http://localhost:7387/test353.js:70:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        5. Compile With Error
        ‣

        Promise is not a constructor
        alasql.compile/statement.promise@http://localhost:7387/dist/alasql.js:4385:1
        @http://localhost:7387/test353.js:79:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. DROP DATABASE
        ‣
    373. Use functions in group by
        1. Use functions from GROUP BY without alias
        ‣

        [{"MONTH(fecha_Venta)":"NaN","Sales":0}] deepEqual [{"MONTH(fecha_Venta)":10,"Sales":12500},{"MONTH(fecha_Venta)":9,"Sales":25000}]
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        deepEqual@http://localhost:7387/lib/assert/assert.js:244:5
        @http://localhost:7387/test373.js:34:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        2. Use functions with alias from GROUP BY
        ‣

        [{"mes":"NaN","Sales":0}] deepEqual [{"mes":10,"Sales":12500},{"mes":9,"Sales":25000}]
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        deepEqual@http://localhost:7387/lib/assert/assert.js:244:5
        @http://localhost:7387/test373.js:45:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

    Test 392 Observable (issue #499)
        1. CREATE DATABASE
        ‣
        2. Prepare test data
        ‣

        Array.observe is not a function
        @http://localhost:7387/test392.js:27:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. DROP DATABASE
        ‣
    Test 395 SQLLOGICTEST SELECT 1
        1. CREATE DATABASE
        ‣
        2. Test inline
        ‣
        3. Test from table
        ‣
        4. Test like in command-line
        ‣

        Promise is not a constructor
        alasql.promise@http://localhost:7387/dist/alasql.js:4423:1
        @http://localhost:7387/test395.js:36:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        5. More tests
        ‣
        99. DROP DATABASE
        ‣
    Test 400 Trigger with INSERTED
        1. CREATE DATABASE
        ‣
        2. Create table and trigger
        ‣
        3. Insert
        ‣

        [[100,"undefined"],[200,"undefined"]] deepEqual [[100,2016],[200,2016]]
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        deepEqual@http://localhost:7387/lib/assert/assert.js:244:5
        @http://localhost:7387/test400.js:31:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. DROP DATABASE
        ‣
    Test 408 - DATEADD() and DATEDIFF()
        1. CREATE DATABASE
        ‣
        2. DATEDIFF()
        ‣

        [{"Duration":"undefined"}] deepEqual [{"Duration":1}]
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        deepEqual@http://localhost:7387/lib/assert/assert.js:244:5
        @http://localhost:7387/test408.js:32:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        3. DATEDIFF()
        ‣

        "undefined" deepEqual -1
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        deepEqual@http://localhost:7387/lib/assert/assert.js:244:5
        @http://localhost:7387/test408.js:43:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. DATEADD()
        ‣
        4. DATE_ADD() MySQL-style
        ‣

        false == true
        AssertionError@http://localhost:7387/lib/assert/assert.js:151:21
        fail@http://localhost:7387/lib/assert/assert.js:198:1
        ok@http://localhost:7387/lib/assert/assert.js:218:15
        @http://localhost:7387/test408.js:83:1
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        99. DROP DATABASE
        ‣
    Test 418 Load data from internet
        .xlsx from URL
            Load http
            ‣

            Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
            process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

            Load https
            ‣

            Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
            process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        .xls from URL
            Load http
            ‣

            uncaught exception: Unsupported file (:0)
            process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

            Load https
            ‣

            uncaught exception: Unsupported file (:0)
            process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 419 Load data from text file with default headers option
        1. Load TXT
        ‣
        2. Load CSV with {headers:true}
        ‣
        3. Load CSV by default
        ‣
        4. Load CSV with {headers:false}
        ‣
        4. Load XLSX with {headers:true}
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        5. Load XLSX
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

        6. Load XLSX with {headers:true}
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 420 Load data from XLSX without extra line
        1. Load XLSX
        ‣

        Error: Cannot find file [Content_Types].xml in zip (http://localhost:7387/lib/xlsx/xlsx.core.min.js:6)
        process.on/global.onerror@http://localhost:7387/lib/mocha/mocha.js:5879:10

    Test 421 Test for JOINSTAR
        1. Create tables
        ‣
        2. OVERWRITE JOINSTAR
        ‣
        3. JSON JOINSTAR
        ‣

        alasql.databases.test421 is undefined
        @http://localhost:7387/test421.js:38:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

        4. UNDESCORE JOINSTAR
        ‣

        alasql.databases.test421 is undefined
        @http://localhost:7387/test421.js:52:5
        Runnable.prototype.run@http://localhost:7387/lib/mocha/mocha.js:4354:7
        Runner.prototype.runTest@http://localhost:7387/lib/mocha/mocha.js:4782:5
        next/<@http://localhost:7387/lib/mocha/mocha.js:4860:7
        next@http://localhost:7387/lib/mocha/mocha.js:4707:1
        next/<@http://localhost:7387/lib/mocha/mocha.js:4717:7
        next@http://localhost:7387/lib/mocha/mocha.js:4655:1
        Runner.prototype.hook/<@http://localhost:7387/lib/mocha/mocha.js:4684:5
        timeslice@http://localhost:7387/lib/mocha/mocha.js:5904:5

