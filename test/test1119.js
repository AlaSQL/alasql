if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..'); // You might need to adjust the path depending on where you save the test file
}

describe('Test 1119 - Trigger callback parameter', function () {
	const test = '1119'; // Test file number

	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) BEFORE INSERT trigger callback should receive the inserted row', function () {
		let triggerReceivedCorrectData = false; // Flag to check if trigger got the right data
		let receivedValue = undefined;

		// Define the trigger function
		alasql.fn.onchangeInsert = function (r) {
			receivedValue = r; // Store received value for debugging if needed
			// Check if 'r' is defined and has the correct property 'a' with value 123
			if (r && r.a === 123) {
				triggerReceivedCorrectData = true;
			}
		};

		// Setup table and trigger
		alasql('CREATE TABLE one (a INT)');
		alasql('CREATE TRIGGER two BEFORE INSERT ON one CALL onchangeInsert()');

		// Execute the insert that should fire the trigger
		alasql('INSERT INTO one VALUES (123)');

		// Assert that the flag was set, meaning the trigger function received the correct data
		assert(
			triggerReceivedCorrectData,
			'BEFORE INSERT trigger function did not receive the expected data. Received: ' +
				JSON.stringify(receivedValue)
		);

		// Clean up the function to avoid side effects in other tests
		delete alasql.fn.onchangeInsert;
	});

	it('B) AFTER INSERT trigger callback should receive the inserted row', function () {
		let triggerReceivedCorrectData = false;
		let receivedValue = undefined;

		alasql.fn.onchangeAfterInsert = function (r) {
			receivedValue = r;
			if (r && r.a === 456) {
				triggerReceivedCorrectData = true;
			}
		};

		alasql('CREATE TABLE two (a INT)');
		alasql('CREATE TRIGGER three AFTER INSERT ON two CALL onchangeAfterInsert()');
		alasql('INSERT INTO two VALUES (456)');

		assert(
			triggerReceivedCorrectData,
			'AFTER INSERT trigger function did not receive the expected data. Received: ' +
				JSON.stringify(receivedValue)
		);

		delete alasql.fn.onchangeAfterInsert;
	});

	it('C) BEFORE UPDATE trigger callback should receive old and new row data', function () {
		let triggerReceivedCorrectData = false;
		let receivedOldValue = undefined;
		let receivedNewValue = undefined;

		alasql.fn.onchangeUpdate = function (oldRow, newRow) {
			receivedOldValue = oldRow;
			receivedNewValue = newRow;
			if (oldRow && oldRow.a === 789 && newRow && newRow.a === 999) {
				triggerReceivedCorrectData = true;
			}
		};

		alasql('CREATE TABLE three (a INT)');
		alasql('INSERT INTO three VALUES (789)');
		alasql('CREATE TRIGGER four BEFORE UPDATE ON three CALL onchangeUpdate()');
		alasql('UPDATE three SET a = 999 WHERE a = 789');

		assert(
			triggerReceivedCorrectData,
			'BEFORE UPDATE trigger function did not receive the expected data. Received old: ' +
				JSON.stringify(receivedOldValue) +
				', new: ' +
				JSON.stringify(receivedNewValue)
		);

		delete alasql.fn.onchangeUpdate;
	});

	it('D) BEFORE DELETE trigger callback should receive the row being deleted', function () {
		let triggerReceivedCorrectData = false;
		let receivedValue = undefined;

		alasql.fn.onchangeDelete = function (r) {
			receivedValue = r;
			if (r && r.a === 111) {
				triggerReceivedCorrectData = true;
			}
		};

		alasql('CREATE TABLE four (a INT)');
		alasql('INSERT INTO four VALUES (111)');
		alasql('CREATE TRIGGER five BEFORE DELETE ON four CALL onchangeDelete()');
		alasql('DELETE FROM four WHERE a = 111');

		assert(
			triggerReceivedCorrectData,
			'BEFORE DELETE trigger function did not receive the expected data. Received: ' +
				JSON.stringify(receivedValue)
		);

		delete alasql.fn.onchangeDelete;
	});

	it('E) INSTEAD OF INSERT trigger callback should receive the row', function () {
		let triggerReceivedCorrectData = false;
		let receivedValue = undefined;

		alasql.fn.onchangeInsteadInsert = function (r) {
			receivedValue = r;
			if (r && r.a === 222) {
				triggerReceivedCorrectData = true;
				// Example: We could manually insert or modify 'r' here if needed
			}
		};

		alasql('CREATE TABLE five (a INT)');
		alasql('CREATE TRIGGER six INSTEAD OF INSERT ON five CALL onchangeInsteadInsert()');
		alasql('INSERT INTO five VALUES (222)'); // This should fire the trigger but not insert data by default

		// Check that the trigger function received the data
		assert(
			triggerReceivedCorrectData,
			'INSTEAD OF INSERT trigger function did not receive the expected data. Received: ' +
				JSON.stringify(receivedValue)
		);

		// Verify that the data was NOT actually inserted because it was an INSTEAD OF trigger
		const res = alasql('SELECT * FROM five');
		assert.deepEqual(res, [], 'Data should not have been inserted with INSTEAD OF trigger');

		delete alasql.fn.onchangeInsteadInsert;
	});
});
