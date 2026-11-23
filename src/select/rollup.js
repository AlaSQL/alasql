import {escapeq} from '../utils/helpers.js';

export default function install(alasql, internal) {
	var yy = alasql.yy;
	/*
//
// ROLLUP(), CUBE(), GROUPING SETS() for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

	// The key of a grouped expression in the group object is its text. The expression is kept
	// with the key, so that a SELECT item is matched to it by what it is, not by how it is written
	function expressionKey(node, query) {
		const key = escapeq(node.toString());
		query.groupColumns[key] = key;
		rememberKey(key, node, query);
		return key;
	}

	function rememberKey(key, node, query) {
		if (!query.groupKeys.some(gk => gk.key === key)) query.groupKeys.push({key, node});
	}

	/**
 Calculate ROLLUP() combination
 */

	const rollup = (a, query) => {
		const rr = [];
		let mask = 0;
		const glen = a.length;

		for (let g = 0; g < glen + 1; g++) {
			const ss = [];
			for (let i = 0; i < glen; i++) {
				let aaa;
				if (a[i] instanceof yy.Column) {
					a[i].nick = escapeq(a[i].columnid);
					query.groupColumns[escapeq(a[i].columnid)] = a[i].nick;
					aaa = `${a[i].nick}\t${a[i].toJS('p', query.sources[0].alias, query.columnScope)}`;
				} else {
					aaa = `${expressionKey(a[i], query)}\t${a[i].toJS('p', query.sources[0].alias, query.columnScope)}`;
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
	const cube = (a, query) => {
		const rr = [];
		const glen = a.length;
		const glenCube = 1 << glen;

		for (let g = 0; g < glenCube; g++) {
			let ss = [];
			for (let i = 0; i < glen; i++) {
				if (g & (1 << i)) {
					ss = ss.concat(decartes(a[i], query));
				}
			}
			rr.push(ss);
		}
		return rr;
	};

	/**
	 * GROUPING SETS()
	 */
	const groupingsets = (a, query) =>
		a.reduce((acc, d) => {
			// A nested CUBE, ROLLUP or GROUPING SETS adds all of its sets
			acc = acc.concat(decartes(d instanceof yy.GroupExpression ? [d] : d, query));
			return acc;
		}, []);

	/**
	 * Cartesian production
	 */
	const cartes = (a1, a2) => {
		const rrr = [];
		for (let i1 = 0; i1 < a1.length; i1++) {
			for (let i2 = 0; i2 < a2.length; i2++) {
				rrr.push(a1[i1].concat(a2[i2]));
			}
		}
		return rrr;
	};

	/**
 Prepare groups function
 */ function decartes(gv, query) {
		if (Array.isArray(gv)) {
			let res = [[]];
			for (let t = 0; t < gv.length; t++) {
				if (gv[t] instanceof yy.Column) {
					gv[t].nick = gv[t].nick ? escapeq(gv[t].nick) : escapeq(gv[t].columnid);
					query.groupColumns[gv[t].nick] = gv[t].nick;
					res = res.map(r =>
						r.concat(`${gv[t].nick}\t${gv[t].toJS('p', query.sources[0].alias, query.columnScope)}`)
					);
				} else if (gv[t] instanceof yy.FuncValue) {
					const key = expressionKey(gv[t], query);
					res = res.map(r =>
						r.concat(`${key}\t${gv[t].toJS('p', query.sources[0].alias, query.columnScope)}`)
					);
				} else if (gv[t] instanceof yy.GroupExpression) {
					if (gv[t].type == 'ROLLUP') res = cartes(res, rollup(gv[t].group, query));
					else if (gv[t].type == 'CUBE') res = cartes(res, cube(gv[t].group, query));
					else if (gv[t].type == 'GROUPING SETS')
						res = cartes(res, groupingsets(gv[t].group, query));
					else throw new Error('Unknown grouping function');
				} else if (gv[t] === '') {
					res = [['1\t1']];
				} else {
					const key = expressionKey(gv[t], query);
					res = res.map(r =>
						r.concat(`${key}\t${gv[t].toJS('p', query.sources[0].alias, query.columnScope)}`)
					);
				}
			}
			return res;
		}

		if (gv instanceof yy.Column) {
			gv.nick = escapeq(gv.columnid);
			query.groupColumns[gv.nick] = gv.nick;
			return [`${gv.nick}\t${gv.toJS('p', query.sources[0].alias, query.columnScope)}`];
		}

		return [
			`${expressionKey(gv, query)}\t${gv.toJS('p', query.sources[0].alias, query.columnScope)}`,
		];
	}

	internal.decartes = decartes;
}
