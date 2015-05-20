-- MODULE CDR009

-- SQL Test Suite, V6.0, Interactive SQL, cdr009.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0327 (2 pr.,1 son),check PRIMARY KEY unique via insert!

-- setup
  DELETE FROM WORKS3;

  DELETE FROM STAFF3;

  INSERT INTO STAFF3
        VALUES('E1','Alice',12,'Deale');

  SELECT COUNT(*) FROM STAFF3;
-- PASS:0327 If count = 1?

  INSERT INTO STAFF3
        VALUES('E1','Tom',12,'Newyork');
-- PASS:0327 If ERROR, unique constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF3;
-- PASS:0327 If count = 1?

-- END TEST >>> 0327 <<< END TEST

-- *************************************************


-- TEST:0328 (2 pr.,1 son),F.K exist,modify P.K!

-- setup
  DELETE  FROM WORKS3;

  DELETE  FROM PROJ3;

  DELETE  FROM STAFF3;

  INSERT INTO STAFF3
        SELECT * FROM STAFF;

  INSERT INTO PROJ3
        SELECT * FROM PROJ;

  INSERT INTO WORKS3
        SELECT * FROM WORKS;

  UPDATE STAFF3
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E2';
-- PASS:0328 If RI ERROR, children exist, 0 rows updated?

  SELECT COUNT(*) FROM STAFF3
        WHERE EMPNUM = 'E2';
-- PASS:0328 If count = 1?


-- END TEST >>> 0328 <<< END TEST

-- *************************************************


-- TEST:0329 (2 pr.,1 son),check PRIMARY KEY unique via modify!

-- setup
  DELETE FROM WORKS3;

  DELETE FROM STAFF3;

  INSERT INTO STAFF3
        VALUES('E1','Alice',45,'Deale');

  INSERT INTO STAFF3
        VALUES('E2','Tom',45,'Deale');

  SELECT COUNT(*) FROM STAFF3;
-- PASS:0329 If count = 2?

  UPDATE STAFF3
        SET EMPNUM = 'E1'
        WHERE EMPNUM = 'E2';
-- PASS:0329 If ERROR, unique constraint, 0 rows updated?

  SELECT COUNT(*)
        FROM STAFF3
        WHERE EMPNUM = 'E2';
-- PASS:0329 If count = 1?


-- END TEST >>> 0329 <<< END TEST

-- *************************************************


-- TEST:0330 (2 pr.,1 son),modify F.K to no P.K corr.!

-- setup
  DELETE  FROM WORKS3;

  DELETE  FROM PROJ3;

  DELETE  FROM STAFF3;

  INSERT INTO STAFF3
        SELECT * FROM STAFF;

  INSERT INTO PROJ3
        SELECT * FROM PROJ;

  INSERT INTO WORKS3
        SELECT * FROM WORKS;

  UPDATE WORKS3
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E2';
-- PASS:0330 If RI ERROR, parent missing, 0 rows updated?

  SELECT COUNT(*)
        FROM WORKS3
        WHERE EMPNUM = 'E2';
-- PASS:0330 If count = 2?


-- END TEST >>> 0330 <<< END TEST

-- *************************************************


-- TEST:0331 (2 pr.,1 son),modify F.K to P.K corr. value!

-- setup
  DELETE  FROM WORKS3;

  DELETE  FROM STAFF3;

  DELETE  FROM PROJ3;

  INSERT INTO STAFF3
        SELECT * FROM STAFF;

  INSERT INTO PROJ3
        SELECT * FROM PROJ;

  INSERT INTO WORKS3
        SELECT * FROM WORKS;

  SELECT COUNT(*) FROM WORKS
        WHERE EMPNUM = 'E1';
-- PASS:0331 If count = 6?

  UPDATE WORKS3
        SET EMPNUM = 'E2'
        WHERE EMPNUM = 'E1';

  SELECT COUNT(*) FROM WORKS3
        WHERE EMPNUM = 'E1';
-- PASS:0331 If count = 0?


  COMMIT WORK;
 
-- END TEST >>> 0331 <<< END TEST

-- *************************************************////END-OF-MODULE
