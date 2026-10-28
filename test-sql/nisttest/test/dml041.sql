-- MODULE DML041

-- SQL Test Suite, V6.0, Interactive SQL, dml041.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0212 Enforcement of CHECK clause in nested views!

-- setup
     INSERT INTO V_WORKS2
            VALUES('E9','P7',13);
-- PASS:0212 If ERROR, view check constraint, 0 rows inserted?

     INSERT INTO V_WORKS2
            VALUES('E7','P4',95);
-- PASS:0212 If 1 row is inserted?

     INSERT INTO V_WORKS3
            VALUES('E8','P2',85);
-- PASS:0212 If either 1 row is inserted   OR ?
-- PASS:0212 If ERROR, view check constraint, 0 rows inserted?
-- NOTE:0212 Vendor interpretation follows 
-- NOTE:0212 Insertion of row means: outer check option does not imply
-- NOTE:0212                         inner check options

-- NOTE:0212 Failure to insert means: outer check option implies
-- NOTE:0212                          inner check options

     INSERT INTO V_WORKS3
            VALUES('E1','P7',90);
-- PASS:0212 If 1 row is inserted?

     INSERT INTO V_WORKS3
            VALUES('E9','P2',10);
-- PASS:0212 If ERROR, view check constraint, 0 rows inserted?

     SELECT COUNT(*)
          FROM WORKS
          WHERE EMPNUM = 'E9';
-- PASS:0212 If count = 0?

      SELECT COUNT(*)
           FROM WORKS
           WHERE HOURS > 85;
-- PASS:0212 If count = 2?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0212 <<< END TEST
-- *************************************************////END-OF-MODULE
