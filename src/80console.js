alasql.test = function (name, times, fn) {
	if (arguments.length === 0) {
		alasql.log(alasql.con.results);
		return;
	}

	var tm = Date.now();

	if (arguments.length === 1) {
		fn();
		alasql.con.log(Date.now() - tm);
		return;
	}

	if (arguments.length === 2) {
		fn = times;
		times = 1;
	}

	for (var i = 0; i < times; i++) {
		fn();
	}
	alasql.con.results[name] = Date.now() - tm;
};

// Console
// alasql.log = function(sql, params) {
// 	var res;
// 	if(typeof sql == "string") {
// 		res = alasql(sql, params);
// 	} else {
// 		res = sql;
// 	};
// 	if(Array.isArray(res)) {
// 		if(console.table) {
// 			console.table(res);
// 		} else {
// 			console.log(res);
// 		}
// 	} else {
// 		console.log(res);
// 	}
// };

/* global alasql, yy, utils */

// Console
alasql.log = function (sql, params) {
	var olduseid = alasql.useid;
	var target = alasql.options.logtarget;
	// For node other
	if (utils.isNode) {
		target = 'console';
	}

	var res;
	if (typeof sql === 'string') {
		res = alasql(sql, params);
	} else {
		res = sql;
	}

	// For Node and console.output
	if (target === 'console' || utils.isNode) {
		if (typeof sql === 'string' && alasql.options.logprompt) {
			console.log(olduseid + '>', sql);
		}

		if (Array.isArray(res)) {
			if (console.table) {
				// For Chrome and other consoles
				console.table(res);
			} else {
				// Add print procedure
				console.log(JSONtoString(res));
			}
		} else {
			console.log(JSONtoString(res));
		}
	} else {
		var el;
		if (target === 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if (typeof target === 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}
		}

		var s = '';

		if (typeof sql === 'string' && alasql.options.logprompt) {
			//			s += '<p>'+olduseid+'&gt;&nbsp;'+alasql.pretty(sql)+'</p>';
			s += '<pre><code>' + alasql.pretty(sql) + '</code></pre>';
		}

		if (Array.isArray(res)) {
			if (res.length === 0) {
				s += '<p>[ ]</p>';
			} else if (typeof res[0] !== 'object' || Array.isArray(res[0])) {
				for (var i = 0, ilen = res.length; i < ilen; i++) {
					s += '<p>' + loghtml(res[i]) + '</p>';
				}
			} else {
				s += loghtml(res);
			}
		} else {
			s += loghtml(res);
		}
		el.innerHTML += s;
	}
};

alasql.clear = function () {
	var target = alasql.options.logtarget;
	// For node other

	if (utils.isNode || utils.isMeteorServer) {
		if (console.clear) {
			console.clear();
		}
	} else {
		var el;
		if (target === 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if (typeof target === 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}
		}
		el.innerHTML = '';
	}
};

alasql.write = function (s) {
	//	console.log('write',s);
	var target = alasql.options.logtarget;
	// For node other
	if (utils.isNode || utils.isMeteorServer) {
		if (console.log) {
			console.log(s);
		}
	} else {
		var el;
		if (target === 'output') {
			el = document.getElementsByTagName('output')[0];
		} else {
			if (typeof target === 'string') {
				el = document.getElementById(target);
			} else {
				// in case of DOM
				el = target;
			}
		}
		el.innerHTML += s;
	}
};

