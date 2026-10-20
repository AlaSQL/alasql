/*
 * SQLite Jison parser grammar rules
 * for SQLidx WebSQL shim over IndexedDB
 * 
 * 
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 by Andrey Gershun
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * Project      : SQLidx: a JavaScript WebSQL shim over IndexedDB
 *                https://github.com/agershun/sqlidx
 * Developed by : Andrey Gerhsun, agershun@gmail.com
 				  Nolan Lawson, nolan@nolanlawson.com
 */

%lex
%options case-insensitive
%%

\[([^\]])*?\]									return 'BRALITERAL'
(["](\\.|[^"]|\\\")*?["])+                    	return 'BRALITERAL'
([`](\\.|[^"]|\\\")*?[`])+                    	return 'BRALITERAL'
X(['](\\.|[^']|\\\')*?['])+                     return 'XSTRING'
(['](\\.|[^']|\\\')*?['])+                  	return 'STRING'


"--"(.*?)($|\r\n|\r|\n)							/* skip -- comments */

\s+   											/* skip whitespace */

'ABORT'			return 'ABORT'
'ACTION'		return 'ACTION'
'ADD'			return 'ADD'
'AFTER'			return 'AFTER'
'ALL'			return 'ALL'
'ALTER'			return 'ALTER'
'ANALYZE'		return 'ANALYZE'
'AND'			return 'AND'
'AS'			return 'AS'
'ASC'			return 'ASC'
'ATTACH'		return 'ATTACH'
'AUTOINCREMENT'	return 'AUTOINCREMENT'
'BEFORE'		return 'BEFORE'
'BEGIN'			return 'BEGIN'
'BETWEEN'		return 'BETWEEN'
'BY'			return 'BY'
'CASCADE'		return 'CASCADE'
'CASE'			return 'CASE'
'CAST'			return 'CAST'
'CHECK'			return 'CHECK'
'COLLATE'		return 'COLLATE'
'COLUMN'		return 'COLUMN'
'COMMIT'		return 'COMMIT'
'CONFLICT'		return 'CONFLICT'
'CONSTRAINT'	return 'CONSTRAINT'
'CREATE'		return 'CREATE'
'CROSS'			return 'CROSS'
'CURRENT_DATE'	return 'CURRENT DATE'
'CURRENT_TIME'	return 'CURRENT TIME'
'CURRENT_TIMESTAMP'		return 'CURRENT TIMESTAMP'
'DATABASE'		return 'DATABASE'
'DEFAULT'		return 'DEFAULT'
'DEFERRABLE'	return 'DEFERRABLE'
'DEFERRED'		return 'DEFERRED'
'DELETE'		return 'DELETE'
'DESC'			return 'DESC'
'DETACH'		return 'DETACH'
'DISTINCT'		return 'DISTINCT'
'DROP'			return 'DROP'
'EACH'			return 'EACH'
'ELSE'			return 'ELSE'
'END'			return 'END'
'ESCAPE'		return 'ESCAPE'
'EXCEPT'		return 'EXCEPT'
'EXCLUSIVE'		return 'EXCLUSIVE'
'EXISTS'		return 'EXISTS'
'EXPLAIN'		return 'EXPLAIN'
'FAIL'			return 'FAIL'
'FOR'			return 'FOR'
'FOREIGN'		return 'FOREIGN'
'FROM'			return 'FROM'
'FULL'			return 'FULL'
'GLOB'			return 'GLOB'
'GROUP'			return 'GROUP'
'HAVING'		return 'HAVING'
'IF'			return 'IF'
'IGNORE'		return 'IGNORE'
'IMMEDIATE'		return 'IMMEDIATE'
'IN'			return 'IN'
'INDEX'			return 'INDEX'
'INDEXED'		return 'INDEXED'
'INITIALLY'		return 'INITIALLY'
'INNER'			return 'INNER'
'INSERT'		return 'INSERT'
'INSTEAD'		return 'INSTEAD'
'INTERSECT'		return 'INTERSECT'
'INTO'			return 'INTO'
'IS'			return 'IS'
'ISNULL'		return 'ISNULL'
'JOIN'			return 'JOIN'
'KEY'			return 'KEY'
'LEFT'			return 'LEFT'
'LIKE'			return 'LIKE'
'LIMIT'			return 'LMIT'
'MATCH'			return 'MATCH'
'NATURAL'		return 'NATURAL'
'NO'			return 'NO'
'NOT'			return 'NOT'
'NOTNULL'		return 'NOTNULL'
'NULL'			return 'NULL'
'OF'			return 'OF'
'OFFSET'		return 'OFFSET'
'ON'			return 'ON'
'OR'			return 'OR'
'ORDER'			return 'ORDER'
'OUTER'			return 'OUTER'
'PLAN'			return 'PLAN'
'PRAGMA'		return 'PRAGMA'
'PRIMARY'		return 'PRIMARY'
'QUERY'			return 'QUERY'
'RAISE'			return 'RAISE'
'RECURSIVE'		return 'RECURSIVE'
'REFERENCES'	return 'REFERENCES'
'REGEXP'		return 'REGEXP'
'REINDEX'		return 'REINDEX'
'RELEASE'		return 'RELEASE'
'RENAME'		return 'RENAME'
'REPLACE'		return 'REPLACE'
'RESTRICT'		return 'RESTRICT'
'RIGHT'			return 'RIGHT'
'ROLLBACK'		return 'ROLLBACK'
'ROW'			return 'ROW'
'SAVEPOINT'		return 'SAVEPOINT'
'SELECT'		return 'SELECT'
'SET'			return 'SET'
'TABLE'			return 'TABLE'
'TEMP'			return 'TEMP'
'TEMPORARY'		return 'TEMPORARY'
'THEN'			return 'THEN'
'TO'			return 'TO'
'TRANSACTION'	return 'TRANSACTION'
'TRIGGER'		return 'TRIGGER'
'UNION'			return 'UNION'
'UNIQUE'		return 'UNIQUE'
'UPDATE'		return 'UPDATE'
'USING'			return 'USING'
'VACUUM'		return 'VACUUM'
'VALUES'		return 'VALUES'
'VIEW'			return 'VIEW'
'VIRTUAL'		return 'VIRTUAL'
'WHEN'			return 'WHEN'
'WHERE'			return 'WHERE'
'WITH'			return 'WITH'
'WITHOUT'		return 'WITHOUT'

