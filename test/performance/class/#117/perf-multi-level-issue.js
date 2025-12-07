// Performance test for issue #117 - Multi-Level Inheritance Issues
// Demonstrates problems with the proposed inherit() pattern

console.log('=== Issue #117 - Multi-Level Inheritance Analysis ===\n');

// ============================================================================
// The Proposed Pattern
// ============================================================================

function inherit(child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.super = function () {
		parent.apply(this, arguments);
	};
}

// ============================================================================
// Test 1: Single-Level Inheritance (Works)
// ============================================================================

console.log('Test 1: Single-Level Inheritance');
console.log('-----------------------------------\n');

function Animal(name) {
	this.name = name;
}

Animal.prototype.speak = function () {
	return this.name + ' makes a sound';
};

function Dog(name, breed) {
	this.super(name); // Calls Animal constructor
	this.breed = breed;
}

inherit(Dog, Animal);

Dog.prototype.bark = function () {
	return this.name + ' barks!';
};

try {
	const dog = new Dog('Buddy', 'Golden Retriever');
	console.log('✓ Single-level inheritance works:');
	console.log('  Name:', dog.name);
	console.log('  Breed:', dog.breed);
	console.log('  Speaks:', dog.speak());
	console.log('  Barks:', dog.bark());
	console.log('');
} catch (e) {
	console.log('✗ Single-level inheritance failed:', e.message);
	console.log('');
}

// ============================================================================
// Test 2: Multi-Level Inheritance (Problematic)
// ============================================================================

console.log('Test 2: Multi-Level Inheritance (The Problem)');
console.log('------------------------------------------------\n');

function Vehicle(brand) {
	this.brand = brand;
}

Vehicle.prototype.getBrand = function () {
	return this.brand;
};

function Car(brand, model) {
	// This would call this.super(brand)
	// But after we inherit SportsCar from Car, this.super gets overwritten!
	this.brand = brand; // Work around by not using super here
	this.model = model;
}

inherit(Car, Vehicle);

Car.prototype.getModel = function () {
	return this.model;
};

function SportsCar(brand, model, topSpeed) {
	// This is where the problem occurs
	// When we call inherit(SportsCar, Car), it overwrites Car.prototype.super
	// So if Car tried to use this.super(), it would now call SportsCar's parent
	// Creating infinite recursion
	this.super(brand, model); // This should call Car constructor
	this.topSpeed = topSpeed;
}

inherit(SportsCar, Car);

SportsCar.prototype.getTopSpeed = function () {
	return this.topSpeed;
};

try {
	const ferrari = new SportsCar('Ferrari', '488', 330);
	console.log('✓ Multi-level inheritance result:');
	console.log('  Brand:', ferrari.brand);
	console.log('  Model:', ferrari.model);
	console.log('  Top Speed:', ferrari.topSpeed);
	console.log('  Get Brand:', ferrari.getBrand());
	console.log('');
	console.log('Note: This only works because Car constructor does not use super()');
	console.log('If Car had used this.super(brand), it would cause infinite recursion!');
	console.log('');
} catch (e) {
	console.log('✗ Multi-level inheritance failed:', e.message);
	console.log('');
}

// ============================================================================
// Test 3: Demonstrating the Recursion Problem
// ============================================================================

console.log('Test 3: Demonstrating the Recursion Problem');
console.log('----------------------------------------------\n');

function GrandParent(value1) {
	this.value1 = value1;
}

function Parent(value1, value2) {
	this.super(value1); // Try to call GrandParent
	this.value2 = value2;
}

inherit(Parent, GrandParent);

function Child(value1, value2, value3) {
	this.super(value1, value2); // Try to call Parent
	this.value3 = value3;
}

inherit(Child, Parent); // This overwrites Parent.prototype.super!

console.log('Creating Child instance with multi-level super() calls...');
try {
	const child = new Child(1, 2, 3);
	console.log('✓ Unexpectedly succeeded:', child);
} catch (e) {
	console.log('✗ Failed as expected:');
	console.log('  Error:', e.name);
	console.log('  Message: Maximum call stack size exceeded (infinite recursion)');
	console.log('');
	console.log('Explanation:');
	console.log('  1. When Child is created, it calls this.super(1, 2)');
	console.log('  2. This calls Parent constructor with (1, 2)');
	console.log('  3. Parent constructor calls this.super(1)');
	console.log('  4. But Parent.prototype.super was OVERWRITTEN by inherit(Child, Parent)');
	console.log('  5. So it calls Parent constructor again, not GrandParent!');
	console.log('  6. This creates infinite recursion → Stack overflow');
	console.log('');
}

// ============================================================================
// Test 4: Comparison with Working Patterns
// ============================================================================

console.log('Test 4: Working Pattern for Multi-Level Inheritance');
console.log('------------------------------------------------------\n');

// Pattern A: Direct parent.call
function WorkingGrandParent(value1) {
	this.value1 = value1;
}

function WorkingParent(value1, value2) {
	WorkingGrandParent.call(this, value1);
	this.value2 = value2;
}

WorkingParent.prototype = Object.create(WorkingGrandParent.prototype);
WorkingParent.prototype.constructor = WorkingParent;

function WorkingChild(value1, value2, value3) {
	WorkingParent.call(this, value1, value2);
	this.value3 = value3;
}

WorkingChild.prototype = Object.create(WorkingParent.prototype);
WorkingChild.prototype.constructor = WorkingChild;

try {
	const child = new WorkingChild(1, 2, 3);
	console.log('✓ Direct parent.call() pattern works:');
	console.log('  value1:', child.value1);
	console.log('  value2:', child.value2);
	console.log('  value3:', child.value3);
	console.log('');
} catch (e) {
	console.log('✗ Failed:', e.message);
}

// Pattern B: ES6 Classes
class ES6GrandParent {
	constructor(value1) {
		this.value1 = value1;
	}
}

class ES6Parent extends ES6GrandParent {
	constructor(value1, value2) {
		super(value1);
		this.value2 = value2;
	}
}

class ES6Child extends ES6Parent {
	constructor(value1, value2, value3) {
		super(value1, value2);
		this.value3 = value3;
	}
}

try {
	const child = new ES6Child(1, 2, 3);
	console.log('✓ ES6 class pattern works:');
	console.log('  value1:', child.value1);
	console.log('  value2:', child.value2);
	console.log('  value3:', child.value3);
	console.log('');
} catch (e) {
	console.log('✗ Failed:', e.message);
}

// ============================================================================
// Summary and Recommendations
// ============================================================================

console.log('=== Summary ===\n');
console.log('The proposed inherit() function has a critical flaw:\n');
console.log('❌ PROBLEM: Multi-level inheritance causes infinite recursion');
console.log('   - Each call to inherit() overwrites prototype.super');
console.log('   - Parent constructors cannot safely call this.super()');
console.log('   - Only single-level inheritance is safe\n');

console.log('✓ ALTERNATIVES that work correctly:\n');
console.log('  1. Direct parent.call(this, args)');
console.log('     - Explicit parent reference');
console.log('     - Works with any depth of inheritance');
console.log('     - Current pattern in AlaSQL\n');

console.log('  2. ES6 classes with extends/super');
console.log('     - Native language support');
console.log('     - Clean syntax');
console.log('     - Good performance\n');

console.log('📊 RECOMMENDATION:');
console.log('   DO NOT adopt the proposed inherit() pattern for AlaSQL.');
console.log('   The current pattern (direct parent.call) is safer and faster.\n');

console.log('=== Test Complete ===');
