gulp-jison-lex
==============

Jison-lex plugin for gulp


Installation
------------

You can install gulp-jison-lex via `npm install`:

`npm install gulp-jison-lex`


Example
-------

```javascript
var gulp = require('gulp');
var jisonLex = require('gulp-jison-lex');

gulp.task('jisonlex', function () {
    return gulp.src('src/grammar.jisonlex')
        .pipe(jisonLex())
        .pipe(gulp.dest('dist'));
});
```


Usage
-----

`jisonLex([options])`

gulp-jison-lex currently supports the options below:
 * `Boolean json`: Parses the input files as JSON files (Default: `false`)
 * `String outFile`: Output file path (Default: `<input_file_name>.js`)
 * `String moduleName`: The name of the module to generate (Default: `lexer`)
 * `String moduleType`: The type of the module to generate. Can be either `js`, `amd` or `commonjs` (Default: `js`)

Template
--------

gulp-jison-lex supports templates (see [gutil.template](https://github.com/gulpjs/gulp-util#templatestring-data)).
Currently supported variables:

 * [`Object file`](https://github.com/wearefractal/vinyl#file)
 * `Object path`
   * [`String dirname`](http://nodejs.org/api/path.html#path_path_dirname_p)
   * [`String basename`](http://nodejs.org/api/path.html#path_path_basename_p_ext)
   * [`String extname`](http://nodejs.org/api/path.html#path_path_extname_p)

##### Example

```javascript
var gulp = require('gulp');
var jisonLex = require('gulp-jison-lex');

gulp.task('jisonlex', function () {
    return gulp.src('src/grammar.jisonlex')
        .pipe(jisonLex({
            outFile: '<%= path.basename %>.js', // Will produce 'grammar.js'
            moduleName: '<%= path.basename %>' // Will produce 'grammar'
        }))
        .pipe(gulp.dest('dist'));
});
```
 
License
-------

See [LICENSE](https://github.com/danilo-valente/gulp-jison-lex/blob/master/LICENSE).