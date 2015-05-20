-- MODULE DML011

-- SQL Test Suite, V6.0, Interactive SQL, dml011.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0033 UPDATE view without <WHERE clause>!

-- setup
     UPDATE TEMP_SS
          SET GRADE = 15;
-- PASS:0033 If 2 rows are updated ?

     SELECT COUNT(*)
          FROM TEMP_SS
          WHERE GRADE = 15;
-- PASS:0033 If count = 2?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0033 <<< END TEST
-- ***************************************************************

-- TEST:0034 UPDATE table with SET column in <WHERE clause>!

-- setup
     UPDATE STAFF
          SET GRADE = 2*GRADE
          WHERE GRADE = 13;
-- PASS:0034 If 2 rows are updated?

     SELECT COUNT(*)
          FROM STAFF
          WHERE GRADE = 26;
-- PASS:0034 If count = 2?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0034 <<< END TEST
-- ***********************************************************

-- TEST:0035 UPDATE with correlated subquery in <WHERE clause>!

-- setup
     UPDATE STAFF
          SET GRADE=10*STAFF.GRADE
          WHERE STAFF.EMPNUM NOT IN
                (SELECT WORKS.EMPNUM
                      FROM WORKS
                      WHERE STAFF.EMPNUM = WORKS.EMPNUM);
-- PASS:0035 If 1 row is updated?

     SELECT COUNT(*)
          FROM   STAFF
          WHERE  GRADE=130;
-- PASS:0035 If count = 1?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0035 <<< END TEST
-- ***************************************************************

-- TEST:0036 UPDATE view globally with check option violation!

     SELECT COUNT(*) FROM STAFF WHERE GRADE = 11;
-- PASS:0036 If count = 0?

     UPDATE TEMP_SS
          SET GRADE = 11;
-- PASS:0036 If ERROR, view check constraint, 0 rows updated?

     SELECT COUNT(*) FROM STAFF WHERE GRADE = 11;
-- PASS:0036 If count = 0?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0036 <<< END TEST

-- *************************************************////END-OF-MODULE
