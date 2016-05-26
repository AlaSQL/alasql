/*
//
// ALTER TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// ALTER TABLE table1 RENAME TO table2
yy.AlterTable = function (params) { return yy.extend(this, params); }
yy.AlterTable.prototype.toString = function() {
	var s = 'ALTER TABLE '+ this.table.toString();
	function wrapCol(col) { return '`'+col+'`'; }
	function wrapCols(cols) {
		return cols.map(wrapCol).join(', ');
	}
	if (this.renameto) {
		s += ' RENAME TO '+wrapCol(this.renameto);
	} else if (this.addcolumn) {
		s += ' ADD COLUMN '+wrapCol(this.addcolumn.columnid);
	} else if (this.foreignkey) {
		if (this.constraintid) s += ' CONSTRAINT '+wrapCol(this.constraintid);
		s += ' FOREIGN KEY ('+
			wrapCols(this.foreignkey.columns)+
			') REFERENCES '+
			this.foreignkey.fktable.toString()+
			' ('+
			wrapCols(this.foreignkey.fkcolumns)+
			')';
	} else if (this.constraint && this.action === 'DROP') {
		s += ' DROP '+this.constraint.type+
			' `'+this.constraint.id+'`';
	} else if (this.modifycolumn) {
		s += ' MODIFY COLUMN '+this.modifycolumn.toString();
	} else if (this.renamecolumn) {
		s += ' RENAME COLUMN '+wrapCol(this.renamecolumn)+' TO '+wrapCol(this.to);
	} else if (this.drop) {
		switch(this.drop.type) {
			case 'PRIMARY KEY':
				// TODO
				break;
			case 'COLUMN':
			case undefined:
			case 'INDEX':
			case 'KEY':
			case 'FOREIGN KEY':
			case 'CONSTRAINT':
				s += ' '+(this.drop.type||'')+' '+wrapCol(this.drop.id);
				break;
		}
	}
	return s;
}

yy.AlterTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[databaseid];
	db.dbversion = Date.now();

	if(this.renameto) {
		var oldtableid = this.table.tableid;
		var newtableid = this.renameto;
			var res = 1;
			if(db.tables[newtableid]) {
				throw new Error("Can not rename a table '"+oldtableid+"' to '"
					+newtableid+"', because the table with this name already exists");
			} else if(newtableid == oldtableid) {
				throw new Error("Can not rename a table '"+oldtableid+"' to itself");
			} else {
				db.tables[newtableid] = db.tables[oldtableid];
				delete db.tables[oldtableid];
				res = 1;
			};
			if(cb) cb(res)
			return res;
	}

	databaseid = (this.table && this.table.databaseid) || databaseid;
	db = alasql.databases[databaseid];
	if (this.table && !db.tables[this.table.tableid]) {
		throw new Error('Table "'+this.table.tableid+'" does not exist in schema "'+databaseid+'"');
	}

	if(this.addcolumn) {
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.addcolumn.columnid;
		if(table.xcolumns[columnid]) {
			throw new Error('Cannot add column "'+columnid+'", because it already exists in the table "'+tableid+'"');
		}
		db.dbversion++;

		var col = {
			columnid:columnid,
			dbtypeid:this.dbtypeid,
			dbsize:this.dbsize,
			dbprecision:this.dbprecision,
			dbenum:this.dbenum,
			defaultfns: null // TODO defaultfns!!!
		};

		var defaultfn = function(){};

		table.columns.push(col);
		table.xcolumns[columnid] = col;

		for(var i=0, ilen=table.data.length; i<ilen; i++) {
//				console.log(table.data[i][columnid]);
			table.data[i][columnid] = defaultfn();
		}

		// TODO
		return cb?cb(1):1;
	} else if (this.foreignkey) {
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var primcolumn = this.foreignkey.columns[0];
		var col = table.xcolumns[primcolumn];

		var fk = this.foreignkey.fktable;
		var fktable = alasql.databases[fk.databaseid||databaseid].tables[fk.tableid];
		var constraintid = this.constraintid || ['fk', fk.tableid, primcolumn].join('_');
		if(typeof fk.columnid === 'undefined') {
			if(fktable.pk.columns && fktable.pk.columns.length >0 ){
				fk.columnid = fktable.pk.columns[0];
			} else {
				throw new Error('FOREIGN KEY allowed only to tables with PRIMARY KEYs');
			}
		}
		if(table.checkfn.some(function (fn) {
			return (fn.constraintid && fn.constraintid === constraintid);
		})) {
			throw new Error('CONSTRAINT `'+constraintid+'` already exists on table `'+databaseid+'`.`'+tableid+'`');
		}
		db.dbversion++;
		var fkfn = function(r) {
			var rr = {};
			if(typeof r[col.columnid] === 'undefined'){
				return true;
			}
			rr[fk.columnid] = r[col.columnid];
			var addr = fktable.pk.onrightfn(rr);
			if(!fktable.uniqs[fktable.pk.hh][addr]) {
				throw new Error('Foreign key "'+r[col.columnid]+'" is not found in table '+fktable.tableid);
			}
			return true;
		};
		fkfn.constraintid = constraintid;
		table.checkfn.push(fkfn);
		return cb?cb(1):1;
	} else if(this.modifycolumn) {
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.modifycolumn.columnid;

		if(!table.xcolumns[columnid]) {
			throw new Error('Cannot modify column "'+columnid+'", because it was not found in the table "'+tableid+'"');
		}

		var col = table.xcolumns[columnid];
		col.dbtypeid = this.dbtypeid;
		col.dbsize = this.dbsize;
		col.dbprecision = this.dbprecision;
		col.dbenum = this.dbenum;


		// TODO
		return cb?cb(1):1;
	} else if(this.renamecolumn) {
		db.dbversion++;

		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.renamecolumn;
		var tocolumnid = this.to;

		var col;
		if(!table.xcolumns[columnid]) {
			throw new Error('Column "'+columnid+'" is not found in the table "'+tableid+'"');
		}
		if(table.xcolumns[tocolumnid]) {
			throw new Error('Column "'+tocolumnid+'" already exists in the table "'+tableid+'"');
		}

		if(columnid != tocolumnid) {
			for(var j=0; j<table.columns.length; j++) {
				if(table.columns[j].columnid == columnid) {
					table.columns[j].columnid = tocolumnid;
				}
			};

			table.xcolumns[tocolumnid]=table.xcolumns[columnid];
			delete table.xcolumns[columnid];

			for(var i=0, ilen=table.data.length; i<ilen; i++) {
//				console.log(table.data[i][columnid]);
				table.data[i][tocolumnid] = table.data[i][columnid];
				delete table.data[i][columnid];
			}
			return table.data.length;
		}
		else {
			return cb?cb(0):0;
		}
	} else if(this.drop) {
		switch (this.drop.type) {
			case 'PRIMARY KEY':
				// TODO
				break;
			case 'COLUMN':
			case undefined:
				return dropColumn.call(this);
			case 'INDEX':
			case 'KEY':
				// TODO
			case 'FOREIGN KEY':
			case 'CONSTRAINT':
				return dropConstraint.call(this);
		}

		function dropColumn() {
			var tableid = this.table.tableid;
			var table = db.tables[tableid];
			var columnid = this.drop.id;

			var found = false;
			for(var j=0; j<table.columns.length; j++) {
				if(table.columns[j].columnid == columnid) {
					found = true;
					table.columns.splice(j,1);
					break;
				}
			};

			if(!found) {
				throw new Error('Cannot drop column "'+columnid+'", because it was not found in the table "'+tableid+'"');
			}
			db.dbversion++;

			delete table.xcolumns[columnid];

			for(var i=0, ilen=table.data.length; i<ilen; i++) {
				delete table.data[i][columnid];
			}
			return cb?cb(table.data.length):table.data.length;
		}

		function dropConstraint() {
			var tableid = this.table.tableid;
			var table = db.tables[tableid];
			for (var i = 0; i < table.checkfn.length; i++) {
				if (table.checkfn[i].constraintid == this.drop.id) {
					table.checkfn.splice(i, 1);
					return cb?cb(1):1;
				}
			}
			throw new Error('constraint "'+this.drop.id+'" is not found in table `'+databaseid+'`.`'+tableid+'`');
		}
	} else {
		throw Error('Unknown ALTER TABLE method');
	}
};

