-- MODULE MPB006R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpb006r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- NOTE Direct support for SQLCODE or SQLSTATE is not required
-- NOTE    in Interactive Direct SQL, as defined in FIPS 127-2.
-- NOTE   ********************* instead ***************************
-- NOTE If a statement raises an exception condition,
-- NOTE    then the system shall display a message indicating that
-- NOTE    the statement failed, giving a textual description
-- NOTE    of the failure.
-- NOTE If a statement raises a completion condition that is a
-- NOTE    "warning" or "no data", then the system shall display
-- NOTE    a message indicating that the statement completed,
-- NOTE    giving a textual description of the "warning" or "no data."

-- TEST:0506 SQLSTATE 40001: transaction rollback/serialization failure!
-- *** This is a test of the ERROR message, if any ****
-- Synchronize typing with MPA006R, by pausing at the designated "sync point".
-- Do not continue past the sync point until MPA006R has reached the sync point.
-- If, at any point, an ERROR message is issued,
--   jump to the SELECT COUNT to determine whether ROLLBACK has occurred.

   INSERT INTO TTT VALUES (2, 'B');

   SELECT BNUM FROM BB;
-- Remember the value of BNUM as #BB#             BB = |__________|
-- Subtract 150 for later reference         BB - 150 = |__________|

   UPDATE BB SET BNUM = BNUM - 150;

-- **** sync point #1 ****

   SELECT ANUM FROM AA;
-- JUMP to SELECT COUNT, if there is an ERROR message.
-- Remember the value of ANUM as #AA#             AA = |__________|
-- Subtract 20 for later reference           AA - 20 = |__________|

   UPDATE AA SET ANUM = ANUM - 20;
-- JUMP to last query, if there is an ERROR message.

-- The next two queries verify transaction isolation.

   SELECT BNUM FROM BB;
-- PASS:0506 If BNUM is 150 less than #BB# above?
-- PASS:0506 OR previous ERROR messages?

   SELECT ANUM FROM AA;
-- PASS:0506 If ANUM is 20 less than #AA# above?
-- PASS:0506 OR previous ERROR messages?

-- type this, to determine whether there has been a transaction ROLLBACK

   SELECT COUNT(*) FROM TTT WHERE ANUM = 2;
-- PASS:0506 If count = 0 and there has been ROLLBACK message ?
-- PASS:0506              and  SQLSTATE = 40001?
-- PASS:0506 OR count = 1 and there has been statement ERROR message?
-- PASS:0506              and  SQLSTATE NOT IN (00xxx,01xxx,40xxx)?
-- PASS:0506 OR count = 1 and there has been no ERROR message ?

   COMMIT WORK;

-- *************************************************////END-OF-MODULE
