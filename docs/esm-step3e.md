# ESM Refactor Step 3e: Extract Plugins

**Goal:** Extract I/O plugins (XLSX, CSV, IndexedDB, LocalStorage, etc.) to opt-in modules.

**Prerequisite:** [esm-step3d.md](./esm-step3d.md) complete

**Branch:** `esm`

---

## 1. Why Plugins Are Special

Plugins have external dependencies that shouldn't be in the core bundle:
- **XLSX** requires the `xlsx` library
- **IndexedDB** is browser-only
- **LocalStorage** is browser-only
- **FileSaver** requires `file-saver` library

**Goal:** Users opt-in to plugins, reducing core bundle size.

---

## 2. Plugin Source Files

| Legacy File | Plugin | Target |
|-------------|--------|--------|
| `src/legacy/833xlsx.js` | XLSX import/export | `src/plugins/xlsx.js` |
| `src/legacy/840xls.js` | XLS (old format) | `src/plugins/xls.js` |
| `src/legacy/84csv.js` | CSV import/export | `src/plugins/csv.js` |
| `src/legacy/85localstorage.js` | LocalStorage | `src/plugins/localstorage.js` |
| `src/legacy/86indexeddb.js` | IndexedDB | `src/plugins/indexeddb.js` |
| `src/legacy/87filesaver.js` | File download | `src/plugins/filesaver.js` |

---

## 3. Plugin Pattern: Dependency Injection

Plugins receive external libraries via `.use()`:

```javascript
// src/plugins/xlsx.js
export function xlsx(alasql) {
    
    alasql.from.XLSX = function(filename, opts, cb, idx, query) {
        const XLSX = alasql.external?.xlsx;
        if (!XLSX) {
            throw new Error(
                'XLSX library not provided.\n' +
                'Usage:\n' +
                '  import * as XLSX from "xlsx";\n' +
                '  alasql.use({ xlsx: XLSX });'
            );
        }
        
        const workbook = XLSX.readFile(filename);
        const sheetName = opts?.sheet || workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, opts);
        
        if (cb) return cb(data, idx, query);
        return data;
    };
    
    alasql.into.XLSX = function(filename, opts, data, columns, cb) {
        const XLSX = alasql.external?.xlsx;
        if (!XLSX) throw new Error('XLSX library not provided');
        
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, opts?.sheet || 'Sheet1');
        XLSX.writeFile(wb, filename);
        
        if (cb) return cb(data.length);
        return data.length;
    };
}
```

---

## 4. User Usage Pattern

```javascript
// User code
import alasql from 'alasql';
import * as XLSX from 'xlsx';
import { xlsx } from 'alasql/plugins/xlsx';

// Step 1: Provide the library
alasql.use({ xlsx: XLSX });

// Step 2: Enable the plugin
alasql.use(xlsx);

// Step 3: Use it
const data = alasql('SELECT * FROM XLSX("employees.xlsx")');
alasql('SELECT * INTO XLSX("output.xlsx") FROM ?', [data]);
```

---

## 5. Extract CSV Plugin

CSV is simpler (no external dependency for basic parsing):

