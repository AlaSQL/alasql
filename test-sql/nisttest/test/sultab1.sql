-- ******************************************************************
-- **** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID SULLIVAN *****
-- ******************************************************************
-- MODULE SULTAB1

-- SQL Test Suite, V6.0, Interactive SQL, sultab1.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

--   This routine initializes the contents of tables:
--        WORKS_P, and TTT
--   This routine may be run at any time to re-initialize tables.

  DELETE FROM WORKS_P;

  INSERT INTO WORKS_P VALUES  ('E1','P1',40);
  INSERT INTO WORKS_P VALUES  ('E1','P2',20);
  INSERT INTO WORKS_P VALUES  ('E1','P3',80);
  INSERT INTO WORKS_P VALUES  ('E1','P4',20);
  INSERT INTO WORKS_P VALUES  ('E1','P5',12);
  INSERT INTO WORKS_P VALUES  ('E1','P6',12);
  INSERT INTO WORKS_P VALUES  ('E2','P1',40);
  INSERT INTO WORKS_P VALUES  ('E2','P2',80);
  INSERT INTO WORKS_P VALUES  ('E3','P2',20);
  INSERT INTO WORKS_P VALUES  ('E4','P2',20);
  INSERT INTO WORKS_P VALUES  ('E4','P4',40);
  INSERT INTO WORKS_P VALUES  ('E4','P5',80);

  DELETE FROM TTT;

  INSERT INTO TTT VALUES (1,'AAA');

  SELECT COUNT(*) FROM WORKS_P;
-- PASS:Setup if count = 12?

  SELECT COUNT(*) FROM TTT;
-- PASS:Setup if count = 1?

-- COMMIT
  COMMIT WORK;
-- *************************************************////END-OF-MODULE
