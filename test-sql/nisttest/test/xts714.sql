-- MODULE   XTS714

-- SQL Test Suite, V6.0, Interactive SQL, xts714.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS2              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7014 Schema definition named schema, implicit auth-id!

   CREATE SCHEMA T2831C

         CREATE TABLE TESTAB2831

           (TNUM NUMERIC(5),

            TCHAR CHAR(3));
-- PASS:7014 If schema created successfully?

   COMMIT WORK;

   INSERT INTO T2831C.TESTAB2831
         VALUES(1,'AA');
-- PASS:7014 If 1 row inserted successfully?

   INSERT INTO T2831C.TESTAB2831
         VALUES(2,'BB');
-- PASS:7014 If 1 row inserted successfully?

   INSERT INTO T2831C.TESTAB2831
         VALUES(3,'CC');
-- PASS:7014 If 1 row inserted successfully?

   INSERT INTO T2831C.TESTAB2831
         VALUES(4,'DD');
-- PASS:7014 If 1 row inserted successfully?

   INSERT INTO T2831C.TESTAB2831
         VALUES(5,'EE');
-- PASS:7014 If 1 row inserted successfully?

   SELECT * FROM T2831C.TESTAB2831 ORDER BY TNUM;
-- PASS:7014 If 5 row selected in following order?
--                c1   c2
--                ==   ==
-- PASS:7014 If    1   AA?
-- PASS:7014 If    2   BB?
-- PASS:7014 If    3   CC?
-- PASS:7014 If    4   DD?
-- PASS:7014 If    5   EE?

       CREATE SCHEMA DT2831C
         CREATE TABLE DTESTAB2831 (TNUM NUMERIC(5),
         TCHAR CHAR(3));
-- PASS:7014 If schema created successfully?

   COMMIT WORK;

   INSERT INTO DT2831C.DTESTAB2831
         SELECT * FROM T2831C.TESTAB2831;
-- PASS:7014 If 5 rows inserted successfully?

   SELECT COUNT(*) FROM DT2831C.DTESTAB2831;
-- PASS:7014 If count = 5?

   SELECT DT2831C.DTESTAB2831.TNUM,
         DT2831C.DTESTAB2831.TCHAR
         FROM DT2831C.DTESTAB2831
         WHERE DT2831C.DTESTAB2831.TNUM = 1;
-- PASS:7014 If one row selected and TNUM = 1 and TCHAR = AA?

   SELECT * FROM DT2831C.DTESTAB2831
         WHERE TNUM <> 1 ORDER BY TNUM;
-- PASS:7014 If 4 rows selected in following order?
--               c1   c2
--               ==   ==
-- PASS:7014 If   2   BB?
-- PASS:7014 If   3   CC?
-- PASS:7014 If   4   DD?
-- PASS:7014 If   5   EE?

   ROLLBACK WORK;

   DROP SCHEMA T2831C CASCADE;
-- PASS:7014 If schema dropped successfully?

   COMMIT WORK;

   DROP SCHEMA DT2831C CASCADE;
-- PASS:7014 If schema dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7014 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
