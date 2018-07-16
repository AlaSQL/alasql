import general from './utils/general';
import enviroment from './utils/enviroment';
import transformation from './utils/transformation';
import sqlTools from './utils/sqlTools';
import files from './utils/files';
import domTools from './utils/domTools';
import excelTools from './utils/excelTools';

export default {
	...general,
	...enviroment,
	...transformation,
	...sqlTools,
	...files,
	...domTools,
	...sqlTools,
	...excelTools,
};
