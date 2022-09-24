/*
//
// JSON for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Json = function (params) {
	return yy.extend(this, params);
};
yy.Json.prototype.toString = function () {
	var s = ''; // '@'
	s += JSONtoString(this.value);
	s += '';
	return s;
};

var JSONtoString = (alasql.utils.JSONtoString = function (obj) {
	var s = '';
	if (typeof obj == 'string') s = '"' + obj + '"';
	else if (typeof obj == 'number') s = obj;
	else if (typeof obj == 'boolean') s = obj;
	else if (typeof obj == 'object') {
		if (Array.isArray(obj)) {
			s +=
				'[' +
				obj
					.map(function (b) {
						return JSONtoString(b);
					})
					.join(',') +
				']';
		} else if (!obj.toJS || obj instanceof yy.Json) {
			// to prevent recursion
			s = '{';
			var ss = [];
			for (var k in obj) {
				var s1 = '';
				if (typeof k == 'string') s1 += '"' + k + '"';
				else if (typeof k == 'number') s1 += k;
				else if (typeof k == 'boolean') s1 += k;
				else {
					throw new Error('THis is not ES6... no expressions on left side yet');
				}
				s1 += ':' + JSONtoString(obj[k]);
				ss.push(s1);
			}
			s += ss.join(',') + '}';
		} else if (obj.toString) {
			s = obj.toString();
		} else {
			throw new Error('1Can not show JSON object ' + JSON.stringify(obj));
		}
	} else {
		throw new Error('2Can not show JSON object ' + JSON.stringify(obj));
	}

	return s;
});

function JSONtoJS(obj, context, tableid, defcols) {
	var s = '';
	if (typeof obj == 'string') s = '"' + obj + '"';
	else if (typeof obj == 'number') s = '(' + obj + ')';
	else if (typeof obj == 'boolean') s = obj;
	else if (typeof obj == 'object') {
		if (Array.isArray(obj)) {
			s +=
				'[' +
				obj
					.map(function (b) {
						return JSONtoJS(b, context, tableid, defcols);
					})
					.join(',') +
				']';
		} else if (!obj.toJS || obj instanceof yy.Json) {
			// to prevent recursion
			s = '{';
			var ss = [];
			for (var k in obj) {
				var s1 = '';
				if (typeof k == 'string') s1 += '"' + k + '"';
				else if (typeof k == 'number') s1 += k;
				else if (typeof k == 'boolean') s1 += k;
				else {
					throw new Error('THis is not ES6... no expressions on left side yet');
				}
				s1 += ':' + JSONtoJS(obj[k], context, tableid, defcols);
				ss.push(s1);
			}
			s += ss.join(',') + '}';
		} else if (obj.toJS) {
			s = obj.toJS(context, tableid, defcols);
		} else {
			throw new Error('1Can not parse JSON object ' + JSON.stringify(obj));
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
