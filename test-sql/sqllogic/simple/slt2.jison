/*
	SQLLOGICTEST parser
	ver 0.2

	jison slt.jison; node slt.js demo.test > demo.js;mocha demo.js
	jison slt.jison; node evidence/in1.test demo.test > demo.js;mocha demo.js

*/
%lex
%options case-insensitive
%%


"#"(.*?)($|\r\n|\r|\n)		/* skip whitespace */

.*				return "SQL"

\s+                 /* skip whitespace */

"hash-threshold"	return "HASHTHRESHOLD"
"statement ok"		return "STATEMENTOK"
"skipif"			return "SKIPIF"
"onlyif"			return "ONLYIF"
"query"				return "QUERY"
"values hashing to"	return "VALUES"
"halt"				return "HALT"
"NULL"				return "NULL"
"label-"			return "LABEL"

[a-zA-Z_][a-zA-Z_\-0-9]* return 'LITERAL'
[0-9]+				return 'NUMBER'
/*"----"				return "DASH4"*/
"<="				return "LE"
">="				return "GE"
"<>"				return "NE"
<<EOF>>             return 'EOF'
.					return 'ANY'

/lex
%ebnf
%start main
%%

main 
	:SkipIfTest+ EOF
		{
			var s = '';
			s += "if(typeof exports === 'object') { \n \
					var assert = require('assert'); \n \
					var alasql = require('../../../dist/alasql.js'); 	\n \
				};\n \
				//alasql.options.modifier = 'COLUMN'; \n";
			s += "describe('SQLLOGICTEST', function(){\n";
			s += $1.join('\n')+'\n';
			s += "});\n"
			console.log(s);
			return s;
		}
	;

SkipIfTest
	: SKIPIF LITERAL Test
		{ $$ = $3; /*$$.skipif = $2*/}
	| ONLYIF LITERAL Test
		{ $$ = $3; /*$$.onlyif = $2*/}
	| Test
		{ $$ = $1}
	;

Test
	: HASHTHRESHOLD NUMBER
		{ $$ = ''; }
	| HALT
		{ $$ = ''; } 
	| STATEMENTOK SqlRes
		{ 
			if(typeof tnum == 'undefined') tnum = 0;
			tnum++;
			var s = "it('"+tnum+". statement ok',function(done){\n";
			s += 'console.log("'+$2.sql+'");\n';
			s += 'var res = alasql("'+$2.sql+'")\n';
			s += "assert(res==1);\n";
//			s += "console.log(res);\n";
			s += "done();\n";
			s += "});\n";
			$$ = s;
		}
	| QUERY LITERAL LITERAL SqlRes
		{ 
			if(typeof tnum == 'undefined') tnum = 0;
			tnum++;
			var s = "it('"+tnum+". query',function(done){\n";
			s += 'console.log("'+$4.sql+'");\n';
			s += 'var res = alasql("'+$4.sql+'")\n';
			s += "console.log(alasql.utils.flatArray(res));\n";
			if($4.result && $4.result.vals) {
				s += "assert.deepEqual(alasql.utils.flatArray(res), "+JSON.stringify($4.result.vals)+");\n"
			}
			if($4.result && $4.result.num) {
				s += "assert.deepEqual(res.length, "+$4.result.num+");\n"
			}

			s += "done();\n";
			s += "});\n";
			$$ = s;
		}
	| QUERY LITERAL LITERAL LABEL NUMBER SqlRes
		{ 
			if(typeof tnum == 'undefined') tnum = 0;
			tnum++;
			var s = "it('"+tnum+". query',function(done){\n";
			s += 'console.log("'+$6.sql+'");\n';
			s += 'var res = alasql("'+$6.sql+'")\n';
			s += "console.log(alasql.utils.flatArray(res));\n";
			if($4.result && $6.result.vals) {
				s += "assert.deepEqual(alasql.utils.flatArray(res), "+JSON.stringify($6.result.vals)+");\n"
			}
			if($6.result && $6.result.num) {
				s += "assert.deepEqual(res.length, "+$6.result.num+");\n"
			}

			s += "done();\n";
			s += "});\n";
			$$ = s;
		}
	;

SqlRes 
	: SQL Result?
		{ $$ = {sql:$1.join(' '), result: $2}; }
	;
SQL
	: SQL Atom
		{ $$ = $1; $$.push($2); }
	| Atom
		{ $$ = [$1]}
	;
Atom
	: (ANY|NUMBER|LITERAL|LE|GE|NE|NULL|LABEL)
		{$$ = $1}
	;

Result
	: DASH4 NUMBER VALUES NUMBER? LITERAL
		{ $$ = {num:$2,hash:$4+""+$6}; }
	| DASH4 Numbers
		{ $$ = {num:$2.length, vals:$2}; }
	| DASH4 NULL
		{ $$ = {num:1, NULL:true}; }
/*	| DASH4 SQL
		{ $$ = $2; }
*/
	;

Numbers
	: Numbers NUMBER
		{ $$ = $1; $$.push(+$2);}
	| NUMBER
		{ $$ = [+$1]; }
	;