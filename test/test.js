// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

console.log('');
console.log('  Running tests on alasql@' + alasql.version);
console.log('');
console.log(
	'  Environment detected:',
	JSON.stringify(
		{
			alasqlPath: alasql.path,
			isBrowser: alasql.utils.isBrowser,
			isCordova: alasql.utils.isCordova,
			isMeteor: alasql.utils.isMeteor,
			isMeteorClient: alasql.utils.isMeteorClient,
			isMeteorServer: alasql.utils.isMeteorServer,
			isNode: alasql.utils.isNode,
			isWebWorker: alasql.utils.isWebWorker,
		},
		null,
		4
	)
);
