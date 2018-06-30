/*
    Utilities for Alasql.js

    @todo Review the list of utilities
    @todo Find more effective utilities
*/

import fundamentals from './utils/fundamentals';
import enviroment from './utils/enviroment';
import transformation from './utils/transformation';
import sqlTools from './utils/sqlTools';
import files from './utils/files';
import domTools from './utils/domTools';
import sqlTools from './utils/sqlTools';
import excelTools from './utils/excelTools';

export default mem => {
	//var utils : {[key: string]: any} = {};

	fundamentals(mem);
	enviroment(mem);
	transformation(mem);
	sqlTools(mem);
	files(mem);
	domTools(mem);
	sqlTools(mem);
	excelTools(mem);
};
