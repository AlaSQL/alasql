/*
//
// DUMP for Alasql.js
// Date: 07.12.2024
// (c) 2024, Andrey Gershun
//
*/

// DUMP DATABASE databaseid
// or DUMP (for current database)

yy.DumpDatabase = function (params) {
	return Object.assign(this, params);
};

yy.DumpDatabase.prototype.toString = function () {
	var s = 'DUMP';
	if (this.databaseid) {
		s += ' DATABASE ' + this.databaseid;
	}
	return s;
};

yy.DumpDatabase.prototype.execute = function (databaseid, params, cb) {
	var dbid = this.databaseid || databaseid;
	var db = alasql.databases[dbid];

	if (!db) {
		throw new Error("Database '" + dbid + "' does not exist");
	}

	var sql = '';

	// Iterate through all tables in the database
	for (var tableid in db.tables) {
		var table = db.tables[tableid];

		// Generate CREATE TABLE statement
		sql += 'CREATE TABLE ' + tableid + ' (';
		var ss = [];

		if (table.columns && table.columns.length > 0) {
			table.columns.forEach(function (col) {
				var a = col.columnid + ' ' + (col.dbtypeid || col.typeid || 'STRING');
				if (col.dbsize) a += '(' + col.dbsize + ')';
				if (col.primarykey) a += ' PRIMARY KEY';
				// TODO: Add more column properties like NOT NULL, DEFAULT, etc.
				ss.push(a);
			});
			sql += ss.join(', ');
		}

		sql += ');\n';

		// Generate INSERT statements for table data
		if (table.data && table.data.length > 0) {
			var columns = table.columns || [];

			// If no columns defined, infer from first data row
			if (columns.length === 0 && table.data.length > 0) {
				columns = Object.keys(table.data[0]).map(function (columnid) {
					return {columnid: columnid};
				});
			}

			// Generate INSERT statements
			for (var i = 0; i < table.data.length; i++) {
				sql += 'INSERT INTO ' + tableid + '(';
				sql += columns
					.map(function (col) {
						return col.columnid;
					})
					.join(',');
				sql += ') VALUES (';
				sql += columns
					.map(function (col) {
						var val = table.data[i][col.columnid];
						// Handle null and undefined values
						if (val === null || val === undefined) {
							return 'NULL';
						}
						// Check if value should be escaped as a string
						var shouldEscape =
							(col.typeid &&
								(col.typeid === 'STRING' ||
									col.typeid === 'VARCHAR' ||
									col.typeid === 'NVARCHAR' ||
									col.typeid === 'CHAR' ||
									col.typeid === 'NCHAR')) ||
							typeof val == 'string';
						if (shouldEscape) {
							val = "'" + escapeqq(val) + "'";
						}
						return val;
					})
					.join(',');
				sql += ');\n';
			}
		}

		sql += '\n';
	}

	if (cb) {
		return cb(sql);
	}
	return sql;
};
