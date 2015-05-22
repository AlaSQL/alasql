-- MODULE CDR002

-- SQL Test Suite, V6.0, Interactive SQL, cdr002.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0302 CHECK <comp. predicate> in <tab. cons.>, insert!

-- setup
  DELETE FROM STAFF5;

  INSERT INTO STAFF5
        VALUES('E1','Alice',0,'Deale');
-- PASS:0302 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF5
        VALUES('E3','Susan',11,'Hawaii');

  INSERT INTO STAFF5
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0302 If ERROR, check constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF5;
-- PASS:0302 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0302 <<< END TEST

-- *************************************************


-- TEST:0303 CHECK <comp. predicate> in <col. cons.>, insert!

-- setup
  DELETE FROM STAFF6;

  INSERT INTO STAFF6
        VALUES('E1','Alice',0,'Deale');
-- PASS:0303 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF6
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0303 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF6
        VALUES('E3','Susan',11,'Hawaii');

  SELECT GRADE FROM STAFF6
        WHERE GRADE > 10;
-- PASS:0303 If 1 row selected and GRADE = 11?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0303 <<< END TEST

-- *************************************************


-- TEST:0304 CHECK <between predicate> in <tab. cons.>, insert!

-- setup
  DELETE FROM STAFF7;

  INSERT INTO STAFF7
        VALUES('E1','Alice',0,'Deale');
-- PASS:0304 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF7
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0304 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF7
        VALUES('E3','Susan',11,'Hawaii');

  SELECT COUNT(*)
        FROM STAFF7;
-- PASS:0304 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0304 <<< END TEST

-- *************************************************


-- TEST:0305 CHECK <null predicate> in <tab. cons.>, insert!

-- setup
  DELETE FROM STAFF8;

  INSERT INTO STAFF8
        VALUES('E1','Alice',34,'Deale');

  SELECT COUNT(*) FROM STAFF8;
-- PASS:0305 If count = 1?

  INSERT INTO STAFF8
        VALUES('E2',NULL,34,'Newyork');
-- PASS:0305 If ERROR, check constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF8;
-- PASS:0305 If count = 1?


  COMMIT WORK;
 
-- END TEST >>> 0305 <<< END TEST

-- *************************************************////END-OF-MODULE
