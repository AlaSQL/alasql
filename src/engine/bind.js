/*
	bind: what the names in a statement refer to, worked out in one place (#2723).

	This is the first part: table references (#2705). A table in a statement is written as
	table or as db.table, and every statement used to find the database of it with its own
	`this.table.databaseid || databaseid`. A statement that forgot the first half worked on the
	current database (#2185, #2201, #2704). Now a statement asks bind.table().

	The second part is columns, and so far it is only worked out, not used. bind.scope() makes
	one scope per SELECT: its sources in the order of FROM and JOIN, each with its columns when
	they are known, and a link to the scope of the SELECT around it. bind.column() says which
	source and which column a Column refers to in a scope. Column.toJS still finds its source
	while the code is generated, as before. Only when a test sets Column.onBind does it ask
	bind.column() beside it, so that the two can be compared (test/bind/) before the generated
	code reads the binding. Without it a query pays for the scope and for nothing else.

	The rules of bind.column() are the rules of 4.x where 4.x made a choice:
	  - a name found in the column definitions of exactly one source is that source's column
	  - found in two, it is ambiguous (4.x throws)
	  - found in none, and the SELECT has sources without column definitions (a subquery, a
	    parameter, a function, a table made without columns): the source is decided per row,
	    the first of those sources whose row has the key (#2680)
	  - else it is looked up in the SELECT around it

	4.x does not read what these rules say in every place. Where it reads something else and
	queries rely on it, a 4.x rule says what (bind.read). Each rule names the issue that removes
	it in 5.0. Like the binding, the rules only run when a test sets Column.onBind.
*/

