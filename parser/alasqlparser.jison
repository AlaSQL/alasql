/*
//
// alasqlparser.jison
// SQL Parser for Alasql.js
// Date: 31.10.2014
// (c) Andrey Gershun
//
*/

%lex
%options case-insensitive
%%

\s+                                             /* skip whitespace */
'ALL'                                      		return 'ALL'
'ALTER'                                    		return 'ALTER'
'AND'											return 'AND'
'AS'                                      		return 'AS'

'BY'											return 'BY'

'CREATE'										return 'CREATE'
'CUBE'											return 'CUBE'
'DELETE'                                        return 'DELETE'
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
'INSERT'                                        return 'INSERT'
'INTO'                                         	return 'INTO'
'KEY'											return 'KEY'
'NOT'											return 'NOT'
'OR'											return 'OR'
'ORDER'	                                      	return 'ORDER'
'PLAN'                                        	return 'PLAN'
'PRIMARY'										return 'PRIMARY'
'QUERY'                                        	return 'QUERY'
'ROLLUP'										return 'ROLLUP'
'SELECT'                                        return 'SELECT'
'SET'                                        	return 'SET'
'SETS'                                        	return 'SETS'
'TABLE'											return 'TABLE'
'TRUE'						  					return 'TRUE'
'UPDATE'                                        return 'UPDATE'
'VALUES'                                        return 'VALUES'
'WHERE'                                         return 'WHERE'

'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
'>'												return 'GT'
'>='											return 'GE'
'<'												return 'LT'
'<='											return 'LE'
'='												return 'EQ'
'!='											return 'NE'
'<>'											return 'NE'
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
	: Statements SEMICOLON Statement
		{ $$ = $1; $1.push($3); }
	| Statement
		{ $$ = [$1]; }
	| 
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
		{ $$ = { from: [$2] }; } 
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
	: JOIN Table OnClause
		{ $$ = new yy.Join({table:$1}); yy.extend($$, $3); }
	;

OnClause
	: ON Expression
		{ $$ = {on: $2}; }
	| USING ColumnList
		{ $$ = {using: $2}; }
	;

WhereClause
	: { $$ = null; }
	| WHERE Expression
		{ $$ = {where:$2}; }
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
	: Expression ASC
		{ $$ = new yy.OrderExpression({expression: $1, order:$2.toUpperCase()}) }
	| Expression DESC
		{ $$ = new yy.OrderExpression({expression: $1, order:$2.toUpperCase()}) }
	| Expression
		{ $$ = new yy.OrderExpression({expression: $1}) }
	;

LimitClause
	: { $$ = null; }
	| LIMIT Expression OffsetClause
		{ $$ = {limit:$3}; yy.extend($$, $3)}
	;

OffsetClause
	: { $$ = null; }
	| OFFSET Expression 
		{ $$ = {offset:$3}}
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
	: FuncValue
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
		{ $$ = new yy.StringValue({value: $1}); }
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
	| NOT Expression
		{ $$ = new yy.UniOp({op:'NOT' , right:$2}); }
	| MINUS Expression
		{ $$ = new yy.UniOp({op:'-' , right:$2}); }
	| LPAR Expression RPAR
		{ $$ = new yy.UniOp({right: $2}); }
	;

