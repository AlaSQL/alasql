-- MODULE DML085  

-- SQL Test Suite, V6.0, Interactive SQL, dml085.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE
 
   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
-- date_time print

-- TEST:0508 Delimited identifers!

   SELECT COUNT(DISTINCT "sullivan.select")     
     FROM "FLATER"."SULLIVAN.SELECT";
-- PASS:0508 If count = 2?

   SELECT "A<a"."sullivan.select"    
     FROM "FLATER"."SULLIVAN.SELECT" "A<a";
-- PASS:0508 If 4 rows selected?
-- PASS:0508 If for each row, "sullivan.select" = 0 OR 1 ?

   SELECT "A < a".CITY
     FROM HU.STAFF "A < a"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "0".CITY
     FROM HU.STAFF "0"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT """".CITY
     FROM HU.STAFF  """"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "%".CITY
     FROM HU.STAFF  "%"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "&".CITY
     FROM HU.STAFF  "&"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "'".CITY
     FROM HU.STAFF  "'"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "(".CITY
     FROM HU.STAFF  "("
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT ")".CITY
     FROM HU.STAFF  ")"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "*".CITY
     FROM HU.STAFF  "*"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "+".CITY
     FROM HU.STAFF  "+"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT ",".CITY
     FROM HU.STAFF  ","
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "-".CITY
     FROM HU.STAFF  "-"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT ".".CITY
     FROM HU.STAFF  "."
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "/".CITY
     FROM HU.STAFF  "/"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT ":".CITY
     FROM HU.STAFF  ":"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT ";".CITY
     FROM HU.STAFF  ";"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "<".CITY
     FROM HU.STAFF  "<"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "=".CITY
     FROM HU.STAFF  "="
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT ">".CITY
     FROM HU.STAFF  ">"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "?".CITY
     FROM HU.STAFF  "?"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "_".CITY
     FROM HU.STAFF  "_"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "|".CITY
     FROM HU.STAFF  "|"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   SELECT "|_?=;:/. -,+*)'&""%".CITY
     FROM HU.STAFF  "|_?=;:/. -,+*)'&""%"
     WHERE EMPNUM = 'E5';
-- PASS:0508 If 1 row selected and CITY = 'Akron'?

   ROLLBACK WORK;

-- END TEST >>> 0508 <<< END TEST
-- *********************************************

-- TEST:0509 Renaming columns with AS for ORDER BY!

   SELECT GRADE AS PROVOLONE, EMPNAME AS EDAM    
         FROM HU.STAFF    
         ORDER BY PROVOLONE, EDAM DESC;
-- PASS:0509 If 5 rows are selected with the following order?
-- PASS:0509      PROVOLONE     EDAM      ?
-- PASS:0509         10         'Betty'   ?
-- PASS:0509         12         'Don'     ?
-- PASS:0509         12         'Alice'   ?
-- PASS:0509         13         'Ed'      ?
-- PASS:0509         13         'Carmen'  ?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0509 <<< END TEST
-- *********************************************

-- NO_TEST:0510 <parameter name> = <column name> (OK with SQL-92)!

-- Testing embedded variables

-- *********************************************

-- TEST:0554 More column renaming!

   SELECT HU.PROJ.CITY AS PCITY, HU.STAFF.CITY SCITY,
         BUDGET + GRADE * HOURS * 100  REAL_BUDGET    
         FROM HU.STAFF, HU.PROJ, HU.WORKS       
         WHERE HU.WORKS.EMPNUM = HU.STAFF.EMPNUM
         AND HU.WORKS.PNUM = HU.PROJ.PNUM
         AND EMPNAME = 'Alice'
         AND HU.PROJ.PNUM = 'P3';
-- PASS:0554 If PCITY = 'Tampa' AND SCITY = 'Deale'?
-- PASS:0554 AND REAL_BUDGET = 126000?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0554 <<< END TEST
-- *************************************************////END-OF-MODULE
