/**
	AlaSQL - Main Alasql class
 	@function
 	@param {string|function|object} sql - SQL-statement or data object for fuent interface
 	@param {object} params - SQL parameters
 	@param {function} cb - callback function
 	@param {object} scope - Scope for nested queries
 	@return {any} - Result data object

	@example
 Standard sync call:
    alasql('CREATE TABLE one');
 Query:
 	var res = alasql('SELECT * FROM one');
 Call with parameters:
 	var res = alasql('SELECT * FROM ?',[data]);
 Standard async call with callback function:
 	alasql('SELECT * FROM ?',[data],function(res){
		console.log(data);
 	});
 Call with scope for subquery (to pass common values):
    var scope = {one:{a:2,b;20}}
    alasql('SELECT * FROM ? two WHERE two.a = one.a',[data],null,scope);
 Call for fluent interface with data object:
    alasql(data).Where(function(x){return x.a == 10}).exec();
 Call for fluent interface without data object:
    alasql().From(data).Where(function(x){return x.a == 10}).exec();
 */

export default function logic(mem) {
	let yy = mem.grammar.yy;

	return function(sql?: any, params?: any, cb?: any, scope?: string) {
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
