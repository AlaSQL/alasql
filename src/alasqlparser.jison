/*
//
// alasqlparser.jison
// SQL Parser for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

%lex
%options case-insensitive
%%

\s+                                             /* skip whitespace */
'ALL'                                      		return 'ALL'
'ALTER'                                    		return 'ALTER'
'AND'											return 'AND'
'ANTI'											return 'ANTI'
'ANY'											return 'ANY'
'AS'                                      		return 'AS'
'ASC'                                      		return 'DIRECTION'
'AVG'                                      		return 'AVG'

'BETWEEN'										return 'BETWEEN'
'NOT BETWEEN'									return 'NOT_BETWEEN'
'BY'											return 'BY'

"CASE"											return "CASE"
'COLLATE'										return 'COLLATE'
"CONSTRAINT"									return "CONSTRAINT"
"COUNT"											return "COUNT"
'CREATE'										return 'CREATE'
"CROSS"											return "CROSS"
'CUBE'											return 'CUBE'
'DELETE'                                        return 'DELETE'
'DESC'                                          return 'DIRECTION'
'DISTINCT'                                      return 'DISTINCT'
'DROP'											return 'DROP'

'END'											return 'END'
'ELSE'											return 'ELSE'
'EXCEPT'										return 'EXCEPT'
'EXISTS'										return 'EXISTS'
'EXPLAIN'                                       return 'EXPLAIN'
'FALSE'											return 'FALSE'
'FIRST'											return 'FIRST'
'FOREIGN'										return 'FOREIGN'
'FROM'                                          return 'FROM'
'GROUP'                                      	return 'GROUP'
'GROUPING'                                     	return 'GROUPING'
'HAVING'                                        return 'HAVING'
'IF'											return 'IF'
'IN'											return 'IN'
'INNER'                                         return 'INNER'
'INSERT'                                        return 'INSERT'
'INTERSECT'                                     return 'INTERSECT'
'INTO'                                         	return 'INTO'
'JOIN'                                         	return 'JOIN'
'KEY'											return 'KEY'
'LAST'											return 'LAST'
'LEFT'											return 'LEFT'
'LIKE'											return 'LIKE'
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
'OUTER'											return 'OUTER'
'PLAN'                                        	return 'PLAN'
'PRIMARY'										return 'PRIMARY'
'QUERY'                                        	return 'QUERY'
'REFERENCES'                                    return 'REFERENCES'
'RENAME'                                        return 'RENAME'
'RIGHT'                                        	return 'RIGHT'
'ROLLUP'										return 'ROLLUP'
'SELECT'                                        return 'SELECT'
'SEMI'                                        	return 'SEMI'
'SET'                                        	return 'SET'
'SETS'                                        	return 'SETS'
'SOME'                                        	return 'SOME'
"SUM"											return "SUM"
'TABLE'											return 'TABLE'
'THEN'											return 'THEN'
'TO'											return 'TO'
'TOP'											return 'TOP'
'TRUE'						  					return 'TRUE'
'UNION'                                         return 'UNION'
'UPDATE'                                        return 'UPDATE'
'USING'                                         return 'USING'
'VALUES'                                        return 'VALUES'
'WHEN'                                          return 'WHEN'
'WHERE'                                         return 'WHERE'

/*
[0-9]+											return 'NUMBER'
[0-9]+\.[0-9]*									return 'NUMBER'
*/
(\d*[.])?\d+									return 'NUMBER'
'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
'%'												return 'PERCENT'
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
':'												return 'COLON'
';'												return 'SEMICOLON'
'$'												return 'DOLLAR'
'?'												return 'QUESTION'

[a-zA-Z_][a-zA-Z_0-9]*                       	return 'LITERAL'
['](\\.|[^'])*[']                               return 'STRING'
["](\\.|[^"])*["]                               return 'STRING'
<<EOF>>               							return 'EOF'
.												return 'INVALID'

/lex
%
%left COMMA
%left OR
%left BETWEEN NOT_BETWEEN
%left AND
%left GT GE LT LE EQ NE
%left IN
%left NOT
%left LIKE
%left PLUS MINUS
%left STAR SLASH PERCENT
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
	: SelectClause IntoClause FromClause WhereClause GroupClause OrderClause LimitClause UnionClause 
		{   yy.extend($$,$1); yy.extend($$,$3); yy.extend($$,$4); 
		    yy.extend($$,$5); yy.extend($$,$6);yy.extend($$,$7); 
		    yy.extend($$,$8); 
		    $$ = $1;
		    if(yy.exists) $$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) $$.queries = yy.queries;
			delete yy.queries;
		}
	;

SelectClause
	: SELECT DISTINCT TopClause ResultColumns  
		{ $$ = new yy.Select({ columns:$4, distinct: true }); yy.extend($$, $3); }
	| SELECT ALL TopClause ResultColumns  
		{ $$ = new yy.Select({ columns:$4, all:true }); yy.extend($$, $3); }
	| SELECT TopClause ResultColumns  
		{ $$ = new yy.Select({ columns:$3 }); yy.extend($$, $2); }
