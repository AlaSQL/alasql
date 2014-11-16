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
'ADD'                                      		return 'ADD'
'ALL'                                      		return 'ALL'
'ALTER'                                    		return 'ALTER'
'AND'											return 'AND'
'ANTI'											return 'ANTI'
'ANY'											return 'ANY'
'AS'                                      		return 'AS'
'ASC'                                      		return 'DIRECTION'
'AUTO_INCREMENT'                                return 'AUTO_INCREMENT'
'AVG'                                      		return 'AVG'

'BETWEEN'										return 'BETWEEN'
'NOT BETWEEN'									return 'NOT_BETWEEN'
'BY'											return 'BY'

"CASE"											return "CASE"
'COLLATE'										return 'COLLATE'
"COLUMN"										return "COLUMN"
"CONSTRAINT"									return "CONSTRAINT"
"COUNT"											return "COUNT"
'CREATE'										return 'CREATE'
"CROSS"											return "CROSS"
'CUBE'											return 'CUBE'
'DATABASE'										return 'DATABASE'
'DEFAULT'                                       return 'DEFAULT'
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
'IDENTITY'										return 'IDENTITY'
'IN'											return 'IN'
'INDEX'											return 'INDEX'
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
"MODIFY"										return "MODIFY"
'NATURAL'										return 'NATURAL'
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
'USE'											return 'USE'
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
'['												return 'LBRA'
']'												return 'RBRA'
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
	: Statements SEMICOLON Statement
		{ $$ = $1; if($3) $1.push($3); }
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

	: { $$ = null; }
	| AlterTable	
	| CreateDatabase
	| CreateIndex
	| CreateTable
	| Delete
	| DropDatabase
	| DropIndex
	| DropTable
	| Insert
	| Select
	| UseDatabase
	| Update

/*	| AttachDatabase
	| DropTrigger
	| DropView
	| BeginTransaction
	| CommitTransaction
	| RollbackTransaction
	| EndTransaction
	| SavePoint
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
		{   yy.extend($$,$1); yy.extend($$,$2); yy.extend($$,$3); yy.extend($$,$4); 
		    yy.extend($$,$5); yy.extend($$,$6);yy.extend($$,$7); 
		    yy.extend($$,$8); 
		    $$ = $1;
		    if(yy.exists) $$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) $$.queries = yy.queries;
			delete yy.queries;
		}
/*	| SELECT NumValue
		{ $$ = new yy.Select({value: $2}); }
*/	;

SelectClause
	: SELECT DISTINCT TopClause ResultColumns  
		{ $$ = new yy.Select({ columns:$4, distinct: true }); yy.extend($$, $3); }
	| SELECT ALL TopClause ResultColumns  
		{ $$ = new yy.Select({ columns:$4, all:true }); yy.extend($$, $3); }
	| SELECT TopClause ResultColumns  
		{ $$ = new yy.Select({ columns:$3 }); yy.extend($$, $2); }
	;

TopClause
	: TOP NumValue  
		{ $$ = {top: $2}; }
	| { $$ = null; }
	;

IntoClause
	: {$$ = null}
	| INTO Table
		{$$ = {into: $2} }
	;

FromClause
	: FROM FromTablesList
		{ $$ = { from: $2 }; } 
	| FROM FromTable JoinTablesList
		{ $$ = { from: [$2], joins: $3 }; }
	|
		{ $$ = null; }
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
	| LPAR Select RPAR /* default alias */
		{ $$ = $2; $$.as = 'default' }	

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
	| ParamValue
		{ $$ = $1; $1.as = 'delault'; }
	;

Table
	: LITERAL DOT LITERAL
		{ $$ = new yy.Table({databaseid: $1.toLowerCase(), tableid:$3.toLowerCase()});}
	| LITERAL
		{ $$ = new yy.Table({tableid: $1.toLowerCase()});}
	;

JoinTablesList
	: JoinTablesList JoinTable
		{ $$ = $1; $1.push($2); } 
	| JoinTable
	 	{ $$ = [$1]; }
	;

JoinTable
	: JoinMode JOIN JoinTableAs OnClause
		{ $$ = new yy.Join($1); yy.extend($$, $3); yy.extend($$, $4); }
	;

