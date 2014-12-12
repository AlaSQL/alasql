/* adler32.js (C) 2014 SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
var ADLER32 = {};
(function(ADLER32) {
ADLER32.version = '0.2.0';
/* consult README.md for the magic number */
/* charCodeAt is the best approach for binary strings */
var use_buffer = typeof Buffer !== 'undefined';
function adler32_bstr(bstr) {
	if(bstr.length > 32768) if(use_buffer) return adler32_buf(Buffer(bstr));
	var a = 1, b = 0, L = bstr.length, M;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 3850)+i;
		for(;i<M;i++) {
			a += bstr.charCodeAt(i);
			b += a;
		}
		a = (15*(a>>>16)+(a&65535))
		b = (15*(b>>>16)+(b&65535))
	}
	return ((b%65521) << 16) | (a%65521);
}

function adler32_buf(buf) {
	var a = 1, b = 0, L = buf.length, M;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 3850)+i;
		for(;i<M;i++) {
			a += buf[i];
			b += a;
		}
		a = (15*(a>>>16)+(a&65535))
		b = (15*(b>>>16)+(b&65535))
	}
	return ((b%65521) << 16) | (a%65521);
}

/* much much faster to intertwine utf8 and adler */
function adler32_str(str) {
	var a = 1, b = 0, L = str.length, M, c, d;
	for(var i = 0; i < L;) {
		M = Math.min(L-i, 3850);
		while(M>0) {
			c = str.charCodeAt(i++);
			if(c < 0x80) { a += c; b += a; --M; }
			else if(c < 0x800) {
				a += 192|((c>>6)&31);        b += a; --M;
				a += 128|(c&63);             b += a; --M;
			} else if(c >= 0xD800 && c < 0xE000) {
				c = (c&1023)+64; d = str.charCodeAt(i++) & 1023;
				a += 240|((c>>8)&7);         b += a; --M;
				a += 128|((c>>2)&63);        b += a; --M;
				a += 128|((d>>6)&15)|(c&3);  b += a; --M;
				a += 128|(d&63);             b += a; --M;
			} else {
				a += 224|((c>>12)&15);       b += a; --M;
				a += 128|((c>>6)&63);        b += a; --M;
				a += 128|(c&63);             b += a; --M;
			}
		}
		a %= 65521;
		b %= 65521;
	}
	return (b << 16) | a;
}
ADLER32.bstr = adler32_bstr;
ADLER32.buf = adler32_buf;
ADLER32.str = adler32_str;
})(typeof exports !== "undefined" && typeof DO_NOT_EXPORT_ADLER === 'undefined' ? exports : ADLER32);
