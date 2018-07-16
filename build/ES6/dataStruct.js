import database from './dataStruct/database';
import query from './dataStruct/query';
export default mem => {
    database(mem);
    query(mem);
};
