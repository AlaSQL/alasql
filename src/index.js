/*
	The entry of the build (build.js; context/roadmap-phase-1.md, step 1).

	The modules converted to ES modules are installed here, one by one, as the conversion goes.
	Everything not yet converted is in src/generated/legacy.js: the numbered files in the order of
	the file list in build.sh, which build.js writes before bundling. It is not committed. While
	the file that declares the alasql object is still in that list, the legacy module creates the
	object and returns it.
*/

import legacy from './generated/legacy.js';

// No top-level name alasql here: esbuild would give every nested alasql a suffix, which shows in
// the error messages JavaScriptCore writes (evaluating 'alasql2.databases[...]').
export default legacy();
