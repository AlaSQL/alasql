//
// gulpfile.js
// Gulp for Alasql
// Дата: 06.08.2014
// (c) 2014-2015, Andrey Gershun
//
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var jison = require('gulp-jison');
module.exports = gulp;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-exec');
var rename = require('gulp-rename');
var dereserve = require('gulp-dereserve');
var argv = require('yargs').argv || {};
var replace = require('gulp-replace');
var execSync = require('child_process').execSync;
// Identify name of the build
var packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var version = packageData.version;
var branch = execSync(
	'git --work-tree="' + __dirname + '" --git-dir="' + __dirname + '/.git" branch',
	{encoding: 'utf8'}
)
	.match(/^\*\s+(.*)/m)[1]
	.trim();
// var hint = parseInt(execSync('git rev-list HEAD --count', {encoding:'utf8'})) | 0; // removed as it does not work on shallow cloning
var hint = execSync('git rev-parse --short HEAD', {encoding: 'utf8'});
if (!/^master|^release\//.test(branch)) {
	version +=
		'-' + branch.replace(/[^0-9a-z-]/gi, '.').replace(/^\.+|\.+$/g, '') + '-' + hint.replace(/[^0-9a-z-]/gi);
}

gulp.task('js-merge-worker', function() {
	return gulp
		.src([
			'./src/05copyright.js',
			'./src/99worker-start.js',
			'./src/99worker.js',
			'./src/99worker-finish.js',
		])
		.pipe(concat('alasql-worker.js'))
		.pipe(replace(/PACKAGE_VERSION_NUMBER/g, version))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('alasql-worker.min.js'))
		.pipe(
			uglify({
				preserveComments: function(a, b) {
					return 1 === b.line && /^!/.test(b.value);
				},
			})
		) // leave first line of comment if starts with a "!"
		.pipe(gulp.dest('./dist'));
});

