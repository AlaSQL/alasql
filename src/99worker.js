if (typeof importScripts === 'function') {
	// console.log(99);
	self.onmessage = function(event) {	
		// console.log(2);
		alasql(event.data.sql,event.data.params, function(data){
			// console.log(3);
			postMessage(data);
		}); 
	}	
}
