-- MODULE DML065

-- SQL Test Suite, V6.0, Interactive SQL, dml065.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0284 INSERT, SELECT char. strings with blank!

  INSERT INTO STAFF(EMPNUM,EMPNAME)
         VALUES ('E6','Ed');

  INSERT INTO STAFF(EMPNUM,EMPNAME)
         VALUES ('E7','Ed ');

  INSERT INTO STAFF(EMPNUM,EMPNAME)
         VALUES ('E8','Ed                  ');

  SELECT COUNT(*) FROM STAFF
                  WHERE EMPNAME = 'Ed';

-- PASS:0284 If count = 4?

  SELECT COUNT(*) FROM STAFF
                  WHERE EMPNAME = 'Ed ';

-- PASS:0284 If count = 4?

  SELECT COUNT(*) FROM STAFF
                  WHERE EMPNAME = 'Ed                ';

-- PASS:0284 If count = 4?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0284 <<< END TEST

-- *************************************************


-- TEST:0285 INSERT, SELECT integer with various formats!

  INSERT INTO STAFF(EMPNUM,GRADE)
         VALUES ('E6',25);

  INSERT INTO STAFF(EMPNUM,GRADE)
         VALUES ('E7',25.0);

  INSERT INTO STAFF(EMPNUM,GRADE)
         VALUES ('E8',-25);

  INSERT INTO STAFF(EMPNUM,GRADE)
         VALUES ('E9',25.000);

  UPDATE STAFF
         SET GRADE = -GRADE
         WHERE GRADE < 0;

  SELECT COUNT(*) FROM STAFF
                  WHERE GRADE = 25;

-- PASS:0285 If count = 4?

-- restore
  ROLLBACK WORK;


-- END TEST >>> 0285 <<< END TEST

-- *************************************************


-- NO_TEST:0286 Compatibility of structures and host variables!

-- Testing host identifiers

-- *************************************************////END-OF-MODULE
