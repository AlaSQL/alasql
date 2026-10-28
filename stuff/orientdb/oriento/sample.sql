SELECT EXPAND( $c ) LET 
$a = ( SELECT expand(outE()) FROM #12:54), 
$b = ( SELECT expand(out()) FROM #12:54 ),
$c = UNIONALL( $a, $b )

So, I tried query() and exec() in NodeJS

'SELECT EXPAND( $c ) LET ' +
'$a = ( SELECT expand(outE()) FROM #12:54), ' +
'$b = ( SELECT expand(out()) FROM #12:54 ), ' +
'$c = UNIONALL( $a, $b )' )