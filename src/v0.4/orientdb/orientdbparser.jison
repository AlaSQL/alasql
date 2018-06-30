/*

CREATE CLASS Literal

* name
* type
* linked class
* mandatory
* readonly
* notnull
* min
* max

* cluster

CLASSES

CREATE PROPERTY Literal DOT Literal Literal

ALTER PROPERTY Literal DOT Literal MIN Number

BROWSE CLASS Literal

* @RID (#5:!)
* @Class / @CLASS 

ALTER CLASS Literal ADDCLUSTER Literal

* NAME
* ID
* TYPE

BROWSE CLUSTER Literal

LOAD RECORD SharpAddr

SELECT FROM Literal
SELECT FROM CLUSTER:Literal
SELECT FROM INDEX:Literal
SELECT FROM SharpAddr
SELECT FROM LBRA SharpAddr COMMA SharpAddr ... RBRA

SELECT
FROM
WHERE
GROUP BY
ORDER BY
SKIP Number
LIMIT Number

INSERT INTO Literal VALUES LPAR values-comma-list RPAR COMMA...
INSERT INTO Literal SET key = value,...
INSERT INTO Literal CONTENT json...

UPDATE Literal SET key=value,
UPDATE Literal MERGE json WHERE ...

DELETE FROM Literal WHERE expr

Classes V and E

CREATE VERTEX [<class>] [CLUSTER <cluster>] [SET <field> = <expression>[,]*]
DELETE VERTEX <rid>|<class>|FROM (<subquery>) [WHERE <conditions>] [LIMIT <MaxRecords>>]

CREATE EDGE <class> [CLUSTER <cluster>] FROM <rid>|(<query>)|[<rid>]* TO <rid>|(<query>)|[<rid>]*
                    [SET <field> = <expression>[,]*]|CONTENT {<JSON>}
                    [RETRY <retry> [WAIT <pauseBetweenRetriesInMs]]

DELETE EDGE <rid>|[<rid> (, <rid>)*]|FROM <rid>|TO <rid>|[<class>] [WHERE <conditions>]> [LIMIT <MaxRecords>]


IN()
EXOAND()                    

SELECT EXPAND( BOTH( 'Friend' ).out( 'Eat' ) ) FROM Person WHERE name = 'Luca'

CREATE PROPERTY Owns.out LINK Person
CREATE PROPERTY Owns.in LINK Car
ALTER PROPERTY Owns.out MANDATORY = TRUE
ALTER PROPERTY Owns.in MANDATORY = TRUE
CREATE INDEX UniqueOwns ON Owns(out,in) UNIQUE

DELETE EDGE FROM #11:0 TO #12:0
CREATE EDGE Owns FROM ( SELECT FROM Person ) TO ( SELECT FROM Car )

CREATE INDEX <name> [ON <class-name> (prop-names)] <type> [<key-type>]
                    [METADATA {<metadata>}]
Record version

*/