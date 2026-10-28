-- MODULE CDR012

-- SQL Test Suite, V6.0, Interactive SQL, cdr012.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0340 (ref. each other), insert F.K and corr. P.K e!

  INSERT INTO PROJ_M
   VALUES ('P7','IAC','Head',30000,'Alexdra','E5');

  INSERT INTO PROJ_M
   VALUES ('P8','IBM','Head',30000,'Alexdra','E5');

  SELECT COUNT(*) FROM PROJ_M
        WHERE MGR = 'E5';
-- PASS:0340 If count = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0340 <<< END TEST

-- *************************************************


-- TEST:0341 (ref. each other), delete P.K but corr. F.K e!

  DELETE FROM STAFF_M
        WHERE EMPNUM='E2';
-- PASS:0341 If RI ERROR, children exist, 0 rows deleted?

  SELECT EMPNUM FROM STAFF_M
        WHERE EMPNUM = 'E2';
-- PASS:0341 If 1 row selected and EMPNUM = E2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0341 <<< END TEST

-- *************************************************


-- TEST:0342 (ref. each other), update P.K and no corr. F.K!

  UPDATE STAFF_M
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E1';

  SELECT EMPNUM FROM STAFF_M
        WHERE EMPNUM = 'E9';
-- PASS:0342 If 1 row selected and EMPNUM = E9?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0342 <<< END TEST

-- *************************************************////END-OF-MODULE