gulp.task('js-merge', function() {
	return gulp
		.src([
			'./src/05copyright.js',
			'./src/10start.js',
			'./src/alasqlparser.js',
			'./src/12pretty.js',
			'./src/15utility.js',
			'./src/16comments.js',
			'./src/17alasql.js',
			'./src/18promise.js',
			'./src/20database.js',
			'./src/21transaction.js',
			//    './src/22store.js',
			'./src/23table.js',
			'./src/24view.js',
			'./src/25queryclass.js',
			'./src/28yy.js',
			'./src/30statements.js',
			'./src/35search.js',
			'./src/38query.js',
			'./src/39dojoin.js',
			'./src/40select.js',
			'./src/41exists.js',
			'./src/420from.js',
			'./src/421join.js',
			'./src/422where.js',
			'./src/423groupby.js',
			'./src/424select.js',
			'./src/425having.js',
			'./src/426orderby.js',
			'./src/427pivot.js',
			'./src/43rollup.js',
			'./src/44defcols.js',
			'./src/45union.js',
			'./src/46apply.js',
			'./src/47over.js',
			'./src/50expression.js',
			'./src/52linq.js',
			'./src/55functions.js',
			//    './src/56sprintf.js',
			'./src/57case.js',
			'./src/58json.js',
			'./src/59convert.js',
			'./src/60createtable.js',
			'./src/61date.js',
			'./src/62droptable.js',
			'./src/63createvertex.js',
			'./src/64altertable.js',
			'./src/65createindex.js',
			'./src/66dropindex.js',
			'./src/67withselect.js',
			'./src/68if.js',
			'./src/69while.js',
			'./src/70insert.js',
			'./src/71trigger.js',
			'./src/72delete.js',
			'./src/74update.js',
			//    './src/74update.js',
			'./src/75merge.js',
			'./src/76usedatabase.js',
			'./src/77declare.js',
			'./src/78show.js',
			'./src/79set.js',
			'./src/80console.js',
			'./src/81commit.js',
			'./src/821tsql.js',
			'./src/822mysql.js',
			'./src/823postgres.js',
			'./src/824oracle.js',
			'./src/825sqlite.js',
			'./src/830into.js',
			'./src/831xls.js',
			'./src/832xlsxml.js',
			'./src/833xlsx.js',
			//    './src/839zip.js', // To be added later in XLSX plugin
			'./src/84from.js',
			'./src/843xml.js',
			'./src/844gexf.js',
			//    './src/85help.js',
			'./src/86print.js',
			'./src/87source.js',
			'./src/88require.js',
			'./src/89assert.js',
			'./src/90websql.js',
			'./src/91indexeddb.js',
			'./src/92localstorage.js',
			'./src/93sqljs.js',
			'./src/94filestorage.js',
			'./src/97saveas.js',
			'./src/99worker.js',
			'./src/FileSaver.js',
			'./src/98finish.js',
		])
		.pipe(concat('alasql.fs.js'))
		.pipe(replace(/\/\*\/\*[\S\s]+?\*\//g, '')) // Remove multiline comments starting with "/*/*"
		.pipe(replace(/^\/\/[ \t]{2,}.*/gm, '')) // Remove single line comments where the // part is first thing and content does not follow imidiatly (probably a "just test" line)
		.pipe(replace(/\/\/.*?console\.log\(.*/gm, '')) // Remove single line comments 'console.log(' is part of the line
		.pipe(replace(/\n[\s]+\n/g, '\n\n')) // Collaps multilinebreak
		.pipe(replace(/PACKAGE_VERSION_NUMBER/g, version)) // Please set version in package.json file
		.pipe(gulp.dest('./dist'))

		.pipe(dereserve()) // Support IE8
		.pipe(replace(/\/\/\*not-for-browser\/\*/g, '/*not-for-browser/*')) // Remove things not for browser build
		.pipe(replace(/\/\*only-for-browser\/\*/g, '//*only-for-browser/*')) // Reveal things only for browser build
		.pipe(rename('alasql.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('alasql.min.js'))
		.pipe(
			uglify({
				preserveComments: function(a, b) {
					return 1 === b.line && /^!/.test(b.value);
				},
			})
		) // leave first line of comment if starts with a "!"
		.pipe(gulp.dest('./dist'));
});

gulp.task('jison-compile', function() {
	return gulp
		.src('./src/alasqlparser.jison')
		.pipe(jison({moduleType: 'commonjs', moduleName: 'alasqlparser'}))
		.pipe(gulp.dest('./src/'));
});

/*
gulp.task('jison-compile-fast', function () {
  return gulp.src('./src/alasqlparser.jison', {read: false})
    .pipe(shell([
//      'node ./utils/redj/redj.js',
//      'jison ./src/alasqlparser1.jison -o ./src/alasqlparser.js'
      'jison ./src/alasqlparser.jison -o ./src/alasqlparser.js'   // Todo: avoid having to install globally with `npm install jison -g`
//      'java -jar utils/compiler.jar -O "ADVANCED_OPTIMIZATIONS" src/alasqlparser1.js --language_in=ECMASCRIPT5 --js_output_file src/alasqlparser.js',
    ]));
});
*/

/** @todo Replace UglifyJS with Closure */

/*
gulp.task('uglify', function () {
  return gulp.src('dist/alasql.js', {read: false})
    .pipe(shell([
      'uglifyjs dist/alasql.js -o dist/alasql.min.js',
      'uglifyjs dist/alasql-worker.js -o dist/alasql-worker.min.js',
      //'cd test && (mocha . --reporter dot || if [ $? -ne 0 ] ; then say -v karen Tests failed ; else tput bel; fi)',
      
//      'java -jar utils/compiler.jar -O "SIMPLE_OPTIMIZATIONS" dist/alasql.js --language_in=ECMASCRIPT5 --js_output_file dist/alasql.min.js',
//      'java -jar utils/compiler.jar -O "SIMPLE_OPTIMIZATIONS" dist/alasql-worker.js --language_in=ECMASCRIPT5 --js_output_file dist/alasql-worker.min.js'
    ]));
});
*/

/*
gulp.task('copy-dist', function(){
//  gulp.src(['./dist/alasql.js'/*,'./alasql.js.map'* /])
//    .pipe(gulp.dest('./'));
});
*/

gulp.task('copy-dist-org', function() {
	gulp
		.src([
			'./dist/alasql.min.js',
			'./dist/alasql-worker.min.js',
			'/dist/alasql-echo.js',
			'/dist/alasql-md.js',
		])
		.pipe(gulp.dest('./console/'));
});

// Additional task to update alasql.org/console directory
gulp.task('copy-console-org', function() {
	gulp.src(['./dist/*']).pipe(gulp.dest('../alasql-org/console/'));
});

/************************/

// Echo plugin
gulp.task('typescript', function() {
	gulp.src(['partners/typescript/alasql.d.ts']).pipe(gulp.dest('./dist'));
});

// Echo plugin
gulp.task('plugin-plugins', function() {
	gulp.src(['./src/echo/alasql-echo.js', './src/md/alasql-md.js']).pipe(gulp.dest('./dist'));
});

// Echo plugin
gulp.task('plugin-prolog', function() {
	gulp.src(['./src/prolog/alasql-prolog.js']).pipe(gulp.dest('./dist'));
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

var toRun = ['js-merge', 'js-merge-worker', 'plugin-prolog', 'plugin-plugins', 'typescript'];

if (argv.jison) {
	toRun = ['jison-compile'];
}

if (false) {
	toRun = ['js-merge'];
}

// Главная задача
gulp.task('default', toRun, function() {});

gulp.task('watch', toRun, function() {
	gulp.watch('./src/*.js', function() {
		gulp.run('js-merge');
	});
	gulp.watch('./src/99worker*.js', function() {
		gulp.run('js-merge-worker');
	});
	gulp.watch('./src/alasqlparser.jison', function() {
		gulp.run('jison-compile');
	});

	gulp.watch('partners/typescript/alasql.d.ts', function() {
		gulp.run('typescript');
	});
	gulp.watch('./src/echo/*.js', function() {
		gulp.run('plugin-plugins');
	});
	gulp.watch('./src/md/*.js', function() {
		gulp.run('plugin-plugins');
	});
	gulp.watch('./src/prolog/*.js', function() {
		gulp.run('plugin-prolog');
	});

	//gulp.watch('./dist/alasql.js',function(){ gulp.run('uglify'); });

	gulp.watch('./dist/alasql.min.js', function() {
		//    gulp.run('copy-dist');
		gulp.run('copy-dist-org');
	});
	gulp.watch('./dist/alasql-worker.js', function() {
		//    gulp.run('copy-dist');
		gulp.run('copy-dist-org');
	});

	gulp.watch('./dist/alasql.min.js', function() {
		console.log('Initiating mocha test...');
		exec('npm run test:only', console.log);
	});

	//  gulp.watch('./console/*',function(){ gulp.run('copy-console-org'); });
	// gulp.watch('./src/*.jison',function(){ gulp.run('jison-compile'); gulp.run('js-merge');});
	// gulp.watch('./src/*.jisonlex',function(){ gulp.run('jison-lex-compile'); gulp.run('js-merge');});
});

gulp.task('fast', ['js-merge' /*, 'jison-compile', 'jison-lex-compile' */], function() {
	gulp.watch('./src/alasqlparser.jison', function() {
		gulp.run('jison-compile');
	});
	gulp.watch('./src/*.js', function() {
		gulp.run('js-merge');
	});
});

gulp.task('doc', function() {
	return gulp
		.src('./alasql.js', {read: false})
		.pipe(shell('jsdoc dist/alasql.js -d ../alasql-org/api'));
});

gulp.task('console', function() {
	gulp.run('copy-console-org');
});
