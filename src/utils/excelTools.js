export default mem => {
	const utils = mem.alasql.utils;
	utils.getXLSX = () => {
		var XLSX = null;
		/* If require() shuold be supported else take from global scope */
		if (utils.isNode || utils.isBrowserify || utils.isMeteorServer) {
			//*not-for-browser/*
			XLSX = require('xlsx') || null;
			//*/
		} else {
			XLSX = utils.global.XLSX || null;
		}

		if (null === XLSX) {
			throw new Error('Please include the xlsx.js library');
		}

		return XLSX;
	};

	/**
    Excel:convert number to Excel column, like 1 => 'A'
    @param {integer} i Column number, starting with 0
    @return {string} Column name, starting with 'A'
*/

	utils.xlsnc = i => {
		var addr = String.fromCharCode(65 + (i % 26));
		if (i >= 26) {
			i = ((i / 26) | 0) - 1;
			addr = String.fromCharCode(65 + (i % 26)) + addr;
			if (i > 26) {
				i = ((i / 26) | 0) - 1;
				addr = String.fromCharCode(65 + (i % 26)) + addr;
			}
		}
		return addr;
	};

	/**
    Excel:conver Excel column name to number
    @param {string} s Column number, like 'A' or 'BE'
    @return {string} Column name, starting with 0
*/
	utils.xlscn = s => {
		var n = s.charCodeAt(0) - 65;
		if (s.length > 1) {
			n = (n + 1) * 26 + s.charCodeAt(1) - 65;
			//        console.log(n, s.charCodeAt(0)-65, s.charCodeAt(1)-65);
			if (s.length > 2) {
				n = (n + 1) * 26 + s.charCodeAt(2) - 65;
			}
		}
		return n;
	};
};
