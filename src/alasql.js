// src/alasql.js
// ESM entry point - imports from extracted modules

// Import parser
import alasqlparser from './alasqlparser.js';

// Import utils
import {clone, cloneDeep, hash, extend, escapeq, cutbom} from './utils/index.js';

// Import database module
import {registerDatabaseModule} from './database/index.js';

// Import aggregators
import {registerAggregators} from './aggregators/index.js';

// Import standard functions
import {registerStandardFunctions} from './stdfn/index.js';

// Import query
import {Query} from './query/index.js';

// Import statements
import {Select, registerSelect} from './statements/Select.js';
import {Insert, registerInsert} from './statements/Insert.js';
import {Update, registerUpdate} from './statements/Update.js';
import {Delete, registerDelete} from './statements/Delete.js';
import {CreateTable, ColumnDef, registerCreateTable} from './statements/CreateTable.js';
import {DropTable, TruncateTable, registerDropTable} from './statements/DropTable.js';

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
alasql.engines = {};

// Attach utils
alasql.utils = {clone, cloneDeep, hash, extend, escapeq, cutbom};

// Attach Query class
alasql.Query = Query;

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
			if (plugin.filesaver) alasql.external.filesaver = plugin.filesaver;
		}
	}
	return alasql;
};

// Register all extracted modules
registerDatabaseModule(alasql);
registerAggregators(alasql);
registerStandardFunctions(alasql);
registerSelect(alasql);
registerInsert(alasql);
registerUpdate(alasql);
registerDelete(alasql);
registerCreateTable(alasql);
registerDropTable(alasql);

// exec placeholder - full implementation remains in legacy until full migration
alasql.exec = function (sql, params, cb) {
	// This is a placeholder - the actual exec is provided by the legacy dist
	// During Step 4 cleanup, this will be replaced with the full implementation
	throw new Error('ESM alasql.exec not yet implemented - use dist/alasql.fs.js for now');
};

export default alasql;
