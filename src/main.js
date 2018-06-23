import options from './17options';

const mem = {};


const alasql = function(sql, params, cb, scope) {
	params = params || [];

	if (typeof importScripts !== 'function' && mem.webworker) {
		var id = mem.lastid++;
		mem.buffer[id] = cb;
		mem.webworker.postMessage({id: id, sql: sql, params: params});
		return;
	}

	if (arguments.length === 0) {
		// Without arguments - Fluent interface
		return new yy.Select({
			columns: [new yy.Column({columnid: '*'})],
			from: [new yy.ParamValue({param: 0})],
		});
	} else if (arguments.length === 1) {
		// Access promise notation without using `.promise(...)`
		if (sql.constructor === Array) {
			return alasql.promise(sql);
		}
	}
	// Avoid setting params if not needed even with callback
	if (typeof params === 'function') {
		scope = cb;
		cb = params;
		params = [];
	}

	if (typeof params !== 'object') {
		params = [params];
	}

	// Standard interface
	// alasql('#sql');
	
	/*only-for-browser/*
	if (typeof sql === 'string' && sql[0] === '#' && typeof document === 'object') {
		sql = document.querySelector(sql).textContent;
	} else if (typeof sql === 'object' && sql instanceof HTMLElement) {
		sql = sql.textContent;
	} else //*/
	if (typeof sql === 'function') {
		// to run multiline functions
		sql = sql.toString();
		sql = (/\/\*([\S\s]+)\*\//m.exec(sql) || [
			'',
			'Function given as SQL. Plese Provide SQL string or have a /* ... */ syle comment with SQL in the function.',
		])[1];
	}
	// Run SQL
	return alasql.exec(sql, params, cb, scope);
};

/** 
	Current version of alasql 	
 	@constant {string} 
*/
alasql.version = 'PACKAGE_VERSION_NUMBER';

/**
	Debug flag
	@type {boolean}
*/
alasql.debug = undefined; // Initial debug variable

options(alasql);

/*only-for-browser/*
var require = function(){return null}; // as alasqlparser.js is generated, we can not "remove" referenses to 
var __dirname = '';
//*/


/*only-for-browser/*
if(utils.isCordova || utils.isMeteorServer || utils.isNode ){
  console.warn('It looks like you are using the browser version of AlaSQL. Please use the alasql.fs.js file instead.')
}
//*/


// Create default database
//! new Database("alasql");

// Set default database
alasql.use("alasql");

export default alasql;
