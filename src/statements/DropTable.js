/**
 * DROP TABLE statement for AlaSQL
 * This module extracts the DROP TABLE statement structure
 */

/**
 * DropTable statement class
 */
export class DropTable {
	constructor(params = {}) {
		this.tables = null; // List of tables to drop
		this.ifexists = false;
		this.view = false;

		Object.assign(this, params);
	}

	toString() {
		let s = 'DROP ';
		if (this.view) {
			s += 'VIEW';
		} else {
			s += 'TABLE';
		}
		if (this.ifexists) s += ' IF EXISTS';
		if (this.tables) {
			s += ' ' + this.tables.map(t => (t.toString ? t.toString() : String(t))).join(', ');
		}
		return s;
	}
}

/**
 * TruncateTable statement class
 */
export class TruncateTable {
	constructor(params = {}) {
		this.table = null;
		this.ifexists = false;

		Object.assign(this, params);
	}

	toString() {
		let s = 'TRUNCATE TABLE';
		if (this.table) {
			s += ' ' + (this.table.toString ? this.table.toString() : String(this.table));
		}
		return s;
	}
}

/**
 * Register DROP TABLE statement with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerDropTable(alasql) {
	alasql.DropTable = DropTable;
	alasql.TruncateTable = TruncateTable;
}
