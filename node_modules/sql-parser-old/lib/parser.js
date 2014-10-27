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
