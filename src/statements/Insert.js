/**
 * INSERT statement for AlaSQL
 * This module extracts the INSERT statement structure
 */

/**
 * Insert statement class
 * Represents an INSERT query with target table, columns, and values
 */
export class Insert {
	constructor(params = {}) {
		this.into = null; // Target table
		this.columns = null; // Optional column list
		this.values = null; // VALUES clause
		this.select = null; // INSERT ... SELECT
		this.setcolumns = null; // SET syntax
		this.orreplace = false; // INSERT OR REPLACE
		this.replaceonly = false; // REPLACE only
		this.ignore = false; // INSERT IGNORE
		this.output = null; // OUTPUT clause

		Object.assign(this, params);
	}

	/**
	 * Convert INSERT to SQL string representation
	 */
	toString() {
		let s = 'INSERT ';
		if (this.orreplace) s += 'OR REPLACE ';
		if (this.replaceonly) s = 'REPLACE ';
		if (this.ignore) s += 'IGNORE ';
		if (this.into) {
			s += 'INTO ' + (this.into.toString ? this.into.toString() : String(this.into));
		}
		if (this.columns) {
			s += '(' + this.columns.join(', ') + ')';
		}
		if (this.values) {
			const values = this.values.map(v => '(' + v.join(', ') + ')');
			s += ' VALUES ' + values.join(', ');
		}
		if (this.select) {
			s += ' ' + this.select.toString();
		}
		return s;
	}
}

/**
 * Register INSERT statement with alasql instance
 * Note: The full implementation remains in legacy; this provides the ESM structure
 * @param {object} alasql - The alasql instance
 */
export function registerInsert(alasql) {
	alasql.Insert = Insert;
}
