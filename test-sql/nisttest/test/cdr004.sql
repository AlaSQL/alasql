-- MODULE CDR004

-- SQL Test Suite, V6.0, Interactive SQL, cdr004.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0309 CHECK combination predicates in <tab. cons.>, insert!

-- setup
  DELETE FROM STAFF11;

  INSERT INTO STAFF11
        VALUES('E1','Thomas',0,'Deale');
-- PASS:0309 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF11
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0309 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF11
        VALUES('E3','Susan',11,'Hawaii');

  SELECT COUNT(*) FROM STAFF11;
-- PASS:0309 If count = 1?


-- END TEST >>> 0309 <<< END TEST

-- *************************************************


-- TEST:0310 CHECK if X NOT IN, NOT X IN equivalent, insert!

-- setup
  DELETE FROM STAFF12;

  INSERT INTO STAFF12
        VALUES('E1','Thomas',0,'Deale');
-- PASS:0310 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF12
        VALUES('E2','Tom',22,'Newyork');
-- PASS:0310 If ERROR, check constraint, 0 rows inserted?

  INSERT INTO STAFF12
        VALUES('E3','Susan',11,'Hawaii');

  SELECT COUNT(*) FROM STAFF12;
-- PASS:0310 If count = 1?

-- END TEST >>> 0310 <<< END TEST

-- *************************************************


-- TEST:0311 CHECK NOT NULL in col.cons., insert, null explicit!

-- setup
  DELETE FROM STAFF15;

  INSERT INTO STAFF15
        VALUES('E1','Alice',52,'Deale');

  SELECT COUNT(*) FROM STAFF15;
-- PASS:0311 If count = 1?

  INSERT INTO STAFF15
        VALUES('E2',NULL,52,'Newyork');
-- PASS:0311 If ERROR, check constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF15;
-- PASS:0311 If count = 1?


-- END TEST >>> 0311 <<< END TEST

-- *************************************************


-- TEST:0312 CHECK NOT NULL in col.cons., insert, null implicit!

-- setup
  DELETE FROM STAFF15;

  INSERT INTO STAFF15
        VALUES('E1','Alice',52,'Deale');

  SELECT COUNT(*) FROM STAFF15;
-- PASS:0312 If count = 1?

  INSERT INTO STAFF15(EMPNUM,GRADE,CITY)
        VALUES('E2',52,'Newyork');
-- PASS:0312 If ERROR, check constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF15;
-- PASS:0312 If count = 1?


  COMMIT WORK;
 
-- END TEST >>> 0312 <<< END TEST

-- *************************************************////END-OF-MODULE
