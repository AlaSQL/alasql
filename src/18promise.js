//
// Promises for AlaSQL
//

if (!utils.global.Promise) {
	utils.global.Promise = Promise;
}

var promiseExec = function (sql, params, counterStep, counterTotal) {
	return new utils.global.Promise(function (resolve, reject) {
		alasql(sql, params, function (data, err) {
			if (err) {
				reject(err);
			} else {
				if (counterStep && counterTotal && alasql.options.progress !== false) {
					alasql.options.progress(counterStep, counterTotal);
				}
				resolve(data);
			}
		});
	});
};

var promiseAll = function (sqlParamsArray) {
	if (sqlParamsArray.length < 1) {
		return;
	}

	var active, sql, params;

	var execArray = [];

	for (var i = 0; i < sqlParamsArray.length; i++) {
		active = sqlParamsArray[i];

		if (typeof active === 'string') {
			active = [active];
		}

		if (!utils.isArray(active) || active.length < 1 || 2 < active.length) {
			throw new Error('Error in .promise parameter');
		}

		sql = active[0];
		params = active[1] || undefined;

		execArray.push(promiseExec(sql, params, i, sqlParamsArray.length));
	}

	return utils.global.Promise.all(execArray);
};

alasql.promise = function (sql, params) {
	if (typeof Promise === 'undefined') {
		throw new Error('Please include a Promise/A+ library');
	}

	if (typeof sql === 'string') {
		return promiseExec(sql, params);
	}

	if (!utils.isArray(sql) || sql.length < 1 || typeof params !== 'undefined') {
		throw new Error('Error in .promise parameters');
	}
	return promiseAll(sql);
};
