
/**
 	Alasql options object
 */
//formerly alasql.options
//TODO: alasql.options
var options = {};
options.errorlog = false; // Log or throw error
options.valueof = false; // Use valueof in orderfn
options.dropifnotexists = false; // DROP database in any case
options.datetimeformat = 'sql'; // How to handle DATE and DATETIME types
								// Another value is 'javascript'
options.casesensitive = true; // Table and column names are case sensitive and converted to lower-case
options.logtarget = 'output'; // target for log. Values: 'console', 'output', 'id' of html tag
options.logprompt = true; // Print SQL at log

// Default modifier
// values: RECORDSET, VALUE, ROW, COLUMN, MATRIX, TEXTSTRING, INDEX
options.modifier = undefined;
// How many rows to lookup to define columns
options.columnlookup = 10;
// Create vertex if not found
options.autovertex = true;

// Use dbo as current database (for partial T-SQL comaptibility)
options.usedbo = true;

// AUTOCOMMIT ON | OFF
options.autocommit = true;

// Use cache
options.cache = true;

// Compatibility flags
options.tsql = true;
options.mysql = true;
options.postgres = true;
options.oracle = true;
options.sqlite = true;
options.orientdb = true;

// for SET NOCOUNT OFF
options.nocount = false;

// Check for NaN and convert it to undefined
options.nan = false;


export {options};