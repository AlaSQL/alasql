/*
//
// JSON for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Json = function (params) {
	return Object.assign(this, params);
};
yy.Json.prototype.toString = function () {
	var s = ''; // '@'
	s += JSONtoString(this.value);
	s += '';
	return s;
};

const JSONtoString = (alasql.utils.JSONtoString = function (obj) {
	if (typeof obj === 'string') return `"${obj}"`;
	if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
	if (typeof obj === 'bigint') return `${obj.toString()}n`;

	if (Array.isArray(obj)) {
		return `[${obj.map(b => JSONtoString(b)).join(',')}]`;
	}

	if (typeof obj === 'object') {
		if (!obj.toJS || obj instanceof yy.Json) {
			const ss = [];
			for (const k in obj) {
				const keyStr = typeof k === 'string' ? `"${k}"` : String(k);
				const valueStr = JSONtoString(obj[k]);
				ss.push(`${keyStr}:${valueStr}`);
			}
			return `{${ss.join(',')}}`;
		} else if (obj.toString) {
			return obj.toString();
		} else {
			throw new Error(`1: Cannot show JSON object ${JSON.stringify(obj)}`);
		}
	} else {
		throw new Error(`2: Cannot show JSON object ${JSON.stringify(obj)}`);
	}
});

function JSONtoJS(obj, context, tableid, defcols) {
	var s = '';
	if (typeof obj == 'string') s = '"' + obj + '"';
	else if (typeof obj == 'number') s = '(' + obj + ')';
	else if (typeof obj == 'boolean') s = obj;
	else if (typeof obj === 'bigint') s = obj.toString() + 'n';
	else if (typeof obj === 'object') {
		if (Array.isArray(obj)) {
			s += `[${obj.map(b => JSONtoJS(b, context, tableid, defcols)).join(',')}]`;
		} else if (!obj.toJS || obj instanceof yy.Json) {
			let ss = [];
			for (const k in obj) {
				let keyStr = typeof k === 'string' ? `"${k}"` : k.toString();
				let valueStr = JSONtoJS(obj[k], context, tableid, defcols);
				ss.push(`${keyStr}:${valueStr}`);
			}
			s = `{${ss.join(',')}}`;
		} else if (obj.toJS) {
			s = obj.toJS(context, tableid, defcols);
		} else {
			throw new Error(`Cannot parse JSON object ${JSON.stringify(obj)}`);
		}
	} else {
		throw new Error('2Can not parse JSON object ' + JSON.stringify(obj));
	}

	return s;
}

yy.Json.prototype.toJS = function (context, tableid, defcols) {
	// TODO redo
	return JSONtoJS(this.value, context, tableid, defcols);
};
