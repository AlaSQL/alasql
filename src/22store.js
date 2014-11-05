
alasql.store = function(databaseid, transactionid) {
	var obj = {
		tables: alasql.databases[databaseid].tables
	};
	var key = databaseid;
	if(transactionid) key += "."+transactionid;
	alasql.storage.getItem(key) = JSON.stringify(obj);
};

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