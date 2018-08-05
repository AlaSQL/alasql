import {Recordset} from '../dataStruct/query';

	const utils = {};

	/**
      * Union arrays
      * @function
      * @param {array} a
      * @param {array} b
      * @return {array}
	  */
	utils.arrayUnion = (a, b) => {
		var r = b.slice(0);
		a.forEach(function(i) {
			if (r.indexOf(i) < 0) {
				r.push(i);
			}
		});
		return r;
	};

	/**
	  * Array Difference
 	  */
	utils.arrayDiff = (a, b) => {
		return a.filter(function(i) {
			return b.indexOf(i) < 0;
		});
	};

	/**	
	  * Arrays deep intersect (with records)
	  */
	utils.arrayIntersect = (a, b) => {
		var r = [];
		a.forEach(function(ai) {
			var found = false;

			b.forEach(function(bi) {
				found = found || ai === bi;
			});

			if (found) {
				r.push(ai);
			}
		});
		return r;
	};

	/**
  Arrays deep union (with records)
 */
	utils.arrayUnionDeep = (a, b) => {
		var r = b.slice(0);
		a.forEach(function(ai) {
			var found = false;

			r.forEach(function(ri) {
				//            found = found || equalDeep(ai, ri, true);
				found = found || utils.deepEqual(ai, ri);
			});

			if (!found) {
				r.push(ai);
			}
		});
		return r;
	};

	/**
  Arrays deep union (with records)
 */
	utils.arrayExceptDeep = (a, b) => {
		var r = [];
		a.forEach(ai => {
			var found = false;

			b.forEach(function(bi) {
				//            found = found || equalDeep(ai, bi, true);
				found = found || utils.deepEqual(ai, bi);
			});

			if (!found) {
				r.push(ai);
			}
		});
		return r;
	};

	/**
  Arrays deep intersect (with records)
 */
	utils.arrayIntersectDeep = (a, b) => {
		var r = [];
		a.forEach(function(ai) {
			var found = false;

			b.forEach(function(bi) {
				//            found = found || equalDeep(ai, bi, true);
				found = found || utils.deepEqual(ai, bi, true);
			});

			if (found) {
				r.push(ai);
			}
		});
		return r;
	};

	/**
  Deep clone objects
 */
	utils.cloneDeep = obj => {
		if (null === obj || typeof obj !== 'object') {
			return obj;
		}

		if (obj instanceof Date) {
			return new Date(obj);
		}

		var temp = obj.constructor(); // changed

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				temp[key] = utils.cloneDeep(obj[key]);
			}
		}
		return temp;
	};

	/**
  Check equality of objects
*/

	/*/*
var equalDeep = utils.equalDeep = function equalDeep (x, y, deep) {
    if (deep) {
        if (x === y){
            return true;
        }

        var p;
        for (p in y) {
            if (typeof (x[p]) === 'undefined') { return false; }
        }

        for (p in y) {
            if (y[p]) {
                switch (typeof (y[p])) {
                    case 'object':
                        if (!equalDeep(y[p],x[p])) { return false; } break;
                    case 'function':
                        if (
                                typeof (x[p]) === 'undefined' ||
                                (p !== 'equals' && y[p].toString() !== x[p].toString())
                            ){
                                return false;
                            }
                        break;
                    default:
                        if (y[p] !== x[p]) { return false; }
                }
            } else {
                if (x[p]){
                    return false;
                }
            }
        }

        for (p in x) {
            if (typeof (y[p]) === 'undefined') { return false; }
        }

        return true;
    }
    return x === y;
};
*/

	/**
  Compare two objects in deep
 */
	utils.deepEqual = (x, y) => {
		if (x === y) {
			return true;
		}

		if (typeof x === 'object' && null !== x && (typeof y === 'object' && null !== y)) {
			if (Object.keys(x).length !== Object.keys(y).length) {
				return false;
			}
			for (var prop in x) {
				if (!utils.deepEqual(x[prop], y[prop])) {
					return false;
				}
			}
			return true;
		}

		return false;
	};

	/**
    Array with distinct records
    @param {array} data
    @return {array}
*/
	utils.distinctArray = data => {
		var uniq = {};
		// TODO: Speedup, because Object.keys is slow
		for (var i = 0, ilen = data.length; i < ilen; i++) {
			var uix;
			if (typeof data[i] === 'object') {
				uix = Object.keys(data[i])
					.sort()
					.map(k => {
						return k + '`' + data[i][k];
					})
					.join('`');
			} else {
				uix = data[i];
			}
			uniq[uix] = data[i];
		}
		var res = [];
		for (let ind in uniq) {
			res.push(uniq[ind]);
		}
		return res;
	};

	/**
   Flat array by first row
 */
	utils.flatArray = a => {
		//console.log(684,a);
		if (!a || 0 === a.length) {
			return [];
		}

		// For recordsets
		if (typeof a === 'object' && a instanceof Recordset) {
			return a.data.map(function(ai) {
				return ai[a.columns[0].columnid];
			});
		}
		// Else for other arrays
		var key = Object.keys(a[0])[0];
		if (key === undefined) {
			return [];
		}
		return a.map(function(ai) {
			return ai[key];
		});
	};

	/**
  Convert array of objects to array of arrays
 */
	utils.arrayOfArrays = a => {
		return a.map(aa => {
			var ar = [];
			for (const val of aa) {
				ar.push(val);
			}
			return ar;
		});
	};

	export default utils;