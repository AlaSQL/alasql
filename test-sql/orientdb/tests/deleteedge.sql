CREATE DATABASE IF NOT EXISTS one;
USE one;

CREATE CLASS User EXTENDS V;
CREATE CLASS Folder EXTENDS E;
CREATE CLASS CanAccess EXTENDS E;


SET @userId1 = (CREATE VERTEX User SET username = 'gongolo');
SET @userId2 = (CREATE VERTEX User SET username = 'user2');
SET @folderId1 = (CREATE VERTEX Folder SET keyId = '01234567893');
SET @folderId2 = (CREATE VERTEX Folder SET keyId = '01234567894');
create edge CanAccess from @userId1 to @forlderId1;
create edge CanAccess from @userId1 to @forlderId2;

delete edge CanAccess from (select from User where username = 'gongolo') to @folderId1;

ASSERT 1;

delete edge CanAccess from ( select from User where username = 'gongolo' ) 
	to ( select from Folder where keyId = '01234567894' );

ASSERT 1;


