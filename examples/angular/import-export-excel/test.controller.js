(function () {
	'use strict';

	angular.module('jfy').controller('TestController', TestController);

	/** @ngInject */
	function TestController($scope, ImportExportToExcel) {
		var vm = this;

		vm.tableData = [
			{a: 1, b: 10},
			{a: 2, b: 20},
		];
		vm.export = function () {
			ImportExportToExcel.exportToExcel('test', vm.tableData);
		};
		$scope.$on('import-excel-data', function (e, v) {
			console.log('excel-data:', v);
		});
	}
})();