/*	| SELECT NumValue
		{ $$ = new yy.Select( value: $2); }
*/	;

TopClause
	: TOP NumValue  
		{ $$ = {top: $2}; }
	| { $$ = null; }
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
		{ $$ = $2; $$.as = $4 }	
	| LPAR Select RPAR AS LITERAL
		{ $$ = $2; $$.as = $5 }	
	| Table LITERAL
		{ $$ = $1; $1.as = $2 }
	| Table AS LITERAL
		{ $$ = $1; $1.as = $3 }
	| Table 
		{ $$ = $1; }
	| ParamValue LITERAL 
		{ $$ = $1; $1.as = $2; }
	| ParamValue AS LITERAL 
		{ $$ = $1; $1.as = $3; }
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
	: { $$ = "INNER"; }
	| INNER 
		{ $$ = "INNER"; }
	| LEFT 
		{ $$ = "LEFT"; }
	| RIGHT 
		{ $$ = "RIGHT"; }
	| FULL OUTER 
		{ $$ = "OUTER"; }
	| OUTER 
		{ $$ = "OUTER"; }
	| SEMI 
		{ $$ = "SEMI"; }
	| ANTI 
		{ $$ = "ANTI"; }
	| CROSS 
		{ $$ = "INNER"; }
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

UnionClause
	:   { $$ = null; }
	| UNION Select
		{ $$ = {union: $2} ; }
	| UNION ALL Select
		{ $$ = {unionall: $3} ; }
	| EXCEPT Select
		{ $$ = {except: $2} ; }
	| INTERSECT Select
		{ $$ = {intersect: $2} ; }
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
	| LIMIT NumValue OffsetClause
		{ $$ = {limit:$2}; yy.extend($$, $3)}
	;

OffsetClause
	: { $$ = null; }
	| OFFSET NumValue 
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
	| ParamValue
		{ $$ = $1; }
	| ExistsValue
		{ $$ = $1; }
	| CaseValue
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
	| FIRST { $$ = $1; }
	| LAST { $$ = $1; }
	;

FuncValue
/*	: LITERAL LPAR Expression RPAR
		{ $$ = new yy.FuncValue({funcid: $1, expression: $3}); }
*/	
	: LITERAL LPAR ExprList RPAR
		{ $$ = new yy.FuncValue({funcid: $1, args: $3}); }
	| LITERAL LPAR RPAR
		{ $$ = new yy.FuncValue({funcid: $1}); }
	;

ExprList
	: Expression
		{ $$ = [$1]; }
	| ExprList COMMA Expression
		{ $1.push($3); $$ = $1 }
	;

NumValue
	: NUMBER
		{ $$ = new yy.NumValue({value:$1}); }
/*	| MINUS NUMBER
		{ $$ = new yy.NumValue({value:-$2}); }
*/	;

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

ExistsValue
	: EXISTS LPAR Select RPAR
		{ 
			if(!yy.exists) yy.exists = [];
			$$ = new yy.ExistsValue({value:$3, existsidx:yy.exists.length}); 
			yy.exists.push($3);
		}
	;


ParamValue
	: DOLLAR LITERAL
		{ $$ = new yy.ParamValue({param: $2}); }
	| COLON LITERAL
		{ $$ = new yy.ParamValue({param: $2}); }
	| QUESTION
		{ 
			if(typeof yy.question == 'undefined') yy.question = 0; 
			$$ = new yy.ParamValue({param: yy.question++}); 
		}
	;


CaseValue
	: CASE Expression WhensList ElseClause END
		{ $$ = new yy.CaseValue({expression:$2, whens: $3, elses: $4}); }
	| CASE WhensList ElseClause END
		{ $$ = new yy.CaseValue({whens: $2, elses: $3}); }
	;
WhensList
	: WhensList When
		{ $$ = $1; $$.push($2); }
	| When
		{ $$ = [$1]; }
	;

When
	: WHEN Expression THEN Expression
		{ $$ = {when: $2, then: $4 }; }
	;

ElseClause
	: ELSE Expression
		{ $$ = $2; }
	| 
		{$$ = null; } 
	; 

