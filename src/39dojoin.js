//
// Join all lines over sources
//

function doJoin(query, scope, h) {
	//	console.log('doJoin', arguments);
	//	console.log(query.sources.length);
	// Check, if this is a last join?
	if (h >= query.sources.length) {
		// Todo: check if this runs once too many
		//console.log(query.wherefns);
		// Then apply where and select
		//		console.log(query);
		if (query.wherefn(scope, query.params, alasql)) {
			//			console.log("scope",scope.schools);

			//			var res = query.selectfn(scope, query.params, alasql);
			//			console.log("last",res);
			// If there is a GROUP BY then pipe to groupping function
			if (query.groupfn) {
				query.groupfn(scope, query.params, alasql);
			} else {
				//				query.qwerty = 999;
				//console.log(query.qwerty, query.queriesfn && query.queriesfn.length,2);
				query.data.push(query.selectfn(scope, query.params, alasql));
			}
		}
	} else if (query.sources[h].applyselect) {
		//		console.log('APPLY',scope);
		//			console.log('scope1',scope);
		//				console.log(scope);
		var source = query.sources[h];
		source.applyselect(
			query.params,
			function (data) {
				if (data.length > 0) {
					//			console.log('APPLY CB');
					for (var i = 0; i < data.length; i++) {
						scope[source.alias] = data[i];
						doJoin(query, scope, h + 1);
					}
				} else {
					if (source.applymode == 'OUTER') {
						scope[source.alias] = {};
						doJoin(query, scope, h + 1);
					}
				}
			},
			scope
		);

		//		console.log(data);
	} else {
		// STEP 1

		var source = query.sources[h];
		var nextsource = query.sources[h + 1];

		//		if(source.joinmode == "LEFT" || source.joinmode == "INNER" || source.joinmode == "RIGHT"
		//			|| source.joinmode == "OUTER" || source.joinmode == "SEMI") {
		// Todo: check if this is smart
		if (true) {
			//source.joinmode != "ANTI") {
			/*/*
			// if(nextsource && nextsource.joinmode == "RIGHT") {
			// 	if(!nextsource.rightdata) {
			// 		console.log("ok");
			// 		nextsource.rightdata = new Array(nextsource.data.length);
			// 		console.log(nextsource.data.length, nextsource.rightdata);
			// 	}
			// }
*/
			var tableid = source.alias || source.tableid;
			var pass = false; // For LEFT JOIN
			var data = source.data;
			var opt = false;

			// Reduce data for looping if there is optimization hint
			if (!source.getfn || (source.getfn && !source.dontcache)) {
				if (
					source.joinmode != 'RIGHT' &&
					source.joinmode != 'OUTER' &&
					source.joinmode != 'ANTI' &&
					source.optimization == 'ix'
				) {
					data = source.ix[source.onleftfn(scope, query.params, alasql)] || [];
					opt = true;
					//					console.log(source.onleftfns);
					//					console.log(source.ix);
					//	console.log(source.onleftfn(scope, query.params, alasql));
					//					console.log(opt, data, data.length);
				}
			}

			// Main cycle
			var i = 0;
			if (typeof data == 'undefined') {
				throw new Error('Data source number ' + h + ' in undefined');
			}
			var ilen = data.length;
			var dataw;
			//			console.log(h,opt,source.data,i,source.dontcache);
			while ((dataw = data[i]) || (!opt && source.getfn && (dataw = source.getfn(i))) || i < ilen) {
				if (!opt && source.getfn && !source.dontcache) data[i] = dataw;
				//console.log(h, i, dataw);
				scope[tableid] = dataw;
				// Reduce with ON and USING clause
				if (
					!source.onleftfn ||
					source.onleftfn(scope, query.params, alasql) ==
						source.onrightfn(scope, query.params, alasql)
				) {
					// For all non-standard JOINs like a-b=0
					if (source.onmiddlefn(scope, query.params, alasql)) {
						// Recursively call new join
						//						if(source.joinmode == "LEFT" || source.joinmode == "INNER" || source.joinmode == "OUTER" || source.joinmode == "RIGHT" ) {
						if (source.joinmode != 'SEMI' && source.joinmode != 'ANTI') {
							//							console.log(scope);
							doJoin(query, scope, h + 1);
						}

						// if(source.data[i].f = 200) debugger;

						//						if(source.joinmode == "RIGHT" || source.joinmode == "ANTI" || source.joinmode == "OUTER") {
						if (source.joinmode != 'LEFT' && source.joinmode != 'INNER') {
							dataw._rightjoin = true;
						}

						// for LEFT JOIN
						pass = true;
					}
				}
				i++;
			}

			// Additional join for LEFT JOINS
			if (
				(source.joinmode == 'LEFT' || source.joinmode == 'OUTER' || source.joinmode == 'SEMI') &&
				!pass
			) {
				// Clear the scope after the loop
				scope[tableid] = {};
				doJoin(query, scope, h + 1);
			}
		}

		// When there is no records
		//		if(data.length == 0 && query.groupfn) {
		//			scope[tableid] = undefined;
		//			doJoin(query,scope,h+1);
		//		}

		// STEP 2

		if (h == 0) {
			for (var nh = h + 1; nh < query.sources.length; nh++) {
				if (
					nextsource.joinmode == 'OUTER' ||
					nextsource.joinmode == 'RIGHT' ||
					nextsource.joinmode == 'ANTI'
				) {
					scope[source.alias] = {};

					var j = 0;
					var jlen = nextsource.data.length;
					var dataw;

					while (
						(dataw = nextsource.data[j]) ||
						(nextsource.getfn && (dataw = nextsource.getfn(j))) ||
						j < jlen
					) {
						if (nextsource.getfn && !nextsource.dontcache) {
							nextsource.data[j] = dataw;
						}

						// console.log(169,dataw._rightjoin,scope);
						if (dataw._rightjoin) {
							delete dataw._rightjoin;
						} else {
							//						delete dataw._rightjoin;
							//						console.log(163,h,scope);
							scope[nextsource.alias] = dataw;
							doJoin(query, scope, nh + 1);
						}
						j++;
					}
					//				debugger;
				} else {
					//console.log(180,scope);
				}
				source = query.sources[nh];
				nextsource = query.sources[nh + 1];
			}
		}

		scope[tableid] = undefined;

		/*/*
		if(h+1 < query.sources.length) {
			var nextsource = query.sources[h+1];

			if(nextsource.joinmode == "OUTER" || nextsource.joinmode == "RIGHT"
				|| nextsource.joinmode == "ANTI") {


				// console.log(h,query.sources.length);
				// Swap


//				swapSources(query,h);

//				console.log(query.sources);
				//debugger;
//				var source = query.sources[h];

//				var tableid = source.alias || source.tableid;
//				var data = source.data;

				// Reduce data for looping if there is optimization hint
//				if(source.optimization == 'ix') {
//					data = source.ix[ source.onleftfn(scope, query.params, alasql) ] || [];
//				}

				// Main cycle
				var pass = false;
//				console.log(tableid, data.length);
				for(var i=0, ilen=nextsource.data.length; i<ilen; i++) {
					scope[nextsource.tableid] = nextsource.data[i];
					// Reduce with ON and USING clause
					if(!source.onleftfn || (source.onleftfn(scope, query.params, alasql) == source.onrightfn(scope, query.params, alasql))) {
						// For all non-standard JOINs like a-b=0
						if(source.onmiddlefn(scope, query.params, alasql)) {
							// Recursively call new join
//							if(source.joinmode == "OUTER") {
								doJoin(query, scope, h+2);
//							}
							// for LEFT JOIN
							pass = true;
						}
					};
					if(!pass) {
					// Clear the scope after the loop
//						scope[tableid] = {};
						// console.log(scope);
						doJoin(query,scope,h+2);
					}
				};

				// Additional join for LEFT JOINS
					scope[query.sources[h+1].tableid] = {};
					// console.log(scope);

				scope[tableid] = undefined;

				// SWAP BACK
				swapSources(query,h);

			}
		}

*/
	}
}

function swapSources(query, h) {
	var source = query.sources[h];
	var nextsource = query.sources[h + 1];

	var onleftfn = source.onleftfn;
	var onleftfns = source.onleftfns;
	var onrightfn = source.onrightfn;
	var onrightfns = source.onrightfns;
	var optimization = source.optimization;

	source.onleftfn = nextsource.onrightfn;
	source.onleftfns = nextsource.onrightfns;
	source.onrightfn = nextsource.onleftfn;
	source.onrightfns = nextsource.onleftfns;
	source.optimization = nextsource.optimization;

	nextsource.onleftfn = onleftfn;
	nextsource.onleftfns = onleftfns;
	nextsource.onrightfn = onrightfn;
	nextsource.onrightfns = onrightfns;
	nextsource.optimization = optimization;

	query.sources[h] = nextsource;
	query.sources[h + 1] = source;
}
