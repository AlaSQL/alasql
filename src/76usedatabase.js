/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// Modified: 16.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global yy alasql */

// CREATE DATABASE databaseid
yy.CreateDatabase = function (params) {
	return yy.extend(this, params);
};
yy.CreateDatabase.prototype.toString = function () {
	var s = 'CREATE';
	if (this.engineid) s += ' ' + this.engineid;
	s += ' DATABASE';
	if (this.ifnotexists) s += ' IF NOT EXISTS';
	s += ' ' + this.databaseid;
	if (this.args && this.args.length > 0) {
		s +=
			'(' +
			this.args
				.map(function (arg) {
					return arg.toString();
				})
				.join(', ') +
			')';
	}
	if (this.as) s += ' AS ' + this.as;
	return s;
};
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.CreateDatabase.prototype.execute = function (databaseid, params, cb) {
	var args;
	if (this.args && this.args.length > 0) {
		args = this.args.map(function (arg) {
			// console.log(346235, arg.toJS());
			return new Function('params,alasql', 'var y;return ' + arg.toJS())(params, alasql);
		});
	}
	if (this.engineid) {
		var res = alasql.engines[this.engineid].createDatabase(
			this.databaseid,
			this.args,
			this.ifnotexists,
			this.as,
			cb
		);
		return res;
	} else {
		var dbid = this.databaseid;
		if (alasql.databases[dbid]) {
			throw new Error("Database '" + dbid + "' already exists");
		}
		var a = new alasql.Database(dbid);
		var res = 1;
		if (cb) return cb(res);
		return res;
	}
};

// CREATE DATABASE databaseid
yy.AttachDatabase = function (params) {
	return yy.extend(this, params);
};
yy.AttachDatabase.prototype.toString = function (args) {
	var s = 'ATTACH';
	if (this.engineid) s += ' ' + this.engineid;
	s += ' DATABASE' + ' ' + this.databaseid;
	// TODO add params
	if (args) {
		s += '(';
		if (args.length > 0) {
			s += args
				.map(function (arg) {
					return arg.toString();
				})
				.join(', ');
		}
		s += ')';
	}
	if (this.as) s += ' AS' + ' ' + this.as;
	return s;
};
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.AttachDatabase.prototype.execute = function (databaseid, params, cb) {
	if (!alasql.engines[this.engineid]) {
		throw new Error('Engine "' + this.engineid + '" is not defined.');
	}
	var res = alasql.engines[this.engineid].attachDatabase(
		this.databaseid,
		this.as,
		this.args,
		params,
		cb
	);
	return res;
};

// CREATE DATABASE databaseid
yy.DetachDatabase = function (params) {
	return yy.extend(this, params);
};
yy.DetachDatabase.prototype.toString = function () {
	var s = 'DETACH';
	s += ' DATABASE' + ' ' + this.databaseid;
	return s;
};
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.DetachDatabase.prototype.execute = function (databaseid, params, cb) {
	if (!alasql.databases[this.databaseid].engineid) {
		throw new Error('Cannot detach database "' + this.engineid + '", because it was not attached.');
	}
	var res;

	var dbid = this.databaseid;

	if (dbid === alasql.DEFAULTDATABASEID) {
		throw new Error('Drop of default database is prohibited');
	}

	if (!alasql.databases[dbid]) {
		if (!this.ifexists) {
			throw new Error("Database '" + dbid + "' does not exist");
		} else {
			res = 0;
		}
	} else {
		// Usually databases are detached and then dropped. Detaching will delete
		// the database object from memory. While this is OK for in-memory and
		// other persistent databases, for FileStorage DBs, we will
		// not be able to delete the DB file (.json) since we would have lost
		// the filename by deleting the in-memory database object here.
		// For this reason, to delete the associated JSON file,
		// keeping the name of the file alone as a property inside the db object
		// until it gets DROPped subsequently (only for FileStorage DBs)
		var isFS = alasql.databases[dbid].engineid && alasql.databases[dbid].engineid == 'FILESTORAGE',
			filename = alasql.databases[dbid].filename || '';

		delete alasql.databases[dbid];

		if (isFS) {
			// Create a detached FS database
			alasql.databases[dbid] = {};
			alasql.databases[dbid].isDetached = true;
			alasql.databases[dbid].filename = filename;
		}

		if (dbid === alasql.useid) {
			alasql.use();
		}
		res = 1;
	}
	if (cb) cb(res);
	return res;
	//	var res = alasql.engines[this.engineid].attachDatabase(this.databaseid, this.as, cb);
	//	return res;
};

// USE DATABSE databaseid
// USE databaseid
yy.UseDatabase = function (params) {
	return yy.extend(this, params);
};
yy.UseDatabase.prototype.toString = function () {
	return 'USE' + ' ' + 'DATABASE' + ' ' + this.databaseid;
};
//yy.UseDatabase.prototype.compile = returnUndefined;
yy.UseDatabase.prototype.execute = function (databaseid, params, cb) {
	var dbid = this.databaseid;
	if (!alasql.databases[dbid]) {
		throw new Error("Database '" + dbid + "' does not exist");
	}
	alasql.use(dbid);
	var res = 1;
	if (cb) cb(res);
	return res;
};

// DROP DATABASE databaseid
yy.DropDatabase = function (params) {
	return yy.extend(this, params);
};
yy.DropDatabase.prototype.toString = function () {
	var s = 'DROP';
	if (this.ifexists) s += ' IF EXISTS';
	s += ' DATABASE ' + this.databaseid;
	return s;
};
//yy.DropDatabase.prototype.compile = returnUndefined;
yy.DropDatabase.prototype.execute = function (databaseid, params, cb) {
	if (this.engineid) {
		return alasql.engines[this.engineid].dropDatabase(this.databaseid, this.ifexists, cb);
	}
	var res;

	var dbid = this.databaseid;

	if (dbid === alasql.DEFAULTDATABASEID) {
		throw new Error('Drop of default database is prohibited');
	}
	if (!alasql.databases[dbid]) {
		if (!this.ifexists) {
			throw new Error("Database '" + dbid + "' does not exist");
		} else {
			res = 0;
		}
	} else {
		if (alasql.databases[dbid].engineid) {
			throw new Error("Cannot drop database '" + dbid + "', because it is attached. Detach it.");
		}

		delete alasql.databases[dbid];
		if (dbid === alasql.useid) {
			alasql.use();
		}
		res = 1;
	}
	if (cb) cb(res);
	return res;
};
