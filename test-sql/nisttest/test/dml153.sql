-- MODULE DML153  

-- SQL Test Suite, V6.0, Interactive SQL, dml153.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print


-- TEST:0848 Query spec with subquery is now updatable!

   CREATE VIEW EXON AS
     SELECT * FROM HU.STAFF WHERE CITY IN
       (SELECT CITY FROM HU.PROJ);
-- PASS:0848 If view is created?

   COMMIT WORK;

   DELETE FROM EXON
     WHERE GRADE = 10;
-- PASS:0848 If 1 row is deleted?

   SELECT COUNT(*) FROM HU.STAFF;
-- PASS:0848 If count = 4?

   ROLLBACK WORK;

   UPDATE EXON
     SET EMPNAME = 'Heathen'
     WHERE EMPNAME = 'Alice';
-- PASS:0848 If 1 row is updated?

   SELECT COUNT(*) FROM HU.STAFF
     WHERE EMPNAME LIKE 'H%';
-- PASS:0848 If count = 1?

-- reset
   ROLLBACK WORK;

   DROP VIEW EXON CASCADE;

   COMMIT WORK;

-- END TEST >>> 0848 <<< END TEST

-- *************************************************////END-OF-MODULE
