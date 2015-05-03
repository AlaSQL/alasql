//
// 91localstorage.js
// localStorage and DOM-Storage engine
// Date: 09.12.2014
// (c) Andrey Gershun
//

var LS = alasql.engines.LOCALSTORAGE = function (){};

LS.get = function(key) {
	var s = localStorage.getItem(key);
	if(typeof s == "undefined") return;
	var v = undefined;
	try {
		v = JSON.parse(s); 
	} catch(err) {
		throw new Error('Cannot parse JSON '+s);
	}
	return v;
};

LS.set = function(key, value){
	if(typeof value == 'undefined') localStorage.removeItem(key);
	else localStorage.setItem(key,JSON.stringify(value)); 
}

LS.createDatabase = function(lsdbid, args, ifnotexists, dbid, cb){
	var res = 1;
	var ls = LS.get('alasql');
	if(!(ifnotexists && ls && ls.databases && ls.databases[lsdbid])) {
		if(!ls) ls = {databases:{}};
		if(ls.databases && ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot create new database "'+lsdbid+'" because it already exists');
		}
		ls.databases[lsdbid] = true;
		LS.set('alasql',ls);
		LS.set(lsdbid,{databaseid:lsdbid, tables:{}});
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};

LS.dropDatabase = function(lsdbid, ifexists, cb){
	var res = 1;
	var ls = LS.get('alasql');
	if(!(ifexists && ls && ls.databases && !ls.databases[lsdbid])) {
		if(!ls) {
			if(!ifexists) {
				throw new Error('There are no alasql databases in localStorage');
			} else {
				return 0;
			}
		};
//		console.log(999,ls.databases,ls.databases[lsdbid], lsdbid);	
		if(ls.databases && !ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot drop database "'+lsdbid+'" because there is no such database');
		}
		delete ls.databases[lsdbid];
		LS.set('alasql',ls);
		
		var db = LS.get(lsdbid);
		for(var tableid in db.tables) {
//			console.log('remove',lsdbid,tableid);
			localStorage.removeItem(lsdbid+'.'+tableid);
		}

		localStorage.removeItem(lsdbid);
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};


LS.attachDatabase = function(lsdbid, dbid, args, params, cb){
	var res = 1;
	if(alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "'+dbid+'" because it already exists');
	};
	var db = new alasql.Database(dbid || lsdbid);
	db.engineid = "LOCALSTORAGE";
	db.lsdbid = lsdbid;
	db.tables = LS.get(lsdbid).tables;
	// IF AUTOCOMMIT IS OFF then copy data to memory
	if(!alasql.options.autocommit) {
		if(db.tables){
			for(var tbid in db.tables) {
				db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
			}
		}
	}
	if(cb) res = cb(res);
	return res;
};

LS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if(like) {
		var relike = new RegExp(like.value.replace(/\%/g,'.*'),'g');
	}
	if(ls && ls.databases) {
		for(dbid in ls.databases) {
			res.push({databaseid: dbid});
		};
		if(like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(relike);
			});
		}		
	};
	if(cb) cb(res);
	return res;
};

LS.createTable = function(databaseid, tableid, ifnotexists, cb) {
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var tb = LS.get(lsdbid+'.'+tableid);
	var res = 1;

	if(tb && !ifnotexists) {
		throw new Error('Table "'+tableid+'" alsready exists in localStorage database "'+lsdbid+'"');
	};
	var lsdb = LS.get(lsdbid);
	var table = alasql.databases[databaseid].tables[tableid];
	lsdb.tables[tableid] = {columns:table.columns};

	LS.set(lsdbid, lsdb);
	LS.set(lsdbid+'.'+tableid, []);

	if(cb) cb(res);
	return res;
}

LS.dropTable = function (databaseid, tableid, ifexists, cb) {
//	console.log(arguments);
	var res = 1;
	var lsdbid = alasql.databases[databaseid].lsdbid;
	if(alasql.options.autocommit) {
		var lsdb = LS.get(lsdbid);
	} else {
		var lsdb = alasql.databases[databaseid];
	}
	if(!ifexists && !lsdb.tables[tableid]) {
		throw new Error('Cannot drop table "'+tableid+'" in localStorage, because it does not exist');
	};
	delete lsdb.tables[tableid];
	LS.set(lsdbid, lsdb);
	localStorage.removeItem(lsdbid+'.'+tableid);
	if(cb) cb(res);
	return res;
}

LS.fromTable = function(databaseid, tableid, cb, idx, query) {
//	console.log(998, databaseid, tableid, cb);
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = LS.get(lsdbid+'.'+tableid);
	if(cb) res = cb(res, idx, query);
	return res;
};

LS.intoTable = function(databaseid, tableid, value, columns, cb) {
//	console.log('intoTable',databaseid, tableid, value, cb);
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = value.length;
	var tb = LS.get(lsdbid+'.'+tableid);
	if(!tb) tb = [];
	tb = tb.concat(value);
	LS.set(lsdbid+'.'+tableid, tb);
//	console.log(lsdbid+'.'+tableid, tb);
//	console.log(localStorage[lsdbid+'.'+tableid]);
//console.log(165,res);
	if(cb) cb(res);
//console.log(167,res);
	return res;
};

LS.loadTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	db.tables[tableid].data = LS.get(lsdbid+'.'+tableid);
}

LS.saveTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	LS.set(lsdbid+'.'+tableid,db.tables[tableid].data);
	db.tables[tableid].data = null;
}

LS.commit = function(databaseid, cb) {
//	console.log('COMMIT');
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = {databaseid:lsdbid, tables:{}};
	if(db.tables) {
		for(var tbid in db.tables) {
			lsdb.tables[tbid] = {columns: db.tables[tbid].columns};
			LS.set(lsdbid+'.'+tbid, db.tables[tbid].data);
		};
	}
	LS.set(lsdbid,lsdb);
	return 1;
};

LS.begin = LS.commit;

LS.rollback = function(databaseid, cb) {
//	console.log(207,databaseid);
	var db = alasql.databases[databaseid];
	db.dbversion++;
//	console.log(db.dbversion)
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = LS.get(lsdbid);
//	if(!alasql.options.autocommit) {
		if(lsdb.tables){
			for(var tbid in lsdb.tables) {
				var tb = new alasql.Table({columns: db.tables[tbid].columns});
				extend(tb,lsdb.tables[tbid]);
				lsdb.tables[tbid] = tb;
				if(!alasql.options.autocommit) {
					lsdb.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
				}
				lsdb.tables[tbid].indexColumns();

				// index columns
				// convert types
			}
		}
//	}
	delete alasql.databases[databaseid];
	alasql.databases[databaseid] = new alasql.Database(databaseid);
	extend(alasql.databases[databaseid], lsdb);
	alasql.databases[databaseid].databaseid = databaseid;
	alasql.databases[databaseid].engineid = 'LOCALSTORAGE';
//console.log(999, alasql.databases[databaseid]);
}


