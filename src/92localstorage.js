//
// 91localstorage.js
// localStorage and DOM-Storage engine
// Date: 09.12.2014
// (c) Andrey Gershun
//

/* global alasql, yy, localStorage*/

var LS = (alasql.engines.LOCALSTORAGE = function() {});

/**
	Read data from localStorage with security breaks
	@param key {string} Address in localStorage
	@return {object} JSON object
*/
LS.get = function(key) {
	var s = localStorage.getItem(key);
	if (typeof s === 'undefined') return;
	var v;
	try {
		v = JSON.parse(s);
	} catch (err) {
		throw new Error('Cannot parse JSON object from localStorage' + s);
	}
	return v;
};

/**
	Store data into localStorage with security breaks
	@param key {string} Address in localStorage
	@return {object} JSON object
*/
LS.set = function(key, value) {
	if (typeof value === 'undefined') localStorage.removeItem(key);
	else localStorage.setItem(key, JSON.stringify(value));
};

/**
	Store table structure and data into localStorage
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param tableid {string} Table name
	@return Nothing
*/
LS.storeTable = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	var table = db.tables[tableid];
	// Create empty structure for table
	var tbl = {};
	tbl.columns = table.columns;
	tbl.data = table.data;
	tbl.identities = table.identities;
	// TODO: May be add indexes, objects and other fields?
	LS.set(db.lsdbid + '.' + tableid, tbl);
};

/**
	Restore table structure and data
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param tableid {string} Table name
	@return Nothing
*/
LS.restoreTable = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	var tbl = LS.get(db.lsdbid + '.' + tableid);
	var table = new alasql.Table();
	for (var f in tbl) {
		table[f] = tbl[f];
	}
	db.tables[tableid] = table;
	table.indexColumns();
	// We need to add other things here
	return table;
};

/**
	Remove table from localStorage
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param tableid {string} Table name
*/

LS.removeTable = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	localStorage.removeItem(db.lsdbid + '.' + tableid);
};

/**
	Create database in localStorage
	@param lsdbid {string} localStorage database id
	@param args {array} List of parameters (not used in localStorage)
	@param ifnotexists {boolean} Check if database does not exist
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param cb {function} Callback
*/

LS.createDatabase = function(lsdbid, args, ifnotexists, databaseid, cb) {
	var res = 1;
	var ls = LS.get('alasql'); // Read list of all databases
	if (!(ifnotexists && ls && ls.databases && ls.databases[lsdbid])) {
		if (!ls) ls = {databases: {}}; // Empty record
		if (ls.databases && ls.databases[lsdbid]) {
			throw new Error(
				'localStorage: Cannot create new database "' +
					lsdbid +
					'" because it already exists'
			);
		}
		ls.databases[lsdbid] = true;
		LS.set('alasql', ls);
		LS.set(lsdbid, {databaseid: lsdbid, tables: {}}); // Create database record
	} else {
		res = 0;
	}
	if (cb) res = cb(res);
	return res;
};

/**
	Drop external database
	@param lsdbid {string} localStorage database id
	@param ifexists {boolean} Check if database exists
	@param cb {function} Callback
*/
LS.dropDatabase = function(lsdbid, ifexists, cb) {
	var res = 1;
	var ls = LS.get('alasql');
	if (!(ifexists && ls && ls.databases && !ls.databases[lsdbid])) {
		// 1. Remove record from 'alasql' record
		if (!ls) {
			if (!ifexists) {
				throw new Error('There is no any AlaSQL databases in localStorage');
			} else {
				return cb ? cb(0) : 0;
			}
		}

		if (ls.databases && !ls.databases[lsdbid]) {
			throw new Error(
				'localStorage: Cannot drop database "' +
					lsdbid +
					'" because there is no such database'
			);
		}
		delete ls.databases[lsdbid];
		LS.set('alasql', ls);

		// 2. Remove tables definitions
		var db = LS.get(lsdbid);
		for (var tableid in db.tables) {
			localStorage.removeItem(lsdbid + '.' + tableid);
		}

		// 3. Remove database definition
		localStorage.removeItem(lsdbid);
	} else {
		res = 0;
	}
	if (cb) res = cb(res);
	return res;
};

