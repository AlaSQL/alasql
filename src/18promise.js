
//
// Promises for AlaSQL
//
//nodejs now has Promises

if(typeof utils.global.Promise === "object") {
	var Promise = utils.global.Promise;
} else if(utils.isNode){
	var Promise = require('es6-promise').Promise;
} 

//
// Only for browsers with Promise support
//
//if(typeof window !== 'undefined' && typeof window.Promise === 'function') {
alasql.promise = function(sql, params) {
	if(!utils.global.Promise){
		throw new Error('Please include a Promise library');
	}

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