var gv = undefined;

function cordovaReadFile(path) {
  return gv;
}

cordovaWriteFile(
      path
    , value
    , utf8
    , callback) {
      gv = value;
      callback();
}
  function CordovaStorage(path, opts) {
    opts = opts || {};
    var db
      ;

    Object.defineProperty(this, '___priv_bk___', {
      value: {
        path: path
      }
    , writable: false
    , enumerable: false
    });

    Object.defineProperty(this, '___priv_strict___', {
      value: !!opts.strict
    , writable: false
    , enumerable: false
    });

    Object.defineProperty(this, '___priv_ws___', {
      value: opts.ws || '  '
    , writable: false
    , enumerable: false
    });

    try {
      db = JSON.parse(cordovaReadFile(path));
    } catch(e) {
      db = {};
    }

    Object.keys(db).forEach(function (key) {
      this[key] = db[key];
    }, this);
  }

  CordovaStorage.prototype.getItem = function (key) {
    if (this.hasOwnProperty(key)) {
      if (this.___priv_strict___) {
        return String(this[key]);
      } else {
        return this[key];
      }
    }
    return null;
  };

  CordovaStorage.prototype.setItem = function (key, val) {
    if (val === undefined) {
      this[key] = null;
    } else if (this.___priv_strict___) {
      this[key] = String(val);
    } else {
      this[key] = val;
    }
    this.___save___();
  };

  CordovaStorage.prototype.removeItem = function (key) {
    delete this[key];
    this.___save___();
  };

  CordovaStorage.prototype.clear = function () {
    var self = this;
    // filters out prototype keys
    Object.keys(self).forEach(function (key) {
      self[key] = undefined;
      delete self[key];
    });
  };

  CordovaStorage.prototype.key = function (i) {
    i = i || 0;
    return Object.keys(this)[i];
  };

  CordovaStorage.prototype.__defineGetter__('length', function () {
    return Object.keys(this).length;
  });

  CordovaStorage.prototype.___save___ = function () {
    var self = this
      ;

    if (!this.___priv_bk___.path) {
      return;
    }

    if (this.___priv_bk___.lock) {
      this.___priv_bk___.wait = true;
      return;
    }

    this.___priv_bk___.lock = true;
    cordovaWriteFile(
      this.___priv_bk___.path
    , JSON.stringify(this, null, this.___priv_ws___)
    , 'utf8'
    , function (e) {
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

  Object.defineProperty(CordovaStorage, 'create', {
    value: function (path, opts) {
      return new CordovaStorage(path, opts);
    }
  , writable: false
  , enumerable: false
  });

  global.localStorage = new Storage("./test149.json", { strict: false, ws: '' });
