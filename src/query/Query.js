/**
 * Query class for AlaSQL
 * Represents a compiled SQL query with its execution context
 */
export class Query {
	constructor(params = {}) {
		// Column definitions
		this.columns = [];
		this.xcolumns = {};

		// Data sources
		this.sources = [];
		this.sourceslen = 0;

		// Query clauses
		this.where = null;
		this.group = null;
		this.having = null;
		this.order = null;
		this.limit = null;
		this.offset = null;

		// Execution state
		this.data = [];
		this.scope = {};
		this.params = [];
		this.groups = [];
		this.xgroups = {};

		// Cache for compiled functions
		this.wherefn = null;
		this.havingfn = null;
		this.selectfn = null;
		this.orderfn = null;

		// Subquery support
		this.queriesdata = [];
		this.queriesfn = null;
		this.subqueryCache = {};

		// Apply any provided params
		Object.assign(this, params);
	}

	/**
	 * Reset query state for re-execution
	 */
	reset() {
		this.data = [];
		this.groups = [];
		this.xgroups = {};
		this.subqueryCache = {};
	}
}

/**
 * Register Query class with alasql instance
 * @param {object} alasql - The alasql instance
 */
export function registerQuery(alasql) {
	alasql.Query = Query;
}
