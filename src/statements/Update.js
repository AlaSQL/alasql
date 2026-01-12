/**
 * UPDATE statement for AlaSQL
 * This module extracts the UPDATE statement structure
 */

/**
 * Update statement class
 * Represents an UPDATE query with target table, SET columns, and WHERE clause
 */
export class Update {
	constructor(params = {}) {
		this.table = null; // Target table
		this.columns = null; // SET column assignments
		this.where = null; // WHERE clause
		this.output = null; // OUTPUT clause (SQL Server syntax)

		Object.assign(this, params);
	}

	/**
	 * Convert UPDATE to SQL string representation
	 */
	toString() {
		let s = 'UPDATE ';
		if (this.table) {
			s += this.table.toString ? this.table.toString() : String(this.table);
		}
		if (this.columns) {
			s += ' SET ' + this.columns.map(col => col.toString()).join(', ');
		}
		if (this.where) {
			s += ' WHERE ' + (this.where.toString ? this.where.toString() : String(this.where));
		}
		return s;
	}
}

/**
 * SetColumn class for UPDATE SET assignments
 * Represents a column = expression pair
 */
export class SetColumn {
	constructor(params = {}) {
		this.column = null; // Column reference
		this.expression = null; // Value expression

		Object.assign(this, params);
	}

	/**
	 * Convert SET assignment to SQL string
	 */
	toString() {
		const col = this.column?.toString ? this.column.toString() : String(this.column);
		const expr = this.expression?.toString ? this.expression.toString() : String(this.expression);
		return col + '=' + expr;
	}
}

/**
 * Register UPDATE statement with alasql instance
 * Note: The full implementation remains in legacy; this provides the ESM structure
 * @param {object} alasql - The alasql instance
 */
export function registerUpdate(alasql) {
	alasql.Update = Update;
	alasql.SetColumn = SetColumn;
}
