-- MODULE  YTS803  

-- SQL Test Suite, V6.0, Interactive SQL, yts803.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7549 Support SQL-SIZING table in documentation schema!

   SELECT SIZING_ID, DESCRIPTION, ENTRY_VALUE,
     INTERMEDIATE_VALUE
     FROM FIPS_DOCUMENTATION.SQL_SIZING
     ORDER BY SIZING_ID;
-- NOTE:NOTE: Please reference FIPS SQL_SIZING TABLE for comparison!
--            See FIPS 127-2 Sections 15, 15.2, and 16.6.
-- PASS:7549 If 46 rows are returned ordered by SIZING_ID?
-- PASS:7549 If values for all 4 columns match those below?

--                        SQL_SIZING TABLE
--                        ================
-- SIZ_ID   DESCRIPTION                          ENTRY_VAL   INTERME_VAL
-- ======   ===========                          =========   ===========
--  1   Length of an identifier                       18          128   
--  2   CHARACTER max length                         240         1000   
--  3   CHARACTER VARYING max length                 254         1000   
--  4   BIT max length in bits                      NULL         8000   
--  5   BIT VARYING max length in bits              NULL         8000   
--  6   NATIONAL CHARACTER max length               NULL          500   
--  7   NATIONAL CHAR VARYING max length            NULL          500   
--  8   NUMERIC decimal precision                     15           15   
--  9   DECIMAL decimal precision                     15           15   
-- 10   INTEGER decimal precision                      9         NULL   
-- 11   INTEGER binary precision                    NULL           31   
-- 12   SMALLINT decimal precision                     4         NULL  
-- 13   SMALLINT binary precision                   NULL           15   
-- 14   FLOAT binary mantissa precision               20           47   
-- 15   FLOAT binary exponent precision             NULL            9   
-- 16   REAL binary mantissa precision                20           23   
-- 17   REAL binary exponent precision              NULL            7   
-- 18   DOUBLE PRECISION binary mantissa precision    30           47   
-- 19   DOUBLE PRECISION binary exponent precision  NULL            9   
-- 20   TIME decimal fractional second precision    NULL            0   
-- 21   TIMESTAMP decimal fract. second precision   NULL            6   
-- 22   INTERVAL decimal fract. second precision    NULL            6   
-- 23   INTERVAL decimal leading field precision    NULL            7   
-- 24   Columns in a table                           100          250   
-- 25   Values in an INSERT statement                100          250   
-- 26   Set clauses in UPDATE statement               20          250   
-- 27   Length of a row                             2000         8000   
-- 28   Columns in UNIQUE constraint                   6           15   
-- 29   Length of UNIQUE columns                     120          750   
-- 30   Columns in GROUP BY column list                6           15   
-- 31   Length of GROUP BY column list               120          750   
-- 32   Sort items in ORDER BY clause                  6           15   
-- 33   Length of ORDER BY column list               120          750   
-- 34   Referencing columns in FOREIGN KEY             6           15   
-- 35   Length of FOREIGN KEY column list            120          750   
-- 36   Table references in an SQL statement          15           50   
-- 37   Cursors simultaneously open                   10          100   
-- 38   WHEN clauses in a CASE expression           NULL           50   
-- 39   Columns in a named columns JOIN             NULL           15   
-- 40   Length of JOIN column list                  NULL          750   
-- 41   Items in a SELECT list                       100          250   
-- 42   Length of SQL <schema definition>           NULL        30000   
-- 43   Length of <SQL data statement>              NULL         4000   
-- 44   Length of <SQL statement variable>          NULL         4000   
-- 45   Occurrences in an ALLOCATE DESCRIPTOR       NULL          100   
-- 46   Default occurrences in ALLOCATE DESCRIPTOR  NULL          100   

   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_SIZING;
-- PASS:7549 If COUNT = 46?

   SELECT COUNT (DISTINCT SIZING_ID) 
     FROM FIPS_DOCUMENTATION.SQL_SIZING
     WHERE SIZING_ID BETWEEN 1 AND 46;
-- PASS:7549 If COUNT = 46?

-- verify existence of columns VALUE_SUPPORTED and SIZING_COMMENTS
   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_SIZING
     WHERE VALUE_SUPPORTED IS NOT NULL
     OR SIZING_COMMENTS IS NOT NULL
     OR SIZING_ID IS NOT NULL;
-- PASS:7549 If COUNT = 46?


   ROLLBACK WORK;

-- END TEST >>> 7549 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
