{spawn, exec} = require 'child_process'
fs = require('fs')

run = (args, cb) ->
  proc =         spawn 'coffee', args
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.on        'exit', (status) ->
    process.exit(1) if status != 0
    cb() if typeof cb is 'function'

build = (cb) ->
  files = fs.readdirSync 'src'
  files = ('src/' + file for file in files when file.match(/\.coffee$/))
  run ['-c', '-o', 'lib'].concat(files), cb

task 'build', 'Run full build', ->
  invoke 'build:compile'
  invoke 'build:parser'
  setTimeout (-> invoke 'build:browser'), 100

task 'build:compile', 'Compile all coffee files to js', 
  build
    
task 'build:parser', 'rebuild the Jison parser', ->
  parser = require('./src/grammar').parser
  fs.writeFileSync 'lib/compiled_parser.js', parser.generate()

task 'build:browser', 'Build a single JS file suitable for use in the browser', ->
  code = ''
  for name in ['lexer', 'compiled_parser', 'nodes', 'parser', 'sql_parser']
    code += """
      require['./#{name}'] = new function() {
        var exports = this;
        #{fs.readFileSync "lib/#{name}.js"}
      };
    """
  code = """
    (function(root) {
      var SQLParser = function() {
        function require(path){ return require[path]; }
        #{code}
        return require['./sql_parser']
      }();

      if(typeof define === 'function' && define.amd) {
        define(function() { return SQLParser });
      } else { root.SQLParser = SQLParser }
    }(this));
  """
  fs.writeFileSync './browser/sql-parser.js', code
  
  
  