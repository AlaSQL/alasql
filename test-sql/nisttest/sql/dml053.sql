-- MODULE DML053

-- SQL Test Suite, V6.0, Interactive SQL, dml053.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0233 Table as multiset of rows - INSERT duplicate VALUES()!
 
-- setup
     INSERT INTO TEMP_S
            VALUES('E1',11,'Deale');
-- PASS:0233 If 1 row is inserted?

     INSERT INTO TEMP_S
            VALUES('E1',11,'Deale');
-- PASS:0233 If 1 row is inserted?

     SELECT COUNT(*)
                FROM TEMP_S
                WHERE EMPNUM='E1' AND GRADE=11 AND CITY='Deale';
-- PASS:0233 If count = 2?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0233 <<< END TEST
-- *************************************************////END-OF-MODULE
