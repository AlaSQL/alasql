-- MODULE DML037

-- SQL Test Suite, V6.0, Interactive SQL, dml037.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- NO_TEST:0202 Host variable names same as column name!

-- Testing host identifier

-- ***********************************************************

-- TEST:0234 SQL-style comments with SQL statements!
-- OPTIONAL TEST

    DELETE  -- we empty the table  
        FROM TEXT240;

     INSERT INTO TEXT240   -- This is the test for the rules  
            VALUES         -- for the placement            
       ('SQL-STYLE COMMENTS') -- of
                              -- SQL-style comments 
      ;
-- PASS:0234 If 1 row is inserted?

    SELECT * 
            FROM TEXT240;
-- PASS:0234 If TEXXT = 'SQL-STYLE COMMENTS'?
     
-- restore
     ROLLBACK WORK;

-- END TEST >>> 0234 <<< END TEST
-- *************************************************////END-OF-MODULE
