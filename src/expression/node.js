/*
	The base of every node of a parsed statement.

	A node class says once what it is made of, and everything that goes through a tree reads
	that instead of naming the parts of every class again:

	  children   the slots that hold other nodes: a node, a list of nodes, or a plain
	             object or list that holds nodes further in (the WHEN ... THEN pairs of CASE,
	             the value of a JSON literal)
	  fields     the plain values that say which node it is (the operator, the column
	             name, the function name)

	They are set on the class after its declaration (Op.children = [...]), not as static class
	fields, which would need a newer JavaScript than the rest of the source asks for.

	walk() visits a tree, and equals() compares two trees by what they are made of. The text of
	a node (toString) is its name in a result, not its identity: two expressions can share a
	text and differ, and the same expression can be written in two ways.
*/

/** Calls fn for every node found in the value of a slot, in order */
function eachNode(value, fn, slot) {
	if (value === null || typeof value !== 'object') return;
	if (value instanceof Node) {
		fn(value, slot);
	} else if (Array.isArray(value)) {
		for (var i = 0; i < value.length; i++) eachNode(value[i], fn, slot);
	} else if (isPlain(value)) {
		for (var key of Object.keys(value)) eachNode(value[key], fn, slot);
	}
}

function isPlain(value) {
	var proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}

/** Are two values of a slot or a field the same? Nodes by equals(), lists and plain objects item by item */
function sameValue(a, b) {
	if (a instanceof Node) a = a.bare();
	if (b instanceof Node) b = b.bare();
	if (a === b) return true;
	// A part that is left out is the same as one set to undefined or null
	if (a == null || b == null) return a == null && b == null;
	if (typeof a !== 'object' || typeof b !== 'object') return false;
	if (a instanceof Node) return a.equals(b);
	if (b instanceof Node) return false;
	if (Array.isArray(a)) {
		if (!Array.isArray(b) || a.length !== b.length) return false;
		for (var i = 0; i < a.length; i++) {
			if (!sameValue(a[i], b[i])) return false;
		}
		return true;
	}
	if (Array.isArray(b) || !isPlain(a) || !isPlain(b)) return false;
	var keys = Object.keys(a).filter(key => a[key] != null);
	if (keys.length !== Object.keys(b).filter(key => b[key] != null).length) return false;
	return keys.every(key => sameValue(a[key], b[key]));
}

export class Node {
	constructor(params) {
		Object.assign(this, params);
	}

	/** The expression without the parentheses around it: (a + 1) is a + 1 */
	bare() {
		return this;
	}

	/**
		Tells findAggregator what to do at this node: nothing here, so the walk goes on below it.
		An aggregate registers itself and returns false, as does every node whose inside belongs
		to something else (a subquery, an OVER clause).
	*/
	collectAggregate() {}

	/** Registers every aggregate of this expression with the query, wherever in the tree it is */
	findAggregator(query) {
		this.walk(node => node.collectAggregate(query));
	}

	/** Calls fn(child, slot) for every node directly below this one, in the declared order */
	eachChild(fn) {
		var slots = this.constructor.children;
		for (var i = 0; i < slots.length; i++) eachNode(this[slots[i]], fn, slots[i]);
	}

	/**
		Visits this node and every node below it, parents first.
		@param {function} fn Called with (node, slot, parent). Return false to leave out what is below that node
	*/
	walk(fn, slot, parent) {
		if (fn(this, slot, parent) === false) return;
		this.eachChild((child, childSlot) => child.walk(fn, childSlot, this));
	}

	/**
		Is the other node the same expression: the same classes, fields and children all the way
		down? Parentheses do not count, nor does anything a compile step added to a node.
	*/
	equals(other) {
		var a = this.bare();
		var b = other instanceof Node ? other.bare() : other;
		if (a === b) return true;
		if (!(b instanceof Node) || a.constructor !== b.constructor) return false;
		if (a !== this) return a.equals(b);
		return a.sameFields(b) && a.sameChildren(b);
	}

	sameFields(other) {
		return this.constructor.fields.every(field => sameValue(this[field], other[field]));
	}

	sameChildren(other) {
		return this.constructor.children.every(slot => sameValue(this[slot], other[slot]));
	}
}

/** The slots that hold nodes */
Node.children = [];

/** The plain values that are part of what the node is */
Node.fields = [];
