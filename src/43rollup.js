/*
//
// ROLLUP(), CUBE(), GROUPING SETS() for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
 Calculate ROLLUP() combination
 */

var rollup = function (a, query) {
	var rr = [];
	var mask = 0;
	var glen = a.length;
	for (var g = 0; g < glen + 1; g++) {
		var ss = [];
		for (var i = 0; i < glen; i++) {
			if (a[i] instanceof yy.Column) {
				a[i].nick = escapeq(a[i].columnid);

				query.groupColumns[escapeq(a[i].columnid)] = a[i].nick;
				var aaa = a[i].nick + '\t' + a[i].toJS('p', query.sources[0].alias, query.defcols);
			} else {
				query.groupColumns[escapeq(a[i].toString())] = escapeq(a[i].toString());
				var aaa =
					escapeq(a[i].toString()) + '\t' + a[i].toJS('p', query.sources[0].alias, query.defcols);
			}

			if (mask & (1 << i)) ss.push(aaa);
		}
		rr.push(ss);
		mask = (mask << 1) + 1;
	}
	return rr;
};

/**
 Calculate CUBE()
 */
var cube = function (a, query) {
	var rr = [];
	var glen = a.length;
	var glenCube = 1 << glen;
	for (var g = 0; g < glenCube; g++) {
		var ss = [];
		for (var i = 0; i < glen; i++) {
			if (g & (1 << i))
				//ss.push(a[i]);
				//ss = cartes(ss,decartes(a[i]));

				//				var aaa = a[i].toString()+'\t'
				//					+a[i].toJS('p',query.sources[0].alias,query.defcols);

				ss = ss.concat(decartes(a[i], query));
			//
		}
		rr.push(ss);
	}
	return rr;
};

/**
 GROUPING SETS()
 */
var groupingsets = function (a, query) {
	return a.reduce(function (acc, d) {
		acc = acc.concat(decartes(d, query));
		return acc;
	}, []);
};

/**
 Cartesian production
 */
var cartes = function (a1, a2) {
	var rrr = [];
	for (var i1 = 0; i1 < a1.length; i1++) {
		for (var i2 = 0; i2 < a2.length; i2++) {
			rrr.push(a1[i1].concat(a2[i2]));
		}
	}
	return rrr;
};

/**
 Prepare groups function
 */
function decartes(gv, query) {
	//	console.log(gv);
	if (Array.isArray(gv)) {
		var res = [[]];
		for (var t = 0; t < gv.length; t++) {
			if (gv[t] instanceof yy.Column) {
				//	console.log('+++',gv[t].columnid,gv[t]);
				gv[t].nick = gv[t].nick ? escapeq(gv[t].nick) : escapeq(gv[t].columnid);
				query.groupColumns[gv[t].nick] = gv[t].nick;
				res = res.map(function (r) {
					return r.concat(
						gv[t].nick + '\t' + gv[t].toJS('p', query.sources[0].alias, query.defcols)
					);
				});
				//		 		res = res.map(function(r){return r.concat(gv[t].columnid)});
			} else if (gv[t] instanceof yy.FuncValue) {
				query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
				res = res.map(function (r) {
					return r.concat(
						escapeq(gv[t].toString()) +
							'\t' +
							gv[t].toJS('p', query.sources[0].alias, query.defcols)
					);
				});
				// to be defined
			} else if (gv[t] instanceof yy.GroupExpression) {
				if (gv[t].type == 'ROLLUP') res = cartes(res, rollup(gv[t].group, query));
				else if (gv[t].type == 'CUBE') res = cartes(res, cube(gv[t].group, query));
				else if (gv[t].type == 'GROUPING SETS') res = cartes(res, groupingsets(gv[t].group, query));
				else throw new Error('Unknown grouping function');
			} else if (gv[t] === '') {
				//				console.log('+++');
				res = [['1\t1']];
			} else {
				//				if(gv[t])
				//				console.log('>'+gv[t]+'<',gv[t]=='',typeof gv[t]);
				//				console.log(gv[t].toString());
				//console.log('+++');
				res = res.map(function (r) {
					query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
					return r.concat(
						escapeq(gv[t].toString()) +
							'\t' +
							gv[t].toJS('p', query.sources[0].alias, query.defcols)
					);
				});
				//				res = res.concat(gv[t]);
			}
			/*/*
			// switch(gv[t].t) {
			// 	case 'plain':
			// 		res = res.map(function(r){return r.concat(gv[t].p)});

			// 	break;
			// 	case 'rollup': res = cartes(res,rollup(gv[t].p)); break;
			// 	case 'cube': res = cartes(res,cube(gv[t].p)); break;
			// 	case 'groupingsets': res = cartes(res,groupingsets(gv[t].p)); break;
			// 	default: res = res.concat(gv[t]);
			// }
*/
		}
		return res;
	} else if (gv instanceof yy.FuncValue) {
		//		console.log(gv);
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [gv.toString() + '\t' + gv.toJS('p', query.sources[0].alias, query.defcols)];
	} else if (gv instanceof yy.Column) {
		gv.nick = escapeq(gv.columnid);
		query.groupColumns[gv.nick] = gv.nick;
		return [gv.nick + '\t' + gv.toJS('p', query.sources[0].alias, query.defcols)]; // Is this ever happened?
		// } else if(gv instanceof yy.Expression) {
		// 	return [gv.columnid]; // Is this ever happened?
	} else {
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [escapeq(gv.toString()) + '\t' + gv.toJS('p', query.sources[0].alias, query.defcols)];
		//			throw new Error('Single argument in the group without array');
	}

	/*/*
		// switch(gv.t) {
		// 	case 'plain': return gv.p; break;
		// 	case 'rollup': return rollup(gv.p); break;
		// 	case 'cube': return cube(gv.p); break;
		// 	case 'groupingsets':  return groupingsets(gv.p); break;
		// 	default: return [gv];//return decartes(gv.p);
		// }
		// return gv;
*/
}
