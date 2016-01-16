/*
//
// alasqlparser.jison
// SQL Parser for AlaSQL
// (c) 2014-2015, Andrey Gershun
//
//
*/

%lex
%options case-insensitive
%%

\`\`([^\`])+\`\`						return 'JAVASCRIPT'
\[\?\]									return 'BRAQUESTION'
'@['									return 'ATLBRA'
\[([^\]])*?\]							return 'BRALITERAL'
\`([^\`])*?\`	   						return 'BRALITERAL'


N(['](\\.|[^']|\\\')*?['])+             return 'NSTRING'
X(['](\\.|[^']|\\\')*?['])+             return 'NSTRING'
(['](\\.|[^']|\\\')*?['])+              return 'STRING'
(["](\\.|[^"]|\\\")*?["])+              return 'STRING'

/*
N(['](\\.|[^']|\'\')*?['])+             return 'NSTRING'
X(['](\\.|[^']|\'\')*?['])+             return 'NSTRING'
(['](\\.|[^']|\'\')*?['])+              return 'STRING'
(["](\\.|[^"]|\"\")*?["])+              return 'STRING'
*/


"--"(.*?)($|\r\n|\r|\n)							return /* return COMMENT */

\s+                                             /* skip whitespace */
'||'											return 'OR'
'&&'											return 'AND'

VALUE\s+OF\s+SELECT                          	yytext = 'VALUE';return 'SELECT'
ROW\s+OF\s+SELECT                           	yytext = 'ROW';return 'SELECT'
COLUMN\s+OF\s+SELECT                          	yytext = 'COLUMN';return 'SELECT'
MATRIX\s+OF\s+SELECT                          	yytext = 'MATRIX';return 'SELECT'
INDEX\s+OF\s+SELECT                           	yytext = 'INDEX';return 'SELECT'
RECORDSET\s+OF\s+SELECT                       	yytext = 'RECORDSET';return 'SELECT'
TEXT\s+OF\s+SELECT                           	yytext = 'TEXT';return 'SELECT'

'SELECT'                           				yytext = 'SELECT';return 'SELECT'

//'ABSOLUTE'                                 		return 'ABSOLUTE'
//'ACTION'                                      	return 'ACTION'
//'ADD'                                      		return 'ADD'
//'AGGR'                                     		return 'AGGR'
//'ALL'                                      		return 'ALL'
//'ALTER'                                    		return 'ALTER'
'AND'											return 'AND'
//'ANTI'											return 'ANTI'
'ANY'											return 'ANY'
'APPLY'											return 'APPLY'
'ARRAY'                                     	return 'ARRAY'
'AS'                                      		return 'AS'
//'ASSERT'                                      	return 'ASSERT'
'ASC'                                      		return 'DIRECTION'
//'ATTACH'                                      	return 'ATTACH'
//AUTO(_)?INCREMENT                               return 'IDENTITY'
'AVG'                                      		return 'AVG'

//'BEGIN'											return 'BEGIN'
'BETWEEN'										return 'BETWEEN'
'BREAK'											return 'BREAK'
NOT\s+BETWEEN									return 'NOT_BETWEEN'
NOT\s+LIKE									    return 'NOT_LIKE'
'BY'											return 'BY'

'CALL'											return 'CALL'
'CASE'											return 'CASE'
'CAST'											return 'CAST'
//'CHECK'											return 'CHECK'
//'CLASS'											return 'CLASS'
//'CLOSE'											return 'CLOSE'
//'COLLATE'										return 'COLLATE'
COLUMN											return 'COLUMN'
COLUMNS 										return 'COLUMN'
//"COMMIT"										return 'COMMIT'
//"CONSTRAINT"									return 'CONSTRAINT'
//"CONTENT"										return 'CONTENT'
//"CONTINUE"										return 'CONTINUE'
"CONVERT"										return 'CONVERT'
"CORRESPONDING"									return 'CORRESPONDING'
"COUNT"											return 'COUNT'
//'CREATE'										return 'CREATE'
"CROSS"											return 'CROSS'
'CUBE'											return 'CUBE'
"CURRENT_TIMESTAMP"								return 'CURRENT_TIMESTAMP'
"CURSOR"										return 'CURSOR'
//DATABASE(S)?									return 'DATABASE'
//'DECLARE'                                       return 'DECLARE'
'DEFAULT'                                       return 'DEFAULT'
//'DELETE'                                        return 'DELETE'
//'DELETED'                                       return 'DELETED'
'DESC'                                          return 'DIRECTION'
//'DETACH'										return 'DETACH'
'DISTINCT'                                      return 'DISTINCT'
/* DOUBLE\s+PRECISION								return 'LITERAL' */
//'DROP'											return 'DROP'
//'ECHO'											return 'ECHO'
//'EDGE'											return 'EDGE'
'END'											return 'END'
//'ENUM'											return 'ENUM'
'ELSE'											return 'ELSE'
//'ESCAPE'										return 'ESCAPE'
//'EXCEPT'										return 'EXCEPT'
//'EXEC'											return 'CALL'
//'EXECUTE'										return 'CALL'
'EXISTS'										return 'EXISTS'
//'EXPLAIN'                                       return 'EXPLAIN'
//'FALSE'											return 'FALSE'
//'FETCH'											return 'FETCH'
'FIRST'											return 'FIRST'
'FOR'											return 'FOR'
//'FOREIGN'										return 'FOREIGN'
'FROM'                                          return 'FROM'
'GO'                                      		return 'GO'
//'GRAPH'                                      	return 'GRAPH'
'GROUP'                                      	return 'GROUP'
'GROUPING'                                     	return 'GROUPING'
'HAVING'                                        return 'HAVING'
//'HELP'											return 'HELP'
//'IF'											return 'IF'
//'IDENTITY'										return 'IDENTITY'
'IS'											return 'IS'
'IN'											return 'IN'
'INDEX'											return 'INDEX'
'INNER'                                         return 'INNER'
//'INSERT'                                        return 'INSERT'
//'INSERTED'                                      return 'INSERTED'
//'INTERSECT'                                     return 'INTERSECT'
'INTO'                                         	return 'INTO'
'JOIN'                                         	return 'JOIN'
//'KEY'											return 'KEY'
//'LAST'											return 'LAST'
//'LET'											return 'LET'
'LEFT'											return 'LEFT'
'LIKE'											return 'LIKE'
'LIMIT'											return 'LIMIT'
//'MATCHED'										return 'MATCHED'
//'MATRIX'										return 'MATRIX'
"MAX"											return 'MAX'
"MERGE"											return 'MERGE'
"MIN"											return 'MIN'
//"MINUS"											return 'EXCEPT'
//"MODIFY"										return 'MODIFY'
'NATURAL'										return 'NATURAL'
//'NEXT'											return 'NEXT'
//'NEW'											return 'NEW'
'NOCASE'										return 'NOCASE'
'NO'											return 'NO'
'NOT'											return 'NOT'
'NULL'											return 'NULL'
//'OFF'											return 'OFF'
'ON'											return 'ON'
//'ONLY'											return 'ONLY'
//'OFFSET'										return 'OFFSET'
//'OPEN'											return 'OPEN'
//'OPTION'										return 'OPTION'
'OR'											return 'OR'
'ORDER'	                                      	return 'ORDER'
'OUTER'											return 'OUTER'
'OVER'											return 'OVER'
//'PATH'                                        	return 'PATH'
//'PARTITION'										return 'PARTITION'
//'PERCENT'                                       return 'PERCENT'
//'PIVOT'                                        	return 'PIVOT'
//'PLAN'                                        	return 'PLAN'
//'PRIMARY'										return 'PRIMARY'
//'PRINT'                                        	return 'PRINT'
//'PRIOR'                                        	return 'PRIOR'
//'QUERY'                                        	return 'QUERY'
//'READ'		                                    return 'READ'
//'RECORDSET'                                     return 'RECORDSET'
//'REDUCE'                                        return 'REDUCE'
//'REFERENCES'                                    return 'REFERENCES'
'REGEXP'		                                return 'REGEXP'
//'RELATIVE'                                      return 'RELATIVE'
//'REMOVE'                                        return 'REMOVE'
//'RENAME'                                        return 'RENAME'
//'REPEAT'										return 'REPEAT'
'REPLACE'										return 'REPLACE'
//'REQUIRE'                                       return 'REQUIRE'
//'RESTORE'                                       return 'RESTORE'
//'RETURN'                                       	return 'RETURN'
//'RETURNS'                                       return 'RETURN'
//'RIGHT'                                        	return 'RIGHT'
//'ROLLBACK'										return 'ROLLBACK'
//'ROLLUP'										return 'ROLLUP'
//'ROW'											return 'ROW'
//'ROWS'											return 'ROWS'
//SCHEMA(S)?                                      return 'DATABASE'
//'SEARCH'                                        return 'SEARCH'

//'SEMI'                                        	return 'SEMI'
//SET 	                                       	return 'SET'
//SETS                                        	return 'SET'
//'SHOW'                                        	return 'SHOW'
//'SOME'                                        	return 'SOME'
//'SOURCE'										return 'SOURCE'
//'STRATEGY'										return 'STRATEGY'
//'STORE'                                        	return 'STORE'
'SUM'											return 'SUM'
//'TABLE'											return 'TABLE'
//'TABLES'										return 'TABLE'
//'TARGET'										return 'TARGET'
//'TEMP'											return 'TEMP'
//'TEMPORARY'										return 'TEMP'
//'TEXTSTRING'									return 'TEXTSTRING'
'THEN'											return 'THEN'
//'TIMEOUT'										return 'TIMEOUT'
'TO'											return 'TO'
'TOP'											return 'TOP'
//'TRAN'											return 'TRANSACTION'
//'TRANSACTION'									return 'TRANSACTION'
'TRUE'						  					return 'TRUE'
//'TRUNCATE'					  					return 'TRUNCATE'
'UNION'                                         return 'UNION'
'UNIQUE'                                        return 'UNIQUE'
'UNPIVOT'                                       return 'UNPIVOT'
//'UPDATE'                                        return 'UPDATE'
//'USE'											return 'USE'
/* 'USER'										return 'USER' */
'USING'                                         return 'USING'
VALUE(S)?                                      	return 'VALUE'
//'VERTEX'										return 'VERTEX'
//'VIEW'											return 'VIEW'
'WHEN'                                          return 'WHEN'
'WHERE'                                         return 'WHERE'
'WHILE'                                         return 'WHILE'
'WITH'                                          return 'WITH'
//'WORK'                                          return 'TRANSACTION'  /* Is this keyword required? */

(\d*[.])?\d+[eE]\d+								return 'NUMBER'
(\d*[.])?\d+									return 'NUMBER'

'->'											return 'ARROW'
'#'												return 'SHARP'
'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
'%'												return 'MODULO'
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

']'												return 'RBRA'

':-'											return 'COLONDASH'
'?-'											return 'QUESTIONDASH'
'.'												return 'DOT'
','												return 'COMMA'
'::'											return 'DOUBLECOLON'
':'												return 'COLON'
';'												return 'SEMICOLON'
'$'												return 'DOLLAR'
'?'												return 'QUESTION'
'!'												return 'EXCLAMATION'
'^'												return 'CARET'

[a-zA-Z_][a-zA-Z_0-9]*                     		return 'LITERAL'

<<EOF>>               							return 'EOF'
.												return 'INVALID'

/lex
%left COMMA
%left DOUBLECOLON
%left OR
/* %left AND */
%left AND BETWEEN NOT_BETWEEN
/*%left AND*/
%left IN
%left NOT
%left GT GE LT LE EQ NE EQEQ NEEQEQ EQEQEQ NEEQEQEQ
%left IS
%left LIKE NOT_LIKE REGEXP
%left PLUS MINUS
%left STAR SLASH MODULO
%left CARET
%left DOT ARROW EXCLAMATION
%left SHARP

%ebnf
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
	: Statements (SEMICOLON|GO) AStatement
		{ $$ = $1; if($3) $1.push($3); }
	| AStatement
		{ $$ = [$1]; }
	| ExplainStatement
		{ $$ = [$1]; }
	;

ExplainStatement
	: EXPLAIN AStatement
		{ $$ = $2; $2.explain = true; }
	| EXPLAIN QUERY PLAN AStatement
		{ $$ = $4;  $4.explain = true;}
	;

AStatement
	: Statement
		{
			$$ = $1;

			// TODO combine exists and queries
		    if(yy.exists) $$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) $$.queries = yy.queries;
			delete yy.queries;
		}
	;

Statement
	: { $$ = undefined; }
	| AlterTable
	| AttachDatabase
	| Call
	| CreateDatabase
	| CreateIndex
	| CreateGraph
	| CreateTable
	| CreateView
	| CreateEdge
	| CreateVertex
	| Declare
	| Delete
	| DetachDatabase
	| DropDatabase
	| DropIndex
	| DropTable
	| DropView
	| If
	| Insert
	| Merge
	| RenameTable
	| Select
	| ShowCreateTable
	| ShowColumns
	| ShowDatabases
	| ShowIndex
	| ShowTables
	| TruncateTable
	| WithSelect

	| BeginTransaction
	| CommitTransaction
	| RollbackTransaction
	| EndTransaction
	| UseDatabase
	| Update
	| Help
	| JavaScript

//	| Source
//	| Assert
//	| While
//	| Continue
	| Break
//	| BeginEnd
//	| Print
//	| Require
//	| SetVariable
	| ExpressionStatement
//	| AddRule
	| Query

/* PLugins */

//	| Echo

/*
	| Store
	| Restore

	| DeclareCursor
	| OpenCursor
	| FetchCursor
	| CloseCursor

	| CreateTrigger
	| DropTrigger
	| SavePoint
	| Reindex
	| StoreDatabase
	| StoreTable
	| RestoreDatabase
	| RestoreTable

	| While
	| BulkInsert

	| CreateFunction
	| CreateProcedure
	| Loop
	| ForLoop
*/
	;

/* WITH */

WithSelect
	: WITH WithTablesList Select
		{ $$ = new yy.WithSelect({withs: $2, select:$3}); }
	;

WithTablesList
	: WithTablesList COMMA WithTable
		{ $1.push($3); $$=$1; }
	| WithTable
		{ $$ = [$1]; }
	;

WithTable
	: Literal AS LPAR Select RPAR
		{ $$ = {name:$1, select:$4}; }
	;

/* SELECT */

Select
	: SelectClause RemoveClause? IntoClause FromClause PivotClause? WhereClause GroupClause  OrderClause LimitClause UnionClause
		{
			yy.extend($$,$1); yy.extend($$,$2); yy.extend($$,$3); yy.extend($$,$4);
		    yy.extend($$,$5); yy.extend($$,$6);yy.extend($$,$7);
		    yy.extend($$,$8); yy.extend($$,$9); yy.extend($$,$10);
		    $$ = $1;
/*		    if(yy.exists) $$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) $$.queries = yy.queries;
			delete yy.queries;
*/		}
	| SEARCH SearchSelector* IntoClause SearchFrom?
	/* SearchLimit? SearchStrategy? SearchTimeout? */
		{
			$$ = new yy.Search({selectors:$2, from:$4});
			yy.extend($$,$3);
		}
	;

PivotClause
	: PIVOT LPAR Expression FOR Literal PivotClause2? RPAR AsLiteral?
		{ $$ = {pivot:{expr:$3, columnid:$5, inlist:$7, as:$8}}; }
	| UNPIVOT LPAR Literal FOR Literal IN LPAR ColumnsList RPAR RPAR AsLiteral?
		{ $$ = {unpivot:{tocolumnid:$3, forcolumnid:$5, inlist:$8, as:$11}}; }
	;

PivotClause2
	: IN LPAR AsList RPAR
		{ $$ = $3; }
	;

AsLiteral
	: AS Literal
		{ $$ = $2; }
	| Literal
		{ $$ = $1; }
	;

AsList
	: AsList COMMA AsPart
		{ $$ = $1; $$.push($3); }
	| AsPart
		{ $$ = [$1]; }
	;

AsPart
	: Expression
		{ $$ = {expr:$1}; }
	| Expression AS Literal
		{ $$ = {expr:$1,as:$3}; }
	;

RemoveClause
	: REMOVE COLUMN? RemoveColumnsList
		{ $$ = {removecolumns:$3}; }
	;

RemoveColumnsList
	: RemoveColumnsList COMMA RemoveColumn
		{ $$ = $1; $$.push($3); }
	| RemoveColumn
		{ $$ = [$1]; }
	;

RemoveColumn
	: Column
		{ $$ = $1; }
	| LIKE StringValue
		{ $$ = {like:$2}; }
	;

SearchSelector
	: Literal
		{ $$ = {srchid:"PROP", args: [$1]}; }

	| ORDER BY LPAR OrderExpressionsList RPAR
		{ $$ = {srchid:"ORDERBY", args: $4}; }
	| ORDER BY LPAR DIRECTION? RPAR
		{
			var dir = $4;
			if(!dir) dir = 'ASC';
			$$ = {srchid:"ORDERBY", args: [{expression: new yy.Column({columnid:'_'}), direction:dir}]};
		}

	| ARROW Literal
		{ $$ = {srchid:"APROP", args: [$2]}; }
	| CARET
		{ $$ = {selid:"ROOT"};}
	| EQ Expression
		{ $$ = {srchid:"EQ", args: [$2]}; }
	| LIKE Expression
		{ $$ = {srchid:"LIKE", args: [$2]}; }
	| LPAR SearchSelector+ RPAR
		{ $$ = {selid:"WITH", args: $2}; }
	| WITH LPAR SearchSelector+ RPAR
		{ $$ = {selid:"WITH", args: $3}; }
	| Literal LPAR ExprList? RPAR
		{ $$ = {srchid:$1.toUpperCase(), args:$3}; }
	| WHERE LPAR Expression RPAR
		{ $$ = {srchid:"WHERE", args:[$3]}; }
	| CLASS LPAR Literal RPAR
		{ $$ = {srchid:"CLASS", args:[$3]}; }
	| NUMBER
		{ $$ = {srchid:"PROP", args: [$1]}; }
	| STRING
		{ $$ = {srchid:"NAME", args: [$1.substr(1,$1.length-2)]}; }
	| SLASH
		{ $$ = {srchid:"CHILD"}; }
	| VERTEX
		{ $$ = {srchid:"VERTEX"}; }
	| EDGE
		{ $$ = {srchid:"EDGE"}; }
	| EXCLAMATION
		{ $$ = {srchid:"REF"}; }
	| SHARP Literal
		{ $$ = {srchid:"SHARP", args:[$2]}; }
	| MODULO Literal
		{ $$ = {srchid:"ATTR", args:((typeof $2 == 'undefined')?undefined:[$2])}; }
	| MODULO SLASH
		{ $$ = {srchid:"ATTR"}; }
	| GT
		{ $$ = {srchid:"OUT"}; }
	| LT
		{ $$ = {srchid:"IN"}; }
	| DOLLAR
		{ $$ = {srchid:"CONTENT"}; } /* TODO Decide! */
/*	| DELETE LPAR RPAR
		{ $$ = {srchid:"DELETE"}; }
*/	| DOT DOT
		{ $$ = {srchid:"PARENT"}; }
	| Json
		{ $$ = {srchid:"EX",args:[new yy.Json({value:$1})]}; }
	| AT Literal
		{ $$ = {srchid:"AT", args:[$2]}; }
	| AS AT Literal
		{ $$ = {srchid:"AS", args:[$3]}; }
	| SET LPAR SetColumnsList RPAR
		{ $$ = {srchid:"SET", args:$3}; }

	| TO AT Literal
		{ $$ = {selid:"TO", args:[$3]}; }
	| VALUE
		{ $$ = {srchid:"VALUE"}; }
	| ROW LPAR ExprList RPAR
		{ $$ = {srchid:"ROW", args:$3}; }
	| COLON Literal
		{ $$ = {srchid:"CLASS", args:[$2]}; }
	| SearchSelector PlusStar
		{ $$ = {selid:$2,args:[$1] }; }

	| NOT LPAR SearchSelector* RPAR
		{ $$ = {selid:"NOT",args:$3 }; }
	| IF LPAR SearchSelector* RPAR
		{ $$ = {selid:"IF",args:$3 }; }
	| Aggregator LPAR SearchSelector* RPAR
		{ $$ = {selid:$1,args:$3 }; }
	| (DISTINCT|UNIQUE) LPAR SearchSelector* RPAR
		{ $$ = {selid:'DISTINCT',args:$3 }; }
	| UNION LPAR SearchSelectorList RPAR
		{ $$ = {selid:'UNION',args:$3 }; }
	| UNION ALL LPAR SearchSelectorList RPAR
		{ $$ = {selid:'UNIONALL',args:$4 }; }
	| ALL LPAR SearchSelector* RPAR
		{ $$ = {selid:'ALL',args:[$3] }; }
	| ANY LPAR SearchSelector* RPAR
		{ $$ = {selid:'ANY',args:[$3] }; }
	| INTERSECT LPAR SearchSelectorList RPAR
		{ $$ = {selid:'INTERSECT',args:$3 }; }
	| EXCEPT LPAR SearchSelectorList RPAR
		{ $$ = {selid:'EXCEPT',args:$3 }; }
	| AND LPAR SearchSelectorList RPAR
		{ $$ = {selid:'AND',args:$3 }; }
	| OR LPAR SearchSelectorList RPAR
		{ $$ = {selid:'OR',args:$3 }; }
	| PATH LPAR SearchSelector RPAR
		{ $$ = {selid:'PATH',args:[$3] }; }
	| RETURN LPAR ResultColumns RPAR
		{ $$ = {srchid:'RETURN',args:$3 }; }
	| REPEAT LPAR SearchSelector* COMMA ExprList RPAR
		{ $$ = {selid:'REPEAT',sels:$3, args:$5 }; }
	;

SearchSelectorList
	: SearchSelectorList COMMA SearchSelector*
		{ $$ = $1; $$.push($3);}
	| SearchSelector*
		{ $$ = [$1]; }
	;

PlusStar
	: PLUS
		{ $$ = "PLUS"; }
	| STAR
		{ $$ = "STAR"; }
	| QUESTION
		{ $$ = "QUESTION"; }
	;

SearchFrom
	: FROM Expression
		{ $$ = $2; }
	;

/*
SearchLet
	: LET
	;

SearchWhile
	: WHILE Expression
	;
SearchLimit
	: LIMIT Expression
	;

SearchStrategy
	: STRATEGY Literal
	;

SearchTimeout
	: TIMEOUT Expression
	;

*/

SelectClause
	:
	/*

		{ $$ = new yy.Select({ columns:new yy.Column({columnid:'_'}), modifier: 'COLUMN' }); }
	|
*/

	SelectModifier DISTINCT TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$4, distinct: true }); yy.extend($$, $1); yy.extend($$, $3); }
	| SelectModifier UNIQUE TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$4, distinct: true }); yy.extend($$, $1);yy.extend($$, $3); }
	| SelectModifier  ALL TopClause ResultColumns
		{ $$ = new yy.Select({ columns:$4, all:true }); yy.extend($$, $1);yy.extend($$, $3); }
	| SelectModifier TopClause ResultColumns?
		{
			if(!$3) {
				$$ = new yy.Select({columns:[new yy.Column({columnid:'_',})], modifier:'COLUMN'});
			} else {
				$$ = new yy.Select({ columns:$3 }); yy.extend($$, $1);yy.extend($$, $2);
			}
		}
/*	|
		{ $$ = new yy.Select({columns:[new yy.Column({columnid:'_', modifier:'COLUMN'})]});}
*/	;

SelectModifier
	: SELECT
		{ if($1=='SELECT') $$ = undefined; else $$ = {modifier: $1};  }
	| SELECT VALUE
		{ $$ = {modifier:'VALUE'}}
	| SELECT ROW
		{ $$ = {modifier:'ROW'}}
	| SELECT COLUMN
		{ $$ = {modifier:'COLUMN'}}
	| SELECT MATRIX
		{ $$ = {modifier:'MATRIX'}}
	| SELECT TEXTSTRING
		{ $$ = {modifier:'TEXTSTRING'}}
	| SELECT INDEX
		{ $$ = {modifier:'INDEX'}}
	| SELECT RECORDSET
		{ $$ = {modifier:'RECORDSET'}}
	;

TopClause
	: TOP NumValue PERCENT?
		{ $$ = {top: $2, percent:(typeof $3 != 'undefined'?true:undefined)}; }
	| TOP LPAR NumValue RPAR
		{ $$ = {top: $3}; }
	| { $$ = undefined; }
	;

IntoClause
	: {$$ = undefined; }
	| INTO Table
		{$$ = {into: $2} }
	| INTO FuncValue
		{$$ = {into: $2} }
	| INTO ParamValue
		{$$ = {into: $2} }
	| INTO VarValue
		{$$ = {into: $2} }
	| INTO STRING
		{
			var s = $2;
			s = s.substr(1,s.length-2);
			var x3 = s.substr(-3).toUpperCase();
			var x4 = s.substr(-4).toUpperCase();
			if(s[0] == '#') {
				$$ = {into: new yy.FuncValue({funcid: 'HTML', args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			} else if(x3=='XLS' || x3 == 'CSV' || x3=='TAB') {
				$$ = {into: new yy.FuncValue({funcid: x3, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			} else if(x4=='XLSX' || x4 == 'JSON') {
				$$ = {into: new yy.FuncValue({funcid: x4, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			}
		}
	;

FromClause
	: FROM FromTablesList
		{ $$ = { from: $2 }; }
/*	| FROM FromTable JoinTablesList
		{ $$ = { from: [$2], joins: $3 }; }
*/	| FROM FromTablesList JoinTablesList
		{ $$ = { from: $2, joins: $3 }; }
/*	| FROM LPAR FromTable JoinTablesList RPAR
		{ $$ = { from: [$3], joins: $4 }; }
*/	| FROM LPAR FromTablesList JoinTablesList RPAR
		{ $$ = { from: $3, joins: $4 }; }
	|
		{ $$ = undefined; }
	;

ApplyClause
	: CROSS APPLY LPAR Select RPAR Literal
		{ $$ = new yy.Apply({select: $4, applymode:'CROSS', as:$6}); }
	| CROSS APPLY LPAR Select RPAR AS Literal
		{ $$ = new yy.Apply({select: $4, applymode:'CROSS', as:$7}); }
/*		{
			if(!yy.exists) yy.exists = [];
			$$ = new yy.Apply({select: $4, applymode:'CROSS', as:$7,existsidx:yy.exists.length});
			yy.exists.push($3);

		 }
*/	| OUTER APPLY LPAR Select RPAR Literal
		{ $$ = new yy.Apply({select: $4, applymode:'OUTER', as:$6}); }
	| OUTER APPLY LPAR Select RPAR AS Literal
		{ $$ = new yy.Apply({select: $4, applymode:'OUTER', as:$7}); }
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

	| Json AS? Literal?
		{ $$ = new yy.Json({value:$1}); $1.as = $3 }

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

	| VarValue
		{ $$ = $1; $1.as = 'default'; }
	| VarValue Literal
		{ $$ = $1; $1.as = $2; }
	| VarValue AS Literal
		{ $$ = $1; $1.as = $3; }

	| FromString
		{ $$ = $1; $1.as = 'default'; }
	| FromString Literal
		{ $$ = $1; $1.as = $2; }
	| FromString AS Literal
		{ $$ = $1; $1.as = $3; }
	;

FromString
	: STRING
		{
			var s = $1;
			s = s.substr(1,s.length-2);
			var x3 = s.substr(-3).toUpperCase();
			var x4 = s.substr(-4).toUpperCase();
			var r;
			if(s[0] == '#') {
				r = new yy.FuncValue({funcid: 'HTML', args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]});
			} else if(x3=='XLS' || x3 == 'CSV' || x3=='TAB') {
				r = new yy.FuncValue({funcid: x3, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]});
			} else if(x4=='XLSX' || x4 == 'JSON') {
				r = new yy.FuncValue({funcid: x4, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]});
			} else {
				throw new Error('Unknown string in FROM clause');
			};
			$$ = r;
		}
	;

Table
	: Literal DOT Literal
		{
			if($1 == 'INFORMATION_SCHEMA') {
				$$ = new yy.FuncValue({funcid: $1, args:[new yy.StringValue({value:$3})]});
			} else {
				$$ = new yy.Table({databaseid: $1, tableid:$3});
			}
		}
	| Literal
		{ $$ = new yy.Table({tableid: $1});}
	;

JoinTablesList
	: JoinTablesList JoinTable
		{ $$ = $1; $1.push($2); }
	| JoinTablesList ApplyClause
		{ $$ = $1; $1.push($2); }
	| JoinTable
	 	{ $$ = [$1]; }
	| ApplyClause
	 	{ $$ = [$1]; }
	;

JoinTable
	: JoinMode JoinTableAs OnClause
		{ $$ = new yy.Join($1); yy.extend($$, $2); yy.extend($$, $3); }
	;

JoinTableAs
	: Table
		{ $$ = {table: $1}; }
	| Table Literal
		{ $$ = {table: $1, as: $2 } ; }
	| Table AS Literal
		{ $$ = {table: $1, as: $3 } ; }
	| Json AS? Literal?
		{ $$ = {json:new yy.Json({value:$1,as:$3})}; }
	| ParamValue Literal
		{ $$ = {param: $1, as: $2 } ; }
	| ParamValue AS Literal
		{ $$ = {param: $1, as: $3 } ; }
	| LPAR Select RPAR Literal
		{ $$ = {select: $1, as: $4} ; }
	| LPAR Select RPAR AS Literal
		{ $$ = {select: $1, as: $5 } ; }
	| FuncValue
		{ $$ = {funcid:$1, as:'default'}; }
	| FuncValue Literal
		{ $$ = {funcid:$1, as: $2}; }
	| FuncValue AS Literal
		{ $$ = {funcid:$1, as: $3}; }

	| VarValue
		{ $$ = {variable:$1,as:'default'}; }
	| VarValue Literal
		{ $$ = {variable:$1,as:$2}; }
	| VarValue AS Literal
		{ $$ = {variable:$1,as:$3} }
	;

JoinMode
	: JoinModeMode
		{ $$ = { joinmode: $1 } ; }
	| NATURAL JoinModeMode
		{ $$ = {joinmode: $1, natural:true} ; }
	;

JoinModeMode
	: JOIN
		{ $$ = "INNER"; }
	| INNER JOIN
		{ $$ = "INNER"; }
	| LEFT JOIN
		{ $$ = "LEFT"; }
	| LEFT OUTER JOIN
		{ $$ = "LEFT"; }
	| RIGHT JOIN
		{ $$ = "RIGHT"; }
	| RIGHT OUTER JOIN
		{ $$ = "RIGHT"; }
	| OUTER JOIN
		{ $$ = "OUTER"; }
	| FULL OUTER JOIN
		{ $$ = "OUTER"; }
	| SEMI JOIN
		{ $$ = "SEMI"; }
	| ANTI JOIN
		{ $$ = "ANTI"; }
	| CROSS JOIN
		{ $$ = "CROSS"; }
	;

OnClause
	: ON Expression
		{ $$ = {on: $2}; }
	| USING ColumnsList
		{ $$ = {using: $2}; }
	|
		{ $$ = undefined; }
	;

WhereClause
	: { $$ = undefined; }
	| WHERE Expression
		{ $$ = {where: new yy.Expression({expression:$2})}; }
	;

GroupClause
	: { $$ = undefined; }
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
	: GROUPING SET LPAR GroupExpressionsList RPAR
		{ $$ = new yy.GroupExpression({type:'GROUPING SETS', group: $4}); }
	| ROLLUP LPAR GroupExpressionsList RPAR
		{ $$ = new yy.GroupExpression({type:'ROLLUP', group: $3}); }
	| CUBE LPAR GroupExpressionsList RPAR
		{ $$ = new yy.GroupExpression({type:'CUBE', group: $3}); }
	| Expression
		{ $$ = $1; }
	;


HavingClause
	: { $$ = undefined; }
	| HAVING Expression
		{ $$ = {having:$2}}
	;

UnionClause
	:   { $$ = undefined; }
	| UNION Select
		{ $$ = {union: $2} ; }
	| UNION ALL Select
		{ $$ = {unionall: $3} ; }
	| EXCEPT Select
		{ $$ = {except: $2} ; }
	| INTERSECT Select
		{ $$ = {intersect: $2} ; }
	| UNION CORRESPONDING Select
		{ $$ = {union: $3, corresponding:true} ; }
	| UNION ALL CORRESPONDING Select
		{ $$ = {unionall: $4, corresponding:true} ; }
	| EXCEPT CORRESPONDING Select
		{ $$ = {except: $3, corresponding:true} ; }
	| INTERSECT CORRESPONDING Select
		{ $$ = {intersect: $3, corresponding:true} ; }
	;

OrderClause
	: { $$ = undefined; }
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
		{ $$ = new yy.Expression({expression: $1, direction:'ASC'}) }
	| Expression DIRECTION
		{ $$ = new yy.Expression({expression: $1, direction:$2.toUpperCase()}) }
	| Expression COLLATE NOCASE
		{ $$ = new yy.Expression({expression: $1, direction:'ASC', nocase:true}) }
	| Expression COLLATE NOCASE DIRECTION
		{ $$ = new yy.Expression({expression: $1, direction:$4.toUpperCase(), nocase:true}) }
	;

LimitClause
	: { $$ = undefined; }
	| LIMIT NumValue OffsetClause
		{ $$ = {limit:$2}; yy.extend($$, $3); }
	| OFFSET NumValue ROWS? FETCH NEXT? NumValue ROWS? ONLY?
		{ $$ = {limit:$6,offset:$2}; }
	;

OffsetClause
	: { $$ = undefined; }
	| OFFSET NumValue
		{ $$ = {offset:$2}; }
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
	| Literal DOT VALUE
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
	| VarValue
		{ $$ = $1; }
	| ExistsValue
		{ $$ = $1; }
	| CaseValue
		{ $$ = $1; }
	| CastClause
		{ $$ = $1; }
	| Json
		{ $$ = new yy.Json({value:$1}); }
/*	| ATLBRA JsonArray
		{ $$ = new yy.Json({value:$2}); }
*/	| NewClause
		{ $$ = $1; }
/*	| AT LPAR Expression RPAR
		{ $$ = new yy.FuncValue({funcid: 'CLONEDEEP', args:[$3]}); }
*/
/*	| AT LPAR Json RPAR
		{ $$ = new yy.Json({value:$3}); }
*/	| LPAR Select RPAR
		{
			if(!yy.queries) yy.queries = [];
			yy.queries.push($2);
			$2.queriesidx = yy.queries.length;
			$$ = $2;
		}
	| LPAR Insert RPAR
		{
			if(!yy.queries) yy.queries = [];
			yy.queries.push($2);
			$2.queriesidx = yy.queries.length;
			$$ = $2;
		}
	| LPAR (CreateVertex|CreateEdge) RPAR
		{
			if(!yy.queries) yy.queries = [];
			yy.queries.push($2);
			$2.queriesidx = yy.queries.length;
			$$ = $2;
		}

	| JavaScript
		{$$ = $1}
	| CURRENT_TIMESTAMP
		{ $$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'});}
/*	| USER
		{ $$ = new yy.FuncValue({funcid:'USER'});}
*/	;

JavaScript
	: JAVASCRIPT
		{ $$ = new yy.JavaScript({value:$1.substr(2,$1.length-4)}); }
	;

NewClause
	: NEW Literal
		{ $$ = new yy.FuncValue({funcid:$2, newid:true}); }
	| NEW FuncValue
		{ $$ = $2; yy.extend($$,{newid:true}); }
	;


CastClause
	: CAST LPAR Expression AS ColumnType RPAR
		{ $$ = new yy.Convert({expression:$3}) ; yy.extend($$,$5) ; }
	| CAST LPAR Expression AS ColumnType COMMA NUMBER RPAR
		{ $$ = new yy.Convert({expression:$3, style:$7}) ; yy.extend($$,$5) ; }
	| CONVERT LPAR ColumnType COMMA Expression RPAR
		{ $$ = new yy.Convert({expression:$5}) ; yy.extend($$,$3) ; }
	| CONVERT LPAR ColumnType COMMA Expression COMMA NUMBER RPAR
		{ $$ = new yy.Convert({expression:$5, style:$7}) ; yy.extend($$,$3) ; }
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
	| CURRENT_TIMESTAMP
		{ $$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'}); }
/*	| USER
		{ $$ = new yy.FuncValue({funcid:'USER'}); }
*/	;


AggrValue
	: Aggregator LPAR ExprList RPAR OverClause
		{
		  if($3.length > 1 && ($1.toUpperCase() == 'MAX' || $1.toUpperCase() == 'MIN')) {
		  	$$ = new yy.FuncValue({funcid:$1,args:$3});
		  } else {
			$$ = new yy.AggrValue({aggregatorid: $1.toUpperCase(), expression: $3.pop(), over:$5});
		  }
		}
	| Aggregator LPAR DISTINCT Expression RPAR OverClause
		{ $$ = new yy.AggrValue({aggregatorid: $1.toUpperCase(), expression: $4, distinct:true, over:$6}); }
	| Aggregator LPAR ALL Expression RPAR OverClause
		{ $$ = new yy.AggrValue({aggregatorid: $1.toUpperCase(), expression: $4,
		 over:$6}); }
	;

OverClause
	:
		{$$ = undefined; }
	| OVER LPAR OverPartitionClause RPAR
		{ $$ = new yy.Over(); yy.extend($$,$3); }
	| OVER LPAR OverOrderByClause RPAR
		{ $$ = new yy.Over(); yy.extend($$,$3); }
	| OVER LPAR OverPartitionClause OverOrderByClause RPAR
		{ $$ = new yy.Over(); yy.extend($$,$3); yy.extend($$,$4);}
	;

OverPartitionClause
	: PARTITION BY GroupExpressionsList
		{ $$ = {partition:$3}; }
	;
OverOrderByClause
	: ORDER BY OrderExpressionsList
		{ $$ = {order:$3}; }
	;
Aggregator
	: SUM { $$ = "SUM"; }
	| COUNT { $$ = "COUNT"; }
	| MIN { $$ = "MIN"; }
	| MAX { $$ = "MAX"; }
	| AVG { $$ = "AVG"; }
	| FIRST { $$ = "FIRST"; }
	| LAST { $$ = "LAST"; }
	| AGGR { $$ = "AGGR"; }
	| ARRAY { $$ = "ARRAY"; }
/*	| REDUCE { $$ = "REDUCE"; } */
	;

FuncValue
	: Literal LPAR (DISTINCT|ALL)? ExprList RPAR
		{
			var funcid = $1;
			var exprlist = $4;
			if(exprlist.length > 1 && (funcid.toUpperCase() == 'MIN' || funcid.toUpperCase() == 'MAX')) {
					$$ = new yy.FuncValue({funcid: funcid, args: exprlist});
			} else if(alasql.aggr[$1]) {
		    	$$ = new yy.AggrValue({aggregatorid: 'REDUCE',
                      funcid: funcid, expression: exprlist.pop(),distinct:($3=='DISTINCT') });
		    } else {
			    $$ = new yy.FuncValue({funcid: funcid, args: exprlist});
			};
		}
	| Literal LPAR RPAR
		{ $$ = new yy.FuncValue({ funcid: $1 }) }
	| IF LPAR ExprList RPAR
		{ $$ = new yy.FuncValue({ funcid: 'IIF', args:$3 }) }
	;

ExprList
	: Expression
		{ $$ = [$1]; }
	| ExprList COMMA Expression
		{ $1.push($3); $$ = $1 }
	;

NumValue
	: NUMBER
		{ $$ = new yy.NumValue({value:+$1}); }
	;

LogicValue
	: TRUE
		{ $$ = new yy.LogicValue({value:true}); }
	| FALSE
		{ $$ = new yy.LogicValue({value:false}); }
	;

StringValue
	: STRING
		{ $$ = new yy.StringValue({value: $1.substr(1,$1.length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); }
	| NSTRING
		{ $$ = new yy.StringValue({value: $1.substr(2,$1.length-3).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); }
	;

NullValue
	: NULL
		{ $$ = new yy.NullValue({value:undefined}); }
	;

VarValue
	: AT Literal
		{ $$ = new yy.VarValue({variable:$2}); }
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
	: DOLLAR (Literal|NUMBER)
		{ $$ = new yy.ParamValue({param: $2}); }
/*	| DOLLAR NUMBER
		{ $$ = new yy.ParamValue({param: $2}); }
*/	| COLON Literal
		{ $$ = new yy.ParamValue({param: $2}); }
	| QUESTION
		{
			if(typeof yy.question == 'undefined') yy.question = 0;
			$$ = new yy.ParamValue({param: yy.question++});
		}
	| BRAQUESTION
		{
			if(typeof yy.question == 'undefined') yy.question = 0;
			$$ = new yy.ParamValue({param: yy.question++, array:true});
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
		{ $$ = undefined; }
	;

Op
	: Expression REGEXP Expression
		{ $$ = new yy.Op({left:$1, op:'REGEXP', right:$3}); }
	| Expression LIKE Expression
		{ $$ = new yy.Op({left:$1, op:'LIKE', right:$3}); }
	| Expression LIKE Expression ESCAPE Expression
		{ $$ = new yy.Op({left:$1, op:'LIKE', right:$3, escape:$5}); }
	| Expression NOT_LIKE Expression
		{ $$ = new yy.Op({left:$1, op:'NOT LIKE', right:$3 }); }
	| Expression NOT_LIKE Expression ESCAPE Expression
		{ $$ = new yy.Op({left:$1, op:'NOT LIKE', right:$3, escape:$5 }); }
	| Expression PLUS Expression
		{ $$ = new yy.Op({left:$1, op:'+', right:$3}); }
	| Expression MINUS Expression
		{ $$ = new yy.Op({left:$1, op:'-', right:$3}); }
	| Expression STAR Expression
		{ $$ = new yy.Op({left:$1, op:'*', right:$3}); }
	| Expression SLASH Expression
		{ $$ = new yy.Op({left:$1, op:'/', right:$3}); }
	| Expression MODULO Expression
		{ $$ = new yy.Op({left:$1, op:'%', right:$3}); }
	| Expression CARET Expression
		{ $$ = new yy.Op({left:$1, op:'^', right:$3}); }

	| Expression ARROW Literal
		{ $$ = new yy.Op({left:$1, op:'->' , right:$3}); }
	| Expression ARROW NumValue
		{ $$ = new yy.Op({left:$1, op:'->' , right:$3}); }
	| Expression ARROW LPAR Expression RPAR
		{ $$ = new yy.Op({left:$1, op:'->' , right:$4}); }
	| Expression ARROW FuncValue
		{ $$ = new yy.Op({left:$1, op:'->' , right:$3}); }

	| Expression EXCLAMATION Literal
		{ $$ = new yy.Op({left:$1, op:'!' , right:$3}); }
	| Expression EXCLAMATION NumValue
		{ $$ = new yy.Op({left:$1, op:'!' , right:$3}); }
	| Expression EXCLAMATION LPAR Expression RPAR
		{ $$ = new yy.Op({left:$1, op:'!' , right:$4}); }
	| Expression EXCLAMATION FuncValue
		{ $$ = new yy.Op({left:$1, op:'!' , right:$3}); }




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
		{
			if($1.op == 'BETWEEN1') {

				if($1.left.op == 'AND') {
					$$ = new yy.Op({left:$1.left.left,op:'AND',right:
						new yy.Op({left:$1.left.right, op:'BETWEEN',
							right1:$1.right, right2:$3})
					});
				} else {
					$$ = new yy.Op({left:$1.left, op:'BETWEEN',
						right1:$1.right, right2:$3});
				}

			} else if($1.op == 'NOT BETWEEN1') {
				if($1.left.op == 'AND') {
					$$ = new yy.Op({left:$1.left.left,op:'AND',right:
						new yy.Op({left:$1.left.right, op:'NOT BETWEEN',
							right1:$1.right, right2:$3})
					});
				} else {
					$$ = new yy.Op({left:$1.left, op:'NOT BETWEEN',
						right1:$1.right, right2:$3});
				}
			} else {
				$$ = new yy.Op({left:$1, op:'AND', right:$3});
			}


		}
	| Expression OR Expression
		{ $$ = new yy.Op({left:$1, op:'OR' , right:$3}); }
	| NOT Expression
		{ $$ = new yy.UniOp({op:'NOT' , right:$2}); }
	| MINUS Expression
		{ $$ = new yy.UniOp({op:'-' , right:$2}); }
	| PLUS Expression
		{ $$ = new yy.UniOp({op:'+' , right:$2}); }
	| SHARP Expression
		{ $$ = new yy.UniOp({op:'#' , right:$2}); }
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

	| Expression IN LPAR RPAR
		{ $$ = new yy.Op({left: $1, op:'IN', right:[]}); }

	| Expression NOT IN LPAR RPAR
		{ $$ = new yy.Op({left: $1, op:'NOT IN', right:[]}); }

	| Expression IN ColFunc
		{ $$ = new yy.Op({left: $1, op:'IN', right:$3}); }

	| Expression NOT IN ColFunc
		{ $$ = new yy.Op({left: $1, op:'NOT IN', right:$4}); }

	| Expression IN VarValue
		{ $$ = new yy.Op({left: $1, op:'IN', right:$3}); }

	| Expression NOT IN VarValue
		{ $$ = new yy.Op({left: $1, op:'NOT IN', right:$4}); }

	/*
		Hack - it impossimle to parse BETWEEN AND and AND expressions with grammar.
		At least, I do not know how.
	*/
	| Expression BETWEEN Expression
		{
/*			var expr = $3;
			if(expr.left && expr.left.op == 'AND') {
				$$ = new yy.Op({left:new yy.Op({left:$1, op:'BETWEEN', right:expr.left}), op:'AND', right:expr.right });
			} else {
*/
				$$ = new yy.Op({left:$1, op:'BETWEEN1', right:$3 });
//			}
		}
	| Expression NOT_BETWEEN Expression
		{
//			var expr = $3;
//			if(expr.left && expr.left.op == 'AND') {
//				$$ = new yy.Op({left:new yy.Op({left:$1, op:'NOT BETWEEN', right:expr.left}), op:'AND', right:expr.right });
//			} else {
				$$ = new yy.Op({left:$1, op:'NOT BETWEEN1', right:$3 });
//			}
		}
	| Expression IS Expression
		{ $$ = new yy.Op({op:'IS' , left:$1, right:$3}); }
	| Expression DOUBLECOLON ColumnType
		{ $$ = new yy.Convert({expression:$1}) ; yy.extend($$,$3) ; }
	;

ColFunc
	: Column
		{ $$ = $1;}
	| FuncValue
		{ $$ = $1;}
	| AT LPAR Expression RPAR
		{ $$ = $3;}
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





