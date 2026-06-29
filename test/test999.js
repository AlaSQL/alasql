if (typeof module !== 'undefined' && typeof require !== 'undefined') {
var alasql = require('../dist/alasql.js');
}

describe('Test COALESCE bugfix', function () {
it('Should return NULL if all arguments are null', function () {
// Pass a JavaScript undefined variable as a parameter ($1)
var res = alasql('SELECT COALESCE(NULL, $0) AS result', [undefined]);
if (res[0].result !== null) {
throw new Error('COALESCE returned undefined instead of null');
}
});
});
