-- MODULE SDL013

-- SQL Test Suite, V6.0, Interactive SQL, sdl013.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0149 CREATE Table with NOT NULL Unique!

     INSERT INTO PROJ1(PNUM,PNAME,BUDGET)
            VALUES('P10','IRM',10000);
-- PASS:0149 If 1 row is inserted ?

      SELECT COUNT(*)
           FROM PROJ1;
-- PASS:0149 If count = 1 ?

      INSERT INTO PROJ1(PNUM,PNAME,PTYPE)
             VALUES('P10','SDP','Test');
-- PASS:0149 If ERROR, unique constraint, 0 rows inserted?

      SELECT COUNT(*) 
           FROM PROJ1;
-- PASS:0149 If count = 1?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0149 <<< END TEST

-- *************************************************////END-OF-MODULE
