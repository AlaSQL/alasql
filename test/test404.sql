create table colors (id int, name varchar(255));
create table fruits (id int, name varchar(255));
create table mascots (id int, name varchar(255));

insert into colors(id, name) values (1, 'red');
insert into colors(id, name) values (2, 'blue');
insert into colors(id, name) values (3, 'orange');

insert into fruits(id, name) values (1, 'apple');
insert into fruits(id, name) values (2, 'grape');
insert into fruits(id, name) values (3, 'orange');
insert into fruits(id, name) values (4, 'peaches');

insert into mascots(id, name) values (1, 'redsox');
insert into mascots(id, name) values (2, 'whitesox');
insert into mascots(id, name) values (3, 'orange');
insert into mascots(id, name) values (4, 'peaches');

select t0.name t0n, t1.name t1n, t2.name t2n 
from colors t0
full outer join fruits t1 on t1.name = t0.name
full outer join mascots t2 on t2.name = t1.name or t2.name = t0.name;