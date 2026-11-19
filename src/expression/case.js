import {Node} from './node.js';

export default function install(alasql) {
	var yy = alasql.yy;
	/*
//
// CASE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

	yy.CaseValue = class CaseValue extends Node {};
	yy.CaseValue.children = ['expression', 'whens', 'elses'];
	yy.CaseValue.prototype.toString = function () {
		var s = 'CASE ';
		if (this.expression) s += this.expression.toString();
		if (this.whens) {
			s += this.whens
				.map(function (w) {
					return ' WHEN ' + w.when.toString() + ' THEN ' + w.then.toString();
				})
				.join();
		}
		s += ' END';
		return s;
	};

	yy.CaseValue.prototype.toJS = function (context, tableid, defcols) {
		let s = `(((${context}, params, alasql) => {
        let y, r;`;

		if (this.expression) {
			// If there's an expression, evaluate it and store in `v`, then compare in `when` clauses
			s += `let v = ${this.expression.toJS(context, tableid, defcols)};`;
			this.whens.forEach((w, index) => {
				const condition = `v === ${w.when.toJS(context, tableid, defcols)}`;
				const assignment = `r = ${w.then.toJS(context, tableid, defcols)}`;
				s += `${index === 0 ? 'if' : ' else if'} (${condition}) { ${assignment}; }`;
			});
		} else {
			// Directly evaluate `when` conditions without an initial expression
			this.whens.forEach((w, index) => {
				const condition = w.when.toJS(context, tableid, defcols);
				const assignment = `r = ${w.then.toJS(context, tableid, defcols)}`;
				s += `${index === 0 ? 'if' : ' else if'} (${condition}) { ${assignment}; }`;
			});
		}

		// Handle the `else` case
		if (this.elses) {
			s += ` else { r = ${this.elses.toJS(context, tableid, defcols)}; }`;
		}

		s += '; return r; }))(' + context + ', params, alasql)';

		return s;
	};
}
