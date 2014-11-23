create table one (a int, b int, c string);
assert 1;
insert into one values (1,1,1), (2,2,2);
assert 2;
alter table one rename column b to bbb;
assert 2;

