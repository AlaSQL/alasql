-- MODULE DML040

-- SQL Test Suite, V6.0, Interactive SQL, dml040.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0209 Join 2 tables from different schemas!

-- setup
     INSERT INTO CUGINI.VTABLE
            SELECT *
                 FROM   VTABLE;

     SELECT COL1, EMPNUM, GRADE
          FROM CUGINI.VTABLE, STAFF
          WHERE COL1 < 200 AND GRADE > 12;
-- PASS:0209 If 6 rows are selected and SUM(COL1) = 220?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0209 <<< END TEST
-- *************************************************////END-OF-MODULE
