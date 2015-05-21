-- MODULE  YTS802  

-- SQL Test Suite, V6.0, Interactive SQL, yts802.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7548 Support of FIPS SQL_FEATURES table in documentation schema!

   SELECT FEATURE_ID, FEATURE_NAME, CLASSIFICATION
     FROM FIPS_DOCUMENTATION.SQL_FEATURES
     ORDER BY FEATURE_ID;
-- NOTE:  Please reference FIPS SQL_FEATURES TABLE for comparison!
--        See FIPS 127-2 Sections 15 and 15.1.
-- PASS:7548 If 89 rows are returned ordered by FEATURE_ID?
-- PASS:7548 If FEATURE_ID and FEATURE_NAME match those below?

--                        SQL_FEATURES TABLE
--                        ==================
-- F_ID      FEATURE_NAME                   CLASSIFICATION
-- ====      ============                   ==============
--  1   Dynamic SQL                         TRANSITIONAL         
--  2   Basic information schema            TRANSITIONAL           
--  3   Basic schema manipulation           TRANSITIONAL          
--  4   Joined table                        TRANSITIONAL             
--  5   DATETIME data types                 TRANSITIONAL              
--  6   VARCHAR data type                   TRANSITIONAL             
--  7   TRIM function                       TRANSITIONAL             
--  8   UNION in views                      TRANSITIONAL           
--  9   Implicit numeric casting            TRANSITIONAL             
-- 10   Implicit character casting          TRANSITIONAL              
-- 11   Transaction isolation               TRANSITIONAL              
-- 12   Get diagnostics                     TRANSITIONAL              
-- 13   Grouped operations                  TRANSITIONAL              
-- 14   Qualified * in select list          TRANSITIONAL              
-- 15   Lowercase identifiers               TRANSITIONAL              
-- 16   PRIMARY KEY enhancement             TRANSITIONAL              
-- 17   Multiple schemas per user           TRANSITIONAL              
-- 18   Multiple module support             TRANSITIONAL              
-- 19   Referential delete actions          TRANSITIONAL              
-- 20   CAST functions                      TRANSITIONAL              
-- 21   INSERT expressions                  TRANSITIONAL              
-- 22   Explicit defaults                   TRANSITIONAL              
-- 23   Privilege tables                    TRANSITIONAL              
-- 24   Keyword relaxations                 TRANSITIONAL              
-- 25   Domain definition                   INTERMEDIATE              
-- 26   CASE expression                     INTERMEDIATE              
-- 27   Compound character literals         INTERMEDIATE              
-- 28   LIKE enhancements                   INTERMEDIATE              
-- 29   UNIQUE predicate                    INTERMEDIATE              
-- 30   Table operations                    INTERMEDIATE              
-- 31   Schema definition statement         INTERMEDIATE              
-- 32   User authorization                  INTERMEDIATE              
-- 33   Constraint tables                   INTERMEDIATE              
-- 34   Usage tables                        INTERMEDIATE              
-- 35   INTERMEDIATE information schema     INTERMEDIATE              
-- 36   Subprogram support                  INTERMEDIATE              
-- 37   INTERMEDIATE SQL Flagging           INTERMEDIATE              
-- 38   Schema manipulation                 INTERMEDIATE              
-- 39   Long identifiers                    INTERMEDIATE              
-- 40   Full outer join                     INTERMEDIATE              
-- 41   Time zone specification             INTERMEDIATE       
-- 42   National character                  INTERMEDIATE              
-- 43   Scrolled cursors                    INTERMEDIATE              
-- 44   INTERMEDIATE set function           INTERMEDIATE              
-- 45   Character set definition            INTERMEDIATE              
-- 46   Named character sets                INTERMEDIATE              
-- 47   Scalar subquery values              INTERMEDIATE              
-- 48   Expanded null predicate             INTERMEDIATE              
-- 49   Constraint management               INTERMEDIATE              
-- 50   Documentation schema                INTERMEDIATE              
-- 51   BIT data type                       FULL               
-- 52   Assertion constraints               FULL               
-- 53   Temporary tables                    FULL               
-- 54   Full dynamic SQL                    FULL               
-- 55   Full DATETIME                       FULL               
-- 56   Full value expressions              FULL               
-- 57   Truth value tests                   FULL               
-- 58   Full character functions            FULL               
-- 59   Derived tables in FROM              FULL               
-- 60   Trailing underscore                 FULL               
-- 61   Indicator data types                FULL               
-- 62   Referential name order              FULL               
-- 63   Full SQL Flagging                   FULL              
-- 64   Row and table constructors          FULL               
-- 65   Catalog name qualifiers             FULL               
-- 66   Simple tables                       FULL             
-- 67   Subqueries in CHECK                 FULL               
-- 68   Union and Cross join                FULL               
-- 69   Collation and translation           FULL               
-- 70   Referential update actions          FULL               
-- 71   ALTER domain                        FULL               
-- 72   Deferrable constraints              FULL               
-- 73   INSERT column privileges            FULL               
-- 74   Referential MATCH types             FULL               
-- 75   View CHECK enhancements             FULL              
-- 76   Session management                  FULL               
-- 77   Connection management               FULL               
-- 78   Self-referencing operations         FULL               
-- 79   Insensitive cursors                 FULL               
-- 80   Full set function                   FULL               
-- 81   Catalog flagging                    FULL               
-- 82   Local table references              FULL               
-- 83   Full cursor update                  FULL               
-- 84   RDA/SQL-Client                      RDA                
-- 85   RDA/SQL-Server                      RDA                
-- 86   RDA Stored Execution                RDA                
-- 87   RDA Cancel                          RDA                
-- 88   RDA Status                          RDA               
-- 89   RDA TP Application Context          RDA               

   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_FEATURES;
-- PASS:7548 If COUNT = 89?

   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_FEATURES
     WHERE FEATURE_NAME IS NOT NULL;
-- PASS:7548 If COUNT = 89?

-- verify existence of column FEATURE_COMMENTS
   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_FEATURES
     WHERE FEATURE_COMMENTS IS NOT NULL
     OR FEATURE_ID > 0;
-- PASS:7548 If COUNT = 89?


   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_FEATURES
     WHERE IS_VERIFIED = 'YES' AND
     NOT IS_SUPPORTED = 'YES';
-- PASS:7548 If COUNT = 0?

   SELECT COUNT(*)
     FROM FIPS_DOCUMENTATION.SQL_FEATURES
     WHERE (FEATURE_ID BETWEEN  1 AND 24
            AND CLASSIFICATION = 'TRANSITIONAL')
        OR (FEATURE_ID BETWEEN 25 AND 50
            AND CLASSIFICATION = 'INTERMEDIATE')
        OR (FEATURE_ID BETWEEN 51 AND 83
            AND CLASSIFICATION = 'FULL')
        OR (FEATURE_ID BETWEEN 84 AND 89
            AND CLASSIFICATION = 'RDA');
-- PASS:7548 If COUNT = 89?

   SELECT COUNT (*) 
     FROM FIPS_DOCUMENTATION.SQL_FEATURES
     WHERE IS_VERIFIED IN  ('YES','NO')
       AND IS_SUPPORTED IN ('YES','NO');
-- PASS:7548 If COUNT = 89?


   ROLLBACK WORK;

-- END TEST >>> 7548 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
