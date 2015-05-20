-- MODULE DML029

-- SQL Test Suite, V6.0, Interactive SQL, dml029.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0129 Double quote work in character string literal!

-- setup
     INSERT INTO STAFF
            VALUES('E8','Yang Ling',15,'Xi''an');
-- PASS:0129 If 1 row is inserted?

      SELECT GRADE,CITY
           FROM STAFF
           WHERE EMPNUM = 'E8';
-- PASS:0129 If GRADE = 15 and CITY = 'Xi'an'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0129 <<< END TEST
-- ************************************************************

-- TEST:0130 Approximate numeric literal <mantissa>E<exponent>!

-- setup
     INSERT INTO JJ
            VALUES(123.456E3);
-- PASS:0130 If 1 row is inserted?

      SELECT COUNT(*)
           FROM JJ
           WHERE FLOATTEST > 123455 AND FLOATTEST < 123457;
-- PASS:0130 If count = 1 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0130 <<< END TEST
-- ***************************************************************

-- TEST:0131 Approximate numeric literal with negative exponent!

-- setup
     INSERT INTO JJ
            VALUES(123456E-3);
-- PASS:0131 If 1 row is inserted?

      SELECT COUNT(*)
           FROM JJ
           WHERE FLOATTEST > 122 AND FLOATTEST < 124;
-- PASS:0131 If count = 1 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0131 <<< END TEST
-- ********************************************************

-- TEST:0182 Approx numeric literal with negative mantissa & exponent!

-- setup
     INSERT INTO JJ
            VALUES(-123456E-3);
-- PASS:0182 If 1 row is inserted?

      SELECT COUNT(*)
           FROM JJ
           WHERE FLOATTEST > -124 AND FLOATTEST < -122;
-- PASS:0182 If count = 1 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0182 <<< END TEST
-- *************************************************////END-OF-MODULE
