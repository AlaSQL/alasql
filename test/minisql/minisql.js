miniSQL = function(Collection){

  Collection = Collection || Object.create(miniSQL.prototype);
  Collection.table = Collection.tableName;

  // inputString used by queries, overrides other strings
  // includes: create table, create relationship, drop table, insert
  Collection.inputString = '';
  Collection.inputString2 = '';
  Collection.autoSelectData = '';
  Collection.autoSelectInput = '';
  Collection.tableElements = {};

  // statement starters
  Collection.selectString = '';
  Collection.updateString = '';
  Collection.deleteString = '';

  // chaining statements
  Collection.joinString = '';
  Collection.whereString = '';
  Collection.clientWhereString = '';
  Collection.serverWhereString = '';

  // caboose statements
  Collection.orderString = '';
  Collection.limitString = '';
  Collection.offsetString = '';
  Collection.groupString = '';
  Collection.havingString = '';

  Collection.dataArray = [];
  Collection.dataArray2 = [];
  Collection.server = null;

  // error logging
  Collection.prevFunc = '';
  return Collection;
};

miniSQL.prototype.createTable = function(tableObj) {
  var _DataTypes = {
    $number: 'integer',
    $string: 'varchar(255)',
    $json: 'json',
    $datetime: 'date',
    $float: 'decimal',
    $seq: 'serial',
    $bool: 'boolean'
  };

  var _TableConstraints = {
    $unique: 'unique',
    $check: 'check ', // value
    $exclude: 'exclude',
    $notnull: 'not null',
    $default: 'default ', // value
    $primary: 'primary key'
  };

  alasql.fn.Date = Date;

  var startString = 'CREATE TABLE ' + this.table + ' (';
  var item, subKey, valOperator, inputString = '';

  for (var key in tableObj) {
    this.tableElements[key] = key;
    inputString += key + ' ';
    inputString += _DataTypes[tableObj[key][0]];
    if (Array.isArray(tableObj[key]) && tableObj[key].length > 1) {
      for (var i = 1, count = tableObj[key].length; i < count; i++) {
        item = tableObj[key][i];
        if (typeof item === 'object') {
          subKey = Object.keys(item);
          valOperator = _TableConstraints[subKey];
          inputString += ' ' + valOperator + item[subKey];
        } else {
          inputString += ' ' + _TableConstraints[item];
        }
      }
    }
    inputString += ', ';
  }
  // check to see if id already provided
  if (inputString.indexOf('id') === -1) {
    startString += 'id serial primary key,';
  }

  this.inputString = startString + inputString + " createdat Date); ";
  this.prevFunc = 'CREATE TABLE';
  alasql(this.inputString);
  this.clearAll();
  return this;
};

miniSQL.prototype.dropTable = function() {
  this.inputString = 'DROP TABLE IF EXISTS ' + this.table + ' CASCADE;';
  this.prevFunc = 'DROP TABLE';
  return this;
};

miniSQL.prototype.insert = function(serverInserts, clientInserts) {
  // server
  if(serverInserts['id'] === undefined){
    serverInserts['id'] = -1;
  }
  // client
  this.dataArray2 = [];
  var insertString2 = 'INSERT INTO ' + this.table + ' (';
  var valueString2 = ') VALUES (';
  for (var key2 in clientInserts) {
    insertString2 += key2 + ', ';
    this.dataArray2.push(clientInserts[key2]);
    valueString2 += '?, ';
  }
  for (var key3 in serverInserts) {
    insertString2 += key3 + ', ';
    this.dataArray2.push(serverInserts[key3]);
    valueString2 += '?, ';
  }
  this.server = true;
  this.inputString2 = insertString2.substring(0, insertString2.length - 2) + valueString2.substring(0, valueString2.length - 2) + ');';


  this.dataArray = [];
  if (serverInserts['id'] === -1){
    delete serverInserts['id'];
  }
  var insertString = 'INSERT INTO ' + this.table + ' (';
  var valueString = ') VALUES (', j = 1;
  for (var key in serverInserts) {
    insertString += key + ', ';     // field
    this.dataArray.push(serverInserts[key]); // data
    valueString += '$' + j++ + ', ';   // $1, $2, etc
  }

  this.inputString = insertString.substring(0, insertString.length - 2) + valueString.substring(0, valueString.length - 2) + ');';



  this.prevFunc = 'INSERT';
  return this;
};

