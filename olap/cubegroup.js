// ROLLUP & CUBE FUNCTIONS


// var groupids = ['one', 'two', 'three'];
// var glen = groupids.length;

// console.log('CUBE');
// for(var g=0;g<(1<<glen);g++) {
// 	var s = '';
// 	for(var i=0;i<glen;i++) {
// 		if(g&(1<<i)) s += groupids[i]+" ";
// 	}
// 	console.log(s);
// }

// console.log('ROLLUP');
// var mask = 0;
// for(var g=0;g<glen+1;g++) {
// 	var ss = [];
// 	for(var i=0;i<glen;i++) {
// 		if(mask&(1<<i)) ss.push(groupids[i]);
// 	}
// 	console.log(ss.join(','));
// 	mask = (mask<<1)+1; 
// }

//GROUP BY CUBE(region, city), ROLLUP(year,month)

var rollup = function (a) {
	var rr = [];
	var mask = 0;
	var glen = a.length;
	for(var g=0;g<glen+1;g++) {
		var ss = [];
		for(var i=0;i<glen;i++) {
			if(mask&(1<<i)) ss.push(a[i]);
		}
		rr.push(ss);
		mask = (mask<<1)+1; 
	};
	return rr;
};

var cube = function (a) {
	var rr = [];
	var glen = a.length;
	for(var g=0;g<(1<<glen);g++) {
		var ss = [];
		for(var i=0;i<glen;i++) {
			if(g&(1<<i)) //ss.push(a[i]);
				//ss = cartes(ss,decartes(a[i]));
				ss = ss.concat(decartes(a[i]));
				//
		}
		rr.push(ss);
	}
	return rr;
}

var groupingsets = function(a) {
	return a.reduce(function(acc,d){
//		console.log(acc,d);
		acc = acc.concat(decartes(d));
		return acc;
	}, []);
}

var cartes = function(a1,a2){
	var rrr =[];
	for(var i1=0;i1<a1.length;i1++) {
		for(var i2=0;i2<a2.length;i2++) {
//			console.log(a1[i1]);
			rrr.push(a1[i1].concat(a2[i2]));
//			rrr = rrr.concat(a1[i1].concat(a2[i2]));

		}
	};
	return rrr;
}

var plain = function (a) {

};
//console.log(cartes(['one','two'],rollup([1,2]),cube([3,4])));
//console.log( cartes( cartes([['one','two']],rollup(['a','b'])), cube(['c','d']))   );

var gv = [
	{t:'plain',
		p: [
			1,2
		]
	},
	{t:'rollup',
		p: [
			3,
			4
		]
	},
	{t:'cube',
		p: [
			5,
			6
		]
	},
	{t:'groupingsets',
		p: [7,8, 9]
	},
];

var gv = [
	{t:'groupingsets',
		p: [ 0,

			{t:'rollup',
				p: [
					1,2
				]
			},
			// {t:'cube',
			// 	p: [
			// 		3,4
			// 		// {t:'cube',
			// 		// 	p: [
			// 		// 		5,
			// 		// 		6

			// 		// 	]
			// 		// }
			// 	],
			// },
			[]
		]
	},
];


//gv = [{t:rollup, p:[]}];

function decartes(gv) {
	if(gv instanceof Array) {
		var res = [[]];
		for(var t=0; t<gv.length; t++) {
			switch(gv[t].t) {
				case 'plain': 
					res = res.map(function(r){return r.concat(gv[t].p)}); 

				break; 
				case 'rollup': res = cartes(res,rollup(gv[t].p)); break; 
				case 'cube': res = cartes(res,cube(gv[t].p)); break; 
				case 'groupingsets': res = cartes(res,groupingsets(gv[t].p)); break; 
				default: res = res.concat(gv[t]);
			}
		}
		return res;
	} else {
		switch(gv.t) {
			case 'plain': return gv.p; break;
			case 'rollup': return rollup(gv.p); break; 
			case 'cube': return cube(gv.p); break; 
			case 'groupingsets':  return groupingsets(gv.p); break; 
			default: return [gv];//return decartes(gv.p);
		}
		return gv;
	}
}
console.log(decartes(gv));

// ALGORYTHM
