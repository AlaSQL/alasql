/*
	Is the Bun build the same code as the concatenation, apart from the wrapper? The acceptance of
	context/roadmap-phase-1.md, step 1: "the new CommonJS output differs from the old
	concatenation only in its wrapper". esbuild prints the code again (indentation, quotes, no
	comments), so the two files are not compared as text. Two checks instead:

	  bun test/parity/same-body.js <old dist/alasql.fs.js made with build.sh>

	1. The legacy module build.js generates (esbuild's input) against the body of the old file: the
	   old file with its banner, UMD head and tail taken out the way build.js takes them out of
	   the sources. Byte for byte, or the first difference is shown.
	2. The old body, bundled by the same build.js functions, against the new dist/alasql.fs.js
	   with its banner taken out. Identical means esbuild's output is a plain re-print of the same
	   code, and everything else in the new file is the wrapper.

	Exit code 1 when a check fails. src/generated/legacy.js is rewritten during check 2 and
	restored after it.
*/

import fs from 'fs';
import path from 'path';
import * as b from '../../build.js';

const root = path.join(import.meta.dir, '..', '..');
const oldFile = process.argv[2];
if (!oldFile) {
	console.error('usage: same-body.js <old dist/alasql.fs.js>');
	process.exit(2);
}

function firstDiff(x, y) {
	let i = 0;
	while (i < x.length && i < y.length && x[i] === y[i]) i++;
	return i;
}
function show(name, x, y) {
	if (x === y) {
		console.log(`${name}: identical (${x.length.toLocaleString('en-US')} bytes)`);
		return true;
	}
	const at = firstDiff(x, y);
	const line = x.slice(0, at).split('\n').length;
	console.log(`${name}: differ from byte ${at} (line ${line} of the first)`);
	console.log('  old: ' + JSON.stringify(x.slice(Math.max(0, at - 60), at + 120)));
	console.log('  new: ' + JSON.stringify(y.slice(Math.max(0, at - 60), at + 120)));
	console.log(`  lengths ${x.length} and ${y.length}`);
	return false;
}

// The old file has the banner, then the 10start.js text (with the UMD head), then the body,
// then the tail. The build string differs between the two builds, so both get the same one.
const version = b.packageVersion();
const old = fs.readFileSync(oldFile, 'utf8');
const oldBuild = (old.match(/build: (\S*) \|/) || [])[1];
const bannerText = b.banner(version, oldBuild);
if (!old.startsWith(bannerText)) {
	console.error('the old file does not start with the banner of src/05copyright.js');
	process.exit(1);
}
// The comment passes once more: build.sh ran them before the UMD head was taken out, build.js
// after, and only the blank lines at the cut differ. The parser stood in the concatenation;
// the legacy module makes it from its own module at that place.
const parserText = b
	.stripComments(fs.readFileSync(path.join(root, 'src', 'alasqlparser.js'), 'utf8'))
	.trim();
let oldBody = b.stripComments(b.cutTail(b.cutHead(old.slice(bannerText.length), oldFile), oldFile));
if (!oldBody.includes(parserText)) {
	console.error('the old file does not contain src/alasqlparser.js as it is now');
	process.exit(1);
}
const after = oldBody.indexOf(parserText) + parserText.length;
oldBody = b.stripComments(
	oldBody.replace(parserText, b.PARSER_BINDING.trim() + (oldBody[after] === '\n' ? '' : '\n'))
);

// The new file's build string is read from its banner too: the branch may have another name
// now than when it was built
const newOut = fs.readFileSync(path.join(root, 'dist', 'alasql.fs.js'), 'utf8');
const newBuild = (newOut.match(/build: (\S*) \|/) || [])[1];
const newHead = b.banner(version, newBuild) + '"use strict";\n';
if (!newOut.startsWith(newHead)) {
	console.error('dist/alasql.fs.js does not start with the banner and "use strict"');
	process.exit(1);
}

const generated = path.join(root, 'src', 'generated', 'legacy.js');
const current = fs.readFileSync(generated, 'utf8');
const open = 'export default function install() {\n';
const close = '\nreturn alasql;\n}\n';
const header = current.slice(0, current.indexOf(open) + open.length);
if (!current.endsWith(close)) {
	console.error('src/generated/legacy.js does not end with the install() tail');
	process.exit(1);
}
const newBody = current.slice(header.length, -close.length).split(newBuild).join(oldBuild);

let ok = show('1. legacy module against the old body', oldBody, newBody);

// Check 2: bundle the old body and compare with the new output
try {
	fs.writeFileSync(generated, header + oldBody + close);
	const oldBundled = b.defaultExport(
		await b.bundle(path.join(root, 'src', 'index.js'), {version, build: oldBuild})
	);
	const newBundled = newOut.slice(newHead.length).split(newBuild).join(oldBuild);
	ok = show('2. old body through esbuild against the new output', oldBundled, newBundled) && ok;
} finally {
	fs.writeFileSync(generated, current);
}
process.exit(ok ? 0 : 1);
