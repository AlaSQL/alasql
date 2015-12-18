var gulp = require("gulp"),
fs = require("fs"),
execSync = require('child_process').execSync;

const DIR_NAME = __dirname;

module.exports = {
  built(){
    try{
      fs.statSync(DIR_NAME+"/slim-parser.js");
    }catch(e){
      return false;
    }
    return true;
  },
  build(){
    execSync(`jison "${DIR_NAME+"/slim.jison"}" -o "${DIR_NAME+"/slim-parser.js"}"`)
    var src= fs.readFileSync(DIR_NAME+"/slim-parser.js","utf8");
    var wrapped = `
    import {extend} from "../../utils/object.js";
    var yy = {extend:extend};
    ${src}

    export {parser};
    `;
    fs.writeFileSync(DIR_NAME+"/slim-parser.js",wrapped,"utf8");
  }
};

gulp.task("default",module.exports.build);