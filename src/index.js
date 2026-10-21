/*
	The entry of the Bun build (build.js; context/roadmap-phase-1.md, step 1).

	The modules converted to ES modules are installed here, one by one, as the conversion goes.
	Everything not yet converted is in src/generated/legacy.js: the numbered files in the order of
	the file list in build.sh, which build.js writes before bundling. It is not committed.
*/

module.exports = require('./generated/legacy.js');
