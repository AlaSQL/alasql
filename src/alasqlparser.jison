/*
//
// alasqlparser.jison
// SQL Parser for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
//1
*/

%lex
%options case-insensitive
%%

\s+                                             /* skip whitespace */
'ALL'                                      		return 'ALL'
'ALTER'                                    		return 'ALTER'
'AND'											return 'AND'
'ANTI'											return 'ANTI'
'AS'                                      		return 'AS'
'ASC'                                      		return 'DIRECTION'
'AVG'                                      		return 'AVG'

'BY'											return 'BY'

'CREATE'										return 'CREATE'
'COLLATE'										return 'COLLATE'
"COUNT"											return "COUNT"
'CUBE'											return 'CUBE'
'DELETE'                                        return 'DELETE'
'DESC'                                          return 'DIRECTION'
'DISTINCT'                                      return 'DISTINCT'
'DROP'											return 'DROP'

'EXISTS'										return 'EXISTS'
'EXPLAIN'                                       return 'EXPLAIN'
'FALSE'											return 'FALSE'
'FROM'                                          return 'FROM'
'GROUP'                                      	return 'GROUP'
'GROUPING'                                     	return 'GROUPING'
'HAVING'                                        return 'HAVING'
'IF'											return 'IF'
'INNER'                                         return 'INNER'
'INSERT'                                        return 'INSERT'
'INTO'                                         	return 'INTO'
'JOIN'                                         	return 'JOIN'
'KEY'											return 'KEY'
'LEFT'											return 'LEFT'
'LIMIT'											return 'LIMIT'
"MAX"											return "MAX"
"MIN"											return "MIN"
'NOCASE'										return 'NOCASE'
'NOT'											return 'NOT'
'NULL'											return 'NULL'
'ON'											return 'ON'
'OFFSET'										return 'OFFSET'
'OR'											return 'OR'
'ORDER'	                                      	return 'ORDER'
'PLAN'                                        	return 'PLAN'
'PRIMARY'										return 'PRIMARY'
'QUERY'                                        	return 'QUERY'
'RIGHT'                                        	return 'RIGHT'
'ROLLUP'										return 'ROLLUP'
'SELECT'                                        return 'SELECT'
'SET'                                        	return 'SET'
'SETS'                                        	return 'SETS'
"SUM"											return "SUM"
'TABLE'											return 'TABLE'
'TRUE'						  					return 'TRUE'
'UPDATE'                                        return 'UPDATE'
'USING'                                         return 'USING'
'VALUES'                                        return 'VALUES'
'WHERE'                                         return 'WHERE'


'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
'>='											return 'GE'
'>'												return 'GT'
'<='											return 'LE'
'<>'											return 'NE'
'<'												return 'LT'
'='												return 'EQ'
'!='											return 'NE'
'('												return 'LPAR'
')'												return 'RPAR'
'.'												return 'DOT'
','												return 'COMMA'
';'												return 'SEMICOLON'

