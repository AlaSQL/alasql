
yy.Insert = function (params) { return yy.extend(this, params); }
yy.Insert.prototype.toString = function() {
	var s = 'INSERT INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	s += ' VALUES ('+this.values.toString()+')';;
	return s;
}

nodes.Insert.prototype.exec = function (db) {
	var self = this;
	var table = db.tables[self.target.value];
	var rec = {};
	if(self.fields) {
		self.fields.forEach(function(f, idx){
			// TODO: type checking and conversions
			rec[f.name.value] = eval(self.insertExpression[idx].toJavaScript('',''));
//			console.log(rec[f.name.value]);
//			if(rec[f.name.value] == "NULL") rec[f.name.value] = undefined;

			if(table.xflds[f.name.value].dbtypeid == "INT") rec[f.name.value] = +rec[f.name.value]|0;
			else if(table.xflds[f.name.value].dbtypeid == "FLOAT") rec[f.name.value] = +rec[f.name.value];
		});
	} else {
//		console.log('table', table.flds);
		table.flds.forEach(function(fld, idx){
//			console.log(fld);
			// TODO: type checking and conversions
			rec[fld.fldid] = eval(self.insertExpression[idx].toJavaScript('',''));
//			console.log(rec[fld.fldid]);
//			if(rec[fld.fldid] == "NULL") rec[fld.fldid] = undefined;

			if(table.xflds[fld.fldid].dbtypeid == "INT") rec[fld.fldid] = +rec[fld.fldid]|0;
			else if(table.xflds[fld.fldid].dbtypeid == "FLOAT" || table.xflds[fld.fldid].dbtypeid == "MONEY" ) 
				rec[fld.fldid] = +rec[fld.fldid];
		});
	}
	table.recs.push(rec);
	return 1;
};



