# GitHub Copilot Instructions for AlaSQL

## About This Project

AlaSQL is an open source SQL database for JavaScript with a focus on query speed and data source flexibility for both relational data and schemaless data. It works in web browsers, Node.js, and mobile apps.

## Project Structure

- `src/` - Source files numbered sequentially (e.g., `05copyright.js`, `10start.js`, etc.)
- `dist/` - Built distribution files (generated, not committed)
- `test/` - Test files following `test###.js` naming pattern where ### is typically the issue number or test###-B if the testfilenumber is already taken. 
- `types/` - TypeScript type definitions
- `docs/` - Documentation
- `examples/` - Example usage code





### Creating Tests
2. Name new test files as `test/test###.js` where `###` is the GitHub issue number if applicable
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

### Node.js Version
- Requires Node.js >= 20 for building

## When Implementing Features

1. **Understand the issue thoroughly** - Read related test cases and existing code
2. **Write a test first** - Create `test/test###.js` for the issue
3. **Verify test fails** - Run `yarn test` to confirm the test catches the issue
4. **Implement the fix** - Modify appropriate file(s) in `src/`
5. **Format code** - Run `yarn format` before committing
6. **Verify test passes** - Run `yarn test` again

now commit the code.

## When Reviewing Code

- Verify tests exist for any new functionality and any regression the code changes could have affected. 

## Resources

- [AlaSQL Documentation](https://github.com/alasql/alasql/wiki)
- [Contributing Guide](CONTRIBUTING.md)
- [Stack Overflow Tag](http://stackoverflow.com/questions/ask?tags=AlaSQL)
- [Issue Tracker](https://github.com/AlaSQL/alasql/issues)
