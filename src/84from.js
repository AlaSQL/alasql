/*
//
// FROM functions Alasql.js
// Date: 11.12.2014
// (c) 2014, Andrey Gershun
//
*/

/**
 Meteor
 */

/* global alasql Tabletop document Event */

alasql.from.METEOR = function (filename, opts, cb, idx, query) {
	var res = filename.find(opts).fetch();
	if (cb) {
		res = cb(res, idx, query);
	}
	return res;
};

/**
 Google Spreadsheet reader
 */
alasql.from.TABLETOP = function (key, opts, cb, idx, query) {
	var res = [];

	var opt = {headers: true, simpleSheet: true, key: key};
	alasql.utils.extend(opt, opts);
	opt.callback = function (data) {
		res = data;
		if (cb) {
			res = cb(res, idx, query);
		}
	};

	Tabletop.init(opt);
	return null;
};

alasql.from.HTML = function (selector, opts, cb, idx, query) {
	var opt = {};
	alasql.utils.extend(opt, opts);

	var sel = document.querySelector(selector);
	if (!sel && sel.tagName !== 'TABLE') {
		throw new Error('Selected HTML element is not a TABLE');
	}

	var res = [];
	var headers = opt.headers;

	if (headers && !Array.isArray(headers)) {
		headers = [];
		var ths = sel.querySelector('thead tr').children;
		for (var i = 0; i < ths.length; i++) {
			if (!(ths.item(i).style && ths.item(i).style.display === 'none' && opt.skipdisplaynone)) {
				headers.push(ths.item(i).textContent);
			} else {
				headers.push(undefined);
			}
		}
	}
	//	console.log(headers);

	var trs = sel.querySelectorAll('tbody tr');

	for (var j = 0; j < trs.length; j++) {
		var tds = trs.item(j).children;
		var r = {};
		for (i = 0; i < tds.length; i++) {
			if (!(tds.item(i).style && tds.item(i).style.display === 'none' && opt.skipdisplaynone)) {
				if (headers) {
					r[headers[i]] = tds.item(i).textContent;
				} else {
					r[i] = tds.item(i).textContent;
					//				console.log(r);
				}
			}
		}
		res.push(r);
	}
	//console.log(res);
	if (cb) {
		res = cb(res, idx, query);
	}
	return res;
};

alasql.from.RANGE = function (start, finish, cb, idx, query) {
	var res = [];
	for (var i = start; i <= finish; i++) {
		res.push(i);
	}
	//	res = new alasql.Recordset({data:res,columns:{columnid:'_'}});
	if (cb) {
		res = cb(res, idx, query);
	}
	return res;
};

// Read data from any file
alasql.from.FILE = function (filename, opts, cb, idx, query) {
	var fname;
	if (typeof filename === 'string') {
		fname = filename;
	} else if (filename instanceof Event) {
		fname = filename.target.files[0].name;
	} else {
		throw new Error('Wrong usage of FILE() function');
	}

	var parts = fname.split('.');
	//	console.log("parts",parts,parts[parts.length-1]);
	var ext = parts[parts.length - 1].toUpperCase();
	//	console.log("ext",ext);
	if (alasql.from[ext]) {
		//		console.log(ext);
		return alasql.from[ext](filename, opts, cb, idx, query);
	} else {
		throw new Error('Cannot recognize file type for loading');
	}
};

// Read JSON file

alasql.from.JSON = function (filename, opts, cb, idx, query) {
	var res;
	//console.log('cb',cb);
	//console.log('JSON');
	filename = alasql.utils.autoExtFilename(filename, 'json', opts);
	alasql.utils.loadFile(filename, !!cb, function (data) {
		//		console.log('DATA:'+data);
		//		res = [{a:1}];
		res = JSON.parse(data);
		if (cb) {
			res = cb(res, idx, query);
		}
	});
	return res;
};

alasql.from.TXT = function (filename, opts, cb, idx, query) {
	var res;
	filename = alasql.utils.autoExtFilename(filename, 'txt', opts);
	alasql.utils.loadFile(filename, !!cb, function (data) {
		res = data.split(/\r?\n/);

		// Remove last line if empty
		if (res[res.length - 1] === '') {
			res.pop();
		}
		for (var i = 0, ilen = res.length; i < ilen; i++) {
			// Please avoid '===' here
			if (res[i] == +res[i]) {
				// eslint:ignore
				// jshint ignore:line
				res[i] = +res[i];
			}
			res[i] = [res[i]];
		}
		if (cb) {
			res = cb(res, idx, query);
		}
	});
	return res;
};

