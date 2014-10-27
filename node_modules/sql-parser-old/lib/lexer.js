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