export default function install(alasql, internal) {
	/**
	 * The database a table reference points at
	 * @param {object} ref The reference as parsed: a yy.Table, or anything with tableid and an optional databaseid (db.table)
	 * @param {string} databaseid The database the statement runs in, used for a reference without one
	 * @returns {{databaseid: string, tableid: string, db: object}} db is undefined when there is no such database.
	 *   Whether the table has to exist is the statement's rule (IF EXISTS, its own error text), so it is not looked up here.
	 *   The names are returned, not kept on the node: a parsed statement is cached and can run in another database.
	 */
	function table(ref, databaseid) {
		const id = ref.databaseid || databaseid;
		return {databaseid: id, tableid: ref.tableid, db: alasql.databases[id]};
	}

	// The scopes of the SELECTs that are being compiled now, the innermost last. A subquery is
	// compiled inside the compile of the SELECT around it, so the scope before it is its outer one.
	const compiling = [];

	/**
	 * The scope of a SELECT: what its FROM and JOIN make visible
	 * @param {object} select The yy.Select
	 * @param {string} databaseid The database the statement runs in
	 * @param {object} [outer] The scope of the SELECT around it
	 * @returns {{sources: {alias: string, columns: {columnid: string}[]|null}[], outer: object|undefined}}
	 *   columns is null when the source does not say which columns it has. Never throws: a
	 *   missing table or database is the error of the compile step that reads it.
	 */
	function scope(select, databaseid, outer) {
		const sources = [];
		const add = (alias, ref) => {
			let columns = null;
			if (ref && ref.tableid) {
				const db = table(ref, databaseid).db;
				const def = db && db.tables && db.tables[ref.tableid];
				// the table's own list, not a copy: a scope is made for every compile
				if (def && def.columns && def.columns.length) columns = def.columns;
			}
			sources.push({alias, columns});
		};
		if (select.from) {
			for (const fr of select.from) add(fr.as || fr.tableid, fr instanceof alasql.yy.Table && fr);
		}
		if (select.joins) {
			for (const jn of select.joins) add(jn.as || (jn.table && jn.table.tableid), jn.table);
		}
		return {sources, outer};
	}

	function defines(columns, columnid) {
		for (let i = 0; i < columns.length; i++) if (columns[i].columnid === columnid) return true;
		return false;
	}

	/**
	 * What a column reference refers to in a scope
	 * @param {object} col The yy.Column (columnid, and tableid when it is written as source.column)
	 * @param {object} inner The scope of the SELECT the reference is in
	 * @returns {object} One of
	 *   {scope, source, column}        the column of one source; scope is 0 for the SELECT itself, 1 for the one around it, ...
	 *   {scope, any: [source], column} decided per row: the first of these sources whose row has the key
	 *   {scope, ambiguous: [source], column} found in the column definitions of more than one source
	 *   {unresolved: true, column}     no source of that name, or no source that can have the column
	 */
	function column(col, inner) {
		const columnid = col.columnid;
		let depth = 0;
		for (let sc = inner; sc; sc = sc.outer, depth++) {
			const sources = sc.sources;
			if (col.tableid) {
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].alias === col.tableid)
						return {scope: depth, source: col.tableid, column: columnid};
				}
				continue;
			}
			// The first source of each kind, and a list only when there is a second one. A source
			// can be without a name (a FROM that is no table and has no alias), so the count says
			// whether there is one.
			let found, founds, unknown, unknowns;
			let nFound = 0;
			let nUnknown = 0;
			for (let i = 0; i < sources.length; i++) {
				const columns = sources[i].columns;
				const alias = sources[i].alias;
				if (columns === null) {
					if (nUnknown++ === 0) unknown = alias;
					else (unknowns || (unknowns = [unknown])).push(alias);
				} else if (defines(columns, columnid)) {
					if (nFound++ === 0) found = alias;
					else (founds || (founds = [found])).push(alias);
				}
			}
			if (nFound > 1) return {scope: depth, ambiguous: founds, column: columnid};
			if (nFound) return {scope: depth, source: found, column: columnid};
			if (nUnknown > 1) return {scope: depth, any: unknowns, column: columnid};
			if (nUnknown) return {scope: depth, source: unknown, column: columnid};
		}
		return {unresolved: true, column: columnid};
	}

	// The 4.x rules. Each takes the binding and the scope of the SELECT the reference is in, and
	// returns the binding that 4.x reads there, or undefined when the rule does not apply.
	const rules4x = {
		// A bare name that no source can have, in a SELECT with one source: 4.x reads that
		// source anyway, and the value is undefined in every row. It keeps `WHERE nosuch IS NULL`
		// and the like running. Removed by #3109, which makes the name an error. An alias of the
		// select list inside an aggregate in HAVING is read the same way today (`HAVING SUM(n) > 0`
		// with `COUNT(*) AS n`), and that reading is removed by #2878.
		onlyTable(ref, sc) {
			if (ref.unresolved && sc.sources.length === 1) {
				return {scope: 0, source: sc.sources[0].alias, column: ref.column};
			}
		},
		// A bare name that two tables define, as the argument of a built-in function or in the
		// select list of a grouped query: 4.x reads the first source of FROM, whether that source
		// defines the name or not (#2917, #2930, #3111). Removed by #2928, which makes the name
		// an error as it is in a plain expression.
		firstTable(ref, sc) {
			if (ref.ambiguous && ref.scope === 0) {
				return {scope: 0, source: sc.sources[0].alias, column: ref.column};
			}
		},
		// A bare name that two tables define, alone in the select list of a query without
		// grouping: 4.x reads the first source that has it. A source without column definitions
		// before that one is asked per row (#2873). Removed by #2928.
		firstWithColumn(ref, sc) {
			if (!(ref.ambiguous && ref.scope === 0)) return;
			const any = [];
			for (let i = 0; i < sc.sources.length; i++) {
				const columns = sc.sources[i].columns;
				if (columns === null) any.push(sc.sources[i].alias);
				else if (defines(columns, ref.column)) {
					any.push(sc.sources[i].alias);
					break;
				}
			}
			return any.length === 1
				? {scope: 0, source: any[0], column: ref.column}
				: {scope: 0, any, column: ref.column};
		},
	};

	// The rules of each place a column reference can stand in. In 'row', a plain expression, an
	// ambiguous name is an error in 4.x too, so there is no rule for it.
	const places = {
		row: ['onlyTable'],
		function: ['onlyTable', 'firstTable'],
		group: ['onlyTable', 'firstTable'],
		select: ['onlyTable', 'firstWithColumn'],
	};

	/**
	 * What 4.x reads for a binding: the binding itself, or what a 4.x rule makes of it
	 * @param {object} ref The binding from column()
	 * @param {object} sc The scope of the SELECT the reference is in
	 * @param {string} [place] 'row' (the default), 'function', 'group' or 'select'
	 * @returns {object} A binding as from column(), with rule and place when a rule was applied
	 */
	function read(ref, sc, place) {
		place = place || 'row';
		const names = places[place];
		for (let i = 0; i < names.length; i++) {
			const res = rules4x[names[i]](ref, sc);
			if (res) {
				res.rule = names[i];
				res.place = place;
				return res;
			}
		}
		return ref;
	}

	internal.bind = {
		table,
		scope,
		column,
		read,
		// For the test mode (Column.onBind): the binding of a column and what 4.x reads for it,
		// in the place the reference stands in. An error goes into the result, never into the query.
		beside(col, sc, place) {
			try {
				const ref = column(col, sc);
				return {ref, read: read(ref, sc, place || sc.place)};
			} catch (err) {
				return {ref: {error: err}, read: {error: err}};
			}
		},
		// For the test mode: says that the references compiled from now on stand in a place
		// with rules of its own, and returns the place before, to set it back.
		place(name) {
			const sc = compiling[compiling.length - 1];
			if (!sc) return;
			const before = sc.place;
			sc.place = name;
			return before;
		},
		// Called by Select.compile around its work
		enter(select, databaseid) {
			const sc = scope(select, databaseid, compiling[compiling.length - 1]);
			compiling.push(sc);
			return sc;
		},
		leave() {
			compiling.pop();
		},
		// The scope of the SELECT that is being compiled, or undefined outside one
		current() {
			return compiling[compiling.length - 1];
		},
	};
}
