//
// into functions
//
// (c) 2014 Andrey Gershun
//

alasql.into.SQL = function(filename, opts, data, columns, cb) {
	var res;
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}
	var opt = {};
	alasql.utils.extend(opt, opts);
	if (typeof opt.tableid === 'undefined') {
		throw new Error('Table for INSERT TO is not defined.');
	}

	var s = '';
	if (columns.length === 0) {
		if (typeof data[0] === 'object') {
			columns = Object.keys(data[0]).map(function(columnid) {
				return {columnid: columnid};
			});
		} else {
			// What should I do?
			// columns = [{columnid:"_"}];
		}
	}

	for (var i = 0, ilen = data.length; i < ilen; i++) {
		s += 'INSERT INTO ' + opts.tableid + '(';
		s += columns
			.map(function(col) {
				return col.columnid;
			})
			.join(',');
		s += ') VALUES (';
		s += columns.map(function(col) {
			var val = data[i][col.columnid];
			if (col.typeid) {
				if (
					col.typeid === 'STRING' ||
					col.typeid === 'VARCHAR' ||
					col.typeid === 'NVARCHAR' ||
					col.typeid === 'CHAR' ||
					col.typeid === 'NCHAR'
				) {
					val = "'" + escapeqq(val) + "'";
				}
			} else {
				if (typeof val == 'string') {
					val = "'" + escapeqq(val) + "'";
				}
			}
			return val;
		});
		s += ');\n';
	}
	//	if(filename === '') {
	//		res = s;
	//	} else {
	//		res = data.length;
	filename = alasql.utils.autoExtFilename(filename, 'sql', opts);
	res = alasql.utils.saveFile(filename, s);
	if (cb) {
		res = cb(res);
	}
	return res;
};

alasql.into.HTML = function(selector, opts, data, columns, cb) {
	var res = 1;
	if (typeof exports !== 'object') {
		var opt = {headers: true};
		alasql.utils.extend(opt, opts);

		var sel = document.querySelector(selector);
		if (!sel) {
			throw new Error('Selected HTML element is not found');
		}

		if (columns.length === 0) {
			if (typeof data[0] === 'object') {
				columns = Object.keys(data[0]).map(function(columnid) {
					return {columnid: columnid};
				});
			} else {
				// What should I do?
				// columns = [{columnid:"_"}];
			}
		}

		var tbe = document.createElement('table');
		var thead = document.createElement('thead');
		tbe.appendChild(thead);
		if (opt.headers) {
			var tre = document.createElement('tr');
			for (var i = 0; i < columns.length; i++) {
				var the = document.createElement('th');
				the.textContent = columns[i].columnid;
				tre.appendChild(the);
			}
			thead.appendChild(tre);
		}

		var tbody = document.createElement('tbody');
		tbe.appendChild(tbody);
		for (var j = 0; j < data.length; j++) {
			var tre = document.createElement('tr');
			for (var i = 0; i < columns.length; i++) {
				var the = document.createElement('td');
				the.textContent = data[j][columns[i].columnid];
				tre.appendChild(the);
			}
			tbody.appendChild(tre);
		}
		alasql.utils.domEmptyChildren(sel);
		//		console.log(tbe,columns);
		sel.appendChild(tbe);
	}
	if (cb) {
		res = cb(res);
	}
	return res;
};

alasql.into.JSON = function(filename, opts, data, columns, cb) {
	var res = 1;
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}
	var s = JSON.stringify(data);

	filename = alasql.utils.autoExtFilename(filename, 'json', opts);
	res = alasql.utils.saveFile(filename, s);
	if (cb) {
		res = cb(res);
	}
	return res;
};

alasql.into.TXT = function(filename, opts, data, columns, cb) {
	// If columns is empty
	if (columns.length === 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid) {
			return {columnid: columnid};
		});
	}
	// If one parameter
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}

	var res = data.length;
	var s = '';
	if (data.length > 0) {
		var key = columns[0].columnid;
		s += data
			.map(function(d) {
				return d[key];
			})
			.join('\n');
	}

	//	 } else {
	//		if(utils.isNode) {
	//			process.stdout.write(s);
	//		} else {
	//		console.log(s);
	//		};
	//	 }
	filename = alasql.utils.autoExtFilename(filename, 'txt', opts);
	res = alasql.utils.saveFile(filename, s);
	if (cb) {
		res = cb(res);
	}
	return res;
};

alasql.into.TAB = alasql.into.TSV = function(filename, opts, data, columns, cb) {
	var opt = {};
	alasql.utils.extend(opt, opts);
	opt.separator = '\t';
	filename = alasql.utils.autoExtFilename(filename, 'tab', opts);
	opt.autoExt = false;
	return alasql.into.CSV(filename, opt, data, columns, cb);
};

alasql.into.CSV = function(filename, opts, data, columns, cb) {
	if (columns.length === 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid) {
			return {columnid: columnid};
		});
	}
	if (typeof filename === 'object') {
		opts = filename;
		filename = undefined;
	}

	var opt = {headers: true};
	//opt.separator = ',';
	opt.separator = ';';
	opt.quote = '"';

	opt.utf8Bom = true;
	if (opts && !opts.headers && typeof opts.headers !== 'undefined') {
		opt.utf8Bom = false;
	}

	alasql.utils.extend(opt, opts);
	var res = data.length;
	var s = opt.utf8Bom ? '\ufeff' : '';
	if (opt.headers) {
		s +=
			opt.quote +
			columns
				.map(function(col) {
					return col.columnid.trim();
				})
				.join(opt.quote + opt.separator + opt.quote) +
			opt.quote +
			'\r\n';
	}

	data.forEach(function(d) {
		s +=
			columns
				.map(function(col) {
					var s = d[col.columnid];
					// escape the character wherever it appears in the field
					if (opt.quote !== '') {
						s = (s + '').replace(
							new RegExp('\\' + opt.quote, 'g'),
							opt.quote + opt.quote
						);
					}
					//			if((s+"").indexOf(opt.separator) > -1 || (s+"").indexOf(opt.quote) > -1) s = opt.quote + s + opt.quote;

					//Excel 2013 needs quotes around strings - thanks for _not_ complying with RFC for CSV
					if (+s != s) {
						// jshint ignore:line
						s = opt.quote + s + opt.quote;
					}

					return s;
				})
				.join(opt.separator) + '\r\n';
	});

	filename = alasql.utils.autoExtFilename(filename, 'csv', opts);
	res = alasql.utils.saveFile(filename, s, null, {disableAutoBom: true});
	if (cb) {
		res = cb(res);
	}
	return res;
};
