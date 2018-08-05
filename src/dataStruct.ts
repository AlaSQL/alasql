import database from './dataStruct/database';
import query from './dataStruct/query';
import table from './dataStruct/table';

export default mem => {
	database(mem);
	query(mem);
	table(mem);
};