Op
	: Expression LIKE Expression
		{ $$ = new yy.Op({left:$1, op:'LIKE', right:$3}); }
	| Expression PLUS Expression
		{ $$ = new yy.Op({left:$1, op:'+', right:$3}); }
	| Expression MINUS Expression
		{ $$ = new yy.Op({left:$1, op:'-', right:$3}); }
	| Expression STAR Expression
		{ $$ = new yy.Op({left:$1, op:'*', right:$3}); }
	| Expression SLASH Expression
		{ $$ = new yy.Op({left:$1, op:'/', right:$3}); }
	| Expression PERCENT Expression
		{ $$ = new yy.Op({left:$1, op:'%', right:$3}); }


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

	| Expression CondOp AllSome LPAR Select RPAR
		{ 
			if(!yy.queries) yy.queries = []; 
			$$ = new yy.Op({left:$1, op:$2 , allsome:$3, right:$5, queriesidx: yy.queries.length}); 
			yy.queries.push($5);  
		}

	| Expression CondOp AllSome LPAR ExprList RPAR
		{ 
			$$ = new yy.Op({left:$1, op:$2 , allsome:$3, right:$5}); 
		}

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

	| Expression IN LPAR Select RPAR
		{ 
			if(!yy.queries) yy.queries = []; 
			$$ = new yy.Op({left: $1, op:'IN', right:$4, queriesidx: yy.queries.length});
			yy.queries.push($4);  
		}

	| Expression NOT IN LPAR Select RPAR
		{ 
			if(!yy.queries) yy.queries = []; 
			$$ = new yy.Op({left: $1, op:'NOT IN', right:$5, queriesidx: yy.queries.length});
			yy.queries.push($5);  
		}

	| Expression IN LPAR ExprList RPAR
		{ $$ = new yy.Op({left: $1, op:'IN', right:$4}); }

	| Expression NOT IN LPAR ExprList RPAR
		{ $$ = new yy.Op({left: $1, op:'NOT IN', right:$5}); }

	/* 
		Hack - it impossimle to parse BETWEEN AND and AND expressions with grammar 
		at least, I do not know how.
	*/
	| Expression BETWEEN Expression
		{ $$ = new yy.Op({left:$1, op:'BETWEEN', right:$3 }); }
	| Expression NOT_BETWEEN Expression
		{ $$ = new yy.Op({left:$1, op:'NOT BETWEEN', right:$3 }); }
	;


CondOp 
	: GT { $$ = $1; }
	| GE { $$ = $1; }
	| LT { $$ = $1; }
	| LE { $$ = $1; }
	| EQ { $$ = $1; }
	| NE { $$ = $1; }
	;

AllSome
	: ALL
		{ $$ = 'ALL'; }
	| SOME
		{ $$ = 'SOME'; }
	| ANY
		{ $$ = 'ANY'; }
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
	: INSERT INTO Table VALUES ValuesListsList
		{ $$ = new yy.Insert({into:$3, values: $5}); }
	| INSERT INTO Table LPAR ColumnsList RPAR VALUES ValuesListsList
		{ $$ = new yy.Insert({into:$3, columns: $5, values: $8}); }
	| INSERT INTO Table Select
		{ $$ = new yy.Insert({into:$3, select: $4}); }
	| INSERT INTO Table LPAR ColumnsList RPAR Select
		{ $$ = new yy.Insert({into:$3, columns: $5, select: $7}); }
	;

ValuesListsList
	: LPAR ValuesList RPAR
		{ $$ = [$2]; }
	| ValuesListsList COMMA LPAR ValuesList RPAR
		{$$ = $1; $1.push($4)}
	;

ValuesList
	: Expression
		{ $$ = [$1]; }
	| ValuesList COMMA Expression
		{$$ = $1; $1.push($3)}
	;

Value
	: NumValue
	| StringValue
	| LogicValue
	| NullValue
	| DateValue
	| ParamValue
	;

ColumnsList
	: Column
		{ $$ = [$1]; }
	| ColumnsList COMMA Column
		{$$ = $1; $1.push($3)}
	;

/* CREATE TABLE */

CreateTable
	:  CREATE TemporaryClause TABLE IfNotExists Table LPAR CreateTableDefClause RPAR
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
	: ColumnDefsList COMMA ConstraintsList
		{ $$ = {columns: $1, constraints: $2}; }	
	| ColumnDefsList
		{ $$ = {columns: $1}; }	
	| AS Select
		{ $$ = {as: $2} }
	;

ConstraintsList
	: Constraint
		{ $$ = [$1];}
	| ConstraintsList COMMA Constraint
		{ $1.push($3); $$ = $1; }
	;

Constraint
	: ConstraintName PrimaryKey
		{ $2.csname = $1; $$ = $2; }
	| ConstraintName ForeignKey
		{ $2.csname = $1; $$ = $2; }
	;

ConstraintName
	:   { $$ = null }
	| CONSTRAINT LITERAL
		{ $$ = $2; }
	;

PrimaryKey
	: PRIMARY KEY LPAR ColsList RPAR
		{ $$ = {columns: $4}; }
	;

ForeignKey
	: FOREIGN KEY LPAR LITERAL RPAR REFERENCES LITERAL LPAR ColsList RPAR
		{ $$ = {tableid: $3, columns: $6}; }
	;

ColsList
	: LITERAL
		{ $$ = [$1]; }
	| ColsList COMMA LITERAL
		{ $$ = $1; $1.push($3); }
	;

ColumnDefsList
	: ColumnDef
		{ $$ = [$1];}
	| ColumnDefsList COMMA ColumnDef
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
	| FOREIGN KEY REFERENCES LITERAL LPAR LITERAL RPAR
		{$$ = {foreignkey:{tableid:$4, columnid: $6}};}
	| NOT NULL
		{$$ = {notnull:true};}
	;

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
		{ $$ = new yy.AlterTable({table:$3, renameto: $6});}
	| ALTER TABLE Table ADD COLUMN ColumnDef
		{ $$ = null; }
	;

