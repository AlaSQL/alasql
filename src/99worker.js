alasql = alasql || false;

if (!alasql) {
	throw new Error('alasql was not found');
}

alasql.worker = function () {
	throw new Error('Can find webworker in this enviroment');
};

if (typeof Worker !== 'undefined') {
	alasql.worker = function (path, paths, cb) {
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

			alasql.webworker.onmessage = function (event) {
				var id = event.data.id;

				alasql.buffer[id](event.data.data);
				delete alasql.buffer[id];
			};

			alasql.webworker.onerror = function (e) {
				throw e;
			};

			if (arguments.length > 1) {
				var sql =
					'REQUIRE ' +
					paths
						.map(function (p) {
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
