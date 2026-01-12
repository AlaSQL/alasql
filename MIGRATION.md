# Migration Guide: v4 to v5

This guide covers the breaking changes when upgrading from AlaSQL v4 to v5.

## Breaking Changes

### 1. XLSX Plugin Now Requires Opt-In

**Before (v4):**

```javascript
const alasql = require('alasql');
alasql('SELECT * FROM XLSX("file.xlsx")'); // Just worked
```

**After (v5):**

```javascript
import alasql from 'alasql';
import * as XLSX from 'xlsx';

// Register the XLSX library
alasql.use({xlsx: XLSX});

// Now XLSX functions work
alasql('SELECT * FROM XLSX("file.xlsx")');
```

### 2. ESM by Default

The package is now ESM-first. For CommonJS environments:

```javascript
// Use the dist file
const alasql = require('alasql/dist/alasql.fs.js');
```

### 3. Node.js File System

File operations in Node.js use the existing fs entry:

```javascript
import alasql from 'alasql';
// File system operations work automatically in Node.js
```

### 4. Internal API Changes

The following internal APIs have been updated:

- `alasql.fn` is now `alasql.fn` (unchanged) for user-defined functions
- `alasql.stdfn` contains standard SQL functions
- `alasql.external` holds external library references (xlsx, fs, etc.)

## New Features

### The `.use()` API

Register plugins and extensions with the chainable `.use()` method:

```javascript
// Function plugin
alasql.use(a => {
	a.fn.DOUBLE = x => x * 2;
});

// Object plugin for external libraries
alasql.use({
	xlsx: XLSX,
	stdfn: {MYFUNC: x => x * 2},
});

// Chainable
alasql.use(plugin1).use(plugin2);
```

### Custom Aggregators

Add custom aggregator functions:

```javascript
alasql.use({
	aggr: {
		MYSUM: (value, accumulator, stage) => {
			if (stage === 1) return value; // Initialize
			if (stage === 2) return accumulator + value; // Accumulate
			return accumulator; // Finalize
		},
	},
});

alasql('SELECT MYSUM(amount) FROM orders');
```

### External Library Registration

External libraries like XLSX are now explicitly registered:

```javascript
import * as XLSX from 'xlsx';

alasql.use({xlsx: XLSX});
```

This gives you control over which version of external libraries to use and reduces bundle size when features aren't needed.

## Quick Migration Checklist

1. Update import syntax to ESM (or use dist file for CommonJS)
2. Register XLSX library with `.use({xlsx: XLSX})` if using Excel features
3. Check for any usage of internal APIs that may have changed
4. Test your queries to ensure compatibility
