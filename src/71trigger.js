/*
//
// TRIGGER for Alasql.js
// Date: 29.12.2015
//
*/

yy.CreateTrigger = function (params) {
	return Object.assign(this, params);
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

const RE_trigger = /^(before|after|insteadof)(insert|delete|update)$/;
yy.CreateTrigger.prototype.execute = function (databaseid, params, cb) {
	let res = 1; // No tables removed
	const triggerid = this.trigger;
	databaseid = this.table.databaseid || databaseid;
	const db = alasql.databases[databaseid];
	const { tableid } = this.table;

	const trigger = {
		action: this.action,
		when: this.when,
		statement: this.statement,
		funcid: this.funcid,
		tableid,
	};

	db.triggers[triggerid] = trigger;
	const actionKey = (`${this.when}${this.action}`).toLowerCase();

	if (actionKey.match(RE_trigger)) {
		// Ensure the existence of db.tables[tableid] and db.tables[tableid][actionKey]
		db.tables[tableid] = db.tables[tableid] || {};
		db.tables[tableid][actionKey] = db.tables[tableid][actionKey] || {};
		db.tables[tableid][actionKey][triggerid] = trigger;
	}

	if (cb) res = cb(res);
	return res;
};


yy.DropTrigger = function (params) {
	return Object.assign(this, params);
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
