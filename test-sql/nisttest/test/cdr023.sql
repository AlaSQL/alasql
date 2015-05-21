-- MODULE CDR023

-- SQL Test Suite, V6.0, Interactive SQL, cdr023.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0382 (ref. acr. sch.) with GRANT OPTION, insert!

  INSERT INTO ACR_SCH_F
         VALUES(1,'DOG');

  SELECT COUNT(*) FROM ACR_SCH_F;

  INSERT INTO ACR_SCH_F
         VALUES(2,'PIG');
-- PASS:0382 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM ACR_SCH_F;
-- PASS:0382 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0382 <<< END TEST

-- *************************************************


-- TEST:0383 Priv.violation: GRANT without GRANT OPTION!

-- NOTE:0383 Either TAB5 does not exist  -OR-
-- NOTE:0383 TAB5 exists but allows orphans (F.K without P.K)

  INSERT INTO TAB5
         VALUES('E1','DOG');
-- PASS:0383 If ERROR, No such table -OR-  1 row inserted?

  INSERT INTO TAB5
         VALUES('E9','PIG');
-- PASS:0383 If ERROR, No such table -OR-  1 row inserted?

  SELECT COUNT(*) FROM TAB5;
-- PASS:0383 If ERROR, No such table -OR- count = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0383 <<< END TEST

-- *************************************************


-- TEST:0384 Priv.violation: SELECT, but not REFERENCES!

-- NOTE:0384 Either TAB6 does not exist -OR-
-- NOTE:0384 TAB6 exists but allows orphans (F.K without P.K)

  INSERT INTO TAB6
         VALUES(1,'DOG');
-- PASS:0384 If ERROR, No such table -OR- 1 row inserted?

  INSERT INTO TAB6
         VALUES(2,'PIG');
-- PASS:0384 If ERROR, No such table -OR- 1 row inserted?

  SELECT COUNT(*) FROM TAB6;
-- PASS:0384 If ERROR, No such table -OR- count = 2?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0384 <<< END TEST

-- *************************************************////END-OF-MODULE
