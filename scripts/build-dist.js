// scripts/build-dist.js
// Build script for creating distribution files

const pkg = await Bun.file('./package.json').json();
const year = new Date().getFullYear();
const banner = `/*! AlaSQL v${pkg.version} | © 2014-${year} | MIT License */`;

console.log(`Building AlaSQL v${pkg.version}...`);

// Browser minified
const browserResult = await Bun.build({
	entrypoints: ['./src/alasql.js'],
	outdir: './dist',
	naming: 'alasql.esm.min.js',
	target: 'browser',
	minify: true,
});

if (!browserResult.success) {
	console.error('Browser build failed:', browserResult.logs);
	process.exit(1);
}

console.log('Build complete:');
console.log('  dist/alasql.esm.min.js - Browser ESM (minified)');
console.log('  dist/alasql.fs.js      - Node (existing legacy)');
