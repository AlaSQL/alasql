/*
	The codemod that turns a moved numbered file into an ES module with install(alasql)
	(context/roadmap-phase-1.md, "Wrap with a codemod, not by hand").

	  bun tools/wrap.js <file in src/engine/...> [--create] [--private name ...] [--write]

	The file has been moved with git mv already (its own commit); this writes the wrap, which is
	the next commit. Nothing inside the body changes and nothing is re-indented, so git still sees
	the moved file. What is added, from the free-variable analysis (tools/free-variables.js) of
	the file as it was in the legacy scope:

	- a binding line, var name = alasql.name, for a name a module installed earlier declares and
	  puts on the alasql object (yy, utils); the wrapped module must be installed after them. var,
	  not const: V8 checks a const of an enclosing scope for initialisation at every access from
	  an inner function, and yy is read in every compile (measured: compile 10 to 25 percent
	  slower on Node with const, the same speed with var);
	- for alasqlparser: the module that sets alasql.parser imports the generated parser wrapper
	  and makes the parser for this alasql object; every other module reads alasql.parser;
	- the wrapper, export default function install(alasql) { ... };
	- for every name the file declares and the legacy files still use, a line that puts it on
	  alasql.private (--private name, each named on purpose).

	--create is for the head file: the UMD head is cut, the wrapper is export function create()
	returning alasql, and the fluent-interface branch reads yy through alasql.yy, because the
	object exists before the yy module is installed.

	Prints the result; --write replaces the file.
*/

import fs from 'fs';
import path from 'path';
import {cutHead, hasHead} from '../build.js';
import {analyze} from './free-variables.js';

const root = path.join(import.meta.dir, '..');
const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && !isOption(args, a));
const create = args.includes('--create');
const write = args.includes('--write');
const privates = [];
for (let i = 0; i < args.length; i++) if (args[i] === '--private') privates.push(args[i + 1]);

function isOption(list, a) {
	const i = list.indexOf(a);
	return i > 0 && list[i - 1] === '--private';
}

if (!file) {
	console.error('usage: wrap.js <file> [--create] [--private name ...] [--write]');
	process.exit(2);
}

// The name the module provides on alasql for a name declared elsewhere
const ON_ALASQL = {yy: 'yy', utils: 'utils'};

const abs = path.resolve(root, file);
let text = fs.readFileSync(abs, 'utf8');
const report = analyze([path.relative(root, abs)]);
const {uses, globals} = Object.values(report)[0];

// A name declared by a legacy file, or one that resolves to nothing because its module has
// already been converted (then it is among the globals)
const KNOWN = ['alasqlparser', 'schemaChanged', ...Object.keys(ON_ALASQL)];
const names = new Set([...Object.values(uses).flat(), ...globals.filter(g => KNOWN.includes(g))]);

const imports = [];
const bindings = [];
{
	for (const n of names) {
		if (n === 'alasql') continue;
		if (n === 'schemaChanged') bindings.push('var schemaChanged = alasql.private.schemaChanged;');
		else if (n === 'alasqlparser') {
			// The grammar reads alasql.options, alasql.fn and alasql.aggr, so the parser is made
			// for the alasql object (src/generated/parser.js). The module that sets alasql.parser
			// makes it; every other module reads it from there.
			if (text.includes('alasql.parser = alasqlparser')) {
				imports.push("import makeParser from '../generated/parser.js';");
				bindings.push('var alasqlparser = makeParser(alasql);');
			} else bindings.push('var alasqlparser = alasql.parser;');
		} else if (ON_ALASQL[n]) bindings.push(`var ${n} = alasql.${ON_ALASQL[n]};`);
		else throw new Error(`${file} uses ${n}, which no module provides yet`);
	}
}

let out;
if (create) {
	if (!hasHead(text)) throw new Error(file + ' has no UMD head');
	text = cutHead(text, file);
	// the object is made before the yy module installs; the fluent interface runs later
	text = text.replace(/\bnew yy\./g, 'new alasql.yy.');
	const at = text.indexOf('\n\tlet alasql = function');
	if (at < 0) throw new Error(file + ': the main function was not found');
	out =
		text.slice(0, at) +
		'\nexport function create() {\n' +
		text.slice(at).replace(/\s*$/, '\n') +
		'\n\treturn alasql;\n}\n';
} else {
	out =
		imports.map(i => i + '\n').join('') +
		(imports.length ? '\n' : '') +
		'export default function install(alasql) {\n' +
		bindings.map(b => '\t' + b + '\n').join('') +
		text.replace(/\s*$/, '\n') +
		privates.map(p => `\n\talasql.private.${p} = ${p};\n`).join('') +
		'}\n';
}

if (write) {
	fs.writeFileSync(abs, out);
	console.log(
		`wrote ${file}: ${imports.length} imports, ${bindings.length} bindings, ${privates.length} on alasql.private`
	);
} else {
	process.stdout.write(out);
}
