# How to Contribute to AlaSQL

Thank you very much for your interest! AlaSQL has a lot of thing to be improved, and your help is very appreciated! 

For you to submit a pull request: 

- Make sure you have git, Node and yarn installed (`npm install -g yarn`)
- Fork the repo here on Github (button top right)
- Clone your forked repo and install dependencies `git clone https://github.com/MYUSERNAME/alasql/ --depth 1 && cd alasql && yarn` 
- Make sure you work with the develop branch `git checkout develop`
- Make sure you got dependencies installed `yarn`
- Run tests to verify all is good `yarn test`
- Implement a test that reflects the issue.
  - Add a new test file for the issue: Copy `test/test000.js` and replace `000` with a new number. Preferably the number of the issue you are solving.
- Run `yarn test` to verify only the new test fails
- Implement your contributions in `src/`
- Run `yarn test` and verify all tests are OK
- Format the souce with `yarn format`
- Commit changes to git and push to your forked repo
- Click "Create Pull-request" when looking at your forked repo on Github

Please note that 
- `yarn test` will compile from `src/` and overwrite `dist/` before running tests
- If you would like to change the alasql.org website please make a PR to https://github.com/alasql/alasql-org
- To help debug a problem you can see some advice on https://github.com/AlaSQL/alasql/issues/1415#issuecomment-1293335079
 
