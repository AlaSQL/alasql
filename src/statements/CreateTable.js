/**
 * CREATE TABLE statement for AlaSQL
 * This module extracts the CREATE TABLE statement structure
 */

/**
 * ColumnDef class for column definitions
 */
export class ColumnDef {
	constructor(params = {}) {
		this.columnid = null;
		this.dbtypeid = null;
		this.dbsize = null;
		this.dbprecision = null;
		this.primarykey = false;
		this.notnull = false;
		this.unique = false;
		this.identity = null;
		this.default = null;
		this.check = null;
		this.foreignkey = null;

		Object.assign(this, params);
	}

	toString() {
		let s = this.columnid;
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
	}
}

/**
 * CreateTable statement class
 */
export class CreateTable {
	constructor(params = {}) {
		this.table = null; // Table reference
		this.columns = null; // Column definitions
		this.constraints = null; // Table constraints
		this.ifnotexists = false;
		this.temporary = false;
		this.view = false;
		this.class = false;
		this.as = null;
		this.select = null;
		this.viewcolumns = null;

		Object.assign(this, params);
	}

	toString() {
		let s = 'CREATE';
		if (this.temporary) s += ' TEMPORARY';
		if (this.view) {
			s += ' VIEW';
		} else {
			s += this.class ? ' CLASS' : ' TABLE';
		}
		if (this.ifnotexists) s += ' IF NOT EXISTS';
		s += ' ' + (this.table?.toString ? this.table.toString() : String(this.table));

		if (this.viewcolumns) {
			s += '(' + this.viewcolumns.map(vcol => vcol.toString()).join(',') + ')';
		}

		if (this.as) {
			s += ' AS ' + this.as;
		} else if (this.columns) {
			s += ' (' + this.columns.map(col => col.toString()).join(', ') + ')';
		}

		if (this.view && this.select) {
			s += ' AS ' + this.select.toString();
		}

		return s;
	}
}

/**
 * Register CREATE TABLE statement with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerCreateTable(alasql) {
	alasql.CreateTable = CreateTable;
	alasql.ColumnDef = ColumnDef;
}
