-- MODULE DML062

-- SQL Test Suite, V6.0, Interactive SQL, dml062.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0274 COMMIT and ROLLBACK across schemas!

     DELETE FROM SULLIVAN1.AUTH_TABLE;
    
-- setup
     INSERT INTO SULLIVAN1.AUTH_TABLE
     VALUES (10,'A');
-- PASS:0274 If 1 row inserted?
    
-- setup
     INSERT INTO SULLIVAN1.AUTH_TABLE
     VALUES (100,'B');
-- PASS:0274 If 1 row inserted?
    
     DELETE FROM AA;
    
-- setup
     INSERT INTO AA
     VALUES ('In God we trust');
-- PASS:0274 If 1 row inserted    ?

     COMMIT WORK;
    
-- to be rolled back
     DELETE FROM SULLIVAN1.AUTH_TABLE;
    
-- to be rolled back
     DELETE FROM AA;

-- revert to previous COMMIT
     ROLLBACK WORK;
    
     SELECT COUNT(*)
            FROM SULLIVAN1.AUTH_TABLE;
-- PASS:0274 If count = 2?

     SELECT CHARTEST FROM AA;
-- PASS:0274 If CHARTEST = 'In God we trust'?

-- restore
     DELETE FROM AA;
     DELETE FROM SULLIVAN1.AUTH_TABLE;
     COMMIT WORK;

-- END TEST >>> 0274 <<< END TEST

-- ****************************************************************


-- TEST:0275 COMMIT and ROLLBACK of multiple tables!

-- setup
        INSERT INTO STAFF1
        SELECT * FROM STAFF;
-- PASS:0275 If 5 rows are inserted?

-- setup
        INSERT INTO WORKS1
        SELECT * FROM WORKS;
-- PASS:0275 If 12 rows are inserted?

-- setup        
        INSERT INTO PROJ1
        SELECT * FROM PROJ;
-- PASS:0275 If 6 rows are inserted?

         UPDATE STAFF1
         SET EMPNUM = 'E9'
         WHERE EMPNUM = 'E3';
-- PASS:0275 If 1 row is updated?

         UPDATE WORKS1
         SET EMPNUM = 'E9', PNUM = 'P9'
         WHERE EMPNUM = 'E3';
-- PASS:0275 If 1 row is updated?

         UPDATE PROJ1
         SET PNUM = 'P9'
         WHERE PNUM = 'P2';
-- PASS:0275 If 1 row is updated?

    COMMIT WORK;

    SELECT COUNT(*)
        FROM STAFF1,WORKS1,PROJ1
        WHERE STAFF1.EMPNUM = 'E9' AND
              STAFF1.EMPNUM = WORKS1.EMPNUM AND
              PROJ1.PNUM = WORKS1.PNUM;
-- PASS:0275 If count = 1?

-- restore
     DELETE FROM STAFF1;
     DELETE FROM PROJ1;
     DELETE FROM WORKS1;
     COMMIT WORK;

-- END TEST >>> 0275 <<< END TEST

-- ****************************************************************


-- TEST:0276 View across schemas!

        DELETE FROM SULLIVAN1.AUTH_TABLE;

-- setup
        INSERT INTO SULLIVAN1.AUTH_TABLE
        VALUES (12,'A');
-- PASS:0276 If 1 row is inserted?

        SELECT EMPNUM,SECOND2 FROM SULLIVAN1.MUL_SCH
        ORDER BY EMPNUM;
-- PASS:0276 If 2 rows are selected?
-- PASS:0276 If first row EMPNUM = 'E1' and SECOND2 = 'A'?
-- PASS:0276 If second row EMPNUM = 'E4' and SECOND2 = 'A'?

-- restore
        ROLLBACK WORK;

-- END TEST >>> 0276 <<< END TEST

-- ****************************************************************


-- TEST:0279 IN is a 3-valued predicate, EXISTS is 2-valued!

-- setup
     UPDATE WORKS
     SET HOURS = NULL
     WHERE PNUM = 'P5' OR EMPNUM = 'E4';
-- PASS:0279 If 4 rows are updated?

     SELECT COUNT(*)
            FROM STAFF;
-- PASS:0279 If count = 5?

     SELECT COUNT(*)
            FROM STAFF
            WHERE 40 IN (SELECT HOURS FROM WORKS
                         WHERE STAFF.EMPNUM = WORKS.EMPNUM);
-- PASS:0279 If count = 2?

     SELECT COUNT(*)
            FROM STAFF
            WHERE 40 NOT IN (SELECT HOURS FROM WORKS
                             WHERE STAFF.EMPNUM = WORKS.EMPNUM);
-- PASS:0279 If count = 2?

     SELECT COUNT(*)
            FROM STAFF
                 WHERE EXISTS (SELECT * FROM WORKS
                               WHERE HOURS = 40 AND 
                                     STAFF.EMPNUM = WORKS.EMPNUM);
-- PASS:0279 If count = 2?

     SELECT COUNT(*)
            FROM STAFF
                 WHERE NOT EXISTS (SELECT * FROM WORKS
                                   WHERE HOURS = 40 AND 
                                         STAFF.EMPNUM = WORKS.EMPNUM);
-- PASS:0279 If count = 3?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0279 <<< END TEST

-- *************************************************////END-OF-MODULE
