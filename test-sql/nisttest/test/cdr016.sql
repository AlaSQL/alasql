-- MODULE CDR016

-- SQL Test Suite, V6.0, Interactive SQL, cdr016.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0352 FIPS sz. (comb.keys=6), P.K unique, update!
-- FIPS sizing TEST

  SELECT COUNT(*) FROM SIZ1_P
        WHERE S1 = 'E1' AND S2 = 'TTS' AND S3 = 1;
-- PASS:0352 If count = 1?

  UPDATE SIZ1_P
        SET S2 = 'TTT'
        WHERE S1 = 'E1' AND S2 = 'TTS' AND S3 = 1;
-- PASS:0352 If ERROR, unique constraint, 0 rows updated?

  SELECT COUNT(*) FROM SIZ1_P
        WHERE S1 = 'E1' AND S2 = 'TTT' AND S3 = 1;
-- PASS:0352 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0352 <<< END TEST

-- *************************************************


-- TEST:0353 FIPS sz. (comb.keys=6), update F.K to no corr. P.K!
-- FIPS sizing TEST

  UPDATE SIZ1_F
        SET F1 = 'E9'
        WHERE F1 = 'E2';
-- PASS:0353 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*) FROM SIZ1_F
        WHERE F1 = 'E2';
-- PASS:0353 If count = 3?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0353 <<< END TEST

-- *************************************************


-- TEST:0354 FIPS sz. (comb.keys=6), update F.K to corr. P.K e!
-- FIPS sizing TEST

  UPDATE SIZ1_F
        SET F1 = 'E1'
        WHERE F1 = 'E2' AND F6 = 'RRR';

  SELECT COUNT(*) FROM SIZ1_F
        WHERE F1 = 'E1';
-- PASS:0354 If count = 4?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0354 <<< END TEST

-- *************************************************////END-OF-MODULE
