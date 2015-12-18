import {Select} from "../../yy/Select/index.js";
import {AggrValue} from "../../yy/AggrValue.js";
import {ParamValue} from "../../yy/ParamValue.js";
import {Column} from "../../yy/Column.js";
import {parser} from "../../parser/slim/slim-parser.js";
import {extend} from "../../utils/object.js";
import {Statements} from "../../yy/Statements.js";
import {alasql} from "../../global/alasql.js";
import {Database} from "../../global/Database.js";
import {NumValue} from "../../yy/NumValue.js";
import {Op} from "../../yy/Op.js";
import {Expression} from "../../yy/Expression.js";
import {StringValue} from "../../yy/StringValue.js";
import {UniOp} from "../../yy/UniOp.js";

var yy = {
  extend:extend,
  Statements:Statements,
  Select:Select,
  AggrValue:AggrValue,
  ParamValue:ParamValue,
  Column:Column,
  NumValue:NumValue,
  Op:Op,
  Expression:Expression,
  StringValue:StringValue,
  UniOp:UniOp
};



parser.yy = yy;
alasql.yy = yy;
alasql.parser = parser;
alasql.Database = Database;

// Create default database
new alasql.Database("alasql");

// Set default database
alasql.use("alasql");

module.exports =  alasql;


