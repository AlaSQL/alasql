import {extend, returnUndefined} from './utils';

import addBase from './grammar/base';

/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

export default function(mem) {
	mem.grammar.yy = mem.grammar.yy || {};
	mem.grammar.yy = mem.alasql.yy;

	// Utility
	mem.grammar.yy.extend = extend;
	// Option for case sensitive
	mem.grammar.yy.casesensitive = mem.alasql.options.casesensitive;

	addBase(mem);

	mem.alasql.yy = mem.grammar.yy;
}
