alasql.into.XLSXML = function (filename, opts, data, columns, cb) {
	opts = opts || {};

	// If filename is not defined then output to the result
	if (typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	}

	// Set sheets
	var sheets = {};
	var sheetsdata;
	var sheetscolumns;
	if (opts && opts.sheets) {
		sheets = opts.sheets;
		// data and columns are already an array for the sheets
		sheetsdata = data;
		sheetscolumns = columns;
	} else {
		sheets.Sheet1 = opts;
		// wrapd ata and columns array for single sheet
		sheetsdata = [data];
		sheetscolumns = [columns];
	}

	// File is ready to save
	filename = alasql.utils.autoExtFilename(filename, 'xls', opts);
	var res = alasql.utils.saveFile(filename, toXML());
	if (cb) res = cb(res);
	return res;

	function toXML() {
		var s1 =
			'<?xml version="1.0"?> \
		<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" \
		 xmlns:o="urn:schemas-microsoft-com:office:office" \
		 xmlns:x="urn:schemas-microsoft-com:office:excel" \
		 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" \
		 xmlns:html="http://www.w3.org/TR/REC-html40"> \
		 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"> \
		 </DocumentProperties> \
		 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"> \
		  <AllowPNG/> \
		 </OfficeDocumentSettings> \
		 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"> \
		  <ActiveSheet>0</ActiveSheet> \
		 </ExcelWorkbook> \
		 <Styles> \
		  <Style ss:ID="Default" ss:Name="Normal"> \
		   <Alignment ss:Vertical="Bottom"/> \
		   <Borders/> \
		   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"/> \
		   <Interior/> \
		   <NumberFormat/> \
		   <Protection/> \
		  </Style>';

		var s2 = ''; // for styles

		var s3 = ' </Styles>';

		var styles = {}; // hash based storage for styles
		var stylesn = 62; // First style

		// Generate style
		function hstyle(st) {
			// Prepare string
			var s = '';
			for (var key in st) {
				s += '<' + key;
				for (var attr in st[key]) {
					s += ' ';
					if (attr.substr(0, 2) == 'x:') {
						s += attr;
					} else {
						s += 'ss:';
					}
					s += attr + '="' + st[key][attr] + '"';
				}
				s += '/>';
			}

			var hh = hash(s);
			// Store in hash
			if (styles[hh]) {
			} else {
				styles[hh] = {styleid: stylesn};
				s2 += '<Style ss:ID="s' + stylesn + '">';
				s2 += s;
				s2 += '</Style>';
				stylesn++;
			}
			return 's' + styles[hh].styleid;
		}

		function values(obj) {
			try {
				return Object.values(obj);
			} catch (e) {
				// support for older runtimes
				return Object.keys(obj).map(function (e) {
					return obj[e];
				});
			}
		}

		var sheetidx = 0;
		for (var sheetid in sheets) {
			var sheet = sheets[sheetid];
			var idx = typeof sheet.dataidx != 'undefined' ? sheet.dataidx : sheetidx++;
			var data = values(sheetsdata[idx]);
			// If columns defined in sheet, then take them
			var columns = undefined;
			if (typeof sheet.columns != 'undefined') {
				columns = sheet.columns;
			} else {
				// Autogenerate columns if they are passed as parameters
				columns = sheetscolumns[idx];
				if (columns === undefined || (columns.length == 0 && data.length > 0)) {
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
					if (sheet.column && typeof sheet.column.width != 'undefined') {
						column.width = sheet.column.width;
					} else {
						column.width = 120;
					}
				}
				if (typeof column.width == 'number') column.width = column.width;
				if (typeof column.columnid == 'undefined') column.columnid = columnidx;
				if (typeof column.title == 'undefined') column.title = '' + column.columnid.trim();
				if (sheet.headers && Array.isArray(sheet.headers)) column.title = sheet.headers[columnidx];
			});

			// Header
			s3 +=
				'<Worksheet ss:Name="' +
				sheetid +
				'"> \
	  			<Table ss:ExpandedColumnCount="' +
				columns.length +
				'" ss:ExpandedRowCount="' +
				((sheet.headers ? 1 : 0) + Math.min(data.length, sheet.limit || data.length)) +
				'" x:FullColumns="1" \
	   			x:FullRows="1" ss:DefaultColumnWidth="65" ss:DefaultRowHeight="15">';

			columns.forEach(function (column, columnidx) {
				s3 +=
					'<Column ss:Index="' +
					(columnidx + 1) +
					'" ss:AutoFitWidth="0" ss:Width="' +
					column.width +
					'"/>';
			});

			// Headers
			if (sheet.headers) {
				s3 += '<Row ss:AutoFitHeight="0">';

				// TODO: Skip columns to body

				// Headers
				columns.forEach(function (column, columnidx) {
					s3 += '<Cell ';

					if (typeof column.style != 'undefined') {
						var st = {};
						if (typeof column.style == 'function') {
							extend(st, column.style(sheet, column, columnidx));
						} else {
							extend(st, column.style);
						}
						s3 += 'ss:StyleID="' + hstyle(st) + '"';
					}

					s3 += '><Data ss:Type="String">';

					// Column title
					if (typeof column.title != 'undefined') {
						if (typeof column.title == 'function') {
							s3 += column.title(sheet, column, columnidx);
						} else {
							s3 += column.title;
						}
					}
					s3 += '</Data></Cell>';
				});

				s3 += '</Row>';
			}

			// Data
			if (data && data.length > 0) {
				// Loop over data rows
				data.forEach(function (row, rowidx) {
					// Limit number of rows on the sheet
					if (rowidx > sheet.limit) return;

					// Extend row properties
					var srow = {};
					extend(srow, sheet.row);
					if (sheet.rows && sheet.rows[rowidx]) {
						extend(srow, sheet.rows[rowidx]);
					}

					s3 += '<Row ';

					// Row style fromdefault sheet
					if (typeof srow != 'undefined') {
						var st = {};
						if (typeof srow.style != 'undefined') {
							if (typeof srow.style == 'function') {
								extend(st, srow.style(sheet, row, rowidx));
							} else {
								extend(st, srow.style);
							}
							s3 += 'ss:StyleID="' + hstyle(st) + '"';
						}
					}

					s3 += '>'; //'ss:AutoFitHeight="0">'

					// Data
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

						var Type = 'String';
						if (typeid == 'number') Type = 'Number';
						else if (typeid == 'date') Type = 'Date';
						// TODO: What else?

						// Prepare Data types styles
						var typestyle = '';

						if (typeid == 'money') {
							typestyle = 'mso-number-format:"\\#\\,\\#\\#0\\\\ _р_\\.";white-space:normal;';
						} else if (typeid == 'number') {
							typestyle = ' ';
						} else if (typeid == 'date') {
							typestyle = 'mso-number-format:"Short Date";';
						} else {
							// For other types is saved
							if (opts.types && opts.types[typeid] && opts.types[typeid].typestyle) {
								typestyle = opts.types[typeid].typestyle;
							}
						}

						// TODO Replace with extend...
						typestyle = typestyle || 'mso-number-format:"\\@";'; // Default type style

						s3 += '<Cell ';
						/*/*
if(false) {
						s += "<td style='" + typestyle+"' " ;	
}			    		
*/
						// Row style fromdefault sheet
						var st = {};
						if (typeof cell.style != 'undefined') {
							if (typeof cell.style == 'function') {
								extend(st, cell.style(value, sheet, row, column, rowidx, columnidx));
							} else {
								extend(st, cell.style);
							}
							s3 += 'ss:StyleID="' + hstyle(st) + '"';
						}

						s3 += '>';

						s3 += '<Data ss:Type="' + Type + '">';

						// TODO Replace with extend...
						var format = cell.format;
						if (typeof value == 'undefined') {
							s3 += '';
						} else if (typeof format != 'undefined') {
							if (typeof format == 'function') {
								s3 += format(value);
							} else if (typeof format == 'string') {
								s3 += value; // TODO - add string format
							} else {
								throw new Error('Unknown format type. Should be function or string');
							}
						} else {
							if (typeid == 'number' || typeid == 'date') {
								s3 += value.toString();
							} else if (typeid == 'money') {
								s3 += (+value).toFixed(2);
							} else {
								s3 += value;
							}
						}

						//			    		s3 += row[column.columnid];
						s3 += '</Data></Cell>';
					});

					s3 += '</Row>';
				});
			}
			// Finish
			s3 += '</Table></Worksheet>';
		}

		s3 += '</Workbook>';

		return s1 + s2 + s3;
	}
};
