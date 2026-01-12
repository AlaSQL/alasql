/**
 * View class for AlaSQL
 * Represents a database view with columns and a query definition
 */
export class View {
	constructor(params = {}) {
		// Columns
		this.columns = [];
		this.xcolumns = {};
		// Query definition
		this.query = [];

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
}

/**
 * Register View class with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerView(alasql) {
	alasql.View = View;
}
