/*
//
// INSERT for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Insert = function (params) { return yy.extend(this, params); }
yy.Insert.prototype.toString = function() {
	var s = 'INSERT INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	if(this.values) s += ' VALUES '+this.values.toString();
	if(this.select) s += ' '+this.select.toString();
	return s;
}

yy.Insert.prototype.compile = function (databaseid) {
	var self = this;
	var db = alasql.databases[databaseid];
//	console.log(self);
	var tableid = self.into.tableid;
	var table = db.tables[tableid];

	// Check, if this dirty flag is required
	var s = '';
	var sw = '';
//	var s = 'db.tables[\''+tableid+'\'].dirty=true;';

	var ss = [];


// INSERT INTO table VALUES
	if(this.values) {

//		console.log(1);
		self.values.forEach(function(values) {

//			s += 'db.tables[\''+tableid+'\'].data.push({';

//			s += '';
			if(self.columns) {
				self.columns.forEach(function(col, idx){

		//			ss.push(col.columnid +':'+ self.values[idx].value.toString());
		//			console.log(rec[f.name.value]);
		//			if(rec[f.name.value] == "NULL") rec[f.name.value] = undefined;

		//			if(table.xflds[f.name.value].dbtypeid == "INT") rec[f.name.value] = +rec[f.name.value]|0;
		//			else if(table.xflds[f.name.value].dbtypeid == "FLOAT") rec[f.name.value] = +rec[f.name.value];
					var q = "'"+col.columnid +'\':';
					// if(table.xcolumns && table.xcolumns[col.columnid] && 
					// 	( table.xcolumns[col.columnid].dbtypeid == "INT"
					// 		|| table.xcolumns[col.columnid].dbtypeid == "FLOAT"
					// 		|| table.xcolumns[col.columnid].dbtypeid == "NUMBER"
					// 		|| table.xcolumns[col.columnid].dbtypeid == "MONEY"
					// 	)) q += '+';
		//			console.log(self.values[idx].value);
					q += values[idx].toJavaScript();
					// if(table.xcolumns && table.xcolumns[col.columnid] && table.xcolumns[col.columnid].dbtypeid == "INT") q += '|0';
					ss.push(q);

				});
			} else {
				var table = db.tables[tableid];
//	console.log('table1', db, self);
//console.log(111, table.columns);
				if(table.columns.length > 0) {
					table.columns.forEach(function(col, idx){

						var q = '\''+col.columnid +'\':';
						var val = values[idx].toJavaScript();

						 if(table.xcolumns && table.xcolumns[col.columnid] && 
						  (table.xcolumns[col.columnid].dbtypeid == "DATE" ||
							table.xcolumns[col.columnid].dbtypeid == "DATETIME"
						  )) {
						 	val = "(new Date("+val+"))";
						 }
						// 		|| table.xcolumns[col.columnid].dbtypeid == "FLOAT"
						// 		|| table.xcolumns[col.columnid].dbtypeid == "NUMBER"
						// 		|| table.xcolumns[col.columnid].dbtypeid == "MONEY"
						// 	)) q += '+';
					//	console.log(self.values[idx].toString());
			//console.log(self);
						q += val;

						// if(table.xcolumns && table.xcolumns[col.columnid] && table.xcolumns[col.columnid].dbtypeid == "INT") q += '|0';
						ss.push(q);

			//			console.log(fld);
						// TODO: type checking and conversions
			//			rec[fld.fldid] = eval(self.insertExpression[idx].toJavaScript('',''));
			//			console.log(rec[fld.fldid]);
			//			if(rec[fld.fldid] == "NULL") rec[fld.fldid] = undefined;

			//			if(table.xflds[fld.fldid].dbtypeid == "INT") rec[fld.fldid] = +rec[fld.fldid]|0;
			//			else if(table.xflds[fld.fldid].dbtypeid == "FLOAT" || table.xflds[fld.fldid].dbtypeid == "MONEY" ) 
			//				rec[fld.fldid] = +rec[fld.fldid];
					});
				} else {
//					console.log(222,values);
//					sw = 'var w='+JSONtoJavaScript(values)+';for(var k in w){r[k]=w[k]};';
					sw = 'var r='+JSONtoJavaScript(values)+';';
				}
			}
//console.log(ss);

			if(db.tables[tableid].defaultfns) ss.unshift(db.tables[tableid].defaultfns);
			if(sw) {
				s += sw;
			} else {
				s += 'var r={'+ss.join(',')+'};';
			}
//			s += 'db.tables[\''+tableid+'\'].insert(r);';
            if(db.tables[tableid].insert) {
    			s += 'alasql.databases[\''+databaseid+'\'].tables[\''+tableid+'\'].insert(r);';
            } else {
                s += 'alasql.databases[\''+databaseid+'\'].tables[\''+tableid+'\'].data.push(r);';
            }

		});

		s += 'return '+self.values.length;
//console.log(s);
		var insertfn = new Function('db, params',s);
	
// INSERT INTO table SELECT

	} else if(this.select) {
		selectfn = this.select.compile(databaseid);
		var insertfn = function(db, params) {
			var res = selectfn(params);
			db.tables[tableid].data = db.tables[tableid].data.concat(res);
			return res.length;
		}
	} else if(this.default) {
        var insertfn = new Function('db,params','db.tables[\''+tableid+'\'].data.push({'+table.defaultfns+'});return 1;'); 
    } else {
    	throw new Error('Wrong INSERT parameters');
    }

	var statement = function(params, cb) {
		//console.log(databaseid);
		var db = alasql.databases[databaseid];
		var res = insertfn(db, params);
		if(cb) cb(res);
		return res;
	};

	return statement;
};

yy.Insert.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
//	throw new Error('Insert statement is should be compiled')
}



