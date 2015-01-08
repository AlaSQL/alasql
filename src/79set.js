/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.SetVariable = function (params) { return yy.extend(this, params); }
yy.SetVariable.prototype.toString = function() {
	var s = K('SET')+' ';
	if(typeof this.value != 'undefined') s += K(this.variable.toUpperCase())+' '+(this.value?'ON':'OFF');
	if(this.expression) s += '@' + L(this.variable)+' = '+this.expression.toString();
	return s;
}

yy.SetVariable.prototype.execute = function (databaseid,params,cb) {
//	console.log(this);
	if(typeof this.value != 'undefined') {
		var val = this.value;
		if(val == 'ON') val = true;
		else if(val == 'OFF') val = false;
		alasql.options[this.variable] = val;
	} else if(this.expression) {
//		console.log(this.expression.toJavaScript('','', null));
		alasql.vars[this.variable] = new Function("params,alasql","return "
			+this.expression.toJavaScript('','', null))(params,alasql);
		if(alasql.declares[this.variable]) {
			alasql.vars[this.variable] = alasql.stdfn.CONVERT(alasql.vars[this.variable],alasql.declares[this.variable]);
		}
	}
	var res = 1;
	if(cb) res=cb(res);
	return res;
};

