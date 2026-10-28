-- MODULE   XTS715

-- SQL Test Suite, V6.0, Interactive SQL, xts715.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7015 Schema definition - explicit name and auth-id!

   CREATE SCHEMA T7015aPC AUTHORIZATION CTS4
         CREATE TABLE T7015aPC.TESTAB2931 
         (TNUM NUMERIC(5),
         TCHAR CHAR(3));
-- PASS:7015 If schema created successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.SCHEMATA 
         WHERE SCHEMA_NAME = 'T7015APC';
-- PASS:7015 If COUNT = 1?

   INSERT INTO T7015aPC.TESTAB2931
         VALUES(4,'DD');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015aPC.TESTAB2931
         VALUES(3,'CC');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015aPC.TESTAB2931
         VALUES(2,'BB');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015aPC.TESTAB2931
         VALUES(5,'EE');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015aPC.TESTAB2931
         VALUES(1,'AA');
-- PASS:7015 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT * FROM T7015aPC.TESTAB2931
	  ORDER BY TNUM;
-- PASS:7015 If 5 rows selected in following order?
--              c1  c2
--              ==  ==
-- PASS:7015 If  1  AA?
-- PASS:7015 If  2  BB?
-- PASS:7015 If  3  CC?
-- PASS:7015 If  4  DD?
-- PASS:7015 If  5  EE?

   COMMIT WORK;

   CREATE SCHEMA T7015bPC AUTHORIZATION CTS3
         CREATE TABLE TESTBA2931
         (TNUM NUMERIC(5),
         TCHAR CHAR(3))
         GRANT SELECT, INSERT, UPDATE ON TESTBA2931 TO CTS4;
-- PASS:7015 If schema created successfully?

   COMMIT WORK;

   INSERT INTO T7015bPC.TESTBA2931
         VALUES(4,'DD');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015bPC.TESTBA2931
         VALUES(3,'CC');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015bPC.TESTBA2931
         VALUES(2,'BB');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015bPC.TESTBA2931
         VALUES(5,'EE');
-- PASS:7015 If 1 row inserted successfully?

   INSERT INTO T7015bPC.TESTBA2931
         VALUES(1,'AA');
-- PASS:7015 If 1 row inserted successfully?

   SELECT COUNT(*) FROM T7015bPC.TESTBA2931;
-- PASS:7015 If COUNT = 5?

   SELECT * FROM T7015bPC.TESTBA2931 ORDER BY TNUM;
-- PASS:7015 If 5 rows selected in following order?
--               c1   c2
--               ==   ==
-- PASS:7015 If   1   AA?
-- PASS:7015 If   2   BB?
-- PASS:7015 If   3   CC?
-- PASS:7015 If   4   DD?
-- PASS:7015 If   5   EE?

   UPDATE T7015bPC.TESTBA2931
         SET TCHAR = 'XX'
         WHERE TNUM = 1;
-- PASS:7015 If 1 row updated successfully?

   SELECT TNUM, TCHAR 
         FROM T7015bPC.TESTBA2931
         WHERE TNUM = 1;
-- PASS:7015 If one row selected and TNUM = 1 and TCHAR = XX?

   ROLLBACK WORK;

   DROP SCHEMA T7015aPC CASCADE;
-- PASS:7015 If schema dropped successfully?
   COMMIT WORK;

   DROP SCHEMA T7015bPC CASCADE;
-- PASS:7015 If schema dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7015 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
