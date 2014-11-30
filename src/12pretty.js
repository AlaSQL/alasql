//
// 12pretty.js - prettify
//

alasql.pretty = false;

function K(s){
	if(alasql.pretty) {
		return '<b style="color:blue">'+s.toUpperCase()+'</b>'; 
	} else {
		return s;
	}
};

function P(s){
	if(alasql.pretty) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
};

function L(s){
	if(alasql.pretty) {
		return '<span style="color:red">'+s+'</span>'; 
	} else {
		return s;
	}
};

function N(s){
	if(alasql.pretty) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
};

function S(s){
	if(alasql.pretty) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
};

function NL(){
	if(alasql.pretty) {
		return '<br/>'; 
	} else {
		return ' ';
	}	
};

function ID(){
	if(alasql.pretty) {
		return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; 
	} else {
		return '';
	}	
};

