define(['./sqljs_driver', './websql_driver'], function (SQLjs, WebSQL) {

    return {
        sqljs: (new SQLjs),
        websql: (new WebSQL)
    };

});
