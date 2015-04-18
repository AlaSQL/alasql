var fs = require('fs'), assert = require('assert');
var frac;
describe('source', function() { it('should load', function() { frac = require('./'); }); });
var xltestfiles=[
  ['xl.00001.tsv', 10000],
  ['xl.0001.tsv',  10000],
  ['xl.001.tsv',   10000],
  ['xl.01.tsv',    10000],
  ['oddities.tsv', 25]
];

function xlline(o,j,m,w) {
  it(j, function(done) {
    var d, q, qq;
    for(var i = j*w; i < m-3 && i < (j+1)*w; ++i) {
      d = o[i].split("\t");

      q = frac.cont(Number(d[0]), 9, true);
      qq = (q[0]||q[1]) ? (q[0] || "") + " " + (q[1] ? q[1] + "/" + q[2] : "   ") : "0    ";
      assert.equal(qq, d[1], d[1] + " 1");

      q = frac.cont(Number(d[0]), 99, true);
      qq = (q[0]||q[1]) ? (q[0] || "") + " " + (q[1] ? (q[1] < 10 ? " " : "") + q[1] + "/" + q[2] + (q[2]<10?" ":"") : "     ") : "0      ";
      assert.equal(qq, d[2], d[2] + " 2");

      q = frac.cont(Number(d[0]), 999, true);
      qq = (q[0]||q[1]) ? (q[0] || "") + " " + (q[1] ? (q[1] < 100 ? " " : "") + (q[1] < 10 ? " " : "") + q[1] + "/" + q[2] + (q[2]<10?" ":"") + (q[2]<100?" ":""): "       ") : "0        ";
      assert.equal(qq, d[3], d[3] + " 3");
    }
    done();
  });
}
function parsexl(f,w) {
  if(!fs.existsSync(f)) return;
  var o = fs.readFileSync(f, 'utf-8').split("\n");
  for(var j = 0, m = o.length-3; j < m/w; ++j) xlline(o,j,m,w);
}
xltestfiles.forEach(function(x) {
  var f = './test_files/' + x[0];
  describe(x[0], function() {
    parsexl(f,x[1]);
  });
});
