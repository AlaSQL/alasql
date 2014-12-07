//
// 91websql.js
// 
//
//

var IDB = alasql.engines.IndexedDB = function (){};

IDB.showDatabases = function(like,cb) {
	// console.log('showDatabases',arguments);
	var request = indexedDB.webkitGetDatabaseNames();
	request.onsuccess = function(event) {
		var dblist = event.target.result;
		var res = [];
		if(like) {
			var relike = new RegExp((like.value).replace(/\%/g,'.*'),'g');
		}
		for(var i=0;i<dblist.length;i++) {
			if(!like || dblist[i].match(relike)) {
				res.push({databaseid: dblist[i]});
			}
		};
		cb(res);
	};
};

IDB.createDatabase = function(ixdbid, args, ifnotexists, dbid, cb){
	var request1 = indexedDB.webkitGetDatabaseNames();
	request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(dblist.contains(ixdbid)){
			if(ifnotexists) {
				cb(0);
				return;
			} else {		
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');
			}
		};

		var request2 = window.indexedDB.open(ixdbid,1);
		request2.onsuccess = function(event) {
			event.target.result.close();
			cb(1);
		};
	};
	// }
};

IDB.dropDatabase = function(ixdbid, ifexists, cb){
	var request1 = indexedDB.webkitGetDatabaseNames();
	request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			if(ifexists) {
				cb(0);
				return;
			} else {
				throw new Error('IndexedDB: Cannot drop new database "'+ixdbid+'" because it does not exist');
			}
		};
		var request2 = indexedDB.deleteDatabase(ixdbid);
		request2.onsuccess = function(event) {
			cb(1);
		}
	};
};

IDB.attachDatabase = function(ixdbid, dbid, cb) {
	var request1 = indexedDB.webkitGetDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot attach database "'+ixdbid+'" because it does not exist');
		};
		var request2 = indexedDB.open(ixdbid);
		request2.onsuccess = function(event) {
			var ixdb = event.target.result;
			var db = new alasql.Database(dbid || ixdbid);
			db.engineid = "IndexedDB";
			db.ixdbid = ixdbid;
			db.tables = [];
		  	var tblist = ixdb.objectStoreNames;
			for(var i=0;i<tblist.length;i++){
				db.tables[tblist[i]] = {};
			};

		// if(!alasql.autocommit) {
		// if(db.tables){
		// 	for(var tbid in db.tables) {
		// 		db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
		// 	}
		// 	}
		// }
			event.target.result.close();		
			cb(1);
		};
	};
};


IDB.createTable = function(databaseid, tableid, ifnotexists, cb) {
	var ixdbid = alasql.databases[databaseid].ixdbid;

	var request1 = indexedDB.webkitGetDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot create table in database "'+ixdbid+'" because it does not exist');
		};
		var request2 = indexedDB.open(ixdbid);
		request2.onversionchange = function(event) {
//			console.log('onversionchange');
			event.target.result.close();
		};
		request2.onsuccess = function(event) {
			var version = event.target.result.version;
			event.target.result.close();

			var request3 = indexedDB.open(ixdbid, version+1);
			request3.onupgradeneeded = function(event) {
				var ixdb = event.target.result;
//				console.log(ixdb);
				var store = ixdb.createObjectStore(tableid);
//				console.log(store);
			};
			request3.onsuccess = function(event) {
//				console.log('opened');
				event.target.result.close();
				cb(1);
			};
			request3.onerror = function(event){
				throw event;
//				console.log('error');
			}
			request3.onblocked = function(event){
				throw new Error('Cannot create table "'+tableid+'" because database "'+databaseid+'"  is blocked');
//				console.log('blocked');
			}				
		};
	};
};

IDB.dropTable = function (databaseid, tableid, ifexists, cb) {
	var ixdbid = alasql.databases[databaseid].ixdbid;

	var request1 = indexedDB.webkitGetDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot drop table in database "'+ixdbid+'" because it does not exist');
		};
		var request2 = indexedDB.open(ixdbid);
		request2.onversionchange = function(event) {
			event.target.result.close();
		};
		request2.onsuccess = function(event) {
			var version = event.target.result.version;
			event.target.result.close();

			var request3 = indexedDB.open(ixdbid, version+1);
			request3.onupgradeneeded = function(event) {
				var ixdb = event.target.result;
//				console.log(ixdb);
				ixdb.deleteObjectStore(tableid);
				delete alasql.databases[databaseid].tables[tableid];
//				var store = ixdb.createObjectStore(tableid);
				console.log('deleted');
			};
			request3.onsuccess = function(event) {
				console.log('opened');
				event.target.result.close();
				cb(1);
			};
			request3.onerror = function(event){
				throw event;
//				console.log('error');
			}
			request3.onblocked = function(event){
				throw new Error('Cannot drop table "'+tableid+'" because database "'+databaseid+'" is blocked');
//				console.log('blocked');
			}				
		};
	};
}
