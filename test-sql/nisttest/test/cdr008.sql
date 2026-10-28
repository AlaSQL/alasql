-- MODULE CDR008

-- SQL Test Suite, V6.0, Interactive SQL, cdr008.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0323 (2 pr.,1 son),both P.K e, F.K e,insert another F.K!

-- setup
  DELETE  FROM WORKS3;

  DELETE  FROM STAFF3;

  DELETE  FROM PROJ3;

  INSERT INTO PROJ3
        VALUES ('P1','MASS','Design',10000,'Deale');

  INSERT INTO STAFF3
        SELECT * FROM STAFF;


  INSERT INTO WORKS3
        VALUES ('E1','P1',40);

  INSERT INTO WORKS3
        VALUES ('E2','P1',40);

  SELECT COUNT(*) FROM WORKS3;
-- PASS:0323 If count = 2?

-- END TEST >>> 0323 <<< END TEST

-- *************************************************


-- TEST:0324 (2 pr.,1 son),1 P.K exist,another not. insert F.K!

-- setup
  DELETE  FROM WORKS3;

  DELETE  FROM STAFF3;

  DELETE  FROM PROJ3;

  INSERT INTO PROJ3
        VALUES ('P1','MASS','Design',10000,'Deale');

  INSERT INTO STAFF3
        SELECT * FROM STAFF;

  INSERT INTO WORKS3
        VALUES ('E1','P1',40);

  SELECT COUNT(*) FROM WORKS3;
-- PASS:0324 If count = 1?

  INSERT INTO WORKS3
        VALUES ('E2','P2',40);
-- PASS:0324 If RI ERROR, parent missing, 0 rows inserted?

  SELECT COUNT(*) FROM WORKS3
        WHERE PNUM = 'P2';
-- PASS:0324 If count = 0?


-- END TEST >>> 0324 <<< END TEST

-- *************************************************


-- TEST:0325 (2 pr.,1 son),both P.K e, F.K e, delete 1 P.K!

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


  DELETE FROM STAFF3
        WHERE EMPNUM='E1';
-- PASS:0325 If RI ERROR, children exist, 0 rows deleted?

  SELECT EMPNUM FROM STAFF3
        WHERE EMPNUM = 'E1';
-- PASS:0325 If 1 row selected and EMPNUM = E1?


-- END TEST >>> 0325 <<< END TEST

-- *************************************************


-- TEST:0326 (2 pr.,1 son),P.K e, no F.K, modify P.K!

-- setup
  DELETE  FROM WORKS3;

  DELETE  FROM STAFF3;

  INSERT INTO STAFF3
        SELECT * FROM STAFF;

  SELECT EMPNUM FROM STAFF3
        WHERE EMPNUM = 'E1';
-- PASS:0326 If 1 row selected and EMPNUM = E1?

  UPDATE STAFF3
        SET EMPNUM = 'E9'
        WHERE EMPNUM = 'E1';

  SELECT EMPNUM FROM STAFF3
        WHERE EMPNUM = 'E1';
-- PASS:0326 If 0 rows selected, SQLCODE = 100, end of data?


  COMMIT WORK;
 
-- END TEST >>> 0326 <<< END TEST

-- *************************************************////END-OF-MODULE
