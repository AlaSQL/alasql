var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var lexParser = require('lex-parser');
var jisonLex = require('jison-lex');
var extend = require('extend');

const PLUGIN_NAME = 'gulp-jison-lex';

function template(tmpl, file) {
    var p = file.history[0];
    var ext = path.extname(p);

    return gutil.template(tmpl, {
        file: file,
        path: {
            dirname: path.dirname(p),
            basename: path.basename(p, ext),
            extname: ext
        }
    });
}

module.exports = function (options) {
    options = options || {};

    return through.obj(function (file, encoding, callback) {

        if (file.isNull()) {
            // Do nothing
        }

        if (file.isStream()) {
            // Not yet supported
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported yet'));
        }

        if (file.isBuffer()) {

            var jlOptions = {
                moduleName: template(options.moduleName, file),
                moduleType: options.moduleType
            };

            file = file.clone();

            var outFile = template(options.outFile, file);
            file.path = outFile
                ? path.resolve(path.dirname(file.path), './', outFile)
                : gutil.replaceExtension(file.path, '.js');

            try {
                var grammar = file.contents.toString();
                if (options.json) {
                    grammar = JSON.parse(grammar);
                } else {
                    grammar = lexParser.parse(grammar);
                }

                grammar.options = extend(grammar.options, jlOptions);

                var lexer = jisonLex.generate(grammar);
                file.contents = new Buffer(lexer);
            } catch (err) {
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
            }
        }

        this.push(file);

        return callback();
    });
};