define(['jquery', './sqlite_driver'], function ($, SQLite_driver) {
	var SQLjs_driver = function () {
		this.db = null;
		return this;
	};

	$.extend(SQLjs_driver.prototype, SQLite_driver.prototype); // inherit from parent class

	SQLjs_driver.prototype.buildSchema = function (args) {
		var _this = this; // preserve reference to current object through local closures

		try {
			/*
			 * Closure used to handle both cases of when the sql.js library
			 * has already been loaded, or when it has not yet been.
			 */
			var jsBuildSchema = function () {
				_this.db = new window.SQL.Database();
				$.each(
					SQLite_driver.prototype.splitStatement.call(
						this,
						args['ddl'],
						args['statement_separator']
					),
					function (i, statement) {
						_this.db.exec(statement);
					}
				);

				args['success']();
			};

			//  If the sql.js code isn't yet loaded, do it now.
			if (window.SQL === undefined) {
				window.define_tmp = window.define;
				window.define = undefined;
				$.getScript('javascript/sql.js', function (script, textStatus, jqXHR) {
					window.define = window.define_tmp;
					jsBuildSchema();
				}).fail(function (jqxhr, settings, exception) {
					args['error'](
						'Your browser does not work with SQL.js.  Try using a different browser (Chrome, Safari, Firefox, IE 10, etc...), or a newer version of your current one.'
					);
				});
			} else {
				if (_this.db) {
					_this.db.close();
				}

				jsBuildSchema();
			}
		} catch (e) {
			args['error'](e);
		}
	};

	SQLjs_driver.prototype.executeQuery = function (args) {
		var _this = this; // preserve reference to current object through local closures

		try {
			if (!_this.db) {
				throw 'Database Schema not available!';
			}

			var returnSets = [];

			_this.db.exec('BEGIN TRANSACTION');

			$.each(this.splitStatement(args['sql'], args['statement_separator']), function (
				i,
				statement
			) {
				if ($.trim(statement).length) {
					var startTime = new Date();

					var setArray = [];

					try {
						setArray = _this.db.exec(statement);

						var thisSet = {
							SUCCEEDED: true,
							STATEMENT: statement,
							EXECUTIONTIME: new Date() - startTime,
							RESULTS: {
								COLUMNS: [],
								DATA: [],
							},
							EXECUTIONPLAN: {
								COLUMNS: [],
								DATA: [],
							},
						};

						if (setArray.length) {
							$.each(setArray, function () {
								thisSet['RESULTS']['COLUMNS'] = this.columns;
								thisSet['RESULTS']['DATA'] = this.values;
							});
						}

						try {
							exectionPlanArray = _this.db.exec('EXPLAIN QUERY PLAN ' + statement);

							if (exectionPlanArray.length) {
								$.each(exectionPlanArray, function () {
									thisSet['EXECUTIONPLAN']['COLUMNS'] = this.columns;
									thisSet['EXECUTIONPLAN']['DATA'] = this.values;
								});
							}
						} catch (e) {
							// if we get an error with the execution plan, just ignore and move on.
						}

						returnSets.push(thisSet);
					} catch (e) {
						var thisSet = {
							SUCCEEDED: false,
							EXECUTIONTIME: new Date() - startTime,
							ERRORMESSAGE: e,
						};
						returnSets.push(thisSet);
						return false; // breaks the each loop
					}
				}
			});

			_this.db.exec('ROLLBACK TRANSACTION');

			args['success'](returnSets);
		} catch (e) {
			args['error'](e);
		}
	};

	return SQLjs_driver;
});
