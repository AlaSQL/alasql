/*
	bind: what the names in a statement refer to, worked out in one place (#2723).

	This is the first part: table references (#2705). A table in a statement is written as
	table or as db.table, and every statement used to find the database of it with its own
	`this.table.databaseid || databaseid`. A statement that forgot the first half worked on the
	current database (#2185, #2201, #2704). Now a statement asks bind.table().

	The second part is columns. bind.scope() makes one scope per SELECT: its sources in the
	order of FROM and JOIN, each with its columns when they are known, and a link to the scope
	of the SELECT around it. bind.column() says which source and which column a Column refers
	to in a scope, bind.read() applies the 4.x rule of the place, and bind.write() writes the
	code of the read. The scope is also what the rest of the compiler asks about the columns
	of the sources (owner, has, aliases). It replaced a dictionary of default columns that
	every SELECT built, and it is passed to every toJS as the third argument, still named
	defcols there.

	The rules of bind.column() are the rules of 4.x where 4.x made a choice:
	  - a name found in the column definitions of exactly one source is that source's column
	  - found in two, it is ambiguous (4.x throws)
	  - found in none, and the SELECT has sources without column definitions (a subquery, a
	    parameter, a function, a table made without columns): the source is decided per row,
	    the first of those sources whose row has the key (#2680)
	  - else it is looked up in the SELECT around it

	4.x does not read what these rules say in every place. Where it reads something else and
	queries rely on it, a 4.x rule says what (bind.read). Each rule names the issue that removes
	it in 5.0.
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
		// place is set while the arguments of a built-in function are compiled (bind.place)
		// names and unknown are made at the first bare name (index)
		return {
			sources,
			outer,
			place: undefined,
			aliases: undefined,
			names: undefined,
			unknown: undefined,
		};
	}

	/**
	 * The source of this SELECT whose column definitions have a name
	 * @param {object} sc The scope of the SELECT
	 * @param {string} columnid The name
	 * @returns {string|undefined} The alias of the source, '-' when more than one source defines
	 *   the name, undefined when none does. Sources without column definitions are not asked.
	 */
	function owner(sc, columnid) {
		const who = (sc.names || index(sc)).get(columnid);
		return who === undefined ? undefined : typeof who === 'string' ? who : '-';
	}

	// The names that the column definitions of this SELECT's sources have, each with the source
	// that defines it, or with the list of sources when more than one does. It is made once per
	// SELECT, at the first bare name, so that a name costs one lookup and not a walk over every
	// column of every source. sc.unknown is the list of the sources without column definitions.
	function index(sc) {
		const names = new Map();
		const unknown = [];
		const sources = sc.sources;
		for (let i = 0; i < sources.length; i++) {
			const columns = sources[i].columns;
			const alias = sources[i].alias;
			if (columns === null) {
				unknown.push(alias);
				continue;
			}
			for (let j = 0; j < columns.length; j++) {
				const columnid = columns[j].columnid;
				const who = names.get(columnid);
				if (who === undefined) names.set(columnid, alias);
				else if (typeof who === 'string') names.set(columnid, [who, alias]);
				else who.push(alias);
			}
		}
		sc.unknown = unknown;
		sc.names = names;
		return names;
	}

	/**
	 * Whether a source of this SELECT defines a name
	 * @returns {boolean|undefined} undefined when the source has no column definitions, or is no source here
	 */
	function has(sc, alias, columnid) {
		const sources = sc.sources;
		for (let i = 0; i < sources.length; i++) {
			if (String(sources[i].alias) === String(alias)) {
				return sources[i].columns === null ? undefined : defines(sources[i].columns, columnid);
			}
		}
	}

	// The names of the sources of this SELECT, each once, in the order of FROM and JOIN
	function aliases(sc) {
		if (!sc.aliases) {
			const list = [];
			for (let i = 0; i < sc.sources.length; i++) {
				const alias = String(sc.sources[i].alias);
				if (list.indexOf(alias) === -1) list.push(alias);
			}
			sc.aliases = list;
		}
		return sc.aliases;
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
	 *   {unresolved: true, column}     no source that can have the column
	 *   {unresolved: true, column, qualified: source}  written as source.column, and no source of that name
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
			const who = (sc.names || index(sc)).get(columnid);
			if (who !== undefined) {
				return typeof who === 'string'
					? {scope: depth, source: who, column: columnid}
					: {scope: depth, ambiguous: who, column: columnid};
			}
			// A source can be without a name (a FROM that is no table and has no alias), so the
			// length of the list says whether there is one
			const unknown = sc.unknown;
			if (unknown.length > 1) return {scope: depth, any: unknown, column: columnid};
			if (unknown.length) return {scope: depth, source: unknown[0], column: columnid};
		}
		// qualified is the source of a name written as source.column: no rule gives it another one
		return col.tableid
			? {unresolved: true, column: columnid, qualified: col.tableid}
			: {unresolved: true, column: columnid};
	}

	// The 4.x rules. Each takes the binding and the scope of the SELECT the reference is in, and
	// returns the binding that 4.x reads there, or undefined when the rule does not apply.
	const rules4x = {
		// A bare name that only a SELECT around this one has, in a correlated subquery: 4.x does
		// not look outward for a bare name. It reads the only source of the inner SELECT, where
		// the value is undefined, or nothing when the inner SELECT has several sources. Written
		// as source.column the outer column is read. Removed by #2644.
		notOuter(ref, sc, col) {
			if (ref.scope > 0 && !col.tableid) {
				return sc.sources.length === 1
					? {scope: 0, source: sc.sources[0].alias, column: ref.column}
					: {unresolved: true, column: ref.column};
			}
		},
		// A bare name that no source can have, in a SELECT with one source: 4.x reads that
		// source anyway, and the value is undefined in every row. It keeps `WHERE nosuch IS NULL`
		// and the like running. Removed by #3109, which makes the name an error. An alias of the
		// select list inside an aggregate in HAVING is read the same way today (`HAVING SUM(n) > 0`
		// with `COUNT(*) AS n`), and that reading is removed by #2878.
		// A name written as source.column with a source the SELECT does not have is not such a
		// name: 4.x fails on it when the query runs, and the rule leaves it alone (#3119).
		onlyTable(ref, sc) {
			if (ref.unresolved && !ref.qualified && sc.sources.length === 1) {
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
		row: ['notOuter', 'onlyTable'],
		function: ['notOuter', 'onlyTable', 'firstTable'],
		group: ['notOuter', 'onlyTable', 'firstTable'],
		select: ['notOuter', 'onlyTable', 'firstWithColumn'],
	};

	/**
	 * What 4.x reads for a binding: the binding itself, or what a 4.x rule makes of it
	 * @param {object} ref The binding from column()
	 * @param {object} sc The scope of the SELECT the reference is in
	 * @param {string} [place] 'row' (the default), 'function', 'group' or 'select'
	 * @param {object} col The yy.Column, for a rule that looks at how the name is written
	 * @returns {object} A binding as from column(), with rule and place when a rule was applied
	 */
	function read(ref, sc, place, col) {
		// A name that this SELECT resolves to one source, or to sources asked per row, is read
		// as the binding says. Every rule is about a name that is unresolved, ambiguous or outer.
		if (ref.scope === 0 && ref.ambiguous === undefined) return ref;
		place = place || 'row';
		const names = places[place];
		for (let i = 0; i < names.length; i++) {
			const res = rules4x[names[i]](ref, sc, col);
			if (res) {
				res.rule = names[i];
				res.place = place;
				return res;
			}
		}
		return ref;
	}

	/**
	 * The JavaScript that reads a column, written from what read() says
	 * @param {object} ref What 4.x reads: a binding, from read()
	 * @param {object} sc The scope of the SELECT the reference is in
	 * @param {string} context The JavaScript of the row object, which has one key per source
	 * @param {object} col The yy.Column, to see whether it is written as source.column
	 * @returns {string|undefined} undefined for what is not written from the binding yet: a
	 *   column of an outer SELECT, a name that is unresolved or ambiguous after the rules, and
	 *   `_`, which is the row of a source and no column. The caller keeps today's lookup for these.
	 */
	function write(ref, sc, context, col) {
		const columnid = ref.column;
		if (ref.scope !== 0 || ref.ambiguous || columnid === '_') return;
		if (ref.rule === 'firstWithColumn') {
			// The select list of a query without grouping: the sources without column definitions
			// before the first table that has the name are asked per row, and then that table
			// is read, with `?.` as its row can be missing in an outer join (#2680, #2873)
			const list = ref.any || [ref.source];
			const last = list.length - 1;
			return perRowJS(
				list,
				context,
				columnid,
				last,
				`${context}['${list[last]}']?.['${columnid}']`
			);
		}
		if (ref.any) return perRowJS(ref.any, context, columnid, ref.any.length, 'undefined');
		const source = ref.source;
		if (!(ref.rule || col.tableid || sc.sources.length === 1)) {
			// A bare name that only a source without column definitions can have. Beside other
			// sources its row is asked for the key, as 4.x does (#832).
			const sources = sc.sources;
			for (let i = 0; i < sources.length; i++) {
				if (sources[i].alias === source) {
					if (sources[i].columns === null)
						return perRowJS([source], context, columnid, 1, 'undefined');
					break;
				}
			}
		}
		return `${context}['${source}']['${columnid}']`;
	}

	// Asked per row: the first of the first count sources whose row has the key, and else rest
	function perRowJS(aliases, context, columnid, count, rest) {
		let js = rest;
		for (let i = count - 1; i >= 0; i--) {
			const row = `${context}['${aliases[i]}']`;
			js = `('${columnid}' in Object(${row}) ? ${row}['${columnid}'] : ${js})`;
		}
		return js;
	}

	internal.bind = {
		table,
		scope,
		column,
		read,
		write,
		owner,
		has,
		aliases,
		// For the test mode (Column.onBind): the binding of a column and what 4.x reads for it,
		// in the place the reference stands in. An error goes into the result, never into the query.
		beside(col, sc, place) {
			try {
				const ref = column(col, sc);
				return {ref, read: read(ref, sc, place || sc.place, col)};
			} catch (err) {
				return {ref: {error: err}, read: {error: err}};
			}
		},
		// Says that the references compiled from now on stand in a place with rules of its own
		// (the arguments of a built-in function), and returns the place before, to set it back.
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
