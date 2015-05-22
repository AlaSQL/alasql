-- MODULE  DML173  

-- SQL Test Suite, V6.0, Interactive SQL, dml173.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0885 FIPS sizing, CHAR (1000)!

   CREATE TABLE CONTACTS (
     NAME CHAR (20),
     DESCRIPTION CHAR (1000),
     KEYWORDS CHAR (1000));
-- PASS:0885 If table created successfully?

   COMMIT WORK;

   INSERT INTO CONTACTS VALUES ('Harry',
'Harry works in the Redundancy Automation Division of the '
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
'as a world-class graffiti artist and source of all good '
'bits related '
'to channel dredging in poor weather.  He is author of over '
'ten thousand '
'paperback novels, including such titles as "How Many '
'Pumpkins will Fit '
'on the Head of a Pin," "A Whole Bunch of Useless Things '
'that you Don''t '
'Want to Know," and "How to Lift Heavy Things Over your '
'Head without '
'Hurting Yourself or Dropping Them."  He attends ANSI and '
'ISO standards '
'meetings in his copious free time and funds the development '
'of test '
'suites with his pocket change.',
'aardvark albatross nutmeg redundancy '
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
'tensile magnetic Ellesmere Greenland '
'Knud Rasmussen precession '
'navigation positioning orbit altitude '
'resistance radiation levitation '
'yoga demiurge election violence '
'collapsed fusion cryogenics gravity '
'sincerity idiocy budget accounting '
'auditing titanium torque pressure '
'fragile hernia muffler cartilage '
'graphics deblurring headache eyestrain '
'interlace bandwidth resolution '
'determination steroids barrel oak wine '
'ferment yeast brewing bock siphon '
'clarity impurities SQL RBAC data '
'warehouse security integrity feedback');
-- PASS:0885 If 1 row inserted successfully?

   SELECT COUNT(*) 
     FROM CONTACTS
     WHERE DESCRIPTION =
'Harry works in the Redundancy Automation Division of the ' ||
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
'as a world-class graffiti artist and source of all good ' ||
'bits related ' ||
'to channel dredging in poor weather.  He is author of over ' ||
'ten thousand ' ||
'paperback novels, including such titles as "How Many ' ||
'Pumpkins will Fit ' ||
'on the Head of a Pin," "A Whole Bunch of Useless Things ' ||
'that you Don''t ' ||
'Want to Know," and "How to Lift Heavy Things Over your ' ||
'Head without ' ||
'Hurting Yourself or Dropping Them."  He attends ANSI and ' ||
'ISO standards ' ||
'meetings in his copious free time and funds the development ' ||
'of test ' ||
'suites with his pocket change.'
  AND KEYWORDS =
'aardvark albatross nutmeg redundancy ' ||
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
'tensile magnetic Ellesmere Greenland ' ||
'Knud Rasmussen precession ' ||
'navigation positioning orbit altitude ' ||
'resistance radiation levitation ' ||
'yoga demiurge election violence ' ||
'collapsed fusion cryogenics gravity ' ||
'sincerity idiocy budget accounting ' ||
'auditing titanium torque pressure ' ||
'fragile hernia muffler cartilage ' ||
'graphics deblurring headache eyestrain ' ||
'interlace bandwidth resolution ' ||
'determination steroids barrel oak wine ' ||
'ferment yeast brewing bock siphon ' ||
'clarity impurities SQL RBAC data ' ||
'warehouse security integrity feedback';
-- PASS:0885 If COUNT = 1?

   SELECT COUNT(*) 
     FROM CONTACTS
     WHERE DESCRIPTION LIKE '%change.'
     AND KEYWORDS LIKE '%feedback';
-- PASS:0885 If COUNT = 1?

   COMMIT WORK;

   DROP TABLE CONTACTS CASCADE;

   COMMIT WORK;

-- END TEST >>> 0885 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
