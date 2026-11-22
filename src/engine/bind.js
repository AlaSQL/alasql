/*
	bind: what the names in a statement refer to, worked out in one place (#2723).

	This is the first part: table references (#2705). A table in a statement is written as
	table or as db.table, and every statement used to find the database of it with its own
	`this.table.databaseid || databaseid`. A statement that forgot the first half worked on the
	current database (#2185, #2201, #2704). Now a statement asks bind.table().

	Columns come next: one scope per SELECT with its sources and a link to the outer SELECT, and
	on each Column the source and the column it refers to. Until then Column.toJS finds its
	source while the code is generated, as before.
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

	internal.bind = {table};
}
