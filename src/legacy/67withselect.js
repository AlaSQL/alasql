/*
//
// WITH SELECT for Alasql.js
// Date: 11.01.2015
// (c) 2015, Andrey Gershun
//
*/

yy.WithSelect = function (params) {
	return Object.assign(this, params);
};
yy.WithSelect.prototype.toString = function () {
	var s = 'WITH ';
	s +=
		this.withs
			.map(function (w) {
				var colStr = '';
				if (w.columns) {
					colStr =
						'(' +
						w.columns
							.map(function (c) {
								return c.columnid;
							})
							.join(', ') +
						')';
				}
				return (
					(w.recursive ? 'RECURSIVE ' : '') + w.name + colStr + ' AS (' + w.select.toString() + ')'
				);
			})
			.join(', ') + ' ';
	s += this.select.toString();
	return s;
};

// Execute a recursive CTE
function executeRecursiveCTE(w, databaseid, params) {
	var maxIterations = alasql.options.maxCteIterations || 1000;
	var db = alasql.databases[databaseid];
	var tableName = w.name;

	// Create the CTE table
	var tb = (db.tables[tableName] = new Table({
		tableid: tableName,
	}));
	tb.data = [];

	var select = w.select;
	var anchorSelect, recursiveSelect;

	// Check if this is a UNION ALL structure
	if (select.unionall) {
		// The anchor is the first part, recursive is in unionall
		anchorSelect = Object.assign({}, select);
		delete anchorSelect.unionall;
		recursiveSelect = select.unionall;
	} else if (select.union) {
		// UNION (without ALL) - less common for recursive CTEs but possible
		anchorSelect = Object.assign({}, select);
		delete anchorSelect.union;
		recursiveSelect = select.union;
	} else {
		// No recursive part, just execute once
		tb.data = select.execute(databaseid, params);
		if (w.columns) {
			tb.data = renameColumns(tb.data, w.columns);
		}
		return tb.data;
	}

	// Determine column names - either from explicit column list or from anchor query
	var columnNames;
	if (w.columns && w.columns.length > 0) {
		columnNames = w.columns.map(function (c) {
			return c.columnid;
		});
	}

	// Execute anchor query using ALASQL_DETAILS format to get both data and column metadata in one call
	var anchorSelectObj = new yy.Select(anchorSelect);
	anchorSelectObj.modifier = 'ALASQL_DETAILS';
	var anchorDetails = anchorSelectObj.execute(databaseid, params);

	// Get anchor column names from the query result
	var anchorColumnNames = anchorDetails.columns.map(function (c) {
		return c.columnid;
	});

	// If explicit column names provided, use them; otherwise use anchor column names
	if (!columnNames) {
		columnNames = anchorColumnNames;
	}

	// Map anchor data to target column names (handles both object format and column renaming)
	var anchorData = mapColumnsToNames(anchorDetails.data, anchorColumnNames, columnNames);
	tb.data = anchorData.slice();

	// Iterate with the recursive part
	var newRows = anchorData;
	var allData = anchorData.slice();
	var iteration = 0;

	while (newRows.length > 0 && iteration < maxIterations) {
		iteration++;

		// Recreate the CTE table with only the new rows to avoid query caching issues
		delete db.tables[tableName];
		tb = db.tables[tableName] = new Table({
			tableid: tableName,
		});
		tb.data = newRows;

		// Execute recursive part using ALASQL_DETAILS format
		var recursiveSelectObj = new yy.Select(recursiveSelect);
		recursiveSelectObj.modifier = 'ALASQL_DETAILS';
		var recursiveDetails = recursiveSelectObj.execute(databaseid, params);

		// Handle empty result
		if (!recursiveDetails.data || recursiveDetails.data.length === 0) {
			break;
		}

		// Get recursive column names and map to target column names by position
		var recursiveColumnNames = recursiveDetails.columns.map(function (c) {
			return c.columnid;
		});
		var recursiveData = mapColumnsToNames(recursiveDetails.data, recursiveColumnNames, columnNames);

		// Add new rows to the result
		newRows = recursiveData;
		for (var i = 0; i < newRows.length; i++) {
			allData.push(newRows[i]);
		}
	}

	// Set final table data
	tb.data = allData;
	return allData;
}

// Helper function to map data from source column names to target column names by position
function mapColumnsToNames(data, sourceColumns, targetColumns) {
	return data.map(function (row) {
		var newRow = {};
		for (var i = 0; i < targetColumns.length && i < sourceColumns.length; i++) {
			newRow[targetColumns[i]] = row[sourceColumns[i]];
		}
		return newRow;
	});
}

yy.WithSelect.prototype.execute = function (databaseid, params, cb) {
	var self = this;
	// Create temporary tables
	var savedTables = [];
	self.withs.forEach(function (w) {
		savedTables.push(alasql.databases[databaseid].tables[w.name]);

		if (w.recursive) {
			// Execute recursive CTE
			executeRecursiveCTE(w, databaseid, params);
		} else {
			// Non-recursive CTE - original behavior
			var tb = (alasql.databases[databaseid].tables[w.name] = new Table({
				tableid: w.name,
			}));
			tb.data = w.select.execute(databaseid, params);
			if (w.columns) {
				tb.data = renameColumns(tb.data, w.columns);
			}
		}
	});

	var res = 1;
	res = this.select.execute(databaseid, params, function (data) {
		// Clear temporary tables
		//		setTimeout(function(){
		self.withs.forEach(function (w, idx) {
			if (savedTables[idx]) alasql.databases[databaseid].tables[w.name] = savedTables[idx];
			else delete alasql.databases[databaseid].tables[w.name];
		});
		//		},0);

		if (cb) data = cb(data);
		return data;
	});
	return res;
};

/*/*
// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.CreateView.prototype.execute = function (databaseid) {
//	var self = this;
	var db = alasql.databases[this.view.databaseid || databaseid];
	var v = db.views[this.view.viewid] = new View();

//	console.log(databaseid);
//	console.log(db.databaseid,db.tables);
//	console.log(table);

	return 1;
};

yy.DropView = function (params) { return Object.assign(this, params); }
yy.DropView.prototype.toString = function() {
	var s = 'DROP'+' '+'VIEW';
	s += ' '+this.view.toString();
	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.DropView.prototype.execute = function (databaseid) {
//	var self = this;
};

*/