JoinTableAs
	: Table
		{ $$ = {table: $1}; }
	| Table LITERAL
		{ $$ = {table: $1, as: $2.toLowerCase() } ; }
	| Table AS LITERAL
		{ $$ = {table: $1, as: $3.toLowerCase() } ; }
	| ParamValue LITERAL
		{ $$ = {param: $1, as: $2.toLowerCase() } ; }
	| ParamValue AS LITERAL
		{ $$ = {param: $1, as: $3.toLowerCase() } ; }
	| LPAR Select RPAR LITERAL
		{ $$ = {select: $1, as: $4.toLowerCase() } ; }
	| LPAR Select RPAR AS LITERAL
		{ $$ = {select: $1, as: $5.toLowerCase() } ; }
	;

JoinMode
	: JoinModeMode
		{ $$ = { joinmode: $1 } ; }
	| NATURAL JoinModeMode
		{ $$ = {joinmode: $1, natural:true} ; }
	;

JoinModeMode
	: { $$ = "INNER"; }
	| INNER 
		{ $$ = "INNER"; }
	| LEFT 
		{ $$ = "LEFT"; }
	| LEFT OUTER
		{ $$ = "LEFT"; }
	| RIGHT 
		{ $$ = "RIGHT"; }
	| RIGHT OUTER
		{ $$ = "RIGHT"; }
	| OUTER 
		{ $$ = "OUTER"; }
	| FULL OUTER 
		{ $$ = "OUTER"; }
	| SEMI 
		{ $$ = "SEMI"; }
	| ANTI
		{ $$ = "ANTI"; }
	| CROSS 
		{ $$ = "CROSS"; }
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
		{ $1.as = $3.toLowerCase(); $$ = $1;}
	| Expression AS LBRA NUMBER RBRA
		{ $1.as = $4; $$ = $1;}
	| Expression AS NUMBER
		{ $1.as = $3; $$ = $1;}
	| Expression
		{ $$ = $1; }
	;

Star
	: LITERAL DOT LITERAL DOT STAR
		{ $$ = new yy.Column({columid: $5, tableid: $3.toLowerCase(), databaseid:$1}); }	
	| LITERAL DOT STAR
		{ $$ = new yy.Column({columnid: $3, tableid: $1.toLowerCase()}); }	
	| STAR
		{ $$ = new yy.Column({columnid:$1}); }
	;

Column
	: LITERAL DOT LITERAL DOT LITERAL
		{ $$ = new yy.Column({columnid: $5.toLowerCase(), tableid: $3.toLowerCase(), databaseid:$1.toLowerCase()});}	
	| LITERAL DOT LITERAL
		{ $$ = new yy.Column({columnid: $3.toLowerCase(), tableid: $1.toLowerCase()});}	
	| LITERAL LBRA NUMBER RBRA
		{ $$ = new yy.Column({columnid: $3, tableid: $1.toLowerCase()});}	
	| LBRA NUMBER RBRA
		{ $$ = new yy.Column({columnid: $2});}	
	| LITERAL
		{ $$ = new yy.Column({columnid: $1.toLowerCase()});}	
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

PrimitiveValue
	: NumValue
		{ $$ = $1; }
	| StringValue
		{ $$ = $1; }
	| LogicValue
		{ $$ = $1; }
	| NullValue
		{ $$ = $1; }
	| ParamValue
		{ $$ = $1; }
	| FuncValue
		{ $$ = $1; }
	;


AggrValue
	: Aggregator LPAR Expression RPAR
		{ $$ = new yy.AggrValue({aggregatorid: $1.toUpperCase(), expression: $3}); }
	;

Aggregator
	: SUM { $$ = "SUM"; }
	| COUNT { $$ = "COUNT"; }
	| MIN { $$ = "MIN"; }
	| MAX { $$ = "MAX"; }
	| AVG { $$ = "AVG"; }
	| FIRST { $$ = "FIRST"; }
	| LAST { $$ = "LAST"; }
	;

FuncValue
/*	: LITERAL LPAR Expression RPAR
		{ $$ = new yy.FuncValue({funcid: $1, expression: $3}); }
*/	
	: LITERAL LPAR ExprList RPAR
		{ $$ = new yy.FuncValue({funcid: $1.toLowerCase(), args: $3}); }
	| LITERAL LPAR RPAR
		{ $$ = new yy.FuncValue({ funcid: $1.toLowerCase() }) }
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
		{ $$ = new yy.ParamValue({param: $2.toLowerCase()}); }
	| COLON LITERAL
		{ $$ = new yy.ParamValue({param: $2.toLowerCase()}); }
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
	| INSERT INTO Table DEFAULT VALUES
		{ $$ = new yy.Insert({into:$3, default: true}) ; }
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
		{ $$ = {columns: $1, constraints: $3}; }	
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
		{ $2.constraintid = $1; $$ = $2; }
	| ConstraintName ForeignKey
		{ $2.constraintid = $1; $$ = $2; }
	;

