if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var md5 = require('blueimp-md5');
} else {
	__dirname = '.';

	// md5
	!(function(n) {
		'use strict';
		function t(n, t) {
			var r = (65535 & n) + (65535 & t),
				e = (n >> 16) + (t >> 16) + (r >> 16);
			return (e << 16) | (65535 & r);
		}
		function r(n, t) {
			return (n << t) | (n >>> (32 - t));
		}
		function e(n, e, o, u, c, f) {
			return t(r(t(t(e, n), t(u, f)), c), o);
		}
		function o(n, t, r, o, u, c, f) {
			return e((t & r) | (~t & o), n, t, u, c, f);
		}
		function u(n, t, r, o, u, c, f) {
			return e((t & o) | (r & ~o), n, t, u, c, f);
		}
		function c(n, t, r, o, u, c, f) {
			return e(t ^ r ^ o, n, t, u, c, f);
		}
		function f(n, t, r, o, u, c, f) {
			return e(r ^ (t | ~o), n, t, u, c, f);
		}
		function i(n, r) {
			(n[r >> 5] |= 128 << (r % 32)), (n[(((r + 64) >>> 9) << 4) + 14] = r);
			var e,
				i,
				a,
				h,
				d,
				l = 1732584193,
				g = -271733879,
				v = -1732584194,
				m = 271733878;
			for (e = 0; e < n.length; e += 16)
				(i = l),
					(a = g),
					(h = v),
					(d = m),
					(l = o(l, g, v, m, n[e], 7, -680876936)),
					(m = o(m, l, g, v, n[e + 1], 12, -389564586)),
					(v = o(v, m, l, g, n[e + 2], 17, 606105819)),
					(g = o(g, v, m, l, n[e + 3], 22, -1044525330)),
					(l = o(l, g, v, m, n[e + 4], 7, -176418897)),
					(m = o(m, l, g, v, n[e + 5], 12, 1200080426)),
					(v = o(v, m, l, g, n[e + 6], 17, -1473231341)),
					(g = o(g, v, m, l, n[e + 7], 22, -45705983)),
					(l = o(l, g, v, m, n[e + 8], 7, 1770035416)),
					(m = o(m, l, g, v, n[e + 9], 12, -1958414417)),
					(v = o(v, m, l, g, n[e + 10], 17, -42063)),
					(g = o(g, v, m, l, n[e + 11], 22, -1990404162)),
					(l = o(l, g, v, m, n[e + 12], 7, 1804603682)),
					(m = o(m, l, g, v, n[e + 13], 12, -40341101)),
					(v = o(v, m, l, g, n[e + 14], 17, -1502002290)),
					(g = o(g, v, m, l, n[e + 15], 22, 1236535329)),
					(l = u(l, g, v, m, n[e + 1], 5, -165796510)),
					(m = u(m, l, g, v, n[e + 6], 9, -1069501632)),
					(v = u(v, m, l, g, n[e + 11], 14, 643717713)),
					(g = u(g, v, m, l, n[e], 20, -373897302)),
					(l = u(l, g, v, m, n[e + 5], 5, -701558691)),
					(m = u(m, l, g, v, n[e + 10], 9, 38016083)),
					(v = u(v, m, l, g, n[e + 15], 14, -660478335)),
					(g = u(g, v, m, l, n[e + 4], 20, -405537848)),
					(l = u(l, g, v, m, n[e + 9], 5, 568446438)),
					(m = u(m, l, g, v, n[e + 14], 9, -1019803690)),
					(v = u(v, m, l, g, n[e + 3], 14, -187363961)),
					(g = u(g, v, m, l, n[e + 8], 20, 1163531501)),
					(l = u(l, g, v, m, n[e + 13], 5, -1444681467)),
					(m = u(m, l, g, v, n[e + 2], 9, -51403784)),
					(v = u(v, m, l, g, n[e + 7], 14, 1735328473)),
					(g = u(g, v, m, l, n[e + 12], 20, -1926607734)),
					(l = c(l, g, v, m, n[e + 5], 4, -378558)),
					(m = c(m, l, g, v, n[e + 8], 11, -2022574463)),
					(v = c(v, m, l, g, n[e + 11], 16, 1839030562)),
					(g = c(g, v, m, l, n[e + 14], 23, -35309556)),
					(l = c(l, g, v, m, n[e + 1], 4, -1530992060)),
					(m = c(m, l, g, v, n[e + 4], 11, 1272893353)),
					(v = c(v, m, l, g, n[e + 7], 16, -155497632)),
					(g = c(g, v, m, l, n[e + 10], 23, -1094730640)),
					(l = c(l, g, v, m, n[e + 13], 4, 681279174)),
					(m = c(m, l, g, v, n[e], 11, -358537222)),
					(v = c(v, m, l, g, n[e + 3], 16, -722521979)),
					(g = c(g, v, m, l, n[e + 6], 23, 76029189)),
					(l = c(l, g, v, m, n[e + 9], 4, -640364487)),
					(m = c(m, l, g, v, n[e + 12], 11, -421815835)),
					(v = c(v, m, l, g, n[e + 15], 16, 530742520)),
					(g = c(g, v, m, l, n[e + 2], 23, -995338651)),
					(l = f(l, g, v, m, n[e], 6, -198630844)),
					(m = f(m, l, g, v, n[e + 7], 10, 1126891415)),
					(v = f(v, m, l, g, n[e + 14], 15, -1416354905)),
					(g = f(g, v, m, l, n[e + 5], 21, -57434055)),
					(l = f(l, g, v, m, n[e + 12], 6, 1700485571)),
					(m = f(m, l, g, v, n[e + 3], 10, -1894986606)),
					(v = f(v, m, l, g, n[e + 10], 15, -1051523)),
					(g = f(g, v, m, l, n[e + 1], 21, -2054922799)),
					(l = f(l, g, v, m, n[e + 8], 6, 1873313359)),
					(m = f(m, l, g, v, n[e + 15], 10, -30611744)),
					(v = f(v, m, l, g, n[e + 6], 15, -1560198380)),
					(g = f(g, v, m, l, n[e + 13], 21, 1309151649)),
					(l = f(l, g, v, m, n[e + 4], 6, -145523070)),
					(m = f(m, l, g, v, n[e + 11], 10, -1120210379)),
					(v = f(v, m, l, g, n[e + 2], 15, 718787259)),
					(g = f(g, v, m, l, n[e + 9], 21, -343485551)),
					(l = t(l, i)),
					(g = t(g, a)),
					(v = t(v, h)),
					(m = t(m, d));
			return [l, g, v, m];
		}
		function a(n) {
			var t,
				r = '';
			for (t = 0; t < 32 * n.length; t += 8)
				r += String.fromCharCode((n[t >> 5] >>> (t % 32)) & 255);
			return r;
		}
		function h(n) {
			var t,
				r = [];
			for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
			for (t = 0; t < 8 * n.length; t += 8)
				r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << (t % 32);
			return r;
		}
		function d(n) {
			return a(i(h(n), 8 * n.length));
		}
		function l(n, t) {
			var r,
				e,
				o = h(n),
				u = [],
				c = [];
			for (
				u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0;
				16 > r;
				r += 1
			)
				(u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
			return (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640));
		}
		function g(n) {
			var t,
				r,
				e = '0123456789abcdef',
				o = '';
			for (r = 0; r < n.length; r += 1)
				(t = n.charCodeAt(r)), (o += e.charAt((t >>> 4) & 15) + e.charAt(15 & t));
			return o;
		}
		function v(n) {
			return unescape(encodeURIComponent(n));
		}
		function m(n) {
			return d(v(n));
		}
		function p(n) {
			return g(m(n));
		}
		function s(n, t) {
			return l(v(n), v(t));
		}
		function C(n, t) {
			return g(s(n, t));
		}
		function A(n, t, r) {
			return t ? (r ? s(t, n) : C(t, n)) : r ? m(n) : p(n);
		}
		'function' == typeof define && define.amd
			? define(function() {
					return A;
				})
			: 'object' == typeof module && module.exports ? (module.exports = A) : (n.md5 = A);
	})(this);
}

