/* PART TWO */

/* UPDATE */

Update
	: UPDATE Table SET SetColumnsList WHERE Expression
		{ $$ = new yy.Update({table:$2, columns:$4, where:$6}); }
	| UPDATE Table SET SetColumnsList
		{ $$ = new yy.Update({table:$2, columns:$4}); }
	;

SetColumnsList
	: SetColumn
		{ $$ = [$1]; }
	| SetColumnsList COMMA SetColumn
		{ $$ = $1; $1.push($3); }
	;

SetColumn
	: Column EQ Expression
		{ $$ = new yy.SetColumn({columnid:$1, expression:$3})}
	;

/* DELETE */

Delete
	: DELETE FROM Table WHERE Expression
		{ $$ = new yy.Delete({table:$3, where:$5});}
	| DELETE FROM Table
		{ $$ = new yy.Delete({table:$3});}
	;

/* INSERT */

Insert
	: INSERT INTO Table VALUES LPAR ValuesList RPAR
		{ $$ = new yy.Insert({into:$3, values: $6}); }
	| INSERT INTO Table LPAR ColumnsList RPAR VALUES LPAR ValuesList RPAR
		{ $$ = new yy.Insert({into:$3, columns: $5, values: $9}); }
	;

ValuesList
	: Value
		{ $$ = [$1]; }
	| ValuesList COMMA Value
		{$$ = $1; $1.push($3)}
	;

Value
	: NumValue
	| StringValue
	| LogicValue
	;

ColumnsList
	: Column
		{ $$ = [$1]; }
	| ColumnsList COMMA Column
		{$$ = $1; $1.push($3)}
	;

/* CREATE TABLE */

CreateTable
	: CREATE TemporaryClause TABLE IfNotExists Table LPAR CreateTableDefClause ConstraintsClause RPAR
		{ 
			$$ = new yy.CreateTable({table:$5}); 
			yy.extend($$,$2); yy.extend($$,$4); 
			yy.extend($$,$7); yy.extend($$,$8);
		}
	;

TemporaryClause 
	: {$$ = null}
	| TEMPORARY
		{ $$ = {temporary:true}; }
	| TEMP
		{ $$ = {temporary:true}; }
	;

IfNotExists
	: { $$ = $1; }
	| IF NOT EXISTS
		{ $$ = {ifnotexists: true}; }
	;

CreateTableDefClause
	: ColumnDefList
		{ $$ = {columns: $1}; }
	| AS Select
		{ $$ = {as: $2} }
	;

ColumnDefList
	: ColumnDef
		{ $$ = [$1];}
	| ColumnDefList COMMA ColumnDef
		{ $1.push($3); $$ = $1; }
	;

ColumnDef
	: LITERAL ColumnTypeName ColumnConstraint
		{ $$ = new yy.ColumnDef({columnid:$1}); yy.extend($$,$2); yy.extend($$,$3);}
	| LITERAL ColumnConstraints
		{ $$ = new yy.ColumnDef({columnid:$1}); yy.extend($$,$2); }
	;

ColumnTypeName
	: LITERAL LPAR SignedNumber DOT SignedNumber RPAR
		{ $$ = {dbtypeid: $1, dbsize: $3, dbprecision: $5} }
	| LITERAL LPAR SignedNumber RPAR
		{ $$ = {dbtypeid: $1, dbsize: $3} }
	| LITERAL
		{ $$ = {dbtypeid: $1} }
	;

ColumnConstraint 
	: {$$ = null}
	| PRIMARY KEY
		{$$ = {primarykey:true};}
	| NOT NULL
		{$$ = {notnull:true};}
	;

ConstraintsClause
	: {$$ = null;}
/*	| COMMA ConstraintsList
		{$$ = {constraints:$2}}
*/
	;

ConstraintsList
	: ConstraintsList COMMA Constraint
		{$$=$1; $1.push($3)}
	| Constraint
		{$$ = [$1];}
	;

Constraint
	:;

/* DROP TABLE */

DropTable
	: DROP TABLE IF EXISTS Table
		{ $$ = new yy.DropTable({table:$5, ifexists:true}); }
	| DROP TABLE Table
		{ $$ = new yy.DropTable({table:$3}); }
	;

/* ALTER TABLE */

AlterTable
	: ALTER TABLE Table RENAME TO LITERAL
	| ALTER TABLE Table ADD COLUMN ColumnDef
	;

