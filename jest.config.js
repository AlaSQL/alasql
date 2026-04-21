/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: 'node',
	testMatch: ['<rootDir>/test/**/*.js'],
	testPathIgnorePatterns: [
		'/node_modules/',
		'<rootDir>/test/lib/',
		'<rootDir>/test/coverage/',
		'<rootDir>/test/performance/',
		'<rootDir>/test/browserTestRunner.js',
		'<rootDir>/test/test.js',
	],
	setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js'],
	maxWorkers: 1,
	testTimeout: 30000,
};
