-- MODULE MPA005R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpa005r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0457 Transactions serializable - phantom read!
-- Execute the following 4 sets of SQL statements until MPB005R is finished.
-- Repeat each set if there are errors or warnings about deadlock.

                           DELETE FROM AA WHERE ANUM BETWEEN 1 AND 5;
                           COMMIT WORK;


                           INSERT INTO AA VALUES ( 1);
                           INSERT INTO AA VALUES ( 2);
                           INSERT INTO AA VALUES ( 3);
                           INSERT INTO AA VALUES ( 4);
                           INSERT INTO AA VALUES ( 5);
                           COMMIT WORK;


                           DELETE FROM AA WHERE ANUM BETWEEN 6 AND 10;
                           COMMIT WORK;


                           INSERT INTO AA VALUES ( 6);
                           INSERT INTO AA VALUES ( 7);
                           INSERT INTO AA VALUES ( 8);
                           INSERT INTO AA VALUES ( 9);
                           INSERT INTO AA VALUES (10);
                           COMMIT WORK;

-- *************************************************////END-OF-MODULE