alasql.from.TAB = alasql.from.TSV = function (filename, opts, cb, idx, query) {
	opts = opts || {};
	opts.separator = '\t';
	filename = alasql.utils.autoExtFilename(filename, 'tab', opts);
	opts.autoext = false;
	return alasql.from.CSV(filename, opts, cb, idx, query);
};

alasql.from.CSV = function (contents, opts, cb, idx, query) {
	contents = '' + contents;
	var opt = {
		separator: ',',
		quote: '"',
		headers: true,
	};
	alasql.utils.extend(opt, opts);
	var res;
	var hs = [];
	function parseText(text) {
		var delimiterCode = opt.separator.charCodeAt(0);
		var quoteCode = opt.quote.charCodeAt(0);

		var EOL = {},
			EOF = {},
			rows = [],
			N = text.length,
			I = 0,
			n = 0,
			t,
			eol;
		function token() {
			if (I >= N) {
				return EOF;
			}
			if (eol) {
				return (eol = false), EOL;
			}
			var j = I;
			if (text.charCodeAt(j) === quoteCode) {
				var i = j;
				while (i++ < N) {
					if (text.charCodeAt(i) === quoteCode) {
						if (text.charCodeAt(i + 1) !== quoteCode) {
							break;
						}
						++i;
					}
				}
				I = i + 2;
				var c = text.charCodeAt(i + 1);
				if (c === 13) {
					eol = true;
					if (text.charCodeAt(i + 2) === 10) {
						++I;
					}
				} else if (c === 10) {
					eol = true;
				}
				return text.substring(j + 1, i).replace(/""/g, '"');
			}
			while (I < N) {
				var c = text.charCodeAt(I++),
					k = 1;
				if (c === 10) {
					eol = true;
				} else if (c === 13) {
					eol = true;
					if (text.charCodeAt(I) === 10) {
						++I;
						++k;
					}
				} else if (c !== delimiterCode) {
					continue;
				}
				return text.substring(j, I - k);
			}
			return text.substring(j);
		}

		while ((t = token()) !== EOF) {
			var a = [];
			while (t !== EOL && t !== EOF) {
				a.push(t.trim());
				t = token();
			}

			if (opt.headers) {
				if (n === 0) {
					if (typeof opt.headers === 'boolean') {
						hs = a;
					} else if (Array.isArray(opt.headers)) {
						hs = opt.headers;
						var r = {};
						hs.forEach(function (h, idx) {
							r[h] = a[idx];
							// Please avoid === here
							if (typeof r[h] !== 'undefined' && r[h].length !== 0 && r[h].trim() == +r[h]) {
								// jshint ignore:line
								r[h] = +r[h];
							}
						});
						rows.push(r);
					}
				} else {
					var r = {};
					hs.forEach(function (h, idx) {
						r[h] = a[idx];
						if (typeof r[h] !== 'undefined' && r[h].length !== 0 && r[h].trim() == +r[h]) {
							// jshint ignore:line
							r[h] = +r[h];
						}
					});
					rows.push(r);
				}
				n++;
			} else {
				rows.push(a);
			}
		}

		res = rows;

		if (opt.headers) {
			if (query && query.sources && query.sources[idx]) {
				var columns = (query.sources[idx].columns = []);
				hs.forEach(function (h) {
					columns.push({columnid: h});
				});
			}
		}

		/*/*
if(false) {
    res = data.split(/\r?\n/);
    if(opt.headers) {
      if(query && query.sources && query.sources[idx]) {
        var hh = [];
        if(typeof opt.headers == 'boolean') {
          hh = res.shift().split(opt.separator);
        } else if(Array.isArray(opt.headers)) {
          hh = opt.headers;
        }
        var columns = query.sources[idx].columns = [];
        hh.forEach(function(h){
          columns.push({columnid:h});
        });
        for(var i=0, ilen=res.length; i<ilen;i++) {
          var a = res[i].split(opt.separator);
          var b = {};
          hh.forEach(function(h,j){
            b[h] = a[j];
          });
          res[i] = b;
        }
//				console.log(res[0]);
      }
    } else {
      for(var i=0, ilen=res.length; i<ilen;i++) {
        res[i] = res[i].split(opt.separator);
      }
    }

};
*/
		if (cb) {
			res = cb(res, idx, query);
		}
	}
	if (new RegExp('\n').test(contents)) {
		parseText(contents);
	} else {
		contents = alasql.utils.autoExtFilename(contents, 'csv', opts);
		alasql.utils.loadFile(contents, !!cb, parseText, query.cb);
	}
	return res;
};