/**
	Attach existing localStorage database to AlaSQL database
	@param lsdibid {string} localStorage database id
	@param
*/

LS.attachDatabase = function(lsdbid, databaseid, args, params, cb) {
	var res = 1;
	if (alasql.databases[databaseid]) {
		throw new Error(
			'Unable to attach database as "' + databaseid + '" because it already exists'
		);
	}
	if (!databaseid) databaseid = lsdbid;
	var db = new alasql.Database(databaseid);
	db.engineid = 'LOCALSTORAGE';
	db.lsdbid = lsdbid;
	db.tables = LS.get(lsdbid).tables;
	// IF AUTOABORT IS OFF then copy data to memory
	if (!alasql.options.autocommit) {
		if (db.tables) {
			for (var tbid in db.tables) {
				LS.restoreTable(databaseid, tbid);
				//				db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
			}
		}
	}
	if (cb) res = cb(res);
	return res;
};

/**
	Show list of databases from localStorage
	@param like {string} Mathing pattern
	@param cb {function} Callback
*/
LS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if (like) {
		// TODO: If we have a special function for LIKE patterns?
		var relike = new RegExp(like.value.replace(/%/g, '.*'), 'g');
	}
	if (ls && ls.databases) {
		for (var dbid in ls.databases) {
			res.push({databaseid: dbid});
		}
		if (like && res && res.length > 0) {
			res = res.filter(function(d) {
				return d.databaseid.match(relike);
			});
		}
	}
	if (cb) res = cb(res);
	return res;
};

/**
	Create table in localStorage database
	@param databaseid {string} AlaSQL database id
	@param tableid {string} Table id
	@param ifnotexists {boolean} If not exists flag
	@param cb {function} Callback
*/

LS.createTable = function(databaseid, tableid, ifnotexists, cb) {
	var res = 1;
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var tb = LS.get(lsdbid + '.' + tableid);
	// Check if such record exists
	if (tb && !ifnotexists) {
		throw new Error(
			'Table "' + tableid + '" alsready exists in localStorage database "' + lsdbid + '"'
		);
	}
	var lsdb = LS.get(lsdbid);
	var table = alasql.databases[databaseid].tables[tableid];

	// TODO: Check if required
	lsdb.tables[tableid] = true;

	LS.set(lsdbid, lsdb);
	LS.storeTable(databaseid, tableid);

	if (cb) res = cb(res);
	return res;
};

/**
   Empty table and reset identities
   @param databaseid {string} AlaSQL database id (not external localStorage)
   @param tableid {string} Table name
   @param ifexists {boolean} If exists flag
   @param cb {function} Callback
   @return 1 on success
*/
LS.truncateTable = function(databaseid, tableid, ifexists, cb) {
	var res = 1;
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb;
	if (alasql.options.autocommit) {
		lsdb = LS.get(lsdbid);
	} else {
		lsdb = alasql.databases[databaseid];
	}

	if (!ifexists && !lsdb.tables[tableid]) {
		throw new Error(
			'Cannot truncate table "' + tableid + '" in localStorage, because it does not exist'
		);
	}

	//load table
	var tbl = LS.restoreTable(databaseid, tableid);

	//clear data from table
	tbl.data = [];
	//TODO reset all identities
	//but identities are not working on LOCALSTORAGE
	//See test 607 for details

	//store table
	LS.storeTable(databaseid, tableid);

	if (cb) res = cb(res);
	return res;
};

/**
	Create table in localStorage database
	@param databaseid {string} AlaSQL database id
	@param tableid {string} Table id
	@param ifexists {boolean} If exists flag
	@param cb {function} Callback
*/

LS.dropTable = function(databaseid, tableid, ifexists, cb) {
	var res = 1;
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb;

	if (alasql.options.autocommit) {
		lsdb = LS.get(lsdbid);
	} else {
		lsdb = alasql.databases[databaseid];
	}
	if (!ifexists && !lsdb.tables[tableid]) {
		throw new Error(
			'Cannot drop table "' + tableid + '" in localStorage, because it does not exist'
		);
	}
	delete lsdb.tables[tableid];
	LS.set(lsdbid, lsdb);
	//	localStorage.removeItem(lsdbid+'.'+tableid);
	LS.removeTable(databaseid, tableid);
	if (cb) res = cb(res);
	return res;
};