[-]?(\d*[.])?\d+[eE]\d+							return 'NUMBER'
[-]?(\d*[.])?\d+								return 'NUMBER'

'~'												return 'TILDEs'
'+'												return 'PLUS'
'-' 											return 'MINUS'
'*'												return 'STAR'
'/'												return 'SLASH'
'%'												return 'REM'
'>>'											return 'RSHIFT'
'<<'											return 'LSHIFT'
'<>'											return 'NE'
'!='											return 'NE'
'>='											return 'GE'
'>'												return 'GT'
'<='											return 'LE'
'<'												return 'LT'
'='												return 'EQ'
'&'												return 'BITAND'
'|'												return 'BITOR'

'('												return 'LPAR'
')'												return 'RPAR'


'.'												return 'DOT'
','												return 'COMMA'
':'												return 'COLON'
';'												return 'SEMICOLON'
'$'												return 'DOLLAR'
'?'												return 'QUESTION'
'^'												return 'CARET'

[a-zA-Z_][a-zA-Z_0-9]*                       	return 'LITERAL'

<<EOF>>               							return 'EOF'
.												return 'INVALID'

/lex

/* %left unary_operator binary_operator  */

%left OR
%left BETWEEN
%left AND
%right NOT
%left IS MATCH LIKE IN ISNULL NOTNULL NE EQ
%left ESCAPE
%left GT LE LT GE
%left BITAND BITOR LSHIFT RSHIFT
$left PLUS MINUS
%left STAR SLASH REM
%left CONCAT
%left COLLATE
%right BITNOT


%start main

%%

name
	: LITERAL
		{ $$ = $1; }
	| BRALITERAL
		{ $$ = $1.substr(1,$1.length-2); }	
	;

signed_number
	: NUMBER
		{ $$ = $1; }
	;

string_literal
	: STRING
		{ $$ = $1; }
	| XSTRING
		{ $$ = $1; }
	;

database_table_name 
	: name DOT name
		{ $$ = {database:$1, table:$3}; }
	| name
		{ $$ = {table:$1}; }
	;

database_pragma_name 
	: name DOT name
		{ $$ = {database:$1, pragma:$3}; }
	| name
		{ $$ = {pragma:$1}; }
	;

database_index_name 
	: name DOT name
		{ $$ = {database:$1, index:$3}; }
	| name
		{ $$ = {index:$1}; }
	;

database_trigger_name 
	: name DOT name
		{ $$ = {database:$1, trigger:$3}; }
	| name
		{ $$ = {trigger:$1}; }
	;

database_view_name 
	: name DOT name
		{ $$ = {database:$1, view:$3}; }
	| name
		{ $$ = {view:$1}; }
	;

main
	: sql_stmt_list EOF
		{ 
			$$ = $1; 
			return $$;
		}
	;

sql_stmt_list
	: sql_stmt_list SEMICOLON sql_stmt 
		{ $$ = $1; if($3) $$.push($3); }
	| sql_stmt
		{ $$ = [$1]; }
	;

sql_stmt
	: sql_stmt_explain sql_stmt_stmt
		{ $$ = $2; yy.extend($$, $1); }
	| 
		{ $$ = undefined; }
	;

explain_stmt
	:
		{ $$ = undefined; }
	| EXPLAIN
		{ $$ = {explain:true}; }
	| EXPLAIN QUERY PLAN
		{ $$ = {explain:true}; }
	;

sql_stmt
	: alter_table_stmt
	| analyze_stmt
	| attach_stmt
	| begin_stmt
	| commit_stmt
	| create_index_stmt
	| create_table_stmt
	| create_trigger_stmt
	| create_view_stmt
	| create_virtual_table_stmt
	| delete_stmt
/*
	| delete_stmt_limited
*/
	| detach_stmt
	| drop_index_stmt
	| drop_table_stmt
	| drop_trigger_stmt
	| drop_view_stmt
	| insert_stmt
	| pragma_stmt
	| reindex_stmt
	| release_stmt
	| rollback_stmt
	| savepoint_stmt
	| select_stmt
	| update_stmt
/*
	| update_stmt_limited
*/
	| vacuum_stmt
	;


alter_table_stmt
	: ALTER TABLE database_table_name alter_table_action
		{ $$ = {statement: 'ALTER TABLE'}; 
		yy.extend($$, $3); yy.extend($$, $4);  }
	;

