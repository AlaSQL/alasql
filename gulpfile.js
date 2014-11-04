//
// gulpfile.js
// Файл с задачами для Gulp
// Дата: 06.08.2014
// (с) 2014, Андрей Гершун
//

var gulp = require('gulp');
module.exports = gulp;
//var connect = require('gulp-connect');
//var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var jison = require('gulp-jison');
var concat = require('gulp-concat-sourcemap');
var jisonLex = require('gulp-jison-lex');

gulp.task('js-merge', function () {
  return gulp.src([
  	'./src/10start.js', 
//    './src2/alasqlparser.js', 
  	'./src/alasqlparser.js', 
  	'./src/15utility.js', 
  	'./src/20database.js',
  	'./src/25yy.js',
  	'./src/30statements.js',
  	'./src/40select.js',
    './src/45union.js',
  	'./src/50expression.js',
    './src/55functions.js',
  	'./src/60createtable.js',
    './src/62droptable.js',
    './src/64altertable.js',
  	'./src/70insert.js',
    './src/72delete.js',
    './src/74update.js',
   	'./src/90finish.js'])
//    .pipe(changed('./dist/'))
    .pipe(concat('alasql.js'))
    .pipe(gulp.dest('./'))
});

// gulp.task('jison-compile', function () {
//   return gulp.src('./src/*.jison')
// //    .pipe(changed('./dist/'))
//     .pipe(jison({ moduleType: 'commonjs' }))
//     .pipe(gulp.dest('./src/'))
// //    .pipe(livereload());
// });

// gulp.task('jison-lex-compile', function () {
//   return gulp.src('./src/*.jisonlex')
// //    .pipe(changed('./dist/'))
//     .pipe(jisonLex())
//     .pipe(gulp.dest('./src2/'))
// //    .pipe(livereload());
// });


// Главная задача
gulp.task('default', ['js-merge' /*, 'jison-compile', 'jison-lex-compile' */], function(){
  gulp.watch('./src/*.js',function(){ gulp.run('js-merge'); });
  // gulp.watch('./src/*.jison',function(){ gulp.run('jison-compile'); gulp.run('js-merge');});
  // gulp.watch('./src/*.jisonlex',function(){ gulp.run('jison-lex-compile'); gulp.run('js-merge');});
});
