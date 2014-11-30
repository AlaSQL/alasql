//
// 91websql.js
// 
// (c) Andrey Gershun
//

var LS = alasql.engines.localStorage = function (){};

LS.get = function(key) {
	var s = localStorage[key];
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
	else localStorage[key] = JSON.stringify(value); 
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
			throw new Error('There are no alasql databases in localStorage');
		};
//		console.log(999,ls.databases,ls.databases[lsdbid], lsdbid);	
		if(ls.databases && !ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot drop database "'+lsdbid+'" because there is no such database');
		}
		delete ls.databases[lsdbid];
		LS.set('alasql',ls);
		
		var db = LS.get(lsdbid);
		for(var tableid in db.tables) {
			localStorage.removeItem[lsdbid+'.'+tableid];
		}

		localStorage.removeItem(lsdbid);
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};


LS.attachDatabase = function(databaseid, dbid, cb){
	var res = 1;
	if(alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "'+dbid+'" because it already exists');
	};
	var db = new alasql.Database(dbid || databaseid);
	db.engineid = "localStorage";
	db.lsdbid = databaseid;
	db.tables = LS.get(databaseid);
	return res;
};

LS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if(ls && ls.databases) {
		for(dbid in ls.databases) {
			res.push({databaseid: dbid});
		};
		if(like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(new RegExp((like.value).replace(/\%/g,'.*'),'g'));
			});
		}		
	};
	if(cb) cb(res);
	return res;
};

LS.fromTable = function(databaseid, tableid, cb) {
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = LS.get(lsdbid+'.'+tableid);
	if(cb) cb(res);
	return res;
};

LS.intoTable = function(databaseid, tableid, value, cb) {
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = 1;
	var tb = LS.get(lsdbid+'.'+tableid);
	if(!tb) tb = [];
	tb = tb.concat(value);
	LS.set(lsdbid+'.'+tableid, tb);
	if(cb) cb(res);
	return res;
};