alter_table_action
	: RENAME TO name
		{ $$ = {action: 'RENAME TO', new_table:$3}; }
	| ADD COLUMN column_def
		{ $$ = {action: 'ADD COLUMN', column_def:$3}; }
	;

analyze_stmt
	: ANALYZE database_table_name
		{ $$ = {statement: 'ANALYZE'}; yy.extend($$, $2); }
	;


attach_stmt
	: ATTACH database expr AS name
		{ $$ = {statement: 'ATTACH', expr: $3, database:$5}; }	
	;

database 
	:
	| DATABASE
	;


begin_stmt
	: BEGIN deferred_exclusive TRANSACTION
		{ $$ = {statement: 'BEGIN TRANSACTION', type: $2}; }			
	;

deferred_exclusive
	:
		{ $$ = undefined; }
	| DEFERRED
		{ $$ = 'DEFERRED'; }
	| IMMEDIATE
		{ $$ = 'IMMEDIATE'; }
	| EXCLUSIVE
		{ $$ = 'EXCLUSIVE'; }
	;


commit_stmt
	: commit transaction
		{ $$ = {statement: 'COMMIT TRANSACTION'}; }			
	;

commit
	: COMMIT
	| END
	;

transaction
	:
	| TRANSACTION
	;

create_index_stmt
	: CREATE INDEX if_not_exists database_index_name ON name 
	    LPAR columns RPAR where
	    { $$ = {statement: 'CREATE INDEX', table:$6, columns:$8 }; 
	    	yy.extend($$, $3); 
	    	yy.extend($$, $4); 
	    	yy.extend($$,$10);
	    }
	| CREATE UNIQUE INDEX if_not_exists database_index_name ON name 
	    LPAR columns RPAR where
	    { $$ = {statement: 'CREATE INDEX', unique:true, table:$7, columns:$9 }; 
	    	yy.extend($$, $2); 
	    	yy.extend($$, $4); 
	    	yy.extend($$, $5); 
	    	yy.extend($$,$11);
	    }
	;

if_not_exists
	:
		{ $$ = undefined; }
	| IF NOT EXISTS
		{ $$ = {if_not_exists: true}; }
	;

columns
	: columns COMMA name
		{ $$ = $1; $$.push($3); }
	| name
		{ $$ = [$1]; }
	;

where
	: WHERE expr
		{ $$ = {where: $2}; }
	|
	;

when
	: WHEN expr
		{ $$ = {when: $2}; }
	|
	;

create_table_stmt
	: CREATE temporary TABLE if_not_exists database_table_name AS select_stmt
		{ $$ = {statement: 'CREATE TABLE', select:$7};
			yy.extend($$,$2);
			yy.extend($$,$4);
			yy.extend($$,$5);
		}
	| CREATE temporary TABLE if_not_exists database_table_name LPAR column_defs 
		table_constraints RPAR without_rowid
		{ $$ = {statement: 'CREATE TABLE', column_defs: $7, table_constraints:$8 };
			yy.extend($$,$2);
			yy.extend($$,$4);
			yy.extend($$,$5);
			yy.extend($$,$10);
		}
	;
without_rowid
	: 
		{ $$ = undefined; }
	| WITHOUT ROWID
		{ $$ = {without_rowid: true} }
	;

temporary
	:
		{ $$ = undefined; }
	| TEMPORARY
		{ $$ = {temporary:true}; }
	;

column_defs
	: column_defs COMMA column_def
		{ $$ = $1; $$.push($3); }
	| column_def
		{ $$ = [$1]; }
	;

column_def
	: name type_name column_constraints
		{ $$ = {column:$1, constraints: $3}; yy.extend($$,$2); }
	| name type_name
		{ $$ = {column:$1}; yy.extend($$,$2); }
	;

type_name
	: names
		{ $$ = {type: $1.toUpperCase()}; }
	| names LPAR signed_number RPAR
		{ $$ = {type: $1.toUpperCase(), precision: $3}; }
	| names LPAR signed_number COMMA signed_number RPAR
		{ $$ = {type: $1.toUpperCase(), precision: $3, scale:$5}; }
	;

names 
	: names name
		{ $$ = $1+' '+$2; }
	| name
		{ $$ =$1; }
	;


column_constraints
	: column_constraints column_constraint
		{ $$ = $1; $$.push($2); }
	| column_constraint
		{ $$ = [$1]; }
	;

column_constraint
	: CONSTRAINT name col_constraint
		{ $$ = {constraint: $2}; yy.extend($$,$3); }
	| col_constraint
		{ $$ = $1; }
	;

col_constraint
	: PRIMARY KEY asc_desc conflict_clause autoincrement
		{ $$ = {type: 'PRIMARY KEY'}; yy.extend($$,$3); 
			yy.extend($$,$4); yy.extend($$,$5); }
	| NOT NULL conflict_clause
		{ $$ = {type: 'NOT NULL'}; yy.extend($$,$3); }
	| UNIQUE conflict_clause
		{ $$ = {type: 'UNIQUE'}; yy.extend($$,$2); }
	| CHECK LPAR expr RPAR
		{ $$ = {type: 'CHECK', expr: $3}; }
	| DEFAULT signed_number
		{ $$ = {type: 'DEFAULT', number: $2}; }
	| DEFAULT string_literal
		{ $$ = {type: 'DEFAULT', string: $2}; }
	| DEFAULT name
		{ $$ = {type: 'DEFAULT', value: $2}; }
	| DEFAULT LPAR expr RPAR
		{ $$ = {type: 'DEFAULT', expr: $3}; }
	| COLLATE name
		{ $$ = {type: 'COLLATE', collate: $2}; }
	| foreign_key_clause
		{ $$ = {type: 'FOREIGN KEY'}; yy.extend($$,$1); }
	;

