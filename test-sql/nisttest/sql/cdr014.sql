-- MODULE CDR014

-- SQL Test Suite, V6.0, Interactive SQL, cdr014.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0347 FIPS sz. (comb.keys=6), P.K unique,insert!
-- FIPS sizing TEST

  INSERT INTO SIZ1_P
        VALUES('E1','TTT',1,'SSS',10,'RRR','HHH','ZZZ',6);
-- PASS:0347 If ERROR, unique constraint, 0 rows inserted?

  SELECT COUNT(*) FROM SIZ1_P
        WHERE S1 = 'E1';
-- PASS:0347 If count = 3?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0347 <<< END TEST

-- *************************************************


-- TEST:0348 FIPS sz. (comb.keys=6), insert F.K & no corr. P.K!
-- FIPS sizing TEST

  INSERT INTO SIZ1_F
        VALUES('E1','TTT',1,'SSS',19,'RRS','TTT',5,6);
-- PASS:0348 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM SIZ1_F
        WHERE F6 = 'RRS';
-- PASS:0348 If count = 0?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0348 <<< END TEST

-- *************************************************////END-OF-MODULE
