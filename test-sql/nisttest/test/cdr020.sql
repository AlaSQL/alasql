-- MODULE CDR020

-- SQL Test Suite, V6.0, Interactive SQL, cdr020.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0369 update P. K, set F1=F1+1, interim violation!

  INSERT INTO SIZ3_P3
         VALUES (0,'CC');

  UPDATE SIZ3_P3
         SET F1 = F1 + 1;

  SELECT MAX(F1),MIN(F1) FROM SIZ3_P3;
-- PASS:0369 If MAX(F1) = 5 and MIN(F1) = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0369 <<< END TEST

-- *************************************************


-- TEST:0370 update F. K, set F1=F1+1, interim violation!

  UPDATE SIZ2_F3
         SET F1 = F1 + 1;

  SELECT MAX(F1),MIN(F1) FROM SIZ2_F3;
-- PASS:0370 If MAX(F1) = 4 and MIN(F1) = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0370 <<< END TEST

-- *************************************************


-- TEST:0371 update self-ref table, interim violation!

  INSERT INTO MID1
         VALUES(1,1);

  INSERT INTO MID1
         VALUES(2,1);

  INSERT INTO MID1
         VALUES(3,2);

  INSERT INTO MID1
         VALUES(4,3);

  INSERT INTO MID1
         VALUES(5,1);

  UPDATE MID1
         SET P_KEY = P_KEY + 1,
             F_KEY = F_KEY + 1;

  SELECT MAX(F_KEY),MIN(F_KEY),MAX(P_KEY),MIN(P_KEY)
         FROM MID1;
-- PASS:0371 If MAX(F_KEY) = 4 and MIN(F_KEY) = 2 and?
-- PASS:0371 If MAX(P_KEY) = 6 and MIN(P_KEY) = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0371 <<< END TEST

-- *************************************************


-- TEST:0372 delete self-ref table, interim violation!

  DELETE FROM STAFF_C
         WHERE EMPNUM = 'E2' OR MGR = 'E2';

  SELECT COUNT(*) FROM STAFF_C;
-- PASS:0372 If count = 4?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0372 <<< END TEST

-- *************************************************////END-OF-MODULE
