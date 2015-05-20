-- Source: http://stackoverflow.com/questions/28685205/find-friends-of-friends-with-orientdb-sql?rq=1


create class User extends V;
create class IsFriendsWith extends E;
create property User.name string;
create property User.uuid string;
create property IsFriendsWith.status string;

create vertex User set uuid = "1", name = "Bob";
create vertex User set uuid = "2", name = "Sally";
create vertex User set uuid = "3", name = "Eric";
create vertex User set uuid = "4", name = "Jenny";
create vertex User set uuid = "5", name = "Dennis";
create vertex User set uuid = "6", name = "Mary";
create vertex User set uuid = "7", name = "John";

create edge IsFriendsWith from (select from User where uuid = "1") to (select from User where uuid = "2") set status = "approved";
create edge IsFriendsWith from (select from User where uuid = "1") to (select from User where uuid = "3") set status = "pending";
create edge IsFriendsWith from (select from User where uuid = "2") to (select from User where uuid = "4") set status = "approved";
create edge IsFriendsWith from (select from User where uuid = "5") to (select from User where uuid = "2") set status = "pending";
create edge IsFriendsWith from (select from User where uuid = "3") to (select from User where uuid = "4") set status = "approved";
create edge IsFriendsWith from (select from User where uuid = "6") to (select from User where uuid = "1") set status = "approved";
create edge IsFriendsWith from (select from User where uuid = "6") to (select from User where uuid = "7") set status = "approved";

-- query
	 select from (
      select 
        expand(unionall(
          outE("IsFriendsWith")[status="approved"].inV(), 
          inE("IsFriendsWith")[status="approved"].outV()
        ))
        from (
          select 
              expand(unionall(
                outE("IsFriendsWith")[status="approved"].inV(), 
                inE("IsFriendsWith")[status="approved"].outV()
              ))
          from (
             select expand($u) let $u = first((select from User where uuid = "1"))
          )
        )
    )
  )
  where @rid <> $u and @rid NOT IN $u.both("IsFriendsWith")

-- functions:
-- expand()
-- first()
-- unionall()
-- outE()
-- inE()
-- outV()
-- inV()
-- .both()

-- function()[condition].function()
-- Expression DOT func() -> same 
-- pass current scope into the this of function...


select expand(
  bothE('is_friend_with')[status = 'approved'].bothV()
  .bothE('is_friend_with')[status = 'approved'].bothV()
  .remove( @this )
) from user where uuid = '95920a96a60c4d40a8f70bde98ae1a24'

select expand(
  bothE('is_friend_with')[status = 'approved'].bothV()
  .bothE('is_friend_with')[status = 'approved'].bothV()
) from user where uuid = '95920a96a60c4d40a8f70bde98ae1a24'

select 
      expand(bothE('is_friend_with')[status = 'approved'].inV().bothE('is_friend_with')[status = 'approved'].inV()) 
from user where uuid = '95920a96a60c4d40a8f70bde98ae1a24'



-- LET clause
-- @rid -- may be always equal [$id]

