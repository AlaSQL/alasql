var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var index_exports = {};
__export(index_exports, {
  compileToJS: () => compileToJS
});
module.exports = __toCommonJS(index_exports);
var import_alasql_fs = __toESM(require("../../dist/alasql.fs.js"));
function compileToJS(sql, databaseid) {
  const compiledFn = import_alasql_fs.default.compile(sql, databaseid);
  const query = compiledFn.query;
  const selectfnStr = query.selectfn ? query.selectfn.toString() : "null";
  const wherefnStr = query.wherefn ? query.wherefn.toString() : "null";
  const orderfnStr = query.orderfn ? query.orderfn.toString() : "null";
  const sources = query.sources || [];
  const firstSource = sources[0] || {};
  const alias = firstSource.alias ? JSON.stringify(firstSource.alias) : '"default"';
  const tableid = firstSource.tableid ? JSON.stringify(firstSource.tableid) : "null";
  const srcDatabaseid = firstSource.databaseid ? JSON.stringify(firstSource.databaseid) : JSON.stringify(databaseid || "alasql");
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