asc_desc
	:
		{ $$ = undefined; }
	| ASC
		{ $$ = {order:'ASC'}; }
	| DESC
		{ $$ = {order:'DESC'}; }
	;

autoincrement
	: 
		{ $$ = undefined; }
	| AUTOINCREMENT
		{ $$ = {autoincrement:true}; }
	;


table_constraints
	: 
		{ $$ = undefined; }
	| COMMA tab_constraints
		{ $$ = $2; }
	;

tab_constraints
	: tab_constraints COMMA table_constraint
		{ $$ = $1; $$.push($3); }
	| table_constraint
		{ $$ = [$1]; } 
	;

table_constraint
	: CONSTRAINT name tab_constraint
		{ $$ = {constraint: $2}; yy.extend($$,$3); } 
	| tab_constraint
		{ $$ = $1; }
	;

tab_constraint
	: PRIMARY KEY LPAR columns RPAR conflict_clause
		{ $$ = {type:'PRIMARY KEY', columns: $4}; yy.extend($$,$6); }
	| UNIQUE LPAR columns RPAR conflict_clause
		{ $$ = {type:'UNIQUE', columns: $3}; yy.extend($$,$5); }
	| CHECK LPAR expr RPAR
		{ $$ = {type:'CHECK', expr: $3}; }
	| FOREIGN KEY LPAR columns RPAR foreign_key_clause
		{ $$ = {type:'FOREIGN KEY', columns: $4}; yy.extend($$, $6); }
	;

foreign_key_clause
	: REFERENCES name LPAR columns RPAR on_foreign_key_clause
		{ $$ = {table: $2, columns: $4}; yy.extend($$, $6); }
	;

on_foreign_key_clause
	:
		{ $$ = null; }
	| ON DELETE NO ACTION
		{ $$ = {on_delete_no_action:true}; }
	| ON UPDATE NO ACTION
		{$$ = {on_update_no_action:true}; }
	| ON DELETE NO ACTION ON UPDATE NO ACTION
		{$$ = {on_delete_no_action:true, on_update_no_action:true}; }
	;

conflict_clause
	: 
		{ $$ = undefined; }
	| ON CONFLICT ROLLBACK
		{ $$ = {conflict: 'ROLLBACK'}; }
	| ON CONFLICT ABORT
		{ $$ = {conflict: 'ABORT'}; }
	| ON CONFLICT FAIL
		{ $$ = {conflict: 'FAIL'}; }
	| ON CONFLICT IGNORE
		{ $$ = {conflict: 'IGNORE'}; }
	| ON CONFLICT REPLACE
		{ $$ = {conflict: 'REPLACE'}; }
	;

create_trigger_stmt
	: CREATE temporary TRIGGER if_not_exists database_trigger_name before_after
		delete_insert_update ON name for_each_row when begin_trigger_end
		{
			$$ = {statement: 'CREATE TRIGGER', table:$9};
			yy.extend($$,$2);
			yy.extend($$,$4);
			yy.extend($$,$5);
			yy.extend($$,$6);
			yy.extend($$,$7);
			yy.extend($$,$10);
			yy.extend($$,$11);
			yy.extend($$,$12);
		}
	;

	
before_after 
	:
		{ $$ = undefined; }
	| BEFORE
		{ $$ = {when: 'BEFORE'}; }
	| AFTER
		{ $$ = {when: 'AFTER'}; }
	| INSTEAD OF
		{ $$ = {when: 'INSTEAD OF'}; }
	;

delete_insert_update
	: DELETE
		{ $$ = {action: 'DELETE'}; }
	| INSERT
		{ $$ = {action: 'INSERT'}; }
	| UPDATE 
		{ $$ = {action: 'UPDATE'}; }
	| UPDATE OF columns
		{ $$ = {action: 'UPDATE', columns: $3}; }
	;	


for_each_row
	:
		{ $$ = undefined; }
	| FOR EACH ROW
		{ $$ = {for_each_row: true}; }
	;


begin_trigger_end
	: BEGIN uids_stmts END
		{ $$ = {stmts: $2}; }
	;

uids_stmts
	: uids_stmts uids_stmt SEMICOLON
		{ $$ = $1; $$.push($2); }
	| uids_stmt SEMICOLON
		{ $$ = [$2]; }
	;

uids_stmt
	: update_stmt 
		{ $$ = $1; }
	| insert_stmt 
		{ $$ = $1; }
	| delete_stmt 
		{ $$ = $1; }
	| select_stmt 
		{ $$ = $1; }
	;


create_view_stmt
	: CREATE temporary VIEW if_not_exists database_view_name AS select_stmt
		{ 
			$$ = {statement: 'CREATE VIEW', select: $7}; 
			yy.extend($$,$2); 
			yy.extend($$,$4); 
			yy.extend($$,$5); 
		}
	;

	
