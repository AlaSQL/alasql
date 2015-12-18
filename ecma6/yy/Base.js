/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/
import {extend} from "../utils/object.js";

//TODO: handle this
//TODO: var yy = parser.yy = alasql.yy = {};

// Utility

//TODO: yy.extend = extend;

// Option for case sensitive

//TODO: yy.casesensitive = alasql.options.casesensitive;

// Base class for all yy classes
export function Base(params) { return extend(this, params); };

Base.prototype.toString = function() {}
Base.prototype.toType = function() {}
Base.prototype.toJS = function() {}

//var BaseClause = yy,BaseClause = function (params) { return yy.extend(this, params); };
Base.prototype.compile = returnUndefined;
Base.prototype.exec = function() {}

//var BaseStatement = yy,BaseStatement = function (params) { return yy.extend(this, params); };
Base.prototype.compile = returnUndefined;
Base.prototype.exec = function() {}