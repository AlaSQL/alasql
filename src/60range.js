/*
//
// PostgreSQL Range Types Implementation
// Date: 2025-12-07
// (c) AlaSQL Contributors
//
*/

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
	if (this.lower > this.upper) return true;
	if (this.lower === this.upper && (!this.lowerInc || !this.upperInc)) return true;
	return false;
};

alasql.Range.prototype.contains = function (value) {
	if (this.isEmpty()) return false;
	var lowerOk = this.lowerInc ? this.lower <= value : this.lower < value;
	var upperOk = this.upperInc ? value <= this.upper : value < this.upper;
	return lowerOk && upperOk;
};

alasql.Range.prototype.overlaps = function (other) {
	if (this.isEmpty() || other.isEmpty()) return false;
	// Ranges overlap if they are not disjoint
	// They are disjoint if one ends before the other starts
	if (this.upper < other.lower) return false;
	if (other.upper < this.lower) return false;
	// Handle boundary cases where bounds are equal but exclusive
	if (this.upper === other.lower && (!this.upperInc || !other.lowerInc)) return false;
	if (other.upper === this.lower && (!other.upperInc || !this.lowerInc)) return false;
	return true;
};

alasql.Range.prototype.union = function (other) {
	if (this.isEmpty()) return other;
	if (other.isEmpty()) return this;

	var lower = Math.min(this.lower, other.lower);
	var upper = Math.max(this.upper, other.upper);
	var lowerInc =
		this.lower < other.lower
			? this.lowerInc
			: this.lower > other.lower
				? other.lowerInc
				: this.lowerInc || other.lowerInc;
	var upperInc =
		this.upper > other.upper
			? this.upperInc
			: this.upper < other.upper
				? other.upperInc
				: this.upperInc || other.upperInc;

	return new alasql.Range(lower, upper, lowerInc, upperInc);
};

alasql.Range.prototype.intersection = function (other) {
	if (this.isEmpty() || other.isEmpty()) return null;
	if (!this.overlaps(other)) return null;

	var lower = Math.max(this.lower, other.lower);
	var upper = Math.min(this.upper, other.upper);
	var lowerInc =
		this.lower > other.lower
			? this.lowerInc
			: this.lower < other.lower
				? other.lowerInc
				: this.lowerInc && other.lowerInc;
	var upperInc =
		this.upper < other.upper
			? this.upperInc
			: this.upper > other.upper
				? other.upperInc
				: this.upperInc && other.upperInc;

	var result = new alasql.Range(lower, upper, lowerInc, upperInc);
	return result.isEmpty() ? null : result;
};

alasql.Range.prototype.difference = function (other) {
	if (this.isEmpty()) return null;
	if (other.isEmpty()) return this;
	if (!this.overlaps(other)) return this;

	// If other completely contains this, return null
	if (other.lower <= this.lower && other.upper >= this.upper) {
		var thisLowerIn =
			other.lower === this.lower ? other.lowerInc && this.lowerInc : other.lower < this.lower;
		var thisUpperIn =
			other.upper === this.upper ? other.upperInc && this.upperInc : other.upper > this.upper;
		if (thisLowerIn && thisUpperIn) return null;
	}

	// Return the portion before other starts
	if (this.lower < other.lower) {
		var upperInc = !other.lowerInc;
		return new alasql.Range(this.lower, other.lower, this.lowerInc, upperInc);
	}

	// Return the portion after other ends
	if (this.upper > other.upper) {
		var lowerInc = !other.upperInc;
		return new alasql.Range(other.upper, this.upper, lowerInc, this.upperInc);
	}

	return null;
};

alasql.Range.prototype.isSubsetOf = function (other) {
	if (this.isEmpty()) return true;
	if (other.isEmpty()) return false;

	var lowerOk =
		this.lower > other.lower || (this.lower === other.lower && (!this.lowerInc || other.lowerInc));
	var upperOk =
		this.upper < other.upper || (this.upper === other.upper && (!this.upperInc || other.upperInc));

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
	if (!range1 || !range2) return true;
	return range1.isDisjointFrom(range2);
};