function loghtml(res) {
	//	console.log(res);
	var s = '';
	if (res === undefined) {
		s += 'undefined';
	} else if (Array.isArray(res)) {
		s += '<style>';
		s += 'table {border:1px black solid; border-collapse: collapse; border-spacing: 0px;}';
		s += 'td,th {border:1px black solid; padding-left:5px; padding-right:5px}';
		s += 'th {background-color: #EEE}';
		s += '</style>';
		s += '<table>';
		var cols = [];
		for (var colid in res[0]) {
			cols.push(colid);
		}
		s += '<tr><th>#';
		cols.forEach(function (colid) {
			s += '<th>' + colid;
		});
		for (var i = 0, ilen = res.length; i < ilen; i++) {
			s += '<tr><th>' + (i + 1);
			cols.forEach(function (colid) {
				s += '<td> ';
				if (res[i][colid] == +res[i][colid]) {
					// jshint ignore:line
					s += '<div style="text-align:right">';
					if (typeof res[i][colid] === 'undefined') {
						s += 'NULL';
					} else {
						s += res[i][colid];
					}
					s += '</div>';
				} else {
					if (typeof res[i][colid] === 'undefined') {
						s += 'NULL';
					} else if (typeof res[i][colid] === 'string') {
						s += res[i][colid];
					} else {
						s += JSONtoString(res[i][colid]);
					}
					//					s += res[i][colid];
				}
			});
		}

		s += '</table>';
	} else {
		s += '<p>' + JSONtoString(res) + '</p>';
	}
	// if() {}

	// 		if(typeof res == 'object') {
	// 			s += '<p>'+JSON.stringify(res)+'</p>';
	// 		} else {
	// 		}
	return s;
}

function scrollTo(element, to, duration) {
	if (duration <= 0) {
		return;
	}
	var difference = to - element.scrollTop;
	var perTick = (difference / duration) * 10;

	setTimeout(function () {
		if (element.scrollTop === to) {
			return;
		}
		element.scrollTop = element.scrollTop + perTick;
		scrollTo(element, to, duration - 10);
	}, 10);
}

alasql.prompt = function (el, useidel, firstsql) {
	if (utils.isNode) {
		throw new Error('The prompt not realized for Node.js');
	}

	var prompti = 0;

	if (typeof el === 'string') {
		el = document.getElementById(el);
	}

	if (typeof useidel === 'string') {
		useidel = document.getElementById(useidel);
	}

	useidel.textContent = alasql.useid;

	if (firstsql) {
		alasql.prompthistory.push(firstsql);
		prompti = alasql.prompthistory.length;
		try {
			var tm = Date.now();
			alasql.log(firstsql);
			alasql.write('<p style="color:blue">' + (Date.now() - tm) + ' ms</p>');
		} catch (err) {
			alasql.write('<p>' + alasql.useid + '&gt;&nbsp;<b>' + firstsql + '</b></p>');
			alasql.write('<p style="color:red">' + err + '<p>');
		}
	}

	var y = el.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
	scrollTo(document.getElementsByTagName('body')[0], y, 500);

	el.onkeydown = function (event) {
		if (event.which === 13) {
			var sql = el.value;
			var olduseid = alasql.useid;
			el.value = '';
			alasql.prompthistory.push(sql);
			prompti = alasql.prompthistory.length;
			try {
				var tm = Date.now();
				alasql.log(sql);
				alasql.write('<p style="color:blue">' + (Date.now() - tm) + ' ms</p>');
			} catch (err) {
				alasql.write('<p>' + olduseid + '&gt;&nbsp;' + alasql.pretty(sql, false) + '</p>');
				alasql.write('<p style="color:red">' + err + '<p>');
			}
			el.focus();
			//			console.log(el.getBoundingClientRect().top);
			useidel.textContent = alasql.useid;
			var y = el.getBoundingClientRect().top + document.getElementsByTagName('body')[0].scrollTop;
			scrollTo(document.getElementsByTagName('body')[0], y, 500);
		} else if (event.which === 38) {
			prompti--;
			if (prompti < 0) {
				prompti = 0;
			}
			if (alasql.prompthistory[prompti]) {
				el.value = alasql.prompthistory[prompti];
				event.preventDefault();
			}
		} else if (event.which === 40) {
			prompti++;
			if (prompti >= alasql.prompthistory.length) {
				prompti = alasql.prompthistory.length;
				el.value = '';
			} else if (alasql.prompthistory[prompti]) {
				el.value = alasql.prompthistory[prompti];
				event.preventDefault();
			}
		}
	};
};
