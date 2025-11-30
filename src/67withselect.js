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

// Helper function to rename columns in result rows
function renameColumns(data, columns) {
	if (!columns || columns.length === 0) return data;
	return data.map(function (row) {
		var newRow = {};
		var keys = Object.keys(row);
		for (var i = 0; i < keys.length && i < columns.length; i++) {
			newRow[columns[i].columnid] = row[keys[i]];
		}
		return newRow;
	});
}

// Default maximum iterations for recursive CTEs to prevent infinite loops
var MAX_RECURSIVE_ITERATIONS = 1000;

// Execute a recursive CTE
function executeRecursiveCTE(w, databaseid, params, maxIterations) {
	maxIterations = maxIterations || MAX_RECURSIVE_ITERATIONS;
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

	// Execute anchor query using MATRIX format to preserve column order
	var anchorSelectObj = new yy.Select(anchorSelect);
	anchorSelectObj.modifier = 'MATRIX';
	var anchorMatrix = anchorSelectObj.execute(databaseid, params);

	// If we have explicit column names, use them; otherwise use the select column names
	if (!columnNames && anchorMatrix.length > 0) {
		// Get column names from the anchor select
		var anchorSelectCopy = new yy.Select(anchorSelect);
		anchorSelectCopy.modifier = 'RECORDSET';
		var recordset = anchorSelectCopy.execute(databaseid, params);
		columnNames = recordset.columns.map(function (c) {
			return c.columnid;
		});
	}

	// Convert matrix to array of objects with proper column names
	var anchorData = matrixToObjects(anchorMatrix, columnNames);
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

		// Execute recursive part using MATRIX format
		var recursiveSelectObj = new yy.Select(recursiveSelect);
		recursiveSelectObj.modifier = 'MATRIX';
		var recursiveMatrix = recursiveSelectObj.execute(databaseid, params);

		// Handle empty result (MATRIX modifier returns undefined for empty results)
		if (!recursiveMatrix || recursiveMatrix.length === 0) {
			break;
		}

		// Convert recursive result to objects with proper column names
		var recursiveData = matrixToObjects(recursiveMatrix, columnNames);

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

// Helper function to convert matrix to array of objects
function matrixToObjects(matrix, columnNames) {
	return matrix.map(function (row) {
		var obj = {};
		for (var i = 0; i < columnNames.length; i++) {
			obj[columnNames[i]] = row[i];
		}
		return obj;
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
