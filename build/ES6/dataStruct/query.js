import utils from '../utils';
/**
 @class Query Main query class
 */
class Query {
    constructor(params) {
        //this.alasql = alasql;
        //	console.log(12,alasql);
        // Columns
        this.columns = [];
        this.xcolumns = {};
        this.selectGroup = [];
        this.groupColumns = {};
        utils.extend(this, params);
        return this;
    }
}
;
/**
 * DataArray
 * @class Recordset data object
 */
class Recordset {
    constructor(params) {
        utils.extend(this, params);
    }
}
;
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
};
export { Recordset };
export { Query };
