/*
//
// CASE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.CaseValue = function (params) {
	return Object.assign(this, params);
};
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

yy.CaseValue.prototype.findAggregator = function (query) {
	//	console.log(this.toString());
	if (this.expression && this.expression.findAggregator) this.expression.findAggregator(query);
	if (this.whens && this.whens.length > 0) {
		this.whens.forEach(function (w) {
			if (w.when.findAggregator) w.when.findAggregator(query);
			if (w.then.findAggregator) w.then.findAggregator(query);
		});
	}
	if (this.elses && this.elses.findAggregator) this.elses.findAggregator(query);
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
