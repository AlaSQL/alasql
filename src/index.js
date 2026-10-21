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
import fileio from './utils/fileio.js';
import xlsx from './utils/xlsx.js';
import uncomment from './utils/uncomment.js';
import query from './data/query.js';
import database from './data/database.js';
import table from './data/table.js';
import dojoin from './select/dojoin.js';
import queryfn from './select/queryfn.js';
import legacy from './generated/legacy.js';
import promise from './engine/promise.js';

const instance = create();
// what modules share with each other and nobody else; the second parameter of every install
const internal = {};
core(instance, internal);
yy(instance, internal);
helpers(instance, internal);
env(instance, internal);
fileio(instance, internal);
xlsx(instance, internal);
uncomment(instance, internal);
query(instance, internal);
database(instance, internal);
table(instance, internal);
dojoin(instance, internal);
queryfn(instance, internal);
legacy(instance, internal);
// after the legacy module: it reads utils when it is installed
promise(instance, internal);

export default instance;
