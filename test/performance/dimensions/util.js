// Helpers for dimensions that use tables

// The table object of the current database, in old and new releases
function table(alasql, name) {
	const db = alasql.databases && alasql.databases[alasql.useid];
	return (db && db.tables[name]) || (alasql.tables && alasql.tables[name]);
}

// Replace the rows of a table without going through INSERT (fast, and the same in every release)
function load(alasql, name, rows) {
	table(alasql, name).data = rows.map(r => Object.assign({}, r));
}

module.exports = {table, load};
