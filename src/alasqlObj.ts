export default function logic(mem) {
	let yy = mem.grammar.yy;

	return function(sql?: any, params?: any = [], cb?: any, scope?: string) {
		params = params || [];

		if (typeof importScripts !== 'function' && mem.alasql.webworker) {
			var id = mem.alasql.lastid++;
			mem.alasql.buffer[id] = cb;
			mem.alasql.webworker.postMessage({id, sql, params});
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
				return mem.alasql.promise(sql);
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
		return mem.alasql.exec(sql, params, cb, scope);
	};
}
