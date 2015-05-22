-- MODULE   XTS703

-- SQL Test Suite, V6.0, Interactive SQL, xts703.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7010 UNIQUE predicate, single table, all values distinct!

   SELECT COUNT(*)
         FROM   STAFF
         WHERE  UNIQUE(SELECT * FROM STAFF);
-- PASS:7010 If COUNT = 0?

   SELECT COUNT(*) FROM STAFF AS X
         WHERE UNIQUE (SELECT * FROM STAFF AS Y
              WHERE X.EMPNUM = Y.EMPNUM
              AND X.EMPNAME  = Y.EMPNAME
              AND X.GRADE    = Y.GRADE
              AND X.CITY     = Y.CITY);
-- PASS:7010 If COUNT = 5?

   ROLLBACK WORK;

-- END TEST >>> 7010 <<< END TEST
-- *********************************************

-- TEST:7011 UNIQUE PREDICATE, table subquery with non-null duplicates!

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  UNIQUE(SELECT GRADE FROM STAFF);
-- PASS:7011 If COUNT = 0?

   SELECT EMPNUM, GRADE FROM STAFF X
         WHERE (UNIQUE(SELECT GRADE FROM STAFF Y
                       WHERE X.GRADE = Y.GRADE));
-- PASS:7011 If EMPNUM = E2?
-- PASS:7011 If GRADE = 10?

   SELECT COUNT (*) FROM STAFF X
         WHERE NOT UNIQUE (SELECT GRADE FROM STAFF Y
                           WHERE X.GRADE = Y.GRADE);
-- PASS:7011 If COUNT = 4?

   ROLLBACK WORK;

-- END TEST >>> 7011 <<< END TEST
-- *********************************************

-- TEST:7012 UNIQUE predicate, duplicates containing null!

   INSERT INTO STAFFC (EMPNUM,EMPNAME,GRADE,CITY)
         VALUES('E9','Terry',13,NULL);
-- PASS:7012 If 1 row inserted successfully?

   INSERT INTO STAFFC (EMPNUM,EMPNAME,GRADE,CITY)
         VALUES('E8','Nick',13,NULL);
-- PASS:7012 If 1 row inserted successfully?

   SELECT COUNT(*)
     FROM   STAFFC AS X
     WHERE UNIQUE(SELECT CITY, MGR FROM STAFFC AS Y
     WHERE X.GRADE = Y.GRADE);
-- PASS:7012 If COUNT = 9?

   SELECT COUNT(*)
     FROM   STAFFC AS X
     WHERE NOT UNIQUE(SELECT GRADE, CITY FROM STAFFC AS Y
     WHERE X.GRADE = Y.GRADE);
-- PASS:7012 If COUNT = 3?

   ROLLBACK WORK;

-- END TEST >>> 7012 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
