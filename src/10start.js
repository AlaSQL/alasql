/* eslint-disable */

"use strict";

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

var alasql = function(sql, params, cb, scope) {
	
	params = params||[];

	if(typeof importScripts !== 'function' && alasql.webworker) {
		var id = alasql.lastid++;
		alasql.buffer[id] = cb;
		alasql.webworker.postMessage({id:id,sql:sql,params:params});
		return;
	} 

	if(arguments.length === 0) {
		// Without arguments - Fluent interface
		return new yy.Select({
			columns:[new yy.Column({columnid:'*'})],
			from: [new yy.ParamValue({param:0})]
		});
	} else if(arguments.length === 1){ 
		// Access promise notation without using `.promise(...)`
		if(sql.constructor === Array){
			return alasql.promise(sql);
		}
	} 
	// Avoid setting params if not needed even with callback
	if(typeof params === 'function'){
		scope = cb;
		cb = params;
		params = [];
	}

	if(typeof params !== 'object'){
			params = [params];
	}

	// Standard interface
	// alasql('#sql');
	if(typeof sql === 'string' && sql[0]==='#' && typeof document === "object") {
		sql = document.querySelector(sql).textContent;
	} else if(typeof sql === 'object' && sql instanceof HTMLElement) {
		sql = sql.textContent;
	} else if(typeof sql === 'function') {
		// to run multiline functions
		sql = sql.toString();
		sql = (/\/\*([\S\s]+)\*\//m.exec(sql) || ['','Function given as SQL. Plese Provide SQL string or have a /* ... */ syle comment with SQL in the function.'])[1];	
	}
	// Run SQL			
	return alasql.exec(sql, params, cb, scope);
};

/** 
	Current version of alasql 
 	@constant {string} 
*/
alasql.version = 'PACKAGE_VERSION_NUMBER';

/**
	Debug flag
	@type {boolean}
*/
alasql.debug = undefined; // Initial debug variable


/*only-for-browser/*
var require = function(){return null}; // as alasqlparser.js is generated, we can not "remove" referenses to 
var __dirname = '';
//*/