```javascript
// src/plugins/csv.js
export function csv(alasql) {
    
    alasql.from.CSV = function(filename, opts, cb, idx, query) {
        opts = opts || {};
        const separator = opts.separator || ',';
        const headers = opts.headers !== false;
        
        // Use alasql's file loading (fs in Node, fetch in browser)
        const text = alasql.utils.loadFile(filename, false);
        const data = parseCSV(text, separator, headers);
        
        if (cb) return cb(data, idx, query);
        return data;
    };
    
    alasql.into.CSV = function(filename, opts, data, columns, cb) {
        opts = opts || {};
        const separator = opts.separator || ',';
        
        const text = toCSV(data, columns, separator);
        alasql.utils.saveFile(filename, text);
        
        if (cb) return cb(data.length);
        return data.length;
    };
}

function parseCSV(text, separator, hasHeaders) {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length === 0) return [];
    
    const headers = hasHeaders 
        ? lines[0].split(separator).map(h => h.trim())
        : lines[0].split(separator).map((_, i) => `col${i}`);
    
    const startLine = hasHeaders ? 1 : 0;
    return lines.slice(startLine).map(line => {
        const values = line.split(separator);
        const row = {};
        headers.forEach((h, i) => {
            row[h] = values[i]?.trim();
        });
        return row;
    });
}

function toCSV(data, columns, separator) {
    if (data.length === 0) return '';
    
    const headers = columns || Object.keys(data[0]);
    const lines = [headers.join(separator)];
    
    for (const row of data) {
        const values = headers.map(h => {
            const v = row[h];
            if (v === null || v === undefined) return '';
            if (typeof v === 'string' && v.includes(separator)) {
                return `"${v.replace(/"/g, '""')}"`;
            }
            return String(v);
        });
        lines.push(values.join(separator));
    }
    
    return lines.join('\n');
}
```

---

## 6. Extract IndexedDB Plugin

```javascript
// src/plugins/indexeddb.js
export function indexeddb(alasql) {
    
    if (typeof indexedDB === 'undefined') {
        // Not in browser, skip registration
        return;
    }
    
    alasql.engines.INDEXEDDB = {
        createDatabase: function(databaseid, args, cb) {
            const request = indexedDB.open(databaseid);
            request.onupgradeneeded = function(e) {
                // Create object stores
            };
            request.onsuccess = function(e) {
                if (cb) cb(1);
            };
            request.onerror = function(e) {
                throw new Error('IndexedDB error: ' + e.target.error);
            };
        },
        
        dropDatabase: function(databaseid, cb) {
            const request = indexedDB.deleteDatabase(databaseid);
            request.onsuccess = function() {
                if (cb) cb(1);
            };
        },
        
        // ... more methods
    };
    
    alasql.from.INDEXEDDB = function(databaseid, tableid, cb, idx, query) {
        // Read from IndexedDB
    };
    
    alasql.into.INDEXEDDB = function(databaseid, tableid, data, columns, cb) {
        // Write to IndexedDB
    };
}
```

---

## 7. Testing Plugins

### XLSX (with mock)
```javascript
// test/plugins/xlsx.test.js
import { describe, expect, test, beforeEach } from 'bun:test';
import alasql from '../../src/alasql.js';
import { xlsx } from '../../src/plugins/xlsx.js';

describe('XLSX plugin', () => {
    test('throws when XLSX not provided', () => {
        // Fresh alasql state
        delete alasql.external?.xlsx;
        alasql.use(xlsx);
        
        expect(() => {
            alasql('SELECT * FROM XLSX("test.xlsx")');
        }).toThrow('XLSX library not provided');
    });

    test('works with mock XLSX', () => {
        const mockXLSX = {
            readFile: () => ({
                SheetNames: ['Data'],
                Sheets: { Data: {} }
            }),
            utils: {
                sheet_to_json: () => [{ a: 1 }, { a: 2 }]
            }
        };
        
        alasql.use({ xlsx: mockXLSX });
        alasql.use(xlsx);
        
        const result = alasql('SELECT * FROM XLSX("test.xlsx")');
        expect(result).toStrictEqual([{ a: 1 }, { a: 2 }]);
    });
});
```

### CSV
```javascript
// test/plugins/csv.test.js
import { describe, expect, test } from 'bun:test';
import alasql from '../../src/alasql.js';
import { csv } from '../../src/plugins/csv.js';

describe('CSV plugin', () => {
    // Test with in-memory data (no file I/O)
    test('parses CSV string', () => {
        alasql.use(csv);
        
        // Mock loadFile to return CSV string
        const originalLoadFile = alasql.utils.loadFile;
        alasql.utils.loadFile = () => 'name,age\nAlice,30\nBob,25';
        
        const result = alasql('SELECT * FROM CSV("test.csv")');
        expect(result).toStrictEqual([
            { name: 'Alice', age: '30' },
            { name: 'Bob', age: '25' }
        ]);
        
        alasql.utils.loadFile = originalLoadFile;
    });
});
```

---

## 8. Barrel Export

```javascript
// src/plugins/index.js
export { xlsx } from './xlsx.js';
export { csv } from './csv.js';
export { indexeddb } from './indexeddb.js';
export { localstorage } from './localstorage.js';
export { filesaver } from './filesaver.js';

// For convenience: register common plugins
export function registerCommonPlugins(alasql) {
    csv(alasql);
    // Note: xlsx, indexeddb require user to provide dependencies
}
```

---

## 9. Extraction Checklist

- [ ] `src/plugins/xlsx.js` — XLSX import/export
- [ ] `src/plugins/csv.js` — CSV import/export
- [ ] `src/plugins/json.js` — JSON import/export
- [ ] `src/plugins/indexeddb.js` — IndexedDB storage
- [ ] `src/plugins/localstorage.js` — LocalStorage
- [ ] `src/plugins/filesaver.js` — File download (browser)
- [ ] `src/plugins/index.js` — Barrel export
- [ ] Tests for each plugin

---

## 10. Definition of Done for Step 3e

- [ ] All plugins extracted to `src/plugins/`
- [ ] Each plugin uses dependency injection pattern
- [ ] Plugin tests pass (with mocks where needed)
- [ ] `git tag esm-step3e-complete` created

---

## Next: Step 4

Proceed to [esm-step4.md](./esm-step4.md) for cleanup and finalization.
