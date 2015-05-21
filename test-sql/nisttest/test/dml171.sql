-- MODULE  DML171  

-- SQL Test Suite, V6.0, Interactive SQL, dml171.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0882 More full outer join!

   CREATE TABLE STAFF66 (
     SALARY   INTEGER,
     EMPNAME CHAR(20),
     GRADE   DECIMAL,
     EMPNUM  CHAR(3));
-- PASS:0882 If table created successfully?

   COMMIT WORK;

   INSERT INTO STAFF66
      SELECT GRADE*1000, EMPNAME, GRADE, EMPNUM
      FROM HU.STAFF3 WHERE EMPNUM > 'E2';
-- PASS:0882 If insert completed successfully?

   UPDATE HU.STAFF3 SET EMPNUM = 'E6' WHERE EMPNUM = 'E5';
-- PASS:0882 If update completed successfully?

   UPDATE HU.STAFF3 SET EMPNAME = 'Ali' WHERE GRADE = 12;
-- PASS:0882 If update completed successfully?

   SELECT EMPNUM, CITY, SALARY
     FROM HU.STAFF3 FULL OUTER JOIN STAFF66 USING (EMPNUM)
     ORDER BY EMPNUM;
-- PASS:0882 If 6 rows are returned in the following order?
--               empnum     city     salary
--               ======     ====     ======
-- PASS:0882 If  E1         Deale    NULL   ?
-- PASS:0882 If  E2         Vienna   NULL   ?
-- PASS:0882 If  E3         Vienna   13000  ?
-- PASS:0882 If  E4         Deale    12000  ?
-- PASS:0882 If  E5         NULL     13000  ?
-- PASS:0882 If  E6         Akron    NULL   ?

   ROLLBACK WORK;

   DROP TABLE STAFF66 CASCADE;
-- PASS:0882 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0882 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
