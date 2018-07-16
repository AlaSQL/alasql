const utils = {};
/**
    Cut BOM first character for UTF-8 files (for merging two files)
    @param {string} s Source string
    @return {string} Replaced string
*/
utils.cutbom = s => {
    if (s[0] === String.fromCharCode(65279)) {
        s = s.substr(1);
    }
    return s;
};
// based on joliss/js-string-escape
utils.escapeq = s => {
    //    console.log(s);
    return ('' + s).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
        // Escape all characters not included in SingleStringCharacters and
        // DoubleStringCharacters on
        // http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
        switch (character) {
            case '"':
            case "'":
            case '\\':
                return '\\' + character;
            // Four possible LineTerminator characters need to be escaped:
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\u2028':
                return '\\u2028';
            case '\u2029':
                return '\\u2029';
            default:
        }
    });
};
/**
    Double quotes for SQL statements
    @param {string} s Source string
    @return {string} Escaped string

    @example

    Piter's => Piter''s

 */
utils.undoubleq = s => {
    return s.replace(/(\')/g, "''");
};
/**
    Replace double quotes with single quote
    @param {string} s Source string
    @return {string} Replaced string
    @example

    Piter''s => Piter's

 */
utils.doubleq = s => {
    return s.replace(/(\'\')/g, "\\'");
};
/**
    Replace sigle quote to escaped single quote
    @param {string} s Source string
    @return {string} Replaced string

    @todo Chack this functions

*/
utils.doubleqq = s => {
    return s.replace(/\'/g, "'");
};
/**
@function Hash a string to signed integer
@param {string} source string
@return {integer} hash number
*/
// FNV-1a inspired hashing
utils.hash = str => {
    var hash = 0x811c9dc5, i = str.length;
    while (i) {
        hash ^= str.charCodeAt(--i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash;
};
utils.glob = (value, pattern) => {
    var i = 0;
    var s = '^';
    while (i < pattern.length) {
        var c = pattern[i], c1 = '';
        if (i < pattern.length - 1)
            c1 = pattern[i + 1];
        if (c === '[' && c1 === '^') {
            s += '[^';
            i++;
        }
        else if (c === '[' || c === ']') {
            s += c;
        }
        else if (c === '*') {
            s += '.*';
        }
        else if (c === '?') {
            s += '.';
        }
        else if ('/.*+?|(){}'.indexOf(c) > -1) {
            s += '\\' + c;
        }
        else {
            s += c;
        }
        i++;
    }
    s += '$';
    return ('' + (value || '')).toUpperCase().search(RegExp(s.toUpperCase())) > -1;
};
/**
    Modify res according modifier
    @function
    @param {object} query Query object
    @param res {object|number|string|boolean} res Data to be converted
*/
utils.modify = (query, res, alasql) => {
    // jshint ignore:line
    //	console.log(arguments);
    /* If source is a primitive value then return it */
    if (typeof res === 'undefined' ||
        typeof res === 'number' ||
        typeof res === 'string' ||
        typeof res === 'boolean') {
        return res;
    }
    var modifier = query.modifier || alasql.options.modifier;
    var columns = query.columns;
    if (typeof columns === 'undefined' || columns.length === 0) {
        // Try to create columns
        if (res.length > 0) {
            var allcol = {};
            for (var i = Math.min(res.length, alasql.options.columnlookup || 10) - 1; 0 <= i; i--) {
                for (let key in res[i]) {
                    allcol[key] = true;
                }
            }
            columns = Object.keys(allcol).map(function (columnid) {
                return { columnid: columnid };
            });
        }
        else {
            // Cannot recognize columns
            columns = [];
        }
    }
    //	console.log(columns);
    let key;
    if (modifier === 'VALUE') {
        //		console.log(222,res);
        if (res.length > 0) {
            if (columns && columns.length > 0) {
                key = columns[0].columnid;
            }
            else {
                key = Object.keys(res[0])[0];
            }
            res = res[0][key];
        }
        else {
            res = undefined;
        }
    }
    else if (modifier === 'ROW') {
        if (res.length > 0) {
            var a = [];
            for (var val of res[0]) {
                a.push(val);
            }
            res = a;
        }
        else {
            res = undefined;
        }
    }
    else if (modifier === 'COLUMN') {
        var ar = [];
        if (res.length > 0) {
            if (columns && columns.length > 0) {
                key = columns[0].columnid;
            }
            else {
                key = Object.keys(res[0])[0];
            }
            for (var i = 0, ilen = res.length; i < ilen; i++) {
                ar.push(res[i][key]);
            }
        }
        res = ar;
    }
    else if (modifier === 'MATRIX') {
        // Returns square matrix of rows
        var ar = [];
        for (var i = 0; i < res.length; i++) {
            var a = [];
            var r = res[i];
            for (var j = 0; j < columns.length; j++) {
                a.push(r[columns[j].columnid]);
            }
            ar.push(a);
        }
        res = ar;
    }
    else if (modifier === 'INDEX') {
        let ar = {};
        let val;
        if (columns && columns.length > 0) {
            key = columns[0].columnid;
            val = columns[1].columnid;
        }
        else {
            var okeys = Object.keys(res[0]);
            key = okeys[0];
            val = okeys[1];
        }
        for (var i = 0, ilen = res.length; i < ilen; i++) {
            ar[res[i][key]] = res[i][val];
        }
        res = ar;
        //		res = arrayOfArrays(res);
    }
    else if (modifier === 'RECORDSET') {
        res = new alasql.Recordset({ columns: columns, data: res });
        //		res = arrayOfArrays(res);
    }
    else if (modifier === 'TEXTSTRING') {
        if (columns && columns.length > 0) {
            key = columns[0].columnid;
        }
        else {
            key = Object.keys(res[0])[0];
        }
        for (var i = 0, ilen = res.length; i < ilen; i++) {
            res[i] = res[i][key];
        }
        res = res.join('\n');
        //		res = arrayOfArrays(res);
    }
    return res;
};
export default utils;
