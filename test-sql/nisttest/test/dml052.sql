-- MODULE DML052

-- SQL Test Suite, V6.0, Interactive SQL, dml052.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0229 Case-sensitive LIKE predicate!

-- setup
     INSERT INTO STAFF
            VALUES('E6','ALICE',11,'Gaithersburg');
-- PASS:0229 If 1 row is inserted?

     SELECT EMPNAME
          FROM   STAFF
          WHERE  EMPNAME LIKE 'Ali%';
-- PASS:0229 If 1 row is returned and EMPNAME = 'Alice' (not 'ALICE')?

     SELECT EMPNAME
          FROM   STAFF
          WHERE  EMPNAME LIKE 'ALI%';
-- PASS:0229 If 1 row is returned and EMPNAME = 'ALICE' (not 'Alice')?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0229 <<< END TEST
-- *************************************************////END-OF-MODULE
