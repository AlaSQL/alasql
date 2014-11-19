/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ColumnDef = function (params) { return yy.extend(this, params); }
yy.ColumnDef.prototype.toString = function() {
	var s =  this.columnid;
	if(this.dbtypeid) s += ' '+this.dbtypeid;
	if(this.dbsize) {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+this.dbprecision;
		s += ')';
	};
	if(this.primarykey) s += ' PRIMARY KEY';
	if(this.notnull) s += ' NOT NULL';
	return s;
}

yy.CreateTable = function (params) { return yy.extend(this, params); }
yy.CreateTable.prototype.toString = function() {
	var s = 'CREATE';
	if(this.temporary) s+=' TEMPORARY';
	s += ' TABLE';
	if(this.ifnotexists) s += ' IF NOT EXISTS';
	s += ' '+this.table.toString();
	if(this.as) s += ' AS '+this.as;
	else { 
		var ss = this.columns.map(function(col){
			return col.toString();
		});
		s += ' ('+ss.join(',')+')';
	}
	return s;
}

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.CreateTable.prototype.execute = function (databaseid) {
//	var self = this;
	var db = alasql.databases[databaseid];

	var tableid = this.table.tableid;
	if(!tableid) {
		throw new Error('Table name is not defined');
	}
//	var ifnotexists = this.ifnotexists;
	var columns = this.columns;
	if(!columns) {
		throw new Error('Columns are not defined');
	}
	var constraints = this.constraints||[];
//	console.log(this);

	// IF NOT EXISTS
	if(this.ifnotexists && db.tables[tableid]) return 0;

	if(db.tables[tableid]) {
		throw new Error('Can not create table \''+tableid
			+'\', because it already exists in the database \''+db.databaseid+'\'');
	}

	var table = db.tables[tableid] = new alasql.Table(); // TODO Can use special object?
	table.defaultfns = '';

	this.columns.forEach(function(col) {
		var newcol = {
			columnid: col.columnid,
			dbtypeid: col.dbtypeid // TODO: Add types table
		};

		if(col.default) {
			table.defaultfns += '\''+col.columnid+'\':'+col.default.toJavaScript()+',';
		}

		table.columns.push(newcol);
		table.xcolumns[newcol.columnid] = newcol;

		// Check for primary key
		if(col.primarykey) {
			var pk = table.pk = {};
			pk.columns = [col.columnid];
			pk.onrightfns = 'r[\''+col.columnid+'\']';
			pk.onrightfn = new Function("r",'return '+pk.onrightfns);
			pk.hh = hash(pk.onrightfns);
			table.indices[pk.hh] = {};
		};

	});


	constraints.forEach(function(con) {
		//console.log(con, con.columns);
		if(con.type == 'PRIMARY KEY') {
			if(table.pk) {
				throw new Error('Primary key already exists');
			}
			var pk = table.pk = {};
			pk.columns = con.columns;
			pk.onrightfns = pk.columns.map(function(columnid){
				return 'r[\''+columnid+'\']'
			}).join("+'`'+");
			pk.onrightfn = new Function("r",'return '+pk.onrightfns);
			pk.hh = hash(pk.onrightfns);
			table.indices[pk.hh] = {};					
		}
	});

//			if(table.pk) {
	table.insert = function(r) {
		if(this.pk) {
			var pk = this.pk;
			var addr = pk.onrightfn(r);
			if(typeof this.indices[pk.hh][addr] != 'undefined') {
				throw new Error('Cannot insert record, because it already exists in primary key');
			} else {
				table.data.push(r);
				this.indices[pk.hh][addr]=r;
			};
		} else {
			table.data.push(r);						
		}
	};

	table.delete = function(i) {
		if(this.pk) {
			var r = this.data[i];
			var pk = this.pk;
			var addr = pk.onrightfn(r);
			if(typeof this.indices[pk.hh][addr] == 'undefined') {
				throw new Error('Something wrong with index on table');
			} else {
				this.indices[pk.hh][addr]=undefined;
			};
		}
	};

	table.deleteall = function() {
		this.data.length = 0;
		if(this.pk) {
//						var r = this.data[i];
			this.indices[this.pk.hh] = {};
		}
	};

	table.update = function(assignfn, i, params) {
		if(this.pk) {
			var r = this.data[i];
			var pk = this.pk;
			var addr = pk.onrightfn(r,params);
			if(typeof this.indices[pk.hh][addr] == 'undefined') {
				throw new Error('Something wrong with index on table');
			} else {
				this.indices[pk.hh][addr]=undefined;
				assignfn(r);
				var newaddr = pk.onrightfn(r);
				if(typeof this.indices[pk.hh][newaddr] != 'undefined') {
					throw new Error('Record already exists');
				} else {
					this.indices[pk.hh][newaddr] = r;
				}
			} 

		} else {
			assignfn(this.data[i]);
		};

	};
//	console.log(databaseid);
//	console.log(db.databaseid,db.tables);
//	console.log(table);

	return 1;
};


