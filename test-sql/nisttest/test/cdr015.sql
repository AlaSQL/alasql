-- MODULE CDR015

-- SQL Test Suite, V6.0, Interactive SQL, cdr015.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0349 FIPS sz. (comb.keys=6), delete P.K & corr. F.K e!
-- FIPS sizing TEST

  DELETE FROM SIZ1_P
        WHERE S1 = 'E1' OR S6 = 'RRR';
-- PASS:0349 If RI ERROR, children exist, 0 rows deleted?

  SELECT S1 FROM SIZ1_P
        WHERE S1 = 'E1' AND S2 = 'TTT';
-- PASS:0349 If 1 row selected and S1 = E1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0349 <<< END TEST

-- *************************************************


-- TEST:0350 FIPS sz. (comb.keys=6), update P.K & no corr. F.K!
-- FIPS sizing TEST

  DELETE FROM SIZ1_F
        WHERE F1 = 'E1';

  UPDATE SIZ1_P
        SET S1 = 'E9'
        WHERE S1 = 'E1' AND S2 = 'TTT';

  SELECT S1 FROM SIZ1_P
        WHERE S1 = 'E9';
-- PASS:0350 If 1 row selected and S1 = E9?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0350 <<< END TEST

-- *************************************************


-- TEST:0351 FIPS sz. (comb.keys=6), update P.K & corr. P.K e!
-- FIPS sizing TEST

  UPDATE SIZ1_P
        SET S1 = 'E9'
        WHERE S1 = 'E1' AND S2 = 'TTS' AND S3 =1;
-- PASS:0351 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM SIZ1_P
        WHERE S1 = 'E1' AND S2 = 'TTS' AND S3 =1;
-- PASS:0351 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0351 <<< END TEST

-- *************************************************////END-OF-MODULE
