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
	var table =  db.tables[this.target.value];
	
	if(this.where) {
		var wherefn = new Function('rec','return '+this.updateCondition.toJavaScript('rec',''));
	};

	// Construct update function
	var s = '';
	this.assignList.forEach(function(al){
		s += 'rec.'+al.left.value+'='+al.right.toJavaScript('rec','')+';'; 
	});
	var assignfn = new Function('rec',s);

	var numrows = 0;
	for(var i=0, ilen=table.recs.length; i<ilen; i++) {
		if(!wherefn || wherefn(table.recs[i]) ) {
			assignfn(table.recs[i]);
			numrows++;
		}
	}

	return numrows;
};




