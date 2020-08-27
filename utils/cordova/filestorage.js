var gv = undefined;

function loadFile(path, asy, success, error) {
	return gv;
}

function saveFile(path, data, callback) {
	gv = data;
	console.log(gv);
	callback();
}

function FileStorage(path, opts) {
	var self = this;
	opts = opts || {};
	var db;

	Object.defineProperty(this, '___priv_bk___', {
		value: {
			path: path,
		},
		writable: false,
		enumerable: false,
	});

	Object.defineProperty(this, '___priv_strict___', {
		value: !!opts.strict,
		writable: false,
		enumerable: false,
	});

	Object.defineProperty(this, '___priv_ws___', {
		value: opts.ws || '  ',
		writable: false,
		enumerable: false,
	});

	loadFile(path, true, function (data) {
		try {
			db = JSON.parse(data);
		} catch (e) {
			db = {};
		}

		Object.keys(db).forEach(function (key) {
			self[key] = db[key];
		}, self);
	});
}

FileStorage.prototype.getItem = function (key) {
	if (this.hasOwnProperty(key)) {
		if (this.___priv_strict___) {
			return String(this[key]);
		} else {
			return this[key];
		}
	}
	return null;
};

FileStorage.prototype.setItem = function (key, val) {
	if (val === undefined) {
		this[key] = null;
	} else if (this.___priv_strict___) {
		this[key] = String(val);
	} else {
		this[key] = val;
	}
	this.___save___();
};

FileStorage.prototype.removeItem = function (key) {
	delete this[key];
	this.___save___();
};

FileStorage.prototype.clear = function () {
	var self = this;
	// filters out prototype keys
	Object.keys(self).forEach(function (key) {
		self[key] = undefined;
		delete self[key];
	});
};

FileStorage.prototype.key = function (i) {
	i = i || 0;
	return Object.keys(this)[i];
};

FileStorage.prototype.__defineGetter__('length', function () {
	return Object.keys(this).length;
});

FileStorage.prototype.___save___ = function () {
	var self = this;
	if (!this.___priv_bk___.path) {
		return;
	}

	if (this.___priv_bk___.lock) {
		this.___priv_bk___.wait = true;
		return;
	}

	this.___priv_bk___.lock = true;
	saveFile(this.___priv_bk___.path, JSON.stringify(this, null, this.___priv_ws___), function (e) {
		self.___priv_bk___.lock = false;
		if (e) {
			return;
		}
		if (self.___priv_bk___.wait) {
			self.___priv_bk___.wait = false;
			self.___save___();
		}
	});
};

Object.defineProperty(FileStorage, 'create', {
	value: function (path, opts) {
		return new FileStorage(path, opts);
	},
	writable: false,
	enumerable: false,
});

exports.FileStorage = FileStorage;
// Start to use

//  fileStorage = new FileStorage("./fstest.json", { strict: false, ws: '' });
