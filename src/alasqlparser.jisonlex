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

