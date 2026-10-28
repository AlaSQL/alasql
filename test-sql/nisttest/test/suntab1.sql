-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID SUN *****
-- ***************************************************************
-- MODULE SUNTAB1

-- SQL Test Suite, V6.0, Interactive SQL, suntab1.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

--   This routine initializes the contents of tables:
--        STAFF_M, PROJ_M, STAFF_C,
--   This routine may be run at any time to re-initialize tables.

-- SET NULL  foreign key values for tables which
-- reference each other or are self-referencing:

  UPDATE STAFF_M
         SET PRI_WK = NULL;

  UPDATE PROJ_M
         SET MGR = NULL;

  DELETE FROM PROJ_M;

  DELETE FROM STAFF_M;

  UPDATE STAFF_C
         SET MGR = NULL;

  DELETE FROM STAFF_C;

  INSERT INTO STAFF_M VALUES('E1','Alice',12,'Deale',NULL);
  INSERT INTO STAFF_M VALUES('E2','Betty',10,'Vienna',NULL);
  INSERT INTO STAFF_M VALUES('E3','Carmen',13,'Vienna',NULL);
  INSERT INTO STAFF_M VALUES('E5','Don',12,'Deale',NULL);
  INSERT INTO STAFF_M VALUES('E4','Don',12,'Deale',NULL);


  INSERT INTO PROJ_M VALUES('P1','MXSS','Design',10000,'Deale',NULL);
  INSERT INTO PROJ_M VALUES('P2','CALM','Code',30000,'Vienna',NULL);
  INSERT INTO PROJ_M VALUES('P4','SDP','Design',20000,'Deale',NULL);
  INSERT INTO PROJ_M VALUES('P3','SDP','Test',30000,'Tample',NULL);
  INSERT INTO PROJ_M VALUES('P5','IRM','Test',10000,'Vienna',NULL);
  INSERT INTO PROJ_M VALUES('P6','PAYR','Design',50000,'Deale',NULL);


  UPDATE STAFF_M
         SET PRI_WK = 'P1'
         WHERE EMPNUM = 'E1';
  UPDATE STAFF_M
         SET PRI_WK = 'P1'
         WHERE EMPNUM = 'E2';
  UPDATE STAFF_M
         SET PRI_WK = 'P1'
         WHERE EMPNUM = 'E3';
  UPDATE STAFF_M
         SET PRI_WK = 'P2'
         WHERE EMPNUM = 'E4';
  UPDATE STAFF_M
         SET PRI_WK = 'P4'
         WHERE EMPNUM = 'E5';
  UPDATE PROJ_M
         SET MGR = 'E2'
         WHERE PNUM = 'P1';
  UPDATE PROJ_M
         SET MGR = 'E2'
         WHERE PNUM = 'P2';
  UPDATE PROJ_M
         SET MGR = 'E3'
         WHERE PNUM = 'P3';
  UPDATE PROJ_M
         SET MGR = 'E4'
         WHERE PNUM = 'P4';
  UPDATE PROJ_M   
         SET MGR = 'E4'   
         WHERE PNUM = 'P5';


  INSERT INTO STAFF_C VALUES('E1','Alice',12,'Deale',NULL);
  INSERT INTO STAFF_C VALUES('E2','Betty',10,'Vienna','E1');
  INSERT INTO STAFF_C VALUES('E3','Carmen',13,'Vienna','E2');
  INSERT INTO STAFF_C VALUES('E4','Don',12,'Deale','E2');
  INSERT INTO STAFF_C VALUES('E5','Don',12,'Deale','E1');
  INSERT INTO STAFF_C VALUES('E6','Tom',14,'Gettysburg','E5');
  INSERT INTO STAFF_C VALUES('E7','Kingdom',18,'Gettysburg','E7');

  COMMIT WORK;

  SELECT COUNT(*) FROM STAFF_M;
-- PASS:Setup if count = 5?
  SELECT COUNT(*) FROM PROJ_M;
-- PASS:Setup if count = 6?
  SELECT COUNT(*) FROM STAFF_C;
-- PASS:Setup if count = 7?

-- *************************************************////END-OF-MODULE
