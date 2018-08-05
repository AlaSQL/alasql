import utils from '../utils';
export default mem => {
    class Table {
        constructor(params) {
            // Step 1: Data array
            this.data = [];
            // Step 2: Columns
            this.columns = [];
            this.xcolumns = {};
            // Step 3: indices
            this.inddefs = {};
            this.indices = {};
            this.uniqs = {};
            this.uniqdefs = {};
            // Step 4: identities
            this.identities = {};
            // Step 5: checkfn...
            this.checks = [];
            this.checkfns = []; // For restore... to be done...
            // Step 6: INSERT/DELETE/UPDATE
            // Step 7: Triggers...
            // Create trigger hubs
            this.beforeinsert = {};
            this.afterinsert = {};
            this.insteadofinsert = {};
            this.beforedelete = {};
            this.afterdelete = {};
            this.insteadofdelete = {};
            this.beforeupdate = {};
            this.afterupdate = {};
            this.insteadofupdate = {};
            utils.extend(this, params);
            return this;
        }
        indexColumns() {
            this.xcolumns = {};
            this.columns.forEach(function (col) {
                this.xcolumns[col.columnid] = col;
            });
        }
    }
    mem.alasql.newTable = (params = []) => {
        return new Table(params);
    };
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
