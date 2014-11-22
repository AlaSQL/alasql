// Console functions
/*
alasql.con = {
	results:{}
};

alasql.con.open = function(el) {
	// For browser only
	if (typeof exports === 'object') return;

	// Find parent element
	el = el || document.getElementById('alasql-con') || document.getElementsByTagName('body');
	if(!el) {throw new Error('Cannot fid element for console.')}

	var conel = document.createElement('div');
	conel.style.width = "1000px";
	conel.style.height = "320px";

	alasql.con.conel = conel;

	var lenta = document.createElement('div');
	lenta.style.width = "1000px";
	lenta.style.height = "200px";
	lenta.style.overflow = "scroll";
	alasql.con.lenta = lenta;

	var inpel = document.createElement('div');
	inpel.style.width = "1000px";
	inpel.style.height = "100px";
	inpel.style.contentEditable = true;
	inpel.innerHTML = 'command ';
	alasql.con.inpel = inpel;

	conel.appendChild(lenta);
	conel.appendChild(inpel);
	el.appendChild(conel);
};

alasql.con.clear = function() {
	// For browser only
	if (typeof exports === 'object') return;

	alasql.con.conel.innerHTML = '';
};

alasql.con.close = function() {
	// For browser only
	if (typeof exports === 'object') return;

	alasql.con.conel.removeChild(alasql.con.lenta);
	alasql.con.conel.removeChild(alasql.con.inel);
	alasql.con.conel.parentElement.removeChild(conel);
};

alasql.con.log = function() {
		// For browser only
	if (typeof exports === 'object') {
		console.log.bind(console).apply(this, arguments);
	} else {
		var s = '<div>';
		s += Array.prototype.slice.call(arguments, 0).map(function(arg){
			return arg.toString();
		}).join(' ');
		s += '</div>';
		alasql.con.conel.innerHTML += s;
	};

};
*/
alasql.test = function(name, times, fn) {
	if(arguments.length == 0) {
		alasql.log(alasql.con.results);
		return;
	} else if(arguments.length == 1) {
		var tm = Date.now();
		fn();
		alasql.con.log(Date.now()-tm);
		return;
	} 

	if(arguments.length == 2) {
		fn = times;
		times = 1;
	}

	var tm = Date.now();
	for(var i=0;i<times;i++) fn();
	alasql.con.results[name] = Date.now()-tm;
};

// Console
alasql.log = function(sql, params) {
	var res;
	if(typeof sql == "string") {
		res = alasql(sql, params);
	} else {
		res = sql;
	};
	if(res instanceof Array) {
		if(console.table) {
			console.table(res);		
		} else {
			console.log(res);
		}
	} else {
		console.log(res);				
	}
};

// Console
alasql.write = function(sql, params) {
	// For node other
	if(typeof exports == 'object') {
		return alasql.log(sql,params);
	}

	var res;
	if(typeof sql == "string") {
		res = alasql(sql, params);
	} else {
		res = sql;
	};
	// if(res instanceof Array) {
	// } else {
	// }
	if(document && document.getElementsByTagName('output')) {
		var s = '';
//		if(typeof sql == 'string') s += '<p>&gt;&nbsp;'+sql+'</p>';
		if(res instanceof Array) {
			s += '<table border="1">';
			var cols = [];			
			for(colid in res[0]) {
				cols.push(colid);
			}
			s += '<tr>';
			cols.forEach(function(colid){
				s += '<th>'+colid;
			});
			for(var i=0,ilen=res.length;i<ilen;i++) {
				s += '<tr>';
				cols.forEach(function(colid){
					s += '<td> '+res[i][colid];
				});
			}

			s += '</table>';
		} else {
			//s += JSON.stringify(res);
			if(typeof res != undefined) {
				s += '<p>'+res.toString()+'</p>';
			}
		}
		document.write(s);
	} else {
		console.log(sql);
		alasql.log(res);
	}

};

alasql.writep = function (sql) {
	if(typeof exports == 'object') {	
		console.log(alasql.useid+'>',sql);
	} else {
		document.write("<p>"+alasql.useid+"&gt;&nbsp;<b>"+sql+"</b></p>");
	}
}




