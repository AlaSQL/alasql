//formerly from 50expressions.js
/**
	Expression class
	@class
	@param {object} params Initial parameters
*/

import {extend} from "./utils.js";

export function Expression(params) { return extend(this, params); };

/**
	Convert AST to string
	@this ExpressionStatement
	@return {string}
*/
Expression.prototype.toString = function() {
	var s = this.expression.toString();
	if(this.order) {
		s += ' '+this.order.toString();
	}
	if(this.nocase) {
		s += ' COLLATE NOCASE';
	}
	return s;
};

/**
	Find aggregator in AST subtree
	@this ExpressionStatement
	@param {object} query Query object
*/
Expression.prototype.findAggregator = function (query){
	if(this.expression.findAggregator) {
		this.expression.findAggregator(query);
	}
};

/**
	Convert AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

Expression.prototype.toJS = function(context, tableid, defcols) {
//	console.log('Expression',this);
	if(this.expression.reduced) {
		return 'true';
	}
	return this.expression.toJS(context, tableid, defcols);
};

/**
	Compile AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

Expression.prototype.compile = function(context, tableid, defcols){
//	console.log('Expression',this);
	if(this.reduced) {
		return returnTrue();
	}
	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
};