/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/* global alasql, yy */

yy.Require = function (params) {
	return yy.extend(this, params);
};
yy.Require.prototype.toString = function () {
	var s = 'REQUIRE';
	if (this.paths && this.paths.length > 0) {
		s += this.paths
			.map(function (path) {
				return path.toString();
			})
			.join(',');
	}
	if (this.plugins && this.plugins.length > 0) {
		s += this.plugins
			.map(function (plugin) {
				return plugin.toUpperCase();
			})
			.join(',');
	}
	return s;
};

/**
 Attach plug-in for Alasql
 */
yy.Require.prototype.execute = function (databaseid, params, cb) {
	var self = this;
	var res = 0;
	var ss = '';
	//	console.log(this.paths);
	if (this.paths && this.paths.length > 0) {
		this.paths.forEach(function (path) {
			loadFile(path.value, !!cb, function (data) {
				res++;
				//				console.log(res,self.paths.length);
				//				console.log(data);
				ss += data;
				if (res < self.paths.length) return;

				// console.log(76466, ss);
				new Function('params,alasql', ss)(params, alasql);
				if (cb) res = cb(res);
			});
		});
	} else if (this.plugins && this.plugins.length > 0) {
		this.plugins.forEach(function (plugin) {
			// If plugin is not loaded already
			if (!alasql.plugins[plugin]) {
				loadFile(alasql.path + '/alasql-' + plugin.toLowerCase() + '.js', !!cb, function (data) {
					// Execute all plugins at the same time
					res++;
					ss += data;
					if (res < self.plugins.length) return;
					// console.log(346346, ss);
					new Function('params,alasql', ss)(params, alasql);
					alasql.plugins[plugin] = true; // Plugin is loaded
					if (cb) res = cb(res);
				});
			}
		});
	} else {
		if (cb) res = cb(res);
	}
	return res;
};