create_virtual_table_stmt
	: CREATE VIRTUAL TABLE if_not_exists database_table_name USING name module_arguments_par
		{ 
			$$ = {statement: 'CREATE VIRTUAL TABLE', module: $7}; 
			yy.extend($$,$4); 
			yy.extend($$,$5); 
			yy.extend($$,$8); 
		}
	;

	
module_arguments_par
	: 
		{ $$ = undefined; }
	| LPAR module_arguments RPAR 
		{ $$ = {module_arguments: $2}; }
	;


module_arguments
	: module_arguments COMMA module_argument
		{ $$ = $1; $$.push($3); }
	| module_argument
		{ $$ = [$1]; }
	;

delete_stmt
	: DELETE FROM qualified_table_name where limit_clause
		{ 
			$$ = {statement:'DELETE'};
			yy.extend($$,$3);
			yy.extend($$,$4);
			yy.extend($$,$5);
		}
	| with DELETE FROM qualified_table_name where limit_clause
		{ 
			$$ = {statement:'DELETE'};
			yy.extend($$,$1);
			yy.extend($$,$4);
			yy.extend($$,$5);
			yy.extend($$,$6);
		}
	;

	
qualified_table_name 
	: database_table_name indexed
		{ $$ = $1; yy.extend($$, $2); }
	;	

indexed
	: 
		{ $$ = undefined; }
	| INDEXED BY name
		{ $$ = {indexed_by:$4}; }
	| NOT INDEXED
		{ $$ = {not_indexed:true}; }
	;

with
	: WITH recursive cte_tables
		{ $$ = {with: $3}; yy.extend($$,$2); }
	;

recursive
	: RECURSIVE
		{ $$ = {recursive:true}; }
	|
		{ $$ = undefined; }
	;

cte_tables
	: cte_table_name AS LPAR select_stmt RPAR
		{ 	
			yy.extend($1, {select:$4});
			$$ = [$1];
		}
	| cte_tables COMMA cte_table_name AS LPAR select_stmt RPAR
		{
			yy.extend($3, {select:$6});		
			$$ = $1;
			$$.push($3);
		}
	;

cte_table_name
	: name 
		{ $$ = {table: $1}; }
	| name LPAR columns RPAR
		{ $$ = {table:$1, columns: $3}}
	;

limit_clause
	:
		{ $$ = undefined; }
	| ORDER BY ordering_terms 
		{
			$$ = {order_by:$3};
		}
	| LIMIT expr offset
		{ 
			$$ = {limit:$2};
			yy.extend($$, $3);
		}
	| ORDER BY ordering_terms LIMIT expr offset
		{ 
			$$ = {order_by:$3, limit:$5};
			yy.extend($$, $6);
		}
	;

ordering_terms
	: ordering_terms COMMA ordering_term
		{ $$ = $1; $$.push($3); }
	| ordering_term
		{ $$ = [$1]; }
	;

ordering_term
	: name asc_desc
		{ 
			$$ = {term: $1}; 
			yy.extend($$, $2);
		}
	;
detach_stmt
	: DETACH name
		{ $$ = {statement:'DETACH', database:$2}; }
	| DETACH DATABASE name
		{ $$ = {statement:'DETACH', database:$3}; }
	;

	
drop_index_stmt
	: DROP INDEX if_exists database_index_name
		{ 
			$$ = {statement: 'DROP INDEX'}; 
			yy.extend($$,$3);
			yy.extend($$,$4);
		} 
	;
	
if_exists
	: IF EXISTS
		{ $$ = {if_exists:true}; }
	|
		{ $$ = undefined; }
	;

drop_table_stmt
	: DROP TABLE if_exists database_table_name
		{ 
			$$ = {statement: 'DROP TABLE'}; 
			yy.extend($$,$3);
			yy.extend($$,$4);
		} 
	;

drop_trigger_stmt
	: DROP TRIGGER if_exists database_trigger_name
		{ 
			$$ = {statement: 'DROP TRIGGER'}; 
			yy.extend($$,$3);
			yy.extend($$,$4);
		} 
	;

	
	
drop_view_stmt
	: DROP VIEW if_exists database_view_name
		{ 
			$$ = {statement: 'DROP VIEW'}; 
			yy.extend($$,$3);
			yy.extend($$,$4);
		} 
	;
	
insert_stmt
	: with insert_action INTO database_table_name columns_par insert_values
		{ 
			$$ = {statement: 'INSERT', action: $2};
			yy.extend($$,$1);
			yy.extend($$,$4);
			yy.extend($$,$5);
			yy.extend($$,$6);
		}

	| insert_action INTO database_table_name columns_par insert_values
		{ 
			$$ = {statement: 'INSERT', action: $1};
			yy.extend($$,$3);
			yy.extend($$,$4);
			yy.extend($$,$5);
		}
	;

insert_action
	: INSERT
		{ $$ = 'INSERT'; }
	| REPLACE
		{ $$ = 'REPLACE'; }
	| INSERT OR REPLACE
		{ $$ = 'INSERT OR REPLACE'; }
	| INSERT OR ROLLBACK
		{ $$ = 'INSERT OR ROLLBACK'; }
	| INSERT OR ABORT
		{ $$ = 'INSERT OR ABORT'; }
	| INSERT OR FAIL
		{ $$ = 'INSERT OR FAIL'; }
	| INSERT OR IGNORE
		{ $$ = 'INSERT OR IGNORE'; }
	;

