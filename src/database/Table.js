/**
 * Table class for AlaSQL
 * Represents a database table with columns, data, indices, and triggers
 */
export class Table {
	constructor(params = {}) {
		// Step 1: Data array
		this.data = [];

		// Step 2: Columns
		this.columns = [];
		this.xcolumns = {};

		// Step 3: indices
		this.inddefs = {};
		this.indices = {};
		this.uniqs = {};
		this.uniqdefs = {};

		// Step 4: identities
		this.identities = {};

		// Step 5: checkfn...
		this.checks = [];
		this.checkfns = [];

		// Step 6: Triggers
		this.beforeinsert = {};
		this.afterinsert = {};
		this.insteadofinsert = {};

		this.beforedelete = {};
		this.afterdelete = {};
		this.insteadofdelete = {};

		this.beforeupdate = {};
		this.afterupdate = {};
		this.insteadofupdate = {};

		// Apply params
		Object.assign(this, params);
	}

	/**
	 * Index columns by columnid for fast lookup
	 */
	indexColumns() {
		this.xcolumns = {};
		this.columns.forEach(col => {
			this.xcolumns[col.columnid] = col;
		});
	}

	/**
	 * Add a column to the table
	 * @param {object} column - Column definition with columnid
	 */
	addColumn(column) {
		this.columns.push(column);
		this.xcolumns[column.columnid] = column;
	}

	/**
	 * Insert a record into the table
	 * @param {object} record - Record to insert
	 * @returns {number} Number of rows inserted
	 */
	insert(record) {
		this.data.push(record);
		return 1;
	}
}

/**
 * Register Table class with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerTable(alasql) {
	alasql.Table = Table;
}