[a-zA-Z_][a-zA-Z_0-9]*                       	return 'LITERAL'
[0-9]+											return 'NUMBER'
['](\\.|[^'])*[']                               return 'STRING'
<<EOF>>               							return 'EOF'
.												return 'INVALID'

/lex
%
%left OR
%left AND
%left GT GE LT LE EQ NE
%left NOT
%left PLUS MINUS
%left STAR SLASH
/* %left UMINUS */

%start main

%%

main
	: Statements EOF
		{ return new yy.Statements({statements:$1}); }
	;

Statements
	: Statements Statement
		{ $$ = $1; $1.push($3); }
	| Statement SEMICOLON
		{ $$ = [$1]; }
	| Statement
		{ $$ = [$1]; }
	;

ExplainStatement
	: EXPLAIN Statement
		{ $$ = $2; $2.explain = true; }
	| EXPLAIN QUERY PLAN Statement
		{ $$ = $4;  $4.explain = true;}
	;

Statement
	: Select
	| Insert
	| Update
	| Delete
	| CreateTable
	| DropTable
	| AlterTable

/*	| AttachDatabase
	| DropIndex
	| DropTrigger
	| DropView
	| BeginTransaction
	| CommitTransaction
	| RollbackTransaction
	| EndTransaction
	| SavePoint
	| CreateIndex
	| CreateTrigger
	| CreateView
	| Reindex
	| StoreDatabase
	| StoreTable
	| RestoreDatabase
	| RestoreTable

	| IfElse
	| BeginEnd
	| While
	| Print
	| BulkInsert
	| Case

	| Declare
	| CreateFunction
	| CreateProcedure
	| Loop
	| ForLoop
	| DeclareCursor
	| OpenCursor
	| FetchCursor
*/
	;

/* WITH */

WithSelectClause
	: WITH WithTables Select
		{ $$ = $3; }
	| WITH RECURSIVE WithTables Select
		{ $$ = $4; }
	| Select
		{ $$ = $1;}
	;

WithTables :;

/* SELECT */

Select
	: SelectClause IntoClause FromClause WhereClause GroupClause OrderClause LimitClause
		{  yy.extend($$,$1); yy.extend($$,$3); yy.extend($$,$4); yy.extend($$,$5); yy.extend($$,$6);yy.extend($$,$7); $$ = $1; }
	;

SelectClause
	: SELECT DISTINCT ResultColumns  
		{ $$ = new yy.Select({ columns:$3, distinct: true }); }
	| SELECT ALL ResultColumns  
		{ $$ = new yy.Select({ columns:$3, all:true }); }
	| SELECT ResultColumns  
		{ $$ = new yy.Select({ columns:$2 }); }
	;

IntoClause
	: {$$ = null}
	| INTO Table
		{$$ = $2}
	;

FromClause
	: FROM FromTablesList
		{ $$ = { from: $2 }; } 
	| FROM Table JoinTablesList
		{ $$ = { from: [$2], joins: $3 }; }
	;

FromTablesList
	: FromTable
		{ $$ = [$1]; }
	| FromTablesList COMMA FromTable
		{ $$ = $1; $1.push($3); }
	;

FromTable
	: LPAR Select RPAR LITERAL
		{ $$ = new yy.SubQuery({select:$2}); $$.as = $2 }	
	| Table LITERAL
		{ $$ = $1; $1.as = $2 }
	| Table 
		{ $$ = $1; }
	;

Table
	: LITERAL DOT LITERAL
		{ $$ = new yy.Table({databaseid: $1, tableid:$3});}
	| LITERAL
		{ $$ = new yy.Table({tableid: $1});}
	;

JoinTablesList
	: JoinTablesList JoinTable
		{ $$ = $1; $1.push($2); } 
	| JoinTable
	 	{ $$ = [$1]; }
	;

JoinTable
	: JoinMode JOIN Table OnClause
		{ $$ = new yy.Join({table:$3, joinmode: $1}); yy.extend($$, $4); }
	;

JoinMode
	: {$$ = "INNER";}
	| LEFT {$$ = $1;}
	| RIGHT {$$ = $1;}
	| ANTI {$$ = $1;}
	;

OnClause
	: ON Expression
		{ $$ = {on: $2}; }
	| USING ColumnsList
		{ $$ = {using: $2}; }
	|
		{ $$ = null; }
	;

WhereClause
	: { $$ = null; }
	| WHERE Expression
		{ $$ = {where: new yy.Expression({expression:$2})}; }
	;

GroupClause
	: { $$ = null; }
	| GROUP BY GroupExpressionsList HavingClause
		{ $$ = {group:$3}; yy.extend($$,$4); }
	;

GroupExpressionsList
	: GroupExpression
		{ $$ = [$1]; }
	| GroupExpressionsList COMMA GroupExpression
		{ $$ = $1; $1.push($3); }
	;

GroupExpression
	: GROUPING SETS LPAR GroupExpressionsList RPAR
		{ $$ = new yy.GroupExpression({type:'GROUPING SETS', group: $4}); }
	| ROLLUP LPAR GroupExpressionsList RPAR
		{ $$ = new yy.GroupExpression({type:'ROLLUP', group: $3}); }
	| CUBE LPAR GroupExpressionsList RPAR
		{ $$ = new yy.GroupExpression({type:'CUBE', group: $3}); }
	| Expression
		{ $$ = $1; }
	;


HavingClause
	: { $$ = null; }
	| HAVING Expression
		{ $$ = {having:$2}}
	;

OrderClause
	: { $$ = null; }
	| ORDER BY OrderExpressionsList
		{ $$ = {order:$3}}
	;

OrderExpressionsList
	: OrderExpression
		{ $$ = [$1]; }
	| OrderExpressionsList COMMA OrderExpression
		{ $$ = $1; $1.push($3)}
	;

OrderExpression
	: Expression
		{ $$ = new yy.OrderExpression({expression: $1, direction:'ASC'}) }
	| Expression DIRECTION
		{ $$ = new yy.OrderExpression({expression: $1, direction:$2.toUpperCase()}) }
	| Expression COLLATE NOCASE
		{ $$ = new yy.OrderExpression({expression: $1, direction:'ASC', nocase:true}) }
	| Expression COLLATE NOCASE DIRECTION
		{ $$ = new yy.OrderExpression({expression: $1, direction:$4.toUpperCase(), nocase:true}) }
	;

LimitClause
	: { $$ = null; }
	| LIMIT Expression OffsetClause
		{ $$ = {limit:$2}; yy.extend($$, $3)}
	;

OffsetClause
	: { $$ = null; }
	| OFFSET Expression 
		{ $$ = {offset:$2}}
	;

ResultColumns
	: ResultColumns COMMA ResultColumn
		{ $1.push($3); $$ = $1; }
	| ResultColumn
		{ $$ = [$1]; }
	;

ResultColumn
	: Expression AS LITERAL
		{ $1.as = $3; $$ = $1;}
	| Expression
		{ $$ = $1; }
	;

Star
	: LITERAL DOT LITERAL DOT STAR
		{ $$ = new yy.Column({columid: $5, tableid: $3, databaseid:$1}); }	
	| LITERAL DOT STAR
		{ $$ = new yy.Column({columnid: $3, tableid: $1}); }	
	| STAR
		{ $$ = new yy.Column({columnid:$1}); }
	;

Column
	: LITERAL DOT LITERAL DOT LITERAL
		{ $$ = new yy.Column({columnid: $5, tableid: $3, databaseid:$1});}	
	| LITERAL DOT LITERAL
		{ $$ = new yy.Column({columnid: $3, tableid: $1});}	
	| LITERAL
		{ $$ = new yy.Column({columnid: $1});}	
	;

Expression
	: AggrValue
		{ $$ = $1; }
	| FuncValue
		{ $$ = $1; }
	| Op
		{ $$ = $1; }
	| Column
		{ $$ = $1; }
	| Star
		{ $$ = $1; }
	| NumValue
		{ $$ = $1; }
	| LogicValue
		{ $$ = $1; }
	| StringValue
		{ $$ = $1; }
	| NullValue
		{ $$ = $1; }
	;


AggrValue
	: Aggregator LPAR Expression RPAR
		{ $$ = new yy.AggrValue({aggregatorid: $1.toUpperCase(), expression: $3}); }
	;

Aggregator
	: SUM { $$ = $1; }
	| COUNT { $$ = $1; }
	| MIN { $$ = $1; }
	| MAX { $$ = $1; }
	| AVG { $$ = $1; }
	;

FuncValue
	: LITERAL LPAR Expression RPAR
		{ $$ = new yy.FuncValue({funcid: $1, expression: $3}); }
	;

NumValue
	: NUMBER
		{ $$ = new yy.NumValue({value:$1}); }
	;

LogicValue
	: TRUE
		{ $$ = new yy.LogicValue({value:true}); }
	| FALSE
		{ $$ = new yy.LogicValue({value:false}); }
	;

StringValue
	: STRING
		{ $$ = new yy.StringValue({value: $1.substr(1,$1.length-2).replace(/\'\'/g,"'")}); }
	;

NullValue
	: NULL
		{ $$ = new yy.NullValue({value:null}); }
	;

Op
	: Expression PLUS Expression
		{ $$ = new yy.Op({left:$1, op:'+' , right:$3}); }
	| Expression MINUS Expression
		{ $$ = new yy.Op({left:$1, op:'-' , right:$3}); }
	| Expression STAR Expression
		{ $$ = new yy.Op({left:$1, op:'*' , right:$3}); }
	| Expression SLASH Expression
		{ $$ = new yy.Op({left:$1, op:'/' , right:$3}); }
	| Expression GT Expression
		{ $$ = new yy.Op({left:$1, op:'>' , right:$3}); }
	| Expression GE Expression
		{ $$ = new yy.Op({left:$1, op:'>=' , right:$3}); }
	| Expression LT Expression
		{ $$ = new yy.Op({left:$1, op:'<' , right:$3}); }
	| Expression LE Expression
		{ $$ = new yy.Op({left:$1, op:'<=' , right:$3}); }
	| Expression EQ Expression
		{ $$ = new yy.Op({left:$1, op:'=' , right:$3}); }
	| Expression NE Expression
		{ $$ = new yy.Op({left:$1, op:'!=' , right:$3}); }
	| Expression AND Expression
		{ $$ = new yy.Op({left:$1, op:'AND' , right:$3}); }
	| Expression OR Expression
		{ $$ = new yy.Op({left:$1, op:'OR' , right:$3}); }
	| NOT Expression
		{ $$ = new yy.UniOp({op:'NOT' , right:$2}); }
	| MINUS Expression
		{ $$ = new yy.UniOp({op:'-' , right:$2}); }
	| LPAR Expression RPAR
		{ $$ = new yy.UniOp({right: $2}); }
	;

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
	| NullValue
	| DateValue
	;

ColumnsList
	: Column
		{ $$ = [$1]; }
	| ColumnsList COMMA Column
		{$$ = $1; $1.push($3)}
	;

/* CREATE TABLE */

CreateTable
	:  CREATE TemporaryClause TABLE IfNotExists Table LPAR CreateTableDefClause ConstraintsClause RPAR
		{ 
			$$ = new yy.CreateTable({table:$5}); 
			yy.extend($$,$2); 
			yy.extend($$,$4); 
			yy.extend($$,$7); 
			yy.extend($$,$8);
		}
	;

TemporaryClause 
	: { $$ = null; }
	| TEMPORARY
		{ $$ = {temporary:true}; }
	| TEMP
		{ $$ = {temporary:true}; }
	;

IfNotExists
	: { $$ = null; }
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

