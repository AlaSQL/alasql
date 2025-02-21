if (typeof window === 'undefined') {
    global.indexedDB = require('fake-indexeddb');
    global.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
}

const assert = require('assert');
const alasql = require('..');

describe('Test 1969: IndexedDB Transactions', () => {
    beforeEach(async () => {
        try {
            
            const attached = alasql.databases.find(db => db.databaseid === 'test1969');
            if (attached) {
                await alasql.promise('DETACH DATABASE test1969');
            }
        } catch(e) {  }
        
        try {
            await alasql.promise('DROP INDEXEDDB DATABASE IF EXISTS test1969');
        } catch(e) {  }
    });

    it('1. Should support BEGIN/COMMIT with IndexedDB', async () => {
        
    });
});