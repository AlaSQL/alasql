//
// Date functions
// 
// (c) 2014, Andrey Gershun
//


stdfn.NOW = function(){return d.getFullYear();};

stdfn.SECOND = function(d){
	d = new Date(d);
	return d.getSecond();
};


stdfn.MINUTE = function(d){
	d = new Date(d);
	return d.getMinute();
};

stdfn.HOUR = function(d){
	d = new Date(d);
	return d.getHour();
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