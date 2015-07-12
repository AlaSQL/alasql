/**
	Markdown export functions from the result table
	@function
	@param {string} filename
	@param {object} opts
	@param {array} data
	@param {array} columns
	@param {callback} cb
	@return {number}

*/
alasql.into.MD = function(filename, opts, data, columns, cb) {
	
	// If columns is empty then generate columns
	if(columns.length == 0 && data.length > 0) {
		columns = Object.keys(data[0]).map(function(columnid){return {columnid:columnid}});
	};

	// If one parameter then filename is opts
	if(typeof filename == 'object') {
		opts = filename;
		filename = undefined;
	};

	/** @todo Add columns and lines generation */

	/** @type {number} */
	var res = data.length;
	/** @type {string} */
	var s = '';
	if(data.length > 0) {
		var key = columns[0].columnid;
		s += data.map(function(d){
			return d[key];
		}).join('\n');
	}

	// Save file
	res = alasql.utils.saveFile(filename,s);
	// Process callback
	if(cb) res = cb(res);
	return res;
};
