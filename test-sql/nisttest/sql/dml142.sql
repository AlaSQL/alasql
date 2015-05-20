-- MODULE  DML142  

-- SQL Test Suite, V6.0, Interactive SQL, dml142.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU                

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0527 Priv. violation:  HU!

   SELECT COUNT(*) FROM FLATER.USIG;
-- PASS:0527 If ERROR, syntax error/access violation, 0 rows selected?

   INSERT INTO FLATER.USIG VALUES (2, 4);
-- PASS:0527 If ERROR, syntax error/access violation, 0 rows inserted?

   UPDATE FLATER.USIG SET C1 = 0;
-- PASS:0527 If ERROR, syntax error/access violation, 0 rows updated?

   DELETE FROM FLATER.USIG;
-- PASS:0527 If ERROR, syntax error/access violation, 0 rows deleted?

   ROLLBACK WORK;

-- END TEST >>> 0527 <<< END TEST

-- *********************************************

-- NO_TEST:0528 Tables are multi-sets:  cursor operations!

-- Testing Cursors

-- *************************************************////END-OF-MODULE
