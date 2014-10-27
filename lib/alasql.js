//
// alasql.js
// JavaScript SQL database
// Date: 27.10.2014
// (ñ) 2014, Andrey Gershun
//

//  UMD header

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./sql-parser'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./sql-parser').SQLParser);
    } else {
        root.alasql = factory(root.SQLParser);
    }
}(this, function (SQLParser) {

// Database class constructor
var Database = function(){
	this.tables = {};
	return this;
};

var Table = function(tableid) {
	this.tableid = tableid;
	this.recs = [];
	this.flds = [];
	this.xflds = {};
	return this;
};

var Query = function() {
	this.recs = [];
	this.flds = []; // TODO - заполнять
	this.xflds = {};
	return this;	
}

Query.prototype.exec = function (db) {
	
}

// Execute SQL statement
Database.prototype.exec = function (sql) {
	return SQLParser.parse(sql).exec(this);
};

// 
// Modifiing SQLParser - add compile() and toJavaScript(context) functions
// This is a not good practice. Probably I will change something later
//

// Alias
var nodes = SQLParser.nodes;

// Execute SELECT statement
nodes.Select.prototype.exec = function (db) {
	var tableid = this.source.name.value;
	var query = new Query();
	query.selectfn = this.compile(tableid);
	query.source = db.tables[tableid]; // TODO Subqueies
	if(this.where) query.wherefn = this.where.compile(tableid);
	console.log(query.selectfn);
	return query.exec(db);
};

nodes.Insert.prototype.exec = function (db) {
	var self = this;
	var table = db.tables[self.target.value];
	var rec = {};
	if(self.fields) {
		self.fields.forEach(function(f, idx){
			// TODO: type checking and conversions
			rec[f.name.value] = self.insertExpression[idx].toString();
		});
	} else {
		table.flds.forEach(function(fld, idx){
			// TODO: type checking and conversions
			rec[fld.fldid] = self.insertExpression[idx].toString();
		});
	}
	table.recs.push(rec);
	return 1;
};

nodes.Update.prototype.exec = function (db) {
	return 1;
};

nodes.Delete.prototype.exec = function (db) {
	return 1;
};

// CREATE TABLE
nodes.CreateTable.prototype.exec = function (db) {

	if(this.ifNotExists && !db.tables[this.target.value] || !this.ifNotExists) {

		if(db.tables[this.target.value]) throw new Error('Can not create table \''+this.target.value+'\', because it already exists in the database.');

		var table = db.tables[this.target.value] = {};
		var flds = table.flds = [];
		this.fieldDef.forEach(function(fd) {
			flds[fd.field.value] = {
				fldid: fd.field.value.toLowerCase(),
				dbtypeid: fd.type.value.toUpperCase() // TODO: Add types table
			};
		});

		// Index fields definitions
		table.xflds = {};
		table.flds.forEach(function(fld){
			table.xflds[key] = fld;
		});

		table.recs = [];
	};
	return 1;
};

// DROP TABLE
nodes.DropTable.prototype.exec = function (db) {
	if(this.ifExists && db.tables[this.target.value] || !this.ifExists) {
		if(!db.tables[this.target.value]) throw new Error('Can not drop table \''+this.target.value+'\', because it does not exist in the database.');
		delete db.tables[this.target.value];
	}
	return 1;
};

// ALTER TABLE table1 RENAME TO table2
nodes.AlterTable.prototype.exec = function (db) {
	if(this.newName.value != this.target.value) {
		db.tables[this.newName.value] = db.tables[this.target.value];
		delete db.tables[this.target.value];
	}
	return 1;
};

// 
// SQL FUNCTIONS COMPILERS
// Based on SQLite functions

var fns = {};
fns.ABS = function(a) {return 'Math.abs('+a+')'};
fns.IIF = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	};
	// TODO: check number of arguments
};
fns.SUM = function(a) {return a};
fns.COUNT = function(a) {return "1"};
fns.LOWER = function(s) {return '('+s+').toLowerCase()';}
fns.UPPER = function(s) {return '('+s+').toUpperCase()';}
fns.IFNULL = function(a,b) {return '('+a+'||'+b+')'};
fns.INSTR = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};
fns.LENGTH = function(s) {return '('+s+').length'};
// fns.LIKE = function(x,y,z) {
// 	return x.match(new RegExp(y.replace(/\%/g,'*')))[0].length;
// };
// LTRIM
fns.MAX = function(){return 'Math.max('+arguments.join(',')+')'};
fns.MIN = function(){return 'Math.min('+arguments.join(',')+')'};
//fns.MIN = function(){return Math.min.apply(null, arguments)};
fns.NULLIF = function(a,b){return '('+a+'=='+b+'?null:'+a+')'};
//REPLACE
// RTRIM
// SUBSTR
// TRIM


// Functions compiler
nodes.FunctionValue.prototype.toJavaScript = function (context, tableid) {
	var s = '';
	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
		if(arg) return arg.toJavaScript(db, context);
		else return '';
	}));
	return s;
};


// Operations compilers

nodes.Op.prototype.toJavaScript = function (context, tableid) {
	var s = '';
	if('+`-`*`/`=`<`>`>=`<=`<>`!=`AND`OR'.indexOf(this.operation.toUpperCase()) > -1) {
		s += '(';
		s += this.left.toJavaScript(context, tableid);
		if(this.operation == '=') s += '==';
		else if(this.operation == '<>') s += '!=';
		else if(this.operation.toUpperCase() == 'AND') s += '&&';
		else if(this.operation.toUpperCase() == 'OR') s += '||';
		else s += this.operation;
		s += this.right.toJavaScript(context, tableid);
		s += ')';
	};
	return s;
};


nodes.NumberValue.prototype.toJavaScript = function (context, tableid) {
	return '('+this.sign + this.value+')';
};


// TODO:
nodes.LiteralValue.prototype.toJavaScript = function (context, tableid) {
	if(this.values.length == 1) {
		// Надо будет подправить
		return context+tableid+'.' + this.value;
	} else if(this.values.length == 2) {
		return context+this.values[1]+'.' + this.values[0];
	}
};


// SELECT
nodes.Select.prototype.compile = function(tableid) {
	var s = 'var res = {};';
	this.fields.forEach(function(f){
		if(f.constructor.name == "Field") {
			if(f.field.constructor.name == "LiteralValue") {
				if(f.field.values.length == 1) {
					s += 'res["'+f.name.values[0] + '"]='+f.field.toJavaScript('scope.',tableid)+';';
				} else if(f.field.values.length == 2) {
					s += 'res["'+f.name.values[1] + '"]='+f.field.toJavaScript('scope.',tableid)+';';
				}
			} else 	if(f.field.constructor.name == "Op" || f.field.constructor.name == "FunctionValue" ) {
				s += 'res.'+f.name.values[0] +'='+f.field.toJavaScript('scope.',tableid)+';';
			}
		} else if(f.constructor.name == "Star") {
			if(f.literal) {
				// If table name provided
				s += 'var w = scope["'+f.literal.values[0]+'"];for(var key in w){res[key]=w[key]};';
			} else {
				// All fileds of all tables
				s += 'Object.keys(scope).forEach(function(key1){'+
							'Object.keys(scope[key1]).forEach(function(key2){'+
								'res[key2] = scope[key1][key2];'+
							'});'+			
						'});';
			}
		}
	});
	s += 'return res;';
	//console.log(s);
	return new Function('scope',s);
};


nodes.Where.prototype.compile = function (tableid) {
	return new Function('scope','return'+this.conditions.toJavaScript('scope.', tableid));
};


// export module
	return {Database:Database};
}));