miniSQL.prototype.update = function(updates) {
  this.updateString = 'UPDATE ' + this.table + ' SET ';
  for (var key in updates) {
    if (typeof updates[key] === 'number' && !isNaN(updates[key]) || typeof(updates[key]) === "boolean"){
      this.updateString += key + ' = ' + updates[key] + ', ';
    }
    else {
      this.updateString += key + ' = "' + updates[key] + '", ';
    }
  }
  this.updateString = this.updateString.substring(0,this.updateString.length-2);
  this.prevFunc = 'UPDATE';
  return this;
};

miniSQL.prototype.remove = function() {
  this.deleteString = 'DELETE FROM ' + this.table;
  this.prevFunc = 'DELETE';
  return this;
};

miniSQL.prototype.select = function(/*arguments*/) {
  var args = '';
  if (arguments.length >= 1) {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] === 'distinct') {
        args += 'DISTINCT ';
      } else {
        args += arguments[i] + ', ';
      }
    }
    args = args.substring(0, args.length - 2);
  } else {
    args += '*';
  }
  this.selectString = 'SELECT ' + args + ' FROM ' + this.table + " ";
  this.prevFunc = 'SELECT';
  return this;
};

miniSQL.prototype.findOne = function(/*arguments*/) {
  if (arguments.length === 2) {
    this.inputString = 'SELECT * FROM ' + this.table + ' WHERE ' + this.table + '.id = ' + args + ' LIMIT 1;';
  } else {
    this.inputString = 'SELECT * FROM ' + this.table + ' LIMIT 1';
  }
  this.prevFunc = 'FIND ONE';
  return this;
};

miniSQL.prototype.join = function(joinType, fields, joinTable) {
  if (Array.isArray(joinType)) {
    for (var x = 0, count = fields.length; x < count; x++) {
      this.joinString = " " + joinType[x] + " " + joinTable[x][0] + " ON " + this.table + "." + fields[x] + " = " + joinTable[x][0] + "." + joinTable[x][1];
    }
  } else {
    this.joinString = " " + joinType + " " + joinTable + " ON " + this.table + "." + fields + " = " + joinTable + "." + joinTable;
  }
  this.prevFunc = "JOIN";
  return this;
};

miniSQL.prototype.where = function(/*Arguments*/) {

  this.dataArray = [];
  this.dataArray2 = [];
  var where = '', redux, substring1, substring2;

  where += arguments[0];
  // replace ? with rest of array
  for (var i = 1, count = arguments.length; i < count; i++) {
    if (Array.isArray(arguments[i])) {
      if (arguments[i].length === 0) {
        throw new Error('Invalid input: array is empty');
      }
      redux = where.indexOf('?');
      substring1 = where.substring(0, redux);
      substring2 = where.substring(redux + 1, where.length);
      where = substring1 + 'ANY($' + i + ')'+ substring2;
      this.dataArray.push(arguments[i]);
    } else {
      redux = where.indexOf('?');
      substring1 = where.substring(0, redux);
      substring2 = where.substring(redux + 1, where.length);
      where = substring1 + '$' + i + substring2;
      this.dataArray.push(arguments[i]);
    }
  }
  this.serverWhereString = ' WHERE ' + where;

  where = '';
  where += arguments[0];
  for (var i = 1, count = arguments.length; i < count; i++) {
    if (Array.isArray(arguments[i])) {
      redux = where.indexOf('?');
      substring1 = where.substring(0, redux);
      substring2 = where.substring(redux + 1, where.length);
      where = substring1 + 'IN (' + arguments[i].join(',') + ')' + substring2;
    } else {
      this.dataArray2.push(arguments[i]);
    }
  }
  this.clientWhereString = ' WHERE ' + where;

  return this;
};

