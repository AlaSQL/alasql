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

