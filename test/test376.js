if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var argv = require('yargs').argv || {};
}

describe('376. ASCII tests:', function() {
	if (typeof exports === 'object') {
		// to output all including skipped tests please run: mocha ./test/test376.js --forceall

		var runAll;
		if (argv.forceall) {
			runAll = it;
		}

		var tests = (function() {
			/*
SELECT ASCII(' '); -- 32 - Space
SELECT ASCII('!'); -- 33 - Exclamation mark
SELECT ASCII('"'); -- 34 - Double quotes (or speech marks)
SELECT ASCII('#'); -- 35 - Number
SELECT ASCII('$'); -- 36 - Dollar
SELECT ASCII('%'); -- 37 - Procenttecken
SELECT ASCII('&'); -- 38 - Ampersand
SELECT ASCII("'"); -- 39 - Single quote
SELECT ASCII('('); -- 40 - Open parenthesis (or open bracket)
SELECT ASCII(')'); -- 41 - Close parenthesis (or close bracket)
SELECT ASCII('*'); -- 42 - Asterisk
SELECT ASCII('+'); -- 43 - Plus
SELECT ASCII(','); -- 44 - Comma
SELECT ASCII('-'); -- 45 - Hyphen
SELECT ASCII('.'); -- 46 - Period, dot or full stop
SELECT ASCII('/'); -- 47 - Slash or divide
SELECT ASCII('0'); -- 48 - Zero
SELECT ASCII('01'); -- 48 - Zero


SELECT ASCII('1'); -- 49 - One
SELECT ASCII('10'); -- 49 - One
SELECT ASCII('2'); -- 50 - Two
SELECT ASCII('3'); -- 51 - Three
SELECT ASCII('4'); -- 52 - Four
SELECT ASCII('5'); -- 53 - Five
SELECT ASCII('6'); -- 54 - Six
SELECT ASCII('7'); -- 55 - Seven
SELECT ASCII('8'); -- 56 - Eight
SELECT ASCII('9'); -- 57 - Nine
SELECT ASCII(':'); -- 58 - Colon
SELECT ASCII(';'); -- 59 - Semicolon
SELECT ASCII('<'); -- 60 - Less than (or open angled bracket)
SELECT ASCII('='); -- 61 - Equals
SELECT ASCII('>'); -- 62 - Greater than (or close angled bracket)
SELECT ASCII('?'); -- 63 - Question mark
SELECT ASCII('@'); -- 64 - At symbol
SELECT ASCII('A'); -- 65 - Uppercase A
SELECT ASCII('B'); -- 66 - Uppercase B
SELECT ASCII('C'); -- 67 - Uppercase C
SELECT ASCII('D'); -- 68 - Uppercase D
SELECT ASCII('E'); -- 69 - Uppercase E
SELECT ASCII('F'); -- 70 - Uppercase F
SELECT ASCII('G'); -- 71 - Uppercase G
SELECT ASCII('H'); -- 72 - Uppercase H
SELECT ASCII('I'); -- 73 - Uppercase I
SELECT ASCII('J'); -- 74 - Uppercase J
SELECT ASCII('K'); -- 75 - Uppercase K
SELECT ASCII('L'); -- 76 - Uppercase L
SELECT ASCII('M'); -- 77 - Uppercase M
SELECT ASCII('N'); -- 78 - Uppercase N
SELECT ASCII('O'); -- 79 - Uppercase O
SELECT ASCII('P'); -- 80 - Uppercase P
SELECT ASCII('Q'); -- 81 - Uppercase Q
SELECT ASCII('R'); -- 82 - Uppercase R
SELECT ASCII('S'); -- 83 - Uppercase S
SELECT ASCII('T'); -- 84 - Uppercase T
SELECT ASCII('U'); -- 85 - Uppercase U
SELECT ASCII('V'); -- 86 - Uppercase V
SELECT ASCII('W'); -- 87 - Uppercase W
SELECT ASCII('X'); -- 88 - Uppercase X
SELECT ASCII('Y'); -- 89 - Uppercase Y
SELECT ASCII('Z'); -- 90 - Uppercase Z
SELECT ASCII('['); -- 91 - Opening bracket
-- SELECT ASCII('\\'); -- 92 - Backslash
SELECT ASCII(']'); -- 93 - Closing bracket
SELECT ASCII('^'); -- 94 - Caret - circumflex
SELECT ASCII('_'); -- 95 - Underscore
SELECT ASCII('a'); -- 97 - Lowercase a
SELECT ASCII('b'); -- 98 - Lowercase b
SELECT ASCII('c'); -- 99 - Lowercase c
SELECT ASCII('d'); -- 100 - Lowercase d
SELECT ASCII('e'); -- 101 - Lowercase e
SELECT ASCII('f'); -- 102 - Lowercase f
SELECT ASCII('g'); -- 103 - Lowercase g
SELECT ASCII('h'); -- 104 - Lowercase h
SELECT ASCII('i'); -- 105 - Lowercase i
SELECT ASCII('j'); -- 106 - Lowercase j
SELECT ASCII('k'); -- 107 - Lowercase k
SELECT ASCII('l'); -- 108 - Lowercase l
SELECT ASCII('m'); -- 109 - Lowercase m
SELECT ASCII('n'); -- 110 - Lowercase n
SELECT ASCII('o'); -- 111 - Lowercase o
SELECT ASCII('p'); -- 112 - Lowercase p
SELECT ASCII('q'); -- 113 - Lowercase q
SELECT ASCII('r'); -- 114 - Lowercase r
SELECT ASCII('s'); -- 115 - Lowercase s
SELECT ASCII('t'); -- 116 - Lowercase t
SELECT ASCII('u'); -- 117 - Lowercase u
SELECT ASCII('v'); -- 118 - Lowercase v
SELECT ASCII('w'); -- 119 - Lowercase w
SELECT ASCII('x'); -- 120 - Lowercase x
SELECT ASCII('y'); -- 121 - Lowercase y
SELECT ASCII('z'); -- 122 - Lowercase z
SELECT ASCII('{'); -- 123 - Opening brace
SELECT ASCII('|'); -- 124 - Vertical bar
SELECT ASCII('}'); -- 125 - Closing brace
SELECT ASCII('~'); -- 126 - Equivalency sign - tilde
-- SELECT ASCII('€'); -- 128 - Euro sign
-- SELECT ASCII('‚'); -- 130 - Single low-9 quotation mark
-- SELECT ASCII('ƒ'); -- 131 - Latin small letter f with hook
-- SELECT ASCII('„'); -- 132 - Double low-9 quotation mark
-- SELECT ASCII('…'); -- 133 - Horizontal ellipsis
-- SELECT ASCII('†'); -- 134 - Dagger
-- SELECT ASCII('‡'); -- 135 - Double dagger
-- SELECT ASCII('ˆ'); -- 136 - Modifier letter circumflex accent
-- SELECT ASCII('‰'); -- 137 - Per mille sign
-- SELECT ASCII('Š'); -- 138 - Latin capital letter S with caron
-- SELECT ASCII('‹'); -- 139 - Single left-pointing angle quotation
-- SELECT ASCII('Œ'); -- 140 - Latin capital ligature OE
-- SELECT ASCII('Ž'); -- 142 - Latin captial letter Z with caron
-- SELECT ASCII('“'); -- 147 - Left double quotation mark
-- SELECT ASCII('”'); -- 148 - Right double quotation mark
-- SELECT ASCII('•'); -- 149 - Bullet
-- SELECT ASCII('–'); -- 150 - En dash
-- SELECT ASCII('—'); -- 151 - Em dash
-- SELECT ASCII('˜'); -- 152 - Small tilde
-- SELECT ASCII('™'); -- 153 - Trade mark sign
-- SELECT ASCII('š'); -- 154 - Latin small letter S with caron
-- SELECT ASCII('›'); -- 155 - Single right-pointing angle quotation mark
-- SELECT ASCII('œ'); -- 156 - Latin small ligature oe
-- SELECT ASCII('ž'); -- 158 - Latin small letter z with caron
-- SELECT ASCII('Ÿ'); -- 159 - Latin capital letter Y with diaeresis
SELECT ASCII('¡'); -- 161 - Inverted exclamation mark
SELECT ASCII('¢'); -- 162 - Cent sign
SELECT ASCII('£'); -- 163 - Pound sign
SELECT ASCII('¤'); -- 164 - Currency sign
SELECT ASCII('¥'); -- 165 - Yen sign
SELECT ASCII('¦'); -- 166 - Pipe, Broken vertical bar
SELECT ASCII('§'); -- 167 - Section sign
SELECT ASCII('¨'); -- 168 - Spacing diaeresis - umlaut
SELECT ASCII('©'); -- 169 - Copyright sign
SELECT ASCII('ª'); -- 170 - Feminine ordinal indicator
SELECT ASCII('«'); -- 171 - Left double angle quotes
SELECT ASCII('¬'); -- 172 - Not sign
SELECT ASCII('®'); -- 174 - Registered trade mark sign
SELECT ASCII('¯'); -- 175 - Spacing macron - overline
SELECT ASCII('°'); -- 176 - Degree sign
SELECT ASCII('±'); -- 177 - Plus-or-minus sign
SELECT ASCII('²'); -- 178 - Superscript two - squared
SELECT ASCII('³'); -- 179 - Superscript three - cubed
SELECT ASCII('´'); -- 180 - Acute accent - spacing acute
SELECT ASCII('µ'); -- 181 - Micro sign
SELECT ASCII('¶'); -- 182 - Pilcrow sign - paragraph sign
SELECT ASCII('·'); -- 183 - Middle dot - Georgian comma
SELECT ASCII('¸'); -- 184 - Spacing cedilla
SELECT ASCII('¹'); -- 185 - Superscript one
SELECT ASCII('º'); -- 186 - Masculine ordinal indicator
SELECT ASCII('»'); -- 187 - Right double angle quotes
SELECT ASCII('¼'); -- 188 - Fraction one quarter
SELECT ASCII('½'); -- 189 - Fraction one half
SELECT ASCII('¾'); -- 190 - Fraction three quarters
SELECT ASCII('¿'); -- 191 - Inverted question mark
SELECT ASCII('À'); -- 192 - Latin capital letter A with grave
SELECT ASCII('Á'); -- 193 - Latin capital letter A with acute
SELECT ASCII('Â'); -- 194 - Latin capital letter A with circumflex
SELECT ASCII('Ã'); -- 195 - Latin capital letter A with tilde
SELECT ASCII('Ä'); -- 196 - Latin capital letter A with diaeresis
SELECT ASCII('Å'); -- 197 - Latin capital letter A with ring above
SELECT ASCII('Æ'); -- 198 - Latin capital letter AE
SELECT ASCII('Ç'); -- 199 - Latin capital letter C with cedilla
SELECT ASCII('È'); -- 200 - Latin capital letter E with grave
SELECT ASCII('É'); -- 201 - Latin capital letter E with acute
SELECT ASCII('Ë'); -- 203 - Latin capital letter E with diaeresis
SELECT ASCII('Ì'); -- 204 - Latin capital letter I with grave
SELECT ASCII('Í'); -- 205 - Latin capital letter I with acute
SELECT ASCII('Î'); -- 206 - Latin capital letter I with circumflex
SELECT ASCII('Ï'); -- 207 - Latin capital letter I with diaeresis
SELECT ASCII('Ð'); -- 208 - Latin capital letter ETH
SELECT ASCII('Ñ'); -- 209 - Latin capital letter N with tilde
SELECT ASCII('Ò'); -- 210 - Latin capital letter O with grave
SELECT ASCII('Ó'); -- 211 - Latin capital letter O with acute
SELECT ASCII('Ô'); -- 212 - Latin capital letter O with circumflex
SELECT ASCII('Õ'); -- 213 - Latin capital letter O with tilde
SELECT ASCII('Ö'); -- 214 - Latin capital letter O with diaeresis
SELECT ASCII('×'); -- 215 - Multiplication sign
SELECT ASCII('Ø'); -- 216 - Latin capital letter O with slash
SELECT ASCII('Ù'); -- 217 - Latin capital letter U with grave
SELECT ASCII('Ú'); -- 218 - Latin capital letter U with acute
SELECT ASCII('Û'); -- 219 - Latin capital letter U with circumflex
SELECT ASCII('Ü'); -- 220 - Latin capital letter U with diaeresis
SELECT ASCII('Ý'); -- 221 - Latin capital letter Y with acute
SELECT ASCII('Þ'); -- 222 - Latin capital letter THORN
SELECT ASCII('ß'); -- 223 - Latin small letter sharp s - ess-zed
SELECT ASCII('à'); -- 224 - Latin small letter a with grave
SELECT ASCII('á'); -- 225 - Latin small letter a with acute
SELECT ASCII('â'); -- 226 - Latin small letter a with circumflex
SELECT ASCII('ã'); -- 227 - Latin small letter a with tilde
SELECT ASCII('ä'); -- 228 - Latin small letter a with diaeresis
SELECT ASCII('å'); -- 229 - Latin small letter a with ring above
SELECT ASCII('æ'); -- 230 - Latin small letter ae
SELECT ASCII('ç'); -- 231 - Latin small letter c with cedilla
SELECT ASCII('è'); -- 232 - Latin small letter e with grave
SELECT ASCII('é'); -- 233 - Latin small letter e with acute
SELECT ASCII('ê'); -- 234 - Latin small letter e with circumflex
SELECT ASCII('ë'); -- 235 - Latin small letter e with diaeresis
SELECT ASCII('ì'); -- 236 - Latin small letter i with grave
SELECT ASCII('í'); -- 237 - Latin small letter i with acute
SELECT ASCII('î'); -- 238 - Latin small letter i with circumflex
SELECT ASCII('ï'); -- 239 - Latin small letter i with diaeresis
SELECT ASCII('ð'); -- 240 - Latin small letter eth
SELECT ASCII('ñ'); -- 241 - Latin small letter n with tilde
SELECT ASCII('ò'); -- 242 - Latin small letter o with grave
SELECT ASCII('ó'); -- 243 - Latin small letter o with acute
SELECT ASCII('ô'); -- 244 - Latin small letter o with circumflex
SELECT ASCII('õ'); -- 245 - Latin small letter o with tilde
SELECT ASCII('ö'); -- 246 - Latin small letter o with diaeresis
SELECT ASCII('÷'); -- 247 - Division sign
SELECT ASCII('ø'); -- 248 - Latin small letter o with slash
SELECT ASCII('ù'); -- 249 - Latin small letter u with grave
SELECT ASCII('ú'); -- 250 - Latin small letter u with acute
SELECT ASCII('û'); -- 251 - Latin small letter u with circumflex
SELECT ASCII('ü'); -- 252 - Latin small letter u with diaeresis
SELECT ASCII('ý'); -- 253 - Latin small letter y with acute
SELECT ASCII('þ'); -- 254 - Latin small letter thorn
SELECT ASCII('ÿ'); -- 255 - Latin small letter y with diaeresis


*/
		})
			.toString()
			
		tests = (/\/\*([\S\s]+)\*\//m.exec(tests) || ['', ''])[1];


		tests
			.replace('\r', '')
			.trim()
			.split('\n')
			.forEach(function(test) {
				test = test.trim();
				if (test.indexOf('--') > -1) {
					var runFn = it;

					if (test.indexOf('--') === 0) {
						// skip test starting line with '--'
						test = test.substr(2).trim();
						runFn = runAll || it.skip;
					}

					var tt = test.split('--');
					var sql = tt[0].trim();
					var etalon = '' + tt[1].split(' - ')[0].trim();
					var res = '' + alasql('VALUE OF ' + sql);
					//console.log(tt,sql,etalon);

					runFn(test, function(done) {
						assert.equal(etalon, res);
						done();
					});
				} else {
					if (test.trim().length > 0) {
						alasql(test);
					}
				}
			});
	}
});
