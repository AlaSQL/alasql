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

LS.createDatabase = function(lsdbid, args, dbid, cb){
	console.log(999);
	var res = 1;
	var ls = LS.get('alasql');
	if(!ls) ls = {databases:{}};
	if(ls.databases && ls.databases[lsdbid]) {
		throw new Error('localStorage: Cannot create new database "'+lsdbid+'" because it already exists');
	}
	ls.databases[lsdbid] = {};
	LS.set('alasql',ls);
	LS.set(lsdbid,{databaseid:lsdbid, tables:{}});

	if(cb) cb(res);
	return res;
};

LS.dropDatabase = function(databaseid){
	var res = 1;
	var ls = LS.get('alasql');
	if(!ls) {
		throw new Error('There are no alasql databases in localStorage');
	};
	if(ls.databases && !ls.databases[lsbdid]) {
		throw new Error('localStorage: Cannot drop database "'+databaseid+'" because there is no such database');
	}
	delete ls.databases[lsdbid];
	LS.set('alasql',ls);
	
	var db = LS.get(databaseid);
	for(var tableid in db.tables) {
		localStorage.removeItem[databaseid+'.'+tableid];
	}

	localStorage.removeItem(databaseid);

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
}


