# gulp-shell

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][david-dm-image]][david-dm-url]

[npm-url]:         https://badge.fury.io/js/gulp-shell
[npm-image]:       https://badge.fury.io/js/gulp-shell.png
[travis-url]:      https://travis-ci.org/sun-zheng-an/gulp-shell
[travis-image]:    https://travis-ci.org/sun-zheng-an/gulp-shell.png?branch=master
[coveralls-url]:   https://coveralls.io/r/sun-zheng-an/gulp-shell
[coveralls-image]: https://coveralls.io/repos/sun-zheng-an/gulp-shell/badge.png?branch=master
[david-dm-url]:    https://david-dm.org/sun-zheng-an/gulp-shell
[david-dm-image]:  https://david-dm.org/sun-zheng-an/gulp-shell.png?theme=shields.io

> A handy command line interface for gulp

## Installation

```shell
npm install --save-dev gulp-shell
```

## Usage

```js
var gulp  = require('gulp')
var shell = require('gulp-shell')

gulp.task('example', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'echo <%= f(file.path) %>',
      'ls -l <%= file.path %>'
    ], {
      templateData: {
        f: function (s) {
          return s.replace(/$/, '.bak')
        }
      }
    }))
})
```

If you just want to execute a series of commands only once, starting the stream with `gulp.src('')` should do the trick.

Or you can use this shorthand:

```js
gulp.task('shorthand', shell.task([
  'echo hello',
  'echo world'
]))
```

You can find more examples in the [gulpfile][] of this project.

[gulpfile]: https://github.com/sun-zheng-an/gulp-shell/blob/master/gulpfile.js

## API

### shell(commands, options) or shell.task(commands, options)

#### commands

type: `Array` or `String`

A command can be a [template][] which can be interpolated by some [file][] info (e.g. `file.path`).

[template]: http://lodash.com/docs#template
[file]:     https://github.com/wearefractal/vinyl

#### options.errorMessage

type: `String`

default: ``Command `<%= command %>` failed with exit code <%= error.code %>``

You can add a custom error message for when the command fails.
This can be a [template][] which can be interpolated with the current `command`, some [file][] info (e.g. `file.path`) and some [error][] info (e.g. `error.code`).

[error]: http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

#### options.ignoreErrors

type: `Boolean`

default: `false`

By default, it will emit an `error` event when the command finishes unsuccessfully.

#### options.quiet

type: `Boolean`

default: `false`

By default, it will print the command output.

#### options.cwd

type: `String`

default: [`process.cwd()`](http://nodejs.org/api/process.html#process_process_cwd)

Sets the current working directory for the command.

#### options.templateData

type: `Object`

The data that can be accessed in template.

#### options.maxBuffer

type: `Number`

default: 16MB(16 * 1024 * 1024)

You won't need to set this option unless you encounter a "stdout maxBuffer exceeded" error.

#### options.timeout

type: `Number`

default: undefined (no timeout)

The maximum amount of time in milliseconds the process is allowed to run.

#### options.env

type: `Object`

By default, all the commands will be executed in an environment with all the variables in [`process.env`](http://nodejs.org/api/process.html#process_process_env) and `PATH` prepended by `./node_modules/.bin` (allowing you to run executables in your Node's dependencies).

You can override any environment variables with this option.

For example, setting it to `{PATH: process.env.PATH}` will reset the `PATH` if the default one brings your some troubles.
