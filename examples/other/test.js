var alasql = require('../../alasql');

var groups = [{id:4, name:"abcd", id_group:"1"},
              {id:5, name:"efgh", id_group:"1"},
              {id:6, name:"ijkl", id_group:"1"},
              {id:4, name:"abcd", id_group:"2"},
              {id:7, name:"mnop", id_group:"2"}];
               
var res = alasql('select id_group, count(id) as cnt from ? where id in (4,7)\
group by id_group having cnt = 2',[groups]);         

console.log(res);               


var res = alasql('select id_group, count(id) as cnt from ? where id in (4,7)\
group by id_group having count(id) = 2',[groups]);         

console.log(res);     

//document.getElementById('result').textContent = JSON.stringify(res);