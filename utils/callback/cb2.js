var async = false;

function alasql(sql, params, cb) {
	var res;
	if (arguments.length < 3) {
		process(sql, params, function (data) {
			res = data;
		});
		if (async) {
			throw Error('Use sync version');
		}
		return res;
	} else {
		process(sql, params, function (data) {
			cb(data);
			async = false;
		});
	}
}

function process(sql, params, cb) {
	if (sql == 'sync') {
		cb(100);
	} else {
		async = true;
		setTimeout(function () {
			cb(200);
		}, 100);
	}
}

var res = alasql('async', [], function (data) {
	console.log(1, data);
});
console.log(2, res);

var res = alasql('sync', []);
console.log(3, res);

/*
var res = alasql('async',[]);
*/
