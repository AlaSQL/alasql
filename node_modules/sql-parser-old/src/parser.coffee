buildParser = ->

  parser = require('./compiled_parser').parser

  parser.lexer =
    lex: ->
      [tag, @yytext, @yylineno] = @tokens[@pos++] or ['']
      tag
    setInput: (@tokens) -> @pos = 0
    upcomingInput: -> ""
    
  parser.yy = require('./nodes')
  
  return parser
  
exports.parser = buildParser()

exports.parse = (str) -> buildParser().parse(str)  