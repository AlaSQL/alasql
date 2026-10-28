-- MODULE CDR013

-- SQL Test Suite, V6.0, Interactive SQL, cdr013.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0343 (ref. each other), update P.K and corr. F.K e!

  UPDATE STAFF_M
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E2';
-- PASS:0343 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM STAFF_M
        WHERE EMPNUM = 'E2';
-- PASS:0343 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0343 <<< END TEST

-- *************************************************


-- TEST:0344 (ref. each other), update F.K to no corr. P.K!

  UPDATE PROJ_M
        SET MGR = 'E9'
        WHERE MGR = 'E3';
-- PASS:0344 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*) FROM PROJ_M
        WHERE MGR = 'E3';
-- PASS:0344 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0344 <<< END TEST

-- *************************************************


-- TEST:0345 (ref. each other), update F.K to corr. P.K e!

  UPDATE PROJ_M
        SET MGR = 'E5'
        WHERE MGR = 'E3';

  SELECT COUNT(*) FROM PROJ_M
        WHERE MGR = 'E5';
-- PASS:0345 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0345 <<< END TEST

-- *************************************************


-- TEST:0346 (ref. each other), insert F.K and no corr. P.K!

  INSERT INTO STAFF_M
         VALUES('E8','Alice',12,'Deale','P9');
-- PASS:0346 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF_M
        WHERE PRI_WK = 'P9';
-- PASS:0346 If count = 0?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0346 <<< END TEST

-- *************************************************////END-OF-MODULE
