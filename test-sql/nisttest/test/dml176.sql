-- MODULE  DML176  

-- SQL Test Suite, V6.0, Interactive SQL, dml176.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0888 FIPS sizing, NCHAR VARYING (500)!

   CREATE TABLE CONTACTS (
     NAME CHAR (20),
     DESCRIPTION NCHAR VARYING (500),
     KEYWORDS NCHAR VARYING (500));
-- PASS:0888 If table created successfully?

   COMMIT WORK;

   INSERT INTO CONTACTS VALUES ('Harry',
N'Harry works in the Redundancy Automation Division of the '
'Materials '
'Blasting Laboratory in the National Cattle Acceleration '
'Project of '
'lower Michigan.  His job is to document the trajectory of '
'cattle and '
'correlate the loft and acceleration versus the quality of '
'materials '
'used in the trebuchet.  He served ten years as the '
'vice-president in '
'charge of marketing in the now defunct milk trust of the '
'Pennsylvania '
'Coalition of All Things Bovine.  Prior to that he '
'established himself '
'as a world-class gra',
N'aardvark albatross nutmeg redundancy '
'automation materials blasting '
'cattle acceleration trebuchet catapult '
'loft coffee java sendmail SMTP '
'FTP HTTP censorship expletive senility '
'extortion distortion conformity '
'conformance nachos chicks goslings '
'ducklings honk quack melatonin tie '
'noose circulation column default '
'ionic doric chlorine guanine Guam '
'invasions rubicon helmet plastics '
'recycle HDPE nylon ceramics plumbing '
'parachute zeppelin carbon hydrogen '
'vinegar sludge asphalt adhesives '
'tensile magnetic');
-- PASS:0888 If 1 row inserted successfully?

   SELECT COUNT(*) 
     FROM CONTACTS
     WHERE DESCRIPTION =
N'Harry works in the Redundancy Automation Division of the ' ||
'Materials ' ||
'Blasting Laboratory in the National Cattle Acceleration ' ||
'Project of ' ||
'lower Michigan.  His job is to document the trajectory of ' ||
'cattle and ' ||
'correlate the loft and acceleration versus the quality of ' ||
'materials ' ||
'used in the trebuchet.  He served ten years as the ' ||
'vice-president in ' ||
'charge of marketing in the now defunct milk trust of the ' ||
'Pennsylvania ' ||
'Coalition of All Things Bovine.  Prior to that he ' ||
'established himself ' ||
'as a world-class gra'
  AND KEYWORDS =
N'aardvark albatross nutmeg redundancy ' ||
'automation materials blasting ' ||
'cattle acceleration trebuchet catapult ' ||
'loft coffee java sendmail SMTP ' ||
'FTP HTTP censorship expletive senility ' ||
'extortion distortion conformity ' ||
'conformance nachos chicks goslings ' ||
'ducklings honk quack melatonin tie ' ||
'noose circulation column default ' ||
'ionic doric chlorine guanine Guam ' ||
'invasions rubicon helmet plastics ' ||
'recycle HDPE nylon ceramics plumbing ' ||
'parachute zeppelin carbon hydrogen ' ||
'vinegar sludge asphalt adhesives ' ||
'tensile magnetic';
-- PASS:0888 If COUNT = 1?

   SELECT COUNT(*) 
     FROM CONTACTS
     WHERE DESCRIPTION LIKE N'%gra'
     AND KEYWORDS LIKE N'%magnetic';
-- PASS:0888 If COUNT = 1?

   COMMIT WORK;

   DROP TABLE CONTACTS CASCADE;
-- PASS:0888 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0888 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
