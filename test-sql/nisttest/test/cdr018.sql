-- MODULE CDR018

-- SQL Test Suite, V6.0, Interactive SQL, cdr018.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0360 FIPS sz. (6 pr.,1 son), insert F.K, without P.K!
-- FIPS sizing TEST

  INSERT INTO SIZ3_F
  VALUES ('  F','  D',3,'  E',4,'  F','  G',5,6,7,'TTT');
-- PASS:0360 If RI ERROR, parent missing, 0 rows inserted?

  INSERT INTO SIZ3_F
  VALUES ('  D','  E',4,'  F',5,'  G','  H',6,7,100,'TTT');
-- PASS:0360 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM SIZ3_F;
-- PASS:0360 If count = 8?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0360 <<< END TEST

-- *************************************************


-- TEST:0361 FIPS sz. (6 pr.,1 son), delete P.K, but corr.F.K e!
-- FIPS sizing TEST

  DELETE FROM SIZ3_P1
        WHERE F1 = '  A';
-- PASS:0361 If RI ERROR, children exist, 0 rows deleted?

  SELECT F1 FROM SIZ3_P1
        WHERE F1 = '  A';
-- PASS:0361 If 1 row selected and F1 = '  A'?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0361 <<< END TEST

-- *************************************************


-- TEST:0362 FIPS sz. (6 pr.,1 son), update P.K, but corr.F.K e!
-- FIPS sizing TEST

  UPDATE SIZ3_P1
        SET F1 = '  Z'
        WHERE F1 = '  A';
-- PASS:0362 If RI ERROR, children exist, 0 rows updated?

  UPDATE SIZ3_P10
        SET F1 = 100
        WHERE F1 = 8;
-- PASS:0362 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM SIZ3_P1
        WHERE F1 = '  A';
-- PASS:0362 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0362 <<< END TEST

-- *************************************************


-- TEST:0363 FIPS sz. (6 pr.,1 son), check key unique ,update!
-- FIPS sizing TEST

  SELECT COUNT(*) FROM SIZ3_P1
        WHERE F1 = '  A';
-- PASS:0363 If count = 1?

  UPDATE SIZ3_P1
        SET F1 = '  B'
        WHERE F1 = '  A';
-- PASS:0363 If ERROR, unique constraint, 0 rows updated?

  SELECT COUNT(*) FROM SIZ3_P1
        WHERE F1 = '  A';
-- PASS:0363 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0363 <<< END TEST

-- *************************************************


-- TEST:0364 FIPS sz. (6 pr.,1 son), update F.K to no corr. P.K!
-- FIPS sizing TEST

  UPDATE SIZ3_F
        SET P1 = '  Z'
        WHERE P1 = '  A';
-- PASS:0364 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*) FROM SIZ3_F
        WHERE P1 = '  A';
-- PASS:0364 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0364 <<< END TEST

-- *************************************************////END-OF-MODULE
