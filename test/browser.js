if (typeof exports !== 'object') {
	// Crappy js from http://www.javascripter.net/faq/browsern.htm
	// please replace with a better version if you find it.

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;

	// In Opera 15+, the true version is after "OPR/"
	if ((verOffset = nAgt.indexOf('OPR/')) != -1) {
		browserName = 'Opera';
		fullVersion = nAgt.substring(verOffset + 4);
	} else if ((verOffset = nAgt.indexOf('Opera')) != -1) {
		// In older Opera, the true version is after "Opera" or after "Version"
		browserName = 'Opera';
		fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
	} else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
		// In MSIE, the true version is after "MSIE" in userAgent
		browserName = 'Microsoft Internet Explorer';
		fullVersion = nAgt.substring(verOffset + 5);
	} else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
		// In Chrome, the true version is after "Chrome"
		browserName = 'Chrome';
		fullVersion = nAgt.substring(verOffset + 7);
	} else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
		// In Safari, the true version is after "Safari" or after "Version"
		browserName = 'Safari';
		fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
	} else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
		// In Firefox, the true version is after "Firefox"
		browserName = 'Firefox';
		fullVersion = nAgt.substring(verOffset + 8);
	} else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		// In most other browsers, "name/version" is at the end of userAgent
		browserName = nAgt.substring(nameOffset, verOffset);
		fullVersion = nAgt.substring(verOffset + 1);
		if (browserName.toLowerCase() == browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = fullVersion.indexOf(';')) != -1) fullVersion = fullVersion.substring(0, ix);
	if ((ix = fullVersion.indexOf(' ')) != -1) fullVersion = fullVersion.substring(0, ix);

	majorVersion = parseInt('' + fullVersion, 10);
	if (isNaN(majorVersion)) {
		fullVersion = '' + parseFloat(navigator.appVersion);
		majorVersion = parseInt(navigator.appVersion, 10);
	}

	/*


document.write(''
 +'Browser name  = '+browserName+'<br>'
 +'Full version  = '+fullVersion+'<br>'
 +'Major version = '+majorVersion+'<br>'
 +'navigator.appName = '+navigator.appName+'<br>'
 +'navigator.userAgent = '+navigator.userAgent+'<br>'
)

*/
}
