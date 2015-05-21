-- MODULE  DML182  

-- SQL Test Suite, V6.0, Interactive SQL, dml182.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0895 FIPS sizing, columns in list >= 15!

   CREATE TABLE ID_CODES (
     CODE1 INT,
     CODE2 INT,
     CODE3 INT,
     CODE4 INT,
     CODE5 INT,
     CODE6 INT,
     CODE7 INT,
     CODE8 INT,
     CODE9 INT,
     CODE10 INT,
     CODE11 INT,
     CODE12 INT,
     CODE13 INT,
     CODE14 INT,
     CODE15 INT,
     PRIMARY KEY (CODE1, CODE2, CODE3, CODE4, CODE5,
       CODE6, CODE7, CODE8, CODE9, CODE10,
       CODE11, CODE12, CODE13, CODE14, CODE15));
-- PASS:0895 If table created successfully?

   COMMIT WORK;

   CREATE TABLE ORDERS (
     CODE1 INT,
     CODE2 INT,
     CODE3 INT,
     CODE4 INT,
     CODE5 INT,
     CODE6 INT,
     CODE7 INT,
     CODE8 INT,
     CODE9 INT,
     CODE10 INT,
     CODE11 INT,
     CODE12 INT,
     CODE13 INT,
     CODE14 INT,
     CODE15 INT,
     TITLE VARCHAR (80),
     COST NUMERIC(5,2),
     FOREIGN KEY (CODE1, CODE2, CODE3, CODE4, CODE5,
       CODE6, CODE7, CODE8, CODE9, CODE10,
       CODE11, CODE12, CODE13, CODE14, CODE15)
     REFERENCES ID_CODES);
-- PASS:0895 If table created successfully?

   COMMIT WORK;

   CREATE VIEW ID_ORDERS AS
     SELECT * FROM ID_CODES JOIN ORDERS
       USING (CODE1, CODE2, CODE3, CODE4, CODE5,
         CODE6, CODE7, CODE8, CODE9, CODE10,
         CODE11, CODE12, CODE13, CODE14, CODE15);
-- PASS:0895 If view created successfully

   COMMIT WORK;

   INSERT INTO ID_CODES VALUES (
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
   INSERT INTO ID_CODES VALUES (
     1, 2, 3, 4, 5, 6, 7, 9, 8, 10, 11, 12, 13, 14, 15);
   INSERT INTO ORDERS VALUES (
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
     'Gidget Goes Skiing',
     29.95);
   INSERT INTO ORDERS VALUES (
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
     'Barney Goes Hawaiian',
     19.95);
   INSERT INTO ORDERS VALUES (
     1, 2, 3, 4, 5, 6, 7, 9, 8, 10, 11, 12, 13, 14, 15,
     'Invasion of the Smurfs',
     9.95);
-- PASS:0895 If 5 rows inserted successfully in previous 5 inserts?

   SELECT CODE1, CODE2, CODE3, CODE4, CODE5,
       CODE6, CODE7, CODE8, CODE9, CODE10,
       CODE11, CODE12, CODE13, CODE14, CODE15,
     AVG(COST)
     FROM ID_ORDERS
     GROUP BY CODE1, CODE2, CODE3, CODE4, CODE5,
       CODE6, CODE7, CODE8, CODE9, CODE10,
       CODE11, CODE12, CODE13, CODE14, CODE15
     ORDER BY CODE1, CODE2, CODE3, CODE4, CODE5,
       CODE6, CODE7, CODE8, CODE9, CODE10,
       CODE11, CODE12, CODE13, CODE14, CODE15;
-- PASS:0895 If 2 rows are returned?
--                 avg(cost)
--                 =========
-- PASS:0895 If    24.95 (+ or - 0.01)  ?
-- PASS:0895 If     9.95 (+ or - 0.01)  ?

   COMMIT WORK;

   DROP TABLE ORDERS CASCADE;
-- PASS:0895 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE ID_CODES CASCADE;
-- PASS:0895 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0895 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
