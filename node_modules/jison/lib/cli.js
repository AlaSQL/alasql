#!/usr/bin/env node

function getCommandlineOptions () {
    "use strict";
    var version = require('../package.json').version;
    var opts = require("nomnom")
        .script('jison')
        .option('file', {
            flag : true,
            position : 0,
            help : 'file containing a grammar'
        })
        .option('lexfile', {
            flag : true,
            position : 1,
            help : 'file containing a lexical grammar'
        })
        .option('json', {
            abbr : 'j',
            flag : true,
            help : 'force jison to expect a grammar in JSON format'
        })
        .option('outfile', {
            abbr : 'o',
            metavar : 'FILE',
            help : 'Filename and base module name of the generated parser'
        })
        .option('debug', {
            abbr : 't',
            flag : true,
        default:
            false,
            help : 'Debug mode'
        })
        .option('module-type', {
            abbr : 'm',
        default:
            'commonjs',
            metavar : 'TYPE',
            help : 'The type of module to generate (commonjs, amd, js)'
        })
        .option('parser-type', {
            abbr : 'p',
        default:
            'lalr',
            metavar : 'TYPE',
            help : 'The type of algorithm to use for the parser (lr0, slr,' +
                'lalr, lr)'
        })
        .option('version', {
            abbr : 'V',
            flag : true,
            help : 'print version and exit',
            callback : function () {
                return version;
            }
        }).parse();

    return opts;
}

var cli = module.exports;

cli.main = function cliMain(opts) {
    "use strict";
    opts = opts || {};

    function processGrammar(raw, lex, opts) {
        var grammar,
        parser;
        if (!opts.json) {
            grammar = cli.processGrammars(raw, lex, opts.json);
        }
        parser = cli.generateParserString(opts, grammar);
        return parser;
    }

    function processInputFile () {
        var fs = require('fs');
        var path = require('path');

        // getting raw files
        var lex;
        if (opts.lexfile) {
            lex = fs.readFileSync(path.normalize(opts.lexfile), 'utf8');
        }
        var raw = fs.readFileSync(path.normalize(opts.file), 'utf8');

        // making best guess at json mode
        opts.json = path.extname(opts.file) === '.json' || opts.json;

        // setting output file name and module name based on input file name
        // if they aren't specified.
        var name = path.basename((opts.outfile || opts.file));

        name = name.replace(/\..*$/g, '');

        opts.outfile = opts.outfile || (name + '.js');
        if (!opts.moduleName && name) {
            opts.moduleName = name.replace(/-\w/g,
                    function (match) {
                    return match.charAt(1).toUpperCase();
                });
        }

        var parser = processGrammar(raw, lex, opts);
        fs.writeFileSync(opts.outfile, parser);
    }

    function readin(cb) {
        var stdin = process.openStdin(),
        data = '';

        stdin.setEncoding('utf8');
        stdin.addListener('data', function (chunk) {
            data += chunk;
        });
        stdin.addListener('end', function () {
            cb(data);
        });
    }

    function processStdin () {
        readin(function (raw) {
            console.log(processGrammar(raw, null, opts));
        });
    }

    // if an input file wasn't given, assume input on stdin
    if (opts.file) {
        processInputFile();
    } else {
        processStdin();
    }
};

cli.generateParserString = function generateParserString(opts, grammar) {
    "use strict";
    opts = opts || {};
    var jison = require('./jison.js');

    var settings = grammar.options || {};

    if (opts['parser-type']) {
        settings.type = opts['parser-type'];
    }
    settings.debug = opts.debug;
    if (!settings.moduleType) {
        settings.moduleType = opts['module-type'];
    }

    var generator = new jison.Generator(grammar, settings);
    return generator.generate(settings);
};

cli.processGrammars = function processGrammars(file, lexFile, jsonMode) {
    "use strict";
    lexFile = lexFile || false;
    jsonMode = jsonMode || false;
    var ebnfParser = require('ebnf-parser');
    var cjson = require('cjson');
    var grammar;
    try {
        if (jsonMode) {
            grammar = cjson.parse(file);
        } else {
            grammar = ebnfParser.parse(file);
        }
    } catch (e) {
        throw new Error('Could not parse jison grammar');
    }
    try {
        if (lexFile) {
            grammar.lex = require('lex-parser').parse(lexFile);
        }
    } catch (e) {
        throw new Error('Could not parse lex grammar');
    }
    return grammar;
};


if (require.main === module) {
    var opts = getCommandlineOptions();
    cli.main(opts);
}
