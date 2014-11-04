yy.Delete = function (params) { return yy.extend(this, params); }
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM '+this.table.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.Delete.prototype.compile = function (db) {
	var table = db.tables[this.target.value];
	var orignum = table.recs.length;

	if(this.deleteCondition) {
		var wherenotfn = new Function('rec','return !('+this.deleteCondition.toJavaScript('rec','')+')');
//		console.log(this.deleteCondition.toJavaScript('rec',''));
		table.recs = table.recs.filter(wherenotfn);
	} else {
		table.recs.length = 0;		
	}

	return orignum - table.recs.length;
};
