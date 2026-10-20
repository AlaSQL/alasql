// Provide Mocha-compatible before/after aliases for Bun's test runner.
// In Bun's preload context, beforeAll/afterAll are in the module scope
// (not on globalThis), so we define delegating wrappers on globalThis.
Object.defineProperty(globalThis, 'before', {
	value: function (...args) {
		return beforeAll(...args);
	},
	configurable: true,
	writable: true,
});
Object.defineProperty(globalThis, 'after', {
	value: function (...args) {
		return afterAll(...args);
	},
	configurable: true,
	writable: true,
});
