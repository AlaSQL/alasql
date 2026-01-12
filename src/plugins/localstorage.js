/**
 * LocalStorage plugin for AlaSQL
 * Provides LocalStorage engine for browser environments
 */

/**
 * Register LocalStorage plugin with alasql
 * @param {object} alasql - The alasql instance
 */
export function localstorage(alasql) {
	// Skip if not in browser environment
	if (typeof localStorage === 'undefined') {
		return;
	}

	// Ensure engines object exists
	if (!alasql.engines) alasql.engines = {};

	alasql.engines.LOCALSTORAGE = {
		createDatabase: function (databaseid, args, cb) {
			const key = 'alasql_' + databaseid;
			if (!localStorage.getItem(key)) {
				localStorage.setItem(key, JSON.stringify({tables: {}}));
			}
			if (cb) cb(1);
			return 1;
		},

		dropDatabase: function (databaseid, cb) {
			const key = 'alasql_' + databaseid;
			localStorage.removeItem(key);
			if (cb) cb(1);
			return 1;
		},

		createTable: function (databaseid, tableid, ifnotexists, cb) {
			const key = 'alasql_' + databaseid;
			const db = JSON.parse(localStorage.getItem(key) || '{"tables":{}}');
			if (!db.tables[tableid]) {
				db.tables[tableid] = {data: []};
				localStorage.setItem(key, JSON.stringify(db));
			}
			if (cb) cb(1);
			return 1;
		},

		dropTable: function (databaseid, tableid, ifexists, cb) {
			const key = 'alasql_' + databaseid;
			const db = JSON.parse(localStorage.getItem(key) || '{"tables":{}}');
			delete db.tables[tableid];
			localStorage.setItem(key, JSON.stringify(db));
			if (cb) cb(1);
			return 1;
		},

		loadTableData: function (databaseid, tableid) {
			const key = 'alasql_' + databaseid;
			const db = JSON.parse(localStorage.getItem(key) || '{"tables":{}}');
			const table = alasql.databases[databaseid]?.tables[tableid];
			if (table && db.tables[tableid]) {
				table.data = db.tables[tableid].data || [];
			}
		},

		saveTableData: function (databaseid, tableid) {
			const key = 'alasql_' + databaseid;
			const db = JSON.parse(localStorage.getItem(key) || '{"tables":{}}');
			const table = alasql.databases[databaseid]?.tables[tableid];
			if (table) {
				db.tables[tableid] = {data: table.data};
				localStorage.setItem(key, JSON.stringify(db));
			}
		},
	};
}
