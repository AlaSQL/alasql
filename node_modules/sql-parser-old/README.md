SQL Parser
==========

SQL Parser is a lexer, grammar and parser for SQL written in JS. Currently it is only capable of parsing fairly basic SELECT queries but full SQL support will hopefully come in time. See the specs for examples of currently supported queries.

Lexer
-----

The lexer takes a SQL query string as input and returns a stream of tokens in the format 

    ['NAME', 'value', lineNumber]

Here is a simple example...

    lexer.tokenize('select * from my_table')

    [
      ['SELECT','select',1], 
      ['STAR','*',1], 
      ['FROM','from',1], 
      ['LITERAL','my_table',1]
    ]

The tokenized output is in a format compatible with JISON.


Parser
------

The parser only currently supports SELECT queries but is able to produce a Select object with properties for where, group, order, limit. See lib/nodes.coffee for more info of the returned object structure. Calling .toString() on a Select object should give you back a well formatted version of the original SQL input.

    tokens = lexer.tokenize('select * from my_table where foo = 'bar')
    parser.parse(tokens).toString()

    SELECT *
      FROM `my_table`
      WHERE `foo` = 'bar'
    


Credits
-------

A lot of the boilerplate and compilation code in this project is borrowed from the CoffeeScript project as it was the best example of a project using JISON that I could find. Thanks.