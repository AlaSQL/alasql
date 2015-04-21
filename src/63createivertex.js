/*
//
// CREATE VERTEXT for AlaSQL
// Date: 21.04.2015
// (c) 2015, Andrey Gershun
//
*/

yy.CreateVertex = function (params) { return yy.extend(this, params); }
yy.CreateVertex.prototype.toString = function() {
	var s = K('CREATE')+' '+K('VERTEX')+' ';
	if(this.class) s += L(this.class)+' ';
	// SET
	// CONTENT
	// SELECT
	return s;
}

yy.CreateVertex.prototype.toJavaScript = function(context, tableid, defcols) {
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	return s;
};
// CREATE TABLE
yy.CreateVertex.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(cb) res = cb(res);
	return res;
};

yy.CreateVertex.prototype.compile = function (databaseid) {
};

yy.CreateEdge = function (params) { return yy.extend(this, params); }
yy.CreateVertex.prototype.toString = function() {
	var s = K('CREATE')+' '+K('EDGE')+' ';
	if(this.class) s += L(this.class)+' ';
	// SET
	// CONTENT
	// SELECT
	return s;
}

yy.CreateEdge.prototype.toJavaScript = function(context, tableid, defcols) {
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	return s;
};

// CREATE TABLE
yy.CreateEdge.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(cb) res = cb(res);
	return res;
};

yy.CreateEdge.prototype.compile = function (databaseid) {
};