---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 11 - Querying Partitioned Tables
-- Copyright Lubor Kollar, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- CREATE PARTITION FUNCTION and SCHEME
---------------------------------------------------------------------

CREATE PARTITION FUNCTION PF2009 (SMALLDATETIME)
AS RANGE RIGHT FOR VALUES ('20090101','20090201','20090301','20090401','20090501','20090601',
'20090701','20090801','20090901','20091001','20091101','20091201',
'20100101');
CREATE PARTITION SCHEME PSYEAR AS PARTITION PF2009 ALL TO ([PRIMARY]);

---------------------------------------------------------------------
-- Partitioned version of LINEITEM table
---------------------------------------------------------------------

CREATE TABLE LINEITEMPART  
(		L_ORDERKEY               INT          	NOT NULL,
		L_PARTKEY                INT          	NOT NULL,
		L_SUPPKEY                INT          	NOT NULL,
		L_LINENUMBER           	 INT          	NOT NULL,
		L_QUANTITY               MONEY        	NOT NULL,
		L_EXTENDEDPRICE		 MONEY        	NOT NULL,
		L_DISCOUNT               MONEY        	NOT NULL,
		L_TAX                    MONEY        	NOT NULL,
		L_RETURNFLAG             CHAR(1)      	NOT NULL,
		L_LINESTATUS             CHAR(1)      	NOT NULL,
		L_SHIPDATE               SMALLDATETIME	NOT NULL,
		L_COMMITDATE             SMALLDATETIME	NOT NULL,
		L_RECEIPTDATE            SMALLDATETIME	NOT NULL,
		L_SHIPINSTRUCT         	 CHAR(25)     	NOT NULL,
		L_SHIPMODE               CHAR(10)     	NOT NULL,
		L_COMMENT                VARCHAR(44)  	NOT NULL)
 ON PSYEAR (L_SHIPDATE);

---------------------------------------------------------------------
-- Populating LINEITEMPART table
---------------------------------------------------------------------
/***

1. Get the TPCH data genarator tool from www.tpc.org (warning: the site contains 
   only the source and make files; you have to use your own C compiler to build 
   the executable dbgen.exe using instructions at http://www.tpc.org/tpch/default.asp
2. Execute dgben with the following prameters to generate the table data:
   dbgen -vf -s 1 -T L
   one of the files generated is lineitem.tbl and it contains 6+ million rows
3. Create staging table LINEITEM in your database with the same column definition 
   as the LINEITEMPART but w/out partitioning
4. Load the data into the staging table using the following bcp command 
   bcp <dbname>..LINEITEM in "lineitem.tbl"  /c /b 1000 /a 65535 /t"|" /r"|\n" /E
5. perform the following insert to transform the dates to be all in the year 2009 
   and at the same time copy data into your partitioned table
***/

INSERT INTO LINEITEMPART SELECT 
	L_ORDERKEY               ,
	L_PARTKEY                ,
	L_SUPPKEY                ,
	L_LINENUMBER             ,
	L_QUANTITY          ,
	L_EXTENDEDPRICE     ,
	L_DISCOUNT          ,
	L_TAX               ,
	L_RETURNFLAG         ,
	L_LINESTATUS         ,
	DATEADD (YY,2009-DATEPART(YY,L_SHIPDATE),L_SHIPDATE),
	DATEADD (YY,2009-DATEPART(YY,L_COMMITDATE),L_COMMITDATE),
	DATEADD (YY,2009-DATEPART(YY,L_RECEIPTDATE),L_RECEIPTDATE),
 	L_SHIPINSTRUCT     ,
	L_SHIPMODE      ,
	L_COMMENT FROM LINEITEM


---------------------------------------------------------------------
-- Creating clustered index on LINEITEMPART table
---------------------------------------------------------------------

CREATE CLUSTERED INDEX L_IDX_SHIPDATE ON LINEITEMPART (L_SHIPDATE);

---------------------------------------------------------------------
-- Creating nonclustered index on LINEITEMPART table
---------------------------------------------------------------------

CREATE INDEX L_IDX_SUPPKEY ON LINEITEMPART (L_SUPPKEY) ON PSYEAR (L_SHIPDATE);

---------------------------------------------------------------------
-- Query identifying all indexes in the current database that should have 
-- statistics refreshed anytime the index is built or rebuilt
---------------------------------------------------------------------

SELECT OBJECT_NAME(IX.object_id) AS table_name, IX.name AS index_name
FROM sys.index_columns AS IC
  JOIN sys.indexes AS IX
    ON IC.object_id = IX.object_id AND IC.index_id = ix.index_id
WHERE IC.partition_ordinal = 1 AND IC.key_ordinal <> 1; 

---------------------------------------------------------------------
-- Listing 11-1 Select query with simple predicate on partitioning column
---------------------------------------------------------------------

SELECT * FROM LINEITEMPART WHERE L_SHIPDATE = '20090301'; 

---------------------------------------------------------------------
-- Listing 11-3 Partition Elimination for BETWEEN predicate
---------------------------------------------------------------------

SELECT * FROM LINEITEMPART WHERE L_SHIPDATE BETWEEN '20090301' AND '20090531';

---------------------------------------------------------------------
-- Listing 11-4 Query to investigate parallel execution
---------------------------------------------------------------------

SELECT  COUNT(*) FROM LINEITEMPART WHERE L_SHIPDATE BETWEEN '20090301' AND '20090531';