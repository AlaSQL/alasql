var VOC = {};
(function(exports){
  var handlers = {};
  var add = function(lang, handler) {
    if(typeof lang === "string") handlers[lang] = handler; 
    else lang.forEach(function(l) { handlers[l] = handler; });
  };
  var files = {};
  var fs = typeof require === "undefined" ? false : require('fs');
  var mkdirp = !fs ? false : function(f) { return require('./mkdirp').sync(require('path').dirname(f)); };
  var lastlang="js";
  var process_code = function(src, lastlang) {
    var offset = lastlang.indexOf(">");
    if(offset !== -1) {
      var f = lastlang.substr(1+offset);
      var lang = lastlang.substr(0,offset);
      if(!f || !fs) return "";
      var s = src + "\n";
      if(f.substr(-3) === '.js') s = process_code(s, lang);
      if(lang === 'make') s = process_code(s, lang);
      if(mkdirp) mkdirp(f);
      if(files[f]) fs.appendFileSync(f, s);
      else { files[f] = 1; fs.writeFileSync(f, s); }
      return "";
    }
    else if(!lastlang) return src;
    else if(!(lastlang in handlers)) throw "Unrecognized language " + lastlang;
    return handlers[lastlang](src);
  };
  var run = function(src) {
    var M = (typeof marked !== "undefined" ? marked : require('./marked'));
    var data = M.lexer(src).filter(function(y) { return y.type === 'code'; });
    var t = [], s = [];
    data.forEach(function(x) {
      if(x.lang) {
        if(x.lang !== lastlang && s.length > 0) {
          var c = process_code(s.join("\n"), lastlang);
          if(c) t.push(c);
          s = [];
        }
        lastlang = x.lang; 
      } else x.lang = lastlang;
      s.push(x.text);
    });
    t.push(process_code(s.join("\n"), lastlang));
    return t.join("\n");
  };
  exports.add = add;
  exports.run = run;
  add(["js","javascript"], function(code) { return code; });
  add(["coffee","coffee-script"], function(code) {
    var CS = (typeof CoffeeScript !== "undefined") ? CoffeeScript : require('coffee-script');
    return CS.compile(code, {bare:true});
  });
  add(["make","Makefile"], function(code) { return code.replace(/^ {8}/g,"\t").replace(/\n {8}/mg,"\n\t"); });
})(typeof exports !== "undefined" ? exports : VOC);

