# GitHub Copilot Instructions for AlaSQL

## About This Project

AlaSQL is an open source SQL database for JavaScript with a focus on query speed and data source flexibility for both relational data and schemaless data. It works in web browsers, Node.js, and mobile apps.

## Technology Stack

- **Language**: JavaScript (ES5/ES6)
- **Build System**: Shell script (`build.sh`) that concatenates source files from `src/` into `dist/`
- **Package Manager**: Yarn (preferred) or npm
- **Testing**: Mocha test framework
- **Code Formatting**: Prettier with specific settings (tabs, single quotes, no bracket spacing)
- **Parser**: Jison for SQL parsing (generates `src/alasqlparser.js`)
- **Minification**: esbuild for minifying distribution files

## Project Structure

- `src/` - Source files numbered sequentially (e.g., `05copyright.js`, `10start.js`, etc.)
- `dist/` - Built distribution files (generated, not committed)
- `test/` - Test files following `test###.js` naming pattern where ### is typically the issue number
- `types/` - TypeScript type definitions
- `docs/` - Documentation
- `examples/` - Example usage code

## Development Workflow

### Building

```bash
# Full build (includes formatting)
yarn build

# Build only (no formatting)
yarn build-only

# Or use the shell script directly
sh build.sh
```

The build process:
1. Concatenates all source files from `src/` in a specific order
2. Removes comments and performs text replacements
3. Creates browser (`alasql.js`, `alasql.min.js`) and Node.js (`alasql.fs.js`) versions
4. Injects version numbers from package.json

### Testing

```bash
# Run all tests (includes build)
yarn test

# Run tests only (without build)
yarn test-only

# Run browser tests
yarn test-browser
```

### Code Formatting

```bash
# Format changed files since develop branch
yarn format

# Format all files
yarn format-all

# Check formatting
yarn test-format
```

**Important**: Always run `yarn format` before committing. The pre-push hook checks formatting.

## Code Style Guidelines

### Formatting Rules
- Use **tabs** for indentation (not spaces)
- Use **single quotes** for strings
- No spaces inside brackets: `{foo: 'bar'}` not `{ foo: 'bar' }`
- Print width: 100 characters
- Arrow functions: avoid parens when possible (`x => x` not `(x) => x`)
- Trailing commas: ES5 style

### File Organization
- Source files in `src/` are numbered to control concatenation order
- Each file typically handles a specific SQL statement or feature
- The concatenation order in `build.sh` determines the final build output

### Comments
- Avoid multiline comments starting with `/*/*` (they are removed during build)
- Avoid comments with `console.log()` in them (removed during build)
- Use `//` for single-line comments when they contain meaningful information

## Testing Guidelines

### Creating Tests
1. Copy `test/test000.js` as a template
2. Name new test files as `test/test###.js` where `###` is the GitHub issue number if applicable
3. Tests should be self-contained and clear about what they're testing
4. Use the Mocha test framework with standard assertions

### Test Structure
- Tests are run with `--bail` flag (stops on first failure)
- Tests use dot reporter in CI for concise output
- Browser tests can be run separately with `yarn test-browser`

## SQL Parser Modifications

If modifying the SQL parser:

```bash
# Regenerate parser from Jison grammar
yarn jison
```

This generates `src/alasqlparser.js` from `src/alasqlparser.jison`. The generated file is committed to the repository.

## Branch Strategy

- **develop** - Main development branch (work from this branch)
- **master** - Production/release branch
- Always base your work on the `develop` branch

## Common Commands

```bash
# Install dependencies
yarn

# Run tests
yarn test

# Format code
yarn format

# Build project
yarn build

# Install globally for testing CLI
yarn install-g
```

## Important Notes

### Files to Avoid Modifying
- `dist/` - Generated files, will be overwritten on build
- `src/alasqlparser.js` - Generated from Jison grammar (modify the `.jison` file instead)
- `.min.js` files - Generated during build

### Node.js Version
- Requires Node.js >= 15

### Code Generation
- The build process heavily uses `rexreplace` for text transformations
- Version strings `PACKAGE_VERSION` and `BUILD_VERSION` are injected during build
- Browser and Node.js builds have different code paths (marked with `not-for-browser` and `only-for-browser`)

## When Implementing Features

1. **Understand the issue thoroughly** - Read related test cases and existing code
2. **Write a test first** - Create `test/test###.js` for the issue
3. **Verify test fails** - Run `yarn test` to confirm the test catches the issue
4. **Implement the fix** - Modify appropriate file(s) in `src/`
5. **Verify test passes** - Run `yarn test` again
6. **Format code** - Run `yarn format` before committing
7. **Build succeeds** - Ensure `yarn build` completes without errors

## When Reviewing Code

- Check that formatting matches Prettier config (tabs, single quotes, etc.)
- Verify tests exist for new functionality
- Ensure the build script includes any new source files in the correct order
- Confirm browser and Node.js compatibility if applicable
- Check that documentation is updated if API changes

## Resources

- [AlaSQL Documentation](https://github.com/alasql/alasql/wiki)
- [Contributing Guide](CONTRIBUTING.md)
- [Stack Overflow Tag](http://stackoverflow.com/questions/ask?tags=AlaSQL)
- [Issue Tracker](https://github.com/AlaSQL/alasql/issues)
