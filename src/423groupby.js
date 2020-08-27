/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
 Compile group of statements
 */
yy.Select.prototype.compileGroup = function (query) {
	//	console.log(this.group);
	if (query.sources.length > 0) {
		var tableid = query.sources[0].alias;
	} else {
		// If SELECT contains group aggregators without source tables
		var tableid = '';
	}
	var defcols = query.defcols;
	//	console.log(16,tableid, defcols);

	//	console.log(query.sources[0].alias,query.defcols);
	var allgroup = [[]];
	if (this.group) {
		allgroup = decartes(this.group, query);
	}
	//	console.log(23,allgroup);

	//	console.log(allgroup);
	// Prepare groups
	//var allgroup = [['a'], ['a','b'], ['a', 'b', 'c']];

	// Union all arrays to get a maximum
	var allgroups = [];
	allgroup.forEach(function (a) {
		allgroups = arrayUnion(allgroups, a);
	});

	query.allgroups = allgroups;

	query.ingroup = [];
	//console.log(42,294, this.group);
	//console.log(allgroups);
	//		console.log(42,364,query.selectColumns)

	/*/*
if(false) {
	allgroups.forEach(function(col2){
//		console.log(42,365,colid, query.selectColumns[colid])
		if(query.selectColumns[colid]) {
//			console.log(colid,'ok');
		} else {
//			if(colid.indexOf())
//			console.log(colid,'bad');
			var tmpid = 'default';
			if(query.sources.length > 0) tmpid = query.sources[0].alias;
//			console.log(new yy.Column({columnid:colid}).toJS('p',query.sources[0].alias));
//			query.selectfns += 'r[\''+colid+'\']=p[\''+tmpid+'\'][\''+colid+'\'];';
//console.log(374, colid);
			if(Object.keys(query.selectColumns).length != 0) query.removeKeys.push(colid);
			query.selectfns += 'r[\''+escapeq(colid)+'\']='+(new yy.Column({columnid:colid}).toJS('p',tmpid))+';';
		}
	});
};
*/
	// Create negative array

	var s = '';
	//	s+= query.selectfns;
	allgroup.forEach(function (agroup) {
		// Start of group function
		s += 'var g=this.xgroups[';

		//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r
		// Array with group columns from record
		var rg = agroup.map(function (col2) {
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];
			// Check, if aggregator exists but GROUP BY is not exists
			if (columnid === '') {
				return '1'; // Create fictive groupping column for fictive GROUP BY
			}
			//			else return "r['"+columnid+"']";
			query.ingroup.push(columnid);
			//			console.log(429,87,query.ingroup);
			return coljs;
		});

		if (rg.length === 0) {
			rg = ["''"];
		}

		//	console.log('rg',rg);

		s += rg.join('+"`"+');
		s += '];if(!g) {this.groups.push((g=this.xgroups[';
		s += rg.join('+"`"+');
		s += '] = {';
		//		s += ']=r';
		s += agroup
			.map(function (col2) {
				var columnid = col2.split('\t')[0];
				var coljs = col2.split('\t')[1];

				if (columnid === '') {
					return '';
				}
				return "'" + columnid + "':" + coljs + ',';
			})
			.join('');
		//console.log(agroup);
		var neggroup = arrayDiff(allgroups, agroup);

		//		console.log(neggroup);

		s += neggroup
			.map(function (col2) {
				var columnid = col2.split('\t')[0];
				//	var coljs = col2.split('\t')[1]
				return "'" + columnid + "':null,";
			})
			.join('');
		//console.log(neggroup);
		var aft = '',
			aft2 = '';

		if (typeof query.groupStar !== 'undefined') {
			aft2 += "for(var f in p['" + query.groupStar + "']) {g[f]=p['" + query.groupStar + "'][f];};";
		}

		/*
		 */
		//		s += self.columns.map(function(col){
		//console.log('query.selectGroup',query.selectGroup);
		s += query.selectGroup
			.map(function (col) {
				//console.log(idx, col.toString(), col.as);
				var colexp = col.expression.toJS('p', tableid, defcols);
				var colas = col.nick;
				// if(typeof colas == 'undefined') {
				// 	if(col instanceof yy.Column) colas = col.columnid;
				// 	else colas = col.toString();
				// };
				if (col instanceof yy.AggrValue) {
					if (col.distinct) {
						aft +=
							",g['$$_VALUES_" + colas + "']={},g['$$_VALUES_" + colas + "'][" + colexp + ']=true';
					}
					if (col.aggregatorid === 'SUM') {
						return "'" + colas + "':(" + colexp + ')||0,';
					} else if (
						col.aggregatorid === 'MIN' ||
						col.aggregatorid === 'MAX' ||
						col.aggregatorid === 'FIRST' ||
						col.aggregatorid === 'LAST'
						//					|| col.aggregatorid == 'AVG'
						//							) { return "'"+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJS();
					) {
						return "'" + colas + "':" + colexp + ','; //f.field.arguments[0].toJS();
					} else if (col.aggregatorid === 'ARRAY') {
						return "'" + colas + "':[" + colexp + '],';
					} else if (col.aggregatorid === 'COUNT') {
						if (col.expression.columnid === '*') {
							return "'" + colas + "':1,";
						} else {
							//						return "'"+colas+'\':(typeof '+colexp+' != "undefined")?1:0,';
							//					} else {
							return "'" + colas + "':(typeof " + colexp + ' != "undefined")?1:0,';
						}

						//				else if(col.aggregatorid == 'MIN') { return "'"+col.as+'\':r[\''+col.as+'\'],'; }
						//				else if(col.aggregatorid == 'MAX') { return "'"+col.as+'\':r[\''+col.as+'\'],'; }
					} else if (col.aggregatorid === 'AVG') {
						query.removeKeys.push('_SUM_' + colas);
						query.removeKeys.push('_COUNT_' + colas);

						return (
							'' +
							"'" +
							colas +
							"':" +
							colexp +
							",'_SUM_" +
							colas +
							"':(" +
							colexp +
							")||0,'_COUNT_" +
							colas +
							"':(typeof " +
							colexp +
							' != "undefined")?1:0,'
						);
					} else if (col.aggregatorid === 'AGGR') {
						aft += ",g['" + colas + "']=" + col.expression.toJS('g', -1);
						return '';
					} else if (col.aggregatorid === 'REDUCE') {
						//					query.removeKeys.push('_REDUCE_'+colas);
						query.aggrKeys.push(col);

						//					return "'"+colas+'\':alasql.aggr[\''+col.funcid+'\']('+colexp+',undefined,(acc={}),1),'
						//					+'\'__REDUCE__'+colas+'\':acc,';
						return "'" + colas + "':alasql.aggr['" + col.funcid + "'](" + colexp + ',undefined,1),';
					}
					return '';
				}

				return '';
			})
			.join('');

		/*/*
		// columnid:r.columnid
	//	var srg = [];//rg.map(function(fn){ return (fn+':'+fn); });

	//	var srg = this.group.map(function(col){
	//		if(col == '') return '';
	//		else return col.columnid+':'+col.toJS('r','');
	//	});

	// Initializw aggregators

	/*
		this.columns.forEach(function(col){
	//		console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';


			if (col instanceof yy.AggrValue) {
				if (col.aggregatorid == 'SUM') { srg.push("'"+col.as+'\':0'); }//f.field.arguments[0].toJS();
				else if(col.aggregatorid == 'COUNT') {srg.push( "'"+col.as+'\':0'); }
				else if(col.aggregatorid == 'MIN') { srg.push( "'"+col.as+'\':Infinity'); }
				else if(col.aggregatorid == 'MAX') { srg.push( "'"+col.as+'\':-Infinity'); }
	//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJS('rec','')+';'; //f.field.arguments[0].toJS();
			};

		});



	/***************** /

	//	s += srg.join(',');

		// var ss = [];
		// gff.forEach(function(fn){
		// 	ss.push(fn+':rec.'+fn);
		// });
		// s += ss.join(',');
	//	s += '});};';
*/
		s += '}' + aft + ',g));' + aft2 + '} else {';

		//	console.log(s, this.columns);

		/*
	// var neggroup = arrayDiff(allgroups,agroup);

	// console.log(agroup,neggroup);

	// s += neggroup.map(function(columnid){
	// 	return "g['"+columnid+"']=null;";
	// }).join('');
*/
		// console.log(s);

		//console.log(query.selectfn);
		//		s += self.columns.map(function(col){
		s += query.selectGroup
			.map(function (col) {
				var colas = col.nick;
				/*/*
			// if(typeof colas == 'undefined') {
			// 	if(col instanceof yy.Column) colas = col.columnid;
			// 	else colas = col.toString();
			// }
*/
				var colexp = col.expression.toJS('p', tableid, defcols);

				if (col instanceof yy.AggrValue) {
					var pre = '',
						post = '';
					if (col.distinct) {
						var pre =
							'if(typeof ' +
							colexp +
							'!="undefined" && (!g[\'$$_VALUES_' +
							colas +
							"'][" +
							colexp +
							'])) \
				 		 {';
						var post = "g['$$_VALUES_" + colas + "'][" + colexp + ']=true;}';
					}
					if (col.aggregatorid === 'SUM') {
						return pre + "g['" + colas + "']+=(" + colexp + '||0);' + post; //f.field.arguments[0].toJS();
					} else if (col.aggregatorid === 'COUNT') {
						//					console.log(221,col.expression.columnid == '*');
						if (col.expression.columnid === '*') {
							return pre + "g['" + colas + "']++;" + post;
						} else {
							return pre + 'if(typeof ' + colexp + '!="undefined") g[\'' + colas + "']++;" + post;
						}
					} else if (col.aggregatorid === 'ARRAY') {
						return pre + "g['" + colas + "'].push(" + colexp + ');' + post;
					} else if (col.aggregatorid === 'MIN') {
						return (
							pre + 'if ((y=' + colexp + ") < g['" + colas + "']) g['" + colas + "'] = y;" + post
						);
					} else if (col.aggregatorid === 'MAX') {
						return (
							pre + 'if ((y=' + colexp + ") > g['" + colas + "']) g['" + colas + "'] = y;" + post
						);
					} else if (col.aggregatorid === 'FIRST') {
						return '';
					} else if (col.aggregatorid === 'LAST') {
						return pre + "g['" + colas + "']=" + colexp + ';' + post;
					} else if (col.aggregatorid === 'AVG') {
						return (
							'' +
							pre +
							"g['_SUM_" +
							colas +
							"']+=(y=" +
							colexp +
							')||0;' +
							"g['_COUNT_" +
							colas +
							'\']+=(typeof y!="undefined")?1:0;' +
							"g['" +
							colas +
							"']=g['_SUM_" +
							colas +
							"']/g['_COUNT_" +
							colas +
							"'];" +
							post
						);
						//					 }
						//			else if(col.aggregatorid == 'AVG') { srg.push(colas+':0'); }
					} else if (col.aggregatorid === 'AGGR') {
						return '' + pre + "g['" + colas + "']=" + col.expression.toJS('g', -1) + ';' + post;
					} else if (col.aggregatorid === 'REDUCE') {
						return (
							'' +
							pre +
							"g['" +
							colas +
							"']=alasql.aggr." +
							col.funcid +
							'(' +
							colexp +
							",g['" +
							colas +
							"'],2);" +
							post
						);
					}

					return '';
				}

				return '';
			})
			.join('');

		//		s += selectFields.map(function(f){
		//			console.log(f);
		//			if(f.constructor.name == 'LiteralValue') return '';
		//			if (f.field instanceof SQLParser.nodes.FunctionValue
		//				&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
		//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJS('rec','')+';'; //f.field.arguments[0].toJS();
		//				return 'group.'+f.name.value+'+='+f.field.arguments[0].toJS('rec','')+';'; //f.field.arguments[0].toJS();
		//				return 'group.'+f.name.value+'+=rec.'+f.name.value+';'; //f.field.arguments[0].toJS();
		//			};
		//			return '';
		//		}).join('');

		//		s += '	group.amt += rec.emplid;';
		//		s += 'group.count++;';
		s += '}';
	});

	//		console.log('groupfn',s);
	return new Function('p,params,alasql', 'var y;' + s);
};
