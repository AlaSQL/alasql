define(["jquery","./sqlite_driver"], function ($,SQLite_driver) {

    var WebSQL_driver = function(){
        this.db = null;
        this.ddl = [];
        this.nativeSQLite = (window.openDatabase !== undefined);
        return this;
    };

    $.extend(WebSQL_driver.prototype,SQLite_driver.prototype); // inherit from parent class

    WebSQL_driver.prototype.buildSchema = function (args) {

        var _this = this; // preserve reference to current object through local closures

            try {

                if (_this.nativeSQLite)
                {
                    _this.db = openDatabase(args["short_code"], '1.0', args["short_code"], args["ddl"].length * 1024);

                    _this.db.transaction(function(tx){

                        var statements = _this.splitStatement(args["ddl"],args["statement_separator"]);
                        _this.ddl = statements;

                        var currentStatement = 0;
                        var statement = statements[currentStatement];

                        var sequentiallyExecute = function(tx2, result){
                            if (currentStatement < statements.length-1)
                            {
                                do {
                                    currentStatement++;
                                    statement = statements[currentStatement];
                                } while (currentStatement < statements.length-1 && statement.match(/^\s*$/));

                                if (!statement.match(/^\s*$/)) {
                                    tx.executeSql(statement, [], sequentiallyExecute, handleFailure);
                                }
                                else
                                {
                                    tx.executeSql("intentional failure used to rollback transaction");
                                    args["success"]();
                                }

                            }
                            else
                            {
                                tx.executeSql("intentional failure used to rollback transaction");
                                args["success"]();
                            }
                        };

                        var handleFailure = function (tx2, result) {
                            if (result.message != "not an error") // thank you safari, for this
                            {
                                args["error"](result.message);
                            }
                            else
                            {
                                args["success"]();
                            }

                            return true; // roll back transaction
                        };

                        if (statement) {
                            tx.executeSql(statement, [], sequentiallyExecute, handleFailure);
                        }
                        else {
                            args["success"]();
                        }
                    });

                }
                else
                {
                    args["error"]("SQLite (WebSQL) not available in your browser. Try either using a webkit-based browser (such as Safari or Chrome) or using the SQLite (SQL.js) database type.")
                }

            }
            catch (e)
            {
                args["error"](e);
            }

        }


    WebSQL_driver.prototype.executeQuery = function (args) {

        var _this = this; // preserve reference to current object through local closures

            try {

                if (_this.db == null ) {
                    throw("You need to build the schema before you can run a query.");
                }

                var returnSets = [];

                _this.db.transaction(function(tx){

                    var sequentiallyExecute = function(tx2, result) {

                        var thisSet = {
                            "STATEMENT": statement,
                            "SUCCEEDED": true,
                            "EXECUTIONTIME": (new Date()) - startTime,
                            "RESULTS": {
                                "COLUMNS": [],
                                "DATA": []
                            },
                            "EXECUTIONPLAN": {
                                "COLUMNS": [],
                                "DATA": []
                            }

                        };

                        for (var i = 0; i < result.rows.length; i++) {
                            var rowVals = [];
                            var item = result.rows.item(i);

                            /* We can't be sure about the order of the columns returned, since they are returned as
                             * a simple unordered structure. So, we'll just take the order returned the from the first
                             * request, then just use that order for each row.
                             */
                            if (i == 0) {
                                for (col in item) {
                                    thisSet["RESULTS"]["COLUMNS"].push(col);
                                }
                            }

                            for (var j = 0; j < thisSet["RESULTS"]["COLUMNS"].length; j++) {
                                if (item[thisSet["RESULTS"]["COLUMNS"][j]] === null) {
                                    rowVals.push("(null)");
                                } else {
                                    rowVals.push(item[thisSet["RESULTS"]["COLUMNS"][j]]);
                                }
                            }

                            thisSet["RESULTS"]["DATA"].push(rowVals);
                        }

                        tx.executeSql("EXPLAIN QUERY PLAN " + statement, [], function (tx3, executionPlanResult) {

                            for (var l = 0; l < executionPlanResult.rows.length; l++) {
                                var rowVals = [];
                                var item = executionPlanResult.rows.item(l);

                                /* We can't be sure about the order of the columns returned, since they are returned as
                                 * a simple unordered structure. So, we'll just take the order returned the from the first
                                 * request, then just use that order for each row.
                                 */
                                if (l == 0) {
                                    for (col in item) {
                                        thisSet["EXECUTIONPLAN"]["COLUMNS"].push(col);
                                    }
                                }

                                for (var j = 0; j < thisSet["EXECUTIONPLAN"]["COLUMNS"].length; j++) {
                                    rowVals.push(item[thisSet["EXECUTIONPLAN"]["COLUMNS"][j]]);
                                }

                                thisSet["EXECUTIONPLAN"]["DATA"].push(rowVals);
                            }

                            if (currentStatement > _this.ddl.length-1)
                                returnSets.push(thisSet);

                            // executeSQL runs asynchronously, so we have to make recursive calls to handle subsequent queries in order.
                            if (currentStatement < (statements.length - 1))
                            {
                                do {
                                currentStatement++;
                                statement = statements[currentStatement];
                                } while (currentStatement < statements.length-1 && statement.match(/^\s*$/));

                                if (! statement.match(/^\s*$/))
                                    tx.executeSql(statement, [], sequentiallyExecute, handleFailure);
                                else
                                {
                                    tx.executeSql("intentional failure used to rollback transaction");
                                    args["success"](returnSets);
                                }

                            }
                            else
                            {
                                tx.executeSql("intentional failure used to rollback transaction");
                                args["success"](returnSets);
                            }


                        },
                        function(tx3, executionPlanResult){
                            // if the explain failed, then just append the base set to the result and move on....

                            if (currentStatement > _this.ddl.length-1)
                                returnSets.push(thisSet);

                            // executeSQL runs asynchronously, so we have to make recursive calls to handle subsequent queries in order.
                            if (currentStatement < (statements.length - 1))
                            {
                                do {
                                currentStatement++;
                                statement = statements[currentStatement];
                                } while (currentStatement < statements.length-1 && statement.match(/^\s*$/));

                                if (! statement.match(/^\s*$/))
                                    tx.executeSql(statement, [], sequentiallyExecute, handleFailure);
                                else
                                {
                                    tx.executeSql("intentional failure used to rollback transaction");
                                    args["success"](returnSets);
                                }
                            }
                            else
                            {
                                tx.executeSql("intentional failure used to rollback transaction");
                                args["success"](returnSets);
                            }


                        });

                    }

                    var handleFailure = function (tx, result) {
                        if (result.message != "not an error") // thank you safari, for this
                        {
                            var thisSet = {
                                "SUCCEEDED": false,
                                "EXECUTIONTIME": (new Date()) - startTime,
                                "ERRORMESSAGE": result.message
                            };
                            returnSets.push(thisSet);
                        }

                        args["success"](returnSets); // 'success' - slightly confusing here, but in this context a failed query is still a valid result from the database
                        return true; // roll back transaction
                    }

                    var setArray = [], k, stop = false;

                    var statements = _this.ddl.slice(0);

                    $.each(_this.splitStatement(args["sql"],args["statement_separator"]), function (i, stmt) { statements.push(stmt); });

                    var currentStatement = 0;
                    var statement = statements[currentStatement];

                    var startTime = new Date();

                    /*
                     * executeSql runs asynchronously, so I impose a semblance of synchronous-ness via recursive calls
                     */
                    tx.executeSql(statement, [], sequentiallyExecute, handleFailure);



                });

            }
            catch (e)
            {
                args["error"](e);
            }


        }

    return WebSQL_driver;
});

