// Statements container
yy.Statements = function(params) { return yy.extend(this, params); };

yy.Statements.prototype.toString = function () {
	return this.statements.map(function(st){return st.toString()}).join(';');
};

yy.Statements.prototype.compile = function(db) {
	var statements = this.statements.map(function(st){return st.compile(db)});
	if(statements.length == 1) {
		return statements[0];	
	} else {
		return function(){
			return statements.map(function(st){ return st(); });
		}
	}
};
