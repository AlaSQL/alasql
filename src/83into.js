//
// into functions
//
// (c) 2014 Andrey Gershun
//

utils.emptyChildren = function (container){
  var len = container.childNodes.length;
  while (len--) {
    container.removeChild(container.lastChild);
  };
};

alasql.into.HTML = function(selector, opts, data, columns, cb) {
	var opt = {};
	alasql.utils.extend(opt, opts);

	var sel = document.querySelector(selector);
	if(!sel) {
		throw new Error('Selected HTML element is not found');
	};	

	if(columns.length == 0) {
		if(typeof data[0] == "object") {
			columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
		} else {
			// What should I do?
			// columns = [{columnid:"_"}];
		}
	}

	var tbe = document.createElement('table');
	var thead = document.createElement('thead');
	tbe.appendChild(thead);
	if(opt.headers) {
		var tre = document.createElement('tr');
		for(var i=0;i<columns.length;i++){
			var the = document.createElement('th');
			the.textContent = columns[i].columnid;
			tre.appendChild(the);
		}
		thead.appendChild(tre);
	}

	var tbody = document.createElement('tbody');
	tbe.appendChild(tbody);
	for(var j=0;j<data.length;j++){
		var tre = document.createElement('tr');
		for(var i=0;i<columns.length;i++){
			var the = document.createElement('td');
			the.textContent = data[j][columns[i].columnid];
			tre.appendChild(the);
		}
		tbody.appendChild(tre);
	};
	alasql.utils.emptyChildren(sel);
	console.log(tbe,columns);
	sel.appendChild(tbe);
};

alasql.into.JSON = function(filename, opts, data, columns, cb) {
	var s = JSON.stringify(data);
	alasql.utils.saveFile(filename,s);
};

alasql.into.TXT = function(filename, opts, data, columns, cb) {
	// If columns is empty
	if(columns.length == 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
	}
	if(typeof filename == 'object') {
		opts = filename;
		filename = null;
	}

	var res = data.length;
	var s = '';
	if(data.length > 0) {
		var key = columns[0].columnid;
		s += data.map(function(d){
			return d[key];
		}).join('\n');
	}
//	if(filename) {
		alasql.utils.saveFile(filename,s);
//	} else {
//		if(typeof exports == 'object') {
//			process.stdout.write(s);
//		} else {
//		console.log(s);
//		};
//	}
	if(cb) res = cb(res);
	return res;
};

alasql.into.TAB = alasql.into.TSV = function(filename, opts, data, columns, cb) {
	var opt = {};
	alasql.utils.extend(opt, opts);
	opt.separator = '\t';
	return alasql.into.CSV(filename, opt, data, columns, cb);
}

alasql.into.CSV = function(filename, opts, data, columns, cb) {
	if(columns.length == 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
	}
	if(typeof filename == 'object') {
		opts = filename;
		filename = null;
	}

	var opt = {};
	opt.separator = ',';
	opt.quote = '"';
	alasql.utils.extend(opt, opts);
	var res = data.length;
	var s = '';
	if(opt.headers) {
		s += columns.map(function(col){
			return col.columnid;
		}).join(opt.separator)+'\n';
	}

	data.forEach(function(d, idx){
		s += columns.map(function(col){
			var s = d[col.columnid];
			s = (s+"").replace(new RegExp('\\'+opt.quote,"g"),'""');
			if((s+"").indexOf(opt.separator) > -1 || (s+"").indexOf(opt.quote) > -1) s = opt.quote + s + opt.quote; 
			return s;
		}).join(opt.separator)+'\n';	
	});
	if(filename) {
		alasql.utils.saveFile(filename,s);
	} else {
		console.log(s);
	}
	if(cb) res = cb(res);
	return res;
};

alasql.into.XLSX = function(filename, opts, data, columns, cb) {
	if(columns.length == 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
	}

	if(typeof exports == 'object') {
		var XLSX = require('xlsx');
	} else {
		var XLSX = window.XLSX;
	};

	var opt = {sheetid:'Sheet1',headers:true};
	alasql.utils.extend(opt, opts);

	var res = data.length;
	var cells = {};
	var wb = {SheetNames:[], Sheets:{}};
	wb.SheetNames.push(opt.sheetid);
	wb.Sheets[opt.sheetid] = cells;

	wb.Sheets[opt.sheetid]['!ref'] = 'A1:'+alasql.utils.xlsnc(columns.length)+(data.length+2);
	var i = 1;

	if(opt.headers) {
		columns.forEach(function(col, idx){
			cells[alasql.utils.xlsnc(idx)+""+i] = {v:col.columnid};
		});
		i++;
	}

	for(var j=0;j<data.length;j++) {
		columns.forEach(function(col, idx){
			cells[alasql.utils.xlsnc(idx)+""+i] = {v:data[j][col.columnid]};
		});		
		i++;
	}

//	console.log(wb);

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
//		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), '"'+filename+'"')
//		saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), filename)
//		saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.ms-excel"}), '"'+filename+'"');
		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename);
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
