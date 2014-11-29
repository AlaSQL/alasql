//
// 12pretty.js - prettify
//

alasql.pretty = false;

function K(s){
	if(alasql.pretty) {
		return '<b style="color:blue">'+s.toUpperCase()+'<b>'; 
	} else {
		return s;
	}
};

function L(s){
	if(alasql.pretty) {
		return '<span style="color:red">'+s+'<span>'; 
	} else {
		return s;
	}
};
