/**
 * SELECT statement for AlaSQL
 * This module extracts the SELECT statement structure
 */

/**
 * Select statement class
 * Represents a SELECT query with columns, from, where, group, order, etc.
 */
export class Select {
	constructor(params = {}) {
		this.columns = [];
		this.from = null;
		this.joins = [];
		this.where = null;
		this.group = null;
		this.having = null;
		this.order = null;
		this.limit = null;
		this.offset = null;
		this.distinct = false;
		this.modifier = null;
		this.top = null;
		this.into = null;

		Object.assign(this, params);
	}

	/**
	 * Convert SELECT to SQL string representation
	 */
	toString() {
		let s = 'SELECT ';
		if (this.distinct) {
			s += 'DISTINCT ';
		}
		if (this.columns && this.columns.length > 0) {
			s += this.columns
				.map(col => {
					let cs = col.toString ? col.toString() : String(col);
					if (col.as) {
						cs += ' AS ' + col.as;
					}
					return cs;
				})
				.join(', ');
		} else {
			s += '*';
		}
		if (this.from) {
			s +=
				' FROM ' +
				this.from
					.map(f => {
						let fs = f.toString ? f.toString() : String(f);
						if (f.as) {
							fs += ' AS ' + f.as;
						}
						return fs;
					})
					.join(', ');
		}
		if (this.where) {
			s += ' WHERE ' + (this.where.toString ? this.where.toString() : String(this.where));
		}
		if (this.group) {
			s += ' GROUP BY ' + this.group.map(g => g.toString()).join(', ');
		}
		if (this.having) {
			s += ' HAVING ' + this.having.toString();
		}
		if (this.order) {
			s += ' ORDER BY ' + this.order.map(o => o.toString()).join(', ');
		}
		if (this.limit !== null) {
			s += ' LIMIT ' + this.limit;
		}
		if (this.offset !== null) {
			s += ' OFFSET ' + this.offset;
		}
		return s;
	}
}

/**
 * Register SELECT statement with alasql instance
 * Note: The full implementation remains in legacy; this provides the ESM structure
 * @param {object} alasql - The alasql instance
 */
export function registerSelect(alasql) {
	// The legacy yy.Select is used by the parser
	// This module provides the ESM-compatible structure
	alasql.Select = Select;
}
