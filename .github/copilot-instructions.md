# GitHub Copilot Instructions for AlaSQL

## About This Project

AlaSQL is an open source SQL database for JavaScript with a focus on query speed and data source flexibility for both relational data and schemaless data. It works in web browsers, Node.js, and mobile apps.

## When Implementing Features

1. **Understand the issue thoroughly** - Read related test cases and existing code
2. **Write a test first** - Copy test/test000.js into a new file called `test/test###.js` where where `###` is the id of the issue we are trying to solve.
3. **Verify test fails** - Run `yarn test` to confirm the test catches the issue
4. **Implement the fix** - Modify appropriate file(s) in `src/`
  - If you modify the grammar in `src/alasqlgrammar.jison`, run `yarn jison && yarn test` to regenerate the parser and verify
5. **Reconsider elegance** - Make sure to assess the solution and reconsider if this can be more elegant or efficient
6. **Format code** - Run `yarn format` before committing


## Commands

```bash
# Install dependencies
yarn

# Generate grammar (if needed)
yarn jison

# Run tests
yarn test

# Format code
yarn format
```


## Files to Avoid Modifying
- `dist/` - Generated files, will be overwritten on build
- `src/alasqlparser.js` - Generated from Jison grammar (modify the `.jison` file instead)
- `.min.js` files - Generated during build


## Plesae note 

- Alasql is meant to return `undefined` instead of `null` (unline regular SQL engines)

## Resources

- [AlaSQL Documentation](https://github.com/alasql/alasql/wiki)
- [Issue Tracker](https://github.com/AlaSQL/alasql/issues)
