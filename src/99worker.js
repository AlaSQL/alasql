if (typeof importScripts === 'function') {
	// console.log(99);
	self.onmessage = function(event) {	
		// console.log(2);
		alasql(event.data.sql,event.data.params, function(data){
			// console.log(3);
			postMessage(data);
		}); 
	}	
} else if(typeof exports != 'object') {
	alasql.worker = function(path, paths,cb) {
		if(typeof path == "undefined" || path === true) {
			var sc = document.getElementsByTagName('script');
			for(var i=0;i<sc.length;i++) {
//				console.log(sc[i]);
				if(sc[i].src.substr(-9).toLowerCase() == 'alasql.js' 
					|| sc[i].src.substr(-13).toLowerCase() == 'alasql.min.js')
					path = sc[i].src;
			}
//			console.log(path);
			if(typeof path == "undefined") {
				throw new Error('Path to alasql.js is not specified');
			};
			alasql.webworker = new Worker(path);
		} else if(path === false) {
			delete alasql.webworker;
			return;
		} else {
			alasql.webworker = new Worker(path);
		}

		if(arguments.length > 1) {
			var sql = 'REQUIRE ' + paths.map(function(p){
				return '"'+p+'"';
			}).join(",");
			alasql(sql,[],cb);
		}
	};	
}
