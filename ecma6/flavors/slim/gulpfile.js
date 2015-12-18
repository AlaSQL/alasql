var gulp = require("gulp"),
rollup = require("gulp-rollup"),
uglify = require("gulp-uglify"),
rename = require("gulp-rename"),
buildParser = require("../../parser/slim/gulpfile.js");



const DIR_NAME = __dirname;

function build(){
  if(!buildParser.built()) buildParser.build();
  return gulp.src(DIR_NAME+"/slim.js")
  .pipe(rollup())
  .pipe(rename("alasql-slim.js"))
  .pipe(gulp.dest(DIR_NAME+"/dist"))
  .pipe(uglify())
  .pipe(rename("alasql-slim.min.js"))
  .pipe(gulp.dest(DIR_NAME+"/dist"));
}

gulp.task("default",build);

module.exports = build;



