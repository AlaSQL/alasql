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
//var changed = require('gulp-changed');
//var jison = require('gulp-jison');
var concat = require('gulp-concat-sourcemap');
//var uglify = require('gulp-uglify');
//var jisonLex = require('gulp-jison-lex');
var shell = require('gulp-shell')


gulp.task('js-merge', function () {
  return gulp.src([
  	'./src/10start.js', 
  	'./src/alasqlparser.js', 
  	'./src/15utility.js', 
    './src/17alasql.js', 
  	'./src/20database.js',
    './src/21transaction.js',
    './src/22store.js',
    './src/23table.js',
    './src/24view.js',
  	'./src/25query.js',
    './src/28yy.js',
  	'./src/30statements.js',
    './src/38query.js',
    './src/39dojoin.js',
  	'./src/40select.js',
    './src/41exists.js',
    './src/42compile.js',
    './src/43rollup.js',    
    './src/44defcols.js',
    './src/45union.js',
  	'./src/50expression.js',
    './src/55functions.js',
    './src/57case.js',
  	'./src/60createtable.js',
    './src/62droptable.js',
    './src/64altertable.js',
    './src/65createindex.js',
    './src/66dropindex.js',
    './src/67createview.js',
  	'./src/70insert.js',
    './src/72delete.js',
    './src/74update.js',
    './src/74update.js',
    './src/76usedatabase.js',
    './src/78show.js',
    './src/80console.js',
    './src/85help.js',
    './src/87load.js',
   	'./src/90finish.js'])
//    .pipe(changed('./dist/'))
    .pipe(concat('alasql.js'))
//    .pipe(uglify())
    .pipe(gulp.dest('./'))
});


gulp.task('jison-compile', function () {
  return gulp.src('./src/*.jison', {read: false})
    .pipe(shell([
      'jison ./src/alasqlparser.jison -o ./src/alasqlparser.js',
    ]));
});


gulp.task('uglify', function () {
  return gulp.src('./alasql.js', {read: false})
    .pipe(shell([
      'uglifyjs alasql.js -o alasql.min.js',
    ]));
});

gulp.task('copy-dist', function(){
  gulp.src(['./alasql.js','./alasql.min.js','./alasql.js.map'])
    .pipe(gulp.dest('dist'));
});



//    , {
//      templateData: {
//        f: function (s) {
//          return s.replace(/$/, '.bak')
//        }
//      }
//    }))

// gulp.task('jison-compile', function () {
//   return gulp.src('./src/*.jison')
 //    .pipe(changed('./dist/'))
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
  gulp.watch('./src/*.jison',function(){ gulp.run('jison-compile'); });
  gulp.watch('./alasql.js',function(){ gulp.run('uglify'); });
  gulp.watch('./alasql.min.js',function(){ gulp.run('copy-dist'); });
  // gulp.watch('./src/*.jison',function(){ gulp.run('jison-compile'); gulp.run('js-merge');});
  // gulp.watch('./src/*.jisonlex',function(){ gulp.run('jison-lex-compile'); gulp.run('js-merge');});
});
