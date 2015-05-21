-- MODULE  DML162  

-- SQL Test Suite, V6.0, Interactive SQL, dml162.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0863 <joined table> directly contained in cursor,view!

   CREATE VIEW BLIVET (CITY, PNUM, EMPNUM, EMPNAME, GRADE,
      HOURS, PNAME, PTYPE, BUDGET) AS
      HU.STAFF NATURAL JOIN HU.WORKS NATURAL JOIN HU.PROJ;
-- PASS:0863 If view created successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
     FROM BLIVET WHERE EMPNUM = 'E1';
-- PASS:0863 If COUNT = 3?

   SELECT COUNT(*) 
     FROM BLIVET WHERE EMPNUM <> 'E1';
-- PASS:0863 If COUNT = 3?

   SELECT * FROM HU.STAFF LEFT OUTER JOIN HU.WORKS
      USING (EMPNUM);
-- PASS:0863 If 13 rows are returned?

   COMMIT WORK;

   DROP VIEW BLIVET CASCADE;

   COMMIT WORK;

-- END TEST >>> 0863 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
