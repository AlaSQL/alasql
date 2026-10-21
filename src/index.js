/*
	The entry of the build (build.js; context/roadmap-phase-1.md, step 2).

	create() makes the alasql object (src/engine/create.js). The modules converted to ES modules
	are installed here, one by one, as the conversion goes. Everything not yet converted is in
	src/generated/legacy.js: the numbered files in the order of src/legacy.list, which build.js
	writes before bundling. It is not committed.

	The object is not named alasql at this level: esbuild would give every nested alasql, such as
	the install parameters, a suffix, which shows in the error messages JavaScriptCore writes
	(evaluating 'alasql2.databases[...]').
*/

import {create} from './engine/create.js';
import core from './engine/core.js';
import yy from './engine/yy.js';
import helpers from './utils/helpers.js';
import env from './utils/env.js';
import legacy from './generated/legacy.js';
import promise from './engine/promise.js';

const instance = create();
core(instance);
yy(instance);
helpers(instance);
env(instance);
legacy(instance);
// after the legacy module: it reads utils when it is installed
promise(instance);

export default instance;