miniSQL.prototype.order = function(/*arguments*/) {

  var args = '';
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      args += arguments[i] + ', ';
    }
    args = args.substring(0, args.length - 2);
  } else {
    args = arguments[0];
  }
  this.orderString = ' ORDER BY ' + args;
  return this;
};

miniSQL.prototype.limit = function(limit) {
  this.limitString = ' LIMIT ' + limit;
  return this;
};

miniSQL.prototype.offset = function(offset) {
  this.offsetString = ' OFFSET ' + offset;
  return this;
};

miniSQL.prototype.group = function(group) {
  this.groupString = 'GROUP BY ' + group;
  return this;
};

miniSQL.prototype.first = function(limit) {
  limit = limit || 1;
  this.inputString += 'SELECT * FROM ' + this.table + ' ORDER BY ' + this.table + '.id ASC LIMIT ' + limit + ';';
  this.prevFunc = 'FIRST';
  return this;
};

miniSQL.prototype.last = function(limit) {
  limit = limit || 1;
  this.inputString += 'SELECT * FROM ' + this.table + ' ORDER BY ' + this.table + '.id DESC LIMIT ' + limit + ';';
  this.prevFunc = 'LAST';
  return this;
};

miniSQL.prototype.take = function(limit) {
  limit = limit || 1;
  this.inputString += 'SELECT * FROM ' + this.table + ' LIMIT ' + limit + ';';
  this.prevFunc = 'TAKE';
  return this;
};

miniSQL.prototype.clearAll = function() {
  this.inputString = '';
  this.inputString2 = '';
  this.autoSelectData = '';
  this.autoSelectInput = '';

  // statement starters
  this.selectString = '';
  this.updateString = '';
  this.deleteString = '';

  // chaining statements
  this.joinString = '';
  this.whereString = '';
  this.clientWhereString = '';
  this.serverWhereString = '';

  // caboose statements
  this.orderString = '';
  this.limitString = '';
  this.offsetString = '';
  this.groupString = '';
  this.havingString = '';

  this.dataArray = [];
  this.dataArray2 = [];
  this.server = null;

  // error logging
  this.prevFunc = '';
};

miniSQL.prototype.fetch = function(server) {

  this.reactiveData.depend();

  var dataArray = this.dataArray;
  var starter = this.updateString || this.deleteString || this.selectString;

  var input = this.inputString.length > 0 ? this.inputString : starter + this.joinString + this.clientWhereString + this.orderString + this.limitString +
  this.offsetString + this.groupString + this.havingString + ';';


  var result = alasql(input, dataArray);

  var name = this.table + 'fetch';
  if (server === "server") {
    input = this.inputString.length > 0 ? this.inputString : starter + this.joinString + this.serverWhereString + this.orderString + this.limitString +
    this.offsetString + this.groupString + this.havingString + ';';
    Meteor.call(this.fetchMethod, input, dataArray);
  }
  this.clearAll();
  return result;
};

miniSQL.prototype.save = function(client) {

  var dataArray = this.dataArray;
  var dataArray2 = this.dataArray2;
  var starter = this.updateString || this.deleteString || this.selectString;
  var input = this.inputString2.length > 0 ? this.inputString2 : starter + this.joinString + this.clientWhereString + ';';

  var result = alasql(input, dataArray2);
  // postgres
  var name = this.table + 'save';
  if (client !== "client") {
    input = this.inputString.length > 0 ? this.inputString : starter + this.joinString + this.serverWhereString + ';';
    this.unvalidated = true;
    Meteor.call(this.saveMethod, input, dataArray);
  }
  this.reactiveData.changed();

  this.clearAll();
  return result;
};