insert_values
	: VALUES values
		{ $$ = {values: $2}; }
	| select_stmt
		{ $$ = {select:$1}; }
	| DEFAULT VALUES
		{ $$ = {default_values: true}; }
	;

columns_par
	: 
		{ $$ = undefined; }
	| LPAR columns RPAR
		{ $$ = {columns: $2}}
	;
pragma_stmt
	: PRAGMA database_pragma_name 
		{ $$ = {statement: 'PRAGMA'}; yy.extend($$,$1); }
	| PRAGMA database_pragma_name EQ pragma_value
		{ $$ = {statement: 'PRAGMA', value:$4}; yy.extend($$,$1); }
	| PRAGMA database_pragma_name EQ LPAR pragma_value RPAR
		{ $$ = {statement: 'PRAGMA', value:$5}; yy.extend($$,$1); }
	;

pragma_value
	: signed_number
		{ $$ = {number: $1}; }
	| name
		{ $$ = {name: $1}; }
	| string_literal
		{ $$ = {string: $1}; }
	;
reindex_stmt
	: REINDEX
		{ $$ = {statement: 'REINDEX'}; }
	| REINDEX name
		{ $$ = {statement: 'REINDEX', name: $2}; }
	| REINDEX name DOT name
		{ $$ = {statement: 'REINDEX', database: $2, name: $2}; }
	;
	
release_stmt
	: RELEASE savepoint name
		{ $$ = {statement: 'RELEASE SAVEPOINT', savepoint: $3}; }
	;

savepoint
	: 
	| SAVEPOINT
	;
	
rollback_stmt
	: ROLLBACK transaction TO savepoint name
		{ $$ = {statement: 'ROLLBACK TRANSACTION', savepoint: $3}; }
	| ROLLBACK transaction
		{ $$ = {statement: 'ROLLBACK TRANSACTION'}; }
	;

savepoint_stmt
	: SAVEPOINT name
		{ $$ = {statement: 'SAVEPOINT', savepoint: $3}; }
	;

select_stmt
	: with compound_selects limit_clause 
		{ 
			$$ = {statement: 'SELECT', selects: $2};
			yy.extend($$,$3);
		}
	| compound_selects limit_clause 
		{ 
			$$ = {statement: 'SELECT', selects: $1};
			yy.extend($$,$2);
		}
	;

compound_selects
	: compound_selects compound_operator select
		{ $$ = $1; yy.extend($3,{compound:$2}); $$.push($3); }
	| select
		{ $$ = [$1]; }
	;

compound_operator
	: UNION
		{ $$ = 'UNION'; }
	| UNION ALL
		{ $$ = 'UNION ALL'; }
	| INTERSECT
		{ $$ = 'INTERSECT'; }
	| EXCEPT
		{ $$ = 'EXCEPT'; }
	;

select
	: SELECT distinct_all result_columns from where group_by
		{ 
			$$ = {columns:$3};
			yy.extend($$,$2);
			yy.extend($$,$4);
			yy.extend($$,$5);
			yy.extend($$,$6);
		}
/*	| VALUES values
		{ $$ = {values: $2}; }
*/	;

distinct_all
	:
		{ $$ = undefined; }
	| DISTINCT
		{ $$ = {distinct:true}; }
	| ALL
		{ $$ = {all:true}; }
	;

result_columns
	: result_columns COMMA result_column
		{ $$ = $1; $$.push($3); }
	| result_column
		{ $$ = [$1]; }
	;

result_column
	: STAR
		{ $$ = {star:true}; }
	| name DOT STAR
		{ $$ = {table: $1, star:true}; }
	| expr alias
		{ $$ = {expr: $1}; yy.extend($$,$2);  }
	;

alias
	:
		{ $$ = undefined;}
	| name
		{ $$ = {alias: $1};}
	| AS name
		{ $$ = {alias: $2};}
	;

from
	: 
		{ $$ = undefined; }
/*	| FROM table_or_subqueries
		{ $$ = {from:$2}; }
*/	| FROM join_clause
		{ $$ = {from:$2}; }
	;
/*
table_or_subqueries
	: table_or_subqueries COMMA table_or_subquery
		{ $$ = $1; $$.push($3); }
	| table_or_subquery
		{ $$ = [$1]; }
	;
*/
table_or_subquery
	: database_table_name alias indexed
		{ $$ = $1; yy.extend($$,$2); yy.extend($$,$3); }
/*	| LPAR table_or_subqueries RPAR
		{ $$ = {tabsubs: $2}; }
*/	| LPAR join_clause RPAR
		{ $$ = {join:$2}; }
	| LPAR select_stmt RPAR alias
		{ $$ = {select: $2}; yy.extend($2,$4); }
	; 

join_clause
	: table_or_subquery
		{ $$ = [$1]; }
	| join_clause join_operator table_or_subquery join_constraint
		{ 
			yy.extend($3,$2);
			yy.extend($3,$4);
			$$.push($3);
		}
	;
join_operator
	: COMMA
		{ $$ = {join_type: 'CROSS'}; } 
	| join_type JOIN
		{ $$ = $1; } 
	| NATURAL join_type JOIN
		{ $$ = $1; yy.extend($$, {natural:true}); } 
	;

