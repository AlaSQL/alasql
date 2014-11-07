/*
//
// Persistence Store for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Store to Storage
alasql.store = function(databaseid, transactionid) {
	var obj = {
		tables: alasql.databases[databaseid].tables
	};
	var key = databaseid;
	if(transactionid) key += "."+transactionid;
	localStorage[key] = JSON.stringify(obj);
};

// Restore from localStorage
alasql.restore = function(databaseid, transactionid) {
	var key = databaseid;
	if(transactionid) key += "."+transactionid;

	var res = localStorage[key];
	if(res) {
		var obj = JSON.parse(localStorage[key]);
		var db = new alasql.Database(databaseid);
		db.databaseid = databaseid;
		db.tables = obj.tables;
		return db;
	} else {
		return null;
	}

};

// Clear all database records with transactions
alasql.wipe = function (databaseid, transactionid) {
	var key = databaseid;
	if(transactionid) {
		key += "."+transactionid;
		localStorage.removeItem(key);
	} else {
		for(var key in localStorage) {
			if(key.substr(0,databaseid.length+1) == databaseid+".") {
				localStorage.removeItem(key);
			};
		};
		localStorage.removeItem(databaseid);
	}
};