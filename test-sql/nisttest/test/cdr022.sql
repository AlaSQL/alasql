-- MODULE CDR022

-- SQL Test Suite, V6.0, Interactive SQL, cdr022.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0380 (ref. acr. sch.) insert F.K and no corr. P.K!

  INSERT INTO WORKS_P
         VALUES ('E9','P2',20);
-- PASS:0380 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM WORKS_P
         WHERE EMPNUM = 'E9';
-- PASS:0380 If count = 0?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0380 <<< END TEST

-- *************************************************


-- TEST:0381 (ref. acr. sch.) update F.K to no P.K corr.!

  UPDATE WORKS_P
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E2';
-- PASS:0381 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*) FROM WORKS_P
        WHERE EMPNUM = 'E2';
-- PASS:0381 If count = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0381 <<< END TEST

-- *************************************************////END-OF-MODULE
