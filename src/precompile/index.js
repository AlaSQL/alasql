/**
	AlaSQL Precompile and Isolate Module
	Provides compileToJS and compileToIsolateJS functions
*/

// Import alasql from the built file
import alasql from '../../dist/alasql.fs.js';

/**
	 Compile SQL statement to JavaScript source code string that expects
	 `alasql` (or a compatible engine) as `this` and uses the normal
	 AlaSQL execution pipeline.
	 @param {string} sql SQL statement
	 @param {string} databaseid Database identifier
	 @return {string} Generated JavaScript source code
	*/
export function compileToJS(sql, databaseid, prettyPrint = true) {
	let tidyJS = e => e;

	// biome-ignore format
	// prettier-ignore
	if (prettyPrint)
			tidyJS = function(e,n="  "){e=e.replace(/\s\s+/g," ").replace(/;\s*/g,";\n").replace(/{\s*/g,"{\n").replace(/\s*}/g,"\n}").replace(/^[ \t]+|[ \t]+$/gm,"").replace(/\n{3,}/g,"\n\n").replace(/\n{2,}(?=\})/g,"\n")+" ";let r=0,l=[];for(let t=0;t<e.length;t++){let a=e[t];"{"===a?r++:"}"===a?r--:"\n"===a&&(a+=n.repeat(Math.max(0,r-((e[t+1]=="}")?1:0)))),l.push(a)}return l.join("").trim()}

	const sqlLiteral = JSON.stringify(sql);
	const hasDbId = databaseid !== undefined && databaseid !== null;
	const dbLiteral = hasDbId ? JSON.stringify(databaseid) : 'undefined';

	const wrapper = `
			(function(params, cb, scope) {
				const dbid = ${dbLiteral};
				if (dbid === undefined || dbid === null) {
					return this.exec(${sqlLiteral}, params, cb, scope);
				}
				return this.dexec(dbid, ${sqlLiteral}, params, cb, scope);
			})
		`;

	return tidyJS(wrapper);
}

/**
	 Compile SQL statement to a fully standalone JavaScript source code string
	 that can run without the AlaSQL engine. The generated function operates
	 only on the data passed in `params[0]`.
	 @param {string} sql SQL statement
	 @param {string} databaseid Database identifier
	 @return {string} Generated JavaScript source code
	*/
export function compileToIsolateJS(sql, databaseid, prettyPrint = false) {
	let tidyJS = e => e;

	// biome-ignore format
	// prettier-ignore
	if (prettyPrint) {
			tidyJS = function(e,n="  "){e=e.replace(/\s\s+/g," ").replace(/;\s*/g,";\n").replace(/{\s*/g,"{\n").replace(/\s*}/g,"\n}").replace(/^[ \t]+|[ \t]+$/gm,"").replace(/\n{3,}/g,"\n\n").replace(/\n{2,}(?=\})/g,"\n")+" ";let r=0,l=[];for(let t=0;t<e.length;t++){let a=e[t];"{"===a?r++:"}"===a?r--:"\n"===a&&(a+=n.repeat(Math.max(0,r-((e[t+1]=="}")?1:0)))),l.push(a)}return l.join("").trim()}
		}

	// Use existing compile method to get the function and query object
	const compiledFn = alasql.compile(sql, databaseid);
	const query = compiledFn.query;

	// Extract the compiled functions as strings and normalize them
	const selectfnStr = query.selectfn
		? query.selectfn.toString().replace(/\s+/g, ' ').trim()
		: 'null';
	const wherefnStr = query.wherefn ? query.wherefn.toString().replace(/\s+/g, ' ').trim() : 'null';
	const orderfnStr = query.orderfn ? query.orderfn.toString().replace(/\s+/g, ' ').trim() : 'null';
	const groupfnStr = query.groupfn ? query.groupfn.toString().replace(/\s+/g, ' ').trim() : 'null';
	const havingfnStr = query.havingfn
		? query.havingfn.toString().replace(/\s+/g, ' ').trim()
		: 'null';
	const selectgfnStr = query.selectgfn
		? query.selectgfn.toString().replace(/\s+/g, ' ').trim()
		: 'null';

	// Create a standalone function that includes all necessary logic
	const alasqlWrapper = `(function(params, cb) {
  // All compiled query functions
  ${selectfnStr ? 'const selectfn = ' + selectfnStr + ';' : 'const selectfn = null;'}
  ${wherefnStr ? 'const wherefn = ' + wherefnStr + ';' : 'const wherefn = null;'}
  ${orderfnStr ? 'const orderfn = ' + orderfnStr + ';' : 'const orderfn = null;'}
  ${groupfnStr ? 'const groupfn = ' + groupfnStr + ';' : 'const groupfn = null;'}
  ${havingfnStr ? 'const havingfn = ' + havingfnStr + ';' : 'const havingfn = null;'}
  ${selectgfnStr ? 'const selectgfn = ' + selectgfnStr + ';' : 'const selectgfn = null;'}
  
  // Query configuration
  const columns = ${JSON.stringify(query.columns)};
  const removeKeys = ${JSON.stringify(query.removeKeys || [])};
  const distinct = ${JSON.stringify(query.distinct)};
  const limit = ${JSON.stringify(query.limit)};
  const offset = ${JSON.stringify(query.offset)};
  
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
})`;

	return tidyJS(alasqlWrapper);
}
