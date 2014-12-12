//
// 
//
//
//

alasql.into.TXT = function(filename, opts, data, columns, cb) {
	var res = data.length;
	var s = '';
	if(data.length > 0) {
		var key = columns[0].columnid;
		s += data.map(function(d){
			return d[key];
		}).join('\n');
	}
	alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};

alasql.into.TAB = function(filename, opts, data, columns, cb) {
	var opt = {};
	alasql.utils.extend(opt, opts);
	opt.separator = '\t';
	return alasql.into.CSV(filename, opt, data, columns, cb);
}

alasql.into.CSV = function(filename, opts, data, columns, cb) {
	var opt = {};
	opt.separator = ',';
	alasql.utils.extend(opt, opts);
	var res = data.length;
	var s = '';
	if(opts && opts.headers) {
		s += columns.map(function(col){
			return col.columnid;
		}).join(opts.separator)+'\n';
	}

	data.forEach(function(d){
		s += columns.map(function(col){
			return d[col.columnid];
		}).join(opts.separator)+'\n';	
	});
	alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};

alasql.into.XLSX = function(filename, opts, data, columns, cb) {
	if(typeof exports == 'object') {
		var XLSX = require('xlsx');
	};

	var opt = {};
	var res = data.length;
	var cells = {};
	var wb = {SheetNames:[], Sheets:{}};
	wb.SheetNames.push('Sheet2');
	wb.Sheets.Sheet2 = cells;
	var i = 1;

	for(i=1;i<10;i++) {
		if(opts && opts.headers) {
			columns.forEach(function(col, idx){
				cells[alasql.utils.xlsnc(idx)+""+i] = {v:col.columnid};
			});
		}
	}

	console.log(wb);

	if(typeof exports == 'object') {
		XLSX.writeFile(wb, filename);
	} else {
		//console.log(wb);
		var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
		var wbout = XLSX.write(wb,wopts);

		function s2ab(s) {
		  var buf = new ArrayBuffer(s.length);
		  var view = new Uint8Array(buf);
		  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		  return buf;
		}

		/* the saveAs call downloads a file on the local machine */
		saveAs(new Blob([s2ab(wbout)],{type:""}), filename)
	}


	// data.forEach(function(d){
	// 	s += columns.map(function(col){
	// 		return d[col.columnid];
	// 	}).join(opts.separator)+'\n';	
	// });
	// alasql.utils.saveFile(filename,s);
	if(cb) res = cb(res);
	return res;
};