/**
	Read all data from table
*/

LS.fromTable = function(databaseid, tableid, cb, idx, query) {
	//	console.log(998, databaseid, tableid, cb);
	var lsdbid = alasql.databases[databaseid].lsdbid;
	//	var res = LS.get(lsdbid+'.'+tableid);

	var res = LS.restoreTable(databaseid, tableid).data;

	if (cb) res = cb(res, idx, query);
	return res;
};

/**
	Insert data into the table
	@param databaseid {string} Database id
	@param tableid {string} Table id
	@param value {array} Array of values
	@param columns {array} Columns (not used)
	@param cb {function} Callback
*/

LS.intoTable = function(databaseid, tableid, value, columns, cb) {
	//	console.log('intoTable',databaseid, tableid, value, cb);
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = value.length;
	//	var tb = LS.get(lsdbid+'.'+tableid);
	var tb = LS.restoreTable(databaseid, tableid);
	for (var columnid in tb.identities) {
		var ident = tb.identities[columnid];

		for (var index in value) {
			value[index][columnid] = ident.value;
			ident.value += ident.step;
		}
	}
	if (!tb.data) tb.data = [];
	tb.data = tb.data.concat(value);
	//	LS.set(lsdbid+'.'+tableid, tb);
	LS.storeTable(databaseid, tableid);
	//	console.log(lsdbid+'.'+tableid, tb);
	//	console.log(localStorage[lsdbid+'.'+tableid]);
	//console.log(165,res);
	if (cb) res = cb(res);
	//console.log(167,res);
	return res;
};

/**
	Laad data from table
*/
LS.loadTableData = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	LS.restoreTable(databaseid, tableid);
	//	db.tables[tableid].data = LS.get(lsdbid+'.'+tableid);
};

/**
	Save data to the table
*/

LS.saveTableData = function(databaseid, tableid) {
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	LS.storeTable(lsdbid, tableid);
	//	LS.set(lsdbid+'.'+tableid,db.tables[tableid].data);
	db.tables[tableid].data = undefined;
};

/**
	Commit
*/

LS.commit = function(databaseid, cb) {
	//	console.log('COMMIT');
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = {databaseid: lsdbid, tables: {}};
	if (db.tables) {
		for (var tbid in db.tables) {
			// TODO: Question - do we need this line
			lsdb.tables[tbid] = true;
			LS.storeTable(databaseid, tbid);
			//			LS.set(lsdbid+'.'+tbid, db.tables[tbid].data);
		}
	}
	LS.set(lsdbid, lsdb);
	return cb ? cb(1) : 1;
};

/**
	Alias BEGIN = COMMIT
*/
LS.begin = LS.commit;

/**
	ROLLBACK
*/

LS.rollback = function(databaseid, cb) {
	// This does not work and should be fixed
	// Plus test 151 and 231

	return;

	//	console.log(207,databaseid);
	var db = alasql.databases[databaseid];
	db.dbversion++;
	//	console.log(db.dbversion)
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = LS.get(lsdbid);
	//	if(!alasql.options.autocommit) {

	delete alasql.databases[databaseid];
	alasql.databases[databaseid] = new alasql.Database(databaseid);
	extend(alasql.databases[databaseid], lsdb);
	alasql.databases[databaseid].databaseid = databaseid;
	alasql.databases[databaseid].engineid = 'LOCALSTORAGE';

	if (lsdb.tables) {
		for (var tbid in lsdb.tables) {
			//				var tb = new alasql.Table({columns: db.tables[tbid].columns});
			//				extend(tb,lsdb.tables[tbid]);
			//				lsdb.tables[tbid] = true;

			//				if(!alasql.options.autocommit) {

			//					lsdb.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
			LS.restoreTable(databaseid, tbid);
			//				}
			//				lsdb.tables[tbid].indexColumns();

			// index columns
			// convert types
		}
	}
	//	}
	//console.log(999, alasql.databases[databaseid]);
};
