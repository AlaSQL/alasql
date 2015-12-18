//formerly 89assert.js

export function Assert(params) { return extend(this, params); }

// SOURCE FILE
Assert.prototype.execute = function (databaseid) {
//	console.log(alasql.res, this.value);
	if(!deepEqual(alasql.res,this.value)) {
//		if(this.message) {
//			throw this.
//		} else {
			throw new Error((this.message||'Assert wrong')+': '+JSON.stringify(alasql.res)+' == '+JSON.stringify(this.value));
//		}
	}
	return 1;
};

yy.Source.prototype.toString = function() {
	var s = 'ASSERT';
	if(this.value) s += ' '+JSON.stringify(this.value);
	return s;
}