yy.Delete = function (params) { return yy.extend(this, params); }
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM '+this.table.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.Delete.prototype.compile = function (db) {
//  console.log(11,this);

	var tableid = this.table.tableid;

	if(this.where) {
//		try {
//		console.log(this, 22, this.where.toJavaScript('r',''));
//	} catch(err){console.log(444,err)};
		var wherenotfn = new Function('r','return !('+this.where.toJavaScript('r','')+')');
		return function () {
			var table = db.tables[tableid];
			var orignum = table.data.length;
			table.data = table.data.filter(wherenotfn);
//			console.log('deletefn',table.data.length);
			return orignum - table.data.length;
		}
	} else {
		return function () {
			var table = db.tables[tableid];
			var orignum = db.tables[tableid].data.length;
			table.data.length = 0;
			return orignum;
		};
	}

};
