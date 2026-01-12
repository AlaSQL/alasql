/**
 * IndexedDB plugin for AlaSQL
 * Provides IndexedDB engine for browser environments
 */

/**
 * Register IndexedDB plugin with alasql
 * @param {object} alasql - The alasql instance
 */
export function indexeddb(alasql) {
	// Skip if not in browser environment
	if (typeof indexedDB === 'undefined') {
		return;
	}

	// Ensure engines object exists
	if (!alasql.engines) alasql.engines = {};

	alasql.engines.INDEXEDDB = {
		createDatabase: function (databaseid, args, cb) {
			const request = indexedDB.open(databaseid, 1);

			request.onupgradeneeded = function (e) {
				// Database created or upgraded
			};

			request.onsuccess = function (e) {
				e.target.result.close();
				if (cb) cb(1);
			};

			request.onerror = function (e) {
				throw new Error('IndexedDB error: ' + e.target.error);
			};

			return 1;
		},

		dropDatabase: function (databaseid, cb) {
			const request = indexedDB.deleteDatabase(databaseid);

			request.onsuccess = function () {
				if (cb) cb(1);
			};

			request.onerror = function (e) {
				throw new Error('IndexedDB error: ' + e.target.error);
			};

			return 1;
		},

		createTable: function (databaseid, tableid, ifnotexists, cb) {
			const request = indexedDB.open(databaseid);

			request.onsuccess = function (e) {
				const db = e.target.result;
				const version = db.version + 1;
				db.close();

				const upgrade = indexedDB.open(databaseid, version);
				upgrade.onupgradeneeded = function (e) {
					const db = e.target.result;
					if (!db.objectStoreNames.contains(tableid)) {
						db.createObjectStore(tableid, {autoIncrement: true});
					}
				};
				upgrade.onsuccess = function (e) {
					e.target.result.close();
					if (cb) cb(1);
				};
			};

			return 1;
		},

		dropTable: function (databaseid, tableid, ifexists, cb) {
			const request = indexedDB.open(databaseid);

			request.onsuccess = function (e) {
				const db = e.target.result;
				const version = db.version + 1;
				db.close();

				const upgrade = indexedDB.open(databaseid, version);
				upgrade.onupgradeneeded = function (e) {
					const db = e.target.result;
					if (db.objectStoreNames.contains(tableid)) {
						db.deleteObjectStore(tableid);
					}
				};
				upgrade.onsuccess = function (e) {
					e.target.result.close();
					if (cb) cb(1);
				};
			};

			return 1;
		},

		loadTableData: function (databaseid, tableid) {
			// Async operation - handled by specific queries
		},

		saveTableData: function (databaseid, tableid) {
			// Async operation - handled by specific queries
		},
	};
}
