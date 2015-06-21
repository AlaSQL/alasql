// Pivot functions
/**
	Compile Pivot functions
	@param {object} query Source query
	@return {function} Pivoting functions
*/
yy.Select.prototype.compilePivot = function (query) {
	/** @type {string} Main pivoting column */
	var columnid = this.pivot.columnid;


	return function(data){
		/** @type {object} Collection of grouped records */
		var gx = {};
		/** @type {array} Array of grouped records */
		var gr = [];

		/** For each row in data array */
		for(var i=0,ilen=data.length;i<ilen;i++) {
			var r = data[i];
			var q = g[r[columnid]];  // Take 
			if(q === undefined) {
				q = g[r[columnid]] = clone(r);
				delete q[columnid];
				gr.push(q);
			};
			if(r[columnid]) {
				gfn(r,q,query.params,alasql);
			}
			q[r[columnid]] = arrfn(r);

		}
	};






if(false) {
	/** @type {array} Array of values for pivoting */
	var als = {};
	var s = 'var z;if(['+this.pivot.inlist.map(function(ie){
		var v;
		if(ie.expr instanceof yy.Column) {
			v = "'"+ie.expr.columnid+"'";
		} else if(ie.expr instanceof yy.StringValue) {
			return ie.expr.value;
		} else {
			return ie.expr.toJS();
		}
		if(ie.as) {
			als[v] = ie.as;
		} else {
			als[v] = v
		}
		return "'"+v+"'";
	}).join(',')+'].indexOf(r[\''+columnid+'\'])>-1){z=r[\''+columnid+'\'];';
	s += 'g[z] = (g[z]||0)+1;';
	s += '}';
console.log(this.pivot.expr.toJS());
	console.log(this.pivot);
	console.log(s);
	var gfn = new Function('g,r,params,alasql','var y;'+s);

	return function(data){
		var g = {}, gr = [];
		for(var i=0,ilen=data.length;i<ilen;i++) {
			var r = data[i];
			var q = g[r[columnid]];
			if(q === undefined) {
				q = g[r[columnid]] = clone(r);
				delete q[columnid];
				gr.push(q);
			};
			if(r[columnid]) {
				gfn(r,q,query.params,alasql);
			}
			q[r[columnid]] = arrfn(r);

		}
	};
}
};