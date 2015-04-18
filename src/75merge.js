/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Merge = function (params) { return yy.extend(this, params); }
yy.Merge.prototype.toString = function() {
	var s = K('MERGE')+' ';
	s += L(this.into.tableid)+' ';
	if(this.into.as) s += K('AS')+' '+L(this.into.as)+' ';
	s += K('USING')+' '+L(this.using.tableid)+' ';
	if(this.using.as) s += K('AS')+' '+L(this.using.as)+' ';
	s += K('ON')+' '+this.on.toString()+' ';
	this.matches.forEach(function(m){
		s += K('WHEN')+' ';
		if(!m.matched) s += K('NOT')+' ';
		s += K('MATCHED')+' ';
		if(m.bytarget) s += K('BY')+' '+K('TARGET')+' ';
		if(m.bysource) s += K('BY')+' '+K('SOURCE')+' ';
		if(m.expr) s+= K('AND')+' '+m.expr.toString()+' ';
		s += K('THEN')+' ';
		if(m.action.delete) s += K('DELETE')+' ';
		if(m.action.insert) {
			s += K('INSERT')+' ';
			if(m.action.columns) s += '('+m.action.columns.toString()+') ';
			if(m.action.values) s += K('VALUES')+' ('+m.action.values.toString()+') ';
			if(m.action.defaultvalues) s += K('DEFAULT')+' '+K('VALUES')+' ';
		}
		if(m.action.update) {
			s += K('UPDATE')+' ';
			s += m.action.update.map(function(u){
				return u.toString();
			}).join(',')+' ';
		}

	});

//	console.log(this);
	return s;
}

yy.Merge.prototype.execute = function (databaseid,params,cb) {
	var res = 1;



	if(cb) res=cb(res);
	return res;
};

