/**
	AlaSQL Precompile Module
	Provides compileToJS function for generating pre-compiled SQL queries
*/

// Import alasql from the built file
import alasql from '../../dist/alasql.fs.js';

/**
	 Compile SQL statement to JavaScript source code string.
	 Returns pre-compiled function source that skips SQL parsing.
	 The returned function must be bound to alasql context.
	 @param {string} sql SQL statement
	 @param {string} databaseid Database identifier
	 @return {string} Generated JavaScript source code
	*/
export function compileToJS(sql, databaseid) {
	const compiledFn = alasql.compile(sql, databaseid);
	const query = compiledFn.query;

	// Extract compiled functions
	const selectfnStr = query.selectfn ? query.selectfn.toString() : 'null';
	const wherefnStr = query.wherefn ? query.wherefn.toString() : 'null';
	const orderfnStr = query.orderfn ? query.orderfn.toString() : 'null';

	// Extract source information for data fetching
	const sources = query.sources || [];
	const firstSource = sources[0] || {};
	const alias = firstSource.alias ? JSON.stringify(firstSource.alias) : '"default"';
	const tableid = firstSource.tableid ? JSON.stringify(firstSource.tableid) : 'null';
	const srcDatabaseid = firstSource.databaseid
		? JSON.stringify(firstSource.databaseid)
		: JSON.stringify(databaseid || 'alasql');

	// Build wrapper
	const wrapper = `(function(params, cb, scope) {
		const alasql = this;
		const selectfn = ${selectfnStr};
		const wherefn = ${wherefnStr};
		const orderfn = ${orderfnStr};
		const removeKeys = ${JSON.stringify(query.removeKeys || [])};
		const distinct = ${JSON.stringify(query.distinct)};
		const fixedLimit = ${JSON.stringify(query.limit)};
		const fixedOffset = ${JSON.stringify(query.offset)};
		const limitParam = ${JSON.stringify(query.limitParam)};
		const offsetParam = ${JSON.stringify(query.offsetParam)};
		const percent = ${JSON.stringify(query.percent)};
		const alias = ${alias};
		
		// Get data from source (either params or database table)
		let data;
		if (${tableid}) {
			// Query from database table
			const db = alasql.databases[${srcDatabaseid}];
			data = db.tables[${tableid}].data;
		} else if (params && params[0]) {
			// Query from parameter
			data = params[0];
		} else {
			data = [];
		}
		
		// Execute query
		const limit = typeof limitParam !== 'undefined' ? (params ? params[limitParam] : undefined) : fixedLimit;
		const offset = typeof offsetParam !== 'undefined' ? (params ? params[offsetParam] : undefined) : fixedOffset;
		let result = [];
		for (let i = 0; i < data.length; i++) {
			const p = {};
			p[alias] = data[i];
			if (!wherefn || wherefn(p, params, alasql)) {
				const row = selectfn ? selectfn(p, params, alasql) : data[i];
				result.push(row);
			}
		}
		
		// Apply ORDER BY (before removing keys)
		if (orderfn) {
			result.sort(orderfn);
		}
		
		// Remove temporary keys
		if (removeKeys && removeKeys.length > 0) {
			result.forEach(row => {
				removeKeys.forEach(key => delete row[key]);
			});
		}
		
		// Apply DISTINCT
		if (distinct) {
			const seen = new Set();
			result = result.filter(row => {
				const key = JSON.stringify(row);
				if (seen.has(key)) return false;
				seen.add(key);
				return true;
			});
		}
		
		// Apply OFFSET and LIMIT
		if (limit) {
			let start = offset | 0 || 0;
			start = start < 0 ? 0 : start;
			const end = percent ? (((result.length * limit) / 100) | 0) + start : (limit | 0) + start;
			result = result.slice(start, end);
		} else if (offset) {
			let start = offset | 0 || 0;
			start = start < 0 ? 0 : start;
			result = result.slice(start);
		}
		
		if (cb) cb(result);
		return result;
	})`;

	return wrapper;
}
