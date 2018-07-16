import base from './grammar/base';
import statements from './grammar/statements';
import select from './grammar/select';

export default mem => {
	base(mem);
	statements(mem);
	select(mem);
};
