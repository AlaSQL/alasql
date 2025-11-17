// myCodeIsolate.js
var selectProductsIsolated = new Function(
	'return ' +
		`(function(params, cb) {
  // All compiled query functions
  const selectfn = function anonymous(p,params,alasql ) { var y;var r={'product':p['default']['product'],'calculated_price':(y=(y=[(p['default']['price']), (100)], y.some(e => e == null) ? void 0 : (y[0]*y[1])),y===y?y:undefined)};r['$$$0']=r['calculated_price'];return r };
  const wherefn = function anonymous(p,params,alasql ) { var y;return (y=[(p['default']['price']), (params[1])], y.some(e => e == null) ? void 0 : (y[0]>y[1])) };
  const orderfn = function anonymous(a,b ) { var y;if((a['$$$0']||'').valueOf()<(b['$$$0']||'').valueOf())return 1;if((a['$$$0']||'').valueOf()==(b['$$$0']||'').valueOf()){return 0;}return -1 };
  const groupfn = null;
  const havingfn = null;
  const selectgfn = null;

  // Query configuration
  const columns = [{"columnid":"product"},{"columnid":"calculated_price"}];
  const removeKeys = ["$$$0"];
  const distinct = undefined;
  const limit = undefined;
  const offset = undefined;

  // Main execution function for simple queries
  function executeQuery(data, params) {
    let result = [];

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const p = { 'default': data[i] };

      // Apply WHERE filter
      if (!wherefn || wherefn(p, params, null)) {
        // Apply SELECT transformation
        const row = selectfn ? selectfn(p, params, null) : data[i];
        result.push(row);
      }
    }

    // Apply ORDER BY (must be done before removing temporary keys)
    if (orderfn) {
      result.sort(orderfn);
    }

    // Remove temporary keys after sorting
    if (removeKeys && removeKeys.length > 0) {
      result.forEach(row => {
        removeKeys.forEach(key => delete row[key]);
      });
    }

    // Apply DISTINCT
    if (distinct) {
      const seen = new Set();
      result = result.filter(row => {
        const key = JSON.stringify(row);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // Apply OFFSET and LIMIT
    if (offset) {
      result = result.slice(offset);
    }
    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }

  // Handle GROUP BY queries
  function executeGroupQuery(data, params) {
    const groups = {};
    const xgroups = {};

    // Group the data
    for (let i = 0; i < data.length; i++) {
      const p = { 'default': data[i] };

      // Apply WHERE filter
      if (!wherefn || wherefn(p, params, null)) {
        const g = groupfn(p, params, null);
        const key = JSON.stringify(g.key);
        if (!groups[key]) {
          groups[key] = g.group;
          xgroups[key] = g.group;
        } else {
          // Merge groups (aggregate)
          Object.keys(g.group).forEach(k => {
            if (typeof groups[key][k] === 'number' && typeof g.group[k] === 'number') {
              groups[key][k] += g.group[k];
            }
          });
        }
      }
    }

    // Convert groups to array and apply HAVING
    let result = [];
    for (const key in groups) {
      const g = groups[key];
      if (!havingfn || havingfn(g, params, null)) {
        const row = selectgfn(g, params, null);
        result.push(row);
      }
    }

    // Apply ORDER BY
    if (orderfn) {
      result.sort(orderfn);
    }

    // Apply LIMIT and OFFSET
    if (offset) {
      result = result.slice(offset);
    }
    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }

  // Main entry point
  if (!params || !Array.isArray(params)) {
    throw new Error('Parameters must be an array');
  }

  const data = params[0];
  if (!Array.isArray(data)) {
    throw new Error('First parameter must be an array of data');
  }

  // Execute the appropriate query type
  const result = groupfn ? executeGroupQuery(data, params) : executeQuery(data, params);

  // Handle callback
  if (cb) {
    cb(result);
  }

  return result;
})`
)();
var data = [
	{product: 'Ball', price: 3},
	{product: 'Ball2', price: 5},
	{product: 'Pen', price: 1.5},
];
var minPrice = 2;
var result = selectProductsIsolated([data, minPrice]);
console.log(result);
