(function () {
    'use strict';

    angular
        .module('jfy')
        .factory('ImportExportToExcel', ImportExportToExcel);

    function ImportExportToExcel(alasql, $log, $rootScope) {
        return {
            importFromExcel: function (event) {
                if (event.target.files.length == 0) {
                    return false;
                }
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    $rootScope.$broadcast('import-excel-data', data);
                });
            },
            exportToExcel: function (fileName, targetData) {
                if (!angular.isArray(targetData)) {
                    $log.error('Can not export error type data to excel.');
                    return;
                }
                alasql('SELECT * INTO XLSX("' + fileName + '.xlsx",{headers:true}) FROM ?', [targetData]);
            }
        }
    }
})();
