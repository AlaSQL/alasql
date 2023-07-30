//
// 831xl.js - Coloring Excel
// 18.04.2015
// Generate XLS file with colors and styles
// with Excel

alasql.into.XLS = function (filename, opts, data, columns, cb) {
	// If filename is not defined then output to the result
	if (typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}

	// Set sheets
	var sheets = {};
	if (opts && opts.sheets) {
		sheets = opts.sheets;
	}

	// Default sheet
	var sheet = {headers: true};
	if (typeof sheets['Sheet1'] != 'undefined') {
		sheet = sheets[0];
	} else {
		if (typeof opts != 'undefined') {
			sheet = opts;
		}
	}

	// Set sheet name and default is 'Sheet1'
	if (typeof sheet.sheetid == 'undefined') {
		sheet.sheetid = 'Sheet1';
	}

	var s = toHTML();

	// File is ready to save
	filename = alasql.utils.autoExtFilename(filename, 'xls', opts);
	var res = alasql.utils.saveFile(filename, s);
	if (cb) res = cb(res);
	return res;

	function toHTML() {
		// Generate prologue
		var s =
			'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" \
		xmlns="http://www.w3.org/TR/REC-html40"><head> \
		<meta charset="utf-8" /> \
		<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets> ';

		// Worksheets
		s +=
			' <x:ExcelWorksheet><x:Name>' +
			sheet.sheetid +
			'</x:Name><x:WorksheetOptions><x:DisplayGridlines/>     </x:WorksheetOptions> \
		</x:ExcelWorksheet>';

		s += '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';

		// Generate body
		s += '<body';
		if (typeof sheet.style != 'undefined') {
			s += ' style="';
			if (typeof sheet.style == 'function') {
				s += sheet.style(sheet);
			} else {
				s += sheet.style;
			}
			s += '"';
		}
		s += '>';
		s += '<table>';
		if (typeof sheet.caption != 'undefined') {
			var caption = sheet.caption;
			if (typeof caption == 'string') {
				caption = {title: caption};
			}
			s += '<caption';
			if (typeof caption.style != 'undefined') {
				s += ' style="';
				if (typeof caption.style == 'function') {
					s += caption.style(sheet, caption);
				} else {
					s += caption.style;
				}
				s += '" ';
			}
			s += '>';
			s += caption.title;
			s += '</caption>';
		}

		// Columns

		//		var columns = [];

		// If columns defined in sheet, then take them
		if (typeof sheet.columns != 'undefined') {
			columns = sheet.columns;
		} else {
			// Autogenerate columns if they are passed as parameters
			if (columns.length == 0 && data.length > 0) {
				if (typeof data[0] == 'object') {
					if (Array.isArray(data[0])) {
						columns = data[0].map(function (d, columnidx) {
							return {columnid: columnidx};
						});
					} else {
						columns = Object.keys(data[0]).map(function (columnid) {
							return {columnid: columnid};
						});
					}
				}
			}
		}

		// Prepare columns
		columns.forEach(function (column, columnidx) {
			if (typeof sheet.column != 'undefined') {
				extend(column, sheet.column);
			}

			if (typeof column.width == 'undefined') {
				if (sheet.column && sheet.column.width != 'undefined') {
					column.width = sheet.column.width;
				} else {
					column.width = '120px';
				}
			}
			if (typeof column.width == 'number') column.width = column.width + 'px';
			if (typeof column.columnid == 'undefined') column.columnid = columnidx;
			if (typeof column.title == 'undefined') column.title = '' + column.columnid.trim();
			if (sheet.headers && Array.isArray(sheet.headers)) column.title = sheet.headers[columnidx];
		});

		// Set columns widths
		s += '<colgroups>';
		columns.forEach(function (column) {
			s += '<col style="width: ' + column.width + '"></col>';
		});
		s += '</colgroups>';

		// Headers
		if (sheet.headers) {
			s += '<thead>';
			s += '<tr>';

			// TODO: Skip columns to body

			// Headers
			columns.forEach(function (column, columnidx) {
				s += '<th ';
				// Column style
				if (typeof column.style != 'undefined') {
					s += ' style="';
					if (typeof column.style == 'function') {
						s += column.style(sheet, column, columnidx);
					} else {
						s += column.style;
					}
					s += '" ';
				}
				s += '>';

				// Column title
				if (typeof column.title != 'undefined') {
					if (typeof column.title == 'function') {
						s += column.title(sheet, column, columnidx);
					} else {
						s += column.title;
					}
				}
				s += '</th>';
			});

			s += '</tr>';
			s += '</thead>';
		}

		s += '<tbody>';

		// TODO: Skip lines between header and body

		if (data && data.length > 0) {
			// TODO: Skip columns to body

			// Loop over data rows
			data.forEach(function (row, rowidx) {
				// Limit number of rows on the sheet
				if (rowidx > sheet.limit) return;
				// Create row
				s += '<tr';

				var srow = {};
				extend(srow, sheet.row);
				if (sheet.rows && sheet.rows[rowidx]) {
					extend(srow, sheet.rows[rowidx]);
				}
				// Row style fromdefault sheet
				if (typeof srow != 'undefined') {
					if (typeof srow.style != 'undefined') {
						s += ' style="';
						if (typeof srow.style == 'function') {
							s += srow.style(sheet, row, rowidx);
						} else {
							s += srow.style;
						}
						s += '" ';
					}
				}
				s += '>';
				// Loop over columns
				columns.forEach(function (column, columnidx) {
					// Parameters
					var cell = {};
					extend(cell, sheet.cell);
					extend(cell, srow.cell);
					if (typeof sheet.column != 'undefined') {
						extend(cell, sheet.column.cell);
					}
					extend(cell, column.cell);
					if (sheet.cells && sheet.cells[rowidx] && sheet.cells[rowidx][columnidx]) {
						extend(cell, sheet.cells[rowidx][columnidx]);
					}

					// Create value
					var value = row[column.columnid];
					if (typeof cell.value == 'function') {
						value = cell.value(value, sheet, row, column, cell, rowidx, columnidx);
					}

					// Define cell type
					var typeid = cell.typeid;
					if (typeof typeid == 'function') {
						typeid = typeid(value, sheet, row, column, cell, rowidx, columnidx);
					}

					if (typeof typeid == 'undefined') {
						if (typeof value == 'number') typeid = 'number';
						else if (typeof value == 'string') typeid = 'string';
						else if (typeof value == 'boolean') typeid = 'boolean';
						else if (typeof value == 'object') {
							if (value instanceof Date) typeid = 'date';
						}
					}

					var typestyle = '';

					if (typeid == 'money') {
						typestyle = 'mso-number-format:"\\#\\,\\#\\#0\\\\ _р_\\.";white-space:normal;';
					} else if (typeid == 'number') {
						typestyle = ' ';
					} else if (typeid == 'date') {
						typestyle = 'mso-number-format:"Short Date";';
					} else {
						// FOr other types is saved
						if (opts.types && opts.types[typeid] && opts.types[typeid].typestyle) {
							typestyle = opts.types[typeid].typestyle;
						}
					}

					// TODO Replace with extend...
					typestyle = typestyle || 'mso-number-format:"\\@";'; // Default type style

					s += "<td style='" + typestyle + "' ";
					if (typeof cell.style != 'undefined') {
						s += ' style="';
						if (typeof cell.style == 'function') {
							s += cell.style(value, sheet, row, column, rowidx, columnidx);
						} else {
							s += cell.style;
						}
						s += '" ';
					}
					s += '>';

					// TODO Replace with extend...
					var format = cell.format;
					if (typeof value == 'undefined') {
						s += '';
					} else if (typeof format != 'undefined') {
						if (typeof format == 'function') {
							s += format(value);
						} else if (typeof format == 'string') {
							s += value; // TODO - add string format
						} else {
							throw new Error('Unknown format type. Should be function or string');
						}
					} else {
						if (typeid == 'number' || typeid == 'date') {
							s += value.toString();
						} else if (typeid == 'money') {
							s += (+value).toFixed(2);
						} else {
							s += value;
						}
					}
					s += '</td>';
				});

				s += '</tr>';
			});
		}

		s += '</tbody>';

		// Generate epilogue
		s += '</table>';
		s += '</body>';
		s += '</html>';

		return s;
	}

	// Style function
	function style(a) {
		var s = ' style="';
		if (a && typeof a.style != 'undefined') {
			s += a.style + ';';
		}
		s += '" ';
		return s;
	}
};
