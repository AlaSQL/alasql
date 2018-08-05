if (alasql.options.mysql) {
}

if (alasql.options.mysql || alasql.options.sqlite) {
	// Pseudo INFORMATION_SCHEMA function
	alasql.from.INFORMATION_SCHEMA = function(filename, opts, cb, idx, query) {
		if (filename == 'VIEWS' || filename == 'TABLES') {
			var res = [];
			for (var databaseid in alasql.databases) {
				var tables = alasql.databases[databaseid].tables;
				for (var tableid in tables) {
					if (
						(tables[tableid].view && filename == 'VIEWS') ||
						(!tables[tableid].view && filename == 'TABLES')
					) {
						res.push({TABLE_CATALOG: databaseid, TABLE_NAME: tableid});
					}
				}
			}
			if (cb) res = cb(res, idx, query);
			return res;
		}
		throw new Error('Unknown INFORMATION_SCHEMA table');
	};
}
