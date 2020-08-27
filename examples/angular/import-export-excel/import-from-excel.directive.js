(function () {
	'use strict';

	angular.module('jfy').directive('importFromExcel', importFromExcel);

	function importFromExcel(ImportExportToExcel) {
		var directive = {
			restrict: 'A',
			link: linkFunc,
		};
		return directive;

		function linkFunc(scope, element) {
			element.change(function (event) {
				ImportExportToExcel.importFromExcel(event.originalEvent);
			});
		}
	}
})();
