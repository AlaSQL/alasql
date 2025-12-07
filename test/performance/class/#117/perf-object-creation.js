// Performance test for issue #117 - Object Creation Patterns
// Detailed analysis of object instantiation performance

console.log('=== Performance Test #117 - Object Creation ===\n');

// ============================================================================
// Test Setup: Different Patterns
// ============================================================================

// Pattern 1: Current (Direct prototype)
function Current_Class(a, b, c, d, e) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.e = e;
}

Current_Class.prototype.method1 = function () {
	return this.a + this.b;
};
Current_Class.prototype.method2 = function () {
	return this.c + this.d;
};
Current_Class.prototype.method3 = function () {
	return this.e;
};

// Pattern 2: Proposed (with inherit)
function inherit(child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.super = function () {
		parent.apply(this, arguments);
	};
}

function Proposed_Parent(a, b) {
	this.a = a;
	this.b = b;
}

Proposed_Parent.prototype.method1 = function () {
	return this.a + this.b;
};

function Proposed_Class(a, b, c, d, e) {
	this.super(a, b);
	this.c = c;
	this.d = d;
	this.e = e;
}

inherit(Proposed_Class, Proposed_Parent);

Proposed_Class.prototype.method2 = function () {
	return this.c + this.d;
};
Proposed_Class.prototype.method3 = function () {
	return this.e;
};

// Pattern 3: ES6 Class
class ES6_Parent {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}

	method1() {
		return this.a + this.b;
	}
}

class ES6_Class extends ES6_Parent {
	constructor(a, b, c, d, e) {
		super(a, b);
		this.c = c;
		this.d = d;
		this.e = e;
	}

	method2() {
		return this.c + this.d;
	}

	method3() {
		return this.e;
	}
}

// Pattern 4: Object.assign pattern (common in AlaSQL)
function ObjectAssign_Class(params) {
	return Object.assign(this, params);
}

ObjectAssign_Class.prototype.method1 = function () {
	return this.a + this.b;
};
ObjectAssign_Class.prototype.method2 = function () {
	return this.c + this.d;
};
ObjectAssign_Class.prototype.method3 = function () {
	return this.e;
};

// ============================================================================
// Performance Testing
// ============================================================================

function measureCreation(name, createFn, iterations) {
	// Warmup
	for (let i = 0; i < 1000; i++) {
		createFn();
	}

	// Force garbage collection if available
	if (global.gc) {
		global.gc();
	}

	// Measure
	const start = Date.now();
	const objects = [];
	for (let i = 0; i < iterations; i++) {
		objects.push(createFn());
	}
	const elapsed = Date.now() - start;

	// Keep objects in memory to measure actual allocation
	const memUsed = process.memoryUsage().heapUsed;

	return {
		name: name,
		iterations: iterations,
		elapsed: elapsed,
		opsPerSec: Math.floor((iterations / elapsed) * 1000),
		avgMemPerObj: Math.floor(memUsed / iterations),
		objects: objects, // Keep references
	};
}

console.log('Configuration: 100,000 object creations per test\n');
console.log('Test 1: Simple Object Creation');
console.log('----------------------------------------');

const iterations = 100000;
const results = [];

// Test with same parameters
results.push(
	measureCreation('Current Pattern', () => new Current_Class(1, 2, 3, 4, 5), iterations)
);

results.push(
	measureCreation('Proposed Pattern', () => new Proposed_Class(1, 2, 3, 4, 5), iterations)
);

results.push(measureCreation('ES6 Classes', () => new ES6_Class(1, 2, 3, 4, 5), iterations));

results.push(
	measureCreation(
		'Object.assign Pattern',
		() => new ObjectAssign_Class({a: 1, b: 2, c: 3, d: 4, e: 5}),
		iterations
	)
);

for (const result of results) {
	console.log(
		`${result.name.padEnd(25)}: ${result.opsPerSec.toLocaleString().padStart(10)} ops/sec | ${result.elapsed.toString().padStart(5)}ms total`
	);
}

console.log('\n');

// Test 2: Creation with varying complexity
console.log('Test 2: Creation with Many Properties (10 properties)');
console.log('--------------------------------------------------------');

function Current_Complex(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.p4 = p4;
	this.p5 = p5;
	this.p6 = p6;
	this.p7 = p7;
	this.p8 = p8;
	this.p9 = p9;
	this.p10 = p10;
}

function Proposed_ComplexParent(p1, p2, p3, p4, p5) {
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.p4 = p4;
	this.p5 = p5;
}

function Proposed_Complex(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
	this.super(p1, p2, p3, p4, p5);
	this.p6 = p6;
	this.p7 = p7;
	this.p8 = p8;
	this.p9 = p9;
	this.p10 = p10;
}

