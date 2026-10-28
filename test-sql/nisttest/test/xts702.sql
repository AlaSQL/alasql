-- MODULE   XTS702

-- SQL Test Suite, V6.0, Interactive SQL, xts702.sql
-- 59-byte ID
-- Ted Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7007 LIKE with unrestricted <match value>!

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  'Alice' LIKE 'Alice';
-- PASS:7007 If COUNT = 5?

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  'Equal_literal' NOT LIKE 'Eq_alS_literal%' ESCAPE 'S';
-- PASS:7007 If COUNT = 0?

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  USER LIKE 'CTS1%';
-- PASS:7007 If COUNT = 5?

   ROLLBACK WORK;

-- END TEST >>> 7007 <<< END TEST
-- *********************************************

-- TEST:7008 LIKE with general char. value for pattern & escape!

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  EMPNAME LIKE EMPNAME;
-- PASS:7008 If COUNT = 5?

   INSERT INTO STAFF
     VALUES('E6','Theodora_FL',14,'T%S_FL%%%%%%%%%');
-- PASS:7008 If 1 row is inserted successfully?

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  EMPNAME LIKE CITY ESCAPE 'S';
-- PASS:7008 If COUNT = 1?

   DELETE FROM STAFF;

   INSERT INTO STAFF
     VALUES('S','Dana%ELFT',14,'D%S%%%%%%%%%%%%');
-- PASS:7008 If 1 row inserted successfully?

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  EMPNAME LIKE CITY ESCAPE EMPNUM;
-- PASS:7008 If COUNT = 1?

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  'Del%' LIKE CITY ESCAPE EMPNUM;
-- PASS:7008 If COUNT = 1?

   ROLLBACK WORK;

-- END TEST >>> 7008 <<< END TEST
-- *********************************************

-- TEST:7009 LIKE with zero-length escape!

   DELETE FROM STAFF;

   INSERT INTO STAFF
     VALUES('   ','Dana%ELFT',14,'D%0%%%%%%%%%%%%');
-- PASS:7009 If 1 row inserted successfully?

   SELECT COUNT(*)
     FROM   STAFF
     WHERE  EMPNAME LIKE CITY ESCAPE TRIM(EMPNUM);
-- PASS:7009 If ERROR - data exception; invalid escape character?

   ROLLBACK WORK;

-- END TEST >>> 7009 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
