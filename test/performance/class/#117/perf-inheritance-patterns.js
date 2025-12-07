// Performance test for issue #117 - Class Inheritance Patterns
// Compares different JavaScript inheritance patterns to determine optimal approach

console.log('=== Performance Test #117 - Inheritance Patterns ===\n');

// ============================================================================
// Pattern 1: Current AlaSQL Pattern (Direct Prototype Assignment)
// ============================================================================
function CurrentPattern_Parent(name) {
	this.name = name;
	this.type = 'parent';
}

CurrentPattern_Parent.prototype.getName = function () {
	return this.name;
};

CurrentPattern_Parent.prototype.getType = function () {
	return this.type;
};

function CurrentPattern_Child(name, value) {
	this.name = name;
	this.value = value;
	this.type = 'child';
}

CurrentPattern_Child.prototype = Object.create(CurrentPattern_Parent.prototype);
CurrentPattern_Child.prototype.getValue = function () {
	return this.value;
};

CurrentPattern_Child.prototype.getInfo = function () {
	return this.getName() + ': ' + this.getValue();
};

// ============================================================================
// Pattern 2: Proposed Pattern (Object.create with super)
// ============================================================================
function inherit(child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.super = function () {
		parent.apply(this, arguments);
	};
}

function ProposedPattern_Parent(name) {
	this.name = name;
	this.type = 'parent';
}

ProposedPattern_Parent.prototype.getName = function () {
	return this.name;
};

ProposedPattern_Parent.prototype.getType = function () {
	return this.type;
};

function ProposedPattern_Child(name, value) {
	this.super(name);
	this.value = value;
	this.type = 'child';
}

inherit(ProposedPattern_Child, ProposedPattern_Parent);

ProposedPattern_Child.prototype.getValue = function () {
	return this.value;
};

ProposedPattern_Child.prototype.getInfo = function () {
	return this.getName() + ': ' + this.getValue();
};

// ============================================================================
// Pattern 3: ES6 Classes (Modern Approach)
// ============================================================================
class ES6Pattern_Parent {
	constructor(name) {
		this.name = name;
		this.type = 'parent';
	}

	getName() {
		return this.name;
	}

	getType() {
		return this.type;
	}
}

class ES6Pattern_Child extends ES6Pattern_Parent {
	constructor(name, value) {
		super(name);
		this.value = value;
		this.type = 'child';
	}

	getValue() {
		return this.value;
	}

	getInfo() {
		return this.getName() + ': ' + this.getValue();
	}
}

// ============================================================================
// Pattern 4: Simple Prototype Chain (Minimal)
// ============================================================================
function SimplePattern_Parent(name) {
	this.name = name;
	this.type = 'parent';
}

SimplePattern_Parent.prototype.getName = function () {
	return this.name;
};

SimplePattern_Parent.prototype.getType = function () {
	return this.type;
};

function SimplePattern_Child(name, value) {
	SimplePattern_Parent.call(this, name);
	this.value = value;
	this.type = 'child';
}

SimplePattern_Child.prototype = Object.create(SimplePattern_Parent.prototype);
SimplePattern_Child.prototype.constructor = SimplePattern_Child;

SimplePattern_Child.prototype.getValue = function () {
	return this.value;
};

SimplePattern_Child.prototype.getInfo = function () {
	return this.getName() + ': ' + this.getValue();
};

// ============================================================================
// Performance Testing
// ============================================================================

function benchmark(name, fn, iterations) {
	// Warmup
	for (let i = 0; i < 1000; i++) {
		fn();
	}

	// Actual test
	const start = Date.now();
	for (let i = 0; i < iterations; i++) {
		fn();
	}
	const elapsed = Date.now() - start;

	const opsPerSec = Math.floor((iterations / elapsed) * 1000);
	return {
		name: name,
		iterations: iterations,
		elapsed: elapsed,
		opsPerSec: opsPerSec,
	};
}

console.log('Running benchmarks with 1,000,000 iterations each...\n');

const iterations = 1000000;
const results = [];

// Test 1: Object Creation
console.log('Test 1: Object Creation Performance');
console.log('----------------------------------------');

results.push(
	benchmark(
		'Current Pattern - Creation',
		() => {
			const obj = new CurrentPattern_Child('test', 42);
		},
		iterations
	)
);

results.push(
	benchmark(
		'Proposed Pattern - Creation',
		() => {
			const obj = new ProposedPattern_Child('test', 42);
		},
		iterations
	)
);

results.push(
	benchmark(
		'ES6 Classes - Creation',
		() => {
			const obj = new ES6Pattern_Child('test', 42);
		},
		iterations
	)
);

results.push(
	benchmark(
		'Simple Pattern - Creation',
		() => {
			const obj = new SimplePattern_Child('test', 42);
		},
		iterations
	)
);

