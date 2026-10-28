-- MODULE  DML132  

-- SQL Test Suite, V6.0, Interactive SQL, dml132.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0515 FIPS sizing:  NUMERIC (15) decimal precision!

   INSERT INTO HU.P15 VALUES (999999999999999);
-- PASS:0515 If 1 row is inserted?

   INSERT INTO HU.P15 VALUES (-999999999999999);
-- PASS:0515 If 1 row is inserted?

   SELECT NUMTEST - 999999999999990,
  NUMTEST / 9999999
  FROM HU.P15 WHERE NUMTEST > 0;
-- PASS:0515 If 1 row selected and values are 9 and 100000010 +- 1?

   SELECT NUMTEST + 999999999999990,
  NUMTEST / 9999999
  FROM HU.P15 WHERE NUMTEST < 0;
-- PASS:0515 If 1 row selected and values are -9 and -100000010 +- 1?

   DELETE FROM HU.P15;
-- PASS:0515 If 2 rows are deleted?

   INSERT INTO HU.P15 VALUES (562949953421313);
-- PASS:0515 If 1 row is inserted?

   SELECT COUNT(*)
  FROM HU.P15 WHERE NUMTEST = 562949953421312;
-- PASS:0515 If count = 0?

   SELECT COUNT(*)
  FROM HU.P15 WHERE NUMTEST = 562949953421313;
-- PASS:0515 If count = 1?

   SELECT COUNT(*)
  FROM HU.P15 WHERE NUMTEST = 562949953421314;
-- PASS:0515 If count = 0?

   ROLLBACK WORK;

-- END TEST >>> 0515 <<< END TEST

-- *********************************************

-- TEST:0524 FIPS sizing:  100 Items in a SELECT list!

   DELETE FROM HU.T100;

   INSERT INTO HU.T100 VALUES ('00', '01', '02',
  '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c',
  '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16',
  '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a',
  '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34',
  '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e',
  '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48',
  '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52',
  '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c',
  '5d', '5e', '5f', '60', '61', '62', '63');
-- PASS:0524 If 1 row is inserted?

   SELECT
  C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14,
  C15, C16, C17, C18, C19, C20, C21, C22, C23, C24, C25, C26,
  C27, C28, C29, C30, C31, C32, C33, C34, C35, C36, C37, C38,
  C39, C40, C41, C42, C43, C44, C45, C46, C47, C48, C49, C50,
  C51, C52, C53, C54, C55, C56, C57, C58, C59, C60, C61, C62,
  C63, C64, C65, C66, C67, C68, C69, C70, C71, C72, C73, C74,
  C75, C76, C77, C78, C79, C80, C81, C82, C83, C84, C85, C86,
  C87, C88, C89, C90, C91, C92, C93, C94, C95, C96, C97, C98,
  C99, C100
  FROM HU.T100;
-- PASS:0524 If 1 row selected?
-- PASS:0524 AND C1 is '00'?
-- PASS:0524 AND C50 is '31'?
-- PASS:0524 AND C67 is '42'?
-- PASS:0524 AND C100 is '63'?

   ROLLBACK WORK;

-- END TEST >>> 0524 <<< END TEST

-- *********************************************

-- TEST:0525 FIPS sizing:  15 Table references in SQL statement!

   DELETE FROM BASE_WCOV;

   INSERT INTO BASE_WCOV VALUES (1);
-- PASS:0525 If 1 row is inserted?

   DELETE FROM HU.STAFF WHERE EMPNUM > 'E2';
-- PASS:0525 If 3 rows are deleted?

  SELECT COUNT(*) FROM
  HU.WORKS T01, HU.PROJ T02, HU.STAFF T03,
  USIG T04, U_SIG T05, BASE_VS1 T06, VS1 T07,
  VS2 T08, HU.VSTAFF3 T09, BASE_WCOV T10
  WHERE T03.EMPNUM > 'E1';
-- PASS:0525 If count = 46080?

   ROLLBACK WORK;

-- END TEST >>> 0525 <<< END TEST
-- *************************************************////END-OF-MODULE
