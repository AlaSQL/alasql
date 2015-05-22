REQUIRE ORIENTDB;

CREATE DATABASE IF NOT EXISTS one;
USE one;

CREATE CLASS Owner EXTENDS V;
CREATE CLASS Link EXTENDS E;

-- create document Owner with id 1 and id 2
CREATE VERTEX Owner #1;
CREATE VERTEX Owner #2;

-- params = 123
CREATE EDGE Link FROM #1 TO #2 SET foo = ?;
SELECT FROM Link;

-- ASSERT COUNT 1;

-- add operator
SET PARAMS = {
	foo:'bar',
	fromId:1,
	toId:2
};

-- how to run records with params?
-- :toId or $toId?
CREATE EDGE link from (select from Owner where id = :fromId) 
TO (select from Owner where id = :toId) SET foo = :foo;

ASSERT 1;

-- constraints
create class E2 extends E;
create property E2.x LONG;
create property E2.in LINK;
alter property E2.in MANDATORY=true;
create property E2.out LINK;
alter property E2.out MANDATORY=true;
create class E1 extends E;
create property E1.x LONG;
alter property E1.x MANDATORY=true;
create property E1.in LINK;
alter property E1.in MANDATORY=true;
create property E1.out LINK;
alter property E1.out MANDATORY=true;
create class FooType extends V;
create property FooType.name STRING;
alter property FooType.name MANDATORY=true;

-- LET or SET
-- $var vs @var
-- or set params?

let $v1 = create vertex FooType content {'name':'foo1'};
let $v2 = create vertex FooType content {'name':'foo2'};
create edge E1 from $v1 to $v2 content {'x':22};
create edge E1 from $v1 to $v2 set x=22;
create edge E2 from $v1 to $v2 content {'x':345};


