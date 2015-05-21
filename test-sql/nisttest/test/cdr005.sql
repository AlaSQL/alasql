-- MODULE CDR005

-- SQL Test Suite, V6.0, Interactive SQL, cdr005.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0313 CHECK <comp. predicate> in <tab. cons.>, update!

-- setup
  DELETE FROM STAFF5;

  INSERT INTO STAFF5
        VALUES('E2','Tom',14,'Newyork');

  UPDATE STAFF5
        SET GRADE = 20;
-- PASS:0313 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF5
        WHERE GRADE = 14;
-- PASS:0313 If count = 1?


-- END TEST >>> 0313 <<< END TEST

-- *************************************************


-- TEST:0314 CHECK <comp. predicate> in <col. cons.>, update!

-- setup
  DELETE FROM STAFF6;

  INSERT INTO STAFF6
        VALUES('E2','Tom',14,'Newyork');

  UPDATE STAFF6
        SET GRADE = 20;
-- PASS:0314 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF6
        WHERE GRADE = 14;
-- PASS:0314 If count = 1?

-- END TEST >>> 0314 <<< END TEST

-- *************************************************


-- TEST:0315 CHECK <between predicate> in <tab. cons.>, update!

-- setup
  DELETE FROM STAFF7;

  INSERT INTO STAFF7
        VALUES('E2','Tom',14,'Newyork');

  UPDATE STAFF7
        SET GRADE = 21;
-- PASS:0315 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF7
        WHERE GRADE = 14;
-- PASS:0315 If count = 1?


  COMMIT WORK;
 
-- END TEST >>> 0315 <<< END TEST

-- *************************************************////END-OF-MODULE
