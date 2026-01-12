// Alasql Linq library

yy.FromData = function (params) {
	return yy.extend(this, params);
};
yy.FromData.prototype.toString = function () {
	if (this.data) return 'DATA(' + ((Math.random() * 10e15) | 0) + ')';
	else return '?';
};
yy.FromData.prototype.toJS = function () {
	//	console.log('yy.FromData.prototype.toJS');
};

yy.Select.prototype.exec = function (params, cb) {
	if (this.preparams) params = this.preparams.concat(params);
	//	console.log(15,this.preparams);

	var databaseid = alasql.useid;
	var db = alasql.databases[databaseid];
	var sql = this.toString();
	var hh = hash(sql);
	//	console.log(sql);

	var statement = this.compile(databaseid);
	if (!statement) return;
	statement.sql = sql;
	statement.dbversion = db.dbversion;

	// Secure sqlCache size
	if (db.sqlCacheSize > alasql.MAXSQLCACHESIZE) {
		db.resetSqlCache();
	}
	db.sqlCacheSize++;
	db.sqlCache[hh] = statement;
	var res = (alasql.res = statement(params, cb));
	return res;
};

yy.Select.prototype.Select = function () {
	var self = this;
	var args = [];
	if (arguments.length > 1) {
		args = Array.prototype.slice.call(arguments);
	} else if (arguments.length == 1) {
		if (Array.isArray(arguments[0])) {
			args = arguments[0];
		} else {
			args = [arguments[0]];
		}
	} else {
		throw new Error('Wrong number of arguments of Select() function');
	}

	self.columns = [];

	args.forEach(function (arg) {
		if (typeof arg == 'string') {
			self.columns.push(new yy.Column({columnid: arg}));
		} else if (typeof arg == 'function') {
			var pari = 0;
			if (self.preparams) {
				pari = self.preparams.length;
			} else {
				self.preparams = [];
			}
			self.preparams.push(arg);
			self.columns.push(new yy.Column({columnid: '*', func: arg, param: pari}));
		} else {
			// Unknown type
		}
	});

	//	console.log(self instanceof yy.Select);
	return self;
};

yy.Select.prototype.From = function (tableid) {
	var self = this;
	if (!self.from) self.from = [];
	if (Array.isArray(tableid)) {
		var pari = 0;
		if (self.preparams) {
			pari = self.preparams.length;
		} else {
			self.preparams = [];
		}
		self.preparams.push(tableid);
		self.from.push(new yy.ParamValue({param: pari}));
	} else if (typeof tableid == 'string') {
		self.from.push(new yy.Table({tableid: tableid}));
	} else {
		throw new Error('Unknown arguments in From() function');
	}
	return self;
};

yy.Select.prototype.OrderBy = function () {
	var self = this;
	var args = [];

	self.order = [];

	if (arguments.length == 0) {
		//		self.order.push(new yy.OrderExpression({expression: new yy.Column({columnid:"_"}), direction:'ASC'}));
		args = ['_'];
	} else if (arguments.length > 1) {
		args = Array.prototype.slice.call(arguments);
	} else if (arguments.length == 1) {
		if (Array.isArray(arguments[0])) {
			args = arguments[0];
		} else {
			args = [arguments[0]];
		}
	} else {
		throw new Error('Wrong number of arguments of Select() function');
	}

	if (args.length > 0) {
		args.forEach(function (arg) {
			var expr = new yy.Column({columnid: arg});
			if (typeof arg == 'function') {
				expr = arg;
			}
			self.order.push(new yy.OrderExpression({expression: expr, direction: 'ASC'}));
		});
	}
	return self;
};

yy.Select.prototype.Top = function (topnum) {
	var self = this;
	self.top = new yy.NumValue({value: topnum});
	return self;
};

yy.Select.prototype.GroupBy = function () {
	var self = this;
	var args = [];

	if (arguments.length > 1) {
		args = Array.prototype.slice.call(arguments);
	} else if (arguments.length == 1) {
		if (Array.isArray(arguments[0])) {
			args = arguments[0];
		} else {
			args = [arguments[0]];
		}
	} else {
		throw new Error('Wrong number of arguments of Select() function');
	}

	self.group = [];

	args.forEach(function (arg) {
		var expr = new yy.Column({columnid: arg});
		self.group.push(expr);
	});

	return self;
};

yy.Select.prototype.Where = function (expr) {
	var self = this;
	if (typeof expr == 'function') {
		self.where = expr;
	}
	return self;
};