describe('Test 293 SLT#1', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test293;USE test293');

		done();
	});

	it('2. CREATE TABLES', function(done) {
		alasql(function() {
			/*
    CREATE TABLE t1(a INTEGER, b INTEGER, c INTEGER, d INTEGER, e INTEGER);
    INSERT INTO t1(e,c,b,d,a) VALUES(103,102,100,101,104);
    INSERT INTO t1(a,c,d,e,b) VALUES(107,106,108,109,105);
    INSERT INTO t1(e,d,b,a,c) VALUES(110,114,112,111,113);
    INSERT INTO t1(d,c,e,a,b) VALUES(116,119,117,115,118);
    INSERT INTO t1(c,d,b,e,a) VALUES(123,122,124,120,121);
    INSERT INTO t1(a,d,b,e,c) VALUES(127,128,129,126,125);
    INSERT INTO t1(e,c,a,d,b) VALUES(132,134,131,133,130);
    INSERT INTO t1(a,d,b,e,c) VALUES(138,136,139,135,137);
    INSERT INTO t1(e,c,d,a,b) VALUES(144,141,140,142,143);
    INSERT INTO t1(b,a,e,d,c) VALUES(145,149,146,148,147);
    INSERT INTO t1(b,c,a,d,e) VALUES(151,150,153,154,152);
    INSERT INTO t1(c,e,a,d,b) VALUES(155,157,159,156,158);
    INSERT INTO t1(c,b,a,d,e) VALUES(161,160,163,164,162);
    INSERT INTO t1(b,d,a,e,c) VALUES(167,169,168,165,166);
    INSERT INTO t1(d,b,c,e,a) VALUES(171,170,172,173,174);
    INSERT INTO t1(e,c,a,d,b) VALUES(177,176,179,178,175);
    INSERT INTO t1(b,e,a,d,c) VALUES(181,180,182,183,184);
    INSERT INTO t1(c,a,b,e,d) VALUES(187,188,186,189,185);
    INSERT INTO t1(d,b,c,e,a) VALUES(190,194,193,192,191);
    INSERT INTO t1(a,e,b,d,c) VALUES(199,197,198,196,195);
    INSERT INTO t1(b,c,d,a,e) VALUES(200,202,203,201,204);
    INSERT INTO t1(c,e,a,b,d) VALUES(208,209,205,206,207);
    INSERT INTO t1(c,e,a,d,b) VALUES(214,210,213,212,211);
    INSERT INTO t1(b,c,a,d,e) VALUES(218,215,216,217,219);
    INSERT INTO t1(b,e,d,a,c) VALUES(223,221,222,220,224);
    INSERT INTO t1(d,e,b,a,c) VALUES(226,227,228,229,225);
    INSERT INTO t1(a,c,b,e,d) VALUES(234,231,232,230,233);
    INSERT INTO t1(e,b,a,c,d) VALUES(237,236,239,235,238);
    INSERT INTO t1(e,c,b,a,d) VALUES(242,244,240,243,241);
    INSERT INTO t1(e,d,c,b,a) VALUES(246,248,247,249,245);

  */
		});
		done();
	});

	var q1, q2;

	it('3. SELECT 1 - no modifier', function(done) {
		alasql.options.modifier = undefined;

		var res = alasql(
			'SELECT CASE WHEN c>(SELECT avg(c) FROM t1) \
      THEN a*2 ELSE b*10 END FROM t1 ORDER BY 1'
		);
		//console.log(res);
		assert.deepEqual(res.length, 30);
		q1 = res;
		var rs = res
			.map(function(d) {
				return d[Object.keys(d)[0]] + '\n';
			})
			.join('');
		// var rs = res.data.map(function(d){return d[res.columns[0].columnid]+'\n'}).join('');
		//    console.log('char1',rs.length);
		rhash = md5(rs);
		assert.deepEqual(rhash, '3c13dee48d9356ae19af2515e05e6b54');
		done();
	});

	it('4. SELECT 1 - RECORDSET', function(done) {
		alasql.options.modifier = 'RECORDSET';

		var res = alasql(
			'SELECT CASE WHEN c>(SELECT avg(c) FROM t1) \
      THEN a*2 ELSE b*10 END FROM t1 ORDER BY 1'
		);
		//console.log(res);
		q2 = res.data;
		assert.deepEqual(res.data.length, 30);
		var rs = res.data
			.map(function(d) {
				return d[res.columns[0].columnid] + '\n';
			})
			.join('');
		//    console.log('char2',rs.length);
		rhash = md5(rs);
		assert.deepEqual(rhash, '3c13dee48d9356ae19af2515e05e6b54');
		done();
	});

	it('5. SELECT 1', function(done) {
		alasql.options.modifier = undefined;
		var res = alasql('SELECT 1');
		assert.deepEqual(res, [{'1': 1}]);
		//    console.log(res);

		var res = alasql('SELECT avg(c) FROM t1');
		assert.deepEqual(res, [{'AVG(c)': 174.36666666666667}]);
		//    console.log(res);
		//console.log('***')
		if (false) {
			alasql.options.modifier = 'RECORDSET';
			var res = alasql('SELECT (SELECT avg(c) FROM t1)');
			//console.log('<<<')
			/// console.log(res);

			alasql.options.modifier = 'RECORDSET';
			var res = alasql('SELECT (SELECT avg(c) FROM t1)');
			/// console.log(res);
		}
		done();
	});

	if (false) {
		it('4. SELECT 1', function(done) {
			q1 = alasql.utils.flatArray(q1);
			q2 = alasql.utils.flatArray(q2);
			q1.forEach(function(q, idx) {
				console.log(q1[idx], q2[idx]);
			});
			done();
		});
	}
	if (false) {
		it('4. SELECT 2', function(done) {
			//    alasql.options.modifier = 'RECORDSET';
			var res = alasql(function() {
				/*
      SELECT a+b*2+c*3+d*4+e*5,
             (a+b+c+d+e)/5
        FROM t1
       ORDER BY 1,2
    */
			});
			assert.deepEqual(res.length, 60); // Why 60?
			var rs = res
				.map(function(d) {
					return d[Object.keys(d)[0]] + '\n';
				})
				.join('');
			rhash = md5(rs);
			assert.deepEqual(rhash, '808146289313018fce25f1a280bd8c30');
			done();
		});

		it('5. SELECT 3', function(done) {
			//    alasql.options.modifier = 'RECORDSET';
			var res = alasql(function() {
				/*
SELECT a+b*2+c*3+d*4+e*5,
       CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222
        WHEN a<b+3 THEN 333 ELSE 444 END,
       abs(b-c),
       (a+b+c+d+e)/5,
       a+b*2+c*3
  FROM t1
 WHERE (e>c OR e<d)
   AND d>e
   AND EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b)
 ORDER BY 4,2,1,3,5
    */
			});
			assert.deepEqual(res.length, 80); // Why 60?
			var rs = res
				.map(function(d) {
					return d[Object.keys(d)[0]] + '\n';
				})
				.join('');
			rhash = md5(rs);
			assert.deepEqual(rhash, 'f588aa173060543daffc54d07638516f');
			done();
		});
	}

	it('4. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test293');
		alasql.options.modifier = undefined;
		done();
	});
});
