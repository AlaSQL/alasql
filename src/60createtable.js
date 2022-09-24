/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global alasql, yy, hash */

yy.ColumnDef = function (params) {
	return yy.extend(this, params);
};
yy.ColumnDef.prototype.toString = function () {
	var s = this.columnid;
	if (this.dbtypeid) {
		s += ' ' + this.dbtypeid;
	}

	if (this.dbsize) {
		s += '(' + this.dbsize;
		if (this.dbprecision) {
			s += ',' + this.dbprecision;
		}
		s += ')';
	}

	if (this.primarykey) {
		s += ' PRIMARY KEY';
	}

	if (this.notnull) {
		s += ' NOT NULL';
	}

	return s;
};

yy.CreateTable = function (params) {
	return yy.extend(this, params);
};
yy.CreateTable.prototype.toString = function () {
	var s = 'CREATE';
	if (this.temporary) {
		s += ' TEMPORARY';
	}

	if (this.view) {
		s += ' VIEW';
	} else {
		s += ' ' + (this.class ? 'CLASS' : 'TABLE');
	}
	if (this.ifnotexists) {
		s += ' IF  NOT EXISTS';
	}
	s += ' ' + this.table.toString();
	if (this.viewcolumns) {
		s +=
			'(' +
			this.viewcolumns
				.map(function (vcol) {
					return vcol.toString();
				})
				.join(',') +
			')';
	}
	if (this.as) {
		s += ' AS ' + this.as;
	} else {
		var ss = this.columns.map(function (col) {
			return col.toString();
		});
		s += ' (' + ss.join(',') + ')';
	}

	if (this.view && this.select) {
		s += ' AS ' + this.select.toString();
	}

	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.CreateTable.prototype.execute = function (databaseid, params, cb) {
	//	var self = this;
	var db = alasql.databases[this.table.databaseid || databaseid];

	var tableid = this.table.tableid;
	if (!tableid) {
		throw new Error('Table name is not defined');
	}

	//	var ifnotexists = this.ifnotexists;
	var columns = this.columns;
	// if(false) {
	// 	if(!columns) {
	// 		throw new Error('Columns are not defined');
	// 	}
	// }
	var constraints = this.constraints || [];
	//	console.log(this);

	// IF NOT EXISTS
	if (this.ifnotexists && db.tables[tableid]) {
		return cb ? cb(0) : 0;
	}

	if (db.tables[tableid]) {
		throw new Error(
			"Can not create table '" +
				tableid +
				"', because it already exists in the database '" +
				db.databaseid +
				"'"
		);
	}

	var table = (db.tables[tableid] = new alasql.Table()); // TODO Can use special object?
	// If this is a class
	if (this.class) {
		table.isclass = true;
	}

	var ss = []; // DEFAULT function components
	var uss = []; // ON UPDATE function components
	if (columns) {
		columns.forEach(function (col) {
			var dbtypeid = col.dbtypeid;
			if (!alasql.fn[dbtypeid]) {
				dbtypeid = dbtypeid.toUpperCase();
			}

			// Process SERIAL data type like Postgress
			if (['SERIAL', 'SMALLSERIAL', 'BIGSERIAL'].indexOf(dbtypeid) > -1) {
				col.identity = {value: 1, step: 1};
			}

			var newcol = {
				columnid: col.columnid,
				dbtypeid: dbtypeid,
				dbsize: col.dbsize, // Fixed issue #150
				dbprecision: col.dbprecision, // Fixed issue #150
				notnull: col.notnull,
				identity: col.identity,
			};
			if (col.identity) {
				table.identities[col.columnid] = {
					value: +col.identity.value,
					step: +col.identity.step,
				};
				//				ss.push('\''+col.columnid+'\':(alasql.databases[\''+db.databaseid+'\'].tables[\''
				//					+tableid+'\'].identities[\''+col.columnid+'\'].value)');
			}
			if (col.check) {
				table.checks.push({
					id: col.check.constrantid,
					fn: new Function('r', 'var y;return ' + col.check.expression.toJS('r', '')),
				});
			}

			if (col.default) {
				ss.push("'" + col.columnid + "':" + col.default.toJS('r', ''));
			}

			// Check for primary key
			if (col.primarykey) {
				var pk = (table.pk = {});
				pk.columns = [col.columnid];
				pk.onrightfns = "r['" + col.columnid + "']";
				pk.onrightfn = new Function('r', 'var y;return ' + pk.onrightfns);
				pk.hh = hash(pk.onrightfns);
				table.uniqs[pk.hh] = {};
			}

			// UNIQUE clause
			if (col.unique) {
				var uk = {};
				table.uk = table.uk || [];
				table.uk.push(uk);
				uk.columns = [col.columnid];
				uk.onrightfns = "r['" + col.columnid + "']";
				uk.onrightfn = new Function('r', 'var y;return ' + uk.onrightfns);
				uk.hh = hash(uk.onrightfns);
				table.uniqs[uk.hh] = {};
			}

			// UNIQUE clause
			if (col.foreignkey) {
				//				console.log(138,col.foreignkey);
				var fk = col.foreignkey.table;
				var fktable = alasql.databases[fk.databaseid || databaseid].tables[fk.tableid];
				if (typeof fk.columnid === 'undefined') {
					if (fktable.pk.columns && fktable.pk.columns.length > 0) {
						fk.columnid = fktable.pk.columns[0];
					} else {
						throw new Error('FOREIGN KEY allowed only to tables with PRIMARY KEYs');
					}
				}
				//					console.log(fktable.pk);
				var fkfn = function (r) {
					var rr = {};
					if (typeof r[col.columnid] === 'undefined') {
						return true;
					}
					rr[fk.columnid] = r[col.columnid];
					var addr = fktable.pk.onrightfn(rr);
					//						console.log(r, rr, addr);
					//						console.log(fktable.uniqs[fktable.pk.hh][addr]);
					if (!fktable.uniqs[fktable.pk.hh][addr]) {
						throw new Error(
							// 							'Foreign key "' +
							// 								r[col.columnid] +
							// 								'" is not found in table ' +
							// 								fktable.tableid
							'Foreign key violation' //changed error message
						);
					}
					return true;
				};
				table.checks.push({fn: fkfn});
				/*/*				var uk = {};
				if(typeof table.uk == 'undefined') table.uk = [];
				table.uk.push(uk);
				uk.columns = [col.columnid];
				uk.onrightfns = 'r[\''+col.columnid+'\']';
				uk.onrightfn = new Function("r",'return '+uk.onrightfns);
				uk.hh = hash(uk.onrightfns);
				table.uniqs[uk.hh] = {};
*/
			}

			if (col.onupdate) {
				uss.push("r['" + col.columnid + "']=" + col.onupdate.toJS('r', ''));
			}

			table.columns.push(newcol);
			table.xcolumns[newcol.columnid] = newcol;
		});
	}
	table.defaultfns = ss.join(',');
	table.onupdatefns = uss.join(';');

	//	if(constraints) {
	constraints.forEach(function (con) {
		//console.log(con, con.columns);
		var checkfn;

		if (con.type === 'PRIMARY KEY') {
			if (table.pk) {
				throw new Error('Primary key already exists');
			}
			var pk = (table.pk = {});
			pk.columns = con.columns;
			pk.onrightfns = pk.columns
				.map(function (columnid) {
					return "r['" + columnid + "']";
				})
				.join("+'`'+");
			pk.onrightfn = new Function('r', 'var y;return ' + pk.onrightfns);
			pk.hh = hash(pk.onrightfns);
			table.uniqs[pk.hh] = {};
		} else if (con.type === 'CHECK') {
			//			console.log(con.expression.toJS('r',''));
			checkfn = new Function('r', 'var y;return ' + con.expression.toJS('r', ''));
		} else if (con.type === 'UNIQUE') {
			//			console.log(con);
			var uk = {};
			table.uk = table.uk || [];
			table.uk.push(uk);
			uk.columns = con.columns;
			uk.onrightfns = uk.columns
				.map(function (columnid) {
					return "r['" + columnid + "']";
				})
				.join("+'`'+");
			uk.onrightfn = new Function('r', 'var y;return ' + uk.onrightfns);
			uk.hh = hash(uk.onrightfns);
			table.uniqs[uk.hh] = {};
		} else if (con.type === 'FOREIGN KEY') {
			var fk = con.fktable;
			if (con.fkcolumns && con.fkcolumns.length > 0) {
				//Composite foreign keys
				fk.fkcolumns = con.fkcolumns;
			}
			var fktable = alasql.databases[fk.databaseid || databaseid].tables[fk.tableid];
			if (typeof fk.fkcolumns === 'undefined') {
				//Composite foreign keys
				fk.fkcolumns = fktable.pk.columns;
			}
			fk.columns = con.columns;

			if (fk.fkcolumns.length > fk.columns.length) {
				throw new Error('Invalid foreign key on table ' + table.tableid);
			}

			checkfn = function (r) {
				var rr = {};

				//Composite foreign keys
				fk.fkcolumns.forEach(function (colFk, i) {
					if (r[fk.columns[i]] != null) {
						rr[colFk] = r[fk.columns[i]];
					}
				});

				if (Object.keys(rr).length === 0) {
					//all values of foreign key was null
					return true;
				}
				if (Object.keys(rr).length !== fk.columns.length) {
					throw new Error('Invalid foreign key on table ' + table.tableid);
				}
				//reset fkTable as we need an up to date uniqs
				var fktable = alasql.databases[fk.databaseid || databaseid].tables[fk.tableid];
				var addr = fktable.pk.onrightfn(rr);

				if (!fktable.uniqs[fktable.pk.hh][addr]) {
					throw new Error(
						'Foreign key violation' //changed error message
					);
				}
				return true;
			};
		}
		if (checkfn) {
			table.checks.push({fn: checkfn, id: con.constraintid, fk: con.type === 'FOREIGN KEY'});
		}
	});

	if (this.view && this.viewcolumns) {
		var self = this;
		this.viewcolumns.forEach(function (vcol, idx) {
			self.select.columns[idx].as = vcol.columnid;
		});
	}

	//Used in 420from queryfn when table.view = true!
	if (this.view && this.select) {
		table.view = true;
		//	console.log(this.select.toString());
		//	console.log('this.table.databaseid',this.table.databaseid);
		//	console.log(this.select.compile(this.table.databaseid||databaseid));
		table.select = this.select.compile(this.table.databaseid || databaseid);
	}

	if (db.engineid) {
		//		console.log(101,db.engineid);
		return alasql.engines[db.engineid].createTable(
			this.table.databaseid || databaseid,
			tableid,
			this.ifnotexists,
			cb
		);
		//		console.log('createtable',res1);
		//		return res1;
	}

	//	}
	//			if(table.pk) {

	table.insert = function (r, orreplace) {
		var oldinserted = alasql.inserted;
		alasql.inserted = [r];

		var table = this;

		var toreplace = false; // For INSERT OR REPLACE

		/*
		// IDENTINY or AUTO_INCREMENT
		// if(table.identities && table.identities.length>0) {
		// 	table.identities.forEach(function(ident){
		// 		r[ident.columnid] = ident.value;
		// 	});
		// }
*/
		// Trigger prevent functionality
		var prevent = false;
		for (var tr in table.beforeinsert) {
			var trigger = table.beforeinsert[tr];
			if (trigger) {
				if (trigger.funcid) {
					if (alasql.fn[trigger.funcid](r) === false) prevent = prevent || true;
				} else if (trigger.statement) {
					if (trigger.statement.execute(databaseid) === false) prevent = prevent || true;
				}
			}
		}
		if (prevent) return;

		// Trigger prevent functionality
		var escape = false;
		for (tr in table.insteadofinsert) {
			escape = true;
			trigger = table.insteadofinsert[tr];
			if (trigger) {
				if (trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if (trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		}
		if (escape) return;

		//console.log(262,r);
		//console.log(263,table.identities)
		for (var columnid in table.identities) {
			var ident = table.identities[columnid];
			//			console.log(ident);
			r[columnid] = ident.value;
			//			console.log(ident);
		}
		//console.log(270,r);

		if (table.checks && table.checks.length > 0) {
			table.checks.forEach(function (check) {
				if (!check.fn(r)) {
					//					if(orreplace) toreplace=true; else
					throw new Error('Violation of CHECK constraint ' + (check.id || ''));
				}
			});
		}

		table.columns.forEach(function (column) {
			if (column.notnull && typeof r[column.columnid] === 'undefined') {
				throw new Error('Wrong NULL value in NOT NULL column ' + column.columnid);
			}
		});
		if (table.pk) {
			var pk = table.pk;
			var addr = pk.onrightfn(r);

			if (typeof table.uniqs[pk.hh][addr] !== 'undefined') {
				//console.log(pk,addr,pk.onrightfn({ono:1}));
				//console.log(r, pk.onrightfn(r), pk.onrightfns);
				if (orreplace) toreplace = table.uniqs[pk.hh][addr];
				else
					throw new Error('Cannot insert record, because it already exists in primary key index');
			}
			//			table.uniqs[pk.hh][addr]=r;
		}

		if (table.uk && table.uk.length) {
			table.uk.forEach(function (uk) {
				var ukaddr = uk.onrightfn(r);
				if (typeof table.uniqs[uk.hh][ukaddr] !== 'undefined') {
					if (orreplace) toreplace = table.uniqs[uk.hh][ukaddr];
					else throw new Error('Cannot insert record, because it already exists in unique index');
				}
				//				table.uniqs[uk.hh][ukaddr]=r;
			});
		}

		if (toreplace) {
			// Do UPDATE!!!
			//			console.log();
			table.update(
				function (t) {
					for (var f in r) t[f] = r[f];
				},
				table.data.indexOf(toreplace),
				params
			);
		} else {
			table.data.push(r);

			// Final change before insert

			// Update indices

			for (var columnid in table.identities) {
				var ident = table.identities[columnid];
				//			console.log(ident);
				ident.value += ident.step;
				//			console.log(ident);
			}

			if (table.pk) {
				var pk = table.pk;
				var addr = pk.onrightfn(r);
				table.uniqs[pk.hh][addr] = r;
			}
			if (table.uk && table.uk.length) {
				table.uk.forEach(function (uk) {
					var ukaddr = uk.onrightfn(r);
					table.uniqs[uk.hh][ukaddr] = r;
				});
			}
		}

		// Trigger prevent functionality
		for (var tr in table.afterinsert) {
			var trigger = table.afterinsert[tr];
			if (trigger) {
				if (trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if (trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		}
		alasql.inserted = oldinserted;
	};

	table.delete = function (index) {
		var table = this;
		var r = table.data[index];

		// Prevent trigger
		var prevent = false;
		for (var tr in table.beforedelete) {
			var trigger = table.beforedelete[tr];
			if (trigger) {
				if (trigger.funcid) {
					if (alasql.fn[trigger.funcid](r) === false) prevent = prevent || true;
				} else if (trigger.statement) {
					if (trigger.statement.execute(databaseid) === false) prevent = prevent || true;
				}
			}
		}
		if (prevent) return false;

		// Trigger prevent functionality
		var escape = false;
		for (var tr in table.insteadofdelete) {
			escape = true;
			var trigger = table.insteadofdelete[tr];
			if (trigger) {
				if (trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if (trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		}
		if (escape) return;

		if (this.pk) {
			var pk = this.pk;
			var addr = pk.onrightfn(r);
			if (typeof this.uniqs[pk.hh][addr] === 'undefined') {
				throw new Error('Something wrong with primary key index on table');
			} else {
				this.uniqs[pk.hh][addr] = undefined;
			}
		}
		if (table.uk && table.uk.length) {
			table.uk.forEach(function (uk) {
				var ukaddr = uk.onrightfn(r);
				if (typeof table.uniqs[uk.hh][ukaddr] === 'undefined') {
					throw new Error('Something wrong with unique index on table');
				}
				table.uniqs[uk.hh][ukaddr] = undefined;
			});
		}
	};

	table.deleteall = function () {
		this.data.length = 0;
		if (this.pk) {
			//						var r = this.data[i];
			this.uniqs[this.pk.hh] = {};
		}
		if (table.uk && table.uk.length) {
			table.uk.forEach(function (uk) {
				table.uniqs[uk.hh] = {};
			});
		}
	};

	table.update = function (assignfn, i, params) {
		// TODO: Analyze the speed
		var r = cloneDeep(this.data[i]);

		var pk;
		// PART 1 - PRECHECK
		if (this.pk) {
			pk = this.pk;
			pk.pkaddr = pk.onrightfn(r, params);
			if (typeof this.uniqs[pk.hh][pk.pkaddr] === 'undefined') {
				throw new Error('Something wrong with index on table');
			}
		}
		if (table.uk && table.uk.length) {
			table.uk.forEach(function (uk) {
				uk.ukaddr = uk.onrightfn(r);
				if (typeof table.uniqs[uk.hh][uk.ukaddr] === 'undefined') {
					throw new Error('Something wrong with unique index on table');
				}
			});
		}

		assignfn(r, params, alasql);

		// Prevent trigger
		var prevent = false;
		for (var tr in table.beforeupdate) {
			var trigger = table.beforeupdate[tr];
			if (trigger) {
				if (trigger.funcid) {
					if (alasql.fn[trigger.funcid](this.data[i], r) === false) prevent = prevent || true;
				} else if (trigger.statement) {
					if (trigger.statement.execute(databaseid) === false) prevent = prevent || true;
				}
			}
		}
		if (prevent) return false;

		// Trigger prevent functionality
		var escape = false;
		for (var tr in table.insteadofupdate) {
			escape = true;
			var trigger = table.insteadofupdate[tr];
			if (trigger) {
				if (trigger.funcid) {
					alasql.fn[trigger.funcid](this.data[i], r);
				} else if (trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		}
		if (escape) return;

		// PART 2 - POST CHECK
		if (table.checks && table.checks.length > 0) {
			table.checks.forEach(function (check) {
				if (!check.fn(r)) {
					throw new Error('Violation of CHECK constraint ' + (check.id || ''));
				}
			});
		}

		table.columns.forEach(function (column) {
			if (column.notnull && typeof r[column.columnid] === 'undefined') {
				throw new Error('Wrong NULL value in NOT NULL column ' + column.columnid);
			}
		});
		if (this.pk) {
			pk.newpkaddr = pk.onrightfn(r);
			if (typeof this.uniqs[pk.hh][pk.newpkaddr] !== 'undefined' && pk.newpkaddr !== pk.pkaddr) {
				throw new Error('Record already exists');
			}
		}

		if (table.uk && table.uk.length) {
			table.uk.forEach(function (uk) {
				uk.newukaddr = uk.onrightfn(r);
				if (typeof table.uniqs[uk.hh][uk.newukaddr] !== 'undefined' && uk.newukaddr !== uk.ukaddr) {
					throw new Error('Record already exists');
				}
			});
		}

		// PART 3 UPDATE
		if (this.pk) {
			this.uniqs[pk.hh][pk.pkaddr] = undefined;
			this.uniqs[pk.hh][pk.newpkaddr] = r;
		}
		if (table.uk && table.uk.length) {
			table.uk.forEach(function (uk) {
				table.uniqs[uk.hh][uk.ukaddr] = undefined;
				table.uniqs[uk.hh][uk.newukaddr] = r;
			});
		}

		this.data[i] = r;

		// Trigger prevent functionality
		for (var tr in table.afterupdate) {
			var trigger = table.afterupdate[tr];
			if (trigger) {
				if (trigger.funcid) {
					alasql.fn[trigger.funcid](this.data[i], r);
				} else if (trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		}
	};

	//	console.log(databaseid);
	//	console.log(db.databaseid,db.tables);
	//	console.log(table);

	var res;

	if (!alasql.options.nocount) {
		res = 1;
	}

	if (cb) res = cb(res);
	return res;
};
