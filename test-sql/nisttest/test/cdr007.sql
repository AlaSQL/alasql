-- MODULE CDR007

-- SQL Test Suite, V6.0, Interactive SQL, cdr007.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0319 CHECK <in predicate> in <tab. cons.>, update!

-- setup
  DELETE FROM STAFF10;

  INSERT INTO STAFF10
        VALUES('E3','Susan',11,'Hawaii');

  UPDATE STAFF10
        SET GRADE = 5
        WHERE EMPNUM = 'E3';
-- PASS:0319 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF10
        WHERE GRADE = 11;
-- PASS:0319 If count = 1?


-- END TEST >>> 0319 <<< END TEST

-- *************************************************


-- TEST:0320 CHECK combination pred. in <tab. cons.>, update!

-- setup
  DELETE FROM STAFF11;

  INSERT INTO STAFF11
        VALUES('E3','Susan',11,'Hawaii');

  UPDATE STAFF11
        SET GRADE = 5
        WHERE EMPNUM = 'E3';
-- PASS:0320 If ERROR, check constraint, 0 rows updated?

  UPDATE STAFF11
        SET EMPNAME = 'Tom'
        WHERE EMPNUM = 'E3';
-- PASS:0320 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF11
        WHERE EMPNAME = 'Susan' AND GRADE = 11;
-- PASS:0320 If count = 1?

-- END TEST >>> 0320 <<< END TEST

-- *************************************************


-- TEST:0321 CHECK if X NOT LIKE/IN, NOT X LIKE/IN same, update!

-- setup
  DELETE FROM STAFF12;

  INSERT INTO STAFF12
        VALUES('E3','Susan',11,'Hawaii');

  UPDATE STAFF12
        SET GRADE = 5
        WHERE EMPNUM = 'E3';
-- PASS:0321 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF12
        WHERE GRADE = 11;
-- PASS:0321 If count = 1?


-- END TEST >>> 0321 <<< END TEST

-- *************************************************


-- TEST:0322 CHECK <null predicate> in <col. cons>, update!

-- setup
  DELETE FROM STAFF15;

  INSERT INTO STAFF15
        VALUES('E1','Alice',52,'Deale');

  UPDATE STAFF15
        SET EMPNAME = NULL
        WHERE EMPNUM = 'E1';
-- PASS:0322 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF15
        WHERE EMPNAME = 'Alice';
-- PASS:0322 If count = 1?


  COMMIT WORK;
 
-- END TEST >>> 0322 <<< END TEST

-- *************************************************////END-OF-MODULE