ConstraintName
	:   { $$ = null }
	| CONSTRAINT LITERAL
		{ $$ = $2.toLowerCase(); }
	;

PrimaryKey
	: PRIMARY KEY LPAR ColsList RPAR
		{ $$ = {type: 'PRIMARY KEY', columns: $4}; }
	;

ForeignKey
	: FOREIGN KEY LPAR ColsList RPAR REFERENCES LITERAL LPAR ColsList RPAR
		{ $$ = {type: 'FOREIGN KEY', columns: $4.toLowerCase(), tableid: $3.toLowerCase(), refcolumns: $6}; }
	;

ColsList
	: LITERAL
		{ $$ = [$1.toLowerCase()]; }
	| ColsList COMMA LITERAL
		{ $$ = $1; $1.push($3.toLowerCase()); }
	;

ColumnDefsList
	: ColumnDef
		{ $$ = [$1];}
	| ColumnDefsList COMMA ColumnDef
		{ $1.push($3); $$ = $1; }
	;

ColumnDef
	: LITERAL ColumnTypeName ColumnConstraintsClause
		{ $$ = new yy.ColumnDef({columnid:$1.toLowerCase()}); yy.extend($$,$2); yy.extend($$,$3);}
	| LITERAL ColumnConstraints
		{ $$ = new yy.ColumnDef({columnid:$1.toLowerCase()}); yy.extend($$,$2); }
	;

ColumnTypeName
	: LITERAL LPAR SignedNumber DOT SignedNumber RPAR
		{ $$ = {dbtypeid: $1.toUpperCase(), dbsize: $3, dbprecision: $5} }
	| LITERAL LPAR SignedNumber RPAR
		{ $$ = {dbtypeid: $1.toUpperCase(), dbsize: $3} }
	| LITERAL
		{ $$ = {dbtypeid: $1.toUpperCase()} }
	;

ColumnConstraintsClause
	: {$$ = null}
	| ColumnConstraintsList
		{ $$ = $1; }
	;


ColumnConstraintsList
	: ColumnConstraintsList ColumnConstraint
		{ yy.extend($1,$2); $$ = $1;}
	| ColumnConstraint
		{ $$ = $1; }
	;


ColumnConstraint 
	: PRIMARY KEY
		{$$ = {primarykey:true};}
	| FOREIGN KEY REFERENCES LITERAL LPAR LITERAL RPAR
		{$$ = {foreignkey:{tableid:$4.toLowerCase(), columnid: $6.toLowerCase()}};}
	| AUTO_INCREMENT
		{$$ = {auto_increment:true};}
	| IDENTITY LPAR NumValue COMMA NumValue RPAR
		{ $$ = {identity: [$3,$5]} }
	| DEFAULT PrimitiveValue
		{$$ = {default:$2};}
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
		{ $$ = new yy.AlterTable({table:$3, renameto: $6.toLowerCase()});}
	| ALTER TABLE Table ADD COLUMN ColumnDef
		{ $$ = new yy.AlterTable({table:$3, addcolumn: $6});}
	| ALTER TABLE Table MODIFY COLUMN ColumnDef
		{ $$ = new yy.AlterTable({table:$3, modifycolumn: $6});}
	| ALTER TABLE Table DROP COLUMN LITERAL
		{ $$ = new yy.AlterTable({table:$3, dropcolumn: $6.toLowerCase()});}
	;

CreateDatabase
	: CREATE DATABASE LITERAL
		{ $$ = new yy.CreateDatabase({databaseid:$3.toLowerCase() });}
	;

UseDatabase
	: USE DATABASE LITERAL
		{ $$ = new yy.UseDatabase({databaseid: $3.toLowerCase() });}	
	| USE LITERAL
		{ $$ = new yy.UseDatabase({databaseid: $2.toLowerCase() });}	
	;

DropDatabase
	: DROP DATABASE LITERAL
		{ $$ = new yy.DropDatabase({databaseid: $3.toLowerCase() });}	
	;

CreateIndex
	: CREATE INDEX LITERAL ON Table LPAR ColsList RPAR
		{ $$ = new yy.CreateIndex({indexid:$3.toLowerCase(), table:$5, columns:$7})}
	| CREATE UNIQUE INDEX LITERAL ON Table LPAR ColsList RPAR
		{ $$ = new yy.CreateIndex({indexid:$3.toLowerCase(), table:$5, columns:$7, unique:true})}
	;

DropIndex
	: DROP INDEX LITERAL
		{ $$ = new yy.DropIndex({indexid:$3.toLowerCase()});}
	;
