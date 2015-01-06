//
// Date functions
// 
// (c) 2014, Andrey Gershun
//

/*
alasql.fn.Date = Date;
alasql.fn.Number = Number;
alasql.fn.String = String;
alasql.fn.Boolean = Boolean;
*/

stdfn.EXTEND = alasql.utils.extend;

stdfn.OBJECT_ID = function(objid){
	return !!alasql.tables[objid];
};

stdfn.DATE = function (d) {
	return new Date(d);
};

stdfn.NOW = function(){
	var d = new Date();
	var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
	s += " "+("0"+d.getHours()).substr(-2)+":"+("0"+d.getMinutes()).substr(-2)+"."+("0"+d.getSeconds()).substr(-2);
	return s;
};

stdfn.GETDATE = function(){
	var d = new Date();
	var s = d.getFullYear()+"."+("0"+(d.getMonth()+1)).substr(-2)+"."+("0"+d.getDate()).substr(-2);
	return s;	
}


stdfn.SECOND = function(d){
	d = new Date(d);
	return d.getSeconds();
};


stdfn.MINUTE = function(d){
	d = new Date(d);
	return d.getMinutes();
};

stdfn.HOUR = function(d){
	d = new Date(d);
	return d.getHours();
};

stdfn.DAYOFWEEK = stdfn.WEEKDAY = function(d){
	d = new Date(d);
	return d.getDay();
};

stdfn.DAY = stdfn.DAYOFMONTH = function(d){
	d = new Date(d);
	return d.getDate();
};

stdfn.MONTH = function(d){
	d = new Date(d);
	return d.getMonth()+1;
};

stdfn.YEAR = function(d){
	d = new Date(d);
	return d.getFullYear();
};