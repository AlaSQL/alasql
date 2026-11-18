/* eslint-disable */ 

/*
//
// Last part of Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// This is a final part of Alasql


/*only-for-browser/*
if(utils.isCordova || utils.isMeteorServer || utils.isNode ){
  console.log('It looks like you are using the browser version of AlaSQL. Please use the alasql.fs.js file instead.')
}
//*/


// FileSaveAs
alasql.utils.saveAs = saveAs;

};

// Create default database
new Database("alasql");

// Set default database
alasql.use("alasql");

return alasql;
}));

