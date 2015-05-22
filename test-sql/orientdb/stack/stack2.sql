-- Source: http://stackoverflow.com/questions/19895535/orientdb-sql-traverse-while-keeping-edges-weight?rq=1

select * from (traverse out from   
(select out, sum(value) as value from    
(traverse * from (select from Profile where username="B") while $depth < 3)    
where @class="Liked" or @class="Commented" group by out order by value desc)   
while $depth < 2  ) where @class="Profile" )

select expand(out) from (    
    select out, sum(value) as value from (    
       select expand(inE("Liked", "Commented")) from Profile 
           where username="B"    
    ) group by out order by value desc 
)

select expand($v) from    
   (select from    
      (select expand(inE("Liked", "Commented")) from Profile where @rid=#11:0)   
    let $v  = $current   
   )

-- JSON

{  
   "result" : [{  
       "@type" : "d",
        "@rid" : "#14:4",
        "@version" : 2,
        "@class" : "Commented",
        "value" : 1,
        "out" : "#11:165",
        "in" : "#11:0"
    }, {
        "@type" : "d",
        "@rid" : "#14:4",
        "@version" : 2,
        "@class" : "Commented",
        "value" : 1,
        "out" : "#11:165",
        "in" : "#11:0"
    }, {
        "@type" : "d",
        "@rid" : "#14:4",
        "@version" : 2,
        "@class" : "Commented",
        "value" : 1,
        "out" : "#11:165",
        "in" : "#11:0"
    }]
}

select * from (
 traverse out from (
  select out, sum(value) as value from (
   traverse * from (
    select from Profile where username="B"
   ) while $depth < 3
  ) where @class="Liked" or @class="Commented" group by out order by value desc
 ) while $depth < 2 
) where @class="Profile" )

