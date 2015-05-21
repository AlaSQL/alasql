-- MODULE CDR011

-- SQL Test Suite, V6.0, Interactive SQL, cdr011.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0335 (self ref.), insert a F.K but no corr. P.K!

  INSERT INTO STAFF_C
         VALUES('E8','Alice',12,'Deale','E9');
-- PASS:0335 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF_C
        WHERE MGR = 'E9';
-- PASS:0335 If count = 0?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0335 <<< END TEST

-- *************************************************


-- TEST:0336 (self ref.), update P.K, but corr. F.K e.!

  UPDATE STAFF_C
        SET EMPNUM='E9'
        WHERE EMPNUM='E1';
-- PASS:0336 If RI ERROR, children exist, 0 rows updated?

  SELECT EMPNUM FROM STAFF_C
        WHERE EMPNUM = 'E1';
-- PASS:0336 If 1 row selected and EMPNUM = E1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0336 <<< END TEST

-- *************************************************


-- TEST:0337 (self ref.), update P.K, check P.K unique via var.!

  UPDATE STAFF_C
        SET EMPNUM = 'E5'
        WHERE EMPNUM = 'E6';
-- PASS:0337 If ERROR, unique constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF_C
        WHERE EMPNUM ='E6';
-- PASS:0337 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0337 <<< END TEST

-- *************************************************


-- TEST:0338 (self ref.), update F.K and no corr. P.K!

  UPDATE STAFF_C
        SET MGR= 'E9'
        WHERE MGR = 'E1';
-- PASS:0338 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*) FROM STAFF_C
        WHERE MGR = 'E1';
-- PASS:0338 If count = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0338 <<< END TEST

-- *************************************************


-- TEST:0339 (self ref.), update F.K and corr. P.K exist!

  UPDATE STAFF_C
        SET MGR = 'E5'
        WHERE MGR = 'E7';

  SELECT COUNT(*) FROM STAFF_C
        WHERE MGR = 'E5';
-- PASS:0339 If count = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0339 <<< END TEST

-- *************************************************////END-OF-MODULE
