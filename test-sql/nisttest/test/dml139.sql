-- MODULE  DML139  

-- SQL Test Suite, V6.0, Interactive SQL, dml139.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU                

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0699 <drop behavior> on a REVOKE (static)!

   REVOKE GRANT OPTION FOR SELECT
  ON HU.WORKS FROM CUGINI RESTRICT;
-- PASS:0699 If ERROR, syntax error/access violation?

   ROLLBACK WORK;

   REVOKE GRANT OPTION FOR SELECT
  ON HU.WORKS FROM CUGINI CASCADE;
-- PASS:0699 If successful completion?

   ROLLBACK WORK;

   REVOKE SELECT ON HU.WORKS
  FROM PUBLIC RESTRICT;
-- PASS:0699 If successful completion?

   ROLLBACK WORK;

   REVOKE SELECT ON HU.STAFF
  FROM PUBLIC RESTRICT;
-- PASS:0699 If ERROR, syntax error/access violation?

   ROLLBACK WORK;

   REVOKE SELECT ON HU.PROJ
  FROM PUBLIC RESTRICT;
-- PASS:0699 If successful completion?

   ROLLBACK WORK;

-- END TEST >>> 0699 <<< END TEST

-- *************************************************////END-OF-MODULE
