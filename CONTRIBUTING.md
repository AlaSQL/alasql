# How to Contribute to the AlaSQL project

Thank you very much for your interest! AlaSQL project still has a lot of thing to be improved, and your help is very appreciated!

For you to edit the source please do the following:

- Make sure you have Node, npm and git installed
- Fork the repo here on Github (button top right)
- Clone your forked repo and install dependencies `git clone https://github.com/MYUSERNAME/alasql/ --depth 1 && cd alasql && npm install` 
- Make sure you work with the develop branch `git checkout develop`
- Install dependencies with `npm install` 
- Run tests to verify all is good `npm test`
- Add a test for the issue you have: Copy `test/test000.js` and replace `000` with a new number. 
- Implement a test that reflects the issue.
- Run `npm test` to verify only the new test fails
- Implement your contributions in `src/`
- Run `npm test` and verify all tests are OK
- Commit changes to git and push to your forked repo (including the `dist/` folder)
- Click "Create Pull-request" when looking at your forked repo on Github

_Please note that `npm test` will compile from `src/` and overwrite `dist/` before running all tests_ 

If you would like to change the alasql.org website please make a PR to https://github.com/agershun/alasql-org
 
