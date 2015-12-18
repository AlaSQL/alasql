//formerly alasql.aggr

// Aggregator for joining strings
export function GROUP_CONCAT(v,s){
    if(typeof s == "undefined") return v; else return s+','+v;
};

// Median
export function MEDIAN(v,s,acc){
	// Init
	if(typeof acc.arr == 'undefined') {
	  acc.arr = [v];
	  return v;
	// Pass
	} else {
	  acc.arr.push(v);
	  var p = acc.arr.sort();
	  return p[(p.length/2)|0];
	};
};

// Standard deviation
export function VAR(v,s,acc){
	if(typeof acc.arr == 'undefined') {
		acc.arr = [v];
		acc.sum = v;
	} else {
		acc.arr.push(v);
		acc.sum += v;
	}
	var N = acc.arr.length;
	var avg = acc.sum / N;
	var std = 0;
	for(var i=0;i<N;i++) {
		std += (acc.arr[i]-avg)*(acc.arr[i]-avg);
	}
	std = std/(N-1);
	return std;
};

export function STDEV(v,s,acc){
	return Math.sqrt(alasql.aggr.VAR(v,s,acc));
}

// Standard deviation
export function VARP (v,s,acc){
	if(typeof acc.arr == 'undefined') {
		acc.arr = [v];
		acc.sum = v;
	} else {
		acc.arr.push(v);
		acc.sum += v;
	}
	var N = acc.arr.length;
	var avg = acc.sum / N;
	var std = 0;
	for(var i=0;i<N;i++) {
		std += (acc.arr[i]-avg)*(acc.arr[i]-avg);
	}
	std = std/N;
	return std;
};


export function STD = function(v,s,acc){
	return Math.sqrt(alasql.aggr.VARP(v,s,acc));
};
var STDEVP = STD;
export {STDEVP};
