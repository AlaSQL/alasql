/*! AlaSQL v0.1.9 (c) 2014-2015 Andrey Gershun | alasql.org/license */
/*
@module alasql
@version 0.1.8

AlaSQL - JavaScript SQL database
(ñ) 2014-2015, Andrey Gershun

@license
The MIT License (MIT)

Copyright (c) 2014-2015 Andrey Gershun (agershun@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
	@fileoverview AlaSQL JavaScript SQL library
	@see http://github.com/agershun/alasql
*/

/**
	Callback from statement
	@callback statement-callback
	@param {object} data Result data
*/

/**
	UMD envelope for AlaSQL
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
    	/** alasql main function */
        module.exports = factory();
    } else {
        root.alasql = factory();
    }
}(this, function () {

/**
	 alasql - Main Alasql class
 	@function
 	@param {string|function|object} sql - SQL-statement or data object for fuent interface
 	@param {object} params - SQL parameters
 	@param {function} cb - callback function
 	@param {object} scope - Scope for nested queries
 	@return {any} - Result data object

	@example
 Standard sync call:
    alasql('CREATE TABLE one');
 Query:
 	var res = alasql('SELECT * FROM one');
 Call with parameters:
 	var res = alasql('SELECT * FROM ?',[data]);
 Standard async call with callback function:
 	alasql('SELECT * FROM ?',[data],function(res){
		console.log(data);
 	});
 Call with scope for subquery (to pass common values):
    var scope = {one:{a:2,b;20}}
    alasql('SELECT * FROM ? two WHERE two.a = one.a',[data],null,scope);
 Call for fluent interface with data object:
    alasql(data).Where(function(x){return x.a == 10}).exec();
 Call for fluent interface without data object:
    alasql().From(data).Where(function(x){return x.a == 10}).exec();
 */

var alasql = function alasql(sql, params, cb, scope) {
	if(typeof importScripts != 'function' && alasql.webworker) {
		var id = alasql.lastid++;
		alasql.buffer[id] = cb;
		alasql.webworker.postMessage({id:id,sql:sql,params:params});
	} else {
		if(arguments.length == 0) {
			// Without arguments - Fluent interface
			return new yy.Select({
				columns:[new yy.Column({columnid:'*'})],
				from: [new yy.ParamValue({param:0})]
			});
		} else if (arguments.length == 1 && typeof sql == "object" && sql instanceof Array) {
			// One argument data object - fluent interface
				var select = new yy.Select({
					columns:[new yy.Column({columnid:'*'})],
					from: [new yy.ParamValue({param:0})]
				});
				select.preparams = [sql];	
				return select;
		} else {
			// Standard interface
			// alasql('#sql');
			if(typeof sql == 'string' && sql[0]=='#' && typeof document == "object") {
				sql = document.querySelector(sql).textContent;
			} else if(typeof sql == 'object' && sql instanceof HTMElement) {
				sql = sql.textContent;
			} else if(typeof sql == 'function') {
				// to run multiline functions
				sql = sql.toString().slice(14,-3);
			}
			// Run SQL			
			return alasql.exec(sql, params, cb, scope);
		}
	};
};

/** 
	Current version of alasql 
 	@constant {string} 
*/
alasql.version = "0.1.9";

/**
	Debug flag
	@type {boolean}
*/
alasql.debug = undefined; // Initial debug variable



getAlaSQLPath();
/** 
	Get path of alasql.js
	@function 
	@todo Rewrite and simplify the code. Review, is this function is required separately
*/
function getAlaSQLPath() {
	/** type {string} Path to alasql library and plugins */
	alasql.path = '';

	if (typeof importScripts === 'function') {
		alasql.path = '';		
		/** @todo Check how to get path in worker */
	} else if(typeof exports != 'undefined') { 
		alasql.path = __dirname;
	} else if(typeof Meteor == 'object' && Meteor.isClient) {
			alasql.path = '/packages/dist/';
	} else if(typeof Meteor == 'object' && Meteor.isServer) {
			alasql.path = 'assets/packages/dist/';
	} else if(typeof document != 'undefined') {
		var sc = document.getElementsByTagName('script');
		for(var i=0;i<sc.length;i++) {
			if (sc[i].src.substr(-16).toLowerCase() == 'alasql-worker.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-16); 
				break;
			} else if (sc[i].src.substr(-20).toLowerCase() == 'alasql-worker.min.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-20);
				break;
			} else if (sc[i].src.substr(-9).toLowerCase() == 'alasql.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-9); 
				break;
			} else if (sc[i].src.substr(-13).toLowerCase() == 'alasql.min.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-13); 
				break;
			};
		};	
	};
};

/** 
	Parser function
	@type {object}
*/


/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,10],$V1=[1,95],$V2=[1,96],$V3=[1,6],$V4=[1,38],$V5=[1,71],$V6=[1,68],$V7=[1,87],$V8=[1,86],$V9=[1,63],$Va=[1,94],$Vb=[1,78],$Vc=[1,76],$Vd=[1,60],$Ve=[1,64],$Vf=[1,58],$Vg=[1,62],$Vh=[1,56],$Vi=[1,66],$Vj=[1,57],$Vk=[1,61],$Vl=[1,75],$Vm=[1,69],$Vn=[1,77],$Vo=[1,79],$Vp=[1,80],$Vq=[1,73],$Vr=[1,74],$Vs=[1,72],$Vt=[1,81],$Vu=[1,82],$Vv=[1,83],$Vw=[1,84],$Vx=[1,85],$Vy=[1,91],$Vz=[1,59],$VA=[1,70],$VB=[1,65],$VC=[1,89],$VD=[1,90],$VE=[1,99],$VF=[1,100],$VG=[8,264,450,451],$VH=[8,264,268,450,451],$VI=[105,304,357],$VJ=[1,112],$VK=[1,111],$VL=[1,116],$VM=[1,143],$VN=[1,153],$VO=[1,156],$VP=[1,151],$VQ=[1,159],$VR=[1,163],$VS=[1,160],$VT=[1,148],$VU=[1,150],$VV=[1,152],$VW=[1,161],$VX=[1,145],$VY=[1,170],$VZ=[1,166],$V_=[1,167],$V$=[1,171],$V01=[1,172],$V11=[1,173],$V21=[1,174],$V31=[1,175],$V41=[1,176],$V51=[1,177],$V61=[1,178],$V71=[1,179],$V81=[1,154],$V91=[1,155],$Va1=[1,157],$Vb1=[1,158],$Vc1=[1,164],$Vd1=[1,162],$Ve1=[1,165],$Vf1=[1,149],$Vg1=[1,169],$Vh1=[1,180],$Vi1=[4,5],$Vj1=[1,186],$Vk1=[1,194],$Vl1=[8,65,71,93,104,136,142,143,157,172,205,218,264,268,450,451],$Vm1=[4,5,8,65,69,70,71,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,157,159,161,172,244,245,246,247,248,249,250,251,252,264,268,368,372,450,451],$Vn1=[4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$Vo1=[1,223],$Vp1=[1,230],$Vq1=[1,240],$Vr1=[1,245],$Vs1=[1,244],$Vt1=[4,5,8,65,70,71,85,93,104,106,107,112,116,119,126,128,136,142,143,153,154,155,157,172,205,218,232,233,234,235,237,244,245,246,247,248,249,250,251,252,254,255,256,257,258,260,261,264,268,270,368,372,450,451],$Vu1=[2,140],$Vv1=[1,256],$Vw1=[8,67,71,264,268,447,450,451],$Vx1=[4,5,8,65,70,71,85,93,104,106,107,112,116,119,126,128,136,138,142,143,153,154,155,157,159,161,169,172,205,218,232,233,234,235,237,244,245,246,247,248,249,250,251,252,254,255,256,257,258,260,261,264,268,270,368,372,450,451],$Vy1=[4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,167,172,180,182,194,195,196,197,198,199,200,201,202,203,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,257,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,321,324,325,336,338,344,347,348,349,350,351,352,353,355,356,364,365,366,368,372,374,376,382,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$Vz1=[4,5,8,47,65,81,99,120,130,163,233,264,287,290,291,298,344,347,348,351,353,355,356,364,365,366,383,385,386,388,389,390,391,392,396,397,400,401,447,449,450,451],$VA1=[2,444],$VB1=[1,270],$VC1=[2,784],$VD1=[8,71,81,107,112,120,163,256,264,268,419,450,451],$VE1=[8,67,264,268,450,451],$VF1=[2,504],$VG1=[1,296],$VH1=[4,5,130],$VI1=[1,302],$VJ1=[1,310],$VK1=[1,309],$VL1=[1,316],$VM1=[1,307],$VN1=[1,311],$VO1=[1,308],$VP1=[1,312],$VQ1=[1,314],$VR1=[1,326],$VS1=[1,323],$VT1=[1,324],$VU1=[1,304],$VV1=[1,306],$VW1=[1,303],$VX1=[1,305],$VY1=[1,313],$VZ1=[1,315],$V_1=[1,317],$V$1=[1,318],$V02=[1,319],$V12=[1,320],$V22=[1,321],$V32=[1,325],$V42=[1,327],$V52=[1,328],$V62=[1,329],$V72=[1,330],$V82=[2,262],$V92=[1,339],$Va2=[4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,202,203,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,257,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,324,325,344,347,348,351,353,355,356,364,365,366,368,372,374,376,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$Vb2=[2,323],$Vc2=[1,350],$Vd2=[1,360],$Ve2=[4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,202,203,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,374,376,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$Vf2=[1,376],$Vg2=[1,384],$Vh2=[1,383],$Vi2=[4,5,8,65,67,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,202,203,205,218,264,268,450,451],$Vj2=[8,65,67,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,202,203,205,218,264,268,450,451],$Vk2=[2,178],$Vl2=[1,403],$Vm2=[8,65,71,93,104,136,142,143,157,205,218,264,268,450,451],$Vn2=[2,141],$Vo2=[1,406],$Vp2=[4,5,90],$Vq2=[1,418],$Vr2=[1,435],$Vs2=[1,417],$Vt2=[1,416],$Vu2=[1,412],$Vv2=[1,413],$Vw2=[1,414],$Vx2=[1,415],$Vy2=[1,419],$Vz2=[1,420],$VA2=[1,421],$VB2=[1,422],$VC2=[1,423],$VD2=[1,424],$VE2=[1,425],$VF2=[1,426],$VG2=[1,427],$VH2=[1,428],$VI2=[1,429],$VJ2=[1,430],$VK2=[1,431],$VL2=[1,432],$VM2=[1,434],$VN2=[1,436],$VO2=[1,437],$VP2=[1,438],$VQ2=[1,439],$VR2=[1,440],$VS2=[1,441],$VT2=[1,442],$VU2=[1,445],$VV2=[1,446],$VW2=[1,447],$VX2=[1,448],$VY2=[1,449],$VZ2=[1,450],$V_2=[1,451],$V$2=[1,452],$V03=[1,453],$V13=[1,454],$V23=[1,455],$V33=[1,456],$V43=[67,81,163],$V53=[8,67,71,128,161,257,264,268,294,307,319,320,324,325,450,451],$V63=[1,473],$V73=[8,67,71,264,268,450,451],$V83=[1,474],$V93=[1,482],$Va3=[4,5,70,106,107,112,116,119,126,128,153,154,155,232,233,234,235,237,244,245,246,247,248,249,250,251,252,254,255,256,257,258,260,261,270,368,372],$Vb3=[8,65,71,85,93,104,136,142,143,157,172,205,218,264,268,450,451],$Vc3=[4,5,107,256],$Vd3=[1,504],$Ve3=[8,67,69,71,264,268,450,451],$Vf3=[8,67,69,71,107,112,114,119,126,264,268,368,372,450,451],$Vg3=[2,785],$Vh3=[8,67,69,71,107,114,119,126,264,268,368,372,450,451],$Vi3=[8,71,81,107,120,163,256,264,268,419,450,451],$Vj3=[1,523],$Vk3=[1,524],$Vl3=[138,140,286],$Vm3=[2,395],$Vn3=[1,570],$Vo3=[1,589],$Vp3=[4,5,8,47,65,67,69,70,71,81,85,90,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$Vq3=[2,338],$Vr3=[1,596],$Vs3=[264,266,268],$Vt3=[67,376],$Vu3=[67,374,376],$Vv3=[1,603],$Vw3=[4,5,8,47,65,67,69,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$Vx3=[67,374],$Vy3=[8,65,71,93,104,136,142,143,205,218,264,268,450,451],$Vz3=[1,637],$VA3=[8,65,71,264,268,450,451],$VB3=[1,643],$VC3=[1,644],$VD3=[1,645],$VE3=[4,5,8,65,67,69,70,71,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,172,244,245,246,247,248,249,250,251,252,264,268,368,372,450,451],$VF3=[1,695],$VG3=[1,694],$VH3=[1,708],$VI3=[8,65,67,71,85,93,104,136,142,143,157,172,205,218,264,268,450,451],$VJ3=[1,732],$VK3=[8,67,69,71,114,119,126,264,268,368,372,450,451],$VL3=[8,67,71,114,264,268,450,451],$VM3=[8,71,81,120,163,264,268,419,450,451],$VN3=[4,5,8,47,65,67,69,70,71,81,85,90,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$VO3=[4,5,8,47,65,67,69,70,71,81,85,90,93,99,104,105,106,107,108,109,110,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$VP3=[4,5,8,47,65,67,69,70,71,81,85,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,271,272,273,274,275,276,277,282,283,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$VQ3=[2,359],$VR3=[4,5,8,47,65,67,69,70,71,81,85,93,104,105,106,107,109,110,112,116,117,119,120,122,123,124,126,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,282,283,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$VS3=[2,260],$VT3=[4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,374,376,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$VU3=[1,788],$VV3=[8,71,264,268,450,451],$VW3=[1,797],$VX3=[8,65,71,93,136,142,143,205,218,264,268,450,451],$VY3=[8,65,67,71,93,104,136,142,143,157,172,205,218,264,268,450,451],$VZ3=[4,5,65,69,70,71,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,159,161,244,245,246,247,248,249,250,251,252,368,372],$V_3=[4,5,65,67,69,70,71,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,159,161,244,245,246,247,248,249,250,251,252,368,372],$V$3=[2,724],$V04=[4,5,65,67,69,70,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,159,161,244,245,246,247,248,249,250,251,252,368,372],$V14=[1,846],$V24=[8,67,71,104,264,266,268,413,450,451],$V34=[1,855],$V44=[1,854],$V54=[2,521],$V64=[1,871],$V74=[69,114],$V84=[8,67,69,71,114,119,264,268,368,372,450,451],$V94=[2,660],$Va4=[1,887],$Vb4=[1,888],$Vc4=[1,893],$Vd4=[1,894],$Ve4=[2,301],$Vf4=[1,909],$Vg4=[1,920],$Vh4=[8,67,71,264,266,268,413,450,451],$Vi4=[1,923],$Vj4=[8,65,67,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,205,218,264,268,450,451],$Vk4=[8,264,266,268,413,450,451],$Vl4=[8,65,71,93,136,142,143,218,264,268,450,451],$Vm4=[1,935],$Vn4=[1,939],$Vo4=[1,940],$Vp4=[1,942],$Vq4=[1,943],$Vr4=[1,944],$Vs4=[1,945],$Vt4=[1,946],$Vu4=[1,947],$Vv4=[1,948],$Vw4=[1,949],$Vx4=[1,973],$Vy4=[67,71],$Vz4=[97,99],$VA4=[1,1026],$VB4=[8,65,71,136,142,143,218,264,268,450,451],$VC4=[8,65,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,205,218,264,268,450,451],$VD4=[1,1064],$VE4=[1,1066],$VF4=[4,5,70,116,119,126,155,260,368,372],$VG4=[1,1080],$VH4=[8,65,67,71,136,142,143,218,264,268,450,451],$VI4=[1,1099],$VJ4=[1,1101],$VK4=[1,1098],$VL4=[1,1097],$VM4=[1,1096],$VN4=[1,1102],$VO4=[1,1093],$VP4=[1,1094],$VQ4=[1,1095],$VR4=[1,1114],$VS4=[4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,257,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,324,325,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$VT4=[1,1123],$VU4=[1,1131],$VV4=[1,1130],$VW4=[8,65,71,136,142,143,264,268,450,451],$VX4=[1,1141],$VY4=[1,1142],$VZ4=[1,1143],$V_4=[8,65,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,202,203,205,218,264,268,450,451],$V$4=[4,5,8,65,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,202,203,205,218,264,268,450,451],$V05=[1,1188],$V15=[1,1187],$V25=[1,1189],$V35=[161,167,319,320,321,324],$V45=[2,456],$V55=[1,1194],$V65=[1,1213],$V75=[1,1224],$V85=[8,65,67,71,93,136,142,143,212,218,264,268,450,451],$V95=[1,1244],$Va5=[4,8,264,268,294,307,450,451],$Vb5=[1,1363],$Vc5=[1,1373],$Vd5=[8,67,71,202,264,268,450,451];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Literal":3,"LITERAL":4,"BRALITERAL":5,"main":6,"Statements":7,"EOF":8,"Statements_group0":9,"AStatement":10,"ExplainStatement":11,"EXPLAIN":12,"QUERY":13,"PLAN":14,"Statement":15,"AlterTable":16,"AttachDatabase":17,"CreateDatabase":18,"CreateIndex":19,"CreateGraph":20,"CreateTable":21,"CreateView":22,"CreateEdge":23,"CreateVertex":24,"Declare":25,"Delete":26,"DetachDatabase":27,"DropDatabase":28,"DropIndex":29,"DropTable":30,"DropView":31,"If":32,"Insert":33,"Merge":34,"RenameTable":35,"Select":36,"ShowCreateTable":37,"ShowColumns":38,"ShowDatabases":39,"ShowIndex":40,"ShowTables":41,"TruncateTable":42,"WithSelect":43,"BeginTransaction":44,"CommitTransaction":45,"RollbackTransaction":46,"EndTransaction":47,"UseDatabase":48,"Update":49,"Help":50,"JavaScript":51,"Source":52,"Assert":53,"While":54,"Continue":55,"Break":56,"BeginEnd":57,"Print":58,"Require":59,"SetVariable":60,"ExpressionStatement":61,"AddRule":62,"Query":63,"Echo":64,"WITH":65,"WithTablesList":66,"COMMA":67,"WithTable":68,"AS":69,"LPAR":70,"RPAR":71,"SelectClause":72,"Select_option0":73,"IntoClause":74,"FromClause":75,"WhereClause":76,"GroupClause":77,"OrderClause":78,"LimitClause":79,"UnionClause":80,"SEARCH":81,"Select_repetition0":82,"Select_option1":83,"RemoveClause":84,"REMOVE":85,"RemoveClause_option0":86,"RemoveColumnsList":87,"RemoveColumn":88,"Column":89,"LIKE":90,"StringValue":91,"SearchSelector":92,"ORDER":93,"BY":94,"OrderExpressionsList":95,"SearchSelector_option0":96,"ARROW":97,"CARET":98,"EQ":99,"Expression":100,"SearchSelector_repetition_plus0":101,"SearchSelector_repetition_plus1":102,"SearchSelector_option1":103,"WHERE":104,"CLASS":105,"NUMBER":106,"STRING":107,"SLASH":108,"VERTEX":109,"EDGE":110,"EXCLAMATION":111,"SHARP":112,"MODULO":113,"GT":114,"LT":115,"DOLLAR":116,"DOT":117,"Json":118,"AT":119,"SET":120,"SetColumnsList":121,"TO":122,"VALUE":123,"ROW":124,"ExprList":125,"COLON":126,"PlusStar":127,"NOT":128,"SearchSelector_repetition2":129,"IF":130,"SearchSelector_repetition3":131,"Aggregator":132,"SearchSelector_repetition4":133,"SearchSelector_group0":134,"SearchSelector_repetition5":135,"UNION":136,"SearchSelectorList":137,"ALL":138,"SearchSelector_repetition6":139,"ANY":140,"SearchSelector_repetition7":141,"INTERSECT":142,"EXCEPT":143,"AND":144,"OR":145,"PATH":146,"RETURN":147,"ResultColumns":148,"REPEAT":149,"SearchSelector_repetition8":150,"SearchSelectorList_repetition0":151,"SearchSelectorList_repetition1":152,"PLUS":153,"STAR":154,"QUESTION":155,"SearchFrom":156,"FROM":157,"SelectModifier":158,"DISTINCT":159,"TopClause":160,"UNIQUE":161,"SelectClause_option0":162,"SELECT":163,"COLUMN":164,"MATRIX":165,"TEXTSTRING":166,"INDEX":167,"RECORDSET":168,"TOP":169,"NumValue":170,"TopClause_option0":171,"INTO":172,"Table":173,"FuncValue":174,"ParamValue":175,"VarValue":176,"FromTablesList":177,"JoinTablesList":178,"ApplyClause":179,"CROSS":180,"APPLY":181,"OUTER":182,"FromTable":183,"FromTable_option0":184,"FromTable_option1":185,"FromString":186,"JoinTable":187,"JoinMode":188,"JoinTableAs":189,"OnClause":190,"JoinTableAs_option0":191,"JoinTableAs_option1":192,"JoinModeMode":193,"NATURAL":194,"JOIN":195,"INNER":196,"LEFT":197,"RIGHT":198,"FULL":199,"SEMI":200,"ANTI":201,"ON":202,"USING":203,"ColumnsList":204,"GROUP":205,"GroupExpressionsList":206,"HavingClause":207,"GroupExpression":208,"GROUPING":209,"ROLLUP":210,"CUBE":211,"HAVING":212,"CORRESPONDING":213,"OrderExpression":214,"DIRECTION":215,"COLLATE":216,"NOCASE":217,"LIMIT":218,"OffsetClause":219,"OFFSET":220,"ResultColumn":221,"Star":222,"AggrValue":223,"Op":224,"LogicValue":225,"NullValue":226,"ExistsValue":227,"CaseValue":228,"CastClause":229,"NewClause":230,"Expression_group0":231,"CURRENT_TIMESTAMP":232,"JAVASCRIPT":233,"NEW":234,"CAST":235,"ColumnType":236,"CONVERT":237,"PrimitiveValue":238,"OverClause":239,"OVER":240,"OverPartitionClause":241,"OverOrderByClause":242,"PARTITION":243,"SUM":244,"COUNT":245,"MIN":246,"MAX":247,"AVG":248,"FIRST":249,"LAST":250,"AGGR":251,"ARRAY":252,"FuncValue_option0":253,"TRUE":254,"FALSE":255,"NSTRING":256,"NULL":257,"EXISTS":258,"ParamValue_group0":259,"BRAQUESTION":260,"CASE":261,"WhensList":262,"ElseClause":263,"END":264,"When":265,"WHEN":266,"THEN":267,"ELSE":268,"NOT_LIKE":269,"MINUS":270,"GE":271,"LE":272,"EQEQ":273,"EQEQEQ":274,"NE":275,"NEEQEQ":276,"NEEQEQEQ":277,"CondOp":278,"AllSome":279,"IN":280,"ColFunc":281,"BETWEEN":282,"NOT_BETWEEN":283,"IS":284,"DOUBLECOLON":285,"SOME":286,"UPDATE":287,"SetColumn":288,"SetColumn_group0":289,"DELETE":290,"INSERT":291,"Into":292,"ValuesListsList":293,"DEFAULT":294,"ValuesList":295,"Value":296,"DateValue":297,"CREATE":298,"TemporaryClause":299,"TableClass":300,"IfNotExists":301,"CreateTableDefClause":302,"CreateTableOptionsClause":303,"TABLE":304,"CreateTableOptions":305,"CreateTableOption":306,"IDENTITY":307,"TEMP":308,"ColumnDefsList":309,"ConstraintsList":310,"Constraint":311,"ConstraintName":312,"PrimaryKey":313,"ForeignKey":314,"UniqueKey":315,"IndexKey":316,"Check":317,"CONSTRAINT":318,"CHECK":319,"PRIMARY":320,"KEY":321,"PrimaryKey_option0":322,"ColsList":323,"FOREIGN":324,"REFERENCES":325,"ForeignKey_option0":326,"OnForeignKeyClause":327,"ParColsList":328,"OnDeleteClause":329,"OnUpdateClause":330,"NO":331,"ACTION":332,"UniqueKey_option0":333,"ColumnDef":334,"ColumnConstraintsClause":335,"ColumnConstraints":336,"NumberMax":337,"ENUM":338,"ColumnConstraintsList":339,"ColumnConstraint":340,"ParLiteral":341,"ColumnConstraint_option0":342,"ColumnConstraint_option1":343,"DROP":344,"DropTable_group0":345,"IfExists":346,"ALTER":347,"RENAME":348,"ADD":349,"MODIFY":350,"ATTACH":351,"DATABASE":352,"DETACH":353,"AsClause":354,"USE":355,"SHOW":356,"VIEW":357,"CreateView_option0":358,"CreateView_option1":359,"SubqueryRestriction":360,"READ":361,"ONLY":362,"OPTION":363,"HELP":364,"SOURCE":365,"ASSERT":366,"JsonObject":367,"ATLBRA":368,"JsonArray":369,"JsonValue":370,"JsonPrimitiveValue":371,"LCUR":372,"JsonPropertiesList":373,"RCUR":374,"JsonElementsList":375,"RBRA":376,"JsonProperty":377,"OnOff":378,"AtDollar":379,"SetPropsList":380,"SetProp":381,"OFF":382,"COMMIT":383,"TRANSACTION":384,"ROLLBACK":385,"BEGIN":386,"ElseStatement":387,"WHILE":388,"CONTINUE":389,"BREAK":390,"PRINT":391,"REQUIRE":392,"StringValuesList":393,"PluginsList":394,"Plugin":395,"ECHO":396,"DECLARE":397,"DeclaresList":398,"DeclareItem":399,"TRUNCATE":400,"MERGE":401,"MergeInto":402,"MergeUsing":403,"MergeOn":404,"MergeMatchedList":405,"OutputClause":406,"MergeMatched":407,"MergeNotMatched":408,"MATCHED":409,"MergeMatchedAction":410,"MergeNotMatchedAction":411,"TARGET":412,"OUTPUT":413,"CreateVertex_option0":414,"CreateVertex_option1":415,"CreateVertex_option2":416,"CreateVertexSet":417,"SharpValue":418,"CONTENT":419,"CreateEdge_option0":420,"GRAPH":421,"GraphList":422,"GraphVertexEdge":423,"GraphElement":424,"GraphVertexEdge_option0":425,"GraphVertexEdge_option1":426,"GraphVertexEdge_group0":427,"GraphVertexEdge_option2":428,"GraphVertexEdge_option3":429,"GraphVertexEdge_group1":430,"GraphVar":431,"GraphAsClause":432,"GraphAtClause":433,"GraphElement_option0":434,"GraphElement_option1":435,"GraphElement_option2":436,"GraphElement_option3":437,"ColonLiteral":438,"SharpLiteral":439,"DeleteVertex":440,"DeleteVertex_option0":441,"DeleteEdge":442,"DeleteEdge_option0":443,"DeleteEdge_option1":444,"DeleteEdge_option2":445,"Term":446,"COLONDASH":447,"TermsList":448,"QUESTIONDASH":449,"SEMICOLON":450,"GO":451,"PERCENT":452,"FuncValue_option0_group0":453,"$accept":0,"$end":1},
terminals_: {2:"error",4:"LITERAL",5:"BRALITERAL",8:"EOF",12:"EXPLAIN",13:"QUERY",14:"PLAN",47:"EndTransaction",65:"WITH",67:"COMMA",69:"AS",70:"LPAR",71:"RPAR",81:"SEARCH",85:"REMOVE",90:"LIKE",93:"ORDER",94:"BY",97:"ARROW",98:"CARET",99:"EQ",104:"WHERE",105:"CLASS",106:"NUMBER",107:"STRING",108:"SLASH",109:"VERTEX",110:"EDGE",111:"EXCLAMATION",112:"SHARP",113:"MODULO",114:"GT",115:"LT",116:"DOLLAR",117:"DOT",119:"AT",120:"SET",122:"TO",123:"VALUE",124:"ROW",126:"COLON",128:"NOT",130:"IF",136:"UNION",138:"ALL",140:"ANY",142:"INTERSECT",143:"EXCEPT",144:"AND",145:"OR",146:"PATH",147:"RETURN",149:"REPEAT",153:"PLUS",154:"STAR",155:"QUESTION",157:"FROM",159:"DISTINCT",161:"UNIQUE",163:"SELECT",164:"COLUMN",165:"MATRIX",166:"TEXTSTRING",167:"INDEX",168:"RECORDSET",169:"TOP",172:"INTO",180:"CROSS",181:"APPLY",182:"OUTER",194:"NATURAL",195:"JOIN",196:"INNER",197:"LEFT",198:"RIGHT",199:"FULL",200:"SEMI",201:"ANTI",202:"ON",203:"USING",205:"GROUP",209:"GROUPING",210:"ROLLUP",211:"CUBE",212:"HAVING",213:"CORRESPONDING",215:"DIRECTION",216:"COLLATE",217:"NOCASE",218:"LIMIT",220:"OFFSET",232:"CURRENT_TIMESTAMP",233:"JAVASCRIPT",234:"NEW",235:"CAST",237:"CONVERT",240:"OVER",243:"PARTITION",244:"SUM",245:"COUNT",246:"MIN",247:"MAX",248:"AVG",249:"FIRST",250:"LAST",251:"AGGR",252:"ARRAY",254:"TRUE",255:"FALSE",256:"NSTRING",257:"NULL",258:"EXISTS",260:"BRAQUESTION",261:"CASE",264:"END",266:"WHEN",267:"THEN",268:"ELSE",269:"NOT_LIKE",270:"MINUS",271:"GE",272:"LE",273:"EQEQ",274:"EQEQEQ",275:"NE",276:"NEEQEQ",277:"NEEQEQEQ",280:"IN",282:"BETWEEN",283:"NOT_BETWEEN",284:"IS",285:"DOUBLECOLON",286:"SOME",287:"UPDATE",290:"DELETE",291:"INSERT",294:"DEFAULT",297:"DateValue",298:"CREATE",304:"TABLE",307:"IDENTITY",308:"TEMP",318:"CONSTRAINT",319:"CHECK",320:"PRIMARY",321:"KEY",324:"FOREIGN",325:"REFERENCES",331:"NO",332:"ACTION",336:"ColumnConstraints",338:"ENUM",344:"DROP",347:"ALTER",348:"RENAME",349:"ADD",350:"MODIFY",351:"ATTACH",352:"DATABASE",353:"DETACH",355:"USE",356:"SHOW",357:"VIEW",361:"READ",362:"ONLY",363:"OPTION",364:"HELP",365:"SOURCE",366:"ASSERT",368:"ATLBRA",372:"LCUR",374:"RCUR",376:"RBRA",382:"OFF",383:"COMMIT",384:"TRANSACTION",385:"ROLLBACK",386:"BEGIN",388:"WHILE",389:"CONTINUE",390:"BREAK",391:"PRINT",392:"REQUIRE",396:"ECHO",397:"DECLARE",400:"TRUNCATE",401:"MERGE",409:"MATCHED",412:"TARGET",413:"OUTPUT",419:"CONTENT",421:"GRAPH",447:"COLONDASH",449:"QUESTIONDASH",450:"SEMICOLON",451:"GO",452:"PERCENT"},
productions_: [0,[3,1],[3,1],[6,2],[7,3],[7,1],[7,1],[11,2],[11,4],[10,1],[15,0],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[43,3],[66,3],[66,1],[68,5],[36,9],[36,4],[84,3],[87,3],[87,1],[88,1],[88,2],[92,1],[92,5],[92,5],[92,2],[92,1],[92,2],[92,2],[92,3],[92,4],[92,4],[92,4],[92,4],[92,1],[92,1],[92,1],[92,1],[92,1],[92,1],[92,2],[92,2],[92,2],[92,1],[92,1],[92,1],[92,2],[92,1],[92,2],[92,3],[92,4],[92,3],[92,1],[92,4],[92,2],[92,2],[92,4],[92,4],[92,4],[92,4],[92,4],[92,5],[92,4],[92,4],[92,4],[92,4],[92,4],[92,4],[92,4],[92,4],[92,6],[137,3],[137,1],[127,1],[127,1],[127,1],[156,2],[72,4],[72,4],[72,4],[72,3],[158,1],[158,2],[158,2],[158,2],[158,2],[158,2],[158,2],[158,2],[160,3],[160,4],[160,0],[74,0],[74,2],[74,2],[74,2],[74,2],[74,2],[75,2],[75,3],[75,5],[75,0],[179,6],[179,7],[179,6],[179,7],[177,1],[177,3],[183,4],[183,5],[183,3],[183,3],[183,2],[183,3],[183,1],[183,2],[183,3],[183,1],[183,1],[183,2],[183,3],[183,1],[183,2],[183,3],[183,1],[183,2],[183,3],[186,1],[173,3],[173,1],[178,2],[178,2],[178,1],[178,1],[187,3],[189,1],[189,2],[189,3],[189,3],[189,2],[189,3],[189,4],[189,5],[189,1],[189,2],[189,3],[189,1],[189,2],[189,3],[188,1],[188,2],[193,1],[193,2],[193,2],[193,3],[193,2],[193,3],[193,2],[193,3],[193,2],[193,2],[193,2],[190,2],[190,2],[190,0],[76,0],[76,2],[77,0],[77,4],[206,1],[206,3],[208,5],[208,4],[208,4],[208,1],[207,0],[207,2],[80,0],[80,2],[80,3],[80,2],[80,2],[80,3],[80,4],[80,3],[80,3],[78,0],[78,3],[95,1],[95,3],[214,1],[214,2],[214,3],[214,4],[79,0],[79,3],[219,0],[219,2],[148,3],[148,1],[221,3],[221,2],[221,3],[221,2],[221,3],[221,2],[221,1],[222,5],[222,3],[222,1],[89,5],[89,3],[89,3],[89,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,1],[100,3],[100,3],[100,3],[100,1],[100,1],[51,1],[230,2],[230,2],[229,6],[229,8],[229,6],[229,8],[238,1],[238,1],[238,1],[238,1],[238,1],[238,1],[238,1],[223,5],[223,6],[223,6],[239,0],[239,4],[239,4],[239,5],[241,3],[242,3],[132,1],[132,1],[132,1],[132,1],[132,1],[132,1],[132,1],[132,1],[132,1],[174,5],[174,3],[125,1],[125,3],[170,1],[225,1],[225,1],[91,1],[91,1],[226,1],[176,2],[227,4],[175,2],[175,2],[175,1],[175,1],[228,5],[228,4],[262,2],[262,1],[265,4],[263,2],[263,0],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,5],[224,3],[224,3],[224,3],[224,5],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,3],[224,6],[224,6],[224,3],[224,3],[224,2],[224,2],[224,2],[224,2],[224,3],[224,5],[224,6],[224,5],[224,6],[224,4],[224,5],[224,3],[224,4],[224,3],[224,4],[224,3],[224,3],[224,3],[224,3],[281,1],[281,1],[281,4],[278,1],[278,1],[278,1],[278,1],[278,1],[278,1],[279,1],[279,1],[279,1],[49,6],[49,4],[121,1],[121,3],[288,3],[288,4],[26,5],[26,3],[33,5],[33,5],[33,8],[33,4],[33,7],[292,0],[292,1],[293,3],[293,1],[293,1],[293,5],[293,3],[293,3],[295,1],[295,3],[296,1],[296,1],[296,1],[296,1],[296,1],[296,1],[204,1],[204,3],[21,9],[21,5],[300,1],[300,1],[303,0],[303,1],[305,2],[305,1],[306,1],[306,3],[306,3],[299,0],[299,1],[301,0],[301,3],[302,3],[302,1],[302,2],[310,1],[310,3],[311,2],[311,2],[311,2],[311,2],[311,2],[312,0],[312,2],[317,4],[313,6],[314,9],[328,3],[327,0],[327,2],[329,4],[330,4],[315,5],[316,5],[316,5],[323,1],[323,1],[323,3],[323,3],[309,1],[309,3],[334,3],[334,2],[334,1],[236,6],[236,7],[236,4],[236,5],[236,1],[236,2],[236,4],[337,1],[337,1],[335,0],[335,1],[339,2],[339,1],[341,3],[340,2],[340,5],[340,3],[340,6],[340,1],[340,2],[340,4],[340,1],[340,2],[340,1],[340,1],[30,4],[346,0],[346,2],[16,6],[16,6],[16,6],[16,8],[16,6],[35,5],[17,4],[17,7],[17,6],[17,9],[27,3],[18,4],[18,6],[18,9],[18,6],[354,0],[354,2],[48,3],[48,2],[28,4],[28,5],[28,5],[19,8],[19,9],[29,3],[39,2],[39,4],[39,3],[39,5],[41,2],[41,4],[41,4],[41,6],[38,4],[38,6],[40,4],[40,6],[37,4],[37,6],[22,11],[22,8],[360,3],[360,3],[360,5],[31,4],[50,2],[50,1],[61,2],[52,2],[53,2],[53,2],[53,4],[118,4],[118,2],[118,2],[118,2],[118,2],[118,1],[118,2],[118,2],[370,1],[370,1],[371,1],[371,1],[371,1],[371,1],[371,1],[371,1],[371,1],[371,3],[367,3],[367,4],[367,2],[369,2],[369,3],[369,1],[373,3],[373,1],[377,3],[377,3],[377,3],[375,3],[375,1],[60,3],[60,5],[60,6],[379,1],[379,1],[380,3],[380,2],[381,1],[381,1],[381,3],[378,1],[378,1],[45,2],[46,2],[44,2],[32,4],[32,3],[387,2],[54,3],[55,1],[56,1],[57,3],[58,2],[58,2],[59,2],[59,2],[395,1],[395,1],[64,2],[393,3],[393,1],[394,3],[394,1],[25,2],[398,1],[398,3],[399,3],[399,4],[399,5],[399,6],[42,3],[34,6],[402,1],[402,2],[403,2],[404,2],[405,2],[405,2],[405,1],[405,1],[407,4],[407,6],[410,1],[410,3],[408,5],[408,7],[408,7],[408,9],[408,7],[408,9],[411,3],[411,6],[411,3],[411,6],[406,0],[406,2],[406,5],[406,4],[406,7],[24,6],[418,2],[417,0],[417,2],[417,2],[417,1],[23,8],[20,3],[20,4],[422,3],[422,1],[423,3],[423,7],[423,4],[431,2],[432,3],[433,2],[424,4],[438,2],[439,2],[439,2],[440,4],[442,6],[62,3],[62,2],[448,3],[448,1],[446,1],[446,4],[63,2],[9,1],[9,1],[73,0],[73,1],[82,0],[82,2],[83,0],[83,1],[86,0],[86,1],[96,0],[96,1],[101,1],[101,2],[102,1],[102,2],[103,0],[103,1],[129,0],[129,2],[131,0],[131,2],[133,0],[133,2],[134,1],[134,1],[135,0],[135,2],[139,0],[139,2],[141,0],[141,2],[150,0],[150,2],[151,0],[151,2],[152,0],[152,2],[162,0],[162,1],[171,0],[171,1],[184,0],[184,1],[185,0],[185,1],[191,0],[191,1],[192,0],[192,1],[231,1],[231,1],[453,1],[453,1],[253,0],[253,1],[259,1],[259,1],[289,1],[289,1],[322,0],[322,1],[326,0],[326,1],[333,0],[333,1],[342,0],[342,1],[343,0],[343,1],[345,1],[345,1],[358,0],[358,1],[359,0],[359,1],[414,0],[414,1],[415,0],[415,1],[416,0],[416,1],[420,0],[420,1],[425,0],[425,1],[426,0],[426,1],[427,1],[427,1],[428,0],[428,1],[429,0],[429,1],[430,1],[430,1],[434,0],[434,1],[435,0],[435,1],[436,0],[436,1],[437,0],[437,1],[441,0],[441,2],[443,0],[443,2],[444,0],[444,2],[445,0],[445,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

			if (yy.casesensitive) this.$ = $$[$0];
			else this.$ = $$[$0].toLowerCase();
		
break;
case 2:
 this.$ = doubleq($$[$0].substr(1,$$[$0].length-2)); 
break;
case 3:
 return new yy.Statements({statements:$$[$0-1]}); 
break;
case 4:
 this.$ = $$[$0-2]; if($$[$0]) $$[$0-2].push($$[$0]); 
break;
case 5: case 6: case 62: case 68: case 121: case 155: case 181: case 182: case 218: case 237: case 248: case 318: case 335: case 402: case 416: case 417: case 421: case 429: case 469: case 470: case 588: case 595: case 619: case 621: case 623: case 637: case 638: case 668: case 684:
 this.$ = [$$[$0]]; 
break;
case 7:
 this.$ = $$[$0]; $$[$0].explain = true; 
break;
case 8:
 this.$ = $$[$0];  $$[$0].explain = true;
break;
case 9:
 
			this.$ = $$[$0];

			// TODO combine exists and queries
		    if(yy.exists) this.$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) this.$.queries = yy.queries;
			delete yy.queries;
		
break;
case 10: case 140: case 150: case 213: case 214: case 216: case 224: case 226: case 235: case 243: case 245: case 338: case 433: case 442: case 444: case 456: case 462: case 463: case 504:
 this.$ = undefined; 
break;
case 60:
 this.$ = new yy.WithSelect({withs: $$[$0-1], select:$$[$0]}); 
break;
case 61:
 $$[$0-2].push($$[$0]); this.$=$$[$0-2]; 
break;
case 63:
 this.$ = {name:$$[$0-4], select:$$[$0-1]}; 
break;
case 64:
   
			yy.extend(this.$,$$[$0-8]); yy.extend(this.$,$$[$0-7]); yy.extend(this.$,$$[$0-6]); yy.extend(this.$,$$[$0-5]); 
		    yy.extend(this.$,$$[$0-4]); yy.extend(this.$,$$[$0-3]);yy.extend(this.$,$$[$0-2]); 
		    yy.extend(this.$,$$[$0-1]); yy.extend(this.$,$$[$0]); 
		    this.$ = $$[$0-8];
/*		    if(yy.exists) this.$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) this.$.queries = yy.queries;
			delete yy.queries;
*/		
break;
case 65:

			this.$ = new yy.Search({selectors:$$[$0-2], from:$$[$0]});
			yy.extend(this.$,$$[$0-1]);
		
break;
case 66:
 this.$ = {removecolumns:$$[$0]}; 
break;
case 67: case 667: case 683:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 69: case 125: case 163: case 223: case 255: case 263: case 264: case 265: case 266: case 267: case 268: case 269: case 270: case 271: case 272: case 273: case 274: case 275: case 276: case 278: case 291: case 292: case 293: case 294: case 295: case 296: case 337: case 391: case 392: case 393: case 394: case 395: case 396: case 457: case 488: case 490: case 562: case 563: case 564: case 565: case 566: case 567: case 571: case 573: case 574: case 583: case 596: case 597: case 659: case 673: case 674: case 676: case 677:
 this.$ = $$[$0]; 
break;
case 70:
 this.$ = {like:$$[$0]}; 
break;
case 71: case 83:
 this.$ = {srchid:"PROP", args: [$$[$0]]}; 
break;
case 72:
 this.$ = {srchid:"ORDERBY", args: $$[$0-1]}; 
break;
case 73:

			var dir = $$[$0-1];
			if(!dir) dir = 'ASC';
			this.$ = {srchid:"ORDERBY", args: [{expression: new yy.Column({columnid:'_'}), direction:dir}]};
		
break;
case 74:
 this.$ = {srchid:"APROP", args: [$$[$0]]}; 
break;
case 75:
 this.$ = {selid:"ROOT"};
break;
case 76:
 this.$ = {srchid:"EQ", args: [$$[$0]]}; 
break;
case 77:
 this.$ = {srchid:"LIKE", args: [$$[$0]]}; 
break;
case 78: case 79:
 this.$ = {selid:"WITH", args: $$[$0-1]}; 
break;
case 80:
 this.$ = {srchid:$$[$0-3].toUpperCase(), args:$$[$0-1]}; 
break;
case 81:
 this.$ = {srchid:"WHERE", args:[$$[$0-1]]}; 
break;
case 82:
 this.$ = {srchid:"CLASS", args:[$$[$0-1]]}; 
break;
case 84:
 this.$ = {srchid:"NAME", args: [$$[$0].substr(1,$$[$0].length-2)]}; 
break;
case 85:
 this.$ = {srchid:"CHILD"}; 
break;
case 86:
 this.$ = {srchid:"VERTEX"}; 
break;
case 87:
 this.$ = {srchid:"EDGE"}; 
break;
case 88:
 this.$ = {srchid:"REF"}; 
break;
case 89:
 this.$ = {srchid:"SHARP", args:[$$[$0]]}; 
break;
case 90:
 this.$ = {srchid:"ATTR", args:((typeof $$[$0] == 'undefined')?undefined:[$$[$0]])}; 
break;
case 91:
 this.$ = {srchid:"ATTR"}; 
break;
case 92:
 this.$ = {srchid:"OUT"}; 
break;
case 93:
 this.$ = {srchid:"IN"}; 
break;
case 94:
 this.$ = {srchid:"CONTENT"}; 
break;
case 95:
 this.$ = {srchid:"PARENT"}; 
break;
case 96:
 this.$ = {srchid:"EX",args:[new yy.Json({value:$$[$0]})]}; 
break;
case 97:
 this.$ = {srchid:"AT", args:[$$[$0]]}; 
break;
case 98:
 this.$ = {srchid:"AS", args:[$$[$0]]}; 
break;
case 99:
 this.$ = {srchid:"SET", args:$$[$0-1]}; 
break;
case 100:
 this.$ = {selid:"TO", args:[$$[$0]]}; 
break;
case 101:
 this.$ = {srchid:"VALUE"}; 
break;
case 102:
 this.$ = {srchid:"ROW", args:$$[$0-1]}; 
break;
case 103:
 this.$ = {srchid:"CLASS", args:[$$[$0]]}; 
break;
case 104:
 this.$ = {selid:$$[$0],args:[$$[$0-1]] }; 
break;
case 105:
 this.$ = {selid:"NOT",args:$$[$0-1] }; 
break;
case 106:
 this.$ = {selid:"IF",args:$$[$0-1] }; 
break;
case 107:
 this.$ = {selid:$$[$0-3],args:$$[$0-1] }; 
break;
case 108:
 this.$ = {selid:'DISTINCT',args:$$[$0-1] }; 
break;
case 109:
 this.$ = {selid:'UNION',args:$$[$0-1] }; 
break;
case 110:
 this.$ = {selid:'UNIONALL',args:$$[$0-1] }; 
break;
case 111:
 this.$ = {selid:'ALL',args:[$$[$0-1]] }; 
break;
case 112:
 this.$ = {selid:'ANY',args:[$$[$0-1]] }; 
break;
case 113:
 this.$ = {selid:'INTERSECT',args:$$[$0-1] }; 
break;
case 114:
 this.$ = {selid:'EXCEPT',args:$$[$0-1] }; 
break;
case 115:
 this.$ = {selid:'AND',args:$$[$0-1] }; 
break;
case 116:
 this.$ = {selid:'OR',args:$$[$0-1] }; 
break;
case 117:
 this.$ = {selid:'PATH',args:[$$[$0-1]] }; 
break;
case 118:
 this.$ = {srchid:'RETURN',args:$$[$0-1] }; 
break;
case 119:
 this.$ = {selid:'REPEAT',sels:$$[$0-3], args:$$[$0-1] }; 
break;
case 120:
 this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 122:
 this.$ = "PLUS"; 
break;
case 123:
 this.$ = "STAR"; 
break;
case 124:
 this.$ = "QUESTION"; 
break;
case 126:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy.extend(this.$, $$[$0-3]); yy.extend(this.$, $$[$0-1]); 
break;
case 127:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy.extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 128:
 this.$ = new yy.Select({ columns:$$[$0], all:true }); yy.extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 129:
 
			if(!$$[$0]) {
				this.$ = new yy.Select({columns:[new yy.Column({columnid:'_',})], modifier:'COLUMN'});
			} else {
				this.$ = new yy.Select({ columns:$$[$0] }); yy.extend(this.$, $$[$0-2]);yy.extend(this.$, $$[$0-1]); 
			}
		
break;
case 130:
 if($$[$0]=='SELECT') this.$ = undefined; else this.$ = {modifier: $$[$0]};  
break;
case 131:
 this.$ = {modifier:'VALUE'}
break;
case 132:
 this.$ = {modifier:'ROW'}
break;
case 133:
 this.$ = {modifier:'COLUMN'}
break;
case 134:
 this.$ = {modifier:'MATRIX'}
break;
case 135:
 this.$ = {modifier:'TEXTSTRING'}
break;
case 136:
 this.$ = {modifier:'INDEX'}
break;
case 137:
 this.$ = {modifier:'RECORDSET'}
break;
case 138:
 this.$ = {top: $$[$0-1], percent:(typeof $$[$0] != 'undefined'?true:undefined)}; 
break;
case 139:
 this.$ = {top: $$[$0-1]}; 
break;
case 141: case 301: case 464: case 465: case 660:
this.$ = undefined; 
break;
case 142: case 143: case 144: case 145:
this.$ = {into: $$[$0]} 
break;
case 146:
 
			var s = $$[$0];
			s = s.substr(1,s.length-2);
			var x3 = s.substr(-3).toUpperCase();
			var x4 = s.substr(-4).toUpperCase();
			if(s[0] == '#') {
				this.$ = {into: new yy.FuncValue({funcid: 'HTML', args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			} else if(x3=='XLS' || x3 == 'CSV' || x3=='TAB') {
				this.$ = {into: new yy.FuncValue({funcid: x3, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			} else if(x4=='XLSX' || x4 == 'JSON') {
				this.$ = {into: new yy.FuncValue({funcid: x4, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			}
		
break;
case 147:
 this.$ = { from: $$[$0] }; 
break;
case 148:
 this.$ = { from: $$[$0-1], joins: $$[$0] }; 
break;
case 149:
 this.$ = { from: $$[$0-2], joins: $$[$0-1] }; 
break;
case 151:
 this.$ = new yy.Apply({select: $$[$0-2], applymode:'CROSS', as:$$[$0]}); 
break;
case 152:
 this.$ = new yy.Apply({select: $$[$0-3], applymode:'CROSS', as:$$[$0]}); 
break;
case 153:
 this.$ = new yy.Apply({select: $$[$0-2], applymode:'OUTER', as:$$[$0]}); 
break;
case 154:
 this.$ = new yy.Apply({select: $$[$0-3], applymode:'OUTER', as:$$[$0]}); 
break;
case 156: case 219: case 403: case 471: case 472:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 157:
 this.$ = $$[$0-2]; this.$.as = $$[$0] 
break;
case 158:
 this.$ = $$[$0-3]; this.$.as = $$[$0] 
break;
case 159:
 this.$ = $$[$0-1]; this.$.as = 'default' 
break;
case 160:
 this.$ = new yy.Json({value:$$[$0-2]}); $$[$0-2].as = $$[$0] 
break;
case 161:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0] 
break;
case 162:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0] 
break;
case 164: case 168: case 171: case 174:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0]; 
break;
case 165: case 169: case 172: case 175:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0]; 
break;
case 166: case 167: case 170: case 173:
 this.$ = $$[$0]; $$[$0].as = 'default'; 
break;
case 176:
 
			var s = $$[$0];
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
			this.$ = r;
		
break;
case 177:
 	
			if($$[$0-2] == 'INFORMATION_SCHEMA') {
				this.$ = new yy.FuncValue({funcid: $$[$0-2], args:[new yy.StringValue({value:$$[$0]})]});
			} else {
				this.$ = new yy.Table({databaseid: $$[$0-2], tableid:$$[$0]});
			}
		
break;
case 178:
 this.$ = new yy.Table({tableid: $$[$0]});
break;
case 179: case 180:
 this.$ = $$[$0-1]; $$[$0-1].push($$[$0]); 
break;
case 183:
 this.$ = new yy.Join($$[$0-2]); yy.extend(this.$, $$[$0-1]); yy.extend(this.$, $$[$0]); 
break;
case 184:
 this.$ = {table: $$[$0]}; 
break;
case 185:
 this.$ = {table: $$[$0-1], as: $$[$0] } ; 
break;
case 186:
 this.$ = {table: $$[$0-2], as: $$[$0] } ; 
break;
case 187:
 this.$ = {json:new yy.Json({value:$$[$0-2],as:$$[$0]})}; 
break;
case 188:
 this.$ = {param: $$[$0-1], as: $$[$0] } ; 
break;
case 189:
 this.$ = {param: $$[$0-2], as: $$[$0] } ; 
break;
case 190:
 this.$ = {select: $$[$0-3], as: $$[$0]} ; 
break;
case 191:
 this.$ = {select: $$[$0-4], as: $$[$0] } ; 
break;
case 192:
 this.$ = {funcid:$$[$0], as:'default'}; 
break;
case 193:
 this.$ = {funcid:$$[$0-1], as: $$[$0]}; 
break;
case 194:
 this.$ = {funcid:$$[$0-2], as: $$[$0]}; 
break;
case 195:
 this.$ = {variable:$$[$0],as:'default'}; 
break;
case 196:
 this.$ = {variable:$$[$0-1],as:$$[$0]}; 
break;
case 197:
 this.$ = {variable:$$[$0-2],as:$$[$0]} 
break;
case 198:
 this.$ = { joinmode: $$[$0] } ; 
break;
case 199:
 this.$ = {joinmode: $$[$0-1], natural:true} ; 
break;
case 200: case 201:
 this.$ = "INNER"; 
break;
case 202: case 203:
 this.$ = "LEFT"; 
break;
case 204: case 205:
 this.$ = "RIGHT"; 
break;
case 206: case 207:
 this.$ = "OUTER"; 
break;
case 208:
 this.$ = "SEMI"; 
break;
case 209:
 this.$ = "ANTI"; 
break;
case 210:
 this.$ = "CROSS"; 
break;
case 211:
 this.$ = {on: $$[$0]}; 
break;
case 212: case 633:
 this.$ = {using: $$[$0]}; 
break;
case 215:
 this.$ = {where: new yy.Expression({expression:$$[$0]})}; 
break;
case 217:
 this.$ = {group:$$[$0-1]}; yy.extend(this.$,$$[$0]); 
break;
case 220:
 this.$ = new yy.GroupExpression({type:'GROUPING SETS', group: $$[$0-1]}); 
break;
case 221:
 this.$ = new yy.GroupExpression({type:'ROLLUP', group: $$[$0-1]}); 
break;
case 222:
 this.$ = new yy.GroupExpression({type:'CUBE', group: $$[$0-1]}); 
break;
case 225:
 this.$ = {having:$$[$0]}
break;
case 227:
 this.$ = {union: $$[$0]} ; 
break;
case 228:
 this.$ = {unionall: $$[$0]} ; 
break;
case 229:
 this.$ = {except: $$[$0]} ; 
break;
case 230:
 this.$ = {intersect: $$[$0]} ; 
break;
case 231:
 this.$ = {union: $$[$0], corresponding:true} ; 
break;
case 232:
 this.$ = {unionall: $$[$0], corresponding:true} ; 
break;
case 233:
 this.$ = {except: $$[$0], corresponding:true} ; 
break;
case 234:
 this.$ = {intersect: $$[$0], corresponding:true} ; 
break;
case 236:
 this.$ = {order:$$[$0]}
break;
case 238:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 239:
 this.$ = new yy.Expression({expression: $$[$0], direction:'ASC'}) 
break;
case 240:
 this.$ = new yy.Expression({expression: $$[$0-1], direction:$$[$0].toUpperCase()}) 
break;
case 241:
 this.$ = new yy.Expression({expression: $$[$0-2], direction:'ASC', nocase:true}) 
break;
case 242:
 this.$ = new yy.Expression({expression: $$[$0-3], direction:$$[$0].toUpperCase(), nocase:true}) 
break;
case 244:
 this.$ = {limit:$$[$0-1]}; yy.extend(this.$, $$[$0])
break;
case 246:
 this.$ = {offset:$$[$0]}
break;
case 247: case 450: case 474: case 587: case 594: case 618: case 620: case 624:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 249: case 251: case 253:
 $$[$0-2].as = $$[$0]; this.$ = $$[$0-2];
break;
case 250: case 252: case 254:
 $$[$0-1].as = $$[$0]; this.$ = $$[$0-1];
break;
case 256:
 this.$ = new yy.Column({columid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]}); 
break;
case 257:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]}); 
break;
case 258:
 this.$ = new yy.Column({columnid:$$[$0]}); 
break;
case 259:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]});
break;
case 260: case 261:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]});
break;
case 262:
 this.$ = new yy.Column({columnid: $$[$0]});
break;
case 277:
 this.$ = new yy.Json({value:$$[$0]}); 
break;
case 279: case 280: case 281:

			if(!yy.queries) yy.queries = []; 
			yy.queries.push($$[$0-1]);
			$$[$0-1].queriesidx = yy.queries.length;
			this.$ = $$[$0-1];
		
break;
case 282:
this.$ = $$[$0]
break;
case 283:
 this.$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'});
break;
case 284:
 this.$ = new yy.JavaScript({value:$$[$0].substr(2,$$[$0].length-4)}); 
break;
case 285:
 this.$ = new yy.FuncValue({funcid:$$[$0], newid:true}); 
break;
case 286:
 this.$ = $$[$0]; yy.extend(this.$,{newid:true}); 
break;
case 287:
 this.$ = new yy.Convert({expression:$$[$0-3]}) ; yy.extend(this.$,$$[$0-1]) ; 
break;
case 288:
 this.$ = new yy.Convert({expression:$$[$0-5], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 289:
 this.$ = new yy.Convert({expression:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 290:
 this.$ = new yy.Convert({expression:$$[$0-3], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-5]) ; 
break;
case 297:
 this.$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'}); 
break;
case 298:

		  if($$[$0-2].length > 1 && ($$[$0-4].toUpperCase() == 'MAX' || $$[$0-4].toUpperCase() == 'MIN')) {
		  	this.$ = new yy.FuncValue({funcid:$$[$0-4],args:$$[$0-2]});
		  } else {
			this.$ = new yy.AggrValue({aggregatorid: $$[$0-4].toUpperCase(), expression: $$[$0-2].pop(), over:$$[$0]}); 
		  } 
		
break;
case 299:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-5].toUpperCase(), expression: $$[$0-2], distinct:true, over:$$[$0]}); 
break;
case 300:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-5].toUpperCase(), expression: $$[$0-2],
		 over:$$[$0]}); 
break;
case 302: case 303:
 this.$ = new yy.Over(); yy.extend(this.$,$$[$0-1]); 
break;
case 304:
 this.$ = new yy.Over(); yy.extend(this.$,$$[$0-2]); yy.extend(this.$,$$[$0-1]);
break;
case 305:
 this.$ = {partition:$$[$0]}; 
break;
case 306:
 this.$ = {order:$$[$0]}; 
break;
case 307:
 this.$ = "SUM"; 
break;
case 308:
 this.$ = "COUNT"; 
break;
case 309:
 this.$ = "MIN"; 
break;
case 310: case 486:
 this.$ = "MAX"; 
break;
case 311:
 this.$ = "AVG"; 
break;
case 312:
 this.$ = "FIRST"; 
break;
case 313:
 this.$ = "LAST"; 
break;
case 314:
 this.$ = "AGGR"; 
break;
case 315:
 this.$ = "ARRAY"; 
break;
case 316:
 
			var funcid = $$[$0-4];
			var exprlist = $$[$0-1];
			if(exprlist.length > 1 && (funcid.toUpperCase() == 'MIN' || funcid.toUpperCase() == 'MAX')) {
					this.$ = new yy.FuncValue({funcid: funcid, args: exprlist}); 
			} else if(alasql.aggr[$$[$0-4]]) {
		    	this.$ = new yy.AggrValue({aggregatorid: 'REDUCE', 
                      funcid: funcid, expression: exprlist.pop(),distinct:($$[$0-2]=='DISTINCT') });
		    } else {
			    this.$ = new yy.FuncValue({funcid: funcid, args: exprlist}); 
			};
		
break;
case 317:
 this.$ = new yy.FuncValue({ funcid: $$[$0-2] }) 
break;
case 319:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 320:
 this.$ = new yy.NumValue({value:+$$[$0]}); 
break;
case 321:
 this.$ = new yy.LogicValue({value:true}); 
break;
case 322:
 this.$ = new yy.LogicValue({value:false}); 
break;
case 323:
 this.$ = new yy.StringValue({value: $$[$0].substr(1,$$[$0].length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 324:
 this.$ = new yy.StringValue({value: $$[$0].substr(2,$$[$0].length-3).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 325:
 this.$ = new yy.NullValue({value:undefined}); 
break;
case 326:
 this.$ = new yy.VarValue({variable:$$[$0]}); 
break;
case 327:
 
			if(!yy.exists) yy.exists = [];
			this.$ = new yy.ExistsValue({value:$$[$0-1], existsidx:yy.exists.length}); 
			yy.exists.push($$[$0-1]);
		
break;
case 328: case 329:
 this.$ = new yy.ParamValue({param: $$[$0]}); 
break;
case 330:
 
			if(typeof yy.question == 'undefined') yy.question = 0; 
			this.$ = new yy.ParamValue({param: yy.question++}); 
		
break;
case 331:
 
			if(typeof yy.question == 'undefined') yy.question = 0; 
			this.$ = new yy.ParamValue({param: yy.question++, array:true}); 
		
break;
case 332:
 this.$ = new yy.CaseValue({expression:$$[$0-3], whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 333:
 this.$ = new yy.CaseValue({whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 334: case 635: case 636:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 336:
 this.$ = {when: $$[$0-2], then: $$[$0] }; 
break;
case 339:
 this.$ = new yy.Op({left:$$[$0-2], op:'LIKE', right:$$[$0]}); 
break;
case 340:
 this.$ = new yy.Op({left:$$[$0-2], op:'NOT LIKE', right:$$[$0] }); 
break;
case 341:
 this.$ = new yy.Op({left:$$[$0-2], op:'+', right:$$[$0]}); 
break;
case 342:
 this.$ = new yy.Op({left:$$[$0-2], op:'-', right:$$[$0]}); 
break;
case 343:
 this.$ = new yy.Op({left:$$[$0-2], op:'*', right:$$[$0]}); 
break;
case 344:
 this.$ = new yy.Op({left:$$[$0-2], op:'/', right:$$[$0]}); 
break;
case 345:
 this.$ = new yy.Op({left:$$[$0-2], op:'%', right:$$[$0]}); 
break;
case 346:
 this.$ = new yy.Op({left:$$[$0-2], op:'^', right:$$[$0]}); 
break;
case 347: case 348: case 350:
 this.$ = new yy.Op({left:$$[$0-2], op:'->' , right:$$[$0]}); 
break;
case 349:
 this.$ = new yy.Op({left:$$[$0-4], op:'->' , right:$$[$0-1]}); 
break;
case 351: case 352: case 354:
 this.$ = new yy.Op({left:$$[$0-2], op:'!' , right:$$[$0]}); 
break;
case 353:
 this.$ = new yy.Op({left:$$[$0-4], op:'!' , right:$$[$0-1]}); 
break;
case 355:
 this.$ = new yy.Op({left:$$[$0-2], op:'>' , right:$$[$0]}); 
break;
case 356:
 this.$ = new yy.Op({left:$$[$0-2], op:'>=' , right:$$[$0]}); 
break;
case 357:
 this.$ = new yy.Op({left:$$[$0-2], op:'<' , right:$$[$0]}); 
break;
case 358:
 this.$ = new yy.Op({left:$$[$0-2], op:'<=' , right:$$[$0]}); 
break;
case 359:
 this.$ = new yy.Op({left:$$[$0-2], op:'=' , right:$$[$0]}); 
break;
case 360:
 this.$ = new yy.Op({left:$$[$0-2], op:'==' , right:$$[$0]}); 
break;
case 361:
 this.$ = new yy.Op({left:$$[$0-2], op:'===' , right:$$[$0]}); 
break;
case 362:
 this.$ = new yy.Op({left:$$[$0-2], op:'!=' , right:$$[$0]}); 
break;
case 363:
 this.$ = new yy.Op({left:$$[$0-2], op:'!==' , right:$$[$0]}); 
break;
case 364:
 this.$ = new yy.Op({left:$$[$0-2], op:'!===' , right:$$[$0]}); 
break;
case 365:
 
			if(!yy.queries) yy.queries = []; 
			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1], queriesidx: yy.queries.length}); 
			yy.queries.push($$[$0-1]);  
		
break;
case 366:
 
			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1]}); 
		
break;
case 367:
 
			if($$[$0-2].op == 'BETWEEN1') {

				if($$[$0-2].left.op == 'AND') {
					this.$ = new yy.Op({left:$$[$0-2].left.left,op:'AND',right:
						new yy.Op({left:$$[$0-2].left.right, op:'BETWEEN', 
							right1:$$[$0-2].right, right2:$$[$0]})
					});
				} else {
					this.$ = new yy.Op({left:$$[$0-2].left, op:'BETWEEN', 
						right1:$$[$0-2].right, right2:$$[$0]});
				}

			} else if($$[$0-2].op == 'NOT BETWEEN1') {
				if($$[$0-2].left.op == 'AND') {
					this.$ = new yy.Op({left:$$[$0-2].left.left,op:'AND',right:
						new yy.Op({left:$$[$0-2].left.right, op:'NOT BETWEEN', 
							right1:$$[$0-2].right, right2:$$[$0]})
					});
				} else {
					this.$ = new yy.Op({left:$$[$0-2].left, op:'NOT BETWEEN', 
						right1:$$[$0-2].right, right2:$$[$0]});
				}
			} else {
				this.$ = new yy.Op({left:$$[$0-2], op:'AND', right:$$[$0]});
			}


		
break;
case 368:
 this.$ = new yy.Op({left:$$[$0-2], op:'OR' , right:$$[$0]}); 
break;
case 369:
 this.$ = new yy.UniOp({op:'NOT' , right:$$[$0]}); 
break;
case 370:
 this.$ = new yy.UniOp({op:'-' , right:$$[$0]}); 
break;
case 371:
 this.$ = new yy.UniOp({op:'+' , right:$$[$0]}); 
break;
case 372:
 this.$ = new yy.UniOp({op:'#' , right:$$[$0]}); 
break;
case 373:
 this.$ = new yy.UniOp({right: $$[$0-1]}); 
break;
case 374:
 
			if(!yy.queries) yy.queries = []; 
			this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);  
		
break;
case 375:
 
			if(!yy.queries) yy.queries = []; 
			this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);  
		
break;
case 376:
 this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1]}); 
break;
case 377:
 this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1]}); 
break;
case 378:
 this.$ = new yy.Op({left: $$[$0-3], op:'IN', right:[]}); 
break;
case 379:
 this.$ = new yy.Op({left: $$[$0-4], op:'NOT IN', right:[]}); 
break;
case 380: case 382:
 this.$ = new yy.Op({left: $$[$0-2], op:'IN', right:$$[$0]}); 
break;
case 381: case 383:
 this.$ = new yy.Op({left: $$[$0-3], op:'NOT IN', right:$$[$0]}); 
break;
case 384:
 	
/*			var expr = $$[$0];
			if(expr.left && expr.left.op == 'AND') {
				this.$ = new yy.Op({left:new yy.Op({left:$$[$0-2], op:'BETWEEN', right:expr.left}), op:'AND', right:expr.right }); 
			} else {
*/
				this.$ = new yy.Op({left:$$[$0-2], op:'BETWEEN1', right:$$[$0] }); 
//			}
		
break;
case 385:

//			var expr = $$[$0];
//			if(expr.left && expr.left.op == 'AND') {
//				this.$ = new yy.Op({left:new yy.Op({left:$$[$0-2], op:'NOT BETWEEN', right:expr.left}), op:'AND', right:expr.right }); 
//			} else {
				this.$ = new yy.Op({left:$$[$0-2], op:'NOT BETWEEN1', right:$$[$0] }); 
//			}
		
break;
case 386:
 this.$ = new yy.Op({op:'IS' , left:$$[$0-2], right:$$[$0]}); 
break;
case 387:
 this.$ = new yy.Convert({expression:$$[$0-2]}) ; yy.extend(this.$,$$[$0]) ; 
break;
case 388: case 389:
 this.$ = $$[$0];
break;
case 390:
 this.$ = $$[$0-1];
break;
case 397:
 this.$ = 'ALL'; 
break;
case 398:
 this.$ = 'SOME'; 
break;
case 399:
 this.$ = 'ANY'; 
break;
case 400:
 this.$ = new yy.Update({table:$$[$0-4], columns:$$[$0-2], where:$$[$0]}); 
break;
case 401:
 this.$ = new yy.Update({table:$$[$0-2], columns:$$[$0]}); 
break;
case 404:
 this.$ = new yy.SetColumn({column:$$[$0-2], expression:$$[$0]})
break;
case 405:
 this.$ = new yy.SetColumn({variable:$$[$0-2], expression:$$[$0], method:$$[$0-3]})
break;
case 406:
 this.$ = new yy.Delete({table:$$[$0-2], where:$$[$0]});
break;
case 407:
 this.$ = new yy.Delete({table:$$[$0]});
break;
case 408:
 this.$ = new yy.Insert({into:$$[$0-2], values: $$[$0]}); 
break;
case 409:
 this.$ = new yy.Insert({into:$$[$0-2], default: true}) ; 
break;
case 410:
 this.$ = new yy.Insert({into:$$[$0-5], columns: $$[$0-3], values: $$[$0]}); 
break;
case 411:
 this.$ = new yy.Insert({into:$$[$0-1], select: $$[$0]}); 
break;
case 412:
 this.$ = new yy.Insert({into:$$[$0-4], columns: $$[$0-2], select: $$[$0]}); 
break;
case 415:
 this.$ = [$$[$0-1]]; 
break;
case 418:
this.$ = $$[$0-4]; $$[$0-4].push($$[$0-1])
break;
case 419: case 420: case 422: case 430:
this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 431:
 
			this.$ = new yy.CreateTable({table:$$[$0-4]}); 
			yy.extend(this.$,$$[$0-7]); 
			yy.extend(this.$,$$[$0-6]); 
			yy.extend(this.$,$$[$0-5]); 
			yy.extend(this.$,$$[$0-2]); 
			yy.extend(this.$,$$[$0]); 
		
break;
case 432:
 
			this.$ = new yy.CreateTable({table:$$[$0]}); 
			yy.extend(this.$,$$[$0-3]); 
			yy.extend(this.$,$$[$0-2]); 
			yy.extend(this.$,$$[$0-1]); 
		
break;
case 434:
 this.$ = {class:true}; 
break;
case 443:
 this.$ = {temporary:true}; 
break;
case 445:
 this.$ = {ifnotexists: true}; 
break;
case 446:
 this.$ = {columns: $$[$0-2], constraints: $$[$0]}; 
break;
case 447:
 this.$ = {columns: $$[$0]}; 
break;
case 448:
 this.$ = {as: $$[$0]} 
break;
case 449: case 473:
 this.$ = [$$[$0]];
break;
case 451: case 452: case 453: case 454: case 455:
 $$[$0].constraintid = $$[$0-1]; this.$ = $$[$0]; 
break;
case 458:
 this.$ = {type: 'CHECK', expression: $$[$0-1]}; 
break;
case 459:
 this.$ = {type: 'PRIMARY KEY', columns: $$[$0-1], clustered:($$[$0-3]+'').toUpperCase()}; 
break;
case 460:
 this.$ = {type: 'FOREIGN KEY', columns: $$[$0-5], fktable: $$[$0-2], fkcolumns: $$[$0-1]}; 
break;
case 461: case 491: case 522: case 558: case 576: case 579: case 598:
 this.$ = $$[$0-1]; 
break;
case 466:
 
			this.$ = {type: 'UNIQUE', columns: $$[$0-1], clustered:($$[$0-3]+'').toUpperCase()};
		
break;
case 475:
 this.$ = new yy.ColumnDef({columnid:$$[$0-2]}); yy.extend(this.$,$$[$0-1]); yy.extend(this.$,$$[$0]);
break;
case 476:
 this.$ = new yy.ColumnDef({columnid:$$[$0-1]}); yy.extend(this.$,$$[$0]); 
break;
case 477:
 this.$ = new yy.ColumnDef({columnid:$$[$0], dbtypeid: ''}); 
break;
case 478:
 this.$ = {dbtypeid: $$[$0-5], dbsize: $$[$0-3], dbprecision: +$$[$0-1]} 
break;
case 479:
 this.$ = {dbtypeid: $$[$0-6]+($$[$0-5]?' '+$$[$0-5]:''), dbsize: $$[$0-3], dbprecision: +$$[$0-1]} 
break;
case 480:
 this.$ = {dbtypeid: $$[$0-3], dbsize: $$[$0-1]} 
break;
case 481:
 this.$ = {dbtypeid: $$[$0-4]+($$[$0-3]?' '+$$[$0-3]:''), dbsize: $$[$0-1]} 
break;
case 482:
 this.$ = {dbtypeid: $$[$0]} 
break;
case 483:
 this.$ = {dbtypeid: $$[$0-1]+($$[$0]?' '+$$[$0]:'')} 
break;
case 484:
 this.$ = {dbtypeid: 'ENUM', enumvalues: $$[$0-1]} 
break;
case 485: case 678:
 this.$ = +$$[$0]; 
break;
case 487:
this.$ = undefined
break;
case 489:
 
			yy.extend($$[$0-1],$$[$0]); this.$ = $$[$0-1];
		
break;
case 492:
this.$ = {primarykey:true};
break;
case 493: case 494:
this.$ = {foreignkey:{table:$$[$0-1], columnid: $$[$0]}};
break;
case 495:
 this.$ = {identity: {value:$$[$0-3],step:$$[$0-1]}} 
break;
case 496:
 this.$ = {identity: {value:1,step:1}} 
break;
case 497:
this.$ = {default:$$[$0]};
break;
case 498:
this.$ = {default:$$[$0-1]};
break;
case 499:
this.$ = {null:true}; 
break;
case 500:
this.$ = {notnull:true}; 
break;
case 501:
this.$ = {check:$$[$0]}; 
break;
case 502:
this.$ = {unique:true}; 
break;
case 503:
 this.$ = new yy.DropTable({table:$$[$0],type:$$[$0-2]}); yy.extend(this.$, $$[$0-1]); 
break;
case 505:
 this.$ = {ifexists: true};
break;
case 506:
 this.$ = new yy.AlterTable({table:$$[$0-3], renameto: $$[$0]});
break;
case 507:
 this.$ = new yy.AlterTable({table:$$[$0-3], addcolumn: $$[$0]});
break;
case 508:
 this.$ = new yy.AlterTable({table:$$[$0-3], modifycolumn: $$[$0]});
break;
case 509:
 this.$ = new yy.AlterTable({table:$$[$0-5], renamecolumn: $$[$0-2], to: $$[$0]});
break;
case 510:
 this.$ = new yy.AlterTable({table:$$[$0-3], dropcolumn: $$[$0]});
break;
case 511:
 this.$ = new yy.AlterTable({table:$$[$0-2], renameto: $$[$0]});
break;
case 512:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0], engineid:$$[$0-2].toUpperCase() });
break;
case 513:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0-3], engineid:$$[$0-5].toUpperCase(), args:$$[$0-1] });
break;
case 514:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0-2], engineid:$$[$0-4].toUpperCase(), as:$$[$0] });
break;
case 515:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0-5], engineid:$$[$0-7].toUpperCase(), as:$$[$0], args:$$[$0-3]});
break;
case 516:
 this.$ = new yy.DetachDatabase({databaseid:$$[$0]});
break;
case 517:
 this.$ = new yy.CreateDatabase({databaseid:$$[$0] }); yy.extend(this.$,$$[$0]); 
break;
case 518:
 this.$ = new yy.CreateDatabase({engineid:$$[$0-4].toUpperCase(), databaseid:$$[$0-1], as:$$[$0] }); yy.extend(this.$,$$[$0-2]); 
break;
case 519:
 this.$ = new yy.CreateDatabase({engineid:$$[$0-7].toUpperCase(), databaseid:$$[$0-4], args:$$[$0-2], as:$$[$0] }); yy.extend(this.$,$$[$0-5]); 
break;
case 520:
 this.$ = new yy.CreateDatabase({engineid:$$[$0-4].toUpperCase(), 
		    as:$$[$0], args:[$$[$0-1]] }); yy.extend(this.$,$$[$0-2]); 
break;
case 521:
this.$ = undefined;
break;
case 523: case 524:
 this.$ = new yy.UseDatabase({databaseid: $$[$0] });
break;
case 525:
 this.$ = new yy.DropDatabase({databaseid: $$[$0] }); yy.extend(this.$,$$[$0-1]); 
break;
case 526: case 527:
 this.$ = new yy.DropDatabase({databaseid: $$[$0], engineid:$$[$0-3].toUpperCase() }); yy.extend(this.$,$$[$0-1]); 
break;
case 528:
 this.$ = new yy.CreateIndex({indexid:$$[$0-5], table:$$[$0-3], columns:$$[$0-1]})
break;
case 529:
 this.$ = new yy.CreateIndex({indexid:$$[$0-5], table:$$[$0-3], columns:$$[$0-1], unique:true})
break;
case 530:
 this.$ = new yy.DropIndex({indexid:$$[$0]});
break;
case 531:
 this.$ = new yy.ShowDatabases();
break;
case 532:
 this.$ = new yy.ShowDatabases({like:$$[$0]});
break;
case 533:
 this.$ = new yy.ShowDatabases({engineid:$$[$0-1].toUpperCase() });
break;
case 534:
 this.$ = new yy.ShowDatabases({engineid:$$[$0-3].toUpperCase() , like:$$[$0]});
break;
case 535:
 this.$ = new yy.ShowTables();
break;
case 536:
 this.$ = new yy.ShowTables({like:$$[$0]});
break;
case 537:
 this.$ = new yy.ShowTables({databaseid: $$[$0]});
break;
case 538:
 this.$ = new yy.ShowTables({like:$$[$0], databaseid: $$[$0-2]});
break;
case 539:
 this.$ = new yy.ShowColumns({table: $$[$0]});
break;
case 540:
 this.$ = new yy.ShowColumns({table: $$[$0-2], databaseid:$$[$0]});
break;
case 541:
 this.$ = new yy.ShowIndex({table: $$[$0]});
break;
case 542:
 this.$ = new yy.ShowIndex({table: $$[$0-2], databaseid: $$[$0]});
break;
case 543:
 this.$ = new yy.ShowCreateTable({table: $$[$0]});
break;
case 544:
 this.$ = new yy.ShowCreateTable({table: $$[$0-2], databaseid:$$[$0]});
break;
case 545:

			this.$ = new yy.CreateTable({table:$$[$0-6],view:true,select:$$[$0-1],viewcolumns:$$[$0-4]}); 
			yy.extend(this.$,$$[$0-9]); 
			yy.extend(this.$,$$[$0-7]); 
		
break;
case 546:
 
			this.$ = new yy.CreateTable({table:$$[$0-3],view:true,select:$$[$0-1]}); 
			yy.extend(this.$,$$[$0-6]); 
			yy.extend(this.$,$$[$0-4]); 
		
break;
case 550:
 this.$ = new yy.DropTable({table:$$[$0], view:true}); yy.extend(this.$, $$[$0-1]); 
break;
case 551:
 this.$ = new yy.Help({subject:$$[$0].value.toUpperCase()} ) ; 
break;
case 552:
 this.$ = new yy.Help() ; 
break;
case 553:
 this.$ = new yy.ExpressionStatement({expression:$$[$0]}); 
break;
case 554:
 this.$ = new yy.Source({url:$$[$0].value}); 
break;
case 555:
 this.$ = new yy.Assert({value:$$[$0]}); 
break;
case 556:
 this.$ = new yy.Assert({value:$$[$0].value}); 
break;
case 557:
 this.$ = new yy.Assert({value:$$[$0], message:$$[$0-2]}); 
break;
case 559: case 570: case 572:
 this.$ = $$[$0].value; 
break;
case 560: case 568:
 this.$ = +$$[$0].value; 
break;
case 561:
 this.$ = (!!$$[$0].value); 
break;
case 569:
 this.$ = ""+$$[$0].value; 
break;
case 575:
 this.$ = $$[$0-1]
break;
case 577: case 580:
 this.$ = $$[$0-2]; 
break;
case 578:
 this.$ = {}; 
break;
case 581:
 this.$ = []; 
break;
case 582:
 yy.extend($$[$0-2],$$[$0]); this.$ = $$[$0-2]; 
break;
case 584:
 this.$ = {}; this.$[$$[$0-2].substr(1,$$[$0-2].length-2)] = $$[$0]; 
break;
case 585: case 586:
 this.$ = {}; this.$[$$[$0-2]] = $$[$0]; 
break;
case 589:
 this.$ = new yy.SetVariable({variable:$$[$0-1].toLowerCase(), value:$$[$0]});
break;
case 590:
 this.$ = new yy.SetVariable({variable:$$[$0-2], expression:$$[$0], method:$$[$0-3]});
break;
case 591:
 this.$ = new yy.SetVariable({variable:$$[$0-3], props: $$[$0-2], expression:$$[$0], method:$$[$0-4]});
break;
case 592:
this.$ = '@'; 
break;
case 593:
this.$ = '$'; 
break;
case 599:
 this.$ = true; 
break;
case 600:
 this.$ = false; 
break;
case 601:
 this.$ = new yy.CommitTransaction(); 
break;
case 602:
 this.$ = new yy.RollbackTransaction(); 
break;
case 603:
 this.$ = new yy.BeginTransaction(); 
break;
case 604:
 this.$ = new yy.If({expression:$$[$0-2],thenstat:$$[$0-1], elsestat:$$[$0]}); 
			if($$[$0-1].exists) this.$.exists = $$[$0-1].exists;
			if($$[$0-1].queries) this.$.queries = $$[$0-1].queries;
		
break;
case 605:
 
			this.$ = new yy.If({expression:$$[$0-1],thenstat:$$[$0]}); 
			if($$[$0].exists) this.$.exists = $$[$0].exists;
			if($$[$0].queries) this.$.queries = $$[$0].queries;
		
break;
case 606:
this.$ = $$[$0];
break;
case 607:
 this.$ = new yy.While({expression:$$[$0-1],loopstat:$$[$0]}); 
			if($$[$0].exists) this.$.exists = $$[$0].exists;
			if($$[$0].queries) this.$.queries = $$[$0].queries;
		
break;
case 608:
 this.$ = new yy.Continue(); 
break;
case 609:
 this.$ = new yy.Break(); 
break;
case 610:
 this.$ = new yy.BeginEnd({statements:$$[$0-1]}); 
break;
case 611:
 this.$ = new yy.Print({exprs:$$[$0]});
break;
case 612:
 this.$ = new yy.Print({select:$$[$0]});
break;
case 613:
 this.$ = new yy.Require({paths:$$[$0]}); 
break;
case 614:
 this.$ = new yy.Require({plugins:$$[$0]}); 
break;
case 615: case 616:
this.$ = $$[$0].toUpperCase(); 
break;
case 617:
 this.$ = new yy.Echo({expr:$$[$0]}); 
break;
case 622:
 this.$ = new yy.Declare({declares:$$[$0]}); 
break;
case 625:
 this.$ = {variable: $$[$0-1]}; yy.extend(this.$,$$[$0]); 
break;
case 626:
 this.$ = {variable: $$[$0-2]}; yy.extend(this.$,$$[$0]); 
break;
case 627:
 this.$ = {variable: $$[$0-3], expression:$$[$0]}; yy.extend(this.$,$$[$0-2]);
break;
case 628:
 this.$ = {variable: $$[$0-4], expression:$$[$0]}; yy.extend(this.$,$$[$0-2]);
break;
case 629:
 this.$ = new yy.TruncateTable({table:$$[$0]});
break;
case 630:
 
			this.$ = new yy.Merge(); yy.extend(this.$,$$[$0-4]); yy.extend(this.$,$$[$0-3]); 
			yy.extend(this.$,$$[$0-2]);
			yy.extend(this.$,{matches:$$[$0-1]});yy.extend(this.$,$$[$0]);
		
break;
case 631: case 632:
 this.$ = {into: $$[$0]}; 
break;
case 634:
 this.$ = {on:$$[$0]}; 
break;
case 639:
 this.$ = {matched:true, action:$$[$0]} 
break;
case 640:
 this.$ = {matched:true, expr: $$[$0-2], action:$$[$0]} 
break;
case 641:
 this.$ = {delete:true}; 
break;
case 642:
 this.$ = {update:$$[$0]}; 
break;
case 643: case 644:
 this.$ = {matched:false, bytarget: true, action:$$[$0]} 
break;
case 645: case 646:
 this.$ = {matched:false, bytarget: true, expr:$$[$0-2], action:$$[$0]} 
break;
case 647:
 this.$ = {matched:false, bysource: true, action:$$[$0]} 
break;
case 648:
 this.$ = {matched:false, bysource: true, expr:$$[$0-2], action:$$[$0]} 
break;
case 649:
 this.$ = {insert:true, values:$$[$0]}; 
break;
case 650:
 this.$ = {insert:true, values:$$[$0], columns:$$[$0-3]}; 
break;
case 651:
 this.$ = {insert:true, defaultvalues:true}; 
break;
case 652:
 this.$ = {insert:true, defaultvalues:true, columns:$$[$0-3]}; 
break;
case 654:
 this.$ = {output:{columns:$$[$0]}} 
break;
case 655:
 this.$ = {output:{columns:$$[$0-3], intovar: $$[$0], method:$$[$0-1]}} 
break;
case 656:
 this.$ = {output:{columns:$$[$0-2], intotable: $$[$0]}} 
break;
case 657:
 this.$ = {output:{columns:$$[$0-5], intotable: $$[$0-3], intocolumns:$$[$0-1]}} 
break;
case 658:

			this.$ = new yy.CreateVertex({class:$$[$0-3],sharp:$$[$0-2], name:$$[$0-1]}); 
			yy.extend(this.$,$$[$0]); 
		
break;
case 661:
 this.$ = {sets:$$[$0]}; 
break;
case 662:
 this.$ = {content:$$[$0]}; 
break;
case 663:
 this.$ = {select:$$[$0]}; 
break;
case 664:

			this.$ = new yy.CreateEdge({from:$$[$0-3],to:$$[$0-1],name:$$[$0-5]});
			yy.extend(this.$,$$[$0]); 
		
break;
case 665:
 this.$ = new yy.CreateGraph({graph:$$[$0]}); 
break;
case 666:
 this.$ = new yy.CreateGraph({from:$$[$0]}); 
break;
case 669:
 
			this.$ = $$[$0-2]; 
			if($$[$0-1]) this.$.json = new yy.Json({value:$$[$0-1]});
			if($$[$0]) this.$.as = $$[$0];
		
break;
case 670:
 
			this.$ = {source:$$[$0-6], target: $$[$0]};
			if($$[$0-3]) this.$.json = new yy.Json({value:$$[$0-3]});
			if($$[$0-2]) this.$.as = $$[$0-2];
			yy.extend(this.$,$$[$0-4]);
			;
		
break;
case 672:
 this.$ = {vars:$$[$0], method:$$[$0-1]}; 
break;
case 675:
 
			var s3 = $$[$0-1];
			this.$ = {prop:$$[$0-3], sharp:$$[$0-2], name:(typeof s3 == 'undefined')?undefined:s3.substr(1,s3.length-2), class:$$[$0]}; 
		
break;
case 681:
 this.$ = new yy.AddRule({left:$$[$0-2], right:$$[$0]}); 
break;
case 682:
 this.$ = new yy.AddRule({right:$$[$0]}); 
break;
case 685:
 this.$ = new yy.Term({termid:$$[$0]}); 
break;
case 686:
 this.$ = new yy.Term({termid:$$[$0-3],args:$$[$0-1]}); 
break;
case 692: case 706: case 708: case 710: case 714: case 716: case 718: case 720: case 722: case 724:
this.$ = [];
break;
case 693: case 701: case 703: case 707: case 709: case 711: case 715: case 717: case 719: case 721: case 723: case 725:
$$[$0-1].push($$[$0]);
break;
case 700: case 702:
this.$ = [$$[$0]];
break;
}
},
table: [o([8,450,451],$V0,{6:1,7:2,10:3,11:4,15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,4:$V1,5:$V2,12:$V3,47:$V4,65:$V5,81:$V6,99:$V7,120:$V8,130:$V9,163:$Va,233:$Vb,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),{1:[3]},{8:[1,97],9:98,450:$VE,451:$VF},o($VG,[2,5]),o($VG,[2,6]),o($VH,[2,9]),o($VG,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,10:101,4:$V1,5:$V2,13:[1,102],47:$V4,65:$V5,81:$V6,99:$V7,120:$V8,130:$V9,163:$Va,233:$Vb,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),o($VH,[2,11]),o($VH,[2,12]),o($VH,[2,13]),o($VH,[2,14]),o($VH,[2,15]),o($VH,[2,16]),o($VH,[2,17]),o($VH,[2,18]),o($VH,[2,19]),o($VH,[2,20]),o($VH,[2,21]),o($VH,[2,22]),o($VH,[2,23]),o($VH,[2,24]),o($VH,[2,25]),o($VH,[2,26]),o($VH,[2,27]),o($VH,[2,28]),o($VH,[2,29]),o($VH,[2,30]),o($VH,[2,31]),o($VH,[2,32]),o($VH,[2,33]),o($VH,[2,34]),o($VH,[2,35]),o($VH,[2,36]),o($VH,[2,37]),o($VH,[2,38]),o($VH,[2,39]),o($VH,[2,40]),o($VH,[2,41]),o($VH,[2,42]),o($VH,[2,43]),o($VH,[2,44]),o($VH,[2,45]),o($VH,[2,46]),o($VH,[2,47]),o($VH,[2,48]),o($VH,[2,49]),o($VH,[2,50]),o($VH,[2,51]),o($VH,[2,52]),o($VH,[2,53]),o($VH,[2,54]),o($VH,[2,55]),o($VH,[2,56]),o($VH,[2,57]),o($VH,[2,58]),o($VH,[2,59]),{304:[1,103]},{3:104,4:$V1,5:$V2},o($VI,[2,442],{3:106,299:110,4:$V1,5:$V2,109:$VJ,110:$VK,161:[1,108],167:[1,107],308:[1,113],352:[1,105],421:[1,109]}),{119:$VL,398:114,399:115},{157:[1,117]},{352:[1,118]},{3:120,4:$V1,5:$V2,105:[1,125],167:[1,121],304:[1,124],345:122,352:[1,119],357:[1,123]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:126,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vi1,[2,413],{292:181,172:[1,182]}),{3:193,4:$V1,5:$V2,70:$Vj1,107:$Vk1,116:$VQ,118:187,119:$VR,126:$VS,155:$VW,172:[1,185],173:188,174:190,175:189,176:191,183:184,186:192,260:$Vd1,367:168,368:$Vg1,372:$Vh1,402:183},{304:[1,195]},o($Vl1,[2,690],{73:196,84:197,85:[1,198]}),o($Vm1,[2,692],{82:199}),{3:203,4:$V1,5:$V2,164:[1,201],167:[1,204],298:[1,200],304:[1,205],352:[1,202]},{304:[1,206]},{3:209,4:$V1,5:$V2,66:207,68:208},o([264,450,451],$V0,{10:3,11:4,15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,7:211,4:$V1,5:$V2,12:$V3,47:$V4,65:$V5,81:$V6,99:$V7,120:$V8,130:$V9,163:$Va,233:$Vb,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,384:[1,210],385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),{384:[1,212]},{384:[1,213]},{3:215,4:$V1,5:$V2,352:[1,214]},{3:217,4:$V1,5:$V2,173:216},o($VH,[2,552],{91:218,107:$VO,256:$Va1}),o($Vn1,[2,284]),{91:219,107:$VO,256:$Va1},{3:231,4:$V1,5:$V2,91:225,106:$VN,107:[1,222],116:$VQ,118:220,119:$Vo1,126:$VS,155:$VW,170:224,174:229,175:228,225:226,226:227,232:$Vp1,238:221,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:232,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VH,[2,608]),o($VH,[2,609]),{3:147,4:$V1,5:$V2,36:234,51:144,70:$VM,72:67,81:$V6,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:233,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,158:92,163:$Va,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:241,4:$V1,5:$V2,91:238,107:$VO,256:$Va1,393:236,394:237,395:239,396:$Vq1},{3:242,4:$V1,5:$V2,116:$Vr1,119:$Vs1,379:243},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:246,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{447:[1,247]},{3:93,4:$V1,5:$V2,446:249,448:248},{3:231,4:$V1,5:$V2,174:250},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:251,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vt1,$Vu1,{160:255,138:[1,254],159:[1,252],161:[1,253],169:$Vv1}),o($Vw1,[2,685],{70:[1,257]}),o($Vx1,[2,130],{123:[1,258],124:[1,259],164:[1,260],165:[1,261],166:[1,262],167:[1,263],168:[1,264]}),o($Vy1,[2,1]),o($Vy1,[2,2]),{1:[2,3]},o($VG,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,10:265,4:$V1,5:$V2,47:$V4,65:$V5,81:$V6,99:$V7,120:$V8,130:$V9,163:$Va,233:$Vb,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),o($Vz1,[2,688]),o($Vz1,[2,689]),o($VG,[2,7]),{14:[1,266]},{3:217,4:$V1,5:$V2,173:267},{352:[1,268]},o($Vi1,$VA1,{301:269,130:$VB1}),{352:[1,271]},{3:272,4:$V1,5:$V2},{167:[1,273]},o([8,67,69,107,112,114,126,264,268,368,372,450,451],$VC1,{422:274,423:276,424:277,427:278,3:279,434:280,431:281,379:282,4:$V1,5:$V2,116:$Vr1,119:$Vs1,157:[1,275]}),{105:[1,286],300:283,304:[1,285],357:[1,284]},{91:288,107:$VO,157:[2,770],256:$Va1,420:287},o($VD1,[2,764],{414:289,3:290,4:$V1,5:$V2}),o($VI,[2,443]),o($VH,[2,622],{67:[1,291]}),o($VE1,[2,623]),{3:292,4:$V1,5:$V2},{3:217,4:$V1,5:$V2,173:293},{3:294,4:$V1,5:$V2},o($Vi1,$VF1,{346:295,130:$VG1}),{352:[1,297]},{3:298,4:$V1,5:$V2},o($Vi1,$VF1,{346:299,130:$VG1}),o($Vi1,$VF1,{346:300,130:$VG1}),o($VH1,[2,758]),o($VH1,[2,759]),o($VH,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,10:301,278:322,4:$V1,5:$V2,47:$V4,65:$V5,81:$V6,90:$VI1,97:$VJ1,98:$VK1,99:$VL1,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,120:$V8,128:$VR1,130:$V9,144:$VS1,145:$VT1,153:$VU1,154:$VV1,163:$Va,233:$Vb,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),o($Vn1,[2,263]),o($Vn1,[2,264]),o($Vn1,[2,265]),o($Vn1,[2,266]),o($Vn1,[2,267]),o($Vn1,[2,268]),o($Vn1,[2,269]),o($Vn1,[2,270]),o($Vn1,[2,271]),o($Vn1,[2,272]),o($Vn1,[2,273]),o($Vn1,[2,274]),o($Vn1,[2,275]),o($Vn1,[2,276]),o($Vn1,[2,277]),o($Vn1,[2,278]),{3:147,4:$V1,5:$V2,23:336,24:335,33:332,36:331,51:144,70:$VM,72:67,81:$V6,89:130,91:134,100:334,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,158:92,163:$Va,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,231:333,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,291:$Ve,298:[1,337],367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,282]),o($Vn1,[2,283]),{70:[1,338]},o([4,5,8,47,65,67,69,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$V82,{70:$V92,117:[1,340]}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:341,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:342,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:343,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:344,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,258]),o([4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,202,203,205,212,215,216,218,220,232,233,234,235,237,244,245,246,247,248,249,250,251,252,254,255,256,257,258,260,261,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,324,325,344,347,348,351,353,355,356,364,365,366,368,372,374,376,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451,452],[2,320]),o($Va2,[2,321]),o($Va2,[2,322]),o($Va2,$Vb2),o($Va2,[2,324]),o([4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,257,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,324,325,344,347,348,351,353,355,356,364,365,366,368,372,374,376,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,325]),{3:346,4:$V1,5:$V2,106:[1,347],259:345},{3:348,4:$V1,5:$V2},o($Va2,[2,330]),o($Va2,[2,331]),{3:349,4:$V1,5:$V2,70:$Vc2,91:351,106:$VN,107:$VO,116:$VQ,126:$VS,155:$VW,170:352,175:354,225:353,254:$V81,255:$V91,256:$Va1,260:$Vd1,367:355,372:$Vh1},{70:[1,356]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:357,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,262:358,265:359,266:$Vd2,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{70:[1,361]},{70:[1,362]},o($Ve2,[2,563]),{3:377,4:$V1,5:$V2,70:$Vf2,89:372,91:370,106:$VN,107:$VO,116:$VQ,118:367,119:$Vo1,126:$VS,155:$VW,170:369,174:375,175:374,225:371,226:373,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1,367:168,368:$Vg1,369:363,370:366,371:368,372:$Vh1,375:364,376:[1,365]},{3:378,4:$V1,5:$V2,174:379},{70:[2,307]},{70:[2,308]},{70:[2,309]},{70:[2,310]},{70:[2,311]},{70:[2,312]},{70:[2,313]},{70:[2,314]},{70:[2,315]},{3:385,4:$V1,5:$V2,106:$Vg2,107:$Vh2,373:380,374:[1,381],377:382},{3:217,4:$V1,5:$V2,173:386},o($Vi1,[2,414]),{203:[1,388],403:387},{203:[2,631]},{3:193,4:$V1,5:$V2,70:$Vj1,107:$Vk1,116:$VQ,118:187,119:$VR,126:$VS,155:$VW,173:188,174:190,175:189,176:191,183:389,186:192,260:$Vd1,367:168,368:$Vg1,372:$Vh1},{36:390,72:67,81:$V6,158:92,163:$Va},o($Vi2,[2,730],{184:391,69:[1,392]}),o($Vj2,[2,163],{3:393,4:$V1,5:$V2,69:[1,394]}),o($Vj2,[2,166],{3:395,4:$V1,5:$V2,69:[1,396]}),o($Vj2,[2,167],{3:397,4:$V1,5:$V2,69:[1,398]}),o($Vj2,[2,170],{3:399,4:$V1,5:$V2,69:[1,400]}),o($Vj2,[2,173],{3:401,4:$V1,5:$V2,69:[1,402]}),o([4,5,8,65,67,69,71,93,104,136,142,143,157,180,182,194,195,196,197,198,199,200,201,202,203,205,218,264,268,450,451],$Vk2,{70:$V92,117:$Vl2}),o([4,5,8,65,67,69,71,93,104,136,142,143,180,182,194,195,196,197,198,199,200,201,202,203,205,218,264,268,450,451],[2,176]),{3:217,4:$V1,5:$V2,173:404},o($Vm2,$Vn2,{74:405,172:$Vo2}),o($Vl1,[2,691]),o($Vp2,[2,696],{86:407,164:[1,408]}),o([8,71,157,264,268,450,451],$Vn2,{367:168,74:409,92:410,3:411,118:433,132:443,134:444,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,90:$Vt2,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,172:$Vo2,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,368:$Vg1,372:$Vh1}),{304:[1,457]},{157:[1,458]},o($VH,[2,531],{90:[1,459]}),{352:[1,460]},{157:[1,461]},o($VH,[2,535],{90:[1,462],157:[1,463]}),{3:217,4:$V1,5:$V2,173:464},{36:465,67:[1,466],72:67,81:$V6,158:92,163:$Va},o($V43,[2,62]),{69:[1,467]},o($VH,[2,603]),{9:98,264:[1,468],450:$VE,451:$VF},o($VH,[2,601]),o($VH,[2,602]),{3:469,4:$V1,5:$V2},o($VH,[2,524]),{120:[1,470]},o([8,67,69,70,71,81,104,120,122,123,128,157,161,163,202,257,264,268,294,307,319,320,324,325,344,348,349,350,450,451],$Vk2,{117:$Vl2}),o($VH,[2,551]),o($VH,[2,554]),o($VH,[2,555]),o($VH,[2,556]),o($VH,$Vb2,{67:[1,471]}),{70:$Vc2,91:351,106:$VN,107:$VO,116:$VQ,126:$VS,155:$VW,170:352,175:354,225:353,254:$V81,255:$V91,256:$Va1,260:$Vd1,367:355,372:$Vh1},o($V53,[2,291]),o($V53,[2,292]),o($V53,[2,293]),o($V53,[2,294]),o($V53,[2,295]),o($V53,[2,296]),o($V53,[2,297]),{70:$V92},o($VH,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,278:322,10:472,4:$V1,5:$V2,47:$V4,65:$V5,81:$V6,90:$VI1,97:$VJ1,98:$VK1,99:$VL1,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,120:$V8,128:$VR1,130:$V9,144:$VS1,145:$VT1,153:$VU1,154:$VV1,163:$Va,233:$Vb,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),o($VH,[2,611],{67:$V63}),o($VH,[2,612]),o($V73,[2,318],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($VH,[2,613],{67:[1,475]}),o($VH,[2,614],{67:[1,476]}),o($VE1,[2,619]),o($VE1,[2,621]),o($VE1,[2,615]),o($VE1,[2,616]),{202:[1,478],378:477,382:[1,479]},{3:480,4:$V1,5:$V2},o($Vi1,[2,592]),o($Vi1,[2,593]),o($VH,[2,553],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{3:93,4:$V1,5:$V2,446:249,448:481},o($VH,[2,682],{67:$V93}),o($V73,[2,684]),o($VH,[2,687]),o($VH,[2,617],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($Va3,$Vu1,{160:483,169:$Vv1}),o($Va3,$Vu1,{160:484,169:$Vv1}),o($Va3,$Vu1,{160:485,169:$Vv1}),o($Vb3,[2,726],{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,162:486,148:487,221:488,100:489,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),{70:[1,491],106:$VN,170:490},{3:93,4:$V1,5:$V2,446:249,448:492},o($Vx1,[2,131]),o($Vx1,[2,132]),o($Vx1,[2,133]),o($Vx1,[2,134]),o($Vx1,[2,135]),o($Vx1,[2,136]),o($Vx1,[2,137]),o($VG,[2,4]),o($VG,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,10:493,4:$V1,5:$V2,47:$V4,65:$V5,81:$V6,99:$V7,120:$V8,130:$V9,163:$Va,233:$Vb,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),{344:[1,497],348:[1,494],349:[1,495],350:[1,496]},{3:498,4:$V1,5:$V2},{3:499,4:$V1,5:$V2},{128:[1,500]},o($Vc3,$VA1,{301:501,130:$VB1}),{202:[1,502]},{3:503,4:$V1,5:$V2},o($VH,[2,665],{67:$Vd3}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:505,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($V73,[2,668]),o($Ve3,[2,772],{367:168,425:506,118:507,114:[2,776],119:$Vo1,368:$Vg1,372:$Vh1}),{114:[1,508]},o($Vf3,$Vg3,{70:[1,509]}),o($Vh3,[2,786],{435:510,439:511,112:[1,512]}),{114:[2,777]},{3:513,4:$V1,5:$V2},o($Vi1,$VA1,{301:514,130:$VB1}),o($Vi1,$VA1,{301:515,130:$VB1}),o($VH1,[2,433]),o($VH1,[2,434]),{157:[1,516]},{157:[2,771]},o($Vi3,[2,766],{415:517,418:518,112:[1,519]}),o($VD1,[2,765]),{119:$VL,399:520},{4:$Vj3,69:[1,522],236:521,338:$Vk3},o($VH,[2,407],{104:[1,525]}),o($VH,[2,516]),{3:526,4:$V1,5:$V2},{258:[1,527]},o($Vc3,$VF1,{346:528,130:$VG1}),o($VH,[2,530]),{3:217,4:$V1,5:$V2,173:529},{3:217,4:$V1,5:$V2,173:530},o($VG,[2,605],{387:531,268:[1,532]}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:533,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:534,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:535,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:536,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:537,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:538,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:539,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:540,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:541,4:$V1,5:$V2,70:[1,543],106:$VN,170:542,174:544},{3:545,4:$V1,5:$V2,70:[1,547],106:$VN,170:546,174:548},o($Vl3,[2,391],{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:549,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),o($Vl3,[2,392],{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:550,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),o($Vl3,[2,393],{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:551,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),o($Vl3,[2,394],{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:552,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),o($Vl3,$Vm3,{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:553,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:554,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:555,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vl3,[2,396],{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:556,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:557,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:558,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{138:[1,560],140:[1,562],279:559,286:[1,561]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:563,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:564,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:377,4:$V1,5:$V2,70:[1,565],89:568,119:$Vn3,174:569,176:567,281:566},{280:[1,571]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:572,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:573,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:574,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{4:$Vj3,236:575,338:$Vk3},{71:[1,576]},{71:[1,577]},{71:[1,578]},{71:[1,579],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[2,738]},{71:[2,739]},{109:$VJ,110:$VK},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:580,126:$VS,128:$VT,132:146,138:[1,582],153:$VU,154:$VV,155:$VW,159:[1,581],170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Va3,[2,742],{253:583,453:585,71:[1,584],138:[1,587],159:[1,586]}),{3:588,4:$V1,5:$V2,123:$Vo3,154:[1,590]},o([4,5,8,47,65,67,69,70,71,81,85,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,271,272,273,274,275,276,277,280,282,283,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,369],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,284:$V62}),o($Vp3,[2,370],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,154:$VV1}),o($Vp3,[2,371],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,154:$VV1}),o($Vn1,[2,372],{278:322}),o($Va2,[2,328]),o($Va2,[2,744]),o($Va2,[2,745]),o($Va2,[2,329]),o([4,5,8,47,65,67,69,70,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,202,203,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,326]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:591,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Ve2,[2,559]),o($Ve2,[2,560]),o($Ve2,[2,561]),o($Ve2,[2,562]),o($Ve2,[2,564]),{36:592,72:67,81:$V6,158:92,163:$Va},{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,262:593,265:359,266:$Vd2,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{263:594,264:$Vq3,265:595,266:$Vd2,268:$Vr3},o($Vs3,[2,335]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:597,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:598,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{4:$Vj3,236:599,338:$Vk3},o($Ve2,[2,565]),{67:[1,601],376:[1,600]},o($Ve2,[2,581]),o($Vt3,[2,588]),o($Vu3,[2,566]),o($Vu3,[2,567]),o($Vu3,[2,568]),o($Vu3,[2,569]),o($Vu3,[2,570]),o($Vu3,[2,571]),o($Vu3,[2,572]),o($Vu3,[2,573]),o($Vu3,[2,574]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:602,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o([4,5,8,47,65,67,69,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,374,376,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],$V82,{70:$V92,117:$Vv3}),o($Vw3,[2,285],{70:$V92}),o($Vn1,[2,286]),{67:[1,605],374:[1,604]},o($Ve2,[2,578]),o($Vx3,[2,583]),{126:[1,606]},{126:[1,607]},{126:[1,608]},{36:612,70:[1,611],72:67,81:$V6,123:[1,609],158:92,163:$Va,294:[1,610]},{202:[1,614],404:613},{3:193,4:$V1,5:$V2,70:$Vj1,107:$Vk1,116:$VQ,118:187,119:$VR,126:$VS,155:$VW,173:188,174:190,175:189,176:191,183:615,186:192,260:$Vd1,367:168,368:$Vg1,372:$Vh1},{203:[2,632]},{71:[1,616]},o($Vj2,[2,732],{185:617,3:618,4:$V1,5:$V2}),o($Vi2,[2,731]),o($Vj2,[2,161]),{3:619,4:$V1,5:$V2},o($Vj2,[2,164]),{3:620,4:$V1,5:$V2},o($Vj2,[2,168]),{3:621,4:$V1,5:$V2},o($Vj2,[2,171]),{3:622,4:$V1,5:$V2},o($Vj2,[2,174]),{3:623,4:$V1,5:$V2},{3:624,4:$V1,5:$V2},{122:[1,625]},o($Vy3,[2,150],{75:626,157:[1,627]}),{3:193,4:$V1,5:$V2,107:[1,632],116:$VQ,119:[1,633],126:$VS,155:$VW,173:628,174:629,175:630,176:631,260:$Vd1},{3:638,4:$V1,5:$V2,87:634,88:635,89:636,90:$Vz3},o($Vp2,[2,697]),o($VA3,[2,694],{83:639,156:640,157:[1,641]}),o($Vm1,[2,693],{127:642,153:$VB3,154:$VC3,155:$VD3}),o([4,5,8,65,67,69,71,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,172,244,245,246,247,248,249,250,251,252,264,268,368,372,450,451],[2,71],{70:[1,646]}),{94:[1,647]},{3:648,4:$V1,5:$V2},o($VE3,[2,75]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:649,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:650,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,90:$Vt2,92:652,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,101:651,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{70:[1,653]},{70:[1,654]},{70:[1,655]},o($VE3,[2,83]),o($VE3,[2,84]),o($VE3,[2,85]),o($VE3,[2,86]),o($VE3,[2,87]),o($VE3,[2,88]),{3:656,4:$V1,5:$V2},{3:657,4:$V1,5:$V2,108:[1,658]},o($VE3,[2,92]),o($VE3,[2,93]),o($VE3,[2,94]),{117:[1,659]},o($VE3,[2,96]),{3:660,4:$V1,5:$V2,70:$Vc2,91:351,106:$VN,107:$VO,116:$VQ,126:$VS,155:$VW,170:352,175:354,225:353,254:$V81,255:$V91,256:$Va1,260:$Vd1,367:355,372:$Vh1},{119:[1,661]},{70:[1,662]},{119:[1,663]},o($VE3,[2,101]),{70:[1,664]},{3:665,4:$V1,5:$V2},{70:[1,666]},{70:[1,667]},{70:[1,668]},{70:[1,669]},{70:[1,670],138:[1,671]},{70:[1,672]},{70:[1,673]},{70:[1,674]},{70:[1,675]},{70:[1,676]},{70:[1,677]},{70:[1,678]},{70:[1,679]},{70:[1,680]},{70:[2,712]},{70:[2,713]},{3:217,4:$V1,5:$V2,173:681},{3:217,4:$V1,5:$V2,173:682},{91:683,107:$VO,256:$Va1},o($VH,[2,533],{90:[1,684]}),{3:217,4:$V1,5:$V2,173:685},{91:686,107:$VO,256:$Va1},{3:687,4:$V1,5:$V2},o($VH,[2,629]),o($VH,[2,60]),{3:209,4:$V1,5:$V2,68:688},{70:[1,689]},o($VH,[2,610]),o($VH,[2,523]),{3:638,4:$V1,5:$V2,89:692,116:$VF3,119:$VG3,121:690,288:691,289:693},{118:696,119:$Vo1,367:168,368:$Vg1,372:$Vh1},o($VH,[2,607]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:697,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vl3,$Vm3,{223:127,174:128,224:129,89:130,222:131,170:132,225:133,91:134,226:135,175:136,176:137,227:138,228:139,229:140,118:141,230:142,51:144,132:146,3:147,367:168,100:698,4:$V1,5:$V2,70:$VM,106:$VN,107:$VO,112:$VP,116:$VQ,119:$VR,126:$VS,128:$VT,153:$VU,154:$VV,155:$VW,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,368:$Vg1,372:$Vh1}),{91:699,107:$VO,256:$Va1},{3:241,4:$V1,5:$V2,395:700,396:$Vq1},o($VH,[2,589]),o($VH,[2,599]),o($VH,[2,600]),{97:[1,703],99:[1,701],380:702},o($VH,[2,681],{67:$V93}),{3:93,4:$V1,5:$V2,446:704},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:489,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,148:705,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,221:488,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:489,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,148:706,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,221:488,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:489,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,148:707,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,221:488,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vb3,[2,129]),o($Vb3,[2,727],{67:$VH3}),o($VI3,[2,248]),o($VI3,[2,255],{278:322,3:710,91:712,4:$V1,5:$V2,69:[1,709],90:$VI1,97:$VJ1,98:$VK1,99:$V83,106:[1,711],107:$VO,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,256:$Va1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($Vt1,[2,728],{171:713,452:[1,714]}),{106:$VN,170:715},{67:$V93,71:[1,716]},o($VG,[2,8]),{122:[1,717],164:[1,718]},{164:[1,719]},{164:[1,720]},{164:[1,721]},o($VH,[2,512],{69:[1,723],70:[1,722]}),o($VH,[2,517]),{258:[1,724]},{3:725,4:$V1,5:$V2,91:726,107:$VO,256:$Va1},{3:217,4:$V1,5:$V2,173:727},{202:[1,728]},o([8,67,69,71,107,112,114,126,264,268,368,372,450,451],$VC1,{424:277,427:278,3:279,434:280,431:281,379:282,423:729,4:$V1,5:$V2,116:$Vr1,119:$Vs1}),o($VH,[2,666],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($V73,[2,774],{426:730,432:731,69:$VJ3}),o($Ve3,[2,773]),o([69,107,112,114,119,126,368,372],$VC1,{434:280,424:733,3:734,4:$V1,5:$V2}),o([67,69,71,107,112,114,126,368,372],$VC1,{423:276,424:277,427:278,3:279,434:280,431:281,379:282,422:735,4:$V1,5:$V2,116:$Vr1,119:$Vs1}),o($VK3,[2,788],{436:736,107:[1,737]}),o($Vh3,[2,787]),{3:738,4:$V1,5:$V2,106:[1,739]},o($VL3,[2,672]),{3:217,4:$V1,5:$V2,173:740},{3:217,4:$V1,5:$V2,173:741},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:742,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VM3,[2,768],{416:743,91:744,107:$VO,256:$Va1}),o($Vi3,[2,767]),{3:745,4:$V1,5:$V2},o($VE1,[2,624]),o($VE1,[2,625],{99:[1,746]}),{4:$Vj3,236:747,338:$Vk3},o([5,8,47,65,67,69,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,257,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,324,325,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,482],{4:[1,749],70:[1,748]}),{70:[1,750]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:751,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VH,[2,525]),o($Vc3,[2,505]),{3:752,4:$V1,5:$V2,91:753,107:$VO,256:$Va1},o($VH,[2,503]),o($VH,[2,550]),o($VH,[2,604]),o($VH,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,48:39,49:40,50:41,51:42,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,72:67,446:88,158:92,3:93,10:754,4:$V1,5:$V2,47:$V4,65:$V5,81:$V6,99:$V7,120:$V8,130:$V9,163:$Va,233:$Vb,287:$Vc,290:$Vd,291:$Ve,298:$Vf,344:$Vg,347:$Vh,348:$Vi,351:$Vj,353:$Vk,355:$Vl,356:$Vm,364:$Vn,365:$Vo,366:$Vp,383:$Vq,385:$Vr,386:$Vs,388:$Vt,389:$Vu,390:$Vv,391:$Vw,392:$Vx,396:$Vy,397:$Vz,400:$VA,401:$VB,447:$VC,449:$VD}),o($VN3,[2,339],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,153:$VU1,154:$VV1,270:$VX1}),o($VN3,[2,340],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,153:$VU1,154:$VV1,270:$VX1}),o($Vp3,[2,341],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,154:$VV1}),o($Vp3,[2,342],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,154:$VV1}),o($VO3,[2,343],{278:322,97:$VJ1,98:$VK1,111:$VN1}),o($VO3,[2,344],{278:322,97:$VJ1,98:$VK1,111:$VN1}),o($VO3,[2,345],{278:322,97:$VJ1,98:$VK1,111:$VN1}),o([4,5,8,47,65,67,69,70,71,81,85,90,93,98,99,104,105,106,107,108,109,110,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,346],{278:322,97:$VJ1,111:$VN1}),o($Vw3,[2,347],{70:$V92}),o($Vn1,[2,348]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:755,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,350]),o($Vw3,[2,351],{70:$V92}),o($Vn1,[2,352]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:756,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,354]),o($VP3,[2,355],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,356],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,357],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,358],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o([4,5,8,47,65,81,99,114,115,120,130,144,145,163,233,264,268,271,272,273,274,275,276,277,282,283,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,383,385,386,388,389,390,391,392,396,397,400,401,447,449,450,451],$VQ3,{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,360],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,361],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,362],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,363],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VP3,[2,364],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),{70:[1,757]},{70:[2,397]},{70:[2,398]},{70:[2,399]},o($VR3,[2,367],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,284:$V62}),o([4,5,8,47,65,67,69,70,71,81,85,93,104,105,106,107,109,110,112,116,117,119,120,122,123,124,126,130,136,138,140,142,143,145,146,147,149,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,368],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62}),{3:147,4:$V1,5:$V2,36:758,51:144,70:$VM,71:[1,760],72:67,81:$V6,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:759,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,158:92,163:$Va,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,380]),o($Vn1,[2,382]),o($Vn1,[2,388]),o($Vn1,[2,389]),{3:349,4:$V1,5:$V2,70:[1,761]},{3:377,4:$V1,5:$V2,70:[1,762],89:568,119:$Vn3,174:569,176:764,281:763},o($VR3,[2,384],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,284:$V62}),o($VR3,[2,385],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,284:$V62}),o([4,5,8,47,65,67,69,70,71,81,85,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,264,266,267,268,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,298,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,386],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,153:$VU1,154:$VV1,269:$VW1,270:$VX1}),o($Vn1,[2,387]),o($Vn1,[2,279]),o($Vn1,[2,280]),o($Vn1,[2,281]),o($Vn1,[2,373]),{67:$V63,71:[1,765]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:766,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:767,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:768,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Va2,[2,317]),o($Va3,[2,743]),o($Va3,[2,740]),o($Va3,[2,741]),o($Vn1,$VS3),o($VT3,[2,261]),o($Vn1,[2,257]),{71:[1,770],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[1,771]},{263:772,264:$Vq3,265:595,266:$Vd2,268:$Vr3},{264:[1,773]},o($Vs3,[2,334]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:774,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,267:[1,775],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{69:[1,776],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{67:[1,777]},o($Ve2,[2,579]),{3:377,4:$V1,5:$V2,70:$Vf2,89:372,91:370,106:$VN,107:$VO,116:$VQ,118:367,119:$Vo1,126:$VS,155:$VW,170:369,174:375,175:374,225:371,226:373,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1,367:168,368:$Vg1,370:779,371:368,372:$Vh1,376:[1,778]},{71:[1,780],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{3:781,4:$V1,5:$V2,123:$Vo3},o($Ve2,[2,576]),{3:385,4:$V1,5:$V2,106:$Vg2,107:$Vh2,374:[1,782],377:783},{3:377,4:$V1,5:$V2,70:$Vf2,89:372,91:370,106:$VN,107:$VO,116:$VQ,118:367,119:$Vo1,126:$VS,155:$VW,170:369,174:375,175:374,225:371,226:373,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1,367:168,368:$Vg1,370:784,371:368,372:$Vh1},{3:377,4:$V1,5:$V2,70:$Vf2,89:372,91:370,106:$VN,107:$VO,116:$VQ,118:367,119:$Vo1,126:$VS,155:$VW,170:369,174:375,175:374,225:371,226:373,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1,367:168,368:$Vg1,370:785,371:368,372:$Vh1},{3:377,4:$V1,5:$V2,70:$Vf2,89:372,91:370,106:$VN,107:$VO,116:$VQ,118:367,119:$Vo1,126:$VS,155:$VW,170:369,174:375,175:374,225:371,226:373,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1,367:168,368:$Vg1,370:786,371:368,372:$Vh1},{70:$VU3,116:$VQ,118:789,119:$Vo1,126:$VS,155:$VW,175:790,260:$Vd1,293:787,367:168,368:$Vg1,372:$Vh1},{123:[1,791]},{3:638,4:$V1,5:$V2,89:793,204:792},o($VV3,[2,411]),{266:$VW3,405:794,407:795,408:796},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:798,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{202:[2,633]},o($Vj2,[2,159],{3:799,4:$V1,5:$V2,69:[1,800]}),o($Vj2,[2,160]),o($Vj2,[2,733]),o($Vj2,[2,162]),o($Vj2,[2,165]),o($Vj2,[2,169]),o($Vj2,[2,172]),o($Vj2,[2,175]),o([4,5,8,65,67,69,70,71,81,93,104,120,122,123,128,136,142,143,157,161,163,180,182,194,195,196,197,198,199,200,201,202,203,205,218,257,264,268,294,307,319,320,324,325,344,348,349,350,450,451],[2,177]),{3:801,4:$V1,5:$V2},o($VX3,[2,214],{76:802,104:[1,803]}),{3:193,4:$V1,5:$V2,70:[1,805],107:$Vk1,116:$VQ,118:187,119:$VR,126:$VS,155:$VW,173:188,174:190,175:189,176:191,177:804,183:806,186:192,260:$Vd1,367:168,368:$Vg1,372:$Vh1},o($Vm2,[2,142]),o($Vm2,[2,143]),o($Vm2,[2,144]),o($Vm2,[2,145]),o($Vm2,[2,146]),{3:349,4:$V1,5:$V2},o($Vl1,[2,66],{67:[1,807]}),o($VY3,[2,68]),o($VY3,[2,69]),{91:808,107:$VO,256:$Va1},o([8,65,67,71,93,99,104,136,142,143,157,172,180,182,194,195,196,197,198,199,200,201,205,218,264,268,450,451],$V82,{117:$Vv3}),o($VA3,[2,65]),o($VA3,[2,695]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:809,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VE3,[2,104]),o($VE3,[2,122]),o($VE3,[2,123]),o($VE3,[2,124]),{3:147,4:$V1,5:$V2,51:144,70:$VM,71:[2,704],89:130,91:134,100:235,103:810,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:811,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{70:[1,812]},o($VE3,[2,74]),o([4,5,8,65,67,69,70,71,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,172,244,245,246,247,248,249,250,251,252,264,268,368,372,450,451],[2,76],{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o([4,5,8,65,67,69,70,71,90,93,99,104,105,106,107,109,110,112,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,155,157,159,161,172,244,245,246,247,248,249,250,251,252,264,268,368,372,450,451],[2,77],{278:322,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,813],90:$Vt2,92:814,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},o($VZ3,[2,700],{127:642,153:$VB3,154:$VC3,155:$VD3}),{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,90:$Vt2,92:816,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,102:815,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:817,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:818,4:$V1,5:$V2},o($VE3,[2,89]),o($VE3,[2,90]),o($VE3,[2,91]),o($VE3,[2,95]),o($VE3,[2,97]),{3:819,4:$V1,5:$V2},{3:638,4:$V1,5:$V2,89:692,116:$VF3,119:$VG3,121:820,288:691,289:693},{3:821,4:$V1,5:$V2},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:822,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VE3,[2,103]),o($VZ3,[2,706],{129:823}),o($VZ3,[2,708],{131:824}),o($VZ3,[2,710],{133:825}),o($VZ3,[2,714],{135:826}),o($V_3,$V$3,{137:827,152:828}),{70:[1,829]},o($VZ3,[2,716],{139:830}),o($VZ3,[2,718],{141:831}),o($V_3,$V$3,{152:828,137:832}),o($V_3,$V$3,{152:828,137:833}),o($V_3,$V$3,{152:828,137:834}),o($V_3,$V$3,{152:828,137:835}),{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,90:$Vt2,92:836,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:489,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,148:837,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,221:488,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($V04,[2,720],{150:838}),o($VH,[2,543],{157:[1,839]}),o($VH,[2,539],{157:[1,840]}),o($VH,[2,532]),{91:841,107:$VO,256:$Va1},o($VH,[2,541],{157:[1,842]}),o($VH,[2,536]),o($VH,[2,537],{90:[1,843]}),o($V43,[2,61]),{36:844,72:67,81:$V6,158:92,163:$Va},o($VH,[2,401],{67:$V14,104:[1,845]}),o($V24,[2,402]),{99:[1,847]},{3:848,4:$V1,5:$V2},o($Vi1,[2,746]),o($Vi1,[2,747]),o($VH,[2,557]),o($V73,[2,319],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($VP3,$VQ3,{278:322,90:$VI1,97:$VJ1,98:$VK1,108:$VM1,111:$VN1,113:$VO1,128:$VR1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,280:$V32,284:$V62}),o($VE1,[2,618]),o($VE1,[2,620]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:849,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{97:[1,851],99:[1,850]},{3:853,4:$V1,5:$V2,70:$V34,106:$V44,381:852},o($V73,[2,683]),o($Vb3,[2,126],{67:$VH3}),o($Vb3,[2,127],{67:$VH3}),o($Vb3,[2,128],{67:$VH3}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:489,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,221:856,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:857,4:$V1,5:$V2,91:859,106:[1,858],107:$VO,256:$Va1},o($VI3,[2,250]),o($VI3,[2,252]),o($VI3,[2,254]),o($Vt1,[2,138]),o($Vt1,[2,729]),{71:[1,860]},o($Vw1,[2,686]),{3:861,4:$V1,5:$V2},{3:862,4:$V1,5:$V2},{3:864,4:$V1,5:$V2,334:863},{3:864,4:$V1,5:$V2,334:865},{3:866,4:$V1,5:$V2},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:867,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:868,4:$V1,5:$V2},o($Vc3,[2,445]),o($VH,$V54,{354:869,69:$V64,70:[1,870]}),o($VH,$V54,{354:872,69:$V64}),{70:[1,873]},{3:217,4:$V1,5:$V2,173:874},o($V73,[2,667]),o($V73,[2,669]),o($V73,[2,775]),{116:$Vr1,119:$Vs1,379:875},o($V74,[2,778],{367:168,428:876,118:877,119:$Vo1,368:$Vg1,372:$Vh1}),o($Vf3,$Vg3),{67:$Vd3,71:[1,878]},o($V84,[2,790],{437:879,438:880,126:[1,881]}),o($VK3,[2,789]),o($Vh3,[2,677]),o($Vh3,[2,678]),o($VH,[2,432],{70:[1,882]}),{69:[1,884],70:[1,883]},{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,122:[1,885],128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},o($VV3,$V94,{72:67,158:92,417:886,36:889,81:$V6,120:$Va4,163:$Va,419:$Vb4}),o($VM3,[2,769]),o($Vi3,[2,659]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:890,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VE1,[2,626],{99:[1,891]}),{106:$Vc4,247:$Vd4,337:892},o([4,5,8,47,65,67,69,71,81,85,90,93,97,98,99,104,105,106,107,108,109,110,111,112,113,114,115,116,117,119,120,122,123,124,126,128,130,136,138,140,142,143,144,145,146,147,149,153,154,155,157,159,161,163,172,180,182,194,195,196,197,198,199,200,201,205,212,215,216,218,233,244,245,246,247,248,249,250,251,252,256,257,264,266,267,268,269,270,271,272,273,274,275,276,277,280,282,283,284,285,287,290,291,294,298,307,319,320,324,325,344,347,348,351,353,355,356,364,365,366,368,372,383,385,386,388,389,390,391,392,396,397,400,401,413,419,447,449,450,451],[2,483],{70:[1,895]}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:897,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,295:896,367:168,368:$Vg1,372:$Vh1},o($VH,[2,406],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($VH,[2,526]),o($VH,[2,527]),o($VH,[2,606]),{71:[1,898],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[1,899],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{3:147,4:$V1,5:$V2,36:900,51:144,70:$VM,72:67,81:$V6,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:901,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,158:92,163:$Va,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{71:[1,902]},{67:$V63,71:[1,903]},o($Vn1,[2,378]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:904,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,36:905,51:144,70:$VM,71:[1,907],72:67,81:$V6,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:906,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,158:92,163:$Va,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,381]),o($Vn1,[2,383]),o($Vn1,$Ve4,{239:908,240:$Vf4}),{71:[1,910],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[1,911],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{67:$V63,71:[1,912]},{3:913,4:$V1,5:$V2,154:[1,914]},o($Ve2,[2,558]),o($Vn1,[2,327]),{264:[1,915]},o($Vn1,[2,333]),{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,264:[2,337],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:916,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{4:$Vj3,236:917,338:$Vk3},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:918,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Ve2,[2,580]),o($Vt3,[2,587]),o($Vu3,[2,575]),o($VT3,$VS3),o($Ve2,[2,577]),o($Vx3,[2,582]),o($Vx3,[2,584]),o($Vx3,[2,585]),o($Vx3,[2,586]),o($VV3,[2,408],{67:$Vg4}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:897,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,295:921,367:168,368:$Vg1,372:$Vh1},o($Vh4,[2,416]),o($Vh4,[2,417]),o($VV3,[2,409]),{67:$Vi4,71:[1,922]},o($Vj4,[2,429]),o($VH,[2,653],{406:924,407:925,408:926,266:$VW3,413:[1,927]}),o($Vk4,[2,637]),o($Vk4,[2,638]),{128:[1,929],409:[1,928]},{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,266:[2,634],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},o($Vj2,[2,157]),{3:930,4:$V1,5:$V2},o($VH,[2,511]),o($Vl4,[2,216],{77:931,205:[1,932]}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:933,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vy3,[2,147],{178:934,187:936,179:937,188:938,193:941,67:$Vm4,180:$Vn4,182:$Vo4,194:$Vp4,195:$Vq4,196:$Vr4,197:$Vs4,198:$Vt4,199:$Vu4,200:$Vv4,201:$Vw4}),{3:193,4:$V1,5:$V2,36:390,70:$Vj1,72:67,81:$V6,107:$Vk1,116:$VQ,118:187,119:$VR,126:$VS,155:$VW,158:92,163:$Va,173:188,174:190,175:189,176:191,177:950,183:806,186:192,260:$Vd1,367:168,368:$Vg1,372:$Vh1},o($Vj4,[2,155]),{3:638,4:$V1,5:$V2,88:951,89:636,90:$Vz3},o($VY3,[2,70]),o($VA3,[2,125],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{71:[1,952]},{67:$V63,71:[2,705]},{3:147,4:$V1,5:$V2,51:144,70:$VM,71:[2,698],89:130,91:134,95:953,96:954,100:957,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,214:955,215:[1,956],222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VE3,[2,78]),o($VZ3,[2,701],{127:642,153:$VB3,154:$VC3,155:$VD3}),{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,958],90:$Vt2,92:959,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},o($VZ3,[2,702],{127:642,153:$VB3,154:$VC3,155:$VD3}),{71:[1,960],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[1,961]},o($VE3,[2,98]),{67:$V14,71:[1,962]},o($VE3,[2,100]),{67:$V63,71:[1,963]},{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,964],90:$Vt2,92:965,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,966],90:$Vt2,92:967,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,968],90:$Vt2,92:969,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,970],90:$Vt2,92:971,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{67:$Vx4,71:[1,972]},o($Vy4,[2,121],{367:168,3:411,118:433,132:443,134:444,92:974,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,90:$Vt2,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,368:$Vg1,372:$Vh1}),o($V_3,$V$3,{152:828,137:975}),{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,976],90:$Vt2,92:977,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:411,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,71:[1,978],90:$Vt2,92:979,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{67:$Vx4,71:[1,980]},{67:$Vx4,71:[1,981]},{67:$Vx4,71:[1,982]},{67:$Vx4,71:[1,983]},{71:[1,984],127:642,153:$VB3,154:$VC3,155:$VD3},{67:$VH3,71:[1,985]},{3:411,4:$V1,5:$V2,65:$Vq2,67:[1,986],69:$Vr2,70:$Vs2,90:$Vt2,92:987,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,118:433,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,132:443,134:444,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,367:168,368:$Vg1,372:$Vh1},{3:988,4:$V1,5:$V2},{3:989,4:$V1,5:$V2},o($VH,[2,534]),{3:990,4:$V1,5:$V2},{91:991,107:$VO,256:$Va1},{71:[1,992]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:993,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:638,4:$V1,5:$V2,89:692,116:$VF3,119:$VG3,288:994,289:693},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:995,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{99:[1,996]},o($VH,[2,590],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:997,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:853,4:$V1,5:$V2,70:$V34,106:$V44,381:998},o($Vz4,[2,595]),o($Vz4,[2,596]),o($Vz4,[2,597]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:999,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VI3,[2,247]),o($VI3,[2,249]),o($VI3,[2,251]),o($VI3,[2,253]),o($Vt1,[2,139]),o($VH,[2,506]),{122:[1,1000]},o($VH,[2,507]),o($V73,[2,477],{236:1001,4:$Vj3,336:[1,1002],338:$Vk3}),o($VH,[2,508]),o($VH,[2,510]),{67:$V63,71:[1,1003]},o($VH,[2,514]),o($VH,[2,518]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:1004,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:1005,4:$V1,5:$V2},o($VH,[2,520]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,95:1006,100:957,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,214:955,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{70:[1,1007]},{3:1008,4:$V1,5:$V2},{69:$VJ3,114:[2,780],429:1009,432:1010},o($V74,[2,779]),o($V73,[2,671]),o($V84,[2,675]),o($V84,[2,791]),{3:1011,4:$V1,5:$V2},{3:864,4:$V1,5:$V2,69:[1,1014],302:1012,309:1013,334:1015},{3:638,4:$V1,5:$V2,89:793,204:1016},{36:1017,72:67,81:$V6,158:92,163:$Va},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1018,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VV3,[2,658]),{3:638,4:$V1,5:$V2,89:692,116:$VF3,119:$VG3,121:1019,288:691,289:693},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:1020,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VV3,[2,663]),o($VE1,[2,627],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1021,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{67:[1,1022],71:[1,1023]},o($Vy4,[2,485]),o($Vy4,[2,486]),{106:$Vc4,247:$Vd4,337:1024},{67:$VA4,71:[1,1025]},o($Vy4,[2,421],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($Vn1,[2,349]),o($Vn1,[2,353]),{71:[1,1027]},{67:$V63,71:[1,1028]},o($Vn1,[2,374]),o($Vn1,[2,376]),{71:[1,1029],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[1,1030]},{67:$V63,71:[1,1031]},o($Vn1,[2,379]),o($Vn1,[2,298]),{70:[1,1032]},o($Vn1,$Ve4,{239:1033,240:$Vf4}),o($Vn1,$Ve4,{239:1034,240:$Vf4}),o($Va2,[2,316]),o($VT3,[2,259]),o($Vn1,[2,256]),o($Vn1,[2,332]),o($Vs3,[2,336],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{67:[1,1036],71:[1,1035]},{67:[1,1038],71:[1,1037],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{3:913,4:$V1,5:$V2},{70:[1,1039],116:$VQ,118:1040,119:$Vo1,126:$VS,155:$VW,175:1041,260:$Vd1,367:168,368:$Vg1,372:$Vh1},{67:$VA4,71:[1,1042]},{36:1044,72:67,81:$V6,123:[1,1043],158:92,163:$Va},{3:638,4:$V1,5:$V2,89:1045},o($VH,[2,630]),o($Vk4,[2,635]),o($Vk4,[2,636]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:489,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,148:1046,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,221:488,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{144:[1,1048],267:[1,1047]},{409:[1,1049]},o($Vj2,[2,158]),o($VB4,[2,235],{78:1050,93:[1,1051]}),{94:[1,1052]},o($VX3,[2,215],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($Vy3,[2,148],{188:938,193:941,187:1053,179:1054,180:$Vn4,182:$Vo4,194:$Vp4,195:$Vq4,196:$Vr4,197:$Vs4,198:$Vt4,199:$Vu4,200:$Vv4,201:$Vw4}),{3:193,4:$V1,5:$V2,70:$Vj1,107:$Vk1,116:$VQ,118:187,119:$VR,126:$VS,155:$VW,173:188,174:190,175:189,176:191,183:1055,186:192,260:$Vd1,367:168,368:$Vg1,372:$Vh1},o($VC4,[2,181]),o($VC4,[2,182]),{3:193,4:$V1,5:$V2,70:[1,1060],116:$VQ,118:1058,119:$VR,126:$VS,155:$VW,173:1057,174:1061,175:1059,176:1062,189:1056,260:$Vd1,367:168,368:$Vg1,372:$Vh1},{181:[1,1063],195:$VD4},{181:[1,1065],195:$VE4},o($VF4,[2,198]),{180:[1,1069],182:[1,1068],193:1067,195:$Vq4,196:$Vr4,197:$Vs4,198:$Vt4,199:$Vu4,200:$Vv4,201:$Vw4},o($VF4,[2,200]),{195:[1,1070]},{182:[1,1072],195:[1,1071]},{182:[1,1074],195:[1,1073]},{182:[1,1075]},{195:[1,1076]},{195:[1,1077]},{67:$Vm4,178:1078,179:937,180:$Vn4,182:$Vo4,187:936,188:938,193:941,194:$Vp4,195:$Vq4,196:$Vr4,197:$Vs4,198:$Vt4,199:$Vu4,200:$Vv4,201:$Vw4},o($VY3,[2,67]),o($VE3,[2,80]),{67:$VG4,71:[1,1079]},{71:[1,1081]},o($VH4,[2,237]),{71:[2,699]},o($VH4,[2,239],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,215:[1,1082],216:[1,1083],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($VE3,[2,79]),o($VZ3,[2,703],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,81]),o($VE3,[2,82]),o($VE3,[2,99]),o($VE3,[2,102]),o($VE3,[2,105]),o($VZ3,[2,707],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,106]),o($VZ3,[2,709],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,107]),o($VZ3,[2,711],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,108]),o($VZ3,[2,715],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,109]),o($V_3,[2,722],{151:1084}),o($V_3,[2,725],{127:642,153:$VB3,154:$VC3,155:$VD3}),{67:$Vx4,71:[1,1085]},o($VE3,[2,111]),o($VZ3,[2,717],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,112]),o($VZ3,[2,719],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,113]),o($VE3,[2,114]),o($VE3,[2,115]),o($VE3,[2,116]),o($VE3,[2,117]),o($VE3,[2,118]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:235,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,125:1086,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($V04,[2,721],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VH,[2,544]),o($VH,[2,540]),o($VH,[2,542]),o($VH,[2,538]),o($V43,[2,63]),o($VH,[2,400],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($V24,[2,403]),o($V24,[2,404],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1087,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VH,[2,591],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($Vz4,[2,594]),{71:[1,1088],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{3:1089,4:$V1,5:$V2},o($V73,[2,487],{335:1090,339:1091,340:1092,317:1100,128:$VI4,161:$VJ4,257:$VK4,294:$VL4,307:$VM4,319:$VN4,320:$VO4,324:$VP4,325:$VQ4}),o($V73,[2,476]),o($VH,[2,513],{69:[1,1103]}),{67:$V63,71:[1,1104]},o($VH,[2,522]),{67:$VG4,71:[1,1105]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,95:1106,100:957,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,214:955,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VL3,[2,673]),{114:[1,1107]},{114:[2,781]},o($V84,[2,676]),{71:[1,1108]},{67:[1,1109],71:[2,447]},{36:1110,72:67,81:$V6,158:92,163:$Va},o($Vy4,[2,473]),{67:$Vi4,71:[1,1111]},o($VH,[2,762],{359:1112,360:1113,65:$VR4}),o($VV3,$V94,{72:67,158:92,278:322,36:889,417:1115,81:$V6,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,120:$Va4,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,163:$Va,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72,419:$Vb4}),o($VV3,[2,661],{67:$V14}),o($VV3,[2,662],{67:$V63}),o($VE1,[2,628],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{106:[1,1116]},o($VS4,[2,480]),{67:[1,1117],71:[1,1118]},o($VS4,[2,484]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1119,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,365]),o($Vn1,[2,366]),o($Vn1,[2,390]),o($Vn1,[2,375]),o($Vn1,[2,377]),{93:$VT4,241:1120,242:1121,243:[1,1122]},o($Vn1,[2,299]),o($Vn1,[2,300]),o($Vn1,[2,287]),{106:[1,1124]},o($Vn1,[2,289]),{106:[1,1125]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:897,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,295:1126,367:168,368:$Vg1,372:$Vh1},o($Vh4,[2,419]),o($Vh4,[2,420]),o($Vh4,[2,415]),{70:$VU3,116:$VQ,118:789,119:$Vo1,126:$VS,155:$VW,175:790,260:$Vd1,293:1127,367:168,368:$Vg1,372:$Vh1},o($VV3,[2,412]),o($Vj4,[2,430]),o($VH,[2,654],{67:$VH3,172:[1,1128]}),{287:$VU4,290:$VV4,410:1129},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1132,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{94:[1,1134],144:[1,1135],267:[1,1133]},o($VW4,[2,243],{79:1136,218:[1,1137]}),{94:[1,1138]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1144,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,206:1139,208:1140,209:$VX4,210:$VY4,211:$VZ4,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VC4,[2,179]),o($VC4,[2,180]),o($Vj4,[2,156]),o($VC4,[2,213],{190:1145,202:[1,1146],203:[1,1147]}),o($V_4,[2,184],{3:1148,4:$V1,5:$V2,69:[1,1149]}),o($V$4,[2,734],{191:1150,69:[1,1151]}),{3:1152,4:$V1,5:$V2,69:[1,1153]},{36:1154,72:67,81:$V6,158:92,163:$Va},o($V_4,[2,192],{3:1155,4:$V1,5:$V2,69:[1,1156]}),o($V_4,[2,195],{3:1157,4:$V1,5:$V2,69:[1,1158]}),{70:[1,1159]},o($VF4,[2,210]),{70:[1,1160]},o($VF4,[2,206]),o($VF4,[2,199]),{195:$VE4},{195:$VD4},o($VF4,[2,201]),o($VF4,[2,202]),{195:[1,1161]},o($VF4,[2,204]),{195:[1,1162]},{195:[1,1163]},o($VF4,[2,208]),o($VF4,[2,209]),{71:[1,1164],179:1054,180:$Vn4,182:$Vo4,187:1053,188:938,193:941,194:$Vp4,195:$Vq4,196:$Vr4,197:$Vs4,198:$Vt4,199:$Vu4,200:$Vv4,201:$Vw4},o($VE3,[2,72]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:957,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,214:1165,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VE3,[2,73]),o($VH4,[2,240]),{217:[1,1166]},o($Vy4,[2,120],{367:168,3:411,118:433,132:443,134:444,92:1167,4:$V1,5:$V2,65:$Vq2,69:$Vr2,70:$Vs2,90:$Vt2,93:$Vu2,97:$Vv2,98:$Vw2,99:$Vx2,104:$Vy2,105:$Vz2,106:$VA2,107:$VB2,108:$VC2,109:$VD2,110:$VE2,111:$VF2,112:$VG2,113:$VH2,114:$VI2,115:$VJ2,116:$VK2,117:$VL2,119:$VM2,120:$VN2,122:$VO2,123:$VP2,124:$VQ2,126:$VR2,128:$VS2,130:$VT2,136:$VU2,138:$VV2,140:$VW2,142:$VX2,143:$VY2,144:$VZ2,145:$V_2,146:$V$2,147:$V03,149:$V13,159:$V23,161:$V33,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,368:$Vg1,372:$Vh1}),o($VE3,[2,110]),{67:$V63,71:[1,1168]},o($V24,[2,405],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($Vz4,[2,598]),o($VH,[2,509]),o($V73,[2,475]),o($V73,[2,488],{317:1100,340:1169,128:$VI4,161:$VJ4,257:$VK4,294:$VL4,307:$VM4,319:$VN4,320:$VO4,324:$VP4,325:$VQ4}),o($V53,[2,490]),{321:[1,1170]},{321:[1,1171]},{3:217,4:$V1,5:$V2,173:1172},o($V53,[2,496],{70:[1,1173]}),{3:231,4:$V1,5:$V2,70:[1,1175],91:225,106:$VN,107:$VO,116:$VQ,126:$VS,155:$VW,170:224,174:229,175:228,225:226,226:227,232:$Vp1,238:1174,254:$V81,255:$V91,256:$Va1,257:$Vb1,260:$Vd1},o($V53,[2,499]),{257:[1,1176]},o($V53,[2,501]),o($V53,[2,502]),{70:[1,1177]},{3:1178,4:$V1,5:$V2},o($VH,$V54,{354:1179,69:$V64}),o($VH,[2,528]),{67:$VG4,71:[1,1180]},o([8,67,71,107,112,126,264,268,450,451],$VC1,{434:280,379:282,3:734,430:1181,424:1182,431:1183,4:$V1,5:$V2,116:$Vr1,119:$Vs1}),o($VH,[2,435],{303:1184,305:1185,306:1186,4:$V05,294:$V15,307:$V25}),o($V35,$V45,{3:864,310:1190,334:1191,311:1192,312:1193,4:$V1,5:$V2,318:$V55}),{71:[2,448]},{69:[1,1195]},o($VH,[2,546]),o($VH,[2,763]),{319:[1,1197],361:[1,1196]},o($VV3,[2,664]),{71:[1,1198]},{106:[1,1199]},o($VS4,[2,481]),o($Vy4,[2,422],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{71:[1,1200],93:$VT4,242:1201},{71:[1,1202]},{94:[1,1203]},{94:[1,1204]},{71:[1,1205]},{71:[1,1206]},{67:$VA4,71:[1,1207]},o($VV3,[2,410],{67:$Vg4}),{3:217,4:$V1,5:$V2,116:$Vr1,119:$Vs1,173:1209,379:1208},o($Vk4,[2,639]),o($Vk4,[2,641]),{120:[1,1210]},{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,267:[1,1211],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{291:$V65,411:1212},{365:[1,1215],412:[1,1214]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1216,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VA3,[2,226],{80:1217,136:[1,1218],142:[1,1220],143:[1,1219]}),{106:$VN,170:1221},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,95:1222,100:957,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,214:955,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vl4,[2,224],{207:1223,67:$V75,212:[1,1225]}),o($V85,[2,218]),{120:[1,1226]},{70:[1,1227]},{70:[1,1228]},o($V85,[2,223],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($VC4,[2,183]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1229,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:638,4:$V1,5:$V2,89:793,204:1230},o($V_4,[2,185]),{3:1231,4:$V1,5:$V2},o($V_4,[2,736],{192:1232,3:1233,4:$V1,5:$V2}),o($V$4,[2,735]),o($V_4,[2,188]),{3:1234,4:$V1,5:$V2},{71:[1,1235]},o($V_4,[2,193]),{3:1236,4:$V1,5:$V2},o($V_4,[2,196]),{3:1237,4:$V1,5:$V2},{36:1238,72:67,81:$V6,158:92,163:$Va},{36:1239,72:67,81:$V6,158:92,163:$Va},o($VF4,[2,203]),o($VF4,[2,205]),o($VF4,[2,207]),o($Vy3,[2,149]),o($VH4,[2,238]),o($VH4,[2,241],{215:[1,1240]}),o($V_3,[2,723],{127:642,153:$VB3,154:$VC3,155:$VD3}),o($VE3,[2,119]),o($V53,[2,489]),o($V53,[2,492]),{325:[1,1241]},o($V53,[2,756],{343:1242,341:1243,70:$V95}),{106:$VN,170:1245},o($V53,[2,497]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1246,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($V53,[2,500]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1247,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VH,[2,515]),o($VH,[2,519]),o($VH,[2,529]),o($V73,[2,670]),o($V73,[2,782]),o($V73,[2,783]),o($VH,[2,431]),o($VH,[2,436],{306:1248,4:$V05,294:$V15,307:$V25}),o($Va5,[2,438]),o($Va5,[2,439]),{99:[1,1249]},{99:[1,1250]},{67:[1,1251],71:[2,446]},o($Vy4,[2,474]),o($Vy4,[2,449]),{161:[1,1259],167:[1,1260],313:1252,314:1253,315:1254,316:1255,317:1256,319:$VN4,320:[1,1257],321:[1,1261],324:[1,1258]},{3:1262,4:$V1,5:$V2},{36:1263,72:67,81:$V6,158:92,163:$Va},{362:[1,1264]},{363:[1,1265]},o($VS4,[2,478]),{71:[1,1266]},o($Vn1,[2,302]),{71:[1,1267]},o($Vn1,[2,303]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1144,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,206:1268,208:1140,209:$VX4,210:$VY4,211:$VZ4,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,95:1269,100:957,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,214:955,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($Vn1,[2,288]),o($Vn1,[2,290]),o($Vh4,[2,418]),{3:1270,4:$V1,5:$V2},o($VH,[2,656],{70:[1,1271]}),{3:638,4:$V1,5:$V2,89:692,116:$VF3,119:$VG3,121:1272,288:691,289:693},{287:$VU4,290:$VV4,410:1273},o($Vk4,[2,643]),{70:[1,1275],123:[1,1274],294:[1,1276]},{144:[1,1278],267:[1,1277]},{144:[1,1280],267:[1,1279]},{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,267:[1,1281],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},o($VA3,[2,64]),{36:1282,72:67,81:$V6,138:[1,1283],158:92,163:$Va,213:[1,1284]},{36:1285,72:67,81:$V6,158:92,163:$Va,213:[1,1286]},{36:1287,72:67,81:$V6,158:92,163:$Va,213:[1,1288]},o($VW4,[2,245],{219:1289,220:[1,1290]}),o($VB4,[2,236],{67:$VG4}),o($Vl4,[2,217]),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1144,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,208:1291,209:$VX4,210:$VY4,211:$VZ4,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1292,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{70:[1,1293]},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1144,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,206:1294,208:1140,209:$VX4,210:$VY4,211:$VZ4,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1144,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,206:1295,208:1140,209:$VX4,210:$VY4,211:$VZ4,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},o($VC4,[2,211],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),o($VC4,[2,212],{67:$Vi4}),o($V_4,[2,186]),o($V_4,[2,187]),o($V_4,[2,737]),o($V_4,[2,189]),{3:1296,4:$V1,5:$V2,69:[1,1297]},o($V_4,[2,194]),o($V_4,[2,197]),{71:[1,1298]},{71:[1,1299]},o($VH4,[2,242]),{3:217,4:$V1,5:$V2,173:1300},o($V53,[2,494]),o($V53,[2,757]),{3:1301,4:$V1,5:$V2},{67:[1,1302]},{71:[1,1303],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},{71:[1,1304],90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},o($Va5,[2,437]),{3:1305,4:$V1,5:$V2},{106:$VN,170:1306},o($V35,$V45,{312:1193,311:1307,318:$V55}),o($V73,[2,451]),o($V73,[2,452]),o($V73,[2,453]),o($V73,[2,454]),o($V73,[2,455]),{321:[1,1308]},{321:[1,1309]},{3:1311,4:$V1,5:$V2,70:[2,752],333:1310},{3:1312,4:$V1,5:$V2},{3:1313,4:$V1,5:$V2},o($V35,[2,457]),o($VH,[2,760],{358:1314,360:1315,65:$VR4}),o($VH,[2,547]),o($VH,[2,548],{318:[1,1316]}),o($VS4,[2,479]),o($Vn1,[2,304]),o([71,93],[2,305],{67:$V75}),{67:$VG4,71:[2,306]},o($VH,[2,655]),{3:638,4:$V1,5:$V2,89:793,204:1317},o($Vk4,[2,642],{67:$V14}),o($Vk4,[2,640]),{70:$VU3,116:$VQ,118:789,119:$Vo1,126:$VS,155:$VW,175:790,260:$Vd1,293:1318,367:168,368:$Vg1,372:$Vh1},{3:638,4:$V1,5:$V2,89:793,204:1319},{123:[1,1320]},{291:$V65,411:1321},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1322,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{291:$V65,411:1323},{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1324,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{291:$V65,411:1325},o($VA3,[2,227]),{36:1326,72:67,81:$V6,158:92,163:$Va,213:[1,1327]},{36:1328,72:67,81:$V6,158:92,163:$Va},o($VA3,[2,229]),{36:1329,72:67,81:$V6,158:92,163:$Va},o($VA3,[2,230]),{36:1330,72:67,81:$V6,158:92,163:$Va},o($VW4,[2,244]),{106:$VN,170:1331},o($V85,[2,219]),o($Vl4,[2,225],{278:322,90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72}),{3:147,4:$V1,5:$V2,51:144,70:$VM,89:130,91:134,100:1144,106:$VN,107:$VO,112:$VP,116:$VQ,118:141,119:$VR,126:$VS,128:$VT,132:146,153:$VU,154:$VV,155:$VW,170:132,174:128,175:136,176:137,206:1332,208:1140,209:$VX4,210:$VY4,211:$VZ4,222:131,223:127,224:129,225:133,226:135,227:138,228:139,229:140,230:142,232:$VX,233:$Vb,234:$VY,235:$VZ,237:$V_,244:$V$,245:$V01,246:$V11,247:$V21,248:$V31,249:$V41,250:$V51,251:$V61,252:$V71,254:$V81,255:$V91,256:$Va1,257:$Vb1,258:$Vc1,260:$Vd1,261:$Ve1,270:$Vf1,367:168,368:$Vg1,372:$Vh1},{67:$V75,71:[1,1333]},{67:$V75,71:[1,1334]},o($V_4,[2,190]),{3:1335,4:$V1,5:$V2},{3:1336,4:$V1,5:$V2,69:[1,1337]},{3:1338,4:$V1,5:$V2,69:[1,1339]},o($V53,[2,754],{342:1340,341:1341,70:$V95}),{71:[1,1342]},{106:$VN,170:1343},o($V53,[2,498]),o($V53,[2,458]),o($Va5,[2,440]),o($Va5,[2,441]),o($Vy4,[2,450]),{3:1345,4:$V1,5:$V2,70:[2,748],322:1344},{70:[1,1346]},{70:[1,1347]},{70:[2,753]},{70:[1,1348]},{70:[1,1349]},o($VH,[2,545]),o($VH,[2,761]),o($V35,$V45,{312:1193,311:1350,318:$V55}),{67:$Vi4,71:[1,1351]},o($Vk4,[2,649],{67:$Vg4}),{67:$Vi4,71:[1,1352]},o($Vk4,[2,651]),o($Vk4,[2,644]),{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,267:[1,1353],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},o($Vk4,[2,647]),{90:$VI1,97:$VJ1,98:$VK1,99:$V83,108:$VM1,111:$VN1,113:$VO1,114:$VP1,115:$VQ1,128:$VR1,144:$VS1,145:$VT1,153:$VU1,154:$VV1,267:[1,1354],269:$VW1,270:$VX1,271:$VY1,272:$VZ1,273:$V_1,274:$V$1,275:$V02,276:$V12,277:$V22,278:322,280:$V32,282:$V42,283:$V52,284:$V62,285:$V72},o($Vk4,[2,645]),o($VA3,[2,228]),{36:1355,72:67,81:$V6,158:92,163:$Va},o($VA3,[2,231]),o($VA3,[2,233]),o($VA3,[2,234]),o($VW4,[2,246]),{67:$V75,71:[1,1356]},o($V85,[2,221]),o($V85,[2,222]),o($V_4,[2,191]),o($VC4,[2,151]),{3:1357,4:$V1,5:$V2},o($VC4,[2,153]),{3:1358,4:$V1,5:$V2},o($V53,[2,493]),o($V53,[2,755]),o($V53,[2,491]),{71:[1,1359]},{70:[1,1360]},{70:[2,749]},{3:1362,4:$V1,5:$V2,107:$Vb5,323:1361},{3:638,4:$V1,5:$V2,89:793,204:1364},{3:638,4:$V1,5:$V2,89:793,204:1365},{3:638,4:$V1,5:$V2,89:793,204:1366},o($VH,[2,549]),o($VH,[2,657]),{123:[1,1367],294:[1,1368]},{291:$V65,411:1369},{287:$VU4,290:$VV4,410:1370},o($VA3,[2,232]),o($V85,[2,220]),o($VC4,[2,152]),o($VC4,[2,154]),o($V53,[2,495]),{3:1362,4:$V1,5:$V2,107:$Vb5,323:1371},{67:$Vc5,71:[1,1372]},o($Vy4,[2,469]),o($Vy4,[2,470]),{67:$Vi4,71:[1,1374]},{67:$Vi4,71:[1,1375]},{67:$Vi4,71:[1,1376]},{70:$VU3,116:$VQ,118:789,119:$Vo1,126:$VS,155:$VW,175:790,260:$Vd1,293:1377,367:168,368:$Vg1,372:$Vh1},{123:[1,1378]},o($Vk4,[2,646]),o($Vk4,[2,648]),{67:$Vc5,71:[1,1379]},{325:[1,1380]},{3:1381,4:$V1,5:$V2,107:[1,1382]},o($V73,[2,466]),o($V73,[2,467]),o($V73,[2,468]),o($Vk4,[2,650],{67:$Vg4}),o($Vk4,[2,652]),o($V73,[2,459]),{3:217,4:$V1,5:$V2,173:1383},o($Vy4,[2,471]),o($Vy4,[2,472]),o($Vd5,[2,750],{326:1384,328:1385,70:[1,1386]}),o($V73,[2,462],{327:1387,329:1388,202:[1,1389]}),o($Vd5,[2,751]),{3:1362,4:$V1,5:$V2,107:$Vb5,323:1390},o($V73,[2,460]),{202:[1,1392],330:1391},{290:[1,1393]},{67:$Vc5,71:[1,1394]},o($V73,[2,463]),{287:[1,1395]},{331:[1,1396]},o($Vd5,[2,461]),{331:[1,1397]},{332:[1,1398]},{332:[1,1399]},{202:[2,464]},o($V73,[2,465])],
defaultActions: {97:[2,3],171:[2,307],172:[2,308],173:[2,309],174:[2,310],175:[2,311],176:[2,312],177:[2,313],178:[2,314],179:[2,315],184:[2,631],281:[2,777],288:[2,771],335:[2,738],336:[2,739],389:[2,632],455:[2,712],456:[2,713],560:[2,397],561:[2,398],562:[2,399],615:[2,633],956:[2,699],1010:[2,781],1110:[2,448],1311:[2,753],1345:[2,749],1398:[2,464]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 233
break;
case 1:return 260
break;
case 2:return 368
break;
case 3:return 5
break;
case 4:return 5
break;
case 5:return 256
break;
case 6:return 256
break;
case 7:return 107
break;
case 8:return 107
break;
case 9:return /* return COMMENT */
break;
case 10:/* skip whitespace */
break;
case 11:return 145
break;
case 12:return 144
break;
case 13:yy_.yytext = 'VALUE';return 163
break;
case 14:yy_.yytext = 'ROW';return 163
break;
case 15:yy_.yytext = 'COLUMN';return 163
break;
case 16:yy_.yytext = 'MATRIX';return 163
break;
case 17:yy_.yytext = 'INDEX';return 163
break;
case 18:yy_.yytext = 'RECORDSET';return 163
break;
case 19:yy_.yytext = 'TEXT';return 163
break;
case 20:yy_.yytext = 'SELECT';return 163
break;
case 21:return 'ABSOLUTE'
break;
case 22:return 332
break;
case 23:return 349
break;
case 24:return 251
break;
case 25:return 138
break;
case 26:return 347
break;
case 27:return 144
break;
case 28:return 201
break;
case 29:return 140
break;
case 30:return 181
break;
case 31:return 252
break;
case 32:return 69
break;
case 33:return 366
break;
case 34:return 215
break;
case 35:return 351
break;
case 36:return 307
break;
case 37:return 248
break;
case 38:return 386
break;
case 39:return 282
break;
case 40:return 390
break;
case 41:return 283
break;
case 42:return 269
break;
case 43:return 94
break;
case 44:return 261
break;
case 45:return 235
break;
case 46:return 319
break;
case 47:return 105
break;
case 48:return 'CLOSE'
break;
case 49:return 216
break;
case 50:return 164
break;
case 51:return 164
break;
case 52:return 383
break;
case 53:return 318
break;
case 54:return 419
break;
case 55:return 389
break;
case 56:return 237
break;
case 57:return 213
break;
case 58:return 245
break;
case 59:return 298
break;
case 60:return 180
break;
case 61:return 211
break;
case 62:return 232
break;
case 63:return 'CURSOR'
break;
case 64:return 352
break;
case 65:return 397
break;
case 66:return 294
break;
case 67:return 290
break;
case 68:return 'DELETED'
break;
case 69:return 215
break;
case 70:return 353
break;
case 71:return 159
break;
case 72:return 344
break;
case 73:return 396
break;
case 74:return 110
break;
case 75:return 264
break;
case 76:return 338
break;
case 77:return 268
break;
case 78:return 143
break;
case 79:return 258
break;
case 80:return 12
break;
case 81:return 255
break;
case 82:return 'FETCH'
break;
case 83:return 249
break;
case 84:return 324
break;
case 85:return 157
break;
case 86:return 451
break;
case 87:return 421
break;
case 88:return 205
break;
case 89:return 209
break;
case 90:return 212
break;
case 91:return 364
break;
case 92:return 130
break;
case 93:return 307
break;
case 94:return 284
break;
case 95:return 280
break;
case 96:return 167
break;
case 97:return 196
break;
case 98:return 291
break;
case 99:return 'INSERTED'
break;
case 100:return 142
break;
case 101:return 172
break;
case 102:return 195
break;
case 103:return 321
break;
case 104:return 250
break;
case 105:return 'LET'
break;
case 106:return 197
break;
case 107:return 90
break;
case 108:return 218
break;
case 109:return 409
break;
case 110:return 165	
break;
case 111:return 247
break;
case 112:return 401
break;
case 113:return 246
break;
case 114:return 143
break;
case 115:return 350
break;
case 116:return 194
break;
case 117:return 'NEXT'
break;
case 118:return 234
break;
case 119:return 217
break;
case 120:return 331
break;
case 121:return 128
break;
case 122:return 257
break;
case 123:return 382
break;
case 124:return 202
break;
case 125:return 362
break;
case 126:return 220
break;
case 127:return 'OPEN'
break;
case 128:return 363
break;
case 129:return 145
break;
case 130:return 93
break;
case 131:return 182
break;
case 132:return 240
break;
case 133:return 146
break;
case 134:return 243
break;
case 135:return 452
break;
case 136:return 14
break;
case 137:return 320
break;
case 138:return 391
break;
case 139:return 'PRIOR'
break;
case 140:return 13
break;
case 141:return 361
break;
case 142:return 168
break;
case 143:return 'REDUCE'
break;
case 144:return 325
break;
case 145:return 'RELATIVE'
break;
case 146:return 85
break;
case 147:return 348
break;
case 148:return 149
break;
case 149:return 392
break;
case 150:return 'RESTORE'
break;
case 151:return 147
break;
case 152:return 147
break;
case 153:return 198
break;
case 154:return 385
break;
case 155:return 210
break;
case 156:return 124
break;
case 157:return 352
break;
case 158:return 81
break;
case 159:return 200
break;
case 160:return 120
break;
case 161:return 120
break;
case 162:return 356
break;
case 163:return 286
break;
case 164:return 365
break;
case 165:return 'STRATEGY'
break;
case 166:return 'STORE'
break;
case 167:return 244
break;
case 168:return 304
break;
case 169:return 304
break;
case 170:return 412
break;
case 171:return 308
break;
case 172:return 308
break;
case 173:return 166
break;
case 174:return 267
break;
case 175:return 'TIMEOUT'
break;
case 176:return 122
break;
case 177:return 169
break;
case 178:return 384
break;
case 179:return 384
break;
case 180:return 254
break;
case 181:return 400
break;
case 182:return 136
break;
case 183:return 161
break;
case 184:return 287
break;
case 185:return 355
break;
case 186:return 203
break;
case 187:return 123
break;
case 188:return 109
break;
case 189:return 357
break;
case 190:return 266
break;
case 191:return 104
break;
case 192:return 388
break;
case 193:return 65
break;
case 194:return 384  /* Is this keyword required? */
break;
case 195:return 106
break;
case 196:return 106
break;
case 197:return 97
break;
case 198:return 112
break;
case 199:return 153
break;
case 200:return 270
break;
case 201:return 154
break;
case 202:return 108
break;
case 203:return 113
break;
case 204:return 277
break;
case 205:return 274
break;
case 206:return 276
break;
case 207:return 273
break;
case 208:return 271
break;
case 209:return 114
break;
case 210:return 272
break;
case 211:return 275
break;
case 212:return 115
break;
case 213:return 99
break;
case 214:return 275
break;
case 215:return 70
break;
case 216:return 71
break;
case 217:return 119
break;
case 218:return 372
break;
case 219:return 374
break;
case 220:return 376
break;
case 221:return 447
break;
case 222:return 449
break;
case 223:return 117
break;
case 224:return 67
break;
case 225:return 285
break;
case 226:return 126
break;
case 227:return 450
break;
case 228:return 116
break;
case 229:return 155
break;
case 230:return 111
break;
case 231:return 98
break;
case 232:return 4
break;
case 233:return 8
break;
case 234:return 'INVALID'
break;
}
},
rules: [/^(?:``([^\`])+``)/i,/^(?:\[\?\])/i,/^(?:@\[)/i,/^(?:\[([^\]])*?\])/i,/^(?:`([^\`])*?`)/i,/^(?:N(['](\\.|[^']|\\')*?['])+)/i,/^(?:X(['](\\.|[^']|\\')*?['])+)/i,/^(?:(['](\\.|[^']|\\')*?['])+)/i,/^(?:(["](\\.|[^"]|\\")*?["])+)/i,/^(?:--(.*?)($|\r\n|\r|\n))/i,/^(?:\s+)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:VALUE\s+OF\s+SELECT\b)/i,/^(?:ROW\s+OF\s+SELECT\b)/i,/^(?:COLUMN\s+OF\s+SELECT\b)/i,/^(?:MATRIX\s+OF\s+SELECT\b)/i,/^(?:INDEX\s+OF\s+SELECT\b)/i,/^(?:RECORDSET\s+OF\s+SELECT\b)/i,/^(?:TEXT\s+OF\s+SELECT\b)/i,/^(?:SELECT\b)/i,/^(?:ABSOLUTE\b)/i,/^(?:ACTION\b)/i,/^(?:ADD\b)/i,/^(?:AGGR\b)/i,/^(?:ALL\b)/i,/^(?:ALTER\b)/i,/^(?:AND\b)/i,/^(?:ANTI\b)/i,/^(?:ANY\b)/i,/^(?:APPLY\b)/i,/^(?:ARRAY\b)/i,/^(?:AS\b)/i,/^(?:ASSERT\b)/i,/^(?:ASC\b)/i,/^(?:ATTACH\b)/i,/^(?:AUTO(_)?INCREMENT\b)/i,/^(?:AVG\b)/i,/^(?:BEGIN\b)/i,/^(?:BETWEEN\b)/i,/^(?:BREAK\b)/i,/^(?:NOT\s+BETWEEN\b)/i,/^(?:NOT\s+LIKE\b)/i,/^(?:BY\b)/i,/^(?:CASE\b)/i,/^(?:CAST\b)/i,/^(?:CHECK\b)/i,/^(?:CLASS\b)/i,/^(?:CLOSE\b)/i,/^(?:COLLATE\b)/i,/^(?:COLUMN\b)/i,/^(?:COLUMNS\b)/i,/^(?:COMMIT\b)/i,/^(?:CONSTRAINT\b)/i,/^(?:CONTENT\b)/i,/^(?:CONTINUE\b)/i,/^(?:CONVERT\b)/i,/^(?:CORRESPONDING\b)/i,/^(?:COUNT\b)/i,/^(?:CREATE\b)/i,/^(?:CROSS\b)/i,/^(?:CUBE\b)/i,/^(?:CURRENT_TIMESTAMP\b)/i,/^(?:CURSOR\b)/i,/^(?:DATABASE(S)?)/i,/^(?:DECLARE\b)/i,/^(?:DEFAULT\b)/i,/^(?:DELETE\b)/i,/^(?:DELETED\b)/i,/^(?:DESC\b)/i,/^(?:DETACH\b)/i,/^(?:DISTINCT\b)/i,/^(?:DROP\b)/i,/^(?:ECHO\b)/i,/^(?:EDGE\b)/i,/^(?:END\b)/i,/^(?:ENUM\b)/i,/^(?:ELSE\b)/i,/^(?:EXCEPT\b)/i,/^(?:EXISTS\b)/i,/^(?:EXPLAIN\b)/i,/^(?:FALSE\b)/i,/^(?:FETCH\b)/i,/^(?:FIRST\b)/i,/^(?:FOREIGN\b)/i,/^(?:FROM\b)/i,/^(?:GO\b)/i,/^(?:GRAPH\b)/i,/^(?:GROUP\b)/i,/^(?:GROUPING\b)/i,/^(?:HAVING\b)/i,/^(?:HELP\b)/i,/^(?:IF\b)/i,/^(?:IDENTITY\b)/i,/^(?:IS\b)/i,/^(?:IN\b)/i,/^(?:INDEX\b)/i,/^(?:INNER\b)/i,/^(?:INSERT\b)/i,/^(?:INSERTED\b)/i,/^(?:INTERSECT\b)/i,/^(?:INTO\b)/i,/^(?:JOIN\b)/i,/^(?:KEY\b)/i,/^(?:LAST\b)/i,/^(?:LET\b)/i,/^(?:LEFT\b)/i,/^(?:LIKE\b)/i,/^(?:LIMIT\b)/i,/^(?:MATCHED\b)/i,/^(?:MATRIX\b)/i,/^(?:MAX\b)/i,/^(?:MERGE\b)/i,/^(?:MIN\b)/i,/^(?:MINUS\b)/i,/^(?:MODIFY\b)/i,/^(?:NATURAL\b)/i,/^(?:NEXT\b)/i,/^(?:NEW\b)/i,/^(?:NOCASE\b)/i,/^(?:NO\b)/i,/^(?:NOT\b)/i,/^(?:NULL\b)/i,/^(?:OFF\b)/i,/^(?:ON\b)/i,/^(?:ONLY\b)/i,/^(?:OFFSET\b)/i,/^(?:OPEN\b)/i,/^(?:OPTION\b)/i,/^(?:OR\b)/i,/^(?:ORDER\b)/i,/^(?:OUTER\b)/i,/^(?:OVER\b)/i,/^(?:PATH\b)/i,/^(?:PARTITION\b)/i,/^(?:PERCENT\b)/i,/^(?:PLAN\b)/i,/^(?:PRIMARY\b)/i,/^(?:PRINT\b)/i,/^(?:PRIOR\b)/i,/^(?:QUERY\b)/i,/^(?:READ\b)/i,/^(?:RECORDSET\b)/i,/^(?:REDUCE\b)/i,/^(?:REFERENCES\b)/i,/^(?:RELATIVE\b)/i,/^(?:REMOVE\b)/i,/^(?:RENAME\b)/i,/^(?:REPEAT\b)/i,/^(?:REQUIRE\b)/i,/^(?:RESTORE\b)/i,/^(?:RETURN\b)/i,/^(?:RETURNS\b)/i,/^(?:RIGHT\b)/i,/^(?:ROLLBACK\b)/i,/^(?:ROLLUP\b)/i,/^(?:ROW\b)/i,/^(?:SCHEMA(S)?)/i,/^(?:SEARCH\b)/i,/^(?:SEMI\b)/i,/^(?:SET\b)/i,/^(?:SETS\b)/i,/^(?:SHOW\b)/i,/^(?:SOME\b)/i,/^(?:SOURCE\b)/i,/^(?:STRATEGY\b)/i,/^(?:STORE\b)/i,/^(?:SUM\b)/i,/^(?:TABLE\b)/i,/^(?:TABLES\b)/i,/^(?:TARGET\b)/i,/^(?:TEMP\b)/i,/^(?:TEMPORARY\b)/i,/^(?:TEXTSTRING\b)/i,/^(?:THEN\b)/i,/^(?:TIMEOUT\b)/i,/^(?:TO\b)/i,/^(?:TOP\b)/i,/^(?:TRAN\b)/i,/^(?:TRANSACTION\b)/i,/^(?:TRUE\b)/i,/^(?:TRUNCATE\b)/i,/^(?:UNION\b)/i,/^(?:UNIQUE\b)/i,/^(?:UPDATE\b)/i,/^(?:USE\b)/i,/^(?:USING\b)/i,/^(?:VALUE(S)?)/i,/^(?:VERTEX\b)/i,/^(?:VIEW\b)/i,/^(?:WHEN\b)/i,/^(?:WHERE\b)/i,/^(?:WHILE\b)/i,/^(?:WITH\b)/i,/^(?:WORK\b)/i,/^(?:(\d*[.])?\d+[eE]\d+)/i,/^(?:(\d*[.])?\d+)/i,/^(?:->)/i,/^(?:#)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:!===)/i,/^(?:===)/i,/^(?:!==)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:<)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\))/i,/^(?:@)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\])/i,/^(?::-)/i,/^(?:\?-)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:::)/i,/^(?::)/i,/^(?:;)/i,/^(?:\$)/i,/^(?:\?)/i,/^(?:!)/i,/^(?:\^)/i,/^(?:[a-zA-Z_][a-zA-Z_0-9]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
/**
   12prettyflag.js - prettify
   @todo remove this part into the separate plugin
*/

/**
 	Pretty flag - nice HTML output or standard text without any tags
	@type {boolean}
*/

alasql.prettyflag = false;

/**
	Pretty output of SQL functions
	@function
	@param {string} sql SQL statement
	@param {boolean} flag value
	@return {string} HTML or text string with pretty output 
*/

alasql.pretty = function(sql, flag) {
	var pf = alasql.prettyflag;
	alasql.prettyflag = !flag;
	var s = alasql.parse(sql).toString();
	alasql.prettyflag = pf;
	return s;
};

/**
 Pretty keyword
 @param {string} s Keyword
 @return {string} pretty keyword
*/
function K(s){
	if(alasql.prettyflag) {
		return '<b style="color:blue">'+s.toUpperCase()+'</b>'; 
	} else {
		return s;
	}
};

/**
 Pretty 
 @param {string} 
 @return {string} pretty keyword
 */
function P(s){
	if(alasql.prettyflag) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
};

/**
 Pretty 
 @param {string} 
 @return {string} pretty keyword
 */
function L(s){
	if(alasql.prettyflag) {
		return '<span style="color:red">'+s+'</span>'; 
	} else {
		return s;
	}
};

/**
 Pretty number
 @param {string | number} s number 
 @return {string} pretty number
 */
function N(s){
	if(alasql.prettyflag) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
};

/**
 Pretty string
 @param {string} s string 
 @return {string} pretty string
 */
function S(s){
	if(alasql.prettyflag) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
};


/**
 Pretty new line
 @return {string} HTML new line character
 */
function NL(){
	if(alasql.prettyflag) {
		return '<br/>'; 
	} else {
		return ' '; // '\n'
	}	
};

/**
 Pretty ident
 @return {string} HTML ident
 */
function ID(){
	if(alasql.prettyflag) {
		return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; 
	} else {
		return ''; //'    ';
	}	
};


/*
    Utilities for Alasql.js

    @todo Review the list of utilities
    @todo Find more effective utilities
*/

/**
    Alasql utility functions
    @type {object}
 */
var utils = alasql.utils = {};

/**
    Convert NaN to undefined
    @function
    @param {string} s JavaScript string to be modified
    @return {string} Covered expression

    @example
    
    123         => 123
    undefined   => undefined
    NaN         => undefined

*/
function n2u(s) {
    return '(y='+s+',y===y?y:undefined)';
}

/**
    Return undefined if s undefined
    @param {string} s JavaScript string to be modified
    @return {string} Covered expression

    @example
    
    123,a       => a
    undefined,a => undefined
    NaN,a       => undefined

*/    
function und(s,r) {
    return '(y='+s+',typeof y=="undefined"?undefined:'+r+')'
}


/**
    Return always true. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {boolean} Always true
*/
function returnTrue () {return true};

/**
    Return undefined. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {undefined} Always undefined
*/
function returnUndefined() {};

/**
    Escape quotes
    @function
    @param {string} s Source string
    @return {string} Escaped string
    @example
    
    Piter's => Piter\'s

*/
var escapeq = utils.escapeq = function(s) {
//    console.log(s);
    return s.replace(/\'/g,'\\\'');
}


/**
    Double quotes for SQL statements
    @param {string} s Source string
    @return {string} Escaped string

    @example
    
    Piter's => Piter''s

 */
var escapeqq = utils.undoubleq = function(s) {
    return s.replace(/(\')/g,'\'\'');
}

/**
    Replace double quotes with single quote
    @param {string} s Source string
    @return {string} Replaced string
    @example

    Piter''s => Piter's

 */
var doubleq = utils.doubleq = function(s) {
    return s.replace(/(\'\')/g,'\\\'');
}


/**
    Replace sigle quote to escaped single quote
    @param {string} s Source string
    @return {string} Replaced string

    @todo Chack this functions
    
*/
 var doubleqq = utils.doubleqq = function(s) {
    return s.replace(/\'/g,"\'");
}

/**
    Cut BOM first character for UTF-8 files (for merging two files)
    @param {string} s Source string
    @return {string} Replaced string    
*/

var cutbom = function(s) {
    if(s[0] == String.fromCharCode(65279)) s = s.substr(1);
    return s;
};

/**
    Load text file from anywhere
    @param {string|object} path File path or HTML event
    @param {boolean} asy True - async call, false - sync call
    @param {function} success Success function
    @param {function} error Error function
    @return {string} Read data

    @todo Define Event type
*/
var loadFile = utils.loadFile = function(path, asy, success, error) {

    if((typeof exports == 'object') || (typeof Meteor != 'undefined' && Meteor.isServer)) {

        if(typeof Meteor != 'undefined') {
            /** For Meteor */
            var fs = Npm.require('fs');
        } else {
            /** For Node.js */
            var fs = require('fs');
        }

        /* If path is empty, than read data from stdin (for Node) */
        if(typeof path == 'undefined') {
            /* @type {string} Buffer for string*/
            var buff = '';
            process.stdin.setEncoding('utf8');
            process.stdin.on('readable', function() {
                var chunk = process.stdin.read();
                if (chunk !== null) {
                    buff += chunk.toString();
                }
            });
            process.stdin.on('end', function() {
               success(cutbom(buff));
            });
        } else {
            /* If async callthen call async*/
            if(asy) {
                fs.readFile(path,function(err,data){
                    if(err) {
                        throw err;
                    }
                    success(cutbom(data.toString()));
                });
            } else {
                /* Call sync version */
                var data = fs.readFileSync(path);
                success(cutbom(data.toString()));
            }
        }
    } else if(typeof cordova == 'object') {
        /* If Cordova */
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                fileEntry.file(function(file){
                    var fileReader = new FileReader();
                    fileReader.onloadend = function(e){
                        success(cutbom(this.result));
                    };
                    fileReader.readAsText(file);
                });
            });
        });


/** @todo Check eliminated code below */

/*

        var paths = path.split('/');
        var filename = paths[paths.length-1];
        var dirpath = path.substr(0,path.length-filename.length);
 //       console.log('CORDOVA',filename,dirpath);
 //return success('[{"a":"'+filename+'"}]');

        window.resolveLocalFileSystemURL(dirpath, function(dir) {
            dir.getFile(filename, null, function(file) {
                file.file(function(file) {
                    var reader = new FileReader();
 //                   console.log('READ FILE 2');
                    reader.onloadend = function(e) {
//                    console.log('READ FILE 3',this.result);
                        success(this.result);
                    };
                    reader.readAsText(file);
                });
            });
        });    
*/
    } else {
        /* For string */
        if(typeof path == "string") {
            // For browser read from tag
            /*
                SELECT * FROM TXT('#one') -- read data from HTML element with id="one" 
            */
            if((path.substr(0,1) == '#') && (typeof document != 'undefined')) {
                var data = document.querySelector(path).textContent;
                success(data);
            } else {
                /* 
                    Simply read file from HTTP request, like:
                    SELECT * FROM TXT('http://alasql.org/README.md');
                */
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            if (success)
                                success(cutbom(xhr.responseText));
                        } else {
                            if (error)
                                error(xhr);
                        }
                    }
                };
                xhr.open("GET", path, asy); // Async
                xhr.send();
            }
        } else if(path instanceof Event) {
            /* 
                For browser read from files input element
                <input type="files" onchange="readFile(event)">
                <script>
                    function readFile(event) {
                        alasql('SELECT * FROM TXT(?)',[event])
                    }
                </script>
            */
            /** @type {array} List of files from <input> element */
            var files = path.target.files;
            /** type {object} */
            var reader = new FileReader();
            /** type {string} */
            var name = files[0].name;
            reader.onload = function(e) {
                var data = e.target.result;
                success(cutbom(data));
            };
            reader.readAsText(files[0]);    
        }
    }
};

/**
  @function Load binary file from anywhere
  @param {string} path File path
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return 1 for Async, data - for sync version
*/

var loadBinaryFile = utils.loadBinaryFile = function(path, asy, success, error) {
    if((typeof exports == 'object') || (typeof Meteor != 'undefined' && Meteor.isServer)) {
        // For Node.js
        if(typeof Meteor != 'undefined') {
            var fs = Npm.require('fs'); // For Meteor
        } else {
            var fs = require('fs');
        }
    // if(typeof exports == 'object') {
    //     // For Node.js
    //     var fs = require('fs');
        if(asy) {
            fs.readFile(path,function(err,data){
                if(err) {
                    throw err;
                }
                var arr = new Array();
                for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                success(arr.join(""));
            });

        } else {
            var data = fs.readFileSync(path);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            success(arr.join(""));
        }
//        success(data);
    } else {

        if(typeof path == "string") {
            // For browser
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path, asy); // Async
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
                var data = new Uint8Array(xhr.response);
                var arr = new Array();
                for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                success(arr.join(""));
            };
            xhr.send();
        } else if(path instanceof Event) {
            // console.log("event");
            var files = path.target.files;
            var reader = new FileReader();
            var name = files[0].name;
            reader.onload = function(e) {
                var data = e.target.result;
                success(data);
            };
            reader.readAsBinaryString(files[0]);    
        }
    };
};


var removeFile = utils.removeFile = function(path,cb) {
    if(typeof exports == 'object') {
        var fs = require('fs');
        fs.remove(path,cb);
    } else if(typeof cordova == 'object') {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                fileEntry.remove(cb);
                if(cb) cb();
            }, function(){
                if(cb) cb();
            });
        });
    } else {
        throw new Error('You can remove files only in Node.js and Apache Cordova');
    };
};


var deleteFile = utils.deleteFile = function(path,cb){
    if(typeof exports == 'object') {
        var fs = require('fs');
        fs.unlink(path, cb);
    };
};

var fileExists = utils.fileExists = function(path,cb){
    if(typeof exports == 'object') {
        var fs = require('fs');
        fs.exists(path,cb);
    } else if(typeof cordova == 'object') {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                cb(true);
            }, function(){
                cb(false);
            });
        });
/*        
        function fail(){
            callback(false);            
        }
        try {
            // Cordova
            var paths = path.split('/');
            var filename = paths[paths.length-1];
            var dirpath = path.substr(0,path.length-filename.length);

            window.resolveLocalFileSystemURL(dirpath, function(dir) {
                dir.getFile(filename, null, function(file) {
                    file.file(function(file) {
                        callback(true);
                    },fail);
                },fail);
            },fail);
        } catch(err) {
            fail();
        };
*/
    } else {
        // TODO Cordova, etc.
        throw new Error('You can use exists() only in Node.js or Apach Cordova');
    }
};

/**
  Save text file from anywhere
  @param {string} path File path
  @param {array} data Data object
  @param {function} cb Callback
*/

var saveFile = utils.saveFile = function(path, data, cb) {
    var res = 1;
    if(typeof path == 'undefined') {
        //
        // Return data into result variable
        // like: alasql('SELECT * INTO TXT() FROM ?',[data]);
        //
        res = data;
        if(cb) res = cb(res);
    } else {

        if(typeof exports == 'object') {
            // For Node.js
            var fs = require('fs');
            var data = fs.writeFileSync(path,data);
            if(cb) res = cb(res);
        } else if(typeof cordova == 'object') {
            // For Apache Cordova
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
//                alasql.utils.removeFile(path,function(){
                    fileSystem.root.getFile(path, {create:true}, function (fileEntry) {
                        fileEntry.createWriter(function(fileWriter) {
                            fileWriter.onwriteend = function(){
                                if(cb) res = cb(res);
                            };
                            fileWriter.write(data);
                        });                                  
                    });
 //               });
            });

/*
        } else if((typeof cordova == 'object') && cordova.file) {
//            console.log('saveFile 1');
        // Cordova
            var paths = path.split('/');
            var filename = paths[paths.length-1];
            var dirpath = path.substr(0,path.length-filename.length);
     //       console.log('CORDOVA',filename,dirpath);
     //return success('[{"a":"'+filename+'"}]');

            window.resolveLocalFileSystemURL(dirpath, function(dir) {
//            console.log('saveFile 2');

                dir.getFile(filename, {create:true}, function(file) {
//            console.log('saveFile 3');

//                    file.file(function(file) {
//            console.log('saveFile 4');

                        file.createWriter(function(fileWriter) {
        
//        fileWriter.seek(fileWriter.length);
        
                            var blob = new Blob([data], {type:'text/plain'});
                            fileWriter.write(blob);
                            fileWriter.onwriteend = function(){
                                if(cb) cb();
                            };
//                        console.log("ok, in theory i worked");
                        });          
*/
/*
                        // Corodva
                        function writeFinish() {
                            // ... your done code here...
                            return cb()
                        };
                        var written = 0;
                          var BLOCK_SIZE = 1*1024*1024; // write 1M every time of write
                          function writeNext(cbFinish) {
                            var sz = Math.min(BLOCK_SIZE, data.length - written);
                            var sub = data.slice(written, written+sz);
                            writer.write(sub);
                            written += sz;
                            writer.onwrite = function(evt) {
                              if (written < data.length)
                                writeNext(cbFinish);
                              else
                                cbFinish();
                            };
                          }
                          writeNext(writeFinish);
                        }
*/                        
//                     });
//                });
//            });
        } else {
        	if(isIE() == 9) {
        		// Solution was taken from 
        		// http://megatuto.com/formation-JAVASCRIPT.php?JAVASCRIPT_Example=Javascript+Save+CSV+file+in+IE+8/IE+9+without+using+window.open()+Categorie+javascript+internet-explorer-8&category=&article=7993
//				var URI = 'data:text/plain;charset=utf-8,';

				// Prepare data
				var ndata = data.replace(/\r\n/g,'&#A;&#D;');
				ndata = ndata.replace(/\n/g,'&#D;');
				ndata = ndata.replace(/\t/g,'&#9;');
				var testlink = window.open("about:blank", "_blank");
				testlink.document.write(ndata); //fileData has contents for the file
				testlink.document.close();
				testlink.document.execCommand('SaveAs', false, path);
				testlink.close();         		
        	} else {
	            var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
	            saveAs(blob, path);
	            if(cb) res = cb(res);                		
        	}
        }
    };

    return res;
};

/** 
    @function Is this IE9 
    @return {boolean} True for IE9 and false for other browsers

    For IE9 compatibility issues
*/
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}


// For LOAD
// var saveBinaryFile = utils.saveFile = function(path, data, cb) {
//     if(typeof exports == 'object') {
//         // For Node.js
//         var fs = require('fs');
//         var data = fs.writeFileSync(path,data);
//     } else {
//         var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
//         saveAs(blob, path);        
//     }
// };


// Fast hash function

/**
  @function Hash string to integer number
  @param {string} str Source string
  @return {integer} hash number
*/

var hash = utils.hash = function hash(str){
    var h = 0;
    if (str.length == 0) return h;
    for (var i = 0; i < str.length; i++) {
        h = ((h<<5)-h)+str.charCodeAt(i);
        h = h & h; 
   	}
    return h;
};

/**
    Union arrays
    @function
    @param {array} a
    @param {array} b
    @return {array}
*/
var arrayUnion = utils.arrayUnion = function (a,b) {
    var r = b.slice(0);
    a.forEach(function(i) { if (r.indexOf(i) < 0) r.push(i); });
    return r;
};

/** 
 Array Difference
 */
var arrayDiff = utils.arrayDiff  = function (a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

/**
  Arrays deep intersect (with records)
 */
var arrayIntersect = utils.arrayIntersect  = function(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;
        
        b.forEach(function(bi){
            found = found || (ai==bi);
        });

        if(found) {
            r.push(ai); 
        }
    });
    return r;
};


/**
  Arrays deep union (with records)
 */
var arrayUnionDeep = utils.arrayUnionDeep = function (a,b) {
    var r = b.slice(0);
    a.forEach(function(ai) {
        var found = false;
        
        r.forEach(function(ri){
//            found = found || equalDeep(ai, ri, true);
            found = found || deepEqual(ai, ri);
        });

        if(!found) {
            r.push(ai); 
        }
    });
    return r;
};

/**
  Arrays deep union (with records)
 */
var arrayExceptDeep = utils.arrayExceptDeep = function (a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;
        
        b.forEach(function(bi){
//            found = found || equalDeep(ai, bi, true);
            found = found || deepEqual(ai, bi);
        });

        if(!found) {
            r.push(ai); 
        }
    });
    return r;
};

/**
  Arrays deep intersect (with records)
 */
var arrayIntersectDeep = utils.arrayIntersectDeep  = function(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;
        
        b.forEach(function(bi){
//            found = found || equalDeep(ai, bi, true);
            found = found || deepEqual(ai, bi, true);
        });

        if(found) {
            r.push(ai); 
        }
    });
    return r;
};

/** 
  Deep clone obects
 */
var cloneDeep = utils.cloneDeep = function cloneDeep(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = cloneDeep(obj[key]);
        }
    }
    return temp;
}

/**
  Check equality of objects
*/
var equalDeep = utils.equalDeep = function equalDeep (x, y, deep) {
    if (deep) {
        if (x == y) return true;

        var p;
        for (p in y) {
            if (typeof (x[p]) == 'undefined') { return false; }
        }

        for (p in y) {
            if (y[p]) {
                switch (typeof (y[p])) {
                    case 'object':
                        if (!equalDeep(y[p],x[p])) { return false; } break;
                    case 'function':
                        if (typeof (x[p]) == 'undefined' ||
                  (p != 'equals' && y[p].toString() != x[p].toString()))
                            return false;
                        break;
                    default:
                        if (y[p] != x[p]) { return false; }
                }
            } else {
                if (x[p])
                    return false;
            }
        }

        for (p in x) {
            if (typeof (y[p]) == 'undefined') { return false; }
        }

        return true;
    }
    return x == y;
};

/**
  COmpare two object in deep
 */
var deepEqual = utils.deepEqual = function (x, y) {
  if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop))
      {  
        if (! deepEqual(x[prop], y[prop]))
          return false;
      }
      else
        return false;
    }

    return true;
  }
  else if (x !== y)
    return false;
  else
    return true;
}


/**
    Array with distinct records
    @param {array} data
    @return {array}
*/
var distinctArray = utils.distinctArray = function(data) {
    var uniq = {};
    // TODO: Speedup, because Object.keys is slow
    for(var i=0,ilen=data.length;i<ilen;i++) {
        if(typeof data[i] == 'object') {
            var uix = Object.keys(data[i]).sort().map(function(k){return k+'`'+data[i][k]}).join('`');
        } else {
            var uix = data[i];  
        }
        uniq[uix] = data[i];
    };
    var res = [];
    for(var key in uniq) res.push(uniq[key]);
    return res;
}


/** 
    Extend object a with properties of b
    @function 
    @param {object} a
    @param {object} b
    @return {object}
*/
var extend = utils.extend = function extend (a,b){
    if(typeof a == 'undefined') a = {};
    for(var key in b) {
        if(b.hasOwnProperty(key)) {
            a[key] = b[key]
        }
    }
    return a;
};;

/**
   Flat array by first row
 */
var flatArray = utils.flatArray = function(a) {
//console.log(684,a);
    if(!a || a.length == 0) return [];

    // For recordsets
    if(typeof a == 'object' && a instanceof alasql.Recordset) {
        return a.data.map(function(ai){return ai[a.columns[0].columnid]});
    }
    // Else for other arrays
    var key = Object.keys(a[0])[0];
    if(typeof key == 'undefined') return [];
    return a.map(function(ai) {return ai[key]});
};

/**
  Convert array of objects to array of arrays
 */
var arrayOfArrays = utils.arrayOfArrays = function (a) {
    return a.map(function(aa){
        var ar = [];
        for(var key in aa) ar.push(aa[key]);
        return ar;
    });
};

/**
    Excel:convert number to Excel column, like 1 => 'A'
    @param {integer} i Column number, starting with 0
    @return {string} Column name, starting with 'A'
*/

var xlsnc = utils.xlsnc = function(i) {
    var addr = String.fromCharCode(65+i%26);
    if(i>=26) {
        i=((i/26)|0)-1;
        addr = String.fromCharCode(65+i%26)+addr;
        if(i>26) {
            i=((i/26)|0)-1;
            addr = String.fromCharCode(65+i%26)+addr;
        };
    };
    return addr;
};

/**
    Excel:conver Excel column name to number
    @param {string} s Column number, like 'A' or 'BE'
    @return {string} Column name, starting with 0
*/
var xlscn = utils.xlscn = function(s) {
    var n = s.charCodeAt(0)-65;
    if(s.length>1) {
        n = (n+1)*26+s.charCodeAt(1)-65;
//        console.log(n, s.charCodeAt(0)-65, s.charCodeAt(1)-65);
        if(s.length>2) {
            n = (n+1)*26+s.charCodeAt(2)-65;
        }
    }
    return n;
};

var domEmptyChildren = utils.domEmptyChildren = function (container){
  var len = container.childNodes.length;
  while (len--) {
    container.removeChild(container.lastChild);
  };
};



/**
 	Strip all comments.
 	@function
 	@param {string} str
 	@return {string}
 	Based om the https://github.com/lehni/uncomment.js/blob/master/uncomment.js
 	I just replaced JavaScript's '//' to SQL's '--' and remove other stuff
 
 	@todo Fixed [aaa/*bbb] for column names
 	@todo Bug if -- comments in the last line
	@todo Check if it possible to model it with Jison parser
	@todo Remove unused code
 */

alasql.utils.uncomment = function uncomment(str) {
	// Add some padding so we can always look ahead and behind by two chars
	str = ('__' + str + '__').split('');
	var quote = false,
		quoteSign,
		// regularExpression = false,
		// characterClass = false,
		blockComment = false,
		lineComment = false;
		// preserveComment = false;

	for (var i = 0, l = str.length; i < l; i++) {
//		console.log(i,str[i]);
		// When checking for quote escaping, we also need to check that the
		// escape sign itself is not escaped, as otherwise '\\' would cause
		// the wrong impression of an unclosed string:
		var unescaped = str[i - 1] !== '\\' || str[i - 2] === '\\';

		if (quote) {
			if (str[i] === quoteSign && unescaped)
				quote = false;
		// } else if (regularExpression) {
			// Make sure '/'' inside character classes is not considered the end
			// of the regular expression.
			// if (str[i] === '[' && unescaped) {
			// 	characterClass = true;
			// } else if (str[i] === ']' && unescaped && characterClass) {
			// 	characterClass = false;
			// } else if (str[i] === '/' && unescaped && !characterClass) {
			// 	regularExpression = false;
			// }
		} else if (blockComment) {
			// Is the block comment closing?
			if (str[i] === '*' && str[i + 1] === '/') {
				// if (!preserveComment)
					str[i] = str[i + 1] = '';
				blockComment /* = preserveComment*/ = false;
				// Increase by 1 to skip closing '/', as it would be mistaken
				// for a regexp otherwise
				i++;
			} else { //if (!preserveComment) {
				str[i] = '';
			}
		} else if (lineComment) {
			// One-line comments end with the line-break
			if (str[i + 1] == '\n' || str[i + 1] == '\r')
				lineComment = false;
			str[i] = '';
		} else {
			if (str[i] == '"' || str[i] == "'") {
				quote = true;
				quoteSign = str[i];
			} else if (str[i] == '[' && str[i-1] != "@") {
				quote = true;
				quoteSign = ']';
			// } else if (str[i] === '-' &&  str[i + 1] === '-') {
			// 	str[i] = '';
			// 	lineComment = true;
			} else if (str[i] === '/' && str[i + 1] === '*') {
					// Do not filter out conditional comments /*@ ... */
					// and comments marked as protected /*! ... */
//					preserveComment = /[@!]/.test(str[i + 2]);
//					if (!preserveComment)
						str[i] = '';
					blockComment = true;
//					console.log('block');
				// } else if (str[i + 1] === '/') {
				// 	str[i] = '';
				// 	lineComment = true;
				// } else {
					// We need to make sure we don't count normal divisions as
					// regular expresions. Matching this properly is difficult,
					// but if we assume that normal division always have a space
					// after /, a simple check for white space or '='' (for /=)
					// is enough to distinguish divisions from regexps.
					// TODO: Develop a proper check for regexps.
					// if (!/[\s=]/.test(str[i + 1])) {
					// 	regularExpression = true;
					// }
				// }
			}
		}
	}
	// Remove padding again.
	str = str.join('').slice(2, -2);

/*
	// Strip empty lines that contain only white space and line breaks, as they
	// are left-overs from comment removal.
	str = str.replace(/^[ \t]+(\r\n|\n|\r)/gm, function(all) {
		return '';
	});
	// Replace a sequence of more than two line breaks with only two.
	str = str.replace(/(\r\n|\n|\r)(\r\n|\n|\r)+/g, function(all, lineBreak) {
		return lineBreak + lineBreak;
	});
*/
	return str;
};

/**
	Database class for Alasql.js
*/


// Initial parameters

/**
	Jison parser
*/
alasql.parser = parser;

/**
 	Jison parser
 	@param {string} sql SQL statement
 	@return {object} AST (Abstract Syntax Tree)

 	@todo Create class AST
 	@todo Add other parsers

 	@example
 	alasql.parse = function(sql) {
		// My own parser here
 	}
 */
alasql.parse = function(sql) {
	return parser.parse(alasql.utils.uncomment(sql));
}; 

/**
 	List of engines of external databases
 	@type {object}
 	@todo Create collection type
 */
alasql.engines = {};

/**
 	List of databases
 	@type {object}
 */
alasql.databases = {};

/** 
	Number of databases 
	@type {number}
*/
alasql.databasenum = 0; 

/**
 	Alasql options object
 */
alasql.options = {};
alasql.options.errorlog = false; // Log or throw error
alasql.options.valueof = false; // Use valueof in orderfn
alasql.options.dropifnotexists = false; // DROP database in any case
alasql.options.datetimeformat = 'sql'; // How to handle DATE and DATETIME types
								// Another value is 'javascript'
alasql.options.casesensitive = true; // Table and column names are case sensitive and converted to lower-case
alasql.options.logtarget = 'output'; // target for log. Values: 'console', 'output', 'id' of html tag
alasql.options.logprompt = true; // Print SQL at log

// Default modifier
// values: RECORDSET, VALUE, ROW, COLUMN, MATRIX, TEXTSTRING, INDEX
alasql.options.modifier = undefined; 
// How many rows to lookup to define columns
alasql.options.columnlookup = 10; 
// Create vertex if not found
alasql.options.autovertex = true;

// Use dbo as current database (for partial T-SQL comaptibility)
alasql.options.usedbo = true;

// AUTOCOMMIT ON | OFF
alasql.options.autocommit = true;

// Use cache
alasql.options.cache = true;

// Compatibility flags
alasql.options.tsql = true;
alasql.options.mysql = true;
alasql.options.postgres = true;
alasql.options.oracle = true;
alasql.options.sqlite = true;
alasql.options.orientdb = true;

// for SET NOCOUNT OFF
alasql.options.nocount = false;

// Check for NaN and convert it to undefined
alasql.options.nan = false;

//alasql.options.worker = false;
// Variables
alasql.vars = {};
alasql.declares = {};


alasql.prompthistory = [];

alasql.plugins = {}; // If plugin already loaded

alasql.from = {}; // FROM functions
alasql.into = {}; // INTO functions

alasql.fn = {};
alasql.aggr = {};

alasql.busy = 0;

// Cache
alasql.MAXSQLCACHESIZE = 10000;
alasql.DEFAULTDATABASEID = 'alasql';

/* WebWorker */
alasql.lastid = 0;
alasql.buffer = {};

/**
  Select current database
  @param {string} databaseid Selected database identificator
 */
alasql.use = function (databaseid) {
	if(!databaseid) databaseid = alasql.DEFAULTDATABASEID;
	if(alasql.useid == databaseid) return;
	alasql.useid = databaseid;
	var db = alasql.databases[alasql.useid];
	alasql.tables = db.tables;
//	alasql.fn = db.fn;
	db.resetSqlCache();
	if(alasql.options.usedbo) {
	    alasql.databases.dbo = db; // Operator???
	}

};

// Run one statement
/**
 Run SQL statement on current database
 */
alasql.exec = function (sql, params, cb, scope) {
	delete alasql.error;
	if(typeof params == 'undefined') params = {}; // Added for $variables
	if(alasql.options.errorlog){
		try {
			return alasql.dexec(alasql.useid, sql, params, cb, scope);
		} catch(err){
			alasql.error = err;
			if(cb) cb(null,alasql.error);
		}
	} else {
		return alasql.dexec(alasql.useid, sql, params, cb, scope);
	}
}

/**
 Run SQL statement on specific database
 */
alasql.dexec = function (databaseid, sql, params, cb, scope) {
	var db = alasql.databases[databaseid];
//	if(db.databaseid != databaseid) console.trace('got!');
//	console.log(3,db.databaseid,databaseid);
	
	// Create hash
	if(alasql.options.cache) {
		var hh = hash(sql);
		var statement = db.sqlCache[hh];
		// If database structure was not changed sinse lat time return cache
		if(statement && db.dbversion == statement.dbversion) {
			return statement(params, cb);
		}
	}

	// Create AST
	var ast = alasql.parse(sql);
	if(!ast.statements) return;
	if(ast.statements.length == 0) return 0;
	else if(ast.statements.length == 1) {
		if(ast.statements[0].compile) {

// Compile and Execute
			var statement = ast.statements[0].compile(databaseid);
			if(!statement) return;
			statement.sql = sql;
			statement.dbversion = db.dbversion;
			
			if(alasql.options.cache) {
				// Secure sqlCache size
				if (db.sqlCacheSize > alasql.MAXSQLCACHESIZE) {
					db.resetSqlCache();
				}
				db.sqlCacheSize++;
				db.sqlCache[hh] = statement;
			}
			var res = alasql.res = statement(params, cb, scope);
			return res;
			
		} else {
//			console.log(ast.statements[0]);
			alasql.precompile(ast.statements[0],alasql.useid,params);
			var res = alasql.res = ast.statements[0].execute(databaseid, params, cb, scope);		
			return res;
		}
	} else {
		// Multiple statements
		if(cb) {
			alasql.adrun(databaseid, ast, params, cb, scope);
		} else {
			return alasql.drun(databaseid, ast, params, cb, scope);
		}
	}
};

/**
  Run multiple statements and return array of results sync
 */
alasql.drun = function (databaseid, ast, params, cb, scope) {
	var useid = alasql.useid;
	if(useid != databaseid) alasql.use(databaseid);
	var res = [];
	for (var i=0, ilen=ast.statements.length; i<ilen; i++) {
		if(ast.statements[i]) {
			if(ast.statements[i].compile) { 
				var statement = ast.statements[i].compile(alasql.useid);
				res.push(alasql.res = statement(params,null,scope));
			} else {
				alasql.precompile(ast.statements[i],alasql.useid,params);
				res.push(alasql.res = ast.statements[i].execute(alasql.useid, params));
			}		
		}
	};
	if(useid != databaseid) alasql.use(useid);
	if(cb) cb(res);
	alasql.res = res;
	return res;
};

/**
  Run multiple statements and return array of results async
 */
alasql.adrun = function (databaseid, ast, params, cb, scope) {
//	alasql.busy++;
	var useid = alasql.useid;
	if(useid != databaseid) alasql.use(databaseid);
	var res = [];

	adrunone(); /** @todo Check, why data is empty here */

	function adrunone(data) {
		if(typeof data != 'undefined') res.push(data);
		var astatement = ast.statements.shift();
		if(!astatement) {
			if(useid != databaseid) alasql.use(useid);
			cb(res);
//			alasql.busy--;
//			if(alasql.busy<0) alasql.busy = 0;
		} else {
			if(astatement.compile) {
				var statement = astatement.compile(alasql.useid);
				statement(params, adrunone, scope);
			} else {
				alasql.precompile(ast.statements[0],alasql.useid,params);
				astatement.execute(alasql.useid, params, adrunone);
			}
		}
	}
};



/**
 Compile statement to JavaScript function
 @param {string} sql SQL statement
 @param {string} databaseid Database identificator
 @return {functions} Compiled statement functions
*/
alasql.compile = function(sql, databaseid) {
	if(!databaseid) databaseid = alasql.useid;
	var ast = alasql.parse(sql); // Create AST
	if(ast.statements.length == 1) {
		return ast.statements[0].compile(databaseid);
/*		
		if(kind == 'value') {
			return function(params,cb) {
				var res = statementfn(params);
				var key = Object.keys(res[0])[0];
				if(cb) cb(res[0][key]);
				return res[0][key];
			};
		} else  if(kind == 'single') {
			return function(params,cb) {
				var res = statementfn(params);
				if(cb) cb(res[0]);
				return res[0];
			}
		} else  if(kind == 'row') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				var a = [];
				for(var key in res[0]) {
					a.push(res[0][key]);
				};
				if(cb) cb(a);
				return a;
			}
		} else  if(kind == 'column') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				var ar = [];
				var key = Object.keys(res)[0];
				for(var i=0, ilen=res.length; i<ilen; i++){
					ar.push(res[i][key]);
				}
				if(cb) cb(ar);
				return ar;
			}
		} else if(kind == 'array') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				res = flatArray(res);
				if(cb) cb(res);
				return res;
			};
		} else if(kind == 'matrix') {
			return function(params,cb) {
				var res = statementfn(params,cb);
				res = arrayOfArrays(res);
				if(cb) cb(res);
				return res;
			};				
		} else if(kind == 'collection') {
			return statementfn;
		} else {
			return statementfn;
		}
*/
	} else {
		throw new Error('Cannot compile, because number of statments in SQL is not equal to 1');
	}
}

// // Default methods to exec SQL statements
// alasql.run = alasql.exec = function (sql, params, cb) {
// 	return this.currentDatabase.exec(sql, params, cb);
// };

// Promised version of exec
// alasql.aexec = function (sql, params) {
// 	var self = this;
// 	return new Promise(function(resolve, reject){
// 		self.exec(sql,params,resolve);
// 	});
// };


/*
// MSSQL-Like aliases
alasql.query = function (sql, params, cb) {
	var res = this.exec(sql, params);
	if(cb) cb(res);
	return res;	
};

alasql.queryArray = function (sql, params, cb) {
	var res = flatArray(this.exec(sql, params));
	if(cb) cb(res);
	return res;
};

alasql.querySingle = function (sql, params, cb) {
	var res = this.exec(sql, params)[0];
	if(cb) cb(res);
	return res;
};

alasql.queryRow = function (sql, params, cb) {
	var res = this.querySingle(sql, params);
	var a = [];
	for(var key in res) {
		a.push(res[key]);
	};
	if(cb) cb(a);
	return a;
};

alasql.queryValue = function (sql, params, cb) {
	var res = this.exec(sql, params)[0];
	var val = res[Object.keys(res)[0]];
	if(cb) cb(val);
	return val;
	// TODO Refactor to query.columns
};

alasql.queryArrayOfArrays = function (sql, params, cb) {
	var res = this.exec(sql, params);
	var keys = Object.keys(res[0]);
	var klen = keys.length;
	var aa = [];
	for(var i=0, ilen=res.length;i<ilen;i++) {
		var r = res[i];
		var a = [];
		for(var k=0; k<klen;k++){
			a.push(r[keys[k]]);
		}
		aa.push(a);
	}

	if(cb) cb(aa);
	return aa;
};
*/
/*alasql.queryColumn = function (sql, params, cb) {
	var res = this.exec(sql, params);
	var keys = Object.keys(res[0]);
	var klen = keys.length;
	var aa = [];
	for(var i=0, ilen=res.length;i<ilen;i++) {
		var r = res[i];
		var a = [];
		for(var k=0; k<klen;k++){
			a.push(r[keys[k]]);
		}
		aa.push(a);
	}

	if(cb) cb(aa);
	return aa;
};
*/
/*
alasql.value = alasql.queryValue;
alasql.single = alasql.querySingle;
alasql.row = alasql.queryRow;
alasql.column = alasql.queryArray;
alasql.array = alasql.queryArray;
alasql.matrix = alasql.queryArrayOfArrays;
*/

//
// Promises for AlaSQL
//

if(typeof exports == 'object') {
	var Promise = require('es6-promise').Promise;
} 

//
// Only for browsers with Promise support
//

if(typeof Promise == 'function') {
	alasql.promise = function(sql, params) {
	    return new Promise(function(resolve, reject){
	        alasql(sql, params, function(data,err) {
	             if(err) {
	                 reject(err);
	             } else {
	                 resolve(data);
	             }
	        });
	    });
	};	
}
/*
//
// Database class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Main Database class

/**
    @class Database 
 */

var Database = alasql.Database = function (databaseid) {
	var self = this;
	if(self === alasql) {
		if(databaseid) {
//			if(alasql.databases[databaseid]) {
				self = alasql.databases[databaseid];
//			} else {
				alasql.databases[databaseid] = self;
//			}
			if(!self) {
				throw new Error('Database "'+databaseid+'" not found');
			}
		} else {
			// Create new database (or get alasql?)
			self = alasql.databases.alasql;
			// For SQL Server examples, USE tempdb
			if(alasql.options.tsql) alasql.databases.tempdb = alasql.databases.alasql;
//			self = new Database(databaseid); // to call without new
		}
	}
	if(!databaseid) {
		databaseid = "db"+(alasql.databasenum++); // Random name
	};
	self.databaseid = databaseid;
	alasql.databases[databaseid] = self;
	self.tables = {};
	self.views = {};

	// Objects storage
	self.objects = {};
	self.counter = 0;

	self.indices = {};
//	self.fn = {};
	self.resetSqlCache();
	self.dbversion = 0;
	return self;
};


/**
    Reset SQL statements cache
 */

Database.prototype.resetSqlCache = function () {
	this.sqlCache = {}; // Cache for compiled SQL statements
	this.sqlCacheSize = 0;	
}


// // Main SQL function

/**
    Run SQL statement on database
    @param {string} sql SQL statement
    @param [object] params Parameters
    @param {function} cb callback
 */

Database.prototype.exec = function(sql, params, cb) {
	return alasql.dexec(this.databaseid, sql, params, cb);
};

// 	// Compile
// 	var statement = this.compile(sql);
// 	// Run
// 	if(statement) {
// 		var data = statement(params, cb);
// 		return data;
// 	}
// 	return;
// };

// // Async version of exec


// Database.prototype.aexec = function(sql, params) {
// 	var self = this;
// 	return new Promise(function(resolve, reject){
// 		alasql.dexec(this.databaseid,sql,params,resolve);
// 	});
// };


// Aliases like MS SQL
/*
Database.prototype.query = Database.prototype.exec;
Database.prototype.run = Database.prototype.exec;
Database.prototype.queryArray = function(sql, params, cb) {
	return flatArray(this.exec(sql, params, cb));
}

Database.prototype.queryArrayOfArrays = function(sql, params, cb) {
	return arrayOfArrays(this.exec(sql, params, cb));
}

Database.prototype.querySingle = function(sql, params, cb) {
	return this.exec(sql, params, cb)[0];
}
Database.prototype.queryValue = function(sql, params, cb) {
	var res = this.querySingle(sql, params, cb);
	return res[Object.keys(res)[0]];
}

Database.prototype.value  = Database.prototype.queryValue;
Database.prototype.row    = Database.prototype.querySingle;
Database.prototype.array  = Database.prototype.queryArray;
Database.prototype.matrix = Database.prototype.queryArrayOfArrays;


// Compile statements
Database.prototype.compile = function(sql, kind) {
	return alasql.compile(sql, kind, databaseid);
};

*/
// 	var self = this;
// 	var hh = hash(sql);

// 	// Check cache with hash of SQL statement
// 	var statement = this.sqlcache[hh];
// 	if(!statement) {

// 		// If not fount, then compile it
// 		var ast = alasql.parse(sql);
// 		// Save to cache

// 		statement = this.sqlcache[hh]= ast.compile(self);

// 		// Memory leak prevention 
// 		this.sqlcachesize++;
// 		if(this.sqlcachesize > alasql.MAXSQLCACHESIZE) {
// 			this.resetSqlCache();
// 		}
// 	};
// 	return statement;
// }

// SQL.js compatibility method
//Database.prototype.prepare = Database.prototype.compile;


// Added for compatibility with WebSQL




/*
//
// Transactio class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/


Database.prototype.transaction = function(cb) {
	var tx = new alasql.Transaction(this.databaseid);
	var res = cb(tx);
	return res;
};

// Transaction class (for WebSQL compatibility)

/** 
 Transaction class
 @class Transaction
 */

var Transaction = alasql.Transaction = function (databaseid) {
	this.transactionid = Date.now();
	this.databaseid = databaseid;
	this.commited = false; 
	this.dbversion = alasql.databases[databaseid].dbversion;
//	this.bank = cloneDeep(alasql.databases[databaseid]);
	this.bank = JSON.stringify(alasql.databases[databaseid]);
	// TODO CLone Tables with insertfns
//	console.log(this);
	return this;
};

// Main class 


// Commit

/**
 Commit transaction
 */
Transaction.prototype.commit = function() {
	this.commited = true;
	alasql.databases[this.databaseid].dbversion = Date.now();
	delete this.bank;
};

// Rollback
/**
 Rollback transaction
 */
Transaction.prototype.rollback = function() {
	if(!this.commited) {
		alasql.databases[this.databaseid] = JSON.parse(this.bank);
		// alasql.databases[this.databaseid].tables = this.bank;
		// alasql.databases[this.databaseid].dbversion = this.dbversion;
		delete this.bank;
	} else {
		throw new Error('Transaction already commited');
	}
};

// Transactions stub

/**
 Execute SQL statement
 @param {string} sql SQL statement
 @param {object} params Parameters
 @param {function} cb Callback function 
 @return result
 */
Transaction.prototype.exec = function(sql, params, cb) {
//	console.log(this.databaseid);
	return alasql.dexec(this.databaseid,sql,params,cb);
};

Transaction.prototype.executeSQL = Transaction.prototype.exec;

/*
Transaction.prototype.query = Database.prototype.exec;
Transaction.prototype.run = Database.prototype.exec;
Transaction.prototype.queryArray = function(sql, params, cb) {
	return flatArray(this.exec(sql, params, cb));
}

Transaction.prototype.queryArrayOfArrays = function(sql, params, cb) {
	return arrayOfArrays(this.exec(sql, params, cb));
}

Transaction.prototype.querySingle = function(sql, params, cb) {
	return this.exec(sql, params, cb)[0];
}
Transaction.prototype.queryValue = function(sql, params, cb) {
	var res = this.querySingle(sql, params, cb);
	return res[Object.keys(res)[0]];
}
*/

/*
//
// Table class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class
var Table = alasql.Table = function(params){

	// Columns
	this.columns = [];
	this.xcolumns = {};
	// Data array
	this.data = [];

	this.inddefs = {};
	this.indices = {};

	this.uniqs = {};
	this.uniqdefs = {};	

	extend(this,params);
};


// View = function(){
// 	this.data = [];
// 	this.columns = [];
// 	this.ixcolumns = {};
// 	this.ixdefs = {};
// 	this.indices = {};
// };

// alasql.View = View;

Table.prototype.indexColumns = function() {
	var self = this;
	self.xcolumns = {};
	self.columns.forEach(function(col){
		self.xcolumns[col.columnid] = col;
	});	
}



/*
//
// View class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class
var View = alasql.View = function(params){
	// Columns
	this.columns = [];
	this.xcolumns = {};
	// Data array
	this.query = [];

	extend(this,params);
};

// View = function(){
// 	this.data = [];
// 	this.columns = [];
// 	this.ixcolumns = {};
// 	this.ixdefs = {};
// 	this.indices = {};
// };

// alasql.View = View;



/*
//
// Query class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class

/**
 @class Query Main query class
 */
var Query = alasql.Query = function(params){
	this.alasql = alasql;
//	console.log(12,alasql);
	// Columns
	this.columns = [];
	this.xcolumns = {};
	this.selectGroup = [];
	this.groupColumns = {};
	// Data array
	extend(this,params);
};

/**
 @class Recordset data object
 */
var Recordset = alasql.Recordset = function(params){
	// Data array
	extend(this,params);
};


// View = function(){
// 	this.data = [];
// 	this.columns = [];
// 	this.ixcolumns = {};
// 	this.ixdefs = {};
// 	this.indices = {};
// };

// alasql.View = View;



/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

var yy = parser.yy = alasql.yy = {};

// Utility
yy.extend = extend;
// Option for case sensitive
yy.casesensitive = alasql.options.casesensitive; 

// Base class for all yy classes
var Base = yy.Base = function (params) { return yy.extend(this, params); };

Base.prototype.toString = function() {}
Base.prototype.toType = function() {}
Base.prototype.toJavaScript = function() {}

//var BaseClause = yy,BaseClause = function (params) { return yy.extend(this, params); };
Base.prototype.compile = returnUndefined;
Base.prototype.exec = function() {}

//var BaseStatement = yy,BaseStatement = function (params) { return yy.extend(this, params); };
Base.prototype.compile = returnUndefined;
Base.prototype.exec = function() {}



/*
//
// Statements class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Statements container
yy.Statements = function(params) { return yy.extend(this, params); };

yy.Statements.prototype.toString = function () {
	return this.statements.map(function(st){return st.toString()}).join(';'+NL());
};

// Compile array of statements into single statement
yy.Statements.prototype.compile = function(db) {
	var statements = this.statements.map(function(st){
		return st.compile(db)
	});
	if(statements.length == 1) {
		return statements[0];	
	} else {
		return function(params, cb){
			var res = statements.map(function(st){ return st(params); });
			if(cb) cb(res);
			return res;
		}
	}
};


/* global alasql */
/* global yy */
/*
//
// SEARCH for Alasql.js
// Date: 04.05.2015
// (c) 2015, Andrey Gershun
//
*/

/**	
	Search class
	@class
	@example
	SEARCH SUM(/a) FROM ? -- search over parameter object
*/

yy.Search = function (params) { return yy.extend(this, params); }
yy.Search.prototype.toString = function () {
	var s = K('SEARCH') + ' ';
	if (this.selectors) s += this.selectors.toString();
	if (this.from) s += K('FROM') + ' ' + this.from.toString();
//console.log(s);
	return s;
};

yy.Search.prototype.toJavaScript = function(context, tableid, defcols) {
//		console.log('yy.CreateVertex.toJavaScript');
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	// var s = '';
	return s;
};

yy.Search.prototype.compile = function(databaseid) {
	var dbid = databaseid;
	var self = this;

	var statement = function(params,cb){
				// console.log(31,self);
				// console.log(32,arguments);
		var res;
		doSearch.bind(self)(dbid,params,function(data){
			// console.log(35,data);
			res = modify(statement.query,data);
			// console.log(37,data);
			if(cb) res = cb(res);
		});
			// console.log(39,res);
//		if(cb) res = cb(res);
		return res;
	};
	statement.query = {};
	return statement;
};


function doSearch (databaseid, params, cb) {
	var res;
	var stope = {};
	var fromdata;
	var selectors = cloneDeep(this.selectors);

	if(typeof selectors != 'undefined' && selectors.length > 0) {

//			console.log(selectors[0].args[0].toUpperCase());
		if(selectors && selectors[0] && selectors[0].srchid == 'PROP' && selectors[0].args && selectors[0].args[0]) {
//			console.log(selectors[0].args[0]);
			if(selectors[0].args[0].toUpperCase() == 'XML') {
				stope.mode = 'XML';
				selectors.shift();
			} else if(selectors[0].args[0].toUpperCase() == 'HTML') {
				stope.mode = 'HTML';
				selectors.shift();
			} else if(selectors[0].args[0].toUpperCase() == 'JSON') {
				stope.mode = 'JSON';
				selectors.shift();
			}
		}
		if(selectors.length > 0 && selectors[0].srchid == 'VALUE') {
			stope.value = true;
			selectors.shift();
		}
	};

	
	if(this.from instanceof yy.Column) {
		var dbid = this.from.databaseid || databaseid;
		fromdata = alasql.databases[dbid].tables[this.from.columnid].data;
		//selectors.unshift({srchid:'CHILD'});
	} else if(this.from instanceof yy.FuncValue 
		&& alasql.from[this.from.funcid.toUpperCase()]) {
		var args = this.from.args.map(function(arg){
			var as = arg.toJavaScript();
//			console.log(as);
			var fn = new Function('params,alasql','var y;return '+as).bind(this);
			return fn(params,alasql);
		});
//		console.log(args);
		fromdata = alasql.from[this.from.funcid.toUpperCase()].apply(this,args);
//		console.log(92,fromdata);
	} else if(typeof this.from == 'undefined') {
		fromdata = alasql.databases[databaseid].objects;
	} else {

		var fromfn = new Function('params,alasql','var y;return '+this.from.toJavaScript());
		fromdata = fromfn(params,alasql);			
		// Check for Mogo Collections
		if(typeof Mongo == 'object' && typeof Mongo.Collection != 'object'
			&& fromdata instanceof Mongo.Collection) {
			fromdata = fromdata.find().fetch();
		}; 
//console.log(selectors,fromdata);
//		if(typeof fromdata == 'object' && fromdata instanceof Array) {
//			selectors.unshift({srchid:'CHILD'});					
//		}
	};
	
	// If source data is array than first step is to run over array
//	var selidx = 0;
//	var selvalue = fromdata;
	
	if(typeof selectors != 'undefined' && selectors.length > 0) {
		// Init variables for TO() selectors


if(false) {
		selectors.forEach(function(selector){
			if(selector.srchid == 'TO') {  //* @todo move to TO selector
				alasql.vars[selector.args[0]] = [];
				// TODO - process nested selectors
			}
		});
}

		res = processSelector(selectors,0,fromdata);
	} else {
		res = fromdata; 	
	}
	
	if(this.into) {
		var a1,a2;
		if(typeof this.into.args[0] != 'undefined') {
			a1 = new Function('params,alasql','var y;return '
				 +this.into.args[0].toJavaScript())(params,alasql);
		}
		if(typeof this.into.args[1] != 'undefined') {
				a2 =  new Function('params,alasql','var y;return '
				 +this.into.args[1].toJavaScript())(params,alasql);
		}
		res = alasql.into[this.into.funcid.toUpperCase()](a1,a2,res,[],cb);
	} else {
		if(stope.value && res.length > 0) res = res[0];
		if (cb) res = cb(res);
	}
	return res;
	
	function processSelector(selectors,sidx,value) {
//		var val;
/*		if(sidx == 0) {
			if(selectors.length > 0 && selectors[0].srchid == 'SHARP') {
				val = alasql.databases[alasql.useid].objects[selectors[0].args[0]];
				return processSelector(selectors,sidx+1,val);
				//selectors.shift();			
			} else if(selectors.length > 0 && selectors[0].srchid == 'AT') {
				val = alasql.vars[selectors[0].args[0]];
				return processSelector(selectors,sidx+1,val);
				//selectors.shift();
			} else if(selectors.length > 0 && selectors[0].srchid == 'CLASS') {
				val = alasql.databases[databaseid].tables[selectors[0].args[0]].data;
				return processSelector(selectors,sidx+1,val);
				//selectors.shift();
				//selectors.unshift({srchid:'CHILD'});
			} else {

			}
		}
*/
		var sel = selectors[sidx];
//		console.log(sel);
//		if(!alasql.srch[sel.srchid]) {
//			throw new Error('Selector "'+sel.srchid+'" not found');
//		};
		
		var SECURITY_BREAK = 100000;

		if(sel.selid) {
			// TODO Process Selector
			if(sel.selid == 'PATH') {
				var queue = [{node:value,stack:[]}];
				var visited = {};
				var path = [];
				var objects = alasql.databases[alasql.useid].objects;
				while (queue.length > 0) {
					var q = queue.shift()
					var node = q.node;
					var stack = q.stack;
					var r = processSelector(sel.args,0,node);
					if(r.length > 0) {
						if(sidx+1+1 > selectors.length) {
							return stack;
						} else {
							var rv = [];
							if(stack && stack.length > 0) {
								stack.forEach(function(stv){
									rv = rv.concat(processSelector(selectors,sidx+1,stv));
								});								
							}
							return rv;							
//							return processSelector(selectors,sidx+1,stack);
						}
					} else {
						if(typeof visited[node.$id] != 'undefined') {
							continue;
						} else {
//							console.log(node.$id, node.$out);
							visited[node.$id] = true;
							if(node.$out && node.$out.length > 0) {
								node.$out.forEach(function(edgeid){
									var edge = objects[edgeid];
									var stack2 = stack.concat(edge);
									stack2.push(objects[edge.$out[0]]);
									queue.push({node:objects[edge.$out[0]],
										stack:stack2});
								});
							}
						}
					}
				}
				// Else return fail
				return [];
			} if(sel.selid == 'NOT') {
				var nest = processSelector(sel.args,0,value);
				//console.log(1,nest);
				if(nest.length>0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors,sidx+1,value);
					}
				}
			} else if(sel.selid == 'DISTINCT') {
				if(typeof sel.args == 'undefined' || sel.args.length == 0) {
					var nest = distinctArray(value);
				} else {
					var nest = processSelector(sel.args,0,value);
				}
				if(nest.length == 0) {
					return [];
				} else {
					var res = distinctArray(nest);
					if(sidx+1+1 > selectors.length) {
						return res;
					} else {
						return processSelector(selectors,sidx+1,res);
					}
				}
			} else if(sel.selid == 'AND') {
				var res = true;
				sel.args.forEach(function(se){
					res = res && (processSelector(se,0,value).length>0);
				});
				if(!res) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors,sidx+1,value);
					}
				}
			} else if(sel.selid == 'OR') {
				var res = false;
				sel.args.forEach(function(se){
					res = res || (processSelector(se,0,value).length>0);
				});
				if(!res) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors,sidx+1,value);
					}
				}
			} else if(sel.selid == 'ALL') {
				var nest = processSelector(sel.args[0],0,value);
				if(nest.length == 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors,sidx+1,nest);
					}
				}
			} else if(sel.selid == 'ANY') {
				var nest = processSelector(sel.args[0],0,value);
//				console.log(272,nest);
				if(nest.length == 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [nest[0]];
					} else {
						return processSelector(selectors,sidx+1,[nest[0]]);
					}
				}
			} else if(sel.selid == 'UNIONALL') {
				var nest = [];
				sel.args.forEach(function(se){
					nest = nest.concat(processSelector(se,0,value));
				});
				if(nest.length == 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors,sidx+1,nest);
					}
				}
			} else if(sel.selid == 'UNION') {
				var nest = [];
				sel.args.forEach(function(se){
					nest = nest.concat(processSelector(se,0,value));
				});
				var nest = distinctArray(nest);
				if(nest.length == 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors,sidx+1,nest);
					}
				}
			} else 	if(sel.selid == 'IF') {
				var nest = processSelector(sel.args,0,value);
				//console.log(1,nest);
				if(nest.length==0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors,sidx+1,value);
					}
				}
			} else 	if(sel.selid == 'REPEAT') {
//				console.log(352,sel.sels);
				var lmin = sel.args[0].value;
				if(!sel.args[1]) {
					var lmax = lmin; // Add security break
				} else {
					var lmax = sel.args[1].value;
				}
				if(sel.args[2]) {
					var lvar = sel.args[2].variable;
				} else {
					var lvar;
				}
				var lsel = sel.sels;
//				console.log(351,lmin,lmax,lvar);

				var retval = [];

				if (lmin == 0) {
					if(sidx+1+1 > selectors.length) {
						retval = [value];
					} else {
						if(lvar) alasql.vars[lvar] = 0;
						retval = retval.concat(processSelector(selectors,sidx+1,value));
					}
				}

//				console.log(364,retval);
//console.log(370,sel.sels);
					// var nests = processSelector(sel.sels,0,value).slice();
				if(lmax > 0) {
					var nests = [{value:value,lvl:1}];
						// if(lvl >= lmin) {
						// 	if(sidx+1+1 > selectors.length) {
						// 		retval = retval.concat(nests);
						// 	} else {
						// 		retval = retval.concat(processSelector(selectors,sidx+1,value));
						// 	}						
						// }
	//console.log(371,nests);
					var i = 0;
					while (nests.length > 0) {

						var nest = nests[0];
	//console.log(375,nest);
						nests.shift();
						if(nest.lvl <= lmax) {
							if(lvar) alasql.vars[lvar] = nest.lvl;
//		console.log(394,sel.sels);
							var nest1 = processSelector(sel.sels,0,nest.value);
//						console.log(397,nest1);
							nest1.forEach(function(n){
								nests.push({value:n,lvl:nest.lvl+1});
							});
							if(nest.lvl >= lmin) {
								if(sidx+1+1 > selectors.length) {
									retval = retval.concat(nest1);
									//return nests;
								} else {
									nest1.forEach(function(n){
										retval = retval.concat(processSelector(selectors,sidx+1,n));
									});
								}
							}
						}
						// Security brake
						i++;
						if(i>SECURITY_BREAK) {
							throw new Error('Security brake. Number of iterations = '+i);
						}
					};

				};
				return retval;

			} else 	if(sel.selid == 'TO') {
//				console.log(347,value,sel.args[0]);
				var oldv = alasql.vars[sel.args[0]];
				var newv = [];
				if(typeof oldv != 'undefined') {
//					console.log(353,typeof oldv);
					newv = oldv.slice(0);
//					console.log(429, oldv, newv);
				} else {
					newv = [];
				}
				newv.push(value);
				// console.log(428,oldv,newv, value);
				// console.log(435,sidx+1+1,selectors.length);
//				console.log(355,alasql.vars[sel.args[0]]);
				if(sidx+1+1 > selectors.length) {
					return [value];
				} else {
					alasql.vars[sel.args[0]] = newv;
					var r1 = processSelector(selectors,sidx+1,value);
//					console.log('r1 =',r1);
					alasql.vars[sel.args[0]] = oldv;
					return r1;
				}
/*

alasql.srch.TO = function(val,args) {
  console.log(args[0]);

  alasql.vars[args[0]].push(val);
  return {status: 1, values: [val]};
};

*/
			} else 	if(sel.selid == 'ARRAY') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					var val = nest;
				} else {
					return [];
				}
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'SUM') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					var val = nest.reduce(function(sum, current) {
	  					return sum + current;
					}, 0);					
				} else {
					return [];
				}
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'AVG') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					var val = nest.reduce(function(sum, current) {
	  					return sum + current;
					}, 0)/nest.length;
				} else {
					return [];
				}
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'COUNT') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					var val = nest.length;
				} else {
					return [];
				}
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'FIRST') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) var val = nest[0];
				else return [];
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'LAST') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) var val = nest[nest.length-1];
				else return [];
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'MIN') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length == 0) return [];
				var val = nest.reduce(function(min, current) {
  					return Math.min(min,current);
				}, Infinity);
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'MAX') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length == 0) return [];
				var val = nest.reduce(function(max, current) {
  					return Math.max(max,current);
				}, -Infinity);
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid == 'PLUS') {
				var retval = [];
//				retval = retval.concat(processSelector(selectors,sidx+1,n))
				var nests = processSelector(sel.args,0,value).slice();
				if(sidx+1+1 > selectors.length) {
					retval = retval.concat(nests);
				} else {
					nests.forEach(function(n){
						retval = retval.concat(processSelector(selectors,sidx+1,n));
					});
				}

				var i = 0;
				while (nests.length > 0) {
//					nest = nests[0];
//					nests.shift();
					var nest = nests.shift();
					
//					console.log(281,nest);
//					console.log(nest,nests);
					nest = processSelector(sel.args,0,nest);
//					console.log(284,nest);
//					console.log('nest',nest,'nests',nests);
					nests = nests.concat(nest);
//console.log(retval,nests);				

					if(sidx+1+1 > selectors.length) {
						retval = retval.concat(nest);
						//return retval;
					} else {
						nest.forEach(function(n){
//							console.log(293,n);
							var rn = processSelector(selectors,sidx+1,n);
//							console.log(294,rn, retval);
							retval = retval.concat(rn);
						});
					}

					// Security brake
					i++;
					if(i>SECURITY_BREAK) {
						throw new Error('Security brake. Number of iterations = '+i);
					}
				};
				return retval;
				//console.log(1,nest);
			} else 	if(sel.selid == 'STAR') {
				var retval = [];
				retval = processSelector(selectors,sidx+1,value);
				var nests = processSelector(sel.args,0,value).slice();
				if(sidx+1+1 > selectors.length) {
					retval = retval.concat(nests);
					//return nests;
				} else {
					nests.forEach(function(n){
						retval = retval.concat(processSelector(selectors,sidx+1,n));
					});
				}
				var i = 0;
				while (nests.length > 0) {
					var nest = nests[0];
					nests.shift();
//					console.log(nest,nests);
					nest = processSelector(sel.args,0,nest);
//					console.log('nest',nest,'nests',nests);
					nests = nests.concat(nest);

					if(sidx+1+1 > selectors.length) {
						//return nests;
					} else {
						nest.forEach(function(n){
							retval = retval.concat(processSelector(selectors,sidx+1,n));
						});
					}

					// Security brake
					i++;
					if(i>SECURITY_BREAK) {
						throw new Error('Security brake. Number of iterations = '+i);
					}
				};

				return retval;
			} else 	if(sel.selid == 'QUESTION') {
				var retval = [];
				retval = retval.concat(processSelector(selectors,sidx+1,value))
				var nest = processSelector(sel.args,0,value);
				if(sidx+1+1 > selectors.length) {
					//return nests;
				} else {
					nest.forEach(function(n){
						retval = retval.concat(processSelector(selectors,sidx+1,n));
					});
				}
				return retval;
			} else if(sel.selid == 'WITH') {
				var nest = processSelector(sel.args,0,value);
//				console.log('WITH',nest);
				if(nest.length==0) {
					return [];
				} else {
					// if(sidx+1+1 > selectors.length) {
					// 	return [nest];
					// } else {
					// 	return processSelector(selectors,sidx+1,nest);
					// }
					var r = {status:1,values:nest};
				}
			} else if(sel.selid == 'ROOT') {
				if(sidx+1+1 > selectors.length) {
					return [value];
				} else {
					return processSelector(selectors,sidx+1,fromdata);
				}
			} else {
				throw new Error('Wrong selector '+sel.selid);
			}


		} else if(sel.srchid) {
			var r = alasql.srch[sel.srchid.toUpperCase()](value,sel.args,stope,params);
//			console.log(sel.srchid,r);
		} else {
			throw new Error('Selector not found');
		}
//		console.log(356,sidx,r);
		if(typeof r == 'undefined') {
			r = {status: 1, values: [value]};
		};

		var res = [];
		if(r.status == 1) {

			var arr = r.values;


			if(sidx+1+1 > selectors.length) {
//			if(sidx+1+1 > selectors.length) {
				res = arr;					
//				console.log('res',r)
			} else {
				for(var i=0;i<r.values.length;i++) {
					res = res.concat(processSelector(selectors,sidx+1,arr[i]));									
				}
			}
		}
		return res;
	}
};

// List of search functions
alasql.srch = {};

alasql.srch.PROP = function(val,args,stope) {
//		console.log('PROP',args[0],val);
	if(stope.mode == 'XML') {
		var arr = [];
		val.children.forEach(function(v){
			if(v.name.toUpperCase() == args[0].toUpperCase()) {
				arr.push(v)
			}
		});
		if(arr.length>0) {
			return {status: 1, values: arr};
		} else {
			return {status: -1, values: []};
		}		
	} else {
		if((typeof val != 'object') || (val === null)
			|| (typeof args != 'object')
			|| (typeof val[args[0]] == 'undefined')) {
			return {status: -1, values: []};
		} else {
			return {status: 1, values: [val[args[0]]]};
		}		
	}
};

alasql.srch.APROP = function(val,args,stope) {
	if((typeof val != 'object') || (val === null)
		|| (typeof args != 'object')
		|| (typeof val[args[0]] == 'undefined')) {
		return {status: 1, values: [undefined]};
	} else {
		return {status: 1, values: [val[args[0]]]};
	}		
};

alasql.srch.ORDERBY = function(val,args,stope) {
//	console.log(val);
	var res = val.sort(compileSearchOrder(args));
	return {status: 1, values: res};
};

// Test expression
alasql.srch.EQ = function(val,args,stope,params) {
  var exprs = args[0].toJavaScript('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  if(val == exprfn(val,alasql,params)) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

// Test expression
alasql.srch.LIKE = function(val,args,stope,params) {
  var exprs = args[0].toJavaScript('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  if(val.toUpperCase().match(new RegExp('^'+exprfn(val,alasql,params).toUpperCase()
  	.replace(/%/g,'.*')+'$'),'g')) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};


alasql.srch.ATTR = function(val,args,stope) {
	if(stope.mode == 'XML') {
		if(typeof args == 'undefined') {
	      return {status: 1, values: [val.attributes]};
		} else {
			if(typeof val == 'object' && typeof val.attributes == 'object'
				&& typeof val.attributes[args[0]] != 'undefined') {
				return {status: 1, values: [val.attributes[args[0]]]};
			} else {
				return {status: -1, values: []};			
			}			
		}


	} else {
		throw new Error('ATTR is not using in usual mode');
	}
};

alasql.srch.CONTENT = function(val,args,stope) {
	if(stope.mode == 'XML') {
		return {status: 1, values: [val.content]};
	} else {
		throw new Error('ATTR is not using in usual mode');
	}
};

alasql.srch.SHARP = function(val,args,stope) {
	var obj = alasql.databases[alasql.useid].objects[args[0]];
	if(typeof val != 'undefined' && val === obj) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};


alasql.srch.PARENT = function(val,args,stope) {
	// TODO - finish
	console.log('PARENT');
	return {status: -1, values: []};
};


alasql.srch.CHILD = function(val,args,stope) {
//    	console.log(641,val);
  if(typeof val == 'object') {
    if(val instanceof Array) {
      return {status: 1, values: val};
    } else {
    	if(stope.mode == 'XML') {
	      return {status: 1, values: Object.keys(val.children).map(function(key){return val.children[key];})};          
    	} else {
	      return {status: 1, values: Object.keys(val).map(function(key){return val[key];})};          
    	}
    }
  } else {
    // If primitive value
    return {status: 1, values:[]};
  }
};

// Return all keys
alasql.srch.KEYS = function(val,args) {
  if(typeof val == 'object' && val !== null) {
	  return {status: 1, values: Object.keys(val)};          
  } else {
    // If primitive value
    return {status: 1, values:[]};
  }
};

// Test expression
alasql.srch.WHERE = function(val,args) {
  var exprs = args[0].toJavaScript('x','');
  var exprfn = new Function('x,alasql','return '+exprs);
  if(exprfn(val,alasql)) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

alasql.srch.NAME = function(val,args) {
  if(val.name == args[0]) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

alasql.srch.CLASS = function(val,args) {
//	console.log(val,args);
  if(val.$class == args) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};


// Transform expression
alasql.srch.VERTEX = function(val,args) {
  if(val.$node == 'VERTEX') {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

// Transform expression
alasql.srch.INSTANCEOF = function(val,args) {
  if(val instanceof alasql.fn[args[0]]) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};


// Transform expression
alasql.srch.EDGE = function(val,args) {
  if(val.$node == 'EDGE') {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

// Transform expression
alasql.srch.EX = function(val,args,stope,params) {
  var exprs = args[0].toJavaScript('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  return {status: 1, values: [exprfn(val,alasql,params)]};
};


// Transform expression
alasql.srch.RETURN = function(val,args,stope,params) {
	var res = {};
	if(args && args.length > 0) {
		args.forEach(function(arg){
		  	var exprs = arg.toJavaScript('x','');
  			var exprfn = new Function('x,alasql,params','return '+exprs);
  			if(typeof arg.as == 'undefined') arg.as = arg.toString();
  			res[arg.as] = exprfn(val,alasql,params);
		});
	}
  return {status: 1, values: [res]};
};


// Transform expression
alasql.srch.REF = function(val,args) {
  return {status: 1, values: [alasql.databases[alasql.useid].objects[val]]};
};

// Transform expression
alasql.srch.OUT = function(val,args) {
	if(val.$out && val.$out.length > 0) {
		var res = val.$out.map(function(v){ 
			return alasql.databases[alasql.useid].objects[v]
		}); 
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.IN = function(val,args) {
	if(val.$in && val.$in.length > 0) {
		var res = val.$in.map(function(v){ 
			return alasql.databases[alasql.useid].objects[v]
		}); 
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.AS = function(val,args) {
	alasql.vars[args[0]] = val;
  return {status: 1, values: [val]};
};

// Transform expression
alasql.srch.AT = function(val,args) {
	var v = alasql.vars[args[0]];
  return {status: 1, values: [v]};
};


// Transform expression
alasql.srch.CLONEDEEP = function(val,args) {
	// TODO something wrong
	var z = cloneDeep(val);
  return {status: 1, values: [z]};
};

// // Transform expression
// alasql.srch.DELETE = function(val,args) {
// 	// TODO something wrong
// 	delete val;
//   return {status: 1, values: []};
// };


// Transform expression
alasql.srch.SET = function(val,args,stope,params) {
//	console.log(arguments);
	var s = args.map(function(st){
//console.log(898,st);		
		if(st.method == '@') {
			return 'alasql.vars[\''+st.variable+'\']='+st.expression.toJavaScript('x','');
		} else if(st.method == '$') {
			return 'params[\''+st.variable+'\']='+st.expression.toJavaScript('x','');
		} else {
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJavaScript('x','');
		}
	}).join(';');
	var setfn = new Function('x,params,alasql',s);
	
	setfn(val,params,alasql);

  return {status: 1, values: [val]};
};

alasql.srch.ROW = function(val,args,stope,params) {
  var s = 'var y;return [';
//  console.log(args[0]);
	s += args.map(function(arg){
		return arg.toJavaScript('x','');
	}).join(',');
	s += ']'
	var setfn = new Function('x,params,alasql',s);
	var rv = setfn(val,params,alasql);

  return {status: 1, values: [rv]};
};


alasql.srch.D3 = function(val,args,stope,params) {
	if(val.$node == 'VERTEX') {
//		var res = val;
	} else if(val.$node == 'EDGE') {
		val.source = val.$in[0];
		val.target = val.$out[0];
	}
  	return {status: 1, values: [val]};
};


compileSearchOrder = function (order) {
	if(order) {
//			console.log(990, this.order);
		if(order && order.length == 1 && order[0].expression 
			 && typeof order[0].expression == "function") {
//			console.log(991, this.order[0]);
			var func = order[0].expression;
//			console.log(994, func);
			return function(a,b){
				var ra = func(a),rb = func(b);
				if(ra>rb) return 1;
				if(ra==rb) return 0;
				return -1;
			}
		};

		var s = '';
		var sk = '';
		order.forEach(function(ord,idx){
			// console.log(ord instanceof yy.Expression);
			// console.log(ord.toJavaScript('a',''));
			// console.log(ord.expression instanceof yy.Column);
			
			// Date conversion
			var dg = ''; 
//console.log(ord.expression, ord.expression instanceof yy.NumValue);
			if(ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value-1];
			};

			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid; 

				if(alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';

				if(columnid == '_') {
					s += 'if(a'+dg+(ord.direction == 'ASC'?'>':'<')+'b'+dg+')return 1;';
					s += 'if(a'+dg+'==b'+dg+'){';
				} else {
					s += 'if((a[\''+columnid+"']||'')"+dg+(ord.direction == 'ASC'?'>':'<')+'(b[\''+columnid+"']||'')"+dg+')return 1;';
					s += 'if((a[\''+columnid+"']||'')"+dg+'==(b[\''+columnid+"']||'')"+dg+'){';
				}

			} else {
				dg = '.valueOf()';
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';
				s += 'if(('+ord.toJavaScript('a','')+"||'')"+dg+(ord.direction == 'ASC'?'>(':'<(')+ord.toJavaScript('b','')+"||'')"+dg+')return 1;';
				s += 'if(('+ord.toJavaScript('a','')+"||'')"+dg+'==('+ord.toJavaScript('b','')+"||'')"+dg+'){';
			}			

			// TODO Add date comparision
				// s += 'if(a[\''+columnid+"']"+dg+(ord.direction == 'ASC'?'>':'<')+'b[\''+columnid+"']"+dg+')return 1;';
				// s += 'if(a[\''+columnid+"']"+dg+'==b[\''+columnid+"']"+dg+'){';
//			}
			sk += '}';
		});
		s += 'return 0;';
		s += sk+'return -1';
//console.log(s);
		return new Function('a,b',s);
	};
};




// Main query procedure
function queryfn(query,oldscope,cb, A,B) {

//	console.log(query.queriesfn);

	var ms;
		query.sourceslen = query.sources.length;
		var slen = query.sourceslen;
		query.query = query; // TODO Remove to prevent memory leaks
		query.A = A;
		query.B = B;
//	console.log(arguments);
		query.cb = cb;
		query.oldscope = oldscope;

	// Run all subqueries before main statement
	if(query.queriesfn) {
		query.sourceslen += query.queriesfn.length;
		slen += query.queriesfn.length;

		query.queriesdata = [];

//		console.log(8);
		query.queriesfn.forEach(function(q,idx){
//			if(query.explain) ms = Date.now();
//console.log(18,idx);
//			var res = flatArray(q(query.params,null,queryfn2,(-idx-1),query));

//			var res = flatArray(queryfn(q.query,null,queryfn2,(-idx-1),query));
//			console.log(A,B);
// console.log(q);
			q.query.params = query.params;
//			query.queriesdata[idx] = 

	if(false) {
			queryfn(q.query,query.oldscope,queryfn2,(-idx-1),query);
	} else {
			queryfn2([],(-idx-1),query);
	}

//			console.log(27,q);


//			query.explaination.push({explid: query.explid++, description:'Query '+idx,ms:Date.now()-ms});
//			query.queriesdata[idx] = res;
//			return res;
		});
//		console.log(9,query.queriesdata.length);
//		console.log(query.queriesdata[0]);
	}

	var scope;
	if(!oldscope) scope = {};
	else scope = cloneDeep(oldscope);
	query.scope = scope;

	// First - refresh data sources

	var result;
	query.sources.forEach(function(source, idx){
//		source.data = query.database.tables[source.tableid].data;
//		console.log(666,idx);
		source.query = query;
		var rs = source.datafn(query, query.params, queryfn2, idx, alasql); 
//		console.log(333,rs);
		if(typeof rs != undefined) {
			// TODO - this is a hack: check if result is array - check all cases and
			// make it more logical
			if((query.intofn || query.intoallfn) && rs instanceof Array) rs = rs.length;
			result = rs;
		}
//		console.log(444,result);
//
// Ugly hack to use in query.wherefn and source.srcwherefns functions
// constructions like this.queriesdata['test'].
// I can elimite it with source.srcwherefn.bind(this)()
// but it may be slow.
// 
		source.queriesdata = query.queriesdata;  
	});
	if(slen == 0) result = queryfn3(query);
	return result;
};

function queryfn2(data,idx,query) {

//console.log(56,arguments);
//		console.log(78,data, idx,query);
//console.trace();

	if(idx>=0) {
		var source = query.sources[idx];
		source.data = data;
		if(typeof source.data == 'function') {
			source.getfn = source.data;
			source.dontcache = source.getfn.dontcache;

	//			var prevsource = query.sources[h-1];
			if(source.joinmode == 'OUTER' || source.joinmode == 'RIGHT' || source.joinmode == 'ANTI') {
				source.dontcache = false;
			}
			source.data = {};
		}
	} else {
		// subqueries
//		console.log("queriesdata",data, flatArray(data));
		query.queriesdata[-idx-1] = flatArray(data);
//		console.log(98,query.queriesdata);
//		console.log(79,query.queriesdata);
	}

	query.sourceslen--;
	if(query.sourceslen>0) return;

	return queryfn3(query);
};

function queryfn3(query) {
//console.log(55,query);


	var scope = query.scope;
	// Preindexation of data sources
//	if(!oldscope) {
		preIndex(query);
//	}

	// query.sources.forEach(function(source) {
	// 		console.log(source.data);
	// });

	// Prepare variables
	query.data = [];
	query.xgroups = {};
	query.groups = [];

	// Level of Joins
	var h = 0;


	// Start walking over data
//console.log(142,'1111');
	doJoin(query, scope, h);
//console.log(144,'2222',query.modifier);

//console.log(85,query.data[0]);

	// If groupping, then filter groups with HAVING function
//			console.log(query.havingfns);
	if(query.groupfn) {
		query.data = [];
		if(query.groups.length == 0) {
			var g = {};
			if(query.selectGroup.length>0) {
//				console.log(query.selectGroup);
				query.selectGroup.forEach(function(sg){
					if(sg.aggregatorid == "COUNT" || sg.aggregatorid == "SUM") {
						g[sg.nick] = 0;
					} else {
						g[sg.nick] = undefined;
					}
				});
			};
			query.groups = [g];
//			console.log();
		};
		// 	console.log('EMPTY',query.groups);
		// 	debugger;
		// if(false && (query.groups.length == 1) && (Object.keys(query.groups[0]).length == 0)) {
		// 	console.log('EMPTY',query.groups);
		// } else {
			for(var i=0,ilen=query.groups.length;i<ilen;i++) {
	//			console.log(query.groups[i]);
				var g = query.groups[i];
				if((!query.havingfn) || query.havingfn(g,query.params,alasql)) {
	//				console.log(g);
					var d = query.selectgfn(g,query.params,alasql);
					query.data.push(d);
				};
			};
		// }

//			query.groups = query.groups.filter();
	};

	// Remove distinct values	
	doDistinct(query);	


	// UNION / UNION ALL
	if(query.unionallfn) {
// TODO Simplify this part of program
		if(query.corresponding) {
			if(!query.unionallfn.query.modifier) query.unionallfn.query.modifier = undefined;
			var ud = query.unionallfn(query.params);
		} else {
			if(!query.unionallfn.query.modifier) query.unionallfn.query.modifier = 'RECORDSET';
			var nd = query.unionallfn(query.params);
			var ud = [];
			for(var i=0,ilen=nd.data.length;i<ilen;i++) {
				var r = {};
				for(var j=0,jlen=Math.min(query.columns.length,nd.columns.length);j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}
		query.data = query.data.concat(ud);
	} else if(query.unionfn) {

		if(query.corresponding) {
			if(!query.unionfn.query.modifier) query.unionfn.query.modifier = 'ARRAY';
			var ud = query.unionfn(query.params);
		} else {
			if(!query.unionfn.query.modifier) query.unionfn.query.modifier = 'RECORDSET';
			var nd = query.unionfn(query.params);
			var ud = [];
			for(var i=0,ilen=nd.data.length;i<ilen;i++) {
				var r = {};
				for(var j=0,jlen=Math.min(query.columns.length,nd.columns.length);j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}

		query.data = arrayUnionDeep(query.data, ud);

	} else if(query.exceptfn) {
		if(query.corresponding) {
			if(!query.exceptfn.query.modifier) query.exceptfn.query.modifier = 'ARRAY';
			var ud = query.exceptfn(query.params);
		} else {
			if(!query.exceptfn.query.modifier) query.exceptfn.query.modifier = 'RECORDSET';
			var nd = query.exceptfn(query.params);
			var ud = [];
			for(var i=0,ilen=nd.data.length;i<ilen;i++) {
				var r = {};
				for(var j=0,jlen=Math.min(query.columns.length,nd.columns.length);j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}


		query.data = arrayExceptDeep(query.data, ud);
	} else if(query.intersectfn) {
		if(query.corresponding) {
			if(!query.intersectfn.query.modifier) query.intersectfn.query.modifier = undefined;
			var ud = query.intersectfn(query.params);
		} else {
			if(!query.intersectfn.query.modifier) query.intersectfn.query.modifier = 'RECORDSET';
			var nd = query.intersectfn(query.params);
			var ud = [];
			for(var i=0,ilen=nd.data.length;i<ilen;i++) {
				var r = {};
				for(var j=0,jlen=Math.min(query.columns.length,nd.columns.length);j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}


		query.data = arrayIntersectDeep(query.data, ud);
	};

	// Ordering
	if(query.orderfn) {
		if(query.explain) var ms = Date.now();
		query.data = query.data.sort(query.orderfn);
		if(query.explain) { 
			query.explaination.push({explid: query.explid++, description:'QUERY BY',ms:Date.now()-ms});
		}
	};

	// Reduce to limit and offset
	doLimit(query);

	// Remove Angular.js artifacts and other unnecessary columns
	// Issue #25

//	console.log('removeKeys:',query.removeKeys);

    // TODO: Check what artefacts rest from Angular.js
    if(typeof angular != "undefined") {
    	query.removeKeys.push('$$hashKey');
    }


	if(query.removeKeys.length > 0) {
	    var removeKeys = query.removeKeys;


	    // Remove from data
	    var jlen = removeKeys.length;
	    if(jlen > 0) {
	      for(var i=0,ilen=query.data.length;i<ilen;i++) {
	        for(var j=0; j<jlen;j++) {
	          delete query.data[i][removeKeys[j]];
	        }
	      }    
	    };

	    // Remove from columns list
		if(query.columns.length > 0) {
			query.columns = query.columns.filter(function(column){
				var found = false;
				removeKeys.forEach(function(key){
					if(column.columnid == key) found = true;
				});
				return !found;
			});
		}

	}

	if(typeof query.removeLikeKeys != 'undefined' && query.removeLikeKeys.length > 0) {

	    var removeLikeKeys = query.removeLikeKeys;

		// Remove unused columns
		// SELECT * REMOVE COLUMNS LIKE "%b"
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			var r = query.data[i];
			for(var k in r) {
				for(var j=0;j<query.removeLikeKeys.length;j++) {
					if(k.match(query.removeLikeKeys[j])) {
						delete r[k];
					}				
				}
			}; 
		}

		if(query.columns.length > 0) {
			query.columns = query.columns.filter(function(column){
				var found = false;
				removeLikeKeys.forEach(function(key){
					if(column.columnid.match(key)) found = true;
				});
				return !found;
			});
		}

	}
//	console.log(query.intoallfns);

	// if(query.explain) {
	// 	if(query.cb) query.cb(query.explaination,query.A, query.B);
	// 	return query.explaination;
	// } else 
//console.log(190,query.intofns);
	if(query.intoallfn) {
//		console.log(161);
//		var res = query.intoallfn(query.columns,query.cb,query.A, query.B, alasql); 
		var res = query.intoallfn(query.columns,query.cb,query.params,query.alasql); 
//		console.log(1163,res);
//		if(query.cb) res = query.cb(res,query.A, query.B);
//		console.log(1165,res);
//		debugger;
		return res;	
	} else if(query.intofn) {
		for(var i=0,ilen=query.data.length;i<ilen;i++){
			query.intofn(query.data[i],i,query.params,query.alasql);
		}
//		console.log(query.intofn);
		if(query.cb) query.cb(query.data.length,query.A, query.B);
		return query.data.length;
	} else {
//		console.log(111,query.cb,query.data);
		var res = query.data;
		if(query.cb) res = query.cb(query.data,query.A, query.B);
//		console.log(777,res)
		return res;
	}

	// That's all
};

// Limiting
function doLimit (query) {
//	console.log(query.limit, query.offset)
	if(query.limit) {
		var offset = 0;
		if(query.offset) offset = ((query.offset|0)-1)||0;
		var limit;
		if(query.percent) {
			limit = ((query.data.length*query.limit/100)| 0)+offset;			
		} else {
			limit = (query.limit|0) + offset;
		};
		query.data = query.data.slice(offset,limit);
	}
}

// Distinct
function doDistinct (query) {
	if(query.distinct) {
		var uniq = {};
		// TODO: Speedup, because Object.keys is slow
		// TODO: Problem with DISTINCT on objects
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			var uix = Object.keys(query.data[i]).map(function(k){return query.data[i][k]}).join('`');
			uniq[uix] = query.data[i];
		};
		query.data = [];
		for(var key in uniq) query.data.push(uniq[key]);
	}
};


// Optimization: preliminary indexation of joins
preIndex = function(query) {
//	console.log(query);
	// Loop over all sources
	for(var k=0, klen = query.sources.length;k<klen;k++) {
		var source = query.sources[k];
		// If there is indexation rule
//console.log('preIndex', source);
//console.log(source);
		if(k > 0 && source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
			// If there is no table.indices - create it
			if(source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
				if(!alasql.databases[source.databaseid].tables[source.tableid].indices) query.database.tables[source.tableid].indices = {};
					// Check if index already exists
				var ixx = alasql.databases[source.databaseid].tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)];
				if( !alasql.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
					source.ix = ixx; 
				}
			};
			if(!source.ix) {
				source.ix = {};
				// Walking over source data
				var scope = {};
				var i = 0;
				var ilen = source.data.length;
				var dataw;
//				while(source.getfn i<ilen) {

				while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
					if(source.getfn && !source.dontcache) source.data[i] = dataw;
//					scope[tableid] = dataw;

//				for(var i=0, ilen=source.data.length; i<ilen; i++) {
					// Prepare scope for indexation
					scope[source.alias || source.tableid] = dataw;

					// Check if it apply to where function 
					if(source.srcwherefn(scope, query.params, alasql)) {
						// Create index entry for each address
						var addr = source.onrightfn(scope, query.params, alasql);
						var group = source.ix [addr]; 
						if(!group) {
							group = source.ix [addr] = []; 
						}
						group.push(dataw);
					}
					i++;
				}
				if(source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]){
					// Save index to original table				
					alasql.databases[source.databaseid].tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)] = source.ix;
				};
			}
//console.log(38,274,source.ix);

			// Optimization for WHERE column = expression
		} else if (source.wxleftfn) {
				if(!alasql.databases[source.databaseid].engineid) {
					// Check if index exists
					var ixx = alasql.databases[source.databaseid].tables[source.tableid].indices[hash(source.wxleftfns+'`')];
				}
				if( !alasql.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
					// Use old index if exists
					source.ix = ixx;
					// Reduce data (apply filter)
					source.data = source.ix[source.wxrightfn(null, query.params, alasql)]; 
				} else {
					// Create new index
					source.ix = {};
					// Prepare scope
					var scope = {};
					// Walking on each source line
					var i = 0;
					var ilen = source.data.length;
					var dataw;
	//				while(source.getfn i<ilen) {

					while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
						if(source.getfn && !source.dontcache) source.data[i] = dataw;
	//				for(var i=0, ilen=source.data.length; i<ilen; i++) {
						scope[source.alias || source.tableid] = source.data[i];
						// Create index entry
						var addr = source.wxleftfn(scope, query.params, alasql);
						var group = source.ix [addr]; 
						if(!group) {
							group = source.ix [addr] = []; 
						}
						group.push(source.data[i]);
						i++;
					}
	//					query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`'+source.onwherefns)] = source.ix;
					if(!alasql.databases[source.databaseid].engineid) {
						alasql.databases[source.databaseid].tables[source.tableid].indices[hash(source.wxleftfns+'`')] = source.ix;
					}
				}
				// Apply where filter to reduces rows
				if(source.srcwherefns) {
					if(source.data) {
						var scope = {};
						source.data = source.data.filter(function(r) {
							scope[source.alias] = r;
							return source.srcwherefn(scope, query.params, alasql);
						});
					} else {
						source.data = [];
					}
				}		
//			}
		// If there is no any optimization than apply srcwhere filter
		} else if(source.srcwherefns && !source.dontcache) {
			if(source.data) {
				var scope = {};
				// TODO!!!!! Data as Function

				source.data = source.data.filter(function(r) {
					scope[source.alias] = r;
//					console.log(288,source);
					return source.srcwherefn(scope, query.params, alasql);
				});

				var scope = {};
				var i = 0;
				var ilen = source.data.length;
				var dataw;
				var res = [];
//				while(source.getfn i<ilen) {

				while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
					if(source.getfn && !source.dontcache) source.data[i] = dataw;
					scope[source.alias] = dataw;
					if(source.srcwherefn(scope, query.params, alasql)) res.push(dataw);
					i++;
				}
				source.data = res;

			} else {
				source.data = [];
			};
		}			
		// Change this to another place (this is a wrong)
		if(source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
			//query.database.tables[source.tableid].dirty = false;
		} else {
			// this is a subquery?
		}
	}
}


//
// Join all lines over sources 
//

function doJoin (query, scope, h) {
//	console.log('doJoin', arguments);
//	console.log(query.sources.length);
	// Check, if this is a last join?
	if(h>=query.sources.length) {
//console.log(query.wherefns);
		// Then apply where and select
//		console.log(query);
		if(query.wherefn(scope,query.params, alasql)) {

//			console.log("scope",scope.schools);

//			var res = query.selectfn(scope, query.params, alasql);
//			console.log("last",res);
			// If there is a GROUP BY then pipe to groupping function
			if(query.groupfn) {
				query.groupfn(scope, query.params, alasql)
			} else {
//				query.qwerty = 999;
//console.log(query.qwerty, query.queriesfn && query.queriesfn.length,2);
				query.data.push(query.selectfn(scope, query.params, alasql));
			}	
		}
	} else if(query.sources[h].applyselect) {
//		console.log('APPLY',scope);
//			console.log('scope1',scope);
//				console.log(scope);
		var source = query.sources[h];
		source.applyselect(query.params, function(data){
			if(data.length > 0) {
	//			console.log('APPLY CB');
				for(var i=0;i<data.length;i++) {
					scope[source.alias] = data[i];
					doJoin(query, scope, h+1);
				};			
			} else {
//				console.log(source.applymode);
				if (source.applymode == 'OUTER') {
					scope[source.alias] = {};
					doJoin(query, scope, h+1);
				}
			}
		},scope);

//		console.log(data);
	} else {

// STEP 1

		var source = query.sources[h];
		var nextsource = query.sources[h+1];

//		if(source.joinmode == "LEFT" || source.joinmode == "INNER" || source.joinmode == "RIGHT"
//			|| source.joinmode == "OUTER" || source.joinmode == "SEMI") {
		if(true) {//source.joinmode != "ANTI") {

			// if(nextsource && nextsource.joinmode == "RIGHT") {
			// 	if(!nextsource.rightdata) {
			// 		console.log("ok");
			// 		nextsource.rightdata = new Array(nextsource.data.length);
			// 		console.log(nextsource.data.length, nextsource.rightdata);
			// 	}
			// }

			var tableid = source.alias || source.tableid; 
			var pass = false; // For LEFT JOIN
			var data = source.data;
			var opt = false;

			// Reduce data for looping if there is optimization hint
			if(!source.getfn || (source.getfn && !source.dontcache)) {
				if(source.joinmode != "RIGHT" && source.joinmode != "OUTER" && source.joinmode != "ANTI" && source.optimization == 'ix') {
					data = source.ix[ source.onleftfn(scope, query.params, alasql) ] || [];
					opt = true;
//					console.log(source.onleftfns);
//					console.log(source.ix);
//	console.log(source.onleftfn(scope, query.params, alasql));
//					console.log(opt, data, data.length);
				}
			}

			// Main cycle
			var i = 0;
			if(typeof data == 'undefined') {
				throw new Error('Data source number '+h+' in undefined')
			}
			var ilen=data.length;
			var dataw;
//			console.log(h,opt,source.data,i,source.dontcache);
			while((dataw = data[i]) || (!opt && (source.getfn && (dataw = source.getfn(i)))) || (i<ilen) ) {
				if(!opt && source.getfn && !source.dontcache) data[i] = dataw;
//console.log(h, i, dataw);
				scope[tableid] = dataw;
				// Reduce with ON and USING clause
				if(!source.onleftfn || (source.onleftfn(scope, query.params, alasql) == source.onrightfn(scope, query.params, alasql))) {
					// For all non-standard JOINs like a-b=0
					if(source.onmiddlefn(scope, query.params, alasql)) {
						// Recursively call new join
//						if(source.joinmode == "LEFT" || source.joinmode == "INNER" || source.joinmode == "OUTER" || source.joinmode == "RIGHT" ) {
						if(source.joinmode != "SEMI" && source.joinmode != "ANTI") { 
//							console.log(scope);
							doJoin(query, scope, h+1);
						}

						// if(source.data[i].f = 200) debugger;

//						if(source.joinmode == "RIGHT" || source.joinmode == "ANTI" || source.joinmode == "OUTER") {
						if(source.joinmode != "LEFT" && source.joinmode != "INNER") {
							dataw._rightjoin = true;
						}

						// for LEFT JOIN
						pass = true;
					}
				};
				i++;
			};


			// Additional join for LEFT JOINS
			if((source.joinmode == 'LEFT' || source.joinmode == 'OUTER' || source.joinmode == 'SEMI' ) && !pass) {
			// Clear the scope after the loop
				scope[tableid] = {};
				doJoin(query,scope,h+1);
			}	


		}

		// When there is no records
//		if(data.length == 0 && query.groupfn) {
//			scope[tableid] = undefined;
//			doJoin(query,scope,h+1);
//		}

// STEP 2

		if(h+1 < query.sources.length) {

			if(nextsource.joinmode == "OUTER" || nextsource.joinmode == "RIGHT" 
				|| nextsource.joinmode == "ANTI") {


				scope[source.alias] = {};
			
				var j = 0;
				var jlen = nextsource.data.length;
				var dataw;

				while((dataw = nextsource.data[j]) || (nextsource.getfn && (dataw = nextsource.getfn(j))) || (j<jlen)) {
					if(nextsource.getfn && !nextsource.dontcache) nextsource.data[j] = dataw;

					if(!dataw._rightjoin) {
						scope[nextsource.alias] = dataw;
						doJoin(query, scope, h+2);
					} else {
						//dataw._rightjoin = undefined;	
						delete dataw._rightjoin;					
					}
					j++;
				}
//				console.table(nextsource.data);
//				debugger;	

			};
		};


		scope[tableid] = undefined;

/*
		if(h+1 < query.sources.length) {
			var nextsource = query.sources[h+1];

			if(nextsource.joinmode == "OUTER" || nextsource.joinmode == "RIGHT" 
				|| nextsource.joinmode == "ANTI") {


				console.log(h,query.sources.length);
				// Swap


//				swapSources(query,h);

//				console.log(query.sources);
				//debugger;
//				var source = query.sources[h];

//				var tableid = source.alias || source.tableid; 
//				var data = source.data;

				// Reduce data for looping if there is optimization hint
//				if(source.optimization == 'ix') {
//					data = source.ix[ source.onleftfn(scope, query.params, alasql) ] || [];
//				}

				// Main cycle
				var pass = false;
//				console.log(tableid, data.length);
				for(var i=0, ilen=nextsource.data.length; i<ilen; i++) {
					scope[nextsource.tableid] = nextsource.data[i];
					// Reduce with ON and USING clause
					if(!source.onleftfn || (source.onleftfn(scope, query.params, alasql) == source.onrightfn(scope, query.params, alasql))) {
						// For all non-standard JOINs like a-b=0
						if(source.onmiddlefn(scope, query.params, alasql)) {
							// Recursively call new join
//							if(source.joinmode == "OUTER") {
								doJoin(query, scope, h+2);
//							}
							// for LEFT JOIN
							pass = true;
						}
					};
					if(!pass) {
					// Clear the scope after the loop
//						scope[tableid] = {};
						console.log(scope);
						doJoin(query,scope,h+2);
					}	
				};

				// Additional join for LEFT JOINS
					scope[query.sources[h+1].tableid] = {};
					console.log(scope);

				scope[tableid] = undefined;

				// SWAP BACK
				swapSources(query,h);

			}
		}

*/
	}

};

function swapSources(query, h) {
	var source = query.sources[h];
	var nextsource = query.sources[h+1];

	var onleftfn = source.onleftfn;
	var onleftfns = source.onleftfns;
	var onrightfn = source.onrightfn;
	var onrightfns = source.onrightfns;
	var optimization = source.optimization;

	source.onleftfn = nextsource.onrightfn;
	source.onleftfns = nextsource.onrightfns;
	source.onrightfn = nextsource.onleftfn;
	source.onrightfns = nextsource.onleftfns;
	source.optimization = nextsource.optimization;

	nextsource.onleftfn = onleftfn;
	nextsource.onleftfns = onleftfns;
	nextsource.onrightfn = onrightfn;
	nextsource.onrightfns = onrightfns;
	nextsource.optimization = optimization;

	query.sources[h] = nextsource;
	query.sources[h+1] = source;
}


/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//
// Main part of SELECT procedure
//

yy.Select = function (params) { return yy.extend(this, params); }
yy.Select.prototype.toString = function() {
	var s = '';
	if(this.explain) s+= K('EXPLAIN')+' ';
	s += K('SELECT')+' ';
	if(this.modifier) s += K(this.modifier)+' ';
	if(this.top) {
		s += K('TOP')+' '+N(this.top.value)+' ';
		if(this.percent) s += K('PERCENT')+' ';
	}
	s += this.columns.map(function(col){
		var s = col.toString();
//		console.log(col);
		if(typeof col.as != "undefined") s += ' '+K('AS')+' '+L(col.as);
		return s;
	}).join(', ');

	if(this.from) {
		s += NL()+ID()+K('FROM')+' '+this.from.map(function(f){
//			console.log(f);
			var ss = f.toString();
			if(f.as) ss += ' '+K('AS')+' '+f.as;
			return ss;
		}).join(',');
	};

	if(this.joins) {
		s += this.joins.map(function(jn){
			var ss = NL()+ID();
			if(jn.joinmode) ss += K(jn.joinmode)+' ';
			if(jn.table) ss += K('JOIN')+' '+jn.table.toString();
			else if(jn instanceof yy.Apply) ss += jn.toString();
			else {
				throw new Error('Wrong type in JOIN mode');
			}

			if(jn.using) ss += ' '+K('USING')+' '+jn.using.toString();
			if(jn.on) ss += ' '+K('ON')+' '+jn.on.toString();
			return ss;
 		});
	}

	if(this.where) s += NL()+ID()+K('WHERE')+' '+this.where.toString();
	if(this.group && this.group.length>0) {
		s += NL()+ID()+K('GROUP BY')+' '+this.group.map(function(grp){
			return grp.toString();
		}).join(', ');
	};
	if(this.having) s += NL()+ID()+K('HAVING')+' '+this.having.toString();

	if(this.order && this.order.length>0) {
		s += NL()+ID()+K('ORDER BY')+' '+this.order.map(function(ord){
			return  ord.toString();
		}).join(', ');
	};
	if(this.limit) s += NL()+ID()+K('LIMIT')+' '+this.limit.value;
	if(this.offset) s += NL()+ID()+K('OFFSET')+' '+this.offset.value;
	if(this.union) s += NL()+K('UNION')+(this.corresponding?(' '+K('CORRESPONDING')):'')+NL()+this.union.toString();
	if(this.unionall) s += NL()+K('UNION ALL')+(this.corresponding?(' '+K('CORRESPONDING')):'')+NL()+this.unionall.toString();
	if(this.except) s += NL()+K('EXCEPT')+(this.corresponding?(' '+K('CORRESPONDING')):'')+NL()+this.except.toString();
	if(this.intersect) s += NL()+K('INTERSECT')+(this.corresponding?(' '+K('CORRESPONDING')):'')+NL()+this.intersect.toString();
	return s;
};

/**
 Select statement in expression
 */
yy.Select.prototype.toJavaScript = function(context, tableid, defcols) {
//	console.log('Expression',this);
//	if(this.expression.reduced) return 'true';
//	return this.expression.toJavaScript(context, tableid, defcols);
// console.log('Select.toJS', 81, this.queriesidx);
//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s = 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+'))[0]';


//	var s = '(ee=alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')),console.log(999,ee),ee[0])';

	return s;
};


// Compile SELECT statement
yy.Select.prototype.compile = function(databaseid) {
	var db = alasql.databases[databaseid];
	// Create variable for query
	var query = new Query();

	// Array with columns to be removed
    query.removeKeys = [];

	query.explain = this.explain; // Explain
	query.explaination = [];
	query.explid = 1;
//console.log(this.modifier);
	query.modifier = this.modifier;
	
	query.database = db;
	// 0. Precompile whereexists
	this.compileWhereExists(query);

	// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
	this.compileQueries(query);
	
	query.defcols = this.compileDefCols(query, databaseid);

	// 1. Compile FROM clause
	query.fromfn = this.compileFrom(query);
	// 2. Compile JOIN clauses
	if(this.joins) this.compileJoins(query);
	// 3. Compile SELECT clause

	// For ROWNUM()
	query.rownums = [];
	
	this.compileSelectGroup0(query);

	if(this.group || query.selectGroup.length>0) {
		query.selectgfns = this.compileSelectGroup1(query);
	} else {
		query.selectfns = this.compileSelect1(query);
	}

	// Remove columns clause
	this.compileRemoveColumns(query);

	// 5. Optimize WHERE and JOINS
	if(this.where) this.compileWhereJoins(query);

	// 4. Compile WHERE clause
	query.wherefn = this.compileWhere(query);


	// 6. Compile GROUP BY
	if(this.group || query.selectGroup.length>0) query.groupfn = this.compileGroup(query);

	// 6. Compile HAVING
	if(this.having) query.havingfn = this.compileHaving(query);


	if(this.group || query.selectGroup.length>0) {
		query.selectgfn = this.compileSelectGroup2(query);
	} else {
		query.selectfn = this.compileSelect2(query);
	}


	// 7. Compile DISTINCT, LIMIT and OFFSET
	query.distinct = this.distinct;

	// 8. Compile ORDER BY clause
	if(this.order) query.orderfn = this.compileOrder(query);

// TOP
	if(this.top) {
		query.limit = this.top.value;
	} else if(this.limit) {
		query.limit = this.limit.value;
		if(this.offset) {
			query.offset = this.offset.value;
		}
	};
	query.percent = this.percent;

	// 9. Compile ordering function for UNION and UNIONALL
	query.corresponding = this.corresponding; // If CORRESPONDING flag exists
	if(this.union) {
		query.unionfn = this.union.compile(databaseid);
		if(this.union.order) {
			query.orderfn = this.union.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.unionall) {
		query.unionallfn = this.unionall.compile(databaseid);
		if(this.unionall.order) {
			query.orderfn = this.unionall.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.except) {
		query.exceptfn = this.except.compile(databaseid);
		if(this.except.order) {
			query.orderfn = this.except.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.intersect) {
		query.intersectfn = this.intersect.compile(databaseid);
		if(this.intersect.order) {
			query.intersectfn = this.intersect.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	};

	// SELECT INTO
	if(this.into) {
		if(this.into instanceof yy.Table) {
			//
			// Save into the table in database
			//
			if(alasql.options.autocommit && alasql.databases[this.into.databaseid||databaseid].engineid) {
				// For external database when AUTOCOMMIT is ONs
				query.intoallfns = 'return alasql.engines["'+alasql.databases[this.into.databaseid||databaseid].engineid+'"]'+
					'.intoTable("'+(this.into.databaseid||databaseid)+'","'+this.into.tableid+'",this.data, columns, cb);';
			} else {
				// Into AlaSQL tables
				query.intofns = 
				'alasql.databases[\''+(this.into.databaseid||databaseid)+'\'].tables'+
				'[\''+this.into.tableid+'\'].data.push(r);';
			}
		} else if(this.into instanceof yy.VarValue) {
			//
			// Save into local variable
			// SELECT * INTO @VAR1 FROM ?
			//
			query.intoallfns = 'alasql.vars["'+this.into.variable+'"]=this.data;res=this.data.length;if(cb)res=cb(res);return res;';
		} else if (this.into instanceof yy.FuncValue) {
			//
			// If this is INTO() function, then call it
			// with one or two parameters
			//
			var qs = 'return alasql.into[\''+this.into.funcid.toUpperCase()+'\'](';
			if(this.into.args && this.into.args.length>0 ) {
				qs += this.into.args[0].toJavaScript()+',';
				if(this.into.args.length > 1) {
					qs += this.into.args[1].toJavaScript()+',';
				} else {
					qs += 'undefined,';
				}
			} else {
				qs += 'undefined, undefined,'
			}
			query.intoallfns = qs+'this.data,columns,cb)';
//console.log('999');		


		} else if (this.into instanceof yy.ParamValue) {
			//
			// Save data into parameters array
			// like alasql('SELECT * INTO ? FROM ?',[outdata,srcdata]);
			//
			query.intofns = "params['"+this.into.param+"'].push(r)";
		};

		if(query.intofns) {
			// Create intofn function
			query.intofn = new Function("r,i,params,alasql",'var y;'+query.intofns); 
		} else if(query.intoallfns) {
			// Create intoallfn function
			query.intoallfn = new Function("columns,cb,params,alasql",'var y;'+query.intoallfns); 
		}

	}
//console.log(query);

	// Now, compile all togeather into one function with query object in scope
	var statement = function(params, cb, oldscope) {
		query.params = params;
		var res1 = queryfn(query,oldscope,function(res){

//console.log(res[0].schoolid);
//console.log(184,res);
			if(query.rownums.length>0) {
				for(var i=0,ilen=res.length;i<ilen;i++) {
					for(var j=0,jlen=query.rownums.length;j<jlen;j++) {
						res[i][query.rownums[j]] = i+1;
					}
				}
			}

			var res2 = modify(query, res);


			if(cb) cb(res2); 
//console.log(8888,res2);
			return res2;

		}); 
//console.log(9999,res1);

//		if(typeof res1 != 'undefined') res1 =  modify(query,res1);

		return res1;
		
	};

//	statement.dbversion = ;
//	console.log(statement.query);
//console.log(202,statement);
	statement.query = query;
	return statement;
};

/**
	Modify res according modifier
	@function
	@param {object} query Query object
	@param res {object|number|string|boolean} res Data to be converted 
*/
function modify(query, res) {
//	console.log(arguments);

	/* If source is a primitive value then return it */
	if(typeof res == 'undefined' || typeof res == 'number' || typeof res == 'string' || typeof res == 'boolean') {
		return res;
	}

	var modifier = query.modifier || alasql.options.modifier;
	var columns = query.columns;
	if(typeof columns == 'undefined' || columns.length == 0) {
		// Try to create columns
		if(res.length > 0) {
			var allcol = {};
			for(var i=0;i<Math.min(res.length,alasql.options.columnlookup||10);i++) {
				for(var key in res[i]) {
					allcol[key] = true;
				}
			}

			columns = Object.keys(allcol).map(function(columnid){
				return {columnid:columnid};
			});			
		} else {
			// Cannot recognize columns
			columns = [];
		}
	}

//	console.log(columns);

	if(modifier == 'VALUE') {
//		console.log(222,res);
		if(res.length > 0) {
			var key;
			if(columns && columns.length > 0) key = columns[0].columnid;
			else key = Object.keys(res[0])[0];
			res = res[0][key];
		} else {
			res = undefined;
		}
	} if(modifier == 'ROW') {
		if(res.length > 0) {
			var key;
			var a = [];
			for(var key in res[0]) {
				a.push(res[0][key]);
			};
			res = a;
		} else {
			res = undefined;
		}
	} if(modifier == 'COLUMN') {
		var ar = [];
		if(res.length > 0) {
			var key;
			if(columns && columns.length > 0) key = columns[0].columnid;
			else key = Object.keys(res[0])[0];
			for(var i=0, ilen=res.length; i<ilen; i++){
				ar.push(res[i][key]);
			}
		};
		res = ar;

	} if(modifier == 'MATRIX') {
		// Returns square matrix of rows
		var ar = [];
		for(var i=0;i<res.length;i++) {		
			var a = [];
			var r = res[i];
			for(var j=0;j<columns.length;j++) {
				a.push(r[columns[j].columnid]);
			}
			ar.push(a);
		}
		res = ar;

	} if(modifier == 'INDEX') {
		var ar = {};
		var key,val;
		if(columns && columns.length > 0) {
			key = columns[0].columnid;
			val = columns[1].columnid;
		} else {
			var okeys = Object.keys(res[0]);
			key = okeys[0];
			val = okeys[1];
		}
		for(var i=0, ilen=res.length; i<ilen; i++){
			ar[res[i][key]] = res[i][val];
		}
		res = ar;
//		res = arrayOfArrays(res);
	} if(modifier == 'RECORDSET') {
		res = new alasql.Recordset({data:res, columns:columns});
//		res = arrayOfArrays(res);
	} if(modifier == 'TEXTSTRING') {
		var key;
		if(columns && columns.length > 0) key = columns[0].columnid;
		else key = Object.keys(res[0])[0];
		var s = '';
		for(var i=0, ilen=res.length; i<ilen; i++){
			res[i] = res[i][key];
		}
		res = res.join('\n');
//		res = arrayOfArrays(res);
	}
	return res;
};



// yy.Select.prototype.exec = function(databaseid) {
// 	throw new Error('Select statement should be precompiled');

// };
yy.Select.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
//	throw new Error('Insert statement is should be compiled')
}

/*
//
// EXISTS and other subqueries functions  functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ExistsValue = function(params) { return yy.extend(this, params); }
yy.ExistsValue.prototype.toString = function() {
	return 'EXISTS('+this.value.toString()+')';
};

yy.ExistsValue.prototype.toType = function() {
	return 'boolean';
};

yy.ExistsValue.prototype.toJavaScript = function(context,tableid,defcols) {
//	return 'ww=this.existsfn['+this.existsidx+'](params,null,p),console.log(ww),ww.length';
	
	return 'this.existsfn['+this.existsidx+'](params,null,'+context+').data.length';
};

yy.Select.prototype.compileWhereExists = function(query) {
	if(!this.exists) return;
	query.existsfn = this.exists.map(function(ex) {
		var nq = ex.compile(query.database.databaseid);
//		console.log(nq);
//		 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		 nq.query.modifier = 'RECORDSET';
		 return nq;
	});
};

yy.Select.prototype.compileQueries = function(query) {
	if(!this.queries) return;
	query.queriesfn = this.queries.map(function(q) {
		 var nq = q.compile(query.database.databaseid);
//		console.log(nq);
//	if(!nq.query) nq.query = {};
		 nq.query.modifier = 'RECORDSET';
//		 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		 return nq;
	});
};

//
// Prepare subqueries and exists
//
alasql.precompile = function(statement,databaseid,params){
//	console.log(statement);
	if(!statement) return;
	statement.params = params;
	if(statement.queries) {	
//console.log(52,statement.queries[0]);
		statement.queriesfn = statement.queries.map(function(q) {
			var nq = q.compile(databaseid || statement.database.databaseid);
//			console.log(nq);
//			 nq.query.modifier = undefined;
//			 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		 nq.query.modifier = 'RECORDSET';
			 return nq;

		});
	}
	if(statement.exists) {
//console.log(62,statement.exists);
		statement.existsfn = statement.exists.map(function(ex) {
			var nq = ex.compile(databaseid || statement.database.databaseid);
//			console.log(nq.query.modifier);
//			 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
//			 if(!nq.query.modifier) nq.query.modifier = 'ARRAY';
		 nq.query.modifier = 'RECORDSET';
			 return nq;

		});
	};
}
/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Select.prototype.compileFrom = function(query) {
//	console.log(1);
	var self = this;
	query.sources = [];
//	var tableid = this.from[0].tableid;
//	var as = '';
//	if(self.from[0].as) as = this.from[0].as;
//console.log(this);
	query.aliases = {};
	if(!self.from) return;

//console.log(self.from);

	self.from.forEach(function(tq){
		//console.log(tq);
//console.log(tq,tq.toJavaScript());

		var alias = tq.as || tq.tableid;
//		console.log(alias);
		if(tq instanceof yy.Table) {
//			console.log(tq, tq.databaseid, query);
			query.aliases[alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid, type:'table'};
		} else if(tq instanceof yy.Select) {
			query.aliases[alias] = {type:'subquery'};
		} else if(tq instanceof yy.Search) {
			query.aliases[alias] = {type:'subsearch'};
		} else if(tq instanceof yy.ParamValue) {
			query.aliases[alias] = {type:'paramvalue'};
		} else if(tq instanceof yy.FuncValue) {
			query.aliases[alias] = {type:'funcvalue'};
		} else if(tq instanceof yy.VarValue) {
			query.aliases[alias] = {type:'varvalue'};
		} else if(tq instanceof yy.FromData) {
			query.aliases[alias] = {type:'fromdata'};
		} else if(tq instanceof yy.Json) {
			query.aliases[alias] = {type:'json'};
		} else {
			throw new Error('Wrong table at FROM');
		}

		var source = {
			alias: alias,
			databaseid: tq.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			joinmode: 'INNER',
			onmiddlefn: returnTrue,			
			srcwherefns: '',	// for optimization
			srcwherefn: returnTrue,
//			columns: []			
		};

		if(tq instanceof yy.Table) {
			// Get columns from table
			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;
//			console.log('test',alasql.options.autocommit);
//				console.log(997,alasql.databases[source.databaseid].engineid);
// console.log(0,source.databaseid);
// console.log(1,alasql.databases[source.databaseid]);
// console.log(2,alasql.databases[source.databaseid].tables[source.tableid].view);
			if(alasql.options.autocommit && alasql.databases[source.databaseid].engineid) {
//				console.log(997,alasql.databases[source.databaseid].engineid);
// TODO -- make view for external engine
				source.datafn = function(query,params,cb,idx, alasql) {
					return alasql.engines[alasql.databases[source.databaseid].engineid].fromTable(
						source.databaseid, source.tableid,cb,idx,query);
				}				
			} else if(alasql.databases[source.databaseid].tables[source.tableid].view){
				source.datafn = function(query,params,cb,idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if(cb) res = cb(res,idx,query);
					return res;
				}
			} else {
//				console.log('here');
//				console.log(420,72,alasql.databases[source.databaseid].tables[source.tableid]);
				source.datafn = function(query,params,cb,idx, alasql) {
				// if(!query) console.log('query');
				// if(!query.database) console.log('query');
				// if(!query.database.tables) console.log('query');
				// if(!source.tableid) console.log('query');
				// if(!query.database.tables[source.tableid]) console.log(query);
				// if(!query.database.tables[source.tableid].data) console.log('query');
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;
//				console.log(500,res);
					if(cb) res = cb(res,idx,query);
//				console.log(600,res);
					return res;
//				return alasql.databases[source.databaseid].tables[source.tableid].data;
				};
			}
		} else if(tq instanceof yy.Select) {

			source.subquery = tq.compile(query.database.databaseid);
			if(typeof source.subquery.query.modifier == 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;
//			console.log(101,source.columns);
//			tq.columns;

			source.datafn = function(query, params, cb, idx, alasql) {
//				return source.subquery(query.params, cb, idx, query);
				var res;
				source.subquery(query.params, function(data){
					res = data.data;
					if(cb) res = cb(res,idx,query);
					return res;
//					return data.data;
				});
//					console.log(515,res);
				return res;
			}						
		} else if(tq instanceof yy.Search) {

			 source.subsearch = tq;
			 source.columns = [];
			 //.compile(query.database.databaseid);
			// if(typeof source.subquery.query.modifier == 'undefined') {
			// 	source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			// }
			// source.columns = source.subquery.query.columns;
//			console.log(101,source.columns);
//			tq.columns;

			source.datafn = function(query, params, cb, idx, alasql) {
//				return source.subquery(query.params, cb, idx, query);
				var res;
				source.subsearch.execute(query.database.databaseid,query.params,function(data){
					res = data;
					if(cb) res = cb(res,idx,query);
					return res;
//					return data.data;
				});
//					console.log(515,res);
				return res;
			}						
		} else if(tq instanceof yy.ParamValue) {

			var ps = "var res = alasql.prepareFromData(params['"+tq.param+"']";
//				console.log(tq);
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);

		} else if(tq instanceof yy.Json) {
			var ps = "var res = alasql.prepareFromData("+tq.toJavaScript();
//				console.log(tq);
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof yy.VarValue) {
			var ps = "var res = alasql.prepareFromData(alasql.vars['"+tq.variable+"']";
//				console.log(tq);
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof yy.FuncValue) {
			var s = "var res=alasql.from['"+tq.funcid.toUpperCase()+"'](";
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJavaScript();
			// 	}).concat('cb,idx,query').join(',');
			// }
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJavaScript();
			// 	}).concat().join(',');
			// }
			if(tq.args && tq.args.length>0) {
				if(tq.args[0]) {
					s += tq.args[0].toJavaScript('query.oldscope')+',';
				} else {
					s += 'null,';
				};
				if(tq.args[1]) {
					s += tq.args[1].toJavaScript('query.oldscope')+',';
				} else {
					s += 'null,';
				};
			} else {
				s += 'null,null,'
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';
//	console.log(s);
			source.datafn = new Function('query, params, cb, idx, alasql',s);

		} else if(tq instanceof yy.FromData) {
				source.datafn = function(query,params,cb,idx, alasql) {
					var res = tq.data;
					if(cb) res = cb(res,idx,query);
					return res;
				}				
		} else {
			throw new Error('Wrong table at FROM');
		}
//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
		query.sources.push(source);

	});
	// TODO Add joins
	query.defaultTableid = query.sources[0].alias;
//console.log(query.defaultTableid);
};

alasql.prepareFromData = function(data,array) {
//console.log(177,data,array);
	var res = data;
	if(typeof data == "string") {
		res = data.split(/\r?\n/);
		if(array) {
			for(var i=0, ilen=res.length; i<ilen;i++) {
				res[i] = [res[i]];
			}
		}
	} else if(array) {
		res = [];
		for(var i=0, ilen=data.length; i<ilen;i++) {
			res.push([data[i]]);
		}
//		console.log(res);
	} else if(typeof data == 'object' && !(data instanceof Array)) {
//	} else if(typeof data == 'object' && !(typeof data.length == 'undefined')) {
		if(typeof Mongo != 'undefined' && typeof Mongo.Collection != 'undefined'
			&& data instanceof Mongo.Collection) {
			res = data.find().fetch();
		} else {
			res = [];
			for(var key in data) {
				if(data.hasOwnProperty(key)) res.push([key,data[key]]);
			};			
		}

//		console.log(res);
	};
//	console.log(typeof data);
	return res;
};


/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT Compile functions


// Compile JOIN caluese
yy.Select.prototype.compileJoins = function(query) {
//	console.log(this);
//	debugger;
	var self = this;




	this.joins.forEach(function(jn){

		// Test CROSS-JOIN
		if(jn.joinmode == "CROSS") {
			if(jn.using || jn.on) {
				throw new Error('CROSS JOIN cannot have USING or ON clauses');
			} else {
				jn.joinmode == "INNER";
			}
		}

		var source;
		var tq;

		if(jn instanceof yy.Apply) {
//			console.log('APPLY',jn.applymode);
			source = {
				alias: jn.as,
				applymode: jn.applymode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue,
				columns: [] // TODO check this
			};
			source.applyselect = jn.select.compile(query.database.databaseid);
			source.columns = source.applyselect.query.columns;

			source.datafn = function(query,params,cb,idx, alasql) {
				var res;
				if(cb) res = cb(res,idx,query);
				return res;
			}

			query.sources.push(source);
		} else {

		if(jn.table) {
			tq = jn.table;
			source = {
				alias: jn.as||tq.tableid,
				databaseid: tq.databaseid || query.database.databaseid,
				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue,
				columns: []				
			};
			//

//			console.log(source.databaseid, source.tableid);
			if(!alasql.databases[source.databaseid].tables[source.tableid]) {
				throw new Error('Table \''+source.tableid+
				'\' is not exists in database \''+source.databaseid)+'\'';
			};

			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;

			// source.data = query.database.tables[source.tableid].data;
			if(alasql.options.autocommit && alasql.databases[source.databaseid].engineid) {
//				console.log(997,alasql.databases[source.databaseid].engineid);
				source.datafn = function(query,params, cb, idx, alasql) {
//					console.log(777,arguments);
					return alasql.engines[alasql.databases[source.databaseid].engineid].fromTable(
						source.databaseid, source.tableid, cb, idx,query);
				}				
			} else if(alasql.databases[source.databaseid].tables[source.tableid].view){
				source.datafn = function(query,params,cb,idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if(cb) res = cb(res,idx,query);
					return res;
				}
			} else {
				source.datafn = function(query,params,cb, idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;
					if(cb) res = cb(res,idx,query);
					return res;
				}
			};

//		var alias = jn.as || tq.tableid;
//		if(tq) {
			query.aliases[source.alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid};
//		}


		} else if(jn.select) {
			var tq = jn.select;
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue,
				columns: []
			};
			
			source.subquery = tq.compile(query.database.databaseid);
			if(typeof source.subquery.query.modifier == 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;
			
//			if(jn instanceof yy.Apply) {
				source.datafn = function(query, params, cb, idx, alasql) {
//					return cb(null,idx,alasql);
					return source.subquery(query.params, null, cb, idx).data;
				}				
			// } else {
			// 	source.datafn = function(query, params, cb, idx, alasql) {
			// 		return source.subquery(query.params, null, cb, idx);
			// 	}				
			// }
			query.aliases[source.alias] = {type:'subquery'};
		} else if(jn.param) {
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;
			var jnparam = jn.param.param;
//			console.log(jn, jnparam);
			var ps = "var res=alasql.prepareFromData(params['"+jnparam+"']";
			if(jn.array) ps += ",true";
			ps += ");if(cb)res=cb(res, idx, query);return res";

			source.datafn = new Function('query,params,cb,idx, alasql',ps);
			query.aliases[source.alias] = {type:'paramvalue'};
		} else if(jn.variable) {
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;
//			var jnparam = jn.param.param;
//			console.log(jn, jnparam);
			var ps = "var res=alasql.prepareFromData(alasql.vars['"+jn.variable+"']";
			if(jn.array) ps += ",true";
			ps += ");if(cb)res=cb(res, idx, query);return res";

			source.datafn = new Function('query,params,cb,idx, alasql',ps);
			query.aliases[source.alias] = {type:'varvalue'};
		} else if(jn.funcid) {
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;

/*
			var jnparam = jn.param.param;
			source.datafn = new Function('query,params,cb,idx',
				"var res=alasql.prepareFromData(params['"+jnparam+"']);if(cb)res=cb(res, idx, query);return res");
*/

			var s = "var res=alasql.from['"+js.funcid.toUpperCase()+"'](";
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJavaScript();
			// 	}).concat('cb,idx,query').join(',');
			// }
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJavaScript();
			// 	}).concat().join(',');
			// }
			if(jn.args && jn.args.length>0) {
				if(jn.args[0]) {
					s += jn.args[0].toJavaScript('query.oldscope')+',';
				} else {
					s += 'null,';
				};
				if(jn.args[1]) {
					s += jn.args[1].toJavaScript('query.oldscope')+',';
				} else {
					s += 'null,';
				};
			} else {
				s += 'null,null,'
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';
//	console.log(s);
			source.datafn = new Function('query, params, cb, idx, alasql',s);

			query.aliases[source.alias] = {type:'funcvalue'};
		}
/*
		} else if(tq instanceof yy.Select) {
			query.aliases[alias] = {type:'subquery'};
		} else if(tq instanceof yy.ParamValue) {
			query.aliases[alias] = {type:'paramvalue'};
		} else if(tq instanceof yy.FuncValue) {
			query.aliases[alias] = {type:'paramvalue'};
		} else {
			throw new Error('Wrong table at FROM');
		}
*/
		var alias = source.alias;

		// Test NATURAL-JOIN
		if(jn.natural) {
			if(jn.using || jn.on) {
				throw new Error('NATURAL JOIN cannot have USING or ON clauses');
			} else {
//				source.joinmode == "INNER";
				if(query.sources.length > 0) {
					var prevSource = query.sources[query.sources.length-1];
					var prevTable = alasql.databases[prevSource.databaseid].tables[prevSource.tableid];
					var table = alasql.databases[source.databaseid].tables[source.tableid];

					if(prevTable && table) {
						var c1 = prevTable.columns.map(function(col){return col.columnid});
						var c2 = table.columns.map(function(col){return col.columnid});
						jn.using = arrayIntersect(c1,c2).map(function(colid){return {columnid:colid}});
//						console.log(jn.using);
					} else {
						throw new Error('In this version of Alasql NATURAL JOIN '+
							'works for tables with predefined columns only');
					};
				}
			}
		}







		if(jn.using) {
			var prevSource = query.sources[query.sources.length-1];
//			console.log(query.sources[0],prevSource,source);
			source.onleftfns = jn.using.map(function(col){
//				console.log(141,colid);
				return "p['"+(prevSource.alias||prevSource.tableid)+"']['"+col.columnid+"']";
			}).join('+"`"+');



			source.onleftfn = new Function('p,params,alasql','var y;return '+source.onleftfns);

			source.onrightfns = jn.using.map(function(col){
				return "p['"+(source.alias||source.tableid)+"']['"+col.columnid+"']";
			}).join('+"`"+');
			source.onrightfn = new Function('p,params,alasql','var y;return '+source.onrightfns);
			source.optimization = 'ix';
//			console.log(151,source.onleftfns, source.onrightfns);
//			console.log(source);
		} else if(jn.on) {
//console.log(jn.on);
			if(jn.on instanceof yy.Op && jn.on.op == '=' && !jn.on.allsome) {
//				console.log('ix optimization', jn.on.toJavaScript('p',query.defaultTableid) );
				source.optimization = 'ix';
			// 	source.onleftfns = jn.on.left.toJavaScript('p',query.defaultTableid);
			// 	source.onleftfn = new Function('p', 'return '+source.onleftfns);
			// 	source.onrightfns = jn.on.right.toJavaScript('p',query.defaultTableid);
			// 	source.onrightfn = new Function('p', 'return '+source.onrightfns);

				var lefts = '';
				var rights = '';
				var middles = '';
				var middlef = false;
				// Test right and left sides
				var ls = jn.on.left.toJavaScript('p',query.defaultTableid,query.defcols);
				var rs = jn.on.right.toJavaScript('p',query.defaultTableid,query.defcols);

				if((ls.indexOf("p['"+alias+"']")>-1) && !(rs.indexOf("p['"+alias+"']")>-1)){
					if((ls.match(/p\[\'.*?\'\]/g)||[]).every(function(s){ 
						return s == "p['"+alias+"']"})) { rights = ls; } 
						else { middlef = true };

				} else 	if(!(ls.indexOf("p['"+alias+"']")>-1) && (rs.indexOf("p['"+alias+"']")>-1)){
					if((rs.match(/p\[\'.*?\'\]/g)||[]).every(function(s){ 
						return s == "p['"+alias+"']"})) { lefts = ls; } 
						else { middlef = true };
				} else {
					middlef = true;
				}

//				console.log(alias, 1,lefts, rights, middlef);

				if((rs.indexOf("p['"+alias+"']")>-1) && !(ls.indexOf("p['"+alias+"']")>-1)){
					if((rs.match(/p\[\'.*?\'\]/g)||[]).every(function(s){ 
						return s == "p['"+alias+"']"})) { rights = rs; } 
						else { middlef = true };
				} else if(!(rs.indexOf("p['"+alias+"']")>-1) && (ls.indexOf("p['"+alias+"']")>-1)){
					if((ls.match(/p\[\'.*?\'\]/g)||[]).every(function(s){ 
						return s == "p['"+alias+"']"})) { lefts = rs; } 
						else { middlef = true };
				} else {
					middlef = true;
				}

//				console.log(alias, 2,lefts, rights, middlef);

				if(middlef) {
//					middles = jn.on.toJavaScript('p',query.defaultTableid);
//				} else {
					rights = '';
					lefts = '';
					middles = jn.on.toJavaScript('p',query.defaultTableid,query.defcols);
					source.optimization = 'no';
					// What to here?
				} 

				source.onleftfns = lefts;
				source.onrightfns = rights;
				source.onmiddlefns = middles || 'true';
//			console.log(source.onleftfns, '-',source.onrightfns, '-',source.onmiddlefns);

				source.onleftfn = new Function('p,params,alasql', 'var y;return '+source.onleftfns);
				source.onrightfn = new Function('p,params,alasql', 'var y;return '+source.onrightfns);
				source.onmiddlefn = new Function('p,params,alasql', 'var y;return '+source.onmiddlefns);

//			} else if(jn.on instanceof yy.Op && jn.on.op == 'AND') {
//				console.log('join on and ',jn);

			} else {
//				console.log('no optimization');
				source.optimization = 'no';
//				source.onleftfn = returnTrue;
//				source.onleftfns = "true";
				source.onmiddlefns = jn.on.toJavaScript('p',query.defaultTableid,query.defcols);
				source.onmiddlefn = new Function('p,params,alasql','var y;return '+jn.on.toJavaScript('p',query.defaultTableid,query.defcols));
			};
//			console.log(source.onleftfns, source.onrightfns, source.onmiddlefns);

			// Optimization function
		};

//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
//console.log(source, jn);
		// TODO SubQueries
/*		if(source.joinmode == 'RIGHT') {
			var prevSource = query.sources.pop();
			if(prevSource.joinmode == 'INNER') {
				prevSource.joinmode = 'LEFT';
				var onleftfn = prevSource.onleftfn;
				var onleftfns = prevSource.onleftfns;
				var onrightfn = prevSource.onrightfn;
				var onrightfns = prevSource.onrightfns;
				var optimization = prevSource.optimization;

				prevSource.onleftfn = source.onrightfn;
				prevSource.onleftfns = source.onrightfns;
				prevSource.onrightfn = source.onleftfn;
				prevSource.onrightfns = source.onleftfns;
				prevSource.optimization = source.optimization;

				source.onleftfn = onleftfn;
				source.onleftfns = onleftfns;
				source.onrightfn = onrightfn;
				source.onrightfns = onrightfns;
				source.optimization = optimization;

				source.joinmode = 'INNER';
				query.sources.push(source);
				query.sources.push(prevSource);
			} else {
				throw new Error('Do not know how to process this SQL');
			}
		} else {
			query.sources.push(source);
		}
*/	
		query.sources.push(source);
		};
	});
//	console.log('sources',query.sources);
}


yy.Select.prototype.compileWhere = function(query) {
	if(this.where) {
		if(typeof this.where == "function") {
			return this.where;
		} else {
			s = this.where.toJavaScript('p',query.defaultTableid,query.defcols);
			query.wherefns = s;
//		console.log(s);
			return new Function('p,params,alasql','var y;return '+s);
		}
	} else return function(){return true};
};



yy.Select.prototype.compileWhereJoins = function(query) {
	return;

	// TODO Fix Where optimization
	//console.log(query);

	optimizeWhereJoin(query, this.where.expression);

	//for sources compile wherefs
	query.sources.forEach(function(source) {
		if(source.srcwherefns) {
			source.srcwherefn = new Function('p,params,alasql','var y;return '+source.srcwherefns);
		};
		if(source.wxleftfns) {
			source.wxleftfn = new Function('p,params,alasql','var y;return '+source.wxleftfns);
		};
		if(source.wxrightfns) {
			source.wxrightfn = new Function('p,params,alasql','var y;return '+source.wxrightfns);
		};
//		console.log(source.alias, source.wherefns)
//		console.log(source);
	});
};

function optimizeWhereJoin (query, ast) {
	if(!ast) return false;
	if(!(ast instanceof yy.Op)) return;
	if(ast.op != '=' && ast.op != 'AND') return;
	if(ast.allsome) return;

	var s = ast.toJavaScript('p',query.defaultTableid,query.defcols);
	var fsrc = [];
	query.sources.forEach(function(source,idx) {
		// Optimization allowed only for tables only
		if(source.tableid) {
			// This is a good place to remove all unnecessary optimizations
			if(s.indexOf('p[\''+source.alias+'\']')>-1) fsrc.push(source);
		};
	});
//console.log(fsrc.length);
//	if(fsrc.length < query.sources.length) return;
//	console.log(ast);
//	console.log(s);
//	console.log(fsrc.length);
	if(fsrc.length == 0) {
//		console.log('no optimization, can remove this part of ast');
		return;
	} else if (fsrc.length == 1) {

		if(!(s.match(/p\[\'.*?\'\]/g)||[])
			.every(function(s){ 
						return s == "p['"+fsrc[0].alias+"']"})) { 
			return; 
			// This is means, that we have column from parent query
			// So we return without optimization
		} 

		var src = fsrc[0]; // optmiization source
		src.srcwherefns = src.srcwherefns ? src.srcwherefns+'&&'+s : s;

		if((ast instanceof yy.Op) && (ast.op == '=' && !ast.allsome)) {
			if(ast.left instanceof yy.Column) {
				var ls = ast.left.toJavaScript('p',query.defaultTableid,query.defcols);
				var rs = ast.right.toJavaScript('p',query.defaultTableid,query.defcols);
				if(rs.indexOf('p[\''+fsrc[0].alias+'\']') == -1) {
					fsrc[0].wxleftfns = ls; 
					fsrc[0].wxrightfns = rs; 
				} 
			} if(ast.right instanceof yy.Column) {
				var ls = ast.left.toJavaScript('p',query.defaultTableid,query.defcols);
				var rs = ast.right.toJavaScript('p',query.defaultTableid,query.defcols);
				if(ls.indexOf('p[\''+fsrc[0].alias+'\']') == -1) {
					fsrc[0].wxleftfns = rs; 
					fsrc[0].wxrightfns = ls; 
				} 
			}
		}
		ast.reduced = true;  // To do not duplicate wherefn and srcwherefn
		return;
	} else {
		if(ast.op = 'AND') {
			optimizeWhereJoin(query,ast.left);
			optimizeWhereJoin(query,ast.right);
		} 
	}

};



/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
 Compile group of statements
 */
yy.Select.prototype.compileGroup = function(query) {
//	console.log(this.group);
	var self = this;
	if(query.sources.length > 0) {
		var tableid = query.sources[0].alias;
	} else {
		// If SELECT contains group aggregators without source tables
		var tableid = '';
	}
	var defcols = query.defcols;
//	console.log(16,tableid, defcols);

//	console.log(query.sources[0].alias,query.defcols);
	var allgroup = [[]];
	if(this.group) {
		allgroup = decartes(this.group,query);
	}
//	console.log(23,allgroup);

//	console.log(allgroup);
	// Prepare groups
	//var allgroup = [['a'], ['a','b'], ['a', 'b', 'c']];

	// Union all arrays to get a maximum
	var allgroups = [];
	allgroup.forEach(function(a){
		allgroups = arrayUnion(allgroups, a);
	});

	query.allgroups = allgroups;

//console.log(42,294, this.group);
//console.log(allgroups);
//		console.log(42,364,query.selectColumns)

if(false) {
	allgroups.forEach(function(col2){
//		console.log(42,365,colid, query.selectColumns[colid])
		if(query.selectColumns[colid]) {
//			console.log(colid,'ok');
		} else {
//			if(colid.indexOf())
//			console.log(colid,'bad');	
			var tmpid = 'default';
			if(query.sources.length > 0) tmpid = query.sources[0].alias;
//			console.log(new yy.Column({columnid:colid}).toJavaScript('p',query.sources[0].alias));
//			query.selectfns += 'r[\''+colid+'\']=p[\''+tmpid+'\'][\''+colid+'\'];';
//console.log(374, colid);
			if(Object.keys(query.selectColumns).length != 0) query.removeKeys.push(colid);
			query.selectfns += 'r[\''+escapeq(colid)+'\']='+(new yy.Column({columnid:colid}).toJavaScript('p',tmpid))+';';
		}
	});
};

	// Create negative array

	var s = '';
//	s+= query.selectfns;

	allgroup.forEach(function(agroup) {
//console.log(agroup);

		// Start of group function
		s += 'var acc,g=this.xgroups[';

	//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r
		// Array with group columns from record
		var rg = agroup.map(function(col2){
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];
			// Check, if aggregator exists but GROUP BY is not exists
			if(columnid == '') return '1'; // Create fictive groupping column for fictive GROUP BY
//			else return "r['"+columnid+"']";
			else return coljs;
		});
		if(rg.length == 0) rg = ["''"];

	//	console.log('rg',rg);

		s += rg.join('+"`"+');
		s += '];if(!g) {this.groups.push((g=this.xgroups[';
		s += rg.join('+"`"+');
		s += '] = {';
//		s += ']=r';
		s += agroup.map(function(col2){
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];

			if(columnid == '') return '';
			else return "'"+columnid+"':"+coljs+",";
		}).join('');

		var neggroup = arrayDiff(allgroups,agroup);

//		console.log(neggroup);

		s += neggroup.map(function(col2){			
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1]
			return "'"+columnid+"':null,";
		}).join('');

		var aft = '';
//		s += self.columns.map(function(col){
//console.log('query.selectGroup',query.selectGroup);
		s += query.selectGroup.map(function(col,idx){
//console.log(idx, col.toString(), col.as);
			var colexp = col.expression.toJavaScript("p",tableid,defcols);
			var colas = col.nick;
			// if(typeof colas == 'undefined') {
			// 	if(col instanceof yy.Column) colas = col.columnid;
			// 	else colas = col.toString();
			// };
			if (col instanceof yy.AggrValue) { 
				if(col.distinct) {
					aft += ',g[\'$$_VALUES_'+colas+'\']={},g[\'$$_VALUES_'+colas+'\']['+colexp+']=true';
				};
				if (col.aggregatorid == 'SUM'
//					|| col.aggregatorid == 'AVG'
//				) { return '\''+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJavaScript(); 	
				) { return '\''+colas+'\':('+colexp+')||0,'; //f.field.arguments[0].toJavaScript(); 	
				} else if (col.aggregatorid == 'MIN'
					|| col.aggregatorid == 'MAX'
					|| col.aggregatorid == 'FIRST'
					|| col.aggregatorid == 'LAST'
//					|| col.aggregatorid == 'AVG'
//				) { return '\''+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJavaScript(); 	
				) { return '\''+colas+'\':'+colexp+','; //f.field.arguments[0].toJavaScript(); 	
				} else if(col.aggregatorid == 'ARRAY') {
				 	return '\''+colas+'\':['+colexp+'],';
				} else if(col.aggregatorid == 'COUNT') { 
					if(col.expression.columnid == '*') {
						return '\''+colas+'\':1,';
					} else {
//						return '\''+colas+'\':(typeof '+colexp+' != "undefined")?1:0,';  
//					} else {
						return '\''+colas+'\':(typeof '+colexp+' != "undefined")?1:0,'; 
					}

//				else if(col.aggregatorid == 'MIN') { return '\''+col.as+'\':r[\''+col.as+'\'],'; }
//				else if(col.aggregatorid == 'MAX') { return '\''+col.as+'\':r[\''+col.as+'\'],'; }
				} else if(col.aggregatorid == 'AVG') { 
					query.removeKeys.push('_SUM_'+colas);
					query.removeKeys.push('_COUNT_'+colas);
					return '\''+colas+'\':'+colexp+',\'_SUM_'+colas+'\':('+colexp+')||0,\'_COUNT_'+colas+'\':(typeof '+colexp+' != "undefined")?1:0,'; 
				} else if(col.aggregatorid == 'AGGR') {
					aft += ',g[\''+colas+'\']='+col.expression.toJavaScript('g',-1); 
					return '';
				} else if(col.aggregatorid == 'REDUCE') {
					query.removeKeys.push('_REDUCE_'+colas);
					return '\''+colas+'\':alasql.aggr[\''+col.funcid+'\']('+colexp+',undefined,(acc={})),'
					+'\'__REDUCE__'+colas+'\':acc,'; 
				}
				return '';
			} else return '';
		}).join('');





		// columnid:r.columnid
	//	var srg = [];//rg.map(function(fn){ return (fn+':'+fn); });

	//	var srg = this.group.map(function(col){
	//		if(col == '') return '';
	//		else return col.columnid+':'+col.toJavaScript('r','');
	//	});

	// Initializw aggregators

	/*
		this.columns.forEach(function(col){
	//		console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';


			if (col instanceof yy.AggrValue) { 
				if (col.aggregatorid == 'SUM') { srg.push("'"+col.as+'\':0'); }//f.field.arguments[0].toJavaScript(); 	
				else if(col.aggregatorid == 'COUNT') {srg.push( "'"+col.as+'\':0'); }
				else if(col.aggregatorid == 'MIN') { srg.push( "'"+col.as+'\':Infinity'); }
				else if(col.aggregatorid == 'MAX') { srg.push( "'"+col.as+'\':-Infinity'); }
	//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
			};

		});

	*/

	/*****************/

	//	s += srg.join(',');

		// var ss = [];
		// gff.forEach(function(fn){
		// 	ss.push(fn+':rec.'+fn);
		// });
		// s += ss.join(',');
	//	s += '});};';

		s += '}'+aft+',g));} else {';
	//	console.log(s, this.columns);



	// var neggroup = arrayDiff(allgroups,agroup);

	// console.log(agroup,neggroup);

	// s += neggroup.map(function(columnid){
	// 	return "g['"+columnid+"']=null;";
	// }).join('');

	// console.log(s);


	//console.log(query.selectfn);
//		s += self.columns.map(function(col){
		s += query.selectGroup.map(function(col,idx){
			var colas = col.nick;
			// if(typeof colas == 'undefined') {
			// 	if(col instanceof yy.Column) colas = col.columnid;
			// 	else colas = col.toString();
			// }
			var colexp = col.expression.toJavaScript("p",tableid,defcols);

			if (col instanceof yy.AggrValue) { 
				if(col.distinct) {
			 		var pre = 'if(typeof '+colexp+'!="undefined" && (!g[\'$$_VALUES_'+colas+'\']['+colexp+'])) \
				 		 {';
				 	var post = 'g[\'$$_VALUES_'+colas+'\']['+colexp+']=true;}';
				} else {
					var pre = '', post = '';
				}
				if (col.aggregatorid == 'SUM') { return pre+'g[\''+colas+'\']+=('+colexp+'||0);'+post; }//f.field.arguments[0].toJavaScript(); 	
				else if(col.aggregatorid == 'COUNT') {
//					console.log(221,col.expression.columnid == '*');
					if(col.expression.columnid == '*') return pre+'g[\''+colas+'\']++;'+post; 
				 	else {
						return pre+'if(typeof '+colexp+'!="undefined") g[\''+colas+'\']++;'+post;
					}
				}
				else if(col.aggregatorid == 'ARRAY') { return pre+'g[\''+colas+'\'].push('+colexp+');'+post; }
				else if(col.aggregatorid == 'MIN') { return pre+'g[\''+colas+'\']=Math.min(g[\''+colas+'\'],'+colexp+');'+post; }
				else if(col.aggregatorid == 'MAX') { return pre+'g[\''+colas+'\']=Math.max(g[\''+colas+'\'],'+colexp+');'+post; }
				else if(col.aggregatorid == 'FIRST') { return ''; }
				else if(col.aggregatorid == 'LAST') { return pre+'g[\''+colas+'\']='+colexp+';'+post; }
				else if(col.aggregatorid == 'AVG') { 
						return pre+'g[\'_SUM_'+colas+'\']+=(y='+colexp+')||0;'
						+ 'g[\'_COUNT_'+colas+'\']+=(typeof y!="undefined")?1:0;'
						+ 'g[\''+colas+'\']=g[\'_SUM_'+colas+'\']/g[\'_COUNT_'+colas+'\'];'+post; 
//					 }
	//			else if(col.aggregatorid == 'AVG') { srg.push(colas+':0'); }
				} else if(col.aggregatorid == 'AGGR') {
					return pre+'g[\''+colas+'\']='+col.expression.toJavaScript('g',-1)+';'+post; 
				} else if(col.aggregatorid == 'REDUCE') {
					return pre+'g[\''+colas+'\']=alasql.aggr.'+col.funcid+'('+colexp+',g[\''+colas+'\'],g[\'__REDUCE__'+colas+'\']);'+post; 
				}
				return '';
			} else return '';
		}).join('');


	//	s += selectFields.map(function(f){
	//			console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';
	//			if (f.field instanceof SQLParser.nodes.FunctionValue 
	//				&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
	//				return 'group.'+f.name.value+'+='+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
	//				return 'group.'+f.name.value+'+=rec.'+f.name.value+';'; //f.field.arguments[0].toJavaScript(); 	
	//			};
	//			return '';
	//		}).join('');

		//s += '	group.amt += rec.emplid;';
		//s += 'group.count++;';
		s += '}';

	});

//		console.log('groupfn',s);
	return new Function('p,params,alasql',s);

}

/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// yy.Select.prototype.compileSources = function(query) {
// 	return sources;
// };

function compileSelectStar (query,alias) {
	// console.log(query.aliases[alias]);
//	console.log(query,alias);
	// console.log(query.aliases[alias].tableid);
//	console.log(42,631,alias);
//	console.log(query.aliases);
	var s = '', sp = '', ss=[];
//	if(!alias) {
//		sp += 'for(var k1 in p) var w=p[k1];for(var k2 in w){r[k2]=w[k2]};';
//	} else 	{

		// TODO move this out of this function 
		query.ixsources = {};
		query.sources.forEach(function(source){
			query.ixsources[source.alias] = source;
		});

		// Fixed
		var columns;
		if(query.ixsources[alias]) {
			var columns = query.ixsources[alias].columns;
		}

//		if(columns.length == 0 && query.aliases[alias].tableid) {
//			var columns = alasql.databases[query.aliases[alias].databaseid].tables[query.aliases[alias].tableid].columns;
//		};



		// Check if this is a Table or other

		if(columns && columns.length > 0) {
			columns.forEach(function(tcol){
				ss.push('\''+tcol.columnid+'\':p[\''+alias+'\'][\''+tcol.columnid+'\']');
				query.selectColumns[escapeq(tcol.columnid)] = true;

//			console.log('ok',tcol);

				var coldef = {
					columnid:tcol.columnid, 
					dbtypeid:tcol.dbtypeid, 
					dbsize:tcol.dbsize, 
					dbprecision:tcol.dbprecision,
					dbenum: tcol.dbenum
				};
				query.columns.push(coldef);
				query.xcolumns[coldef.columnid]=coldef;

			});
//console.log(999,columns);			
		} else {
//					console.log(60,alias,columns);

			// if column not exists, then copy all
			sp += 'var w=p["'+alias+'"];for(var k in w){r[k]=w[k]};';
//console.log(777, sp);
			query.dirtyColumns = true;
		}
//	}
//console.log({s:ss.join(','),sp:sp});
	return {s:ss.join(','),sp:sp};
}


yy.Select.prototype.compileSelect1 = function(query) {
	var self = this;
	query.columns = [];
	query.xcolumns = {};
	query.selectColumns = {};
	query.dirtyColumns = false;
	var s = 'var r={';
	var sp = '';
	var ss = [];

//console.log(42,87,this.columns);

	this.columns.forEach(function(col){
//console.log(col);		
		if(col instanceof yy.Column) {
			if(col.columnid == '*') {
				if(col.func) {
					sp += 'r=params[\''+col.param+'\'](p[\''+query.sources[0].alias+'\'],p,params,alasql);';
				} else if(col.tableid) {
					//Copy all
					var ret = compileSelectStar(query, col.tableid);
					if(ret.s)  ss = ss.concat(ret.s);
					sp += ret.sp;

				} else {
//					console.log('aliases', query.aliases);
					for(var alias in query.aliases) {
						var ret = compileSelectStar(query, alias); //query.aliases[alias].tableid);
						if(ret.s) ss = ss.concat(ret.s);
						sp += ret.sp;
					}
					// TODO Remove these lines
					// In case of no information 
					// sp += 'for(var k1 in p){var w=p[k1];'+
					// 			'for(k2 in w) {r[k2]=w[k2]}}'
				}
			} else {
				// If field, otherwise - expression
				var tbid = col.tableid;
//				console.log(query.sources);
				var dbid = col.databaseid || query.sources[0].databaseid || query.database.databaseid;
				if(!tbid) tbid = query.defcols[col.columnid];
				if(!tbid) tbid = query.defaultTableid;
				if(col.columnid != '_') {
					ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(tbid)+'\'][\''+col.columnid+'\']');
				} else {
					ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(tbid)+'\']');					
				}
				query.selectColumns[escapeq(col.as || col.columnid)] = true;

				if(query.aliases[tbid] && query.aliases[tbid].type == 'table') {

					if(!alasql.databases[dbid].tables[query.aliases[tbid].tableid]) {
//						console.log(query.database,tbid,query.aliases[tbid].tableid);
						throw new Error('Table \''+(tbid)+'\' does not exists in database');
					}
					var columns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].columns;					
					var xcolumns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].xcolumns;
//console.log(xcolumns, col,123);
//					console.log(0);
					if(xcolumns && columns.length > 0) {
//						console.log(1);
						var tcol = xcolumns[col.columnid];
						var coldef = {
							columnid:col.as || col.columnid, 
							dbtypeid:tcol.dbtypeid, 
							dbsize:tcol.dbsize, 
							dbpecision:tcol.dbprecision,
							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
					} else {
						var coldef = {
							columnid:col.as || col.columnid, 
//							dbtypeid:tcol.dbtypeid, 
//							dbsize:tcol.dbsize, 
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;

						query.dirtyColumns = true;
					}
				} else {
						var coldef = {
							columnid:col.as || col.columnid, 
//							dbtypeid:tcol.dbtypeid, 
//							dbsize:tcol.dbsize, 
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
					// This is a subquery? 
					// throw new Error('There is now such table \''+col.tableid+'\'');
				};

			}
		} else if(col instanceof yy.AggrValue) {
			if(!self.group) {
//				self.group=[new yy.Column({columnid:'q',as:'q'	})];
				self.group = [''];
			}
			if(!col.as) col.as = escapeq(col.toString());
			if (col.aggregatorid == 'SUM' || col.aggregatorid == 'MAX' ||  col.aggregatorid == 'MIN' ||
				col.aggregatorid == 'FIRST' || col.aggregatorid == 'LAST' ||  
				col.aggregatorid == 'AVG' || col.aggregatorid == 'ARRAY' || col.aggregatorid == 'REDUCE'
				) {
				ss.push("'"+escapeq(col.as)+'\':'+n2u(col.expression.toJavaScript("p",query.defaultTableid,query.defcols)))	
			} else if (col.aggregatorid == 'COUNT') {
				ss.push("'"+escapeq(col.as)+"':1");
				// Nothing
			}
			query.selectColumns[col.aggregatorid+'('+escapeq(col.expression.toString())+')'] = thtd;


						var coldef = {
							columnid:col.as || col.columnid || col.toString(), 
//							dbtypeid:tcol.dbtypeid, 
//							dbsize:tcol.dbsize, 
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;

//			else if (col.aggregatorid == 'MAX') {
//				ss.push((col.as || col.columnid)+':'+col.toJavaScript("p.",query.defaultTableid))
//			} else if (col.aggregatorid == 'MIN') {
//				ss.push((col.as || col.columnid)+':'+col.toJavaScript("p.",query.defaultTableid))
//			}
		} else {
//			console.log(203,col.as,col.columnid,col.toString());
			ss.push('\''+escapeq(col.as || col.columnid || col.toString())+'\':'+n2u(col.toJavaScript("p",query.defaultTableid,query.defcols)));
//			ss.push('\''+escapeq(col.toString())+'\':'+col.toJavaScript("p",query.defaultTableid));
			//if(col instanceof yy.Expression) {
			query.selectColumns[escapeq(col.as || col.columnid || col.toString())] = true;

						var coldef = {
							columnid:col.as || col.columnid || col.toString(), 
//							dbtypeid:tcol.dbtypeid, 
//							dbsize:tcol.dbsize, 
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
		}
	});
	s += ss.join(',')+'};'+sp;
	return s;
//console.log(42,753,query.xcolumns, query.selectColumns);
}
yy.Select.prototype.compileSelect2 = function(query) {

	var s = query.selectfns;
//	console.log(s);
	return new Function('p,params,alasql','var y;'+s+'return r');
};


yy.Select.prototype.compileSelectGroup0 = function(query) {
	var self = this;
	self.columns.forEach(function(col,idx){
		if(col instanceof yy.Column && col.columnid == '*') {
		} else {
			var colas;
			//  = col.as;
			if(col instanceof yy.Column) {
				colas = escapeq(col.columnid);
			} else {
				colas = escapeq(col.toString());
			}
			for(var i=0;i<idx;i++) {
				if(colas == self.columns[i].nick) {
					colas = self.columns[i].nick+':'+idx;
					break;
				}
			}
			// }
			col.nick = colas;
			if(col.funcid && (col.funcid.toUpperCase() == 'ROWNUM' || col.funcid.toUpperCase() == 'ROW_NUMBER')) {
				query.rownums.push(col.as);
			}
//				console.log("colas:",colas);
			// }
		}
	});
	
	this.columns.forEach(function(col){
		if(col.findAggregator) col.findAggregator(query);
	});

	if(this.having) {
		if(this.having.findAggregator) this.having.findAggregator(query);
	}

};

yy.Select.prototype.compileSelectGroup1 = function(query) {
	var self = this;
	var s = 'var r = {};';

	self.columns.forEach(function(col,idx){
//		console.log(col);
		if(col instanceof yy.Column && col.columnid == '*') {
//			s += 'for(var k in g){r[k]=g[k]};';
			s += 'for(var k in this.query.groupColumns){r[k]=g[this.query.groupColumns[k]]};';
//			console.log(query);
		} else {
			// var colas = col.as;
			var colas = col.as;
			if(typeof colas == 'undefined') {
			 	if(col instanceof yy.Column) colas = escapeq(col.columnid);
			 	else colas = col.nick;
			}
			query.groupColumns[colas]=col.nick;

/*			if(typeof colas == 'undefined') {
				if(col instanceof yy.Column) {
					colas = col.columnid;
				} else {
					colas = col.toString();
					for(var i=0;i<idx;i++) {
						if(colas == self.columns[i].as) {
							colas = self.columns[i].as+':'+idx;
							break;
						}
					}
					col.as = colas;
				}
			}
*/
//			if(col.as) {
			s += 'r[\''+colas+'\']=';
			// } else {
			// 	s += 'r[\''+escapeq()+'\']=';
			// };
			// s += ';';
//			console.log(col);//,col.toJavaScript('g',''));


 			s += n2u(col.toJavaScript('g',''))+';';				
/*
			s += 'g[\''+col.nick+'\'];';

*/
			// if(col instanceof yy.Column) {
			// 	s += 'g[\''+col.columnid+'\'];';
			// } else {
//				s += 'g[\''+col.toString()+'\'];';

//				console.log(col);
				// var kg = col.toJavaScript('g','')+';';				
				// for(var i=0;i<query.removeKeys.length;i++) {
				// 	// THis part should be intellectual
				// 	if(query.removeKeys[i] == colas) {
				// s += 'g[\''+colas+'\'];';
				// 		break;
				// 	}
				// };
				// s += kg;
//				console.log(s);
			// }
//			s += col.toJavaScript('g','')+';';
//console.log(colas,query.removeKeys);
			for(var i=0;i<query.removeKeys.length;i++) {
				// THis part should be intellectual
				if(query.removeKeys[i] == colas) {
					query.removeKeys.splice(i,1);
					break;
				}
			}
		};
	});
	// return new Function('g,params,alasql',s+'return r');
	return s;
}

yy.Select.prototype.compileSelectGroup2 = function(query) {
	var s = query.selectgfns;
//	console.log('selectg:',s);
	return new Function('g,params,alasql','var y;'+s+'return r');
}

// SELECY * REMOVE [COLUMNS] col-list, LIKE ''
yy.Select.prototype.compileRemoveColumns = function(query) {
	if(typeof this.removecolumns != 'undefined') {
		query.removeKeys = query.removeKeys.concat(
			this.removecolumns.filter(function (column) {
				return (typeof column.like == 'undefined');
			}).map(function(column){return column.columnid}));

//console.log(query.removeKeys,this.removecolumns);				
		query.removeLikeKeys = this.removecolumns.filter(function (column) {
				return (typeof column.like != 'undefined');
			}).map(function(column){
				return new RegExp(column.like.value.replace(/\%/g,'.*'),'g');
			});
	}
}

yy.Select.prototype.compileHaving = function(query) {
	if(this.having) {
		s = this.having.toJavaScript('g',-1);
		query.havingfns = s;
//		console.log(s);
		return new Function('g,params,alasql','var y;return '+s);
	} else return function(){return true};
};

yy.Select.prototype.compileOrder = function (query) {
	var self = this;
	if(this.order) {
//			console.log(990, this.order);
		if(this.order && this.order.length == 1 && this.order[0].expression 
			 && typeof this.order[0].expression == "function") {
//			console.log(991, this.order[0]);
			var func = this.order[0].expression;
//			console.log(994, func);
			return function(a,b){
				var ra = func(a),rb = func(b);
				if(ra>rb) return 1;
				if(ra==rb) return 0;
				return -1;
			}
		};

		var s = '';
		var sk = '';
		this.order.forEach(function(ord,idx){
			// console.log(ord instanceof yy.Expression);
			// console.log(ord.toJavaScript('a',''));
			// console.log(ord.expression instanceof yy.Column);
			
			// Date conversion
			var dg = ''; 
//console.log(ord.expression, ord.expression instanceof yy.NumValue);
			if(ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value-1];
//console.log(ord.expression);
				ord.expression = new yy.Column({columnid:ord.expression.nick});
			};

			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid; 
				if(query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if( dbtypeid == 'DATE' || dbtypeid == 'DATETIME') dg = '.valueOf()';
					// TODO Add other types mapping
				} else {
					if(alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				}
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';

				s += 'if((a[\''+columnid+"']||'')"+dg+(ord.direction == 'ASC'?'>':'<')+'(b[\''+columnid+"']||'')"+dg+')return 1;';
				s += 'if((a[\''+columnid+"']||'')"+dg+'==(b[\''+columnid+"']||'')"+dg+'){';

			} else {
				dg = '.valueOf()';
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';
				s += 'if(('+ord.toJavaScript('a','')+"||'')"+dg+(ord.direction == 'ASC'?'>(':'<(')+ord.toJavaScript('b','')+"||'')"+dg+')return 1;';
				s += 'if(('+ord.toJavaScript('a','')+"||'')"+dg+'==('+ord.toJavaScript('b','')+"||'')"+dg+'){';
			}			

//			if(columnid == '_') {
//				s += 'if(a'+dg+(ord.direction == 'ASC'?'>':'<')+'b'+dg+')return 1;';
//				s += 'if(a'+dg+'==b'+dg+'){';
//			} else {
			// TODO Add date comparision
				// s += 'if(a[\''+columnid+"']"+dg+(ord.direction == 'ASC'?'>':'<')+'b[\''+columnid+"']"+dg+')return 1;';
				// s += 'if(a[\''+columnid+"']"+dg+'==b[\''+columnid+"']"+dg+'){';
//			}
			sk += '}';
		});
		s += 'return 0;';
		s += sk+'return -1';
		query.orderfns = s;
//console.log('ORDERBY',s);
		return new Function('a,b','var y;'+s);
	};
};


/*
//
// ROLLUP(), CUBE(), GROUPING SETS() for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/** 
 Calculate ROLLUP() combination
 */

var rollup = function (a,query) {
	var rr = [];
	var mask = 0;
	var glen = a.length;
	for(var g=0;g<glen+1;g++) {
		var ss = [];
		for(var i=0;i<glen;i++) {
		 	if(a[i] instanceof yy.Column) {
				a[i].nick = escapeq(a[i].columnid);

		 		query.groupColumns[escapeq(a[i].columnid)] = a[i].nick;
				var aaa = a[i].nick+'\t'
					+a[i].toJavaScript('p',query.sources[0].alias,query.defcols);
		 	} else {
		 		query.groupColumns[escapeq(a[i].toString())] = escapeq(a[i].toString());
				var aaa = escapeq(a[i].toString())+'\t'
					+a[i].toJavaScript('p',query.sources[0].alias,query.defcols);
			}

			if(mask&(1<<i)) ss.push(aaa);
		}
		rr.push(ss);
		mask = (mask<<1)+1; 
	};
	return rr;
};

/**
 Calculate CUBE()
 */
var cube = function (a,query) {
	var rr = [];
	var glen = a.length;
	for(var g=0;g<(1<<glen);g++) {
		var ss = [];
		for(var i=0;i<glen;i++) {
			if(g&(1<<i)) //ss.push(a[i]);
				//ss = cartes(ss,decartes(a[i]));

//				var aaa = a[i].toString()+'\t'
//					+a[i].toJavaScript('p',query.sources[0].alias,query.defcols);

				ss = ss.concat(decartes(a[i],query));
				//
		}
		rr.push(ss);
	}
	return rr;
}

/**
 GROUPING SETS()
 */
var groupingsets = function(a,query) {
	return a.reduce(function(acc,d){
		acc = acc.concat(decartes(d,query));
		return acc;
	}, []);
}

/**
 Cartesian production
 */
var cartes = function(a1,a2){
	var rrr =[];
	for(var i1=0;i1<a1.length;i1++) {
		for(var i2=0;i2<a2.length;i2++) {
			rrr.push(a1[i1].concat(a2[i2]));
		}
	};
	return rrr;
}

/**
 Prepare groups function
 */
function decartes(gv,query) {
//	console.log(gv);
	if(gv instanceof Array) {
		var res = [[]];
		for(var t=0; t<gv.length; t++) {
			if(gv[t] instanceof yy.Column) {
			//	console.log('+++',gv[t].columnid,gv[t]);
				gv[t].nick = escapeq(gv[t].columnid);
			 	query.groupColumns[gv[t].nick] = gv[t].nick;
		 		res = res.map(function(r){return r.concat(gv[t].nick+'\t'+gv[t].toJavaScript('p',query.sources[0].alias,query.defcols))}); 	
//		 		res = res.map(function(r){return r.concat(gv[t].columnid)}); 	
			} else if(gv[t] instanceof yy.FuncValue) {
				query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
		 		res = res.map(function(r){return r.concat(escapeq(gv[t].toString())+'\t'+gv[t].toJavaScript('p',query.sources[0].alias,query.defcols))}); 	
		 		// to be defined
			} else if(gv[t] instanceof yy.GroupExpression) {
				if(gv[t].type == 'ROLLUP') res = cartes(res,rollup(gv[t].group,query));
				else if(gv[t].type == 'CUBE') res = cartes(res,cube(gv[t].group,query));
				else if(gv[t].type == 'GROUPING SETS') res = cartes(res,groupingsets(gv[t].group,query));
				else throw new Error('Unknown grouping function');
			} else if(gv[t] === '') {
//				console.log('+++');
				res = [['1\t1']];
			} else {
//				if(gv[t])
//				console.log('>'+gv[t]+'<',gv[t]=='',typeof gv[t]);
//				console.log(gv[t].toString());
//console.log('+++');
		 		res = res.map(function(r){
 					query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
		 			return r.concat(escapeq(gv[t].toString())
		 				+'\t'
		 				+gv[t].toJavaScript('p',query.sources[0].alias,query.defcols)) 
		 		}); 	
//				res = res.concat(gv[t]);
			};

			// switch(gv[t].t) {
			// 	case 'plain': 
			// 		res = res.map(function(r){return r.concat(gv[t].p)}); 

			// 	break; 
			// 	case 'rollup': res = cartes(res,rollup(gv[t].p)); break; 
			// 	case 'cube': res = cartes(res,cube(gv[t].p)); break; 
			// 	case 'groupingsets': res = cartes(res,groupingsets(gv[t].p)); break; 
			// 	default: res = res.concat(gv[t]);
			// }
		};
		return res;
	} else if(gv instanceof yy.FuncValue) {
//		console.log(gv);
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [gv.toString()+'\t'+gv.toJavaScript('p',query.sources[0].alias,query.defcols)];
	} else if(gv instanceof yy.Column) {
			gv.nick = escapeq(gv.columnid);
		 	query.groupColumns[gv.nick] = gv.nick;
			return [gv.nick+'\t'+gv.toJavaScript('p',query.sources[0].alias,query.defcols)]; // Is this ever happened?
		// } else if(gv instanceof yy.Expression) {
		// 	return [gv.columnid]; // Is this ever happened?
	} else {
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [escapeq(gv.toString())+'\t'+gv.toJavaScript('p',query.sources[0].alias,query.defcols)];
//			throw new Error('Single argument in the group without array');			
	};


		// switch(gv.t) {
		// 	case 'plain': return gv.p; break;
		// 	case 'rollup': return rollup(gv.p); break; 
		// 	case 'cube': return cube(gv.p); break; 
		// 	case 'groupingsets':  return groupingsets(gv.p); break; 
		// 	default: return [gv];//return decartes(gv.p);
		// }
		// return gv;
};



/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Select.prototype.compileDefCols = function(query, databaseid) {
//	console.log('defcols');
	var defcols = {};
	if(this.from) {
		this.from.forEach(function(fr){
			if(fr instanceof yy.Table) {
				var alias = fr.as || fr.tableid;
//				console.log(alasql.databases[fr.databaseid || databaseid]);
//				console.log(alasql.databases[fr.databaseid || databaseid].tables, fr.tableid);
//console.log(alasql.databases[fr.databaseid || databaseid].tables, fr.tableid);
//console.log(alasql.databases);
				var table = alasql.databases[fr.databaseid || databaseid].tables[fr.tableid];
//console.log(table);
				if(table.columns) {
					table.columns.forEach(function(col){
						if(defcols[col.columnid]) {
							defcols[col.columnid] = '-'; // Ambigous
						} else {
							defcols[col.columnid] = alias;
						}
					});
				}
			} else if(fr instanceof yy.Select) {

			} else if(fr instanceof yy.Search) {

			} else if(fr instanceof yy.ParamValue) {

			} else if(fr instanceof yy.VarValue) {

			} else if(fr instanceof yy.FuncValue) {

			} else if(fr instanceof yy.FromData) {

			} else if(fr instanceof yy.Json) {

			} else {
//				console.log(fr);
				throw new Error('Unknown type of FROM clause');
			};
		});
	};

	if(this.joins) {
		this.joins.forEach(function(jn){
//			console.log(jn);
			if(jn.table) {
				var alias = jn.table.tableid;
				if(jn.as) alias = jn.as;
				var alias = jn.as || jn.table.tableid;
				var table = alasql.databases[jn.table.databaseid || databaseid].tables[jn.table.tableid];
//				console.log(jn.table.tableid, jn.table.databaseid);
				if(table.columns) {
					table.columns.forEach(function(col){
						if(defcols[col.columnid]) {
							defcols[col.columnid] = '-'; // Ambigous
						} else {
							defcols[col.columnid] = alias;
						}
					});
				}
			} else if(jn.select) {

			} else if(jn.param) {

			} else if(jn.func) {

			} else {
				throw new Error('Unknown type of FROM clause');
			};
		});
	};
	// for(var k in defcols) {
	// 	if(defcols[k] == '-') defcols[k] = undefined;
	// }
//	console.log(defcols);
	return defcols;
}
/*
//
// UNION for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT UNION statement

yy.Union = function (params) { return yy.extend(this, params); }
yy.Union.prototype.toString = function () {
	return K('UNION');
};

yy.Union.prototype.compile = function (tableid) {
	return null;
};
/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Apply = function (params) { return yy.extend(this, params); }
yy.Apply.prototype.toString = function () {
	var s = K(this.applymode)+' '+K('APPLY')+' (';
	s += this.select.toString()+')';
	if(this.as) s += ' '+K('AS')+' '+L(this.as);
	return s;
};


/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Over = function (params) { return yy.extend(this, params); }
yy.Over.prototype.toString = function () {
	var s = K('OVER')+' (';
	if(this.partition) {
		s += K('PARTITION')+' '+K('BY')+' '+this.partition.toString();
		if(this.order) s+=' ';
	}
	if(this.order) {
		s += K('ORDER')+' '+K('BY')+' '+this.order.toString();
	}
	s += ')';
	return s;
};


/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
  	Expression statement ( = 2*2; )
  	@class 
	@param {object} params Initial parameters
*/
yy.ExpressionStatement = function(params) { return yy.extend(this, params); };

/**
	Convert AST to string
	@this ExpressionStatement
	@return {string}
*/
yy.ExpressionStatement.prototype.toString = function() {
	return this.expression.toString();
};
/**
	Execute statement
	@param {string} databaseid Database identificatro
	@param {object} params Statement parameters
	@param {statement-callback} cb Callback
	@return {object} Result value
*/
yy.ExpressionStatement.prototype.execute = function (databaseid, params, cb) {
	if(this.expression) {
//		console.log(this.expression.toJavaScript('','', null));
//		console.log(this.expression.toJavaScript('','', null));
//        console.log(this.expression.toJavaScript('({})','', null));

		alasql.precompile(this,databaseid,params); // Precompile queries
		var exprfn =  new Function("params,alasql,p",'var y;return '+this.expression.toJavaScript('({})','', null)).bind(this);
		var res = exprfn(params,alasql);
		if(cb) res = cb(res);
		return res;
	}
}

/**
	Expression class
	@class
	@param {object} params Initial parameters
*/

yy.Expression = function(params) { return yy.extend(this, params); };

/**
	Convert AST to string
	@this ExpressionStatement
	@return {string}
*/
yy.Expression.prototype.toString = function() {
	var s = this.expression.toString();
	if(this.order) s += ' '+this.order.toString();
	if(this.nocase) s += ' '+K('COLLATE')+' '+K('NOCASE');
	return s;
};

/**
	Find aggregator in AST subtree
	@this ExpressionStatement
	@param {object} query Query object
*/
yy.Expression.prototype.findAggregator = function (query){
	if(this.expression.findAggregator) this.expression.findAggregator(query);
};

/**
	Convert AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

yy.Expression.prototype.toJavaScript = function(context, tableid, defcols) {
//	console.log('Expression',this);
	if(this.expression.reduced) return 'true';
	return this.expression.toJavaScript(context, tableid, defcols);
};

/**
	Compile AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

yy.Expression.prototype.compile = function(context, tableid, defcols){
//	console.log('Expression',this);
	if(this.reduced) return returnTrue();
	return new Function('p','var y;return '+this.toJavaScript(context, tableid, defcols));
};

/**
	JavaScript class
	@class
*/
yy.JavaScript = function(params) { return yy.extend(this, params); };
yy.JavaScript.prototype.toString = function() {
	var s = '``'+this.value+'``';
	return s;
};

yy.JavaScript.prototype.toJavaScript = function(context, tableid, defcols) {
//	console.log('Expression',this);
	return '('+this.value+')';
};
yy.JavaScript.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	var expr =  new Function("params,alasql,p",this.value);
	expr(params,alasql);
	if(cb) res = cb(res);
	return res;
}


/**
	Literal class
	@class
	@example
	MyVar, [My vairable], `MySQL variable`
*/

yy.Literal = function (params) { return yy.extend(this, params); }
yy.Literal.prototype.toString = function() {
	var s = this.value;
	if(this.value1) s = this.value1+'.'+s; 
//	else s = tableid+'.'+s;
	return L(s);
}

/**
	Join class
	@class
*/

yy.Join = function (params) { return yy.extend(this, params); }
yy.Join.prototype.toString = function() {
	var s = NL()+ID();
	if(this.joinmode) s += K(this.joinmode)+' ';
	s += K('JOIN')+this.table.toString();
	return s;
}

//yy.Join.prototype.toJavaScript = function(context, tableid) {
//	return 'JOIN'+this.table.toString();
//}

/**
	Table class
	@class
*/

yy.Table = function (params) { return yy.extend(this, params); }
yy.Table.prototype.toString = function() {
	var s = this.tableid;
//	if(this.joinmode)
	if(this.databaseid) s = this.databaseid+'.'+s;
	return L(s);
};

/**
	View class
	@class
*/

yy.View = function (params) { return yy.extend(this, params); }
yy.View.prototype.toString = function() {
	var s = this.viewid;
//	if(this.joinmode)
	if(this.databaseid) s = this.databaseid+'.'+s;
	return L(s);
};

/**
	Binary operation class
	@class
*/

yy.Op = function (params) { return yy.extend(this, params); }
yy.Op.prototype.toString = function() {
	if(this.op == 'IN' || this.op == 'NOT IN') {
		return this.left.toString()+" "+P(this.op)+" ("+this.right.toString()+")";
	}
	if(this.allsome) {
		return this.left.toString()+" "+P(this.op)+" "+this.allsome+' ('+this.right.toString()+')';
	}
	if(this.op == '->' || this.op == '!') {
		var s = this.left.toString()+this.op;
//		console.log(this.right);
		if(typeof this.right != 'string' && typeof this.right != 'number' ) s += '(';
		s += this.right.toString();
		if(typeof this.right != 'string' && typeof this.right != 'number' ) s += ')';
		return s;
	}
	return this.left.toString()+" "+P(this.op)+" "+(this.allsome?this.allsome+' ':'')+this.right.toString();
};

yy.Op.prototype.findAggregator = function (query){
//	console.log(this.toString());
	if(this.left && this.left.findAggregator) this.left.findAggregator(query);
	// Do not go in > ALL
	if(this.right && this.right.findAggregator && (!this.allsome)) {
		this.right.findAggregator(query);
	}
};

yy.Op.prototype.toType = function(tableid) {
	if(['-','*','/','%','^'].indexOf(this.op) >-1) return 'number';
	if(this.op == '+') {
		if(this.left.toType(tableid) == 'string' || this.right.toType(tableid) == 'string') return 'string';
		if(this.left.toType(tableid) == 'number' || this.right.toType(tableid) == 'number') return 'number';
	};
	if(['AND','OR','NOT','=','==','===', '!=','!==','!===','>','>=','<','<=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE'].indexOf(this.op) >-1 ) return 'boolean';
	if(this.op == 'BETWEEN' || this.op == 'NOT BETWEEN' || this.op == 'IS NULL' || this.op == 'IS NOT NULL') return 'boolean';
	if(this.allsome) return 'boolean';
	if(!this.op) return this.left.toType();

	return 'unknown';
};

yy.Op.prototype.toJavaScript = function(context,tableid,defcols) {
//	console.log(this);
	var op = this.op;
	if(this.op == '=') op = '===';
	else if(this.op == '<>') op = '!=';
	else if(this.op == 'OR') op = '||';

	if(this.op == '->') {
//		console.log(this.right, typeof this.right);
		if(typeof this.right == "string") {
			return this.left.toJavaScript(context,tableid, defcols)+'["'+this.right+'"]';
		} else if(typeof this.right == "number") {
			return this.left.toJavaScript(context,tableid, defcols)+'['+this.right+']';
		} else if(this.right instanceof yy.FuncValue) {
			ss = [];
			if(!this.right.args || this.right.args.length == 0) {
			} else {
				var ss = this.right.args.map(function(arg){
					return arg.toJavaScript(context,tableid, defcols);
				});
			}
			return this.left.toJavaScript(context,tableid, defcols)+'[\''+this.right.funcid+'\']('+
				ss.join(',')+')'; 
		} else {
			return this.left.toJavaScript(context,tableid, defcols)+'['+this.right.toJavaScript(context,tableid, defcols)+']';
		}
	};

	if(this.op == '!') {
		if(typeof this.right == "string") {
			return 'alasql.databases[alasql.useid].objects['+this.left.toJavaScript(context,tableid, defcols)+']["'+this.right+'"]';
		}		
		// TODO - add other cases
	}

	if(this.op == 'IS') {
		return '((typeof '+this.left.toJavaScript(context,tableid, defcols)+"=='undefined') == "
			+ '(typeof '+this.right.toJavaScript(context,tableid, defcols)+"=='undefined'))";
	}


	if(this.op == '==') {
		return 'alasql.utils.deepEqual('+this.left.toJavaScript(context,tableid, defcols)+","+this.right.toJavaScript(context,tableid, defcols)+')';
	}
	if(this.op == '===') {
		return "(("+this.left.toJavaScript(context,tableid, defcols)+").valueOf()===("+this.right.toJavaScript(context,tableid, defcols)+'.valueOf()))';
	}

	if(this.op == '!===') {
		return "!(("+this.left.toJavaScript(context,tableid, defcols)+").valueOf()===("+this.right.toJavaScript(context,tableid, defcols)+'.valueOf()))';
	}


	if(this.op == '!==') {
		return '(!alasql.utils.deepEqual('+this.left.toJavaScript(context,tableid, defcols)+","+this.right.toJavaScript(context,tableid, defcols)+'))';
	}

	if(this.op == 'LIKE') {
		var s = "("+this.left.toJavaScript(context,tableid, defcols)+"+'')"+
		".toUpperCase().match(new RegExp('^'+("+this.right.toJavaScript(context,tableid, defcols)+").replace(/\\\%/g,'.*').toUpperCase()+'$','g'))"
//		console.log(s);
		return s;
	};

	if(this.op == 'NOT LIKE') {
		var s = "!(("+this.left.toJavaScript(context,tableid, defcols)+"+'')"+
		".toUpperCase().match(new RegExp('^'+("+this.right.toJavaScript(context,tableid, defcols)+").replace(/\\\%/g,'.*').toUpperCase()+'$','g')))"
		return s;
	};

	if(this.op == 'BETWEEN') {
		return '(('+this.right1.toJavaScript(context,tableid, defcols)+'<='+this.left.toJavaScript(context,tableid, defcols)+')&&'+
		'('+this.left.toJavaScript(context,tableid, defcols)+'<='+this.right2.toJavaScript(context,tableid, defcols)+'))';		

/*
		if(this.right instanceof yy.Op && this.right.op == 'AND') {

			return '(('+this.right.left.toJavaScript(context,tableid, defcols)+'<='+this.left.toJavaScript(context,tableid, defcols)+')&&'+
			'('+this.left.toJavaScript(context,tableid, defcols)+'<='+this.right.right.toJavaScript(context,tableid, defcols)+'))';		


		} else {
			throw new Error('Wrong BETWEEN operator without AND part');
		}
*/
	};

	if(this.op == 'NOT BETWEEN') {
		return '!(('+this.right1.toJavaScript(context,tableid, defcols)+'<='+this.left.toJavaScript(context,tableid, defcols)+')&&'+
		'('+this.left.toJavaScript(context,tableid, defcols)+'<='+this.right2.toJavaScript(context,tableid, defcols)+'))';		


		// if(this.right instanceof yy.Op && this.right.op == 'AND') {
		// 	return '!(('+this.right.left.toJavaScript(context,tableid, defcols)+'<='+this.left.toJavaScript(context,tableid, defcols)+')&&'+
		// 	'('+this.left.toJavaScript(context,tableid, defcols)+'<='+this.right.right.toJavaScript(context,tableid, defcols)+'))';		
		// } else {
		// 	throw new Error('Wrong NOT BETWEEN operator without AND part');
		// }
	};

	if(this.op == 'IN') {
		if(this.right instanceof yy.Select ) {
			var s = '(';
//			s += 'this.query.queriesdata['+this.queriesidx+']';
//			s += 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,context))';
			s += 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx)+'](params,null,context))';
			s += '.indexOf(';
			s += this.left.toJavaScript(context,tableid, defcols)+')>-1)';
			return s;
		} else if(this.right instanceof Array ) {
//			if(this.right.length == 0) return 'false';
			var s = '(['+this.right.map(function(a){return a.toJavaScript(context,tableid, defcols)}).join(',')+'].indexOf(';
			s += this.left.toJavaScript(context,tableid, defcols)+')>-1)';
//console.log(s);
			return s;
		} else {
			var s = '('+this.right.toJavaScript(context,tableid, defcols)+'.indexOf(';
			s += this.left.toJavaScript(context,tableid, defcols)+')>-1)';
//console.log('expression',350,s);
			return s;
//		} else {
//			throw new Error('Wrong IN operator without SELECT part');
		}
	};


	if(this.op == 'NOT IN') {
		if(this.right instanceof yy.Select ) {
			var s = '('
				//this.query.queriesdata['+this.queriesidx+']
//			s += 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s += 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s +='.indexOf(';
			s += this.left.toJavaScript(context,tableid, defcols)+')<0)';
			return s;
		} else if(this.right instanceof Array ) {
//			if(this.right.length == 0) return 'true';
			var s = '(['+this.right.map(function(a){return a.toJavaScript(context,tableid, defcols)}).join(',')+'].indexOf(';
			s += this.left.toJavaScript(context,tableid, defcols)+')<0)';
			return s;
		} else {
			var s = '('+this.right.toJavaScript(context,tableid, defcols)+'.indexOf(';
			s += this.left.toJavaScript(context,tableid, defcols)+')==-1)';
			return s;

//			throw new Error('Wrong NOT IN operator without SELECT part');
		}
	};

	if(this.allsome == 'ALL') {
		if(this.right instanceof yy.Select ) {
//			var s = 'this.query.queriesdata['+this.queriesidx+']';
			var s = 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';

			s +='.every(function(b){return (';
			s += this.left.toJavaScript(context,tableid, defcols)+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			var s = '['+this.right.map(function(a){return a.toJavaScript(context,tableid, defcols)}).join(',')+'].every(function(b){return (';
			s += this.left.toJavaScript(context,tableid, defcols)+')'+op+'b})';
			return s;
		} else {
			throw new Error('Wrong NOT IN operator without SELECT part');
		}		
	};

	if(this.allsome == 'SOME' || this.allsome == 'ANY') {
		if(this.right instanceof yy.Select ) {
//			var s = 'this.query.queriesdata['+this.queriesidx+']';
			var s = 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s+='.some(function(b){return (';
			s += this.left.toJavaScript(context,tableid, defcols)+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			var s = '['+this.right.map(function(a){return a.toJavaScript(context,tableid, defcols)}).join(',')+'].some(function(b){return (';
			s += this.left.toJavaScript(context,tableid, defcols)+')'+op+'b})';
			return s;
		} else {
			throw new Error('Wrong NOT IN operator without SELECT part');
		}		
	};

// Special case for AND optimization (if reduced)
	if(this.op == 'AND') {
		if(this.left.reduced) {
			if(this.right.reduced) {
				return 'true';
			} else {
				return this.right.toJavaScript(context,tableid, defcols);
			}
		} else if(this.right.reduced) {
			return this.left.toJavaScript(context,tableid, defcols);
		}			

		// Otherwise process as regular operation (see below)
		op = '&&';

	}

	if(this.op == '^') {
		return 'Math.pow('+this.left.toJavaScript(context,tableid, defcols)
			+','+this.right.toJavaScript(context,tableid, defcols)+')';
	};


	// Change names
//	console.log(this);
	return '('+this.left.toJavaScript(context,tableid, defcols)+op+this.right.toJavaScript(context,tableid, defcols)+')';
};



yy.VarValue = function (params) { return yy.extend(this, params); }
yy.VarValue.prototype.toString = function() {
	return '@'+L(this.variable);
};

yy.VarValue.prototype.toType = function() {
	return 'unknown';
};

yy.VarValue.prototype.toJavaScript = function() {
	return "alasql.vars['"+this.variable+"']";
}


yy.NumValue = function (params) { return yy.extend(this, params); }
yy.NumValue.prototype.toString = function() {
	return N(this.value.toString());
};

yy.NumValue.prototype.toType = function() {
	return 'number';
};

yy.NumValue.prototype.toJavaScript = function() {
	return ""+this.value;
}




yy.StringValue = function (params) { return yy.extend(this, params); }
yy.StringValue.prototype.toString = function() {
	return "'"+S(this.value.toString())+"'";
}

yy.StringValue.prototype.toType = function() {
	return 'string';
}

yy.StringValue.prototype.toJavaScript = function() {
//	console.log("'"+doubleqq(this.value)+"'");
//	return "'"+doubleqq(this.value)+"'";
	return "'"+escapeq(this.value)+"'";

}


yy.LogicValue = function (params) { return yy.extend(this, params); }
yy.LogicValue.prototype.toString = function() {
	return this.value?'TRUE':'FALSE';
}

yy.LogicValue.prototype.toType = function() {
	return 'boolean';
}

yy.LogicValue.prototype.toJavaScript = function() {
	return this.value?'true':'false';
}

yy.NullValue = function (params) { return yy.extend(this, params); }
yy.NullValue.prototype.toString = function() {
	return 'NULL';
}
yy.NullValue.prototype.toJavaScript = function() {
	return 'undefined';
//	return 'undefined';
}

yy.ParamValue = function (params) { return yy.extend(this, params); }
yy.ParamValue.prototype.toString = function() {
	return '$'+this.param;
}
yy.ParamValue.prototype.toJavaScript = function() {
	if(typeof this.param == "string") return "params[\'"+this.param+"\']";
	else return "params["+this.param+"]";
}



yy.UniOp = function (params) { return yy.extend(this, params); }
yy.UniOp.prototype.toString = function() {
	if(this.op == '-') return this.op+this.right.toString();
	if(this.op == '+') return this.op+this.right.toString();
	if(this.op == '#') return this.op+this.right.toString();
	if(this.op == 'NOT') return this.op+'('+this.right.toString()+')';
	else if(this.op == null) return '('+this.right.toString()+')';
};

yy.UniOp.prototype.findAggregator = function (query){
	if(this.right.findAggregator) this.right.findAggregator(query);
};

yy.UniOp.prototype.toType = function(tableid) {
	if(this.op == '-') return 'number';
	if(this.op == '+') return 'number';
	if(this.op == 'NOT') return 'boolean';
};

yy.UniOp.prototype.toJavaScript = function(context, tableid, defcols) {
	if(this.op == '-') return "(-("+this.right.toJavaScript(context, tableid, defcols)+"))";
	if(this.op == '+') return "("+this.right.toJavaScript(context, tableid, defcols)+")";
	if(this.op == 'NOT') return '!('+this.right.toJavaScript(context, tableid, defcols)+')';
	if(this.op == '#') {
		if(this.right instanceof yy.Column) {
			return "(alasql.databases[alasql.useid].objects[\'"+this.right.columnid+"\'])";
		} else {
			return "(alasql.databases[alasql.useid].objects["
				+this.right.toJavaScript(context, tableid, defcols)+"])";
		};
	}
	else if(this.op == null) return '('+this.right.toJavaScript(context, tableid, defcols)+')';
};



// yy.Star = function (params) { return yy.extend(this, params); }
// yy.Star.prototype.toString = function() {
// 	var s = this.fieldid;
// 	if(this.tableid) {
// 		s = this.tableid+'.'+s;
// 		if(this.databaseid) {
// 			s = this.databaseid+'.'+s;
// 		}
// 	}
// 	if(this.alias) s += ' AS '+this.alias;
// 	return s;
// }

yy.Column = function(params) { return yy.extend(this, params); }
yy.Column.prototype.toString = function() {
	var s;
	if(this.columnid == +this.columnid) {
		s = '['+this.columnid+']';
	} else {
		s = this.columnid;
	}
	if(this.tableid) {
		if(+this.columnid == this.columnid) {
			s = this.tableid+s;
		} else {
			s = this.tableid+'.'+s;
		}
		if(this.databaseid) {
			s = this.databaseid+'.'+s;
		}
	}
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

yy.Column.prototype.toJavaScript = function(context, tableid, defcols) {
//	var s = this.value;
// 	var s = this.columnid;
// 	if(this.tableid) {
// 		s = this.tableid+'.'+s;
// //		if(this.databaseid) {
// //			s = this.databaseid+'.'+s;
// //		}
// 	} else {
// 		s = tableid+'.'+s;
// 	}
//console.log('yy.Column',this, tableid);
//	console.log(392,this.columnid);

//console.log(506,this);

//console.log(523, arguments);

	var s = '';
	if(!this.tableid && tableid == '' && !defcols) {
		if(this.columnid != '_') {
			s = context+'[\''+this.columnid+'\']';
		} else {
			if(context == 'g') {
				s = 'g[\'_\']';						
			} else {
				s = context;
			}
		}
	} else {
		if(context == 'g') {
			// if(this.columnid == '_') {
			// } else {
				s = 'g[\''+this.nick+'\']';						
			// }
		} else if(this.tableid) {
			if(this.columnid != '_') {
				s = context+'[\''+(this.tableid) + '\'][\''+this.columnid+'\']';			
			} else {
				if(context == 'g') {
					s = 'g[\'_\']';						
				} else {
					s = context+'[\''+(this.tableid) + '\']';
				}
			}
		} else if(defcols) {
			var tbid = defcols[this.columnid];
			if(tbid == '-') {
				throw new Error('Cannot resolve column "'+this.columnid+'" because it exists in two source tables');
			} else if(tbid) {
				if(this.columnid != '_') {
					s = context+'[\''+(tbid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(tbid) + '\']';
				};
			} else {
				if(this.columnid != '_') {
					s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(this.tableid || tableid) + '\']';
				};
			}
		} else if(tableid == -1) {
//			if(this.columnid != '') {
				s = context+'[\''+this.columnid+'\']';
//			} else {
//				s = context;				
//			}
		} else {
			if(this.columnid != '_') {
				s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
			} else {
				s = context+'[\''+(this.tableid || tableid) + '\']';
			}
		}
	}
//	console.log(context,s);
//	console.trace(new Error());
	return s;
}




yy.AggrValue = function(params){ return yy.extend(this, params); }
yy.AggrValue.prototype.toString = function() {
	var s = '';
	if(this.aggregatorid == 'REDUCE') s += L(this.funcid)+'(';
	else s += this.aggregatorid+'(';
	if(this.distinct) s+= K('DISTINCT')+' ';
	if(this.expression) s += this.expression.toString();
	s += ')';
	if(this.over) s += ' '+this.over.toString(); 
//	console.log(this.over);
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

yy.AggrValue.prototype.findAggregator = function (query){
//	console.log('aggregator found',this.toString());

//	var colas = this.as || this.toString();

	var colas = escapeq(this.toString())+':'+query.selectGroup.length;
//	console.log('findAgg',this);


/*	var found = false;
	for(var i=0;i<query.columns.length;i++) {
		// THis part should be intellectual
		if(query.columns[i].as == colas) {
			found = true;
			break;
		}
	}
*/	
//	if(!query.selectColumns[colas]) {
//	}

	var found = false;

/*	
	for(var i=0;i<query.selectGroup.length;i++){
		if(query.selectGroup[i].nick==colas) {
			colas = colas+':'+i;
			found = false;
			break;
		};
	};
*/
//	console.log("query.selectGroup",query.selectGroup,found);
	if(!found) {
		if(!this.nick) {
			this.nick = colas;
			var found = false;
			for(var i=0;i<query.removeKeys.length;i++){
				if(query.removeKeys[i]==colas) {
					found = true;
					break;
				}
			};
			if(!found) query.removeKeys.push(colas);
		};
		query.selectGroup.push(this);
	};
//	console.log(query.selectGroup);


////	this.reduced = true;
	return;
};

yy.AggrValue.prototype.toType = function() {
	if(['SUM','COUNT','AVG','MIN', 'MAX','AGGR','VAR','STDDEV'].indexOf(this.aggregatorid)>-1) return 'number';
	if(['ARRAY'].indexOf(this.aggregatorid)>-1) return 'array';
	if(['FIRST','LAST' ].indexOf(this.aggregatorid)>-1) return this.expression.toType();
}
yy.AggrValue.prototype.toJavaScript = function(context, tableid, defcols) {
//	var s = 'alasql.functions.'+this.funcid+'(';
//	if(this.expression) s += this.expression.toJavaScript(context, tableid);
//	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
//	return s;
//	var s = ''; 
//if(this.as) console.log(499,this.as);
//	var colas = this.as;
	var colas = this.nick;
	if(typeof colas == 'undefined') colas = this.toString();
	return 'g[\''+colas+'\']';
}


yy.OrderExpression = function(params){ return yy.extend(this, params); }
yy.OrderExpression.prototype.toString = function() {
	var s = this.expression.toString();
	if(this.order) s += ' '+this.order.toString();
	if(this.nocase) s += ' '+K('COLLATE')+' '+K('NOCASE');
	return s;
}

yy.GroupExpression = function(params){ return yy.extend(this, params); }
yy.GroupExpression.prototype.toString = function() {
	return this.type+'('+this.group.toString()+')';
}


yy.ColumnDef = function (params) { return yy.extend(this, params); }
yy.ColumnDef.prototype.toString = function() {
	var s =  this.columnid;
	if(this.dbtypeid) s += ' '+this.dbtypeid;
	if(this.dbsize) {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+this.dbprecision;
		s += ')';
	};
	if(this.primarykey) s += ' PRIMARY KEY';
	if(this.notnull) s += ' NOT NULL';
	return s;
}

// Alasql Linq library

yy.FromData = function(params) { return yy.extend(this, params); };
yy.FromData.prototype.toString = function() {
	if(this.data) return K('DATA')+'('+((Math.random()*10e15)|0)+')';
	else return '?';
};
yy.FromData.prototype.toJavaScript = function(){
//	console.log('yy.FromData.prototype.toJavaScript');
};

yy.Select.prototype.exec = function(params,cb) {
	
	if(this.preparams) params = this.preparams.concat(params);
//	console.log(15,this.preparams);

	var databaseid = alasql.useid;
	db = alasql.databases[databaseid];
	var sql = this.toString();
	var hh = hash(sql);
//	console.log(sql);

	var statement = this.compile(databaseid);
	if(!statement) return;
	statement.sql = sql;
	statement.dbversion = db.dbversion;
	
	// Secure sqlCache size
	if (db.sqlCacheSize > alasql.MAXSQLCACHESIZE) {
		db.resetSqlCache();
	}
	db.sqlCacheSize++;
	db.sqlCache[hh] = statement;
	var res = alasql.res = statement(params, cb);
	return res;
};

yy.Select.prototype.Select = function(){
	var self = this;
	var agrs = [];
	if(arguments.length > 1) {
		args = Array.prototype.slice.call(arguments);;
	} else if(arguments.length == 1) {
		if(arguments[0] instanceof Array) {
			args = arguments[0];
		} else {
			args = [arguments[0]];
		}
	} else {
		throw new Error('Wrong number of arguments of Select() function');
	}

	self.columns = [];

	args.forEach(function(arg){
		if(typeof arg == "string") {
			self.columns.push(new yy.Column({columnid: arg}));
		} else if(typeof arg == "function") {
			var pari = 0;
			if(self.preparams) {
				pari = self.preparams.length;
			} else {
				self.preparams = [];
			}
			self.preparams.push(arg);
			self.columns.push(new yy.Column({columnid: "*", func:arg, param:pari}));
		} else {
			// Unknown type
		}
	});

//	console.log(self instanceof yy.Select);
	return self;
};

yy.Select.prototype.From = function(tableid){
	var self = this;
	if(!self.from) self.from = [];
	if(tableid instanceof Array) {
		var pari = 0;
		if(self.preparams) {
			pari = self.preparams.length;
		} else {
			self.preparams = [];
		}
		self.preparams.push(tableid); 
		self.from.push(new yy.ParamValue({param:pari}));
	} else if(typeof tableid =="string") {
		self.from.push(new yy.Table({tableid:tableid}));
	} else {
		throw new Error('Unknown arguments in From() function')
	}
	return self;
}

yy.Select.prototype.OrderBy = function(){
	var self = this;
	var agrs = [];

	self.order = [];

	if(arguments.length == 0) {
//		self.order.push(new yy.OrderExpression({expression: new yy.Column({columnid:"_"}), direction:'ASC'}));		
		args = ["_"];
	} else if(arguments.length > 1) {
		args = Array.prototype.slice.call(arguments);;
	} else if(arguments.length == 1) {
		if(arguments[0] instanceof Array) {
			args = arguments[0];
		} else {
			args = [arguments[0]];
		}
	} else {
		throw new Error('Wrong number of arguments of Select() function');
	}

	if(args.length > 0) {
		args.forEach(function(arg){
			var expr = new yy.Column({columnid:arg});
			if(typeof arg == 'function'){
				expr = arg;
			}
			self.order.push(new yy.OrderExpression({expression: expr, direction:'ASC'}));
		});
	}
	return self;
}

yy.Select.prototype.Top = function(topnum){
	var self = this;
	self.top = new yy.NumValue({value:topnum});
	return self;
};

yy.Select.prototype.GroupBy = function(){
	var self = this;
	var agrs = [];

	if(arguments.length > 1) {
		args = Array.prototype.slice.call(arguments);;
	} else if(arguments.length == 1) {
		if(arguments[0] instanceof Array) {
			args = arguments[0];
		} else {
			args = [arguments[0]];
		}
	} else {
		throw new Error('Wrong number of arguments of Select() function');
	}

	self.group = [];

	args.forEach(function(arg){
		var expr = new yy.Column({columnid:arg});
		self.group.push(expr);
	});

	return self;
};

yy.Select.prototype.Where = function(expr){
	var self = this;
	if(typeof expr == 'function' ) {
		self.where = expr;
	}
	return self;
};


/*
//
// Functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.FuncValue = function(params){ return yy.extend(this, params); }
yy.FuncValue.prototype.toString = function() {
	var s = '';
    
    if(alasql.fn[this.funcid]) s += this.funcid;
    else if(alasql.aggr[this.funcid]) s += this.funcid;
    else if(alasql.stdlib[this.funcid.toUpperCase()] || alasql.stdfn[this.funcid.toUpperCase()]) s += this.funcid.toUpperCase();
    
    s += '(';
	if(this.args && this.args.length > 0) {
		s += this.args.map(function(arg){
			return arg.toString();
		}).join(',');
	};
	s += ')';
	if(this.as) s += ' AS '+this.as.toString();
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.FuncValue.prototype.findAggregator = function(query) {
	if(this.args && this.args.length > 0) {
		this.args.forEach(function(arg){ 
			if(arg.findAggregator) arg.findAggregator(query); 
		});
	}
};

yy.FuncValue.prototype.toJavaScript = function(context, tableid, defcols) {
	var s = '';
    var funcid = this.funcid;
	// IF this is standard compile functions
	if(alasql.fn[funcid]) {
	// This is user-defined run-time function
	// TODO arguments!!!
//		var s = '';
		if(this.newid) s+= 'new ';
		s += 'alasql.fn.'+this.funcid+'(';
//		if(this.args) s += this.args.toJavaScript(context, tableid);
		if(this.args && this.args.length > 0) {
			s += this.args.map(function(arg){
				return arg.toJavaScript(context, tableid, defcols);
			}).join(',');
		};
		s += ')';
	} else if(alasql.stdlib[funcid.toUpperCase()]) {
		if(this.args && this.args.length > 0) {
			s += alasql.stdlib[funcid.toUpperCase()].apply(this, this.args.map(function(arg) {return arg.toJavaScript(context, tableid)}));
		} else {
			s += alasql.stdlib[funcid.toUpperCase()]();
		}
	} else if(alasql.stdfn[funcid.toUpperCase()]) {
		if(this.newid) s+= 'new ';
		s += 'alasql.stdfn.'+this.funcid.toUpperCase()+'(';
//		if(this.args) s += this.args.toJavaScript(context, tableid);
		if(this.args && this.args.length > 0) {
			s += this.args.map(function(arg){
				return arg.toJavaScript(context, tableid, defcols);
			}).join(',');
		};
		s += ')';		
	} else {
		// Aggregator
	}
//console.log('userfn:',s,this);

//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

// // Functions compiler
// nodes.FunctionValue.prototype.toJavaScript = function (context, tableid) {
// 	var s = '';
// 	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
// 		if(arg) return arg.toJavaScript(context, tableid);
// 		else return '';
// 	}));
// 	return s;
// };

// 
// SQL FUNCTIONS COMPILERS
// Based on SQLite functions

// IMPORTANT: These are compiled functions

//alasql.fn = {}; // Keep for compatibility
//alasql.userlib = alasql.fn; 

var stdlib = alasql.stdlib = {}
var stdfn = alasql.stdfn = {}

stdlib.ABS = function(a) {return 'Math.abs('+a+')'};
stdlib.CLONEDEEP = function(a) {return 'alasql.utils.cloneDeep('+a+')'};
stdlib.IIF = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	} else {
		throw new Error('Number of arguments of IFF is not equals to 3');
	};
};
stdlib.IFNULL = function(a,b) {return '('+a+'||'+b+')'};
stdlib.INSTR = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};

//stdlib.LEN = stdlib.LENGTH = function(s) {return '('+s+'+"").length';};



stdlib.LEN = stdlib.LENGTH = function(s) {return und(s,'y.length');}
//stdlib.LENGTH = function(s) {return '('+s+').length'};

stdlib.LOWER = stdlib.LCASE = function(s) {return und(s,'y.toLowerCase()');}
//stdlib.LCASE = function(s) {return '('+s+').toLowerCase()';}


// LTRIM

stdlib.MAX = stdlib.GREATEST = function(){
      return 'Math.max('+Array.prototype.join.call(arguments, ',')+')'
};

stdlib.MIN = stdlib.LEAST = function(){
      return 'Math.min('+Array.prototype.join.call(arguments, ',')+')'
};

stdlib.SUBSTRING = stdlib.MID = function(a,b,c){
	if(arguments.length == 2) return und(a,'y.substr('+b+'-1)');
	else if(arguments.length == 3) return und(a,'y.substr('+b+'-1,'+c+')');
};

// Here we uses undefined instead of null
stdlib.ISNULL = stdlib.NULLIF = function(a,b){return '('+a+'=='+b+'?undefined:'+a+')'};

stdlib.POWER = function(a,b) {return 'Math.pow('+a+','+b+')'};

stdlib.RANDOM = function(r) {
	if(arguments.length == 0) {
		return 'Math.random()';
	} else {
		return '(Math.random()*('+r+')|0)';
	}
}
stdlib.ROUND = function(s,d) {
	if(arguments.length == 2) {
		return 'Math.round('+s+'*Math.pow(10,'+d+'))/Math.pow(10,'+d+')';
	} else {
		return 'Math.round('+s+')';
	}
}
stdlib.ROWNUM = function() {return '1'};
stdlib.ROW_NUMBER = function() {return '1'};

stdlib.SQRT = function(s) {return 'Math.sqrt('+s+')'};

stdlib.TRIM = function(s) {return und(s,'y.trim()');}

stdlib.UPPER = stdlib.UCASE = function(s) {return und(s,'y.toUpperCase()');}
//stdlib.UCASE = function(s) {return '('+s+').toUpperCase()';}
//REPLACE
// RTRIM
// SUBSTR
// TRIM
//REPLACE
// RTRIM
// SUBSTR
// TRIM


// Aggregator for joining strings
alasql.aggr.GROUP_CONCAT = function(v,s){
    if(typeof s == "undefined") return v; else return s+','+v;
};

// Median
alasql.aggr.MEDIAN = function(v,s,acc){
	// Init
	if(typeof acc.arr == 'undefined') {
	  acc.arr = [v];
	  return v; 
	// Pass
	} else {
	  acc.arr.push(v);
	  var p = acc.arr.sort();
	  return p[(p.length/2)|0];     
	};
};

// Standard deviation
alasql.aggr.VAR = function(v,s,acc){
	if(typeof acc.arr == 'undefined') {
		acc.arr = [v];
		acc.sum = v;
	} else {
		acc.arr.push(v);
		acc.sum += v;
	}
	var N = acc.arr.length;
	var avg = acc.sum / N;
	var std = 0;
	for(var i=0;i<N;i++) {
		std += (acc.arr[i]-avg)*(acc.arr[i]-avg);
	}
	std = std/(N-1);
	return std;
};

alasql.aggr.STDEV = function(v,s,acc){
	return Math.sqrt(alasql.aggr.VAR(v,s,acc));
}

// Standard deviation
alasql.aggr.VARP = function(v,s,acc){
	if(typeof acc.arr == 'undefined') {
		acc.arr = [v];
		acc.sum = v;
	} else {
		acc.arr.push(v);
		acc.sum += v;
	}
	var N = acc.arr.length;
	var avg = acc.sum / N;
	var std = 0;
	for(var i=0;i<N;i++) {
		std += (acc.arr[i]-avg)*(acc.arr[i]-avg);
	}
	std = std/N;
	return std;
};

alasql.aggr.STD = alasql.aggr.STDDEV = alasql.aggr.STDEVP = function(v,s,acc){
	return Math.sqrt(alasql.aggr.VARP(v,s,acc));
}





/*
//
// CASE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.CaseValue = function(params) { return yy.extend(this, params); };
yy.CaseValue.prototype.toString = function() {
	var s = 'CASE ';
	if(this.expression) s += this.expression.toString();
	if(this.whens) {
		s += this.whens.map(function(w) { return ' WHEN '+
			w.when.toString() + ' THEN '+w.then.toString()}).join();
	}
	s += ' END';
	return s;
};

yy.CaseValue.prototype.findAggregator = function (query){
//	console.log(this.toString());
	if(this.expression && this.expression.findAggregator) this.expression.findAggregator(query);
	if(this.whens && this.whens.length > 0) {
		this.whens.forEach(function(w) { 
			if(w.when.findAggregator) w.when.findAggregator(query);
			if(w.then.findAggregator) w.then.findAggregator(query);
		});
	};
	if(this.elses && this.elses.findAggregator) this.elses.findAggregator(query);
};

yy.CaseValue.prototype.toJavaScript = function(context, tableid, defcols) {

	var s = '((function('+context+',params,alasql){var r;';
	if(this.expression) {
//			this.expression.toJavaScript(context, tableid)
		s += 'v='+this.expression.toJavaScript(context, tableid, defcols)+';';
		s += (this.whens||[]).map(function(w) { return ' if(v=='+w.when.toJavaScript(context,tableid, defcols)
			+') {r='+w.then.toJavaScript(context,tableid, defcols)+'}'; }).join(' else ');
		if(this.elses) s += ' else {r='+this.elses.toJavaScript(context,tableid, defcols)+'}';
	} else {
		s += (this.whens||[]).map(function(w) { return ' if('+w.when.toJavaScript(context,tableid, defcols)
			+') {r='+w.then.toJavaScript(context,tableid, defcols)+'}'; }).join(' else ');
		if(this.elses) s += ' else {r='+this.elses.toJavaScript(context,tableid,defcols)+'}';
	}
	// TODO remove bind from CASE
	s += ';return r;}).bind(this))('+context+',params,alasql)';

	return s;
};
/*
//
// JSON for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Json = function (params) { return yy.extend(this, params); }
yy.Json.prototype.toString = function() {
	var s = ''; // '@'
	s += JSONtoString(this.value);
	s += '';
	return s;
};

var JSONtoString = alasql.utils.JSONtoString = function (obj) {
	var s = '';
	if(typeof obj == "string") s = '"'+obj+'"';
	else if(typeof obj == "number") s = obj;
	else if(typeof obj == "boolean") s = obj;
	else if(typeof obj == "object") {
		if(obj instanceof Array) {
			s += '['+obj.map(function(b){
				return JSONtoString(b);
			}).join(',')+']';
		} else if(!obj.toJavaScript || obj instanceof yy.Json) {
			// to prevent recursion
			s = '{';
			var ss = [];
			for(var k in obj) {
				var s1 = ''; 
				if(typeof k == "string") s1 += '"'+k+'"';
				else if(typeof k == "number") s1 += k;
				else if(typeof k == "boolean") s1 += k;
				else {
					throw new Error('THis is not ES6... no expressions on left side yet');
				}
				s1 += ':'+JSONtoString(obj[k]);
				ss.push(s1);
			};
			s += ss.join(',')+'}';
		} else if(obj.toString)	{
			s = obj.toString();
		} else {
			throw new Error('1Can not show JSON object '+JSON.stringify(obj));
		}
	} else {
		throw new Error('2Can not show JSON object '+JSON.stringify(obj));		
	}

	return s;
}



function JSONtoJavaScript(obj, context, tableid, defcols) {
	var s = '';
	if(typeof obj == "string") s = '"'+obj+'"';
	else if(typeof obj == "number") s = '('+obj+')';
	else if(typeof obj == "boolean") s = obj;
	else if(typeof obj == "object") {
		if(obj instanceof Array) {
			s += '['+obj.map(function(b){
				return JSONtoJavaScript(b, context, tableid, defcols);
			}).join(',')+']';
		} else if(!obj.toJavaScript || obj instanceof yy.Json) {
			// to prevent recursion
			s = '{';
			var ss = [];
			for(var k in obj) {
				var s1 = ''; 
				if(typeof k == "string") s1 += '"'+k+'"';
				else if(typeof k == "number") s1 += k;
				else if(typeof k == "boolean") s1 += k;
				else {
					throw new Error('THis is not ES6... no expressions on left side yet');
				}
				s1 += ':'+JSONtoJavaScript(obj[k], context, tableid, defcols);
				ss.push(s1);
			};
			s += ss.join(',')+'}';
		} else if(obj.toJavaScript)	{
			s = obj.toJavaScript(context, tableid, defcols);
		} else {
			throw new Error('1Can not parse JSON object '+JSON.stringify(obj));
		}
	} else {
		throw new Error('2Can not parse JSON object '+JSON.stringify(obj));		
	}

	return s;
}

yy.Json.prototype.toJavaScript = function(context, tableid, defcols) {
	// TODO reod
	return JSONtoJavaScript(this.value,context, tableid, defcols);
}



/*
//
// CAST and CONVERT functions
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Convert = function(params) { return yy.extend(this, params); };
yy.Convert.prototype.toString = function() {
	var s = 'CONVERT(';
	s += this.dbtypeid;
	if(typeof this.dbsize != 'undefined') {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+dbprecision;
		s += ')';
	}
	s += ','+this.expression.toString();
	if(this.style) s += ','+this.style;
	s += ')';
	return s;
};
yy.Convert.prototype.toJavaScript = function(context, tableid, defcols) {

//	if(this.style) {
	return 'alasql.stdfn.CONVERT('+this.expression.toJavaScript(context, tableid, defcols)
		+',{dbtypeid:"'+this.dbtypeid+'",dbsize:'+this.dbsize+',style:'+
		this.style+'})';		
//	}
/*
	if(this.dbtypeid == 'INT') {
		return '(('+this.expression.toJavaScript(context, tableid, defcols)+')|0)';
	} if(this.dbtypeid == 'STRING') {
		return '(""+'+this.expression.toJavaScript(context, tableid, defcols)+')';
	} if(this.dbtypeid == 'NUMBER') {
		return '(+('+this.expression.toJavaScript(context, tableid, defcols)+'))';
	} if(this.dbtypeid == 'DATE') {
		if(alasql.options.datetimeformat == 'javascript') {
			return '(new Date('+this.expression.toJavaScript(context, tableid, defcols)+'))';
		} else if(alasql.options.datetimeformat == 'sql') {
			return this.expression.toJavaScript(context, tableid, defcols);
		}
	} if(this.dbtypeid == 'DATETIME') {
		if(alasql.options.datetimeformat == 'javascript') {
			return '(new Date('+this.expression.toJavaScript(context, tableid, defcols)+'))';
		} else if(alasql.options.datetimeformat == 'sql') {
			return this.expression.toJavaScript(context, tableid, defcols);
		}
	} else {

	};
*/
	throw new Error('There is not such type conversion for '+this.toString());
};

/**
 Convert one type to another
 */
alasql.stdfn.CONVERT = function(value, args) {
	var val = value;
//	console.log(args);
	if(args.style) {
		// TODO 9,109, 20,120,21,121,126,130,131 conversions
		var t;
		if(/\d{8}/.test(val)) t = new Date(+val.substr(0,4),+val.substr(4,2)-1,+val.substr(6,2));		
		else t = new Date(val);
		
		if(args.style == 1) { 			// mm/dd/yy
			val =  ("0"+(t.getMonth()+1)).substr(-2)+'/'+("0"+t.getDate()).substr(-2)+'/'+("0"+t.getYear()).substr(-2);
		} else if(args.style == 2) { 	// yy.mm.dd
			val =  ("0"+t.getYear()).substr(-2)+'.'+("0"+(t.getMonth()+1)).substr(-2)+'.'+("0"+t.getDate()).substr(-2);
		} else if(args.style == 3) { 	// dd/mm/yy
			val =  ("0"+t.getDate()).substr(-2)+'/'+("0"+(t.getMonth()+1)).substr(-2)+'/'+("0"+t.getYear()).substr(-2);
		} else if(args.style == 4) { 	// dd.mm.yy
			val =  ("0"+t.getDate()).substr(-2)+'.'+("0"+(t.getMonth()+1)).substr(-2)+'.'+("0"+t.getYear()).substr(-2);
		} else if(args.style == 5) { 	// dd-mm-yy
			val =  ("0"+t.getDate()).substr(-2)+'-'+("0"+(t.getMonth()+1)).substr(-2)+'-'+("0"+t.getYear()).substr(-2);
		} else if(args.style == 6) { 	// dd mon yy
			val =  ("0"+t.getDate()).substr(-2)+' '+t.toString().substr(4,3).toLowerCase()+' '+("0"+t.getYear()).substr(-2);
		} else if(args.style == 7) { 	// Mon dd,yy
			val =  t.toString().substr(4,3)+' '+("0"+t.getDate()).substr(-2)+','+("0"+t.getYear()).substr(-2);
		} else if(args.style == 8) { 	// hh:mm:ss
			val =  ("0"+t.getHours()).substr(-2)+':'+("0"+(t.getMinutes()+1)).substr(-2)+':'+("0"+t.getSeconds()).substr(-2);

		} else if(args.style == 10) { 	// mm-dd-yy
			val =  ("0"+(t.getMonth()+1)).substr(-2)+'-'+("0"+t.getDate()).substr(-2)+'-'+("0"+t.getYear()).substr(-2);
		} else if(args.style == 11) { 	// yy/mm/dd
			val =  ("0"+t.getYear()).substr(-2)+'/'+("0"+(t.getMonth()+1)).substr(-2)+'/'+("0"+t.getDate()).substr(-2);
		} else if(args.style == 12) { 	// yymmdd
			val =  ("0"+t.getYear()).substr(-2)+("0"+(t.getMonth()+1)).substr(-2)+("0"+t.getDate()).substr(-2);


		} else if(args.style == 101) { 			// mm/dd/yy
			val =  ("0"+(t.getMonth()+1)).substr(-2)+'/'+("0"+t.getDate()).substr(-2)+'/'+t.getFullYear();
		} else if(args.style == 102) { 	// yy.mm.dd
			val =  t.getFullYear()+'.'+("0"+(t.getMonth()+1)).substr(-2)+'.'+("0"+t.getDate()).substr(-2);
		} else if(args.style == 103) { 	// dd/mm/yy
			val =  ("0"+t.getDate()).substr(-2)+'/'+("0"+(t.getMonth()+1)).substr(-2)+'/'+t.getFullYear();
		} else if(args.style == 104) { 	// dd.mm.yy
			val =  ("0"+t.getDate()).substr(-2)+'.'+("0"+(t.getMonth()+1)).substr(-2)+'.'+t.getFullYear();
		} else if(args.style == 105) { 	// dd-mm-yy
			val =  ("0"+t.getDate()).substr(-2)+'-'+("0"+(t.getMonth()+1)).substr(-2)+'-'+t.getFullYear();
		} else if(args.style == 106) { 	// dd mon yy
			val =  ("0"+t.getDate()).substr(-2)+' '+t.toString().substr(4,3).toLowerCase()+' '+t.getFullYear();
		} else if(args.style == 107) { 	// Mon dd,yy
			val =  t.toString().substr(4,3)+' '+("0"+t.getDate()).substr(-2)+','+t.getFullYear();
		} else if(args.style == 108) { 	// hh:mm:ss
			val =  ("0"+t.getHours()).substr(-2)+':'+("0"+(t.getMinutes()+1)).substr(-2)+':'+("0"+t.getSeconds()).substr(-2);

		} else if(args.style == 110) { 	// mm-dd-yy
			val =  ("0"+(t.getMonth()+1)).substr(-2)+'-'+("0"+t.getDate()).substr(-2)+'-'+t.getFullYear();
		} else if(args.style == 111) { 	// yy/mm/dd
			val =  t.getFullYear()+'/'+("0"+(t.getMonth()+1)).substr(-2)+'/'+("0"+t.getDate()).substr(-2);
		} else if(args.style == 112) { 	// yymmdd
			val =  t.getFullYear()+("0"+(t.getMonth()+1)).substr(-2)+("0"+t.getDate()).substr(-2);
		} else {
			throw new Error('The CONVERT style '+args.style+' is not realized yet.');
		}
	};

	var udbtypeid = args.dbtypeid.toUpperCase();

	if(args.dbtypeid == 'Date') {
		return new Date(val);
	} else if(udbtypeid == 'DATE') {
		var d = new Date(val);
		var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
		return s;
	} else if(udbtypeid == 'DATETIME') {
		var d = new Date(val);
		var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
		s += " "+("0"+d.getHours()).substr(-2)+":"+("0"+d.getMinutes()).substr(-2)+":"+("0"+d.getSeconds()).substr(-2);
		s += '.'+("00"+d.getMilliseconds()).substr(-3)
		return s;
	} else if(['NUMBER','FLOAT'].indexOf(udbtypeid)>-1) {
		return +val;
	} else if(['MONEY'].indexOf(udbtypeid)>-1) {
		var m = +val;
		return (m|0)+((m*100)%100)/100;
	} else if(['BOOLEAN'].indexOf(udbtypeid)>-1) {
		return !!val;
	} else if(['INT','INTEGER','SMALLINT','BIGINT','SERIAL','SMALLSERIAL','BIGSERIAL'].indexOf(args.dbtypeid.toUpperCase())>-1) {
		return val|0;
	} else if(['STRING','VARCHAR','NVARCHAR', 'CHARACTER VARIABLE'].indexOf(args.dbtypeid.toUpperCase())>-1) {
		if(args.dbsize) return (""+val).substr(0,args.dbsize);
		else return ""+val;
	} else if(['CHAR','CHARACTER', 'NCHAR'].indexOf(udbtypeid)>-1) {
		return (val+(new Array(args.dbsize+1).join(" "))).substr(0,args.dbsize);
		//else return ""+val.substr(0,1);
	} else if(['DECIMAL','NUMERIC'].indexOf(udbtypeid)>-1) {
		var m = +val;
		var fxd = Math.pow(10,args.dbpecision);
		return (m|0)+((m*fxd)%fxd)/fxd;
	} else if(['JSON'].indexOf(udbtypeid)>-1) {
		if(typeof val == 'object') return val;
		try {
			return JSON.parse(val);
		} catch(err) { throw new Error('Cannot convert string to JSON');};
	};
	return val;
};


/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ColumnDef = function (params) { return yy.extend(this, params); }
yy.ColumnDef.prototype.toString = function() {
	var s =  this.columnid;
	if(this.dbtypeid) s += ' '+this.dbtypeid;
	if(this.dbsize) {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+this.dbprecision;
		s += ')';
	};
	if(this.primarykey) s += ' PRIMARY KEY';
	if(this.notnull) s += ' NOT NULL';
	return s;
}

yy.CreateTable = function (params) { return yy.extend(this, params); }
yy.CreateTable.prototype.toString = function() {
	var s = K('CREATE');
	if(this.temporary) s+=' '+K('TEMPORARY');
	if(this.view) s += ' '+K('VIEW');
	else s += ' '+(this.class?K('CLASS'):K('TABLE'));
	if(this.ifnotexists) s += ' '+K('IF')+' '+K('NOT')+' '+K('EXISTS');
	s += ' '+this.table.toString();
	if(this.viewcolumns) {
		s += '('+this.viewcolumns.map(function(vcol){
			return vcol.toString();
		}).join(',')+')';
	}
	if(this.as) s += ' '+K('AS')+' '+L(this.as);
	else { 
		var ss = this.columns.map(function(col){
			return col.toString();
		});
		s += ' ('+NL()+ID()+ss.join(','+NL()+ID())+')';
	};
	if(this.view && this.select) {
		s += ' AS '+this.select.toString();
	}
	return s;
}

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.CreateTable.prototype.execute = function (databaseid, params, cb) {
//	var self = this;
	var db = alasql.databases[this.table.databaseid || databaseid];

	var tableid = this.table.tableid;
	if(!tableid) {
		throw new Error('Table name is not defined');
	}

//	var ifnotexists = this.ifnotexists;
	var columns = this.columns;
	// if(false) {
	// 	if(!columns) {
	// 		throw new Error('Columns are not defined');
	// 	}
	// }
	var constraints = this.constraints||[];
//	console.log(this);

	// IF NOT EXISTS
	if(this.ifnotexists && db.tables[tableid]) return 0;

	if(db.tables[tableid]) {
		throw new Error('Can not create table \''+tableid
			+'\', because it already exists in the database \''+db.databaseid+'\'');
	}

	var table = db.tables[tableid] = new alasql.Table(); // TODO Can use special object?

	// If this is a class
	if(this.class) {
		table.isclass = true;
	}
	table.identities = {};
	table.checkfn = [];

	var ss = [];
	if(this.columns) {
		this.columns.forEach(function(col) {
			var dbtypeid = col.dbtypeid;
			if(!alasql.fn[dbtypeid]) dbtypeid = dbtypeid.toUpperCase();

			// Process SERIAL data type like Postgress
			if(['SERIAL','SMALLSERIAL','BIGSERIAL'].indexOf(dbtypeid)>-1) col.identity = {value:1,step:1};
			
			var newcol = {
				columnid: col.columnid,
				dbtypeid: dbtypeid, 
				dbsize: col.dbsize, 			// Fixed issue #150
				dbprecision: col.dbprecision, 	// Fixed issue #150
				notnull: col.notnull,
				identity: col.identity
			};
			if(col.identity) {
				table.identities[col.columnid]={value:+col.identity.value,step:+col.identity.step};
//				ss.push('\''+col.columnid+'\':(alasql.databases[\''+db.databaseid+'\'].tables[\''
//					+tableid+'\'].identities[\''+col.columnid+'\'].value)');
			}
			if(col.check) {
				table.checkfn.push(new Function("r",'var y;return '+col.check.expression.toJavaScript('r','')));
			}

			if(col.default) {
				ss.push('\''+col.columnid+'\':'+col.default.toJavaScript('r',''));
			}


			// Check for primary key
			if(col.primarykey) {
				var pk = table.pk = {};
				pk.columns = [col.columnid];
				pk.onrightfns = 'r[\''+col.columnid+'\']';
				pk.onrightfn = new Function("r",'var y;return '+pk.onrightfns);
				pk.hh = hash(pk.onrightfns);
				table.uniqs[pk.hh] = {};
			};

			// UNIQUE clause
			if(col.unique) {
				var uk = {};
				if(typeof table.uk == 'undefined') table.uk = [];
				table.uk.push(uk);
				uk.columns = [col.columnid];
				uk.onrightfns = 'r[\''+col.columnid+'\']';
				uk.onrightfn = new Function("r",'var y;return '+uk.onrightfns);
				uk.hh = hash(uk.onrightfns);
				table.uniqs[uk.hh] = {};
			};

			// UNIQUE clause
			if(col.foreignkey) {
//				console.log(138,col.foreignkey);
				var fk = col.foreignkey.table;
				var fktable = alasql.databases[fk.databaseid||alasql.useid].tables[fk.tableid];
				if(typeof fk.columnid == 'undefined') {
					if(fktable.pk.columns && fktable.pk.columns.length >0 ){
						fk.columnid = fktable.pk.columns[0];
					} else {
						throw new Error('FOREIGN KEY allowed only to tables with PRIMARY KEYs');
					}
				}
//					console.log(fktable.pk);
				var fkfn = function(r) {
					var rr = {};
					if(typeof r[col.columnid] == 'undefined') return true;
					rr[fk.columnid] = r[col.columnid];
					var addr = fktable.pk.onrightfn(rr);
//						console.log(r, rr, addr);
//						console.log(fktable.uniqs[fktable.pk.hh][addr]);
					if(!fktable.uniqs[fktable.pk.hh][addr]) {
						throw new Error('Foreign key "'+r[col.columnid]+'" is not found in table '+fktable.tableid);
					}
					return true;
				};
				table.checkfn.push(fkfn);
/*				var uk = {};
				if(typeof table.uk == 'undefined') table.uk = [];
				table.uk.push(uk);
				uk.columns = [col.columnid];
				uk.onrightfns = 'r[\''+col.columnid+'\']';
				uk.onrightfn = new Function("r",'return '+uk.onrightfns);
				uk.hh = hash(uk.onrightfns);
				table.uniqs[uk.hh] = {};
*/			};

			table.columns.push(newcol);
			table.xcolumns[newcol.columnid] = newcol;

		});
	};
	table.defaultfns = ss.join(',');


//	if(constraints) {
	constraints.forEach(function(con) {
		//console.log(con, con.columns);
		if(con.type == 'PRIMARY KEY') {
			if(table.pk) {
				throw new Error('Primary key already exists');
			}
			var pk = table.pk = {};
			pk.columns = con.columns;
			pk.onrightfns = pk.columns.map(function(columnid){
				return 'r[\''+columnid+'\']'
			}).join("+'`'+");
			pk.onrightfn = new Function("r",'var y;return '+pk.onrightfns);
			pk.hh = hash(pk.onrightfns);
			table.uniqs[pk.hh] = {};					
		} else if(con.type == 'CHECK') {
//			console.log(con.expression.toJavaScript('r',''));
			table.checkfn.push(new Function("r",'var y;return '+con.expression.toJavaScript('r','')));
		} else if(con.type == 'UNIQUE') {
//			console.log(con);
			var uk = {};
			if(!table.uk) table.uk = [];
			table.uk.push(uk);
			uk.columns = con.columns;
			uk.onrightfns = uk.columns.map(function(columnid){
				return 'r[\''+columnid+'\']'
			}).join("+'`'+");
			uk.onrightfn = new Function("r",'var y;return '+uk.onrightfns);
			uk.hh = hash(uk.onrightfns);
			table.uniqs[uk.hh] = {};					
		} else if(con.type == 'FOREIGN KEY') {
//			console.log(con);
			var col = table.xcolumns[con.columns[0]];
			var fk = con.fktable;
			if(con.fkcolumns && con.fkcolumns.length>0) fk.columnid = con.fkcolumns[0];
 			var fktable = alasql.databases[fk.databaseid||alasql.useid].tables[fk.tableid];
			if(typeof fk.columnid == 'undefined') {
				fk.columnid = fktable.pk.columns[0];
			}
//					console.log(fktable.pk);
			var fkfn = function(r) {
				var rr = {};
				if(typeof r[col.columnid] == 'undefined') return true;
				rr[fk.columnid] = r[col.columnid];
				var addr = fktable.pk.onrightfn(rr);
//						console.log(r, rr, addr);
//						console.log(fktable.uniqs[fktable.pk.hh][addr]);
				if(!fktable.uniqs[fktable.pk.hh][addr]) {
	//console.log(228,table,col,fk);
					throw new Error('Foreign key "'+r[col.columnid]+'" is not found in table '+fktable.tableid);
				}
				return true;
			};
			table.checkfn.push(fkfn);
		}
	});

	if(this.view && this.viewcolumns) {
		var self = this;
		this.viewcolumns.forEach(function(vcol,idx){
			self.select.columns[idx].as = vcol.columnid;
		});
	}

//	console.log(100,db.engineid);
	if(db.engineid) {
//		console.log(101,db.engineid);
		return alasql.engines[db.engineid].createTable(this.table.databaseid || databaseid, tableid, this.ifnotexists, cb);
//		console.log('createtable',res1);
//		return res1; 
	}

//	}
//			if(table.pk) {
	table.insert = function(r) {
		var table = this;

		// IDENTINY or AUTO_INCREMENT
		// if(table.identities && table.identities.length>0) {
		// 	table.identities.forEach(function(ident){
		// 		r[ident.columnid] = ident.value;
		// 	});
		// }
//console.log(262,r);
//console.log(263,table.identities)
		for(var columnid in table.identities){
			var ident = table.identities[columnid];
//			console.log(ident);
			r[columnid] = ident.value;
//			console.log(ident);
		};
//console.log(270,r);


		if(table.checkfn && table.checkfn.length>0) {
			table.checkfn.forEach(function(checkfn){
				if(!checkfn(r)) {
					throw new Error('Violation of CHECK constraint');			
				};
			});
		};

		table.columns.forEach(function(column){
			if(column.notnull && typeof r[column.columnid] == 'undefined') {
				throw new Error('Wrong NULL value in NOT NULL column '+column.columnid);
			}
		});
		if(table.pk) {
			var pk = table.pk;
			var addr = pk.onrightfn(r);

			if(typeof table.uniqs[pk.hh][addr] != 'undefined') {
//console.log(pk,addr,pk.onrightfn({ono:1}));			
//console.log(r, pk.onrightfn(r), pk.onrightfns);
				throw new Error('Cannot insert record, because it already exists in primary key index');
			} 
//			table.uniqs[pk.hh][addr]=r;
		}

		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				var ukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][ukaddr] != 'undefined') {
					throw new Error('Cannot insert record, because it already exists in unique index');
				} 				
//				table.uniqs[uk.hh][ukaddr]=r;
			});
		};

		// Final change before insert


		table.data.push(r);
		// Update indices


		for(var columnid in table.identities){
			var ident = table.identities[columnid];
//			console.log(ident);
			ident.value += ident.step;
//			console.log(ident);
		};

		if(table.pk) {
			var pk = table.pk;
			var addr = pk.onrightfn(r);
			table.uniqs[pk.hh][addr]=r;
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				var ukaddr = uk.onrightfn(r);
				table.uniqs[uk.hh][ukaddr]=r;
			});
		};

	};

	table.delete = function(i,params,alasql) {
		var table = this;
		var r = this.data[i];
		if(this.pk) {
			var pk = this.pk;
			var addr = pk.onrightfn(r);
			if(typeof this.uniqs[pk.hh][addr] == 'undefined') {
				throw new Error('Something wrong with primary key index on table');
			} else {
				this.uniqs[pk.hh][addr]=undefined;
			};
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				var ukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][ukaddr] == 'undefined') {
					throw new Error('Something wrong with unique index on table');
				} 				
				table.uniqs[uk.hh][ukaddr]=undefined;
			});
		}
	};

	table.deleteall = function() {
		this.data.length = 0;
		if(this.pk) {
//						var r = this.data[i];
			this.uniqs[this.pk.hh] = {};
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				table.uniqs[uk.hh]={};
			});
		}
	};

	table.update = function(assignfn, i, params) {
		// TODO: Analyze the speed
		var r = cloneDeep(this.data[i]);
		
		// PART 1 - PRECHECK
		if(this.pk) {
			var pk = this.pk;
			pk.pkaddr = pk.onrightfn(r,params);
			if(typeof this.uniqs[pk.hh][pk.pkaddr] == 'undefined') {
				throw new Error('Something wrong with index on table');
			} else {
			}
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				uk.ukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][uk.ukaddr] == 'undefined') {
					throw new Error('Something wrong with unique index on table');
				} 				
			});
		}
		
		assignfn(r,params,alasql);

		// PART 2 - POST CHECK
		if(table.checkfn && table.checkfn.length>0) {
			table.checkfn.forEach(function(checkfn){
				if(!checkfn(r)) {
					throw new Error('Violation of CHECK constraint');			
				};
			});
		};

		table.columns.forEach(function(column){
			if(column.notnull && typeof r[column.columnid] == 'undefined') {
				throw new Error('Wrong NULL value in NOT NULL column '+column.columnid);
			}
		});
		if(this.pk) {
				pk.newpkaddr = pk.onrightfn(r);
				if(typeof this.uniqs[pk.hh][pk.newpkaddr] != 'undefined'
					&& pk.newpkaddr != pk.pkaddr) {
					throw new Error('Record already exists');
				} else {
				}
		};
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				uk.newukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][uk.newukaddr] != 'undefined'
					&& uk.newukaddr != uk.ukaddr) {
					throw new Error('Record already exists');
				} 				
			});
		}

		// PART 3 UPDATE
		if(this.pk) {
			this.uniqs[pk.hh][pk.pkaddr]=undefined;
			this.uniqs[pk.hh][pk.newpkaddr] = r;			
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				table.uniqs[uk.hh][uk.ukaddr]=undefined;
				table.uniqs[uk.hh][uk.newukaddr]=r;
			});
		}


		this.data[i] = r;
	};

	if(this.view && this.select) {
		table.view = true;
//		console.log(this.select.toString());
//		console.log('this.table.databaseid',this.table.databaseid);
//		console.log(this.select.compile(this.table.databaseid||databaseid));
		table.select = this.select.compile(this.table.databaseid||databaseid);
	}
//	console.log(databaseid);
//	console.log(db.databaseid,db.tables);
//	console.log(table);
	var res;
	if(!alasql.options.nocount) res = 1;
	if(cb) res = cb(res);

	return res;
};



//
// Date functions
// 
// (c) 2014, Andrey Gershun
//

/** Standard JavaScript data types */

alasql.fn.Date = Object;
alasql.fn.Date = Date;
alasql.fn.Number = Number;
alasql.fn.String = String;
alasql.fn.Boolean = Boolean;

/** Extend Object with properties */
stdfn.EXTEND = alasql.utils.extend;


stdfn.CHAR = String.fromCharCode.bind(String);
stdfn.ASCII = function(a) {
    return a.charCodeAt(0);
};

/** 
 Return first non-null argument
 See https://msdn.microsoft.com/en-us/library/ms190349.aspx
*/
stdfn.COALESCE = function() {
	for(var i=0;i<arguments.length;i++) {
		if(typeof arguments[i] == 'undefined') continue;
		if(typeof arguments[i] == "number" && isNaN(arguments[i]) ) continue;
		return arguments[i];
	}
	return undefined;
}


stdfn.USER = function(){
	return 'alasql';
}

stdfn.OBJECT_ID = function(objid){
	return !!alasql.tables[objid];
};

stdfn.DATE = function (d) {
	if(/\d{8}/.test(d)) return new Date(+d.substr(0,4),+d.substr(4,2)-1,+d.substr(6,2));
	return new Date(d);
};

stdfn.NOW = function(){
	var d = new Date();
	var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
	s += " "+("0"+d.getHours()).substr(-2)+":"+("0"+d.getMinutes()).substr(-2)+":"+("0"+d.getSeconds()).substr(-2);
	s += '.'+("00"+d.getMilliseconds()).substr(-3)
	return s;
};

stdfn.GETDATE = stdfn.NOW;
stdfn.CURRENT_TIMESTAMP = stdfn.NOW;


// stdfn.GETDATE = function(){
// 	var d = new Date();
// 	var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
// 	return s;	
// }


stdfn.SECOND = function(d){
	var d = new Date(d);
	return d.getSeconds();
};


stdfn.MINUTE = function(d){
	var d = new Date(d);
	return d.getMinutes();
};

stdfn.HOUR = function(d){
	var d = new Date(d);
	return d.getHours();
};

stdfn.DAYOFWEEK = stdfn.WEEKDAY = function(d){
	var d = new Date(d);
	return d.getDay();
};

stdfn.DAY = stdfn.DAYOFMONTH = function(d){
	var d = new Date(d);
	return d.getDate();
};

stdfn.MONTH = function(d){
	var d = new Date(d);
	return d.getMonth()+1;
};

stdfn.YEAR = function(d){
	var d = new Date(d);
	return d.getFullYear();
};

stdfn.DATEDIFF = function(a,b){
	return (+new Date(a).valueOf()) - (new Date(b).valueOf());
};
/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropTable = function (params) { return yy.extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = K('DROP')+' ';
	if(this.view) s += K('VIEW');
	else s += K('TABLE');
	if(this.ifexists) s += ' '+K('IF')+' '+K('EXISTS');
	s += ' '+this.table.toString();
	return s;
}


// DROP TABLE
yy.DropTable.prototype.execute = function (databaseid, params, cb) {
//	console.log(arguments);
//	console.log(alasql.databases[databaseid]);
	var db = alasql.databases[this.table.databaseid || databaseid];
	var tableid = this.table.tableid;
//	console.log(db, this.table.databaseid );
	if(db.engineid /*&& alasql.options.autocommit*/) {
		return alasql.engines[db.engineid].dropTable(this.table.databaseid || databaseid,tableid, this.ifexists, cb);
	}
	if(!this.ifexists || this.ifexists && db.tables[tableid]) {
		if(!db.tables[tableid]) {
			if(!alasql.options.dropifnotexists) {
				throw new Error('Can not drop table \''+this.table.tableid+'\', because it does not exist in the database.');
			}
		} else {
			delete db.tables[tableid];
			return 1;
		}
	}
	return 0;
};


yy.TruncateTable = function (params) { return yy.extend(this, params); }
yy.TruncateTable.prototype.toString = function() {
	var s = K('TRUNCATE')+' '+K('TABLE');
	s += ' '+this.table.toString();
	return s;
}

yy.TruncateTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.table.databaseid || databaseid];
	var tableid = this.table.tableid;
//	console.log(db, this.table.databaseid );
	if(db.engineid) {
		return alasql.engines[db.engineid].truncateTable(this.table.databaseid || databaseid,tableid, this.ifexists, cb);
	}
	if(db.tables[tableid]) {
		db.tables[tableid].data = [];
	} else {
		throw new Error('Cannot truncate table becaues it does not exist');
	}
	return 0;
};

/*
//
// CREATE VERTEX for AlaSQL
// Date: 21.04.2015
// (c) 2015, Andrey Gershun
//
*/

yy.CreateVertex = function (params) { return yy.extend(this, params); }
yy.CreateVertex.prototype.toString = function() {
	var s = K('CREATE')+' '+K('VERTEX')+' ';
	if(this.class) s += L(this.class)+' ';
	if(this.sharp) s += '#'+L(this.sharp)+' ';
	if(this.sets) {
		s += this.sets.toString();
	} else if(this.content) {
		s += this.content.toString();
	} else if(this.select) {
		s += this.select.toString();
	}

	return s;
}

yy.CreateVertex.prototype.toJavaScript = function(context, tableid, defcols) {
//		console.log('yy.CreateVertex.toJavaScript');
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	// var s = '';
	return s;
};

// CREATE TABLE
/*
yy.CreateVertex.prototype.execute = function (databaseid,params,cb) {
	var res = 0;
	if(this.sets) {
		// var obj = {};
		// if(this.sets.length > 0) {
		// 	this.sets.forEach(function(st){
		// 		console.log(st);
		// 	});
		// }

	} else if(this.content) {

	} else if(this.select) {

	} else {
		// CREATE VERTEX without parameters
		var db = alasql.databases[databaseid];
		var vertex = {$id: db.counter++, $node:'vertex'};
		db.objects[vertex.$id] = vertex;
		res = vertex;
	}

	if(cb) res = cb(res);
	return res;
};
*/
yy.CreateVertex.prototype.compile = function (databaseid) {
	var dbid = databaseid;

	// CREATE VERTEX #id
	var sharp = this.sharp; 

	// CREATE VERTEX "Name"
	if(typeof this.name != 'undefined') {
		var s = 'x.name='+this.name.toJavaScript();
		var namefn = new Function('x',s);
	};

	if(this.sets && this.sets.length > 0) {
		var s = this.sets.map(function(st){
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJavaScript('x','');
		}).join(';');
		var setfn = new Function('x,params,alasql',s);
	} else if(this.content) {

	} else if(this.select) {

	} else {
	}


	var statement = function(params,cb){
		var res;

		// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		if(typeof sharp != 'undefined') {
			var id = sharp;
		} else {
			var id = db.counter++;
		}
		var vertex = {$id: id, $node:'VERTEX'};
		db.objects[vertex.$id] = vertex;
		res = vertex;
		if(namefn) namefn(vertex);
		if(setfn) setfn(vertex,params,alasql);

		if(cb) res = cb(res);
		return res;
	};
	return statement;
};

/*
	console.log('yy.CreateVertex.compile');

	if(this.sets) {
		var s = 'var a={};';
		if(this.sets.length > 0) {
			this.sets.forEach(function(st){
				console.log(st);
			});
		}

	} else if(this.content) {

	} else if(this.select) {

	}

};

*/

yy.CreateEdge = function (params) { return yy.extend(this, params); }
yy.CreateEdge.prototype.toString = function() {
//	console.log('here!');
	var s = K('CREATE')+' '+K('EDGE')+' ';
	if(this.class) s += L(this.class)+' ';
	// SET
	// CONTENT
	// SELECT
	return s;
}

yy.CreateEdge.prototype.toJavaScript = function(context, tableid, defcols) {
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	return s;
};

// CREATE TABLE
/*
yy.CreateEdge.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(cb) res = cb(res);
	return res;
};
*/
yy.CreateEdge.prototype.compile = function (databaseid) {
	var dbid = databaseid;
	var fromfn = new Function('params,alasql','var y;return '+this.from.toJavaScript());
	var tofn = new Function('params,alasql','var y;return '+this.to.toJavaScript());

	// CREATE VERTEX "Name"
	if(typeof this.name != 'undefined') {
		var s = 'x.name='+this.name.toJavaScript();
		var namefn = new Function('x',s);
	};

	if(this.sets && this.sets.length > 0) {
		var s = this.sets.map(function(st){
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJavaScript('x','');
		}).join(';');
		var setfn = new Function('x,params,alasql','var y;'+s);
	} else if(this.content) {

	} else if(this.select) {

	} else {
	}

	var statement = function(params,cb){
		var res = 0;
			// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		var edge = {$id: db.counter++, $node:'EDGE'};
		var v1 = fromfn(params,alasql);
		var v2 = tofn(params,alasql);
		// Set link
		edge.$in = [v1.$id];
		edge.$out = [v2.$id];
		// Set sides
		if(typeof v1.$out == 'undefined') v1.$out = [];
		v1.$out.push(edge.$id);
		if(typeof v2.$in == 'undefined') v2.$in = [];
		v2.$in.push(edge.$id);
		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;
		if(namefn) namefn(edge);
		if(setfn) setfn(edge,params,alasql);

		if(cb) res = cb(res);
		return res;
	};
	return statement;

};



yy.CreateGraph = function (params) { return yy.extend(this, params); }
yy.CreateGraph.prototype.toString = function() {
	var s = K('CREATE')+' '+K('GRAPH')+' ';
	if(this.class) s += L(this.class)+' ';
	return s;
}

// yy.CreateEdge.prototype.toJavaScript = function(context, tableid, defcols) {
// 	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
// 	return s;
// };

yy.CreateGraph.prototype.execute = function (databaseid,params,cb) {
	var res = [];
	if(this.from) {
		if(alasql.from[this.from.funcid]) {
			this.graph = alasql.from[this.from.funcid.toUpperCase()]
				(this.from.args[0].value);
			console.log(this.graph);
		}
	}

//	stop;
		this.graph.forEach(function(g){
			if(g.source) {
				// GREATE EDGE
				var e = {};
				if(typeof g.as != 'undefined') alasql.vars[g.as] = e;

				if(typeof g.prop != 'undefined') {
	//				e[g.prop] = e;
	//				v.$id = g.prop; // We do not create $id for edge automatically
					e.name = g.prop;				
				};
				if(typeof g.sharp != 'undefined') e.$id = g.sharp;
				if(typeof g.name != 'undefined') e.name = g.name;
				if(typeof g.class != 'undefined') e.$class = g.class;

				var db = alasql.databases[databaseid];
				if(typeof e.$id == 'undefined') {
					e.$id = db.counter++;
				}
				e.$node='EDGE';
				if(typeof g.json != 'undefined') {
					extend(e,(new Function('params,alasql','var y;return '+
					g.json.toJavaScript()))(params,alasql));
				}

				var v1;
				if(g.source.vars) {
					var vo = alasql.vars[g.source.vars];
					if(typeof vo == 'object') v1 = vo;
					else v1 = db.objects[vo];
				} else {
					var av1 = g.source.sharp; 
					if(typeof av1 == 'undefined') av1 = g.source.prop; 
					v1 = alasql.databases[databaseid].objects[av1];
					if(typeof v1 == 'undefined' && alasql.options.autovertex 
						&& ((typeof g.source.prop != 'undefined') || (typeof g.source.name != 'undefined'))) {
						v1 = findVertex(g.source.prop || g.source.name);
						if(typeof v1 == 'undefined') {
							v1 = createVertex(g.source);
						}
					};

				}

				var v2;
				if(g.source.vars) {
					var vo = alasql.vars[g.target.vars];
					if(typeof vo == 'object') v2 = vo;
					else v2 = db.objects[vo];
				} else {
					var av2 = g.target.sharp; 
					if(typeof av2 == 'undefined') av2 = g.target.prop; 
					v2 = alasql.databases[databaseid].objects[av2];
					if(typeof v2 == 'undefined' && alasql.options.autovertex 
						&& ((typeof g.target.prop != 'undefined') || (typeof g.target.name != 'undefined'))) {
						v2 = findVertex(g.target.prop || g.target.name);
						if(typeof v2 == 'undefined') {
							v2 = createVertex(g.target);
						}
					};
				};

//console.log(v1,v2);
				// Set link
				e.$in = [v1.$id];
				e.$out = [v2.$id];
				// Set sides
				if(typeof v1.$out == 'undefined') v1.$out = [];
				v1.$out.push(e.$id);
				if(typeof v2.$in == 'undefined') v2.$in = [];
				v2.$in.push(e.$id);

				db.objects[e.$id] = e;
				if(typeof e.$class != 'undefined') {
					if(typeof alasql.databases[databaseid].tables[e.$class] == 'undefined') {
						throw new Error('No such class. Pleace use CREATE CLASS');
					} else {
						// TODO - add insert()
						alasql.databases[databaseid].tables[e.$class].data.push(e);
					}
				}

				res.push(e.$id);

			} else {
				createVertex(g);
			}
		});

	if(cb) res = cb(res);
	return res;

	// Find vertex by name
	function findVertex(name) {
		var objects = alasql.databases[alasql.useid].objects;
		for(var k in objects) {
			if(objects[k].name == name) {
				return objects[k];
			}
		}
		return undefined;
	}

	function createVertex(g) {
		// GREATE VERTEX
		var v = {};
		if(typeof g.as != 'undefined') alasql.vars[g.as] = v;
		if(typeof g.prop != 'undefined') {
	//				v[g.prop] = true;
			v.$id = g.prop;
			v.name = g.prop;				
		};
		if(typeof g.sharp != 'undefined') v.$id = g.sharp;
		if(typeof g.name != 'undefined') v.name = g.name;
		if(typeof g.class != 'undefined') v.$class = g.class;

		var db = alasql.databases[databaseid];
		if(typeof v.$id == 'undefined') {
			v.$id = db.counter++;
		}
		v.$node='VERTEX';
		if(typeof g.json != 'undefined') {
			extend(v,(new Function('params,alasql','var y;return '+
			g.json.toJavaScript()))(params,alasql));
		}
		db.objects[v.$id] = v;
		if(typeof v.$class != 'undefined') {
			if(typeof alasql.databases[databaseid].tables[v.$class] == 'undefined') {
				throw new Error('No such class. Pleace use CREATE CLASS');
			} else {
				// TODO - add insert()
				alasql.databases[databaseid].tables[v.$class].data.push(v);
			}
		}

		res.push(v.$id);
		return v;
	}


};



yy.CreateGraph.prototype.compile1 = function (databaseid) {
	var dbid = databaseid;
	var fromfn = new Function('params,alasql','var y;return '+this.from.toJavaScript());
	var tofn = new Function('params,alasql','var y;return '+this.to.toJavaScript());

	// CREATE VERTEX "Name"
	if(typeof this.name != 'undefined') {
		var s = 'x.name='+this.name.toJavaScript();
		var namefn = new Function('x',s);
	};

	if(this.sets && this.sets.length > 0) {
		var s = this.sets.map(function(st){
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJavaScript('x','');
		}).join(';');
		var setfn = new Function('x,params,alasql','var y;'+s);
	} else if(this.content) {

	} else if(this.select) {

	} else {
	}

	var statement = function(params,cb){
		var res = 0;
			// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		var edge = {$id: db.counter++, $node:'EDGE'};
		var v1 = fromfn(params,alasql);
		var v2 = tofn(params,alasql);
		// Set link
		edge.$in = [v1.$id];
		edge.$out = [v2.$id];
		// Set sides
		if(typeof v1.$out == 'undefined') v1.$out = [];
		v1.$out.push(edge.$id);
		if(typeof v2.$in == 'undefined') v2.$in = [];
		v2.$in.push(edge.$id);
		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;
		if(namefn) namefn(edge);
		if(setfn) setfn(edge,params,alasql);

		if(cb) res = cb(res);
		return res;
	};
	return statement;

};

/*
//
// ALTER TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// ALTER TABLE table1 RENAME TO table2
yy.AlterTable = function (params) { return yy.extend(this, params); }
yy.AlterTable.prototype.toString = function() {
	var s = 'ALTER TABLE '+this.table.toString(); 
	if(this.renameto) s += ' RENAME TO '+this.renameto;
	return s;
}

yy.AlterTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[databaseid];
	db.dbversion = Date.now();

	if(this.renameto) {
		var oldtableid = this.table.tableid;
		var newtableid = this.renameto;
			var res = 1;
			if(db.tables[newtableid]) {
				throw new Error("Can not rename a table '"+oldtableid+"' to '"
					+newtableid+"', because the table with this name already exists");
			} else if(newtableid == oldtableid) {
				throw new Error("Can not rename a table '"+oldtableid+"' to itself");
			} else {
				db.tables[newtableid] = db.tables[oldtableid];
				delete db.tables[oldtableid];
				res = 1;
			};
			if(cb) cb(res)
			return res;
	} else if(this.addcolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.addcolumn.columnid;
		if(table.xcolumns[columnid]) {
			throw new Error('Cannot add column "'+columnid+'", because it already exists in the table "'+tableid+'"');
		}

		var col = {
			columnid:columnid,
			dbtypeid:this.dbtypeid,
			dbsize:this.dbsize,
			dbprecision:this.dbprecision,
			dbenum:this.dbenum,
			defaultfns: null // TODO defaultfns!!!
		};

		var defaultfn = function(){};

		table.columns.push(col);
		table.xcolumns[columnid] = col;

		for(var i=0, ilen=table.data.length; i<ilen; i++) {
//				console.log(table.data[i][columnid]);
			table.data[i][columnid] = defaultfn();
		}

		// TODO
		return 1;
	} else if(this.modifycolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.modifycolumn.columnid;

		if(!table.xcolumns[columnid]) {
			throw new Error('Cannot modify column "'+columnid+'", because it was not found in the table "'+tableid+'"');
		}

		var col = table.xcolumns[columnid];
		col.dbtypeid = this.dbtypeid;
		col.dbsize = this.dbsize;
		col.dbprecision = this.dbprecision;
		col.dbenum = this.dbenum;


		// TODO
		return 1;
	} else if(this.renamecolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;

		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.renamecolumn;
		var tocolumnid = this.to;

		var col;
		if(!table.xcolumns[columnid]) {
			throw new Error('Column "'+columnid+'" is not found in the table "'+tableid+'"');
		}
		if(table.xcolumns[tocolumnid]) {
			throw new Error('Column "'+tocolumnid+'" already exists in the table "'+tableid+'"');
		}

		if(columnid != tocolumnid) {
			for(var j=0; j<table.columns.length; j++) {
				if(table.columns[j].columnid == columnid) {
					table.columns[j].columnid = tocolumnid;
				}
			};

			table.xcolumns[tocolumnid]=table.xcolumns[columnid];
			delete table.xcolumns[columnid];

			for(var i=0, ilen=table.data.length; i<ilen; i++) {
//				console.log(table.data[i][columnid]);
				table.data[i][tocolumnid] = table.data[i][columnid];
				delete table.data[i][columnid];
			}
			return table.data.length;
		}
		else return 0;
	} else if(this.dropcolumn) {
		var db = alasql.databases[this.table.databaseid || databaseid];
		db.dbversion++;
		var tableid = this.table.tableid;
		var table = db.tables[tableid];
		var columnid = this.dropcolumn;

		var found = false;
		for(var j=0; j<table.columns.length; j++) {
			if(table.columns[j].columnid == columnid) {
				found = true;
				table.columns.splice(j,1);
				break;
			}
		};

		if(!found) {
			throw new Error('Cannot drop column "'+columnid+'", because it was not found in the table "'+tableid+'"');
		}

		delete table.xcolumns[columnid];

		for(var i=0, ilen=table.data.length; i<ilen; i++) {
			delete table.data[i][columnid];
		}
		return table.data.length;
	} else {
		throw Error('Unknown ALTER TABLE method');
	}

};


/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.CreateIndex = function (params) { return yy.extend(this, params); }
yy.CreateIndex.prototype.toString = function() {
	var s = 'CREATE';
	if(this.unique) s+=' UNIQUE';
	s += ' INDEX ' + this.indexid + " ON "+this.table.toString();
	s += "("+this.columns.toString()+")";
	return s;
}

// CREATE TABLE
yy.CreateIndex.prototype.execute = function (databaseid,params,cb) {
//	var self = this;
	var db = alasql.databases[databaseid];
	var tableid = this.table.tableid;
	var table = db.tables[tableid];
	var indexid = this.indexid;

	if(this.unique) {
		var rightfns = this.columns.map(function(colid){return "r[\'"+colid+"\']"}).join("+'`'+");
		table.uniqdefs[indexid] = {
			rightfns: rightfns
		};
		var ux = table.uniqs[indexid] = {};
		if(table.data.length > 0) {
			for(var i=0, ilen=table.data.length; i<ilen;i++) {
				var addr = rightfns(table.data[i]);
				if(!ux[addr]) {
					ux[addr] = {num:0};
				};
				ux[addr].num++;
			}
		}
	} else {
		var rightfns = this.columns.map(function(colid){return "r[\'"+colid+"\']"}).join("+'`'+");
		var hh = hash(rightfns);
		table.inddefs[indexid] = {rightfns:rightfns, hh:hh};
		table.indices[hh] = {};

		var ix = table.indices[hh] = {};
		if(table.data.length > 0) {
			for(var i=0, ilen=table.data.length; i<ilen;i++) {
				var addr = rightfns(table.data[i]);
				if(!ix[addr]) {
					ix[addr] = [];
				};
				ix[addr].push(table.data[i]);
			}
		}
	};
	var res = 1;
	if(cb) res = cb(res);
	return res;
};



/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropIndex = function (params) { return yy.extend(this, params); }
yy.DropIndex.prototype.toString = function() {
	return 'INDEX TABLE' + this.indexid;
}


// DROP TABLE
yy.DropIndex.prototype.compile = function (db) {
	var indexid = this.indexid;
	return function() {
		return 1;
	}
};

/*
//
// WITH SELECT for Alasql.js
// Date: 11.01.2015
// (c) 2015, Andrey Gershun
//
*/


yy.WithSelect = function (params) { return yy.extend(this, params); }
yy.WithSelect.prototype.toString = function() {
	var s = K('WITH')+' ';
	s += this.withs.map(function(w){
		return L(w.name)+' '+K('AS')+' ('+w.select.toString()+')';
	}).join(',')+' ';
	s += this.select.toString();
	return s;
};

yy.WithSelect.prototype.execute = function (databaseid,params,cb) {
	var self = this;
	// Create temporary tables
	var savedTables = [];
	self.withs.forEach(function(w){
		savedTables.push(alasql.databases[databaseid].tables[w.name]);
		var tb = alasql.databases[databaseid].tables[w.name] = new Table({tableid:w.name});
		tb.data = w.select.execute(databaseid,params);
	});

	var res = 1;
	res = this.select.execute(databaseid,params,function(data){
		// Clear temporary tables
//		setTimeout(function(){
			self.withs.forEach(function(w,idx){
				if(savedTables[idx]) alasql.databases[databaseid].tables[w.name] = savedTables[idx] ;
				else delete alasql.databases[databaseid].tables[w.name];
			});			
//		},0);

		if(cb) data = cb(data);
		return data;
	});
	return res;
};

/*
// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.CreateView.prototype.execute = function (databaseid) {
//	var self = this;
	var db = alasql.databases[this.view.databaseid || databaseid];
	var v = db.views[this.view.viewid] = new View();

//	console.log(databaseid);
//	console.log(db.databaseid,db.tables);
//	console.log(table);

	return 1;
};

yy.DropView = function (params) { return yy.extend(this, params); }
yy.DropView.prototype.toString = function() {
	var s = K('DROP')+' '+K('VIEW');
	s += ' '+this.view.toString();
	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.DropView.prototype.execute = function (databaseid) {
//	var self = this;
};

*/


/*
//
// IF for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.If = function (params) { return yy.extend(this, params); }
yy.If.prototype.toString = function() {
	var s = K('IF')+' ';
	s += this.expression.toString();
	s += ' '+this.thenstat.toString();
	if(this.elsestat) s += ' '+K('ELSE')+NL()+ID()+this.thenstat.toString();
	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.If.prototype.execute = function (databaseid,params,cb){
	var res;
//	console.log(this);
//	console.log(this.expression.toJavaScript('{}','',null));
//	console.log();
	var fn = new Function('params,alasql,p','var y;return '+this.expression.toJavaScript('({})','',null)).bind(this);
//	var fn = new Function('params,alasql,p','console.log(this.thenstat);return '+this.expression.toJavaScript('({})','',null)).bind(this);
	if(fn(params,alasql)) res = this.thenstat.execute(databaseid,params,cb);
	else {
		if(this.elsestat) res = this.elsestat.execute(databaseid,params,cb);
		else {
			if(cb) res = cb(res);
		}
	}
//	else res = this.elsestat.execute(databaseid,params,cb,scope);
	return res;
};



/*
//
// CREATE VIEW for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.While = function (params) { return yy.extend(this, params); }
yy.While.prototype.toString = function() {
	var s = 'WHILE ';
	s += this.expression.toString();
	s += ' '+this.loopstat.toString();
	return s;
};

yy.While.prototype.execute = function (databaseid,params,cb) {
	var self = this;
	var res = [];
//	console.log(this.expression.toJavaScript());
	var fn = new Function('params,alasql,p','var y;return '+this.expression.toJavaScript());
//	console.log('cb',!!cb);
	if(cb) {
		var first = false;
		loop();
		function loop(data) {
			if(first) {
				res.push(data);
			} else {
				first = true;
			};
			setTimeout(function(){
				if(fn(params,alasql)) {
					self.loopstat.execute(databaseid,params,loop);
				} else {
					res = cb(res);
				}
			},0);
		}		
	} else {
		while(fn(params,alasql)) {
			var res1 = self.loopstat.execute(databaseid,params); 
			res.push(res1);
		}
	}
	return res;
};

yy.Break = function (params) { return yy.extend(this, params); }
yy.Break.prototype.toString = function() {
	var s = K('BREAK');
	return s;
};

yy.Break.prototype.execute = function (databaseid,params,cb,scope) {
	var res = 1;
	if(cb) res = cb(res);
	return res;
};

yy.Continue = function (params) { return yy.extend(this, params); }
yy.Continue.prototype.toString = function() {
	var s = K('CONTINUE');
	return s;
};

yy.Continue.prototype.execute = function (databaseid,params,cb,scope) {
	var res = 1;
	if(cb) res = cb(res);	
	return res;
};

yy.BeginEnd = function (params) { return yy.extend(this, params); }
yy.BeginEnd.prototype.toString = function() {
	var s = K('BEGIN')+' '+this.statements.toString()+' '+K('END');
	return s;
};

yy.BeginEnd.prototype.execute = function (databaseid,params,cb,scope) {
	var self = this;
	var res = [];

	var idx = 0;
	runone();
	function runone() {
		self.statements[idx].execute(databaseid,params,function(data){
			res.push(data);
			idx++;
			if(idx<self.statements.length) return runone();
			if(cb) res = cb(res);
		});
	}
	return res;
};

/*
//
// INSERT for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Insert = function (params) { return yy.extend(this, params); }
yy.Insert.prototype.toString = function() {
	var s = 'INSERT INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	if(this.values) s += ' VALUES '+this.values.toString();
	if(this.select) s += ' '+this.select.toString();
	return s;
}

yy.Insert.prototype.toJavaScript = function(context, tableid, defcols) {
//	console.log('Expression',this);
//	if(this.expression.reduced) return 'true';
//	return this.expression.toJavaScript(context, tableid, defcols);
// console.log('Select.toJS', 81, this.queriesidx);
//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
//	s = '(console.log(this.queriesfn[0]),'+s+')';
//	console.log(this,s);

	return s;
};

yy.Insert.prototype.compile = function (databaseid) {
	var self = this;
	databaseid = self.into.databaseid || databaseid
	var db = alasql.databases[databaseid];
//	console.log(self);
	var tableid = self.into.tableid;
	var table = db.tables[tableid];

	// Check, if this dirty flag is required
	var s = '';
	var sw = '';
//	var s = 'db.tables[\''+tableid+'\'].dirty=true;';
	var s3 = 'var a,aa=[],x;';

	var s33;


// INSERT INTO table VALUES
	if(this.values) {

		if(this.exists) {
			this.existsfn  = this.exists.map(function(ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier='RECORDSET';
				return nq;
			});
		}
		if(this.queries) {
			this.queriesfn = this.queries.map(function(q) {
				var nq = q.compile(databaseid);
				nq.query.modifier='RECORDSET';
				return nq;
			});		
		}


//		console.log(1);
		self.values.forEach(function(values) {
			var ss = [];

//			s += 'db.tables[\''+tableid+'\'].data.push({';

//			s += '';
			if(self.columns) {
				self.columns.forEach(function(col, idx){
//console.log(db.tables, tableid, table);
		//			ss.push(col.columnid +':'+ self.values[idx].value.toString());
		//			console.log(rec[f.name.value]);
		//			if(rec[f.name.value] == "NULL") rec[f.name.value] = undefined;

		//			if(table.xflds[f.name.value].dbtypeid == "INT") rec[f.name.value] = +rec[f.name.value]|0;
		//			else if(table.xflds[f.name.value].dbtypeid == "FLOAT") rec[f.name.value] = +rec[f.name.value];
					var q = "'"+col.columnid +'\':';
					if(table.xcolumns && table.xcolumns[col.columnid]) { 
						if(["INT","FLOAT","NUMBER","MONEY"].indexOf(table.xcolumns[col.columnid].dbtypeid) >=0) {
							//q += ''
							q += "(x="+values[idx].toJavaScript()+",x==undefined?undefined:+x)";
						} else if (alasql.fn[table.xcolumns[col.columnid].dbtypeid]) {
							q += "(new "+table.xcolumns[col.columnid].dbtypeid+"(";
							q += values[idx].toJavaScript();
							q += "))";
						} else {
							q += values[idx].toJavaScript();
						};
					} else { 
						q += values[idx].toJavaScript();
					}
					ss.push(q);

				});
			} else {
//				var table = db.tables[tableid];
//	console.log('table1', db, self);
//console.log(111, table.columns);
//console.log(74,table);
				if((values instanceof Array) && table.columns && table.columns.length > 0) {
					table.columns.forEach(function(col, idx){

						var q = '\''+col.columnid +'\':';
//						var val = values[idx].toJavaScript();

						if(["INT","FLOAT","NUMBER","MONEY"].indexOf(col.dbtypeid) >=0) {
							q += "+"+values[idx].toJavaScript();
						} else if (alasql.fn[col.dbtypeid]) {
							q += "(new "+col.dbtypeid+"(";
							q += values[idx].toJavaScript();
							q += "))";
						} else { 
							q += values[idx].toJavaScript();
						}

						 // if(table.xcolumns && table.xcolumns[col.columnid] && 
						 //  (table.xcolumns[col.columnid].dbtypeid == "DATE" ||
							// table.xcolumns[col.columnid].dbtypeid == "DATETIME"
						 //  )) {
						 // 	val = "(new Date("+val+"))";
						 // }
						// 		|| table.xcolumns[col.columnid].dbtypeid == "FLOAT"
						// 		|| table.xcolumns[col.columnid].dbtypeid == "NUMBER"
						// 		|| table.xcolumns[col.columnid].dbtypeid == "MONEY"
						// 	)) q += '+';
					//	console.log(self.values[idx].toString());
			//console.log(self);
//						q += val;

						// if(table.xcolumns && table.xcolumns[col.columnid] && table.xcolumns[col.columnid].dbtypeid == "INT") q += '|0';
						ss.push(q);

			//			console.log(fld);
						// TODO: type checking and conversions
			//			rec[fld.fldid] = eval(self.insertExpression[idx].toJavaScript('',''));
			//			console.log(rec[fld.fldid]);
			//			if(rec[fld.fldid] == "NULL") rec[fld.fldid] = undefined;

			//			if(table.xflds[fld.fldid].dbtypeid == "INT") rec[fld.fldid] = +rec[fld.fldid]|0;
			//			else if(table.xflds[fld.fldid].dbtypeid == "FLOAT" || table.xflds[fld.fldid].dbtypeid == "MONEY" ) 
			//				rec[fld.fldid] = +rec[fld.fldid];
					});
				} else {
//					console.log(222,values);
//					sw = 'var w='+JSONtoJavaScript(values)+';for(var k in w){r[k]=w[k]};';
					sw = JSONtoJavaScript(values);
				}
			}
//console.log(ss);

			if(db.tables[tableid].defaultfns) {
				ss.unshift(db.tables[tableid].defaultfns);
			};
			if(sw) {
				s += 'a='+sw+';';
			} else {
				s += 'a={'+ss.join(',')+'};';
			}

			// If this is a class
			if(db.tables[tableid].isclass) {
				s += 'var db=alasql.databases[\''+databaseid+'\'];';
				s+= 'a.$class="'+tableid+'";';
				s+= 'a.$id=db.counter++;';
				s+= 'db.objects[a.$id]=a;';
			};
//			s += 'db.tables[\''+tableid+'\'].insert(r);';
	        if(db.tables[tableid].insert) {
				s += 'var db=alasql.databases[\''+databaseid+'\'];';
				s += 'db.tables[\''+tableid+'\'].insert(a);';
	        } else {
				s += 'aa.push(a);';
			}
		});

		s33 = s3+s;

        if(db.tables[tableid].insert) {
//			s += 'alasql.databases[\''+databaseid+'\'].tables[\''+tableid+'\'].insert(r);';
        } else {
            s += 'alasql.databases[\''+databaseid+'\'].tables[\''+tableid+'\'].data='+	
            'alasql.databases[\''+databaseid+'\'].tables[\''+tableid+'\'].data.concat(aa);';
        }

        if(db.tables[tableid].insert) {
        	if(db.tables[tableid].isclass) {
	        	s += 'return a.$id;';
        	} else {
				s += 'return '+self.values.length;
        	}
        } else {
			s += 'return '+self.values.length;
        }

//console.log(186,s3+s);
		var insertfn = new Function('db, params, alasql','var y;'+s3+s).bind(this);
	
// INSERT INTO table SELECT

	} else if(this.select) {
		selectfn = this.select.compile(databaseid);
	    if(db.engineid && alasql.engines[db.engineid].intoTable) {
			var statement = function(params, cb) {
				var aa = selectfn(params);
				var res = alasql.engines[db.engineid].intoTable(db.databaseid,tableid,aa,null, cb);
				return res;
			};
			return statement;
	    } else {
			var insertfn = function(db, params, alasql) {
				var res = selectfn(params);
		        if(db.tables[tableid].insert) {
		        	// If insert() function exists (issue #92)
		        	for(var i=0,ilen=res.length;i<ilen;i++) {
		        		db.tables[tableid].insert(res[i]);
		        	}
		        } else {
					db.tables[tableid].data = db.tables[tableid].data.concat(res);
		        };
		        if(alasql.options.nocount) return;
				else return res.length;
			}
		}


	} else if(this.default) {
		var insertfns = 'db.tables[\''+tableid+'\'].data.push({'+table.defaultfns+'});return 1;';
        var insertfn = new Function('db,params,alasql',insertfns); 
    } else {
    	throw new Error('Wrong INSERT parameters');
    }

//    console.log(1,s);
//    	console.log(s33);

    if(db.engineid && alasql.engines[db.engineid].intoTable && alasql.options.autocommit) {
		var statement = function(params, cb) {
			var aa = new Function("db,params",'var y;'+s33+'return aa;')(db,params);
//			console.log(s33);
			var res = alasql.engines[db.engineid].intoTable(db.databaseid,tableid,aa, null, cb);
//			if(cb) cb(res);
			return res;
		};

    } else {

		var statement = function(params, cb) {
			//console.log(databaseid);
			var db = alasql.databases[databaseid];

			if(alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].loadTableData(databaseid,tableid);
			}
			
			var res = insertfn(db,params,alasql);

			if(alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].saveTableData(databaseid,tableid);
			}
	//		var res = insertfn(db, params);
	        if(alasql.options.nocount) res = undefined;
			if(cb) cb(res);
			return res;
		};
	};

	return statement;
};

yy.Insert.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
//	throw new Error('Insert statement is should be compiled')
}




/*
//
// DELETE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Delete = function (params) { return yy.extend(this, params); }
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM '+this.table.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.Delete.prototype.compile = function (databaseid) {
//  console.log(11,this);
	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;
	var statement;
			var db = alasql.databases[databaseid];



	if(this.where) {

//		console.log(27, this);
//		this.query = {};

		if(this.exists) {
			this.existsfn  = this.exists.map(function(ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier='RECORDSET';
				return nq;
			});
		}
		if(this.queries) {
			this.queriesfn = this.queries.map(function(q) {
				var nq = q.compile(databaseid);
				nq.query.modifier='RECORDSET';
				return nq;
			});		
		}


//		try {
//		console.log(this, 22, this.where.toJavaScript('r',''));
//	} catch(err){console.log(444,err)};
//		var query = {};
//console.log(this.where.toJavaScript('r',''));
		wherefn = new Function('r,params,alasql','var y;return ('+this.where.toJavaScript('r','')+')').bind(this);
//		console.log(wherefn);
		statement = (function (params, cb) {
			if(db.engineid && alasql.engines[db.engineid].deleteFromTable) {
				return alasql.engines[db.engineid].deleteFromTable(databaseid, tableid, wherefn, params, cb);
			}

			if(alasql.options.autocommit && db.engineid && db.engineid == 'LOCALSTORAGE') {
				alasql.engines[db.engineid].loadTableData(databaseid,tableid);
			}

			var table = db.tables[tableid];
//			table.dirty = true;
			var orignum = table.data.length;

			var newtable = [];			
			for(var i=0, ilen=table.data.length;i<ilen;i++) {
				if(wherefn(table.data[i],params,alasql)) {
					// Check for transaction - if it is not possible then return all back
					if(table.delete) {
						table.delete(i,params,alasql);
					} else {
						// SImply do not push
					}
				} else newtable.push(table.data[i]);
			}
//			table.data = table.data.filter(function(r){return !;});
			table.data = newtable;
			var res = orignum - table.data.length;
			if(alasql.options.autocommit && db.engineid && db.engineid == 'LOCALSTORAGE') {
				alasql.engines[db.engineid].saveTableData(databaseid,tableid);
			}

//			console.log('deletefn',table.data.length);
			if(cb) cb(res);
			return res;
		});
// .bind(query);

// 		if(!this.queries) return;
// 			query.queriesfn = this.queries.map(function(q) {
// 			return q.compile(alasql.useid);
// 		});

	} else {
		statement = function (params, cb) {
			if(alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].loadTableData(databaseid,tableid);
			}

			var table = db.tables[tableid];
			table.dirty = true;
			var orignum = db.tables[tableid].data.length;
			//table.deleteall();
			// Delete all records from the array
			db.tables[tableid].data.length = 0;

			if(alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].saveTableData(databaseid,tableid);
			}

			if(cb) cb(orignum);
			return orignum;
		};
	};

	return statement;

};

yy.Delete.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
}

/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Update = function (params) { return yy.extend(this, params); }
yy.Update.prototype.toString = function() {
	var s = 'UPDATE '+this.table.toString();
	if(this.columns) s += ' SET '+this.columns.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}


yy.SetColumn = function (params) { return yy.extend(this, params); }
yy.SetColumn.prototype.toString = function() {
	return this.column.toString() + '='+this.expression.toString();
}

yy.Update.prototype.compile = function (databaseid) {
//	console.log(this);
	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;
	
	if(this.where) {
		if(this.exists) {
			this.existsfn  = this.exists.map(function(ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier='RECORDSET';
				return nq;
			});
		}
		if(this.queries) {
			this.queriesfn = this.queries.map(function(q) {
				var nq = q.compile(databaseid);
				nq.query.modifier='RECORDSET';
				return nq;
			});		
		}

		var wherefn = new Function('r,params,alasql','var y;return '+this.where.toJavaScript('r','')).bind(this);
	};

	// Construct update function
	var s = '';
	this.columns.forEach(function(col){
		s += 'r[\''+col.column.columnid+'\']='+col.expression.toJavaScript('r','')+';'; 
	});
//	console.log('updatefn',s);
	var assignfn = new Function('r,params,alasql','var y;'+s);

	var statement = function(params, cb) {
		var db = alasql.databases[databaseid];


//		console.log(db.engineid);
//		console.log(db.engineid && alasql.engines[db.engineid].updateTable);
		if(db.engineid && alasql.engines[db.engineid].updateTable) {
//			console.log('updateTable');
			return alasql.engines[db.engineid].updateTable(databaseid, tableid, assignfn, wherefn, params, cb);
		}

		if(alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].loadTableData(databaseid,tableid);
		}

		var table = db.tables[tableid];
		if(!table) {
			throw new Error("Table '"+tableid+"' not exists")
		}
//		table.dirty = true;
		var numrows = 0;
		for(var i=0, ilen=table.data.length; i<ilen; i++) {
			if(!wherefn || wherefn(table.data[i], params,alasql) ) {
				if(table.update) {
					table.update(assignfn, i, params);
				} else {
					assignfn(table.data[i], params,alasql);
				}
				numrows++;
			}
		};

		if(alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].saveTableData(databaseid,tableid);
		}

		if(cb) cb(numrows);
		return numrows;
	};
	return statement;
};

yy.Update.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
}




/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Merge = function (params) { return yy.extend(this, params); }
yy.Merge.prototype.toString = function() {
	var s = K('MERGE')+' ';
	s += L(this.into.tableid)+' ';
	if(this.into.as) s += K('AS')+' '+L(this.into.as)+' ';
	s += K('USING')+' '+L(this.using.tableid)+' ';
	if(this.using.as) s += K('AS')+' '+L(this.using.as)+' ';
	s += K('ON')+' '+this.on.toString()+' ';
	this.matches.forEach(function(m){
		s += K('WHEN')+' ';
		if(!m.matched) s += K('NOT')+' ';
		s += K('MATCHED')+' ';
		if(m.bytarget) s += K('BY')+' '+K('TARGET')+' ';
		if(m.bysource) s += K('BY')+' '+K('SOURCE')+' ';
		if(m.expr) s+= K('AND')+' '+m.expr.toString()+' ';
		s += K('THEN')+' ';
		if(m.action.delete) s += K('DELETE')+' ';
		if(m.action.insert) {
			s += K('INSERT')+' ';
			if(m.action.columns) s += '('+m.action.columns.toString()+') ';
			if(m.action.values) s += K('VALUES')+' ('+m.action.values.toString()+') ';
			if(m.action.defaultvalues) s += K('DEFAULT')+' '+K('VALUES')+' ';
		}
		if(m.action.update) {
			s += K('UPDATE')+' ';
			s += m.action.update.map(function(u){
				return u.toString();
			}).join(',')+' ';
		}

	});

//	console.log(this);
	return s;
}

yy.Merge.prototype.execute = function (databaseid,params,cb) {
	var res = 1;



	if(cb) res=cb(res);
	return res;
};


/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// Modified: 16.11.2014
// (c) 2014, Andrey Gershun
//
*/

// CREATE DATABASE databaseid
yy.CreateDatabase = function (params) { return yy.extend(this, params); };
yy.CreateDatabase.prototype.toString = function() {
	var s = K('CREATE'); 
	if(this.engineid) s+=' '+L(this.engineid);
	s += ' '+K('DATABASE');
	if(this.ifnotexists) s += ' '+K('IF')+' '+K('NOT')+' '+K('EXISTS');
	s += ' '+L(this.databaseid);
	if(this.args && this.args.length > 0) { 
		s += '('+this.args.map(function(arg){ return arg.toString()}).join(', ')+')';
	}
	if(this.as) s += ' '+K('AS')+' '+L(this.as);
	return s;
}
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.CreateDatabase.prototype.execute = function (databaseid, params, cb) {
	// console.log(alasql.useid, databaseid, this.databaseid);
	// console.trace();
	var args;
	if(this.args && this.args.length > 0) {
		args = this.args.map(function(arg){
			return new Function('params,alasql','var y;return '+arg.toJavaScript())(params,alasql);
		});
	};
	if(this.engineid) {
		var res = alasql.engines[this.engineid].createDatabase(this.databaseid, this.args, this.ifnotexists, this.as, cb);
		return res;
	} else {
		var dbid = this.databaseid;
		if(alasql.databases[dbid]) {
			throw new Error("Database '"+dbid+"' already exists")
		};
		var a = new alasql.Database(dbid);
		var res = 1;
		if(cb) return cb(res);
		return res;
	}
};

// CREATE DATABASE databaseid
yy.AttachDatabase = function (params) { return yy.extend(this, params); };
yy.AttachDatabase.prototype.toString = function() {
	var s = K('ATTACH');
	if(this.engineid) s += ' '+L(this.engineid);
	s += ' '+K('DATABASE')+' '+L(this.databaseid);
	// TODO add params
	if(args) {
		s += '(';
			if(args.length>0) {
				s += args.map(function(arg){ return arg.toString(); }).join(', ');
			}
		s += ')';
	}
	if(this.as) s+= ' '+K('AS')+' '+L(this.as);
	return s;
}
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.AttachDatabase.prototype.execute = function (databaseid, params, cb) {
	// console.log(alasql.useid, databaseid, this.databaseid);
	// console.trace();
	if(!alasql.engines[this.engineid]) {
		throw new Error('Engine "'+this.engineid+'" is not defined.');
	};
	var res = alasql.engines[this.engineid].attachDatabase(this.databaseid, this.as, this.args, params, cb);
	return res;
};


// CREATE DATABASE databaseid
yy.DetachDatabase = function (params) { return yy.extend(this, params); };
yy.DetachDatabase.prototype.toString = function() {
	var s = K('DETACH');
	s += ' '+K('DATABASE')+' '+L(this.databaseid);
	return s;
}
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.DetachDatabase.prototype.execute = function (databaseid, params, cb) {
	// console.log(alasql.useid, databaseid, this.databaseid);
	// console.trace();
	if(!alasql.databases[this.databaseid].engineid) {
		throw new Error('Cannot detach database "'+this.engineid+'", because it was not attached.');
	};
	var res;
	
	var dbid = this.databaseid;

	if(dbid == alasql.DEFAULTDATABASEID) {
		throw new Error("Drop of default database is prohibited");			
	}
//	console.log(dbid);
	if(!alasql.databases[dbid]) {
		if(!this.ifexists) {
			throw new Error("Database '"+dbid+"' does not exist");	
		} else {
			res = 0;
		}
	} else {
		delete alasql.databases[dbid];
		if(dbid == alasql.useid) {
			alasql.use();		
		}
		res = 1;
	}
	if(cb) cb(res);
	return res;
//	var res = alasql.engines[this.engineid].attachDatabase(this.databaseid, this.as, cb);
//	return res;
};

// USE DATABSE databaseid
// USE databaseid
yy.UseDatabase = function (params) { return yy.extend(this, params); };
yy.UseDatabase.prototype.toString = function() {
	return K('USE') +' '+K('DATABASE')+' '+L(this.databaseid);
}
//yy.UseDatabase.prototype.compile = returnUndefined;
yy.UseDatabase.prototype.execute = function (databaseid, params, cb) {
	var dbid = this.databaseid;
	if(!alasql.databases[dbid]) {
		throw new Error("Database '"+dbid+"' does not exist")
	};
	alasql.use(dbid);
	var res = 1;
	if(cb) cb(res);
	return res;
};

// DROP DATABASE databaseid
yy.DropDatabase = function (params) { return yy.extend(this, params); }
yy.DropDatabase.prototype.toString = function() {
	var s = K('DROP');
	if(this.ifexists) s += ' '+K('IF')+' '+K('EXISTS');
	s += ' '+K('DATABASE')+' '+L(this.databaseid);
	return s;
}
//yy.DropDatabase.prototype.compile = returnUndefined;
yy.DropDatabase.prototype.execute = function (databaseid, params, cb) {
	if(this.engineid) {

//		console.log(this,this.databaseid, this.ifexists);
		return alasql.engines[this.engineid].dropDatabase(this.databaseid, this.ifexists, cb);
	}
	var res;
	
	var dbid = this.databaseid;

	if(dbid == alasql.DEFAULTDATABASEID) {
		throw new Error("Drop of default database is prohibited");			
	}
//	console.log(dbid);
	if(!alasql.databases[dbid]) {
		if(!this.ifexists) {
			throw new Error("Database '"+dbid+"' does not exist");	
		} else {
			res = 0;
		}
	} else {
		if(alasql.databases[dbid].engineid) {
			throw new Error("Cannot drop database '"+dbid+"', because it is attached. Detach it.");	
		}

		delete alasql.databases[dbid];
		if(dbid == alasql.useid) {
			alasql.use();		
		}
		res = 1;
	}
	if(cb) cb(res);
	return res;
};






/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Declare = function (params) { return yy.extend(this, params); }
yy.Declare.prototype.toString = function() {
	var s = K('DECLARE')+' ';
	if(this.declares && this.declares.length > 0) {
		s = this.declares.map(function(declare){
			var s = '';
			s += '@'+L(declare.variable)+' ';
			s += declare.dbtypeid;
			if(this.dbsize) s += '('+N(this.dbsize);
			if(this.dbprecision) s+= ','+N(this.dbprecision);
			s += ')';
			if(declare.expression) s += ' = '+declare.expression.toString();
			return s;
		}).join(',');
	}
	return s;
}

yy.Declare.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(this.declares && this.declares.length > 0) {
		this.declares.map(function(declare){
			var dbtypeid = declare.dbtypeid;
			if(!alasql.fn[dbtypeid]) dbtypeid = dbtypeid.toUpperCase();

			alasql.declares[declare.variable] = {dbtypeid:dbtypeid,
				dbsize:declare.dbsize, dbprecision:declare.dbprecision};

			// Set value
			if(declare.expression) {
	//		console.log(this.expression.toJavaScript('','', null));
				alasql.vars[declare.variable] = new Function("params,alasql","return "
					+declare.expression.toJavaScript('({})','', null))(params,alasql);
				if(alasql.declares[declare.variable]) {
					alasql.vars[declare.variable] = alasql.stdfn.CONVERT(alasql.vars[declare.variable],alasql.declares[declare.variable]);
				}
			};
		});
	};
	if(cb) res=cb(res);
	return res;
};


/*
//
// SHOW for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ShowDatabases = function (params) { return yy.extend(this, params); }
yy.ShowDatabases.prototype.toString = function() {
	var s = K('SHOW')+' '+K('DATABASES');
	if(this.like) s += 'LIKE '+this.like.toString();
	return s;
}
yy.ShowDatabases.prototype.execute = function (databaseid, params, cb) {
	if(this.engineid) {
		return alasql.engines[this.engineid].showDatabases(this.like, cb);
	} else {
		var self = this;
		var res = [];
		for(dbid in alasql.databases) {
			res.push({databaseid: dbid});
		};
		if(self.like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(new RegExp((self.like.value).replace(/\%/g,'.*'),'g'));
			});
		}
		if(cb) cb(res);
		return res;
	};

};


yy.ShowTables = function (params) { return yy.extend(this, params); }
yy.ShowTables.prototype.toString = function() {
	var s = K('SHOW')+' '+K('TABLES');
	if(this.databaseid) s += ' FROM '+this.databaseid;
	if(this.like) s += ' '+K('LIKE')+' '+this.like.toString();
	return s;
}
yy.ShowTables.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.databaseid || databaseid];

	var self = this;
	var res = [];
	for(tableid in db.tables) {
		res.push({tableid: tableid});
	};
	if(self.like && res && res.length > 0) {
		res = res.filter(function(d){
			return d.tableid.match(new RegExp((self.like.value).replace(/\%/g,'.*'),'g'));
		});
	};
	if(cb) cb(res);
	return res;
};

yy.ShowColumns = function (params) { return yy.extend(this, params); }
yy.ShowColumns.prototype.toString = function() {
	var s = K('SHOW')+' '+K('COLUMNS');
	if(this.table.tableid) s += ' '+K('FROM')+' '+this.table.tableid;
	if(this.databaseid) s += ' '+K('FROM')+' '+this.databaseid;
	return s;
};

yy.ShowColumns.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	if(table && table.columns) {
		var res = table.columns.map(function(col){
			return {columnid: col.columnid, dbtypeid: col.dbtypeid, dbsize: col.dbsize};
		});
		return res;
	} else {
		return [];
	}
};

yy.ShowIndex = function (params) { return yy.extend(this, params); }
yy.ShowIndex.prototype.toString = function() {
	var s = K('SHOW')+' '+K('INDEX');
	if(this.table.tableid) s += ' '+K('FROM')+' '+this.table.tableid;
	if(this.databaseid) s += ' '+K('FROM')+' '+this.databaseid;
	return s;
}
yy.ShowIndex.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	var res = [];
	if(table && table.indices) {
		for(var ind in table.indices) {
			res.push({hh:ind, len:Object.keys(table.indices[ind]).length});
		}
	}
	return res;
};

yy.ShowCreateTable = function (params) { return yy.extend(this, params); }
yy.ShowCreateTable.prototype.toString = function() {
	var s = K('SHOW')+' '+K('CREATE')+' '+K('TABLE')+' '+L(this.table.tableid);
	if(this.databaseid) s += ' '+K('FROM')+' '+L(this.databaseid);
	return s;
}
yy.ShowCreateTable.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	if(table) {
		var s = K('CREATE')+' '+K('TABLE')+' '+L(this.table.tableid)+' (';
		var ss = [];
		if(table.columns) {
			table.columns.forEach(function(col){
				var a = L(col.columnid)+' '+K(col.dbtypeid);
				if(col.dbsize) a += '('+N(col.dbsize)+')';
				if(col.primarykey) a += ' '+K('PRIMARY')+' '+K('KEY');
				// TODO extend
				ss.push(a); 
			});
			s += ss.join(', ');
		};
		s += ')';
		return s;
	} else {
		throw new Error('There is no such table "'+this.table.tableid+'"');
	}
};

/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.SetVariable = function (params) { return yy.extend(this, params); }
yy.SetVariable.prototype.toString = function() {
	var s = K('SET')+' ';
	if(typeof this.value != 'undefined') s += K(this.variable.toUpperCase())+' '+(this.value?'ON':'OFF');
	if(this.expression) s += this.method + L(this.variable)+' = '+this.expression.toString();
	return s;
}

yy.SetVariable.prototype.execute = function (databaseid,params,cb) {
//	console.log(this);
	if(typeof this.value != 'undefined') {
		var val = this.value;
		if(val == 'ON') val = true;
		else if(val == 'OFF') val = false;
//		if(this.method == '@') {
			alasql.options[this.variable] = val;
//		} else {
//			params[this.variable] = val;
//		}
	} else if(this.expression) {

		if(this.exists) {
			this.existsfn = this.exists.map(function(ex) {
				var nq = ex.compile(databaseid);
				if(nq.query && !nq.query.modifier) nq.query.modifier='RECORDSET';
				return nq;
//				return ex.compile(databaseid);
				// TODO Include modifier
			});
		}
		if(this.queries) {
			this.queriesfn = this.queries.map(function(q) {
				var nq = q.compile(databaseid);
				if(nq.query && !nq.query.modifier) nq.query.modifier='RECORDSET';
				return nq;
				// TODO Include modifier
			});		
		}

//		console.log(this.expression.toJavaScript('','', null));
		var res = new Function("params,alasql","return "
			+this.expression.toJavaScript('({})','', null)).bind(this)(params,alasql);
		if(alasql.declares[this.variable]) {
			res = alasql.stdfn.CONVERT(res,alasql.declares[this.variable]);
		}
		if(this.props && this.props.length > 0) {
			if(this.method == '@') {
				var fs = 'alasql.vars[\''+this.variable+'\']';
			} else {
				var fs = 'params[\''+this.variable+'\']';
			}
			fs += this.props.map(function(prop){
				if(typeof prop == 'string') {
					return '[\''+prop+'\']';
				} else if(typeof prop == 'number') {
					return '['+prop+']';
				} else {
					// console.log('prop:',prop, prop.toJavaScript());
					return '['+prop.toJavaScript()+']';
//				} else {
//					console.log(prop, typeof );
//					throw new Error('Wrong SET property');
				}
			}).join();
//				console.log(fs);
			new Function("value,params,alasql",'var y;'+fs +'=value')(res,params,alasql);
		} else {
			if(this.method == '@') {
				alasql.vars[this.variable] = res;
			} else {
				params[this.variable] = res;
			}
		}
	}
	var res = 1;
	if(cb) res=cb(res);
	return res;
};


// Console functions
/*
alasql.con = {
	results:{}
};

alasql.con.open = function(el) {
	// For browser only
	if (typeof exports === 'object') return;

	// Find parent element
	el = el || document.getElementById('alasql-con') || document.getElementsByTagName('body');
	if(!el) {throw new Error('Cannot fid element for console.')}

	var conel = document.createElement('div');
	conel.style.width = "1000px";
	conel.style.height = "320px";

	alasql.con.conel = conel;

	var lenta = document.createElement('div');
	lenta.style.width = "1000px";
	lenta.style.height = "200px";
	lenta.style.overflow = "scroll";
	alasql.con.lenta = lenta;

	var inpel = document.createElement('div');
	inpel.style.width = "1000px";
	inpel.style.height = "100px";
	inpel.style.contentEditable = true;
	inpel.innerHTML = 'command ';
	alasql.con.inpel = inpel;

	conel.appendChild(lenta);
	conel.appendChild(inpel);
	el.appendChild(conel);
};

alasql.con.clear = function() {
	// For browser only
	if (typeof exports === 'object') return;

	alasql.con.conel.innerHTML = '';
};

alasql.con.close = function() {
	// For browser only
	if (typeof exports === 'object') return;

	alasql.con.conel.removeChild(alasql.con.lenta);
	alasql.con.conel.removeChild(alasql.con.inel);
	alasql.con.conel.parentElement.removeChild(conel);
};

alasql.con.log = function() {
		// For browser only
	if (typeof exports === 'object') {
		console.log.bind(console).apply(this, arguments);
	} else {
		var s = '<div>';
		s += Array.prototype.slice.call(arguments, 0).map(function(arg){
			return arg.toString();
		}).join(' ');
		s += '</div>';
		alasql.con.conel.innerHTML += s;
	};

};
*/
alasql.test = function(name, times, fn) {
	if(arguments.length == 0) {
		alasql.log(alasql.con.results);
		return;
	} else if(arguments.length == 1) {
		var tm = Date.now();
		fn();
		alasql.con.log(Date.now()-tm);
		return;
	} 

	if(arguments.length == 2) {
		fn = times;
		times = 1;
	}

	var tm = Date.now();
	for(var i=0;i<times;i++) fn();
	alasql.con.results[name] = Date.now()-tm;
};

// Console
// alasql.log = function(sql, params) {
// 	var res;
// 	if(typeof sql == "string") {
// 		res = alasql(sql, params);
// 	} else {
// 		res = sql;
// 	};
// 	if(res instanceof Array) {
// 		if(console.table) {
// 			console.table(res);		
// 		} else {
// 			console.log(res);
// 		}
// 	} else {
// 		console.log(res);				
// 	}
// };

// Console
alasql.log = function(sql, params) {
	var olduseid = alasql.useid;
	var target = alasql.options.logtarget;
	// For node other
	if(typeof exports == 'object') {
		target = 'console';
	}

	var res;
	if(typeof sql == "string") {
		res = alasql(sql, params);
	} else {
		res = sql;
	};

	// For Node and console.output
	if(target == 'console' || typeof exports == 'object') {
		if(typeof sql == 'string' && alasql.options.logprompt) console.log(olduseid+'>',sql);

		if(res instanceof Array) {
			if(console.table) {
				// For Chrome and other consoles
				console.table(res);		
			} else {
				// Add print procedure
				console.log(JSONtoString(res));
			}
		} else {
			console.log(JSONtoString(res));				
		}

	} else {
		var el;
		if(target == 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if(typeof target == 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}

		}

		var s = '';

		if(typeof sql == 'string' && alasql.options.logprompt) {
//			s += '<p>'+olduseid+'&gt;&nbsp;'+alasql.pretty(sql)+'</p>';
			s += '<pre><code>'+alasql.pretty(sql)+'</code></pre>';
		}

		if(res instanceof Array) {
			if(res.length == 0) {
				s += '<p>[ ]</p>'
			} else if(typeof res[0] != 'object' || res[0] instanceof Array) {
				for(var i=0,ilen=res.length;i<ilen;i++) {
					s += '<p>'+loghtml(res[i])+'</p>';
				}
			} else {
				s += loghtml(res);
			}
		} else {
			s += loghtml(res);
		}
		el.innerHTML += s;
	}
};

alasql.clear = function() {
	var target = alasql.options.logtarget;
	// For node other
	if(typeof exports == 'object') {
		target = 'console';
	};

	if(target == 'console' || typeof exports == 'object') {
		if(console.clear) {
			console.clear();
		} else {
			// Something todo in Node
		}
	} else {
		var el;
		if(target == 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if(typeof target == 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}
		}
		el.innerHTML = '';		
	}
}

alasql.write = function(s) {
//	console.log('write',s);
	var target = alasql.options.logtarget;
	// For node other
	if(typeof exports == 'object') {
		target = 'console';
	};

	if(target == 'console' || typeof exports == 'object') {
		if(console.log) {
			console.log(s);
		} else {
			// Something todo in Node
		}
	} else {
		var el;
		if(target == 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if(typeof target == 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}
		}
		el.innerHTML += s;		
	}
}

function loghtml(res) {
//	console.log(res); 
	var s  = '';
	if(typeof res == 'undefined') {
		s += 'undefined';
	} else if(res instanceof Array) {
		s += '<style>';
		s += 'table {border:1px black solid; border-collapse: collapse; border-spacing: 0px;}';
		s += 'td,th {border:1px black solid; padding-left:5px; padding-right:5px}';
		s += 'th {background-color: #EEE}';
		s += '</style>';
		s += '<table>';
		var cols = [];			
		for(colid in res[0]) {
			cols.push(colid);
		}
		s += '<tr><th>#';
		cols.forEach(function(colid){
			s += '<th>'+colid;
		});
		for(var i=0,ilen=res.length;i<ilen;i++) {
			s += '<tr><th>'+(i+1);
			cols.forEach(function(colid){
				s += '<td> ';
				if(+res[i][colid] == +res[i][colid]) {
					s += '<div style="text-align:right">';
					if(typeof res[i][colid] == 'undefined') s += 'NULL';
					else s += res[i][colid];
					s += '</div>';
				} else {
					if(typeof res[i][colid] == 'undefined') {
						s += 'NULL';
					} else if (typeof res[i][colid] == 'string') {
						s += res[i][colid];
					} else s += JSONtoString(res[i][colid]);
//					s += res[i][colid];
				};
			});
		}

		s += '</table>';
	} else {
		s += '<p>'+JSONtoString(res)+'</p>';
	}
		// if () {}

		// 		if(typeof res == 'object') {
		// 			s += '<p>'+JSON.stringify(res)+'</p>';
		// 		} else {
		// 		}
	return s;
};



function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        if (element.scrollTop==to) return;
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 10);
    }, 10);
}

alasql.prompt = function(el, useidel, firstsql) {
	if(typeof exports == 'object') {
		throw new Error('The functionality of prompt is not realized for Node.js');
	};
	var prompti = 0;
	if(typeof el == 'string') el = document.getElementById(el);
	if(typeof useidel == 'string') useidel = document.getElementById(useidel);
	useidel.textContent = alasql.useid;

	if(firstsql) {
		alasql.prompthistory.push(firstsql);
		prompti = alasql.prompthistory.length;
		try {
			var tm = Date.now();
			alasql.log(firstsql);
			alasql.write('<p style="color:blue">'+(Date.now()-tm)+' ms</p>');
		} catch (err) {
			alasql.write('<p>'+olduseid+'&gt;&nbsp;<b>'+sql+'</b></p>');
			alasql.write('<p style="color:red">'+err+'<p>');
		}
	};

	var y = el.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
	scrollTo(document.getElementsByTagName('body')[0],y,500);

	el.onkeydown = function(event) {
		if(event.which == 13) {
			var sql = el.value;
			var olduseid = alasql.useid;
			el.value = '';
			alasql.prompthistory.push(sql);
			prompti = alasql.prompthistory.length;
			try {
				var tm = Date.now();
				alasql.log(sql);
				alasql.write('<p style="color:blue">'+(Date.now()-tm)+' ms</p>');
			} catch (err) {
				alasql.write('<p>'+olduseid+'&gt;&nbsp;'+alasql.pretty(sql, false)+'</p>');
				alasql.write('<p style="color:red">'+err+'<p>');
			}
			el.focus();
//			console.log(el.getBoundingClientRect().top);
			useidel.textContent = alasql.useid;
			var y = el.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
			scrollTo(document.getElementsByTagName('body')[0],y,500);
		} else if(event.which == 38) {
			prompti--; if(prompti<0) prompti = 0;
			if(alasql.prompthistory[prompti]) {
				el.value = alasql.prompthistory[prompti];
				event.preventDefault();
			}

		} else if(event.which == 40) {
			prompti++; 
			if(prompti>=alasql.prompthistory.length) {
				prompti = alasql.prompthistory.length;
				el.value = '';
			} else if(alasql.prompthistory[prompti]) {
				el.value = alasql.prompthistory[prompti];
				event.preventDefault();
			}
		}

	}
}




/*
//
// Commit for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/
yy.BeginTransaction = function (params) { return yy.extend(this, params); }
yy.BeginTransaction.prototype.toString = function() {
	return K('BEGIN')+' '+K('TRANSACTION');
}

yy.BeginTransaction.prototype.execute = function (databaseid,params, cb) {
	var res = 1;
	if(alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].begin(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};

yy.CommitTransaction = function (params) { return yy.extend(this, params); }
yy.CommitTransaction.prototype.toString = function() {
	return K('COMMIT')+' '+K('TRANSACTION');
}

yy.CommitTransaction.prototype.execute = function (databaseid,params, cb) {
	var res = 1;
	if(alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[alasql.useid].engineid].commit(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};

yy.RollbackTransaction = function (params) { return yy.extend(this, params); }
yy.RollbackTransaction.prototype.toString = function() {
	return K('ROLLBACK')+' '+K('TRANSACTION');
}

yy.RollbackTransaction.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(alasql.databases[databaseid].engineid) {
		return alasql.engines[alasql.databases[databaseid].engineid].rollback(databaseid, cb);
	} else {
		// alasql commit!!!
	}
	if(cb) cb(res);
	return res;
};

if(alasql.options.tsql) {


//
// Check tables and views
// IF OBJECT_ID('dbo.Employees') IS NOT NULL
//   DROP TABLE dbo.Employees;
  // IF OBJECT_ID('dbo.VSortedOrders', 'V') IS NOT NULL
//   DROP VIEW dbo.VSortedOrders;

alasql.stdfn.OBJECT_ID = function(name,type) {
	if(typeof type == 'undefined') type = 'T';
	type = type.toUpperCase();

	var sname = name.split('.');
	var dbid = alasql.useid;
	var objname = sname[0];
	if(sname.length == 2) {
		dbid = sname[0];
		objname = sname[1];
	}

	var tables = alasql.databases[dbid].tables;
	dbid = 	alasql.databases[dbid].databaseid;
	for(var tableid in tables) {
		if(tableid == objname) {
			// TODO: What OBJECT_ID actually returns

			if(tables[tableid].view && type == 'V') return dbid+'.'+tableid;
			if(!tables[tableid].view && type == 'T') return dbid+'.'+tableid;
			return undefined;
		}
	}

	return undefined;
};

}


if(alasql.options.mysql) {



}

if(alasql.options.mysql || alasql.options.sqlite) {

// Pseudo INFORMATION_SCHEMA function
alasql.from.INFORMATION_SCHEMA = function(filename, opts, cb, idx, query) {
	if(filename == 'VIEWS' || filename == 'TABLES' ) {
		var res = [];
		for(var databaseid in alasql.databases) {			
			var tables = alasql.databases[databaseid].tables;
			for(var tableid in tables) {
				if((tables[tableid].view && filename == 'VIEWS') ||
					(!tables[tableid].view && filename == 'TABLES')) {
					res.push({TABLE_CATALOG:databaseid,TABLE_NAME:tableid});
				}
			}
		}
		if(cb) res = cb(res, idx, query);
		return res;		
	}
	throw new Error('Unknown INFORMATION_SCHEMA table');
}

}
if(alasql.options.postgres) {
}
if(alasql.options.oracle) {
}
if(alasql.options.sqlite) {
}
//
// into functions
//
// (c) 2014 Andrey Gershun
//

alasql.into.SQL = function(filename, opts, data, columns, cb) {
	var res;
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}
	var opt = {};
	alasql.utils.extend(opt, opts);
	if(typeof opt.tableid == 'undefined') {
		throw new Error('Table for INSERT TO is not defined.');
	};

	var s = '';
	if(columns.length == 0) {
		if(typeof data[0] == "object") {
			columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
		} else {
			// What should I do?
			// columns = [{columnid:"_"}];
		}
	}

	for(var i=0,ilen=data.length;i<ilen;i++) {
		s += 'INSERT INTO '+opts.tableid +'(';
		s += columns.map(function(col){return col.columnid}).join(",");
		s += ') VALUES (';
		s += columns.map(function(col){
			var val = data[i][col.columnid];
			if(col.typeid) {
				if(col.typeid == 'STRING' || col.typeid == 'VARCHAR' ||  
					col.typeid == 'NVARCHAR' || col.typeid == 'CHAR' || col.typeid == 'NCHAR') {
					val = "'"+escapeqq(val)+"'";
				}
			} else {
				if(typeof val == 'string') {
					val = "'"+escapeqq(val)+"'";					
				}
			}
			return val;
		});		
		s += ');\n';
	}
//	if(filename === '') {
//		res = s;
//	} else {
//		res = data.length;
	res = alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};

alasql.into.HTML = function(selector, opts, data, columns, cb) {
	var res = 1;
	if(typeof exports != 'object') {
		var opt = {};
		alasql.utils.extend(opt, opts);

		var sel = document.querySelector(selector);
		if(!sel) {
			throw new Error('Selected HTML element is not found');
		};	

		if(columns.length == 0) {
			if(typeof data[0] == "object") {
				columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
			} else {
				// What should I do?
				// columns = [{columnid:"_"}];
			}
		}

		var tbe = document.createElement('table');
		var thead = document.createElement('thead');
		tbe.appendChild(thead);
		if(opt.headers) {
			var tre = document.createElement('tr');
			for(var i=0;i<columns.length;i++){
				var the = document.createElement('th');
				the.textContent = columns[i].columnid;
				tre.appendChild(the);
			}
			thead.appendChild(tre);
		}

		var tbody = document.createElement('tbody');
		tbe.appendChild(tbody);
		for(var j=0;j<data.length;j++){
			var tre = document.createElement('tr');
			for(var i=0;i<columns.length;i++){
				var the = document.createElement('td');
				the.textContent = data[j][columns[i].columnid];
				tre.appendChild(the);
			}
			tbody.appendChild(tre);
		};
		alasql.utils.domEmptyChildren(sel);
//		console.log(tbe,columns);
		sel.appendChild(tbe);
	}
	if(cb) res = cb(res);
	return res;
};

alasql.into.JSON = function(filename, opts, data, columns, cb) {
	var res = 1;
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}
	var opt = {};
	var s = JSON.stringify(data);

	res = alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};

alasql.into.TXT = function(filename, opts, data, columns, cb) {
	// If columns is empty
	if(columns.length == 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
	};
	// If one parameter
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	};

	var res = data.length;
	var s = '';
	if(data.length > 0) {
		var key = columns[0].columnid;
		s += data.map(function(d){
			return d[key];
		}).join('\n');
	}

//	} else {
//		if(typeof exports == 'object') {
//			process.stdout.write(s);
//		} else {
//		console.log(s);
//		};
//	}
	res = alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};

alasql.into.TAB = alasql.into.TSV = function(filename, opts, data, columns, cb) {
	var opt = {};
	alasql.utils.extend(opt, opts);
	opt.separator = '\t';
	return alasql.into.CSV(filename, opt, data, columns, cb);
}

alasql.into.CSV = function(filename, opts, data, columns, cb) {
	if(columns.length == 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
	}
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}

	var opt = {};
	opt.separator = ',';
	opt.quote = '"';
	alasql.utils.extend(opt, opts);
	var res = data.length;
	var s = '';
	if(opt.headers) {
		s += columns.map(function(col){
			return col.columnid;
		}).join(opt.separator)+'\n';
	}

	data.forEach(function(d, idx){
		s += columns.map(function(col){
			var s = d[col.columnid];
			s = (s+"").replace(new RegExp('\\'+opt.quote,"g"),'""');
			if((s+"").indexOf(opt.separator) > -1 || (s+"").indexOf(opt.quote) > -1) s = opt.quote + s + opt.quote; 
			return s;
		}).join(opt.separator)+'\n';	
	});

	res = alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};



//
// 831xl.js - Coloring Excel
// 18.04.2015
// Generate XLS file with colors and styles
// with Excel

alasql.into.XLS = function(filename, opts, data, columns, cb) {
	// If filename is not defined then output to the result
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}

	// Set sheets
	var sheets = {};
	if(opts && opts.sheets) {
		sheets = opts.sheets;
	};

	// Default sheet
	var sheet = {};
	if(typeof sheets['Sheet1'] != 'undefined') {
		sheet = sheets[0];
	} else {
		if(typeof opts != 'undefined') {
			sheet = opts;
		}
	};

	// Set sheet name and default is 'Sheet1'
	if(typeof sheet.sheetid == 'undefined') {
		sheet.sheetid = 'Sheet1';
	};
	
	var s = toHTML();

	// File is ready to save
	var res = alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;

	function toHTML() {
	// Generate prologue
		var s = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" \
		xmlns="http://www.w3.org/TR/REC-html40"><head> \
		<meta charset="utf-8" /> \
		<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets> ';

		// Worksheets
		s+=' <x:ExcelWorksheet><x:Name>' + sheet.sheetid + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/>     </x:WorksheetOptions> \
		</x:ExcelWorksheet>';

		s += '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';

		// Generate body
		s += '<body';
		if(typeof sheet.style != 'undefined') {
			s += ' style="';
			if(typeof sheet.style == 'function') {
				s += sheet.style(sheet);
			} else {
				s += sheet.style;
			}
			s += '"';
		}
		s +='>';
		s += '<table>';
		if(typeof sheet.caption != 'undefined') {
			var caption = sheet.caption;
			if(typeof caption == 'string') {
				caption = {title:caption};
			}
			s += '<caption';
			if(typeof caption.style != 'undefined') {
				s += ' style="';
				if(typeof caption.style == 'function') {
					s += caption.style(sheet,caption);
				} else {
					s += caption.style;
				}
				s += '" '
			}
			s += '>';
			s += caption.title;
			s += '</caption>';
		}

		// Columns

//		var columns = [];

		// If columns defined in sheet, then take them
		if(typeof sheet.columns != 'undefined') {
			columns = sheet.columns;
		} else {
			// Autogenerate columns if they are passed as parameters
			if(columns.length == 0 && data.length > 0) {
				if(typeof data[0] == 'object') {
					if(data[0] instanceof Array) {
						columns = data[0].map(function(d,columnidx){
							return {columnid:columnidx};
						});
					} else {
						columns = Object.keys(data[0]).map(function(columnid){
							return {columnid:columnid};
						});
					}
				}
			}
		};

		// Prepare columns
		columns.forEach(function(column,columnidx){
			if(typeof sheet.column != 'undefined') {
				extend(column,sheet.column);
			}

			if(typeof column.width == 'undefined') {
				if(sheet.column && sheet.column.width !='undefined') {
					column.width = sheet.column.width;
				
				} else {
					column.width = "120px";
				}
			}
			if(typeof column.width == 'number') column.width = column.width + "px";
			if(typeof column.columnid == 'undefined') column.columnid = columnidx;
			if(typeof column.title == 'undefined') column.title = ""+column.columnid;
			if(sheet.headers && sheet.headers instanceof Array) column.title = sheet.headers[idx];
		});

		// Set columns widths
		s += '<colgroups>';
		columns.forEach(function (column) {
			s += '<col style="width: '+column.width+'"></col>';
		});
		s += '</colgroups>';

		// Headers
		if(sheet.headers) {
		 	s += '<thead>';
		 	s += '<tr>';

			// TODO: Skip columns to body

			// Headers
			columns.forEach(function (column,columnidx) {

				s += '<th ';
				// Column style
				if(typeof column.style != 'undefined') {
					s += ' style="';
					if(typeof column.style == 'function') {
						s += column.style(sheet,column,columnidx);
					} else {
						s += column.style;
					}
					s += '" '
				}
				s += '>';

				// Column title
				if(typeof column.title != 'undefined') {
					if(typeof column.title == 'function') {
						s += column.title(sheet,column,columnidx);
					} else {
						s += column.title;
					}
				}
				s += '</th>';
			});	

			s += '</tr>';	
			s += '</thead>';
		}

		s += '<tbody>';

		// TODO: Skip lines between header and body

		if(data && data.length > 0) {

			// TODO: Skip columns to body

			// Loop over data rows
			data.forEach(function(row,rowidx){
				// Limit number of rows on the sheet
				if(rowidx>sheet.limit) return;
				// Create row
				s += '<tr';

				var srow = {};
				extend(srow,sheet.row);
				if(sheet.rows && sheet.rows[rowidx]) {
					extend(srow,sheet.rows[rowidx]);
				}
				// Row style fromdefault sheet
				if(typeof srow != 'undefined') {
					if(typeof srow.style != 'undefined') {
						s += ' style="';
						if(typeof srow.style == 'function') {
							s += srow.style(sheet,row,rowidx);
						} else {
							s += srow.style;
						}
						s += '" '
					}
				};
				s += '>';
				// Loop over columns
				columns.forEach(function (column,columnidx) {
					// Parameters
					var cell = {};
					extend(cell,sheet.cell);
					extend(cell,srow.cell);
					if(typeof sheet.column != 'undefined') {
						extend(cell,sheet.column.cell);
					}
					extend(cell,column.cell);
					if(sheet.cells && sheet.cells[rowidx] && sheet.cells[rowidx][columnidx]) {
						extend(cell,sheet.cells[rowidx][columnidx]);
					};

					// Create value
					var value = row[column.columnid];
					if(typeof cell.value == 'function') {
						value = cell.value(value,sheet,row,column,cell,rowidx,columnidx);
					}

					// Define cell type
					var typeid = cell.typeid;
					if(typeof typeid == 'function') {
						typeid = typeid(value,sheet,row,column,cell,rowidx,columnidx);
					}

					if(typeof typeid == 'undefined') {
						if(typeof value == 'number') typeid = 'number';
						else if(typeof value == 'string') typeid = 'string';
						else if(typeof value == 'boolean') typeid = 'boolean';
						else if(typeof value == 'object') {
							if(value instanceof Date) typeid = 'date';
						}
					};

					var typestyle = '';

					if(typeid == 'money') {
						typestyle = 'mso-number-format:\"\\#\\,\\#\\#0\\\\ _р_\\.\";white-space:normal;';
					} else if(typeid == 'number') {
						typestyle = ' ';
					} else if (typeid == 'date') {
						typestyle = 'mso-number-format:\"Short Date\";'; 
					} else {
						// FOr other types is saved
						if( opts.types && opts.types[typeid] && opts.types[typeid].typestyle) {
							typestyle = opts.types[typeid].typestyle;
						} 
					}

					// TODO Replace with extend...
					typestyle = typestyle || 'mso-number-format:\"\\@\";'; // Default type style

					s += "<td style='" + typestyle+"' " ;
					if(typeof cell.style != 'undefined') {
						s += ' style="';
						if(typeof cell.style == 'function') {
							s += cell.style(value,sheet,row,column,rowidx,columnidx);
						} else {
							s += cell.style;
						}
						s += '" '
					}
					s += '>';

					// TODO Replace with extend...
					var format = cell.format;
					if(typeof value == 'undefined') {
						s += '';
					} else if(typeof format != 'undefined') {
						if(typeof format == 'function') {
							s += format(value);
						} else if(typeof format == 'string') {
							s += value; // TODO - add string format
						} else {
							throw new Error('Unknown format type. Should be function or string');
						}
					} else {
						if(typeid == 'number' || typeid == 'date') {
							s += value.toString();
						} else if(typeid == 'money') {
							s += (+value).toFixed(2);
						} else {
							s += value;
						}
					}
					s += '</td>';
				});

				s += '</tr>';
			});
		}

		s += '</tbody>';

		// Generate epilogue
		s += '</table>';
		s += '</body>';
		s += '</html>';

		return s;

	}

	// Style function
	function style(a) {
		var s = ' style="';
		if(a && typeof a.style != 'undefined') {
			s += a.style + ';';
		}
		s += '" ';
		return s;
	}
};



alasql.into.XLSXML = function(filename, opts, data, columns, cb) {
	// If filename is not defined then output to the result
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}

	// Set sheets
	var sheets = {};
	if(opts && opts.sheets) {
		sheets = opts.sheets;
	} else {
		sheets.Sheet1 = opts;
	};

	// File is ready to save
	var res = alasql.utils.saveFile(filename,toXML());
	if(cb) res = cb(res);
	return res;

	function toXML() {
		var s1 = '<?xml version="1.0"?> \
		<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" \
		 xmlns:o="urn:schemas-microsoft-com:office:office" \
		 xmlns:x="urn:schemas-microsoft-com:office:excel" \
		 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" \
		 xmlns:html="http://www.w3.org/TR/REC-html40"> \
		 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"> \
		 </DocumentProperties> \
		 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"> \
		  <AllowPNG/> \
		 </OfficeDocumentSettings> \
		 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"> \
		  <ActiveSheet>0</ActiveSheet> \
		 </ExcelWorkbook> \
		 <Styles> \
		  <Style ss:ID="Default" ss:Name="Normal"> \
		   <Alignment ss:Vertical="Bottom"/> \
		   <Borders/> \
		   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"/> \
		   <Interior/> \
		   <NumberFormat/> \
		   <Protection/> \
		  </Style>';

	 	var s2 = ''; // for styles

		var s3 = ' </Styles>';

		var styles = {}; // hash based storage for styles
		var stylesn = 62; // First style

		// Generate style
		function hstyle(st) {
			// Prepare string
			var s = '';
			for(var key in st) {
				s += '<'+key;
				for(var attr in st[key]) {
					s += ' ';
					if(attr.substr(0,2) == 'x:') {
						s += attr;
					} else {
						s += 'ss:';
					}
					s += attr+'="'+st[key][attr]+'"';
				}
				s += '/>';
			}
			
			var hh = hash(s);
			// Store in hash
			if(styles[hh]) {
			} else {
				styles[hh] = {styleid:stylesn};
				s2 += '<Style ss:ID="s'+stylesn+'">';
				s2 += s;
				s2 += '</Style>';
				stylesn++;
			}
			return 's'+styles[hh].styleid;
		}

		for (var sheetid in sheets) {
			var sheet = sheets[sheetid];

			// If columns defined in sheet, then take them
			if(typeof sheet.columns != 'undefined') {
				columns = sheet.columns;
			} else {
				// Autogenerate columns if they are passed as parameters
				if(columns.length == 0 && data.length > 0) {
					if(typeof data[0] == 'object') {
						if(data[0] instanceof Array) {
							columns = data[0].map(function(d,columnidx){
								return {columnid:columnidx};
							});
						} else {
							columns = Object.keys(data[0]).map(function(columnid){
								return {columnid:columnid};
							});
						}
					}
				}
			};

			// Prepare columns
			columns.forEach(function(column,columnidx){
				if(typeof sheet.column != 'undefined') {
					extend(column,sheet.column);
				}

				if(typeof column.width == 'undefined') {
					if(sheet.column && (typeof sheet.column.width !='undefined')) {
						column.width = sheet.column.width;
					} else {
						column.width = 120;
					}
				}
				if(typeof column.width == 'number') column.width = column.width;
				if(typeof column.columnid == 'undefined') column.columnid = columnidx;
				if(typeof column.title == 'undefined') column.title = ""+column.columnid;
				if(sheet.headers && sheet.headers instanceof Array) column.title = sheet.headers[idx];
			});


			// Header
	 		s3 +='<Worksheet ss:Name="'+sheetid+'"> \
	  			<Table ss:ExpandedColumnCount="'+columns.length
	  			+'" ss:ExpandedRowCount="'+((sheet.headers?1:0)+Math.min(data.length,sheet.limit||data.length))
	  				+'" x:FullColumns="1" \
	   			x:FullRows="1" ss:DefaultColumnWidth="65" ss:DefaultRowHeight="15">';

			columns.forEach(function (column,columnidx) {

	   			s3 += '<Column ss:Index="'+(columnidx+1)
	   			       +'" ss:AutoFitWidth="0" ss:Width="'+column.width+'"/>'
	   		});

	   		// Headers
			if(sheet.headers) {
	   			s3 += '<Row ss:AutoFitHeight="0">';

				// TODO: Skip columns to body

				// Headers
				columns.forEach(function (column,columnidx) {

		    		s3 += '<Cell ';

					if(typeof column.style != 'undefined') {
						var st = {};
						if(typeof column.style == 'function') {
							extend(st,column.style(sheet,column,columnidx));
						} else {
							extend(st,column.style);
						}
						s3 += 'ss:StyleID="'+hstyle(st)+'"';
					}

		    		s3 += '><Data ss:Type="String">';

					// Column title
					if(typeof column.title != 'undefined') {
						if(typeof column.title == 'function') {
							s3 += column.title(sheet,column,columnidx);
						} else {
							s3 += column.title;
						}
					}
					s3 += '</Data></Cell>';
				});	

				s3 += '</Row>';
			};


	   		// Data
			if(data && data.length > 0) {
				// Loop over data rows
				data.forEach(function(row,rowidx){
					// Limit number of rows on the sheet
					if(rowidx>sheet.limit) return;

					// Extend row properties
					var srow = {};
					extend(srow,sheet.row);
					if(sheet.rows && sheet.rows[rowidx]) {
						extend(srow,sheet.rows[rowidx]);
					}


		   			s3 += '<Row ';

					// Row style fromdefault sheet
					if(typeof srow != 'undefined') {
						var st = {};
						if(typeof srow.style != 'undefined') {
							if(typeof srow.style == 'function') {
								extend(st,srow.style(sheet,row,rowidx));
							} else {
								extend(st,srow.style);
							}
							s3 += 'ss:StyleID="'+hstyle(st)+'"';
						}
					};

					s3 += '>';//'ss:AutoFitHeight="0">'

					// Data
					columns.forEach(function (column,columnidx) {

						// Parameters
						var cell = {};
						extend(cell,sheet.cell);
						extend(cell,srow.cell);
						if(typeof sheet.column != 'undefined') {
							extend(cell,sheet.column.cell);
						}
						extend(cell,column.cell);
						if(sheet.cells && sheet.cells[rowidx] && sheet.cells[rowidx][columnidx]) {
							extend(cell,sheet.cells[rowidx][columnidx]);
						};

						// Create value
						var value = row[column.columnid];
						if(typeof cell.value == 'function') {
							value = cell.value(value,sheet,row,column,cell,rowidx,columnidx);
						}

						// Define cell type
						var typeid = cell.typeid;
						if(typeof typeid == 'function') {
							typeid = typeid(value,sheet,row,column,cell,rowidx,columnidx);
						}

						if(typeof typeid == 'undefined') {
							if(typeof value == 'number') typeid = 'number';
							else if(typeof value == 'string') typeid = 'string';
							else if(typeof value == 'boolean') typeid = 'boolean';
							else if(typeof value == 'object') {
								if(value instanceof Date) typeid = 'date';
							}
						};

						var Type = 'String';
						if(typeid == 'number') Type = 'Number';
						else if(typeid == 'date') Type = 'Date';
						// TODO: What else?


						// Prepare Data types styles
						var typestyle = '';

						if(typeid == 'money') {
							typestyle = 'mso-number-format:\"\\#\\,\\#\\#0\\\\ _р_\\.\";white-space:normal;';
						} else if(typeid == 'number') {
							typestyle = ' ';
						} else if (typeid == 'date') {
							typestyle = 'mso-number-format:\"Short Date\";'; 
						} else {
							// FOr other types is saved
							if( opts.types && opts.types[typeid] && opts.types[typeid].typestyle) {
								typestyle = opts.types[typeid].typestyle;
							} 
						}

						// TODO Replace with extend...
						typestyle = typestyle || 'mso-number-format:\"\\@\";'; // Default type style


			    		s3 += '<Cell ';
if(false) {
						s += "<td style='" + typestyle+"' " ;	
}			    		

						// Row style fromdefault sheet
						var st = {};
						if(typeof cell.style != 'undefined') {
							if(typeof cell.style == 'function') {
								extend(st,cell.style(value,sheet,row,column,rowidx,columnidx));
							} else {
								extend(st,cell.style);
							}
							s3 += 'ss:StyleID="'+hstyle(st)+'"';
						}

			    		s3 += '>';

			    		s3+='<Data ss:Type="'+Type+'">';

						// TODO Replace with extend...
						var format = cell.format;
						if(typeof value == 'undefined') {
							s3 += '';
						} else if(typeof format != 'undefined') {
							if(typeof format == 'function') {
								s3 += format(value);
							} else if(typeof format == 'string') {
								s3 += value; // TODO - add string format
							} else {
								throw new Error('Unknown format type. Should be function or string');
							}
						} else {
							if(typeid == 'number' || typeid == 'date') {
								s3 += value.toString();
							} else if(typeid == 'money') {
								s3 += (+value).toFixed(2);
							} else {
								s3 += value;
							}
						}

//			    		s3 += row[column.columnid];
			    		s3 += '</Data></Cell>';
			    	});
		   			
		   			s3 += '</Row>';
		   		});

		   	}
	   		// Finish
			s3 += '</Table></Worksheet>';
		};

		s3 +='</Workbook>';

		return s1+s2+s3;
	};

};

/** 
	Export to XLSX function
	@function
	@param {string|object} filename Filename or options
	@param {object|undefined} opts Options or undefined
	@param {array} data Data
	@param {array} columns Columns
	@parab {callback} cb Callback function
	@return {number} Number of files processed
*/

alasql.into.XLSX = function(filename, opts, data, columns, cb) {

	/** @type {number} result */
	var res = 1;

	if(deepEqual(columns,[{columnid:'_'}])) {
		data = data.map(function(dat){return dat._;});
		columns = undefined;
//		res = [{_:1}];
	} else {
//		data = data1;
	}

//console.log(data);

	/* If Node.js then require() else in browser take a global */
	if(typeof exports == 'object') {
		var XLSX = require('xlsx');
	} else {
		var XLSX = window.XLSX;
	};

	/* If called without filename, use opts */
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	};


	/** @type {object} Workbook */
	var wb = {SheetNames:[], Sheets:{}};

	// Check overwrite flag
	if(opts.sourcefilename) {
		alasql.utils.loadBinaryFile(opts.sourcefilename,!!cb,function(data){
			wb = XLSX.read(data,{type:'binary'});
			doExport();
        });		
	} else {
		doExport();
	};

	/* Return result */
	if(cb) res = cb(res);
	return res;

	/**
		Export workbook
		@function 
	*/
	function doExport() {

		/* 
			If opts is array of arrays then this is a 
			multisheet workboook, else it is a singlesheet
		*/
		if(typeof opts == 'object' && opts instanceof Array) {
			if(data && data.length > 0) {
				data.forEach(function(dat,idx){
					prepareSheet(opts[idx],dat,undefined,idx+1)
				});
			}
		} else {
			prepareSheet(opts,data,columns,{},1);
		}

		saveWorkbook(cb);

	}


	/** 
		Prepare sheet
		@params {object} opts 
		@params {array} data 
		@params {array} columns Columns
	*/
	function prepareSheet(opts, data, columns, idx) {

//console.log(82,arguments);

		/** Default options for sheet */
		var opt = {sheetid:'Sheet'+idx,headers:true};
		alasql.utils.extend(opt, opts);

		// Generate columns if they are not defined
		if((!columns || columns.length == 0) && data.length > 0) {
			columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
		}

		var cells = {};

		if(wb.SheetNames.indexOf(opt.sheetid) > -1) {
			cells = wb.Sheets[opt.sheetid];
		} else {
			wb.SheetNames.push(opt.sheetid);
			wb.Sheets[opt.sheetid] = {};
			cells = wb.Sheets[opt.sheetid];			
		}

		var range = "A1";
		if(opt.range) range = opt.range;

		var col0 = alasql.utils.xlscn(range.match(/[A-Z]+/)[0]);
		var row0 = +range.match(/[0-9]+/)[0]-1;

		if(wb.Sheets[opt.sheetid]['!ref']) {
			var rangem = wb.Sheets[opt.sheetid]['!ref'];
			var colm = alasql.utils.xlscn(rangem.match(/[A-Z]+/)[0]);
			var rowm = +rangem.match(/[0-9]+/)[0]-1;
		} else {
			var colm = 1, rowm = 1;
		}
		var colmax = Math.max(col0+columns.length,colm);
		var rowmax = Math.max(row0+data.length+2,rowm);

//		console.log(col0,row0);
		var i = row0+1;

		wb.Sheets[opt.sheetid]['!ref'] = 'A1:'+alasql.utils.xlsnc(colmax)+(rowmax);
//		var i = 1;

		if(opt.headers) {
			columns.forEach(function(col, idx){
				cells[alasql.utils.xlsnc(col0+idx)+""+i] = {v:col.columnid};
			});
			i++;
		}

		for(var j=0;j<data.length;j++) {
			columns.forEach(function(col, idx){
				var cell = {v:data[j][col.columnid]};
				if(typeof data[j][col.columnid] == 'number') {
					cell.t = 'n';
				} else if(typeof data[j][col.columnid] == 'string') {
					cell.t = 's';
				} else if(typeof data[j][col.columnid] == 'boolean') {				
					cell.t = 'b';
				} else if(typeof data[j][col.columnid] == 'object') {
					if(data[j][col.columnid] instanceof Date) {
						cell.t = 'd';
					}
				}
				cells[alasql.utils.xlsnc(col0+idx)+""+i] = cell;
			});		
			i++;
		}

	}

	/** 
		Save Workbook
		@params {array} wb Workbook 
		@params {callback} cb Callback
	*/
	function saveWorkbook(cb) {

//console.log(wb);

		if(typeof filename == 'undefined') {
			res = wb;
		} else {
			if(typeof exports == 'object') {
				/* For Node.js */
				XLSX.writeFile(wb, filename);
			} else {
				/* For browser */
				var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
				var wbout = XLSX.write(wb,wopts);

				function s2ab(s) {
				  var buf = new ArrayBuffer(s.length);
				  var view = new Uint8Array(buf);
				  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				  return buf;
				}

				/* the saveAs call downloads a file on the local machine */
		//		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), '"'+filename+'"')
		//		saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), filename)
		//		saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.ms-excel"}), '"'+filename+'"');
				if(isIE() == 9) {
					throw new Error('Cannot save XLSX files in IE9. Please use XLS() export function');
//					var URI = 'data:text/plain;charset=utf-8,';

		/** @todo Check if this code is required */

/*
					var testlink = window.open("about:blank", "_blank");
					var s = '';
					for(var i=0,ilen=wbout.length;i<ilen;i++) {
						var ch = wbout.charCodeAt(i);
						if(i<20) console.log('&#'+ch+';');
						s += '&#x'+ch.toString(16)+';';
					};
					testlink.document.write(s); //fileData has contents for the file
					testlink.document.close();
					testlink.document.execCommand('SaveAs', false, filename);
					testlink.close();         		
*/
//					alert('ie9');
				} else {
					saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename);
				}
			}

		}

		// data.forEach(function(d){
		// 	s += columns.map(function(col){
		// 		return d[col.columnid];
		// 	}).join(opts.separator)+'\n';	
		// });
		// alasql.utils.saveFile(filename,s);

	};
};
alasql.ZipWriter = function () {

	/**
		@type {object} Entries for ZIP file
	*/
	var entries = [];


	/** 
		Calculate CRC32
		@function
		@param {array} buf Data buffer
		@return {number}
	*/

	function calculateCrc32(buf) {
		var CRC_TABLE = [
			0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419,
			0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4,
			0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07,
			0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de,
			0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856,
			0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
			0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4,
			0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
			0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3,
			0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a,
			0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599,
			0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
			0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190,
			0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f,
			0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e,
			0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
			0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed,
			0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
			0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3,
			0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2,
			0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a,
			0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5,
			0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010,
			0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
			0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17,
			0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6,
			0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615,
			0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8,
			0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344,
			0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
			0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a,
			0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
			0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1,
			0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c,
			0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef,
			0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
			0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe,
			0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31,
			0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c,
			0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
			0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b,
			0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
			0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1,
			0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c,
			0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278,
			0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7,
			0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66,
			0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
			0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605,
			0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8,
			0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b,
			0x2d02ef8d
		];

		var crc = ~0;
		for (var ix = 0; ix < buf.length; ix++) {
			var offset = (crc ^ buf[ix]) & 0xFF;
			crc = (crc >>> 8) ^ CRC_TABLE[offset];
		}

		return crc ^ -1;
	}


	/**
		Pack data in the buffer
		@function
		@param {array} items
		@return {string}
	*/

	function pack(items) {
		var data = arguments, idx = 0, buffer, bufferSize = 0;

		// Calculate buffer size
		items = items.split('');
		items.forEach(function(type) {
			if (type == 'v') {
				bufferSize += 2;
			} else if (type == 'V' || type == 'l') {
				bufferSize += 4;
			}
		});

		// Fill buffer
		buffer = new Buffer(bufferSize);
		items.forEach(function(type, index) {
			if (type == 'v') {
				buffer.writeUInt16LE(data[index + 1], idx);
				idx += 2;
			} else if (type == 'V') {
				buffer.writeUInt32LE(data[index + 1], idx);
				idx += 4;
			} else if (type == 'l') {
				buffer.writeInt32LE(data[index + 1], idx);
				idx += 4;
			}
		});

		return buffer;
	}

	function normalizeZipPath(zipPath) {
		return zipPath.replace(/\\/g, '/').replace(/^\/|\/$/g, '');
	}

	this.addEntry = function(entry) {
		entry.path = normalizeZipPath(entry.path);
		entries.push(entry);
	};

	// this.addFile = function(zipPath, localPath) {
	// 	this.addEntry({
	// 		path: zipPath,
	// 		file: localPath
	// 	});
	// };

	this.addDir = function(zipPath, localPath) {
		this.addEntry({
			path: zipPath,
			file: localPath,
			isFile: false
		});
	};

	this.addData = function(zipPath, data) {
		if (!Buffer.isBuffer(data)) {
			data = new Buffer(data);
		}

		this.addEntry({
			path: zipPath,
			data: data
		});
	};

	function buildZipBuffer() {
		var buffers = [];
		var length = 0;

		function append(buf) {
			if (typeof(buf) == "string") {
				buf = new Buffer(buf);
			}

			buffers.push(buf);
			length += buf.length;
		}

		entries.forEach(function(entry) {
			var mtime, mdate;

			entry.extra = entry.extra || "";
			entry.comment = entry.comment || "";
//			entry.cmethod = entry.csize > 0 ? 0x0008 : 0; // Deflate/Store
			entry.cmethod = 0; // Deflate/Store
			mtime = entry.mtime;
			mdate = entry.mdate;

			// Convert unix time to dos time
			if (entry.mtime instanceof Date) {
				mtime = entry.mtime.getHours();
				mtime = mtime << 6;
				mtime = mtime | entry.mtime.getMinutes();
				mtime = mtime << 5;
				mtime = mtime | entry.mtime.getSeconds() / 2;

				mdate = entry.mtime.getFullYear() - 1980;
				mdate = mdate << 4;
				mdate = mdate | (entry.mtime.getMonth() + 1);
				mdate = mdate << 5;
				mdate = mdate | entry.mtime.getDate();
			}

			// Setup filename
			var fileName = entry.path;

			if (!entry.isFile && fileName.charAt(fileName.length - 1) != '/') {
				entry.path = fileName = fileName + "/";
			}

			entry.offset = length;

			// Write local file header
			append(pack("VvvvvvlVVvv",
				0x04034b50,        // Local File Header Signature
				0x0014,            // Version needed to extract
				0x0002,            // General purpose bit flag
				entry.cmethod,     // Compression method (deflate)
				mtime,             // Last mod file time (MS-DOS)
				mdate,             // Last mod file date (MS-DOS)
				entry.crc32,       // CRC-32
				entry.csize,       // Compressed size
				entry.size,        // Uncompressed size
				fileName.length,   // Filename length
				entry.extra.length // Extra field length
			));

			// Write variable data
			append(fileName);
			append(entry.extra);
			append(entry.data);

			entry.mtime = mtime;
			entry.mdate = mdate;
			entry.eattr = entry.isFile ? 0x00000020 : 0x00000030;
		});

		var startOffset = length;
		var centralDirSize = 0;

		// Write central directory information
		entries.forEach(function(entry) {
			// Add central directory file header
			append(pack("VvvvvvvlVVvvvvvVV",
				0x02014b50,           // Central file header signature
				0x0014,               // Version made by
				0x0014,               // Version extracted
				0x0002,               // General purpose bit flag
				entry.cmethod,        // Compression method (deflate)
				entry.mtime,          // Last mod file time (MS-DOS)
				entry.mdate,          // Last mod file date (MS-DOS)
				entry.crc32,          // CRC-32
				entry.csize,          // Compressed size
				entry.size,           // Uncompressed size
				entry.path.length,    // Filename length
				entry.extra.length,   // Extra field length
				entry.comment.length, // Comment length
				0,                    // Disk
				0,                    // Internal file attributes
				entry.eattr,          // External file attributes
				entry.offset          // Relative offset of local file header
			));

			// Write filename, extra field and comment
			append(entry.path);
			append(entry.extra);
			append(entry.comment);

			// Central directory info size + file name length + extra field length + comment length
			centralDirSize += 46 + entry.path.length + entry.extra.length + entry.comment.length;
		});

		var comment = "";

		// Write end of central directory record
		append(pack("VvvvvVVv",
			0x06054b50,       // End of central directory signature
			0,                // Number of this disk
			0,                // Disk where central directory starts
			entries.length,   // Number of central directory records on this disk
			entries.length,   // Total number of central directory records
			centralDirSize,   // Size of central directory (bytes)
			startOffset,      // Offset of start of central directory, relative to start of archive
			comment.length    // Zip file comment length
		));

		// Write comment
		append(comment);

		var buffer = Buffer.concat(buffers);
		return buffer;
	}

	this.toBuffer = function(callback) {
		var index = -1;

		function deflateNext() {
			var data;

			var entry = entries[++index];
			if (entry)  {
				entry.csize = entry.size = entry.crc32 = 0;

				data = entry.data = entry.data ? entry.data : new Buffer(0);

				// if (entry.file) {
				// 	var stats = fs.statSync(entry.file);
				// 	entry.mtime = stats.mtime;

				// 	if (stats.isFile()) {
				// 		data = fs.readFileSync(entry.file);
				// 	}
				// } else {
					entry.mtime = new Date();
				// }

				if (entry.isFile !== false) {
					entry.crc32 = calculateCrc32(data);
					entry.isFile = true;
					entry.size = data.length;



					// zlib.deflateRaw(data, function(err, buf) {
					// 	entry.data = buf;
						entry.csize = entry.size;

						deflateNext();
					// });
				} else {
					deflateNext();
				}
			} else {
				callback(buildZipBuffer());
			}
		}

		deflateNext();
	};

	// this.saveAs = function(filePath, callback) {
	// 	this.toBuffer(function(buf) {
	// 		fs.writeFile(filePath, buf, callback);
	// 	});
	// };
}

//module.exports.ZipWriter = ZipWriter;

/*
//
// FROM functions Alasql.js
// Date: 11.12.2014
// (c) 2014, Andrey Gershun
//
*/

/**
   Meteor
*/

alasql.from.METEOR = function(filename, opts, cb, idx, query) {
   var res = filename.find(opts).fetch();
   if(cb) res = cb(res, idx, query);
    return res;
 };

/**
	Google Spreadsheet reader
 */
alasql.from.TABLETOP = function(key, opts, cb, idx, query) {
	var res = [];

	var opt = {headers:true, simpleSheet:true, key:key};
	alasql.utils.extend(opt, opts);
	opt.callback = function(data){
		res = data;
		if(cb) res = cb(res, idx, query);
	};

	Tabletop.init(opt);
	return res;
};


alasql.from.HTML = function(selector, opts, cb, idx, query) {
	var opt = {};
	alasql.utils.extend(opt, opts);

	var sel = document.querySelector(selector);
	if(!sel && sel.tagName != "TABLE") {
		throw new Error('Selected HTML element is not a TABLE');
	};	

	var res = [];
	var headers = opt.headers;

	if(headers && !(headers instanceof Array)) {
		headers = [];
		var ths = sel.querySelector("thead tr").children;
		for(var i=0;i<ths.length;i++){
			if(!(ths.item(i).style && ths.item(i).style.display == "none" && opt.skipdisplaynone)) {
				headers.push(ths.item(i).textContent);
			} else {
				headers.push(undefined);
			}
		}
	}
//	console.log(headers);

	var trs = sel.querySelectorAll("tbody tr");

	for(var j=0;j<trs.length;j++) {
		var tds = trs.item(j).children;
		var r = {};
		for(var i=0;i<tds.length;i++){
			if(!(tds.item(i).style && tds.item(i).style.display == "none" && opt.skipdisplaynone)) {
				if(headers) {
					r[headers[i]] = tds.item(i).textContent;
				} else {
					r[i] = tds.item(i).textContent;
	//				console.log(r);
				}
			}
		}
		res.push(r);
	}
//console.log(res);
	if(cb) res = cb(res, idx, query);
	return res;
}


alasql.from.RANGE = function(start, finish, cb, idx, query) {
	var res = [];
	for(i=start;i<=finish;i++) res.push(i);
//	res = new alasql.Recordset({data:res,columns:{columnid:'_'}});	
	if(cb) res = cb(res, idx, query);
	return res;
}

// Read data from any file
alasql.from.FILE = function(filename, opts, cb, idx, query) {
	if(typeof filename == 'string') {
		fname = filename;
	} else if(filename instanceof Event) {
		fname = filename.target.files[0].name;
	} else {
		throw new Error("Wrong usage of FILE() function");
	}
	var parts = fname.split('.');
//	console.log("parts",parts,parts[parts.length-1]);
	var ext = parts[parts.length-1].toUpperCase();
//	console.log("ext",ext);
	if(alasql.from[ext]) {
//		console.log(ext);
		return alasql.from[ext](filename, opts, cb, idx, query);
	} else {
		throw new Error('Cannot recognize file type for loading');
	}
};


// Read JSON file

alasql.from.JSON = function(filename, opts, cb, idx, query) {
	var res;
	//console.log('cb',cb);
//console.log('JSON');
	alasql.utils.loadFile(filename,!!cb,function(data){
//		console.log('DATA:'+data);
//		res = [{a:1}];
		res = JSON.parse(data);	
		if(cb) res = cb(res, idx, query);
	});
	return res;
};

alasql.from.TXT = function(filename, opts, cb, idx, query) {
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = data.split(/\r?\n/);
		for(var i=0, ilen=res.length; i<ilen;i++) {
			if(res[i] == +res[i]) res[i] = +res[i];
			res[i] = [res[i]];
		}
		if(cb) res = cb(res, idx, query);
	});
	return res;
};

alasql.from.TAB = alasql.from.TSV = function(filename, opts, cb, idx, query) {
	if(!opts) opts = {};
	opts.separator = '\t';
	return alasql.from.CSV(filename, opts, cb, idx, query);
};

alasql.from.CSV = function(filename, opts, cb, idx, query) {
	var opt = {
		separator: ',',
		quote: '"'
	};
	alasql.utils.extend(opt, opts);
	var res;
	alasql.utils.loadFile(filename,!!cb,function(text){

		var delimiterCode = opt.separator.charCodeAt(0);
		var quoteCode = opt.quote.charCodeAt(0);

      	var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
	      function token() {
	        if (I >= N) return EOF;
	        if (eol) return eol = false, EOL;
	        var j = I;
	        if (text.charCodeAt(j) === quoteCode) {
	          var i = j;
	          while (i++ < N) {
	            if (text.charCodeAt(i) === quoteCode) {
	              if (text.charCodeAt(i + 1) !== quoteCode) break;
	              ++i;
	            }
	          }
	          I = i + 2;
	          var c = text.charCodeAt(i + 1);
	          if (c === 13) {
	            eol = true;
	            if (text.charCodeAt(i + 2) === 10) ++I;
	          } else if (c === 10) {
	            eol = true;
	          }
	          return text.substring(j + 1, i).replace(/""/g, '"');
	        }
	        while (I < N) {
	          var c = text.charCodeAt(I++), k = 1;
	          if (c === 10) eol = true; else if (c === 13) {
	            eol = true;
	            if (text.charCodeAt(I) === 10) ++I, ++k;
	          } else if (c !== delimiterCode) continue;
	          return text.substring(j, I - k);
	        }
	        return text.substring(j);
	      }

	      while ((t = token()) !== EOF) {
	        var a = [];
	        while (t !== EOL && t !== EOF) {
	          a.push(t);
	          t = token();
	        }

	        if(opt.headers) {
	        	if(n == 0) {
					if(typeof opt.headers == 'boolean') {
		        		hs = a;
					} else if(opt.headers instanceof Array) {
						hs = opt.headers;
		        		var r = {};
		        		hs.forEach(function(h,idx){
		        			r[h] = a[idx];
							if((typeof r[h] != 'undefined') && (r[h]).trim() == +r[h]) r[h] = +r[h];
		        		});
						rows.push(r);
					}

	        	} else {
	        		var r = {};
	        		hs.forEach(function(h,idx){
	        			r[h] = a[idx];
						if((typeof r[h] != 'undefined') && r[h].trim() == +r[h]) r[h] = +r[h];
	        		});
	        		rows.push(r);
	        	}
	        	n++;
	        } else {
	    	    rows.push(a);
	    	}
	      }

	      res = rows;

		if(opt.headers) {
			if(query && query.sources && query.sources[idx]) {
				var columns = query.sources[idx].columns = [];
				hs.forEach(function(h){
					columns.push({columnid:h});
				});
			};
		};

/*
if(false) {
		res = data.split(/\r?\n/);
		if(opt.headers) {
			if(query && query.sources && query.sources[idx]) {
				var hh = [];
				if(typeof opt.headers == 'boolean') {
					hh = res.shift().split(opt.separator);
				} else if(opt.headers instanceof Array) {
					hh = opt.headers;
				}
				var columns = query.sources[idx].columns = [];
				hh.forEach(function(h){
					columns.push({columnid:h});
				});
				for(var i=0, ilen=res.length; i<ilen;i++) {
					var a = res[i].split(opt.separator);
					var b = {};
					hh.forEach(function(h,j){
						b[h] = a[j];
					});
					res[i] = b;
				}
//				console.log(res[0]);
			}	
		} else {
			for(var i=0, ilen=res.length; i<ilen;i++) {
				res[i] = res[i].split(opt.separator);
			}
		}

};
*/
		if(cb) res = cb(res, idx, query);
	});
	return res;
};


alasql.from.XLS = function(filename, opts, cb, idx, query) {
	if(typeof exports === 'object') {
		var X = require('xlsjs');
	} else {
		var X = window.XLS;
		if(!X) {
			throw new Error('XLS library is not attached');
		}
	}
	return XLSXLSX(X,filename, opts, cb, idx, query);
};

alasql.from.XLSX = function(filename, opts, cb, idx, query) {
	if(typeof exports === 'object') {
		var X = require('xlsx');
	} else {
		var X = window.XLSX;
		if(!X) {
			throw new Error('XLSX library is not attached');
		}
	}
	return XLSXLSX(X,filename, opts, cb, idx, query);
};

function XLSXLSX(X,filename, opts, cb, idx, query) {
	var opt = {};
	if(!opts) opts = {};
	alasql.utils.extend(opt, opts);
	var res;

	alasql.utils.loadBinaryFile(filename,!!cb,function(data){

//	function processData(data) {
		var workbook = X.read(data,{type:'binary'});
//		console.log(workbook);
		var sheetid;
		if(typeof opt.sheetid == 'undefined') {
			sheetid = workbook.SheetNames[0];
		} else {
			sheetid = opt.sheetid;
		};
		var range;
		if(typeof opt.range == 'undefined') {
			range = workbook.Sheets[sheetid]['!ref'];
		} else {
			range = opt.range;
			if(workbook.Sheets[sheetid][range]) range = workbook.Sheets[sheetid][range];
		};
		var rg = range.split(':');
		var col0 = rg[0].match(/[A-Z]+/)[0];
		var row0 = +rg[0].match(/[0-9]+/)[0];
		var col1 = rg[1].match(/[A-Z]+/)[0];
		var row1 = +rg[1].match(/[0-9]+/)[0];
//		console.log(114,rg,col0,col1,row0,row1);
//		console.log(114,rg,alasql.utils.xlscn(col0),alasql.utils.xlscn(col1));

		var hh = {};
		for(var j=alasql.utils.xlscn(col0);j<=alasql.utils.xlscn(col1);j++){
			var col = alasql.utils.xlsnc(j);
			if(opt.headers) {
				if(workbook.Sheets[sheetid][col+""+row0]) {
					hh[col] = workbook.Sheets[sheetid][col+""+row0].v;
				} else {
					hh[col] = col;
				}
			} else {
				hh[col] = col;
			}
		}
		var res = [];
		if(opt.headers) row0++;
		for(var i=row0;i<=row1;i++) {
			var row = {};
			for(var j=alasql.utils.xlscn(col0);j<=alasql.utils.xlscn(col1);j++){
				var col = alasql.utils.xlsnc(j);
				if(workbook.Sheets[sheetid][col+""+i]) {
					row[hh[col]] = workbook.Sheets[sheetid][col+""+i].v;
				}
			}
			res.push(row);
		}

		if(cb) res = cb(res, idx, query);
	}, function(err){
		throw err;
	});

	return res;
};





alasql.from.XML = function(filename, opts, cb, idx, query) {
  var res;
  //console.log('cb',cb);
//console.log('JSON');
  alasql.utils.loadFile(filename,!!cb,function(data){
//    console.log('DATA:'+data);
//    res = [{a:1}];

    res = xmlparse(data).root; 
//    console.log(res);
    if(cb) res = cb(res, idx, query);
  });
  return res;
};

/**
 * Parse the given string of `xml`.
 *
 * @param {String} xml
 * @return {Object}
 * @api public
 */

function xmlparse(xml) {
  xml = xml.trim();

  // strip comments
  xml = xml.replace(/<!--[\s\S]*?-->/g, '');

  return document();

  /**
   * XML document.
   */

  function document() {
    return {
      declaration: declaration(),
      root: tag()
    }
  }

  /**
   * Declaration.
   */

  function declaration() {
    var m = match(/^<\?xml\s*/);
    if (!m) return;

    // tag
    var node = {
      attributes: {}
    };

    // attributes
    while (!(eos() || is('?>'))) {
      var attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    match(/\?>\s*/);

    return node;
  }

  /**
   * Tag.
   */

  function tag() {
    var m = match(/^<([\w-:.]+)\s*/);
    if (!m) return;

    // name
    var node = {
      name: m[1],
      attributes: {},
      children: []
    };

    // attributes
    while (!(eos() || is('>') || is('?>') || is('/>'))) {
      var attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    // self closing tag
    if (match(/^\s*\/>\s*/)) {
      return node;
    }

    match(/\??>\s*/);

    // content
    node.content = content();

    // children
    var child;
    while (child = tag()) {
      node.children.push(child);
    }

    // closing
    match(/^<\/[\w-:.]+>\s*/);

    return node;
  }

  /**
   * Text content.
   */

  function content() {
    var m = match(/^([^<]*)/);
    if (m) return m[1];
    return '';
  }

  /**
   * Attribute.
   */

  function attribute() {
    var m = match(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
    if (!m) return;
    return { name: m[1], value: strip(m[2]) }
  }

  /**
   * Strip quotes from `val`.
   */

  function strip(val) {
    return val.replace(/^['"]|['"]$/g, '');
  }

  /**
   * Match `re` and advance the string.
   */

  function match(re) {
    var m = xml.match(re);
    if (!m) return;
    xml = xml.slice(m[0].length);
    return m;
  }

  /**
   * End-of-source.
   */

  function eos() {
    return 0 == xml.length;
  }

  /**
   * Check for `prefix`.
   */

  function is(prefix) {
    return 0 == xml.indexOf(prefix);
  }
};

alasql.from.GEXF = function(filename, opts, cb, idx, query) {

	var res;
	alasql('SEARCH FROM XML('+filename+')',[],function(data){
		res = data;
		console.log(res);
		if(cb) res=cb(res);
	});
  return res;
};

/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Help = function (params) { return yy.extend(this, params); }
yy.Help.prototype.toString = function() {
	var s = K('HELP');
	if(this.subject) s += ' '+L(this.subject);
	return s;
}

// Help string
helpdocs = [
	{command:'ALTER TABLE table RENAME TO table'},
	{command:'ALTER TABLE table ADD COLUMN column coldef'},
	{command:'ALTER TABLE table MODIFY COLUMN column coldef'},
	{command:'ALTER TABLE table RENAME COLUMN column TO column'},
	{command:'ALTER TABLE table DROP column'},
	{command:'ATTACH engine DATABASE database'},
	{command:'ASSERT value'},
	{command:'BEGIN [TRANSACTION]'},
	{command:'COMMIT [TRANSACTION]'},
	{command:'CREATE [engine] DATABASE [IF NOT EXISTS] database'},
	{command:'CREATE TABLE [IF NOT EXISTS] table (column definitions)'},
	{command:'DELETE FROM table [WHERE expression]'},
	{command:'DETACH DATABASE database'},
	{command:'DROP [engine] DATABASE [IF EXISTS] database'},
	{command:'DROP TABLE [IF EXISTS] table'},
	{command:'INSERT INTO table VALUES value,...'},
	{command:'INSERT INTO table DEFAULT VALUES'},
	{command:'INSERT INTO table SELECT select'},
	{command:'HELP [subject]'},
	{command:'ROLLBACK [TRANSACTION]'},
	{command:'SELECT [modificator] columns [INTO table] [FROM table,...] [[mode] JOIN [ON] [USING]] [WHERE ] [GROUP BY] [HAVING] [ORDER BY] '},
	{command:'SET option value'},
	{command:'SHOW [engine] DATABASES'},
	{command:'SHOW TABLES'},
	{command:'SHOW CREATE TABLE table'},
	{command:'UPDATE table SET column1 = expression1, ... [WHERE expression]'},
	{command:'USE [DATABASE] database'},
	{command:'expression'},
	{command:'See also <a href="http://github/agershun/alasq">http://github/agershun/alasq</a> for more information'}
];

// execute
yy.Help.prototype.execute = function (databaseid, params, cb) {
	var ss = [];
	if(!this.subject) {
		ss = helpdocs;
	} else {
		ss.push('See also <a href="http://github/agershun/alasq">http://github/agershun/alasq</a> for more information');
	}
	if(cb) ss = cb(ss);
	return ss;
};

/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
	Print statement 
	@class
	@param {object} params Initial setup properties
*/

yy.Print = function (params) { return yy.extend(this, params); }

/** 
	Generate SQL string 
	@this Print statement object
*/
yy.Print.prototype.toString = function() {
	var s = K('PRINT');
	if(this.statement) s += ' '+this.statement.toString();
	return s;
}


/**
 	Print result of select statement or expression
 	@param {string} databaseid Database identificator
 	@param {object} params Query parameters
 	@param {statement-callback} cb Callback function 
	@this Print statement object
*/
yy.Print.prototype.execute = function (databaseid,params,cb) {
//	console.log(this.url);
	var self = this;
	var res = 1;
//console.log(this);
	alasql.precompile(this,databaseid,params);  /** @todo Change from alasql to this */

	if(this.exprs && this.exprs.length >0) {
		var rs = this.exprs.map(function(expr){

//			console.log('var y;return '+expr.toJavaScript('({})','', null));
			var exprfn =  new Function("params,alasql,p",'var y;return '+expr.toJavaScript('({})','', null)).bind(self);
			var r = exprfn(params,alasql);
			return JSONtoString(r);
		});
		console.log.apply(console,rs);
	} else if(this.select) {
		var r = this.select.execute(databaseid,params);
		console.log(JSONtoString(r));
	} else {
		console.log();
	}

	if(cb) res = cb(res);
	return res;
};

/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Source = function (params) { return yy.extend(this, params); }
yy.Source.prototype.toString = function() {
	var s = K('SOURCE');
	if(this.url) s += ' '+S('\''+this.url+'\'');
	return s;
}

// SOURCE FILE
yy.Source.prototype.execute = function (databaseid,params,cb) {
//	console.log(this.url);
	var res;
	loadFile(this.url, !!cb, function(data){
//		console.log(data);
//		res = 1;
		res = alasql(data);
		if(cb) res = cb(res);
		return res;
	}, function(err){
		throw err;
	});
	return res;
};

/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Require = function (params) { return yy.extend(this, params); }
yy.Require.prototype.toString = function() {
	var s = K('REQUIRE');
	if(this.paths && this.paths.length > 0) {
		s += this.paths.map(function(path){
			return path.toString()
		}).join(',');
	}
	if(this.plugins && this.plugins.length > 0) {
		s += this.plugins.map(function(plugin){
			return plugin.toUpperCase();
		}).join(',');
	}
	return s;
}

/**
 Attach plug-in for Alasql
 */
yy.Require.prototype.execute = function (databaseid,params,cb) {
	var self = this;
	var res = 0;
	var ss = '';
//	console.log(this.paths);
	if(this.paths && this.paths.length > 0) {
		this.paths.forEach(function(path){
			loadFile(path.value, !!cb, function(data){
				res++;
//				console.log(res,self.paths.length);
//				console.log(data);
				ss += data;
				if(res<self.paths.length) return;

//				console.log(ss);
				new Function("params,alasql",ss)(params,alasql);
				if(cb) res = cb(res);
			});
		});
	} else if(this.plugins && this.plugins.length > 0) {

		this.plugins.forEach(function(plugin){
			// If plugin is not loaded already
			if(!alasql.plugins[plugin]) {
				loadFile(alasql.path+'/alasql-'+plugin.toLowerCase()+'.js', !!cb, function(data){
					// Execute all plugins at the same time
					res++;
					ss += data;
					if(res<self.plugins.length) return;

					new Function("params,alasql",ss)(params,alasql);
					alasql.plugins[plugin] = true; // Plugin is loaded
					if(cb) res = cb(res);
				});
			}
		});
	} else {
		if(cb) res = cb(res);			
	} 
	return res;
};

/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Assert = function (params) { return yy.extend(this, params); }
yy.Source.prototype.toString = function() {
	var s = K('ASSERT');
	if(this.value) s += ' '+JSON.stringify(this.value);
	return s;
}

// SOURCE FILE
yy.Assert.prototype.execute = function (databaseid) {
//	console.log(alasql.res, this.value);
	if(!deepEqual(alasql.res,this.value)) {
//		if(this.message) {
//			throw this.
//		} else {
			throw new Error((this.message||'Assert wrong')+': '+JSON.stringify(alasql.res)+' == '+JSON.stringify(this.value));
//		}
	}
	return 1;
};

//
// 91websql.js
// WebSQL database support
// (c) 2014, Andrey Gershun
//

var WEBSQL = alasql.engines.WEBSQL = function (){};

WEBSQL.createDatabase = function(wdbid, args, dbid, cb){
	var res = 1;
	var wdb = openDatabase(wdbid, args[0], args[1], args[2]);
	if(this.dbid) {
		var db = alasql.createDatabase(this.dbid);
		db.engineid = 'WEBSQL';
		db.wdbid = wdbid;
		sb.wdb = db;
	}
	if(!wdb) {
		throw new Error('Cannot create WebSQL database "'+databaseid+'"')
	}
	if(cb) cb(res);
	return res;
};

WEBSQL.dropDatabase = function(databaseid){
	throw new Error('This is impossible to drop WebSQL database.');
};

WEBSQL.attachDatabase = function(databaseid, dbid, args, params, cb){
	var res = 1;
	if(alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "'+dbid+'" because it already exists');
	};
	alasqlopenDatabase(databaseid, args[0], args[1], args[2]);
	return res;
}



//
// 91indexeddb.js
// AlaSQL IndexedDB module
// Date: 18.04.2015
// (c) Andrey Gershun
//


 if(typeof window !='undefined' && typeof window.indexedDB != 'undefined') {

var IDB = alasql.engines.INDEXEDDB = function (){};

// For Chrome it work normally, for Firefox - simple shim
if(typeof window.indexedDB.webkitGetDatabaseNames == 'function') {
	IDB.getDatabaseNames = window.indexedDB.webkitGetDatabaseNames.bind(window.indexedDB);
} else {
	IDB.getDatabaseNames = function () {
		var request = {};
		var result = {
			contains:function(name){
				return true; // Always return true
			},
			notsupported: true
		};
		setTimeout(function(){
			var event = {target:{result:result}}
			request.onsuccess(event);
		},0);
		return request;
	};
	IDB.getDatabaseNamesNotSupported = true;
}

//
// SHOW DATABASES
// work only in chrome
//
IDB.showDatabases = function(like,cb) {
	// console.log('showDatabases',arguments);
	var request = IDB.getDatabaseNames();
	request.onsuccess = function(event) {
		var dblist = event.target.result;
		if(IDB.getDatabaseNamesNotSupported) {
			throw new Error('SHOW DATABASE is not supported in this browser');
		}
		var res = [];
		if(like) {
			var relike = new RegExp((like.value).replace(/\%/g,'.*'),'g');
		}
		for(var i=0;i<dblist.length;i++) {
			if(!like || dblist[i].match(relike)) {
				res.push({databaseid: dblist[i]});
			}
		};
		cb(res);
	};
};

IDB.createDatabase = function(ixdbid, args, ifnotexists, dbid, cb){
console.log(arguments);
	if(ifnotexists) {
		var request2 = window.indexedDB.open(ixdbid,1);
		request2.onsuccess = function(event) {
			event.target.result.close();
			cb(1);
		};
	} else {
		var request1 = window.indexedDB.open(ixdbid,1);
		request1.onupgradeneeded = function (e){
			console.log('abort');
		    e.target.transaction.abort();
		};
		request1.onsuccess = function(e) {
			console.log('success');
			if(ifnotexists) {
				cb(0);
			} else {
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');				
			}
		}
	}

/*	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(dblist.contains(ixdbid)){
			if(ifnotexists) {
				cb(0);
				return;
			} else {		
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');
			}
		};
*/
/*	};
*/	// }
};

IDB.createDatabase = function(ixdbid, args, ifnotexists, dbid, cb){
	if(IDB.getDatabaseNamesNotSupported) {
		// Hack for Firefox
		if(ifnotexists) {
//			console.log('ifnotexists');
			var dbExists = true;
			var request2 = window.indexedDB.open(ixdbid);
//			console.log(1);
			request2.onupgradeneeded = function (e){
//				console.log('abort');
				dbExists = false;
//			    e.target.transaction.abort();
//			    cb(0);				
			};
			request2.onsuccess = function(event) {
//				console.log('success');
//console.log(event.target.result);
				event.target.result.close();
				if(dbExists) {
					cb(0);
				} else {
					cb(1);
				}
			};
		} else {
//			console.log('without');
			var request1 = window.indexedDB.open(ixdbid);
			request1.onupgradeneeded = function (e){
			    e.target.transaction.abort();
			};
			request1.onabort = function(event) {
				cb(1);
			};
			request1.onsuccess = function(event) {
				event.target.result.close();
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');
//				cb(0);
			};

		}

	} else {
		var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function(event) {
			var dblist = event.target.result;
			if(dblist.contains(ixdbid)){
				if(ifnotexists) {
					cb(0);
					return;
				} else {		
					throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');
				}
			};

			var request2 = window.indexedDB.open(ixdbid,1);
			request2.onsuccess = function(event) {
				event.target.result.close();
				cb(1);
			};
		};		
	}
	// }
};


IDB.dropDatabase = function(ixdbid, ifexists, cb){
	var request1 = IDB.getDatabaseNames();
	request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			if(ifexists) {
				cb(0);
				return;
			} else {
				throw new Error('IndexedDB: Cannot drop new database "'+ixdbid+'" because it does not exist');
			}
		};
		var request2 = window.indexedDB.deleteDatabase(ixdbid);
		request2.onsuccess = function(event) {
//			console.log('dropped');
			if(cb) cb(1);
		}
	};
};

IDB.attachDatabase = function(ixdbid, dbid, args, params, cb) {
	var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot attach database "'+ixdbid+'" because it does not exist');
		};
		var request2 = window.indexedDB.open(ixdbid);
		request2.onsuccess = function(event) {
			var ixdb = event.target.result;
			var db = new alasql.Database(dbid || ixdbid);
			db.engineid = "INDEXEDDB";
			db.ixdbid = ixdbid;
			db.tables = [];
		  	var tblist = ixdb.objectStoreNames;
			for(var i=0;i<tblist.length;i++){
				db.tables[tblist[i]] = {};
			};

		// if(!alasql.options.autocommit) {
		// if(db.tables){
		// 	for(var tbid in db.tables) {
		// 		db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
		// 	}
		// 	}
		// }
			event.target.result.close();		
			cb(1);
		};
	};
};




IDB.createTable = function(databaseid, tableid, ifnotexists, cb) {
//	console.log(arguments);
	var ixdbid = alasql.databases[databaseid].ixdbid;
//	console.log(ixdbid);
	var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot create table in database "'+ixdbid+'" because it does not exist');
		};
		var request2 = window.indexedDB.open(ixdbid);
		request2.onversionchange = function(event) {
//			console.log('onversionchange');
			event.target.result.close();
		};
		request2.onsuccess = function(event) {
			var version = event.target.result.version;
			event.target.result.close();

			var request3 = window.indexedDB.open(ixdbid, version+1);
			request3.onupgradeneeded = function(event) {
				var ixdb = event.target.result;
//				console.log(ixdb);
				var store = ixdb.createObjectStore(tableid, {autoIncrement:true});
//				console.log(store);
			};
			request3.onsuccess = function(event) {
//				console.log('opened');
				event.target.result.close();
				cb(1);
			};
			request3.onerror = function(event){
				throw event;
//				console.log('error');
			}
			request3.onblocked = function(event){
				throw new Error('Cannot create table "'+tableid+'" because database "'+databaseid+'"  is blocked');
//				console.log('blocked');
			}				
		};
	};
};

IDB.dropTable = function (databaseid, tableid, ifexists, cb) {
	var ixdbid = alasql.databases[databaseid].ixdbid;

	var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
	
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot drop table in database "'+ixdbid+'" because it does not exist');
		};
		var request2 = window.indexedDB.open(ixdbid);
		request2.onversionchange = function(event) {
			event.target.result.close();
		};
		request2.onsuccess = function(event) {
			var version = event.target.result.version;
			event.target.result.close();

			var request3 = window.indexedDB.open(ixdbid, version+1);
			request3.onupgradeneeded = function(event) {
				var ixdb = event.target.result;
				if(ixdb.objectStoreNames.contains(tableid)) {
					ixdb.deleteObjectStore(tableid);
					delete alasql.databases[databaseid].tables[tableid];
				} else {
					if(!ifexists) {
						throw new Error('IndexedDB: Cannot drop table "'+tableid+'" because it is not exist');
					}
				}
//				var store = ixdb.createObjectStore(tableid);
				// console.log('deleted');
			};
			request3.onsuccess = function(event) {
				// console.log('opened');
				event.target.result.close();
				cb(1);
			};
			request3.onerror = function(event){
				throw event;
//				console.log('error');
			}
			request3.onblocked = function(event){
				throw new Error('Cannot drop table "'+tableid+'" because database "'+databaseid+'" is blocked');
//				console.log('blocked');
			}				
		};
	};
}

// IDB.intoTable = function(databaseid, tableid, value, cb) {
// //	console.log('intoTable',databaseid, tableid, value, cb);
// 	var ixdbid = alasql.databases[databaseid].ixdbid;
// 	var request1 = indexedDB.open(ixdbid);
// 	request1.onsuccess = function(event) {
// 		var ixdb = event.target.result;
// 		var tx = ixdb.transaction([tableid],"readwrite");
// 		var tb = tx.objectStore(tableid);
// 		// console.log(tb.keyPath);
// 		// console.log(tb.indexNames);
// 		// console.log(tb.autoIncrement);
// 		for(var i=0, ilen = value.length;i<ilen;i++) {
// 			tb.add(value[i]);
// 		};
// 		tx.oncomplete = function() {
// 			ixdb.close();
// //			console.log('indexeddb',203,ilen);
// 			cb(ilen);
// 		}
// 	};

// 	// var tb = LS.get(lsdbid+'.'+tableid);
// 	// if(!tb) tb = [];
// 	// tb = tb.concat(value);
// 	// LS.set(lsdbid+'.'+tableid, tb);
// //	console.log(lsdbid+'.'+tableid, tb);
// //	console.log(localStorage[lsdbid+'.'+tableid]);
// 	// if(cb) cb(res);
// 	// return res;
// };

IDB.intoTable = function(databaseid, tableid, value, columns, cb) {
	// console.log(arguments);
	// console.trace();
//	console.log('intoTable',databaseid, tableid, value, cb);
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request1 = window.indexedDB.open(ixdbid);
	request1.onsuccess = function(event) {
		var ixdb = event.target.result;
		var tx = ixdb.transaction([tableid],"readwrite");
		var tb = tx.objectStore(tableid);
		// console.log(tb.keyPath);
		// console.log(tb.indexNames);
		// console.log(tb.autoIncrement);
		for(var i=0, ilen = value.length;i<ilen;i++) {
			tb.add(value[i]);
		};
		tx.oncomplete = function() {
			ixdb.close();
//			console.log('indexeddb',203,ilen);
			cb(ilen);
		}
	};

	// var tb = LS.get(lsdbid+'.'+tableid);
	// if(!tb) tb = [];
	// tb = tb.concat(value);
	// LS.set(lsdbid+'.'+tableid, tb);
//	console.log(lsdbid+'.'+tableid, tb);
//	console.log(localStorage[lsdbid+'.'+tableid]);
	// if(cb) cb(res);
	// return res;
};


IDB.fromTable = function(databaseid, tableid, cb, idx, query){
	// console.log(arguments);
	// console.trace();
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = window.indexedDB.open(ixdbid);
	request.onsuccess = function(event) {
	  	var res = [];
	  	var ixdb = event.target.result;
//	  	console.log(444,ixdb, tableid, ixdbid);
	  	var tx = ixdb.transaction([tableid]);
	  	var store = tx.objectStore(tableid);
	  	var cur = store.openCursor();
//	  	console.log(cur);
	  	cur.onblocked = function(event) {
//	  		console.log('blocked');
	  	}
	  	cur.onerror = function(event) {
//	  		console.log('error');
	  	}
	  	cur.onsuccess = function(event) {
//	  		console.log('success');
		  	var cursor = event.target.result;
//		  		console.log(222,event);
//		  		console.log(333,cursor);
		  	if(cursor) {
		  		res.push(cursor.value);
		  		cursor.continue();
		  	} else {
//		  		console.log(555, res,idx,query);
		  		ixdb.close();
		  		cb(res, idx, query);
		  	}
	  	}
	}		
}

IDB.deleteFromTable = function(databaseid, tableid, wherefn,params, cb){
	// console.log(arguments);
	// console.trace();
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = window.indexedDB.open(ixdbid);
	request.onsuccess = function(event) {
	  	var res = [];
	  	var ixdb = event.target.result;
//	  	console.log(444,ixdb, tableid, ixdbid);
	  	var tx = ixdb.transaction([tableid], 'readwrite');
	  	var store = tx.objectStore(tableid);
	  	var cur = store.openCursor();
	  	var num = 0;
//	  	console.log(cur);
	  	cur.onblocked = function(event) {
//	  		console.log('blocked');
	  	}
	  	cur.onerror = function(event) {
//	  		console.log('error');
	  	}
	  	cur.onsuccess = function(event) {
//	  		console.log('success');
		  	var cursor = event.target.result;
//		  		console.log(222,event);
//		  		console.log(333,cursor);
		  	if(cursor) {
		  		if((!wherefn) || wherefn(cursor.value,params)) {
//		  		console.log(cursor);
		  			cursor.delete();
		  			num++;
		  		}
		  		cursor.continue();
		  	} else {
//		  		console.log(555, res,idx,query);
		  		ixdb.close();
		  		cb(num);
		  	}
	  	}
	}		
}

IDB.updateTable = function(databaseid, tableid, assignfn, wherefn, params, cb){
	// console.log(arguments);
	// console.trace();
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = window.indexedDB.open(ixdbid);
	request.onsuccess = function(event) {
	  	var res = [];
	  	var ixdb = event.target.result;
//	  	console.log(444,ixdb, tableid, ixdbid);
	  	var tx = ixdb.transaction([tableid], 'readwrite');
	  	var store = tx.objectStore(tableid);
	  	var cur = store.openCursor();
	  	var num = 0;
//	  	console.log(cur);
	  	cur.onblocked = function(event) {
//	  		console.log('blocked');
	  	}
	  	cur.onerror = function(event) {
//	  		console.log('error');
	  	}
	  	cur.onsuccess = function(event) {
//	  		console.log('success');
		  	var cursor = event.target.result;
//		  		console.log(222,event);
//		  		console.log(333,cursor);
		  	if(cursor) {
		  		if((!wherefn) || wherefn(cursor.value,params)) {
		  		//console.log(cursor);
		  			var r = cursor.value;
					assignfn(r,params);
				//	console.log('update 363',r);
		  			cursor.update(r);
		  			num++;
		  		}
		  		cursor.continue();
		  	} else {
//		  		console.log(555, res,idx,query);
		  		ixdb.close();
		  		cb(num);
		  	}
	  	}
	}		
}

// Skip
}

//
// 91localstorage.js
// localStorage and DOM-Storage engine
// Date: 09.12.2014
// (c) Andrey Gershun
//

var LS = alasql.engines.LOCALSTORAGE = function (){};

LS.get = function(key) {
	var s = localStorage.getItem(key);
	if(typeof s == "undefined") return;
	var v = undefined;
	try {
		v = JSON.parse(s); 
	} catch(err) {
		throw new Error('Cannot parse JSON '+s);
	}
	return v;
};

LS.set = function(key, value){
	if(typeof value == 'undefined') localStorage.removeItem(key);
	else localStorage.setItem(key,JSON.stringify(value)); 
}

LS.createDatabase = function(lsdbid, args, ifnotexists, dbid, cb){
	var res = 1;
	var ls = LS.get('alasql');
	if(!(ifnotexists && ls && ls.databases && ls.databases[lsdbid])) {
		if(!ls) ls = {databases:{}};
		if(ls.databases && ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot create new database "'+lsdbid+'" because it already exists');
		}
		ls.databases[lsdbid] = true;
		LS.set('alasql',ls);
		LS.set(lsdbid,{databaseid:lsdbid, tables:{}});
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};

LS.dropDatabase = function(lsdbid, ifexists, cb){
	var res = 1;
	var ls = LS.get('alasql');
	if(!(ifexists && ls && ls.databases && !ls.databases[lsdbid])) {
		if(!ls) {
			if(!ifexists) {
				throw new Error('There are no alasql databases in localStorage');
			} else {
				return 0;
			}
		};
//		console.log(999,ls.databases,ls.databases[lsdbid], lsdbid);	
		if(ls.databases && !ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot drop database "'+lsdbid+'" because there is no such database');
		}
		delete ls.databases[lsdbid];
		LS.set('alasql',ls);
		
		var db = LS.get(lsdbid);
		for(var tableid in db.tables) {
//			console.log('remove',lsdbid,tableid);
			localStorage.removeItem(lsdbid+'.'+tableid);
		}

		localStorage.removeItem(lsdbid);
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};


LS.attachDatabase = function(lsdbid, dbid, args, params, cb){
	var res = 1;
	if(alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "'+dbid+'" because it already exists');
	};
	var db = new alasql.Database(dbid || lsdbid);
	db.engineid = "LOCALSTORAGE";
	db.lsdbid = lsdbid;
	db.tables = LS.get(lsdbid).tables;
	// IF AUTOCOMMIT IS OFF then copy data to memory
	if(!alasql.options.autocommit) {
		if(db.tables){
			for(var tbid in db.tables) {
				db.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
			}
		}
	}
	if(cb) res = cb(res);
	return res;
};

LS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if(like) {
		var relike = new RegExp(like.value.replace(/\%/g,'.*'),'g');
	}
	if(ls && ls.databases) {
		for(dbid in ls.databases) {
			res.push({databaseid: dbid});
		};
		if(like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(relike);
			});
		}		
	};
	if(cb) cb(res);
	return res;
};

LS.createTable = function(databaseid, tableid, ifnotexists, cb) {
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var tb = LS.get(lsdbid+'.'+tableid);
	var res = 1;

	if(tb && !ifnotexists) {
		throw new Error('Table "'+tableid+'" alsready exists in localStorage database "'+lsdbid+'"');
	};
	var lsdb = LS.get(lsdbid);
	var table = alasql.databases[databaseid].tables[tableid];
	lsdb.tables[tableid] = {columns:table.columns};

	LS.set(lsdbid, lsdb);
	LS.set(lsdbid+'.'+tableid, []);

	if(cb) cb(res);
	return res;
}

LS.dropTable = function (databaseid, tableid, ifexists, cb) {
//	console.log(arguments);
	var res = 1;
	var lsdbid = alasql.databases[databaseid].lsdbid;
	if(alasql.options.autocommit) {
		var lsdb = LS.get(lsdbid);
	} else {
		var lsdb = alasql.databases[databaseid];
	}
	if(!ifexists && !lsdb.tables[tableid]) {
		throw new Error('Cannot drop table "'+tableid+'" in localStorage, because it does not exist');
	};
	delete lsdb.tables[tableid];
	LS.set(lsdbid, lsdb);
	localStorage.removeItem(lsdbid+'.'+tableid);
	if(cb) cb(res);
	return res;
}

LS.fromTable = function(databaseid, tableid, cb, idx, query) {
//	console.log(998, databaseid, tableid, cb);
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = LS.get(lsdbid+'.'+tableid);
	if(cb) res = cb(res, idx, query);
	return res;
};

LS.intoTable = function(databaseid, tableid, value, columns, cb) {
//	console.log('intoTable',databaseid, tableid, value, cb);
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = value.length;
	var tb = LS.get(lsdbid+'.'+tableid);
	if(!tb) tb = [];
	tb = tb.concat(value);
	LS.set(lsdbid+'.'+tableid, tb);
//	console.log(lsdbid+'.'+tableid, tb);
//	console.log(localStorage[lsdbid+'.'+tableid]);
//console.log(165,res);
	if(cb) cb(res);
//console.log(167,res);
	return res;
};

LS.loadTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	db.tables[tableid].data = LS.get(lsdbid+'.'+tableid);
}

LS.saveTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	LS.set(lsdbid+'.'+tableid,db.tables[tableid].data);
	db.tables[tableid].data = null;
}

LS.commit = function(databaseid, cb) {
//	console.log('COMMIT');
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = {databaseid:lsdbid, tables:{}};
	if(db.tables) {
		for(var tbid in db.tables) {
			lsdb.tables[tbid] = {columns: db.tables[tbid].columns};
			LS.set(lsdbid+'.'+tbid, db.tables[tbid].data);
		};
	}
	LS.set(lsdbid,lsdb);
	return 1;
};

LS.begin = LS.commit;

LS.rollback = function(databaseid, cb) {
//	console.log(207,databaseid);
	var db = alasql.databases[databaseid];
	db.dbversion++;
//	console.log(db.dbversion)
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = LS.get(lsdbid);
//	if(!alasql.options.autocommit) {
		if(lsdb.tables){
			for(var tbid in lsdb.tables) {
				var tb = new alasql.Table({columns: db.tables[tbid].columns});
				extend(tb,lsdb.tables[tbid]);
				lsdb.tables[tbid] = tb;
				if(!alasql.options.autocommit) {
					lsdb.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
				}
				lsdb.tables[tbid].indexColumns();

				// index columns
				// convert types
			}
		}
//	}
	delete alasql.databases[databaseid];
	alasql.databases[databaseid] = new alasql.Database(databaseid);
	extend(alasql.databases[databaseid], lsdb);
	alasql.databases[databaseid].databaseid = databaseid;
	alasql.databases[databaseid].engineid = 'LOCALSTORAGE';
//console.log(999, alasql.databases[databaseid]);
}



//
// 91websql.js
// WebSQL database support
// (c) 2014, Andrey Gershun
//

var SQLITE = alasql.engines.SQLITE = function (){};

SQLITE.createDatabase = function(wdbid, args, ifnotexists, dbid, cb){
	throw new Error('Connot create SQLITE database in memory. Attach it.');
};

SQLITE.dropDatabase = function(databaseid){
	throw new Error('This is impossible to drop SQLite database. Detach it.');
};

SQLITE.attachDatabase = function(sqldbid, dbid, args, params, cb){
	var res = 1;
	if(alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "'+dbid+'" because it already exists');
	};


	if(args[0] && (args[0] instanceof yy.StringValue)
		|| (args[0] instanceof yy.ParamValue)) {

		if(args[0] instanceof yy.StringValue) {
			var value = args[0].value;
		} else if(args[0] instanceof yy.ParamValue) {
			var value = params[args[0].param];
		}
		alasql.utils.loadBinaryFile(value,true,function(data){
			var db = new alasql.Database(dbid || sqldbid);
			db.engineid = "SQLITE";
			db.sqldbid = sqldbid;
			var sqldb = db.sqldb = new SQL.Database(data);
			db.tables = [];
			var tables = sqldb.exec("SELECT * FROM sqlite_master WHERE type='table'")[0].values;

		   	tables.forEach(function(tbl){
		   		db.tables[tbl[1]] = {};
		   		var columns = db.tables[tbl[1]].columns = [];
		   		var ast = alasql.parse(tbl[4]);
//		   		console.log(ast);
		   		var coldefs = ast.statements[0].columns;
		   		if(coldefs && coldefs.length>0) {
		   			coldefs.forEach(function(cd){
			   			columns.push(cd);
		   			});
		   		}

		   	});
//		   	console.log(35,db.tables);

		   	cb(1);
		}, function(err){
			throw new Error('Cannot open SQLite database file "'+args[0].value+'"');
		})
		return res;
	} else {
		throw new Error('Cannot attach SQLite database without a file');
	};

	return res;
}

SQLITE.fromTable = function(databaseid, tableid, cb, idx, query){
	var data = alasql.databases[databaseid].sqldb.exec("SELECT * FROM "+tableid);
	var columns = query.sources[idx].columns = [];
	if(data[0].columns.length > 0) {
		data[0].columns.forEach(function(columnid) {
			columns.push({columnid:columnid});
		});
	};

	var res = [];
	if(data[0].values.length > 0) {
		data[0].values.forEach(function(d){
			var r = {};
			columns.forEach(function(col,idx){
				r[col.columnid] = d[idx];
			});
			res.push(r);
		});
	}
	if(cb) cb(res, idx, query);
};

SQLITE.intoTable = function(databaseid, tableid, value, columns, cb) {
	var sqldb = alasql.databases[databaseid].sqldb;
	for(var i=0, ilen = value.length;i<ilen;i++) {
		var s = "INSERT INTO "+tableid+" (";
		var d = value[i];
		var keys = Object.keys(d);
		s += keys.join(",");
		s += ") VALUES (";
		s += keys.map(function(k){
			v = d[k];
			if(typeof v == 'string') v = "'"+v+"'";
			return v;
		}).join(",");
		s += ")";
		sqldb.exec(s);
	};
	var res = ilen;
	if(cb) cb(res);
	return res;
};



//
// 91localstorage.js
// localStorage and DOM-Storage engine
// Date: 09.12.2014
// (c) Andrey Gershun
//

var FS = alasql.engines.FILESTORAGE = alasql.engines.FILE = function (){};

/*
FS.get = function(key) {
	var s = localStorage.getItem(key);
	if(typeof s == "undefined") return;
	var v = undefined;
	try {
		v = JSON.parse(s); 
	} catch(err) {
		throw new Error('Cannot parse JSON '+s);
	}
	return v;
};

LS.set = function(key, value){
	if(typeof value == 'undefined') localStorage.removeItem(key);
	else localStorage.setItem(key,JSON.stringify(value)); 
}
*/

FS.createDatabase = function(fsdbid, args, ifnotexists, dbid, cb){
//	console.log(arguments);
	var res = 1;
	var filename = args[0].value;
//	console.log('filename',filename);
	alasql.utils.fileExists(filename, function(fex){
		// console.log('fex:',arguments);
		if(fex) {
			if(ifnotexists) {
				res = 0;
				if(cb) res = cb(res);
				return res;
			} else {
				throw new Error('Cannot create new database file, because it alreagy exists');
			} 
		} else {
			var data = {tables:{}};
			alasql.utils.saveFile(filename,JSON.stringify(data),function(data){
				if(cb) res = cb(res);
			});
		}
	});
	return res;
};


FS.dropDatabase = function(fsdbid, ifexists, cb){
	var res;
	var filename = fsdbid.value;
//	console.log('filename',filename);
	alasql.utils.fileExists(filename, function(fex){
		if(fex) {
			res = 1;
			alasql.utils.deleteFile(filename, function(){
				res = 1;
				if(cb) res = cb(res);
			});
		} else {
			if(!ifexists) {
				throw new Error('Cannot drop database file, because it does not exist');
			}
			res = 0;
			if(cb) res = cb(res);
		}
	});
	return res;
};


FS.attachDatabase = function(fsdbid, dbid, args, params, cb){
//	console.log(arguments);
	var res = 1;
	if(alasql.databases[dbid]) {
		throw new Error('Unable to attach database as "'+dbid+'" because it already exists');
	};
	var db = new alasql.Database(dbid || fsdbid);
	db.engineid = "FILESTORAGE";
//	db.fsdbid = fsdbid;
	db.filename = args[0].value;
	loadFile(db.filename, !!cb, function(s){
		try {
			db.data = JSON.parse(s);
		} catch(err) {
			throw new Error('Data in FileStorage database are corrupted');
		}
		db.tables = db.data.tables;
		// IF AUTOCOMMIT IS OFF then copy data to memory
		if(!alasql.options.autocommit) {
			if(db.tables){
				for(var tbid in db.tables) {
					db.tables[tbid].data = db.data[tbid];
				}
			}
		}
		if(cb) res = cb(res);
	});
	return res;
};

/*
FS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if(like) {
		var relike = new RegExp(like.value.replace(/\%/g,'.*'),'g');
	}
	if(ls && ls.databases) {
		for(dbid in ls.databases) {
			res.push({databaseid: dbid});
		};
		if(like && res && res.length > 0) {
			res = res.filter(function(d){
				return d.databaseid.match(relike);
			});
		}		
	};
	if(cb) cb(res);
	return res;
};
*/

FS.createTable = function(databaseid, tableid, ifnotexists, cb) {
	var db = alasql.databases[databaseid];
	var tb = db.data[tableid];
	var res = 1;

	if(tb && !ifnotexists) {
		throw new Error('Table "'+tableid+'" alsready exists in the database "'+fsdbid+'"');
	};
	var table = alasql.databases[databaseid].tables[tableid];
	db.data.tables[tableid] = {columns:table.columns};
	db.data[tableid] = [];

	FS.updateFile(databaseid);	

	if(cb) cb(res);
	return res;
};

FS.updateFile = function(databaseid) {
//	console.log('update start');
	var db = alasql.databases[databaseid];
	if(db.issaving) {
		db.postsave = true;
		return;
	};
	db.issaving = true;
	db.postsave = false;
	alasql.utils.saveFile(db.filename, JSON.stringify(db.data), function(){
		db.issaving = false;
//		console.log('update finish');

		if(db.postsave) {
			setTimeout(function(){
				FS.updateFile(databaseid);
			},50); // TODO Test with different timeout parameters
		};
	});
};

FS.dropTable = function (databaseid, tableid, ifexists, cb) {
	var res = 1;
	var db = alasql.databases[databaseid];
	if(!ifexists && !db.tables[tableid]) {
		throw new Error('Cannot drop table "'+tableid+'" in fileStorage, because it does not exist');
	};
	delete db.tables[tableid];
	delete db.data.tables[tableid];
	delete db.data[tableid];
	FS.updateFile(databaseid);	
	if(cb) cb(res);
	return res;
}

FS.fromTable = function(databaseid, tableid, cb, idx, query) {
//	console.log(998, databaseid, tableid, cb);
	var db = alasql.databases[databaseid];
	var res = db.data[tableid];
	if(cb) res = cb(res, idx, query);
	return res;
};

FS.intoTable = function(databaseid, tableid, value, columns, cb) {
	var db = alasql.databases[databaseid];
	var res = value.length;
	var tb = db.data[tableid];
	if(!tb) tb = [];
	db.data[tableid] = tb.concat(value);
	FS.updateFile(databaseid);	
	if(cb) cb(res);
	return res;
};

FS.loadTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	db.tables[tableid].data = db.data[tableid];
}

FS.saveTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	db.data[tableid] = db.tables[tableid].data;
	db.tables[tableid].data = null;
	FS.updateFile(databaseid);	
}

FS.commit = function(databaseid, cb) {
//	console.log('COMMIT');
	var db = alasql.databases[databaseid];
	var fsdb = {tables:{}};
	if(db.tables) {
		for(var tbid in db.tables) {
			db.data.tables[tbid] = {columns: db.tables[tbid].columns};
			db.data[tbid] = db.tables[tbid].data;
		};
	};
	FS.updateFile(databaseid);
	return 1;
};

FS.begin = FS.commit;

FS.rollback = function(databaseid, cb) {
	var res = 1;
	var db = alasql.databases[databaseid];
	db.dbversion++;
//	console.log(db.dbversion)
//	var lsdbid = alasql.databases[databaseid].lsdbid;
//	lsdb = LS.get(lsdbid);
	wait();
	function wait() {
		setTimeout(function(){
			if(db.issaving) {
				return wait();
			} else {
				alasql.loadFile(db.filename,!!cb,function(data){
					db.data = data;
					db.tables = {};
					for(var tbid in db.data.tables) {
						var tb = new alasql.Table({columns: db.data.tables[tbid].columns});
						extend(tb,db.data.tables[tbid]);
						db.tables[tbid] = tb;
						if(!alasql.options.autocommit) {
							db.tables[tbid].data = db.data[tbid];
						}
						db.tables[tbid].indexColumns();

						// index columns
						// convert types
					}

					delete alasql.databases[databaseid];
					alasql.databases[databaseid] = new alasql.Database(databaseid);
					extend(alasql.databases[databaseid], db);
					alasql.databases[databaseid].engineid = 'FILESTORAGE';
					alasql.databases[databaseid].filename = db.filename;

					if(cb) res = cb(res);

				});
			};
		},100);		
	};

//	if(!alasql.options.autocommit) {
/*		if(lsdb.tables){
			for(var tbid in lsdb.tables) {
				var tb = new alasql.Table({columns: db.tables[tbid].columns});
				extend(tb,lsdb.tables[tbid]);
				lsdb.tables[tbid] = tb;
				if(!alasql.options.autocommit) {
					lsdb.tables[tbid].data = LS.get(db.lsdbid+'.'+tbid);
				}
				lsdb.tables[tbid].indexColumns();

				// index columns
				// convert types
			}
		}
//	}
*/
//console.log(999, alasql.databases[databaseid]);
}



if((typeof exports != 'object') && (typeof importScripts != 'function') && (typeof document == 'object')) {

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2015-03-04
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 500 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						var new_tab = view.open(object_url, "_blank");
						if (new_tab == undefined && typeof safari !== "undefined") {
							//Apple do not allow window.open, see http://bit.ly/1kZffRI
							view.location.href = object_url
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
				return;
			}
			// prepend BOM for UTF-8 XML and text/plain types
			if (/^\s*(?:text\/(?:plain|xml)|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				blob = new Blob(["\ufeff", blob], {type: blob.type});
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}

/*
//
// Last part of Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// This is a final part of Alasql

// FileSaveAs
	alasql.utils.saveAs = saveAs;

};

// Create default database
new Database("alasql");

// Set default database
alasql.use("alasql");

return alasql;
}));

if (typeof importScripts === 'function') {
	// Nothing
} else if(typeof exports != 'object') {

alasql.worker = function(path, paths, cb) {
//	var path;
	if(path === true) path = undefined;
	if (typeof path == "undefined") {
		var sc = document.getElementsByTagName('script');
		for(var i=0;i<sc.length;i++) {
			if (sc[i].src.substr(-16).toLowerCase() == 'alasql-worker.js') {
				path = sc[i].src.substr(0,sc[i].src.length-16)+'alasql.js'; 
				break;
			} else if (sc[i].src.substr(-20).toLowerCase() == 'alasql-worker.min.js') {
				path = sc[i].src.substr(0,sc[i].src.length-20)+'alasql.min.js';
				break;
			} else if (sc[i].src.substr(-9).toLowerCase() == 'alasql.js') {
				path = sc[i].src; 
				break;
			} else if (sc[i].src.substr(-13).toLowerCase() == 'alasql.min.js') {
				path = sc[i].src.substr(0,sc[i].src.length-13)+'alasql.min.js'; 
				break;
			};
		};
	};

	if(typeof path == "undefined") {
		throw new Error('Path to alasql.js is not specified');
	} else if(path !== false) {

		var js = "importScripts('";
			js += path;
			js+="');self.onmessage = function(event) {"+
		"alasql(event.data.sql,event.data.params, function(data){"+
		"postMessage({id:event.data.id, data:data});});}";

		var blob = new Blob([js], {"type": "text\/plain"});
		alasql.webworker = new Worker(URL.createObjectURL(blob));

		alasql.webworker.onmessage = function(event) {
			var id = event.data.id;
//			console.log('onmessage',alasql.buffer,id);
			alasql.buffer[id](event.data.data);
			delete alasql.buffer[id];
		};

		alasql.webworker.onerror = function(e){
			throw e;
		}

		if(arguments.length > 1) {
			var sql = 'REQUIRE ' + paths.map(function(p){
				return '"'+p+'"';
			}).join(",");
			alasql(sql,[],cb);
		}

	} else if(path === false) {
		delete alasql.webworker;
		return;
	}; 
};

};
