-- Source: http://stackoverflow.com/questions/22530708/orientdb-traverse-really-slow?rq=1

PersonA --hasInterest-> InterestA
PersonA --hasInterest-> InterestB
PersonB --hasInterest-> InterestA
PersonB --hasInterest-> InterestB

SELECT * FROM ( TRAVERSE out_hasInterest FROM ( SELECT FROM 
    ( TRAVERSE in_hasInterest FROM #12:33 ) WHERE $depth > 0 )) WHERE $depth > 0;

SELECT expand( in('hasInterest').out('hasInterest') ) FROM #12:33



