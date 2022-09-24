/*
//
// TRIGGER for Alasql.js
// Date: 29.12.2015
//
*/

yy.CreateTrigger = function (params) {
	return yy.extend(this, params);
};
yy.CreateTrigger.prototype.toString = function () {
	var s = 'CREATE TRIGGER ' + this.trigger + ' ';
	if (this.when) s += this.when + ' ';
	s += this.action + ' ON ';
	if (this.table.databaseid) s += this.table.databaseid + '.';
	s += this.table.tableid + ' ';
	s += this.statement.toString();
	return s;
};

yy.CreateTrigger.prototype.execute = function (databaseid, params, cb) {
	var res = 1; // No tables removed
	var triggerid = this.trigger;
	databaseid = this.table.databaseid || databaseid;
	var db = alasql.databases[databaseid];
	var tableid = this.table.tableid;

	var trigger = {
		action: this.action,
		when: this.when,
		statement: this.statement,
		funcid: this.funcid,
		tableid: this.table.tableid,
	};

	db.triggers[triggerid] = trigger;
	if (trigger.action == 'INSERT' && trigger.when == 'BEFORE') {
		db.tables[tableid].beforeinsert[triggerid] = trigger;
	} else if (trigger.action == 'INSERT' && trigger.when == 'AFTER') {
		db.tables[tableid].afterinsert[triggerid] = trigger;
	} else if (trigger.action == 'INSERT' && trigger.when == 'INSTEADOF') {
		db.tables[tableid].insteadofinsert[triggerid] = trigger;
	} else if (trigger.action == 'DELETE' && trigger.when == 'BEFORE') {
		db.tables[tableid].beforedelete[triggerid] = trigger;
	} else if (trigger.action == 'DELETE' && trigger.when == 'AFTER') {
		db.tables[tableid].afterdelete[triggerid] = trigger;
	} else if (trigger.action == 'DELETE' && trigger.when == 'INSTEADOF') {
		db.tables[tableid].insteadofdelete[triggerid] = trigger;
	} else if (trigger.action == 'UPDATE' && trigger.when == 'BEFORE') {
		db.tables[tableid].beforeupdate[triggerid] = trigger;
	} else if (trigger.action == 'UPDATE' && trigger.when == 'AFTER') {
		db.tables[tableid].afterupdate[triggerid] = trigger;
	} else if (trigger.action == 'UPDATE' && trigger.when == 'INSTEADOF') {
		db.tables[tableid].insteadofupdate[triggerid] = trigger;
	}

	if (cb) res = cb(res);
	return res;
};

yy.DropTrigger = function (params) {
	return yy.extend(this, params);
};
yy.DropTrigger.prototype.toString = function () {
	var s = 'DROP TRIGGER ' + this.trigger;
	return s;
};

/**
	Drop trigger
	@param {string} databaseid Database id
	@param {object} params Parameters
	@param {callback} cb Callback function
	@return Number of dropped triggers
	@example
	DROP TRIGGER one;
*/
yy.DropTrigger.prototype.execute = function (databaseid, params, cb) {
	var res = 0; // No tables removed
	var db = alasql.databases[databaseid];
	var triggerid = this.trigger;

	// get the trigger
	var trigger = db.triggers[triggerid];

	//  if the trigger exists
	if (trigger) {
		var tableid = db.triggers[triggerid].tableid;

		if (tableid) {
			res = 1;
			delete db.tables[tableid].beforeinsert[triggerid];
			delete db.tables[tableid].afterinsert[triggerid];
			delete db.tables[tableid].insteadofinsert[triggerid];
			delete db.tables[tableid].beforedelete[triggerid];
			delete db.tables[tableid].afterdelete[triggerid];
			delete db.tables[tableid].insteadofdelete[triggerid];
			delete db.tables[tableid].beforeupdate[triggerid];
			delete db.tables[tableid].afterupdate[triggerid];
			delete db.tables[tableid].insteadofupdate[triggerid];
			delete db.triggers[triggerid];
		} else {
			throw new Error('Trigger Table not found');
		}
	} else {
		throw new Error('Trigger not found');
	}
	if (cb) res = cb(res);
	return res;
};
