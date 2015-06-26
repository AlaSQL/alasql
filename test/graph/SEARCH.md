SEARCH Operator
===

SEARCH selector WHILE expression;

selector
	literal   PROP(literal)
	number    PROP(number)
	string    NAME(string)
	(expression) OK(expression)
	@(expression) VAL(xpression)
	: literal - is class - CLASS(literal)
	AS literal - AS(literal)
	MEM literal - MEM(literal)
	{json object} - VAL({json object})
	@[json array] - VAL(@[json array])

	MORE() + (selector) - SEVAL('MORE',selector)
	MANY() * (selector) - SEVAL('MANY',selector)
	NOT() ! (selector) - SEVAL('NOT', selector)
	ANY(expression) - SEVAL('ANY', sel-list)
	ALL(expression)

	#  - REF()
	IN/OUT/BOTH(literal,string,...) - class, name=string
	EQ(expression), NE(expression)
	COUNT()
	PARENT()
	PARENTS()
	ROOT()
	ROUTE(selector)

Samples:
===
SEARCH :Crew "Neo" AS n +(> "knows" SAVE r >) > m {n,r,m};
SEARCH :Crew "Neo" AS n +(> "knows" > MEM m) {r,m};
SEARCH CLASS(Crew) NAME("Neo") AS(n) MORE(OUT() NAME("knows") OUT() MEM(m)) VAL({r,m});

SEARCH selector
selector:
	sel-list sel;
	sel;
;

sel
	vsel = literal (expr-list)
	ssel = literal (selector-list)

ssel
	MORE, MANY, ROUTE, NOT

OUT(selector) - OUT(CLASS(G1) NODE(vertex) NAME(likes))

$in:[]
$out:[]
$id:
$class:
$node:"edge","vertex"
name:

SEARCH DISTINCT CLASS(users) MANY(OUTV(),1,5) OK(status = "down");
SEARCH ALL(PROP() ());

toJS(p,'st')

SELECT * FROM Cars WHERE EXISTS (SEARCH CLASS(Person) AS p OUT(CLASS(owns)) CLASS(Car) (name = A.a ) p);

SELECT * FROM Cars WHERE EXISTS (SEARCH CLASS(Person) AS p OUT(CLASS(owns)) CLASS(Car) (name = A.a ) p);


selector array []


parsert
function Search(selector);
{selid: 'CLASS', args: [{literal:'Person'}] }
yy.Selector({selid:'CLASS', args:[new yy.Literal({literal:'Person'})]});
if(args[0].literal) {
	if(stack.lenght == 0) {
		stack.push(tables[classid].data);
	}
}
gonext();


alasql.aggr.MEDIAN = function(val,acc,wnenid) {
	if(whenid==1) {
		
	} else if(whenid==2) {

	} else if(whenid==3) {

	}

	if(typeof acc = 'undefined') {

	}
	
	if(typeof acc.arr = 'undefined') {

	}
}


}





