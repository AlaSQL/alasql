export default mem => {
    const alasql = mem.alasql;
    //stdlib.UCASE = function(s) {return '('+s+').toUpperCase()';}
    //REPLACE
    // RTRIM
    // SUBSTR
    // TRIM
    //REPLACE
    // RTRIM
    // SUBSTR
    // TRIM
    // Aggregator for joining strings
    alasql.aggr.GROUP_CONCAT = function (v, s, stage) {
        if (stage === 1) {
            return '' + v;
        }
        else if (stage === 2) {
            s += ',' + v;
            return s;
        }
        return s;
    };
    alasql.aggr.MEDIAN = function (v, s, stage) {
        if (stage === 2) {
            if (v !== null) {
                s.push(v);
            }
            return s;
        }
        else if (stage === 1) {
            if (v === null) {
                return [];
            }
            return [v];
        }
        else {
            if (!s.length) {
                return s;
            }
            var r = s.sort();
            var p = (r.length + 1) / 2;
            if (Number.isInteger(p)) {
                return r[p - 1];
            }
            return (r[Math.floor(p - 1)] + r[Math.ceil(p - 1)]) / 2;
        }
    };
    alasql.aggr.QUART = function (v, s, stage, nth) {
        //Quartile (first quartile per default or input param)
        if (stage === 2) {
            if (v !== null) {
                s.push(v);
            }
            return s;
        }
        else if (stage === 1) {
            if (v === null) {
                return [];
            }
            return [v];
        }
        else {
            if (!s.length) {
                return s;
            }
            nth = !nth ? 1 : nth;
            var r = s.sort();
            var p = (nth * (r.length + 1)) / 4;
            if (Number.isInteger(p)) {
                return r[p - 1]; //Integer value
            }
            return r[Math.floor(p)]; //Math.ceil -1 or Math.floor
        }
    };
    alasql.aggr.QUART2 = function (v, s, stage) {
        //Second Quartile
        return alasql.aggr.QUART(v, s, stage, 2);
    };
    alasql.aggr.QUART3 = function (v, s, stage) {
        //Third Quartile
        return alasql.aggr.QUART(v, s, stage, 3);
    };
    // Standard deviation
    alasql.aggr.VAR = function (v, s, stage) {
        if (stage === 1) {
            if (v === null) {
                return { arr: [], sum: 0 };
            }
            return { arr: [v], sum: v };
        }
        else if (stage === 2) {
            if (v === null) {
                return s;
            }
            s.arr.push(v);
            s.sum += v;
            return s;
        }
        else {
            var N = s.arr.length;
            var avg = s.sum / N;
            var std = 0;
            for (var i = 0; i < N; i++) {
                std += (s.arr[i] - avg) * (s.arr[i] - avg);
            }
            std = std / (N - 1);
            return std;
        }
    };
    alasql.aggr.STDEV = function (v, s, stage) {
        if (stage === 1 || stage === 2) {
            return alasql.aggr.VAR(v, s, stage);
        }
        else {
            return Math.sqrt(alasql.aggr.VAR(v, s, stage));
        }
    };
    // Standard deviation
    // alasql.aggr.VARP = function(v,s,acc){
    // 	if(typeof acc.arr == 'undefined') {
    // 		acc.arr = [v];
    // 		acc.sum = v;
    // 	} else {
    // 		acc.arr.push(v);
    // 		acc.sum += v;
    // 	}
    // 	var N = acc.arr.length;
    // 	var avg = acc.sum / N;
    // 	var std = 0;
    // 	for(var i=0;i<N;i++) {
    // 		std += (acc.arr[i]-avg)*(acc.arr[i]-avg);
    // 	}
    // 	std = std/N;
    // 	return std;
    // };
    alasql.aggr.VARP = function (v, s, stage) {
        if (stage === 1) {
            return { arr: [v], sum: v };
        }
        else if (stage === 2) {
            s.arr.push(v);
            s.sum += v;
            return s;
        }
        else {
            var N = s.arr.length;
            var avg = s.sum / N;
            var std = 0;
            for (var i = 0; i < N; i++) {
                std += (s.arr[i] - avg) * (s.arr[i] - avg);
            }
            return std / N;
        }
    };
    alasql.aggr.STD = alasql.aggr.STDDEV = alasql.aggr.STDEVP = function (v, s, stage) {
        if (stage == 1 || stage == 2) {
            return alasql.aggr.VARP(v, s, stage);
        }
        else {
            return Math.sqrt(alasql.aggr.VARP(v, s, stage));
        }
    };
    alasql._aggrOriginal = alasql.aggr;
    alasql.aggr = {};
    Object.keys(alasql._aggrOriginal).forEach(function (k) {
        alasql.aggr[k] = function (v, s, stage) {
            if (stage === 3 && typeof s === 'undefined')
                return undefined;
            return alasql._aggrOriginal[k].apply(null, arguments);
        };
    });
    mem.alasql = alasql;
};
