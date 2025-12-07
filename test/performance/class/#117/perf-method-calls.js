// Performance test for issue #117 - Method Call Performance
// Tests method invocation speed through inheritance chains

console.log('=== Performance Test #117 - Method Call Performance ===\n');

// ============================================================================
// Setup: Inheritance with Multiple Levels
// ============================================================================

// Pattern 1: Current (Direct prototype)
function Current_GrandParent(name) {
	this.name = name;
	this.level = 'grandparent';
}

Current_GrandParent.prototype.getName = function () {
	return this.name;
};

Current_GrandParent.prototype.getLevel = function () {
	return this.level;
};

function Current_Parent(name, age) {
	Current_GrandParent.call(this, name);
	this.age = age;
	this.level = 'parent';
}

Current_Parent.prototype = Object.create(Current_GrandParent.prototype);
Current_Parent.prototype.constructor = Current_Parent;

Current_Parent.prototype.getAge = function () {
	return this.age;
};

Current_Parent.prototype.getInfo = function () {
	return this.getName() + ' is ' + this.getAge();
};

function Current_Child(name, age, grade) {
	Current_Parent.call(this, name, age);
	this.grade = grade;
	this.level = 'child';
}

Current_Child.prototype = Object.create(Current_Parent.prototype);
Current_Child.prototype.constructor = Current_Child;

Current_Child.prototype.getGrade = function () {
	return this.grade;
};

Current_Child.prototype.getFullInfo = function () {
	return this.getInfo() + ' in grade ' + this.getGrade();
};

// Pattern 2: Proposed (with inherit) - Single level only to avoid recursion issue
function inherit(child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.super = function () {
		parent.apply(this, arguments);
	};
}

function Proposed_Parent(name, age) {
	this.name = name;
	this.age = age;
	this.level = 'parent';
}

Proposed_Parent.prototype.getName = function () {
	return this.name;
};

Proposed_Parent.prototype.getLevel = function () {
	return this.level;
};

Proposed_Parent.prototype.getAge = function () {
	return this.age;
};

Proposed_Parent.prototype.getInfo = function () {
	return this.getName() + ' is ' + this.getAge();
};

function Proposed_Child(name, age, grade) {
	this.super(name, age);
	this.grade = grade;
	this.level = 'child';
}

inherit(Proposed_Child, Proposed_Parent);

Proposed_Child.prototype.getGrade = function () {
	return this.grade;
};

Proposed_Child.prototype.getFullInfo = function () {
	return this.getInfo() + ' in grade ' + this.getGrade();
};

// Pattern 3: ES6 Classes
class ES6_GrandParent {
	constructor(name) {
		this.name = name;
		this.level = 'grandparent';
	}

	getName() {
		return this.name;
	}

	getLevel() {
		return this.level;
	}
}

class ES6_Parent extends ES6_GrandParent {
	constructor(name, age) {
		super(name);
		this.age = age;
		this.level = 'parent';
	}

	getAge() {
		return this.age;
	}

	getInfo() {
		return this.getName() + ' is ' + this.getAge();
	}
}

class ES6_Child extends ES6_Parent {
	constructor(name, age, grade) {
		super(name, age);
		this.grade = grade;
		this.level = 'child';
	}

	getGrade() {
		return this.grade;
	}

	getFullInfo() {
		return this.getInfo() + ' in grade ' + this.getGrade();
	}
}

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

	return {
		name: name,
		iterations: iterations,
		elapsed: elapsed,
		opsPerSec: Math.floor((iterations / elapsed) * 1000),
	};
}

const iterations = 10000000; // 10 million iterations

console.log('Configuration: 10,000,000 method calls per test\n');

// Create test objects
const currentObj = new Current_Child('Alice', 25, 10);
const proposedObj = new Proposed_Child('Alice', 25, 10);
const es6Obj = new ES6_Child('Alice', 25, 10);

// Test 1: Own Method Calls (defined on child)
console.log('Test 1: Own Method Calls (Child Methods)');
console.log('-------------------------------------------');

const ownMethodResults = [];

ownMethodResults.push(
	benchmark('Current Pattern', () => currentObj.getGrade(), iterations)
);

ownMethodResults.push(
	benchmark('Proposed Pattern', () => proposedObj.getGrade(), iterations)
);

ownMethodResults.push(
	benchmark('ES6 Classes', () => es6Obj.getGrade(), iterations)
);

