import utils from '../utils';

export default mem => {
	const yy = mem.grammar.yy;

	yy.extend = utils.extend;
	// Option for case sensitive
	yy.casesensitive = mem.alasql.options.casesensitive;

	// Base class for all yy classes
	yy.Base = function(params) {
		return yy.extend(this, params);
	};

	yy.Base.prototype.toString = function() {};
	yy.Base.prototype.toType = function() {};
	yy.Base.prototype.toJS = function() {};

	//  var BaseClause = yy,BaseClause = function (params) { return yy.extend(this, params); };
	yy.Base.prototype.compile = utils.returnUndefined;
	yy.Base.prototype.exec = function() {};

	//  var BaseStatement = yy,BaseStatement = function (params) { return yy.extend(this, params); };
	yy.Base.prototype.compile = utils.returnUndefined;
	yy.Base.prototype.exec = function() {};

	mem.grammar.yy = yy;
};
