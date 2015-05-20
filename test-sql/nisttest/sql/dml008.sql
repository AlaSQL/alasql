-- MODULE DML008

-- SQL Test Suite, V6.0, Interactive SQL, dml008.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0016 SELECT ALL syntax!
     SELECT ALL EMPNUM
          FROM WORKS
          WHERE HOURS = 12;

-- PASS:0016 If 2 rows are selected and both EMPNUMs are 'E1'?

-- END TEST >>> 0016 <<< END TEST
-- *************************************************************

-- TEST:0164 SELECT:default is ALL, not DISTINCT!
     SELECT EMPNUM
          FROM WORKS
          WHERE HOURS = 12;

-- PASS:0164 If 2 rows are selected and both EMPNUMs are 'E1'?

-- END TEST >>> 0164 <<< END TEST
-- ************************************************************

-- TEST:0017 SELECT:checks DISTINCT!
     SELECT DISTINCT EMPNUM
          FROM WORKS
          WHERE HOURS = 12;

-- PASS:0017 If 1 row is selected and EMPNUM = 'E1'?

-- END TEST >>> 0017 <<< END TEST
-- ***********************************************************

-- TEST:0018 SQLCODE = 100, SELECT with no data!
     SELECT EMPNUM,PNUM
          FROM WORKS
          WHERE EMPNUM = 'E16';

-- PASS:0018 If 0 rows selected, SQLCODE = 100, end of data?

-- END TEST >>> 0018 <<< END TEST
-- ***********************************************************

-- TEST:0019 SQLCODE = 0, SELECT with data!
     SELECT EMPNUM,HOURS
          FROM WORKS
          WHERE EMPNUM = 'E1' AND PNUM = 'P4';

-- PASS:0019 If HOURS = 20 ?

-- END TEST >>> 0019 <<< END TEST
-- **********************************************************

-- TEST:0020 SELECT NULL value !

-- setup
     INSERT INTO WORKS
         VALUES('E18','P18',NULL);
-- PASS:0020 If 1 row is inserted?

      SELECT EMPNUM,HOURS  
           FROM   WORKS
          WHERE  EMPNUM='E18' AND PNUM='P18';
-- PASS:0020 If EMPNUM = 'E18' and HOURS is NULL?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0020 <<< END TEST
-- **********************************************************

-- NO_TEST:0021 SELECT CHAR(m) column into shorter var, get indic = m!

-- Testing indicators

-- ***********************************************************

-- NO_TEST:0165 Truncate CHAR column SELECTed into shorter var!

-- Testing host identifiers
-- *************************************************////END-OF-MODULE
