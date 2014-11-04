
yy.Insert = function (params) { return yy.extend(this, params); }
yy.Insert.prototype.toString = function() {
	var s = 'INSERT INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	s += ' VALUES ('+this.values.toString()+')';;
	return s;
}

yy.Insert.prototype.compile = function (db) {
	var self = this;
//	console.log(self);
	var tableid = self.into.tableid;

	var s = 'alasql.tables[\''+tableid+'\'].data.push({';

	var ss = [];
	if(self.columns) {
		self.columns.forEach(function(col, idx){
			ss.push(col.columnid +':'+ self.values[idx].value.toString());
//			console.log(rec[f.name.value]);
//			if(rec[f.name.value] == "NULL") rec[f.name.value] = undefined;

//			if(table.xflds[f.name.value].dbtypeid == "INT") rec[f.name.value] = +rec[f.name.value]|0;
//			else if(table.xflds[f.name.value].dbtypeid == "FLOAT") rec[f.name.value] = +rec[f.name.value];
		});
	} else {
		var table = db.tables[tableid];
//		console.log('table', table.flds);
		table.columns.forEach(function(col, idx){
			ss.push(col.columnid +':'+ self.values[idx].value.toString());

//			console.log(fld);
			// TODO: type checking and conversions
//			rec[fld.fldid] = eval(self.insertExpression[idx].toJavaScript('',''));
//			console.log(rec[fld.fldid]);
//			if(rec[fld.fldid] == "NULL") rec[fld.fldid] = undefined;

//			if(table.xflds[fld.fldid].dbtypeid == "INT") rec[fld.fldid] = +rec[fld.fldid]|0;
//			else if(table.xflds[fld.fldid].dbtypeid == "FLOAT" || table.xflds[fld.fldid].dbtypeid == "MONEY" ) 
//				rec[fld.fldid] = +rec[fld.fldid];
		});
	}


	s += ss.join(',')+'});return 1;';
	return new Function(s);
};