join_type
	: 
		{ $$ = {join_type: 'INNER'}; }
	| LEFT OUTER
		{ $$ = {join_type: 'LEFT'}; }
	| LEFT
		{ $$ = {join_type: 'LEFT'}; }
	| INNER
		{ $$ = {join_type: 'INNER'}; }
	| CROSS
		{ $$ = {join_type: 'CROSS'}; }
	;

join_constraint
	:
		{ $$ = undefined; } 
	| ON expr
		{ $$ = {on: $2}; }
	| USING LPAR columns RPAR
		{ $$ = {using: $3}; }
	;

group_by
	:
	| GROUP BY exprs
		{ $$ = {group_by: $3}; }
	| GROUP BY exprs HAVING expr	
		{ $$ = {group_by: $3, having: $5}; }
	;

exprs
	: exprs COMMA expr
		{ $$ = $1; $$.push($1); }
	| expr
		{ $$ = [$1]; }
	;

values
	: values COMMA value
		{ $$ = $1; $$.push($3); }
	| value
		{ $$ = [$1]; }
	;

value
	: LPAR subvalues RPAR
		{ $$ = $2; }
	;

subvalues
	: subvalues COMMA expr
		{ $$ = $1; $$.push($3); }
	| expr
		{ $$ = [$1]; }
	;


update_stmt
	: with update_action qualified_table_name SET column_expr_list where limit_clause
		{ 
			$$ = {statement: 'UPDATE', action: $2, set: $5};
			yy.extend($$,$1);
			yy.extend($$,$3);
			yy.extend($$,$6);
		}
	| update_action qualified_table_name SET column_expr_list where limit_clause
		{ 
			$$ = {statement: 'UPDATE', action: $1, set: $4};
			yy.extend($$,$2);
			yy.extend($$,$5);
		}
	;

update_action
	: UPDATE
		{ $$ = 'UPDATE'}
	| UPDATE OR ROLLBACK
		{ $$ = 'UPDATE OR ROLLBACK'}
	| UPDATE OR ABORT
		{ $$ = 'UPDATE OR ABORT'}
	| UPDATE OR REPLACE
		{ $$ = 'UPDATE OR REPLACE'}
	| UPDATE OR FAIL
		{ $$ = 'UPDATE OR FAIL'}
	| UPDATE OR IGNORE
		{ $$ = 'UPDATE OR IGNORE'}
	;
column_expr_list
	: column_expr_list COMMA column_expr
		{ $$ = $1; $$.push($3); }
	| column_expr
		{ $$ = [$1]; }
	;


column_expr
	: name EQ expr
		{ $$ = {column:$1, expr: $3}; }
	;

	
vacuum_stmt
	: VACUUM
		{ $$ = {statement: 'VACUUM'}; }
	;



expr
	: literal_value
		{ $$ = $1; }
	| NULL
		{ $$ = {type:'NULL'}; }
	| bind_parameter
		{ $$ = {bind_parameter: $1}; }
	| name
		{ $$ = {column: $1}; }
	| name DOT name
		{ $$ = {table: $1, column: $3}; }
	| name DOT name DOT name
		{ $$ = {database: $1, table: $3, column: $5}; }

	| PLUS expr
		{ $$ = {op: 'UNIPLUS', expr: $2}; }
	| MINUS expr
		{ $$ = {op: 'UNIMINUS', expr: $2}; }

	| expr PLUS expr
		{ $$ = {op: 'PLUS', left: $1, right: $3}; }
	| expr MINUS expr
		{ $$ = {op: 'MINUS', left: $1, right: $3}; }
	| expr STAR expr
		{ $$ = {op: 'MULTIPLY', left: $1, right: $3}; }
	| expr SLASH expr
		{ $$ = {op: 'DIVIDE', left: $1, right: $3}; }
	| expr REM expr
		{ $$ = {op: 'REM', left: $1, right: $3}; }

	| expr LSHIFT expr
		{ $$ = {op: 'LSHIFT', left: $1, right: $3}; }
	| expr RSHIFT expr
		{ $$ = {op: 'RSHIFT', left: $1, right: $3}; }

	| expr EQ expr
		{ $$ = {op: 'EQ', left: $1, right: $3}; }
	| expr NE expr
		{ $$ = {op: 'NE', left: $1, right: $3}; }
	| expr GT expr
		{ $$ = {op: 'GT', left: $1, right: $3}; }
	| expr GE expr
		{ $$ = {op: 'GE', left: $1, right: $3}; }
	| expr LT expr
		{ $$ = {op: 'LT', left: $1, right: $3}; }
	| expr LE expr
		{ $$ = {op: 'LE', left: $1, right: $3}; }




	| expr AND expr
		{ $$ = {op: 'AND', left: $1, right: $3}; }
	| expr OR expr
		{ $$ = {op: 'OR', left: $1, right: $3}; }


	| name LPAR arguments RPAR
		{ $$ = {function:$1, arguments: $3}; } 
	| LPAR expr RPAR
		{ $$ = {op: 'PAR', expr:$2}; }
	| CAST LPAR expr AS type_name RPAR
		{ $$ = {op: 'CAST', expr:$2}; yy.extend($$,$5); }

	| expr COLLATE name
		{ $$ = {op: 'COLLATE', left: $1, right:$3};}
	| expr ISNULL
		{ $$ = {op: 'ISNULL', expr:$1}; }
	| expr IS NULL
		{ $$ = {op: 'ISNULL', expr:$1}; }
	| expr NOTNULL
		{ $$ = {op: 'NOTNULL', expr:$1}; }
	| expr NOT NULL
		{ $$ = {op: 'NOTNULL', expr:$1}; }
	| expr IS NOT NULL
		{ $$ = {op: 'NOTNULL', expr:$1}; }

	| expr ESCAPE expr
		{ $$ = {op:'ESCAPE', left: $1, right: $3}; }
	| expr LIKE expr
		{ 
			$$ = {op: 'LIKE', left:$1, right:$3}; 
			if(typeof $3 != 'undefined') {
				if($3.op != 'ESCAPE') {
					throw new Error('Should be ESCAPE');
				} else {
					$$.right = $3.left; 
					$$.escape = $3.right; 
				}
			} 
		}
	| expr NOT LIKE expr
		{ 
			$$ = {op: 'LIKE', not:true, left:$1, right:$4}; 
			if(typeof $4 != 'undefined') {
				if($4.op != 'ESCAPE') {
					throw new Error('Should be ESCAPE');
				} else {
					$$.right = $4.left; 
					$$.escape = $4.right; 
				}
			} 
		}
	| expr MATCH expr
		{ 
			$$ = {op: 'MATCH', left:$1, right:$3}; 
			if(typeof $3 != 'undefined') {
				if($3.op != 'ESCAPE') {
					throw new Error('Should be ESCAPE');
				} else {
					$$.right = $3.left; 
					$$.escape = $3.right; 
				}
			} 
		}
	| expr NOT MATCH expr
		{ 
			$$ = {op: 'MATCH', not:true, left:$1, right:$4}; 
			if(typeof $4 != 'undefined') {
				if($4.op != 'ESCAPE') {
					throw new Error('Should be ESCAPE');
				} else {
					$$.right = $4.left; 
					$$.escape = $4.right; 
				}
			} 
		}

