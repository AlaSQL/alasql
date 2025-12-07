# Performance Test for Issue #117 - Class Implementation Patterns

## Issue Description

This test suite evaluates different JavaScript inheritance patterns to determine if changing AlaSQL's class implementation would provide performance benefits.

The proposed pattern uses:

```js
function inherit(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.prototype.super = function () {
        parent.apply(this, arguments);
    };
}
```

## Current Pattern in AlaSQL

Currently, AlaSQL uses direct prototype assignment:

```js
yy.SomeClass = function (params) {
    return Object.assign(this, params);
};
yy.SomeClass.prototype.someMethod = function () {
    // implementation
};
```

## Test Files

### 1. `perf-inheritance-patterns.js`

Main performance test comparing different inheritance patterns:
- Direct prototype assignment (current)
- Object.create with constructor (proposed)
- ES6 classes (modern approach)
- Simple prototype chain

```bash
node test/performance/class/#117/perf-inheritance-patterns.js
```

### 2. `perf-object-creation.js`

Tests object instantiation performance for different patterns:
- Creation speed
- Memory usage patterns
- Method invocation speed

```bash
node test/performance/class/#117/perf-object-creation.js
```

### 3. `perf-method-calls.js`

Tests method call performance through inheritance chain:
- Single level inheritance
- Multi-level inheritance
- Super method calls

```bash
node test/performance/class/#117/perf-method-calls.js
```

## Performance Considerations

### Advantages of Proposed Pattern

1. **Proper prototype chain**: `Object.create` maintains clean prototype chain
2. **Constructor property**: Explicitly sets constructor for better debugging
3. **Super method**: Provides explicit parent method access

### Potential Disadvantages

1. **Extra function wrapping**: `super` method adds function call overhead
2. **More setup**: Additional prototype assignments vs direct assignment
3. **Compatibility**: May have different performance in different JS engines

## Running All Tests

```bash
# Run all performance tests
node test/performance/class/#117/perf-inheritance-patterns.js
node test/performance/class/#117/perf-object-creation.js
node test/performance/class/#117/perf-method-calls.js
```

## Expected Results

The tests measure:
- Object creation time (ops/sec)
- Method call time (ops/sec)
- Memory efficiency
- Prototype chain lookup time

Results will help determine if adopting the proposed `inherit` function would:
- Improve performance
- Maintain current performance
- Degrade performance

## Related Files

- `src/25queryclass.js` - Query and Recordset classes (uses ES6 classes)
- `src/89assert.js`, `src/85help.js`, etc. - Various class definitions using prototype pattern

## Decision Criteria

Consider adopting the proposed pattern if:
1. Performance is equal or better
2. Code maintainability improves
3. No compatibility issues arise
4. Memory usage remains acceptable
