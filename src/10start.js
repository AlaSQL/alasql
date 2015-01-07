//
// alasql.js
// Alasql - JavaScript SQL database
// Date: 14.12.2014
// Version: 0.0.33
// (ñ) 2014, Andrey Gershun
//

/*
The MIT License (MIT)

Copyright (c) 2014 Andrey Gershun (agershun@gmail.com)

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
 UMD envelope 
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.alasql = factory();
    }
}(this, function () {

/**
 alasql - Main Alasql class
 @param {string | Object} sql SQL-statement or data object for fuent interface
 @param {Object} params SQL parameters
 @param {Function} cb callback function
 @param {Object} scope Scope for nested queries
 @return {array} Result data object
 
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

var alasql = function(sql, params, cb, scope) {
	if(typeof importScripts != 'function' && alasql.webworker) {
		alasql.webworker.postMessage({sql:sql,params:params});
		alasql.webworker.onmessage = function(event) {
//			console.log(event);
			if(cb) cb(event.data);
		};
		alasql.webworker.onerror = function(e){
			throw e;
		}
	} else {
		if(arguments.length == 0) {
			// Without arguments - Fluent interface
			return new yy.Select({
				columns:[new yy.Column({columnid:'*'})],
				from: [new yy.ParamValue({param:0})]
			});
		} else if ((arguments.length == 1) && (sql instanceof Array)) {
			// One argument data object - fluent interface
			var select = new yy.Select({
				columns:[new yy.Column({columnid:'*'})],
				from: [new yy.ParamValue({param:0})]
			});
			select.preparams = [sql];	
			return select;
		} else {
			// Standard interface
			return alasql.exec(sql, params, cb, scope);
		}
	};
};

/** Current version of alasql */
alasql.version = "0.0.36";

