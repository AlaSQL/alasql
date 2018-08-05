export default mem => {
	const yy = mem.grammar.yy;
	const alasql = mem.alasql;

	yy.FuncValue = function (params) {
		return yy.extend(this, params);
	};
	yy.FuncValue.prototype.toString = function (dontas) {
		var s = '';

		if (alasql.fn[this.funcid]) s += this.funcid;
		else if (alasql.aggr[this.funcid]) s += this.funcid;
		else if (alasql.stdlib[this.funcid.toUpperCase()] || alasql.stdfn[this.funcid.toUpperCase()])
			s += this.funcid.toUpperCase();

		s += '(';
		if (this.args && this.args.length > 0) {
			s += this.args
				.map(function (arg) {
					return arg.toString();
				})
				.join(',');
		}
		s += ')';
		if (this.as && !dontas) s += ' AS ' + this.as.toString();
		//	if(this.alias) s += ' AS '+this.alias;
		return s;
	};

	yy.FuncValue.prototype.execute = function (databaseid, params, cb) {
		var res = 1;
		alasql.precompile(this, databaseid, params); // Precompile queries
		//	console.log(34,this.toJS('','',null));
		var expr = new Function('params,alasql', 'var y;return ' + this.toJS('', '', null));
		expr(params, alasql);
		if (cb) res = cb(res);
		return res;
	};

	/*/*
	//yy.FuncValue.prototype.compile = function(context, tableid, defcols){
	//	console.log('Expression',this);
	//	if(this.reduced) return returnTrue();
	//	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
	//};
	
	
	// yy.FuncValue.prototype.compile = function(context, tableid, defcols){
	// //	console.log('Expression',this);
	// 	if(this.reduced) return returnTrue();
	// 	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
	// };
	
	*/

	yy.FuncValue.prototype.findAggregator = function (query) {
		if (this.args && this.args.length > 0) {
			this.args.forEach(function (arg) {
				if (arg.findAggregator) arg.findAggregator(query);
			});
		}
	};

	yy.FuncValue.prototype.toJS = function (context, tableid, defcols) {
		var s = '';
		var funcid = this.funcid;
		// IF this is standard compile functions
		if (!alasql.fn[funcid] && alasql.stdlib[funcid.toUpperCase()]) {
			if (this.args && this.args.length > 0) {
				s += alasql.stdlib[funcid.toUpperCase()].apply(
					this,
					this.args.map(function (arg) {
						return arg.toJS(context, tableid);
					})
				);
			} else {
				s += alasql.stdlib[funcid.toUpperCase()]();
			}
		} else if (!alasql.fn[funcid] && alasql.stdfn[funcid.toUpperCase()]) {
			if (this.newid) s += 'new ';
			s += 'alasql.stdfn.' + this.funcid.toUpperCase() + '(';
			//		if(this.args) s += this.args.toJS(context, tableid);
			if (this.args && this.args.length > 0) {
				s += this.args
					.map(function (arg) {
						return arg.toJS(context, tableid, defcols);
					})
					.join(',');
			}
			s += ')';
		} else {
			// This is user-defined run-time function
			// TODO arguments!!!
			//		var s = '';
			if (this.newid) s += 'new ';
			s += 'alasql.fn.' + this.funcid + '(';
			//		if(this.args) s += this.args.toJS(context, tableid);
			if (this.args && this.args.length > 0) {
				s += this.args
					.map(function (arg) {
						return arg.toJS(context, tableid, defcols);
					})
					.join(',');
			}
			s += ')';
		}
		//console.log('userfn:',s,this);

		//	if(this.alias) s += ' AS '+this.alias;
		return s;
	};

	/*/*
	// // Functions compiler
	// nodes.FunctionValue.prototype.toJS = function (context, tableid) {
	// 	var s = '';
	// 	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
	// 		if(arg) return arg.toJS(context, tableid);
	// 		else return '';
	// 	}));
	// 	return s;
	// };
	*/

	mem.grammar.yy = yy;
};