/*
//
// DELETE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Delete = function (params) { return yy.extend(this, params); }
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM '+this.table.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.Delete.prototype.compile = function (databaseid) {
//  console.log(11,this);

	var tableid = this.table.tableid;
	var statement;
			var db = alasql.databases[databaseid];

	if(this.where) {
//		try {
//		console.log(this, 22, this.where.toJavaScript('r',''));
//	} catch(err){console.log(444,err)};
		var wherefn = new Function('r,params','return ('+this.where.toJavaScript('r','')+')');
//		console.log(wherefn);
		statement = function (params, cb) {
			var table = db.tables[tableid];
//			table.dirty = true;
			var orignum = table.data.length;

			var newtable = [];			
			for(var i=0, ilen=table.data.length;i<ilen;i++) {
				if(wherefn(table.data[i],params)) {
					// Check for transaction - if it is not possible then return all back
					if(table.delete) {
						table.delete(i);
					} else {
						// SImply do not push
					}
				} else newtable.push(table.data[i]);
			}
//			table.data = table.data.filter(function(r){return !;});
			table.data = newtable;
//			console.log('deletefn',table.data.length);
			if(cb) cb(orignum - table.data.length);
			return orignum - table.data.length;
		}
	} else {
		statement = function (params, cb) {
			var table = db.tables[tableid];
			table.dirty = true;
			var orignum = db.tables[tableid].data.length;

			table.deleteall();

			if(cb) cb(orignum);
			return orignum;
		};
	};

	return statement;

};

yy.Delete.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
}
