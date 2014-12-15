#!/usr/bin/env node
/* js-codepage (C) 2014 SheetJS -- http://sheetjs.com */
/* vim: set ts=2 ft=javascript: */
var codepage = require('../');
var fs = require('fs'), program = require('commander');
program
	.version(codepage.version)
	.usage('[options] <file>')
	.option('-f, --from-code <code>', 'codepage of input (default 65001 utf8)')
	.option('-t, --to-code <code>', 'codepage of output (default 65001 utf8)')
	.option('-o, --output <file>', 'output file (<file>.<to> if specified)')
	.option('-B, --bom', 'write BOM (for unicode codepages)')
	.option('-F, --force', 'force writing to stdout for non-utf8 codepages')
	.option('-l, --list', 'List supported codepages');

program.on('--help', function() {
	console.log('  Codepage descriptions can be found in the README');
	console.log('      http://oss.sheetjs.com/js-codepage/README.md');
	console.log('  Support email: dev.codepage@sheetjs.com');
});

program.parse(process.argv);

if(program.list) {
	Object.keys(codepage).forEach(function(x) { if(+x == x) console.log(x); });
	process.exit();
}

var fr = +program.fromCode || 65001;
var to = +program.toCode || 65001;
var f = program.args[0];
var o = program.output;

if(!process.stdin.isTTY) f = f || "-";

if(f !== "-" && !fs.existsSync(f)) {
	console.error('codepage: must specify a filename');
	process.exit(13);
}

if(f === "-") process.stdin.pipe(require('concat-stream')(process_text));
else process_text(fs.readFileSync(f));

function process_text(text) {
	var dec = codepage.utils.decode(fr, text);

	var bom = {
		1200:  new Buffer([0xFF, 0xFE]),
		1201:  new Buffer([0xFE, 0xFF]),
		12000: new Buffer([0xFF, 0xFE, 0x00, 0x00]),
		12001: new Buffer([0x00, 0x00, 0xFE, 0xFF]),
		16969: new Buffer([0x69, 0x69]),
		65000: new Buffer([0x2B, 0x2F, 0x76, 0x2B]),
		65001: new Buffer([0xEF, 0xBB, 0xBF])
	}

	var mybom = (program.bom && bom[fr] ? bom[fr] : "");
	var out = to === 65001 ? dec.toString('utf8') : codepage.utils.encode(to, dec);

	/* if output file is specified */
	if(o) writefile(o, out, mybom);
	/* utf8 -> print to stdout */
	else if(to === 65001) logit(out, mybom);
	/* stdout piped to process -> print */
	else if(!process.stdout.isTTY) logit(out, mybom);
	/* forced */
	else if(program.force) logit(out, mybom);
	/* input file specified -> write to file */
	else if(f !== "-") writefile(f + "." + to, out, mybom);
	else {
		console.error('codepage: use force (-F, --force) to print ' + to + ' codes');
		process.exit(14);
	}
}

function logit(out, bom) {
	process.stdout.write(bom);
	process.stdout.write(out);
}

function writefile(o, out, bom) {
	fs.writeFileSync(o, bom);
	fs.appendFileSync(o, out);
}
