/*
//
// PostgreSQL Range Types Implementation
// Date: 2025-12-07
// (c) AlaSQL Contributors
//
*/

// Helper functions for comparing values (including dates)
// JavaScript's comparison operators work with valueOf() for both Date and Number types
var compareValues = function (a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

var minValue = function (a, b) {
	return a <= b ? a : b;
};

var maxValue = function (a, b) {
	return a >= b ? a : b;
};

// Range class to represent a range of values
alasql.Range = function (lower, upper, lowerInc, upperInc) {
	this.lower = lower;
	this.upper = upper;
	// Default: inclusive lower bound, exclusive upper bound [lower, upper)
	this.lowerInc = lowerInc !== undefined ? lowerInc : true;
	this.upperInc = upperInc !== undefined ? upperInc : false;
};

alasql.Range.prototype.isEmpty = function () {
	if (this.lower === undefined || this.upper === undefined) return true;
	var cmp = compareValues(this.lower, this.upper);
	if (cmp > 0) return true;
	if (cmp === 0 && (!this.lowerInc || !this.upperInc)) return true;
	return false;
};

alasql.Range.prototype.contains = function (value) {
	if (this.isEmpty()) return false;
	var lowerCmp = compareValues(this.lower, value);
	var upperCmp = compareValues(value, this.upper);
	var lowerOk = this.lowerInc ? lowerCmp <= 0 : lowerCmp < 0;
	var upperOk = this.upperInc ? upperCmp <= 0 : upperCmp < 0;
	return lowerOk && upperOk;
};

alasql.Range.prototype.overlaps = function (other) {
	if (this.isEmpty() || other.isEmpty()) return false;
	// Ranges overlap if they are not disjoint
	// They are disjoint if one ends before the other starts
	var cmp1 = compareValues(this.upper, other.lower);
	var cmp2 = compareValues(other.upper, this.lower);
	if (cmp1 < 0) return false;
	if (cmp2 < 0) return false;
	// Handle boundary cases where bounds are equal but exclusive
	if (cmp1 === 0 && (!this.upperInc || !other.lowerInc)) return false;
	if (cmp2 === 0 && (!other.upperInc || !this.lowerInc)) return false;
	return true;
};

alasql.Range.prototype.union = function (other) {
	if (this.isEmpty()) return other;
	if (other.isEmpty()) return this;

	var lower = minValue(this.lower, other.lower);
	var upper = maxValue(this.upper, other.upper);
	var lowerCmp = compareValues(this.lower, other.lower);
	var upperCmp = compareValues(this.upper, other.upper);

	var lowerInc =
		lowerCmp < 0 ? this.lowerInc : lowerCmp > 0 ? other.lowerInc : this.lowerInc || other.lowerInc;
	var upperInc =
		upperCmp > 0 ? this.upperInc : upperCmp < 0 ? other.upperInc : this.upperInc || other.upperInc;

	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

alasql.Range.prototype.intersection = function (other) {
	if (this.isEmpty() || other.isEmpty()) return null;
	if (!this.overlaps(other)) return null;

	var lower = maxValue(this.lower, other.lower);
	var upper = minValue(this.upper, other.upper);
	var lowerCmp = compareValues(this.lower, other.lower);
	var upperCmp = compareValues(this.upper, other.upper);

	var lowerInc =
		lowerCmp > 0 ? this.lowerInc : lowerCmp < 0 ? other.lowerInc : this.lowerInc && other.lowerInc;
	var upperInc =
		upperCmp < 0 ? this.upperInc : upperCmp > 0 ? other.upperInc : this.upperInc && other.upperInc;

	var result = new alasql.Range(lower, upper, lowerInc, upperInc);
	return result.isEmpty() ? null : result;
};

alasql.Range.prototype.difference = function (other) {
	if (this.isEmpty()) return null;
	if (other.isEmpty()) return this;
	if (!this.overlaps(other)) return this;

	// If other completely contains this, return null
	var lowerCmp1 = compareValues(other.lower, this.lower);
	var upperCmp1 = compareValues(other.upper, this.upper);

	if (lowerCmp1 <= 0 && upperCmp1 >= 0) {
		var thisLowerIn = lowerCmp1 === 0 ? other.lowerInc && this.lowerInc : lowerCmp1 < 0;
		var thisUpperIn = upperCmp1 === 0 ? other.upperInc && this.upperInc : upperCmp1 > 0;
		if (thisLowerIn && thisUpperIn) return null;
	}

	// Return the portion before other starts
	var lowerCmp2 = compareValues(this.lower, other.lower);
	if (lowerCmp2 < 0) {
		var upperInc = !other.lowerInc;
		return new alasql.Range(this.lower, other.lower, this.lowerInc, upperInc);
	}

	// Return the portion after other ends
	var upperCmp2 = compareValues(this.upper, other.upper);
	if (upperCmp2 > 0) {
		var lowerInc = !other.upperInc;
		return new alasql.Range(other.upper, this.upper, lowerInc, this.upperInc);
	}

	return null;
};

alasql.Range.prototype.isSubsetOf = function (other) {
	if (this.isEmpty()) return true;
	if (other.isEmpty()) return false;

	var lowerCmp = compareValues(this.lower, other.lower);
	var upperCmp = compareValues(this.upper, other.upper);

	var lowerOk = lowerCmp > 0 || (lowerCmp === 0 && (!this.lowerInc || other.lowerInc));
	var upperOk = upperCmp < 0 || (upperCmp === 0 && (!this.upperInc || other.upperInc));

	return lowerOk && upperOk;
};

alasql.Range.prototype.isSupersetOf = function (other) {
	return other.isSubsetOf(this);
};

alasql.Range.prototype.isDisjointFrom = function (other) {
	return !this.overlaps(other);
};

// Range constructor functions

// Integer range (int4range)
stdfn.INT4RANGE = function (lower, upper, lowerInc, upperInc) {
	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

// Big integer range (int8range)
stdfn.INT8RANGE = function (lower, upper, lowerInc, upperInc) {
	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

// Numeric range (numrange)
stdfn.NUMRANGE = function (lower, upper, lowerInc, upperInc) {
	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

// Timestamp range (tsrange)
stdfn.TSRANGE = function (lower, upper, lowerInc, upperInc) {
	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

// Timestamp with timezone range (tstzrange)
stdfn.TSTZRANGE = function (lower, upper, lowerInc, upperInc) {
	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

// Date range (daterange)
stdfn.DATERANGE = function (lower, upper, lowerInc, upperInc) {
	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

// Range operation functions

// Check if ranges overlap
stdfn.RANGE_OVERLAPS = function (range1, range2) {
	if (!range1 || !range2) return false;
	return range1.overlaps(range2);
};

// Check if range contains element
stdfn.RANGE_CONTAINS = function (range, element) {
	if (!range) return false;
	return range.contains(element);
};

// Check if range1 contains range2
stdfn.RANGE_CONTAINS_RANGE = function (range1, range2) {
	if (!range1 || !range2) return false;
	return range1.isSupersetOf(range2);
};

// Union of two ranges
stdfn.RANGE_UNION = function (range1, range2) {
	if (!range1) return range2;
	if (!range2) return range1;
	return range1.union(range2);
};

// Intersection of two ranges
stdfn.RANGE_INTERSECTION = function (range1, range2) {
	if (!range1 || !range2) return null;
	return range1.intersection(range2);
};

// Difference of two ranges
stdfn.RANGE_DIFFERENCE = function (range1, range2) {
	if (!range1) return null;
	if (!range2) return range1;
	return range1.difference(range2);
};

// Check if range1 is subset of range2
stdfn.RANGE_IS_SUBSET = function (range1, range2) {
	if (!range1 || !range2) return false;
	return range1.isSubsetOf(range2);
};

// Check if range1 is superset of range2
stdfn.RANGE_IS_SUPERSET = function (range1, range2) {
	if (!range1 || !range2) return false;
	return range1.isSupersetOf(range2);
};

// Check if ranges are disjoint
stdfn.RANGE_IS_DISJOINT = function (range1, range2) {
	if (!range1 || !range2) return false;
	return range1.isDisjointFrom(range2);
};
