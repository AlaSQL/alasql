/**
   12prettyflag.js - prettify
   @todo move this functionality to plugin
*/

/**
 	Pretty flag - nice HTML output or standard text without any tags
	@type {boolean}
*/

alasql.prettyflag = false;

/**
	Pretty output of SQL functions
	@function
	@param {string} sql SQL statement
	@param {boolean} flag value
	@return {string} HTML or text string with pretty output 
*/

alasql.pretty = function (sql, flag) {
	var pf = alasql.prettyflag;
	alasql.prettyflag = !flag;
	var s = alasql.parse(sql).toString();
	alasql.prettyflag = pf;
	return s;
};

/*/*
 Pretty keyword
 @param {string} s Keyword
 @return {string} pretty keyword
* /
function K(s){
	console.log('K')
	if(alasql.prettyflag) {
		return '<b style="color:blue">'+s.toUpperCase()+'</b>'; 
	} else {
		return s;
	}
}

/**
 Pretty 
 @param {string} 
 @return {string} pretty keyword
 * /
function P(s){
		console.log('P')
	if(alasql.prettyflag) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
}

/**
 Pretty 
 @param {string} 
 @return {string} pretty keyword
 * /
function L(s){
		console.log('L')
	if(alasql.prettyflag) {
		return '<span style="color:red">'+s+'</span>'; 
	} else {
		return s;
	}
}

/**
 Pretty number
 @param {string | number} s number 
 @return {string} pretty number
 * /
function N(s){
	console.log('N')
	if(alasql.prettyflag) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
}

/**
 Pretty string
 @param {string} s string 
 @return {string} pretty string
 * /
function S(s){
		console.log('S')
	if(alasql.prettyflag) {
		return '<span style="color:green">'+s+'</span>'; 
	} else {
		return s;
	}
}


/**
 Pretty new line
 @return {string} HTML new line character
 * /
function NL(){
		console.log('NL')
	if(alasql.prettyflag) {
		return '<br/>'; 
	} else {
		return ' '; // '\n'
	}	
}

/**
 Pretty ident
 @return {string} HTML ident
 * /
function ID(){
		console.log('ID')
	if(alasql.prettyflag) {
		return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; 
	} else {
		return ''; //'    ';
	}	
}

*/
