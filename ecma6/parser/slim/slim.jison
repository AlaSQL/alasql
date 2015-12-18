/*
//
// alasqlparser.jison
// SQL Parser for Alasql.js
// Date: 03.11.2014
// Modified: 20.11.2014
// (c) 2014, Andrey Gershun
//
*/

%lex
%options case-insensitive
%%

'@['							return 'ATLBRA'
\[([^\]])*?\]					return 'BRALITERAL'
/*								{
									console.log(this.matched);
									if((this.matched+"").substr(0,6).toUpperCase() == 'ASSERT') {
										//this.less(2);
										return 'LBRA';
									} else {
										return 'BRALITERAL'
									}
								}
*/
\`([^\]])*?\`	   								 return 'BRALITERAL'
(['](\\.|[^']|\\\')*?['])+                       return 'STRING'
(["](\\.|[^"]|\\\")*?["])+                       return 'STRING'

\/\*(.*?)\*\/									return /* skip comments */

/*

\/\*
\*\/

*/
"--"(.*?)($|\r\n|\r|\n)							return /* return 'COMMENT' */

\s+                                             /* skip whitespace */
'||'											return 'OR'
'&&'											return 'AND'
'ABSOLUTE'                                 		return 'ABSOLUTE'
'ADD'                                      		return 'ADD'
'ALL'                                      		return 'ALL'
'ALTER'                                    		return 'ALTER'
'AND'											return 'AND'
'ANTI'											return 'ANTI'
'ANY'											return 'ANY'
'AS'                                      		return 'AS'
'ASSERT'                                      	return 'ASSERT'
'ASC'                                      		return 'DIRECTION'
'AVG'                                      		return 'AVG'

'BEGIN'											return 'BEGIN'
'BETWEEN'										return 'BETWEEN'
'NOT BETWEEN'									return 'NOT_BETWEEN'
'BY'											return 'BY'

'CASE'											return 'CASE'
'CAST'											return 'CAST'
'CHARSET'										return 'CHARSET'
'COLLATE'										return 'COLLATE'
"CONVERT"										return "CONVERT"
"COUNT"											return "COUNT"
"CROSS"											return "CROSS"
'DEFAULT'                                       return 'DEFAULT'
'DELETE'                                        return 'DELETE'
'DESC'                                          return 'DIRECTION'
'DISTINCT'                                      return 'DISTINCT'
'ENGINE'										return 'ENGINE'
'ENUM'											return 'ENUM'
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
'HELP'											return 'HELP'
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
'SOURCE'										return 'SOURCE'
'MATRIX'										return 'MATRIX'
"MAX"											return "MAX"
"MIN"											return "MIN"
"MINUS"											return "EXCEPT"
'NOCASE'										return 'NOCASE'
'NOT'											return 'NOT'
'NULL'											return 'NULL'
'OFF'											return 'OFF'
'ON'											return 'ON'
'OFFSET'										return 'OFFSET'
'OPEN'											return 'OPEN'
'OR'											return 'OR'
'ORDER'	                                      	return 'ORDER'
'OUTER'											return 'OUTER'
'RIGHT'                                        	return 'RIGHT'
'ROW'											return 'ROW'
'SELECT'                                        return 'SELECT'
'SET'                                        	return 'SET'
'SETS'                                        	return 'SETS'
'SOME'                                        	return 'SOME'
"SUM"											return "SUM"
'THEN'											return 'THEN'
'TO'											return 'TO'
'TOP'											return 'TOP'
'TRUE'						  					return 'TRUE'
'UNION'                                         return 'UNION'
'UNIQUE'                                        return 'UNIQUE'
'UPDATE'                                        return 'UPDATE'
'USE'											return 'USE'
'USING'                                         return 'USING'
'VALUE'                                        	return 'VALUE'
'VALUES'                                        return 'VALUES'
'WHEN'                                          return 'WHEN'
'WHERE'                                         return 'WHERE'

/*
[0-9]+											return 'NUMBER'
[0-9]+\.[0-9]*									return 'NUMBER'
*/
(\d*[.])?\d+									return 'NUMBER'

'->'											return 'ARROW'
'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
'%'												return 'PERCENT'
'!==='											return 'NEEQEQEQ'
'==='											return 'EQEQEQ'
'!=='											return 'NEEQEQ'
'=='											return 'EQEQ'
'>='											return 'GE'
'>'												return 'GT'
'<='											return 'LE'
'<>'											return 'NE'
'<'												return 'LT'
'='												return 'EQ'
'!='											return 'NE'
'('												return 'LPAR'
')'												return 'RPAR'

'@'												return 'AT'

'{'												return 'LCUR'
'}'												return 'RCUR'

/* '['												return 'LBRA' */
']'												return 'RBRA'

'.'												return 'DOT'
','												return 'COMMA'
':'												return 'COLON'
';'												return 'SEMICOLON'
'$'												return 'DOLLAR'
'?'												return 'QUESTION'


[a-zA-Z_][a-zA-Z_0-9]*                       	return 'LITERAL'

/*
[a-zA-ZА-Яа-я_][a-zA-ZА-Яа-я_0-9]*              return 'LITERAL'
*/
<<EOF>>               							return 'EOF'
.												return 'INVALID'

/lex
%
%left COMMA
%left OR
%left BETWEEN NOT_BETWEEN
%left AND
%left GT GE LT LE EQ NE EQEQ NEEQEQ EQEQEQ NEEQEQEQ
%left IN
%left NOT
%left LIKE
%left PLUS MINUS
%left STAR SLASH PERCENT
%left DOT ARROW
/* %left UMINUS */

%start main

%%

Literal
	: LITERAL
		{
			if (yy.casesensitive) $$ = $1;
			else $$ = $1.toLowerCase();
		}
	| BRALITERAL
		{ $$ = doubleq($1.substr(1,$1.length-2)); }
	;

main
	: Statements EOF
		{ return new yy.Statements({statements:$1}); }
	;

Statements
	: Statements SEMICOLON Statement
		{ $$ = $1; if($3) $1.push($3); }
	| Statement
		{ $$ = [$1]; }
	| ExplainStatement
		{ $$ = [$1]; }
	;

Statement

	: { $$ = null; }
	| Select
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
	: SelectModifier DISTINCT TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$4, distinct: true }); yy,extend($$, $1); yy.extend($$, $3); }
	| SelectModifier UNIQUE TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$4, distinct: true }); yy,extend($$, $1);yy.extend($$, $3); }
	| SelectModifier  ALL TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$4, all:true }); yy,extend($$, $1);yy.extend($$, $3); }
	| SelectModifier TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$3 }); yy,extend($$, $1);yy.extend($$, $2); }
	;

SelectModifier
	: SELECT
		{ $$ = null}
	| SELECT VALUE
		{ $$ = {modifier:'VALUE'}}
	| SELECT ROW
		{ $$ = {modifier:'ROW'}}
	| SELECT COLUMN
		{ $$ = {modifier:'COLUMN'}}
	| SELECT MATRIX
		{ $$ = {modifier:'MATRIX'}}
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
	| INTO FuncValue
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
	: LPAR Select RPAR Literal
		{ $$ = $2; $$.as = $4 }
	| LPAR Select RPAR AS Literal
		{ $$ = $2; $$.as = $5 }
	| LPAR Select RPAR /* default alias */
		{ $$ = $2; $$.as = 'default' }

	| Table Literal
		{ $$ = $1; $1.as = $2 }
	| Table AS Literal
		{ $$ = $1; $1.as = $3 }
	| Table
		{ $$ = $1; }

	| ParamValue Literal
		{ $$ = $1; $1.as = $2; }
	| ParamValue AS Literal
		{ $$ = $1; $1.as = $3; }
	| ParamValue
		{ $$ = $1; $1.as = 'default'; }
	| FuncValue
		{ $$ = $1; $1.as = 'default'; }
	| FuncValue Literal
		{ $$ = $1; $1.as = $2; }
	| FuncValue AS Literal
		{ $$ = $1; $1.as = $3; }
	;

Table
	: Literal DOT Literal
		{ $$ = new yy.Table({databaseid: $1, tableid:$3});}
	| Literal
		{ $$ = new yy.Table({tableid: $1});}
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
	| Table Literal
		{ $$ = {table: $1, as: $2 } ; }
	| Table AS Literal
		{ $$ = {table: $1, as: $3 } ; }
	| ParamValue Literal
		{ $$ = {param: $1, as: $2 } ; }
	| ParamValue AS Literal
		{ $$ = {param: $1, as: $3 } ; }
	| LPAR Select RPAR Literal
		{ $$ = {select: $1, as: $4} ; }
	| LPAR Select RPAR AS Literal
		{ $$ = {select: $1, as: $5 } ; }
	| FuncValue
		{ $$ = {func:$1, as:'default'}; }
	| FuncValue Literal
		{ $$ = {func:$1, as: $2}; }
	| FuncValue AS Literal
		{ $$ = {func:$1, as: $3}; }
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
	: Expression AS Literal
		{ $1.as = $3; $$ = $1;}
	| Expression Literal
		{ $1.as = $2; $$ = $1;}

/*	| Expression AS LBRA NUMBER RBRA
		{ $1.as = $4; $$ = $1;}
*/
	| Expression AS NUMBER
		{ $1.as = $3; $$ = $1;}
	| Expression NUMBER
		{ $1.as = $2; $$ = $1;}
	| Expression AS StringValue
		{ $1.as = $3; $$ = $1;}
	| Expression StringValue
		{ $1.as = $2; $$ = $1;}
	| Expression
		{ $$ = $1; }
	;

Star
	: Literal DOT Literal DOT STAR
		{ $$ = new yy.Column({columid: $5, tableid: $3, databaseid:$1}); }
	| Literal DOT STAR
		{ $$ = new yy.Column({columnid: $3, tableid: $1}); }
	| STAR
		{ $$ = new yy.Column({columnid:$1}); }
	;

Column
	: Literal DOT Literal DOT Literal
		{ $$ = new yy.Column({columnid: $5, tableid: $3, databaseid:$1});}
	| Literal DOT Literal
		{ $$ = new yy.Column({columnid: $3, tableid: $1});}
	| Literal
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
	| CastClause
		{ $$ = $1; }
	;



CastClause
	: CAST LPAR Expression AS ColumnType RPAR
		{ $$ = new yy.Cast({expression:$3}) ; yy.extend($$,$5) ; }
	| CONVERT LPAR ColumnType COMMA Expression RPAR
		{ $$ = new yy.Cast({expression:$5}) ; yy.extend($$,$3) ; }
	| CONVERT LPAR ColumnType COMMA Expression COMMA NUMBER RPAR
		{ $$ = new yy.Cast({expression:$5, style:$7}) ; yy.extend($$,$3) ; }
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
	: Literal LPAR ExprList RPAR
		{ $$ = new yy.FuncValue({funcid: $1, args: $3}); }
	| Literal LPAR RPAR
		{ $$ = new yy.FuncValue({ funcid: $1 }) }
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
		{ $$ = new yy.StringValue({value: $1.substr(1,$1.length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); }
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
	: DOLLAR Literal
		{ $$ = new yy.ParamValue({param: $2}); }
	| COLON Literal
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

	| Expression ARROW Literal
		{ $$ = new yy.Op({left:$1, op:'->' , right:$3}); }
	| Expression ARROW NumValue
		{ $$ = new yy.Op({left:$1, op:'->' , right:$3}); }
	| Expression ARROW LPAR Expression RPAR
		{ $$ = new yy.Op({left:$1, op:'->' , right:$4}); }

	| Expression ARROW FuncValue
		{ $$ = new yy.Op({left:$1, op:'->' , right:$3}); }


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
	| Expression EQEQ Expression
		{ $$ = new yy.Op({left:$1, op:'==' , right:$3}); }
	| Expression EQEQEQ Expression
		{ $$ = new yy.Op({left:$1, op:'===' , right:$3}); }
	| Expression NE Expression
		{ $$ = new yy.Op({left:$1, op:'!=' , right:$3}); }
	| Expression NEEQEQ Expression
		{ $$ = new yy.Op({left:$1, op:'!==' , right:$3}); }
	| Expression NEEQEQEQ Expression
		{ $$ = new yy.Op({left:$1, op:'!===' , right:$3}); }

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




ValuesListsList
	: LPAR ValuesList RPAR
		{ $$ = [$2]; }
	| AT Json
		{ $$ = [$2]; }
	| ParamValue
		{ $$ = [$1]; }
	| ValuesListsList COMMA LPAR ValuesList RPAR
		{$$ = $1; $1.push($4)}
	| ValuesListsList COMMA AT Json
		{$$ = $1; $1.push($4)}
	| ValuesListsList COMMA ParamValue
		{$$ = $1; $1.push($3)}
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


AsClause
	:
		{$$ = null;}
	| AS Literal
		{ $$ = $1; }
	;



