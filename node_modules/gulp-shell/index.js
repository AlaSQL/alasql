var _ = require('lodash')
var async = require('async')
var exec = require('child_process').exec
var gutil = require('gulp-util')
var path = require('path')
var through = require('through2')

var PLUGIN_NAME = 'gulp-shell'

function shell(commands, options) {
  if (typeof commands === 'string') {
    commands = [commands]
  }

  if (!Array.isArray(commands)) {
    throw new gutil.PluginError(PLUGIN_NAME, 'Missing commands')
  }

  options = _.extend({
    ignoreErrors: false,
    errorMessage: 'Command `<%= command %>` failed with exit code <%= error.code %>',
    quiet: false,
    cwd: process.cwd(),
    maxBuffer: 16 * 1024 * 1024
  }, options)

  var pathToBin = path.join(process.cwd(), 'node_modules/.bin')
  var PATH = pathToBin + path.delimiter + process.env.PATH
  options.env = _.extend({}, process.env, {PATH: PATH}, options.env)

  var stream = through.obj(function (file, unused, done) {
    var self = this

    async.eachSeries(commands, function (command, done) {
      var context = _.extend({file: file}, options.templateData)
      command = gutil.template(command, context)

      var child = exec(command, {
        env: options.env,
        cwd: options.cwd,
        maxBuffer: options.maxBuffer
      }, function (error, stdout, stderr) {
        process.stdin.unpipe(child.stdin)
        process.stdin.resume()
        process.stdin.pause()

        if (error && !options.ignoreErrors) {
          error.stdout = stdout
          error.stderr = stderr

          var errorContext = _.extend({
            command: command,
            file: file,
            error: error
          }, options.templateData)

          error.message = gutil.template(options.errorMessage, errorContext)
        }

        done(options.ignoreErrors ? null : error)
      })

      process.stdin.resume()
      process.stdin.setEncoding('utf8')
      process.stdin.pipe(child.stdin)

      if (!options.quiet) {
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
      }
    }, function (error) {
      if (error) {
        self.emit('error', new gutil.PluginError({
          plugin: PLUGIN_NAME,
          message: error.message
        }))
      } else {
        self.push(file)
      }
      done()
    })
  })

  stream.resume()

  return stream
}

shell.task = function (commands, options) {
  return function () {
    var stream = shell(commands, options)

    stream.write(new gutil.File())
    stream.end()

    return stream
  }
}

module.exports = shell
