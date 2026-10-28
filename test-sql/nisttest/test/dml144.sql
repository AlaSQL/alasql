-- MODULE  DML144  

-- SQL Test Suite, V6.0, Interactive SQL, dml144.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0834 <length expression> (static)!

   CREATE TABLE GRUB (C1 VARCHAR (10));
-- PASS:0834 If table is created?

   COMMIT WORK;

   SELECT CHAR_LENGTH (EMPNAME)
  FROM HU.STAFF WHERE GRADE = 10;
-- PASS:0834 If 1 row selected and value is 20?

   SELECT CHARACTER_LENGTH ('HI' || 'THERE')
  FROM HU.ECCO;
-- PASS:0834 If 1 row selected and value is 7?

   INSERT INTO GRUB VALUES ('Hi  ');
-- PASS:0834 If 1 row is inserted?

   SELECT CHARACTER_LENGTH (C1)
  FROM GRUB;
-- PASS:0834 If 1 row selected and value is 4?

   SELECT OCTET_LENGTH (C1)
  FROM GRUB;
-- PASS:0834 If 1 row selected and value is > 2?

   UPDATE GRUB SET C1 = NULL;
-- PASS:0834 If 1 row is updated?

   SELECT CHARACTER_LENGTH (C1)
  FROM GRUB;
-- PASS:0834 If 1 row selected and value is NULL?

   SELECT OCTET_LENGTH (C1)
  FROM GRUB;
-- PASS:0834 If 1 row selected and value is NULL?

   ROLLBACK WORK;

   DROP TABLE GRUB CASCADE;

   COMMIT WORK;

-- END TEST >>> 0834 <<< END TEST

-- *********************************************

-- TEST:0835 <character substring function> (static)!

   CREATE TABLE MOREGRUB (C1 VARCHAR (10), ID INT);
-- PASS:0835 If table is created?

   COMMIT WORK;

   CREATE VIEW X4 (S1, S2, ID) AS
  SELECT SUBSTRING (C1 FROM 6),
         SUBSTRING (C1 FROM 2 FOR 4), ID
  FROM MOREGRUB;
-- PASS:0835 If view is created?

   COMMIT WORK;

   SELECT SUBSTRING (CITY FROM 4 FOR 10)
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0835 If 1 row selected and value is 'on        '?

-- NOTE:0835 Right truncation subtest deleted.

   SELECT SUBSTRING (CITY FROM 4 FOR -1)
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0835 If ERROR, substring error, 0 rows selected?

   SELECT SUBSTRING (CITY FROM 0 FOR 10)
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0835 If 1 row selected and value is 'Akron     '?

-- NOTE:0835 Host language variable subtest deleted.

   SELECT SUBSTRING (CITY FROM 1 FOR 1)
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0835 If 1 row selected and value is 'A'?

   SELECT SUBSTRING (CITY FROM 1 FOR 0)
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0835 If 1 row selected and value is ''?

   SELECT SUBSTRING (CITY FROM 12 FOR 1)
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0835 If 1 row selected and value is ''?

   INSERT INTO MOREGRUB VALUES ('Pretzels', 1);
-- PASS:0835 If 1 row is inserted?

   INSERT INTO MOREGRUB VALUES (NULL, 2);
-- PASS:0835 If 1 row is inserted?

   INSERT INTO MOREGRUB VALUES ('Chips', 3);
-- PASS:0835 If 1 row is inserted?

   SELECT S1 FROM X4 WHERE ID = 1;
-- PASS:0835 If 1 row selected and S1 = 'els'?

   SELECT S1 FROM X4 WHERE ID = 3;
-- PASS:0835 If 1 row selected and S1 =  ''?

   SELECT S2 FROM X4 WHERE ID = 1;
-- PASS:0835 If 1 row selected and S2 = 'retz'?

   SELECT S2 FROM X4 WHERE ID = 3;
-- PASS:0835 If 1 row selected and S2 = 'hips'?

   SELECT SUBSTRING (C1 FROM ID)
  FROM MOREGRUB
  WHERE C1 LIKE 'Ch%';
-- PASS:0835 If 1 row selected and value is 'ips'?

   SELECT SUBSTRING (C1 FROM 1 FOR ID)
  FROM MOREGRUB
  WHERE C1 LIKE 'Ch%';
-- PASS:0835 If 1 row selected and value is 'Chi'?

-- NOTE:0835 Host language variable subtest deleted.

   SELECT S1 FROM X4 WHERE ID = 2;
-- PASS:0835 If 1 row selected and S1 is NULL?

   DELETE FROM MOREGRUB;

   INSERT INTO MOREGRUB VALUES ('Tacos', NULL);
-- PASS:0835 If 1 row is inserted?

   SELECT SUBSTRING (C1 FROM 1 FOR ID)
   FROM MOREGRUB;
-- PASS:0835 If 1 row selected and value is NULL?

   SELECT SUBSTRING (C1 FROM ID FOR 1)
   FROM MOREGRUB;
-- PASS:0835 If 1 row selected and value is NULL?

   UPDATE MOREGRUB SET C1 = NULL;

   SELECT SUBSTRING (C1 FROM ID FOR ID)
   FROM MOREGRUB;
-- PASS:0835 If 1 row selected and value is NULL?

   ROLLBACK WORK;

   DROP TABLE MOREGRUB CASCADE;

   COMMIT WORK;

-- END TEST >>> 0835 <<< END TEST

-- *********************************************

-- TEST:0839 Composed <length expression> and SUBSTRING!

   SELECT CHAR_LENGTH (SUBSTRING
  (CITY FROM 4 FOR 4))
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0839 If 1 row selected and value is 4?

   SELECT CHARACTER_LENGTH (SUBSTRING
  (EMPNUM FROM 1))
  FROM HU.STAFF WHERE EMPNAME = 'Ed';
-- PASS:0839 If 1 row selected and value is 3?

   COMMIT WORK;

-- END TEST >>> 0839 <<< END TEST
-- *************************************************////END-OF-MODULE
