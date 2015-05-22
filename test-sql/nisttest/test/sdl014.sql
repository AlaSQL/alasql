-- MODULE SDL014

-- SQL Test Suite, V6.0, Interactive SQL, sdl014.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0150 CREATE Table with Unique(...), INSERT Values!

     INSERT INTO WORKS1
            VALUES('E1','P2',20);
-- PASS:0150 If 1 row is inserted?

     INSERT INTO WORKS1
            VALUES('E1','P3',40);
-- PASS:0150 If 1 row is inserted?

     SELECT COUNT(*) 
          FROM  WORKS1;
-- PASS:0150 If count = 2?

     INSERT INTO WORKS1
            VALUES('E1','P2',80);
-- PASS:0150 If ERROR, unique constraint, 0 rows inserted?
-- NOTE:0150 Duplicates for (EMPNUM, PNUM) are not allows.

      SELECT COUNT(*)
                   FROM   WORKS1;
-- PASS:0150 If count = 2?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0150 <<< END TEST
-- *************************************************////END-OF-MODULE
