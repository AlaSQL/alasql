/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/


// Compile group of statements
yy.Select.prototype.compileGroup = function(query) {
	var self = this;

	var allgroup = decartes(this.group);

//	console.log(allgroup);
	// Prepare groups
	//var allgroup = [['a'], ['a','b'], ['a', 'b', 'c']];

	// Union all arrays to get a maximum
	var allgroups = [];
	allgroup.forEach(function(a){
		allgroups = arrayUnion(allgroups, a);
	});

	query.allgroups = allgroups;

//console.log(42,294, this.group);
//console.log(allgroups);
//		console.log(42,364,query.selectColumns)
	allgroups.forEach(function(colid){
//		console.log(42,365,colid, query.selectColumns[colid])
		if(query.selectColumns[colid]) {
//			console.log(colid,'ok');
		} else {
//			if(colid.indexOf())
//			console.log(colid,'bad');	
			var tmpid = 'default';
			if(query.sources.length > 0) tmpid = query.sources[0].alias;
//			console.log(new yy.Column({columnid:colid}).toJavaScript('p',query.sources[0].alias));
//			query.selectfns += 'r[\''+colid+'\']=p[\''+tmpid+'\'][\''+colid+'\'];';
//console.log(374, colid);
			if(Object.keys(query.selectColumns).length != 0) query.removeKeys.push(colid);
			query.selectfns += 'r[\''+escapeq(colid)+'\']='+(new yy.Column({columnid:colid}).toJavaScript('p',tmpid))+';';
		}
	});

	// Create negative array

	var s = '';

	allgroup.forEach(function(agroup) {
//console.log(agroup);

		// Start of group function
		s += 'var g=this.xgroups[';

	//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r
		// Array with group columns from record
		var rg = agroup.map(function(columnid){
			// Check, if aggregator exists but GROUP BY is not exists
			if(columnid == '') return '1'; // Create fictive groupping column for fictive GROUP BY
//			else return "r['"+columnid+"']";
			else return "p['default']['"+columnid+"']";
		});

		if(rg.length == 0) rg = ["''"];

	//	console.log('rg',rg);

		s += rg.join('+"`"+');
		s += '];if(!g) {this.groups.push((g=this.xgroups[';
		s += rg.join('+"`"+');
		s += '] = {';
	//	s += ']=r';

		s += agroup.map(function(columnid){
			if(columnid == '') return '';
			else return "'"+columnid+"':p['default']['"+columnid+"'],";
		}).join('');

		var neggroup = arrayDiff(allgroups,agroup);

		s += neggroup.map(function(columnid){			
			return "'"+columnid+"':null,";
		}).join('');

		var aft = '';
		s += self.columns.map(function(col){
			if (col instanceof yy.AggrValue) { 
				if (col.aggregatorid == 'SUM'
					|| col.aggregatorid == 'MIN'
					|| col.aggregatorid == 'MAX'
					|| col.aggregatorid == 'FIRST'
					|| col.aggregatorid == 'LAST'
//					|| col.aggregatorid == 'AVG'
//				) { return '\''+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJavaScript(); 	
				) { return '\''+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJavaScript(); 	
				else if(col.aggregatorid == 'ARRAY') {
				 	return '\''+col.as+'\':[r[\''+col.as+'\']],';
				} else if(col.aggregatorid == 'COUNT') { return '\''+col.as+'\':1,'; }
//				else if(col.aggregatorid == 'MIN') { return '\''+col.as+'\':r[\''+col.as+'\'],'; }
//				else if(col.aggregatorid == 'MAX') { return '\''+col.as+'\':r[\''+col.as+'\'],'; }
				else if(col.aggregatorid == 'AVG') { 
					query.removeKeys.push('_SUM_'+col.as);
					query.removeKeys.push('_COUNT_'+col.as);
					return '\''+col.as+'\':r[\''+col.as+'\'],\'_SUM_'+col.as+'\':r[\''+col.as+'\'],\'_COUNT_'+col.as+'\':1,'; 
				} else if(col.aggregatorid == 'AGGR') {
					aft += ',g[\''+col.as+'\']='+col.expression.toJavaScript('g',-1); 
					return '';
				} else if(col.aggregatorid == 'REDUCE') {
					return '\''+col.as+'\':alasql.aggr[\''+col.funcid+'\'](r[\''+col.as+'\']),'; 
				}
				return '';
			} else return '';
		}).join('');





		// columnid:r.columnid
	//	var srg = [];//rg.map(function(fn){ return (fn+':'+fn); });

	//	var srg = this.group.map(function(col){
	//		if(col == '') return '';
	//		else return col.columnid+':'+col.toJavaScript('r','');
	//	});

	// Initializw aggregators

	/*
		this.columns.forEach(function(col){
	//		console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';


			if (col instanceof yy.AggrValue) { 
				if (col.aggregatorid == 'SUM') { srg.push("'"+col.as+'\':0'); }//f.field.arguments[0].toJavaScript(); 	
				else if(col.aggregatorid == 'COUNT') {srg.push( "'"+col.as+'\':0'); }
				else if(col.aggregatorid == 'MIN') { srg.push( "'"+col.as+'\':Infinity'); }
				else if(col.aggregatorid == 'MAX') { srg.push( "'"+col.as+'\':-Infinity'); }
	//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
			};

		});

	*/

	/*****************/

	//	s += srg.join(',');

		// var ss = [];
		// gff.forEach(function(fn){
		// 	ss.push(fn+':rec.'+fn);
		// });
		// s += ss.join(',');
	//	s += '});};';

		s += '}'+aft+',g));} else {';
	//	console.log(s, this.columns);



	// var neggroup = arrayDiff(allgroups,agroup);

	// console.log(agroup,neggroup);

	// s += neggroup.map(function(columnid){
	// 	return "g['"+columnid+"']=null;";
	// }).join('');

	// console.log(s);


	//console.log(query.selectfn);
		s += self.columns.map(function(col){
			if (col instanceof yy.AggrValue) { 
				if (col.aggregatorid == 'SUM') { return 'g[\''+col.as+'\']+=r[\''+col.as+'\'];'; }//f.field.arguments[0].toJavaScript(); 	
				else if(col.aggregatorid == 'COUNT') { return 'g[\''+col.as+'\']++;'; }
				else if(col.aggregatorid == 'ARRAY') { return 'g[\''+col.as+'\'].push(r[\''+col.as+'\']);'; }
				else if(col.aggregatorid == 'MIN') { return 'g[\''+col.as+'\']=Math.min(g[\''+col.as+'\'],r[\''+col.as+'\']);'; }
				else if(col.aggregatorid == 'MAX') { return 'g[\''+col.as+'\']=Math.max(g[\''+col.as+'\'],r[\''+col.as+'\']);'; }
				else if(col.aggregatorid == 'FIRST') { return ''; }
				else if(col.aggregatorid == 'LAST') { return 'g[\''+col.as+'\']=r[\''+col.as+'\'];'; }
				else if(col.aggregatorid == 'AVG') { 
						return 'g[\'_SUM_'+col.as+'\']+=r[\''+col.as+'\'];'
						+ 'g[\'_COUNT_'+col.as+'\']++;'
						+ 'g[\''+col.as+'\']=g[\'_SUM_'+col.as+'\']/g[\'_COUNT_'+col.as+'\'];'; 
//					 }
	//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
				} else if(col.aggregatorid == 'AGGR') {
					return 'g[\''+col.as+'\']='+col.expression.toJavaScript('g',-1)+';'; 
				} else if(col.aggregatorid == 'REDUCE') {
					return 'g[\''+col.as+'\']=alasql.aggr.'+col.funcid+'(r[\''+col.as+'\'],g[\''+col.as+'\']);'; 
				}
				return '';
			} else return '';
		}).join('');


	//	s += selectFields.map(function(f){
	//			console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';
	//			if (f.field instanceof SQLParser.nodes.FunctionValue 
	//				&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
	//				return 'group.'+f.name.value+'+='+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
	//				return 'group.'+f.name.value+'+=rec.'+f.name.value+';'; //f.field.arguments[0].toJavaScript(); 	
	//			};
	//			return '';
	//		}).join('');

		//s += '	group.amt += rec.emplid;';
		//s += 'group.count++;';

		s += '}';
		console.log('groupfn',s);

	});

//	console.log(s);
	return new Function('p,params,alasql',s);

}
