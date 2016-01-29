/*! AlaSQL v0.2.2-develop-1153 © 2014-2015 Andrey Gershun & M. Rangel Wulff | alasql.org/license */
/*
@module alasql
@version 0.2.2-develop-1153

AlaSQL - JavaScript SQL database
© 2014-2015	Andrey Gershun & M. Rangel Wulff

@license
The MIT License (MIT)

Copyright © 2014-2015 Andrey Gershun (agershun@gmail.com) & M. Rangel Wulff (m@rawu.dk) 

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
	AlaSQL - Main Alasql class
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
	if(typeof importScripts !== 'function' && alasql.webworker) {
		var id = alasql.lastid++;
		alasql.buffer[id] = cb;
		alasql.webworker.postMessage({id:id,sql:sql,params:params});
	} else {
		if(arguments.length === 0) {
			// Without arguments - Fluent interface
			return new yy.Select({
				columns:[new yy.Column({columnid:'*'})],
				from: [new yy.ParamValue({param:0})]
			});
		} else if (arguments.length === 1 && typeof sql === "object" && sql instanceof Array) {
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
			if(typeof sql === 'string' && sql[0]==='#' && typeof document === "object") {
				sql = document.querySelector(sql).textContent;
			} else if(typeof sql === 'object' && sql instanceof HTMLElement) {
				sql = sql.textContent;
			} else if(typeof sql === 'function') {
				// to run multiline functions
				sql = sql.toString().slice(14,-3);
			}
			// Run SQL			
			return alasql.exec(sql, params, cb, scope);
		}
	}
};

/** 
	Current version of alasql 
 	@constant {string} 
*/
alasql.version = '0.2.2-develop-1153';

/**
	Debug flag
	@type {boolean}
*/
alasql.debug = undefined; // Initial debug variable

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
	} else if(typeof exports !== 'undefined') { 
		alasql.path = __dirname;

	} else if(typeof Meteor === 'object' && Meteor.isClient) {
		alasql.path = '/packages/dist/';

	} else if(typeof Meteor === 'object' && Meteor.isServer) {
		alasql.path = 'assets/packages/dist/';

	} else if(typeof document !== 'undefined') {
		var sc = document.getElementsByTagName('script');

		for(var i=0;i<sc.length;i++) {	
			if (sc[i].src.substr(-16).toLowerCase() === 'alasql-worker.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-16); 
				break;

			} else if (sc[i].src.substr(-20).toLowerCase() === 'alasql-worker.min.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-20);
				break;

			} else if (sc[i].src.substr(-9).toLowerCase() === 'alasql.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-9); 
				break;

			} else if (sc[i].src.substr(-13).toLowerCase() === 'alasql.min.js') {
				alasql.path = sc[i].src.substr(0,sc[i].src.length-13); 
				break;
			}
		}	
	}
}

getAlaSQLPath();

/* parser generated by jison 0.4.16 */
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
var alasqlparser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,10],$V1=[1,102],$V2=[1,103],$V3=[1,6],$V4=[1,42],$V5=[1,78],$V6=[1,75],$V7=[1,94],$V8=[1,93],$V9=[1,68],$Va=[1,101],$Vb=[1,85],$Vc=[1,70],$Vd=[1,83],$Ve=[1,65],$Vf=[1,69],$Vg=[1,63],$Vh=[1,67],$Vi=[1,60],$Vj=[1,73],$Vk=[1,61],$Vl=[1,66],$Vm=[1,82],$Vn=[1,76],$Vo=[1,84],$Vp=[1,86],$Vq=[1,87],$Vr=[1,80],$Vs=[1,81],$Vt=[1,79],$Vu=[1,88],$Vv=[1,89],$Vw=[1,90],$Vx=[1,91],$Vy=[1,92],$Vz=[1,98],$VA=[1,64],$VB=[1,77],$VC=[1,71],$VD=[1,96],$VE=[1,97],$VF=[1,62],$VG=[1,72],$VH=[1,106],$VI=[1,107],$VJ=[8,297,509,510],$VK=[8,297,301,509,510],$VL=[1,114],$VM=[1,115],$VN=[1,116],$VO=[1,117],$VP=[1,118],$VQ=[127,343,399],$VR=[1,126],$VS=[1,125],$VT=[1,131],$VU=[1,159],$VV=[1,170],$VW=[1,173],$VX=[1,168],$VY=[1,176],$VZ=[1,180],$V_=[1,177],$V$=[1,164],$V01=[1,166],$V11=[1,169],$V21=[1,178],$V31=[1,161],$V41=[1,187],$V51=[1,183],$V61=[1,184],$V71=[1,188],$V81=[1,189],$V91=[1,190],$Va1=[1,191],$Vb1=[1,192],$Vc1=[1,193],$Vd1=[1,194],$Ve1=[1,195],$Vf1=[1,196],$Vg1=[1,171],$Vh1=[1,172],$Vi1=[1,174],$Vj1=[1,175],$Vk1=[1,181],$Vl1=[1,179],$Vm1=[1,182],$Vn1=[1,165],$Vo1=[1,167],$Vp1=[1,186],$Vq1=[1,197],$Vr1=[4,5],$Vs1=[2,455],$Vt1=[1,200],$Vu1=[1,205],$Vv1=[1,214],$Vw1=[1,210],$Vx1=[8,69,75,90,95,115,125,159,165,166,180,195,229,242,244,297,301,509,510],$Vy1=[4,5,8,69,73,74,75,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,180,182,184,195,273,274,275,276,277,278,279,280,281,297,301,410,414,509,510],$Vz1=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$VA1=[1,244],$VB1=[1,251],$VC1=[1,260],$VD1=[1,265],$VE1=[1,264],$VF1=[4,5,8,69,74,75,90,95,104,115,125,128,129,134,140,142,149,151,153,159,165,166,176,177,178,180,195,229,242,244,261,262,263,264,266,273,274,275,276,277,278,279,280,281,283,284,285,286,287,288,289,290,291,293,294,297,301,307,319,410,414,509,510],$VG1=[2,158],$VH1=[1,276],$VI1=[8,71,75,297,301,496,509,510],$VJ1=[4,5,8,69,74,75,90,95,104,115,125,128,129,134,140,142,149,151,153,159,161,165,166,176,177,178,180,182,184,192,195,229,242,244,261,262,263,264,266,273,274,275,276,277,278,279,280,281,283,284,285,286,287,288,289,290,291,293,294,297,301,307,319,410,414,509,510],$VK1=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,190,195,203,205,219,220,221,222,223,224,225,226,227,228,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,290,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,333,337,346,358,359,360,363,364,376,378,385,389,390,391,392,393,394,395,397,398,406,407,408,410,414,416,418,424,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,505,506,507,508,509,510],$VL1=[4,5,8,51,69,86,121,143,153,186,262,283,297,326,329,330,337,385,389,390,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,508,509,510],$VM1=[1,289],$VN1=[1,291],$VO1=[2,487],$VP1=[1,296],$VQ1=[1,307],$VR1=[1,310],$VS1=[1,311],$VT1=[8,75,86,129,134,143,186,289,297,301,461,509,510],$VU1=[8,71,297,301,509,510],$VV1=[2,552],$VW1=[1,327],$VX1=[4,5,153],$VY1=[1,364],$VZ1=[1,336],$V_1=[1,370],$V$1=[1,371],$V02=[1,344],$V12=[1,355],$V22=[1,342],$V32=[1,350],$V42=[1,343],$V52=[1,351],$V62=[1,353],$V72=[1,345],$V82=[1,346],$V92=[1,365],$Va2=[1,362],$Vb2=[1,363],$Vc2=[1,339],$Vd2=[1,341],$Ve2=[1,334],$Vf2=[1,335],$Vg2=[1,337],$Vh2=[1,338],$Vi2=[1,340],$Vj2=[1,347],$Vk2=[1,348],$Vl2=[1,352],$Vm2=[1,354],$Vn2=[1,356],$Vo2=[1,357],$Vp2=[1,358],$Vq2=[1,359],$Vr2=[1,360],$Vs2=[1,366],$Vt2=[1,367],$Vu2=[1,368],$Vv2=[1,369],$Vw2=[2,283],$Vx2=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,228,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,290,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,333,337,346,358,359,363,364,385,389,390,393,395,397,398,406,407,408,410,414,416,418,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vy2=[2,351],$Vz2=[1,392],$VA2=[1,402],$VB2=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,228,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,416,418,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$VC2=[1,418],$VD2=[1,426],$VE2=[1,425],$VF2=[4,5,8,69,71,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,297,301,509,510],$VG2=[8,69,71,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,297,301,509,510],$VH2=[2,198],$VI2=[1,448],$VJ2=[8,69,75,90,95,115,125,159,165,166,180,229,242,244,297,301,509,510],$VK2=[2,159],$VL2=[1,451],$VM2=[4,5,109],$VN2=[1,464],$VO2=[1,483],$VP2=[1,463],$VQ2=[1,462],$VR2=[1,457],$VS2=[1,458],$VT2=[1,460],$VU2=[1,461],$VV2=[1,465],$VW2=[1,466],$VX2=[1,467],$VY2=[1,468],$VZ2=[1,469],$V_2=[1,470],$V$2=[1,471],$V03=[1,472],$V13=[1,473],$V23=[1,474],$V33=[1,475],$V43=[1,476],$V53=[1,477],$V63=[1,478],$V73=[1,479],$V83=[1,480],$V93=[1,482],$Va3=[1,484],$Vb3=[1,485],$Vc3=[1,486],$Vd3=[1,487],$Ve3=[1,488],$Vf3=[1,489],$Vg3=[1,490],$Vh3=[1,493],$Vi3=[1,494],$Vj3=[1,495],$Vk3=[1,496],$Vl3=[1,497],$Vm3=[1,498],$Vn3=[1,499],$Vo3=[1,500],$Vp3=[1,501],$Vq3=[1,502],$Vr3=[1,503],$Vs3=[1,504],$Vt3=[71,86,186],$Vu3=[8,71,75,151,184,227,290,297,301,333,346,358,359,363,364,509,510],$Vv3=[1,521],$Vw3=[8,71,75,297,301,509,510],$Vx3=[1,522],$Vy3=[1,530],$Vz3=[4,5,74,128,129,134,140,142,149,151,153,176,177,178,261,262,263,264,266,273,274,275,276,277,278,279,280,281,283,284,285,286,287,288,289,290,291,293,294,307,319,410,414],$VA3=[8,69,75,90,95,104,115,125,159,165,166,180,195,229,242,244,297,301,509,510],$VB3=[4,5,129,289],$VC3=[1,564],$VD3=[8,71,73,75,297,301,509,510],$VE3=[2,722],$VF3=[8,71,73,75,129,136,138,142,149,297,301,410,414,509,510],$VG3=[2,878],$VH3=[8,71,73,75,136,138,142,149,297,301,410,414,509,510],$VI3=[8,71,73,75,136,138,142,297,301,410,414,509,510],$VJ3=[8,71,75,136,138,297,301,509,510],$VK3=[8,75,86,129,143,186,289,297,301,461,509,510],$VL3=[326,329,330],$VM3=[2,748],$VN3=[1,589],$VO3=[1,590],$VP3=[1,591],$VQ3=[1,592],$VR3=[1,596],$VS3=[1,597],$VT3=[161,163,325],$VU3=[2,434],$VV3=[1,651],$VW3=[4,5,74,128,153,283,284,285,286],$VX3=[1,666],$VY3=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,115,119,121,125,126,127,128,129,131,132,134,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$VZ3=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$V_3=[2,366],$V$3=[1,673],$V04=[297,299,301],$V14=[71,418],$V24=[71,416,418],$V34=[1,680],$V44=[4,5,8,51,69,71,73,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$V54=[71,416],$V64=[8,69,75,90,95,115,125,159,165,166,229,242,244,297,301,509,510],$V74=[1,717],$V84=[8,69,75,297,301,509,510],$V94=[1,723],$Va4=[1,724],$Vb4=[1,725],$Vc4=[4,5,8,69,71,73,74,75,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,195,273,274,275,276,277,278,279,280,281,297,301,410,414,509,510],$Vd4=[1,775],$Ve4=[1,774],$Vf4=[1,788],$Vg4=[8,69,71,75,90,95,104,115,125,159,165,166,180,195,229,242,244,297,301,509,510],$Vh4=[1,819],$Vi4=[8,75,86,143,186,297,301,461,509,510],$Vj4=[1,839],$Vk4=[1,838],$Vl4=[1,837],$Vm4=[1,850],$Vn4=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,115,119,121,125,126,127,128,129,131,132,134,136,137,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vo4=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,115,119,121,125,126,127,128,129,131,132,134,136,137,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,305,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vp4=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,115,119,121,125,126,127,128,129,130,131,132,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vq4=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,115,119,121,125,126,127,128,129,131,132,134,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vr4=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,115,119,121,125,126,127,128,129,131,132,134,136,137,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,304,310,311,312,313,314,315,316,321,322,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vs4=[2,396],$Vt4=[4,5,8,51,69,71,73,74,75,86,90,92,95,104,115,119,125,126,127,128,129,131,132,134,140,142,143,145,146,147,149,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,304,321,322,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vu4=[2,281],$Vv4=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,416,418,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vw4=[1,886],$Vx4=[8,75,297,301,509,510],$Vy4=[1,897],$Vz4=[8,69,75,115,125,159,165,166,229,242,244,297,301,509,510],$VA4=[8,69,71,75,90,95,115,125,159,165,166,180,195,229,242,244,297,301,509,510],$VB4=[4,5,69,73,74,75,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,182,184,273,274,275,276,277,278,279,280,281,410,414],$VC4=[4,5,69,71,73,74,75,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,182,184,273,274,275,276,277,278,279,280,281,410,414],$VD4=[2,802],$VE4=[4,5,69,71,73,74,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,182,184,273,274,275,276,277,278,279,280,281,410,414],$VF4=[1,949],$VG4=[8,71,75,125,297,299,301,455,509,510],$VH4=[1,958],$VI4=[1,957],$VJ4=[2,569],$VK4=[1,979],$VL4=[73,136],$VM4=[2,708],$VN4=[1,996],$VO4=[1,997],$VP4=[4,5,8,51,69,73,86,121,143,153,186,227,262,283,297,301,326,329,330,337,385,389,390,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,508,509,510],$VQ4=[1,1004],$VR4=[1,1005],$VS4=[2,322],$VT4=[1,1023],$VU4=[1,1033],$VV4=[8,71,75,297,299,301,455,509,510],$VW4=[1,1036],$VX4=[8,69,71,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,229,242,244,297,301,509,510],$VY4=[8,297,299,301,455,509,510],$VZ4=[8,69,75,115,159,165,166,229,242,244,297,301,509,510],$V_4=[1,1051],$V$4=[1,1055],$V05=[1,1056],$V15=[1,1058],$V25=[1,1059],$V35=[1,1060],$V45=[1,1061],$V55=[1,1062],$V65=[1,1063],$V75=[1,1064],$V85=[1,1065],$V95=[1,1090],$Va5=[71,75],$Vb5=[112,113,121],$Vc5=[1,1149],$Vd5=[8,69,75,115,159,165,166,242,244,297,301,509,510],$Ve5=[8,69,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,229,242,244,297,301,509,510],$Vf5=[1,1190],$Vg5=[1,1192],$Vh5=[4,5,74,140,142,149,153,178,283,284,285,286,293,410,414],$Vi5=[1,1206],$Vj5=[8,69,71,75,159,165,166,242,244,297,301,509,510],$Vk5=[1,1225],$Vl5=[1,1227],$Vm5=[1,1228],$Vn5=[1,1224],$Vo5=[1,1223],$Vp5=[1,1222],$Vq5=[1,1229],$Vr5=[1,1219],$Vs5=[1,1220],$Vt5=[1,1221],$Vu5=[1,1246],$Vv5=[4,5,8,51,69,86,121,143,153,186,262,283,297,301,326,329,330,337,385,389,390,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,508,509,510],$Vw5=[4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,290,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,333,337,346,358,359,363,364,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vx5=[1,1260],$Vy5=[1,1268],$Vz5=[1,1267],$VA5=[8,69,75,159,165,166,242,244,297,301,509,510],$VB5=[8,69,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,297,301,509,510],$VC5=[4,5,8,69,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,297,301,509,510],$VD5=[1,1325],$VE5=[1,1327],$VF5=[1,1324],$VG5=[1,1326],$VH5=[184,190,358,359,360,363],$VI5=[2,499],$VJ5=[1,1332],$VK5=[1,1353],$VL5=[8,69,75,159,165,166,297,301,509,510],$VM5=[1,1363],$VN5=[1,1364],$VO5=[1,1365],$VP5=[1,1384],$VQ5=[4,8,240,297,301,333,346,509,510],$VR5=[1,1433],$VS5=[8,69,71,75,115,159,165,166,236,242,244,297,301,509,510],$VT5=[4,5,74],$VU5=[1,1527],$VV5=[1,1539],$VW5=[1,1558],$VX5=[8,69,75,159,165,166,297,301,404,509,510],$VY5=[8,71,75,227,297,301,509,510];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Literal":3,"LITERAL":4,"BRALITERAL":5,"main":6,"Statements":7,"EOF":8,"Statements_group0":9,"AStatement":10,"ExplainStatement":11,"EXPLAIN":12,"QUERY":13,"PLAN":14,"Statement":15,"AlterTable":16,"AttachDatabase":17,"Call":18,"CreateDatabase":19,"CreateIndex":20,"CreateGraph":21,"CreateTable":22,"CreateView":23,"CreateEdge":24,"CreateVertex":25,"Declare":26,"Delete":27,"DetachDatabase":28,"DropDatabase":29,"DropIndex":30,"DropTable":31,"DropView":32,"If":33,"Insert":34,"Merge":35,"Reindex":36,"RenameTable":37,"Select":38,"ShowCreateTable":39,"ShowColumns":40,"ShowDatabases":41,"ShowIndex":42,"ShowTables":43,"TruncateTable":44,"WithSelect":45,"CreateTrigger":46,"DropTrigger":47,"BeginTransaction":48,"CommitTransaction":49,"RollbackTransaction":50,"EndTransaction":51,"UseDatabase":52,"Update":53,"Help":54,"JavaScript":55,"Source":56,"Assert":57,"While":58,"Continue":59,"Break":60,"BeginEnd":61,"Print":62,"Require":63,"SetVariable":64,"ExpressionStatement":65,"AddRule":66,"Query":67,"Echo":68,"WITH":69,"WithTablesList":70,"COMMA":71,"WithTable":72,"AS":73,"LPAR":74,"RPAR":75,"SelectClause":76,"Select_option0":77,"IntoClause":78,"FromClause":79,"Select_option1":80,"WhereClause":81,"GroupClause":82,"OrderClause":83,"LimitClause":84,"UnionClause":85,"SEARCH":86,"Select_repetition0":87,"Select_option2":88,"PivotClause":89,"PIVOT":90,"Expression":91,"FOR":92,"PivotClause_option0":93,"PivotClause_option1":94,"UNPIVOT":95,"IN":96,"ColumnsList":97,"PivotClause_option2":98,"PivotClause2":99,"AsList":100,"AsLiteral":101,"AsPart":102,"RemoveClause":103,"REMOVE":104,"RemoveClause_option0":105,"RemoveColumnsList":106,"RemoveColumn":107,"Column":108,"LIKE":109,"StringValue":110,"ArrowDot":111,"ARROW":112,"DOT":113,"SearchSelector":114,"ORDER":115,"BY":116,"OrderExpressionsList":117,"SearchSelector_option0":118,"DOTDOT":119,"CARET":120,"EQ":121,"SearchSelector_repetition_plus0":122,"SearchSelector_repetition_plus1":123,"SearchSelector_option1":124,"WHERE":125,"OF":126,"CLASS":127,"NUMBER":128,"STRING":129,"SLASH":130,"VERTEX":131,"EDGE":132,"EXCLAMATION":133,"SHARP":134,"MODULO":135,"GT":136,"LT":137,"GTGT":138,"LTLT":139,"DOLLAR":140,"Json":141,"AT":142,"SET":143,"SetColumnsList":144,"TO":145,"VALUE":146,"ROW":147,"ExprList":148,"COLON":149,"PlusStar":150,"NOT":151,"SearchSelector_repetition2":152,"IF":153,"SearchSelector_repetition3":154,"Aggregator":155,"SearchSelector_repetition4":156,"SearchSelector_group0":157,"SearchSelector_repetition5":158,"UNION":159,"SearchSelectorList":160,"ALL":161,"SearchSelector_repetition6":162,"ANY":163,"SearchSelector_repetition7":164,"INTERSECT":165,"EXCEPT":166,"AND":167,"OR":168,"PATH":169,"RETURN":170,"ResultColumns":171,"REPEAT":172,"SearchSelector_repetition8":173,"SearchSelectorList_repetition0":174,"SearchSelectorList_repetition1":175,"PLUS":176,"STAR":177,"QUESTION":178,"SearchFrom":179,"FROM":180,"SelectModifier":181,"DISTINCT":182,"TopClause":183,"UNIQUE":184,"SelectClause_option0":185,"SELECT":186,"COLUMN":187,"MATRIX":188,"TEXTSTRING":189,"INDEX":190,"RECORDSET":191,"TOP":192,"NumValue":193,"TopClause_option0":194,"INTO":195,"Table":196,"FuncValue":197,"ParamValue":198,"VarValue":199,"FromTablesList":200,"JoinTablesList":201,"ApplyClause":202,"CROSS":203,"APPLY":204,"OUTER":205,"FromTable":206,"FromTable_option0":207,"FromTable_option1":208,"INDEXED":209,"INSERTED":210,"FromString":211,"JoinTable":212,"JoinMode":213,"JoinTableAs":214,"OnClause":215,"JoinTableAs_option0":216,"JoinTableAs_option1":217,"JoinModeMode":218,"NATURAL":219,"JOIN":220,"INNER":221,"LEFT":222,"RIGHT":223,"FULL":224,"SEMI":225,"ANTI":226,"ON":227,"USING":228,"GROUP":229,"GroupExpressionsList":230,"HavingClause":231,"GroupExpression":232,"GROUPING":233,"ROLLUP":234,"CUBE":235,"HAVING":236,"CORRESPONDING":237,"OrderExpression":238,"DIRECTION":239,"COLLATE":240,"NOCASE":241,"LIMIT":242,"OffsetClause":243,"OFFSET":244,"LimitClause_option0":245,"FETCH":246,"LimitClause_option1":247,"LimitClause_option2":248,"LimitClause_option3":249,"ResultColumn":250,"Star":251,"AggrValue":252,"Op":253,"LogicValue":254,"NullValue":255,"ExistsValue":256,"CaseValue":257,"CastClause":258,"NewClause":259,"Expression_group0":260,"CURRENT_TIMESTAMP":261,"JAVASCRIPT":262,"NEW":263,"CAST":264,"ColumnType":265,"CONVERT":266,"PrimitiveValue":267,"OverClause":268,"OVER":269,"OverPartitionClause":270,"OverOrderByClause":271,"PARTITION":272,"SUM":273,"COUNT":274,"MIN":275,"MAX":276,"AVG":277,"FIRST":278,"LAST":279,"AGGR":280,"ARRAY":281,"FuncValue_option0":282,"REPLACE":283,"DATEADD":284,"DATEDIFF":285,"INTERVAL":286,"TRUE":287,"FALSE":288,"NSTRING":289,"NULL":290,"EXISTS":291,"ParamValue_group0":292,"BRAQUESTION":293,"CASE":294,"WhensList":295,"ElseClause":296,"END":297,"When":298,"WHEN":299,"THEN":300,"ELSE":301,"REGEXP":302,"GLOB":303,"ESCAPE":304,"NOT_LIKE":305,"BARBAR":306,"MINUS":307,"AMPERSAND":308,"BAR":309,"GE":310,"LE":311,"EQEQ":312,"EQEQEQ":313,"NE":314,"NEEQEQ":315,"NEEQEQEQ":316,"CondOp":317,"AllSome":318,"TILDA":319,"ColFunc":320,"BETWEEN":321,"NOT_BETWEEN":322,"IS":323,"DOUBLECOLON":324,"SOME":325,"UPDATE":326,"SetColumn":327,"SetColumn_group0":328,"DELETE":329,"INSERT":330,"Into":331,"ValuesListsList":332,"DEFAULT":333,"ValuesList":334,"Value":335,"DateValue":336,"CREATE":337,"TemporaryClause":338,"TableClass":339,"IfNotExists":340,"CreateTableDefClause":341,"CreateTableOptionsClause":342,"TABLE":343,"CreateTableOptions":344,"CreateTableOption":345,"IDENTITY":346,"TEMP":347,"ColumnDefsList":348,"ConstraintsList":349,"Constraint":350,"ConstraintName":351,"PrimaryKey":352,"ForeignKey":353,"UniqueKey":354,"IndexKey":355,"Check":356,"CONSTRAINT":357,"CHECK":358,"PRIMARY":359,"KEY":360,"PrimaryKey_option0":361,"ColsList":362,"FOREIGN":363,"REFERENCES":364,"ForeignKey_option0":365,"OnForeignKeyClause":366,"ParColsList":367,"OnDeleteClause":368,"OnUpdateClause":369,"NO":370,"ACTION":371,"UniqueKey_option0":372,"UniqueKey_option1":373,"ColumnDef":374,"ColumnConstraintsClause":375,"ColumnConstraints":376,"NumberMax":377,"ENUM":378,"MAXNUM":379,"ColumnConstraintsList":380,"ColumnConstraint":381,"ParLiteral":382,"ColumnConstraint_option0":383,"ColumnConstraint_option1":384,"DROP":385,"DropTable_group0":386,"IfExists":387,"TablesList":388,"ALTER":389,"RENAME":390,"ADD":391,"MODIFY":392,"ATTACH":393,"DATABASE":394,"DETACH":395,"AsClause":396,"USE":397,"SHOW":398,"VIEW":399,"CreateView_option0":400,"CreateView_option1":401,"SubqueryRestriction":402,"READ":403,"ONLY":404,"OPTION":405,"HELP":406,"SOURCE":407,"ASSERT":408,"JsonObject":409,"ATLBRA":410,"JsonArray":411,"JsonValue":412,"JsonPrimitiveValue":413,"LCUR":414,"JsonPropertiesList":415,"RCUR":416,"JsonElementsList":417,"RBRA":418,"JsonProperty":419,"OnOff":420,"AtDollar":421,"SetPropsList":422,"SetProp":423,"OFF":424,"COMMIT":425,"TRANSACTION":426,"ROLLBACK":427,"BEGIN":428,"ElseStatement":429,"WHILE":430,"CONTINUE":431,"BREAK":432,"PRINT":433,"REQUIRE":434,"StringValuesList":435,"PluginsList":436,"Plugin":437,"ECHO":438,"DECLARE":439,"DeclaresList":440,"DeclareItem":441,"TRUNCATE":442,"MERGE":443,"MergeInto":444,"MergeUsing":445,"MergeOn":446,"MergeMatchedList":447,"OutputClause":448,"MergeMatched":449,"MergeNotMatched":450,"MATCHED":451,"MergeMatchedAction":452,"MergeNotMatchedAction":453,"TARGET":454,"OUTPUT":455,"CreateVertex_option0":456,"CreateVertex_option1":457,"CreateVertex_option2":458,"CreateVertexSet":459,"SharpValue":460,"CONTENT":461,"CreateEdge_option0":462,"GRAPH":463,"GraphList":464,"GraphVertexEdge":465,"GraphElement":466,"GraphVertexEdge_option0":467,"GraphVertexEdge_option1":468,"GraphElementVar":469,"GraphVertexEdge_option2":470,"GraphVertexEdge_option3":471,"GraphVertexEdge_option4":472,"GraphVar":473,"GraphAsClause":474,"GraphAtClause":475,"GraphElement2":476,"GraphElement2_option0":477,"GraphElement2_option1":478,"GraphElement2_option2":479,"GraphElement2_option3":480,"GraphElement_option0":481,"GraphElement_option1":482,"GraphElement_option2":483,"SharpLiteral":484,"GraphElement_option3":485,"GraphElement_option4":486,"GraphElement_option5":487,"ColonLiteral":488,"DeleteVertex":489,"DeleteVertex_option0":490,"DeleteEdge":491,"DeleteEdge_option0":492,"DeleteEdge_option1":493,"DeleteEdge_option2":494,"Term":495,"COLONDASH":496,"TermsList":497,"QUESTIONDASH":498,"CALL":499,"TRIGGER":500,"BeforeAfter":501,"InsertDeleteUpdate":502,"CreateTrigger_option0":503,"CreateTrigger_option1":504,"BEFORE":505,"AFTER":506,"INSTEAD":507,"REINDEX":508,"SEMICOLON":509,"GO":510,"PERCENT":511,"ROWS":512,"NEXT":513,"FuncValue_option0_group0":514,"$accept":0,"$end":1},
terminals_: {2:"error",4:"LITERAL",5:"BRALITERAL",8:"EOF",12:"EXPLAIN",13:"QUERY",14:"PLAN",51:"EndTransaction",69:"WITH",71:"COMMA",73:"AS",74:"LPAR",75:"RPAR",86:"SEARCH",90:"PIVOT",92:"FOR",95:"UNPIVOT",96:"IN",104:"REMOVE",109:"LIKE",112:"ARROW",113:"DOT",115:"ORDER",116:"BY",119:"DOTDOT",120:"CARET",121:"EQ",125:"WHERE",126:"OF",127:"CLASS",128:"NUMBER",129:"STRING",130:"SLASH",131:"VERTEX",132:"EDGE",133:"EXCLAMATION",134:"SHARP",135:"MODULO",136:"GT",137:"LT",138:"GTGT",139:"LTLT",140:"DOLLAR",142:"AT",143:"SET",145:"TO",146:"VALUE",147:"ROW",149:"COLON",151:"NOT",153:"IF",159:"UNION",161:"ALL",163:"ANY",165:"INTERSECT",166:"EXCEPT",167:"AND",168:"OR",169:"PATH",170:"RETURN",172:"REPEAT",176:"PLUS",177:"STAR",178:"QUESTION",180:"FROM",182:"DISTINCT",184:"UNIQUE",186:"SELECT",187:"COLUMN",188:"MATRIX",189:"TEXTSTRING",190:"INDEX",191:"RECORDSET",192:"TOP",195:"INTO",203:"CROSS",204:"APPLY",205:"OUTER",209:"INDEXED",210:"INSERTED",219:"NATURAL",220:"JOIN",221:"INNER",222:"LEFT",223:"RIGHT",224:"FULL",225:"SEMI",226:"ANTI",227:"ON",228:"USING",229:"GROUP",233:"GROUPING",234:"ROLLUP",235:"CUBE",236:"HAVING",237:"CORRESPONDING",239:"DIRECTION",240:"COLLATE",241:"NOCASE",242:"LIMIT",244:"OFFSET",246:"FETCH",261:"CURRENT_TIMESTAMP",262:"JAVASCRIPT",263:"NEW",264:"CAST",266:"CONVERT",269:"OVER",272:"PARTITION",273:"SUM",274:"COUNT",275:"MIN",276:"MAX",277:"AVG",278:"FIRST",279:"LAST",280:"AGGR",281:"ARRAY",283:"REPLACE",284:"DATEADD",285:"DATEDIFF",286:"INTERVAL",287:"TRUE",288:"FALSE",289:"NSTRING",290:"NULL",291:"EXISTS",293:"BRAQUESTION",294:"CASE",297:"END",299:"WHEN",300:"THEN",301:"ELSE",302:"REGEXP",303:"GLOB",304:"ESCAPE",305:"NOT_LIKE",306:"BARBAR",307:"MINUS",308:"AMPERSAND",309:"BAR",310:"GE",311:"LE",312:"EQEQ",313:"EQEQEQ",314:"NE",315:"NEEQEQ",316:"NEEQEQEQ",319:"TILDA",321:"BETWEEN",322:"NOT_BETWEEN",323:"IS",324:"DOUBLECOLON",325:"SOME",326:"UPDATE",329:"DELETE",330:"INSERT",333:"DEFAULT",336:"DateValue",337:"CREATE",343:"TABLE",346:"IDENTITY",347:"TEMP",357:"CONSTRAINT",358:"CHECK",359:"PRIMARY",360:"KEY",363:"FOREIGN",364:"REFERENCES",370:"NO",371:"ACTION",376:"ColumnConstraints",378:"ENUM",379:"MAXNUM",385:"DROP",389:"ALTER",390:"RENAME",391:"ADD",392:"MODIFY",393:"ATTACH",394:"DATABASE",395:"DETACH",397:"USE",398:"SHOW",399:"VIEW",403:"READ",404:"ONLY",405:"OPTION",406:"HELP",407:"SOURCE",408:"ASSERT",410:"ATLBRA",414:"LCUR",416:"RCUR",418:"RBRA",424:"OFF",425:"COMMIT",426:"TRANSACTION",427:"ROLLBACK",428:"BEGIN",430:"WHILE",431:"CONTINUE",432:"BREAK",433:"PRINT",434:"REQUIRE",438:"ECHO",439:"DECLARE",442:"TRUNCATE",443:"MERGE",451:"MATCHED",454:"TARGET",455:"OUTPUT",461:"CONTENT",463:"GRAPH",496:"COLONDASH",498:"QUESTIONDASH",499:"CALL",500:"TRIGGER",505:"BEFORE",506:"AFTER",507:"INSTEAD",508:"REINDEX",509:"SEMICOLON",510:"GO",511:"PERCENT",512:"ROWS",513:"NEXT"},
productions_: [0,[3,1],[3,1],[6,2],[7,3],[7,1],[7,1],[11,2],[11,4],[10,1],[15,0],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[45,3],[70,3],[70,1],[72,5],[38,10],[38,4],[89,8],[89,11],[99,4],[101,2],[101,1],[100,3],[100,1],[102,1],[102,3],[103,3],[106,3],[106,1],[107,1],[107,2],[111,1],[111,1],[114,1],[114,5],[114,5],[114,1],[114,2],[114,1],[114,2],[114,2],[114,3],[114,4],[114,4],[114,4],[114,4],[114,4],[114,1],[114,1],[114,1],[114,1],[114,1],[114,1],[114,2],[114,2],[114,2],[114,1],[114,1],[114,1],[114,1],[114,1],[114,1],[114,2],[114,3],[114,4],[114,3],[114,1],[114,4],[114,2],[114,2],[114,4],[114,4],[114,4],[114,4],[114,4],[114,5],[114,4],[114,4],[114,4],[114,4],[114,4],[114,4],[114,4],[114,4],[114,6],[160,3],[160,1],[150,1],[150,1],[150,1],[179,2],[76,4],[76,4],[76,4],[76,3],[181,1],[181,2],[181,2],[181,2],[181,2],[181,2],[181,2],[181,2],[183,3],[183,4],[183,0],[78,0],[78,2],[78,2],[78,2],[78,2],[78,2],[79,2],[79,3],[79,5],[79,0],[202,6],[202,7],[202,6],[202,7],[200,1],[200,3],[206,4],[206,5],[206,3],[206,3],[206,2],[206,3],[206,1],[206,3],[206,2],[206,3],[206,1],[206,1],[206,2],[206,3],[206,1],[206,1],[206,2],[206,3],[206,1],[206,2],[206,3],[211,1],[196,3],[196,1],[201,2],[201,2],[201,1],[201,1],[212,3],[214,1],[214,2],[214,3],[214,3],[214,2],[214,3],[214,4],[214,5],[214,1],[214,2],[214,3],[214,1],[214,2],[214,3],[213,1],[213,2],[218,1],[218,2],[218,2],[218,3],[218,2],[218,3],[218,2],[218,3],[218,2],[218,2],[218,2],[215,2],[215,2],[215,0],[81,0],[81,2],[82,0],[82,4],[230,1],[230,3],[232,5],[232,4],[232,4],[232,1],[231,0],[231,2],[85,0],[85,2],[85,3],[85,2],[85,2],[85,3],[85,4],[85,3],[85,3],[83,0],[83,3],[117,1],[117,3],[238,1],[238,2],[238,3],[238,4],[84,0],[84,3],[84,8],[243,0],[243,2],[171,3],[171,1],[250,3],[250,2],[250,3],[250,2],[250,3],[250,2],[250,1],[251,5],[251,3],[251,1],[108,5],[108,3],[108,3],[108,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,3],[91,3],[91,3],[91,1],[91,1],[55,1],[259,2],[259,2],[258,6],[258,8],[258,6],[258,8],[267,1],[267,1],[267,1],[267,1],[267,1],[267,1],[267,1],[252,5],[252,6],[252,6],[268,0],[268,4],[268,4],[268,5],[270,3],[271,3],[155,1],[155,1],[155,1],[155,1],[155,1],[155,1],[155,1],[155,1],[155,1],[197,5],[197,3],[197,4],[197,4],[197,8],[197,8],[197,8],[197,8],[197,3],[148,1],[148,3],[193,1],[254,1],[254,1],[110,1],[110,1],[255,1],[199,2],[256,4],[198,2],[198,2],[198,1],[198,1],[257,5],[257,4],[295,2],[295,1],[298,4],[296,2],[296,0],[253,3],[253,3],[253,3],[253,5],[253,3],[253,5],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,5],[253,3],[253,3],[253,3],[253,5],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,3],[253,6],[253,6],[253,3],[253,3],[253,2],[253,2],[253,2],[253,2],[253,2],[253,3],[253,5],[253,6],[253,5],[253,6],[253,4],[253,5],[253,3],[253,4],[253,3],[253,4],[253,3],[253,3],[253,3],[253,3],[253,3],[320,1],[320,1],[320,4],[317,1],[317,1],[317,1],[317,1],[317,1],[317,1],[318,1],[318,1],[318,1],[53,6],[53,4],[144,1],[144,3],[327,3],[327,4],[27,5],[27,3],[34,5],[34,7],[34,5],[34,5],[34,8],[34,4],[34,6],[34,7],[331,0],[331,1],[332,3],[332,1],[332,1],[332,5],[332,3],[332,3],[334,1],[334,3],[335,1],[335,1],[335,1],[335,1],[335,1],[335,1],[97,1],[97,3],[22,9],[22,5],[339,1],[339,1],[342,0],[342,1],[344,2],[344,1],[345,1],[345,3],[345,3],[345,3],[338,0],[338,1],[340,0],[340,3],[341,3],[341,1],[341,2],[349,1],[349,3],[350,2],[350,2],[350,2],[350,2],[350,2],[351,0],[351,2],[356,4],[352,6],[353,9],[367,3],[366,0],[366,2],[368,4],[369,4],[354,6],[355,5],[355,5],[362,1],[362,1],[362,3],[362,3],[348,1],[348,3],[374,3],[374,2],[374,1],[265,6],[265,7],[265,4],[265,5],[265,1],[265,2],[265,4],[377,1],[377,1],[375,0],[375,1],[380,2],[380,1],[382,3],[381,2],[381,5],[381,3],[381,6],[381,1],[381,2],[381,4],[381,2],[381,1],[381,2],[381,1],[381,1],[381,3],[381,5],[31,4],[388,3],[388,1],[387,0],[387,2],[16,6],[16,6],[16,6],[16,8],[16,6],[37,5],[17,4],[17,7],[17,6],[17,9],[28,3],[19,4],[19,6],[19,9],[19,6],[396,0],[396,2],[52,3],[52,2],[29,4],[29,5],[29,5],[20,8],[20,9],[30,3],[41,2],[41,4],[41,3],[41,5],[43,2],[43,4],[43,4],[43,6],[40,4],[40,6],[42,4],[42,6],[39,4],[39,6],[23,11],[23,8],[402,3],[402,3],[402,5],[32,4],[54,2],[54,1],[65,2],[56,2],[57,2],[57,2],[57,4],[141,4],[141,2],[141,2],[141,2],[141,2],[141,1],[141,2],[141,2],[412,1],[412,1],[413,1],[413,1],[413,1],[413,1],[413,1],[413,1],[413,1],[413,3],[409,3],[409,4],[409,2],[411,2],[411,3],[411,1],[415,3],[415,1],[419,3],[419,3],[419,3],[417,3],[417,1],[64,3],[64,5],[64,6],[421,1],[421,1],[422,3],[422,2],[423,1],[423,1],[423,3],[420,1],[420,1],[49,2],[50,2],[48,2],[33,4],[33,3],[429,2],[58,3],[59,1],[60,1],[61,3],[62,2],[62,2],[63,2],[63,2],[437,1],[437,1],[68,2],[435,3],[435,1],[436,3],[436,1],[26,2],[440,1],[440,3],[441,3],[441,4],[441,5],[441,6],[44,3],[35,6],[444,1],[444,2],[445,2],[446,2],[447,2],[447,2],[447,1],[447,1],[449,4],[449,6],[452,1],[452,3],[450,5],[450,7],[450,7],[450,9],[450,7],[450,9],[453,3],[453,6],[453,3],[453,6],[448,0],[448,2],[448,5],[448,4],[448,7],[25,6],[460,2],[459,0],[459,2],[459,2],[459,1],[24,8],[21,3],[21,4],[464,3],[464,1],[465,3],[465,7],[465,6],[465,3],[465,4],[469,1],[469,1],[473,2],[474,3],[475,2],[476,4],[466,4],[466,3],[466,2],[466,1],[488,2],[484,2],[484,2],[489,4],[491,6],[66,3],[66,2],[497,3],[497,1],[495,1],[495,4],[67,2],[18,2],[46,9],[46,8],[46,9],[501,0],[501,1],[501,1],[501,1],[501,2],[502,1],[502,1],[502,1],[47,3],[36,2],[9,1],[9,1],[77,0],[77,1],[80,0],[80,1],[87,0],[87,2],[88,0],[88,1],[93,0],[93,1],[94,0],[94,1],[98,0],[98,1],[105,0],[105,1],[118,0],[118,1],[122,1],[122,2],[123,1],[123,2],[124,0],[124,1],[152,0],[152,2],[154,0],[154,2],[156,0],[156,2],[157,1],[157,1],[158,0],[158,2],[162,0],[162,2],[164,0],[164,2],[173,0],[173,2],[174,0],[174,2],[175,0],[175,2],[185,0],[185,1],[194,0],[194,1],[207,0],[207,1],[208,0],[208,1],[216,0],[216,1],[217,0],[217,1],[245,0],[245,1],[247,0],[247,1],[248,0],[248,1],[249,0],[249,1],[260,1],[260,1],[514,1],[514,1],[282,0],[282,1],[292,1],[292,1],[328,1],[328,1],[361,0],[361,1],[365,0],[365,1],[372,0],[372,1],[373,0],[373,1],[383,0],[383,1],[384,0],[384,1],[386,1],[386,1],[400,0],[400,1],[401,0],[401,1],[456,0],[456,1],[457,0],[457,1],[458,0],[458,1],[462,0],[462,1],[467,0],[467,1],[468,0],[468,1],[470,0],[470,1],[471,0],[471,1],[472,0],[472,1],[477,0],[477,1],[478,0],[478,1],[479,0],[479,1],[480,0],[480,1],[481,0],[481,1],[482,0],[482,1],[483,0],[483,1],[485,0],[485,1],[486,0],[486,1],[487,0],[487,1],[490,0],[490,2],[492,0],[492,2],[493,0],[493,2],[494,0],[494,2],[503,0],[503,1],[504,0],[504,1]],
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
case 5: case 6: case 66: case 76: case 81: case 139: case 173: case 201: case 202: case 238: case 257: case 269: case 346: case 363: case 441: case 458: case 459: case 463: case 471: case 512: case 513: case 551: case 636: case 643: case 667: case 669: case 671: case 685: case 686: case 716: case 740:
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
case 10: case 158: case 168: case 233: case 234: case 236: case 244: case 246: case 255: case 263: case 266: case 366: case 475: case 485: case 487: case 499: case 505: case 506: case 552:
 this.$ = undefined; 
break;
case 64:
 this.$ = new yy.WithSelect({withs: $$[$0-1], select:$$[$0]}); 
break;
case 65: case 550:
 $$[$0-2].push($$[$0]); this.$=$$[$0-2]; 
break;
case 67:
 this.$ = {name:$$[$0-4], select:$$[$0-1]}; 
break;
case 68:

			yy.extend(this.$,$$[$0-9]); yy.extend(this.$,$$[$0-8]); yy.extend(this.$,$$[$0-7]); yy.extend(this.$,$$[$0-6]); 
		    yy.extend(this.$,$$[$0-5]); yy.extend(this.$,$$[$0-4]);yy.extend(this.$,$$[$0-3]); 
		    yy.extend(this.$,$$[$0-2]); yy.extend(this.$,$$[$0-1]); yy.extend(this.$,$$[$0]); 
		    this.$ = $$[$0-9];
/*		    if(yy.exists) this.$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) this.$.queries = yy.queries;
			delete yy.queries;
*/		
break;
case 69:

			this.$ = new yy.Search({selectors:$$[$0-2], from:$$[$0]});
			yy.extend(this.$,$$[$0-1]);

break;
case 70:
 this.$ = {pivot:{expr:$$[$0-5], columnid:$$[$0-3], inlist:$$[$0-2], as:$$[$0]}}; 
break;
case 71:
 this.$ = {unpivot:{tocolumnid:$$[$0-8], forcolumnid:$$[$0-6], inlist:$$[$0-3], as:$$[$0]}}; 
break;
case 72: case 504: case 534: case 570: case 606: case 624: case 627: case 646:
 this.$ = $$[$0-1]; 
break;
case 73: case 74: case 82: case 143: case 181: case 243: case 276: case 284: case 285: case 286: case 287: case 288: case 289: case 290: case 291: case 292: case 293: case 294: case 295: case 296: case 297: case 299: case 312: case 313: case 314: case 315: case 316: case 317: case 365: case 430: case 431: case 432: case 433: case 434: case 435: case 500: case 531: case 533: case 610: case 611: case 612: case 613: case 614: case 615: case 619: case 621: case 622: case 631: case 644: case 645: case 707: case 722: case 723: case 725: case 726: case 732: case 733:
 this.$ = $$[$0]; 
break;
case 75: case 80: case 715: case 739:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 77:
 this.$ = {expr:$$[$0]}; 
break;
case 78:
 this.$ = {expr:$$[$0-2],as:$$[$0]}; 
break;
case 79:
 this.$ = {removecolumns:$$[$0]}; 
break;
case 83:
 this.$ = {like:$$[$0]}; 
break;
case 86: case 100:
 this.$ = {srchid:"PROP", args: [$$[$0]]}; 
break;
case 87:
 this.$ = {srchid:"ORDERBY", args: $$[$0-1]}; 
break;
case 88:

			var dir = $$[$0-1];
			if(!dir) dir = 'ASC';
			this.$ = {srchid:"ORDERBY", args: [{expression: new yy.Column({columnid:'_'}), direction:dir}]};

break;
case 89:
 this.$ = {srchid:"PARENT"}; 
break;
case 90:
 this.$ = {srchid:"APROP", args: [$$[$0]]}; 
break;
case 91:
 this.$ = {selid:"ROOT"};
break;
case 92:
 this.$ = {srchid:"EQ", args: [$$[$0]]}; 
break;
case 93:
 this.$ = {srchid:"LIKE", args: [$$[$0]]}; 
break;
case 94: case 95:
 this.$ = {selid:"WITH", args: $$[$0-1]}; 
break;
case 96:
 this.$ = {srchid:$$[$0-3].toUpperCase(), args:$$[$0-1]}; 
break;
case 97:
 this.$ = {srchid:"WHERE", args:[$$[$0-1]]}; 
break;
case 98:
 this.$ = {selid:"OF", args:[$$[$0-1]]}; 
break;
case 99:
 this.$ = {srchid:"CLASS", args:[$$[$0-1]]}; 
break;
case 101:
 this.$ = {srchid:"NAME", args: [$$[$0].substr(1,$$[$0].length-2)]}; 
break;
case 102:
 this.$ = {srchid:"CHILD"}; 
break;
case 103:
 this.$ = {srchid:"VERTEX"}; 
break;
case 104:
 this.$ = {srchid:"EDGE"}; 
break;
case 105:
 this.$ = {srchid:"REF"}; 
break;
case 106:
 this.$ = {srchid:"SHARP", args:[$$[$0]]}; 
break;
case 107:
 this.$ = {srchid:"ATTR", args:((typeof $$[$0] == 'undefined')?undefined:[$$[$0]])}; 
break;
case 108:
 this.$ = {srchid:"ATTR"}; 
break;
case 109:
 this.$ = {srchid:"OUT"}; 
break;
case 110:
 this.$ = {srchid:"IN"}; 
break;
case 111:
 this.$ = {srchid:"OUTOUT"}; 
break;
case 112:
 this.$ = {srchid:"ININ"}; 
break;
case 113:
 this.$ = {srchid:"CONTENT"}; 
break;
case 114:
 this.$ = {srchid:"EX",args:[new yy.Json({value:$$[$0]})]}; 
break;
case 115:
 this.$ = {srchid:"AT", args:[$$[$0]]}; 
break;
case 116:
 this.$ = {srchid:"AS", args:[$$[$0]]}; 
break;
case 117:
 this.$ = {srchid:"SET", args:$$[$0-1]}; 
break;
case 118:
 this.$ = {selid:"TO", args:[$$[$0]]}; 
break;
case 119:
 this.$ = {srchid:"VALUE"}; 
break;
case 120:
 this.$ = {srchid:"ROW", args:$$[$0-1]}; 
break;
case 121:
 this.$ = {srchid:"CLASS", args:[$$[$0]]}; 
break;
case 122:
 this.$ = {selid:$$[$0],args:[$$[$0-1]] }; 
break;
case 123:
 this.$ = {selid:"NOT",args:$$[$0-1] }; 
break;
case 124:
 this.$ = {selid:"IF",args:$$[$0-1] }; 
break;
case 125:
 this.$ = {selid:$$[$0-3],args:$$[$0-1] }; 
break;
case 126:
 this.$ = {selid:'DISTINCT',args:$$[$0-1] }; 
break;
case 127:
 this.$ = {selid:'UNION',args:$$[$0-1] }; 
break;
case 128:
 this.$ = {selid:'UNIONALL',args:$$[$0-1] }; 
break;
case 129:
 this.$ = {selid:'ALL',args:[$$[$0-1]] }; 
break;
case 130:
 this.$ = {selid:'ANY',args:[$$[$0-1]] }; 
break;
case 131:
 this.$ = {selid:'INTERSECT',args:$$[$0-1] }; 
break;
case 132:
 this.$ = {selid:'EXCEPT',args:$$[$0-1] }; 
break;
case 133:
 this.$ = {selid:'AND',args:$$[$0-1] }; 
break;
case 134:
 this.$ = {selid:'OR',args:$$[$0-1] }; 
break;
case 135:
 this.$ = {selid:'PATH',args:[$$[$0-1]] }; 
break;
case 136:
 this.$ = {srchid:'RETURN',args:$$[$0-1] }; 
break;
case 137:
 this.$ = {selid:'REPEAT',sels:$$[$0-3], args:$$[$0-1] }; 
break;
case 138:
 this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 140:
 this.$ = "PLUS"; 
break;
case 141:
 this.$ = "STAR"; 
break;
case 142:
 this.$ = "QUESTION"; 
break;
case 144:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy.extend(this.$, $$[$0-3]); yy.extend(this.$, $$[$0-1]); 
break;
case 145:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy.extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 146:
 this.$ = new yy.Select({ columns:$$[$0], all:true }); yy.extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 147:

			if(!$$[$0]) {
				this.$ = new yy.Select({columns:[new yy.Column({columnid:'_',})], modifier:'COLUMN'});
			} else {
				this.$ = new yy.Select({ columns:$$[$0] }); yy.extend(this.$, $$[$0-2]);yy.extend(this.$, $$[$0-1]); 
			}

break;
case 148:
 if($$[$0]=='SELECT') this.$ = undefined; else this.$ = {modifier: $$[$0]};  
break;
case 149:
 this.$ = {modifier:'VALUE'}
break;
case 150:
 this.$ = {modifier:'ROW'}
break;
case 151:
 this.$ = {modifier:'COLUMN'}
break;
case 152:
 this.$ = {modifier:'MATRIX'}
break;
case 153:
 this.$ = {modifier:'TEXTSTRING'}
break;
case 154:
 this.$ = {modifier:'INDEX'}
break;
case 155:
 this.$ = {modifier:'RECORDSET'}
break;
case 156:
 this.$ = {top: $$[$0-1], percent:(typeof $$[$0] != 'undefined'?true:undefined)}; 
break;
case 157:
 this.$ = {top: $$[$0-1]}; 
break;
case 159: case 322: case 507: case 508: case 708:
this.$ = undefined; 
break;
case 160: case 161: case 162: case 163:
this.$ = {into: $$[$0]} 
break;
case 164:

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
case 165:
 this.$ = { from: $$[$0] }; 
break;
case 166:
 this.$ = { from: $$[$0-1], joins: $$[$0] }; 
break;
case 167:
 this.$ = { from: $$[$0-2], joins: $$[$0-1] }; 
break;
case 169:
 this.$ = new yy.Apply({select: $$[$0-2], applymode:'CROSS', as:$$[$0]}); 
break;
case 170:
 this.$ = new yy.Apply({select: $$[$0-3], applymode:'CROSS', as:$$[$0]}); 
break;
case 171:
 this.$ = new yy.Apply({select: $$[$0-2], applymode:'OUTER', as:$$[$0]}); 
break;
case 172:
 this.$ = new yy.Apply({select: $$[$0-3], applymode:'OUTER', as:$$[$0]}); 
break;
case 174: case 239: case 442: case 514: case 515:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 175:
 this.$ = $$[$0-2]; this.$.as = $$[$0] 
break;
case 176:
 this.$ = $$[$0-3]; this.$.as = $$[$0] 
break;
case 177:
 this.$ = $$[$0-1]; this.$.as = 'default' 
break;
case 178:
 this.$ = new yy.Json({value:$$[$0-2]}); $$[$0-2].as = $$[$0] 
break;
case 179:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0] 
break;
case 180:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0] 
break;
case 182: case 625: case 628:
 this.$ = $$[$0-2]; 
break;
case 183: case 187: case 191: case 194:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0]; 
break;
case 184: case 188: case 192: case 195:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0]; 
break;
case 185: case 186: case 190: case 193:
 this.$ = $$[$0]; $$[$0].as = 'default'; 
break;
case 189:
 this.$ = {inserted:true}; $$[$0].as = 'default'; 
break;
case 196:

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
case 197:

			if($$[$0-2] == 'INFORMATION_SCHEMA') {
				this.$ = new yy.FuncValue({funcid: $$[$0-2], args:[new yy.StringValue({value:$$[$0]})]});
			} else {
				this.$ = new yy.Table({databaseid: $$[$0-2], tableid:$$[$0]});
			}

break;
case 198:
 this.$ = new yy.Table({tableid: $$[$0]});
break;
case 199: case 200:
 this.$ = $$[$0-1]; $$[$0-1].push($$[$0]); 
break;
case 203:
 this.$ = new yy.Join($$[$0-2]); yy.extend(this.$, $$[$0-1]); yy.extend(this.$, $$[$0]); 
break;
case 204:
 this.$ = {table: $$[$0]}; 
break;
case 205:
 this.$ = {table: $$[$0-1], as: $$[$0] } ; 
break;
case 206:
 this.$ = {table: $$[$0-2], as: $$[$0] } ; 
break;
case 207:
 this.$ = {json:new yy.Json({value:$$[$0-2],as:$$[$0]})}; 
break;
case 208:
 this.$ = {param: $$[$0-1], as: $$[$0] } ; 
break;
case 209:
 this.$ = {param: $$[$0-2], as: $$[$0] } ; 
break;
case 210:
 this.$ = {select: $$[$0-3], as: $$[$0]} ; 
break;
case 211:
 this.$ = {select: $$[$0-4], as: $$[$0] } ; 
break;
case 212:
 this.$ = {funcid:$$[$0], as:'default'}; 
break;
case 213:
 this.$ = {funcid:$$[$0-1], as: $$[$0]}; 
break;
case 214:
 this.$ = {funcid:$$[$0-2], as: $$[$0]}; 
break;
case 215:
 this.$ = {variable:$$[$0],as:'default'}; 
break;
case 216:
 this.$ = {variable:$$[$0-1],as:$$[$0]}; 
break;
case 217:
 this.$ = {variable:$$[$0-2],as:$$[$0]} 
break;
case 218:
 this.$ = { joinmode: $$[$0] } ; 
break;
case 219:
 this.$ = {joinmode: $$[$0-1], natural:true} ; 
break;
case 220: case 221:
 this.$ = "INNER"; 
break;
case 222: case 223:
 this.$ = "LEFT"; 
break;
case 224: case 225:
 this.$ = "RIGHT"; 
break;
case 226: case 227:
 this.$ = "OUTER"; 
break;
case 228:
 this.$ = "SEMI"; 
break;
case 229:
 this.$ = "ANTI"; 
break;
case 230:
 this.$ = "CROSS"; 
break;
case 231:
 this.$ = {on: $$[$0]}; 
break;
case 232: case 681:
 this.$ = {using: $$[$0]}; 
break;
case 235:
 this.$ = {where: new yy.Expression({expression:$$[$0]})}; 
break;
case 237:
 this.$ = {group:$$[$0-1]}; yy.extend(this.$,$$[$0]); 
break;
case 240:
 this.$ = new yy.GroupExpression({type:'GROUPING SETS', group: $$[$0-1]}); 
break;
case 241:
 this.$ = new yy.GroupExpression({type:'ROLLUP', group: $$[$0-1]}); 
break;
case 242:
 this.$ = new yy.GroupExpression({type:'CUBE', group: $$[$0-1]}); 
break;
case 245:
 this.$ = {having:$$[$0]}
break;
case 247:
 this.$ = {union: $$[$0]} ; 
break;
case 248:
 this.$ = {unionall: $$[$0]} ; 
break;
case 249:
 this.$ = {except: $$[$0]} ; 
break;
case 250:
 this.$ = {intersect: $$[$0]} ; 
break;
case 251:
 this.$ = {union: $$[$0], corresponding:true} ; 
break;
case 252:
 this.$ = {unionall: $$[$0], corresponding:true} ; 
break;
case 253:
 this.$ = {except: $$[$0], corresponding:true} ; 
break;
case 254:
 this.$ = {intersect: $$[$0], corresponding:true} ; 
break;
case 256:
 this.$ = {order:$$[$0]}
break;
case 258:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 259:
 this.$ = new yy.Expression({expression: $$[$0], direction:'ASC'}) 
break;
case 260:
 this.$ = new yy.Expression({expression: $$[$0-1], direction:$$[$0].toUpperCase()}) 
break;
case 261:
 this.$ = new yy.Expression({expression: $$[$0-2], direction:'ASC', nocase:true}) 
break;
case 262:
 this.$ = new yy.Expression({expression: $$[$0-3], direction:$$[$0].toUpperCase(), nocase:true}) 
break;
case 264:
 this.$ = {limit:$$[$0-1]}; yy.extend(this.$, $$[$0]); 
break;
case 265:
 this.$ = {limit:$$[$0-2],offset:$$[$0-6]}; 
break;
case 267:
 this.$ = {offset:$$[$0]}; 
break;
case 268: case 493: case 517: case 635: case 642: case 666: case 668: case 672:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 270: case 272: case 274:
 $$[$0-2].as = $$[$0]; this.$ = $$[$0-2];
break;
case 271: case 273: case 275:
 $$[$0-1].as = $$[$0]; this.$ = $$[$0-1];
break;
case 277:
 this.$ = new yy.Column({columid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]}); 
break;
case 278:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]}); 
break;
case 279:
 this.$ = new yy.Column({columnid:$$[$0]}); 
break;
case 280:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]});
break;
case 281: case 282:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]});
break;
case 283:
 this.$ = new yy.Column({columnid: $$[$0]});
break;
case 298:
 this.$ = new yy.Json({value:$$[$0]}); 
break;
case 300: case 301: case 302:

			if(!yy.queries) yy.queries = []; 
			yy.queries.push($$[$0-1]);
			$$[$0-1].queriesidx = yy.queries.length;
			this.$ = $$[$0-1];

break;
case 303:
this.$ = $$[$0]
break;
case 304:
 this.$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'});
break;
case 305:
 this.$ = new yy.JavaScript({value:$$[$0].substr(2,$$[$0].length-4)}); 
break;
case 306:
 this.$ = new yy.FuncValue({funcid:$$[$0], newid:true}); 
break;
case 307:
 this.$ = $$[$0]; yy.extend(this.$,{newid:true}); 
break;
case 308:
 this.$ = new yy.Convert({expression:$$[$0-3]}) ; yy.extend(this.$,$$[$0-1]) ; 
break;
case 309:
 this.$ = new yy.Convert({expression:$$[$0-5], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 310:
 this.$ = new yy.Convert({expression:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 311:
 this.$ = new yy.Convert({expression:$$[$0-3], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-5]) ; 
break;
case 318:
 this.$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'}); 
break;
case 319:

		  if($$[$0-2].length > 1 && ($$[$0-4].toUpperCase() == 'MAX' || $$[$0-4].toUpperCase() == 'MIN')) {
		  	this.$ = new yy.FuncValue({funcid:$$[$0-4],args:$$[$0-2]});
		  } else {
			this.$ = new yy.AggrValue({aggregatorid: $$[$0-4].toUpperCase(), expression: $$[$0-2].pop(), over:$$[$0]}); 
		  } 

break;
case 320:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-5].toUpperCase(), expression: $$[$0-2], distinct:true, over:$$[$0]}); 
break;
case 321:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-5].toUpperCase(), expression: $$[$0-2],
		 over:$$[$0]}); 
break;
case 323: case 324:
 this.$ = new yy.Over(); yy.extend(this.$,$$[$0-1]); 
break;
case 325:
 this.$ = new yy.Over(); yy.extend(this.$,$$[$0-2]); yy.extend(this.$,$$[$0-1]);
break;
case 326:
 this.$ = {partition:$$[$0]}; 
break;
case 327:
 this.$ = {order:$$[$0]}; 
break;
case 328:
 this.$ = "SUM"; 
break;
case 329:
 this.$ = "COUNT"; 
break;
case 330:
 this.$ = "MIN"; 
break;
case 331: case 529:
 this.$ = "MAX"; 
break;
case 332:
 this.$ = "AVG"; 
break;
case 333:
 this.$ = "FIRST"; 
break;
case 334:
 this.$ = "LAST"; 
break;
case 335:
 this.$ = "AGGR"; 
break;
case 336:
 this.$ = "ARRAY"; 
break;
case 337:

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
case 338:
 this.$ = new yy.FuncValue({ funcid: $$[$0-2] }) 
break;
case 339:
 this.$ = new yy.FuncValue({ funcid: 'IIF', args:$$[$0-1] }) 
break;
case 340:
 this.$ = new yy.FuncValue({ funcid: 'REPLACE', args:$$[$0-1] }) 
break;
case 341:
 this.$ = new yy.FuncValue({ funcid: 'DATEADD', args:[new yy.StringValue({value:$$[$0-5]}),$$[$0-3],$$[$0-1]]}) 
break;
case 342:
 this.$ = new yy.FuncValue({ funcid: 'DATEADD', args:[$$[$0-5],$$[$0-3],$$[$0-1]]}) 
break;
case 343:
 this.$ = new yy.FuncValue({ funcid: 'DATEDIFF', args:[new yy.StringValue({value:$$[$0-5]}),$$[$0-3],$$[$0-1]]}) 
break;
case 344:
 this.$ = new yy.FuncValue({ funcid: 'DATEDIFF', args:[$$[$0-5],$$[$0-3],$$[$0-1]]}) 
break;
case 345:
 this.$ = new yy.FuncValue({ funcid: 'INTERVAL', args:[$$[$0-1],new yy.StringValue({value:($$[$0]).toLowerCase()})]}); 
break;
case 347:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 348:
 this.$ = new yy.NumValue({value:+$$[$0]}); 
break;
case 349:
 this.$ = new yy.LogicValue({value:true}); 
break;
case 350:
 this.$ = new yy.LogicValue({value:false}); 
break;
case 351:
 this.$ = new yy.StringValue({value: $$[$0].substr(1,$$[$0].length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 352:
 this.$ = new yy.StringValue({value: $$[$0].substr(2,$$[$0].length-3).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 353:
 this.$ = new yy.NullValue({value:undefined}); 
break;
case 354:
 this.$ = new yy.VarValue({variable:$$[$0]}); 
break;
case 355:

			if(!yy.exists) yy.exists = [];
			this.$ = new yy.ExistsValue({value:$$[$0-1], existsidx:yy.exists.length}); 
			yy.exists.push($$[$0-1]);

break;
case 356: case 357:
 this.$ = new yy.ParamValue({param: $$[$0]}); 
break;
case 358:

			if(typeof yy.question == 'undefined') yy.question = 0; 
			this.$ = new yy.ParamValue({param: yy.question++}); 

break;
case 359:

			if(typeof yy.question == 'undefined') yy.question = 0; 
			this.$ = new yy.ParamValue({param: yy.question++, array:true}); 

break;
case 360:
 this.$ = new yy.CaseValue({expression:$$[$0-3], whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 361:
 this.$ = new yy.CaseValue({whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 362: case 683: case 684:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 364:
 this.$ = {when: $$[$0-2], then: $$[$0] }; 
break;
case 367:
 this.$ = new yy.Op({left:$$[$0-2], op:'REGEXP', right:$$[$0]}); 
break;
case 368:
 this.$ = new yy.Op({left:$$[$0-2], op:'GLOB', right:$$[$0]}); 
break;
case 369:
 this.$ = new yy.Op({left:$$[$0-2], op:'LIKE', right:$$[$0]}); 
break;
case 370:
 this.$ = new yy.Op({left:$$[$0-4], op:'LIKE', right:$$[$0-2], escape:$$[$0]}); 
break;
case 371:
 this.$ = new yy.Op({left:$$[$0-2], op:'NOT LIKE', right:$$[$0] }); 
break;
case 372:
 this.$ = new yy.Op({left:$$[$0-4], op:'NOT LIKE', right:$$[$0-2], escape:$$[$0] }); 
break;
case 373:
 this.$ = new yy.Op({left:$$[$0-2], op:'||', right:$$[$0]}); 
break;
case 374:
 this.$ = new yy.Op({left:$$[$0-2], op:'+', right:$$[$0]}); 
break;
case 375:
 this.$ = new yy.Op({left:$$[$0-2], op:'-', right:$$[$0]}); 
break;
case 376:
 this.$ = new yy.Op({left:$$[$0-2], op:'*', right:$$[$0]}); 
break;
case 377:
 this.$ = new yy.Op({left:$$[$0-2], op:'/', right:$$[$0]}); 
break;
case 378:
 this.$ = new yy.Op({left:$$[$0-2], op:'%', right:$$[$0]}); 
break;
case 379:
 this.$ = new yy.Op({left:$$[$0-2], op:'^', right:$$[$0]}); 
break;
case 380:
 this.$ = new yy.Op({left:$$[$0-2], op:'>>', right:$$[$0]}); 
break;
case 381:
 this.$ = new yy.Op({left:$$[$0-2], op:'<<', right:$$[$0]}); 
break;
case 382:
 this.$ = new yy.Op({left:$$[$0-2], op:'&', right:$$[$0]}); 
break;
case 383:
 this.$ = new yy.Op({left:$$[$0-2], op:'|', right:$$[$0]}); 
break;
case 384: case 385: case 387:
 this.$ = new yy.Op({left:$$[$0-2], op:'->' , right:$$[$0]}); 
break;
case 386:
 this.$ = new yy.Op({left:$$[$0-4], op:'->' , right:$$[$0-1]}); 
break;
case 388: case 389: case 391:
 this.$ = new yy.Op({left:$$[$0-2], op:'!' , right:$$[$0]}); 
break;
case 390:
 this.$ = new yy.Op({left:$$[$0-4], op:'!' , right:$$[$0-1]}); 
break;
case 392:
 this.$ = new yy.Op({left:$$[$0-2], op:'>' , right:$$[$0]}); 
break;
case 393:
 this.$ = new yy.Op({left:$$[$0-2], op:'>=' , right:$$[$0]}); 
break;
case 394:
 this.$ = new yy.Op({left:$$[$0-2], op:'<' , right:$$[$0]}); 
break;
case 395:
 this.$ = new yy.Op({left:$$[$0-2], op:'<=' , right:$$[$0]}); 
break;
case 396:
 this.$ = new yy.Op({left:$$[$0-2], op:'=' , right:$$[$0]}); 
break;
case 397:
 this.$ = new yy.Op({left:$$[$0-2], op:'==' , right:$$[$0]}); 
break;
case 398:
 this.$ = new yy.Op({left:$$[$0-2], op:'===' , right:$$[$0]}); 
break;
case 399:
 this.$ = new yy.Op({left:$$[$0-2], op:'!=' , right:$$[$0]}); 
break;
case 400:
 this.$ = new yy.Op({left:$$[$0-2], op:'!==' , right:$$[$0]}); 
break;
case 401:
 this.$ = new yy.Op({left:$$[$0-2], op:'!===' , right:$$[$0]}); 
break;
case 402:

			if(!yy.queries) yy.queries = []; 
			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1], queriesidx: yy.queries.length}); 
			yy.queries.push($$[$0-1]);  

break;
case 403:

			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1]}); 

break;
case 404:

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
case 405:
 this.$ = new yy.Op({left:$$[$0-2], op:'OR' , right:$$[$0]}); 
break;
case 406:
 this.$ = new yy.UniOp({op:'NOT' , right:$$[$0]}); 
break;
case 407:
 this.$ = new yy.UniOp({op:'-' , right:$$[$0]}); 
break;
case 408:
 this.$ = new yy.UniOp({op:'+' , right:$$[$0]}); 
break;
case 409:
 this.$ = new yy.UniOp({op:'~' , right:$$[$0]}); 
break;
case 410:
 this.$ = new yy.UniOp({op:'#' , right:$$[$0]}); 
break;
case 411:
 this.$ = new yy.UniOp({right: $$[$0-1]}); 
break;
case 412:

			if(!yy.queries) yy.queries = []; 
			this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);  

break;
case 413:

			if(!yy.queries) yy.queries = []; 
			this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);  

break;
case 414:
 this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1]}); 
break;
case 415:
 this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1]}); 
break;
case 416:
 this.$ = new yy.Op({left: $$[$0-3], op:'IN', right:[]}); 
break;
case 417:
 this.$ = new yy.Op({left: $$[$0-4], op:'NOT IN', right:[]}); 
break;
case 418: case 420:
 this.$ = new yy.Op({left: $$[$0-2], op:'IN', right:$$[$0]}); 
break;
case 419: case 421:
 this.$ = new yy.Op({left: $$[$0-3], op:'NOT IN', right:$$[$0]}); 
break;
case 422:

/*			var expr = $$[$0];
			if(expr.left && expr.left.op == 'AND') {
				this.$ = new yy.Op({left:new yy.Op({left:$$[$0-2], op:'BETWEEN', right:expr.left}), op:'AND', right:expr.right }); 
			} else {
*/
				this.$ = new yy.Op({left:$$[$0-2], op:'BETWEEN1', right:$$[$0] }); 

break;
case 423:

				this.$ = new yy.Op({left:$$[$0-2], op:'NOT BETWEEN1', right:$$[$0] }); 

break;
case 424:
 this.$ = new yy.Op({op:'IS' , left:$$[$0-2], right:$$[$0]}); 
break;
case 425:

			this.$ = new yy.Op({
				op:'IS', 
				left:$$[$0-2], 
				right: new yy.UniOp({
					op:'NOT',
					right:new yy.NullValue({value:undefined}) 
				})
			}); 

break;
case 426:
 this.$ = new yy.Convert({expression:$$[$0-2]}) ; yy.extend(this.$,$$[$0]) ; 
break;
case 427: case 428:
 this.$ = $$[$0];
break;
case 429:
 this.$ = $$[$0-1];
break;
case 436:
 this.$ = 'ALL'; 
break;
case 437:
 this.$ = 'SOME'; 
break;
case 438:
 this.$ = 'ANY'; 
break;
case 439:
 this.$ = new yy.Update({table:$$[$0-4], columns:$$[$0-2], where:$$[$0]}); 
break;
case 440:
 this.$ = new yy.Update({table:$$[$0-2], columns:$$[$0]}); 
break;
case 443:
 this.$ = new yy.SetColumn({column:$$[$0-2], expression:$$[$0]})
break;
case 444:
 this.$ = new yy.SetColumn({variable:$$[$0-2], expression:$$[$0], method:$$[$0-3]})
break;
case 445:
 this.$ = new yy.Delete({table:$$[$0-2], where:$$[$0]});
break;
case 446:
 this.$ = new yy.Delete({table:$$[$0]});
break;
case 447:
 this.$ = new yy.Insert({into:$$[$0-2], values: $$[$0]}); 
break;
case 448: case 449:
 this.$ = new yy.Insert({into:$$[$0-2], values: $$[$0], orreplace:true}); 
break;
case 450:
 this.$ = new yy.Insert({into:$$[$0-2], "default": true}) ; 
break;
case 451:
 this.$ = new yy.Insert({into:$$[$0-5], columns: $$[$0-3], values: $$[$0]}); 
break;
case 452:
 this.$ = new yy.Insert({into:$$[$0-1], select: $$[$0]}); 
break;
case 453:
 this.$ = new yy.Insert({into:$$[$0-1], select: $$[$0], orreplace:true}); 
break;
case 454:
 this.$ = new yy.Insert({into:$$[$0-4], columns: $$[$0-2], select: $$[$0]}); 
break;
case 457:
 this.$ = [$$[$0-1]]; 
break;
case 460:
this.$ = $$[$0-4]; $$[$0-4].push($$[$0-1])
break;
case 461: case 462: case 464: case 472:
this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 473:

			this.$ = new yy.CreateTable({table:$$[$0-4]}); 
			yy.extend(this.$,$$[$0-7]); 
			yy.extend(this.$,$$[$0-6]); 
			yy.extend(this.$,$$[$0-5]); 
			yy.extend(this.$,$$[$0-2]); 
			yy.extend(this.$,$$[$0]); 

break;
case 474:

			this.$ = new yy.CreateTable({table:$$[$0]}); 
			yy.extend(this.$,$$[$0-3]); 
			yy.extend(this.$,$$[$0-2]); 
			yy.extend(this.$,$$[$0-1]); 

break;
case 476:
 this.$ = {class:true}; 
break;
case 486:
 this.$ = {temporary:true}; 
break;
case 488:
 this.$ = {ifnotexists: true}; 
break;
case 489:
 this.$ = {columns: $$[$0-2], constraints: $$[$0]}; 
break;
case 490:
 this.$ = {columns: $$[$0]}; 
break;
case 491:
 this.$ = {as: $$[$0]} 
break;
case 492: case 516:
 this.$ = [$$[$0]];
break;
case 494: case 495: case 496: case 497: case 498:
 $$[$0].constraintid = $$[$0-1]; this.$ = $$[$0]; 
break;
case 501:
 this.$ = {type: 'CHECK', expression: $$[$0-1]}; 
break;
case 502:
 this.$ = {type: 'PRIMARY KEY', columns: $$[$0-1], clustered:($$[$0-3]+'').toUpperCase()}; 
break;
case 503:
 this.$ = {type: 'FOREIGN KEY', columns: $$[$0-5], fktable: $$[$0-2], fkcolumns: $$[$0-1]}; 
break;
case 509:

			this.$ = {type: 'UNIQUE', columns: $$[$0-1], clustered:($$[$0-3]+'').toUpperCase()};

break;
case 518:
 this.$ = new yy.ColumnDef({columnid:$$[$0-2]}); yy.extend(this.$,$$[$0-1]); yy.extend(this.$,$$[$0]);
break;
case 519:
 this.$ = new yy.ColumnDef({columnid:$$[$0-1]}); yy.extend(this.$,$$[$0]); 
break;
case 520:
 this.$ = new yy.ColumnDef({columnid:$$[$0], dbtypeid: ''}); 
break;
case 521:
 this.$ = {dbtypeid: $$[$0-5], dbsize: $$[$0-3], dbprecision: +$$[$0-1]} 
break;
case 522:
 this.$ = {dbtypeid: $$[$0-6]+($$[$0-5]?' '+$$[$0-5]:''), dbsize: $$[$0-3], dbprecision: +$$[$0-1]} 
break;
case 523:
 this.$ = {dbtypeid: $$[$0-3], dbsize: $$[$0-1]} 
break;
case 524:
 this.$ = {dbtypeid: $$[$0-4]+($$[$0-3]?' '+$$[$0-3]:''), dbsize: $$[$0-1]} 
break;
case 525:
 this.$ = {dbtypeid: $$[$0]} 
break;
case 526:
 this.$ = {dbtypeid: $$[$0-1]+($$[$0]?' '+$$[$0]:'')} 
break;
case 527:
 this.$ = {dbtypeid: 'ENUM', enumvalues: $$[$0-1]} 
break;
case 528: case 734:
 this.$ = +$$[$0]; 
break;
case 530:
this.$ = undefined
break;
case 532:

			yy.extend($$[$0-1],$$[$0]); this.$ = $$[$0-1];

break;
case 535:
this.$ = {primarykey:true};
break;
case 536: case 537:
this.$ = {foreignkey:{table:$$[$0-1], columnid: $$[$0]}};
break;
case 538:
 this.$ = {identity: {value:$$[$0-3],step:$$[$0-1]}} 
break;
case 539:
 this.$ = {identity: {value:1,step:1}} 
break;
case 540: case 542:
this.$ = {"default":$$[$0]};
break;
case 541:
this.$ = {"default":$$[$0-1]};
break;
case 543:
this.$ = {null:true}; 
break;
case 544:
this.$ = {notnull:true}; 
break;
case 545:
this.$ = {check:$$[$0]}; 
break;
case 546:
this.$ = {unique:true}; 
break;
case 547:
this.$ = {"onupdate":$$[$0]};
break;
case 548:
this.$ = {"onupdate":$$[$0-1]};
break;
case 549:
 this.$ = new yy.DropTable({tables:$$[$0],type:$$[$0-2]}); yy.extend(this.$, $$[$0-1]); 
break;
case 553:
 this.$ = {ifexists: true};
break;
case 554:
 this.$ = new yy.AlterTable({table:$$[$0-3], renameto: $$[$0]});
break;
case 555:
 this.$ = new yy.AlterTable({table:$$[$0-3], addcolumn: $$[$0]});
break;
case 556:
 this.$ = new yy.AlterTable({table:$$[$0-3], modifycolumn: $$[$0]});
break;
case 557:
 this.$ = new yy.AlterTable({table:$$[$0-5], renamecolumn: $$[$0-2], to: $$[$0]});
break;
case 558:
 this.$ = new yy.AlterTable({table:$$[$0-3], dropcolumn: $$[$0]});
break;
case 559:
 this.$ = new yy.AlterTable({table:$$[$0-2], renameto: $$[$0]});
break;
case 560:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0], engineid:$$[$0-2].toUpperCase() });
break;
case 561:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0-3], engineid:$$[$0-5].toUpperCase(), args:$$[$0-1] });
break;
case 562:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0-2], engineid:$$[$0-4].toUpperCase(), as:$$[$0] });
break;
case 563:
 this.$ = new yy.AttachDatabase({databaseid:$$[$0-5], engineid:$$[$0-7].toUpperCase(), as:$$[$0], args:$$[$0-3]});
break;
case 564:
 this.$ = new yy.DetachDatabase({databaseid:$$[$0]});
break;
case 565:
 this.$ = new yy.CreateDatabase({databaseid:$$[$0] }); yy.extend(this.$,$$[$0]); 
break;
case 566:
 this.$ = new yy.CreateDatabase({engineid:$$[$0-4].toUpperCase(), databaseid:$$[$0-1], as:$$[$0] }); yy.extend(this.$,$$[$0-2]); 
break;
case 567:
 this.$ = new yy.CreateDatabase({engineid:$$[$0-7].toUpperCase(), databaseid:$$[$0-4], args:$$[$0-2], as:$$[$0] }); yy.extend(this.$,$$[$0-5]); 
break;
case 568:
 this.$ = new yy.CreateDatabase({engineid:$$[$0-4].toUpperCase(), 
		    as:$$[$0], args:[$$[$0-1]] }); yy.extend(this.$,$$[$0-2]); 
break;
case 569:
this.$ = undefined;
break;
case 571: case 572:
 this.$ = new yy.UseDatabase({databaseid: $$[$0] });
break;
case 573:
 this.$ = new yy.DropDatabase({databaseid: $$[$0] }); yy.extend(this.$,$$[$0-1]); 
break;
case 574: case 575:
 this.$ = new yy.DropDatabase({databaseid: $$[$0], engineid:$$[$0-3].toUpperCase() }); yy.extend(this.$,$$[$0-1]); 
break;
case 576:
 this.$ = new yy.CreateIndex({indexid:$$[$0-5], table:$$[$0-3], columns:$$[$0-1]})
break;
case 577:
 this.$ = new yy.CreateIndex({indexid:$$[$0-5], table:$$[$0-3], columns:$$[$0-1], unique:true})
break;
case 578:
 this.$ = new yy.DropIndex({indexid:$$[$0]});
break;
case 579:
 this.$ = new yy.ShowDatabases();
break;
case 580:
 this.$ = new yy.ShowDatabases({like:$$[$0]});
break;
case 581:
 this.$ = new yy.ShowDatabases({engineid:$$[$0-1].toUpperCase() });
break;
case 582:
 this.$ = new yy.ShowDatabases({engineid:$$[$0-3].toUpperCase() , like:$$[$0]});
break;
case 583:
 this.$ = new yy.ShowTables();
break;
case 584:
 this.$ = new yy.ShowTables({like:$$[$0]});
break;
case 585:
 this.$ = new yy.ShowTables({databaseid: $$[$0]});
break;
case 586:
 this.$ = new yy.ShowTables({like:$$[$0], databaseid: $$[$0-2]});
break;
case 587:
 this.$ = new yy.ShowColumns({table: $$[$0]});
break;
case 588:
 this.$ = new yy.ShowColumns({table: $$[$0-2], databaseid:$$[$0]});
break;
case 589:
 this.$ = new yy.ShowIndex({table: $$[$0]});
break;
case 590:
 this.$ = new yy.ShowIndex({table: $$[$0-2], databaseid: $$[$0]});
break;
case 591:
 this.$ = new yy.ShowCreateTable({table: $$[$0]});
break;
case 592:
 this.$ = new yy.ShowCreateTable({table: $$[$0-2], databaseid:$$[$0]});
break;
case 593:

			this.$ = new yy.CreateTable({table:$$[$0-6],view:true,select:$$[$0-1],viewcolumns:$$[$0-4]}); 
			yy.extend(this.$,$$[$0-9]); 
			yy.extend(this.$,$$[$0-7]); 

break;
case 594:

			this.$ = new yy.CreateTable({table:$$[$0-3],view:true,select:$$[$0-1]}); 
			yy.extend(this.$,$$[$0-6]); 
			yy.extend(this.$,$$[$0-4]); 

break;
case 598:
 this.$ = new yy.DropTable({tables:$$[$0], view:true}); yy.extend(this.$, $$[$0-1]); 
break;
case 599:
 this.$ = new yy.Help({subject:$$[$0].value.toUpperCase()} ) ; 
break;
case 600:
 this.$ = new yy.Help() ; 
break;
case 601: case 744:
 this.$ = new yy.ExpressionStatement({expression:$$[$0]}); 
break;
case 602:
 this.$ = new yy.Source({url:$$[$0].value}); 
break;
case 603:
 this.$ = new yy.Assert({value:$$[$0]}); 
break;
case 604:
 this.$ = new yy.Assert({value:$$[$0].value}); 
break;
case 605:
 this.$ = new yy.Assert({value:$$[$0], message:$$[$0-2]}); 
break;
case 607: case 618: case 620:
 this.$ = $$[$0].value; 
break;
case 608: case 616:
 this.$ = +$$[$0].value; 
break;
case 609:
 this.$ = (!!$$[$0].value); 
break;
case 617:
 this.$ = ""+$$[$0].value; 
break;
case 623:
 this.$ = $$[$0-1]
break;
case 626:
 this.$ = {}; 
break;
case 629:
 this.$ = []; 
break;
case 630:
 yy.extend($$[$0-2],$$[$0]); this.$ = $$[$0-2]; 
break;
case 632:
 this.$ = {}; this.$[$$[$0-2].substr(1,$$[$0-2].length-2)] = $$[$0]; 
break;
case 633: case 634:
 this.$ = {}; this.$[$$[$0-2]] = $$[$0]; 
break;
case 637:
 this.$ = new yy.SetVariable({variable:$$[$0-1].toLowerCase(), value:$$[$0]});
break;
case 638:
 this.$ = new yy.SetVariable({variable:$$[$0-2], expression:$$[$0], method:$$[$0-3]});
break;
case 639:
 this.$ = new yy.SetVariable({variable:$$[$0-3], props: $$[$0-2], expression:$$[$0], method:$$[$0-4]});
break;
case 640:
this.$ = '@'; 
break;
case 641:
this.$ = '$'; 
break;
case 647:
 this.$ = true; 
break;
case 648:
 this.$ = false; 
break;
case 649:
 this.$ = new yy.CommitTransaction(); 
break;
case 650:
 this.$ = new yy.RollbackTransaction(); 
break;
case 651:
 this.$ = new yy.BeginTransaction(); 
break;
case 652:
 this.$ = new yy.If({expression:$$[$0-2],thenstat:$$[$0-1], elsestat:$$[$0]}); 
			if($$[$0-1].exists) this.$.exists = $$[$0-1].exists;
			if($$[$0-1].queries) this.$.queries = $$[$0-1].queries;

break;
case 653:

			this.$ = new yy.If({expression:$$[$0-1],thenstat:$$[$0]}); 
			if($$[$0].exists) this.$.exists = $$[$0].exists;
			if($$[$0].queries) this.$.queries = $$[$0].queries;

break;
case 654:
this.$ = $$[$0];
break;
case 655:
 this.$ = new yy.While({expression:$$[$0-1],loopstat:$$[$0]}); 
			if($$[$0].exists) this.$.exists = $$[$0].exists;
			if($$[$0].queries) this.$.queries = $$[$0].queries;

break;
case 656:
 this.$ = new yy.Continue(); 
break;
case 657:
 this.$ = new yy.Break(); 
break;
case 658:
 this.$ = new yy.BeginEnd({statements:$$[$0-1]}); 
break;
case 659:
 this.$ = new yy.Print({exprs:$$[$0]});
break;
case 660:
 this.$ = new yy.Print({select:$$[$0]});
break;
case 661:
 this.$ = new yy.Require({paths:$$[$0]}); 
break;
case 662:
 this.$ = new yy.Require({plugins:$$[$0]}); 
break;
case 663: case 664:
this.$ = $$[$0].toUpperCase(); 
break;
case 665:
 this.$ = new yy.Echo({expr:$$[$0]}); 
break;
case 670:
 this.$ = new yy.Declare({declares:$$[$0]}); 
break;
case 673:
 this.$ = {variable: $$[$0-1]}; yy.extend(this.$,$$[$0]); 
break;
case 674:
 this.$ = {variable: $$[$0-2]}; yy.extend(this.$,$$[$0]); 
break;
case 675:
 this.$ = {variable: $$[$0-3], expression:$$[$0]}; yy.extend(this.$,$$[$0-2]);
break;
case 676:
 this.$ = {variable: $$[$0-4], expression:$$[$0]}; yy.extend(this.$,$$[$0-2]);
break;
case 677:
 this.$ = new yy.TruncateTable({table:$$[$0]});
break;
case 678:

			this.$ = new yy.Merge(); yy.extend(this.$,$$[$0-4]); yy.extend(this.$,$$[$0-3]); 
			yy.extend(this.$,$$[$0-2]);
			yy.extend(this.$,{matches:$$[$0-1]});yy.extend(this.$,$$[$0]);

break;
case 679: case 680:
 this.$ = {into: $$[$0]}; 
break;
case 682:
 this.$ = {on:$$[$0]}; 
break;
case 687:
 this.$ = {matched:true, action:$$[$0]} 
break;
case 688:
 this.$ = {matched:true, expr: $$[$0-2], action:$$[$0]} 
break;
case 689:
 this.$ = {delete:true}; 
break;
case 690:
 this.$ = {update:$$[$0]}; 
break;
case 691: case 692:
 this.$ = {matched:false, bytarget: true, action:$$[$0]} 
break;
case 693: case 694:
 this.$ = {matched:false, bytarget: true, expr:$$[$0-2], action:$$[$0]} 
break;
case 695:
 this.$ = {matched:false, bysource: true, action:$$[$0]} 
break;
case 696:
 this.$ = {matched:false, bysource: true, expr:$$[$0-2], action:$$[$0]} 
break;
case 697:
 this.$ = {insert:true, values:$$[$0]}; 
break;
case 698:
 this.$ = {insert:true, values:$$[$0], columns:$$[$0-3]}; 
break;
case 699:
 this.$ = {insert:true, defaultvalues:true}; 
break;
case 700:
 this.$ = {insert:true, defaultvalues:true, columns:$$[$0-3]}; 
break;
case 702:
 this.$ = {output:{columns:$$[$0]}} 
break;
case 703:
 this.$ = {output:{columns:$$[$0-3], intovar: $$[$0], method:$$[$0-1]}} 
break;
case 704:
 this.$ = {output:{columns:$$[$0-2], intotable: $$[$0]}} 
break;
case 705:
 this.$ = {output:{columns:$$[$0-5], intotable: $$[$0-3], intocolumns:$$[$0-1]}} 
break;
case 706:

			this.$ = new yy.CreateVertex({class:$$[$0-3],sharp:$$[$0-2], name:$$[$0-1]}); 
			yy.extend(this.$,$$[$0]); 

break;
case 709:
 this.$ = {sets:$$[$0]}; 
break;
case 710:
 this.$ = {content:$$[$0]}; 
break;
case 711:
 this.$ = {select:$$[$0]}; 
break;
case 712:

			this.$ = new yy.CreateEdge({from:$$[$0-3],to:$$[$0-1],name:$$[$0-5]});
			yy.extend(this.$,$$[$0]); 

break;
case 713:
 this.$ = new yy.CreateGraph({graph:$$[$0]}); 
break;
case 714:
 this.$ = new yy.CreateGraph({from:$$[$0]}); 
break;
case 717:

			this.$ = $$[$0-2]; 
			if($$[$0-1]) this.$.json = new yy.Json({value:$$[$0-1]});
			if($$[$0]) this.$.as = $$[$0];

break;
case 718:

			this.$ = {source:$$[$0-6], target: $$[$0]};
			if($$[$0-3]) this.$.json = new yy.Json({value:$$[$0-3]});
			if($$[$0-2]) this.$.as = $$[$0-2];
			yy.extend(this.$,$$[$0-4]);

break;
case 719:

			this.$ = {source:$$[$0-5], target: $$[$0]};
			if($$[$0-2]) this.$.json = new yy.Json({value:$$[$0-3]});
			if($$[$0-1]) this.$.as = $$[$0-2];

break;
case 720:

			this.$ = {source:$$[$0-2], target: $$[$0]};

break;
case 724:
 this.$ = {vars:$$[$0], method:$$[$0-1]}; 
break;
case 727: case 728:

			var s3 = $$[$0-1];
			this.$ = {prop:$$[$0-3], sharp:$$[$0-2], name:(typeof s3 == 'undefined')?undefined:s3.substr(1,s3.length-2), class:$$[$0]}; 

break;
case 729:

			var s2 = $$[$0-1];
			this.$ = {sharp:$$[$0-2], name:(typeof s2 == 'undefined')?undefined:s2.substr(1,s2.length-2), class:$$[$0]}; 

break;
case 730:

			var s1 = $$[$0-1];
			this.$ = {name:(typeof s1 == 'undefined')?undefined:s1.substr(1,s1.length-2), class:$$[$0]}; 

break;
case 731:

			this.$ = {class:$$[$0]}; 

break;
case 737:
 this.$ = new yy.AddRule({left:$$[$0-2], right:$$[$0]}); 
break;
case 738:
 this.$ = new yy.AddRule({right:$$[$0]}); 
break;
case 741:
 this.$ = new yy.Term({termid:$$[$0]}); 
break;
case 742:
 this.$ = new yy.Term({termid:$$[$0-3],args:$$[$0-1]}); 
break;
case 745:

			this.$ = new yy.CreateTrigger({trigger:$$[$0-6], when:$$[$0-5], action:$$[$0-4], table:$$[$0-2], statement:$$[$0]}); 
			if($$[$0].exists) this.$.exists = $$[$0].exists;
			if($$[$0].queries) this.$.queries = $$[$0].queries;

break;
case 746:

			this.$ = new yy.CreateTrigger({trigger:$$[$0-5], when:$$[$0-4], action:$$[$0-3], table:$$[$0-1], funcid:$$[$0]}); 

break;
case 747:

			this.$ = new yy.CreateTrigger({trigger:$$[$0-6], when:$$[$0-4], action:$$[$0-3], table:$$[$0-5], statement:$$[$0]}); 
			if($$[$0].exists) this.$.exists = $$[$0].exists;
			if($$[$0].queries) this.$.queries = $$[$0].queries;

break;
case 748: case 749: case 751:
 this.$ = 'AFTER'; 
break;
case 750:
 this.$ = 'BEFORE'; 
break;
case 752:
 this.$ = 'INSTEADOF'; 
break;
case 753:
 this.$ = 'INSERT'; 
break;
case 754:
 this.$ = 'DELETE'; 
break;
case 755:
 this.$ = 'UPDATE'; 
break;
case 756:
 this.$ = new yy.DropTrigger({trigger:$$[$0]}); 
break;
case 757:
 this.$ = new yy.Reindex({indexid:$$[$0]});
break;
case 764: case 784: case 786: case 788: case 792: case 794: case 796: case 798: case 800: case 802:
this.$ = [];
break;
case 765: case 779: case 781: case 785: case 787: case 789: case 793: case 795: case 797: case 799: case 801: case 803:
$$[$0-1].push($$[$0]);
break;
case 778: case 780:
this.$ = [$$[$0]];
break;
}
},
table: [o([8,509,510],$V0,{6:1,7:2,10:3,11:4,15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,4:$V1,5:$V2,12:$V3,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),{1:[3]},{8:[1,104],9:105,509:$VH,510:$VI},o($VJ,[2,5]),o($VJ,[2,6]),o($VK,[2,9]),o($VJ,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:108,4:$V1,5:$V2,13:[1,109],51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($VK,[2,11]),o($VK,[2,12]),o($VK,[2,13]),o($VK,[2,14]),o($VK,[2,15]),o($VK,[2,16]),o($VK,[2,17]),o($VK,[2,18]),o($VK,[2,19]),o($VK,[2,20]),o($VK,[2,21]),o($VK,[2,22]),o($VK,[2,23]),o($VK,[2,24]),o($VK,[2,25]),o($VK,[2,26]),o($VK,[2,27]),o($VK,[2,28]),o($VK,[2,29]),o($VK,[2,30]),o($VK,[2,31]),o($VK,[2,32]),o($VK,[2,33]),o($VK,[2,34]),o($VK,[2,35]),o($VK,[2,36]),o($VK,[2,37]),o($VK,[2,38]),o($VK,[2,39]),o($VK,[2,40]),o($VK,[2,41]),o($VK,[2,42]),o($VK,[2,43]),o($VK,[2,44]),o($VK,[2,45]),o($VK,[2,46]),o($VK,[2,47]),o($VK,[2,48]),o($VK,[2,49]),o($VK,[2,50]),o($VK,[2,51]),o($VK,[2,52]),o($VK,[2,53]),o($VK,[2,54]),o($VK,[2,55]),o($VK,[2,56]),o($VK,[2,57]),o($VK,[2,58]),o($VK,[2,59]),o($VK,[2,60]),o($VK,[2,61]),o($VK,[2,62]),o($VK,[2,63]),{343:[1,110]},{3:111,4:$V1,5:$V2},{3:113,4:$V1,5:$V2,153:$VL,197:112,283:$VM,284:$VN,285:$VO,286:$VP},o($VQ,[2,485],{3:120,338:124,4:$V1,5:$V2,131:$VR,132:$VS,184:[1,122],190:[1,121],347:[1,128],394:[1,119],463:[1,123],500:[1,127]}),{142:$VT,440:129,441:130},{180:[1,132]},{394:[1,133]},{3:135,4:$V1,5:$V2,127:[1,141],190:[1,136],343:[1,140],386:137,394:[1,134],399:[1,138],500:[1,139]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:142,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vr1,$Vs1,{331:198,168:[1,199],195:$Vt1}),o($Vr1,$Vs1,{331:201,195:$Vt1}),{3:213,4:$V1,5:$V2,74:$Vu1,129:$Vv1,140:$VY,141:206,142:$VZ,149:$V_,153:$VL,178:$V21,195:[1,204],196:207,197:209,198:208,199:211,206:203,210:$Vw1,211:212,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1,444:202},{3:215,4:$V1,5:$V2},{343:[1,216]},o($Vx1,[2,760],{77:217,103:218,104:[1,219]}),o($Vy1,[2,764],{87:220}),{3:224,4:$V1,5:$V2,187:[1,222],190:[1,225],337:[1,221],343:[1,226],394:[1,223]},{343:[1,227]},{3:230,4:$V1,5:$V2,70:228,72:229},o([297,509,510],$V0,{10:3,11:4,15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,7:232,4:$V1,5:$V2,12:$V3,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,426:[1,231],427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),{426:[1,233]},{426:[1,234]},{3:236,4:$V1,5:$V2,394:[1,235]},{3:238,4:$V1,5:$V2,196:237},o($VK,[2,600],{110:239,129:$VW,289:$Vi1}),o($Vz1,[2,305]),{110:240,129:$VW,289:$Vi1},{3:113,4:$V1,5:$V2,110:246,128:$VV,129:[1,243],140:$VY,141:241,142:$VA1,149:$V_,153:$VL,178:$V21,193:245,197:250,198:249,254:247,255:248,261:$VB1,267:242,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:252,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VK,[2,656]),o($VK,[2,657]),{3:163,4:$V1,5:$V2,38:254,55:160,74:$VU,76:74,86:$V6,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:253,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,181:99,186:$Va,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:261,4:$V1,5:$V2,110:258,129:$VW,289:$Vi1,435:256,436:257,437:259,438:$VC1},{3:262,4:$V1,5:$V2,140:$VD1,142:$VE1,421:263},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:266,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{496:[1,267]},{3:100,4:$V1,5:$V2,495:269,497:268},{3:113,4:$V1,5:$V2,153:$VL,197:270,283:$VM,284:$VN,285:$VO,286:$VP},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:271,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VF1,$VG1,{183:275,161:[1,274],182:[1,272],184:[1,273],192:$VH1}),o($VI1,[2,741],{74:[1,277]}),o($VJ1,[2,148],{146:[1,278],147:[1,279],187:[1,280],188:[1,281],189:[1,282],190:[1,283],191:[1,284]}),o($VK1,[2,1]),o($VK1,[2,2]),{1:[2,3]},o($VJ,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:285,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($VL1,[2,758]),o($VL1,[2,759]),o($VJ,[2,7]),{14:[1,286]},{3:238,4:$V1,5:$V2,196:287},{394:[1,288]},o($VK,[2,744]),{74:$VM1},{74:[1,290]},{74:$VN1},{74:[1,292]},{74:[1,293]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:294,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vr1,$VO1,{340:295,153:$VP1}),{394:[1,297]},{3:298,4:$V1,5:$V2},{190:[1,299]},{3:305,4:$V1,5:$V2,129:$VQ1,134:$VR1,140:$VD1,142:$VE1,149:$VS1,180:[1,301],421:312,464:300,465:302,466:303,469:304,473:309,484:306,488:308},{127:[1,316],339:313,343:[1,315],399:[1,314]},{110:318,129:$VW,180:[2,858],289:$Vi1,462:317},o($VT1,[2,852],{456:319,3:320,4:$V1,5:$V2}),{3:321,4:$V1,5:$V2},o($VQ,[2,486]),o($VK,[2,670],{71:[1,322]}),o($VU1,[2,671]),{3:323,4:$V1,5:$V2},{3:238,4:$V1,5:$V2,196:324},{3:325,4:$V1,5:$V2},o($Vr1,$VV1,{387:326,153:$VW1}),{394:[1,328]},{3:329,4:$V1,5:$V2},o($Vr1,$VV1,{387:330,153:$VW1}),o($Vr1,$VV1,{387:331,153:$VW1}),{3:332,4:$V1,5:$V2},o($VX1,[2,846]),o($VX1,[2,847]),o($VK,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:333,111:349,317:361,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$V12,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,143:$V8,151:$V92,153:$V9,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,186:$Va,262:$Vb,283:$Vc,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($Vz1,[2,284]),o($Vz1,[2,285]),o($Vz1,[2,286]),o($Vz1,[2,287]),o($Vz1,[2,288]),o($Vz1,[2,289]),o($Vz1,[2,290]),o($Vz1,[2,291]),o($Vz1,[2,292]),o($Vz1,[2,293]),o($Vz1,[2,294]),o($Vz1,[2,295]),o($Vz1,[2,296]),o($Vz1,[2,297]),o($Vz1,[2,298]),o($Vz1,[2,299]),{3:163,4:$V1,5:$V2,24:378,25:377,34:373,38:372,55:160,74:$VU,76:74,86:$V6,91:375,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,181:99,186:$Va,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,260:374,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:[1,376],284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,330:$Vf,337:[1,379],409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,303]),o($Vz1,[2,304]),{74:[1,380]},o([4,5,8,51,69,71,73,75,86,90,92,95,96,104,109,112,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vw2,{74:$VM1,113:[1,381]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:382,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:383,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:384,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:385,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:386,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,279]),o([4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,228,229,236,239,240,242,244,246,261,262,263,264,266,273,274,275,276,277,278,279,280,281,283,284,285,286,287,288,289,290,291,293,294,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,319,321,322,323,324,326,329,330,333,337,346,358,359,363,364,385,389,390,393,395,397,398,404,406,407,408,410,414,416,418,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510,511,512],[2,348]),o($Vx2,[2,349]),o($Vx2,[2,350]),o($Vx2,$Vy2),o($Vx2,[2,352]),o([4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,290,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,333,337,346,358,359,363,364,385,389,390,393,395,397,398,406,407,408,410,414,416,418,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,353]),{3:388,4:$V1,5:$V2,128:[1,389],292:387},{3:390,4:$V1,5:$V2},o($Vx2,[2,358]),o($Vx2,[2,359]),{3:391,4:$V1,5:$V2,74:$Vz2,110:393,128:$VV,129:$VW,140:$VY,149:$V_,178:$V21,193:394,198:396,254:395,287:$Vg1,288:$Vh1,289:$Vi1,293:$Vl1,409:397,414:$Vq1},{74:[1,398]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:399,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,295:400,298:401,299:$VA2,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{74:[1,403]},{74:[1,404]},o($VB2,[2,611]),{3:419,4:$V1,5:$V2,74:$VC2,108:414,110:412,128:$VV,129:$VW,140:$VY,141:409,142:$VA1,149:$V_,153:$VL,178:$V21,193:411,197:417,198:416,254:413,255:415,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1,409:185,410:$Vp1,411:405,412:408,413:410,414:$Vq1,417:406,418:[1,407]},{3:420,4:$V1,5:$V2,153:$VL,197:421,283:$VM,284:$VN,285:$VO,286:$VP},{74:[2,328]},{74:[2,329]},{74:[2,330]},{74:[2,331]},{74:[2,332]},{74:[2,333]},{74:[2,334]},{74:[2,335]},{74:[2,336]},{3:427,4:$V1,5:$V2,128:$VD2,129:$VE2,415:422,416:[1,423],419:424},{3:238,4:$V1,5:$V2,196:428},{283:[1,429]},o($Vr1,[2,456]),{3:238,4:$V1,5:$V2,196:430},{228:[1,432],445:431},{228:[2,679]},{3:213,4:$V1,5:$V2,74:$Vu1,129:$Vv1,140:$VY,141:206,142:$VZ,149:$V_,153:$VL,178:$V21,196:207,197:209,198:208,199:211,206:433,210:$Vw1,211:212,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1},{38:434,76:74,86:$V6,181:99,186:$Va},o($VF2,[2,808],{207:435,73:[1,436]}),o($VG2,[2,181],{3:437,4:$V1,5:$V2,73:[1,438],151:[1,439]}),o($VG2,[2,185],{3:440,4:$V1,5:$V2,73:[1,441]}),o($VG2,[2,186],{3:442,4:$V1,5:$V2,73:[1,443]}),o($VG2,[2,189]),o($VG2,[2,190],{3:444,4:$V1,5:$V2,73:[1,445]}),o($VG2,[2,193],{3:446,4:$V1,5:$V2,73:[1,447]}),o([4,5,8,69,71,73,75,90,95,115,125,151,159,165,166,180,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,297,301,509,510],$VH2,{74:$VM1,113:$VI2}),o([4,5,8,69,71,73,75,90,95,115,125,159,165,166,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,297,301,509,510],[2,196]),o($VK,[2,757]),{3:238,4:$V1,5:$V2,196:449},o($VJ2,$VK2,{78:450,195:$VL2}),o($Vx1,[2,761]),o($VM2,[2,774],{105:452,187:[1,453]}),o([8,75,180,297,301,509,510],$VK2,{409:185,78:454,114:455,3:456,111:459,141:481,155:491,157:492,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,109:$VQ2,112:$V_1,113:$V$1,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,195:$VL2,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,410:$Vp1,414:$Vq1}),{343:[1,505]},{180:[1,506]},o($VK,[2,579],{109:[1,507]}),{394:[1,508]},{180:[1,509]},o($VK,[2,583],{109:[1,510],180:[1,511]}),{3:238,4:$V1,5:$V2,196:512},{38:513,71:[1,514],76:74,86:$V6,181:99,186:$Va},o($Vt3,[2,66]),{73:[1,515]},o($VK,[2,651]),{9:105,297:[1,516],509:$VH,510:$VI},o($VK,[2,649]),o($VK,[2,650]),{3:517,4:$V1,5:$V2},o($VK,[2,572]),{143:[1,518]},o([4,5,8,51,69,71,73,74,75,86,92,121,125,143,145,146,151,153,180,184,186,227,262,283,290,297,301,326,329,330,333,337,346,358,359,363,364,385,389,390,391,392,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,505,506,507,508,509,510],$VH2,{113:$VI2}),o($VK,[2,599]),o($VK,[2,602]),o($VK,[2,603]),o($VK,[2,604]),o($VK,$Vy2,{71:[1,519]}),{74:$Vz2,110:393,128:$VV,129:$VW,140:$VY,149:$V_,178:$V21,193:394,198:396,254:395,287:$Vg1,288:$Vh1,289:$Vi1,293:$Vl1,409:397,414:$Vq1},o($Vu3,[2,312]),o($Vu3,[2,313]),o($Vu3,[2,314]),o($Vu3,[2,315]),o($Vu3,[2,316]),o($Vu3,[2,317]),o($Vu3,[2,318]),o($VK,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,111:349,317:361,10:520,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$V12,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,143:$V8,151:$V92,153:$V9,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,186:$Va,262:$Vb,283:$Vc,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($VK,[2,659],{71:$Vv3}),o($VK,[2,660]),o($Vw3,[2,346],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($VK,[2,661],{71:[1,523]}),o($VK,[2,662],{71:[1,524]}),o($VU1,[2,667]),o($VU1,[2,669]),o($VU1,[2,663]),o($VU1,[2,664]),{227:[1,526],420:525,424:[1,527]},{3:528,4:$V1,5:$V2},o($Vr1,[2,640]),o($Vr1,[2,641]),o($VK,[2,601],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{3:100,4:$V1,5:$V2,495:269,497:529},o($VK,[2,738],{71:$Vy3}),o($Vw3,[2,740]),o($VK,[2,743]),o($VK,[2,665],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Vz3,$VG1,{183:531,192:$VH1}),o($Vz3,$VG1,{183:532,192:$VH1}),o($Vz3,$VG1,{183:533,192:$VH1}),o($VA3,[2,804],{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,185:534,171:535,250:536,91:537,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),{74:[1,539],128:$VV,193:538},{3:100,4:$V1,5:$V2,495:269,497:540},o($VJ1,[2,149]),o($VJ1,[2,150]),o($VJ1,[2,151]),o($VJ1,[2,152]),o($VJ1,[2,153]),o($VJ1,[2,154]),o($VJ1,[2,155]),o($VJ,[2,4]),o($VJ,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:541,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),{385:[1,545],390:[1,542],391:[1,543],392:[1,544]},{3:546,4:$V1,5:$V2},o($Vz3,[2,828],{282:547,514:549,75:[1,548],161:[1,551],182:[1,550]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:552,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:553,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:554,4:$V1,5:$V2,129:[1,555]},{3:556,4:$V1,5:$V2,129:[1,557]},{3:558,4:$V1,5:$V2,96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:559,4:$V1,5:$V2},{151:[1,560]},o($VB3,$VO1,{340:561,153:$VP1}),{227:[1,562]},{3:563,4:$V1,5:$V2},o($VK,[2,713],{71:$VC3}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:565,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vw3,[2,716]),o($VD3,[2,860],{409:185,467:566,141:567,136:$VE3,138:$VE3,142:$VA1,410:$Vp1,414:$Vq1}),{136:[1,568],138:[1,569]},o($VF3,$VG3,{481:571,484:572,74:[1,570],134:$VR1}),o($VH3,[2,884],{485:573,129:[1,574]}),o($VI3,[2,888],{487:575,488:576,149:$VS1}),o($VI3,[2,731]),o($VJ3,[2,723]),{3:577,4:$V1,5:$V2,128:[1,578]},{3:579,4:$V1,5:$V2},{3:580,4:$V1,5:$V2},o($Vr1,$VO1,{340:581,153:$VP1}),o($Vr1,$VO1,{340:582,153:$VP1}),o($VX1,[2,475]),o($VX1,[2,476]),{180:[1,583]},{180:[2,859]},o($VK3,[2,854],{457:584,460:585,134:[1,586]}),o($VT1,[2,853]),o($VL3,$VM3,{501:587,92:$VN3,227:[1,588],505:$VO3,506:$VP3,507:$VQ3}),{142:$VT,441:593},{4:$VR3,73:[1,595],265:594,378:$VS3},o($VK,[2,446],{125:[1,598]}),o($VK,[2,564]),{3:599,4:$V1,5:$V2},{291:[1,600]},o($VB3,$VV1,{387:601,153:$VW1}),o($VK,[2,578]),{3:238,4:$V1,5:$V2,196:603,388:602},{3:238,4:$V1,5:$V2,196:603,388:604},o($VK,[2,756]),o($VJ,[2,653],{429:605,301:[1,606]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:607,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:608,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:609,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:610,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:611,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:612,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:613,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:614,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:615,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:616,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:617,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:618,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:619,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:620,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:621,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:622,4:$V1,5:$V2,74:[1,624],128:$VV,153:$VL,193:623,197:625,283:$VM,284:$VN,285:$VO,286:$VP},{3:626,4:$V1,5:$V2,74:[1,628],128:$VV,153:$VL,193:627,197:629,283:$VM,284:$VN,285:$VO,286:$VP},o($VT3,[2,430],{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:630,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),o($VT3,[2,431],{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:631,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),o($VT3,[2,432],{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:632,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),o($VT3,[2,433],{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:633,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),o($VT3,$VU3,{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:634,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:635,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:636,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VT3,[2,435],{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:637,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:638,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:639,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{161:[1,641],163:[1,643],318:640,325:[1,642]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:644,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:645,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:419,4:$V1,5:$V2,74:[1,646],108:649,142:$VV3,153:$VL,197:650,199:648,283:$VM,284:$VN,285:$VO,286:$VP,320:647},{96:[1,652],290:[1,653]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:654,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:655,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:656,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{4:$VR3,265:657,378:$VS3},o($VW3,[2,84]),o($VW3,[2,85]),{75:[1,658]},{75:[1,659]},{75:[1,660]},{75:[1,661],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($Vr1,$Vs1,{331:201,74:$VN1,195:$Vt1}),{75:[2,824]},{75:[2,825]},{131:$VR,132:$VS},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:662,149:$V_,151:$V$,153:$VL,155:162,161:[1,664],176:$V01,177:$V11,178:$V21,182:[1,663],193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:665,4:$V1,5:$V2,146:$VX3,177:[1,667]},o([4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,115,119,125,126,127,128,129,131,132,134,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,304,321,322,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,406],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,323:$Vu2}),o($VY3,[2,407],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,177:$Vd2,306:$Vh2}),o($VY3,[2,408],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,177:$Vd2,306:$Vh2}),o($VZ3,[2,409],{111:349,317:361,306:$Vh2}),o($VZ3,[2,410],{111:349,317:361,306:$Vh2}),o($Vx2,[2,356]),o($Vx2,[2,830]),o($Vx2,[2,831]),o($Vx2,[2,357]),o([4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,228,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,354]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:668,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VB2,[2,607]),o($VB2,[2,608]),o($VB2,[2,609]),o($VB2,[2,610]),o($VB2,[2,612]),{38:669,76:74,86:$V6,181:99,186:$Va},{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,295:670,298:401,299:$VA2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{296:671,297:$V_3,298:672,299:$VA2,301:$V$3},o($V04,[2,363]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:674,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:675,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{4:$VR3,265:676,378:$VS3},o($VB2,[2,613]),{71:[1,678],418:[1,677]},o($VB2,[2,629]),o($V14,[2,636]),o($V24,[2,614]),o($V24,[2,615]),o($V24,[2,616]),o($V24,[2,617]),o($V24,[2,618]),o($V24,[2,619]),o($V24,[2,620]),o($V24,[2,621]),o($V24,[2,622]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:679,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o([4,5,8,51,69,71,73,75,86,90,92,95,96,104,109,112,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,416,418,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],$Vw2,{74:$VM1,113:$V34}),o($V44,[2,306],{74:$VM1}),o($Vz1,[2,307]),{71:[1,682],416:[1,681]},o($VB2,[2,626]),o($V54,[2,631]),{149:[1,683]},{149:[1,684]},{149:[1,685]},{38:689,74:[1,688],76:74,86:$V6,146:[1,686],181:99,186:$Va,333:[1,687]},o($Vr1,$Vs1,{331:690,195:$Vt1}),{146:[1,691]},{227:[1,693],446:692},{3:213,4:$V1,5:$V2,74:$Vu1,129:$Vv1,140:$VY,141:206,142:$VZ,149:$V_,153:$VL,178:$V21,196:207,197:209,198:208,199:211,206:694,210:$Vw1,211:212,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1},{228:[2,680]},{75:[1,695]},o($VG2,[2,810],{208:696,3:697,4:$V1,5:$V2}),o($VF2,[2,809]),o($VG2,[2,179]),{3:698,4:$V1,5:$V2},{209:[1,699]},o($VG2,[2,183]),{3:700,4:$V1,5:$V2},o($VG2,[2,187]),{3:701,4:$V1,5:$V2},o($VG2,[2,191]),{3:702,4:$V1,5:$V2},o($VG2,[2,194]),{3:703,4:$V1,5:$V2},{3:704,4:$V1,5:$V2},{145:[1,705]},o($V64,[2,168],{79:706,180:[1,707]}),{3:213,4:$V1,5:$V2,129:[1,712],140:$VY,142:[1,713],149:$V_,153:$VL,178:$V21,196:708,197:709,198:710,199:711,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1},{3:718,4:$V1,5:$V2,106:714,107:715,108:716,109:$V74},o($VM2,[2,775]),o($V84,[2,766],{88:719,179:720,180:[1,721]}),o($Vy1,[2,765],{150:722,176:$V94,177:$Va4,178:$Vb4}),o([4,5,8,69,71,73,75,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,195,273,274,275,276,277,278,279,280,281,297,301,410,414,509,510],[2,86],{74:[1,726]}),{116:[1,727]},o($Vc4,[2,89]),{3:728,4:$V1,5:$V2},o($Vc4,[2,91]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:729,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:730,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,109:$VQ2,111:459,112:$V_1,113:$V$1,114:732,115:$VR2,119:$VS2,120:$VT2,121:$VU2,122:731,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{74:[1,733]},{74:[1,734]},{74:[1,735]},{74:[1,736]},o($Vc4,[2,100]),o($Vc4,[2,101]),o($Vc4,[2,102]),o($Vc4,[2,103]),o($Vc4,[2,104]),o($Vc4,[2,105]),{3:737,4:$V1,5:$V2},{3:738,4:$V1,5:$V2,130:[1,739]},o($Vc4,[2,109]),o($Vc4,[2,110]),o($Vc4,[2,111]),o($Vc4,[2,112]),o($Vc4,[2,113]),o($Vc4,[2,114]),{3:740,4:$V1,5:$V2,74:$Vz2,110:393,128:$VV,129:$VW,140:$VY,149:$V_,178:$V21,193:394,198:396,254:395,287:$Vg1,288:$Vh1,289:$Vi1,293:$Vl1,409:397,414:$Vq1},{142:[1,741]},{74:[1,742]},{142:[1,743]},o($Vc4,[2,119]),{74:[1,744]},{3:745,4:$V1,5:$V2},{74:[1,746]},{74:[1,747]},{74:[1,748]},{74:[1,749]},{74:[1,750],161:[1,751]},{74:[1,752]},{74:[1,753]},{74:[1,754]},{74:[1,755]},{74:[1,756]},{74:[1,757]},{74:[1,758]},{74:[1,759]},{74:[1,760]},{74:[2,790]},{74:[2,791]},{3:238,4:$V1,5:$V2,196:761},{3:238,4:$V1,5:$V2,196:762},{110:763,129:$VW,289:$Vi1},o($VK,[2,581],{109:[1,764]}),{3:238,4:$V1,5:$V2,196:765},{110:766,129:$VW,289:$Vi1},{3:767,4:$V1,5:$V2},o($VK,[2,677]),o($VK,[2,64]),{3:230,4:$V1,5:$V2,72:768},{74:[1,769]},o($VK,[2,658]),o($VK,[2,571]),{3:718,4:$V1,5:$V2,108:772,140:$Vd4,142:$Ve4,144:770,327:771,328:773},{141:776,142:$VA1,409:185,410:$Vp1,414:$Vq1},o($VK,[2,655]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:777,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VT3,$VU3,{252:143,197:144,253:145,108:146,251:147,193:148,254:149,110:150,255:151,198:152,199:153,256:154,257:155,258:156,141:157,259:158,55:160,155:162,3:163,409:185,91:778,4:$V1,5:$V2,74:$VU,128:$VV,129:$VW,134:$VX,140:$VY,142:$VZ,149:$V_,151:$V$,153:$VL,176:$V01,177:$V11,178:$V21,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,410:$Vp1,414:$Vq1}),{110:779,129:$VW,289:$Vi1},{3:261,4:$V1,5:$V2,437:780,438:$VC1},o($VK,[2,637]),o($VK,[2,647]),o($VK,[2,648]),{111:783,112:$V_1,113:$V$1,121:[1,781],422:782},o($VK,[2,737],{71:$Vy3}),{3:100,4:$V1,5:$V2,495:784},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:537,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,171:785,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,250:536,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:537,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,171:786,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,250:536,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:537,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,171:787,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,250:536,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VA3,[2,147]),o($VA3,[2,805],{71:$Vf4}),o($Vg4,[2,269]),o($Vg4,[2,276],{111:349,317:361,3:790,110:792,4:$V1,5:$V2,73:[1,789],96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,128:[1,791],129:$VW,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,289:$Vi1,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($VF1,[2,806],{194:793,511:[1,794]}),{128:$VV,193:795},{71:$Vy3,75:[1,796]},o($VJ,[2,8]),{145:[1,797],187:[1,798]},{187:[1,799]},{187:[1,800]},{187:[1,801]},o($VK,[2,560],{73:[1,803],74:[1,802]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:804,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vx2,[2,338]),o($Vz3,[2,829]),o($Vz3,[2,826]),o($Vz3,[2,827]),{71:$Vv3,75:[1,805]},{71:$Vv3,75:[1,806]},{71:[1,807]},{71:[1,808]},{71:[1,809]},{71:[1,810]},o($Vx2,[2,345]),o($VK,[2,565]),{291:[1,811]},{3:812,4:$V1,5:$V2,110:813,129:$VW,289:$Vi1},{3:238,4:$V1,5:$V2,196:814},{227:[1,815]},{3:305,4:$V1,5:$V2,129:$VQ1,134:$VR1,140:$VD1,142:$VE1,149:$VS1,421:312,465:816,466:303,469:304,473:309,484:306,488:308},o($VK,[2,714],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Vw3,[2,862],{468:817,474:818,73:$Vh4}),o($VD3,[2,861]),{3:822,4:$V1,5:$V2,129:$VQ1,134:$VR1,141:821,142:$VA1,149:$VS1,409:185,410:$Vp1,414:$Vq1,466:820,484:306,488:308},{3:822,4:$V1,5:$V2,129:$VQ1,134:$VR1,140:$VD1,142:$VE1,149:$VS1,421:312,466:824,469:823,473:309,484:306,488:308},{3:305,4:$V1,5:$V2,129:$VQ1,134:$VR1,140:$VD1,142:$VE1,149:$VS1,421:312,464:825,465:302,466:303,469:304,473:309,484:306,488:308},o($VH3,[2,880],{482:826,129:[1,827]}),o($VF3,[2,879]),o($VI3,[2,886],{486:828,488:829,149:$VS1}),o($VH3,[2,885]),o($VI3,[2,730]),o($VI3,[2,889]),o($VF3,[2,733]),o($VF3,[2,734]),o($VI3,[2,732]),o($VJ3,[2,724]),{3:238,4:$V1,5:$V2,196:830},{3:238,4:$V1,5:$V2,196:831},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:832,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vi4,[2,856],{458:833,110:834,129:$VW,289:$Vi1}),o($VK3,[2,855]),{3:835,4:$V1,5:$V2},{326:$Vj4,329:$Vk4,330:$Vl4,502:836},{3:238,4:$V1,5:$V2,196:840},o($VL3,[2,749]),o($VL3,[2,750]),o($VL3,[2,751]),{126:[1,841]},o($VU1,[2,672]),o($VU1,[2,673],{121:[1,842]}),{4:$VR3,265:843,378:$VS3},o([5,8,51,69,71,73,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,290,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,333,337,346,358,359,363,364,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,525],{4:[1,845],74:[1,844]}),{74:[1,846]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:847,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VK,[2,573]),o($VB3,[2,553]),{3:848,4:$V1,5:$V2,110:849,129:$VW,289:$Vi1},o($VK,[2,549],{71:$Vm4}),o($VU1,[2,551]),o($VK,[2,598],{71:$Vm4}),o($VK,[2,652]),o($VK,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:851,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($Vn4,[2,367],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vn4,[2,368],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vo4,[2,369],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,304:[1,852],306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vo4,[2,371],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,304:[1,853],306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vz1,[2,373],{111:349,317:361}),o($VY3,[2,374],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,177:$Vd2,306:$Vh2}),o($VY3,[2,375],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,177:$Vd2,306:$Vh2}),o($Vp4,[2,376],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,133:$V32,306:$Vh2}),o($Vp4,[2,377],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,133:$V32,306:$Vh2}),o($Vp4,[2,378],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,133:$V32,306:$Vh2}),o([4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,109,115,119,120,121,125,126,127,128,129,130,131,132,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,302,303,304,305,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,379],{111:349,317:361,112:$V_1,113:$V$1,133:$V32,306:$Vh2}),o($Vq4,[2,380],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2}),o($Vq4,[2,381],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2}),o($Vq4,[2,382],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2}),o($Vq4,[2,383],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2}),o($V44,[2,384],{74:$VM1}),o($Vz1,[2,385]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:854,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,387]),o($V44,[2,388],{74:$VM1}),o($Vz1,[2,389]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:855,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,391]),o($Vr4,[2,392],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,393],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,394],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,395],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o([4,5,8,51,69,86,96,121,136,137,143,151,153,167,168,186,262,283,297,301,310,311,312,313,314,315,316,321,322,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,508,509,510],$Vs4,{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,397],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,398],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,399],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,400],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($Vr4,[2,401],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),{74:[1,856]},{74:[2,436]},{74:[2,437]},{74:[2,438]},o($Vt4,[2,404],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,323:$Vu2}),o([4,5,8,51,69,71,73,74,75,86,90,92,95,104,115,119,125,126,127,128,129,131,132,134,140,142,143,145,146,147,149,153,159,161,163,165,166,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,304,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,405],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2}),{3:163,4:$V1,5:$V2,38:857,55:160,74:$VU,75:[1,859],76:74,86:$V6,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:858,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,181:99,186:$Va,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,418]),o($Vz1,[2,420]),o($Vz1,[2,427]),o($Vz1,[2,428]),{3:391,4:$V1,5:$V2,74:[1,860]},{3:419,4:$V1,5:$V2,74:[1,861],108:649,142:$VV3,153:$VL,197:650,199:863,283:$VM,284:$VN,285:$VO,286:$VP,320:862},o($Vz1,[2,425]),o($Vt4,[2,422],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,323:$Vu2}),o($Vt4,[2,423],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,323:$Vu2}),o([4,5,8,51,69,71,73,74,75,86,90,92,95,96,104,115,119,121,125,126,127,128,129,131,132,134,136,137,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,297,299,300,301,304,310,311,312,313,314,315,316,321,322,323,324,326,329,330,337,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,424],{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vz1,[2,426]),o($Vz1,[2,300]),o($Vz1,[2,301]),o($Vz1,[2,302]),o($Vz1,[2,411]),{71:$Vv3,75:[1,864]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:865,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:866,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,$Vu4),o($Vv4,[2,282]),o($Vz1,[2,278]),{75:[1,868],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,869]},{296:870,297:$V_3,298:672,299:$VA2,301:$V$3},{297:[1,871]},o($V04,[2,362]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:872,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,300:[1,873],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{73:[1,874],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{71:[1,875]},o($VB2,[2,627]),{3:419,4:$V1,5:$V2,74:$VC2,108:414,110:412,128:$VV,129:$VW,140:$VY,141:409,142:$VA1,149:$V_,153:$VL,178:$V21,193:411,197:417,198:416,254:413,255:415,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1,409:185,410:$Vp1,412:877,413:410,414:$Vq1,418:[1,876]},{75:[1,878],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:879,4:$V1,5:$V2,146:$VX3},o($VB2,[2,624]),{3:427,4:$V1,5:$V2,128:$VD2,129:$VE2,416:[1,880],419:881},{3:419,4:$V1,5:$V2,74:$VC2,108:414,110:412,128:$VV,129:$VW,140:$VY,141:409,142:$VA1,149:$V_,153:$VL,178:$V21,193:411,197:417,198:416,254:413,255:415,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1,409:185,410:$Vp1,412:882,413:410,414:$Vq1},{3:419,4:$V1,5:$V2,74:$VC2,108:414,110:412,128:$VV,129:$VW,140:$VY,141:409,142:$VA1,149:$V_,153:$VL,178:$V21,193:411,197:417,198:416,254:413,255:415,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1,409:185,410:$Vp1,412:883,413:410,414:$Vq1},{3:419,4:$V1,5:$V2,74:$VC2,108:414,110:412,128:$VV,129:$VW,140:$VY,141:409,142:$VA1,149:$V_,153:$VL,178:$V21,193:411,197:417,198:416,254:413,255:415,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1,409:185,410:$Vp1,412:884,413:410,414:$Vq1},{74:$Vw4,140:$VY,141:887,142:$VA1,149:$V_,178:$V21,198:888,293:$Vl1,332:885,409:185,410:$Vp1,414:$Vq1},{146:[1,889]},{3:718,4:$V1,5:$V2,97:890,108:891},o($Vx4,[2,452]),{3:238,4:$V1,5:$V2,196:892},{74:$Vw4,140:$VY,141:887,142:$VA1,149:$V_,178:$V21,198:888,293:$Vl1,332:893,409:185,410:$Vp1,414:$Vq1},{299:$Vy4,447:894,449:895,450:896},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:898,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{227:[2,681]},o($VG2,[2,177],{3:899,4:$V1,5:$V2,73:[1,900]}),o($VG2,[2,178]),o($VG2,[2,811]),o($VG2,[2,180]),o($VG2,[2,182]),o($VG2,[2,184]),o($VG2,[2,188]),o($VG2,[2,192]),o($VG2,[2,195]),o([4,5,8,51,69,71,73,74,75,86,90,92,95,115,121,125,143,145,146,151,153,159,165,166,180,184,186,203,205,219,220,221,222,223,224,225,226,227,228,229,242,244,262,283,290,297,301,326,329,330,333,337,346,358,359,363,364,385,389,390,391,392,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,505,506,507,508,509,510],[2,197]),{3:901,4:$V1,5:$V2},o($Vz4,[2,762],{80:902,89:903,90:[1,904],95:[1,905]}),{3:213,4:$V1,5:$V2,74:[1,907],129:$Vv1,140:$VY,141:206,142:$VZ,149:$V_,153:$VL,178:$V21,196:207,197:209,198:208,199:211,200:906,206:908,210:$Vw1,211:212,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1},o($VJ2,[2,160]),o($VJ2,[2,161]),o($VJ2,[2,162]),o($VJ2,[2,163]),o($VJ2,[2,164]),{3:391,4:$V1,5:$V2},o($Vx1,[2,79],{71:[1,909]}),o($VA4,[2,81]),o($VA4,[2,82]),{110:910,129:$VW,289:$Vi1},o([8,69,71,75,90,95,115,121,125,159,165,166,180,195,203,205,219,220,221,222,223,224,225,226,229,242,244,297,301,509,510],$Vw2,{113:$V34}),o($V84,[2,69]),o($V84,[2,767]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:911,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vc4,[2,122]),o($Vc4,[2,140]),o($Vc4,[2,141]),o($Vc4,[2,142]),{3:163,4:$V1,5:$V2,55:160,74:$VU,75:[2,782],91:255,108:146,110:150,124:912,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:913,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{74:[1,914]},o($Vc4,[2,90]),o([4,5,8,69,71,73,74,75,115,119,121,125,126,127,128,129,131,132,134,136,137,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,195,273,274,275,276,277,278,279,280,281,297,301,410,414,509,510],[2,92],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o([4,5,8,69,71,73,74,75,109,115,119,121,125,126,127,128,129,131,132,134,136,137,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,178,180,182,184,195,273,274,275,276,277,278,279,280,281,297,301,410,414,509,510],[2,93],{111:349,317:361,96:$VY1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,915],109:$VQ2,111:459,112:$V_1,113:$V$1,114:916,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},o($VB4,[2,778],{150:722,176:$V94,177:$Va4,178:$Vb4}),{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,109:$VQ2,111:459,112:$V_1,113:$V$1,114:918,115:$VR2,119:$VS2,120:$VT2,121:$VU2,123:917,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:919,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:920,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:921,4:$V1,5:$V2},o($Vc4,[2,106]),o($Vc4,[2,107]),o($Vc4,[2,108]),o($Vc4,[2,115]),{3:922,4:$V1,5:$V2},{3:718,4:$V1,5:$V2,108:772,140:$Vd4,142:$Ve4,144:923,327:771,328:773},{3:924,4:$V1,5:$V2},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:925,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vc4,[2,121]),o($VB4,[2,784],{152:926}),o($VB4,[2,786],{154:927}),o($VB4,[2,788],{156:928}),o($VB4,[2,792],{158:929}),o($VC4,$VD4,{160:930,175:931}),{74:[1,932]},o($VB4,[2,794],{162:933}),o($VB4,[2,796],{164:934}),o($VC4,$VD4,{175:931,160:935}),o($VC4,$VD4,{175:931,160:936}),o($VC4,$VD4,{175:931,160:937}),o($VC4,$VD4,{175:931,160:938}),{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,109:$VQ2,111:459,112:$V_1,113:$V$1,114:939,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:537,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,171:940,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,250:536,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VE4,[2,798],{173:941}),o($VK,[2,591],{180:[1,942]}),o($VK,[2,587],{180:[1,943]}),o($VK,[2,580]),{110:944,129:$VW,289:$Vi1},o($VK,[2,589],{180:[1,945]}),o($VK,[2,584]),o($VK,[2,585],{109:[1,946]}),o($Vt3,[2,65]),{38:947,76:74,86:$V6,181:99,186:$Va},o($VK,[2,440],{71:$VF4,125:[1,948]}),o($VG4,[2,441]),{121:[1,950]},{3:951,4:$V1,5:$V2},o($Vr1,[2,832]),o($Vr1,[2,833]),o($VK,[2,605]),o($Vw3,[2,347],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Vr4,$Vs4,{111:349,317:361,109:$VZ1,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,323:$Vu2}),o($VU1,[2,666]),o($VU1,[2,668]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:952,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{111:954,112:$V_1,113:$V$1,121:[1,953]},{3:956,4:$V1,5:$V2,74:$VH4,128:$VI4,423:955},o($Vw3,[2,739]),o($VA3,[2,144],{71:$Vf4}),o($VA3,[2,145],{71:$Vf4}),o($VA3,[2,146],{71:$Vf4}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:537,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,250:959,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:960,4:$V1,5:$V2,110:962,128:[1,961],129:$VW,289:$Vi1},o($Vg4,[2,271]),o($Vg4,[2,273]),o($Vg4,[2,275]),o($VF1,[2,156]),o($VF1,[2,807]),{75:[1,963]},o($VI1,[2,742]),{3:964,4:$V1,5:$V2},{3:965,4:$V1,5:$V2},{3:967,4:$V1,5:$V2,374:966},{3:967,4:$V1,5:$V2,374:968},{3:969,4:$V1,5:$V2},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:970,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:971,4:$V1,5:$V2},{71:$Vv3,75:[1,972]},o($Vx2,[2,339]),o($Vx2,[2,340]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:973,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:974,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:975,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:976,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VB3,[2,488]),o($VK,$VJ4,{396:977,73:$VK4,74:[1,978]}),o($VK,$VJ4,{396:980,73:$VK4}),{74:[1,981]},{3:238,4:$V1,5:$V2,196:982},o($Vw3,[2,715]),o($Vw3,[2,717]),o($Vw3,[2,863]),{140:$VD1,142:$VE1,421:983},o($VL4,[2,864],{409:185,470:984,141:985,142:$VA1,410:$Vp1,414:$Vq1}),{73:$Vh4,136:[2,868],472:986,474:987},o([8,71,73,75,129,136,142,149,297,301,410,414,509,510],$VG3,{481:571,484:572,134:$VR1}),o($Vw3,[2,720]),o($Vw3,$VE3),{71:$VC3,75:[1,988]},o($VI3,[2,882],{483:989,488:990,149:$VS1}),o($VH3,[2,881]),o($VI3,[2,729]),o($VI3,[2,887]),o($VK,[2,474],{74:[1,991]}),{73:[1,993],74:[1,992]},{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,145:[1,994],151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($Vx4,$VM4,{76:74,181:99,459:995,38:998,86:$V6,143:$VN4,186:$Va,461:$VO4}),o($Vi4,[2,857]),o($VK3,[2,707]),{227:[1,999]},o($VP4,[2,753]),o($VP4,[2,754]),o($VP4,[2,755]),o($VL3,$VM3,{501:1000,92:$VN3,505:$VO3,506:$VP3,507:$VQ3}),o($VL3,[2,752]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1001,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VU1,[2,674],{121:[1,1002]}),{128:$VQ4,377:1003,379:$VR4},o([4,5,8,51,69,71,73,75,86,90,92,95,96,104,109,112,113,115,119,120,121,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,145,146,147,149,151,153,159,161,163,165,166,167,168,169,170,172,176,177,178,180,182,184,186,195,203,205,219,220,221,222,223,224,225,226,227,229,236,239,240,242,244,262,273,274,275,276,277,278,279,280,281,283,289,290,297,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,321,322,323,324,326,329,330,333,337,346,358,359,363,364,385,389,390,393,395,397,398,406,407,408,410,414,425,427,428,430,431,432,433,434,438,439,442,443,455,461,496,498,499,508,509,510],[2,526],{74:[1,1006]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1008,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,334:1007,409:185,410:$Vp1,414:$Vq1},o($VK,[2,445],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($VK,[2,574]),o($VK,[2,575]),{3:238,4:$V1,5:$V2,196:1009},o($VK,[2,654]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1010,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1011,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{75:[1,1012],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1013],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:163,4:$V1,5:$V2,38:1014,55:160,74:$VU,76:74,86:$V6,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:1015,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,181:99,186:$Va,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{75:[1,1016]},{71:$Vv3,75:[1,1017]},o($Vz1,[2,416]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1018,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,38:1019,55:160,74:$VU,75:[1,1021],76:74,86:$V6,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:1020,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,181:99,186:$Va,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,419]),o($Vz1,[2,421]),o($Vz1,$VS4,{268:1022,269:$VT4}),{75:[1,1024],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1025],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:1026,4:$V1,5:$V2,177:[1,1027]},o($VB2,[2,606]),o($Vz1,[2,355]),{297:[1,1028]},o($Vz1,[2,361]),{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,297:[2,365],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1029,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{4:$VR3,265:1030,378:$VS3},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1031,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VB2,[2,628]),o($V14,[2,635]),o($V24,[2,623]),o($Vv4,$Vu4),o($VB2,[2,625]),o($V54,[2,630]),o($V54,[2,632]),o($V54,[2,633]),o($V54,[2,634]),o($Vx4,[2,447],{71:$VU4}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1008,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,334:1034,409:185,410:$Vp1,414:$Vq1},o($VV4,[2,458]),o($VV4,[2,459]),o($Vx4,[2,450]),{71:$VW4,75:[1,1035]},o($VX4,[2,471]),{38:1038,76:74,86:$V6,146:[1,1037],181:99,186:$Va},o($Vx4,[2,449],{71:$VU4}),o($VK,[2,701],{448:1039,449:1040,450:1041,299:$Vy4,455:[1,1042]}),o($VY4,[2,685]),o($VY4,[2,686]),{151:[1,1044],451:[1,1043]},{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,299:[2,682],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($VG2,[2,175]),{3:1045,4:$V1,5:$V2},o($VK,[2,559]),o($VZ4,[2,234],{81:1046,125:[1,1047]}),o($Vz4,[2,763]),{74:[1,1048]},{74:[1,1049]},o($V64,[2,165],{201:1050,212:1052,202:1053,213:1054,218:1057,71:$V_4,203:$V$4,205:$V05,219:$V15,220:$V25,221:$V35,222:$V45,223:$V55,224:$V65,225:$V75,226:$V85}),{3:213,4:$V1,5:$V2,38:434,74:$Vu1,76:74,86:$V6,129:$Vv1,140:$VY,141:206,142:$VZ,149:$V_,153:$VL,178:$V21,181:99,186:$Va,196:207,197:209,198:208,199:211,200:1066,206:908,210:$Vw1,211:212,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1},o($VX4,[2,173]),{3:718,4:$V1,5:$V2,107:1067,108:716,109:$V74},o($VA4,[2,83]),o($V84,[2,143],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{75:[1,1068]},{71:$Vv3,75:[2,783]},{3:163,4:$V1,5:$V2,55:160,74:$VU,75:[2,776],91:1073,108:146,110:150,117:1069,118:1070,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,238:1071,239:[1,1072],251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vc4,[2,94]),o($VB4,[2,779],{150:722,176:$V94,177:$Va4,178:$Vb4}),{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1074],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1075,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},o($VB4,[2,780],{150:722,176:$V94,177:$Va4,178:$Vb4}),{75:[1,1076],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1077],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1078]},o($Vc4,[2,116]),{71:$VF4,75:[1,1079]},o($Vc4,[2,118]),{71:$Vv3,75:[1,1080]},{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1081],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1082,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1083],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1084,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1085],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1086,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1087],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1088,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{71:$V95,75:[1,1089]},o($Va5,[2,139],{409:185,3:456,111:459,141:481,155:491,157:492,114:1091,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,109:$VQ2,112:$V_1,113:$V$1,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,410:$Vp1,414:$Vq1}),o($VC4,$VD4,{175:931,160:1092}),{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1093],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1094,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:456,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,75:[1,1095],109:$VQ2,111:459,112:$V_1,113:$V$1,114:1096,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{71:$V95,75:[1,1097]},{71:$V95,75:[1,1098]},{71:$V95,75:[1,1099]},{71:$V95,75:[1,1100]},{75:[1,1101],150:722,176:$V94,177:$Va4,178:$Vb4},{71:$Vf4,75:[1,1102]},{3:456,4:$V1,5:$V2,69:$VN2,71:[1,1103],73:$VO2,74:$VP2,109:$VQ2,111:459,112:$V_1,113:$V$1,114:1104,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,141:481,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,155:491,157:492,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,409:185,410:$Vp1,414:$Vq1},{3:1105,4:$V1,5:$V2},{3:1106,4:$V1,5:$V2},o($VK,[2,582]),{3:1107,4:$V1,5:$V2},{110:1108,129:$VW,289:$Vi1},{75:[1,1109]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1110,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:718,4:$V1,5:$V2,108:772,140:$Vd4,142:$Ve4,327:1111,328:773},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1112,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{121:[1,1113]},o($VK,[2,638],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1114,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:956,4:$V1,5:$V2,74:$VH4,128:$VI4,423:1115},o($Vb5,[2,643]),o($Vb5,[2,644]),o($Vb5,[2,645]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1116,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vg4,[2,268]),o($Vg4,[2,270]),o($Vg4,[2,272]),o($Vg4,[2,274]),o($VF1,[2,157]),o($VK,[2,554]),{145:[1,1117]},o($VK,[2,555]),o($Vw3,[2,520],{265:1118,4:$VR3,376:[1,1119],378:$VS3}),o($VK,[2,556]),o($VK,[2,558]),{71:$Vv3,75:[1,1120]},o($VK,[2,562]),o($Vx2,[2,337]),{71:[1,1121],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{71:[1,1122],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{71:[1,1123],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{71:[1,1124],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($VK,[2,566]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:1125,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:1126,4:$V1,5:$V2},o($VK,[2,568]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1073,108:146,110:150,117:1127,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,238:1071,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{74:[1,1128]},{3:1129,4:$V1,5:$V2},{73:$Vh4,136:[2,866],471:1130,474:1131},o($VL4,[2,865]),{136:[1,1132]},{136:[2,869]},o($Vw3,[2,721]),o($VI3,[2,728]),o($VI3,[2,883]),{3:967,4:$V1,5:$V2,73:[1,1135],341:1133,348:1134,374:1136},{3:718,4:$V1,5:$V2,97:1137,108:891},{38:1138,76:74,86:$V6,181:99,186:$Va},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1139,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vx4,[2,706]),{3:718,4:$V1,5:$V2,108:772,140:$Vd4,142:$Ve4,144:1140,327:771,328:773},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:1141,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vx4,[2,711]),{3:238,4:$V1,5:$V2,196:1142},{326:$Vj4,329:$Vk4,330:$Vl4,502:1143},o($VU1,[2,675],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1144,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{71:[1,1145],75:[1,1146]},o($Va5,[2,528]),o($Va5,[2,529]),{128:$VQ4,377:1147,379:$VR4},{71:$Vc5,75:[1,1148]},o($Va5,[2,463],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($VU1,[2,550]),o($Vn4,[2,370],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vn4,[2,372],{111:349,317:361,112:$V_1,113:$V$1,120:$V02,130:$V22,133:$V32,135:$V42,138:$V72,139:$V82,176:$Vc2,177:$Vd2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2}),o($Vz1,[2,386]),o($Vz1,[2,390]),{75:[1,1150]},{71:$Vv3,75:[1,1151]},o($Vz1,[2,412]),o($Vz1,[2,414]),{75:[1,1152],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1153]},{71:$Vv3,75:[1,1154]},o($Vz1,[2,417]),o($Vz1,[2,319]),{74:[1,1155]},o($Vz1,$VS4,{268:1156,269:$VT4}),o($Vz1,$VS4,{268:1157,269:$VT4}),o($Vv4,[2,280]),o($Vz1,[2,277]),o($Vz1,[2,360]),o($V04,[2,364],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{71:[1,1159],75:[1,1158]},{71:[1,1161],75:[1,1160],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:1026,4:$V1,5:$V2},{74:[1,1162],140:$VY,141:1163,142:$VA1,149:$V_,178:$V21,198:1164,293:$Vl1,409:185,410:$Vp1,414:$Vq1},{71:$Vc5,75:[1,1165]},{38:1167,76:74,86:$V6,146:[1,1166],181:99,186:$Va},{3:718,4:$V1,5:$V2,108:1168},{74:$Vw4,140:$VY,141:887,142:$VA1,149:$V_,178:$V21,198:888,293:$Vl1,332:1169,409:185,410:$Vp1,414:$Vq1},o($Vx4,[2,453]),o($VK,[2,678]),o($VY4,[2,683]),o($VY4,[2,684]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:537,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,171:1170,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,250:536,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{167:[1,1172],300:[1,1171]},{451:[1,1173]},o($VG2,[2,176]),o($Vd5,[2,236],{82:1174,229:[1,1175]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1176,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1177,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:1178,4:$V1,5:$V2},o($V64,[2,166],{213:1054,218:1057,212:1179,202:1180,203:$V$4,205:$V05,219:$V15,220:$V25,221:$V35,222:$V45,223:$V55,224:$V65,225:$V75,226:$V85}),{3:213,4:$V1,5:$V2,74:$Vu1,129:$Vv1,140:$VY,141:206,142:$VZ,149:$V_,153:$VL,178:$V21,196:207,197:209,198:208,199:211,206:1181,210:$Vw1,211:212,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1},o($Ve5,[2,201]),o($Ve5,[2,202]),{3:213,4:$V1,5:$V2,74:[1,1186],140:$VY,141:1184,142:$VZ,149:$V_,153:$VL,178:$V21,196:1183,197:1187,198:1185,199:1188,214:1182,283:$VM,284:$VN,285:$VO,286:$VP,293:$Vl1,409:185,410:$Vp1,414:$Vq1},{204:[1,1189],220:$Vf5},{204:[1,1191],220:$Vg5},o($Vh5,[2,218]),{203:[1,1195],205:[1,1194],218:1193,220:$V25,221:$V35,222:$V45,223:$V55,224:$V65,225:$V75,226:$V85},o($Vh5,[2,220]),{220:[1,1196]},{205:[1,1198],220:[1,1197]},{205:[1,1200],220:[1,1199]},{205:[1,1201]},{220:[1,1202]},{220:[1,1203]},{71:$V_4,201:1204,202:1053,203:$V$4,205:$V05,212:1052,213:1054,218:1057,219:$V15,220:$V25,221:$V35,222:$V45,223:$V55,224:$V65,225:$V75,226:$V85},o($VA4,[2,80]),o($Vc4,[2,96]),{71:$Vi5,75:[1,1205]},{75:[1,1207]},o($Vj5,[2,257]),{75:[2,777]},o($Vj5,[2,259],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,239:[1,1208],240:[1,1209],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Vc4,[2,95]),o($VB4,[2,781],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,97]),o($Vc4,[2,98]),o($Vc4,[2,99]),o($Vc4,[2,117]),o($Vc4,[2,120]),o($Vc4,[2,123]),o($VB4,[2,785],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,124]),o($VB4,[2,787],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,125]),o($VB4,[2,789],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,126]),o($VB4,[2,793],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,127]),o($VC4,[2,800],{174:1210}),o($VC4,[2,803],{150:722,176:$V94,177:$Va4,178:$Vb4}),{71:$V95,75:[1,1211]},o($Vc4,[2,129]),o($VB4,[2,795],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,130]),o($VB4,[2,797],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,131]),o($Vc4,[2,132]),o($Vc4,[2,133]),o($Vc4,[2,134]),o($Vc4,[2,135]),o($Vc4,[2,136]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:255,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,148:1212,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VE4,[2,799],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($VK,[2,592]),o($VK,[2,588]),o($VK,[2,590]),o($VK,[2,586]),o($Vt3,[2,67]),o($VK,[2,439],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($VG4,[2,442]),o($VG4,[2,443],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1213,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VK,[2,639],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Vb5,[2,642]),{75:[1,1214],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{3:1215,4:$V1,5:$V2},o($Vw3,[2,530],{375:1216,380:1217,381:1218,356:1226,151:$Vk5,184:$Vl5,227:$Vm5,290:$Vn5,333:$Vo5,346:$Vp5,358:$Vq5,359:$Vr5,363:$Vs5,364:$Vt5}),o($Vw3,[2,519]),o($VK,[2,561],{73:[1,1230]}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1231,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1232,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1233,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1234,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{71:$Vv3,75:[1,1235]},o($VK,[2,570]),{71:$Vi5,75:[1,1236]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1073,108:146,110:150,117:1237,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,238:1071,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o([8,71,75,136,297,301,509,510],[2,725]),{136:[1,1238]},{136:[2,867]},{3:822,4:$V1,5:$V2,129:$VQ1,134:$VR1,140:$VD1,142:$VE1,149:$VS1,421:312,466:824,469:1239,473:309,484:306,488:308},{75:[1,1240]},{71:[1,1241],75:[2,490]},{38:1242,76:74,86:$V6,181:99,186:$Va},o($Va5,[2,516]),{71:$VW4,75:[1,1243]},o($VK,[2,850],{401:1244,402:1245,69:$Vu5}),o($Vx4,$VM4,{76:74,181:99,111:349,317:361,38:998,459:1247,86:$V6,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,143:$VN4,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,186:$Va,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2,461:$VO4}),o($Vx4,[2,709],{71:$VF4}),o($Vx4,[2,710],{71:$Vv3}),o([8,51,69,86,121,143,153,186,262,283,297,301,326,329,330,337,385,389,390,393,395,397,398,406,407,408,425,427,428,430,431,432,433,434,438,439,442,443,496,498,499,508,509,510],[2,898],{503:1248,3:1249,4:$V1,5:$V2,73:[1,1250]}),o($Vv5,[2,900],{504:1251,73:[1,1252]}),o($VU1,[2,676],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{128:[1,1253]},o($Vw5,[2,523]),{71:[1,1254],75:[1,1255]},o($Vw5,[2,527]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1256,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,402]),o($Vz1,[2,403]),o($Vz1,[2,429]),o($Vz1,[2,413]),o($Vz1,[2,415]),{115:$Vx5,270:1257,271:1258,272:[1,1259]},o($Vz1,[2,320]),o($Vz1,[2,321]),o($Vz1,[2,308]),{128:[1,1261]},o($Vz1,[2,310]),{128:[1,1262]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1008,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,334:1263,409:185,410:$Vp1,414:$Vq1},o($VV4,[2,461]),o($VV4,[2,462]),o($VV4,[2,457]),{74:$Vw4,140:$VY,141:887,142:$VA1,149:$V_,178:$V21,198:888,293:$Vl1,332:1264,409:185,410:$Vp1,414:$Vq1},o($Vx4,[2,454]),o($VX4,[2,472]),o($Vx4,[2,448],{71:$VU4}),o($VK,[2,702],{71:$Vf4,195:[1,1265]}),{326:$Vy5,329:$Vz5,452:1266},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1269,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{116:[1,1271],167:[1,1272],300:[1,1270]},o($VA5,[2,255],{83:1273,115:[1,1274]}),{116:[1,1275]},o($VZ4,[2,235],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{92:[1,1276],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{92:[1,1277]},o($Ve5,[2,199]),o($Ve5,[2,200]),o($VX4,[2,174]),o($Ve5,[2,233],{215:1278,227:[1,1279],228:[1,1280]}),o($VB5,[2,204],{3:1281,4:$V1,5:$V2,73:[1,1282]}),o($VC5,[2,812],{216:1283,73:[1,1284]}),{3:1285,4:$V1,5:$V2,73:[1,1286]},{38:1287,76:74,86:$V6,181:99,186:$Va},o($VB5,[2,212],{3:1288,4:$V1,5:$V2,73:[1,1289]}),o($VB5,[2,215],{3:1290,4:$V1,5:$V2,73:[1,1291]}),{74:[1,1292]},o($Vh5,[2,230]),{74:[1,1293]},o($Vh5,[2,226]),o($Vh5,[2,219]),{220:$Vg5},{220:$Vf5},o($Vh5,[2,221]),o($Vh5,[2,222]),{220:[1,1294]},o($Vh5,[2,224]),{220:[1,1295]},{220:[1,1296]},o($Vh5,[2,228]),o($Vh5,[2,229]),{75:[1,1297],202:1180,203:$V$4,205:$V05,212:1179,213:1054,218:1057,219:$V15,220:$V25,221:$V35,222:$V45,223:$V55,224:$V65,225:$V75,226:$V85},o($Vc4,[2,87]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1073,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,238:1298,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vc4,[2,88]),o($Vj5,[2,260]),{241:[1,1299]},o($Va5,[2,138],{409:185,3:456,111:459,141:481,155:491,157:492,114:1300,4:$V1,5:$V2,69:$VN2,73:$VO2,74:$VP2,109:$VQ2,112:$V_1,113:$V$1,115:$VR2,119:$VS2,120:$VT2,121:$VU2,125:$VV2,126:$VW2,127:$VX2,128:$VY2,129:$VZ2,130:$V_2,131:$V$2,132:$V03,133:$V13,134:$V23,135:$V33,136:$V43,137:$V53,138:$V63,139:$V73,140:$V83,142:$V93,143:$Va3,145:$Vb3,146:$Vc3,147:$Vd3,149:$Ve3,151:$Vf3,153:$Vg3,159:$Vh3,161:$Vi3,163:$Vj3,165:$Vk3,166:$Vl3,167:$Vm3,168:$Vn3,169:$Vo3,170:$Vp3,172:$Vq3,182:$Vr3,184:$Vs3,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,410:$Vp1,414:$Vq1}),o($Vc4,[2,128]),{71:$Vv3,75:[1,1301]},o($VG4,[2,444],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Vb5,[2,646]),o($VK,[2,557]),o($Vw3,[2,518]),o($Vw3,[2,531],{356:1226,381:1302,151:$Vk5,184:$Vl5,227:$Vm5,290:$Vn5,333:$Vo5,346:$Vp5,358:$Vq5,359:$Vr5,363:$Vs5,364:$Vt5}),o($Vu3,[2,533]),{360:[1,1303]},{360:[1,1304]},{3:238,4:$V1,5:$V2,196:1305},o($Vu3,[2,539],{74:[1,1306]}),{3:113,4:$V1,5:$V2,74:[1,1308],110:246,128:$VV,129:$VW,140:$VY,149:$V_,153:$VL,178:$V21,193:245,197:1309,198:249,254:247,255:248,261:$VB1,267:1307,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1},o($Vu3,[2,543]),{290:[1,1310]},o($Vu3,[2,545]),o($Vu3,[2,546]),{326:[1,1311]},{74:[1,1312]},{3:1313,4:$V1,5:$V2},{75:[1,1314],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1315],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1316],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{75:[1,1317],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($VK,$VJ4,{396:1318,73:$VK4}),o($VK,[2,576]),{71:$Vi5,75:[1,1319]},{3:822,4:$V1,5:$V2,129:$VQ1,134:$VR1,140:$VD1,142:$VE1,149:$VS1,421:312,466:824,469:1320,473:309,484:306,488:308},o($Vw3,[2,719]),o($VK,[2,477],{342:1321,344:1322,345:1323,4:$VD5,240:$VE5,333:$VF5,346:$VG5}),o($VH5,$VI5,{3:967,349:1328,374:1329,350:1330,351:1331,4:$V1,5:$V2,357:$VJ5}),{75:[2,491]},{73:[1,1333]},o($VK,[2,594]),o($VK,[2,851]),{358:[1,1335],403:[1,1334]},o($Vx4,[2,712]),o($VK,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:1336,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($VK,[2,746]),o($Vv5,[2,899]),o($VK,$V0,{15:5,16:7,17:8,18:9,19:10,20:11,21:12,22:13,23:14,24:15,25:16,26:17,27:18,28:19,29:20,30:21,31:22,32:23,33:24,34:25,35:26,36:27,37:28,38:29,39:30,40:31,41:32,42:33,43:34,44:35,45:36,46:37,47:38,48:39,49:40,50:41,52:43,53:44,54:45,55:46,56:47,57:48,58:49,59:50,60:51,61:52,62:53,63:54,64:55,65:56,66:57,67:58,68:59,76:74,495:95,181:99,3:100,10:1337,4:$V1,5:$V2,51:$V4,69:$V5,86:$V6,121:$V7,143:$V8,153:$V9,186:$Va,262:$Vb,283:$Vc,326:$Vd,329:$Ve,330:$Vf,337:$Vg,385:$Vh,389:$Vi,390:$Vj,393:$Vk,395:$Vl,397:$Vm,398:$Vn,406:$Vo,407:$Vp,408:$Vq,425:$Vr,427:$Vs,428:$Vt,430:$Vu,431:$Vv,432:$Vw,433:$Vx,434:$Vy,438:$Vz,439:$VA,442:$VB,443:$VC,496:$VD,498:$VE,499:$VF,508:$VG}),o($Vv5,[2,901]),{75:[1,1338]},{128:[1,1339]},o($Vw5,[2,524]),o($Va5,[2,464],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{75:[1,1340],115:$Vx5,271:1341},{75:[1,1342]},{116:[1,1343]},{116:[1,1344]},{75:[1,1345]},{75:[1,1346]},{71:$Vc5,75:[1,1347]},o($Vx4,[2,451],{71:$VU4}),{3:238,4:$V1,5:$V2,140:$VD1,142:$VE1,196:1349,421:1348},o($VY4,[2,687]),o($VY4,[2,689]),{143:[1,1350]},{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,300:[1,1351],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},{330:$VK5,453:1352},{407:[1,1355],454:[1,1354]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1356,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VL5,[2,263],{84:1357,242:[1,1358],244:[1,1359]}),{116:[1,1360]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1366,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,230:1361,232:1362,233:$VM5,234:$VN5,235:$VO5,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:1367,4:$V1,5:$V2},{3:1368,4:$V1,5:$V2},o($Ve5,[2,203]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1369,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:718,4:$V1,5:$V2,97:1370,108:891},o($VB5,[2,205]),{3:1371,4:$V1,5:$V2},o($VB5,[2,814],{217:1372,3:1373,4:$V1,5:$V2}),o($VC5,[2,813]),o($VB5,[2,208]),{3:1374,4:$V1,5:$V2},{75:[1,1375]},o($VB5,[2,213]),{3:1376,4:$V1,5:$V2},o($VB5,[2,216]),{3:1377,4:$V1,5:$V2},{38:1378,76:74,86:$V6,181:99,186:$Va},{38:1379,76:74,86:$V6,181:99,186:$Va},o($Vh5,[2,223]),o($Vh5,[2,225]),o($Vh5,[2,227]),o($V64,[2,167]),o($Vj5,[2,258]),o($Vj5,[2,261],{239:[1,1380]}),o($VC4,[2,801],{150:722,176:$V94,177:$Va4,178:$Vb4}),o($Vc4,[2,137]),o($Vu3,[2,532]),o($Vu3,[2,535]),{364:[1,1381]},o($Vu3,[2,844],{384:1382,382:1383,74:$VP5}),{128:$VV,193:1385},o($Vu3,[2,540]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1386,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vu3,[2,542]),o($Vu3,[2,544]),{3:113,4:$V1,5:$V2,74:[1,1388],110:246,128:$VV,129:$VW,140:$VY,149:$V_,153:$VL,178:$V21,193:245,197:250,198:249,254:247,255:248,261:$VB1,267:1387,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,293:$Vl1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1389,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($VK,[2,563]),o($Vx2,[2,341]),o($Vx2,[2,342]),o($Vx2,[2,343]),o($Vx2,[2,344]),o($VK,[2,567]),o($VK,[2,577]),o($Vw3,[2,718]),o($VK,[2,473]),o($VK,[2,478],{345:1390,4:$VD5,240:$VE5,333:$VF5,346:$VG5}),o($VQ5,[2,480]),o($VQ5,[2,481]),{121:[1,1391]},{121:[1,1392]},{121:[1,1393]},{71:[1,1394],75:[2,489]},o($Va5,[2,517]),o($Va5,[2,492]),{184:[1,1402],190:[1,1403],352:1395,353:1396,354:1397,355:1398,356:1399,358:$Vq5,359:[1,1400],360:[1,1404],363:[1,1401]},{3:1405,4:$V1,5:$V2},{38:1406,76:74,86:$V6,181:99,186:$Va},{404:[1,1407]},{405:[1,1408]},o($VK,[2,745]),o($VK,[2,747]),o($Vw5,[2,521]),{75:[1,1409]},o($Vz1,[2,323]),{75:[1,1410]},o($Vz1,[2,324]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1366,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,230:1411,232:1362,233:$VM5,234:$VN5,235:$VO5,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1073,108:146,110:150,117:1412,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,238:1071,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vz1,[2,309]),o($Vz1,[2,311]),o($VV4,[2,460]),{3:1413,4:$V1,5:$V2},o($VK,[2,704],{74:[1,1414]}),{3:718,4:$V1,5:$V2,108:772,140:$Vd4,142:$Ve4,144:1415,327:771,328:773},{326:$Vy5,329:$Vz5,452:1416},o($VY4,[2,691]),{74:[1,1418],146:[1,1417],333:[1,1419]},{167:[1,1421],300:[1,1420]},{167:[1,1423],300:[1,1422]},{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,300:[1,1424],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($V84,[2,246],{85:1425,159:[1,1426],165:[1,1428],166:[1,1427]}),{128:$VV,193:1429},{128:$VV,193:1430},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1073,108:146,110:150,117:1431,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,238:1071,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},o($Vd5,[2,244],{231:1432,71:$VR5,236:[1,1434]}),o($VS5,[2,238]),{143:[1,1435]},{74:[1,1436]},{74:[1,1437]},o($VS5,[2,243],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{75:[2,768],93:1438,96:[1,1440],99:1439},{96:[1,1441]},o($Ve5,[2,231],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),o($Ve5,[2,232],{71:$VW4}),o($VB5,[2,206]),o($VB5,[2,207]),o($VB5,[2,815]),o($VB5,[2,209]),{3:1442,4:$V1,5:$V2,73:[1,1443]},o($VB5,[2,214]),o($VB5,[2,217]),{75:[1,1444]},{75:[1,1445]},o($Vj5,[2,262]),{3:238,4:$V1,5:$V2,196:1446},o($Vu3,[2,537]),o($Vu3,[2,845]),{3:1447,4:$V1,5:$V2},{71:[1,1448]},{75:[1,1449],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($Vu3,[2,547]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1450,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{75:[1,1451],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($VQ5,[2,479]),{3:1452,4:$V1,5:$V2},{128:$VV,193:1453},{3:1454,4:$V1,5:$V2},o($VH5,$VI5,{351:1331,350:1455,357:$VJ5}),o($Vw3,[2,494]),o($Vw3,[2,495]),o($Vw3,[2,496]),o($Vw3,[2,497]),o($Vw3,[2,498]),{360:[1,1456]},{360:[1,1457]},o($VT5,[2,838],{372:1458,360:[1,1459]}),{3:1460,4:$V1,5:$V2},{3:1461,4:$V1,5:$V2},o($VH5,[2,500]),o($VK,[2,848],{400:1462,402:1463,69:$Vu5}),o($VK,[2,595]),o($VK,[2,596],{357:[1,1464]}),o($Vw5,[2,522]),o($Vz1,[2,325]),o([75,115],[2,326],{71:$VR5}),{71:$Vi5,75:[2,327]},o($VK,[2,703]),{3:718,4:$V1,5:$V2,97:1465,108:891},o($VY4,[2,690],{71:$VF4}),o($VY4,[2,688]),{74:$Vw4,140:$VY,141:887,142:$VA1,149:$V_,178:$V21,198:888,293:$Vl1,332:1466,409:185,410:$Vp1,414:$Vq1},{3:718,4:$V1,5:$V2,97:1467,108:891},{146:[1,1468]},{330:$VK5,453:1469},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1470,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{330:$VK5,453:1471},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1472,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{330:$VK5,453:1473},o($V84,[2,68]),{38:1474,76:74,86:$V6,161:[1,1475],181:99,186:$Va,237:[1,1476]},{38:1477,76:74,86:$V6,181:99,186:$Va,237:[1,1478]},{38:1479,76:74,86:$V6,181:99,186:$Va,237:[1,1480]},o($VL5,[2,266],{243:1481,244:[1,1482]}),{245:1483,246:[2,816],512:[1,1484]},o($VA5,[2,256],{71:$Vi5}),o($Vd5,[2,237]),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1366,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,232:1485,233:$VM5,234:$VN5,235:$VO5,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1486,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{74:[1,1487]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1366,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,230:1488,232:1362,233:$VM5,234:$VN5,235:$VO5,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1366,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,230:1489,232:1362,233:$VM5,234:$VN5,235:$VO5,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{75:[1,1490]},{75:[2,769]},{74:[1,1491]},{74:[1,1492]},o($VB5,[2,210]),{3:1493,4:$V1,5:$V2},{3:1494,4:$V1,5:$V2,73:[1,1495]},{3:1496,4:$V1,5:$V2,73:[1,1497]},o($Vu3,[2,842],{383:1498,382:1499,74:$VP5}),{75:[1,1500]},{128:$VV,193:1501},o($Vu3,[2,541]),{75:[1,1502],96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($Vu3,[2,501]),o($VQ5,[2,482]),o($VQ5,[2,483]),o($VQ5,[2,484]),o($Va5,[2,493]),{3:1504,4:$V1,5:$V2,74:[2,834],361:1503},{74:[1,1505]},{3:1507,4:$V1,5:$V2,74:[2,840],373:1506},o($VT5,[2,839]),{74:[1,1508]},{74:[1,1509]},o($VK,[2,593]),o($VK,[2,849]),o($VH5,$VI5,{351:1331,350:1510,357:$VJ5}),{71:$VW4,75:[1,1511]},o($VY4,[2,697],{71:$VU4}),{71:$VW4,75:[1,1512]},o($VY4,[2,699]),o($VY4,[2,692]),{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,300:[1,1513],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($VY4,[2,695]),{96:$VY1,109:$VZ1,111:349,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,300:[1,1514],302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,317:361,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2},o($VY4,[2,693]),o($V84,[2,247]),{38:1515,76:74,86:$V6,181:99,186:$Va,237:[1,1516]},{38:1517,76:74,86:$V6,181:99,186:$Va},o($V84,[2,249]),{38:1518,76:74,86:$V6,181:99,186:$Va},o($V84,[2,250]),{38:1519,76:74,86:$V6,181:99,186:$Va},o($VL5,[2,264]),{128:$VV,193:1520},{246:[1,1521]},{246:[2,817]},o($VS5,[2,239]),o($Vd5,[2,245],{111:349,317:361,96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1366,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,230:1522,232:1362,233:$VM5,234:$VN5,235:$VO5,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{71:$VR5,75:[1,1523]},{71:$VR5,75:[1,1524]},o($Vz4,[2,770],{94:1525,101:1526,3:1528,4:$V1,5:$V2,73:$VU5}),{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1531,100:1529,102:1530,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:718,4:$V1,5:$V2,97:1532,108:891},o($VB5,[2,211]),o($Ve5,[2,169]),{3:1533,4:$V1,5:$V2},o($Ve5,[2,171]),{3:1534,4:$V1,5:$V2},o($Vu3,[2,536]),o($Vu3,[2,843]),o($Vu3,[2,534]),{75:[1,1535]},o($Vu3,[2,548]),{74:[1,1536]},{74:[2,835]},{3:1538,4:$V1,5:$V2,129:$VV5,362:1537},{74:[1,1540]},{74:[2,841]},{3:718,4:$V1,5:$V2,97:1541,108:891},{3:718,4:$V1,5:$V2,97:1542,108:891},o($VK,[2,597]),o($VK,[2,705]),{146:[1,1543],333:[1,1544]},{330:$VK5,453:1545},{326:$Vy5,329:$Vz5,452:1546},o($V84,[2,248]),{38:1547,76:74,86:$V6,181:99,186:$Va},o($V84,[2,251]),o($V84,[2,253]),o($V84,[2,254]),o($VL5,[2,267]),{128:[2,818],247:1548,513:[1,1549]},{71:$VR5,75:[1,1550]},o($VS5,[2,241]),o($VS5,[2,242]),o($Vz4,[2,70]),o($Vz4,[2,771]),{3:1551,4:$V1,5:$V2},o($Vz4,[2,74]),{71:[1,1553],75:[1,1552]},o($Va5,[2,76]),o($Va5,[2,77],{111:349,317:361,73:[1,1554],96:$VY1,109:$VZ1,112:$V_1,113:$V$1,120:$V02,121:$Vx3,130:$V22,133:$V32,135:$V42,136:$V52,137:$V62,138:$V72,139:$V82,151:$V92,167:$Va2,168:$Vb2,176:$Vc2,177:$Vd2,302:$Ve2,303:$Vf2,305:$Vg2,306:$Vh2,307:$Vi2,308:$Vj2,309:$Vk2,310:$Vl2,311:$Vm2,312:$Vn2,313:$Vo2,314:$Vp2,315:$Vq2,316:$Vr2,321:$Vs2,322:$Vt2,323:$Vu2,324:$Vv2}),{71:$VW4,75:[1,1555]},o($Ve5,[2,170]),o($Ve5,[2,172]),o($Vu3,[2,538]),{3:1538,4:$V1,5:$V2,129:$VV5,362:1556},{71:$VW5,75:[1,1557]},o($Va5,[2,512]),o($Va5,[2,513]),{3:718,4:$V1,5:$V2,97:1559,108:891},{71:$VW4,75:[1,1560]},{71:$VW4,75:[1,1561]},{74:$Vw4,140:$VY,141:887,142:$VA1,149:$V_,178:$V21,198:888,293:$Vl1,332:1562,409:185,410:$Vp1,414:$Vq1},{146:[1,1563]},o($VY4,[2,694]),o($VY4,[2,696]),o($V84,[2,252]),{128:$VV,193:1564},{128:[2,819]},o($VS5,[2,240]),o($Vz4,[2,73]),{75:[2,72]},{3:163,4:$V1,5:$V2,55:160,74:$VU,91:1531,102:1565,108:146,110:150,128:$VV,129:$VW,134:$VX,140:$VY,141:157,142:$VZ,149:$V_,151:$V$,153:$VL,155:162,176:$V01,177:$V11,178:$V21,193:148,197:144,198:152,199:153,251:147,252:143,253:145,254:149,255:151,256:154,257:155,258:156,259:158,261:$V31,262:$Vb,263:$V41,264:$V51,266:$V61,273:$V71,274:$V81,275:$V91,276:$Va1,277:$Vb1,278:$Vc1,279:$Vd1,280:$Ve1,281:$Vf1,283:$VM,284:$VN,285:$VO,286:$VP,287:$Vg1,288:$Vh1,289:$Vi1,290:$Vj1,291:$Vk1,293:$Vl1,294:$Vm1,307:$Vn1,319:$Vo1,409:185,410:$Vp1,414:$Vq1},{3:1566,4:$V1,5:$V2},{75:[1,1567]},{71:$VW5,75:[1,1568]},{364:[1,1569]},{3:1570,4:$V1,5:$V2,129:[1,1571]},{71:$VW4,75:[1,1572]},o($Vw3,[2,510]),o($Vw3,[2,511]),o($VY4,[2,698],{71:$VU4}),o($VY4,[2,700]),o($VX5,[2,820],{248:1573,512:[1,1574]}),o($Va5,[2,75]),o($Va5,[2,78]),o($Vz4,[2,772],{3:1528,98:1575,101:1576,4:$V1,5:$V2,73:$VU5}),o($Vw3,[2,502]),{3:238,4:$V1,5:$V2,196:1577},o($Va5,[2,514]),o($Va5,[2,515]),o($Vw3,[2,509]),o($VL5,[2,822],{249:1578,404:[1,1579]}),o($VX5,[2,821]),o($Vz4,[2,71]),o($Vz4,[2,773]),o($VY5,[2,836],{365:1580,367:1581,74:[1,1582]}),o($VL5,[2,265]),o($VL5,[2,823]),o($Vw3,[2,505],{366:1583,368:1584,227:[1,1585]}),o($VY5,[2,837]),{3:1538,4:$V1,5:$V2,129:$VV5,362:1586},o($Vw3,[2,503]),{227:[1,1588],369:1587},{329:[1,1589]},{71:$VW5,75:[1,1590]},o($Vw3,[2,506]),{326:[1,1591]},{370:[1,1592]},o($VY5,[2,504]),{370:[1,1593]},{371:[1,1594]},{371:[1,1595]},{227:[2,507]},o($Vw3,[2,508])],
defaultActions: {104:[2,3],188:[2,328],189:[2,329],190:[2,330],191:[2,331],192:[2,332],193:[2,333],194:[2,334],195:[2,335],196:[2,336],203:[2,679],318:[2,859],377:[2,824],378:[2,825],433:[2,680],503:[2,790],504:[2,791],641:[2,436],642:[2,437],643:[2,438],694:[2,681],987:[2,869],1072:[2,777],1131:[2,867],1242:[2,491],1439:[2,769],1484:[2,817],1504:[2,835],1507:[2,841],1549:[2,819],1552:[2,72],1594:[2,507]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = new Error();

        throw new _parseError(str, hash);
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
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
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
case 0:return 262
break;
case 1:return 293
break;
case 2:return 410
break;
case 3:return 5
break;
case 4:return 5
break;
case 5:return 289
break;
case 6:return 289
break;
case 7:return 129
break;
case 8:return 129
break;
case 9:return /* return COMMENT */
break;
case 10:/* skip whitespace */
break;
case 11:return 306
break;
case 12:return 309
break;
case 13:yy_.yytext = 'VALUE';return 86
break;
case 14:yy_.yytext = 'VALUE';return 186
break;
case 15:yy_.yytext = 'ROW';return 186
break;
case 16:yy_.yytext = 'COLUMN';return 186
break;
case 17:yy_.yytext = 'MATRIX';return 186
break;
case 18:yy_.yytext = 'INDEX';return 186
break;
case 19:yy_.yytext = 'RECORDSET';return 186
break;
case 20:yy_.yytext = 'TEXT';return 186
break;
case 21:yy_.yytext = 'SELECT';return 186
break;
case 22:return 'ABSOLUTE'
break;
case 23:return 371
break;
case 24:return 391
break;
case 25:return 506
break;
case 26:return 280
break;
case 27:return 161
break;
case 28:return 389
break;
case 29:return 167
break;
case 30:return 226
break;
case 31:return 163
break;
case 32:return 204
break;
case 33:return 281
break;
case 34:return 73
break;
case 35:return 408
break;
case 36:return 239
break;
case 37:return 393
break;
case 38:return 346
break;
case 39:return 277
break;
case 40:return 505
break;
case 41:return 428
break;
case 42:return 321
break;
case 43:return 432
break;
case 44:return 322
break;
case 45:return 305
break;
case 46:return 116
break;
case 47:return 499
break;
case 48:return 294
break;
case 49:return 264
break;
case 50:return 358
break;
case 51:return 127
break;
case 52:return 'CLOSE'
break;
case 53:return 240
break;
case 54:return 187
break;
case 55:return 187
break;
case 56:return 425
break;
case 57:return 357
break;
case 58:return 461
break;
case 59:return 431
break;
case 60:return 266
break;
case 61:return 237
break;
case 62:return 274
break;
case 63:return 337
break;
case 64:return 203
break;
case 65:return 235
break;
case 66:return 261
break;
case 67:return 'CURSOR'
break;
case 68:return 394
break;
case 69:return 284
break;
case 70:return 285
break;
case 71:return 439
break;
case 72:return 333
break;
case 73:return 329
break;
case 74:return 'DELETED'
break;
case 75:return 239
break;
case 76:return 395
break;
case 77:return 182
break;
case 78:return 385
break;
case 79:return 438
break;
case 80:return 132
break;
case 81:return 297
break;
case 82:return 378
break;
case 83:return 301
break;
case 84:return 304
break;
case 85:return 166
break;
case 86:return 499
break;
case 87:return 499
break;
case 88:return 291
break;
case 89:return 12
break;
case 90:return 288
break;
case 91:return 246
break;
case 92:return 278
break;
case 93:return 92
break;
case 94:return 363
break;
case 95:return 180
break;
case 96:return 224
break;
case 97:return 303
break;
case 98:return 510
break;
case 99:return 463
break;
case 100:return 229
break;
case 101:return 233
break;
case 102:return 236
break;
case 103:return 406
break;
case 104:return 153
break;
case 105:return 346
break;
case 106:return 323
break;
case 107:return 96
break;
case 108:return 190
break;
case 109:return 209
break;
case 110:return 221
break;
case 111:return 507
break;
case 112:return 330
break;
case 113:return 210
break;
case 114:return 165
break;
case 115:return 286
break;
case 116:return 195
break;
case 117:return 220
break;
case 118:return 360
break;
case 119:return 279
break;
case 120:return 'LET'
break;
case 121:return 222
break;
case 122:return 109
break;
case 123:return 242
break;
case 124:return 451
break;
case 125:return 188
break;
case 126:return 276
break;
case 127:return 379
break;
case 128:return 275
break;
case 129:return 443
break;
case 130:return 166
break;
case 131:return 392
break;
case 132:return 219
break;
case 133:return 513
break;
case 134:return 263
break;
case 135:return 241
break;
case 136:return 370
break;
case 137:return 151
break;
case 138:return 290
break;
case 139:return 424
break;
case 140:return 227
break;
case 141:return 404
break;
case 142:return 126
break;
case 143:return 244
break;
case 144:return 'OPEN'
break;
case 145:return 405
break;
case 146:return 168
break;
case 147:return 115
break;
case 148:return 205
break;
case 149:return 269
break;
case 150:return 169
break;
case 151:return 272
break;
case 152:return 511
break;
case 153:return 90
break;
case 154:return 14
break;
case 155:return 359
break;
case 156:return 433
break;
case 157:return 'PRIOR'
break;
case 158:return 13
break;
case 159:return 403
break;
case 160:return 191
break;
case 161:return 'REDUCE'
break;
case 162:return 364
break;
case 163:return 302
break;
case 164:return 508
break;
case 165:return 'RELATIVE'
break;
case 166:return 104
break;
case 167:return 390
break;
case 168:return 172
break;
case 169:return 283
break;
case 170:return 434
break;
case 171:return 'RESTORE'
break;
case 172:return 170
break;
case 173:return 170
break;
case 174:return 223
break;
case 175:return 427
break;
case 176:return 234
break;
case 177:return 147
break;
case 178:return 512
break;
case 179:return 394
break;
case 180:return 86
break;
case 181:return 225
break;
case 182:return 143
break;
case 183:return 143
break;
case 184:return 398
break;
case 185:return 325
break;
case 186:return 407
break;
case 187:return 'STRATEGY'
break;
case 188:return 'STORE'
break;
case 189:return 273
break;
case 190:return 343
break;
case 191:return 343
break;
case 192:return 454
break;
case 193:return 347
break;
case 194:return 347
break;
case 195:return 189
break;
case 196:return 300
break;
case 197:return 'TIMEOUT'
break;
case 198:return 145
break;
case 199:return 192
break;
case 200:return 426
break;
case 201:return 426
break;
case 202:return 500
break;
case 203:return 287
break;
case 204:return 442
break;
case 205:return 159
break;
case 206:return 184
break;
case 207:return 95
break;
case 208:return 326
break;
case 209:return 397
break;
case 210:return 228
break;
case 211:return 146
break;
case 212:return 131
break;
case 213:return 399
break;
case 214:return 299
break;
case 215:return 125
break;
case 216:return 430
break;
case 217:return 69
break;
case 218:return 426  /* Is this keyword required? */
break;
case 219:return 128
break;
case 220:return 128
break;
case 221:return 112
break;
case 222:return 134
break;
case 223:return 176
break;
case 224:return 307
break;
case 225:return 177
break;
case 226:return 130
break;
case 227:return 135
break;
case 228:return 316
break;
case 229:return 313
break;
case 230:return 315
break;
case 231:return 312
break;
case 232:return 310
break;
case 233:return 308
break;
case 234:return 309
break;
case 235:return 139
break;
case 236:return 138
break;
case 237:return 136
break;
case 238:return 311
break;
case 239:return 314
break;
case 240:return 137
break;
case 241:return 121
break;
case 242:return 314
break;
case 243:return 74
break;
case 244:return 75
break;
case 245:return 142
break;
case 246:return 414
break;
case 247:return 416
break;
case 248:return 418
break;
case 249:return 496
break;
case 250:return 498
break;
case 251:return 119
break;
case 252:return 113
break;
case 253:return 71
break;
case 254:return 324
break;
case 255:return 149
break;
case 256:return 509
break;
case 257:return 140
break;
case 258:return 178
break;
case 259:return 133
break;
case 260:return 120
break;
case 261:return 319
break;
case 262:return 4
break;
case 263:return 8
break;
case 264:return 'INVALID'
break;
}
},
rules: [/^(?:``([^\`])+``)/i,/^(?:\[\?\])/i,/^(?:@\[)/i,/^(?:\[([^\]])*?\])/i,/^(?:`([^\`])*?`)/i,/^(?:N(['](\\.|[^']|\\')*?['])+)/i,/^(?:X(['](\\.|[^']|\\')*?['])+)/i,/^(?:(['](\\.|[^']|\\')*?['])+)/i,/^(?:(["](\\.|[^"]|\\")*?["])+)/i,/^(?:--(.*?)($|\r\n|\r|\n))/i,/^(?:\s+)/i,/^(?:\|\|)/i,/^(?:\|)/i,/^(?:VALUE\s+OF\s+SEARCH\b)/i,/^(?:VALUE\s+OF\s+SELECT\b)/i,/^(?:ROW\s+OF\s+SELECT\b)/i,/^(?:COLUMN\s+OF\s+SELECT\b)/i,/^(?:MATRIX\s+OF\s+SELECT\b)/i,/^(?:INDEX\s+OF\s+SELECT\b)/i,/^(?:RECORDSET\s+OF\s+SELECT\b)/i,/^(?:TEXT\s+OF\s+SELECT\b)/i,/^(?:SELECT\b)/i,/^(?:ABSOLUTE\b)/i,/^(?:ACTION\b)/i,/^(?:ADD\b)/i,/^(?:AFTER\b)/i,/^(?:AGGR\b)/i,/^(?:ALL\b)/i,/^(?:ALTER\b)/i,/^(?:AND\b)/i,/^(?:ANTI\b)/i,/^(?:ANY\b)/i,/^(?:APPLY\b)/i,/^(?:ARRAY\b)/i,/^(?:AS\b)/i,/^(?:ASSERT\b)/i,/^(?:ASC\b)/i,/^(?:ATTACH\b)/i,/^(?:AUTO(_)?INCREMENT\b)/i,/^(?:AVG\b)/i,/^(?:BEFORE\b)/i,/^(?:BEGIN\b)/i,/^(?:BETWEEN\b)/i,/^(?:BREAK\b)/i,/^(?:NOT\s+BETWEEN\b)/i,/^(?:NOT\s+LIKE\b)/i,/^(?:BY\b)/i,/^(?:CALL\b)/i,/^(?:CASE\b)/i,/^(?:CAST\b)/i,/^(?:CHECK\b)/i,/^(?:CLASS\b)/i,/^(?:CLOSE\b)/i,/^(?:COLLATE\b)/i,/^(?:COLUMN\b)/i,/^(?:COLUMNS\b)/i,/^(?:COMMIT\b)/i,/^(?:CONSTRAINT\b)/i,/^(?:CONTENT\b)/i,/^(?:CONTINUE\b)/i,/^(?:CONVERT\b)/i,/^(?:CORRESPONDING\b)/i,/^(?:COUNT\b)/i,/^(?:CREATE\b)/i,/^(?:CROSS\b)/i,/^(?:CUBE\b)/i,/^(?:CURRENT_TIMESTAMP\b)/i,/^(?:CURSOR\b)/i,/^(?:DATABASE(S)?)/i,/^(?:DATEADD\b)/i,/^(?:DATEDIFF\b)/i,/^(?:DECLARE\b)/i,/^(?:DEFAULT\b)/i,/^(?:DELETE\b)/i,/^(?:DELETED\b)/i,/^(?:DESC\b)/i,/^(?:DETACH\b)/i,/^(?:DISTINCT\b)/i,/^(?:DROP\b)/i,/^(?:ECHO\b)/i,/^(?:EDGE\b)/i,/^(?:END\b)/i,/^(?:ENUM\b)/i,/^(?:ELSE\b)/i,/^(?:ESCAPE\b)/i,/^(?:EXCEPT\b)/i,/^(?:EXEC\b)/i,/^(?:EXECUTE\b)/i,/^(?:EXISTS\b)/i,/^(?:EXPLAIN\b)/i,/^(?:FALSE\b)/i,/^(?:FETCH\b)/i,/^(?:FIRST\b)/i,/^(?:FOR\b)/i,/^(?:FOREIGN\b)/i,/^(?:FROM\b)/i,/^(?:FULL\b)/i,/^(?:GLOB\b)/i,/^(?:GO\b)/i,/^(?:GRAPH\b)/i,/^(?:GROUP\b)/i,/^(?:GROUPING\b)/i,/^(?:HAVING\b)/i,/^(?:HELP\b)/i,/^(?:IF\b)/i,/^(?:IDENTITY\b)/i,/^(?:IS\b)/i,/^(?:IN\b)/i,/^(?:INDEX\b)/i,/^(?:INDEXED\b)/i,/^(?:INNER\b)/i,/^(?:INSTEAD\b)/i,/^(?:INSERT\b)/i,/^(?:INSERTED\b)/i,/^(?:INTERSECT\b)/i,/^(?:INTERVAL\b)/i,/^(?:INTO\b)/i,/^(?:JOIN\b)/i,/^(?:KEY\b)/i,/^(?:LAST\b)/i,/^(?:LET\b)/i,/^(?:LEFT\b)/i,/^(?:LIKE\b)/i,/^(?:LIMIT\b)/i,/^(?:MATCHED\b)/i,/^(?:MATRIX\b)/i,/^(?:MAX(\s+)?(?=\())/i,/^(?:MAX(\s+)?(?=(,|\))))/i,/^(?:MIN(\s+)?(?=\())/i,/^(?:MERGE\b)/i,/^(?:MINUS\b)/i,/^(?:MODIFY\b)/i,/^(?:NATURAL\b)/i,/^(?:NEXT\b)/i,/^(?:NEW\b)/i,/^(?:NOCASE\b)/i,/^(?:NO\b)/i,/^(?:NOT\b)/i,/^(?:NULL\b)/i,/^(?:OFF\b)/i,/^(?:ON\b)/i,/^(?:ONLY\b)/i,/^(?:OF\b)/i,/^(?:OFFSET\b)/i,/^(?:OPEN\b)/i,/^(?:OPTION\b)/i,/^(?:OR\b)/i,/^(?:ORDER\b)/i,/^(?:OUTER\b)/i,/^(?:OVER\b)/i,/^(?:PATH\b)/i,/^(?:PARTITION\b)/i,/^(?:PERCENT\b)/i,/^(?:PIVOT\b)/i,/^(?:PLAN\b)/i,/^(?:PRIMARY\b)/i,/^(?:PRINT\b)/i,/^(?:PRIOR\b)/i,/^(?:QUERY\b)/i,/^(?:READ\b)/i,/^(?:RECORDSET\b)/i,/^(?:REDUCE\b)/i,/^(?:REFERENCES\b)/i,/^(?:REGEXP\b)/i,/^(?:REINDEX\b)/i,/^(?:RELATIVE\b)/i,/^(?:REMOVE\b)/i,/^(?:RENAME\b)/i,/^(?:REPEAT\b)/i,/^(?:REPLACE\b)/i,/^(?:REQUIRE\b)/i,/^(?:RESTORE\b)/i,/^(?:RETURN\b)/i,/^(?:RETURNS\b)/i,/^(?:RIGHT\b)/i,/^(?:ROLLBACK\b)/i,/^(?:ROLLUP\b)/i,/^(?:ROW\b)/i,/^(?:ROWS\b)/i,/^(?:SCHEMA(S)?)/i,/^(?:SEARCH\b)/i,/^(?:SEMI\b)/i,/^(?:SET\b)/i,/^(?:SETS\b)/i,/^(?:SHOW\b)/i,/^(?:SOME\b)/i,/^(?:SOURCE\b)/i,/^(?:STRATEGY\b)/i,/^(?:STORE\b)/i,/^(?:SUM\b)/i,/^(?:TABLE\b)/i,/^(?:TABLES\b)/i,/^(?:TARGET\b)/i,/^(?:TEMP\b)/i,/^(?:TEMPORARY\b)/i,/^(?:TEXTSTRING\b)/i,/^(?:THEN\b)/i,/^(?:TIMEOUT\b)/i,/^(?:TO\b)/i,/^(?:TOP\b)/i,/^(?:TRAN\b)/i,/^(?:TRANSACTION\b)/i,/^(?:TRIGGER\b)/i,/^(?:TRUE\b)/i,/^(?:TRUNCATE\b)/i,/^(?:UNION\b)/i,/^(?:UNIQUE\b)/i,/^(?:UNPIVOT\b)/i,/^(?:UPDATE\b)/i,/^(?:USE\b)/i,/^(?:USING\b)/i,/^(?:VALUE(S)?)/i,/^(?:VERTEX\b)/i,/^(?:VIEW\b)/i,/^(?:WHEN\b)/i,/^(?:WHERE\b)/i,/^(?:WHILE\b)/i,/^(?:WITH\b)/i,/^(?:WORK\b)/i,/^(?:(\d*[.])?\d+[eE]\d+)/i,/^(?:(\d*[.])?\d+)/i,/^(?:->)/i,/^(?:#)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:!===)/i,/^(?:===)/i,/^(?:!==)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:&)/i,/^(?:\|)/i,/^(?:<<)/i,/^(?:>>)/i,/^(?:>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:<)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\))/i,/^(?:@)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\])/i,/^(?::-)/i,/^(?:\?-)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:::)/i,/^(?::)/i,/^(?:;)/i,/^(?:\$)/i,/^(?:\?)/i,/^(?:!)/i,/^(?:\^)/i,/^(?:~)/i,/^(?:[a-zA-Z_][a-zA-Z_0-9]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264],"inclusive":true}}
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
exports.parser = alasqlparser;
exports.Parser = alasqlparser.Parser;
exports.parse = function () { return alasqlparser.parse.apply(alasqlparser, arguments); };
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
   @todo move this functionality to plugin
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
    return '(y='+s+',typeof y=="undefined"?undefined:'+r+')';
}

/**
    Return always true. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {boolean} Always true
*/
function returnTrue () {return true;}

/**
    Return undefined. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {undefined} Always undefined
*/
function returnUndefined() {}

/**
    Escape quotes
    @function
    @param {string} s Source string
    @return {string} Escaped string
    @example

    Piter's => Piter\'s

*/
var escapeq = utils.escapeq = function(s) {

    return s.replace(/\'/g,'\\\'');
};

/**
    Double quotes for SQL statements
    @param {string} s Source string
    @return {string} Escaped string

    @example

    Piter's => Piter''s

 */
var escapeqq = utils.undoubleq = function(s) {
    return s.replace(/(\')/g,'\'\'');
};

/**
    Replace double quotes with single quote
    @param {string} s Source string
    @return {string} Replaced string
    @example

    Piter''s => Piter's

 */
var doubleq = utils.doubleq = function(s) {
    return s.replace(/(\'\')/g,'\\\'');
};

/**
    Replace sigle quote to escaped single quote
    @param {string} s Source string
    @return {string} Replaced string

    @todo Chack this functions

*/
 var doubleqq = utils.doubleqq = function(s) {
    return s.replace(/\'/g,"\'");
};

/**
    Cut BOM first character for UTF-8 files (for merging two files)
    @param {string} s Source string
    @return {string} Replaced string    
*/

var cutbom = function(s) {
    if(s[0] === String.fromCharCode(65279)){
        s = s.substr(1);
    }
    return s;
}

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
    var data, fs;
    if((typeof exports === 'object') || (typeof Meteor !== 'undefined' && Meteor.isServer)) {

        if(typeof Meteor !== 'undefined') {
            /** For Meteor */
            fs = Npm.require('fs');
        } else {
            /** For Node.js */
            fs = require('fs');
        }

        /* If path is empty, than read data from stdin (for Node) */
        if(typeof path === 'undefined') {
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
            if(/^[a-z]+:\/\//i.test(path)) {
                var request = require('request');
                request(path,function(err, response, body) {
                    if(err) {
                        throw err;
                    }
                    success(cutbom(body.toString()));                    
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
                    data = fs.readFileSync(path);
                    success(cutbom(data.toString()));
                }
            }
        }
    } else if(typeof cordova === 'object') {
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

    } else {
        /* For string */
        if(typeof path === "string") {
            // For browser read from tag
            /*
                SELECT * FROM TXT('#one') -- read data from HTML element with id="one" 
            */
            if((path.substr(0,1) === '#') && (typeof document !== 'undefined')) {
                data = document.querySelector(path).textContent;
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
                            if (success){
                                success(cutbom(xhr.responseText));
                            }
                        } else if (error){
                            error(xhr);
                        }
                        // Todo: else...?

                    }
                };
                xhr.open("GET", path, asy); // Async
                xhr.responseType = "text";
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
    var fs;
    if((typeof exports === 'object') || (typeof Meteor !== 'undefined' && Meteor.isServer)) {
        // For Node.js
        if(typeof Meteor !== 'undefined') {
            var fs = Npm.require('fs'); // For Meteor
        } else {
            var fs = require('fs');
        }
    // if(typeof exports == 'object') {
    //     // For Node.js
    //     var fs = require('fs');
        if(/^[a-z]+:\/\//i.test(path)) {
            var request = require('request');
            request({url:path,encoding:null},function(err, response, data) {
                if(err) {
                    throw err;
                }
                var arr = [];
                for(var i = 0; i < data.length; ++i){
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(""));
            });
        } else {
            if(asy) {
                fs.readFile(path,function(err,data){
                    if(err) {
                        throw err;
                    }
                    var arr = [];
                    for(var i = 0; i < data.length; ++i){
                        arr[i] = String.fromCharCode(data[i]);
                    }
                    success(arr.join(""));
                });

            } else {
                var data = fs.readFileSync(path);
                var arr = [];
                for(var i = 0; i < data.length; ++i){
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(""));
            }
        };

    } else {

        if(typeof path === "string") {
            // For browser
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path, asy); // Async
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
                var data = new Uint8Array(xhr.response);
                var arr = [];
                for(var i = 0; i < data.length; ++i){
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(""));
            }
            xhr.responseType = "blob";
            xhr.send();
        } else if(path instanceof Event) {

            var files = path.target.files;
            var reader = new FileReader();
            var name = files[0].name;
            reader.onload = function(e) {
                var data = e.target.result;
                success(data);
            };
            reader.readAsBinaryString(files[0]);    
        } else if(path instanceof Blob) {
        	success(path);
        } 
    }
};

var removeFile = utils.removeFile = function(path,cb) {
    if(typeof exports === 'object') {
        var fs = require('fs');
        fs.remove(path,cb);
    } else if(typeof cordova === 'object') {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                fileEntry.remove(cb);
                cb && cb(); // jshint ignore:line
            }, function(){
                cb && cb(); // jshint ignore:line
            });
        });
    } else {
        throw new Error('You can remove files only in Node.js and Apache Cordova');
    }
};

var deleteFile = utils.deleteFile = function(path,cb){
    if(typeof exports === 'object') {
        var fs = require('fs');
        fs.unlink(path, cb);
    }
};

var fileExists = utils.fileExists = function(path,cb){
    if(typeof exports === 'object') {
        var fs = require('fs');
        fs.exists(path,cb);
    } else if(typeof cordova === 'object') {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                cb(true);
            }, function(){
                cb(false);
            });
        });

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
    if(path === undefined) {
        //
        // Return data into result variable
        // like: alasql('SELECT * INTO TXT() FROM ?',[data]);
        //
        res = data;
        if(cb){
            res = cb(res);
        }
    } else {

        if(typeof exports === 'object') {
            // For Node.js
            var fs = require('fs');
            data = fs.writeFileSync(path,data);
            if(cb){
                res = cb(res);
            }
        } else if(typeof cordova === 'object') {
            // For Apache Cordova
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {

                    fileSystem.root.getFile(path, {create:true}, function (fileEntry) {
                        fileEntry.createWriter(function(fileWriter) {
                            fileWriter.onwriteend = function(){
                                if(cb){
                                    res = cb(res);
                                }
                            }
                            fileWriter.write(data);
                        });                                  
                    });
 //               });
            });

        } else {
        	if(isIE() === 9) {
        		// Solution was taken from 
        		// http://megatuto.com/formation-JAVASCRIPT.php?JAVASCRIPT_Example=Javascript+Save+CSV+file+in+IE+8/IE+9+without+using+window.open()+Categorie+javascript+internet-explorer-8&category=&article=7993

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
	            if(cb){
                    res = cb(res);
                }                		
        	}
        }
    }

    return res;
}

/** 
    @function Is this IE9 
    @return {boolean} True for IE9 and false for other browsers

    For IE9 compatibility issues
*/
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
}

// Fast hash function

/**
  @function Hash string to integer number
  @param {string} str Source string
  @return {integer} hash number
*/

var hash = utils.hash = function hash(str){
    var h = 0;

    if (0 === str.length){
        return h;
    }

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
    a.forEach(function(i){ 
                            if (r.indexOf(i) < 0){ 
                                r.push(i);
                            } 
                        });
    return r;
}

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
            found = found || (ai===bi);
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
    if(null === obj || typeof(obj) !== 'object'){
        return obj;
    }

    if(obj instanceof Date) {
	return new Date(obj);
    }

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = cloneDeep(obj[key]);
        }
    }
    return temp;
};

/**
  Check equality of objects
*/

/**
  COmpare two object in deep
 */
var deepEqual = utils.deepEqual = function(x, y) {
    if (typeof x === "object" && null !== x && (typeof y === "object" && null !== y)) {
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
        }
        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        if (x !== y) {
            return false;
        } else {
            return true;
        }
    }
};
/**
    Array with distinct records
    @param {array} data
    @return {array}
*/
var distinctArray = utils.distinctArray = function(data) {
    var uniq = {};
    // TODO: Speedup, because Object.keys is slow
    for(var i=0,ilen=data.length;i<ilen;i++) {
        var uix;
        if(typeof data[i] === 'object') {
            uix = Object.keys(data[i]).sort().map(function(k){return k+'`'+data[i][k];}).join('`');
        } else {
            uix = data[i];  
        }
        uniq[uix] = data[i];
    }
    var res = [];
    for(var key in uniq){
        res.push(uniq[key]);
    }
    return res;
};

/** 
    Extend object a with properties of b
    @function 
    @param {object} a
    @param {object} b
    @return {object}
*/
var extend = utils.extend = function extend (a,b){
    a = a || {};
    for(var key in b) {
        if(b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
};

/**
   Flat array by first row
 */
var flatArray = utils.flatArray = function(a) {

    if(!a || 0 === a.length){ 
        return [];
    }

    // For recordsets
    if(typeof a === 'object' && a instanceof alasql.Recordset) {
        return a.data.map(function(ai){return ai[a.columns[0].columnid];});
    }
    // Else for other arrays
    var key = Object.keys(a[0])[0];
    if(key === undefined){
        return [];
    }
    return a.map(function(ai) {return ai[key];});
};

/**
  Convert array of objects to array of arrays
 */
var arrayOfArrays = utils.arrayOfArrays = function (a) {
    return a.map(function(aa){
        var ar = [];
        for(var key in aa){
            ar.push(aa[key]);
        }
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
        }
    }
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
  }
};

/**
    SQL LIKE emulation
    @parameter {string} pattern Search pattern
    @parameter {string} value Searched value
    @parameter {string} escape Escape character (optional)
    @return {boolean} If value LIKE pattern ESCAPE escape
*/

var like = utils.like = function (pattern,value,escape) {
    // Verify escape character
    if(!escape) escape = '';

    var i=0;
    var s = '^';

    while(i<pattern.length) {
      var c = pattern[i], c1 = '';
      if(i<pattern.length-1) c1 = pattern[i+1];

      if(c === escape) {
        s += '\\'+c1;
        i++;
      } else if(c==='[' && c1 === '^') {
        s += '[^';
        i++;
      } else if(c==='[' || c===']' ) {
        s += c;
      } else if(c==='%') {
        s += '.*';
      } else if(c === '_') {
        s += '.';
      } else if('/.*+?|(){}'.indexOf(c)>-1) {
        s += '\\'+c;
      } else {
        s += c;
      }
      i++;
    }

    s += '$';

    return (value||'').toUpperCase().search(RegExp(s.toUpperCase()))>-1;
   };

utils.glob = function (value,pattern) {

    var i=0;
    var s = '^';

    while(i<pattern.length) {
      var c = pattern[i], c1 = '';
      if(i<pattern.length-1) c1 = pattern[i+1];

      if(c==='[' && c1 === '^') {
        s += '[^';
        i++;
      } else if(c==='[' || c===']' ) {
        s += c;
      } else if(c==='*') {
        s += '.*';
      } else if(c === '?') {
        s += '.';
      } else if('/.*+?|(){}'.indexOf(c)>-1) {
        s += '\\'+c;
      } else {
        s += c;
      }
      i++;
    }

    s += '$';
    return (value||'').toUpperCase().search(RegExp(s.toUpperCase()))>-1;
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

		// When checking for quote escaping, we also need to check that the
		// escape sign itself is not escaped, as otherwise '\\' would cause
		// the wrong impression of an unclosed string:
		var unescaped = str[i - 1] !== '\\' || str[i - 2] === '\\';

		if (quote) {
			if (str[i] === quoteSign && unescaped){
				quote = false;
			}

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
			if (str[i + 1] === '\n' || str[i + 1] === '\r'){
				lineComment = false;
			}
			str[i] = '';
		} else {
			if (str[i] === '"' || str[i] === "'") {
				quote = true;
				quoteSign = str[i];
			} else if (str[i] === '[' && str[i-1] !== "@") {
				quote = true;
				quoteSign = ']';
			// } else if (str[i] === '-' &&  str[i + 1] === '-') {
			// 	str[i] = '';
			// 	lineComment = true;
			} else if (str[i] === '/' && str[i + 1] === '*') {
					// Do not filter out conditional comments /*@ ... */
					// and comments marked as protected /*! ... */

					str[i] = '';
					blockComment = true;

			}
		}
	}
	// Remove padding again.
	str = str.join('').slice(2, -2);

	return str;
};

/**
	Database class for Alasql.js
*/

// Initial parameters

/**
	Jison parser
*/
alasql.parser = alasqlparser;

alasql.parser.parseError = function(str, hash){
	throw new Error("Have you used a reserved keyword without `escaping` it?\n"+str);	
}

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
	return alasqlparser.parse(alasql.utils.uncomment(sql));
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

alasql.options.joinstar = 'overwrite'; // Option for SELECT * FROM a,b

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
	if(!databaseid){
		databaseid = alasql.DEFAULTDATABASEID;
	}
	if(alasql.useid === databaseid){
		return;
	}
	alasql.useid = databaseid;
	var db = alasql.databases[alasql.useid];
	alasql.tables = db.tables;
//	alasql.fn = db.fn;
	db.resetSqlCache();
	if(alasql.options.usedbo) {
	    alasql.databases.dbo = db; // Operator???
	}

};

/**
 Run single SQL statement on current database
 */
alasql.exec = function (sql, params, cb, scope) {
	delete alasql.error;
	params = params || {};
	if(alasql.options.errorlog){
		try {
			return alasql.dexec(alasql.useid, sql, params, cb, scope);
		} catch(err){
			alasql.error = err;
			if(cb){ 
				cb(null,alasql.error);
			}
		}
	} else {
		return alasql.dexec(alasql.useid, sql, params, cb, scope);
	}
};

/**
 Run SQL statement on specific database
 */
alasql.dexec = function (databaseid, sql, params, cb, scope) {
	var db = alasql.databases[databaseid];
//	if(db.databaseid != databaseid) console.trace('got!');

	var hh;
	// Create hash
	if(alasql.options.cache) {
		hh = hash(sql);
		var statement = db.sqlCache[hh];
		// If database structure was not changed sinse lat time return cache
		if(statement && db.dbversion === statement.dbversion) {
			return statement(params, cb);
		}
	}

	// Create AST
	var ast = alasql.parse(sql);
	if(!ast.statements){
		return;
	}
	if(0 === ast.statements.length){
		return 0;
	}
	else if(1 === ast.statements.length) {
		if(ast.statements[0].compile) {

			// Compile and Execute
			var statement = ast.statements[0].compile(databaseid);
			if(!statement){
				return;
			}
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

	if(useid !== databaseid){
		alasql.use(databaseid);
	}

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
	}
	if(useid !== databaseid){
		alasql.use(useid);
	}

	if(cb){
		cb(res);
	}

	alasql.res = res;

	return res;
};

/**
  Run multiple statements and return array of results async
 */
alasql.adrun = function (databaseid, ast, params, cb, scope) {
//	alasql.busy++;
	var useid = alasql.useid;
	if(useid !== databaseid) {
		alasql.use(databaseid);
	}
	var res = [];

	function adrunone(data) {
		if(data !== undefined){ 
			res.push(data);
		}
		var astatement = ast.statements.shift();
		if(!astatement) {
			if(useid !== databaseid){
				alasql.use(useid);
			}
			cb(res);

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

	adrunone(); /** @todo Check, why data is empty here */
};

/**
 Compile statement to JavaScript function
 @param {string} sql SQL statement
 @param {string} databaseid Database identificator
 @return {functions} Compiled statement functions
*/
alasql.compile = function(sql, databaseid) {

	databaseid = databaseid || alasql.useid;

	var ast = alasql.parse(sql); // Create AST

	if(1 === ast.statements.length) {
		var statement = ast.statements[0].compile(databaseid)
		statement.promise = function(params){
		    return new Promise(function(resolve, reject){
		        statement(params, function(data,err) {
		             if(err) {
		                 reject(err);
		             } else {
		                 resolve(data);
		             }
		        });
		    });
		};

		return statement;

	} else {
		throw new Error('Cannot compile, because number of statements in SQL is not equal to 1');
	}
};

//
// Promises for AlaSQL
//

if(typeof exports === 'object') {
	var Promise = require('es6-promise').Promise;
} else if(typeof window === 'object') {
	var Promise = window.Promise;
}

//
// Only for browsers with Promise support
//
//if(typeof window !== 'undefined' && typeof window.Promise === 'function') {
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
//}

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

				self = alasql.databases[databaseid];

				alasql.databases[databaseid] = self;

			if(!self) {
				throw new Error('Database "'+databaseid+'" not found');
			}
		} else {
			// Create new database (or get alasql?)
			self = alasql.databases.alasql;
			// For SQL Server examples, USE tempdb
			if(alasql.options.tsql){
				alasql.databases.tempdb = alasql.databases.alasql;
			}

		}
	}
	if(!databaseid) {
		databaseid = "db"+(alasql.databasenum++); // Random name
	}

	// Step 1
	self.databaseid = databaseid;
	alasql.databases[databaseid] = self;
	self.dbversion = 0;

	//Steps 2-5
	self.tables = {};
	self.views = {};
	self.triggers = {};
	self.indices = {};

	// Step 6: Objects storage
	self.objects = {};
	self.counter = 0;

	self.resetSqlCache();
	return self;
};

/**
    Reset SQL statements cache
 */

Database.prototype.resetSqlCache = function () {
	this.sqlCache = {}; // Cache for compiled SQL statements
	this.sqlCacheSize = 0;	
}

// Main SQL function

/**
    Run SQL statement on database
    @param {string} sql SQL statement
    @param [object] params Parameters
    @param {function} cb callback
 */

Database.prototype.exec = function(sql, params, cb) {
	return alasql.dexec(this.databaseid, sql, params, cb);
};

// Aliases like MS SQL

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

	return alasql.dexec(this.databaseid,sql,params,cb);
};

Transaction.prototype.executeSQL = Transaction.prototype.exec;

/*
//
// Table class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class
var Table = alasql.Table = function(params){

	// Step 1: Data array
	this.data = [];

	// Step 2: Columns
	this.columns = [];
	this.xcolumns = {};

	// Step 3: indices
	this.inddefs = {};
	this.indices = {};
	this.uniqs = {};
	this.uniqdefs = {};	

	// Step 4: identities
	this.identities = {};

	// Step 5: checkfn...
	this.checkfn = [];
	this.checkfns = []; // For restore... to be done...

	// Step 6: INSERT/DELETE/UPDATE

	// Step 7: Triggers...
	// Create trigger hubs
	this.beforeinsert = {};
	this.afterinsert = {};
	this.insteadofinsert = {};

	this.beforedelete = {};
	this.afterdelete = {};
	this.insteadofdelete = {};

	this.beforeupdate = {};
	this.afterupdate = {};
	this.insteadofupdate = {};

	// Done
	extend(this,params);
};

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

/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

var yy = alasqlparser.yy = alasql.yy = {};

// Utility
yy.extend = extend;
// Option for case sensitive
yy.casesensitive = alasql.options.casesensitive; 

// Base class for all yy classes
var Base = yy.Base = function (params) { return yy.extend(this, params); };

Base.prototype.toString = function() {}
Base.prototype.toType = function() {}
Base.prototype.toJS = function() {}

Base.prototype.compile = returnUndefined;
Base.prototype.exec = function() {}

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
	return this.statements.map(function(st){return st.toString()}).join('; ');
};

// Compile array of statements into single statement
yy.Statements.prototype.compile = function(db) {
	var statements = this.statements.map(function(st){
		return st.compile(db)
	});
	if(statements.length === 1) {
		return statements[0];	
	} else {
		return function(params, cb){
			var res = statements.map(function(st){ return st(params); });
			if(cb){
				cb(res);
			}
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

function doSearch(databaseid, params, cb) {
	var res;
	var stope = {};
	var fromdata;
	var selectors = cloneDeep(this.selectors);

	function processSelector(selectors,sidx,value) {

		var 
			val,	// temp values use many places
			nest, 	// temp value used many places
			r,		// temp value used many places
			sel = selectors[sidx];

		var SECURITY_BREAK = 100000;

		if(sel.selid) {
			// TODO Process Selector
			if(sel.selid === 'PATH') {
				var queue = [{node:value,stack:[]}];
				var visited = {};
				//var path = [];
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

						}
					} else {
						if(typeof visited[node.$id] !== 'undefined') {
							continue;
						} else {

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
			} if(sel.selid === 'NOT') {
				var nest = processSelector(sel.args,0,value);

				if(nest.length>0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors,sidx+1,value);
					}
				}
			} else if(sel.selid === 'DISTINCT') {
				var nest;
				if(typeof sel.args === 'undefined' || sel.args.length === 0) {
					nest = distinctArray(value);
				} else {
					nest = processSelector(sel.args,0,value);
				}
				if(nest.length === 0) {
					return [];
				} else {
					var res = distinctArray(nest);
					if(sidx+1+1 > selectors.length) {
						return res;
					} else {
						return processSelector(selectors,sidx+1,res);
					}
				}
			} else if(sel.selid === 'AND') {
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
			} else if(sel.selid === 'OR') {
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
			} else if(sel.selid === 'ALL') {
				var nest = processSelector(sel.args[0],0,value);
				if(nest.length === 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors,sidx+1,nest);
					}
				}
			} else if(sel.selid === 'ANY') {
				var nest = processSelector(sel.args[0],0,value);

				if(nest.length === 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [nest[0]];
					} else {
						return processSelector(selectors,sidx+1,[nest[0]]);
					}
				}
			} else if(sel.selid === 'UNIONALL') {
				var nest = [];
				sel.args.forEach(function(se){
					nest = nest.concat(processSelector(se,0,value));
				});
				if(nest.length === 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors,sidx+1,nest);
					}
				}
			} else if(sel.selid === 'UNION') {
				var nest = [];
				sel.args.forEach(function(se){
					nest = nest.concat(processSelector(se,0,value));
				});
				var nest = distinctArray(nest);
				if(nest.length === 0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors,sidx+1,nest);
					}
				}
			} else 	if(sel.selid === 'IF') {
				var nest = processSelector(sel.args,0,value);

				if(nest.length===0) {
					return [];
				} else {
					if(sidx+1+1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors,sidx+1,value);
					}
				}
			} else 	if(sel.selid === 'REPEAT') {

				var 
					lvar, 
					lmax,
					lmin = sel.args[0].value;
				if(!sel.args[1]) {
					lmax = lmin; // Add security break
				} else {
					lmax = sel.args[1].value;
				}
				if(sel.args[2]) {
					lvar = sel.args[2].variable;
				} 
				//var lsel = sel.sels;

				var retval = [];

				if (lmin === 0) {
					if(sidx+1+1 > selectors.length) {
						retval = [value];
					} else {
						if(lvar){
							alasql.vars[lvar] = 0;
						}
						retval = retval.concat(processSelector(selectors,sidx+1,value));
					}
				}

					// var nests = processSelector(sel.sels,0,value).slice();
				if(lmax > 0) {
					var nests = [{value:value,lvl:1}];

					var i = 0;
					while (nests.length > 0) {

						var nest = nests[0];

						nests.shift();
						if(nest.lvl <= lmax) {
							if(lvar){
								alasql.vars[lvar] = nest.lvl;
							}

							var nest1 = processSelector(sel.sels,0,nest.value);

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
					}

				}
				return retval;
			} else if(sel.selid ==='OF') {
				if(sidx+1+1 > selectors.length) {
					return [value];
				} else {
					var r1 = [];
					Object.keys(value).forEach(function(keyv){
						alasql.vars[sel.args[0].variable] = keyv;
						r1 = r1.concat(processSelector(selectors,sidx+1,value[keyv]));
					});
					return r1;
				}
			} else 	if(sel.selid ==='TO') {

				var oldv = alasql.vars[sel.args[0]];
				var newv = [];
				if(oldv !== undefined) {

					newv = oldv.slice(0);

				} else {
					newv = [];
				}
				newv.push(value);

				if(sidx+1+1 > selectors.length) {
					return [value];
				} else {
					alasql.vars[sel.args[0]] = newv;
					var r1 = processSelector(selectors,sidx+1,value);

					alasql.vars[sel.args[0]] = oldv;
					return r1;
				}

			} else if(sel.selid === 'ARRAY') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					val = nest;
				} else {
					return [];
				}
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else if(sel.selid === 'SUM') {
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
			} else if(sel.selid === 'AVG') {
				nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					val = nest.reduce(function(sum, current) {
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
			} else if(sel.selid === 'COUNT') {
				nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					val = nest.length;
				} else {
					return [];
				}
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid === 'FIRST') {
				nest = processSelector(sel.args,0,value);
				if(nest.length > 0){
					val = nest[0];
				} else { 
					return [];
				}

				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid === 'LAST') {
				nest = processSelector(sel.args,0,value);
				if(nest.length > 0) {
					val = nest[nest.length-1];
				} else {
					return [];
				}

				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else if(sel.selid === 'MIN') {
				nest = processSelector(sel.args,0,value);
				if(nest.length === 0){
					return [];
				}
				var val = nest.reduce(function(min, current) {
  					return Math.min(min,current);
				}, Infinity);
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid === 'MAX') {
				var nest = processSelector(sel.args,0,value);
				if(nest.length === 0){
					return [];
				}
				var val = nest.reduce(function(max, current) {
  					return Math.max(max,current);
				}, -Infinity);
				if(sidx+1+1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors,sidx+1,val);
				}
			} else 	if(sel.selid === 'PLUS') {
				var retval = [];

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

					var nest = nests.shift();

					nest = processSelector(sel.args,0,nest);

					nests = nests.concat(nest);

					if(sidx+1+1 > selectors.length) {
						retval = retval.concat(nest);
						//return retval;
					} else {
						nest.forEach(function(n){

							var rn = processSelector(selectors,sidx+1,n);

							retval = retval.concat(rn);
						});
					}

					// Security brake
					i++;
					if(i>SECURITY_BREAK) {
						throw new Error('Security brake. Number of iterations = '+i);
					}
				}
				return retval;

			} else 	if(sel.selid === 'STAR') {
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

					nest = processSelector(sel.args,0,nest);

					nests = nests.concat(nest);

					if(sidx+1+1 <= selectors.length) {
						nest.forEach(function(n){
							retval = retval.concat(processSelector(selectors,sidx+1,n));
						});
					}

					// Security brake
					i++;
					if(i>SECURITY_BREAK) {
						throw new Error('Loop brake. Number of iterations = '+i);
					}
				}

				return retval;
			} else 	if(sel.selid === 'QUESTION') {
				var retval = [];
				retval = retval.concat(processSelector(selectors,sidx+1,value))
				var nest = processSelector(sel.args,0,value);
				if(sidx+1+1 <= selectors.length) {
					nest.forEach(function(n){
						retval = retval.concat(processSelector(selectors,sidx+1,n));
					});
				}
				return retval;
			} else if(sel.selid === 'WITH') {
				var nest = processSelector(sel.args,0,value);

				if(nest.length===0) {
					return [];
				} else {

					var r = {status:1,values:nest};
				}
			} else if(sel.selid === 'ROOT') {
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

		} else {
			throw new Error('Selector not found');
		}

		if(typeof r === 'undefined') {
			r = {status: 1, values: [value]};
		}

		var res = [];
		if(r.status === 1) {

			var arr = r.values;

			if(sidx+1+1 > selectors.length) {

				res = arr;					

			} else {
				for(var i=0;i<r.values.length;i++) {
					res = res.concat(processSelector(selectors,sidx+1,arr[i]));									
				}
			}
		}
		return res;
	}

	if(selectors !== undefined && selectors.length > 0) {

		if(selectors && selectors[0] && selectors[0].srchid === 'PROP' && selectors[0].args && selectors[0].args[0]) {

			if(selectors[0].args[0].toUpperCase() === 'XML') {
				stope.mode = 'XML';
				selectors.shift();
			} else if(selectors[0].args[0].toUpperCase() === 'HTML') {
				stope.mode = 'HTML';
				selectors.shift();
			} else if(selectors[0].args[0].toUpperCase() === 'JSON') {
				stope.mode = 'JSON';
				selectors.shift();
			}
		}
		if(selectors.length > 0 && selectors[0].srchid === 'VALUE') {
			stope.value = true;
			selectors.shift();
		}
	}

	if(this.from instanceof yy.Column) {
		var dbid = this.from.databaseid || databaseid;
		fromdata = alasql.databases[dbid].tables[this.from.columnid].data;
		//selectors.unshift({srchid:'CHILD'});
	} else if(
				this.from instanceof yy.FuncValue &&				 
				alasql.from[this.from.funcid.toUpperCase()]
			) {
		var args = this.from.args.map(function(arg){
		var as = arg.toJS();

		var fn = new Function('params,alasql','var y;return '+as).bind(this);
		return fn(params,alasql);
		});

		fromdata = alasql.from[this.from.funcid.toUpperCase()].apply(this,args);

	} else if(typeof this.from === 'undefined') {
		fromdata = alasql.databases[databaseid].objects;
	} else {
		var fromfn = new Function('params,alasql','var y;return '+this.from.toJS());
		fromdata = fromfn(params,alasql);			
		// Check for Mogo Collections
		if(
			typeof Mongo === 'object' && typeof Mongo.Collection !== 'object' && 
			fromdata instanceof Mongo.Collection
		) {
			fromdata = fromdata.find().fetch();
		}

	}

	// If source data is array than first step is to run over array
//	var selidx = 0;
//	var selvalue = fromdata;

	if(selectors !== undefined && selectors.length > 0) {
		// Init variables for TO() selectors

		if(false) {
			selectors.forEach(function(selector){
				if(selector.srchid === 'TO') {  //* @todo move to TO selector
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
		if(typeof this.into.args[0] !== 'undefined') {
			a1 = 
				new Function('params,alasql','var y;return ' +
				this.into.args[0].toJS())(params,alasql);
		}
		if(typeof this.into.args[1] !== 'undefined') {
			a2 =  
				new Function('params,alasql','var y;return ' +
				this.into.args[1].toJS())(params,alasql);
		}
		res = alasql.into[this.into.funcid.toUpperCase()](a1,a2,res,[],cb);
	} else {
		if(stope.value && res.length > 0){
			res = res[0];
		}
		if (cb){
			res = cb(res);
		}
	}
	return res;

}

/**	
	Search class
	@class
	@example
	SEARCH SUM(/a) FROM ? -- search over parameter object
*/

yy.Search = function (params) { return yy.extend(this, params); }

yy.Search.prototype.toString = function () {
	var s = 'SEARCH' + ' ';
	if (this.selectors){
		s += this.selectors.toString();
	}
	if (this.from){
		s += 'FROM' + ' ' + this.from.toString();
	}

	return s;
};

yy.Search.prototype.toJS = function(context) {

	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	// var s = '';
	return s;
};

yy.Search.prototype.compile = function(databaseid) {
	var dbid = databaseid;
	var self = this;

	var statement = function(params,cb){

		var res;
		doSearch.bind(self)(dbid,params,function(data){

			res = modify(statement.query,data);

			if(cb){
				res = cb(res);
			}
		});

		return res;
	};
	statement.query = {};
	return statement;
};

// List of search functions
alasql.srch = {};

alasql.srch.PROP = function(val,args,stope) {

	if(stope.mode === 'XML') {
		var arr = [];
		val.children.forEach(function(v){
			if(v.name.toUpperCase() === args[0].toUpperCase()) {
				arr.push(v)
			}
		});
		if(arr.length>0) {
			return {status: 1, values: arr};
		} else {
			return {status: -1, values: []};
		}		
	} else {
		if(
			(typeof val !== 'object') 	|| 
			(val === null) 				|| 
			(typeof args !== 'object') 	|| 
			(typeof val[args[0]] === 'undefined')
		) {
			return {status: -1, values: []};
		} else {
			return {status: 1, values: [val[args[0]]]};
		}		
	}
};

alasql.srch.APROP = function(val, args) {
	if(
		(typeof val !== 'object') 	|| 
		(val === null)				||
		(typeof args !== 'object')	|| 
		(typeof val[args[0]] === 'undefined')) {
		return {status: 1, values: [undefined]};
	} else {
		return {status: 1, values: [val[args[0]]]};
	}		
};

// Test expression
alasql.srch.EQ = function(val,args,stope,params) {
  var exprs = args[0].toJS('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  if(val === exprfn(val,alasql,params)) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

// Test expression
alasql.srch.LIKE = function(val,args,stope,params) {
  var exprs = args[0].toJS('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  if(val.toUpperCase().match(new RegExp('^'+exprfn(val,alasql,params).toUpperCase()
  	.replace(/%/g,'.*').replace(/\?|_/g,'.')+'$'),'g')) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

alasql.srch.ATTR = function(val,args,stope) {
	if(stope.mode === 'XML') {
		if(typeof args === 'undefined') {
	      return {status: 1, values: [val.attributes]};
		} else {
			if(
				typeof val === 'object' 			&& 
				typeof val.attributes === 'object'	&&
				typeof val.attributes[args[0]] !== 'undefined'
			){
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
	if(stope.mode === 'XML') {
		return {status: 1, values: [val.content]};
	} else {
		throw new Error('ATTR is not using in usual mode');
	}
};

alasql.srch.SHARP = function(val,args) {
	var obj = alasql.databases[alasql.useid].objects[args[0]];
	if(typeof val !== 'undefined' && val === obj) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.PARENT = function(/*val,args,stope*/) {
	// TODO: implement
	console.log('PARENT not implemented');
	return {status: -1, values: []};
};

alasql.srch.CHILD = function(val,args,stope) {

  if(typeof val === 'object') {
    if(val instanceof Array) {
      return {status: 1, values: val};
    } else {
    	if(stope.mode === 'XML') {
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
alasql.srch.KEYS = function(val) {
  if(typeof val === 'object' && val !== null) {
	  return {status: 1, values: Object.keys(val)};          
  } else {
    // If primitive value
    return {status: 1, values:[]};
  }
};

// Test expression
alasql.srch.WHERE = function(val,args,stope,params) {
  var exprs = args[0].toJS('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  if(exprfn(val,alasql,params)) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

alasql.srch.NAME = function(val,args) {
  if(val.name === args[0]) {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

alasql.srch.CLASS = function(val,args) {

  // Please avoid `===` here
  if(val.$class == args) { 					// jshint ignore:line
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

// Transform expression
alasql.srch.VERTEX = function(val) {
  if(val.$node === 'VERTEX') {
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
alasql.srch.EDGE = function(val ) {
  if(val.$node === 'EDGE') {
    return {status: 1, values: [val]};
  } else {
    return {status: -1, values: []};        
  }
};

// Transform expression
alasql.srch.EX = function(val,args,stope,params) {
  var exprs = args[0].toJS('x','');
  var exprfn = new Function('x,alasql,params','return '+exprs);
  return {status: 1, values: [exprfn(val,alasql,params)]};
};

// Transform expression
alasql.srch.RETURN = function(val,args,stope,params) {
	var res = {};
	if(args && args.length > 0) {
		args.forEach(function(arg){
		  	var exprs = arg.toJS('x','');
  			var exprfn = new Function('x,alasql,params','return '+exprs);
  			if(typeof arg.as === 'undefined'){
  				arg.as = arg.toString();
  			}
  			res[arg.as] = exprfn(val,alasql,params);
		});
	}
  return {status: 1, values: [res]};
};

// Transform expression
alasql.srch.REF = function(val ) {
  return {status: 1, values: [alasql.databases[alasql.useid].objects[val]]};
};

// Transform expression
alasql.srch.OUT = function(val ) {
	if(val.$out && val.$out.length > 0) {
		var res = val.$out.map(function(v){ 
			return alasql.databases[alasql.useid].objects[v]
		}); 
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.OUTOUT = function(val ) {
	if(val.$out && val.$out.length > 0) {
		var res = [];
		val.$out.forEach(function(v){ 
			var av = alasql.databases[alasql.useid].objects[v];
			if(av && av.$out && av.$out.length > 0) {
				av.$out.forEach(function(vv){
					res = res.concat(alasql.databases[alasql.useid].objects[vv]);
				});
			}
		}); 
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.IN = function(val) {
	if(val.$in && val.$in.length > 0) {
		var res = val.$in.map(function(v){ 
			return alasql.databases[alasql.useid].objects[v]
		}); 
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.ININ = function(val ) {
	if(val.$in && val.$in.length > 0) {
		var res = [];
		val.$in.forEach(function(v){ 
			var av = alasql.databases[alasql.useid].objects[v];
			if(av && av.$in && av.$in.length > 0) {
				av.$in.forEach(function(vv){
					res = res.concat(alasql.databases[alasql.useid].objects[vv]);
				});
			}
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
alasql.srch.CLONEDEEP = function(val) {
	// TODO something wrong
	var z = cloneDeep(val);
 	return {status: 1, values: [z]};
};

// // Transform expression
// alasql.srch.DELETE = function(val,args) {

// };

// Transform expression
alasql.srch.SET = function(val,args,stope,params) {

	var s = args.map(function(st){

		if(st.method === '@') {
			return 'alasql.vars[\''+st.variable+'\']='+st.expression.toJS('x','');
		} else if(st.method === '$') {
			return 'params[\''+st.variable+'\']='+st.expression.toJS('x','');
		} else {
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJS('x','');
		}
	}).join(';');
	var setfn = new Function('x,params,alasql',s);

	setfn(val,params,alasql);

  return {status: 1, values: [val]};
};

alasql.srch.ROW = function(val,args,stope,params) {
  var s = 'var y;return [';

	s += args.map(function(arg){
		return arg.toJS('x','');
	}).join(',');
	s += ']'
	var setfn = new Function('x,params,alasql',s);
	var rv = setfn(val,params,alasql);

  return {status: 1, values: [rv]};
};

alasql.srch.D3 = function(val) {
	if(val.$node !== 'VERTEX' && val.$node === 'EDGE') {
		val.source = val.$in[0];
		val.target = val.$out[0];
	}

  	return {status: 1, values: [val]};
};

var compileSearchOrder = function (order) {
	if(order) {

		if(
			order 				&& 
			order.length === 1 	&& 
			order[0].expression &&
			typeof order[0].expression === "function"
		){

			var func = order[0].expression;

			return function(a,b){
				var ra = func(a),rb = func(b);
				if(ra>rb){
					return 1;
				}
				if(ra===rb){
					return 0;
				}
				return -1;
			}
		}

		var s = '';
		var sk = '';
		order.forEach(function(ord){

			// Date conversion
			var dg = ''; 

			if(ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value-1];
			}

			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid; 

				if(alasql.options.valueof){
					dg = '.valueOf()'; // TODO Check
				}
				// COLLATE NOCASE
				if(ord.nocase){
					dg += '.toUpperCase()';
				}

				if(columnid === '_') {
					s += 'if(a'+dg+(ord.direction === 'ASC'?'>':'<')+'b'+dg+')return 1;';
					s += 'if(a'+dg+'==b'+dg+'){';
				} else {
					s += 'if((a[\''+columnid+"']||'')"+dg+(ord.direction === 'ASC'?'>':'<')+'(b[\''+columnid+"']||'')"+dg+')return 1;';
					s += 'if((a[\''+columnid+"']||'')"+dg+'==(b[\''+columnid+"']||'')"+dg+'){';
				}

			} else {
				dg = '.valueOf()';
				// COLLATE NOCASE
				if(ord.nocase){
					dg += '.toUpperCase()';
				}
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+(ord.direction === 'ASC'?'>(':'<(')+ord.toJS('b','')+"||'')"+dg+')return 1;';
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+'==('+ord.toJS('b','')+"||'')"+dg+'){';
			}			

			// TODO Add date comparision
				// s += 'if(a[\''+columnid+"']"+dg+(ord.direction == 'ASC'?'>':'<')+'b[\''+columnid+"']"+dg+')return 1;';
				// s += 'if(a[\''+columnid+"']"+dg+'==b[\''+columnid+"']"+dg+'){';

			sk += '}';
		});
		s += 'return 0;';
		s += sk+'return -1';

		return new Function('a,b',s);
	}
};

alasql.srch.ORDERBY = function(val,args /*,stope*/) {

	var res = val.sort(compileSearchOrder(args));
	return {status: 1, values: res};
};

// Main query procedure
function queryfn(query,oldscope,cb, A,B) {

	var aaa = query.sources.length;

	var ms;
	query.sourceslen = query.sources.length;
	var slen = query.sourceslen;
	query.query = query; // TODO Remove to prevent memory leaks
	query.A = A;
	query.B = B;

	query.cb = cb;
	query.oldscope = oldscope;

	// Run all subqueries before main statement
	if(query.queriesfn) {
		query.sourceslen += query.queriesfn.length;
		slen += query.queriesfn.length;

		query.queriesdata = [];

		query.queriesfn.forEach(function(q,idx){

			q.query.params = query.params;

//	if(false) {

//	} else {
			queryfn2([],(-idx-1),query);
//	}

		});

	}

	var scope;
	if(!oldscope) scope = {};
	else scope = cloneDeep(oldscope);
	query.scope = scope;

	// First - refresh data sources

	var result;
	query.sources.forEach(function(source, idx){

		source.query = query;
		var rs = source.datafn(query, query.params, queryfn2, idx, alasql); 

		if(typeof rs !== undefined) {
			// TODO - this is a hack: check if result is array - check all cases and
			// make it more logical
			if((query.intofn || query.intoallfn) && rs instanceof Array) rs = rs.length;
			result = rs;
		}
//
// Ugly hack to use in query.wherefn and source.srcwherefns functions
// constructions like this.queriesdata['test'].
// I can elimite it with source.srcwherefn.bind(this)()
// but it may be slow.
// 
		source.queriesdata = query.queriesdata;  
	});
	if(query.sources.length==0 || 0 === slen ) 
		result = queryfn3(query);

	return result;
}

function queryfn2(data,idx,query) {

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

		query.queriesdata[-idx-1] = flatArray(data);

	}

	query.sourceslen--;
	if(query.sourceslen>0) return;

	return queryfn3(query);
}

function queryfn3(query) {

	var scope = query.scope;
	// Preindexation of data sources
//	if(!oldscope) {
		preIndex(query);
//	}

	// query.sources.forEach(function(source) {

	// });

	// Prepare variables
	query.data = [];
	query.xgroups = {};
	query.groups = [];

	// Level of Joins
	var h = 0;

	// Start walking over data

	doJoin(query, scope, h);

	// If groupping, then filter groups with HAVING function

	if(query.groupfn) {
		query.data = [];
		if(0 === query.groups.length) {
			var g = {};
			if(query.selectGroup.length>0) {

				query.selectGroup.forEach(function(sg){
					if(sg.aggregatorid == "COUNT" || sg.aggregatorid == "SUM") {
						g[sg.nick] = 0;
					} else {
						g[sg.nick] = undefined;
					}
				});
			}
			query.groups = [g];

		}

		// ******

		if(query.aggrKeys.length > 0) {
			var gfns = '';
			query.aggrKeys.forEach(function(col){
				gfns += 'g[\''+col.nick+'\']=alasql.aggr[\''+col.funcid+'\'](undefined,g[\''+col.nick+'\'],3);'; 

			});

			var gfn = new Function('g,params,alasql','var y;'+gfns); 

		}

		// *******

		// 	debugger;
		// if(false && (query.groups.length == 1) && (Object.keys(query.groups[0]).length == 0)) {

		// } else {
			for(var i=0,ilen=query.groups.length;i<ilen;i++) {
				var g = query.groups[i];

				if(gfn) gfn(g,query.params,alasql);

				if((!query.havingfn) || query.havingfn(g,query.params,alasql)) {

					var d = query.selectgfn(g,query.params,alasql);
					query.data.push(d);
				}
			};
		// }

	}
	// Remove distinct values	
	doDistinct(query);

	// UNION / UNION ALL
	if(query.unionallfn) {
// TODO Simplify this part of program
		var ud, nd;
		if(query.corresponding) {
			if(!query.unionallfn.query.modifier) query.unionallfn.query.modifier = undefined;
			ud = query.unionallfn(query.params);
		} else {
			if(!query.unionallfn.query.modifier) query.unionallfn.query.modifier = 'RECORDSET';
			nd = query.unionallfn(query.params);
			ud = [];
			ilen=nd.data.length
			for(var i=0;i<ilen;i++) {
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
			ud = query.unionfn(query.params);
		} else {
			if(!query.unionfn.query.modifier) query.unionfn.query.modifier = 'RECORDSET';
			nd = query.unionfn(query.params);
			ud = [];
			ilen=nd.data.length
			for(var i=0;i<ilen;i++) {
				r = {};
				jlen=Math.min(query.columns.length,nd.columns.length);
				for(var j=0;j<jlen;j++) {
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
			if(!query.intersectfn.query.modifier) 
				query.intersectfn.query.modifier = undefined;
			ud = query.intersectfn(query.params);
		} else {
			if(!query.intersectfn.query.modifier) 
				query.intersectfn.query.modifier = 'RECORDSET';
			nd = query.intersectfn(query.params);
			ud = [];
			ilen=nd.data.length;
			for(i=0;i<ilen;i++) {
				r = {};
				jlen=Math.min(query.columns.length,nd.columns.length);
				for(j=0;j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}

		query.data = arrayIntersectDeep(query.data, ud);
	}

	// Ordering
	if(query.orderfn) {
		if(query.explain) var ms = Date.now();
		query.data = query.data.sort(query.orderfn);
		if(query.explain) { 
			query.explaination.push({explid: query.explid++, description:'QUERY BY',ms:Date.now()-ms});
		}
	}

	// Reduce to limit and offset
	doLimit(query);

	// Remove Angular.js artifacts and other unnecessary columns
	// Issue #25

    // TODO: Check what artefacts rest from Angular.js
    if(typeof angular != "undefined") {
    	query.removeKeys.push('$$hashKey');
    }

	if(query.removeKeys.length > 0) {
	    var removeKeys = query.removeKeys;

	    // Remove from data
		jlen = removeKeys.length;
		if(jlen > 0) {
			ilen=query.data.length;	
			for(i=0;i<ilen;i++) {
				for(j=0; j<jlen;j++) {
					delete query.data[i][removeKeys[j]];
				}
			}    
		}

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
			r = query.data[i];
			for(var k in r) {
				for(j=0;j<query.removeLikeKeys.length;j++) {
					if(alasql.utils.like(query.removeLikeKeys[j],k)) {

						delete r[k];
					}				
				}
			} 
		}

		if(query.columns.length > 0) {
			query.columns = query.columns.filter(function(column){
				var found = false;
				removeLikeKeys.forEach(function(key){

					if(alasql.utils.like(key,column.columnid)) {
						found = true;
					}
				});
				return !found;
			});
		}

	}

	if(query.pivotfn) query.pivotfn();
	if(query.unpivotfn) query.unpivotfn();

	if(query.intoallfn) {

		var res = query.intoallfn(query.columns,query.cb,query.params,query.alasql); 

		return res;	
	} else if(query.intofn) {
		ilen=query.data.length;
		for(i=0;i<ilen;i++){
			query.intofn(query.data[i],i,query.params,query.alasql);
		}

		if(query.cb) 
			query.cb(query.data.length,query.A, query.B);
		return query.data.length;
	} else {

		res = query.data;
		if(query.cb) 
			res = query.cb(query.data,query.A, query.B);
		return res;
	}

}

// Limiting
function doLimit (query) {

	if(query.limit) {
		var offset = 0;
		if(query.offset) offset = ((query.offset|0)-1)||0;
		var limit;
		if(query.percent) {
			limit = ((query.data.length*query.limit/100)| 0)+offset;			
		} else {
			limit = (query.limit|0) + offset;
		}
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
			var uix = Object.keys(query.data[i]).map(function(k){return query.data[i][k];}).join('`');
			uniq[uix] = query.data[i];
		}
		query.data = [];
		for(var key in uniq) query.data.push(uniq[key]);
	}
}

// Optimization: preliminary indexation of joins
preIndex = function(query) {

	// Loop over all sources
	// Todo: make this loop smaller and more graspable
	for(var k=0, klen = query.sources.length;k<klen;k++) {
		var source = query.sources[k];
		delete source.ix;
		// If there is indexation rule

		if(k > 0 && source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
			// If there is no table.indices - create it
			if(source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
				if(!alasql.databases[source.databaseid].tables[source.tableid].indices) query.database.tables[source.tableid].indices = {};
					// Check if index already exists
				var ixx = alasql.databases[source.databaseid].tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)];
				if( !alasql.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
					source.ix = ixx; 
				}
			}

			if(!source.ix) {
				source.ix = {};
				// Walking over source data
				var scope = {};
				var i = 0;
				var ilen = source.data.length;
				var dataw;

				while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
					if(source.getfn && !source.dontcache) source.data[i] = dataw;

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
				}
			}

			// Optimization for WHERE column = expression
		} else if (source.wxleftfn) {
				if(!alasql.databases[source.databaseid].engineid) {
					// Check if index exists
					ixx = alasql.databases[source.databaseid].tables[source.tableid].indices[hash(source.wxleftfns+'`')];
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
					scope = {};
					// Walking on each source line
					i = 0;
					ilen = source.data.length;
					dataw;
	//				while(source.getfn i<ilen) {

					while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
						if(source.getfn && !source.dontcache) 
							source.data[i] = dataw;
	//					for(var i=0, ilen=source.data.length; i<ilen; i++) {
						scope[source.alias || source.tableid] = source.data[i];
						// Create index entry
						addr = source.wxleftfn(scope, query.params, alasql);
						group = source.ix[addr]; 
						if(!group) {
							group = source.ix[addr] = []; 
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
						scope = {};
						source.data = source.data.filter(function(r) {
							scope[source.alias] = r;
							return source.srcwherefn(scope, query.params, alasql);
						});
					} else {
						source.data = [];
					}
				}		

		// If there is no any optimization than apply srcwhere filter
		} else if(source.srcwherefns && !source.dontcache) {
			if(source.data) {
				var scope = {};
				// TODO!!!!! Data as Function

				source.data = source.data.filter(function(r) {
					scope[source.alias] = r;

					return source.srcwherefn(scope, query.params, alasql);
				});

				scope = {};
				i = 0;
				ilen = source.data.length;
				//var dataw;
				var res = [];

				while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
					if(source.getfn && !source.dontcache) source.data[i] = dataw;
					scope[source.alias] = dataw;
					if(source.srcwherefn(scope, query.params, alasql)) res.push(dataw);
					i++;
				}
				source.data = res;

			} else {
				source.data = [];
			}
		}			
		// Change this to another place (this is a wrong)
		if(source.databaseid && alasql.databases[source.databaseid].tables[source.tableid]) {
			//query.database.tables[source.tableid].dirty = false;
		} else {
			// this is a subquery?
		}
	}
};

//
// Join all lines over sources 
//

function doJoin (query, scope, h) {

	// Check, if this is a last join?
	if(h>=query.sources.length) {

		// Then apply where and select

		if(query.wherefn(scope,query.params, alasql)) {

			// If there is a GROUP BY then pipe to groupping function
			if(query.groupfn) {
				query.groupfn(scope, query.params, alasql)
			} else {

				query.data.push(query.selectfn(scope, query.params, alasql));
			}	
		}
	} else if(query.sources[h].applyselect) {

		var source = query.sources[h];
		source.applyselect(query.params, function(data){
			if(data.length > 0) {

				for(var i=0;i<data.length;i++) {
					scope[source.alias] = data[i];
					doJoin(query, scope, h+1);
				};			
			} else {
				if (source.applymode == 'OUTER') {
					scope[source.alias] = {};
					doJoin(query, scope, h+1);
				}
			}
		},scope);

	} else {

// STEP 1

		var source = query.sources[h];
		var nextsource = query.sources[h+1];

		// Todo: check if this is smart
		if(true) {//source.joinmode != "ANTI") {

			var tableid = source.alias || source.tableid; 
			var pass = false; // For LEFT JOIN
			var data = source.data;
			var opt = false;

			// Reduce data for looping if there is optimization hint
			if(!source.getfn || (source.getfn && !source.dontcache)) {
				if(source.joinmode != "RIGHT" && source.joinmode != "OUTER" && source.joinmode != "ANTI" && source.optimization == 'ix') {
					data = source.ix[ source.onleftfn(scope, query.params, alasql) ] || [];
					opt = true;

				}
			}

			// Main cycle
			var i = 0;
			if(typeof data == 'undefined') {
				throw new Error('Data source number '+h+' in undefined')
			}
			var ilen=data.length;
			var dataw;

			while((dataw = data[i]) || (!opt && (source.getfn && (dataw = source.getfn(i)))) || (i<ilen) ) {
				if(!opt && source.getfn && !source.dontcache) data[i] = dataw;

				scope[tableid] = dataw;
				// Reduce with ON and USING clause
				if(!source.onleftfn || (source.onleftfn(scope, query.params, alasql) == source.onrightfn(scope, query.params, alasql))) {
					// For all non-standard JOINs like a-b=0
					if(source.onmiddlefn(scope, query.params, alasql)) {
						// Recursively call new join

						if(source.joinmode != "SEMI" && source.joinmode != "ANTI") { 

							doJoin(query, scope, h+1);
						}

						// if(source.data[i].f = 200) debugger;

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

// STEP 2

		if(h+1 < query.sources.length) {

			if(nextsource.joinmode == "OUTER" || nextsource.joinmode == "RIGHT" 
				|| nextsource.joinmode == "ANTI") {

				scope[source.alias] = {};

				var j = 0;
				var jlen = nextsource.data.length;
				var dataw;

				while((dataw = nextsource.data[j]) || (nextsource.getfn && (dataw = nextsource.getfn(j))) || (j<jlen)) {
					if(nextsource.getfn && !nextsource.dontcache) {
						nextsource.data[j] = dataw;
					}

					if(dataw._rightjoin) {
						delete dataw._rightjoin;					
					} else {

						if(h==0) {
							scope[nextsource.alias] = dataw;
							doJoin(query, scope, h+2);
						} else {
							//scope[nextsource.alias] = dataw;
							//doJoin(query, scope, h+2);

						}
					}
					j++;
				}

			} else {

			};
		} else {

		};

		scope[tableid] = undefined;

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
	if(this.explain){
		s+= 'EXPLAIN ';
	}
	s += 'SELECT ';
	if(this.modifier){
		s += this.modifier+' ';
	}
	if(this.top) {
		s += 'TOP '+this.top.value+' ';
		if(this.percent){
			s += 'PERCENT ';
		}
	}
	s += this.columns.map(function(col){
		var s = col.toString();

		if(typeof col.as !== "undefined"){
			s += ' AS '+col.as;
		}
		return s;
	}).join(', ');

	if(this.from) {
		s += 	' FROM '
				+ this.from.map(function(f){

												var ss = f.toString();
												if(f.as){
													ss += ' AS '+f.as;
												}
												return ss;
											}).join(',');
										}

	if(this.joins) {
		s += this.joins.map(function(jn){
			var ss = ' ';
			if(jn.joinmode){
				ss += jn.joinmode+' ';
			}

			if(jn.table){
				ss += 'JOIN '+jn.table.toString();
			} else if(jn instanceof yy.Apply){
				ss += jn.toString();
			} else {
				throw new Error('Wrong type in JOIN mode');
			}

			if(jn.using){
				ss += ' USING '+jn.using.toString();
			}

			if(jn.on){
				ss += ' ON '+jn.on.toString();
			}
			return ss;
 		});
	}

	if(this.where){
		s += ' WHERE '+this.where.toString();
	}
	if(this.group && this.group.length>0) {
		s += ' GROUP BY ' + this.group.map(function(grp){
															return grp.toString();
														}).join(', ');
	}

	if(this.having){
		s += ' HAVING '+this.having.toString();
	}

	if(this.order && this.order.length>0) {
		s += ' ORDER BY '+this.order.map(function(ord){
														return  ord.toString();
													}).join(', ');
	}

	if(this.limit){
		s += ' LIMIT '+this.limit.value;
	}

	if(this.offset){
		s += ' OFFSET '+this.offset.value;
	}

	if(this.union){
		s += ' UNION '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.union.toString();
	}

	if(this.unionall){
		s += ' UNION ALL '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.unionall.toString();
	}

	if(this.except){
		s += ' EXCEPT '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.except.toString();
	}

	if(this.intersect){
		s += ' INTERSECT '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.intersect.toString();
	}

	return s;
};

/**
 Select statement in expression
 */
yy.Select.prototype.toJS = function(context) {

//	if(this.expression.reduced) return 'true';
//	return this.expression.toJS(context, tableid, defcols);

//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s = 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+'))[0]';

	return s;
};

// Compile SELECT statement
yy.Select.prototype.compile = function(databaseid) {
	var db = alasql.databases[databaseid];
	// Create variable for query
	var query = new Query();

	// Array with columns to be removed
    query.removeKeys = [];
    query.aggrKeys = [];

	query.explain = this.explain; // Explain
	query.explaination = [];
	query.explid = 1;

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
	if(this.joins){
		this.compileJoins(query);
	}

	// todo?: 3. Compile SELECT clause

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
	if(this.where){
		this.compileWhereJoins(query);
	}

	// 4. Compile WHERE clause
	query.wherefn = this.compileWhere(query);

	// 6. Compile GROUP BY
	if(this.group || query.selectGroup.length>0){
		query.groupfn = this.compileGroup(query);
	}

	// 6. Compile HAVING
	if(this.having){
		query.havingfn = this.compileHaving(query);
	}

	// 8. Compile ORDER BY clause
	if(this.order){
		query.orderfn = this.compileOrder(query);
	}

	if(this.group || query.selectGroup.length>0) {
		query.selectgfn = this.compileSelectGroup2(query);
	} else {
		query.selectfn = this.compileSelect2(query);
	}

	// 7. Compile DISTINCT, LIMIT and OFFSET
	query.distinct = this.distinct;

	// 9. Compile PIVOT clause
	if(this.pivot) query.pivotfn = this.compilePivot(query);
	if(this.unpivot) query.pivotfn = this.compileUnpivot(query);

	// 10. Compile TOP/LIMIT/OFFSET/FETCH cleuse
	if(this.top) {
		query.limit = this.top.value;
	} else if(this.limit) {
		query.limit = this.limit.value;
		if(this.offset) {
			query.offset = this.offset.value;
		}
	}

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
	}

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
				qs += this.into.args[0].toJS()+',';
				if(this.into.args.length > 1) {
					qs += this.into.args[1].toJS()+',';
				} else {
					qs += 'undefined,';
				}
			} else {
				qs += 'undefined, undefined,'
			}
			query.intoallfns = qs+'this.data,columns,cb)';

		} else if (this.into instanceof yy.ParamValue) {
			//
			// Save data into parameters array
			// like alasql('SELECT * INTO ? FROM ?',[outdata,srcdata]);
			//
			query.intofns = "params['"+this.into.param+"'].push(r)";
		}

		if(query.intofns) {
			// Create intofn function
			query.intofn = new Function("r,i,params,alasql",'var y;'+query.intofns); 
		} else if(query.intoallfns) {
			// Create intoallfn function
			query.intoallfn = new Function("columns,cb,params,alasql",'var y;'+query.intoallfns); 
		}

	}

	// Now, compile all togeather into one function with query object in scope
	var statement = function(params, cb, oldscope) {
		query.params = params;
		var res1 = queryfn(query,oldscope,function(res){

			if(query.rownums.length>0) {
				for(var i=0,ilen=res.length;i<ilen;i++) {
					for(var j=0,jlen=query.rownums.length;j<jlen;j++) {
						res[i][query.rownums[j]] = i+1;
					}
				}
			}

			var res2 = modify(query, res);

			if(cb){
				cb(res2);
			}

			return res2;

		}); 

		return res1;

	};

//	statement.dbversion = ;

	statement.query = query;
	return statement;
};

/**
	Modify res according modifier
	@function
	@param {object} query Query object
	@param res {object|number|string|boolean} res Data to be converted 
*/
function modify(query, res) { // jshint ignore:line

	/* If source is a primitive value then return it */
	if(		typeof res === 'undefined' 
		|| 	typeof res === 'number' 
		|| 	typeof res === 'string' 
		|| 	typeof res == 'boolean'
	){
		return res;
	}

	var modifier = query.modifier || alasql.options.modifier;
	var columns = query.columns;
	if(typeof columns === 'undefined' || columns.length == 0) {
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

	if(modifier === 'VALUE') {

		if(res.length > 0) {
			var key;
			if(columns && columns.length > 0){
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}
			res = res[0][key];
		} else {
			res = undefined;
		}
	} else if(modifier === 'ROW') {
		if(res.length > 0) {
			var key;
			var a = [];
			for(var key in res[0]) {
				a.push(res[0][key]);
			}
			res = a;
		} else {
			res = undefined;
		}
	} else if(modifier === 'COLUMN') {
		var ar = [];
		if(res.length > 0) {
			var key;
			if(columns && columns.length > 0){
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}

			for(var i=0, ilen=res.length; i<ilen; i++){
				ar.push(res[i][key]);
			}
		}
		res = ar;
	} else if(modifier === 'MATRIX') {
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

	}else if(modifier === 'INDEX') {
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

	}else if(modifier === 'RECORDSET') {
		res = new alasql.Recordset({data:res, columns:columns});

	}else if(modifier === 'TEXTSTRING') {
		var key;
		if(columns && columns.length > 0){
			key = columns[0].columnid;
		} else{
			key = Object.keys(res[0])[0];
		}

		for(var i=0, ilen=res.length; i<ilen; i++){
			res[i] = res[i][key];
		}
		res = res.join('\n');

	}
	return res;
}

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

yy.ExistsValue.prototype.toJS = function(context,tableid,defcols) {

	return 'this.existsfn['+this.existsidx+'](params,null,'+context+').data.length';
};

yy.Select.prototype.compileWhereExists = function(query) {
	if(!this.exists) return;
	query.existsfn = this.exists.map(function(ex) {
		var nq = ex.compile(query.database.databaseid);

		 nq.query.modifier = 'RECORDSET';
		 return nq;
	});
};

yy.Select.prototype.compileQueries = function(query) {
	if(!this.queries) return;
	query.queriesfn = this.queries.map(function(q) {
		 var nq = q.compile(query.database.databaseid);

//	if(!nq.query) nq.query = {};
		 nq.query.modifier = 'RECORDSET';

		 return nq;
	});
};

//
// Prepare subqueries and exists
//
alasql.precompile = function(statement,databaseid,params){

	if(!statement) return;
	statement.params = params;
	if(statement.queries) {	

		statement.queriesfn = statement.queries.map(function(q) {
			var nq = q.compile(databaseid || statement.database.databaseid);

		 nq.query.modifier = 'RECORDSET';
			 return nq;

		});
	}
	if(statement.exists) {

		statement.existsfn = statement.exists.map(function(ex) {
			var nq = ex.compile(databaseid || statement.database.databaseid);

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

	var self = this;
	query.sources = [];
//	var tableid = this.from[0].tableid;
//	var as = '';
//	if(self.from[0].as) as = this.from[0].as;

	query.aliases = {};
	if(!self.from) return;

	self.from.forEach(function(tq){

		var alias = tq.as || tq.tableid;

		if(tq instanceof yy.Table) {

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
		} else if(tq.inserted) {
			query.aliases[alias] = {type:'inserted'};
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

		};

		if(tq instanceof yy.Table) {
			// Get columns from table
			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;

			if(alasql.options.autocommit && alasql.databases[source.databaseid].engineid) {

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

				source.datafn = function(query,params,cb,idx, alasql) {
/*

*/
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;

					if(cb) res = cb(res,idx,query);

					return res;

				};
			}
		} else if(tq instanceof yy.Select) {

			source.subquery = tq.compile(query.database.databaseid);
			if(typeof source.subquery.query.modifier == 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;

			source.datafn = function(query, params, cb, idx, alasql) {

				var res;
				source.subquery(query.params, function(data){
					res = data.data;
					if(cb) res = cb(res,idx,query);
					return res;

				});

				return res;
			}						
		} else if(tq instanceof yy.Search) {

			 source.subsearch = tq;
			 source.columns = [];

			source.datafn = function(query, params, cb, idx, alasql) {

				var res;
				source.subsearch.execute(query.database.databaseid,query.params,function(data){
					res = data;
					if(cb) res = cb(res,idx,query);
					return res;

				});

				return res;
			}						
		} else if(tq instanceof yy.ParamValue) {

			var ps = "var res = alasql.prepareFromData(params['"+tq.param+"']";

			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);

		} else if(tq.inserted) {
			var ps = "var res = alasql.prepareFromData(alasql.inserted";
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof yy.Json) {
			var ps = "var res = alasql.prepareFromData("+tq.toJS();

			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof yy.VarValue) {
			var ps = "var res = alasql.prepareFromData(alasql.vars['"+tq.variable+"']";

			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof yy.FuncValue) {
			var s = "var res=alasql.from['"+tq.funcid.toUpperCase()+"'](";

			if(tq.args && tq.args.length>0) {
				if(tq.args[0]) {
					s += tq.args[0].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
				if(tq.args[1]) {
					s += tq.args[1].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
			} else {
				s += 'null,null,'
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';

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

		query.sources.push(source);

	});
	// TODO Add joins
	query.defaultTableid = query.sources[0].alias;

};

alasql.prepareFromData = function(data,array) {

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

	};

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

			if(!alasql.databases[source.databaseid].tables[source.tableid]) {
				throw new Error('Table \''+source.tableid+
				'\' is not exists in database \''+source.databaseid)+'\'';
			};

			source.columns = alasql.databases[source.databaseid].tables[source.tableid].columns;

			// source.data = query.database.tables[source.tableid].data;
			if(alasql.options.autocommit && alasql.databases[source.databaseid].engineid) {

				source.datafn = function(query,params, cb, idx, alasql) {

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

			query.aliases[source.alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid};

		} else if(jn.select) {
			var tq = jn.select;
			source = {
				alias: jn.as,

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

				source.datafn = function(query, params, cb, idx, alasql) {

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

				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;
			var jnparam = jn.param.param;

			var ps = "var res=alasql.prepareFromData(params['"+jnparam+"']";
			if(jn.array) ps += ",true";
			ps += ");if(cb)res=cb(res, idx, query);return res";

			source.datafn = new Function('query,params,cb,idx, alasql',ps);
			query.aliases[source.alias] = {type:'paramvalue'};
		} else if(jn.variable) {
			source = {
				alias: jn.as,

				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;

			var ps = "var res=alasql.prepareFromData(alasql.vars['"+jn.variable+"']";
			if(jn.array) ps += ",true";
			ps += ");if(cb)res=cb(res, idx, query);return res";

			source.datafn = new Function('query,params,cb,idx, alasql',ps);
			query.aliases[source.alias] = {type:'varvalue'};
		} else if(jn.funcid) {
			source = {
				alias: jn.as,

				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;

			var s = "var res=alasql.from['"+js.funcid.toUpperCase()+"'](";

			if(jn.args && jn.args.length>0) {
				if(jn.args[0]) {
					s += jn.args[0].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
				if(jn.args[1]) {
					s += jn.args[1].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
			} else {
				s += 'null,null,'
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';

			source.datafn = new Function('query, params, cb, idx, alasql',s);

			query.aliases[source.alias] = {type:'funcvalue'};
		}

		var alias = source.alias;

		// Test NATURAL-JOIN
		if(jn.natural) {
			if(jn.using || jn.on) {
				throw new Error('NATURAL JOIN cannot have USING or ON clauses');
			} else {

				if(query.sources.length > 0) {
					var prevSource = query.sources[query.sources.length-1];
					var prevTable = alasql.databases[prevSource.databaseid].tables[prevSource.tableid];
					var table = alasql.databases[source.databaseid].tables[source.tableid];

					if(prevTable && table) {
						var c1 = prevTable.columns.map(function(col){return col.columnid});
						var c2 = table.columns.map(function(col){return col.columnid});
						jn.using = arrayIntersect(c1,c2).map(function(colid){return {columnid:colid}});

					} else {
						throw new Error('In this version of Alasql NATURAL JOIN '+
							'works for tables with predefined columns only');
					};
				}
			}
		}

		if(jn.using) {
			var prevSource = query.sources[query.sources.length-1];

			source.onleftfns = jn.using.map(function(col){

				return "p['"+(prevSource.alias||prevSource.tableid)+"']['"+col.columnid+"']";
			}).join('+"`"+');

			source.onleftfn = new Function('p,params,alasql','var y;return '+source.onleftfns);

			source.onrightfns = jn.using.map(function(col){
				return "p['"+(source.alias||source.tableid)+"']['"+col.columnid+"']";
			}).join('+"`"+');
			source.onrightfn = new Function('p,params,alasql','var y;return '+source.onrightfns);
			source.optimization = 'ix';

		} else if(jn.on) {

			if(jn.on instanceof yy.Op && jn.on.op == '=' && !jn.on.allsome) {

				source.optimization = 'ix';

				var lefts = '';
				var rights = '';
				var middles = '';
				var middlef = false;
				// Test right and left sides
				var ls = jn.on.left.toJS('p',query.defaultTableid,query.defcols);
				var rs = jn.on.right.toJS('p',query.defaultTableid,query.defcols);

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

				if(middlef) {

					rights = '';
					lefts = '';
					middles = jn.on.toJS('p',query.defaultTableid,query.defcols);
					source.optimization = 'no';
					// What to here?
				} 

				source.onleftfns = lefts;
				source.onrightfns = rights;
				source.onmiddlefns = middles || 'true';

				source.onleftfn = new Function('p,params,alasql', 'var y;return '+source.onleftfns);
				source.onrightfn = new Function('p,params,alasql', 'var y;return '+source.onrightfns);
				source.onmiddlefn = new Function('p,params,alasql', 'var y;return '+source.onmiddlefns);

			} else {

				source.optimization = 'no';

				source.onmiddlefns = jn.on.toJS('p',query.defaultTableid,query.defcols);
				source.onmiddlefn = new Function('p,params,alasql','var y;return '+jn.on.toJS('p',query.defaultTableid,query.defcols));
			};

			// Optimization function
		};

		// TODO SubQueries

		query.sources.push(source);
		};
	});

}

yy.Select.prototype.compileWhere = function(query) {
	if(this.where) {
		if(typeof this.where == "function") {
			return this.where;
		} else {
			s = this.where.toJS('p',query.defaultTableid,query.defcols);
			query.wherefns = s;

			return new Function('p,params,alasql','var y;return '+s);
		}
	} else return function(){return true};
};

yy.Select.prototype.compileWhereJoins = function(query) {
	return;

	// TODO Fix Where optimization

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

	});
};

function optimizeWhereJoin (query, ast) {
	if(!ast) return false;
	if(!(ast instanceof yy.Op)) return;
	if(ast.op != '=' && ast.op != 'AND') return;
	if(ast.allsome) return;

	var s = ast.toJS('p',query.defaultTableid,query.defcols);
	var fsrc = [];
	query.sources.forEach(function(source,idx) {
		// Optimization allowed only for tables only
		if(source.tableid) {
			// This is a good place to remove all unnecessary optimizations
			if(s.indexOf('p[\''+source.alias+'\']')>-1) fsrc.push(source);
		};
	});

//	if(fsrc.length < query.sources.length) return;

	if(fsrc.length == 0) {

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
				var ls = ast.left.toJS('p',query.defaultTableid,query.defcols);
				var rs = ast.right.toJS('p',query.defaultTableid,query.defcols);
				if(rs.indexOf('p[\''+fsrc[0].alias+'\']') == -1) {
					fsrc[0].wxleftfns = ls; 
					fsrc[0].wxrightfns = rs; 
				} 
			} if(ast.right instanceof yy.Column) {
				var ls = ast.left.toJS('p',query.defaultTableid,query.defcols);
				var rs = ast.right.toJS('p',query.defaultTableid,query.defcols);
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

	if(query.sources.length > 0) {
		var tableid = query.sources[0].alias;
	} else {
		// If SELECT contains group aggregators without source tables
		var tableid = '';
	}
	var defcols = query.defcols;

	var allgroup = [[]];
	if(this.group) {
		allgroup = decartes(this.group,query);
	}

	// Prepare groups
	//var allgroup = [['a'], ['a','b'], ['a', 'b', 'c']];

	// Union all arrays to get a maximum
	var allgroups = [];
	allgroup.forEach(function(a){
		allgroups = arrayUnion(allgroups, a);
	});

	query.allgroups = allgroups;

	query.ingroup = [];

	// Create negative array

	var s = '';
//	s+= query.selectfns;
	allgroup.forEach(function(agroup) {

		// Start of group function
		s += 'var g=this.xgroups[';

	//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r
		// Array with group columns from record
		var rg = agroup.map(function(col2){
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];
			// Check, if aggregator exists but GROUP BY is not exists
			if(columnid === ''){
				return '1'; // Create fictive groupping column for fictive GROUP BY
			}

			query.ingroup.push(columnid);

			return coljs;
		});

		if(rg.length === 0){
			rg = ["''"];
		}

		s += rg.join('+"`"+');
		s += '];if(!g) {this.groups.push((g=this.xgroups[';
		s += rg.join('+"`"+');
		s += '] = {';

		s += agroup.map(function(col2){
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];

			if(columnid === ''){
				return '';
			}
			return "'"+columnid+"':"+coljs+",";
		}).join('');

		var neggroup = arrayDiff(allgroups,agroup);

		s += neggroup.map(function(col2){			
			var columnid = col2.split('\t')[0];
		//	var coljs = col2.split('\t')[1]
			return "'"+columnid+"':null,";
		}).join('');

		var aft = '';

		s += query.selectGroup.map(function(col){

			var colexp = col.expression.toJS("p",tableid,defcols);
			var colas = col.nick;
			// if(typeof colas == 'undefined') {
			// 	if(col instanceof yy.Column) colas = col.columnid;
			// 	else colas = col.toString();
			// };
			if (col instanceof yy.AggrValue) { 
				if(col.distinct) {
					aft += ',g[\'$$_VALUES_'+colas+'\']={},g[\'$$_VALUES_'+colas+'\']['+colexp+']=true';
				}
				if (col.aggregatorid === 'SUM'

				){ 
					return "'"+colas+'\':('+colexp+')||0,'; //f.field.arguments[0].toJS(); 	

				} else if (
							col.aggregatorid === 'MIN'
							|| col.aggregatorid === 'MAX'
							|| col.aggregatorid === 'FIRST'
							|| col.aggregatorid === 'LAST'
		//					|| col.aggregatorid == 'AVG'

				){ 
					return "'"+colas+'\':'+colexp+','; //f.field.arguments[0].toJS(); 	

				} else if(col.aggregatorid === 'ARRAY') {
				 	return "'"+colas+'\':['+colexp+'],';

				} else if(col.aggregatorid === 'COUNT') { 
					if(col.expression.columnid === '*') {
						return "'"+colas+'\':1,';
					} else {

						return "'"+colas+'\':(typeof '+colexp+' != "undefined")?1:0,'; 
					}

				} else if(col.aggregatorid === 'AVG') { 
					query.removeKeys.push('_SUM_'+colas);
					query.removeKeys.push('_COUNT_'+colas);

					return	''
							+ "'" + colas + '\':' + colexp + ',\'_SUM_'
							+ colas+'\':(' + colexp + ')||0,\'_COUNT_'
							+ colas + '\':(typeof '
							+ colexp+' != "undefined")?1:0,'; 
				} else if(col.aggregatorid === 'AGGR') {
					aft += ',g[\''+colas+'\']='+col.expression.toJS('g',-1); 
					return '';
				} else if(col.aggregatorid === 'REDUCE') {

					query.aggrKeys.push(col);

					return '\''+colas+'\':alasql.aggr[\''+col.funcid+'\']('+colexp+',undefined,1),'; 
				}
				return '';
			} 

			return '';

		}).join('');

		s += '}'+aft+',g));} else {';

/*
	// var neggroup = arrayDiff(allgroups,agroup);

	// s += neggroup.map(function(columnid){
	// 	return "g['"+columnid+"']=null;";
	// }).join('');
*/

		s += query.selectGroup.map(function(col){
			var colas = col.nick;

			var colexp = col.expression.toJS("p",tableid,defcols);

			if (col instanceof yy.AggrValue) { 
				var pre = '', post = '';
				if(col.distinct) {
			 		var pre = 'if(typeof '+colexp+'!="undefined" && (!g[\'$$_VALUES_'+colas+'\']['+colexp+'])) \
				 		 {';
				 	var post = 'g[\'$$_VALUES_'+colas+'\']['+colexp+']=true;}';
				} 
				if (col.aggregatorid === 'SUM') { 
					return pre+'g[\''+colas+'\']+=('+colexp+'||0);'+post; //f.field.arguments[0].toJS(); 
				} else if(col.aggregatorid === 'COUNT') {

					if(col.expression.columnid === '*'){
						return pre+'g[\''+colas+'\']++;'+post; 
					} else {
						return pre+'if(typeof '+colexp+'!="undefined") g[\''+colas+'\']++;'+post;
					}

				} else if(col.aggregatorid === 'ARRAY') { 
					return pre+'g[\''+colas+'\'].push('+colexp+');'+post; 

				} else if(col.aggregatorid === 'MIN') { 
					return pre+'g[\''+colas+'\']=Math.min(g[\''+colas+'\'],'+colexp+');'+post; 

				} else if(col.aggregatorid === 'MAX') { 
					return pre+'g[\''+colas+'\']=Math.max(g[\''+colas+'\'],'+colexp+');'+post; 

				} else if(col.aggregatorid === 'FIRST') { 
					return ''; 

				} else if(col.aggregatorid === 'LAST') { 
					return pre+'g[\''+colas+'\']='+colexp+';'+post; 

				} else if(col.aggregatorid === 'AVG') { 
						return 	''
								+ pre+'g[\'_SUM_'+colas+'\']+=(y='+colexp+')||0;'
								+ 'g[\'_COUNT_'+colas+'\']+=(typeof y!="undefined")?1:0;'
								+ 'g[\''+colas+'\']=g[\'_SUM_'+colas+'\']/g[\'_COUNT_'+colas+'\'];'
								+ post; 

	//			else if(col.aggregatorid == 'AVG') { srg.push(colas+':0'); }
				} else if(col.aggregatorid === 'AGGR') {
					return 	''
							+ pre+'g[\''+colas+'\']='
					     	+ col.expression.toJS('g',-1)+';'
					     	+ post; 

				} else if(col.aggregatorid === 'REDUCE') {
					return 	''
							+ pre+'g[\''+colas+'\']=alasql.aggr.'
							+ col.funcid+'('+colexp+',g[\''+colas+'\'],2);'
							+ post; 
				}

				return '';
			} 

			return '';
		}).join('');

		s += '}';

	});

	return new Function('p,params,alasql','var y;'+s);

}

/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// yy.Select.prototype.compileSources = function(query) {

// };

function compileSelectStar (query, alias, joinstar) {

	var sp = '', ss=[];
//	if(!alias) {

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

		// Check if this is a Table or other
		if(joinstar && alasql.options.joinstar == 'json') {	
			sp += 'r[\''+alias+'\']={};';
		};

		if(columns && columns.length > 0) {
			columns.forEach(function(tcol){

			if(joinstar && alasql.options.joinstar == 'underscore') {
				ss.push('\''+alias+'_'+tcol.columnid+'\':p[\''+alias+'\'][\''+tcol.columnid+'\']');
			} else if(joinstar && alasql.options.joinstar == 'json') {

				sp += 'r[\''+alias+'\'][\''+tcol.columnid+'\']=p[\''+alias+'\'][\''+tcol.columnid+'\'];';
			} else { 
				ss.push('\''+tcol.columnid+'\':p[\''+alias+'\'][\''+tcol.columnid+'\']');
			}

				query.selectColumns[escapeq(tcol.columnid)] = true;

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

		} else {

			// if column not exists, then copy all
			sp += 'var w=p["'+alias+'"];for(var k in w){r[k]=w[k]};';

			query.dirtyColumns = true;
		}
//	}

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

	this.columns.forEach(function(col){

		if(col instanceof yy.Column) {
			if(col.columnid === '*') {
				if(col.func) {
					sp += 'r=params[\''+col.param+'\'](p[\''+query.sources[0].alias+'\'],p,params,alasql);';
				} else if(col.tableid) {
					//Copy all
					var ret = compileSelectStar(query, col.tableid, false);
					if(ret.s){
						ss = ss.concat(ret.s);
					}
					sp += ret.sp;

				} else {

					for(var alias in query.aliases) {
						var ret = compileSelectStar(query, alias, true); //query.aliases[alias].tableid);
						if(ret.s) {
							ss = ss.concat(ret.s);
						}
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

				var dbid = col.databaseid || query.sources[0].databaseid || query.database.databaseid;
				if(!tbid) tbid = query.defcols[col.columnid];
				if(!tbid) tbid = query.defaultTableid;
				if(col.columnid !== '_') {
					if(false && tbid && !query.defcols['.'][col.tableid] && !query.defcols[col.columnid]) {
						ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(query.defaultTableid)+'\'][\''+(col.tableid)+'\'][\''+col.columnid+'\']');
					} else {
						ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(tbid)+'\'][\''+col.columnid+'\']');
					}
				} else {
					ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(tbid)+'\']');					
				}
				query.selectColumns[escapeq(col.as || col.columnid)] = true;

				if(query.aliases[tbid] && query.aliases[tbid].type === 'table') {

					if(!alasql.databases[dbid].tables[query.aliases[tbid].tableid]) {

						throw new Error('Table \''+(tbid)+'\' does not exists in database');
					}
					var columns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].columns;					
					var xcolumns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].xcolumns;

					if(xcolumns && columns.length > 0) {

						var tcol = xcolumns[col.columnid];
						var coldef = {
							columnid:col.as || col.columnid, 
							dbtypeid:tcol.dbtypeid, 
							dbsize:tcol.dbsize, 
							dbpecision:tcol.dbprecision,
							dbenum: tcol.dbenum,
						};

						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
					} else {
						var coldef = {
							columnid:col.as || col.columnid, 

						};

						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;

						query.dirtyColumns = true;
					}
				} else {
						var coldef = {
							columnid:col.as || col.columnid, 

						};

						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
					// This is a subquery? 
					// throw new Error('There is now such table \''+col.tableid+'\'');
				}

			}
		} else if(col instanceof yy.AggrValue) {
			if(!self.group) {

				self.group = [''];
			}
			if(!col.as){
				col.as = escapeq(col.toString());
			}

			if(
					col.aggregatorid === 'SUM' 
				|| 	col.aggregatorid === 'MAX' 
				||  col.aggregatorid === 'MIN' 
				||	col.aggregatorid === 'FIRST' 
				||	col.aggregatorid === 'LAST' 
				||	col.aggregatorid === 'AVG' 
				|| 	col.aggregatorid === 'ARRAY' 
				|| 	col.aggregatorid === 'REDUCE'
			){
				ss.push("'"+escapeq(col.as)+"':"+n2u(col.expression.toJS("p",query.defaultTableid,query.defcols)))	

			}else if(col.aggregatorid === 'COUNT') {
				ss.push("'"+escapeq(col.as)+"':1");
				// Nothing
			}
			// todo: confirm that no default action must be implemented

						var coldef = {
							columnid:col.as || col.columnid || col.toString(), 

						};

						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;

		} else {

			ss.push('\''+escapeq(col.as || col.columnid || col.toString())+'\':'+n2u(col.toJS("p",query.defaultTableid,query.defcols)));

			//if(col instanceof yy.Expression) {
			query.selectColumns[escapeq(col.as || col.columnid || col.toString())] = true;

						var coldef = {
							columnid:col.as || col.columnid || col.toString(), 

						};

						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
		}
	});
	s += ss.join(',')+'};'+sp;
	return s;

}
yy.Select.prototype.compileSelect2 = function(query) {

	var s = query.selectfns;
	if(this.orderColumns && this.orderColumns.length>0) {
		this.orderColumns.forEach(function(v,idx) {
			var key = '$$$'+idx;
			if(v instanceof yy.Column && query.xcolumns[v.columnid]) {
				s += 'r[\''+key+'\']=r[\''+v.columnid+'\'];';
			} else {
				s += 'r[\''+key+'\']='+v.toJS('p',query.defaultTableid,query.defcols)+';';
			}
			query.removeKeys.push(key);
		});
	}

	return new Function('p,params,alasql','var y;'+s+'return r');
};

yy.Select.prototype.compileSelectGroup0 = function(query) {
	var self = this;
	self.columns.forEach(function(col,idx){
		if(!(col instanceof yy.Column && col.columnid === '*')){

			var colas;
			//  = col.as;
			if(col instanceof yy.Column) {
				colas = escapeq(col.columnid);
			} else {
				colas = escapeq(col.toString(true));

			}
			for(var i=0;i<idx;i++) {
				if(colas === self.columns[i].nick) {
					colas = self.columns[i].nick+':'+idx;
					break;
				}
			}
			// }
			col.nick = colas;
			if(
				col.funcid 
				&& (col.funcid.toUpperCase() === 'ROWNUM'|| col.funcid.toUpperCase() === 'ROW_NUMBER')) {
				query.rownums.push(col.as);
			}

			// }
		}

	});

	this.columns.forEach(function(col){
		if(col.findAggregator){
			col.findAggregator(query);
		}
	});

	if(this.having) {
		if(this.having.findAggregator){
			this.having.findAggregator(query);
		}
	}

};

yy.Select.prototype.compileSelectGroup1 = function(query) {
	var self = this;
	var s = 'var r = {};';

	self.columns.forEach(function(col){

		if(col instanceof yy.Column && col.columnid === '*') {

			s += 'for(var k in this.query.groupColumns){r[k]=g[this.query.groupColumns[k]]};';

		} else {
			// var colas = col.as;
			var colas = col.as;
			if(colas === undefined) {
			 	if(col instanceof yy.Column){
			 		colas = escapeq(col.columnid);
			 	} else {
			 		colas = col.nick;
			 	}
			}
			query.groupColumns[colas]=col.nick;

			s += 'r[\''+colas+'\']=';

 			s += n2u(col.toJS('g',''))+';';				

			for(var i=0;i<query.removeKeys.length;i++) {
				// THis part should be intellectual
				if(query.removeKeys[i] === colas) {
					query.removeKeys.splice(i,1);
					break;
				}
			}
		}
	});
	// return new Function('g,params,alasql',s+'return r');
	return s;
}

yy.Select.prototype.compileSelectGroup2 = function(query) {
	var self = this;
	var s = query.selectgfns;
	self.columns.forEach(function(col){

		if(query.ingroup.indexOf(col.nick)>-1) {
			s += 'r[\''+(col.as||col.nick)+'\']=g[\''+col.nick+'\'];'
		};
	});

	if(this.orderColumns && this.orderColumns.length>0) {
		this.orderColumns.forEach(function(v,idx) {

			var key = '$$$'+idx;

			if(v instanceof yy.Column && query.groupColumns[v.columnid]) {
				s += 'r[\''+key+'\']=r[\''+v.columnid+'\'];';
			} else {
				s += 'r[\''+key+'\']='+v.toJS('g','')+';';
			}
			query.removeKeys.push(key);
		});
	}

	return new Function('g,params,alasql','var y;'+s+'return r');
};

// SELECY * REMOVE [COLUMNS] col-list, LIKE ''
yy.Select.prototype.compileRemoveColumns = function(query) {
	var self = this;
	if(typeof this.removecolumns !== 'undefined') {
		query.removeKeys = query.removeKeys.concat(
			this.removecolumns.filter(function (column) {
				return (typeof column.like === 'undefined');
			}).map(function(column){return column.columnid}));

		query.removeLikeKeys = this.removecolumns.filter(function (column) {
				return (typeof column.like !== 'undefined');
			}).map(function(column){

				return column.like.value;
			});
	}
};

yy.Select.prototype.compileHaving = function(query) {
	if(this.having) {
		s = this.having.toJS('g',-1);
		query.havingfns = s;

		return new Function('g,params,alasql','var y;return '+s);
	} else return function(){return true};
};

yy.Select.prototype.compileOrder = function (query) {
	var self = this;
	self.orderColumns = [];
	if(this.order) {

		if(this.order && this.order.length == 1 && this.order[0].expression 
			 && typeof this.order[0].expression == "function") {

			var func = this.order[0].expression;

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

			if(ord.expression instanceof yy.NumValue) {
				var v = self.columns[ord.expression.value-1];
			} else {
				var v = ord.expression;
			}
			self.orderColumns.push(v);

			var key = '$$$'+idx;

			// Date conversion
			var dg = ''; 
				//if(alasql.options.valueof) 
			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid; 
				if(query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if( dbtypeid == 'DATE' || dbtypeid == 'DATETIME' || dbtypeid == 'DATETIME2') dg = '.valueOf()';
					// TODO Add other types mapping
				} else {
					if(alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				}

			}
			// COLLATE NOCASE
			if(ord.nocase) dg += '.toUpperCase()';
			s += "if((a['"+key+"']||'')"+dg+(ord.direction == 'ASC'?'>':"<")+"(b['"+key+"']||'')"+dg+')return 1;';
			s += "if((a['"+key+"']||'')"+dg+"==(b['"+key+"']||'')"+dg+'){';

/*
if(false) {			

			if(ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value-1];

				ord.expression = new yy.Column({columnid:ord.expression.nick});
			};

			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid; 
				if(query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if( dbtypeid == 'DATE' || dbtypeid == 'DATETIME' || dbtypeid == 'DATETIME2') dg = '.valueOf()';
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
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+(ord.direction == 'ASC'?'>(':'<(')+ord.toJS('b','')+"||'')"+dg+')return 1;';
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+'==('+ord.toJS('b','')+"||'')"+dg+'){';
			}			

			// TODO Add date comparision

}
*/
			sk += '}';
		});
		s += 'return 0;';
		s += sk+'return -1';
		query.orderfns = s;

		return new Function('a,b','var y;'+s);
	};
};

// Pivot functions
/**
	Compile Pivot functions
	@param {object} query Source query
	@return {function} Pivoting functions
*/
yy.Select.prototype.compilePivot = function (query) {
	var self = this;
	/** @type {string} Main pivoting column */

	var columnid = self.pivot.columnid;
	var exprcolid = self.pivot.expr.expression.columnid;
	var aggr = self.pivot.expr.aggregatorid;
	var inlist =  self.pivot.inlist;

	if(inlist) {
		inlist = inlist.map(function(l){return l.expr.columnid});
	}

	// Function for PIVOT post production
	return function() {
		var query = this;
		var cols = query.columns.filter(function(col){
			return (col.columnid != columnid) && (col.columnid != exprcolid);
		}).map(function(col){
			return col.columnid;
		});

		var newcols = [];
		var gnewcols = {};
		var gr = {};
		var ga = {};
		var data = [];
		query.data.forEach(function(d){
			if(!inlist || inlist.indexOf(d[columnid])>-1 ) {
				var gx = cols.map(function(colid){return d[colid]}).join('`');
				var g = gr[gx];
				if(!g) {
					g = {};
					gr[gx] = g;
					data.push(g);
					cols.forEach(function(colid){
						g[colid] = d[colid];
					});			
				};

				if(!ga[gx]) {
					ga[gx] = {};
				}

				if(ga[gx][d[columnid]]) {
					ga[gx][d[columnid]]++;
				} else {
					ga[gx][d[columnid]] = 1;
				}

				if(!gnewcols[d[columnid]]) {
					gnewcols[d[columnid]] = true;
					newcols.push(d[columnid]);
				};

				if(aggr=='SUM' || aggr=='AVG' ) {
					if(typeof g[d[columnid]] == 'undefined') g[d[columnid]] = 0;
					g[d[columnid]] += d[exprcolid];
				} else if(aggr=='COUNT') {
					if(typeof g[d[columnid]] == 'undefined') g[d[columnid]] = 0;
					g[d[columnid]]++;
				} else if(aggr=='MIN') {
					if(typeof g[d[columnid]] == 'undefined') g[d[columnid]] = Infinity;
					if(d[exprcolid] < g[d[columnid]]) g[d[columnid]] = d[exprcolid];
				} else if(aggr=='MAX') {
					if(typeof g[d[columnid]] == 'undefined') g[d[columnid]] = -Infinity;
					if(d[exprcolid] > g[d[columnid]]) g[d[columnid]] = d[exprcolid];
				} else if(aggr=='FIRST') {
					if(typeof g[d[columnid]] == 'undefined') g[d[columnid]] = d[exprcolid];
				} else if(aggr=='LAST') {
					g[d[columnid]] = d[exprcolid];
				} else if(alasql.aggr[aggr]) { // Custom aggregator
					alasql.aggr[aggr](g[d[columnid]],d[exprcolid]);
				} else {
					throw new Error('Wrong aggregator in PIVOT clause');
				}
			}
		});

		if(aggr=='AVG') {
			for(var gx in gr){
				var d = gr[gx];
				for(var colid in d) {
					if((cols.indexOf(colid) == -1) && (colid != exprcolid)) {
						d[colid] = d[colid]/ga[gx][colid];
					}
				}
			};
		};

// columns
		query.data = data;

		if(inlist) newcols = inlist;

		var ncol = query.columns.filter(function(col){return col.columnid == exprcolid})[0];
		query.columns = query.columns.filter(function(col){
			return !(col.columnid == columnid || col.columnid == exprcolid); 
		});
		newcols.forEach(function(colid){
			var nc = cloneDeep(ncol);
			nc.columnid = colid;
			query.columns.push(nc);
		});
	};
};

	// var columnid = this.pivot.columnid;

	// return function(data){
	// 	* @type {object} Collection of grouped records 
	// 	var gx = {};
	// 	/** @type {array} Array of grouped records */
	// 	var gr = [];

// if(false) {

// }

// if(false) {

// }
// };

/**
	Compile UNPIVOT clause
	@param {object} query Query object
	@return {function} Function for unpivoting
*/
yy.Select.prototype.compileUnpivot = function (query) {
	var self = this;
	var tocolumnid = self.unpivot.tocolumnid;
	var forcolumnid = self.unpivot.forcolumnid;
	var inlist = self.unpivot.inlist.map(function(l){return l.columnid});

	return function() {
		var data = [];

		var xcols = query.columns
		.map(function(col){return col.columnid})
		.filter(function(colid){
			return inlist.indexOf(colid)==-1 && colid != forcolumnid && colid != tocolumnid; 
		});

		query.data.forEach(function(d){
			inlist.forEach(function(colid){ 
				var nd = {};
				xcols.forEach(function(xcolid){ nd[xcolid] = d[xcolid]});
				nd[forcolumnid] = colid;
				nd[tocolumnid] = d[colid];
				data.push(nd);
			});
		});

		query.data = data;

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
					+a[i].toJS('p',query.sources[0].alias,query.defcols);
		 	} else {
		 		query.groupColumns[escapeq(a[i].toString())] = escapeq(a[i].toString());
				var aaa = escapeq(a[i].toString())+'\t'
					+a[i].toJS('p',query.sources[0].alias,query.defcols);
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

	if(gv instanceof Array) {
		var res = [[]];
		for(var t=0; t<gv.length; t++) {
			if(gv[t] instanceof yy.Column) {

				gv[t].nick = escapeq(gv[t].columnid);
			 	query.groupColumns[gv[t].nick] = gv[t].nick;
		 		res = res.map(function(r){return r.concat(gv[t].nick+'\t'+gv[t].toJS('p',query.sources[0].alias,query.defcols))}); 	

			} else if(gv[t] instanceof yy.FuncValue) {
				query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
		 		res = res.map(function(r){return r.concat(escapeq(gv[t].toString())+'\t'+gv[t].toJS('p',query.sources[0].alias,query.defcols))}); 	
		 		// to be defined
			} else if(gv[t] instanceof yy.GroupExpression) {
				if(gv[t].type == 'ROLLUP') res = cartes(res,rollup(gv[t].group,query));
				else if(gv[t].type == 'CUBE') res = cartes(res,cube(gv[t].group,query));
				else if(gv[t].type == 'GROUPING SETS') res = cartes(res,groupingsets(gv[t].group,query));
				else throw new Error('Unknown grouping function');
			} else if(gv[t] === '') {

				res = [['1\t1']];
			} else {

		 		res = res.map(function(r){
 					query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
		 			return r.concat(escapeq(gv[t].toString())
		 				+'\t'
		 				+gv[t].toJS('p',query.sources[0].alias,query.defcols)) 
		 		}); 	

			};

		};
		return res;
	} else if(gv instanceof yy.FuncValue) {

		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [gv.toString()+'\t'+gv.toJS('p',query.sources[0].alias,query.defcols)];
	} else if(gv instanceof yy.Column) {
			gv.nick = escapeq(gv.columnid);
		 	query.groupColumns[gv.nick] = gv.nick;
			return [gv.nick+'\t'+gv.toJS('p',query.sources[0].alias,query.defcols)]; // Is this ever happened?
		// } else if(gv instanceof yy.Expression) {
		// 	return [gv.columnid]; // Is this ever happened?
	} else {
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [escapeq(gv.toString())+'\t'+gv.toJS('p',query.sources[0].alias,query.defcols)];

	};

};

/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Select.prototype.compileDefCols = function(query, databaseid) {

	var defcols = {'.':{}};
	if(this.from) {
		this.from.forEach(function(fr){
			defcols['.'][fr.as || fr.tableid] = true;
			if(fr instanceof yy.Table) {
				var alias = fr.as || fr.tableid;

				var table = alasql.databases[fr.databaseid || databaseid].tables[fr.tableid];

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

			} else if(fr.inserted) {

			} else {

				throw new Error('Unknown type of FROM clause');
			};
		});
	};

	if(this.joins) {
		this.joins.forEach(function(jn){
			defcols['.'][jn.as || jn.table.tableid] = true;

			if(jn.table) {
				var alias = jn.table.tableid;
				if(jn.as) alias = jn.as;
				var alias = jn.as || jn.table.tableid;
				var table = alasql.databases[jn.table.databaseid || databaseid].tables[jn.table.tableid];

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
	return 'UNION';
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

yy.Apply = function (params) { 
	return yy.extend(this, params); 
}

yy.Apply.prototype.toString = function () {
	var s = this.applymode+' APPLY ('+this.select.toString()+')';

	if(this.as) 
		s += ' AS '+this.as;

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
	var s = 'OVER (';
	if(this.partition) {
		s += 'PARTITION BY '+this.partition.toString();
		if(this.order) s+=' ';
	}
	if(this.order) {
		s += 'ORDER BY '+this.order.toString();
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

		alasql.precompile(this,databaseid,params); // Precompile queries
		var exprfn =  new Function("params,alasql,p",'var y;return '+this.expression.toJS('({})','', null)).bind(this);
		var res = exprfn(params,alasql);
		if(cb) {
			res = cb(res);
		}
		return res;
	}
};

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
yy.Expression.prototype.toString = function(dontas) {
	var s = this.expression.toString(dontas);
	if(this.order) {
		s += ' '+this.order.toString();
	}
	if(this.nocase) {
		s += ' COLLATE NOCASE';
	}
	return s;
};

/**
	Find aggregator in AST subtree
	@this ExpressionStatement
	@param {object} query Query object
*/
yy.Expression.prototype.findAggregator = function (query){
	if(this.expression.findAggregator) {
		this.expression.findAggregator(query);
	}
};

/**
	Convert AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

yy.Expression.prototype.toJS = function(context, tableid, defcols) {

	if(this.expression.reduced) {
		return 'true';
	}
	return this.expression.toJS(context, tableid, defcols);
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

	if(this.reduced) {
		return returnTrue();
	}
	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
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

yy.JavaScript.prototype.toJS = function( /* context, tableid, defcols*/ ) {

	return '('+this.value+')';
};
yy.JavaScript.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	var expr =  new Function("params,alasql,p",this.value);
	expr(params,alasql);
	if(cb){
		res = cb(res);
	}
	return res;
};

/**
	Literal class
	@class
	@example
	MyVar, [My vairable], `MySQL variable`
*/

yy.Literal = function (params) { return yy.extend(this, params); };
yy.Literal.prototype.toString = function(dontas) {
	var s = this.value;
	if(this.value1){
		s = this.value1+'.'+s; 
	}
	if(this.alias && !dontas) s += ' AS '+this.alias;
//	else s = tableid+'.'+s;
	return s;
};

/**
	Join class
	@class
*/

yy.Join = function (params) { return yy.extend(this, params); };
yy.Join.prototype.toString = function() {
	var s = ' ';
	if(this.joinmode){
		s += this.joinmode+' ';
	}
	s += 'JOIN ' + this.table.toString();
	return s;
};

// }

/**
	Table class
	@class
*/

yy.Table = function (params) { return yy.extend(this, params); };
yy.Table.prototype.toString = function() {
	var s = this.tableid;
//	if(this.joinmode)
	if(this.databaseid){
		s = this.databaseid+'.'+s;
	}
	return s;
};

/**
	View class
	@class
*/

yy.View = function (params) { return yy.extend(this, params); };
yy.View.prototype.toString = function() {
	var s = this.viewid;
//	if(this.joinmode)
	if(this.databaseid){
		s = this.databaseid+'.'+s;
	}
	return s;
};

/**
	Binary operation class
	@class
*/
yy.Op = function (params) { return yy.extend(this, params); };
yy.Op.prototype.toString = function() {
	if(this.op === 'IN' || this.op === 'NOT IN') {
		return this.left.toString()+" "+this.op+" ("+this.right.toString()+")";
	}
	if(this.allsome) {
		return this.left.toString()+" "+this.op+" "+this.allsome+' ('+this.right.toString()+')';
	}
	if(this.op === '->' || this.op === '!') {
		var s = this.left.toString()+this.op;

		if(typeof this.right !== 'string' && typeof this.right !== 'number' ){
			s += '(';
		}

		s += this.right.toString();

		if(typeof this.right !== 'string' && typeof this.right !== 'number' ){
			s += ')';
		}

		return s;
	}
	return 	this.left.toString() + " " + this.op + " " +
			(this.allsome ? this.allsome+' ' : '') +
			this.right.toString();
};

yy.Op.prototype.findAggregator = function (query){

	if(this.left && this.left.findAggregator){
		this.left.findAggregator(query);
	}
	// Do not go in > ALL
	if(this.right && this.right.findAggregator && (!this.allsome)) {
		this.right.findAggregator(query);
	}
};

yy.Op.prototype.toType = function(tableid) {
	if(['-','*','/','%','^'].indexOf(this.op) >-1){
		return 'number';
	}
	if(['||'].indexOf(this.op) >-1){
		return 'string';
	}
	if(this.op === '+') {
		if(this.left.toType(tableid) === 'string' || this.right.toType(tableid) === 'string'){
			return 'string';
		}
		if(this.left.toType(tableid) === 'number' || this.right.toType(tableid) === 'number'){ 
			return 'number';
		}
	}

	if(['AND','OR','NOT','=','==','===', '!=','!==','!===','>','>=','<','<=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE', 'REGEXP', 'GLOB'].indexOf(this.op) >-1 ){
		return 'boolean';
	}

	if(this.op === 'BETWEEN' || this.op === 'NOT BETWEEN' || this.op === 'IS NULL' || this.op === 'IS NOT NULL'){
		return 'boolean';
	}

	if(this.allsome){
		return 'boolean';
	}

	if(!this.op){
		return this.left.toType();
	}

	return 'unknown';
};

yy.Op.prototype.toJS = function(context,tableid,defcols) {

	var s;
	var op = this.op;
	var _this = this;
	var leftJS = function(){return _this.left.toJS(context,tableid, defcols)};
	var rightJS = function(){return _this.right.toJS(context,tableid, defcols)};

	if(this.op === '='){
		op = '===';
	} else if(this.op === '<>'){
		op = '!=';
	} else if(this.op === 'OR'){
		op = '||';
	}

	// Arrow operator
	if(this.op === '->') {
		// Expression to prevent error if object is empty (#344)
		var ljs = '('+leftJS()+'||{})';

		if(typeof this.right === "string") {
			return ljs +'["'+this.right+'"]';

		} else if(typeof this.right === "number") {
			return ljs+'['+this.right+']';

		} else if(this.right instanceof yy.FuncValue) {
			var ss = [];
			if(!(!this.right.args || 0 === this.right.args.length)) {
				var ss = this.right.args.map(function(arg){
					return arg.toJS(context,tableid, defcols);
				});
			}
			return 	''
					+ ljs
					+ "['"
					+ 	this.right.funcid
					+ "']("
					+ 	ss.join(',')
					+ ')'; 
		} else {

			return 	''
					+ ljs
					+ '['
					+	rightJS()
					+ ']';
		}
	}

	if(this.op === '!') {
		if(typeof this.right === "string") {
			return 	''
					+ 'alasql.databases[alasql.useid].objects['
					+ 	leftJS()
					+ ']["'
					+	this.right
					+ '"]';
		}		
		// TODO - add other cases
	}

	if(this.op === 'IS') {
		return 	''
				+ '('
				+	'(typeof ' + leftJS()  + "==='undefined')"
				+	" === "
				+	'(typeof ' + rightJS() + "==='undefined')"
				+ ')';
	}

	if(this.op === '==') {
		return 	''
				+ 'alasql.utils.deepEqual('
				+	leftJS()
				+ 	','
				+ 	rightJS()
				+ ')';
	}

	if(this.op === '===' || this.op === '!===') {
		return 	''
				+ '('
				+ 	( (this.op === '!===') ? '!' : '')
				+	'('
				+		'(' + leftJS() + ").valueOf()"
				+ 		'==='
				+ 		'(' + rightJS() + ").valueOf()"
				+ 	')'
				+ ')';

	}

	if(this.op === '!==') {
		return 	''
				+ '(!alasql.utils.deepEqual('
				+ 	leftJS()
				+ 	","
				+ 	rightJS()
				+ '))';
	}
	if(this.op === '||') {
		return 	''
				+ "(''+("
				+ 	leftJS()
				+ 	"||'')+("
				+ 	rightJS()
				+ '||""))';
	}
	if(this.op === 'LIKE' || this.op === 'NOT LIKE') {
		var s = '('
				+ 	( (this.op === 'NOT LIKE') ? '!' : '')
				+ 	'alasql.utils.like(' + rightJS()+ "," + leftJS();
		if(this.escape) {
			s += ','+this.escape.toJS(context,tableid, defcols);
		}
		s += '))';
		return s;
	}
	if(this.op === 'REGEXP') {
		return 'alasql.stdfn.REGEXP_LIKE(' 
			+ leftJS()
			+ ','
			+ rightJS()
			+ ')';
	}
	if(this.op === 'GLOB') {
		return 'alasql.utils.glob(' 
			+ leftJS()
			+ ','
			+ rightJS()
			+ ')';
	}

	if(this.op === 'BETWEEN' || this.op === 'NOT BETWEEN') {
		return 	''
				+ '('
				+ 	( (this.op === 'NOT BETWEEN') ? '!' : '')
				+ 	'('
				+ 		'('
				+ 			this.right1.toJS(context,tableid, defcols)
				+			'<='
				+			leftJS()
				+		') && ('
				+			leftJS()
				+			'<='
				+			this.right2.toJS(context,tableid, defcols)
				+		')'
				+ 	')'		
				+ ')';		

	}

	if(this.op === 'IN') {
		if(this.right instanceof yy.Select ) {
			s = '(';

			s += 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx)+'](params,null,'+context+'))';
			s += '.indexOf(';
			s += leftJS()+')>-1)';
			return s;
		} else if(this.right instanceof Array ) {

			s 	= '(['
				+ this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')
				+ '].indexOf('
				+ leftJS()
				+ ')>-1)';

			return s;
		} else {
			s = '('+rightJS()+'.indexOf('
			  	+ leftJS()+')>-1)';

			return s;

		}
	}

	if(this.op === 'NOT IN') {
		if(this.right instanceof yy.Select ) {
			s = '(';
				//this.query.queriesdata['+this.queriesidx+']

			s += 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s +='.indexOf(';
			s += leftJS()+')<0)';
			return s;
		} else if(this.right instanceof Array ) {

			s = '(['+this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')+'].indexOf(';
			s += leftJS()+')<0)';
			return s;
		} else {
			s = '('+rightJS()+'.indexOf(';
			s += leftJS()+')==-1)';
			return s;

		}
	}

	if(this.allsome === 'ALL') {
		var s;
		if(this.right instanceof yy.Select ) {

		 	s = 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';

			s +='.every(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			s = '['+this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')+'].every(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else {
			throw new Error('NOT IN operator without SELECT');
		}		
	}

	if(this.allsome === 'SOME' || this.allsome === 'ANY') {
		var s;
		if(this.right instanceof yy.Select ) {

			s = 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s +='.some(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			s = '['+this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')+'].some(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else {
			throw new Error('SOME/ANY operator without SELECT');
		}		
	}

// Special case for AND optimization (if reduced)
	if(this.op === 'AND') {
		if(this.left.reduced) {
			if(this.right.reduced) {
				return 'true';
			} else {
				return rightJS();
			}
		} else if(this.right.reduced) {
			return leftJS();
		}			

		// Otherwise process as regular operation (see below)
		op = '&&';

	}

	// if(this.op === '^') {
	// 	// return 	'Math.pow('
	// 	// 		+ leftJS()
	// 	// 		+ ','
	// 	// 		+ rightJS()
	// 	// 		+ ')';
	// }

	// Change names

	return 	''
			+ '(('
			+ leftJS()
			+ ')'
			+ op
			+ '('
			+ rightJS()
			+ '))';
}

yy.VarValue = function (params) { return yy.extend(this, params); }
yy.VarValue.prototype.toString = function() {
	return '@'+this.variable;
};

yy.VarValue.prototype.toType = function() {
	return 'unknown';
};

yy.VarValue.prototype.toJS = function() {
	return "alasql.vars['"+this.variable+"']";
}

yy.NumValue = function (params) { return yy.extend(this, params); }
yy.NumValue.prototype.toString = function() {
	return this.value.toString();
};

yy.NumValue.prototype.toType = function() {
	return 'number';
};

yy.NumValue.prototype.toJS = function() {
	return ""+this.value;
}

yy.StringValue = function (params) { return yy.extend(this, params); }
yy.StringValue.prototype.toString = function() {
	return "'"+this.value.toString()+"'";
}

yy.StringValue.prototype.toType = function() {
	return 'string';
}

yy.StringValue.prototype.toJS = function() {

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

yy.LogicValue.prototype.toJS = function() {
	return this.value?'true':'false';
}

yy.NullValue = function (params) { return yy.extend(this, params); }
yy.NullValue.prototype.toString = function() {
	return 'NULL';
}
yy.NullValue.prototype.toJS = function() {
	return 'undefined';
//	return 'undefined';
}

yy.ParamValue = function (params) { return yy.extend(this, params); }
yy.ParamValue.prototype.toString = function() {
	return '$'+this.param;
}
yy.ParamValue.prototype.toJS = function() {
	if(typeof this.param === "string"){
		return "params['"+this.param+"']";
	}

	return "params["+this.param+"]";
}

yy.UniOp = function (params) { return yy.extend(this, params); }
yy.UniOp.prototype.toString = function() {
	if(this.op === '~'){
		return this.op+this.right.toString();
	}

	if(this.op === '-'){
		return this.op+this.right.toString();
	}

	if(this.op === '+'){
		return this.op+this.right.toString();
	}

	if(this.op === '#'){
		return this.op+this.right.toString();
	}

	if(this.op === 'NOT'){
		return this.op+'('+this.right.toString()+')';
	}

	// Please avoid === here
	if(this.op == null){						// jshint ignore:line
		return '('+this.right.toString()+')';
	}

	// todo: implement default case
};

yy.UniOp.prototype.findAggregator = function (query){
	if(this.right.findAggregator){
		this.right.findAggregator(query);
	}
};

yy.UniOp.prototype.toType = function() {
	if(this.op === '-'){
		return 'number';
	}

	if(this.op === '+'){
		return 'number';
	}

	if(this.op === 'NOT'){ 
		return 'boolean';
	}

	// Todo: implement default case
};

yy.UniOp.prototype.toJS = function(context, tableid, defcols) {
	if(this.op === '~'){
		return "(~("+this.right.toJS(context, tableid, defcols)+"))";
	}

	if(this.op === '-'){
		return "(-("+this.right.toJS(context, tableid, defcols)+"))";
	}

	if(this.op === '+'){
		return "("+this.right.toJS(context, tableid, defcols)+")";
	}

	if(this.op === 'NOT'){
		return '!('+this.right.toJS(context, tableid, defcols)+')';
	}

	if(this.op === '#') {
		if(this.right instanceof yy.Column) {
			return "(alasql.databases[alasql.useid].objects[\'"+this.right.columnid+"\'])";
		} else {
			return "(alasql.databases[alasql.useid].objects["
				+this.right.toJS(context, tableid, defcols)+"])";
		}
	}

	// Please avoid === here	
	if(this.op == null){ 		// jshint ignore:line
		return '('+this.right.toJS(context, tableid, defcols)+')';
	}

	// Todo: implement default case.
};

yy.Column = function(params) { return yy.extend(this, params); }
yy.Column.prototype.toString = function(dontas) {
	var s;
	if(this.columnid === +this.columnid) {
		s = '['+this.columnid+']';
	} else {
		s = this.columnid;
	}
	if(this.tableid) {
		if(+this.columnid === this.columnid) {
			s = this.tableid+s;
		} else {
			s = this.tableid+'.'+s;
		}
		if(this.databaseid) {
			s = this.databaseid+'.'+s;
		}
	}
	if(this.alias && !dontas) s += ' AS '+this.alias;
	return s;
};

yy.Column.prototype.toJS = function(context, tableid, defcols) {

	var s = '';
	if(!this.tableid && tableid === '' && !defcols) {
		if(this.columnid !== '_') {
			s = context+'[\''+this.columnid+'\']';
		} else {
			if(context === 'g') {
				s = 'g[\'_\']';						
			} else {
				s = context;
			}
		}
	} else {
		if(context === 'g') {
			// if(this.columnid == '_') {
			// } else {
				s = 'g[\''+this.nick+'\']';						
			// }
		} else if(this.tableid) {
			if(this.columnid !== '_') {
				// if() {
					// s = context+'[\''+tableid + '\'][\''+this.tableid+'\'][\''+this.columnid+'\']';
				// } else {
					s = context+'[\''+(this.tableid) + '\'][\''+this.columnid+'\']';			
				// }
			} else {
				if(context === 'g') {
					s = 'g[\'_\']';						
				} else {
					s = context+'[\''+(this.tableid) + '\']';
				}
			}
		} else if(defcols) {
			var tbid = defcols[this.columnid];
			if(tbid === '-') {
				throw new Error('Cannot resolve column "'+this.columnid+'" because it exists in two source tables');
			} else if(tbid) {
				if(this.columnid !== '_') {
					s = context+'[\''+(tbid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(tbid) + '\']';
				}

			} else {
				if(this.columnid !== '_') {
					// if(defcols['.'][this.tableid]) {

					// 	s = context+'[\''+tableid + '\'][\''+this.tableid + '\'][\''+this.columnid+'\']';
					// } else {
						s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
					// }
				} else {
					s = context+'[\''+(this.tableid || tableid) + '\']';
				}
			}
		} else if(tableid === -1) {

				s = context+'[\''+this.columnid+'\']';

		} else {
			if(this.columnid !== '_') {
				s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
			} else {
				s = context+'[\''+(this.tableid || tableid) + '\']';
			}
		}
	}

//	console.trace(new Error());

	return s;
}

yy.AggrValue = function(params){ return yy.extend(this, params); }
yy.AggrValue.prototype.toString = function(dontas) {
	var s = '';
	if(this.aggregatorid === 'REDUCE'){
		s += this.funcid+'(';
	} else{
		s += this.aggregatorid+'(';
	}

	if(this.distinct){
		s+= 'DISTINCT ';
	}

	if(this.expression){
		s += this.expression.toString();
	}

	s += ')';

	if(this.over){
		s += ' '+this.over.toString();
	} 

	if(this.alias && !dontas) s += ' AS '+this.alias;
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

yy.AggrValue.prototype.findAggregator = function (query){

//	var colas = this.as || this.toString();

	var colas = escapeq(this.toString())+':'+query.selectGroup.length;

	var found = false;

	if(!found) {
		if(!this.nick) {
			this.nick = colas;
			var found = false;
			for(var i=0;i<query.removeKeys.length;i++){
				if(query.removeKeys[i]===colas) {
					found = true;
					break;
				}
			}
			if(!found){
				query.removeKeys.push(colas);
			}
		}
		query.selectGroup.push(this);
	}

	return;
};

yy.AggrValue.prototype.toType = function() {
	if(['SUM','COUNT','AVG','MIN', 'MAX','AGGR','VAR','STDDEV'].indexOf(this.aggregatorid)>-1){
		return 'number';
	}

	if(['ARRAY'].indexOf(this.aggregatorid)>-1){
		return 'array';
	}

	if(['FIRST','LAST' ].indexOf(this.aggregatorid)>-1){
		return this.expression.toType();
	}

	// todo: implement default;
}

yy.AggrValue.prototype.toJS = function(/*context, tableid, defcols*/) {

	var colas = this.nick;
	if(colas === undefined){ 
		colas = this.toString();
	}
	return 'g[\''+colas+'\']';
}

yy.OrderExpression = function(params){ return yy.extend(this, params); }
yy.OrderExpression.prototype.toString = yy.Expression.prototype.toString

yy.GroupExpression = function(params){ return yy.extend(this, params); }
yy.GroupExpression.prototype.toString = function() {
	return this.type+'('+this.group.toString()+')';
}

// Alasql Linq library

yy.FromData = function(params) { return yy.extend(this, params); };
yy.FromData.prototype.toString = function() {
	if(this.data) return 'DATA('+((Math.random()*10e15)|0)+')';
	else return '?';
};
yy.FromData.prototype.toJS = function(){

};

yy.Select.prototype.exec = function(params,cb) {

	if(this.preparams) params = this.preparams.concat(params);

	var databaseid = alasql.useid;
	db = alasql.databases[databaseid];
	var sql = this.toString();
	var hh = hash(sql);

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
yy.FuncValue.prototype.toString = function(dontas) {
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
	if(this.as && !dontas) s += ' AS '+this.as.toString();
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.FuncValue.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	alasql.precompile(this,databaseid,params); // Precompile queries

	var expr =  new Function('params,alasql','var y;return '+this.toJS('','',null));
	expr(params,alasql);
	if(cb) res = cb(res);
	return res;
}

yy.FuncValue.prototype.findAggregator = function(query) {
	if(this.args && this.args.length > 0) {
		this.args.forEach(function(arg){ 
			if(arg.findAggregator) arg.findAggregator(query); 
		});
	}
};

yy.FuncValue.prototype.toJS = function(context, tableid, defcols) {
	var s = '';
    var funcid = this.funcid;
	// IF this is standard compile functions
	if(alasql.fn[funcid]) {
	// This is user-defined run-time function
	// TODO arguments!!!

		if(this.newid) s+= 'new ';
		s += 'alasql.fn.'+this.funcid+'(';

		if(this.args && this.args.length > 0) {
			s += this.args.map(function(arg){
				return arg.toJS(context, tableid, defcols);
			}).join(',');
		};
		s += ')';
	} else if(alasql.stdlib[funcid.toUpperCase()]) {
		if(this.args && this.args.length > 0) {
			s += alasql.stdlib[funcid.toUpperCase()].apply(this, this.args.map(function(arg) {return arg.toJS(context, tableid)}));
		} else {
			s += alasql.stdlib[funcid.toUpperCase()]();
		}
	} else if(alasql.stdfn[funcid.toUpperCase()]) {
		if(this.newid) s+= 'new ';
		s += 'alasql.stdfn.'+this.funcid.toUpperCase()+'(';

		if(this.args && this.args.length > 0) {
			s += this.args.map(function(arg){
				return arg.toJS(context, tableid, defcols);
			}).join(',');
		};
		s += ')';		
	} else {
		// Aggregator
	}

//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

var stdlib = alasql.stdlib = {}
var stdfn = alasql.stdfn = {}

stdlib.ABS = function(a) {return 'Math.abs('+a+')'};
stdlib.CLONEDEEP = function(a) {return 'alasql.utils.cloneDeep('+a+')'};

stdfn.CONCAT = function(){
	return Array.prototype.slice.call(arguments).join(' ');
};
stdlib.EXP = function(a) {return 'Math.pow(Math.E,'+a+')'};

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

stdlib.LOWER = stdlib.LCASE = function(s) {return und(s,'String(y).toLowerCase()');}
//stdlib.LCASE = function(s) {return '('+s+').toLowerCase()';}

// LTRIM

stdlib.MAX = stdlib.GREATEST = function(){
      return 'Math.max('+Array.prototype.join.call(arguments, ',')+')'
};

stdlib.MIN = stdlib.LEAST = function(){
      return 'Math.min('+Array.prototype.join.call(arguments, ',')+')'
};

stdlib.SUBSTRING = stdlib.SUBSTR = stdlib.MID = function(a,b,c){
	if(arguments.length == 2) return und(a,'y.substr('+b+'-1)');
	else if(arguments.length == 3) return und(a,'y.substr('+b+'-1,'+c+')');
};

stdfn.REGEXP_LIKE = function(a,b,c) {

	return (a||'').search(RegExp(b,c))>-1;
}

// Here we uses undefined instead of null
stdlib.ISNULL = stdlib.NULLIF = function(a,b){return '('+a+'=='+b+'?undefined:'+a+')'};

stdlib.POWER = function(a,b) {return 'Math.pow('+a+','+b+')'};

stdlib.RANDOM = function(r) {
	if(arguments.length == 0) {
		return 'Math.random()';
	} else {
		return '(Math.random()*('+r+')|0)';
	}
};
stdlib.ROUND = function(s,d) {
	if(arguments.length == 2) {
		return 'Math.round(('+s+')*Math.pow(10,('+d+')))/Math.pow(10,('+d+'))';
	} else {
		return 'Math.round('+s+')';
	}
};
stdlib.CEIL = stdlib.CEILING = function(s) {return 'Math.ceil('+s+')'};
stdlib.FLOOR = function(s) {return 'Math.floor('+s+')'};

stdlib.ROWNUM = function() {return '1'};
stdlib.ROW_NUMBER = function() {return '1'};

stdlib.SQRT = function(s) {return 'Math.sqrt('+s+')'};

stdlib.TRIM = function(s) {return und(s,'y.trim()');}

stdlib.UPPER = stdlib.UCASE = function(s) {return und(s,'String(y).toUpperCase()');}

// Concatination of strings
stdfn.CONCAT_WS = function() {
    args = Array.prototype.slice.call(arguments);
    return args.slice(1, args.length).join(args[0]);
};

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
alasql.aggr.GROUP_CONCAT = function(v,s,stage){
    if(stage == 1) {
    	return v; 
    } else if(stage == 2) {
    	return s+','+v;
    }
};

// Median
// alasql.aggr.MEDIAN = function(v,s,acc){

// };

alasql.aggr.MEDIAN = function(v,s,stage){
  if(stage == 1) {
    return [v];
  } else if(stage == 2) {
    s.push(v);    
    return s;
  } else {
    var p = s.sort();
    return p[(p.length/2)|0];     
  };
};

// Standard deviation
alasql.aggr.VAR = function(v,s,stage){
	if(stage == 1) {
		return {arr:[v],sum:v};
	} else if(stage == 2) {
		s.arr.push(v);
		s.sum += v;
		return s;
	} else {
		var N = s.arr.length;
		var avg = s.sum / N;
		var std = 0;
		for(var i=0;i<N;i++) {
			std += (s.arr[i]-avg)*(s.arr[i]-avg);
		}
		std = std/(N-1);
		return std;
	}
};

alasql.aggr.STDEV = function(v,s,stage){
	if(stage == 1 || stage == 2 ) {
		return alasql.aggr.VAR(v,s,stage);
	} else {
		return Math.sqrt(alasql.aggr.VAR(v,s,stage));
	}
};

// Standard deviation
// alasql.aggr.VARP = function(v,s,acc){

// };

alasql.aggr.VARP = function(v,s,stage){
	if(stage == 1) {
		return {arr:[v],sum:v};
	} else if(stage == 2) {
		s.arr.push(v);
		s.sum += v;
		return s;
	} else {
		var N = s.arr.length;
		var avg = s.sum / N;
		var std = 0;
		for(var i=0;i<N;i++) {
			std += (s.arr[i]-avg)*(s.arr[i]-avg);
		}
		std = std/N;
		return std;
	}
};

alasql.aggr.STD = alasql.aggr.STDDEV = alasql.aggr.STDEVP = function(v,s,stage){
	if(stage == 1 || stage == 2 ) {
		return alasql.aggr.VARP(v,s,stage);
	} else {
		return Math.sqrt(alasql.aggr.VARP(v,s,stage));
	}
};

// String functions
stdfn.REPLACE = function (target,pattern,replacement) {
    return (target||'').split(pattern).join(replacement);
};

// This array is required for fast GUID generation
var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }

stdfn.NEWID = stdfn.UUID = stdfn.GEN_RANDOM_UUID = function() {
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
};

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

	if(this.expression && this.expression.findAggregator) this.expression.findAggregator(query);
	if(this.whens && this.whens.length > 0) {
		this.whens.forEach(function(w) { 
			if(w.when.findAggregator) w.when.findAggregator(query);
			if(w.then.findAggregator) w.then.findAggregator(query);
		});
	};
	if(this.elses && this.elses.findAggregator) this.elses.findAggregator(query);
};

yy.CaseValue.prototype.toJS = function(context, tableid, defcols) {

	var s = '((function('+context+',params,alasql){var r;';
	if(this.expression) {

		s += 'v='+this.expression.toJS(context, tableid, defcols)+';';
		s += (this.whens||[]).map(function(w) { return ' if(v=='+w.when.toJS(context,tableid, defcols)
			+') {r='+w.then.toJS(context,tableid, defcols)+'}'; }).join(' else ');
		if(this.elses) s += ' else {r='+this.elses.toJS(context,tableid, defcols)+'}';
	} else {
		s += (this.whens||[]).map(function(w) { return ' if('+w.when.toJS(context,tableid, defcols)
			+') {r='+w.then.toJS(context,tableid, defcols)+'}'; }).join(' else ');
		if(this.elses) s += ' else {r='+this.elses.toJS(context,tableid,defcols)+'}';
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
		} else if(!obj.toJS || obj instanceof yy.Json) {
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

function JSONtoJS(obj, context, tableid, defcols) {
	var s = '';
	if(typeof obj == "string") s = '"'+obj+'"';
	else if(typeof obj == "number") s = '('+obj+')';
	else if(typeof obj == "boolean") s = obj;
	else if(typeof obj == "object") {
		if(obj instanceof Array) {
			s += '['+obj.map(function(b){
				return JSONtoJS(b, context, tableid, defcols);
			}).join(',')+']';
		} else if(!obj.toJS || obj instanceof yy.Json) {
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
				s1 += ':'+JSONtoJS(obj[k], context, tableid, defcols);
				ss.push(s1);
			};
			s += ss.join(',')+'}';
		} else if(obj.toJS)	{
			s = obj.toJS(context, tableid, defcols);
		} else {
			throw new Error('1Can not parse JSON object '+JSON.stringify(obj));
		}
	} else {
		throw new Error('2Can not parse JSON object '+JSON.stringify(obj));		
	}

	return s;
}

yy.Json.prototype.toJS = function(context, tableid, defcols) {
	// TODO redo
	return JSONtoJS(this.value,context, tableid, defcols);
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
yy.Convert.prototype.toJS = function(context, tableid, defcols) {

//	if(this.style) {
	return 'alasql.stdfn.CONVERT('+this.expression.toJS(context, tableid, defcols)
		+',{dbtypeid:"'+this.dbtypeid+'",dbsize:'+this.dbsize+',style:'+
		this.style+'})';		
//	}

	throw new Error('There is not such type conversion for '+this.toString());
};

/**
 Convert one type to another
 */
alasql.stdfn.CONVERT = function(value, args) {
	var val = value;

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
	} else if(udbtypeid == 'DATETIME' || udbtypeid == 'DATETIME2') {
		var d = new Date(val);
		var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
		s += " "+("0"+d.getHours()).substr(-2)+":"+("0"+d.getMinutes()).substr(-2)+":"+("0"+d.getSeconds()).substr(-2);
		s += '.'+("00"+d.getMilliseconds()).substr(-3)
		return s;
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
	} else if(['NUMBER','FLOAT'].indexOf(udbtypeid)>-1) {
		if(typeof args.dbprecision != 'undefined') {
			var m = +val;
			var fxd = Math.pow(10,args.dbprecision);
			return (m|0)+((m*fxd)%fxd)/fxd;
		} else {
			return +val;
		}
	} else if((['DECIMAL','NUMERIC'].indexOf(udbtypeid)>-1)) {
		var m = +val;
		var fxd = Math.pow(10,args.dbprecision);
		return (m|0)+((m*fxd)%fxd)/fxd;
	} else if(['JSON'].indexOf(udbtypeid)>-1) {
		if(typeof val == 'object') return val;
		try {
			return JSON.parse(val);
		} catch(err) { throw new Error('Cannot convert string to JSON');};
	} else {
		throw new Error('Wrong conversion type');
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
	if(this.dbtypeid){
		s += ' '+this.dbtypeid;
	}

	if(this.dbsize) {
		s += '('+this.dbsize;
		if(this.dbprecision){
			s += ','+this.dbprecision;
		}
		s += ')';
	}

	if(this.primarykey){
		s += ' PRIMARY KEY';
	}

	if(this.notnull){
		s += ' NOT NULL';
	}

	return s;
}

yy.CreateTable = function (params) { return yy.extend(this, params); }
yy.CreateTable.prototype.toString = function() {
	var s = 'CREATE';
	if(this.temporary){
		s+=' TEMPORARY';
	}

	if(this.view){
		s += ' VIEW';
	} else{
		s += ' '+(this.class?'CLASS':'TABLE');
	}

	if(this.ifnotexists){
		s += ' IF  NOT EXISTS';
	}
	s += ' '+this.table.toString();
	if(this.viewcolumns) {
		s += '('+this.viewcolumns.map(function(vcol){
			return vcol.toString();
		}).join(',')+')';
	}
	if(this.as){
		s += ' AS '+this.as;
	} else { 
		var ss = this.columns.map(function(col){
			return col.toString();
		});
		s += ' ('+ss.join(',')+')';
	}

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

	// IF NOT EXISTS
	if(this.ifnotexists && db.tables[tableid]){
		return 0;
	}

	if(db.tables[tableid]) {
		throw new Error('Can not create table \''+tableid
			+'\', because it already exists in the database \''+db.databaseid+'\'');
	}

	var table = db.tables[tableid] = new alasql.Table(); // TODO Can use special object?

	// If this is a class
	if(this.class) {
		table.isclass = true;
	}

	var ss = [];  // DEFAULT function components
	var uss = []; // ON UPDATE function components
	if(columns) {
		columns.forEach(function(col) {
			var dbtypeid = col.dbtypeid;
			if(!alasql.fn[dbtypeid]){
				dbtypeid = dbtypeid.toUpperCase();
			}

			// Process SERIAL data type like Postgress
			if(['SERIAL','SMALLSERIAL','BIGSERIAL'].indexOf(dbtypeid)>-1){
				col.identity = {value:1,step:1};
			}

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

			}
			if(col.check) {
				table.checkfn.push(new Function("r",'var y;return '+col.check.expression.toJS('r','')));
			}

			if(col.default) {
				ss.push('\''+col.columnid+'\':'+col.default.toJS('r',''));
			}

			// Check for primary key
			if(col.primarykey) {
				var pk = table.pk = {};
				pk.columns = [col.columnid];
				pk.onrightfns = 'r[\''+col.columnid+'\']';
				pk.onrightfn = new Function("r",'var y;return '+pk.onrightfns);
				pk.hh = hash(pk.onrightfns);
				table.uniqs[pk.hh] = {};
			}

			// UNIQUE clause
			if(col.unique) {
				var uk = {};
				table.uk = table.uk||[];
				table.uk.push(uk);
				uk.columns = [col.columnid];
				uk.onrightfns = 'r[\''+col.columnid+'\']';
				uk.onrightfn = new Function("r",'var y;return '+uk.onrightfns);
				uk.hh = hash(uk.onrightfns);
				table.uniqs[uk.hh] = {};
			}

			// UNIQUE clause
			if(col.foreignkey) {

				var fk = col.foreignkey.table;
				var fktable = alasql.databases[fk.databaseid||alasql.useid].tables[fk.tableid];
				if(typeof fk.columnid === 'undefined') {
					if(fktable.pk.columns && fktable.pk.columns.length >0 ){
						fk.columnid = fktable.pk.columns[0];
					} else {
						throw new Error('FOREIGN KEY allowed only to tables with PRIMARY KEYs');
					}
				}

				var fkfn = function(r) {
					var rr = {};
					if(typeof r[col.columnid] === 'undefined'){
						return true;
					}
					rr[fk.columnid] = r[col.columnid];
					var addr = fktable.pk.onrightfn(rr);

					if(!fktable.uniqs[fktable.pk.hh][addr]) {
						throw new Error('Foreign key "'+r[col.columnid]+'" is not found in table '+fktable.tableid);
					}
					return true;
				};
				table.checkfn.push(fkfn);
			}

			if(col.onupdate) {
				uss.push('r[\''+col.columnid+'\']='+col.onupdate.toJS('r',''));
			}

			table.columns.push(newcol);
			table.xcolumns[newcol.columnid] = newcol;

		});
	}
	table.defaultfns = ss.join(',');
	table.onupdatefns = uss.join(';');

//	if(constraints) {
	constraints.forEach(function(con) {

		if(con.type === 'PRIMARY KEY') {
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
		} else if(con.type === 'CHECK') {

			table.checkfn.push(new Function("r",'var y;return '+con.expression.toJS('r','')));
		} else if(con.type === 'UNIQUE') {

			var uk = {};
			table.uk = table.uk||[];
			table.uk.push(uk);
			uk.columns = con.columns;
			uk.onrightfns = uk.columns.map(function(columnid){
				return 'r[\''+columnid+'\']'
			}).join("+'`'+");
			uk.onrightfn = new Function("r",'var y;return '+uk.onrightfns);
			uk.hh = hash(uk.onrightfns);
			table.uniqs[uk.hh] = {};					
		} else if(con.type === 'FOREIGN KEY') {

			var col = table.xcolumns[con.columns[0]];
			var fk = con.fktable;
			if(con.fkcolumns && con.fkcolumns.length>0){
				fk.columnid = con.fkcolumns[0];
 			}
 			var fktable = alasql.databases[fk.databaseid||alasql.useid].tables[fk.tableid];
			if(typeof fk.columnid === 'undefined') {
				fk.columnid = fktable.pk.columns[0];
			}

			var fkfn = function(r) {
				var rr = {};
				if(typeof r[col.columnid] === 'undefined'){
					return true;
				}
				rr[fk.columnid] = r[col.columnid];
				var addr = fktable.pk.onrightfn(rr);

				if(!fktable.uniqs[fktable.pk.hh][addr]) {

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

	if(db.engineid) {

		return alasql.engines[db.engineid].createTable(this.table.databaseid || databaseid, tableid, this.ifnotexists, cb);

	}

//	}

	table.insert = function(r,orreplace) {
		var oldinserted = alasql.inserted;
		alasql.inserted = [r];

		var table = this;

		var toreplace = false; // For INSERT OR REPLACE

/*
		// IDENTINY or AUTO_INCREMENT
		// if(table.identities && table.identities.length>0) {
		// 	table.identities.forEach(function(ident){
		// 		r[ident.columnid] = ident.value;
		// 	});
		// }
*/
		// Trigger prevent functionality
		var prevent = false;
		for(var tr in table.beforeinsert) {
			var trigger = table.beforeinsert[tr];
			if(trigger) {
				if(trigger.funcid) {
					if(alasql.fn[trigger.funcid](r) === false) prevent = prevent || true;
				} else if(trigger.statement) {
					if(trigger.statement.execute(databaseid) === false) prevent = prevent || true;
				}
			}
		};
		if(prevent) return; 

		// Trigger prevent functionality
		var escape = false;
		for(var tr in table.insteadofinsert) {
			escape = true;
			var trigger = table.insteadofinsert[tr];
			if(trigger) {
				if(trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if(trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		};
		if(escape) return;

		for(var columnid in table.identities){
			var ident = table.identities[columnid];

			r[columnid] = ident.value;

		}

		if(table.checkfn && table.checkfn.length>0) {
			table.checkfn.forEach(function(checkfn){
				if(!checkfn(r)) {

					throw new Error('Violation of CHECK constraint');			
				}
			});
		}

		table.columns.forEach(function(column){
			if(column.notnull && typeof r[column.columnid] === 'undefined') {
				throw new Error('Wrong NULL value in NOT NULL column '+column.columnid);
			}
		});
		if(table.pk) {
			var pk = table.pk;
			var addr = pk.onrightfn(r);

			if(typeof table.uniqs[pk.hh][addr] !== 'undefined') {

				if(orreplace) toreplace=table.uniqs[pk.hh][addr]; else
				throw new Error('Cannot insert record, because it already exists in primary key index');
			} 

		}

		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				var ukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][ukaddr] !== 'undefined') {
					if(orreplace) toreplace=table.uniqs[uk.hh][ukaddr]; else
					throw new Error('Cannot insert record, because it already exists in unique index');
				} 				

			});
		}

		if(toreplace) {
			// Do UPDATE!!!

			table.update(function(t){
				for(var f in r) t[f] = r[f];
			},table.data.indexOf(toreplace),params);
		} else {
			table.data.push(r);

		// Final change before insert

		// Update indices

			for(var columnid in table.identities){
				var ident = table.identities[columnid];

				ident.value += ident.step;

			}

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
			}
		}

		// Trigger prevent functionality
		for(var tr in table.afterinsert) {
			var trigger = table.afterinsert[tr];
			if(trigger) {
				if(trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if(trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		};
		alasql.inserted = oldinserted;
	};

	table.delete = function(index) {
		var table = this;
		var r = table.data[index];

		// Prevent trigger
		var prevent = false;
		for(var tr in table.beforedelete) {
			var trigger = table.beforedelete[tr];
			if(trigger) {
				if(trigger.funcid) {
					if(alasql.fn[trigger.funcid](r) === false) prevent = prevent || true;
				} else if(trigger.statement) {
					if(trigger.statement.execute(databaseid) === false) prevent = prevent || true;
				}
			}
		};
		if(prevent) return false; 

		// Trigger prevent functionality
		var escape = false;
		for(var tr in table.insteadofdelete) {
			escape = true;
			var trigger = table.insteadofdelete[tr];
			if(trigger) {
				if(trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if(trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		};
		if(escape) return;

		if(this.pk) {
			var pk = this.pk;
			var addr = pk.onrightfn(r);
			if(typeof this.uniqs[pk.hh][addr] === 'undefined') {
				throw new Error('Something wrong with primary key index on table');
			} else {
				this.uniqs[pk.hh][addr]=undefined;
			}
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				var ukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][ukaddr] === 'undefined') {
					throw new Error('Something wrong with unique index on table');
				} 				
				table.uniqs[uk.hh][ukaddr]=undefined;
			});
		}

		// Trigger prevent functionality
		for(var tr in table.afterdelete) {
			var trigger = table.afterdelete[tr];
			if(trigger) {
				if(trigger.funcid) {
					alasql.fn[trigger.funcid](r);
				} else if(trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		};

	};

	table.deleteall = function() {
		this.data.length = 0;
		if(this.pk) {

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

		var pk;
		// PART 1 - PRECHECK
		if(this.pk) {
			pk = this.pk;
			pk.pkaddr = pk.onrightfn(r,params);
			if(typeof this.uniqs[pk.hh][pk.pkaddr] === 'undefined') {
				throw new Error('Something wrong with index on table');
			} 
		}
		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				uk.ukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][uk.ukaddr] === 'undefined') {
					throw new Error('Something wrong with unique index on table');
				} 				
			});
		}

		assignfn(r,params,alasql);

		// Prevent trigger
		var prevent = false;
		for(var tr in table.beforeupdate) {
			var trigger = table.beforeupdate[tr];
			if(trigger) {
				if(trigger.funcid) {
					if(alasql.fn[trigger.funcid](this.data[i],r) === false) prevent = prevent || true;
				} else if(trigger.statement) {
					if(trigger.statement.execute(databaseid) === false) prevent = prevent || true;
				}
			}
		};
		if(prevent) return false; 

		// Trigger prevent functionality
		var escape = false;
		for(var tr in table.insteadofupdate) {
			escape = true;
			var trigger = table.insteadofupdate[tr];
			if(trigger) {
				if(trigger.funcid) {
					alasql.fn[trigger.funcid](this.data[i],r);
				} else if(trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		};
		if(escape) return;

		// PART 2 - POST CHECK
		if(table.checkfn && table.checkfn.length>0) {
			table.checkfn.forEach(function(checkfn){
				if(!checkfn(r)) {
					throw new Error('Violation of CHECK constraint');			
				}
			});
		}

		table.columns.forEach(function(column){
			if(column.notnull && typeof r[column.columnid] === 'undefined') {
				throw new Error('Wrong NULL value in NOT NULL column '+column.columnid);
			}
		});
		if(this.pk) {
				pk.newpkaddr = pk.onrightfn(r);
				if(typeof this.uniqs[pk.hh][pk.newpkaddr] !== 'undefined'
					&& pk.newpkaddr !== pk.pkaddr) {
					throw new Error('Record already exists');
				} 
		}

		if(table.uk && table.uk.length) {
			table.uk.forEach(function(uk){
				uk.newukaddr = uk.onrightfn(r);
				if(typeof table.uniqs[uk.hh][uk.newukaddr] !== 'undefined'
					&& uk.newukaddr !== uk.ukaddr) {
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

		// Trigger prevent functionality
		for(var tr in table.afterupdate) {
			var trigger = table.afterupdate[tr];
			if(trigger) {
				if(trigger.funcid) {
					alasql.fn[trigger.funcid](this.data[i],r);
				} else if(trigger.statement) {
					trigger.statement.execute(databaseid);
				}
			}
		};

	};

	if(this.view && this.select) {
		table.view = true;

		table.select = this.select.compile(this.table.databaseid||databaseid);
	}

	var res;

	if(!alasql.options.nocount){
		res = 1;
	}

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

var PERIODS = {
  'year': 1000*3600*24*365,
  'quarter':1000*3600*24*365/4,
  'month':1000*3600*24*30,
  'week': 1000*3600*24*7,
  'day': 1000*3600*24,
  'dayofyear': 1000*3600*24,
  'weekday': 1000*3600*24,
  'hour': 1000*3600,
  'minute': 1000*60,
  'second': 1000,
  'millisecond': 1,
  'microsecond': 0.001
};

alasql.stdfn.DATEDIFF = function(period, d1, d2) {
  var interval = (new Date(d2)).getTime() - (new Date(d1)).getTime();
  return interval / PERIODS[period.toLowerCase()];
};

alasql.stdfn.DATEADD = function(period, interval, d) {
  var nd = (new Date(d)).getTime() + interval*PERIODS[period.toLowerCase()];
  return new Date(nd);
};

alasql.stdfn.INTERVAL = function(interval, period) {
  return interval*PERIODS[period.toLowerCase()];
};

alasql.stdfn.DATE_ADD = alasql.stdfn.ADDDATE = function(d, interval) {
  var nd = (new Date(d)).getTime() + interval;
  return new Date(nd);
};

alasql.stdfn.DATE_SUB = alasql.stdfn.SUBDATE = function(d,interval) {
  var nd = (new Date(d)).getTime() - interval;
  return new Date(nd);
};

/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropTable = function (params) { return yy.extend(this, params); };
yy.DropTable.prototype.toString = function() {
	var s = 'DROP'+' ';
	if(this.view) s += 'VIEW';
	else s += 'TABLE';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' '+this.tables.toString();
	return s;
};

// DROP TABLE
/**
	Drop tables
	@param {string} databaseid Database id
	@param {object} params Parameters
	@param {callback} cb Callback function
	@return Number of dropped tables
	@example
	DROP TABLE one;
	DROP TABLE IF NOT EXISTS two, three;
*/
yy.DropTable.prototype.execute = function (databaseid, params, cb) {
	var ifexists = this.ifexists;
	var res = 0; // No tables removed
	var count = 0;
	var tlen = this.tables.length;

	// For each table in the list
	this.tables.forEach(function(table){
		var db = alasql.databases[table.databaseid || databaseid];
		var tableid = table.tableid;

		/** @todo Test with AUTOCOMMIT flag is ON */
		/** @todo Test with IndexedDB and multiple tables */

		if(!ifexists || ifexists && db.tables[tableid]) {
			if(!db.tables[tableid]) {
				if(!alasql.options.dropifnotexists) {
					throw new Error('Can not drop table \''+table.tableid+'\', because it does not exist in the database.');
				}
			} else {
				if(db.engineid /*&& alasql.options.autocommit*/) {
					alasql.engines[db.engineid].dropTable(table.databaseid || databaseid, tableid, ifexists, function(res1){
						delete db.tables[tableid];
						res+=res1;
						count++;
						if(count == tlen && cb) cb(res);	
					});
				} else {
					delete db.tables[tableid];
					res++;
					count++;
					if(count == tlen && cb) cb(res);	
				}
			}
		} else {
			count++;
			if(count == tlen && cb) cb(res);	
		}
	});
	// if(cb) res = cb(res);
	return res;
};

yy.TruncateTable = function (params) { return yy.extend(this, params); };
yy.TruncateTable.prototype.toString = function() {
	var s = 'TRUNCATE TABLE';
	s += ' '+this.table.toString();
	return s;
};

yy.TruncateTable.prototype.execute = function (databaseid, params, cb) {
	var db = alasql.databases[this.table.databaseid || databaseid];
	var tableid = this.table.tableid;
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
	var s = 'CREATE VERTEX ';
	if(this.class){
		s += this.class+' ';
	}
	if(this.sharp){
		s += '#'+this.sharp+' ';
	}
	if(this.sets) {
		s += this.sets.toString();
	} else if(this.content) {
		s += this.content.toString();
	} else if(this.select) {
		s += this.select.toString();
	}

	return s;
}

yy.CreateVertex.prototype.toJS = function(context) {

	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	// var s = '';
	return s;
};

// CREATE TABLE

yy.CreateVertex.prototype.compile = function (databaseid) {
	var dbid = databaseid;

	// CREATE VERTEX #id
	var sharp = this.sharp; 

	// CREATE VERTEX "Name"
	if(typeof this.name !== 'undefined') {
		var s = 'x.name='+this.name.toJS();
		var namefn = new Function('x',s);
	}

	if(this.sets && this.sets.length > 0) {
		var s = this.sets.map(function(st){
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJS('x','');
		}).join(';');
		var setfn = new Function('x,params,alasql',s);
	} 

	// Todo: check for content, select and default

	var statement = function(params,cb){
		var res;

		// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		var id;
		if(typeof sharp !== 'undefined') {
			id = sharp;
		} else {
			id = db.counter++;
		}
		var vertex = {$id: id, $node:'VERTEX'};
		db.objects[vertex.$id] = vertex;
		res = vertex;
		if(namefn){
			namefn(vertex);
		}
		if(setfn){
			setfn(vertex,params,alasql);
		}

		if(cb){
			res = cb(res);
		}
		return res;
	}
	return statement;
};

yy.CreateEdge = function (params) { return yy.extend(this, params); }
yy.CreateEdge.prototype.toString = function() {

	var s = 'CREATE EDGE'+' ';
	if(this.class){
		s += this.class+' ';
	}
	// todo: SET
	// todo: CONTENT
	// todo: SELECT
	return s;
}

yy.CreateEdge.prototype.toJS = function(context) {
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	return s;
};

// CREATE TABLE

yy.CreateEdge.prototype.compile = function (databaseid) {
	var dbid = databaseid;
	var fromfn = new Function('params,alasql','var y;return '+this.from.toJS());
	var tofn = new Function('params,alasql','var y;return '+this.to.toJS());

	// CREATE VERTEX "Name"
	if(typeof this.name !== 'undefined') {
		var s = 'x.name='+this.name.toJS();
		var namefn = new Function('x',s);
	}

	if(this.sets && this.sets.length > 0) {
		var s = this.sets.map(function(st){
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJS('x','');
		}).join(';');
		var setfn = new Function('x,params,alasql','var y;'+s);
	} 

	/*
	todo: handle content, select and default
	else if(this.content) {

	} else if(this.select) {

	} else {
	}
	*/

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
		if(v1.$out === undefined){
			v1.$out = [];
		}
		v1.$out.push(edge.$id);

		if(typeof v2.$in === undefined){
			v2.$in = [];
		}
		v2.$in.push(edge.$id);

		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;
		if(namefn){
			namefn(edge);
		}

		if(setfn){
			setfn(edge,params,alasql);
		}

		if(cb){
			res = cb(res);
		}

		return res;
	};
	return statement;

};

yy.CreateGraph = function (params) { return yy.extend(this, params); }
yy.CreateGraph.prototype.toString = function() {
	var s = 'CREATE GRAPH'+' ';
	if(this.class){
		s += this.class+' ';
	}
	return s;
}

yy.CreateGraph.prototype.execute = function (databaseid,params,cb) {
	var res = [];
	if(this.from) {
		if(alasql.from[this.from.funcid]) {
			this.graph = alasql.from[this.from.funcid.toUpperCase()]
		}
	}

//	stop;
		this.graph.forEach(function(g){
			if(g.source) {
				// GREATE EDGE
				var e = {};
				if(typeof g.as !== 'undefined'){
					alasql.vars[g.as] = e;
				}

				if(typeof g.prop !== 'undefined') {
	//				e[g.prop] = e;
	//				v.$id = g.prop; // We do not create $id for edge automatically
					e.name = g.prop;				
				}
				if(typeof g.sharp !== 'undefined'){
					e.$id = g.sharp;
				}
				if(typeof g.name !== 'undefined'){
					e.name = g.name;
				}
				if(typeof g.class !== 'undefined'){
					e.$class = g.class;
				}

				var db = alasql.databases[databaseid];
				if(typeof e.$id === 'undefined') {
					e.$id = db.counter++;
				}
				e.$node='EDGE';
				if(typeof g.json !== 'undefined') {
					extend(e,(new Function('params,alasql','var y;return '+
					g.json.toJS()))(params,alasql));
				}

				var v1;
				if(g.source.vars) {
					var vo = alasql.vars[g.source.vars];
					if(typeof vo === 'object'){
						v1 = vo;
					} else{
						v1 = db.objects[vo];
					}
				} else {
					var av1 = g.source.sharp; 
					if(typeof av1 === 'undefined'){
						av1 = g.source.prop;
					} 
					v1 = alasql.databases[databaseid].objects[av1];
					if( 
						typeof v1 === 'undefined' && 
						alasql.options.autovertex && 
						((typeof g.source.prop !== 'undefined') || (typeof g.source.name !== 'undefined'))
					){
						v1 = findVertex(g.source.prop || g.source.name);
						if(typeof v1 === 'undefined') {
							v1 = createVertex(g.source);
						}
					}

				}

				var v2;
				if(g.source.vars) {
					var vo = alasql.vars[g.target.vars];
					if(typeof vo === 'object'){
						v2 = vo;
					} else{
						v2 = db.objects[vo];
					}
				} else {
					var av2 = g.target.sharp; 
					if(typeof av2 === 'undefined'){
						av2 = g.target.prop; 
					}
					v2 = alasql.databases[databaseid].objects[av2];
					if(
						typeof v2 === 'undefined' && 
						alasql.options.autovertex && 
						((typeof g.target.prop !== 'undefined') || (typeof g.target.name !== 'undefined'))
					) {
						v2 = findVertex(g.target.prop || g.target.name);
						if(typeof v2 === 'undefined') {
							v2 = createVertex(g.target);
						}
					}
				}

				// Set link
				e.$in = [v1.$id];
				e.$out = [v2.$id];
				// Set sides
				if(typeof v1.$out === 'undefined'){
					v1.$out = [];
				}
				v1.$out.push(e.$id);
				if(typeof v2.$in === 'undefined'){
					v2.$in = [];
				}
				v2.$in.push(e.$id);

				db.objects[e.$id] = e;
				if(typeof e.$class !== 'undefined') {
					if(typeof alasql.databases[databaseid].tables[e.$class] === 'undefined') {
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

	if(cb){
		res = cb(res);
	}
	return res;

	// Find vertex by name
	function findVertex(name) {
		var objects = alasql.databases[alasql.useid].objects;
		for(var k in objects) {
			if(objects[k].name === name) {
				return objects[k];
			}
		}
		return undefined;
	}

	function createVertex(g) {
		// GREATE VERTEX
		var v = {};
		if(typeof g.as !== 'undefined'){
			alasql.vars[g.as] = v;
		}

		if(typeof g.prop !== 'undefined') {
	//				v[g.prop] = true;
			v.$id = g.prop;
			v.name = g.prop;				
		}

		if(typeof g.sharp !== 'undefined'){
			v.$id = g.sharp;
		}
		if(typeof g.name !== 'undefined'){
			v.name = g.name;
		}
		if(typeof g.class !== 'undefined'){
			v.$class = g.class;
		}

		var db = alasql.databases[databaseid];
		if(typeof v.$id === 'undefined') {
			v.$id = db.counter++;
		}
		v.$node='VERTEX';
		if(typeof g.json !== 'undefined') {
			extend(v,(new Function('params,alasql','var y;return '+
			g.json.toJS()))(params,alasql));
		}
		db.objects[v.$id] = v;
		if(typeof v.$class !== 'undefined') {
			if(typeof alasql.databases[databaseid].tables[v.$class] === 'undefined') {
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
	var fromfn = new Function('params,alasql','var y;return '+this.from.toJS());
	var tofn = new Function('params,alasql','var y;return '+this.to.toJS());

	// CREATE VERTEX "Name"
	if(typeof this.name !== 'undefined') {
		var s = 'x.name='+this.name.toJS();
		var namefn = new Function('x',s);
	}

	if(this.sets && this.sets.length > 0) {
		var s = this.sets.map(function(st){
			return 'x[\''+st.column.columnid+'\']='+st.expression.toJS('x','');
		}).join(';');
		var setfn = new Function('x,params,alasql','var y;'+s);
	} 

	// Todo: handle content, select and default

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
		if(typeof v1.$out === 'undefined'){
			v1.$out = [];
		}
		v1.$out.push(edge.$id);

		if(typeof v2.$in === 'undefined'){
			v2.$in = [];
		}
		v2.$in.push(edge.$id);
		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;
		if(namefn){
			namefn(edge);
		}
		if(setfn){
			setfn(edge,params,alasql);
		}

		if(cb){
			res = cb(res);
		}
		return res;
	}
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
	db.indices[indexid] = tableid;

		var rightfns = this.columns.map(function(expr){
			return expr.expression.toJS('r','')
		}).join("+'`'+");

		var rightfn = new Function('r,params,alasql','return '+rightfns);

	if(this.unique) {
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
		var hh = hash(rightfns);
		table.inddefs[indexid] = {rightfns:rightfns, hh:hh};
		table.indices[hh] = {};

		var ix = table.indices[hh] = {};
		if(table.data.length > 0) {
			for(var i=0, ilen=table.data.length; i<ilen;i++) {
				var addr = rightfn(table.data[i],params,alasql);
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

yy.Reindex = function (params) { return yy.extend(this, params); };
yy.Reindex.prototype.toString = function() {
	var s = 'REINDEX '+this.indexid;
	return s;
};

// CREATE TABLE
yy.Reindex.prototype.execute = function (databaseid,params,cb) {
//	var self = this;
	var db = alasql.databases[databaseid];
	var indexid = this.indexid;

	var tableid = db.indices[indexid];
	var table = db.tables[tableid];
	table.indexColumns();
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
	return 'DROP INDEX' + this.indexid;
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
	var s = 'WITH ';
	s += this.withs.map(function(w){
		return w.name+' AS ('+w.select.toString()+')';
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

			self.withs.forEach(function(w,idx){
				if(savedTables[idx]) alasql.databases[databaseid].tables[w.name] = savedTables[idx] ;
				else delete alasql.databases[databaseid].tables[w.name];
			});			

		if(cb) data = cb(data);
		return data;
	});
	return res;
};

/*
//
// IF for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.If = function (params) { return yy.extend(this, params); }
yy.If.prototype.toString = function() {
	var s = 'IF'+' ';
	s += this.expression.toString();
	s += ' '+this.thenstat.toString();
	if(this.elsestat) s += ' ELSE '+this.thenstat.toString();
	return s;
};

// CREATE TABLE

yy.If.prototype.execute = function (databaseid,params,cb){
	var res;

	var fn = new Function('params,alasql,p','var y;return '+this.expression.toJS('({})','',null)).bind(this);

	if(fn(params,alasql)) res = this.thenstat.execute(databaseid,params,cb);
	else {
		if(this.elsestat) res = this.elsestat.execute(databaseid,params,cb);
		else {
			if(cb) res = cb(res);
		}
	}

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

	var fn = new Function('params,alasql,p','var y;return '+this.expression.toJS());

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
	var s = 'BREAK';
	return s;
};

yy.Break.prototype.execute = function (databaseid,params,cb,scope) {
	var res = 1;
	if(cb) res = cb(res);
	return res;
};

yy.Continue = function (params) { return yy.extend(this, params); }
yy.Continue.prototype.toString = function() {
	var s = 'CONTINUE';
	return s;
};

yy.Continue.prototype.execute = function (databaseid,params,cb,scope) {
	var res = 1;
	if(cb) res = cb(res);	
	return res;
};

yy.BeginEnd = function (params) { return yy.extend(this, params); }
yy.BeginEnd.prototype.toString = function() {
	var s = 'BEGIN '+this.statements.toString()+' END';
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
	var s = 'INSERT ';
	if(this.orreplace) s += 'OR REPLACE ';
	if(this.replaceonly) s = 'REPLACE ';
	s += 'INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	if(this.values) s += ' VALUES '+this.values.toString();
	if(this.select) s += ' '+this.select.toString();
	return s;
}

yy.Insert.prototype.toJS = function(context, tableid, defcols) {

//	if(this.expression.reduced) return 'true';
//	return this.expression.toJS(context, tableid, defcols);

//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';

	return s;
};

yy.Insert.prototype.compile = function (databaseid) {
	var self = this;
	databaseid = self.into.databaseid || databaseid
	var db = alasql.databases[databaseid];

	var tableid = self.into.tableid;
	var table = db.tables[tableid];

	// Check, if this dirty flag is required
	var s = '';
	var sw = '';
	var s = 'db.tables[\''+tableid+'\'].dirty=true;';
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

		self.values.forEach(function(values) {
			var ss = [];

			if(self.columns) {
				self.columns.forEach(function(col, idx){

					var q = "'"+col.columnid +'\':';
					if(table.xcolumns && table.xcolumns[col.columnid]) { 
						if(["INT","FLOAT","NUMBER","MONEY"].indexOf(table.xcolumns[col.columnid].dbtypeid) >=0) {
							//q += ''
							q += "(x="+values[idx].toJS()+",x==undefined?undefined:+x)";
						} else if (alasql.fn[table.xcolumns[col.columnid].dbtypeid]) {
							q += "(new "+table.xcolumns[col.columnid].dbtypeid+"(";
							q += values[idx].toJS();
							q += "))";
						} else {
							q += values[idx].toJS();
						};
					} else { 
						q += values[idx].toJS();
					}
					ss.push(q);

				});
			} else {

				if((values instanceof Array) && table.columns && table.columns.length > 0) {
					table.columns.forEach(function(col, idx){

						var q = '\''+col.columnid +'\':';

						if(["INT","FLOAT","NUMBER","MONEY"].indexOf(col.dbtypeid) >=0) {
							q += "+"+values[idx].toJS();
						} else if (alasql.fn[col.dbtypeid]) {
							q += "(new "+col.dbtypeid+"(";
							q += values[idx].toJS();
							q += "))";
						} else { 
							q += values[idx].toJS();
						}

						ss.push(q);

					});
				} else {

					sw = JSONtoJS(values);
				}
			}

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

	        if(db.tables[tableid].insert) {
				s += 'var db=alasql.databases[\''+databaseid+'\'];';
				s += 'db.tables[\''+tableid+'\'].insert(a,'+(self.orreplace?"true":"false")+');';
	        } else {
				s += 'aa.push(a);';
			}
		});

		s33 = s3+s;

        if(db.tables[tableid].insert) {

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

		var insertfn = new Function('db, params, alasql','var y;'+s3+s).bind(this);

// INSERT INTO table SELECT

	} else if(this.select) {
		this.select.modifier = 'RECORDSET';
		selectfn = this.select.compile(databaseid);
	    if(db.engineid && alasql.engines[db.engineid].intoTable) {
			var statement = function(params, cb) {
				var aa = selectfn(params);
				var res = alasql.engines[db.engineid].intoTable(db.databaseid,tableid,aa.data,null, cb);
				return res;
			};
			return statement;
	    } else {

				var defaultfns = 'return alasql.utils.extend(r,{'+table.defaultfns+'})';
    	    	var defaultfn = new Function('r,db,params,alasql',defaultfns); 
			var insertfn = function(db, params, alasql) {
				var res = selectfn(params).data;
		        if(db.tables[tableid].insert) {
		        	// If insert() function exists (issue #92)
		        	for(var i=0,ilen=res.length;i<ilen;i++) {
		        		var r = cloneDeep(res[i]);
		        		defaultfn(r,db,params,alasql);
		        		db.tables[tableid].insert(r,self.orreplace);
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

    if(db.engineid && alasql.engines[db.engineid].intoTable && alasql.options.autocommit) {
		var statement = function(params, cb) {
			var aa = new Function("db,params",'var y;'+s33+'return aa;')(db,params);

			var res = alasql.engines[db.engineid].intoTable(db.databaseid,tableid,aa, null, cb);

			return res;
		};

    } else {

		var statement = function(params, cb) {

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
// TRIGGER for Alasql.js
// Date: 29.12.2015
//
*/

yy.CreateTrigger = function (params) { return yy.extend(this, params); };
yy.CreateTrigger.prototype.toString = function() {
	var s = 'CREATE TRIGGER '+this.trigger +' ';
	if(this.when) s += this.when+' ';
	s += this.action+' ON ';
	if(this.table.databaseid) s += this.table.databaseid+'.';
	s += this.table.tableid+' ';
	s += this.statement.toString();
	return s;
};

yy.CreateTrigger.prototype.execute = function (databaseid, params, cb) {
	var res = 1; // No tables removed
	var triggerid = this.trigger;
	databaseid = this.table.databaseid || databaseid;
	var db = alasql.databases[databaseid];
	var tableid = this.table.tableid;

	var trigger = {
		action: this.action,
		when: this.when,
		statement: this.statement,
		funcid: this.funcid
	};

	db.triggers[triggerid] = trigger;
	if(trigger.action == 'INSERT' && trigger.when == 'BEFORE') {
		db.tables[tableid].beforeinsert[triggerid] = trigger;
	} else if(trigger.action == 'INSERT' && trigger.when == 'AFTER') {
		db.tables[tableid].afterinsert[triggerid] = trigger;
	} else if(trigger.action == 'INSERT' && trigger.when == 'INSTEADOF') {
		db.tables[tableid].insteadofinsert[triggerid] = trigger;
	} else if(trigger.action == 'DELETE' && trigger.when == 'BEFORE') {
		db.tables[tableid].beforedelete[triggerid] = trigger;
	} else if(trigger.action == 'DELETE' && trigger.when == 'AFTER') {
		db.tables[tableid].afterdelete[triggerid] = trigger;
	} else if(trigger.action == 'DELETE' && trigger.when == 'INSTEADOF') {
		db.tables[tableid].insteadofdelete[triggerid] = trigger;
	} else if(trigger.action == 'UPDATE' && trigger.when == 'BEFORE') {
		db.tables[tableid].beforeupdate[triggerid] = trigger;
	} else if(trigger.action == 'UPDATE' && trigger.when == 'AFTER') {
		db.tables[tableid].afterupdate[triggerid] = trigger;
	} else if(trigger.action == 'UPDATE' && trigger.when == 'INSTEADOF') {
		db.tables[tableid].insteadofupdate[triggerid] = trigger;
	}

	if(cb) res = cb(res);
	return res;
};

yy.DropTrigger = function (params) { return yy.extend(this, params); };
yy.DropTrigger.prototype.toString = function() {
	var s = 'DROP TRIGGER '+this.trigger;
	return s;
};

/**
	Drop trigger
	@param {string} databaseid Database id
	@param {object} params Parameters
	@param {callback} cb Callback function
	@return Number of dropped triggers
	@example
	DROP TRIGGER one;
*/
yy.DropTrigger.prototype.execute = function (databaseid, params, cb) {
	var res = 0; // No tables removed
	var db = alasql.databases[databaseid];
	var triggerid = this.trigger;
	// For each table in the list
	var tableid = db.triggers[triggerid];
	if(tableid) {
		res = 1;
		delete db.tables[tableid].beforeinsert[triggerid];
		delete db.tables[tableid].afterinsert[triggerid];
		delete db.tables[tableid].insteadofinsert[triggerid];
		delete db.tables[tableid].beforedelte[triggerid];
		delete db.tables[tableid].afterdelete[triggerid];
		delete db.tables[tableid].insteadofdelete[triggerid];
		delete db.tables[tableid].beforeupdate[triggerid];
		delete db.tables[tableid].afterupdate[triggerid];
		delete db.tables[tableid].insteadofupdate[triggerid];
		delete db.triggers[triggerid];
	} else {
		throw new Error('Trigger not found');
	}
	if(cb) res = cb(res);
	return res;
};

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

	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;
	var statement;
			var db = alasql.databases[databaseid];

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

		wherefn = new Function('r,params,alasql','var y;return ('+this.where.toJS('r','')+')').bind(this);

		statement = (function (params, cb) {
			if(db.engineid && alasql.engines[db.engineid].deleteFromTable) {
				return alasql.engines[db.engineid].deleteFromTable(databaseid, tableid, wherefn, params, cb);
			}

			if(alasql.options.autocommit && db.engineid && db.engineid == 'LOCALSTORAGE') {
				alasql.engines[db.engineid].loadTableData(databaseid,tableid);
			}

			var table = db.tables[tableid];

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

			table.data = newtable;
			var res = orignum - table.data.length;
			if(alasql.options.autocommit && db.engineid && db.engineid == 'LOCALSTORAGE') {
				alasql.engines[db.engineid].saveTableData(databaseid,tableid);
			}

			if(cb) cb(res);
			return res;
		});

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

			// Reset PRIMARY KEY and indexes
			for(var ix in db.tables[tableid].uniqs) {
				db.tables[tableid].uniqs[ix] = {};
			}

			for(var ix in db.tables[tableid].indices) {
				db.tables[tableid].indices[ix] = {};
			}

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

		var wherefn = new Function('r,params,alasql','var y;return '+this.where.toJS('r','')).bind(this);
	};

	// Construct update function
	var s = alasql.databases[databaseid].tables[tableid].onupdatefns || '';
	s += ';';
	this.columns.forEach(function(col){
		s += 'r[\''+col.column.columnid+'\']='+col.expression.toJS('r','')+';'; 
	});
	var assignfn = new Function('r,params,alasql','var y;'+s);

	var statement = function(params, cb) {
		var db = alasql.databases[databaseid];

		if(db.engineid && alasql.engines[db.engineid].updateTable) {

			return alasql.engines[db.engineid].updateTable(databaseid, tableid, assignfn, wherefn, params, cb);
		}

		if(alasql.options.autocommit && db.engineid) {
			alasql.engines[db.engineid].loadTableData(databaseid,tableid);
		}

		var table = db.tables[tableid];
		if(!table) {
			throw new Error("Table '"+tableid+"' not exists")
		}

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
	var s = 'MERGE ';
	s += this.into.tableid+' ';
	if(this.into.as) s += 'AS '+this.into.as+' ';
	s += 'USING '+this.using.tableid+' ';
	if(this.using.as) s += 'AS '+this.using.as+' ';
	s += 'ON '+this.on.toString()+' ';
	this.matches.forEach(function(m){
		s += 'WHEN ';
		if(!m.matched) s += 'NOT ';
		s += 'MATCHED ';
		if(m.bytarget) s += 'BY TARGET ';
		if(m.bysource) s += 'BY SOURCE ';
		if(m.expr) s+= 'AND'+' '+m.expr.toString()+' ';
		s += 'THEN ';
		if(m.action.delete) s += 'DELETE ';
		if(m.action.insert) {
			s += 'INSERT ';
			if(m.action.columns) s += '('+m.action.columns.toString()+') ';
			if(m.action.values) s += 'VALUES ('+m.action.values.toString()+') ';
			if(m.action.defaultvalues) s += 'DEFAULT VALUES ';
		}
		if(m.action.update) {
			s += 'UPDATE ';
			s += m.action.update.map(function(u){
				return u.toString();
			}).join(',')+' ';
		}

	});

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
	var s = 'CREATE'; 
	if(this.engineid) s+=' '+this.engineid;
	s += ' DATABASE';
	if(this.ifnotexists) s += ' IF NOT EXISTS';
	s += ' '+this.databaseid;
	if(this.args && this.args.length > 0) { 
		s += '('+this.args.map(function(arg){ return arg.toString()}).join(', ')+')';
	}
	if(this.as) s += ' AS '+this.as;
	return s;
}
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.CreateDatabase.prototype.execute = function (databaseid, params, cb) {
	var args;
	if(this.args && this.args.length > 0) {
		args = this.args.map(function(arg){
			return new Function('params,alasql','var y;return '+arg.toJS())(params,alasql);
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
	var s = 'ATTACH';
	if(this.engineid) s += ' '+this.engineid;
	s += ' DATABASE'+' '+this.databaseid;
	// TODO add params
	if(args) {
		s += '(';
			if(args.length>0) {
				s += args.map(function(arg){ return arg.toString(); }).join(', ');
			}
		s += ')';
	}
	if(this.as) s+= ' AS'+' '+this.as;
	return s;
}
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.AttachDatabase.prototype.execute = function (databaseid, params, cb) {
	if(!alasql.engines[this.engineid]) {
		throw new Error('Engine "'+this.engineid+'" is not defined.');
	};
	var res = alasql.engines[this.engineid].attachDatabase(this.databaseid, this.as, this.args, params, cb);
	return res;
};

// CREATE DATABASE databaseid
yy.DetachDatabase = function (params) { return yy.extend(this, params); };
yy.DetachDatabase.prototype.toString = function() {
	var s = 'DETACH';
	s += ' DATABASE'+' '+this.databaseid;
	return s;
}
//yy.CreateDatabase.prototype.compile = returnUndefined;
yy.DetachDatabase.prototype.execute = function (databaseid, params, cb) {
	if(!alasql.databases[this.databaseid].engineid) {
		throw new Error('Cannot detach database "'+this.engineid+'", because it was not attached.');
	};
	var res;

	var dbid = this.databaseid;

	if(dbid == alasql.DEFAULTDATABASEID) {
		throw new Error("Drop of default database is prohibited");			
	}

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
	return 'USE' +' '+'DATABASE'+' '+this.databaseid;
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
	var s = 'DROP';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' DATABASE '+this.databaseid;
	return s;
}
//yy.DropDatabase.prototype.compile = returnUndefined;
yy.DropDatabase.prototype.execute = function (databaseid, params, cb) {
	if(this.engineid) {

		return alasql.engines[this.engineid].dropDatabase(this.databaseid, this.ifexists, cb);
	}
	var res;

	var dbid = this.databaseid;

	if(dbid == alasql.DEFAULTDATABASEID) {
		throw new Error("Drop of default database is prohibited");			
	}
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
	var s = 'DECLARE ';
	if(this.declares && this.declares.length > 0) {
		s = this.declares.map(function(declare){
			var s = '';
			s += '@'+declare.variable+' ';
			s += declare.dbtypeid;
			if(this.dbsize){
				s += '('+this.dbsize;
				if(this.dbprecision){
					s+= ','+this.dbprecision;
				}
				s += ')';
			}
			if(declare.expression){
				s += ' = '+declare.expression.toString();
			}
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
			if(!alasql.fn[dbtypeid]){
				dbtypeid = dbtypeid.toUpperCase();
			}
			alasql.declares[declare.variable] = {dbtypeid:dbtypeid,
				dbsize:declare.dbsize, dbprecision:declare.dbprecision};

			// Set value
			if(declare.expression) {

				alasql.vars[declare.variable] = new Function("params,alasql","return "
					+declare.expression.toJS('({})','', null))(params,alasql);
				if(alasql.declares[declare.variable]) {
					alasql.vars[declare.variable] = alasql.stdfn.CONVERT(alasql.vars[declare.variable],alasql.declares[declare.variable]);
				}
			}

		});
	}
	if(cb){
		res=cb(res);

	}
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
	var s = 'SHOW DATABASES';
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

				return alasql.utils.like(self.like.value,d.databaseid);
			});
		}
		if(cb) cb(res);
		return res;
	};

};

yy.ShowTables = function (params) { return yy.extend(this, params); }
yy.ShowTables.prototype.toString = function() {
	var s = 'SHOW TABLES';
	if(this.databaseid) s += ' FROM '+this.databaseid;
	if(this.like) s += ' LIKE '+this.like.toString();
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
			//return d.tableid.match(new RegExp((self.like.value||'').replace(/\%/g,'.*').replace(/\?|_/g,'.'),'g'));
			return alasql.utils.like(self.like.value,d.tableid);
		});
	};
	if(cb) cb(res);
	return res;
};

yy.ShowColumns = function (params) { return yy.extend(this, params); }
yy.ShowColumns.prototype.toString = function() {
	var s = 'SHOW COLUMNS';
	if(this.table.tableid) s += ' FROM '+this.table.tableid;
	if(this.databaseid) s += ' FROM '+this.databaseid;
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
	var s = 'SHOW INDEX';
	if(this.table.tableid) s += ' FROM '+this.table.tableid;
	if(this.databaseid) s += ' FROM '+this.databaseid;
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
	var s = 'SHOW CREATE TABLE '+this.table.tableid;
	if(this.databaseid) s += ' FROM '+this.databaseid;
	return s;
}
yy.ShowCreateTable.prototype.execute = function (databaseid) {
	var db = alasql.databases[this.databaseid || databaseid];
	var table = db.tables[this.table.tableid];
	var self = this;
	if(table) {
		var s = 'CREATE TABLE '+this.table.tableid+' (';
		var ss = [];
		if(table.columns) {
			table.columns.forEach(function(col){
				var a = col.columnid+' '+col.dbtypeid;
				if(col.dbsize) a += '('+col.dbsize+')';
				if(col.primarykey) a += ' PRIMARY KEY';
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
	var s = 'SET ';
	if(typeof this.value != 'undefined') s += this.variable.toUpperCase()+' '+(this.value?'ON':'OFF');
	if(this.expression) s += this.method + this.variable+' = '+this.expression.toString();
	return s;
}

yy.SetVariable.prototype.execute = function (databaseid,params,cb) {

	if(typeof this.value != 'undefined') {
		var val = this.value;
		if(val == 'ON') val = true;
		else if(val == 'OFF') val = false;

			alasql.options[this.variable] = val;

	} else if(this.expression) {

		if(this.exists) {
			this.existsfn = this.exists.map(function(ex) {
				var nq = ex.compile(databaseid);
				if(nq.query && !nq.query.modifier) nq.query.modifier='RECORDSET';
				return nq;

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

		var res = new Function("params,alasql","return "
			+this.expression.toJS('({})','', null)).bind(this)(params,alasql);
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

					return '['+prop.toJS()+']';

				}
			}).join();

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

alasql.test = function(name, times, fn) {
	if(arguments.length === 0) {
		alasql.log(alasql.con.results);
		return;
	} else if(arguments.length === 1) {
		var tm = Date.now();
		fn();
		alasql.con.log(Date.now()-tm);
		return;
	} 

	if(arguments.length === 2) {
		fn = times;
		times = 1;
	}

	var tm = Date.now();
	for(var i=0;i<times;i++){
		fn();
	}
	alasql.con.results[name] = Date.now()-tm;
};

// Console
// alasql.log = function(sql, params) {

// };

// Console
alasql.log = function(sql, params) {
	var olduseid = alasql.useid;
	var target = alasql.options.logtarget;
	// For node other
	if(typeof exports === 'object') {
		target = 'console';
	}

	var res;
	if(typeof sql === "string") {
		res = alasql(sql, params);
	} else {
		res = sql;
	}

	// For Node and console.output
	if(target === 'console' || typeof exports === 'object') {
		if(typeof sql === 'string' && alasql.options.logprompt){
			console.log(olduseid+'>',sql);
		}

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
		if(target === 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if(typeof target === 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}

		}

		var s = '';

		if(typeof sql === 'string' && alasql.options.logprompt) {

			s += '<pre><code>'+alasql.pretty(sql)+'</code></pre>';
		}

		if(res instanceof Array) {
			if(res.length === 0) {
				s += '<p>[ ]</p>'
			} else if(typeof res[0] !== 'object' || res[0] instanceof Array) {
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
	if(typeof exports === 'object') {
		target = 'console';
	}

	if(target === 'console' || typeof exports === 'object') {
		if(console.clear) {
			console.clear();
		} 

		// todo: handle Node

	} else {
		var el;
		if(target === 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if(typeof target === 'string') {
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

	var target = alasql.options.logtarget;
	// For node other
	if(typeof exports === 'object') {
		target = 'console';
	}

	if(target === 'console' || typeof exports === 'object') {
		if(console.log) {
			console.log(s);
		} 

		// todo: handle node

	} else {
		var el;
		if(target === 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if(typeof target === 'string') {
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

	var s  = '';
	if(res === undefined) {
		s += 'undefined';
	} else if(res instanceof Array) {
		s += '<style>';
		s += 'table {border:1px black solid; border-collapse: collapse; border-spacing: 0px;}';
		s += 'td,th {border:1px black solid; padding-left:5px; padding-right:5px}';
		s += 'th {background-color: #EEE}';
		s += '</style>';
		s += '<table>';
		var cols = [];			
		for(var colid in res[0]) {
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
				if(+res[i][colid] === +res[i][colid]) {
					s += '<div style="text-align:right">';
					if(typeof res[i][colid] === 'undefined'){
						s += 'NULL';
					} else {
						s += res[i][colid];
					}
					s += '</div>';
				} else {
					if(typeof res[i][colid] === 'undefined') {
						s += 'NULL';
					} else if(typeof res[i][colid] === 'string') {
						s += res[i][colid];
					} else { 
						s += JSONtoString(res[i][colid]);
					}

				}
			});
		}

		s += '</table>';
	} else {
		s += '<p>'+JSONtoString(res)+'</p>';
	}
		// if() {}

		// 		if(typeof res == 'object') {
		// 			s += '<p>'+JSON.stringify(res)+'</p>';
		// 		} else {
		// 		}
	return s;
}

function scrollTo(element, to, duration) {
    if(duration <= 0){
    	return;
    }
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        if(element.scrollTop===to){
        	return;
        }
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 10);
    }, 10);
}

alasql.prompt = function(el, useidel, firstsql) {
	if(typeof exports === 'object') {
		throw new Error('The functionality of prompt is not realized for Node.js');
	}

	var prompti = 0;

	if(typeof el === 'string'){
		el = document.getElementById(el);
	}

	if(typeof useidel === 'string'){
		useidel = document.getElementById(useidel);
	}

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
	}

	var y = el.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
	scrollTo(document.getElementsByTagName('body')[0],y,500);

	el.onkeydown = function(event) {
		if(event.which === 13) {
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

			useidel.textContent = alasql.useid;
			var y = el.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
			scrollTo(document.getElementsByTagName('body')[0],y,500);
		} else if(event.which === 38) {
			prompti--; if(prompti<0){
				prompti = 0;
			}
			if(alasql.prompthistory[prompti]) {
				el.value = alasql.prompthistory[prompti];
				event.preventDefault();
			}

		} else if(event.which === 40) {
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
	return 'BEGIN TRANSACTION';
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
	return 'COMMIT TRANSACTION';
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
	return 'ROLLBACK TRANSACTION';
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

  // IF OBJECT_ID('dbo.VSortedOrders', 'V') IS NOT NULL

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

//	} else {

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
	//opt.separator = ','; 
  opt.separator = ';';
	opt.quote = '"';
	alasql.utils.extend(opt, opts);
	var res = data.length;
	var s = '';
	if(opt.headers) {
		s += opt.quote+columns.map(function(col){
			return col.columnid.trim();
		}).join(opt.quote+opt.separator+opt.quote)+opt.quote+'\r\n';
	}

	data.forEach(function(d, idx){
		s += columns.map(function(col){
			var s = d[col.columnid];
			s = (s+"").replace(new RegExp('\\'+opt.quote,"g"),'""');

      //Excel 2013 needs quotes around strings - thanks for _not_ complying with RFC for CSV 
      if(+s!=s){  // jshint ignore:line
          s = opt.quote + s + opt.quote; 
      }

      return s;
		}).join(opt.separator)+'\r\n';	
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
			if(typeof column.title == 'undefined') column.title = ""+column.columnid.trim();
			if(sheet.headers && sheet.headers instanceof Array) column.title = sheet.headers[columnidx];
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
				if(typeof column.title == 'undefined') column.title = ""+column.columnid.trim();
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
							// For other types is saved
							if( opts.types && opts.types[typeid] && opts.types[typeid].typestyle) {
								typestyle = opts.types[typeid].typestyle;
							} 
						}

						// TODO Replace with extend...
						typestyle = typestyle || 'mso-number-format:\"\\@\";'; // Default type style

			    		s3 += '<Cell ';

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

	} else {

	}

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
			prepareSheet(opts,data,columns,1);
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

		/** Default options for sheet */
		var opt = {sheetid:'Sheet '+idx,headers:true};
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

		var i = row0+1;

		wb.Sheets[opt.sheetid]['!ref'] = 'A1:'+alasql.utils.xlsnc(colmax)+(rowmax);

		if(opt.headers) {
			columns.forEach(function(col, idx){
				cells[alasql.utils.xlsnc(col0+idx)+""+i] = {v:col.columnid.trim()};
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

				if(isIE() == 9) {
					throw new Error('Cannot save XLSX files in IE9. Please use XLS() export function');

		/** @todo Check if this code is required */

				} else {
					saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename);
				}
			}

		}

	};
};
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
	if(cb){
		res = cb(res, idx, query);
	}
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
		if(cb){
			res = cb(res, idx, query);
		}
	};

	Tabletop.init(opt);
	return res;
};

alasql.from.HTML = function(selector, opts, cb, idx, query) {
	var opt = {};
	alasql.utils.extend(opt, opts);

	var sel = document.querySelector(selector);
	if(!sel && sel.tagName !== "TABLE") {
		throw new Error('Selected HTML element is not a TABLE');
	}

	var res = [];
	var headers = opt.headers;

	if(headers && !(headers instanceof Array)) {
		headers = [];
		var ths = sel.querySelector("thead tr").children;
		for(var i=0;i<ths.length;i++){
			if(!(ths.item(i).style && ths.item(i).style.display === "none" && opt.skipdisplaynone)) {
				headers.push(ths.item(i).textContent);
			} else {
				headers.push(undefined);
			}
		}
	}

	var trs = sel.querySelectorAll("tbody tr");

	for(var j=0;j<trs.length;j++) {
		var tds = trs.item(j).children;
		var r = {};
		for(var i=0;i<tds.length;i++){
			if(!(tds.item(i).style && tds.item(i).style.display === "none" && opt.skipdisplaynone)) {
				if(headers) {
					r[headers[i]] = tds.item(i).textContent;
				} else {
					r[i] = tds.item(i).textContent;

				}
			}
		}
		res.push(r);
	}

	if(cb){
		res = cb(res, idx, query);
	}
	return res;
}

alasql.from.RANGE = function(start, finish, cb, idx, query) {
	var res = [];
	for(var i=start;i<=finish;i++){
		res.push(i);
	}
//	res = new alasql.Recordset({data:res,columns:{columnid:'_'}});	
	if(cb){
		res = cb(res, idx, query);
	}
	return res;
}

// Read data from any file
alasql.from.FILE = function(filename, opts, cb, idx, query) {
	var fname;
	if(typeof filename === 'string') {
		fname = filename;

	} else if(filename instanceof Event) {
		fname = filename.target.files[0].name;

	} else {
		throw new Error("Wrong usage of FILE() function");
	}

	var parts = fname.split('.');

	var ext = parts[parts.length-1].toUpperCase();

	if(alasql.from[ext]) {

		return alasql.from[ext](filename, opts, cb, idx, query);
	} else {
		throw new Error('Cannot recognize file type for loading');
	}
};

// Read JSON file

alasql.from.JSON = function(filename, opts, cb, idx, query) {
	var res;

	alasql.utils.loadFile(filename,!!cb,function(data){

		res = JSON.parse(data);	
		if(cb){
			res = cb(res, idx, query);
		}
	});
	return res;
};

alasql.from.TXT = function(filename, opts, cb, idx, query) {
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = data.split(/\r?\n/);
		if(res[res.length-1] === '') res.pop(); // Remove last line if empty
		for(var i=0, ilen=res.length; i<ilen;i++) {
			// Please avoid '===' here
			if(res[i] == +res[i]){	// jshint ignore:line
				res[i] = +res[i];
			}
			res[i] = [res[i]];
		}
		if(cb){
			res = cb(res, idx, query);
		}
	});
	return res;
};

alasql.from.TAB = alasql.from.TSV = function(filename, opts, cb, idx, query) {
	opts = opts || {};
	opts.separator = '\t';
	return alasql.from.CSV(filename, opts, cb, idx, query);
};

alasql.from.CSV = function(filename, opts, cb, idx, query) {
	var opt = {
		separator: ',',
		quote: '"',
		headers:true
	};
	alasql.utils.extend(opt, opts);
	var res, hs;
	alasql.utils.loadFile(filename,!!cb,function(text){

		var delimiterCode = opt.separator.charCodeAt(0);
		var quoteCode = opt.quote.charCodeAt(0);

      	var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
			function token() {
			if (I >= N){
				return EOF;
			}
			if (eol){
				return eol = false, EOL;
			}
			var j = I;
			if (text.charCodeAt(j) === quoteCode) {
				var i = j;
				while (i++ < N) {
					if (text.charCodeAt(i) === quoteCode) {
						if (text.charCodeAt(i + 1) !== quoteCode){
							break;
						}
						++i;
					}
				}
				I = i + 2;
				var c = text.charCodeAt(i + 1);
				if (c === 13) {
					eol = true;
					if (text.charCodeAt(i + 2) === 10){
						++I;
					}
				} else if (c === 10) {
					eol = true;
				}
				return text.substring(j + 1, i).replace(/""/g, '"');
			}
			while (I < N) {
				var c = text.charCodeAt(I++), k = 1;
				if(c === 10){
					eol = true;
				} else if (c === 13) {
					eol = true;
					if (text.charCodeAt(I) === 10){
						++I;
						++k;
					}
				} else if(c !== delimiterCode){
					continue;
				}
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
        	if(n === 0) {
				if(typeof opt.headers === 'boolean') {
	        		hs = a;
				} else if(opt.headers instanceof Array) {
					hs = opt.headers;
	        		var r = {};
	        		hs.forEach(function(h,idx){
	        			r[h] = a[idx];
	        			// Please avoid === here 
						if((typeof r[h] !== 'undefined') && r[h].length !== 0 && (r[h]).trim() == +r[h]){ // jshint ignore:line
							r[h] = +r[h];
						}
	        		});
					rows.push(r);
				}

        	} else {
        		var r = {};
        		hs.forEach(function(h,idx){
        			r[h] = a[idx];
					if((typeof r[h] !== 'undefined') && r[h].length !== 0 && r[h].trim() == +r[h]){ // jshint ignore:line
						r[h] = +r[h];
					}
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
		}
	}

		if(cb){
			res = cb(res, idx, query);
		}
	});
	return res;
};

function XLSXLSX(X,filename, opts, cb, idx, query) {
	var opt = {};
	opts = opts || {};
	alasql.utils.extend(opt, opts);
	if(typeof opt.headers == 'undefined') opt.headers = true;
	var res;

	alasql.utils.loadBinaryFile(filename,!!cb,function(data){

//	function processData(data) {
		var workbook = X.read(data,{type:'binary'});

		var sheetid;
		if(typeof opt.sheetid === 'undefined') {
			sheetid = workbook.SheetNames[0];
		} else {
			sheetid = opt.sheetid;
		}
		var range;
		if(typeof opt.range === 'undefined') {
			range = workbook.Sheets[sheetid]['!ref'];
		} else {
			range = opt.range;
			if(workbook.Sheets[sheetid][range]){
				range = workbook.Sheets[sheetid][range];
			}
		}
		var rg = range.split(':');
		var col0 = rg[0].match(/[A-Z]+/)[0];
		var row0 = +rg[0].match(/[0-9]+/)[0];
		var col1 = rg[1].match(/[A-Z]+/)[0];
		var row1 = +rg[1].match(/[0-9]+/)[0];

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
		if(opt.headers){
			row0++;
		}
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

		// Remove last empty line (issue #548)
		if(res.length > 0 && res[res.length-1] && Object.keys(res[res.length-1]).length == 0) {
			res.pop();
		}

		if(cb){
			res = cb(res, idx, query);
		}
	}, function(err){
		throw err;
	});

	return res;
}

alasql.from.XLS = function(filename, opts, cb, idx, query) {
	var X;
	if(typeof exports === 'object') {
		X = require('xlsjs');
	} else {
		X = window.XLS;
		if(!X) {
			throw new Error('XLS library is not attached');
		}
	}
	return XLSXLSX(X,filename, opts, cb, idx, query);
}

alasql.from.XLSX = function(filename, opts, cb, idx, query) {
	var X;
	if(typeof exports === 'object') {
		X = require('xlsx');
	} else {
		X = window.XLSX;
		if(!X) {
			throw new Error('XLSX library is not attached');
		}
	}
	return XLSXLSX(X,filename, opts, cb, idx, query);
};

alasql.from.XML = function(filename, opts, cb, idx, query) {
  var res;

  alasql.utils.loadFile(filename,!!cb,function(data){

    res = xmlparse(data).root; 

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
	var s = 'HELP';
	if(this.subject) s += ' '+this.subject;
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
	var s = 'PRINT';
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

	var self = this;
	var res = 1;

	alasql.precompile(this,databaseid,params);  /** @todo Change from alasql to this */

	if(this.exprs && this.exprs.length >0) {
		var rs = this.exprs.map(function(expr){

			var exprfn =  new Function("params,alasql,p",'var y;return '+expr.toJS('({})','', null)).bind(self);
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
	var s = 'SOURCE';
	if(this.url) s += " '"+this.url+" '";
	return s;
}

// SOURCE FILE
yy.Source.prototype.execute = function (databaseid,params,cb) {

	var res;
	loadFile(this.url, !!cb, function(data){

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
	var s = 'REQUIRE';
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

	if(this.paths && this.paths.length > 0) {
		this.paths.forEach(function(path){
			loadFile(path.value, !!cb, function(data){
				res++;

				ss += data;
				if(res<self.paths.length) return;

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
	var s = 'ASSERT';
	if(this.value) s += ' '+JSON.stringify(this.value);
	return s;
}

// SOURCE FILE
yy.Assert.prototype.execute = function (databaseid) {

	if(!deepEqual(alasql.res,this.value)) {

			throw new Error((this.message||'Assert wrong')+': '+JSON.stringify(alasql.res)+' == '+JSON.stringify(this.value));

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

 if(typeof(window) != 'undefined' && window.indexedDB) {

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
			if(cb) cb(1);
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
				if(cb) cb(0);
			} else {
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');				
			}
		}
	}

};

IDB.createDatabase = function(ixdbid, args, ifnotexists, dbid, cb){
	if(IDB.getDatabaseNamesNotSupported) {
		// Hack for Firefox
		if(ifnotexists) {

			var dbExists = true;
			var request2 = window.indexedDB.open(ixdbid);

			request2.onupgradeneeded = function (e){

				dbExists = false;

			};
			request2.onsuccess = function(event) {

				event.target.result.close();
				if(dbExists) {
					if(cb) cb(0);
				} else {
					if(cb) cb(1);
				}
			};
		} else {

			var request1 = window.indexedDB.open(ixdbid);
			request1.onupgradeneeded = function (e){
			    e.target.transaction.abort();
			};
			request1.onabort = function(event) {
				if(cb) cb(1);
			};
			request1.onsuccess = function(event) {
				event.target.result.close();
				throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');

			};

		}

	} else {
		var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function(event) {
			var dblist = event.target.result;
			if(dblist.contains(ixdbid)){
				if(ifnotexists) {
					if(cb) cb(0);
					return;
				} else {		
					throw new Error('IndexedDB: Cannot create new database "'+ixdbid+'" because it already exists');
				}
			};

			var request2 = window.indexedDB.open(ixdbid,1);
			request2.onsuccess = function(event) {
				event.target.result.close();
				if(cb) cb(1);
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
				if(cb) cb(0);
				return;
			} else {
				throw new Error('IndexedDB: Cannot drop new database "'+ixdbid+'" because it does not exist');
			}
		};
		var request2 = window.indexedDB.deleteDatabase(ixdbid);
		request2.onsuccess = function(event) {

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

			event.target.result.close();	
			if(cb) cb(1);
		};
	};
};

IDB.createTable = function(databaseid, tableid, ifnotexists, cb) {

	var ixdbid = alasql.databases[databaseid].ixdbid;

	var request1 = IDB.getDatabaseNames();
		request1.onsuccess = function(event) {
		var dblist = event.target.result;
		if(!dblist.contains(ixdbid)){
			throw new Error('IndexedDB: Cannot create table in database "'+ixdbid+'" because it does not exist');
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

				var store = ixdb.createObjectStore(tableid, {autoIncrement:true});

			};
			request3.onsuccess = function(event) {

				event.target.result.close();
				if(cb) cb(1);
			};
			request3.onerror = function(event){
				throw event;

			}
			request3.onblocked = function(event){
				throw new Error('Cannot create table "'+tableid+'" because database "'+databaseid+'"  is blocked');

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
						throw new Error('IndexedDB: Cannot drop table "'+tableid+'" because it does not exist');
					}
				}

			};
			request3.onsuccess = function(event) {

				event.target.result.close();
				if(cb) cb(1);
			};
			request3.onerror = function(event){

				throw event;
			}
			request3.onblocked = function(event){
				throw new Error('Cannot drop table "'+tableid+'" because database "'+databaseid+'" is blocked');

			}				
		};
	};
}

IDB.intoTable = function(databaseid, tableid, value, columns, cb) {

	// console.trace();

	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request1 = window.indexedDB.open(ixdbid);
	request1.onsuccess = function(event) {
		var ixdb = event.target.result;
		var tx = ixdb.transaction([tableid],"readwrite");
		var tb = tx.objectStore(tableid);

		for(var i=0, ilen = value.length;i<ilen;i++) {
			tb.add(value[i]);
		};
		tx.oncomplete = function() {
			ixdb.close();

			if(cb) cb(ilen);
		}
	};

};

IDB.fromTable = function(databaseid, tableid, cb, idx, query){

	// console.trace();
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = window.indexedDB.open(ixdbid);
	request.onsuccess = function(event) {
	  	var res = [];
	  	var ixdb = event.target.result;

	  	var tx = ixdb.transaction([tableid]);
	  	var store = tx.objectStore(tableid);
	  	var cur = store.openCursor();

	  	cur.onblocked = function(event) {

	  	}
	  	cur.onerror = function(event) {

	  	}
	  	cur.onsuccess = function(event) {

		  	var cursor = event.target.result;

		  	if(cursor) {
		  		res.push(cursor.value);
		  		cursor.continue();
		  	} else {

		  		ixdb.close();
		  		if(cb) cb(res, idx, query);
		  	}
	  	}
	}		
}

IDB.deleteFromTable = function(databaseid, tableid, wherefn,params, cb){

	// console.trace();
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = window.indexedDB.open(ixdbid);
	request.onsuccess = function(event) {
	  	var res = [];
	  	var ixdb = event.target.result;

	  	var tx = ixdb.transaction([tableid], 'readwrite');
	  	var store = tx.objectStore(tableid);
	  	var cur = store.openCursor();
	  	var num = 0;

	  	cur.onblocked = function(event) {

	  	}
	  	cur.onerror = function(event) {

	  	}
	  	cur.onsuccess = function(event) {

		  	var cursor = event.target.result;

		  	if(cursor) {
		  		if((!wherefn) || wherefn(cursor.value,params)) {

		  			cursor.delete();
		  			num++;
		  		}
		  		cursor.continue();
		  	} else {

		  		ixdb.close();
		  		if(cb) cb(num);
		  	}
	  	}
	}		
}

IDB.updateTable = function(databaseid, tableid, assignfn, wherefn, params, cb){

	// console.trace();
	var ixdbid = alasql.databases[databaseid].ixdbid;
	var request = window.indexedDB.open(ixdbid);
	request.onsuccess = function(event) {
	  	var res = [];
	  	var ixdb = event.target.result;

	  	var tx = ixdb.transaction([tableid], 'readwrite');
	  	var store = tx.objectStore(tableid);
	  	var cur = store.openCursor();
	  	var num = 0;

	  	cur.onblocked = function(event) {

	  	}
	  	cur.onerror = function(event) {

	  	}
	  	cur.onsuccess = function(event) {

		  	var cursor = event.target.result;

		  	if(cursor) {
		  		if((!wherefn) || wherefn(cursor.value,params)) {

		  			var r = cursor.value;
					assignfn(r,params);

		  			cursor.update(r);
		  			num++;
		  		}
		  		cursor.continue();
		  	} else {

		  		ixdb.close();
		  		if(cb) cb(num);
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

/**
	Read data from localStorage with security breaks
	@param key {string} Address in localStorage
	@return {object} JSON object
*/
LS.get = function(key) {
	var s = localStorage.getItem(key);
	if(typeof s === "undefined") return;
	var v = undefined;
	try {
		v = JSON.parse(s); 
	} catch(err) {
		throw new Error('Cannot parse JSON object from localStorage'+s);
	}
	return v;
};

/**
	Store data into localStorage with security breaks
	@param key {string} Address in localStorage
	@return {object} JSON object
*/
LS.set = function(key, value){
	if(typeof value === 'undefined') localStorage.removeItem(key);
	else localStorage.setItem(key,JSON.stringify(value)); 
};

/**
	Store table structure and data into localStorage
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param tableid {string} Table name
	@return Nothing
*/
LS.storeTable = function(databaseid,tableid) {
	var db = alasql.databases[databaseid];
	var table = db.tables[tableid];
	// Create empty structure for table
	var tbl = {};
	tbl.columns = table.columns;
	tbl.data = table.data;
	tbl.identities = table.identities;
	// TODO: May be add indexes, objects and other fields?
	LS.set(db.lsdbid+'.'+tableid,tbl);
};

/**
	Restore table structure and data
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param tableid {string} Table name
	@return Nothing
*/
LS.restoreTable = function(databaseid,tableid) {
	var db = alasql.databases[databaseid];
	var tbl = LS.get(db.lsdbid+'.'+tableid);
	var table = new alasql.Table();
	for(var f in tbl) {
		table[f] = tbl[f];
	}
	db.tables[tableid] = table;
	table.indexColumns();
	// We need to add other things here
	return table;
};

/**
	Remove table from localStorage
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param tableid {string} Table name
*/

LS.removeTable = function(databaseid,tableid) {
	var db = alasql.databases[databaseid];
	localStorage.removeItem(db.lsdbid+'.'+tableid);
};

/**
	Create database in localStorage
	@param lsdbid {string} localStorage database id
	@param args {array} List of parameters (not used in localStorage)
	@param ifnotexists {boolean} Check if database does not exist
	@param databaseid {string} AlaSQL database id (not external localStorage)
	@param cb {function} Callback
*/

LS.createDatabase = function(lsdbid, args, ifnotexists, databaseid, cb){
	var res = 1;
	var ls = LS.get('alasql'); // Read list of all databases
	if(!(ifnotexists && ls && ls.databases && ls.databases[lsdbid])) {
		if(!ls) ls = {databases:{}}; // Empty record
		if(ls.databases && ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot create new database "'+lsdbid+'" because it already exists');
		}
		ls.databases[lsdbid] = true;
		LS.set('alasql',ls);
		LS.set(lsdbid,{databaseid:lsdbid, tables:{}}); // Create database record
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};

/**
	Drop external database
	@param lsdbid {string} localStorage database id
	@param ifexists {boolean} Check if database exists
	@param cb {function} Callback
*/
LS.dropDatabase = function(lsdbid, ifexists, cb){
	var res = 1;
	var ls = LS.get('alasql');
	if(!(ifexists && ls && ls.databases && !ls.databases[lsdbid])) {

		// 1. Remove record from 'alasql' record
		if(!ls) {
			if(!ifexists) {
				throw new Error('There is no any AlaSQL databases in localStorage');
			} else {
				return 0;
			}
		};

		if(ls.databases && !ls.databases[lsdbid]) {
			throw new Error('localStorage: Cannot drop database "'+lsdbid+'" because there is no such database');
		}
		delete ls.databases[lsdbid];
		LS.set('alasql',ls);

		// 2. Remove tables definitions
		var db = LS.get(lsdbid);
		for(var tableid in db.tables) {
			localStorage.removeItem(lsdbid+'.'+tableid);
		}

		// 3. Remove database definition
		localStorage.removeItem(lsdbid);
	} else {
		res = 0;
	}
	if(cb) cb(res);
	return res;
};

/**
	Attach existing localStorage database to AlaSQL database
	@param lsdibid {string} localStorage database id
	@param 
*/

LS.attachDatabase = function(lsdbid, databaseid, args, params, cb){
	var res = 1;
	if(alasql.databases[databaseid]) {
		throw new Error('Unable to attach database as "'+databaseid+'" because it already exists');
	};
	if(!databaseid) databaseid = lsdbid;
	var db = new alasql.Database(databaseid);
	db.engineid = "LOCALSTORAGE";
	db.lsdbid = lsdbid;
	db.tables = LS.get(lsdbid).tables;
	// IF AUTOCOMMIT IS OFF then copy data to memory
	if(!alasql.options.autocommit) {
		if(db.tables){
			for(var tbid in db.tables) {
				LS.restoreTable(databaseid,tbid);

			}
		}
	}
	if(cb) res = cb(res);
	return res;
};

/**
	Show list of databases from localStorage
	@param like {string} Mathing pattern
	@param cb {function} Callback
*/
LS.showDatabases = function(like, cb) {
	var res = [];
	var ls = LS.get('alasql');
	if(like) {
		// TODO: If we have a special function for LIKE patterns?
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

/**
	Create table in localStorage database
	@param databaseid {string} AlaSQL database id
	@param tableid {string} Table id
	@param ifnotexists {boolean} If not exists flag
	@param cb {function} Callback
*/

LS.createTable = function(databaseid, tableid, ifnotexists, cb) {
	var res = 1;
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var tb = LS.get(lsdbid+'.'+tableid);
	// Check if such record exists
	if(tb && !ifnotexists) {
		throw new Error('Table "'+tableid+'" alsready exists in localStorage database "'+lsdbid+'"');
	};
	var lsdb = LS.get(lsdbid);
	var table = alasql.databases[databaseid].tables[tableid];

	// TODO: Check if required
	lsdb.tables[tableid] = true;

	LS.set(lsdbid, lsdb);
	LS.storeTable(databaseid,tableid);

	if(cb) cb(res);
	return res;
}

/**
	Create table in localStorage database
	@param databaseid {string} AlaSQL database id
	@param tableid {string} Table id
	@param ifexists {boolean} If exists flag
	@param cb {function} Callback
*/

LS.dropTable = function (databaseid, tableid, ifexists, cb) {
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
//	localStorage.removeItem(lsdbid+'.'+tableid);
	LS.removeTable(databaseid,tableid);
	if(cb) cb(res);
	return res;
}

/**
	Read all data from table
*/

LS.fromTable = function(databaseid, tableid, cb, idx, query) {

	var lsdbid = alasql.databases[databaseid].lsdbid;
//	var res = LS.get(lsdbid+'.'+tableid);

	var res = LS.restoreTable(databaseid,tableid).data;

	if(cb) res = cb(res, idx, query);
	return res;
};

/**
	Insert data into the table
	@param databaseid {string} Database id
	@param tableid {string} Table id
	@param value {array} Array of values
	@param columns {array} Columns (not used)
	@param cb {function} Callback
*/

LS.intoTable = function(databaseid, tableid, value, columns, cb) {

	var lsdbid = alasql.databases[databaseid].lsdbid;
	var res = value.length;
//	var tb = LS.get(lsdbid+'.'+tableid);
	var tb = LS.restoreTable(databaseid,tableid);
	if(!tb.data) tb.data = [];
	tb.data = tb.data.concat(value);
//	LS.set(lsdbid+'.'+tableid, tb);
	LS.storeTable(databaseid,tableid);

	if(cb) cb(res);

	return res;
};

/**
	Laad data from table
*/
LS.loadTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	LS.restoreTable(databaseid,tableid);
//	db.tables[tableid].data = LS.get(lsdbid+'.'+tableid);
}

/**
	Save data to the table
*/

LS.saveTableData = function(databaseid, tableid){
	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	LS.storeTable(lsdbid,tableid);
//	LS.set(lsdbid+'.'+tableid,db.tables[tableid].data);
	db.tables[tableid].data = undefined;
}

/**
	Commit
*/

LS.commit = function(databaseid, cb) {

	var db = alasql.databases[databaseid];
	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = {databaseid:lsdbid, tables:{}};
	if(db.tables) {
		for(var tbid in db.tables) {
			// TODO: Question - do we need this line
			lsdb.tables[tbid] = true;
			LS.storeTable(databaseid,tbid);

		};
	}
	LS.set(lsdbid,lsdb);
	return 1;
};

/**
	Alias BEGIN = COMMIT
*/
LS.begin = LS.commit;

/**
	ROLLBACK
*/

LS.rollback = function(databaseid, cb) {

	// This does not work and should be fixed
	// Plus test 151 and 231

	return;

	var db = alasql.databases[databaseid];
	db.dbversion++;

	var lsdbid = alasql.databases[databaseid].lsdbid;
	var lsdb = LS.get(lsdbid);
//	if(!alasql.options.autocommit) {

	delete alasql.databases[databaseid];
	alasql.databases[databaseid] = new alasql.Database(databaseid);
	extend(alasql.databases[databaseid], lsdb);
	alasql.databases[databaseid].databaseid = databaseid;
	alasql.databases[databaseid].engineid = 'LOCALSTORAGE';

		if(lsdb.tables){
			for(var tbid in lsdb.tables) {

					LS.restoreTable(databaseid,tbid);

				// index columns
				// convert types
			}
		}
//	}

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

		   		var coldefs = ast.statements[0].columns;
		   		if(coldefs && coldefs.length>0) {
		   			coldefs.forEach(function(cd){
			   			columns.push(cd);
		   			});
		   		}

		   	});

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

FS.createDatabase = function(fsdbid, args, ifnotexists, dbid, cb){

	var res = 1;
	var filename = args[0].value;

	alasql.utils.fileExists(filename, function(fex){

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

	var db = alasql.databases[databaseid];
	if(db.issaving) {
		db.postsave = true;
		return;
	};
	db.issaving = true;
	db.postsave = false;
	alasql.utils.saveFile(db.filename, JSON.stringify(db.data), function(){
		db.issaving = false;

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

			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}

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

/*if (typeof importScripts === 'function') {
	// Nothing
} else */ 
if(typeof exports !== 'object') {

	alasql.worker = function(path, paths, cb) {
	//	var path;
		if(path === true){
			path = undefined;
		}

		if (typeof path === "undefined") {
			var sc = document.getElementsByTagName('script');
			for(var i=0;i<sc.length;i++) {
				if (sc[i].src.substr(-16).toLowerCase() === 'alasql-worker.js') {
					path = sc[i].src.substr(0,sc[i].src.length-16)+'alasql.js'; 
					break;
				} else if (sc[i].src.substr(-20).toLowerCase() === 'alasql-worker.min.js') {
					path = sc[i].src.substr(0,sc[i].src.length-20)+'alasql.min.js';
					break;
				} else if (sc[i].src.substr(-9).toLowerCase() === 'alasql.js') {
					path = sc[i].src; 
					break;
				} else if (sc[i].src.substr(-13).toLowerCase() === 'alasql.min.js') {
					path = sc[i].src.substr(0,sc[i].src.length-13)+'alasql.min.js'; 
					break;
				}
			}
		}

		if(typeof path === "undefined") {
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
		}
	};

}
