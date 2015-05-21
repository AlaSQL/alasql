-- MODULE CDR003

-- SQL Test Suite, V6.0, Interactive SQL, cdr003.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0306 CHECK X IS NOT NULL, NOT X IS NULL are equivalent!

-- setup
  DELETE FROM STAFF13;

  INSERT INTO STAFF13
        VALUES('E1','Alice',36,'Deale');

  SELECT COUNT(*) FROM STAFF13;
-- PASS:0306 If count = 1?

  INSERT INTO STAFF13
        VALUES('E2',NULL,36,'Newyork');
-- PASS:0306 If ERROR, check constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF13;
-- PASS:0306 If count = 1?

-- END TEST >>> 0306 <<< END TEST

-- *************************************************


-- TEST:0307 CHECK <like predicate> in <tab. cons>, insert!

-- setup
  DELETE FROM STAFF9;

  INSERT INTO STAFF9
        VALUES('E1','Thomas',0,'Deale');
-- PASS:0307 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF9
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0307 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF9
        VALUES('E3','Susan',11,'Hawaii');

  SELECT COUNT(*) FROM STAFF9;
-- PASS:0307 If count = 1?


-- END TEST >>> 0307 <<< END TEST

-- *************************************************


-- TEST:0308 CHECK <in predicate> in <tab. cons.>, insert!

-- setup
  DELETE FROM STAFF10;

  INSERT INTO STAFF10
        VALUES('E1','Thomas',5,'Deale');
-- PASS:0308 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF10
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0308 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF10
        VALUES('E3','Susan',11,'Hawaii');

  SELECT COUNT(*) FROM STAFF10;
-- PASS:0308 If count = 1?

-- END TEST >>> 0308 <<< END TEST

-- *************************************************

-- NO_TEST:0373 insert with embeded var. & indic. var. CHECK clause!

-- Testing Embedded Variable & Indicator Variable

-- *************************************************


-- TEST:0374 computation in update, CHECK clause!

-- setup
  DELETE FROM STAFF5;

  INSERT INTO STAFF5
        VALUES('R9','Alice',15,'Deale');

  SELECT COUNT(*) FROM STAFF5;
-- PASS:0374 If count = 1?

  UPDATE STAFF5
         SET GRADE = 10 * 10 / 5 + 1
         WHERE EMPNUM = 'R9';
-- PASS:0374 If ERROR, check constraint, 0 rows updated?

  SELECT COUNT(*) FROM STAFF5
      WHERE GRADE = 15;
-- PASS:0374 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0374 <<< END TEST

-- *************************************************////END-OF-MODULE
