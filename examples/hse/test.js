var alasql = require('../../alasql.min.js');

alasql('SELECT * INTO SQL("res.sql",{tableid:"hselocal6.dbo.ofpline"}) FROM XLSX("hse.xlsx",{headers:true,sheetid:"New (2)"})');