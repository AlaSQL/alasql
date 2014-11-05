yy.Update = function (params) { return yy.extend(this, params); }
yy.Update.prototype.toString = function() {
	var s = 'UPDATE '+this.table.toString();
	if(this.columns) s += ' SET '+this.columns.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}


yy.SetColumn = function (params) { return yy.extend(this, params); }
yy.SetColumn.prototype.toString = function() {
	return this.columnid.toString() + '='+this.expression.toString();
}

yy.Update.prototype.compile = function (db) {
//	console.log(this);

	var tableid = this.table.tableid;
	
	if(this.where) {
		var wherefn = new Function('r,params','return '+this.where.toJavaScript('r',''));
	};

	// Construct update function
	var s = '';
	this.columns.forEach(function(col){
		s += 'r.'+col.columnid+'='+col.expression.toJavaScript('r','')+';'; 
	});
	var assignfn = new Function('r,params',s);

	return function(params, cb) {
		var table = db.tables[tableid];
		var numrows = 0;
		for(var i=0, ilen=table.data.length; i<ilen; i++) {
			if(!wherefn || wherefn(table.data[i], params) ) {
				assignfn(table.data[i],params);
				numrows++;
			}
		};
		if(cb) cb(numrows);
		return numrows;
	};
};




