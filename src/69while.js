/*
//
// WHILE, BREAK, CONTINUE, and BEGIN...END for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Control flow exception types for BREAK and CONTINUE statements
function createControlFlowException(name) {
	var Exception = function () {
		this.message = name;
	};
	Exception.prototype = Object.create(Error.prototype);
	Exception.prototype.constructor = Exception;
	return Exception;
}

yy.BreakException = createControlFlowException('BREAK');
yy.ContinueException = createControlFlowException('CONTINUE');

yy.While = function (params) {
	return Object.assign(this, params);
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
			try {
				var res1 = self.loopstat.execute(databaseid, params);
				res.push(res1);
			} catch (err) {
				if (err instanceof yy.BreakException) {
					break;
				} else if (err instanceof yy.ContinueException) {
					continue;
				} else {
					throw err;
				}
			}
		}
	}
	return res;
};

yy.Break = function (params) {
	return Object.assign(this, params);
};
yy.Break.prototype.toString = function () {
	var s = 'BREAK';
	return s;
};

yy.Break.prototype.execute = function (databaseid, params, cb, scope) {
	throw new yy.BreakException();
};

yy.Continue = function (params) {
	return Object.assign(this, params);
};
yy.Continue.prototype.toString = function () {
	var s = 'CONTINUE';
	return s;
};

yy.Continue.prototype.execute = function (databaseid, params, cb, scope) {
	throw new yy.ContinueException();
};

yy.BeginEnd = function (params) {
	return Object.assign(this, params);
};
yy.BeginEnd.prototype.toString = function () {
	var s = 'BEGIN ' + this.statements.toString() + ' END';
	return s;
};

yy.BeginEnd.prototype.execute = function (databaseid, params, cb, scope) {
	var self = this;
	var res = [];

	if (cb) {
		// Asynchronous execution with callback
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
	} else {
		// Synchronous execution
		for (var i = 0; i < self.statements.length; i++) {
			var res1 = self.statements[i].execute(databaseid, params);
			res.push(res1);
		}
	}
	return res;
};
