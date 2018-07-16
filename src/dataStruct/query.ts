import utils from '../utils';

/**
 @class Query Main query class
 */


class Query {
	//this.alasql = alasql;
	//	console.log(12,alasql);
	// Columns
	columns = [];
	xcolumns = {};
	selectGroup = [];
	groupColumns = {};
	
	constructor(params) {
		utils.extend(this, params);

		return this;
	}
};


/**
 * DataArray
 * @class Recordset data object
 */
class Recordset {
	constructor(params?: any){
		utils.extend(this, params);

	}
};

/*/*
// View = function(){
// 	this.data = [];
// 	this.columns = [];
// 	this.ixcolumns = {};
// 	this.ixdefs = {};
// 	this.indices = {};
// };

// alasql.View = View;
*/



export default mem => {
	mem.alasql.Query = Query;
	mem.alasql.QueRecordsetry = Recordset;
}

export {Recordset};

export {Query};
