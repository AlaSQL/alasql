(function() {
  var Parser, alt, alternatives, grammar, name, o, operators, token, tokens, unwrap;

  Parser = require('jison').Parser;

  unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*);\s*\}/;

  o = function(patternString, action, options) {
    var match;
    patternString = patternString.replace(/\s{2,}/g, ' ');
    if (!action) return [patternString, '$$ = $1;', options];
    action = (match = unwrap.exec(action)) ? match[1] : "(" + action + "())";
    action = action.replace(/\bnew /g, '$&yy.');
    return [patternString, "$$ = " + action + ";", options];
  };

  grammar = {
    Root: [o('Query EOF')],
    Query: [
      o("SelectQuery"), o("SelectQuery Unions", function() {
        $1.unions = $2;
        return $1;
      })
    ],
    SelectQuery: [o("SelectWithLimitQuery"), o("BasicSelectQuery")],
    BasicSelectQuery: [
      o('Select'), o('Select OrderClause', function() {
        $1.order = $2;
        return $1;
      }), o('Select GroupClause', function() {
        $1.group = $2;
        return $1;
      }), o('Select GroupClause OrderClause', function() {
        $1.group = $2;
        $1.order = $3;
        return $1;
      })
    ],
    SelectWithLimitQuery: [
      o('SelectQuery LimitClause', function() {
        $1.limit = $2;
        return $1;
      })
    ],
    Select: [
      o('SelectClause'), o('SelectClause WhereClause', function() {
        $1.where = $2;
        return $1;
      })
    ],
    SelectClause: [
      o('SELECT Fields FROM Table', function() {
        return new Select($2, $4, false);
      }), o('SELECT DISTINCT Fields FROM Table', function() {
        return new Select($3, $5, true);
      }), o('SELECT Fields FROM Table Joins', function() {
        return new Select($2, $4, false, $5);
      }), o('SELECT DISTINCT Fields FROM Table Joins', function() {
        return new Select($3, $5, true, $6);
      })
    ],
    Table: [
      o('Literal', function() {
        return new Table($1);
      }), o('LEFT_PAREN Query RIGHT_PAREN', function() {
        return new SubSelect($2);
      }), o('LEFT_PAREN Query RIGHT_PAREN Literal', function() {
        return new SubSelect($2, $4);
      }), o('Literal WINDOW WINDOW_FUNCTION LEFT_PAREN Number RIGHT_PAREN', function() {
        return new Table($1, $2, $3, $5);
      })
    ],
    Unions: [
      o('Union', function() {
        return [$1];
      }), o('Unions Union', function() {
        return $1.concat($3);
      })
    ],
    Union: [
      o('UNION SelectQuery', function() {
        return new Union($2);
      }), o('UNION ALL SelectQuery', function() {
        return new Union($3, true);
      })
    ],
    Joins: [
      o('Join', function() {
        return [$1];
      }), o('Joins Join', function() {
        return $1.concat($2);
      })
    ],
    Join: [
      o('JOIN Table ON Expression', function() {
        return new Join($2, $4);
      }), o('LEFT JOIN Table ON Expression', function() {
        return new Join($3, $5, 'LEFT');
      }), o('RIGHT JOIN Table ON Expression', function() {
        return new Join($3, $5, 'RIGHT');
      }), o('LEFT INNER JOIN Table ON Expression', function() {
        return new Join($4, $6, 'LEFT', 'INNER');
      }), o('RIGHT INNER JOIN Table ON Expression', function() {
        return new Join($4, $6, 'RIGHT', 'INNER');
      }), o('LEFT OUTER JOIN Table ON Expression', function() {
        return new Join($4, $6, 'LEFT', 'OUTER');
      }), o('RIGHT OUTER JOIN Table ON Expression', function() {
        return new Join($4, $6, 'RIGHT', 'OUTER');
      })
    ],
    WhereClause: [
      o('WHERE Expression', function() {
        return new Where($2);
      })
    ],
    LimitClause: [
      o('LIMIT Number', function() {
        return new Limit($2);
      })
    ],
    OrderClause: [
      o('ORDER BY OrderArgs', function() {
        return new Order($3);
      })
    ],
    OrderArgs: [
      o('OrderArg', function() {
        return [$1];
      }), o('OrderArgs SEPARATOR OrderArg', function() {
        return $1.concat($3);
      })
    ],
    OrderArg: [
      o('Value', function() {
        return new OrderArgument($1, 'ASC');
      }), o('Value DIRECTION', function() {
        return new OrderArgument($1, $2);
      })
    ],
    GroupClause: [
      o('GroupBasicClause'), o('GroupBasicClause HavingClause', function() {
        $1.having = $2;
        return $1;
      })
    ],
    GroupBasicClause: [
      o('GROUP BY ArgumentList', function() {
        return new Group($3);
      })
    ],
    HavingClause: [
      o('HAVING Expression', function() {
        return new Having($2);
      })
    ],
    Expression: [
      o('LEFT_PAREN Expression RIGHT_PAREN', function() {
        return $2;
      }), o('Expression MATH Expression', function() {
        return new Op($2, $1, $3);
      }), o('Expression MATH_MULTI Expression', function() {
        return new Op($2, $1, $3);
      }), o('Expression OPERATOR Expression', function() {
        return new Op($2, $1, $3);
      }), o('Expression CONDITIONAL Expression', function() {
        return new Op($2, $1, $3);
      }), o('Value')
    ],
    Value: [o('Literal'), o('Number'), o('String'), o('Function'), o('UserFunction'), o('Boolean')],
    Number: [
      o('NUMBER', function() {
        return new NumberValue($1);
      })
    ],
    Boolean: [
      o('BOOLEAN', function() {
        return new BooleanValue($1);
      })
    ],
    String: [
      o('STRING', function() {
        return new StringValue($1, "'");
      }), o('DBLSTRING', function() {
        return new StringValue($1, '"');
      })
    ],
    Literal: [
      o('LITERAL', function() {
        return new LiteralValue($1);
      }), o('Literal DOT LITERAL', function() {
        return new LiteralValue($1, $3);
      })
    ],
    Function: [
      o("FUNCTION LEFT_PAREN ArgumentList RIGHT_PAREN", function() {
        return new FunctionValue($1, $3);
      })
    ],
    UserFunction: [
      o("LITERAL LEFT_PAREN ArgumentList RIGHT_PAREN", function() {
        return new FunctionValue($1, $3, true);
      })
    ],
    ArgumentList: [
      o('Expression', function() {
        return [$1];
      }), o('ArgumentList SEPARATOR Value', function() {
        return $1.concat($3);
      })
    ],
    Fields: [
      o('Field', function() {
        return [$1];
      }), o('Fields SEPARATOR Field', function() {
        return $1.concat($3);
      })
    ],
    Field: [
      o('STAR', function() {
        return new Star();
      }), o('Expression', function() {
        return new Field($1);
      }), o('Expression AS Literal', function() {
        return new Field($1, $3);
      })
    ]
  };

  tokens = [];

  operators = [['left', 'Op'], ['left', 'MATH_MULTI'], ['left', 'MATH'], ['left', 'OPERATOR'], ['left', 'CONDITIONAL']];

  for (name in grammar) {
    alternatives = grammar[name];
    grammar[name] = (function() {
      var _i, _j, _len, _len2, _ref, _results;
      _results = [];
      for (_i = 0, _len = alternatives.length; _i < _len; _i++) {
        alt = alternatives[_i];
        _ref = alt[0].split(' ');
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          token = _ref[_j];
          if (!grammar[token]) tokens.push(token);
        }
        if (name === 'Root') alt[1] = "return " + alt[1];
        _results.push(alt);
      }
      return _results;
    })();
  }

  exports.parser = new Parser({
    tokens: tokens.join(' '),
    bnf: grammar,
    operators: operators.reverse(),
    startSymbol: 'Root'
  });

}).call(this);
