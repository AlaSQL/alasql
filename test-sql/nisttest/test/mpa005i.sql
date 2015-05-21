-- MODULE MPA005I  initialization  

-- SQL Test Suite, V6.0, Interactive SQL, mpa005i.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0457 Transactions serializable - phantom read!

     DELETE FROM AA;


     INSERT INTO AA VALUES ( 1);
     INSERT INTO AA VALUES ( 2);
     INSERT INTO AA VALUES ( 3);
     INSERT INTO AA VALUES ( 4);
     INSERT INTO AA VALUES ( 5);
     INSERT INTO AA VALUES ( 6);
     INSERT INTO AA VALUES ( 7);
     INSERT INTO AA VALUES ( 8);
     INSERT INTO AA VALUES ( 9);
     INSERT INTO AA VALUES (10);
     INSERT INTO AA VALUES (11);
     INSERT INTO AA VALUES (12);
     INSERT INTO AA VALUES (13);
     INSERT INTO AA VALUES (14);
     INSERT INTO AA VALUES (15);
     INSERT INTO AA VALUES (16);
     INSERT INTO AA VALUES (17);
     INSERT INTO AA VALUES (18);
     INSERT INTO AA VALUES (19);
     INSERT INTO AA VALUES (20);
     INSERT INTO AA VALUES (21);
     INSERT INTO AA VALUES (22);
     INSERT INTO AA VALUES (23);
     INSERT INTO AA VALUES (24);
     INSERT INTO AA VALUES (25);

     COMMIT WORK;

     SELECT COUNT(*)
        FROM AA;
-- PASS:0457 If count = 25?

-- *************************************************////END-OF-MODULE