for (const result of results) {
	console.log(
		`${result.name.padEnd(35)}: ${result.opsPerSec.toLocaleString().padStart(12)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// Test 2: Method Calls
console.log('Test 2: Method Call Performance');
console.log('----------------------------------------');

const currentObj = new CurrentPattern_Child('test', 42);
const proposedObj = new ProposedPattern_Child('test', 42);
const es6Obj = new ES6Pattern_Child('test', 42);
const simpleObj = new SimplePattern_Child('test', 42);

const methodResults = [];

methodResults.push(
	benchmark(
		'Current Pattern - Method Call',
		() => {
			currentObj.getInfo();
		},
		iterations
	)
);

methodResults.push(
	benchmark(
		'Proposed Pattern - Method Call',
		() => {
			proposedObj.getInfo();
		},
		iterations
	)
);

methodResults.push(
	benchmark(
		'ES6 Classes - Method Call',
		() => {
			es6Obj.getInfo();
		},
		iterations
	)
);

methodResults.push(
	benchmark(
		'Simple Pattern - Method Call',
		() => {
			simpleObj.getInfo();
		},
		iterations
	)
);

for (const result of methodResults) {
	console.log(
		`${result.name.padEnd(35)}: ${result.opsPerSec.toLocaleString().padStart(12)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// Test 3: Prototype Chain Lookup
console.log('Test 3: Prototype Chain Lookup');
console.log('----------------------------------------');

const lookupResults = [];

lookupResults.push(
	benchmark(
		'Current Pattern - Parent Method',
		() => {
			currentObj.getName();
		},
		iterations
	)
);

lookupResults.push(
	benchmark(
		'Proposed Pattern - Parent Method',
		() => {
			proposedObj.getName();
		},
		iterations
	)
);

lookupResults.push(
	benchmark(
		'ES6 Classes - Parent Method',
		() => {
			es6Obj.getName();
		},
		iterations
	)
);

lookupResults.push(
	benchmark(
		'Simple Pattern - Parent Method',
		() => {
			simpleObj.getName();
		},
		iterations
	)
);

for (const result of lookupResults) {
	console.log(
		`${result.name.padEnd(35)}: ${result.opsPerSec.toLocaleString().padStart(12)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// ============================================================================
// Analysis
// ============================================================================

console.log('=== Performance Analysis ===\n');

function analyzeResults(testName, results) {
	console.log(`${testName}:`);

	const baseline = results[0];
	console.log(`  Baseline (Current): ${baseline.opsPerSec.toLocaleString()} ops/sec`);

	for (let i = 1; i < results.length; i++) {
		const result = results[i];
		const diff = result.opsPerSec - baseline.opsPerSec;
		const percentDiff = ((diff / baseline.opsPerSec) * 100).toFixed(2);
		const comparison = diff > 0 ? 'faster' : 'slower';
		const sign = diff > 0 ? '+' : '';

		console.log(
			`  ${result.name.replace(/ - .*/, '')}: ${sign}${percentDiff}% ${comparison} (${result.opsPerSec.toLocaleString()} ops/sec)`
		);
	}
	console.log('');
}

analyzeResults('Object Creation', results);
analyzeResults('Method Calls', methodResults);
analyzeResults('Parent Method Lookup', lookupResults);

// ============================================================================
// Recommendation
// ============================================================================

console.log('=== Recommendation ===\n');

const avgCurrentOps =
	(results[0].opsPerSec + methodResults[0].opsPerSec + lookupResults[0].opsPerSec) / 3;
const avgProposedOps =
	(results[1].opsPerSec + methodResults[1].opsPerSec + lookupResults[1].opsPerSec) / 3;
const avgES6Ops =
	(results[2].opsPerSec + methodResults[2].opsPerSec + lookupResults[2].opsPerSec) / 3;

const proposedDiff = ((avgProposedOps - avgCurrentOps) / avgCurrentOps) * 100;
const es6Diff = ((avgES6Ops - avgCurrentOps) / avgCurrentOps) * 100;

console.log('Average performance across all tests:');
console.log(`  Current Pattern:  ${Math.floor(avgCurrentOps).toLocaleString()} ops/sec (baseline)`);
console.log(
	`  Proposed Pattern: ${Math.floor(avgProposedOps).toLocaleString()} ops/sec (${proposedDiff > 0 ? '+' : ''}${proposedDiff.toFixed(2)}%)`
);
console.log(
	`  ES6 Classes:      ${Math.floor(avgES6Ops).toLocaleString()} ops/sec (${es6Diff > 0 ? '+' : ''}${es6Diff.toFixed(2)}%)`
);
console.log('');

if (Math.abs(proposedDiff) < 5) {
	console.log('✓ The proposed pattern has similar performance to the current pattern.');
	console.log('  Consider adopting it for:');
	console.log('    - Clearer prototype chain');
	console.log('    - Better constructor tracking');
	console.log('    - Explicit super method access');
} else if (proposedDiff > 5) {
	console.log('✓ The proposed pattern is FASTER than the current pattern!');
	console.log('  Recommendation: ADOPT the proposed inherit() function.');
} else {
	console.log('⚠ The proposed pattern is slower than the current pattern.');
	console.log('  Recommendation: Keep current pattern unless other benefits outweigh performance.');
}

console.log('\n=== Test Complete ===');
