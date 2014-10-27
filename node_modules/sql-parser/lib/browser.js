(function(root) {
  var SQLParser = function() {
    function require(path){ return require[path]; }
    require['./lexer'] = new function() {
  var exports = this;
  (function() {
  var Lexer;

  Lexer = (function() {
    var BOOLEAN, DBLSTRING, LITERAL, MATH, MATH_MULTI, NUMBER, SEPARATOR, SQL_CONDITIONALS, SQL_FUNCTIONS, SQL_KEYWORDS, SQL_OPERATORS, SQL_SORT_ORDERS, STAR, STRING, WHITESPACE;

    function Lexer(sql, opts) {
      var bytesConsumed, i;
      if (opts == null) opts = {};
      this.sql = sql;
      this.preserveWhitespace = opts.preserveWhitespace || false;
      this.tokens = [];
      this.currentLine = 1;
      i = 0;
      while (this.chunk = sql.slice(i)) {
        bytesConsumed = this.keywordToken() || this.starToken() || this.booleanToken() || this.functionToken() || this.windowExtension() || this.sortOrderToken() || this.seperatorToken() || this.operatorToken() || this.mathToken() || this.dotToken() || this.conditionalToken() || this.numberToken() || this.stringToken() || this.parensToken() || this.whitespaceToken() || this.literalToken();
        if (bytesConsumed < 1) {
          throw new Error("NOTHING CONSUMED: Stopped at - '" + (this.chunk.slice(0, 30)) + "'");
        }
        i += bytesConsumed;
      }
      this.token('EOF', '');
    }

    Lexer.prototype.token = function(name, value) {
      return this.tokens.push([name, value, this.currentLine]);
    };

    Lexer.prototype.tokenizeFromRegex = function(name, regex, part, lengthPart, output) {
      var match, partMatch;
      if (part == null) part = 0;
      if (lengthPart == null) lengthPart = part;
      if (output == null) output = true;
      if (!(match = regex.exec(this.chunk))) return 0;
      partMatch = match[part];
      if (output) this.token(name, partMatch);
      return match[lengthPart].length;
    };

    Lexer.prototype.tokenizeFromWord = function(name, word) {
      var match, matcher;
      if (word == null) word = name;
      word = this.regexEscape(word);
      matcher = /^\w+$/.test(word) ? new RegExp("^(" + word + ")\\b", 'ig') : new RegExp("^(" + word + ")", 'ig');
      match = matcher.exec(this.chunk);
      if (!match) return 0;
      this.token(name, match[1]);
      return match[1].length;
    };

    Lexer.prototype.tokenizeFromList = function(name, list) {
      var entry, ret, _i, _len;
      ret = 0;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        entry = list[_i];
        ret = this.tokenizeFromWord(name, entry);
        if (ret > 0) break;
      }
      return ret;
    };

    Lexer.prototype.keywordToken = function() {
      return this.tokenizeFromWord('SELECT') || this.tokenizeFromWord('DISTINCT') || this.tokenizeFromWord('FROM') || this.tokenizeFromWord('WHERE') || this.tokenizeFromWord('GROUP') || this.tokenizeFromWord('ORDER') || this.tokenizeFromWord('BY') || this.tokenizeFromWord('HAVING') || this.tokenizeFromWord('LIMIT') || this.tokenizeFromWord('JOIN') || this.tokenizeFromWord('LEFT') || this.tokenizeFromWord('RIGHT') || this.tokenizeFromWord('INNER') || this.tokenizeFromWord('OUTER') || this.tokenizeFromWord('ON') || this.tokenizeFromWord('AS') || this.tokenizeFromWord('UNION') || this.tokenizeFromWord('ALL');
    };

    Lexer.prototype.dotToken = function() {
      return this.tokenizeFromWord('DOT', '.');
    };

    Lexer.prototype.operatorToken = function() {
      return this.tokenizeFromList('OPERATOR', SQL_OPERATORS);
    };

    Lexer.prototype.mathToken = function() {
      return this.tokenizeFromList('MATH', MATH) || this.tokenizeFromList('MATH_MULTI', MATH_MULTI);
    };

    Lexer.prototype.conditionalToken = function() {
      return this.tokenizeFromList('CONDITIONAL', SQL_CONDITIONALS);
    };

    Lexer.prototype.functionToken = function() {
      return this.tokenizeFromList('FUNCTION', SQL_FUNCTIONS);
    };

    Lexer.prototype.sortOrderToken = function() {
      return this.tokenizeFromList('DIRECTION', SQL_SORT_ORDERS);
    };

    Lexer.prototype.booleanToken = function() {
      return this.tokenizeFromList('BOOLEAN', BOOLEAN);
    };

    Lexer.prototype.starToken = function() {
      return this.tokenizeFromRegex('STAR', STAR);
    };

    Lexer.prototype.seperatorToken = function() {
      return this.tokenizeFromRegex('SEPARATOR', SEPARATOR);
    };

    Lexer.prototype.literalToken = function() {
      return this.tokenizeFromRegex('LITERAL', LITERAL, 1, 0);
    };

    Lexer.prototype.numberToken = function() {
      return this.tokenizeFromRegex('NUMBER', NUMBER);
    };

    Lexer.prototype.stringToken = function() {
      return this.tokenizeFromRegex('STRING', STRING, 1, 0) || this.tokenizeFromRegex('DBLSTRING', DBLSTRING, 1, 0);
    };

    Lexer.prototype.parensToken = function() {
      return this.tokenizeFromRegex('LEFT_PAREN', /^\(/) || this.tokenizeFromRegex('RIGHT_PAREN', /^\)/);
    };

    Lexer.prototype.windowExtension = function() {
      var match;
      match = /^\.(win):(length|time)/i.exec(this.chunk);
      if (!match) return 0;
      this.token('WINDOW', match[1]);
      this.token('WINDOW_FUNCTION', match[2]);
      return match[0].length;
    };

    Lexer.prototype.whitespaceToken = function() {
      var match, newlines, partMatch;
      if (!(match = WHITESPACE.exec(this.chunk))) return 0;
      partMatch = match[0];
      newlines = partMatch.replace(/[^\n]/, '').length;
      this.currentLine += newlines;
      if (this.preserveWhitespace) this.token(name, partMatch);
      return partMatch.length;
    };

    Lexer.prototype.regexEscape = function(str) {
      return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    SQL_KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'AS'];

    SQL_FUNCTIONS = ['AVG', 'COUNT', 'MIN', 'MAX', 'SUM'];

    SQL_SORT_ORDERS = ['ASC', 'DESC'];

    SQL_OPERATORS = ['=', '>', '<', 'LIKE', 'IS NOT', 'IS'];

    SQL_CONDITIONALS = ['AND', 'OR'];

    BOOLEAN = ['TRUE', 'FALSE', 'NULL'];

    MATH = ['+', '-'];

    MATH_MULTI = ['/', '*'];

    STAR = /^\*/;

    SEPARATOR = /^,/;

    WHITESPACE = /^[ \n\r]+/;

    LITERAL = /^`?([a-z_][a-z0-9_]{0,})`?/i;

    NUMBER = /^[0-9]+(\.[0-9]+)?/;

    STRING = /^'([^\\']*(?:\\.[^\\']*)*)'/;

    DBLSTRING = /^"([^\\"]*(?:\\.[^\\"]*)*)"/;

    return Lexer;

  })();

  exports.tokenize = function(sql, opts) {
    return (new Lexer(sql, opts)).tokens;
  };

}).call(this);

};require['./compiled_parser'] = new function() {
  var exports = this;
  /* Jison generated parser */
var parser = (function(){
undefined
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Root":3,"Query":4,"EOF":5,"SelectQuery":6,"Unions":7,"SelectWithLimitQuery":8,"BasicSelectQuery":9,"Select":10,"OrderClause":11,"GroupClause":12,"LimitClause":13,"SelectClause":14,"WhereClause":15,"SELECT":16,"Fields":17,"FROM":18,"Table":19,"DISTINCT":20,"Joins":21,"Literal":22,"LEFT_PAREN":23,"RIGHT_PAREN":24,"WINDOW":25,"WINDOW_FUNCTION":26,"Number":27,"Union":28,"UNION":29,"ALL":30,"Join":31,"JOIN":32,"ON":33,"Expression":34,"LEFT":35,"RIGHT":36,"INNER":37,"OUTER":38,"WHERE":39,"LIMIT":40,"ORDER":41,"BY":42,"OrderArgs":43,"OrderArg":44,"SEPARATOR":45,"Value":46,"DIRECTION":47,"GroupBasicClause":48,"HavingClause":49,"GROUP":50,"ArgumentList":51,"HAVING":52,"MATH":53,"MATH_MULTI":54,"OPERATOR":55,"CONDITIONAL":56,"String":57,"Function":58,"UserFunction":59,"Boolean":60,"NUMBER":61,"BOOLEAN":62,"STRING":63,"DBLSTRING":64,"LITERAL":65,"DOT":66,"FUNCTION":67,"Field":68,"STAR":69,"AS":70,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",16:"SELECT",18:"FROM",20:"DISTINCT",23:"LEFT_PAREN",24:"RIGHT_PAREN",25:"WINDOW",26:"WINDOW_FUNCTION",29:"UNION",30:"ALL",32:"JOIN",33:"ON",35:"LEFT",36:"RIGHT",37:"INNER",38:"OUTER",39:"WHERE",40:"LIMIT",41:"ORDER",42:"BY",45:"SEPARATOR",47:"DIRECTION",50:"GROUP",52:"HAVING",53:"MATH",54:"MATH_MULTI",55:"OPERATOR",56:"CONDITIONAL",61:"NUMBER",62:"BOOLEAN",63:"STRING",64:"DBLSTRING",65:"LITERAL",66:"DOT",67:"FUNCTION",69:"STAR",70:"AS"},
productions_: [0,[3,2],[4,1],[4,2],[6,1],[6,1],[9,1],[9,2],[9,2],[9,3],[8,2],[10,1],[10,2],[14,4],[14,5],[14,5],[14,6],[19,1],[19,3],[19,4],[19,6],[7,1],[7,2],[28,2],[28,3],[21,1],[21,2],[31,4],[31,5],[31,5],[31,6],[31,6],[31,6],[31,6],[15,2],[13,2],[11,3],[43,1],[43,3],[44,1],[44,2],[12,1],[12,2],[48,3],[49,2],[34,3],[34,3],[34,3],[34,3],[34,3],[34,1],[46,1],[46,1],[46,1],[46,1],[46,1],[46,1],[27,1],[60,1],[57,1],[57,1],[22,1],[22,3],[58,4],[59,4],[51,1],[51,3],[17,1],[17,3],[68,1],[68,1],[68,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return this.$ = $$[$0-1];
break;
case 2:this.$ = $$[$0];
break;
case 3:this.$ = (function () {
        $$[$0-1].unions = $$[$0];
        return $$[$0-1];
      }());
break;
case 4:this.$ = $$[$0];
break;
case 5:this.$ = $$[$0];
break;
case 6:this.$ = $$[$0];
break;
case 7:this.$ = (function () {
        $$[$0-1].order = $$[$0];
        return $$[$0-1];
      }());
break;
case 8:this.$ = (function () {
        $$[$0-1].group = $$[$0];
        return $$[$0-1];
      }());
break;
case 9:this.$ = (function () {
        $$[$0-2].group = $$[$0-1];
        $$[$0-2].order = $$[$0];
        return $$[$0-2];
      }());
break;
case 10:this.$ = (function () {
        $$[$0-1].limit = $$[$0];
        return $$[$0-1];
      }());
break;
case 11:this.$ = $$[$0];
break;
case 12:this.$ = (function () {
        $$[$0-1].where = $$[$0];
        return $$[$0-1];
      }());
break;
case 13:this.$ = new yy.Select($$[$0-2], $$[$0], false);
break;
case 14:this.$ = new yy.Select($$[$0-2], $$[$0], true);
break;
case 15:this.$ = new yy.Select($$[$0-3], $$[$0-1], false, $$[$0]);
break;
case 16:this.$ = new yy.Select($$[$0-3], $$[$0-1], true, $$[$0]);
break;
case 17:this.$ = new yy.Table($$[$0]);
break;
case 18:this.$ = new yy.SubSelect($$[$0-1]);
break;
case 19:this.$ = new yy.SubSelect($$[$0-2], $$[$0]);
break;
case 20:this.$ = new yy.Table($$[$0-5], $$[$0-4], $$[$0-3], $$[$0-1]);
break;
case 21:this.$ = [$$[$0]];
break;
case 22:this.$ = $$[$0-1].concat($$[$01]);
break;
case 23:this.$ = new yy.Union($$[$0]);
break;
case 24:this.$ = new yy.Union($$[$0], true);
break;
case 25:this.$ = [$$[$0]];
break;
case 26:this.$ = $$[$0-1].concat($$[$0]);
break;
case 27:this.$ = new yy.Join($$[$0-2], $$[$0]);
break;
case 28:this.$ = new yy.Join($$[$0-2], $$[$0], 'LEFT');
break;
case 29:this.$ = new yy.Join($$[$0-2], $$[$0], 'RIGHT');
break;
case 30:this.$ = new yy.Join($$[$0-2], $$[$0], 'LEFT', 'INNER');
break;
case 31:this.$ = new yy.Join($$[$0-2], $$[$0], 'RIGHT', 'INNER');
break;
case 32:this.$ = new yy.Join($$[$0-2], $$[$0], 'LEFT', 'OUTER');
break;
case 33:this.$ = new yy.Join($$[$0-2], $$[$0], 'RIGHT', 'OUTER');
break;
case 34:this.$ = new yy.Where($$[$0]);
break;
case 35:this.$ = new yy.Limit($$[$0]);
break;
case 36:this.$ = new yy.Order($$[$0]);
break;
case 37:this.$ = [$$[$0]];
break;
case 38:this.$ = $$[$0-2].concat($$[$0]);
break;
case 39:this.$ = new yy.OrderArgument($$[$0], 'ASC');
break;
case 40:this.$ = new yy.OrderArgument($$[$0-1], $$[$0]);
break;
case 41:this.$ = $$[$0];
break;
case 42:this.$ = (function () {
        $$[$0-1].having = $$[$0];
        return $$[$0-1];
      }());
break;
case 43:this.$ = new yy.Group($$[$0]);
break;
case 44:this.$ = new yy.Having($$[$0]);
break;
case 45:this.$ = $$[$0-1];
break;
case 46:this.$ = new yy.Op($$[$0-1], $$[$0-2], $$[$0]);
break;
case 47:this.$ = new yy.Op($$[$0-1], $$[$0-2], $$[$0]);
break;
case 48:this.$ = new yy.Op($$[$0-1], $$[$0-2], $$[$0]);
break;
case 49:this.$ = new yy.Op($$[$0-1], $$[$0-2], $$[$0]);
break;
case 50:this.$ = $$[$0];
break;
case 51:this.$ = $$[$0];
break;
case 52:this.$ = $$[$0];
break;
case 53:this.$ = $$[$0];
break;
case 54:this.$ = $$[$0];
break;
case 55:this.$ = $$[$0];
break;
case 56:this.$ = $$[$0];
break;
case 57:this.$ = new yy.NumberValue($$[$0]);
break;
case 58:this.$ = new yy.BooleanValue($$[$0]);
break;
case 59:this.$ = new yy.StringValue($$[$0], "'");
break;
case 60:this.$ = new yy.StringValue($$[$0], '"');
break;
case 61:this.$ = new yy.LiteralValue($$[$0]);
break;
case 62:this.$ = new yy.LiteralValue($$[$0-2], $$[$0]);
break;
case 63:this.$ = new yy.FunctionValue($$[$0-3], $$[$0-1]);
break;
case 64:this.$ = new yy.FunctionValue($$[$0-3], $$[$0-1], true);
break;
case 65:this.$ = [$$[$0]];
break;
case 66:this.$ = $$[$0-2].concat($$[$0]);
break;
case 67:this.$ = [$$[$0]];
break;
case 68:this.$ = $$[$0-2].concat($$[$0]);
break;
case 69:this.$ = new yy.Star();
break;
case 70:this.$ = new yy.Field($$[$0]);
break;
case 71:this.$ = new yy.Field($$[$0-2], $$[$0]);
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:5,10:6,14:7,16:[1,8]},{1:[3]},{5:[1,9]},{5:[2,2],7:10,13:11,24:[2,2],28:12,29:[1,14],40:[1,13]},{5:[2,4],24:[2,4],29:[2,4],40:[2,4]},{5:[2,5],24:[2,5],29:[2,5],40:[2,5]},{5:[2,6],11:15,12:16,24:[2,6],29:[2,6],40:[2,6],41:[1,17],48:18,50:[1,19]},{5:[2,11],15:20,24:[2,11],29:[2,11],39:[1,21],40:[2,11],41:[2,11],50:[2,11]},{17:22,20:[1,23],22:29,23:[1,27],27:30,34:26,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39],68:24,69:[1,25]},{1:[2,1]},{5:[2,3],24:[2,3],28:41,29:[1,14]},{5:[2,10],24:[2,10],29:[2,10],40:[2,10]},{5:[2,21],24:[2,21],29:[2,21]},{27:42,61:[1,36]},{6:43,8:4,9:5,10:6,14:7,16:[1,8],30:[1,44]},{5:[2,7],24:[2,7],29:[2,7],40:[2,7]},{5:[2,8],11:45,24:[2,8],29:[2,8],40:[2,8],41:[1,17]},{42:[1,46]},{5:[2,41],24:[2,41],29:[2,41],40:[2,41],41:[2,41],49:47,52:[1,48]},{42:[1,49]},{5:[2,12],24:[2,12],29:[2,12],40:[2,12],41:[2,12],50:[2,12]},{22:29,23:[1,27],27:30,34:50,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{18:[1,51],45:[1,52]},{17:53,22:29,23:[1,27],27:30,34:26,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39],68:24,69:[1,25]},{18:[2,67],45:[2,67]},{18:[2,69],45:[2,69]},{18:[2,70],45:[2,70],53:[1,55],54:[1,56],55:[1,57],56:[1,58],70:[1,54]},{22:29,23:[1,27],27:30,34:59,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,50],18:[2,50],24:[2,50],29:[2,50],32:[2,50],35:[2,50],36:[2,50],39:[2,50],40:[2,50],41:[2,50],45:[2,50],50:[2,50],52:[2,50],53:[2,50],54:[2,50],55:[2,50],56:[2,50],70:[2,50]},{5:[2,51],18:[2,51],24:[2,51],29:[2,51],32:[2,51],35:[2,51],36:[2,51],39:[2,51],40:[2,51],41:[2,51],45:[2,51],47:[2,51],50:[2,51],52:[2,51],53:[2,51],54:[2,51],55:[2,51],56:[2,51],66:[1,60],70:[2,51]},{5:[2,52],18:[2,52],24:[2,52],29:[2,52],32:[2,52],35:[2,52],36:[2,52],39:[2,52],40:[2,52],41:[2,52],45:[2,52],47:[2,52],50:[2,52],52:[2,52],53:[2,52],54:[2,52],55:[2,52],56:[2,52],70:[2,52]},{5:[2,53],18:[2,53],24:[2,53],29:[2,53],32:[2,53],35:[2,53],36:[2,53],39:[2,53],40:[2,53],41:[2,53],45:[2,53],47:[2,53],50:[2,53],52:[2,53],53:[2,53],54:[2,53],55:[2,53],56:[2,53],70:[2,53]},{5:[2,54],18:[2,54],24:[2,54],29:[2,54],32:[2,54],35:[2,54],36:[2,54],39:[2,54],40:[2,54],41:[2,54],45:[2,54],47:[2,54],50:[2,54],52:[2,54],53:[2,54],54:[2,54],55:[2,54],56:[2,54],70:[2,54]},{5:[2,55],18:[2,55],24:[2,55],29:[2,55],32:[2,55],35:[2,55],36:[2,55],39:[2,55],40:[2,55],41:[2,55],45:[2,55],47:[2,55],50:[2,55],52:[2,55],53:[2,55],54:[2,55],55:[2,55],56:[2,55],70:[2,55]},{5:[2,56],18:[2,56],24:[2,56],29:[2,56],32:[2,56],35:[2,56],36:[2,56],39:[2,56],40:[2,56],41:[2,56],45:[2,56],47:[2,56],50:[2,56],52:[2,56],53:[2,56],54:[2,56],55:[2,56],56:[2,56],70:[2,56]},{5:[2,61],18:[2,61],23:[1,61],24:[2,61],29:[2,61],32:[2,61],35:[2,61],36:[2,61],39:[2,61],40:[2,61],41:[2,61],45:[2,61],47:[2,61],50:[2,61],52:[2,61],53:[2,61],54:[2,61],55:[2,61],56:[2,61],66:[2,61],70:[2,61]},{5:[2,57],18:[2,57],24:[2,57],29:[2,57],32:[2,57],35:[2,57],36:[2,57],39:[2,57],40:[2,57],41:[2,57],45:[2,57],47:[2,57],50:[2,57],52:[2,57],53:[2,57],54:[2,57],55:[2,57],56:[2,57],70:[2,57]},{5:[2,59],18:[2,59],24:[2,59],29:[2,59],32:[2,59],35:[2,59],36:[2,59],39:[2,59],40:[2,59],41:[2,59],45:[2,59],47:[2,59],50:[2,59],52:[2,59],53:[2,59],54:[2,59],55:[2,59],56:[2,59],70:[2,59]},{5:[2,60],18:[2,60],24:[2,60],29:[2,60],32:[2,60],35:[2,60],36:[2,60],39:[2,60],40:[2,60],41:[2,60],45:[2,60],47:[2,60],50:[2,60],52:[2,60],53:[2,60],54:[2,60],55:[2,60],56:[2,60],70:[2,60]},{23:[1,62]},{5:[2,58],18:[2,58],24:[2,58],29:[2,58],32:[2,58],35:[2,58],36:[2,58],39:[2,58],40:[2,58],41:[2,58],45:[2,58],47:[2,58],50:[2,58],52:[2,58],53:[2,58],54:[2,58],55:[2,58],56:[2,58],70:[2,58]},{5:[2,22],24:[2,22],29:[2,22]},{5:[2,35],24:[2,35],29:[2,35],40:[2,35]},{5:[2,23],13:11,24:[2,23],29:[2,23],40:[1,13]},{6:63,8:4,9:5,10:6,14:7,16:[1,8]},{5:[2,9],24:[2,9],29:[2,9],40:[2,9]},{22:29,27:30,43:64,44:65,46:66,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,42],24:[2,42],29:[2,42],40:[2,42],41:[2,42]},{22:29,23:[1,27],27:30,34:67,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:69,46:28,51:68,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,34],24:[2,34],29:[2,34],40:[2,34],41:[2,34],50:[2,34],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{19:70,22:71,23:[1,72],65:[1,73]},{22:29,23:[1,27],27:30,34:26,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39],68:74,69:[1,25]},{18:[1,75],45:[1,52]},{22:76,65:[1,73]},{22:29,23:[1,27],27:30,34:77,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:78,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:79,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:80,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{24:[1,81],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{65:[1,82]},{22:29,23:[1,27],27:30,34:69,46:28,51:83,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:69,46:28,51:84,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,24],13:11,24:[2,24],29:[2,24],40:[1,13]},{5:[2,36],24:[2,36],29:[2,36],40:[2,36],45:[1,85]},{5:[2,37],24:[2,37],29:[2,37],40:[2,37],45:[2,37]},{5:[2,39],24:[2,39],29:[2,39],40:[2,39],45:[2,39],47:[1,86]},{5:[2,44],24:[2,44],29:[2,44],40:[2,44],41:[2,44],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{5:[2,43],24:[2,43],29:[2,43],40:[2,43],41:[2,43],45:[1,87],52:[2,43]},{5:[2,65],24:[2,65],29:[2,65],40:[2,65],41:[2,65],45:[2,65],52:[2,65],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{5:[2,13],21:88,24:[2,13],29:[2,13],31:89,32:[1,90],35:[1,91],36:[1,92],39:[2,13],40:[2,13],41:[2,13],50:[2,13]},{5:[2,17],24:[2,17],25:[1,93],29:[2,17],32:[2,17],33:[2,17],35:[2,17],36:[2,17],39:[2,17],40:[2,17],41:[2,17],50:[2,17],66:[1,60]},{4:94,6:3,8:4,9:5,10:6,14:7,16:[1,8]},{5:[2,61],18:[2,61],24:[2,61],25:[2,61],29:[2,61],32:[2,61],33:[2,61],35:[2,61],36:[2,61],39:[2,61],40:[2,61],41:[2,61],45:[2,61],50:[2,61],66:[2,61]},{18:[2,68],45:[2,68]},{19:95,22:71,23:[1,72],65:[1,73]},{18:[2,71],45:[2,71],66:[1,60]},{5:[2,46],18:[2,46],24:[2,46],29:[2,46],32:[2,46],35:[2,46],36:[2,46],39:[2,46],40:[2,46],41:[2,46],45:[2,46],50:[2,46],52:[2,46],53:[2,46],54:[1,56],55:[2,46],56:[2,46],70:[2,46]},{5:[2,47],18:[2,47],24:[2,47],29:[2,47],32:[2,47],35:[2,47],36:[2,47],39:[2,47],40:[2,47],41:[2,47],45:[2,47],50:[2,47],52:[2,47],53:[2,47],54:[2,47],55:[2,47],56:[2,47],70:[2,47]},{5:[2,48],18:[2,48],24:[2,48],29:[2,48],32:[2,48],35:[2,48],36:[2,48],39:[2,48],40:[2,48],41:[2,48],45:[2,48],50:[2,48],52:[2,48],53:[1,55],54:[1,56],55:[2,48],56:[2,48],70:[2,48]},{5:[2,49],18:[2,49],24:[2,49],29:[2,49],32:[2,49],35:[2,49],36:[2,49],39:[2,49],40:[2,49],41:[2,49],45:[2,49],50:[2,49],52:[2,49],53:[1,55],54:[1,56],55:[1,57],56:[2,49],70:[2,49]},{5:[2,45],18:[2,45],24:[2,45],29:[2,45],32:[2,45],35:[2,45],36:[2,45],39:[2,45],40:[2,45],41:[2,45],45:[2,45],50:[2,45],52:[2,45],53:[2,45],54:[2,45],55:[2,45],56:[2,45],70:[2,45]},{5:[2,62],18:[2,62],24:[2,62],25:[2,62],29:[2,62],32:[2,62],33:[2,62],35:[2,62],36:[2,62],39:[2,62],40:[2,62],41:[2,62],45:[2,62],47:[2,62],50:[2,62],52:[2,62],53:[2,62],54:[2,62],55:[2,62],56:[2,62],66:[2,62],70:[2,62]},{24:[1,96],45:[1,87]},{24:[1,97],45:[1,87]},{22:29,27:30,44:98,46:66,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,40],24:[2,40],29:[2,40],40:[2,40],45:[2,40]},{22:29,27:30,46:99,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,15],24:[2,15],29:[2,15],31:100,32:[1,90],35:[1,91],36:[1,92],39:[2,15],40:[2,15],41:[2,15],50:[2,15]},{5:[2,25],24:[2,25],29:[2,25],32:[2,25],35:[2,25],36:[2,25],39:[2,25],40:[2,25],41:[2,25],50:[2,25]},{19:101,22:71,23:[1,72],65:[1,73]},{32:[1,102],37:[1,103],38:[1,104]},{32:[1,105],37:[1,106],38:[1,107]},{26:[1,108]},{24:[1,109]},{5:[2,14],21:110,24:[2,14],29:[2,14],31:89,32:[1,90],35:[1,91],36:[1,92],39:[2,14],40:[2,14],41:[2,14],50:[2,14]},{5:[2,64],18:[2,64],24:[2,64],29:[2,64],32:[2,64],35:[2,64],36:[2,64],39:[2,64],40:[2,64],41:[2,64],45:[2,64],47:[2,64],50:[2,64],52:[2,64],53:[2,64],54:[2,64],55:[2,64],56:[2,64],70:[2,64]},{5:[2,63],18:[2,63],24:[2,63],29:[2,63],32:[2,63],35:[2,63],36:[2,63],39:[2,63],40:[2,63],41:[2,63],45:[2,63],47:[2,63],50:[2,63],52:[2,63],53:[2,63],54:[2,63],55:[2,63],56:[2,63],70:[2,63]},{5:[2,38],24:[2,38],29:[2,38],40:[2,38],45:[2,38]},{5:[2,66],24:[2,66],29:[2,66],40:[2,66],41:[2,66],45:[2,66],52:[2,66]},{5:[2,26],24:[2,26],29:[2,26],32:[2,26],35:[2,26],36:[2,26],39:[2,26],40:[2,26],41:[2,26],50:[2,26]},{33:[1,111]},{19:112,22:71,23:[1,72],65:[1,73]},{32:[1,113]},{32:[1,114]},{19:115,22:71,23:[1,72],65:[1,73]},{32:[1,116]},{32:[1,117]},{23:[1,118]},{5:[2,18],22:119,24:[2,18],29:[2,18],32:[2,18],33:[2,18],35:[2,18],36:[2,18],39:[2,18],40:[2,18],41:[2,18],50:[2,18],65:[1,73]},{5:[2,16],24:[2,16],29:[2,16],31:100,32:[1,90],35:[1,91],36:[1,92],39:[2,16],40:[2,16],41:[2,16],50:[2,16]},{22:29,23:[1,27],27:30,34:120,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{33:[1,121]},{19:122,22:71,23:[1,72],65:[1,73]},{19:123,22:71,23:[1,72],65:[1,73]},{33:[1,124]},{19:125,22:71,23:[1,72],65:[1,73]},{19:126,22:71,23:[1,72],65:[1,73]},{27:127,61:[1,36]},{5:[2,19],24:[2,19],29:[2,19],32:[2,19],33:[2,19],35:[2,19],36:[2,19],39:[2,19],40:[2,19],41:[2,19],50:[2,19],66:[1,60]},{5:[2,27],24:[2,27],29:[2,27],32:[2,27],35:[2,27],36:[2,27],39:[2,27],40:[2,27],41:[2,27],50:[2,27],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{22:29,23:[1,27],27:30,34:128,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{33:[1,129]},{33:[1,130]},{22:29,23:[1,27],27:30,34:131,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{33:[1,132]},{33:[1,133]},{24:[1,134]},{5:[2,28],24:[2,28],29:[2,28],32:[2,28],35:[2,28],36:[2,28],39:[2,28],40:[2,28],41:[2,28],50:[2,28],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{22:29,23:[1,27],27:30,34:135,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:136,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,29],24:[2,29],29:[2,29],32:[2,29],35:[2,29],36:[2,29],39:[2,29],40:[2,29],41:[2,29],50:[2,29],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{22:29,23:[1,27],27:30,34:137,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{22:29,23:[1,27],27:30,34:138,46:28,57:31,58:32,59:33,60:34,61:[1,36],62:[1,40],63:[1,37],64:[1,38],65:[1,35],67:[1,39]},{5:[2,20],24:[2,20],29:[2,20],32:[2,20],33:[2,20],35:[2,20],36:[2,20],39:[2,20],40:[2,20],41:[2,20],50:[2,20]},{5:[2,30],24:[2,30],29:[2,30],32:[2,30],35:[2,30],36:[2,30],39:[2,30],40:[2,30],41:[2,30],50:[2,30],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{5:[2,32],24:[2,32],29:[2,32],32:[2,32],35:[2,32],36:[2,32],39:[2,32],40:[2,32],41:[2,32],50:[2,32],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{5:[2,31],24:[2,31],29:[2,31],32:[2,31],35:[2,31],36:[2,31],39:[2,31],40:[2,31],41:[2,31],50:[2,31],53:[1,55],54:[1,56],55:[1,57],56:[1,58]},{5:[2,33],24:[2,33],29:[2,33],32:[2,33],35:[2,33],36:[2,33],39:[2,33],40:[2,33],41:[2,33],50:[2,33],53:[1,55],54:[1,56],55:[1,57],56:[1,58]}],
defaultActions: {9:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}
};require['./nodes'] = new function() {
  var exports = this;
  (function() {
  var Field, FunctionValue, Group, Having, Join, Limit, LiteralValue, Op, Order, OrderArgument, Select, Star, StringValue, SubSelect, Table, Union, Where, indent;

  indent = function(str) {
    var line;
    return ((function() {
      var _i, _len, _ref, _results;
      _ref = str.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        _results.push("  " + line);
      }
      return _results;
    })()).join("\n");
  };

  exports.Select = Select = (function() {

    function Select(fields, source, distinct, joins, unions) {
      this.fields = fields;
      this.source = source;
      this.distinct = distinct != null ? distinct : false;
      this.joins = joins != null ? joins : [];
      this.unions = unions != null ? unions : [];
      this.order = null;
      this.group = null;
      this.where = null;
      this.limit = null;
    }

    Select.prototype.toString = function() {
      var join, ret, union, _i, _j, _len, _len2, _ref, _ref2;
      ret = ["SELECT " + (this.fields.join(', '))];
      ret.push(indent("FROM " + this.source));
      _ref = this.joins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        join = _ref[_i];
        ret.push(indent(join.toString()));
      }
      if (this.where) ret.push(indent(this.where.toString()));
      if (this.group) ret.push(indent(this.group.toString()));
      if (this.order) ret.push(indent(this.order.toString()));
      if (this.limit) ret.push(indent(this.limit.toString()));
      _ref2 = this.unions;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        union = _ref2[_j];
        ret.push(union.toString());
      }
      return ret.join("\n");
    };

    return Select;

  })();

  exports.SubSelect = SubSelect = (function() {

    function SubSelect(select, name) {
      this.select = select;
      this.name = name != null ? name : null;
      null;
    }

    SubSelect.prototype.toString = function() {
      var ret;
      ret = [];
      ret.push('(');
      ret.push(indent(this.select.toString()));
      ret.push(this.name ? ") " + (this.name.toString()) : ")");
      return ret.join("\n");
    };

    return SubSelect;

  })();

  exports.Join = Join = (function() {

    function Join(right, conditions, side, mode) {
      this.right = right;
      this.conditions = conditions != null ? conditions : null;
      this.side = side != null ? side : null;
      this.mode = mode != null ? mode : null;
      null;
    }

    Join.prototype.toString = function() {
      var ret;
      ret = '';
      if (this.side != null) ret += "" + this.side + " ";
      if (this.mode != null) ret += "" + this.mode + " ";
      return ret + ("JOIN " + this.right + "\n") + indent("ON " + this.conditions);
    };

    return Join;

  })();

  exports.Union = Union = (function() {

    function Union(query, all) {
      this.query = query;
      this.all = all != null ? all : false;
      null;
    }

    Union.prototype.toString = function() {
      var all;
      all = this.all ? ' ALL' : '';
      return "UNION" + all + "\n" + (this.query.toString());
    };

    return Union;

  })();

  exports.LiteralValue = LiteralValue = (function() {

    function LiteralValue(value, value2) {
      this.value = value;
      this.value2 = value2 != null ? value2 : null;
      if (this.value2) {
        this.nested = true;
        this.values = this.value.values;
        this.values.push(value2);
      } else {
        this.nested = false;
        this.values = [this.value];
      }
    }

    LiteralValue.prototype.toString = function() {
      return "`" + (this.values.join('.')) + "`";
    };

    return LiteralValue;

  })();

  exports.StringValue = StringValue = (function() {

    function StringValue(value, quoteType) {
      this.value = value;
      this.quoteType = quoteType != null ? quoteType : "''";
      null;
    }

    StringValue.prototype.toString = function() {
      return "" + this.quoteType + this.value + this.quoteType;
    };

    return StringValue;

  })();

  exports.NumberValue = LiteralValue = (function() {

    function LiteralValue(value) {
      this.value = Number(value);
    }

    LiteralValue.prototype.toString = function() {
      return this.value.toString();
    };

    return LiteralValue;

  })();

  exports.BooleanValue = LiteralValue = (function() {

    function LiteralValue(value) {
      this.value = (function() {
        switch (value.toLowerCase()) {
          case 'true':
            return true;
          case 'false':
            return false;
          default:
            return null;
        }
      })();
    }

    LiteralValue.prototype.toString = function() {
      if (this.value != null) {
        return this.value.toString().toUpperCase();
      } else {
        return 'NULL';
      }
    };

    return LiteralValue;

  })();

  exports.FunctionValue = FunctionValue = (function() {

    function FunctionValue(name, _arguments, udf) {
      this.name = name;
      this.arguments = _arguments != null ? _arguments : [];
      this.udf = udf != null ? udf : false;
      null;
    }

    FunctionValue.prototype.toString = function() {
      return "" + this.name + "(" + (this.arguments.join(', ')) + ")";
    };

    return FunctionValue;

  })();

  exports.Order = Order = (function() {

    function Order(orderings) {
      this.orderings = orderings;
    }

    Order.prototype.toString = function() {
      return "ORDER BY " + (this.orderings.join(', '));
    };

    return Order;

  })();

  exports.OrderArgument = OrderArgument = (function() {

    function OrderArgument(value, direction) {
      this.value = value;
      this.direction = direction != null ? direction : 'ASC';
      null;
    }

    OrderArgument.prototype.toString = function() {
      return "" + this.value + " " + this.direction;
    };

    return OrderArgument;

  })();

  exports.Limit = Limit = (function() {

    function Limit(value) {
      this.value = value;
      null;
    }

    Limit.prototype.toString = function() {
      return "LIMIT " + this.value;
    };

    return Limit;

  })();

  exports.Table = Table = (function() {

    function Table(name, win, winFn, winArg) {
      this.name = name;
      this.win = win != null ? win : null;
      this.winFn = winFn != null ? winFn : null;
      this.winArg = winArg != null ? winArg : null;
      null;
    }

    Table.prototype.toString = function() {
      if (this.win) {
        return "" + this.name + "." + this.win + ":" + this.winFn + "(" + this.winArg + ")";
      } else {
        return this.name.toString();
      }
    };

    return Table;

  })();

  exports.Group = Group = (function() {

    function Group(fields) {
      this.fields = fields;
      this.having = null;
    }

    Group.prototype.toString = function() {
      var ret;
      ret = ["GROUP BY " + (this.fields.join(', '))];
      if (this.having) ret.push(this.having.toString());
      return ret.join("\n");
    };

    return Group;

  })();

  exports.Where = Where = (function() {

    function Where(conditions) {
      this.conditions = conditions;
      null;
    }

    Where.prototype.toString = function() {
      return "WHERE " + this.conditions;
    };

    return Where;

  })();

  exports.Having = Having = (function() {

    function Having(conditions) {
      this.conditions = conditions;
      null;
    }

    Having.prototype.toString = function() {
      return "HAVING " + this.conditions;
    };

    return Having;

  })();

  exports.Op = Op = (function() {

    function Op(operation, left, right) {
      this.operation = operation;
      this.left = left;
      this.right = right;
      null;
    }

    Op.prototype.toString = function() {
      return "(" + this.left + " " + this.operation + " " + this.right + ")";
    };

    return Op;

  })();

  exports.Field = Field = (function() {

    function Field(field, name) {
      this.field = field;
      this.name = name != null ? name : null;
      null;
    }

    Field.prototype.toString = function() {
      if (this.name) {
        return "" + this.field + " AS " + this.name;
      } else {
        return this.field.toString();
      }
    };

    return Field;

  })();

  exports.Star = Star = (function() {

    function Star() {
      null;
    }

    Star.prototype.toString = function() {
      return '*';
    };

    Star.prototype.star = true;

    return Star;

  })();

}).call(this);

};require['./parser'] = new function() {
  var exports = this;
  (function() {
  var buildParser;

  buildParser = function() {
    var parser;
    parser = require('./compiled_parser').parser;
    parser.lexer = {
      lex: function() {
        var tag, _ref;
        _ref = this.tokens[this.pos++] || [''], tag = _ref[0], this.yytext = _ref[1], this.yylineno = _ref[2];
        return tag;
      },
      setInput: function(tokens) {
        this.tokens = tokens;
        return this.pos = 0;
      },
      upcomingInput: function() {
        return "";
      }
    };
    parser.yy = require('./nodes');
    return parser;
  };

  exports.parser = buildParser();

  exports.parse = function(str) {
    return buildParser().parse(str);
  };

}).call(this);

};require['./sql_parser'] = new function() {
  var exports = this;
  (function() {

  exports.lexer = require('./lexer');

  exports.parser = require('./parser');

  exports.nodes = require('./nodes');

  exports.parse = function(sql) {
    return exports.parser.parse(exports.lexer.tokenize(sql));
  };

}).call(this);

};
    return require['./sql_parser']
  }();

  if(typeof define === 'function' && define.amd) {
    define(function() { return SQLParser });
  } else { root.SQLParser = SQLParser }
}(this));