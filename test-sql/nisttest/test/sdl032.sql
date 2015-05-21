-- MODULE SDL032  

-- SQL Test Suite, V6.0, Interactive SQL, sdl032.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0472 Priv.violation: individual SELECT, column UPDATE!

   SELECT EMPNUM, EMPNAME, GRADE, CITY
         FROM HU.STAFF3
         WHERE EMPNUM = 'E1';
-- PASS:0472 If 1 row is selected and EMPNUM = 'E1' and?
-- PASS:0472 EMPNAME = 'Alice' and GRADE = 12 and CITY = 'Deale'?

   UPDATE HU.STAFF3
         SET EMPNUM = 'E0'
         WHERE EMPNUM = 'E1';
-- PASS:0472 If 1 row is updated?

   UPDATE HU.STAFF3
         SET EMPNAME = 'Larry'
         WHERE EMPNUM = 'E0';
-- PASS:0472 If 1 row is updated?

   UPDATE HU.STAFF3
         SET GRADE = 15;
-- PASS:0472 If ERROR, syntax error/access violation, 0 rows updated?


   UPDATE HU.STAFF3
         SET CITY = 'Greenmount';
-- PASS:0472 If ERROR, syntax error/access violation, 0 rows updated?

   SELECT COUNT(*) 
         FROM HU.STAFF3 
         WHERE CITY = 'Greenmount'
            OR GRADE = 15;
-- PASS:0472 If count = 0?

   INSERT INTO HU.STAFF3
         VALUES ('E6','Mickey',12,'Nice');
-- PASS:0472 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COUNT(*)
         FROM HU.STAFF3;
-- PASS:0472 If count = 5?

   DELETE FROM HU.STAFF3;
-- PASS:0472 If ERROR, syntax error/access violation, 0 rows deleted?

   SELECT COUNT(*)
         FROM HU.STAFF3;
-- PASS:0472 If count = 5?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0472 <<< END TEST
-- *********************************************

-- TEST:0484 Priv.violation: SELECT and column UPDATE on view!

   SELECT EMPNUM, EMPNAME, GRADE, CITY
         FROM HU.VSTAFF3
         WHERE EMPNUM = 'E1';
-- PASS:0484 If 1 row is selected and EMPNUM = 'E1' and?
-- PASS:0484 EMPNAME = 'Alice' and GRADE = 12 and CITY = 'Deale'?

   UPDATE HU.VSTAFF3
         SET EMPNUM = 'E0'
         WHERE EMPNUM = 'E1';
-- PASS:0484 If 1 row is updated?

   UPDATE HU.VSTAFF3
         SET EMPNAME = 'Larry'
         WHERE EMPNUM = 'E0';
-- PASS:0484 If 1 row is updated?

   UPDATE HU.VSTAFF3
         SET GRADE = 15;
-- PASS:0484 If ERROR, syntax error/access violation, 0 rows updated?

   UPDATE HU.VSTAFF3
         SET CITY = 'Greenmount';
-- PASS:0484 If ERROR, syntax error/access violation, 0 rows updated?

   SELECT COUNT(*) 
         FROM HU.VSTAFF3 
         WHERE CITY = 'Greenmount'
            OR GRADE = 15;
-- PASS:0484 If count = 0?

   INSERT INTO HU.VSTAFF3
         VALUES ('E6','Mickey',12,'Nice');
-- PASS:0484 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COUNT(*)
         FROM HU.VSTAFF3;
-- PASS:0484 If count = 5?

   DELETE FROM HU.VSTAFF3;
-- PASS:0484 If ERROR, syntax error/access violation, 0 rows deleted?

   SELECT COUNT(*) 
         FROM HU.VSTAFF3;
-- PASS:0484 If count = 5?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0484 <<< END TEST
-- *********************************************

-- NO_TEST:0485 Priv.violation: SELECT and column UPDATE cursor!

-- Testing cursors

-- *************************************************////END-OF-MODULE

