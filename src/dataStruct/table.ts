import utils from '../utils';

export default mem => {

	class Table {
		// Step 1: Data array
		data = [];

		// Step 2: Columns
		columns = [];
		xcolumns = {};

		// Step 3: indices
		inddefs = {};
		indices = {};
		uniqs = {};
		uniqdefs = {};

		// Step 4: identities
		identities = {};

		// Step 5: checkfn...
		checks = [];
		checkfns = []; // For restore... to be done...

		// Step 6: INSERT/DELETE/UPDATE

		// Step 7: Triggers...
		// Create trigger hubs
		beforeinsert = {};
		afterinsert = {};
		insteadofinsert = {};

		beforedelete = {};
		afterdelete = {};
		insteadofdelete = {};

		beforeupdate = {};
		afterupdate = {};
		insteadofupdate = {};

		constructor(params) {
			utils.extend(this, params);

			return this;
		}

		indexColumns() {
			this.xcolumns = {};
			this.columns.forEach(function(col) {
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


