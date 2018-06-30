/**
 * SPRINTF(format, argument_list)
 *
 * The string function like one in C/C++, PHP, Perl
 * Each conversion specification is defined as below:
 *
 * %[index][alignment][padding][width][precision]type
 *
 * index        An optional index specifier that changes the order of the
 *              arguments in the list to be displayed.
 * alignment    An optional alignment specifier that says if the result should be
 *              left-justified or right-justified. The default is
 *              right-justified; a "-" character here will make it left-justified.
 * padding      An optional padding specifier that says what character will be
 *              used for padding the results to the right string size. This may
 *              be a space character or a "0" (zero character). The default is to
 *              pad with spaces. An alternate padding character can be specified
 *              by prefixing it with a single quote ('). See the examples below.
 * width        An optional number, a width specifier that says how many
 *              characters (minimum) this conversion should result in.
 * precision    An optional precision specifier that says how many decimal digits
 *              should be displayed for floating-point numbers. This option has
 *              no effect for other types than float.
 * type         A type specifier that says what type the argument data should be
 *              treated as. Possible types:
 *
 * % - a literal percent character. No argument is required.
 * b - the argument is treated as an integer, and presented as a binary number.
 * c - the argument is treated as an integer, and presented as the character
 *      with that ASCII value.
 * d - the argument is treated as an integer, and presented as a decimal number.
 * u - the same as "d".
 * f - the argument is treated as a float, and presented as a floating-point.
 * o - the argument is treated as an integer, and presented as an octal number.
 * s - the argument is treated as and presented as a string.
 * x - the argument is treated as an integer and presented as a hexadecimal
 *       number (with lowercase letters).
 * X - the argument is treated as an integer and presented as a hexadecimal
 *       number (with uppercase letters).
 * h - the argument is treated as an integer and presented in human-readable format
 *       using powers of 1024.
 * H - the argument is treated as an integer and presented in human-readable format
 *       using powers of 1000.
 */

stdfn.SPRINTF = function() {
	var args = arguments;
	var index = 0;

	var x;
	var ins;
	var fn;

	/*
         * The callback function accepts the following properties
         *      x.index contains the substring position found at the origin string
         *      x[0] contains the found substring
         *      x[1] contains the index specifier (as \d+\$ or \d+#)
         *      x[2] contains the alignment specifier ("+" or "-" or empty)
         *      x[3] contains the padding specifier (space char, "0" or defined as '.)
         *      x[4] contains the width specifier (as \d*)
         *      x[5] contains the floating-point precision specifier (as \.\d*)
         *      x[6] contains the type specifier (as [bcdfosuxX])
         */
	return args[0].replace(stdfn.SPRINTF.re, function() {
		if (arguments[0] == '%%') {
			return '%';
		}

		x = [];
		for (var i = 0; i < arguments.length; i++) {
			x[i] = arguments[i] || '';
		}
		x[3] = x[3].slice(-1) || ' ';

		ins = args[+x[1] ? x[1] - 1 : index++];
		//              index++;

		return alasql.stdfn.SPRINTF[x[6]](ins, x);
	});
};

stdfn.SPRINTF.re = /%%|%(?:(\d+)[\$#])?([+-])?('.|0| )?(\d*)(?:\.(\d+))?([bcdfosuxXhH])/g;

stdfn.SPRINTF.b = function(ins, x) {
	return Number(ins).bin(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.c = function(ins, x) {
	return String.fromCharCode(ins).padding(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.d = stdfn.SPRINTF.u = function(ins, x) {
	return Number(ins).radix(0x0a, x[2] + x[4], x[3]);
};
stdfn.SPRINTF.f = function(ins, x) {
	var ins = Number(ins);
	//      var fn = String.prototype.padding;
	if (x[5]) {
		ins = ins.toFixed(x[5]);
	} else if (x[4]) {
		ins = ins.toExponential(x[4]);
	} else {
		ins = ins.toExponential();
	}
	// Invert sign because this is not number but string
	x[2] = x[2] == '-' ? '+' : '-';
	return ins.padding(x[2] + x[4], x[3]);
	//      return fn.call(ins, x[2] + x[4], x[3]);
};
stdfn.SPRINTF.o = function(ins, x) {
	return Number(ins).oct(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.s = function(ins, x) {
	return String(ins).padding(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.x = function(ins, x) {
	return Number(ins).hexl(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.X = function(ins, x) {
	return Number(ins).hex(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.h = function(ins, x) {
	var ins = String.prototype.replace.call(ins, /,/g, '');
	// Invert sign because this is not number but string
	x[2] = x[2] == '-' ? '+' : '-';
	return Number(ins)
		.human(x[5], true)
		.padding(x[2] + x[4], x[3]);
};
stdfn.SPRINTF.H = function(ins, x) {
	var ins = String.prototype.replace.call(ins, /,/g, '');
	// Invert sign because this is not number but string
	x[2] = x[2] == '-' ? '+' : '-';
	return Number(ins)
		.human(x[5], false)
		.padding(x[2] + x[4], x[3]);
};
