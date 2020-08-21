if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

var test = '627'; // insert test file number

describe('Test ' + test + ' - cast float for SUM, AVG when pivot', function () {
	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('Verify results', function () {
		var res = [];

		res = alasql(
			'SELECT [productLine], ("Series1"+[month]) AS [month], [extendedPrice] FROM ? PIVOT (SUM([extendedPrice]) FOR [month])',
			[data()]
		);
		console.log(res);
		assert.deepEqual(res, [
			{
				productLine: 'Trains',
				Series1February: 5151,
				Series1January: 2472.96,
			},
			{
				productLine: 'Vintage Cars',
				Series1January: 9887.34,
				Series1August: 1404,
				Series1September: 2055.74,
			},
			{
				productLine: 'Classic Cars',
				Series1March: 1903.22,
				Series1January: 10802.880000000001,
			},
			{
				productLine: 'Ships',
				Series1April: 3782,
				Series1January: 3773.38,
			},
			{
				productLine: 'Trucks and Buses',
				Series1December: 3394.98,
			},
		]);
	});

	function data() {
		return [
			{
				country: 'USA',
				orderNumber: '10100',
				year: '2013',
				countrycode: 'US',
				quantityOrdered: '30',
				priceEach: '171.7',
				productName: '1917 Grand Touring Sedan',
				productLine: 'Trains',
				sortkey: '1',
				productCode: 'S18_1749',
				month: 'February',
				extendedPrice: '5151.0',
				orderDate: '2013-02-06 00:00:00',
			},
			{
				country: 'USA',
				orderNumber: '10100',
				year: '2013',
				countrycode: 'US',
				quantityOrdered: '50',
				priceEach: '67.8',
				productName: '1911 Ford Town Car',
				productLine: 'Vintage Cars',
				sortkey: '1',
				productCode: 'S18_2248',
				month: 'January',
				extendedPrice: '3390.0',
				orderDate: '2013-01-06 00:00:00',
			},
			{
				country: 'USA',
				orderNumber: '10100',
				year: '2013',
				countrycode: 'US',
				quantityOrdered: '22',
				priceEach: '86.51',
				productName: '1932 Alfa Romeo 8C2300 Spider Sport',
				productLine: 'Classic Cars',
				sortkey: '1',
				productCode: 'S18_4409',
				month: 'March',
				extendedPrice: '1903.22',
				orderDate: '2013-03-06 00:00:00',
			},
			{
				country: 'USA',
				orderNumber: '10100',
				year: '2013',
				countrycode: 'US',
				quantityOrdered: '49',
				priceEach: '34.47',
				productName: '1936 Mercedes Benz 500k Roadster',
				productLine: 'Vintage Cars',
				sortkey: '1',
				productCode: 'S24_3969',
				month: 'January',
				extendedPrice: '1689.03',
				orderDate: '2013-01-06 00:00:00',
			},
			{
				country: 'Germany',
				orderNumber: '10101',
				year: '2013',
				countrycode: 'DE',
				quantityOrdered: '25',
				priceEach: '151.28',
				productName: '1932 Model A Ford J-Coupe',
				productLine: 'Ships',
				sortkey: '1',
				productCode: 'S18_2325',
				month: 'April',
				extendedPrice: '3782.0',
				orderDate: '2013-04-09 00:00:00',
			},
			{
				country: 'Germany',
				orderNumber: '10101',
				year: '2013',
				countrycode: 'DE',
				quantityOrdered: '26',
				priceEach: '145.13',
				productName: '1928 Mercedes-Benz SSK',
				productLine: 'Ships',
				sortkey: '1',
				productCode: 'S18_2795',
				month: 'January',
				extendedPrice: '3773.38',
				orderDate: '2013-01-09 00:00:00',
			},
			{
				country: 'Germany',
				orderNumber: '10101',
				year: '2013',
				countrycode: 'DE',
				quantityOrdered: '45',
				priceEach: '31.2',
				productName: '1939 Chevrolet Deluxe Coupe',
				productLine: 'Vintage Cars',
				sortkey: '1',
				productCode: 'S24_1937',
				month: 'August',
				extendedPrice: '1404.0',
				orderDate: '2013-08-09 00:00:00',
			},
			{
				country: 'Germany',
				orderNumber: '10101',
				year: '2013',
				countrycode: 'DE',
				quantityOrdered: '46',
				priceEach: '53.76',
				productName: '1938 Cadillac V-16 Presidential Limousine',
				productLine: 'Trains',
				sortkey: '1',
				productCode: 'S24_2022',
				month: 'January',
				extendedPrice: '2472.96',
				orderDate: '2013-01-09 00:00:00',
			},
			{
				country: 'USA',
				orderNumber: '10102',
				year: '2013',
				countrycode: 'US',
				quantityOrdered: '39',
				priceEach: '123.29',
				productName: '1937 Lincoln Berline',
				productLine: 'Vintage Cars',
				sortkey: '1',
				productCode: 'S18_1342',
				month: 'January',
				extendedPrice: '4808.31',
				orderDate: '2013-01-10 00:00:00',
			},
			{
				country: 'USA',
				orderNumber: '10102',
				year: '2013',
				countrycode: 'US',
				quantityOrdered: '41',
				priceEach: '50.14',
				productName: '1936 Mercedes-Benz 500K Special Roadster',
				productLine: 'Vintage Cars',
				sortkey: '1',
				productCode: 'S18_1367',
				month: 'September',
				extendedPrice: '2055.74',
				orderDate: '2013-09-10 00:00:00',
			},
			{
				country: 'Norway',
				orderNumber: '10103',
				year: '2013',
				countrycode: 'NO',
				quantityOrdered: '26',
				priceEach: '207.87',
				productName: '1952 Alpine Renault 1300',
				productLine: 'Classic Cars',
				sortkey: '1',
				productCode: 'S10_1949',
				month: 'January',
				extendedPrice: '5404.62',
				orderDate: '2013-01-29 00:00:00',
			},
			{
				country: 'Norway',
				orderNumber: '10103',
				year: '2013',
				countrycode: 'NO',
				quantityOrdered: '42',
				priceEach: '128.53',
				productName: '1962 LanciaA Delta 16V',
				productLine: 'Classic Cars',
				sortkey: '1',
				productCode: 'S10_4962',
				month: 'January',
				extendedPrice: '5398.26',
				orderDate: '2013-01-29 00:00:00',
			},
			{
				country: 'Norway',
				orderNumber: '10103',
				year: '2013',
				countrycode: 'NO',
				quantityOrdered: '27',
				priceEach: '125.74',
				productName: '1958 Setra Bus',
				productLine: 'Trucks and Buses',
				sortkey: '1',
				productCode: 'S12_1666',
				month: 'December',
				extendedPrice: '3394.98',
				orderDate: '2013-12-29 00:00:00',
			},
		];
	}
});
