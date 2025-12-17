if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test Foreign Key and Primary Key Column Detection', function () {
	const test = 'fk_column_detection';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Primary key constraint should mark columns with primarykey property', function () {
		alasql('DROP TABLE IF EXISTS Table1');
		alasql(`CREATE TABLE Table1 (
			Column1 NUMERIC(2,0) NOT NULL,
			Column2 VARCHAR(50) NOT NULL,
			CONSTRAINT PK_Table1 PRIMARY KEY (Column1)
		)`);

		var db = alasql.databases['test' + test];
		var table1 = db.tables.Table1;

		// Check that primary key is set on the table
		assert(table1.pk, 'Table should have pk property');
		assert.deepEqual(table1.pk.columns, ['Column1']);

		// Check that Column1 is marked with primarykey property
		assert(table1.xcolumns.Column1.primarykey, 'Column1 should have primarykey property set');
	});

	it('B) Foreign key constraint should mark columns with foreignkey property', function () {
		alasql('DROP TABLE IF EXISTS Table2');
		alasql('DROP TABLE IF EXISTS Table1');

		alasql(`CREATE TABLE Table1 (
			Column1 NUMERIC(2,0) NOT NULL,
			Column2 VARCHAR(50) NOT NULL,
			CONSTRAINT PK_Table1 PRIMARY KEY (Column1)
		)`);

		alasql(`CREATE TABLE Table2 (
			Column1 NUMERIC(2,0) NOT NULL,
			Column2 NUMERIC(2,0) NOT NULL,
			CONSTRAINT PK_Table2 PRIMARY KEY (Column1, Column2),
			CONSTRAINT FK_Table2_Column1 FOREIGN KEY (Column1) REFERENCES Table1(Column1)
		)`);

		var db = alasql.databases['test' + test];
		var table2 = db.tables.Table2;

		// Check that foreign key constraint exists in checks
		var fkCheck = table2.checks.find(function (c) {
			return c.fk && c.id === 'FK_Table2_Column1';
		});
		assert(fkCheck, 'Foreign key constraint should exist in checks');

		// Check that Column1 is marked with foreignkey property
		assert(table2.xcolumns.Column1.foreignkey, 'Column1 should have foreignkey property set');

		// Verify the foreignkey property contains the correct information
		var fk = table2.xcolumns.Column1.foreignkey;
		assert.equal(fk.tableid, 'Table1', 'Foreign key should reference Table1');
		assert.equal(fk.columnid, 'Column1', 'Foreign key should reference Column1');
		assert.equal(fk.constraintid, 'FK_Table2_Column1', 'Foreign key should have correct constraint name');
	});

	it('C) Multiple foreign keys on different columns should all be marked', function () {
		alasql('DROP TABLE IF EXISTS Table3');
		alasql('DROP TABLE IF EXISTS TableA');
		alasql('DROP TABLE IF EXISTS TableB');

		alasql(`CREATE TABLE TableA (
			IdA INT PRIMARY KEY
		)`);

		alasql(`CREATE TABLE TableB (
			IdB INT PRIMARY KEY
		)`);

		alasql(`CREATE TABLE Table3 (
			RefA INT,
			RefB INT,
			CONSTRAINT FK_Table3_A FOREIGN KEY (RefA) REFERENCES TableA(IdA),
			CONSTRAINT FK_Table3_B FOREIGN KEY (RefB) REFERENCES TableB(IdB)
		)`);

		var db = alasql.databases['test' + test];
		var table3 = db.tables.Table3;

		// Check that both columns have foreignkey property
		assert(table3.xcolumns.RefA.foreignkey, 'RefA should have foreignkey property');
		assert(table3.xcolumns.RefB.foreignkey, 'RefB should have foreignkey property');

		// Verify correct references
		assert.equal(table3.xcolumns.RefA.foreignkey.tableid, 'TableA');
		assert.equal(table3.xcolumns.RefA.foreignkey.columnid, 'IdA');
		assert.equal(table3.xcolumns.RefB.foreignkey.tableid, 'TableB');
		assert.equal(table3.xcolumns.RefB.foreignkey.columnid, 'IdB');
	});

	it('D) Composite primary key should mark all columns', function () {
		alasql('DROP TABLE IF EXISTS TableComposite');
		alasql(`CREATE TABLE TableComposite (
			Key1 INT,
			Key2 INT,
			Data VARCHAR(50),
			CONSTRAINT PK_Composite PRIMARY KEY (Key1, Key2)
		)`);

		var db = alasql.databases['test' + test];
		var table = db.tables.TableComposite;

		// Both columns should be marked with primarykey property
		assert(table.xcolumns.Key1.primarykey, 'Key1 should have primarykey property');
		assert(table.xcolumns.Key2.primarykey, 'Key2 should have primarykey property');
		assert(!table.xcolumns.Data.primarykey, 'Data should not have primarykey property');
	});

	it('E) Inline foreign key should still work', function () {
		alasql('DROP TABLE IF EXISTS TableInline');
		alasql('DROP TABLE IF EXISTS TableRef');

		alasql(`CREATE TABLE TableRef (
			Id INT PRIMARY KEY
		)`);

		alasql(`CREATE TABLE TableInline (
			RefId INT FOREIGN KEY REFERENCES TableRef(Id)
		)`);

		var db = alasql.databases['test' + test];
		var table = db.tables.TableInline;

		// Inline foreign key should set the foreignkey property
		assert(table.xcolumns.RefId.foreignkey, 'RefId should have foreignkey property from inline definition');
	});

	it('F) Issue example - should detect foreign key in Table2.Column1', function () {
		alasql('DROP TABLE IF EXISTS Table2');
		alasql('DROP TABLE IF EXISTS Table1');

		alasql(`CREATE TABLE Table1 (
			Column1 NUMERIC(2,0) NOT NULL,
			Column2 VARCHAR(50) NOT NULL,
			Column3 DATETIME NOT NULL,
			Column4 DATETIME NOT NULL,
			Column5 VARCHAR(50) NOT NULL,
			Column6 DATETIME NOT NULL,
			CONSTRAINT PK_Table1 PRIMARY KEY (Column1),
			CONSTRAINT UC_Column1 UNIQUE (Column1),
			CONSTRAINT UC_Column3_Column4 UNIQUE (Column3, Column4)
		)`);

		alasql(`CREATE TABLE Table2 (
			Column1 NUMERIC(2,0) NOT NULL,
			Column2 NUMERIC(2,0) NOT NULL,
			Column3 VARCHAR(300) NOT NULL,
			Column4 VARCHAR(50) NOT NULL,
			Column5 DATETIME NOT NULL,
			Column6 NUMERIC(4,0) NOT NULL,
			CONSTRAINT PK_Table2 PRIMARY KEY (Column1, Column2),
			CONSTRAINT UC_PK_Table2 UNIQUE (Column1, Column2),
			CONSTRAINT FK_Table2_Column1 FOREIGN KEY (Column1) REFERENCES Table1(Column1)
		)`);

		var db = alasql.databases['test' + test];
		var table1 = db.tables.Table1;
		var table2 = db.tables.Table2;

		// Table1.Column1 should be marked as primary key
		assert(
			table1.xcolumns.Column1.primarykey,
			'Table1.Column1 should have primarykey property'
		);

		// Table2 columns should be marked as primary key
		assert(
			table2.xcolumns.Column1.primarykey,
			'Table2.Column1 should have primarykey property'
		);
		assert(
			table2.xcolumns.Column2.primarykey,
			'Table2.Column2 should have primarykey property'
		);

		// Table2.Column1 should be marked as foreign key
		assert(
			table2.xcolumns.Column1.foreignkey,
			'Table2.Column1 should have foreignkey property'
		);
		assert.equal(table2.xcolumns.Column1.foreignkey.tableid, 'Table1');
		assert.equal(table2.xcolumns.Column1.foreignkey.columnid, 'Column1');
	});
});
