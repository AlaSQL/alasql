// Provide Mocha-compatible before/after aliases for Jest
global.before = global.beforeAll;
global.after = global.afterAll;

// Mocha supports this.timeout(ms) inside it/describe callbacks to set per-test timeouts.
// Jest handles timeouts via jest.config.js `testTimeout`. Provide a no-op injected into
// each test's `this` context so existing tests using this.timeout() don't throw an error.
beforeEach(function () {
	this.timeout = function () {};
});
