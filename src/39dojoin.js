//
// Join all lines over sources
//

function doJoin(query, scope, h) {
	// Check, if this is a last join?
	if (h >= query.sources.length) {
		// Todo: check if this runs once too many
		// Then apply where and select
		if (query.wherefn(scope, query.params, alasql)) {
			// If there is a GROUP BY then pipe to grouping function
			if (query.groupfn) {
				query.groupfn(scope, query.params, alasql);
			} else {
				query.data.push(query.selectfn(scope, query.params, alasql));
			}
		}
	} else if (query.sources[h].applyselect) {
		var source = query.sources[h];
		source.applyselect(
			query.params,
			function (data) {
				if (data.length > 0) {
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
	} else {
		// STEP 1

		let source = query.sources[h];
		let nextsource = query.sources[h + 1];

		let tableid = source.alias || source.tableid;
		let pass = false; // For LEFT JOIN
		let data = source.data;
		let opt = false;

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
			}
		}

		// Main cycle
		let i = 0;
		if (typeof data == 'undefined') {
			throw new Error('Data source number ' + h + ' in undefined');
		}
		let ilen = data.length;
		let dataw;
		//			console.log(h,opt,source.data,i,source.dontcache);
		while ((dataw = data[i]) || (!opt && source.getfn && (dataw = source.getfn(i))) || i < ilen) {
			if (!opt && source.getfn && !source.dontcache) data[i] = dataw;
			scope[tableid] = dataw;

			// Reduce with ON and USING clause
			var usingPassed = !source.onleftfn;
			if (!usingPassed) {
				var left = source.onleftfn(scope, query.params, alasql);
				var right = source.onrightfn(scope, query.params, alasql);
				if (left instanceof String || left instanceof Number) left = left.valueOf();
				if (right instanceof String || right instanceof Number) right = left.valueOf();
				usingPassed = left == right;
			}

			if (usingPassed) {
				// For all non-standard JOINs like a-b=0
				if (source.onmiddlefn(scope, query.params, alasql)) {
					// Recursively call new join
					if (source.joinmode != 'SEMI' && source.joinmode != 'ANTI') {
						doJoin(query, scope, h + 1);
					}
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

		// STEP 2

		if (h == 0) {
			for (var nh = h + 1; nh < query.sources.length; nh++) {
				if (
					nextsource.joinmode == 'OUTER' ||
					nextsource.joinmode == 'RIGHT' ||
					nextsource.joinmode == 'ANTI'
				) {
					scope[source.alias] = {};

					let j = 0;
					let jlen = nextsource.data.length;
					let dataw;

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
	}
}

function swapSources(query, h) {
	var source = query.sources[h];
	var nextsource = query.sources[h + 1];

	let onleftfn = source.onleftfn;
	let onleftfns = source.onleftfns;
	let onrightfn = source.onrightfn;
	let onrightfns = source.onrightfns;
	let optimization = source.optimization;

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
