//
// Promises for AlaSQL
//

// if(typeof exports === 'object') {
// 	var Promise = require('es6-promise').Promise;
// }

//
// Only for browsers with Promise support
//

//TODO: alasql.promise
export function promise(sql, params) {
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
