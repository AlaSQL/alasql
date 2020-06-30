if (alasql.options.tsql) {
	//
	// Check tables and views
	// IF OBJECT_ID('dbo.Employees') IS NOT NULL
	//   DROP TABLE dbo.Employees;
	// IF OBJECT_ID('dbo.VSortedOrders', 'V') IS NOT NULL
	//   DROP VIEW dbo.VSortedOrders;

	alasql.stdfn.OBJECT_ID = function (name, type) {
		if (typeof type == 'undefined') type = 'T';
		type = type.toUpperCase();

		var sname = name.split('.');
		var dbid = alasql.useid;
		var objname = sname[0];
		if (sname.length == 2) {
			dbid = sname[0];
			objname = sname[1];
		}

		var tables = alasql.databases[dbid].tables;
		dbid = alasql.databases[dbid].databaseid;
		for (var tableid in tables) {
			if (tableid == objname) {
				// TODO: What OBJECT_ID actually returns

				if (tables[tableid].view && type == 'V') return dbid + '.' + tableid;
				if (!tables[tableid].view && type == 'T') return dbid + '.' + tableid;
				return undefined;
			}
		}

		return undefined;
	};
}
