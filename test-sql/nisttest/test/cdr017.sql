-- MODULE CDR017

-- SQL Test Suite, V6.0, Interactive SQL, cdr017.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0355 FIPS sz. (1 pr.,6 son), insert F.K & no corr. P.K!
-- FIPS sizing TEST

  INSERT INTO SIZ2_F1
        VALUES ('  E','AAA');
-- PASS:0355 If RI ERROR, parent missing, 0 rows inserted?

  INSERT INTO SIZ2_F10
        VALUES (9,'AAB');
-- PASS:0355 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM SIZ2_F10;
-- PASS:0355 If count = 4?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0355 <<< END TEST

-- *************************************************


-- TEST:0356 FIPS sz. (1 pr.,6 son), delete P.K & corr. F.K e!
-- FIPS sizing TEST

  DELETE FROM SIZ2_P
        WHERE P1 = '  A';
-- PASS:0356 If RI ERROR, children exist, 0 rows deleted?

  SELECT P1 FROM SIZ2_P
        WHERE P1 = '  A';
-- PASS:0356 If 1 row selected and P1 = '  A'?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0356 <<< END TEST

-- *************************************************


-- TEST:0357 FIPS sz. (1 pr.,6 son), update P.K but corr. F.K e!
-- FIPS sizing TEST

  UPDATE SIZ2_P
        SET P1 = '  Z'
        WHERE P1 = '  A';
-- PASS:0357 If RI ERROR, children exist, 0 rows updated?

  UPDATE SIZ2_P
        SET P10 = 100
        WHERE P10 = 8;
-- PASS:0357 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM SIZ2_P
        WHERE P1 = '  A';
-- PASS:0357 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0357 <<< END TEST

-- *************************************************


-- TEST:0358 FIPS sz. (1 pr.,6 son), check key unique, update!
-- FIPS sizing TEST

  SELECT COUNT(*) FROM SIZ2_P
        WHERE P1 = '  A';
-- PASS:0358 If count = 1?

  UPDATE SIZ2_P
        SET P1 = 'B  '
        WHERE P1 = '  A';
-- PASS:0358 If ERROR, unique constraint, 0 rows updated?

  SELECT COUNT(*) FROM SIZ2_P
        WHERE P1 = '  A';
-- PASS:0358 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0358 <<< END TEST

-- *************************************************


-- TEST:0359 FIPS sz. (1 pr.,6 son), update F.K to no corr. P.K!
-- FIPS sizing TEST

  UPDATE SIZ2_F1
        SET F1 = '  Z'
        WHERE F1 = '  A';
-- PASS:0359 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*) FROM SIZ2_F1
        WHERE F1 = '  A';
-- PASS:0359 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0359 <<< END TEST

-- *************************************************


-- TEST:0375 ref. integrity with computation!

  UPDATE SIZ3_P5
         SET F1 = 10 * 10 / 20 - 10 + 16
         WHERE  F1 = 5;
-- PASS:0375 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM SIZ3_P5
        WHERE F1 = 11;
-- PASS:0375 If count = 0?

  DELETE FROM SIZ3_F
         WHERE P5 = 5;

  UPDATE SIZ3_P5
         SET F1 = 10 * 10 / 20 - 10 + 16
         WHERE  F1 = 5;

  SELECT COUNT(*) FROM SIZ3_P5
        WHERE F1 = 11;
-- PASS:0375 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0375 <<< END TEST

-- *************************************************


-- TEST:0376 ref. integrity with join!

  SELECT COUNT(*)
        FROM SIZ3_F,SIZ3_P1,SIZ3_P2,SIZ3_P3,SIZ3_P4,
             SIZ3_P5,SIZ3_P6
        WHERE P1 = SIZ3_P1.F1
              AND P2 = SIZ3_P2.F1
              AND P3 = SIZ3_P3.F1
              AND P4 = SIZ3_P4.F1
              AND P5 = SIZ3_P5.F1
              AND P6 = SIZ3_P6.F1
              AND SIZ3_P3.F1 BETWEEN 1 AND 2;
-- PASS:0376 If count = 4?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0376 <<< END TEST

-- *************************************************////END-OF-MODULE
