// src/alasql.js
// ESM entry point
// Initially minimal, grows as we extract from legacy/

// Import parser (CommonJS, default import)
import alasqlparser from './alasqlparser.js';

const parser = alasqlparser.parser || alasqlparser;

// Create the alasql function
const alasql = function (sql, params, cb) {
	return alasql.exec(sql, params, cb);
};

// Attach parser
alasql.yy = parser.yy;
alasql.parser = parser;

// Initialize core structures
alasql.databases = {};
alasql.options = {};
alasql.aggr = {};
alasql.stdfn = {};
alasql.from = {};
alasql.into = {};
alasql.external = {};

// .use() API for plugins
alasql.use = function (...plugins) {
	for (const plugin of plugins) {
		if (typeof plugin === 'function') {
			plugin(alasql);
		} else if (typeof plugin === 'object') {
			if (plugin.aggr) Object.assign(alasql.aggr, plugin.aggr);
			if (plugin.stdfn) Object.assign(alasql.stdfn, plugin.stdfn);
			if (plugin.from) Object.assign(alasql.from, plugin.from);
			if (plugin.into) Object.assign(alasql.into, plugin.into);
			if (plugin.xlsx) alasql.external.xlsx = plugin.xlsx;
			if (plugin.fs) alasql.external.fs = plugin.fs;
		}
	}
	return alasql;
};

// TODO: exec, parse, compile will be added as we extract
alasql.exec = function (sql, params, cb) {
	// Placeholder - implement in Step 3
	throw new Error('Not yet implemented - extract from legacy/');
};

export default alasql;
