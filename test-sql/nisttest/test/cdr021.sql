-- MODULE CDR021

-- SQL Test Suite, V6.0, Interactive SQL, cdr021.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0378 (ref. acr. sch.) delete P.K and corr. F.K e.!

  DELETE FROM STAFF_P
        WHERE EMPNUM='E1';
-- PASS:0378 If RI ERROR, children exist, 0 rows deleted?

  SELECT EMPNUM FROM STAFF_P
        WHERE EMPNUM = 'E1';
-- PASS:0378 If 1 row selected and EMPNUM = E1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0378 <<< END TEST

-- *************************************************


-- TEST:0379 (ref. acr. sch.) update P.K and corr. F.K e.!

  UPDATE STAFF_P
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E2';
-- PASS:0379 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM STAFF_P
        WHERE EMPNUM = 'E2';
-- PASS:0379 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0379 <<< END TEST

-- *************************************************////END-OF-MODULE
