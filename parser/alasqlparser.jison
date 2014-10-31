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
'SELECT'                                        return 'SELECT'
'FROM'                                          return 'FROM'
'WHERE'                                         return 'WHERE'
'GROUP BY'                                      return 'GROUPBY'
'HAVING'                                        return 'HAVING'
'ORDER BY'                                      return 'ORDERBY'
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
'*'												return 'STAR'
';'												return 'SEMICOLON'
[a-zA-Z_][a-zA-Z_0-9]+                       	return 'LITERAL'
[0-9]+											return 'NUMBER'
\(												return 'LPAR'
\)												return 'RPAR'
<<EOF>>               							return 'EOF'
.												return 'INVALID'


/lex

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

Statement
	: Select
	| Insert
	| Update
	| Delete
	| CreateTable
	| DropTable
	;

Select
	: SELECT STAR FROM LITERAL 
		{ 
			$$ = new yy.Select({ fields:[new yy.Star()], from: [new yy.Literal({value0:$4})]}); 
		}
	;

Insert
	: INSERT INTO LITERAL VALUES LPAR NUMBER RPAR
		{ $$ = new yy.Insert({into:$3, values: $6}); }
	;
