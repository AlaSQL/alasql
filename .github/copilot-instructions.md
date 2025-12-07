# GitHub Copilot Instructions for AlaSQL

## About This Project

AlaSQL is an open source SQL database for JavaScript with a focus on query speed and data source flexibility for both relational data and schemaless data. It works in web browsers, Node.js, and mobile apps.

## When Implementing Features

1. **Understand the issue thoroughly** - Read related test cases and existing code
2. **Write a test first** - Create `test/test###.js` for the issue where `###` is the id of the issue we are actually fixing. 
3. **Verify test fails** - Run `yarn test` to confirm the test catches the issue
4. **Implement the fix** - Modify appropriate file(s) in `src/`
5. **Format code** - Run `yarn format` before committing
6. **Verify test passes** - Run `yarn test` again


## How to to test files
1. Make a test file
  - Name new test files as `test/test###.js` where `###` is the GitHub issue number of the issue we are actually fixing.
    - If the file already exists we name the file test/test###-B.js
1. Copy the structure in `test/test000.js` as a template
3. Tests should be self-contained and clear about what they're testing
4. Use the Mocha test framework with standard assertions

## SQL Parser Modifications

If a problem demands modifying the lexical parser then seek to do chances as small as possible to `src/alasqlparser.jison`. Afterwards run `yarn jison && yarn test` to confirm the result. 

## Commands

```bash
# Install dependencies
yarn

# Run tests
yarn test

# Format code
yarn format

# Build project
yarn build


## Files to Avoid Modifying
- `dist/` - Generated files, will be overwritten on build
- `src/alasqlparser.js` - Generated from Jison grammar (modify the `.jison` file instead)
- `.min.js` files - Generated during build


now commit the code.

## When Reviewing Code

- Verify tests exist for any new functionality and any regression the code changes could have affected. 

## Resources

- [AlaSQL Documentation](https://github.com/alasql/alasql/wiki)
- [Issue Tracker](https://github.com/AlaSQL/alasql/issues)
