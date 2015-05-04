/* global alasql */
/* global yy */
/*
//
// SEARCH for Alasql.js
// Date: 04.05.2015
// (c) 2015, Andrey Gershun
//
*/

yy.Search = function (params) { return yy.extend(this, params); }
yy.Search.prototype.toString = function () {
	var s = K('SEARCH') + ' ';
	if (this.selectors) s += this.selectors.toString();
	if (this.from) s += K('FROM') + ' ' + this.from.toString();
	return s;
};

yy.Search.prototype.execute = function (databaseid, params, cb) {
	var res;
	var search = {};
	var fromfn = new Function('return '+this.from.toJavaScript());
	var fromdata = fromfn();
	var selidx = 0;
	var selvalue = fromdata;
	var selectors = this.selectors;
	
	if(typeof this.selectors != 'undefined' && this.selectors.length > 0) {
		res = processSelector(selidx,selvalue);
	} else {
		res = fromdata; 	
	}
	
	if (cb) res = cb(res);
	return res;
	
	function processSelector(sidx,value) {
		var sel = selectors[sidx];
		if(!alasql.srch[sel.srchid]) {
			throw new Error('Selector "'+sel.srchid+'" not found');
		};
		
		var r = alasql.srch[sel.srchid](value,sel.args);
		if(r.status == 1) {
			if(sidx+1+1 > selectors.length) {
				return r.values;					
			} else {
				for(var i=0;i<r.values.length;i++) {
					return processSelector(sidx+1,r.values[i]);									
				}
			}
		}
	}
};

// List of search functions
alasql.srch = {};
alasql.srch.PROP = function(val,args) {
	return {status: 1, values: [val[args[0]]]};
}
