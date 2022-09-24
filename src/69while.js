/*
//
// CREATE VIEW for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.While = function (params) {
	return yy.extend(this, params);
};
yy.While.prototype.toString = function () {
	var s = 'WHILE ';
	s += this.expression.toString();
	s += ' ' + this.loopstat.toString();
	return s;
};

yy.While.prototype.execute = function (databaseid, params, cb) {
	var self = this;
	var res = [];
	//	console.log(this.expression.toJS());
	var fn = new Function('params,alasql,p', 'var y;return ' + this.expression.toJS());
	//	console.log('cb',!!cb);
	if (cb) {
		var first = false;
		var loop = function (data) {
			if (first) {
				res.push(data);
			} else {
				first = true;
			}
			setTimeout(function () {
				if (fn(params, alasql)) {
					self.loopstat.execute(databaseid, params, loop);
				} else {
					res = cb(res);
				}
			}, 0);
		};
		loop();
	} else {
		while (fn(params, alasql)) {
			var res1 = self.loopstat.execute(databaseid, params);
			res.push(res1);
		}
	}
	return res;
};

yy.Break = function (params) {
	return yy.extend(this, params);
};
yy.Break.prototype.toString = function () {
	var s = 'BREAK';
	return s;
};

yy.Break.prototype.execute = function (databaseid, params, cb, scope) {
	var res = 1;
	if (cb) res = cb(res);
	return res;
};

yy.Continue = function (params) {
	return yy.extend(this, params);
};
yy.Continue.prototype.toString = function () {
	var s = 'CONTINUE';
	return s;
};

yy.Continue.prototype.execute = function (databaseid, params, cb, scope) {
	var res = 1;
	if (cb) res = cb(res);
	return res;
};

yy.BeginEnd = function (params) {
	return yy.extend(this, params);
};
yy.BeginEnd.prototype.toString = function () {
	var s = 'BEGIN ' + this.statements.toString() + ' END';
	return s;
};

yy.BeginEnd.prototype.execute = function (databaseid, params, cb, scope) {
	var self = this;
	var res = [];

	var idx = 0;
	runone();
	function runone() {
		self.statements[idx].execute(databaseid, params, function (data) {
			res.push(data);
			idx++;
			if (idx < self.statements.length) return runone();
			if (cb) res = cb(res);
		});
	}
	return res;
};
