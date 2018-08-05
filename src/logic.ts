import stdlib from './logic/stdlib';
import stdfn from './logic/stdfn';
import aggr from './logic/aggr';

export default mem => {
	stdlib(mem);
	stdfn(mem);
	aggr(mem);
};
