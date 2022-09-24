yy.Select.prototype.compileOrder = function (query, params) {
	var self = this;
	self.orderColumns = [];
	if (this.order) {
		//			console.log(990, this.order);
		if (
			this.order &&
			this.order.length == 1 &&
			this.order[0].expression &&
			typeof this.order[0].expression == 'function'
		) {
			//			console.log(991, this.order[0]);
			var func = this.order[0].expression;
			//			console.log(994, func);
			var nullsOrder =
				this.order[0].nullsOrder == 'FIRST' ? -1 : this.order[0].nullsOrder == 'LAST' ? +1 : 0;
			return function (a, b) {
				var ra = func(a),
					rb = func(b);
				if (nullsOrder) {
					if (ra == null) return rb == null ? 0 : nullsOrder;
					if (rb == null) return -nullsOrder;
				}
				if (ra > rb) return 1;
				if (ra == rb) return 0;
				return -1;
			};
		}

		var s = '';
		var sk = '';
		this.order.forEach(function (ord, idx) {
			// console.log(ord instanceof yy.Expression);
			// console.log(ord.toJS('a',''));
			// console.log(ord.expression instanceof yy.Column);

			if (ord.expression instanceof yy.NumValue) {
				var v = self.columns[ord.expression.value - 1];
			} else {
				var v = ord.expression;
			}
			self.orderColumns.push(v);

			var key = '$$$' + idx;

			// Date conversion
			var dg = '';
			//if(alasql.options.valueof)
			if (ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid;
				if (query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if (dbtypeid == 'DATE' || dbtypeid == 'DATETIME' || dbtypeid == 'DATETIME2')
						dg = '.valueOf()';
					// TODO Add other types mapping
				} else {
					if (alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				}
				//				dg = '.valueOf()';
			}
			if (ord.expression instanceof yy.ParamValue) {
				var columnid = params[ord.expression.param];
				if (query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if (dbtypeid == 'DATE' || dbtypeid == 'DATETIME' || dbtypeid == 'DATETIME2')
						dg = '.valueOf()';
					// TODO Add other types mapping
				} else {
					if (alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				}
				//				dg = '.valueOf()';
			}
			// COLLATE NOCASE
			if (ord.nocase) dg += '.toUpperCase()';

			if (ord.nullsOrder) {
				if (ord.nullsOrder == 'FIRST') {
					s += "if((a['" + key + "'] != null) && (b['" + key + "'] == null)) return 1;";
				} else if (ord.nullsOrder == 'LAST') {
					s += "if((a['" + key + "'] == null) && (b['" + key + "'] != null)) return 1;";
				}
				s += "if((a['" + key + "'] == null) == (b['" + key + "'] == null)) {";
				sk += '}';
			}

			s +=
				"if((a['" +
				key +
				"']||'')" +
				dg +
				(ord.direction == 'ASC' ? '>' : '<') +
				"(b['" +
				key +
				"']||'')" +
				dg +
				')return 1;';
			s += "if((a['" + key + "']||'')" + dg + "==(b['" + key + "']||'')" + dg + '){';
			//console.log(37,s);

			/*
if(false) {
//console.log(ord.expression, ord.expression instanceof yy.NumValue);
			if(ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value-1];
//console.log(ord.expression);
				ord.expression = new yy.Column({columnid:ord.expression.nick});
			};

			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid;
				if(query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if( dbtypeid == 'DATE' || dbtypeid == 'DATETIME' || dbtypeid == 'DATETIME2') dg = '.valueOf()';
					// TODO Add other types mapping
				} else {
					if(alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				}
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';

				s += 'if((a[\''+columnid+"']||'')"+dg+(ord.direction == 'ASC'?'>':'<')+'(b[\''+columnid+"']||'')"+dg+')return 1;';
				s += 'if((a[\''+columnid+"']||'')"+dg+'==(b[\''+columnid+"']||'')"+dg+'){';

			} else {
				dg = '.valueOf()';
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+(ord.direction == 'ASC'?'>(':'<(')+ord.toJS('b','')+"||'')"+dg+')return 1;';
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+'==('+ord.toJS('b','')+"||'')"+dg+'){';
			}

//			if(columnid == '_') {
//				s += 'if(a'+dg+(ord.direction == 'ASC'?'>':'<')+'b'+dg+')return 1;';
//				s += 'if(a'+dg+'==b'+dg+'){';
//			} else {
			// TODO Add date comparision
//				// s += 'if(a[\''+columnid+"']"+dg+(ord.direction == 'ASC'?'>':'<')+'b[\''+columnid+"']"+dg+')return 1;';
//				// s += 'if(a[\''+columnid+"']"+dg+'==b[\''+columnid+"']"+dg+'){';
//			}

}
*/
			sk += '}';
		});
		s += 'return 0;';
		s += sk + 'return -1';
		query.orderfns = s;
		//console.log('ORDERBY',s);
		return new Function('a,b', 'var y;' + s);
	}
};
