#!/usr/bin/env node

var myfile = process.argv[2]; if(!myfile || myfile ==='-') myfile='/dev/stdin';
var data = require('fs').readFileSync(myfile,'utf8');
var d = require('./voc').run(data);
var fs = require('fs');
if(fs.existsSync('.vocrc')) {
  var vocrc = JSON.parse(fs.readFileSync('.vocrc','utf8'));
  if(vocrc.output) fs.writeFileSync(vocrc.output, d);
  if(vocrc.post) {
    var exec = require('child_process').exec;
    var make = exec(vocrc.post);
  }
}
else console.log(d);
