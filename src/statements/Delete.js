/**
 * DELETE statement for AlaSQL
 * This module extracts the DELETE statement structure
 */

/**
 * Delete statement class
 * Represents a DELETE query with target table and optional WHERE clause
 */
export class Delete {
	constructor(params = {}) {
		this.table = null; // Target table
		this.where = null; // WHERE clause
		this.output = null; // OUTPUT clause (SQL Server syntax)

		Object.assign(this, params);
	}

	/**
	 * Convert DELETE to SQL string representation
	 */
	toString() {
		let s = 'DELETE FROM ';
		if (this.table) {
			s += this.table.toString ? this.table.toString() : String(this.table);
		}
		if (this.where) {
			s += ' WHERE ' + (this.where.toString ? this.where.toString() : String(this.where));
		}
		return s;
	}
}

/**
 * Register DELETE statement with alasql instance
 * Note: The full implementation remains in legacy; this provides the ESM structure
 * @param {object} alasql - The alasql instance
 */
export function registerDelete(alasql) {
	alasql.Delete = Delete;
}
