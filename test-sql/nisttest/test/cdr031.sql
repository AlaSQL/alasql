-- MODULE  CDR031  

-- SQL Test Suite, V6.0, Interactive SQL, cdr031.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0526 FIPS sizing:  Length of FOREIGN KEY column list = 120!

-- NOTE:0526 The last string has been shortened to fit into 80 columns.
-- NOTE:0526 This test will be somewhat less effective as a result.

   INSERT INTO SUN.T6118REF VALUES
  ('AAAAAAAAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBBBBBB',
   'CCCCCCCCCCCCCCCCCCCC', 'DDDDDDDDDDDDDDDDDDDD',
   'EEEEEEEEEEEEEEEEEEEEEEE', 9999,
   'This test is trying to test the limit on the total length of');
-- PASS:0526 If 1 row is inserted?

   INSERT INTO SUN.T6 VALUES
  ('AAAAAAAAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBBBBBB',
   'CCCCCCCCCCCCCCCCCCCC', 'DDDDDDDDDDDDDDDDDDDD',
   'EEEEEEEEEEEEEEEEEEEEEEE', 9999);
-- PASS:0526 If 1 row is inserted?

   INSERT INTO SUN.T118 VALUES (
   'This test is trying to test the limit on the total length of');
-- PASS:0526 If 1 row is inserted?

   INSERT INTO SUN.T6 VALUES
  ('AAAAAAAAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBBBBBB',
   'CCCCCCCCCCCCCCCCCCCC', 'DDDDDDDDDDDDDDDDDDDD',
   'EEEEEEEEEEEEEEEEEEEEEEE', 0);
-- PASS:0526 If RI ERROR, parent missing, 0 rows inserted?

   INSERT INTO SUN.T118 VALUES ('Hamlet');
-- PASS:0526 If RI ERROR, parent missing, 0 rows inserted?

   ROLLBACK WORK;

-- END TEST >>> 0526 <<< END TEST
-- *************************************************////END-OF-MODULE
