if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var data = [
	{
		fecha_Venta: '2012-10-28',
		hora_venta: '23:35:17',
		CantVenta: 1,
		Sales: 12500,
		Product_Cost: 8250,
		Objetivo: 12500,
		gender: 'M',
		Age_rango: '36-45',
		marital_status: 'soltero',
		localidad: 'La Lucila',
		provincia: 'Buenos Aires',
		Product_desc: 'Corola ',
		Product_Family: 'Sedan',
		Product_Marca: 'Toyota',
		Canal_Venta_desc: 'Concesionarias Oficiales',
		mes: 'September',
	},
	{
		fecha_Venta: '2012-09-28',
		hora_venta: '23:35:17',
		CantVenta: 1,
		Sales: 12500,
		Product_Cost: 8250,
		Objetivo: 12500,
		gender: 'M',
		Age_rango: '36-45',
		marital_status: 'soltero',
		localidad: 'La Lucila',
		provincia: 'Buenos Aires',
		Product_desc: 'Corola ',
		Product_Family: 'Sedan',
		Product_Marca: 'Toyota',
		Canal_Venta_desc: 'Concesionarias Oficiales',
		mes: 'September',
	},
	{
		fecha_Venta: '2012-09-12',
		hora_venta: '23:35:17',
		CantVenta: 1,
		Sales: 12500,
		Product_Cost: 8250,
		Objetivo: 12500,
		gender: 'M',
		Age_rango: '36-45',
		marital_status: 'soltero',
		localidad: 'La Lucila',
		provincia: 'Buenos Aires',
		Product_desc: 'Corola ',
		Product_Family: 'Sedan',
		Product_Marca: 'Toyota',
		Canal_Venta_desc: 'Concesionarias Oficiales',
		mes: 'September',
	},
];

describe('373. Use functions in group by', function() {
	it('1. Use functions from GROUP BY without alias ', function(done) {
		var res = alasql(
			'SELECT MONTH(fecha_Venta), \
            SUM(Sales) Sales FROM ? GROUP BY MONTH(fecha_Venta)',
			[data]
		);

		assert.deepEqual(res, [
			{'MONTH(fecha_Venta)': 10, Sales: 12500},
			{'MONTH(fecha_Venta)': 9, Sales: 25000},
		]);

		done();
	});

	it('2. Use functions with alias from GROUP BY', function(done) {
		var res = alasql(
			'SELECT MONTH(fecha_Venta) AS mes, \
            SUM(Sales) Sales FROM ? GROUP BY MONTH(fecha_Venta)',
			[data]
		);

		assert.deepEqual(res, [{mes: 10, Sales: 12500}, {mes: 9, Sales: 25000}]);

		done();
	});
});
