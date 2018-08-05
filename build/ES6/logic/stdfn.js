export default mem => {
    const stdfn = {};
    stdfn.CONCAT = function (...args) {
        return Array.prototype.slice.call(args).join('');
    };
    stdfn.REGEXP_LIKE = function (a, b, c) {
        //	console.log(a,b,c);
        return (a || '').search(RegExp(b, c)) > -1;
    };
    // Concatination of strings
    stdfn.CONCAT_WS = function (...args) {
        return args.slice(1, args.length).join(args[0]);
    };
    // String functions
    stdfn.REPLACE = function (target, pattern, replacement) {
        return (target || '').split(pattern).join(replacement);
    };
    stdfn.CHAR = String.fromCharCode.bind(String);
    stdfn.ASCII = function (a) {
        return a.charCodeAt(0);
    };
    // This array is required for fast GUID generation
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    stdfn.NEWID = stdfn.UUID = stdfn.GEN_RANDOM_UUID = function () {
        var d0 = (Math.random() * 0xffffffff) | 0;
        var d1 = (Math.random() * 0xffffffff) | 0;
        var d2 = (Math.random() * 0xffffffff) | 0;
        var d3 = (Math.random() * 0xffffffff) | 0;
        return (lut[d0 & 0xff] +
            lut[(d0 >> 8) & 0xff] +
            lut[(d0 >> 16) & 0xff] +
            lut[(d0 >> 24) & 0xff] +
            '-' +
            lut[d1 & 0xff] +
            lut[(d1 >> 8) & 0xff] +
            '-' +
            lut[((d1 >> 16) & 0x0f) | 0x40] +
            lut[(d1 >> 24) & 0xff] +
            '-' +
            lut[(d2 & 0x3f) | 0x80] +
            lut[(d2 >> 8) & 0xff] +
            '-' +
            lut[(d2 >> 16) & 0xff] +
            lut[(d2 >> 24) & 0xff] +
            lut[d3 & 0xff] +
            lut[(d3 >> 8) & 0xff] +
            lut[(d3 >> 16) & 0xff] +
            lut[(d3 >> 24) & 0xff]);
    };
    mem.alasql.stdfn = stdfn;
};
