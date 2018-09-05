//! AlaSQL v0.4.11 | © 2014-2018 Andrey Gershun & Mathias Rangel Wulff | License: MIT
/*
@module alasql
@version 0.4.11

AlaSQL - JavaScript SQL database
© 2014-2016	Andrey Gershun & Mathias Rangel Wulff

@license
The MIT License (MIT)

Copyright 2014-2016 Andrey Gershun (agershun@gmail.com) & Mathias Rangel Wulff (m@rawu.dk)

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

/*
//
// AlaSQL Workker
// Date: 13.04.2014
// (c) 2014-2015, Andrey Gershun
//
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
	Main procedure for worker
    @function
    @param {string} sql SQL statement
    @param {object} params List of parameters (can be omitted)
    @param {callback} cb Callback function
    @return {object} Query result
*/
function alasql(sql,params,cb){

	params = params||[];

	// Avoid setting params if not needed even with callback
	if(typeof params === 'function'){
		scope = cb;
		cb = params;
		params = [];
	}

	if(typeof params !== 'object'){
			params = [params];
	}

    // Increase last request id
	var id = alasql.lastid++;
    // Save callback
	alasql.buffer[id] = cb;
    // Send a message to worker
	alasql.webworker.postMessage({id:id,sql:sql,params:params});
}


alasql.options = {};
alasql.options.progress = function(){};

isArray = function(obj){
	return "[object Array]"===Object.prototype.toString.call(obj);
}

alasql.promise = function() {
	throw new Error('Please include a Promise/A+ library');
}

// From src/18promise.js
if(typeof Promise !== "undefined"){
	var promiseExec = function(sql, params, counterStep, counterTotal){
		 return new Promise(function(resolve, reject){
	        alasql(sql, params, function(data,err) {
	             if(err) {
	                 reject(err);
	             } else {
					if (counterStep && counterTotal && alasql.options.progress !== false) {
						alasql.options.progress(counterStep, counterTotal);
					}
	                resolve(data);
	             }
	        });
	    });
	}

	var promiseAll = function(sqlParamsArray){
		if(sqlParamsArray.length<1){
			return ;
		}

		var active, sql, params;

		var execArray = []; 

		for (var i = 0; i < sqlParamsArray.length; i++) {
			active = sqlParamsArray[i];

			if(typeof active === 'string'){
				active = [active];
			}

			if(!isArray(active) || active.length<1 || 2<active.length){
				throw new Error('Error in .promise parameter');
			}

			sql = active[0];
			params = active[1]||undefined;

			execArray.push(promiseExec(sql, params, i, sqlParamsArray.length));
		}

		return Promise.all(execArray); 
	}

	alasql.promise = function(sql, params) {
		if(typeof Promise === "undefined"){
			throw new Error('Please include a Promise/A+ library');
		}

		if(typeof sql === 'string'){
			return promiseExec(sql, params);
		}

		if(!isArray(sql) || sql.length<1 || typeof params !== "undefined"){
			throw new Error('Error in .promise parameters');
		}
		return promiseAll(sql);
	};

}


alasql = alasql || false;

if (!alasql) {
	throw new Error('alasql was not found');
}

alasql.worker = function() {
	throw new Error('Can find webworker in this enviroment');
};

if (typeof Worker !== 'undefined') {
	alasql.worker = function(path, paths, cb) {
		//	var path;
		if (path === true) {
			path = undefined;
		}

		if (typeof path === 'undefined') {
			var sc = document.getElementsByTagName('script');
			for (var i = 0; i < sc.length; i++) {
				if (sc[i].src.substr(-16).toLowerCase() === 'alasql-worker.js') {
					path = sc[i].src.substr(0, sc[i].src.length - 16) + 'alasql.js';
					break;
				} else if (sc[i].src.substr(-20).toLowerCase() === 'alasql-worker.min.js') {
					path = sc[i].src.substr(0, sc[i].src.length - 20) + 'alasql.min.js';
					break;
				} else if (sc[i].src.substr(-9).toLowerCase() === 'alasql.js') {
					path = sc[i].src;
					break;
				} else if (sc[i].src.substr(-13).toLowerCase() === 'alasql.min.js') {
					path = sc[i].src.substr(0, sc[i].src.length - 13) + 'alasql.min.js';
					break;
				}
			}
		}

		if (typeof path === 'undefined') {
			throw new Error('Path to alasql.js is not specified');
		} else if (path !== false) {
			var js = "importScripts('";
			js += path;
			js +=
				"');self.onmessage = function(event) {" +
				'alasql(event.data.sql,event.data.params, function(data){' +
				'postMessage({id:event.data.id, data:data});});}';

			var blob = new Blob([js], {type: 'text/plain'});
			alasql.webworker = new Worker(URL.createObjectURL(blob));

			alasql.webworker.onmessage = function(event) {
				var id = event.data.id;

				alasql.buffer[id](event.data.data);
				delete alasql.buffer[id];
			};

			alasql.webworker.onerror = function(e) {
				throw e;
			};

			if (arguments.length > 1) {
				var sql =
					'REQUIRE ' +
					paths
						.map(function(p) {
							return '"' + p + '"';
						})
						.join(',');
				alasql(sql, [], cb);
			}
		} else if (path === false) {
			delete alasql.webworker;
			return;
		}
	};
}


/* WebWorker */
/** @type {number} */
alasql.lastid = 0;

/** @type {object} */
alasql.buffer = {};

alasql.worker();

return alasql;
}));
