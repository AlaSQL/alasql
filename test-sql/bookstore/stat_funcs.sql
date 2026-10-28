/*
Script to build the parts table used in the examples.
Part of intermediate sql(206/216) class subqueries.
*/
use master
drop database parts;
go

create database parts;
go

-- create Date's famous parts table
use parts
CREATE TABLE Parts 
(part_nbr VARCHAR(5) NOT NULL PRIMARY KEY
 , part_name VARCHAR(50) NOT NULL
 , part_color VARCHAR(50) NOT NULL 
 , part_wgt INTEGER NOT NULL 
 , city_name VARCHAR(50) NOT NULL
 );
 
-- load data (experiment with different numbers of rows, etc.)
INSERT INTO Parts (part_nbr, part_name, part_color, part_wgt, city_name)
VALUES ('p1', 'Nut', 'Red', 12, 'London')
	, ('p2', 'Bolt', 'Green', 17, 'Paris')
	, ('p3', 'Cam', 'Blue', 12, 'Paris')
	, ('p4', 'Screw', 'Red', 14, 'London')
	, ('p5', 'Cam', 'Blue', 12, 'Paris')
	, ('p6', 'Cog', 'Red', 19, 'London')
;

/*
Script to calculate the median of a dataset.
Part of intermediate sql(206/216) class subqueries.
The concept of using select top was found on a tek-tips
SQL forum.
*/
 
--use the parts table
use parts

-- display data
select *
from parts
order by part_wgt;

-- calculate the median
select avg(wgt) as median
from
(select max(part_wgt) as wgt
from (select top 50 percent *
from parts
order by part_wgt asc) a
union
select min(part_wgt)
from (select top 50 percent *
from parts
order by part_wgt desc) d) u;
go

/*
Script to show how to calculate the mode of a dataset.
Part of intermediate sql(206/216) class subqueries.
Based on Spitek & Gennick's Transact SQL Cookbook but
with modifications to allow for bimodal datasets or
datasets with no mode.
*/

SELECT TOP 1 WITH TIES part_wgt mode
FROM parts
GROUP BY part_wgt
HAVING count(*) > 1
ORDER BY COUNT(*) DESC;
