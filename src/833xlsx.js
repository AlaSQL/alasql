/**
	Export to XLSX function
	@function
	@param {string|object} filename Filename or options
	@param {object|undefined} opts Options or undefined
	@param {array} data Data
	@param {array} columns Columns
	@parab {callback} cb Callback function
	@return {number} Number of files processed
*/

alasql.into.XLSX = function(filename, opts, data, columns, cb) {
	/** @type {number} result */
	var res = 1;

	if (deepEqual(columns, [{columnid: '_'}])) {
		data = data.map(function(dat) {
			return dat._;
		});
		columns = undefined;
		//		res = [{_:1}];
	} else {
		//		data = data1;
	}

	//console.log(data);

	filename = alasql.utils.autoExtFilename(filename, 'xlsx', opts);

	var XLSX = getXLSX();

	/* If called without filename, use opts */
	if (typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}

	/** @type {object} Workbook */
	var wb = {SheetNames: [], Sheets: {}};

	// ToDo: check if cb must be treated differently here
	if (opts.sourcefilename) {
		alasql.utils.loadBinaryFile(opts.sourcefilename, !!cb, function(data) {
			wb = XLSX.read(data, {type: 'binary'});
			doExport();
		});
	} else {
		doExport();
	}

	/* Return result */
	if (cb) res = cb(res);
	return res;

	/**
		Export workbook
		@function
	*/
	function doExport() {
		/*
			If opts is array of arrays then this is a
			multisheet workboook, else it is a singlesheet
		*/
		if (typeof opts == 'object' && Array.isArray(opts)) {
			if (data && data.length > 0) {
				data.forEach(function(dat, idx) {
					prepareSheet(opts[idx], dat, undefined, idx + 1);
				});
			}
		} else {
			prepareSheet(opts, data, columns, 1);
		}

		saveWorkbook(cb);
	}

	/**
		Prepare sheet
		@params {object} opts
		@params {array|object} data
		@params {array} columns Columns
	*/
	function prepareSheet(opts, data, columns, idx) {
		/** Default options for sheet */
		var opt = {sheetid: 'Sheet ' + idx, headers: true};
		alasql.utils.extend(opt, opts);

		var dataLength = Object.keys(data).length;

		// Generate columns if they are not defined
		if ((!columns || columns.length == 0) && dataLength > 0) {
			columns = Object.keys(data[0]).map(function(columnid) {
				return {columnid: columnid};
			});
		}

		var cells = {};

		if (wb.SheetNames.indexOf(opt.sheetid) > -1) {
			cells = wb.Sheets[opt.sheetid];
		} else {
			wb.SheetNames.push(opt.sheetid);
			wb.Sheets[opt.sheetid] = {};
			cells = wb.Sheets[opt.sheetid];
		}

		var range = 'A1';
		if (opt.range) range = opt.range;

		var col0 = alasql.utils.xlscn(range.match(/[A-Z]+/)[0]);
		var row0 = +range.match(/[0-9]+/)[0] - 1;

		if (wb.Sheets[opt.sheetid]['!ref']) {
			var rangem = wb.Sheets[opt.sheetid]['!ref'];
			var colm = alasql.utils.xlscn(rangem.match(/[A-Z]+/)[0]);
			var rowm = +rangem.match(/[0-9]+/)[0] - 1;
		} else {
			var colm = 1,
				rowm = 1;
		}
		var colmax = Math.max(col0 + columns.length, colm);
		var rowmax = Math.max(row0 + dataLength + 2, rowm);

		//		console.log(col0,row0);
		var i = row0 + 1;

		wb.Sheets[opt.sheetid]['!ref'] = 'A1:' + alasql.utils.xlsnc(colmax) + rowmax;
		//		var i = 1;

		if (opt.headers) {
			columns.forEach(function(col, idx) {
				cells[alasql.utils.xlsnc(col0 + idx) + '' + i] = {v: col.columnid.trim()};
			});
			i++;
		}

		for (var j = 0; j < dataLength; j++) {
			columns.forEach(function(col, idx) {
				var cell = {v: data[j][col.columnid]};
				if (typeof data[j][col.columnid] == 'number') {
					cell.t = 'n';
				} else if (typeof data[j][col.columnid] == 'string') {
					cell.t = 's';
				} else if (typeof data[j][col.columnid] == 'boolean') {
					cell.t = 'b';
				} else if (typeof data[j][col.columnid] == 'object') {
					if (data[j][col.columnid] instanceof Date) {
						cell.t = 'd';
					}
				}
				cells[alasql.utils.xlsnc(col0 + idx) + '' + i] = cell;
			});
			i++;
		}
	}

	/**
		Save Workbook
		@params {array} wb Workbook
		@params {callback} cb Callback
	*/
	function saveWorkbook(cb) {
		//console.log(wb);
		var XLSX;

		if (typeof filename == 'undefined') {
			res = wb;
		} else {
			XLSX = getXLSX();

			if (utils.isNode || utils.isMeteorServer) {
				XLSX.writeFile(wb, filename);
			} else {
				var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
				var wbout = XLSX.write(wb, wopts);

				function s2ab(s) {
					var buf = new ArrayBuffer(s.length);
					var view = new Uint8Array(buf);
					for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
					return buf;
				}

				/* the saveAs call downloads a file on the local machine */
				//				saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), '"'+filename+'"')
				//				saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), filename)
				//				saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.ms-excel"}), '"'+filename+'"');
				if (isIE() == 9) {
					throw new Error(
						'Cannot save XLSX files in IE9. Please use XLS() export function'
					);
					//					var URI = 'data:text/plain;charset=utf-8,';

					/** @todo Check if this code is required */

					/*/*
					var testlink = window.open("about:blank", "_blank");
					var s = '';
					for(var i=0,ilen=wbout.length;i<ilen;i++) {
						var ch = wbout.charCodeAt(i);
						if(i<20) console.log('&#'+ch+';');
						s += '&#x'+ch.toString(16)+';';
					};
					testlink.document.write(s); //fileData has contents for the file
					testlink.document.close();
					testlink.document.execCommand('SaveAs', false, filename);
					testlink.close();
*/
					//					alert('ie9');
				} else {
					saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), filename);
				}
			}
		}
		/*/*
		// data.forEach(function(d){
		// 	s += columns.map(function(col){
		// 		return d[col.columnid];
		// 	}).join(opts.separator)+'\n';
		// });
		// alasql.utils.saveFile(filename,s);
*/
	}
};