function XLSXLSX(X, filename, opts, cb, idx, query) {
	var opt = {};
	opts = opts || {};
	alasql.utils.extend(opt, opts);
	if (typeof opt.headers === 'undefined') {
		opt.headers = true;
	}
	var res;

	/**
	 * see https://github.com/SheetJS/js-xlsx/blob/5ae6b1965bfe3764656a96f536b356cd1586fec7/README.md
	 * for example of using readAsArrayBuffer under `Parsing Workbooks`
	 */
	function fixdata(data) {
		var o = '',
			l = 0,
			w = 10240;
		for (; l < data.byteLength / w; ++l)
			o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
		return o;
	}
	function getHeaderText(text) {
		// if casesensitive option is set to false and there is a text value return lowercase value of text
		if (text && alasql.options.casesensitive === false) {
			return text.toLowerCase();
		} else {
			return text;
		}
	}
	filename = alasql.utils.autoExtFilename(filename, 'xls', opts);
	alasql.utils.loadBinaryFile(
		filename,
		!!cb,
		function (data) {
			//	function processData(data) {
			if (data instanceof ArrayBuffer) {
				var arr = fixdata(data);
				var workbook = X.read(btoa(arr), {type: 'base64'});
			} else {
				var workbook = X.read(data, {type: 'binary'});
			}
			//		console.log(workbook);
			var sheetid;
			if (typeof opt.sheetid === 'undefined') {
				sheetid = workbook.SheetNames[0];
			} else if (typeof opt.sheetid === 'number') {
				sheetid = workbook.SheetNames[opt.sheetid];
			} else {
				sheetid = opt.sheetid;
			}
			var range;
			var res = [];
			if (typeof opt.range === 'undefined') {
				range = workbook.Sheets[sheetid]['!ref'];
			} else {
				range = opt.range;
				if (workbook.Sheets[sheetid][range]) {
					range = workbook.Sheets[sheetid][range];
				}
			}
			// if range has some value then data is present in the current sheet
			// else current sheet is empty
			if (range) {
				var rg = range.split(':');
				var col0 = rg[0].match(/[A-Z]+/)[0];
				var row0 = +rg[0].match(/[0-9]+/)[0];
				var col1 = rg[1].match(/[A-Z]+/)[0];
				var row1 = +rg[1].match(/[0-9]+/)[0];
				//		console.log(114,rg,col0,col1,row0,row1);
				//		console.log(114,rg,alasql.utils.xlscn(col0),alasql.utils.xlscn(col1));

				var hh = {};
				var xlscnCol0 = alasql.utils.xlscn(col0);
				var xlscnCol1 = alasql.utils.xlscn(col1);
				for (var j = xlscnCol0; j <= xlscnCol1; j++) {
					var col = alasql.utils.xlsnc(j);
					if (opt.headers) {
						if (workbook.Sheets[sheetid][col + '' + row0]) {
							hh[col] = getHeaderText(workbook.Sheets[sheetid][col + '' + row0].v);
						} else {
							hh[col] = getHeaderText(col);
						}
					} else {
						hh[col] = col;
					}
				}
				if (opt.headers) {
					row0++;
				}
				for (var i = row0; i <= row1; i++) {
					var row = {};
					for (var j = xlscnCol0; j <= xlscnCol1; j++) {
						var col = alasql.utils.xlsnc(j);
						if (workbook.Sheets[sheetid][col + '' + i]) {
							row[hh[col]] = workbook.Sheets[sheetid][col + '' + i].v;
						}
					}
					res.push(row);
				}
			} else {
				res.push([]);
			}

			// Remove last empty line (issue #548)
			if (res.length > 0 && res[res.length - 1] && Object.keys(res[res.length - 1]).length == 0) {
				res.pop();
			}

			if (cb) {
				res = cb(res, idx, query);
			}
		},
		function (err) {
			throw err;
		}
	);

	return res;
}

alasql.from.XLS = function (filename, opts, cb, idx, query) {
	opts = opts || {};
	filename = alasql.utils.autoExtFilename(filename, 'xls', opts);
	opts.autoExt = false;
	return XLSXLSX(getXLSX(), filename, opts, cb, idx, query);
};

alasql.from.XLSX = function (filename, opts, cb, idx, query) {
	opts = opts || {};
	filename = alasql.utils.autoExtFilename(filename, 'xlsx', opts);
	opts.autoExt = false;
	return XLSXLSX(getXLSX(), filename, opts, cb, idx, query);
};

alasql.from.ODS = function (filename, opts, cb, idx, query) {
	opts = opts || {};
	filename = alasql.utils.autoExtFilename(filename, 'ods', opts);
	opts.autoExt = false;
	return XLSXLSX(getXLSX(), filename, opts, cb, idx, query);
};
