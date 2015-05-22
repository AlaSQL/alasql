-- MODULE SDL004

-- SQL Test Suite, V6.0, Interactive SQL, sdl004.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0140 Priv. violation: GRANT SELECT to Public, No INSERT!

     SELECT PNUM,PNAME,USER
          FROM HU.PROJ
          WHERE PNUM = 'P3';
-- PASS:0140 If PNAME = 'SDP' and USER = 'SULLIVAN'?

     INSERT INTO HU.PROJ
             VALUES('P7','PROGRAM','RISC',15000,'Gaithersburg');
-- PASS:0140 If ERROR, syntax error/access violation, 0 rows inserted?

     SELECT COUNT(*) FROM HU.PROJ;
-- PASS:0140 If count = 6?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0140 <<< END TEST
-- *************************************************////END-OF-MODULE
