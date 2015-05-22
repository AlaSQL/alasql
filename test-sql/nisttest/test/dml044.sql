-- MODULE DML044

-- SQL Test Suite, V6.0, Interactive SQL, dml044.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0215 FIPS sizing -- 6 columns in a UNIQUE constraint!
-- FIPS sizing TEST

-- setup
     INSERT INTO T8
            VALUES('th','seco','third3','fourth_4','fifth_colu',
                'sixth_column','seventh_column','last_column_of_t');
-- PASS:0215 If 1 row is inserted?

     INSERT INTO T8
            VALUES('th','seco','third3','fourth_4','fifth_colu',
                'sixth_column','column_seventh','column_eighth_la');
-- PASS:0215 If ERROR, unique constraint, 0 rows inserted?

      SELECT COL1,COL2,COL3,COL4,COL5,COL6,COL7,COL8
           FROM T8;
-- PASS:0215 If COL1 = 'th'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0215 <<< END TEST
-- **************************************************************

-- TEST:0216 FIPS sizing -- 120 bytes in a UNIQUE constraint!
-- FIPS sizing TEST

-- setup
     DELETE FROM T4;
-- Making sure the table is empty

-- setup
     INSERT INTO T4 VALUES (
'This test is trying to test the limit on the total length of an index',
                 -123456, 'which is','not less than 120'); 
-- PASS:0216 If 1 row is inserted?

      INSERT INTO T4 VALUES (
'This test is trying to test the limit on the total length of an index',
                 -123456,'which is','not less than 120');
-- PASS:0216 If ERROR, unique constraint, 0 rows inserted?

      SELECT STR110
           FROM T4;
-- PASS:0216 If STR110 starts with 'This test is trying to test the '?
-- PASS:0216 and ends with 'limit on the total length of an index'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0216 <<< END TEST

-- *************************************************////END-OF-MODULE
