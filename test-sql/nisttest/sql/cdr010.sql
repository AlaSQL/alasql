-- MODULE CDR010

-- SQL Test Suite, V6.0, Interactive SQL, cdr010.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0332 (self ref.), P.K exist, insert a F.K!

  INSERT INTO STAFF_C
         VALUES('E8','Alice',12,'Deale','E1');

  SELECT COUNT(*) FROM STAFF_C
        WHERE MGR = 'E1';
-- PASS:0332 If count = 3?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0332 <<< END TEST

-- *************************************************


-- TEST:0333 (self ref.), delete P.K but F.K exist.!

  DELETE FROM STAFF_C
        WHERE EMPNUM='E1';
-- PASS:0333 If RI ERROR, children exist, 0 rows deleted?

  SELECT EMPNUM FROM STAFF_C
        WHERE EMPNUM = 'E1';
-- PASS:0333 If 1 row selected and EMPNUM = E1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0333 <<< END TEST

-- *************************************************


-- TEST:0334 (self ref.), update P.K, no corr. F.K!

-- setup
  UPDATE STAFF_C
         SET MGR = NULL;

  DELETE FROM STAFF_C;

  INSERT INTO STAFF_C
         VALUES('E1','Alice',12,'Deale',NULL);

  UPDATE STAFF_C
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E1';

  SELECT EMPNUM FROM STAFF_C
        WHERE EMPNUM = 'E9';
-- PASS:0334 If 1 row selected and EMPNUM = E9?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0334 <<< END TEST

-- *************************************************////END-OF-MODULE
