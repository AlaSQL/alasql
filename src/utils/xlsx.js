export default function install(alasql, internal) {
	var utils = alasql.utils;
	/*
	The XLSX loader: the SheetJS library found or handed in.
*/

	var getXLSX = function () {
		var XLSX = alasql.private.externalXlsxLib || utils.global.XLSX || null;

		if (XLSX) {
			return XLSX;
		}

		if (utils.isNode || utils.isBrowserify || utils.isMeteorServer) {
			//*not-for-browser/*
			XLSX = require('../modules/xlsx/xlsx') || null;
			alasql.private.externalXlsxLib = XLSX;
			//*/
		}

		if (!XLSX) {
			throw new Error('Please include the xlsx.js library');
		}

		return XLSX;
	};

	internal.getXLSX = getXLSX;
}
