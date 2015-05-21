-- MODULE CDR001

-- SQL Test Suite, V6.0, Interactive SQL, cdr001.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0300 DEFAULT value literal & number in a table!

-- setup
  DELETE FROM STAFF4;

  INSERT INTO STAFF4 (EMPNUM,GRADE)
        VALUES ('E1',40);

  INSERT INTO STAFF4 (EMPNUM,EMPNAME)
        VALUES ('E2','HUFFMAN');

  SELECT EMPNAME FROM STAFF4
        WHERE GRADE=0;
-- PASS:0300 If 1 row selected and EMPNAME = 'HUFFMAN'?

  SELECT GRADE FROM STAFF4
        WHERE (EMPNAME IS NULL)
        AND CITY = '               ';
-- PASS:0300 If 1 row selected and GRADE = 40?

-- END TEST >>> 0300 <<< END TEST

-- *************************************************


-- TEST:0301 DEFAULT value USER in a table!

-- setup
  DELETE FROM STAFF14;

  INSERT INTO STAFF14 (EMPNUM,GRADE)
        VALUES ('E1',40);

  SELECT EMPNAME FROM STAFF14
        WHERE EMPNAME = 'SUN';
-- PASS:0301 If 1 row selected and EMPNAME = 'SUN'?

-- END TEST >>> 0301 <<< END TEST

-- *************************************************


-- TEST:0377 DEFAULT value with explicit NULL!

-- setup
  DELETE FROM STAFF16;

  INSERT INTO STAFF16 (EMPNUM,GRADE)
         VALUES ('E1',150);

  INSERT INTO STAFF16 (EMPNUM,GRADE)
         VALUES ('E1',150);
-- PASS:0377 If ERROR, unique constraint, 0 rows inserted?

  SELECT COUNT(*) FROM STAFF16
         WHERE EMPNAME IS NULL;
-- PASS:0377 If count = 1?

  INSERT INTO STAFF16 (EMPNUM,EMPNAME,GRADE)
         VALUES ('E2','Tom',100);

  SELECT EMPNAME FROM STAFF16
         WHERE EMPNUM = 'E2';
-- PASS:0377 If EMPNAME = 'Tom'?

  INSERT INTO STAFF16 (EMPNUM,EMPNAME,GRADE)
         VALUES ('E3','Bill',151);
-- PASS:0377 If ERROR, check constraint, 0 rows inserted?

  SELECT GRADE  FROM STAFF16
         WHERE EMPNUM = 'E3';
-- PASS:0377 If 0 rows selected, SQLCODE = 100, end of data?

  COMMIT WORK;
 
-- END TEST >>> 0377 <<< END TEST

-- *************************************************////END-OF-MODULE
