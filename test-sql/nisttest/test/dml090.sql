-- MODULE DML090  

-- SQL Test Suite, V6.0, Interactive SQL, dml090.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU                

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0512 <value expression> for IN predicate!

   SELECT MIN(PNAME) 
         FROM PROJ, WORKS, STAFF
         WHERE PROJ.PNUM = WORKS.PNUM
               AND WORKS.EMPNUM = STAFF.EMPNUM
               AND BUDGET - GRADE * HOURS * 100 IN
                   (-4400, -1000, 4000);
-- PASS:0512 If PNAME = 'CALM'?

   SELECT CITY, COUNT(*)
         FROM PROJ
         GROUP BY CITY
         HAVING (MAX(BUDGET) - MIN(BUDGET)) / 2
                IN (2, 20000, 10000)
         ORDER BY CITY DESC;
-- PASS:0512 If in first row: CITY = 'Vienna' AND count = 2?
-- PASS:0512 AND in second row: CITY = 'Deale' AND count = 3?
     
-- restore
   ROLLBACK WORK;

-- END TEST >>> 0512 <<< END TEST
-- *********************************************;

-- TEST:0513 NUMERIC(4) implies CHECK BETWEEN -9999 AND 9999!

-- setup
   DELETE FROM TEMP_OBSERV;

   INSERT INTO TEMP_OBSERV (YEAR_OBSERV)
         VALUES (9999);
-- PASS:0513 If 1 row is inserted?

   INSERT INTO TEMP_OBSERV (YEAR_OBSERV) 
         VALUES (10000);
-- PASS:0513 If ERROR, constraint violation, 0 rows inserted?

   UPDATE TEMP_OBSERV
          SET YEAR_OBSERV = -10000
          WHERE YEAR_OBSERV = 9999;
-- PASS:0513 If ERROR, constraint violation, 0 rows updated?

   INSERT INTO TEMP_OBSERV (YEAR_OBSERV, MAX_TEMP)
          VALUES (-9999, 123.4517);
-- PASS:0513 If 1 row is inserted?

   SELECT COUNT(*) FROM TEMP_OBSERV
         WHERE MAX_TEMP = 123.45
         AND MAX_TEMP NOT BETWEEN 123.4516 AND 123.4518;
-- PASS:0513 If count = 1?

   INSERT INTO TEMP_OBSERV (YEAR_OBSERV, MAX_TEMP)
          VALUES (-9999, 1234.51);
-- PASS:0513 If ERROR, constraint violation, 0 rows inserted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0513 <<< END TEST
-- *********************************************;

-- TEST:0523 <value expression> for BETWEEN predicate!

   SELECT COUNT(*) 
         FROM PROJ
         WHERE 24 * 1000 BETWEEN BUDGET - 5000 AND 50000 / 1.7;
-- PASS:0523 If count = 3?

   SELECT PNAME
         FROM PROJ
         WHERE 'Tampa' NOT BETWEEN CITY AND 'Vienna'
                           AND PNUM > 'P2';
-- PASS:0523 If PNAME = 'IRM'?

SELECT CITY, COUNT(*)
      FROM PROJ
      GROUP BY CITY
      HAVING 50000 + 2 BETWEEN 33000 AND SUM(BUDGET) - 20;
-- PASS:0523 If CITY = 'Deale' and count = 3?
 
-- restore
   ROLLBACK WORK;

-- END TEST >>> 0523 <<< END TEST
-- *********************************************;

-- TEST:0564 Outer ref. directly contained in HAVING clause!

   
     SELECT EMPNUM, GRADE*1000
           FROM HU.STAFF WHERE GRADE * 1000 > ANY
              (SELECT SUM(BUDGET) FROM HU.PROJ
               GROUP BY CITY, PTYPE 
               HAVING HU.PROJ.CITY = HU.STAFF.CITY);
-- PASS:0564 If EMPNUM = E3 and GRADE * 1000 = 13000?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0564 <<< END TEST
-- *************************************************////END-OF-MODULE;

