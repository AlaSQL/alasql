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
'EXPLAIN'                                       return 'EXPLAIN'
'QUERY'                                        	return 'QUERY'
'PLAN'                                        	return 'PLAN'
'SELECT'                                        return 'SELECT'
'DISTINCT'                                      return 'DISTINCT'
'ALL'                                      		return 'ALL'
'FROM'                                          return 'FROM'
'WHERE'                                         return 'WHERE'
'GROUP BY'                                      return 'GROUPBY'
'HAVING'                                        return 'HAVING'
'ORDER BY'                                      return 'ORDERBY'
'AS'                                      		return 'AS'

'INSERT'                                        return 'INSERT'
'INTO'                                         	return 'INTO'
'VALUES'                                        return 'VALUES'

'DELETE'                                        return 'DELETE'
'FROM'                                        	return 'FROM'

'UPDATE'                                        return 'UPDATE'
'SET'                                        	return 'SET'

'CREATE'										return 'CREATE'
'TABLE'											return 'TABLE'
'DROP'											return 'DROP'
'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
','												return 'COMMA'
';'												return 'SEMICOLON'
'>'												return 'GT'
'>='											return 'GE'
'<'												return 'LT'
'<='											return 'LE'
'='												return 'EQ'
'!='											return 'NE'
'<>'											return 'NE'
'AND'											return 'AND'
'OR'											return 'OR'
'NOT'											return 'NOT'
'TRUE'						  					return 'TRUE'
'FALSE'											return 'FALSE'

[a-zA-Z_][a-zA-Z_0-9]*                       	return 'LITERAL'
[0-9]+											return 'NUMBER'
'('												return 'LPAR'
')'												return 'RPAR'
'.'												return 'DOT'
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
%left UMINUS

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
		{ $$ = $2 }
	| EXPLAIN QUERY PLAN Statement
		{ $$ = $4 }
	;

Statement
	: Select
	| Insert
	| Update
	| Delete
	| CreateTable
	| DropTable
	;



WithSelectClause
	: WITH WithTables Select
		{ $$ = $3; }
	| WITH RECURSIVE WithTables Select
		{ $$ = $4; }
	| Select
		{ $$ = $1;}
	;

Select
	: SelectClause IntoClause FromClause WhereClause GroupClause OrderClause LimitClause
		{ $$ = $1; yy.extend($$,$1); yy.extend($$,$3); yy.extend($$,$4); yy.extend($$,$5); yy.extend($$,$6);yy.extend($$,$7); }
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
	: FROM FromTables
		{ $$ = { from: $2 }; }
	| FROM JoinClause
		{ $$ = $2; }
	;

FromTables
	: FromTables COMMA FromTable
		{ $$ = $1; $1.push($3); }
	| FromTable
		{ $$ = [$1]; }
	;

FromTable
	: FromTableSubQuery LITERAL
		{ $$ = $1; $1.alias = $2 }
	| FromTableSubQuery
		{ $$ = $1; }
	;

FromTableSubQuery
	: Table
		{ $$ = $1; } 
	| SubQuery
		{ $$ = $1; }
	;

Table
	: LITERAL DOT LITERAL
		{ $$ = new yy.Table({databaseid: $1, tableid:$3});}
	| LITERAL
		{ $$ = new yy.Table({tableid: $1});}
	;

SubQuery
	: LPAR Select RPAR
		{ $$ = new yy.SubQuery({select:$2}); }
	;

JoinClause 
	: FromTableSubQuery JoinTables
		{ $$ = {from: [$1], joins: $2}; }
	;

JoinTables
	: JoinTables JoinTable
		{ $$ = $1; $1.push($2); } 
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
		{ $$ = {where:$1}; }
	;

GroupClause
	: { $$ = null; }
	| GROUPBY GroupFields HavingClause
		{ $$ = {group:$3}}
	;

HavingClause
	: { $$ = null; }
	| HAVING Expression
		{ $$ = {having:$3}}
	;

OrderClause
	: { $$ = null; }
	| ORDERBY GroupFields
		{ $$ = {group:$3}}
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
		{ $1.alias = $3; $$ = $1;}
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

Insert
	: INSERT INTO LITERAL VALUES LPAR NUMBER RPAR
		{ $$ = new yy.Insert({into:$3, values: $6}); }
	;