/*	| expr like_match expr escape_expr
*/
/*	| expr NOT NULL
		{ $$ = {op: 'NOTNULL', expr:$1}; }
	| expr IS not expr
*/
/*	| expr not BETWEEN expr
		{ 
			if($4.op != 'AND') throw new Error('Wrong syntax of BETWEEN AND');
			$$ = {op: 'BETWEEN', expr: $1, left:$4.left, right:$6.right}; 
			yy.extend($$,$2); 
		}
*/	
	| expr BETWEEN expr 
		{ 
			if($3.op != 'AND') throw new Error('Wrong syntax of BETWEEN AND');
			$$ = {op: 'BETWEEN', expr: $1, left:$3.left, right:$3.right}; 
		}
	| expr NOT BETWEEN expr 
		{ 
			if($4.op != 'AND') throw new Error('Wrong syntax of NOT BETWEEN AND');
			$$ = {op: 'BETWEEN', not:true, expr: $1, left:$4.left, right:$4.right}; 
		}
	| expt not IN database_table_name
		{ $$ = {op: 'IN', expr: $1}; yy.extend($$,$2); yy.extend($$,$4);}
	| expt not IN LPAR RPAR 
		{ $$ = {op: 'IN', expr: $1}; yy.extend($$,$2); yy.extend($$,$4);}
	| expt not IN LPAR select_stmt RPAR 
		{ $$ = {op: 'IN', expr: $1, select: $5}; yy.extend($$,$2); }
	| expt not IN LPAR exprs RPAR 
		{ $$ = {op: 'IN', expr: $1, exprs: $5}; yy.extend($$,$2); }
	| not EXISTS LPAR select_stmt RPAR
		{ $$ = {op:'EXISTS', select: $4}; yy.extend($$,$1);}
	| LPAR select_stmt RPAR
		{ $$ = {op:'SELECT', select:$2}; } 
	| CASE expr when_then_list else END
		{ $$ = {op: 'CASE', expr: $2, whens: $3}; yy.extend($$,$4); }
	| CASE when_then_list else END
		{ $$ = {op: 'WHEN', whens: $3}; yy.extend($$,$4);}
	;

literal_value
	: signed_number
		{ $$ = {type:'number', number:$1}; }
	| string_literal
		{ $$ = {type:'string', string: $1}}
	;

not
	:
		{ $$ = undefined; }
	| NOT
		{ $$ = {not: true}; }
	;
/*
unary_operator
	: PLUS
		{ $$ = 'UNIPLUS'; }
	| MINUS
		{ $$ = 'UNIMINUS'; }
	| TILDE
		{ $$ = 'UNITILDE'; }
	;

binary_operator
	: PLUS
		{ $$ = 'PLUS'; }
	| MINUS
		{ $$ = 'MINUS'; }
	| STAR
		{ $$ = 'MULTIPLY'; }
	| SLASH
		{ $$ = 'DIVIDE'; }
	;
*/

arguments
	: arguments COMMA expr
		{ $$ = $1; $$.push($3); }
	| expr
		{ $$ = [$1]; }
	;

when_then_list 
	: when_then_list when_then
		{ $$ = $1; $$.push($2); }
	| when_then
		{ $$ = [$1]; }
	;

when_then
	: WHEN expr THEN expr
		{ $$ = {when: $1, then: $4}; }
	;	

else
	:
		{ $$ = undefined; }
	| ELSE expr
		{ $$ = {else:$2}; }
	;