for (const result of ownMethodResults) {
	console.log(
		`${result.name.padEnd(20)}: ${result.opsPerSec.toLocaleString().padStart(14)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// Test 2: Parent Method Calls (one level up)
console.log('Test 2: Parent Method Calls (One Level Up)');
console.log('---------------------------------------------');

const parentMethodResults = [];

parentMethodResults.push(
	benchmark('Current Pattern', () => currentObj.getAge(), iterations)
);

parentMethodResults.push(
	benchmark('Proposed Pattern', () => proposedObj.getAge(), iterations)
);

parentMethodResults.push(
	benchmark('ES6 Classes', () => es6Obj.getAge(), iterations)
);

for (const result of parentMethodResults) {
	console.log(
		`${result.name.padEnd(20)}: ${result.opsPerSec.toLocaleString().padStart(14)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// Test 3: GrandParent Method Calls (two levels up)
console.log('Test 3: GrandParent Method Calls (Two Levels Up)');
console.log('---------------------------------------------------');

const grandParentMethodResults = [];

grandParentMethodResults.push(
	benchmark('Current Pattern', () => currentObj.getName(), iterations)
);

grandParentMethodResults.push(
	benchmark('Proposed Pattern', () => proposedObj.getName(), iterations)
);

grandParentMethodResults.push(
	benchmark('ES6 Classes', () => es6Obj.getName(), iterations)
);

for (const result of grandParentMethodResults) {
	console.log(
		`${result.name.padEnd(20)}: ${result.opsPerSec.toLocaleString().padStart(14)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// Test 4: Method Chains (calling multiple methods)
console.log('Test 4: Method Chains (Multiple Calls)');
console.log('-----------------------------------------');

const chainResults = [];

chainResults.push(
	benchmark('Current Pattern', () => currentObj.getFullInfo(), iterations)
);

chainResults.push(
	benchmark('Proposed Pattern', () => proposedObj.getFullInfo(), iterations)
);

chainResults.push(
	benchmark('ES6 Classes', () => es6Obj.getFullInfo(), iterations)
);

for (const result of chainResults) {
	console.log(
		`${result.name.padEnd(20)}: ${result.opsPerSec.toLocaleString().padStart(14)} ops/sec (${result.elapsed}ms)`
	);
}

console.log('\n');

// Test 5: Property Access (baseline comparison)
console.log('Test 5: Direct Property Access (Baseline)');
console.log('--------------------------------------------');

const propertyResults = [];

propertyResults.push(
	benchmark('Current Pattern', () => currentObj.name, iterations)
);

propertyResults.push(
	benchmark('Proposed Pattern', () => proposedObj.name, iterations)
);

propertyResults.push(
	benchmark('ES6 Classes', () => es6Obj.name, iterations)
);

for (const result of propertyResults) {
	console.log(
		`${result.name.padEnd(20)}: ${result.opsPerSec.toLocaleString().padStart(14)} ops/sec (${result.elapsed}ms)`
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

analyzeResults('Own Method Calls', ownMethodResults);
analyzeResults('Parent Method Calls', parentMethodResults);
analyzeResults('GrandParent Method Calls', grandParentMethodResults);
analyzeResults('Method Chains', chainResults);
analyzeResults('Property Access', propertyResults);

// Calculate average performance
const avgCurrent =
	(ownMethodResults[0].opsPerSec +
		parentMethodResults[0].opsPerSec +
		grandParentMethodResults[0].opsPerSec +
		chainResults[0].opsPerSec) /
	4;

const avgProposed =
	(ownMethodResults[1].opsPerSec +
		parentMethodResults[1].opsPerSec +
		grandParentMethodResults[1].opsPerSec +
		chainResults[1].opsPerSec) /
	4;

const avgES6 =
	(ownMethodResults[2].opsPerSec +
		parentMethodResults[2].opsPerSec +
		grandParentMethodResults[2].opsPerSec +
		chainResults[2].opsPerSec) /
	4;

console.log('=== Summary ===\n');
console.log('Average Method Call Performance:');
console.log(`  Current Pattern:  ${Math.floor(avgCurrent).toLocaleString()} ops/sec`);
console.log(`  Proposed Pattern: ${Math.floor(avgProposed).toLocaleString()} ops/sec`);
console.log(`  ES6 Classes:      ${Math.floor(avgES6).toLocaleString()} ops/sec`);
console.log('');

const proposedDiff = ((avgProposed - avgCurrent) / avgCurrent) * 100;

if (Math.abs(proposedDiff) < 2) {
	console.log('✓ Method call performance is essentially equivalent.');
} else if (proposedDiff > 0) {
	console.log(`✓ Proposed pattern is ${proposedDiff.toFixed(2)}% faster for method calls.`);
} else {
	console.log(
		`⚠ Proposed pattern is ${Math.abs(proposedDiff).toFixed(2)}% slower for method calls.`
	);
}

console.log(
	'\nNote: The super() method in the proposed pattern is used during construction,'
);
console.log('not during method calls, so it should not impact runtime method performance.');

console.log('\n=== Test Complete ===');