inherit(Proposed_Complex, Proposed_ComplexParent);

class ES6_ComplexParent {
	constructor(p1, p2, p3, p4, p5) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
		this.p4 = p4;
		this.p5 = p5;
	}
}

class ES6_Complex extends ES6_ComplexParent {
	constructor(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
		super(p1, p2, p3, p4, p5);
		this.p6 = p6;
		this.p7 = p7;
		this.p8 = p8;
		this.p9 = p9;
		this.p10 = p10;
	}
}

const complexResults = [];

complexResults.push(
	measureCreation(
		'Current Pattern',
		() => new Current_Complex(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
		iterations
	)
);

complexResults.push(
	measureCreation(
		'Proposed Pattern',
		() => new Proposed_Complex(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
		iterations
	)
);

complexResults.push(
	measureCreation('ES6 Classes', () => new ES6_Complex(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), iterations)
);

for (const result of complexResults) {
	console.log(
		`${result.name.padEnd(25)}: ${result.opsPerSec.toLocaleString().padStart(10)} ops/sec | ${result.elapsed.toString().padStart(5)}ms total`
	);
}

console.log('\n');

// Test 3: Batch creation stress test
console.log('Test 3: High-Volume Creation (1,000,000 objects)');
console.log('---------------------------------------------------');

const stressIterations = 1000000;

const stressTest = (name, createFn) => {
	const start = Date.now();
	for (let i = 0; i < stressIterations; i++) {
		createFn();
	}
	const elapsed = Date.now() - start;
	return {
		name: name,
		elapsed: elapsed,
		opsPerSec: Math.floor((stressIterations / elapsed) * 1000),
	};
};

const stressResults = [];

stressResults.push(stressTest('Current Pattern', () => new Current_Class(1, 2, 3, 4, 5)));
stressResults.push(stressTest('Proposed Pattern', () => new Proposed_Class(1, 2, 3, 4, 5)));
stressResults.push(stressTest('ES6 Classes', () => new ES6_Class(1, 2, 3, 4, 5)));

for (const result of stressResults) {
	console.log(
		`${result.name.padEnd(25)}: ${result.opsPerSec.toLocaleString().padStart(10)} ops/sec | ${result.elapsed.toString().padStart(6)}ms total`
	);
}

console.log('\n');

// ============================================================================
// Analysis
// ============================================================================

console.log('=== Performance Analysis ===\n');

function compareToBaseline(testName, results) {
	console.log(`${testName}:`);
	const baseline = results[0];

	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		if (i === 0) {
			console.log(`  ${result.name}: ${result.opsPerSec.toLocaleString()} ops/sec (baseline)`);
		} else {
			const diff = result.opsPerSec - baseline.opsPerSec;
			const percentDiff = ((diff / baseline.opsPerSec) * 100).toFixed(2);
			const sign = diff > 0 ? '+' : '';
			console.log(
				`  ${result.name}: ${result.opsPerSec.toLocaleString()} ops/sec (${sign}${percentDiff}%)`
			);
		}
	}
	console.log('');
}

compareToBaseline('Simple Object Creation', results);
compareToBaseline('Complex Object Creation', complexResults);
compareToBaseline('High-Volume Stress Test', stressResults);

// ============================================================================
// Summary
// ============================================================================

console.log('=== Summary ===\n');

const avgCurrent =
	(results[0].opsPerSec + complexResults[0].opsPerSec + stressResults[0].opsPerSec) / 3;
const avgProposed =
	(results[1].opsPerSec + complexResults[1].opsPerSec + stressResults[1].opsPerSec) / 3;
const avgES6 =
	(results[2].opsPerSec + complexResults[2].opsPerSec + stressResults[2].opsPerSec) / 3;

console.log('Average Object Creation Performance:');
console.log(`  Current Pattern:  ${Math.floor(avgCurrent).toLocaleString()} ops/sec`);
console.log(`  Proposed Pattern: ${Math.floor(avgProposed).toLocaleString()} ops/sec`);
console.log(`  ES6 Classes:      ${Math.floor(avgES6).toLocaleString()} ops/sec`);
console.log('');

const proposedDiff = ((avgProposed - avgCurrent) / avgCurrent) * 100;

if (Math.abs(proposedDiff) < 3) {
	console.log('✓ Object creation performance is essentially equivalent.');
} else if (proposedDiff > 0) {
	console.log(`✓ Proposed pattern is ${proposedDiff.toFixed(2)}% faster at object creation.`);
} else {
	console.log(
		`⚠ Proposed pattern is ${Math.abs(proposedDiff).toFixed(2)}% slower at object creation.`
	);
}

console.log('\n=== Test Complete ===');
