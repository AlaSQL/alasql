/*
//
// INSERT for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy alasql*/
yy.Insert = function (params) {
	return yy.extend(this, params);
};
yy.Insert.prototype.toString = function () {
	var s = 'INSERT ';
	if (this.orreplace) s += 'OR REPLACE ';
	if (this.replaceonly) s = 'REPLACE ';
	s += 'INTO ' + this.into.toString();
	if (this.columns) s += '(' + this.columns.toString() + ')';
	if (this.values) {
		var values = this.values.map(function (value) {
			return '(' + value.toString() + ')';
		});
		s += ' VALUES ' + values.join(',');
	}
	if (this.select) s += ' ' + this.select.toString();
	return s;
};

yy.Insert.prototype.toJS = function (context, tableid, defcols) {
	//	console.log('Expression',this);
	//	if(this.expression.reduced) return 'true';
	//	return this.expression.toJS(context, tableid, defcols);
	//  console.log('Select.toJS', 81, this.queriesidx);
	//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s = 'this.queriesfn[' + (this.queriesidx - 1) + '](this.params,null,' + context + ')';
	//	s = '(console.log(this.queriesfn[0]),'+s+')';
	//	console.log(this,s);

	return s;
};

yy.Insert.prototype.compile = function (databaseid) {
	var self = this;
	databaseid = self.into.databaseid || databaseid;
	var db = alasql.databases[databaseid];
	//	console.log(self);
	var tableid = self.into.tableid;
	var table = db.tables[tableid];

	if (!table) {
		throw "Table '" + tableid + "' could not be found";
	}

	// Check, if this dirty flag is required
	var s = '';
	var sw = '';
	var s = "db.tables['" + tableid + "'].dirty=true;";
	var s3 = 'var a,aa=[],x;';

	var s33;

	// INSERT INTO table VALUES
	if (this.values) {
		if (this.exists) {
			this.existsfn = this.exists.map(function (ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}
		if (this.queries) {
			this.queriesfn = this.queries.map(function (q) {
				var nq = q.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}

		//		console.log(1);
		self.values.forEach(function (values) {
			var ss = [];

			//			s += 'db.tables[\''+tableid+'\'].data.push({';

			//			s += '';
			if (self.columns) {
				self.columns.forEach(function (col, idx) {
					//console.log(db.tables, tableid, table);
					//			ss.push(col.columnid +':'+ self.values[idx].value.toString());
					//			console.log(rec[f.name.value]);
					//			if(rec[f.name.value] == "NULL") rec[f.name.value] = undefined;

					//			if(table.xflds[f.name.value].dbtypeid == "INT") rec[f.name.value] = +rec[f.name.value]|0;
					//			else if(table.xflds[f.name.value].dbtypeid == "FLOAT") rec[f.name.value] = +rec[f.name.value];
					var q = "'" + col.columnid + "':";
					if (table.xcolumns && table.xcolumns[col.columnid]) {
						if (
							['INT', 'FLOAT', 'NUMBER', 'MONEY'].indexOf(table.xcolumns[col.columnid].dbtypeid) >=
							0
						) {
							//q += ''
							q += '(x=' + values[idx].toJS() + ',x==undefined?undefined:+x)';
						} else if (alasql.fn[table.xcolumns[col.columnid].dbtypeid]) {
							q += '(new ' + table.xcolumns[col.columnid].dbtypeid + '(';
							q += values[idx].toJS();
							q += '))';
						} else {
							q += values[idx].toJS();
						}
					} else {
						q += values[idx].toJS();
					}
					ss.push(q);
				});
			} else {
				//				var table = db.tables[tableid];
				//	console.log('table1', db, self);
				//console.log(111, table.columns);
				//console.log(74,table);
				if (Array.isArray(values) && table.columns && table.columns.length > 0) {
					table.columns.forEach(function (col, idx) {
						var q = "'" + col.columnid + "':";
						//						var val = values[idx].toJS();

						if (['INT', 'FLOAT', 'NUMBER', 'MONEY'].indexOf(col.dbtypeid) >= 0) {
							q += '+' + values[idx].toJS();
						} else if (alasql.fn[col.dbtypeid]) {
							q += '(new ' + col.dbtypeid + '(';
							q += values[idx].toJS();
							q += '))';
						} else {
							q += values[idx].toJS();
						}
						/*/*
						 // if(table.xcolumns && table.xcolumns[col.columnid] &&
						 //  (table.xcolumns[col.columnid].dbtypeid == "DATE" ||
							// table.xcolumns[col.columnid].dbtypeid == "DATETIME"
						 //  )) {
						 // 	val = "(new Date("+val+"))";
						 // }
						// 		|| table.xcolumns[col.columnid].dbtypeid == "FLOAT"
						// 		|| table.xcolumns[col.columnid].dbtypeid == "NUMBER"
						// 		|| table.xcolumns[col.columnid].dbtypeid == "MONEY"
						// 	)) q += '+';
					//	console.log(self.values[idx].toString());
			//console.log(self);
//						q += val;

						// if(table.xcolumns && table.xcolumns[col.columnid] && table.xcolumns[col.columnid].dbtypeid == "INT") q += '|0';
*/

						ss.push(q);
						/*/*
			//			console.log(fld);
						// TODO: type checking and conversions
			//			rec[fld.fldid] = eval(self.insertExpression[idx].toJS('',''));
			//			console.log(rec[fld.fldid]);
			//			if(rec[fld.fldid] == "NULL") rec[fld.fldid] = undefined;

			//			if(table.xflds[fld.fldid].dbtypeid == "INT") rec[fld.fldid] = +rec[fld.fldid]|0;
			//			else if(table.xflds[fld.fldid].dbtypeid == "FLOAT" || table.xflds[fld.fldid].dbtypeid == "MONEY" )
			//				rec[fld.fldid] = +rec[fld.fldid];
*/
					});
				} else {
					//					console.log(222,values);
					//					sw = 'var w='+JSONtoJS(values)+';for(var k in w){r[k]=w[k]};';
					sw = JSONtoJS(values);
				}
			}
			//console.log(ss);

			if (db.tables[tableid].defaultfns) {
				ss.unshift(db.tables[tableid].defaultfns);
			}
			if (sw) {
				s += 'a=' + sw + ';';
			} else {
				s += 'a={' + ss.join(',') + '};';
			}

			// If this is a class
			if (db.tables[tableid].isclass) {
				s += "var db=alasql.databases['" + databaseid + "'];";
				s += 'a.$class="' + tableid + '";';
				s += 'a.$id=db.counter++;';
				s += 'db.objects[a.$id]=a;';
			}
			//			s += 'db.tables[\''+tableid+'\'].insert(r);';
			if (db.tables[tableid].insert) {
				s += "var db=alasql.databases['" + databaseid + "'];";
				s += "db.tables['" + tableid + "'].insert(a," + (self.orreplace ? 'true' : 'false') + ');';
			} else {
				s += 'aa.push(a);';
			}
		});

		s33 = s3 + s;

		if (db.tables[tableid].insert) {
			//			s += 'alasql.databases[\''+databaseid+'\'].tables[\''+tableid+'\'].insert(r);';
		} else {
			s +=
				"alasql.databases['" +
				databaseid +
				"'].tables['" +
				tableid +
				"'].data=" +
				"alasql.databases['" +
				databaseid +
				"'].tables['" +
				tableid +
				"'].data.concat(aa);";
		}

		if (db.tables[tableid].insert) {
			if (db.tables[tableid].isclass) {
				s += 'return a.$id;';
			} else {
				s += 'return ' + self.values.length;
			}
		} else {
			s += 'return ' + self.values.length;
		}

		//console.log(186,s3+s);
		var insertfn = new Function('db, params, alasql', 'var y;' + s3 + s).bind(this);

		// INSERT INTO table SELECT
	} else if (this.select) {
		this.select.modifier = 'RECORDSET';
		var selectfn = this.select.compile(databaseid);
		if (db.engineid && alasql.engines[db.engineid].intoTable) {
			var statement = function (params, cb) {
				var aa = selectfn(params);
				var res = alasql.engines[db.engineid].intoTable(db.databaseid, tableid, aa.data, null, cb);
				return res;
			};
			return statement;
		} else {
			//			console.log(224,table.defaultfns);
			var defaultfns = 'return alasql.utils.extend(r,{' + table.defaultfns + '})';
			var defaultfn = new Function('r,db,params,alasql', defaultfns);
			var insertfn = function (db, params, alasql) {
				var res = selectfn(params).data;
				if (db.tables[tableid].insert) {
					// If insert() function exists (issue #92)
					for (var i = 0, ilen = res.length; i < ilen; i++) {
						var r = cloneDeep(res[i]);
						defaultfn(r, db, params, alasql);
						db.tables[tableid].insert(r, self.orreplace);
					}
				} else {
					db.tables[tableid].data = db.tables[tableid].data.concat(res);
				}
				if (alasql.options.nocount) return;
				else return res.length;
			};
		}
	} else if (this.default) {
		var insertfns = "db.tables['" + tableid + "'].data.push({" + table.defaultfns + '});return 1;';
		var insertfn = new Function('db,params,alasql', insertfns);
	} else {
		throw new Error('Wrong INSERT parameters');
	}

	//    console.log(1,s);
	//    	console.log(s33);

	if (db.engineid && alasql.engines[db.engineid].intoTable && alasql.options.autocommit) {
		var statement = function (params, cb) {
			var aa = new Function('db,params', 'var y;' + s33 + 'return aa;')(db, params);
			//			console.log(s33);
			var res = alasql.engines[db.engineid].intoTable(db.databaseid, tableid, aa, null, cb);
			//			if(cb) cb(res);
			return res;
		};
	} else {
		var statement = function (params, cb) {
			//console.log(databaseid);
			var db = alasql.databases[databaseid];

			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].loadTableData(databaseid, tableid);
			}

			var res = insertfn(db, params, alasql);

			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].saveTableData(databaseid, tableid);
			}
			//		var res = insertfn(db, params);
			if (alasql.options.nocount) res = undefined;
			if (cb) cb(res);
			return res;
		};
	}

	return statement;
};

yy.Insert.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
	//	throw new Error('Insert statement is should be compiled')
};
